import { Question } from '../types/question';

/**
 * 사용자 답안 문자열을 비교하기 좋은 형태로 정규화합니다.
 */
export function normalizeAnswer(ans: string): string {
  return ans
    .trim()
    .replace(/\s+/g, '') // 모든 공백 제거 (예: 'GROUP BY' -> 'GROUPBY')
    .toUpperCase(); // 영문 대소문자 무시
}

/**
 * 답안 일치 여부를 엄밀하게 판정합니다.
 */
export function checkAnswer(
  userAnswer: string | string[],
  correctAnswer: string | string[]
): boolean {
  if (Array.isArray(userAnswer)) {
    // 배열 답안의 경우 (다중 선택 등)
    if (!Array.isArray(correctAnswer)) return false;
    if (userAnswer.length !== correctAnswer.length) return false;
    const normUser = userAnswer.map(normalizeAnswer).sort();
    const normCorrect = correctAnswer.map(normalizeAnswer).sort();
    return normUser.every((v, i) => v === normCorrect[i]);
  }

  const normUser = normalizeAnswer(userAnswer);

  if (Array.isArray(correctAnswer)) {
    // 복수 정답 허용 목록 중 하나와 일치하면 정답
    return correctAnswer.some((ans) => normalizeAnswer(ans) === normUser);
  }

  return normalizeAnswer(correctAnswer) === normUser;
}

/**
 * 정답 문자열 표시용 변환
 */
export function formatAnswerDisplay(answer: string | string[]): string {
  if (Array.isArray(answer)) {
    return answer.join(' 또는 ');
  }
  return answer;
}

export function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
