import { Question } from "../../types/question";

/**
 * 실기 암기 과목 보충 및 표준 기출 문제 은행.
 * 총 256문항 (과목별 엄선된 고빈출 표준 문항 수록).
 * 오프라인 환경에서도 즉시 100% 동작합니다.
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
    "question": "형상 항목이 공식 검토를 통과한 뒤 변경을 통제하기 위한 기준선으로 확정된 상태의 명칭을 영문 또는 한글로 쓰시오.",
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
    "question": "구현부에서 추상층을 분리하여 두 계층이 독립적으로 확장할 수 있도록 다리(Bridge) 역할을 수행하는 GoF 구조 패턴의 명칭을 쓰시오.",
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
    "id": "MEMO_SE_025",
    "subject": "소프트웨어설계",
    "category": "디자인 패턴",
    "subCategory": "행위 패턴",
    "type": "SHORT_ANSWER",
    "question": "어떤 객체의 상태가 변하면 그 객체에 의존하는 모든 객체에 자동으로 알림이 가고 내용이 갱신되는 일대다 의존 관계의 GoF 행위 패턴을 쓰시오.",
    "answer": [
      "옵서버",
      "옵저버",
      "옵서버 패턴",
      "옵저버 패턴",
      "Observer"
    ],
    "explanation": "옵서버 패턴은 발행-구독(Publish-Subscribe) 모델로 통보 주체와 관찰자 객체 간의 결합도를 낮춥니다.",
    "difficulty": "EASY",
    "keywords": [
      "옵서버",
      "디자인패턴",
      "행위패턴",
      "발행구독"
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
    "question": "객체들의 상호작용을 캡슐화하여 객체 간의 직접적인 참조를 줄이고, 복잡한 통신을 조율하는 중재자 객체를 두는 GoF 행위 패턴의 명칭을 쓰시오.",
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
    "id": "MEMO_SE_050",
    "subject": "소프트웨어설계",
    "category": "모듈화",
    "subCategory": "응집도",
    "type": "SHORT_ANSWER",
    "question": "모듈 내부의 모든 요소가 단 하나의 단일 목적(기능)만을 수행하기 위해 긴밀하게 구성된 가장 높고 이상적인 응집도의 명칭을 쓰시오.",
    "answer": [
      "기능적 응집도",
      "Functional Cohesion"
    ],
    "explanation": "기능적 응집도는 최고 수준의 응집도입니다. 응집도 순서: 우연적 < 논리적 < 시간적 < 절차적 < 통신적 < 순차적 < 기능적 (우논시절통순기).",
    "difficulty": "EASY",
    "keywords": [
      "응집도",
      "기능적응집도",
      "단일기능"
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
    "id": "MEMO_DB_022",
    "subject": "데이터베이스구축",
    "category": "무결성 제약조건",
    "subCategory": "개체 무결성",
    "type": "SHORT_ANSWER",
    "question": "릴레이션의 기본키를 구성하는 어떤 속성도 널(NULL) 값이나 중복값을 가질 수 없다는 제약조건의 명칭을 쓰시오.",
    "answer": [
      "개체 무결성",
      "개체 무결성 제약조건",
      "Entity Integrity"
    ],
    "explanation": "개체 무결성은 기본키의 유일성과 Not Null을 보장하여 각 튜플을 고유하게 식별할 수 있도록 합니다.",
    "difficulty": "EASY",
    "keywords": [
      "무결성",
      "개체무결성",
      "기본키",
      "NotNull"
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
    "question": "하나의 대용량 테이블을 행(Row) 단위로 특정 기준(날짜, 지역 등)에 따라 여러 개의 작은 테이블로 쪼개는 수평 분할 기법의 일반적 명칭을 쓰시오.",
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
    "question": "트랜잭션이 성공적으로 완료되면 언제나 일관성 있는 데이터베이스 상태를 유지해야 하며, 무결성 제약조건을 위배하지 않아야 한다는 ACID 특성의 명칭을 쓰시오.",
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
    "question": "트랜잭션의 5가지 상태(활동, 부분 완료, 완료, 실패, 철회) 중 마지막 연산까지 정상 수행되었으나 커밋 연산 직전인 상태의 명칭을 쓰시오.",
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
    "question": "특정 조직을 목표로 정하고 다양한 IT 공격 기술과 사회공학 기법을 결합하여 장기간에 걸쳐 지속적으로 잠복하면서 기밀을 탈취하는 지능형 지속 위협의 영문 약어를 쓰시오.",
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
    "question": "사내 직원의 PC나 네트워크를 모니터링하여 기밀 문서, 개인정보 등 중요 데이터가 외부로 무단 유출되는 것을 감지하고 실시간 차단하는 데이터 유출 방지 솔루션의 영문 약어를 쓰시오.",
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
    "question": "아이디/비밀번호(지식 기반) 외에 스마트폰 OTP(소유 기반)나 지문(생체 기반) 등 서로 다른 두 가지 이상의 인증 요소를 결합하여 보안을 강화하는 다중 요소 인증의 영문 약어를 쓰시오.",
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
    "question": "공중 인터넷망(Public Network)을 마치 전용 사설망(Private Network)처럼 안전하게 사용할 수 있도록 터널링과 암호화 기술을 적용한 가상 사설망의 영문 약어를 쓰시오.",
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
    "question": "시스템 개발자나 침입자가 정상적인 인증 절차를 우회하여 시스템에 손쉽게 재접근할 수 있도록 만들어 둔 비밀 통로(트랩도어)의 명칭을 쓰시오.",
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
    "question": "개발자가 서버 인프라를 직접 프로비저닝하거나 관리하지 않고, 이벤트가 발생할 때만 특정 함수 코드가 실행되고 사용된 리소스만큼만 비용을 지불하는 클라우드 실행 모델(FaaS)의 명칭을 쓰시오.",
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
    "question": "소프트웨어 개발 생명주기(SDLC) 전 과정에 걸쳐 보안 취약점을 예방하기 위해 마이크로소프트사가 개발한 보안 개발 생명주기 프레임워크의 영문 약어를 쓰시오.",
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
    "question": "원작성자가 아닌 다른 검토 전문가들이 체크리스트를 바탕으로 소스 코드나 명세서를 정밀하게 결함 식별하는 가장 공식적이고 체계적인 동료 검토 기법의 명칭을 쓰시오.",
    "answer": [
      "인스펙션",
      "Inspection",
      "코드 인스펙션",
      "동료 검토"
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
  }
];
