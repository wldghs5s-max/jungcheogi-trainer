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

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Gemini API Error:', errorData);
        if (response.status === 400 || response.status === 403) {
          return '❌ API Key가 유효하지 않거나 권한이 없습니다. [설정] 탭에서 키를 다시 확인해 주세요.';
        }
        return `❌ AI 튜터 서버 응답 오류가 발생했습니다. (상태 코드: ${response.status})`;
      }

      const data = await response.json();
      const answerText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!answerText) {
        return 'AI 튜터가 답변을 생성하지 못했습니다. 잠시 후 다시 질문해 주세요.';
      }

      return answerText.trim();
    } catch (e: any) {
      console.error('Gemini Network Error:', e);
      return `❌ 네트워크 오류가 발생했습니다: ${e.message || '인터넷 연결 상태를 확인해 주세요.'}`;
    }
  }
}
