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
export const MEMO_MIN_ACCEPTABLE_BATCH_QUESTIONS = 4;

export function normalizeStem(text: string): string {
  return text.replace(/\s+/g, "").toUpperCase();
}

/**
 * JSON 문자열 리터럴 내부의 이스케이프되지 않은 개행(\n), 캐리지 리턴(\r), 탭(\t)을 안전하게 치환합니다.
 * 이스케이프 문자(\\) 상태를 추적하여 실제 따옴표 내부의 제어문자만 정규화합니다.
 */
export function sanitizeJsonStringLiterals(jsonStr: string): string {
  let inString = false;
  let escaped = false;
  let result = "";

  for (let i = 0; i < jsonStr.length; i++) {
    const ch = jsonStr[i];
    if (inString) {
      if (escaped) {
        result += ch;
        escaped = false;
      } else if (ch === "\\") {
        result += ch;
        escaped = true;
      } else if (ch === '"') {
        result += ch;
        inString = false;
      } else if (ch === "\n") {
        result += "\\n";
      } else if (ch === "\r") {
        result += "\\r";
      } else if (ch === "\t") {
        result += "\\t";
      } else {
        result += ch;
      }
    } else {
      if (ch === '"') {
        inString = true;
      }
      result += ch;
    }
  }
  return result;
}

/**
 * 마크다운 코드블록(```json ... ```) 래핑을 제거합니다.
 * 닫는 백틱(```)이 중간에 잘려 누락된 경우에도 앞쪽 코드블록 접두사를 안전하게 제거합니다.
 */
export function extractJsonCandidate(raw: string): string {
  let text = raw.trim();
  const match = text.match(/```(?:json)?\s*([\s\S]*?)(?:```|$)/i);
  if (match && match[1]) {
    text = match[1].trim();
  } else {
    text = text.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
  }
  return text;
}

/**
 * 문자열 리터럴 내부를 침범하지 않고 구조적 닫는 중괄호('}') 위치들을 파악하여,
 * 중간 절단(truncation)된 JSON 배열을 안전하게 닫아 복구를 시도합니다.
 */
function tryRepairTruncatedJson(sanitized: string): unknown | null {
  // 문자열 외부의 구조적 중괄호 닫힘('}') 위치 목록 수집
  const structuralCloseIndices: number[] = [];
  let inString = false;
  let escaped = false;

  for (let i = 0; i < sanitized.length; i++) {
    const ch = sanitized[i];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }

    if (ch === '"') {
      inString = true;
    } else if (ch === "}") {
      structuralCloseIndices.push(i);
    }
  }

  // 뒤에서부터 구조적 '}' 지점을 탐색하여 닫는 괄호 복구 시도
  for (let i = structuralCloseIndices.length - 1; i >= 0; i--) {
    const closeIndex = structuralCloseIndices[i];
    const candidateSlice = sanitized.substring(0, closeIndex + 1);

    for (const closer of ["]}", "]", "}"]) {
      try {
        const attempt = candidateSlice + closer;
        const parsed = JSON.parse(attempt);
        if (parsed && typeof parsed === "object") {
          return parsed;
        }
      } catch {
        // 복구 실패 시 이전 구조적 중괄호 위치로 후퇴 시도
      }
    }
  }

  return null;
}

export function parseJsonPayload(raw: string): unknown {
  const candidate = extractJsonCandidate(raw);
  const sanitized = sanitizeJsonStringLiterals(candidate).replace(
    /,\s*([\]}])/g,
    "$1",
  );

  // 1단계: 표준 정규화 후 JSON.parse 시도
  try {
    return JSON.parse(sanitized);
  } catch {
    // 2단계: 안전한 구조 복구 시도 (문자열 내부 토큰을 건드리지 않음)
    const repaired = tryRepairTruncatedJson(sanitized);
    if (repaired) {
      return repaired;
    }
    throw new Error("JSON 파싱 및 복구 실패");
  }
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

export function sanitizeQuestion(
  raw: Record<string, unknown>,
  subject: Subject,
  idSuffix: string,
): Question | null {
  const question = String(raw.question || "").trim();
  const explanation = String(raw.explanation || "").trim();
  const answer = asAnswer(raw.answer);

  // 엄격한 스키마 검증: 지문 최소 5자, 해설 최소 5자, 유효 정답 필수
  if (!question || question.length < 5 || !explanation || explanation.length < 5 || !answer) {
    return null;
  }

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

  let rows: unknown[] | undefined;
  if (Array.isArray(parsed)) {
    rows = parsed;
  } else if (parsed && typeof parsed === "object") {
    const obj = parsed as Record<string, unknown>;
    if (Array.isArray(obj.questions)) {
      rows = obj.questions;
    } else if (Array.isArray(obj.items)) {
      rows = obj.items;
    } else if (obj.question && obj.answer) {
      rows = [obj];
    }
  }

  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error("응답에서 유효한 문제 목록을 찾을 수 없습니다.");
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

  // 과목당 핵심 4문항(50자 이내)으로 압축하여 입력 토큰 절약 및 생성 속도 개선
  const avoidList = MEMO_SUBJECTS.map((subject) => {
    const stems = existingQuestions
      .filter((item) => item.subject === subject)
      .slice(0, 4)
      .map((item) => `- ${item.question.slice(0, 50)}`);
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
      "explanation": "2문장 내외로 핵심 개념과 정답 이유를 명확하게 작성",
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

export async function generateOneBatch(
  existingQuestions: Question[],
  existingStems: Set<string>,
  seeds: MemoTopicSeed[],
  batchId: string,
): Promise<{ questions: Question[]; error?: string }> {
  const result = await GeminiService.generateText(
    buildPrompt(existingQuestions, seeds),
    {
      maxOutputTokens: 8192,
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
    const questions = collectQuestionsFromText(
      result.text,
      existingStems,
      batchId,
    );

    // 엄격한 품질 임계값 검증: 유효 문항이 최소 기준(4개) 미만이면 깨진 데이터를 저장하지 않고 재시도 유도
    if (questions.length < MEMO_MIN_ACCEPTABLE_BATCH_QUESTIONS) {
      return {
        questions: [],
        error: `유효한 문항 수가 기준(${MEMO_MIN_ACCEPTABLE_BATCH_QUESTIONS}개)에 미달하여 배치를 재생성합니다.`,
      };
    }

    return { questions };
  } catch (parseErr) {
    const errorMsg =
      parseErr instanceof Error
        ? parseErr.message
        : "응답 형식 변환 중 오류가 발생했습니다.";
    return { questions: [], error: errorMsg };
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
