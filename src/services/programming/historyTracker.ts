import { LocalStorage } from '../../storage/localStorage';
import { StructuralFingerprintService } from './fingerprint';
import { ProgrammingTopic } from './taxonomy';
import { GeneratedProgrammingQuestion } from './types';

const PROGRAMMING_HISTORY_KEY = '@programming_history_v1';
const MAX_FINGERPRINT_WINDOW = 60;
const MAX_TOPIC_WINDOW = 6;

interface ProgrammingHistoryState {
  fingerprints: string[];
  topics: ProgrammingTopic[];
  generatorFailureCounts: Record<string, number>;
  lastGeneratedAt?: string;
}

export class ProgrammingHistoryTracker {
  private static state: ProgrammingHistoryState = {
    fingerprints: [],
    topics: [],
    generatorFailureCounts: {},
  };
  private static isLoaded = false;

  private static async ensureLoaded(): Promise<void> {
    if (this.isLoaded) return;
    const cached = await LocalStorage.getItem<ProgrammingHistoryState>(
      PROGRAMMING_HISTORY_KEY,
    );
    if (cached) {
      this.state = {
        fingerprints: Array.isArray(cached.fingerprints) ? cached.fingerprints : [],
        topics: Array.isArray(cached.topics) ? cached.topics : [],
        generatorFailureCounts: cached.generatorFailureCounts || {},
        lastGeneratedAt: cached.lastGeneratedAt,
      };
    }
    this.isLoaded = true;
  }

  static async getRecentFingerprints(): Promise<string[]> {
    await this.ensureLoaded();
    return [...this.state.fingerprints];
  }

  static async getRecentTopics(): Promise<ProgrammingTopic[]> {
    await this.ensureLoaded();
    return [...this.state.topics];
  }

  /**
   * 새 문제가 출제되었을 때 이력을 기록합니다.
   */
  static async recordQuestion(question: GeneratedProgrammingQuestion): Promise<void> {
    await this.ensureLoaded();

    // 지문 윈도우 갱신 (최신순 앞쪽)
    const updatedFingerprints = [
      question.structuralFingerprint,
      ...this.state.fingerprints.filter((fp) => fp !== question.structuralFingerprint),
    ].slice(0, MAX_FINGERPRINT_WINDOW);

    // 주제 윈도우 갱신
    const updatedTopics = [question.topic, ...this.state.topics].slice(
      0,
      MAX_TOPIC_WINDOW,
    );

    this.state = {
      ...this.state,
      fingerprints: updatedFingerprints,
      topics: updatedTopics,
      lastGeneratedAt: new Date().toISOString(),
    };

    await LocalStorage.setItem(PROGRAMMING_HISTORY_KEY, this.state);
  }

  /**
   * 해당 지문이 최근에 출제되어 중복이거나 과도하게 유사한지 검사합니다.
   */
  static async isDuplicateOrTooSimilar(fingerprint: string): Promise<boolean> {
    await this.ensureLoaded();
    return StructuralFingerprintService.isTooSimilar(
      fingerprint,
      this.state.fingerprints,
      0.7,
    );
  }

  /**
   * 직전 출제된 주제와 동일하여 회피해야 하는지 확인합니다.
   */
  static async shouldAvoidTopic(topic: ProgrammingTopic): Promise<boolean> {
    await this.ensureLoaded();
    // 가장 최근 1~2문제가 동일 주제인 경우 피함
    return this.state.topics.slice(0, 2).includes(topic);
  }

  /**
   * 생성 실패 시 페널티를 부여합니다.
   */
  static async recordFailure(generatorId: string): Promise<void> {
    await this.ensureLoaded();
    const count = (this.state.generatorFailureCounts[generatorId] || 0) + 1;
    this.state.generatorFailureCounts[generatorId] = count;
    await LocalStorage.setItem(PROGRAMMING_HISTORY_KEY, this.state);
  }

  /**
   * 생성기의 현재 실패 페널티를 조회합니다.
   */
  static getFailureCount(generatorId: string): number {
    return this.state.generatorFailureCounts[generatorId] || 0;
  }

  /**
   * 이력 초기화 (테스트 또는 사용자 설정용)
   */
  static async clearHistory(): Promise<void> {
    this.state = {
      fingerprints: [],
      topics: [],
      generatorFailureCounts: {},
    };
    this.isLoaded = true;
    await LocalStorage.removeItem(PROGRAMMING_HISTORY_KEY);
  }
}
