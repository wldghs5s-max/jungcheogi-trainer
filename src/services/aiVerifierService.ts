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
  const storedAns = formatAnswerDisplay(question.answer);
  const codeBlock = question.code
    ? `\n[제시된 코드 / 스니펫]\n\`\`\`${question.language || 'text'}\n${question.code}\n\`\`\`\n`
    : '';

  return `당신은 대한민국 국가기술자격 '정보처리기사 실기' 채점 검증 총괄 위원장입니다.
현재 문제은행의 특정 문항에 대해 수험생 답안이 오답 처리되었으나,
1) 문제 자체의 오류(지문과 정답 불일치, 코드 버그, 복수정답 등)
2) 채점기의 오채점(동의어, 띄어쓰기, 기호 정규화 미흡 등)
가능성을 배제하기 위해 [독립 정답 검증]을 수행합니다.

[절대 주의사항]
- '저장된 정답'이나 '기존 해설'을 무조건 진실로 신뢰하지 마세요. 그것들은 검증 대상 데이터일 뿐입니다.
- 먼저 [문제 지문]과 [코드]만을 객관적으로 분석하여 당신 자신의 전문 지식으로 [독립적 정답]을 먼저 도출하세요.
- 그 후 당신의 독립 정답과 [저장된 정답], [수험생 작성 답]을 비교하여 판정하세요.

[검증 대상 문항]
- 과목/단원: ${question.subject} > ${question.category}
- 문제 유형: ${question.type}
- 문제 지문: ${question.question}
${codeBlock}
- 저장된 정답: ${storedAns}
- 기존 해설(참고용): ${question.explanation}
- 수험생이 작성한 답: ${userAnswer || '(미작성)'}

반드시 다음 JSON 형식으로만 응답하세요(코드블록이나 마크다운 없이 순수 JSON만 반환):
{
  "independentAnswer": "문제와 코드를 직접 풀어 도출한 당신의 독립 정답",
  "verdict": "USER_WRONG" | "USER_CORRECT" | "QUESTION_SUSPECT" | "AMBIGUOUS" | "VERIFICATION_UNCERTAIN",
  "confidence": "HIGH" | "MEDIUM" | "LOW",
  "reason": "판정 사유 (수험생이 왜 틀렸는지, 또는 문제/채점에 왜 오류가 의심되는지 2~3줄 요약)",
  "risk": "NONE" | "LOW" | "HIGH"
}

[verdict 기준]
- USER_WRONG: 당신의 독립 정답이 저장된 정답과 일치하며, 수험생의 답이 명백한 오답인 경우
- USER_CORRECT: 당신의 독립 정답이 수험생 답과 일치하거나, 수험생의 답이 타당한 동의어/표현인데 오답 처리된 경우
- QUESTION_SUSPECT: 문제 지문 오류, 정답 오타, 코드 실행 결과가 저장 정답과 달라 문제 자체에 하자가 있는 경우
- AMBIGUOUS: 문제 지문이 모호하여 복수의 정답이 모두 논리적으로 성립하는 경우
- VERIFICATION_UNCERTAIN: 문제의 단서가 부족하거나 판단을 내리기 모호한 경우`;
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
      const res: VerificationResult = {
        verdict: options.mockResult.verdict || 'USER_WRONG',
        confidence: options.mockResult.confidence || 'HIGH',
        independentAnswer: options.mockResult.independentAnswer || storedAns,
        storedAnswer: storedAns,
        userAnswer: rawUserAns,
        reason: options.mockResult.reason || 'Mock 검증 사유',
        safeExplanation: this.getSafeExplanation(
          options.mockResult.verdict || 'USER_WRONG',
          question.explanation,
          storedAns,
          options.mockResult.independentAnswer || storedAns,
        ),
        risk: options.mockResult.risk || 'NONE',
        isSuspect: options.mockResult.verdict === 'QUESTION_SUSPECT' || options.mockResult.verdict === 'USER_CORRECT',
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

    // 2. AI 검증 프롬프트 실행
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

      const verdict: VerifierVerdict = parsed.verdict || 'VERIFICATION_UNCERTAIN';
      const confidence = parsed.confidence || 'MEDIUM';
      const independentAnswer = parsed.independentAnswer || storedAns;
      const reason = parsed.reason || '';
      const risk = parsed.risk || 'NONE';
      const isSuspect = verdict === 'QUESTION_SUSPECT' || verdict === 'USER_CORRECT';

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
