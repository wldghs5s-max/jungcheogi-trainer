import { Subject } from "../types/question";

export interface MemoTopicSeed {
  id: string;
  subject: Subject;
  chapter: string;
  topic: string;
}

function seed(
  id: string,
  subject: Subject,
  chapter: string,
  topic: string,
): MemoTopicSeed {
  return { id, subject, chapter, topic };
}

export const MEMO_TOPIC_SEEDS: MemoTopicSeed[] = [
  seed("sd-gof-factory-method", "소프트웨어설계", "GoF 생성", "팩토리 메서드"),
  seed("sd-gof-abstract-factory", "소프트웨어설계", "GoF 생성", "추상 팩토리"),
  seed("sd-gof-singleton", "소프트웨어설계", "GoF 생성", "싱글톤"),
  seed("sd-gof-builder", "소프트웨어설계", "GoF 생성", "빌더"),
  seed("sd-gof-prototype", "소프트웨어설계", "GoF 생성", "프로토타입"),
  seed("sd-gof-adapter", "소프트웨어설계", "GoF 구조", "어댑터"),
  seed("sd-gof-decorator", "소프트웨어설계", "GoF 구조", "데코레이터"),
  seed("sd-gof-facade", "소프트웨어설계", "GoF 구조", "퍼사드"),
  seed("sd-gof-proxy", "소프트웨어설계", "GoF 구조", "프록시"),
  seed("sd-gof-composite", "소프트웨어설계", "GoF 구조", "컴포지트"),
  seed("sd-gof-strategy", "소프트웨어설계", "GoF 행위", "전략"),
  seed("sd-gof-observer", "소프트웨어설계", "GoF 행위", "옵저버"),
  seed("sd-gof-template", "소프트웨어설계", "GoF 행위", "템플릿 메서드"),
  seed("sd-gof-command", "소프트웨어설계", "GoF 행위", "커맨드"),
  seed("sd-uml-usecase", "소프트웨어설계", "UML", "유스케이스 액터 시스템 경계"),
  seed("sd-uml-sequence", "소프트웨어설계", "UML", "시퀀스 다이어그램"),
  seed("sd-uml-class", "소프트웨어설계", "UML", "클래스 다이어그램 관계"),
  seed("sd-uml-state", "소프트웨어설계", "UML", "상태 다이어그램"),
  seed("sd-uml-activity", "소프트웨어설계", "UML", "활동 다이어그램"),
  seed("sd-arch-mvc", "소프트웨어설계", "아키텍처", "MVC"),
  seed("sd-arch-layered", "소프트웨어설계", "아키텍처", "레이어드 아키텍처"),
  seed("sd-arch-pipe", "소프트웨어설계", "아키텍처", "파이프 필터"),
  seed("sd-mod-cohesion", "소프트웨어설계", "모듈화", "응집도"),
  seed("sd-mod-coupling", "소프트웨어설계", "모듈화", "결합도"),
  seed("sd-mod-infohide", "소프트웨어설계", "모듈화", "정보은닉 캡슐화"),
  seed("sd-req-elicit", "소프트웨어설계", "요구공학", "요구사항 도출"),
  seed("sd-req-spec", "소프트웨어설계", "요구공학", "요구사항 명세"),
  seed("sd-test-equiv", "소프트웨어설계", "블랙박스", "동치분할"),
  seed("sd-test-boundary", "소프트웨어설계", "블랙박스", "경계값 분석"),
  seed("sd-test-stmt", "소프트웨어설계", "화이트박스", "구문 커버리지"),
  seed("sd-test-branch", "소프트웨어설계", "화이트박스", "분기 커버리지"),
  seed("sd-test-mcdc", "소프트웨어설계", "화이트박스", "MC/DC"),
  seed("sd-scm-baseline", "소프트웨어설계", "형상관리", "베이스라인"),
  seed("sd-agile-scrum", "소프트웨어설계", "애자일", "스크럼 역할 산출물"),
  seed("sd-agile-xp", "소프트웨어설계", "애자일", "XP 페어프로그래밍 TDD"),
  seed("sd-solid-srp", "소프트웨어설계", "SOLID", "단일 책임 원칙"),
  seed("sd-solid-ocp", "소프트웨어설계", "SOLID", "개방 폐쇄 원칙"),
  seed("sd-solid-lsp", "소프트웨어설계", "SOLID", "리스코프 치환 원칙"),

  seed("db-1nf", "데이터베이스구축", "정규화", "1NF 원자값"),
  seed("db-2nf", "데이터베이스구축", "정규화", "2NF 부분함수종속"),
  seed("db-3nf", "데이터베이스구축", "정규화", "3NF 이행종속"),
  seed("db-bcnf", "데이터베이스구축", "정규화", "BCNF"),
  seed("db-denorm", "데이터베이스구축", "정규화", "반정규화"),
  seed("db-key-candidate", "데이터베이스구축", "키", "후보키"),
  seed("db-key-primary", "데이터베이스구축", "키", "기본키"),
  seed("db-key-foreign", "데이터베이스구축", "키", "외래키 참조무결성"),
  seed("db-anomaly-insert", "데이터베이스구축", "이상", "삽입 이상"),
  seed("db-anomaly-delete", "데이터베이스구축", "이상", "삭제 이상"),
  seed("db-anomaly-update", "데이터베이스구축", "이상", "갱신 이상"),
  seed("db-acid-a", "데이터베이스구축", "트랜잭션", "원자성"),
  seed("db-acid-c", "데이터베이스구축", "트랜잭션", "일관성"),
  seed("db-acid-i", "데이터베이스구축", "트랜잭션", "격리성"),
  seed("db-acid-d", "데이터베이스구축", "트랜잭션", "지속성"),
  seed("db-iso-dirty", "데이터베이스구축", "격리수준", "Dirty Read"),
  seed("db-iso-phantom", "데이터베이스구축", "격리수준", "Phantom Read"),
  seed("db-lock-deadlock", "데이터베이스구축", "동시성", "교착상태"),
  seed("db-index-btree", "데이터베이스구축", "인덱스", "B-Tree"),
  seed("db-sql-inner", "데이터베이스구축", "SQL JOIN", "INNER JOIN"),
  seed("db-sql-outer", "데이터베이스구축", "SQL JOIN", "OUTER JOIN"),
  seed("db-sql-having", "데이터베이스구축", "SQL", "GROUP BY HAVING"),
  seed("db-sql-union", "데이터베이스구축", "SQL", "UNION"),
  seed("db-sql-subquery", "데이터베이스구축", "SQL", "서브쿼리"),
  seed("db-view", "데이터베이스구축", "뷰", "View 가상테이블"),
  seed("db-erd", "데이터베이스구축", "모델링", "ERD 카디널리티"),
  seed("db-ansi", "데이터베이스구축", "아키텍처", "ANSI SPARC 3층 스키마"),
  seed("db-dcl", "데이터베이스구축", "권한", "GRANT REVOKE"),
  seed("db-trigger", "데이터베이스구축", "절차", "트리거"),

  seed("im-wbs", "정보시스템구축관리", "일정", "WBS 작업패키지"),
  seed("im-cpm", "정보시스템구축관리", "일정", "CPM 임계경로"),
  seed("im-pert", "정보시스템구축관리", "일정", "PERT 3점 산정"),
  seed("im-gantt", "정보시스템구축관리", "일정", "간트 차트 마일스톤"),
  seed("im-waterfall", "정보시스템구축관리", "생명주기", "폭포수 모델"),
  seed("im-spiral", "정보시스템구축관리", "생명주기", "나선형 모델"),
  seed("im-proto", "정보시스템구축관리", "생명주기", "프로토타입 모델"),
  seed("im-evms", "정보시스템구축관리", "성과", "EVMS PV EV AC"),
  seed("im-cpi", "정보시스템구축관리", "성과", "CPI SPI"),
  seed("im-iso21500", "정보시스템구축관리", "표준", "ISO 21500 PMBOK"),
  seed("im-risk", "정보시스템구축관리", "위험", "위험 식별 분석 대응"),
  seed("im-ccb", "정보시스템구축관리", "변경", "CCB 형상통제"),
  seed("im-itil", "정보시스템구축관리", "운영", "ITIL 서비스 운영"),
  seed("im-cmmi", "정보시스템구축관리", "성숙도", "CMMI 단계"),
  seed("im-12207", "정보시스템구축관리", "표준", "ISO IEC 12207"),
  seed("im-test-unit", "정보시스템구축관리", "테스트", "단위 테스트"),
  seed("im-test-integ", "정보시스템구축관리", "테스트", "통합 테스트 스텁 드라이버"),
  seed("im-loc", "정보시스템구축관리", "규모", "LOC"),
  seed("im-fp", "정보시스템구축관리", "규모", "기능점수 FP"),

  seed("sc-aes", "신기술/보안", "암호", "AES 대칭키"),
  seed("sc-rsa", "신기술/보안", "암호", "RSA 공개키"),
  seed("sc-hash", "신기술/보안", "암호", "해시 함수"),
  seed("sc-sign", "신기술/보안", "암호", "전자서명"),
  seed("sc-pki", "신기술/보안", "PKI", "CA 인증서"),
  seed("sc-crl", "신기술/보안", "PKI", "CRL OCSP"),
  seed("sc-dac", "신기술/보안", "접근통제", "DAC"),
  seed("sc-mac", "신기술/보안", "접근통제", "MAC"),
  seed("sc-rbac", "신기술/보안", "접근통제", "RBAC"),
  seed("sc-cia-c", "신기술/보안", "CIA", "기밀성"),
  seed("sc-cia-i", "신기술/보안", "CIA", "무결성"),
  seed("sc-cia-a", "신기술/보안", "CIA", "가용성"),
  seed("sc-sqli", "신기술/보안", "웹공격", "SQL Injection"),
  seed("sc-xss", "신기술/보안", "웹공격", "XSS"),
  seed("sc-csrf", "신기술/보안", "웹공격", "CSRF"),
  seed("sc-ids", "신기술/보안", "탐지", "IDS"),
  seed("sc-ips", "신기술/보안", "탐지", "IPS"),
  seed("sc-nat", "신기술/보안", "네트워크", "NAT NAPT"),
  seed("sc-dns", "신기술/보안", "네트워크", "DNS"),
  seed("sc-dhcp", "신기술/보안", "네트워크", "DHCP"),
  seed("sc-osi", "신기술/보안", "네트워크", "OSI 7계층"),
  seed("sc-tcp", "신기술/보안", "네트워크", "TCP 3-way handshake"),
  seed("sc-iaas", "신기술/보안", "클라우드", "IaaS"),
  seed("sc-paas", "신기술/보안", "클라우드", "PaaS"),
  seed("sc-saas", "신기술/보안", "클라우드", "SaaS"),
  seed("sc-k8s", "신기술/보안", "클라우드", "컨테이너 Kubernetes"),
  seed("sc-ddos", "신기술/보안", "침해", "DDoS"),
  seed("sc-ransom", "신기술/보안", "침해", "랜섬웨어"),
];

export const CHAPTER_FILL_CAP = 2;

function normalizeNeedle(value: string): string {
  return value.replace(/\s+/g, "").toUpperCase();
}

export function countSeedCoverage(
  seedItem: MemoTopicSeed,
  existingQuestions: {
    subject?: string;
    category?: string;
    subCategory?: string;
    keywords?: string[];
    question?: string;
    chapterId?: string;
  }[],
): number {
  return existingQuestions.filter((item) => {
    if (item.subject && item.subject !== seedItem.subject) return false;
    if (item.chapterId === seedItem.id) return true;
    const hay = normalizeNeedle(
      `${item.category || ""} ${item.subCategory || ""} ${(item.keywords || []).join(" ")} ${item.question || ""}`,
    );
    const topicNeedle = normalizeNeedle(seedItem.topic);
    if (topicNeedle.length >= 2 && hay.includes(topicNeedle)) return true;
    const tokens = seedItem.topic
      .split(/[·/\s(),]/)
      .map((token) => normalizeNeedle(token))
      .filter((token) => token.length >= 3);
    return tokens.some((token) => hay.includes(token));
  }).length;
}

export function pickTopicSeeds(
  count: number,
  existingQuestions: {
    subject?: string;
    category?: string;
    subCategory?: string;
    keywords?: string[];
    question?: string;
    chapterId?: string;
  }[] = [],
  pool: MemoTopicSeed[] = MEMO_TOPIC_SEEDS,
  random: () => number = Math.random,
): MemoTopicSeed[] {
  const ranked = [...pool]
    .map((item) => ({
      seed: item,
      n: countSeedCoverage(item, existingQuestions),
    }))
    .sort((left, right) => left.n - right.n || random() - 0.5);

  const picked: MemoTopicSeed[] = [];
  const usedIds = new Set<string>();
  const subjectsSeen = new Set<Subject>();
  const chaptersSeen = new Set<string>();

  const chapterKey = (seed: MemoTopicSeed) => `${seed.subject}::${seed.chapter}`;

  const take = (maxN: number, unique: "subject" | "chapter" | "any") => {
    for (const row of ranked) {
      if (picked.length >= count) return;
      if (row.n > maxN) continue;
      if (usedIds.has(row.seed.id)) continue;
      if (unique === "subject" && subjectsSeen.has(row.seed.subject)) continue;
      if (unique === "chapter" && chaptersSeen.has(chapterKey(row.seed))) {
        continue;
      }
      picked.push(row.seed);
      usedIds.add(row.seed.id);
      subjectsSeen.add(row.seed.subject);
      chaptersSeen.add(chapterKey(row.seed));
    }
  };

  take(0, "subject");
  take(0, "chapter");
  take(0, "any");
  take(CHAPTER_FILL_CAP - 1, "subject");
  take(CHAPTER_FILL_CAP - 1, "chapter");
  take(CHAPTER_FILL_CAP - 1, "any");
  take(Number.POSITIVE_INFINITY, "any");

  return picked;
}
