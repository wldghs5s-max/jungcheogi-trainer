import { ALL_QUESTIONS } from '../data/questions';
import { Question, Subject } from '../types/question';
import { LocalStorage, STORAGE_KEYS } from '../storage/localStorage';

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

  /**
   * 기본 정적 문제와 서버에서 다운로드된 신규 문제를 합친 전체 목록을 반환합니다.
   */
  static getAll(): Question[] {
    return [...ALL_QUESTIONS, ...this.cachedServerQuestions];
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

  /**
   * 여러 ID에 해당하는 문제를 순서대로 조회합니다. (오답노트, 북마크 등)
   */
  static getByIds(ids: string[]): Question[] {
    const idSet = new Set(ids);
    return this.getAll().filter((q) => idSet.has(q.id));
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
    const shuffledWrong = [...wrongQuestions].sort(() => Math.random() - 0.5);
    const wrongPickCount = Math.min(Math.floor(count * 0.4), shuffledWrong.length);
    for (let i = 0; i < wrongPickCount; i++) {
      selectedMap.set(shuffledWrong[i].id, shuffledWrong[i]);
    }

    // 2. 취약 단원에서 선별 (최대 30%)
    if (weakCategories.length > 0) {
      const weakQuestions = all.filter(
        (q) => weakCategories.includes(q.category) && !selectedMap.has(q.id)
      );
      const shuffledWeak = [...weakQuestions].sort(() => Math.random() - 0.5);
      const weakPickCount = Math.min(Math.floor(count * 0.3), shuffledWeak.length);
      for (let i = 0; i < weakPickCount; i++) {
        selectedMap.set(shuffledWeak[i].id, shuffledWeak[i]);
      }
    }

    // 3. 나머지 개수만큼 전체 문제에서 랜덤 선별
    const remainingCount = count - selectedMap.size;
    const remainingQuestions = all.filter((q) => !selectedMap.has(q.id));
    const shuffledRemaining = [...remainingQuestions].sort(() => Math.random() - 0.5);
    for (let i = 0; i < remainingCount && i < shuffledRemaining.length; i++) {
      selectedMap.set(shuffledRemaining[i].id, shuffledRemaining[i]);
    }

    return Array.from(selectedMap.values());
  }
}
