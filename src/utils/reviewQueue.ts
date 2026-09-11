import { isUnknownAttempt, QuizAttempt } from "../types/attempt";

const UNKNOWN_INTERVAL_DAYS = 0;
const CONFUSED_INTERVAL_DAYS = 1;
const CORRECT_INTERVAL_DAYS = 3;

function startOfDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

function addDays(iso: string, days: number): number {
  const date = new Date(iso);
  date.setDate(date.getDate() + days);
  return startOfDay(date);
}

export function getLatestAttempts(attempts: QuizAttempt[]): QuizAttempt[] {
  const latest = new Map<string, QuizAttempt>();
  for (const attempt of attempts) {
    if (!latest.has(attempt.questionId)) {
      latest.set(attempt.questionId, attempt);
    }
  }
  return Array.from(latest.values());
}

export function isDueForReview(attempt: QuizAttempt, now = new Date()): boolean {
  const interval = attempt.isCorrect
    ? CORRECT_INTERVAL_DAYS
    : isUnknownAttempt(attempt)
      ? UNKNOWN_INTERVAL_DAYS
      : CONFUSED_INTERVAL_DAYS;
  return startOfDay(now) >= addDays(attempt.answeredAt, interval);
}

export function getDueReviewQuestionIds(
  attempts: QuizAttempt[],
  limit = 10,
): string[] {
  const due = getLatestAttempts(attempts)
    .filter((attempt) => isDueForReview(attempt))
    .sort((a, b) => {
      const rank = (item: QuizAttempt) =>
        item.isCorrect ? 2 : isUnknownAttempt(item) ? 0 : 1;
      return rank(a) - rank(b);
    })
    .map((attempt) => attempt.questionId);

  return due.slice(0, limit);
}
