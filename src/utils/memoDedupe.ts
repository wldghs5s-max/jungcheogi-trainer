import { Question } from "../types/question";
import { memoAnswerKey } from "./quiz";

export function memoQuestionTokens(text: string): Set<string> {
  return new Set(
    text
      .toUpperCase()
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .split(/\s+/)
      .filter((token) => token.length >= 2),
  );
}

export function tokenOverlapRatio(left: string, right: string): number {
  const a = memoQuestionTokens(left);
  const b = memoQuestionTokens(right);
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const token of a) {
    if (b.has(token)) inter += 1;
  }
  return inter / Math.min(a.size, b.size);
}

function isMemoQuestion(question: Question): boolean {
  return question.subject !== "프로그래밍언어활용" && !question.code;
}

export function isNearDuplicateMemo(
  candidate: Question,
  existing: Question,
): boolean {
  if (!isMemoQuestion(candidate) || !isMemoQuestion(existing)) return false;
  if (candidate.subject !== existing.subject) return false;

  const stemA = candidate.question.replace(/\s+/g, "").toUpperCase();
  const stemB = existing.question.replace(/\s+/g, "").toUpperCase();
  if (stemA === stemB) return true;

  const keyA = memoAnswerKey(candidate.answer);
  const keyB = memoAnswerKey(existing.answer);
  if (keyA && keyB && keyA === keyB) return true;

  if (candidate.chapterId && existing.chapterId === candidate.chapterId) {
    if (tokenOverlapRatio(candidate.question, existing.question) >= 0.7) {
      return true;
    }
  } else if (tokenOverlapRatio(candidate.question, existing.question) >= 0.82) {
    return true;
  }

  return false;
}

export function findNearDuplicateMemo(
  candidate: Question,
  existing: Question[],
): Question | undefined {
  return existing.find((item) => isNearDuplicateMemo(candidate, item));
}

export function filterNewMemoQuestions(
  incoming: Question[],
  existing: Question[],
): Question[] {
  const kept: Question[] = [];
  const seen = [...existing];
  for (const question of incoming) {
    if (findNearDuplicateMemo(question, seen)) continue;
    kept.push(question);
    seen.push(question);
  }
  return kept;
}
