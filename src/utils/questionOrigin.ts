import { Question } from "../types/question";

export type QuestionOrigin = "AI" | "GENERATOR" | "BUNDLE";

export function getQuestionOrigin(question: Question): QuestionOrigin {
  const source = question.source || "";
  if (
    question.generationSource === "gemini" ||
    question.id.startsWith("GEMINI_") ||
    source.includes("Gemini")
  ) {
    return "AI";
  }
  if (
    question.generationSource === "local" ||
    source.includes("생성기") ||
    source.includes("프로그래밍")
  ) {
    return "GENERATOR";
  }
  return "BUNDLE";
}

export function getQuestionOriginLabel(question: Question): string {
  switch (getQuestionOrigin(question)) {
    case "AI":
      return "AI 생성";
    case "GENERATOR":
      return "연습 생성";
    default:
      return "앱 수록";
  }
}

export function getQuestionHint(question: Question): string {
  const keywords = (question.keywords || []).filter(Boolean).slice(0, 3);
  if (keywords.length > 0) {
    return `관련 키워드: ${keywords.join(", ")}`;
  }
  return "공식 약어와 한글 표기를 함께 떠올려 보세요.";
}
