import { GeneratedProgrammingQuestion, ValidationResult } from './types';

// 악성 시스템/네트워크 접근 차단 키워드 목록
const DISALLOWED_PATTERNS = [
  /system\s*\(/i,
  /popen\s*\(/i,
  /exec\s*\(/i,
  /eval\s*\(/i,
  /subprocess/i,
  /Runtime\.getRuntime/i,
  /ProcessBuilder/i,
  /java\.io\.File/i,
  /java\.net\./i,
  /socket\s*\(/i,
  /connect\s*\(/i,
  /import\s+os\b/i,
  /import\s+sys\b/i,
  /__import__/i,
  /open\s*\(/i,
  /XMLHttpRequest/i,
  /fetch\s*\(/i,
  /require\s*\(/i,
];

export class QuestionValidator {
  /**
   * 문제의 모든 요구사항(필드, 문법, 보안, 정답 일치 여부)을 종합 검증합니다.
   */
  static validate(q: Partial<GeneratedProgrammingQuestion>): ValidationResult {
    // 1. 필수 필드 존재 검사
    if (!q.id || !q.question || !q.code || !q.answer || !q.explanation) {
      return {
        isValid: false,
        status: 'rejected',
        reason: '필수 필드(id, question, code, answer, explanation) 누락',
      };
    }

    if (!q.programmingLanguage || !q.topic || !q.programmingType || !q.difficulty) {
      return {
        isValid: false,
        status: 'rejected',
        reason: '메타데이터(language, topic, questionType, difficulty) 누락',
      };
    }

    // 2. 문제 본문 및 코드 길이 검사 (기사 시험 범위 적합성)
    const codeLines = q.code.trim().split('\n');
    if (codeLines.length < 3) {
      return {
        isValid: false,
        status: 'rejected',
        reason: `코드가 너무 짧습니다 (${codeLines.length}행). 최소 3행 이상이어야 합니다.`,
      };
    }
    if (codeLines.length > 45) {
      return {
        isValid: false,
        status: 'rejected',
        reason: `코드가 너무 깁니다 (${codeLines.length}행). 정보처리기사 실기 기준 45행 이내여야 합니다.`,
      };
    }

    // 3. 보안성 검사: 시스템, 파일, 네트워크 접근 차단
    for (const pattern of DISALLOWED_PATTERNS) {
      if (pattern.test(q.code)) {
        return {
          isValid: false,
          status: 'rejected',
          reason: `허용되지 않는 보안 위험 코드 포함: ${pattern}`,
        };
      }
    }

    // 4. 문법적 무결성: 괄호 쌍 밸런스 검사
    if (!this.checkBalancedDelimiters(q.code)) {
      return {
        isValid: false,
        status: 'rejected',
        reason: '괄호 또는 중괄호의 쌍이 올바르게 닫히지 않았습니다.',
      };
    }

    // 5. 보기 및 정답 무결성 검사
    const answers = Array.isArray(q.answer) ? q.answer : [q.answer];
    if (answers.length === 0 || answers.some((a) => !String(a).trim())) {
      return {
        isValid: false,
        status: 'rejected',
        reason: '유효한 정답 문자열이 비어 있습니다.',
      };
    }

    if (q.options && q.options.length > 0) {
      // 객관식인 경우 정답이 보기 목록에 포함되어 있는지 확인
      const matched = answers.some((ans) => q.options?.includes(ans));
      if (!matched) {
        return {
          isValid: false,
          status: 'rejected',
          reason: '객관식 문제의 정답이 보기(options) 목록에 없습니다.',
        };
      }
    }

    // 6. 무한 루프 가능성 휴리스틱 검사
    if (this.hasPotentialInfiniteLoop(q.code)) {
      return {
        isValid: false,
        status: 'rejected',
        reason: '탈출 조건이 불명확하거나 무한 루프 가능성이 감지되었습니다.',
      };
    }

    // 7. 정답과 해설의 논리적 일치 여부 확인
    const primaryAns = String(answers[0]).trim();
    const explanationHasAns = answers.some((a) =>
      q.explanation?.includes(String(a).trim()),
    );
    if (!explanationHasAns && primaryAns.length > 1) {
      // 해설에 정답 언급이 전혀 없는 경우 경고/수동검토
      return {
        isValid: true,
        status: 'manualReviewRequired',
        reason: '해설에 정답 텍스트가 직접 언급되지 않아 수동 검토가 권장됩니다.',
      };
    }

    return {
      isValid: true,
      status: 'validated',
    };

  }

  /**
   * 괄호/따옴표 짝 검사
   */
  private static checkBalancedDelimiters(code: string): boolean {
    const stack: string[] = [];
    let inSingleQuote = false;
    let inDoubleQuote = false;
    let escape = false;

    for (let i = 0; i < code.length; i++) {
      const char = code[i];

      if (escape) {
        escape = false;
        continue;
      }
      if (char === '\\') {
        escape = true;
        continue;
      }

      if (char === "'" && !inDoubleQuote) {
        inSingleQuote = !inSingleQuote;
        continue;
      }
      if (char === '"' && !inSingleQuote) {
        inDoubleQuote = !inDoubleQuote;
        continue;
      }
      if (inSingleQuote || inDoubleQuote) {
        continue;
      }

      if (char === '{' || char === '(' || char === '[') {
        stack.push(char);
      } else if (char === '}') {
        if (stack.pop() !== '{') return false;
      } else if (char === ')') {
        if (stack.pop() !== '(') return false;
      } else if (char === ']') {
        if (stack.pop() !== '[') return false;
      }
    }

    return stack.length === 0 && !inSingleQuote && !inDoubleQuote;
  }

  /**
   * 무한 루프 가능성 휴리스틱 검사
   */
  private static hasPotentialInfiniteLoop(code: string): boolean {
    // while (1) 또는 while (true) 인데 루프 내부에 break 또는 return 이 없는 경우
    const whileTrueRegex = /while\s*\(\s*(?:1|true)\s*\)/i;
    if (whileTrueRegex.test(code)) {
      if (!/break\s*;/i.test(code) && !/return\b/i.test(code)) {
        return true;
      }
    }

    // for (;;) 인데 break/return 없는 경우
    if (/for\s*\(\s*;\s*;\s*\)/.test(code)) {
      if (!/break\s*;/i.test(code) && !/return\b/i.test(code)) {
        return true;
      }
    }

    return false;
  }
}
