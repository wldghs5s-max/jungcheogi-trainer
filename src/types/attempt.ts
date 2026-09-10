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
  answeredAt: string; // ISO String
  syncStatus?: "PENDING" | "SYNCED" | "FAILED";
}

export function isUnknownAttempt(attempt: QuizAttempt): boolean {
  return !attempt.isCorrect && attempt.missType === "UNKNOWN";
}

export function isConfusedAttempt(attempt: QuizAttempt): boolean {
  return !attempt.isCorrect && attempt.missType !== "UNKNOWN";
}
