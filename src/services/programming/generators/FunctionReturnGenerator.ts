import { CodeLanguage, Difficulty } from '../../../types/question';
import { ProgrammingQuestionType, ProgrammingTopic } from '../taxonomy';
import { GeneratedProgrammingQuestion, GenerationContext } from '../types';
import { BaseGenerator } from './BaseGenerator';

export class FunctionReturnGenerator extends BaseGenerator {
  readonly id = 'FunctionReturnGenerator';
  readonly name = '함수 매개변수 및 반환값 추적 생성기';
  readonly supportedLanguages: CodeLanguage[] = ['C', 'JAVA', 'PYTHON'];
  readonly supportedTopics: ProgrammingTopic[] = ['FUNCTION_PARAM'];
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

    // CALL_BY_REF (배열 참조 수정) vs CHAIN (함수 합성/연쇄 호출)
    const mode = difficulty === 'HARD' ? 'CALL_BY_REF' : 'CHAIN';

    let code = '';
    let finalAnswer = '';
    let explanation = '';

    if (mode === 'CALL_BY_REF') {
      const initVal = this.pickInt(5, 10, rng);
      const addVal = this.pickInt(3, 7, rng);
      const multVal = this.pickInt(2, 3, rng);
      const expected = (initVal + addVal) * multVal;
      finalAnswer = String(expected);

      if (lang === 'C') {
        code = `#include <stdio.h>

void modify(int arr[], int val) {
    arr[0] += val;
    arr[0] *= ${multVal};
}

int main() {
    int data[1] = {${initVal}};
    modify(data, ${addVal});
    printf("%d", data[0]);
    return 0;
}`;
      } else if (lang === 'JAVA') {
        code = `public class Main {
    static void modify(int[] arr, int val) {
        arr[0] += val;
        arr[0] *= ${multVal};
    }

    public static void main(String[] args) {
        int[] data = {${initVal}};
        modify(data, ${addVal});
        System.out.print(data[0]);
    }
}`;
      } else {
        code = `def modify(arr, val):
    arr[0] += val
    arr[0] *= ${multVal}

data = [${initVal}]
modify(data, ${addVal})
print(data[0])`;
      }

      explanation = `배열은 주소(참조)가 전달되므로 modify 함수 내에서 원본 배열의 첫 번째 원소가 (${initVal} + ${addVal}) * ${multVal} = ${expected}로 갱신됩니다. 정답은 ${finalAnswer}입니다.`;
    } else {
      // CHAIN: funcB(funcA(x))
      const input = this.pickInt(2, 5, rng);
      const stepA = this.pickInt(2, 4, rng);
      const stepB = this.pickInt(1, 5, rng);
      const resultA = input * stepA;
      const resultB = resultA + stepB;
      finalAnswer = String(resultB);

      if (lang === 'C') {
        code = `#include <stdio.h>

int funcA(int n) {
    return n * ${stepA};
}

int funcB(int n) {
    return n + ${stepB};
}

int main() {
    int res = funcB(funcA(${input}));
    printf("%d", res);
    return 0;
}`;
      } else if (lang === 'JAVA') {
        code = `public class Main {
    static int funcA(int n) {
        return n * ${stepA};
    }

    static int funcB(int n) {
        return n + ${stepB};
    }

    public static void main(String[] args) {
        int res = funcB(funcA(${input}));
        System.out.print(res);
    }
}`;
      } else {
        code = `def func_a(n):
    return n * ${stepA}

def func_b(n):
    return n + ${stepB}

res = func_b(func_a(${input}))
print(res)`;
      }

      explanation = `funcA(${input})는 ${resultA}를 반환하고, 이어 호출된 funcB(${resultA})는 ${resultB}를 반환합니다. 실행 결과는 ${finalAnswer}입니다.`;
    }

    return this.finalizeQuestion({
      id: this.buildId('FUNC', context.seed),
      language: lang,
      topic: 'FUNCTION_PARAM',
      type: qType,
      difficulty,
      code,
      answer: finalAnswer,
      explanation,
      components: {
        language: lang,
        topic: 'FUNCTION_PARAM',
        questionType: qType,

        controlStructure: 'SEQUENTIAL',
        primaryOperation: 'ACCUMULATE_SUM',
        dataStructure: mode === 'CALL_BY_REF' ? 'ARRAY_1D' : 'SCALAR',
        flowControl: 'EARLY_RETURN',
        difficulty,
      },
      generationParams: {
        mode,
      },
    });
  }
}
