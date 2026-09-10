import { LocalStorage, STORAGE_KEYS } from '../storage/localStorage';
import { isUnknownAttempt, MissType, QuizAttempt } from '../types/attempt';

export interface WrongQuestionSummary {
  questionId: string;
  totalAttempts: number;
  /** 답을 썼지만 틀린 횟수 (헷갈림) */
  wrongAttempts: number;
  /** 모른다를 누른 횟수 */
  unknownAttempts: number;
  correctAttempts: number;
  lastAttemptIsWrong: boolean;
  lastMissType?: MissType;
  lastAnsweredAt: string;
}

export class AttemptRepository {
  /**
   * 새로운 풀이 이력을 저장합니다.
   */
  static async saveAttempt(attempt: QuizAttempt): Promise<void> {
    const attempts = await this.getAllAttempts();
    attempts.unshift(attempt); // 최신 시도가 앞쪽에 위치하도록 추가
    await LocalStorage.setItem(STORAGE_KEYS.QUIZ_ATTEMPTS, attempts);
  }

  /**
   * 모든 풀이 이력을 불러옵니다.
   */
  static async getAllAttempts(): Promise<QuizAttempt[]> {
    const attempts = await LocalStorage.getItem<QuizAttempt[]>(STORAGE_KEYS.QUIZ_ATTEMPTS);
    return attempts || [];
  }

  /**
   * 특정 문제의 모든 풀이 이력을 조회합니다.
   */
  static async getAttemptsByQuestionId(questionId: string): Promise<QuizAttempt[]> {
    const attempts = await this.getAllAttempts();
    return attempts.filter((a) => a.questionId === questionId);
  }

  /**
   * 최근 풀이 이력을 지정한 개수만큼 조회합니다.
   */
  static async getRecentAttempts(limit = 10): Promise<QuizAttempt[]> {
    const attempts = await this.getAllAttempts();
    return attempts.slice(0, limit);
  }

  /**
   * 문제별 오답 통계 집계 정보를 반환합니다.
   */
  static async getWrongQuestionSummaries(): Promise<WrongQuestionSummary[]> {
    const attempts = await this.getAllAttempts();
    const map = new Map<string, WrongQuestionSummary>();

    // attempts는 최신순(unshift)으로 정렬되어 있으므로 첫 번째 만나는 것이 최근 결과임
    for (const att of attempts) {
      const existing = map.get(att.questionId);
      if (!existing) {
        map.set(att.questionId, {
          questionId: att.questionId,
          totalAttempts: 1,
          wrongAttempts: isUnknownAttempt(att) ? 0 : att.isCorrect ? 0 : 1,
          unknownAttempts: isUnknownAttempt(att) ? 1 : 0,
          correctAttempts: att.isCorrect ? 1 : 0,
          lastAttemptIsWrong: !att.isCorrect,
          lastMissType: att.isCorrect
            ? undefined
            : isUnknownAttempt(att)
              ? "UNKNOWN"
              : "WRONG",
          lastAnsweredAt: att.answeredAt,
        });
      } else {
        existing.totalAttempts += 1;
        if (att.isCorrect) {
          existing.correctAttempts += 1;
        } else if (isUnknownAttempt(att)) {
          existing.unknownAttempts += 1;
        } else {
          existing.wrongAttempts += 1;
        }
      }
    }

    // 한 번이라도 틀리거나 모른 적이 있는 문제들만 필터링
    return Array.from(map.values()).filter(
      (item) => item.wrongAttempts > 0 || item.unknownAttempts > 0,
    );
  }

  /**
   * 오답 필터(최근 오답, 많이 틀린 순, 전체 오답)에 따라 문제 ID 목록을 반환합니다.
   */
  static async getWrongQuestionIds(filter: 'all' | 'recent' | 'most_wrong' = 'all'): Promise<string[]> {
    const summaries = await this.getWrongQuestionSummaries();

    if (filter === 'recent') {
      // 최근에 푼 결과가 오답인 것 우선, 최근 푼 날짜순 정렬
      return summaries
        .filter((s) => s.lastAttemptIsWrong)
        .sort((a, b) => new Date(b.lastAnsweredAt).getTime() - new Date(a.lastAnsweredAt).getTime())
        .map((s) => s.questionId);
    }

    if (filter === 'most_wrong') {
      // 많이 틀린 순 정렬
      return summaries
        .sort((a, b) => b.wrongAttempts - a.wrongAttempts)
        .map((s) => s.questionId);
    }

    // 'all'
    return summaries
      .sort((a, b) => new Date(b.lastAnsweredAt).getTime() - new Date(a.lastAnsweredAt).getTime())
      .map((s) => s.questionId);
  }

  /**
   * 풀이 이력을 초기화합니다 (개발/테스트용).
   */
  static async clearAll(): Promise<void> {
    await LocalStorage.removeItem(STORAGE_KEYS.QUIZ_ATTEMPTS);
  }
}
