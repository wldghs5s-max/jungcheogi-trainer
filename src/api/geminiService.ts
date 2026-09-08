import { LocalStorage } from "../storage/localStorage";
import { Question } from "../types/question";

export const GEMINI_KEY_STORAGE = "@gemini_api_key";

const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta";

/** 신규 프로젝트에서 사용 가능한 최신 Flash 모델을 우선 시도합니다. */
const PREFERRED_MODELS = [
  "gemini-3.8-flash",
  "gemini-3.7-flash",
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite",
  "gemini-2.5-flash",
  "gemini-2.0-flash",
];

export interface TutorContext {
  question: Question;
  userAnswer?: string | string[];
  userPrompt: string;
}

interface GeminiRequestError {
  status: number;
  message: string;
}

function authHeaders(apiKey: string): Record<string, string> {
  // AQ. 인증키는 ?key= 쿼리로는 401이 납니다. 헤더만 사용합니다.
  return {
    "Content-Type": "application/json",
    "x-goog-api-key": apiKey,
  };
}

function extractText(data: unknown): string | null {
  const parts = (data as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string; thought?: boolean }> } }>;
  })?.candidates?.[0]?.content?.parts;

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

function isAuthStatus(status: number): boolean {
  return status === 401 || status === 403;
}

async function listAvailableModels(apiKey: string): Promise<string[]> {
  const response = await fetch(`${GEMINI_BASE}/models`, {
    method: "GET",
    headers: authHeaders(apiKey),
  });

  const errorData = response.ok ? null : await response.json().catch(() => ({}));
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
    .filter(Boolean);
}

function pickModelsToTry(available: string[]): string[] {
  const availableSet = new Set(available);
  const preferred = PREFERRED_MODELS.filter((name) => availableSet.has(name));
  if (preferred.length > 0) return preferred;

  const flashModels = available.filter(
    (name) =>
      name.includes("flash") &&
      !name.includes("image") &&
      !name.includes("tts") &&
      !name.includes("live"),
  );
  return flashModels.length > 0 ? flashModels : PREFERRED_MODELS;
}

async function generateContent(
  apiKey: string,
  model: string,
  prompt: string,
  maxOutputTokens: number,
  extraConfig: Record<string, unknown> = {},
): Promise<{ text: string | null; error?: GeminiRequestError }> {
  const response = await fetch(
    `${GEMINI_BASE}/models/${encodeURIComponent(model)}:generateContent`,
    {
      method: "POST",
      headers: authHeaders(apiKey),
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens,
          ...extraConfig,
        },
      }),
    },
  );

  const data = await response.json().catch(() => ({}));
  if (response.ok) {
    return { text: extractText(data) };
  }

  return {
    text: null,
    error: {
      status: response.status,
      message: parseErrorMessage(data, response.status),
    },
  };
}

export class GeminiService {
  static async getApiKey(): Promise<string | null> {
    return await LocalStorage.getItem<string>(GEMINI_KEY_STORAGE);
  }

  static async saveApiKey(key: string): Promise<void> {
    const trimmed = key.trim();
    if (!trimmed) {
      await LocalStorage.removeItem(GEMINI_KEY_STORAGE);
      return;
    }
    await LocalStorage.setItem(GEMINI_KEY_STORAGE, trimmed);
  }

  static async askTutor(context: TutorContext): Promise<string> {
    const apiKey = await this.getApiKey();

    if (!apiKey) {
      return `Gemini API Key가 아직 등록되지 않았습니다.\n\n하단 메뉴의 [설정] 탭에서 구글 Gemini API Key를 등록하시면 실시간 1:1 맞춤형 과외 해설을 받으실 수 있습니다.\n\n(구글 AI Studio에서 무료로 발급 가능, AQ. 로 시작하는 인증키도 지원)`;
    }

    const cleanKey = apiKey.trim();
    const { question, userAnswer, userPrompt } = context;

    const systemPrompt = `당신은 대한민국 최고 수준의 정보처리기사 실기 전담 1:1 스타 강사이자 AI 수험 튜터입니다.
수험생의 눈높이에 맞춰 친절하고 논리정연하며, 실제 시험장에서 점수를 얻을 수 있는 명쾌한 답변을 제공하세요.
반드시 한국어로 자연스럽고 가독성 좋게 불릿 포인트를 활용하여 구조화해 주세요.

[문제 정보]
- 과목/단원: ${question.subject} > ${question.category}
- 문제 유형: ${question.type} (난이도: ${question.difficulty})
- 문제 지문: ${question.question}
${question.code ? `- 코드:\n\`\`\`${question.language || "text"}\n${question.code}\n\`\`\`` : ""}
- 정답: ${Array.isArray(question.answer) ? question.answer.join(" 또는 ") : question.answer}
- 기본 해설: ${question.explanation}
- 수험생이 작성한 답: ${userAnswer ? (Array.isArray(userAnswer) ? userAnswer.join(", ") : userAnswer) : "(미작성)"}

[수험생의 질문]
${userPrompt}
`;

    try {
      let modelsToTry = PREFERRED_MODELS;
      try {
        const available = await listAvailableModels(cleanKey);
        if (available.length > 0) {
          modelsToTry = pickModelsToTry(available);
        }
      } catch (listError) {
        const err = listError as GeminiRequestError;
        if (err?.status && isAuthStatus(err.status)) {
          return `Gemini API Key 인증 오류 (${err.status})\n\n사유: ${err.message}\n\nAQ. 로 시작하는 인증키는 AI Studio에서 발급한 최신 키입니다. [설정]에서 키를 다시 붙여넣고 검증해 주세요.`;
        }
      }

      let lastError: GeminiRequestError | null = null;

      for (const model of modelsToTry) {
        try {
          const result = await generateContent(cleanKey, model, systemPrompt, 2048);
          if (result.text) {
            return result.text;
          }
          if (result.error) {
            lastError = result.error;
            if (isAuthStatus(result.error.status)) {
              return `Gemini API Key 인증 오류 (${result.error.status})\n\n사유: ${result.error.message}\n\n[설정] 탭에서 구글 AI Studio에서 발급받은 올바른 API Key인지 다시 확인해 주세요.`;
            }
            if (result.error.status === 404) {
              continue;
            }
          }
        } catch (e: unknown) {
          const message = e instanceof Error ? e.message : "네트워크 연결 오류";
          lastError = { status: 0, message };
        }
      }

      if (lastError) {
        return `AI 튜터 서버 응답 오류 (${lastError.status}): ${lastError.message}\n\n사용 가능한 Gemini 모델을 찾지 못했거나 키 권한에 문제가 있습니다. [설정]에서 키를 다시 검증해 주세요.`;
      }

      return "AI 튜터가 답변을 생성하지 못했습니다. 잠시 후 다시 질문해 주세요.";
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "알 수 없는 오류";
      return `네트워크 오류: ${message}`;
    }
  }

  static async generateText(
    prompt: string,
    options?: {
      maxOutputTokens?: number;
      temperature?: number;
      json?: boolean;
    },
  ): Promise<{ ok: true; text: string } | { ok: false; message: string }> {
    const apiKey = await this.getApiKey();
    if (!apiKey) {
      return {
        ok: false,
        message:
          "Gemini API Key가 없습니다. [설정]에서 키를 등록한 뒤 다시 시도해 주세요.",
      };
    }

    const cleanKey = apiKey.trim();
    let modelsToTry = PREFERRED_MODELS;
    try {
      const available = await listAvailableModels(cleanKey);
      if (available.length > 0) {
        modelsToTry = pickModelsToTry(available);
      }
    } catch (listError) {
      const err = listError as GeminiRequestError;
      if (err?.status && isAuthStatus(err.status)) {
        return { ok: false, message: `인증 오류 (${err.status}): ${err.message}` };
      }
    }

    const extraConfig: Record<string, unknown> = {};
    if (options?.temperature !== undefined) {
      extraConfig.temperature = options.temperature;
    }
    if (options?.json) {
      extraConfig.responseMimeType = "application/json";
    }

    let lastError: GeminiRequestError | null = null;
    for (const model of modelsToTry) {
      const result = await generateContent(
        cleanKey,
        model,
        prompt,
        options?.maxOutputTokens ?? 2048,
        extraConfig,
      );
      if (result.text) {
        return { ok: true, text: result.text };
      }
      if (result.error) {
        lastError = result.error;
        if (isAuthStatus(result.error.status)) {
          return {
            ok: false,
            message: `인증 오류 (${result.error.status}): ${result.error.message}`,
          };
        }
        if (result.error.status === 404) {
          continue;
        }
      }
    }

    return {
      ok: false,
      message: lastError
        ? `생성 실패 (${lastError.status}): ${lastError.message}`
        : "Gemini가 응답을 만들지 못했습니다.",
    };
  }

  static async testConnection(
    apiKey: string,
  ): Promise<{ success: boolean; message: string; model?: string }> {
    const cleanKey = apiKey.trim();
    if (!cleanKey) {
      return { success: false, message: "API Key를 입력해 주세요." };
    }

    try {
      let modelsToTry = PREFERRED_MODELS;
      try {
        const available = await listAvailableModels(cleanKey);
        if (available.length > 0) {
          modelsToTry = pickModelsToTry(available);
        }
      } catch (listError) {
        const err = listError as GeminiRequestError;
        if (err?.status && isAuthStatus(err.status)) {
          return {
            success: false,
            message: `인증 오류 (${err.status}): ${err.message}\nAQ. 인증키는 URL이 아니라 헤더로만 전송해야 합니다.`,
          };
        }
      }

      for (const model of modelsToTry) {
        const result = await generateContent(cleanKey, model, "Hello", 32);
        if (result.text) {
          return {
            success: true,
            message: `성공! 정상 연결되었습니다. (${model})`,
            model,
          };
        }
        if (result.error) {
          if (isAuthStatus(result.error.status)) {
            return {
              success: false,
              message: `인증 오류 (${result.error.status}): ${result.error.message}`,
            };
          }
          if (result.error.status === 404) {
            continue;
          }
          return {
            success: false,
            message: `요청 오류 (${result.error.status}): ${result.error.message}`,
          };
        }
      }

      return {
        success: false,
        message:
          "지원되는 Gemini 모델을 찾을 수 없습니다. 키 권한과 프로젝트 설정을 확인해 주세요.",
      };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "연결할 수 없습니다.";
      return { success: false, message: `네트워크 오류: ${message}` };
    }
  }
}
