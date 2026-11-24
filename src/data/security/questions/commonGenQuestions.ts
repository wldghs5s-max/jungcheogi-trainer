import { Question } from "../../../types/question";
import { buildSecuritySectionQuestions } from "./builders";

/**
 * 4과목 정보보안 일반 — 공통 범위 창작 문제 (2023~2026 현행 및 공통 기준)
 */
const gen0101 = buildSecuritySectionQuestions(
  {
    sectionId: "SEC_SEC_GEN_01_01",
    syllabusStandard: "2023_2026",
  },
  [
    {
      id: "SEC_CMN_GEN_011",
      category: "접근통제 및 보안 모델",
      question:
        "접근통제 정책 중 DAC(임의적 접근통제), MAC(강제적 접근통제), RBAC(역할 기반 접근통제)를 비교한 설명으로 올바른 것은?",
      options: [
        "DAC는 소유자 판단, MAC은 등급 비교 강제, RBAC은 직무 역할 할당이다.",
        "DAC는 중앙 관리자만 권한을 변경해 트로이목마 방어에 가장 유리하다.",
        "MAC은 파일 소유자 임의로 기밀 문서를 일반 사용자에게 자유롭게 공유한다.",
        "RBAC은 개인 ID마다 파일 권한을 직접 설정해 대규모 조직 관리가 어렵다.",
      ],
      answer:
        "DAC는 소유자 판단, MAC은 등급 비교 강제, RBAC은 직무 역할 할당이다.",
      explanation:
        "DAC는 신원·소유자 기반의 유연한 정책이지만 소유자 권한으로 실행되는 트로이목마에 취약합니다. MAC은 보안 레이블(기밀등급·범주)을 기반으로 시스템이 강제하므로 기밀성이 매우 높고 트로이목마 방어에 강하지만 관리 유연성이 낮습니다. RBAC은 사용자에게 직접 권한을 주지 않고 '역할(Role)'을 매개로 권한을 관리해 대규모 조직의 인사 이동·직무 분리에 유리합니다.",
      difficulty: "EASY",
      keywords: ["DAC", "MAC", "RBAC", "접근통제 정책"],
    },
    {
      id: "SEC_CMN_GEN_012",
      category: "접근통제 및 보안 모델",
      question:
        "벨-라파둘라(Bell-LaPadula, BLP) 모델에서 '단순 보안 규칙(Simple Security Property)'과 '스타 보안 규칙(*-Property)'의 의미를 바르게 짝지은 것은?",
      options: [
        "단순 보안 규칙: No Read Up (상위 등급 읽기 금지) — 스타 보안 규칙: No Write Down (하위 등급 쓰기 금지)",
        "단순 보안 규칙: No Read Down (하위 등급 읽기 금지) — 스타 보안 규칙: No Write Up (상위 등급 쓰기 금지)",
        "단순 보안 규칙: No Write Up (상위 등급 쓰기 금지) — 스타 보안 규칙: No Read Up (상위 등급 읽기 금지)",
        "단순 보안 규칙: 직무 분리 — 스타 보안 규칙: 정형화된 트랜잭션",
      ],
      answer:
        "단순 보안 규칙: No Read Up (상위 등급 읽기 금지) — 스타 보안 규칙: No Write Down (하위 등급 쓰기 금지)",
      explanation:
        "벨-라파둘라(BLP) 모델은 기밀성(Confidentiality) 보장이 목적입니다. 단순 보안 규칙(ss-property)은 낮은 등급 주체가 높은 등급 객체를 읽지 못하게 하는 No Read Up, 스타 규칙(*-property)은 높은 등급 주체가 낮은 등급 객체에 기밀 정보를 쓰지 못하게 하는 No Write Down입니다. No Read Down / No Write Up은 무결성 모델인 Biba 모델의 규칙입니다.",
      difficulty: "EASY",
      keywords: ["Bell-LaPadula", "No Read Up", "No Write Down", "기밀성"],
    },
    {
      id: "SEC_CMN_GEN_013",
      category: "접근통제 및 보안 모델",
      question:
        "비바(Biba) 무결성 모델의 '단순 무결성 공리(Simple Integrity Axiom)'와 '스타 무결성 공리(*-Integrity Axiom)'에 해당하는 조합은?",
      options: [
        "No Read Down (하위 무결성 읽기 금지) 및 No Write Up (상위 무결성 쓰기 금지)",
        "No Read Up (상위 등급 읽기 금지) 및 No Write Down (하위 등급 쓰기 금지)",
        "Read Up 허용 및 Write Up 허용",
        "No Read Down (하위 무결성 읽기 금지) 및 No Write Down (하위 무결성 쓰기 금지)",
      ],
      answer:
        "No Read Down (하위 무결성 읽기 금지) 및 No Write Up (상위 무결성 쓰기 금지)",
      explanation:
        "비바(Biba) 모델은 최초의 무결성(Integrity) 정형 모델로, 신뢰도가 낮은 데이터가 높은 신뢰도 영역을 오염시키지 못하게 합니다. 단순 무결성 공리는 하위 무결성 객체를 읽지 못하는 No Read Down, 스타 무결성 공리는 상위 무결성 객체에 쓰지 못하는 No Write Up입니다(BLP와 방향이 정확히 반대입니다).",
      difficulty: "EASY",
      keywords: ["Biba", "무결성 모델", "No Read Down", "No Write Up"],
    },
    {
      id: "SEC_CMN_GEN_014",
      category: "접근통제 및 보안 모델",
      question:
        "국방 정보시스템에 벨-라파둘라(BLP) 모델을 적용했다. '비밀(Secret)' 인가를 받은 주체가 '1급 비밀(Top Secret)' 파일에 쓰기(Write)를 수행하는 행위와 '대외비(Confidential)' 파일에 쓰기(Write)를 수행하는 행위의 허용 여부는?",
      options: [
        "1급 비밀(Top Secret) 쓰기: 허용 — 대외비(Confidential) 쓰기: 금지",
        "1급 비밀(Top Secret) 쓰기: 금지 — 대외비(Confidential) 쓰기: 허용",
        "1급 비밀(Top Secret) 쓰기: 허용 — 대외비(Confidential) 쓰기: 허용",
        "1급 비밀(Top Secret) 쓰기: 금지 — 대외비(Confidential) 쓰기: 금지",
      ],
      answer:
        "1급 비밀(Top Secret) 쓰기: 허용 — 대외비(Confidential) 쓰기: 금지",
      explanation:
        "BLP 모델의 규칙은 No Read Up / No Write Down이므로, 하위 등급으로의 쓰기(Secret → Confidential)는 기밀 유출 방지를 위해 금지(No Write Down)되지만 상위 등급으로의 쓰기(Secret → Top Secret, Write Up)는 기밀성이 깨지지 않으므로 허용됩니다. 이 때문에 BLP는 기밀성은 보장하지만 상위 객체가 하위 주체에 의해 오염될 수 있어 무결성은 보장하지 못합니다.",
      difficulty: "MEDIUM",
      keywords: ["Bell-LaPadula", "Write Up", "No Write Down", "시나리오"],
    },
    {
      id: "SEC_CMN_GEN_015",
      category: "접근통제 및 보안 모델",
      question:
        "벨-라파둘라(BLP) 모델의 한계점으로 가장 자주 지적되는 두 가지는 무엇인가?",
      options: [
        "무결성을 보장하지 못하며 은닉 채널 유출을 막지 못한다.",
        "기밀성을 보장하지 못하며 다중 보안 등급 표현이 불가능하다.",
        "상위 등급 읽기(Read Up)를 허용해 기밀 유출에 매우 취약하다.",
        "주체의 Write Up을 금지해 군사 환경 보고 체계와 충돌한다.",
      ],
      answer: "무결성을 보장하지 못하며 은닉 채널 유출을 막지 못한다.",
      explanation:
        "BLP 모델은 기밀성 보호에 특화되어 Write Up을 허용하므로 데이터 무결성(Integrity)이 훼손될 수 있고, 정상적인 읽기/쓰기 경로 외에 시스템 자원 상태(파일 잠금, CPU 점유 시간 등)를 이용한 은닉 채널(Covert Channel)을 완벽히 막지 못하는 한계가 있습니다.",
      difficulty: "MEDIUM",
      keywords: ["Bell-LaPadula", "은닉 채널", "Covert Channel", "무결성 한계"],
    },
    {
      id: "SEC_CMN_GEN_016",
      category: "접근통제 및 보안 모델",
      question:
        "접근통제 구현 기법 중 '접근 제어 목록(ACL)'과 '역량 목록(Capability List)'을 행렬(Access Control Matrix) 관점에서 바르게 비교한 것은?",
      options: [
        "ACL은 객체(열) 기준, Capability List는 주체(행) 기준으로 저장한다.",
        "ACL은 주체(행) 기준, Capability List는 객체(열) 기준으로 저장한다.",
        "ACL은 주로 MAC에만, Capability List는 RBAC 역할 위임에만 사용된다.",
        "ACL은 특정 주체 보유 권한 파악이 쉽고, Capability List는 회수가 쉽다.",
      ],
      answer:
        "ACL은 객체(열) 기준, Capability List는 주체(행) 기준으로 저장한다.",
      explanation:
        "접근 제어 행렬(행=주체, 열=객체)에서 객체(열)별로 '누가 어떤 권한을 가지는지' 저장한 것이 ACL이며 특정 객체에 대한 권한 회수가 쉽습니다. 반대로 주체(행)별로 '어떤 객체에 무슨 권한을 가지는지' 티켓처럼 보관하는 것이 Capability List이며, 주체가 접근 가능한 자원 파악과 위임에 유리합니다.",
      difficulty: "MEDIUM",
      keywords: ["ACL", "Capability List", "접근 제어 행렬"],
    },
    {
      id: "SEC_CMN_GEN_017",
      category: "접근통제 및 보안 모델",
      question:
        "접근통제 보안 원칙 중 '최소 권한의 원칙(Principle of Least Privilege)'과 '직무 분리(Separation of Duties, SoD)'를 바르게 구분한 것은?",
      options: [
        "최소 권한은 필수 권한만 부여하고, 직무 분리는 중요 업무를 여러 인원에 나눈다.",
        "최소 권한은 필요시 관리자 권한을 일괄 부여하고, 직무 분리는 1인 전담을 막는다.",
        "최소 권한은 부서 간 네트워크 망 분리이고, 직무 분리는 비밀 데이터 암호화이다.",
        "최소 권한은 중요 업무를 다단계 승인하게 하고, 직무 분리는 최소 권한만 준다.",
      ],
      answer:
        "최소 권한은 필수 권한만 부여하고, 직무 분리는 중요 업무를 여러 인원에 나눈다.",
      explanation:
        "최소 권한(Least Privilege)은 계정 탈취나 오남용 시 피해 반경을 최소화하기 위해 꼭 필요한 권한만 부여하는 원칙이고, 직무 분리(SoD)는 예컨대 '코드 작성(개발자)'과 '운영 배포 승인(운영자)' 또는 '결제 요청'과 '승인'을 분리해 내부자 공모 없는 단독 사기·오류를 예방하는 통제입니다. 알 필요의 원칙(Need-to-Know)도 함께 자주 출제됩니다.",
      difficulty: "EASY",
      keywords: ["최소 권한", "직무 분리", "SoD", "접근통제 원칙"],
    },
    {
      id: "SEC_CMN_GEN_018",
      category: "접근통제 및 보안 모델",
      question:
        "클라우드·엔터프라이즈 환경에서 사용자의 부서, 직급뿐 아니라 접속 시간, 단말 보안 상태, 접속 국가(IP), 문서의 민감도 등 다양한 속성을 조건식으로 조합해 동적으로 접근 허용 여부를 결정하는 접근통제 모델은?",
      options: [
        "ABAC (속성 기반 접근통제)",
        "RBAC (역할 기반 접근통제)",
        "DAC (임의적 접근통제)",
        "MAC (강제적 접근통제)",
      ],
      answer: "ABAC (속성 기반 접근통제)",
      explanation:
        "ABAC(Attribute-Based Access Control)은 주체(사용자), 객체(자원), 행동(읽기/쓰기), 환경(시간/위치/단말 상태)의 다양한 속성을 정책(XACML 등)으로 평가하여 세밀하고 동적인 접근통제를 수행합니다. RBAC의 '역할 폭발(Role Explosion)' 문제를 보완하며 제로트러스트 환경에서 널리 활용됩니다.",
      difficulty: "EASY",
      keywords: ["ABAC", "속성 기반 접근통제", "RBAC 비교"],
    },
    {
      id: "SEC_CMN_GEN_019",
      category: "접근통제 및 보안 모델",
      question:
        "운영체제 커널 내부에서 모든 주체의 객체 접근 요청을 가로채어 보안 정책을 강제하는 추상적 개념인 '참조 모니터(Reference Monitor)'가 반드시 충족해야 하는 3대 요구사항은?",
      options: [
        "격리성(Tamperproof), 완전성(Always Invoked), 검증 가능성(Verifiable)",
        "기밀성(Confidentiality), 가용성(Availability), 부인방지(Non-repudiation)",
        "익명성(Anonymity), 확장성(Scalability), 호환성(Compatibility)",
        "유연성(Flexibility), 속도(Performance), 분산성(Distribution)",
      ],
      answer: "격리성(Tamperproof), 완전성(Always Invoked), 검증 가능성(Verifiable)",
      explanation:
        "참조 모니터(실제 구현체는 보안 커널, Security Kernel)는 ① 변조 불가능해야 함(격리성/Tamperproof), ② 모든 접근 시도를 우회 없이 반드시 중재해야 함(완전성/Always Invoked), ③ 설계와 구현이 올바른지 수학적·체계적으로 검증 가능할 만큼 작고 단순해야 함(검증 가능성/Verifiable)이라는 3대 조건을 만족해야 합니다.",
      difficulty: "MEDIUM",
      keywords: ["참조 모니터", "Reference Monitor", "보안 커널", "TCB"],
    },
    {
      id: "SEC_CMN_GEN_020",
      category: "접근통제 및 보안 모델",
      question:
        "기존에 일반 사용자 A가 소유한 기밀 문서 파일에 대해 DAC(임의적 접근통제)만 적용된 환경에서, A가 실행한 악성 게임 프로그램(트로이목마)이 A의 권한을 승계해 해당 기밀 문서를 공격자가 읽을 수 있는 공용 폴더로 복사해 버렸다. 이러한 트로이목마 기반 정보 유출을 원천 차단하기에 가장 적합한 접근통제 정책은?",
      options: [
        "MAC — 보안 등급 간 No Write Down 강제",
        "DAC — 소유자 권한 위임 및 ACL 세분화",
        "RBAC — 직무별 역할 그룹과 권한 매핑",
        "ABAC — 파일 소유자 비밀번호 길이 강화",
      ],
      answer: "MAC — 보안 등급 간 No Write Down 강제",
      explanation:
        "DAC에서는 프로세스가 실행자의 신원 권한을 그대로 물려받으므로 트로이목마가 소유자 권한으로 기밀 파일을 타인에게 복사·권한 부여할 수 있습니다. 반면 MAC(특히 Bell-LaPadula 모델)은 보안 레이블 기반으로 하위 등급 영역에 쓰는 행위(No Write Down)를 커널이 강제 차단하므로 트로이목마에 의한 기밀 유출을 방어할 수 있습니다.",
      difficulty: "MEDIUM",
      keywords: ["DAC 한계", "트로이목마", "MAC", "No Write Down"],
    },
    {
      id: "SEC_CMN_GEN_021",
      category: "접근통제 및 보안 모델",
      question:
        "비바(Biba) 모델에서 무결성 등급이 '낮음(Low)'인 일반 사용자 프로세스가 무결성 등급이 '높음(High)'인 시스템 설정 파일을 수정하려 할 때 발생하는 판정과 근거 규칙은?",
      options: [
        "차단됨 — 스타 무결성 공리(*-Integrity Axiom, No Write Up)",
        "허용됨 — 단순 보안 규칙(Simple Security Property, Write Up)",
        "차단됨 — 스타 보안 규칙(*-Property, No Write Down)",
        "허용됨 — 단순 무결성 공리(Simple Integrity Axiom, Read Up)",
      ],
      answer: "차단됨 — 스타 무결성 공리(*-Integrity Axiom, No Write Up)",
      explanation:
        "비바 모델에서는 신뢰도가 낮은 주체(Low)가 신뢰도가 높은 객체(High)에 데이터를 기록해 오염시키는 행위(Write Up)를 스타 무결성 공리(*-Integrity Axiom, No Write Up)로 금지합니다. No Write Down은 기밀성 모델인 벨-라파둘라(BLP)의 규칙입니다.",
      difficulty: "MEDIUM",
      keywords: ["Biba", "No Write Up", "스타 무결성 공리"],
    },
    {
      id: "SEC_CMN_GEN_022",
      category: "접근통제 및 보안 모델",
      question:
        "신뢰 컴퓨팅 기반(TCB, Trusted Computing Base)에 대한 설명으로 가장 올바른 것은?",
      options: [
        "보안 정책 강제를 위해 신뢰해야 하는 HW·펌웨어·SW 보호 메커니즘 전체 집합",
        "네트워크 경계에서 출발지·목적지 IP만 필터링하는 단일 상태 기반 방화벽",
        "공개키 기반 구조(PKI)에서 최상위 인증서를 서명·발급하는 Root CA 서버",
        "애플리케이션 단에서 사용자 입력 SQL 파라미터를 분리하는 바인딩 모듈",
      ],
      answer:
        "보안 정책 강제를 위해 신뢰해야 하는 HW·펌웨어·SW 보호 메커니즘 전체 집합",
      explanation:
        "TCB(Trusted Computing Base)는 보안 정책 집행에 관여하는 시스템 내 모든 하드웨어·펌웨어·소프트웨어 구성 요소의 총체이며, 참조 모니터와 보안 커널이 그 핵심을 이룹니다. TCB 경계 내부에 결함이 발생하면 전체 시스템의 보안 정책이 무력화될 수 있습니다.",
      difficulty: "EASY",
      keywords: ["TCB", "Trusted Computing Base", "보안 커널"],
    },
  ],
);

const gen0102 = buildSecuritySectionQuestions(
  {
    sectionId: "SEC_SEC_GEN_01_02",
    syllabusStandard: "2023_2026",
  },
  [
    {
      id: "SEC_CMN_GEN_023",
      category: "상업 무결성 및 이해충돌 방지 모델",
      question:
        "클락-윌슨(Clark-Wilson) 무결성 모델의 핵심 구성 요소 4가지(`CDI`, `UDI`, `TP`, `IVP`)의 의미를 바르게 연결한 것은?",
      options: [
        "CDI: 보호 데이터 / UDI: 미검증 입력 / TP: 정형 변환 / IVP: 무결성 검증",
        "CDI: 미검증 입력 / UDI: 보호 데이터 / TP: 무결성 검증 / IVP: 정형 변환",
        "CDI: 보안 등급 / UDI: 이해충돌 집합 / TP: 읽기 금지 / IVP: 쓰기 금지",
        "CDI: 보호 데이터 / UDI: 감사 로그 / TP: 강제 접근 / IVP: 직무 분리 승인",
      ],
      answer:
        "CDI: 보호 데이터 / UDI: 미검증 입력 / TP: 정형 변환 / IVP: 무결성 검증",
      explanation:
        "클락-윌슨 모델은 군사 기밀성(BLP)이나 단순 계층 무결성(Biba)과 달리 상업·금융 회계 환경에 맞게 설계된 무결성 모델입니다. 사용자는 보호 데이터(CDI)에 직접 접근할 수 없고, 인가된 정형화 트랜잭션(TP, Transformation Procedure)을 통해서만 미검증 입력(UDI)을 변환·처리할 수 있으며, 무결성 검증 절차(IVP)와 직무 분리(Separation of Duties)를 핵심으로 삼습니다.",
      difficulty: "MEDIUM",
      keywords: ["Clark-Wilson", "CDI", "UDI", "TP", "IVP"],
    },
    {
      id: "SEC_CMN_GEN_024",
      category: "상업 무결성 및 이해충돌 방지 모델",
      question:
        "비바(Biba) 모델과 클락-윌슨(Clark-Wilson) 모델이 모두 '무결성(Integrity)'을 목표로 하지만 접근 방식이 다른 핵심 차이점으로 가장 올바른 것은?",
      options: [
        "비바는 등급 비교로 읽기·쓰기를 막고, 클락-윌슨은 인가 프로그램(TP)·직무 분리로 통제한다.",
        "비바는 상업 트랜잭션과 직무 분리에 특화되고, 클락-윌슨은 군사 등급 격자 통제에 특화된다.",
        "클락-윌슨은 사용자가 보호 데이터(CDI)를 임의 편집기로 직접 수정하도록 허용해 유연하다.",
        "비바는 감사 추적과 정형화된 변환 절차를 핵심 규칙으로 두나 클락-윌슨은 격자만 본다.",
      ],
      answer:
        "비바는 등급 비교로 읽기·쓰기를 막고, 클락-윌슨은 인가 프로그램(TP)·직무 분리로 통제한다.",
      explanation:
        "비바 모델은 BLP의 쌍대(Dual)로서 격자 기반 무결성 등급 규칙(No Read Down / No Write Up)을 적용하고, 클락-윌슨 모델은 '사용자-프로그램(TP)-데이터(CDI)' 3요소 관계(Access Triple), 정형화된 트랜잭션(Well-formed Transaction), 직무 분리(SoD), 감사 추적을 통해 현실 상업 시스템의 무결성을 구현합니다.",
      difficulty: "MEDIUM",
      keywords: ["Biba", "Clark-Wilson", "정형화된 트랜잭션", "직무 분리"],
    },
    {
      id: "SEC_CMN_GEN_025",
      category: "상업 무결성 및 이해충돌 방지 모델",
      question:
        "만리장성 모델(Chinese Wall Model, Brewer-Nash 모델)의 핵심 특징과 적용 분야로 가장 올바른 것은?",
      options: [
        "이전 열람 이력에 따라 동일 이해충돌(COI) 경쟁사 접근을 동적 차단한다.",
        "사용자 인가 등급에 따라 고정된 군사 보안 등급표로 기밀 문서를 통제한다.",
        "인가된 정형화 트랜잭션(TP)으로만 회계 원장을 갱신해 상업 무결성을 지킨다.",
        "상위 등급의 입력이 하위 등급의 출력에 전혀 영향을 주지 않도록 격리한다.",
      ],
      answer:
        "이전 열람 이력에 따라 동일 이해충돌(COI) 경쟁사 접근을 동적 차단한다.",
      explanation:
        "만리장성(Brewer-Nash) 모델은 컨설팅·회계·투자은행 등 이해충돌(COI, Conflict of Interest) 방지 분야에서 주체의 과거 접근 이력에 따라 접근 권한이 동적으로 변하는 모델입니다. 동일 COI 클래스 내 한 기업 자료를 읽으면 경쟁사 자료 접근이 차단되지만 다른 COI 클래스 자료는 접근 가능합니다.",
      difficulty: "EASY",
      keywords: ["Chinese Wall", "Brewer-Nash", "이해충돌", "COI"],
    },
    {
      id: "SEC_CMN_GEN_026",
      category: "상업 무결성 및 이해충돌 방지 모델",
      question:
        "만리장성(Chinese Wall) 모델이 적용된 컨설팅 회사에 은행 COI 클래스 `{은행A, 은행B}`와 통신사 COI 클래스 `{통신X, 통신Y}`가 있다. 아직 아무 자료도 읽지 않은 컨설턴트 홍길동이 먼저 `은행A`의 비공개 자료를 읽은 직후, 다음 한 번의 열람 대상으로 선택할 수 있는 후보를 모두 고른 것은?",
      options: [
        "은행A, 통신X, 통신Y (은행B는 차단)",
        "은행A, 은행B (통신X, 통신Y는 차단)",
        "은행A만 가능 (은행B, 통신X, 통신Y 모두 차단)",
        "은행A, 은행B, 통신X, 통신Y 모두 가능",
      ],
      answer: "은행A, 통신X, 통신Y (은행B는 차단)",
      explanation:
        "만리장성 모델의 단순 보안 규칙은 ① 이미 접근한 회사의 데이터셋(`은행A`)이거나 ② 아직 어떤 회사 자료도 열람하지 않은 다른 이해충돌(COI) 클래스의 대상(`통신X` 또는 `통신Y`)에 대한 읽기를 허용합니다. 따라서 `은행A`를 읽은 직후 시점에는 같은 은행 COI 클래스의 경쟁사인 `은행B`만 차단되며, 다음 한 번의 열람 후보로는 `은행A`, `통신X`, `통신Y`를 각각 선택할 수 있습니다. 다만 `통신X`와 `통신Y`는 같은 통신사 COI 클래스에 속하므로, 이 시점에서 `통신X`를 선택해 읽으면 그 이후부터는 같은 클래스의 `통신Y`를 읽을 수 없게 됩니다.",
      difficulty: "MEDIUM",
      keywords: ["Chinese Wall", "COI 클래스", "단순 보안 규칙", "시나리오"],
    },
    {
      id: "SEC_CMN_GEN_027",
      category: "상업 무결성 및 이해충돌 방지 모델",
      question:
        "만리장성(Chinese Wall) 모델에서 스타 규칙(*-Property, 쓰기 규칙)을 두어 '주체가 이미 다른 회사의 비공개 데이터를 읽은 상태에서는 자신이 속한 회사 데이터에 쓰기를 제한'하는 이유는?",
      options: [
        "다른 회사 자료에 기록해 경쟁사 직원이 읽는 간접 유출 경로를 차단한다.",
        "정형화된 트랜잭션(TP) 없이 원장 데이터(CDI)를 수정하는 오류를 막는다.",
        "상위 등급 문서를 하위 등급 공용 폴더에 복사하는 트로이목마를 차단한다.",
        "동일한 COI 클래스 내 두 경쟁사 문서를 최초로 동시에 읽는 것을 막는다.",
      ],
      answer:
        "다른 회사 자료에 기록해 경쟁사 직원이 읽는 간접 유출 경로를 차단한다.",
      explanation:
        "만리장성 모델의 *-Property는 읽기만 제한할 경우 발생할 수 있는 간접 정보 흐름(예: 홍길동이 은행A와 통신X를 모두 읽은 뒤 은행A 정보를 통신X 파일에 적어 두면, 은행B 담당자가 통신X 파일을 읽어 은행A 정보를 얻는 우회 유출)을 차단하기 위해, 읽기 권한이 같은 회사(또는 정제된 공개 정보)에만 국한될 때만 쓰기를 허용합니다.",
      difficulty: "HARD",
      keywords: ["Chinese Wall", "쓰기 규칙", "간접 정보 유출"],
    },
    {
      id: "SEC_CMN_GEN_028",
      category: "상업 무결성 및 이해충돌 방지 모델",
      question:
        "클락-윌슨(Clark-Wilson) 모델에서 '인증 규칙(Certification Rules, C1~C5)'과 '강제 규칙(Enforcement Rules, E1~E4)'의 성격 차이를 바르게 설명한 것은?",
      options: [
        "강제(E)는 시스템 런타임 자동 집행, 인증(C)은 감사자 외부 검토·승인이다.",
        "인증(C)은 참조 모니터의 런타임 자동 검증, 강제(E)는 감사자의 연 1회 점검이다.",
        "강제(E)는 기밀 등급 비교를, 인증(C)은 공개키 인증서(X.509) 유효성을 검증한다.",
        "인증(C)은 UDI 입력 거부만, 강제(E)는 IVP 초기 설정 검증만 단독으로 담당한다.",
      ],
      answer:
        "강제(E)는 시스템 런타임 자동 집행, 인증(C)은 감사자 외부 검토·승인이다.",
      explanation:
        "클락-윌슨 모델은 시스템이 기술적으로 강제하는 Enforcement Rules(E1~E4: CDI는 인가된 TP로만 변경, 사용자-TP-CDI 3중 목록 유지, 사용자 인증 필수, 목록 변경 권한 제한)와 사람(관리자/감사자)이 검증·승인하는 Certification Rules(C1~C5: IVP 유효성, TP 변환 타당성, 직무 분리 충족, 감사 로그 기록, UDI→CDI 변환 검증)의 조화로 상업 무결성을 보장합니다.",
      difficulty: "HARD",
      keywords: ["Clark-Wilson", "Certification Rules", "Enforcement Rules"],
    },
    {
      id: "SEC_CMN_GEN_029",
      category: "상업 무결성 및 이해충돌 방지 모델",
      question:
        "보안 모델 중 '비간섭 모델(Non-Interference Model)'의 핵심 개념으로 가장 올바른 것은?",
      options: [
        "상위 등급 주체의 입력이 하위 등급 주체의 출력에 영향을 주지 않게 격리한다.",
        "동일 이해충돌 집합(COI) 내 두 기업 데이터의 동시 열람을 동적으로 제한한다.",
        "하위 무결성 주체가 상위 무결성 객체에 쓰지 못하도록 No Write Up을 강제한다.",
        "사용자·프로그램·데이터 3요소 관계를 인증·강제 규칙으로 묶어 무결성을 지킨다.",
      ],
      answer:
        "상위 등급 주체의 입력이 하위 등급 주체의 출력에 영향을 주지 않게 격리한다.",
      explanation:
        "비간섭(Non-Interference) 모델은 상위 등급 사용자의 입력을 제거하더라도 하위 등급 사용자가 받는 출력 결과가 완전히 동일해야 한다는 조건을 통해, BLP 모델이 해결하지 못한 은닉 채널(Covert Channel)을 통한 상위→하위 정보 유출을 이론적으로 차단하려는 정보 흐름 모델입니다.",
      difficulty: "HARD",
      keywords: ["비간섭 모델", "Non-Interference", "은닉 채널"],
    },
    {
      id: "SEC_CMN_GEN_030",
      category: "상업 무결성 및 이해충돌 방지 모델",
      question:
        "은행의 핵심 원장(계좌 잔액) 이체 시스템에서 일반 행원이 DB 파일에 직접 접속해 잔액을 고치지 못하게 하고, 반드시 '출금과 입금이 쌍으로 일치해야 하며 감사 로그가 자동 기록되는 전용 이체 프로그램'을 통해서만 처리하고, 일정 금액 이상은 결재자의 별도 승인을 거치도록 설계했다. 이 설계에 가장 직접적으로 부합하는 정형 보안 모델은?",
      options: [
        "클락-윌슨 모델 (Clark-Wilson Model)",
        "벨-라파둘라 모델 (Bell-LaPadula Model)",
        "만리장성 모델 (Chinese Wall Model)",
        "비바 모델 (Biba Model) 단독 적용",
      ],
      answer: "클락-윌슨 모델 (Clark-Wilson Model)",
      explanation:
        "복식부기·계좌 이체처럼 '정형화된 트랜잭션(TP)'을 통해서만 보호 데이터(CDI)를 변경하고, 감사 로그와 직무 분리(요청자·승인자 분리)를 강제하는 상업 금융 무결성 설계는 클락-윌슨(Clark-Wilson) 모델의 전형적인 구현 사례입니다.",
      difficulty: "EASY",
      keywords: ["Clark-Wilson", "금융 무결성", "TP", "직무 분리"],
    },
    {
      id: "SEC_CMN_GEN_031",
      category: "상업 무결성 및 이해충돌 방지 모델",
      question:
        "대표적인 정형 보안 모델 4가지와 그 핵심 초점(목적)을 바르게 짝지은 것은?",
      options: [
        "BLP: 기밀성 / Biba: 격자 무결성 / Clark-Wilson: 상업 무결성 / Chinese Wall: 이해충돌",
        "BLP: 격자 무결성 / Biba: 기밀성 / Clark-Wilson: 이해충돌 / Chinese Wall: 상업 무결성",
        "BLP: 기밀성 / Biba: 상업 무결성 / Clark-Wilson: 은닉 채널 / Chinese Wall: 직무 분리",
        "BLP: 가용성 / Biba: 격자 무결성 / Clark-Wilson: 기밀성 / Chinese Wall: 부인방지 차단",
      ],
      answer:
        "BLP: 기밀성 / Biba: 격자 무결성 / Clark-Wilson: 상업 무결성 / Chinese Wall: 이해충돌",
      explanation:
        "4대 보안 모델의 핵심 키워드 매칭은 4과목 필수 암기 사항입니다. Bell-LaPadula(BLP)=기밀성(NRU/NWD), Biba=격자 무결성(NRD/NWU), Clark-Wilson=상업 무결성(CDI/UDI/TP/IVP/SoD), Chinese Wall(Brewer-Nash)=동적 이해충돌(COI) 차단.",
      difficulty: "EASY",
      keywords: ["보안 모델 비교", "Bell-LaPadula", "Biba", "Clark-Wilson", "Chinese Wall"],
    },
  ],
);

const gen0201 = buildSecuritySectionQuestions(
  {
    sectionId: "SEC_SEC_GEN_02_01",
    syllabusStandard: "2023_2026",
  },
  [
    {
      id: "SEC_CMN_GEN_032",
      category: "암호 알고리즘 및 운영 모드",
      question:
        "블록 암호 운영 모드 중 동일한 평문 블록이 항상 동일한 암호문 블록으로 변환되어 이미지 윤곽 등 평문 패턴이 노출되는 모드(㉠)와, 카운터 값을 암호화해 평문과 XOR함으로써 암호화·복호화 모두 병렬 처리가 가능하고 패딩이 불필요한 모드(㉡)가 바르게 짝지어진 것은?",
      options: [
        "㉠ ECB (Electronic CodeBook) — ㉡ CTR (Counter)",
        "㉠ CBC (Cipher Block Chaining) — ㉡ ECB (Electronic CodeBook)",
        "㉠ CTR (Counter) — ㉡ CBC (Cipher Block Chaining)",
        "㉠ OFB (Output Feedback) — ㉡ ECB (Electronic CodeBook)",
      ],
      answer: "㉠ ECB (Electronic CodeBook) — ㉡ CTR (Counter)",
      explanation:
        "ECB는 블록 간 연쇄 없이 독립 암호화해 패턴 노출 및 블록 재정렬(Cut-and-Paste) 공격에 취약합니다. CTR 모드는 Nonce+Counter를 암호화해 생성한 키스트림과 평문을 XOR하는 스트림 암호 형태로, 암호화·복호화 모두 병렬 처리 및 임의 접근이 가능하고 패딩이 불필요합니다(단, 동일 키로 동일 Nonce/Counter 재사용 금지).",
      difficulty: "EASY",
      keywords: ["ECB", "CTR", "블록 암호 운영 모드", "병렬 처리"],
    },
    {
      id: "SEC_CMN_GEN_033",
      category: "암호 알고리즘 및 운영 모드",
      question:
        "CBC(Cipher Block Chaining) 운영 모드에서 암호화 및 복호화의 병렬 처리 가능 여부와 전송 중 암호문 블록 C[i]에 1비트 오류가 발생했을 때 복호화 오류 전파 범위로 올바른 것은?",
      options: [
        "암호화 순차·복호화 병렬 가능 — P[i] 전체와 P[i+1]의 1비트에 전파",
        "암호화·복호화 모두 병렬 불가 — 마지막 블록까지 전체에 오류 전파",
        "암호화 병렬·복호화 순차 처리 — 오류 전파 없이 P[i] 1비트만 손상",
        "암호화·복호화 모두 병렬 가능 — 인접 블록에 영향 없이 P[i]만 손상",
      ],
      answer:
        "암호화 순차·복호화 병렬 가능 — P[i] 전체와 P[i+1]의 1비트에 전파",
      explanation:
        "CBC 암호화는 이전 암호문 C[i-1]을 현재 평문 P[i]와 XOR한 뒤 암호화하므로 순차 실행만 가능하지만, 복호화는 P[i] = D(K, C[i]) ⊕ C[i-1]이므로 각 블록을 병렬 복호화할 수 있습니다. 전송 중 C[i]에 1비트 오류가 생기면 P[i]는 복호화 함수 때문에 블록 전체가 깨지고, P[i+1]은 C[i]와 직접 XOR되는 해당 1비트만 반전되며 P[i+2] 이후는 정상 복구됩니다.",
      difficulty: "MEDIUM",
      keywords: ["CBC", "오류 전파", "병렬 처리", "IV"],
    },
    {
      id: "SEC_CMN_GEN_034",
      category: "암호 알고리즘 및 운영 모드",
      question:
        "기밀성(암호화)과 무결성·인증(인증 태그)을 단일 운영 모드에서 동시에 제공하는 AEAD(Authenticated Encryption with Associated Data) 블록 암호 운영 모드로 가장 대표적인 것은?",
      options: [
        "GCM / CCM",
        "ECB / CBC",
        "CFB / OFB",
        "CTR / XTS",
      ],
      answer: "GCM / CCM",
      explanation:
        "GCM(Galois/Counter Mode)은 CTR 모드 암호화(기밀성)에 유한체 곱셈 기반 GHASH 인증 태그(무결성·인증)를 결합하고, CCM(Counter with CBC-MAC)은 CTR 모드 암호화(기밀성)와 CBC-MAC 인증 태그(무결성·인증)를 결합해 단일 운영 모드에서 기밀성과 무결성·인증을 함께 제공하는 AEAD 모드입니다(추가 인증 데이터 AAD 인증 포함). 반면 ECB, CBC, CFB, OFB, CTR, XTS는 기밀성만 제공하므로 무결성·인증을 위해서는 별도의 MAC이나 AEAD 모드가 필요합니다.",
      difficulty: "EASY",
      keywords: ["AEAD", "AES-GCM", "CCM", "인증된 암호화"],
    },
    {
      id: "SEC_CMN_GEN_035",
      category: "암호 알고리즘 및 운영 모드",
      question:
        "대표적인 대칭키 블록 암호인 DES와 AES의 구조, 블록 크기, 키 길이를 바르게 비교한 것은?",
      options: [
        "DES: Feistel·64비트·56비트 키 / AES: SPN·128비트·128/192/256키",
        "DES: SPN·64비트·56비트 키 / AES: Feistel·128비트·128/192/256키",
        "DES: Feistel·128비트·112비트 키 / AES: SPN·64비트·56/128/256키",
        "DES: Feistel·64비트·16라운드 / AES: ARX·256비트·16/20/24라운드",
      ],
      answer:
        "DES: Feistel·64비트·56비트 키 / AES: SPN·128비트·128/192/256키",
      explanation:
        "DES(Feistel, 64비트 블록, 56비트 유효 키+패리티 8비트, 16라운드)는 키 길이가 짧아 전수조사에 취약하며 3DES도 64비트 블록 한계(Sweet32)로 퇴출 추세입니다. AES(Rijndael, SPN 구조, 128비트 블록, 키 128/192/256비트 → 10/12/14라운드)가 현재 국제 표준입니다.",
      difficulty: "EASY",
      keywords: ["DES", "AES", "Feistel", "SPN", "블록 크기", "키 길이"],
    },
    {
      id: "SEC_CMN_GEN_036",
      category: "암호 알고리즘 및 운영 모드",
      question:
        "국내에서 개발·표준화된 대칭키 블록 암호 알고리즘과 그 특징이 바르게 연결된 것은?",
      options: [
        "SEED(Feistel)·ARIA(Inv.SPN)·LEA(ARX·128b)·HIGHT(IoT·64b)",
        "SEED(SPN·64b)·ARIA(Feistel·128b)·LEA(IoT·64b)·HIGHT(ARX·128b)",
        "SEED(ARX·128b)·ARIA(Feistel·64b)·LEA(Inv.SPN·128b)·HIGHT(SPN·128b)",
        "SEED(공개키 암호)·ARIA(해시함수)·LEA(키 교환)·HIGHT(전자서명)",
      ],
      answer: "SEED(Feistel)·ARIA(Inv.SPN)·LEA(ARX·128b)·HIGHT(IoT·64b)",
      explanation:
        "SEED(KISA, 128비트 블록, 128/256키, Feistel), ARIA(국정원/NSR, 128비트 블록, 128/192/256키, Involutional SPN), LEA(NSR, 128비트 블록, ARX 고속 연산), HIGHT(KISA/NSR, 64비트 블록, 128키, 초경량 저전력 IoT).",
      difficulty: "MEDIUM",
      keywords: ["SEED", "ARIA", "LEA", "HIGHT", "국산 암호 알고리즘"],
    },
    {
      id: "SEC_CMN_GEN_037",
      category: "암호 알고리즘 및 운영 모드",
      question:
        "대칭키 암호(비밀키)와 공개키 암호(비대칭키)에서 참가자 n명이 서로 비밀 통신을 수행하기 위해 필요한 총 키 개수를 바르게 짝지은 것은?",
      options: [
        "대칭키 암호: n(n-1)/2개 — 공개키 암호: 2n개",
        "대칭키 암호: 2n개 — 공개키 암호: n(n-1)/2개",
        "대칭키 암호: n²개 — 공개키 암호: n(n-1)개",
        "대칭키 암호: n-1개 — 공개키 암호: 2(n-1)개",
      ],
      answer: "대칭키 암호: n(n-1)/2개 — 공개키 암호: 2n개",
      explanation:
        "대칭키 암호는 통신 쌍마다 공유 비밀키가 필요해 n(n-1)/2개로 O(n²)만큼 증가하므로 대규모 환경에서 키 배송·관리 문제가 큽니다. 공개키 암호는 각 사용자당 공개키·개인키 1쌍(2개)씩 총 2n개로 O(n)으로 선형 증가해 키 관리에 유리하지만 연산 속도가 느리므로, 실무에서는 하이브리드 암호화를 사용합니다.",
      difficulty: "EASY",
      keywords: ["대칭키", "공개키", "키 개수", "하이브리드 암호화"],
    },
    {
      id: "SEC_CMN_GEN_038",
      category: "암호 알고리즘 및 운영 모드",
      question:
        "공개키 암호 알고리즘과 그 안전성의 근거가 되는 수학적 난제가 바르게 연결된 것은?",
      options: [
        "RSA: 소인수분해 / DH·ElGamal·DSA: 이산대수 / ECC: 타원곡선 이산대수",
        "RSA: 이산대수 / DH·ElGamal: 타원곡선 / ECC: 큰 합성수 소인수분해",
        "RSA: 타원곡선 이산대수 / DSA: 소인수분해 / ECC: 일반 유한체 이산대수",
        "RSA: 배낭(Knapsack) 문제 / DH: 소인수분해 / ECC: 격자 기반 LWE",
      ],
      answer:
        "RSA: 소인수분해 / DH·ElGamal·DSA: 이산대수 / ECC: 타원곡선 이산대수",
      explanation:
        "공개키 암호의 수학적 기반 구분은 필수입니다. 소인수분해 기반=RSA·Rabin, 이산대수(DLP) 기반=Diffie-Hellman(키교환)·ElGamal(암호/서명)·DSA(서명), 타원곡선 이산대수(ECDLP) 기반=ECC(ECDH/ECDSA, RSA 대비 훨씬 짧은 키 길이 256비트로 RSA 3072비트급 안전성 제공).",
      difficulty: "EASY",
      keywords: ["RSA", "소인수분해", "이산대수", "ECC", "Diffie-Hellman"],
    },
    {
      id: "SEC_CMN_GEN_039",
      category: "암호 알고리즘 및 운영 모드",
      question:
        "디피-헬만(Diffie-Hellman) 키 교환 프로토콜이 단독으로 사용될 때 가장 취약한 공격 유형과 이를 방어하기 위한 보완 대책은?",
      options: [
        "중간자 공격(MITM) — 인증서 기반 전자서명 결합(Authenticated DH)",
        "생일 충돌 공격 — 소수 p 대신 128비트 해시 출력을 키로 사용",
        "패딩 오라클 공격 — 키 교환 단계에 PKCS#7 패딩 블록 추가",
        "중간자 일치 공격 — 키 교환 공개 지수를 2회 연속 적용",
      ],
      answer: "중간자 공격(MITM) — 인증서 기반 전자서명 결합(Authenticated DH)",
      explanation:
        "순수 디피-헬만(DH) 키 교환은 도청자(수동 공격자)로부터 공유 비밀키를 안전하게 생성할 수 있지만, 상대방 인증 기능이 없어 공격자가 중간에서 각자와 별도 키를 교환하는 MITM(능동 공격)에 취약합니다. 따라서 TLS 등에서는 DH 공개값에 서버 인증서와 전자서명을 결합해 MITM을 차단합니다.",
      difficulty: "EASY",
      keywords: ["Diffie-Hellman", "MITM", "상대방 인증", "키 교환"],
    },
    {
      id: "SEC_CMN_GEN_040",
      category: "암호 알고리즘 및 운영 모드",
      question:
        "암호 해독 공격 유형 4가지(COA, KPA, CPA, CCA)를 공격자가 보유한 정보·능력 수준이 가장 낮은 것부터 높은 순으로 바르게 나열한 것은?",
      options: [
        "암호문 단독 공격(COA) < 기지 평문 공격(KPA) < 선택 평문 공격(CPA) < 선택 암호문 공격(CCA)",
        "선택 암호문 공격(CCA) < 선택 평문 공격(CPA) < 기지 평문 공격(KPA) < 암호문 단독 공격(COA)",
        "기지 평문 공격(KPA) < 암호문 단독 공격(COA) < 선택 암호문 공격(CCA) < 선택 평문 공격(CPA)",
        "암호문 단독 공격(COA) < 선택 암호문 공격(CCA) < 기지 평문 공격(KPA) < 선택 평문 공격(CPA)",
      ],
      answer:
        "암호문 단독 공격(COA) < 기지 평문 공격(KPA) < 선택 평문 공격(CPA) < 선택 암호문 공격(CCA)",
      explanation:
        "암호 공격 모델에서 ① COA(Ciphertext-Only): 암호문만 보유(공격자에게 가장 불리), ② KPA(Known-Plaintext): 일부 평문-암호문 쌍을 이미 알고 있음, ③ CPA(Chosen-Plaintext): 원하는 평문을 암호화기에 넣어 암호문을 얻을 수 있음, ④ CCA(Chosen-Ciphertext): 원하는 암호문을 복호화기에 넣어 평문을 얻을 수 있음(공격자에게 가장 유리).",
      difficulty: "EASY",
      keywords: ["암호 공격 유형", "COA", "KPA", "CPA", "CCA"],
    },
    {
      id: "SEC_CMN_GEN_041",
      category: "암호 알고리즘 및 운영 모드",
      question:
        "블록 암호에 대한 대표적 암호 분석 기법 중 '차분 암호 분석(Differential Cryptanalysis)'과 '선형 암호 분석(Linear Cryptanalysis)'이 주로 요구하는 공격 모델을 바르게 짝지은 것은?",
      options: [
        "차분 암호 분석: 선택 평문(CPA) / 선형 암호 분석: 기지 평문(KPA)",
        "차분 암호 분석: 기지 평문(KPA) / 선형 암호 분석: 선택 평문(CPA)",
        "차분 암호 분석: 암호문 단독(COA) / 선형 암호 분석: 선택 암호문(CCA)",
        "차분 암호 분석: 선택 암호문(CCA) / 선형 암호 분석: 암호문 단독(COA)",
      ],
      answer: "차분 암호 분석: 선택 평문(CPA) / 선형 암호 분석: 기지 평문(KPA)",
      explanation:
        "차분 암호 분석(비함·샤미르)은 특정 입력 차이(ΔP)를 가진 평문 쌍을 선택해 출력 차이(ΔC)의 확률 분포를 추적하는 CPA 기법이고, 선형 암호 분석(마쓰이)은 평문·암호문·키 비트 간 선형 근사식의 편향을 다수의 평문-암호문 쌍으로 찾는 KPA 기법입니다.",
      difficulty: "HARD",
      keywords: ["차분 암호 분석", "선형 암호 분석", "CPA", "KPA"],
    },
    {
      id: "SEC_CMN_GEN_042",
      category: "암호 알고리즘 및 운영 모드",
      question:
        "단순 이중 DES(Double DES, 2-DES)가 키 길이를 112비트로 두 배 늘렸음에도 불구하고 실제 안전성이 57비트 수준에 불과해 실무에서 3중 DES(Triple DES)를 사용하게 만든 대표적 암호 공격 기법은?",
      options: [
        "중간자 일치 공격 (Meet-in-the-Middle)",
        "패딩 오라클 공격 (Padding Oracle Attack)",
        "생일 충돌 공격 (Birthday Attack)",
        "연관 키 공격 (Related-Key Attack)",
      ],
      answer: "중간자 일치 공격 (Meet-in-the-Middle)",
      explanation:
        "Meet-in-the-Middle 공격은 평문 P를 모든 가능한 K1(2^56)로 암호화해 테이블에 저장하고, 암호문 C를 모든 가능한 K2(2^56)로 복호화하며 중간값이 일치하는 키 쌍을 찾는 시간-메모리 절충 공격입니다. 총 연산량이 2^112가 아니라 2^56 + 2^56 = 2^57 수준으로 급감하므로 2DES 대신 3DES(EDE)가 사용되었습니다.",
      difficulty: "MEDIUM",
      keywords: ["Meet-in-the-Middle", "중간자 일치 공격", "2DES", "3DES"],
    },
    {
      id: "SEC_CMN_GEN_043",
      category: "암호 알고리즘 및 운영 모드",
      question:
        "RSA 암호화에서 두 소수 p = 3, q = 11일 때 모듈러스 n = 33과 오일러 피 함수 φ(n) = 20이 구해졌다. 공개 지수 e = 3을 선택했을 때 (e × d) mod φ(n) = 1을 만족하는 개인 지수 d로 올바른 값은?",
      options: [
        "7",
        "3",
        "11",
        "13",
      ],
      answer: "7",
      explanation:
        "RSA에서 (e × d) mod φ(n) = 1을 만족하는 d를 구하면 (3 × d) mod 20 = 1입니다. 3 × 7 = 21 = 20 × 1 + 1이므로 21 mod 20 = 1이 되어 d = 7입니다. 3 × 3 = 9, 3 × 11 = 33(mod 20 = 13), 3 × 13 = 39(mod 20 = 19)는 조건을 만족하지 않습니다.",
      difficulty: "MEDIUM",
      keywords: ["RSA 계산", "오일러 피 함수", "공개키", "개인키"],
    },
  ],
);

const gen0202 = buildSecuritySectionQuestions(
  {
    sectionId: "SEC_SEC_GEN_02_02",
    syllabusStandard: "2023_2026",
  },
  [
    {
      id: "SEC_CMN_GEN_044",
      category: "해시·MAC·전자서명 및 PKI",
      question:
        "암호학적 해시 함수가 반드시 만족해야 하는 3대 안전성 요구사항(역상 저항성, 제2역상 저항성, 충돌 저항성)의 정의를 바르게 연결한 것은?",
      options: [
        "역상: h→x 불가 / 제2역상: 동일 해시 다른 x' 불가 / 충돌: 임의 쌍 불가",
        "역상: 임의 쌍 불가 / 제2역상: h→x 복원 불가 / 충돌: 고정 x의 x' 불가",
        "역상: 비밀키 없는 해시 / 제2역상: 길이 확장 저항 / 충돌: 대칭키 복호화 불가",
        "역상: 출력 길이 고정 / 제2역상: 병렬 계산 가능 / 충돌: 눈사태 효과 100% 보장",
      ],
      answer:
        "역상: h→x 불가 / 제2역상: 동일 해시 다른 x' 불가 / 충돌: 임의 쌍 불가",
      explanation:
        "해시 3대 요구사항은 ① 역상 저항성(Preimage Resistance, 일방향성: 해시 h로부터 원본 x 탐색 불가), ② 제2역상 저항성(약한 충돌 저항성: 주어진 x와 H(x)=H(x')인 다른 x' 탐색 불가), ③ 충돌 저항성(강한 충돌 저항성: H(x)=H(x')인 임의의 서로 다른 쌍 (x, x') 탐색 불가, 생일 공격으로 2^(n/2) 복잡도)으로 구분합니다.",
      difficulty: "EASY",
      keywords: ["해시 함수", "역상 저항성", "제2역상 저항성", "충돌 저항성", "생일 공격"],
    },
    {
      id: "SEC_CMN_GEN_045",
      category: "해시·MAC·전자서명 및 PKI",
      question:
        "메시지 인증 코드(MAC / HMAC)와 디지털 서명(전자서명)이 제공하는 보안 서비스의 결정적 차이점으로 올바른 것은?",
      options: [
        "MAC은 공유키라 부인방지가 없고, 전자서명은 개인키 서명이라 부인방지가 있다.",
        "MAC은 부인방지·기밀성을 모두 제공하고, 전자서명은 무결성 검증만 제공한다.",
        "MAC은 공개키 기반 서명 방식을 쓰고, 전자서명은 송수신자 공유 비밀키를 쓴다.",
        "MAC은 제3자 분쟁 증명이 가능하나, 전자서명은 발신자만 검증해 부인방지가 없다.",
      ],
      answer:
        "MAC은 공유키라 부인방지가 없고, 전자서명은 개인키 서명이라 부인방지가 있다.",
      explanation:
        "MAC/HMAC은 송수신자가 동일한 비밀키를 공유하므로 무결성과 메시지 인증은 제공하지만 수신자도 동일한 MAC을 만들 수 있어 '송신자가 보냈음'을 제3자에게 증명(부인방지, Non-repudiation)할 수 없습니다. 반면 디지털 서명은 송신자만 보유한 개인키로 서명하고 누구나 송신자 공개키로 검증할 수 있어 부인방지까지 제공합니다.",
      difficulty: "EASY",
      keywords: ["MAC", "HMAC", "디지털 서명", "부인방지"],
    },
    {
      id: "SEC_CMN_GEN_046",
      category: "해시·MAC·전자서명 및 PKI",
      question:
        "디지털 서명의 특수 응용 기법 중 '은닉 서명(Blind Signature)'의 동작 목적과 대표적 활용 사례로 올바른 것은?",
      options: [
        "서명자가 내용을 보지 않고 서명해 익명성 보장 — 전자화폐·전자투표",
        "상점은 주문만, 카드사는 결제만 검증하며 연결 보장 — 전자상거래",
        "지정된 단일 수신자만 서명 진위를 확인하도록 제한 — 비공개 계약",
        "다수 서명자 중 임계 인원(t명) 이상 합의 시 서명 완성 — 키 분산",
      ],
      answer: "서명자가 내용을 보지 않고 서명해 익명성 보장 — 전자화폐·전자투표",
      explanation:
        "은닉 서명(Blind Signature, David Chaum)은 요청자가 메시지에 은닉 인자(Blinding Factor)를 곱해 서명자에게 보내 서명을 받은 뒤 은닉 인자를 제거해 원본에 대한 유효 서명을 얻는 기법으로, 서명자가 내용을 몰라도 정당성이 보장되어 전자투표·익명 전자화폐에 활용됩니다. 이중 서명(SET), 부인 불가 서명, 임계 서명과 구분해야 합니다.",
      difficulty: "MEDIUM",
      keywords: ["은닉 서명", "Blind Signature", "전자투표", "전자화폐"],
    },
    {
      id: "SEC_CMN_GEN_047",
      category: "해시·MAC·전자서명 및 PKI",
      question:
        "PKI(공개키 기반 구조)의 주요 구성 요소인 CA(인증기관), RA(등록기관), 디렉터리(저장소)의 역할을 바르게 연결한 것은?",
      options: [
        "CA: 발급·폐지 서명 / RA: 신원 확인·등록 대행 / 디렉터리: 인증서·CRL 게시",
        "CA: 신원 확인 대행 / RA: 인증서 최종 서명 / 디렉터리: 사용자 개인키 보관",
        "CA: 인증서·CRL 게시 / RA: 발급·폐지 서명 / 디렉터리: 오프라인 신원 검증",
        "CA: 세션 대칭키 발급 / RA: CRL 실시간 응답 / 디렉터리: 사용자 비밀번호 관리",
      ],
      answer:
        "CA: 발급·폐지 서명 / RA: 신원 확인·등록 대행 / 디렉터리: 인증서·CRL 게시",
      explanation:
        "PKI 3대 구성 요소에서 RA(Registration Authority)는 신청자의 신원을 대면·비대면 검증해 CA에 발급을 요청함으로써 CA의 부하를 분산하고, CA(Certification Authority)는 자신의 개인키로 X.509 인증서에 전자서명하여 발급·갱신·폐지합니다. 디렉터리(LDAP 등)는 발급된 인증서와 CRL을 게시합니다.",
      difficulty: "EASY",
      keywords: ["PKI", "CA", "RA", "디렉터리", "X.509"],
    },
    {
      id: "SEC_CMN_GEN_048",
      category: "해시·MAC·전자서명 및 PKI",
      question:
        "PKI에서 인증서 폐지 상태를 확인하는 두 방식인 CRL(인증서 폐지 목록)과 OCSP(온라인 인증서 상태 프로토콜)를 비교한 설명으로 올바른 것은?",
      options: [
        "CRL은 주기적 전체 목록 배포라 지연이 있고, OCSP는 실시간 개별 상태 조회다.",
        "CRL은 실시간 개별 요청-응답 방식이고, OCSP는 주기적 일괄 목록 파일 배포다.",
        "CRL과 OCSP는 모두 유효 기간이 만료된 인증서의 개인키 목록을 함께 배포한다.",
        "OCSP는 클라이언트가 CA에 직접 조회할 필요 없이 인증서 내부에 폐지일만 적는다.",
      ],
      answer:
        "CRL은 주기적 전체 목록 배포라 지연이 있고, OCSP는 실시간 개별 상태 조회다.",
      explanation:
        "CRL은 CA가 폐지된 인증서 일련번호 목록을 주기적으로 배포해 목록 크기 증가와 반영 지연 한계가 있고, OCSP는 실시간 요청-응답으로 개별 인증서 상태(`good`/`revoked`/`unknown`)를 즉시 확인합니다. OCSP 서버 부하·프라이버시 우려는 웹 서버가 응답을 첨부하는 OCSP Stapling으로 보완합니다.",
      difficulty: "EASY",
      keywords: ["CRL", "OCSP", "OCSP Stapling", "PKI 인증서 폐지"],
    },
    {
      id: "SEC_CMN_GEN_049",
      category: "해시·MAC·전자서명 및 PKI",
      question:
        "PKI 신뢰 모델 중 계층 구조(Hierarchical), 네트워크/메시 구조(Mesh), 브리지 CA 구조(Bridge CA)의 특징으로 올바른 것은?",
      options: [
        "계층은 단일 Root CA 트리, 브리지는 독립 도메인 간 O(n) 교차 연결 허브다.",
        "계층 구조에는 최상위 Root CA가 없고 각 기관이 1:1로 직접 교차 인증한다.",
        "메시 구조는 단일 Root CA 아래 수직 종속되어 인증 경로 탐색이 가장 단순하다.",
        "브리지 CA는 최종 사용자 브라우저에 직접 루트 개인키를 발급하는 단말이다.",
      ],
      answer:
        "계층은 단일 Root CA 트리, 브리지는 독립 도메인 간 O(n) 교차 연결 허브다.",
      explanation:
        "계층 구조는 단일 Root CA 아래 트리 구조로 탐색이 단순하나 Root CA 침해 시 전체 신뢰가 붕괴(SPOF)됩니다. 메시(네트워크) 구조는 상호 교차 인증으로 독립성을 유지하나 기관 수 증가 시 n(n-1)/2 복잡도가 커지고, 브리지 CA는 각 독립 도메인이 브리지 CA와만 상호 인증해 교차 인증 수를 O(n)으로 줄입니다.",
      difficulty: "MEDIUM",
      keywords: ["PKI 구성방식", "계층 구조", "네트워크 구조", "브리지 CA"],
    },
    {
      id: "SEC_CMN_GEN_050",
      category: "해시·MAC·전자서명 및 PKI",
      question:
        "X.509 v3 공개키 인증서에 포함되는 필수 정보 항목으로 짝지어졌으며, 인증서 안에 절대 포함되어서는 안 되는 항목을 정확히 구별한 것은?",
      options: [
        "포함: 주체 공개키·CA 서명·유효기간 / 금지: 주체 개인키",
        "포함: 주체 개인키·CA 공개키·일련번호 / 금지: 주체 공개키",
        "포함: 세션 대칭키·주체 공개키·버전 / 금지: 발급자(CA) 서명",
        "포함: CA 개인키·주체 이름·유효기간 / 금지: 인증서 일련번호",
      ],
      answer: "포함: 주체 공개키·CA 서명·유효기간 / 금지: 주체 개인키",
      explanation:
        "X.509 v3 인증서는 버전, 일련번호, 서명 알고리즘, 발급자(CA), 유효기간, 주체(Subject), 주체의 공개키, CA의 전자서명을 포함해 특정 주체와 그 '공개키'를 보증하는 공개 문서입니다. 주체의 개인키나 CA의 개인키, 세션 비밀키는 절대 포함되지 않습니다.",
      difficulty: "EASY",
      keywords: ["X.509", "인증서 구조", "공개키", "개인키 미포함"],
    },
    {
      id: "SEC_CMN_GEN_051",
      category: "해시·MAC·전자서명 및 PKI",
      question:
        "해시 함수의 길이 확장 공격(Length Extension Attack)에 취약한 구조(Merkle-Damgård 기반 SHA-256의 단순 `H(key || message)`)를 보완하기 위해 내부·외부 패딩(`ipad`, `opad`)을 이용한 이중 해시 구조 `H((K⊕opad) || H((K⊕ipad) || m))`로 설계된 표준 메시지 인증 코드는?",
      options: [
        "HMAC (Hash-based Message Authentication Code)",
        "CMAC (Cipher-based Message Authentication Code)",
        "HKDF (HMAC-based Key Derivation Function)",
        "CRC-32 (Cyclic Redundancy Check Code)",
      ],
      answer: "HMAC (Hash-based Message Authentication Code)",
      explanation:
        "단순 `H(K || M)` 방식은 MD5·SHA-1·SHA-256 같은 Merkle-Damgård 구조 해시에서 키를 모르고도 메시지 뒤에 데이터를 덧붙여 유효한 해시를 위조하는 길이 확장 공격에 취약합니다. HMAC은 키와 `ipad`/`opad`를 결합한 중첩 이중 해시 구조로 길이 확장 공격을 방어합니다. CMAC은 블록암호 기반 MAC, HKDF는 키 유도 함수, CRC-32는 비암호학적 오류 검출 코드입니다.",
      difficulty: "MEDIUM",
      keywords: ["HMAC", "길이 확장 공격", "ipad", "opad", "Merkle-Damgård"],
    },
    {
      id: "SEC_CMN_GEN_052",
      category: "해시·MAC·전자서명 및 PKI",
      question:
        "해시 함수의 출력 길이와 안전성(충돌 저항성)에 대한 설명으로 올바른 것은?",
      options: [
        "MD5·SHA-1은 충돌 취약으로 폐기됐으며, SHA-2 또는 스펀지 구조 SHA-3를 쓴다.",
        "MD5는 256비트 출력을 제공해 현재도 전자서명·무결성 표준으로 널리 권장된다.",
        "SHA-1은 160비트 구조상 실제 충돌 쌍 생성이 불가능함이 수학적으로 증명됐다.",
        "SHA-3(Keccak)는 SHA-2와 동일한 Merkle-Damgård 구조라 길이 확장에 취약하다.",
      ],
      answer:
        "MD5·SHA-1은 충돌 취약으로 폐기됐으며, SHA-2 또는 스펀지 구조 SHA-3를 쓴다.",
      explanation:
        "MD5(128비트)와 SHA-1(160비트, SHAttered 충돌 실증)은 충돌 공격이 입증되어 신규 보안 시스템에서 사용이 금지되며, 현재 표준은 SHA-2(SHA-256/384/512)와 완전히 다른 내부 구조(Sponge Construction, 길이 확장 공격에 본질적으로 안전)를 채택한 SHA-3(Keccak)입니다.",
      difficulty: "EASY",
      keywords: ["SHA-256", "SHA-3", "Keccak", "Sponge", "MD5/SHA-1 취약점"],
    },
  ],
);

const gen0203 = buildSecuritySectionQuestions(
  {
    sectionId: "SEC_SEC_GEN_02_03",
    syllabusStandard: "2023_2026",
  },
  [
    {
      id: "SEC_CMN_GEN_053",
      category: "인증 기술 및 커버로스",
      question:
        "사용자 인증 4요소(지식·소유·존재·위치/행위)에 따른 인증 수단과 다중요소 인증(MFA)의 조건을 바르게 설명한 것은?",
      options: [
        "지식·소유·존재 중 서로 다른 2가지 이상 범주를 결합해야 MFA다.",
        "비밀번호(지식)와 보안 질문(지식)을 함께 검증하면 2요소 MFA다.",
        "지문과 홍채 2가지 생체정보를 연속 입력하는 것은 지식·존재 MFA다.",
        "FIDO 보안키(소유)만 단독으로 PIN 없이 터치하면 다중요소 인증이다.",
      ],
      answer: "지식·소유·존재 중 서로 다른 2가지 이상 범주를 결합해야 MFA다.",
      explanation:
        "진정한 다중요소 인증(MFA)은 '서로 다른 인증 범주(지식·소유·존재 등)'를 조합해야 합니다. 비밀번호+보안질문은 둘 다 지식 기반(1요소 중복)이고, 지문+홍채는 둘 다 생체/존재 기반(1요소 중복)입니다. 예컨대 비밀번호(지식) + OTP/FIDO 보안키(소유) 조합이 대표적인 2FA/MFA입니다.",
      difficulty: "EASY",
      keywords: ["MFA", "인증 요소", "지식", "소유", "존재"],
    },
    {
      id: "SEC_CMN_GEN_054",
      category: "인증 기술 및 커버로스",
      question:
        "생체인증 시스템에서 타인 수락률(FAR, Type II Error), 본인 거부율(FRR, Type I Error), 교차 오류율(CER / EER)의 관계 및 보안 민감도 조정 효과를 바르게 설명한 것은?",
      options: [
        "임계치를 높이면 FAR 감소·FRR 증가하며, CER이 낮을수록 성능이 우수하다.",
        "임계치를 높이면 FAR 증가·FRR 감소하며, CER이 높을수록 보안이 우수하다.",
        "임계치를 높이면 FAR과 FRR이 동시에 감소하며 교차점이 0에 수렴하게 된다.",
        "FRR은 타인을 본인으로 오인 허용하는 오류이고 FAR은 본인 거부율 오류이다.",
      ],
      answer:
        "임계치를 높이면 FAR 감소·FRR 증가하며, CER이 낮을수록 성능이 우수하다.",
      explanation:
        "FAR(False Acceptance Rate, Type II 오류: 타인을 본인으로 오인 수락 — 보안상 더 위험)과 FRR(False Rejection Rate, Type I 오류: 본인을 타인으로 오인 거부 — 편의성 저하)은 반비례(Trade-off) 관계입니다. 두 곡선이 교차하는 CER(Crossover Error Rate / EER)이 낮을수록 정확도가 뛰어난 생체인증 시스템입니다.",
      difficulty: "EASY",
      keywords: ["생체인증", "FAR", "FRR", "CER", "EER", "Type I/II Error"],
    },
    {
      id: "SEC_CMN_GEN_055",
      category: "인증 기술 및 커버로스",
      question:
        "커버로스(Kerberos) 인증 프로토콜의 KDC(Key Distribution Center)를 구성하는 두 핵심 서버와 각각 발급하는 티켓의 역할을 바르게 연결한 것은?",
      options: [
        "AS: 신원 인증 후 TGT 발급 — TGS: TGT 검증 후 서비스 티켓(ST) 발급",
        "AS: TGT 검증 후 ST 발급 — TGS: 신원 인증 후 초기 TGT 발급",
        "AS: X.509 공개키 인증서 발급 — TGS: CRL 폐지 목록 실시간 응답",
        "AS: 사용자 세션키 평문 브로드캐스트 — TGS: 타임스탬프 동기화 수행",
      ],
      answer:
        "AS: 신원 인증 후 TGT 발급 — TGS: TGT 검증 후 서비스 티켓(ST) 발급",
      explanation:
        "커버로스는 대칭키 암호와 신뢰 제3자(KDC = AS + TGS) 기반의 중앙 인증 프로토콜입니다. ① 클라이언트 → AS(TGT 획득), ② 클라이언트 → TGS(TGT+Authenticator 제출 → 특정 서버용 서비스 티켓 ST 획득), ③ 클라이언트 → 실제 서비스 서버(ST+Authenticator 제출 → 상호 인증 및 서비스 이용) 3단계로 동작합니다.",
      difficulty: "EASY",
      keywords: ["Kerberos", "KDC", "AS", "TGS", "TGT", "ST"],
    },
    {
      id: "SEC_CMN_GEN_056",
      category: "인증 기술 및 커버로스",
      question:
        "커버로스(Kerberos) 프로토콜에서 재전송 공격(Replay Attack)을 방지하기 위해 티켓과 함께 전송하는 인증자(Authenticator)에 포함되는 핵심 요소와 이로 인해 발생하는 필수 운영 요구사항은?",
      options: [
        "타임스탬프(Timestamp) — KDC·서버·단말 간 정밀 시간 동기화(NTP) 필수",
        "단순 증가 카운터 — KDC와 서비스 서버 간 실시간 시간 동기화 불필요",
        "클라이언트 MAC 주소 — 모든 단말이 동일 L2 서브넷에 배치될 것",
        "X.509 인증서 지문 — 모든 내부 서버에 공인 TLS 인증서를 탑재할 것",
      ],
      answer:
        "타임스탬프(Timestamp) — KDC·서버·단말 간 정밀 시간 동기화(NTP) 필수",
      explanation:
        "커버로스는 네트워크에서 패킷을 도청해 재전송하는 공격을 막기 위해 세션키로 암호화된 타임스탬프(Authenticator)를 검증합니다. 따라서 참여 시스템 간 시각 오차가 허용 범위(기본 5분)를 넘으면 정상 사용자도 인증에 실패하므로 NTP 시간 동기화가 필수이며, KDC가 단일 장애점(SPOF)이 되지 않도록 이중화해야 합니다.",
      difficulty: "MEDIUM",
      keywords: ["Kerberos", "Timestamp", "NTP 시간 동기화", "재전송 공격 방지"],
    },
    {
      id: "SEC_CMN_GEN_057",
      category: "인증 기술 및 커버로스",
      question:
        "일회용 패스워드(OTP) 생성 방식 중 시간 동기화 방식(TOTP), 이벤트 동기화 방식(HOTP), 질의-응답(Challenge-Response) 방식의 특징을 바르게 비교한 것은?",
      options: [
        "TOTP는 시각(30초), HOTP는 카운터, 질의-응답은 서버 난수(Challenge) 기반이다.",
        "TOTP는 카운터 증가, HOTP는 현재 시각 동기화, 질의-응답은 고정 해시 기반이다.",
        "TOTP는 시간 동기화가 필요 없으며, HOTP는 30초마다 서버와 자동 만료 동기화한다.",
        "질의-응답 방식은 서버 난수 없이 단말과 서버 간 사전에 정한 동일 코드를 반복 쓴다.",
      ],
      answer:
        "TOTP는 시각(30초), HOTP는 카운터, 질의-응답은 서버 난수(Challenge) 기반이다.",
      explanation:
        "OTP 주요 방식: ① 시간 동기화(TOTP, RFC 6238: 공유 키+현재 시각 기반, 시간 오차 보정 필요), ② 이벤트/카운터 동기화(HOTP, RFC 4226: 카운터 불일치 시 재동기화 필요), ③ 질의-응답(Challenge-Response: 서버 난수 기반, 비동기화), ④ S/KEY(해시 체인 역순 사용, H^n(s)부터 역으로 검증).",
      difficulty: "MEDIUM",
      keywords: ["OTP", "TOTP", "HOTP", "Challenge-Response", "S/KEY"],
    },
    {
      id: "SEC_CMN_GEN_058",
      category: "인증 기술 및 커버로스",
      question:
        "패스워드 없는(Passwordless) 차세대 인증 표준인 FIDO2(WebAuthn + CTAP)가 기존 비밀번호·SMS OTP 기반 인증보다 피싱 공격에 근본적으로 강력한 주된 이유는?",
      options: [
        "생체는 로컬 검증만 하고 공개키 서명에 도메인(Origin)을 바인딩하기 때문이다.",
        "단말에서 추출한 지문 특징점을 서버 DB로 암호화 전송해 중앙 매칭하기 때문이다.",
        "비밀번호와 동일하게 모든 사이트가 공통 Origin 서명 키 하나를 공유하기 때문이다.",
        "브라우저가 SMS 6자리 OTP를 자동 수신해 피싱 사이트 입력을 대신 차단하기 때문이다.",
      ],
      answer:
        "생체는 로컬 검증만 하고 공개키 서명에 도메인(Origin)을 바인딩하기 때문이다.",
      explanation:
        "FIDO(UAF/FIDO2/패스키)는 '로컬 사용자 검증(생체/PIN) + 단말 보안 영역 내 개인키 서명 + 서버 공개키 검증' 구조로, 생체정보는 단말 밖으로 나가지 않습니다. 특히 WebAuthn은 브라우저가 검증한 실제 도메인(RP ID/Origin)에 서명을 묶어 가짜 피싱 사이트 중계 공격(AiTM)을 원천 차단합니다.",
      difficulty: "MEDIUM",
      keywords: ["FIDO2", "WebAuthn", "패스키", "피싱 방지", "공개키 인증"],
    },
    {
      id: "SEC_CMN_GEN_059",
      category: "인증 기술 및 커버로스",
      question:
        "기업 통합 인증 환경에서 한 번의 로그인으로 연결된 여러 업무 시스템에 추가 로그인 없이 접근하는 기술(㉠)과, 이 기술 도입 시 반드시 고려해야 하는 대표적 보안 위험 및 보완 대책(㉡)이 바르게 짝지어진 것은?",
      options: [
        "㉠ SSO — ㉡ 인증 서버 SPOF·일괄 침해 위험 → HA 이중화·MFA·재인증",
        "㉠ SSO — ㉡ 개별 시스템마다 비밀번호를 다르게 쓰므로 추가 인증 불필요",
        "㉠ NAC — ㉡ 단일 계정 탈취 시 전사 웹 시스템 자동 로그인 차단 필요",
        "㉠ PAM — ㉡ 커널 모듈 단일 장애점을 막기 위해 비밀번호 복잡도 완화",
      ],
      answer: "㉠ SSO — ㉡ 인증 서버 SPOF·일괄 침해 위험 → HA 이중화·MFA·재인증",
      explanation:
        "SSO(Single Sign-On, SAML 2.0, OIDC, Kerberos 등 기반)는 비밀번호 관리 부담을 줄이고 중앙 통제를 강화하지만, 마스터 계정 1개가 탈취되면 연동된 모든 서비스가 뚫릴 수 있고 인증 서버 장애 시 전사 업무가 마비됩니다. 따라서 MFA 강제, 인증 서버 HA 이중화, 민감 업무 재인증(Step-up Auth)을 병행해야 합니다.",
      difficulty: "EASY",
      keywords: ["SSO", "Single Sign-On", "SPOF", "MFA", "SAML", "OIDC"],
    },
    {
      id: "SEC_CMN_GEN_060",
      category: "인증 기술 및 커버로스",
      question:
        "웹·모바일 연합 인증 생태계에서 OAuth 2.0과 OpenID Connect(OIDC)의 역할 차이를 가장 정확하게 구분한 것은?",
      options: [
        "OAuth 2.0은 리소스 접근 위임 '인가', OIDC는 JWT ID 토큰 기반 '인증'이다.",
        "OAuth 2.0은 사용자 신원 확인 '인증', OIDC는 파일 접근 위임 '인가'이다.",
        "OAuth 2.0은 대칭키 세션 티켓을 발급하고, OIDC는 패킷 방화벽을 통제한다.",
        "OAuth 2.0은 원 비밀번호를 서드파티 앱에 직접 저장해 권한 위임을 처리한다.",
      ],
      answer:
        "OAuth 2.0은 리소스 접근 위임 '인가', OIDC는 JWT ID 토큰 기반 '인증'이다.",
      explanation:
        "OAuth 2.0은 비밀번호를 제3자 앱에 넘기지 않고 제한된 범위의 `Access Token`으로 자원 접근을 위임(인가, Authorization)하는 표준이며, OIDC(OpenID Connect)는 OAuth 2.0 흐름 위에 서명된 JWT 형식의 `ID Token`과 `UserInfo` 엔드포인트를 추가해 사용자 신원을 확인(인증, Authentication)합니다.",
      difficulty: "MEDIUM",
      keywords: ["OAuth 2.0", "OIDC", "인가", "인증", "JWT"],
    },
  ],
);

export const SECURITY_COMMON_GEN_QUESTIONS: Question[] = [
  ...gen0101,
  ...gen0102,
  ...gen0201,
  ...gen0202,
  ...gen0203,
];
