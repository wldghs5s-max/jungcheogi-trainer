import { CodeLanguage, Difficulty } from '../../../types/question';
import { ProgrammingQuestionType, ProgrammingTopic } from '../taxonomy';
import { GeneratedProgrammingQuestion, GenerationContext } from '../types';
import { BaseGenerator } from './BaseGenerator';

export class StringOperationGenerator extends BaseGenerator {
  readonly id = 'StringOperationGenerator';
  readonly name = '문자열 연산 생성기';
  readonly supportedLanguages: CodeLanguage[] = ['C', 'JAVA', 'PYTHON'];
  readonly supportedTopics: ProgrammingTopic[] = ['STRING'];
  readonly supportedTypes: ProgrammingQuestionType[] = ['CODE_OUTPUT'];
  readonly supportedDifficulties: Difficulty[] = ['EASY', 'MEDIUM', 'HARD'];

  generate(context: GenerationContext): GeneratedProgrammingQuestion {
    const rng = this.createRng(context.seed);
    const lang = context.targetLanguage || this.pickOne(this.supportedLanguages, rng);
    const difficulty = context.targetDifficulty || this.pickOne(this.supportedDifficulties, rng);

    const words = ['KOREA', 'TRAIN', 'EXAM', 'STUDY', 'CLOUD', 'SMART'];
    const word = this.pickOne(words, rng);

    let code = '';
    let finalAnswer = '';
    let explanation = '';

    if (lang === 'C') {
      // C 문자열 포인터 이동 및 길이/널문자 확인
      const offset = this.pickInt(1, 3, rng);
      finalAnswer = String(word.length - offset);

      code = `#include <stdio.h>

int main() {
    char str[] = "${word}";
    char *p = str + ${offset};
    int count = 0;
    while (*p != '\\0') {
        count++;
        p++;
    }
    printf("%d", count);
    return 0;
}`;
      explanation = `문자열 "${word}"의 시작 주소에서 ${offset}만큼 이동한 위치('${word[offset]}')부터 null 문자('\\0') 전까지 글자 수는 ${finalAnswer}개입니다.`;
    } else if (lang === 'JAVA') {
      // Java substring + charAt ASCII 계산
      const charIndex = this.pickInt(0, word.length - 1, rng);
      const targetChar = word[charIndex];
      const asciiDiff = targetChar.charCodeAt(0) - 'A'.charCodeAt(0);
      finalAnswer = String(word.length + asciiDiff);

      code = `public class Main {
    public static void main(String[] args) {
        String str = "${word}";
        int len = str.length();
        int diff = str.charAt(${charIndex}) - 'A';
        System.out.print(len + diff);
    }
}`;
      explanation = `문자열 길이는 ${word.length}이고, '${targetChar}'와 'A'의 아스키코드 차이는 ${asciiDiff}입니다. 따라서 합산 결과는 ${finalAnswer}입니다.`;
    } else {
      // Python 슬라이싱
      const step = 2;
      const start = 0;
      const end = word.length;
      let sliced = '';
      for (let i = start; i < end; i += step) {
        sliced += word[i];
      }
      finalAnswer = sliced;

      code = `text = "${word}"
result = text[${start}:${end}:${step}]
print(result)`;
      explanation = `슬라이싱 text[${start}:${end}:${step}]에 따라 인덱스 0부터 2칸씩 건너뛰며 추출하므로 결과는 "${finalAnswer}"입니다.`;
    }

    return this.finalizeQuestion({
      id: this.buildId('STR', context.seed),
      language: lang,
      topic: 'STRING',
      type: 'CODE_OUTPUT',
      difficulty,
      code,
      answer: finalAnswer,
      explanation,
      components: {
        language: lang,
        topic: 'STRING',
        questionType: 'CODE_OUTPUT',
        controlStructure: lang === 'C' ? 'WHILE' : 'SEQUENTIAL',
        primaryOperation: lang === 'PYTHON' ? 'SLICING' : 'STRING_TRANSFORM',
        dataStructure: 'STRING',
        flowControl: 'NONE',
        difficulty,
      },
      generationParams: {
        word,
      },
    });
  }
}
