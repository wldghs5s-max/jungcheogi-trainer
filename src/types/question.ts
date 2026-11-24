export type CertificationType = 'JUNGCHEOGI' | 'SECURITY';

export type JungcheogiSubject =
  | '소프트웨어설계'
  | '데이터베이스구축'
  | '프로그래밍언어활용'
  | '정보시스템구축관리'
  | '신기술/보안';

export type SecuritySubject =
  | '시스템 보안'
  | '네트워크 보안'
  | '애플리케이션 보안'
  | '정보보안 일반'
  | '정보보안 관리 및 법규';

export type Subject = JungcheogiSubject | SecuritySubject;

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

/**
 * 문항 출처 구분
 * - PAST_EXAM: 실제 기출 문제 (examYear, examRound로 연도·회차 구분)
 * - CREATED: 창작 문항 (examYear, examRound 비움; syllabusStandard로 적용 출제기준 구분)
 */
export type QuestionSourceKind = 'PAST_EXAM' | 'CREATED';

/**
 * 정보보안기사 필기 출제기준 적용 기간 구분
 * - 2023_2026: 현행 출제기준 (2023.01.01 ~ 2026.12.31)
 * - 2027_2029: 차기 개정 출제기준 (2027.01.01 ~ 2029.12.31)
 */
export type SecuritySyllabusStandard = '2023_2026' | '2027_2029';

/**
 * 정보보안기사 섹션·챕터 내 문항 필터 모드
 * - ALL: 전체 문제
 * - PAST_EXAM: 실제 기출 문제
 * - REVISED_2027: 2027 개정 대비 문제
 */
export type SecurityQuestionFilterMode = 'ALL' | 'PAST_EXAM' | 'REVISED_2027';

/**
 * 추후 교재(교재명·판본·목차)가 제공될 때 문항 ID와 학습 기록을 변경하지 않고
 * 실제 교재 챕터·세부 섹션에 매핑하기 위한 참조 정보
 */
export interface TextbookSectionRef {
  bookId?: string;
  bookTitle?: string;
  edition?: string;
  bookChapterId?: string;
  bookChapterTitle?: string;
  bookSectionId?: string;
  bookSectionTitle?: string;
}

export interface Question {
  id: string;
  /** 소속 자격증 (미지정 시 기존 정보처리기사 'JUNGCHEOGI'로 처리) */
  certification?: CertificationType;
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
  /** 세부 섹션 분류 ID (예: SEC_SEC_SYS_01_01) */
  sectionId?: string;
  /** 세부 섹션 표시명 (예: 1-1. 권한 및 파일시스템 보안) */
  section?: string;
  /** 문항 출처 구분 ('PAST_EXAM': 실제 기출, 'CREATED': 창작 문항) */
  sourceKind?: QuestionSourceKind;
  /** 적용 출제기준 ('2023_2026': 현행 기준, '2027_2029': 2027 개정 기준) */
  syllabusStandard?: SecuritySyllabusStandard;
  /** 2027 개정 출제기준·개정 법령 대비 문항 여부 */
  is2027RevisionPrep?: boolean;
  /** 공식 출제기준 항목 번호 (예: 1-2-2) */
  syllabusItemCode?: string;
  /** 교재 목차 매핑 참조 (추가/변경 시에도 id 및 학습 기록 유지) */
  textbookRef?: TextbookSectionRef;
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
