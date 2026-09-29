import { Question } from '../../types/question';

export interface ArchivedQuestion extends Question {
  archiveDate: string;
  questionCode: string;
  duplicateOf: string;
  archiveReason: string;
}

/**
 * 2026-09-29 전수 품질감사 결과 중복/비활성화 처리된 아카이브 문항 보존소.
 * 운영 문제은행(ALL_QUESTIONS)에서는 안전하게 제외되나 원본 데이터와 questionCode는 100% 영구 보존됩니다.
 * 총 18문항 보존 중.
 */
export const ARCHIVED_QUESTIONS: ArchivedQuestion[] = [
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
    "source": "정보처리기사 실기 표준",
    "archiveDate": "2026-09-29",
    "questionCode": "Q-093",
    "duplicateOf": "Q-018 (SE_005)",
    "archiveReason": "실제 기출 SE_005(옵서버 패턴)와 개념 및 정의 사실상 동일 복제"
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
    "source": "정보처리기사 실기 표준",
    "archiveDate": "2026-09-29",
    "questionCode": "Q-118",
    "duplicateOf": "Q-016 (SE_003)",
    "archiveReason": "실제 기출 SE_003(기능적 응집도)과 지문 및 출제 의도 단순 중복"
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
    "source": "정보처리기사 실기 표준",
    "archiveDate": "2026-09-29",
    "questionCode": "Q-140",
    "duplicateOf": "Q-010 (DB_003)",
    "archiveReason": "실제 기출 DB_003(개체 무결성)과 제약조건 정의 단순 중복"
  },
  {
    "id": "EXP_SE1_020",
    "subject": "소프트웨어설계",
    "category": "럼바우 분석",
    "type": "SHORT_ANSWER",
    "question": "럼바우(Rumbaugh) 객체지향 분석 기법의 3대 모델링 중 자료 흐름도(DFD)를 주 도구로 사용하여 입력에 따른 데이터 처리와 계산 과정을 표현하는 모델링은 무엇인가?",
    "answer": "기능 모델링",
    "explanation": "기능 모델링(Functional Modeling)은 DFD를 사용합니다. 상태 다이어그램을 쓰는 것은 동적 모델링, ERD/객체도를 쓰는 것은 객체 모델링입니다.",
    "difficulty": "EASY",
    "keywords": [
      "기능 모델링",
      "DFD",
      "자료흐름도"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-rumbaugh",
    "archiveDate": "2026-09-29",
    "questionCode": "Q-402",
    "duplicateOf": "Q-074 (MEMO_SE_060)",
    "archiveReason": "선행 MEMO_SE_060(럼바우 DFD 기능 모델링)과 65% 이상 어구 일치 중복"
  },
  {
    "id": "EXP_SE1_033",
    "subject": "소프트웨어설계",
    "category": "모듈화",
    "type": "SHORT_ANSWER",
    "question": "모듈 내부의 모든 기능 요소들이 하나의 단일한 목적이나 기능을 수행하기 위해 밀접하게 뭉쳐있는 가장 이상적이고 응집도가 높은 단계는 무엇인가?",
    "answer": "기능적 응집도",
    "explanation": "기능적 응집도(Functional Cohesion)는 모듈의 모든 구성요소가 오직 하나의 고유 기능만을 수행하는 가장 이상적인 응집도입니다.",
    "difficulty": "EASY",
    "keywords": [
      "기능적 응집도",
      "Functional Cohesion",
      "최고응집도"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-cohesion",
    "archiveDate": "2026-09-29",
    "questionCode": "Q-415",
    "duplicateOf": "Q-016 (SE_003)",
    "archiveReason": "기출 SE_003 및 MEMO_SE_050에 이은 기능적 응집도 3차 단순 중복"
  },
  {
    "id": "EXP_SE1_034",
    "subject": "소프트웨어설계",
    "category": "모듈화",
    "type": "SHORT_ANSWER",
    "question": "모듈 내부의 요소들이 서로 아무런 관련성 없이 우연히 한 모듈 안에 모여 있는 응집도가 가장 낮고 나쁜 단계는 무엇인가?",
    "answer": "우연적 응집도",
    "explanation": "우연적 응집도(Coincidental Cohesion)는 전혀 관련 없는 작업들이 단지 모듈 크기를 줄이기 위해 묶인 가장 나쁜 상태입니다.",
    "difficulty": "EASY",
    "keywords": [
      "우연적 응집도",
      "Coincidental Cohesion",
      "최저응집도"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-cohesion",
    "archiveDate": "2026-09-29",
    "questionCode": "Q-416",
    "duplicateOf": "Q-067 (MEMO_SE_053)",
    "archiveReason": "선행 MEMO_SE_053(우연적 응집도)과 65% 이상 어구 일치 단순 중복"
  },
  {
    "id": "EXP_SE1_036",
    "subject": "소프트웨어설계",
    "category": "모듈화",
    "type": "SHORT_ANSWER",
    "question": "동일한 입력 데이터를 사용하여 서로 다른 여러 기능을 수행하거나, 동일한 출력 데이터를 산출해내는 모듈의 응집도 단계는 무엇인가?",
    "answer": "통신적 응집도",
    "explanation": "통신적 응집도(Communicational Cohesion, 교환적 응집도)는 모듈 내 구성요소들이 동일한 입출력 데이터를 공유할 때 나타납니다.",
    "difficulty": "MEDIUM",
    "keywords": [
      "통신적 응집도",
      "교환적 응집도",
      "입출력공유"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-cohesion",
    "archiveDate": "2026-09-29",
    "questionCode": "Q-418",
    "duplicateOf": "Q-066 (MEMO_SE_052)",
    "archiveReason": "선행 MEMO_SE_052(통신적 응집도)와 지문 표현 사실상 동일"
  },
  {
    "id": "EXP_SE1_038",
    "subject": "소프트웨어설계",
    "category": "모듈화",
    "type": "SHORT_ANSWER",
    "question": "한 모듈이 다른 모듈의 내부 코드, 지역 변수, 논리적 제어 흐름을 직접 참조하거나 수정하여 결합도가 가장 높고 가장 위험한 단계는 무엇인가?",
    "answer": "내용 결합도",
    "explanation": "내용 결합도(Content Coupling)는 모듈 내부를 직접 침범하는 최악의 결합도입니다.",
    "difficulty": "EASY",
    "keywords": [
      "내용 결합도",
      "Content Coupling",
      "최악결합도"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-coupling",
    "archiveDate": "2026-09-29",
    "questionCode": "Q-420",
    "duplicateOf": "Q-061 (MEMO_SE_047)",
    "archiveReason": "선행 MEMO_SE_047(내용 결합도)과 모듈 내부 참조 정의 중복"
  },
  {
    "id": "EXP_SE1_039",
    "subject": "소프트웨어설계",
    "category": "모듈화",
    "type": "SHORT_ANSWER",
    "question": "여러 모듈이 동일한 전역 변수나 글로벌 데이터 영역을 함께 공유하여 참조하고 갱신하는 모듈 간 결합도 단계는 무엇인가?",
    "answer": "공통 결합도",
    "explanation": "공통 결합도(Common Coupling)는 전역 변수 공유로 인해 한 모듈의 수정이 다른 모든 모듈에 파급될 위험이 큽니다.",
    "difficulty": "EASY",
    "keywords": [
      "공통 결합도",
      "Common Coupling",
      "전역변수"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-se-coupling",
    "archiveDate": "2026-09-29",
    "questionCode": "Q-421",
    "duplicateOf": "Q-062 (MEMO_SE_048)",
    "archiveReason": "선행 MEMO_SE_048(공통 결합도)과 전역변수 공유 정의 중복"
  },
  {
    "id": "EXP_DB1_030",
    "subject": "데이터베이스구축",
    "category": "SQL DCL",
    "type": "SHORT_ANSWER",
    "question": "데이터베이스 사용자에게 부여했던 특정 권한을 다시 회수(취소)할 때 사용하는 DCL 명령어는 무엇인가?",
    "answer": "REVOKE",
    "explanation": "REVOKE는 권한을 회수하며 CASCADE 옵션을 주면 해당 사용자가 다른 사용자에게 연쇄 부여한 권한도 함께 회수됩니다.",
    "difficulty": "EASY",
    "keywords": [
      "REVOKE",
      "권한회수",
      "DCL"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-dcl",
    "archiveDate": "2026-09-29",
    "questionCode": "Q-511",
    "duplicateOf": "Q-129 (MEMO_DB_060)",
    "archiveReason": "선행 MEMO_DB_060(REVOKE 권한 회수)과 DCL 기능 단순 중복"
  },
  {
    "id": "EXP_DB2_009",
    "subject": "데이터베이스구축",
    "category": "물리 데이터베이스",
    "type": "SHORT_ANSWER",
    "question": "인덱스의 리프 블록에 실제 데이터 행 대신 데이터의 물리적 위치 주소(RID/ROWID)를 저장하여 테이블당 여러 개를 자유롭게 생성할 수 있는 인덱스는 무엇인가?",
    "answer": "넌클러스터드 인덱스",
    "explanation": "넌클러스터드 인덱스(Non-Clustered Index, 보조 인덱스)는 별도의 인덱스 페이지를 구성하여 실제 데이터 위치를 포인터로 가리킵니다.",
    "difficulty": "EASY",
    "keywords": [
      "넌클러스터드 인덱스",
      "Non-Clustered",
      "ROWID"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-index",
    "archiveDate": "2026-09-29",
    "questionCode": "Q-539",
    "duplicateOf": "Q-114 (MEMO_DB_045)",
    "archiveReason": "선행 MEMO_DB_045(넌클러스터드 인덱스)와 포인터 인덱스 정의 중복"
  },
  {
    "id": "EXP_DB2_024",
    "subject": "데이터베이스구축",
    "category": "키(Key)의 개념",
    "type": "SHORT_ANSWER",
    "question": "여러 후보키(Candidate Key) 중에서 기본키(Primary Key)로 선택되지 못하고 남은 나머지 후보키들을 가리키는 용어는 무엇인가?",
    "answer": "대체키",
    "explanation": "대체키(Alternate Key, 보조키)는 언제든 기본키가 될 수 있는 자격을 갖춘 예비 후보키입니다.",
    "difficulty": "EASY",
    "keywords": [
      "대체키",
      "Alternate Key",
      "후보키잔여"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-keys",
    "archiveDate": "2026-09-29",
    "questionCode": "Q-554",
    "duplicateOf": "Q-090 (MEMO_DB_021)",
    "archiveReason": "선행 MEMO_DB_021(대체키)과 기본키 미선정 후보키 정의 중복"
  },
  {
    "id": "EXP_DB2_027",
    "subject": "데이터베이스구축",
    "category": "데이터 무결성",
    "type": "SHORT_ANSWER",
    "question": "데이터베이스의 기본키(Primary Key)는 어떠한 경우에도 NULL 값을 가질 수 없으며 릴레이션 내에서 중복될 수 없다는 무결성 규칙은 무엇인가?",
    "answer": "개체 무결성",
    "explanation": "개체 무결성(Entity Integrity)은 테이블 내의 모든 튜플을 유일하게 식별할 수 있도록 기본키가 유효한 값을 가져야 함을 규정합니다.",
    "difficulty": "EASY",
    "keywords": [
      "개체 무결성",
      "Entity Integrity",
      "기본키규칙"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-db-integrity",
    "archiveDate": "2026-09-29",
    "questionCode": "Q-557",
    "duplicateOf": "Q-010 (DB_003)",
    "archiveReason": "기출 DB_003에 이은 기본키 널/중복 불가 개체 무결성 3차 중복"
  },
  {
    "id": "EXP_IS_026",
    "subject": "정보시스템구축관리",
    "category": "스토리지 시스템",
    "type": "SHORT_ANSWER",
    "question": "RAID 레벨 중 최소 3개 이상의 디스크가 필요하며, 패리티(Parity) 정보를 모든 디스크에 분산 저장하여 1개의 디스크 고장 시 복구 가능한 가장 널리 쓰이는 레벨은 무엇인가?",
    "answer": "RAID 5",
    "explanation": "RAID 5는 분산 패리티를 사용하여 성능과 가용성을 균형 있게 충족합니다.",
    "difficulty": "EASY",
    "keywords": [
      "RAID 5",
      "분산패리티",
      "최소3개디스크"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-storage",
    "archiveDate": "2026-09-29",
    "questionCode": "Q-606",
    "duplicateOf": "Q-262 (MEMO_IS_044)",
    "archiveReason": "선행 MEMO_IS_044(RAID 5 패리티 분산 저장)와 63% 어구 일치 중복"
  },
  {
    "id": "EXP_IS_046",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스팅",
    "type": "SHORT_ANSWER",
    "question": "하향식 통합 테스트(Top-down Test) 수행 시 아직 개발되지 않은 하위 모듈의 역할을 흉내 내어 호출 결과를 반환해주는 가상 임시 모듈을 무엇이라 하는가?",
    "answer": "스텁",
    "explanation": "스텁(Stub)은 하향식 테스트에서 하위 모듈의 대역으로 쓰입니다. 상향식 테스트에서 상위 모듈 역할을 하는 것은 드라이버(Driver)입니다.",
    "difficulty": "EASY",
    "keywords": [
      "스텁",
      "Stub",
      "하향식테스트"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-testing",
    "archiveDate": "2026-09-29",
    "questionCode": "Q-625",
    "duplicateOf": "Q-239 (MEMO_IS_021)",
    "archiveReason": "선행 MEMO_IS_021(하향식 통합 테스트 스텁)과 임시 가상 모듈 정의 중복"
  },
  {
    "id": "EXP_IS_049",
    "subject": "정보시스템구축관리",
    "category": "소프트웨어 테스팅",
    "type": "SHORT_ANSWER",
    "question": "테스트의 기본 원칙 중 동일한 테스트 케이스로 반복 테스트를 수행하면 더 이상 새로운 결함을 찾아낼 수 없으므로 케이스를 지속적으로 갱신해야 한다는 원칙은 무엇인가?",
    "answer": "살충제 패러독스",
    "explanation": "살충제 패러독스(Pesticide Paradox)는 테스트 케이스를 정기적으로 개선하고 리뷰해야 함을 강조합니다.",
    "difficulty": "EASY",
    "keywords": [
      "살충제 패러독스",
      "Pesticide Paradox",
      "테스트원칙"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-is-testing",
    "archiveDate": "2026-09-29",
    "questionCode": "Q-628",
    "duplicateOf": "Q-241 (MEMO_IS_023)",
    "archiveReason": "선행 MEMO_IS_023(살충제 패러독스)과 반복 테스트 결함 미발견 정의 중복"
  },
  {
    "id": "EXP_SEC2_017",
    "subject": "신기술/보안",
    "category": "DoS 공격",
    "type": "SHORT_ANSWER",
    "question": "공격자가 패킷의 출발지 IP 주소를 피해자 서버의 IP로 위조한 후, 다이렉트 브로드캐스트 주소로 대량의 ICMP Echo Request를 전송하여 네트워크 내의 모든 호스트가 피해자에게 동시에 응답(Reply)을 쏟아붓게 만드는 DoS 공격은 무엇인가?",
    "answer": "스머프",
    "explanation": "스머핑(Smurfing)은 ICMP 증폭 공격으로 라우터에서 다이렉트 브로드캐스트 차단을 통해 방어합니다.",
    "difficulty": "EASY",
    "keywords": [
      "스머프",
      "Smurf",
      "ICMP증폭공격"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-dos",
    "archiveDate": "2026-09-29",
    "questionCode": "Q-736",
    "duplicateOf": "Q-200 (MEMO_SEC_032)",
    "archiveReason": "선행 MEMO_SEC_032(스머프 DoS 브로드캐스트)와 64% 어구 일치 중복"
  },
  {
    "id": "EXP_SEC2_018",
    "subject": "신기술/보안",
    "category": "DoS 공격",
    "type": "SHORT_ANSWER",
    "question": "규격 허용 최대 크기(65,535 바이트)를 초과하는 거대한 ICMP 패킷을 수많은 작은 조각(Fragment)으로 분할 전송하여 수신 측이 이를 재조합하는 과정에서 버퍼 오버플로우와 다운을 유발하는 공격은 무엇인가?",
    "answer": "Ping of Death",
    "explanation": "Ping of Death(죽음의 핑)는 거대 ICMP 패킷의 재조합 취약점을 악용합니다.",
    "difficulty": "EASY",
    "keywords": [
      "Ping of Death",
      "죽음의핑",
      "거대패킷공격"
    ],
    "source": "VERIFIED_CORE",
    "chapterId": "ch-sec-dos",
    "archiveDate": "2026-09-29",
    "questionCode": "Q-737",
    "duplicateOf": "Q-201 (MEMO_SEC_033)",
    "archiveReason": "선행 MEMO_SEC_033(Ping of Death 거대 ICMP)과 58% 어구 일치 중복"
  }
];
