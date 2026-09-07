import { LocalStorage } from '../storage/localStorage';
import { Question } from '../types/question';

export const GEMINI_KEY_STORAGE = '@gemini_api_key';

export interface TutorContext {
  question: Question;
  userAnswer?: string | string[];
  userPrompt: string;
}

export class GeminiService {
  /**
   * 저장된 Gemini API Key를 가져옵니다.
   */
  static async getApiKey(): Promise<string | null> {
    return await LocalStorage.getItem<string>(GEMINI_KEY_STORAGE);
  }

  /**
   * Gemini API Key를 로컬에 저장합니다.
   */
  static async saveApiKey(key: string): Promise<void> {
    await LocalStorage.setItem(GEMINI_KEY_STORAGE, key.trim());
  }

  /**
   * Gemini API를 호출하여 AI 튜터 답변을 받습니다.
   */
  static async askTutor(context: TutorContext): Promise<string> {
    const apiKey = await this.getApiKey();

    if (!apiKey) {
      return `⚠️ Gemini API Key가 아직 등록되지 않았습니다.\n\n하단 메뉴의 [설정] 탭에서 구글 Gemini API Key를 등록하시면 실시간 1:1 맞춤형 과외 해설을 받으실 수 있습니다!\n\n(구글 AI Studio에서 무료로 1분 만에 발급 가능)`;
    }

    const cleanKey = apiKey.trim();
    const { question, userAnswer, userPrompt } = context;

    // 수험생 맞춤형 프롬프트 구성
    const systemPrompt = `당신은 대한민국 최고 수준의 정보처리기사 실기 전담 1:1 스타 강사이자 AI 수험 튜터입니다.
수험생의 눈높이에 맞춰 친절하고 논리정연하며, 실제 시험장에서 점수를 얻을 수 있는 명쾌한 답변을 제공하세요.
반드시 한국어로 자연스럽고 가독성 좋게 이모지와 불릿 포인트를 활용하여 구조화해 주세요.

[문제 정보]
- 과목/단원: ${question.subject} > ${question.category}
- 문제 유형: ${question.type} (난이도: ${question.difficulty})
- 문제 지문: ${question.question}
${question.code ? `- 코드:\n\`\`\`${question.language || 'text'}\n${question.code}\n\`\`\`` : ''}
- 정답: ${Array.isArray(question.answer) ? question.answer.join(' 또는 ') : question.answer}
- 기본 해설: ${question.explanation}
- 수험생이 작성한 답: ${userAnswer ? (Array.isArray(userAnswer) ? userAnswer.join(', ') : userAnswer) : '(미작성)'}

[수험생의 질문]
${userPrompt}
`;

    // 2026 최신 Gemini 모델 우선순위 목록 (404/지원중단 대비 자동 Fallback)
    const CANDIDATE_MODELS = [
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-1.5-flash',
      'gemini-1.5-flash-latest',
      'gemini-2.0-flash-exp',
    ];

    let lastError: { status: number; message: string } | null = null;

    for (const model of CANDIDATE_MODELS) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(cleanKey)}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-goog-api-key': cleanKey,
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [{ text: systemPrompt }],
                },
              ],
              generationConfig: {
                temperature: 0.4,
                maxOutputTokens: 1000,
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const answerText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (answerText) {
            return answerText.trim();
          }
        }

        const errorData = await response.json().catch(() => ({}));
        const message = errorData?.error?.message || `HTTP ${response.status}`;
        lastError = { status: response.status, message };

        // 404(모델 미지원)인 경우 다음 후보 모델로 재시도
        if (response.status === 404) {
          console.warn(`Gemini model ${model} returned 404, trying fallback...`);
          continue;
        }

        // 인증 또는 권한 오류 시 즉시 안내 반환
        if (response.status === 400 || response.status === 401 || response.status === 403) {
          return `❌ Gemini API Key 인증 오류 (${response.status})\n\n사유: ${message}\n\n[설정] 탭에서 구글 AI Studio에서 발급받은 올바른 API Key인지 다시 확인해 주세요.`;
        }
      } catch (e: any) {
        console.error(`Gemini request failed for ${model}:`, e);
        lastError = { status: 0, message: e.message || '네트워크 연결 오류' };
      }
    }

    if (lastError) {
      return `❌ AI 튜터 서버 응답 오류 (${lastError.status}): ${lastError.message}\n\nGoogle 서버에서 지원되는 모델을 찾지 못했거나 키 권한에 문제가 있습니다. [설정] 탭에서 키를 재등록해 주세요.`;
    }

    return 'AI 튜터가 답변을 생성하지 못했습니다. 잠시 후 다시 질문해 주세요.';
  }

  /**
   * Gemini API Key가 정상 작동하는지 핑 테스트를 수행합니다.
   */
  static async testConnection(
    apiKey: string
  ): Promise<{ success: boolean; message: string; model?: string }> {
    const cleanKey = apiKey.trim();
    if (!cleanKey) {
      return { success: false, message: 'API Key를 입력해 주세요.' };
    }

    const CANDIDATE_MODELS = [
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-1.5-flash',
      'gemini-1.5-flash-latest',
    ];

    for (const model of CANDIDATE_MODELS) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(cleanKey)}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-goog-api-key': cleanKey,
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: 'Hello' }] }],
              generationConfig: { maxOutputTokens: 5 },
            }),
          }
        );

        if (response.ok) {
          return {
            success: true,
            message: `성공! 정상 연결되었습니다. (${model})`,
            model,
          };
        }

        const errorData = await response.json().catch(() => ({}));
        const errMsg = errorData?.error?.message || `HTTP ${response.status}`;

        if (response.status === 404) {
          continue; // 다른 모델 시도
        }

        return {
          success: false,
          message: `인증 오류 (${response.status}): ${errMsg}`,
        };
      } catch (e: any) {
        return {
          success: false,
          message: `네트워크 오류: ${e.message || '연결할 수 없습니다.'}`,
        };
      }
    }

    return {
      success: false,
      message: '지원되는 Gemini 모델을 찾을 수 없습니다. API Key를 확인해 주세요.',
    };
  }
}
