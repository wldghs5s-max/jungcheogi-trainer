import { Subject } from "../types/question";

export interface MemoTopicSeed {
  subject: Subject;
  topic: string;
}

export const MEMO_TOPIC_SEEDS: MemoTopicSeed[] = [
  // 소프트웨어설계
  { subject: "소프트웨어설계", topic: "GoF 생성 패턴 (팩토리 메서드/추상 팩토리/싱글톤)" },
  { subject: "소프트웨어설계", topic: "GoF 구조 패턴 (어댑터/데코레이터/퍼사드)" },
  { subject: "소프트웨어설계", topic: "GoF 행위 패턴 (전략/옵저버/템플릿 메서드)" },
  { subject: "소프트웨어설계", topic: "UML 유스케이스·액터·시스템 경계" },
  { subject: "소프트웨어설계", topic: "UML 시퀀스/커뮤니케이션 다이어그램" },
  { subject: "소프트웨어설계", topic: "UML 클래스 다이어그램 (연관/일반화/실현)" },
  { subject: "소프트웨어설계", topic: "UML 상태/활동 다이어그램" },
  { subject: "소프트웨어설계", topic: "아키텍처 패턴 (MVC/파이프필터/레이어드)" },
  { subject: "소프트웨어설계", topic: "응집도와 결합도" },
  { subject: "소프트웨어설계", topic: "정보은닉·캡슐화·모듈화" },
  { subject: "소프트웨어설계", topic: "요구공학 (도출/분석/명세/검증)" },
  { subject: "소프트웨어설계", topic: "블랙박스 테스트 (동치분할/경계값)" },
  { subject: "소프트웨어설계", topic: "화이트박스 테스트 (구문/결정/조건 커버리지)" },
  { subject: "소프트웨어설계", topic: "형상관리와 베이스라인" },
  { subject: "소프트웨어설계", topic: "스크럼 역할과 산출물" },
  { subject: "소프트웨어설계", topic: "XP 실천항목 (페어프로그래밍/TDD/리팩토링)" },
  { subject: "소프트웨어설계", topic: "객체지향 원칙 (SOLID)" },
  { subject: "소프트웨어설계", topic: "내외부 설계와 인터페이스 설계" },

  // 데이터베이스구축
  { subject: "데이터베이스구축", topic: "정규화 1NF/2NF/부분함수종속" },
  { subject: "데이터베이스구축", topic: "정규화 3NF/BCNF/이행종속" },
  { subject: "데이터베이스구축", topic: "반정규화 목적과 기법" },
  { subject: "데이터베이스구축", topic: "후보키·기본키·대체키" },
  { subject: "데이터베이스구축", topic: "외래키와 참조무결성" },
  { subject: "데이터베이스구축", topic: "삽입/삭제/갱신 이상" },
  { subject: "데이터베이스구축", topic: "트랜잭션 ACID" },
  { subject: "데이터베이스구축", topic: "격리수준 (Dirty/Non-repeatable/Phantom Read)" },
  { subject: "데이터베이스구축", topic: "교착상태(Deadlock)와 락" },
  { subject: "데이터베이스구축", topic: "인덱스와 B-Tree" },
  { subject: "데이터베이스구축", topic: "SQL JOIN 종류" },
  { subject: "데이터베이스구축", topic: "GROUP BY와 HAVING" },
  { subject: "데이터베이스구축", topic: "서브쿼리와 집합연산(UNION)" },
  { subject: "데이터베이스구축", topic: "뷰(View)와 가상 테이블" },
  { subject: "데이터베이스구축", topic: "ERD 카디널리티와 관계" },
  { subject: "데이터베이스구축", topic: "ANSI/SPARC 3층 스키마" },
  { subject: "데이터베이스구축", topic: "DCL (GRANT/REVOKE)" },
  { subject: "데이터베이스구축", topic: "트리거와 저장 프로시저" },

  // 정보시스템구축관리
  { subject: "정보시스템구축관리", topic: "WBS와 작업 패키지" },
  { subject: "정보시스템구축관리", topic: "CPM 임계경로와 여유시간" },
  { subject: "정보시스템구축관리", topic: "PERT 3점 산정" },
  { subject: "정보시스템구축관리", topic: "폭포수 모델과 단계 산출물" },
  { subject: "정보시스템구축관리", topic: "나선형 모델과 위험 분석" },
  { subject: "정보시스템구축관리", topic: "프로토타입 모델" },
  { subject: "정보시스템구축관리", topic: "EVMS (PV/EV/AC, CPI/SPI)" },
  { subject: "정보시스템구축관리", topic: "ISO 21500 / PMBOK 지식영역" },
  { subject: "정보시스템구축관리", topic: "위험 관리 (식별/분석/대응)" },
  { subject: "정보시스템구축관리", topic: "형상/변경 통제 위원회(CCB)" },
  { subject: "정보시스템구축관리", topic: "ITIL 서비스 운영 프로세스" },
  { subject: "정보시스템구축관리", topic: "CMMI 성숙도 단계" },
  { subject: "정보시스템구축관리", topic: "소프트웨어 생명주기 국제표준 (ISO/IEC 12207)" },
  { subject: "정보시스템구축관리", topic: "테스트 단계 (단위/통합/시스템/인수)" },
  { subject: "정보시스템구축관리", topic: "LOC·FP 규모 산정" },
  { subject: "정보시스템구축관리", topic: "간트 차트와 마일스톤" },

  // 신기술/보안
  { subject: "신기술/보안", topic: "대칭키/비대칭키 암호화 (AES/RSA)" },
  { subject: "신기술/보안", topic: "해시와 전자서명" },
  { subject: "신기술/보안", topic: "PKI·CA·인증서 폐기(CRL/OCSP)" },
  { subject: "신기술/보안", topic: "접근통제 DAC/MAC/RBAC" },
  { subject: "신기술/보안", topic: "CIA 삼요소 (기밀성/무결성/가용성)" },
  { subject: "신기술/보안", topic: "SQL Injection / XSS / CSRF" },
  { subject: "신기술/보안", topic: "IDS와 IPS 차이" },
  { subject: "신기술/보안", topic: "NAT와 NAPT" },
  { subject: "신기술/보안", topic: "DNS와 DHCP" },
  { subject: "신기술/보안", topic: "OSI 7계층과 PDU" },
  { subject: "신기술/보안", topic: "TCP 3-way handshake" },
  { subject: "신기술/보안", topic: "IaaS/PaaS/SaaS" },
  { subject: "신기술/보안", topic: "컨테이너와 Kubernetes" },
  { subject: "신기술/보안", topic: "블록체인과 합의 알고리즘" },
  { subject: "신기술/보안", topic: "엣지/포그 컴퓨팅" },
  { subject: "신기술/보안", topic: "라우팅 프로토콜 (OSPF/BGP)" },
  { subject: "신기술/보안", topic: "침해사고 공격 기법 (DDoS/랜섬웨어/피싱)" },
  { subject: "신기술/보안", topic: "디지털 포렌식 절차" },
];

function normalizeNeedle(value: string): string {
  return value.replace(/\s+/g, "").toUpperCase();
}

function seedAlreadyCovered(
  seed: MemoTopicSeed,
  existingQuestions: { subject?: string; category?: string; keywords?: string[]; question?: string }[],
): boolean {
  const topicNeedle = normalizeNeedle(seed.topic);
  return existingQuestions.some((item) => {
    if (item.subject && item.subject !== seed.subject) return false;
    const hay = normalizeNeedle(
      `${item.category || ""} ${(item.keywords || []).join(" ")} ${item.question || ""}`,
    );
    const tokens = seed.topic
      .split(/[·/(),]/)
      .map((token) => normalizeNeedle(token))
      .filter((token) => token.length >= 3);
    return tokens.some((token) => hay.includes(token)) || hay.includes(topicNeedle.slice(0, 8));
  });
}

export function pickTopicSeeds(
  count: number,
  existingQuestions: { subject?: string; category?: string; keywords?: string[]; question?: string }[] = [],
  pool: MemoTopicSeed[] = MEMO_TOPIC_SEEDS,
  random: () => number = Math.random,
): MemoTopicSeed[] {
  const shuffled = [...pool].sort(() => random() - 0.5);
  const unused = shuffled.filter(
    (seed) => !seedAlreadyCovered(seed, existingQuestions),
  );
  const covered = shuffled.filter((seed) =>
    seedAlreadyCovered(seed, existingQuestions),
  );

  const picked: MemoTopicSeed[] = [];
  const usedTopics = new Set<string>();
  const subjectsSeen = new Set<Subject>();

  const take = (source: MemoTopicSeed[], uniqueSubject: boolean) => {
    for (const seed of source) {
      if (picked.length >= count) return;
      if (usedTopics.has(seed.topic)) continue;
      if (uniqueSubject && subjectsSeen.has(seed.subject)) continue;
      picked.push(seed);
      usedTopics.add(seed.topic);
      subjectsSeen.add(seed.subject);
    }
  };

  take(unused, true);
  take(unused, false);
  take(covered, true);
  take(covered, false);

  return picked;
}
