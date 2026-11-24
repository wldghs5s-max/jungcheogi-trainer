import {
  Question,
  QuestionSourceKind,
  SecurityQuestionFilterMode,
  SecuritySubject,
  SecuritySyllabusStandard,
} from "../../types/question";

export interface SecuritySectionNode {
  sectionId: string;
  chapterId: string;
  subject: SecuritySubject;
  title: string;
  syllabusItemCode: string;
  syllabusStandard: SecuritySyllabusStandard;
  is2027NewOrRevised?: boolean;
  description: string;
  /** 교재 매핑이 활성화된 경우 연결된 공식 출제기준 sectionId 목록 */
  mappedSyllabusSectionIds?: string[];
}

export interface SecurityChapterNode {
  chapterId: string;
  subject: SecuritySubject;
  title: string;
  syllabusMajorCode: string;
  description: string;
  sections: SecuritySectionNode[];
}

export interface SecurityTextbookSectionMapping {
  bookSectionId: string;
  bookChapterId: string;
  subject: SecuritySubject;
  title: string;
  /** 실제 교재 섹션에 연결할 공식 출제기준 sectionId 배열 (문항 ID 변경 없이 매핑) */
  syllabusSectionIds: string[];
  description?: string;
}

export interface SecurityTextbookChapterMapping {
  bookChapterId: string;
  subject: SecuritySubject;
  title: string;
  description?: string;
  sections: SecurityTextbookSectionMapping[];
}

export interface SecurityTextbookCatalog {
  bookId: string;
  bookTitle: string;
  edition: string;
  chapters: SecurityTextbookChapterMapping[];
}

/**
 * 공식 필기 출제기준(KCA 2023.01.01~2026.12.31 현행 및 2027.01.01~2029.12.31 개정 기준)에 기반한
 * 기본 `과목 → 챕터 → 세부 섹션` 분류 체계입니다.
 * 교재명·판본·목차가 제공되지 않은 상태에서 기본 분류로 동작하며,
 * 추후 `registerSecurityTextbook`으로 교재 목차를 매핑하더라도 문항 ID(`SEC_EXAM_*`)와 학습 기록은 그대로 유지됩니다.
 */
export const SECURITY_OFFICIAL_CHAPTERS: SecurityChapterNode[] = [
  // =========================================================
  // 1과목: 시스템 보안
  // =========================================================
  {
    chapterId: "SEC_CH_SYS_01",
    subject: "시스템 보안",
    title: "1장. 운영체제 및 시스템 보안 관리",
    syllabusMajorCode: "1-1 ~ 1-2",
    description:
      "운영체제 구조, 권한·파일시스템, 계정 및 로그 관리, 가상화·클라우드 시스템 보안",
    sections: [
      {
        sectionId: "SEC_SEC_SYS_01_01",
        chapterId: "SEC_CH_SYS_01",
        subject: "시스템 보안",
        title: "1-1. 권한 및 파일시스템 보안 (SetUID/SetGID/Sticky Bit, umask)",
        syllabusItemCode: "1-2-2",
        syllabusStandard: "2023_2026",
        description:
          "유닉스/리눅스 특수 권한(4000/2000/1000), 기본 권한 및 umask, 디렉터리·파일 소유자 삭제 권한 구분",
      },
      {
        sectionId: "SEC_SEC_SYS_01_02",
        chapterId: "SEC_CH_SYS_01",
        subject: "시스템 보안",
        title: "1-2. 계정 관리 및 시스템 로그 (passwd/shadow, utmp/wtmp/btmp/lastlog)",
        syllabusItemCode: "1-2-1, 1-2-3",
        syllabusStandard: "2023_2026",
        description:
          "패스워드 섀도잉(/etc/passwd, /etc/shadow)과 주요 로그인·시스템 로그 파일 및 조회 명령",
      },
      {
        sectionId: "SEC_SEC_SYS_01_03",
        chapterId: "SEC_CH_SYS_01",
        subject: "시스템 보안",
        title:
          "1-3. 클라우드·컨테이너 시스템 보안 및 취약점 분석 도구 (IaaS/PaaS/SaaS, Trivy, ScoutSuite, 2027 개정 신설)",
        syllabusItemCode: "1-1-3, 1-2-3, 1-3-2, 2-1-3, 3-2-3",
        syllabusStandard: "2027_2029",
        is2027NewOrRevised: true,
        description:
          "IaaS/PaaS/SaaS 및 클라우드 OS, 인스턴스 메타데이터·감사 로그, 클라우드·컨테이너 구성 오류(Misconfiguration)·과도한 권한, Trivy·ScoutSuite 활용 (KCA 2027~2029 필기 신설)",
      },
    ],
  },
  {
    chapterId: "SEC_CH_SYS_02",
    subject: "시스템 보안",
    title: "2장. 시스템 공격기법 및 보안 대응기술",
    syllabusMajorCode: "1-3 ~ 1-4",
    description:
      "메모리·경쟁상태 취약점 공격과 방어, 악성코드·루트킷 점검 및 시스템 인증 프레임워크",
    sections: [
      {
        sectionId: "SEC_SEC_SYS_02_01",
        chapterId: "SEC_CH_SYS_02",
        subject: "시스템 보안",
        title: "2-1. 메모리·시스템 취약점 공격 및 방어 (BOF, ASLR/DEP/Canary, TOCTOU, Format String)",
        syllabusItemCode: "1-3-2, 1-3-3",
        syllabusStandard: "2023_2026",
        description:
          "버퍼 오버플로우 보호기법(ASLR, DEP/NX, Stack Canary), 레이스 컨디션(TOCTOU), 포맷 스트링 예방",
      },
      {
        sectionId: "SEC_SEC_SYS_02_02",
        chapterId: "SEC_CH_SYS_02",
        subject: "시스템 보안",
        title: "2-2. 악성코드·루트킷 점검 및 인증 프레임워크 (Rootkit, 무결성 점검, PAM)",
        syllabusItemCode: "1-4-1, 1-4-2",
        syllabusStandard: "2023_2026",
        description:
          "커널 모드 루트킷 탐지·대응, 파일 무결성 점검(Tripwire), 리눅스 PAM 인증 모듈 설정",
      },
    ],
  },

  // =========================================================
  // 2과목: 네트워크 보안
  // =========================================================
  {
    chapterId: "SEC_CH_NET_01",
    subject: "네트워크 보안",
    title: "1장. 네트워크 공격기법 및 대응",
    syllabusMajorCode: "2-1, 2-3",
    description:
      "TCP/IP 프로토콜 취약점 기반 DoS/DDoS 공격과 스니핑·스푸핑 탐지 및 예방",
    sections: [
      {
        sectionId: "SEC_SEC_NET_01_01",
        chapterId: "SEC_CH_NET_01",
        subject: "네트워크 보안",
        title: "1-1. 서비스 거부(DoS/DDoS) 공격 및 방어 (Smurf, SYN Flooding, Land, Teardrop, Ping of Death)",
        syllabusItemCode: "2-3-2, 2-3-3",
        syllabusStandard: "2023_2026",
        description:
          "ICMP·TCP·IP 단편화 기반 DoS 공격 원리, SYN_RECV 징후 및 SYN Cookie·Directed Broadcast 차단",
      },
      {
        sectionId: "SEC_SEC_NET_01_02",
        chapterId: "SEC_CH_NET_01",
        subject: "네트워크 보안",
        title: "1-2. 스니핑·스푸핑 공격 및 대응 (ARP 스푸핑, DAI, Promiscuous 모드)",
        syllabusItemCode: "2-3-1",
        syllabusStandard: "2023_2026",
        description:
          "무차별 모드 도청(Sniffing), ARP 캐시 감염 징후 및 정적 ARP·스위치 DAI·암호화 통신 대응",
      },
    ],
  },
  {
    chapterId: "SEC_CH_NET_02",
    subject: "네트워크 보안",
    title: "2장. 네트워크 보안 기술 및 장비·프로토콜",
    syllabusMajorCode: "2-2, 2-4",
    description:
      "방화벽·IDS·IPS 등 네트워크 보안 장비 운영과 IPSec·VPN·무선랜 보안 프로토콜",
    sections: [
      {
        sectionId: "SEC_SEC_NET_02_01",
        chapterId: "SEC_CH_NET_02",
        subject: "네트워크 보안",
        title: "2-1. 네트워크 보안 장비 및 탐지·차단 기술 (Stateful 방화벽, IDS 오용/이상 탐지, IPS)",
        syllabusItemCode: "2-4-1, 2-4-2",
        syllabusStandard: "2023_2026",
        description:
          "상태 기반 검사 방화벽, IDS 오용(Signature)·이상(Anomaly) 탐지와 오탐/미탐, IPS 인라인 배치·Bypass",
      },
      {
        sectionId: "SEC_SEC_NET_02_02",
        chapterId: "SEC_CH_NET_02",
        subject: "네트워크 보안",
        title: "2-2. VPN·IPSec 및 무선랜 보안 프로토콜 (AH/ESP, 터널·전송 모드, WPA2/WPA3)",
        syllabusItemCode: "2-2-2, 2-4-3",
        syllabusStandard: "2023_2026",
        description:
          "IPSec AH/ESP·전송/터널 모드, SSL/TLS VPN과 WPA2/WPA3(SAE) 무선랜 보안 프로토콜",
      },
      {
        sectionId: "SEC_SEC_NET_02_03",
        chapterId: "SEC_CH_NET_02",
        subject: "네트워크 보안",
        title:
          "2-3. 차세대 네트워크 보안 및 패킷·공유 분석 (SASE, ZTNA, XDR, SMB, Wireshark, 2027 개정 신설)",
        syllabusItemCode: "2-1-2-2, 2-1-2-4, 2-3-2-2",
        syllabusStandard: "2027_2029",
        is2027NewOrRevised: true,
        description:
          "차세대 네트워크 보안 솔루션(SASE, ZTNA, XDR), SMB 네트워크 공유 및 Wireshark 패킷 분석 (KCA 2027~2029 필기 신설)",
      },
    ],
  },

  // =========================================================
  // 3과목: 애플리케이션 보안
  // =========================================================
  {
    chapterId: "SEC_CH_APP_01",
    subject: "애플리케이션 보안",
    title: "1장. 웹 애플리케이션 및 세션·서버 보안",
    syllabusMajorCode: "3-2 ~ 3-3",
    description:
      "OWASP 주요 웹 취약점(SQLi, XSS, CSRF), 세션·쿠키 보호, 파일 업로드 및 소프트웨어 개발 보안",
    sections: [
      {
        sectionId: "SEC_SEC_APP_01_01",
        chapterId: "SEC_CH_APP_01",
        subject: "애플리케이션 보안",
        title: "1-1. 웹 입력값 검증 및 요청 위조 방어 (SQL Injection, Prepared Statement, XSS, CSRF)",
        syllabusItemCode: "3-2-1, 3-2-2",
        syllabusStandard: "2023_2026",
        description:
          "SQL Injection과 Prepared Statement, Stored/Reflected/DOM XSS와 HTML 인코딩, CSRF 토큰·재인증",
      },
      {
        sectionId: "SEC_SEC_APP_01_02",
        chapterId: "SEC_CH_APP_01",
        subject: "애플리케이션 보안",
        title: "1-2. 웹 쿠키·세션 관리 및 파일 업로드·경로 조작 보안 (HttpOnly/Secure/SameSite, 세션 고정)",
        syllabusItemCode: "3-2-3, 3-3-2",
        syllabusStandard: "2023_2026",
        description:
          "쿠키 보안 속성(HttpOnly, Secure, SameSite), 세션 고정 방어(세션 ID 재발급), 웹셸 업로드·경로 조작 차단",
      },
    ],
  },
  {
    chapterId: "SEC_CH_APP_02",
    subject: "애플리케이션 보안",
    title: "2장. 인터넷 응용 서비스 및 데이터베이스 보안",
    syllabusMajorCode: "3-1, 3-4",
    description:
      "전자우편·DNS·파일전송 보안 프로토콜과 데이터베이스 추론·집계 위협 및 접근통제",
    sections: [
      {
        sectionId: "SEC_SEC_APP_02_01",
        chapterId: "SEC_CH_APP_02",
        subject: "애플리케이션 보안",
        title: "2-1. 전자우편·DNS·파일전송 보안 프로토콜 (PGP, S/MIME, SPF/DKIM/DMARC, DNSSEC, SFTP/FTPS)",
        syllabusItemCode: "3-1-1, 3-1-2, 3-1-3",
        syllabusStandard: "2023_2026",
        description:
          "PGP(Web of Trust)와 S/MIME(PKI), 메일 발신 인증(SPF·DKIM·DMARC), DNSSEC 서명, SFTP/FTPS",
      },
      {
        sectionId: "SEC_SEC_APP_02_02",
        chapterId: "SEC_CH_APP_02",
        subject: "애플리케이션 보안",
        title: "2-2. 데이터베이스 보안 위협 및 시큐어 코딩·전자상거래 보안 (추론, 집계, 시큐어 코딩)",
        syllabusItemCode: "3-1-5, 3-2-1, 3-3-2",
        syllabusStandard: "2023_2026",
        description:
          "데이터베이스 추론(Inference)·집계(Aggregation) 및 접근통제, 전자상거래 보안 프로토콜, 시큐어 코딩 및 정적·동적 분석 도구",
      },
    ],
  },

  // =========================================================
  // 4과목: 정보보안 일반
  // =========================================================
  {
    chapterId: "SEC_CH_GEN_01",
    subject: "정보보안 일반",
    title: "1장. 접근통제 및 보안 모델",
    syllabusMajorCode: "4-2",
    description:
      "DAC·MAC·RBAC 접근통제 정책과 기밀성·무결성·이해충돌 방지 정형 보안 모델",
    sections: [
      {
        sectionId: "SEC_SEC_GEN_01_01",
        chapterId: "SEC_CH_GEN_01",
        subject: "정보보안 일반",
        title: "1-1. 접근통제 정책 및 기밀성·무결성 보안 모델 (DAC/MAC/RBAC, Bell-LaPadula, Biba)",
        syllabusItemCode: "4-2-1, 4-2-2",
        syllabusStandard: "2023_2026",
        description:
          "DAC·MAC·RBAC 비교와 벨-라파둘라(No Read Up / No Write Down), 비바(No Read Down / No Write Up) 모델",
      },
      {
        sectionId: "SEC_SEC_GEN_01_02",
        chapterId: "SEC_CH_GEN_01",
        subject: "정보보안 일반",
        title: "1-2. 상업 무결성 및 이해충돌 방지 모델 (Clark-Wilson, Chinese Wall)",
        syllabusItemCode: "4-2-2",
        syllabusStandard: "2023_2026",
        description:
          "클락-윌슨(정형화된 트랜잭션·직무 분리) 모델과 만리장성(Chinese Wall, 이해충돌 COI 차단) 모델",
      },
    ],
  },
  {
    chapterId: "SEC_CH_GEN_02",
    subject: "정보보안 일반",
    title: "2장. 암호학 및 인증 기술",
    syllabusMajorCode: "4-1, 4-2",
    description:
      "대칭키·비대칭키 암호, 블록 암호 운영 모드, 해시·전자서명·PKI, 생체인증 및 커버로스",
    sections: [
      {
        sectionId: "SEC_SEC_GEN_02_01",
        chapterId: "SEC_CH_GEN_02",
        subject: "정보보안 일반",
        title: "2-1. 대칭키·공개키 암호 및 블록 암호 운영 모드 (ECB/CBC/CTR, 하이브리드 암호화)",
        syllabusItemCode: "4-1-2, 4-1-3",
        syllabusStandard: "2023_2026",
        description:
          "블록 암호 운영 모드(ECB, CBC, CFB, OFB, CTR) 특성과 대칭키+공개키 하이브리드 암호화 구조",
      },
      {
        sectionId: "SEC_SEC_GEN_02_02",
        chapterId: "SEC_CH_GEN_02",
        subject: "정보보안 일반",
        title: "2-2. 해시·MAC/HMAC·전자서명 및 PKI 인증서 검증 (부인방지, CRL, OCSP)",
        syllabusItemCode: "4-1-4, 4-1-5",
        syllabusStandard: "2023_2026",
        description:
          "MAC/HMAC과 전자서명(부인방지 유무), 송신자 개인키 서명·공개키 검증, PKI 인증서 폐지 확인(CRL vs OCSP)",
      },
      {
        sectionId: "SEC_SEC_GEN_02_03",
        chapterId: "SEC_CH_GEN_02",
        subject: "정보보안 일반",
        title: "2-3. 생체인증 오류 지표 및 커버로스(Kerberos) 인증 프로토콜 (FAR/FRR/CER, AS/TGS/TGT)",
        syllabusItemCode: "4-2-3",
        syllabusStandard: "2023_2026",
        description:
          "생체인증 FAR(타인 수락률)·FRR(본인 거부율)·CER(교차 오류율)과 커버로스 티켓 기반 인증 구조",
      },
    ],
  },
  {
    chapterId: "SEC_CH_GEN_03",
    subject: "정보보안 일반",
    title: "3장. 블록체인 및 최신 보안 동향 (2027 개정 신설)",
    syllabusMajorCode: "4-2-2, 4-3",
    description:
      "블록체인 해시·작업증명 원리와 양자내성암호(PQC)·딥페이크 AI·표준화 동향 (KCA 2027~2029 필기 신설, 실기 전용 동형·경량암호 제외)",
    sections: [
      {
        sectionId: "SEC_SEC_GEN_03_01",
        chapterId: "SEC_CH_GEN_03",
        subject: "정보보안 일반",
        title:
          "3-1. 블록체인·양자내성암호(PQC)·딥페이크 AI 및 표준화 동향 (2027 개정 신설)",
        syllabusItemCode: "4-2-2-4, 4-3-1-1, 4-3-1-2",
        syllabusStandard: "2027_2029",
        is2027NewOrRevised: true,
        description:
          "블록체인(해시 체인·머클 트리·작업증명), 양자내성암호(FIPS 203/204/205, KpqC), 딥페이크 AI 위협·탐지 및 표준화 동향",
      },
    ],
  },

  // =========================================================
  // 5과목: 정보보안 관리 및 법규
  // =========================================================
  {
    chapterId: "SEC_CH_LAW_01",
    subject: "정보보안 관리 및 법규",
    title: "1장. 정보보안 관리체계 및 위험·업무연속성 관리",
    syllabusMajorCode: "5-1",
    description:
      "위험 처리 전략과 정량적 위험 분석(SLE/ALE), ISMS-P 인증 제도·유효기간·사후심사, BCP(RTO/RPO)",
    sections: [
      {
        sectionId: "SEC_SEC_LAW_01_01",
        chapterId: "SEC_CH_LAW_01",
        subject: "정보보안 관리 및 법규",
        title: "1-1. 위험 관리 전략 및 정량적 위험 분석 (위험 전가/감소/회피/수용, AV·EF·SLE·ARO·ALE)",
        syllabusItemCode: "5-1-2",
        syllabusStandard: "2023_2026",
        description:
          "위험 수용·감소·회피·전가 비교와 자산가치(AV)·노출계수(EF)·단일손실예상액(SLE)·연간손실예상액(ALE) 계산",
      },
      {
        sectionId: "SEC_SEC_LAW_01_02",
        chapterId: "SEC_CH_LAW_01",
        subject: "정보보안 관리 및 법규",
        title: "1-2. ISMS-P 인증 제도·유효기간·사후심사 및 업무 연속성 계획 (ISMS-P 101개 기준, BCP RTO/RPO)",
        syllabusItemCode: "5-1-3, 5-1-4",
        syllabusStandard: "2023_2026",
        description:
          "ISMS-P 유효기간(3년)·연 1회 이상 사후심사, 별표 7 인증기준(16+64+21=101개), BCP RTO·RPO 및 재해복구센터",
      },
      {
        sectionId: "SEC_SEC_LAW_01_03",
        chapterId: "SEC_CH_LAW_01",
        subject: "정보보안 관리 및 법규",
        title:
          "1-3. 클라우드 보안 인증(CSAP) 및 주요정보통신기반시설 보호제도 (2027 개정 신설)",
        syllabusItemCode: "5-1-4-3, 5-1-4-4",
        syllabusStandard: "2027_2029",
        is2027NewOrRevised: true,
        description:
          "클라우드 보안 인증(CSAP 상·중·하 등급제·유효기간·사후평가) 및 주요정보통신기반시설 지정·보호계획·취약점 분석평가 제도 (KCA 2027~2029 필기 신설)",
      },
    ],
  },
  {
    chapterId: "SEC_CH_LAW_02",
    subject: "정보보안 관리 및 법규",
    title: "2장. 개인정보 보호법 및 정보보안 관련 법규",
    syllabusMajorCode: "5-2",
    description:
      "개인정보 보호법(고유식별·민감정보·유출 72시간 통지·신고), 정보통신망법(침해사고 24시간 신고), 주요정보통신기반시설 보호법 및 사이버보안 주요 법령",
    sections: [
      {
        sectionId: "SEC_SEC_LAW_02_01",
        chapterId: "SEC_CH_LAW_02",
        subject: "정보보안 관리 및 법규",
        title: "2-1. 개인정보 보호법 고유식별정보·민감정보 및 유출 통지·신고 (72시간 통지·신고, 2026~2027 개정)",
        syllabusItemCode: "5-2-1",
        syllabusStandard: "2023_2026",
        is2027NewOrRevised: true,
        description:
          "고유식별정보 4종(제19조), 민감정보(제23조), 개인정보 유출등 72시간 이내 통지·신고 요건·예외 및 2027.7.1 ISMS-P 의무화 등 개정 사항",
      },
      {
        sectionId: "SEC_SEC_LAW_02_02",
        chapterId: "SEC_CH_LAW_02",
        subject: "정보보안 관리 및 법규",
        title: "2-2. 정보통신망법 침해사고 신고 및 주요정보통신기반시설 취약점 분석·평가 (24시간 신고, 2026~2027 개정)",
        syllabusItemCode: "5-2-2, 5-2-3",
        syllabusStandard: "2023_2026",
        is2027NewOrRevised: true,
        description:
          "정보통신망법 제48조의3 침해사고 24시간 이내 신고·보완신고(시행령 제58조의8)와 정보통신기반 보호법 시행령 제17조 취약점 분석·평가 시기",
      },
      {
        sectionId: "SEC_SEC_LAW_02_03",
        chapterId: "SEC_CH_LAW_02",
        subject: "정보보안 관리 및 법규",
        title:
          "2-3. 사이버보안 관련 주요 법령 (정보보호산업법·클라우드컴퓨팅법·전자서명법, 2027 개정 신설)",
        syllabusItemCode: "5-2-2-3",
        syllabusStandard: "2027_2029",
        is2027NewOrRevised: true,
        description:
          "정보보호산업법(정보보호 공시·보안성 평가), 클라우드컴퓨팅법(제25조 침해사고·유출·중단 통지), 전자서명법(공인인증서 폐지·인정 유효기간 1년) (KCA 2027~2029 필기 신설)",
      },
    ],
  },
];

export const SECURITY_OFFICIAL_SECTIONS: SecuritySectionNode[] =
  SECURITY_OFFICIAL_CHAPTERS.flatMap((chapter) => chapter.sections);

let activeSecurityTextbook: SecurityTextbookCatalog | null = null;

/**
 * 교재명·판본·목차가 제공될 때 호출하여 챕터와 세부 섹션을 실제 교재 목차에 연결합니다.
 * 각 교재 섹션은 `syllabusSectionIds`를 통해 기존 문항의 `sectionId`와 연결되므로
 * 문항 ID(`question.id`)와 사용자의 풀이 이력·오답노트·북마크 기록이 그대로 유지됩니다.
 */
export function registerSecurityTextbook(
  catalog: SecurityTextbookCatalog,
): void {
  activeSecurityTextbook = catalog;
}

export function clearSecurityTextbook(): void {
  activeSecurityTextbook = null;
}

export function getActiveSecurityTextbook(): SecurityTextbookCatalog | null {
  return activeSecurityTextbook;
}

export function getSecurityTaxonomyBasisLabel(): string {
  if (activeSecurityTextbook) {
    return `${activeSecurityTextbook.bookTitle} (${activeSecurityTextbook.edition}) 목차 기준`;
  }
  return "공식 필기 출제기준 기반 분류 (추후 교재 목차 매핑 시 문항 ID·학습 기록 보존)";
}

/**
 * 과목별 챕터·세부 섹션 트리를 반환합니다.
 * 교재 목차(`activeSecurityTextbook`)가 등록된 경우 교재 목차 계층을 반환하고,
 * 등록되지 않은 경우 공식 필기 출제기준 기반 분류를 반환합니다.
 */
export function getSecurityChaptersBySubject(
  subject: SecuritySubject,
): SecurityChapterNode[] {
  if (activeSecurityTextbook) {
    const bookChapters = activeSecurityTextbook.chapters.filter(
      (ch) => ch.subject === subject,
    );
    if (bookChapters.length > 0) {
      return bookChapters.map((bCh) => ({
        chapterId: bCh.bookChapterId,
        subject: bCh.subject,
        title: bCh.title,
        syllabusMajorCode: `${activeSecurityTextbook!.bookTitle} (${activeSecurityTextbook!.edition})`,
        description: bCh.description || `${bCh.title} 교재 범위`,
        sections: bCh.sections.map((bSec) => {
          const matchedOfficial = SECURITY_OFFICIAL_SECTIONS.filter((s) =>
            bSec.syllabusSectionIds.includes(s.sectionId),
          );
          const has2027 = matchedOfficial.some(
            (s) => s.syllabusStandard === "2027_2029" || s.is2027NewOrRevised,
          );
          return {
            sectionId: bSec.bookSectionId,
            chapterId: bCh.bookChapterId,
            subject: bSec.subject,
            title: bSec.title,
            syllabusItemCode:
              matchedOfficial.map((s) => s.syllabusItemCode).join(", ") ||
              bSec.bookSectionId,
            syllabusStandard: has2027 ? "2027_2029" : "2023_2026",
            is2027NewOrRevised: has2027,
            description:
              bSec.description ||
              matchedOfficial.map((s) => s.title).join(" / "),
            mappedSyllabusSectionIds: [...bSec.syllabusSectionIds],
          };
        }),
      }));
    }
  }

  return SECURITY_OFFICIAL_CHAPTERS.filter((ch) => ch.subject === subject);
}

export function getSecurityChapterById(
  chapterId: string,
): SecurityChapterNode | undefined {
  if (activeSecurityTextbook) {
    for (const subject of [
      "시스템 보안",
      "네트워크 보안",
      "애플리케이션 보안",
      "정보보안 일반",
      "정보보안 관리 및 법규",
    ] as SecuritySubject[]) {
      const found = getSecurityChaptersBySubject(subject).find(
        (ch) => ch.chapterId === chapterId,
      );
      if (found) return found;
    }
  }
  return SECURITY_OFFICIAL_CHAPTERS.find((ch) => ch.chapterId === chapterId);
}

export function getSecuritySectionById(
  sectionId: string,
): SecuritySectionNode | undefined {
  if (activeSecurityTextbook) {
    for (const subject of [
      "시스템 보안",
      "네트워크 보안",
      "애플리케이션 보안",
      "정보보안 일반",
      "정보보안 관리 및 법규",
    ] as SecuritySubject[]) {
      for (const ch of getSecurityChaptersBySubject(subject)) {
        const found = ch.sections.find((sec) => sec.sectionId === sectionId);
        if (found) return found;
      }
    }
  }
  return SECURITY_OFFICIAL_SECTIONS.find((sec) => sec.sectionId === sectionId);
}

/**
 * 문항의 출처 구분('PAST_EXAM' | 'CREATED')을 반환합니다.
 * - 명시적 `sourceKind`가 있으면 우선 사용
 * - 없으면 `examYear`와 `examRound`가 있는 경우 'PAST_EXAM'(실제 기출), 아니면 'CREATED'(창작 문항)로 판별
 */
export function getSecurityQuestionSourceKind(
  question: Question,
): QuestionSourceKind {
  if (question.sourceKind) {
    return question.sourceKind;
  }
  if (question.examYear && question.examRound) {
    return "PAST_EXAM";
  }
  return "CREATED";
}

/**
 * 문항의 적용 출제기준('2023_2026' | '2027_2029')을 반환합니다.
 */
export function getSecurityQuestionSyllabusStandard(
  question: Question,
): SecuritySyllabusStandard {
  if (question.syllabusStandard) {
    return question.syllabusStandard;
  }
  if (question.is2027RevisionPrep) {
    return "2027_2029";
  }
  return "2023_2026";
}

/**
 * 2027 개정 대비 문제 여부를 판별합니다.
 */
export function isSecurity2027RevisionQuestion(question: Question): boolean {
  return (
    question.is2027RevisionPrep === true ||
    question.syllabusStandard === "2027_2029"
  );
}

/**
 * 문항 출처 표시 라벨: 실제 기출의 연도·회차와 창작 문항을 명확히 구분합니다.
 */
export function getSecurityQuestionSourceBadgeLabel(
  question: Question,
): string {
  const kind = getSecurityQuestionSourceKind(question);
  if (kind === "PAST_EXAM") {
    const yearPart = question.examYear ? `${question.examYear}년` : "";
    const roundPart = question.examRound ? `${question.examRound}회` : "";
    const suffix = [yearPart, roundPart].filter(Boolean).join(" ");
    return suffix ? `실제 기출 · ${suffix}` : "실제 기출";
  }
  return "창작 문항";
}

/**
 * 문항 적용 출제기준 표시 라벨: 현행(2023~2026)과 2027 개정 대비(2027~2029)를 구분합니다.
 */
export function getSecurityQuestionStandardBadgeLabel(
  question: Question,
): string {
  const standard = getSecurityQuestionSyllabusStandard(question);
  if (standard === "2027_2029" || question.is2027RevisionPrep) {
    return "2027~2029 개정 기준";
  }
  return "2023~2026 출제기준";
}

/**
 * 필터 모드('ALL' | 'PAST_EXAM' | 'REVISED_2027') 일치 여부를 판정합니다.
 */
export function matchesSecurityFilterMode(
  question: Question,
  filterMode: SecurityQuestionFilterMode = "ALL",
): boolean {
  if (filterMode === "ALL") {
    return true;
  }
  if (filterMode === "PAST_EXAM") {
    return getSecurityQuestionSourceKind(question) === "PAST_EXAM";
  }
  if (filterMode === "REVISED_2027") {
    return isSecurity2027RevisionQuestion(question);
  }
  return true;
}

export interface SecurityQuestionScopeFilter {
  subject?: SecuritySubject;
  chapterId?: string | null;
  sectionId?: string | null;
  filterMode?: SecurityQuestionFilterMode;
  examYear?: number | null;
  examRound?: number | null;
  onlyUnsolved?: boolean;
  attemptedQuestionIds?: Set<string>;
}

/**
 * 특정 챕터 ID 또는 세부 섹션 ID(공식 출제기준 ID 및 매핑된 교재 목차 ID 모두 지원)와
 * 필터 모드(전체 문제 / 실제 기출 / 2027 개정 대비), 연도·회차, 미풀이 여부에 맞는 문항만 반환합니다.
 */
export function filterSecurityQuestionsByScope(
  questions: Question[],
  scope: SecurityQuestionScopeFilter,
): Question[] {
  const {
    subject,
    chapterId,
    sectionId,
    filterMode = "ALL",
    examYear,
    examRound,
    onlyUnsolved = false,
    attemptedQuestionIds,
  } = scope;

  // 교재 매핑이 있는 경우 chapterId / sectionId를 공식 syllabusSectionIds 집합으로도 함께 해석
  let allowedSectionIds: Set<string> | null = null;
  let allowedChapterIds: Set<string> | null = null;

  if (sectionId) {
    allowedSectionIds = new Set<string>([sectionId]);
    const secNode = getSecuritySectionById(sectionId);
    if (secNode?.mappedSyllabusSectionIds) {
      for (const mappedId of secNode.mappedSyllabusSectionIds) {
        allowedSectionIds.add(mappedId);
      }
    }
  } else if (chapterId) {
    allowedChapterIds = new Set<string>([chapterId]);
    const chNode = getSecurityChapterById(chapterId);
    if (chNode) {
      allowedSectionIds = new Set<string>();
      for (const sec of chNode.sections) {
        allowedSectionIds.add(sec.sectionId);
        if (sec.mappedSyllabusSectionIds) {
          for (const mappedId of sec.mappedSyllabusSectionIds) {
            allowedSectionIds.add(mappedId);
          }
        }
      }
    }
  }

  return questions.filter((question) => {
    if ((question.certification ?? "JUNGCHEOGI") !== "SECURITY") {
      return false;
    }
    if (subject && question.subject !== subject) {
      return false;
    }

    if (sectionId) {
      const qSecId = question.sectionId;
      const qBookSecId = question.textbookRef?.bookSectionId;
      const matchesSection =
        (qSecId && allowedSectionIds?.has(qSecId)) ||
        (qBookSecId && allowedSectionIds?.has(qBookSecId));
      if (!matchesSection) {
        return false;
      }
    } else if (chapterId) {
      const qChId = question.chapterId;
      const qBookChId = question.textbookRef?.bookChapterId;
      const qSecId = question.sectionId;
      const qBookSecId = question.textbookRef?.bookSectionId;
      const matchesChapter =
        (qChId && allowedChapterIds?.has(qChId)) ||
        (qBookChId && allowedChapterIds?.has(qBookChId)) ||
        (qSecId && allowedSectionIds?.has(qSecId)) ||
        (qBookSecId && allowedSectionIds?.has(qBookSecId));
      if (!matchesChapter) {
        return false;
      }
    }

    if (!matchesSecurityFilterMode(question, filterMode)) {
      return false;
    }

    if (examYear && question.examYear !== examYear) {
      return false;
    }
    if (examRound && question.examRound !== examRound) {
      return false;
    }

    if (
      onlyUnsolved &&
      attemptedQuestionIds &&
      attemptedQuestionIds.has(question.id)
    ) {
      return false;
    }

    return true;
  });
}
