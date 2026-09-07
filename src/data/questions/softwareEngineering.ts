import { Question } from '../../types/question';

export const softwareEngineeringQuestions: Question[] = [
  {
    id: 'SE_001',
    examYear: 2023,
    examRound: 2,
    subject: '소프트웨어설계',
    category: '디자인 패턴',
    subCategory: '생성 패턴',
    type: 'SHORT_ANSWER',
    question: 'GoF(Gang of Four) 디자인 패턴 중 생성 패턴(Creational Pattern)에 속하며, 클래스의 인스턴스가 오직 하나만 생성되도록 보장하고, 어디서든 이 인스턴스에 접근할 수 있는 전역적인 접점을 제공하는 패턴의 명칭을 쓰시오.',
    answer: ['싱글톤', '싱글톤 패턴', 'Singleton', 'singleton'],
    explanation: '싱글톤(Singleton) 패턴은 애플리케이션 전역에서 유일한 인스턴스를 유지하여 리소스 낭비를 방지하고 데이터 공유를 용이하게 하는 생성 패턴입니다.',
    difficulty: 'EASY',
    keywords: ['디자인패턴', 'GoF', '싱글톤', 'Singleton', '생성패턴'],
    source: '기출 변형'
  },
  {
    id: 'SE_002',
    examYear: 2022,
    examRound: 3,
    subject: '소프트웨어설계',
    category: '결합도/응집도',
    subCategory: '결합도',
    type: 'MULTIPLE_CHOICE',
    question: '소프트웨어 모듈화에서 결합도(Coupling)가 가장 약하여 독립성이 높고 가장 바람직한 형태는 무엇인가?',
    options: [
      '자료 결합도 (Data Coupling)',
      '스탬프 결합도 (Stamp Coupling)',
      '제어 결합도 (Control Coupling)',
      '공통 결합도 (Common Coupling)'
    ],
    answer: '자료 결합도 (Data Coupling)',
    explanation: '결합도는 약할수록(독립성이 높을수록) 좋습니다. 결합도의 순서는 내용(Content) > 공통(Common) > 외부(External) > 제어(Control) > 스탬프(Stamp) > 자료(Data) 순서로 자료 결합도가 가장 약합니다 (내공외제스자).',
    difficulty: 'EASY',
    keywords: ['결합도', '자료 결합도', '내공외제스자', 'Coupling'],
    source: '기출 변형'
  },
  {
    id: 'SE_003',
    examYear: 2023,
    examRound: 1,
    subject: '소프트웨어설계',
    category: '결합도/응집도',
    subCategory: '응집도',
    type: 'SHORT_ANSWER',
    question: '모듈 내부의 모든 요소들이 하나의 유일한 목적이나 기능을 수행하기 위해 밀접하게 구성되어 있는 경우로, 응집도(Cohesion) 중 가장 높은 품질을 의미하는 응집도의 명칭을 쓰시오.',
    answer: ['기능적 응집도', '기능적응집도', '기능 응집도', 'Functional Cohesion'],
    explanation: '응집도는 강할수록 모듈 독립성이 높아지며 바람직합니다. 응집도의 순서는 기능적(Functional) > 순차적(Sequential) > 통신적/교환적(Communicational) > 절차적(Procedural) > 시간적(Temporal) > 논리적(Logical) > 우연적(Coincidental) 순서입니다 (기순교절시논우).',
    difficulty: 'MEDIUM',
    keywords: ['응집도', '기능적 응집도', '기순교절시논우', 'Cohesion'],
    source: '기출 변형'
  },
  {
    id: 'SE_004',
    examYear: 2024,
    examRound: 1,
    subject: '소프트웨어설계',
    category: '소프트웨어 테스트',
    subCategory: '블랙박스',
    type: 'SHORT_ANSWER',
    question: '소프트웨어 테스트 기법 중 프로그램의 내부 구조나 소스 코드를 보지 않고, 입력값에 대한 출력 결과의 정확성을 검증하는 테스트 방식(Black Box Test)의 대표적인 기법으로, 입력 조건의 유효한 범위와 무효한 범위를 나누어 각각의 대표값을 선택하여 테스트하는 기법을 쓰시오.',
    answer: ['동등 분할', '동치 분할', '동등 분할 검사', 'Equivalence Partitioning'],
    explanation: '동등 분할(동치 분할, Equivalence Partitioning)은 입력값의 도메인을 동등한 하위 집합들로 나누고, 각 그룹에서 대표값을 하나씩 골라 테스트 케이스를 설계하는 블랙박스 테스트 기법입니다.',
    difficulty: 'MEDIUM',
    keywords: ['블랙박스 테스트', '동등 분할', '동치 분할', '테스트케이스'],
    source: '기출 변형'
  },
  {
    id: 'SE_005',
    examYear: 2023,
    examRound: 3,
    subject: '소프트웨어설계',
    category: '디자인 패턴',
    subCategory: '행위 패턴',
    type: 'SHORT_ANSWER',
    question: '한 객체의 상태가 바뀌면 그 객체에 의존하는 모든 다른 객체들에게 연락이 가고 자동으로 내용이 갱신되는 1대다(one-to-many) 의존성을 정의하는 GoF 행위 디자인 패턴의 명칭을 쓰시오.',
    answer: ['옵서버', '옵저버', '옵서버 패턴', 'Observer', 'observer'],
    explanation: '옵서버(Observer) 패턴은 주체 객체의 상태 변화를 관찰하는 감시자들에게 자동으로 알림을 전송하는 발행-구독(Pub-Sub) 모델 기반의 행위 패턴입니다.',
    difficulty: 'EASY',
    keywords: ['디자인패턴', '옵서버', 'Observer', '행위패턴'],
    source: '기출 변형'
  }
];
