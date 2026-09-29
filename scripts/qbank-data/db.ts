import { Question } from "../../src/types/question";

export const DB_QUESTIONS: Question[] = [
  {
    id: "MEMO_DB_015",
    subject: "데이터베이스구축",
    category: "관계 대수",
    subCategory: "순수 관계 연산",
    type: "SHORT_ANSWER",
    question:
      "릴레이션에서 주어진 조건을 만족하는 튜플(수평 부분집합)들을 검색하는 순수 관계 연산자의 기호(그리스 문자) 또는 명칭을 쓰시오.",
    answer: ["셀렉트", "Select", "시그마", "σ"],
    explanation:
      "셀렉트(Select, σ)는 튜플(행)을 선택하는 연산입니다. 열(속성)을 선택하는 연산은 프로젝트(Project, π)입니다.",
    difficulty: "EASY",
    keywords: ["관계대수", "셀렉트", "Select", "시그마"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_016",
    subject: "데이터베이스구축",
    category: "관계 대수",
    subCategory: "순수 관계 연산",
    type: "SHORT_ANSWER",
    question:
      "릴레이션에서 제시된 특정 속성값들만 추출하여 새로운 릴레이션을 구성하는 수직 연산자의 기호(그리스 문자) 또는 명칭을 쓰시오.",
    answer: ["프로젝트", "Project", "파이", "π"],
    explanation:
      "프로젝트(Project, π)는 원하는 컬럼(속성)만을 수직으로 투영하여 추출하며 중복된 행은 자동 제거됩니다.",
    difficulty: "EASY",
    keywords: ["관계대수", "프로젝트", "Project", "파이"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_017",
    subject: "데이터베이스구축",
    category: "관계 대수",
    subCategory: "순수 관계 연산",
    type: "SHORT_ANSWER",
    question:
      "두 릴레이션 R(X, Y)와 S(Y)가 있을 때, S의 모든 튜플과 관련을 갖는 R의 X 튜플들을 구하는 순수 관계 연산자의 명칭 또는 기호를 쓰시오.",
    answer: ["디비전", "Division", "나누기", "÷"],
    explanation:
      "디비전(Division, ÷)은 분모 릴레이션의 모든 조건을 만족하는 분자 릴레이션의 속성 값을 구하는 나눗셈 연산입니다.",
    difficulty: "MEDIUM",
    keywords: ["관계대수", "디비전", "Division", "나누기"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_018",
    subject: "데이터베이스구축",
    category: "관계 대수",
    subCategory: "일반 집합 연산",
    type: "SHORT_ANSWER",
    question:
      "차수가 n인 릴레이션 R과 차수가 m인 릴레이션 S의 모든 튜플을 상호 곱하여 차수가 n+m, 카디널리티가 두 릴레이션의 곱이 되는 집합 연산자의 명칭을 쓰시오.",
    answer: [
      "카티션 프로덕트",
      "카티시언 프로덕트",
      "Cartesian Product",
      "교차곱",
      "카테시안 곱",
    ],
    explanation:
      "카티션 프로덕트(×)는 두 릴레이션의 가능한 모든 순서쌍을 생성하며, 조건이 없는 CROSS JOIN에 해당합니다.",
    difficulty: "MEDIUM",
    keywords: ["관계대수", "카티션프로덕트", "교차곱", "카테시안곱"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_019",
    subject: "데이터베이스구축",
    category: "관계 대수",
    subCategory: "순수 관계 연산",
    type: "SHORT_ANSWER",
    question:
      "두 릴레이션의 공통 속성을 기준으로 값이 같은 튜플들을 결합한 후, 중복되는 공통 속성을 하나 제거하여 나타내는 조인의 명칭을 쓰시오.",
    answer: ["자연 조인", "내추럴 조인", "Natural Join"],
    explanation:
      "자연 조인(Natural Join)은 동일한 이름의 공통 속성에 대해 등가 조인(Equi Join)을 수행하고 중복 속성을 한 번만 표시합니다.",
    difficulty: "EASY",
    keywords: ["관계대수", "자연조인", "NaturalJoin"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_020",
    subject: "데이터베이스구축",
    category: "키",
    subCategory: "슈퍼키",
    type: "SHORT_ANSWER",
    question:
      "릴레이션 내의 모든 튜플을 유일하게 식별할 수 있는 유일성은 만족하지만, 최소성은 만족하지 못하는 속성 또는 속성 집합의 명칭을 쓰시오.",
    answer: ["슈퍼키", "슈퍼 키", "Super Key"],
    explanation:
      "슈퍼키는 유일성은 만족하지만 최소성을 만족하지 않습니다. 유일성과 최소성을 둘 다 만족하는 키는 후보키입니다.",
    difficulty: "EASY",
    keywords: ["키", "슈퍼키", "유일성", "최소성불만족"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_021",
    subject: "데이터베이스구축",
    category: "키",
    subCategory: "대체키",
    type: "SHORT_ANSWER",
    question:
      "후보키(Candidate Key) 중에서 기본키(Primary Key)로 선택되지 않고 남아 있는 후보키들의 명칭을 쓰시오.",
    answer: ["대체키", "대체 키", "보조키", "Alternate Key"],
    explanation:
      "대체키(Alternate Key)는 기본키가 될 수 있는 자격을 갖추었으나 기본키로 지정되지 않은 키입니다.",
    difficulty: "EASY",
    keywords: ["키", "대체키", "보조키", "후보키"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_022",
    subject: "데이터베이스구축",
    category: "무결성 제약조건",
    subCategory: "개체 무결성",
    type: "SHORT_ANSWER",
    question:
      "릴레이션의 기본키를 구성하는 어떤 속성도 널(NULL) 값이나 중복값을 가질 수 없다는 제약조건의 명칭을 쓰시오.",
    answer: ["개체 무결성", "개체 무결성 제약조건", "Entity Integrity"],
    explanation:
      "개체 무결성은 기본키의 유일성과 Not Null을 보장하여 각 튜플을 고유하게 식별할 수 있도록 합니다.",
    difficulty: "EASY",
    keywords: ["무결성", "개체무결성", "기본키", "NotNull"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_023",
    subject: "데이터베이스구축",
    category: "무결성 제약조건",
    subCategory: "도메인 무결성",
    type: "SHORT_ANSWER",
    question:
      "테이블의 각 속성(컬럼) 값이 해당 속성에 정의된 데이터 타입, 길이, 허용 범위(도메인) 내의 유효한 값이어야 한다는 제약조건의 명칭을 쓰시오.",
    answer: ["도메인 무결성", "도메인 무결성 제약조건", "Domain Integrity"],
    explanation:
      "도메인 무결성은 나이 컬럼에 음수가 들어오지 못하게 하거나, 성별 컬럼에 정해진 문자만 들어가도록 제약하는 규칙입니다.",
    difficulty: "EASY",
    keywords: ["무결성", "도메인무결성", "유효값"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_024",
    subject: "데이터베이스구축",
    category: "무결성 제약조건",
    subCategory: "참조 무결성 동작",
    type: "SHORT_ANSWER",
    question:
      "부모 테이블의 기본키 튜플이 삭제되거나 수정될 때 이를 참조하는 자식 테이블의 외래키 튜플도 자동으로 함께 삭제 또는 수정되게 하는 옵션의 영문 키워드를 쓰시오.",
    answer: ["CASCADE", "cascade", "캐스케이드"],
    explanation:
      "ON DELETE CASCADE, ON UPDATE CASCADE는 부모 데이터의 변경을 자식에게 연쇄적으로 반영합니다. 반대로 삭제를 막는 것은 RESTRICT입니다.",
    difficulty: "EASY",
    keywords: ["참조무결성", "CASCADE", "연쇄삭제"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_025",
    subject: "데이터베이스구축",
    category: "정규화",
    subCategory: "1NF",
    type: "SHORT_ANSWER",
    question:
      "릴레이션에 속한 모든 속성의 도메인이 더 이상 쪼갤 수 없는 원자값(Atomic Value)만으로 되어 있도록 분해하는 정규형의 명칭을 쓰시오.",
    answer: ["제1정규형", "1NF", "제1 정규형", "First Normal Form"],
    explanation:
      "제1정규형(1NF)은 반복 그룹이나 다중값을 제거하여 모든 컬럼이 단일 원자값을 갖도록 정규화하는 첫 단계입니다.",
    difficulty: "EASY",
    keywords: ["정규화", "1NF", "제1정규형", "원자값"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_026",
    subject: "데이터베이스구축",
    category: "SQL",
    subCategory: "DML",
    type: "SHORT_ANSWER",
    question:
      "조건에 따라 테이블에 해당 행이 존재하면 UPDATE를 수행하고, 존재하지 않으면 새 행으로 INSERT를 한 번에 수행하는 SQL 명령어(UPSERT)의 명칭을 쓰시오.",
    answer: ["MERGE", "머지", "MERGE INTO", "merge"],
    explanation:
      "MERGE 문은 소스 테이블과 타깃 테이블을 조인하여 매칭 여부에 따라 갱신(UPDATE)과 삽입(INSERT)을 단일 문장으로 처리합니다.",
    difficulty: "MEDIUM",
    keywords: ["SQL", "MERGE", "UPSERT", "DML"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_027",
    subject: "데이터베이스구축",
    category: "정규화",
    subCategory: "4NF",
    type: "SHORT_ANSWER",
    question:
      "BCNF를 만족하면서 릴레이션에 존재하는 다치 종속(MVD, Multi-Valued Dependency)을 제거하여 만족시키는 정규형의 명칭을 쓰시오.",
    answer: ["제4정규형", "4NF", "제4 정규형", "Fourth Normal Form"],
    explanation:
      "제4정규형(4NF)은 A ->> B 형태의 다치 종속(다치 종속성)을 분해하여 제거한 정규형입니다.",
    difficulty: "HARD",
    keywords: ["정규화", "4NF", "다치종속"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_028",
    subject: "데이터베이스구축",
    category: "정규화",
    subCategory: "5NF",
    type: "SHORT_ANSWER",
    question:
      "4차 정규형을 만족하면서, 후보키를 통하지 않는 모든 조인 종속(Join Dependency)을 제거하여 원래 릴레이션이 무손실 분해되도록 하는 정규형의 명칭을 쓰시오.",
    answer: ["제5정규형", "5NF", "PJNF", "제5 정규형"],
    explanation:
      "제5정규형(5NF 또는 PJNF)은 조인 종속성을 만족하는 정규형으로 정규화의 최고 단계입니다.",
    difficulty: "HARD",
    keywords: ["정규화", "5NF", "조인종속"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_029",
    subject: "데이터베이스구축",
    category: "반정규화",
    subCategory: "성능 최적화",
    type: "SHORT_ANSWER",
    question:
      "정규화된 엔터티, 속성, 관계에 대해 데이터 중복을 허용하거나 테이블을 병합·분할하여 시스템 성능과 조회 속도를 향상시키는 데이터 모델링 기법의 명칭을 쓰시오.",
    answer: ["반정규화", "역정규화", "Denormalization"],
    explanation:
      "반정규화는 잦은 조인으로 인한 성능 저하를 방지하기 위해 의도적으로 중복을 도입하며 데이터 무결성 훼손 위험을 수반합니다.",
    difficulty: "EASY",
    keywords: ["반정규화", "역정규화", "성능최적화", "중복허용"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_030",
    subject: "데이터베이스구축",
    category: "반정규화",
    subCategory: "테이블 분할",
    type: "SHORT_ANSWER",
    question:
      "하나의 대용량 테이블을 행(Row) 단위로 특정 기준(날짜, 지역 등)에 따라 여러 개의 작은 테이블로 쪼개는 수평 분할 기법의 일반적 명칭을 쓰시오.",
    answer: ["파티셔닝", "수평 분할", "Partitioning", "샤딩"],
    explanation:
      "수평 분할(Range, List, Hash Partitioning)은 행 단위로 데이터를 분할하여 I/O 분산 및 검색 속도를 개선합니다.",
    difficulty: "MEDIUM",
    keywords: ["파티셔닝", "수평분할", "테이블분할"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_031",
    subject: "데이터베이스구축",
    category: "트랜잭션",
    subCategory: "ACID",
    type: "SHORT_ANSWER",
    question:
      "트랜잭션이 성공적으로 완료되면 언제나 일관성 있는 데이터베이스 상태를 유지해야 하며, 무결성 제약조건을 위배하지 않아야 한다는 ACID 특성의 명칭을 쓰시오.",
    answer: ["일관성", "Consistency"],
    explanation:
      "일관성(Consistency)은 트랜잭션 수행 전후에 데이터베이스가 제약조건과 무결성 규칙을 올바르게 만족해야 함을 뜻합니다.",
    difficulty: "EASY",
    keywords: ["ACID", "일관성", "Consistency", "트랜잭션"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_032",
    subject: "데이터베이스구축",
    category: "트랜잭션",
    subCategory: "ACID",
    type: "SHORT_ANSWER",
    question:
      "둘 이상의 트랜잭션이 동시에 병행 실행될 때, 어느 하나의 트랜잭션도 다른 트랜잭션의 중간 연산 과정에 끼어들거나 간섭할 수 없다는 ACID 특성의 명칭을 쓰시오.",
    answer: ["격리성", "고립성", "독립성", "Isolation"],
    explanation:
      "격리성(Isolation)은 병행 트랜잭션이 서로 영향을 미치지 않고 마치 순차적으로 실행된 것처럼 독립적으로 수행되도록 보장합니다.",
    difficulty: "EASY",
    keywords: ["ACID", "격리성", "고립성", "Isolation"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_033",
    subject: "데이터베이스구축",
    category: "트랜잭션 회복",
    subCategory: "WAL",
    type: "SHORT_ANSWER",
    question:
      "데이터베이스 버퍼의 변경 내용을 디스크의 데이터 파일에 실제로 기록하기 전에, 반드시 대응되는 로그 레코드를 디스크에 먼저 영구 기록해야 한다는 회복 기본 원칙의 명칭을 쓰시오.",
    answer: [
      "WAL",
      "Write-Ahead Logging",
      "로그 우선 기록",
      "Write Ahead Logging",
    ],
    explanation:
      "WAL(Write-Ahead Logging)은 충돌 발생 시 UNDO 및 REDO 작업을 정확히 수행할 수 있도록 로그를 데이터보다 먼저 디스크에 강제 플러시(Flush)합니다.",
    difficulty: "HARD",
    keywords: ["트랜잭션회복", "WAL", "Write-AheadLogging", "로그우선기록"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_034",
    subject: "데이터베이스구축",
    category: "병행 제어",
    subCategory: "이상 현상",
    type: "SHORT_ANSWER",
    question:
      "두 개 이상의 트랜잭션이 같은 데이터를 동시에 갱신할 때, 한 트랜잭션의 갱신 내용이 다른 트랜잭션에 의해 덮어씌워져 사라지는 병행 제어 문제점의 명칭을 쓰시오.",
    answer: ["갱신 분실", "Lost Update"],
    explanation:
      "갱신 분실(Lost Update)은 병행 제어가 없는 상태에서 늦게 커밋한 트랜잭션이 먼저 갱신한 결과를 덮어써서 발생합니다.",
    difficulty: "EASY",
    keywords: ["병행제어", "갱신분실", "LostUpdate"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_035",
    subject: "데이터베이스구축",
    category: "병행 제어",
    subCategory: "이상 현상",
    type: "SHORT_ANSWER",
    question:
      "트랜잭션 T1이 갱신 후 아직 커밋되지 않은 미완료 데이터를 트랜잭션 T2가 읽고 작업을 진행하다가 T1이 롤백될 때 발생하는 문제점의 명칭을 쓰시오.",
    answer: ["임시 갱신", "오손 읽기", "Dirty Read", "비완료 의존성"],
    explanation:
      "Dirty Read는 커밋되지 않은 유효하지 않은 데이터를 읽음으로써 발생하는 모순 상태입니다.",
    difficulty: "MEDIUM",
    keywords: ["병행제어", "오손읽기", "DirtyRead", "임시갱신"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_036",
    subject: "데이터베이스구축",
    category: "병행 제어",
    subCategory: "이상 현상",
    type: "SHORT_ANSWER",
    question:
      "어느 하나의 트랜잭션이 실패하여 롤백(취소)될 때, 해당 트랜잭션이 갱신했던 데이터를 참조하여 작업한 다른 트랜잭션들까지 연쇄적으로 롤백되어야 하는 현상의 명칭을 쓰시오.",
    answer: ["연쇄 복귀", "Cascading Rollback", "연쇄 취소"],
    explanation:
      "연쇄 복귀(Cascading Rollback)는 시스템 자원을 대량 소모하며 트랜잭션 처리 지연을 유발합니다.",
    difficulty: "MEDIUM",
    keywords: ["병행제어", "연쇄복귀", "CascadingRollback"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_037",
    subject: "데이터베이스구축",
    category: "병행 제어 기법",
    subCategory: "로킹",
    type: "SHORT_ANSWER",
    question:
      "트랜잭션이 데이터를 사용하기 전에 락을 획득하는 확장(Growing) 단계와, 처리가 끝난 락을 해제하기만 하는 축소(Shrinking) 단계로 나누어 직렬성을 보장하는 규약의 명칭을 쓰시오.",
    answer: ["2단계 로킹 규약", "2단계 잠금 규약", "2PL", "Two-Phase Locking"],
    explanation:
      "2PL은 확장 단계에서는 Lock만 획득하고 Unlock을 할 수 없으며, 축소 단계에서는 Unlock만 수행할 수 있습니다. 교착상태(Deadlock)는 발생할 수 있습니다.",
    difficulty: "MEDIUM",
    keywords: ["병행제어", "2PL", "2단계로킹", "직렬성"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_038",
    subject: "데이터베이스구축",
    category: "병행 제어 기법",
    subCategory: "타임스탬프",
    type: "SHORT_ANSWER",
    question:
      "트랜잭션이 시스템에 진입할 때 고유한 타임스탬프를 부여하고, 데이터 접근 순서를 타임스탬프 순서대로 강제하여 직렬성을 보장하는 비잠금(Lock-free) 기법의 명칭을 쓰시오.",
    answer: ["타임스탬프 순서 규약", "타임스탬프 순서화", "Timestamp Ordering"],
    explanation:
      "타임스탬프 순서 규약은 락을 사용하지 않으므로 교착상태(Deadlock)가 발생하지 않는 장점이 있습니다.",
    difficulty: "MEDIUM",
    keywords: ["병행제어", "타임스탬프", "TimestampOrdering", "교착상태없음"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_039",
    subject: "데이터베이스구축",
    category: "병행 제어 기법",
    subCategory: "MVCC",
    type: "SHORT_ANSWER",
    question:
      "데이터를 갱신할 때 기존 데이터를 덮어쓰지 않고 새로운 버전의 데이터를 생성하여, 읽기 작업과 쓰기 작업이 서로 블로킹하지 않도록 하는 동시성 제어 기법의 영문 약어를 쓰시오.",
    answer: [
      "MVCC",
      "Multi-Version Concurrency Control",
      "다중 버전 동시성 제어",
    ],
    explanation:
      "MVCC는 오라클, PostgreSQL, MySQL(InnoDB) 등 현대 RDBMS에서 읽기 잠금 없이 높은 동시성을 달성하는 핵심 메커니즘입니다.",
    difficulty: "HARD",
    keywords: ["MVCC", "다중버전동시성제어", "병행제어"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_040",
    subject: "데이터베이스구축",
    category: "데이터베이스 회복",
    subCategory: "로그 기반 회복",
    type: "SHORT_ANSWER",
    question:
      "트랜잭션 수행 도중 발생한 변경 내용을 즉시 데이터베이스에 반영하지 않고 로그 파일에만 기록하다가, 커밋이 완료된 시점에 데이터베이스에 반영하는 회복 기법의 명칭을 쓰시오.",
    answer: ["지연 갱신 기법", "지연 갱신", "Deferred Update"],
    explanation:
      "지연 갱신 기법은 장애 발생 시 트랜잭션이 커밋되지 않았으면 UNDO할 필요가 없고 무시하면 되며, 커밋된 트랜잭션은 REDO만 수행합니다.",
    difficulty: "MEDIUM",
    keywords: ["회복기법", "지연갱신", "DeferredUpdate", "REDO"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_041",
    subject: "데이터베이스구축",
    category: "데이터베이스 회복",
    subCategory: "로그 기반 회복",
    type: "SHORT_ANSWER",
    question:
      "트랜잭션 수행 도중 변경 내용을 데이터베이스와 로그에 즉시 반영하며, 장애 발생 시 미완료 트랜잭션은 UNDO하고 완료 트랜잭션은 REDO를 수행하는 회복 기법의 명칭을 쓰시오.",
    answer: ["즉시 갱신 기법", "즉시 갱신", "Immediate Update"],
    explanation:
      "즉시 갱신 기법은 장애 시 커밋된 트랜잭션에 대해서는 REDO를, 커밋되지 않은 트랜잭션에 대해서는 UNDO를 모두 수행해야 합니다.",
    difficulty: "MEDIUM",
    keywords: ["회복기법", "즉시갱신", "ImmediateUpdate", "UNDO", "REDO"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_042",
    subject: "데이터베이스구축",
    category: "데이터베이스 회복",
    subCategory: "검사점 회복",
    type: "SHORT_ANSWER",
    question:
      "장애 발생 시 로그 전체를 검색하지 않고 주기적으로 메모리의 변경 내용을 디스크에 동기화한 체크포인트 시점 이후의 로그만 검색하여 회복 시간을 줄이는 기법의 명칭을 쓰시오.",
    answer: [
      "검사점 회복 기법",
      "체크포인트 회복",
      "Checkpoint Recovery",
      "검사점 기법",
    ],
    explanation:
      "검사점(Checkpoint) 기법은 체크포인트 이전의 완료 트랜잭션은 회복 대상에서 제외하여 복구 비용을 획기적으로 줄입니다.",
    difficulty: "EASY",
    keywords: ["회복기법", "검사점", "체크포인트", "Checkpoint"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_043",
    subject: "데이터베이스구축",
    category: "데이터베이스 회복",
    subCategory: "그림자 페이징",
    type: "SHORT_ANSWER",
    question:
      "트랜잭션 실행 중 데이터 페이지를 갱신할 때 현재 페이지 테이블 외에 원본을 유지하는 그림자(Shadow) 페이지 테이블을 별도로 두어 로그 없이 복구하는 회복 기법을 쓰시오.",
    answer: ["그림자 페이징", "그림자 페이징 기법", "Shadow Paging"],
    explanation:
      "그림자 페이징은 트랜잭션 실패 시 그림자 페이지 테이블 포인터로 되돌리기만 하면 되므로 UNDO/REDO 로그 오버헤드가 없습니다.",
    difficulty: "HARD",
    keywords: ["회복기법", "그림자페이징", "ShadowPaging"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_044",
    subject: "데이터베이스구축",
    category: "인덱스",
    subCategory: "인덱스 구조",
    type: "SHORT_ANSWER",
    question:
      "테이블의 실제 물리적 데이터 정렬 순서와 인덱스의 정렬 순서가 완벽히 일치하여, 테이블당 단 하나만 생성할 수 있는 인덱스의 명칭을 쓰시오.",
    answer: ["클러스터드 인덱스", "클러스터 인덱스", "Clustered Index"],
    explanation:
      "클러스터드 인덱스는 리프 노드 자체가 실제 데이터 페이지입니다. 책의 본문 페이지와 같으며 범위 검색에 매우 유리합니다.",
    difficulty: "MEDIUM",
    keywords: ["인덱스", "클러스터드인덱스", "물리정렬일치"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_045",
    subject: "데이터베이스구축",
    category: "인덱스",
    subCategory: "인덱스 구조",
    type: "SHORT_ANSWER",
    question:
      "물리적 데이터와는 별도의 공간에 정렬된 키 값과 실제 데이터의 주소(RID, 행 위치) 포인터를 저장하여 한 테이블에 여러 개 생성할 수 있는 인덱스의 명칭을 쓰시오.",
    answer: [
      "넌클러스터드 인덱스",
      "비클러스터드 인덱스",
      "Non-Clustered Index",
    ],
    explanation:
      "넌클러스터드 인덱스는 책의 맨 뒤 '찾아보기(색인)'와 같아서 여러 개를 만들 수 있습니다.",
    difficulty: "MEDIUM",
    keywords: ["인덱스", "넌클러스터드인덱스", "비클러스터드"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_046",
    subject: "데이터베이스구축",
    category: "인덱스",
    subCategory: "B+ Tree",
    type: "SHORT_ANSWER",
    question:
      "모든 실제 키와 데이터 포인터는 리프 노드에만 저장하고, 리프 노드들끼리 연결 리스트(Linked List)로 이어져 순차 스캔과 범위 검색에 매우 효율적인 트리 인덱스의 명칭을 쓰시오.",
    answer: ["B+ 트리", "비플러스 트리", "B+ Tree", "B+트리"],
    explanation:
      "B+ 트리는 인덱스 노드에는 키만 보관하여 팬아웃(Fan-out)을 키우고, 리프 노드의 순차 링크를 통해 Full Scan과 Range Scan 속도를 높입니다.",
    difficulty: "MEDIUM",
    keywords: ["인덱스", "B+트리", "리프노드순차링크"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_047",
    subject: "데이터베이스구축",
    category: "분산 데이터베이스",
    subCategory: "투명성",
    type: "SHORT_ANSWER",
    question:
      "사용자가 분산 데이터베이스에서 데이터가 물리적으로 어느 서버나 네트워크 위치에 저장되어 있는지 알 필요 없이 논리적 이름만으로 접근할 수 있는 투명성의 명칭을 쓰시오.",
    answer: ["위치 투명성", "Location Transparency"],
    explanation:
      "위치 투명성은 데이터의 실제 저장 장소(IP, 물리 경로)와 무관하게 데이터베이스 객체 이름만으로 조회가 가능함을 보장합니다.",
    difficulty: "EASY",
    keywords: ["분산DB", "위치투명성", "LocationTransparency"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_048",
    subject: "데이터베이스구축",
    category: "분산 데이터베이스",
    subCategory: "투명성",
    type: "SHORT_ANSWER",
    question:
      "하나의 논리적 릴레이션이 여러 단편(Fragment)으로 분할되어 여러 노드에 저장되어 있더라도, 사용자는 단일 릴레이션처럼 접근할 수 있는 투명성의 명칭을 쓰시오.",
    answer: ["분할 투명성", "단편화 투명성", "Fragmentation Transparency"],
    explanation:
      "분할(단편화) 투명성은 수평/수직 분할된 단편 데이터를 하나의 통일된 테이블처럼 조회할 수 있게 합니다.",
    difficulty: "MEDIUM",
    keywords: ["분산DB", "분할투명성", "단편화투명성"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_049",
    subject: "데이터베이스구축",
    category: "분산 데이터베이스",
    subCategory: "투명성",
    type: "SHORT_ANSWER",
    question:
      "동일한 데이터가 성능 및 가용성을 위해 여러 서버 노드에 복제되어 저장되어 있더라도, 사용자는 마치 하나의 데이터만 존재하는 것처럼 사용하는 투명성의 명칭을 쓰시오.",
    answer: ["복제 투명성", "Replication Transparency"],
    explanation:
      "복제 투명성은 다중 사본이 존재해도 데이터 갱신 시 시스템이 알아서 모든 사본을 일치시켜 사용자가 사본 관리를 신경 쓰지 않게 합니다.",
    difficulty: "MEDIUM",
    keywords: ["분산DB", "복제투명성", "ReplicationTransparency"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_050",
    subject: "데이터베이스구축",
    category: "분산 데이터베이스",
    subCategory: "투명성",
    type: "SHORT_ANSWER",
    question:
      "분산 환경에서 특정 노드, 통신 링크, 디스크 장애가 발생하더라도 전체 트랜잭션이 무결성을 유지하며 지속 동작할 수 있는 투명성의 명칭을 쓰시오.",
    answer: ["장애 투명성", "고장 투명성", "Failure Transparency"],
    explanation:
      "장애 투명성은 개별 구성요소의 고장에도 불구하고 전체 시스템이 올바르게 트랜잭션을 처리함을 보장합니다.",
    difficulty: "EASY",
    keywords: ["분산DB", "장애투명성", "FailureTransparency"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_051",
    subject: "데이터베이스구축",
    category: "분산 데이터베이스",
    subCategory: "CAP 정리",
    type: "SHORT_ANSWER",
    question:
      "분산 시스템은 일관성(Consistency), 가용성(Availability), 분할 허용성(Partition tolerance)의 3가지 속성을 모두 동시에 만족할 수 없다는 이론의 명칭을 쓰시오.",
    answer: ["CAP 정리", "CAP 이론", "CAP Theorem"],
    explanation:
      "CAP 정리는 네트워크 단절(P)이 발생할 수 있는 분산 환경에서 시스템은 일관성(CP) 또는 가용성(AP) 중 하나를 선택해야 함을 증명합니다.",
    difficulty: "EASY",
    keywords: ["CAP", "CAP정리", "분산시스템", "NoSQL"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_052",
    subject: "데이터베이스구축",
    category: "NoSQL",
    subCategory: "BASE 특성",
    type: "SHORT_ANSWER",
    question:
      "RDBMS의 ACID에 대응되는 NoSQL 분산 시스템의 특성으로 기본적 가용성, 유연한 상태, 결과적 일관성을 의미하는 약어 모델의 명칭을 쓰시오.",
    answer: [
      "BASE",
      "base",
      "Basically Available Soft state Eventually consistent",
    ],
    explanation:
      "BASE는 Basically Available(기본적 가용성), Soft state(유연한 상태), Eventually consistent(최종 일관성)의 약어로 가용성을 위해 즉각적 일관성을 양보합니다.",
    difficulty: "MEDIUM",
    keywords: ["BASE", "NoSQL", "최종일관성", "ACID비교"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_053",
    subject: "데이터베이스구축",
    category: "데이터 모델링",
    subCategory: "관계",
    type: "SHORT_ANSWER",
    question:
      "부모 엔터티의 기본키가 자식 엔터티의 기본키(PK) 구성원으로 상속되는 강한 종속 관계의 명칭을 쓰시오.",
    answer: ["식별 관계", "Identifying Relationship"],
    explanation:
      "식별 관계는 실선으로 표기하며, 자식 엔터티는 부모의 기본키를 자신의 복합 기본키 일부로 포함합니다.",
    difficulty: "MEDIUM",
    keywords: ["ERD", "식별관계", "기본키상속"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_054",
    subject: "데이터베이스구축",
    category: "데이터 모델링",
    subCategory: "관계",
    type: "SHORT_ANSWER",
    question:
      "부모 엔터티의 기본키가 자식 엔터티의 기본키가 아닌 일반 외래키(일반 속성)로만 상속되는 느슨한 참조 관계의 명칭을 쓰시오.",
    answer: ["비식별 관계", "Non-identifying Relationship"],
    explanation:
      "비식별 관계는 점선으로 표기하며, 자식 엔터티는 독립적인 기본키를 가지고 부모 기본키는 단순 참조용 외래키로 유지합니다.",
    difficulty: "MEDIUM",
    keywords: ["ERD", "비식별관계", "일반속성상속"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_055",
    subject: "데이터베이스구축",
    category: "데이터 모델링",
    subCategory: "용어",
    type: "SHORT_ANSWER",
    question:
      "관계형 데이터 모델에서 릴레이션을 구성하는 속성(열, Attribute)의 총 개수를 뜻하는 용어의 명칭을 쓰시오.",
    answer: ["차수", "Degree"],
    explanation:
      "속성의 수는 차수(Degree)이고, 튜플(행)의 총 개수는 카디널리티(Cardinality, 기수)입니다.",
    difficulty: "EASY",
    keywords: ["관계형모델", "차수", "Degree", "속성수"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_056",
    subject: "데이터베이스구축",
    category: "SQL",
    subCategory: "DDL",
    type: "SHORT_ANSWER",
    question:
      "테이블의 데이터는 모두 삭제하면서 물리적 저장 공간까지 초기화하고, DML인 DELETE와 달리 롤백이 불가능한 DDL 명령어의 명칭을 쓰시오.",
    answer: ["TRUNCATE", "TRUNCATE TABLE", "트렁케이트"],
    explanation:
      "TRUNCATE는 테이블 구조는 유지하면서 데이터 전체를 빠르게 삭제(공간 반환)하며 로그를 최소화하여 롤백이 불가합니다.",
    difficulty: "EASY",
    keywords: ["SQL", "TRUNCATE", "DDL", "롤백불가"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_057",
    subject: "데이터베이스구축",
    category: "SQL",
    subCategory: "윈도우 함수",
    type: "SHORT_ANSWER",
    question:
      "SQL에서 결과 행의 순위를 부여할 때 동일한 값이 나오면 같은 등수를 부여하고, 그 다음 등수는 건너뛰지 않고 연속해서 부여하는 윈도우 함수의 명칭을 쓰시오.",
    answer: ["DENSE_RANK", "DENSE_RANK()", "덴스 랭크"],
    explanation:
      "RANK는 1, 2, 2, 4 순으로 건너뛰고, DENSE_RANK는 1, 2, 2, 3 순으로 연속 등수를 부여합니다. ROW_NUMBER는 1, 2, 3, 4 고유 번호를 줍니다.",
    difficulty: "MEDIUM",
    keywords: ["SQL", "DENSE_RANK", "윈도우함수", "순위함수"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_058",
    subject: "데이터베이스구축",
    category: "SQL",
    subCategory: "윈도우 함수",
    type: "SHORT_ANSWER",
    question:
      "SQL 순위 함수 중 동일한 값이 있더라도 중복 등수 없이 각 행에 1부터 시작하는 고유한 일련번호를 순차 부여하는 함수의 명칭을 쓰시오.",
    answer: ["ROW_NUMBER", "ROW_NUMBER()", "로우 넘버"],
    explanation:
      "ROW_NUMBER()는 정렬 순서에 따라 각 행에 1씩 증가하는 유일한 번호를 매깁니다.",
    difficulty: "EASY",
    keywords: ["SQL", "ROW_NUMBER", "일련번호"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_059",
    subject: "데이터베이스구축",
    category: "SQL",
    subCategory: "DCL",
    type: "SHORT_ANSWER",
    question:
      "데이터베이스 사용자에게 특정 테이블의 SELECT, INSERT 등의 권한을 부여하는 DCL 명령어의 명칭을 쓰시오.",
    answer: ["GRANT", "grant", "그랜트"],
    explanation:
      "권한을 부여할 때는 GRANT 문을 사용하고, 부여했던 권한을 회수할 때는 REVOKE 문을 사용합니다.",
    difficulty: "EASY",
    keywords: ["SQL", "GRANT", "DCL", "권한부여"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_060",
    subject: "데이터베이스구축",
    category: "SQL",
    subCategory: "DCL",
    type: "SHORT_ANSWER",
    question:
      "사용자에게 부여했던 데이터베이스 권한을 다시 회수(취소)하는 SQL 제어어(DCL) 명령어의 명칭을 쓰시오.",
    answer: ["REVOKE", "revoke", "리보크"],
    explanation:
      "REVOKE 권한 ON 객체 FROM 사용자 [CASCADE | RESTRICT] 문법으로 권한을 철회합니다.",
    difficulty: "EASY",
    keywords: ["SQL", "REVOKE", "DCL", "권한회수"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_061",
    subject: "데이터베이스구축",
    category: "트랜잭션",
    subCategory: "상태 전이",
    type: "SHORT_ANSWER",
    question:
      "트랜잭션의 5가지 상태(활동, 부분 완료, 완료, 실패, 철회) 중 마지막 연산까지 정상 수행되었으나 커밋 연산 직전인 상태의 명칭을 쓰시오.",
    answer: ["부분 완료", "Partially Committed", "부분완료"],
    explanation:
      "부분 완료(Partially Committed)는 모든 명령문 실행이 끝났으나 디스크 로그 기록 및 Commit 반영이 아직 완료되지 않은 상태입니다.",
    difficulty: "MEDIUM",
    keywords: ["트랜잭션", "부분완료", "상태전이"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_062",
    subject: "데이터베이스구축",
    category: "시스템 카탈로그",
    subCategory: "데이터 사전",
    type: "SHORT_ANSWER",
    question:
      "데이터베이스에 저장된 테이블, 뷰, 인덱스, 사용자 권한 등 데이터에 관한 데이터(메타데이터, Metadata)를 저장하고 관리하는 시스템 전용 테이블들의 집합 명칭을 쓰시오.",
    answer: [
      "데이터 사전",
      "시스템 카탈로그",
      "Data Dictionary",
      "System Catalog",
    ],
    explanation:
      "데이터 사전(시스템 카탈로그)은 사용자가 직접 갱신할 수 없으며 DDL 문이 실행될 때 DBMS에 의해 자동으로 갱신됩니다.",
    difficulty: "EASY",
    keywords: ["데이터사전", "시스템카탈로그", "메타데이터", "DataDictionary"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_063",
    subject: "데이터베이스구축",
    category: "SQL",
    subCategory: "DDL",
    type: "SHORT_ANSWER",
    question:
      "이미 생성된 테이블의 컬럼을 새로 추가하거나(ADD), 기존 컬럼의 데이터 타입을 변경하거나(MODIFY/ALTER), 불필요한 컬럼을 삭제(DROP)할 때 사용하는 DDL 명령어의 명칭을 쓰시오.",
    answer: ["ALTER TABLE", "ALTER", "알터 테이블"],
    explanation:
      "ALTER TABLE 문은 테이블 스키마 구조를 변경할 때 사용하는 데이터 정의어(DDL)입니다.",
    difficulty: "EASY",
    keywords: ["SQL", "ALTERTABLE", "DDL", "테이블수정"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_DB_064",
    subject: "데이터베이스구축",
    category: "SQL",
    subCategory: "트리거",
    type: "SHORT_ANSWER",
    question:
      "특정 테이블에 INSERT, UPDATE, DELETE 같은 DML 문이 실행될 때 데이터베이스 시스템에 의해 자동으로 실행되도록 작성된 절차형 SQL 객체의 명칭을 쓰시오.",
    answer: ["트리거", "Trigger"],
    explanation:
      "트리거는 데이터 무결성 강제, 자동 변경 이력(Audit) 기록 등에 사용되며 COMMIT이나 ROLLBACK을 직접 실행할 수 없습니다.",
    difficulty: "EASY",
    keywords: ["SQL", "트리거", "Trigger", "절차형SQL"],
    source: "정보처리기사 실기 표준",
  },
];
