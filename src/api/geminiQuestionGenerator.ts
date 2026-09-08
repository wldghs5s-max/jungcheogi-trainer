import { GeminiService } from "./geminiService";
import { Question, Subject } from "../types/question";

export const MEMO_SUBJECTS: Subject[] = [
  "소프트웨어설계",
  "데이터베이스구축",
  "정보시스템구축관리",
  "신기술/보안",
];

function normalizeStem(text: string): string {
  return text.replace(/\s+/g, "").toUpperCase();
}

function parseJsonPayload(raw: string): unknown {
  const trimmed = raw.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const body = fenced ? fenced[1].trim() : trimmed;
  return JSON.parse(body);
}

function asAnswer(value: unknown): string | string[] | null {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (Array.isArray(value)) {
    const answers = value
      .map((item) => String(item || "").trim())
      .filter(Boolean);
    if (answers.length === 0) return null;
    return answers.length === 1 ? answers[0] : answers;
  }
  return null;
}

function sanitizeQuestion(
  raw: Record<string, unknown>,
  subject: Subject,
  index: number,
): Question | null {
  const question = String(raw.question || "").trim();
  const explanation = String(raw.explanation || "").trim();
  const answer = asAnswer(raw.answer);
  if (!question || !explanation || !answer) return null;

  const type = raw.type === "MULTIPLE_CHOICE" ? "MULTIPLE_CHOICE" : "SHORT_ANSWER";
  const options = Array.isArray(raw.options)
    ? raw.options.map((item) => String(item).trim()).filter(Boolean)
    : undefined;
  if (type === "MULTIPLE_CHOICE" && (!options || options.length < 4)) {
    return null;
  }

  const difficulty =
    raw.difficulty === "HARD" || raw.difficulty === "EASY"
      ? raw.difficulty
      : "MEDIUM";

  const keywords = Array.isArray(raw.keywords)
    ? raw.keywords.map((item) => String(item).trim()).filter(Boolean)
    : [];

  return {
    id: `GEMINI_MEMO_${Date.now()}_${index}_${subject}`,
    subject,
    category: String(raw.category || "실기 암기").trim() || "실기 암기",
    subCategory: String(raw.subCategory || "").trim() || undefined,
    type,
    question,
    options,
    answer,
    explanation,
    difficulty,
    keywords,
    source: "Gemini 암기 생성",
  };
}

export async function generateMemorizationQuestions(
  existingQuestions: Question[],
): Promise<{ ok: true; questions: Question[] } | { ok: false; message: string }> {
  const avoidList = MEMO_SUBJECTS.map((subject) => {
    const stems = existingQuestions
      .filter((item) => item.subject === subject)
      .slice(0, 12)
      .map((item) => `- ${item.question.slice(0, 80)}`);
    return `[${subject}]\n${stems.join("\n") || "(없음)"}`;
  }).join("\n\n");

  const prompt = `당신은 정보처리기사 실기 출제위원입니다.
아래 4개 암기 과목마다 단답형 기출 변형 문제를 정확히 1개씩 만드세요.
프로그래밍(C/Java/Python 코드 추적) 문제는 절대 만들지 마세요.

과목:
1. 소프트웨어설계
2. 데이터베이스구축
3. 정보시스템구축관리
4. 신기술/보안

이미 있는 문제와 주제가 겹치지 않게 하세요.
${avoidList}

반드시 JSON만 출력하세요. 마크다운 설명 금지.
형식:
{
  "questions": [
    {
      "subject": "소프트웨어설계",
      "category": "단원명",
      "subCategory": "세부단원",
      "type": "SHORT_ANSWER",
      "question": "한글로 된 실기 단답 문제. ~쓰시오. 로 끝낼 것",
      "answer": ["대표정답", "동의어1", "영문약어"],
      "explanation": "2~4문장 해설",
      "difficulty": "EASY" | "MEDIUM" | "HARD",
      "keywords": ["키워드1", "키워드2"]
    }
  ]
}

규칙:
- questions 길이는 4
- subject는 위 4개 과목을 하나씩 빠짐없이
- answer는 채점용 동의어를 2개 이상
- 객관식(MULTIPLE_CHOICE)을 쓸 경우 options 4개를 넣고 answer는 보기 문구와 일치`;

  const result = await GeminiService.generateText(prompt, {
    maxOutputTokens: 4096,
    temperature: 0.8,
    json: true,
  });

  if (!result.ok) {
    return result;
  }

  let parsed: unknown;
  try {
    parsed = parseJsonPayload(result.text);
  } catch {
    return { ok: false, message: "Gemini 응답을 JSON으로 읽지 못했습니다. 다시 시도해 주세요." };
  }

  const rows = (parsed as { questions?: unknown[] })?.questions;
  if (!Array.isArray(rows)) {
    return { ok: false, message: "응답에 questions 배열이 없습니다." };
  }

  const existingStems = new Set(
    existingQuestions.map((item) => normalizeStem(item.question)),
  );
  const usedSubjects = new Set<Subject>();
  const questions: Question[] = [];

  rows.forEach((row, index) => {
    if (!row || typeof row !== "object") return;
    const raw = row as Record<string, unknown>;
    const subject = raw.subject as Subject;
    if (!MEMO_SUBJECTS.includes(subject) || usedSubjects.has(subject)) return;
    const item = sanitizeQuestion(raw, subject, index);
    if (!item) return;
    if (existingStems.has(normalizeStem(item.question))) return;
    usedSubjects.add(subject);
    existingStems.add(normalizeStem(item.question));
    questions.push(item);
  });

  if (questions.length === 0) {
    return { ok: false, message: "유효한 암기 문제를 만들지 못했습니다. 다시 시도해 주세요." };
  }

  return { ok: true, questions };
}
