import { CodeLanguage, Difficulty } from '../../../types/question';
import { StructuralFingerprintService } from '../fingerprint';
import {
  QUESTION_TYPE_METADATA,
  TOPIC_METADATA,
} from '../taxonomy';
import {
  GeneratedProgrammingQuestion,
  GenerationContext,
  IProgrammingQuestionGenerator,
  StructuralFingerprintComponents,
} from '../types';
import { QuestionValidator } from '../validation';

export abstract class BaseGenerator implements IProgrammingQuestionGenerator {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly supportedLanguages: CodeLanguage[];
  abstract readonly supportedTopics: import('../taxonomy').ProgrammingTopic[];
  abstract readonly supportedTypes: import('../taxonomy').ProgrammingQuestionType[];
  abstract readonly supportedDifficulties: Difficulty[];

  abstract generate(context: GenerationContext): GeneratedProgrammingQuestion;

  /**
   * 재현 가능하며 균등 분포를 보장하는 의사난수 생성기 (SplitMix32 + XorShift32)
   */
  protected createRng(seed?: number): () => number {
    if (seed === undefined || isNaN(seed)) {
      return Math.random;
    }
    let state = Math.abs(Math.floor(seed)) ^ 0x9e3779b9;
    state = Math.imul(state ^ (state >>> 16), 0x21f0aaad);
    state = Math.imul(state ^ (state >>> 15), 0x735a2d97);
    state = (state ^ (state >>> 15)) >>> 0;
    if (state === 0) state = 0x85ebca6b;

    return () => {
      state ^= state << 13;
      state ^= state >>> 17;
      state ^= state << 5;
      return (state >>> 0) / 4294967296;
    };
  }

  protected pickOne<T>(items: T[], rng: () => number): T {
    const idx = Math.floor(rng() * items.length);
    return items[Math.min(idx, items.length - 1)];
  }

  protected pickInt(min: number, max: number, rng: () => number): number {
    return Math.floor(rng() * (max - min + 1)) + min;
  }

  protected buildId(prefix: string, seed?: number): string {
    const time = Date.now();
    const rand = Math.floor(Math.random() * 10000);
    return `GEN_${prefix}_${seed ?? rand}_${time}`;
  }

  /**
   * 생성된 데이터로 GeneratedProgrammingQuestion 객체를 완성하고 자동 검증을 수행합니다.
   */
  protected finalizeQuestion(params: {
    id: string;
    language: CodeLanguage;
    topic: import('../taxonomy').ProgrammingTopic;
    type: import('../taxonomy').ProgrammingQuestionType;
    difficulty: Difficulty;
    question?: string;
    code: string;
    options?: string[];
    answer: string | string[];
    explanation: string;
    keywords?: string[];
    components: StructuralFingerprintComponents;
    generationParams: Record<string, unknown>;
  }): GeneratedProgrammingQuestion {
    const fingerprint = StructuralFingerprintService.build(params.components);
    const defaultQuestion =
      QUESTION_TYPE_METADATA[params.type]?.defaultExamQuestionStem ||
      '다음 프로그램의 실행 결과를 쓰시오.';

    const topicName = TOPIC_METADATA[params.topic]?.name || params.topic;

    const baseQuestion: GeneratedProgrammingQuestion = {
      id: params.id,
      subject: '프로그래밍언어활용',
      category: params.language,
      subCategory: topicName,
      type: 'CODE_TRACE',
      language: params.language,
      programmingLanguage: params.language,
      topic: params.topic,
      programmingType: params.type,
      difficulty: params.difficulty,
      question: params.question || defaultQuestion,
      code: params.code.trim(),
      options: params.options,
      answer: params.answer,
      explanation: params.explanation.trim(),
      keywords: params.keywords || [params.language, topicName],
      source: `오프라인 독립 생성기 (${this.name})`,
      generationParams: params.generationParams,
      structuralFingerprint: fingerprint,
      structuralComponents: params.components,
      tags: [params.language, topicName, params.type, params.difficulty],
      generationSource: 'local',
      validationStatus: 'pending',
      createdAt: new Date().toISOString(),
    };

    // 자동 검증 적용
    const valResult = QuestionValidator.validate(baseQuestion);
    baseQuestion.validationStatus = valResult.status;
    baseQuestion.validationMessage = valResult.reason;

    return baseQuestion;
  }
}
