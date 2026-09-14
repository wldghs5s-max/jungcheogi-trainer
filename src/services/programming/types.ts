import { CodeLanguage, Difficulty, Question } from '../../types/question';
import {
  ControlStructureType,
  DataStructureType,
  FlowControlType,
  PrimaryOperationType,
  ProgrammingQuestionType,
  ProgrammingTopic,
} from './taxonomy';

/**
 * 구조 지문 분해 구성 요소
 */
export interface StructuralFingerprintComponents {
  language: CodeLanguage;
  topic: ProgrammingTopic;
  questionType: ProgrammingQuestionType;
  controlStructure: ControlStructureType;
  primaryOperation: PrimaryOperationType;
  dataStructure: DataStructureType;
  flowControl: FlowControlType;
  difficulty: Difficulty;
}

/**
 * 자동 검증 결과
 */
export interface ValidationResult {
  isValid: boolean;
  status: 'validated' | 'rejected' | 'pending' | 'manualReviewRequired';
  reason?: string;
  evaluatedOutput?: string;
  actualAnswerMatchesExpected?: boolean;
}

/**
 * 생성된 프로그래밍 문제 표준 결과 구조
 */
export interface GeneratedProgrammingQuestion extends Question {
  id: string;
  programmingLanguage: CodeLanguage;
  topic: ProgrammingTopic;
  programmingType: ProgrammingQuestionType;
  difficulty: Difficulty;
  question: string;
  code: string;
  options?: string[];
  answer: string | string[];
  explanation: string;
  generationParams: Record<string, unknown>;
  structuralFingerprint: string;
  structuralComponents: StructuralFingerprintComponents;
  tags: string[];
  generationSource: 'local' | 'gemini';
  validationStatus: 'pending' | 'validated' | 'rejected' | 'manualReviewRequired';
  validationMessage?: string;
  createdAt: string;
}

/**
 * 문제 생성 컨텍스트 (선택기 및 생성기에 전달)
 */
export interface GenerationContext {
  seed?: number;
  targetLanguage?: CodeLanguage;
  targetTopic?: ProgrammingTopic;
  targetType?: ProgrammingQuestionType;
  targetDifficulty?: Difficulty;
  /** 최근 출제된 구조 지문 목록 (중복 회피용) */
  recentFingerprints?: string[];
  /** 최근 출제된 주제 목록 */
  recentTopics?: ProgrammingTopic[];
  /** 사용자의 취약 주제 목록 */
  weakTopics?: ProgrammingTopic[];
}

/**
 * 독립형 프로그래밍 문제 생성기 인터페이스
 */
export interface IProgrammingQuestionGenerator {
  /** 생성기 고유 식별자 (예: 'LoopOutputGenerator') */
  readonly id: string;
  /** 사람이 읽을 수 있는 이름 */
  readonly name: string;
  /** 생성기가 지원하는 언어 목록 */
  readonly supportedLanguages: CodeLanguage[];
  /** 생성기가 다루는 주제 목록 */
  readonly supportedTopics: ProgrammingTopic[];
  /** 생성기가 지원하는 문제 풀이 유형 목록 */
  readonly supportedTypes: ProgrammingQuestionType[];
  /** 기본 지원 난이도 */
  readonly supportedDifficulties: Difficulty[];

  /**
   * 주어진 컨텍스트에 따라 새 문제를 생성합니다.
   */
  generate(context: GenerationContext): GeneratedProgrammingQuestion;
}
