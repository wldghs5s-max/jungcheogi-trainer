import { GeminiService } from '../../api/geminiService';
import { CodeLanguage, Difficulty } from '../../types/question';
import { StructuralFingerprintService } from './fingerprint';
import {
  ControlStructureType,
  DataStructureType,
  FlowControlType,
  PrimaryOperationType,
  ProgrammingQuestionType,
  ProgrammingTopic,
  TOPIC_METADATA,
} from './taxonomy';
import { GeneratedProgrammingQuestion, StructuralFingerprintComponents } from './types';
import { QuestionValidator } from './validation';

function parseJsonPayload(raw: string): unknown {
  const trimmed = raw.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const body = fenced ? fenced[1].trim() : trimmed;
  return JSON.parse(body);
}

export class GeminiProgrammingGenerator {
  /**
   * Gemini API를 호출하여 정보처리기사 프로그래밍 신규 템플릿/문제를 구조화된 JSON으로 생성합니다.
   */
  static async generateCandidate(options?: {
    language?: CodeLanguage;
    topic?: ProgrammingTopic;
    difficulty?: Difficulty;
    avoidFingerprints?: string[];
  }): Promise<
    | { ok: true; question: GeneratedProgrammingQuestion }
    | { ok: false; message: string }
  > {
    const targetLang = options?.language || 'C';
    const targetTopic = options?.topic || 'POINTER_REFERENCE';
    const targetDiff = options?.difficulty || 'MEDIUM';
    const avoidList = (options?.avoidFingerprints || [])
      .slice(0, 10)
      .join('\n- ');

    const prompt = `당신은 대한민국 정보처리기사 실기 출제위원입니다.
오직 정보처리기사 실기 출제 기준에 부합하는 정밀하고 오류 없는 프로그래밍 코드 추적 문제를 딱 1개 만드세요.

[출제 요구사항]
- 대상 언어: ${targetLang}
- 주제: ${TOPIC_METADATA[targetTopic]?.name || targetTopic} (${targetTopic})
- 난이도: ${targetDiff}
- 코드 길이: 8줄 ~ 25줄 (정보처리기사 시험지에 인쇄되는 적정 분량)
- 코드는 완전히 컴파일되고 실행 가능한 표준 C/Java/Python 코드여야 합니다.
- 파일 I/O, 네트워크, 시스템 명령(system/popen/exec 등)은 절대 금지합니다.

[회피해야 할 구조 지문]
- ${avoidList || '(없음)'}

반드시 순수 JSON 객체만 반환하세요. 마크다운 따옴표나 기타 텍스트 금지.
출력 JSON 스키마:
{
  "programmingLanguage": "${targetLang}",
  "topic": "${targetTopic}",
  "questionType": "CODE_OUTPUT" | "RETURN_VALUE" | "BLANK_COMPLETION",
  "difficulty": "${targetDiff}",
  "question": "다음 ${targetLang} 프로그램의 실행 결과를 쓰시오.",
  "code": "전체 소스 코드 문자열",
  "answer": "정답 텍스트 (채점용)",
  "explanation": "2~4문장의 명확한 논리적 풀이 해설",
  "structuralFingerprintComponents": {
    "controlStructure": "FOR" | "WHILE" | "NESTED_FOR" | "IF_ELSE" | "RECURSION" | "SEQUENTIAL" | "CLASS_STATIC" | "STRUCT_PTR",
    "primaryOperation": "ACCUMULATE_SUM" | "ACCUMULATE_PROD" | "POINTER_ARITHMETIC" | "SLICING" | "STRING_TRANSFORM" | "SWAP",
    "dataStructure": "SCALAR" | "ARRAY_1D" | "ARRAY_2D" | "STRING" | "STRUCT" | "OBJECT" | "POINTER",
    "flowControl": "NONE" | "BREAK" | "CONTINUE" | "EARLY_RETURN"
  },
  "expectedOutput": "코드 표준 출력 예상값"
}`;

    let result;
    try {
      result = await GeminiService.generateText(prompt, {
        maxOutputTokens: 2048,
        temperature: 0.7,
        json: true,
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : '네트워크 오류';
      return { ok: false, message: `Gemini API 호출 실패: ${msg}` };
    }

    if (!result.ok) {
      return result;
    }

    let parsed: any;
    try {
      parsed = parseJsonPayload(result.text);
    } catch {
      return { ok: false, message: 'Gemini 응답을 유효한 JSON으로 파싱하지 못했습니다.' };
    }

    if (!parsed || typeof parsed !== 'object') {
      return { ok: false, message: '응답 데이터가 올바른 JSON 객체가 아닙니다.' };
    }

    const {
      programmingLanguage,
      topic,
      questionType,
      difficulty,
      question,
      code,
      answer,
      explanation,
      structuralFingerprintComponents,
    } = parsed;

    // 1. 필수 문자열 필드 검증
    if (
      typeof code !== 'string' ||
      typeof answer !== 'string' ||
      typeof explanation !== 'string' ||
      !code.trim() ||
      !answer.trim() ||
      !explanation.trim()
    ) {
      return { ok: false, message: '필수 필드(code, answer, explanation)가 누락되었거나 문자열 형식이 아닙니다.' };
    }

    // 2. 언어 유효성 및 요청 조건 일치 검증
    const validLanguages: CodeLanguage[] = ['C', 'JAVA', 'PYTHON'];
    if (!validLanguages.includes(programmingLanguage as CodeLanguage)) {
      return { ok: false, message: `지원하지 않는 언어 형식입니다: ${programmingLanguage}` };
    }
    if (options?.language && programmingLanguage !== options.language) {
      return {
        ok: false,
        message: `요청 언어(${options.language})와 Gemini 반환 언어(${programmingLanguage})가 일치하지 않습니다.`,
      };
    }

    // 3. 주제 유효성 및 요청 조건 일치 검증
    if (!topic || !TOPIC_METADATA[topic as ProgrammingTopic]) {
      return { ok: false, message: `유효하지 않은 주제(topic)입니다: ${topic}` };
    }
    if (options?.topic && topic !== options.topic) {
      return {
        ok: false,
        message: `요청 주제(${options.topic})와 Gemini 반환 주제(${topic})가 일치하지 않습니다.`,
      };
    }

    // 4. 문제 유형 및 난이도 유효성 검증
    const validTypes: ProgrammingQuestionType[] = [
      'CODE_OUTPUT',
      'RETURN_VALUE',
      'BLANK_COMPLETION',
      'BUG_FINDING',
      'ITERATION_COUNT',
    ];
    if (!validTypes.includes(questionType as ProgrammingQuestionType)) {
      return { ok: false, message: `유효하지 않은 문제 유형(questionType)입니다: ${questionType}` };
    }

    const validDiffs: Difficulty[] = ['EASY', 'MEDIUM', 'HARD'];
    if (!validDiffs.includes(difficulty as Difficulty)) {
      return { ok: false, message: `유효하지 않은 난이도(difficulty)입니다: ${difficulty}` };
    }
    if (options?.difficulty && difficulty !== options.difficulty) {
      return {
        ok: false,
        message: `요청 난이도(${options.difficulty})와 Gemini 반환 난이도(${difficulty})가 일치하지 않습니다.`,
      };
    }

    const components: StructuralFingerprintComponents = {
      language: programmingLanguage as CodeLanguage,
      topic: topic as ProgrammingTopic,
      questionType: questionType as ProgrammingQuestionType,
      controlStructure: (structuralFingerprintComponents?.controlStructure as ControlStructureType) || 'SEQUENTIAL',
      primaryOperation: (structuralFingerprintComponents?.primaryOperation as PrimaryOperationType) || 'ACCUMULATE_SUM',
      dataStructure: (structuralFingerprintComponents?.dataStructure as DataStructureType) || 'SCALAR',
      flowControl: (structuralFingerprintComponents?.flowControl as FlowControlType) || 'NONE',
      difficulty: difficulty as Difficulty,
    };


    const fingerprint = StructuralFingerprintService.build(components);

    const candidate: GeneratedProgrammingQuestion = {
      id: `GEMINI_PROG_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      subject: '프로그래밍언어활용',
      category: components.language,
      subCategory: TOPIC_METADATA[components.topic]?.name || components.topic,
      type: components.questionType === 'BLANK_COMPLETION' ? 'SHORT_ANSWER' : 'CODE_TRACE',
      language: components.language,
      programmingLanguage: components.language,
      topic: components.topic,
      programmingType: components.questionType,
      difficulty: components.difficulty,
      question: String(question || '다음 프로그램의 실행 결과를 쓰시오.').trim(),
      code: String(code).trim(),
      answer: String(answer).trim(),
      explanation: String(explanation).trim(),
      keywords: [components.language, TOPIC_METADATA[components.topic]?.name || components.topic],
      source: 'Gemini AI 후보 생성',
      generationParams: parsed.structuralFingerprintComponents || {},
      structuralFingerprint: fingerprint,
      structuralComponents: components,
      tags: [components.language, components.topic, components.difficulty, 'Gemini'],
      generationSource: 'gemini',
      validationStatus: 'pending',
      createdAt: new Date().toISOString(),
    };

    // 자동 검증 파이프라인 통과 여부 확인
    const val = QuestionValidator.validate(candidate);
    candidate.validationStatus = val.status;
    candidate.validationMessage = val.reason;

    if (val.status === 'rejected') {
      return {
        ok: false,
        message: `생성된 문제가 자동 검증을 통과하지 못했습니다 (${val.reason})`,
      };
    }

    return { ok: true, question: candidate };
  }
}
