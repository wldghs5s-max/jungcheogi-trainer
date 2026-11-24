import {
  CertificationType,
  JungcheogiSubject,
  Question,
  SecuritySubject,
  Subject,
} from '../../types/question';
import { programmingQuestions } from './programming';
import { databaseQuestions } from './database';
import { softwareEngineeringQuestions } from './softwareEngineering';
import { networkQuestions } from './network';
import { securityQuestions } from './security';
import { MEMORIZATION_BANK } from './memorizationBank';
import { quickCalcQuestions } from './quickCalc';
import { sqlPracticeQuestions } from './sqlPractice';
import {
  SECURITY_QUESTIONS,
  SECURITY_SUBJECTS,
} from '../security/securityQuestions';

export { SECURITY_QUESTIONS, SECURITY_SUBJECTS };

export const ALL_QUESTIONS: Question[] = [
  ...programmingQuestions,
  ...databaseQuestions,
  ...softwareEngineeringQuestions,
  ...networkQuestions,
  ...securityQuestions,
  ...MEMORIZATION_BANK,
  ...quickCalcQuestions,
  ...sqlPracticeQuestions,
];

export const SUBJECTS: JungcheogiSubject[] = [
  '소프트웨어설계',
  '데이터베이스구축',
  '프로그래밍언어활용',
  '정보시스템구축관리',
  '신기술/보안',
];

export function getSubjectsByCertification(
  certification: CertificationType = 'JUNGCHEOGI',
): Subject[] {
  return certification === 'SECURITY' ? SECURITY_SUBJECTS : SUBJECTS;
}

export function isSecuritySubject(subject: string): subject is SecuritySubject {
  return (SECURITY_SUBJECTS as readonly string[]).includes(subject);
}

export const getQuestionById = (id: string): Question | undefined => {
  return (
    ALL_QUESTIONS.find((q) => q.id === id) ||
    SECURITY_QUESTIONS.find((q) => q.id === id)
  );
};

export const getQuestionsBySubject = (subject: Subject): Question[] => {
  if (isSecuritySubject(subject)) {
    return SECURITY_QUESTIONS.filter((q) => q.subject === subject);
  }
  return ALL_QUESTIONS.filter((q) => q.subject === subject);
};
