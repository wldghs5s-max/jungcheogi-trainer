import { ALL_QUESTIONS } from '../data/questions';
import { Question, Subject } from '../types/question';
import { LocalStorage, STORAGE_KEYS } from '../storage/localStorage';
import { shuffleArray } from '../utils/quiz';
import { findNearDuplicateMemo } from '../utils/memoDedupe';

export function generalQuestionStem(question: Question): string {
  return `${question.subject}:${question.question.replace(/\s+/g, '').toUpperCase()}`;
}

export function programmingQuestionKey(question: Question): string | null {
  if (question.structuralFingerprint) {
    return `fp:${question.structuralFingerprint}`;
  }
  if (question.code) {
    return `code:${question.language || question.category}:${question.type || ''}:${question.code.replace(/\s+/g, '')}`;
  }
  return null;
}

export function isProgrammingQuestion(question: Question): boolean {
  return question.subject === '프로그래밍언어활용' || !!question.code;
}

export function isQuickCalcQuestion(question: Question): boolean {
  return (
    question.practiceKind === 'QUICK_CALC' ||
    (question.type === 'CODE_TRACE' && question.difficulty !== 'HARD')
  );
}

export function isSqlQuestion(question: Question): boolean {
  return (
    question.practiceKind === 'SQL_PRACTICE' ||
    question.type === 'SQL' ||
    question.language === 'SQL' ||
    question.category === 'SQL'
  );
}

function questionDedupeKey(question: Question): string | null {
  return isProgrammingQuestion(question)
    ? programmingQuestionKey(question)
    : generalQuestionStem(question);
}

/**
 * 번들 기출은 유지하고, 캐시에서 지문/코드가 같은 나중 항목의 id만 고른다.
 */
export function pickDuplicateCachedIds(
  bundled: Question[],
  cached: Question[],
): string[] {
  const kept = new Set<string>();
  const keptQuestions: Question[] = [];
  for (const question of bundled) {
    const key = questionDedupeKey(question);
    if (key) kept.add(key);
    keptQuestions.push(question);
  }

  const removeIds: string[] = [];
  for (const question of cached) {
    const key = questionDedupeKey(question);
    const exactDup = !!key && kept.has(key);
    const nearDup = !!findNearDuplicateMemo(question, keptQuestions);
    if (exactDup || nearDup) {
      removeIds.push(question.id);
      continue;
    }
    if (key) kept.add(key);
    keptQuestions.push(question);
  }
  return removeIds;
}

export class QuestionRepository {
  private static cachedServerQuestions: Question[] = [];

  private static async readCachedServerQuestions(): Promise<void> {
    const cached = await LocalStorage.getItem<Question[]>(STORAGE_KEYS.CACHED_SERVER_QUESTIONS);
    if (cached && Array.isArray(cached)) {
      this.cachedServerQuestions = cached;
    }
  }

  private static async persistCachedServerQuestions(): Promise<void> {
    await LocalStorage.setItem(
      STORAGE_KEYS.CACHED_SERVER_QUESTIONS,
      this.cachedServerQuestions,
    );
  }

  static sweepCachedDuplicates(): number {
    const removeIds = new Set(
      pickDuplicateCachedIds(ALL_QUESTIONS, this.cachedServerQuestions),
    );
    if (removeIds.size === 0) return 0;
    this.cachedServerQuestions = this.cachedServerQuestions.filter(
      (question) => !removeIds.has(question.id),
    );
    return removeIds.size;
  }

  /**
   * 로컬 스토리지에 캐시된 서버 신규 문제들을 메모리에 로드합니다.
   * 지문/코드가 같은 보관함 중복은 알림 없이 정리합니다.
   */
  static async loadCachedServerQuestions(): Promise<void> {
    await this.readCachedServerQuestions();
    if (this.sweepCachedDuplicates() > 0) {
      await this.persistCachedServerQuestions();
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
        if (findNearDuplicateMemo(q, [...allExisting, ...toAdd])) {
          continue;
        }

        batchSeenIds.add(q.id);
        batchSeenGeneralStems.add(stem);
        toAdd.push(q);
      }
    }

    if (toAdd.length === 0) return 0;

    this.cachedServerQuestions = [...this.cachedServerQuestions, ...toAdd];
    this.sweepCachedDuplicates();
    await this.persistCachedServerQuestions();
    const remainingIds = new Set(this.cachedServerQuestions.map((item) => item.id));
    return toAdd.filter((item) => remainingIds.has(item.id)).length;
  }

  static existingIds(ids: string[]): string[] {
    const have = new Set(this.getAll().map((item) => item.id));
    return ids.filter((id) => have.has(id));
  }

  static async replaceCachedServerQuestions(questions: Question[]): Promise<void> {
    this.cachedServerQuestions = [...questions];
    await LocalStorage.setItem(
      STORAGE_KEYS.CACHED_SERVER_QUESTIONS,
      this.cachedServerQuestions,
    );
  }

  static countCachedDuplicates(): number {
    return pickDuplicateCachedIds(ALL_QUESTIONS, this.cachedServerQuestions).length;
  }

  /**
   * 캐시에만 있는 중복 문항을 삭제한다. 앱 번들 기출은 건드리지 않는다.
   */
  static async removeDuplicateCachedQuestions(): Promise<number> {
    await this.readCachedServerQuestions();
    const removed = this.sweepCachedDuplicates();
    if (removed > 0) {
      await this.persistCachedServerQuestions();
    }
    return removed;
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
   * 5분 퀵 퀴즈용 문제 추출
   * 우선순위:
   * 1. NEW (한 번도 안 푼 문제) 최우선 할당 (최소 2~3개 보장)
   * 2. WEAK (최근 오답 및 취약 문제) (1~2개)
   * 3. DUE (복습 주기 도래 문제) / LEARNING
   * 4. 일반 문제 (MASTERED 제외 풀)
   * 5. MASTERED (이미 숙달된 문제는 후보 부족 시에만 후순위 배정)
   * + 최근 1~2세션 출현 문제(recentQuestionIds) 쿨다운 배제
   */
  static getQuickQuizQuestions(
    count = 5,
    dueQuestionIds: string[] = [],
    weakCategories: string[] = [],
    unsolvedQuestionIds: string[] = [],
    options?: {
      recentQuestionIds?: string[];
      weakQuestionIds?: string[];
      masteredQuestionIds?: string[];
    },
  ): Question[] {
    const all = this.getAll();
    const selectedMap = new Map<string, Question>();

    // 1. 최근 출현 문제(쿨다운) 배제 풀 구성
    const recentSet = new Set(options?.recentQuestionIds || []);
    let availablePool = all.filter((q) => !recentSet.has(q.id));
    if (availablePool.length < count) {
      // 쿨다운 적용 시 풀이 부족한 극단적 경우에만 쿨다운 완화
      availablePool = all;
    }

    const unsolvedSet = new Set(unsolvedQuestionIds);
    const weakSet = new Set(options?.weakQuestionIds || []);
    const dueSet = new Set(dueQuestionIds);
    const weakCatSet = new Set(weakCategories);
    const masteredSet = new Set(options?.masteredQuestionIds || []);

    const takeFromPool = (pool: Question[], limit: number) => {
      if (limit <= 0) return;
      const candidates = pool.filter((q) => !selectedMap.has(q.id));
      const shuffled = this.shuffle(candidates);
      const pickCount = Math.min(limit, shuffled.length);
      for (let i = 0; i < pickCount; i++) {
        selectedMap.set(shuffled[i].id, shuffled[i]);
      }
    };

    // 1순위: NEW (한 번도 풀지 않은 문제) - 기본 5문항 중 최소 3문항(60%) 할당
    const targetNew = Math.min(count, Math.max(3, Math.ceil(count * 0.6)));
    const newPool = availablePool.filter((q) => unsolvedSet.has(q.id));

    // 1순위 내부 믹스인: 암기 피로 방지를 위해 계산 1개, SQL 0~1개 우선 배정 (NEW 풀에 존재 시)
    if (newPool.length > 0) {
      const newCalcCandidates = newPool.filter(
        (q) => !selectedMap.has(q.id) && isQuickCalcQuestion(q),
      );
      const newSqlCandidates = newPool.filter(
        (q) => !selectedMap.has(q.id) && isSqlQuestion(q),
      );

      const calcQuota = targetNew >= 3 && newCalcCandidates.length > 0 ? 1 : 0;
      const sqlQuota =
        targetNew >= 4 && newSqlCandidates.length > 0
          ? 1
          : targetNew >= 3 && Math.random() < 0.5 && newSqlCandidates.length > 0
          ? 1
          : 0;

      if (calcQuota > 0) {
        takeFromPool(newCalcCandidates, calcQuota);
      }
      if (sqlQuota > 0) {
        takeFromPool(newSqlCandidates, sqlQuota);
      }

      // 남은 NEW 슬롯은 일반(이론/암기) 문제로 우선 채우고, 부족 시 newPool 전체에서 보충
      const remainingNew = targetNew - selectedMap.size;
      if (remainingNew > 0) {
        const generalNewCandidates = newPool.filter(
          (q) => !isQuickCalcQuestion(q) && !isSqlQuestion(q),
        );
        takeFromPool(generalNewCandidates, remainingNew);
        if (targetNew - selectedMap.size > 0) {
          takeFromPool(newPool, targetNew - selectedMap.size);
        }
      }
    }

    // 2순위: WEAK / 최근 오답 문제
    const weakPool = availablePool.filter(
      (q) => !unsolvedSet.has(q.id) && (weakSet.has(q.id) || weakCatSet.has(q.category)),
    );
    const initialWeakTarget = Math.min(count - selectedMap.size, selectedMap.size > 0 ? 2 : count);
    takeFromPool(weakPool, initialWeakTarget);

    // 3순위: DUE (복습 주기 도래 문제)
    if (selectedMap.size < count) {
      const duePool = availablePool.filter(
        (q) => !unsolvedSet.has(q.id) && !weakSet.has(q.id) && dueSet.has(q.id),
      );
      takeFromPool(duePool, count - selectedMap.size);
    }

    // 3.5순위: 여전히 슬롯이 남았다면, 남은 WEAK 풀에서 추가 배정 (GENERAL/MASTERED 전 취약 보강)
    if (selectedMap.size < count) {
      takeFromPool(weakPool, count - selectedMap.size);
    }

    // 4순위: 일반 문제 (마스터된 문제 제외)
    if (selectedMap.size < count) {
      const generalPool = availablePool.filter(
        (q) => !unsolvedSet.has(q.id) && !weakSet.has(q.id) && !dueSet.has(q.id) && !masteredSet.has(q.id),
      );
      takeFromPool(generalPool, count - selectedMap.size);
    }

    // 5순위: 마스터된 문제 및 전체 풀 보충 (후보 부족 시)
    if (selectedMap.size < count) {
      // 이미 계산/SQL 문제가 채워진 경우, 일반 문제(비계산/비SQL)로 우선 보충하여 불필요한 과다 출제 방지
      const hasCalc = Array.from(selectedMap.values()).some(isQuickCalcQuestion);
      const hasSql = Array.from(selectedMap.values()).some(isSqlQuestion);
      if (hasCalc || hasSql) {
        const nonMixed = availablePool.filter(
          (q) => (!hasCalc || !isQuickCalcQuestion(q)) && (!hasSql || !isSqlQuestion(q)),
        );
        takeFromPool(nonMixed, count - selectedMap.size);
      }
    }
    if (selectedMap.size < count) {
      takeFromPool(availablePool, count - selectedMap.size);
    }
    if (selectedMap.size < count) {
      takeFromPool(all, count - selectedMap.size);
    }

    return this.shuffle(Array.from(selectedMap.values()));
  }

  /**
   * 안 푼 문제 10선 퀵 퀴즈용 문제 추출
   * 암기 피로 방지를 위해 필기구 없는 암산형 계산 문제(1~3개)와 SQL 실무 문제(1개)를
   * 일반 암기/개념 문제와 밸런스 있게 믹스인하여 출제합니다.
   */
  static getUnsolved10QuickQuizQuestions(
    attemptedQuestionIds: Set<string> | string[],
    options?: {
      recentQuestionIds?: string[];
    },
  ): Question[] {
    const attemptedSet =
      attemptedQuestionIds instanceof Set
        ? attemptedQuestionIds
        : new Set(attemptedQuestionIds);

    const allUnsolved = this.getUnsolvedQuestions(attemptedSet);
    if (allUnsolved.length === 0) {
      return [];
    }

    // 1. 최근 출현 문제(쿨다운) 배제 풀 구성
    const recentSet = new Set(options?.recentQuestionIds || []);
    let pool = allUnsolved.filter((q) => !recentSet.has(q.id));
    if (pool.length < 10) {
      pool = allUnsolved;
    }

    if (pool.length <= 10) {
      return this.shuffle(pool);
    }

    const selectedMap = new Map<string, Question>();

    const pickFromList = (list: Question[], count: number) => {
      if (count <= 0) return;
      const candidates = list.filter((q) => !selectedMap.has(q.id));
      const shuffled = this.shuffle(candidates);
      const pickCount = Math.min(count, shuffled.length);
      for (let i = 0; i < pickCount; i++) {
        selectedMap.set(shuffled[i].id, shuffled[i]);
      }
    };

    // 2. 카테고리별 후보군 분류
    const calcCandidates = pool.filter((q) => isQuickCalcQuestion(q));
    const sqlCandidates = pool.filter((q) => isSqlQuestion(q));
    const generalCandidates = pool.filter(
      (q) => !isQuickCalcQuestion(q) && !isSqlQuestion(q),
    );

    // 3. 목표 비율: 계산 1~3개, SQL 1개, 일반 6~8개
    const desiredCalc = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3
    const desiredSql = 1;
    const desiredGeneral = 10 - desiredCalc - desiredSql;

    // 4. 슬롯 순차 할당
    pickFromList(calcCandidates, desiredCalc);
    pickFromList(sqlCandidates, desiredSql);
    pickFromList(generalCandidates, desiredGeneral);

    // 5. 풀 부족 시 남은 풀 및 전체 미풀이 풀에서 10문항 안전 보충
    if (selectedMap.size < 10) {
      pickFromList(pool, 10 - selectedMap.size);
    }
    if (selectedMap.size < 10) {
      pickFromList(allUnsolved, 10 - selectedMap.size);
    }

    // 6. 문제가 문제 세션 중간중간 자연스럽게 배치되도록 최종 셔플
    return this.shuffle(Array.from(selectedMap.values()));
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
    prioritizeIds: string[] = [],
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

    const prioritySet = new Set(prioritizeIds);
    const prioritized = this.shuffle(matched.filter((q) => prioritySet.has(q.id)));
    const restMatched = this.shuffle(matched.filter((q) => !prioritySet.has(q.id)));
    const orderedMatched = [...prioritized, ...restMatched];
    if (orderedMatched.length >= limit) {
      return orderedMatched.slice(0, limit);
    }

    const matchedIds = new Set(orderedMatched.map((q) => q.id));
    const nonMatched = allSubjectQuestions.filter((q) => !matchedIds.has(q.id));
    const shuffledNonMatched = this.shuffle(nonMatched);
    const needed = limit - orderedMatched.length;
    const supplemented = shuffledNonMatched.slice(0, needed);

    return [...orderedMatched, ...supplemented];
  }
}


