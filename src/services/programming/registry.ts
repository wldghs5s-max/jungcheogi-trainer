import { CodeLanguage, Difficulty } from '../../types/question';
import { ProgrammingQuestionType, ProgrammingTopic } from './taxonomy';
import { IProgrammingQuestionGenerator } from './types';

/**
 * 독립형 프로그래밍 문제 생성기 레지스트리 (Singleton)
 */
export class GeneratorRegistry {
  private static generators: Map<string, IProgrammingQuestionGenerator> = new Map();

  /**
   * 생성기를 레지스트리에 등록합니다.
   */
  static register(generator: IProgrammingQuestionGenerator): void {
    if (this.generators.has(generator.id)) {
      console.warn(`[GeneratorRegistry] Generator '${generator.id}' is being overwritten.`);
    }
    this.generators.set(generator.id, generator);
  }

  /**
   * ID로 등록된 생성기를 조회합니다.
   */
  static get(id: string): IProgrammingQuestionGenerator | undefined {
    return this.generators.get(id);
  }

  /**
   * 등록된 모든 생성기 목록을 반환합니다.
   */
  static getAll(): IProgrammingQuestionGenerator[] {
    return Array.from(this.generators.values());
  }

  /**
   * 조건(주제, 유형, 언어, 난이도)에 맞는 생성기들을 필터링합니다.
   */
  static find(filter: {
    topic?: ProgrammingTopic;
    type?: ProgrammingQuestionType;
    language?: CodeLanguage;
    difficulty?: Difficulty;
  }): IProgrammingQuestionGenerator[] {
    return this.getAll().filter((gen) => {
      if (filter.topic && !gen.supportedTopics.includes(filter.topic)) {
        return false;
      }
      if (filter.type && !gen.supportedTypes.includes(filter.type)) {
        return false;
      }
      if (filter.language && !gen.supportedLanguages.includes(filter.language)) {
        return false;
      }
      if (
        filter.difficulty &&
        !gen.supportedDifficulties.includes(filter.difficulty)
      ) {
        return false;
      }
      // 언어와 주제의 도메인 호환성 검사: 포인터(POINTER_REFERENCE)는 C 언어 전용
      if (filter.topic === 'POINTER_REFERENCE' && filter.language && filter.language !== 'C') {
        return false;
      }
      return true;
    });
  }


  private static onClearListeners: Array<() => void> = [];

  /**
   * clear 시 호출될 리스너를 등록합니다 (상태 리셋 연동).
   */
  static addOnClearListener(listener: () => void): void {
    this.onClearListeners.push(listener);
  }


  /**
   * 등록된 생성기 총 개수
   */
  static count(): number {
    return this.generators.size;
  }

  /**
   * 레지스트리를 비웁니다 (테스트용).
   */
  static clear(): void {
    this.generators.clear();
    for (const listener of this.onClearListeners) {
      try {
        listener();
      } catch (e) {
        console.error('[GeneratorRegistry] clear listener error:', e);
      }
    }
  }
}

