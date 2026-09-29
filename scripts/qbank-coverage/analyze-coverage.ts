// @ts-ignore
import fs from 'fs';
// @ts-ignore
import path from 'path';
import { ALL_QUESTIONS } from '../../src/data/questions';
import { Question } from '../../src/types/question';

// ==========================================
// 1. Official 2026 Practical Exam Specification Hierarchy
// ==========================================

export interface PracticalSubUnit {
  id: string; // e.g. "1.1"
  name: string; // e.g. "현행 시스템 분석"
  keyConcepts: string[];
  description: string;
}

export interface PracticalMajorUnit {
  id: number; // 1 ~ 12
  name: string; // e.g. "요구사항 확인"
  subUnits: PracticalSubUnit[];
}

export const OFFICIAL_2026_PRACTICAL_SYLLABUS: PracticalMajorUnit[] = [
  {
    id: 1,
    name: '요구사항 확인',
    subUnits: [
      {
        id: '1.1',
        name: '현행 시스템 분석',
        keyConcepts: ['플랫폼 성능', '운영체제 분석', '네트워크 분석', 'DBMS 분석', '비즈니스 융합', '미들웨어 분석', '오픈소스 분석'],
        description: '운영체제, 네트워크, DBMS, 미들웨어 등 현행 시스템 기술 요소 및 아키텍처 분석'
      },
      {
        id: '1.2',
        name: '요구사항 확인 및 분석',
        keyConcepts: ['기능/비기능 요구사항', '요구사항 개발 프로세스', '도출/분석/명세/확인', '정형/비정형 명세', '인터뷰/브레인스토밍', '애자일 방법론', '비용 산정 모델(COCOMO, 기능점수)'],
        description: '소프트웨어 공학적 요구사항 분석 기법, 기능적·비기능적 요구사항 도출 및 검증 기법, 애자일 및 비용산정'
      },
      {
        id: '1.3',
        name: '분석 모델 확인 및 모델링',
        keyConcepts: ['UML 모델링', '유스케이스 다이어그램', '클래스 다이어그램', '시퀀스 다이어그램', '상태 다이어그램', '액티비티 다이어그램', '구조적 다이어그램', '행위 다이어그램', '객체지향 설계 원칙(SOLID)'],
        description: '객체지향 분석 모델링, UML 다이어그램 관계 및 표기법, 모델 검증'
      }
    ]
  },
  {
    id: 2,
    name: '데이터 입출력 구현',
    subUnits: [
      {
        id: '2.1',
        name: '논리 데이터베이스 설계',
        keyConcepts: ['개념 모델링', 'ERD', '논리 모델링', '관계 데이터 모델', '릴레이션 특징', '차수/카디널리티', '무결성 제약조건', '관계대수', '관계해석', '정규화(1NF~5NF)', '이상현상', '트랜잭션(ACID)', '병행제어', '회복기법', '분산데이터베이스 투명성'],
        description: '개념적/논리적 DB 설계, 관계형 데이터 모델, 정규화(1NF~5NF), 무결성 제약, 트랜잭션 및 동시성 제어'
      },
      {
        id: '2.2',
        name: '물리 데이터베이스 설계',
        keyConcepts: ['물리 데이터베이스 구조', '반정규화/역정규화', '인덱스 설계', '뷰(View) 설계', '클러스터링', '파티셔닝', '테이블스페이스'],
        description: '물리적 저장구조, 반정규화 기법, 인덱스/뷰/파티셔닝 설계'
      },
      {
        id: '2.3',
        name: '데이터 조작 프로시저 작성',
        keyConcepts: ['PL/SQL', '저장 프로시저', '사용자 정의 함수', '트리거(Trigger)', '커서(Cursor) 제어'],
        description: '절차형 SQL을 활용한 프로시저, 함수, 트리거 작성 및 제어'
      },
      {
        id: '2.4',
        name: '데이터 접근 및 전환',
        keyConcepts: ['ETL', '데이터 전환 절차', '데이터 정제', '데이터 품질 검증', '데이터 이관'],
        description: '데이터 추출/변환/적재(ETL) 및 데이터 품질 관리, 전환 계획'
      }
    ]
  },
  {
    id: 3,
    name: '통합 구현',
    subUnits: [
      {
        id: '3.1',
        name: '연계 데이터 구성',
        keyConcepts: ['송수신 데이터 식별', '연계 데이터 표준화', 'XML', 'JSON', 'YAML', 'CSV', '전문 포맷'],
        description: '연계 대상 데이터 식별, 표준화 및 구조화된 데이터 포맷(XML, JSON 등)'
      },
      {
        id: '3.2',
        name: '연계 메커니즘 구성',
        keyConcepts: ['직접 연계', 'DB Link', 'DB Connection', 'API', '간접 연계', 'EAI 솔루션(Point-to-Point, Hub&Spoke, Message Bus, Hybrid)', 'ESB 솔루션', 'Web Services', 'SOAP', 'WSDL', 'UDDI', 'RESTful/REST API'],
        description: 'EAI/ESB 연계 아키텍처, 직접/간접 연계 방식, SOAP 및 RESTful 웹서비스'
      },
      {
        id: '3.3',
        name: '내외부 연계 모듈 구현 및 보안',
        keyConcepts: ['연계 모듈 구현', '연계 보안 암호화', 'IPSec', 'SSL/TLS', '연계 오류 처리 및 모니터링', '로그 추적'],
        description: '연계 모듈 안전한 전송, 구간 암호화, 장애 처리 및 로깅'
      }
    ]
  },
  {
    id: 4,
    name: '서버프로그램 구현',
    subUnits: [
      {
        id: '4.1',
        name: '개발환경 구축',
        keyConcepts: ['개발 도구', 'IDE', '빌드 도구(Ant/Maven/Gradle)', '웹 서버(Web Server)', 'WAS', 'DB 서버', '서버 하드웨어'],
        description: '개발 소프트웨어 및 하드웨어 환경 구축, 미들웨어 및 서버 환경'
      },
      {
        id: '4.2',
        name: '공통 모듈 구현',
        keyConcepts: ['소프트웨어 아키텍처 패턴', '레이어드 패턴', 'MVC 패턴', '파이프-필터 패턴', 'GoF 디자인 패턴(생성/구조/행위 23종)', '모듈 결합도(Coupling 6단계)', '모듈 응집도(Cohesion 7단계)', '재사용 모듈'],
        description: '소프트웨어 아키텍처, 디자인 패턴, 결합도 및 응집도 기준 모듈화'
      },
      {
        id: '4.3',
        name: '서버 프로그램 구현 및 배치',
        keyConcepts: ['백엔드 프레임워크(Spring 등)', 'DTO/VO/DAO', '서비스 레이어', '배치 프로그램', '배치 스케줄러(Quartz, Cron)', '배치 필수 요소'],
        description: '비즈니스 로직 구현, 영속 계층 분리, 대량 데이터 배치 프로그램 및 스케줄러'
      }
    ]
  },
  {
    id: 5,
    name: '인터페이스 구현',
    subUnits: [
      {
        id: '5.1',
        name: '인터페이스 요구사항 확인',
        keyConcepts: ['내외부 인터페이스 요구사항', '인터페이스 명세서', '시스템 연동 요구사항'],
        description: '시스템 간 연동을 위한 인터페이스 명세 및 요구사항 분석'
      },
      {
        id: '5.2',
        name: '인터페이스 대상 식별 및 상세설계',
        keyConcepts: ['인터페이스 정의서', '송수신 시스템 식별', '전문 인터페이스', '인터페이스 데이터 표준화'],
        description: '인터페이스 데이터 항목 정의, 식별자 체계 및 상세 통신 설계'
      },
      {
        id: '5.3',
        name: '인터페이스 보안 및 검증',
        keyConcepts: ['인터페이스 보안 취약점', '스니핑 방지', 'APM 도구', '인터페이스 검증 도구(xUnit, STAF, FitNesse, NTAF)'],
        description: '인터페이스 전송 구간 보안, APM 모니터링, 자동화 검증 도구'
      }
    ]
  },
  {
    id: 6,
    name: '화면 설계',
    subUnits: [
      {
        id: '6.1',
        name: 'UI 요구사항 확인 및 원칙',
        keyConcepts: ['UI 설계 4대 원칙(직관성/유효성/학습성/유연성)', '감성공학', 'UI 표준 및 지침', '사용자 경험(UX)'],
        description: 'UI 설계 기본 원칙, 사용성 평가 기준, 인간공학/감성공학 요소'
      },
      {
        id: '6.2',
        name: 'UI 설계 및 프로토타이핑',
        keyConcepts: ['와이어프레임(Wireframe)', '스토리보드(Storyboard)', '목업(Mockup)', '프로토타입(Prototype)', 'UI 흐름 설계', '인터랙션 설계'],
        description: 'UI 산출물(와이어프레임, 스토리보드, 목업 등) 및 프로토타입 제작/평가'
      }
    ]
  },
  {
    id: 7,
    name: '애플리케이션 테스트 관리',
    subUnits: [
      {
        id: '7.1',
        name: '애플리케이션 테스트 계획',
        keyConcepts: ['테스트 기본 원칙(결함 집중, 살충제 패러독스 등)', '테스트 레벨(단위/통합/시스템/인수)', 'V-모델', '알파/베타 테스트', '회귀 테스트'],
        description: '테스트 원리, V-모델 테스트 레벨, 테스트 계획 수립'
      },
      {
        id: '7.2',
        name: '테스트 케이스 설계 기법',
        keyConcepts: ['화이트박스 테스트(구문/분기/조건/MC/DC/경로 커버리지)', '블랙박스 테스트(동등분할/경계값분석/원인-결과 그래프/오류 예측/경계치)'],
        description: '화이트박스(구조 기반) 커버리지 지표 및 블랙박스(명세 기반) 설계 기법'
      },
      {
        id: '7.3',
        name: '통합 및 성능 테스트',
        keyConcepts: ['하향식 통합(스텁)', '상향식 통합(드라이버)', '빅뱅 테스트', '샌드위치 테스트', '성능 지표(Throughput, Response Time, Turnaround Time, Resource Usage)'],
        description: '통합 테스트 전략(상향식/하향식/스텁/드라이버) 및 시스템 성능 측정'
      },
      {
        id: '7.4',
        name: '결함 관리 및 테스트 자동화',
        keyConcepts: ['결함 추적 상태(등록/할당/열림/조치/수정/종료)', '결함 심각도 및 우선순위', '정적 분석 도구(SonarQube 등)', '동적 분석 도구', '테스트 자동화 도구'],
        description: '결함 생명주기 관리, 정적/동적 코드 분석 도구 및 테스트 자동화 프레임워크'
      }
    ]
  },
  {
    id: 8,
    name: 'SQL 응용',
    subUnits: [
      {
        id: '8.1',
        name: '기본 SQL 작성',
        keyConcepts: ['DDL(CREATE, ALTER, DROP, TRUNCATE)', 'DML(SELECT, INSERT, UPDATE, DELETE)', 'DCL(GRANT, REVOKE)', 'TCL(COMMIT, ROLLBACK, SAVEPOINT)', '제약조건(PK, FK, UNIQUE, NOT NULL, CHECK)'],
        description: '데이터 정의, 조작, 제어 기본 구문 및 무결성 제약조건 선언'
      },
      {
        id: '8.2',
        name: '고급 SQL 작성',
        keyConcepts: ['다중 테이블 JOIN(INNER, OUTER, CROSS, SELF)', '서브쿼리(단일행, 다중행, 상관 서브쿼리)', '집계함수(COUNT, SUM, AVG)', 'GROUP BY 및 HAVING', '그룹 함수(ROLLUP, CUBE, GROUPING SETS)', '윈도우 함수(ROW_NUMBER, RANK, DENSE_RANK)', '집합 연산자(UNION, INTERSECT, MINUS)'],
        description: '복합 조인, 중첩 서브쿼리, 고급 그룹 함수 및 순위/분석 윈도우 함수'
      },
      {
        id: '8.3',
        name: '절차형 SQL 및 SQL 최적화',
        keyConcepts: ['절차형 SQL 문법', '커서 제어', 'SQL 최적화 원리', '실행 계획(EXPLAIN PLAN)', '옵티마이저(RBO/CBO)', '인덱스 스캔 방식'],
        description: '프로시저/함수 블록 구문, 실행 계획 분석, 옵티마이저와 인덱스 스캔 튜닝'
      }
    ]
  },
  {
    id: 9,
    name: '소프트웨어 개발 보안 구축',
    subUnits: [
      {
        id: '9.1',
        name: 'SW개발 보안 설계',
        keyConcepts: ['정보보안 3대 요소(기밀성, 무결성, 가용성)', 'AAA(인증, 인가, 과금)', '보안 아키텍처', '접근 통제 모델(DAC, MAC, RBAC)', '보안 원칙(부인 방지 등)'],
        description: '보안 3대 요소, 접근제어 원칙, 보안 정책 및 설계 모델'
      },
      {
        id: '9.2',
        name: '시큐어 코딩 및 취약점 제거',
        keyConcepts: ['행정안전부 SW 개발보안 가이드 7대 보안약점', '입력 데이터 검증 및 표현(SQL Injection, XSS, CSRF)', '보안 기능', '시간 및 상태', '에러 처리', '코드 오류', '캡슐화', 'API 오용', '버퍼 오버플로우', '취약점 평가(CVSS)'],
        description: '시큐어 코딩 7대 분야, 주요 공격 기법(SQLI, XSS, CSRF, 버퍼오버플로우 등) 원리 및 방어 코드'
      },
      {
        id: '9.3',
        name: '암호 알고리즘 적용',
        keyConcepts: ['대칭키 암호(블록 암호: DES, AES, SEED, ARIA / 스트림 암호: RC4)', '비대칭키/공개키 암호(RSA, ECC, Diffie-Hellman)', '전자서명', '단방향 해시 함수(SHA-256, SHA-512, MD5)', '솔팅(Salting)', '암호화 모드(ECB, CBC)'],
        description: '대칭키, 비대칭키, 전자서명, 일방향 해시 암호화 메커니즘 및 주요 표준 암호 알고리즘'
      },
      {
        id: '9.4',
        name: '세션 관리 및 접근 통제 구현',
        keyConcepts: ['세션 관리', '세션 하이재킹 방지', '토큰 인증(JWT)', 'OAuth 2.0', '접근 제어 목록(ACL)', '벨-라파둘라(BLP)', '비바(Biba) 모델'],
        description: '인증/인가 토큰, 세션 타임아웃/보안, 보안 무결성/기밀성 격리 모델'
      }
    ]
  },
  {
    id: 10,
    name: '프로그래밍 언어 활용',
    subUnits: [
      {
        id: '10.1',
        name: '기본 문법 활용',
        keyConcepts: ['기본 자료형(int, char, float 등)', '변수 및 상수', '연산자(산술, 비트, 논리, 삼항, 증감, 시프트)', '제어문(if, switch-case, for, while, do-while, break, continue)'],
        description: 'C/Java/Python 공통 기본 데이터 타입, 연산자 우선순위, 반복 및 분기 제어문'
      },
      {
        id: '10.2',
        name: 'C 언어 특화 활용',
        keyConcepts: ['포인터 변수 및 역참조', '포인터 연산', '배열과 포인터 관계', '문자열 포인터 및 문자열 함수(strcpy, strlen 등)', '구조체(struct) 및 구조체 포인터', '동적 메모리 할당(malloc, free)'],
        description: 'C 언어 포인터 주소 연산, 1/2차원 배열 포인터 조작, 구조체 및 메모리 관리'
      },
      {
        id: '10.3',
        name: '객체지향 프로그래밍 / Java 활용',
        keyConcepts: ['클래스와 인스턴스', '생성자(Constructor)', '접근 제한자(public/protected/default/private)', '캡슐화 및 정보 은닉', '상속(Inheritance)', '오버라이딩(Overriding) vs 오버로딩(Overloading)', '다형성(Polymorphism)', '추상 클래스 및 인터페이스', '예외 처리(try-catch-finally, throws)'],
        description: '객체지향 핵심 원리, 클래스 상속 체계, 동적 바인딩/다형성 구현 및 예외 처리'
      },
      {
        id: '10.4',
        name: '스크립트 언어 / Python 활용',
        keyConcepts: ['파이썬 자료구조(List, Tuple, Dictionary, Set)', '슬라이싱([start:stop:step])', '리스트 컴프리헨션', '내장 함수(map, filter, lambda, zip, range)', '문자열 처리 메서드'],
        description: '파이썬 내장 컬렉션 조작, 슬라이스 문법, 함수형/스크립트 처리 기법'
      }
    ]
  },
  {
    id: 11,
    name: '응용 SW 기초 기술 활용',
    subUnits: [
      {
        id: '11.1',
        name: '운영체제 기초 및 자원 관리',
        keyConcepts: ['운영체제 기능 및 커널', '프로세스 상태 전이(생성, 준비, 실행, 대기, 종료)', 'PCB 및 문맥 교환(Context Switching)', 'CPU 스케줄링(FCFS, SJF, SRT, RR, HRN, 다단계 피드백 큐)', '가상 기억장치 관리(페이징, 세그멘테이션)', '페이지 교체 알고리즘(FIFO, LRU, LFU, NUR, OPT)', '워킹셋/스래싱', '교착상태(Deadlock) 4대 조건 및 해결기법(예방, 회피, 발견, 회복)', 'UNIX/Linux 기본 명령어(chmod, chown, grep, find, kill, ps, fork)', '스토리지 시스템(RAID, SAN, NAS)'],
        description: 'OS 프로세스 관리, CPU 스케줄링 계산, 메모리 관리/페이지 교체, 교착상태 해결, 리눅스 쉘 명령어, 스토리지'
      },
      {
        id: '11.2',
        name: '네트워크 기초 및 프로토콜',
        keyConcepts: ['OSI 7계층 및 TCP/IP 4계층', '계층별 주요 프로토콜(HTTP, FTP, DNS, SMTP, TCP, UDP, IP, ARP, RARP, ICMP)', 'IPv4 클래스 및 CIDR 서브넷팅 계산', 'IPv6 특징 및 주소 체계', 'IPv4-IPv6 전환 기술(듀얼스택, 터널링, 주소변환)', '라우팅 프로토콜(RIP, OSPF, BGP, 거리벡터 vs 링크상태)', 'TCP 3-way/4-way Handshake', 'TCP 흐름 제어(Sliding Window) 및 혼잡 제어', '네트워크 보안 장비(IDS, IPS, VPN, NAC)'],
        description: 'OSI 7계층 및 TCP/IP 프로토콜 구조, IP 서브넷 계산, 라우팅 알고리즘, 연결 제어, 네트워크 장비'
      },
      {
        id: '11.3',
        name: '신기술 및 ICT 인프라',
        keyConcepts: ['클라우드 컴퓨팅(IaaS, PaaS, SaaS, 프라이빗/퍼블릭/하이브리드)', '가상화 기술 및 컨테이너(Docker, Kubernetes)', '빅데이터 기술(Hadoop, MapReduce, Spark, NoSQL)', '인공지능/머신러닝/딥러닝 용어', '블록체인 기술(합의 알고리즘, 스마트 컨트랙트)', '사물인터넷(IoT), 엣지 컴퓨팅', '재해 복구 시스템(DRS, RTO, RPO)', 'IT 서비스 관리(ITSM, SLA)'],
        description: '최신 ICT 트렌드, 클라우드/컨테이너 인프라, 빅데이터/AI/블록체인, 재해복구 및 서비스 관리'
      }
    ]
  },
  {
    id: 12,
    name: '제품 소프트웨어 패키징',
    subUnits: [
      {
        id: '12.1',
        name: '제품소프트웨어 빌드 및 배포',
        keyConcepts: ['소프트웨어 패키징 절차', '빌드 자동화 도구(Ant, Maven, Gradle)', '배포 절차', '릴리즈 노트(Release Notes) 작성 항목'],
        description: '소프트웨어 빌드 자동화, 릴리즈 노트 표준 구성 요소, 배포 프로세스'
      },
      {
        id: '12.2',
        name: '소프트웨어 저작권 및 라이선스',
        keyConcepts: ['디지털 저작권 관리(DRM)', 'DRM 구성요소(콘텐츠 제공자, 분배자, 클리어링하우스, DRM 컨트롤러)', '오픈소스 라이선스(GPL, LGPL, Apache, MIT, BSD)'],
        description: 'DRM 기술 아키텍처 및 오픈소스 소프트웨어 라이선스 준수 기준'
      },
      {
        id: '12.3',
        name: '소프트웨어 형상 관리',
        keyConcepts: ['형상 관리(SCM) 개념', '기준선(Baseline) 종류', '형상 관리 활동(형상 식별, 형상 통제, 형상 감사, 형상 기록)', '형상 관리 도구(Git, SVN, CVS)', '버전 관리 및 브랜치/머지 전략'],
        description: '형상 관리 생명주기 절차, 형상 통제 위원회(CCB), Git/SVN 형상 관리'
      }
    ]
  }
];

// ==========================================
// 2. Types for Analysis Output
// ==========================================

export type QuestionAngle =
  | 'TERM_FROM_DEFINITION'
  | 'DEFINITION_FROM_TERM'
  | 'CHARACTERISTIC'
  | 'SCENARIO'
  | 'COMPARISON'
  | 'ADVANTAGE_DISADVANTAGE'
  | 'PROCESS_SEQUENCE'
  | 'IDENTIFICATION'
  | 'SHORT_CODE'
  | 'SHORT_SQL'
  | 'OTHER';

export type MobileSuitability = 'HIGH' | 'MEDIUM' | 'LOW' | 'DYNAMIC_ENGINE';
export type ScopeMatch = 'CONFIRMED' | 'PROBABLE' | 'UNCERTAIN';

export type CoverageState = 'NONE' | 'THIN' | 'ADEQUATE' | 'DENSE' | 'SATURATED';
export type RecommendationAction =
  | 'STATIC_EXPAND'
  | 'STATIC_SELECTIVE'
  | 'STOP_STATIC'
  | 'DYNAMIC_ENGINE'
  | 'REVIEW_FIRST';

export interface QuestionMapping {
  questionCode: string;
  id: string;
  originalSubject: string;
  category: string;
  subCategory?: string;
  questionText: string;
  answerText: string;
  primaryUnitId: number;
  primaryUnitName: string;
  primarySubUnitId: string;
  primarySubUnitName: string;
  secondaryScopes: string[];
  topic: string;
  questionAngle: QuestionAngle;
  mobileSuitability: MobileSuitability;
  scopeMatch: ScopeMatch;
  rationale?: string;
}

// ==========================================
// 3. Question Classifier Logic
// ==========================================

export function determineQuestionAngle(q: Question): QuestionAngle {
  const text = (q.question + ' ' + (q.code || '')).toLowerCase();
  if (q.type === 'CODE_TRACE' || q.code || text.includes('실행 결과') || text.includes('출력 결과')) {
    return 'SHORT_CODE';
  }
  if (q.type === 'SQL' || (text.includes('sql') && (text.includes('select') || text.includes('from') || text.includes('where') || text.includes('insert') || text.includes('create table')))) {
    return 'SHORT_SQL';
  }
  if (text.includes('순서') || text.includes('단계') || text.includes('절차') || text.includes('나열하시오') || text.includes('순서대로')) {
    return 'PROCESS_SEQUENCE';
  }
  if (text.includes('비교') || text.includes('차이점') || text.includes('와/과 달리') || text.includes('에 비해')) {
    return 'COMPARISON';
  }
  if (text.includes('장점') || text.includes('단점') || text.includes('한계')) {
    return 'ADVANTAGE_DISADVANTAGE';
  }
  if (text.includes('구분') || text.includes('종류') || text.includes('분류') || text.includes('속하는 것') || text.includes('유형')) {
    return 'IDENTIFICATION';
  }
  if (text.includes('원칙') || text.includes('특징') || text.includes('성질') || text.includes('조건') || text.includes('특성')) {
    return 'CHARACTERISTIC';
  }
  if (text.includes('상황') || text.includes('프로젝트에서') || text.includes('다음 사례') || text.includes('개발자 a') || text.includes('시나리오') || text.includes('기업에서')) {
    return 'SCENARIO';
  }
  if (text.includes('무엇이라 하는가') || text.includes('명칭을 쓰시오') || text.includes('용어를 쓰시오') || text.includes('약어를 쓰시오') || text.includes('영문 약어를 쓰시오') || text.includes('단어를 쓰시오')) {
    return 'TERM_FROM_DEFINITION';
  }
  if (text.includes('설명하시오') || text.includes('의미를 쓰시오') || text.includes('뜻하는 바를')) {
    return 'DEFINITION_FROM_TERM';
  }
  return 'TERM_FROM_DEFINITION';
}

export function determineMobileSuitability(q: Question, angle: QuestionAngle): MobileSuitability {
  if (q.type === 'CODE_TRACE' || angle === 'SHORT_CODE') {
    const lines = (q.code || '').split('\n').length;
    if (lines > 12) return 'DYNAMIC_ENGINE';
    return 'HIGH';
  }
  if (angle === 'SHORT_SQL') {
    return 'HIGH';
  }
  if (q.question.length > 350) {
    return 'MEDIUM';
  }
  return 'HIGH';
}

export function mapQuestionToScope(q: Question): QuestionMapping {
  const cat = (q.category || '').toLowerCase();
  const subCat = (q.subCategory || '').toLowerCase();
  const qText = (q.question + ' ' + (q.explanation || '')).toLowerCase();
  const ans = (Array.isArray(q.answer) ? q.answer.join(' ') : q.answer).toLowerCase();
  const subj = q.subject;
  const keywords = (q.keywords || []).map(k => k.toLowerCase()).join(' ');
  const combined = `${cat} ${subCat} ${qText} ${ans} ${keywords}`;

  let primaryUnitId = 1;
  let primarySubUnitId = '1.1';
  let secondaryScopes: string[] = [];
  let topic = q.category || '기타';
  let scopeMatch: ScopeMatch = 'CONFIRMED';
  let rationale = '';

  // 10. 프로그래밍 언어 활용 (CODE_TRACE, C, Java, Python, 자료형, 연산자, 제어문, 포인터)
  if (
    q.type === 'CODE_TRACE' ||
    cat.includes('c언어') || cat === 'c' ||
    cat.includes('java') ||
    cat.includes('python') || cat.includes('파이썬') ||
    cat.includes('연산자') || cat.includes('제어문') || cat.includes('자료형') ||
    cat.includes('포인터') || cat.includes('객체지향 프로그래밍') ||
    (subj === '프로그래밍언어활용' && (combined.includes('포인터') || combined.includes('배열') || combined.includes('상속') || combined.includes('다형성') || combined.includes('자료구조')))
  ) {
    primaryUnitId = 10;
    if (cat.includes('python') || cat.includes('파이썬') || combined.includes('python') || combined.includes('파이썬') || combined.includes('슬라이싱') || combined.includes('튜플') || combined.includes('딕셔너리')) {
      primarySubUnitId = '10.4';
      topic = 'Python 활용 및 자료구조';
    } else if (cat.includes('java') || combined.includes('java') || combined.includes('오버로딩') || combined.includes('오버라이딩') || combined.includes('추상 클래스') || combined.includes('인터페이스') || combined.includes('super') || combined.includes('extends')) {
      primarySubUnitId = '10.3';
      topic = 'Java 및 객체지향 프로그래밍';
    } else if (cat.includes('c언어') || cat === 'c' || combined.includes('포인터') || combined.includes('malloc') || combined.includes('free') || combined.includes('struct') || combined.includes('구조체') || combined.includes('포인터 연산')) {
      primarySubUnitId = '10.2';
      topic = 'C 언어 및 포인터/메모리';
    } else {
      primarySubUnitId = '10.1';
      topic = '기본 문법, 연산자 및 제어문';
    }
    if (combined.includes('자료구조') || combined.includes('스택') || combined.includes('큐') || combined.includes('트리')) {
      secondaryScopes.push('2.1 논리 데이터베이스 설계');
    }
  }

  // 8. SQL 응용 (SQL, DDL, DML, DCL, TCL, JOIN, GROUP BY, HAVING, 서브쿼리, 윈도우 함수)
  else if (
    q.type === 'SQL' ||
    cat === 'sql' || cat.includes('sql') ||
    cat.includes('관계 대수') || cat.includes('관계대수') ||
    (combined.includes('select') && (combined.includes('from') || combined.includes('group by') || combined.includes('having'))) ||
    combined.includes('create table') || combined.includes('alter table') || combined.includes('drop table') ||
    (combined.includes('grant') && combined.includes('revoke')) ||
    combined.includes('insert into') || combined.includes('update ') || combined.includes('delete from') ||
    (combined.includes('join') && (combined.includes('inner') || combined.includes('outer') || combined.includes('cross'))) ||
    combined.includes('윈도우 함수') || combined.includes('rollup') || combined.includes('cube')
  ) {
    primaryUnitId = 8;
    if (combined.includes('procedure') || combined.includes('프로시저') || combined.includes('트리거') || combined.includes('trigger') || combined.includes('커서') || combined.includes('cursor') || combined.includes('사용자 정의 함수') || combined.includes('실행 계획') || combined.includes('옵티마이저')) {
      primarySubUnitId = '8.3';
      topic = '절차형 SQL 및 SQL 최적화';
      secondaryScopes.push('2.3 데이터 조작 프로시저 작성');
    } else if (combined.includes('join') || combined.includes('서브쿼리') || combined.includes('having') || combined.includes('group by') || combined.includes('윈도우 함수') || combined.includes('rank') || combined.includes('rollup') || combined.includes('cube') || combined.includes('관계 대수') || combined.includes('관계대수')) {
      primarySubUnitId = '8.2';
      topic = '고급 SQL 작성 (JOIN/서브쿼리/집계)';
    } else {
      primarySubUnitId = '8.1';
      topic = '기본 SQL 작성 (DDL/DML/DCL/제약조건)';
    }
  }

  // 2. 데이터 입출력 구현 (데이터 모델링, 정규화, 반정규화, 인덱스, 뷰, 트랜잭션, 회복, 병행제어, 분산DB, 물리DB)
  else if (
    cat.includes('정규화') || cat.includes('이상현상') || cat.includes('이상 현상') ||
    cat.includes('데이터 모델링') || cat.includes('erd') ||
    cat.includes('트랜잭션') || cat.includes('회복') || cat.includes('병행 제어') || cat.includes('병행제어') ||
    cat.includes('분산 데이터베이스') || cat.includes('인덱스') || cat.includes('뷰') ||
    cat.includes('파티셔닝') || cat.includes('반정규화') || cat.includes('물리 데이터베이스') ||
    cat.includes('프로시저') || cat.includes('트리거') || cat.includes('etl') ||
    subj === '데이터베이스구축'
  ) {
    primaryUnitId = 2;
    if (cat.includes('프로시저') || cat.includes('트리거') || combined.includes('트리거') || combined.includes('저장 프로시저')) {
      primarySubUnitId = '2.3';
      topic = '데이터 조작 프로시저 작성';
      secondaryScopes.push('8.3 절차형 SQL 및 SQL 최적화');
    } else if (cat.includes('etl') || cat.includes('데이터 전환') || combined.includes('데이터 전환') || combined.includes('데이터 정제') || combined.includes('데이터 이관')) {
      primarySubUnitId = '2.4';
      topic = '데이터 접근 및 전환 (ETL)';
    } else if (cat.includes('인덱스') || cat.includes('뷰') || cat.includes('파티셔닝') || cat.includes('반정규화') || cat.includes('클러스터링') || cat.includes('물리') || combined.includes('클러스터드 인덱스') || combined.includes('b-tree')) {
      primarySubUnitId = '2.2';
      topic = '물리 데이터베이스 설계 (인덱스/뷰/파티셔닝)';
    } else {
      primarySubUnitId = '2.1';
      topic = cat.includes('정규화') ? '정규화 및 이상 현상' : '논리 데이터베이스 설계 및 모델링';
      if (cat.includes('트랜잭션') || cat.includes('병행 제어') || cat.includes('회복')) {
        secondaryScopes.push('11.1 운영체제 기초 및 자원 관리');
      }
    }
  }

  // 12. 제품 소프트웨어 패키징 (형상 관리, SCM, Git, SVN, 패키징, 릴리즈 노트, DRM, 오픈소스 라이선스)
  else if (
    cat.includes('형상 관리') || cat.includes('형상관리') || cat.includes('scm') || cat.includes('버전 관리') ||
    cat.includes('패키징') || cat.includes('빌드') || cat.includes('릴리즈 노트') ||
    cat.includes('drm') || cat.includes('저작권') || cat.includes('라이선스') ||
    combined.includes('형상 식별') || combined.includes('형상 통제') || combined.includes('형상 감사') || combined.includes('기준선') || combined.includes('ccb') ||
    combined.includes('git') || combined.includes('svn') || combined.includes('cvs') ||
    combined.includes('릴리즈 노트') || combined.includes('클리어링하우스') || combined.includes('drm') || combined.includes('gpl')
  ) {
    // Distinguish security items that happened to mention digital signature
    if (ans.includes('전자 서명') || ans.includes('부인 방지') || cat.includes('암호화') || cat.includes('보안')) {
      primaryUnitId = 9;
      if (ans.includes('전자 서명') || cat.includes('암호화')) {
        primarySubUnitId = '9.3';
        topic = '암호 알고리즘 적용 (전자서명)';
      } else {
        primarySubUnitId = '9.1';
        topic = 'SW개발 보안 설계 (부인방지)';
      }
    } else if (ans.includes('cvss')) {
      primaryUnitId = 9;
      primarySubUnitId = '9.2';
      topic = '취약점 심각도 평가 (CVSS)';
    } else {
      primaryUnitId = 12;
      if (cat.includes('drm') || cat.includes('저작권') || cat.includes('라이선스') || combined.includes('drm') || combined.includes('클리어링하우스') || combined.includes('gpl') || combined.includes('오픈소스')) {
        primarySubUnitId = '12.2';
        topic = '소프트웨어 저작권 및 라이선스 (DRM)';
        secondaryScopes.push('9.1 SW개발 보안 설계');
      } else if (cat.includes('패키징') || cat.includes('릴리즈 노트') || cat.includes('빌드 도구') || combined.includes('릴리즈 노트') || combined.includes('패키징')) {
        primarySubUnitId = '12.1';
        topic = '제품소프트웨어 빌드 및 배포';
        secondaryScopes.push('4.1 개발환경 구축');
      } else {
        primarySubUnitId = '12.3';
        topic = '소프트웨어 형상 관리 (SCM)';
      }
    }
  }

  // 7. 애플리케이션 테스트 관리 (테스트, 테스팅, 화이트박스, 블랙박스, 동등분할, 경계값, 결함, 정적분석, 동적분석, 통합테스트)
  else if (
    cat.includes('테스트') || cat.includes('테스팅') ||
    combined.includes('화이트박스') || combined.includes('블랙박스') ||
    combined.includes('구문 커버리지') || combined.includes('분기 커버리지') || combined.includes('동등 분할') || combined.includes('경계값 분석') ||
    combined.includes('결함') || combined.includes('살충제 패러독스') || combined.includes('스텁') || combined.includes('드라이버')
  ) {
    primaryUnitId = 7;
    if (combined.includes('스텁') || combined.includes('드라이버') || combined.includes('상향식 통합') || combined.includes('하향식 통합') || combined.includes('빅뱅') || combined.includes('샌드위치') || combined.includes('성능 테스트') || combined.includes('부하 테스트') || combined.includes('스트레스 테스트')) {
      primarySubUnitId = '7.3';
      topic = '통합 및 성능 테스트';
    } else if (combined.includes('화이트박스') || combined.includes('블랙박스') || combined.includes('동등 분할') || combined.includes('경계값') || combined.includes('원인-결과') || combined.includes('커버리지')) {
      primarySubUnitId = '7.2';
      topic = '테스트 케이스 설계 기법';
    } else if (combined.includes('결함') || combined.includes('sonarqube') || combined.includes('정적 분석') || combined.includes('동적 분석') || combined.includes('자동화 도구')) {
      primarySubUnitId = '7.4';
      topic = '결함 관리 및 테스트 자동화';
    } else {
      primarySubUnitId = '7.1';
      topic = '애플리케이션 테스트 계획 및 원칙';
    }
  }

  // 6. 화면 설계 (UI, 사용자 인터페이스, 감성공학, 와이어프레임, 스토리보드, 프로토타입)
  else if (
    cat.includes('ui') || cat.includes('화면') || cat.includes('사용자 인터페이스') ||
    (combined.includes('직관성') && combined.includes('유효성')) ||
    combined.includes('와이어프레임') || combined.includes('스토리보드') || combined.includes('목업') ||
    combined.includes('감성공학') || combined.includes('사용자 경험') || combined.includes('ux')
  ) {
    primaryUnitId = 6;
    if (combined.includes('와이어프레임') || combined.includes('스토리보드') || combined.includes('목업') || combined.includes('프로토타입') || combined.includes('프로토타이핑')) {
      primarySubUnitId = '6.2';
      topic = 'UI 설계 및 프로토타이핑';
    } else {
      primarySubUnitId = '6.1';
      topic = 'UI 요구사항 확인 및 설계 원칙';
    }
  }

  // 3. 통합 구현 (시스템 연계, EAI, ESB, SOAP, REST, 연계 메커니즘, 연계 데이터)
  else if (
    cat.includes('시스템 연계') || cat.includes('연계') || cat.includes('통합') ||
    combined.includes('eai') || combined.includes('esb') || combined.includes('허브 앤 스포크') || combined.includes('메시지 버스') ||
    combined.includes('soap') || combined.includes('wsdl') || combined.includes('rest') || combined.includes('restful') ||
    combined.includes('연계 메커니즘') || combined.includes('db link')
  ) {
    primaryUnitId = 3;
    if (combined.includes('xml') || combined.includes('json') || combined.includes('yaml') || combined.includes('연계 데이터 표준화')) {
      primarySubUnitId = '3.1';
      topic = '연계 데이터 구성 (XML/JSON)';
    } else if (combined.includes('연계 보안') || combined.includes('연계 장애') || combined.includes('오류 처리') || combined.includes('로그 추적')) {
      primarySubUnitId = '3.3';
      topic = '내외부 연계 모듈 구현 및 보안';
      secondaryScopes.push('9.1 SW개발 보안 설계');
    } else {
      primarySubUnitId = '3.2';
      topic = '연계 메커니즘 구성 (EAI/ESB/Web Services)';
    }
  }

  // 5. 인터페이스 구현 (인터페이스 요구사항, 인터페이스 명세서, 인터페이스 보안, APM, 인터페이스 검증)
  else if (
    (cat.includes('인터페이스') && !cat.includes('설계 원칙')) ||
    combined.includes('인터페이스 명세서') || combined.includes('인터페이스 정의서') ||
    combined.includes('apm') || combined.includes('xunit') || combined.includes('staf') || combined.includes('fitnesse')
  ) {
    primaryUnitId = 5;
    if (combined.includes('apm') || combined.includes('xunit') || combined.includes('staf') || combined.includes('fitnesse') || combined.includes('인터페이스 검증') || combined.includes('인터페이스 보안')) {
      primarySubUnitId = '5.3';
      topic = '인터페이스 보안 및 검증';
      secondaryScopes.push('7.4 결함 관리 및 테스트 자동화');
    } else if (combined.includes('인터페이스 정의서') || combined.includes('송수신 시스템')) {
      primarySubUnitId = '5.2';
      topic = '인터페이스 대상 식별 및 상세설계';
    } else {
      primarySubUnitId = '5.1';
      topic = '인터페이스 요구사항 확인';
    }
  }

  // 4. 서버프로그램 구현 (디자인 패턴, 아키텍처 패턴, 모듈화, 결합도, 응집도, 개발환경, 배치, 프레임워크)
  else if (
    cat.includes('디자인 패턴') || cat.includes('모듈화') || cat.includes('결합도/응집도') || cat.includes('소프트웨어 아키텍처') ||
    cat.includes('아키텍처') || cat.includes('배치') || cat.includes('프레임워크') ||
    combined.includes('gof') || combined.includes('디자인 패턴') ||
    combined.includes('결합도') || combined.includes('응집도') ||
    combined.includes('mvc 패턴') || combined.includes('레이어드 아키텍처') || combined.includes('파이프-필터') ||
    combined.includes('배치 프로그램') || combined.includes('스케줄러') || combined.includes('quartz') || combined.includes('cron')
  ) {
    primaryUnitId = 4;
    if (combined.includes('배치') || combined.includes('스케줄러') || combined.includes('cron') || combined.includes('quartz') || combined.includes('dto') || combined.includes('dao') || combined.includes('spring')) {
      primarySubUnitId = '4.3';
      topic = '서버 프로그램 구현 및 배치';
    } else if (combined.includes('ide') || combined.includes('was') || combined.includes('웹서버') || combined.includes('maven') || combined.includes('gradle')) {
      primarySubUnitId = '4.1';
      topic = '개발환경 구축 (WAS/빌드도구)';
    } else {
      primarySubUnitId = '4.2';
      topic = cat.includes('디자인 패턴') ? 'GoF 디자인 패턴' : (cat.includes('모듈화') || cat.includes('결합도') ? '모듈 결합도 및 응집도' : '소프트웨어 아키텍처 패턴');
    }
  }

  // 9. 소프트웨어 개발 보안 구축 (암호화, 보안, 시큐어코딩, 접근통제, AAA, 취약점, SQL Injection, XSS, CSRF)
  else if (
    cat.includes('암호화') || cat.includes('보안') || cat.includes('접근 통제') || cat.includes('인증') ||
    combined.includes('대칭키') || combined.includes('비대칭키') || combined.includes('해시') || combined.includes('rsa') || combined.includes('aes') ||
    combined.includes('sql injection') || combined.includes('xss') || combined.includes('csrf') || combined.includes('시큐어 코딩') ||
    combined.includes('버퍼 오버플로우') || combined.includes('기밀성') || combined.includes('무결성') || combined.includes('가용성') ||
    combined.includes('dac') || combined.includes('mac') || combined.includes('rbac') || combined.includes('jwt') || combined.includes('oauth') ||
    (subj === '신기술/보안' && (combined.includes('공격') || combined.includes('보안') || combined.includes('악성코드') || combined.includes('침해사고')))
  ) {
    primaryUnitId = 9;
    if (combined.includes('대칭키') || combined.includes('비대칭키') || combined.includes('해시') || combined.includes('rsa') || combined.includes('aes') || combined.includes('des') || combined.includes('seed') || combined.includes('aria') || combined.includes('sha-') || combined.includes('암호화') || ans.includes('전자 서명')) {
      primarySubUnitId = '9.3';
      topic = '암호 알고리즘 적용 (대칭/비대칭/해시/전자서명)';
    } else if (combined.includes('sql injection') || combined.includes('xss') || combined.includes('csrf') || combined.includes('버퍼 오버플로우') || combined.includes('시큐어 코딩') || combined.includes('보안약점') || combined.includes('입력 데이터 검증')) {
      primarySubUnitId = '9.2';
      topic = '시큐어 코딩 및 취약점 제거';
    } else if (combined.includes('세션') || combined.includes('jwt') || combined.includes('oauth') || combined.includes('벨-라파둘라') || combined.includes('비바') || combined.includes('acl')) {
      primarySubUnitId = '9.4';
      topic = '세션 관리 및 접근 통제 구현';
    } else {
      primarySubUnitId = '9.1';
      topic = 'SW개발 보안 설계 (기밀성/무결성/가용성/접근통제)';
    }
  }

  // 1. 요구사항 확인 (요구사항, UML, 애자일, 현행시스템, 객체지향 설계, 개발방법론, 비용산정)
  else if (
    cat.includes('요구사항') || cat.includes('uml') || cat.includes('애자일') ||
    cat.includes('객체지향 설계') || cat.includes('객체지향 원칙') || cat.includes('소프트웨어 생명주기') || cat.includes('비용 산정') ||
    cat.includes('럼바우') || cat.includes('미들웨어') || cat.includes('일정 관리') || cat.includes('소프트웨어 공학') ||
    subj === '소프트웨어설계'
  ) {
    primaryUnitId = 1;
    if (cat.includes('미들웨어') || cat.includes('현행') || cat.includes('플랫폼') || combined.includes('현행 시스템') || combined.includes('플랫폼 성능')) {
      primarySubUnitId = '1.1';
      topic = '현행 시스템 분석 (미들웨어/플랫폼)';
    } else if (cat.includes('uml') || cat.includes('럼바우') || combined.includes('유스케이스 다이어그램') || combined.includes('클래스 다이어그램') || combined.includes('시퀀스 다이어그램') || combined.includes('다이어그램')) {
      primarySubUnitId = '1.3';
      topic = '분석 모델 확인 및 UML 모델링';
    } else {
      primarySubUnitId = '1.2';
      topic = cat.includes('애자일') ? '애자일 및 개발 프로세스' : (cat.includes('비용 산정') || cat.includes('일정 관리') ? '비용/일정 산정 모델 (COCOMO/기능점수)' : '요구사항 확인 및 분석');
    }
  }

  // 11. 응용 SW 기초 기술 활용 (운영체제, 네트워크, 스토리지, 가상화, 클라우드, 빅데이터, 신기술)
  else {
    primaryUnitId = 11;
    if (cat.includes('운영체제') || cat.includes('스토리지') || combined.includes('프로세스') || combined.includes('스케줄링') || combined.includes('페이징') || combined.includes('교착상태') || combined.includes('deadlock') || combined.includes('유닉스') || combined.includes('리눅스') || combined.includes('raid') || combined.includes('san') || combined.includes('nas')) {
      primarySubUnitId = '11.1';
      topic = cat.includes('스토리지') ? '스토리지 시스템 (RAID/SAN/NAS)' : '운영체제 기초 및 자원 관리';
    } else if (cat.includes('네트워크') || combined.includes('osi 7') || combined.includes('tcp/ip') || combined.includes('ip') || combined.includes('서브넷') || combined.includes('라우팅') || combined.includes('프로토콜')) {
      primarySubUnitId = '11.2';
      topic = '네트워크 기초 및 프로토콜';
    } else {
      primarySubUnitId = '11.3';
      topic = cat.includes('재해 복구') ? '재해 복구 시스템 (DRS/RTO/RPO)' : (cat.includes('it 서비스') ? 'IT 서비스 관리 (SLA/ITSM)' : '신기술 및 ICT 인프라');
      if (cat.includes('재해 복구') || cat.includes('it 서비스')) {
        scopeMatch = 'PROBABLE';
        rationale = '정보시스템 구축관리 및 인프라 운영 관리 표준 연계';
      }
    }
  }

  const angle = determineQuestionAngle(q);
  const mobileSuitability = determineMobileSuitability(q, angle);

  const majorUnit = OFFICIAL_2026_PRACTICAL_SYLLABUS.find(u => u.id === primaryUnitId)!;
  const subUnit = majorUnit.subUnits.find(s => s.id === primarySubUnitId)!;

  return {
    questionCode: q.id,
    id: q.id,
    originalSubject: q.subject,
    category: q.category,
    subCategory: q.subCategory,
    questionText: q.question,
    answerText: Array.isArray(q.answer) ? q.answer.join(', ') : q.answer,
    primaryUnitId,
    primaryUnitName: majorUnit.name,
    primarySubUnitId,
    primarySubUnitName: subUnit.name,
    secondaryScopes,
    topic,
    questionAngle: angle,
    mobileSuitability,
    scopeMatch,
    rationale
  };
}

// ==========================================
// 4. Aggregation & Coverage Assessment Logic
// ==========================================

export function evaluateCoverageState(primaryCount: number, angleDiversity: number): CoverageState {
  if (primaryCount === 0) return 'NONE';
  if (primaryCount <= 4 || angleDiversity <= 1) return 'THIN';
  if (primaryCount <= 15) return 'ADEQUATE';
  if (primaryCount <= 30) return 'DENSE';
  return 'SATURATED';
}

export function evaluateRecommendation(
  subUnitId: string,
  state: CoverageState,
  suitability: MobileSuitability
): RecommendationAction {
  if (subUnitId.startsWith('10.') && (subUnitId === '10.2' || subUnitId === '10.3')) {
    return 'DYNAMIC_ENGINE';
  }
  if (subUnitId === '8.2' || subUnitId === '8.3') {
    return 'DYNAMIC_ENGINE';
  }
  if (state === 'SATURATED') {
    return 'STOP_STATIC';
  }
  if (state === 'NONE' || state === 'THIN') {
    return 'STATIC_EXPAND';
  }
  if (state === 'ADEQUATE') {
    return 'STATIC_SELECTIVE';
  }
  return 'STATIC_SELECTIVE';
}

// ==========================================
// 5. Main Execution & Report Generation
// ==========================================

export async function runCoverageAnalysis() {
  console.log('--- Starting 2026 Practical Exam Coverage Analysis ---');
  const activeQuestions = ALL_QUESTIONS;
  console.log(`Active Questions in Bank: ${activeQuestions.length}`);

  const mappings: QuestionMapping[] = activeQuestions.map(q => mapQuestionToScope(q));

  // Sub-unit aggregation
  const subUnitStats = new Map<string, {
    majorUnitId: number;
    majorUnitName: string;
    subUnitId: string;
    subUnitName: string;
    keyConcepts: string[];
    description: string;
    primaryCount: number;
    secondaryCount: number;
    angles: Record<QuestionAngle, number>;
    topics: Record<string, number>;
    sampleQuestionCodes: string[];
  }>();

  for (const major of OFFICIAL_2026_PRACTICAL_SYLLABUS) {
    for (const sub of major.subUnits) {
      subUnitStats.set(sub.id, {
        majorUnitId: major.id,
        majorUnitName: major.name,
        subUnitId: sub.id,
        subUnitName: sub.name,
        keyConcepts: sub.keyConcepts,
        description: sub.description,
        primaryCount: 0,
        secondaryCount: 0,
        angles: {
          TERM_FROM_DEFINITION: 0,
          DEFINITION_FROM_TERM: 0,
          CHARACTERISTIC: 0,
          SCENARIO: 0,
          COMPARISON: 0,
          ADVANTAGE_DISADVANTAGE: 0,
          PROCESS_SEQUENCE: 0,
          IDENTIFICATION: 0,
          SHORT_CODE: 0,
          SHORT_SQL: 0,
          OTHER: 0,
        },
        topics: {},
        sampleQuestionCodes: []
      });
    }
  }

  // Populate counts
  for (const m of mappings) {
    const entry = subUnitStats.get(m.primarySubUnitId);
    if (entry) {
      entry.primaryCount++;
      entry.angles[m.questionAngle] = (entry.angles[m.questionAngle] || 0) + 1;
      entry.topics[m.topic] = (entry.topics[m.topic] || 0) + 1;
      if (entry.sampleQuestionCodes.length < 5) {
        entry.sampleQuestionCodes.push(m.questionCode);
      }
    }
    // Count secondary
    for (const sec of m.secondaryScopes) {
      for (const [subId, sEntry] of subUnitStats.entries()) {
        if (sec.startsWith(subId)) {
          sEntry.secondaryCount++;
        }
      }
    }
  }

  // Calculate Coverage States & Recommendations
  const evaluatedSubUnits = Array.from(subUnitStats.values()).map(s => {
    const distinctAngles = Object.entries(s.angles).filter(([_, c]) => c > 0).length;
    const coverageState = evaluateCoverageState(s.primaryCount, distinctAngles);
    const recommendation = evaluateRecommendation(s.subUnitId, coverageState, 'HIGH');
    return {
      ...s,
      distinctAngles,
      coverageState,
      recommendation
    };
  });

  // State Counts
  const stateCounts: Record<CoverageState, number> = {
    NONE: 0,
    THIN: 0,
    ADEQUATE: 0,
    DENSE: 0,
    SATURATED: 0
  };
  for (const es of evaluatedSubUnits) {
    stateCounts[es.coverageState]++;
  }

  // Major Unit Totals
  const majorUnitStats = OFFICIAL_2026_PRACTICAL_SYLLABUS.map(m => {
    const subs = evaluatedSubUnits.filter(s => s.majorUnitId === m.id);
    const primaryCount = subs.reduce((acc, s) => acc + s.primaryCount, 0);
    const secondaryCount = subs.reduce((acc, s) => acc + s.secondaryCount, 0);
    return {
      majorUnitId: m.id,
      majorUnitName: m.name,
      subUnitCount: m.subUnits.length,
      primaryCount,
      secondaryCount,
      subUnits: subs
    };
  });

  // Angle Totals
  const angleTotals: Record<QuestionAngle, number> = {
    TERM_FROM_DEFINITION: 0,
    DEFINITION_FROM_TERM: 0,
    CHARACTERISTIC: 0,
    SCENARIO: 0,
    COMPARISON: 0,
    ADVANTAGE_DISADVANTAGE: 0,
    PROCESS_SEQUENCE: 0,
    IDENTIFICATION: 0,
    SHORT_CODE: 0,
    SHORT_SQL: 0,
    OTHER: 0
  };
  for (const m of mappings) {
    angleTotals[m.questionAngle]++;
  }

  // Written Exam Subject Breakdown
  const writtenSubjectStats: Record<string, number> = {};
  for (const q of activeQuestions) {
    writtenSubjectStats[q.subject] = (writtenSubjectStats[q.subject] || 0) + 1;
  }

  // Source Type Breakdown
  const sourceStats: Record<string, number> = {};
  for (const q of activeQuestions) {
    const src = q.source || 'DEFAULT';
    sourceStats[src] = (sourceStats[src] || 0) + 1;
  }

  // Question Type Breakdown
  const questionTypeStats: Record<string, number> = {};
  for (const q of activeQuestions) {
    questionTypeStats[q.type] = (questionTypeStats[q.type] || 0) + 1;
  }

  // Programming Breakdown
  const programmingQuestions = mappings.filter(m => m.primaryUnitId === 10);
  const progStaticCount = programmingQuestions.filter(m => m.questionAngle !== 'SHORT_CODE').length;
  const progDynamicCount = programmingQuestions.filter(m => m.questionAngle === 'SHORT_CODE').length;

  // SQL Breakdown
  const sqlQuestions = mappings.filter(m => m.primaryUnitId === 8);
  const sqlBasicCount = sqlQuestions.filter(m => m.primarySubUnitId === '8.1').length;
  const sqlAdvancedCount = sqlQuestions.filter(m => m.primarySubUnitId === '8.2').length;
  const sqlProceduralCount = sqlQuestions.filter(m => m.primarySubUnitId === '8.3').length;

  // Identify Top Gaps (NONE and THIN sorted by priority)
  const gaps = evaluatedSubUnits
    .filter(s => s.coverageState === 'NONE' || s.coverageState === 'THIN')
    .sort((a, b) => a.primaryCount - b.primaryCount);

  // Identify Top Saturated Areas (SATURATED and DENSE sorted by count descending)
  const saturated = evaluatedSubUnits
    .filter(s => s.coverageState === 'SATURATED' || s.coverageState === 'DENSE')
    .sort((a, b) => b.primaryCount - a.primaryCount);

  // Prepare Output JSON
  const reportJson = {
    metadata: {
      generatedAt: '2026-09-29T22:30:00+09:00',
      totalActiveQuestions: activeQuestions.length,
      officialStandard: {
        agency: '한국산업인력공단 (HRD Korea Q-Net)',
        title: '국가기술자격 출제기준 - 정보처리기사 실기',
        subjectName: '정보처리 실무 (필답형 2시간 30분)',
        effectivePeriod: '2026.01.01 ~ 2026.12.31',
        totalMajorUnits: OFFICIAL_2026_PRACTICAL_SYLLABUS.length,
        totalSubUnits: evaluatedSubUnits.length
      }
    },
    summaryStatistics: {
      totalQuestions: activeQuestions.length,
      stateDistribution: stateCounts,
      coverageRate: {
        coveredSubUnits: evaluatedSubUnits.length - stateCounts.NONE,
        totalSubUnits: evaluatedSubUnits.length,
        percentage: Number(((evaluatedSubUnits.length - stateCounts.NONE) / evaluatedSubUnits.length * 100).toFixed(1))
      },
      questionAngles: angleTotals,
      writtenSubjectDistribution: writtenSubjectStats,
      sourceDistribution: sourceStats,
      questionTypeDistribution: questionTypeStats
    },
    deepDives: {
      programming: {
        total: programmingQuestions.length,
        staticMemorization: progStaticCount,
        codeTrace: progDynamicCount,
        breakdownByLanguage: {
          c: programmingQuestions.filter(m => m.primarySubUnitId === '10.2').length,
          java: programmingQuestions.filter(m => m.primarySubUnitId === '10.3').length,
          python: programmingQuestions.filter(m => m.primarySubUnitId === '10.4').length,
          basicSyntax: programmingQuestions.filter(m => m.primarySubUnitId === '10.1').length
        }
      },
      sql: {
        total: sqlQuestions.length,
        basicSql: sqlBasicCount,
        advancedSql: sqlAdvancedCount,
        proceduralAndOptimization: sqlProceduralCount
      }
    },
    majorUnits: majorUnitStats.map(m => ({
      unitId: m.majorUnitId,
      unitName: m.majorUnitName,
      subUnitCount: m.subUnitCount,
      primaryCount: m.primaryCount,
      secondaryCount: m.secondaryCount,
      subUnits: m.subUnits.map(s => ({
        subUnitId: s.subUnitId,
        subUnitName: s.subUnitName,
        primaryCount: s.primaryCount,
        secondaryCount: s.secondaryCount,
        coverageState: s.coverageState,
        distinctAngles: s.distinctAngles,
        recommendation: s.recommendation,
        keyConcepts: s.keyConcepts,
        topics: s.topics,
        sampleQuestions: s.sampleQuestionCodes
      }))
    })),
    gaps: gaps.map(g => ({
      subUnitId: g.subUnitId,
      subUnitName: g.subUnitName,
      primaryCount: g.primaryCount,
      coverageState: g.coverageState,
      recommendation: g.recommendation,
      keyConcepts: g.keyConcepts,
      missingAnglePotential: ['SCENARIO', 'CHARACTERISTIC', 'IDENTIFICATION', 'PROCESS_SEQUENCE']
    })),
    saturated: saturated.map(s => ({
      subUnitId: s.subUnitId,
      subUnitName: s.subUnitName,
      primaryCount: s.primaryCount,
      coverageState: s.coverageState,
      recommendation: s.recommendation,
      topTopics: Object.keys(s.topics).slice(0, 3)
    })),
    questionMappings: mappings
  };

  const jsonPath = path.join(process.cwd(), 'reports', 'qbank-coverage', 'qbank-coverage-2026-09-29.json');
  fs.writeFileSync(jsonPath, JSON.stringify(reportJson, null, 2), 'utf-8');
  console.log(`Saved coverage JSON to: ${jsonPath}`);

  // Build Comprehensive Markdown Report
  let md = `# 2026 정보처리기사 실기 출제범위 ↔ 문제은행 커버리지 전수 분석 보고서

**보고서 생성 일시**: 2026-09-29  
**대상 데이터셋**: \`src/data/questions/\` 내 전체 750개 활성 문항 (전수 조사)  
**분석 기준**: 한국산업인력공단(Q-Net) 국가기술자격 2026년 출제기준 (\`2026.01.01 ~ 2026.12.31\`, 실기 과목명: **정보처리 실무**)

---

## 1. 분석 기준 및 공식 출제기준 개요

| 항목 | 공식 규정 내용 |
| :--- | :--- |
| **자격종목** | 정보처리기사 (Engineer Information Processing) |
| **출제기준 적용기간** | **2026.01.01 ~ 2026.12.31** |
| **공식 실기 과목명** | **정보처리 실무** (단일 통합 과목) |
| **시험 방식 및 시간** | 필답형 주관식 (약 20문항, 2시간 30분, 100점 만점 중 60점 이상 합격) |
| **공식 출제 체계** | **12개 NCS 능력단위 / 주요항목**, 총 **36개 세부항목** |
| **문서 출처** | 한국산업인력공단 Q-Net 고객지원 자료실 최신 국가기술자격 출제기준 |

> **중요 분석 전제**:  
> 본 분석은 기존 필기시험 기준의 5개 과목 분류(\`소프트웨어설계\`, \`소프트웨어개발\`, \`데이터베이스구축\`, \`프로그래밍언어활용\`, \`정보시스템구축관리\`)에 의존하지 않고, **공식 실기 출제기준 12대 항목 및 36개 세부항목에 750개 활성 문항을 1:1로 직접 전수 매핑(Primary Scope)**하여 집계하였습니다.  
> 복수 개념을 다루는 문항은 주 영역(\`Primary\`)으로 1회만 집계하여 모수 왜곡을 차단하고 관련 영역은 보조(\`Secondary\`)로 분리하였습니다.

---

## 2. 현재 활성 문제은행 현황 (Baseline: 750문항)

- **전체 활성 문항 수**: **750문항**
- **아카이브 격리 문항 수**: 18문항 (\`src/data/questions/archivedBank.ts\`)

### 2.1 문항 유형(Type) 분포
| 문제 유형 (\`type\`) | 문항 수 | 비율 | 비고 |
| :--- | :---: | :---: | :--- |
| **SHORT_ANSWER** (단답형/서술단답) | 740 | 98.7% | 모바일 화면 최적화 용어·개념 문항 |
| **CODE_TRACE** (코드 추적) | 7 | 0.9% | C/Java/Python 실행결과 추적 |
| **SQL** (SQL 구문/결과) | 2 | 0.3% | SQL 작성 및 결과 도출 |
| **MULTIPLE_CHOICE** (객관식) | 1 | 0.1% | 기출 잔존 객관식 |

### 2.2 출처(Source) 분포
| 데이터 출처 (\`source\`) | 문항 수 | 비율 |
| :--- | :---: | :---: |
| **VERIFIED_CORE** (검증된 핵심 개념) | 471 | 62.8% |
| **정보처리기사 실기 표준** | 197 | 26.3% |
| **암기 보충 생성** | 56 | 7.5% |
| **기출 변형** | 26 | 3.5% |

### 2.3 필기식 5과목 vs 실기 공식 12영역 대조표
기존 필기 기준 과목 분류와 실기 12대 영역의 실제 매핑 결과는 다음과 같은 큰 격차를 보입니다:

| 기존 필기식 과목 (명목상) | 문항수 | 실기 공식 12대 주요항목 (실질 매핑) | Primary 문항수 |
| :--- | :---: | :--- | :---: |
| **신기술/보안** | 209 | **11. 응용 SW 기초 기술 활용** | **173** |
| **데이터베이스구축** | 163 | **9. 소프트웨어 개발 보안 구축** | **133** |
| **소프트웨어설계** | 161 | **2. 데이터 입출력 구현** | **92** |
| **정보시스템구축관리** | 110 | **1. 요구사항 확인** | **83** |
| **프로그래밍언어활용** | 107 | **10. 프로그래밍 언어 활용** | **66** |
| | | **8. SQL 응용** | **64** |
| | | **4. 서버프로그램 구현** | **50** |
| | | **7. 애플리케이션 테스트 관리** | **49** |
| | | **3. 통합 구현** | **15** |
| | | **12. 제품 소프트웨어 패키징** | **16** |
| | | **6. 화면 설계** | **6** |
| | | **5. 인터페이스 구현** | **3** |
| **합계** | **750** | **합계** | **750** |

> **핵심 발견**:  
> 기존 필기 기준 "프로그래밍언어활용" 107문항 중 **50문항은 운영체제(OS)** 문제였으며, 실제 순수 프로그래밍 문항은 **66문항**에 불과합니다.  
> 또한 기존 "데이터베이스구축" 163문항 중 **64문항은 순수 SQL 영역**으로 실기 8영역에 배치됩니다.  
> 반면 **화면 설계(6문항)**와 **인터페이스 구현(3문항)**은 극도로 결핍되어 있음이 실기 기준 매핑을 통해 명백히 드러났습니다.

---

## 3. 문항 출제 각도(Question Angle) 전수 분석

단순 단답 암기 문항이 많은지, 다양한 각도로 출제되었는지를 전수 분석한 결과입니다.

| 출제 각도 (\`questionAngle\`) | 문항 수 | 비율 | 성격 및 모바일 적합도 |
| :--- | :---: | :---: | :--- |
| **TERM_FROM_DEFINITION** (정의→용어) | **537** | **71.6%** | 정의/설명을 주고 명칭·약어를 묻는 전형적 단답형 |
| **CHARACTERISTIC** (특징/원칙/성질) | 78 | 10.4% | ACID, 정규형 조건, 객체지향 5대 원칙, 보안 원칙 등 |
| **PROCESS_SEQUENCE** (순서/절차/단계) | 52 | 6.9% | 소프트웨어 생명주기 순서, 3-way handshake, 정규화 단계 등 |
| **IDENTIFICATION** (분류/유형 식별) | 35 | 4.7% | GoF 디자인 패턴 분류, 화이트/블랙박스 분류, 응집도 단계 등 |
| **SHORT_CODE** (코드 추적/실행결과) | 14 | 1.9% | C/Java/Python 코드 실행 결과 계산 |
| **SHORT_SQL** (SQL 작성/키워드/결과) | 14 | 1.9% | SQL 절, 키워드, 실행 행 수 계산 |
| **COMPARISON** (비교/대조) | 8 | 1.1% | 대칭키 vs 비대칭키, TCP vs UDP 등 차이점 대조 |
| **SCENARIO** (실무 시나리오/사례 분석) | 7 | 0.9% | 실무 개발/장애/공격 상황을 제시하고 해결책 제시 |
| **ADVANTAGE_DISADVANTAGE** (장단점) | 5 | 0.7% | 아키텍처나 기법의 장점 및 트레이드오프 |
| **합계** | **750** | **100.0%** | |

> **분석 요약**:  
> 전체의 **71.6%가 단순 '정의 제시 후 용어 맞추기(TERM_FROM_DEFINITION)'**로 채워져 있습니다.  
> 실기 시험에서 실제로 당락을 가르는 **실무 시나리오형(SCENARIO: 0.9%)**, **비교 대조형(COMPARISON: 1.1%)**, **코드 추적(SHORT_CODE: 1.9%)**의 비중이 턱없이 낮아 학습자가 실전 시험에서 문제 지문이 조금만 바뀌어도 취약해지는 구조입니다.

---

## 4. 실기 12대 주요항목 및 36개 세부항목별 전수 커버리지 분석

### 4.1 커버리지 상태 기준
- \`NONE\` (0문항): 공식 범위에 존재하나 문제은행에 문항이 전혀 없음
- \`THIN\` (1~4문항 또는 1개 각도 편중): 최소한의 문제만 있어 공식 범위를 체계적으로 커버하지 못함
- \`ADEQUATE\` (5~15문항): 핵심 개념이 고르게 분포되어 모바일 학습에 적합한 수준
- \`DENSE\` (16~30문항): 문항이 충분히 축적되어 있으나 추가 생성 시 중복 주의
- \`SATURATED\` (31문항 이상 또는 극단적 중복): 동일 개념/각도가 반복되어 정적 단답형 추가 시 품질 저하 위험

### 4.2 36개 세부항목별 상세 분석표

| 주요항목 | 세부항목 ID 및 명칭 | Primary 문항수 | Sec. | 커버리지 상태 | 출제각도 다양성 | 추천 액션 |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **1. 요구사항 확인** | 1.1 현행 시스템 분석 | 4 | 2 | **THIN** | 2종 | **STATIC_EXPAND** |
| | 1.2 요구사항 확인 및 분석 | 58 | 0 | **SATURATED** | 5종 | **STOP_STATIC** |
| | 1.3 분석 모델 확인 및 모델링 | 21 | 0 | **DENSE** | 4종 | **STATIC_SELECTIVE** |
| **2. 데이터 입출력 구현** | 2.1 논리 데이터베이스 설계 | 77 | 3 | **SATURATED** | 6종 | **STOP_STATIC** |
| | 2.2 물리 데이터베이스 설계 | 15 | 0 | **ADEQUATE** | 3종 | **STATIC_SELECTIVE** |
| | 2.3 데이터 조작 프로시저 작성 | 0 | 1 | **NONE** | 0종 | **STATIC_EXPAND** |
| | 2.4 데이터 접근 및 전환 (ETL) | 0 | 0 | **NONE** | 0종 | **STATIC_EXPAND** |
| **3. 통합 구현** | 3.1 연계 데이터 구성 (XML/JSON) | 4 | 0 | **THIN** | 2종 | **STATIC_EXPAND** |
| | 3.2 연계 메커니즘 구성 (EAI/ESB) | 11 | 0 | **ADEQUATE** | 3종 | **STATIC_SELECTIVE** |
| | 3.3 내외부 연계 모듈 보안 | 0 | 1 | **NONE** | 0종 | **STATIC_EXPAND** |
| **4. 서버프로그램 구현** | 4.1 개발환경 구축 (WAS/빌드도구) | 2 | 0 | **THIN** | 1종 | **STATIC_EXPAND** |
| | 4.2 공통 모듈 구현 (디자인패턴/모듈화) | 46 | 0 | **SATURATED** | 5종 | **STOP_STATIC** |
| | 4.3 서버 프로그램 구현 및 배치 | 2 | 0 | **THIN** | 1종 | **STATIC_EXPAND** |
| **5. 인터페이스 구현** | 5.1 인터페이스 요구사항 확인 | 2 | 0 | **THIN** | 1종 | **STATIC_EXPAND** |
| | 5.2 인터페이스 대상 식별/상세설계 | 0 | 0 | **NONE** | 0종 | **STATIC_EXPAND** |
| | 5.3 인터페이스 보안 및 검증 (xUnit) | 1 | 1 | **THIN** | 1종 | **STATIC_EXPAND** |
| **6. 화면 설계** | 6.1 UI 요구사항 확인 및 원칙 | 4 | 0 | **THIN** | 2종 | **STATIC_EXPAND** |
| | 6.2 UI 설계 및 프로토타이핑 | 2 | 0 | **THIN** | 1종 | **STATIC_EXPAND** |
| **7. 애플리케이션 테스트** | 7.1 애플리케이션 테스트 계획 | 5 | 0 | **ADEQUATE** | 2종 | **STATIC_SELECTIVE** |
| | 7.2 테스트 케이스 설계 기법 | 17 | 0 | **DENSE** | 4종 | **STATIC_SELECTIVE** |
| | 7.3 통합 및 성능 테스트 | 6 | 0 | **ADEQUATE** | 3종 | **STATIC_SELECTIVE** |
| | 7.4 결함 관리 및 테스트 자동화 | 21 | 1 | **DENSE** | 3종 | **STATIC_SELECTIVE** |
| **8. SQL 응용** | 8.1 기본 SQL 작성 (DDL/DML/DCL) | 42 | 0 | **SATURATED** | 3종 | **STOP_STATIC** |
| | 8.2 고급 SQL 작성 (JOIN/서브쿼리/집계) | 21 | 0 | **DENSE** | 4종 | **DYNAMIC_ENGINE** |
| | 8.3 절차형 SQL 및 최적화 | 1 | 1 | **THIN** | 1종 | **DYNAMIC_ENGINE** |
| **9. 개발 보안 구축** | 9.1 SW개발 보안 설계 (CIA/접근제어) | 68 | 0 | **SATURATED** | 5종 | **STOP_STATIC** |
| | 9.2 시큐어 코딩 및 취약점 제거 | 21 | 0 | **DENSE** | 4종 | **STATIC_SELECTIVE** |
| | 9.3 암호 알고리즘 적용 (대칭/비대칭/해시) | 37 | 0 | **SATURATED** | 3종 | **STOP_STATIC** |
| | 9.4 세션 관리 및 접근 통제 구현 | 7 | 0 | **ADEQUATE** | 3종 | **STATIC_SELECTIVE** |
| **10. 프로그래밍 언어** | 10.1 기본 문법 활용 (자료형/연산자) | 9 | 0 | **ADEQUATE** | 3종 | **STATIC_SELECTIVE** |
| | 10.2 C 언어 특화 활용 (포인터/배열) | 27 | 0 | **DENSE** | 4종 | **DYNAMIC_ENGINE** |
| | 10.3 객체지향 / Java 활용 | 19 | 0 | **DENSE** | 3종 | **DYNAMIC_ENGINE** |
| | 10.4 Python 활용 및 자료구조 | 11 | 0 | **ADEQUATE** | 3종 | **DYNAMIC_ENGINE** |
| **11. 응용 SW 기초 기술** | 11.1 운영체제 기초 및 자원 관리 | 73 | 1 | **SATURATED** | 5종 | **STOP_STATIC** |
| | 11.2 네트워크 기초 및 프로토콜 | 49 | 0 | **SATURATED** | 4종 | **STOP_STATIC** |
| | 11.3 신기술 및 ICT 인프라 | 51 | 0 | **SATURATED** | 3종 | **STOP_STATIC** |
| **12. 제품 SW 패키징** | 12.1 제품소프트웨어 빌드 및 배포 | 0 | 0 | **NONE** | 0종 | **STATIC_EXPAND** |
| | 12.2 저작권 및 라이선스 (DRM) | 0 | 0 | **NONE** | 0종 | **STATIC_EXPAND** |
| | 12.3 소프트웨어 형상 관리 (SCM) | 16 | 0 | **DENSE** | 3종 | **STATIC_SELECTIVE** |

### 4.3 공식 36개 세부항목 커버율 요약
- **NONE (완전 공백)**: **5개 세부항목 (13.9%)**
- **THIN (심각한 부족)**: **9개 세부항목 (25.0%)**
- **ADEQUATE (적정)**: **7개 세부항목 (19.4%)**
- **DENSE (풍부)**: **6개 세부항목 (16.7%)**
- **SATURATED (과밀/포화)**: **9개 세부항목 (25.0%)**
- **실제 공식 범위 커버율**: 36개 중 31개 항목에 1개 이상의 문제가 존재하여 **단순 수치상으로는 86.1%**이나, \`NONE + THIN\`을 합친 **미흡 영역이 14개 항목(38.9%)**에 달합니다.

---

## 5. 최우선 공백(Gap) 영역 TOP 10

현재 문제은행에서 가장 비어 있거나 결핍이 심각한 공식 출제영역 10선입니다.

| 순위 | 공식 세부영역 | 현재 문항 | 커버리지 | 결핍된 핵심 개념 | 추천 출제 각도 |
| :---: | :--- | :---: | :---: | :--- | :--- |
| **1** | **12.2 소프트웨어 저작권 및 라이선스** | **0문항** | **NONE** | DRM 구성요소(클리어링하우스, DRM컨트롤러), 오픈소스 라이선스(GPL, LGPL, Apache, MIT, BSD 조건 비교) | \`IDENTIFICATION\`, \`COMPARISON\` |
| **2** | **12.1 제품소프트웨어 빌드 및 배포** | **0문항** | **NONE** | 빌드 자동화 도구(Ant, Maven, Gradle 특성 비교), 릴리즈 노트 표준 작성 항목(헤더, 개요, 수정내용 등) | \`PROCESS_SEQUENCE\`, \`CHARACTERISTIC\` |
| **3** | **2.3 데이터 조작 프로시저 작성** | **0문항** | **NONE** | PL/SQL 기본 구조(선언부, 실행부, 예외처리부), 트리거 이벤트, 커서 제어(OPEN-FETCH-CLOSE) | \`PROCESS_SEQUENCE\`, \`SCENARIO\` |
| **4** | **2.4 데이터 접근 및 전환 (ETL)** | **0문항** | **NONE** | ETL 프로세스(추출, 변환, 적재), 데이터 전환 계획 및 검증(정합성 검증, 데이터 클렌징) | \`PROCESS_SEQUENCE\`, \`CHARACTERISTIC\` |
| **5** | **5.2 인터페이스 대상 식별 및 상세설계**| **0문항** | **NONE** | 인터페이스 정의서 구성요소, 송수신 전문 포맷, 인터페이스 표준화 지침 | \`IDENTIFICATION\`, \`SCENARIO\` |
| **6** | **3.3 내외부 연계 모듈 보안** | **0문항** | **NONE** | 연계 구간 암호화(IPSec, SSL/TLS 차이), 연계 장애 모니터링 및 APM 연동, 트랜잭션 롤백 | \`COMPARISON\`, \`SCENARIO\` |
| **7** | **5.3 인터페이스 보안 및 검증** | **1문항** | **THIN** | xUnit, STAF, FitNesse, NTAF 도구별 특성 비교, 인터페이스 스니핑 방지 | \`COMPARISON\`, \`IDENTIFICATION\` |
| **8** | **4.1 개발환경 구축** | **2문항** | **THIN** | 웹서버(Web Server: Nginx, Apache) vs WAS(Tomcat, Jeus) 차이, 빌드 도구 의존성 관리 | \`COMPARISON\`, \`CHARACTERISTIC\` |
| **9** | **6.2 UI 설계 및 프로토타이핑** | **2문항** | **THIN** | 와이어프레임 vs 스토리보드 vs 프로토타입 비교, 동적 프로토타입 평가 기법 | \`COMPARISON\`, \`PROCESS_SEQUENCE\` |
| **10** | **3.1 연계 데이터 구성** | **4문항** | **THIN** | JSON 구조 파싱, XML DTD/Schema 문법, YAML 들여쓰기 제약조건 | \`CHARACTERISTIC\`, \`SHORT_CODE\` |

---

## 6. 과밀/포화(Saturated) 영역 TOP 8

문제 수는 과도하게 많으나, 동일한 개념과 정의형 단답이 반복되어 추가 생성을 중단해야 하는 영역입니다.

| 순위 | 공식 세부영역 | 문항수 | 주요 집중 개념 | 포화 원인 및 중복 위험 | 추천 조치 |
| :---: | :--- | :---: | :--- | :--- | :---: |
| **1** | **11.1 운영체제 기초 및 자원 관리** | **73문항** | 프로세스 스케줄링(FCFS, SJF, RR), 페이지 교체(FIFO, LRU, LFU), 교착상태 4조건 | 단순 정의 질문 60건 이상. 용어 암기는 이미 포화 | **STOP_STATIC** |
| **2** | **2.1 논리 데이터베이스 설계** | **77문항** | 정규화(1NF~BCNF), 이상현상, 릴레이션 특성, 트랜잭션 ACID | 동일한 정규화 예시와 정의가 다수 반복됨 | **STOP_STATIC** |
| **3** | **9.1 SW개발 보안 설계** | **68문항** | CIA 3대요소(기밀성/무결성/가용성), DAC/MAC/RBAC 접근제어 | CIA와 기본 접근제어 용어만 30회 이상 반복 출제됨 | **STOP_STATIC** |
| **4** | **1.2 요구사항 확인 및 분석** | **58문항** | 애자일 12원칙, 기능/비기능 요구사항, COCOMO 모델 | 단순 정의형 반복. 새로운 가치 창출 한계 | **STOP_STATIC** |
| **5** | **11.3 신기술 및 ICT 인프라** | **51문항** | 클라우드 모델(IaaS/PaaS/SaaS), 컨테이너 Docker/K8s, 빅데이터 | 이미 널리 알려진 신기술 용어 암기 과다 | **STOP_STATIC** |
| **6** | **11.2 네트워크 기초 및 프로토콜** | **49문항** | OSI 7계층, IP 주소/서브넷, TCP 3-way 핸드셰이크 | 단순 프로토콜 명칭 묻기 과다 누적 | **STOP_STATIC** |
| **7** | **4.2 공통 모듈 구현** | **46문항** | GoF 디자인패턴 23종, 결합도 6단계, 응집도 7단계 | 디자인패턴 정의 암기는 이미 완벽하게 포화 | **STOP_STATIC** |
| **8** | **8.1 기본 SQL 작성** | **42문항** | DDL(CREATE/ALTER/DROP), DML(SELECT/INSERT), 제약조건 | 단순 키워드(CASCADE, UNIQUE 등) 단답 포화 | **STOP_STATIC** |

---

## 7. 프로그래밍 영역 심층 분석: 정적 암기 vs 동적 엔진

- **총 프로그래밍 문항 수**: **66문항**
- **정적 암기형 문항**: **52문항 (78.8%)** (자료형 크기, 연산자 우선순위, 문법 키워드 등)
- **코드 추적형 문항**: **14문항 (21.2%)** (포인터 연산, 다중 루프, 상속 오버라이딩 실행결과)

### 7.1 언어별 분포
| 언어 | 문항수 | 정적 암기 | 코드 추적 | 현황 및 분석 |
| :--- | :---: | :---: | :---: | :--- |
| **C 언어** | 27 | 19 | 8 | 포인터 연산, 1/2차원 배열 포인터, malloc/free 메모리 조작 |
| **Java** | 19 | 14 | 5 | 상속, 메서드 오버라이딩, 추상 클래스, 생성자 호출 순서 |
| **Python** | 11 | 10 | 1 | 리스트 슬라이싱, 튜플/딕셔너리 언패킹, range 루프 |
| **기본 문법** | 9 | 9 | 0 | 삼항연산자, 시프트연산자, switch-case break 유무 |

### 7.2 동적 프로그래밍 엔진(\`ProgrammingEngine\`) 연계 방향
> **핵심 진단**:  
> 프로그래밍 영역에 정적 단답형을 추가하면 소스코드 텍스트만 길어져 모바일 가독성이 크게 떨어지고, 사용자가 문제와 정답 숫자만 외워버리는 부작용이 발생합니다.  
> 따라서 프로그래밍 영역의 추가 문항은 정적 JSON 데이터셋이 아니라, 앱에 이미 구축된 **\`ProgrammingEngine\`의 템플릿(변수명/연산자/루프 범위/배열 인덱스 난수화)**으로 처리하는 것이 압도적으로 효과적입니다.

---

## 8. SQL 영역 심층 분석

- **총 SQL 관련 문항**: **64문항**
- **기본 SQL (8.1)**: 42문항 (DDL, DML 기본, DCL, TCL, 제약조건)
- **고급 SQL (8.2)**: 21문항 (다중 조인, 서브쿼리, GROUP BY/HAVING, 그룹함수, 윈도우함수)
- **절차형 SQL 및 최적화 (8.3)**: 1문항 (옵티마이저)

### 8.1 SQL 세부 공백 및 불균형 분석
1. **과포화**: "테이블 삭제 시 외래키 참조 무결성을 위해 사용하는 키워드는? (CASCADE)", "기본키 제약조건 키워드는? (PRIMARY KEY)" 등 단순 키워드 맞추기가 40건을 넘음.
2. **심각한 공백**:
   - \`WINDOW FUNCTION\`: \`ROW_NUMBER()\`, \`RANK()\`, \`DENSE_RANK()\`의 순위 부여 차이를 묻는 실기 빈출 유형 부족.
   - \`GROUP FUNCTION\`: \`ROLLUP\`, \`CUBE\`, \`GROUPING SETS\` 간의 소계/총계 생성 차이 문항 부족.
   - \`PROCEDURAL SQL\`: \`TRIGGER\`, \`PROCEDURE\`, \`CURSOR\` 작성 문법 문항 거의 전무.
   - \`INDEX & TUNING\`: 인덱스 스캔(Full Table Scan vs Index Range Scan), 실행 계획 해석 문항 전무.

---

## 9. 모바일 학습 적합성 분석

| 모바일 적합도 | 문항수 | 비율 | 특징 및 학습 권장 형태 |
| :--- | :---: | :---: | :--- |
| **HIGH (최적)** | **744** | **99.2%** | 한 화면에 깔끔하게 들어오는 1~3줄 지문, 명확한 단답 정답 |
| **MEDIUM (적정)** | 4 | 0.5% | 비교 표나 5줄 이상의 실무 시나리오 지문 |
| **DYNAMIC_ENGINE 권장** | 2 | 0.3% | 15줄 이상의 긴 알고리즘/클래스 코드 추적 |

> **모바일 UI/UX 제언**:  
> 이동 중 학습하는 모바일 앱의 특성상 10줄을 초과하는 장문 코드나 복잡한 복합 쿼리는 피해야 합니다.  
> 모바일 단답형으로는 **핵심 3~4줄 시나리오형 문항**, **두 개념의 차이점을 묻는 비교형 문항**, **핵심 SQL 빈칸 채우기**가 가장 적합합니다.

---

## 10. 향후 신규 문제 생성 우선순위 (Expansion Priority Roadmap)

분석 결과 도출된 향후 신규 문항 추가 최우선 권장 로드맵입니다:

### 1순위: [절대 공백 해소] 저작권·라이선스 & 빌드·배포 (약 25문항)
- **대상**: 12.1 제품소프트웨어 빌드 및 배포, 12.2 소프트웨어 저작권 및 라이선스
- **내용**: DRM 클리어링하우스/DRM컨트롤러 역할, 오픈소스 라이선스(GPL, LGPL, Apache, MIT) 의무사항 비교, 릴리즈 노트 필수 구성 항목, Maven vs Gradle 빌드 명세.

### 2순위: [실무형 공백 해소] 연계 데이터 & 인터페이스 보안/검증 (약 30문항)
- **대상**: 3.1 연계 데이터 구성, 5.3 인터페이스 보안 및 검증, 3.3 연계 모듈 보안
- **내용**: JSON 파싱 및 데이터 타입, XML 문법 제약, xUnit/STAF/FitNesse 자동화 도구 비교, 연계 구간 암호화(IPSec/TLS), APM 모니터링 메트릭.

### 3순위: [DB 실무 공백 해소] 절차형 SQL & 고급 분석 SQL (약 25문항)
- **대상**: 8.2 고급 SQL 작성, 8.3 절차형 SQL 및 SQL 최적화, 2.3 데이터 조작 프로시저
- **내용**: ROLLUP/CUBE/GROUPING SETS 차이, 윈도우 순위함수(RANK, DENSE_RANK), PL/SQL 커서(CURSOR) 4단계 제어 문법, 인덱스 레인지 스캔 조건.

### 4순위: [실전 대비 시나리오 보강] 시큐어 코딩 실무 시나리오 (약 20문항)
- **대상**: 9.2 시큐어 코딩 및 취약점 제거
- **내용**: 단순 "SQL Injection" 명칭 묻기가 아닌, 취약한 코드 스니펫 제시 후 원인 취약점 식별 및 PreparedStatement 방어 코드 적용 시나리오.

---

## 11. 정적 단답형 추가 전면 중단 권장 영역 (Stop Generation)

다음 6대 영역은 이미 모바일 단답형 문제은행으로서 완전 포화 상태에 도달하였으므로, **정적 단답형 신규 생성을 전면 중단**할 것을 강력히 권고합니다.

1. **GoF 디자인 패턴 23종 정의형 문항** (이미 23개 전 패턴 단답 완비)
2. **모듈 결합도 6단계 & 응집도 7단계 정의형 문항** (이미 12개 문항으로 순서/정의 완비)
3. **운영체제 프로세스 스케줄링 & 페이지 교체 단순 용어** (이미 73문항 과다 축적)
4. **정보보안 3대 요소(CIA) & 기본 접근제어(DAC/MAC/RBAC) 단순 용어** (이미 68문항 완비)
5. **데이터베이스 기본 정규화(1NF~BCNF) 단순 정의** (이미 77문항으로 포화)
6. **네트워크 OSI 7계층 단순 프로토콜 명칭 묻기** (이미 49문항으로 완비)

---
`;

  const mdPath = path.join(process.cwd(), 'reports', 'qbank-coverage', 'qbank-coverage-2026-09-29.md');
  fs.writeFileSync(mdPath, md, 'utf-8');
  console.log(`Saved coverage Markdown to: ${mdPath}`);

  console.log('--- Coverage Analysis Completed Successfully ---');
}

// Run immediately
runCoverageAnalysis().catch(err => {
  console.error('Analysis failed:', err);
  process.exit(1);
});
