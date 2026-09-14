import { CodeLanguage, Difficulty } from '../../../types/question';
import { ProgrammingQuestionType, ProgrammingTopic } from '../taxonomy';
import { GeneratedProgrammingQuestion, GenerationContext } from '../types';
import { BaseGenerator } from './BaseGenerator';

export class RecursiveCallGenerator extends BaseGenerator {
  readonly id = 'RecursiveCallGenerator';
  readonly name = '재귀 함수 추적 생성기';
  readonly supportedLanguages: CodeLanguage[] = ['C', 'JAVA', 'PYTHON'];
  readonly supportedTopics: ProgrammingTopic[] = ['RECURSIVE'];
  readonly supportedTypes: ProgrammingQuestionType[] = ['RETURN_VALUE', 'CODE_OUTPUT'];
  readonly supportedDifficulties: Difficulty[] = ['EASY', 'MEDIUM', 'HARD'];

  generate(context: GenerationContext): GeneratedProgrammingQuestion {
    const rng = this.createRng(context.seed);
    const lang = context.targetLanguage || this.pickOne(this.supportedLanguages, rng);
    const difficulty = context.targetDifficulty || this.pickOne(this.supportedDifficulties, rng);
    const qType: ProgrammingQuestionType =
      context.targetType && this.supportedTypes.includes(context.targetType)
        ? context.targetType
        : 'CODE_OUTPUT';

    // 재귀 유형: FACTORIAL (계승/누적), FIBONACCI (분기 재귀), GCD (유클리드 호제)
    const recType = difficulty === 'HARD'
      ? 'GCD'
      : this.pickOne(['FACTORIAL', 'FIBONACCI'], rng);

    let code = '';
    let finalAnswer = '';
    let explanation = '';

    if (recType === 'FACTORIAL') {
      const n = this.pickInt(3, 5, rng);
      let fact = 1;
      for (let i = 1; i <= n; i++) fact *= i;
      finalAnswer = String(fact);

      if (lang === 'C') {
        code = `#include <stdio.h>

int f(int n) {
    if (n <= 1) return 1;
    return n * f(n - 1);
}

int main() {
    printf("%d", f(${n}));
    return 0;
}`;
      } else if (lang === 'JAVA') {
        code = `public class Main {
    static int f(int n) {
        if (n <= 1) return 1;
        return n * f(n - 1);
    }

    public static void main(String[] args) {
        System.out.print(f(${n}));
    }
}`;
      } else {
        code = `def f(n):
    if n <= 1:
        return 1
    return n * f(n - 1)

print(f(${n}))`;
      }

      explanation = `f(${n})은 ${n}부터 1까지 곱하는 팩토리얼 재귀 호출입니다. 최종 반환값은 ${finalAnswer}입니다.`;
    } else if (recType === 'FIBONACCI') {
      const n = this.pickInt(4, 6, rng);
      const fib = (k: number): number => (k <= 1 ? k : fib(k - 1) + fib(k - 2));
      const res = fib(n);
      finalAnswer = String(res);

      if (lang === 'C') {
        code = `#include <stdio.h>

int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

int main() {
    printf("%d", fib(${n}));
    return 0;
}`;
      } else if (lang === 'JAVA') {
        code = `public class Main {
    static int fib(int n) {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    }

    public static void main(String[] args) {
        System.out.print(fib(${n}));
    }
}`;
      } else {
        code = `def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(${n}))`;
      }

      explanation = `fib(${n})은 피보나치 수열을 분기 재귀 호출하는 함수입니다. 계산 결과는 ${finalAnswer}입니다.`;
    } else {
      // GCD
      const pairs = [
        [24, 16],
        [36, 24],
        [48, 18],
        [30, 20],
      ];
      const pair = this.pickOne(pairs, rng);
      const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
      const gRes = gcd(pair[0], pair[1]);
      finalAnswer = String(gRes);

      if (lang === 'C') {
        code = `#include <stdio.h>

int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

int main() {
    printf("%d", gcd(${pair[0]}, ${pair[1]}));
    return 0;
}`;
      } else if (lang === 'JAVA') {
        code = `public class Main {
    static int gcd(int a, int b) {
        if (b == 0) return a;
        return gcd(b, a % b);
    }

    public static void main(String[] args) {
        System.out.print(gcd(${pair[0]}, ${pair[1]}));
    }
}`;
      } else {
        code = `def gcd(a, b):
    if b == 0:
        return a
    return gcd(b, a % b)

print(gcd(${pair[0]}, ${pair[1]}))`;
      }

      explanation = `유클리드 호제법 알고리즘에 따라 두 수 ${pair[0]}과 ${pair[1]}의 최대공약수(GCD)인 ${finalAnswer}가 계산됩니다.`;
    }

    return this.finalizeQuestion({
      id: this.buildId('REC', context.seed),
      language: lang,
      topic: 'RECURSIVE',
      type: qType,
      difficulty,
      code,
      answer: finalAnswer,
      explanation,
      components: {
        language: lang,
        topic: 'RECURSIVE',
        questionType: qType,

        controlStructure: 'RECURSION',
        primaryOperation: recType === 'FACTORIAL' ? 'ACCUMULATE_PROD' : 'RECURSIVE_STEP',
        dataStructure: 'SCALAR',
        flowControl: 'EARLY_RETURN',
        difficulty,
      },
      generationParams: {
        recType,
      },
    });
  }
}
