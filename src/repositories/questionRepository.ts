import { ALL_QUESTIONS } from '../data/questions';
import { Question, Subject } from '../types/question';
import { LocalStorage, STORAGE_KEYS } from '../storage/localStorage';
import { shuffleArray } from '../utils/quiz';

export class QuestionRepository {
  private static cachedServerQuestions: Question[] = [];

  /**
   * 로컬 스토리지에 캐시된 서버 신규 문제들을 메모리에 로드합니다.
   */
  static async loadCachedServerQuestions(): Promise<void> {
    const cached = await LocalStorage.getItem<Question[]>(STORAGE_KEYS.CACHED_SERVER_QUESTIONS);
    if (cached && Array.isArray(cached)) {
      this.cachedServerQuestions = cached;
    }
  }

  static async appendCachedQuestions(questions: Question[]): Promise<number> {
    await this.loadCachedServerQuestions();
    const allExisting = this.getAll();
    const existingIds = new Set(allExisting.map((q) => q.id));

    // 일반 문제 중복 기준: subject + 정규화된 question
    const existingGeneralStems = new Set(
      allExisting
        .filter((q) => q.subject !== '프로그래밍언어활용' && !q.code)
        .map((q) => `${q.subject}:${q.question.replace(/\s+/g, '').toUpperCase()}`),
    );

    // 프로그래밍 문제 중복 기준: structuralFingerprint 및 정규화된 소스 코드
    const existingFingerprints = new Set(
      allExisting
        .filter((q) => q.structuralFingerprint)
        .map((q) => q.structuralFingerprint as string),
    );
    const existingCodeKeys = new Set(
      allExisting
        .filter((q) => q.code)
        .map((q) => `${q.language || q.category}:${q.type || ''}:${(q.code || '').replace(/\s+/g, '')}`),
    );

    const batchSeenIds = new Set<string>();
    const batchSeenGeneralStems = new Set<string>();
    const batchSeenProgKeys = new Set<string>();

    const toAdd: Question[] = [];

    for (const q of questions) {
      // 1. 검증 미통과(rejected) 또는 미승인 수동검토(manualReviewRequired) 차단
      if (q.validationStatus === 'rejected' || q.validationStatus === 'manualReviewRequired') {
        continue;
      }

      // 2. ID 중복 검사
      if (existingIds.has(q.id) || batchSeenIds.has(q.id)) {
        continue;
      }

      const isProgramming = q.subject === '프로그래밍언어활용' || !!q.code;

      if (isProgramming) {
        const fp = q.structuralFingerprint;
        const codeKey = `${q.language || q.category}:${q.type || ''}:${(q.code || '').replace(/\s+/g, '')}`;

        // 구조 지문 중복 검사
        if (fp && (existingFingerprints.has(fp) || batchSeenProgKeys.has(fp))) {
          continue;
        }
        // 동일 코드 본문 중복 검사
        if (codeKey.length > 5 && (existingCodeKeys.has(codeKey) || batchSeenProgKeys.has(codeKey))) {
          continue;
        }

        batchSeenIds.add(q.id);
        if (fp) batchSeenProgKeys.add(fp);
        if (codeKey.length > 5) batchSeenProgKeys.add(codeKey);
        toAdd.push(q);
      } else {
        const stem = `${q.subject}:${q.question.replace(/\s+/g, '').toUpperCase()}`;
        if (existingGeneralStems.has(stem) || batchSeenGeneralStems.has(stem)) {
          continue;
        }

        batchSeenIds.add(q.id);
        batchSeenGeneralStems.add(stem);
        toAdd.push(q);
      }
    }

    if (toAdd.length === 0) return 0;

    this.cachedServerQuestions = [...this.cachedServerQuestions, ...toAdd];
    await LocalStorage.setItem(
      STORAGE_KEYS.CACHED_SERVER_QUESTIONS,
      this.cachedServerQuestions,
    );
    return toAdd.length;
  }


  /**
   * 기본 정적 문제와 서버에서 다운로드된 신규 문제를 합친 전체 목록을 반환합니다.
   */
  static getAll(): Question[] {
    const seen = new Set<string>();
    const merged: Question[] = [];
    for (const question of [...ALL_QUESTIONS, ...this.cachedServerQuestions]) {
      if (seen.has(question.id)) continue;
      seen.add(question.id);
      merged.push(question);
    }
    return merged;
  }

  /**
   * ID로 문제를 조회합니다.
   */
  static getById(id: string): Question | undefined {
    return this.getAll().find((q) => q.id === id);
  }

  /**
   * 과목별 문제를 조회합니다.
   */
  static getBySubject(subject: Subject): Question[] {
    return this.getAll().filter((q) => q.subject === subject);
  }

  /**
   * 단원/카테고리별 문제를 조회합니다.
   */
  static getByCategory(category: string): Question[] {
    return this.getAll().filter((q) => q.category === category);
  }

  static getExamYears(): number[] {
    const years = new Set<number>();
    for (const question of this.getAll()) {
      if (question.examYear) years.add(question.examYear);
    }
    return Array.from(years).sort((a, b) => b - a);
  }

  static getExamRounds(year?: number): number[] {
    const rounds = new Set<number>();
    for (const question of this.getAll()) {
      if (year && question.examYear !== year) continue;
      if (question.examRound) rounds.add(question.examRound);
    }
    return Array.from(rounds).sort((a, b) => a - b);
  }

  static filterByExam(
    questions: Question[],
    year?: number | null,
    round?: number | null,
  ): Question[] {
    return questions.filter((question) => {
      if (year && question.examYear !== year) return false;
      if (round && question.examRound !== round) return false;
      return true;
    });
  }

  static getByCategories(categories: string[], limit = 10): Question[] {
    const unique = new Set(categories);
    const matched = this.getAll().filter((q) => unique.has(q.category));
    return this.shuffle(matched).slice(0, limit);
  }

  /**
   * 여러 ID에 해당하는 문제를 순서대로 조회합니다. (오답노트, 북마크 등)
   */
  static getByIds(ids: string[]): Question[] {
    const map = new Map(this.getAll().map((q) => [q.id, q]));
    return ids
      .map((id) => map.get(id))
      .filter((q): q is Question => q !== undefined);
  }

  static shuffle<T>(items: T[]): T[] {
    return shuffleArray(items);
  }

  /**
   * 5분 퀵 퀴즈용 문제 추출 (오답 + 취약 단원 + 일반 문제 조합)
   */
  static getQuickQuizQuestions(
    count = 5,
    wrongQuestionIds: string[] = [],
    weakCategories: string[] = []
  ): Question[] {
    const all = this.getAll();
    const selectedMap = new Map<string, Question>();

    // 1. 최근 오답에서 우선 선별 (최대 40%)
    const wrongQuestions = all.filter((q) => wrongQuestionIds.includes(q.id));
    const shuffledWrong = this.shuffle(wrongQuestions);
    const wrongPickCount = Math.min(Math.floor(count * 0.4), shuffledWrong.length);
    for (let i = 0; i < wrongPickCount; i++) {
      selectedMap.set(shuffledWrong[i].id, shuffledWrong[i]);
    }

    // 2. 취약 단원에서 선별 (최대 30%)
    if (weakCategories.length > 0) {
      const weakQuestions = all.filter(
        (q) => weakCategories.includes(q.category) && !selectedMap.has(q.id)
      );
      const shuffledWeak = this.shuffle(weakQuestions);
      const weakPickCount = Math.min(Math.floor(count * 0.3), shuffledWeak.length);
      for (let i = 0; i < weakPickCount; i++) {
        selectedMap.set(shuffledWeak[i].id, shuffledWeak[i]);
      }
    }

    // 3. 나머지 개수만큼 전체 문제에서 랜덤 선별
    const remainingCount = count - selectedMap.size;
    const remainingQuestions = all.filter((q) => !selectedMap.has(q.id));
    const shuffledRemaining = this.shuffle(remainingQuestions);
    for (let i = 0; i < remainingCount && i < shuffledRemaining.length; i++) {
      selectedMap.set(shuffledRemaining[i].id, shuffledRemaining[i]);
    }

    return Array.from(selectedMap.values());
  }

  /**
   * 안 푼 문제만 필터링하여 반환합니다.
   */
  static getUnsolvedQuestions(
    attemptedIds: Set<string>,
    subject?: Subject,
    year?: number | null,
    round?: number | null,
  ): Question[] {
    let questions = this.getAll().filter((q) => !attemptedIds.has(q.id));
    if (subject) {
      questions = questions.filter((q) => q.subject === subject);
    }
    return this.filterByExam(questions, year, round);
  }

  /**
   * 이론 항목의 키워드 및 과목에 매칭되는 문제들을 조회합니다.
   */
  static getTheoryRelatedQuestions(
    subject: Subject,
    keywords: string[],
    limit = 10,
  ): Question[] {
    const allSubjectQuestions = this.getBySubject(subject);
    if (keywords.length === 0) {
      return this.shuffle(allSubjectQuestions).slice(0, limit);
    }

    const lowerKeywords = keywords.map((k) => k.toLowerCase());
    const matched = allSubjectQuestions.filter((q) => {
      const targetText = `${q.question} ${q.category} ${q.keywords.join(" ")} ${q.explanation}`.toLowerCase();
      return lowerKeywords.some((kw) => targetText.includes(kw));
    });

    const shuffledMatched = this.shuffle(matched);
    if (shuffledMatched.length >= limit) {
      return shuffledMatched.slice(0, limit);
    }

    // 매칭 결과가 limit보다 적으면(0개 포함), 매칭된 문제를 우선 두고 같은 과목 비매칭 문제로 중복 없이 보충
    const matchedIds = new Set(shuffledMatched.map((q) => q.id));
    const nonMatched = allSubjectQuestions.filter((q) => !matchedIds.has(q.id));
    const shuffledNonMatched = this.shuffle(nonMatched);
    const needed = limit - shuffledMatched.length;
    const supplemented = shuffledNonMatched.slice(0, needed);

    return [...shuffledMatched, ...supplemented];
  }
}


