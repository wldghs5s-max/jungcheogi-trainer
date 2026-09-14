import { CodeLanguage, Difficulty } from '../../types/question';
import {
  ControlStructureType,
  DataStructureType,
  FlowControlType,
  PrimaryOperationType,
  ProgrammingQuestionType,
  ProgrammingTopic,
} from './taxonomy';
import { StructuralFingerprintComponents } from './types';

/**
 * 구조 지문 빌더 및 유사도 분석기
 */
export class StructuralFingerprintService {
  /**
   * 구성 요소 객체로부터 정규화된 구조 지문 문자열을 생성합니다.
   * 형식: LANGUAGE|TOPIC|QUESTION_TYPE|CONTROL_STRUCT|OPERATION|DATA_STRUCT|FLOW_CTRL|DIFFICULTY
   */
  static build(components: StructuralFingerprintComponents): string {
    return [
      components.language,
      components.topic,
      components.questionType,
      components.controlStructure,
      components.primaryOperation,
      components.dataStructure,
      components.flowControl,
      components.difficulty,
    ].join('|');
  }

  /**
   * 지문 문자열을 구조 객체로 파싱합니다.
   */
  static parse(fingerprint: string): StructuralFingerprintComponents | null {
    const parts = fingerprint.split('|');
    if (parts.length !== 8) return null;

    return {
      language: parts[0] as CodeLanguage,
      topic: parts[1] as ProgrammingTopic,
      questionType: parts[2] as ProgrammingQuestionType,
      controlStructure: parts[3] as ControlStructureType,
      primaryOperation: parts[4] as PrimaryOperationType,
      dataStructure: parts[5] as DataStructureType,
      flowControl: parts[6] as FlowControlType,
      difficulty: parts[7] as Difficulty,
    };
  }

  /**
   * 두 구조 지문 간의 구조적 유사도 점수를 계산합니다 (0.0 ~ 1.0).
   * 가중치:
   * - 주제 일치: 0.30 (가장 중요)
   * - 문제 유형 일치: 0.20
   * - 제어 구조 일치: 0.20
   * - 언어 일치: 0.10
   * - 주요 연산 일치: 0.10
   * - 자료 구조 일치: 0.05
   * - 흐름 제어 일치: 0.05
   */
  static calculateSimilarity(fpA: string, fpB: string): number {
    if (fpA === fpB) return 1.0;

    const a = this.parse(fpA);
    const b = this.parse(fpB);
    if (!a || !b) return 0.0;

    let score = 0;
    if (a.topic === b.topic) score += 0.3;
    if (a.questionType === b.questionType) score += 0.2;
    if (a.controlStructure === b.controlStructure) score += 0.2;
    if (a.language === b.language) score += 0.1;
    if (a.primaryOperation === b.primaryOperation) score += 0.1;
    if (a.dataStructure === b.dataStructure) score += 0.05;
    if (a.flowControl === b.flowControl) score += 0.05;

    return Number(score.toFixed(2));
  }

  /**
   * 주어진 새 지문이 최근 지문 목록과 과도하게 유사한지 검사합니다.
   * @param candidateFingerprint 검사할 새 문제의 지문
   * @param recentFingerprints 최근 출제된 문제들의 지문
   * @param threshold 유사도 한계치 (기본값: 0.70)
   */
  static isTooSimilar(
    candidateFingerprint: string,
    recentFingerprints: string[],
    threshold = 0.7,
  ): boolean {
    // 1. 완전히 동일한 지문은 즉시 중복 판정
    if (recentFingerprints.includes(candidateFingerprint)) {
      return true;
    }

    // 2. 가장 최근 출제된 문제(최신 3개)와의 유사도 집중 검사
    const immediateRecent = recentFingerprints.slice(0, 3);
    for (const recent of immediateRecent) {
      if (this.calculateSimilarity(candidateFingerprint, recent) >= threshold) {
        return true;
      }
    }

    return false;
  }
}
