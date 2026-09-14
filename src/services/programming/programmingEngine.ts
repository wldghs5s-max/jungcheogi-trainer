import { CodeLanguage, Difficulty } from '../../types/question';
import { registerDefaultGenerators } from './generators';
import { GeminiProgrammingGenerator } from './geminiProgrammingGenerator';
import { ProgrammingHistoryTracker } from './historyTracker';
import { GeneratorRegistry } from './registry';
import { GeneratorSelector } from './selector';
import { ProgrammingQuestionType, ProgrammingTopic } from './taxonomy';
import { GeneratedProgrammingQuestion, GenerationContext } from './types';

export class ProgrammingEngine {
  private static isInitialized = false;

  static {
    GeneratorRegistry.addOnClearListener(() => {
      ProgrammingEngine.resetInitStatus();
    });
  }

  /**
   * 엔진 초기화: 기본 10종 생성기 등록
   */
  static init(): void {
    if (this.isInitialized) return;
    registerDefaultGenerators();
    this.isInitialized = true;
  }

  /**
   * 초기화 상태를 리셋합니다 (테스트 및 레지스트리 비우기 연동용).
   */
  static resetInitStatus(): void {
    this.isInitialized = false;
  }


  /**
   * 요청 조건에 맞는 생성기를 단계적으로 완화(Relaxation)하여 탐색합니다.
   * 완화 순서: 난이도(difficulty) -> 유형(type) -> 주제(topic) 순으로만 완화.
   * 언어(language)는 사용자가 요청한 필수 학습 대상이므로 절대 임의로 변경하지 않습니다.
   */
  static findGeneratorsWithRelaxation(filter: {
    language?: CodeLanguage;
    topic?: ProgrammingTopic;
    type?: ProgrammingQuestionType;
    difficulty?: Difficulty;
  }): { generators: ReturnType<typeof GeneratorRegistry.getAll>; relaxed: boolean } {
    // 필수 제약 검사: 언어와 주제가 동시에 주어졌는데 둘을 만족하는 생성기가 전혀 없다면 지원 불가능한 조합
    if (filter.language && filter.topic) {
      const matchBoth = GeneratorRegistry.find({
        language: filter.language,
        topic: filter.topic,
      });
      if (matchBoth.length === 0) {
        return { generators: [], relaxed: true };
      }
    }

    // 1단계: 모든 조건 만족
    let gens = GeneratorRegistry.find(filter);
    if (gens.length > 0) return { generators: gens, relaxed: false };

    // 2단계: 난이도(difficulty) 완화
    if (filter.difficulty) {
      gens = GeneratorRegistry.find({
        language: filter.language,
        topic: filter.topic,
        type: filter.type,
      });
      if (gens.length > 0) return { generators: gens, relaxed: true };
    }

    // 3단계: 유형(type) 추가 완화
    if (filter.type) {
      gens = GeneratorRegistry.find({
        language: filter.language,
        topic: filter.topic,
      });
      if (gens.length > 0) return { generators: gens, relaxed: true };
    }

    // 4단계: 주제가 미지정된 경우 해당 언어 범위 내의 모든 생성기
    if (!filter.topic && filter.language) {
      gens = GeneratorRegistry.find({
        language: filter.language,
      });
      if (gens.length > 0) return { generators: gens, relaxed: true };
    }

    // 언어와 주제가 모두 지정되지 않은 경우 전체 생성기 풀 활용 가능
    if (!filter.language && !filter.topic) {
      gens = GeneratorRegistry.getAll();
      if (gens.length > 0) return { generators: gens, relaxed: true };
    }

    return { generators: [], relaxed: true };
  }


  /**
   * 단일 문제를 가중치 기반으로 생성합니다 (중복 및 과도한 유사도 자동 회피).
   */
  static async generateQuestion(
    options: {
      seed?: number;
      language?: CodeLanguage;
      topic?: ProgrammingTopic;
      type?: ProgrammingQuestionType;
      difficulty?: Difficulty;
      weakTopics?: ProgrammingTopic[];
      recordHistory?: boolean;
    } = {},
  ): Promise<GeneratedProgrammingQuestion> {
    this.init();

    const shouldRecord = options.recordHistory !== false;
    const recentFingerprints = shouldRecord
      ? await ProgrammingHistoryTracker.getRecentFingerprints()
      : [];
    const recentTopics = shouldRecord
      ? await ProgrammingHistoryTracker.getRecentTopics()
      : [];

    const context: GenerationContext = {
      seed: options.seed,
      targetLanguage: options.language,
      targetTopic: options.topic,
      targetType: options.type,
      targetDifficulty: options.difficulty,
      weakTopics: options.weakTopics,
      recentFingerprints,
      recentTopics,
    };

    // 조건에 맞는 생성기 풀 탐색 (조건 완화 정책 적용)
    const { generators: available, relaxed } = this.findGeneratorsWithRelaxation({
      language: context.targetLanguage,
      topic: context.targetTopic,
      type: context.targetType,
      difficulty: context.targetDifficulty,
    });

    if (available.length === 0) {
      throw new Error(
        `[ProgrammingEngine] 요청 조건(언어: ${context.targetLanguage || '미지정'}, 주제: ${context.targetTopic || '미지정'})을 지원하는 생성기가 없습니다.`,
      );
    }

    const maxRetries = 8;
    let bestCandidate: GeneratedProgrammingQuestion | null = null;
    const attemptedGenIds = new Set<string>();

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      // 중복 발생 시 다른 독립 생성기를 우선 탐색
      const unattempted = available.filter((g) => !attemptedGenIds.has(g.id));
      const pool = unattempted.length > 0 ? unattempted : available;

      const chosenGen = await GeneratorSelector.selectGenerator(context, pool);
      if (!chosenGen) break;
      attemptedGenIds.add(chosenGen.id);

      try {
        const genContext: GenerationContext = {
          ...context,
          seed: context.seed !== undefined ? context.seed + attempt * 100 + 1 : undefined,
        };
        const candidate = chosenGen.generate(genContext);

        if (candidate.validationStatus === 'rejected') {
          if (shouldRecord) {
            await ProgrammingHistoryTracker.recordFailure(chosenGen.id);
          }
          continue;
        }

        const isDup = shouldRecord
          ? await ProgrammingHistoryTracker.isDuplicateOrTooSimilar(candidate.structuralFingerprint)
          : false;

        if (!isDup) {
          bestCandidate = candidate;
          break;
        }

        if (!bestCandidate) {
          bestCandidate = candidate;
        }
      } catch (e) {
        if (shouldRecord) {
          await ProgrammingHistoryTracker.recordFailure(chosenGen.id);
        }
      }
    }

    // 모든 시도 실패 시 검색된 풀 내의 첫 번째 생성기(또는 안전 기본값)로 폴백
    if (!bestCandidate) {
      const fallbackGen =
        available[0] ||
        (context.targetLanguage
          ? GeneratorRegistry.find({ language: context.targetLanguage })[0]
          : GeneratorRegistry.get('LoopOutputGenerator')) ||
        GeneratorRegistry.getAll()[0];

      if (!fallbackGen) {
        throw new Error('[ProgrammingEngine] 생성 가능한 생성기가 레지스트리에 존재하지 않습니다.');
      }
      bestCandidate = fallbackGen.generate(context);
    }

    // 명시적인 요청 조건과의 일치 여부 최종 검증
    if (context.targetLanguage && bestCandidate.programmingLanguage !== context.targetLanguage) {
      throw new Error(
        `[ProgrammingEngine] 요청 언어(${context.targetLanguage})와 생성 결과 언어(${bestCandidate.programmingLanguage})가 일치하지 않습니다.`,
      );
    }
    if (context.targetTopic && bestCandidate.topic !== context.targetTopic) {
      throw new Error(
        `[ProgrammingEngine] 요청 주제(${context.targetTopic})와 생성 결과 주제(${bestCandidate.topic})가 일치하지 않습니다.`,
      );
    }
    if (context.targetType && bestCandidate.programmingType !== context.targetType) {
      throw new Error(
        `[ProgrammingEngine] 요청 유형(${context.targetType})와 생성 결과 유형(${bestCandidate.programmingType})가 일치하지 않습니다.`,
      );
    }


    // 이력 등록 (recordHistory가 true일 때만 기록)
    if (shouldRecord) {
      await ProgrammingHistoryTracker.recordQuestion(bestCandidate);
    }

    return bestCandidate;
  }


  /**
   * 연습용 문제 번들(N문제)을 생성합니다.
   * 각 문제는 서로 다른 주제/유형이 고르게 분포되도록 자동 안배합니다.
   */
  static async generateBundle(
    count = 6,
    startIndex = 0,
    difficulty?: Difficulty,
  ): Promise<GeneratedProgrammingQuestion[]> {
    this.init();
    const bundle: GeneratedProgrammingQuestion[] = [];

    for (let i = 0; i < count; i++) {
      const seed = startIndex + i * 17 + 1;
      const question = await this.generateQuestion({
        seed,
        difficulty,
      });
      bundle.push(question);
    }

    return bundle;
  }

  /**
   * 동기적으로 N개의 다양한 연습 문제 번들을 생성합니다 (self-test 및 동기 호출 호환용).
   */
  static generateBundleSync(
    count = 6,
    startIndex = 0,
    difficulty?: Difficulty,
  ): GeneratedProgrammingQuestion[] {
    this.init();
    const generators = GeneratorRegistry.getAll();
    const bundle: GeneratedProgrammingQuestion[] = [];
    const usedFingerprints: string[] = [];

    for (let i = 0; i < count; i++) {
      const genIndex = (startIndex + i) % generators.length;
      const gen = generators[genIndex];
      const seed = (startIndex + 1) * 31 + i * 17;
      let targetLanguage: CodeLanguage | undefined = undefined;
      if (i === 0 && gen.supportedLanguages.includes('C')) targetLanguage = 'C';
      if (i === 1 && gen.supportedLanguages.includes('JAVA')) targetLanguage = 'JAVA';

      const question = gen.generate({
        seed,
        targetLanguage,
        targetDifficulty: difficulty,
        recentFingerprints: usedFingerprints,
      });

      usedFingerprints.push(question.structuralFingerprint);
      bundle.push(question);
    }

    return bundle;
  }

  /**
   * Gemini 후보 생성 시도 후, 실패 시 로컬 조합 생성기로 완벽 폴백
   */
  static async generateWithGeminiFallback(options?: {
    language?: CodeLanguage;
    topic?: ProgrammingTopic;
    difficulty?: Difficulty;
  }): Promise<{
    question: GeneratedProgrammingQuestion;
    source: 'gemini' | 'local_fallback';
    error?: string;
  }> {
    const recentFp = await ProgrammingHistoryTracker.getRecentFingerprints();
    const geminiResult = await GeminiProgrammingGenerator.generateCandidate({
      language: options?.language,
      topic: options?.topic,
      difficulty: options?.difficulty,
      avoidFingerprints: recentFp,
    });

    if (geminiResult.ok) {
      await ProgrammingHistoryTracker.recordQuestion(geminiResult.question);
      return { question: geminiResult.question, source: 'gemini' };
    }

    // 실패 시 로컬 엔진으로 안전 폴백
    const localQuestion = await this.generateQuestion({
      language: options?.language,
      topic: options?.topic,
      difficulty: options?.difficulty,
    });

    return {
      question: localQuestion,
      source: 'local_fallback',
      error: geminiResult.message,
    };
  }
}
