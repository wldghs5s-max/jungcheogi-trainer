import { CodeLanguage, Difficulty } from '../../../types/question';
import { ProgrammingQuestionType, ProgrammingTopic } from '../taxonomy';
import { GeneratedProgrammingQuestion, GenerationContext } from '../types';
import { BaseGenerator } from './BaseGenerator';

export class LoopOutputGenerator extends BaseGenerator {
  readonly id = 'LoopOutputGenerator';
  readonly name = '반복문 결과 추적 생성기';
  readonly supportedLanguages: CodeLanguage[] = ['C', 'JAVA', 'PYTHON'];
  readonly supportedTopics: ProgrammingTopic[] = ['LOOP', 'CONTROL_FLOW_ERROR'];
  readonly supportedTypes: ProgrammingQuestionType[] = [
    'CODE_OUTPUT',
    'ITERATION_COUNT',
  ];
  readonly supportedDifficulties: Difficulty[] = ['EASY', 'MEDIUM', 'HARD'];

  generate(context: GenerationContext): GeneratedProgrammingQuestion {
    const rng = this.createRng(context.seed);
    const lang = context.targetLanguage || this.pickOne(this.supportedLanguages, rng);
    const difficulty = context.targetDifficulty || this.pickOne(this.supportedDifficulties, rng);
    const qType = context.targetType || (rng() > 0.3 ? 'CODE_OUTPUT' : 'ITERATION_COUNT');

    const topic: ProgrammingTopic =
      context.targetTopic && this.supportedTopics.includes(context.targetTopic)
        ? context.targetTopic
        : 'LOOP';

    // 변형 요소 조합
    const loopKind = lang === 'PYTHON'
      ? 'FOR'
      : this.pickOne(['FOR', 'WHILE', 'DO_WHILE'], rng);
    const flowControl = difficulty === 'EASY'
      ? 'NONE'
      : this.pickOne(['NONE', 'CONTINUE', 'BREAK'], rng);

    const startVal = this.pickInt(1, 3, rng);
    const endVal = difficulty === 'HARD'
      ? this.pickInt(8, 12, rng)
      : this.pickInt(5, 8, rng);
    const stepVal = difficulty === 'HARD' && rng() > 0.5 ? 2 : 1;

    // 연산 모드: SUM (합산), EVEN_SUM (짝수합), ALTERNATE (부호 교차)
    const opMode = this.pickOne(['SUM', 'EVEN_SUM', 'ALTERNATE'], rng);

    let calculatedAnswer = 0;
    let iterations = 0;
    let sign = 1;

    // 시뮬레이션
    let cur = startVal;
    while (true) {
      if (cur > endVal) break;
      iterations++;

      if (flowControl === 'CONTINUE' && cur % 3 === 0) {
        cur += stepVal;
        continue;
      }
      if (flowControl === 'BREAK' && calculatedAnswer >= 15) {
        break;
      }

      if (opMode === 'SUM') {
        calculatedAnswer += cur;
      } else if (opMode === 'EVEN_SUM') {
        if (cur % 2 === 0) calculatedAnswer += cur;
      } else if (opMode === 'ALTERNATE') {
        calculatedAnswer += cur * sign;
        sign = -sign;
      }

      cur += stepVal;
    }

    const finalAnswer = qType === 'ITERATION_COUNT'
      ? String(iterations)
      : String(calculatedAnswer);

    // 코드 템플릿 생성
    let code = '';
    if (lang === 'C') {
      code = this.renderCCode(loopKind, startVal, endVal, stepVal, opMode, flowControl, qType);
    } else if (lang === 'JAVA') {
      code = this.renderJavaCode(loopKind, startVal, endVal, stepVal, opMode, flowControl, qType);
    } else {
      code = this.renderPythonCode(startVal, endVal, stepVal, opMode, flowControl, qType);
    }

    let explanation = '';
    if (qType === 'ITERATION_COUNT') {
      explanation = `루프가 ${startVal}부터 ${endVal}까지 실행되며, 총 ${iterations}회 반복 수행됩니다. 정답은 ${finalAnswer}입니다.`;
    } else {
      explanation = `${startVal}부터 ${endVal}까지 ${opMode === 'EVEN_SUM' ? '짝수만' : opMode === 'ALTERNATE' ? '부호 교차(+, -) 규칙에 따라' : '규칙에 따라'} 연산한 결과, 최종 누적값은 ${calculatedAnswer}입니다. 정답은 ${finalAnswer}입니다.`;
    }

    return this.finalizeQuestion({
      id: this.buildId('LOOP', context.seed),
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
        controlStructure: loopKind as any,
        primaryOperation: opMode === 'EVEN_SUM' ? 'CONDITIONAL_ACCUM' : opMode === 'ALTERNATE' ? 'ALTERNATE_SIGN' : 'ACCUMULATE_SUM',
        dataStructure: 'SCALAR',
        flowControl: flowControl as any,
        difficulty,
      },
      generationParams: {
        loopKind,
        startVal,
        endVal,
        stepVal,
        opMode,
        flowControl,
      },
    });
  }

  private renderCCode(
    loopKind: string,
    start: number,
    end: number,
    step: number,
    opMode: string,
    flow: string,
    qType: string,
  ): string {
    const stepStr = step === 1 ? 'i++' : `i += ${step}`;
    let accInit = 'int res = 0;\n    int cnt = 0;';
    if (opMode === 'ALTERNATE') {
      accInit += '\n    int sign = 1;';
    }

    let loopBody = 'cnt++;\n';
    if (flow === 'CONTINUE') {
      if (loopKind === 'FOR') {
        loopBody += '        if (i % 3 == 0) continue;\n';
      } else {
        loopBody += `        if (i % 3 == 0) { ${stepStr}; continue; }\n`;
      }
    }
    if (flow === 'BREAK') loopBody += '        if (res >= 15) break;\n';

    if (opMode === 'SUM') loopBody += '        res += i;';
    else if (opMode === 'EVEN_SUM') loopBody += '        if (i % 2 == 0) res += i;';
    else loopBody += '        res += i * sign;\n        sign = -sign;';

    let loopConstruct = '';
    if (loopKind === 'FOR') {
      loopConstruct = `    for (int i = ${start}; i <= ${end}; ${stepStr}) {
        ${loopBody}
    }`;
    } else if (loopKind === 'WHILE') {
      loopConstruct = `    int i = ${start};
    while (i <= ${end}) {
        ${loopBody}
        ${stepStr};
    }`;
    } else {
      loopConstruct = `    int i = ${start};
    do {
        ${loopBody}
        ${stepStr};
    } while (i <= ${end});`;
    }

    const printVar = qType === 'ITERATION_COUNT' ? 'cnt' : 'res';
    return `#include <stdio.h>

int main() {
    ${accInit}
${loopConstruct}
    printf("%d", ${printVar});
    return 0;
}`;
  }

  private renderJavaCode(
    loopKind: string,
    start: number,
    end: number,
    step: number,
    opMode: string,
    flow: string,
    qType: string,
  ): string {
    const stepStr = step === 1 ? 'i++' : `i += ${step}`;
    let accInit = 'int res = 0;\n        int cnt = 0;';
    if (opMode === 'ALTERNATE') {
      accInit += '\n        int sign = 1;';
    }

    let loopBody = 'cnt++;\n';
    if (flow === 'CONTINUE') {
      if (loopKind === 'FOR') {
        loopBody += '            if (i % 3 == 0) continue;\n';
      } else {
        loopBody += `            if (i % 3 == 0) { ${stepStr}; continue; }\n`;
      }
    }
    if (flow === 'BREAK') loopBody += '            if (res >= 15) break;\n';

    if (opMode === 'SUM') loopBody += '            res += i;';
    else if (opMode === 'EVEN_SUM') loopBody += '            if (i % 2 == 0) res += i;';
    else loopBody += '            res += i * sign;\n            sign = -sign;';

    let loopConstruct = '';
    if (loopKind === 'FOR') {
      loopConstruct = `        for (int i = ${start}; i <= ${end}; ${stepStr}) {
            ${loopBody}
        }`;
    } else if (loopKind === 'WHILE') {
      loopConstruct = `        int i = ${start};
        while (i <= ${end}) {
            ${loopBody}
            ${stepStr};
        }`;
    } else {
      loopConstruct = `        int i = ${start};
        do {
            ${loopBody}
            ${stepStr};
        } while (i <= ${end});`;
    }

    const printVar = qType === 'ITERATION_COUNT' ? 'cnt' : 'res';
    return `public class Main {
    public static void main(String[] args) {
        ${accInit}
${loopConstruct}
        System.out.print(${printVar});
    }
}`;
  }

  private renderPythonCode(
    start: number,
    end: number,
    step: number,
    opMode: string,
    flow: string,
    qType: string,
  ): string {
    let initCode = 'res = 0\ncnt = 0';
    if (opMode === 'ALTERNATE') {
      initCode += '\nsign = 1';
    }

    let body = '    cnt += 1\n';
    if (flow === 'CONTINUE') body += '    if i % 3 == 0: continue\n';
    if (flow === 'BREAK') body += '    if res >= 15: break\n';

    if (opMode === 'SUM') body += '    res += i';
    else if (opMode === 'EVEN_SUM') body += '    if i % 2 == 0: res += i';
    else body += '    res += i * sign\n    sign = -sign';

    const printVar = qType === 'ITERATION_COUNT' ? 'cnt' : 'res';
    return `${initCode}
for i in range(${start}, ${end + 1}, ${step}):
${body}
print(${printVar})`;
  }
}

