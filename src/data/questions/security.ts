import { Question } from '../../types/question';

export const securityQuestions: Question[] = [
  {
    id: 'SEC_001',
    examYear: 2023,
    examRound: 2,
    subject: '신기술/보안',
    category: '암호화',
    subCategory: '비대칭키',
    type: 'SHORT_ANSWER',
    question: '큰 소수의 곱을 소인수분해하는 수학적 난이도에 기반하여 개발된 대표적인 공개키(비대칭키) 암호화 알고리즘의 명칭을 영문 약어로 쓰시오.',
    answer: ['RSA', 'rsa'],
    explanation: 'RSA는 Rivest, Shamir, Adleman이 개발한 공개키 암호화 알고리즘으로, 큰 소수의 곱을 인수분해하기 어렵다는 수학적 복잡성을 기반으로 동작합니다.',
    difficulty: 'EASY',
    keywords: ['암호화', 'RSA', '공개키', '소인수분해'],
    source: '기출 변형'
  },
  {
    id: 'SEC_002',
    examYear: 2023,
    examRound: 3,
    subject: '신기술/보안',
    category: '보안 공격',
    subCategory: '웹 취약점',
    type: 'SHORT_ANSWER',
    question: '웹 사이트의 취약점을 이용하여 사용자가 자신의 의지와는 무관하게 공격자가 의도한 행위(비밀번호 변경, 송금 요청 등)를 특정 웹사이트에 요청하게 만드는 공격 기법의 영문 약어를 쓰시오.',
    answer: ['CSRF', 'XSRF', 'csrf'],
    explanation: 'XSS(Cross Site Scripting)는 피해자의 브라우저에서 악성 스크립트를 실행시켜 쿠키나 세션을 탈취하는 공격이며, CSRF(Cross-Site Request Forgery)는 인증된 사용자의 권한을 도용하여 악의적인 요청을 전송하게 하는 공격입니다.',
    difficulty: 'MEDIUM',
    keywords: ['보안공격', 'CSRF', 'XSS', '웹취약점'],
    source: '기출 변형'
  },
  {
    id: 'SEC_003',
    examYear: 2024,
    examRound: 1,
    subject: '신기술/보안',
    category: '접근 통제',
    subCategory: 'RBAC',
    type: 'SHORT_ANSWER',
    question: '접근 통제 정책 중 주체(사용자)의 직무나 직책에 따라 역할을 부여하고, 해당 역할에 허용된 권한만을 행사할 수 있도록 제어하는 방식의 명칭 또는 영문 약어를 쓰시오.',
    answer: ['RBAC', '역할 기반 접근 통제', '역할기반접근통제', 'Role Based Access Control'],
    explanation: '접근 통제 3대 모델은 신분 기반 자율적 접근 통제(DAC), 보안 등급 기반 강제적 접근 통제(MAC), 직무 기반 역할 기반 접근 통제(RBAC)입니다.',
    difficulty: 'EASY',
    keywords: ['접근통제', 'RBAC', '역할기반', '보안정책'],
    source: '기출 변형'
  },
  {
    id: 'SEC_004',
    examYear: 2022,
    examRound: 1,
    subject: '신기술/보안',
    category: '정보보안',
    subCategory: 'CIA',
    type: 'SHORT_ANSWER',
    question: '정보보안의 3대 목표(CIA) 중, 인가되지 않은 사용자에 의해 정보나 시스템이 변조, 삭제, 위조되지 않고 정확성과 완전성이 유지됨을 보장하는 특성을 쓰시오.',
    answer: ['무결성', '완전성', 'Integrity', 'integrity'],
    explanation: '정보보안의 3대 요소(CIA)는 기밀성(Confidentiality: 비인가자 열람 금지), 무결성(Integrity: 비인가된 변조 및 삭제 금지), 가용성(Availability: 인가자가 필요할 때 언제든 사용 가능)입니다.',
    difficulty: 'EASY',
    keywords: ['정보보안', 'CIA', '무결성', 'Integrity'],
    source: '기출 변형'
  }
];
