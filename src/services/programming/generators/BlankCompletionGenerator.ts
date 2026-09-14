import { CodeLanguage, Difficulty } from '../../../types/question';
import { ProgrammingQuestionType, ProgrammingTopic } from '../taxonomy';
import { GeneratedProgrammingQuestion, GenerationContext } from '../types';
import { BaseGenerator } from './BaseGenerator';

export class BlankCompletionGenerator extends BaseGenerator {
  readonly id = 'BlankCompletionGenerator';
  readonly name = '코드 빈칸 완성 생성기';
  readonly supportedLanguages: CodeLanguage[] = ['C', 'JAVA', 'PYTHON'];
  readonly supportedTopics: ProgrammingTopic[] = [
    'LOOP',
    'POINTER_REFERENCE',
    'OPERATOR_DATATYPE',
  ];
  readonly supportedTypes: ProgrammingQuestionType[] = ['BLANK_COMPLETION'];
  readonly supportedDifficulties: Difficulty[] = ['EASY', 'MEDIUM', 'HARD'];

  generate(context: GenerationContext): GeneratedProgrammingQuestion {
    const rng = this.createRng(context.seed);
    const lang = context.targetLanguage || this.pickOne(this.supportedLanguages, rng);
    const difficulty = context.targetDifficulty || this.pickOne(this.supportedDifficulties, rng);

    // 언어별 유효 모드 선정: PTR_ASSIGN은 포인터가 존재하는 C 언어 전용
    let availableModes: ('SWAP' | 'PTR_ASSIGN' | 'LOOP_COND')[] = lang === 'C'
      ? ['SWAP', 'PTR_ASSIGN', 'LOOP_COND']
      : ['SWAP', 'LOOP_COND'];

    if (context.targetTopic === 'LOOP') {
      availableModes = ['LOOP_COND'];
    } else if (context.targetTopic === 'OPERATOR_DATATYPE') {
      availableModes = ['SWAP'];
    } else if (context.targetTopic === 'POINTER_REFERENCE' && lang === 'C') {
      availableModes = ['PTR_ASSIGN'];
    }

    const mode = this.pickOne(availableModes, rng);

    let code = '';
    let answer: string | string[] = '';
    let explanation = '';
    let topic: ProgrammingTopic = 'OPERATOR_DATATYPE';

    if (mode === 'SWAP') {
      topic = 'OPERATOR_DATATYPE';
      answer = ['temp', 'TEMP'];

      if (lang === 'C') {
        code = `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = [  빈칸  ];
}

int main() {
    int x = 10, y = 20;
    swap(&x, &y);
    printf("%d,%d", x, y);
    return 0;
}`;
      } else if (lang === 'JAVA') {
        code = `public class Main {
    public static void main(String[] args) {
        int a = 10, b = 20;
        int temp = a;
        a = b;
        b = [  빈칸  ];
        System.out.print(a + "," + b);
    }
}`;
      } else {
        code = `a = 10
b = 20
temp = a
a = b
b = [  빈칸  ]
print(f"{a},{b}")`;
      }

      explanation = `임시 변수 temp를 활용한 고전적인 두 변수 값 교환 알고리즘입니다. a에 b의 값을 대입한 후, b에는 처음에 보관해 두었던 temp의 값을 대입해야 합니다. 빈칸에 들어갈 정답은 "temp"입니다.`;
    } else if (mode === 'PTR_ASSIGN') {
      topic = 'POINTER_REFERENCE';
      answer = ['arr', '&arr[0]', 'arr + 0'];

      code = `#include <stdio.h>

int main() {
    int arr[3] = {10, 20, 30};
    // 포인터 p가 배열 arr의 시작 주소를 가리키도록 설정
    int *p = [  빈칸  ];
    printf("%d", *(p + 1));
    return 0;
}`;
      explanation = `배열의 이름은 그 자체로 첫 번째 원소의 시작 주소를 나타내므로, int *p = arr; 또는 int *p = &arr[0]; 형태로 할당할 수 있습니다. 정답은 "arr" 또는 "&arr[0]"입니다.`;
    } else {
      // LOOP_COND
      topic = 'LOOP';
      const n = this.pickInt(5, 10, rng);
      answer = [`i <= ${n}`, `i < ${n + 1}`, `${n} >= i`];

      if (lang === 'C') {
        code = `#include <stdio.h>

int main() {
    int sum = 0;
    // 1부터 ${n}까지 모두 누적하기 위한 반복 조건식
    for (int i = 1; [  빈칸  ]; i++) {
        sum += i;
    }
    printf("%d", sum);
    return 0;
}`;
      } else if (lang === 'JAVA') {
        code = `public class Main {
    public static void main(String[] args) {
        int sum = 0;
        // 1부터 ${n}까지 모두 누적하기 위한 반복 조건식
        for (int i = 1; [  빈칸  ]; i++) {
            sum += i;
        }
        System.out.print(sum);
    }
}`;
      } else {
        code = `sum_val = 0
i = 1
# 1부터 ${n}까지 모두 누적하기 위한 반복 조건식
while [  빈칸  ]:
    sum_val += i
    i += 1
print(sum_val)`;
      }

      explanation = `1부터 ${n}까지 누적 합을 구하려면 루프의 종료 조건식이 i <= ${n} (또는 i < ${n + 1})이어야 합니다.`;
    }


    return this.finalizeQuestion({
      id: this.buildId('BLANK', context.seed),
      language: lang,
      topic,
      type: 'BLANK_COMPLETION',
      difficulty,
      code,
      answer,
      explanation,
      components: {
        language: lang,
        topic,
        questionType: 'BLANK_COMPLETION',
        controlStructure: mode === 'LOOP_COND' ? 'FOR' : 'SEQUENTIAL',
        primaryOperation: mode === 'SWAP' ? 'SWAP' : 'ACCUMULATE_SUM',
        dataStructure: mode === 'PTR_ASSIGN' ? 'POINTER' : 'SCALAR',
        flowControl: 'NONE',
        difficulty,
      },
      generationParams: {
        mode,
      },
    });
  }
}
