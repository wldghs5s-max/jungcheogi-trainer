/** 틀린 이유: 답을 썼지만 틀림(헷갈림) vs 몰라서 포기 */
export type MissType = "WRONG" | "UNKNOWN";

export interface QuizAttempt {
  id: string;
  questionId: string;
  selectedAnswer: string | string[];
  correctAnswer: string | string[];
  isCorrect: boolean;
  /** 오답일 때만 기록. 구버전 데이터는 없으면 WRONG으로 본다. */
  missType?: MissType;
  /** 제출 전에 힌트를 봤으면 숙련 승급을 하지 않는다. */
  hintUsed?: boolean;
  /** 답을 입력하기 전에 정답을 연 경우. */
  solutionRevealed?: boolean;
  answeredAt: string; // ISO String
  syncStatus?: "PENDING" | "SYNCED" | "FAILED";
  /** AI 검증에서 문제 오류(QUESTION_SUSPECT) 또는 채점 의심(GRADING_SUSPECT)으로 판정된 건 */
  isSuspect?: boolean;
  suspectReason?: string;
}

export function isUnknownAttempt(attempt: QuizAttempt): boolean {
  return !attempt.isCorrect && attempt.missType === "UNKNOWN";
}

export function isConfusedAttempt(attempt: QuizAttempt): boolean {
  return !attempt.isCorrect && attempt.missType !== "UNKNOWN";
}
