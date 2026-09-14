import { CodeLanguage, Difficulty } from '../../../types/question';
import { ProgrammingQuestionType, ProgrammingTopic } from '../taxonomy';
import { GeneratedProgrammingQuestion, GenerationContext } from '../types';
import { BaseGenerator } from './BaseGenerator';

export class BugFindingGenerator extends BaseGenerator {
  readonly id = 'BugFindingGenerator';
  readonly name = '오류(버그) 찾기 생성기';
  readonly supportedLanguages: CodeLanguage[] = ['C', 'JAVA', 'PYTHON'];
  readonly supportedTopics: ProgrammingTopic[] = [
    'CONTROL_FLOW_ERROR',
    'ARRAY',
    'CONDITIONAL',
  ];
  readonly supportedTypes: ProgrammingQuestionType[] = ['BUG_FINDING'];
  readonly supportedDifficulties: Difficulty[] = ['EASY', 'MEDIUM', 'HARD'];

  generate(context: GenerationContext): GeneratedProgrammingQuestion {
    const rng = this.createRng(context.seed);
    const lang = context.targetLanguage || this.pickOne(this.supportedLanguages, rng);
    const difficulty = context.targetDifficulty || this.pickOne(this.supportedDifficulties, rng);

    // 버그 유형: Python은 SWITCH_FALLTHROUGH가 없으므로 OFF_BY_ONE 전용 처리
    let availableBugTypes: ('OFF_BY_ONE' | 'SWITCH_FALLTHROUGH')[] = lang === 'PYTHON'
      ? ['OFF_BY_ONE']
      : ['OFF_BY_ONE', 'SWITCH_FALLTHROUGH'];

    if (context.targetTopic === 'ARRAY') {
      availableBugTypes = ['OFF_BY_ONE'];
    } else if (context.targetTopic === 'CONDITIONAL' && lang !== 'PYTHON') {
      availableBugTypes = ['SWITCH_FALLTHROUGH'];
    }

    const bugType = this.pickOne(availableBugTypes, rng);

    let code = '';
    let answer: string | string[] = '';
    let explanation = '';
    let topic: ProgrammingTopic = (context.targetTopic && this.supportedTopics.includes(context.targetTopic))
      ? context.targetTopic
      : 'CONTROL_FLOW_ERROR';

    if (bugType === 'OFF_BY_ONE') {
      if (!context.targetTopic || !this.supportedTopics.includes(context.targetTopic)) {
        topic = 'ARRAY';
      }

      if (lang === 'JAVA') {
        answer = ['i <= 5', 'i < 5', '배열 인덱스 초과', '인덱스 초과', 'ArrayIndexOutOfBoundsException'];
        code = `public class Main {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50}; // 크기 5 (인덱스 0~4)
        int sum = 0;
        // 다음 반복문에서 런타임 예외가 발생하는 원인 조건을 쓰시오.
        for (int i = 0; i <= 5; i++) {
            sum += arr[i];
        }
        System.out.print(sum);
    }
}`;
        explanation = `배열의 크기가 5일 때 유효한 인덱스는 0부터 4까지입니다. 조건식이 i <= 5이면 i=5일 때 배열 범위를 벗어나 런타임 예외(ArrayIndexOutOfBoundsException)가 발생하므로 오류 원인은 "i <= 5"입니다 (i < 5로 수정 필요).`;
      } else if (lang === 'PYTHON') {
        answer = ['range(len(arr) + 1)', 'len(arr) + 1', 'IndexError', '인덱스 초과'];
        code = `arr = [10, 20, 30, 40, 50]  # 크기 5 (인덱스 0~4)
total = 0
# 다음 반복문에서 IndexError 예외가 발생하는 원인 조건을 쓰시오.
for i in range(len(arr) + 1):
    total += arr[i]
print(total)`;
        explanation = `리스트의 크기가 5일 때 유효한 인덱스는 0부터 4까지입니다. range(len(arr) + 1)은 0부터 5까지 반복하므로 arr[5] 접근 시 IndexError가 발생합니다. 오류 원인은 "range(len(arr) + 1)"입니다.`;
      } else {
        // C 언어
        answer = ['i <= 5', 'i < 5', '배열 인덱스 초과', '인덱스 초과'];
        code = `#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int sum = 0;
    // 배열 경계를 벗어나는 잘못된 루프 종료 조건식을 쓰시오.
    for (int i = 0; i <= 5; i++) {
        sum += arr[i];
    }
    printf("%d", sum);
    return 0;
}`;
        explanation = `배열의 크기가 5일 때 유효한 인덱스는 0부터 4까지입니다. C 언어는 배열 경계 검사(Boundary Check)를 하지 않으므로, i=5일 때 유효 범위를 벗어난 메모리에 접근하여 정의되지 않은 동작(Undefined Behavior) 또는 잘못된 메모리 참조 오류가 발생합니다. 오류 원인은 "i <= 5"입니다 (i < 5로 수정 필요).`;
      }
    } else {
      // SWITCH_FALLTHROUGH
      topic = 'CONDITIONAL';
      answer = ['break', 'break 누락', 'break문 누락', 'break;'];

      if (lang === 'JAVA') {
        code = `public class Main {
    public static void main(String[] args) {
        int grade = 1;
        int point = 0;
        switch (grade) {
            case 1:
                point += 10;
                // 의도: grade 1일 때 10점만 부여해야 하나, 누락된 키워드로 인해 아래 case 2까지 실행됨
            case 2:
                point += 5;
                break;
        }
        System.out.print(point);
    }
}`;
      } else {
        code = `#include <stdio.h>

int main() {
    int grade = 1;
    int point = 0;
    switch (grade) {
        case 1:
            point += 10;
            // 누락된 키워드로 인해 다음 case까지 실행(Fall-through)되는 원인
        case 2:
            point += 5;
            break;
    }
    printf("%d", point);
    return 0;
}`;
      }

      explanation = `switch-case 문에서 각 case 블록 끝에 break 문을 작성하지 않으면 다음 case 블록까지 연속 실행되는 Fall-through 현상이 발생합니다. 누락된 키워드는 "break"입니다.`;
    }


    return this.finalizeQuestion({
      id: this.buildId('BUG', context.seed),
      language: lang,
      topic,
      type: 'BUG_FINDING',
      difficulty,
      code,
      answer,
      explanation,
      components: {
        language: lang,
        topic,
        questionType: 'BUG_FINDING',
        controlStructure: bugType === 'OFF_BY_ONE' ? 'FOR' : 'SWITCH_CASE',
        primaryOperation: 'ACCUMULATE_SUM',
        dataStructure: bugType === 'OFF_BY_ONE' ? 'ARRAY_1D' : 'SCALAR',
        flowControl: 'NONE',
        difficulty,
      },
      generationParams: {
        bugType,
      },
    });
  }
}
