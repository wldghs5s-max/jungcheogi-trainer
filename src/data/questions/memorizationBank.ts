import { Question } from '../../types/question';

/**
 * 2026 정보처리기사 실기 출제기준 완벽 대비 핵심 문제 은행.
 * 총 874문항 (실기 12대 공식 영역 및 공백 전수 보강 완료).
 * 100% 오프라인 동작 및 모바일 반복 학습 최적화.
 */
export const MEMORIZATION_BANK: Question[] = [
  {
    "id": "MEMO_SE_001",
    "subject": "소프트웨어설계",
    "category": "UML",
    "subCategory": "유스케이스",
    "type": "SHORT_ANSWER",
    "question": "시스템이 제공하는 기능과 그 기능을 사용하는 외부 액터(Actor) 사이의 관계를 표현하여 요구사항을 모델링하는 UML 다이어그램의 명칭을 쓰시오.",
    "answer": [
      "유스케이스 다이어그램",
      "유스케이스",
      "Use Case Diagram",
      "Use Case"
    ],
    "explanation": "유스케이스 다이어그램은 액터와 유스케이스, 시스템 경계를 보여 주어 기능적 요구사항을 한눈에 파악하게 합니다.",
    "difficulty": "EASY",
    "keywords": [
      "UML",
      "유스케이스",
      "액터",
      "요구사항"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SE_002",
    "subject": "소프트웨어설계",
    "category": "UML",
    "subCategory": "시퀀스",
    "type": "SHORT_ANSWER",
    "question": "객체 사이의 메시지 송수신을 시간 순서(위에서 아래)로 표현하는 UML 다이어그램의 명칭을 쓰시오.",
    "answer": [
      "시퀀스 다이어그램",
      "순차 다이어그램",
      "Sequence Diagram"
    ],
    "explanation": "시퀀스(순차) 다이어그램은 생명선과 메시지를 시간축으로 나열하여 객체 간 상호작용 순서를 나타냅니다.",
    "difficulty": "EASY",
    "keywords": [
      "UML",
      "시퀀스",
      "메시지",
      "상호작용"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SE_003",
    "subject": "소프트웨어설계",
    "category": "디자인 패턴",
    "subCategory": "생성 패턴",
    "type": "SHORT_ANSWER",
    "question": "객체 생성 인터페이스는 부모에 두고, 어떤 클래스의 인스턴스를 만들지는 서브클래스가 결정하게 하는 GoF 생성 패턴의 명칭을 쓰시오.",
    "answer": [
      "팩토리 메서드",
      "팩토리 메소드",
      "Factory Method",
      "팩토리메서드"
    ],
    "explanation": "팩토리 메서드 패턴은 new를 서브클래스의 팩토리 메서드로 미뤄 생성 책임을 분리합니다. 단순 팩토리, 추상 팩토리와 구분합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "디자인패턴",
      "팩토리 메서드",
      "생성패턴"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SE_004",
    "subject": "소프트웨어설계",
    "category": "디자인 패턴",
    "subCategory": "구조 패턴",
    "type": "SHORT_ANSWER",
    "question": "호환되지 않는 인터페이스를 가진 클래스를 클라이언트가 기대하는 인터페이스로 변환해 주는 GoF 구조 패턴의 명칭을 쓰시오.",
    "answer": [
      "어댑터",
      "어댑터 패턴",
      "Adapter",
      "어댑터패턴"
    ],
    "explanation": "어댑터 패턴은 기존 클래스를 수정하지 않고 다른 인터페이스에 맞출 때 사용합니다. 래퍼(Wrapper)라고도 합니다.",
    "difficulty": "EASY",
    "keywords": [
      "디자인패턴",
      "어댑터",
      "인터페이스"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SE_005",
    "subject": "소프트웨어설계",
    "category": "소프트웨어 테스트",
    "subCategory": "경계값",
    "type": "SHORT_ANSWER",
    "question": "입력 조건의 경계에 해당하는 값과 그 바로 안팎의 값을 테스트 케이스로 선택하는 블랙박스 기법의 명칭을 쓰시오.",
    "answer": [
      "경계값 분석",
      "경계값 분석 기법",
      "경계값검사",
      "Boundary Value Analysis",
      "BVA"
    ],
    "explanation": "오류는 경계 부근에서 자주 발생합니다. 동등 분할로 나눈 구간의 최솟값·최댓값과 그 인접값을 검사합니다.",
    "difficulty": "EASY",
    "keywords": [
      "블랙박스",
      "경계값 분석",
      "테스트"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SE_006",
    "subject": "소프트웨어설계",
    "category": "소프트웨어 테스트",
    "subCategory": "커버리지",
    "type": "SHORT_ANSWER",
    "question": "화이트박스 테스트에서 프로그램의 모든 문장(Statement)이 적어도 한 번은 실행되도록 하는 검증 기준의 명칭을 쓰시오.",
    "answer": [
      "구문 커버리지",
      "문장 커버리지",
      "Statement Coverage"
    ],
    "explanation": "구문 커버리지는 가장 약한 기준입니다. 분기(결정) 커버리지, 조건 커버리지, 경로 커버리지로 갈수록 엄격해집니다.",
    "difficulty": "EASY",
    "keywords": [
      "화이트박스",
      "구문 커버리지",
      "테스트커버리지"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SE_007",
    "subject": "소프트웨어설계",
    "category": "아키텍처",
    "subCategory": "MVC",
    "type": "SHORT_ANSWER",
    "question": "응용을 모델(Model), 뷰(View), 컨트롤러(Controller)로 나누어 데이터·화면·제어를 분리하는 아키텍처 패턴의 영문 약어를 쓰시오.",
    "answer": [
      "MVC",
      "mvc"
    ],
    "explanation": "MVC는 비즈니스 로직(Model), 사용자 인터페이스(View), 입력을 조율하는 Controller를 분리해 유지보수를 쉽게 합니다.",
    "difficulty": "EASY",
    "keywords": [
      "아키텍처",
      "MVC",
      "설계패턴"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SE_008",
    "subject": "소프트웨어설계",
    "category": "요구사항",
    "subCategory": "개발 프로세스",
    "type": "SHORT_ANSWER",
    "question": "요구공학에서 요구사항을 수집·발견하는 활동부터 분석, 명세, 확인까지 이어지는 네 단계 중 이해관계자로부터 요구를 이끌어 내는 첫 단계의 명칭을 쓰시오.",
    "answer": [
      "요구사항 도출",
      "도출",
      "Elicitation",
      "요구 도출"
    ],
    "explanation": "요구사항 개발은 도출(Elicitation) → 분석(Analysis) → 명세(Specification) → 확인(Validation) 순으로 진행됩니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "요구공학",
      "도출",
      "분석",
      "명세"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SE_009",
    "subject": "소프트웨어설계",
    "category": "애자일",
    "subCategory": "스크럼",
    "type": "SHORT_ANSWER",
    "question": "스크럼에서 제품 백로그의 우선순위를 결정하고 제품의 가치에 책임을 지는 역할의 영문 명칭을 쓰시오.",
    "answer": [
      "Product Owner",
      "PO",
      "제품 책임자",
      "프로덕트 오너"
    ],
    "explanation": "Product Owner는 백로그를 관리합니다. Scrum Master는 프로세스 촉진, Development Team은 실제 구현을 담당합니다.",
    "difficulty": "EASY",
    "keywords": [
      "스크럼",
      "Product Owner",
      "애자일"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SE_010",
    "subject": "소프트웨어설계",
    "category": "애자일",
    "subCategory": "XP",
    "type": "SHORT_ANSWER",
    "question": "XP(eXtreme Programming)의 핵심 실천 중 두 사람이 한 컴퓨터에서 함께 코드를 작성하는 기법의 명칭을 쓰시오.",
    "answer": [
      "페어 프로그래밍",
      "짝 프로그래밍",
      "Pair Programming"
    ],
    "explanation": "페어 프로그래밍은 드라이버와 내비게이터가 역할을 나누어 결함을 일찍 찾고 지식을 공유합니다.",
    "difficulty": "EASY",
    "keywords": [
      "XP",
      "페어프로그래밍",
      "애자일"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SE_011",
    "subject": "소프트웨어설계",
    "category": "모듈화",
    "subCategory": "정보은닉",
    "type": "SHORT_ANSWER",
    "question": "모듈 내부의 상세 구현을 외부에 숨기고, 공개된 인터페이스로만 접근하게 하여 변경의 영향을 줄이는 설계 원리의 명칭을 쓰시오.",
    "answer": [
      "정보 은닉",
      "정보은닉",
      "Information Hiding"
    ],
    "explanation": "정보 은닉은 캡슐화와 함께 모듈 독립성을 높입니다. 내부 자료구조가 바뀌어도 인터페이스가 같으면 호출부는 수정하지 않아도 됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "정보은닉",
      "캡슐화",
      "모듈화"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SE_012",
    "subject": "소프트웨어설계",
    "category": "형상관리",
    "subCategory": "베이스라인",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 형상 관리에서 공식 검토와 승인을 거쳐 확정된 상태로, 이후 시스템 변경을 통제하고 비교하기 위한 기초가 되는 공식적인 상태의 명칭을 영문 또는 한글로 쓰시오.",
    "answer": [
      "베이스라인",
      "Baseline",
      "기준선"
    ],
    "explanation": "베이스라인은 합의된 형상의 스냅샷입니다. 이후 변경은 CCB(형상통제위원회) 등 공식 절차를 거칩니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "형상관리",
      "베이스라인",
      "변경통제"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SE_013",
    "subject": "소프트웨어설계",
    "category": "디자인 패턴",
    "subCategory": "행위 패턴",
    "type": "SHORT_ANSWER",
    "question": "알고리즘 계열을 캡슐화하고 실행 중에 교체할 수 있게 하는 GoF 행위 패턴의 명칭을 쓰시오.",
    "answer": [
      "전략",
      "전략 패턴",
      "Strategy",
      "Strategy Pattern"
    ],
    "explanation": "전략 패턴은 조건문으로 얽힌 알고리즘을 객체로 분리합니다. 결제 수단, 정렬 방식 교체 등에 쓰입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "디자인패턴",
      "전략",
      "Strategy"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SE_014",
    "subject": "소프트웨어설계",
    "category": "UML",
    "subCategory": "클래스",
    "type": "SHORT_ANSWER",
    "question": "시스템의 클래스, 속성, 연산과 클래스 간 관계(연관, 일반화, 의존 등)를 정적으로 표현하는 UML 다이어그램의 명칭을 쓰시오.",
    "answer": [
      "클래스 다이어그램",
      "Class Diagram"
    ],
    "explanation": "클래스 다이어그램은 구조(정적) 관점의 핵심 산출물입니다. 시퀀스·활동 다이어그램은 행위(동적) 관점입니다.",
    "difficulty": "EASY",
    "keywords": [
      "UML",
      "클래스 다이어그램",
      "정적모델링"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_DB_001",
    "subject": "데이터베이스구축",
    "category": "정규화",
    "subCategory": "2NF",
    "type": "SHORT_ANSWER",
    "question": "기본키가 복합키일 때, 기본키의 일부에만 종속되는 부분 함수 종속을 제거하여 만족시키는 정규형의 명칭을 쓰시오.",
    "answer": [
      "제2정규형",
      "2NF",
      "제 2정규형"
    ],
    "explanation": "1NF는 원자값, 2NF는 부분 함수 종속 제거, 3NF는 이행 함수 종속 제거입니다. 암기: 도원부이결다조.",
    "difficulty": "MEDIUM",
    "keywords": [
      "정규화",
      "2NF",
      "부분함수종속"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_DB_002",
    "subject": "데이터베이스구축",
    "category": "정규화",
    "subCategory": "3NF",
    "type": "SHORT_ANSWER",
    "question": "기본키가 아닌 속성이 다른 비키 속성을 결정하는 이행 함수 종속을 제거한 정규형의 명칭을 쓰시오.",
    "answer": [
      "제3정규형",
      "3NF",
      "제 3정규형"
    ],
    "explanation": "3NF는 A→B, B→C일 때 A→C인 이행 종속을 분해하여 제거합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "정규화",
      "3NF",
      "이행종속"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_DB_003",
    "subject": "데이터베이스구축",
    "category": "키",
    "subCategory": "후보키",
    "type": "SHORT_ANSWER",
    "question": "릴레이션에서 튜플을 유일하게 식별할 수 있는 속성 또는 속성 집합으로, 유일성과 최소성을 모두 만족하는 키의 명칭을 쓰시오.",
    "answer": [
      "후보키",
      "Candidate Key",
      "후보 키"
    ],
    "explanation": "후보키 중 하나를 기본키로 선정합니다. 나머지 후보키는 대체키(Alternate Key)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "후보키",
      "기본키",
      "유일성",
      "최소성"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_DB_004",
    "subject": "데이터베이스구축",
    "category": "키",
    "subCategory": "외래키",
    "type": "SHORT_ANSWER",
    "question": "다른 릴레이션의 기본키를 참조하는 속성으로, 참조 무결성을 지키는 키의 명칭을 쓰시오.",
    "answer": [
      "외래키",
      "외래 키",
      "Foreign Key",
      "FK"
    ],
    "explanation": "외래키 값은 참조하는 릴레이션의 기본키 값과 같거나 NULL이어야 합니다(참조 무결성).",
    "difficulty": "EASY",
    "keywords": [
      "외래키",
      "참조무결성",
      "FK"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_DB_005",
    "subject": "데이터베이스구축",
    "category": "SQL",
    "subCategory": "조인",
    "type": "SHORT_ANSWER",
    "question": "두 테이블에서 조인 조건을 만족하는 행만 결합하고, 조건에 맞지 않는 행은 결과에서 제외하는 조인의 명칭을 쓰시오.",
    "answer": [
      "내부 조인",
      "이너 조인",
      "Inner Join",
      "EQUI JOIN",
      "등가 조인"
    ],
    "explanation": "INNER JOIN(등가 조인이 대표적)은 일치하는 행만 반환합니다. 일치하지 않는 행까지 남기려면 OUTER JOIN을 씁니다.",
    "difficulty": "EASY",
    "keywords": [
      "SQL",
      "INNER JOIN",
      "조인"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_DB_006",
    "subject": "데이터베이스구축",
    "category": "트랜잭션",
    "subCategory": "격리수준",
    "type": "SHORT_ANSWER",
    "question": "트랜잭션 격리 수준 중 가장 낮아 Dirty Read, Non-Repeatable Read, Phantom Read가 모두 발생할 수 있는 수준의 영문 명칭을 쓰시오.",
    "answer": [
      "READ UNCOMMITTED",
      "Read Uncommitted"
    ],
    "explanation": "격리 수준은 READ UNCOMMITTED < READ COMMITTED < REPEATABLE READ < SERIALIZABLE 순으로 엄격해집니다.",
    "difficulty": "HARD",
    "keywords": [
      "격리수준",
      "Dirty Read",
      "트랜잭션"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_DB_007",
    "subject": "데이터베이스구축",
    "category": "트랜잭션",
    "subCategory": "ACID",
    "type": "SHORT_ANSWER",
    "question": "트랜잭션의 연산이 모두 반영되거나 모두 취소되어야 하며, 일부만 반영되면 안 된다는 ACID 특성의 명칭을 쓰시오.",
    "answer": [
      "원자성",
      "Atomicity",
      "원자성(Atomicity)"
    ],
    "explanation": "원자성(Atomicity)은 All or Nothing입니다. 장애 시 UNDO로 미완료 트랜잭션을 철회합니다.",
    "difficulty": "EASY",
    "keywords": [
      "ACID",
      "원자성",
      "Atomicity"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_DB_008",
    "subject": "데이터베이스구축",
    "category": "인덱스",
    "subCategory": "B-Tree",
    "type": "SHORT_ANSWER",
    "question": "데이터베이스에서 검색 성능을 높이기 위해 컬럼 값과 해당 레코드 위치를 별도의 자료구조로 유지하는 객체의 명칭을 쓰시오.",
    "answer": [
      "인덱스",
      "Index",
      "색인"
    ],
    "explanation": "인덱스는 탐색을 빠르게 하지만 입력·수정·삭제 비용과 저장 공간을 늘립니다. B-Tree 인덱스가 일반적입니다.",
    "difficulty": "EASY",
    "keywords": [
      "인덱스",
      "B-Tree",
      "성능"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_DB_009",
    "subject": "데이터베이스구축",
    "category": "이상현상",
    "subCategory": "갱신이상",
    "type": "SHORT_ANSWER",
    "question": "정규화가 안 된 테이블에서 동일 데이터가 여러 곳에 중복되어, 일부를 수정하면 데이터가 불일치하는 현상의 명칭을 쓰시오.",
    "answer": [
      "갱신 이상",
      "수정 이상",
      "Update Anomaly"
    ],
    "explanation": "이상 현상은 삽입 이상, 삭제 이상, 갱신(수정) 이상입니다. 정규화로 중복을 제거해 줄입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "이상현상",
      "갱신이상",
      "정규화"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_DB_010",
    "subject": "데이터베이스구축",
    "category": "SQL",
    "subCategory": "뷰",
    "type": "SHORT_ANSWER",
    "question": "하나 이상의 테이블을 조회한 결과를 가상의 테이블처럼 사용하는 SQL 객체의 명칭을 쓰시오.",
    "answer": [
      "뷰",
      "View",
      "뷰(View)"
    ],
    "explanation": "뷰는 저장된 질의입니다. 보안(컬럼 숨김)과 단순 조회에 쓰이며, 일부는 갱신이 제한됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "뷰",
      "View",
      "가상테이블"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_DB_011",
    "subject": "데이터베이스구축",
    "category": "SQL",
    "subCategory": "집합연산",
    "type": "SHORT_ANSWER",
    "question": "두 SELECT 결과에서 중복을 제거하고 합집합을 구하는 SQL 집합 연산자의 명칭을 쓰시오.",
    "answer": [
      "UNION",
      "union"
    ],
    "explanation": "UNION은 중복을 제거합니다. 중복을 그대로 두려면 UNION ALL을 씁니다. INTERSECT는 교집합, EXCEPT/MINUS는 차집합입니다.",
    "difficulty": "EASY",
    "keywords": [
      "SQL",
      "UNION",
      "집합연산"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_DB_012",
    "subject": "데이터베이스구축",
    "category": "데이터 모델링",
    "subCategory": "카디널리티",
    "type": "SHORT_ANSWER",
    "question": "두 엔터티 사이에서 한 쪽이 다른 쪽과 몇 개의 인스턴스로 대응되는지를 나타내는 관계의 수량 성질의 명칭을 쓰시오.",
    "answer": [
      "카디널리티",
      "Cardinality",
      "기수성"
    ],
    "explanation": "카디널리티는 1:1, 1:N, N:M 등으로 표현합니다. 참여도(Participation, 필수/선택)와 함께 ERD에 표시합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "ERD",
      "카디널리티",
      "관계"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_DB_013",
    "subject": "데이터베이스구축",
    "category": "트랜잭션",
    "subCategory": "교착상태",
    "type": "SHORT_ANSWER",
    "question": "둘 이상의 트랜잭션이 서로 상대가 가진 자원을 기다리며 무한정 대기하는 상태의 명칭을 쓰시오.",
    "answer": [
      "교착 상태",
      "교착상태",
      "Deadlock",
      "데드락"
    ],
    "explanation": "교착 상태는 상호 배제, 점유와 대기, 비선점, 환형 대기가 모두 성립할 때 발생합니다. 예방·회피·탐지 후 회복으로 다룹니다.",
    "difficulty": "EASY",
    "keywords": [
      "교착상태",
      "Deadlock",
      "락"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_DB_014",
    "subject": "데이터베이스구축",
    "category": "스키마",
    "subCategory": "3단계",
    "type": "SHORT_ANSWER",
    "question": "ANSI/SPARC 3단계 스키마 중 전체 데이터베이스의 논리적 구조를 정의하는 단계의 명칭을 쓰시오.",
    "answer": [
      "개념 스키마",
      "개념스키마",
      "Conceptual Schema"
    ],
    "explanation": "외부 스키마(사용자 관점) – 개념 스키마(기관 전체 논리) – 내부 스키마(저장 구조)입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "스키마",
      "개념스키마",
      "ANSI/SPARC"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SEC_001",
    "subject": "신기술/보안",
    "category": "암호화",
    "subCategory": "대칭키",
    "type": "SHORT_ANSWER",
    "question": "암호화와 복호화에 같은 비밀키를 사용하는 방식의 대표 표준으로, DES를 대체한 미국 블록 암호 표준의 영문 약어를 쓰시오.",
    "answer": [
      "AES",
      "aes"
    ],
    "explanation": "AES(Advanced Encryption Standard)는 128/192/256비트 키를 쓰는 대칭키 블록 암호입니다. 비대칭키의 대표는 RSA입니다.",
    "difficulty": "EASY",
    "keywords": [
      "AES",
      "대칭키",
      "암호화"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SEC_002",
    "subject": "신기술/보안",
    "category": "암호화",
    "subCategory": "전자서명",
    "type": "SHORT_ANSWER",
    "question": "송신자의 개인키로 문서 해시를 암호화하여 첨부하고, 수신자가 공개키로 검증함으로써 위조·부인 방지를 제공하는 기법의 명칭을 쓰시오.",
    "answer": [
      "전자 서명",
      "전자서명",
      "Digital Signature"
    ],
    "explanation": "전자서명은 인증, 무결성, 부인 방지를 제공합니다. 기밀성은 별도 암호화가 필요합니다.",
    "difficulty": "EASY",
    "keywords": [
      "전자서명",
      "공개키",
      "부인방지"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SEC_003",
    "subject": "신기술/보안",
    "category": "보안 공격",
    "subCategory": "웹 취약점",
    "type": "SHORT_ANSWER",
    "question": "입력값에 악의적인 SQL 구문을 넣어 인증 우회나 데이터 유출을 일으키는 공격의 영문 명칭을 쓰시오.",
    "answer": [
      "SQL Injection",
      "SQL 인젝션",
      "SQLi"
    ],
    "explanation": "SQL Injection은 Prepared Statement, 입력 검증, 최소 권한으로 막습니다. XSS, CSRF와 함께 웹 3대 취약점으로 자주 출제됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "SQL Injection",
      "웹취약점",
      "보안"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SEC_004",
    "subject": "신기술/보안",
    "category": "보안 공격",
    "subCategory": "웹 취약점",
    "type": "SHORT_ANSWER",
    "question": "게시글 등에 악성 스크립트를 저장·반사시켜 다른 사용자의 브라우저에서 실행되게 하는 공격의 영문 약어를 쓰시오.",
    "answer": [
      "XSS",
      "xss",
      "Cross Site Scripting"
    ],
    "explanation": "XSS(Cross-Site Scripting)는 쿠키·세션 탈취에 쓰입니다. 출력 이스케이프와 CSP로 대응합니다. CSRF와 혼동하지 마세요.",
    "difficulty": "EASY",
    "keywords": [
      "XSS",
      "스크립트",
      "웹취약점"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SEC_005",
    "subject": "신기술/보안",
    "category": "접근 통제",
    "subCategory": "DAC",
    "type": "SHORT_ANSWER",
    "question": "자원의 소유자가 다른 주체에게 접근 권한을 직접 부여하거나 회수하는 접근 통제 모델의 영문 약어를 쓰시오.",
    "answer": [
      "DAC",
      "dac",
      "임의적 접근 통제",
      "임의 접근 통제"
    ],
    "explanation": "DAC(Discretionary Access Control)는 소유자 재량입니다. MAC는 보안 등급 강제, RBAC는 역할 기반입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "DAC",
      "접근통제",
      "MAC",
      "RBAC"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SEC_006",
    "subject": "신기술/보안",
    "category": "네트워크 보안",
    "subCategory": "IDS/IPS",
    "type": "SHORT_ANSWER",
    "question": "침입을 탐지하는 데 그치지 않고 차단·차단 규칙 적용까지 수행하는 보안 시스템의 영문 약어를 쓰시오.",
    "answer": [
      "IPS",
      "ips",
      "침입 방지 시스템"
    ],
    "explanation": "IDS는 탐지·알림, IPS는 탐지 후 차단입니다. 방화벽은 정책 기반 트래픽 제어입니다.",
    "difficulty": "EASY",
    "keywords": [
      "IPS",
      "IDS",
      "침입방지"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SEC_007",
    "subject": "신기술/보안",
    "category": "신기술",
    "subCategory": "컨테이너",
    "type": "SHORT_ANSWER",
    "question": "애플리케이션과 의존성을 하나의 이미지로 묶어 어디서나 동일하게 실행하게 하는 경량 가상화 기술의 일반 명칭을 쓰시오.",
    "answer": [
      "컨테이너",
      "Container",
      "도커",
      "Docker"
    ],
    "explanation": "컨테이너는 게스트 OS 없이 커널을 공유합니다. Docker가 대표 구현이고, 오케스트레이션은 Kubernetes가 담당합니다.",
    "difficulty": "EASY",
    "keywords": [
      "컨테이너",
      "Docker",
      "가상화"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SEC_008",
    "subject": "신기술/보안",
    "category": "신기술",
    "subCategory": "오케스트레이션",
    "type": "SHORT_ANSWER",
    "question": "다수의 컨테이너를 배포·확장·복구하는 오케스트레이션 플랫폼의 대표적인 영문 명칭을 쓰시오.",
    "answer": [
      "Kubernetes",
      "쿠버네티스",
      "K8s",
      "k8s"
    ],
    "explanation": "Kubernetes는 Pod 단위로 컨테이너를 스케줄링하고 서비스 디스커버리, 오토스케일링을 제공합니다.",
    "difficulty": "EASY",
    "keywords": [
      "Kubernetes",
      "컨테이너",
      "오케스트레이션"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SEC_009",
    "subject": "신기술/보안",
    "category": "신기술",
    "subCategory": "클라우드",
    "type": "SHORT_ANSWER",
    "question": "클라우드 서비스 모델 중 운영체제·미들웨어·런타임까지 제공하고, 사용자는 애플리케이션만 올리는 모델의 영문 약어를 쓰시오.",
    "answer": [
      "PaaS",
      "paas"
    ],
    "explanation": "IaaS는 인프라, PaaS는 플랫폼, SaaS는 완성된 소프트웨어입니다. 암기: IPS.",
    "difficulty": "EASY",
    "keywords": [
      "PaaS",
      "클라우드",
      "IaaS",
      "SaaS"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SEC_010",
    "subject": "신기술/보안",
    "category": "신기술",
    "subCategory": "블록체인",
    "type": "SHORT_ANSWER",
    "question": "거래 기록을 블록 단위로 연결하고 분산 노드가 공유하여 위변조를 어렵게 하는 분산 원장 기술의 명칭을 쓰시오.",
    "answer": [
      "블록체인",
      "Blockchain"
    ],
    "explanation": "블록체인은 해시 체인과 합의 알고리즘으로 무결성을 보장합니다. 공개형·컨소시엄·사설형으로 나뉩니다.",
    "difficulty": "EASY",
    "keywords": [
      "블록체인",
      "분산원장",
      "해시"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SEC_011",
    "subject": "신기술/보안",
    "category": "네트워크",
    "subCategory": "NAT",
    "type": "SHORT_ANSWER",
    "question": "사설 IP를 공인 IP로 변환하여 인터넷에 접속하게 하고, 내부 주소를 숨기는 주소 변환 기술의 영문 약어를 쓰시오.",
    "answer": [
      "NAT",
      "nat",
      "Network Address Translation"
    ],
    "explanation": "NAT는 IPv4 주소 부족을 완화하고 내부 토폴로지를 숨깁니다. NAPT/PAT는 포트까지 변환합니다.",
    "difficulty": "EASY",
    "keywords": [
      "NAT",
      "사설IP",
      "네트워크"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SEC_012",
    "subject": "신기술/보안",
    "category": "네트워크",
    "subCategory": "DNS",
    "type": "SHORT_ANSWER",
    "question": "도메인 이름을 IP 주소로 변환하는 분산 데이터베이스 시스템의 영문 약어를 쓰시오.",
    "answer": [
      "DNS",
      "dns",
      "Domain Name System"
    ],
    "explanation": "DNS는 계층적 이름 해석을 제공합니다. 기본 포트는 UDP/TCP 53입니다.",
    "difficulty": "EASY",
    "keywords": [
      "DNS",
      "도메인",
      "53"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SEC_013",
    "subject": "신기술/보안",
    "category": "신기술",
    "subCategory": "엣지컴퓨팅",
    "type": "SHORT_ANSWER",
    "question": "데이터를 중앙 클라우드가 아니라 단말·기지국 근처에서 처리하여 지연을 줄이는 컴퓨팅 패러다임의 명칭을 쓰시오.",
    "answer": [
      "엣지 컴퓨팅",
      "에지 컴퓨팅",
      "Edge Computing"
    ],
    "explanation": "엣지 컴퓨팅은 IoT·자율주행처럼 실시간성이 중요한 서비스에 쓰입니다. 포그 컴퓨팅과 함께 출제됩니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "엣지컴퓨팅",
      "IoT",
      "지연"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SEC_014",
    "subject": "신기술/보안",
    "category": "암호화",
    "subCategory": "PKI",
    "type": "SHORT_ANSWER",
    "question": "공개키와 소유자를 공인인증서로 묶어 주고, 인증서 발급·폐기를 관리하는 기반 구조의 영문 약어를 쓰시오.",
    "answer": [
      "PKI",
      "pki",
      "Public Key Infrastructure"
    ],
    "explanation": "PKI는 CA, RA, 인증서, CRL/OCSP로 구성됩니다. 전자서명과 HTTPS(TLS)의 신뢰 기반입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "PKI",
      "인증서",
      "CA"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_IS_001",
    "subject": "정보시스템구축관리",
    "category": "프로젝트 관리",
    "subCategory": "WBS",
    "type": "SHORT_ANSWER",
    "question": "프로젝트를 관리 가능한 작업 단위로 계층적으로 분해한 산출물의 영문 약어를 쓰시오.",
    "answer": [
      "WBS",
      "wbs",
      "Work Breakdown Structure"
    ],
    "explanation": "WBS는 범위 관리의 핵심입니다. 작업 패키지까지 분해하면 일정·원가 산정이 쉬워집니다.",
    "difficulty": "EASY",
    "keywords": [
      "WBS",
      "범위관리",
      "프로젝트"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_IS_002",
    "subject": "정보시스템구축관리",
    "category": "프로젝트 관리",
    "subCategory": "일정",
    "type": "SHORT_ANSWER",
    "question": "프로젝트 일정 네트워크에서 여유 시간이 0인 작업들의 경로로, 지연되면 전체 완료일이 밀리는 경로의 명칭을 쓰시오.",
    "answer": [
      "임계 경로",
      "임계경로",
      "Critical Path",
      "CP"
    ],
    "explanation": "임계 경로는 CPM에서 가장 긴 경로입니다. 여유(Float/Slack)가 0인 활동들의 연결입니다.",
    "difficulty": "EASY",
    "keywords": [
      "CPM",
      "임계경로",
      "일정관리"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_IS_003",
    "subject": "정보시스템구축관리",
    "category": "프로젝트 관리",
    "subCategory": "PERT",
    "type": "SHORT_ANSWER",
    "question": "낙관·정상·비관 시간을 이용해 활동 기댓값을 계산하는 확률적 일정 기법의 영문 약어를 쓰시오.",
    "answer": [
      "PERT",
      "pert"
    ],
    "explanation": "PERT 기댓값은 (낙관 + 4×정상 + 비관) / 6 입니다. CPM은 확정적 기간을 씁니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "PERT",
      "일정",
      "3점산정"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_IS_004",
    "subject": "정보시스템구축관리",
    "category": "프로세스 모델",
    "subCategory": "폭포수",
    "type": "SHORT_ANSWER",
    "question": "요구분석부터 유지보수까지 단계를 한 방향으로만 진행하고, 이전 단계가 끝나야 다음 단계로 가는 고전적 생명주기 모델의 명칭을 쓰시오.",
    "answer": [
      "폭포수 모델",
      "폭포수",
      "Waterfall",
      "워터폴"
    ],
    "explanation": "폭포수 모델은 문서와 단계 산출물이 명확하지만 요구 변경에 약합니다. 프로토타입·나선형·애자일과 비교 출제됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "폭포수",
      "생명주기",
      "SDLC"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_IS_005",
    "subject": "정보시스템구축관리",
    "category": "프로세스 모델",
    "subCategory": "나선형",
    "type": "SHORT_ANSWER",
    "question": "계획, 위험 분석, 개발, 평가를 반복하며 위험을 줄여 가는 생명주기 모델의 명칭을 쓰시오.",
    "answer": [
      "나선형 모델",
      "스파이럴 모델",
      "Spiral",
      "나선형"
    ],
    "explanation": "나선형(Spiral) 모델은 위험 분석이 핵심입니다. 대규모·고위험 프로젝트에 적합합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "나선형",
      "위험분석",
      "Spiral"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_IS_006",
    "subject": "정보시스템구축관리",
    "category": "품질",
    "subCategory": "CMMI",
    "type": "SHORT_ANSWER",
    "question": "조직의 프로세스 성숙도를 5단계(초기~최적화)로 평가하는 모델의 영문 약어를 쓰시오.",
    "answer": [
      "CMMI",
      "cmmi"
    ],
    "explanation": "CMMI 단계는 Initial, Managed, Defined, Quantitatively Managed, Optimizing 입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "CMMI",
      "성숙도",
      "프로세스"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_IS_007",
    "subject": "정보시스템구축관리",
    "category": "IT 서비스",
    "subCategory": "ITIL",
    "type": "SHORT_ANSWER",
    "question": "IT 서비스 관리 모범 사례 프레임워크로, 서비스 전략·설계·전환·운영·개선을 다루는 체계의 영문 약어를 쓰시오.",
    "answer": [
      "ITIL",
      "itil"
    ],
    "explanation": "ITIL은 ITSM의 대표 프레임워크입니다. 인시던트·문제·변경·구성 관리 프로세스가 자주 출제됩니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "ITIL",
      "ITSM",
      "서비스관리"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_IS_008",
    "subject": "정보시스템구축관리",
    "category": "IT 서비스",
    "subCategory": "인시던트",
    "type": "SHORT_ANSWER",
    "question": "IT 서비스의 예상치 못한 중단이나 품질 저하를 가능한 한 빨리 정상으로 되돌리는 ITIL 프로세스의 명칭을 쓰시오.",
    "answer": [
      "인시던트 관리",
      "Incident Management",
      "장애 관리"
    ],
    "explanation": "인시던트 관리는 빠른 복구가 목표입니다. 근본 원인 제거는 문제 관리(Problem Management)의 몫입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "인시던트",
      "ITIL",
      "문제관리"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_IS_009",
    "subject": "정보시스템구축관리",
    "category": "프로젝트 관리",
    "subCategory": "간트차트",
    "type": "SHORT_ANSWER",
    "question": "가로축을 시간, 세로축을 활동으로 두고 막대로 일정을 표현하는 차트 기법의 명칭을 쓰시오.",
    "answer": [
      "간트 차트",
      "간트차트",
      "Gantt Chart",
      "갠트 차트"
    ],
    "explanation": "간트 차트는 일정 현황을 직관적으로 보여 줍니다. 의존 관계와 임계 경로는 네트워크 다이어그램이 더 적합합니다.",
    "difficulty": "EASY",
    "keywords": [
      "간트차트",
      "일정",
      "시각화"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_IS_010",
    "subject": "정보시스템구축관리",
    "category": "보안 관리",
    "subCategory": "감리",
    "type": "SHORT_ANSWER",
    "question": "정보시스템 구축 과정에서 제3자가 절차와 산출물의 적정성을 독립적으로 점검하는 활동의 명칭을 쓰시오.",
    "answer": [
      "정보시스템 감리",
      "감리",
      "감리 활동"
    ],
    "explanation": "감리는 발주자 입장에서 구축의 품질·일정·보안을 점검합니다. 착수·중간·최종 감리로 나뉩니다.",
    "difficulty": "EASY",
    "keywords": [
      "감리",
      "정보시스템",
      "품질"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_IS_011",
    "subject": "정보시스템구축관리",
    "category": "표준",
    "subCategory": "ISO",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 생명주기 프로세스를 정의한 국제 표준 번호로, 획득·공급·개발·운영·유지보수 등을 포함하는 표준의 명칭을 쓰시오. (예: ISO 12207)",
    "answer": [
      "ISO 12207",
      "ISO12207",
      "ISO/IEC 12207"
    ],
    "explanation": "ISO/IEC 12207은 소프트웨어 생명주기 프로세스 표준입니다. ISO 21500은 프로젝트 관리 지침입니다.",
    "difficulty": "HARD",
    "keywords": [
      "ISO 12207",
      "생명주기",
      "표준"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_IS_012",
    "subject": "정보시스템구축관리",
    "category": "위험 관리",
    "subCategory": "대응",
    "type": "SHORT_ANSWER",
    "question": "위험 대응 전략 중 위험을 다른 조직에 넘기는 방법(보험, 외주 등)의 명칭을 쓰시오.",
    "answer": [
      "전가",
      "위험 전가",
      "Transfer",
      "전이"
    ],
    "explanation": "위험 대응은 회피(Avoid), 전가(Transfer), 완화(Mitigate), 수용(Accept) 네 가지가 기본입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "위험관리",
      "전가",
      "대응전략"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_IS_013",
    "subject": "정보시스템구축관리",
    "category": "품질",
    "subCategory": "형상관리",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 산출물의 식별, 버전 통제, 변경 통제, 상태 보고를 수행하는 관리 활동의 명칭을 쓰시오.",
    "answer": [
      "형상 관리",
      "형상관리",
      "SCM",
      "Software Configuration Management"
    ],
    "explanation": "형상 관리는 무엇이 바뀌었는지 추적하고 베이스라인을 유지합니다. Git 등 버전관리 도구가 이를 지원합니다.",
    "difficulty": "EASY",
    "keywords": [
      "형상관리",
      "SCM",
      "버전관리"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_IS_014",
    "subject": "정보시스템구축관리",
    "category": "프로세스 모델",
    "subCategory": "프로토타입",
    "type": "SHORT_ANSWER",
    "question": "사용자의 요구를 일찍 확인하기 위해 핵심 기능의 시험용 시스템을 먼저 만들어 피드백을 받는 모델의 명칭을 쓰시오.",
    "answer": [
      "프로토타입 모델",
      "프로토타이핑",
      "Prototype",
      "프로토타입"
    ],
    "explanation": "프로토타입 모델은 요구가 불명확할 때 유용합니다. 폐기형과 진화형이 있습니다.",
    "difficulty": "EASY",
    "keywords": [
      "프로토타입",
      "요구사항",
      "SDLC"
    ],
    "source": "암기 보충 생성"
  },
  {
    "id": "MEMO_SE_015",
    "subject": "소프트웨어설계",
    "category": "디자인 패턴",
    "subCategory": "행위 패턴",
    "type": "SHORT_ANSWER",
    "question": "데이터 구조와 처리를 분리하여, 기존 클래스 구조를 변경하지 않고도 각 요소에 새로운 연산(기능)을 유연하게 추가할 수 있도록 방문자 객체를 정의하는 GoF 행위 패턴의 명칭을 쓰시오.",
    "answer": [
      "방문자",
      "방문자 패턴",
      "비지터",
      "비지터 패턴",
      "Visitor",
      "Visitor Pattern"
    ],
    "explanation": "비지터(Visitor) 패턴은 요소 객체의 accept 메서드를 통해 방문자 객체가 방문하여 연산을 수행하며, 요소 클래스에 영향을 주지 않고 새로운 처리를 추가합니다.",
    "difficulty": "HARD",
    "keywords": [
      "디자인패턴",
      "비지터",
      "방문자",
      "Visitor"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_016",
    "subject": "소프트웨어설계",
    "category": "디자인 패턴",
    "subCategory": "생성 패턴",
    "type": "SHORT_ANSWER",
    "question": "복잡한 객체의 생성 과정과 표현 방법을 분리하여, 동일한 생성 절차에서 서로 다른 표현 결과를 만들 수 있게 하는 GoF 생성 패턴의 명칭을 쓰시오.",
    "answer": [
      "빌더",
      "빌더 패턴",
      "Builder",
      "Builder Pattern"
    ],
    "explanation": "빌더(Builder) 패턴은 여러 단계의 조립 과정을 거쳐 복잡한 객체를 만들 때 유용하며 생성자 인자가 많을 때 가독성을 높여줍니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "빌더",
      "디자인패턴",
      "생성패턴",
      "복합객체"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_017",
    "subject": "소프트웨어설계",
    "category": "디자인 패턴",
    "subCategory": "생성 패턴",
    "type": "SHORT_ANSWER",
    "question": "구체적인 클래스에 의존하지 않고, 서로 연관되거나 의존적인 여러 객체의 군(Family)을 생성하기 위한 인터페이스를 제공하는 GoF 생성 패턴의 명칭을 쓰시오.",
    "answer": [
      "추상 팩토리",
      "추상 팩토리 패턴",
      "Abstract Factory",
      "추상팩토리"
    ],
    "explanation": "추상 팩토리는 관련된 객체 묶음을 생성하는 팩토리 인터페이스를 제공하여 팩토리 메서드보다 상위 개념의 캡슐화를 지원합니다.",
    "difficulty": "HARD",
    "keywords": [
      "추상팩토리",
      "디자인패턴",
      "생성패턴",
      "객체군"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_018",
    "subject": "소프트웨어설계",
    "category": "디자인 패턴",
    "subCategory": "생성 패턴",
    "type": "SHORT_ANSWER",
    "question": "새로운 객체를 생성할 때 원본 객체를 복제(Clone)하여 생성하는 GoF 생성 패턴의 명칭을 쓰시오.",
    "answer": [
      "프로토타입",
      "프로토타입 패턴",
      "Prototype",
      "Prototype Pattern"
    ],
    "explanation": "프로토타입 패턴은 객체 생성 비용이 크거나 초기화 과정이 복잡할 때 기존 인스턴스를 복제하여 성능을 개선합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "프로토타입",
      "디자인패턴",
      "생성패턴",
      "복제"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_019",
    "subject": "소프트웨어설계",
    "category": "디자인 패턴",
    "subCategory": "구조 패턴",
    "type": "SHORT_ANSWER",
    "question": "개별 객체와 복합 객체를 동일하게 다룰 수 있도록 트리 구조의 객체 구성을 제공하는 GoF 구조 패턴의 명칭을 쓰시오.",
    "answer": [
      "컴포지트",
      "컴포지트 패턴",
      "Composite",
      "Composite Pattern"
    ],
    "explanation": "컴포지트 패턴은 파일과 폴더의 관계처럼 단일 객체와 복합 객체를 동일한 인터페이스로 클라이언트가 처리할 수 있게 합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "컴포지트",
      "디자인패턴",
      "구조패턴",
      "트리구조"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_020",
    "subject": "소프트웨어설계",
    "category": "디자인 패턴",
    "subCategory": "구조 패턴",
    "type": "SHORT_ANSWER",
    "question": "객체에 동적으로 새로운 책임(기능)을 추가할 수 있게 하며, 서브클래스를 만드는 대안으로 기능을 유연하게 확장하는 GoF 구조 패턴의 명칭을 쓰시오.",
    "answer": [
      "데코레이터",
      "데코레이터 패턴",
      "Decorator",
      "Decorator Pattern"
    ],
    "explanation": "데코레이터 패턴은 객체를 장식자 객체로 감싸 실행 시점에 기능을 덧붙이며 상속 대신 합성을 활용합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "데코레이터",
      "디자인패턴",
      "구조패턴",
      "동적기능추가"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_021",
    "subject": "소프트웨어설계",
    "category": "디자인 패턴",
    "subCategory": "구조 패턴",
    "type": "SHORT_ANSWER",
    "question": "복잡한 서브시스템의 인터페이스들을 모아 단순화된 고수준의 단일 통합 인터페이스를 제공하는 GoF 구조 패턴의 명칭을 쓰시오.",
    "answer": [
      "퍼사드",
      "퍼사드 패턴",
      "Facade",
      "파사드",
      "Facade Pattern"
    ],
    "explanation": "퍼사드 패턴은 서브시스템들의 복잡한 호출 과정을 하나의 통합 창구로 감추어 클라이언트의 결합도를 낮춥니다.",
    "difficulty": "EASY",
    "keywords": [
      "퍼사드",
      "디자인패턴",
      "구조패턴",
      "통합인터페이스"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_022",
    "subject": "소프트웨어설계",
    "category": "디자인 패턴",
    "subCategory": "구조 패턴",
    "type": "SHORT_ANSWER",
    "question": "다른 객체에 대한 대리자나 자리표시자 역할을 하여, 실제 객체에 대한 접근을 제어하거나 지연 로딩을 수행하는 GoF 구조 패턴의 명칭을 쓰시오.",
    "answer": [
      "프록시",
      "프록시 패턴",
      "Proxy",
      "Proxy Pattern"
    ],
    "explanation": "프록시 패턴은 가상 프록시, 보호 프록시, 원격 프록시 등이 있으며 객체 접근 전후의 제어 및 비용 절감에 활용됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "프록시",
      "디자인패턴",
      "구조패턴",
      "대리자"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_023",
    "subject": "소프트웨어설계",
    "category": "디자인 패턴",
    "subCategory": "구조 패턴",
    "type": "SHORT_ANSWER",
    "question": "GoF 디자인 패턴 중 기능의 클래스 계층과 구현의 클래스 계층을 분리하여 두 계층이 독립적으로 확장할 수 있도록 연결해 주는 구조 패턴의 명칭을 쓰시오.",
    "answer": [
      "브리지",
      "브리지 패턴",
      "Bridge",
      "Bridge Pattern"
    ],
    "explanation": "브리지 패턴은 기능의 계층과 구현의 계층을 연결하여 상속 계층의 폭발적 증가를 방지합니다.",
    "difficulty": "HARD",
    "keywords": [
      "브리지",
      "디자인패턴",
      "구조패턴",
      "추상구현분리"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_024",
    "subject": "소프트웨어설계",
    "category": "디자인 패턴",
    "subCategory": "구조 패턴",
    "type": "SHORT_ANSWER",
    "question": "인스턴스를 가능한 한 공유하여 대량의 작은 객체 생성 시 메모리 사용량을 절감하는 GoF 구조 패턴의 명칭을 쓰시오.",
    "answer": [
      "플라이웨이트",
      "플라이웨이트 패턴",
      "Flyweight",
      "Flyweight Pattern"
    ],
    "explanation": "플라이웨이트 패턴은 공유 가능한 내부 상태(Intrinsic)와 공유 불가능한 외부 상태(Extrinsic)를 구분하여 메모리를 절약합니다.",
    "difficulty": "HARD",
    "keywords": [
      "플라이웨이트",
      "디자인패턴",
      "구조패턴",
      "메모리공유"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_026",
    "subject": "소프트웨어설계",
    "category": "디자인 패턴",
    "subCategory": "행위 패턴",
    "type": "SHORT_ANSWER",
    "question": "상위 클래스에서 알고리즘의 뼈대(구조)를 정의하고, 구체적인 세부 단계는 서브클래스에서 오버라이드하도록 하는 GoF 행위 패턴의 명칭을 쓰시오.",
    "answer": [
      "템플릿 메서드",
      "템플릿 메소드",
      "Template Method",
      "템플릿 메서드 패턴"
    ],
    "explanation": "템플릿 메서드 패턴은 전체적인 처리 흐름은 고정하고 특정 단계의 구현만 하위 클래스로 위임하여 코드 중복을 방지합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "템플릿메서드",
      "디자인패턴",
      "행위패턴",
      "알고리즘뼈대"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_027",
    "subject": "소프트웨어설계",
    "category": "디자인 패턴",
    "subCategory": "행위 패턴",
    "type": "SHORT_ANSWER",
    "question": "객체의 내부 상태가 바뀜에 따라 객체의 행동을 변경할 수 있도록 객체 상태를 클래스로 캡슐화하는 GoF 행위 패턴의 명칭을 쓰시오.",
    "answer": [
      "상태",
      "상태 패턴",
      "State",
      "State Pattern"
    ],
    "explanation": "상태(State) 패턴은 거대한 조건문(if-else, switch) 대신 상태를 별도 객체화하여 상태 전이를 명확하게 다룹니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "상태패턴",
      "디자인패턴",
      "행위패턴",
      "상태전이"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_028",
    "subject": "소프트웨어설계",
    "category": "디자인 패턴",
    "subCategory": "행위 패턴",
    "type": "SHORT_ANSWER",
    "question": "객체 간의 복잡한 M:N 의존 관계를 줄이기 위해 객체들의 상호작용을 캡슐화하고 하나의 중앙 객체가 통신을 전담 제어하도록 하는 GoF 행위 패턴의 명칭을 쓰시오.",
    "answer": [
      "중재자",
      "중재자 패턴",
      "미디에이터",
      "Mediator",
      "Mediator Pattern"
    ],
    "explanation": "중재자(Mediator) 패턴은 객체 간의 M:N 관계를 1:N 관계로 전환하여 상호 결합도를 현저히 낮춥니다.",
    "difficulty": "HARD",
    "keywords": [
      "중재자",
      "미디에이터",
      "디자인패턴",
      "상호작용"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_029",
    "subject": "소프트웨어설계",
    "category": "디자인 패턴",
    "subCategory": "행위 패턴",
    "type": "SHORT_ANSWER",
    "question": "내부 표현 방식을 노출하지 않고 집합 객체의 원소들을 순차적으로 접근할 수 있는 방법을 제공하는 GoF 행위 패턴의 명칭을 쓰시오.",
    "answer": [
      "반복자",
      "이터레이터",
      "반복자 패턴",
      "Iterator",
      "Iterator Pattern"
    ],
    "explanation": "반복자(Iterator) 패턴은 리스트, 트리 등 컬렉션의 세부 구조를 숨긴 채 일관된 순회 인터페이스를 제공합니다.",
    "difficulty": "EASY",
    "keywords": [
      "반복자",
      "이터레이터",
      "디자인패턴",
      "순회"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_030",
    "subject": "소프트웨어설계",
    "category": "디자인 패턴",
    "subCategory": "행위 패턴",
    "type": "SHORT_ANSWER",
    "question": "캡슐화를 위반하지 않으면서 객체의 내부 상태를 캡처하고 외부에 저장했다가 나중에 해당 상태로 복원할 수 있게 하는 GoF 행위 패턴의 명칭을 쓰시오.",
    "answer": [
      "메멘토",
      "메멘토 패턴",
      "Memento",
      "Memento Pattern"
    ],
    "explanation": "메멘토 패턴은 실행 취소(Undo)나 스냅샷 복원에 주로 사용되며 Originator, Memento, Caretaker로 구성됩니다.",
    "difficulty": "HARD",
    "keywords": [
      "메멘토",
      "디자인패턴",
      "행위패턴",
      "상태복원",
      "Undo"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_031",
    "subject": "소프트웨어설계",
    "category": "디자인 패턴",
    "subCategory": "행위 패턴",
    "type": "SHORT_ANSWER",
    "question": "요청을 객체의 형태로 캡슐화하여 매개변수화하고, 작업 요청의 취소(Undo) 및 대기열(Queue) 등록을 가능하게 하는 GoF 행위 패턴의 명칭을 쓰시오.",
    "answer": [
      "커맨드",
      "커맨드 패턴",
      "Command",
      "Command Pattern",
      "명령 패턴"
    ],
    "explanation": "커맨드 패턴은 요청자(Invoker)와 수신자(Receiver)를 분리하여 요청을 큐에 넣거나 로깅할 수 있게 합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "커맨드",
      "명령패턴",
      "디자인패턴",
      "요청캡슐화"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_032",
    "subject": "소프트웨어설계",
    "category": "아키텍처",
    "subCategory": "파이프필터",
    "type": "SHORT_ANSWER",
    "question": "데이터 스트림을 처리하는 필터(Filter) 컴포넌트들과 데이터 전송 통로인 파이프(Pipe)로 구성되어 유닉스 셸 파이프라인처럼 작동하는 아키텍처 패턴의 명칭을 쓰시오.",
    "answer": [
      "파이프 필터",
      "파이프 필터 패턴",
      "Pipe and Filter",
      "Pipe-Filter"
    ],
    "explanation": "파이프-필터 패턴은 각 필터가 독립적으로 변환 작업을 수행하며 재사용성과 확장성이 우수합니다.",
    "difficulty": "EASY",
    "keywords": [
      "파이프필터",
      "아키텍처패턴",
      "데이터스트림"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_033",
    "subject": "소프트웨어설계",
    "category": "아키텍처",
    "subCategory": "계층화",
    "type": "SHORT_ANSWER",
    "question": "시스템을 하위 계층부터 상위 계층까지 서로 인접한 계층 간에만 상호작용하도록 조직화하는 대표적인 아키텍처 패턴의 명칭을 쓰시오.",
    "answer": [
      "계층화 패턴",
      "레이어드 아키텍처",
      "Layered Pattern",
      "계층 패턴"
    ],
    "explanation": "레이어드 아키텍처는 프레젠테이션, 비즈니스, 데이터 계층 등으로 분리하여 계층 간 결합도를 낮추고 모듈화를 돕습니다.",
    "difficulty": "EASY",
    "keywords": [
      "계층화",
      "레이어드",
      "아키텍처패턴",
      "관심사분리"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_034",
    "subject": "소프트웨어설계",
    "category": "아키텍처",
    "subCategory": "MSA",
    "type": "SHORT_ANSWER",
    "question": "단일 대규모 애플리케이션을 독립적으로 배포 및 실행 가능한 작고 독립된 서비스 단위들로 분할하여 구성하는 아키텍처 스타일의 영문 약어를 쓰시오.",
    "answer": [
      "MSA",
      "Microservices Architecture",
      "마이크로서비스 아키텍처"
    ],
    "explanation": "MSA는 모놀리식(Monolithic)의 한계를 극복하고 서비스별 독립 배포, 기술 스택 다양성, 장애 격리를 실현합니다.",
    "difficulty": "EASY",
    "keywords": [
      "MSA",
      "마이크로서비스",
      "아키텍처"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_035",
    "subject": "소프트웨어설계",
    "category": "UML",
    "subCategory": "상태 다이어그램",
    "type": "SHORT_ANSWER",
    "question": "객체가 가질 수 있는 모든 상태와 외부 이벤트에 의한 상태 전이(State Transition)를 모델링하는 동적 UML 다이어그램의 명칭을 쓰시오.",
    "answer": [
      "상태 다이어그램",
      "State Diagram",
      "상태 머신 다이어그램"
    ],
    "explanation": "상태 다이어그램은 럼바우 객체지향 분석에서 동적 모델링(Statechart)으로 활용되며 이벤트에 따른 객체의 생명주기를 표현합니다.",
    "difficulty": "EASY",
    "keywords": [
      "UML",
      "상태다이어그램",
      "상태전이",
      "동적모델링"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_036",
    "subject": "소프트웨어설계",
    "category": "UML",
    "subCategory": "활동 다이어그램",
    "type": "SHORT_ANSWER",
    "question": "시스템이 실행하는 작업의 처리 흐름과 조건에 따른 분기, 병행 처리를 순서도(Flowchart) 형태로 나타내는 동적 UML 다이어그램의 명칭을 쓰시오.",
    "answer": [
      "활동 다이어그램",
      "액티비티 다이어그램",
      "Activity Diagram"
    ],
    "explanation": "활동 다이어그램은 비즈니스 프로세스 흐름이나 복잡한 연산 과정을 모델링할 때 스윔레인(Swimlane)과 포크/조인 노드로 표현합니다.",
    "difficulty": "EASY",
    "keywords": [
      "UML",
      "활동다이어그램",
      "액티비티",
      "흐름도"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_037",
    "subject": "소프트웨어설계",
    "category": "UML",
    "subCategory": "배치 다이어그램",
    "type": "SHORT_ANSWER",
    "question": "물리적 노드(컴퓨터, 서버, 통신 링크 등)와 노드에 배치되는 실행 산출물(Artifact)의 물리적 위치 관계를 표현하는 UML 다이어그램의 명칭을 쓰시오.",
    "answer": [
      "배치 다이어그램",
      "디플로이먼트 다이어그램",
      "Deployment Diagram"
    ],
    "explanation": "배치 다이어그램은 HW 아키텍처와 SW 컴포넌트가 실제 서버 환경에 설치·배치되는 형태를 모델링하는 구조 다이어그램입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "UML",
      "배치다이어그램",
      "물리노드",
      "아티팩트"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_038",
    "subject": "소프트웨어설계",
    "category": "UML",
    "subCategory": "컴포넌트 다이어그램",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어를 구성하는 컴포넌트와 그들 사이의 의존 관계 및 인터페이스 연결 구조를 표현하는 정적 UML 다이어그램의 명칭을 쓰시오.",
    "answer": [
      "컴포넌트 다이어그램",
      "Component Diagram"
    ],
    "explanation": "컴포넌트 다이어그램은 소스 코드나 라이브러리, 모듈 단위의 물리적 부품과 제공/요구 인터페이스를 정적으로 보여줍니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "UML",
      "컴포넌트다이어그램",
      "인터페이스"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_039",
    "subject": "소프트웨어설계",
    "category": "UML",
    "subCategory": "관계",
    "type": "SHORT_ANSWER",
    "question": "전체(Whole) 객체와 부분(Part) 객체 사이의 포함 관계 중, 전체 객체가 소멸되어도 부분 객체는 독립적으로 살아남는 약한 결합 관계의 명칭을 쓰시오.",
    "answer": [
      "집약 관계",
      "집약",
      "Aggregation"
    ],
    "explanation": "집약 관계는 빈 다이아몬드(◇)로 표현하며 독립적 생명주기를 갖습니다. 반면 전체 소멸 시 부분도 함께 소멸하는 강한 결합은 합성(Composition, 채워진 다이아몬드 ◆)입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "UML",
      "집약",
      "합성",
      "Aggregation"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_040",
    "subject": "소프트웨어설계",
    "category": "UML",
    "subCategory": "관계",
    "type": "SHORT_ANSWER",
    "question": "전체(Whole) 객체와 부분(Part) 객체 사이의 강한 소유 관계로, 전체 객체가 소멸되면 부분 객체도 함께 소멸하여 생명주기를 공유하는 UML 관계의 명칭을 쓰시오.",
    "answer": [
      "합성 관계",
      "합성",
      "복합 관계",
      "Composition"
    ],
    "explanation": "합성(Composition) 관계는 채워진 다이아몬드(◆)로 표기하며, 부분 객체는 전체 객체 없이는 존재할 수 없습니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "UML",
      "합성",
      "Composition",
      "생명주기공유"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_041",
    "subject": "소프트웨어설계",
    "category": "객체지향 원칙",
    "subCategory": "SOLID",
    "type": "SHORT_ANSWER",
    "question": "단 하나의 책임만 가져야 하며, 클래스를 변경해야 하는 이유는 오직 하나뿐이어야 한다는 SOLID 설계 원칙의 명칭 또는 영문 약어를 쓰시오.",
    "answer": [
      "단일 책임 원칙",
      "SRP",
      "Single Responsibility Principle"
    ],
    "explanation": "단일 책임 원칙(SRP)은 클래스가 하나의 기능에만 집중하게 하여 응집도를 높이고 변경의 파급효과를 최소화합니다.",
    "difficulty": "EASY",
    "keywords": [
      "SOLID",
      "SRP",
      "단일책임원칙"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_042",
    "subject": "소프트웨어설계",
    "category": "객체지향 원칙",
    "subCategory": "SOLID",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 개체는 확장에 대해서는 열려 있어야 하지만, 수정에 대해서는 닫혀 있어야 한다는 SOLID 설계 원칙의 명칭 또는 영문 약어를 쓰시오.",
    "answer": [
      "개방 폐쇄 원칙",
      "OCP",
      "Open Closed Principle"
    ],
    "explanation": "개방 폐쇄 원칙(OCP)은 인터페이스나 다형성을 활용하여 기존 코드를 수정하지 않고 새로운 기능을 추가할 수 있도록 설계하는 원칙입니다.",
    "difficulty": "EASY",
    "keywords": [
      "SOLID",
      "OCP",
      "개방폐쇄원칙"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_043",
    "subject": "소프트웨어설계",
    "category": "객체지향 원칙",
    "subCategory": "SOLID",
    "type": "SHORT_ANSWER",
    "question": "서브타입은 언제나 자신의 기반타입(슈퍼타입)으로 교체할 수 있어야 한다는 SOLID 설계 원칙의 명칭 또는 영문 약어를 쓰시오.",
    "answer": [
      "리스코프 치환 원칙",
      "LSP",
      "Liskov Substitution Principle"
    ],
    "explanation": "리스코프 치환 원칙(LSP)은 자식 클래스가 부모 클래스의 계약과 행위를 위반하지 않고 올바르게 상속해야 함을 규정합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "SOLID",
      "LSP",
      "리스코프치환원칙"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_044",
    "subject": "소프트웨어설계",
    "category": "객체지향 원칙",
    "subCategory": "SOLID",
    "type": "SHORT_ANSWER",
    "question": "클라이언트가 자신이 사용하지 않는 메서드에 의존하지 않도록, 거대한 인터페이스보다 작고 구체적인 인터페이스 여러 개로 분리해야 한다는 SOLID 원칙을 쓰시오.",
    "answer": [
      "인터페이스 분리 원칙",
      "ISP",
      "Interface Segregation Principle"
    ],
    "explanation": "인터페이스 분리 원칙(ISP)은 클라이언트 맞춤형 특화 인터페이스를 제공하여 불필요한 결합과 재컴파일을 방지합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "SOLID",
      "ISP",
      "인터페이스분리원칙"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_045",
    "subject": "소프트웨어설계",
    "category": "객체지향 원칙",
    "subCategory": "SOLID",
    "type": "SHORT_ANSWER",
    "question": "고수준 모듈은 저수준 모듈의 구현에 의존해서는 안 되며, 둘 다 추상화에 의존해야 한다는 SOLID 설계 원칙의 명칭 또는 영문 약어를 쓰시오.",
    "answer": [
      "의존 역전 원칙",
      "DIP",
      "Dependency Inversion Principle"
    ],
    "explanation": "의존 역전 원칙(DIP)은 구체 클래스 대신 인터페이스나 추상 클래스를 바라보게 하여 시스템 유연성과 테스트 용이성을 극대화합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "SOLID",
      "DIP",
      "의존역전원칙"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_046",
    "subject": "소프트웨어설계",
    "category": "모듈화",
    "subCategory": "결합도",
    "type": "SHORT_ANSWER",
    "question": "모듈 간의 인터페이스로 오직 단순 파라미터 데이터 값만 전달되어, 결합도 중에서 가장 낮고 바람직한 결합도의 명칭을 쓰시오.",
    "answer": [
      "자료 결합도",
      "데이터 결합도",
      "Data Coupling"
    ],
    "explanation": "자료(데이터) 결합도는 가장 이상적인 형태입니다. 결합도 순서: 내용 > 공통 > 외부 > 제어 > 스탬프 > 자료 (내공외제스자).",
    "difficulty": "EASY",
    "keywords": [
      "결합도",
      "자료결합도",
      "데이터결합도"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_047",
    "subject": "소프트웨어설계",
    "category": "모듈화",
    "subCategory": "결합도",
    "type": "SHORT_ANSWER",
    "question": "한 모듈이 다른 모듈의 내부 자료나 코드를 직접 참조하거나 수정할 때 발생하며, 결합도 중 가장 강하고 위험한 결합도의 명칭을 쓰시오.",
    "answer": [
      "내용 결합도",
      "Content Coupling"
    ],
    "explanation": "내용 결합도는 모듈 독립성을 완전히 해치므로 반드시 피해야 합니다. 한 모듈의 수정이 다른 모듈의 오류를 직접 유발합니다.",
    "difficulty": "EASY",
    "keywords": [
      "결합도",
      "내용결합도",
      "ContentCoupling"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_048",
    "subject": "소프트웨어설계",
    "category": "모듈화",
    "subCategory": "결합도",
    "type": "SHORT_ANSWER",
    "question": "여러 모듈이 동일한 전역 변수나 공통 데이터 영역을 직접 참조하고 갱신할 때 발생하는 결합도의 명칭을 쓰시오.",
    "answer": [
      "공통 결합도",
      "Common Coupling"
    ],
    "explanation": "공통 결합도는 전역 변수의 변경이 이를 참조하는 모든 모듈에 파급되므로 시스템 유지보수를 어렵게 만듭니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "결합도",
      "공통결합도",
      "전역변수"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_049",
    "subject": "소프트웨어설계",
    "category": "모듈화",
    "subCategory": "결합도",
    "type": "SHORT_ANSWER",
    "question": "모듈 간에 배열이나 레코드, 구조체 같은 자료구조 전체를 인자로 넘길 때 필요하지 않은 필드까지 전달되어 형성되는 결합도의 명칭을 쓰시오.",
    "answer": [
      "스탬프 결합도",
      "Stamp Coupling"
    ],
    "explanation": "스탬프 결합도는 레코드의 포맷이나 일부 필드가 변경될 때 무관한 모듈까지 영향을 받을 수 있습니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "결합도",
      "스탬프결합도",
      "자료구조전달"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_051",
    "subject": "소프트웨어설계",
    "category": "모듈화",
    "subCategory": "응집도",
    "type": "SHORT_ANSWER",
    "question": "한 요소의 출력 결과가 다음 요소의 입력 데이터로 순차적으로 사용되는 요소들이 모여 있는 응집도의 명칭을 쓰시오.",
    "answer": [
      "순차적 응집도",
      "Sequential Cohesion"
    ],
    "explanation": "순차적 응집도는 파이프라인처럼 이전 단계의 출력이 다음 단계의 입력이 되는 높은 수준의 응집도입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "응집도",
      "순차적응집도",
      "출력입력연결"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_052",
    "subject": "소프트웨어설계",
    "category": "모듈화",
    "subCategory": "응집도",
    "type": "SHORT_ANSWER",
    "question": "동일한 입력 데이터를 사용하여 서로 다른 기능을 수행하거나, 동일한 출력 데이터를 산출하는 요소들이 모인 응집도의 명칭을 쓰시오.",
    "answer": [
      "통신적 응집도",
      "교환적 응집도",
      "Communication Cohesion",
      "Communicational Cohesion"
    ],
    "explanation": "통신적(교환적) 응집도는 같은 자료구조나 파일을 입력받아 여러 작업을 수행하는 경우에 해당합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "응집도",
      "통신적응집도",
      "교환적응집도"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_053",
    "subject": "소프트웨어설계",
    "category": "모듈화",
    "subCategory": "응집도",
    "type": "SHORT_ANSWER",
    "question": "모듈 내부의 구성 요소들이 서로 아무런 관련성 없이 무작위로 한 모듈에 묶여 있는 가장 낮고 나쁜 응집도의 명칭을 쓰시오.",
    "answer": [
      "우연적 응집도",
      "Coincidental Cohesion"
    ],
    "explanation": "우연적 응집도는 유지보수가 극히 어렵고 독립성이 전무하여 반드시 리팩토링해야 합니다.",
    "difficulty": "EASY",
    "keywords": [
      "응집도",
      "우연적응집도",
      "최저응집도"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_054",
    "subject": "소프트웨어설계",
    "category": "인터페이스",
    "subCategory": "EAI",
    "type": "SHORT_ANSWER",
    "question": "기업 내 서로 다른 이기종 애플리케이션들을 중앙의 허브를 통해 연결하여 시스템 간 결합도를 낮추는 EAI 구축 방식의 명칭을 쓰시오.",
    "answer": [
      "허브 앤 스포크",
      "Hub and Spoke",
      "허브앤스포크",
      "Hub & Spoke"
    ],
    "explanation": "허브 앤 스포크는 중앙 허브 장애 시 전체 장애(SPOF)가 발생할 수 있으나 유지보수와 확장이 용이합니다.",
    "difficulty": "EASY",
    "keywords": [
      "EAI",
      "허브앤스포크",
      "중앙허브"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_055",
    "subject": "소프트웨어설계",
    "category": "인터페이스",
    "subCategory": "ESB",
    "type": "SHORT_ANSWER",
    "question": "웹 서비스 중심의 표준화된 버스를 기반으로 서비스들을 느슨하게 결합(Loose Coupling)하여 연계하는 미들웨어 아키텍처의 영문 약어를 쓰시오.",
    "answer": [
      "ESB",
      "Enterprise Service Bus"
    ],
    "explanation": "ESB는 SOA(서비스 지향 아키텍처)의 핵심 미들웨어로, 메시지 라우팅, 프로토콜 변환, 이벤트 처리를 지원합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "ESB",
      "미들웨어",
      "SOA"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_056",
    "subject": "소프트웨어설계",
    "category": "요구사항",
    "subCategory": "분석기법",
    "type": "SHORT_ANSWER",
    "question": "시스템이 '무엇을(What)' 해야 하는지와 성능, 보안, 제약조건 등 '어떻게(How)' 동작해야 하는지를 기술할 때 전자에 해당하는 요구사항 유형의 명칭을 쓰시오.",
    "answer": [
      "기능적 요구사항",
      "기능 요구사항",
      "Functional Requirements"
    ],
    "explanation": "기능적 요구사항은 시스템이 제공할 기능, 입출력을 다루며 비기능적 요구사항은 성능, 보안, 가용성, 신뢰성 등의 품질 특성을 다룹니다.",
    "difficulty": "EASY",
    "keywords": [
      "요구공학",
      "기능적요구사항",
      "비기능적요구사항"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_057",
    "subject": "소프트웨어설계",
    "category": "UI 설계",
    "subCategory": "4대원칙",
    "type": "SHORT_ANSWER",
    "question": "사용자가 원하는 작업을 시스템이 정확하고 완전하게 수행할 수 있어야 한다는 UI 설계 4대 기본 원칙 중 하나의 명칭을 쓰시오.",
    "answer": [
      "유효성",
      "Effectiveness"
    ],
    "explanation": "UI 4대 원칙은 직관성(누구나 쉽게 이해), 유효성(목표를 달성), 학습성(쉽게 배움), 유연성(요구를 수용)입니다. (직유학유)",
    "difficulty": "MEDIUM",
    "keywords": [
      "UI",
      "유효성",
      "4대원칙"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_058",
    "subject": "소프트웨어설계",
    "category": "UI 설계",
    "subCategory": "4대원칙",
    "type": "SHORT_ANSWER",
    "question": "사용자가 UI를 별도의 설명 없이도 직관적으로 쉽게 이해하고 사용할 수 있어야 한다는 UI 설계 원칙의 명칭을 쓰시오.",
    "answer": [
      "직관성",
      "Intuitiveness"
    ],
    "explanation": "직관성은 사용자가 사전 지식 없이도 조작법을 자연스럽게 알 수 있게 하는 인터페이스 원칙입니다.",
    "difficulty": "EASY",
    "keywords": [
      "UI",
      "직관성",
      "4대원칙"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_059",
    "subject": "소프트웨어설계",
    "category": "소프트웨어 아키텍처",
    "subCategory": "4+1 뷰",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 아키텍처 4+1 뷰 모델에서 시스템의 정적 구조와 패키지, 클래스 관계를 표현하는 설계자 관점의 뷰 명칭을 쓰시오.",
    "answer": [
      "논리 뷰",
      "Logical View",
      "논리적 뷰"
    ],
    "explanation": "아키텍처 4+1 뷰는 유스케이스 뷰를 중심으로 논리 뷰(설계자), 프로세스 뷰(통합자), 구현 뷰(개발자), 배포 뷰(시스템 엔지니어)로 구성됩니다.",
    "difficulty": "HARD",
    "keywords": [
      "4+1뷰",
      "논리뷰",
      "아키텍처뷰"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_060",
    "subject": "소프트웨어설계",
    "category": "럼바우 모델링",
    "subCategory": "객체지향 분석",
    "type": "SHORT_ANSWER",
    "question": "럼바우(Rumbaugh) 객체지향 분석 3대 모델링 중 시스템의 데이터 흐름도(DFD)를 이용하여 처리 과정을 표현하는 모델링의 명칭을 쓰시오.",
    "answer": [
      "기능 모델링",
      "기능적 모델링",
      "Functional Modeling"
    ],
    "explanation": "럼바우 분석 기법: 객체 모델링(ER 다이어그램/클래스 다이어그램) → 동적 모델링(상태 다이어그램) → 기능 모델링(DFD). (객동기)",
    "difficulty": "MEDIUM",
    "keywords": [
      "럼바우",
      "기능모델링",
      "DFD",
      "객동기"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_061",
    "subject": "소프트웨어설계",
    "category": "럼바우 모델링",
    "subCategory": "객체지향 분석",
    "type": "SHORT_ANSWER",
    "question": "럼바우(Rumbaugh) 분석 기법에서 시스템의 정적 구조를 객체 다이어그램으로 가장 먼저 표현하는 핵심 모델링의 명칭을 쓰시오.",
    "answer": [
      "객체 모델링",
      "객체적 모델링",
      "Object Modeling"
    ],
    "explanation": "럼바우 3단계 모델링 중 객체 모델링이 가장 중요하고 선행되는 단계입니다.",
    "difficulty": "EASY",
    "keywords": [
      "럼바우",
      "객체모델링",
      "정적구조"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_062",
    "subject": "소프트웨어설계",
    "category": "애자일",
    "subCategory": "XP",
    "type": "SHORT_ANSWER",
    "question": "XP(eXtreme Programming)의 5대 핵심 가치 중 개발 과정에서의 의사소통, 피드백, 단순성, 존중과 함께 포함되는 나머지 하나의 가치 명칭을 쓰시오.",
    "answer": [
      "용기",
      "Courage"
    ],
    "explanation": "XP 5대 가치는 '용단피의존' (용기, 단순성, 피드백, 의사소통, 존중)입니다. 리팩토링이나 빠른 요구 변경 수용에 용기가 필요합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "XP",
      "5대가치",
      "용기",
      "Courage"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_063",
    "subject": "소프트웨어설계",
    "category": "애자일",
    "subCategory": "스크럼",
    "type": "SHORT_ANSWER",
    "question": "스크럼에서 1~4주의 짧은 반복 개발 주기를 지칭하는 용어의 명칭을 쓰시오.",
    "answer": [
      "스프린트",
      "Sprint"
    ],
    "explanation": "스프린트는 정해진 기간 동안 잠재적으로 출시 가능한 제품 증분을 만들어내는 이터레이션(반복 주기)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "스크럼",
      "스프린트",
      "Sprint",
      "반복주기"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SE_064",
    "subject": "소프트웨어설계",
    "category": "인터페이스",
    "subCategory": "REST",
    "type": "SHORT_ANSWER",
    "question": "HTTP URI를 통해 자원(Resource)을 명시하고 HTTP 메서드(GET, POST, PUT, DELETE)로 행위를 적용하는 웹 아키텍처 스타일의 명칭을 쓰시오.",
    "answer": [
      "REST",
      "RESTful",
      "Representational State Transfer"
    ],
    "explanation": "REST는 자원, 행위, 표현의 3요소로 구성되며 무상태성(Stateless)과 캐시 가능성 등의 특징을 가집니다.",
    "difficulty": "EASY",
    "keywords": [
      "REST",
      "RESTful",
      "웹아키텍처"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_015",
    "subject": "데이터베이스구축",
    "category": "관계 대수",
    "subCategory": "순수 관계 연산",
    "type": "SHORT_ANSWER",
    "question": "릴레이션에서 주어진 조건을 만족하는 튜플(수평 부분집합)들을 검색하는 순수 관계 연산자의 기호(그리스 문자) 또는 명칭을 쓰시오.",
    "answer": [
      "셀렉트",
      "Select",
      "시그마",
      "σ"
    ],
    "explanation": "셀렉트(Select, σ)는 튜플(행)을 선택하는 연산입니다. 열(속성)을 선택하는 연산은 프로젝트(Project, π)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "관계대수",
      "셀렉트",
      "Select",
      "시그마"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_016",
    "subject": "데이터베이스구축",
    "category": "관계 대수",
    "subCategory": "순수 관계 연산",
    "type": "SHORT_ANSWER",
    "question": "릴레이션에서 제시된 특정 속성값들만 추출하여 새로운 릴레이션을 구성하는 수직 연산자의 기호(그리스 문자) 또는 명칭을 쓰시오.",
    "answer": [
      "프로젝트",
      "Project",
      "파이",
      "π"
    ],
    "explanation": "프로젝트(Project, π)는 원하는 컬럼(속성)만을 수직으로 투영하여 추출하며 중복된 행은 자동 제거됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "관계대수",
      "프로젝트",
      "Project",
      "파이"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_017",
    "subject": "데이터베이스구축",
    "category": "관계 대수",
    "subCategory": "순수 관계 연산",
    "type": "SHORT_ANSWER",
    "question": "두 릴레이션 R(X, Y)와 S(Y)가 있을 때, S의 모든 튜플과 관련을 갖는 R의 X 튜플들을 구하는 순수 관계 연산자의 명칭 또는 기호를 쓰시오.",
    "answer": [
      "디비전",
      "Division",
      "나누기",
      "÷"
    ],
    "explanation": "디비전(Division, ÷)은 분모 릴레이션의 모든 조건을 만족하는 분자 릴레이션의 속성 값을 구하는 나눗셈 연산입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "관계대수",
      "디비전",
      "Division",
      "나누기"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_018",
    "subject": "데이터베이스구축",
    "category": "관계 대수",
    "subCategory": "일반 집합 연산",
    "type": "SHORT_ANSWER",
    "question": "차수가 n인 릴레이션 R과 차수가 m인 릴레이션 S의 모든 튜플을 상호 곱하여 차수가 n+m, 카디널리티가 두 릴레이션의 곱이 되는 집합 연산자의 명칭을 쓰시오.",
    "answer": [
      "카티션 프로덕트",
      "카티시언 프로덕트",
      "Cartesian Product",
      "교차곱",
      "카테시안 곱"
    ],
    "explanation": "카티션 프로덕트(×)는 두 릴레이션의 가능한 모든 순서쌍을 생성하며, 조건이 없는 CROSS JOIN에 해당합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "관계대수",
      "카티션프로덕트",
      "교차곱",
      "카테시안곱"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_019",
    "subject": "데이터베이스구축",
    "category": "관계 대수",
    "subCategory": "순수 관계 연산",
    "type": "SHORT_ANSWER",
    "question": "두 릴레이션의 공통 속성을 기준으로 값이 같은 튜플들을 결합한 후, 중복되는 공통 속성을 하나 제거하여 나타내는 조인의 명칭을 쓰시오.",
    "answer": [
      "자연 조인",
      "내추럴 조인",
      "Natural Join"
    ],
    "explanation": "자연 조인(Natural Join)은 동일한 이름의 공통 속성에 대해 등가 조인(Equi Join)을 수행하고 중복 속성을 한 번만 표시합니다.",
    "difficulty": "EASY",
    "keywords": [
      "관계대수",
      "자연조인",
      "NaturalJoin"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_020",
    "subject": "데이터베이스구축",
    "category": "키",
    "subCategory": "슈퍼키",
    "type": "SHORT_ANSWER",
    "question": "릴레이션 내의 모든 튜플을 유일하게 식별할 수 있는 유일성은 만족하지만, 최소성은 만족하지 못하는 속성 또는 속성 집합의 명칭을 쓰시오.",
    "answer": [
      "슈퍼키",
      "슈퍼 키",
      "Super Key"
    ],
    "explanation": "슈퍼키는 유일성은 만족하지만 최소성을 만족하지 않습니다. 유일성과 최소성을 둘 다 만족하는 키는 후보키입니다.",
    "difficulty": "EASY",
    "keywords": [
      "키",
      "슈퍼키",
      "유일성",
      "최소성불만족"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_021",
    "subject": "데이터베이스구축",
    "category": "키",
    "subCategory": "대체키",
    "type": "SHORT_ANSWER",
    "question": "후보키(Candidate Key) 중에서 기본키(Primary Key)로 선택되지 않고 남아 있는 후보키들의 명칭을 쓰시오.",
    "answer": [
      "대체키",
      "대체 키",
      "보조키",
      "Alternate Key"
    ],
    "explanation": "대체키(Alternate Key)는 기본키가 될 수 있는 자격을 갖추었으나 기본키로 지정되지 않은 키입니다.",
    "difficulty": "EASY",
    "keywords": [
      "키",
      "대체키",
      "보조키",
      "후보키"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_023",
    "subject": "데이터베이스구축",
    "category": "무결성 제약조건",
    "subCategory": "도메인 무결성",
    "type": "SHORT_ANSWER",
    "question": "테이블의 각 속성(컬럼) 값이 해당 속성에 정의된 데이터 타입, 길이, 허용 범위(도메인) 내의 유효한 값이어야 한다는 제약조건의 명칭을 쓰시오.",
    "answer": [
      "도메인 무결성",
      "도메인 무결성 제약조건",
      "Domain Integrity"
    ],
    "explanation": "도메인 무결성은 나이 컬럼에 음수가 들어오지 못하게 하거나, 성별 컬럼에 정해진 문자만 들어가도록 제약하는 규칙입니다.",
    "difficulty": "EASY",
    "keywords": [
      "무결성",
      "도메인무결성",
      "유효값"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_024",
    "subject": "데이터베이스구축",
    "category": "무결성 제약조건",
    "subCategory": "참조 무결성 동작",
    "type": "SHORT_ANSWER",
    "question": "부모 테이블의 기본키 튜플이 삭제되거나 수정될 때 이를 참조하는 자식 테이블의 외래키 튜플도 자동으로 함께 삭제 또는 수정되게 하는 옵션의 영문 키워드를 쓰시오.",
    "answer": [
      "CASCADE",
      "cascade",
      "캐스케이드"
    ],
    "explanation": "ON DELETE CASCADE, ON UPDATE CASCADE는 부모 데이터의 변경을 자식에게 연쇄적으로 반영합니다. 반대로 삭제를 막는 것은 RESTRICT입니다.",
    "difficulty": "EASY",
    "keywords": [
      "참조무결성",
      "CASCADE",
      "연쇄삭제"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_025",
    "subject": "데이터베이스구축",
    "category": "정규화",
    "subCategory": "1NF",
    "type": "SHORT_ANSWER",
    "question": "릴레이션에 속한 모든 속성의 도메인이 더 이상 쪼갤 수 없는 원자값(Atomic Value)만으로 되어 있도록 분해하는 정규형의 명칭을 쓰시오.",
    "answer": [
      "제1정규형",
      "1NF",
      "제1 정규형",
      "First Normal Form"
    ],
    "explanation": "제1정규형(1NF)은 반복 그룹이나 다중값을 제거하여 모든 컬럼이 단일 원자값을 갖도록 정규화하는 첫 단계입니다.",
    "difficulty": "EASY",
    "keywords": [
      "정규화",
      "1NF",
      "제1정규형",
      "원자값"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_026",
    "subject": "데이터베이스구축",
    "category": "SQL",
    "subCategory": "DML",
    "type": "SHORT_ANSWER",
    "question": "조건에 따라 테이블에 해당 행이 존재하면 UPDATE를 수행하고, 존재하지 않으면 새 행으로 INSERT를 한 번에 수행하는 SQL 명령어(UPSERT)의 명칭을 쓰시오.",
    "answer": [
      "MERGE",
      "머지",
      "MERGE INTO",
      "merge"
    ],
    "explanation": "MERGE 문은 소스 테이블과 타깃 테이블을 조인하여 매칭 여부에 따라 갱신(UPDATE)과 삽입(INSERT)을 단일 문장으로 처리합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "SQL",
      "MERGE",
      "UPSERT",
      "DML"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_027",
    "subject": "데이터베이스구축",
    "category": "정규화",
    "subCategory": "4NF",
    "type": "SHORT_ANSWER",
    "question": "BCNF를 만족하면서 릴레이션에 존재하는 다치 종속(MVD, Multi-Valued Dependency)을 제거하여 만족시키는 정규형의 명칭을 쓰시오.",
    "answer": [
      "제4정규형",
      "4NF",
      "제4 정규형",
      "Fourth Normal Form"
    ],
    "explanation": "제4정규형(4NF)은 A ->> B 형태의 다치 종속(다치 종속성)을 분해하여 제거한 정규형입니다.",
    "difficulty": "HARD",
    "keywords": [
      "정규화",
      "4NF",
      "다치종속"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_028",
    "subject": "데이터베이스구축",
    "category": "정규화",
    "subCategory": "5NF",
    "type": "SHORT_ANSWER",
    "question": "4차 정규형을 만족하면서, 후보키를 통하지 않는 모든 조인 종속(Join Dependency)을 제거하여 원래 릴레이션이 무손실 분해되도록 하는 정규형의 명칭을 쓰시오.",
    "answer": [
      "제5정규형",
      "5NF",
      "PJNF",
      "제5 정규형"
    ],
    "explanation": "제5정규형(5NF 또는 PJNF)은 조인 종속성을 만족하는 정규형으로 정규화의 최고 단계입니다.",
    "difficulty": "HARD",
    "keywords": [
      "정규화",
      "5NF",
      "조인종속"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_029",
    "subject": "데이터베이스구축",
    "category": "반정규화",
    "subCategory": "성능 최적화",
    "type": "SHORT_ANSWER",
    "question": "정규화된 엔터티, 속성, 관계에 대해 데이터 중복을 허용하거나 테이블을 병합·분할하여 시스템 성능과 조회 속도를 향상시키는 데이터 모델링 기법의 명칭을 쓰시오.",
    "answer": [
      "반정규화",
      "역정규화",
      "Denormalization"
    ],
    "explanation": "반정규화는 잦은 조인으로 인한 성능 저하를 방지하기 위해 의도적으로 중복을 도입하며 데이터 무결성 훼손 위험을 수반합니다.",
    "difficulty": "EASY",
    "keywords": [
      "반정규화",
      "역정규화",
      "성능최적화",
      "중복허용"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_030",
    "subject": "데이터베이스구축",
    "category": "반정규화",
    "subCategory": "테이블 분할",
    "type": "SHORT_ANSWER",
    "question": "하나의 대용량 테이블을 레코드(Row) 단위로 특정 기준(날짜, 지역 등)에 맞추어 여러 물리적 테이블로 분산 저장하는 기법의 명칭을 영문 또는 한글로 쓰시오.",
    "answer": [
      "파티셔닝",
      "수평 분할",
      "Partitioning",
      "샤딩"
    ],
    "explanation": "수평 분할(Range, List, Hash Partitioning)은 행 단위로 데이터를 분할하여 I/O 분산 및 검색 속도를 개선합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "파티셔닝",
      "수평분할",
      "테이블분할"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_031",
    "subject": "데이터베이스구축",
    "category": "트랜잭션",
    "subCategory": "ACID",
    "type": "SHORT_ANSWER",
    "question": "트랜잭션이 성공적으로 수행된 후에도 시스템의 고정 요소나 무결성 제약조건을 위배하지 않고 모순 없는 데이터베이스 상태를 유지해야 한다는 ACID 특성의 명칭을 쓰시오.",
    "answer": [
      "일관성",
      "Consistency"
    ],
    "explanation": "일관성(Consistency)은 트랜잭션 수행 전후에 데이터베이스가 제약조건과 무결성 규칙을 올바르게 만족해야 함을 뜻합니다.",
    "difficulty": "EASY",
    "keywords": [
      "ACID",
      "일관성",
      "Consistency",
      "트랜잭션"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_032",
    "subject": "데이터베이스구축",
    "category": "트랜잭션",
    "subCategory": "ACID",
    "type": "SHORT_ANSWER",
    "question": "둘 이상의 트랜잭션이 동시에 병행 실행될 때, 어느 하나의 트랜잭션도 다른 트랜잭션의 중간 연산 과정에 끼어들거나 간섭할 수 없다는 ACID 특성의 명칭을 쓰시오.",
    "answer": [
      "격리성",
      "고립성",
      "독립성",
      "Isolation"
    ],
    "explanation": "격리성(Isolation)은 병행 트랜잭션이 서로 영향을 미치지 않고 마치 순차적으로 실행된 것처럼 독립적으로 수행되도록 보장합니다.",
    "difficulty": "EASY",
    "keywords": [
      "ACID",
      "격리성",
      "고립성",
      "Isolation"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_033",
    "subject": "데이터베이스구축",
    "category": "트랜잭션 회복",
    "subCategory": "WAL",
    "type": "SHORT_ANSWER",
    "question": "데이터베이스 버퍼의 변경 내용을 디스크의 데이터 파일에 실제로 기록하기 전에, 반드시 대응되는 로그 레코드를 디스크에 먼저 영구 기록해야 한다는 회복 기본 원칙의 명칭을 쓰시오.",
    "answer": [
      "WAL",
      "Write-Ahead Logging",
      "로그 우선 기록",
      "Write Ahead Logging"
    ],
    "explanation": "WAL(Write-Ahead Logging)은 충돌 발생 시 UNDO 및 REDO 작업을 정확히 수행할 수 있도록 로그를 데이터보다 먼저 디스크에 강제 플러시(Flush)합니다.",
    "difficulty": "HARD",
    "keywords": [
      "트랜잭션회복",
      "WAL",
      "Write-AheadLogging",
      "로그우선기록"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_034",
    "subject": "데이터베이스구축",
    "category": "병행 제어",
    "subCategory": "이상 현상",
    "type": "SHORT_ANSWER",
    "question": "두 개 이상의 트랜잭션이 같은 데이터를 동시에 갱신할 때, 한 트랜잭션의 갱신 내용이 다른 트랜잭션에 의해 덮어씌워져 사라지는 병행 제어 문제점의 명칭을 쓰시오.",
    "answer": [
      "갱신 분실",
      "Lost Update"
    ],
    "explanation": "갱신 분실(Lost Update)은 병행 제어가 없는 상태에서 늦게 커밋한 트랜잭션이 먼저 갱신한 결과를 덮어써서 발생합니다.",
    "difficulty": "EASY",
    "keywords": [
      "병행제어",
      "갱신분실",
      "LostUpdate"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_035",
    "subject": "데이터베이스구축",
    "category": "병행 제어",
    "subCategory": "이상 현상",
    "type": "SHORT_ANSWER",
    "question": "트랜잭션 T1이 갱신 후 아직 커밋되지 않은 미완료 데이터를 트랜잭션 T2가 읽고 작업을 진행하다가 T1이 롤백될 때 발생하는 문제점의 명칭을 쓰시오.",
    "answer": [
      "임시 갱신",
      "오손 읽기",
      "Dirty Read",
      "비완료 의존성"
    ],
    "explanation": "Dirty Read는 커밋되지 않은 유효하지 않은 데이터를 읽음으로써 발생하는 모순 상태입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "병행제어",
      "오손읽기",
      "DirtyRead",
      "임시갱신"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_036",
    "subject": "데이터베이스구축",
    "category": "병행 제어",
    "subCategory": "이상 현상",
    "type": "SHORT_ANSWER",
    "question": "어느 하나의 트랜잭션이 실패하여 롤백(취소)될 때, 해당 트랜잭션이 갱신했던 데이터를 참조하여 작업한 다른 트랜잭션들까지 연쇄적으로 롤백되어야 하는 현상의 명칭을 쓰시오.",
    "answer": [
      "연쇄 복귀",
      "Cascading Rollback",
      "연쇄 취소"
    ],
    "explanation": "연쇄 복귀(Cascading Rollback)는 시스템 자원을 대량 소모하며 트랜잭션 처리 지연을 유발합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "병행제어",
      "연쇄복귀",
      "CascadingRollback"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_037",
    "subject": "데이터베이스구축",
    "category": "병행 제어 기법",
    "subCategory": "로킹",
    "type": "SHORT_ANSWER",
    "question": "트랜잭션이 데이터를 사용하기 전에 락을 획득하는 확장(Growing) 단계와, 처리가 끝난 락을 해제하기만 하는 축소(Shrinking) 단계로 나누어 직렬성을 보장하는 규약의 명칭을 쓰시오.",
    "answer": [
      "2단계 로킹 규약",
      "2단계 잠금 규약",
      "2PL",
      "Two-Phase Locking"
    ],
    "explanation": "2PL은 확장 단계에서는 Lock만 획득하고 Unlock을 할 수 없으며, 축소 단계에서는 Unlock만 수행할 수 있습니다. 교착상태(Deadlock)는 발생할 수 있습니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "병행제어",
      "2PL",
      "2단계로킹",
      "직렬성"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_038",
    "subject": "데이터베이스구축",
    "category": "병행 제어 기법",
    "subCategory": "타임스탬프",
    "type": "SHORT_ANSWER",
    "question": "트랜잭션이 시스템에 진입할 때 고유한 타임스탬프를 부여하고, 데이터 접근 순서를 타임스탬프 순서대로 강제하여 직렬성을 보장하는 비잠금(Lock-free) 기법의 명칭을 쓰시오.",
    "answer": [
      "타임스탬프 순서 규약",
      "타임스탬프 순서화",
      "Timestamp Ordering"
    ],
    "explanation": "타임스탬프 순서 규약은 락을 사용하지 않으므로 교착상태(Deadlock)가 발생하지 않는 장점이 있습니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "병행제어",
      "타임스탬프",
      "TimestampOrdering",
      "교착상태없음"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_039",
    "subject": "데이터베이스구축",
    "category": "병행 제어 기법",
    "subCategory": "MVCC",
    "type": "SHORT_ANSWER",
    "question": "데이터를 갱신할 때 기존 데이터를 덮어쓰지 않고 새로운 버전의 데이터를 생성하여, 읽기 작업과 쓰기 작업이 서로 블로킹하지 않도록 하는 동시성 제어 기법의 영문 약어를 쓰시오.",
    "answer": [
      "MVCC",
      "Multi-Version Concurrency Control",
      "다중 버전 동시성 제어"
    ],
    "explanation": "MVCC는 오라클, PostgreSQL, MySQL(InnoDB) 등 현대 RDBMS에서 읽기 잠금 없이 높은 동시성을 달성하는 핵심 메커니즘입니다.",
    "difficulty": "HARD",
    "keywords": [
      "MVCC",
      "다중버전동시성제어",
      "병행제어"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_040",
    "subject": "데이터베이스구축",
    "category": "데이터베이스 회복",
    "subCategory": "로그 기반 회복",
    "type": "SHORT_ANSWER",
    "question": "트랜잭션 수행 도중 발생한 변경 내용을 즉시 데이터베이스에 반영하지 않고 로그 파일에만 기록하다가, 커밋이 완료된 시점에 데이터베이스에 반영하는 회복 기법의 명칭을 쓰시오.",
    "answer": [
      "지연 갱신 기법",
      "지연 갱신",
      "Deferred Update"
    ],
    "explanation": "지연 갱신 기법은 장애 발생 시 트랜잭션이 커밋되지 않았으면 UNDO할 필요가 없고 무시하면 되며, 커밋된 트랜잭션은 REDO만 수행합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "회복기법",
      "지연갱신",
      "DeferredUpdate",
      "REDO"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_041",
    "subject": "데이터베이스구축",
    "category": "데이터베이스 회복",
    "subCategory": "로그 기반 회복",
    "type": "SHORT_ANSWER",
    "question": "트랜잭션 수행 도중 변경 내용을 데이터베이스와 로그에 즉시 반영하며, 장애 발생 시 미완료 트랜잭션은 UNDO하고 완료 트랜잭션은 REDO를 수행하는 회복 기법의 명칭을 쓰시오.",
    "answer": [
      "즉시 갱신 기법",
      "즉시 갱신",
      "Immediate Update"
    ],
    "explanation": "즉시 갱신 기법은 장애 시 커밋된 트랜잭션에 대해서는 REDO를, 커밋되지 않은 트랜잭션에 대해서는 UNDO를 모두 수행해야 합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "회복기법",
      "즉시갱신",
      "ImmediateUpdate",
      "UNDO",
      "REDO"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_042",
    "subject": "데이터베이스구축",
    "category": "데이터베이스 회복",
    "subCategory": "검사점 회복",
    "type": "SHORT_ANSWER",
    "question": "장애 발생 시 로그 전체를 검색하지 않고 주기적으로 메모리의 변경 내용을 디스크에 동기화한 체크포인트 시점 이후의 로그만 검색하여 회복 시간을 줄이는 기법의 명칭을 쓰시오.",
    "answer": [
      "검사점 회복 기법",
      "체크포인트 회복",
      "Checkpoint Recovery",
      "검사점 기법"
    ],
    "explanation": "검사점(Checkpoint) 기법은 체크포인트 이전의 완료 트랜잭션은 회복 대상에서 제외하여 복구 비용을 획기적으로 줄입니다.",
    "difficulty": "EASY",
    "keywords": [
      "회복기법",
      "검사점",
      "체크포인트",
      "Checkpoint"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_043",
    "subject": "데이터베이스구축",
    "category": "데이터베이스 회복",
    "subCategory": "그림자 페이징",
    "type": "SHORT_ANSWER",
    "question": "트랜잭션 실행 중 데이터 페이지를 갱신할 때 현재 페이지 테이블 외에 원본을 유지하는 그림자(Shadow) 페이지 테이블을 별도로 두어 로그 없이 복구하는 회복 기법을 쓰시오.",
    "answer": [
      "그림자 페이징",
      "그림자 페이징 기법",
      "Shadow Paging"
    ],
    "explanation": "그림자 페이징은 트랜잭션 실패 시 그림자 페이지 테이블 포인터로 되돌리기만 하면 되므로 UNDO/REDO 로그 오버헤드가 없습니다.",
    "difficulty": "HARD",
    "keywords": [
      "회복기법",
      "그림자페이징",
      "ShadowPaging"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_044",
    "subject": "데이터베이스구축",
    "category": "인덱스",
    "subCategory": "인덱스 구조",
    "type": "SHORT_ANSWER",
    "question": "테이블의 실제 물리적 데이터 정렬 순서와 인덱스의 정렬 순서가 완벽히 일치하여, 테이블당 단 하나만 생성할 수 있는 인덱스의 명칭을 쓰시오.",
    "answer": [
      "클러스터드 인덱스",
      "클러스터 인덱스",
      "Clustered Index"
    ],
    "explanation": "클러스터드 인덱스는 리프 노드 자체가 실제 데이터 페이지입니다. 책의 본문 페이지와 같으며 범위 검색에 매우 유리합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "인덱스",
      "클러스터드인덱스",
      "물리정렬일치"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_045",
    "subject": "데이터베이스구축",
    "category": "인덱스",
    "subCategory": "인덱스 구조",
    "type": "SHORT_ANSWER",
    "question": "물리적 데이터와는 별도의 공간에 정렬된 키 값과 실제 데이터의 주소(RID, 행 위치) 포인터를 저장하여 한 테이블에 여러 개 생성할 수 있는 인덱스의 명칭을 쓰시오.",
    "answer": [
      "넌클러스터드 인덱스",
      "비클러스터드 인덱스",
      "Non-Clustered Index"
    ],
    "explanation": "넌클러스터드 인덱스는 책의 맨 뒤 '찾아보기(색인)'와 같아서 여러 개를 만들 수 있습니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "인덱스",
      "넌클러스터드인덱스",
      "비클러스터드"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_046",
    "subject": "데이터베이스구축",
    "category": "인덱스",
    "subCategory": "B+ Tree",
    "type": "SHORT_ANSWER",
    "question": "모든 실제 키와 데이터 포인터는 리프 노드에만 저장하고, 리프 노드들끼리 연결 리스트(Linked List)로 이어져 순차 스캔과 범위 검색에 매우 효율적인 트리 인덱스의 명칭을 쓰시오.",
    "answer": [
      "B+ 트리",
      "비플러스 트리",
      "B+ Tree",
      "B+트리"
    ],
    "explanation": "B+ 트리는 인덱스 노드에는 키만 보관하여 팬아웃(Fan-out)을 키우고, 리프 노드의 순차 링크를 통해 Full Scan과 Range Scan 속도를 높입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "인덱스",
      "B+트리",
      "리프노드순차링크"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_047",
    "subject": "데이터베이스구축",
    "category": "분산 데이터베이스",
    "subCategory": "투명성",
    "type": "SHORT_ANSWER",
    "question": "사용자가 분산 데이터베이스에서 데이터가 물리적으로 어느 서버나 네트워크 위치에 저장되어 있는지 알 필요 없이 논리적 이름만으로 접근할 수 있는 투명성의 명칭을 쓰시오.",
    "answer": [
      "위치 투명성",
      "Location Transparency"
    ],
    "explanation": "위치 투명성은 데이터의 실제 저장 장소(IP, 물리 경로)와 무관하게 데이터베이스 객체 이름만으로 조회가 가능함을 보장합니다.",
    "difficulty": "EASY",
    "keywords": [
      "분산DB",
      "위치투명성",
      "LocationTransparency"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_048",
    "subject": "데이터베이스구축",
    "category": "분산 데이터베이스",
    "subCategory": "투명성",
    "type": "SHORT_ANSWER",
    "question": "하나의 논리적 릴레이션이 여러 단편(Fragment)으로 분할되어 여러 노드에 저장되어 있더라도, 사용자는 단일 릴레이션처럼 접근할 수 있는 투명성의 명칭을 쓰시오.",
    "answer": [
      "분할 투명성",
      "단편화 투명성",
      "Fragmentation Transparency"
    ],
    "explanation": "분할(단편화) 투명성은 수평/수직 분할된 단편 데이터를 하나의 통일된 테이블처럼 조회할 수 있게 합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "분산DB",
      "분할투명성",
      "단편화투명성"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_049",
    "subject": "데이터베이스구축",
    "category": "분산 데이터베이스",
    "subCategory": "투명성",
    "type": "SHORT_ANSWER",
    "question": "동일한 데이터가 성능 및 가용성을 위해 여러 서버 노드에 복제되어 저장되어 있더라도, 사용자는 마치 하나의 데이터만 존재하는 것처럼 사용하는 투명성의 명칭을 쓰시오.",
    "answer": [
      "복제 투명성",
      "Replication Transparency"
    ],
    "explanation": "복제 투명성은 다중 사본이 존재해도 데이터 갱신 시 시스템이 알아서 모든 사본을 일치시켜 사용자가 사본 관리를 신경 쓰지 않게 합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "분산DB",
      "복제투명성",
      "ReplicationTransparency"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_050",
    "subject": "데이터베이스구축",
    "category": "분산 데이터베이스",
    "subCategory": "투명성",
    "type": "SHORT_ANSWER",
    "question": "분산 환경에서 특정 노드, 통신 링크, 디스크 장애가 발생하더라도 전체 트랜잭션이 무결성을 유지하며 지속 동작할 수 있는 투명성의 명칭을 쓰시오.",
    "answer": [
      "장애 투명성",
      "고장 투명성",
      "Failure Transparency"
    ],
    "explanation": "장애 투명성은 개별 구성요소의 고장에도 불구하고 전체 시스템이 올바르게 트랜잭션을 처리함을 보장합니다.",
    "difficulty": "EASY",
    "keywords": [
      "분산DB",
      "장애투명성",
      "FailureTransparency"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_051",
    "subject": "데이터베이스구축",
    "category": "분산 데이터베이스",
    "subCategory": "CAP 정리",
    "type": "SHORT_ANSWER",
    "question": "분산 시스템은 일관성(Consistency), 가용성(Availability), 분할 허용성(Partition tolerance)의 3가지 속성을 모두 동시에 만족할 수 없다는 이론의 명칭을 쓰시오.",
    "answer": [
      "CAP 정리",
      "CAP 이론",
      "CAP Theorem"
    ],
    "explanation": "CAP 정리는 네트워크 단절(P)이 발생할 수 있는 분산 환경에서 시스템은 일관성(CP) 또는 가용성(AP) 중 하나를 선택해야 함을 증명합니다.",
    "difficulty": "EASY",
    "keywords": [
      "CAP",
      "CAP정리",
      "분산시스템",
      "NoSQL"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_052",
    "subject": "데이터베이스구축",
    "category": "NoSQL",
    "subCategory": "BASE 특성",
    "type": "SHORT_ANSWER",
    "question": "RDBMS의 ACID에 대응되는 NoSQL 분산 시스템의 특성으로 기본적 가용성, 유연한 상태, 결과적 일관성을 의미하는 약어 모델의 명칭을 쓰시오.",
    "answer": [
      "BASE",
      "base",
      "Basically Available Soft state Eventually consistent"
    ],
    "explanation": "BASE는 Basically Available(기본적 가용성), Soft state(유연한 상태), Eventually consistent(최종 일관성)의 약어로 가용성을 위해 즉각적 일관성을 양보합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "BASE",
      "NoSQL",
      "최종일관성",
      "ACID비교"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_053",
    "subject": "데이터베이스구축",
    "category": "데이터 모델링",
    "subCategory": "관계",
    "type": "SHORT_ANSWER",
    "question": "부모 엔터티의 기본키가 자식 엔터티의 기본키(PK) 구성원으로 상속되는 강한 종속 관계의 명칭을 쓰시오.",
    "answer": [
      "식별 관계",
      "Identifying Relationship"
    ],
    "explanation": "식별 관계는 실선으로 표기하며, 자식 엔터티는 부모의 기본키를 자신의 복합 기본키 일부로 포함합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "ERD",
      "식별관계",
      "기본키상속"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_054",
    "subject": "데이터베이스구축",
    "category": "데이터 모델링",
    "subCategory": "관계",
    "type": "SHORT_ANSWER",
    "question": "부모 엔터티의 기본키가 자식 엔터티의 기본키가 아닌 일반 외래키(일반 속성)로만 상속되는 느슨한 참조 관계의 명칭을 쓰시오.",
    "answer": [
      "비식별 관계",
      "Non-identifying Relationship"
    ],
    "explanation": "비식별 관계는 점선으로 표기하며, 자식 엔터티는 독립적인 기본키를 가지고 부모 기본키는 단순 참조용 외래키로 유지합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "ERD",
      "비식별관계",
      "일반속성상속"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_055",
    "subject": "데이터베이스구축",
    "category": "데이터 모델링",
    "subCategory": "용어",
    "type": "SHORT_ANSWER",
    "question": "관계형 데이터 모델에서 릴레이션을 구성하는 속성(열, Attribute)의 총 개수를 뜻하는 용어의 명칭을 쓰시오.",
    "answer": [
      "차수",
      "Degree"
    ],
    "explanation": "속성의 수는 차수(Degree)이고, 튜플(행)의 총 개수는 카디널리티(Cardinality, 기수)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "관계형모델",
      "차수",
      "Degree",
      "속성수"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_056",
    "subject": "데이터베이스구축",
    "category": "SQL",
    "subCategory": "DDL",
    "type": "SHORT_ANSWER",
    "question": "테이블의 데이터는 모두 삭제하면서 물리적 저장 공간까지 초기화하고, DML인 DELETE와 달리 롤백이 불가능한 DDL 명령어의 명칭을 쓰시오.",
    "answer": [
      "TRUNCATE",
      "TRUNCATE TABLE",
      "트렁케이트"
    ],
    "explanation": "TRUNCATE는 테이블 구조는 유지하면서 데이터 전체를 빠르게 삭제(공간 반환)하며 로그를 최소화하여 롤백이 불가합니다.",
    "difficulty": "EASY",
    "keywords": [
      "SQL",
      "TRUNCATE",
      "DDL",
      "롤백불가"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_057",
    "subject": "데이터베이스구축",
    "category": "SQL",
    "subCategory": "윈도우 함수",
    "type": "SHORT_ANSWER",
    "question": "SQL에서 결과 행의 순위를 부여할 때 동일한 값이 나오면 같은 등수를 부여하고, 그 다음 등수는 건너뛰지 않고 연속해서 부여하는 윈도우 함수의 명칭을 쓰시오.",
    "answer": [
      "DENSE_RANK",
      "DENSE_RANK()",
      "덴스 랭크"
    ],
    "explanation": "RANK는 1, 2, 2, 4 순으로 건너뛰고, DENSE_RANK는 1, 2, 2, 3 순으로 연속 등수를 부여합니다. ROW_NUMBER는 1, 2, 3, 4 고유 번호를 줍니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "SQL",
      "DENSE_RANK",
      "윈도우함수",
      "순위함수"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_058",
    "subject": "데이터베이스구축",
    "category": "SQL",
    "subCategory": "윈도우 함수",
    "type": "SHORT_ANSWER",
    "question": "SQL 순위 함수 중 동일한 값이 있더라도 중복 등수 없이 각 행에 1부터 시작하는 고유한 일련번호를 순차 부여하는 함수의 명칭을 쓰시오.",
    "answer": [
      "ROW_NUMBER",
      "ROW_NUMBER()",
      "로우 넘버"
    ],
    "explanation": "ROW_NUMBER()는 정렬 순서에 따라 각 행에 1씩 증가하는 유일한 번호를 매깁니다.",
    "difficulty": "EASY",
    "keywords": [
      "SQL",
      "ROW_NUMBER",
      "일련번호"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_059",
    "subject": "데이터베이스구축",
    "category": "SQL",
    "subCategory": "DCL",
    "type": "SHORT_ANSWER",
    "question": "데이터베이스 사용자에게 특정 테이블의 SELECT, INSERT 등의 권한을 부여하는 DCL 명령어의 명칭을 쓰시오.",
    "answer": [
      "GRANT",
      "grant",
      "그랜트"
    ],
    "explanation": "권한을 부여할 때는 GRANT 문을 사용하고, 부여했던 권한을 회수할 때는 REVOKE 문을 사용합니다.",
    "difficulty": "EASY",
    "keywords": [
      "SQL",
      "GRANT",
      "DCL",
      "권한부여"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_060",
    "subject": "데이터베이스구축",
    "category": "SQL",
    "subCategory": "DCL",
    "type": "SHORT_ANSWER",
    "question": "사용자에게 부여했던 데이터베이스 권한을 다시 회수(취소)하는 SQL 제어어(DCL) 명령어의 명칭을 쓰시오.",
    "answer": [
      "REVOKE",
      "revoke",
      "리보크"
    ],
    "explanation": "REVOKE 권한 ON 객체 FROM 사용자 [CASCADE | RESTRICT] 문법으로 권한을 철회합니다.",
    "difficulty": "EASY",
    "keywords": [
      "SQL",
      "REVOKE",
      "DCL",
      "권한회수"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_061",
    "subject": "데이터베이스구축",
    "category": "트랜잭션",
    "subCategory": "상태 전이",
    "type": "SHORT_ANSWER",
    "question": "트랜잭션의 생명주기 상태 중 트랜잭션의 마지막 연산까지 성공적으로 실행을 마쳤으나, 아직 최종 변경 내용을 디스크에 반영(Commit)하기 직전 단계의 상태 명칭을 쓰시오.",
    "answer": [
      "부분 완료",
      "Partially Committed",
      "부분완료"
    ],
    "explanation": "부분 완료(Partially Committed)는 모든 명령문 실행이 끝났으나 디스크 로그 기록 및 Commit 반영이 아직 완료되지 않은 상태입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "트랜잭션",
      "부분완료",
      "상태전이"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_062",
    "subject": "데이터베이스구축",
    "category": "시스템 카탈로그",
    "subCategory": "데이터 사전",
    "type": "SHORT_ANSWER",
    "question": "데이터베이스에 저장된 테이블, 뷰, 인덱스, 사용자 권한 등 데이터에 관한 데이터(메타데이터, Metadata)를 저장하고 관리하는 시스템 전용 테이블들의 집합 명칭을 쓰시오.",
    "answer": [
      "데이터 사전",
      "시스템 카탈로그",
      "Data Dictionary",
      "System Catalog"
    ],
    "explanation": "데이터 사전(시스템 카탈로그)은 사용자가 직접 갱신할 수 없으며 DDL 문이 실행될 때 DBMS에 의해 자동으로 갱신됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "데이터사전",
      "시스템카탈로그",
      "메타데이터",
      "DataDictionary"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_063",
    "subject": "데이터베이스구축",
    "category": "SQL",
    "subCategory": "DDL",
    "type": "SHORT_ANSWER",
    "question": "이미 생성된 테이블의 컬럼을 새로 추가하거나(ADD), 기존 컬럼의 데이터 타입을 변경하거나(MODIFY/ALTER), 불필요한 컬럼을 삭제(DROP)할 때 사용하는 DDL 명령어의 명칭을 쓰시오.",
    "answer": [
      "ALTER TABLE",
      "ALTER",
      "알터 테이블"
    ],
    "explanation": "ALTER TABLE 문은 테이블 스키마 구조를 변경할 때 사용하는 데이터 정의어(DDL)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "SQL",
      "ALTERTABLE",
      "DDL",
      "테이블수정"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_DB_064",
    "subject": "데이터베이스구축",
    "category": "SQL",
    "subCategory": "트리거",
    "type": "SHORT_ANSWER",
    "question": "특정 테이블에 INSERT, UPDATE, DELETE 같은 DML 문이 실행될 때 데이터베이스 시스템에 의해 자동으로 실행되도록 작성된 절차형 SQL 객체의 명칭을 쓰시오.",
    "answer": [
      "트리거",
      "Trigger"
    ],
    "explanation": "트리거는 데이터 무결성 강제, 자동 변경 이력(Audit) 기록 등에 사용되며 COMMIT이나 ROLLBACK을 직접 실행할 수 없습니다.",
    "difficulty": "EASY",
    "keywords": [
      "SQL",
      "트리거",
      "Trigger",
      "절차형SQL"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_015",
    "subject": "신기술/보안",
    "category": "보안 3대 요소",
    "subCategory": "기밀성",
    "type": "SHORT_ANSWER",
    "question": "인가된 사용자만이 시스템과 정보에 접근할 수 있으며, 비인가자가 정보를 열람하거나 탈취하지 못하도록 보호하는 보안 원칙의 명칭을 쓰시오.",
    "answer": [
      "기밀성",
      "Confidentiality"
    ],
    "explanation": "정보보안 3대 요소(CIA)는 기밀성(Confidentiality), 무결성(Integrity), 가용성(Availability)입니다. 기밀성은 암호화와 접근 통제로 보장합니다.",
    "difficulty": "EASY",
    "keywords": [
      "CIA",
      "기밀성",
      "Confidentiality",
      "보안3대요소"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_016",
    "subject": "신기술/보안",
    "category": "보안 원칙",
    "subCategory": "부인 방지",
    "type": "SHORT_ANSWER",
    "question": "송신자나 수신자가 메시지를 전송하거나 수신한 사실을 사후에 거짓으로 부인할 수 없도록 전자서명 등의 기술로 명백한 증거를 제공하는 보안 서비스의 명칭을 쓰시오.",
    "answer": [
      "부인 방지",
      "부인봉쇄",
      "Non-Repudiation",
      "부인방지"
    ],
    "explanation": "부인 방지(Non-Repudiation)는 공개키 기반 전자서명(Digital Signature)을 통해 발신 사실과 수신 사실을 증명하여 법적 분쟁을 방지합니다.",
    "difficulty": "EASY",
    "keywords": [
      "보안원칙",
      "부인방지",
      "전자서명",
      "Non-Repudiation"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_017",
    "subject": "신기술/보안",
    "category": "보안 3대 요소",
    "subCategory": "가용성",
    "type": "SHORT_ANSWER",
    "question": "인가된 사용자가 시스템이나 정보 자원을 필요로 할 때 언제든지 지체 없이 정상적으로 사용할 수 있도록 보장하는 보안 원칙의 명칭을 쓰시오.",
    "answer": [
      "가용성",
      "Availability"
    ],
    "explanation": "가용성(Availability)은 DoS/DDoS 공격이나 시스템 장애로부터 보호하고 백업 및 이중화를 통해 유지됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "CIA",
      "가용성",
      "Availability",
      "정상사용"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_018",
    "subject": "신기술/보안",
    "category": "암호화",
    "subCategory": "대칭키 암호",
    "type": "SHORT_ANSWER",
    "question": "1975년 미국 NBS(현 NIST)가 표준으로 채택했던 64비트 평문 블록을 56비트 비밀키를 사용하여 16라운드 페이스텔(Feistel) 구조로 암호화하는 고전 대칭키 암호 알고리즘의 영문 약어를 쓰시오.",
    "answer": [
      "DES",
      "des",
      "Data Encryption Standard"
    ],
    "explanation": "DES는 56비트의 짧은 키 길이로 인해 현재는 전수 공격에 취약하여 AES로 완전히 대체되었습니다.",
    "difficulty": "EASY",
    "keywords": [
      "암호화",
      "DES",
      "대칭키",
      "페이스텔",
      "56비트키"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_019",
    "subject": "신기술/보안",
    "category": "암호화",
    "subCategory": "공개키 암호",
    "type": "SHORT_ANSWER",
    "question": "타원곡선 위의 이산대수 문제에 기반하여 RSA보다 훨씬 짧은 키 길이(256비트)로도 동일한 보안 강도를 제공하는 공개키 암호화 기법의 영문 약어를 쓰시오.",
    "answer": [
      "ECC",
      "Elliptic Curve Cryptography",
      "타원곡선 암호"
    ],
    "explanation": "ECC는 연산 부담과 키 길이가 작아 스마트카드, 모바일 기기, SSL 인증서 등에 널리 활용됩니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "암호화",
      "ECC",
      "타원곡선",
      "공개키"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_020",
    "subject": "신기술/보안",
    "category": "암호화",
    "subCategory": "키 교환",
    "type": "SHORT_ANSWER",
    "question": "사전에 비밀을 공유하지 않은 두 당사자가 안전하지 않은 공개 통신 채널을 통해 공통의 대칭키를 안전하게 생성하고 교환할 수 있게 한 최초의 키 교환 알고리즘의 명칭을 쓰시오.",
    "answer": [
      "디피 헬만",
      "디피 헬먼",
      "Diffie-Hellman",
      "DH"
    ],
    "explanation": "디피-헬만(Diffie-Hellman) 키 교환은 이산대수 문제의 난이도에 기반하며 TLS 핸드셰이크 등에서 세션키를 공유할 때 쓰입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "암호화",
      "디피헬만",
      "Diffie-Hellman",
      "키교환"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_021",
    "subject": "신기술/보안",
    "category": "암호화",
    "subCategory": "대칭키 암호",
    "type": "SHORT_ANSWER",
    "question": "1999년 한국인터넷진흥원(KISA)이 개발한 128비트 블록 암호화 알고리즘으로 전자상거래 표준으로 채택된 국내 대칭키 암호 알고리즘의 명칭을 쓰시오.",
    "answer": [
      "SEED",
      "씨드",
      "시드"
    ],
    "explanation": "SEED는 128비트 블록 크기, 128비트 키 크기를 사용하며 페이스텔(Feistel) 구조로 설계된 국내 표준 암호 알고리즘입니다.",
    "difficulty": "EASY",
    "keywords": [
      "암호화",
      "SEED",
      "KISA",
      "대칭키"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_022",
    "subject": "신기술/보안",
    "category": "암호화",
    "subCategory": "대칭키 암호",
    "type": "SHORT_ANSWER",
    "question": "국가정보원과 산학연이 함께 개발한 경량 블록 암호화 알고리즘으로, 경량 환경 및 하드웨어 구현 효율성을 고려하여 SPN 구조를 채택한 국내 표준 암호 알고리즘의 명칭을 쓰시오.",
    "answer": [
      "ARIA",
      "아리아"
    ],
    "explanation": "ARIA(Academy, Research Institute, Agency)는 128/192/256비트 키를 지원하는 국내 블록 암호 알고리즘입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "암호화",
      "ARIA",
      "국가정보원",
      "SPN구조"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_023",
    "subject": "신기술/보안",
    "category": "암호화",
    "subCategory": "해시 함수",
    "type": "SHORT_ANSWER",
    "question": "임의 길이의 입력 데이터를 고정된 256비트 길이의 해시 값으로 변환하며, 미국 NSA가 설계한 SHA-2 제품군에 속하는 암호학적 해시 함수의 명칭을 쓰시오.",
    "answer": [
      "SHA-256",
      "SHA256",
      "sha256"
    ],
    "explanation": "SHA-256은 블록체인 비트코인, 공인인증서, 비밀번호 해싱 등 전 세계 보안 표준으로 사용되는 일방향 해시 함수입니다.",
    "difficulty": "EASY",
    "keywords": [
      "해시함수",
      "SHA-256",
      "256비트"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_024",
    "subject": "신기술/보안",
    "category": "암호화",
    "subCategory": "해시 보강",
    "type": "SHORT_ANSWER",
    "question": "비밀번호를 해시할 때 레인보우 테이블(Rainbow Table) 역추적 공격을 방어하기 위해 비밀번호 원문에 추가하는 무작위 난수 데이터의 명칭을 쓰시오.",
    "answer": [
      "솔트",
      "소금",
      "Salt",
      "솔팅"
    ],
    "explanation": "솔트(Salt)를 추가하여 해싱하면 동일한 비밀번호라도 서로 완전히 다른 해시 결과가 나와 사전 공격과 레인보우 공격을 무력화합니다.",
    "difficulty": "EASY",
    "keywords": [
      "암호화",
      "솔트",
      "Salt",
      "레인보우테이블"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_025",
    "subject": "신기술/보안",
    "category": "접근 통제",
    "subCategory": "MAC",
    "type": "SHORT_ANSWER",
    "question": "주체의 보안 등급(Secret, Top Secret 등)과 객체의 보안 레이블을 시스템 관리자가 비교하여 접근을 엄격히 강제하는 접근 통제 모델의 영문 약어를 쓰시오.",
    "answer": [
      "MAC",
      "Mandatory Access Control",
      "강제적 접근 통제",
      "강제 접근 통제"
    ],
    "explanation": "MAC는 군사, 정부 등 고보안 환경에 적합하며 사용자가 임의로 권한을 부여할 수 없습니다.",
    "difficulty": "EASY",
    "keywords": [
      "접근통제",
      "MAC",
      "강제적접근통제",
      "보안등급"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_026",
    "subject": "신기술/보안",
    "category": "접근 통제",
    "subCategory": "ABAC",
    "type": "SHORT_ANSWER",
    "question": "주체의 속성(직급, 부서), 객체의 속성(보안 등급), 환경 속성(접속 시간, 위치) 등을 동적 정책 규칙에 따라 비교 평가하여 접근을 허용하거나 차단하는 차세대 접근 통제 모델의 영문 약어를 쓰시오.",
    "answer": [
      "ABAC",
      "Attribute-Based Access Control",
      "속성 기반 접근 통제",
      "속성기반 접근통제"
    ],
    "explanation": "ABAC는 RBAC보다 훨씬 더 세밀하고 유연한 접근 제어를 동적으로 수행할 수 있는 최신 접근 통제 표준입니다.",
    "difficulty": "HARD",
    "keywords": [
      "접근통제",
      "ABAC",
      "속성기반",
      "동적정책"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_027",
    "subject": "신기술/보안",
    "category": "보안 모델",
    "subCategory": "벨-라파듈라",
    "type": "SHORT_ANSWER",
    "question": "군사용 보안 모델로 기밀성을 보장하기 위해 'No Read Up(상위 등급 읽기 금지)', 'No Write Down(하위 등급 쓰기 금지)' 속성을 정의한 보안 모델의 명칭을 쓰시오.",
    "answer": [
      "벨 라파듈라",
      "벨 라파듈라 모델",
      "Bell-LaPadula",
      "BLP",
      "BLP 모델"
    ],
    "explanation": "벨-라파듈라(BLP) 모델은 기밀성을 최우선으로 하여 비밀 정보가 하위 보안 등급으로 누출되는 것을 엄격히 방지합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "보안모델",
      "벨라파듈라",
      "BLP",
      "기밀성",
      "NoReadUp"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_028",
    "subject": "신기술/보안",
    "category": "보안 모델",
    "subCategory": "비바 모델",
    "type": "SHORT_ANSWER",
    "question": "벨-라파듈라의 단점을 보완하여 무결성(Integrity)을 최우선으로 하며, 'No Read Down(하위 등급 읽기 금지)', 'No Write Up(상위 등급 쓰기 금지)' 규칙을 갖는 보안 모델의 명칭을 쓰시오.",
    "answer": [
      "비바",
      "비바 모델",
      "Biba",
      "Biba Model"
    ],
    "explanation": "비바(Biba) 모델은 비인가자에 의한 데이터 오염을 막아 무결성을 보장합니다. 상위 무결성 주체가 하위 데이터를 읽어 오염되는 것을 차단합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "보안모델",
      "비바모델",
      "Biba",
      "무결성",
      "NoReadDown"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_029",
    "subject": "신기술/보안",
    "category": "인증 기술",
    "subCategory": "SSO",
    "type": "SHORT_ANSWER",
    "question": "한 번의 로그인 인증으로 기업 내 분산된 여러 웹 시스템 및 애플리케이션을 추가 인증 없이 자유롭게 이용할 수 있는 통합 인증 기술의 영문 약어를 쓰시오.",
    "answer": [
      "SSO",
      "Single Sign-On",
      "싱글 사인온"
    ],
    "explanation": "SSO는 사용자 편의성을 높이고 인증 중앙 관리를 가능하게 합니다. SAML, OAuth, OIDC 프로토콜 등이 기반으로 쓰입니다.",
    "difficulty": "EASY",
    "keywords": [
      "인증",
      "SSO",
      "SingleSignOn",
      "통합로그인"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_030",
    "subject": "신기술/보안",
    "category": "인증 기술",
    "subCategory": "OAuth",
    "type": "SHORT_ANSWER",
    "question": "사용자의 비밀번호를 노출하지 않고 제3자 애플리케이션에 자원(API) 접근 권한을 위임(Authorization)하기 위한 개방형 표준 프로토콜의 명칭을 쓰시오.",
    "answer": [
      "OAuth",
      "OAuth 2.0",
      "OAuth2.0"
    ],
    "explanation": "OAuth 2.0은 Access Token을 발급하여 구글, 카카오 등의 소셜 로그인 및 리소스 접근 권한 위임에 널리 쓰입니다.",
    "difficulty": "EASY",
    "keywords": [
      "인증",
      "OAuth",
      "OAuth2.0",
      "권한위임"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_031",
    "subject": "신기술/보안",
    "category": "네트워크 공격",
    "subCategory": "DoS",
    "type": "SHORT_ANSWER",
    "question": "TCP 3-Way Handshake 취약점을 이용하여 공격자가 대량의 SYN 패킷만 전송하고 ACK 응답을 보내지 않아 서버의 대기 큐(Backlog Queue)를 고갈시키는 DoS 공격의 명칭을 쓰시오.",
    "answer": [
      "SYN Flooding",
      "SYN 플러딩",
      "신 플러딩"
    ],
    "explanation": "SYN Flooding은 서버를 SYN_RECEIVED 상태로 묶어 두어 정상 연결을 차단합니다. SYN Cookie 기법 등으로 방어합니다.",
    "difficulty": "EASY",
    "keywords": [
      "DoS",
      "SYNFlooding",
      "3-wayHandshake",
      "백로그큐"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_032",
    "subject": "신기술/보안",
    "category": "네트워크 공격",
    "subCategory": "DoS",
    "type": "SHORT_ANSWER",
    "question": "출발지 IP 주소를 피해자 서버 IP로 위조한 후, 다이렉트 브로드캐스트 주소로 대량의 ICMP Echo Request를 보내 네트워크 전체가 증폭된 응답을 피해자에게 쏟아붓게 하는 공격의 명칭을 쓰시오.",
    "answer": [
      "스머프",
      "스머핑",
      "Smurf",
      "Smurfing",
      "스머프 공격"
    ],
    "explanation": "스머프(Smurf) 공격은 ICMP 반사 및 증폭을 이용한 서비스 거부 공격입니다. 라우터에서 Directed Broadcast를 차단하여 대응합니다.",
    "difficulty": "EASY",
    "keywords": [
      "DoS",
      "Smurf",
      "스머프",
      "ICMP",
      "브로드캐스트"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_033",
    "subject": "신기술/보안",
    "category": "네트워크 공격",
    "subCategory": "DoS",
    "type": "SHORT_ANSWER",
    "question": "인터넷 규격 허용 크기(65,535바이트)를 초과하는 거대한 ICMP 패킷을 의도적으로 잘게 쪼개어 전송함으로써 수신 측이 이를 재조합하는 과정에서 버퍼 오버플로우와 시스템 마비를 일으키는 공격을 쓰시오.",
    "answer": [
      "Ping of Death",
      "죽음의 핑",
      "핑 오브 데스"
    ],
    "explanation": "Ping of Death는 분할된 패킷의 재조합 취약점을 노려 블루스크린이나 커널 충돌을 유발하는 고전적 DoS 공격입니다.",
    "difficulty": "EASY",
    "keywords": [
      "DoS",
      "PingofDeath",
      "죽음의핑",
      "ICMP"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_034",
    "subject": "신기술/보안",
    "category": "네트워크 공격",
    "subCategory": "DoS",
    "type": "SHORT_ANSWER",
    "question": "송신자의 출발지 IP와 포트 번호를 수신자의 목적지 IP 및 포트 번호와 동일하게 조작하여 전송함으로써, 피해 서버가 자신에게 계속 응답 패킷을 보내 루프에 빠지게 만드는 공격의 명칭을 쓰시오.",
    "answer": [
      "랜드 어택",
      "Land Attack",
      "랜드 공격"
    ],
    "explanation": "Land Attack은 출발지와 목적지가 동일한 비정상 패킷을 수신 측 방화벽에서 필터링하여 차단합니다.",
    "difficulty": "EASY",
    "keywords": [
      "DoS",
      "LandAttack",
      "랜드어택",
      "출발지목적지동일"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_035",
    "subject": "신기술/보안",
    "category": "네트워크 공격",
    "subCategory": "DoS",
    "type": "SHORT_ANSWER",
    "question": "IP 패킷을 분할(Fragmentation)하여 전송할 때 오프셋(Fragment Offset) 필드의 값을 고의로 중복되거나 어긋나게 조작하여 수신 시스템이 패킷 재조합 시 오류로 다운되게 만드는 공격을 쓰시오.",
    "answer": [
      "티어드롭",
      "Teardrop",
      "티어드롭 공격"
    ],
    "explanation": "티어드롭(Teardrop) 공격은 IP 분할 오프셋의 오버랩(겹침) 계산 취약점을 악용합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "DoS",
      "Teardrop",
      "티어드롭",
      "단편화오프셋"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_036",
    "subject": "신기술/보안",
    "category": "웹 취약점 공격",
    "subCategory": "CSRF",
    "type": "SHORT_ANSWER",
    "question": "로그인된 피해자의 권한(쿠키/세션)을 악용하여, 공격자가 조작한 악성 링크를 클릭하게 만들어 피해자의 의도와 상관없이 게시글 작성이나 비밀번호 변경 등 악의적 요청을 서버로 보내게 하는 공격의 약어를 쓰시오.",
    "answer": [
      "CSRF",
      "csrf",
      "Cross Site Request Forgery",
      "크로스 사이트 요청 위조"
    ],
    "explanation": "CSRF는 사용자의 권한을 도용하여 서버 요청을 위조합니다. 방어 대책으로 CSRF 토큰(Token), 재인증(CAPTCHA), SameSite 쿠키가 쓰입니다.",
    "difficulty": "EASY",
    "keywords": [
      "웹취약점",
      "CSRF",
      "요청위조",
      "CSRF토큰"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_037",
    "subject": "신기술/보안",
    "category": "시스템 보안 취약점",
    "subCategory": "버퍼 오버플로우",
    "type": "SHORT_ANSWER",
    "question": "메모리에 할당된 버퍼의 크기보다 더 큰 데이터를 입력하여 스택 메모리의 복귀 주소(Return Address)를 덮어쓰고, 공격자가 원하는 악성 코드를 실행시키는 공격의 명칭을 쓰시오.",
    "answer": [
      "버퍼 오버플로우",
      "Buffer Overflow",
      "스택 버퍼 오버플로우"
    ],
    "explanation": "버퍼 오버플로우는 C/C++에서 경계값 검사가 없는 strcpy, gets 등의 함수를 쓸 때 발생합니다. 방어책으로 ASLR, 카나리(Stack Canary), 안전한 함수(strncpy)가 있습니다.",
    "difficulty": "EASY",
    "keywords": [
      "보안공격",
      "버퍼오버플로우",
      "스택",
      "복귀주소"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_038",
    "subject": "신기술/보안",
    "category": "네트워크 도청/위조",
    "subCategory": "스푸핑",
    "type": "SHORT_ANSWER",
    "question": "동일 로컬 네트워크(LAN)에서 공격자가 특정 대상의 IP 주소와 자신의 MAC 주소를 매핑한 가짜 ARP Reply 패킷을 주기적으로 보내 희생자의 통신 패킷을 가로채는 공격의 명칭을 쓰시오.",
    "answer": [
      "ARP 스푸핑",
      "ARP Spoofing"
    ],
    "explanation": "ARP 스푸핑은 희생자의 ARP 캐시 테이블을 오염시켜 게이트웨이로 가는 모든 트래픽을 공격자에게 통과하게 만들어 스니핑을 유발합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "네트워크공격",
      "ARP스푸핑",
      "ARPCachePoisoning"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_039",
    "subject": "신기술/보안",
    "category": "네트워크 도청/위조",
    "subCategory": "스니핑",
    "type": "SHORT_ANSWER",
    "question": "네트워크 카드를 무차별 모드(Promiscuous Mode)로 설정하여 자신이 수신 대상이 아닌 패킷까지 모두 수집하고 도청하는 수동적 공격 기법의 명칭을 쓰시오.",
    "answer": [
      "스니핑",
      "Sniffing",
      "패킷 스니핑"
    ],
    "explanation": "스니핑은 암호화되지 않은 HTTP, FTP 통신의 ID/PW를 그대로 엿볼 수 있으며, HTTPS나 SSH 같은 암호화 통신으로 방어합니다.",
    "difficulty": "EASY",
    "keywords": [
      "네트워크공격",
      "스니핑",
      "Sniffing",
      "무차별모드"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_040",
    "subject": "신기술/보안",
    "category": "네트워크 도청/위조",
    "subCategory": "세션 하이재킹",
    "type": "SHORT_ANSWER",
    "question": "정상적으로 인증을 마쳐 연결이 확립된 두 호스트 간의 세션 식별자(Session ID)나 시퀀스 번호를 가로채 인증 과정을 거치지 않고 세션을 가로채는 공격 기법의 명칭을 쓰시오.",
    "answer": [
      "세션 하이재킹",
      "Session Hijacking"
    ],
    "explanation": "세션 하이재킹은 TCP Sequence 번호를 예측하거나 웹 세션 쿠키를 탈취하여 침투합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "보안공격",
      "세션하이재킹",
      "SessionHijacking"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_041",
    "subject": "신기술/보안",
    "category": "악성코드",
    "subCategory": "랜섬웨어",
    "type": "SHORT_ANSWER",
    "question": "피해자의 컴퓨터 시스템 파일들을 암호화하여 접근할 수 없게 만든 후, 이를 복호화해 주는 대가로 가상화폐(비트코인 등) 금전을 요구하는 악성 소프트웨어의 명칭을 쓰시오.",
    "answer": [
      "랜섬웨어",
      "Ransomware"
    ],
    "explanation": "랜섬웨어는 중요한 문서를 강력한 비대칭/대칭키로 암호화하며, 오프라인 백업 및 주기적 보안 패치가 최선의 예방책입니다.",
    "difficulty": "EASY",
    "keywords": [
      "악성코드",
      "랜섬웨어",
      "Ransomware",
      "파일암호화"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_042",
    "subject": "신기술/보안",
    "category": "지능형 공격",
    "subCategory": "APT",
    "type": "SHORT_ANSWER",
    "question": "특정 타깃을 정하고 다양한 보안 취약점과 사회공학적 기법을 복합 활용하여 장기간 은밀하게 침투·잠복하며 핵심 기밀을 탈취하는 위협 공격 형태의 영문 약어를 쓰시오.",
    "answer": [
      "APT",
      "Advanced Persistent Threat",
      "지능형 지속 위협"
    ],
    "explanation": "APT는 침투(Infiltration) → 거점 확보 → 내부 정찰 및 권한 상승 → 지속 유출의 라이프사이클을 가집니다.",
    "difficulty": "EASY",
    "keywords": [
      "보안공격",
      "APT",
      "지능형지속위협"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_043",
    "subject": "신기술/보안",
    "category": "지능형 공격",
    "subCategory": "워터링 홀",
    "type": "SHORT_ANSWER",
    "question": "표적 집단이 자주 방문하는 특정 웹사이트를 사전에 미리 감염시켜 두고, 표적 피해자가 접속해 올 때 악성코드에 감염시키는 표적형 공격 기법의 명칭을 쓰시오.",
    "answer": [
      "워터링 홀",
      "워터링홀",
      "Watering Hole"
    ],
    "explanation": "워터링 홀(Watering Hole)은 맹수가 먹잇감을 사냥하기 위해 물웅덩이에 매복하는 모습에서 유래되었습니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "보안공격",
      "워터링홀",
      "WateringHole",
      "표적공격"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_044",
    "subject": "신기술/보안",
    "category": "보안 취약점",
    "subCategory": "제로데이",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어의 취약점이 공식 발표되거나 보안 패치가 배포되기 전에, 해당 취약점을 악용하여 공격을 감행하는 기법의 명칭을 쓰시오.",
    "answer": [
      "제로데이 공격",
      "제로데이",
      "Zero-Day Attack",
      "0-day"
    ],
    "explanation": "제로데이 공격은 패치가 존재하지 않는 상태에서 이루어지므로 시그니처 기반 백신으로 탐지하기 매우 어렵습니다.",
    "difficulty": "EASY",
    "keywords": [
      "보안취약점",
      "제로데이",
      "Zero-Day",
      "패치전공격"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_045",
    "subject": "신기술/보안",
    "category": "보안 장비",
    "subCategory": "WAF",
    "type": "SHORT_ANSWER",
    "question": "일반 방화벽이 차단하지 못하는 웹 애플리케이션 계층(Layer 7)의 SQL Injection, XSS 등의 공격 트래픽을 특화하여 탐지하고 차단하는 보안 솔루션의 영문 약어를 쓰시오.",
    "answer": [
      "WAF",
      "Web Application Firewall",
      "웹 방화벽"
    ],
    "explanation": "WAF는 웹 트래픽(HTTP/HTTPS) 페이로드를 직접 분석하여 웹 표준 취약점 공격을 방어합니다.",
    "difficulty": "EASY",
    "keywords": [
      "보안솔루션",
      "WAF",
      "웹방화벽"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_046",
    "subject": "신기술/보안",
    "category": "보안 프로토콜",
    "subCategory": "IPsec",
    "type": "SHORT_ANSWER",
    "question": "네트워크 계층(IP 계층)에서 안전한 통신을 제공하는 IPsec 프로토콜 제품군 중 데이터의 기밀성(암호화)과 무결성, 발신처 인증을 모두 제공하는 프로토콜의 영문 약어를 쓰시오.",
    "answer": [
      "ESP",
      "Encapsulating Security Payload"
    ],
    "explanation": "IPsec에서 AH는 인증과 무결성만 제공(기밀성 미지원)하고, ESP는 기밀성(암호화)까지 함께 제공합니다.",
    "difficulty": "HARD",
    "keywords": [
      "IPsec",
      "ESP",
      "기밀성",
      "네트워크보안"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_047",
    "subject": "신기술/보안",
    "category": "보안 솔루션",
    "subCategory": "허니팟",
    "type": "SHORT_ANSWER",
    "question": "해커나 악성 침입자를 유인하기 위해 일부러 취약하게 설정해 둔 가짜 미끼 시스템으로, 공격자의 행동 패턴과 기법을 분석하기 위해 설치하는 유인 시스템의 명칭을 쓰시오.",
    "answer": [
      "허니팟",
      "Honeypot"
    ],
    "explanation": "허니팟(Honeypot)은 꿀단지처럼 공격자를 유인하여 실제 운영 시스템을 보호하고 새로운 공격 기법을 연구합니다.",
    "difficulty": "EASY",
    "keywords": [
      "보안솔루션",
      "허니팟",
      "Honeypot",
      "유인시스템"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_048",
    "subject": "신기술/보안",
    "category": "보안 패러다임",
    "subCategory": "제로 트러스트",
    "type": "SHORT_ANSWER",
    "question": "'절대 믿지 말고 항상 검증하라(Never Trust, Always Verify)'는 기본 원칙을 바탕으로, 내부 네트워크에 위치한 사용자나 단말기조차 신뢰하지 않고 모든 접근을 지속 인증하는 최신 보안 모델의 명칭을 쓰시오.",
    "answer": [
      "제로 트러스트",
      "Zero Trust"
    ],
    "explanation": "제로 트러스트는 경계 기반 보안의 한계를 극복하고 최소 권한, 마이크로 세그멘테이션, 지속적 신원 검증을 요구합니다.",
    "difficulty": "EASY",
    "keywords": [
      "보안패러다임",
      "제로트러스트",
      "ZeroTrust"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_049",
    "subject": "신기술/보안",
    "category": "네트워크 신기술",
    "subCategory": "SDN",
    "type": "SHORT_ANSWER",
    "question": "네트워크 장비의 제어부(Control Plane)와 데이터 전송부(Data Plane)를 물리적으로 분리하여, 중앙의 소프트웨어 컨트롤러를 통해 네트워크 트래픽을 동적으로 제어하고 프로그래밍하는 기술의 영문 약어를 쓰시오.",
    "answer": [
      "SDN",
      "Software-Defined Networking",
      "소프트웨어 정의 네트워킹"
    ],
    "explanation": "SDN은 오픈플로우(OpenFlow) 프로토콜 등을 활용하여 중앙 집중형으로 네트워크 정책을 유연하게 제어합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "신기술",
      "SDN",
      "제어부데이터부분리",
      "소프트웨어정의"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_050",
    "subject": "신기술/보안",
    "category": "개발 방법론",
    "subCategory": "DevSecOps",
    "type": "SHORT_ANSWER",
    "question": "개발(Development)과 운영(Operations)의 통합 프로세스 전반에 보안(Security)을 초기 단계부터 내재화하여 소프트웨어를 안전하게 배포하는 개발 및 운영 문화의 명칭을 쓰시오.",
    "answer": [
      "DevSecOps",
      "데브섹옵스"
    ],
    "explanation": "DevSecOps는 보안을 사후 점검이 아닌 파이프라인의 시작점(Shift-Left)부터 통합하여 취약점을 조기에 제거합니다.",
    "difficulty": "EASY",
    "keywords": [
      "신기술",
      "DevSecOps",
      "보안내재화"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_051",
    "subject": "신기술/보안",
    "category": "클라우드 서비스 모델",
    "subCategory": "SaaS",
    "type": "SHORT_ANSWER",
    "question": "인프라나 플랫폼을 구축할 필요 없이 클라우드 제공업체가 제공하는 완성된 애플리케이션 소프트웨어를 웹 브라우저나 전용 클라이언트를 통해 구독 형태로 이용하는 서비스 모델의 영문 약어를 쓰시오.",
    "answer": [
      "SaaS",
      "Software as a Service"
    ],
    "explanation": "SaaS는 Google Workspace, Microsoft 365, Slack 등이 대표적인 예입니다.",
    "difficulty": "EASY",
    "keywords": [
      "클라우드",
      "SaaS",
      "구독형소프트웨어"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_052",
    "subject": "신기술/보안",
    "category": "클라우드 서비스 모델",
    "subCategory": "IaaS",
    "type": "SHORT_ANSWER",
    "question": "서버, 스토리지, 네트워크 같은 기본 컴퓨팅 하드웨어 자원을 가상화하여 고객에게 클라우드로 임대하고, 고객이 직접 OS와 미들웨어를 설치하여 관리하는 서비스 모델의 영문 약어를 쓰시오.",
    "answer": [
      "IaaS",
      "Infrastructure as a Service"
    ],
    "explanation": "IaaS는 AWS EC2, GCP Compute Engine, Azure VM 등이 대표적입니다.",
    "difficulty": "EASY",
    "keywords": [
      "클라우드",
      "IaaS",
      "인프라임대"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_053",
    "subject": "신기술/보안",
    "category": "보안 데이터 유출 방지",
    "subCategory": "DLP",
    "type": "SHORT_ANSWER",
    "question": "사내 엔드포인트나 네트워크 경로를 상시 감시하여 기업의 핵심 기밀 문서나 개인정보가 이메일, USB, 메신저 등을 통해 외부로 무단 반출되는 것을 방지하는 보안 솔루션의 영문 약어를 쓰시오.",
    "answer": [
      "DLP",
      "Data Loss Prevention",
      "데이터 유출 방지"
    ],
    "explanation": "DLP는 USB 복사 차단, 이메일 첨부파일 검사, 화면 캡처 방지 등을 통해 내부 정보 유출을 막습니다.",
    "difficulty": "EASY",
    "keywords": [
      "보안솔루션",
      "DLP",
      "데이터유출방지"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_054",
    "subject": "신기술/보안",
    "category": "보안 로그 관리",
    "subCategory": "SIEM",
    "type": "SHORT_ANSWER",
    "question": "네트워크 장비, 서버, 보안 솔루션에서 발생하는 방대한 보안 로그와 이벤트를 빅데이터 기술로 실시간 수집·통합 분석하여 위협을 조기 감지하는 통합 보안 관제 시스템의 영문 약어를 쓰시오.",
    "answer": [
      "SIEM",
      "Security Information and Event Management"
    ],
    "explanation": "SIEM은 이기종 장비의 로그를 상관분석(Correlation Analysis)하여 지능형 위협을 신속히 탐지합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "보안솔루션",
      "SIEM",
      "통합로그관제"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_055",
    "subject": "신기술/보안",
    "category": "인증 기술",
    "subCategory": "MFA",
    "type": "SHORT_ANSWER",
    "question": "지식(패스워드), 소유(스마트폰/OTP), 생체(지문/홍채) 중 서로 다른 2개 이상의 독립된 범주의 인증 수단을 결합하여 보안성을 강화한 인증 기법의 영문 약어를 쓰시오.",
    "answer": [
      "MFA",
      "Multi-Factor Authentication",
      "다중 요소 인증",
      "2FA"
    ],
    "explanation": "MFA는 단일 패스워드 유출로 인한 계정 탈취를 효과적으로 차단합니다.",
    "difficulty": "EASY",
    "keywords": [
      "인증",
      "MFA",
      "다중요소인증",
      "2FA"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_056",
    "subject": "신기술/보안",
    "category": "웹 프로토콜",
    "subCategory": "HTTPS",
    "type": "SHORT_ANSWER",
    "question": "기존 HTTP 프로토콜의 일반 평문 통신 취약점을 해결하기 위해 전송 계층 보안 프로토콜(SSL/TLS)을 결합하여 데이터를 암호화 전송하는 보안 통신 프로토콜의 명칭을 쓰시오.",
    "answer": [
      "HTTPS",
      "https"
    ],
    "explanation": "HTTPS는 기본 443번 포트를 사용하며 데이터 암호화, 서버 인증, 무결성 보장을 제공합니다.",
    "difficulty": "EASY",
    "keywords": [
      "프로토콜",
      "HTTPS",
      "TLS암호화",
      "443"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_057",
    "subject": "신기술/보안",
    "category": "네트워크 보안",
    "subCategory": "VPN",
    "type": "SHORT_ANSWER",
    "question": "공용 인터넷 네트워크 상에서 터널링과 암호화 기술을 적용하여 마치 독립된 전용 사설망을 사용하는 것처럼 보안 통신을 제공하는 네트워크 기술의 영문 약어를 쓰시오.",
    "answer": [
      "VPN",
      "Virtual Private Network",
      "가상 사설망"
    ],
    "explanation": "VPN은 원격 근무자나 지사 간 통신을 안전하게 보호하며 IPsec VPN, SSL VPN 등이 대표적입니다.",
    "difficulty": "EASY",
    "keywords": [
      "네트워크",
      "VPN",
      "가상사설망",
      "터널링"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_058",
    "subject": "신기술/보안",
    "category": "악성코드",
    "subCategory": "백도어",
    "type": "SHORT_ANSWER",
    "question": "시스템 개발자나 공격자가 정상적인 보안 인증 절차를 거치지 않고 시스템에 직접 침투할 수 있도록 고의로 마련해 둔 비인가 비밀 통로의 명칭을 쓰시오.",
    "answer": [
      "백도어",
      "트랩도어",
      "Backdoor",
      "Trapdoor"
    ],
    "explanation": "백도어(Backdoor)는 침입 후 지속적인 제어를 위해 심어두며 포트 스캔 및 무결성 검사로 탐지합니다.",
    "difficulty": "EASY",
    "keywords": [
      "악성코드",
      "백도어",
      "Backdoor",
      "트랩도어"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_059",
    "subject": "신기술/보안",
    "category": "소프트웨어 아키텍처",
    "subCategory": "서버리스",
    "type": "SHORT_ANSWER",
    "question": "개발자가 물리적 서버 관리나 인프라 프로비저닝 없이 비즈니스 로직(함수)만을 배포하고 이벤트 구동 방식으로 실행되는 클라우드 컴퓨팅 패러다임의 명칭을 쓰시오.",
    "answer": [
      "서버리스",
      "Serverless",
      "FaaS"
    ],
    "explanation": "서버리스(Serverless, Function as a Service)는 AWS Lambda, Google Cloud Functions 등이 대표적입니다.",
    "difficulty": "EASY",
    "keywords": [
      "신기술",
      "서버리스",
      "Serverless",
      "FaaS"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_060",
    "subject": "신기술/보안",
    "category": "사이버 공격",
    "subCategory": "Slowloris",
    "type": "SHORT_ANSWER",
    "question": "HTTP 요청 헤더의 끝을 알리는 개행 문자(\\r\\n\\r\\n)를 전송하지 않고 조작된 불완전한 헤더를 매우 느린 속도로 지속 전송하여 웹 서버의 연결 커넥션을 고갈시키는 DoS 공격의 명칭을 쓰시오.",
    "answer": [
      "슬로로리스",
      "Slowloris"
    ],
    "explanation": "Slowloris는 저대역폭 DoS 공격 기법으로 아파치 같은 프로세스/스레드 기반 웹 서버의 동시 연결 자원을 쉽게 고갈시킵니다.",
    "difficulty": "HARD",
    "keywords": [
      "DoS",
      "Slowloris",
      "슬로로리스",
      "HTTP헤더지연"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_061",
    "subject": "신기술/보안",
    "category": "네트워크 프로토콜",
    "subCategory": "SSH",
    "type": "SHORT_ANSWER",
    "question": "평문 통신으로 취약했던 텔넷(Telnet)을 대체하여, 암호화된 안전한 채널을 통해 원격 서버에 접속하고 명령을 실행할 수 있도록 기본 22번 포트를 사용하는 프로토콜의 영문 약어를 쓰시오.",
    "answer": [
      "SSH",
      "Secure Shell",
      "시큐어 셸"
    ],
    "explanation": "SSH는 공개키 암호화 기반으로 상호 인증하고 세션 트래픽 전체를 암호화합니다.",
    "difficulty": "EASY",
    "keywords": [
      "프로토콜",
      "SSH",
      "원격접속",
      "22번포트"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_062",
    "subject": "신기술/보안",
    "category": "네트워크 관리",
    "subCategory": "DHCP",
    "type": "SHORT_ANSWER",
    "question": "네트워크에 접속한 단말에 IP 주소, 서브넷 마스크, 기본 게이트웨이, DNS 서버 정보를 자동으로 동적 할당해 주는 네트워크 프로토콜의 영문 약어를 쓰시오.",
    "answer": [
      "DHCP",
      "Dynamic Host Configuration Protocol"
    ],
    "explanation": "DHCP는 DORA(Discover, Offer, Request, Acknowledge) 과정을 통해 클라이언트에게 IP를 임대합니다.",
    "difficulty": "EASY",
    "keywords": [
      "네트워크",
      "DHCP",
      "자동IP할당"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_063",
    "subject": "신기술/보안",
    "category": "네트워크 보안",
    "subCategory": "NAC",
    "type": "SHORT_ANSWER",
    "question": "기업 내부 네트워크에 접속하려는 PC나 모바일 단말의 백신 설치 여부, OS 패치 상태 등 보안 정책 준수 여부를 사전 검증하여 비인가 단말의 네트워크 접근을 통제하는 솔루션의 영문 약어를 쓰시오.",
    "answer": [
      "NAC",
      "Network Access Control",
      "네트워크 접근 제어"
    ],
    "explanation": "NAC는 격리 네트워크에서 단말의 무결성을 점검하고 치료한 후 사내망 접속을 승인합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "보안솔루션",
      "NAC",
      "네트워크접근제어"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_SEC_064",
    "subject": "신기술/보안",
    "category": "최신 웹 기술",
    "subCategory": "웹소켓",
    "type": "SHORT_ANSWER",
    "question": "단일 TCP 연결 위에서 클라이언트와 서버 간에 전이중(Full-Duplex) 실시간 양방향 통신을 가능하게 하는 HTML5 표준 프로토콜의 명칭을 쓰시오.",
    "answer": [
      "웹소켓",
      "WebSocket"
    ],
    "explanation": "WebSocket은 HTTP 업그레이드 핸드셰이크 이후 오버헤드가 적은 프레임으로 실시간 채팅, 주식 시세 등을 전송합니다.",
    "difficulty": "EASY",
    "keywords": [
      "신기술",
      "웹소켓",
      "WebSocket",
      "양방향통신"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_015",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스트",
    "subCategory": "화이트박스 커버리지",
    "type": "SHORT_ANSWER",
    "question": "프로그램의 각 분기문(조건문)에서 전체 조건식의 참(True)과 거짓(False)이 적어도 한 번씩 실행되도록 테스트 케이스를 설계하는 검증 기준의 명칭을 쓰시오.",
    "answer": [
      "분기 커버리지",
      "결정 커버리지",
      "Branch Coverage",
      "Decision Coverage"
    ],
    "explanation": "분기(결정) 커버리지는 if문의 조건식 전체가 참과 거짓을 모두 경험하도록 합니다. 구문 커버리지보다 엄격합니다.",
    "difficulty": "EASY",
    "keywords": [
      "화이트박스",
      "분기커버리지",
      "결정커버리지",
      "참거짓"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_016",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스트",
    "subCategory": "화이트박스 커버리지",
    "type": "SHORT_ANSWER",
    "question": "전체 조건식의 결과와 상관없이, 전체 조건식 내에 포함된 개별 조건식(개별 조건) 각각이 참(True)과 거짓(False)을 적어도 한 번씩 갖도록 하는 검증 기준의 명칭을 쓰시오.",
    "answer": [
      "조건 커버리지",
      "Condition Coverage"
    ],
    "explanation": "조건 커버리지는 개별 조건들의 참/거짓을 검증하지만, 전체 조건식의 최종 참/거짓을 모두 만족시키지 못할 수도 있습니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "화이트박스",
      "조건커버리지",
      "개별조건"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_017",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스트",
    "subCategory": "화이트박스 커버리지",
    "type": "SHORT_ANSWER",
    "question": "개별 조건식이 다른 개별 조건식의 영향을 받지 않고 독립적으로 전체 조건식의 결과에 영향을 미치도록 설계하는 화이트박스 커버리지의 영문 약어를 쓰시오.",
    "answer": [
      "MC/DC",
      "MCDC",
      "Modified Condition/Decision Coverage",
      "변형 조건 결정 커버리지"
    ],
    "explanation": "MC/DC는 항공, 자동차, 원자력 등 고신뢰성 안전 필수 소프트웨어 검증에 의무적으로 요구되는 매우 엄격한 기준입니다.",
    "difficulty": "HARD",
    "keywords": [
      "화이트박스",
      "MC/DC",
      "MCDC",
      "독립적영향"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_018",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스트",
    "subCategory": "블랙박스 기법",
    "type": "SHORT_ANSWER",
    "question": "입력값의 전체 범위를 유효한 입력값과 무효한 입력값의 상호 배타적인 영역(클래스)으로 분할하고 각 영역에서 대표값을 추출하여 테스트하는 기법의 명칭을 쓰시오.",
    "answer": [
      "동등 분할",
      "동치 분할",
      "Equivalence Partitioning",
      "동등 분할 기법",
      "동치 분할 기법"
    ],
    "explanation": "동등 분할(동치 분할)은 적은 수의 대표값으로 전체 범위를 대표할 수 있다는 가정을 바탕으로 하는 블랙박스 테스트 기법입니다.",
    "difficulty": "EASY",
    "keywords": [
      "블랙박스",
      "동등분할",
      "동치분할",
      "대표값"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_019",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스트",
    "subCategory": "블랙박스 기법",
    "type": "SHORT_ANSWER",
    "question": "입력 조건(원인)과 그에 따른 출력 결과(결과) 사이의 논리적 관계를 체계적으로 분석하여 불리언 그래프를 작성하고 이를 바탕으로 테스트 케이스를 도출하는 기법을 쓰시오.",
    "answer": [
      "원인 결과 그래프",
      "Cause-Effect Graphing",
      "원인-결과 그래프"
    ],
    "explanation": "원인-결과 그래프 기법은 복잡한 비즈니스 로직과 여러 조건 간의 상호작용 조합을 테스트할 때 효과적입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "블랙박스",
      "원인결과그래프",
      "Cause-Effect"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_020",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스트",
    "subCategory": "블랙박스 기법",
    "type": "SHORT_ANSWER",
    "question": "테스터의 풍부한 경험, 직관, 과거 오류 데이터에 기반하여 프로그램에서 결함이 발생하기 쉬운 부분을 추측하여 테스트 케이스를 작성하는 기법의 명칭을 쓰시오.",
    "answer": [
      "오류 예측",
      "오류 예측 기법",
      "Error Guessing",
      "오류 추측"
    ],
    "explanation": "오류 예측(Error Guessing)은 공식 명세서에 나오지 않는 비정형적이고 극단적인 상황의 버그를 빠르게 찾아낼 때 유용합니다.",
    "difficulty": "EASY",
    "keywords": [
      "블랙박스",
      "오류예측",
      "경험기반",
      "ErrorGuessing"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_021",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스트",
    "subCategory": "통합 테스트 도구",
    "type": "SHORT_ANSWER",
    "question": "하향식(Top-Down) 통합 테스트 시, 아직 구현되지 않은 하위 모듈을 대신하여 상위 모듈의 호출에 임시 응답을 반환해 주는 가상의 더미 모듈 명칭을 쓰시오.",
    "answer": [
      "스텁",
      "테스트 스텁",
      "Stub",
      "Test Stub"
    ],
    "explanation": "하향식 통합은 주 모듈(루트)부터 아래로 내려가며 아직 없는 하위 모듈 자리에 스텁(Stub)을 배치합니다. 상향식은 드라이버(Driver)를 씁니다.",
    "difficulty": "EASY",
    "keywords": [
      "통합테스트",
      "스텁",
      "Stub",
      "하향식"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_022",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스트",
    "subCategory": "통합 테스트 도구",
    "type": "SHORT_ANSWER",
    "question": "상향식(Bottom-Up) 통합 테스트 시, 최하위 모듈을 먼저 시험하기 위해 상위 제어 모듈 역할을 대신하여 하위 모듈에 테스트 데이터를 전달하고 결과를 받는 임시 소프트웨어의 명칭을 쓰시오.",
    "answer": [
      "드라이버",
      "테스트 드라이버",
      "Driver",
      "Test Driver"
    ],
    "explanation": "상향식 통합은 가장 말단 모듈부터 검증하므로 이를 구동해 줄 테스트 드라이버(Test Driver)가 필수적입니다.",
    "difficulty": "EASY",
    "keywords": [
      "통합테스트",
      "드라이버",
      "Driver",
      "상향식"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_023",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스트",
    "subCategory": "테스트 원리",
    "type": "SHORT_ANSWER",
    "question": "동일한 테스트 케이스로 반복해서 테스트하면 더 이상 새로운 결함을 찾아낼 수 없으므로, 주기적으로 테스트 케이스를 점검하고 개선해야 한다는 테스트 원리의 명칭을 쓰시오.",
    "answer": [
      "살충제 패러독스",
      "Pesticide Paradox",
      "살충제 역설"
    ],
    "explanation": "살충제 패러독스는 농약에 내성이 생기는 현상에 빗댄 원리로 테스트 케이스의 지속적인 갱신 필요성을 강조합니다.",
    "difficulty": "EASY",
    "keywords": [
      "테스트원리",
      "살충제패러독스",
      "PesticideParadox"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_024",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스트",
    "subCategory": "테스트 원리",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어의 결함을 모두 제거하여 오류가 전혀 없더라도, 사용자의 요구사항이나 비즈니스 목적을 충족하지 못하면 품질이 높다고 볼 수 없다는 테스트 원리의 명칭을 쓰시오.",
    "answer": [
      "오류 부재의 궤변",
      "오류 부재의 역설",
      "Absence of Errors Fallacy"
    ],
    "explanation": "오류 부재의 궤변은 결함 제로보다 사용자의 실제 요구 만족과 가치 제공이 더 본질적임을 나타냅니다.",
    "difficulty": "EASY",
    "keywords": [
      "테스트원리",
      "오류부재의궤변",
      "요구사항충족"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_025",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스트",
    "subCategory": "테스트 유형",
    "type": "SHORT_ANSWER",
    "question": "새로운 기능 추가나 버그 수정 등의 코드 변경 이후, 이미 검증되었던 기존 기능들이 부작용(Side Effect)으로 깨지거나 새로운 결함이 생기지 않았는지 다시 확인하는 반복 테스트의 명칭을 쓰시오.",
    "answer": [
      "회귀 테스트",
      "리그레션 테스트",
      "Regression Test",
      "회귀 시험"
    ],
    "explanation": "회귀 테스트는 CI/CD 자동화 파이프라인에서 빌드마다 자동 실행되어 변경으로 인한 퇴행을 방지합니다.",
    "difficulty": "EASY",
    "keywords": [
      "테스트유형",
      "회귀테스트",
      "RegressionTest",
      "부작용검증"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_026",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스트",
    "subCategory": "인수 테스트",
    "type": "SHORT_ANSWER",
    "question": "개발 조직 내부에서 통제된 개발 환경 하에 개발자와 사용자가 함께 수행하는 사전 인수 테스트의 명칭을 쓰시오.",
    "answer": [
      "알파 테스트",
      "Alpha Test"
    ],
    "explanation": "알파 테스트는 통제된 내부 환경에서 치러지며, 이후 실제 사용자들의 실제 환경에서 비통제 상태로 수행되는 것은 베타 테스트(Beta Test)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "인수테스트",
      "알파테스트",
      "AlphaTest",
      "통제환경"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_027",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스트",
    "subCategory": "인수 테스트",
    "type": "SHORT_ANSWER",
    "question": "선정된 실제 최종 사용자나 잠재 고객들이 실제 운영 환경에서 소프트웨어를 사용해보며 결함을 발견하고 피드백을 주는 공개 필드 테스트의 명칭을 쓰시오.",
    "answer": [
      "베타 테스트",
      "Beta Test"
    ],
    "explanation": "베타 테스트는 다양한 하드웨어 및 실사용자 시나리오 환경에서 예기치 않은 오류를 사전에 수집합니다.",
    "difficulty": "EASY",
    "keywords": [
      "인수테스트",
      "베타테스트",
      "BetaTest",
      "실운영환경"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_028",
    "subject": "정보시스템구축관리",
    "category": "비용 산정 기법",
    "subCategory": "COCOMO",
    "type": "SHORT_ANSWER",
    "question": "보헴(Boehm)이 제안한 COCOMO 모델의 프로젝트 유형 중, 5만 라인(50 KDSI) 이하의 소규모 소프트웨어 개발에 적용되는 기본 유형의 명칭을 쓰시오.",
    "answer": [
      "조직형",
      "기본형",
      "Organic",
      "오가닉"
    ],
    "explanation": "COCOMO 규모 유형: 조직형(Organic, 5만 이하) → 반분리형(Semi-detached, 30만 이하) → 내장형(Embedded, 30만 초과 고신뢰 시스템).",
    "difficulty": "EASY",
    "keywords": [
      "COCOMO",
      "조직형",
      "Organic",
      "비용산정"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_029",
    "subject": "정보시스템구축관리",
    "category": "비용 산정 기법",
    "subCategory": "COCOMO",
    "type": "SHORT_ANSWER",
    "question": "COCOMO 모델의 유형 중 항공, 미사일, 군사, 원자력 등 초대형 복합 시스템으로 30만 라인(300 KDSI) 이상의 고난도 시스템 개발에 적용되는 유형의 명칭을 쓰시오.",
    "answer": [
      "내장형",
      "임베디드",
      "Embedded"
    ],
    "explanation": "내장형(Embedded)은 엄격한 제약조건과 신뢰성이 요구되는 대규모 프로젝트에 적용됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "COCOMO",
      "내장형",
      "Embedded",
      "대규모"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_030",
    "subject": "정보시스템구축관리",
    "category": "비용 산정 기법",
    "subCategory": "기능점수",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어의 기능적 요구사항을 사용자가 요구하는 데이터 기능(ILF, EIF)과 트랜잭션 기능(EI, EO, EQ)의 5대 유형으로 식별하여 규모를 정량화하는 기법의 명칭 또는 영문 약어를 쓰시오.",
    "answer": [
      "기능 점수",
      "기능점수",
      "기능점수 모형",
      "FP",
      "Function Point"
    ],
    "explanation": "기능점수(FP)는 알브레히트(Albrecht)가 고안하였으며 언어나 기술에 독립적인 소프트웨어 규모 측정 국제 표준입니다.",
    "difficulty": "EASY",
    "keywords": [
      "비용산정",
      "기능점수",
      "FunctionPoint",
      "FP"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_031",
    "subject": "정보시스템구축관리",
    "category": "프로젝트 일정 관리",
    "subCategory": "일정 단축",
    "type": "SHORT_ANSWER",
    "question": "프로젝트 일정을 단축하기 위해 임계 경로 상의 활동에 추가 자원(인력 투입, 야근, 장비 추가)을 투입하여 기간을 줄이는 기법의 영문 명칭을 쓰시오.",
    "answer": [
      "크래싱",
      "크래싱 기법",
      "Crashing",
      "공정 압축"
    ],
    "explanation": "Crashing은 일정 단축을 위해 비용(자원)을 추가 지출합니다. 반면 선후 관계의 작업을 병행 수행하여 리스크를 감수하고 단축하는 것은 Fast Tracking입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "일정단축",
      "Crashing",
      "크래싱",
      "추가자원투입"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_032",
    "subject": "정보시스템구축관리",
    "category": "프로젝트 일정 관리",
    "subCategory": "일정 단축",
    "type": "SHORT_ANSWER",
    "question": "원래 순차적으로 수행되어야 할 작업들을 동시에 병행(Overlap)하여 진행함으로써 추가 비용 없이 일정을 앞당기는 일정 단축 기법의 영문 명칭을 쓰시오.",
    "answer": [
      "패스트 트래킹",
      "Fast Tracking",
      "병행 수행",
      "패스트트래킹"
    ],
    "explanation": "Fast Tracking은 재작업(Rework)과 품질 저하의 위험이 따를 수 있습니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "일정단축",
      "FastTracking",
      "패스트트래킹",
      "병행수행"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_033",
    "subject": "정보시스템구축관리",
    "category": "형상 관리",
    "subCategory": "활동",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 생명주기 동안 관리 대상이 되는 형상 항목(Configuration Item)을 구분하고 고유 식별 번호와 이름을 부여하는 형상 관리 활동의 명칭을 쓰시오.",
    "answer": [
      "형상 식별",
      "Configuration Identification"
    ],
    "explanation": "형상 관리 4대 활동: 형상 식별 → 형상 통제(변경 승인) → 형상 감사(무결성 검토) → 형상 기록/보고.",
    "difficulty": "EASY",
    "keywords": [
      "형상관리",
      "형상식별",
      "Identification"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_034",
    "subject": "정보시스템구축관리",
    "category": "형상 관리",
    "subCategory": "조직",
    "type": "SHORT_ANSWER",
    "question": "형상 항목에 대한 변경 요청을 공식적으로 검토, 평가, 승인하거나 기각하는 책임을 맡은 조직의 영문 약어를 쓰시오.",
    "answer": [
      "CCB",
      "Configuration Control Board",
      "형상 통제 위원회",
      "형상통제위원회"
    ],
    "explanation": "CCB는 베이스라인이 확정된 이후 발생하는 모든 소프트웨어 변경의 타당성을 심의하고 승인합니다.",
    "difficulty": "EASY",
    "keywords": [
      "형상관리",
      "CCB",
      "형상통제위원회"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_035",
    "subject": "정보시스템구축관리",
    "category": "품질 표준",
    "subCategory": "ISO 25010",
    "type": "SHORT_ANSWER",
    "question": "ISO/IEC 25010 소프트웨어 제품 품질 모델의 8대 품질 특성 중 명시된 조건에서 시스템이 손상 없이 필요한 만큼 정상 작동 상태를 유지하는 능력을 뜻하는 특성의 명칭을 쓰시오.",
    "answer": [
      "신뢰성",
      "Reliability"
    ],
    "explanation": "ISO 25010 8대 특성: 기능 적합성, 성능 효율성, 호환성, 사용성, 신뢰성, 보안성, 유지보수성, 이식성.",
    "difficulty": "EASY",
    "keywords": [
      "품질표준",
      "ISO25010",
      "신뢰성",
      "Reliability"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_036",
    "subject": "정보시스템구축관리",
    "category": "품질 표준",
    "subCategory": "ISO 25010",
    "type": "SHORT_ANSWER",
    "question": "ISO/IEC 25010 품질 특성 중 소프트웨어가 다른 하드웨어나 운영체제 등 다양한 환경으로 쉽게 전환될 수 있는 특성의 명칭을 쓰시오.",
    "answer": [
      "이식성",
      "Portability"
    ],
    "explanation": "이식성(Portability)은 적응성(Adaptability), 설치성(Installability), 대체성(Replaceability)을 부특성으로 포함합니다.",
    "difficulty": "EASY",
    "keywords": [
      "품질표준",
      "ISO25010",
      "이식성",
      "Portability"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_037",
    "subject": "정보시스템구축관리",
    "category": "프로세스 평가",
    "subCategory": "SPICE",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 프로세스 개선 및 역량 수준을 6단계(레벨 0~5)로 평가하기 위한 국제 표준(ISO/IEC 15504)의 약칭을 쓰시오.",
    "answer": [
      "SPICE",
      "스파이스",
      "ISO 15504"
    ],
    "explanation": "SPICE(Software Process Improvement and Capability dEtermination)는 프로세스 능력 수준을 불완전(0) ~ 최적화(5) 6단계로 판정합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "품질표준",
      "SPICE",
      "ISO15504",
      "역량평가"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_038",
    "subject": "정보시스템구축관리",
    "category": "재해 복구",
    "subCategory": "지표",
    "type": "SHORT_ANSWER",
    "question": "IT 시스템 및 서비스 장애 발생 시점부터 서비스가 다시 정상 가동될 때까지 허용되는 최대 복구 시간을 뜻하는 지표의 영문 약어를 쓰시오.",
    "answer": [
      "RTO",
      "Recovery Time Objective",
      "목표 복구 시간"
    ],
    "explanation": "RTO(Recovery Time Objective)는 복구하는 데 걸리는 시간 목표이고, 데이터 손실 허용 시점은 RPO(Recovery Point Objective)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "재해복구",
      "RTO",
      "RecoveryTimeObjective",
      "복구시간"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_039",
    "subject": "정보시스템구축관리",
    "category": "재해 복구",
    "subCategory": "지표",
    "type": "SHORT_ANSWER",
    "question": "재해나 시스템 장애 발생 시 비즈니스가 감내할 수 있는 최대 데이터 손실 허용 시점(과거 백업 시점 기준)을 뜻하는 지표의 영문 약어를 쓰시오.",
    "answer": [
      "RPO",
      "Recovery Point Objective",
      "목표 복구 시점"
    ],
    "explanation": "RPO가 0이라는 것은 실시간 동기화 복제를 통해 단 1초의 데이터 유실도 용납하지 않음을 의미합니다.",
    "difficulty": "EASY",
    "keywords": [
      "재해복구",
      "RPO",
      "RecoveryPointObjective",
      "데이터손실허용"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_040",
    "subject": "정보시스템구축관리",
    "category": "재해 복구 센터",
    "subCategory": "사이트 유형",
    "type": "SHORT_ANSWER",
    "question": "주 센터와 원격 재해 복구 센터의 모든 데이터와 시스템을 실시간 액티브-액티브(Active-Active)로 완벽히 복제하여 재해 시 RTO가 사실상 0(즉시)인 사이트 유형을 쓰시오.",
    "answer": [
      "미러 사이트",
      "Mirror Site",
      "미러사이트"
    ],
    "explanation": "재해복구 사이트 4단계: Mirror Site(실시간 복제, RTO 즉시) > Hot Site(대기 상태, RTO 수시간) > Warm Site(중요 자원 보유, RTO 수일) > Cold Site(장소/기본전원만 보유, RTO 수주).",
    "difficulty": "MEDIUM",
    "keywords": [
      "재해복구",
      "미러사이트",
      "MirrorSite",
      "RTO=0"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_041",
    "subject": "정보시스템구축관리",
    "category": "재해 복구 센터",
    "subCategory": "사이트 유형",
    "type": "SHORT_ANSWER",
    "question": "주 센터와 동일한 하드웨어와 소프트웨어가 대기(Standby) 상태로 상시 가동되고 있어 재해 발생 시 수 시간 이내에 서비스를 복구할 수 있는 사이트 유형을 쓰시오.",
    "answer": [
      "핫 사이트",
      "Hot Site",
      "핫사이트"
    ],
    "explanation": "Hot Site는 동기/비동기 방식으로 데이터를 백업받으며 상시 스탠바이 상태를 유지합니다.",
    "difficulty": "EASY",
    "keywords": [
      "재해복구",
      "핫사이트",
      "HotSite",
      "수시간복구"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_042",
    "subject": "정보시스템구축관리",
    "category": "스토리지 시스템",
    "subCategory": "스토리지 아키텍처",
    "type": "SHORT_ANSWER",
    "question": "기존 LAN 네트워크의 대역폭 한계를 극복하기 위해 서버와 스토리지 사이에 광채널(Fibre Channel) 고속 전용 네트워크를 구축하여 블록 레벨 I/O를 제공하는 스토리지망의 영문 약어를 쓰시오.",
    "answer": [
      "SAN",
      "Storage Area Network"
    ],
    "explanation": "SAN은 서버와 스토리지를 고속 파이버 채널 스위치로 연결하는 블록 단위 스토리지 네트워크입니다. 파일 공유용은 NAS(Network Attached Storage)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "스토리지",
      "SAN",
      "광채널",
      "블록스토리지"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_043",
    "subject": "정보시스템구축관리",
    "category": "스토리지 시스템",
    "subCategory": "RAID",
    "type": "SHORT_ANSWER",
    "question": "데이터를 여러 디스크에 나누어 저장(스트라이핑)하여 읽기/쓰기 성능을 극대화하지만, 패리티(중복)가 없어 디스크 하나만 고장 나도 전체 데이터가 유실되는 RAID 레벨을 쓰시오.",
    "answer": [
      "RAID 0",
      "RAID-0",
      "레이드 0"
    ],
    "explanation": "RAID 0은 스트라이핑(Striping) 전용으로 장애 내구성이 없습니다. 미러링으로 안전성을 확보하는 것은 RAID 1입니다.",
    "difficulty": "EASY",
    "keywords": [
      "RAID",
      "RAID0",
      "스트라이핑",
      "무패리티"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_044",
    "subject": "정보시스템구축관리",
    "category": "스토리지 시스템",
    "subCategory": "RAID",
    "type": "SHORT_ANSWER",
    "question": "최소 3개 이상의 디스크를 사용하여 데이터와 오류 검출용 패리티(Parity)를 모든 디스크에 분산 저장함으로써 디스크 1개 장애까지 복구 가능한 실무에서 가장 널리 쓰이는 RAID 레벨을 쓰시오.",
    "answer": [
      "RAID 5",
      "RAID-5",
      "레이드 5"
    ],
    "explanation": "RAID 5는 패리티 분산 저장 방식을 사용하여 병목을 줄이고 디스크 1개 결함을 극복합니다.",
    "difficulty": "EASY",
    "keywords": [
      "RAID",
      "RAID5",
      "패리티분산",
      "최소3개"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_045",
    "subject": "정보시스템구축관리",
    "category": "IT 서비스 관리",
    "subCategory": "SLA",
    "type": "SHORT_ANSWER",
    "question": "서비스 제공업체와 고객 간에 서비스 가용성(예: 99.9%), 응답 속도, 장애 처리 시간 등 제공할 서비스의 품질 수준을 공식적으로 명시하고 미달 시 보상 규정을 담은 계약서의 영문 약어를 쓰시오.",
    "answer": [
      "SLA",
      "Service Level Agreement",
      "서비스 수준 협약서"
    ],
    "explanation": "SLA는 ITSM의 기초 계약이며 세부 달성 목표는 SLO(Service Level Objective), 측정 척도는 SLI(Service Level Indicator)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "ITSM",
      "SLA",
      "서비스수준협약서"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_046",
    "subject": "정보시스템구축관리",
    "category": "업무 연속성",
    "subCategory": "BCP",
    "type": "SHORT_ANSWER",
    "question": "화재, 지진 등 재난 발생 시에도 조직의 핵심 비즈니스 기능을 중단 없이 지속하거나 신속히 재개하기 위한 체계적인 비즈니스 연속성 계획의 영문 약어를 쓰시오.",
    "answer": [
      "BCP",
      "Business Continuity Planning",
      "업무 연속성 계획"
    ],
    "explanation": "BCP는 업무 영향 분석(BIA)을 기초로 수립되며, IT 시스템 차원의 재해 복구 계획인 DRP(Disaster Recovery Plan)를 포함합니다.",
    "difficulty": "EASY",
    "keywords": [
      "업무연속성",
      "BCP",
      "BusinessContinuityPlanning"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_047",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스트",
    "subCategory": "V-모델",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 개발 단계와 테스트 단계를 V자 형태로 매핑한 V-모델에서, 시스템의 요구사항 분석 단계에 대응되어 검증을 수행하는 최종 테스트 레벨의 명칭을 쓰시오.",
    "answer": [
      "인수 테스트",
      "Acceptance Test"
    ],
    "explanation": "V-모델 매핑: 요구사항 분석 ↔ 인수 테스트, 시스템 설계 ↔ 시스템 테스트, 아키텍처/상세 설계 ↔ 통합 테스트, 모듈 코딩 ↔ 단위 테스트.",
    "difficulty": "EASY",
    "keywords": [
      "V모델",
      "인수테스트",
      "요구사항분석매핑"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_048",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스트",
    "subCategory": "검증과 확인",
    "type": "SHORT_ANSWER",
    "question": "개발자의 관점에서 명세서대로 소프트웨어가 올바르게 구축되었는지를 점검하는 활동(Building the product right)을 뜻하는 용어의 명칭을 쓰시오.",
    "answer": [
      "검증",
      "Verification"
    ],
    "explanation": "검증(Verification)은 '명세서대로 올바르게 만들었는가(개발자 관점)'이고, 확인(Validation)은 '사용자가 원하는 올바른 제품을 만들었는가(사용자 관점)'입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "테스트",
      "검증",
      "Verification",
      "명세서일치"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_049",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스트",
    "subCategory": "정적 테스트",
    "type": "SHORT_ANSWER",
    "question": "프로그램 코드를 실제로 실행하지 않고, 설계서나 소스 코드를 읽고 분석하여 결함을 찾아내는 기법(인스펙션, 워크스루 등)의 총칭을 쓰시오.",
    "answer": [
      "정적 테스트",
      "정적 분석",
      "Static Testing",
      "Static Analysis"
    ],
    "explanation": "정적 테스트(인스펙션, 워크스루, 정적 코드 분석 도구)는 실행 전에 문법 오류나 코딩 표준 위반, 잠재 결함을 조기에 발견합니다.",
    "difficulty": "EASY",
    "keywords": [
      "테스트기법",
      "정적테스트",
      "실행없이검사",
      "인스펙션"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_050",
    "subject": "정보시스템구축관리",
    "category": "보안 개발 방법론",
    "subCategory": "시큐어 코딩",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 기획, 설계, 구현, 테스팅 등 개발 전 단계에 걸쳐 보안을 체계적으로 내재화하기 위해 MS사가 제안한 보안 개발 방법론의 영문 약어를 쓰시오.",
    "answer": [
      "SDL",
      "MS-SDL",
      "Security Development Lifecycle"
    ],
    "explanation": "MS-SDL은 위협 모델링(STRIDE) 등을 포함하여 계획 단계부터 유지보수까지 보안을 강제하는 표준 프레임워크입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "보안방법론",
      "SDL",
      "MS-SDL",
      "시큐어코딩"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_051",
    "subject": "정보시스템구축관리",
    "category": "위험 관리",
    "subCategory": "대응 전략",
    "type": "SHORT_ANSWER",
    "question": "프로젝트 진행 중 발생할 수 있는 위험을 줄이기 위해 프로젝트 계획을 수정하거나 고위험 요구사항 기능을 제거하여 위험 자체를 원천적으로 없애는 대응 전략의 명칭을 쓰시오.",
    "answer": [
      "회피",
      "위험 회피",
      "Avoidance",
      "Risk Avoidance"
    ],
    "explanation": "위험 대응 4대 전략: 회피(Avoid, 위험 원천 제거), 전가(Transfer, 보험/외주), 완화(Mitigate, 발생 확률/충격 감소), 수용(Accept, 결과 감내).",
    "difficulty": "EASY",
    "keywords": [
      "위험관리",
      "회피",
      "위험회피",
      "Avoidance"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_052",
    "subject": "정보시스템구축관리",
    "category": "위험 관리",
    "subCategory": "대응 전략",
    "type": "SHORT_ANSWER",
    "question": "위험의 발생 확률이나 영향도를 낮추기 위해 사전 예방 조치를 취하거나 모니터링을 강화하는 가장 일반적인 위험 대응 전략의 명칭을 쓰시오.",
    "answer": [
      "완화",
      "위험 완화",
      "Mitigation",
      "Risk Mitigation"
    ],
    "explanation": "완화(Mitigation)는 시스템 백업 수립, 백신 설치 등 잠재적 위험의 충격을 줄이는 조치입니다.",
    "difficulty": "EASY",
    "keywords": [
      "위험관리",
      "완화",
      "위험완화",
      "Mitigation"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_053",
    "subject": "정보시스템구축관리",
    "category": "정형 기술 검토",
    "subCategory": "인스펙션",
    "type": "SHORT_ANSWER",
    "question": "저작자가 아닌 훈련된 검토팀이 사전에 정의된 체크리스트와 엄격한 규칙에 따라 소스 코드나 산출물의 결함을 찾아내는 가장 정형화된 정적 검토 기법의 명칭을 쓰시오.",
    "answer": [
      "인스펙션",
      "Inspection",
      "코드 인스펙션"
    ],
    "explanation": "패이건(Fagan)이 제안한 인스펙션은 주재자(Moderator), 작성자, 낭독자, 기록자, 검토자 역할을 엄격히 나누어 결함을 색출합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "품질검토",
      "인스펙션",
      "Inspection",
      "체크리스트"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_054",
    "subject": "정보시스템구축관리",
    "category": "정형 기술 검토",
    "subCategory": "워크스루",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 개발 산출물의 작성자가 직접 동료들에게 작업물을 설명하고 안내하면서 비공식적으로 결함을 조기에 발견하고 검토하는 기법의 명칭을 쓰시오.",
    "answer": [
      "워크스루",
      "Walkthrough",
      "워크스루 기법"
    ],
    "explanation": "워크스루(Walkthrough)는 인스펙션보다 덜 형식적이며 작성자가 주도하여 동료들의 피드백을 수집합니다.",
    "difficulty": "EASY",
    "keywords": [
      "품질검토",
      "워크스루",
      "Walkthrough",
      "작성자주도"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_055",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스트",
    "subCategory": "성능 테스트",
    "type": "SHORT_ANSWER",
    "question": "시스템의 임계점 이상의 과도한 부하를 가하여 비정상적인 극한 상황에서 시스템이 어떻게 반응하고 복구(Failover)되는지 점검하는 테스트의 명칭을 쓰시오.",
    "answer": [
      "스트레스 테스트",
      "Stress Test",
      "스트레스 시험",
      "한계 테스트"
    ],
    "explanation": "스트레스 테스트는 최대 한계 이상의 과부하를 주어 시스템의 붕괴점과 복구 능력을 평가합니다. 평상시 부하를 검증하는 것은 부하 테스트(Load Test)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "성능테스트",
      "스트레스테스트",
      "StressTest",
      "극한부하"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_056",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스트",
    "subCategory": "블랙박스 기법",
    "type": "SHORT_ANSWER",
    "question": "대부분의 결함이 두 입력 변수의 상호작용에서 비롯된다는 점에 착안하여, 모든 파라미터 값의 쌍(Pair)이 적어도 한 번씩 테스트되도록 케이스를 최소화하는 조합 기법의 명칭을 쓰시오.",
    "answer": [
      "페어와이즈",
      "페어와이즈 테스트",
      "Pairwise",
      "Pairwise Testing"
    ],
    "explanation": "페어와이즈(Pairwise) 기법은 직교 배열표(Orthogonal Array) 등을 활용해 방대한 전체 조합 수를 획기적으로 줄여 테스트 효율을 극대화합니다.",
    "difficulty": "HARD",
    "keywords": [
      "블랙박스",
      "페어와이즈",
      "Pairwise",
      "2-way조합"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_057",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스트",
    "subCategory": "테스트 유형",
    "type": "SHORT_ANSWER",
    "question": "시스템에 오류나 결함이 발생했을 때, 데이터 손실 없이 정상 상태로 신속히 복원되는지 점검하는 비기능 테스트의 명칭을 쓰시오.",
    "answer": [
      "회복 테스트",
      "Recovery Testing",
      "복구 테스트"
    ],
    "explanation": "회복(Recovery) 테스트는 장애 발생 시 백업 복구 절차, 페일오버(Failover), 재기동 과정이 제대로 작동하는지 검증합니다.",
    "difficulty": "EASY",
    "keywords": [
      "비기능테스트",
      "회복테스트",
      "RecoveryTest"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_058",
    "subject": "정보시스템구축관리",
    "category": "비용 산정 기법",
    "subCategory": "LOC",
    "type": "SHORT_ANSWER",
    "question": "원시 코드 라인 수(LOC)를 낙관치(a), 기대치(m), 비관치(b)로 추정할 때, (a + 4m + b) / 6 공식을 사용하여 산정하는 통계적 예측 모형의 약어를 쓰시오.",
    "answer": [
      "PERT",
      "3점 산정",
      "PERT 공식"
    ],
    "explanation": "LOC 추정 시 3점 산정(PERT 기법)을 활용하면 편향을 줄이고 보다 신뢰성 있는 가중평균 라인 수를 계산할 수 있습니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "비용산정",
      "LOC",
      "3점산정",
      "PERT"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_059",
    "subject": "정보시스템구축관리",
    "category": "IT 서비스 관리",
    "subCategory": "문제 관리",
    "type": "SHORT_ANSWER",
    "question": "반복 발생하는 인시던트(Incident)의 근본적인 원인(Root Cause)을 분석하고 영구적인 해결책이나 우회책(Workaround)을 마련하는 ITIL 프로세스의 명칭을 쓰시오.",
    "answer": [
      "문제 관리",
      "Problem Management"
    ],
    "explanation": "인시던트 관리가 '서비스의 빠른 정상 복구'에 집중한다면, 문제 관리는 '장애의 근본 원인 제거와 재발 방지'에 집중합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "ITIL",
      "문제관리",
      "근본원인",
      "ProblemManagement"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_060",
    "subject": "정보시스템구축관리",
    "category": "IT 서비스 관리",
    "subCategory": "변경 관리",
    "type": "SHORT_ANSWER",
    "question": "IT 인프라나 시스템 구성 요소의 변경 작업으로 인해 발생할 수 있는 서비스 중단 리스크를 최소화하기 위해 변경 요청을 표준화된 절차로 평가·승인·일정 조율하는 프로세스의 명칭을 쓰시오.",
    "answer": [
      "변경 관리",
      "Change Management"
    ],
    "explanation": "변경 관리(Change Management)는 정당한 변경만 안전하게 배포되도록 보장합니다.",
    "difficulty": "EASY",
    "keywords": [
      "ITIL",
      "변경관리",
      "ChangeManagement"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_061",
    "subject": "정보시스템구축관리",
    "category": "클라우드 운영",
    "subCategory": "IaC",
    "type": "SHORT_ANSWER",
    "question": "수동 조작 대신 테라폼(Terraform)이나 앤서블(Ansible)처럼 코드를 통해 컴퓨팅 인프라(서버, 네트워크 등)를 선언하고 자동 프로비저닝하는 패러다임의 영문 약어를 쓰시오.",
    "answer": [
      "IaC",
      "Infrastructure as Code",
      "코드형 인프라"
    ],
    "explanation": "IaC는 인프라 형상을 버전 관리할 수 있게 하며 환경 간 불일치를 없애고 자동화된 빠른 배포를 가능하게 합니다.",
    "difficulty": "EASY",
    "keywords": [
      "신기술",
      "IaC",
      "InfrastructureAsCode",
      "코드형인프라"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_062",
    "subject": "정보시스템구축관리",
    "category": "스토리지 시스템",
    "subCategory": "NAS",
    "type": "SHORT_ANSWER",
    "question": "기존 이더넷 LAN 네트워크에 직접 스토리지를 연결하여 여러 서버나 클라이언트가 파일 단위(NFS, CIFS/SMB 프로토콜)로 데이터를 공유할 수 있는 스토리지 방식의 영문 약어를 쓰시오.",
    "answer": [
      "NAS",
      "Network-Attached Storage",
      "네트워크 부착 스토리지"
    ],
    "explanation": "NAS는 파일 레벨 스토리지 공유를 제공하며 설치가 간편하고 비용이 저렴하지만 대규모 트래픽 시 LAN 병목이 발생할 수 있습니다.",
    "difficulty": "EASY",
    "keywords": [
      "스토리지",
      "NAS",
      "파일공유",
      "NFS"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_063",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 결함 관리",
    "subCategory": "심각도",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 결함 측정 시 시스템 전체가 다운되거나 핵심 기능이 전혀 동작하지 않아 테스트 진행 자체가 불가능한 최고 등급 결함 심각도의 명칭을 쓰시오.",
    "answer": [
      "치명적",
      "치명도",
      "Critical",
      "크리티컬",
      "Fatal"
    ],
    "explanation": "결함 심각도(Severity) 등급: 치명적(Critical/Fatal) → 주요 결함(Major) → 일반 결함(Normal) → 경미한 결함(Minor) → 단순 결함(Trivial).",
    "difficulty": "MEDIUM",
    "keywords": [
      "결함관리",
      "심각도",
      "Critical",
      "치명적"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "MEMO_IS_064",
    "subject": "정보시스템구축관리",
    "category": "개발 생명주기",
    "subCategory": "애자일 선언",
    "type": "SHORT_ANSWER",
    "question": "애자일 선언문 4대 가치 중 '프로세스와 도구보다는 개인과 상호작용을', '포괄적인 문서보다는 동작하는 소프트웨어를', '계약 협상보다는 고객과의 협력을'에 이어 마지막 '계획을 따르기보다는 무엇에 대응하는 것'을 가치 있게 여기는지 쓰시오.",
    "answer": [
      "변화",
      "변화에 대응",
      "변화 대응",
      "Responding to change"
    ],
    "explanation": "애자일 선언문: 계획을 따르기보다 변화에 대응하기를 더 가치 있게 여긴다(Responding to change over following a plan).",
    "difficulty": "EASY",
    "keywords": [
      "애자일",
      "애자일선언",
      "변화대응",
      "4대가치"
    ],
    "source": "정보처리기사 실기 표준"
  },
  {
    "id": "EXP_PR_001",
    "subject": "프로그래밍언어활용",
    "category": "C언어",
    "type": "SHORT_ANSWER",
    "question": "C언어에서 동적으로 힙(Heap) 영역에 메모리를 할당할 때 사용하는 표준 라이브러리 함수는 무엇인가?",
    "answer": "malloc",
    "explanation": "malloc은 힙 영역에 지정된 바이트 크기만큼 메모리를 동적으로 할당하고 시작 주소를 void 포인터로 반환합니다. 할당 해제는 free를 사용합니다.",
    "difficulty": "EASY",
    "keywords": [
      "malloc",
      "동적할당",
      "C언어",
      "힙"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-c-memory"
  },
  {
    "id": "EXP_PR_002",
    "subject": "프로그래밍언어활용",
    "category": "C언어",
    "type": "SHORT_ANSWER",
    "question": "C언어에서 malloc이나 calloc으로 동적 할당된 힙 영역의 메모리를 운영체제에 반환하여 메모리 누수를 방지하는 함수는 무엇인가?",
    "answer": "free",
    "explanation": "free 함수는 동적 할당된 메모리를 해제합니다. 해제하지 않고 참조를 잃어버리면 메모리 누수(Memory Leak)가 발생합니다.",
    "difficulty": "EASY",
    "keywords": [
      "free",
      "메모리해제",
      "메모리누수"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-c-memory"
  },
  {
    "id": "EXP_PR_003",
    "subject": "프로그래밍언어활용",
    "category": "C언어",
    "type": "SHORT_ANSWER",
    "question": "C언어에서 변수 또는 데이터 타입의 메모리 크기를 바이트 단위로 계산하여 반환하는 연산자는 무엇인가?",
    "answer": "sizeof",
    "explanation": "sizeof 연산자는 피연산자의 크기를 바이트 단위로 반환하며 컴파일 시점에 평가됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "sizeof",
      "바이트크기",
      "연산자"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-c-syntax"
  },
  {
    "id": "EXP_PR_004",
    "subject": "프로그래밍언어활용",
    "category": "C언어",
    "type": "SHORT_ANSWER",
    "question": "C언어에서 일반 변수의 주소값을 구하기 위해 변수명 앞에 붙이는 주소 연산자 기호는 무엇인가?",
    "answer": "&",
    "explanation": "&(앰퍼샌드)는 피연산자의 메모리 주소를 반환하는 주소 연산자입니다. 포인터가 가리키는 값을 참조할 때는 *(역참조)를 사용합니다.",
    "difficulty": "EASY",
    "keywords": [
      "&",
      "주소연산자",
      "앰퍼샌드"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-c-pointer"
  },
  {
    "id": "EXP_PR_005",
    "subject": "프로그래밍언어활용",
    "category": "C언어",
    "type": "SHORT_ANSWER",
    "question": "C언어 포인터 변수가 어떤 유효한 메모리 주소도 가리키고 있지 않음을 명시적으로 나타내는 상수는 무엇인가?",
    "answer": "NULL",
    "explanation": "NULL은 가리키는 대상이 없는 포인터를 초기화할 때 사용하며 일반적으로 0으로 정의됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "NULL",
      "널포인터",
      "초기화"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-c-pointer"
  },
  {
    "id": "EXP_PR_006",
    "subject": "프로그래밍언어활용",
    "category": "C언어",
    "type": "SHORT_ANSWER",
    "question": "C언어에서 서로 다른 데이터 타입을 하나의 묶음으로 묶어 새로운 사용자 정의 자료형을 만들 때 사용하는 키워드는 무엇인가?",
    "answer": "struct",
    "explanation": "struct(구조체)는 서로 다른 타입의 변수들을 하나의 단위로 묶는 사용자 정의 자료형입니다. 모든 멤버가 메모리를 공유하는 union(공용체)과 구별해야 합니다.",
    "difficulty": "EASY",
    "keywords": [
      "struct",
      "구조체",
      "사용자정의형"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-c-struct"
  },
  {
    "id": "EXP_PR_007",
    "subject": "프로그래밍언어활용",
    "category": "C언어",
    "type": "SHORT_ANSWER",
    "question": "C언어 구조체 포인터 변수를 통해 해당 구조체의 멤버 변수에 접근할 때 사용하는 화살표 모양의 멤버 접근 연산자 기호는 무엇인가?",
    "answer": "->",
    "explanation": "구조체 포인터에서 멤버를 직접 접근할 때 -> 연산자를 사용합니다. (*ptr).member 와 동일한 의미입니다.",
    "difficulty": "EASY",
    "keywords": [
      "->",
      "화살표연산자",
      "구조체포인터"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-c-struct"
  },
  {
    "id": "EXP_PR_008",
    "subject": "프로그래밍언어활용",
    "category": "C언어",
    "type": "SHORT_ANSWER",
    "question": "C언어에서 기존 데이터 타입에 새로운 별칭(alias)을 부여할 때 사용하는 키워드는 무엇인가?",
    "answer": "typedef",
    "explanation": "typedef는 기존 자료형에 짧고 직관적인 새 이름을 붙여 가독성을 높이고 코드 수정을 용이하게 만듭니다.",
    "difficulty": "EASY",
    "keywords": [
      "typedef",
      "타입별칭"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-c-syntax"
  },
  {
    "id": "EXP_PR_009",
    "subject": "프로그래밍언어활용",
    "category": "C언어",
    "type": "SHORT_ANSWER",
    "question": "C언어 컴파일 전 소스코드 내에서 특정 기호 상수를 치환하거나 매크로를 정의할 때 사용하는 전처리기 지시자는 무엇인가?",
    "answer": "#define",
    "explanation": "#define 지시자는 상수를 정의하거나 매크로 함수를 만들 때 사용하며, 컴파일 전에 단순 문자열 치환 방식으로 동작합니다.",
    "difficulty": "EASY",
    "keywords": [
      "#define",
      "전처리기",
      "매크로"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-c-syntax"
  },
  {
    "id": "EXP_PR_010",
    "subject": "프로그래밍언어활용",
    "category": "C언어",
    "type": "SHORT_ANSWER",
    "question": "함수 호출 시 인자의 실제 값을 복사하여 전달하므로 호출된 함수 내부에서 값을 변경해도 호출한 원래 변수에는 영향이 없는 매개변수 전달 방식은 무엇인가?",
    "answer": "Call by Value",
    "explanation": "값에 의한 호출(Call by Value)은 인자의 복사본을 넘겨 원본이 안전하게 보존됩니다. 원본을 수정하려면 주소를 넘기는 Call by Reference를 써야 합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "Call by Value",
      "값에의한호출"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-c-function"
  },
  {
    "id": "EXP_PR_011",
    "subject": "프로그래밍언어활용",
    "category": "C언어",
    "type": "SHORT_ANSWER",
    "question": "함수 호출 시 실인자의 메모리 주소를 전달하여 호출된 함수 내부에서 원본 변수의 값을 직접 변경할 수 있는 매개변수 전달 방식은 무엇인가?",
    "answer": "Call by Reference",
    "explanation": "참조에 의한 호출(Call by Reference)은 주소값을 넘겨 함수 내에서 원본 변수를 조작합니다. C언어에서는 포인터를 활용하여 이를 흉내냅니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "Call by Reference",
      "참조에의한호출"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-c-function"
  },
  {
    "id": "EXP_PR_012",
    "subject": "프로그래밍언어활용",
    "category": "C언어",
    "type": "SHORT_ANSWER",
    "question": "C언어 printf 서식 문자열에서 16진수 정수를 소문자 형태로 출력할 때 사용하는 서식 지정자는 무엇인가?",
    "answer": "%x",
    "explanation": "%x는 16진수 소문자 출력, %X는 대문자 출력 서식 지정자입니다. 8진수는 %o, 10진수 정수는 %d입니다.",
    "difficulty": "EASY",
    "keywords": [
      "%x",
      "서식지정자",
      "16진수"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-c-syntax"
  },
  {
    "id": "EXP_PR_013",
    "subject": "프로그래밍언어활용",
    "category": "C언어",
    "type": "SHORT_ANSWER",
    "question": "C언어 printf 서식 지정자 중 메모리 주소값(포인터 값)을 16진수 형태로 출력할 때 사용하는 지정자는 무엇인가?",
    "answer": "%p",
    "explanation": "%p는 포인터 변수가 담고 있는 주소값을 출력하는 서식 지정자입니다.",
    "difficulty": "EASY",
    "keywords": [
      "%p",
      "서식지정자",
      "포인터주소"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-c-syntax"
  },
  {
    "id": "EXP_PR_014",
    "subject": "프로그래밍언어활용",
    "category": "C언어",
    "type": "SHORT_ANSWER",
    "question": "C언어 비트 연산자 중 두 비트가 서로 다를 때만 1을 반환하는 배타적 논리합(XOR) 연산자 기호는 무엇인가?",
    "answer": "^",
    "explanation": "^(캐럿)은 XOR 연산자로서 두 비트가 다를 때 1, 같을 때 0을 반환합니다. &(AND)와 |(OR)와 구분해야 합니다.",
    "difficulty": "EASY",
    "keywords": [
      "^",
      "XOR",
      "비트연산자"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-c-bitwise"
  },
  {
    "id": "EXP_PR_015",
    "subject": "프로그래밍언어활용",
    "category": "C언어",
    "type": "SHORT_ANSWER",
    "question": "C언어 비트 연산자 중 모든 비트를 0은 1로, 1은 0으로 반전시키는 1의 보수(비트 NOT) 연산자 기호는 무엇인가?",
    "answer": "~",
    "explanation": "~(물결)은 비트 단위 NOT 연산자입니다. 논리 부정(!)과 기호를 혼동하지 않도록 주의해야 합니다.",
    "difficulty": "EASY",
    "keywords": [
      "~",
      "비트NOT",
      "1의보수"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-c-bitwise"
  },
  {
    "id": "EXP_PR_016",
    "subject": "프로그래밍언어활용",
    "category": "C언어",
    "type": "SHORT_ANSWER",
    "question": "C언어 비트 연산에서 피연산자의 비트들을 왼쪽으로 n칸 이동시키고 빈자리를 0으로 채우는 비트 시프트 연산자 기호는 무엇인가?",
    "answer": "<<",
    "explanation": "<< 연산자는 왼쪽으로 1비트 이동할 때마다 2를 곱한 효과(2^n)를 냅니다. 오른쪽 시프트는 >>입니다.",
    "difficulty": "EASY",
    "keywords": [
      "<<",
      "왼쪽시프트",
      "비트연산자"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-c-bitwise"
  },
  {
    "id": "EXP_PR_017",
    "subject": "프로그래밍언어활용",
    "category": "C언어",
    "type": "SHORT_ANSWER",
    "question": "함수 호출 시 생성되는 지역 변수, 매개변수, 반환 주소 등이 임시 저장되는 메모리 영역의 이름은 무엇인가?",
    "answer": "스택",
    "explanation": "스택(Stack) 영역은 함수 호출 시 할당되고 함수 종료 시 자동으로 소멸하는 LIFO 구조의 메모리 영역입니다. 힙(Heap)은 프로그래머가 동적 할당합니다.",
    "difficulty": "EASY",
    "keywords": [
      "스택",
      "Stack",
      "메모리영역",
      "지역변수"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-c-memory"
  },
  {
    "id": "EXP_PR_018",
    "subject": "프로그래밍언어활용",
    "category": "C언어",
    "type": "SHORT_ANSWER",
    "question": "전역 변수와 정적(static) 변수가 저장되며 프로그램 시작 시 할당되고 프로그램 종료 시 소멸하는 메모리 영역의 이름은 무엇인가?",
    "answer": "데이터 영역",
    "explanation": "데이터(Data) 영역은 전역 변수와 static 변수가 저장되는 공간으로 프로그램 실행 중 상주합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "데이터 영역",
      "Data",
      "전역변수"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-c-memory"
  },
  {
    "id": "EXP_PR_019",
    "subject": "프로그래밍언어활용",
    "category": "Java",
    "type": "SHORT_ANSWER",
    "question": "Java에서 동일한 클래스 내에 이름이 같은 메서드를 매개변수의 타입이나 개수를 다르게 하여 여러 개 정의하는 객체지향 기법은 무엇인가?",
    "answer": "오버로딩",
    "explanation": "오버로딩(Overloading)은 같은 이름의 메서드를 매개변수 목록을 다르게 정의하는 기법입니다. 상속 관계에서 부모 메서드를 재정의하는 오버라이딩(Overriding)과 구별해야 합니다.",
    "difficulty": "EASY",
    "keywords": [
      "오버로딩",
      "Overloading",
      "다형성"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-java-oop"
  },
  {
    "id": "EXP_PR_020",
    "subject": "프로그래밍언어활용",
    "category": "Java",
    "type": "SHORT_ANSWER",
    "question": "Java에서 자식 클래스가 상속받은 부모 클래스의 메서드를 동일한 이름, 매개변수, 반환형으로 본문(로직)만 재정의하는 기법은 무엇인가?",
    "answer": "오버라이딩",
    "explanation": "오버라이딩(Overriding)은 상위 클래스의 메서드를 하위 클래스에서 재정의하는 동적 바인딩 기법입니다. @Override 어노테이션으로 검증할 수 있습니다.",
    "difficulty": "EASY",
    "keywords": [
      "오버라이딩",
      "Overriding",
      "메서드재정의"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-java-oop"
  },
  {
    "id": "EXP_PR_021",
    "subject": "프로그래밍언어활용",
    "category": "Java",
    "type": "SHORT_ANSWER",
    "question": "Java에서 한 클래스가 다른 부모 클래스를 상속받을 때 클래스 선언부에 사용하는 상속 키워드는 무엇인가?",
    "answer": "extends",
    "explanation": "extends는 클래스 상속 시 사용하며 Java는 단일 상속만 허용합니다. 인터페이스 구현에는 implements를 사용합니다.",
    "difficulty": "EASY",
    "keywords": [
      "extends",
      "상속키워드",
      "Java"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-java-syntax"
  },
  {
    "id": "EXP_PR_022",
    "subject": "프로그래밍언어활용",
    "category": "Java",
    "type": "SHORT_ANSWER",
    "question": "Java에서 클래스가 인터페이스의 추상 메서드들을 구현하겠다고 선언할 때 사용하는 키워드는 무엇인가?",
    "answer": "implements",
    "explanation": "implements는 인터페이스를 클래스에서 다중 구현할 때 사용합니다. 인터페이스끼리 상속할 때는 extends를 씁니다.",
    "difficulty": "EASY",
    "keywords": [
      "implements",
      "인터페이스구현",
      "Java"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-java-syntax"
  },
  {
    "id": "EXP_PR_023",
    "subject": "프로그래밍언어활용",
    "category": "Java",
    "type": "SHORT_ANSWER",
    "question": "Java 자식 클래스 내부에서 부모 클래스의 생성자나 멤버 변수/메서드를 명시적으로 호출할 때 사용하는 키워드는 무엇인가?",
    "answer": "super",
    "explanation": "super 키워드는 부모 객체를 가리킵니다. 부모 생성자 호출은 super(), 자신의 멤버를 가리킬 때는 this를 씁니다.",
    "difficulty": "EASY",
    "keywords": [
      "super",
      "부모클래스참조",
      "생성자"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-java-syntax"
  },
  {
    "id": "EXP_PR_024",
    "subject": "프로그래밍언어활용",
    "category": "Java",
    "type": "SHORT_ANSWER",
    "question": "Java에서 인스턴스 생성 없이 클래스 이름만으로 직접 접근할 수 있는 클래스 변수나 정적 메서드를 선언할 때 사용하는 키워드는 무엇인가?",
    "answer": "static",
    "explanation": "static 키워드로 선언된 멤버는 클래스 로딩 시 메서드 영역(Method Area)에 생성되어 모든 인스턴스가 공유합니다.",
    "difficulty": "EASY",
    "keywords": [
      "static",
      "정적키워드",
      "클래스변수"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-java-syntax"
  },
  {
    "id": "EXP_PR_025",
    "subject": "프로그래밍언어활용",
    "category": "Java",
    "type": "SHORT_ANSWER",
    "question": "Java에서 변수를 상수로 만들어 값의 변경을 금지하거나, 메서드의 오버라이딩을 금지하고 클래스의 상속을 금지할 때 사용하는 키워드는 무엇인가?",
    "answer": "final",
    "explanation": "final 변수는 상수, final 메서드는 오버라이딩 불가, final 클래스는 상속 불가를 의미합니다.",
    "difficulty": "EASY",
    "keywords": [
      "final",
      "상수",
      "오버라이딩금지"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-java-syntax"
  },
  {
    "id": "EXP_PR_026",
    "subject": "프로그래밍언어활용",
    "category": "Java",
    "type": "SHORT_ANSWER",
    "question": "Java 4대 접근 제어자 중 해당 클래스가 정의된 동일 패키지 내부와 다른 패키지의 자식 클래스에서만 접근을 허용하는 제어자는 무엇인가?",
    "answer": "protected",
    "explanation": "protected는 동일 패키지 및 상속받은 하위 클래스에 접근을 허용합니다. 같은 클래스만 허용하는 것은 private, 전체 공개는 public입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "protected",
      "접근제어자",
      "상속"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-java-syntax"
  },
  {
    "id": "EXP_PR_027",
    "subject": "프로그래밍언어활용",
    "category": "Java",
    "type": "SHORT_ANSWER",
    "question": "Java 예외 처리 구문 중 예외 발생 여부와 상관없이 무조건 마지막에 반드시 실행되는 코드 블록을 지정하는 키워드는 무엇인가?",
    "answer": "finally",
    "explanation": "finally 블록은 try-catch 실행 후 파일 스트림이나 DB 연결 닫기 같은 리소스 해제 작업을 무조건 보장하기 위해 사용합니다.",
    "difficulty": "EASY",
    "keywords": [
      "finally",
      "예외처리",
      "리소스해제"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-java-syntax"
  },
  {
    "id": "EXP_PR_028",
    "subject": "프로그래밍언어활용",
    "category": "Java",
    "type": "SHORT_ANSWER",
    "question": "Java JVM 힙 영역에서 더 이상 어떤 참조도 닿지 않는 쓰레기 객체들을 주기적으로 탐색하여 메모리를 자동으로 회수하는 시스템 프로세스는 무엇인가?",
    "answer": "가비지 컬렉터",
    "explanation": "가비지 컬렉터(Garbage Collector, GC)는 도달 불가능(unreachable) 객체를 자동 수거하여 프로그래머가 수동으로 메모리를 해제하지 않도록 돕습니다.",
    "difficulty": "EASY",
    "keywords": [
      "가비지 컬렉터",
      "GC",
      "Garbage Collector"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-java-jvm"
  },
  {
    "id": "EXP_PR_029",
    "subject": "프로그래밍언어활용",
    "category": "Java",
    "type": "SHORT_ANSWER",
    "question": "Java 컬렉션 프레임워크 중 순서를 보장하지 않고 데이터의 중복 저장을 절대 허용하지 않는 인터페이스는 무엇인가?",
    "answer": "Set",
    "explanation": "Set은 중복을 허용하지 않는 집합 컬렉션(대표 구현체: HashSet, TreeSet)입니다. 순서와 중복을 허용하는 것은 List입니다.",
    "difficulty": "EASY",
    "keywords": [
      "Set",
      "컬렉션",
      "중복불가"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-java-collections"
  },
  {
    "id": "EXP_PR_030",
    "subject": "프로그래밍언어활용",
    "category": "Java",
    "type": "SHORT_ANSWER",
    "question": "Java 컬렉션 프레임워크 중 키(Key)와 값(Value)의 쌍으로 데이터를 관리하며, 키는 중복될 수 없는 인터페이스는 무엇인가?",
    "answer": "Map",
    "explanation": "Map은 Key-Value 매핑 컬렉션(대표 구현체: HashMap, TreeMap)으로 키의 중복은 불허하지만 값의 중복은 허용합니다.",
    "difficulty": "EASY",
    "keywords": [
      "Map",
      "Key-Value",
      "HashMap"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-java-collections"
  },
  {
    "id": "EXP_PR_031",
    "subject": "프로그래밍언어활용",
    "category": "Python",
    "type": "SHORT_ANSWER",
    "question": "Python에서 한 번 생성된 후 내부 요소의 추가, 삭제, 수정이 불가능한 불변(Immutable) 시퀀스 자료형으로 소괄호 ()로 표현하는 것은 무엇인가?",
    "answer": "튜플",
    "explanation": "튜플(Tuple)은 불변 자료형으로 요소를 변경할 수 없습니다. 대괄호 []로 감싸 수정 가능한 것은 리스트(List)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "튜플",
      "Tuple",
      "불변자료형"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-py-datatype"
  },
  {
    "id": "EXP_PR_032",
    "subject": "프로그래밍언어활용",
    "category": "Python",
    "type": "SHORT_ANSWER",
    "question": "Python에서 키(Key)와 값(Value)의 쌍으로 구성되며 중괄호 {}를 사용해 선언하는 가변 매핑 자료형은 무엇인가?",
    "answer": "딕셔너리",
    "explanation": "딕셔너리(Dictionary)는 키 기반 검색을 지원하는 매핑 자료형입니다. 키는 해시 가능한 불변 타입이어야 합니다.",
    "difficulty": "EASY",
    "keywords": [
      "딕셔너리",
      "dict",
      "Dictionary"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-py-datatype"
  },
  {
    "id": "EXP_PR_033",
    "subject": "프로그래밍언어활용",
    "category": "Python",
    "type": "SHORT_ANSWER",
    "question": "Python에서 별도의 def 함수 선언 없이 이름이 없는 한 줄짜리 인라인 익명 함수를 정의할 때 사용하는 키워드는 무엇인가?",
    "answer": "lambda",
    "explanation": "lambda 키워드는 인라인 익명 함수를 만들며 `lambda x: x * 2` 형태로 작성합니다.",
    "difficulty": "EASY",
    "keywords": [
      "lambda",
      "익명함수",
      "파이썬"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-py-syntax"
  },
  {
    "id": "EXP_PR_034",
    "subject": "프로그래밍언어활용",
    "category": "Python",
    "type": "SHORT_ANSWER",
    "question": "Python 문자열이나 리스트 s에 대해 슬라이싱 기법을 이용하여 전체 시퀀스를 뒤에서부터 역순으로 뒤집을 때 사용하는 슬라이스 표기식은 무엇인가?",
    "answer": "[::-1]",
    "explanation": "`[::-1]`은 start와 end를 생략하고 step을 -1로 지정하여 전체 시퀀스를 역순으로 뒤집는 파이썬 관용구입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "[::-1]",
      "슬라이싱",
      "역순"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-py-syntax"
  },
  {
    "id": "EXP_PR_035",
    "subject": "프로그래밍언어활용",
    "category": "Python",
    "type": "SHORT_ANSWER",
    "question": "Python 리스트나 딕셔너리 등 시퀀스의 전체 요소 개수(길이)를 구할 때 사용하는 표준 내장 함수는 무엇인가?",
    "answer": "len",
    "explanation": "len() 함수는 객체의 원소 개수를 반환합니다.",
    "difficulty": "EASY",
    "keywords": [
      "len",
      "길이반환",
      "파이썬내장함수"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-py-syntax"
  },
  {
    "id": "EXP_PR_036",
    "subject": "프로그래밍언어활용",
    "category": "Python",
    "type": "SHORT_ANSWER",
    "question": "Python에서 여러 반복 가능한(iterable) 객체들을 인자로 받아 동일 인덱스의 요소들을 튜플로 묶어주는 내장 함수는 무엇인가?",
    "answer": "zip",
    "explanation": "zip() 함수는 2개 이상의 리스트나 튜플에서 동일 위치의 원소들을 묶어 튜플의 이터레이터를 생성합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "zip",
      "내장함수",
      "튜플묶기"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-py-syntax"
  },
  {
    "id": "EXP_PR_037",
    "subject": "프로그래밍언어활용",
    "category": "Python",
    "type": "SHORT_ANSWER",
    "question": "Python 딕셔너리에서 존재하지 않는 키를 조회할 때 KeyError 예외를 발생시키지 않고 안전하게 기본값을 반환받는 메서드는 무엇인가?",
    "answer": "get",
    "explanation": "dict.get(key, default) 메서드는 키가 없을 때 기본값(지정 안 하면 None)을 안전하게 반환합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "get",
      "딕셔너리메서드",
      "예외방지"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-py-syntax"
  },
  {
    "id": "EXP_PR_038",
    "subject": "프로그래밍언어활용",
    "category": "Python",
    "type": "SHORT_ANSWER",
    "question": "Python 세트(set) 자료형에서 중복 요소를 제거하고 두 집합의 공통 원소만을 구할 때 사용하는 교집합 연산자 기호는 무엇인가?",
    "answer": "&",
    "explanation": "파이썬 집합 자료형에서 &(앰퍼샌드)는 교집합 연산자입니다. 합집합은 |, 차집합은 - 기호를 사용합니다.",
    "difficulty": "EASY",
    "keywords": [
      "&",
      "교집합",
      "세트연산자"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-py-datatype"
  },
  {
    "id": "EXP_PR_039",
    "subject": "프로그래밍언어활용",
    "category": "C언어",
    "type": "SHORT_ANSWER",
    "question": "C언어 문자열의 끝을 컴퓨터가 식별하기 위해 모든 문자열의 마지막에 자동으로 추가되는 널 문자 표기는 무엇인가?",
    "answer": "\\0",
    "explanation": "\\0(널 문자, ASCII 0)은 C언어 문자열의 종료를 알리는 센티널 값입니다. 문자 \"0\"(ASCII 48)과 구별해야 합니다.",
    "difficulty": "EASY",
    "keywords": [
      "\\0",
      "널문자",
      "문자열종료"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-c-syntax"
  },
  {
    "id": "EXP_PR_040",
    "subject": "프로그래밍언어활용",
    "category": "C언어",
    "type": "SHORT_ANSWER",
    "question": "C언어 표준 라이브러리 <string.h>에서 두 문자열이 사전순으로 일치하는지 비교하는 함수의 이름은 무엇인가?",
    "answer": "strcmp",
    "explanation": "strcmp(s1, s2)는 두 문자열이 같으면 0, s1이 크면 양수, s2가 크면 음수를 반환합니다.",
    "difficulty": "EASY",
    "keywords": [
      "strcmp",
      "문자열비교",
      "string.h"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-c-string"
  },
  {
    "id": "EXP_PR_041",
    "subject": "프로그래밍언어활용",
    "category": "C언어",
    "type": "SHORT_ANSWER",
    "question": "C언어 표준 라이브러리 <string.h>에서 원본 문자열을 대상 버퍼에 복사하는 함수의 이름은 무엇인가?",
    "answer": "strcpy",
    "explanation": "strcpy(dest, src)는 src 문자열을 dest 버퍼에 널 문자까지 복사합니다. 버퍼 오버플로우 방지를 위해 strncpy 사용이 권장됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "strcpy",
      "문자열복사",
      "string.h"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-c-string"
  },
  {
    "id": "EXP_PR_042",
    "subject": "프로그래밍언어활용",
    "category": "C언어",
    "type": "SHORT_ANSWER",
    "question": "C언어 표준 라이브러리 <string.h>에서 하나의 문자열 뒤에 다른 문자열을 덧붙이는(연결하는) 함수의 이름은 무엇인가?",
    "answer": "strcat",
    "explanation": "strcat(dest, src)는 dest 문자열 끝에 src를 덧붙입니다.",
    "difficulty": "EASY",
    "keywords": [
      "strcat",
      "문자열연결",
      "string.h"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-c-string"
  },
  {
    "id": "EXP_PR_043",
    "subject": "프로그래밍언어활용",
    "category": "C언어",
    "type": "SHORT_ANSWER",
    "question": "C언어 표준 라이브러리 <string.h>에서 널 문자를 제외한 순수 문자열의 글자 수를 계산해 반환하는 함수는 무엇인가?",
    "answer": "strlen",
    "explanation": "strlen(str)은 시작점부터 \\0 직전까지의 바이트/문자 수를 계산합니다. sizeof(배열)은 할당된 전체 버퍼 크기를 반환하므로 다릅니다.",
    "difficulty": "EASY",
    "keywords": [
      "strlen",
      "문자열길이",
      "string.h"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-c-string"
  },
  {
    "id": "EXP_PR_044",
    "subject": "프로그래밍언어활용",
    "category": "Java",
    "type": "SHORT_ANSWER",
    "question": "Java에서 두 문자열 객체의 내용(값)이 동일한지 비교할 때 == 연산자 대신 반드시 호출해야 하는 메서드는 무엇인가?",
    "answer": "equals",
    "explanation": "Java에서 == 연산자는 객체의 주소값(참조)을 비교하므로, 문자열의 실제 내용을 비교하려면 equals() 메서드를 호출해야 합니다.",
    "difficulty": "EASY",
    "keywords": [
      "equals",
      "문자열비교",
      "내용비교"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-java-syntax"
  },
  {
    "id": "EXP_PR_045",
    "subject": "프로그래밍언어활용",
    "category": "Java",
    "type": "SHORT_ANSWER",
    "question": "Java String 클래스는 불변(Immutable) 객체이므로 문자열을 빈번히 결합할 때 성능 저하를 방지하기 위해 사용하는 가변(Mutable) 버퍼 클래스는 무엇인가?",
    "answer": "StringBuilder",
    "explanation": "StringBuilder는 가변 버퍼를 지원하여 append() 시 새로운 객체를 매번 생성하지 않고 기존 버퍼를 확장합니다. 멀티스레드 동기화가 필요한 경우 StringBuffer를 씁니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "StringBuilder",
      "문자열결합",
      "가변객체"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-java-syntax"
  },
  {
    "id": "EXP_PR_046",
    "subject": "프로그래밍언어활용",
    "category": "Java",
    "type": "SHORT_ANSWER",
    "question": "Java에서 컴파일 타임에 다양한 타입을 일반화하여 타입 안전성(Type Safety)을 보장하고 형변환의 번거로움을 줄여주는 기법은 무엇인가?",
    "answer": "제네릭",
    "explanation": "제네릭(Generics, `<T>`)은 클래스나 메서드에서 사용할 데이터 타입을 파라미터화하여 컴파일 시 엄격한 타입 체크를 수행합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "제네릭",
      "Generics",
      "타입안전성"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-java-syntax"
  },
  {
    "id": "EXP_PR_047",
    "subject": "프로그래밍언어활용",
    "category": "Python",
    "type": "SHORT_ANSWER",
    "question": "Python 리스트에서 [표현식 for 항목 in 반복가능객체 if 조건문] 형태로 간결하게 새로운 리스트를 생성하는 문법 표기법은 무엇인가?",
    "answer": "리스트 컴프리헨션",
    "explanation": "리스트 컴프리헨션(List Comprehension)은 반복문과 조건문을 축약하여 한 줄로 새 리스트를 필터링/가공하는 파이썬 고유 문법입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "리스트 컴프리헨션",
      "List Comprehension"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-py-syntax"
  },
  {
    "id": "EXP_PR_048",
    "subject": "프로그래밍언어활용",
    "category": "C언어",
    "type": "SHORT_ANSWER",
    "question": "C언어 삼항 조건 연산자(조건 ? 수식1 : 수식2)에서 조건식이 참(True)일 때 평가되는 수식은 수식1인가 수식2인가?",
    "answer": "수식1",
    "explanation": "삼항 연산자 `condition ? expr1 : expr2`는 조건이 참이면 expr1, 거짓이면 expr2를 평가합니다.",
    "difficulty": "EASY",
    "keywords": [
      "수식1",
      "삼항연산자",
      "조건연산자"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-c-syntax"
  },
  {
    "id": "EXP_PR_049",
    "subject": "프로그래밍언어활용",
    "category": "Java",
    "type": "SHORT_ANSWER",
    "question": "Java switch-case 문에서 특정 case 문을 실행한 후 아래쪽 case 문들로 계속 흘러내리는(Fall-through) 현상을 막고 switch 문을 탈출하기 위해 쓰는 제어문 키워드는 무엇인가?",
    "answer": "break",
    "explanation": "break 문은 switch 문이나 반복문(for, while)을 즉시 종료하고 블록을 빠져나옵니다.",
    "difficulty": "EASY",
    "keywords": [
      "break",
      "switch-case",
      "루프탈출"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-java-syntax"
  },
  {
    "id": "EXP_PR_050",
    "subject": "프로그래밍언어활용",
    "category": "C언어",
    "type": "SHORT_ANSWER",
    "question": "C언어나 Java 반복문(for, while) 내부에서 현재 반복 회차의 나머지 코드를 건너뛰고 다음 반복 회차의 조건 검사로 즉시 건너뛰게 만드는 제어문 키워드는 무엇인가?",
    "answer": "continue",
    "explanation": "continue는 현재 회차의 남은 실행문을 건너뛰고 루프의 다음 증감/조건식으로 이동합니다. 루프를 완전히 끝내는 break와 다릅니다.",
    "difficulty": "EASY",
    "keywords": [
      "continue",
      "반복문제어",
      "건너뛰기"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-c-syntax"
  },
  {
    "id": "EXP_OS_001",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "운영체제 프로세스 상태 전이 중 준비(Ready) 상태에 있던 프로세스가 CPU를 할당받아 실행(Running) 상태로 전이되는 과정을 무엇이라 하는가?",
    "answer": "디스패치",
    "explanation": "디스패치(Dispatch)는 준비 큐의 맨 앞에 있던 프로세스가 CPU 스케줄러에 의해 CPU를 점유하여 실행 상태로 바뀌는 동작입니다.",
    "difficulty": "EASY",
    "keywords": [
      "디스패치",
      "Dispatch",
      "프로세스상태전이"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-process"
  },
  {
    "id": "EXP_OS_002",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "운영체제가 각 프로세스를 관리하고 제어하기 위해 프로세스의 식별자, 현재 상태, 레지스터 값 등을 저장하는 자료구조 블록의 약칭은 무엇인가?",
    "answer": "PCB",
    "explanation": "PCB(Process Control Block, 프로세스 제어 블록)는 운영체제가 프로세스마다 유지하는 핵심 메타데이터 저장 블록입니다.",
    "difficulty": "EASY",
    "keywords": [
      "PCB",
      "Process Control Block",
      "프로세스제어블록"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-process"
  },
  {
    "id": "EXP_OS_003",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "하나의 프로세스에서 다른 프로세스로 CPU의 제어권이 넘어갈 때 기존 프로세스의 상태를 PCB에 저장하고 새 프로세스의 상태를 레지스터로 복구하는 작업을 무엇이라 하는가?",
    "answer": "문맥 교환",
    "explanation": "문맥 교환(Context Switching)은 인터럽트나 스케줄링 시 발생하며, 잦은 문맥 교환은 시스템 오버헤드를 유발합니다.",
    "difficulty": "EASY",
    "keywords": [
      "문맥 교환",
      "Context Switching",
      "PCB"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-process"
  },
  {
    "id": "EXP_OS_004",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "비선점 스케줄링 기법 중 실행 시간이 긴 프로세스가 무한정 대기하는 기아 현상(Starvation)을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려하여 에이징(Aging) 효과를 부여한 알고리즘은 무엇인가?",
    "answer": "HRN",
    "explanation": "HRN(Highest Response-ratio Next)은 우선순위 = (대기시간 + 서비스시간) / 서비스시간 공식을 사용하여 대기 시간이 길수록 우선순위를 높입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "HRN",
      "스케줄링",
      "기아현상해결"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-scheduling"
  },
  {
    "id": "EXP_OS_005",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "시분할 시스템을 위해 설계된 선점형 스케줄링 알고리즘으로, 각 프로세스에 동일한 크기의 CPU 시간 할당량(Time Quantum)을 부여하고 시간 초과 시 다음 프로세스로 넘기는 기법은 무엇인가?",
    "answer": "라운드 로빈",
    "explanation": "라운드 로빈(Round Robin, RR)은 시간 할당량이 너무 크면 FCFS처럼 작동하고, 너무 작으면 문맥 교환 오버헤드가 급증합니다.",
    "difficulty": "EASY",
    "keywords": [
      "라운드 로빈",
      "Round Robin",
      "Time Quantum"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-scheduling"
  },
  {
    "id": "EXP_OS_006",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "SJF(최단 작업 우선) 알고리즘을 선점형 방식으로 변형한 것으로, 현재 실행 중인 프로세스의 남은 실행 시간보다 더 짧은 실행 시간을 가진 새 프로세스가 도착하면 CPU를 빼앗는 스케줄링 기법은 무엇인가?",
    "answer": "SRT",
    "explanation": "SRT(Shortest Remaining Time First)는 남은 처리 시간이 가장 짧은 프로세스에게 CPU를 선점시키는 기법입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "SRT",
      "Shortest Remaining Time",
      "선점스케줄링"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-scheduling"
  },
  {
    "id": "EXP_OS_007",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "교착상태(Deadlock) 발생 4대 필요조건 중 한 번에 하나의 프로세스만이 자원을 독점적으로 사용할 수 있어야 한다는 조건은 무엇인가?",
    "answer": "상호 배제",
    "explanation": "상호 배제(Mutual Exclusion)는 자원을 동시에 공유할 수 없는 조건입니다. 나머지 3조건은 점유와 대기, 비선점, 환형 대기입니다.",
    "difficulty": "EASY",
    "keywords": [
      "상호 배제",
      "Mutual Exclusion",
      "교착상태조건"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-deadlock"
  },
  {
    "id": "EXP_OS_008",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "교착상태(Deadlock) 발생 4대 필요조건 중 다른 프로세스에 할당된 자원을 강제로 빼앗을 수 없고 점유한 프로세스가 자발적으로만 해제할 수 있다는 조건은 무엇인가?",
    "answer": "비선점",
    "explanation": "비선점(Non-preemption)은 강제로 자원을 회수하지 못하는 조건입니다. 선점을 허용하면 교착상태를 예방할 수 있습니다.",
    "difficulty": "EASY",
    "keywords": [
      "비선점",
      "Non-preemption",
      "교착상태"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-deadlock"
  },
  {
    "id": "EXP_OS_009",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "교착상태 발생 4대 필요조건 중 프로세스들이 순환 형태로 서로가 가진 자원을 요구하며 꼬리를 물고 무한 대기하는 조건은 무엇인가?",
    "answer": "환형 대기",
    "explanation": "환형 대기(Circular Wait)는 자원 할당 그래프에서 사이클을 형성하는 조건입니다. 자원에 번호를 매겨 한 방향으로만 요구하게 하면 예방됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "환형 대기",
      "Circular Wait",
      "교착상태"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-deadlock"
  },
  {
    "id": "EXP_OS_010",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "교착상태 해결 방법 중 다익스트라(Dijkstra)가 제안한 기법으로, 자원 할당 전 시스템이 안전 상태(Safe State)를 유지할 수 있는지 사전에 검사하여 교착상태를 회피하는 대표 알고리즘은 무엇인가?",
    "answer": "은행가 알고리즘",
    "explanation": "은행가 알고리즘(Banker's Algorithm)은 안전 상태일 때만 자원을 할당하는 대표적인 교착상태 회피(Avoidance) 알고리즘입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "은행가 알고리즘",
      "Banker",
      "교착상태회피"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-deadlock"
  },
  {
    "id": "EXP_OS_011",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "메모리 배치(Placement) 전략 중 들어갈 수 있는 빈 메모리 공간들 중 크기가 요구량에 가장 딱 맞아서 내부 단편화를 최소화할 수 있는 공간을 찾아 배치하는 기법은 무엇인가?",
    "answer": "Best Fit",
    "explanation": "최적 적합(Best Fit)은 잔여 단편화 공간을 최소화하지만 매우 작은 쓸모없는 자투리 공간을 많이 남기는 단점이 있습니다. 첫 발견 공간에 넣는 것은 First Fit입니다.",
    "difficulty": "EASY",
    "keywords": [
      "Best Fit",
      "최적적합",
      "메모리배치"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-memory"
  },
  {
    "id": "EXP_OS_012",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "메모리 배치 전략 중 메모리의 첫 주소부터 검색하여 프로세스가 들어갈 수 있는 크기의 첫 번째 빈 공간을 발견하자마자 즉시 배치하는 기법은 무엇인가?",
    "answer": "First Fit",
    "explanation": "최초 적합(First Fit)은 검색 속도가 가장 빠르며 오버헤드가 적은 메모리 배치 기법입니다.",
    "difficulty": "EASY",
    "keywords": [
      "First Fit",
      "최초적합",
      "메모리배치"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-memory"
  },
  {
    "id": "EXP_OS_013",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "가상 메모리 관리 기법 중 가상 기억장치의 프로그램을 동일한 크기의 고정된 블록 단위로 분할하여 관리하는 기법은 무엇인가?",
    "answer": "페이징",
    "explanation": "페이징(Paging)은 고정 크기 블록(페이지)으로 나누어 외부 단편화를 해결하지만, 마지막 페이지에서 내부 단편화가 발생할 수 있습니다. 가변 논리 단위 분할은 세그멘테이션입니다.",
    "difficulty": "EASY",
    "keywords": [
      "페이징",
      "Paging",
      "가상메모리"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-memory"
  },
  {
    "id": "EXP_OS_014",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "가상 메모리 관리 기법 중 프로그램을 코드, 데이터, 스택 등 논리적인 의미를 지닌 서로 다른 가변 크기의 단위로 분할하여 관리하는 기법은 무엇인가?",
    "answer": "세그멘테이션",
    "explanation": "세그멘테이션(Segmentation)은 가변 크기 단위로 나누어 내부 단편화를 없애지만, 외부 단편화가 발생할 수 있습니다.",
    "difficulty": "EASY",
    "keywords": [
      "세그멘테이션",
      "Segmentation",
      "가상메모리"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-memory"
  },
  {
    "id": "EXP_OS_015",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "페이지 교체 알고리즘 중 가장 오랫동안 참조되지 않은(가장 과거에 사용된) 페이지를 교체 대상으로 선택하는 기법의 약칭은 무엇인가?",
    "answer": "LRU",
    "explanation": "LRU(Least Recently Used)는 최근 사용 시간(시간적 참조 국부성)을 기준으로 가장 오래 참조되지 않은 페이지를 내보냅니다.",
    "difficulty": "EASY",
    "keywords": [
      "LRU",
      "Least Recently Used",
      "페이지교체"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-replacement"
  },
  {
    "id": "EXP_OS_016",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "페이지 교체 알고리즘 중 과거에 사용된 횟수(참조 빈도)가 가장 적은 페이지를 교체 대상으로 선택하는 기법의 약칭은 무엇인가?",
    "answer": "LFU",
    "explanation": "LFU(Least Frequently Used)는 참조 횟수를 카운트하여 가장 적게 참조된 페이지를 교체합니다.",
    "difficulty": "EASY",
    "keywords": [
      "LFU",
      "Least Frequently Used",
      "페이지교체"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-replacement"
  },
  {
    "id": "EXP_OS_017",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "페이지 교체 알고리즘 중 참조 비트(Reference Bit)와 변형 비트(Modified Bit)를 조합(00, 01, 10, 11)하여 교체 대상을 결정하는 알고리즘은 무엇인가?",
    "answer": "NUR",
    "explanation": "NUR(Not Used Recently, 최근 미사용) 알고리즘은 2비트를 사용하여 오버헤드를 줄이며 LRU와 유사한 성능을 냅니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "NUR",
      "Not Used Recently",
      "참조비트"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-replacement"
  },
  {
    "id": "EXP_OS_018",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "프로세스가 실행되는 동안 자주 발생하는 페이지 부재(Page Fault)로 인해 프로세스 실행 시간보다 페이지 교체 시간이 더 많아져 CPU 사용률이 급격히 떨어지는 현상을 무엇이라 하는가?",
    "answer": "스래싱",
    "explanation": "스래싱(Thrashing)은 다중 프로그래밍 정도가 너무 높아져 발생합니다. 워킹셋이나 페이지 부재 빈도(PFF) 조절로 예방합니다.",
    "difficulty": "EASY",
    "keywords": [
      "스래싱",
      "Thrashing",
      "페이지부재"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-memory"
  },
  {
    "id": "EXP_OS_019",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "데닝(Denning)이 제안한 기법으로, 스래싱을 방지하기 위해 프로세스가 일정 시간 동안 자주 참조하는 페이지 집합을 주기억장치에 상주시켜 유지하는 모델은 무엇인가?",
    "answer": "워킹셋",
    "explanation": "워킹셋(Working Set)은 프로세스가 자주 사용하는 페이지 집합을 메모리에 적재하여 페이지 부재를 최소화합니다.",
    "difficulty": "EASY",
    "keywords": [
      "워킹셋",
      "Working Set",
      "스래싱방지"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-memory"
  },
  {
    "id": "EXP_OS_020",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "프로세스의 페이지 부재율에 상한선과 하한선을 설정하여, 상한을 넘으면 페이지 프레임을 추가 할당하고 하한 밑으로 떨어지면 회수하는 스래싱 방지 기법의 약칭은 무엇인가?",
    "answer": "PFF",
    "explanation": "PFF(Page Fault Frequency, 페이지 부재 빈도)는 부재율을 기반으로 프로세스별 페이지 프레임 수를 동적으로 조절합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "PFF",
      "Page Fault Frequency",
      "페이지부재빈도"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-memory"
  },
  {
    "id": "EXP_OS_021",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "리눅스/유닉스에서 파일이나 디렉터리의 읽기(r), 쓰기(w), 실행(x) 접근 권한 모드를 변경할 때 사용하는 명령어는 무엇인가?",
    "answer": "chmod",
    "explanation": "chmod(change mode)는 파일 접근 권한을 8진수(예: 755, 644)나 기호 모드로 변경합니다. 소유자 변경은 chown입니다.",
    "difficulty": "EASY",
    "keywords": [
      "chmod",
      "권한변경",
      "리눅스명령어"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-unix"
  },
  {
    "id": "EXP_OS_022",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "리눅스/유닉스에서 파일이나 디렉터리의 소유자(Owner) 또는 소유 그룹을 변경할 때 사용하는 명령어는 무엇인가?",
    "answer": "chown",
    "explanation": "chown(change owner)은 파일 소유권과 그룹 소유권을 변경하는 명령어입니다.",
    "difficulty": "EASY",
    "keywords": [
      "chown",
      "소유자변경",
      "리눅스명령어"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-unix"
  },
  {
    "id": "EXP_OS_023",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "리눅스/유닉스 시스템 호출(System Call) 중 현재 실행 중인 부모 프로세스의 메모리를 완벽히 복제하여 새로운 자식 프로세스를 생성하는 함수는 무엇인가?",
    "answer": "fork",
    "explanation": "fork()는 기존 프로세스를 복제하여 PID가 다른 새 프로세스를 생성합니다. 생성된 자식 프로세스에 새 프로그램을 덮어씌워 실행하는 것은 exec()입니다.",
    "difficulty": "EASY",
    "keywords": [
      "fork",
      "자식프로세스생성",
      "시스템콜"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-unix"
  },
  {
    "id": "EXP_OS_024",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "리눅스/유닉스에서 현재 시스템에서 실행 중인 프로세스들의 목록과 PID, 상태 등을 조회할 때 사용하는 기본 명령어는 무엇인가?",
    "answer": "ps",
    "explanation": "ps(process status)는 현재 활성 프로세스들을 조회합니다. 실시간 모니터링은 top 명령어를 씁니다.",
    "difficulty": "EASY",
    "keywords": [
      "ps",
      "프로세스조회",
      "PID"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-unix"
  },
  {
    "id": "EXP_OS_025",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "리눅스/유닉스에서 지정된 프로세스 ID(PID)에 특정 시그널(예: SIGKILL 9번)을 전달하여 비정상 프로세스를 강제 종료시킬 때 사용하는 명령어는 무엇인가?",
    "answer": "kill",
    "explanation": "kill 명령어는 프로세스에 종료 시그널(kill -9 PID)을 전송하여 프로세스를 종료합니다.",
    "difficulty": "EASY",
    "keywords": [
      "kill",
      "프로세스종료",
      "시그널"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-unix"
  },
  {
    "id": "EXP_OS_026",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "리눅스/유닉스에서 파일 내용 중 특정 정규표현식 패턴이나 문자열이 포함된 줄을 검색하여 출력해주는 필터 명령어는 무엇인가?",
    "answer": "grep",
    "explanation": "grep(global regular expression print)은 텍스트 파일이나 파이프 스트림에서 지정된 패턴을 검색하는 대표 필터입니다.",
    "difficulty": "EASY",
    "keywords": [
      "grep",
      "패턴검색",
      "리눅스필터"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-unix"
  },
  {
    "id": "EXP_OS_027",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "리눅스/유닉스 쉘에서 현재 작업 중인 디렉터리의 절대 경로(Print Working Directory)를 화면에 출력하는 명령어는 무엇인가?",
    "answer": "pwd",
    "explanation": "pwd는 현재 작업 디렉터리의 전체 경로를 출력합니다.",
    "difficulty": "EASY",
    "keywords": [
      "pwd",
      "현재디렉터리",
      "절대경로"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-unix"
  },
  {
    "id": "EXP_OS_028",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "리눅스 파일 접근 권한에서 소유자에게 읽기(r=4), 쓰기(w=2), 실행(x=1) 권한을 모두 부여할 때 해당하는 8진수 숫자는 무엇인가?",
    "answer": "7",
    "explanation": "r(4) + w(2) + x(1) = 7 입니다. 읽기와 쓰기만 부여하면 6, 읽기와 실행만 부여하면 5가 됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "7",
      "8진수권한",
      "chmod"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-unix"
  },
  {
    "id": "EXP_OS_029",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "페이지 부재율을 줄이기 위해 페이지 프레임 수를 늘려주었음에도 불구하고 오히려 페이지 부재 횟수가 증가하는 이상 현상을 무엇이라 하는가?",
    "answer": "벨레이디의 모순",
    "explanation": "벨레이디의 모순(Belady's Anomaly)은 주로 FIFO 페이지 교체 알고리즘에서 프레임 수를 늘릴 때 나타나는 역설적 현상입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "벨레이디의 모순",
      "Belady",
      "FIFO이상현상"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-replacement"
  },
  {
    "id": "EXP_OS_030",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "임계 영역(Critical Section)에서 둘 이상의 프로세스가 공유 자원에 동시에 접근하려고 경쟁할 때 접근 순서에 따라 실행 결과가 달라지는 상황을 무엇이라 하는가?",
    "answer": "경쟁 상태",
    "explanation": "경쟁 상태(Race Condition)는 동기화 메커니즘이 부재할 때 발생하며, 뮤텍스(Mutex)나 세마포어(Semaphore)로 상호 배제를 달성해야 합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "경쟁 상태",
      "Race Condition",
      "동기화"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-sync"
  },
  {
    "id": "EXP_OS_031",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "공유 자원에 대한 접근을 동기화하기 위해 다익스트라가 고안한 정수형 변수 기반의 동기화 도구로 P(wait)와 V(signal) 연산을 사용하는 것은 무엇인가?",
    "answer": "세마포어",
    "explanation": "세마포어(Semaphore)는 정수형 변수 S를 이용해 다수의 자원 접근을 제어합니다. 단 1개의 스레드만 허용하는 락은 뮤텍스(Mutex)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "세마포어",
      "Semaphore",
      "동기화도구"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-sync"
  },
  {
    "id": "EXP_OS_032",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "하나의 프로세스 내에서 실행 흐름의 최소 단위로, 코드/데이터/힙 영역은 공유하고 독립적인 스택과 레지스터 집합만을 갖는 경량 프로세스를 무엇이라 하는가?",
    "answer": "스레드",
    "explanation": "스레드(Thread)는 프로세스 자원을 공유하여 생성 및 문맥 교환 비용이 프로세스보다 훨씬 가볍습니다.",
    "difficulty": "EASY",
    "keywords": [
      "스레드",
      "Thread",
      "경량프로세스"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-process"
  },
  {
    "id": "EXP_OS_033",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "동일 프로세스 내에서 자원을 공유하는 다중 스레드 구조에서 한 스레드의 메모리 훼손이 전체 프로세스로 번질 수 있는 단점에도 불구하고 스레드를 사용하는 가장 큰 성능상 장점은 무엇인가?",
    "answer": "문맥 교환 오버헤드 감소",
    "explanation": "스레드는 코드/데이터/힙 공간을 공유하므로 캐시 메모리를 비우지 않아 문맥 교환 속도가 매우 빠릅니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "문맥 교환 오버헤드 감소",
      "스레드장점"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-process"
  },
  {
    "id": "EXP_OS_034",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "자식 프로세스가 종료되었으나 부모 프로세스가 wait() 호출로 종료 상태를 회수하지 않아 프로세스 테이블에 남아있는 프로세스를 무엇이라 하는가?",
    "answer": "좀비 프로세스",
    "explanation": "좀비 프로세스(Zombie Process)는 실행은 끝났지만 PID와 종료 코드가 프로세스 테이블에 잔존하는 프로세스입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "좀비 프로세스",
      "Zombie",
      "wait"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-process"
  },
  {
    "id": "EXP_OS_035",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "부모 프로세스가 자식 프로세스보다 먼저 종료되어 고아가 된 프로세스를 거두어 새로운 부모가 되어주는 유닉스 최상위 1번 프로세스는 무엇인가?",
    "answer": "init",
    "explanation": "init(또는 현대 리눅스의 systemd) 프로세스는 부모를 잃은 고아 프로세스를 입양하여 종료 시 정상 회수합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "init",
      "고아프로세스",
      "PID 1"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-process"
  },
  {
    "id": "EXP_OS_036",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "기억장치 단편화 해결 기법 중 흩어져 있는 작은 빈 공간들을 하나로 모아 큰 단편화 공간을 만드는 작업을 무엇이라 하는가?",
    "answer": "메모리 압축",
    "explanation": "메모리 압축(Compaction, 쓰레기 수집)은 외부 단편화를 해결하기 위해 프로세스들을 재배치하여 공간을 하나로 합칩니다.",
    "difficulty": "EASY",
    "keywords": [
      "메모리 압축",
      "Compaction",
      "단편화해결"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-memory"
  },
  {
    "id": "EXP_OS_037",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "프로세스가 기억장치 내의 특정 영역을 단기간에 집중적으로 참조하는 특성으로, 시간적 구역성과 공간적 구역성으로 나뉘는 개념은 무엇인가?",
    "answer": "국부성",
    "explanation": "국부성(Locality, 지역성)은 캐시 및 가상 메모리 페이징 기법의 성능 보장에 핵심이 되는 이론적 근거입니다.",
    "difficulty": "EASY",
    "keywords": [
      "국부성",
      "지역성",
      "Locality"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-memory"
  },
  {
    "id": "EXP_OS_038",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "최근에 한 번 참조된 메모리 위치는 가까운 미래에 곧바로 다시 참조될 가능성이 높다는 국부성(Locality)의 종류는 무엇인가?",
    "answer": "시간 구역성",
    "explanation": "시간 구역성(Temporal Locality)의 대표적인 예로는 루프(반복문) 제어 변수, 스택 등이 있습니다. 근처 주소를 참조하는 것은 공간 구역성입니다.",
    "difficulty": "EASY",
    "keywords": [
      "시간 구역성",
      "Temporal Locality",
      "지역성"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-memory"
  },
  {
    "id": "EXP_OS_039",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "프로그램 실행 시 한 메모리 위치가 참조되면 그 인접한 주소에 위치한 데이터들이 곧이어 참조될 가능성이 높다는 국부성의 종류는 무엇인가?",
    "answer": "공간 구역성",
    "explanation": "공간 구역성(Spatial Locality)의 대표적 예로는 배열 순차 순회, 명령 코드의 순차 실행 등이 있습니다.",
    "difficulty": "EASY",
    "keywords": [
      "공간 구역성",
      "Spatial Locality",
      "배열순회"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-memory"
  },
  {
    "id": "EXP_OS_040",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "CPU에서 물리적 주소 변환 속도를 높이기 위해 페이지 테이블의 최근 변환 항목들을 임시 캐싱해두는 고속 하드웨어 캐시 메모리의 약칭은 무엇인가?",
    "answer": "TLB",
    "explanation": "TLB(Translation Lookaside Buffer, 변환 색인 버퍼)는 가상 주소를 물리 주소로 고속 변환해 주는 연관 사상 캐시입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "TLB",
      "Translation Lookaside Buffer",
      "주소변환"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-memory"
  },
  {
    "id": "EXP_OS_041",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "비선점 스케줄링 기법 중 준비 큐에 먼저 도착한 프로세스에게 CPU를 먼저 할당하여 작업이 끝날 때까지 수행시키는 가장 단순한 방식의 약칭은 무엇인가?",
    "answer": "FCFS",
    "explanation": "FCFS(First-Come First-Served)는 도착 순서대로 처리하므로 긴 작업이 먼저 오면 짧은 작업이 뒤에서 오래 기다리는 콘보이 효과(Convoy Effect)가 발생합니다.",
    "difficulty": "EASY",
    "keywords": [
      "FCFS",
      "First-Come First-Served",
      "콘보이효과"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-scheduling"
  },
  {
    "id": "EXP_OS_042",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "비선점 스케줄링 기법 중 CPU 요구(실행) 시간이 가장 짧은 프로세스에게 우선적으로 CPU를 할당하여 평균 대기시간을 최소화하는 방식의 약칭은 무엇인가?",
    "answer": "SJF",
    "explanation": "SJF(Shortest Job First)는 평균 대기시간을 최소화하지만, 긴 작업이 계속 밀리는 기아 현상(Starvation)이 발생할 수 있습니다.",
    "difficulty": "EASY",
    "keywords": [
      "SJF",
      "Shortest Job First",
      "평균대기시간최소화"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-scheduling"
  },
  {
    "id": "EXP_OS_043",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "준비 큐를 여러 개로 분할하여 각각 다른 우선순위와 스케줄링 방식을 부여하되, 프로세스가 큐 사이를 이동할 수 없는 스케줄링 기법은 무엇인가?",
    "answer": "다단계 큐",
    "explanation": "다단계 큐(Multilevel Queue)는 큐 간 이동이 불가합니다. 반면 하위 큐의 프로세스가 너무 오래 기다리면 상위 큐로 올려주는(Aging) 방식은 다단계 피드백 큐입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "다단계 큐",
      "Multilevel Queue",
      "스케줄링"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-scheduling"
  },
  {
    "id": "EXP_OS_044",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "프로세스가 CPU를 점유 중일 때 입출력 완료나 타이머 종료와 같은 외부 사건이 발생하여 CPU에게 즉시 처리를 요청하고 제어권을 넘기는 하드웨어 신호는 무엇인가?",
    "answer": "인터럽트",
    "explanation": "인터럽트(Interrupt)가 발생하면 CPU는 현재 작업을 중단하고 인터럽트 서비스 루틴(ISR)을 실행합니다.",
    "difficulty": "EASY",
    "keywords": [
      "인터럽트",
      "Interrupt",
      "ISR"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-interrupt"
  },
  {
    "id": "EXP_OS_045",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "프로그램 실행 중 0으로 나누기(Divide by Zero)나 잘못된 메모리 주소 참조 등 비정상적인 상황에 의해 CPU 내부에서 자체적으로 발생하는 인터럽트는 무엇인가?",
    "answer": "트랩",
    "explanation": "트랩(Trap) 또는 내부 인터럽트는 소프트웨어 예외 상황 시 CPU 내부에서 발생합니다. 입출력 등 하드웨어 장치에 의한 것은 외부 인터럽트입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "트랩",
      "Trap",
      "내부인터럽트"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-interrupt"
  },
  {
    "id": "EXP_OS_046",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "리눅스/유닉스에서 실행 중인 프로세스의 백그라운드 작업을 포그라운드로 가져오거나 백그라운드로 전환할 때 사용하는 약어 명령어는 무엇인가?",
    "answer": "fg",
    "explanation": "fg(foreground)는 백그라운드 작업을 전면으로 가져오며, bg는 일시 정지된 작업을 백그라운드에서 재개합니다.",
    "difficulty": "EASY",
    "keywords": [
      "fg",
      "포그라운드",
      "작업제어"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-unix"
  },
  {
    "id": "EXP_OS_047",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "리눅스/유닉스에서 파일 생성 시 기본으로 부여되는 접근 권한에서 제외할 권한 비트를 마스킹(설정)하는 명령어는 무엇인가?",
    "answer": "umask",
    "explanation": "umask는 기본 파일 생성 권한(666)이나 디렉터리 권한(777)에서 마스크 값을 차감하여 초기 권한을 결정합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "umask",
      "권한마스크",
      "기본권한"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-unix"
  },
  {
    "id": "EXP_OS_048",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "리눅스/유닉스에서 빈 파일을 생성하거나 기존 파일의 최종 수정 시간을 현재 시간으로 갱신할 때 사용하는 명령어는 무엇인가?",
    "answer": "touch",
    "explanation": "touch 명령어는 크기가 0인 빈 파일을 만들거나 타임스탬프를 갱신합니다.",
    "difficulty": "EASY",
    "keywords": [
      "touch",
      "파일생성",
      "타임스탬프"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-unix"
  },
  {
    "id": "EXP_OS_049",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "리눅스/유닉스 파일 시스템의 최상위 루트 디렉터리를 나타내는 기호는 무엇인가?",
    "answer": "/",
    "explanation": "/(슬래시)는 유닉스 계열 파일 시스템의 최상위 루트 디렉터리를 의미합니다. 윈도우의 C:\\ 와 대응됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "/",
      "루트디렉터리",
      "파일시스템"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-unix"
  },
  {
    "id": "EXP_OS_050",
    "subject": "프로그래밍언어활용",
    "category": "운영체제",
    "type": "SHORT_ANSWER",
    "question": "리눅스에서 명령어의 표준 출력을 다른 명령어의 표준 입력으로 직접 연결해 주는 파이프라인 기호는 무엇인가?",
    "answer": "|",
    "explanation": "|(파이프)는 한 명령어의 출력 결과를 다음 명령어의 입력으로 파이프라이닝할 때 사용합니다 (예: ps -ef | grep java).",
    "difficulty": "EASY",
    "keywords": [
      "|",
      "파이프",
      "리눅스기호"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-prog-os-unix"
  },
  {
    "id": "EXP_SE1_001",
    "subject": "소프트웨어설계",
    "category": "요구사항",
    "type": "SHORT_ANSWER",
    "question": "요구사항 검증 기법 중 작성자가 요구사항 명세서를 설명하고 동료들이 결함을 찾아내는 비공식적이고 가장 친숙한 검토 회의 기법은 무엇인가?",
    "answer": "워크스루",
    "explanation": "워크스루(Walkthrough)는 개발자 주도의 비공식적 결함 검출 회의입니다. 정해진 절차와 역할을 맡아 체크리스트로 공식 검토하는 것은 인스펙션(Inspection)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "워크스루",
      "Walkthrough",
      "요구사항검증"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-requirements"
  },
  {
    "id": "EXP_SE1_002",
    "subject": "소프트웨어설계",
    "category": "요구사항",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 개발 표준에 맞춰 작성된 명세서의 결함을 체크리스트를 기반으로 정형화된 공식 절차에 따라 저작자를 제외한 전문가들이 팀을 이뤄 검토하는 기법은 무엇인가?",
    "answer": "인스펙션",
    "explanation": "인스펙션(Inspection, 파간 인스펙션)은 주재자(Moderator), 낭독자, 기록자 등의 역할을 나누어 결함을 공식적으로 기록/측정하는 최고 수준의 정형 검토 기법입니다.",
    "difficulty": "EASY",
    "keywords": [
      "인스펙션",
      "Inspection",
      "공식검토"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-requirements"
  },
  {
    "id": "EXP_SE1_003",
    "subject": "소프트웨어설계",
    "category": "요구사항",
    "type": "SHORT_ANSWER",
    "question": "요구사항 검토 방법 중 2~3명의 동료 개발자가 명세서 작성자와 함께 편안한 분위기에서 명세서를 읽으며 오류를 찾는 검토 기법은 무엇인가?",
    "answer": "동료 검토",
    "explanation": "동료 검토(Peer Review)는 작성자가 동료들에게 작업물을 설명하고 피드백을 받는 비공식 검토 방식입니다.",
    "difficulty": "EASY",
    "keywords": [
      "동료 검토",
      "Peer Review",
      "요구사항검토"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-requirements"
  },
  {
    "id": "EXP_SE1_004",
    "subject": "소프트웨어설계",
    "category": "디자인 패턴",
    "type": "SHORT_ANSWER",
    "question": "GoF 디자인 패턴 중 문법 규칙을 클래스로 표현하여 특정 언어나 표기법으로 작성된 문장을 해석하고 평가하는 행위 패턴은 무엇인가?",
    "answer": "인터프리터",
    "explanation": "인터프리터(Interpreter, 해석자) 패턴은 SQL 파서나 정규식 파서처럼 언어의 문법 정의를 클래스로 캡슐화하여 문장을 구문 분석할 때 쓰입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "인터프리터",
      "Interpreter",
      "GoF행위패턴"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-design-patterns"
  },
  {
    "id": "EXP_SE1_005",
    "subject": "소프트웨어설계",
    "category": "디자인 패턴",
    "type": "SHORT_ANSWER",
    "question": "GoF 디자인 패턴 중 요청을 처리할 수 있는 객체들을 체인(사슬) 형태로 연결해두고 요청을 처리할 때까지 순차적으로 넘기는 행위 패턴은 무엇인가?",
    "answer": "책임 연쇄",
    "explanation": "책임 연쇄(Chain of Responsibility) 패턴은 송신자와 수신자의 결합도를 낮추고 다수의 처리 객체가 요청을 다음 객체로 전달할 수 있게 합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "책임 연쇄",
      "Chain of Responsibility",
      "사슬패턴"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-design-patterns"
  },
  {
    "id": "EXP_SE1_006",
    "subject": "소프트웨어설계",
    "category": "소프트웨어 아키텍처",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 아키텍처 4+1 뷰 중 시스템의 비기능적 요구사항인 동시성, 병렬 처리, 스레드, 성능, 동기화 관점을 표현하는 뷰는 무엇인가?",
    "answer": "프로세스 뷰",
    "explanation": "프로세스 뷰(Process View)는 런타임 시점의 프로세스 흐름, 스레드 제어, 시스템 통합 성능을 다룹니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "프로세스 뷰",
      "Process View",
      "동시성"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-architecture"
  },
  {
    "id": "EXP_SE1_007",
    "subject": "소프트웨어설계",
    "category": "소프트웨어 아키텍처",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 아키텍처 4+1 뷰 중 소스코드의 정적 조직 구조, 컴포넌트, 모듈, 서브시스템의 물리적 구성과 패키징 관점을 다루는 뷰는 무엇인가?",
    "answer": "구현 뷰",
    "explanation": "구현 뷰(Implementation View, 개발 뷰)는 개발자 관점에서 소프트웨어 모듈들의 물리적 구조와 형상을 표현합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "구현 뷰",
      "Implementation View",
      "개발뷰"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-architecture"
  },
  {
    "id": "EXP_SE1_008",
    "subject": "소프트웨어설계",
    "category": "소프트웨어 아키텍처",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 아키텍처 4+1 뷰 중 소프트웨어 컴포넌트가 실제 서버 노드, 하드웨어 장비, 물리적 네트워크에 어떻게 배치되는지 표현하는 뷰는 무엇인가?",
    "answer": "배포 뷰",
    "explanation": "배포 뷰(Deployment View)는 인프라 및 시스템 엔지니어 관점에서 물리적 노드와 네트워크 구성을 표현합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "배포 뷰",
      "Deployment View",
      "하드웨어매핑"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-architecture"
  },
  {
    "id": "EXP_SE1_009",
    "subject": "소프트웨어설계",
    "category": "소프트웨어 아키텍처",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 아키텍처 4+1 뷰에서 나머지 4개의 뷰(논리, 프로세스, 구현, 배포)를 검증하고 통합하는 기준이 되는 중심 뷰는 무엇인가?",
    "answer": "유스케이스 뷰",
    "explanation": "유스케이스 뷰(Use Case View, 시나리오 뷰)는 최종 사용자의 관점에서 시스템의 핵심 요구 기능을 시나리오로 표현하며 나머지 4개 뷰의 중심 축(1)이 됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "유스케이스 뷰",
      "Use Case View",
      "4+1뷰"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-architecture"
  },
  {
    "id": "EXP_SE1_010",
    "subject": "소프트웨어설계",
    "category": "UI 설계",
    "type": "SHORT_ANSWER",
    "question": "UI 설계 4대 원칙 중 사용자가 UI의 기능과 조작법을 초보자라도 별도의 학습 부담 없이 쉽고 빠르게 익힐 수 있어야 한다는 원칙은 무엇인가?",
    "answer": "학습성",
    "explanation": "학습성(Learnability)은 누구나 쉽게 시스템 사용법을 배울 수 있어야 한다는 원칙입니다.",
    "difficulty": "EASY",
    "keywords": [
      "학습성",
      "Learnability",
      "UI원칙"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-ui"
  },
  {
    "id": "EXP_SE1_011",
    "subject": "소프트웨어설계",
    "category": "UI 설계",
    "type": "SHORT_ANSWER",
    "question": "UI 설계 4대 원칙 중 사용자의 다양한 요구사항을 최대한 수용하고 인터랙션 과정의 실수를 쉽게 수정할 수 있어야 한다는 원칙은 무엇인가?",
    "answer": "유연성",
    "explanation": "유연성(Flexibility)은 사용자의 인터랙션 스타일을 유연하게 포용하고 오류 발생 시 손쉽게 되돌릴 수 있어야 한다는 원칙입니다.",
    "difficulty": "EASY",
    "keywords": [
      "유연성",
      "Flexibility",
      "UI원칙"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-ui"
  },
  {
    "id": "EXP_SE1_012",
    "subject": "소프트웨어설계",
    "category": "UML",
    "type": "SHORT_ANSWER",
    "question": "UML 유스케이스 다이어그램에서 한 유스케이스가 정상 동작하기 위해 다른 유스케이스를 조건 없이 반드시 실행해야 하는 관계를 나타내는 스테레오타입은 무엇인가?",
    "answer": "<<include>>",
    "explanation": "포함 관계(<<include>>)는 필수적인 공통 기능을 재사용할 때 쓰입니다. 특정 조건 만족 시에만 선택적으로 확장되는 것은 <<extend>> 입니다.",
    "difficulty": "EASY",
    "keywords": [
      "<<include>>",
      "포함관계",
      "스테레오타입"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-uml"
  },
  {
    "id": "EXP_SE1_013",
    "subject": "소프트웨어설계",
    "category": "UML",
    "type": "SHORT_ANSWER",
    "question": "UML 유스케이스 다이어그램에서 특정 예외 상황이나 확장 조건을 만족할 때만 선택적으로 기본 유스케이스에 기능을 덧붙이는 관계를 나타내는 스테레오타입은 무엇인가?",
    "answer": "<<extend>>",
    "explanation": "확장 관계(<<extend>>)는 부가적이고 선택적인 기능을 분리할 때 사용합니다.",
    "difficulty": "EASY",
    "keywords": [
      "<<extend>>",
      "확장관계",
      "스테레오타입"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-uml"
  },
  {
    "id": "EXP_SE1_014",
    "subject": "소프트웨어설계",
    "category": "UML",
    "type": "SHORT_ANSWER",
    "question": "UML 관계 중 하위 요소가 상위 일반화된 요소의 속성과 연산을 물려받는 상속 관계를 나타내는 관계 유형의 이름은 무엇인가?",
    "answer": "일반화 관계",
    "explanation": "일반화 관계(Generalization)는 객체지향의 상속(is-a) 관계를 뜻하며 속이 빈 삼각형 실선 화살표로 표현합니다.",
    "difficulty": "EASY",
    "keywords": [
      "일반화 관계",
      "Generalization",
      "상속관계"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-uml"
  },
  {
    "id": "EXP_SE1_015",
    "subject": "소프트웨어설계",
    "category": "UML",
    "type": "SHORT_ANSWER",
    "question": "UML 관계 중 한 클래스가 다른 클래스를 메서드의 매개변수나 로컬 변수로 잠시 참조하여 짧은 기간만 영향을 주고받는 관계를 나타내는 유형은 무엇인가?",
    "answer": "의존 관계",
    "explanation": "의존 관계(Dependency)는 한 클래스의 변화가 일시적으로 다른 클래스에 영향을 미치는 관계이며 점선 화살표로 표시합니다.",
    "difficulty": "EASY",
    "keywords": [
      "의존 관계",
      "Dependency",
      "점선화살표"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-uml"
  },
  {
    "id": "EXP_SE1_016",
    "subject": "소프트웨어설계",
    "category": "UML",
    "type": "SHORT_ANSWER",
    "question": "UML 클래스 다이어그램에서 인터페이스에 정의된 추상 메서드를 구체 클래스가 실제로 구현하는 관계를 나타내는 관계 유형의 이름은 무엇인가?",
    "answer": "실체화 관계",
    "explanation": "실체화 관계(Realization)는 인터페이스 구현을 나타내며 속이 빈 삼각형 점선 화살표로 표기합니다.",
    "difficulty": "EASY",
    "keywords": [
      "실체화 관계",
      "Realization",
      "인터페이스구현"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-uml"
  },
  {
    "id": "EXP_SE1_017",
    "subject": "소프트웨어설계",
    "category": "소프트웨어 재공학",
    "type": "SHORT_ANSWER",
    "question": "기존에 작성된 레거시 시스템의 소스코드나 실행 바이너리를 역으로 분석하여 설계 문서, 사양서, 데이터 모델 등을 복원 추출해내는 소프트웨어 재공학 활동은 무엇인가?",
    "answer": "역공학",
    "explanation": "역공학(Reverse Engineering)은 완성된 소프트웨어를 거꾸로 추적하여 상위의 설계서와 요구사항을 도출하는 기법입니다.",
    "difficulty": "EASY",
    "keywords": [
      "역공학",
      "Reverse Engineering",
      "소프트웨어재공학"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-reengineering"
  },
  {
    "id": "EXP_SE1_018",
    "subject": "소프트웨어설계",
    "category": "소프트웨어 재공학",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어의 외적인 동작과 기능은 그대로 유지하면서 내부 구조(소스코드)를 개선하여 가독성과 유지보수성을 향상시키는 재공학 활동은 무엇인가?",
    "answer": "리팩토링",
    "explanation": "리팩토링(Refactoring) 또는 코드 재구성은 결과 동작을 바꾸지 않고 코드 악취(Code Smell)를 제거하는 내부 구조 개선 활동입니다.",
    "difficulty": "EASY",
    "keywords": [
      "리팩토링",
      "Refactoring",
      "코드개선"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-reengineering"
  },
  {
    "id": "EXP_SE1_019",
    "subject": "소프트웨어설계",
    "category": "소프트웨어 재공학",
    "type": "SHORT_ANSWER",
    "question": "기존 소프트웨어 시스템을 완전히 새로운 운영체제, 하드웨어 플랫폼, 데이터베이스 환경으로 옮겨 설치하고 실행할 수 있도록 변환하는 재공학 활동은 무엇인가?",
    "answer": "이관",
    "explanation": "이관(Migration)은 소프트웨어의 본래 가치를 유지하면서 새 플랫폼 환경으로 옮기는 활동입니다.",
    "difficulty": "EASY",
    "keywords": [
      "이관",
      "Migration",
      "플랫폼이전"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-reengineering"
  },
  {
    "id": "EXP_SE1_021",
    "subject": "소프트웨어설계",
    "category": "애자일",
    "type": "SHORT_ANSWER",
    "question": "스크럼(Scrum)에서 스프린트 기간 동안 매일 서서 짧게(15분 내외) 어제 한 일, 오늘 할 일, 문제점을 공유하는 일일 회의의 명칭은 무엇인가?",
    "answer": "데일리 스크럼",
    "explanation": "데일리 스크럼(Daily Scrum, 일일 스탠드업 미팅)은 팀원 간의 진행 상황을 빠르게 동기화하고 장애물을 조기 식별합니다.",
    "difficulty": "EASY",
    "keywords": [
      "데일리 스크럼",
      "Daily Scrum",
      "스탠드업미팅"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-agile"
  },
  {
    "id": "EXP_SE1_022",
    "subject": "소프트웨어설계",
    "category": "애자일",
    "type": "SHORT_ANSWER",
    "question": "애자일 프로젝트에서 시간의 흐름에 따라 남아있는 작업량(남은 스토리 포인트나 시간)이 줄어드는 추세를 시각적으로 추적하는 차트의 명칭은 무엇인가?",
    "answer": "번다운 차트",
    "explanation": "번다운 차트(Burn-down Chart)는 계획된 작업 대비 실제 소진 속도를 비교하여 스프린트 완료 가능성을 예측합니다.",
    "difficulty": "EASY",
    "keywords": [
      "번다운 차트",
      "Burn-down Chart",
      "애자일차트"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-agile"
  },
  {
    "id": "EXP_SE1_023",
    "subject": "소프트웨어설계",
    "category": "애자일",
    "type": "SHORT_ANSWER",
    "question": "스크럼에서 하나의 스프린트가 완료되었을 때 팀이 모여 프로세스상의 좋았던 점과 개선할 점을 솔직하게 되돌아보고 다음 스프린트에 반영하는 회의는 무엇인가?",
    "answer": "스프린트 회고",
    "explanation": "스프린트 회고(Sprint Retrospective)는 팀의 지속적인 성장과 프로세스 개선을 위한 정기 피드백 미팅입니다.",
    "difficulty": "EASY",
    "keywords": [
      "스프린트 회고",
      "Retrospective",
      "회고회의"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-agile"
  },
  {
    "id": "EXP_SE1_024",
    "subject": "소프트웨어설계",
    "category": "UI 설계",
    "type": "SHORT_ANSWER",
    "question": "UI 설계 도구 중 기획 초기 단계에 레이아웃, 버튼 위치 등 화면의 골격을 흑백 선과 상자로 단순하게 스케치하는 정적 산출물은 무엇인가?",
    "answer": "와이어프레임",
    "explanation": "와이어프레임(Wireframe)은 UI의 뼈대 구조를 잡는 초기 설계도입니다. 색상과 실제 디자인이 들어간 완성형 정적 화면은 목업(Mockup)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "와이어프레임",
      "Wireframe",
      "UI골격"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-ui"
  },
  {
    "id": "EXP_SE1_025",
    "subject": "소프트웨어설계",
    "category": "UI 설계",
    "type": "SHORT_ANSWER",
    "question": "와이어프레임에 실제 색상, 폰트, 그래픽 비주얼 디자인을 적용하여 최종 화면과 거의 유사하지만 클릭 인터랙션은 없는 정적 모형은 무엇인가?",
    "answer": "목업",
    "explanation": "목업(Mockup)은 비주얼 디자인이 완성된 정적 화면입니다. 실제 클릭하고 동작할 수 있게 만든 동적 모형은 프로토타입입니다.",
    "difficulty": "EASY",
    "keywords": [
      "목업",
      "Mockup",
      "UI설계"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-ui"
  },
  {
    "id": "EXP_SE1_026",
    "subject": "소프트웨어설계",
    "category": "요구사항",
    "type": "SHORT_ANSWER",
    "question": "요구사항 개발 프로세스 4단계는 도출(Elicitation) → (   ) → 명세(Specification) → 확인(Validation) 순서이다. 괄호에 들어갈 단계는 무엇인가?",
    "answer": "분석",
    "explanation": "요구사항 개발 4단계는 \"도출 → 분석(Analysis) → 명세 → 확인\"입니다. 분석 단계에서는 타당성 검토와 모델링이 이루어집니다.",
    "difficulty": "EASY",
    "keywords": [
      "분석",
      "요구사항분석",
      "요구사항개발프로세스"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-requirements"
  },
  {
    "id": "EXP_SE1_027",
    "subject": "소프트웨어설계",
    "category": "요구사항",
    "type": "SHORT_ANSWER",
    "question": "요구사항의 종류 중 시스템의 응답 속도, 처리량, 보안성, 가용성, 신뢰성 등 품질적 속성이나 제약 조건을 기술하는 요구사항은 무엇인가?",
    "answer": "비기능적 요구사항",
    "explanation": "비기능적 요구사항(Non-functional Requirements)은 시스템이 제공해야 할 성능, 보안, 제약조건 등을 정의합니다. 실제 제공할 기능을 명시하는 것은 기능적 요구사항입니다.",
    "difficulty": "EASY",
    "keywords": [
      "비기능적 요구사항",
      "Non-functional",
      "품질속성"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-requirements"
  },
  {
    "id": "EXP_SE1_028",
    "subject": "소프트웨어설계",
    "category": "객체지향 설계",
    "type": "SHORT_ANSWER",
    "question": "SOLID 원칙 중 객체는 자신이 사용하지 않는 메서드에 의존하지 않아야 하므로 거대한 인터페이스보다 명확한 다수의 작은 인터페이스로 분리하라는 원칙은 무엇인가?",
    "answer": "인터페이스 분리 원칙",
    "explanation": "인터페이스 분리 원칙(ISP, Interface Segregation Principle)은 클라이언트에 특화된 세분화된 인터페이스를 지향합니다.",
    "difficulty": "EASY",
    "keywords": [
      "인터페이스 분리 원칙",
      "ISP",
      "SOLID"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-solid"
  },
  {
    "id": "EXP_SE1_029",
    "subject": "소프트웨어설계",
    "category": "객체지향 설계",
    "type": "SHORT_ANSWER",
    "question": "SOLID 원칙 중 상위 모듈은 하위 모듈의 구체 클래스에 직접 의존하면 안 되며, 양쪽 모두 추상화(인터페이스)에 의존해야 한다는 원칙은 무엇인가?",
    "answer": "의존 역전 원칙",
    "explanation": "의존 역전 원칙(DIP, Dependency Inversion Principle)은 변하기 쉬운 구체 클래스 대신 변하기 어려운 추상 클래스나 인터페이스에 의존하게 합니다.",
    "difficulty": "EASY",
    "keywords": [
      "의존 역전 원칙",
      "DIP",
      "추상화의존"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-solid"
  },
  {
    "id": "EXP_SE1_030",
    "subject": "소프트웨어설계",
    "category": "객체지향 설계",
    "type": "SHORT_ANSWER",
    "question": "SOLID 원칙 중 하위 클래스는 상위 클래스의 인스턴스를 대신하여 프로그램의 정확성을 해치지 않고 어디서든 교체될 수 있어야 한다는 원칙은 무엇인가?",
    "answer": "리스코프 치환 원칙",
    "explanation": "리스코프 치환 원칙(LSP, Liskov Substitution Principle)은 올바른 상속 구조를 설계하여 다형성을 보장하는 규칙입니다.",
    "difficulty": "EASY",
    "keywords": [
      "리스코프 치환 원칙",
      "LSP",
      "하위클래스대체"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-solid"
  },
  {
    "id": "EXP_SE1_031",
    "subject": "소프트웨어설계",
    "category": "객체지향 설계",
    "type": "SHORT_ANSWER",
    "question": "새로운 결제 수단이나 인증 방식을 추가할 때 기존 처리 엔진 코드를 직접 수정하지 않고 다형성을 통해 기능을 유연하게 확장할 수 있도록 하는 SOLID 객체지향 설계 원칙은 무엇인가?",
    "answer": "개방 폐쇄 원칙",
    "explanation": "개방 폐쇄 원칙(OCP, Open-Closed Principle)은 기존 코드를 손대지 않고 새로운 기능을 추가할 수 있도록 인터페이스를 활용하는 원칙입니다.",
    "difficulty": "EASY",
    "keywords": [
      "개방 폐쇄 원칙",
      "OCP",
      "기능확장"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-solid"
  },
  {
    "id": "EXP_SE1_032",
    "subject": "소프트웨어설계",
    "category": "객체지향 설계",
    "type": "SHORT_ANSWER",
    "question": "한 클래스가 사용자 인터페이스 출력과 데이터베이스 트랜잭션 저장을 동시에 처리하여 변경 요인이 다수 발생하는 결함을 막기 위해 적용하는 SOLID 설계 원칙은 무엇인가?",
    "answer": "단일 책임 원칙",
    "explanation": "단일 책임 원칙(SRP, Single Responsibility Principle)은 높은 응집도와 낮은 결합도를 유지하기 위한 객체지향의 기본 설계 원칙입니다.",
    "difficulty": "EASY",
    "keywords": [
      "단일 책임 원칙",
      "SRP",
      "단일책임"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-solid"
  },
  {
    "id": "EXP_SE1_035",
    "subject": "소프트웨어설계",
    "category": "모듈화",
    "type": "SHORT_ANSWER",
    "question": "파일을 읽어 파싱한 결과 데이터셋이 다음 암호화 모듈의 입력 파라미터로 직접 연결되어 순차 처리되는 형태의 모듈 응집도 단계는 무엇인가?",
    "answer": "순차적 응집도",
    "explanation": "순차적 응집도(Sequential Cohesion)는 이전 활동의 출력이 다음 활동의 입력으로 파이프라인처럼 연결되는 응집도입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "순차적 응집도",
      "Sequential Cohesion",
      "파이프라인"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-cohesion"
  },
  {
    "id": "EXP_SE1_037",
    "subject": "소프트웨어설계",
    "category": "모듈화",
    "type": "SHORT_ANSWER",
    "question": "모듈 간에 주고받는 인터페이스가 단순한 파라미터(인자) 값으로만 구성되어 결합도가 가장 낮고 가장 좋은 단계는 무엇인가?",
    "answer": "자료 결합도",
    "explanation": "자료 결합도(Data Coupling)는 모듈 간 오직 필요한 단순 데이터만 값으로 전달하여 독립성이 가장 높습니다.",
    "difficulty": "EASY",
    "keywords": [
      "자료 결합도",
      "Data Coupling",
      "최저결합도"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-coupling"
  },
  {
    "id": "EXP_SE1_040",
    "subject": "소프트웨어설계",
    "category": "모듈화",
    "type": "SHORT_ANSWER",
    "question": "두 모듈 간에 레코드나 구조체 같은 복합 자료구조 전체가 인자로 전달될 때, 호출받은 모듈이 그중 일부 필드만 사용하더라도 성립하는 결합도 단계는 무엇인가?",
    "answer": "스탬프 결합도",
    "explanation": "스탬프 결합도(Stamp Coupling)는 전체 데이터 구조를 통째로 전달할 때 발생합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "스탬프 결합도",
      "Stamp Coupling",
      "자료구조전달"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-coupling"
  },
  {
    "id": "EXP_SE1_041",
    "subject": "소프트웨어설계",
    "category": "모듈화",
    "type": "SHORT_ANSWER",
    "question": "한 모듈이 다른 모듈에게 무엇을 어떻게 실행할지 결정하는 제어 신호(Control Flag, 제어 파라미터)를 넘겨 흐름을 제어하는 결합도 단계는 무엇인가?",
    "answer": "제어 결합도",
    "explanation": "제어 결합도(Control Coupling)는 상위 모듈이 하위 모듈의 세부 내부 로직을 지시할 때 발생합니다.",
    "difficulty": "EASY",
    "keywords": [
      "제어 결합도",
      "Control Coupling",
      "제어플래그"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-coupling"
  },
  {
    "id": "EXP_SE1_042",
    "subject": "소프트웨어설계",
    "category": "소프트웨어 아키텍처",
    "type": "SHORT_ANSWER",
    "question": "아키텍처 패턴 중 비동기 메시지 기반으로 복잡한 문제 해결을 위해 공유 메모리 공간에 전문 지식을 가진 에이전트들이 정보를 기록하고 소통하는 패턴은 무엇인가?",
    "answer": "블랙보드 패턴",
    "explanation": "블랙보드 패턴(Blackboard Pattern)은 음성 인식, 신호 처리 등 결정적 해결 알고리즘이 없는 영역에서 전문가 모듈들이 공유 칠판(블랙보드)을 통해 협력합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "블랙보드 패턴",
      "Blackboard",
      "공유메모리"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-architecture"
  },
  {
    "id": "EXP_SE1_043",
    "subject": "소프트웨어설계",
    "category": "소프트웨어 아키텍처",
    "type": "SHORT_ANSWER",
    "question": "분산 시스템에서 컴포넌트 간의 원격 서비스 요청과 통신을 중개(브로커)하여 분산 객체 환경의 투명성을 제공하는 아키텍처 패턴은 무엇인가?",
    "answer": "브로커 패턴",
    "explanation": "브로커 패턴(Broker Pattern)은 클라이언트와 서버 사이에서 원격 통신 요청을 전달하고 바인딩을 조정하는 중개자 패턴(대표 예: CORBA)입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "브로커 패턴",
      "Broker Pattern",
      "분산객체중개"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-architecture"
  },
  {
    "id": "EXP_SE1_044",
    "subject": "소프트웨어설계",
    "category": "UML",
    "type": "SHORT_ANSWER",
    "question": "UML 다이어그램 중 시간 경과에 따른 객체 간의 메시지 송수신 순서를 생명선(Lifeline)과 활성 막대를 이용해 수직 시간축으로 표현하는 다이어그램은 무엇인가?",
    "answer": "시퀀스 다이어그램",
    "explanation": "시퀀스 다이어그램(Sequence Diagram)은 동적 상호작용을 시간 순서에 따라 시각화합니다.",
    "difficulty": "EASY",
    "keywords": [
      "시퀀스 다이어그램",
      "Sequence Diagram",
      "생명선"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-uml"
  },
  {
    "id": "EXP_SE1_045",
    "subject": "소프트웨어설계",
    "category": "UML",
    "type": "SHORT_ANSWER",
    "question": "UML 다이어그램 중 하나의 객체가 특정 외부 이벤트나 자극을 받아 상태가 어떻게 바뀌는지 상태 전이와 진입/탈출 동작을 표현하는 다이어그램은 무엇인가?",
    "answer": "상태 다이어그램",
    "explanation": "상태 다이어그램(State Diagram)은 객체의 전체 생명주기 동안의 상태 변화를 모델링합니다.",
    "difficulty": "EASY",
    "keywords": [
      "상태 다이어그램",
      "State Diagram",
      "상태전이"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-uml"
  },
  {
    "id": "EXP_SE1_046",
    "subject": "소프트웨어설계",
    "category": "UML",
    "type": "SHORT_ANSWER",
    "question": "UML 다이어그램 중 시스템이 수행하는 처리 과정의 로직 흐름이나 비즈니스 프로세스 워크플로우를 처리 상자와 분기 기호로 도식화한 다이어그램은 무엇인가?",
    "answer": "활동 다이어그램",
    "explanation": "활동 다이어그램(Activity Diagram)은 순서도(Flowchart)를 객체지향적으로 확장한 동적 모델링 도구입니다.",
    "difficulty": "EASY",
    "keywords": [
      "활동 다이어그램",
      "Activity Diagram",
      "워크플로우"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-uml"
  },
  {
    "id": "EXP_SE1_047",
    "subject": "소프트웨어설계",
    "category": "UML",
    "type": "SHORT_ANSWER",
    "question": "UML 클래스 관계 중 전체(Whole)와 부분(Part)의 관계이지만, 전체 객체가 소멸하더라도 부분 객체는 독립적으로 생존할 수 있는 약한 결합의 집약 관계 기호는 무엇인가?",
    "answer": "속이 빈 다이아몬드",
    "explanation": "집약 관계(Aggregation)는 속이 빈 마름모(다이아몬드)로 표기하며 독립 생존이 가능합니다. 전체와 수명을 함께하는 합성 관계는 속이 찬 마름모입니다.",
    "difficulty": "EASY",
    "keywords": [
      "속이 빈 다이아몬드",
      "집약관계",
      "마름모기호"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-uml"
  },
  {
    "id": "EXP_SE1_048",
    "subject": "소프트웨어설계",
    "category": "UML",
    "type": "SHORT_ANSWER",
    "question": "UML 클래스 관계 중 전체 객체가 소멸하면 부분 객체도 메모리에서 함께 소멸하는 강한 결합을 갖는 합성 관계 기호는 무엇인가?",
    "answer": "속이 찬 다이아몬드",
    "explanation": "합성 관계(Composition)는 강한 라이프사이클 종속성을 가지며 속이 찬 검은 마름모로 표현합니다.",
    "difficulty": "EASY",
    "keywords": [
      "속이 찬 다이아몬드",
      "합성관계",
      "검은마름모"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-uml"
  },
  {
    "id": "EXP_SE1_049",
    "subject": "소프트웨어설계",
    "category": "객체지향 설계",
    "type": "SHORT_ANSWER",
    "question": "객체지향 기법에서 객체의 상세한 내부 데이터와 구현 로직을 외부로부터 숨기고, 오직 공개된 메서드 인터페이스를 통해서만 상호작용하도록 보호하는 특성은 무엇인가?",
    "answer": "캡슐화",
    "explanation": "캡슐화(Encapsulation)는 데이터 보호(정보 은닉)와 높은 응집도를 실현하는 핵심 특성입니다.",
    "difficulty": "EASY",
    "keywords": [
      "캡슐화",
      "Encapsulation",
      "정보은닉"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-oop"
  },
  {
    "id": "EXP_SE1_050",
    "subject": "소프트웨어설계",
    "category": "객체지향 설계",
    "type": "SHORT_ANSWER",
    "question": "객체지향 기법에서 동일한 이름의 연산(메서드)이 서로 다른 클래스의 객체에서 각자의 방식에 맞게 서로 다르게 동작할 수 있는 능력을 무엇이라 하는가?",
    "answer": "다형성",
    "explanation": "다형성(Polymorphism)은 오버로딩과 오버라이딩을 통해 실현되며, 코드의 유연성과 재사용성을 극대화합니다.",
    "difficulty": "EASY",
    "keywords": [
      "다형성",
      "Polymorphism",
      "객체지향특성"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-oop"
  },
  {
    "id": "EXP_SE2_001",
    "subject": "소프트웨어설계",
    "category": "시스템 연계",
    "type": "SHORT_ANSWER",
    "question": "EAI(엔터프라이즈 애플리케이션 통합) 구축 유형 중 단일 접점인 중앙 허브를 통해 시스템들을 통합하여 유지보수는 용이하지만 허브 장애 시 전체가 마비될 수 있는 중앙 집중형 토폴로지는 무엇인가?",
    "answer": "허브 앤 스포크",
    "explanation": "허브 앤 스포크(Hub & Spoke)는 중앙 허브가 모든 통신을 중개하므로 확장성이 좋지만 중앙 허브가 단일 실패 지점(SPOF)이 될 수 있습니다.",
    "difficulty": "EASY",
    "keywords": [
      "허브 앤 스포크",
      "Hub & Spoke",
      "EAI"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-eai"
  },
  {
    "id": "EXP_SE2_002",
    "subject": "소프트웨어설계",
    "category": "시스템 연계",
    "type": "SHORT_ANSWER",
    "question": "EAI 구축 유형 중 애플리케이션 사이에 미들웨어 통신 버스를 두고 데이터 교환을 수행하여 뛰어난 확장성과 대용량 처리가 가능한 토폴로지는 무엇인가?",
    "answer": "메시지 버스",
    "explanation": "메시지 버스(Message Bus)는 공통 버스 파이프라인을 통해 각 애플리케이션 어댑터가 통신하며 ESB(Enterprise Service Bus)의 기반이 됩니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "메시지 버스",
      "Message Bus",
      "EAI"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-eai"
  },
  {
    "id": "EXP_SE2_003",
    "subject": "소프트웨어설계",
    "category": "시스템 연계",
    "type": "SHORT_ANSWER",
    "question": "웹 서비스(Web Services) 3대 표준 기술 중 웹 서비스의 위치, 제공하는 메서드, 매개변수 등을 XML 형식으로 기술한 서비스 기술 언어의 약칭은 무엇인가?",
    "answer": "WSDL",
    "explanation": "WSDL(Web Services Description Language)은 웹 서비스의 상세 사양을 XML로 명세합니다. 메시지 전송 규약은 SOAP, 등록/검색소는 UDDI입니다.",
    "difficulty": "EASY",
    "keywords": [
      "WSDL",
      "Web Services Description Language",
      "웹서비스"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-webservice"
  },
  {
    "id": "EXP_SE2_004",
    "subject": "소프트웨어설계",
    "category": "시스템 연계",
    "type": "SHORT_ANSWER",
    "question": "웹 서비스 3대 표준 기술 중 HTTP, HTTPS 등의 전송 프로토콜을 통해 XML 기반의 메시지를 분산 환경에서 교환하기 위한 경량 통신 프로토콜의 약칭은 무엇인가?",
    "answer": "SOAP",
    "explanation": "SOAP(Simple Object Access Protocol)은 XML 기반 메시지 봉투(Envelope, Header, Body) 구조를 사용하여 원격 객체를 호출합니다.",
    "difficulty": "EASY",
    "keywords": [
      "SOAP",
      "Simple Object Access Protocol",
      "웹서비스"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-webservice"
  },
  {
    "id": "EXP_SE2_005",
    "subject": "소프트웨어설계",
    "category": "시스템 연계",
    "type": "SHORT_ANSWER",
    "question": "웹 서비스 3대 표준 기술 중 전 세계의 비즈니스와 제공되는 웹 서비스 목록을 공개 등록하고 검색할 수 있는 XML 기반의 비즈니스 레지스트리(저장소) 규격의 약칭은 무엇인가?",
    "answer": "UDDI",
    "explanation": "UDDI(Universal Description, Discovery and Integration)는 웹 서비스의 전화번호부 역할을 하는 표준 등록 저장소입니다.",
    "difficulty": "EASY",
    "keywords": [
      "UDDI",
      "Universal Description Discovery and Integration",
      "웹서비스"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-webservice"
  },
  {
    "id": "EXP_SE2_006",
    "subject": "소프트웨어설계",
    "category": "시스템 연계",
    "type": "SHORT_ANSWER",
    "question": "REST 아키텍처 원칙 중 서버가 클라이언트의 이전 요청 상태(세션 등)를 보관하지 않고, 각 요청을 독립적으로 처리해야 한다는 원칙은 무엇인가?",
    "answer": "무상태성",
    "explanation": "무상태성(Statelessness)은 서버가 클라이언트 컨텍스트를 저장하지 않음으로써 서버의 수평 확장성(Scale-out)을 극대화합니다.",
    "difficulty": "EASY",
    "keywords": [
      "무상태성",
      "Stateless",
      "REST원칙"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-rest"
  },
  {
    "id": "EXP_SE2_007",
    "subject": "소프트웨어설계",
    "category": "시스템 연계",
    "type": "SHORT_ANSWER",
    "question": "RESTful API에서 리소스의 고유 식별자로 사용하는 URI와 함께, 리소스의 조회(Read) 작업을 요청할 때 사용하는 HTTP 표준 메서드는 무엇인가?",
    "answer": "GET",
    "explanation": "GET은 리소스 조회 메서드로 멱등성(Idempotency)과 안전성을 가집니다. 생성을 요청할 때는 POST를 씁니다.",
    "difficulty": "EASY",
    "keywords": [
      "GET",
      "HTTP메서드",
      "RESTful"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-rest"
  },
  {
    "id": "EXP_SE2_008",
    "subject": "소프트웨어설계",
    "category": "시스템 연계",
    "type": "SHORT_ANSWER",
    "question": "RESTful API에서 기존 리소스의 전체 내용을 새로운 데이터로 교체(치환)하여 갱신할 때 사용하는 멱등성을 가진 HTTP 메서드는 무엇인가?",
    "answer": "PUT",
    "explanation": "PUT은 전체 리소스 교체 갱신 메서드이며 멱등성을 만족합니다. 리소스의 일부 속성만 부분 수정할 때는 PATCH를 사용합니다.",
    "difficulty": "EASY",
    "keywords": [
      "PUT",
      "HTTP메서드",
      "리소스갱신"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-rest"
  },
  {
    "id": "EXP_SE2_009",
    "subject": "소프트웨어설계",
    "category": "시스템 연계",
    "type": "SHORT_ANSWER",
    "question": "RESTful API에서 기존 리소스의 특정 필드나 일부 속성만을 선택적으로 수정할 때 사용하는 HTTP 메서드는 무엇인가?",
    "answer": "PATCH",
    "explanation": "PATCH는 리소스의 부분 변경(Partial Modification)을 수행하는 HTTP 메서드입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "PATCH",
      "HTTP메서드",
      "부분수정"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-rest"
  },
  {
    "id": "EXP_SE2_010",
    "subject": "소프트웨어설계",
    "category": "시스템 연계",
    "type": "SHORT_ANSWER",
    "question": "속성과 값의 쌍(Key-Value)으로 데이터를 표현하며 XML보다 용량이 작고 웹과 모바일 환경에서 널리 쓰이는 경량 데이터 교환 포맷의 약칭은 무엇인가?",
    "answer": "JSON",
    "explanation": "JSON(JavaScript Object Notation)은 인간이 읽기 쉽고 파싱 속도가 빠른 표준 텍스트 데이터 교환 형식입니다.",
    "difficulty": "EASY",
    "keywords": [
      "JSON",
      "JavaScript Object Notation",
      "데이터교환"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-dataformat"
  },
  {
    "id": "EXP_SE2_011",
    "subject": "소프트웨어설계",
    "category": "미들웨어",
    "type": "SHORT_ANSWER",
    "question": "미들웨어 종류 중 분산 환경에서 송수신자 간에 큐(Queue) 방식의 비동기 메시지 전달을 지원하는 메시지 지향 미들웨어의 약칭은 무엇인가?",
    "answer": "MOM",
    "explanation": "MOM(Message-Oriented Middleware)은 비동기 큐잉을 통해 분산 시스템 간의 결합도를 낮추고 신뢰성 있는 메시지 전달을 보장합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "MOM",
      "Message-Oriented Middleware",
      "비동기큐"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-middleware"
  },
  {
    "id": "EXP_SE2_012",
    "subject": "소프트웨어설계",
    "category": "미들웨어",
    "type": "SHORT_ANSWER",
    "question": "미들웨어 종류 중 은행 결제나 항공 예약처럼 대규모 트랜잭션의 원자성과 무결성을 보장하고 부하 분산을 제어하는 트랜잭션 처리 모니터의 약칭은 무엇인가?",
    "answer": "TP-Monitor",
    "explanation": "TP-Monitor(Transaction Processing Monitor)는 대규모 분산 트랜잭션을 감시하고 ACID 속성을 엄격히 보장합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "TP-Monitor",
      "트랜잭션모니터",
      "미들웨어"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-middleware"
  },
  {
    "id": "EXP_SE2_013",
    "subject": "소프트웨어설계",
    "category": "미들웨어",
    "type": "SHORT_ANSWER",
    "question": "미들웨어 종류 중 원격 네트워크 상의 컴퓨터에 위치한 프로시저나 함수를 로컬 컴퓨터의 함수처럼 원격 호출할 수 있게 해주는 기술의 약칭은 무엇인가?",
    "answer": "RPC",
    "explanation": "RPC(Remote Procedure Call, 원격 프로시저 호출)는 네트워크 세부 프로토콜을 숨기고 원격 함수를 손쉽게 호출하게 합니다.",
    "difficulty": "EASY",
    "keywords": [
      "RPC",
      "Remote Procedure Call",
      "원격함수호출"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-middleware"
  },
  {
    "id": "EXP_SE2_014",
    "subject": "소프트웨어설계",
    "category": "미들웨어",
    "type": "SHORT_ANSWER",
    "question": "클라이언트의 요청을 받아 동적인 비즈니스 로직을 처리하고 데이터베이스와의 연동을 전담하는 서버 측 소프트웨어 인프라(예: 톰캣, 웹로직 등)의 약칭은 무엇인가?",
    "answer": "WAS",
    "explanation": "WAS(Web Application Server)는 정적 페이지만을 제공하는 일반 웹 서버(Apache 등)와 달리 비즈니스 로직과 서블릿 컨테이너를 구동합니다.",
    "difficulty": "EASY",
    "keywords": [
      "WAS",
      "Web Application Server",
      "웹애플리케이션서버"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-middleware"
  },
  {
    "id": "EXP_SE2_015",
    "subject": "소프트웨어설계",
    "category": "비용 산정",
    "type": "SHORT_ANSWER",
    "question": "보헴(Boehm)이 제안한 COCOMO 모형의 소프트웨어 개발 유형 중 기관 내부 업무용 소프트웨어로 규모가 5만 라인(50 KDSI) 이하인 소규모 프로젝트 유형은 무엇인가?",
    "answer": "조직형",
    "explanation": "조직형(Organic Mode)은 경험 많은 팀이 친숙한 환경에서 개발하는 5만 라인 이하의 소규모 개발 유형입니다.",
    "difficulty": "EASY",
    "keywords": [
      "조직형",
      "Organic Mode",
      "COCOMO"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-cost"
  },
  {
    "id": "EXP_SE2_016",
    "subject": "소프트웨어설계",
    "category": "비용 산정",
    "type": "SHORT_ANSWER",
    "question": "COCOMO 모형의 소프트웨어 개발 유형 중 트랜잭션 처리 시스템이나 OS처럼 30만 라인(300 KDSI) 이하의 중간 규모 개발 유형은 무엇인가?",
    "answer": "반분리형",
    "explanation": "반분리형(Semi-detached Mode)은 중간 수준의 규모와 복잡도를 가진 프로젝트 유형입니다.",
    "difficulty": "EASY",
    "keywords": [
      "반분리형",
      "Semi-detached Mode",
      "COCOMO"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-cost"
  },
  {
    "id": "EXP_SE2_017",
    "subject": "소프트웨어설계",
    "category": "비용 산정",
    "type": "SHORT_ANSWER",
    "question": "COCOMO 모형의 소프트웨어 개발 유형 중 항공기 제어, 원자력 시스템처럼 엄격한 하드웨어 제약 조건과 30만 라인 이상의 대규모 시스템 개발 유형은 무엇인가?",
    "answer": "내장형",
    "explanation": "내장형(Embedded Mode)은 극도의 신뢰성과 하드웨어 종속성을 요구하는 초대형 임베디드 프로젝트 유형입니다.",
    "difficulty": "EASY",
    "keywords": [
      "내장형",
      "Embedded Mode",
      "COCOMO"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-cost"
  },
  {
    "id": "EXP_SE2_018",
    "subject": "소프트웨어설계",
    "category": "비용 산정",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 생명주기 전 과정에서 소요되는 인력의 노력 분포를 레일리-노든(Rayleigh-Norden) 곡선에 기초하여 예측하는 비용 산정 모형은 무엇인가?",
    "answer": "Putnam 모형",
    "explanation": "푸트남(Putnam) 모형은 시간에 따른 인력 소요 곡선(Rayleigh-Norden)을 기초로 하며 대표 자동화 추정 도구로 SLIM이 있습니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "Putnam 모형",
      "푸트남모형",
      "레일리노든곡선"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-cost"
  },
  {
    "id": "EXP_SE2_019",
    "subject": "소프트웨어설계",
    "category": "비용 산정",
    "type": "SHORT_ANSWER",
    "question": "알브레히트(Albrecht)가 제안한 기능점수(FP) 기법에서 시스템 내부에서 유지 관리되는 사용자 식별 가능한 논리적 데이터 그룹을 가리키는 측정 요소의 약칭은 무엇인가?",
    "answer": "ILF",
    "explanation": "ILF(Internal Logical File, 내부 논리 파일)는 애플리케이션 경계 내부에서 관리되는 데이터 그룹입니다. 타 시스템에서 참조만 하는 것은 EIF(External Interface File)입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "ILF",
      "Internal Logical File",
      "내부논리파일"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-cost"
  },
  {
    "id": "EXP_SE2_020",
    "subject": "소프트웨어설계",
    "category": "비용 산정",
    "type": "SHORT_ANSWER",
    "question": "기능점수(FP) 기법에서 타 시스템에서 관리되지만 본 시스템이 참조(읽기) 목적으로 사용하는 외부 논리 파일 그룹의 약칭은 무엇인가?",
    "answer": "EIF",
    "explanation": "EIF(External Interface File, 외부 연계 파일)는 타 애플리케이션의 데이터를 인터페이스로 참조할 때 측정합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "EIF",
      "External Interface File",
      "외부연계파일"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-cost"
  },
  {
    "id": "EXP_SE2_021",
    "subject": "소프트웨어설계",
    "category": "비용 산정",
    "type": "SHORT_ANSWER",
    "question": "기능점수(FP) 트랜잭션 기능 중 외부에서 들어온 데이터나 제어 정보를 처리하여 내부 논리 파일(ILF)을 등록, 수정, 삭제하는 기능 요소의 약칭은 무엇인가?",
    "answer": "EI",
    "explanation": "EI(External Input, 외부 입력)는 사용자나 타 시스템이 데이터를 입력하여 시스템 내부 상태를 갱신하는 기능입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "EI",
      "External Input",
      "외부입력"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-cost"
  },
  {
    "id": "EXP_SE2_022",
    "subject": "소프트웨어설계",
    "category": "비용 산정",
    "type": "SHORT_ANSWER",
    "question": "기능점수(FP) 트랜잭션 기능 중 단순히 데이터를 검색하여 화면에 표시하되 계산이나 수학적 공식 가공 없이 그대로 조회하는 기능의 약칭은 무엇인가?",
    "answer": "EQ",
    "explanation": "EQ(External InQuiry, 외부 조회)는 계산 로직 없이 데이터를 찾아 반환합니다. 계산 로직이나 통계 파생 데이터가 포함되면 EO(External Output)입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "EQ",
      "External Inquiry",
      "외부조회"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-cost"
  },
  {
    "id": "EXP_SE2_023",
    "subject": "소프트웨어설계",
    "category": "비용 산정",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 개발 프로젝트에서 총 30,000 라인의 코드를 개발하려 할 때, 개발자 1명의 월간 생산성이 1,000 라인이라면 필요한 노력 인월(Man-Month) 수는 얼마인가?",
    "answer": "30",
    "explanation": "Man-Month = 총 라인수(30,000) / 1인당 월 생산성(1,000) = 30 인월(M/M)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "30",
      "Man-Month",
      "비용산정계산"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-cost"
  },
  {
    "id": "EXP_SE2_024",
    "subject": "소프트웨어설계",
    "category": "비용 산정",
    "type": "SHORT_ANSWER",
    "question": "총 개발 노력이 50 Man-Month로 추정된 프로젝트에 5명의 개발자를 전담 투입한다면 프로젝트 소요 기간(개월)은 얼마인가?",
    "answer": "10",
    "explanation": "개발 기간 = 총 노력(50 M/M) / 투입 인원(5명) = 10개월입니다.",
    "difficulty": "EASY",
    "keywords": [
      "10",
      "개발기간",
      "Man-Month"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-cost"
  },
  {
    "id": "EXP_SE2_025",
    "subject": "소프트웨어설계",
    "category": "일정 관리",
    "type": "SHORT_ANSWER",
    "question": "네트워크 기반 일정 관리 기법 중 프로젝트의 시작부터 종료까지의 모든 작업 경로 중 가장 긴 소요 시간이 걸리는 경로를 가리키는 용어는 무엇인가?",
    "answer": "임계 경로",
    "explanation": "임계 경로(Critical Path, 임계선)는 총 여유 시간(Float)이 0인 핵심 작업들의 경로로, 이 경로상의 작업이 하루라도 지연되면 전체 프로젝트 완료 일정이 지연됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "임계 경로",
      "Critical Path",
      "CPM"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-schedule"
  },
  {
    "id": "EXP_SE2_026",
    "subject": "소프트웨어설계",
    "category": "일정 관리",
    "type": "SHORT_ANSWER",
    "question": "프로젝트 일정 계획 수립 도구 중 각 작업들의 시작일과 완료일을 수평 막대 그래프 형태로 표현하여 작업의 진행 상황을 한눈에 파악할 수 있는 차트는 무엇인가?",
    "answer": "간트 차트",
    "explanation": "간트 차트(Gantt Chart, 바 차트)는 시간 축에 따른 작업들의 일정과 진척도를 막대 형태로 시각화합니다.",
    "difficulty": "EASY",
    "keywords": [
      "간트 차트",
      "Gantt Chart",
      "일정관리차트"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-schedule"
  },
  {
    "id": "EXP_SE2_027",
    "subject": "소프트웨어설계",
    "category": "일정 관리",
    "type": "SHORT_ANSWER",
    "question": "PERT 일정 계산에서 비결정적 작업 기간을 산정하기 위해 활용하는 3점 추정치는 낙관치(a), 최빈치(m), 그리고 어떤 예측치인가?",
    "answer": "비관치",
    "explanation": "PERT는 3점 추정치인 낙관치(a), 최빈치(m, 기대치), 비관치(b)를 이용해 기댓값 = (a + 4m + b) / 6 공식을 적용합니다.",
    "difficulty": "EASY",
    "keywords": [
      "비관치",
      "PERT",
      "3점추정"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-schedule"
  },
  {
    "id": "EXP_SE2_028",
    "subject": "소프트웨어설계",
    "category": "일정 관리",
    "type": "SHORT_ANSWER",
    "question": "프로젝트 일정 지연을 만회하기 위해 추가 인력을 집중 투입하거나 야근, 외주 비용을 투입하여 임계 경로상의 작업 기간을 단축하는 기법은 무엇인가?",
    "answer": "크래싱",
    "explanation": "크래싱(Crashing, 공정 압축법)은 추가 자원을 투입해 일정을 줄이는 기법으로 비용 증가 위험이 있습니다. 순차 작업을 병렬로 겹쳐 수행하는 것은 패스트 트래킹(Fast-Tracking)입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "크래싱",
      "Crashing",
      "일정단축기법"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-schedule"
  },
  {
    "id": "EXP_SE2_029",
    "subject": "소프트웨어설계",
    "category": "일정 관리",
    "type": "SHORT_ANSWER",
    "question": "원래 순차적으로 진행되어야 할 후속 작업들을 앞당겨 선행 작업과 동시에 병렬로 진행시킴으로써 일정 기간을 단축하는 기법은 무엇인가?",
    "answer": "패스트 트래킹",
    "explanation": "패스트 트래킹(Fast Tracking, 공정 중첩법)은 비용은 추가되지 않지만 재작업(Rework) 위험이 커집니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "패스트 트래킹",
      "Fast Tracking",
      "공정중첩법"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-schedule"
  },
  {
    "id": "EXP_SE2_030",
    "subject": "소프트웨어설계",
    "category": "소프트웨어 공학",
    "type": "SHORT_ANSWER",
    "question": "지연되는 소프트웨어 개발 프로젝트에 새로운 인력을 뒤늦게 추가 투입하는 것은 의사소통 비용을 폭증시켜 프로젝트를 더 지연시킬 뿐이라는 법칙은 무엇인가?",
    "answer": "브룩스의 법칙",
    "explanation": "브룩스의 법칙(Brooks' Law)은 신규 인력 교육 및 커뮤니케이션 오버헤드로 인해 프로젝트가 더욱 지연된다는 경험적 법칙입니다.",
    "difficulty": "EASY",
    "keywords": [
      "브룩스의 법칙",
      "Brooks Law",
      "인력투입지연"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-laws"
  },
  {
    "id": "EXP_SE2_031",
    "subject": "소프트웨어설계",
    "category": "요구사항",
    "type": "SHORT_ANSWER",
    "question": "요구사항 분석 도구인 자료 흐름도(DFD)에서 데이터의 처리 및 변환 과정을 나타내는 기호의 도형 모양은 무엇인가?",
    "answer": "원",
    "explanation": "DFD에서 프로세스(처리기)는 원(○), 자료 흐름은 화살표(→), 자료 저장소는 평행선(=), 단말(외부 엔티티)은 사각형(□)으로 표기합니다.",
    "difficulty": "EASY",
    "keywords": [
      "원",
      "DFD",
      "프로세스기호"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-requirements"
  },
  {
    "id": "EXP_SE2_032",
    "subject": "소프트웨어설계",
    "category": "요구사항",
    "type": "SHORT_ANSWER",
    "question": "자료 흐름도(DFD)에서 데이터가 저장되어 있는 파일이나 데이터베이스 같은 자료 저장소를 나타내는 기호의 형태는 무엇인가?",
    "answer": "평행선",
    "explanation": "자료 저장소(Data Store)는 두 줄의 평행선(=)으로 표현합니다.",
    "difficulty": "EASY",
    "keywords": [
      "평행선",
      "자료저장소",
      "DFD기호"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-requirements"
  },
  {
    "id": "EXP_SE2_033",
    "subject": "소프트웨어설계",
    "category": "요구사항",
    "type": "SHORT_ANSWER",
    "question": "자료 흐름도(DFD)에 등장하는 모든 데이터 항목, 데이터 흐름, 저장소의 정의를 체계적으로 정리하여 누구나 동일하게 이해하도록 만든 사전을 무엇이라 하는가?",
    "answer": "자료 사전",
    "explanation": "자료 사전(DD, Data Dictionary)은 메타데이터의 집합체로 정의 기호(=, +, {}, [], (), **)를 사용해 데이터의 의미와 구조를 명세합니다.",
    "difficulty": "EASY",
    "keywords": [
      "자료 사전",
      "Data Dictionary",
      "자료흐름도"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-requirements"
  },
  {
    "id": "EXP_SE2_034",
    "subject": "소프트웨어설계",
    "category": "요구사항",
    "type": "SHORT_ANSWER",
    "question": "자료 사전(Data Dictionary) 작성 시 특정 데이터 항목의 0회 이상 무한 반복(Repetition)을 나타낼 때 사용하는 기호는 무엇인가?",
    "answer": "{}",
    "explanation": "중괄호 {}는 반복을 의미합니다. 대괄호 []는 선택, 소괄호 ()는 생략 가능(선택적), 등호 =는 정의, 플러스 +는 연결을 나타냅니다.",
    "difficulty": "EASY",
    "keywords": [
      "{}",
      "중괄호",
      "자료사전기호",
      "반복"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-requirements"
  },
  {
    "id": "EXP_SE2_035",
    "subject": "소프트웨어설계",
    "category": "요구사항",
    "type": "SHORT_ANSWER",
    "question": "자료 사전(Data Dictionary) 기호 중 나열된 여러 데이터 항목 중 오직 하나만을 택하는 선택(Selection)을 표현할 때 사용하는 기호는 무엇인가?",
    "answer": "[]",
    "explanation": "대괄호 [A | B | C]는 목록 중 하나를 선택함을 의미합니다.",
    "difficulty": "EASY",
    "keywords": [
      "[]",
      "대괄호",
      "자료사전기호",
      "선택"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-requirements"
  },
  {
    "id": "EXP_SE2_036",
    "subject": "소프트웨어설계",
    "category": "요구사항",
    "type": "SHORT_ANSWER",
    "question": "자료 사전(Data Dictionary) 기호 중 데이터 항목이 있을 수도 있고 없을 수도 있음을 나타내는 생략 가능(Optional) 기호는 무엇인가?",
    "answer": "()",
    "explanation": "소괄호 ()는 해당 항목이 선택적으로 생략 가능함을 나타냅니다.",
    "difficulty": "EASY",
    "keywords": [
      "()",
      "소괄호",
      "자료사전기호",
      "생략"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-requirements"
  },
  {
    "id": "EXP_SE2_037",
    "subject": "소프트웨어설계",
    "category": "인터페이스 설계",
    "type": "SHORT_ANSWER",
    "question": "인터페이스 보안을 위해 통신 구간의 암호화를 제공하는 표준 보안 프로토콜로, HTTP의 80번 포트 대신 443번 포트를 사용하는 기술은 무엇인가?",
    "answer": "HTTPS",
    "explanation": "HTTPS는 HTTP에 SSL/TLS 보안 계층을 결합하여 데이터의 도청과 변조를 방지합니다.",
    "difficulty": "EASY",
    "keywords": [
      "HTTPS",
      "SSL/TLS",
      "443번포트"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-interface"
  },
  {
    "id": "EXP_SE2_038",
    "subject": "소프트웨어설계",
    "category": "인터페이스 설계",
    "type": "SHORT_ANSWER",
    "question": "네트워크 통신 계층 중 IP 계층에서 보안 서비스를 제공하여 패킷의 기밀성, 무결성, 인증을 보장하는 표준 프로토콜 세트의 명칭은 무엇인가?",
    "answer": "IPsec",
    "explanation": "IPsec은 네트워크 계층(L3)에서 AH(인증)와 ESP(암호화/기밀성) 프로토콜을 사용해 안전한 터널링을 구축합니다.",
    "difficulty": "EASY",
    "keywords": [
      "IPsec",
      "IP보안프로토콜",
      "AH",
      "ESP"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-interface"
  },
  {
    "id": "EXP_SE2_039",
    "subject": "소프트웨어설계",
    "category": "시스템 연계",
    "type": "SHORT_ANSWER",
    "question": "웹 브라우저와 웹 서버 간에 별도의 추가 연결 수립 없이 단일 TCP 연결 상에서 실시간 전이중(Full-Duplex) 양방향 통신을 제공하는 프로토콜은 무엇인가?",
    "answer": "웹소켓",
    "explanation": "웹소켓(WebSocket, ws://)은 핸드셰이크 후 지속적인 양방향 채널을 열어 채팅이나 실시간 데이터 스트리밍에 사용됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "웹소켓",
      "WebSocket",
      "전이중양방향통신"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-interface"
  },
  {
    "id": "EXP_SE2_040",
    "subject": "소프트웨어설계",
    "category": "소프트웨어 공학",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 프로젝트 관리를 구성하는 3대 핵심 관리 요소(3P)는 People(인력), Problem(문제), 그리고 무엇인가?",
    "answer": "Process",
    "explanation": "프로젝트 관리의 3P는 People(사람), Problem(문제/목표), Process(절차/과정)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "Process",
      "프로세스",
      "3P",
      "프로젝트관리"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-management"
  },
  {
    "id": "EXP_SE2_041",
    "subject": "소프트웨어설계",
    "category": "소프트웨어 공학",
    "type": "SHORT_ANSWER",
    "question": "폭포수 모델의 선형 순차적 접근 방식의 단점을 보완하여 프로젝트 전체 범위를 계층적으로 분할하고(Work Breakdown Structure) 관리하는 도구의 약칭은 무엇인가?",
    "answer": "WBS",
    "explanation": "WBS(Work Breakdown Structure, 작업 분할 구조도)는 프로젝트의 전체 목표를 달성 가능한 소규모 작업 패키지로 계층 분할합니다.",
    "difficulty": "EASY",
    "keywords": [
      "WBS",
      "Work Breakdown Structure",
      "작업분할구조도"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-management"
  },
  {
    "id": "EXP_SE2_042",
    "subject": "소프트웨어설계",
    "category": "소프트웨어 개발 모델",
    "type": "SHORT_ANSWER",
    "question": "보헴(Boehm)이 제안한 소프트웨어 개발 모델로, 폭포수와 프로토타입의 장점을 수용하고 계획 수립 → 위험 분석 → 개발 및 검증 → 고객 평가의 4단계를 점진적으로 반복하는 모델은 무엇인가?",
    "answer": "나선형 모델",
    "explanation": "나선형 모델(Spiral Model)의 가장 핵심적인 특징은 나선을 돌 때마다 \"위험 분석(Risk Analysis)\"을 집중 수행한다는 점입니다.",
    "difficulty": "EASY",
    "keywords": [
      "나선형 모델",
      "Spiral Model",
      "위험분석"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-sdlc"
  },
  {
    "id": "EXP_SE2_043",
    "subject": "소프트웨어설계",
    "category": "소프트웨어 개발 모델",
    "type": "SHORT_ANSWER",
    "question": "고전적 소프트웨어 개발 모델 중 요구사항 분석부터 유지보수까지 각 단계가 이전 단계의 완료를 전제로 엄격히 순차 진행되는 가장 오래된 모델은 무엇인가?",
    "answer": "폭포수 모델",
    "explanation": "폭포수 모델(Waterfall Model)은 하향식 순차 진행 모델로, 문서화가 잘 되지만 요구사항 변경 수용이 어렵습니다.",
    "difficulty": "EASY",
    "keywords": [
      "폭포수 모델",
      "Waterfall Model",
      "순차적모델"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-sdlc"
  },
  {
    "id": "EXP_SE2_044",
    "subject": "소프트웨어설계",
    "category": "애자일",
    "type": "SHORT_ANSWER",
    "question": "XP(eXtreme Programming)의 12대 기본 실천 사항 중 모든 비즈니스 로직에 대해 실제 구현 코드를 작성하기 전에 실패하는 자동화 테스트 케이스를 먼저 작성하는 기법의 약칭은 무엇인가?",
    "answer": "TDD",
    "explanation": "TDD(Test-Driven Development, 테스트 주도 개발)는 \"Red(실패) → Green(통과) → Refactor(개선)\" 주기를 반복합니다.",
    "difficulty": "EASY",
    "keywords": [
      "TDD",
      "Test-Driven Development",
      "테스트주도개발"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-agile"
  },
  {
    "id": "EXP_SE2_045",
    "subject": "소프트웨어설계",
    "category": "애자일",
    "type": "SHORT_ANSWER",
    "question": "XP의 12대 기본 실천 사항 중 두 명의 개발자가 한 컴퓨터에 나란히 앉아 한 명은 코드를 작성하고(드라이버) 다른 한 명은 코드를 검토하는(내비게이터) 기법은 무엇인가?",
    "answer": "페어 프로그래밍",
    "explanation": "페어 프로그래밍(Pair Programming, 짝 프로그래밍)은 코드 품질을 즉시 향상시키고 팀 내 지식 공유를 극대화합니다.",
    "difficulty": "EASY",
    "keywords": [
      "페어 프로그래밍",
      "Pair Programming",
      "짝프로그래밍"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-agile"
  },
  {
    "id": "EXP_SE2_046",
    "subject": "소프트웨어설계",
    "category": "애자일",
    "type": "SHORT_ANSWER",
    "question": "XP의 12대 기본 실천 사항 중 개발자가 작업한 소스코드를 하루에도 수차례씩 중앙 공유 리포지토리에 지속적으로 빌드하고 통합하는 원칙의 약칭은 무엇인가?",
    "answer": "CI",
    "explanation": "지속적 통합(CI, Continuous Integration)은 빈번한 머지와 자동 빌드/테스트를 통해 통합 지옥(Integration Hell)을 방지합니다.",
    "difficulty": "EASY",
    "keywords": [
      "CI",
      "Continuous Integration",
      "지속적통합"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-agile"
  },
  {
    "id": "EXP_SE2_047",
    "subject": "소프트웨어설계",
    "category": "인터페이스 설계",
    "type": "SHORT_ANSWER",
    "question": "인터페이스 설계 시 분산 시스템 컴포넌트 간에 동기적 방식이 아닌 큐를 통해 송신자와 수신자의 실행 타이밍을 분리하는 통신 방식을 무엇이라 하는가?",
    "answer": "비동기 통신",
    "explanation": "비동기(Asynchronous) 통신은 송신자가 응답을 기다리지 않고 다음 작업을 즉시 수행할 수 있어 시스템 처리량이 높아집니다.",
    "difficulty": "EASY",
    "keywords": [
      "비동기 통신",
      "Asynchronous",
      "메시지큐"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-interface"
  },
  {
    "id": "EXP_SE2_048",
    "subject": "소프트웨어설계",
    "category": "소프트웨어 공학",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 개발 프로젝트의 조직 형태 중 소프트웨어 프로젝트가 완료되면 해산되는 임시 TF팀 형태로 프로젝트 관리자에게 전권이 부여되는 조직 구조는 무엇인가?",
    "answer": "프로젝트형 조직",
    "explanation": "프로젝트형 조직(Projectized Organization)은 PM에게 자원과 예산의 통제 전권이 있으며 프로젝트 집중도가 높습니다. 부서별 기능 전문성을 유지하는 것은 기능형 조직입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "프로젝트형 조직",
      "Projectized",
      "조직구조"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-management"
  },
  {
    "id": "EXP_SE2_049",
    "subject": "소프트웨어설계",
    "category": "소프트웨어 공학",
    "type": "SHORT_ANSWER",
    "question": "기존 기능 조직의 수직적 전문성과 프로젝트 조직의 수평적 유연성을 결합하여 팀원이 원래 부서와 프로젝트 양쪽에 소속되는 하이브리드 조직 형태는 무엇인가?",
    "answer": "매트릭스 조직",
    "explanation": "매트릭스 조직(Matrix Organization)은 팀원이 기능 부서장과 프로젝트 관리자 2명에게 이중 보고하는 구조를 갖습니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "매트릭스 조직",
      "Matrix Organization",
      "이중보고"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-management"
  },
  {
    "id": "EXP_SE2_050",
    "subject": "소프트웨어설계",
    "category": "소프트웨어 공학",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 제품의 라이프사이클 전반에 걸쳐 요구사항 명세서, 소스코드, 테스트 케이스 간의 일관성과 추적 가능성을 보장하기 위해 작성하는 표를 무엇이라 하는가?",
    "answer": "추적성 매트릭스",
    "explanation": "추적성 매트릭스(Traceability Matrix, RTM)는 요구사항이 설계, 구현, 테스트 케이스로 온전히 누락 없이 연결되었는지 교차 추적합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "추적성 매트릭스",
      "Traceability Matrix",
      "RTM"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-management"
  },
  {
    "id": "EXP_DB1_001",
    "subject": "데이터베이스구축",
    "category": "SQL 제약조건",
    "type": "SHORT_ANSWER",
    "question": "관계형 데이터베이스에서 테이블 생성 시 특정 컬럼에 입력될 수 있는 값의 범위나 조건을 제한식으로 검증하는 무결성 제약조건 키워드는 무엇인가?",
    "answer": "CHECK",
    "explanation": "CHECK 제약조건은 데이터 입력/수정 시 특정 논리식(예: CHECK(age >= 0 AND age <= 150))을 만족하는지 검사합니다.",
    "difficulty": "EASY",
    "keywords": [
      "CHECK",
      "제약조건",
      "범위검증"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-constraints"
  },
  {
    "id": "EXP_DB1_002",
    "subject": "데이터베이스구축",
    "category": "SQL 제약조건",
    "type": "SHORT_ANSWER",
    "question": "외래키(FOREIGN KEY) 제약조건 설정 시 부모 테이블의 행이 삭제되면 이를 참조하는 자식 테이블의 모든 관련 행도 연쇄적으로 자동 삭제되도록 지정하는 옵션은 무엇인가?",
    "answer": "CASCADE",
    "explanation": "ON DELETE CASCADE는 부모 행 삭제 시 외래키로 참조하는 모든 자식 행들을 함께 삭제하여 참조 무결성을 유지합니다.",
    "difficulty": "EASY",
    "keywords": [
      "CASCADE",
      "ON DELETE CASCADE",
      "참조무결성"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-constraints"
  },
  {
    "id": "EXP_DB1_003",
    "subject": "데이터베이스구축",
    "category": "SQL 제약조건",
    "type": "SHORT_ANSWER",
    "question": "외래키 제약조건 설정 시 자식 테이블에서 해당 행을 참조하고 있는 경우 부모 테이블의 행을 삭제하지 못하도록 차단(거절)하는 기본 동작 옵션은 무엇인가?",
    "answer": "RESTRICT",
    "explanation": "ON DELETE RESTRICT(또는 NO ACTION)는 자식 행이 존재할 때 부모 행 삭제를 금지하여 참조 무결성 위반을 방지합니다.",
    "difficulty": "EASY",
    "keywords": [
      "RESTRICT",
      "ON DELETE RESTRICT",
      "삭제차단"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-constraints"
  },
  {
    "id": "EXP_DB1_004",
    "subject": "데이터베이스구축",
    "category": "SQL 제약조건",
    "type": "SHORT_ANSWER",
    "question": "외래키 설정 시 부모 테이블의 튜플이 삭제되면 이를 참조하던 자식 테이블 외래키 속성 값을 자동으로 NULL로 변경하는 옵션은 무엇인가?",
    "answer": "SET NULL",
    "explanation": "ON DELETE SET NULL 옵션은 부모 튜플 삭제 시 자식 튜플의 참조 컬럼 값을 NULL로 갱신합니다.",
    "difficulty": "EASY",
    "keywords": [
      "SET NULL",
      "ON DELETE SET NULL",
      "외래키옵션"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-constraints"
  },
  {
    "id": "EXP_DB1_005",
    "subject": "데이터베이스구축",
    "category": "SQL 제약조건",
    "type": "SHORT_ANSWER",
    "question": "테이블 정의 시 INSERT 문에서 특정 컬럼의 값을 생략했을 때 자동으로 들어갈 기본값을 사전에 지정하는 제약조건 키워드는 무엇인가?",
    "answer": "DEFAULT",
    "explanation": "DEFAULT 키워드는 컬럼 값이 명시되지 않았을 때 지정된 기본값(예: DEFAULT 0, DEFAULT SYSDATE)을 입력합니다.",
    "difficulty": "EASY",
    "keywords": [
      "DEFAULT",
      "기본값설정",
      "SQL제약조건"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-constraints"
  },
  {
    "id": "EXP_DB1_006",
    "subject": "데이터베이스구축",
    "category": "SQL 제약조건",
    "type": "SHORT_ANSWER",
    "question": "테이블의 속성에 중복된 값이 들어올 수 없도록 고유성을 보장하되, 기본키(PK)와 달리 NULL 값의 저장은 허용하는 제약조건 키워드는 무엇인가?",
    "answer": "UNIQUE",
    "explanation": "UNIQUE 제약조건은 고유성을 강제하지만 NULL 값은 허용(DBMS에 따라 여러 NULL 허용)합니다. 기본키(PRIMARY KEY)는 UNIQUE + NOT NULL 입니다.",
    "difficulty": "EASY",
    "keywords": [
      "UNIQUE",
      "고유키",
      "NULL허용"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-constraints"
  },
  {
    "id": "EXP_DB1_007",
    "subject": "데이터베이스구축",
    "category": "SQL DDL",
    "type": "SHORT_ANSWER",
    "question": "기존에 생성되어 있는 테이블의 구조를 변경하기 위해 컬럼을 추가하거나 수정, 삭제할 때 사용하는 DDL 명령어는 무엇인가?",
    "answer": "ALTER TABLE",
    "explanation": "ALTER TABLE 문은 ADD(컬럼 추가), MODIFY/ALTER(컬럼 타입 변경), DROP(컬럼 삭제) 등의 세부 명령과 함께 쓰입니다.",
    "difficulty": "EASY",
    "keywords": [
      "ALTER TABLE",
      "테이블구조변경",
      "DDL"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-ddl"
  },
  {
    "id": "EXP_DB1_008",
    "subject": "데이터베이스구축",
    "category": "SQL DDL",
    "type": "SHORT_ANSWER",
    "question": "테이블 삭제 시 해당 테이블을 다른 테이블에서 외래키로 참조하고 있더라도 연관된 모든 제약조건을 강제로 함께 제거하고 테이블을 삭제시키는 DROP 문 옵션은 무엇인가?",
    "answer": "CASCADE CONSTRAINTS",
    "explanation": "DROP TABLE 테이블명 CASCADE CONSTRAINTS 옵션은 참조하고 있는 외래키 제약조건을 먼저 삭제한 뒤 테이블을 성공적으로 제거합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "CASCADE CONSTRAINTS",
      "테이블삭제",
      "DROP"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-ddl"
  },
  {
    "id": "EXP_DB1_009",
    "subject": "데이터베이스구축",
    "category": "SQL DDL vs DML",
    "type": "SHORT_ANSWER",
    "question": "테이블의 모든 행(데이터)을 고속으로 삭제하되 트랜잭션 로그를 거의 남기지 않고 즉시 자동 커밋(Auto Commit)되어 ROLLBACK으로 되돌릴 수 없는 DDL 명령어는 무엇인가?",
    "answer": "TRUNCATE",
    "explanation": "TRUNCATE는 테이블의 구조는 남기고 모든 레코드를 빠르게 비우는 DDL입니다. 행 단위로 삭제 로그를 남겨 ROLLBACK이 가능한 것은 DML인 DELETE입니다.",
    "difficulty": "EASY",
    "keywords": [
      "TRUNCATE",
      "테이블초기화",
      "롤백불가"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-ddl"
  },
  {
    "id": "EXP_DB1_010",
    "subject": "데이터베이스구축",
    "category": "SQL 집계 함수",
    "type": "SHORT_ANSWER",
    "question": "SQL 집계 함수 중 특정 컬럼 속성에 NULL 값이 들어있는 행까지 포함하여 전체 행의 총 개수를 셀 때 사용하는 표현식은 COUNT(컬럼명)인가 COUNT(*)인가?",
    "answer": "COUNT(*)",
    "explanation": "COUNT(*)는 NULL을 포함한 모든 행을 세며, COUNT(컬럼명)은 해당 컬럼 값이 NULL인 행을 제외하고 셉니다.",
    "difficulty": "EASY",
    "keywords": [
      "COUNT(*)",
      "집계함수",
      "NULL포함"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-aggregate"
  },
  {
    "id": "EXP_DB1_011",
    "subject": "데이터베이스구축",
    "category": "SQL NULL 함수",
    "type": "SHORT_ANSWER",
    "question": "SQL 표준 함수 중 인자로 나열된 여러 개의 값 중에서 NULL이 아닌 최초의(첫 번째) 값을 반환하는 함수의 이름은 무엇인가?",
    "answer": "COALESCE",
    "explanation": "COALESCE(val1, val2, val3, ...)는 앞에서부터 검사하여 처음 만나는 NULL이 아닌 값을 반환합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "COALESCE",
      "NULL처리",
      "표준함수"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-functions"
  },
  {
    "id": "EXP_DB1_012",
    "subject": "데이터베이스구축",
    "category": "SQL NULL 함수",
    "type": "SHORT_ANSWER",
    "question": "SQL 함수 중 두 개의 인자(expr1, expr2)를 비교하여 두 값이 같으면 NULL을 반환하고, 다르면 expr1을 반환하는 함수의 이름은 무엇인가?",
    "answer": "NULLIF",
    "explanation": "NULLIF(a, b)는 a와 b가 같을 때 NULL을 반환하여 0으로 나누기(Divide by Zero) 에러 등을 방지할 때 유용합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "NULLIF",
      "동등비교NULL",
      "SQL함수"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-functions"
  },
  {
    "id": "EXP_DB1_013",
    "subject": "데이터베이스구축",
    "category": "SQL 윈도우 함수",
    "type": "SHORT_ANSWER",
    "question": "SQL 윈도우 순위 함수 중 동일한 점수가 나오면 같은 순위를 부여하고, 그 다음 순위는 동점자 수만큼 건너뛰어 부여하는(예: 1등, 2등, 2등, 4등) 함수는 무엇인가?",
    "answer": "RANK",
    "explanation": "RANK() 함수는 동순위 발생 시 순위를 건너뜁니다. 순위를 건너뛰지 않고 1등, 2등, 2등, 3등으로 매기는 것은 DENSE_RANK()입니다.",
    "difficulty": "EASY",
    "keywords": [
      "RANK",
      "순위함수",
      "순위건너뜀"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-window"
  },
  {
    "id": "EXP_DB1_014",
    "subject": "데이터베이스구축",
    "category": "SQL 윈도우 함수",
    "type": "SHORT_ANSWER",
    "question": "SQL 윈도우 순위 함수 중 점수의 동일 여부와 상관없이 무조건 각 행마다 1부터 시작하여 유일하고 고유한 연속 일련번호(1, 2, 3, 4, ...)를 부여하는 함수는 무엇인가?",
    "answer": "ROW_NUMBER",
    "explanation": "ROW_NUMBER()는 동점자가 존재하더라도 정렬 기준에 따라 고유한 연속 번호를 할당합니다.",
    "difficulty": "EASY",
    "keywords": [
      "ROW_NUMBER",
      "일련번호부여",
      "윈도우함수"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-window"
  },
  {
    "id": "EXP_DB1_015",
    "subject": "데이터베이스구축",
    "category": "SQL 윈도우 함수",
    "type": "SHORT_ANSWER",
    "question": "SQL 윈도우 순위 함수 중 동일한 값에 대해 같은 순위를 매기되, 바로 다음 순위를 건너뛰지 않고 연속된 번호로 부여하는(예: 1등, 2등, 2등, 3등) 함수는 무엇인가?",
    "answer": "DENSE_RANK",
    "explanation": "DENSE_RANK()는 빈틈없이(dense) 순위를 매겨 동점자 다음 순위를 연속된 숫자로 이어갑니다.",
    "difficulty": "EASY",
    "keywords": [
      "DENSE_RANK",
      "연속순위",
      "윈도우함수"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-window"
  },
  {
    "id": "EXP_DB1_016",
    "subject": "데이터베이스구축",
    "category": "SQL 그룹 함수",
    "type": "SHORT_ANSWER",
    "question": "GROUP BY 절과 함께 쓰여 명시된 컬럼들의 소계(Subtotal)와 총계(Grand Total)를 계층적 단계별로 자동 산출해주는 그룹 함수는 무엇인가?",
    "answer": "ROLLUP",
    "explanation": "ROLLUP(A, B)은 (A, B)별 집계, A별 소계, 전체 총계를 계층적으로 생성합니다. 나열 순서에 따라 집계 결과가 달라집니다.",
    "difficulty": "EASY",
    "keywords": [
      "ROLLUP",
      "소계총계",
      "그룹함수"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-group"
  },
  {
    "id": "EXP_DB1_017",
    "subject": "데이터베이스구축",
    "category": "SQL 그룹 함수",
    "type": "SHORT_ANSWER",
    "question": "GROUP BY 절과 함께 쓰여 결합 가능한 모든 다차원 조합(2^N)에 대해 집계를 산출하여 다각적 데이터 분석을 지원하는 그룹 함수는 무엇인가?",
    "answer": "CUBE",
    "explanation": "CUBE(A, B)는 (A, B), (A), (B), () 전체의 모든 가능한 경우의 수로 집계를 생성합니다.",
    "difficulty": "EASY",
    "keywords": [
      "CUBE",
      "다차원집계",
      "모든조합"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-group"
  },
  {
    "id": "EXP_DB1_018",
    "subject": "데이터베이스구축",
    "category": "SQL 그룹 함수",
    "type": "SHORT_ANSWER",
    "question": "GROUP BY 절에서 원하는 개별 집계 대상 컬럼들을 튜플 목록으로 직접 지정하여 각각 독립적으로 집계하는 그룹 집합 함수는 무엇인가?",
    "answer": "GROUPING SETS",
    "explanation": "GROUPING SETS(A, B)는 A 기준 집계와 B 기준 집계의 결과를 UNION ALL 한 것과 동일한 효과를 냅니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "GROUPING SETS",
      "개별그룹집계",
      "그룹함수"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-group"
  },
  {
    "id": "EXP_DB1_019",
    "subject": "데이터베이스구축",
    "category": "SQL 서브쿼리",
    "type": "SHORT_ANSWER",
    "question": "SQL 문장 중 메인 쿼리의 SELECT 절에 위치하여 매 행마다 단 하나의 단일 값(1행 1열)만을 반환해야 하는 서브쿼리를 무엇이라 하는가?",
    "answer": "스칼라 서브쿼리",
    "explanation": "스칼라 서브쿼리(Scalar Subquery)는 SELECT 절에서 사용되며 반드시 1개의 값만 반환해야 합니다.",
    "difficulty": "EASY",
    "keywords": [
      "스칼라 서브쿼리",
      "Scalar Subquery",
      "SELECT절서브쿼리"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-subquery"
  },
  {
    "id": "EXP_DB1_020",
    "subject": "데이터베이스구축",
    "category": "SQL 서브쿼리",
    "type": "SHORT_ANSWER",
    "question": "SQL 문장 중 메인 쿼리의 FROM 절 내부에 작성되어 마치 가상의 테이블처럼 임시로 사용되는 서브쿼리를 무엇이라 하는가?",
    "answer": "인라인 뷰",
    "explanation": "인라인 뷰(Inline View)는 FROM 절에 위치하는 동적 뷰 역할을 수행하는 서브쿼리입니다.",
    "difficulty": "EASY",
    "keywords": [
      "인라인 뷰",
      "Inline View",
      "FROM절서브쿼리"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-subquery"
  },
  {
    "id": "EXP_DB1_021",
    "subject": "데이터베이스구축",
    "category": "SQL 서브쿼리",
    "type": "SHORT_ANSWER",
    "question": "서브쿼리가 메인 쿼리의 특정 컬럼 값을 가져와서 비교 연산에 사용함으로써, 메인 쿼리의 행 수만큼 반복 실행되는 종속적인 서브쿼리는 무엇인가?",
    "answer": "상관 서브쿼리",
    "explanation": "상관 서브쿼리(Correlated Subquery)는 메인 쿼리와 종속 관계를 가지며 EXISTS 조건 등과 함께 자주 쓰입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "상관 서브쿼리",
      "Correlated Subquery",
      "메인쿼리참조"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-subquery"
  },
  {
    "id": "EXP_DB1_022",
    "subject": "데이터베이스구축",
    "category": "SQL 서브쿼리",
    "type": "SHORT_ANSWER",
    "question": "다중 행 서브쿼리 연산자 중 서브쿼리의 반환 결과에 해당하는 레코드가 최소 1건이라도 존재하는지 여부만을 판단하여 참/거짓을 반환하는 연산자는 무엇인가?",
    "answer": "EXISTS",
    "explanation": "EXISTS 연산자는 조건에 맞는 행이 1개라도 발견되면 즉시 스캔을 멈추고 TRUE를 반환하므로 성능상 매우 유리합니다.",
    "difficulty": "EASY",
    "keywords": [
      "EXISTS",
      "존재여부확인",
      "다중행연산자"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-subquery"
  },
  {
    "id": "EXP_DB1_023",
    "subject": "데이터베이스구축",
    "category": "SQL 조인",
    "type": "SHORT_ANSWER",
    "question": "두 테이블을 조인할 때 조인 조건에 일치하지 않는 왼쪽 테이블의 모든 행도 버리지 않고 결과에 포함시키는 외부 조인(Outer Join)의 명칭은 무엇인가?",
    "answer": "LEFT OUTER JOIN",
    "explanation": "LEFT OUTER JOIN은 왼쪽 테이블의 모든 행을 유지하며, 일치하지 않는 오른쪽 테이블의 컬럼은 NULL로 채웁니다.",
    "difficulty": "EASY",
    "keywords": [
      "LEFT OUTER JOIN",
      "왼쪽외부조인",
      "조인"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-join"
  },
  {
    "id": "EXP_DB1_024",
    "subject": "데이터베이스구축",
    "category": "SQL 조인",
    "type": "SHORT_ANSWER",
    "question": "조인 조건절(ON) 없이 두 테이블을 단순 연결하여 왼쪽 테이블 m개 행과 오른쪽 테이블 n개 행의 모든 조합인 m x n개의 행을 반환하는 조인은 무엇인가?",
    "answer": "CROSS JOIN",
    "explanation": "CROSS JOIN(카티션 프로덕트, 교차 조인)은 두 테이블 간의 모든 카티션 곱 조합을 산출합니다.",
    "difficulty": "EASY",
    "keywords": [
      "CROSS JOIN",
      "카티션곱",
      "교차조인"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-join"
  },
  {
    "id": "EXP_DB1_025",
    "subject": "데이터베이스구축",
    "category": "SQL 조인",
    "type": "SHORT_ANSWER",
    "question": "동일한 하나의 테이블을 서로 다른 별칭(Alias)을 부여하여 자기 자신과 결합하는 형태의 조인을 무엇이라 하는가?",
    "answer": "셀프 조인",
    "explanation": "셀프 조인(Self Join)은 사원과 관리자 관계처럼 계층 구조나 부모-자식 관계가 한 테이블 내에 있을 때 사용합니다.",
    "difficulty": "EASY",
    "keywords": [
      "셀프 조인",
      "Self Join",
      "자가조인"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-join"
  },
  {
    "id": "EXP_DB1_026",
    "subject": "데이터베이스구축",
    "category": "SQL DML",
    "type": "SHORT_ANSWER",
    "question": "SQL에서 대상 테이블(TARGET)과 원본 테이블(SOURCE)을 조인하여 ON 조건에 일치하는 행이 있으면 UPDATE, 없으면 INSERT를 단일 문장으로 처리하는 DML 명령어는 무엇인가?",
    "answer": "MERGE",
    "explanation": "MERGE(Upsert) 문은 WHEN MATCHED THEN UPDATE와 WHEN NOT MATCHED THEN INSERT 절을 결합해 병합합니다.",
    "difficulty": "EASY",
    "keywords": [
      "MERGE",
      "Upsert",
      "병합문"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-dml"
  },
  {
    "id": "EXP_DB1_027",
    "subject": "데이터베이스구축",
    "category": "SQL DML",
    "type": "SHORT_ANSWER",
    "question": "SELECT 문에서 검색 결과의 중복 행을 제거하고 유일한 고유값만 출력하도록 지시하는 키워드는 무엇인가?",
    "answer": "DISTINCT",
    "explanation": "DISTINCT 키워드는 중복 행을 정렬 및 필터링하여 유일한 행들만 반환합니다.",
    "difficulty": "EASY",
    "keywords": [
      "DISTINCT",
      "중복제거",
      "SELECT문"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-dml"
  },
  {
    "id": "EXP_DB1_028",
    "subject": "데이터베이스구축",
    "category": "SQL DML",
    "type": "SHORT_ANSWER",
    "question": "SQL 집계 함수 결과에 대한 필터링 조건(예: 부서별 인원수가 5명 이상)을 지정할 때 WHERE 절 대신 반드시 사용해야 하는 절은 무엇인가?",
    "answer": "HAVING",
    "explanation": "HAVING 절은 GROUP BY로 묶인 그룹 집계 결과에 조건을 부여할 때 씁니다. 개별 행 조건은 WHERE 절에 씁니다.",
    "difficulty": "EASY",
    "keywords": [
      "HAVING",
      "그룹조건",
      "집계함수필터"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-dml"
  },
  {
    "id": "EXP_DB1_031",
    "subject": "데이터베이스구축",
    "category": "SQL DCL",
    "type": "SHORT_ANSWER",
    "question": "GRANT 문으로 권한을 부여할 때 권한을 부여받은 사용자가 자신이 받은 권한을 다른 제3의 사용자에게도 재부여할 수 있도록 허용하는 옵션은 무엇인가?",
    "answer": "WITH GRANT OPTION",
    "explanation": "WITH GRANT OPTION은 일반 객체 권한을 다른 사용자에게 위임할 수 있는 전파 권한 옵션입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "WITH GRANT OPTION",
      "권한전파",
      "DCL"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-dcl"
  },
  {
    "id": "EXP_DB1_032",
    "subject": "데이터베이스구축",
    "category": "SQL TCL",
    "type": "SHORT_ANSWER",
    "question": "트랜잭션 실행 중 오류가 발생했을 때 전체를 취소하지 않고 특정 지정 시점까지만 부분 취소(Rollback)할 수 있도록 설정하는 저장점 지정 명령어는 무엇인가?",
    "answer": "SAVEPOINT",
    "explanation": "SAVEPOINT 저장점명을 선언해두면 ROLLBACK TO 저장점명 명령으로 해당 지점까지의 작업만 부분 취소할 수 있습니다.",
    "difficulty": "EASY",
    "keywords": [
      "SAVEPOINT",
      "저장점",
      "부분롤백"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-tcl"
  },
  {
    "id": "EXP_DB1_033",
    "subject": "데이터베이스구축",
    "category": "SQL 내장 함수",
    "type": "SHORT_ANSWER",
    "question": "SQL 문자열 함수 중 특정 문자열에서 원하는 시작 위치부터 지정한 개수만큼의 부분 문자열을 잘라내어 추출하는 함수의 이름은 무엇인가?",
    "answer": "SUBSTR",
    "explanation": "SUBSTR(str, pos, len)은 pos 위치부터 len개의 문자를 추출합니다.",
    "difficulty": "EASY",
    "keywords": [
      "SUBSTR",
      "부분문자열",
      "문자열함수"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-functions"
  },
  {
    "id": "EXP_DB1_034",
    "subject": "데이터베이스구축",
    "category": "SQL 내장 함수",
    "type": "SHORT_ANSWER",
    "question": "SQL 문자열의 양쪽 끝에 존재하는 불필요한 공백 문자나 특정 지정 문자를 잘라내어 제거하는 함수의 이름은 무엇인가?",
    "answer": "TRIM",
    "explanation": "TRIM(str)은 앞뒤 공백을 제거합니다. 왼쪽만 제거는 LTRIM, 오른쪽만 제거는 RTRIM입니다.",
    "difficulty": "EASY",
    "keywords": [
      "TRIM",
      "공백제거",
      "문자열함수"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-functions"
  },
  {
    "id": "EXP_DB1_035",
    "subject": "데이터베이스구축",
    "category": "SQL 조건 표현식",
    "type": "SHORT_ANSWER",
    "question": "SQL에서 프로그래밍 언어의 if-else 조건문과 유사하게 조건에 따라 분기하여 다른 값을 반환할 때 사용하는 표준 표현식은 무엇인가?",
    "answer": "CASE",
    "explanation": "CASE WHEN 조건 THEN 결과 ELSE 기본값 END 구조로 조건 분기를 처리합니다.",
    "difficulty": "EASY",
    "keywords": [
      "CASE",
      "CASE WHEN",
      "조건식"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-functions"
  },
  {
    "id": "EXP_DB1_036",
    "subject": "데이터베이스구축",
    "category": "SQL 뷰",
    "type": "SHORT_ANSWER",
    "question": "뷰(View)를 정의할 때 WHERE 절의 조건에 위배되는 튜플의 INSERT나 UPDATE 연산이 실행되지 못하도록 차단하는 뷰 생성 옵션은 무엇인가?",
    "answer": "WITH CHECK OPTION",
    "explanation": "CREATE VIEW ... WITH CHECK OPTION은 뷰 정의 조건식을 벗어나는 데이터 변경을 원천 거절하여 데이터 무결성을 보장합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "WITH CHECK OPTION",
      "뷰제약옵션",
      "무결성"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-view"
  },
  {
    "id": "EXP_DB1_037",
    "subject": "데이터베이스구축",
    "category": "SQL 뷰",
    "type": "SHORT_ANSWER",
    "question": "뷰(View) 생성 시 사용자가 뷰를 통해 기본 테이블의 데이터를 조회(SELECT)만 할 수 있고 INSERT, UPDATE, DELETE 수정은 절대 하지 못하도록 강제하는 옵션은 무엇인가?",
    "answer": "WITH READ ONLY",
    "explanation": "WITH READ ONLY 옵션을 추가하면 해당 뷰는 읽기 전용으로 설정되어 데이터 변경 시도가 차단됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "WITH READ ONLY",
      "읽기전용뷰",
      "뷰옵션"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-view"
  },
  {
    "id": "EXP_DB1_038",
    "subject": "데이터베이스구축",
    "category": "데이터베이스 객체",
    "type": "SHORT_ANSWER",
    "question": "데이터베이스에서 테이블의 특정 컬럼(예: 사원번호, 주문번호)에 자동으로 고유한 연속 번호를 생성해주는 객체의 이름은 무엇인가?",
    "answer": "시퀀스",
    "explanation": "시퀀스(Sequence)는 일련번호를 자동으로 생성하며 .NEXTVAL로 다음 번호를 발급받습니다.",
    "difficulty": "EASY",
    "keywords": [
      "시퀀스",
      "Sequence",
      "일련번호생성"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-objects"
  },
  {
    "id": "EXP_DB1_039",
    "subject": "데이터베이스구축",
    "category": "데이터베이스 객체",
    "type": "SHORT_ANSWER",
    "question": "데이터베이스 객체(테이블, 뷰 등)에 영구적인 별칭을 붙여 긴 스키마명을 생략하거나 보안상 실제 테이블명을 감출 때 사용하는 데이터베이스 객체는 무엇인가?",
    "answer": "동의어",
    "explanation": "동의어(Synonym)는 실제 객체에 별칭을 부여하여 객체 접근의 투명성과 보안성을 높입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "동의어",
      "Synonym",
      "객체별칭"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-objects"
  },
  {
    "id": "EXP_DB1_040",
    "subject": "데이터베이스구축",
    "category": "SQL 연산자",
    "type": "SHORT_ANSWER",
    "question": "SQL WHERE 절에서 와일드카드 문자 중 임의의 문자 단 1글자와 매칭될 때 사용하는 기호는 무엇인가?",
    "answer": "_",
    "explanation": "_(언더스코어)는 정확히 1글자와 매칭되며, 0개 이상의 모든 문자열과 매칭되는 것은 %(퍼센트)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "_",
      "언더스코어",
      "와일드카드"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-dml"
  },
  {
    "id": "EXP_DB1_041",
    "subject": "데이터베이스구축",
    "category": "SQL 연산자",
    "type": "SHORT_ANSWER",
    "question": "SQL WHERE 절에서 특정 속성의 값이 NULL인지 확인할 때 = NULL 대신 반드시 사용해야 하는 올바른 연산 구문은 무엇인가?",
    "answer": "IS NULL",
    "explanation": "NULL은 알 수 없는(Unknown) 값이므로 = 연산자로 비교할 수 없으며 IS NULL 또는 IS NOT NULL 구문을 써야 합니다.",
    "difficulty": "EASY",
    "keywords": [
      "IS NULL",
      "NULL비교연산자"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-dml"
  },
  {
    "id": "EXP_DB1_042",
    "subject": "데이터베이스구축",
    "category": "SQL 연산자",
    "type": "SHORT_ANSWER",
    "question": "SQL WHERE 절에서 특정 컬럼의 값이 주어진 범위(하한값 이상, 상한값 이하)에 속하는지 검사할 때 사용하는 연산자는 무엇인가?",
    "answer": "BETWEEN",
    "explanation": "컬럼명 BETWEEN a AND b 구문은 a 이상 b 이하의 범위를 나타내며 양 끝값(a, b)을 모두 포함합니다.",
    "difficulty": "EASY",
    "keywords": [
      "BETWEEN",
      "범위연산자",
      "BETWEEN AND"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-dml"
  },
  {
    "id": "EXP_DB1_043",
    "subject": "데이터베이스구축",
    "category": "SQL 연산자",
    "type": "SHORT_ANSWER",
    "question": "SQL WHERE 절에서 특정 컬럼의 값이 나열된 리스트 안의 값 중 하나와 일치하는지 검사할 때 사용하는 다중 OR 대체 연산자는 무엇인가?",
    "answer": "IN",
    "explanation": "컬럼명 IN (val1, val2, val3) 연산자는 목록 내 일치하는 값이 있는지 검사합니다.",
    "difficulty": "EASY",
    "keywords": [
      "IN",
      "리스트일치연산자"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-dml"
  },
  {
    "id": "EXP_DB1_044",
    "subject": "데이터베이스구축",
    "category": "SQL 집합 연산자",
    "type": "SHORT_ANSWER",
    "question": "두 SELECT 문의 실행 결과를 합치되 중복 행을 제거하지 않고 모든 행을 그대로 유지하여 출력하는 집합 연산자는 무엇인가?",
    "answer": "UNION ALL",
    "explanation": "UNION ALL은 중복 제거를 위한 정렬 작업을 수행하지 않으므로 UNION보다 실행 속도가 훨씬 빠릅니다.",
    "difficulty": "EASY",
    "keywords": [
      "UNION ALL",
      "중복포함합집합",
      "집합연산자"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-set"
  },
  {
    "id": "EXP_DB1_045",
    "subject": "데이터베이스구축",
    "category": "SQL 집합 연산자",
    "type": "SHORT_ANSWER",
    "question": "첫 번째 SELECT 문의 결과에서 두 번째 SELECT 문의 결과에 포함된 공통 행들을 제외한 차집합 결과를 반환하는 표준 연산자(Oracle의 MINUS와 동등)는 무엇인가?",
    "answer": "EXCEPT",
    "explanation": "SQL 표준에서 차집합 연산자는 EXCEPT이며 오라클에서는 MINUS 키워드를 지원합니다.",
    "difficulty": "EASY",
    "keywords": [
      "EXCEPT",
      "MINUS",
      "차집합연산자"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-set"
  },
  {
    "id": "EXP_DB1_046",
    "subject": "데이터베이스구축",
    "category": "SQL 집합 연산자",
    "type": "SHORT_ANSWER",
    "question": "두 SELECT 문의 결과에서 양쪽에 공통으로 존재하는 교집합 행들만을 중복을 제거하여 반환하는 SQL 집합 연산자는 무엇인가?",
    "answer": "INTERSECT",
    "explanation": "INTERSECT는 두 쿼리 결과의 공통 행만을 추출하는 교집합 연산자입니다.",
    "difficulty": "EASY",
    "keywords": [
      "INTERSECT",
      "교집합연산자",
      "집합연산자"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-set"
  },
  {
    "id": "EXP_DB1_047",
    "subject": "데이터베이스구축",
    "category": "SQL 조인",
    "type": "SHORT_ANSWER",
    "question": "두 테이블에서 공통으로 존재하는 동일한 이름과 타입을 가진 모든 컬럼을 기준으로 자동으로 등가(=) 조인을 수행하는 조인 구문은 무엇인가?",
    "answer": "NATURAL JOIN",
    "explanation": "NATURAL JOIN은 동일한 이름의 컬럼들을 자동으로 매칭하여 조인하며 별도의 ON이나 USING 절을 쓸 수 없습니다.",
    "difficulty": "EASY",
    "keywords": [
      "NATURAL JOIN",
      "자연조인",
      "동일컬럼자동조인"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-join"
  },
  {
    "id": "EXP_DB1_048",
    "subject": "데이터베이스구축",
    "category": "SQL 조인",
    "type": "SHORT_ANSWER",
    "question": "조인 조건으로 등호(=) 연산자 대신 부등호(<, >, <=, >=)나 BETWEEN 연산자 등을 사용하는 조인을 무엇이라 하는가?",
    "answer": "비등가 조인",
    "explanation": "비등가 조인(Non-Equi Join)은 급여 등급 테이블처럼 값이 특정 구간 범위에 들어맞는지 비교할 때 사용합니다.",
    "difficulty": "EASY",
    "keywords": [
      "비등가 조인",
      "Non-Equi Join",
      "부등호조인"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-join"
  },
  {
    "id": "EXP_DB1_049",
    "subject": "데이터베이스구축",
    "category": "데이터베이스 언어",
    "type": "SHORT_ANSWER",
    "question": "SQL을 관계대수와 관계해석의 관점에서 분류할 때, 사용자가 \"무엇(What)\"을 원하는지만 선언하고 \"어떻게(How)\" 유도할지는 기술하지 않는 비절차적 특성을 갖는 기초 이론은 무엇인가?",
    "answer": "관계해석",
    "explanation": "관계해석(Relational Calculus)은 원하는 결과(What)만을 명시하는 비절차적 언어입니다. 절차적 연산 순서를 명시하는 것은 관계대수(Relational Algebra)입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "관계해석",
      "비절차적언어",
      "What"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-theory"
  },
  {
    "id": "EXP_DB1_050",
    "subject": "데이터베이스구축",
    "category": "SQL DML",
    "type": "SHORT_ANSWER",
    "question": "SELECT 문에서 정렬 기준을 명시하는 ORDER BY 절에서 오름차순과 내림차순 정렬을 지정할 때 각각 사용하는 예약어 2가지는 무엇인가?",
    "answer": "ASC, DESC",
    "explanation": "ASC는 오름차순(기본값), DESC는 내림차순 정렬 예약어입니다.",
    "difficulty": "EASY",
    "keywords": [
      "ASC, DESC",
      "ORDER BY",
      "정렬예약어"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-dml"
  },
  {
    "id": "EXP_DB2_002",
    "subject": "데이터베이스구축",
    "category": "트랜잭션 격리수준",
    "type": "SHORT_ANSWER",
    "question": "대부분의 상용 RDBMS(Oracle, SQL Server 등)의 기본 격리수준으로, COMMIT이 완료된 유효한 데이터만 읽을 수 있어 Dirty Read를 방지하는 단계는 무엇인가?",
    "answer": "READ COMMITTED",
    "explanation": "READ COMMITTED는 커밋된 데이터만 읽어 Dirty Read를 막지만, 동일 트랜잭션 내 재조회 시 결과가 달라지는 Non-repeatable Read는 발생할 수 있습니다.",
    "difficulty": "EASY",
    "keywords": [
      "READ COMMITTED",
      "기본격리수준",
      "커밋된데이터조회"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-isolation"
  },
  {
    "id": "EXP_DB2_003",
    "subject": "데이터베이스구축",
    "category": "트랜잭션 격리수준",
    "type": "SHORT_ANSWER",
    "question": "하나의 트랜잭션 내에서 동일한 SELECT 쿼리를 여러 번 실행하더라도 항상 동일한 데이터를 반환하도록 스냅샷을 보장하는 MySQL(InnoDB) 기본 격리수준은 무엇인가?",
    "answer": "REPEATABLE READ",
    "explanation": "REPEATABLE READ는 트랜잭션 시작 시점의 스냅샷을 유지하여 Non-repeatable Read를 방지합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "REPEATABLE READ",
      "격리수준",
      "반복읽기보장"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-isolation"
  },
  {
    "id": "EXP_DB2_004",
    "subject": "데이터베이스구축",
    "category": "트랜잭션 격리수준",
    "type": "SHORT_ANSWER",
    "question": "트랜잭션들이 완전히 순차적으로(직렬로) 실행되는 것처럼 완벽히 격리하여 Dirty Read, Non-repeatable Read, Phantom Read를 모두 차단하는 최고 격리수준은 무엇인가?",
    "answer": "SERIALIZABLE",
    "explanation": "SERIALIZABLE은 데이터 일관성을 100% 보장하지만 동시 처리 성능(Throughput)이 가장 떨어집니다.",
    "difficulty": "EASY",
    "keywords": [
      "SERIALIZABLE",
      "최고격리수준",
      "직렬화"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-isolation"
  },
  {
    "id": "EXP_DB2_005",
    "subject": "데이터베이스구축",
    "category": "트랜잭션 이상현상",
    "type": "SHORT_ANSWER",
    "question": "트랜잭션 A가 데이터를 수정한 후 COMMIT하기 전에 트랜잭션 B가 해당 수정본을 읽었으나, 이후 A가 ROLLBACK되어 B가 무효한 쓰레기 값을 보유하게 되는 이상현상은 무엇인가?",
    "answer": "Dirty Read",
    "explanation": "Dirty Read(오독)는 커밋되지 않은 미완성 변경 데이터를 읽을 때 발생합니다.",
    "difficulty": "EASY",
    "keywords": [
      "Dirty Read",
      "오독",
      "트랜잭션이상현상"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-isolation"
  },
  {
    "id": "EXP_DB2_006",
    "subject": "데이터베이스구축",
    "category": "트랜잭션 이상현상",
    "type": "SHORT_ANSWER",
    "question": "하나의 트랜잭션 내에서 같은 튜플을 두 번 조회하는 도중 다른 트랜잭션이 해당 튜플을 UPDATE 및 커밋하여 두 번의 조회 결과 값이 서로 달라지는 현상은 무엇인가?",
    "answer": "Non-repeatable Read",
    "explanation": "Non-repeatable Read(비반복 읽기)는 동일 트랜잭션 내에서 데이터 행의 값이 바뀌어 나타나는 현상입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "Non-repeatable Read",
      "비반복읽기",
      "트랜잭션이상"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-isolation"
  },
  {
    "id": "EXP_DB2_007",
    "subject": "데이터베이스구축",
    "category": "트랜잭션 이상현상",
    "type": "SHORT_ANSWER",
    "question": "하나의 트랜잭션 내에서 동일한 범위(Range)의 쿼리를 두 번 실행했을 때, 다른 트랜잭션이 새로운 행을 INSERT 및 커밋하여 이전에 없던 유령 행이 나타나는 현상은 무엇인가?",
    "answer": "Phantom Read",
    "explanation": "Phantom Read(유령 읽기)는 범위 조건 검색 시 새로운 레코드가 불쑥 나타나거나 사라지는 현상입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "Phantom Read",
      "유령읽기",
      "범위검색이상"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-isolation"
  },
  {
    "id": "EXP_DB2_008",
    "subject": "데이터베이스구축",
    "category": "물리 데이터베이스",
    "type": "SHORT_ANSWER",
    "question": "인덱스의 리프 블록(Leaf Block)이 실제 데이터 페이지와 일치하여 물리적으로 키 순서대로 정렬되어 저장되며, 테이블당 오직 1개만 생성 가능한 인덱스는 무엇인가?",
    "answer": "클러스터드 인덱스",
    "explanation": "클러스터드 인덱스(Clustered Index, 군집 인덱스)는 실제 데이터 행 자체가 인덱스 키 순서로 정렬되어 범위 검색(BETWEEN) 속도가 매우 뛰어납니다.",
    "difficulty": "EASY",
    "keywords": [
      "클러스터드 인덱스",
      "Clustered Index",
      "물리정렬"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-index"
  },
  {
    "id": "EXP_DB2_010",
    "subject": "데이터베이스구축",
    "category": "물리 데이터베이스",
    "type": "SHORT_ANSWER",
    "question": "성별(남/여)이나 결제여부(Y/N)처럼 카디널리티(데이터 값의 종류)가 매우 적은 대용량 컬럼에 적합하며, 데이터를 0과 1의 비트 배열로 관리하는 인덱스는 무엇인가?",
    "answer": "비트맵 인덱스",
    "explanation": "비트맵 인덱스(Bitmap Index)는 카디널리티가 낮은 컬럼의 다중 조건 검색 및 대용량 DW(데이터웨어하우스) 배치 분석에 매우 효과적입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "비트맵 인덱스",
      "Bitmap Index",
      "낮은카디널리티"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-index"
  },
  {
    "id": "EXP_DB2_011",
    "subject": "데이터베이스구축",
    "category": "물리 데이터베이스",
    "type": "SHORT_ANSWER",
    "question": "데이터 파티셔닝(Partitioning) 기법 중 연속된 날짜(예: 2024년 1월, 2월 등)나 숫자 범위를 기준으로 대용량 테이블을 물리적으로 분할 저장하는 방식은 무엇인가?",
    "answer": "범위 분할",
    "explanation": "범위 분할(Range Partitioning)은 날짜나 시계열 데이터를 관리할 때 가장 보편적으로 쓰이는 파티셔닝 방식입니다.",
    "difficulty": "EASY",
    "keywords": [
      "범위 분할",
      "Range Partitioning",
      "파티셔닝"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-partitioning"
  },
  {
    "id": "EXP_DB2_012",
    "subject": "데이터베이스구축",
    "category": "물리 데이터베이스",
    "type": "SHORT_ANSWER",
    "question": "데이터 파티셔닝 기법 중 파티션 키 컬럼에 해시 함수를 적용하여 연산된 결과값에 따라 데이터를 여러 파티션에 균등하게 분산 배치하는 방식은 무엇인가?",
    "answer": "해시 분할",
    "explanation": "해시 분할(Hash Partitioning)은 데이터의 고른 분산으로 특정 파티션에 병목이 집중되는 현상을 방지합니다.",
    "difficulty": "EASY",
    "keywords": [
      "해시 분할",
      "Hash Partitioning",
      "균등분산"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-partitioning"
  },
  {
    "id": "EXP_DB2_013",
    "subject": "데이터베이스구축",
    "category": "물리 데이터베이스",
    "type": "SHORT_ANSWER",
    "question": "데이터 파티셔닝 기법 중 지역 코드(서울, 경기, 부산)나 지점 코드처럼 명시적으로 정해진 개별 값들의 목록을 기준으로 데이터를 분할하는 방식은 무엇인가?",
    "answer": "목록 분할",
    "explanation": "목록 분할(List Partitioning)은 고정된 특정 카테고리나 코드 목록별로 파티션을 매핑합니다.",
    "difficulty": "EASY",
    "keywords": [
      "목록 분할",
      "List Partitioning",
      "코드목록분할"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-partitioning"
  },
  {
    "id": "EXP_DB2_014",
    "subject": "데이터베이스구축",
    "category": "물리 데이터베이스",
    "type": "SHORT_ANSWER",
    "question": "대용량 데이터를 효율적으로 관리하기 위해 1차로 범위 분할(Range)을 적용한 후 각 파티션 내부를 다시 해시 분할(Hash)로 세분화하는 2단계 복합 파티셔닝 방식은 무엇인가?",
    "answer": "복합 분할",
    "explanation": "복합 분할(Composite Partitioning)은 서브 파티셔닝(Sub-partitioning) 기술을 결합하여 대규모 데이터를 최적 관리합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "복합 분할",
      "Composite Partitioning",
      "2단계분할"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-partitioning"
  },
  {
    "id": "EXP_DB2_015",
    "subject": "데이터베이스구축",
    "category": "정규화",
    "type": "SHORT_ANSWER",
    "question": "복합 기본키 {학번, 과목코드} 중 기본키의 전체가 아니라 단지 {과목코드} 일부에만 특정 속성(과목명)이 종속되는 현상을 가리키는 용어는 무엇인가?",
    "answer": "부분 함수 종속",
    "explanation": "부분 함수 종속(Partial Functional Dependency)은 제2정규형(2NF)을 만족하기 위해 반드시 분리 제거해야 합니다.",
    "difficulty": "EASY",
    "keywords": [
      "부분 함수 종속",
      "Partial FD",
      "2NF대상"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-normalization"
  },
  {
    "id": "EXP_DB2_016",
    "subject": "데이터베이스구축",
    "category": "정규화",
    "type": "SHORT_ANSWER",
    "question": "속성 X가 Y를 결정하고(X → Y), 다시 Y가 Z를 결정하여(Y → Z) 논리적으로 X가 Z를 결정하게 되는(X → Z) 종속 관계를 무엇이라 하는가?",
    "answer": "이행적 함수 종속",
    "explanation": "이행적 함수 종속(Transitive Functional Dependency)은 제3정규형(3NF)에서 별도 테이블로 분리 제거합니다.",
    "difficulty": "EASY",
    "keywords": [
      "이행적 함수 종속",
      "Transitive FD",
      "3NF대상"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-normalization"
  },
  {
    "id": "EXP_DB2_017",
    "subject": "데이터베이스구축",
    "category": "정규화",
    "type": "SHORT_ANSWER",
    "question": "제3정규형을 만족하는 릴레이션에서 모든 결정자(Determinant)가 반드시 후보키(Candidate Key)가 되도록 강제하는 정규형은 무엇인가?",
    "answer": "BCNF",
    "explanation": "보이스-코드 정규형(BCNF, Boyce-Codd Normal Form)은 후보키가 아닌 결정자를 제거하는 강한 제3정규형입니다.",
    "difficulty": "EASY",
    "keywords": [
      "BCNF",
      "Boyce-Codd",
      "결정자후보키"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-normalization"
  },
  {
    "id": "EXP_DB2_018",
    "subject": "데이터베이스구축",
    "category": "정규화",
    "type": "SHORT_ANSWER",
    "question": "하나의 릴레이션 내에서 어떤 속성 X의 값 하나에 다른 속성 Y의 다중 값들이 독립적으로 대응되는 다치 종속(MVD)을 제거하는 정규형은 무엇인가?",
    "answer": "제4정규형",
    "explanation": "제4정규형(4NF)은 다치 종속(Multi-Valued Dependency, A ->> B)을 분리 제거하는 단계입니다.",
    "difficulty": "EASY",
    "keywords": [
      "제4정규형",
      "4NF",
      "다치종속제거"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-normalization"
  },
  {
    "id": "EXP_DB2_019",
    "subject": "데이터베이스구축",
    "category": "정규화",
    "type": "SHORT_ANSWER",
    "question": "테이블을 분해했다가 다시 무손실 조인할 때 원래 없던 이상한 거짓 튜플이 생기지 않도록 조인 종속성(JD)을 만족시키는 최고 수준의 정규형은 무엇인가?",
    "answer": "제5정규형",
    "explanation": "제5정규형(5NF, PJ/NF)은 조인 종속성(Join Dependency)을 제거하여 후보키만을 통해 무손실 분해/조인이 가능하도록 합니다.",
    "difficulty": "EASY",
    "keywords": [
      "제5정규형",
      "5NF",
      "조인종속제거"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-normalization"
  },
  {
    "id": "EXP_DB2_020",
    "subject": "데이터베이스구축",
    "category": "데이터 모델링",
    "type": "SHORT_ANSWER",
    "question": "데이터베이스 모델링 3단계 중 요구사항 명세서를 바탕으로 핵심 엔티티와 관계를 도출하여 개념적 스키마(개체-관계 다이어그램, ERD)를 생성하는 단계는 무엇인가?",
    "answer": "개념적 설계",
    "explanation": "개념적 설계(Conceptual Design)는 DBMS에 독립적인 추상화 단계로 핵심 산출물은 ERD입니다.",
    "difficulty": "EASY",
    "keywords": [
      "개념적 설계",
      "Conceptual Design",
      "ERD"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-modeling"
  },
  {
    "id": "EXP_DB2_021",
    "subject": "데이터베이스구축",
    "category": "데이터 모델링",
    "type": "SHORT_ANSWER",
    "question": "데이터베이스 모델링 3단계 중 개념 스키마를 바탕으로 목표 RDBMS에 맞게 정규화를 수행하고 외래키와 테이블 스키마를 정의하는 단계는 무엇인가?",
    "answer": "논리적 설계",
    "explanation": "논리적 설계(Logical Design)는 정규화, 매핑 룰, 트랜잭션 인터페이스를 설계하는 단계입니다.",
    "difficulty": "EASY",
    "keywords": [
      "논리적 설계",
      "Logical Design",
      "정규화수행"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-modeling"
  },
  {
    "id": "EXP_DB2_022",
    "subject": "데이터베이스구축",
    "category": "데이터 모델링",
    "type": "SHORT_ANSWER",
    "question": "데이터베이스 모델링 3단계 중 실제 특정 하드웨어 및 DBMS 엔진의 저장 구조를 고려하여 인덱스, 파티셔닝, 반정규화, 테이블스페이스를 설계하는 단계는 무엇인가?",
    "answer": "물리적 설계",
    "explanation": "물리적 설계(Physical Design)는 성능 향상을 위해 저장 장치 레코드 배치, 반정규화, 인덱스를 세부 설계합니다.",
    "difficulty": "EASY",
    "keywords": [
      "물리적 설계",
      "Physical Design",
      "인덱스및반정규화"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-modeling"
  },
  {
    "id": "EXP_DB2_023",
    "subject": "데이터베이스구축",
    "category": "키(Key)의 개념",
    "type": "SHORT_ANSWER",
    "question": "릴레이션에서 튜플을 고유하게 식별할 수 있는 유일성(Uniqueness)은 만족하지만, 불필요한 속성이 포함되어 최소성(Minimality)은 만족하지 못하는 키는 무엇인가?",
    "answer": "슈퍼키",
    "explanation": "슈퍼키(Super Key)는 유일성만 만족합니다. 유일성과 최소성을 모두 만족하는 키는 후보키(Candidate Key)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "슈퍼키",
      "Super Key",
      "유일성만만족"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-keys"
  },
  {
    "id": "EXP_DB2_025",
    "subject": "데이터베이스구축",
    "category": "데이터 모델링",
    "type": "SHORT_ANSWER",
    "question": "부모 엔티티의 기본키가 자식 엔티티의 기본키(PK)의 일부(구성원)로 그대로 상속되어 상속받는 엔티티 관계를 무엇이라 하는가?",
    "answer": "식별 관계",
    "explanation": "식별 관계(Identifying Relationship)는 부모 없이는 자식이 독립적으로 존재할 수 없는 강한 종속 관계이며 실선으로 표기합니다.",
    "difficulty": "EASY",
    "keywords": [
      "식별 관계",
      "Identifying",
      "실선표기"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-modeling"
  },
  {
    "id": "EXP_DB2_026",
    "subject": "데이터베이스구축",
    "category": "데이터 모델링",
    "type": "SHORT_ANSWER",
    "question": "부모 엔티티의 기본키가 자식 엔티티의 일반 속성(외래키 FK)으로만 상속되어 자식 엔티티가 부모 없이도 독립적으로 존재 가능한 관계를 무엇이라 하는가?",
    "answer": "비식별 관계",
    "explanation": "비식별 관계(Non-identifying Relationship)는 약한 종속 관계이며 점선으로 표기합니다.",
    "difficulty": "EASY",
    "keywords": [
      "비식별 관계",
      "Non-identifying",
      "점선표기"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-modeling"
  },
  {
    "id": "EXP_DB2_028",
    "subject": "데이터베이스구축",
    "category": "데이터 무결성",
    "type": "SHORT_ANSWER",
    "question": "자식 릴레이션의 외래키(Foreign Key) 값은 반드시 참조하는 부모 릴레이션의 기본키 값과 동일하거나 또는 NULL이어야 한다는 무결성 규칙은 무엇인가?",
    "answer": "참조 무결성",
    "explanation": "참조 무결성(Referential Integrity)은 존재하지 않는 부모 레코드를 참조하는 고아 레코드(Orphan Record)의 발생을 차단합니다.",
    "difficulty": "EASY",
    "keywords": [
      "참조 무결성",
      "Referential Integrity",
      "외래키규칙"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-integrity"
  },
  {
    "id": "EXP_DB2_029",
    "subject": "데이터베이스구축",
    "category": "데이터 무결성",
    "type": "SHORT_ANSWER",
    "question": "학생 테이블의 '학년' 속성에 1부터 4 사이의 정수만 입력되도록 허용 범위를 제한하는 것처럼 속성 값이 사전에 정해진 유효 범위를 준수해야 하는 무결성 제약조건은 무엇인가?",
    "answer": "도메인 무결성",
    "explanation": "도메인 무결성(Domain Integrity)은 속성 값의 타입, 형식, 범위(예: 나이는 양수)를 검증합니다.",
    "difficulty": "EASY",
    "keywords": [
      "도메인 무결성",
      "Domain Integrity",
      "허용범위"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-integrity"
  },
  {
    "id": "EXP_DB2_030",
    "subject": "데이터베이스구축",
    "category": "데이터베이스 회복",
    "type": "SHORT_ANSWER",
    "question": "트랜잭션 회복 연산 중 장애 발생 시 트랜잭션의 변경 작업이 시작된 이후의 로그 기록을 바탕으로 취소(취소하여 원래대로 되돌림)하는 연산은 무엇인가?",
    "answer": "UNDO",
    "explanation": "UNDO(취소)는 완료되지 못한 미완성 트랜잭션의 수정을 취소하여 이전 상태로 복구합니다. 이미 COMMIT된 작업을 재실행하는 것은 REDO(재실행)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "UNDO",
      "취소연산",
      "회복"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-recovery"
  },
  {
    "id": "EXP_DB2_031",
    "subject": "데이터베이스구축",
    "category": "데이터베이스 회복",
    "type": "SHORT_ANSWER",
    "question": "트랜잭션 회복 연산 중 이미 성공적으로 COMMIT 완료된 트랜잭션의 변경 내용이 장애로 디스크에 반영되지 못했을 때 로그를 바탕으로 재실행하여 반영하는 연산은 무엇인가?",
    "answer": "REDO",
    "explanation": "REDO(재실행)는 커밋된 트랜잭션의 영속성을 보장하기 위해 로그를 읽어 변경 사항을 디스크에 다시 씁니다.",
    "difficulty": "EASY",
    "keywords": [
      "REDO",
      "재실행연산",
      "영속성보장"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-recovery"
  },
  {
    "id": "EXP_DB2_032",
    "subject": "데이터베이스구축",
    "category": "데이터베이스 회복",
    "type": "SHORT_ANSWER",
    "question": "회복 기법 중 트랜잭션 수행 도중에는 변경 내용을 로그 파일에만 기록해두고, 트랜잭션이 완전히 COMMIT된 이후에만 실제 데이터베이스 디스크에 반영하는 기법은 무엇인가?",
    "answer": "지연 갱신 기법",
    "explanation": "지연 갱신(Deferred Update) 기법은 커밋 전까지 디스크를 수정하지 않으므로 장애 시 UNDO가 필요 없고 오직 REDO 연산만 수행합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "지연 갱신 기법",
      "Deferred Update",
      "REDO만수행"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-recovery"
  },
  {
    "id": "EXP_DB2_033",
    "subject": "데이터베이스구축",
    "category": "데이터베이스 회복",
    "type": "SHORT_ANSWER",
    "question": "회복 기법 중 트랜잭션 수행 도중 발생한 변경 결과를 디스크에 즉시 반영하되, 장애 발생 시 커밋되지 않은 트랜잭션은 로그를 통해 UNDO하는 기법은 무엇인가?",
    "answer": "즉시 갱신 기법",
    "explanation": "즉시 갱신(Immediate Update) 기법은 디스크가 즉시 갱신되므로 미완료 트랜잭션에 대해서는 UNDO, 완료된 트랜잭션에 대해서는 REDO가 모두 필요합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "즉시 갱신 기법",
      "Immediate Update",
      "REDO와UNDO"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-recovery"
  },
  {
    "id": "EXP_DB2_034",
    "subject": "데이터베이스구축",
    "category": "데이터베이스 회복",
    "type": "SHORT_ANSWER",
    "question": "로그 파일의 전체를 처음부터 끝까지 검색하지 않도록 주기적으로 주기억장치의 버퍼 내용을 디스크에 강제 플러시하고 검사점을 기록하여 회복 시간을 단축하는 기법은 무엇인가?",
    "answer": "체크포인트 회복 기법",
    "explanation": "체크포인트(Checkpoint, 검사점) 회복 기법은 장애 시 가장 최근의 검사점 이후의 로그만 검사하여 불필요한 REDO/UNDO 작업을 대폭 줄입니다.",
    "difficulty": "EASY",
    "keywords": [
      "체크포인트 회복 기법",
      "검사점",
      "Checkpoint"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-recovery"
  },
  {
    "id": "EXP_DB2_035",
    "subject": "데이터베이스구축",
    "category": "병행 제어",
    "type": "SHORT_ANSWER",
    "question": "로킹(Locking) 단위가 너무 클 때(예: 데이터베이스 전체 잠금) 병행성(동시성 수준)은 어떻게 되는가 (높아진다 / 낮아진다)?",
    "answer": "낮아진다",
    "explanation": "로킹 단위가 커지면 관리할 락의 수는 줄어 오버헤드는 감소하지만, 다른 트랜잭션들이 접근하지 못해 병행성(동시성)은 급격히 낮아집니다.",
    "difficulty": "EASY",
    "keywords": [
      "낮아진다",
      "로킹단위",
      "병행성감소"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-concurrency"
  },
  {
    "id": "EXP_DB2_036",
    "subject": "데이터베이스구축",
    "category": "병행 제어",
    "type": "SHORT_ANSWER",
    "question": "로킹 단위가 너무 작을 때(예: 레코드나 필드 단위 잠금) 시스템이 관리해야 할 락(Lock)의 총 개수와 오버헤드는 어떻게 되는가 (증가한다 / 감소한다)?",
    "answer": "증가한다",
    "explanation": "로킹 단위가 세밀해질수록 동시 처리성은 극대화되지만, 관리해야 할 락 테이블의 크기와 관리 오버헤드는 크게 증가합니다.",
    "difficulty": "EASY",
    "keywords": [
      "증가한다",
      "로킹단위오버헤드"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-concurrency"
  },
  {
    "id": "EXP_DB2_037",
    "subject": "데이터베이스구축",
    "category": "병행 제어",
    "type": "SHORT_ANSWER",
    "question": "공유 락(Shared Lock, S-Lock)이 걸려있는 데이터에 대해 다른 트랜잭션이 추가로 획득할 수 있는 락은 공유 락(S)인가 배타 락(X)인가?",
    "answer": "공유 락",
    "explanation": "공유 락은 읽기 전용 락으로 다른 트랜잭션의 동시 읽기(S-Lock)는 허용하지만, 데이터 수정을 위한 배타 락(Exclusive Lock, X-Lock)은 허용하지 않습니다.",
    "difficulty": "EASY",
    "keywords": [
      "공유 락",
      "Shared Lock",
      "S-Lock호환성"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-concurrency"
  },
  {
    "id": "EXP_DB2_038",
    "subject": "데이터베이스구축",
    "category": "병행 제어",
    "type": "SHORT_ANSWER",
    "question": "2단계 로킹 규약(2PL)에서 트랜잭션은 락을 새롭게 획득하기만 하고 해제는 절대 할 수 없는 단계를 무엇이라 하는가?",
    "answer": "확장 단계",
    "explanation": "2PL은 락을 획득만 하는 확장 단계(Growing Phase)와 락을 해제만 하는 축소 단계(Shrinking Phase)로 엄격히 구분됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "확장 단계",
      "Growing Phase",
      "2PL"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-concurrency"
  },
  {
    "id": "EXP_DB2_039",
    "subject": "데이터베이스구축",
    "category": "분산 데이터베이스",
    "type": "SHORT_ANSWER",
    "question": "분산 데이터베이스에서 서울 본사 서버와 부산 지사 서버에 물리적으로 나뉜 테이블의 실제 IP나 저장 경로를 몰라도 논리 명칭만으로 조회 가능한 투명성은 무엇인가?",
    "answer": "위치 투명성",
    "explanation": "위치 투명성(Location Transparency)은 사이트의 물리적 위치가 질의문에 영향을 주지 않는 특성입니다.",
    "difficulty": "EASY",
    "keywords": [
      "위치 투명성",
      "Location Transparency",
      "분산투명성"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-distributed"
  },
  {
    "id": "EXP_DB2_040",
    "subject": "데이터베이스구축",
    "category": "분산 데이터베이스",
    "type": "SHORT_ANSWER",
    "question": "분산 데이터베이스 투명성 중 하나의 큰 테이블이 여러 세부 파티션 조각으로 나뉘어 여러 노드에 분산 저장되어 있더라도 사용자는 마치 단일 테이블인 것처럼 조회할 수 있는 특성은 무엇인가?",
    "answer": "분할 투명성",
    "explanation": "분할 투명성(Fragmentation Transparency)은 단편화 구조를 사용자로부터 은닉합니다.",
    "difficulty": "EASY",
    "keywords": [
      "분할 투명성",
      "Fragmentation Transparency",
      "단편화은닉"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-distributed"
  },
  {
    "id": "EXP_DB2_041",
    "subject": "데이터베이스구축",
    "category": "분산 데이터베이스",
    "type": "SHORT_ANSWER",
    "question": "분산 환경에서 데이터 가용성을 위해 동일 테이블을 서울과 도쿄 데이터센터에 실시간 복제해 두었으나 사용자에게는 1개의 단일 테이블로 투명하게 서비스되는 특성은 무엇인가?",
    "answer": "복제 투명성",
    "explanation": "복제 투명성(Replication Transparency)은 여러 복제본 간의 일관성 동기화 작업을 시스템이 백그라운드에서 처리합니다.",
    "difficulty": "EASY",
    "keywords": [
      "복제 투명성",
      "Replication Transparency",
      "사본관리"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-distributed"
  },
  {
    "id": "EXP_DB2_042",
    "subject": "데이터베이스구축",
    "category": "분산 데이터베이스",
    "type": "SHORT_ANSWER",
    "question": "분산 데이터베이스 투명성 중 특정 노드의 서버나 통신 네트워크에 장애가 발생하더라도 전체 데이터베이스 시스템의 트랜잭션 무결성이 유지되는 특성은 무엇인가?",
    "answer": "장애 투명성",
    "explanation": "장애 투명성(Failure Transparency)은 국소적 하드웨어/통신 장애에도 불구하고 시스템이 올바르게 작업을 완수하도록 보장합니다.",
    "difficulty": "EASY",
    "keywords": [
      "장애 투명성",
      "Failure Transparency",
      "내고장성"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-distributed"
  },
  {
    "id": "EXP_DB2_043",
    "subject": "데이터베이스구축",
    "category": "분산 시스템 이론",
    "type": "SHORT_ANSWER",
    "question": "에릭 브루어(Eric Brewer)의 CAP 정리에서 3대 특성 중 네트워크 분할 장애가 발생하더라도 정상 노드들이 즉시 응답을 반환할 수 있어야 한다는 가용성의 영문 약칭은 무엇인가?",
    "answer": "A",
    "explanation": "CAP 정리는 일관성(Consistency: C), 가용성(Availability: A), 분할 내구성(Partition Tolerance: P) 중 동시 2가지만 충족 가능함을 증명한 이론입니다.",
    "difficulty": "EASY",
    "keywords": [
      "A",
      "Availability",
      "가용성",
      "CAP정리"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-nosql"
  },
  {
    "id": "EXP_DB2_044",
    "subject": "데이터베이스구축",
    "category": "NoSQL 데이터베이스",
    "type": "SHORT_ANSWER",
    "question": "NoSQL 데이터 모델 중 Redis, Memcached처럼 가장 단순한 구조로 키와 값의 일대일 매핑만을 지원하여 초고속 조회가 가능한 유형은 무엇인가?",
    "answer": "Key-Value",
    "explanation": "Key-Value 모델은 데이터 구조가 가장 단순하여 캐싱 및 세션 저장소로 광범위하게 쓰입니다.",
    "difficulty": "EASY",
    "keywords": [
      "Key-Value",
      "키값저장소",
      "NoSQL유형"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-nosql"
  },
  {
    "id": "EXP_DB2_045",
    "subject": "데이터베이스구축",
    "category": "NoSQL 데이터베이스",
    "type": "SHORT_ANSWER",
    "question": "NoSQL 데이터 모델 중 MongoDB, CouchDB처럼 JSON, BSON, XML 등의 유연한 계층형 문서 형식으로 데이터를 저장하고 검색하는 유형은 무엇인가?",
    "answer": "문서형 데이터베이스",
    "explanation": "문서형(Document Store) NoSQL은 스키마리스(Schema-less) 특성으로 복합 중첩 객체를 유연하게 저장합니다.",
    "difficulty": "EASY",
    "keywords": [
      "문서형 데이터베이스",
      "Document Store",
      "MongoDB"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-nosql"
  },
  {
    "id": "EXP_DB2_046",
    "subject": "데이터베이스구축",
    "category": "반정규화",
    "type": "SHORT_ANSWER",
    "question": "정규화된 시스템에서 빈번한 조인(Join)으로 인한 성능 저하를 해결하기 위해 시스템의 일관성을 일부 희생하고 의도적으로 중복, 병합을 수행하는 기법은 무엇인가?",
    "answer": "반정규화",
    "explanation": "반정규화(De-normalization, 역정규화)는 데이터 조회 성능 향상을 목적으로 테이블 병합, 컬럼 중복 등을 수행합니다.",
    "difficulty": "EASY",
    "keywords": [
      "반정규화",
      "역정규화",
      "조인성능개선"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-denormalization"
  },
  {
    "id": "EXP_DB2_047",
    "subject": "데이터베이스구축",
    "category": "반정규화",
    "type": "SHORT_ANSWER",
    "question": "반정규화 기법 중 한 테이블의 컬럼 수가 너무 많아(예: 100개 이상) 디스크 I/O 블록 경합이 발생할 때 컬럼 사용 빈도에 따라 테이블을 1:1로 수직 쪼개는 기법은 무엇인가?",
    "answer": "테이블 수직 분할",
    "explanation": "테이블 수직 분할(Vertical Partitioning)은 자주 조회되는 핵심 컬럼과 거의 조회되지 않는 컬럼을 분리하여 I/O 성능을 높입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "테이블 수직 분할",
      "Vertical Partitioning",
      "반정규화"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-denormalization"
  },
  {
    "id": "EXP_DB2_048",
    "subject": "데이터베이스구축",
    "category": "반정규화",
    "type": "SHORT_ANSWER",
    "question": "특정 테이블의 행(레코드) 수가 수천만 건에 달할 때 기간별 또는 지점별로 행 단위로 수평 쪼개어 별도의 테이블들로 분리하는 기법은 무엇인가?",
    "answer": "테이블 수평 분할",
    "explanation": "테이블 수평 분할(Horizontal Partitioning)은 행(레코드)을 기준으로 쪼개어 검색 범위를 축소시킵니다.",
    "difficulty": "EASY",
    "keywords": [
      "테이블 수평 분할",
      "Horizontal Partitioning",
      "반정규화"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-denormalization"
  },
  {
    "id": "EXP_DB2_049",
    "subject": "데이터베이스구축",
    "category": "데이터베이스 설계",
    "type": "SHORT_ANSWER",
    "question": "데이터베이스의 상태를 변경시키는 작업의 논리적 기본 단위로, 원자성(A), 일관성(C), 격리성(I), 영속성(D)의 4대 특성을 갖는 개념은 무엇인가?",
    "answer": "트랜잭션",
    "explanation": "트랜잭션(Transaction)은 전부 실행되거나 전부 취소(All or Nothing)되어야 하는 작업의 완전한 논리 단위입니다.",
    "difficulty": "EASY",
    "keywords": [
      "트랜잭션",
      "Transaction",
      "ACID"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-transaction"
  },
  {
    "id": "EXP_DB2_050",
    "subject": "데이터베이스구축",
    "category": "데이터베이스 설계",
    "type": "SHORT_ANSWER",
    "question": "관계형 데이터베이스 릴레이션에서 속성(Attribute)들의 총 개수를 나타내는 용어는 무엇인가?",
    "answer": "디그리",
    "explanation": "디그리(Degree, 차수)는 속성의 개수입니다. 튜플(행)의 총 개수는 카디널리티(Cardinality, 기수)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "디그리",
      "Degree",
      "차수",
      "속성수"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-theory"
  },
  {
    "id": "EXP_IS_001",
    "subject": "정보시스템구축관리",
    "category": "품질 표준",
    "type": "SHORT_ANSWER",
    "question": "ISO/IEC 9126 소프트웨어 품질 특성 중 명시된 조건에서 시스템이 오류 없이 지속적으로 정상 동작을 유지할 수 있는 정도를 나타내는 품질 특성은 무엇인가?",
    "answer": "신뢰성",
    "explanation": "신뢰성(Reliability)은 성숙성, 고장 허용성, 회복성 등의 세부 부특성을 포함합니다.",
    "difficulty": "EASY",
    "keywords": [
      "신뢰성",
      "Reliability",
      "ISO 9126"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-quality"
  },
  {
    "id": "EXP_IS_002",
    "subject": "정보시스템구축관리",
    "category": "품질 표준",
    "type": "SHORT_ANSWER",
    "question": "ISO/IEC 9126 소프트웨어 품질 특성 중 소프트웨어를 다른 하드웨어나 운영체제 환경으로 쉽게 변환하거나 이전하여 실행할 수 있는 능력을 나타내는 특성은 무엇인가?",
    "answer": "이식성",
    "explanation": "이식성(Portability)은 적용성, 설치성, 대체성, 공존성 등의 부특성을 가집니다.",
    "difficulty": "EASY",
    "keywords": [
      "이식성",
      "Portability",
      "환경이전"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-quality"
  },
  {
    "id": "EXP_IS_003",
    "subject": "정보시스템구축관리",
    "category": "품질 표준",
    "type": "SHORT_ANSWER",
    "question": "ISO/IEC 25010(SQuaRE) 표준에서 기존 ISO/IEC 9126의 6대 품질 특성에 새롭게 독립적인 주특성으로 추가된 2가지 품질 특성은 호환성과 무엇인가?",
    "answer": "보안성",
    "explanation": "ISO/IEC 25010은 보안성(Security)과 호환성(Compatibility)을 주특성으로 신설하여 총 8대 품질 모델을 구성했습니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "보안성",
      "Security",
      "ISO 25010"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-quality"
  },
  {
    "id": "EXP_IS_004",
    "subject": "정보시스템구축관리",
    "category": "프로세스 성숙도",
    "type": "SHORT_ANSWER",
    "question": "CMMI(통합 능력 성숙도 모델)의 5단계 성숙도 레벨 중 조직 차원의 표준 프로세스가 문서화되어 전사적으로 체계화된 3단계의 명칭은 무엇인가?",
    "answer": "정의됨",
    "explanation": "CMMI 5단계는 1단계 초기(Initial) → 2단계 관리됨(Managed) → 3단계 정의됨(Defined) → 4단계 정량적 관리됨 → 5단계 최적화 순서입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "정의됨",
      "Defined",
      "CMMI 3단계"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-cmmi"
  },
  {
    "id": "EXP_IS_005",
    "subject": "정보시스템구축관리",
    "category": "프로세스 성숙도",
    "type": "SHORT_ANSWER",
    "question": "CMMI 5단계 중 프로젝트 목표 달성을 위해 통계적 기법과 정량적 데이터 측정을 활용하여 프로세스를 예측하고 통제하는 4단계의 명칭은 무엇인가?",
    "answer": "정량적 관리됨",
    "explanation": "4단계 정량적 관리됨(Quantitatively Managed)은 측정 지표와 통계적 기법을 프로세스 통제에 활용합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "정량적 관리됨",
      "Quantitatively Managed",
      "CMMI 4단계"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-cmmi"
  },
  {
    "id": "EXP_IS_006",
    "subject": "정보시스템구축관리",
    "category": "프로세스 성숙도",
    "type": "SHORT_ANSWER",
    "question": "CMMI 최고 단계인 5단계로, 지속적인 프로세스 혁신과 피드백을 통해 프로세스를 지속적으로 개선해 나가는 단계의 명칭은 무엇인가?",
    "answer": "최적화",
    "explanation": "5단계 최적화(Optimizing)는 신기술 도입과 결함 원인 분석을 통해 프로세스를 끊임없이 자체 혁신합니다.",
    "difficulty": "EASY",
    "keywords": [
      "최적화",
      "Optimizing",
      "CMMI 5단계"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-cmmi"
  },
  {
    "id": "EXP_IS_007",
    "subject": "정보시스템구축관리",
    "category": "프로세스 평가",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 프로세스 평가 및 개선을 위한 국제 표준 규격으로 ISO/IEC 15504라는 명칭으로도 불리는 표준의 이름은 무엇인가?",
    "answer": "SPICE",
    "explanation": "SPICE(Software Process Improvement and Capability dEtermination)는 0~5단계의 6개 프로세스 수행 수준을 제시합니다.",
    "difficulty": "EASY",
    "keywords": [
      "SPICE",
      "ISO 15504",
      "프로세스평가"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-spice"
  },
  {
    "id": "EXP_IS_008",
    "subject": "정보시스템구축관리",
    "category": "형상 관리",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 형상 관리(SCM) 4대 활동 중 소프트웨어 개발 주기 동안 만들어지는 각종 산출물에 고유 번호를 부여하고 형상 항목을 식별하는 활동은 무엇인가?",
    "answer": "형상 식별",
    "explanation": "형상 식별(Configuration Identification)은 베이스라인(기준선)을 수립하고 형상 항목의 명칭과 버전을 부여합니다.",
    "difficulty": "EASY",
    "keywords": [
      "형상 식별",
      "베이스라인",
      "형상관리활동"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-scm"
  },
  {
    "id": "EXP_IS_009",
    "subject": "정보시스템구축관리",
    "category": "형상 관리",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 형상 변경 요청이 들어왔을 때 형상 통제 위원회(CCB)가 그 타당성을 검토하고 승인, 변경 작업을 관리하는 활동은 무엇인가?",
    "answer": "형상 통제",
    "explanation": "형상 통제(Configuration Control)는 베이스라인의 무단 변경을 방지하고 공식 변경 승인 절차를 관리합니다.",
    "difficulty": "EASY",
    "keywords": [
      "형상 통제",
      "CCB",
      "변경승인"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-scm"
  },
  {
    "id": "EXP_IS_010",
    "subject": "정보시스템구축관리",
    "category": "형상 관리",
    "type": "SHORT_ANSWER",
    "question": "베이스라인의 무결성을 평가하기 위해 소프트웨어 형상 항목들이 요구사항과 일치하게 온전히 작성되었는지 공식적으로 검증하는 활동은 무엇인가?",
    "answer": "형상 감사",
    "explanation": "형상 감사(Configuration Audit)는 기능적/물리적 감사를 수행하여 형상 항목의 무결성을 보증합니다.",
    "difficulty": "EASY",
    "keywords": [
      "형상 감사",
      "Configuration Audit",
      "무결성검증"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-scm"
  },
  {
    "id": "EXP_IS_011",
    "subject": "정보시스템구축관리",
    "category": "형상 관리",
    "type": "SHORT_ANSWER",
    "question": "형상 관리에서 소프트웨어 개발 과정 중 특정 시점에 모든 팀원이 공식적으로 합의하고 승인하여 변경을 엄격히 통제하는 기준점을 무엇이라 하는가?",
    "answer": "베이스라인",
    "explanation": "베이스라인(Baseline, 기준선)은 이후 변경 사항을 추적하고 비교하는 기준이 됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "베이스라인",
      "Baseline",
      "기준선"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-scm"
  },
  {
    "id": "EXP_IS_012",
    "subject": "정보시스템구축관리",
    "category": "형상 관리",
    "type": "SHORT_ANSWER",
    "question": "형상 항목의 변경 요구를 공식적으로 접수하여 변경의 타당성, 위험도, 영향도를 심의하고 승인 여부를 결정하는 대표 기구의 약칭은 무엇인가?",
    "answer": "CCB",
    "explanation": "CCB(Configuration Control Board, 형상 통제 위원회)는 형상 변경의 승인과 통제를 총괄하는 의사결정 협의체입니다.",
    "difficulty": "EASY",
    "keywords": [
      "CCB",
      "형상통제위원회",
      "Configuration Control Board"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-scm"
  },
  {
    "id": "EXP_IS_013",
    "subject": "정보시스템구축관리",
    "category": "버전 관리",
    "type": "SHORT_ANSWER",
    "question": "버전 관리 도구 중 Git이나 Mercurial처럼 중앙 서버가 다운되어도 개발자의 로컬 저장소에서 독립적으로 커밋과 브랜치 작업을 완벽히 수행할 수 있는 저장소 유형은 무엇인가?",
    "answer": "분산 저장소 방식",
    "explanation": "분산 버전 관리(DVCS)는 모든 개발자가 전체 프로젝트 히스토리를 로컬에 복제하므로 오프라인 작업이 가능합니다.",
    "difficulty": "EASY",
    "keywords": [
      "분산 저장소 방식",
      "DVCS",
      "Git"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-scm"
  },
  {
    "id": "EXP_IS_014",
    "subject": "정보시스템구축관리",
    "category": "버전 관리",
    "type": "SHORT_ANSWER",
    "question": "버전 관리 도구 중 SVN이나 CVS처럼 하나의 중앙 원격 서버에 모든 리포지토리가 집중되어 클라이언트가 중앙 서버에 접속해야만 커밋할 수 있는 유형은 무엇인가?",
    "answer": "클라이언트 서버 방식",
    "explanation": "클라이언트/서버 방식(CVCS)은 중앙 서버에 변경 사항이 집중되므로 서버 장애 시 원격 커밋 작업이 중단됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "클라이언트 서버 방식",
      "CVCS",
      "SVN"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-scm"
  },
  {
    "id": "EXP_IS_015",
    "subject": "정보시스템구축관리",
    "category": "개발 방법론 테일러링",
    "type": "SHORT_ANSWER",
    "question": "프로젝트 특성에 맞게 소프트웨어 개발 방법론의 절차나 산출물을 조정하는 테일러링(Tailoring) 시 법적 규제나 정부 표준 가이드라인은 내부적 요인인가 외부적 요인인가?",
    "answer": "외부적 요인",
    "explanation": "법적 규제, 국제 표준, 고객사의 컴플라이언스는 외부적 요인에 속합니다. 개발팀의 역량, 기술 환경, 납기는 내부적 요인입니다.",
    "difficulty": "EASY",
    "keywords": [
      "외부적 요인",
      "테일러링요인",
      "법적규제"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-tailoring"
  },
  {
    "id": "EXP_IS_016",
    "subject": "정보시스템구축관리",
    "category": "재해 복구",
    "type": "SHORT_ANSWER",
    "question": "재해 복구(DR) 목표 지표 중 시스템에 중단 장애가 발생한 시점부터 다시 정상적으로 업무 서비스를 재개할 때까지 걸리는 최대 허용 시간의 약칭은 무엇인가?",
    "answer": "RTO",
    "explanation": "RTO(Recovery Time Objective, 목표 복구 시간)는 업무 복구까지 허용되는 최대 시간입니다.",
    "difficulty": "EASY",
    "keywords": [
      "RTO",
      "Recovery Time Objective",
      "목표복구시간"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-dr"
  },
  {
    "id": "EXP_IS_017",
    "subject": "정보시스템구축관리",
    "category": "재해 복구",
    "type": "SHORT_ANSWER",
    "question": "재해 복구 목표 지표 중 데이터 백업 주기와 관련하여 재해 발생 시 최대로 허용 가능한 데이터 유실 시점(시간적 범위)을 나타내는 약칭은 무엇인가?",
    "answer": "RPO",
    "explanation": "RPO(Recovery Point Objective, 목표 복구 시점)는 유실되어도 무방하다고 감내할 수 있는 데이터의 과거 시점입니다.",
    "difficulty": "EASY",
    "keywords": [
      "RPO",
      "Recovery Point Objective",
      "목표복구시점"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-dr"
  },
  {
    "id": "EXP_IS_018",
    "subject": "정보시스템구축관리",
    "category": "재해 복구",
    "type": "SHORT_ANSWER",
    "question": "재해 복구 센터 유형 중 주 센터와 완전히 동일한 인프라를 구축하고 데이터를 실시간 동기 복제(Active-Active)하여 RTO를 0에 가깝게 유지하는 센터는 무엇인가?",
    "answer": "미러 사이트",
    "explanation": "미러 사이트(Mirror Site)는 구축 비용이 가장 비싸지만 무중단 즉각 복구가 가능합니다.",
    "difficulty": "EASY",
    "keywords": [
      "미러 사이트",
      "Mirror Site",
      "RTO 0"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-dr"
  },
  {
    "id": "EXP_IS_019",
    "subject": "정보시스템구축관리",
    "category": "재해 복구",
    "type": "SHORT_ANSWER",
    "question": "재해 복구 센터 유형 중 주 센터와 동일한 하드웨어를 갖추고 대기(Active-Standby)하면서 수 시간 이내에 서비스를 복구 가능한 센터는 무엇인가?",
    "answer": "핫 사이트",
    "explanation": "핫 사이트(Hot Site)는 상시 대기 상태로 수 시간 이내에 전환 가능합니다.",
    "difficulty": "EASY",
    "keywords": [
      "핫 사이트",
      "Hot Site",
      "수시간복구"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-dr"
  },
  {
    "id": "EXP_IS_020",
    "subject": "정보시스템구축관리",
    "category": "재해 복구",
    "type": "SHORT_ANSWER",
    "question": "재해 복구 센터 유형 중 전산실 공간, 전력 등 최소한의 필수 기반 시설만 갖추고 재해 발생 시 장비를 반입하여 복구하는 비용이 가장 저렴한 센터는 무엇인가?",
    "answer": "콜드 사이트",
    "explanation": "콜드 사이트(Cold Site)는 장비와 소프트웨어를 재해 후 설치하므로 복구에 수주~수개월이 소요됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "콜드 사이트",
      "Cold Site",
      "최저비용"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-dr"
  },
  {
    "id": "EXP_IS_021",
    "subject": "정보시스템구축관리",
    "category": "스토리지 시스템",
    "type": "SHORT_ANSWER",
    "question": "서버와 저장 장치(디스크)를 전용 케이블(SATA, SAS 등)로 직접 1:1 연결하는 가장 전통적인 직접 연결 저장 장치 방식의 약칭은 무엇인가?",
    "answer": "DAS",
    "explanation": "DAS(Direct Attached Storage)는 속도가 빠르지만 다른 서버와 스토리지 공유가 불가능합니다.",
    "difficulty": "EASY",
    "keywords": [
      "DAS",
      "Direct Attached Storage",
      "직접연결"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-storage"
  },
  {
    "id": "EXP_IS_022",
    "subject": "정보시스템구축관리",
    "category": "스토리지 시스템",
    "type": "SHORT_ANSWER",
    "question": "기존의 일반 이더넷 LAN 네트워크를 통해 여러 서버들이 TCP/IP로 파일 단위(NFS, CIFS) 데이터 공유를 수행하는 네트워크 연결 스토리지의 약칭은 무엇인가?",
    "answer": "NAS",
    "explanation": "NAS(Network Attached Storage)는 파일 레벨 스토리지 공유를 지원합니다.",
    "difficulty": "EASY",
    "keywords": [
      "NAS",
      "Network Attached Storage",
      "이더넷파일공유"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-storage"
  },
  {
    "id": "EXP_IS_023",
    "subject": "정보시스템구축관리",
    "category": "스토리지 시스템",
    "type": "SHORT_ANSWER",
    "question": "광채널(Fibre Channel) 스위치를 사용한 초고속 전용 네트워크망을 구성하여 서버들에 블록(Block) 단위 초고속 I/O를 제공하는 스토리지 영역 네트워크의 약칭은 무엇인가?",
    "answer": "SAN",
    "explanation": "SAN(Storage Area Network)은 전용 광채널 망을 통해 블록 스토리지 공유를 지원합니다.",
    "difficulty": "EASY",
    "keywords": [
      "SAN",
      "Storage Area Network",
      "광채널"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-storage"
  },
  {
    "id": "EXP_IS_024",
    "subject": "정보시스템구축관리",
    "category": "스토리지 시스템",
    "type": "SHORT_ANSWER",
    "question": "RAID 레벨 중 데이터를 여러 디스크에 연속적으로 분산 기록하는 스트라이핑(Striping)을 사용해 읽기/쓰기 속도는 극대화되지만 결함 허용(내고장성)이 전혀 없는 레벨은 무엇인가?",
    "answer": "RAID 0",
    "explanation": "RAID 0은 디스크 하나만 고장 나도 전체 데이터가 유실됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "RAID 0",
      "스트라이핑",
      "결함허용없음"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-storage"
  },
  {
    "id": "EXP_IS_025",
    "subject": "정보시스템구축관리",
    "category": "스토리지 시스템",
    "type": "SHORT_ANSWER",
    "question": "RAID 레벨 중 동일한 데이터를 2개 이상의 디스크에 완벽히 복제하여 기록하는 미러링(Mirroring) 방식을 사용하여 안정성은 높지만 유효 디스크 용량이 50%로 줄어드는 레벨은 무엇인가?",
    "answer": "RAID 1",
    "explanation": "RAID 1은 한 디스크가 파손되어도 다른 디스크로 무중단 서비스를 제공합니다.",
    "difficulty": "EASY",
    "keywords": [
      "RAID 1",
      "미러링",
      "용량50%"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-storage"
  },
  {
    "id": "EXP_IS_027",
    "subject": "정보시스템구축관리",
    "category": "스토리지 시스템",
    "type": "SHORT_ANSWER",
    "question": "RAID 5의 안정성을 한층 강화하여 서로 다른 2개의 분산 패리티를 유지함으로써 동시에 2개의 디스크가 고장 나더라도 데이터를 복구할 수 있는 레벨은 무엇인가?",
    "answer": "RAID 6",
    "explanation": "RAID 6는 듀얼 패리티를 적용하여 최소 4개의 디스크가 필요합니다.",
    "difficulty": "EASY",
    "keywords": [
      "RAID 6",
      "듀얼패리티",
      "동시2개고장극복"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-storage"
  },
  {
    "id": "EXP_IS_028",
    "subject": "정보시스템구축관리",
    "category": "IT 서비스 관리",
    "type": "SHORT_ANSWER",
    "question": "서비스 제공자와 고객 간에 제공될 서비스의 품질 수준(가동률, 응답 시간, 장애 복구 시간 등)을 정량적으로 명시하고 위반 시 보상 기준을 정의한 계약서는 무엇인가?",
    "answer": "SLA",
    "explanation": "SLA(Service Level Agreement, 서비스 수준 협약서)는 IT 서비스 품질의 기준이 됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "SLA",
      "Service Level Agreement",
      "서비스수준협약"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-itsm"
  },
  {
    "id": "EXP_IS_030",
    "subject": "정보시스템구축관리",
    "category": "IT 서비스 관리",
    "type": "SHORT_ANSWER",
    "question": "ITIL 프로세스 중 시스템에 비정상적인 장애나 서비스 중단(인시던트)이 발생했을 때 가장 우선적으로 서비스의 빠른 정상화를 목표로 처리하는 프로세스는 무엇인가?",
    "answer": "인시던트 관리",
    "explanation": "인시던트 관리(Incident Management)는 근본 원인 규명보다 \"신속한 서비스 복구\"가 최우선 목표입니다.",
    "difficulty": "EASY",
    "keywords": [
      "인시던트 관리",
      "Incident Management",
      "신속복구"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-itsm"
  },
  {
    "id": "EXP_IS_031",
    "subject": "정보시스템구축관리",
    "category": "IT 서비스 관리",
    "type": "SHORT_ANSWER",
    "question": "ITIL 프로세스 중 반복적으로 발생하는 인시던트들의 근본적인 기저 원인(Root Cause)을 규명하고 이를 영구 제거하여 재발을 방지하는 프로세스는 무엇인가?",
    "answer": "문제 관리",
    "explanation": "문제 관리(Problem Management)는 인시던트의 근본 원인을 분석하여 영구 조치합니다.",
    "difficulty": "EASY",
    "keywords": [
      "문제 관리",
      "Problem Management",
      "근본원인제거"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-itsm"
  },
  {
    "id": "EXP_IS_032",
    "subject": "정보시스템구축관리",
    "category": "비즈니스 연속성",
    "type": "SHORT_ANSWER",
    "question": "재난이나 재해 발생 시 비즈니스의 핵심 핵심 기능을 신속히 복구하고 업무를 지속하기 위해 수립하는 종합적인 비즈니스 연속성 계획의 약칭은 무엇인가?",
    "answer": "BCP",
    "explanation": "BCP(Business Continuity Planning)는 재해 발생 시 기업 비즈니스를 지속하기 위한 종합 계획입니다.",
    "difficulty": "EASY",
    "keywords": [
      "BCP",
      "Business Continuity Planning",
      "업무연속성"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-dr"
  },
  {
    "id": "EXP_IS_033",
    "subject": "정보시스템구축관리",
    "category": "비즈니스 연속성",
    "type": "SHORT_ANSWER",
    "question": "BCP 수립 단계 중 재난 발생 시 특정 업무의 중단이 기업의 재무, 법적, 운영 측면에 미칠 손실 규모와 핵심 업무의 우선순위를 정량/정성 평가하는 분석 기법의 약칭은 무엇인가?",
    "answer": "BIA",
    "explanation": "BIA(Business Impact Analysis, 업무 영향 분석)는 RTO와 RPO를 결정하는 기초 분석 단계입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "BIA",
      "Business Impact Analysis",
      "업무영향분석"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-dr"
  },
  {
    "id": "EXP_IS_034",
    "subject": "정보시스템구축관리",
    "category": "인프라 가상화",
    "type": "SHORT_ANSWER",
    "question": "인프라 자원을 프로그래밍 코드(설정 파일)로 정의하고 버전 관리하여 서버 배포와 설정을 완전 자동화하는 개념의 약칭은 무엇인가?",
    "answer": "IaC",
    "explanation": "IaC(Infrastructure as Code, 코드형 인프라)는 테라폼(Terraform)이나 앤서블(Ansible)을 통해 인프라를 코드로 프로비저닝합니다.",
    "difficulty": "EASY",
    "keywords": [
      "IaC",
      "Infrastructure as Code",
      "코드형인프라"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-infra"
  },
  {
    "id": "EXP_IS_035",
    "subject": "정보시스템구축관리",
    "category": "인프라 가상화",
    "type": "SHORT_ANSWER",
    "question": "호스트 운영체제 위에 하이퍼바이저와 게스트 OS 없이 OS 커널을 공유하며 프로세스를 격리 실행하는 리눅스 컨테이너 기반 오픈소스 가상화 플랫폼은 무엇인가?",
    "answer": "도커",
    "explanation": "도커(Docker)는 컨테이너 기술로 실행 환경을 이미지화하여 가볍고 빠르게 배포합니다.",
    "difficulty": "EASY",
    "keywords": [
      "도커",
      "Docker",
      "컨테이너"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-infra"
  },
  {
    "id": "EXP_IS_036",
    "subject": "정보시스템구축관리",
    "category": "인프라 가상화",
    "type": "SHORT_ANSWER",
    "question": "대규모 컨테이너들의 배포, 자동 확장(오토스케일링), 로드 밸런싱, 롤백을 총괄 관리해주는 대표적인 컨테이너 오케스트레이션 도구는 무엇인가?",
    "answer": "쿠버네티스",
    "explanation": "쿠버네티스(Kubernetes, K8s)는 구글이 오픈소스로 공개한 컨테이너 오케스트레이션 표준 플랫폼입니다.",
    "difficulty": "EASY",
    "keywords": [
      "쿠버네티스",
      "Kubernetes",
      "K8s",
      "오케스트레이션"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-infra"
  },
  {
    "id": "EXP_IS_037",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스팅",
    "type": "SHORT_ANSWER",
    "question": "테스트 설계 기법 중 소프트웨어에 결함이 발생할 가능성이 가장 높은 경계값(최솟값 직전, 최솟값, 최댓값, 최댓값 직후 등)을 집중적으로 테스트 케이스로 추출하는 기법은 무엇인가?",
    "answer": "경계값 분석",
    "explanation": "경계값 분석(Boundary Value Analysis)은 동등 분할과 함께 대표적인 블랙박스 테스트 기법입니다.",
    "difficulty": "EASY",
    "keywords": [
      "경계값 분석",
      "Boundary Value",
      "블랙박스테스트"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-testing"
  },
  {
    "id": "EXP_IS_038",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스팅",
    "type": "SHORT_ANSWER",
    "question": "프로그램의 소스코드 내부 구조를 들여다보지 않고 외부 명세서만을 바탕으로 입력 값에 따른 올바른 출력이 나오는지 검증하는 테스트 방식은 무엇인가?",
    "answer": "블랙박스 테스트",
    "explanation": "블랙박스 테스트(Black-box Test)는 기능 명세를 검증하며 동등 분할, 경계값 분석, 원인-결과 그래프 등이 있습니다.",
    "difficulty": "EASY",
    "keywords": [
      "블랙박스 테스트",
      "Black-box Test",
      "명세기반"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-testing"
  },
  {
    "id": "EXP_IS_039",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스팅",
    "type": "SHORT_ANSWER",
    "question": "프로그램의 원시 소스코드 로직과 제어 흐름 구조를 직접 분석하여 모든 실행 경로가 올바르게 수행되는지 검증하는 테스트 방식은 무엇인가?",
    "answer": "화이트박스 테스트",
    "explanation": "화이트박스 테스트(White-box Test)는 구문, 분기, 조건, 경로 커버리지 등을 측정합니다.",
    "difficulty": "EASY",
    "keywords": [
      "화이트박스 테스트",
      "White-box Test",
      "구조기반"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-testing"
  },
  {
    "id": "EXP_IS_040",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스팅",
    "type": "SHORT_ANSWER",
    "question": "화이트박스 테스트 커버리지 중 소스코드 내의 모든 실행 가능한 문장(구문)들이 최소 한 번은 실행되도록 설계하는 가장 기본적인 커버리지는 무엇인가?",
    "answer": "구문 커버리지",
    "explanation": "구문 커버리지(Statement Coverage, 라인 커버리지)는 모든 실행 명령문을 1회 이상 통과하는지 검증합니다.",
    "difficulty": "EASY",
    "keywords": [
      "구문 커버리지",
      "Statement Coverage",
      "문장커버리지"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-testing"
  },
  {
    "id": "EXP_IS_041",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스팅",
    "type": "SHORT_ANSWER",
    "question": "화이트박스 테스트 커버리지 중 프로그램 내의 모든 조건문(if문 등)의 결과가 참(True)과 거짓(False)을 최소 한 번씩은 모두 수행하도록 보장하는 커버리지는 무엇인가?",
    "answer": "분기 커버리지",
    "explanation": "분기 커버리지(Branch Coverage, 결정 커버리지)는 조건문 전체의 참/거짓 분기를 1회 이상 실행합니다.",
    "difficulty": "EASY",
    "keywords": [
      "분기 커버리지",
      "Branch Coverage",
      "결정커버리지"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-testing"
  },
  {
    "id": "EXP_IS_042",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스팅",
    "type": "SHORT_ANSWER",
    "question": "조건문 전체의 결과와 무관하게, 조건문 내부를 구성하는 개별 단일 조건식(예: A > 0) 각각이 독립적으로 참과 거짓을 최소 한 번씩 갖도록 설계하는 커버리지는 무엇인가?",
    "answer": "조건 커버리지",
    "explanation": "조건 커버리지(Condition Coverage)는 개별 조건식의 참/거짓만을 만족하면 되므로 전체 분기가 참/거짓을 만족하지 못할 수 있습니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "조건 커버리지",
      "Condition Coverage",
      "개별조건식"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-testing"
  },
  {
    "id": "EXP_IS_043",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스팅",
    "type": "SHORT_ANSWER",
    "question": "복합 조건식에서 각 개별 조건식이 전체 결정 결과에 독립적으로 영향을 미치는지를 검증하여 항공/철도 등 최고 안전성이 요구되는 시스템에 쓰이는 커버리지의 약칭은 무엇인가?",
    "answer": "MC/DC",
    "explanation": "MC/DC(Modified Condition/Decision Coverage)는 조건/결정 커버리지를 보완하여 N+1개의 테스트 케이스로 높은 신뢰성을 달성합니다.",
    "difficulty": "HARD",
    "keywords": [
      "MC/DC",
      "Modified Condition",
      "항공기소프트웨어"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-testing"
  },
  {
    "id": "EXP_IS_044",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스팅",
    "type": "SHORT_ANSWER",
    "question": "테스트 오라클(Test Oracle) 종류 중 모든 가능한 입력 값에 대해 100% 완벽한 기대 결과를 사전에 모두 알고 있는 특수한 상황에 적용하는 오라클은 무엇인가?",
    "answer": "참 오라클",
    "explanation": "참 오라클(True Oracle)은 모든 입력에 대해 정답을 정확히 산출하는 오라클입니다. 일부 샘플만 검증하는 것은 샘플링 오라클입니다.",
    "difficulty": "EASY",
    "keywords": [
      "참 오라클",
      "True Oracle",
      "완벽한결과"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-testing"
  },
  {
    "id": "EXP_IS_045",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스팅",
    "type": "SHORT_ANSWER",
    "question": "테스트 오라클 종류 중 특정 주요 몇 개의 입력 값들에 대해서만 정답을 확인하고, 나머지는 추정치로 판단하는 오라클은 무엇인가?",
    "answer": "샘플링 오라클",
    "explanation": "샘플링 오라클(Sampling Oracle)은 대표 샘플 테스트 케이스들만 완전 검증합니다.",
    "difficulty": "EASY",
    "keywords": [
      "샘플링 오라클",
      "Sampling Oracle",
      "일부검증"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-testing"
  },
  {
    "id": "EXP_IS_047",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스팅",
    "type": "SHORT_ANSWER",
    "question": "상향식 통합 테스트(Bottom-up Test) 수행 시 이미 개발된 최하위 모듈들을 시험 구동하기 위해 상위 호출자 역할을 흉내 내는 가상 제어 소프트웨어를 무엇이라 하는가?",
    "answer": "테스트 드라이버",
    "explanation": "테스트 드라이버(Test Driver)는 상향식 통합 시 데이터를 전달하고 하위 모듈의 출력을 수신하는 상위 제어 모듈입니다.",
    "difficulty": "EASY",
    "keywords": [
      "테스트 드라이버",
      "Driver",
      "상향식테스트"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-testing"
  },
  {
    "id": "EXP_IS_048",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스팅",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어에 버그 수정이나 기능 추가 등 소스코드 변경이 발생했을 때, 기존에 잘 동작하던 기능에 새로운 결함(사이드 이펙트)이 생기지 않았는지 재검증하는 테스트는 무엇인가?",
    "answer": "회귀 테스트",
    "explanation": "회귀 테스트(Regression Test)는 코드 수정 후 기존 기능의 퇴보를 방지하기 위해 수행하는 재시험입니다.",
    "difficulty": "EASY",
    "keywords": [
      "회귀 테스트",
      "Regression Test",
      "사이드이펙트방지"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-testing"
  },
  {
    "id": "EXP_IS_050",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스팅",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 결함의 80%는 전체 시스템의 특정 20% 모듈에 집중되어 발생한다는 파레토 법칙에 기반한 테스트 원칙은 무엇인가?",
    "answer": "결함 집중",
    "explanation": "결함 집중(Defect Clustering) 원칙은 복잡도가 높고 핵심 로직이 위치한 일부 모듈에 결함이 집중된다는 원리입니다.",
    "difficulty": "EASY",
    "keywords": [
      "결함 집중",
      "Defect Clustering",
      "파레토법칙"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-testing"
  },
  {
    "id": "EXP_NET_001",
    "subject": "신기술/보안",
    "category": "네트워크 프로토콜",
    "type": "SHORT_ANSWER",
    "question": "논리적인 IP 주소를 컴퓨터 네트워크 카드의 물리적인 하드웨어 MAC 주소로 변환해 주는 프로토콜의 약칭은 무엇인가?",
    "answer": "ARP",
    "explanation": "ARP(Address Resolution Protocol)는 브로드캐스트 질의를 통해 상대방의 MAC 주소를 알아냅니다. 반대로 MAC으로 IP를 찾는 것은 RARP입니다.",
    "difficulty": "EASY",
    "keywords": [
      "ARP",
      "Address Resolution Protocol",
      "MAC주소변환"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-protocols"
  },
  {
    "id": "EXP_NET_002",
    "subject": "신기술/보안",
    "category": "네트워크 프로토콜",
    "type": "SHORT_ANSWER",
    "question": "하드디스크가 없는 디스크리스 컴퓨터가 부팅 시 자신의 MAC 주소를 이용해 서버로부터 IP 주소를 요청할 때 사용하는 역주소 변환 프로토콜의 약칭은 무엇인가?",
    "answer": "RARP",
    "explanation": "RARP(Reverse ARP)는 물리 주소를 IP 주소로 매핑합니다. 현대에는 DHCP와 BOOTP로 대체되었습니다.",
    "difficulty": "EASY",
    "keywords": [
      "RARP",
      "Reverse ARP",
      "역주소변환"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-protocols"
  },
  {
    "id": "EXP_NET_003",
    "subject": "신기술/보안",
    "category": "네트워크 프로토콜",
    "type": "SHORT_ANSWER",
    "question": "IP 프로토콜의 비신뢰적인 데이터그램 전송을 보완하여 네트워크 에러 보고 및 전송 상태 진단(Ping, Traceroute)에 사용되는 프로토콜의 약칭은 무엇인가?",
    "answer": "ICMP",
    "explanation": "ICMP(Internet Control Message Protocol)는 에러 메시지(도달 불가, 시간 초과 등)를 발신지 IP로 전송합니다.",
    "difficulty": "EASY",
    "keywords": [
      "ICMP",
      "Internet Control Message Protocol",
      "Ping"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-protocols"
  },
  {
    "id": "EXP_NET_004",
    "subject": "신기술/보안",
    "category": "네트워크 프로토콜",
    "type": "SHORT_ANSWER",
    "question": "IP 멀티캐스트 호스트가 자신이 속한 멀티캐스트 그룹의 가입, 유지, 탈퇴 정보를 인접한 라우터에 알리기 위해 사용하는 프로토콜의 약칭은 무엇인가?",
    "answer": "IGMP",
    "explanation": "IGMP(Internet Group Management Protocol)는 멀티캐스트 수신 그룹을 관리하는 네트워크 계층 프로토콜입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "IGMP",
      "Internet Group Management Protocol",
      "멀티캐스트그룹"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-protocols"
  },
  {
    "id": "EXP_NET_005",
    "subject": "신기술/보안",
    "category": "네트워크 프로토콜",
    "type": "SHORT_ANSWER",
    "question": "네트워크 상의 클라이언트 PC들에게 IP 주소, 서브넷 마스크, 기본 게이트웨이, DNS 주소를 동적으로 자동 할당해주는 프로토콜의 약칭은 무엇인가?",
    "answer": "DHCP",
    "explanation": "DHCP(Dynamic Host Configuration Protocol)는 DORA(Discover-Offer-Request-Ack) 과정을 거쳐 IP를 대여합니다.",
    "difficulty": "EASY",
    "keywords": [
      "DHCP",
      "Dynamic Host Configuration Protocol",
      "IP자동할당"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-protocols"
  },
  {
    "id": "EXP_NET_006",
    "subject": "신기술/보안",
    "category": "라우팅 프로토콜",
    "type": "SHORT_ANSWER",
    "question": "내부 게이트웨이 라우팅 프로토콜(IGP) 중 벨만-포드 거리 벡터 알고리즘을 사용하며, 최대 홉 수(Hop Count)가 15로 제한되는 프로토콜의 약칭은 무엇인가?",
    "answer": "RIP",
    "explanation": "RIP(Routing Information Protocol)는 소규모망에 적합하며 16홉은 도달 불가능(Infinity)으로 판단합니다.",
    "difficulty": "EASY",
    "keywords": [
      "RIP",
      "Routing Information Protocol",
      "15홉제한"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-routing"
  },
  {
    "id": "EXP_NET_008",
    "subject": "신기술/보안",
    "category": "라우팅 프로토콜",
    "type": "SHORT_ANSWER",
    "question": "서로 다른 자율 시스템(AS, Autonomous System) 간에 경로 벡터(Path Vector) 알고리즘을 사용하여 인터넷 백본 라우팅을 수행하는 외부 게이트웨이 프로토콜의 약칭은 무엇인가?",
    "answer": "BGP",
    "explanation": "BGP(Border Gateway Protocol)는 ISP 간의 상호 연결에 사용되는 인터넷 표준 EGP 라우팅 프로토콜입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "BGP",
      "Border Gateway Protocol",
      "AS간라우팅"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-routing"
  },
  {
    "id": "EXP_NET_009",
    "subject": "신기술/보안",
    "category": "전송 제어 프로토콜",
    "type": "SHORT_ANSWER",
    "question": "TCP 연결을 수립하기 위해 클라이언트와 서버가 주고받는 3단계 핸드셰이크의 플래그 순서는 SYN → (       ) → ACK 이다. 괄호에 들어갈 플래그는 무엇인가?",
    "answer": "SYN+ACK",
    "explanation": "TCP 3-way Handshake 순서는 1단계: SYN, 2단계: SYN+ACK, 3단계: ACK 순으로 상호 연결을 확립합니다.",
    "difficulty": "EASY",
    "keywords": [
      "SYN+ACK",
      "3-way Handshake",
      "TCP연결"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-tcp"
  },
  {
    "id": "EXP_NET_010",
    "subject": "신기술/보안",
    "category": "전송 제어 프로토콜",
    "type": "SHORT_ANSWER",
    "question": "TCP 통신에서 이미 수립된 연결을 안전하게 종료(해제)하기 위해 양측이 주고받는 핸드셰이크는 몇 번(몇 way)으로 이루어지는가?",
    "answer": "4-way Handshake",
    "explanation": "TCP 연결 해제는 FIN → ACK → FIN → ACK 총 4단계(4-way Handshake)를 거쳐 양방향 세션을 모두 안전하게 종료합니다.",
    "difficulty": "EASY",
    "keywords": [
      "4-way Handshake",
      "TCP연결해제",
      "FIN"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-tcp"
  },
  {
    "id": "EXP_NET_011",
    "subject": "신기술/보안",
    "category": "전송 제어 프로토콜",
    "type": "SHORT_ANSWER",
    "question": "TCP 흐름 제어(Flow Control) 기법 중 수신 측의 수신 버퍼 여유 공간 크기에 맞춰 송신 측이 한 번에 보낼 수 있는 데이터 패킷의 범위를 동적으로 조절하는 기법은 무엇인가?",
    "answer": "슬라이딩 윈도우",
    "explanation": "슬라이딩 윈도우(Sliding Window)는 ACK를 일일이 기다리지 않고 윈도우 크기만큼 패킷을 연속 전송하여 통신 효율을 극대화합니다.",
    "difficulty": "EASY",
    "keywords": [
      "슬라이딩 윈도우",
      "Sliding Window",
      "흐름제어"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-tcp"
  },
  {
    "id": "EXP_NET_012",
    "subject": "신기술/보안",
    "category": "전송 제어 프로토콜",
    "type": "SHORT_ANSWER",
    "question": "TCP 혼잡 제어(Congestion Control) 알고리즘 중 네트워크의 혼잡을 피하기 위해 송신 윈도우 크기를 1부터 시작하여 ACK가 올 때마다 2배씩 지수적으로 증가시키는 기법은 무엇인가?",
    "answer": "Slow Start",
    "explanation": "느린 시작(Slow Start)은 혼잡 임계치(ssthresh)에 도달할 때까지 지수 함수적으로 윈도우를 키웁니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "Slow Start",
      "느린시작",
      "혼잡제어"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-tcp"
  },
  {
    "id": "EXP_NET_013",
    "subject": "신기술/보안",
    "category": "IP 주소 체계",
    "type": "SHORT_ANSWER",
    "question": "IPv4 주소는 몇 비트 길이로 구성되어 있는가?",
    "answer": "32비트",
    "explanation": "IPv4는 8비트씩 4개 옥텟, 총 32비트로 표현됩니다. IPv6는 128비트입니다.",
    "difficulty": "EASY",
    "keywords": [
      "32비트",
      "IPv4길이",
      "IP주소"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-ip"
  },
  {
    "id": "EXP_NET_015",
    "subject": "신기술/보안",
    "category": "IP 주소 체계",
    "type": "SHORT_ANSWER",
    "question": "IPv6 주소 전송 방식 중 IPv4의 브로드캐스트(Broadcast) 방식을 완전히 대체하여 네트워크 부하를 줄이기 위해 사용하는 전송 방식은 무엇인가?",
    "answer": "멀티캐스트",
    "explanation": "IPv6에는 브로드캐스트가 없으며, 유니캐스트, 멀티캐스트(Multicast), 애니캐스트(Anycast) 3가지만 존재합니다.",
    "difficulty": "EASY",
    "keywords": [
      "멀티캐스트",
      "Multicast",
      "IPv6전송방식"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-ip"
  },
  {
    "id": "EXP_NET_016",
    "subject": "신기술/보안",
    "category": "IP 주소 체계",
    "type": "SHORT_ANSWER",
    "question": "IPv6의 3대 전송 방식 중 단일 송신자와 가장 가까운 위치에 있는 단일 수신자 인터페이스(1:1 중 가장 가까운 노드)로 패킷을 전송하는 방식은 무엇인가?",
    "answer": "애니캐스트",
    "explanation": "애니캐스트(Anycast)는 동일 주소를 가진 노드들 중 라우팅 거리상 가장 가까운 노드로 데이터를 전송합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "애니캐스트",
      "Anycast",
      "가장가까운노드"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-ip"
  },
  {
    "id": "EXP_NET_017",
    "subject": "신기술/보안",
    "category": "서브넷팅 계산",
    "type": "SHORT_ANSWER",
    "question": "IPv4 C클래스 네트워크(서브넷 마스크: 255.255.255.0, /24)에서 1개의 서브넷 내에 실제로 단말 PC들에 할당 가능한 유효 호스트 IP 주소의 최대 개수는 몇 개인가?",
    "answer": "254",
    "explanation": "호스트 비트가 8비트이므로 총 256개(2^8) 중 네트워크 대표 주소(0번)와 브로드캐스트 주소(255번) 2개를 제외한 254개입니다.",
    "difficulty": "EASY",
    "keywords": [
      "254",
      "서브넷호스트수",
      "C클래스"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-subnet"
  },
  {
    "id": "EXP_NET_018",
    "subject": "신기술/보안",
    "category": "서브넷팅 계산",
    "type": "SHORT_ANSWER",
    "question": "IP 주소 192.168.1.0/26 대역에서 서브넷 마스크를 10진수로 표기했을 때 마지막 4번째 옥텟의 값은 얼마인가?",
    "answer": "192",
    "explanation": "/26은 상위 26비트가 1입니다. 4번째 옥텟은 상위 2비트가 1이므로 128 + 64 = 192입니다 (255.255.255.192).",
    "difficulty": "MEDIUM",
    "keywords": [
      "192",
      "서브넷마스크",
      "/26"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-subnet"
  },
  {
    "id": "EXP_NET_019",
    "subject": "신기술/보안",
    "category": "서브넷팅 계산",
    "type": "SHORT_ANSWER",
    "question": "어떤 서브넷의 네트워크 주소가 192.168.10.0/26 일 때, 이 서브넷 내부에서 사용 가능한 호스트 IP의 최대 개수는 몇 개인가?",
    "answer": "62",
    "explanation": "호스트 비트는 32 - 26 = 6비트이므로 2^6 = 64개에서 네트워크(0)와 브로드캐스트(63) 2개를 빼면 62개입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "62",
      "유효호스트수",
      "/26서브넷팅"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-subnet"
  },
  {
    "id": "EXP_NET_020",
    "subject": "신기술/보안",
    "category": "네트워크 장비",
    "type": "SHORT_ANSWER",
    "question": "OSI 7계층 중 2계층(데이터링크 계층)에서 동작하며 수신된 프레임의 목적지 MAC 주소를 학습하여 해당 포트로만 스위칭해주는 대표적인 네트워크 장비는 무엇인가?",
    "answer": "L2 스위치",
    "explanation": "L2 스위치(Switch)는 MAC 주소 테이블을 바탕으로 하드웨어 기반 고속 프레임 포워딩을 수행합니다.",
    "difficulty": "EASY",
    "keywords": [
      "L2 스위치",
      "Switch",
      "데이터링크장비"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-devices"
  },
  {
    "id": "EXP_NET_021",
    "subject": "신기술/보안",
    "category": "네트워크 장비",
    "type": "SHORT_ANSWER",
    "question": "OSI 7계층 중 3계층(네트워크 계층)에서 동작하며 서로 다른 네트워크 간에 패킷을 최적의 경로로 전송해주는 라우팅 장비는 무엇인가?",
    "answer": "라우터",
    "explanation": "라우터(Router, L3 장비)는 IP 헤더를 분석하여 라우팅 테이블을 기반으로 패킷을 목적지로 전달합니다.",
    "difficulty": "EASY",
    "keywords": [
      "라우터",
      "Router",
      "L3장비"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-devices"
  },
  {
    "id": "EXP_NET_022",
    "subject": "신기술/보안",
    "category": "네트워크 장비",
    "type": "SHORT_ANSWER",
    "question": "전송 계층(L4)의 TCP/UDP 포트 번호를 분석하여 웹 서버나 애플리케이션 서버들에 트래픽 부하를 분산(Load Balancing)시켜주는 장비는 무엇인가?",
    "answer": "L4 스위치",
    "explanation": "L4 스위치는 IP와 포트 번호를 기반으로 서버 팜(Server Farm)의 부하 분산과 헬스 체크를 수행합니다.",
    "difficulty": "EASY",
    "keywords": [
      "L4 스위치",
      "로드밸런서",
      "부하분산"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-devices"
  },
  {
    "id": "EXP_NET_023",
    "subject": "신기술/보안",
    "category": "네트워크 주소 변환",
    "type": "SHORT_ANSWER",
    "question": "공인 IP 주소 고갈 문제를 해결하고 사내망 보안을 위해 사설 IP 주소를 공인 IP 주소로 상호 변환해주는 기술의 약칭은 무엇인가?",
    "answer": "NAT",
    "explanation": "NAT(Network Address Translation)는 사설 IP를 외부 인터넷용 공인 IP로 변환합니다. 포트 번호까지 변환하는 기술은 NAPT(PAT)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "NAT",
      "Network Address Translation",
      "IP변환"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-protocols"
  },
  {
    "id": "EXP_NET_024",
    "subject": "신기술/보안",
    "category": "네트워크 주소 체계",
    "type": "SHORT_ANSWER",
    "question": "컴퓨터가 자기 자신을 가리키는 루프백(Loopback) IP 주소로, \"localhost\"와 대응되는 표준 IPv4 주소는 무엇인가?",
    "answer": "127.0.0.1",
    "explanation": "127.0.0.1은 로컬 호스트 테스트용 루프백 주소입니다. IPv6의 루프백 주소는 ::1 입니다.",
    "difficulty": "EASY",
    "keywords": [
      "127.0.0.1",
      "루프백주소",
      "localhost"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-ip"
  },
  {
    "id": "EXP_NET_025",
    "subject": "신기술/보안",
    "category": "도메인 네임 시스템",
    "type": "SHORT_ANSWER",
    "question": "사람이 이해하기 쉬운 문자형 도메인 이름(예: www.naver.com)을 컴퓨터가 통신할 수 있는 숫자형 IP 주소로 변환해주는 시스템의 약칭은 무엇인가?",
    "answer": "DNS",
    "explanation": "DNS(Domain Name System)는 전 세계 분산 계층 데이터베이스를 통해 도메인 질의를 IP 주소로 매핑합니다.",
    "difficulty": "EASY",
    "keywords": [
      "DNS",
      "Domain Name System",
      "도메인변환"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-protocols"
  },
  {
    "id": "EXP_NET_026",
    "subject": "신기술/보안",
    "category": "응용 계층 프로토콜",
    "type": "SHORT_ANSWER",
    "question": "인터넷 전자우편(E-Mail)을 클라이언트가 작성하여 메일 서버로 발송(송신)하거나 서버 간에 메일을 중계할 때 사용하는 프로토콜의 약칭은 무엇인가?",
    "answer": "SMTP",
    "explanation": "SMTP(Simple Mail Transfer Protocol, 기본 25번 포트)는 메일 발송용 프로토콜입니다. 메일을 서버에서 읽어올 때는 POP3나 IMAP을 씁니다.",
    "difficulty": "EASY",
    "keywords": [
      "SMTP",
      "Simple Mail Transfer Protocol",
      "메일발송"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-protocols"
  },
  {
    "id": "EXP_NET_027",
    "subject": "신기술/보안",
    "category": "응용 계층 프로토콜",
    "type": "SHORT_ANSWER",
    "question": "메일 서버에 도착한 전자우편을 사용자의 클라이언트로 다운로드하여 가져올 때 사용하는 프로토콜로, 메일을 가져온 후 서버에서 삭제하는 것이 기본 설정인 프로토콜의 약칭은 무엇인가?",
    "answer": "POP3",
    "explanation": "POP3(Post Office Protocol v3, 110번 포트)는 메일을 로컬 PC로 다운로드합니다. 서버에 보관하고 동기화하는 것은 IMAP(143번 포트)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "POP3",
      "Post Office Protocol",
      "메일수신"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-protocols"
  },
  {
    "id": "EXP_NET_028",
    "subject": "신기술/보안",
    "category": "응용 계층 프로토콜",
    "type": "SHORT_ANSWER",
    "question": "원격 서버에 안전하게 접속하기 위해 기존의 보안에 취약한 Telnet(평문 전송)을 대체하여 모든 패킷을 강력히 암호화하는 원격 터미널 접속 프로토콜의 약칭은 무엇인가?",
    "answer": "SSH",
    "explanation": "SSH(Secure Shell, 기본 22번 포트)는 공개키 기반 암호화를 적용하여 원격 쉘과 파일 전송(SFTP)을 안전하게 지원합니다.",
    "difficulty": "EASY",
    "keywords": [
      "SSH",
      "Secure Shell",
      "원격접속"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-protocols"
  },
  {
    "id": "EXP_NET_029",
    "subject": "신기술/보안",
    "category": "네트워크 관리 프로토콜",
    "type": "SHORT_ANSWER",
    "question": "네트워크 상의 라우터, 스위치, 서버 등의 장비 상태와 트래픽 정보를 모니터링하고 원격 관리하기 위해 사용하는 표준 네트워크 관리 프로토콜의 약칭은 무엇인가?",
    "answer": "SNMP",
    "explanation": "SNMP(Simple Network Management Protocol)는 MIB(관리정보베이스)와 에이전트를 통해 네트워크 자원을 감시합니다.",
    "difficulty": "EASY",
    "keywords": [
      "SNMP",
      "Simple Network Management Protocol",
      "네트워크관리"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-protocols"
  },
  {
    "id": "EXP_NET_030",
    "subject": "신기술/보안",
    "category": "전송 계층 비교",
    "type": "SHORT_ANSWER",
    "question": "전송 계층 프로토콜 중 TCP와 비교했을 때 연결 설정 절차(Handshake)가 없고 수신 확인(ACK)을 하지 않아 오버헤드가 적고 실시간 방송에 적합한 비연결형 프로토콜의 약칭은 무엇인가?",
    "answer": "UDP",
    "explanation": "UDP(User Datagram Protocol)는 신뢰성보다 전송 속도와 실시간성이 중요한 DNS, 스트리밍, 온라인 게임 등에 널리 쓰입니다.",
    "difficulty": "EASY",
    "keywords": [
      "UDP",
      "User Datagram Protocol",
      "비연결형"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-tcp"
  },
  {
    "id": "EXP_NET_031",
    "subject": "신기술/보안",
    "category": "네트워크 가상화",
    "type": "SHORT_ANSWER",
    "question": "물리적인 하나의 LAN 스위치 네트워크를 여러 개의 서로 격리된 논리적인 브로드캐스트 도메인으로 분할하여 보안과 대역폭을 최적화하는 가상 근거리 통신망의 약칭은 무엇인가?",
    "answer": "VLAN",
    "explanation": "VLAN(Virtual LAN)은 물리적 위치와 무관하게 부서별로 네트워크를 논리적으로 분리합니다.",
    "difficulty": "EASY",
    "keywords": [
      "VLAN",
      "Virtual LAN",
      "가상LAN"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-devices"
  },
  {
    "id": "EXP_NET_032",
    "subject": "신기술/보안",
    "category": "네트워크 토폴로지",
    "type": "SHORT_ANSWER",
    "question": "네트워크 토폴로지 구조 중 중앙에 허브(스위치)가 위치하고 모든 노드가 1:1로 포인트 투 포인트 연결된 별 모양의 구조로, 설치는 쉽지만 중앙 장비 고장 시 전체가 마비되는 형태는 무엇인가?",
    "answer": "성형 토폴로지",
    "explanation": "성형(Star, 성형 구조) 토폴로지는 현대 이더넷 LAN의 표준 물리 구조입니다.",
    "difficulty": "EASY",
    "keywords": [
      "성형 토폴로지",
      "Star Topology",
      "중앙집중형"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-topology"
  },
  {
    "id": "EXP_NET_033",
    "subject": "신기술/보안",
    "category": "네트워크 토폴로지",
    "type": "SHORT_ANSWER",
    "question": "모든 네트워크 노드들이 서로 1:1로 모두 직접 연결되어 장애 내구성(신뢰성)은 최고이지만 케이블 설치 비용과 포트 소요가 가장 큰 그물망 구조는 무엇인가?",
    "answer": "망형 토폴로지",
    "explanation": "망형(Mesh Topology)은 n(n-1)/2개의 링크가 필요하며 군사용이나 핵심 백본망에 쓰입니다.",
    "difficulty": "EASY",
    "keywords": [
      "망형 토폴로지",
      "Mesh Topology",
      "그물망구조"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-topology"
  },
  {
    "id": "EXP_NET_034",
    "subject": "신기술/보안",
    "category": "무선 네트워크 기술",
    "type": "SHORT_ANSWER",
    "question": "근거리 무선 통신 기술 중 10cm 이내의 매우 가까운 거리에서 비접촉식으로 단말 간 데이터를 교환하여 교통카드나 모바일 간편결제에 활용되는 기술의 약칭은 무엇인가?",
    "answer": "NFC",
    "explanation": "NFC(Near Field Communication)는 13.56MHz 주파수를 이용하는 차세대 비접촉 통신 규격입니다.",
    "difficulty": "EASY",
    "keywords": [
      "NFC",
      "Near Field Communication",
      "근거리무선통신"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-wireless"
  },
  {
    "id": "EXP_NET_035",
    "subject": "신기술/보안",
    "category": "무선 네트워크 기술",
    "type": "SHORT_ANSWER",
    "question": "사물인터넷(IoT) 센서 네트워크를 위해 저전력, 저가격, 저속 통신을 목표로 설계된 IEEE 802.15.4 표준 기반의 근거리 무선 메쉬 네트워크 기술은 무엇인가?",
    "answer": "지그비",
    "explanation": "지그비(ZigBee)는 스마트 홈, 센서 네트워크 등 배터리 수명이 중요한 초소형 IoT 기기에 최적화되어 있습니다.",
    "difficulty": "EASY",
    "keywords": [
      "지그비",
      "ZigBee",
      "저전력센서네트워크"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-wireless"
  },
  {
    "id": "EXP_NET_037",
    "subject": "신기술/보안",
    "category": "소프트웨어 정의 네트워크",
    "type": "SHORT_ANSWER",
    "question": "SDN 환경에서 중앙의 SDN 컨트롤러와 물리적 스위치(데이터 평면) 장비 간에 통신하며 흐름 제어 테이블을 전송하는 대표적인 표준 통신 프로토콜의 이름은 무엇인가?",
    "answer": "OpenFlow",
    "explanation": "오픈플로우(OpenFlow)는 SDN 구현의 핵심 사우스바운드(Southbound) 표준 인터페이스 프로토콜입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "OpenFlow",
      "오픈플로우",
      "SDN표준프로토콜"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-sdn"
  },
  {
    "id": "EXP_NET_038",
    "subject": "신기술/보안",
    "category": "라우팅 알고리즘",
    "type": "SHORT_ANSWER",
    "question": "거리 벡터(Distance Vector) 라우팅 알고리즘의 기초가 되며, 인접 노드 간의 거리 정보를 주기적으로 교환하여 최단 거리를 갱신하는 대표적인 알고리즘의 이름은 무엇인가?",
    "answer": "벨만 포드",
    "explanation": "벨만-포드(Bellman-Ford) 알고리즘은 음수 가중치 간선도 처리할 수 있으며 RIP 프로토콜의 근간이 됩니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "벨만 포드",
      "Bellman-Ford",
      "거리벡터"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-routing"
  },
  {
    "id": "EXP_NET_039",
    "subject": "신기술/보안",
    "category": "다중화 기술",
    "type": "SHORT_ANSWER",
    "question": "광섬유 통신 회선 하나에 서로 다른 파장(색상)을 가진 여러 개의 광신호를 묶어 동시에 다중 전송함으로써 전송 대역폭을 극대화하는 광 다중화 기술의 약칭은 무엇인가?",
    "answer": "WDM",
    "explanation": "WDM(Wavelength Division Multiplexing, 파장 분할 다중화)은 단일 광섬유의 전송 용량을 획기적으로 확장합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "WDM",
      "Wavelength Division Multiplexing",
      "파장분할다중화"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-physical"
  },
  {
    "id": "EXP_NET_040",
    "subject": "신기술/보안",
    "category": "통신 회선 제어",
    "type": "SHORT_ANSWER",
    "question": "데이터 통신망에서 송수신 측 사이에 전용 통신 경로를 물리적으로 수립한 후 데이터를 교환하며, 연결 동안 대역폭이 독점되는 교환 방식은 회선 교환 방식인가 패킷 교환 방식인가?",
    "answer": "회선 교환 방식",
    "explanation": "회선 교환(Circuit Switching, 예: 전통 전화망)은 경로를 독점합니다. 데이터를 일정 크기 블록(패킷)으로 나누어 공유 회선으로 보내는 것은 패킷 교환 방식입니다.",
    "difficulty": "EASY",
    "keywords": [
      "회선 교환 방식",
      "Circuit Switching",
      "전용경로"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-switching"
  },
  {
    "id": "EXP_NET_041",
    "subject": "신기술/보안",
    "category": "전송 에러 검출",
    "type": "SHORT_ANSWER",
    "question": "네트워크 프레임 전송 시 집단 오류(Burst Error)를 고속으로 검출하기 위해 다항식(Polynomial) 연산 코드를 프레임 끝부분(FCS)에 붙여 검사하는 에러 검출 기법의 약칭은 무엇인가?",
    "answer": "CRC",
    "explanation": "CRC(Cyclic Redundancy Check, 순환 중복 검사)는 이더넷 2계층 FCS 필드에서 에러 검출용으로 사용됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "CRC",
      "Cyclic Redundancy Check",
      "순환중복검사"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-datalink"
  },
  {
    "id": "EXP_NET_042",
    "subject": "신기술/보안",
    "category": "전송 에러 제어",
    "type": "SHORT_ANSWER",
    "question": "수신 측이 데이터 전송 오류를 검출하는 것뿐만 아니라, 1비트의 에러가 발생했을 때 재전송 요청 없이 수신 측 스스로 직접 에러 위치를 찾아 정정할 수 있는 코드는 무엇인가?",
    "answer": "해밍 코드",
    "explanation": "해밍 코드(Hamming Code)는 패리티 비트를 추가하여 1비트 오류 자동 정정(ECC)을 제공합니다.",
    "difficulty": "EASY",
    "keywords": [
      "해밍 코드",
      "Hamming Code",
      "오류정정코드"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-datalink"
  },
  {
    "id": "EXP_NET_043",
    "subject": "신기술/보안",
    "category": "네트워크 보안 프로토콜",
    "type": "SHORT_ANSWER",
    "question": "원격 네트워크 컴퓨터 간에 전용 암호화 터널을 수립하여 공용 인터넷망을 마치 사설 전용선처럼 안전하게 이용할 수 있도록 해주는 가상 사설망의 약칭은 무엇인가?",
    "answer": "VPN",
    "explanation": "VPN(Virtual Private Network)은 IPsec이나 SSL/TLS 프로토콜을 사용해 안전한 가상 터널링을 구현합니다.",
    "difficulty": "EASY",
    "keywords": [
      "VPN",
      "Virtual Private Network",
      "가상사설망"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-vpn"
  },
  {
    "id": "EXP_NET_044",
    "subject": "신기술/보안",
    "category": "이더넷 충돌 제어",
    "type": "SHORT_ANSWER",
    "question": "유선 유선 이더넷(IEEE 802.3)에서 공유 매체 접근 시 회선을 감지(Carrier Sense)하고 데이터 충돌(Collision)이 발생하면 임의 시간 대기 후 재전송하는 다중 접속 방식의 약칭은 무엇인가?",
    "answer": "CSMA/CD",
    "explanation": "CSMA/CD(Carrier Sense Multiple Access with Collision Detection)는 충돌 검출 방식입니다. 무선 LAN(802.11)에서 충돌을 회피하는 것은 CSMA/CA입니다.",
    "difficulty": "EASY",
    "keywords": [
      "CSMA/CD",
      "충돌검출",
      "이더넷접근제어"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-datalink"
  },
  {
    "id": "EXP_NET_045",
    "subject": "신기술/보안",
    "category": "무선 LAN 충돌 제어",
    "type": "SHORT_ANSWER",
    "question": "무선 LAN(Wi-Fi, IEEE 802.11) 환경에서 무선 매체의 특성상 충돌 검출이 불가능하여 RTS/CTS 프레임을 교환하고 충돌을 사전에 회피(Collision Avoidance)하는 접속 방식의 약칭은 무엇인가?",
    "answer": "CSMA/CA",
    "explanation": "CSMA/CA는 무선 환경에서 충돌을 사전에 회피합니다.",
    "difficulty": "EASY",
    "keywords": [
      "CSMA/CA",
      "충돌회피",
      "무선LAN접근제어"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-wireless"
  },
  {
    "id": "EXP_NET_046",
    "subject": "신기술/보안",
    "category": "사설 IP 대역",
    "type": "SHORT_ANSWER",
    "question": "RFC 1918에 정의된 IPv4 사설 IP 대역 중 192.168.0.0 ~ 192.168.255.255 대역에 해당하는 네트워크 클래스는 A, B, C 중 어느 클래스인가?",
    "answer": "C클래스",
    "explanation": "10.0.0.0/8은 A클래스, 172.16.0.0/12는 B클래스, 192.168.0.0/16은 C클래스 사설 IP 대역입니다.",
    "difficulty": "EASY",
    "keywords": [
      "C클래스",
      "사설IP대역",
      "192.168"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-ip"
  },
  {
    "id": "EXP_NET_047",
    "subject": "신기술/보안",
    "category": "네트워크 서비스",
    "type": "SHORT_ANSWER",
    "question": "네트워크 상에 분산되어 있는 컴퓨터와 서버들의 시스템 시계를 정확한 원자 시계 기준 시간에 맞춰 밀리초 단위로 동기화하는 네트워크 시간 프로토콜의 약칭은 무엇인가?",
    "answer": "NTP",
    "explanation": "NTP(Network Time Protocol, UDP 123번 포트)는 분산 시스템의 타임스탬프와 로그 동기화에 필수적입니다.",
    "difficulty": "EASY",
    "keywords": [
      "NTP",
      "Network Time Protocol",
      "시간동기화"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-protocols"
  },
  {
    "id": "EXP_NET_048",
    "subject": "신기술/보안",
    "category": "네트워크 보안",
    "type": "SHORT_ANSWER",
    "question": "네트워크에 접속을 시도하는 모든 사용자 단말(PC, 모바일)의 백신 설치 여부, OS 패치 상태 등을 사전에 검증하여 정책 위반 기기의 내부망 접근을 차단하는 기술의 약칭은 무엇인가?",
    "answer": "NAC",
    "explanation": "NAC(Network Access Control, 네트워크 접근 제어)는 내부망 보안 위협을 사전 차단합니다.",
    "difficulty": "EASY",
    "keywords": [
      "NAC",
      "Network Access Control",
      "단말보안검증"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-security"
  },
  {
    "id": "EXP_NET_049",
    "subject": "신기술/보안",
    "category": "응용 계층 프로토콜",
    "type": "SHORT_ANSWER",
    "question": "인터넷에서 대용량 파일을 고속으로 업로드하고 다운로드하기 위해 제어 포트(21번)와 데이터 전송 포트(20번) 2개의 채널을 분리 운영하는 프로토콜의 약칭은 무엇인가?",
    "answer": "FTP",
    "explanation": "FTP(File Transfer Protocol)는 명령 제어용 연결(21번)과 실제 파일 전송용 연결(20번)을 분리하여 사용합니다.",
    "difficulty": "EASY",
    "keywords": [
      "FTP",
      "File Transfer Protocol",
      "21번포트"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-protocols"
  },
  {
    "id": "EXP_NET_050",
    "subject": "신기술/보안",
    "category": "IP 주소 체계",
    "type": "SHORT_ANSWER",
    "question": "IPv4 주소 클래스 중 특정 그룹에 속한 다수의 호스트들에게 동시에 패킷을 전달하기 위한 멀티캐스트(Multicast) 전용 주소 대역(224.0.0.0 ~ 239.255.255.255)으로 할당된 클래스는 무엇인가?",
    "answer": "D클래스",
    "explanation": "A, B, C클래스는 유니캐스트, D클래스는 멀티캐스트, E클래스는 연구 및 실험용 예약 주소입니다.",
    "difficulty": "EASY",
    "keywords": [
      "D클래스",
      "멀티캐스트대역",
      "IPv4클래스"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-net-ip"
  },
  {
    "id": "EXP_SEC1_001",
    "subject": "신기술/보안",
    "category": "블록 암호 모드",
    "type": "SHORT_ANSWER",
    "question": "블록 암호 운영 모드 중 평문 블록들을 각각 독립적으로 동일한 비밀키로 암호화하여 동일한 평문 블록이 항상 동일한 암호문 블록을 생성하므로 패턴 노출에 가장 취약한 모드는 무엇인가?",
    "answer": "ECB",
    "explanation": "ECB(Electronic Codebook, 전자 코드북) 모드는 블록 간의 연쇄가 없어 가장 단순하지만 보안성이 매우 취약합니다.",
    "difficulty": "EASY",
    "keywords": [
      "ECB",
      "Electronic Codebook",
      "블록암호모드"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-modes"
  },
  {
    "id": "EXP_SEC1_002",
    "subject": "신기술/보안",
    "category": "블록 암호 모드",
    "type": "SHORT_ANSWER",
    "question": "블록 암호 운영 모드 중 이전 암호문 블록과 현재 평문 블록을 XOR 연산한 후 암호화하며, 첫 번째 평문 블록 암호화를 위해 고유한 초기화 벡터(IV)를 반드시 사용하는 모드는 무엇인가?",
    "answer": "CBC",
    "explanation": "CBC(Cipher Block Chaining, 암호 블록 연쇄) 모드는 평문 패턴을 완벽히 은폐하며 가장 널리 쓰이는 표준 모드입니다.",
    "difficulty": "EASY",
    "keywords": [
      "CBC",
      "Cipher Block Chaining",
      "초기화벡터"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-modes"
  },
  {
    "id": "EXP_SEC1_003",
    "subject": "신기술/보안",
    "category": "블록 암호 모드",
    "type": "SHORT_ANSWER",
    "question": "블록 암호 모드 중 1씩 증가하는 고유한 카운터(Counter) 값을 블록 암호기로 암호화한 키 스트림을 평문과 XOR 연산하여 병렬 암호화/복호화가 가능한 고속 모드는 무엇인가?",
    "answer": "CTR",
    "explanation": "CTR(Counter, 카운터) 모드는 블록 암호를 스트림 암호처럼 구동하며 멀티코어 환경에서 병렬 처리가 가능합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "CTR",
      "Counter",
      "병렬암호화"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-modes"
  },
  {
    "id": "EXP_SEC1_004",
    "subject": "신기술/보안",
    "category": "블록 암호 모드",
    "type": "SHORT_ANSWER",
    "question": "블록 암호 모드 중 암호기의 출력(Output) 값을 다음 단계 암호기의 입력으로 직접 피드백하여 전송 채널 상의 1비트 오류가 후속 암호 블록으로 전파되지 않는 모드는 무엇인가?",
    "answer": "OFB",
    "explanation": "OFB(Output Feedback, 출력 피드백) 모드는 에러 전파(Error Propagation)가 발생하지 않는 특징이 있습니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "OFB",
      "Output Feedback",
      "에러전파없음"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-modes"
  },
  {
    "id": "EXP_SEC1_005",
    "subject": "신기술/보안",
    "category": "대칭키 암호",
    "type": "SHORT_ANSWER",
    "question": "64비트 블록 암호 알고리즘 DES에서 8비트의 패리티 검사 비트를 제외하고 실제 암호화 연산에 사용되는 순수 유효 비밀키의 크기는 몇 비트인가? (숫자만 작성)",
    "answer": [
      "56",
      "56비트"
    ],
    "explanation": "DES의 전체 키 길이는 64비트이지만 8비트 패리티 검사 비트를 제외한 56비트가 실제 암호화 연산에 사용되는 유효 키입니다.",
    "difficulty": "EASY",
    "keywords": [
      "DES",
      "Data Encryption Standard",
      "56비트키"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-ciphers"
  },
  {
    "id": "EXP_SEC1_006",
    "subject": "신기술/보안",
    "category": "대칭키 암호",
    "type": "SHORT_ANSWER",
    "question": "DES의 취약한 키 길이를 보완하기 위해 2개 또는 3개의 서로 다른 키를 사용하여 \"암호화 → 복호화 → 암호화(EDE)\" 과정을 3번 반복 적용하는 알고리즘은 무엇인가?",
    "answer": "3DES",
    "explanation": "Triple DES(3DES)는 기존 DES 하드웨어를 재활용하면서 보안성을 높인 과도기적 알고리즘입니다.",
    "difficulty": "EASY",
    "keywords": [
      "3DES",
      "Triple DES",
      "EDE방식"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-ciphers"
  },
  {
    "id": "EXP_SEC1_008",
    "subject": "신기술/보안",
    "category": "대칭키 암호",
    "type": "SHORT_ANSWER",
    "question": "한국인터넷진흥원(KISA)이 전자상거래와 공공 보안을 위해 개발한 국내 표준 블록 암호 알고리즘으로, 128비트 블록 크기와 16라운드 Feistel 구조를 사용하는 것은 무엇인가?",
    "answer": "SEED",
    "explanation": "SEED는 대한민국의 국가 표준 대칭키 블록 암호 알고리즘입니다.",
    "difficulty": "EASY",
    "keywords": [
      "SEED",
      "KISA",
      "국내표준암호"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-ciphers"
  },
  {
    "id": "EXP_SEC1_009",
    "subject": "신기술/보안",
    "category": "대칭키 암호",
    "type": "SHORT_ANSWER",
    "question": "국가정보원과 국가보안기술연구소(NSRI)가 주도하여 개발한 128비트 블록 크기의 국가 표준 암호로, AES와 동일한 SPN(치환-순열망) 구조를 채택한 국내 알고리즘은 무엇인가?",
    "answer": "ARIA",
    "explanation": "ARIA(Academy Research Institute Agency)는 경량 하드웨어 및 범용 프로세서에서 고속 동작하는 대한민국 표준 암호입니다.",
    "difficulty": "EASY",
    "keywords": [
      "ARIA",
      "국정원암호",
      "SPN구조"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-ciphers"
  },
  {
    "id": "EXP_SEC1_010",
    "subject": "신기술/보안",
    "category": "대칭키 암호",
    "type": "SHORT_ANSWER",
    "question": "초소형 사물인터넷(IoT) 기기, RFID 태그, 스마트카드 등 자원이 극도로 제한된 환경을 위해 개발된 64비트 블록 크기의 초경량 블록 암호 알고리즘은 무엇인가?",
    "answer": "HIGHT",
    "explanation": "HIGHT(HIGh security and lightweigHT)는 저전력 초경량 환경을 위한 한국 표준 암호입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "HIGHT",
      "초경량암호",
      "RFID암호"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-ciphers"
  },
  {
    "id": "EXP_SEC1_012",
    "subject": "신기술/보안",
    "category": "비대칭키 암호",
    "type": "SHORT_ANSWER",
    "question": "타원곡선 상의 이산대수 문제에 기반하여 RSA보다 훨씬 짧은 키 길이(256비트가 RSA 3072비트 수준)로 동일한 보안 강도를 제공하여 모바일 기기에 최적화된 공개키 암호는 무엇인가?",
    "answer": "ECC",
    "explanation": "ECC(Elliptic Curve Cryptography)는 적은 연산량과 짧은 키 길이로 스마트폰 및 IoT 암호화의 핵심 기술입니다.",
    "difficulty": "EASY",
    "keywords": [
      "ECC",
      "Elliptic Curve",
      "타원곡선암호"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-ciphers"
  },
  {
    "id": "EXP_SEC1_013",
    "subject": "신기술/보안",
    "category": "비대칭키 암호",
    "type": "SHORT_ANSWER",
    "question": "공개된 안전하지 않은 통신 채널 상에서 사전 비밀 공유 없이 두 사용자가 안전하게 동일한 대칭 비밀키를 공유할 수 있도록 고안된 최초의 비밀키 교환 프로토콜은 무엇인가?",
    "answer": "디피 헬만",
    "explanation": "디피-헬만(Diffie-Hellman) 키 교환 알고리즘은 이산대수 문제에 기반하지만, 상호 인증 기능이 없어 중간자 공격(MITM)에 취약합니다.",
    "difficulty": "EASY",
    "keywords": [
      "디피 헬만",
      "Diffie-Hellman",
      "키교환프로토콜"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-ciphers"
  },
  {
    "id": "EXP_SEC1_015",
    "subject": "신기술/보안",
    "category": "해시 함수 보안",
    "type": "SHORT_ANSWER",
    "question": "사전에 미리 계산해 둔 대규모의 해시값 역추적 조회표(레인보우 테이블)를 무력화하기 위해, 사용자의 패스워드 원문에 임의의 난수 문자열을 덧붙여 해싱하는 기법은 무엇인가?",
    "answer": "솔트",
    "explanation": "솔트(Salt, 솔팅)는 동일한 패스워드라도 서로 다른 다이제스트가 생성되도록 만들어 무차별 대입 공격을 차단합니다.",
    "difficulty": "EASY",
    "keywords": [
      "솔트",
      "Salt",
      "레인보우테이블방어"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-hash"
  },
  {
    "id": "EXP_SEC1_016",
    "subject": "신기술/보안",
    "category": "보안 통제 모델",
    "type": "SHORT_ANSWER",
    "question": "군사적 기밀성을 보장하기 위해 고안된 보안 모델로, 자신의 보안 등급보다 높은 문서는 읽을 수 없고(No Read Up) 낮은 문서에는 쓸 수 없는(No Write Down) 모델은 무엇인가?",
    "answer": "벨 라파듈라",
    "explanation": "벨-라파듈라(BLP, Bell-LaPadula) 모델은 기밀성(Confidentiality) 유지가 최우선 목표입니다.",
    "difficulty": "EASY",
    "keywords": [
      "벨 라파듈라",
      "BLP",
      "기밀성모델",
      "No Read Up"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-models"
  },
  {
    "id": "EXP_SEC1_018",
    "subject": "신기술/보안",
    "category": "보안 통제 모델",
    "type": "SHORT_ANSWER",
    "question": "금융이나 전자상거래 같은 상업적 환경을 위해 고안된 무결성 모델로, 직무 분리(Separation of Duties)와 감사 추적을 바탕으로 허가된 절차를 통해서만 데이터를 변환시키는 모델은 무엇인가?",
    "answer": "클락 윌슨",
    "explanation": "클락-윌슨(Clark-Wilson) 모델은 CDI, UDI, TP(변환절차), IVP(검증절차)를 통해 데이터의 변조를 막는 상업용 무결성 모델입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "클락 윌슨",
      "Clark-Wilson",
      "직무분리",
      "상업무결성"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-models"
  },
  {
    "id": "EXP_SEC1_020",
    "subject": "신기술/보안",
    "category": "접근 통제 정책",
    "type": "SHORT_ANSWER",
    "question": "관리자나 시스템이 설정한 보안 등급(Secret, Top Secret 등)과 주체의 인가 등급을 중앙에서 비교하여 규칙 기반으로 접근을 강제 통제하는 방식의 약칭은 무엇인가?",
    "answer": "MAC",
    "explanation": "MAC(Mandatory Access Control, 강제적 접근 통제)는 보안 관리자만 권한을 설정할 수 있어 군사/정부 시스템에 쓰입니다.",
    "difficulty": "EASY",
    "keywords": [
      "MAC",
      "Mandatory Access Control",
      "강제적접근통제"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-access"
  },
  {
    "id": "EXP_SEC1_021",
    "subject": "신기술/보안",
    "category": "접근 통제 정책",
    "type": "SHORT_ANSWER",
    "question": "사용자 개인에게 직접 권한을 주지 않고, 조직 내에서 사용자가 맡은 역할(Role)에 권한을 매핑한 후 사용자에게 해당 역할을 배정하는 접근 통제 방식의 약칭은 무엇인가?",
    "answer": "RBAC",
    "explanation": "RBAC(Role-Based Access Control, 역할 기반 접근 통제)는 인사 이동이 잦은 기업 환경에서 권한 관리가 매우 효율적입니다.",
    "difficulty": "EASY",
    "keywords": [
      "RBAC",
      "Role-Based Access Control",
      "역할기반"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-access"
  },
  {
    "id": "EXP_SEC1_022",
    "subject": "신기술/보안",
    "category": "접근 통제 정책",
    "type": "SHORT_ANSWER",
    "question": "주체의 속성, 객체의 속성, 환경 조건(시간, 위치, 디바이스 상태 등)을 동적으로 결합하여 세분화된 보안 정책을 적용하는 속성 기반 접근 통제의 약칭은 무엇인가?",
    "answer": "ABAC",
    "explanation": "ABAC(Attribute-Based Access Control)는 XACML 표준을 기반으로 상황 인지형 동적 접근 제어를 제공합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "ABAC",
      "Attribute-Based Access Control",
      "속성기반"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-access"
  },
  {
    "id": "EXP_SEC1_023",
    "subject": "신기술/보안",
    "category": "정보보안 3대 요소",
    "type": "SHORT_ANSWER",
    "question": "인가되지 않은 사용자가 정보 시스템의 자원이나 데이터 내용을 도청하거나 열람할 수 없도록 보장하는 정보보안의 기본 원칙은 무엇인가?",
    "answer": "기밀성",
    "explanation": "기밀성(Confidentiality)은 암호화와 접근 통제를 통해 비인가자의 정보 노출을 방지합니다.",
    "difficulty": "EASY",
    "keywords": [
      "기밀성",
      "Confidentiality",
      "보안3요소"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-cia"
  },
  {
    "id": "EXP_SEC1_025",
    "subject": "신기술/보안",
    "category": "정보보안 3대 요소",
    "type": "SHORT_ANSWER",
    "question": "인가된 적법한 사용자가 필요한 시점에 방해받지 않고 언제든지 정보 시스템과 자원을 즉시 이용할 수 있도록 보장하는 보안 원칙은 무엇인가?",
    "answer": "가용성",
    "explanation": "가용성(Availability)은 DoS/DDoS 방어, 이중화, 백업 등을 통해 시스템이 지속 가동되도록 보장합니다.",
    "difficulty": "EASY",
    "keywords": [
      "가용성",
      "Availability",
      "시스템상시가동"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-cia"
  },
  {
    "id": "EXP_SEC1_026",
    "subject": "신기술/보안",
    "category": "전자 서명",
    "type": "SHORT_ANSWER",
    "question": "송신자가 데이터를 전송했거나 승인한 사실을 나중에 거짓으로 발뺌(부인)할 수 없도록 전자서명 등으로 증명하는 정보보안 속성은 무엇인가?",
    "answer": "부인 방지",
    "explanation": "부인 방지(Non-repudiation)는 송신자의 개인키로 서명하여 송신 사실과 수신 사실을 법적으로 증명합니다.",
    "difficulty": "EASY",
    "keywords": [
      "부인 방지",
      "Non-repudiation",
      "전자서명"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-pki"
  },
  {
    "id": "EXP_SEC1_027",
    "subject": "신기술/보안",
    "category": "전자 서명",
    "type": "SHORT_ANSWER",
    "question": "전자서명 생성 시 송신자는 원본 문서의 해시값을 자신의 어떤 키(공개키 / 개인키)로 암호화하여 서명 값을 만들어내는가?",
    "answer": "개인키",
    "explanation": "전자서명은 송신자의 비밀 개인키(Private Key)로 암호화하고, 수신자는 송신자의 공개키(Public Key)로 복호화하여 서명을 검증합니다.",
    "difficulty": "EASY",
    "keywords": [
      "개인키",
      "Private Key",
      "전자서명생성"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-pki"
  },
  {
    "id": "EXP_SEC1_028",
    "subject": "신기술/보안",
    "category": "공개키 기반 구조",
    "type": "SHORT_ANSWER",
    "question": "공개키의 신뢰성을 보증하기 위해 공인인증기관(CA)이 발행하는 디지털 공개키 인증서의 세계 표준 규격 명칭은 무엇인가?",
    "answer": "X.509",
    "explanation": "X.509 표준 인증서는 버전, 일련번호, 서명 알고리즘, 발행자, 유효기간, 주체 공개키 정보 등을 담고 있습니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "X.509",
      "인증서표준",
      "PKI"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-pki"
  },
  {
    "id": "EXP_SEC1_029",
    "subject": "신기술/보안",
    "category": "공개키 기반 구조",
    "type": "SHORT_ANSWER",
    "question": "유효기간이 만료되기 전에 개인키 유출이나 신분 변경 등으로 인해 효력이 상실된 인증서들의 목록을 담고 있는 인증서 폐기 목록의 약칭은 무엇인가?",
    "answer": "CRL",
    "explanation": "CRL(Certificate Revocation List)은 인증기관이 주기적으로 배포하는 폐기된 인증서 목록입니다. 실시간 조회를 위한 온라인 프로토콜은 OCSP입니다.",
    "difficulty": "EASY",
    "keywords": [
      "CRL",
      "Certificate Revocation List",
      "인증서폐기목록"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-pki"
  },
  {
    "id": "EXP_SEC1_030",
    "subject": "신기술/보안",
    "category": "공개키 기반 구조",
    "type": "SHORT_ANSWER",
    "question": "인증서 폐기 목록(CRL)을 매번 다운로드받는 오버헤드를 없애고, 특정 인증서의 유효/폐기 상태를 인증 서버에 실시간으로 질의하여 확인하는 온라인 프로토콜의 약칭은 무엇인가?",
    "answer": "OCSP",
    "explanation": "OCSP(Online Certificate Status Protocol)는 실시간으로 개별 인증서의 유효성을 경량 질의/응답합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "OCSP",
      "Online Certificate Status",
      "실시간인증서검증"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-pki"
  },
  {
    "id": "EXP_SEC1_031",
    "subject": "신기술/보안",
    "category": "사용자 인증",
    "type": "SHORT_ANSWER",
    "question": "한 번의 시스템 로그인 성공으로 연동된 다른 모든 웹 사이트와 애플리케이션 서비스들을 추가 인증 없이 자동으로 이용할 수 있게 해주는 통합 인증 기술의 약칭은 무엇인가?",
    "answer": "SSO",
    "explanation": "SSO(Single Sign-On)는 중앙 인증 서버(CAS 등)를 두어 사용자의 편의성과 계정 관리 효율을 극대화합니다.",
    "difficulty": "EASY",
    "keywords": [
      "SSO",
      "Single Sign-On",
      "통합인증"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-auth"
  },
  {
    "id": "EXP_SEC1_032",
    "subject": "신기술/보안",
    "category": "사용자 인증",
    "type": "SHORT_ANSWER",
    "question": "사용자가 자신의 비밀번호를 제3자 앱에 직접 노출하지 않고, 구글이나 카카오 등 인증 제공자로부터 인가 토큰(Access Token)을 발급받아 자원 접근 권한을 위임하는 개방형 인가 표준은 무엇인가?",
    "answer": "OAuth",
    "explanation": "OAuth 2.0(Open Authorization)은 안전한 API 권한 위임을 위한 표준 프레임워크입니다.",
    "difficulty": "EASY",
    "keywords": [
      "OAuth",
      "Open Authorization",
      "권한위임"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-auth"
  },
  {
    "id": "EXP_SEC1_033",
    "subject": "신기술/보안",
    "category": "인증 토큰",
    "type": "SHORT_ANSWER",
    "question": "헤더(Header), 내용(Payload), 서명(Signature) 3개 영역이 점(.)으로 구분되어 JSON 형식으로 클레임 정보를 안전하게 전달하는 경량 웹 토큰 표준의 약칭은 무엇인가?",
    "answer": "JWT",
    "explanation": "JWT(JSON Web Token)는 자체 완결적(Self-contained) 토큰으로 세션 저장소 없이 토큰 자체 서명 검증만으로 무상태 인증을 구현합니다.",
    "difficulty": "EASY",
    "keywords": [
      "JWT",
      "JSON Web Token",
      "웹토큰"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-auth"
  },
  {
    "id": "EXP_SEC1_034",
    "subject": "신기술/보안",
    "category": "다중 요소 인증",
    "type": "SHORT_ANSWER",
    "question": "지식 기반(비밀번호), 소지 기반(스마트폰/OTP), 생체 기반(지문/홍채) 중 서로 다른 2가지 이상의 독립된 인증 요소를 결합하여 보안을 강화하는 인증 방식의 약칭은 무엇인가?",
    "answer": "MFA",
    "explanation": "MFA(Multi-Factor Authentication, 다중 요소 인증)는 단일 인증 수단 침해로 인한 계정 탈취를 방지합니다.",
    "difficulty": "EASY",
    "keywords": [
      "MFA",
      "Multi-Factor Authentication",
      "다중요소인증"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-auth"
  },
  {
    "id": "EXP_SEC1_035",
    "subject": "신기술/보안",
    "category": "인증 기술",
    "type": "SHORT_ANSWER",
    "question": "매번 로그인할 때마다 고정되지 않은 무작위 6자리 일회용 비밀번호를 동적으로 생성하여 재사용 공격(Replay Attack)을 원천 차단하는 인증 기술의 약칭은 무엇인가?",
    "answer": "OTP",
    "explanation": "OTP(One Time Password)는 시간 동기 방식(TOTP)이나 이벤트 카운터 방식(HOTP)으로 매회 일회용 비밀번호를 만듭니다.",
    "difficulty": "EASY",
    "keywords": [
      "OTP",
      "One Time Password",
      "일회용비밀번호"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-auth"
  },
  {
    "id": "EXP_SEC1_036",
    "subject": "신기술/보안",
    "category": "패스워드 크래킹",
    "type": "SHORT_ANSWER",
    "question": "사전에 등재된 단어 목록(사전 파일)들을 프로그램으로 순차 대입하여 취약한 패스워드를 알아내는 고전적인 공격 기법은 무엇인가?",
    "answer": "사전 공격",
    "explanation": "사전 공격(Dictionary Attack)은 무차별 대입 공격보다 시도 횟수를 대폭 줄여 빈출 단어 위주로 빠르게 크랙합니다.",
    "difficulty": "EASY",
    "keywords": [
      "사전 공격",
      "Dictionary Attack",
      "패스워드크래킹"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-attacks"
  },
  {
    "id": "EXP_SEC1_037",
    "subject": "신기술/보안",
    "category": "패스워드 크래킹",
    "type": "SHORT_ANSWER",
    "question": "가능한 모든 문자들의 조합(영문, 숫자, 특수문자 전체)을 하나씩 빠짐없이 끝까지 대입하여 비밀번호를 찾아내는 가장 단순하지만 확실한 공격 기법은 무엇인가?",
    "answer": "무차별 대입 공격",
    "explanation": "무차별 대입 공격(Brute Force Attack)은 시간과 연산 자원만 충분하다면 원리상 100% 해독 가능한 공격입니다.",
    "difficulty": "EASY",
    "keywords": [
      "무차별 대입 공격",
      "Brute Force",
      "전수조사공격"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-attacks"
  },
  {
    "id": "EXP_SEC1_038",
    "subject": "신기술/보안",
    "category": "키 분배 메커니즘",
    "type": "SHORT_ANSWER",
    "question": "대칭키 분배 센터(KDC) 방식을 기반으로 티켓(Ticket) 개념을 도입하여 안전하지 않은 분산 네트워크 환경에서 상호 인증을 제공하는 대표 인증 프로토콜은 무엇인가?",
    "answer": "커버로스",
    "explanation": "커버로스(Kerberos)는 TGT(티켓 발급 티켓)와 세션 티켓을 사용해 비밀번호의 평문 전송 없이 안전하게 클라이언트-서버 인증을 수행합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "커버로스",
      "Kerberos",
      "티켓기반인증"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-auth"
  },
  {
    "id": "EXP_SEC1_039",
    "subject": "신기술/보안",
    "category": "보안 통제",
    "type": "SHORT_ANSWER",
    "question": "데이터베이스 암호화 방식 중 데이터베이스 엔진 내부의 트리거(Trigger)나 사용자 정의 함수 패키지를 통해 암/복호화를 수행하는 방식을 무엇이라 하는가?",
    "answer": "Plug-in 방식",
    "explanation": "플러그인(Plug-in) 방식은 DB 서버 내부에 모듈을 설치해 애플리케이션의 수정 없이 암호화를 적용합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "Plug-in 방식",
      "플러그인방식",
      "DB암호화"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-dbsec"
  },
  {
    "id": "EXP_SEC1_040",
    "subject": "신기술/보안",
    "category": "보안 통제",
    "type": "SHORT_ANSWER",
    "question": "데이터베이스 암호화 방식 중 애플리케이션 서버 소스코드 레벨에서 API 라이브러리를 직접 호출하여 암호화된 데이터를 DB로 전송하는 방식은 무엇인가?",
    "answer": "API 방식",
    "explanation": "API 방식은 애플리케이션 서버에서 암/복호화가 이루어지므로 DB 서버에 부하를 주지 않고 통신 구간도 안전하지만 소스 수정이 필요합니다.",
    "difficulty": "EASY",
    "keywords": [
      "API 방식",
      "DB암호화",
      "애플리케이션암호화"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-dbsec"
  },
  {
    "id": "EXP_SEC1_041",
    "subject": "신기술/보안",
    "category": "보안 통제",
    "type": "SHORT_ANSWER",
    "question": "데이터베이스 암호화 방식 중 DBMS 커널 내부에서 데이터 파일이 디스크에 저장될 때 자동으로 투명하게 암호화하고 읽을 때 복호화하는 TDE 기술의 전체 명칭은 무엇인가?",
    "answer": "투명한 데이터 암호화",
    "explanation": "TDE(Transparent Data Encryption)는 애플리케이션과 쿼리의 수정 없이 저장 데이터(Data at Rest)를 자동 암호화합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "투명한 데이터 암호화",
      "TDE",
      "Transparent Data Encryption"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-dbsec"
  },
  {
    "id": "EXP_SEC1_042",
    "subject": "신기술/보안",
    "category": "개인정보 보호",
    "type": "SHORT_ANSWER",
    "question": "주민등록번호나 신용카드 번호 같은 민감한 원본 데이터를 고유한 난수 형태의 토큰(Token) 값으로 치환하여 보관함으로써 유출 시 피해를 방지하는 보안 기술은 무엇인가?",
    "answer": "토큰화",
    "explanation": "토큰화(Tokenization)는 원본 데이터 대신 수학적 연관성이 없는 토큰을 사용하여 보안 위험을 분리합니다.",
    "difficulty": "EASY",
    "keywords": [
      "토큰화",
      "Tokenization",
      "개인정보보호"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-privacy"
  },
  {
    "id": "EXP_SEC1_043",
    "subject": "신기술/보안",
    "category": "개인정보 보호",
    "type": "SHORT_ANSWER",
    "question": "특정 개인의 데이터를 마스킹, 가명처리, 범주화 등의 방법으로 가공하여 더 이상 특정 개인을 알아볼 수 없도록 조치하는 과정을 무엇이라 하는가?",
    "answer": "비식별화",
    "explanation": "비식별화(De-identification)는 데이터의 활용성을 보장하면서 개인 프라이버시 침해를 예방하는 기법입니다.",
    "difficulty": "EASY",
    "keywords": [
      "비식별화",
      "De-identification",
      "가명정보"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-privacy"
  },
  {
    "id": "EXP_SEC1_044",
    "subject": "신기술/보안",
    "category": "개인정보 보호",
    "type": "SHORT_ANSWER",
    "question": "프라이버시 보호 모델 중 데이터셋 내에서 특정 개인과 동일한 준식별자(나이, 성별, 지역 등) 속성 값을 가진 사람이 최소 k명 이상 존재하도록 익명화하는 모델은 무엇인가?",
    "answer": "k-익명성",
    "explanation": "k-익명성(k-Anonymity)은 재식별 위험을 1/k 이하로 낮춥니다. 동질성 공격을 막기 위해 다양성을 보장하는 것은 l-다양성입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "k-익명성",
      "k-Anonymity",
      "비식별화모델"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-privacy"
  },
  {
    "id": "EXP_SEC1_045",
    "subject": "신기술/보안",
    "category": "개인정보 보호",
    "type": "SHORT_ANSWER",
    "question": "k-익명성 모델에서 동질적인 민감 정보가 집중되는 결함(동질성 공격)을 방지하기 위해, 동등 클래스 내의 민감한 속성 값들의 종류가 최소 l개 이상 다양하도록 보장하는 모델은 무엇인가?",
    "answer": "l-다양성",
    "explanation": "l-다양성(l-Diversity)은 k-익명성의 취약점을 보완하여 정보 누출을 방지합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "l-다양성",
      "l-Diversity",
      "동질성공격방어"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-privacy"
  },
  {
    "id": "EXP_SEC1_046",
    "subject": "신기술/보안",
    "category": "정보보호 관리체계",
    "type": "SHORT_ANSWER",
    "question": "기업의 주요 정보 자산과 개인정보를 안전하게 보호하기 위해 과학기술정보통신부와 개인정보보호위원회가 공동 운영하는 한국의 종합 정보보호 인증 제도의 약칭은 무엇인가?",
    "answer": "ISMS-P",
    "explanation": "ISMS-P는 정보보호 관리체계(ISMS)와 개인정보보호 관리체계(PIMS)를 통합한 국가 인증 제도입니다.",
    "difficulty": "EASY",
    "keywords": [
      "ISMS-P",
      "정보보호관리체계",
      "인증제도"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-isms"
  },
  {
    "id": "EXP_SEC1_047",
    "subject": "신기술/보안",
    "category": "정보보호 평가 기준",
    "type": "SHORT_ANSWER",
    "question": "국가마다 서로 다른 정보보호 시스템의 보안 평가 기준을 상호 인정하기 위해 제정한 다국적 국제 공통 평가 기준(ISO/IEC 15408)의 약칭은 무엇인가?",
    "answer": "CC",
    "explanation": "CC(Common Criteria, 공통평가기준)는 EAL1부터 EAL7까지 7등급의 평가 보증 등급을 규정합니다.",
    "difficulty": "EASY",
    "keywords": [
      "CC",
      "Common Criteria",
      "공통평가기준"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-cc"
  },
  {
    "id": "EXP_SEC1_048",
    "subject": "신기술/보안",
    "category": "정보보호 평가 기준",
    "type": "SHORT_ANSWER",
    "question": "CC(공통평가기준) 인증에서 평가 대상이 되는 정보보호 시스템 제품 또는 보안 소프트웨어를 가리키는 용어의 약칭은 무엇인가?",
    "answer": "TOE",
    "explanation": "TOE(Target of Evaluation, 평가 대상 제품)는 CC 인증 평가의 실제 대상체를 뜻합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "TOE",
      "Target of Evaluation",
      "평가대상제품"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-cc"
  },
  {
    "id": "EXP_SEC1_049",
    "subject": "신기술/보안",
    "category": "정보보호 평가 기준",
    "type": "SHORT_ANSWER",
    "question": "CC 인증에서 특정 제품군(예: 방화벽 제품군)이 충족해야 하는 표준적인 보안 요구사항들을 정의해 둔 표준 문서를 무엇이라 하는가?",
    "answer": "보호 프로파일",
    "explanation": "보호 프로파일(PP, Protection Profile)은 소비자가 요구하는 공통 보안 명세서입니다. 특정 제조사 제품의 상세 보안 사양서는 보안 목표명세서(ST)입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "보호 프로파일",
      "Protection Profile",
      "PP"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-cc"
  },
  {
    "id": "EXP_SEC1_050",
    "subject": "신기술/보안",
    "category": "보안 철학",
    "type": "SHORT_ANSWER",
    "question": "\"아무것도 신뢰하지 말고 항상 모든 접근을 검증하라(Never Trust, Always Verify)\"는 철학 아래 내부망 접근자라도 매번 엄격한 인증과 권한을 검증하는 차세대 보안 모델은 무엇인가?",
    "answer": "제로 트러스트",
    "explanation": "제로 트러스트(Zero Trust)는 경계 기반 보안의 한계를 극복하고 최소 권한 원칙과 지속적 검증을 적용합니다.",
    "difficulty": "EASY",
    "keywords": [
      "제로 트러스트",
      "Zero Trust",
      "Always Verify"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-zerotrust"
  },
  {
    "id": "EXP_SEC2_001",
    "subject": "신기술/보안",
    "category": "웹 취약점 방어",
    "type": "SHORT_ANSWER",
    "question": "SQL Injection 공격을 원천 방지하기 위해 사용자 입력을 동적 문자열 결합 대신 쿼리 구조를 미리 컴파일하고 바인딩 변수(?)를 사용하는 데이터베이스 프로그래밍 객체는 무엇인가?",
    "answer": "PreparedStatement",
    "explanation": "PreparedStatement(바인딩 쿼리)는 사용자 입력을 단순 데이터 리터럴로만 취급하여 SQL 문법 구조가 변조되는 것을 차단합니다.",
    "difficulty": "EASY",
    "keywords": [
      "PreparedStatement",
      "SQL인젝션방어",
      "바인딩변수"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-webvuln"
  },
  {
    "id": "EXP_SEC2_002",
    "subject": "신기술/보안",
    "category": "웹 취약점",
    "type": "SHORT_ANSWER",
    "question": "XSS 공격 유형 중 공격자가 악의적인 스크립트를 게시판이나 댓글 등 웹 애플리케이션 데이터베이스에 영구 저장시켜 불특정 다수의 방문자 브라우저에서 실행되게 만드는 공격은 무엇인가?",
    "answer": "Stored XSS",
    "explanation": "저장형 XSS(Stored XSS)는 스크립트가 DB에 저장되어 지속적으로 다수의 사용자 세션 쿠키를 탈취합니다.",
    "difficulty": "EASY",
    "keywords": [
      "Stored XSS",
      "저장형XSS",
      "게시판스크립트"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-webvuln"
  },
  {
    "id": "EXP_SEC2_003",
    "subject": "신기술/보안",
    "category": "웹 취약점",
    "type": "SHORT_ANSWER",
    "question": "XSS 공격 유형 중 악성 스크립트가 포함된 피싱 URL 링크를 피해자가 클릭했을 때 서버의 검색 결과 화면 등을 통해 즉시 브라우저로 반사되어 실행되는 공격은 무엇인가?",
    "answer": "Reflected XSS",
    "explanation": "반사형 XSS(Reflected XSS)는 서버 DB에 저장되지 않고 요청 파라미터가 응답 화면에 그대로 노출될 때 발생합니다.",
    "difficulty": "EASY",
    "keywords": [
      "Reflected XSS",
      "반사형XSS",
      "피싱링크"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-webvuln"
  },
  {
    "id": "EXP_SEC2_004",
    "subject": "신기술/보안",
    "category": "웹 취약점 방어",
    "type": "SHORT_ANSWER",
    "question": "웹 브라우저에서 스크립트(JavaScript)가 document.cookie를 통해 세션 쿠키에 직접 접근하지 못하도록 차단하여 XSS 쿠키 탈취를 방지하는 쿠키 보안 플래그는 무엇인가?",
    "answer": "HttpOnly",
    "explanation": "HttpOnly 플래그가 설정된 쿠키는 HTTP 통신으로만 전송되며 자바스크립트 브라우저 API로는 읽을 수 없습니다.",
    "difficulty": "EASY",
    "keywords": [
      "HttpOnly",
      "쿠키보안플래그",
      "XSS방어"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-webvuln"
  },
  {
    "id": "EXP_SEC2_005",
    "subject": "신기술/보안",
    "category": "웹 취약점 방어",
    "type": "SHORT_ANSWER",
    "question": "XSS 방어를 위해 사용자가 입력한 HTML 특수문자(<, >, &, \", ' 등)를 안전한 문자 엔티티(&lt;, &gt; 등)로 변환하는 기법을 무엇이라 하는가?",
    "answer": "HTML 엔티티 치환",
    "explanation": "HTML 인코딩(치환)은 브라우저가 스크립트 태그를 실행 코드로 해석하지 않고 단순 텍스트로 렌더링하게 만듭니다.",
    "difficulty": "EASY",
    "keywords": [
      "HTML 엔티티 치환",
      "HTML인코딩",
      "특수문자치환"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-webvuln"
  },
  {
    "id": "EXP_SEC2_007",
    "subject": "신기술/보안",
    "category": "웹 취약점 방어",
    "type": "SHORT_ANSWER",
    "question": "CSRF 공격을 방어하기 위해 매 폼(Form) 요청마다 서버가 생성한 예측 불가능한 고유 난수 값을 세션과 폼 데이터에 일치시키도록 검증하는 방어 수단은 무엇인가?",
    "answer": "CSRF 토큰",
    "explanation": "CSRF 토큰은 공격자가 외부 사이트에서 피해자 브라우저로 위조 요청을 보내더라도 토큰 값을 알 수 없어 서버에서 거절됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "CSRF 토큰",
      "CSRF방어",
      "난수토큰"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-webvuln"
  },
  {
    "id": "EXP_SEC2_008",
    "subject": "신기술/보안",
    "category": "웹 취약점 방어",
    "type": "SHORT_ANSWER",
    "question": "웹 브라우저의 보안 정책 중 어떤 출처(도메인, 프로토콜, 포트)에서 불러온 문서나 스크립트가 다른 출처의 리소스와 상호작용하는 것을 기본적으로 격리 제한하는 정책의 약칭은 무엇인가?",
    "answer": "SOP",
    "explanation": "SOP(Same-Origin Policy, 동일 출처 정책)는 출처가 다른 리소스 접근을 차단합니다. 필요한 경우 CORS를 통해 허용합니다.",
    "difficulty": "EASY",
    "keywords": [
      "SOP",
      "Same-Origin Policy",
      "동일출처정책"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-webvuln"
  },
  {
    "id": "EXP_SEC2_009",
    "subject": "신기술/보안",
    "category": "웹 브라우저 통신",
    "type": "SHORT_ANSWER",
    "question": "SOP 정책의 제약을 넘어 다른 출처(도메인)의 리소스를 안전하게 요청할 수 있도록 추가 HTTP 헤더를 사용하여 서버가 권한을 허용하는 메커니즘의 약칭은 무엇인가?",
    "answer": "CORS",
    "explanation": "CORS(Cross-Origin Resource Sharing, 교차 출처 리소스 공유)는 Access-Control-Allow-Origin 헤더로 교차 요청을 허용합니다.",
    "difficulty": "EASY",
    "keywords": [
      "CORS",
      "Cross-Origin Resource Sharing",
      "교차출처공유"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-webvuln"
  },
  {
    "id": "EXP_SEC2_010",
    "subject": "신기술/보안",
    "category": "메모리 보안 공격",
    "type": "SHORT_ANSWER",
    "question": "C언어 등에서 메모리 버퍼의 크기를 초과하여 데이터를 입력함으로써 함수의 반환 주소(Return Address)를 덮어써서 공격자의 쉘코드를 실행시키는 공격은 무엇인가?",
    "answer": "버퍼 오버플로우",
    "explanation": "버퍼 오버플로우(Buffer Overflow)는 경계 검사(Boundary Check)를 수행하지 않는 함수(strcpy, gets 등)를 사용할 때 발생합니다.",
    "difficulty": "EASY",
    "keywords": [
      "버퍼 오버플로우",
      "Buffer Overflow",
      "반환주소변조"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-sysvuln"
  },
  {
    "id": "EXP_SEC2_011",
    "subject": "신기술/보안",
    "category": "메모리 보호 기법",
    "type": "SHORT_ANSWER",
    "question": "프로그램이 실행될 때마다 스택, 힙, 공유 라이브러리가 적재되는 메모리 시작 주소를 무작위로 변경하여 공격자가 쉘코드 주소를 예측하지 못하게 방어하는 기술의 약칭은 무엇인가?",
    "answer": "ASLR",
    "explanation": "ASLR(Address Space Layout Randomization)은 메모리 주소 무작위화로 버퍼 오버플로우 공격을 무력화합니다.",
    "difficulty": "EASY",
    "keywords": [
      "ASLR",
      "Address Space Layout Randomization",
      "메모리주소무작위화"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-sysvuln"
  },
  {
    "id": "EXP_SEC2_012",
    "subject": "신기술/보안",
    "category": "메모리 보호 기법",
    "type": "SHORT_ANSWER",
    "question": "버퍼 오버플로우 방어를 위해 스택의 지역 변수와 반환 주소 사이에 무작위 카나리(Canary) 값을 삽입하고 함수 종료 시 카나리 변조를 검사하는 보호 기술은 무엇인가?",
    "answer": "스택 가드",
    "explanation": "스택 가드(StackGuard, 스택 카나리)는 카나리 값이 손상되면 시스템을 강제 종료하여 공격 코드 실행을 막습니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "스택 가드",
      "StackGuard",
      "스택카나리"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-sysvuln"
  },
  {
    "id": "EXP_SEC2_013",
    "subject": "신기술/보안",
    "category": "메모리 보호 기법",
    "type": "SHORT_ANSWER",
    "question": "스택이나 힙 같은 데이터 저장 전용 메모리 영역에 실행(Execute) 권한을 박탈하여 해당 영역에 주입된 악성 코드가 실행되지 못하도록 차단하는 하드웨어/OS 보호 기술의 약칭은 무엇인가?",
    "answer": "DEP",
    "explanation": "DEP(Data Execution Prevention, 데이터 실행 방지 / NX bit)는 데이터 영역을 실행 불가능(No-Execute) 상태로 만듭니다.",
    "difficulty": "EASY",
    "keywords": [
      "DEP",
      "Data Execution Prevention",
      "NX bit"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-sysvuln"
  },
  {
    "id": "EXP_SEC2_014",
    "subject": "신기술/보안",
    "category": "시큐어 코딩",
    "type": "SHORT_ANSWER",
    "question": "printf() 함수 등에 사용자 입력 문자열을 포맷 스트링 파라미터 없이 직접 넘겼을 때(%x, %s 등을 악용), 메모리 내용을 무단 조회하거나 변조할 수 있는 취약점은 무엇인가?",
    "answer": "포맷 스트링 공격",
    "explanation": "포맷 스트링 취약점(Format String Vulnerability)은 printf(\"%s\", input) 대신 printf(input)을 사용했을 때 발생합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "포맷 스트링 공격",
      "Format String",
      "printf취약점"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-sysvuln"
  },
  {
    "id": "EXP_SEC2_015",
    "subject": "신기술/보안",
    "category": "시큐어 코딩",
    "type": "SHORT_ANSWER",
    "question": "자원(파일, 메모리 등)의 접근 권한을 확인하는 시점(Check)과 실제로 자원을 사용하는 시점(Use) 사이의 시간차를 노려 공격자가 심볼릭 링크를 바꿔치기하는 취약점의 약칭은 무엇인가?",
    "answer": "TOCTOU",
    "explanation": "TOCTOU(Time of Check to Time of Use)는 레이스 컨디션(경쟁 상태)을 악용한 대표적인 권한 우회 취약점입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "TOCTOU",
      "Time of Check to Time of Use",
      "경쟁상태취약점"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-sysvuln"
  },
  {
    "id": "EXP_SEC2_016",
    "subject": "신기술/보안",
    "category": "DoS 공격",
    "type": "SHORT_ANSWER",
    "question": "TCP 연결 수립 과정에서 SYN 패킷을 대량으로 서버에 전송한 뒤 마지막 ACK를 보내지 않고 대기하여 서버의 백로그 큐(Backlog Queue)를 고갈시키는 서비스 거부 공격은 무엇인가?",
    "answer": "SYN Flooding",
    "explanation": "SYN Flooding은 서버의 하프 오픈(Half-Open) 연결 자원을 고갈시키며 SYN Cookie 기법으로 방어합니다.",
    "difficulty": "EASY",
    "keywords": [
      "SYN Flooding",
      "TCP연결지연",
      "백로그큐고갈"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-dos"
  },
  {
    "id": "EXP_SEC2_019",
    "subject": "신기술/보안",
    "category": "DoS 공격",
    "type": "SHORT_ANSWER",
    "question": "IP 헤더의 단편화 오프셋(Fragment Offset) 필드 값을 고의로 중첩되도록 조작하여 수신 호스트가 패킷을 재조합하는 메모리 버퍼 오류를 유도하는 DoS 공격은 무엇인가?",
    "answer": "티어드롭",
    "explanation": "티어드롭(Teardrop) 공격은 패킷 조각 오프셋 조작으로 인한 수신 측 OS 재조합 알고리즘의 결함을 노립니다.",
    "difficulty": "EASY",
    "keywords": [
      "티어드롭",
      "Teardrop",
      "오프셋조작공격"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-dos"
  },
  {
    "id": "EXP_SEC2_020",
    "subject": "신기술/보안",
    "category": "DoS 공격",
    "type": "SHORT_ANSWER",
    "question": "패킷의 출발지 IP 주소와 포트 번호를 피해자의 대상 서버 IP 주소 및 포트 번호와 완벽히 똑같이 조작하여, 수신 서버가 자기 자신에게 계속 무한 응답 루프를 돌게 만드는 DoS 공격은 무엇인가?",
    "answer": "랜드 어택",
    "explanation": "랜드 어택(Land Attack)은 출발지와 목적지가 동일한 패킷을 드롭(차단)하도록 필터링하여 방어합니다.",
    "difficulty": "EASY",
    "keywords": [
      "랜드 어택",
      "Land Attack",
      "출발지목적지동일"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-dos"
  },
  {
    "id": "EXP_SEC2_021",
    "subject": "신기술/보안",
    "category": "DoS 공격",
    "type": "SHORT_ANSWER",
    "question": "HTTP 요청 시 헤더의 끝을 알리는 개행(\\r\\n\\r\\n)을 완성하지 않고 비정상적인 지연 헤더를 주기적으로 전송하여 웹 서버의 최대 동시 연결 풀(Pool)을 고갈시키는 공격은 무엇인가?",
    "answer": "슬로로리스",
    "explanation": "슬로로리스(Slowloris)는 저대역폭 애플리케이션 계층 DoS 공격으로 웹 서버의 Keep-Alive 연결 제한으로 대응합니다.",
    "difficulty": "EASY",
    "keywords": [
      "슬로로리스",
      "Slowloris",
      "헤더지연공격"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-dos"
  },
  {
    "id": "EXP_SEC2_022",
    "subject": "신기술/보안",
    "category": "스푸핑 공격",
    "type": "SHORT_ANSWER",
    "question": "동일 로컬 네트워크(LAN) 상에서 위조된 ARP 응답 패킷을 지속적으로 희생자에게 전송하여 희생자의 ARP 캐시 테이블의 게이트웨이 MAC 주소를 공격자의 MAC 주소로 변조하는 공격은 무엇인가?",
    "answer": "ARP 스푸핑",
    "explanation": "ARP 스푸핑(ARP Spoofing)은 중간자(MITM) 공격의 기반이 되며 정적 ARP(Static ARP) 테이블 설정으로 방어합니다.",
    "difficulty": "EASY",
    "keywords": [
      "ARP 스푸핑",
      "ARP Spoofing",
      "MAC주소변조"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-spoofing"
  },
  {
    "id": "EXP_SEC2_023",
    "subject": "신기술/보안",
    "category": "네트워크 도청",
    "type": "SHORT_ANSWER",
    "question": "네트워크 인터페이스 카드(NIC)를 수신 주소와 무관하게 모든 패킷을 무차별 수신하는 무차별(Promiscuous) 모드로 설정하여 네트워크를 통과하는 평문 패킷(비밀번호 등)을 몰래 도청하는 공격은 무엇인가?",
    "answer": "스니핑",
    "explanation": "스니핑(Sniffing)은 수동적 도청 공격으로 데이터 전송 구간 암호화(HTTPS, SSH)로 방어합니다.",
    "difficulty": "EASY",
    "keywords": [
      "스니핑",
      "Sniffing",
      "무차별모드도청"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-sniffing"
  },
  {
    "id": "EXP_SEC2_024",
    "subject": "신기술/보안",
    "category": "세션 탈취",
    "type": "SHORT_ANSWER",
    "question": "TCP 통신에서 클라이언트와 서버 간에 정상적으로 수립된 연결 세션의 시퀀스 번호(Sequence Number)를 도청 및 예측하여 통신 흐름을 가로채고 세션 제어권을 탈취하는 공격은 무엇인가?",
    "answer": "세션 하이재킹",
    "explanation": "TCP 세션 하이재킹은 시퀀스 번호 동기화를 깨뜨리고 공격자가 정상 사용자로 위장하여 명령을 실행합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "세션 하이재킹",
      "Session Hijacking",
      "시퀀스번호탈취"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-hijacking"
  },
  {
    "id": "EXP_SEC2_025",
    "subject": "신기술/보안",
    "category": "지능형 위협",
    "type": "SHORT_ANSWER",
    "question": "특정 대상 기업이나 국가 기관을 사전에 명확히 타깃으로 설정하고 장기간에 걸쳐 소셜 엔지니어링, 제로데이 취약점 등 다양한 기법을 동원해 은밀히 잠복하여 정보를 빼내는 공격의 약칭은 무엇인가?",
    "answer": "APT",
    "explanation": "APT(Advanced Persistent Threat, 지능형 지속 위협)는 지속적이고 은밀한 다단계 침투를 특징으로 합니다.",
    "difficulty": "EASY",
    "keywords": [
      "APT",
      "Advanced Persistent Threat",
      "지능형지속위협"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-apt"
  },
  {
    "id": "EXP_SEC2_026",
    "subject": "신기술/보안",
    "category": "지능형 위협",
    "type": "SHORT_ANSWER",
    "question": "표적 공격 대상이 자주 방문하는 웹 사이트를 사전에 해킹하여 악성코드를 심어둔 뒤, 대상자가 해당 사이트에 접속할 때 브라우저 취약점을 이용해 감염시키는 공격 기법은 무엇인가?",
    "answer": "워터링 홀",
    "explanation": "워터링 홀(Watering Hole)은 맹수가 물웅덩이에 매복하듯 타깃이 즐겨 찾는 사이트를 감염 통로로 악용합니다.",
    "difficulty": "EASY",
    "keywords": [
      "워터링 홀",
      "Watering Hole",
      "표적매복공격"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-apt"
  },
  {
    "id": "EXP_SEC2_027",
    "subject": "신기술/보안",
    "category": "보안 취약점",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 제조사나 개발자가 취약점의 존재를 인지하여 공식 보안 패치를 출시하기도 전에 공격자가 이를 악용하여 감행하는 보안 공격은 무엇인가?",
    "answer": "제로데이 공격",
    "explanation": "제로데이 공격(Zero-Day Attack)은 방어 대책이 없는 상태에서 기습 공격하므로 차단이 매우 어렵습니다.",
    "difficulty": "EASY",
    "keywords": [
      "제로데이 공격",
      "Zero-Day",
      "패치이전공격"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-apt"
  },
  {
    "id": "EXP_SEC2_028",
    "subject": "신기술/보안",
    "category": "악성 소프트웨어",
    "type": "SHORT_ANSWER",
    "question": "피해자 컴퓨터 시스템의 주요 파일들을 강력한 알고리즘으로 암호화하여 접근할 수 없게 인질로 잡은 뒤, 복호화 키를 제공하는 대가로 비트코인 등 금전을 요구하는 악성코드는 무엇인가?",
    "answer": "랜섬웨어",
    "explanation": "랜섬웨어(Ransomware)는 몸값(Ransom)과 소프트웨어의 합성어로 중요 파일 암호화를 수행합니다.",
    "difficulty": "EASY",
    "keywords": [
      "랜섬웨어",
      "Ransomware",
      "파일암호화악성코드"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-malware"
  },
  {
    "id": "EXP_SEC2_029",
    "subject": "신기술/보안",
    "category": "보안 솔루션",
    "type": "SHORT_ANSWER",
    "question": "일반 네트워크 방화벽과 달리 웹 트래픽(HTTP/HTTPS)을 패킷 레벨뿐만 아니라 애플리케이션 계층(L7)까지 심층 분석하여 SQL Injection, XSS 등을 전문 차단하는 웹 전용 방화벽의 약칭은 무엇인가?",
    "answer": "WAF",
    "explanation": "WAF(Web Application Firewall)는 웹 애플리케이션 특화 공격을 실시간 탐지/차단합니다.",
    "difficulty": "EASY",
    "keywords": [
      "WAF",
      "Web Application Firewall",
      "웹방화벽"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-solutions"
  },
  {
    "id": "EXP_SEC2_030",
    "subject": "신기술/보안",
    "category": "보안 솔루션",
    "type": "SHORT_ANSWER",
    "question": "네트워크에 침입하는 이상 트래픽이나 공격 징후를 실시간으로 탐지할 뿐만 아니라, 방화벽 규칙을 동적 연동하여 즉각 패킷을 능동적으로 차단하는 침입 차단 시스템의 약칭은 무엇인가?",
    "answer": "IPS",
    "explanation": "IPS(Intrusion Prevention System, 침입 방지 시스템)는 단순 모니터링/경고에 그치는 IDS(침입 탐지 시스템)와 달리 능동적 차단을 수행합니다.",
    "difficulty": "EASY",
    "keywords": [
      "IPS",
      "Intrusion Prevention System",
      "침입차단시스템"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-solutions"
  },
  {
    "id": "EXP_SEC2_031",
    "subject": "신기술/보안",
    "category": "보안 솔루션",
    "type": "SHORT_ANSWER",
    "question": "사내 PC에서 기업의 핵심 기밀 문서나 고객 개인정보가 이메일, 메신저, USB 출력 등을 통해 외부로 무단 유출되는 것을 감시하고 원천 차단하는 데이터 유출 방지 솔루션의 약칭은 무엇인가?",
    "answer": "DLP",
    "explanation": "DLP(Data Loss Prevention)는 내부자에 의한 정보 유출을 모니터링하고 통제합니다.",
    "difficulty": "EASY",
    "keywords": [
      "DLP",
      "Data Loss Prevention",
      "정보유출방지"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-solutions"
  },
  {
    "id": "EXP_SEC2_032",
    "subject": "신기술/보안",
    "category": "보안 솔루션",
    "type": "SHORT_ANSWER",
    "question": "방화벽, IDS/IPS, 웹서버, 엔드포인트 등 사내의 모든 보안 장비와 시스템 로그를 실시간 빅데이터로 중앙 수집하여 상관 분석하고 위협을 조기 경보하는 통합 보안 관제 시스템의 약칭은 무엇인가?",
    "answer": "SIEM",
    "explanation": "SIEM(Security Information and Event Management)은 이기종 로그의 상관관계 분석을 수행합니다.",
    "difficulty": "EASY",
    "keywords": [
      "SIEM",
      "통합보안관제",
      "로그상관분석"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-solutions"
  },
  {
    "id": "EXP_SEC2_033",
    "subject": "신기술/보안",
    "category": "보안 속임수",
    "type": "SHORT_ANSWER",
    "question": "공격자를 유인하기 위해 일부러 취약하게 구성해 둔 가상의 덫 시스템으로, 해커의 공격 패턴, 도구, 행위를 분석하고 내부 핵심 자원을 보호하는 유인 시스템의 이름은 무엇인가?",
    "answer": "허니팟",
    "explanation": "허니팟(Honeypot)은 꿀단지처럼 공격자를 유혹하여 침해 기법을 수집하는 디코이(Decoy) 시스템입니다.",
    "difficulty": "EASY",
    "keywords": [
      "허니팟",
      "Honeypot",
      "유인시스템"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-solutions"
  },
  {
    "id": "EXP_SEC2_034",
    "subject": "신기술/보안",
    "category": "시큐어 코딩",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 개발 보안(시큐어 코딩) 3단계 중 개발된 소스코드의 실행 없이 규칙 기반 정적 분석 도구(SonarQube 등)를 이용해 보안 약점을 찾아내는 점검 방식은 무엇인가?",
    "answer": "정적 분석",
    "explanation": "정적 분석(Static Analysis, SAST)은 코드 실행 없이 잠재 결함을 전수 검사합니다. 실행 중에 점검하는 것은 동적 분석(DAST)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "정적 분석",
      "Static Analysis",
      "SAST"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-securecoding"
  },
  {
    "id": "EXP_SEC2_035",
    "subject": "신기술/보안",
    "category": "시큐어 코딩",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 실행 중에 실제 다양한 모의 해킹 페이로드와 악의적인 입력을 전송하여 취약점을 점검하는 동적 애플리케이션 보안 테스트의 약칭은 무엇인가?",
    "answer": "DAST",
    "explanation": "DAST(Dynamic Application Security Testing)는 런타임 환경에서 시스템의 실제 취약성을 점검합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "DAST",
      "동적분석",
      "모의해킹"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-securecoding"
  },
  {
    "id": "EXP_SEC2_036",
    "subject": "신기술/보안",
    "category": "클라우드 컴퓨팅",
    "type": "SHORT_ANSWER",
    "question": "클라우드 서비스 모델 중 가상 서버, 스토리지, 가상 네트워크 등 순수 물리적 하드웨어 인프라 자원만을 사용자에게 대여해주는 서비스 모델의 약칭은 무엇인가?",
    "answer": "IaaS",
    "explanation": "IaaS(Infrastructure as a Service, 예: AWS EC2)는 OS 설치부터 미들웨어 구성을 사용자가 직접 관리합니다.",
    "difficulty": "EASY",
    "keywords": [
      "IaaS",
      "Infrastructure as a Service",
      "클라우드모델"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-cloud"
  },
  {
    "id": "EXP_SEC2_038",
    "subject": "신기술/보안",
    "category": "클라우드 컴퓨팅",
    "type": "SHORT_ANSWER",
    "question": "클라우드 서비스 모델 중 완성된 완성형 소프트웨어 애플리케이션을 인터넷 웹 브라우저를 통해 구독 방식으로 최종 사용자에게 완제품으로 제공하는 서비스 모델의 약칭은 무엇인가?",
    "answer": "SaaS",
    "explanation": "SaaS(Software as a Service, 예: 구글 독스, 노션)는 인스톨 없이 웹에서 즉시 사용하는 완성형 소프트웨어입니다.",
    "difficulty": "EASY",
    "keywords": [
      "SaaS",
      "Software as a Service",
      "소프트웨어구독"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-cloud"
  },
  {
    "id": "EXP_SEC2_039",
    "subject": "신기술/보안",
    "category": "클라우드 네이티브",
    "type": "SHORT_ANSWER",
    "question": "개발자가 서버의 프로비저닝이나 OS 패치 등을 전혀 관리할 필요 없이, 이벤트 발생 시에만 함수(Function) 단위로 코드가 실행되고 실행 시간만큼만 과금되는 클라우드 컴퓨팅 모델은 무엇인가?",
    "answer": "서버리스",
    "explanation": "서버리스(Serverless, FaaS, 예: AWS Lambda)는 유휴 상태에서는 비용이 발생하지 않고 이벤트 주도형으로 동작합니다.",
    "difficulty": "EASY",
    "keywords": [
      "서버리스",
      "Serverless",
      "FaaS",
      "Lambda"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-cloud"
  },
  {
    "id": "EXP_SEC2_040",
    "subject": "신기술/보안",
    "category": "IT 신기술",
    "type": "SHORT_ANSWER",
    "question": "데이터가 발생하는 센서나 사용자 단말 장치(스마트폰, 공장 센서)와 물리적으로 가까운 위치의 엣지(Edge) 서버에서 데이터를 분산 실시간 처리하는 컴퓨팅 기술은 무엇인가?",
    "answer": "엣지 컴퓨팅",
    "explanation": "엣지 컴퓨팅(Edge Computing)은 중앙 클라우드로 데이터를 전송하는 대기 시간(Latency)과 네트워크 대역폭 부담을 줄여 자율주행, 스마트팩토리에 쓰입니다.",
    "difficulty": "EASY",
    "keywords": [
      "엣지 컴퓨팅",
      "Edge Computing",
      "실시간분산처리"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-trends"
  },
  {
    "id": "EXP_SEC2_041",
    "subject": "신기술/보안",
    "category": "블록체인 기술",
    "type": "SHORT_ANSWER",
    "question": "블록체인 분산 원장에서 제3의 신뢰 중개자(은행, 공증인 등) 없이도 미리 합의된 계약 조건이 충족되면 프로그램 코드가 자동으로 계약을 집행하는 기능을 무엇이라 하는가?",
    "answer": "스마트 계약",
    "explanation": "스마트 계약(Smart Contract, 이더리움 가상머신 EVM)은 위변조가 불가능한 블록체인 코드에 의해 강제 집행됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "스마트 계약",
      "Smart Contract",
      "블록체인계약"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-trends"
  },
  {
    "id": "EXP_SEC2_042",
    "subject": "신기술/보안",
    "category": "블록체인 합의 알고리즘",
    "type": "SHORT_ANSWER",
    "question": "블록체인 합의 알고리즘 중 컴퓨터의 고성능 연산 능력을 투입하여 목표 난이도의 암호화 해시값을 가장 먼저 찾아내는 작업(채굴)을 통해 블록 생성 권한을 얻는 방식의 약칭은 무엇인가?",
    "answer": "PoW",
    "explanation": "PoW(Proof of Work, 작업 증명)는 막대한 전력 소모가 단점입니다. 코인 지분량에 비례해 권한을 주는 것은 PoS(Proof of Stake, 지분 증명)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "PoW",
      "Proof of Work",
      "작업증명"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-trends"
  },
  {
    "id": "EXP_SEC2_043",
    "subject": "신기술/보안",
    "category": "시스템 보안 취약점",
    "type": "SHORT_ANSWER",
    "question": "관리자나 개발자가 유지보수 및 디버깅 편의를 위해 시스템 인증 절차를 우회할 수 있도록 고의로 숨겨둔 비밀 통로 또는 침해 사고 후 재침투를 위해 남겨둔 통로는 무엇인가?",
    "answer": "백도어",
    "explanation": "백도어(Backdoor, 트랩도어)는 정상 인증 없이 시스템 관리자 권한을 획득할 수 있는 치명적 보안 위협입니다.",
    "difficulty": "EASY",
    "keywords": [
      "백도어",
      "Backdoor",
      "트랩도어"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-sysvuln"
  },
  {
    "id": "EXP_SEC2_044",
    "subject": "신기술/보안",
    "category": "소프트웨어 보안 공학",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 개발(Dev)과 운영(Ops)의 협업 문화에 개발 초기 단계부터 보안(Sec)을 통합하여 자동화된 보안 검증을 상시 수행하는 개발 패러다임은 무엇인가?",
    "answer": "DevSecOps",
    "explanation": "DevSecOps는 보안을 개발 마지막 단계가 아닌 전 생명주기에 걸쳐 조기 적용(Shift-Left)합니다.",
    "difficulty": "EASY",
    "keywords": [
      "DevSecOps",
      "보안통합",
      "Shift-Left"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-securecoding"
  },
  {
    "id": "EXP_SEC2_045",
    "subject": "신기술/보안",
    "category": "웹 취약점",
    "type": "SHORT_ANSWER",
    "question": "피해자 PC의 호스트(hosts) 파일이나 DNS 주소를 변조하여 피해자가 정상적인 웹사이트 주소를 정확히 입력하더라도 가짜 위장 사이트로 강제 이동시켜 개인 금융정보를 가로채는 공격 기법은 무엇인가?",
    "answer": "파밍",
    "explanation": "파밍(Pharming)은 DNS 스푸핑이나 hosts 파일 변조를 이용해 정상 URL 입력 시에도 가짜 피싱 사이트로 납치합니다.",
    "difficulty": "EASY",
    "keywords": [
      "파밍",
      "Pharming",
      "DNS변조사기"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-fraud"
  },
  {
    "id": "EXP_SEC2_046",
    "subject": "신기술/보안",
    "category": "사회공학 공격",
    "type": "SHORT_ANSWER",
    "question": "문자메시지(SMS) 내에 악성 URL 링크를 첨부하여 전송하고 사용자가 클릭 시 소액결제를 유도하거나 악성 앱을 자동 다운로드시키는 사기 공격은 무엇인가?",
    "answer": "스미싱",
    "explanation": "스미싱(Smishing)은 SMS와 피싱(Phishing)의 합성어로 모바일 금융 피해의 주범입니다.",
    "difficulty": "EASY",
    "keywords": [
      "스미싱",
      "Smishing",
      "SMS사기"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-fraud"
  },
  {
    "id": "EXP_SEC2_047",
    "subject": "신기술/보안",
    "category": "취약점 관리",
    "type": "SHORT_ANSWER",
    "question": "미국 MITRE사가 총괄 운영하며, 공개적으로 발표된 소프트웨어 보안 결함 및 취약점들에 전 세계적으로 고유하게 부여하는 표준화된 식별 체계의 영문 약칭은 무엇인가?",
    "answer": "CVE",
    "explanation": "CVE(Common Vulnerabilities and Exposures)는 전 세계 취약점 정보를 공유하고 추적하기 위한 표준 식별자입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "CVE",
      "Common Vulnerabilities and Exposures",
      "취약점식별자"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-vulnmgmt"
  },
  {
    "id": "EXP_SEC2_048",
    "subject": "신기술/보안",
    "category": "취약점 심각도 평가",
    "type": "SHORT_ANSWER",
    "question": "발견된 소프트웨어 취약점의 위험도와 심각성을 기본 점수, 시간 점수, 환경 점수를 종합하여 0.0 ~ 10.0의 표준 점수로 계량화하는 범용 취약점 평가 시스템의 약칭은 무엇인가?",
    "answer": "CVSS",
    "explanation": "CVSS(Common Vulnerability Scoring System)는 취약점의 파급력을 객관적 수치로 표준 평가합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "CVSS",
      "Common Vulnerability Scoring System",
      "취약점점수"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-vulnmgmt"
  },
  {
    "id": "EXP_SEC2_049",
    "subject": "신기술/보안",
    "category": "클라우드 보안",
    "type": "SHORT_ANSWER",
    "question": "클라우드 책임 공유 모델(Shared Responsibility Model)에서 IaaS를 이용할 때, 운영체제(OS) 패치 및 애플리케이션 보안 설정의 책임 주체는 클라우드 제공업체인가 고객(사용자)인가?",
    "answer": "고객",
    "explanation": "IaaS에서 클라우드 제공사는 물리 인프라와 하이퍼바이저만 책임지며, 게스트 OS, 런타임, 애플리케이션의 보안 책임은 전적으로 고객에게 있습니다.",
    "difficulty": "EASY",
    "keywords": [
      "고객",
      "책임공유모델",
      "IaaS책임"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-cloud"
  },
  {
    "id": "EXP_SEC2_050",
    "subject": "신기술/보안",
    "category": "암호화폐 및 핀테크",
    "type": "SHORT_ANSWER",
    "question": "블록체인의 블록 헤더에 저장되는 값으로, 블록 내의 모든 트랜잭션(거래)들의 해시값을 2개씩 짝지어 상위로 해싱해 올라가며 최종적으로 도출된 단 하나의 루트 해시값을 무엇이라 하는가?",
    "answer": "머클 루트",
    "explanation": "머클 루트(Merkle Root, 머클 트리)는 단 하나의 루트 해시만으로 수천 건의 거래 데이터 무결성을 초고속 검증합니다.",
    "difficulty": "EASY",
    "keywords": [
      "머클 루트",
      "Merkle Root",
      "머클트리"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-trends"
  },
  {
    "id": "EXP26_PKG_001",
    "subject": "소프트웨어설계",
    "category": "제품소프트웨어 패키징",
    "subCategory": "디지털 저작권 관리(DRM)",
    "type": "SHORT_ANSWER",
    "question": "디지털 저작권 관리(DRM)의 구성요소 중, 라이선스를 발급하고 암호화된 콘텐츠의 사용 권한과 이용 규칙을 통제 및 관리하는 핵심 서버 기관을 무엇이라 하는가?",
    "answer": [
      "클리어링하우스",
      "Clearinghouse"
    ],
    "explanation": "클리어링하우스(Clearinghouse)는 DRM 시스템에서 사용자의 권한을 확인하고 디지털 콘텐츠의 복호화 키 및 라이선스를 발급·관리하는 핵심 기관입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "DRM",
      "클리어링하우스",
      "Clearinghouse",
      "라이선스"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_PKG_002",
    "subject": "소프트웨어설계",
    "category": "제품소프트웨어 패키징",
    "subCategory": "디지털 저작권 관리(DRM)",
    "type": "SHORT_ANSWER",
    "question": "DRM 구성요소 중 사용자의 단말 장치(PC, 스마트폰 등)에 설치되어, 인가된 사용자만이 라이선스 규칙에 따라 콘텐츠를 복호화하고 재생할 수 있도록 통제하는 프로그램을 무엇이라 하는가?",
    "answer": [
      "DRM 컨트롤러",
      "DRM Controller",
      "컨트롤러"
    ],
    "explanation": "DRM 컨트롤러(Controller)는 사용자 단말에서 라이선스 정보에 따라 암호화된 콘텐츠를 복호화하고 안전한 재생 및 복제 방지를 수행하는 소프트웨어 모듈입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "DRM",
      "DRM 컨트롤러",
      "단말"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_PKG_003",
    "subject": "소프트웨어설계",
    "category": "제품소프트웨어 패키징",
    "subCategory": "저작권 보호 기술",
    "type": "SHORT_ANSWER",
    "question": "디지털 콘텐츠에 눈에 띄지 않게 저작권자의 서명이나 고유 정보를 삽입하는 기술로, 불법 배포된 파일에서 원본 소유자를 증명하기 위해 쓰이는 기술과, 구매자의 식별 정보를 삽입하여 불법 유포 경로를 추적하는 기술을 [워터마킹 / 핑거프린팅] 순서대로 각각 쓰시오.",
    "answer": [
      "워터마킹, 핑거프린팅",
      "디지털 워터마킹, 핑거프린팅"
    ],
    "explanation": "워터마킹(Watermarking)은 제작자(저작권자)의 정보를 은닉하여 소유권을 증명하고, 핑거프린팅(Fingerprinting)은 구매자/사용자의 정보를 은닉하여 불법 유포자를 추적합니다.",
    "difficulty": "HARD",
    "keywords": [
      "워터마킹",
      "핑거프린팅",
      "저작권보호"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_PKG_004",
    "subject": "소프트웨어설계",
    "category": "제품소프트웨어 패키징",
    "subCategory": "보안 역공학 방지",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 프로그램의 실행 코드를 위변조하려는 행위를 감지하고, 변조가 감지되면 실행을 즉시 중단하거나 코드를 스스로 파괴하여 소프트웨어를 보호하는 보안 방어 기술을 무엇이라 하는가?",
    "answer": [
      "탬퍼 프루핑",
      "Tamper Proofing",
      "템퍼 프루핑"
    ],
    "explanation": "탬퍼 프루핑(Tamper Proofing)은 실행 바이너리의 무결성을 검증하여 역공학, 디버깅, 코드 패치 등의 불법 위변조 행위를 무력화하는 기술입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "탬퍼 프루핑",
      "Tamper Proofing",
      "위변조방지"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_PKG_005",
    "subject": "소프트웨어설계",
    "category": "오픈소스 라이선스",
    "subCategory": "라이선스 특성 비교",
    "type": "SHORT_ANSWER",
    "question": "자유 소프트웨어 재단(FSF)에서 제정한 대표적인 카피레프트(Copyleft) 라이선스로, 이 라이선스가 적용된 코드를 수정하거나 결합하여 배포할 경우 파생 저작물의 소스코드도 반드시 동일한 라이선스로 공개해야 하는 라이선스는 무엇인가?",
    "answer": [
      "GPL",
      "General Public License",
      "GNU GPL"
    ],
    "explanation": "GPL(General Public License)은 엄격한 전염성(Viral) 카피레프트 라이선스로, 파생 소프트웨어 배포 시 반드시 전체 소스코드를 공개해야 합니다.",
    "difficulty": "EASY",
    "keywords": [
      "GPL",
      "오픈소스",
      "카피레프트",
      "FSF"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_PKG_006",
    "subject": "소프트웨어설계",
    "category": "오픈소스 라이선스",
    "subCategory": "라이선스 특성 비교",
    "type": "SHORT_ANSWER",
    "question": "GPL의 엄격한 소스코드 공개 의무를 완화하여, 해당 라이브러리를 단순 링크(동적/정적 링크)하여 개발한 응용 프로그램은 소스코드를 공개하지 않아도 되도록 허용한 오픈소스 라이선스는 무엇인가?",
    "answer": [
      "LGPL",
      "Lesser General Public License",
      "GNU LGPL"
    ],
    "explanation": "LGPL(Lesser GPL)은 라이브러리 자체를 수정했을 때만 수정 코드를 공개하고, 단순히 링크하여 사용하는 독점 상용 소프트웨어의 소스코드는 비공개로 유지할 수 있습니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "LGPL",
      "라이브러리링크",
      "오픈소스"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_PKG_007",
    "subject": "소프트웨어설계",
    "category": "오픈소스 라이선스",
    "subCategory": "라이선스 고지 의무",
    "type": "SHORT_ANSWER",
    "question": "아파치 소프트웨어 재단에서 만든 라이선스로, 소스코드 공개 의무는 없으나 재배포 시 저작권 고지, 라이선스 사본 포함, 특허권 부여 명시, 수정 사항 안내를 요구하는 라이선스는 무엇인가?",
    "answer": [
      "Apache",
      "Apache License",
      "아파치 라이선스",
      "Apache 2.0"
    ],
    "explanation": "Apache 라이선스(특히 Apache 2.0)는 상용 소프트웨어에 소스 공개 의무 없이 자유롭게 활용할 수 있으나, 저작권/특허권/수정사항 고지 의무를 가집니다.",
    "difficulty": "EASY",
    "keywords": [
      "Apache",
      "아파치",
      "오픈소스라이선스"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_PKG_008",
    "subject": "소프트웨어설계",
    "category": "오픈소스 라이선스",
    "subCategory": "라이선스 특성 비교",
    "type": "SHORT_ANSWER",
    "question": "매사추세츠 공과대학교에서 개발된 라이선스로, 소프트웨어의 무상 이용, 수정, 배포 및 상용화가 자유로우며 저작권 고지문과 면책 조항만 포함하면 소스코드 공개 의무가 전혀 없는 대표적인 퍼미시브 라이선스는 무엇인가?",
    "answer": [
      "MIT",
      "MIT License",
      "MIT 라이선스"
    ],
    "explanation": "MIT 라이선스는 매우 관대한(Permissive) 오픈소스 라이선스로, 저작권 및 면책 조항 고지만 유지하면 상용 판매나 소스 비공개 배포가 완전 자유롭습니다.",
    "difficulty": "EASY",
    "keywords": [
      "MIT",
      "MIT라이선스",
      "오픈소스"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_PKG_009",
    "subject": "소프트웨어설계",
    "category": "제품소프트웨어 빌드/배포",
    "subCategory": "빌드 자동화 도구",
    "type": "SHORT_ANSWER",
    "question": "자바 진영의 빌드 자동화 도구 중, XML 기반의 설정 파일(build.xml)을 사용하며 태스크(Task) 기반의 절차적 스크립트 작성 방식으로 유연하지만 의존성 자동 관리 기능이 약한 고전적인 도구는 무엇인가?",
    "answer": [
      "Ant",
      "Apache Ant",
      "앤트"
    ],
    "explanation": "Apache Ant는 XML 기반의 절차적 빌드 도구로 규칙이 정해져 있지 않고 자유로우나, 외부 라이브러리 의존성 자동 해결 기능이 부족하여 이후 Maven으로 발전했습니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "Ant",
      "build.xml",
      "빌드도구"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_PKG_010",
    "subject": "소프트웨어설계",
    "category": "제품소프트웨어 빌드/배포",
    "subCategory": "빌드 자동화 도구",
    "type": "SHORT_ANSWER",
    "question": "프로젝트 객체 모델(POM) 개념을 도입하여 중앙 저장소를 통한 의존성 자동 관리와 표준 프로젝트 생명주기(Lifecycle)를 제공하며, 설정 파일로 pom.xml을 사용하는 아파치 빌드 도구는 무엇인가?",
    "answer": [
      "Maven",
      "Apache Maven",
      "메이븐"
    ],
    "explanation": "Maven은 pom.xml에 선언된 라이브러리 및 플러그인을 원격 저장소에서 자동으로 다운로드하고 빌드/테스트/패키징 표준 생명주기를 관리합니다.",
    "difficulty": "EASY",
    "keywords": [
      "Maven",
      "메이븐",
      "pom.xml",
      "POM"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_PKG_011",
    "subject": "소프트웨어설계",
    "category": "제품소프트웨어 빌드/배포",
    "subCategory": "빌드 자동화 도구",
    "type": "SHORT_ANSWER",
    "question": "Ant의 유연성과 Maven의 의존성 관리 장점을 결합한 빌드 도구로, Groovy 또는 Kotlin 기반의 DSL(Domain Specific Language) 스크립트를 사용하고 안드로이드 공식 빌드 시스템으로 채택된 도구는 무엇인가?",
    "answer": [
      "Gradle",
      "그래들"
    ],
    "explanation": "Gradle(그래들)은 build.gradle 파일을 통해 직관적인 스크립팅이 가능하며, 빌드 캐시 및 증분 빌드(Incremental Build)를 지원하여 Maven보다 월등히 빠릅니다.",
    "difficulty": "EASY",
    "keywords": [
      "Gradle",
      "그래들",
      "Groovy",
      "Kotlin",
      "DSL"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_PKG_012",
    "subject": "소프트웨어설계",
    "category": "제품소프트웨어 패키징",
    "subCategory": "배포 문서화",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 제품의 신규 버전이 배포될 때, 고객과 사용자에게 배포 날짜, 버전 번호, 신규 추가 기능, 버그 수정 내역, 알려진 문제점 등을 체계적으로 기록하여 전달하는 공식 문서를 무엇이라 하는가?",
    "answer": [
      "릴리즈 노트",
      "Release Notes",
      "릴리스 노트"
    ],
    "explanation": "릴리즈 노트(Release Notes)는 소프트웨어 릴리즈 주기마다 릴리즈 정보, 요구사항 변경, 결함 수정, 개선 사항 등을 명시한 핵심 사용자 문서입니다.",
    "difficulty": "EASY",
    "keywords": [
      "릴리즈 노트",
      "Release Notes",
      "배포문서"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_PKG_013",
    "subject": "소프트웨어설계",
    "category": "제품소프트웨어 패키징",
    "subCategory": "패키징 포맷 비교",
    "type": "SHORT_ANSWER",
    "question": "자바(Java) 애플리케이션의 패키징 확장자 중, 웹 애플리케이션 서비스에 필요한 서블릿(Servlet), JSP, XML 설정(web.xml) 및 정적 웹 리소스를 포함하여 WAS에 단독 배포할 수 있는 압축 아카이브 포맷은 무엇인가?",
    "answer": [
      "WAR",
      "Web Application Archive"
    ],
    "explanation": "WAR(Web Application Archive)는 서블릿 및 JSP 기반 웹 애플리케이션의 표준 배포 패키지 포맷입니다. (일반 자바 클래스 라이브러리는 JAR)",
    "difficulty": "EASY",
    "keywords": [
      "WAR",
      "JAR",
      "패키징",
      "아카이브"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_PKG_014",
    "subject": "소프트웨어설계",
    "category": "제품소프트웨어 패키징",
    "subCategory": "패키징 프로세스",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 패키징 작업의 순서 중 다음 빈칸에 들어갈 올바른 단계를 쓰시오: [ 기능 식별 → 모듈화 → 빌드 도구 설정 → (    ) → 배포본 구성 및 패키징 ]",
    "answer": [
      "빌드 및 테스트",
      "빌드/테스트",
      "빌드",
      "컴파일 및 테스트"
    ],
    "explanation": "제품 소프트웨어 패키징 프로세스는 기능 식별 → 모듈화 → 빌드 도구 설정 → 빌드 및 테스트 수행 → 최종 배포본 패키징 및 릴리즈 노트 작성 순으로 진행됩니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "패키징순서",
      "빌드",
      "테스트"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_PKG_015",
    "subject": "소프트웨어설계",
    "category": "제품소프트웨어 패키징",
    "subCategory": "디지털 저작권 관리(DRM)",
    "type": "SHORT_ANSWER",
    "question": "DRM 기술에서 저작권 원본 콘텐츠(오디오, 비디오, 문서, SW)를 암호화하고 메타데이터(저작권 식별자, 배포 규칙 등)를 결합하여 배포 가능한 보안 규격 파일로 생성하는 소프트웨어 도구를 무엇이라 하는가?",
    "answer": [
      "패키저",
      "Packager",
      "DRM 패키저"
    ],
    "explanation": "DRM 패키저(Packager)는 콘텐츠 제공자가 원본 콘텐츠를 인코딩 및 암호화하여 보안 헤더와 라이선스 통제 메타데이터를 결합시키는 구성요소입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "패키저",
      "Packager",
      "DRM"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_PKG_016",
    "subject": "소프트웨어설계",
    "category": "제품소프트웨어 패키징",
    "subCategory": "디지털 저작권 관리(DRM)",
    "type": "SHORT_ANSWER",
    "question": "암호화된 DRM 콘텐츠와 해당 콘텐츠를 복호화할 수 있는 보안 라이선스를 안전하게 격리 보관하고 무단 외부 유출을 방지하기 위해 생성되는 보안 영역을 무엇이라 하는가?",
    "answer": [
      "보안 컨테이너",
      "Security Container"
    ],
    "explanation": "보안 컨테이너(Security Container)는 불법 복제나 가로채기로부터 보호하기 위해 암호화된 콘텐츠 및 관련 제어 정보를 담는 안전한 보호 상자입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "보안 컨테이너",
      "Security Container",
      "DRM"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_PKG_017",
    "subject": "소프트웨어설계",
    "category": "오픈소스 라이선스",
    "subCategory": "라이선스 고지 의무",
    "type": "SHORT_ANSWER",
    "question": "버클리 캘리포니아 대학에서 발표한 오픈소스 라이선스로, 소스코드 공개 의무가 없고 상용 소프트웨어 결합이 자유로우나 초기 버전의 광고 조항(광고 시 명시)이 존재했던 대표적인 퍼미시브 라이선스는 무엇인가?",
    "answer": [
      "BSD",
      "BSD License",
      "BSD 라이선스"
    ],
    "explanation": "BSD 라이선스는 수정본 배포 시 소스코드 공개 의무가 없는 자유로운 라이선스입니다. (현대 개정판에서는 광고 조항이 삭제됨)",
    "difficulty": "MEDIUM",
    "keywords": [
      "BSD",
      "버클리",
      "오픈소스"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_PKG_018",
    "subject": "소프트웨어설계",
    "category": "제품소프트웨어 패키징",
    "subCategory": "릴리즈 노트 작성 항목",
    "type": "SHORT_ANSWER",
    "question": "릴리즈 노트 작성 항목 중, 버그를 수정하기 전에 해당 결함이 발생하는 환경과 오류 발생 과정을 순서대로 재현할 수 있도록 기술하는 항목을 무엇이라 하는가?",
    "answer": [
      "재현 단계",
      "재현 절차",
      "Steps to Reproduce"
    ],
    "explanation": "릴리즈 노트의 문제 재현 단계(Steps to Reproduce)는 어떤 절차를 거쳤을 때 버그가 발생했는지 명확히 기록하여 수정 여부를 검증할 수 있도록 돕습니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "릴리즈노트",
      "재현단계",
      "결함"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_PKG_019",
    "subject": "소프트웨어설계",
    "category": "제품소프트웨어 패키징",
    "subCategory": "버전 관리 및 배포",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 버전 관리에서 [주 버전(Major).부 버전(Minor).패치 버전(Patch)] 체계를 따를 때, 기존 버전과 호환되지 않는 큰 기능 변경이나 API 수정이 발생했을 때 올려야 하는 버전 위치의 명칭은 무엇인가?",
    "answer": [
      "메이저",
      "Major",
      "주 버전"
    ],
    "explanation": "시맨틱 버저닝(Semantic Versioning)에서 하위 호환성이 깨지는 변경은 Major, 하위 호환 기능을 추가할 때는 Minor, 버그 수정은 Patch 버전을 올립니다.",
    "difficulty": "EASY",
    "keywords": [
      "메이저",
      "시맨틱버저닝",
      "Major"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_PKG_020",
    "subject": "소프트웨어설계",
    "category": "제품소프트웨어 빌드/배포",
    "subCategory": "CI/CD 지속적 통합 및 배포",
    "type": "SHORT_ANSWER",
    "question": "개발자들이 작성한 코드를 중앙 공유 저장소에 매일 빈번하게 통합(Merge)하고, 자동화된 빌드와 단위 테스트를 수행하여 통합 과정의 오류를 조기에 발견하는 소프트웨어 공학 실천법의 약어는 무엇인가?",
    "answer": [
      "CI",
      "지속적 통합",
      "Continuous Integration"
    ],
    "explanation": "CI(Continuous Integration, 지속적 통합)는 자동화된 빌드와 테스트를 통해 코드 충돌과 결함을 조기에 발견하는 현대적인 개발 실천 방식입니다.",
    "difficulty": "EASY",
    "keywords": [
      "CI",
      "지속적 통합",
      "빌드자동화"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_PKG_021",
    "subject": "소프트웨어설계",
    "category": "제품소프트웨어 빌드/배포",
    "subCategory": "CI/CD 지속적 통합 및 배포",
    "type": "SHORT_ANSWER",
    "question": "CI 단계를 통과하여 빌드 및 검증된 소프트웨어를 스테이징 환경 또는 실제 프로덕션(운영) 환경에 사람의 개입 없이 자동으로 배포하는 기법의 약어는 무엇인가?",
    "answer": [
      "CD",
      "지속적 배포",
      "Continuous Deployment",
      "Continuous Delivery"
    ],
    "explanation": "CD(Continuous Delivery / Continuous Deployment)는 검증된 패키지를 테스트베드 또는 실서버에 자동화된 파이프라인으로 안전하게 배포하는 방식입니다.",
    "difficulty": "EASY",
    "keywords": [
      "CD",
      "지속적 배포",
      "Continuous Deployment"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_PKG_022",
    "subject": "소프트웨어설계",
    "category": "제품소프트웨어 패키징",
    "subCategory": "보안 역공학 방지",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어의 컴파일된 바이너리나 바이트코드를 리버스 엔지니어링 도구(디컴파일러 등)로 분석하기 어렵도록 변수명, 클래스명을 무의미한 문자로 바꾸고 제어 흐름을 복잡하게 꼬는 기법을 무엇이라 하는가?",
    "answer": [
      "코드 난독화",
      "난독화",
      "Obfuscation",
      "코드 난독화 도구"
    ],
    "explanation": "코드 난독화(Code Obfuscation)는 프로그램의 실행 로직 기능은 동일하게 유지하면서 코드의 가독성을 극단적으로 떨어뜨려 지적 재산권 유출을 막는 기술입니다.",
    "difficulty": "EASY",
    "keywords": [
      "코드 난독화",
      "난독화",
      "Obfuscation"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_PKG_023",
    "subject": "소프트웨어설계",
    "category": "제품소프트웨어 패키징",
    "subCategory": "패키징 산출물",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 설치 시 사용자가 프로그램을 손쉽게 설치할 수 있도록 설치 경로 지정, 바탕화면 바로가기 생성, 레지스트리 등록 등의 일련의 설치 작업을 자동화해 주는 도구를 무엇이라 하는가?",
    "answer": [
      "인스톨러",
      "설치 프로그램",
      "Installer"
    ],
    "explanation": "인스톨러(Installer)는 패키징된 소프트웨어를 대상 사용자의 시스템 환경에 맞게 자동 전개 및 구성해 주는 패키징 배포 도구입니다.",
    "difficulty": "EASY",
    "keywords": [
      "인스톨러",
      "Installer",
      "설치프로그램"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_PKG_024",
    "subject": "소프트웨어설계",
    "category": "제품소프트웨어 패키징",
    "subCategory": "배포 환경 격리",
    "type": "SHORT_ANSWER",
    "question": "배포 과정에서 애플리케이션과 이를 실행하는 데 필요한 런타임 환경, 라이브러리, 시스템 도구를 하나의 이미지로 패키징하여 호스트 OS 커널을 공유하며 프로세스 수준에서 격리 실행하는 경량화 기술은 무엇인가?",
    "answer": [
      "컨테이너",
      "Container",
      "도커 컨테이너"
    ],
    "explanation": "컨테이너(Container, e.g. Docker)는 하이퍼바이저 가상머신(VM)보다 훨씬 가볍고 시작 시간이 빠르며 일관된 패키징 및 배포 환경을 보장합니다.",
    "difficulty": "EASY",
    "keywords": [
      "컨테이너",
      "Container",
      "패키징배포"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_PKG_025",
    "subject": "소프트웨어설계",
    "category": "제품소프트웨어 패키징",
    "subCategory": "릴리즈 노트 작성 항목",
    "type": "SHORT_ANSWER",
    "question": "릴리즈 노트 작성 항목 중, 해당 버전에서 아직 해결되지 않아 향후 업데이트에서 수정 예정이며 사용자가 주의해야 할 버그나 기능적 제약사항을 기재하는 항목의 명칭은 무엇인가?",
    "answer": [
      "알려진 문제점",
      "Known Issues",
      "알려진 문제"
    ],
    "explanation": "알려진 문제점(Known Issues)은 소프트웨어 배포 시점에 파악되었으나 릴리즈 일정 등으로 인해 해결하지 못한 잔여 결함과 회피 방법(Workaround)을 명시합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "알려진 문제점",
      "Known Issues",
      "릴리즈노트"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SQL_003",
    "subject": "데이터베이스구축",
    "category": "고급 SQL 작성",
    "subCategory": "윈도우 함수",
    "type": "SHORT_ANSWER",
    "question": "SQL 윈도우 함수 중, 현재 행을 기준으로 지정된 오프셋만큼 이전 행의 컬럼 값을 가져오는 함수를 쓰시오. (예: 바로 앞 이전 달 매출액 조회)",
    "answer": [
      "LAG",
      "LAG()"
    ],
    "explanation": "LAG()는 현재 행보다 앞에 위치한 행의 데이터를 참조하는 함수이며, 반대로 이후 행을 참조하는 함수는 LEAD()입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "LAG",
      "윈도우함수",
      "이전행"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SQL_004",
    "subject": "데이터베이스구축",
    "category": "고급 SQL 작성",
    "subCategory": "윈도우 함수",
    "type": "SHORT_ANSWER",
    "question": "SQL 윈도우 함수 중, 현재 행을 기준으로 다음 행(이후 위치한 행)의 데이터를 조회할 때 사용하는 함수는 무엇인가?",
    "answer": [
      "LEAD",
      "LEAD()"
    ],
    "explanation": "LEAD() 함수는 현재 행의 뒤에 있는 N번째 행의 값을 읽어올 때 사용합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "LEAD",
      "윈도우함수",
      "다음행"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SQL_008",
    "subject": "데이터베이스구축",
    "category": "절차형 SQL",
    "subCategory": "PL/SQL 기본 구조",
    "type": "SHORT_ANSWER",
    "question": "오라클 PL/SQL 블록의 3대 구성 섹션 중, 프로시저 내부에서 사용할 변수, 상수, 커서(Cursor)를 선언하는 선택적 시작 섹션의 키워드는 무엇인가?",
    "answer": [
      "DECLARE",
      "DECLARE절"
    ],
    "explanation": "PL/SQL 블록은 선언부(DECLARE), 실행부(BEGIN ~ END), 예외처리부(EXCEPTION)로 구성됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "DECLARE",
      "PL/SQL",
      "선언부"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SQL_009",
    "subject": "데이터베이스구축",
    "category": "절차형 SQL",
    "subCategory": "PL/SQL 커서(Cursor)",
    "type": "SHORT_ANSWER",
    "question": "복수 개의 행을 반환하는 SELECT 쿼리의 결과 집합을 한 행씩 순차적으로 읽어와 처리하기 위한 PL/SQL 커서(Cursor)의 생명주기 4단계를 순서대로 쓰시오. [선언 → (    ) → 패치 → (    )]",
    "answer": [
      "오픈, 클로즈",
      "OPEN, CLOSE",
      "열기, 닫기"
    ],
    "explanation": "명시적 커서 제어 4단계는 DECLARE(선언) → OPEN(열기/실행) → FETCH(한 행 읽기) → CLOSE(닫기/자원해제)입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "커서",
      "OPEN",
      "CLOSE",
      "FETCH"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SQL_010",
    "subject": "데이터베이스구축",
    "category": "절차형 SQL",
    "subCategory": "PL/SQL 커서 속성",
    "type": "SHORT_ANSWER",
    "question": "PL/SQL 커서에서 FETCH 문을 수행했을 때 더 이상 읽어올 행(Row)이 존재하지 않으면 TRUE를 반환하는 커서 상태 속성의 키워드는 무엇인가?",
    "answer": [
      "%NOTFOUND",
      "NOTFOUND"
    ],
    "explanation": "%NOTFOUND 속성은 커서에서 마지막 FETCH 결과 반환된 행이 없을 때 TRUE가 되어 루프 탈출 조건(EXIT WHEN 커서명%NOTFOUND)으로 사용됩니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "%NOTFOUND",
      "커서속성",
      "FETCH"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SQL_011",
    "subject": "데이터베이스구축",
    "category": "절차형 SQL",
    "subCategory": "PL/SQL 커서 속성",
    "type": "SHORT_ANSWER",
    "question": "PL/SQL 커서나 SQL 문 실행 후, 지금까지 성공적으로 FETCH 되었거나 DML에 의해 영향을 받은 행의 총 개수를 반환하는 커서 속성은 무엇인가?",
    "answer": [
      "%ROWCOUNT",
      "ROWCOUNT"
    ],
    "explanation": "%ROWCOUNT는 현재까지 읽어들인 행의 수 또는 INSERT/UPDATE/DELETE로 수정된 레코드 수를 반환합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "%ROWCOUNT",
      "커서속성",
      "행수"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SQL_012",
    "subject": "데이터베이스구축",
    "category": "절차형 SQL",
    "subCategory": "트리거(Trigger)",
    "type": "SHORT_ANSWER",
    "question": "특정 테이블에 INSERT, UPDATE, DELETE 등의 이벤트가 발생할 때 실행되는 트리거 중, 변경되는 각 데이터 행마다 개별적으로 한 번씩 실행되도록 지정하는 SQL 절은 무엇인가?",
    "answer": [
      "FOR EACH ROW"
    ],
    "explanation": "FOR EACH ROW 절을 지정하면 문장 단위가 아닌 영향을 받는 행 단위로 트리거가 실행되는 행 트리거(Row Trigger)가 됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "FOR EACH ROW",
      "행트리거",
      "트리거"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SQL_013",
    "subject": "데이터베이스구축",
    "category": "절차형 SQL",
    "subCategory": "트리거(Trigger)",
    "type": "SHORT_ANSWER",
    "question": "행 트리거(FOR EACH ROW)에서 INSERT 또는 UPDATE 문에 의해 새롭게 입력되거나 수정되어 들어오는 컬럼의 변경 후 값을 참조할 때 사용하는 가상 콜론 변수는 무엇인가?",
    "answer": [
      ":NEW",
      "NEW"
    ],
    "explanation": "행 트리거에서 :NEW는 새로 갱신될 값을 가리키고, :OLD는 변경 이전의 기존 값을 가리킵니다. (DELETE 문에서는 :OLD만 유효)",
    "difficulty": "EASY",
    "keywords": [
      ":NEW",
      "NEW",
      "트리거변수"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SQL_014",
    "subject": "데이터베이스구축",
    "category": "절차형 SQL",
    "subCategory": "객체 비교",
    "type": "SHORT_ANSWER",
    "question": "데이터베이스 절차형 객체 중, 저장 프로시저(Stored Procedure)와 달리 실행 후 단 하나의 결과를 반드시 RETURN 문을 통해 반환해야 하며, 일반 SELECT 쿼리문 내부에서도 호출 가능한 객체는 무엇인가?",
    "answer": [
      "사용자 정의 함수",
      "사용자 정의 함수(User-Defined Function)",
      "Function"
    ],
    "explanation": "사용자 정의 함수(User Defined Function)는 수식이나 표현식의 일부로 사용되며 단일 값을 반드시 RETURN해야 합니다.",
    "difficulty": "EASY",
    "keywords": [
      "사용자 정의 함수",
      "Function",
      "RETURN"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SQL_015",
    "subject": "데이터베이스구축",
    "category": "SQL 최적화",
    "subCategory": "옵티마이저(Optimizer)",
    "type": "SHORT_ANSWER",
    "question": "DBMS 옵티마이저의 두 가지 유형 중, 테이블 통계 정보나 데이터 분포를 고려하지 않고 미리 정해진 우선순위 규칙에 따라 실행 계획을 세우는 방식을 무엇이라 하는가?",
    "answer": [
      "RBO",
      "규칙 기반 옵티마이저",
      "Rule Based Optimizer"
    ],
    "explanation": "RBO(Rule-Based Optimizer, 규칙 기반 옵티마이저)는 인덱스 유무, 연산자 종류 등의 고정된 15개 우선순위 룰에 따라 경로를 결정합니다.",
    "difficulty": "EASY",
    "keywords": [
      "RBO",
      "규칙 기반 옵티마이저",
      "옵티마이저"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SQL_016",
    "subject": "데이터베이스구축",
    "category": "SQL 최적화",
    "subCategory": "옵티마이저(Optimizer)",
    "type": "SHORT_ANSWER",
    "question": "테이블 및 인덱스의 레코드 수, 블록 수, 카디널리티 등 카탈로그 통계 정보를 바탕으로 쿼리 수행에 필요한 비용(CPU 및 I/O)을 예측하여 최적의 실행 계획을 선택하는 현대적인 옵티마이저는 무엇인가?",
    "answer": [
      "CBO",
      "비용 기반 옵티마이저",
      "Cost Based Optimizer"
    ],
    "explanation": "CBO(Cost-Based Optimizer, 비용 기반 옵티마이저)는 데이터 카탈로그 통계 정보를 기반으로 가장 적은 소요 비용이 드는 실행 계획을 선택합니다.",
    "difficulty": "EASY",
    "keywords": [
      "CBO",
      "비용 기반 옵티마이저",
      "옵티마이저"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SQL_017",
    "subject": "데이터베이스구축",
    "category": "SQL 최적화",
    "subCategory": "인덱스 스캔 방식",
    "type": "SHORT_ANSWER",
    "question": "인덱스 리프 블록에서 특정 검색 조건에 해당하는 시작점부터 종료점까지만 수평적으로 탐색하여 조건에 맞는 행만 효율적으로 읽어내는 가장 대표적인 인덱스 검색 방식은 무엇인가?",
    "answer": [
      "Index Range Scan",
      "인덱스 범위 스캔",
      "인덱스 레인지 스캔"
    ],
    "explanation": "Index Range Scan은 루트 블록에서 수직 탐색 후 리프 블록에서 필요한 범위만큼만 스캔하는 표준적인 인덱스 스캔 방식입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "Index Range Scan",
      "인덱스범위스캔",
      "인덱스스캔"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SQL_018",
    "subject": "데이터베이스구축",
    "category": "SQL 최적화",
    "subCategory": "인덱스 스캔 방식",
    "type": "SHORT_ANSWER",
    "question": "테이블의 전체 데이터를 인덱스를 거치지 않고 처음부터 끝까지 모든 블록을 순차적으로 읽어내는 스캔 방식을 무엇이라 하는가? (대용량 배치 작업이나 테이블 데이터 대부분을 읽을 때 유리)",
    "answer": [
      "Full Table Scan",
      "테이블 전체 스캔",
      "Table Full Scan"
    ],
    "explanation": "Full Table Scan(테이블 풀 스캔)은 인덱스를 타지 않고 데이터 세그먼트의 전체 블록을 멀티블록 I/O로 빠르게 읽는 방식입니다.",
    "difficulty": "EASY",
    "keywords": [
      "Full Table Scan",
      "테이블풀스캔",
      "FTS"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SQL_021",
    "subject": "데이터베이스구축",
    "category": "기본 SQL 작성",
    "subCategory": "테이블 제약조건",
    "type": "SHORT_ANSWER",
    "question": "테이블 생성(CREATE TABLE) 시 특정 컬럼에 입력되는 값이 정의된 논리적 조건식(예: 나이 >= 19)을 반드시 만족해야 하도록 제한하는 무결성 제약조건 키워드는 무엇인가?",
    "answer": [
      "CHECK",
      "CHECK 제약조건"
    ],
    "explanation": "CHECK 제약조건은 데이터 입력/수정 시 특정 컬럼 값이 도메인 유효 범위에 속하는지 조건식으로 검증합니다.",
    "difficulty": "EASY",
    "keywords": [
      "CHECK",
      "제약조건",
      "도메인무결성"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SQL_022",
    "subject": "데이터베이스구축",
    "category": "고급 SQL 작성",
    "subCategory": "상관 서브쿼리",
    "type": "SHORT_ANSWER",
    "question": "서브쿼리가 메인쿼리의 컬럼 값을 참조하여 실행되고, 메인쿼리의 각 행마다 서브쿼리가 반복 수행되는 상호 의존적인 형태의 서브쿼리를 무엇이라 하는가?",
    "answer": [
      "상관 서브쿼리",
      "상호 연관 서브쿼리",
      "Correlated Subquery"
    ],
    "explanation": "상관 서브쿼리(Correlated Subquery)는 서브쿼리 내부에서 메인쿼리의 별칭(Alias)을 참조하여 행 단위로 계산을 반복합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "상관 서브쿼리",
      "Correlated Subquery",
      "서브쿼리"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SQL_023",
    "subject": "데이터베이스구축",
    "category": "SQL 최적화",
    "subCategory": "힌트(Hint)",
    "type": "SHORT_ANSWER",
    "question": "개발자가 SQL 쿼리문 안에 특수 주석(/*+ ... */) 형태로 작성하여, 옵티마이저의 기본 실행 계획 대신 특정 인덱스 사용이나 조인 방식을 강제로 유도하는 명령을 무엇이라 하는가?",
    "answer": [
      "힌트",
      "옵티마이저 힌트",
      "Hint"
    ],
    "explanation": "힌트(Hint)는 SQL 문 내부에 작성되어 옵티마이저에게 강제로 실행 경로(인덱스 지정, 풀테이블 스캔, 조인 순서 등)를 지시합니다.",
    "difficulty": "EASY",
    "keywords": [
      "힌트",
      "Hint",
      "옵티마이저힌트"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SQL_024",
    "subject": "데이터베이스구축",
    "category": "기본 SQL 작성",
    "subCategory": "테이블 데이터 삭제",
    "type": "SHORT_ANSWER",
    "question": "테이블의 모든 데이터를 삭제할 때, DELETE 문과 달리 트랜잭션 로그를 남기지 않고 즉시 공간을 반환하며 롤백(ROLLBACK)이 불가능한 DDL 명령어는 무엇인가?",
    "answer": [
      "TRUNCATE",
      "TRUNCATE TABLE"
    ],
    "explanation": "TRUNCATE는 DDL 명령어로 테이블 구조는 남긴 채 모든 행을 일괄 삭제하며, 시스템 로그 기록을 최소화하여 성능이 매우 빠릅니다.",
    "difficulty": "EASY",
    "keywords": [
      "TRUNCATE",
      "DELETE비교",
      "DDL"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SQL_025",
    "subject": "데이터베이스구축",
    "category": "SQL 최적화",
    "subCategory": "실행 계획(Execution Plan)",
    "type": "SHORT_ANSWER",
    "question": "옵티마이저가 사용자가 작성한 SQL 문을 실행하기 위해 수립한 처리 경로(테이블 접근 순서, 인덱스 사용, 조인 기법 등)를 시각적으로 확인하기 위해 실행하는 데이터베이스 명령어를 쓰시오.",
    "answer": [
      "EXPLAIN PLAN",
      "EXPLAIN"
    ],
    "explanation": "EXPLAIN PLAN 문은 옵티마이저가 생성한 실행 계획을 PLAN_TABLE 등에 기록하여 성능 튜닝 시 조회할 수 있게 합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "EXPLAIN PLAN",
      "실행계획",
      "SQL튜닝"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_INT_001",
    "subject": "소프트웨어설계",
    "category": "인터페이스 설계 및 연계",
    "subCategory": "연계 데이터 표준",
    "type": "SHORT_ANSWER",
    "question": "송수신 시스템 간 데이터 교환 시, 속성-값 쌍(Key-Value Pair)과 배열 자료형으로 구성되어 XML보다 구문 분석(Parsing)이 빠르고 데이터 용량이 작은 경량 텍스트 교환 포맷은 무엇인가?",
    "answer": [
      "JSON",
      "JavaScript Object Notation"
    ],
    "explanation": "JSON은 자바스크립트 객체 표기법에서 파생된 경량 텍스트 포맷으로, 사람이 읽기 쉽고 웹 API 통신에서 사실상 표준으로 사용됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "JSON",
      "연계데이터",
      "경량데이터"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_INT_002",
    "subject": "소프트웨어설계",
    "category": "인터페이스 설계 및 연계",
    "subCategory": "연계 데이터 표준",
    "type": "SHORT_ANSWER",
    "question": "W3C에서 개발한 다목적 마크업 언어로, 사용자가 새로운 태그를 임의로 정의할 수 있으며 데이터와 그 구조를 동시에 설명할 수 있는 표준 교환 포맷은 무엇인가?",
    "answer": [
      "XML",
      "Extensible Markup Language"
    ],
    "explanation": "XML은 확장 가능한 마크업 언어로, 플랫폼 독립적인 데이터 기술과 전자문서 표준화(SOAP, SVG 등)에 널리 활용됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "XML",
      "마크업언어",
      "연계데이터"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_INT_003",
    "subject": "소프트웨어설계",
    "category": "인터페이스 설계 및 연계",
    "subCategory": "연계 데이터 표준",
    "type": "SHORT_ANSWER",
    "question": "구성 설정(Configuration) 파일이나 CI/CD 파이프라인 명세에 주로 쓰이며, 괄호 대신 공백 들여쓰기(Indentation)를 사용하여 가독성을 극대화한 사람이 읽기 쉬운 데이터 직렬화 언어는 무엇인가?",
    "answer": [
      "YAML",
      "YML"
    ],
    "explanation": "YAML(YAML Ain't Markup Language)은 XML과 JSON에 비해 작성과 판독이 직관적이어서 쿠버네티스(k8s), Docker Compose, GitHub Actions 설정 파일에 광범위하게 쓰입니다.",
    "difficulty": "EASY",
    "keywords": [
      "YAML",
      "들여쓰기",
      "데이터직렬화"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_INT_004",
    "subject": "소프트웨어설계",
    "category": "인터페이스 검증",
    "subCategory": "인터페이스 테스트 자동화 도구",
    "type": "SHORT_ANSWER",
    "question": "다양한 환경(OS, 네트워크 장비 등)에서 분산된 테스트를 수행하기 위해 서비스 데몬 형태로 실행되며, 컴포넌트 간의 분산 테스트 및 재사용을 지원하는 서비스 지향 테스트 프레임워크는 무엇인가?",
    "answer": [
      "STAF"
    ],
    "explanation": "STAF(Software Testing Automation Framework)는 분산 환경에서 테스트 수행 및 제어를 데몬 기반으로 통합 지원하는 자동화 프레임워크입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "STAF",
      "테스트자동화",
      "분산테스트"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_INT_005",
    "subject": "소프트웨어설계",
    "category": "인터페이스 검증",
    "subCategory": "인터페이스 테스트 자동화 도구",
    "type": "SHORT_ANSWER",
    "question": "웹 기반의 위키(Wiki) 인터페이스를 활용하여, 비기술자인 고객이나 업무 분석가가 테이블(Table) 형태로 작성한 인수 조건을 그대로 자동화 테스트 케이스로 실행해 주는 도구는 무엇인가?",
    "answer": [
      "FitNesse"
    ],
    "explanation": "FitNesse(핏네스)는 웹 기반 위키 페이지의 표(Table) 형식을 테스트 스크립트로 직접 변환하여 실행하는 인수 테스트 자동화 도구입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "FitNesse",
      "위키",
      "인수테스트"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_INT_006",
    "subject": "소프트웨어설계",
    "category": "인터페이스 검증",
    "subCategory": "인터페이스 테스트 자동화 도구",
    "type": "SHORT_ANSWER",
    "question": "FitNesse의 장점(테스트 협업)과 STAF의 장점(서비스 데몬 기반 분산 환경 지원)을 결합하여 네이버(NHN)에서 오픈소스로 개발한 통합 테스트 프레임워크는 무엇인가?",
    "answer": [
      "NTAF"
    ],
    "explanation": "NTAF(NHN Test Automation Framework)는 FitNesse와 STAF를 결합하여 웹 환경과 분산 환경 테스트를 모두 만족하도록 개발된 프레임워크입니다.",
    "difficulty": "HARD",
    "keywords": [
      "NTAF",
      "STAF",
      "FitNesse"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_INT_007",
    "subject": "소프트웨어설계",
    "category": "인터페이스 성능 및 모니터링",
    "subCategory": "APM 도구",
    "type": "SHORT_ANSWER",
    "question": "운영 중인 애플리케이션의 성능 병목 지점, 리소스 사용률(CPU/메모리), 트랜잭션 응답 시간, 장애 로그 등을 실시간으로 모니터링하고 분석하는 성능 관리 도구의 영문 약어는 무엇인가?",
    "answer": [
      "APM",
      "Application Performance Monitoring",
      "Application Performance Management"
    ],
    "explanation": "APM(Application Performance Management / Monitoring, 예: 제니퍼, 스카우터, 와탭)은 시스템 장애 예방과 성능 튜닝에 필수적인 도구입니다.",
    "difficulty": "EASY",
    "keywords": [
      "APM",
      "애플리케이션성능관리",
      "모니터링"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_INT_009",
    "subject": "소프트웨어설계",
    "category": "인터페이스 보안",
    "subCategory": "IPSec 동작 모드",
    "type": "SHORT_ANSWER",
    "question": "IPSec의 두 가지 동작 모드 중, 원본 IP 패킷 전체(헤더 포함)를 암호화하고 새로운 New IP 헤더를 덧붙여 라우터 간 VPN 터널 구축에 주로 사용되는 모드는 무엇인가?",
    "answer": [
      "터널 모드",
      "Tunnel Mode",
      "터널모드"
    ],
    "explanation": "IPSec 터널 모드는 원본 IP 패킷 전체를 캡슐화하여 게이트웨이(방화벽/VPN) 간 통신에 쓰이며, 종단 호스트 간 통신에서 페이로드만 암호화하는 것은 전송 모드(Transport Mode)입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "터널 모드",
      "Tunnel Mode",
      "IPSec"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_INT_010",
    "subject": "소프트웨어설계",
    "category": "인터페이스 보안",
    "subCategory": "전송 계층 보안",
    "type": "SHORT_ANSWER",
    "question": "전송 계층과 응용 계층 사이에서 안전한 암호화 통신을 제공하기 위해 넷스케이프가 개발한 SSL(Secure Sockets Layer)을 IETF에서 표준화하여 발전시킨 프로토콜의 약어는 무엇인가?",
    "answer": [
      "TLS",
      "Transport Layer Security"
    ],
    "explanation": "TLS(Transport Layer Security)는 웹(HTTPS), 메일(SMTPS) 등의 데이터 기밀성과 데이터 무결성을 제공하는 국제 표준 보안 프로토콜입니다.",
    "difficulty": "EASY",
    "keywords": [
      "TLS",
      "SSL",
      "전송계층보안"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_INT_011",
    "subject": "소프트웨어설계",
    "category": "인터페이스 설계 및 연계",
    "subCategory": "연계 메커니즘",
    "type": "SHORT_ANSWER",
    "question": "송신 시스템의 데이터베이스에서 수신 시스템의 원격 데이터베이스에 직접 접속하여 데이터를 조회하거나 조작할 수 있도록 DBMS 자체에서 제공하는 원격 연결 객체를 무엇이라 하는가?",
    "answer": [
      "DB Link",
      "데이터베이스 링크",
      "DB 링크"
    ],
    "explanation": "DB Link(데이터베이스 링크)는 DBMS 간에 네트워크를 통해 원격 테이블에 직접 접근(예: SELECT * FROM emp@remote_db)할 수 있도록 제공하는 메커니즘입니다.",
    "difficulty": "EASY",
    "keywords": [
      "DB Link",
      "DB링크",
      "데이터베이스링크"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_INT_012",
    "subject": "소프트웨어설계",
    "category": "인터페이스 설계 및 연계",
    "subCategory": "연계 메커니즘",
    "type": "SHORT_ANSWER",
    "question": "송신 시스템의 데이터베이스와 수신 시스템의 데이터베이스 사이의 데이터 불일치를 방지하고, 송신 테이블의 변경(INSERT/UPDATE/DELETE) 사항을 실시간 또는 주기적으로 상대 DB 테이블에 복제해 주는 객체 기법은 무엇인가?",
    "answer": [
      "DB 연결",
      "DB Connection Pool",
      "DB 복제",
      "DB 커넥션"
    ],
    "explanation": "데이터베이스 연결 및 연계 테이블 복제(Replication/Trigger 기반)는 배치 또는 실시간 데이터 동기화에 사용됩니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "DB연계",
      "데이터동기화"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_INT_013",
    "subject": "소프트웨어설계",
    "category": "인터페이스 설계 및 연계",
    "subCategory": "연계 메커니즘",
    "type": "SHORT_ANSWER",
    "question": "웹 브라우저와 웹 서버 간의 비동기적 데이터 교환 기술로, 전체 페이지를 새로고침하지 않고도 백그라운드에서 서버와 JSON/XML 데이터를 주고받아 화면 일부분만을 갱신할 수 있는 기술의 약어는 무엇인가?",
    "answer": [
      "AJAX",
      "Asynchronous JavaScript and XML"
    ],
    "explanation": "AJAX(비동기 자바스크립트와 XML)는 XMLHttpRequest 또는 Fetch API를 사용하여 끊김 없는 부드러운 웹 사용자 인터페이스를 제공합니다.",
    "difficulty": "EASY",
    "keywords": [
      "AJAX",
      "비동기통신",
      "웹인터페이스"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_INT_014",
    "subject": "소프트웨어설계",
    "category": "인터페이스 설계 및 연계",
    "subCategory": "웹 서비스 표준",
    "type": "SHORT_ANSWER",
    "question": "SOAP 기반 웹 서비스에서 제공하는 서비스의 구체적인 내용(메서드명, 매개변수, 반환값 타입, 네트워크 통신 프로토콜 및 엔드포인트 URL)을 XML 형식으로 기술한 인터페이스 명세 문서는 무엇인가?",
    "answer": [
      "WSDL",
      "Web Services Description Language"
    ],
    "explanation": "WSDL은 웹 서비스가 어떤 기능을 제공하고 어떻게 호출해야 하는지 기술하는 표준 기술서이며, UDDI 등록소에 등록되어 검색됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "WSDL",
      "웹서비스",
      "SOAP"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_INT_015",
    "subject": "소프트웨어설계",
    "category": "인터페이스 설계 및 연계",
    "subCategory": "웹 서비스 표준",
    "type": "SHORT_ANSWER",
    "question": "전 세계의 비즈니스 및 웹 서비스 제공자들이 자신들의 WSDL 명세서를 등록하여 누구나 검색하고 공유할 수 있도록 해주는 XML 기반의 공개 등록소(디렉터리 서비스)는 무엇인가?",
    "answer": [
      "UDDI",
      "Universal Description, Discovery and Integration"
    ],
    "explanation": "UDDI는 웹 서비스의 전화번호부와 같은 역할을 하는 범용 등록소 규격입니다.",
    "difficulty": "EASY",
    "keywords": [
      "UDDI",
      "웹서비스등록소",
      "디렉터리"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_INT_018",
    "subject": "소프트웨어설계",
    "category": "인터페이스 설계 및 연계",
    "subCategory": "인터페이스 명세서",
    "type": "SHORT_ANSWER",
    "question": "송수신 시스템 간의 연계 방식을 정의할 때, 정해진 바이트 크기(고정 길이)나 구분자(Delimiter)를 기준으로 데이터 필드를 연속하여 일렬로 주고받는 정형화된 데이터 통신 단위를 무엇이라 하는가?",
    "answer": [
      "전문",
      "전문 인터페이스",
      "전문(Telegram)"
    ],
    "explanation": "전문(Telegram) 방식은 금융권 및 공공기관 레거시 시스템에서 고속 대용량 거래 데이터 처리를 위해 주로 사용하는 고정 길이(Fixed Length) 또는 가변 길이 데이터 규격입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "전문",
      "전문인터페이스",
      "고정길이"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_INT_019",
    "subject": "소프트웨어설계",
    "category": "인터페이스 오류 처리",
    "subCategory": "예외 및 로깅",
    "type": "SHORT_ANSWER",
    "question": "시스템 연계 중 네트워크 단절이나 대상 시스템 장애로 인해 전송이 실패했을 때, 데이터를 즉시 폐기하지 않고 보관했다가 일정 주기로 재전송을 시도하는 메커니즘을 무엇이라 하는가?",
    "answer": [
      "재전송 메커니즘",
      "재시도",
      "재전송",
      "Retry"
    ],
    "explanation": "재전송(Retry) 메커니즘은 일시적인 네트워크 순단이나 부하 상황에서 인터페이스 트랜잭션의 신뢰성과 데이터 유실 방지를 위해 필수적입니다.",
    "difficulty": "EASY",
    "keywords": [
      "재전송",
      "Retry",
      "장애처리"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_INT_020",
    "subject": "소프트웨어설계",
    "category": "인터페이스 성능",
    "subCategory": "성능 지표",
    "type": "SHORT_ANSWER",
    "question": "인터페이스 및 시스템 성능 측정 지표 중, 초당 시스템이 처리할 수 있는 트랜잭션(요청)의 건수를 나타내는 핵심 단위의 약어는 무엇인가?",
    "answer": [
      "TPS",
      "Transactions Per Second"
    ],
    "explanation": "TPS(Transactions Per Second)는 시스템의 처리량(Throughput)을 나타내는 가장 대표적인 성능 지표입니다.",
    "difficulty": "EASY",
    "keywords": [
      "TPS",
      "처리량",
      "성능지표"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_INT_021",
    "subject": "소프트웨어설계",
    "category": "인터페이스 보안",
    "subCategory": "보안 통신 프로토콜",
    "type": "SHORT_ANSWER",
    "question": "기존의 텔넷(Telnet)이나 rlogin 등의 평문 전송 원격 접속 방식을 대체하기 위해, 강력한 공개키 암호화 기반으로 안전한 원격 쉘 명령 및 포트 포워딩을 제공하는 프로토콜은 무엇인가?",
    "answer": [
      "SSH",
      "Secure Shell"
    ],
    "explanation": "SSH(Secure Shell, 포트 22)는 원격 서버 관리 시 패킷 스니핑을 방지하기 위한 표준 암호화 프로토콜입니다.",
    "difficulty": "EASY",
    "keywords": [
      "SSH",
      "원격접속",
      "보안쉘"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_INT_022",
    "subject": "소프트웨어설계",
    "category": "인터페이스 설계",
    "subCategory": "인터페이스 요구사항 분석",
    "type": "SHORT_ANSWER",
    "question": "개발할 시스템과 외부 시스템 간의 데이터 흐름 및 경계를 한눈에 파악하기 위해, 전체 시스템을 하나의 단일 프로세스로 두고 외부 엔티티(Entity)와의 입출력 데이터 흐름만을 표현한 DFD 최상위 다이어그램을 무엇이라 하는가?",
    "answer": [
      "기본 시스템 모델",
      "배경도",
      "Context Diagram"
    ],
    "explanation": "배경도(Context Diagram)는 DFD Level 0으로서 시스템 전체를 단일 프로세스로 나타내어 시스템의 외부 경계와 입출력을 정의합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "배경도",
      "Context Diagram",
      "DFD"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_INT_023",
    "subject": "소프트웨어설계",
    "category": "인터페이스 검증",
    "subCategory": "웹 UI 자동화 테스트 도구",
    "type": "SHORT_ANSWER",
    "question": "다양한 웹 브라우저(크롬, 파이어폭스, 엣지 등) 상에서 사용자의 클릭, 입력, 화면 이동 동작을 스크립트로 기록하고 재생하여 웹 애플리케이션의 엔드투엔드(E2E) 인터페이스를 자동 검증하는 오픈소스 도구는 무엇인가?",
    "answer": [
      "셀레니움",
      "Selenium"
    ],
    "explanation": "Selenium(셀레니움)은 웹 브라우저를 직접 제어하여 크로스 브라우징 및 인터페이스 회귀 테스트를 자동화하는 대표적인 도구입니다.",
    "difficulty": "EASY",
    "keywords": [
      "셀레니움",
      "Selenium",
      "E2E테스트"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_INT_024",
    "subject": "소프트웨어설계",
    "category": "인터페이스 보안",
    "subCategory": "API 인증 및 인가",
    "type": "SHORT_ANSWER",
    "question": "제3자 애플리케이션(서드파티 앱)에 사용자의 비밀번호를 노출하지 않고도 특정 리소스에 대한 접근 권한(토큰 기반)을 안전하게 위임하고 인가하기 위한 개방형 표준 프로토콜은 무엇인가?",
    "answer": [
      "OAuth",
      "OAuth 2.0",
      "오스"
    ],
    "explanation": "OAuth(특히 OAuth 2.0)는 구글/카카오 로그인 연동 등 현대 모바일 및 웹 서비스의 API 인가 표준입니다.",
    "difficulty": "EASY",
    "keywords": [
      "OAuth",
      "토큰인가",
      "API보안"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_INT_025",
    "subject": "소프트웨어설계",
    "category": "인터페이스 설계 및 연계",
    "subCategory": "연계 방식 분류",
    "type": "SHORT_ANSWER",
    "question": "송신 시스템에서 요청을 보낸 후 수신 시스템으로부터 응답이 올 때까지 대기하지 않고 즉시 다음 작업을 진행하며, 메시지 큐(MQ)를 활용하여 시스템 간 결합도를 최소화하는 통신 방식을 무엇이라 하는가?",
    "answer": [
      "비동기 방식",
      "비동기 통신",
      "비동기식",
      "Asynchronous"
    ],
    "explanation": "비동기(Asynchronous) 통신은 송수신자 간의 시간적 결합도를 분리하여 처리량과 응답성을 극대화합니다. (대기하는 방식은 동기 방식)",
    "difficulty": "EASY",
    "keywords": [
      "비동기 방식",
      "비동기통신",
      "메시지큐"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_DEV_001",
    "subject": "데이터베이스구축",
    "category": "데이터 전환 및 이관",
    "subCategory": "ETL 프로세스",
    "type": "SHORT_ANSWER",
    "question": "원천 시스템(Source)의 데이터베이스나 파일로부터 필요한 데이터를 추출하고, 목적 시스템의 형식에 맞게 변환 및 정제한 후 데이터 웨어하우스나 목적 DB에 적재하는 일련의 과정을 나타내는 영문 3글자 약어는 무엇인가?",
    "answer": [
      "ETL",
      "Extract, Transform, Load"
    ],
    "explanation": "ETL(Extract, Transform, Load)은 데이터 이관, 데이터 웨어하우스 구축 및 데이터 레이크 적재의 핵심 프로세스입니다.",
    "difficulty": "EASY",
    "keywords": [
      "ETL",
      "데이터추출",
      "데이터변환",
      "데이터적재"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_DEV_002",
    "subject": "데이터베이스구축",
    "category": "데이터 전환 및 이관",
    "subCategory": "데이터 전환 절차",
    "type": "SHORT_ANSWER",
    "question": "데이터 전환 절차 중 원천 시스템의 테이블 및 컬럼과 목적 시스템의 테이블 및 컬럼 간의 1:1, 1:N, N:M 대응 관계 및 변환 규칙을 상세하게 기술한 설계 문서를 무엇이라 하는가?",
    "answer": [
      "데이터 매핑 정의서",
      "데이터 매핑",
      "매핑 정의서",
      "Mapping Specification"
    ],
    "explanation": "데이터 매핑 정의서는 원천 데이터가 목적지 데이터의 어떤 컬럼으로 어떤 변환 로직(타입 변환, 코드 매핑 등)을 거쳐 들어가는지 명시한 필수 산출물입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "데이터매핑",
      "매핑정의서",
      "데이터전환"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_DEV_003",
    "subject": "데이터베이스구축",
    "category": "데이터 전환 및 이관",
    "subCategory": "데이터 정제",
    "type": "SHORT_ANSWER",
    "question": "원천 데이터에 존재하는 결측치, 이상치, 오탈자, 형식 불일치, 중복 데이터 등의 오류를 식별하고 수정하여 데이터의 정확성과 일관성을 확보하는 일련의 품질 개선 작업을 무엇이라 하는가?",
    "answer": [
      "데이터 정제",
      "데이터 클렌징",
      "Data Cleansing"
    ],
    "explanation": "데이터 정제(Data Cleansing)는 변환 및 적재 전에 데이터의 오류를 정제하여 이관 실패를 예방하고 데이터 품질을 확보합니다.",
    "difficulty": "EASY",
    "keywords": [
      "데이터 정제",
      "데이터 클렌징",
      "Data Cleansing"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_DEV_004",
    "subject": "데이터베이스구축",
    "category": "데이터 전환 및 이관",
    "subCategory": "데이터 전환 검증",
    "type": "SHORT_ANSWER",
    "question": "데이터 전환 완료 후, 원천 데이터의 건수와 목적 시스템에 적재된 데이터의 총 건수(Count) 및 주요 금액/수량의 합계(Sum), 해시값(Checksum)을 대조하여 데이터 유실이 없는지 확인하는 검증 방식을 무엇이라 하는가?",
    "answer": [
      "로그 검증",
      "정합성 검증",
      "데이터 정합성 검증",
      "건수 검증"
    ],
    "explanation": "데이터 전환 정합성 검증은 전환 전후의 총 건수, 집계 합계(Sum/Hash), 로그 대조를 통해 완벽한 이관 여부를 판정합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "데이터정합성",
      "로그검증",
      "데이터검증"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_DEV_005",
    "subject": "정보시스템구축관리",
    "category": "서버 프로그램 구현",
    "subCategory": "배치 프로그램 특성",
    "type": "SHORT_ANSWER",
    "question": "배치(Batch) 프로그램이 반드시 만족해야 하는 5대 필수 요건 중, 대용량의 데이터를 처리하는 도중 예기치 않은 오류나 시스템 중단이 발생하더라도 중복 실행이나 유실 없이 정상 복구될 수 있어야 함을 의미하는 특성은 무엇인가?",
    "answer": [
      "견고성",
      "Robustness",
      "안정성"
    ],
    "explanation": "배치 프로그램의 필수 5대 요건은 대용량 데이터, 자동화, 견고성(오류 발생 시 대처), 신뢰성/안정성(오류 없는 추적), 성능입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "견고성",
      "배치프로그램",
      "배치5대요건"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_DEV_006",
    "subject": "정보시스템구축관리",
    "category": "서버 프로그램 구현",
    "subCategory": "배치 스케줄러",
    "type": "SHORT_ANSWER",
    "question": "유닉스 및 리눅스 운영체제에서 백그라운드 데몬(crond)으로 동작하며, 분, 시, 일, 월, 요일의 5가지 시간 필드 표현식을 사용하여 주기적인 배치 작업 실행을 자동 예약해 주는 도구는 무엇인가?",
    "answer": [
      "크론",
      "Cron",
      "crontab"
    ],
    "explanation": "cron(크론)은 crontab 설정 파일을 통해 특정 시간/주기마다 쉘 스크립트나 명령어를 자동 실행해 주는 표준 작업 스케줄러입니다.",
    "difficulty": "EASY",
    "keywords": [
      "크론",
      "Cron",
      "crontab",
      "배치스케줄러"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_DEV_007",
    "subject": "정보시스템구축관리",
    "category": "서버 프로그램 구현",
    "subCategory": "배치 스케줄러",
    "type": "SHORT_ANSWER",
    "question": "자바(Java) 엔터프라이즈 환경에서 정교한 작업 스케줄링을 지원하며, Job, Trigger, Scheduler 인터페이스를 기반으로 다중 서버 간 클러스터링 및 실패 복구(Failover) 기능을 제공하는 대표적인 오픈소스 스케줄러 프레임워크는 무엇인가?",
    "answer": [
      "쿼츠",
      "Quartz",
      "Quartz 스케줄러"
    ],
    "explanation": "Quartz는 스프링 프레임워크 등과 손쉽게 연동되는 자바 표준 배치/작업 스케줄러 라이브러리입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "Quartz",
      "쿼츠",
      "자바스케줄러"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_DEV_008",
    "subject": "정보시스템구축관리",
    "category": "서버 프로그램 구현",
    "subCategory": "계층형 아키텍처 객체",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 계층 간(예: 컨트롤러와 서비스, 클라이언트와 서버)에 데이터를 전달하기 위해 사용되는 객체로, 별도의 비즈니스 로직 없이 속성(필드)과 그에 대한 Getter/Setter 메소드만을 포함하는 순수 데이터 전달용 객체는 무엇인가?",
    "answer": [
      "DTO",
      "Data Transfer Object"
    ],
    "explanation": "DTO(Data Transfer Object)는 프로세스 간 네트워크 호출 횟수를 줄이기 위해 여러 데이터를 하나로 묶어 전송하는 객체입니다.",
    "difficulty": "EASY",
    "keywords": [
      "DTO",
      "Data Transfer Object",
      "데이터전달객체"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_DEV_009",
    "subject": "정보시스템구축관리",
    "category": "서버 프로그램 구현",
    "subCategory": "계층형 아키텍처 객체",
    "type": "SHORT_ANSWER",
    "question": "DTO와 유사하게 데이터를 담고 있으나, 특정 비즈니스 값을 나타내며 한 번 생성되면 내부 상태가 절대 변하지 않는 불변성(Immutability)을 가지며 속성 값들이 모두 같으면 동일한 객체로 취급되는 객체는 무엇인가?",
    "answer": [
      "VO",
      "Value Object"
    ],
    "explanation": "VO(Value Object)는 값 자체를 표현하는 객체로, Setter가 제공되지 않는 불변(Immutable) 객체이며 equals()와 hashCode()를 재정의하여 값 동등성을 비교합니다.",
    "difficulty": "EASY",
    "keywords": [
      "VO",
      "Value Object",
      "불변객체"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_DEV_010",
    "subject": "정보시스템구축관리",
    "category": "서버 프로그램 구현",
    "subCategory": "계층형 아키텍처 객체",
    "type": "SHORT_ANSWER",
    "question": "데이터베이스에 접근하여 데이터의 삽입, 조회, 수정, 삭제(CRUD) 작업을 전담 수행하는 객체로, 비즈니스 로직과 데이터 접근 로직을 분리하기 위해 사용하는 객체 패턴의 약어는 무엇인가?",
    "answer": [
      "DAO",
      "Data Access Object"
    ],
    "explanation": "DAO(Data Access Object)는 데이터베이스 커넥션 관리 및 SQL 실행을 캡슐화하여 서비스 계층이 저수준 데이터베이스 API에 종속되지 않도록 분리합니다.",
    "difficulty": "EASY",
    "keywords": [
      "DAO",
      "Data Access Object",
      "데이터접근객체"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_DEV_011",
    "subject": "정보시스템구축관리",
    "category": "개발환경 구축",
    "subCategory": "서버 인프라 역할 분리",
    "type": "SHORT_ANSWER",
    "question": "클라이언트의 HTTP 요청을 직접 받아 정적 콘텐츠(HTML, CSS, 이미지 파일)를 고속으로 전달하고, 동적 처리가 필요한 요청은 뒤단의 WAS로 전달(프록시)하는 서버(예: Apache HTTP Server, Nginx)를 무엇이라 하는가?",
    "answer": [
      "웹 서버",
      "Web Server",
      "WS"
    ],
    "explanation": "웹 서버(Web Server)는 정적 리소스 응답과 로드밸런싱/리버스 프록시를 전담하여 WAS의 연산 부담을 줄여줍니다.",
    "difficulty": "EASY",
    "keywords": [
      "웹 서버",
      "Web Server",
      "정적콘텐츠"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_DEV_012",
    "subject": "정보시스템구축관리",
    "category": "개발환경 구축",
    "subCategory": "서버 인프라 역할 분리",
    "type": "SHORT_ANSWER",
    "question": "웹 서버로부터 동적 요청을 전달받아 서블릿(Servlet), JSP, 비즈니스 로직, 데이터베이스 연동 및 트랜잭션 관리 등을 수행하는 서버 프로그램(예: Apache Tomcat, WebLogic, Jeus)을 무엇이라 하는가?",
    "answer": [
      "WAS",
      "웹 애플리케이션 서버",
      "Web Application Server"
    ],
    "explanation": "WAS(Web Application Server)는 웹 컨테이너(서블릿 컨테이너)를 내장하여 동적 비즈니스 연산 및 DB 처리를 수행합니다.",
    "difficulty": "EASY",
    "keywords": [
      "WAS",
      "Web Application Server",
      "웹애플리케이션서버"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_DEV_013",
    "subject": "정보시스템구축관리",
    "category": "개발환경 구축",
    "subCategory": "형상관리(SCM)",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 개발 과정에서 소스코드, 설계 문서, 라이브러리 등의 모든 변경 사항을 체계적으로 추적하고 통제하는 활동으로, 식별 → (    ) → 감사 → 기록의 4가지 주요 활동으로 구성되는 관리를 무엇이라 하는가?",
    "answer": [
      "형상 통제",
      "통제",
      "형상통제",
      "Configuration Control"
    ],
    "explanation": "소프트웨어 형상관리 4대 활동은 형상 식별 → 형상 통제(변경 승인 및 반영) → 형상 감사(무결성 공식 검증) → 형상 기록/보고입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "형상통제",
      "형상관리",
      "SCM"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_DEV_014",
    "subject": "정보시스템구축관리",
    "category": "개발환경 구축",
    "subCategory": "형상관리 도구 유형",
    "type": "SHORT_ANSWER",
    "question": "형상관리 도구의 유형 중, 중앙 서버에 모든 소스코드가 저장되어 개발자들은 중앙 서버에 접속하여 체크아웃/커밋을 수행해야 하며 네트워크 연결이 끊기면 버전 관리가 불가능한 클라이언트/서버 방식의 대표 도구는 무엇인가?",
    "answer": [
      "SVN",
      "서브버전",
      "Subversion"
    ],
    "explanation": "SVN(Apache Subversion)은 중앙 집중형 클라이언트/서버 형상관리 도구입니다. (로컬 저장소를 갖는 것은 Git 등 분산형 도구)",
    "difficulty": "EASY",
    "keywords": [
      "SVN",
      "Subversion",
      "중앙집중형"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_DEV_015",
    "subject": "정보시스템구축관리",
    "category": "개발환경 구축",
    "subCategory": "형상관리 도구 유형",
    "type": "SHORT_ANSWER",
    "question": "리눅스 토발즈가 개발한 분산 버전 관리 시스템(DVCS)으로, 개발자마다 전체 프로젝트 히스토리가 담긴 로컬 저장소를 복제(Clone)하여 오프라인에서도 완전한 커밋과 브랜치 작업이 가능한 도구는 무엇인가?",
    "answer": [
      "Git",
      "깃"
    ],
    "explanation": "Git은 분산 버전 관리 시스템으로 빠른 브랜칭, 오프라인 작업, P2P 동기화가 가능합니다.",
    "difficulty": "EASY",
    "keywords": [
      "Git",
      "깃",
      "분산버전관리"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_DEV_016",
    "subject": "데이터베이스구축",
    "category": "데이터 전환 및 이관",
    "subCategory": "ETL 프로세스 변형",
    "type": "SHORT_ANSWER",
    "question": "빅데이터 클라우드 환경에서 대용량 데이터를 처리할 때, 데이터 추출(Extract) 후 별도의 중간 서버에서 변환하지 않고 먼저 대상 데이터 레이크/웨어하우스에 원본 그대로 적재(Load)한 후 분산 엔진의 컴퓨팅 파워로 목적지 내부에서 직접 변환(Transform)을 수행하는 데이터 파이프라인 아키텍처는 무엇인가?",
    "answer": [
      "ELT",
      "Extract, Load, Transform"
    ],
    "explanation": "ELT는 클라우드 데이터 웨어하우스(Snowflake, BigQuery 등)의 막강한 병렬 처리 성능을 활용하기 위해 ETL의 변환과 적재 순서를 바꾼 현대적 패턴입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "ELT",
      "데이터파이프라인",
      "빅데이터적재"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_DEV_017",
    "subject": "정보시스템구축관리",
    "category": "서버 프로그램 구현",
    "subCategory": "스프링 프레임워크 핵심",
    "type": "SHORT_ANSWER",
    "question": "객체가 자신이 사용할 의존 객체를 직접 new 생성자로 생성하지 않고, 외부 컨테이너(IoC 컨테이너)로부터 생성된 인스턴스를 주입받아 객체 간의 결합도를 낮추는 객체지향 디자인 원칙의 약어는 무엇인가?",
    "answer": [
      "DI",
      "의존성 주입",
      "Dependency Injection"
    ],
    "explanation": "DI(Dependency Injection, 의존성 주입)는 스프링의 핵심 철학으로 모듈 간의 결합도를 느슨하게 하고 단위 테스트를 용이하게 합니다.",
    "difficulty": "EASY",
    "keywords": [
      "DI",
      "의존성주입",
      "스프링"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_DEV_018",
    "subject": "정보시스템구축관리",
    "category": "서버 프로그램 구현",
    "subCategory": "스프링 프레임워크 핵심",
    "type": "SHORT_ANSWER",
    "question": "로깅, 보안, 트랜잭션 관리와 같이 애플리케이션의 여러 모듈에 공통적으로 나타나는 횡단 관심사(Cross-Cutting Concerns)를 핵심 비즈니스 로직과 분리하여 모듈화하는 프로그래밍 패러다임의 약어는 무엇인가?",
    "answer": [
      "AOP",
      "관점 지향 프로그래밍",
      "Aspect Oriented Programming"
    ],
    "explanation": "AOP(Aspect Oriented Programming, 관점 지향 프로그래밍)는 공통 횡단 기능을 별도의 Aspect로 분리하여 코드 중복을 제거합니다.",
    "difficulty": "EASY",
    "keywords": [
      "AOP",
      "관점지향",
      "횡단관심사"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_DEV_019",
    "subject": "정보시스템구축관리",
    "category": "서버 프로그램 구현",
    "subCategory": "ORM 프레임워크",
    "type": "SHORT_ANSWER",
    "question": "관계형 데이터베이스의 테이블과 객체지향 프로그래밍 언어의 클래스 간의 불일치(패러다임 불일치)를 해결하기 위해, 객체와 관계형 테이블을 자동으로 매핑해 주는 기술의 약어는 무엇인가?",
    "answer": [
      "ORM",
      "Object Relational Mapping",
      "객체 관계 매핑"
    ],
    "explanation": "ORM(Object-Relational Mapping, 예: JPA, 하이버네이트)은 개발자가 SQL을 직접 작성하지 않고 객체 모델 중심으로 DB를 다룰 수 있게 해줍니다.",
    "difficulty": "EASY",
    "keywords": [
      "ORM",
      "JPA",
      "객체관계매핑"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_DEV_020",
    "subject": "정보시스템구축관리",
    "category": "개발환경 구축",
    "subCategory": "IDE 도구",
    "type": "SHORT_ANSWER",
    "question": "코드 편집기, 컴파일러, 디버거, 그래픽 사용자 인터페이스(GUI) 빌더 등 소프트웨어 개발에 필요한 다양한 도구들을 하나의 통합된 프로그램 안에서 제공하는 소프트웨어 환경의 영문 약어는 무엇인가?",
    "answer": [
      "IDE",
      "통합 개발 환경",
      "Integrated Development Environment"
    ],
    "explanation": "IDE(Integrated Development Environment, 예: Eclipse, IntelliJ, VS Code)는 소프트웨어 개발 생산성을 극대화하는 통합 개발 도구입니다.",
    "difficulty": "EASY",
    "keywords": [
      "IDE",
      "통합개발환경",
      "개발도구"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_DEV_021",
    "subject": "데이터베이스구축",
    "category": "데이터 전환 및 이관",
    "subCategory": "데이터 이관 전략",
    "type": "SHORT_ANSWER",
    "question": "기존 시스템을 일시적으로 전면 중단(다운타임)시킨 상태에서 주말이나 야간의 정해진 시간 동안 전체 데이터를 일괄 전환하는 방식으로, 구조가 단순하고 비용이 적게 들지만 전환 실패 시 리스크가 큰 이관 전략은 무엇인가?",
    "answer": [
      "빅뱅 방식",
      "빅뱅 전환",
      "Big Bang"
    ],
    "explanation": "빅뱅(Big Bang) 전환 방식은 시스템 전체를 한 번에 전환하는 방식으로 소규모 시스템에 적합하며 다운타임이 발생합니다. (반대는 단계적 전환 방식)",
    "difficulty": "MEDIUM",
    "keywords": [
      "빅뱅 방식",
      "Big Bang",
      "데이터전환전략"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_DEV_022",
    "subject": "데이터베이스구축",
    "category": "데이터 전환 및 이관",
    "subCategory": "데이터 이관 전략",
    "type": "SHORT_ANSWER",
    "question": "기존 시스템과 신규 시스템을 일정 기간 동안 동시에 병행 운영하면서, 업무 영역이나 모듈별로 데이터를 점진적으로 전환하여 리스크를 최소화하지만 유지비용이 많이 드는 이관 전략은 무엇인가?",
    "answer": [
      "단계적 전환",
      "단계적 방식",
      "점진적 전환"
    ],
    "explanation": "단계적 전환 방식(Phased Approach)은 대규모 미션 크리티컬 시스템에서 무중단 전환과 위험 분산을 위해 채택됩니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "단계적 전환",
      "점진적 전환",
      "데이터이관"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_DEV_023",
    "subject": "정보시스템구축관리",
    "category": "서버 프로그램 구현",
    "subCategory": "배치 프로그램 특성",
    "type": "SHORT_ANSWER",
    "question": "배치(Batch) 프로그램의 5대 요건 중, 사용자의 개입(사용자 입력 대기 등) 없이 정해진 시각이나 조건에 따라 시스템 스스로 자동으로 시작되고 완료되어야 함을 뜻하는 요건은 무엇인가?",
    "answer": [
      "자동화",
      "Automation"
    ],
    "explanation": "배치 프로그램은 심야 시간대나 정기 스케줄에 사람의 수작업 개입 없이 무인 실행되어야 하므로 자동화가 필수입니다.",
    "difficulty": "EASY",
    "keywords": [
      "자동화",
      "Automation",
      "배치요건"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_DEV_024",
    "subject": "정보시스템구축관리",
    "category": "개발환경 구축",
    "subCategory": "형상관리(SCM)",
    "type": "SHORT_ANSWER",
    "question": "형상관리의 기준이 되는 시점으로, 소프트웨어 개발 생명주기의 특정 단계(요구분석, 설계 등)가 공식적으로 검토되고 승인되어 이후의 변경을 엄격히 통제하기 위한 기준선을 무엇이라 하는가?",
    "answer": [
      "기준선",
      "베이스라인",
      "Baseline"
    ],
    "explanation": "베이스라인(Baseline, 기준선)은 공식적으로 승인된 형상 항목들의 집합으로, 변경 제어 위원회(CCB)의 공식 승인을 통해서만 변경될 수 있습니다.",
    "difficulty": "EASY",
    "keywords": [
      "베이스라인",
      "기준선",
      "Baseline",
      "형상관리"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_UI_001",
    "subject": "소프트웨어설계",
    "category": "현행 시스템 분석",
    "subCategory": "분석 대상 및 고려사항",
    "type": "SHORT_ANSWER",
    "question": "신규 시스템을 개발하기 전 현행 시스템의 운영체제(OS)를 분석할 때 검토해야 하는 주요 고려사항 중, 장기간 시스템 운영 시 패치 및 정기 업그레이드 지원, 오픈소스 커뮤니티나 벤더사의 지원 가능 여부를 평가하는 항목은 무엇인가?",
    "answer": [
      "기술 지원",
      "기술지원",
      "기술 지원 여부"
    ],
    "explanation": "운영체제 및 DBMS 도입 분석 시 핵심 고려사항은 신뢰도(가용성), 성능, 기술 지원, 구축 및 라이선스 비용, 주변 기기 지원 여부입니다.",
    "difficulty": "EASY",
    "keywords": [
      "기술지원",
      "운영체제분석",
      "현행시스템분석"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_UI_002",
    "subject": "소프트웨어설계",
    "category": "현행 시스템 분석",
    "subCategory": "분석 절차",
    "type": "SHORT_ANSWER",
    "question": "현행 시스템 파악 절차는 총 3단계로 진행된다. 1단계(시스템 구성, 기능, 인터페이스 파악)와 3단계(하드웨어 및 네트워크 구성 파악) 사이의 [2단계]에서 파악해야 하는 대상 2가지는 무엇인가?",
    "answer": [
      "아키텍처, 소프트웨어",
      "아키텍처 및 소프트웨어",
      "아키텍처, 소프트웨어 구성"
    ],
    "explanation": "현행 시스템 파악 절차는 1단계(시스템 구성/기능/인터페이스) → 2단계(아키텍처/소프트웨어 구성) → 3단계(하드웨어/네트워크 구성) 순입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "현행시스템절차",
      "아키텍처",
      "소프트웨어구성"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_UI_003",
    "subject": "소프트웨어설계",
    "category": "현행 시스템 분석",
    "subCategory": "DBMS 분석 고려사항",
    "type": "SHORT_ANSWER",
    "question": "현행 시스템의 DBMS 분석 시, 24시간 365일 무중단 서비스가 요구되는 환경에서 장애 발생 시 백업 및 이중화(Clustering)를 통해 서비스 다운타임을 최소화할 수 있는 능력을 평가하는 핵심 지표는 무엇인가?",
    "answer": [
      "가용성",
      "신뢰도",
      "가용성(Availability)"
    ],
    "explanation": "DBMS 분석의 가용성(Availability/신뢰도)은 고가용성(HA, High Availability) 솔루션 및 데이터 복제 기능을 평가합니다.",
    "difficulty": "EASY",
    "keywords": [
      "가용성",
      "신뢰도",
      "DBMS분석"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_UI_004",
    "subject": "소프트웨어설계",
    "category": "화면 설계",
    "subCategory": "UI 설계 도구 비교",
    "type": "SHORT_ANSWER",
    "question": "기획 초기 단계에서 페이지의 세부 디자인(색상, 폰트, 그래픽)을 배제하고, 레이아웃과 정보의 뼈대(구조)만을 선과 박스로 간단히 스케치하여 화면 구성을 협의하는 도구를 무엇이라 하는가?",
    "answer": [
      "와이어프레임",
      "Wireframe"
    ],
    "explanation": "와이어프레임(Wireframe)은 시각적 그래픽 요소를 최소화하고 화면의 정보 구조와 레이아웃 골격만을 빠르게 기획하는 도구입니다.",
    "difficulty": "EASY",
    "keywords": [
      "와이어프레임",
      "Wireframe",
      "UI레이아웃"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_UI_005",
    "subject": "소프트웨어설계",
    "category": "화면 설계",
    "subCategory": "UI 설계 도구 비교",
    "type": "SHORT_ANSWER",
    "question": "와이어프레임보다 발전하여 실제 완성될 화면과 동일하게 색상, 타이포그래피, 로고, 아이콘 등의 시각적 그래픽 디자인을 정적으로 완성한 정적 결과물을 무엇이라 하는가? (동작/인터랙션은 포함되지 않음)",
    "answer": [
      "목업",
      "Mockup",
      "목업(Mockup)"
    ],
    "explanation": "목업(Mockup)은 실제 제품의 시각적 형태를 충실하게 보여주는 정적인 비기능적 디자인 산출물입니다.",
    "difficulty": "EASY",
    "keywords": [
      "목업",
      "Mockup",
      "UI디자인"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_UI_006",
    "subject": "소프트웨어설계",
    "category": "화면 설계",
    "subCategory": "UI 설계 도구 비교",
    "type": "SHORT_ANSWER",
    "question": "와이어프레임 화면 레이아웃과 함께 각 UI 컴포넌트의 기능 정의, 이벤트 처리 방식, 화면 간 전환 흐름, 예외 처리 로직을 개발자가 구현할 수 있도록 상세히 명세한 최종 기획 산출물은 무엇인가?",
    "answer": [
      "스토리보드",
      "Storyboard"
    ],
    "explanation": "스토리보드(Storyboard)는 디자이너와 개발자가 화면을 보고 그대로 구현할 수 있도록 화면 설계와 기능 명세를 완전하게 결합한 문서입니다.",
    "difficulty": "EASY",
    "keywords": [
      "스토리보드",
      "Storyboard",
      "기능명세"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_UI_007",
    "subject": "소프트웨어설계",
    "category": "화면 설계",
    "subCategory": "UI 설계 도구 비교",
    "type": "SHORT_ANSWER",
    "question": "정적 화면에 버튼 클릭, 화면 전환, 애니메이션 등의 인터랙션을 실제로 적용하여 사용자가 직접 조작하고 사용성을 검증해 볼 수 있도록 동적으로 제작된 시제품을 무엇이라 하는가?",
    "answer": [
      "프로토타입",
      "Prototype"
    ],
    "explanation": "프로토타입(Prototype)은 사용자와 이해관계자가 실제 앱처럼 인터랙션을 테스트하고 피드백을 신속히 얻기 위해 제작되는 동적 모델입니다.",
    "difficulty": "EASY",
    "keywords": [
      "프로토타입",
      "Prototype",
      "인터랙션"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_UI_010",
    "subject": "소프트웨어설계",
    "category": "화면 설계",
    "subCategory": "UI 설계 4대 원칙",
    "type": "SHORT_ANSWER",
    "question": "UI 설계 4대 원칙 중, 사용자의 다양한 개인적 요구사항을 수용할 수 있고, 사용자가 실수(오작동)를 저지르더라도 이를 되돌리거나(Undo) 오류를 쉽게 복구할 수 있도록 최대한 지원해야 한다는 원칙은 무엇인가?",
    "answer": [
      "유연성",
      "Flexibility"
    ],
    "explanation": "유연성(Flexibility)은 사용자의 인터랙션 취향을 포용하고 사용자의 실수를 안전하게 방어 및 복구해 주는 원칙입니다.",
    "difficulty": "EASY",
    "keywords": [
      "유연성",
      "UI4대원칙",
      "Flexibility"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_UI_011",
    "subject": "소프트웨어설계",
    "category": "화면 설계",
    "subCategory": "UI 설계 4대 원칙",
    "type": "SHORT_ANSWER",
    "question": "UI 설계 4대 원칙 중, 사용자가 처음 접하는 복잡한 시스템이라 할지라도 누구나 쉽고 빠르게 사용 방법을 익힐 수 있도록 설계해야 함을 의미하는 원칙은 무엇인가?",
    "answer": [
      "학습성",
      "Learnability"
    ],
    "explanation": "학습성(Learnability)은 사용자가 사용법을 쉽게 배울 수 있도록 표준화된 규칙과 가이드를 제공해야 한다는 원칙입니다.",
    "difficulty": "EASY",
    "keywords": [
      "학습성",
      "UI4대원칙",
      "Learnability"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_UI_012",
    "subject": "소프트웨어설계",
    "category": "화면 설계",
    "subCategory": "사용자 모델링",
    "type": "SHORT_ANSWER",
    "question": "사용자 중심 디자인(UCD)에서 실제 사용자의 인터뷰와 행동 패턴 데이터를 기반으로, 시스템을 사용할 대표적인 전형적 가상 인물을 설정하여 목표와 요구를 구체화하는 기법을 무엇이라 하는가?",
    "answer": [
      "페르소나",
      "Persona",
      "페르소나 기법"
    ],
    "explanation": "페르소나(Persona)는 목표 사용자의 인구통계학적 특성, 동기, 고충(Pain Point)을 가진 가상의 인격체를 만들어 디자인의 방향성을 잡는 기법입니다.",
    "difficulty": "EASY",
    "keywords": [
      "페르소나",
      "Persona",
      "사용자중심디자인"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_UI_013",
    "subject": "소프트웨어설계",
    "category": "화면 설계",
    "subCategory": "사용성 평가",
    "type": "SHORT_ANSWER",
    "question": "사용성 전문가들이 야콥 닐슨(Jakob Nielsen)이 정립한 10가지 사용성 원칙(가이드라인)을 기준으로 시스템의 UI를 직접 점검하고 발견된 문제점을 평가하는 사용성 평가 기법은 무엇인가?",
    "answer": [
      "휴리스틱 평가",
      "휴리스틱",
      "Heuristic Evaluation"
    ],
    "explanation": "휴리스틱 평가(Heuristic Evaluation)는 적은 수의 전문가가 정형화된 사용성 원칙 체크리스트를 기반으로 UI의 결함을 빠르게 찾아내는 정성적 평가법입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "휴리스틱 평가",
      "Heuristic Evaluation",
      "사용성평가"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_UI_014",
    "subject": "소프트웨어설계",
    "category": "화면 설계",
    "subCategory": "웹 표준 및 접근성",
    "type": "SHORT_ANSWER",
    "question": "시각 장애인, 지체 장애인, 고령자 등 신체적·환경적 제약이 있는 사용자라도 비장애인과 동등하게 웹 사이트의 모든 정보에 접근하고 이용할 수 있도록 보장하는 개념을 무엇이라 하는가?",
    "answer": [
      "웹 접근성",
      "Web Accessibility"
    ],
    "explanation": "웹 접근성(Web Accessibility)은 스크린 리더 지원(대체 텍스트 제공), 키보드만으로 조작 가능, 깜빡임 방지 등의 지침을 준수하는 것을 의미합니다.",
    "difficulty": "EASY",
    "keywords": [
      "웹 접근성",
      "Web Accessibility",
      "장애인접근성"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_UI_015",
    "subject": "소프트웨어설계",
    "category": "화면 설계",
    "subCategory": "웹 표준 및 접근성",
    "type": "SHORT_ANSWER",
    "question": "HTML 문서에서 이미지 태그(<img>)에 시각 장애인을 위한 스크린 리더 프로그램이 해당 이미지의 내용을 음성으로 읽어줄 수 있도록 작성해야 하는 필수 속성의 이름은 무엇인가?",
    "answer": [
      "alt",
      "alt 속성"
    ],
    "explanation": "alt(Alternative text) 속성은 이미지를 볼 수 없는 사용자와 이미지 로딩 실패 시 표시할 대체 텍스트를 제공합니다.",
    "difficulty": "EASY",
    "keywords": [
      "alt",
      "대체텍스트",
      "웹접근성"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_UI_016",
    "subject": "소프트웨어설계",
    "category": "화면 설계",
    "subCategory": "UI 인터랙션 패턴",
    "type": "SHORT_ANSWER",
    "question": "웹 및 모바일 화면에서 기존 배경 페이지를 어둡게 처리하여 비활성화시키고, 최상단에 팝업창을 띄워 사용자가 해당 창을 닫거나 응답하기 전에는 기존 화면과 상호작용할 수 없도록 강제하는 대화상자 형태는 무엇인가?",
    "answer": [
      "모달",
      "모달창",
      "Modal",
      "Modal Dialog"
    ],
    "explanation": "모달(Modal) 창은 사용자의 즉각적인 확인이나 중요한 입력을 요구할 때 배경과의 상호작용을 차단합니다. (배경을 조작할 수 있는 것은 모달리스/Modeless)",
    "difficulty": "EASY",
    "keywords": [
      "모달",
      "Modal",
      "대화상자"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_UI_017",
    "subject": "소프트웨어설계",
    "category": "화면 설계",
    "subCategory": "내비게이션 구조",
    "type": "SHORT_ANSWER",
    "question": "전자상거래 사이트 등 복잡한 계층 구조를 가진 웹사이트에서 [ 홈 > 대분류 > 중분류 > 현재 상품명 ]과 같이 현재 페이지의 위치 경로를 시각적으로 보여주어 상위 경로로 쉽게 이동할 수 있게 해주는 내비게이션 요소를 무엇이라 하는가?",
    "answer": [
      "브레드크럼",
      "Breadcrumb",
      "브레드크럼즈"
    ],
    "explanation": "브레드크럼(Breadcrumb, 빵부스러기)은 헨젤과 그레텔 동화에서 유래한 내비게이션 UI로 사이트 내 위치 파악을 돕습니다.",
    "difficulty": "EASY",
    "keywords": [
      "브레드크럼",
      "Breadcrumb",
      "내비게이션"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_UI_018",
    "subject": "소프트웨어설계",
    "category": "화면 설계",
    "subCategory": "반응형 웹 디자인",
    "type": "SHORT_ANSWER",
    "question": "하나의 웹 소스코드로 데스크톱 PC, 태블릿, 스마트폰 등 다양한 기기의 화면 크기(해상도)에 맞추어 레이아웃과 폰트 크기가 자동으로 유연하게 변환되도록 구현하는 웹 디자인 기법은 무엇인가?",
    "answer": [
      "반응형 웹",
      "반응형 웹 디자인",
      "Responsive Web"
    ],
    "explanation": "반응형 웹(Responsive Web)은 CSS 미디어 쿼리(Media Query)와 유동형 그리드(Fluid Grid)를 기반으로 다중 디바이스를 지원합니다.",
    "difficulty": "EASY",
    "keywords": [
      "반응형 웹",
      "Responsive Web",
      "미디어쿼리"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_UI_019",
    "subject": "소프트웨어설계",
    "category": "화면 설계",
    "subCategory": "UI 설계 스타일",
    "type": "SHORT_ANSWER",
    "question": "과거 스마트폰 초기에 실제 아날로그 사물(가죽 수첩, 책장, 계산기 질감)의 외형과 질감을 사실적으로 모사하여 디지털 인터페이스에 표현했던 시각 디자인 기법은 무엇인가?",
    "answer": [
      "스큐어모피즘",
      "Skeuomorphism",
      "스큐어모피즘(Skeuomorphism)"
    ],
    "explanation": "스큐어모피즘(Skeuomorphism)은 현실 사물의 질감을 모방하여 직관성을 높였으나, 점차 미니멀한 플랫 디자인(Flat Design)과 머티리얼 디자인으로 진화했습니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "스큐어모피즘",
      "Skeuomorphism",
      "플랫디자인"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_UI_020",
    "subject": "소프트웨어설계",
    "category": "화면 설계",
    "subCategory": "UI 인터랙션 설계 원칙",
    "type": "SHORT_ANSWER",
    "question": "사용자가 UI 버튼을 클릭하거나 폼을 제출했을 때, 시스템이 현재 요청을 처리 중임을 시각적/청각적으로 즉각 알려주어야 한다는 인터랙션 설계 원칙을 무엇이라 하는가?",
    "answer": [
      "피드백",
      "피드백 제공",
      "시스템 피드백",
      "Feedback"
    ],
    "explanation": "피드백(Feedback)은 사용자의 입력에 대해 로딩 스피너, 프로그레스 바, 사운드 등으로 시스템의 상태 변화를 인지시켜 불안감을 해소합니다.",
    "difficulty": "EASY",
    "keywords": [
      "피드백",
      "Feedback",
      "인터랙션원칙"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SEC_001",
    "subject": "신기술/보안",
    "category": "시큐어 코딩",
    "subCategory": "SQL 인젝션 방어",
    "type": "SHORT_ANSWER",
    "question": "동적 SQL 생성 시 사용자 입력값으로 인한 SQL 삽입(SQL Injection) 공격을 원천 차단하기 위해, SQL 문장을 미리 데이터베이스에 컴파일해 두고 사용자 입력값을 위치 지정자(?)에 파라미터(바인드 변수)로만 안전하게 매핑하는 자바 인터페이스 객체는 무엇인가?",
    "answer": [
      "PreparedStatement",
      "프리페어드 스테이트먼트"
    ],
    "explanation": "PreparedStatement는 쿼리 구조를 사전에 컴파일하여 사용자 입력 문자열이 SQL 명령어나 연산자로 해석되는 것을 완벽히 방어합니다.",
    "difficulty": "EASY",
    "keywords": [
      "PreparedStatement",
      "바인드변수",
      "SQL인젝션방어"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SEC_002",
    "subject": "신기술/보안",
    "category": "시큐어 코딩",
    "subCategory": "크로스 사이트 스크립팅 방어",
    "type": "SHORT_ANSWER",
    "question": "XSS(Cross Site Scripting) 공격을 방지하기 위해 웹 브라우저가 스크립트 코드로 해석할 수 있는 위험한 특수문자(<, >, &, \", ' 등)를 &lt;, &gt;, &amp;, &quot;와 같은 안전한 대체 문자로 변환하는 보안 처리 기법을 무엇이라 하는가?",
    "answer": [
      "HTML 치환",
      "HTML 엔티티 변환",
      "HTML 인코딩",
      "HTML 이스케이프"
    ],
    "explanation": "HTML Entity Encoding(HTML 치환/인코딩)은 사용자가 입력한 악의적인 자바스크립트 태그가 브라우저에서 실행되지 않고 단순 텍스트로 안전하게 렌더링되도록 합니다.",
    "difficulty": "EASY",
    "keywords": [
      "HTML 치환",
      "HTML 인코딩",
      "XSS방어"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SEC_003",
    "subject": "신기술/보안",
    "category": "시큐어 코딩",
    "subCategory": "사이트 간 요청 위조 방어",
    "type": "SHORT_ANSWER",
    "question": "CSRF(Cross Site Request Forgery) 공격을 방어하기 위해, 사용자의 정상 요청 시 서버가 매 세션 또는 폼 요청마다 예측 불가능한 임의의 고유 난수 값을 생성하여 폼에 은닉(hidden) 필드로 심고, 요청 시 제출된 값과 세션 값을 비교 검증하는 보안 토큰 기법은 무엇인가?",
    "answer": [
      "CSRF 토큰",
      "CSRF Token",
      "안티 CSRF 토큰"
    ],
    "explanation": "CSRF 토큰은 공격자가 외부 피싱 사이트에서 피해자의 권한으로 변조된 위조 요청을 보내더라도 토큰 값을 알 수 없어 서버에서 차단되도록 방어합니다.",
    "difficulty": "EASY",
    "keywords": [
      "CSRF 토큰",
      "CSRF방어",
      "보안토큰"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SEC_004",
    "subject": "신기술/보안",
    "category": "시큐어 코딩",
    "subCategory": "시간 및 상태 취약점",
    "type": "SHORT_ANSWER",
    "question": "자원을 검사하는 시점(Time of Check)과 해당 자원을 실제로 사용하는 시점(Time of Use) 사이에 시간 차이가 발생하여, 공격자가 권한 검사 통과 후 실제 접근 전 사이에 파일 심볼릭 링크나 내용을 바꿔치기하는 취약점을 뜻하는 영문 약어는 무엇인가?",
    "answer": [
      "TOCTOU",
      "Time of Check to Time of Use"
    ],
    "explanation": "TOCTOU는 멀티스레드나 파일 I/O 환경에서 동기화 락(Lock) 없이 검사 시점과 사용 시점 사이에 발생하는 대표적인 레이스 컨디션 취약점입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "TOCTOU",
      "경쟁상태",
      "시간상태취약점"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SEC_005",
    "subject": "신기술/보안",
    "category": "시큐어 코딩",
    "subCategory": "메모리 보안 취약점",
    "type": "SHORT_ANSWER",
    "question": "C언어에서 메모리 동적 할당(malloc) 후 free() 함수로 반환된 메모리 포인터를 해제한 뒤에도 NULL로 초기화하지 않고 계속 참조하거나 재사용할 때 발생하는 치명적인 메모리 보안 취약점의 영문 명칭은 무엇인가?",
    "answer": [
      "Use-After-Free",
      "UAF",
      "해제된 메모리 재참조"
    ],
    "explanation": "UAF(Use After Free) 취약점은 해제된 힙 메모리 영역에 공격자가 악의적인 코드를 덮어씌워 임의 코드 실행 권한을 획득하게 만듭니다.",
    "difficulty": "HARD",
    "keywords": [
      "Use-After-Free",
      "UAF",
      "메모리취약점"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SEC_006",
    "subject": "신기술/보안",
    "category": "시큐어 코딩",
    "subCategory": "메모리 보안 취약점",
    "type": "SHORT_ANSWER",
    "question": "C언어의 문자열 복사 함수 중 버퍼 오버플로우 취약점을 유발하는 보안상 위험한 strcpy(), strcat() 대신, 복사할 최대 버퍼 크기(N)를 세 번째 인자로 명시하여 메모리 경계를 넘지 않도록 제한하는 안전한 함수는 무엇인가?",
    "answer": [
      "strncpy",
      "strncpy()"
    ],
    "explanation": "strncpy() 및 strncat()은 지정한 바이트 수(n)만큼만 복사하여 할당된 대상 버퍼를 초과하는 스택 버퍼 오버플로우를 예방합니다.",
    "difficulty": "EASY",
    "keywords": [
      "strncpy",
      "버퍼오버플로우방어",
      "안전한문자열함수"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SEC_007",
    "subject": "신기술/보안",
    "category": "시큐어 코딩",
    "subCategory": "코드 오류 취약점",
    "type": "SHORT_ANSWER",
    "question": "객체가 메모리상에 생성되지 않았거나 참조 대상이 존재하지 않는 포인터 변수(null)의 메소드나 멤버 필드에 접근하려 할 때 발생하며, 비정상적인 프로그램 강제 종료를 유발하는 대표적인 예외(Exception) 결함은 무엇인가?",
    "answer": [
      "Null Pointer 역참조",
      "Null Pointer Dereference",
      "널 포인터 역참조",
      "NullPointerException"
    ],
    "explanation": "Null Pointer 역참조는 객체 사용 전 null 체크(if (obj != null))를 누락했을 때 발생하며 서비스 거부(DoS) 상태를 유발합니다.",
    "difficulty": "EASY",
    "keywords": [
      "Null Pointer 역참조",
      "NullPointerException",
      "코드오류"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SEC_008",
    "subject": "신기술/보안",
    "category": "시큐어 코딩",
    "subCategory": "입력데이터 검증",
    "type": "SHORT_ANSWER",
    "question": "printf(str); 과 같이 검증되지 않은 외부 사용자 입력 문자열을 포맷 제어 문자 지정 없이 출력 함수의 첫 번째 인자로 직접 전달했을 때, %x, %n 등의 변환 지정자를 악용하여 메모리 내용을 유출하거나 변조하는 공격은 무엇인가?",
    "answer": [
      "포맷 스트링 공격",
      "포맷 스트링 취약점",
      "Format String Attack"
    ],
    "explanation": "포맷 스트링(Format String) 취약점은 printf(\"%s\", str); 처럼 포맷 지정자를 명시하지 않고 사용자 입력을 포맷 스트링 자체로 사용할 때 발생합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "포맷 스트링",
      "Format String",
      "printf"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SEC_009",
    "subject": "신기술/보안",
    "category": "시큐어 코딩",
    "subCategory": "보안 기능",
    "type": "SHORT_ANSWER",
    "question": "비밀번호를 일방향 해시 함수로 암호화할 때, 레인보우 테이블(Rainbow Table)을 이용한 역추적 사전 공격을 무력화하기 위해 원본 비밀번호에 임의의 고유한 난수 문자열을 덧붙여 해싱하는 기법을 무엇이라 하는가?",
    "answer": [
      "솔트",
      "솔팅",
      "Salt",
      "Salting"
    ],
    "explanation": "솔트(Salt)는 해시 생성 전 비밀번호 뒤에 무작위 문자열을 붙여 동일한 비밀번호라도 완전히 다른 해시값이 생성되도록 보장합니다.",
    "difficulty": "EASY",
    "keywords": [
      "솔트",
      "솔팅",
      "Salt",
      "레인보우테이블방어"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SEC_010",
    "subject": "신기술/보안",
    "category": "시큐어 코딩",
    "subCategory": "자원 관리",
    "type": "SHORT_ANSWER",
    "question": "파일, 데이터베이스 커넥션, 네트워크 소켓 등의 시스템 자원을 열어 사용한 후 예외 발생이나 프로그램 종료 시 명시적으로 close()하여 시스템 자원의 고갈을 방지하지 못했을 때 발생하는 결함은 무엇인가?",
    "answer": [
      "자원 누수",
      "메모리 누수",
      "자원 누출",
      "Resource Leak"
    ],
    "explanation": "자원 누수(Resource Leak)는 파일 핸들이나 DB 커넥션 풀을 반환하지 않아 시스템 자원이 점진적으로 고갈되는 결함으로, try-with-resources나 finally 블록으로 방어합니다.",
    "difficulty": "EASY",
    "keywords": [
      "자원 누수",
      "Resource Leak",
      "메모리누수"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SEC_011",
    "subject": "신기술/보안",
    "category": "시큐어 코딩",
    "subCategory": "입력데이터 검증",
    "type": "SHORT_ANSWER",
    "question": "웹 파일 다운로드 기능에서 사용자 입력 경로에 [ ../ ] 또는 [ ..\\ ]와 같은 상위 디렉터리 이동 특수문자를 삽입하여 웹 루트 경로를 벗어나 서버의 민감한 시스템 파일(/etc/passwd 등)을 무단 조회하는 공격은 무엇인가?",
    "answer": [
      "경로 조작",
      "경로 순회",
      "디렉터리 순회",
      "Path Traversal",
      "Directory Traversal"
    ],
    "explanation": "경로 순회(Directory Traversal / Path Traversal)는 파일 경로에 상위 디렉터리 참조 문자(../)를 필터링하지 않았을 때 서버의 임의 파일을 열람당하는 취약점입니다.",
    "difficulty": "EASY",
    "keywords": [
      "경로 조작",
      "경로 순회",
      "디렉터리순회",
      "Path Traversal"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SEC_012",
    "subject": "신기술/보안",
    "category": "시큐어 코딩",
    "subCategory": "메모리 보안 취약점",
    "type": "SHORT_ANSWER",
    "question": "정수형 변수에 할당 가능한 최댓값을 초과하는 연산 결과를 저장하려 할 때, 비트 부호가 반전되어 매우 작은 음수 값이 되거나 최소 한계값으로 순환(Wrap around)되어 메모리 할당 크기 검증을 우회하게 만드는 결함은 무엇인가?",
    "answer": [
      "정수 오버플로우",
      "Integer Overflow"
    ],
    "explanation": "정수 오버플로우(Integer Overflow)는 큰 양수가 음수로 변하거나 0에 가까운 값으로 축소되어 버퍼 크기 검사를 무력화시킵니다.",
    "difficulty": "EASY",
    "keywords": [
      "정수 오버플로우",
      "Integer Overflow",
      "메모리결함"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SEC_013",
    "subject": "신기술/보안",
    "category": "시큐어 코딩",
    "subCategory": "보안 기능",
    "type": "SHORT_ANSWER",
    "question": "암호화 키, 세션 ID, 비밀번호 솔트 생성 시 표준 `java.util.Random`처럼 시드값이 예측 가능한 의사난수 대신, 운영체제의 엔트로피 풀을 사용하여 암호학적으로 예측 불가능한 안전한 난수를 생성하는 자바 클래스는 무엇인가?",
    "answer": [
      "SecureRandom"
    ],
    "explanation": "시큐어 코딩에서는 시퀀스가 쉽게 추측되는 일반 난수 발생기 대신 암호학적으로 안전한 SecureRandom 클래스를 사용할 것을 의무화합니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "SecureRandom",
      "안전한난수",
      "난수발생기"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SEC_014",
    "subject": "신기술/보안",
    "category": "시큐어 코딩",
    "subCategory": "에러 처리 취약점",
    "type": "SHORT_ANSWER",
    "question": "서버 애플리케이션에서 예외나 에러가 발생했을 때, 에러 로그와 스택 트레이스(Stack Trace), 데이터베이스 쿼리 에러 메시지를 사용자의 웹 브라우저 화면에 그대로 노출함으로써 내부 시스템 구조와 DB 테이블 정보를 공격자에게 노출시키는 취약점은 무엇인가?",
    "answer": [
      "오류 메시지 정보 노출",
      "정보 노출",
      "오류 정보 노출"
    ],
    "explanation": "오류 메시지를 통해 DB 구조, 프레임워크 버전, 파일 절대 경로가 노출되면 2차 공격의 빌미가 되므로 사용자에게는 일반적인 안내 페이지를 보여주어야 합니다.",
    "difficulty": "EASY",
    "keywords": [
      "오류 메시지 정보 노출",
      "스택트레이스",
      "에러처리"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SEC_015",
    "subject": "신기술/보안",
    "category": "시큐어 코딩",
    "subCategory": "보안 기능",
    "type": "SHORT_ANSWER",
    "question": "소스코드 내부에 데이터베이스 접속 비밀번호나 암호화 대칭키 값을 직접 평문 문자열 상수로 하드코딩(Hardcoding)해 두었을 때, 소스코드 유출 시 전체 시스템이 장악당하는 취약점을 방지하기 위한 안전한 키 관리 방식은 무엇인가?",
    "answer": [
      "환경 변수",
      "환경 변수 설정",
      "외부 설정 파일",
      "키 관리 시스템"
    ],
    "explanation": "패스워드와 시크릿 키는 소스코드에 하드코딩하지 않고 환경 변수(Environment Variables)나 암호화된 외부 설정 파일/KMS에 분리 보관해야 합니다.",
    "difficulty": "EASY",
    "keywords": [
      "환경 변수",
      "하드코딩방지",
      "키관리"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SEC_016",
    "subject": "신기술/보안",
    "category": "시큐어 코딩",
    "subCategory": "캡슐화 취약점",
    "type": "SHORT_ANSWER",
    "question": "객체지향 설계에서 클래스 내부의 중요한 멤버 변수를 private으로 선언하더라도, 외부에서 호출하는 Getter 메소드가 객체 내부의 가변 배열(Array) 참조값을 그대로 반환할 때 외부에서 배열 내용을 직접 변조할 수 있는 취약점을 방어하기 위한 안전한 반환 기법은 무엇인가?",
    "answer": [
      "방어적 복사",
      "복사본 반환",
      "Defensive Copy"
    ],
    "explanation": "방어적 복사(Defensive Copying)는 내부 가변 객체를 외부에 전달할 때 원본 참조가 아닌 clone()이나 새로운 복사본을 만들어 반환하는 시큐어 코딩 기법입니다.",
    "difficulty": "HARD",
    "keywords": [
      "방어적 복사",
      "Defensive Copy",
      "캡슐화"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SEC_017",
    "subject": "신기술/보안",
    "category": "SW개발 보안 설계",
    "subCategory": "보안 메커니즘",
    "type": "SHORT_ANSWER",
    "question": "사용자 또는 주체(Subject)가 정보 시스템에 자신이라고 주장하는 식별자(ID)를 제시하고, 암호나 생체 정보를 통해 본인이 맞는지 그 신원을 증명하는 보안 통제 단계를 무엇이라 하는가?",
    "answer": [
      "인증",
      "Authentication",
      "사용자 인증"
    ],
    "explanation": "인증(Authentication)은 신원 확인 단계이며, 인증된 사용자에게 자원에 대한 접근 권한을 부여하는 단계는 인가(Authorization)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "인증",
      "Authentication",
      "보안3A"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SEC_018",
    "subject": "신기술/보안",
    "category": "SW개발 보안 설계",
    "subCategory": "보안 메커니즘",
    "type": "SHORT_ANSWER",
    "question": "인증된 주체가 시스템의 특정 파일이나 디렉터리, 기능 등 보호된 리소스에 대해 접근할 수 있는 권한이 있는지 확인하고 실행 허가를 내리는 보안 통제 단계를 무엇이라 하는가?",
    "answer": [
      "인가",
      "권한 부여",
      "Authorization"
    ],
    "explanation": "인가(Authorization)는 특정 자원에 대한 접근 권한 부여 단계로, 접근통제 정책(DAC, MAC, RBAC 등)에 따라 결정됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "인가",
      "Authorization",
      "권한부여"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SEC_019",
    "subject": "신기술/보안",
    "category": "시큐어 코딩",
    "subCategory": "입력데이터 검증",
    "type": "SHORT_ANSWER",
    "question": "서버 측 입력값 검증 방식 중, 위험한 문자나 금지어 목록을 정의하여 차단하는 블랙리스트(Blacklist) 방식에 비해, 허용 가능한 안전한 문자 형식과 길이 규칙만을 명시하여 그 외의 모든 입력을 거부하는 훨씬 안전한 검증 방식은 무엇인가?",
    "answer": [
      "화이트리스트",
      "화이트리스트 방식",
      "Whitelist"
    ],
    "explanation": "화이트리스트(Whitelist) 검증은 새로운 우회 공격 패턴이 등장하더라도 허용 규칙 이외의 모든 값을 차단하므로 시큐어 코딩의 기본 권장 사항입니다.",
    "difficulty": "EASY",
    "keywords": [
      "화이트리스트",
      "Whitelist",
      "입력값검증"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_SEC_020",
    "subject": "신기술/보안",
    "category": "시큐어 코딩",
    "subCategory": "세션 관리",
    "type": "SHORT_ANSWER",
    "question": "웹 브라우저의 쿠키(Cookie) 탈취를 방지하기 위해 설정하는 보안 플래그 중, 자바스크립트의 `document.cookie` 객체를 통한 쿠키 접근을 원천 차단하여 XSS 공격에 의한 세션 하이재킹을 방어하는 플래그 속성은 무엇인가?",
    "answer": [
      "HttpOnly",
      "HttpOnly 플래그"
    ],
    "explanation": "HttpOnly 쿠키 플래그는 브라우저 스크립트의 접근을 막아 쿠키 유출을 방어하며, 암호화 전송(HTTPS)을 강제하는 것은 Secure 플래그입니다.",
    "difficulty": "EASY",
    "keywords": [
      "HttpOnly",
      "쿠키보안",
      "세션하이재킹방어"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_TST_001",
    "subject": "소프트웨어설계",
    "category": "애플리케이션 테스트 관리",
    "subCategory": "화이트박스 테스트 커버리지",
    "type": "SHORT_ANSWER",
    "question": "화이트박스 테스트의 구조적 커버리지 중, 프로그램 내의 모든 개별 조건식의 참(True)/거짓(False) 결과와 무관하게, 전체 복합 조건식의 결과(결정 포인트)가 최소한 한 번씩 참과 거짓을 모두 수행하도록 보장하는 커버리지는 무엇인가?",
    "answer": [
      "결정 커버리지",
      "분기 커버리지",
      "Decision Coverage",
      "Branch Coverage"
    ],
    "explanation": "결정 커버리지(분기 커버리지)는 프로그램의 모든 조건문 분기 경로(True/False 방향)를 최소 한 번씩 실행합니다.",
    "difficulty": "EASY",
    "keywords": [
      "결정 커버리지",
      "분기 커버리지",
      "구조적커버리지"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_TST_002",
    "subject": "소프트웨어설계",
    "category": "애플리케이션 테스트 관리",
    "subCategory": "화이트박스 테스트 커버리지",
    "type": "SHORT_ANSWER",
    "question": "복합 조건식 전체의 결과와는 별개로, 조건식 내부에 포함된 각각의 개별 조건식(개별 명제)들이 독립적으로 최소한 한 번씩 참(True)과 거짓(False)의 결과를 갖도록 테스트 케이스를 설계하는 커버리지는 무엇인가?",
    "answer": [
      "조건 커버리지",
      "Condition Coverage"
    ],
    "explanation": "조건 커버리지(Condition Coverage)는 전체 결과와 무관하게 각 내부 개별 조건식이 참/거짓을 만족하는지 검증합니다.",
    "difficulty": "EASY",
    "keywords": [
      "조건 커버리지",
      "개별조건식",
      "화이트박스테스트"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_TST_003",
    "subject": "소프트웨어설계",
    "category": "애플리케이션 테스트 관리",
    "subCategory": "화이트박스 테스트 커버리지",
    "type": "SHORT_ANSWER",
    "question": "결정 커버리지와 조건 커버리지를 모두 만족하면서, 각 개별 조건식이 전체 복합 조건식의 결과에 독립적인 영향을 미치도록 설계하여 항공/국방 등 고신뢰성 임베디드 시스템에서 필수로 요구하는 커버리지의 약어는 무엇인가?",
    "answer": [
      "MC/DC",
      "MCDC",
      "변경 조건/결정 커버리지"
    ],
    "explanation": "MC/DC(Modified Condition/Decision Coverage)는 개별 조건식이 다른 조건식에 영향받지 않고 전체 결정을 변경할 수 있음을 검증하는 최고 수준의 커버리지입니다.",
    "difficulty": "HARD",
    "keywords": [
      "MC/DC",
      "MCDC",
      "변경조건결정커버리지"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_TST_005",
    "subject": "소프트웨어설계",
    "category": "애플리케이션 테스트 관리",
    "subCategory": "블랙박스 테스트 기법",
    "type": "SHORT_ANSWER",
    "question": "오류가 입력값의 중간보다 입력 조건의 최소값, 최대값, 경계 부근에서 집중적으로 발생한다는 점에 착안하여, 유효 범위의 바로 안쪽 값, 경계값, 바로 바깥쪽 값을 테스트 데이터로 선택하는 기법은 무엇인가?",
    "answer": [
      "경계값 분석",
      "경계값 분석 기법",
      "Boundary Value Analysis"
    ],
    "explanation": "경계값 분석(Boundary Value Analysis)은 등호 오류(<=, <)와 같은 오프바이원(Off-by-one) 결함을 찾아내는 가장 효과적인 블랙박스 기법입니다.",
    "difficulty": "EASY",
    "keywords": [
      "경계값 분석",
      "Boundary Value Analysis",
      "경계값"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_TST_006",
    "subject": "소프트웨어설계",
    "category": "애플리케이션 테스트 관리",
    "subCategory": "경험 기반 테스트 기법",
    "type": "SHORT_ANSWER",
    "question": "사전에 정형화된 테스트 케이스 문서를 작성하지 않고, 테스터의 직관과 경험에 기반하여 테스트 대상을 탐색하면서 동시에 테스트를 설계하고 실행하며 결함을 찾아내는 경험 기반 기법은 무엇인가?",
    "answer": [
      "탐색적 테스팅",
      "탐색적 테스트",
      "Exploratory Testing"
    ],
    "explanation": "탐색적 테스팅(Exploratory Testing)은 테스트 계획, 설계, 실행이 동시에 순환적으로 이루어지며 시간 제약이 있을 때 매우 유용합니다.",
    "difficulty": "EASY",
    "keywords": [
      "탐색적 테스팅",
      "Exploratory Testing",
      "경험기반테스트"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_TST_007",
    "subject": "소프트웨어설계",
    "category": "애플리케이션 성능 개선",
    "subCategory": "리팩터링",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어의 외부 동작(기능과 결과)은 전혀 변경하지 않으면서, 내부 코드의 가독성을 높이고 복잡도를 낮추어 유지보수성을 향상시키는 코드 구조 개선 활동을 무엇이라 하는가?",
    "answer": [
      "리팩터링",
      "Refactoring",
      "리팩토링"
    ],
    "explanation": "리팩터링(Refactoring)은 결함을 수정하거나 새로운 기능을 추가하는 것이 아니라, 클린 코드를 위해 코드의 가독성과 설계를 개선하는 작업입니다.",
    "difficulty": "EASY",
    "keywords": [
      "리팩터링",
      "Refactoring",
      "코드개선"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_TST_008",
    "subject": "소프트웨어설계",
    "category": "애플리케이션 성능 개선",
    "subCategory": "코드 스멜(Code Smell)",
    "type": "SHORT_ANSWER",
    "question": "마틴 파울러가 정의한 용어로, 당장 버그를 일으키지는 않지만 미래에 결함이나 유지보수 저하를 초래할 가능성이 높은 나쁜 냄새가 나는 잠재적 코드 결함 증상을 무엇이라 하는가?",
    "answer": [
      "코드 스멜",
      "Code Smell"
    ],
    "explanation": "코드 스멜(Code Smell)에는 중복 코드, 장황한 메소드(Long Method), 거대 클래스(Large Class), 산탄총 수술(Shotgun Surgery) 등이 있습니다.",
    "difficulty": "EASY",
    "keywords": [
      "코드 스멜",
      "Code Smell",
      "나쁜냄새"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_TST_009",
    "subject": "소프트웨어설계",
    "category": "애플리케이션 성능 개선",
    "subCategory": "코드 스멜 증상",
    "type": "SHORT_ANSWER",
    "question": "하나의 요구사항이나 작은 변경 사항이 발생했을 때, 여러 개의 클래스나 모듈에 걸쳐 자잘한 수정 작업을 동시에 수행해야 하는 코드 스멜 증상을 무엇이라 하는가?",
    "answer": [
      "산탄총 수술",
      "산탄총 수술(Shotgun Surgery)",
      "Shotgun Surgery"
    ],
    "explanation": "산탄총 수술(Shotgun Surgery)은 변경이 발생할 때 수많은 곳을 흩어져 수정해야 하는 응집도 부족 증상입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "산탄총 수술",
      "Shotgun Surgery",
      "코드스멜"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_TST_010",
    "subject": "소프트웨어설계",
    "category": "요구사항 확인 및 모델링",
    "subCategory": "UML 관계",
    "type": "SHORT_ANSWER",
    "question": "UML 관계 중 전체(Whole)와 부분(Part)의 관계를 나타내며, 전체 객체가 소멸하더라도 부분 객체는 독립적으로 생존할 수 있는 약한 결합 형태의 포함 관계는 무엇인가?",
    "answer": [
      "집약 관계",
      "집약",
      "집합 관계",
      "Aggregation"
    ],
    "explanation": "집약 관계(Aggregation)는 빈 마름모(◇)로 표현되며, 전체 객체와 부분 객체가 독립적인 생명주기를 갖습니다.",
    "difficulty": "EASY",
    "keywords": [
      "집약 관계",
      "Aggregation",
      "UML관계"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_TST_011",
    "subject": "소프트웨어설계",
    "category": "요구사항 확인 및 모델링",
    "subCategory": "UML 관계",
    "type": "SHORT_ANSWER",
    "question": "UML 관계 중 전체 객체와 부분 객체의 생명주기가 완전히 일치하여, 전체 객체가 소멸하면 부분 객체도 함께 소멸하는 강한 결합 형태의 포함 관계는 무엇인가?",
    "answer": [
      "합성 관계",
      "합성",
      "Composition"
    ],
    "explanation": "합성 관계(Composition)는 채워진 마름모(◆)로 표현되며, 부분 객체가 전체 객체에 종속되어 생명주기를 같이합니다.",
    "difficulty": "EASY",
    "keywords": [
      "합성 관계",
      "Composition",
      "UML관계"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_TST_012",
    "subject": "소프트웨어설계",
    "category": "요구사항 확인 및 모델링",
    "subCategory": "UML 관계",
    "type": "SHORT_ANSWER",
    "question": "UML 관계 중 하위 사물이 상위 사물의 특징(속성과 메서드)을 물려받아 구체화하는 관계로, 객체지향의 상속(Inheritance) 개념을 표현하는 관계는 무엇인가?",
    "answer": [
      "일반화 관계",
      "일반화",
      "Generalization"
    ],
    "explanation": "일반화 관계(Generalization)는 실선과 속이 빈 삼각형 화살표(▷)로 표시하며 \"is-a\" 상속 관계를 나타냅니다.",
    "difficulty": "EASY",
    "keywords": [
      "일반화 관계",
      "Generalization",
      "상속관계"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_TST_013",
    "subject": "소프트웨어설계",
    "category": "요구사항 확인 및 모델링",
    "subCategory": "UML 관계",
    "type": "SHORT_ANSWER",
    "question": "사물이 할 수 있는 행동(인터페이스)을 선언하고, 다른 사물이 그 선언된 행동을 실제로 구현(Implements)하여 완결하는 관계를 무엇이라 하는가?",
    "answer": [
      "실체화 관계",
      "실체화",
      "Realization"
    ],
    "explanation": "실체화 관계(Realization)는 점선과 속이 빈 삼각형 화살표(▷)로 표시하며 인터페이스와 구현 클래스 간의 관계입니다.",
    "difficulty": "EASY",
    "keywords": [
      "실체화 관계",
      "Realization",
      "인터페이스구현"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_TST_014",
    "subject": "소프트웨어설계",
    "category": "요구사항 확인 및 모델링",
    "subCategory": "UML 다이어그램 분류",
    "type": "SHORT_ANSWER",
    "question": "UML 다이어그램을 구조적(정적) 다이어그램과 행위적(동적) 다이어그램으로 나눌 때, 시스템의 컴포넌트 간 물리적 배치와 실행 하드웨어 노드(서버, 네트워크 장비) 구성을 표현하는 정적 다이어그램은 무엇인가?",
    "answer": [
      "배치 다이어그램",
      "배치",
      "Deployment Diagram"
    ],
    "explanation": "배치 다이어그램(Deployment Diagram)은 소프트웨어 모듈이 실제 어떤 물리적 컴퓨터(노드)에 할당되어 실행되는지 보여줍니다.",
    "difficulty": "EASY",
    "keywords": [
      "배치 다이어그램",
      "Deployment Diagram",
      "물리적배치"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_TST_015",
    "subject": "소프트웨어설계",
    "category": "애플리케이션 테스트 관리",
    "subCategory": "테스트 시각",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 개발이 완료된 후, 개발자의 시각에서 명세서대로 올바르게 구현되었는지 점검하는 검증(Verification)과 대조적으로, 사용자(고객)의 시각에서 올바른 소프트웨어가 구축되었는지(사용자 요구 만족)를 평가하는 개념을 무엇이라 하는가?",
    "answer": [
      "확인",
      "Validation"
    ],
    "explanation": "검증(Verification)은 \"규격서대로 잘 만들었는가(Are we building the product right?)\"이고, 확인(Validation)은 \"고객이 원하는 진짜 소프트웨어를 만들었는가(Are we building the right product?)\"입니다.",
    "difficulty": "EASY",
    "keywords": [
      "확인",
      "Validation",
      "검증과확인"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_TST_016",
    "subject": "소프트웨어설계",
    "category": "애플리케이션 테스트 관리",
    "subCategory": "테스트 오라클",
    "type": "SHORT_ANSWER",
    "question": "테스트 결과가 참인지 거짓인지를 판단하기 위해 사전에 정의된 참값을 제공하는 테스트 오라클 중, 모든 입력값에 대하여 기대하는 결과를 100% 완벽히 계산해 주는 가장 이상적인 오라클은 무엇인가?",
    "answer": [
      "참 오라클",
      "True Oracle"
    ],
    "explanation": "참 오라클(True Oracle)은 모든 입력에 대한 정답을 생성할 수 있는 오라클로, 주로 항공/미션 크리티컬 시스템에 적용됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "참 오라클",
      "True Oracle",
      "테스트오라클"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_TST_017",
    "subject": "소프트웨어설계",
    "category": "애플리케이션 테스트 관리",
    "subCategory": "테스트 오라클",
    "type": "SHORT_ANSWER",
    "question": "모든 입력에 대한 결과를 산출할 수 없어 특정 주요 입력값(특수값, 경계값 등)에 대해서만 정확한 결과를 확인하고 나머지는 추정하는 실용적인 오라클은 무엇인가?",
    "answer": [
      "샘플링 오라클",
      "Sampling Oracle"
    ],
    "explanation": "샘플링 오라클(Sampling Oracle)은 전수 검사가 불가능할 때 대표적인 표본 입력값에 대해서만 결과를 검증하는 오라클입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "샘플링 오라클",
      "Sampling Oracle",
      "테스트오라클"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_TST_018",
    "subject": "소프트웨어설계",
    "category": "애플리케이션 테스트 관리",
    "subCategory": "테스트 하네스 구성요소",
    "type": "SHORT_ANSWER",
    "question": "상향식 통합 테스트에서 하위 모듈은 이미 구현되어 있으나 상위 모듈이 아직 개발되지 않았을 때, 하위 모듈을 호출하고 매개변수를 전달하여 결과를 확인하기 위해 임시로 작성하는 상위 가상 모듈은 무엇인가?",
    "answer": [
      "테스트 드라이버",
      "드라이버",
      "Test Driver"
    ],
    "explanation": "테스트 드라이버(Test Driver)는 상위 모듈 역할을 대행하는 테스트 도구이며, 반대로 하위 모듈 역할을 대행하는 것은 테스트 스텁(Test Stub)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "테스트 드라이버",
      "Test Driver",
      "상향식통합"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_TST_019",
    "subject": "소프트웨어설계",
    "category": "애플리케이션 성능 개선",
    "subCategory": "클린 코드 원칙",
    "type": "SHORT_ANSWER",
    "question": "클린 코드(Clean Code) 작성 원칙 중, 코드 내부에 중복된 로직이나 동일한 표현식을 제거하고 공통 메소드로 추출하여 중복을 없애야 한다는 원칙은 무엇인가?",
    "answer": [
      "중복 최소화",
      "중복 배제",
      "중복의 최소화"
    ],
    "explanation": "클린 코드의 5대 원칙은 가독성, 단순성, 의존성 배제, 중복 최소화, 추상화입니다.",
    "difficulty": "EASY",
    "keywords": [
      "중복 최소화",
      "클린코드",
      "중복배제"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_TST_020",
    "subject": "소프트웨어설계",
    "category": "애플리케이션 성능 개선",
    "subCategory": "소스코드 품질 분석 도구",
    "type": "SHORT_ANSWER",
    "question": "소스코드를 직접 실행하지 않고 코딩 표준 준수 여부, 잠재적 결함, 보안 취약점, 복잡도 등을 소스코드 텍스트 구조 분석을 통해 검사하는 분석 도구(예: SonarQube, PMD, Checkstyle)를 무엇이라 하는가?",
    "answer": [
      "정적 분석 도구",
      "정적 분석",
      "정적 테스팅 도구",
      "Static Analysis"
    ],
    "explanation": "정적 분석 도구(Static Code Analysis)는 컴파일이나 실행 없이 소스코드를 파싱하여 버그와 보안 결함을 조기에 검출합니다.",
    "difficulty": "EASY",
    "keywords": [
      "정적 분석 도구",
      "SonarQube",
      "정적분석"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_TST_021",
    "subject": "소프트웨어설계",
    "category": "애플리케이션 테스트 관리",
    "subCategory": "테스트 시각 및 인수 테스트",
    "type": "SHORT_ANSWER",
    "question": "인수 테스트(Acceptance Test)의 두 가지 유형 중, 개발사 내부의 통제된 환경에서 실제 사용자가 개발자와 함께 참여하여 소프트웨어를 테스트하는 기법을 무엇이라 하는가?",
    "answer": [
      "알파 테스트",
      "Alpha Test"
    ],
    "explanation": "알파 테스트는 개발자의 통제 하에 내부에서 수행되고, 실제 통제되지 않은 고객 환경에서 다수의 사용자가 테스트하는 것은 베타 테스트(Beta Test)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "알파 테스트",
      "Alpha Test",
      "인수테스트"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_TST_022",
    "subject": "소프트웨어설계",
    "category": "애플리케이션 테스트 관리",
    "subCategory": "테스트 결함 관리",
    "type": "SHORT_ANSWER",
    "question": "발견된 결함이 시스템의 핵심 기능을 전면 마비시키거나 데이터 유실을 초래하는지, 아니면 단순한 UI 오탈자인지와 같이 결함이 시스템에 미치는 영향의 치명적 정도를 나타내는 척도는 무엇인가?",
    "answer": [
      "결함 심각도",
      "심각도",
      "Severity",
      "결함 심각도(Severity)"
    ],
    "explanation": "결함 심각도(Severity)는 시스템 기능에 미치는 기술적 영향도이며, 결함을 얼마나 빨리 수정해야 하는지 비즈니스적 긴급도를 나타내는 것은 결함 우선순위(Priority)입니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "결함 심각도",
      "Severity",
      "결함관리"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_TST_024",
    "subject": "소프트웨어설계",
    "category": "애플리케이션 테스트 관리",
    "subCategory": "테스트 원리",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 테스트의 7대 원리 중, 동일한 테스트 케이스로 반복해서 테스트를 수행하면 더 이상 새로운 결함을 찾아낼 수 없으므로 주기적으로 테스트 케이스를 개선하고 변경해야 한다는 원리는 무엇인가?",
    "answer": [
      "살충제 패러독스",
      "Pesticide Paradox"
    ],
    "explanation": "살충제 패러독스(Pesticide Paradox)는 곤충이 동일한 살충제에 내성을 갖듯이 기존 테스트 케이스에 결함이 적응되어 새로운 결함 검출력이 떨어지는 현상입니다.",
    "difficulty": "EASY",
    "keywords": [
      "살충제 패러독스",
      "Pesticide Paradox",
      "테스트원리"
    ],
    "source": "2026 실기 핵심 보강"
  },
  {
    "id": "EXP26_TST_025",
    "subject": "소프트웨어설계",
    "category": "애플리케이션 테스트 관리",
    "subCategory": "테스트 원리",
    "type": "SHORT_ANSWER",
    "question": "소프트웨어 테스트의 7대 원리 중, 대부분의 결함은 시스템 전체에 고르게 퍼져 있는 것이 아니라 소수의 특정 취약한 모듈(약 20%의 모듈)에 집중(약 80%의 결함)되어 발생한다는 원리는 무엇인가?",
    "answer": [
      "결함 집중",
      "파레토 법칙",
      "결함 집중(Defect Clustering)"
    ],
    "explanation": "결함 집중(Defect Clustering / 파레토 법칙)은 결함이 많이 발견된 특정 모듈에 더 많은 추가 결함이 숨겨져 있을 확률이 높다는 원리입니다.",
    "difficulty": "EASY",
    "keywords": [
      "결함 집중",
      "파레토 법칙",
      "Defect Clustering"
    ],
    "source": "2026 실기 핵심 보강"
  }
];
