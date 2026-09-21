import { LocalStorage } from "../storage/localStorage";
import { Question } from "../types/question";

export const GEMINI_KEY_STORAGE = "@gemini_api_key";

const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta";

/**
 * 408, 429, 500, 502, 503, 504는 일시적 오류로 분류하여 재시도합니다.
 */
export const TRANSIENT_STATUSES = [408, 429, 500, 502, 503, 504] as const;
export const MAX_RETRIES_PER_MODEL = 3;

export const DISCONTINUED_MODEL_REGEX = /gemini-(?:1\.5|2\.0)/i;

/**
 * AI 튜터용 모델 우선순위: 빠른 실시간 응답(1~2초대)을 최우선으로 하여 gemini-3.5-flash-lite 배치
 */
export const TUTOR_MODELS = [
  "gemini-3.5-flash-lite",
  "gemini-2.5-flash",
  "gemini-3.1-flash-lite",
  "gemini-3.5-flash",
  "gemini-3.7-flash",
  "gemini-3.8-flash",
  "gemini-2.5-pro",
];

/**
 * 실기 암기 문제 생성용 모델 우선순위: 정답/유사정답/약어 채점 범위와 지문 완성도를 최우선으로 하여 gemini-3.8-flash 배치
 */
export const GENERATOR_MODELS = [
  "gemini-3.8-flash",
  "gemini-3.7-flash",
  "gemini-3.5-flash",
  "gemini-2.5-flash",
  "gemini-2.5-pro",
];

/**
 * 종료된 gemini-1.5 및 gemini-2.0 계열을 완전히 제거한 안정 모델 우선순위 목록입니다.
 */
export const PREFERRED_MODELS = TUTOR_MODELS;

/** 튜터 해설 최대 출력. 스트리밍 첫 토큰 속도에는 영향이 없고, 단원 확장 해설이 잘리지 않게 여유를 둔다. */
export const TUTOR_MAX_OUTPUT_TOKENS = 8192;

export function cleanApiKey(rawKey: string): string {
  if (!rawKey) return "";
  return rawKey
    .replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") // 앞뒤 공백 및 보이지 않는 유니코드 문자 제거
    .replace(/^["']|["']$/g, "") // 앞뒤 따옴표 제거
    .replace(/^(?:api[_-]?key\s*[:=]\s*)+/i, "") // 복사 시 포함된 접두사 제거
    .trim();
}

export function isTransientStatus(status: number): boolean {
  return TRANSIENT_STATUSES.includes(status as any);
}

export function isTerminalAuthStatus(
  status: number,
  message?: string,
): boolean {
  if (status === 400 || status === 401 || status === 403) return true;
  if (
    message &&
    /api key|invalid argument|unregistered caller|api_key_invalid/i.test(
      message,
    )
  ) {
    return true;
  }
  return false;
}

export function calculateBackoffDelay(attempt: number): number {
  // attempt 1 -> 약 1초, attempt 2 -> 약 2초, attempt 3 -> 약 4초 + 0~300ms jitter
  const base = 1000 * Math.pow(2, attempt - 1);
  const jitter = Math.random() * 300;
  return base + jitter;
}

export function sanitizeLogMessage(message: string, apiKey?: string): string {
  let sanitized = message || "";
  if (apiKey && apiKey.length > 3) {
    const escaped = apiKey.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    sanitized = sanitized.replace(
      new RegExp(escaped, "g"),
      "[REDACTED_API_KEY]",
    );
  }
  sanitized = sanitized.replace(/AQ\.[A-Za-z0-9_-]+/g, "[REDACTED_AQ_KEY]");
  sanitized = sanitized.replace(/AIzaSy[A-Za-z0-9_-]+/g, "[REDACTED_AIZA_KEY]");
  return sanitized;
}

export function logGeminiError(
  status: number,
  model: string,
  attempt: number,
  rawMessage: string,
  apiKey?: string,
): void {
  const cleanMsg = sanitizeLogMessage(rawMessage, apiKey);
  console.warn(
    `[GeminiService] status=${status}, model=${model}, attempt=${attempt}, error=${cleanMsg}`,
  );
}

export function formatGeminiErrorMessage(error: {
  status: number;
  message: string;
  model?: string;
}): string {
  // 503 및 일시적 오류는 API 키/권한 문제가 아니므로 일시적 혼잡 안내문으로 표시
  if (isTransientStatus(error.status) || error.status === 503) {
    return "Gemini 서버가 일시적으로 혼잡합니다. 잠시 후 다시 시도해 주세요.";
  }
  if (isTerminalAuthStatus(error.status, error.message)) {
    return `Gemini API Key 인증 오류 (${error.status})\n\n사유: ${error.message}\n\n구글 AI Studio에서 발급한 올바른 API Key인지 확인해 주세요. (발급 직후라면 구글 서버 동기화에 1~2분 소요될 수 있습니다.)`;
  }
  if (error.status === 404) {
    return "지원되는 Gemini 모델을 찾을 수 없습니다. 프로젝트 설정과 사용 가능한 모델을 확인해 주세요.";
  }
  return `서버 응답 오류 (${error.status}): ${error.message}`;
}

export interface TutorChatMessageItem {
  role: "user" | "model";
  text: string;
}

export interface TutorContext {
  question: Question;
  userAnswer?: string | string[];
  userPrompt: string;
  missType?: "WRONG" | "UNKNOWN";
  history?: TutorChatMessageItem[];
}

export function buildTutorPrompt(context: TutorContext): string {
  const { question, userAnswer, userPrompt, missType, history } = context;
  const chapterPath = [
    question.subject,
    question.category,
    question.subCategory,
  ]
    .filter(Boolean)
    .join(" > ");
  const isUnknown = missType === "UNKNOWN";

  let historySection = "";
  if (history && history.length > 0) {
    const formattedHistory = history
      .map((item) => {
        const speaker = item.role === "user" ? "수험생" : "AI 튜터";
        return `${speaker}: ${item.text}`;
      })
      .join("\n\n");
    historySection = `\n[이전 튜터링 대화 내용]\n${formattedHistory}\n`;
  }

  const formattingRules = `
[가독성 규칙 - 필수 준수]
- 불필요한 별표(*, **) 기호를 남발하지 마세요.
- 목록 표시는 별표(*) 대신 번호(1., 2.)나 하이픈(-), 또는 가운뎃점(•)을 사용하세요.
- 일반 문장 속 단어마다 무분별하게 볼드(**)를 씌우지 말고, 제목이나 꼭 필요한 핵심 용어에만 절제하여 사용하세요.`;

  if (isUnknown) {
    if (history && history.length > 0) {
      return `당신은 대한민국 최고 수준의 정보처리기사 실기 전담 1:1 스타 강사이자 AI 수험 튜터입니다.
수험생과 앞선 대화를 바탕으로 1:1 맞춤형 과외를 이어가고 있습니다.
이전 대화 맥락을 정확히 기억하고, 수험생의 추가 질문에 대해 군더더기 없이 명쾌하고 핵심을 짚어 친절하게 설명해 주세요.
${formattingRules}

[이 문제가 속한 단원]
- 위치: ${chapterPath}
- 키워드: ${(question.keywords || []).join(", ") || "(없음)"}

[문제 정보]
- 문제 지문: ${question.question}
${question.code ? `- 코드:\n\`\`\`${question.language || "text"}\n${question.code}\n\`\`\`` : ""}
- 정답: ${Array.isArray(question.answer) ? question.answer.join(" 또는 ") : question.answer}
- 기본 해설: ${question.explanation}
${historySection}
[수험생의 추가 질문]
${userPrompt}
`;
    }

    return `당신은 대한민국 최고 수준의 정보처리기사 실기 전담 1:1 스타 강사이자 AI 수험 튜터입니다.
수험생이 이 문제를 「모른다」고 표시했습니다. 오답 분석은 하지 마세요. 답을 억지로 쓴 것이 아닙니다.
교재에서 이 내용이 등장하는 단원(챕터)을 펼쳐 보여 주듯이, 이 문제와 바로 옆 연관 개념까지 함께 가르쳐 주세요.
인사말이나 군더더기 서론은 일절 생략하고, 곧바로 본론으로 들어가 각 항목별 핵심 위주로 명확하고 깔끔하게 작성하세요.
${formattingRules}

[이 문제가 속한 단원]
- 위치: ${chapterPath}
- 키워드: ${(question.keywords || []).join(", ") || "(없음)"}

[문제 정보]
- 문제 유형: ${question.type} (난이도: ${question.difficulty})
- 문제 지문: ${question.question}
${question.code ? `- 코드:\n\`\`\`${question.language || "text"}\n${question.code}\n\`\`\`` : ""}
- 정답: ${Array.isArray(question.answer) ? question.answer.join(" 또는 ") : question.answer}
- 기본 해설: ${question.explanation}

[반드시 아래 구성으로 답하세요]
1) 교재 단원 위치: 이 문제가 어느 챕터에 나오는지
2) 이 단원에서 반드시 알아야 하는 핵심 개념
3) 이 문제 바로 앞뒤에 나오는 연관 개념·용어·공식
4) 같은 단원에서 자주 나오는 출제 포인트
5) 이번 문제를 단원 맥락에서 다시 풀어보는 해설
6) 시험장에서 1초 만에 떠올릴 암기 포인트

[수험생의 질문]
${userPrompt}
`;
  }

  // General or Wrong
  if (history && history.length > 0) {
    return `당신은 대한민국 최고 수준의 정보처리기사 실기 전담 1:1 스타 강사이자 AI 수험 튜터입니다.
수험생과 앞선 대화를 바탕으로 1:1 맞춤형 과외를 이어가고 있습니다.
이전 대화 맥락을 정확히 기억하고, 수험생의 추가 질문에 대해 군더더기 없이 명쾌하고 핵심을 짚어 친절하게 설명해 주세요.
${formattingRules}

[문제 정보]
- 과목/단원: ${chapterPath}
- 문제 유형: ${question.type} (난이도: ${question.difficulty})
- 문제 지문: ${question.question}
${question.code ? `- 코드:\n\`\`\`${question.language || "text"}\n${question.code}\n\`\`\`` : ""}
- 정답: ${Array.isArray(question.answer) ? question.answer.join(" 또는 ") : question.answer}
- 기본 해설: ${question.explanation}
- 수험생이 작성한 답: ${userAnswer ? (Array.isArray(userAnswer) ? userAnswer.join(", ") : userAnswer) : "(미작성)"}
${historySection}
[수험생의 추가 질문]
${userPrompt}
`;
  }

  return `당신은 대한민국 최고 수준의 정보처리기사 실기 전담 1:1 스타 강사이자 AI 수험 튜터입니다.
수험생의 눈높이에 맞춰 친절하고 논리정연하며, 실제 시험장에서 점수를 얻을 수 있는 명쾌한 답변을 제공하세요.
인사말이나 군더더기 서론은 일절 생략하고, 곧바로 본론으로 들어가 각 항목별 핵심 위주로 명확하고 깔끔하게 작성하세요.
${formattingRules}

[문제 정보]
- 과목/단원: ${chapterPath}
- 문제 유형: ${question.type} (난이도: ${question.difficulty})
- 문제 지문: ${question.question}
${question.code ? `- 코드:\n\`\`\`${question.language || "text"}\n${question.code}\n\`\`\`` : ""}
- 정답: ${Array.isArray(question.answer) ? question.answer.join(" 또는 ") : question.answer}
- 기본 해설: ${question.explanation}
- 수험생이 작성한 답: ${userAnswer ? (Array.isArray(userAnswer) ? userAnswer.join(", ") : userAnswer) : "(미작성)"}

[수험생의 질문]
${userPrompt}
`;
}

export function extractTextFromSSELine(line: string): string {
  const trimmed = line.trim();
  if (!trimmed.startsWith("data:") && !trimmed.startsWith("data :")) {
    return "";
  }
  const jsonStr = trimmed.replace(/^data\s*:\s*/, "");
  if (!jsonStr || jsonStr === "[DONE]") {
    return "";
  }
  try {
    const data = JSON.parse(jsonStr);
    const parts = data?.candidates?.[0]?.content?.parts;
    if (!Array.isArray(parts)) return "";
    return parts
      .filter((p: any) => p?.text && !p.thought)
      .map((p: any) => p.text)
      .join("");
  } catch {
    return "";
  }
}

export function streamWithXHR(
  url: string,
  apiKey: string,
  body: string,
  onChunk: (accumulatedText: string) => void,
  signal?: AbortSignal,
): Promise<{ text: string; status: number; error?: string }> {
  return new Promise((resolve) => {
    if (signal?.aborted) {
      resolve({ text: "", status: 0 });
      return;
    }

    if (typeof XMLHttpRequest === "undefined") {
      resolve({
        text: "",
        status: 0,
        error: "XMLHttpRequest unavailable",
      });
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("x-goog-api-key", cleanApiKey(apiKey));

    let accumulatedText = "";
    let lastProcessedIndex = 0;
    let lineBuffer = "";
    let settled = false;

    const cleanup = () => {
      if (signal) {
        signal.removeEventListener("abort", onAbort);
      }
    };

    const finish = (result: { text: string; status: number; error?: string }) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(result);
    };

    const onAbort = () => {
      try {
        xhr.abort();
      } catch {}
      finish({ text: accumulatedText, status: 0 });
    };

    if (signal) {
      signal.addEventListener("abort", onAbort);
    }

    xhr.onprogress = () => {
      if (settled) return;
      try {
        const currentResponse = xhr.responseText;
        if (!currentResponse) return;

        const newChunk = currentResponse.slice(lastProcessedIndex);
        lastProcessedIndex = currentResponse.length;

        lineBuffer += newChunk;
        const lines = lineBuffer.split("\n");
        lineBuffer = lines.pop() ?? "";

        let hasNewText = false;
        for (const line of lines) {
          const textChunk = extractTextFromSSELine(line);
          if (textChunk) {
            accumulatedText += textChunk;
            hasNewText = true;
          }
        }

        if (hasNewText) {
          onChunk(accumulatedText);
        }
      } catch {
        // SSE 청크 파싱 오류 안전 무시
      }
    };

    xhr.onload = () => {
      if (settled) return;
      try {
        if (lineBuffer.trim()) {
          const textChunk = extractTextFromSSELine(lineBuffer);
          if (textChunk) {
            accumulatedText += textChunk;
            onChunk(accumulatedText);
          }
        }
      } catch {}

      if (xhr.status >= 200 && xhr.status < 300) {
        finish({ text: accumulatedText, status: xhr.status });
      } else {
        let errMsg = `HTTP ${xhr.status}`;
        try {
          const parsed = JSON.parse(xhr.responseText);
          if (parsed?.error?.message) {
            errMsg = parsed.error.message;
          }
        } catch {}
        finish({ text: accumulatedText, status: xhr.status, error: errMsg });
      }
    };

    xhr.onerror = () => {
      finish({
        text: accumulatedText,
        status: 0,
        error: "네트워크 연결 오류",
      });
    };

    xhr.ontimeout = () => {
      finish({
        text: accumulatedText,
        status: 408,
        error: "요청 시간 초과",
      });
    };

    try {
      xhr.send(body);
    } catch (sendErr) {
      finish({
        text: accumulatedText,
        status: 0,
        error: sendErr instanceof Error ? sendErr.message : "전송 오류",
      });
    }
  });
}

export interface GeminiRequestError {
  status: number;
  message: string;
  model?: string;
}

function authHeaders(apiKey: string): Record<string, string> {
  // AQ. 인증키는 x-goog-api-key 헤더로 전송해야 정상 인증됩니다.
  return {
    "Content-Type": "application/json",
    "x-goog-api-key": cleanApiKey(apiKey),
  };
}

function extractText(data: unknown): string | null {
  const parts = (
    data as {
      candidates?: Array<{
        content?: { parts?: Array<{ text?: string; thought?: boolean }> };
      }>;
    }
  )?.candidates?.[0]?.content?.parts;

  if (!Array.isArray(parts)) return null;

  const text = parts
    .filter((part) => part?.text && !part.thought)
    .map((part) => part.text)
    .join("\n")
    .trim();

  return text || null;
}

function parseErrorMessage(data: unknown, status: number): string {
  const message = (data as { error?: { message?: string } })?.error?.message;
  return message || `HTTP ${status}`;
}

export async function listAvailableModels(
  apiKey: string,
  fetchFn: typeof fetch = fetch,
): Promise<string[]> {
  const cleanKey = cleanApiKey(apiKey);
  const isLegacyKey = cleanKey.startsWith("AIza");
  const url = isLegacyKey
    ? `${GEMINI_BASE}/models?key=${encodeURIComponent(cleanKey)}`
    : `${GEMINI_BASE}/models`;

  const response = await fetchFn(url, {
    method: "GET",
    headers: authHeaders(cleanKey),
  });

  const errorData = response.ok
    ? null
    : await response.json().catch(() => ({}));
  if (!response.ok) {
    const error: GeminiRequestError = {
      status: response.status,
      message: parseErrorMessage(errorData, response.status),
    };
    throw error;
  }

  const data = (await response.json()) as {
    models?: Array<{ name?: string; supportedGenerationMethods?: string[] }>;
  };

  return (data.models || [])
    .filter((model) =>
      (model.supportedGenerationMethods || []).includes("generateContent"),
    )
    .map((model) => String(model.name || "").replace(/^models\//, ""))
    .filter((name) => Boolean(name) && !DISCONTINUED_MODEL_REGEX.test(name));
}

export function pickModelsToTry(available: string[]): string[] {
  // 실제 반환된 모델 중 종료된 모델 제외
  const activeAvailable = available.filter(
    (name) => Boolean(name) && !DISCONTINUED_MODEL_REGEX.test(name),
  );
  const availableSet = new Set(activeAvailable);

  // 1. PREFERRED_MODELS 중 실제 반환된 목록에 포함된 것 우선 선택
  const preferredInAvailable = PREFERRED_MODELS.filter((name) =>
    availableSet.has(name),
  );

  // 2. 그 외 실제 반환된 generateContent 지원 모델 (image/tts/live 제외)
  const othersInAvailable = activeAvailable.filter(
    (name) =>
      !preferredInAvailable.includes(name) &&
      !name.includes("image") &&
      !name.includes("tts") &&
      !name.includes("live"),
  );

  const combined = [...preferredInAvailable, ...othersInAvailable];
  // 실제 반환된 모델만 사용 (Requirement 9)
  return combined.length > 0 ? combined : activeAvailable;
}

async function generateContent(
  apiKey: string,
  model: string,
  prompt: string,
  maxOutputTokens: number,
  extraConfig: Record<string, unknown> = {},
  fetchFn: typeof fetch = fetch,
  signal?: AbortSignal,
): Promise<{
  text: string | null;
  error?: GeminiRequestError;
  aborted?: boolean;
}> {
  if (signal?.aborted) {
    return { text: null, aborted: true };
  }
  const cleanKey = cleanApiKey(apiKey);
  const isLegacyKey = cleanKey.startsWith("AIza");
  const url = isLegacyKey
    ? `${GEMINI_BASE}/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(cleanKey)}`
    : `${GEMINI_BASE}/models/${encodeURIComponent(model)}:generateContent`;

  try {
    const response = await fetchFn(url, {
      method: "POST",
      headers: authHeaders(cleanKey),
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens,
          ...extraConfig,
        },
      }),
      signal,
    });

    const data = await response.json().catch(() => ({}));
    if (response.ok) {
      return { text: extractText(data) };
    }

    return {
      text: null,
      error: {
        status: response.status,
        message: parseErrorMessage(data, response.status),
        model,
      },
    };
  } catch (err: unknown) {
    if (
      signal?.aborted ||
      (err instanceof Error && err.name === "AbortError")
    ) {
      return { text: null, aborted: true };
    }
    throw err;
  }
}

export interface RetryExecutionOptions {
  maxOutputTokens?: number;
  temperature?: number;
  extraConfig?: Record<string, unknown>;
  fetchFn?: typeof fetch;
  sleepFn?: (ms: number) => Promise<void>;
  models?: string[];
  maxRetries?: number;
  signal?: AbortSignal;
  onAttempt?: (attemptInfo: {
    model: string;
    attempt: number;
    status?: number;
    delay?: number;
  }) => void;
}

export type ExecutionResult =
  | { ok: true; text: string; model: string }
  | {
      ok: false;
      aborted?: boolean;
      error: {
        status: number;
        message: string;
        model?: string;
      };
    };

export class GeminiService {
  static async getApiKey(): Promise<string | null> {
    const raw = await LocalStorage.getItem<string>(GEMINI_KEY_STORAGE);
    if (!raw) return null;
    const cleaned = cleanApiKey(raw);
    return cleaned || null;
  }

  static async saveApiKey(key: string): Promise<void> {
    const cleaned = cleanApiKey(key);
    if (!cleaned) {
      await LocalStorage.removeItem(GEMINI_KEY_STORAGE);
      return;
    }
    await LocalStorage.setItem(GEMINI_KEY_STORAGE, cleaned);
  }

  /**
   * testConnection, askTutor, generateText가 공통으로 사용하는 단일 재시도 및 모델 폴백 실행기입니다.
   */
  static async executeWithRetry(
    apiKey: string,
    prompt: string,
    options?: RetryExecutionOptions,
  ): Promise<ExecutionResult> {
    const cleanKey = cleanApiKey(apiKey);
    if (!cleanKey) {
      return {
        ok: false,
        error: { status: 400, message: "API Key를 입력해 주세요." },
      };
    }

    const signal = options?.signal;
    if (signal?.aborted) {
      return {
        ok: false,
        aborted: true,
        error: { status: 0, message: "요청이 취소되었습니다." },
      };
    }

    const fetchFn = options?.fetchFn ?? fetch;
    const sleepFn =
      options?.sleepFn ??
      ((ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms)));

    let modelsToTry: string[] = options?.models ? [...options.models] : [];

    if (modelsToTry.length === 0) {
      try {
        const available = await listAvailableModels(cleanKey, fetchFn);
        if (available.length > 0) {
          // 9. listAvailableModels가 성공하면 실제 반환된 generateContent 지원 모델만 사용한다.
          modelsToTry = pickModelsToTry(available);
        }
      } catch (listError) {
        const err = listError as GeminiRequestError;
        // 5. 400, 401, 403은 재시도하지 않고 즉시 오류를 반환한다.
        if (isTerminalAuthStatus(err.status, err.message)) {
          logGeminiError(err.status, "models.list", 1, err.message, cleanKey);
          return {
            ok: false,
            error: { status: err.status, message: err.message },
          };
        }
        // 10. 모델 목록 조회가 일시적으로 실패하면 안정 모델 목록으로 폴백하되, 종료된 모델은 사용하지 않는다.
      }
    }

    if (modelsToTry.length === 0) {
      modelsToTry = PREFERRED_MODELS.filter(
        (m) => !DISCONTINUED_MODEL_REGEX.test(m),
      );
    }

    let lastError: { status: number; message: string; model?: string } | null =
      null;
    const maxRetries = options?.maxRetries ?? MAX_RETRIES_PER_MODEL; // 3회 재시도

    for (const model of modelsToTry) {
      if (signal?.aborted) {
        return {
          ok: false,
          aborted: true,
          error: { status: 0, message: "요청이 취소되었습니다." },
        };
      }

      // 8 & 10. 종료된 모델은 절대 사용하지 않는다.
      if (DISCONTINUED_MODEL_REGEX.test(model)) {
        continue;
      }

      // 2. 일시적 오류 발생 시 동일 모델을 최대 3회 재시도한다 (초회 1 + 재시도 3 = 총 4회 시도)
      const totalAttempts = 1 + maxRetries;

      for (let attempt = 1; attempt <= totalAttempts; attempt++) {
        if (signal?.aborted) {
          return {
            ok: false,
            aborted: true,
            error: { status: 0, message: "요청이 취소되었습니다." },
          };
        }

        try {
          const result = await generateContent(
            cleanKey,
            model,
            prompt,
            options?.maxOutputTokens ?? 2048,
            options?.extraConfig,
            fetchFn,
            signal,
          );

          if (result.aborted || signal?.aborted) {
            return {
              ok: false,
              aborted: true,
              error: { status: 0, message: "요청이 취소되었습니다." },
            };
          }

          if (result.text) {
            options?.onAttempt?.({ model, attempt, status: 200 });
            return {
              ok: true,
              text: result.text,
              model,
            };
          }

          const err = result.error ?? {
            status: 0,
            message: "응답을 받지 못했습니다.",
          };
          lastError = { status: err.status, message: err.message, model };

          // 12. 민감한 API 키를 제외하고 status, model, attempt, 서버 오류 메시지를 개발 로그로 남긴다.
          // 13. API 키를 콘솔이나 오류문에 절대 출력하지 않는다.
          logGeminiError(err.status, model, attempt, err.message, cleanKey);

          // 5. 400, 401, 403은 재시도하지 않고 즉시 오류를 반환한다.
          if (isTerminalAuthStatus(err.status, err.message)) {
            options?.onAttempt?.({ model, attempt, status: err.status });
            return {
              ok: false,
              error: {
                status: err.status,
                message: err.message,
                model,
              },
            };
          }

          // 6. 404는 재시도하지 않고 다음 모델로 이동한다.
          if (err.status === 404) {
            options?.onAttempt?.({ model, attempt, status: 404 });
            break; // 현재 모델의 재시도 루프 중단 -> 다음 모델로 이동
          }

          // 1. 408, 429, 500, 502, 503, 504는 일시적 오류로 분류한다.
          if (isTransientStatus(err.status) || err.status === 0) {
            if (attempt < totalAttempts) {
              // 3. 재시도 간격은 약 1초, 2초, 4초의 지수 백오프와 0~300ms jitter를 사용한다.
              const delay = calculateBackoffDelay(attempt);
              options?.onAttempt?.({
                model,
                attempt,
                status: err.status,
                delay,
              });
              if (signal?.aborted) {
                return {
                  ok: false,
                  aborted: true,
                  error: { status: 0, message: "요청이 취소되었습니다." },
                };
              }
              await sleepFn(delay);
              if (signal?.aborted) {
                return {
                  ok: false,
                  aborted: true,
                  error: { status: 0, message: "요청이 취소되었습니다." },
                };
              }
              continue; // 동일 모델 재시도
            } else {
              // 4. 동일 모델 재시도가 모두 실패하면 다음 사용 가능 모델을 시도한다.
              options?.onAttempt?.({ model, attempt, status: err.status });
              break;
            }
          }

          // 기타 상태코드도 다음 모델로 이동
          options?.onAttempt?.({ model, attempt, status: err.status });
          break;
        } catch (networkErr: unknown) {
          if (
            signal?.aborted ||
            (networkErr instanceof Error && networkErr.name === "AbortError")
          ) {
            return {
              ok: false,
              aborted: true,
              error: { status: 0, message: "요청이 취소되었습니다." },
            };
          }

          const message =
            networkErr instanceof Error
              ? networkErr.message
              : "네트워크 연결 오류";
          lastError = { status: 0, message, model };
          logGeminiError(0, model, attempt, message, cleanKey);

          if (attempt < totalAttempts) {
            const delay = calculateBackoffDelay(attempt);
            options?.onAttempt?.({ model, attempt, status: 0, delay });
            if (signal?.aborted) {
              return {
                ok: false,
                aborted: true,
                error: { status: 0, message: "요청이 취소되었습니다." },
              };
            }
            await sleepFn(delay);
            if (signal?.aborted) {
              return {
                ok: false,
                aborted: true,
                error: { status: 0, message: "요청이 취소되었습니다." },
              };
            }
            continue;
          } else {
            options?.onAttempt?.({ model, attempt, status: 0 });
            break;
          }
        }
      }
    }

    return {
      ok: false,
      error: lastError ?? {
        status: 0,
        message: "지원되는 Gemini 모델을 찾을 수 없습니다.",
      },
    };
  }

  static async askTutor(
    context: TutorContext,
    options?: {
      fetchFn?: typeof fetch;
      sleepFn?: (ms: number) => Promise<void>;
      models?: string[];
      signal?: AbortSignal;
    },
  ): Promise<string> {
    const apiKey = await this.getApiKey();

    if (!apiKey) {
      return `Gemini API Key가 아직 등록되지 않았습니다.\n\n하단 메뉴의 [설정] 탭에서 구글 Gemini API Key를 등록하시면 실시간 1:1 맞춤형 과외 해설을 받으실 수 있습니다.\n\n(구글 AI Studio에서 무료로 발급 가능, AQ. 로 시작하는 인증키도 지원)`;
    }

    const cleanKey = cleanApiKey(apiKey);
    const systemPrompt = buildTutorPrompt(context);

    const result = await this.executeWithRetry(cleanKey, systemPrompt, {
      maxOutputTokens: TUTOR_MAX_OUTPUT_TOKENS,
      fetchFn: options?.fetchFn,
      sleepFn: options?.sleepFn,
      models: options?.models ?? TUTOR_MODELS,
      signal: options?.signal,
    });

    if (result.ok) {
      return result.text;
    }

    if (result.aborted) {
      return "";
    }

    return formatGeminiErrorMessage(result.error);
  }

  /**
   * 실시간 스트리밍(SSE) 방식으로 Gemini 튜터 답변을 수신합니다.
   * 모바일(React Native) 환경에서 XMLHttpRequest onprogress를 통해 토큰 단위로 실시간 표시합니다.
   * 환경이 지원하지 않거나 실패 시 표준 askTutor로 자동 안전 폴백합니다.
   */
  static async askTutorStream(
    context: TutorContext,
    onChunk: (accumulatedText: string) => void,
    options?: {
      fetchFn?: typeof fetch;
      sleepFn?: (ms: number) => Promise<void>;
      models?: string[];
      signal?: AbortSignal;
    },
  ): Promise<string> {
    const apiKey = await this.getApiKey();

    if (!apiKey) {
      const msg = `Gemini API Key가 아직 등록되지 않았습니다.\n\n하단 메뉴의 [설정] 탭에서 구글 Gemini API Key를 등록하시면 실시간 1:1 맞춤형 과외 해설을 받으실 수 있습니다.\n\n(구글 AI Studio에서 무료로 발급 가능, AQ. 로 시작하는 인증키도 지원)`;
      onChunk(msg);
      return msg;
    }

    if (options?.signal?.aborted) {
      return "";
    }

    // Node.js 테스트 환경이거나 별도 fetchFn이 주입된 경우 askTutor로 안전 폴백
    if (typeof XMLHttpRequest === "undefined" || options?.fetchFn) {
      const fullText = await this.askTutor(context, options);
      if (fullText && !options?.signal?.aborted) {
        onChunk(fullText);
      }
      return fullText;
    }

    const cleanKey = cleanApiKey(apiKey);
    const isLegacyKey = cleanKey.startsWith("AIza");
    const systemPrompt = buildTutorPrompt(context);
    const modelsToTry = options?.models ?? TUTOR_MODELS;

    const body = JSON.stringify({
      contents: [{ parts: [{ text: systemPrompt }] }],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: TUTOR_MAX_OUTPUT_TOKENS,
      },
    });

    for (const model of modelsToTry) {
      if (options?.signal?.aborted) {
        return "";
      }

      if (DISCONTINUED_MODEL_REGEX.test(model)) {
        continue;
      }

      const url = isLegacyKey
        ? `${GEMINI_BASE}/models/${encodeURIComponent(model)}:streamGenerateContent?alt=sse&key=${encodeURIComponent(cleanKey)}`
        : `${GEMINI_BASE}/models/${encodeURIComponent(model)}:streamGenerateContent?alt=sse`;

      const streamRes = await streamWithXHR(
        url,
        cleanKey,
        body,
        onChunk,
        options?.signal,
      );

      if (options?.signal?.aborted) {
        return "";
      }

      // 성공적으로 텍스트를 수신했거나 일부라도 누적된 경우 즉시 반환
      if (streamRes.text && streamRes.text.trim().length > 0) {
        return streamRes.text;
      }

      if (streamRes.error) {
        logGeminiError(streamRes.status, model, 1, streamRes.error, cleanKey);

        // 400, 401, 403 인증 오류는 다음 모델로 넘어가지 않고 즉시 종료
        if (isTerminalAuthStatus(streamRes.status, streamRes.error)) {
          const formatted = formatGeminiErrorMessage({
            status: streamRes.status,
            message: streamRes.error,
            model,
          });
          onChunk(formatted);
          return formatted;
        }
      }
    }

    // 스트리밍으로 텍스트 수신을 못했을 경우(서버 비호환 등), 지수 백오프 기반 정규 askTutor로 최종 폴백
    const fallbackText = await this.askTutor(context, options);
    if (fallbackText && !options?.signal?.aborted) {
      onChunk(fallbackText);
    }
    return fallbackText;
  }

  static async generateText(
    prompt: string,
    options?: {
      maxOutputTokens?: number;
      temperature?: number;
      json?: boolean;
      fetchFn?: typeof fetch;
      sleepFn?: (ms: number) => Promise<void>;
      models?: string[];
      signal?: AbortSignal;
      extraConfig?: Record<string, unknown>;
    },
  ): Promise<
    | { ok: true; text: string }
    | { ok: false; message: string; aborted?: boolean }
  > {
    const apiKey = await this.getApiKey();
    if (!apiKey) {
      return {
        ok: false,
        message:
          "Gemini API Key가 없습니다. [설정]에서 키를 등록한 뒤 다시 시도해 주세요.",
      };
    }

    const cleanKey = cleanApiKey(apiKey);
    const extraConfig: Record<string, unknown> = {
      ...(options?.extraConfig ?? {}),
    };
    if (options?.temperature !== undefined) {
      extraConfig.temperature = options.temperature;
    }
    if (options?.json) {
      extraConfig.responseMimeType = "application/json";
    }

    const result = await this.executeWithRetry(cleanKey, prompt, {
      maxOutputTokens: options?.maxOutputTokens ?? 2048,
      extraConfig,
      fetchFn: options?.fetchFn,
      sleepFn: options?.sleepFn,
      models: options?.models ?? GENERATOR_MODELS,
      signal: options?.signal,
    });

    if (result.ok) {
      return { ok: true, text: result.text };
    }

    return {
      ok: false,
      aborted: result.aborted,
      message: formatGeminiErrorMessage(result.error),
    };
  }

  static async testConnection(
    apiKey: string,
    options?: {
      fetchFn?: typeof fetch;
      sleepFn?: (ms: number) => Promise<void>;
      models?: string[];
    },
  ): Promise<{ success: boolean; message: string; model?: string }> {
    const cleanKey = cleanApiKey(apiKey);
    if (!cleanKey) {
      return { success: false, message: "API Key를 입력해 주세요." };
    }

    const result = await this.executeWithRetry(cleanKey, "Hello", {
      maxOutputTokens: 32,
      fetchFn: options?.fetchFn,
      sleepFn: options?.sleepFn,
      models: options?.models,
    });

    if (result.ok) {
      return {
        success: true,
        message: `성공! 정상 연결되었습니다. (${result.model})`,
        model: result.model,
      };
    }

    return {
      success: false,
      message: formatGeminiErrorMessage(result.error),
    };
  }
}
