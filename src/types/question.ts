export type Subject =
  | '소프트웨어설계'
  | '데이터베이스구축'
  | '프로그래밍언어활용'
  | '정보시스템구축관리'
  | '신기술/보안';

export type QuestionType =
  | 'SHORT_ANSWER'
  | 'MULTIPLE_CHOICE'
  | 'CODE_TRACE'
  | 'SQL';

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export type CodeLanguage = 'C' | 'JAVA' | 'PYTHON' | 'SQL';

/**
 * 세션 구성 시 유형별 출제 비율을 조절하기 위한 연습 문제 태그.
 * - QUICK_CALC: 필기구 없이 암산으로 풀 수 있는 짧은 코드 결과 문제
 * - SQL_PRACTICE: 표 데이터를 보고 쿼리 결과/키워드를 묻는 SQL 문제
 */
export type PracticeKind = 'QUICK_CALC' | 'SQL_PRACTICE';

export interface Question {
  id: string;
  examYear?: number;
  examRound?: number;
  questionNumber?: number;
  subject: Subject;
  category: string;
  subCategory?: string;
  type: QuestionType;
  question: string;
  code?: string;
  language?: CodeLanguage;
  options?: string[];
  answer: string | string[];
  explanation: string;
  difficulty: Difficulty;
  keywords: string[];
  source?: string;
  chapterId?: string;
  chapter?: string;
  practiceKind?: PracticeKind;
  // 프로그래밍 문제 엔진 고도화 메타데이터
  programmingTopic?: string;
  programmingType?: string;
  structuralFingerprint?: string;
  generationSource?: 'local' | 'gemini';
  validationStatus?: 'pending' | 'validated' | 'rejected' | 'manualReviewRequired';
  validationMessage?: string;
  generationParams?: Record<string, unknown>;
}
