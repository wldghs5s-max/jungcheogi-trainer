import { isUnknownAttempt, QuizAttempt } from "../types/attempt";

const LEITNER_INTERVALS = [0, 1, 3, 7, 14, 30];

function startOfDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

function addDays(iso: string, days: number): number {
  const date = new Date(iso);
  date.setDate(date.getDate() + days);
  return startOfDay(date);
}

export interface QuestionReviewState {
  questionId: string;
  boxLevel: number;
  intervalDays: number;
  nextReviewAt: number;
  due: boolean;
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

export function computeQuestionReviewState(
  questionId: string,
  attempts: QuizAttempt[],
  now = new Date(),
): QuestionReviewState | null {
  const history = attempts
    .filter((item) => item.questionId === questionId)
    .sort((a, b) => a.answeredAt.localeCompare(b.answeredAt));
  if (history.length === 0) return null;

  let boxLevel = 1;
  let intervalDays = 1;
  let lastAt = history[0].answeredAt;

  for (const attempt of history) {
    lastAt = attempt.answeredAt;
    const unknown = isUnknownAttempt(attempt);
    if (!attempt.isCorrect || unknown || attempt.solutionRevealed) {
      boxLevel = 1;
      intervalDays = unknown ? 0 : 1;
      continue;
    }
    if (attempt.hintUsed) {
      intervalDays = Math.max(1, Math.round(intervalDays * 1.2));
      continue;
    }
    boxLevel = Math.min(5, boxLevel + 1);
    intervalDays = LEITNER_INTERVALS[boxLevel] ?? 3;
  }

  const nextReviewAt = addDays(lastAt, intervalDays);
  return {
    questionId,
    boxLevel,
    intervalDays,
    nextReviewAt,
    due: startOfDay(now) >= nextReviewAt,
  };
}

export function isDueForReview(attempt: QuizAttempt, now = new Date()): boolean {
  const state = computeQuestionReviewState(
    attempt.questionId,
    [attempt],
    now,
  );
  return !!state?.due;
}

export function getDueReviewQuestionIds(
  attempts: QuizAttempt[],
  limit = 10,
  now = new Date(),
): string[] {
  const ids = [...new Set(attempts.map((item) => item.questionId))];
  return ids
    .map((id) => computeQuestionReviewState(id, attempts, now))
    .filter((state): state is QuestionReviewState => !!state && state.due)
    .sort((left, right) => {
      if (left.intervalDays !== right.intervalDays) {
        return left.intervalDays - right.intervalDays;
      }
      return left.boxLevel - right.boxLevel;
    })
    .map((state) => state.questionId)
    .slice(0, limit);
}
