import { CodeLanguage, Difficulty } from '../../../types/question';
import { ProgrammingQuestionType, ProgrammingTopic } from '../taxonomy';
import { GeneratedProgrammingQuestion, GenerationContext } from '../types';
import { BaseGenerator } from './BaseGenerator';

export class ArrayTraceGenerator extends BaseGenerator {
  readonly id = 'ArrayTraceGenerator';
  readonly name = '배열 연산 추적 생성기';
  readonly supportedLanguages: CodeLanguage[] = ['C', 'JAVA', 'PYTHON'];
  readonly supportedTopics: ProgrammingTopic[] = ['ARRAY'];
  readonly supportedTypes: ProgrammingQuestionType[] = ['CODE_OUTPUT', 'RETURN_VALUE'];
  readonly supportedDifficulties: Difficulty[] = ['EASY', 'MEDIUM', 'HARD'];

  generate(context: GenerationContext): GeneratedProgrammingQuestion {
    const rng = this.createRng(context.seed);
    const lang = context.targetLanguage || this.pickOne(this.supportedLanguages, rng);
    const difficulty = context.targetDifficulty || this.pickOne(this.supportedDifficulties, rng);
    const qType: ProgrammingQuestionType =
      context.targetType && this.supportedTypes.includes(context.targetType)
        ? context.targetType
        : 'CODE_OUTPUT';

    // 모드: REVERSE_SWAP (배열 뒤집기/인덱스 교환), FILTER_SUM (조건부 합산), 2D_DIAGONAL (2차원 대각선/지정합)
    const mode = difficulty === 'HARD'
      ? '2D_DIAGONAL'
      : this.pickOne(['REVERSE_SWAP', 'FILTER_SUM'], rng);

    let code = '';
    let finalAnswer = '';
    let explanation = '';

    if (mode === 'REVERSE_SWAP') {
      const arr = [
        this.pickInt(10, 20, rng),
        this.pickInt(21, 30, rng),
        this.pickInt(31, 40, rng),
        this.pickInt(41, 50, rng),
        this.pickInt(51, 60, rng),
      ];
      // 앞뒤 swap 1회 수행: arr[0] <-> arr[4], arr[1] <-> arr[3]
      const temp0 = arr[0];
      arr[0] = arr[4];
      arr[4] = temp0;

      const targetIdx = this.pickInt(0, 4, rng);
      finalAnswer = String(arr[targetIdx]);

      if (lang === 'C') {
        code = `#include <stdio.h>

int main() {
    int arr[5] = {${arr[4]}, ${arr[1]}, ${arr[2]}, ${arr[3]}, ${arr[0]}};
    int temp = arr[0];
    arr[0] = arr[4];
    arr[4] = temp;
    printf("%d", arr[${targetIdx}]);
    return 0;
}`;
      } else if (lang === 'JAVA') {
        code = `public class Main {
    public static void main(String[] args) {
        int[] arr = {${arr[4]}, ${arr[1]}, ${arr[2]}, ${arr[3]}, ${arr[0]}};
        int temp = arr[0];
        arr[0] = arr[4];
        arr[4] = temp;
        System.out.print(arr[${targetIdx}]);
    }
}`;
      } else {
        code = `arr = [${arr[4]}, ${arr[1]}, ${arr[2]}, ${arr[3]}, ${arr[0]}]
arr[0], arr[4] = arr[4], arr[0]
print(arr[${targetIdx}])`;
      }

      explanation = `인덱스 0과 4의 요소가 교환(swap)된 후, arr[${targetIdx}]의 값은 ${finalAnswer}입니다.`;
    } else if (mode === 'FILTER_SUM') {
      const nums = [
        this.pickInt(3, 15, rng),
        this.pickInt(4, 18, rng),
        this.pickInt(5, 20, rng),
        this.pickInt(6, 22, rng),
        this.pickInt(7, 25, rng),
      ];
      const threshold = this.pickInt(10, 15, rng);
      const filteredSum = nums.filter((n) => n > threshold).reduce((a, b) => a + b, 0);
      finalAnswer = String(filteredSum);

      if (lang === 'C') {
        code = `#include <stdio.h>

int main() {
    int a[5] = {${nums.join(', ')}};
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        if (a[i] > ${threshold}) {
            sum += a[i];
        }
    }
    printf("%d", sum);
    return 0;
}`;
      } else if (lang === 'JAVA') {
        code = `public class Main {
    public static void main(String[] args) {
        int[] a = {${nums.join(', ')}};
        int sum = 0;
        for (int v : a) {
            if (v > ${threshold}) {
                sum += v;
            }
        }
        System.out.print(sum);
    }
}`;
      } else {
        code = `a = [${nums.join(', ')}]
sum_val = sum(x for x in a if x > ${threshold})
print(sum_val)`;
      }

      explanation = `배열 원소 중 ${threshold}보다 큰 값들만 누적 합산합니다. 결과는 ${finalAnswer}입니다.`;
    } else {
      // 2D_DIAGONAL
      const grid = [
        [this.pickInt(1, 4, rng), this.pickInt(2, 5, rng)],
        [this.pickInt(3, 6, rng), this.pickInt(4, 7, rng)],
      ];
      const diagSum = grid[0][0] + grid[1][1];
      finalAnswer = String(diagSum);

      if (lang === 'C') {
        code = `#include <stdio.h>

int main() {
    int m[2][2] = {
        {${grid[0][0]}, ${grid[0][1]}},
        {${grid[1][0]}, ${grid[1][1]}}
    };
    int sum = 0;
    for (int i = 0; i < 2; i++) {
        sum += m[i][i];
    }
    printf("%d", sum);
    return 0;
}`;
      } else if (lang === 'JAVA') {
        code = `public class Main {
    public static void main(String[] args) {
        int[][] m = {
            {${grid[0][0]}, ${grid[0][1]}},
            {${grid[1][0]}, ${grid[1][1]}}
        };
        int sum = 0;
        for (int i = 0; i < 2; i++) {
            sum += m[i][i];
        }
        System.out.print(sum);
    }
}`;
      } else {
        code = `m = [
    [${grid[0][0]}, ${grid[0][1]}],
    [${grid[1][0]}, ${grid[1][1]}]
]
print(m[0][0] + m[1][1])`;
      }

      explanation = `2차원 배열의 주대각선 원소 m[0][0](${grid[0][0]})과 m[1][1](${grid[1][1]})의 합은 ${diagSum}입니다.`;
    }

    return this.finalizeQuestion({
      id: this.buildId('ARR', context.seed),
      language: lang,
      topic: 'ARRAY',
      type: qType,
      difficulty,
      code,
      answer: finalAnswer,
      explanation,
      components: {
        language: lang,
        topic: 'ARRAY',
        questionType: qType,
        controlStructure: mode === '2D_DIAGONAL' ? 'NESTED_FOR' : 'FOR',
        primaryOperation:
          mode === 'REVERSE_SWAP'
            ? 'SWAP'
            : mode === 'FILTER_SUM'
            ? 'CONDITIONAL_ACCUM'
            : 'ACCUMULATE_SUM',
        dataStructure: mode === '2D_DIAGONAL' ? 'ARRAY_2D' : 'ARRAY_1D',
        flowControl: 'NONE',
        difficulty,
      },
      generationParams: {
        mode,
      },
    });
  }
}
