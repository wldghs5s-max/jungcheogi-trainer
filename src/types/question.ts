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
}
