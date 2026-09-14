import { ProgrammingEngine } from '../services/programming/programmingEngine';
import { Question } from '../types/question';

export { ProgrammingEngine } from '../services/programming/programmingEngine';

const GENERATE_BATCH = 6;

/**
 * 프로그래밍 연습 문제 번들을 생성합니다.
 * 내부적으로 10종의 조합식 독립 생성기 레지스트리와 구조 지문 중복 방지 엔진을 사용하여
 * 주제, 문제 유형, 언어가 고르게 분포된 고품질 기출 변형 문제를 반환합니다.
 */
export function generateProgrammingPracticeBundle(startIndex: number): Question[] {
  return ProgrammingEngine.generateBundleSync(GENERATE_BATCH, startIndex);
}

/**
 * 비동기 번들 생성기 (가중치 및 사용자 취약점 반영)
 */
export async function generateProgrammingPracticeBundleAsync(
  startIndex = 0,
  count = GENERATE_BATCH,
): Promise<Question[]> {
  return await ProgrammingEngine.generateBundle(count, startIndex);
}
