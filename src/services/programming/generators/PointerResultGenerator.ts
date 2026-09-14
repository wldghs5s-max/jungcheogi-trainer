import { CodeLanguage, Difficulty } from '../../../types/question';
import { ProgrammingQuestionType, ProgrammingTopic } from '../taxonomy';
import { GeneratedProgrammingQuestion, GenerationContext } from '../types';
import { BaseGenerator } from './BaseGenerator';

export class PointerResultGenerator extends BaseGenerator {
  readonly id = 'PointerResultGenerator';
  readonly name = 'C 언어 포인터 연산 생성기';
  readonly supportedLanguages: CodeLanguage[] = ['C'];
  readonly supportedTopics: ProgrammingTopic[] = ['POINTER_REFERENCE'];
  readonly supportedTypes: ProgrammingQuestionType[] = ['CODE_OUTPUT', 'BLANK_COMPLETION'];
  readonly supportedDifficulties: Difficulty[] = ['EASY', 'MEDIUM', 'HARD'];

  generate(context: GenerationContext): GeneratedProgrammingQuestion {
    const rng = this.createRng(context.seed);
    const difficulty = context.targetDifficulty || this.pickOne(this.supportedDifficulties, rng);
    const qType = context.targetType || (rng() > 0.3 ? 'CODE_OUTPUT' : 'BLANK_COMPLETION');

    // 모드: OFFSET (배열 오프셋 참조), STRUCT_PTR (구조체 포인터), PTR_INC (포인터 증감)
    const mode = difficulty === 'HARD'
      ? 'STRUCT_PTR'
      : this.pickOne(['OFFSET', 'PTR_INC'], rng);

    let code = '';
    let finalAnswer = '';
    let explanation = '';

    if (mode === 'OFFSET') {
      const base = this.pickInt(10, 30, rng);
      const step = this.pickInt(5, 15, rng);
      const arr = [base, base + step, base + step * 2, base + step * 3];
      const offset1 = this.pickInt(1, 3, rng);
      const val1 = arr[offset1];
      const val0 = arr[0];
      const expected = val1 + val0;
      finalAnswer = String(expected);

      if (qType === 'BLANK_COMPLETION') {
        finalAnswer = `*(p + ${offset1})`;
        code = `#include <stdio.h>

int main() {
    int a[4] = {${arr.join(', ')}};
    int *p = a;
    // a[${offset1}]의 값을 포인터 p를 이용해 역참조하여 *p와 더함
    printf("%d", [ 빈칸 ] + *p);
    return 0;
}`;
        explanation = `배열의 ${offset1}번째 원소 a[${offset1}](${val1})을 포인터 역참조로 표현하면 *(p + ${offset1})입니다.`;
      } else {
        code = `#include <stdio.h>

int main() {
    int a[4] = {${arr.join(', ')}};
    int *p = a;
    printf("%d", *(p + ${offset1}) + *p);
    return 0;
}`;
        explanation = `*(p + ${offset1})은 a[${offset1}]인 ${val1}이고, *p는 a[0]인 ${val0}입니다. 합산 결과는 ${finalAnswer}입니다.`;
      }
    } else if (mode === 'STRUCT_PTR') {
      const valA = this.pickInt(10, 25, rng);
      const valB = this.pickInt(15, 30, rng);
      const sum = valA + valB;

      if (qType === 'BLANK_COMPLETION') {
        finalAnswer = 'p->data';
        code = `#include <stdio.h>

struct Node {
    int data;
    struct Node *next;
};

int main() {
    struct Node b = {${valB}, NULL};
    struct Node a = {${valA}, &b};
    struct Node *p = &a;
    // a의 data(${valA})와 b의 data(${valB})를 포인터 p를 이용해 합산 출력
    printf("%d", [ 빈칸 ] + p->next->data);
    return 0;
}`;
        explanation = `p는 a를 가리키므로 구조체 a의 data 필드는 [ 빈칸 ] 자리에 p->data 형태로 접근해야 합니다. 정답은 "p->data"입니다.`;
      } else {
        finalAnswer = String(sum);
        code = `#include <stdio.h>

struct Node {
    int data;
    struct Node *next;
};

int main() {
    struct Node b = {${valB}, NULL};
    struct Node a = {${valA}, &b};
    struct Node *p = &a;
    printf("%d", p->data + p->next->data);
    return 0;
}`;
        explanation = `p는 a의 주소를 가리키므로 p->data는 ${valA}이고, p->next는 b를 가리키므로 p->next->data는 ${valB}입니다. 합은 ${finalAnswer}입니다.`;
      }
    } else {
      // PTR_INC: *p++
      const arr = [this.pickInt(2, 6, rng), this.pickInt(7, 12, rng), this.pickInt(13, 20, rng)];

      if (qType === 'BLANK_COMPLETION') {
        finalAnswer = '*p++';
        code = `#include <stdio.h>

int main() {
    int a[3] = {${arr.join(', ')}};
    int *p = a;
    // 현재 가리키는 값을 대입한 후 포인터를 1 증가시키는 연산식
    int first = [ 빈칸 ];
    int second = *p;
    printf("%d,%d", first, second);
    return 0;
}`;
        explanation = `현재 p가 가리키는 원소(a[0])를 반환한 후 포인터 주소를 1 증가시키는 후위 증감 포인터 연산식은 *p++입니다. 정답은 "*p++"입니다.`;
      } else {
        finalAnswer = `${arr[0]},${arr[1]}`;
        code = `#include <stdio.h>

int main() {
    int a[3] = {${arr.join(', ')}};
    int *p = a;
    int first = *p++;
    int second = *p;
    printf("%d,%d", first, second);
    return 0;
}`;
        explanation = `*p++는 먼저 현재 p가 가리키는 값(a[0]=${arr[0]})을 반환한 뒤 포인터 주소를 1 증가시킵니다. 이후 *p는 a[1]=${arr[1]}을 가리키므로 출력은 "${finalAnswer}"입니다.`;
      }
    }


    return this.finalizeQuestion({
      id: this.buildId('PTR', context.seed),
      language: 'C',
      topic: 'POINTER_REFERENCE',
      type: qType,
      difficulty,
      code,
      answer: finalAnswer,
      explanation,
      components: {
        language: 'C',
        topic: 'POINTER_REFERENCE',
        questionType: qType,
        controlStructure: mode === 'STRUCT_PTR' ? 'STRUCT_PTR' : 'SEQUENTIAL',
        primaryOperation: 'POINTER_ARITHMETIC',
        dataStructure: mode === 'STRUCT_PTR' ? 'STRUCT' : 'POINTER',
        flowControl: 'NONE',
        difficulty,
      },
      generationParams: {
        mode,
      },
    });
  }
}
