import { CodeLanguage, Difficulty } from '../../../types/question';
import { ProgrammingQuestionType, ProgrammingTopic } from '../taxonomy';
import { GeneratedProgrammingQuestion, GenerationContext } from '../types';
import { BaseGenerator } from './BaseGenerator';

export class StructClassGenerator extends BaseGenerator {
  readonly id = 'StructClassGenerator';
  readonly name = '구조체 및 클래스/상속 생성기';
  readonly supportedLanguages: CodeLanguage[] = ['JAVA', 'C', 'PYTHON'];
  readonly supportedTopics: ProgrammingTopic[] = ['STRUCT_CLASS', 'INHERITANCE_POLY'];
  readonly supportedTypes: ProgrammingQuestionType[] = ['CODE_OUTPUT'];
  readonly supportedDifficulties: Difficulty[] = ['EASY', 'MEDIUM', 'HARD'];

  generate(context: GenerationContext): GeneratedProgrammingQuestion {
    const rng = this.createRng(context.seed);
    const lang = context.targetLanguage || (rng() > 0.4 ? 'JAVA' : 'PYTHON');
    const difficulty = context.targetDifficulty || this.pickOne(this.supportedDifficulties, rng);

    // 모드: STATIC_SHARE (Java static 변수 공유), POLYMORPHISM (상속과 오버라이딩), PYTHON_CLASS
    let mode = 'STATIC_SHARE';
    if (lang === 'JAVA') {
      if (context.targetTopic === 'INHERITANCE_POLY') {
        mode = 'POLYMORPHISM';
      } else if (context.targetTopic === 'STRUCT_CLASS') {
        mode = 'STATIC_SHARE';
      } else {
        mode = difficulty === 'HARD' ? 'POLYMORPHISM' : 'STATIC_SHARE';
      }
    } else if (lang === 'PYTHON') {
      mode = 'PYTHON_CLASS';
    } else {
      mode = 'C_STRUCT';
    }

    let code = '';
    let finalAnswer = '';
    let explanation = '';

    if (mode === 'STATIC_SHARE') {
      const times = this.pickInt(2, 5, rng);
      finalAnswer = String(times);

      code = `class Counter {
    static int count = 0;
    Counter() {
        count++;
    }
}

public class Main {
    public static void main(String[] args) {
${Array.from({ length: times }, () => '        new Counter();').join('\n')}
        System.out.print(Counter.count);
    }
}`;
      explanation = `static 변수는 클래스의 모든 인스턴스가 공유하는 클래스 변수입니다. Counter 객체가 ${times}회 생성되며 생성자가 호출되므로 Counter.count는 ${finalAnswer}입니다.`;
    } else if (mode === 'POLYMORPHISM') {
      const parentVal = this.pickInt(10, 20, rng);
      const childVal = this.pickInt(30, 50, rng);
      finalAnswer = `${parentVal},${childVal}`;

      code = `class SuperClass {
    int x = ${parentVal};
    void print() {
        System.out.print(x);
    }
}

class SubClass extends SuperClass {
    int x = ${childVal};
    void print() {
        System.out.print(x);
    }
}

public class Main {
    public static void main(String[] args) {
        SuperClass obj = new SubClass();
        System.out.print(obj.x + ",");
        obj.print();
    }
}`;
      explanation = `필드(멤버 변수)는 참조 변수의 선언 타입(SuperClass)을 따르므로 obj.x는 ${parentVal}이고, 오버라이딩된 메서드는 실제 생성된 인스턴스(SubClass)의 것이 동적 바인딩되어 호출되므로 ${childVal}가 출력됩니다. 결과는 "${finalAnswer}"입니다.`;
    } else if (mode === 'PYTHON_CLASS') {
      const initVal = this.pickInt(5, 10, rng);
      const addVal = this.pickInt(3, 7, rng);
      const expected = initVal + addVal;
      finalAnswer = String(expected);

      code = `class Calc:
    def __init__(self, val):
        self.val = val

    def add(self, n):
        self.val += n
        return self.val

c = Calc(${initVal})
print(c.add(${addVal}))`;
      explanation = `Calc 클래스의 __init__에서 val이 ${initVal}로 초기화된 후, add(${addVal}) 메서드를 통해 self.val에 ${addVal}을 더하므로 반환값은 ${finalAnswer}입니다.`;
    } else {
      // C_STRUCT
      const idVal = this.pickInt(101, 105, rng);
      const scoreVal = this.pickInt(80, 95, rng);
      finalAnswer = `${idVal}:${scoreVal}`;

      code = `#include <stdio.h>

struct Student {
    int id;
    int score;
};

int main() {
    struct Student s = {${idVal}, ${scoreVal}};
    printf("%d:%d", s.id, s.score);
    return 0;
}`;
      explanation = `Student 구조체 변수 s의 필드 id(${idVal})와 score(${scoreVal})가 순서대로 출력되므로 결과는 "${finalAnswer}"입니다.`;
    }

    return this.finalizeQuestion({
      id: this.buildId('OOP', context.seed),
      language: lang,
      topic: mode === 'POLYMORPHISM' ? 'INHERITANCE_POLY' : 'STRUCT_CLASS',
      type: 'CODE_OUTPUT',
      difficulty,
      code,
      answer: finalAnswer,
      explanation,
      components: {
        language: lang,
        topic: mode === 'POLYMORPHISM' ? 'INHERITANCE_POLY' : 'STRUCT_CLASS',
        questionType: 'CODE_OUTPUT',
        controlStructure: 'CLASS_STATIC',
        primaryOperation: 'ACCUMULATE_SUM',
        dataStructure: 'OBJECT',
        flowControl: 'NONE',
        difficulty,
      },
      generationParams: {
        mode,
      },
    });
  }
}
