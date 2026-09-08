import { Question } from "../../types/question";

/**
 * 실기 암기 과목 보충 은행.
 * 생성(신규 확인) 시 아직 캐시에 없는 항목만 배치로 추가됩니다.
 * 프로그래밍 코드 추적은 넣지 않습니다.
 */
export const MEMORIZATION_BANK: Question[] = [
  // ---- 소프트웨어설계 ----
  {
    id: "MEMO_SE_001",
    subject: "소프트웨어설계",
    category: "UML",
    subCategory: "유스케이스",
    type: "SHORT_ANSWER",
    question:
      "시스템이 제공하는 기능과 그 기능을 사용하는 외부 액터(Actor) 사이의 관계를 표현하여 요구사항을 모델링하는 UML 다이어그램의 명칭을 쓰시오.",
    answer: ["유스케이스 다이어그램", "유스케이스", "Use Case Diagram", "Use Case"],
    explanation:
      "유스케이스 다이어그램은 액터와 유스케이스, 시스템 경계를 보여 주어 기능적 요구사항을 한눈에 파악하게 합니다.",
    difficulty: "EASY",
    keywords: ["UML", "유스케이스", "액터", "요구사항"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_SE_002",
    subject: "소프트웨어설계",
    category: "UML",
    subCategory: "시퀀스",
    type: "SHORT_ANSWER",
    question:
      "객체 사이의 메시지 송수신을 시간 순서(위에서 아래)로 표현하는 UML 다이어그램의 명칭을 쓰시오.",
    answer: ["시퀀스 다이어그램", "순차 다이어그램", "Sequence Diagram"],
    explanation:
      "시퀀스(순차) 다이어그램은 생명선과 메시지를 시간축으로 나열하여 객체 간 상호작용 순서를 나타냅니다.",
    difficulty: "EASY",
    keywords: ["UML", "시퀀스", "메시지", "상호작용"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_SE_003",
    subject: "소프트웨어설계",
    category: "디자인 패턴",
    subCategory: "생성 패턴",
    type: "SHORT_ANSWER",
    question:
      "객체 생성 인터페이스는 부모에 두고, 어떤 클래스의 인스턴스를 만들지는 서브클래스가 결정하게 하는 GoF 생성 패턴의 명칭을 쓰시오.",
    answer: ["팩토리 메서드", "팩토리 메소드", "Factory Method", "팩토리메서드"],
    explanation:
      "팩토리 메서드 패턴은 new를 서브클래스의 팩토리 메서드로 미뤄 생성 책임을 분리합니다. 단순 팩토리, 추상 팩토리와 구분합니다.",
    difficulty: "MEDIUM",
    keywords: ["디자인패턴", "팩토리 메서드", "생성패턴"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_SE_004",
    subject: "소프트웨어설계",
    category: "디자인 패턴",
    subCategory: "구조 패턴",
    type: "SHORT_ANSWER",
    question:
      "호환되지 않는 인터페이스를 가진 클래스를 클라이언트가 기대하는 인터페이스로 변환해 주는 GoF 구조 패턴의 명칭을 쓰시오.",
    answer: ["어댑터", "어댑터 패턴", "Adapter", "어댑터패턴"],
    explanation:
      "어댑터 패턴은 기존 클래스를 수정하지 않고 다른 인터페이스에 맞출 때 사용합니다. 래퍼(Wrapper)라고도 합니다.",
    difficulty: "EASY",
    keywords: ["디자인패턴", "어댑터", "인터페이스"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_SE_005",
    subject: "소프트웨어설계",
    category: "소프트웨어 테스트",
    subCategory: "경계값",
    type: "SHORT_ANSWER",
    question:
      "입력 조건의 경계에 해당하는 값과 그 바로 안팎의 값을 테스트 케이스로 선택하는 블랙박스 기법의 명칭을 쓰시오.",
    answer: [
      "경계값 분석",
      "경계값 분석 기법",
      "경계값검사",
      "Boundary Value Analysis",
      "BVA",
    ],
    explanation:
      "오류는 경계 부근에서 자주 발생합니다. 동등 분할로 나눈 구간의 최솟값·최댓값과 그 인접값을 검사합니다.",
    difficulty: "EASY",
    keywords: ["블랙박스", "경계값 분석", "테스트"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_SE_006",
    subject: "소프트웨어설계",
    category: "소프트웨어 테스트",
    subCategory: "커버리지",
    type: "SHORT_ANSWER",
    question:
      "화이트박스 테스트에서 프로그램의 모든 문장(Statement)이 적어도 한 번은 실행되도록 하는 검증 기준의 명칭을 쓰시오.",
    answer: ["구문 커버리지", "문장 커버리지", "Statement Coverage"],
    explanation:
      "구문 커버리지는 가장 약한 기준입니다. 분기(결정) 커버리지, 조건 커버리지, 경로 커버리지로 갈수록 엄격해집니다.",
    difficulty: "EASY",
    keywords: ["화이트박스", "구문 커버리지", "테스트커버리지"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_SE_007",
    subject: "소프트웨어설계",
    category: "아키텍처",
    subCategory: "MVC",
    type: "SHORT_ANSWER",
    question:
      "응용을 모델(Model), 뷰(View), 컨트롤러(Controller)로 나누어 데이터·화면·제어를 분리하는 아키텍처 패턴의 영문 약어를 쓰시오.",
    answer: ["MVC", "mvc"],
    explanation:
      "MVC는 비즈니스 로직(Model), 사용자 인터페이스(View), 입력을 조율하는 Controller를 분리해 유지보수를 쉽게 합니다.",
    difficulty: "EASY",
    keywords: ["아키텍처", "MVC", "설계패턴"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_SE_008",
    subject: "소프트웨어설계",
    category: "요구사항",
    subCategory: "개발 프로세스",
    type: "SHORT_ANSWER",
    question:
      "요구공학에서 요구사항을 수집·발견하는 활동부터 분석, 명세, 확인까지 이어지는 네 단계 중 이해관계자로부터 요구를 이끌어 내는 첫 단계의 명칭을 쓰시오.",
    answer: ["요구사항 도출", "도출", "Elicitation", "요구 도출"],
    explanation:
      "요구사항 개발은 도출(Elicitation) → 분석(Analysis) → 명세(Specification) → 확인(Validation) 순으로 진행됩니다.",
    difficulty: "MEDIUM",
    keywords: ["요구공학", "도출", "분석", "명세"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_SE_009",
    subject: "소프트웨어설계",
    category: "애자일",
    subCategory: "스크럼",
    type: "SHORT_ANSWER",
    question:
      "스크럼에서 제품 백로그의 우선순위를 결정하고 제품의 가치에 책임을 지는 역할의 영문 명칭을 쓰시오.",
    answer: ["Product Owner", "PO", "제품 책임자", "프로덕트 오너"],
    explanation:
      "Product Owner는 백로그를 관리합니다. Scrum Master는 프로세스 촉진, Development Team은 실제 구현을 담당합니다.",
    difficulty: "EASY",
    keywords: ["스크럼", "Product Owner", "애자일"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_SE_010",
    subject: "소프트웨어설계",
    category: "애자일",
    subCategory: "XP",
    type: "SHORT_ANSWER",
    question:
      "XP(eXtreme Programming)의 핵심 실천 중 두 사람이 한 컴퓨터에서 함께 코드를 작성하는 기법의 명칭을 쓰시오.",
    answer: ["페어 프로그래밍", "짝 프로그래밍", "Pair Programming"],
    explanation:
      "페어 프로그래밍은 드라이버와 내비게이터가 역할을 나누어 결함을 일찍 찾고 지식을 공유합니다.",
    difficulty: "EASY",
    keywords: ["XP", "페어프로그래밍", "애자일"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_SE_011",
    subject: "소프트웨어설계",
    category: "모듈화",
    subCategory: "정보은닉",
    type: "SHORT_ANSWER",
    question:
      "모듈 내부의 상세 구현을 외부에 숨기고, 공개된 인터페이스로만 접근하게 하여 변경의 영향을 줄이는 설계 원리의 명칭을 쓰시오.",
    answer: ["정보 은닉", "정보은닉", "Information Hiding"],
    explanation:
      "정보 은닉은 캡슐화와 함께 모듈 독립성을 높입니다. 내부 자료구조가 바뀌어도 인터페이스가 같으면 호출부는 수정하지 않아도 됩니다.",
    difficulty: "EASY",
    keywords: ["정보은닉", "캡슐화", "모듈화"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_SE_012",
    subject: "소프트웨어설계",
    category: "형상관리",
    subCategory: "베이스라인",
    type: "SHORT_ANSWER",
    question:
      "형상 항목이 공식 검토를 통과한 뒤 변경을 통제하기 위한 기준선으로 확정된 상태의 명칭을 영문 또는 한글로 쓰시오.",
    answer: ["베이스라인", "Baseline", "기준선"],
    explanation:
      "베이스라인은 합의된 형상의 스냅샷입니다. 이후 변경은 CCB(형상통제위원회) 등 공식 절차를 거칩니다.",
    difficulty: "MEDIUM",
    keywords: ["형상관리", "베이스라인", "변경통제"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_SE_013",
    subject: "소프트웨어설계",
    category: "디자인 패턴",
    subCategory: "행위 패턴",
    type: "SHORT_ANSWER",
    question:
      "알고리즘 계열을 캡슐화하고 실행 중에 교체할 수 있게 하는 GoF 행위 패턴의 명칭을 쓰시오.",
    answer: ["전략", "전략 패턴", "Strategy", "Strategy Pattern"],
    explanation:
      "전략 패턴은 조건문으로 얽힌 알고리즘을 객체로 분리합니다. 결제 수단, 정렬 방식 교체 등에 쓰입니다.",
    difficulty: "MEDIUM",
    keywords: ["디자인패턴", "전략", "Strategy"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_SE_014",
    subject: "소프트웨어설계",
    category: "UML",
    subCategory: "클래스",
    type: "SHORT_ANSWER",
    question:
      "시스템의 클래스, 속성, 연산과 클래스 간 관계(연관, 일반화, 의존 등)를 정적으로 표현하는 UML 다이어그램의 명칭을 쓰시오.",
    answer: ["클래스 다이어그램", "Class Diagram"],
    explanation:
      "클래스 다이어그램은 구조(정적) 관점의 핵심 산출물입니다. 시퀀스·활동 다이어그램은 행위(동적) 관점입니다.",
    difficulty: "EASY",
    keywords: ["UML", "클래스 다이어그램", "정적모델링"],
    source: "암기 보충 생성",
  },

  // ---- 데이터베이스구축 ----
  {
    id: "MEMO_DB_001",
    subject: "데이터베이스구축",
    category: "정규화",
    subCategory: "2NF",
    type: "SHORT_ANSWER",
    question:
      "기본키가 복합키일 때, 기본키의 일부에만 종속되는 부분 함수 종속을 제거하여 만족시키는 정규형의 명칭을 쓰시오.",
    answer: ["제2정규형", "2NF", "제 2정규형"],
    explanation:
      "1NF는 원자값, 2NF는 부분 함수 종속 제거, 3NF는 이행 함수 종속 제거입니다. 암기: 도원부이결다조.",
    difficulty: "MEDIUM",
    keywords: ["정규화", "2NF", "부분함수종속"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_DB_002",
    subject: "데이터베이스구축",
    category: "정규화",
    subCategory: "3NF",
    type: "SHORT_ANSWER",
    question:
      "기본키가 아닌 속성이 다른 비키 속성을 결정하는 이행 함수 종속을 제거한 정규형의 명칭을 쓰시오.",
    answer: ["제3정규형", "3NF", "제 3정규형"],
    explanation:
      "3NF는 A→B, B→C일 때 A→C인 이행 종속을 분해하여 제거합니다.",
    difficulty: "MEDIUM",
    keywords: ["정규화", "3NF", "이행종속"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_DB_003",
    subject: "데이터베이스구축",
    category: "키",
    subCategory: "후보키",
    type: "SHORT_ANSWER",
    question:
      "릴레이션에서 튜플을 유일하게 식별할 수 있는 속성 또는 속성 집합으로, 유일성과 최소성을 모두 만족하는 키의 명칭을 쓰시오.",
    answer: ["후보키", "Candidate Key", "후보 키"],
    explanation:
      "후보키 중 하나를 기본키로 선정합니다. 나머지 후보키는 대체키(Alternate Key)입니다.",
    difficulty: "EASY",
    keywords: ["후보키", "기본키", "유일성", "최소성"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_DB_004",
    subject: "데이터베이스구축",
    category: "키",
    subCategory: "외래키",
    type: "SHORT_ANSWER",
    question:
      "다른 릴레이션의 기본키를 참조하는 속성으로, 참조 무결성을 지키는 키의 명칭을 쓰시오.",
    answer: ["외래키", "외래 키", "Foreign Key", "FK"],
    explanation:
      "외래키 값은 참조하는 릴레이션의 기본키 값과 같거나 NULL이어야 합니다(참조 무결성).",
    difficulty: "EASY",
    keywords: ["외래키", "참조무결성", "FK"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_DB_005",
    subject: "데이터베이스구축",
    category: "SQL",
    subCategory: "조인",
    type: "SHORT_ANSWER",
    question:
      "두 테이블에서 조인 조건을 만족하는 행만 결합하고, 조건에 맞지 않는 행은 결과에서 제외하는 조인의 명칭을 쓰시오.",
    answer: ["내부 조인", "이너 조인", "Inner Join", "EQUI JOIN", "등가 조인"],
    explanation:
      "INNER JOIN(등가 조인이 대표적)은 일치하는 행만 반환합니다. 일치하지 않는 행까지 남기려면 OUTER JOIN을 씁니다.",
    difficulty: "EASY",
    keywords: ["SQL", "INNER JOIN", "조인"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_DB_006",
    subject: "데이터베이스구축",
    category: "트랜잭션",
    subCategory: "격리수준",
    type: "SHORT_ANSWER",
    question:
      "트랜잭션 격리 수준 중 가장 낮아 Dirty Read, Non-Repeatable Read, Phantom Read가 모두 발생할 수 있는 수준의 영문 명칭을 쓰시오.",
    answer: ["READ UNCOMMITTED", "Read Uncommitted"],
    explanation:
      "격리 수준은 READ UNCOMMITTED < READ COMMITTED < REPEATABLE READ < SERIALIZABLE 순으로 엄격해집니다.",
    difficulty: "HARD",
    keywords: ["격리수준", "Dirty Read", "트랜잭션"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_DB_007",
    subject: "데이터베이스구축",
    category: "트랜잭션",
    subCategory: "ACID",
    type: "SHORT_ANSWER",
    question:
      "트랜잭션의 연산이 모두 반영되거나 모두 취소되어야 하며, 일부만 반영되면 안 된다는 ACID 특성의 명칭을 쓰시오.",
    answer: ["원자성", "Atomicity", "원자성(Atomicity)"],
    explanation:
      "원자성(Atomicity)은 All or Nothing입니다. 장애 시 UNDO로 미완료 트랜잭션을 철회합니다.",
    difficulty: "EASY",
    keywords: ["ACID", "원자성", "Atomicity"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_DB_008",
    subject: "데이터베이스구축",
    category: "인덱스",
    subCategory: "B-Tree",
    type: "SHORT_ANSWER",
    question:
      "데이터베이스에서 검색 성능을 높이기 위해 컬럼 값과 해당 레코드 위치를 별도의 자료구조로 유지하는 객체의 명칭을 쓰시오.",
    answer: ["인덱스", "Index", "색인"],
    explanation:
      "인덱스는 탐색을 빠르게 하지만 입력·수정·삭제 비용과 저장 공간을 늘립니다. B-Tree 인덱스가 일반적입니다.",
    difficulty: "EASY",
    keywords: ["인덱스", "B-Tree", "성능"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_DB_009",
    subject: "데이터베이스구축",
    category: "이상현상",
    subCategory: "갱신이상",
    type: "SHORT_ANSWER",
    question:
      "정규화가 안 된 테이블에서 동일 데이터가 여러 곳에 중복되어, 일부를 수정하면 데이터가 불일치하는 현상의 명칭을 쓰시오.",
    answer: ["갱신 이상", "수정 이상", "Update Anomaly"],
    explanation:
      "이상 현상은 삽입 이상, 삭제 이상, 갱신(수정) 이상입니다. 정규화로 중복을 제거해 줄입니다.",
    difficulty: "MEDIUM",
    keywords: ["이상현상", "갱신이상", "정규화"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_DB_010",
    subject: "데이터베이스구축",
    category: "SQL",
    subCategory: "뷰",
    type: "SHORT_ANSWER",
    question:
      "하나 이상의 테이블을 조회한 결과를 가상의 테이블처럼 사용하는 SQL 객체의 명칭을 쓰시오.",
    answer: ["뷰", "View", "뷰(View)"],
    explanation:
      "뷰는 저장된 질의입니다. 보안(컬럼 숨김)과 단순 조회에 쓰이며, 일부는 갱신이 제한됩니다.",
    difficulty: "EASY",
    keywords: ["뷰", "View", "가상테이블"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_DB_011",
    subject: "데이터베이스구축",
    category: "SQL",
    subCategory: "집합연산",
    type: "SHORT_ANSWER",
    question:
      "두 SELECT 결과에서 중복을 제거하고 합집합을 구하는 SQL 집합 연산자의 명칭을 쓰시오.",
    answer: ["UNION", "union"],
    explanation:
      "UNION은 중복을 제거합니다. 중복을 그대로 두려면 UNION ALL을 씁니다. INTERSECT는 교집합, EXCEPT/MINUS는 차집합입니다.",
    difficulty: "EASY",
    keywords: ["SQL", "UNION", "집합연산"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_DB_012",
    subject: "데이터베이스구축",
    category: "데이터 모델링",
    subCategory: "카디널리티",
    type: "SHORT_ANSWER",
    question:
      "두 엔터티 사이에서 한 쪽이 다른 쪽과 몇 개의 인스턴스로 대응되는지를 나타내는 관계의 수량 성질의 명칭을 쓰시오.",
    answer: ["카디널리티", "Cardinality", "기수성"],
    explanation:
      "카디널리티는 1:1, 1:N, N:M 등으로 표현합니다. 참여도(Participation, 필수/선택)와 함께 ERD에 표시합니다.",
    difficulty: "MEDIUM",
    keywords: ["ERD", "카디널리티", "관계"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_DB_013",
    subject: "데이터베이스구축",
    category: "트랜잭션",
    subCategory: "교착상태",
    type: "SHORT_ANSWER",
    question:
      "둘 이상의 트랜잭션이 서로 상대가 가진 자원을 기다리며 무한정 대기하는 상태의 명칭을 쓰시오.",
    answer: ["교착 상태", "교착상태", "Deadlock", "데드락"],
    explanation:
      "교착 상태는 상호 배제, 점유와 대기, 비선점, 환형 대기가 모두 성립할 때 발생합니다. 예방·회피·탐지 후 회복으로 다룹니다.",
    difficulty: "EASY",
    keywords: ["교착상태", "Deadlock", "락"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_DB_014",
    subject: "데이터베이스구축",
    category: "스키마",
    subCategory: "3단계",
    type: "SHORT_ANSWER",
    question:
      "ANSI/SPARC 3단계 스키마 중 전체 데이터베이스의 논리적 구조를 정의하는 단계의 명칭을 쓰시오.",
    answer: ["개념 스키마", "개념스키마", "Conceptual Schema"],
    explanation:
      "외부 스키마(사용자 관점) – 개념 스키마(기관 전체 논리) – 내부 스키마(저장 구조)입니다.",
    difficulty: "MEDIUM",
    keywords: ["스키마", "개념스키마", "ANSI/SPARC"],
    source: "암기 보충 생성",
  },

  // ---- 신기술/보안 ----
  {
    id: "MEMO_SEC_001",
    subject: "신기술/보안",
    category: "암호화",
    subCategory: "대칭키",
    type: "SHORT_ANSWER",
    question:
      "암호화와 복호화에 같은 비밀키를 사용하는 방식의 대표 표준으로, DES를 대체한 미국 블록 암호 표준의 영문 약어를 쓰시오.",
    answer: ["AES", "aes"],
    explanation:
      "AES(Advanced Encryption Standard)는 128/192/256비트 키를 쓰는 대칭키 블록 암호입니다. 비대칭키의 대표는 RSA입니다.",
    difficulty: "EASY",
    keywords: ["AES", "대칭키", "암호화"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_SEC_002",
    subject: "신기술/보안",
    category: "암호화",
    subCategory: "전자서명",
    type: "SHORT_ANSWER",
    question:
      "송신자의 개인키로 문서 해시를 암호화하여 첨부하고, 수신자가 공개키로 검증함으로써 위조·부인 방지를 제공하는 기법의 명칭을 쓰시오.",
    answer: ["전자 서명", "전자서명", "Digital Signature"],
    explanation:
      "전자서명은 인증, 무결성, 부인 방지를 제공합니다. 기밀성은 별도 암호화가 필요합니다.",
    difficulty: "EASY",
    keywords: ["전자서명", "공개키", "부인방지"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_SEC_003",
    subject: "신기술/보안",
    category: "보안 공격",
    subCategory: "웹 취약점",
    type: "SHORT_ANSWER",
    question:
      "입력값에 악의적인 SQL 구문을 넣어 인증 우회나 데이터 유출을 일으키는 공격의 영문 명칭을 쓰시오.",
    answer: ["SQL Injection", "SQL 인젝션", "SQLi"],
    explanation:
      "SQL Injection은 Prepared Statement, 입력 검증, 최소 권한으로 막습니다. XSS, CSRF와 함께 웹 3대 취약점으로 자주 출제됩니다.",
    difficulty: "EASY",
    keywords: ["SQL Injection", "웹취약점", "보안"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_SEC_004",
    subject: "신기술/보안",
    category: "보안 공격",
    subCategory: "웹 취약점",
    type: "SHORT_ANSWER",
    question:
      "게시글 등에 악성 스크립트를 저장·반사시켜 다른 사용자의 브라우저에서 실행되게 하는 공격의 영문 약어를 쓰시오.",
    answer: ["XSS", "xss", "Cross Site Scripting"],
    explanation:
      "XSS(Cross-Site Scripting)는 쿠키·세션 탈취에 쓰입니다. 출력 이스케이프와 CSP로 대응합니다. CSRF와 혼동하지 마세요.",
    difficulty: "EASY",
    keywords: ["XSS", "스크립트", "웹취약점"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_SEC_005",
    subject: "신기술/보안",
    category: "접근 통제",
    subCategory: "DAC",
    type: "SHORT_ANSWER",
    question:
      "자원의 소유자가 다른 주체에게 접근 권한을 직접 부여하거나 회수하는 접근 통제 모델의 영문 약어를 쓰시오.",
    answer: ["DAC", "dac", "임의적 접근 통제", "임의 접근 통제"],
    explanation:
      "DAC(Discretionary Access Control)는 소유자 재량입니다. MAC는 보안 등급 강제, RBAC는 역할 기반입니다.",
    difficulty: "MEDIUM",
    keywords: ["DAC", "접근통제", "MAC", "RBAC"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_SEC_006",
    subject: "신기술/보안",
    category: "네트워크 보안",
    subCategory: "IDS/IPS",
    type: "SHORT_ANSWER",
    question:
      "침입을 탐지하는 데 그치지 않고 차단·차단 규칙 적용까지 수행하는 보안 시스템의 영문 약어를 쓰시오.",
    answer: ["IPS", "ips", "침입 방지 시스템"],
    explanation:
      "IDS는 탐지·알림, IPS는 탐지 후 차단입니다. 방화벽은 정책 기반 트래픽 제어입니다.",
    difficulty: "EASY",
    keywords: ["IPS", "IDS", "침입방지"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_SEC_007",
    subject: "신기술/보안",
    category: "신기술",
    subCategory: "컨테이너",
    type: "SHORT_ANSWER",
    question:
      "애플리케이션과 의존성을 하나의 이미지로 묶어 어디서나 동일하게 실행하게 하는 경량 가상화 기술의 일반 명칭을 쓰시오.",
    answer: ["컨테이너", "Container", "도커", "Docker"],
    explanation:
      "컨테이너는 게스트 OS 없이 커널을 공유합니다. Docker가 대표 구현이고, 오케스트레이션은 Kubernetes가 담당합니다.",
    difficulty: "EASY",
    keywords: ["컨테이너", "Docker", "가상화"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_SEC_008",
    subject: "신기술/보안",
    category: "신기술",
    subCategory: "오케스트레이션",
    type: "SHORT_ANSWER",
    question:
      "다수의 컨테이너를 배포·확장·복구하는 오케스트레이션 플랫폼의 대표적인 영문 명칭을 쓰시오.",
    answer: ["Kubernetes", "쿠버네티스", "K8s", "k8s"],
    explanation:
      "Kubernetes는 Pod 단위로 컨테이너를 스케줄링하고 서비스 디스커버리, 오토스케일링을 제공합니다.",
    difficulty: "EASY",
    keywords: ["Kubernetes", "컨테이너", "오케스트레이션"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_SEC_009",
    subject: "신기술/보안",
    category: "신기술",
    subCategory: "클라우드",
    type: "SHORT_ANSWER",
    question:
      "클라우드 서비스 모델 중 운영체제·미들웨어·런타임까지 제공하고, 사용자는 애플리케이션만 올리는 모델의 영문 약어를 쓰시오.",
    answer: ["PaaS", "paas"],
    explanation:
      "IaaS는 인프라, PaaS는 플랫폼, SaaS는 완성된 소프트웨어입니다. 암기: IPS.",
    difficulty: "EASY",
    keywords: ["PaaS", "클라우드", "IaaS", "SaaS"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_SEC_010",
    subject: "신기술/보안",
    category: "신기술",
    subCategory: "블록체인",
    type: "SHORT_ANSWER",
    question:
      "거래 기록을 블록 단위로 연결하고 분산 노드가 공유하여 위변조를 어렵게 하는 분산 원장 기술의 명칭을 쓰시오.",
    answer: ["블록체인", "Blockchain"],
    explanation:
      "블록체인은 해시 체인과 합의 알고리즘으로 무결성을 보장합니다. 공개형·컨소시엄·사설형으로 나뉩니다.",
    difficulty: "EASY",
    keywords: ["블록체인", "분산원장", "해시"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_SEC_011",
    subject: "신기술/보안",
    category: "네트워크",
    subCategory: "NAT",
    type: "SHORT_ANSWER",
    question:
      "사설 IP를 공인 IP로 변환하여 인터넷에 접속하게 하고, 내부 주소를 숨기는 주소 변환 기술의 영문 약어를 쓰시오.",
    answer: ["NAT", "nat", "Network Address Translation"],
    explanation:
      "NAT는 IPv4 주소 부족을 완화하고 내부 토폴로지를 숨깁니다. NAPT/PAT는 포트까지 변환합니다.",
    difficulty: "EASY",
    keywords: ["NAT", "사설IP", "네트워크"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_SEC_012",
    subject: "신기술/보안",
    category: "네트워크",
    subCategory: "DNS",
    type: "SHORT_ANSWER",
    question:
      "도메인 이름을 IP 주소로 변환하는 분산 데이터베이스 시스템의 영문 약어를 쓰시오.",
    answer: ["DNS", "dns", "Domain Name System"],
    explanation:
      "DNS는 계층적 이름 해석을 제공합니다. 기본 포트는 UDP/TCP 53입니다.",
    difficulty: "EASY",
    keywords: ["DNS", "도메인", "53"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_SEC_013",
    subject: "신기술/보안",
    category: "신기술",
    subCategory: "엣지컴퓨팅",
    type: "SHORT_ANSWER",
    question:
      "데이터를 중앙 클라우드가 아니라 단말·기지국 근처에서 처리하여 지연을 줄이는 컴퓨팅 패러다임의 명칭을 쓰시오.",
    answer: ["엣지 컴퓨팅", "에지 컴퓨팅", "Edge Computing"],
    explanation:
      "엣지 컴퓨팅은 IoT·자율주행처럼 실시간성이 중요한 서비스에 쓰입니다. 포그 컴퓨팅과 함께 출제됩니다.",
    difficulty: "MEDIUM",
    keywords: ["엣지컴퓨팅", "IoT", "지연"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_SEC_014",
    subject: "신기술/보안",
    category: "암호화",
    subCategory: "PKI",
    type: "SHORT_ANSWER",
    question:
      "공개키와 소유자를 공인인증서로 묶어 주고, 인증서 발급·폐기를 관리하는 기반 구조의 영문 약어를 쓰시오.",
    answer: ["PKI", "pki", "Public Key Infrastructure"],
    explanation:
      "PKI는 CA, RA, 인증서, CRL/OCSP로 구성됩니다. 전자서명과 HTTPS(TLS)의 신뢰 기반입니다.",
    difficulty: "MEDIUM",
    keywords: ["PKI", "인증서", "CA"],
    source: "암기 보충 생성",
  },

  // ---- 정보시스템구축관리 ----
  {
    id: "MEMO_IS_001",
    subject: "정보시스템구축관리",
    category: "프로젝트 관리",
    subCategory: "WBS",
    type: "SHORT_ANSWER",
    question:
      "프로젝트를 관리 가능한 작업 단위로 계층적으로 분해한 산출물의 영문 약어를 쓰시오.",
    answer: ["WBS", "wbs", "Work Breakdown Structure"],
    explanation:
      "WBS는 범위 관리의 핵심입니다. 작업 패키지까지 분해하면 일정·원가 산정이 쉬워집니다.",
    difficulty: "EASY",
    keywords: ["WBS", "범위관리", "프로젝트"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_IS_002",
    subject: "정보시스템구축관리",
    category: "프로젝트 관리",
    subCategory: "일정",
    type: "SHORT_ANSWER",
    question:
      "프로젝트 일정 네트워크에서 여유 시간이 0인 작업들의 경로로, 지연되면 전체 완료일이 밀리는 경로의 명칭을 쓰시오.",
    answer: ["임계 경로", "임계경로", "Critical Path", "CP"],
    explanation:
      "임계 경로는 CPM에서 가장 긴 경로입니다. 여유(Float/Slack)가 0인 활동들의 연결입니다.",
    difficulty: "EASY",
    keywords: ["CPM", "임계경로", "일정관리"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_IS_003",
    subject: "정보시스템구축관리",
    category: "프로젝트 관리",
    subCategory: "PERT",
    type: "SHORT_ANSWER",
    question:
      "낙관·정상·비관 시간을 이용해 활동 기댓값을 계산하는 확률적 일정 기법의 영문 약어를 쓰시오.",
    answer: ["PERT", "pert"],
    explanation:
      "PERT 기댓값은 (낙관 + 4×정상 + 비관) / 6 입니다. CPM은 확정적 기간을 씁니다.",
    difficulty: "MEDIUM",
    keywords: ["PERT", "일정", "3점산정"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_IS_004",
    subject: "정보시스템구축관리",
    category: "프로세스 모델",
    subCategory: "폭포수",
    type: "SHORT_ANSWER",
    question:
      "요구분석부터 유지보수까지 단계를 한 방향으로만 진행하고, 이전 단계가 끝나야 다음 단계로 가는 고전적 생명주기 모델의 명칭을 쓰시오.",
    answer: ["폭포수 모델", "폭포수", "Waterfall", "워터폴"],
    explanation:
      "폭포수 모델은 문서와 단계 산출물이 명확하지만 요구 변경에 약합니다. 프로토타입·나선형·애자일과 비교 출제됩니다.",
    difficulty: "EASY",
    keywords: ["폭포수", "생명주기", "SDLC"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_IS_005",
    subject: "정보시스템구축관리",
    category: "프로세스 모델",
    subCategory: "나선형",
    type: "SHORT_ANSWER",
    question:
      "계획, 위험 분석, 개발, 평가를 반복하며 위험을 줄여 가는 생명주기 모델의 명칭을 쓰시오.",
    answer: ["나선형 모델", "스파이럴 모델", "Spiral", "나선형"],
    explanation:
      "나선형(Spiral) 모델은 위험 분석이 핵심입니다. 대규모·고위험 프로젝트에 적합합니다.",
    difficulty: "MEDIUM",
    keywords: ["나선형", "위험분석", "Spiral"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_IS_006",
    subject: "정보시스템구축관리",
    category: "품질",
    subCategory: "CMMI",
    type: "SHORT_ANSWER",
    question:
      "조직의 프로세스 성숙도를 5단계(초기~최적화)로 평가하는 모델의 영문 약어를 쓰시오.",
    answer: ["CMMI", "cmmi"],
    explanation:
      "CMMI 단계는 Initial, Managed, Defined, Quantitatively Managed, Optimizing 입니다.",
    difficulty: "MEDIUM",
    keywords: ["CMMI", "성숙도", "프로세스"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_IS_007",
    subject: "정보시스템구축관리",
    category: "IT 서비스",
    subCategory: "ITIL",
    type: "SHORT_ANSWER",
    question:
      "IT 서비스 관리 모범 사례 프레임워크로, 서비스 전략·설계·전환·운영·개선을 다루는 체계의 영문 약어를 쓰시오.",
    answer: ["ITIL", "itil"],
    explanation:
      "ITIL은 ITSM의 대표 프레임워크입니다. 인시던트·문제·변경·구성 관리 프로세스가 자주 출제됩니다.",
    difficulty: "MEDIUM",
    keywords: ["ITIL", "ITSM", "서비스관리"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_IS_008",
    subject: "정보시스템구축관리",
    category: "IT 서비스",
    subCategory: "인시던트",
    type: "SHORT_ANSWER",
    question:
      "IT 서비스의 예상치 못한 중단이나 품질 저하를 가능한 한 빨리 정상으로 되돌리는 ITIL 프로세스의 명칭을 쓰시오.",
    answer: ["인시던트 관리", "Incident Management", "장애 관리"],
    explanation:
      "인시던트 관리는 빠른 복구가 목표입니다. 근본 원인 제거는 문제 관리(Problem Management)의 몫입니다.",
    difficulty: "MEDIUM",
    keywords: ["인시던트", "ITIL", "문제관리"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_IS_009",
    subject: "정보시스템구축관리",
    category: "프로젝트 관리",
    subCategory: "간트차트",
    type: "SHORT_ANSWER",
    question:
      "가로축을 시간, 세로축을 활동으로 두고 막대로 일정을 표현하는 차트 기법의 명칭을 쓰시오.",
    answer: ["간트 차트", "간트차트", "Gantt Chart", "갠트 차트"],
    explanation:
      "간트 차트는 일정 현황을 직관적으로 보여 줍니다. 의존 관계와 임계 경로는 네트워크 다이어그램이 더 적합합니다.",
    difficulty: "EASY",
    keywords: ["간트차트", "일정", "시각화"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_IS_010",
    subject: "정보시스템구축관리",
    category: "보안 관리",
    subCategory: "감리",
    type: "SHORT_ANSWER",
    question:
      "정보시스템 구축 과정에서 제3자가 절차와 산출물의 적정성을 독립적으로 점검하는 활동의 명칭을 쓰시오.",
    answer: ["정보시스템 감리", "감리", "감리 활동"],
    explanation:
      "감리는 발주자 입장에서 구축의 품질·일정·보안을 점검합니다. 착수·중간·최종 감리로 나뉩니다.",
    difficulty: "EASY",
    keywords: ["감리", "정보시스템", "품질"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_IS_011",
    subject: "정보시스템구축관리",
    category: "표준",
    subCategory: "ISO",
    type: "SHORT_ANSWER",
    question:
      "소프트웨어 생명주기 프로세스를 정의한 국제 표준 번호로, 획득·공급·개발·운영·유지보수 등을 포함하는 표준의 명칭을 쓰시오. (예: ISO 12207)",
    answer: ["ISO 12207", "ISO12207", "ISO/IEC 12207"],
    explanation:
      "ISO/IEC 12207은 소프트웨어 생명주기 프로세스 표준입니다. ISO 21500은 프로젝트 관리 지침입니다.",
    difficulty: "HARD",
    keywords: ["ISO 12207", "생명주기", "표준"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_IS_012",
    subject: "정보시스템구축관리",
    category: "위험 관리",
    subCategory: "대응",
    type: "SHORT_ANSWER",
    question:
      "위험 대응 전략 중 위험을 다른 조직에 넘기는 방법(보험, 외주 등)의 명칭을 쓰시오.",
    answer: ["전가", "위험 전가", "Transfer", "전이"],
    explanation:
      "위험 대응은 회피(Avoid), 전가(Transfer), 완화(Mitigate), 수용(Accept) 네 가지가 기본입니다.",
    difficulty: "MEDIUM",
    keywords: ["위험관리", "전가", "대응전략"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_IS_013",
    subject: "정보시스템구축관리",
    category: "품질",
    subCategory: "형상관리",
    type: "SHORT_ANSWER",
    question:
      "소프트웨어 산출물의 식별, 버전 통제, 변경 통제, 상태 보고를 수행하는 관리 활동의 명칭을 쓰시오.",
    answer: ["형상 관리", "형상관리", "SCM", "Software Configuration Management"],
    explanation:
      "형상 관리는 무엇이 바뀌었는지 추적하고 베이스라인을 유지합니다. Git 등 버전관리 도구가 이를 지원합니다.",
    difficulty: "EASY",
    keywords: ["형상관리", "SCM", "버전관리"],
    source: "암기 보충 생성",
  },
  {
    id: "MEMO_IS_014",
    subject: "정보시스템구축관리",
    category: "프로세스 모델",
    subCategory: "프로토타입",
    type: "SHORT_ANSWER",
    question:
      "사용자의 요구를 일찍 확인하기 위해 핵심 기능의 시험용 시스템을 먼저 만들어 피드백을 받는 모델의 명칭을 쓰시오.",
    answer: ["프로토타입 모델", "프로토타이핑", "Prototype", "프로토타입"],
    explanation:
      "프로토타입 모델은 요구가 불명확할 때 유용합니다. 폐기형과 진화형이 있습니다.",
    difficulty: "EASY",
    keywords: ["프로토타입", "요구사항", "SDLC"],
    source: "암기 보충 생성",
  },
];
