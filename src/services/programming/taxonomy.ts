import { CodeLanguage, Difficulty } from '../../types/question';

/**
 * 프로그래밍 문제 주제 분류 (정보처리기사 실기 출제 범위 기준)
 */
export type ProgrammingTopic =
  | 'OPERATOR_DATATYPE'     // 연산자와 자료형 (비트, 삼항, 형변환 등)
  | 'CONDITIONAL'           // 조건문 (if-else, switch-case)
  | 'LOOP'                  // 단일 반복문 (for, while, do-while)
  | 'NESTED_LOOP'           // 중첩 반복문 (2중 루프, 삼각 순회, 다중 인덱스)
  | 'ARRAY'                 // 배열 (1차원/2차원, 역순, 정렬, 탐색)
  | 'STRING'                // 문자열 (문자 배열, ASCII, 문자열 함수, 슬라이싱)
  | 'FUNCTION_PARAM'        // 함수와 매개변수 (값에 의한 전달, 참조/배열 전달)
  | 'RECURSIVE'             // 재귀 호출 (팩토리얼, 피보나치, GCD, 트리 순회)
  | 'POINTER_REFERENCE'     // 포인터와 참조 (C 언어 포인터 연산, 주소 전달, 이중 포인터)
  | 'STRUCT_CLASS'          // 구조체와 클래스 (C 구조체, Java static/생성자, 멤버)
  | 'INHERITANCE_POLY'      // 상속과 다형성 (오버라이딩, 가상 메서드, 추상 클래스)
  | 'EXCEPTION'             // 예외 처리 (try-catch-finally)
  | 'CONTROL_FLOW_ERROR';   // 실행 경로와 오류 처리 (단락 평가, break/continue)

/**
 * 프로그래밍 문제 풀이 유형 분류
 */
export type ProgrammingQuestionType =
  | 'CODE_OUTPUT'           // 코드 실행 결과 (가장 빈출)
  | 'ITERATION_COUNT'       // 반복 횟수 계산
  | 'RETURN_VALUE'          // 함수/메서드 반환값 추적
  | 'BLANK_COMPLETION'      // 핵심 구문 빈칸 완성
  | 'CODE_SELECTION'        // 올바른/동작하는 코드 선택
  | 'BUG_FINDING'           // 오류/버그 찾기 (오프바이원, 무한루프 등)
  | 'CODE_MODIFICATION'     // 의도대로 동작하도록 코드 수정
  | 'EXECUTION_ORDER'       // 문장/메서드 실행 순서 배열
  | 'COMPLEXITY_COUNT'      // 연산 횟수 또는 시간복잡도 계산
  | 'CONCEPT_MAPPING';      // 프로그래밍 개념과 실제 코드 연결

/**
 * 제어 구조 요소 (구조 지문용)
 */
export type ControlStructureType =
  | 'FOR'
  | 'WHILE'
  | 'DO_WHILE'
  | 'NESTED_FOR'
  | 'IF_ELSE'
  | 'SWITCH_CASE'
  | 'RECURSION'
  | 'SEQUENTIAL'
  | 'CLASS_STATIC'
  | 'STRUCT_PTR';

/**
 * 주요 연산 방식 (구조 지문용)
 */
export type PrimaryOperationType =
  | 'ACCUMULATE_SUM'
  | 'ACCUMULATE_PROD'
  | 'CONDITIONAL_ACCUM'
  | 'ALTERNATE_SIGN'
  | 'BITWISE'
  | 'POINTER_ARITHMETIC'
  | 'SLICING'
  | 'STRING_TRANSFORM'
  | 'MIN_MAX'
  | 'SWAP'
  | 'RECURSIVE_STEP';

/**
 * 자료 구조 요소 (구조 지문용)
 */
export type DataStructureType =
  | 'SCALAR'
  | 'ARRAY_1D'
  | 'ARRAY_2D'
  | 'STRING'
  | 'STRUCT'
  | 'OBJECT'
  | 'POINTER';

/**
 * 흐름 제어 요소 (구조 지문용)
 */
export type FlowControlType =
  | 'NONE'
  | 'BREAK'
  | 'CONTINUE'
  | 'EARLY_RETURN'
  | 'EXCEPTION_THROW';

/**
 * 주제 메타데이터 정의
 */
export interface TopicMetadata {
  id: ProgrammingTopic;
  name: string;
  description: string;
  examImportance: number; // 1 ~ 5
  recommendedLanguages: CodeLanguage[];
}

export const TOPIC_METADATA: Record<ProgrammingTopic, TopicMetadata> = {
  OPERATOR_DATATYPE: {
    id: 'OPERATOR_DATATYPE',
    name: '연산자와 자료형',
    description: '비트 연산, 전위/후위 증감, 시프트, 삼항 연산자',
    examImportance: 4,
    recommendedLanguages: ['C', 'JAVA'],
  },
  CONDITIONAL: {
    id: 'CONDITIONAL',
    name: '조건문',
    description: 'if-else 다중 분기 및 switch-case break 유무',
    examImportance: 4,
    recommendedLanguages: ['C', 'JAVA'],
  },
  LOOP: {
    id: 'LOOP',
    name: '단일 반복문',
    description: 'for, while, do-while 루프와 누적 연산',
    examImportance: 5,
    recommendedLanguages: ['C', 'JAVA', 'PYTHON'],
  },
  NESTED_LOOP: {
    id: 'NESTED_LOOP',
    name: '중첩 반복문',
    description: '2중 루프, 삼각 패턴, 반복 횟수 계산',
    examImportance: 5,
    recommendedLanguages: ['C', 'JAVA'],
  },
  ARRAY: {
    id: 'ARRAY',
    name: '배열',
    description: '배열 인덱스 접근, 요소 합산, 최댓값, 역순',
    examImportance: 5,
    recommendedLanguages: ['C', 'JAVA', 'PYTHON'],
  },
  STRING: {
    id: 'STRING',
    name: '문자열',
    description: 'C null 종료 문자열, Java/Python 슬라이싱 및 내장 메서드',
    examImportance: 4,
    recommendedLanguages: ['C', 'JAVA', 'PYTHON'],
  },
  FUNCTION_PARAM: {
    id: 'FUNCTION_PARAM',
    name: '함수와 매개변수',
    description: '값에 의한 호출(Call by value)과 참조에 의한 호출(Call by reference)',
    examImportance: 4,
    recommendedLanguages: ['C', 'JAVA', 'PYTHON'],
  },
  RECURSIVE: {
    id: 'RECURSIVE',
    name: '재귀 호출',
    description: '재귀 함수 호출 스택, 기저 조건(Base Case), 팩토리얼/피보나치',
    examImportance: 5,
    recommendedLanguages: ['C', 'JAVA', 'PYTHON'],
  },
  POINTER_REFERENCE: {
    id: 'POINTER_REFERENCE',
    name: '포인터와 참조',
    description: 'C 언어 핵심 출제 영역: *(p+i), *p++, 구조체 포인터',
    examImportance: 5,
    recommendedLanguages: ['C'],
  },
  STRUCT_CLASS: {
    id: 'STRUCT_CLASS',
    name: '구조체와 클래스',
    description: 'C 구조체 및 Java static 변수/생성자/메서드',
    examImportance: 5,
    recommendedLanguages: ['C', 'JAVA', 'PYTHON'],
  },
  INHERITANCE_POLY: {
    id: 'INHERITANCE_POLY',
    name: '상속과 다형성',
    description: '오버라이딩, 동적 바인딩, 부모-자식 타입 캐스팅',
    examImportance: 5,
    recommendedLanguages: ['JAVA', 'PYTHON'],
  },
  EXCEPTION: {
    id: 'EXCEPTION',
    name: '예외 처리',
    description: 'try-catch-finally 블록 실행 순서 및 리턴 처리',
    examImportance: 3,
    recommendedLanguages: ['JAVA', 'PYTHON'],
  },
  CONTROL_FLOW_ERROR: {
    id: 'CONTROL_FLOW_ERROR',
    name: '실행 경로와 오류 처리',
    description: '단락 평가(Short-circuit), 루프 내 break/continue 복합 흐름',
    examImportance: 4,
    recommendedLanguages: ['C', 'JAVA', 'PYTHON'],
  },
};

/**
 * 문제 유형 메타데이터 정의
 */
export interface QuestionTypeMetadata {
  id: ProgrammingQuestionType;
  name: string;
  description: string;
  defaultExamQuestionStem: string; // 문제 기본 발문
}

export const QUESTION_TYPE_METADATA: Record<ProgrammingQuestionType, QuestionTypeMetadata> = {
  CODE_OUTPUT: {
    id: 'CODE_OUTPUT',
    name: '코드 실행 결과',
    description: '주어진 소스 코드의 표준 출력 또는 최종 상태값을 작성',
    defaultExamQuestionStem: '다음 프로그램의 실행 결과를 쓰시오.',
  },
  ITERATION_COUNT: {
    id: 'ITERATION_COUNT',
    name: '반복 횟수 계산',
    description: '루프 본문 또는 특정 문장이 실행되는 총 횟수 계산',
    defaultExamQuestionStem: '다음 코드에서 지정된 문장이 실행되는 총 횟수를 쓰시오.',
  },
  RETURN_VALUE: {
    id: 'RETURN_VALUE',
    name: '반환값 추적',
    description: '함수 또는 메서드 호출 시 최종 반환되는 값 작성',
    defaultExamQuestionStem: '다음 함수의 호출 결과로 반환되는 값을 쓰시오.',
  },
  BLANK_COMPLETION: {
    id: 'BLANK_COMPLETION',
    name: '빈칸 완성',
    description: '의도된 동작을 완성하기 위해 소스 코드의 빈칸에 들어갈 코드 작성',
    defaultExamQuestionStem: '다음 프로그램이 올바르게 동작하도록 빈칸에 들어갈 적절한 연산자 또는 코드를 쓰시오.',
  },
  CODE_SELECTION: {
    id: 'CODE_SELECTION',
    name: '올바른 코드 선택',
    description: '주어진 조건에 맞는 문장이나 표현식 선택',
    defaultExamQuestionStem: '다음 설명에 맞는 올바른 소스 코드를 보기에서 고르시오.',
  },
  BUG_FINDING: {
    id: 'BUG_FINDING',
    name: '오류 찾기',
    description: '문법 오류나 런타임 논리적 오류가 발생하는 행 또는 원인 찾기',
    defaultExamQuestionStem: '다음 소스 코드에서 논리적 오류(버그)를 발생시키는 원인이나 수정 방안을 쓰시오.',
  },
  CODE_MODIFICATION: {
    id: 'CODE_MODIFICATION',
    name: '코드 수정',
    description: '잘못된 부분을 올바른 코드로 고쳐 쓰기',
    defaultExamQuestionStem: '다음 코드의 잘못된 부분을 찾아 올바르게 수정한 코드를 쓰시오.',
  },
  EXECUTION_ORDER: {
    id: 'EXECUTION_ORDER',
    name: '실행 순서 배열',
    description: '생성자, 상속 호출, 예외 발생 시 코드 라인의 실행 순서',
    defaultExamQuestionStem: '다음 프로그램이 실행될 때 출력되는 문자 또는 실행 순서를 차례대로 쓰시오.',
  },
  COMPLEXITY_COUNT: {
    id: 'COMPLEXITY_COUNT',
    name: '연산 횟수 계산',
    description: '주요 연산이 일어나는 횟수를 수식 또는 숫자로 계산',
    defaultExamQuestionStem: '다음 알고리즘이 완료될 때까지 수행되는 기본 연산의 총 횟수를 쓰시오.',
  },
  CONCEPT_MAPPING: {
    id: 'CONCEPT_MAPPING',
    name: '개념과 코드 연결',
    description: '오버라이딩, static, 포인터 연산 등 특정 기법이 적용된 코드 판별',
    defaultExamQuestionStem: '다음 소스 코드에 적용된 객체지향/언어 특성 개념의 명칭을 쓰시오.',
  },
};
