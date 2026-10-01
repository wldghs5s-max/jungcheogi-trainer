import { Question } from '../types/question';
import { GeminiService } from '../api/geminiService';
import { checkAnswer, formatAnswerDisplay } from '../utils/quiz';
import { AttemptRepository } from '../repositories/attemptRepository';

export type VerifierVerdict =
  | 'USER_WRONG'
  | 'USER_CORRECT'
  | 'QUESTION_SUSPECT'
  | 'AMBIGUOUS'
  | 'VERIFICATION_UNCERTAIN';

export interface VerificationResult {
  verdict: VerifierVerdict;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  independentAnswer: string;
  storedAnswer: string;
  userAnswer: string;
  reason: string;
  safeExplanation: string;
  risk: 'NONE' | 'LOW' | 'HIGH';
  isSuspect: boolean;
}

export interface VerificationLogRecord {
  questionId: string;
  userAnswer: string;
  storedAnswer: string;
  verdict: VerifierVerdict;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  independentAnswer: string;
  reason: string;
  timestamp: string;
}

// 검증 충돌 및 이상 감지 로그 보관소 (세션/메모리 내 기록)
export const VERIFICATION_LOGS: VerificationLogRecord[] = [];

/**
 * AI 독립 정답 검증 프롬프트 생성기.
 * 저장된 정답을 정답이라고 가르쳐 주지 않고,
 * 문제 지문과 코드를 보고 AI가 '독립적'으로 정답을 도출한 후
 * 저장된 답안 및 사용자 답안과 객관적으로 대조하도록 요구합니다.
 */
export function buildVerificationPrompt(
  question: Question,
  userAnswer: string,
): string {
  const codeBlock = question.code
    ? `\n[제시된 코드 / 스니펫]\n\`\`\`${question.language || 'text'}\n${question.code}\n\`\`\`\n`
    : '';

  return `당신은 대한민국 국가기술자격 '정보처리기사 실기' 채점 검증 위원장입니다.
제시된 문제를 객관적이고 독립적으로 풀이하여 정답을 도출해야 합니다.
어떤 선입견이나 기존 답안에 구속되지 않고 오직 [문제 지문]과 [코드/조건]만을 객관적으로 분석하여 당신 자신의 순수한 전문 지식으로 [독립 정답]을 도출하세요.

[검증 대상 문항]
- 과목/단원: ${question.subject} > ${question.category}
- 문제 유형: ${question.type}
- 문제 지문: ${question.question}
${codeBlock}
- 수험생이 작성한 답: ${userAnswer || '(미작성)'}

반드시 다음 JSON 형식으로만 응답하세요(코드블록이나 마크다운 없이 순수 JSON만 반환):
{
  "independentAnswer": "문제와 코드를 직접 분석하여 도출한 독립 정답 (단답형 핵심 키워드 또는 코드 실행 출력값)",
  "confidence": "HIGH" | "MEDIUM" | "LOW",
  "reason": "독립 정답 도출 근거 및 수험생 작성 답에 대한 판단 요약 (2~3줄)",
  "isAmbiguous": false
}

[판정 지침]
- independentAnswer: 지문과 코드의 실행 흐름을 엄밀히 추적하여 도출된 정답 하나를 명확히 작성하세요.
- confidence: 문제의 조건이 명확하고 도출된 정답이 확실하면 "HIGH", 복수 해석 가능성이 있거나 다소 모호하면 "MEDIUM", 단서 부족 등으로 불확실하면 "LOW".
- isAmbiguous: 지문 해석이나 기술적 정의에 따라 복수 정답이 모두 논리적으로 성립 가능한 경우 true로 설정.`;
}

export class AIVerifierService {
  /**
   * 오답으로 판정된 문제에 대해 AI를 통한 독립 검증을 수행합니다.
   */
  static async verifyGrading(
    question: Question,
    userAnswer: string | string[],
    options?: {
      fetchFn?: typeof fetch;
      sleepFn?: (ms: number) => Promise<void>;
      signal?: AbortSignal;
      mockResult?: Partial<VerificationResult>;
    },
  ): Promise<VerificationResult> {
    const rawUserAns = Array.isArray(userAnswer) ? userAnswer.join(', ') : String(userAnswer || '');
    const storedAns = formatAnswerDisplay(question.answer);

    // Mock 결과가 주입된 경우 (단위 테스트 환경)
    if (options?.mockResult) {
      const independentAnswer = options.mockResult.independentAnswer || storedAns;
      const confidence = options.mockResult.confidence || 'HIGH';

      let verdict = options.mockResult.verdict;
      if (!verdict) {
        // Mock에서도 independentAnswer vs storedAnswer를 로컬 비교하여 자동 판정
        const matchesStored = checkAnswer(independentAnswer, question.answer, question);
        if (confidence === 'LOW') {
          verdict = 'VERIFICATION_UNCERTAIN';
        } else if (matchesStored) {
          verdict = checkAnswer(rawUserAns, question.answer, question) ? 'USER_CORRECT' : 'USER_WRONG';
        } else {
          verdict = 'QUESTION_SUSPECT';
        }
      }

      const isSuspect =
        verdict === 'QUESTION_SUSPECT' ||
        verdict === 'USER_CORRECT' ||
        verdict === 'AMBIGUOUS' ||
        Boolean(options.mockResult.isSuspect);

      const res: VerificationResult = {
        verdict,
        confidence,
        independentAnswer,
        storedAnswer: storedAns,
        userAnswer: rawUserAns,
        reason: options.mockResult.reason || 'Mock 검증 사유',
        safeExplanation: this.getSafeExplanation(
          verdict,
          question.explanation,
          storedAns,
          independentAnswer,
        ),
        risk: options.mockResult.risk || (isSuspect ? 'HIGH' : 'NONE'),
        isSuspect,
      };
      await this.recordLog(question.id, res);
      return res;
    }

    // 1. 만약 채점기가 이미 일치한다고 판정했다면 검증 불필요
    if (checkAnswer(userAnswer, question.answer, question)) {
      return {
        verdict: 'USER_CORRECT',
        confidence: 'HIGH',
        independentAnswer: storedAns,
        storedAnswer: storedAns,
        userAnswer: rawUserAns,
        reason: '로컬 채점기에서 이미 정답으로 일치 판정되었습니다.',
        safeExplanation: question.explanation,
        risk: 'NONE',
        isSuspect: false,
      };
    }

    // 2. AI 검증 프롬프트 실행 (선입견 없는 Blind 독립 정답 도출)
    const prompt = buildVerificationPrompt(question, rawUserAns);
    try {
      const res = await GeminiService.generateText(prompt, {
        json: true,
        maxOutputTokens: 1024,
        temperature: 0.1, // 검증의 엄밀성을 위해 낮은 온도 유지
        fetchFn: options?.fetchFn,
        sleepFn: options?.sleepFn,
        signal: options?.signal,
      });

      if (!res.ok) {
        return this.createUncertainResult(storedAns, rawUserAns, question.explanation, res.message);
      }

      // JSON 파싱
      const cleaned = res.text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);

      const independentAnswer = (parsed.independentAnswer || '').trim() || storedAns;
      const confidence: 'HIGH' | 'MEDIUM' | 'LOW' =
        parsed.confidence === 'HIGH' || parsed.confidence === 'LOW' ? parsed.confidence : 'MEDIUM';
      const isAmbiguous = Boolean(parsed.isAmbiguous);
      const reason = parsed.reason || '';

      // 3. 로컬 앱이 independentAnswer와 storedAnswer를 직접 대조하여 안전 판정
      const isIndependentMatch = checkAnswer(independentAnswer, question.answer, question);
      const isUserMatchStored = checkAnswer(rawUserAns, question.answer, question);
      const isUserMatchIndependent = checkAnswer(rawUserAns, independentAnswer, question);

      let verdict: VerifierVerdict;
      let isSuspect = false;
      let risk: 'NONE' | 'LOW' | 'HIGH' = 'NONE';

      if (confidence === 'LOW') {
        // AI가 스스로 확신하지 못함 -> 단정 짓지 않고 불확실 처리
        verdict = 'VERIFICATION_UNCERTAIN';
        risk = 'LOW';
      } else if (isAmbiguous) {
        // 복수 정답 성립 가능성 감지
        verdict = 'AMBIGUOUS';
        isSuspect = true;
        risk = 'HIGH';
      } else if (isIndependentMatch) {
        // AI 독립 정답이 저장 정답과 일치 -> 저장 정답 신뢰 확립
        if (isUserMatchStored || isUserMatchIndependent) {
          verdict = 'USER_CORRECT';
          isSuspect = true; // 로컬 채점에서 놓친 동의어/표현이므로 재검토 플래그 지정
          risk = 'LOW';
        } else {
          // 수험생의 명백한 오답
          verdict = 'USER_WRONG';
          risk = 'NONE';
        }
      } else {
        // AI 독립 정답이 저장 정답과 불일치 (HIGH 또는 MEDIUM 확신도) -> 문제 오류 의심
        verdict = 'QUESTION_SUSPECT';
        isSuspect = true;
        risk = 'HIGH';
      }

      const result: VerificationResult = {
        verdict,
        confidence,
        independentAnswer,
        storedAnswer: storedAns,
        userAnswer: rawUserAns,
        reason,
        safeExplanation: this.getSafeExplanation(verdict, question.explanation, storedAns, independentAnswer),
        risk,
        isSuspect,
      };

      await this.recordLog(question.id, result);
      return result;
    } catch (err: any) {
      return this.createUncertainResult(
        storedAns,
        rawUserAns,
        question.explanation,
        `AI 검증 실행 오류: ${err?.message || '알 수 없는 오류'}`,
      );
    }
  }

  /**
   * 문제 오류나 채점 의심 시 왜곡된 기존 해설을 차단하고
   * 수험생에게 안전하고 정확한 안내문을 제공합니다.
   */
  static getSafeExplanation(
    verdict: VerifierVerdict,
    originalExplanation: string,
    storedAnswer: string,
    independentAnswer: string,
  ): string {
    if (verdict === 'QUESTION_SUSPECT') {
      return `⚠️ [채점 재검토 안내]\n이 문제는 문제 지문 또는 제시된 코드와 저장된 정답 간에 모순이 감지되어 재검토 대상으로 분류되었습니다.\n- AI 독립 분석 결과: "${independentAnswer}"\n- 등록된 정답: "${storedAnswer}"\n잘못된 지식 습득 방지를 위해 기존 해설 표시가 일시 제한되며 수험생 오답률에 반영되지 않습니다.`;
    }

    if (verdict === 'USER_CORRECT') {
      return `⚠️ [정답 인정 재검토 안내]\n수험생께서 작성하신 답안이 타당한 정답 또는 동의어로 판단되었습니다.\n- 수험생 답안이 논리적으로 정답에 부합하므로 재검토 플래그가 지정되었습니다.`;
    }

    if (verdict === 'AMBIGUOUS') {
      return `⚠️ [복수 정답 가능성 안내]\n문제 지문의 해석에 따라 복수의 정답이 성립할 가능성이 있습니다.\n- 저장 정답: "${storedAnswer}"\n- 대안 정답: "${independentAnswer}"`;
    }

    if (verdict === 'VERIFICATION_UNCERTAIN') {
      return `기본 채점 결과는 오답입니다. (현재 AI 실시간 재검토가 일시 지연되었습니다)\n\n[기본 해설]\n${originalExplanation}`;
    }

    // USER_WRONG: 정상적인 오답 해설 표시
    return originalExplanation;
  }

  private static createUncertainResult(
    storedAnswer: string,
    userAnswer: string,
    originalExplanation: string,
    reason: string,
  ): VerificationResult {
    return {
      verdict: 'VERIFICATION_UNCERTAIN',
      confidence: 'LOW',
      independentAnswer: storedAnswer,
      storedAnswer,
      userAnswer,
      reason,
      safeExplanation: `기본 채점 결과는 오답입니다. (네트워크/서버 문제로 AI 정밀 재검증을 완료하지 못했습니다)\n\n[기본 해설]\n${originalExplanation}`,
      risk: 'LOW',
      isSuspect: false,
    };
  }

  private static async recordLog(questionId: string, result: VerificationResult): Promise<void> {
    if (result.isSuspect || result.verdict === 'AMBIGUOUS') {
      VERIFICATION_LOGS.unshift({
        questionId,
        userAnswer: result.userAnswer,
        storedAnswer: result.storedAnswer,
        verdict: result.verdict,
        confidence: result.confidence,
        independentAnswer: result.independentAnswer,
        reason: result.reason,
        timestamp: new Date().toISOString(),
      });
      // QUESTION_SUSPECT 또는 USER_CORRECT (채점 의심) 격리: 오답 통계/약점 점수 누적 차단
      if (result.isSuspect) {
        await AttemptRepository.markAttemptSuspect(questionId, result.reason);
      }
    }
  }
}
