import { ProgrammingHistoryTracker } from './historyTracker';
import { TOPIC_METADATA } from './taxonomy';
import { GenerationContext, IProgrammingQuestionGenerator } from './types';

/**
 * 가중치 기반 문제 생성기 선택기
 */
export class GeneratorSelector {
  /**
   * 사용자 학습 이력, 최근 출제 빈도, 출제 중요도, 실패 페널티를 종합 반영하여
   * 최적의 생성기를 가중치 확률 기반으로 선택합니다.
   */
  static async selectGenerator(
    context: GenerationContext,
    generators: IProgrammingQuestionGenerator[],
  ): Promise<IProgrammingQuestionGenerator | null> {
    if (generators.length === 0) return null;
    if (generators.length === 1) return generators[0];

    const recentTopics =
      context.recentTopics || (await ProgrammingHistoryTracker.getRecentTopics());
    const weakTopics = context.weakTopics || [];

    // 1. 각 생성기별 점수(가중치) 계산
    const scoredGenerators = generators.map((gen) => {
      let weight = 100;

      // (1) 정보처리기사 출제 중요도 반영 (1~5점 -> 1.0 ~ 1.5배)
      const maxImportance = Math.max(
        ...gen.supportedTopics.map((t) => TOPIC_METADATA[t]?.examImportance || 3),
      );
      weight *= 1.0 + (maxImportance - 1) * 0.12;

      // (2) 사용자의 취약 주제 우선 (1.8배 가산)
      const isWeak = gen.supportedTopics.some((t) => weakTopics.includes(t));
      if (isWeak) {
        weight *= 1.8;
      }

      // (3) 직전 출제된 주제 감점 (연속 출제 방지: 최근 2개 내 포함 시 0.2배)
      const immediatePast = recentTopics.slice(0, 2);
      const isImmediateRecent = gen.supportedTopics.some((t) =>
        immediatePast.includes(t),
      );
      if (isImmediateRecent) {
        weight *= 0.2;
      } else {
        // 최근 5개 내에도 안 나온 주제는 보너스
        const isNotRecentAtAll = gen.supportedTopics.every(
          (t) => !recentTopics.includes(t),
        );
        if (isNotRecentAtAll) {
          weight *= 1.5;
        }
      }

      // (4) 목표 난이도 부합 여부
      if (
        context.targetDifficulty &&
        gen.supportedDifficulties.includes(context.targetDifficulty)
      ) {
        weight *= 1.3;
      }

      // (5) 생성 실패 페널티 반영
      const failureCount = ProgrammingHistoryTracker.getFailureCount(gen.id);
      if (failureCount > 0) {
        weight *= Math.max(0.1, 1.0 - failureCount * 0.3);
      }

      return { generator: gen, weight: Math.max(1, weight) };
    });

    // 2. 가중치 기반 룰렛 휠(Roulette-wheel) 선택 (시드 존재 시 결정론적 선택)
    const rng = context.seed !== undefined
      ? (() => {
          let s = Math.abs(context.seed * 16807 + 7) % 2147483647;
          if (s <= 0) s += 2147483646;
          return () => {
            s = (s * 16807) % 2147483647;
            return (s - 1) / 2147483646;
          };
        })()
      : Math.random;

    const totalWeight = scoredGenerators.reduce((sum, item) => sum + item.weight, 0);
    let randomVal = rng() * totalWeight;

    for (const item of scoredGenerators) {
      if (randomVal <= item.weight) {
        return item.generator;
      }
      randomVal -= item.weight;
    }

    return scoredGenerators[0].generator;
  }
}

