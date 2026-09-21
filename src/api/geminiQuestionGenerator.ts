import { GeminiService, GENERATOR_MODELS } from "./geminiService";
import { MemoTopicSeed, pickTopicSeeds } from "../data/memoTopicSeeds";
import { Question, Subject } from "../types/question";

export const MEMO_SUBJECTS: Subject[] = [
  "소프트웨어설계",
  "데이터베이스구축",
  "정보시스템구축관리",
  "신기술/보안",
];

export const MEMO_BATCH_SIZE = 7;
export const MEMO_BATCH_COUNT = 2;
export const MEMO_CONCURRENCY = 2;
export const MEMO_RETRY_DELAY_MS = 300;

export function normalizeStem(text: string): string {
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
  idSuffix: string,
): Question | null {
  const question = String(raw.question || "").trim();
  const explanation = String(raw.explanation || "").trim();
  const answer = asAnswer(raw.answer);
  if (!question || !explanation || !answer) return null;

  const type =
    raw.type === "MULTIPLE_CHOICE" ? "MULTIPLE_CHOICE" : "SHORT_ANSWER";
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
    id: `GEMINI_MEMO_${idSuffix}_${subject}`,
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

export function collectQuestionsFromText(
  text: string,
  existingStems: Set<string>,
  idPrefix: string,
  limit = MEMO_BATCH_SIZE,
): Question[] {
  const parsed = parseJsonPayload(text);
  const rows = (parsed as { questions?: unknown[] })?.questions;
  if (!Array.isArray(rows)) {
    throw new Error("응답에 questions 배열이 없습니다.");
  }

  const questions: Question[] = [];

  rows.forEach((row, index) => {
    if (questions.length >= limit) return;
    if (!row || typeof row !== "object") return;
    const raw = row as Record<string, unknown>;
    const subject = raw.subject as Subject;
    if (!MEMO_SUBJECTS.includes(subject)) return;
    const item = sanitizeQuestion(raw, subject, `${idPrefix}_${index}`);
    if (!item) return;
    const stem = normalizeStem(item.question);
    if (existingStems.has(stem)) return;
    existingStems.add(stem);
    questions.push(item);
  });

  return questions;
}

const MEMO_RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    questions: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          subject: { type: "STRING" },
          category: { type: "STRING" },
          subCategory: { type: "STRING" },
          type: { type: "STRING" },
          question: { type: "STRING" },
          answer: { type: "ARRAY", items: { type: "STRING" } },
          explanation: { type: "STRING" },
          difficulty: { type: "STRING" },
          keywords: { type: "ARRAY", items: { type: "STRING" } },
        },
        required: ["subject", "question", "answer", "explanation"],
      },
    },
  },
  required: ["questions"],
};

export function buildPrompt(
  existingQuestions: Question[],
  seeds: MemoTopicSeed[],
): string {
  const seedLines = seeds
    .map((seed, index) => `${index + 1}. [${seed.subject}] ${seed.topic}`)
    .join("\n");

  const avoidList = MEMO_SUBJECTS.map((subject) => {
    const stems = existingQuestions
      .filter((item) => item.subject === subject)
      .slice(0, 8)
      .map((item) => `- ${item.question.slice(0, 80)}`);
    return `[${subject}]\n${stems.join("\n") || "(없음)"}`;
  }).join("\n\n");

  return `당신은 정보처리기사 실기 출제위원입니다.
지정된 ${seeds.length}개 주제에 대해 단답형 기출 변형 문제를 각 1개씩, 총 ${seeds.length}개 만드세요.
프로그래밍(C/Java/Python 코드 추적) 문제는 절대 만들지 마세요.

지정 주제:
${seedLines}

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
- questions 길이는 ${seeds.length}
- 각 문제는 지정 주제 순서를 지키고 subject는 해당 과목과 일치
- answer는 채점용 동의어를 2개 이상 (영문 풀네임, 한글 음차, 공식 약어)
- 객관식(MULTIPLE_CHOICE)을 쓸 경우 options 4개를 넣고 answer는 보기 문구와 일치`;
}

async function mapConcurrent<T, R>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let cursor = 0;

  async function run() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index], index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => run()),
  );
  return results;
}

async function generateOneBatch(
  existingQuestions: Question[],
  existingStems: Set<string>,
  seeds: MemoTopicSeed[],
  batchId: string,
): Promise<{ questions: Question[]; error?: string }> {
  const result = await GeminiService.generateText(
    buildPrompt(existingQuestions, seeds),
    {
      maxOutputTokens: 4096,
      temperature: 0.8,
      json: true,
      models: GENERATOR_MODELS,
      maxRetries: 1,
      retryDelayMs: MEMO_RETRY_DELAY_MS,
      extraConfig: {
        responseMimeType: "application/json",
        responseSchema: MEMO_RESPONSE_SCHEMA,
      },
    },
  );

  if (!result.ok) {
    return { questions: [], error: result.message };
  }

  try {
    return {
      questions: collectQuestionsFromText(result.text, existingStems, batchId),
    };
  } catch {
    return { questions: [], error: "JSON을 읽지 못했습니다." };
  }
}

export async function generateMemorizationQuestions(
  existingQuestions: Question[],
): Promise<
  { ok: true; questions: Question[] } | { ok: false; message: string }
> {
  const batchId = Date.now();
  const existingStems = new Set(
    existingQuestions.map((item) => normalizeStem(item.question)),
  );
  const allSeeds = pickTopicSeeds(
    MEMO_BATCH_SIZE * MEMO_BATCH_COUNT,
    existingQuestions,
  );
  const batches = Array.from({ length: MEMO_BATCH_COUNT }, (_, index) =>
    allSeeds.slice(index * MEMO_BATCH_SIZE, (index + 1) * MEMO_BATCH_SIZE),
  ).filter((seeds) => seeds.length > 0);

  const settled = await mapConcurrent(batches, MEMO_CONCURRENCY, (seeds, index) =>
    generateOneBatch(
      existingQuestions,
      existingStems,
      seeds,
      `${batchId}_${index}`,
    ),
  );

  const questions: Question[] = [];
  const errors: string[] = [];
  for (const item of settled) {
    questions.push(...item.questions);
    if (item.error) errors.push(item.error);
  }

  if (questions.length === 0) {
    return {
      ok: false,
      message:
        errors[0] ||
        "유효한 암기 문제를 만들지 못했습니다. 다시 시도해 주세요.",
    };
  }

  return { ok: true, questions };
}
