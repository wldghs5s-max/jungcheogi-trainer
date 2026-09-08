import { Question, Subject } from '../../types/question';
import { programmingQuestions } from './programming';
import { databaseQuestions } from './database';
import { softwareEngineeringQuestions } from './softwareEngineering';
import { networkQuestions } from './network';
import { securityQuestions } from './security';
import { MEMORIZATION_BANK } from './memorizationBank';

export const ALL_QUESTIONS: Question[] = [
  ...programmingQuestions,
  ...databaseQuestions,
  ...softwareEngineeringQuestions,
  ...networkQuestions,
  ...securityQuestions,
  ...MEMORIZATION_BANK,
];

export const SUBJECTS: Subject[] = [
  '소프트웨어설계',
  '데이터베이스구축',
  '프로그래밍언어활용',
  '정보시스템구축관리',
  '신기술/보안',
];

export const getQuestionById = (id: string): Question | undefined => {
  return ALL_QUESTIONS.find((q) => q.id === id);
};

export const getQuestionsBySubject = (subject: Subject): Question[] => {
  return ALL_QUESTIONS.filter((q) => q.subject === subject);
};
