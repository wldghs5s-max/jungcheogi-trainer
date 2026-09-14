import { CodeLanguage, Difficulty } from '../../../types/question';
import { ProgrammingQuestionType, ProgrammingTopic } from '../taxonomy';
import { GeneratedProgrammingQuestion, GenerationContext } from '../types';
import { BaseGenerator } from './BaseGenerator';

export class NestedLoopGenerator extends BaseGenerator {
  readonly id = 'NestedLoopGenerator';
  readonly name = '중첩 반복문 생성기';
  readonly supportedLanguages: CodeLanguage[] = ['C', 'JAVA', 'PYTHON'];
  readonly supportedTopics: ProgrammingTopic[] = ['NESTED_LOOP', 'LOOP'];
  readonly supportedTypes: ProgrammingQuestionType[] = [
    'CODE_OUTPUT',
    'ITERATION_COUNT',
  ];
  readonly supportedDifficulties: Difficulty[] = ['EASY', 'MEDIUM', 'HARD'];

  generate(context: GenerationContext): GeneratedProgrammingQuestion {
    const rng = this.createRng(context.seed);
    const lang = context.targetLanguage || this.pickOne(this.supportedLanguages, rng);
    const difficulty = context.targetDifficulty || this.pickOne(this.supportedDifficulties, rng);
    const qType = context.targetType || 'CODE_OUTPUT';

    // 패턴 형태: RECT (직사각형), TRIANGLE (삼각형 j <= i), PRODUCT (i * j 누적)
    const pattern = this.pickOne(['RECT', 'TRIANGLE', 'PRODUCT'], rng);
    const outerBound = difficulty === 'HARD' ? this.pickInt(3, 5, rng) : this.pickInt(2, 4, rng);
    const innerBound = this.pickInt(2, 4, rng);
    const hasBreak = difficulty === 'HARD' || (difficulty === 'MEDIUM' && rng() > 0.5);

    let count = 0;
    let sum = 0;

    for (let i = 1; i <= outerBound; i++) {
      const limit = pattern === 'TRIANGLE' ? i : innerBound;
      for (let j = 1; j <= limit; j++) {
        if (hasBreak && j === 2 && pattern === 'RECT') {
          break;
        }
        count++;
        if (pattern === 'PRODUCT') {
          sum += i * j;
        } else {
          sum += j;
        }
      }
    }

    const finalAnswer = qType === 'ITERATION_COUNT' ? String(count) : String(sum);

    let code = '';
    if (lang === 'C') {
      code = this.renderCCode(pattern, outerBound, innerBound, hasBreak, qType);
    } else if (lang === 'JAVA') {
      code = this.renderJavaCode(pattern, outerBound, innerBound, hasBreak, qType);
    } else {
      code = this.renderPythonCode(pattern, outerBound, innerBound, hasBreak, qType);
    }

    const explanation = `바깥 루프(i)와 안쪽 루프(j)의 중첩 순회 결과, ${
      qType === 'ITERATION_COUNT'
        ? `총 반복 횟수는 ${count}회입니다.`
        : `누적된 계산 결과는 ${sum}입니다.`
    } 정답은 ${finalAnswer}입니다.`;

    const topic: ProgrammingTopic =
      context.targetTopic && this.supportedTopics.includes(context.targetTopic)
        ? context.targetTopic
        : 'NESTED_LOOP';

    return this.finalizeQuestion({
      id: this.buildId('NEST', context.seed),
      language: lang,
      topic,
      type: qType,
      difficulty,
      code,
      answer: finalAnswer,
      explanation,
      components: {
        language: lang,
        topic,
        questionType: qType,

        controlStructure: 'NESTED_FOR',
        primaryOperation: pattern === 'PRODUCT' ? 'ACCUMULATE_PROD' : 'ACCUMULATE_SUM',
        dataStructure: 'SCALAR',
        flowControl: hasBreak ? 'BREAK' : 'NONE',
        difficulty,
      },
      generationParams: {
        pattern,
        outerBound,
        innerBound,
        hasBreak,
      },
    });
  }

  private renderCCode(
    pattern: string,
    outer: number,
    inner: number,
    hasBreak: boolean,
    qType: string,
  ): string {
    const innerLimit = pattern === 'TRIANGLE' ? 'i' : `${inner}`;
    const op = pattern === 'PRODUCT' ? 'sum += i * j;' : 'sum += j;';
    const breakStmt = hasBreak && pattern === 'RECT' ? '            if (j == 2) break;\n' : '';

    return `#include <stdio.h>

int main() {
    int sum = 0, count = 0;
    for (int i = 1; i <= ${outer}; i++) {
        for (int j = 1; j <= ${innerLimit}; j++) {
${breakStmt}            count++;
            ${op}
        }
    }
    printf("%d", ${qType === 'ITERATION_COUNT' ? 'count' : 'sum'});
    return 0;
}`;
  }

  private renderJavaCode(
    pattern: string,
    outer: number,
    inner: number,
    hasBreak: boolean,
    qType: string,
  ): string {
    const innerLimit = pattern === 'TRIANGLE' ? 'i' : `${inner}`;
    const op = pattern === 'PRODUCT' ? 'sum += i * j;' : 'sum += j;';
    const breakStmt = hasBreak && pattern === 'RECT' ? '                if (j == 2) break;\n' : '';

    return `public class Main {
    public static void main(String[] args) {
        int sum = 0, count = 0;
        for (int i = 1; i <= ${outer}; i++) {
            for (int j = 1; j <= ${innerLimit}; j++) {
${breakStmt}                count++;
                ${op}
            }
        }
        System.out.print(${qType === 'ITERATION_COUNT' ? 'count' : 'sum'});
    }
}`;
  }

  private renderPythonCode(
    pattern: string,
    outer: number,
    inner: number,
    hasBreak: boolean,
    qType: string,
  ): string {
    const op = pattern === 'PRODUCT' ? '        sum_val += i * j' : '        sum_val += j';
    const breakStmt = hasBreak && pattern === 'RECT' ? '        if j == 2: break\n' : '';

    return `sum_val = 0
count = 0
for i in range(1, ${outer + 1}):
    for j in range(1, ${pattern === 'TRIANGLE' ? 'i + 1' : `${inner + 1}`}):
${breakStmt}        count += 1
${op}
print(${qType === 'ITERATION_COUNT' ? 'count' : 'sum_val'})`;
  }
}
