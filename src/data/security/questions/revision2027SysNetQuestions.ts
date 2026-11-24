import { Question } from "../../../types/question";
import { buildSecuritySectionQuestions } from "./builders";

/**
 * 2027~2029 KCA 공식 필기 출제기준 개정 대비 창작 문제 — 1과목(시스템 보안) & 2과목(네트워크 보안)
 * - 기준 원문: KCA 정보보안기사 필기 출제기준 (2027.1.1.~2029.12.31., PDF 1~3쪽)
 * - 실기 전용 항목(PDF 6~11쪽)은 제외함.
 */
const rev2027Sys = buildSecuritySectionQuestions(
  {
    sectionId: "SEC_SEC_SYS_01_03",
    syllabusStandard: "2027_2029",
    is2027RevisionPrep: true,
  },
  [
    {
      id: "SEC_2027_SYS_001",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "1-1-3",
      question:
        "클라우드 서비스 모델(IaaS, PaaS, SaaS)에 따른 공동 책임 모델(Shared Responsibility Model)에서 고객(이용자)의 보안 관리 책임 범위가 가장 넓은 모델부터 좁은 모델 순으로 바르게 나열한 것은?",
      options: [
        "IaaS > PaaS > SaaS",
        "SaaS > PaaS > IaaS",
        "PaaS > IaaS > SaaS",
        "SaaS > IaaS > PaaS",
      ],
      answer: "IaaS > PaaS > SaaS",
      explanation:
        "클라우드 공동 책임 모델에서 IaaS는 고객이 게스트 OS 패치, 미들웨어, 애플리케이션, 데이터, 계정 접근통제를 모두 직접 관리하므로 고객 책임 범위가 가장 넓습니다. PaaS는 OS·런타임 관리를 클라우드 제공자(CSP)가 담당하고 고객은 애플리케이션·데이터·설정을 책임지며, SaaS는 애플리케이션 운영까지 CSP가 관리하고 고객은 주로 사용자 계정·권한·데이터 분류를 책임집니다.",
      difficulty: "EASY",
      keywords: ["IaaS", "PaaS", "SaaS", "공동 책임 모델"],
    },
    {
      id: "SEC_2027_SYS_002",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "1-3-2",
      question:
        "퍼블릭 클라우드 인스턴스 내부의 메타데이터 서비스(`169.254.169.254`)가 웹 애플리케이션의 SSRF 취약점과 결합될 때 발생하는 핵심 위협과 이를 직접 완화하는 조치로 가장 적절한 것은?",
      options: [
        "호스트 커널 공유로 인한 컨테이너 탈출 — Cgroups 상한 설정 및 읽기 전용 루트 파일시스템 적용",
        "인스턴스 임시 IAM 자격 증명 탈취 — 세션 토큰 기반 IMDSv2 강제 및 홉 제한 설정",
        "오브젝트 스토리지 버킷의 퍼블릭 노출 — 버킷 정책의 와일드카드 제거 및 객체 잠금 활성화",
        "외부 SSH 무차별 대입 침투 — 보안 그룹 인바운드 22번 포트 차단 및 공개키 기반 인증 전환",
      ],
      answer:
        "인스턴스 임시 IAM 자격 증명 탈취 — 세션 토큰 기반 IMDSv2 강제 및 홉 제한 설정",
      explanation:
        "인스턴스 메타데이터 서비스(IMDS)가 단순 HTTP GET 요청만으로 응답하는 IMDSv1 상태이면, 웹 앱의 SSRF 취약점을 통해 공격자가 `169.254.169.254`를 조회해 인스턴스에 부여된 임시 IAM 자격 증명을 탈취할 수 있습니다. 이를 직접 막기 위해 PUT 요청으로 세션 토큰을 발급받아 헤더로 전달해야 하는 IMDSv2를 강제하고, 컨테이너 환경에서는 응답 TTL(Hop Limit=1) 제한 및 IAM 최소 권한을 적용해야 합니다. 나머지 보기는 각각 컨테이너 탈출, 스토리지 구성 오류, SSH 원격 침투에 대한 대응입니다.",
      difficulty: "MEDIUM",
      keywords: ["IMDS", "169.254.169.254", "IMDSv2", "메타데이터 보안"],
    },
    {
      id: "SEC_2027_SYS_003",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "2-1-3",
      question:
        "리눅스 컨테이너(Docker 등)와 하이퍼바이저 기반 가상머신(VM)의 커널 공유 여부 및 격리 메커니즘을 바르게 비교한 것은?",
      options: [
        "VM은 호스트 OS 커널을 공유하고, 컨테이너는 하이퍼바이저 위에서 독립된 게스트 OS 커널을 실행한다.",
        "VM과 컨테이너 모두 호스트 OS의 단일 커널을 공유하되, VM만 하드웨어 에뮬레이션을 추가로 수행한다.",
        "VM은 독립 게스트 OS 커널을 가지며, 컨테이너는 호스트 커널을 공유하면서 Namespace와 Cgroups로 격리한다.",
        "컨테이너는 Namespace로 CPU·메모리 할당량을 제한하며, Cgroups로 프로세스·네트워크 시야를 분리한다.",
      ],
      answer:
        "VM은 독립 게스트 OS 커널을 가지며, 컨테이너는 호스트 커널을 공유하면서 Namespace와 Cgroups로 격리한다.",
      explanation:
        "하이퍼바이저 기반 VM은 각 VM마다 독립된 게스트 OS 커널을 보유하므로 호스트와의 커널 격리 수준이 높습니다. 반면 컨테이너는 호스트 리눅스 커널을 공유하면서 Namespace(PID, NET, MNT, USER 등 프로세스·네트워크·파일시스템 시야 격리)와 Cgroups(CPU·메모리·I/O 자원 할당량 제한)로 프로세스 단위 경량 격리를 구현합니다. 두 기술의 커널 공유 여부를 뒤바꾸거나 Namespace와 Cgroups의 역할을 반대로 서술한 보기는 오답입니다.",
      difficulty: "EASY",
      keywords: ["컨테이너", "하이퍼바이저", "Namespace", "Cgroups"],
    },
    {
      id: "SEC_2027_SYS_004",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "2-1-3",
      question:
        "컨테이너를 `--privileged` 옵션으로 실행하거나 호스트의 `/var/run/docker.sock` 소켓을 컨테이너 내부에 마운트할 때 발생하는 대표적 보안 위협과 가장 직접적인 예방 대책은?",
      options: [
        "컨테이너 이미지 공급망 변조 — 신뢰 저장소의 서명 이미지 검증과 배포 전 취약점 스캔 적용",
        "컨테이너 탈출 및 호스트 권한 장악 — 비특권 계정 실행 및 최소 Capabilities·소켓 격리",
        "호스트 CPU·메모리 자원 고갈 — Cgroups 기반 자원 상한 설정과 컨테이너 프로세스 수 제한",
        "컨테이너 간 무단 횡적 통신 — NetworkPolicy 기반 파드 간 인바운드·아웃바운드 트래픽 제한",
      ],
      answer:
        "컨테이너 탈출 및 호스트 권한 장악 — 비특권 계정 실행 및 최소 Capabilities·소켓 격리",
      explanation:
        "`--privileged` 옵션은 호스트의 모든 디바이스와 커널 권한을 컨테이너에 열어주며, `/var/run/docker.sock` 마운트는 컨테이너 안에서 호스트 도커 데몬을 직접 제어할 수 있게 만들어 컨테이너 탈출(Container Escape) 및 호스트 root 권한 장악으로 이어집니다. 따라서 비특권(Non-root) 사용자 실행, 불필요한 Linux Capabilities 제거(`--cap-drop=ALL`), 도커 소켓 마운트 차단, Seccomp/AppArmor 적용으로 예방해야 합니다. Cgroups 상한 설정은 자원 고갈(DoS) 대응이고, NetworkPolicy는 파드 간 횡적 네트워크 통신 통제, 이미지 서명 검증은 공급망 변조 대응에 해당합니다.",
      difficulty: "MEDIUM",
      keywords: ["Container Escape", "privileged", "docker.sock", "Capabilities"],
    },
    {
      id: "SEC_2027_SYS_005",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "3-2-3",
      question:
        "클라우드·컨테이너 취약점 분석 도구 `Trivy`와 `ScoutSuite`의 주된 점검 대상 차이를 바르게 설명한 것은?",
      options: [
        "Trivy는 멀티 클라우드 API로 계정 구성 오류를 감사하고, ScoutSuite는 컨테이너 이미지 내부의 CVE 패키지를 스캔한다.",
        "Trivy는 컨테이너 이미지와 IaC 코드의 취약점·설정을 스캔하고, ScoutSuite는 클라우드 API로 계정 구성 오류를 감사한다.",
        "Trivy는 실행 중인 호스트의 포트·서비스 배너를 스캔하고, ScoutSuite는 실시간 네트워크 패킷을 캡처해 해독한다.",
        "Trivy는 소스 코드의 런타임 동적 침투 테스트를 수행하고, ScoutSuite는 시스템 핵심 파일의 해시 무결성을 감시한다.",
      ],
      answer:
        "Trivy는 컨테이너 이미지와 IaC 코드의 취약점·설정을 스캔하고, ScoutSuite는 클라우드 API로 계정 구성 오류를 감사한다.",
      explanation:
        "KCA 2027~2029 필기 출제기준에 반영된 두 분석 도구는 점검 계층이 다릅니다. `Trivy`는 컨테이너 이미지의 OS 패키지·라이브러리 CVE 취약점, 비밀키 노출, Dockerfile·Terraform 등 IaC 코드의 설정 오류를 CI/CD 단계 등에서 정적으로 스캔합니다. 반면 `ScoutSuite`는 AWS·Azure·GCP 등 멀티 클라우드 계정의 API를 호출해 스토리지 공개 설정, 보안 그룹 개방, 과도한 IAM 권한 같은 클라우드 계정 구성 오류(CSPM 성격)를 감사합니다. 두 도구의 역할을 뒤바꾸거나 Nmap(포트 스캔)·Wireshark(패킷 분석)·Tripwire(무결성 점검)와 혼동한 보기는 오답입니다.",
      difficulty: "MEDIUM",
      keywords: ["Trivy", "ScoutSuite", "컨테이너 취약점 분석", "CSPM"],
    },
    {
      id: "SEC_2027_SYS_006",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "1-3-2",
      question:
        "클라우드 제어 영역(Control Plane)의 API 호출 이력을 기록하는 감사 로그(CloudTrail 등)의 보호 방안으로 가장 적절한 것은?",
      options: [
        "가상머신 내부 로컬 디스크에만 기록해 외부 스토리지 전송 과정에서의 네트워크 노출 위험을 줄인다.",
        "객체 스토리지에 저장하되 감사 팀 외 운영자도 장애 조치 시 기존 로그 파일을 직접 덮어쓸 수 있게 허용한다.",
        "격리된 보안 계정으로 실시간 전송해 WORM 정책을 적용하고 로그 파일 무결성 해시 검증을 활성화한다.",
        "오토스케일링으로 인스턴스가 종료될 때 관련 API 감사 로그도 자동 만료시켜 저장 비용과 개인정보 잔존을 줄인다.",
      ],
      answer:
        "격리된 보안 계정으로 실시간 전송해 WORM 정책을 적용하고 로그 파일 무결성 해시 검증을 활성화한다.",
      explanation:
        "클라우드 감사 로그(예: AWS CloudTrail, Azure Activity Log, GCP Cloud Audit Logs)는 관리 콘솔·CLI·SDK의 모든 제어 영역(Control Plane) API 호출(자원 생성·삭제, IAM 권한 변경 등)을 기록합니다. 침해사고 시 공격자가 흔적을 지우기 위해 로깅을 중단하거나 기존 로그를 삭제·변조할 수 있으므로, 별도로 격리된 보안 전용 계정으로 실시간 복제하고 불변(Object Lock/WORM) 보관 정책과 다이제스트 해시 무결성 검증, 로깅 비활성화 경보를 구성해야 합니다. 운영 계정 내 덮어쓰기 허용이나 인스턴스 종료 시 로그 만료는 포렌식 증거 소실을 초래합니다.",
      difficulty: "MEDIUM",
      keywords: ["클라우드 감사 로그", "Control Plane", "WORM", "로그 무결성"],
    },
    {
      id: "SEC_2027_SYS_007",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "2-1-3",
      question:
        "클라우드 환경에서 발생하는 '구성 오류(Misconfiguration)'의 대표 사례와 이를 지속적으로 탐지·예방하는 자동화 점검 체계가 바르게 짝지어진 것은?",
      options: [
        "웹 애플리케이션 SQL 인젝션 취약점 — 웹 방화벽(WAF) 및 동적 보안 테스트(DAST)",
        "컨테이너 런타임 파일리스 악성코드 실행 — 엔드포인트 탐지·대응(EDR) 및 행위 모니터링",
        "오브젝트 스토리지 퍼블릭 개방 및 관리 포트 전체 개방 — CSPM 및 IaC 사전 정책 검증",
        "소스 코드 내 메모리 경계 검사 누락 — 정적 분석 도구(SAST) 및 컴파일러 보안 옵션",
      ],
      answer:
        "오브젝트 스토리지 퍼블릭 개방 및 관리 포트 전체 개방 — CSPM 및 IaC 사전 정책 검증",
      explanation:
        "퍼블릭 클라우드에서 오브젝트 스토리지 버킷의 퍼블릭 읽기·쓰기 허용, 보안 그룹의 관리 포트(22/3389) `0.0.0.0/0` 전체 개방, 암호화 미적용, 과도한 IAM 권한 등은 전형적인 클라우드 구성 오류(Misconfiguration)입니다. 이를 지속 탐지·예방하기 위해 CSPM(Cloud Security Posture Management, 예: ScoutSuite)과 배포 전 IaC(Terraform 등) 정적 정책 검증을 적용합니다. WAF/DAST는 웹 앱 취약점, EDR은 런타임 단말 행위, SAST는 소스 코드 결함에 대응하는 수단으로 클라우드 형상·구성 오류 점검 체계와 구분됩니다.",
      difficulty: "EASY",
      keywords: ["Misconfiguration", "CSPM", "스토리지 공개", "클라우드 보안"],
    },
    {
      id: "SEC_2027_SYS_008",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "1-2-3",
      question:
        "클라우드 특화 경량 운영체계(불변 인프라 기반 OS)가 전통적 범용 서버 OS와 구별되는 보안 설계 원칙으로 가장 올바른 것은?",
      options: [
        "운영 중 패키지를 직접 패치해 유지하므로 구성 드리프트가 발생해도 기존 인스턴스를 재사용하는 것을 원칙으로 한다.",
        "불필요한 도구를 제거하고 루트 파일시스템을 읽기 전용으로 유지하며, 변경 시 검증된 새 이미지로 교체 배포한다.",
        "유지보수 편의를 위해 원격 디버깅 셸과 컴파일러를 기본 탑재하고, 관리자 접근 시마다 임시로 루트 쓰기를 허용한다.",
        "초기 부팅 시에만 패키지를 검증하며, 일단 기동된 뒤에는 런타임 변조를 막기 위해 모든 보안 업데이트를 중단한다.",
      ],
      answer:
        "불필요한 도구를 제거하고 루트 파일시스템을 읽기 전용으로 유지하며, 변경 시 검증된 새 이미지로 교체 배포한다.",
      explanation:
        "클라우드 기반 경량 OS(예: Bottlerocket, Container-Optimized OS)는 불필요한 셸·컴파일러·유틸리티를 제거해 공격 표면(Attack Surface)을 최소화하고, 루트 파일시스템을 읽기 전용(Read-Only)으로 유지해 런타임 악성 변조를 차단합니다. 패치나 설정 변경이 필요할 때는 운영 중인 OS를 직접 수정(In-place Patching)하지 않고 검증된 새 이미지를 빌드해 교체 배포(Immutable Infrastructure)함으로써 구성 드리프트(Configuration Drift)를 방지합니다.",
      difficulty: "MEDIUM",
      keywords: ["클라우드 운영체계", "Immutable Infrastructure", "공격 표면 최소화"],
    },
    {
      id: "SEC_2027_SYS_009",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "1-1-3",
      question:
        "클라우드 배포 모델 중, 민감한 핵심 데이터베이스는 자체 온프레미스 환경에 두고 트래픽 변동이 큰 웹 프런트엔드나 분석 워크로드는 퍼블릭 클라우드로 연동해 운영하는 형태는?",
      options: [
        "퍼블릭 클라우드 (Public Cloud)",
        "프라이빗 클라우드 (Private Cloud)",
        "하이브리드 클라우드 (Hybrid Cloud)",
        "커뮤니티 클라우드 (Community Cloud)",
      ],
      answer: "하이브리드 클라우드 (Hybrid Cloud)",
      explanation:
        "NIST 클라우드 4대 배포 모델 중 하이브리드 클라우드(Hybrid Cloud)는 프라이빗 클라우드(내부 전용)와 퍼블릭 클라우드(공용)를 전용선·VPN 등으로 연동해 민감 데이터는 내부에 유지하면서 퍼블릭의 탄력적 확장성을 활용하는 구조입니다. 커뮤니티 클라우드는 공통의 관심사나 규제 요건을 공유하는 특정 조직 집단(예: 금융권·의료기관 공동망)을 위한 모델입니다.",
      difficulty: "EASY",
      keywords: ["하이브리드 클라우드", "퍼블릭 클라우드", "프라이빗 클라우드", "커뮤니티 클라우드"],
    },
    {
      id: "SEC_2027_SYS_010",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "1-1-3",
      question:
        "다중 테넌트(Multi-Tenancy) 클라우드 인프라에서 동일 물리 호스트의 하이퍼바이저 취약점을 악용해 공격자 가상머신(VM)에서 다른 고객의 VM 메모리나 호스트 하이퍼바이저를 침해하는 공격 유형은?",
      options: [
        "VM 탈출 (VM Escape) 및 하이퍼재킹",
        "메타데이터 SSRF 및 IAM 자격 증명 탈취",
        "오브젝트 스토리지 퍼블릭 노출 악용",
        "클라우드 리소스 무단 크립토재킹",
      ],
      answer: "VM 탈출 (VM Escape) 및 하이퍼재킹",
      explanation:
        "VM 탈출(VM Escape)과 하이퍼재킹(Hyperjacking)은 게스트 VM 내부 프로세스가 하이퍼바이저의 격리 경계를 돌파해 호스트 커널·하이퍼바이저나 인접 테넌트 VM 영역에 접근하는 치명적 가상화 취약점 공격입니다. 하이퍼바이저 보안 패치 유지, 불필요한 가상 장치·공유 기능 비활성화, 고보안 워크로드용 전용 호스트(Dedicated Host) 분리가 핵심 대책입니다. 메타데이터 SSRF, 스토리지 노출 악용, 크립토재킹은 가상화 하이퍼바이저 계층이 아닌 클라우드 설정·애플리케이션·계정 탈취와 관련된 위협입니다.",
      difficulty: "MEDIUM",
      keywords: ["VM Escape", "하이퍼바이저", "Multi-Tenancy", "가상화 보안"],
    },
    {
      id: "SEC_2027_SYS_011",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "1-1-3",
      question:
        "베어메탈 하이퍼바이저(Type-1)와 호스트 기반 하이퍼바이저(Type-2)의 실행 구조 및 보안 특성을 바르게 비교한 것은?",
      options: [
        "Type-1은 기존 범용 호스트 OS 위에서 애플리케이션처럼 실행되고, Type-2는 물리 하드웨어 위에서 직접 동작한다.",
        "Type-1은 호스트 OS 없이 하드웨어 위에서 직접 실행되고, Type-2는 호스트 OS 위에서 동작해 그 취약점의 영향을 받는다.",
        "Type-1과 Type-2 모두 게스트 간 단일 리눅스 커널을 공유하며, Namespace 유무로만 실행 구조를 구분한다.",
        "Type-2는 호스트 OS의 드라이버 계층을 거치지 않으므로 IaaS 데이터센터 환경에서 Type-1보다 공격 표면이 좁다.",
      ],
      answer:
        "Type-1은 호스트 OS 없이 하드웨어 위에서 직접 실행되고, Type-2는 호스트 OS 위에서 동작해 그 취약점의 영향을 받는다.",
      explanation:
        "Type-1(베어메탈/네이티브 하이퍼바이저: ESXi, Xen, KVM, Hyper-V)은 물리 하드웨어 바로 위에서 실행되어 중간 범용 호스트 OS 계층이 없으므로 공격 표면이 좁고 성능·격리가 우수해 클라우드 IaaS 데이터센터의 표준으로 쓰입니다. 반면 Type-2(호스트 기반 하이퍼바이저: VirtualBox, VMware Workstation)는 기존 호스트 OS 위에서 실행되므로 호스트 OS가 침해되면 모든 게스트 VM이 함께 위험해집니다. 단일 커널 공유는 VM이 아닌 컨테이너의 특징입니다.",
      difficulty: "EASY",
      keywords: ["Type-1 하이퍼바이저", "Type-2 하이퍼바이저", "클라우드 IaaS"],
    },
    {
      id: "SEC_2027_SYS_012",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "1-3-2",
      question:
        "클라우드 인스턴스 생성 시 초기 자동 구성 스크립트(User Data)에 DB 비밀번호나 API 키를 직접 기재하는 방식이 위험한 이유와 올바른 대책으로 가장 적절한 것은?",
      options: [
        "부팅 시마다 스크립트가 재실행되어 자격 증명이 초기화되므로 부팅 직후 스크립트 파일을 수동 삭제한다.",
        "스크립트가 전송 중 평문으로 전달되므로 Base64 인코딩만 적용한 뒤 User Data에 직접 저장한다.",
        "메타데이터 조회나 콘솔 속성으로 평문 노출될 수 있으므로 IAM 역할과 비밀 관리 서비스로 동적 주입한다.",
        "네트워크 보안 그룹이 초기 스크립트 통신을 차단하므로 자격 증명 파일을 베이스 이미지 내부에 미리 포함한다.",
      ],
      answer:
        "메타데이터 조회나 콘솔 속성으로 평문 노출될 수 있으므로 IAM 역할과 비밀 관리 서비스로 동적 주입한다.",
      explanation:
        "클라우드 인스턴스의 User Data(cloud-init 초기화 스크립트)는 인스턴스 내부의 메타데이터 엔드포인트(`169.254.169.254/latest/user-data`)나 인스턴스 속성 조회 권한이 있는 콘솔·API 사용자가 그대로 열람할 수 있습니다. 따라서 민감 자격 증명을 User Data에 넣지 말고, 인스턴스에 최소 권한 IAM 역할(Role)을 부여해 임시 자격 증명을 사용하고 DB 비밀번호·API 키는 KMS·Secret Manager에서 런타임에 동적으로 불러와야 합니다. Base64는 암호화가 아닌 단순 인코딩이므로 기밀성을 제공하지 못하며, 베이스 이미지에 비밀을 미리 포함하면 이미지 유출 시 자격 증명이 함께 노출됩니다.",
      difficulty: "MEDIUM",
      keywords: ["User Data", "클라우드 메타데이터", "IAM Role", "Secret Manager"],
    },
    {
      id: "SEC_2027_SYS_013",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "1-3-2",
      question:
        "인스턴스 수명이 짧은 클라우드 오토스케일링 및 컨테이너 환경에서 포렌식 증거 유실을 막기 위한 로그 수집 전략으로 가장 적절한 것은?",
      options: [
        "인스턴스 종료 시까지 로컬 볼륨에 압축 저장했다가 배치 스케줄러로 일괄 전송한다.",
        "각 컨테이너의 표준 출력을 에이전트를 통해 생성 즉시 중앙 로그 저장소로 스트리밍한다.",
        "단기 종료 워크로드는 공격 지속성이 낮으므로 별도 로그 수집 없이 제어 영역 API 로그만 남긴다.",
        "로그 보존을 위해 오토스케일링 종료 유예 기간을 7일 이상으로 늘려 수동 수거 후 삭제한다.",
      ],
      answer:
        "각 컨테이너의 표준 출력을 에이전트를 통해 생성 즉시 중앙 로그 저장소로 스트리밍한다.",
      explanation:
        "오토스케일링 인스턴스와 컨테이너는 탄력적(Ephemeral)으로 생성·삭제되므로 로컬 디스크에만 로그를 남기면 스케일 인이나 장애 교체 시 결정적 침해사고 포렌식 증거가 함께 소실됩니다. 따라서 애플리케이션 표준 출력(stdout/stderr)과 시스템·감사 로그를 경량 로그 에이전트(Fluent Bit, CloudWatch Agent 등)로 생성 즉시 외부 중앙 로그 저장소·SIEM에 실시간 스트리밍 적재하고, 타임스탬프를 UTC/NTP로 통일해야 합니다.",
      difficulty: "EASY",
      keywords: ["클라우드 로그", "Ephemeral", "중앙 집중 로그", "감사 로그"],
    },
    {
      id: "SEC_2027_SYS_014",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "2-1-3",
      question:
        "클라우드 IAM에서 '과도한 권한 부여'로 인한 권한 상승(Privilege Escalation) 위험을 줄이기 위한 운영 원칙으로 적절하지 않은 것은?",
      options: [
        "루트 계정은 일상 업무에 사용하지 않고 MFA 설정 및 액세스 키 비활성화로 보호한다.",
        "초기 구축 시 와일드카드(`*`) 관리자 정책을 부여한 뒤 운영 안정화 후 점진 축소한다.",
        "장기 고정 액세스 키 대신 수명이 짧은 임시 보안 자격 증명(STS·IAM 역할)을 우선 활용한다.",
        "미사용 계정과 권한 변경(`PassRole` 등) 가능 정책을 주기적으로 점검·회수한다.",
      ],
      answer:
        "초기 구축 시 와일드카드(`*`) 관리자 정책을 부여한 뒤 운영 안정화 후 점진 축소한다.",
      explanation:
        "초기 구축 편의를 이유로 와일드카드(`Action: *`, `Resource: *`) 관리자 정책을 부여한 뒤 나중에 줄이겠다는 방식은 실제로 권한이 방치되는 경우가 많고, 단 하나의 계정·워크로드만 탈취되어도 전체 클라우드 계정 권한 상승과 장악으로 직결됩니다. 처음부터 직무·서비스 단위의 최소 권한(Least Privilege) 정책을 설계하고, 루트 계정 MFA+액세스 키 금지, 임시 자격 증명(IAM Role/STS), `iam:PassRole`·`AttachPolicy` 등 권한 승격 경로의 정기 감사를 적용해야 합니다.",
      difficulty: "EASY",
      keywords: ["클라우드 IAM", "과도한 권한", "최소 권한", "임시 자격 증명"],
    },
    {
      id: "SEC_2027_SYS_015",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "2-1-3",
      question:
        "쿠버네티스(Kubernetes) 환경에서 발생할 수 있는 구성 오류(Misconfiguration)와 이에 대응하는 올바른 보안 통제가 짝지어진 것은?",
      options: [
        "파드 간 무제한 횡적 통신 허용 — ServiceAccount 토큰 자동 마운트 활성화로 파드 인증 강화",
        "과도한 `cluster-admin` 권한 바인딩 — 네임스페이스 단위 최소 RBAC 및 토큰 자동 마운트 비활성화",
        "컨테이너 이미지 변조 및 취약점 포함 — 파드의 `hostNetwork: true` 설정으로 호스트 보안망 공유",
        "임의 커널 시스템 콜 악용 탈출 — 모든 워크로드에 `:latest` 태그와 `runAsUser: 0` 기본 적용",
      ],
      answer:
        "과도한 `cluster-admin` 권한 바인딩 — 네임스페이스 단위 최소 RBAC 및 토큰 자동 마운트 비활성화",
      explanation:
        "쿠버네티스에서는 `cluster-admin` 과다 부여와 불필요한 ServiceAccount 토큰 자동 마운트 결합 시 파드 탈취만으로 클러스터 전체 제어권이 넘어갈 수 있으므로 네임스페이스 단위 최소 RBAC와 `automountServiceAccountToken: false` 적용이 필수입니다. 파드 간 횡적 통신은 NetworkPolicy로 격리해야 하며(토큰 마운트 활성화는 오히려 위험 증가), `hostNetwork: true`와 `runAsUser: 0`, `:latest` 태그는 격리 약화 및 추적성 저하를 유발하는 위험 설정입니다.",
      difficulty: "MEDIUM",
      keywords: ["Kubernetes", "RBAC", "NetworkPolicy", "컨테이너 Misconfiguration"],
    },
    {
      id: "SEC_2027_SYS_016",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "2-1-3",
      question:
        "컨테이너 이미지 공급망 보안을 위해 Dockerfile 작성 및 빌드 단계에서 적용하는 원칙으로 올바르지 않은 것은?",
      options: [
        "비밀키를 이미지에 복사했더라도 다음 `RUN rm` 레이어에서 삭제하면 최종 이미지에서 완전히 제거된다.",
        "신뢰할 수 있는 최소 경량 베이스 이미지를 선택하고, 멀티스테이지 빌드로 빌드 도구를 런타임에서 제외한다.",
        "컨테이너 실행 계정을 root 대신 일반 사용자로 전환하고, 고정 이미지 다이제스트(SHA-256)로 무결성을 확인한다.",
        "CI/CD 파이프라인에서 이미지 스캐너로 OS 패키지와 라이브러리 CVE 취약점을 배포 전에 점검한다.",
      ],
      answer:
        "비밀키를 이미지에 복사했더라도 다음 `RUN rm` 레이어에서 삭제하면 최종 이미지에서 완전히 제거된다.",
      explanation:
        "컨테이너 이미지는 유니온 파일시스템(OverlayFS) 기반의 읽기 전용 레이어 적층 구조이므로, 이전 레이어에 비밀키나 인증서를 `COPY`하거나 `ENV`/`ARG`로 남기면 이후 레이어에서 `rm`으로 지워도 하위 레이어 이력(`docker history` 등)에 민감 정보가 영구 잔존합니다. 비밀 정보는 이미지 내부에 포함하지 말고 런타임에 Secret 관리 도구나 빌드 시크릿 마운트(`--mount=type=secret`)로 안전하게 전달해야 합니다.",
      difficulty: "EASY",
      keywords: ["Dockerfile 보안", "이미지 레이어", "멀티스테이지 빌드", "Distroless"],
    },
    {
      id: "SEC_2027_SYS_017",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "3-2-3",
      question:
        "오픈소스 취약점 분석 도구 `Trivy`를 DevSecOps CI/CD 파이프라인의 배포 게이트(Quality Gate)로 활용하는 방식으로 가장 적절한 것은?",
      options: [
        "운영 중인 클라우드 계정의 IAM·보안 그룹 설정을 API로 조회해 감사 리포트를 생성한다.",
        "이미지 스캔에서 기준 등급 이상의 취약점이 탐지되면 비정상 종료 코드를 반환해 배포를 차단한다.",
        "운영 컨테이너의 네트워크 트래픽을 실시간 미러링해 비정상 아웃바운드 패킷을 자동 드롭한다.",
        "배포 완료 후 호스트 시스템 파일의 기준 해시 DB와 현재 해시값을 주기적으로 비교해 변조를 탐지한다.",
      ],
      answer:
        "이미지 스캔에서 기준 등급 이상의 취약점이 탐지되면 비정상 종료 코드를 반환해 배포를 차단한다.",
      explanation:
        "`Trivy`는 `trivy image --severity HIGH,CRITICAL --exit-code 1 myapp:1.0`처럼 컨테이너 이미지(및 IaC·파일시스템)의 CVE 취약점·구성 오류·시크릿 노출을 스캔하고, 기준 심각도 이상 취약점이 발견되면 비정상 종료 코드(`1`)를 반환해 CI/CD 파이프라인의 레지스트리 푸시와 운영 배포를 자동 차단(Shift-Left)하는 데 활용됩니다. 클라우드 계정 API 기반 IAM·보안 그룹 감사는 `ScoutSuite`(CSPM)의 역할이며, 실시간 패킷 차단은 IPS/네트워크 보안 장비, 호스트 파일 해시 기준 DB 비교는 Tripwire/AIDE(파일 무결성 점검)의 기능입니다.",
      difficulty: "MEDIUM",
      keywords: ["Trivy", "CI/CD", "DevSecOps", "컨테이너 이미지 스캔"],
    },
    {
      id: "SEC_2027_SYS_018",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "3-2-3",
      question:
        "멀티 클라우드 보안 감사 도구 `ScoutSuite`의 동작 특성 및 실행 시 부여해야 할 최소 권한 원칙으로 올바른 것은?",
      options: [
        "컨테이너 이미지를 정적 분해해 CVE 취약점을 스캔하며, 레지스트리 쓰기 권한으로 취약 이미지를 직접 수정한다.",
        "클라우드 API로 IAM·네트워크·스토리지 구성을 점검하며, 읽기 전용 감사 역할로 실행한다.",
        "클라우드 인스턴스 내부에 커널 에이전트를 설치해 실시간 악성 프로세스를 차단하므로 root 권한을 부여한다.",
        "사내 LAN 패킷을 미러링해 TLS 트래픽을 복호화하므로 모든 계정의 KMS 복호화 키 접근 권한이 필요하다.",
      ],
      answer:
        "클라우드 API로 IAM·네트워크·스토리지 구성을 점검하며, 읽기 전용 감사 역할로 실행한다.",
      explanation:
        "`ScoutSuite`는 AWS, Azure, GCP 등의 클라우드 제공자 API를 비침투적으로 호출해 IAM 정책, 보안 그룹 개방, 스토리지 퍼블릭 노출, 로깅 비활성화 같은 보안 구성 오류(Misconfiguration)를 점검하고 리포트를 생성합니다. 자원을 변경하지 않으므로 최소 권한 원칙에 따라 `ReadOnlyAccess`나 `SecurityAudit` 같은 읽기 전용 감사 권한으로 실행해야 안전합니다. 컨테이너 이미지 CVE 스캔은 `Trivy`, 호스트 내 프로세스 차단은 EDR/CWPP 에이전트, 패킷 분석은 `Wireshark`의 역할입니다.",
      difficulty: "MEDIUM",
      keywords: ["ScoutSuite", "클라우드 보안 감사", "Read-Only 권한", "Misconfiguration"],
    },
    {
      id: "SEC_2027_SYS_019",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "3-2-3",
      question:
        "보안 담당자가 사내 클라우드·컨테이너 인프라를 종합 점검하려 한다. ① 배포할 컨테이너 이미지 내 OpenSSL CVE 및 Terraform 설정 오류 점검, ② 운영 중인 퍼블릭 클라우드 계정의 공개 S3 버킷·IAM MFA 미설정·보안 그룹 과다 개방 감사, ③ 외부 노출 서버의 열린 포트·서비스 버전 스캔에 가장 적합한 도구 조합은?",
      options: [
        "① Trivy — ② ScoutSuite — ③ Nmap",
        "① Nmap — ② Trivy — ③ ScoutSuite",
        "① ScoutSuite — ② Nmap — ③ Trivy",
        "① Trivy — ② Nmap — ③ ScoutSuite",
      ],
      answer: "① Trivy — ② ScoutSuite — ③ Nmap",
      explanation:
        "KCA 2027~2029 필기 출제기준 1과목에 명시된 시스템·클라우드 분석 도구 3종의 역할 구분입니다. ① `Trivy`는 컨테이너 이미지·IaC·파일시스템 취약점(CVE)·시크릿·구성 오류 스캔, ② `ScoutSuite`는 멀티 클라우드 계정 API 기반 보안 구성(IAM/스토리지/네트워크/로깅) 감사, ③ `Nmap`은 호스트·포트·서비스 버전·OS 스캐닝에 사용됩니다.",
      difficulty: "EASY",
      keywords: ["Trivy", "ScoutSuite", "Nmap", "시스템 분석 도구"],
    },
    {
      id: "SEC_2027_SYS_020",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "2-1-3",
      question:
        "리눅스 컨테이너 런타임에서 프로세스가 호스트 커널에 요청할 수 있는 시스템 콜(System Call) 목록을 화이트리스트로 제한하여, 커널 취약점을 통한 컨테이너 탈출 공격 표면을 줄이는 커널 보안 메커니즘은?",
      options: [
        "Cgroups (자원 사용량 제어)",
        "Namespace (프로세스·망 격리)",
        "Seccomp (시스템 콜 필터링)",
        "Capabilities (특권 세분화)",
      ],
      answer: "Seccomp (시스템 콜 필터링)",
      explanation:
        "Seccomp(특히 seccomp-bpf)은 컨테이너 프로세스가 공유 커널에 호출할 수 있는 수백 개의 시스템 콜(`mount`, `ptrace`, `reboot`, `init_module` 등)을 필터링·차단해 커널 취약점 악용 및 컨테이너 탈출 위험을 줄입니다. Cgroups는 CPU·메모리 등 자원 할당 제한, Namespace는 프로세스·네트워크·마운트 시야 격리, Capabilities는 root 특권을 세분화된 권한 단위로 쪼개어 제거하는 메커니즘으로 각각 역할이 다릅니다.",
      difficulty: "MEDIUM",
      keywords: ["Seccomp", "시스템 콜 제한", "컨테이너 격리", "Container Escape 예방"],
    },
    {
      id: "SEC_2027_SYS_021",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "2-1-3",
      question:
        "IaC(Infrastructure as Code) 기반 클라우드 환경에서 구성 오류(Misconfiguration)가 운영 환경에 배포되는 것을 막기 위한 예방 체계로 가장 적절한 것은?",
      options: [
        "인프라 변경 속도를 높이기 위해 PR 검토를 생략하고 콘솔 수동 수정과 IaC 배포를 병행한다.",
        "배포 후 런타임 패킷 캡처만 수행하며 IaC 템플릿 코드는 버전 관리 없이 로컬에 보관한다.",
        "IaC 코드를 Git으로 관리하고 CI 단계에서 정적 정책 스캐너로 검증해 승인된 변경만 배포한다.",
        "스캐너 접근을 허용하기 위해 IaC 템플릿 내부에 클라우드 관리자 액세스 키를 직접 선언한다.",
      ],
      answer:
        "IaC 코드를 Git으로 관리하고 CI 단계에서 정적 정책 스캐너로 검증해 승인된 변경만 배포한다.",
      explanation:
        "IaC(Terraform, CloudFormation 등)는 인프라 구성을 코드로 일관되게 배포하지만 템플릿 오류가 운영에 그대로 복제될 위험이 있습니다. 따라서 코드를 Git에서 형상 관리(GitOps)하고 Pull Request·CI 단계에서 `Trivy`·`Checkov` 같은 정적 스캐너 및 OPA(Policy as Code)로 `0.0.0.0/0` 개방·암호화 누락·과다 권한을 사전 차단해야 하며, 수동 콘솔 변경으로 인한 구성 드리프트(Drift)를 통제해야 합니다.",
      difficulty: "MEDIUM",
      keywords: ["IaC 보안", "Policy as Code", "Trivy", "구성 드리프트"],
    },
    {
      id: "SEC_2027_SYS_022",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "1-1-3",
      question:
        "클라우드 서버리스(Serverless/FaaS) 환경에서 클라우드 제공자(CSP)가 아닌 이용자(개발자)가 직접 책임져야 하는 보안 영역으로 올바른 것은?",
      options: [
        "함수 실행을 호스팅하는 물리 서버 펌웨어와 하이퍼바이저 패치 관리",
        "함수 코드 취약점·이벤트 입력 검증·최소 권한 IAM 역할 및 의존성 관리",
        "컨테이너 호스트 OS 커널 업그레이드 및 데이터센터 물리 출입 통제",
        "가상화 계층의 멀티 테넌트 CPU 스케줄링 격리 및 네트워크 케이블 보안",
      ],
      answer:
        "함수 코드 취약점·이벤트 입력 검증·최소 권한 IAM 역할 및 의존성 관리",
      explanation:
        "서버리스(FaaS: AWS Lambda, Azure Functions 등)는 공동 책임 모델에서 물리 인프라, 하이퍼바이저 격리, 호스트 OS 패치, 언어 런타임 패치 책임을 CSP가 담당합니다. 반면 이용자(고객)는 함수 비즈니스 로직 취약점(인젝션 등), 비신뢰 이벤트 입력값 검증, 함수별 최소 권한 IAM 실행 역할 부여, 서드파티 의존성 라이브러리 취약점 및 비밀 정보 안전 관리를 직접 책임져야 합니다.",
      difficulty: "MEDIUM",
      keywords: ["Serverless", "FaaS", "공동 책임 모델", "최소 권한 IAM"],
    },
    {
      id: "SEC_2027_SYS_023",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "2-1-3",
      question:
        "클라우드 계정 탈취나 취약 컨테이너 침투 직후 발생하는 '크립토재킹(Cryptojacking)' 공격의 대표적 징후와 우선 대응 방안으로 가장 적절한 것은?",
      options: [
        "오브젝트 스토리지 대량 조회 및 외부 반출 급증 — 버킷 퍼블릭 차단 및 데이터 접근 토큰 회수",
        "스토리지 볼륨 파일의 일괄 암호화 및 스냅샷 삭제 시도 — 네트워크 즉시 격리 및 불변 백업본 복구",
        "미사용 리전의 고사양 인스턴스 생성 및 CPU 급증 — 침해 키 폐기, 인스턴스 종료 및 리전 통제",
        "외부 다수 IP로부터의 웹 포트 인바운드 대역폭 포화 — 클라우드 스크러빙 센터 우회 및 요청 빈도 제한",
      ],
      answer:
        "미사용 리전의 고사양 인스턴스 생성 및 CPU 급증 — 침해 키 폐기, 인스턴스 종료 및 리전 통제",
      explanation:
        "클라우드 크립토재킹은 탈취한 IAM 액세스 키나 취약한 컨테이너·도커 API를 악용해 피해자 과금으로 암호화폐 채굴용 고사양 GPU/CPU 인스턴스를 대량 띄우는 공격입니다. 따라서 미사용 해외 리전의 비정상 API 호출과 인스턴스 생성, CPU 사용률 및 채굴 풀 통신 급증이 핵심 징후이며, 감사 로그 기반 이상 경보, 침해 키 즉시 폐기, 비인가 인스턴스 격리·종료, 조직 정책(SCP) 기반 리전·예산 상한 통제로 대응합니다. 스토리지 대량 반출은 데이터 유출 사고, 볼륨 암호화·스냅샷 삭제는 클라우드 랜섬웨어, 외부 인바운드 대역폭 포화는 볼류메트릭 DDoS 징후입니다.",
      difficulty: "EASY",
      keywords: ["크립토재킹", "클라우드 침해 징후", "감사 로그", "SCP"],
    },
    {
      id: "SEC_2027_SYS_024",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "2-1-3",
      question:
        "소프트웨어·컨테이너 공급망 보안에서 이미지 내부에 포함된 오픈소스 컴포넌트, 버전, 라이선스 목록을 표준 형식(SPDX, CycloneDX)으로 정리한 명세서는?",
      options: [
        "SLSA (Supply-chain Levels for Software Artifacts)",
        "SBOM (Software Bill of Materials)",
        "SARIF (Static Analysis Results Interchange Format)",
        "CSAF (Common Security Advisory Framework)",
      ],
      answer: "SBOM (Software Bill of Materials)",
      explanation:
        "SBOM(Software Bill of Materials)은 소프트웨어·컨테이너 이미지에 포함된 모든 오픈소스 및 서드파티 컴포넌트, 버전, 의존성 관계, 라이선스를 SPDX·CycloneDX 등의 표준으로 정리한 소프트웨어 자재명세서로, 제로데이 취약점 발표 시 영향 범위 신속 파악에 필수적입니다. SLSA는 빌드·배포 파이프라인 무결성 보증 프레임워크, SARIF는 정적 분석 도구 결과 표준 교환 포맷, CSAF는 보안 권고·취약점 공지 교환 표준입니다.",
      difficulty: "EASY",
      keywords: ["SBOM", "SPDX", "CycloneDX", "공급망 보안", "Trivy"],
    },
    {
      id: "SEC_2027_SYS_025",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "1-3-2",
      question:
        "퍼블릭 클라우드의 오브젝트 스토리지(S3 등)에 저장된 고객 백업 데이터 유출을 방지하기 위한 다층 보안 설정으로 적절하지 않은 것은?",
      options: [
        "객체 URL 직접 다운로드를 막되, 파일 존재 여부 점검을 위해 익명 사용자(`*`)에게 목록 조회 권한만 허용한다.",
        "계정 및 버킷 수준에서 퍼블릭 액세스 일괄 차단(Block Public Access) 정책을 우선 활성화한다.",
        "저장 시 KMS 기반 서버 측 암호화(SSE-KMS)와 전송 시 HTTPS(TLS) 강제 버킷 정책을 함께 적용한다.",
        "랜섬웨어에 의한 삭제·변조에 대비해 버전 관리(Versioning)와 객체 잠금(WORM) 및 감사 로깅을 설정한다.",
      ],
      answer:
        "객체 URL 직접 다운로드를 막되, 파일 존재 여부 점검을 위해 익명 사용자(`*`)에게 목록 조회 권한만 허용한다.",
      explanation:
        "오브젝트 스토리지에서 파일 다운로드(`GetObject`)를 막더라도 `Principal: \"*\"`에게 버킷 목록 조회(`ListBucket`) 권한을 열어두면 내부 백업 파일명·일자·구조 등 민감한 자산 메타데이터가 외부에 노출되며, 일부 객체가 실수로 공개될 경우 즉각 탈취 표적이 됩니다. 따라서 계정·버킷 수준의 퍼블릭 액세스 일괄 차단(Block Public Access), 최소 권한 정책, 저장·전송 암호화, 버전 관리·WORM(Object Lock) 및 데이터 접근 로깅을 함께 적용해야 합니다.",
      difficulty: "EASY",
      keywords: ["오브젝트 스토리지 보안", "퍼블릭 액세스 차단", "SSE-KMS", "WORM"],
    },
    {
      id: "SEC_2027_SYS_026",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "1-2-3",
      question:
        "클라우드 환경에서 KMS(Key Management Service)와 HSM을 활용해 저장 데이터 암호화 키를 안전하게 관리하는 '봉투 암호화(Envelope Encryption)' 방식으로 올바른 것은?",
      options: [
        "대용량 데이터를 마스터 키(KEK)로 직접 암호화하고, 데이터 암호화 키(DEK)는 평문 메타데이터로 별도 보관한다.",
        "데이터 암호화 키(DEK)로 데이터를 암호화하고, 그 DEK를 KMS 마스터 키(KEK)로 다시 암호화한다.",
        "KMS에서 마스터 키를 매 요청마다 평문으로 내려받아 웹 서버 메모리에 영구 캐시해 암호화 성능을 높인다.",
        "디스크 볼륨은 평문으로 저장하고, 클라이언트로 전송하는 TLS 구간에서만 일회용 키로 암호화해 대체한다.",
      ],
      answer:
        "데이터 암호화 키(DEK)로 데이터를 암호화하고, 그 DEK를 KMS 마스터 키(KEK)로 다시 암호화한다.",
      explanation:
        "봉투 암호화(Envelope Encryption)는 실제 대용량 데이터를 빠른 대칭키인 데이터 암호화 키(DEK)로 암호화하고, 해당 DEK를 KMS/HSM 내부에 보관되어 외부로 유출되지 않는 마스터 키(KEK/CMK)로 다시 암호화(Wrapping)하여 저장하는 클라우드 암호화 표준 패턴입니다. 대용량 데이터를 KEK로 직접 암호화하면 네트워크 API 지연과 크기 제한 문제가 발생하고, 마스터 키를 외부 서버로 내려받으면 HSM 보호 의미가 상실됩니다.",
      difficulty: "MEDIUM",
      keywords: ["봉투 암호화", "Envelope Encryption", "KMS", "HSM", "DEK", "KEK"],
    },
    {
      id: "SEC_2027_SYS_027",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "2-1-3",
      question:
        "클라우드 네이티브 보안 플랫폼 분류인 CSPM, CWPP, CNAPP의 핵심 역할을 바르게 비교한 것은?",
      options: [
        "CSPM은 워크로드 런타임을 보호하고, CWPP는 클라우드 계정 설정을 점검하며, CNAPP는 경계 방화벽 전용 장비다.",
        "CSPM은 클라우드 구성·규정 준수를 점검하고, CWPP는 워크로드 런타임을 보호하며, CNAPP는 이를 전 주기로 통합한다.",
        "CSPM은 코드 취약점을 정적 분석하고, CWPP는 사용자 ID를 인증하며, CNAPP는 로그 장기 보관 전용 SIEM이다.",
        "CWPP는 컨테이너 이미지 빌드만 담당하고, CSPM은 VM 패치만 수행하며, CNAPP는 물리 데이터센터 출입을 통제한다.",
      ],
      answer:
        "CSPM은 클라우드 구성·규정 준수를 점검하고, CWPP는 워크로드 런타임을 보호하며, CNAPP는 이를 전 주기로 통합한다.",
      explanation:
        "CSPM(Cloud Security Posture Management)은 스토리지 공개·과도한 권한·규정 준수 같은 클라우드 형상·설정 오류를 지속 점검합니다. CWPP(Cloud Workload Protection Platform)는 VM·컨테이너·서버리스 등 실제 워크로드의 취약점과 런타임 위협을 보호합니다. CNAPP(Cloud-Native Application Protection Platform)는 코드/IaC·컨테이너 스캔(Shift-Left)부터 CSPM·CWPP·CIEM(권한 관리)까지 클라우드 네이티브 보안을 단일 플랫폼으로 통합한 개념입니다.",
      difficulty: "MEDIUM",
      keywords: ["CSPM", "CWPP", "CNAPP", "클라우드 보안 솔루션"],
    },
    {
      id: "SEC_2027_SYS_028",
      category: "클라우드·컨테이너 보안",
      syllabusItemCode: "1-2-3",
      question:
        "클라우드 가상머신(VM)에서 데이터가 디스크 저장이나 네트워크 전송 중일 때뿐 아니라, 메모리에서 연산 처리되는 상태에서도 호스트 관리자나 하이퍼바이저로부터 평문을 격리·보호하기 위해 하드웨어 기반 신뢰 실행 환경(TEE)을 활용하는 기술은?",
      options: [
        "투명 데이터 암호화 (TDE, Transparent Data Encryption)",
        "종단간 전송 암호화 (E2EE, End-to-End Encryption)",
        "기밀 컴퓨팅 (Confidential Computing)",
        "네트워크 마이크로세그멘테이션 (Micro-segmentation)",
      ],
      answer: "기밀 컴퓨팅 (Confidential Computing)",
      explanation:
        "기밀 컴퓨팅(Confidential Computing)은 CPU 하드웨어 기반 TEE(Intel SGX/TDX, AMD SEV 등)를 이용해 메모리 상에서 연산 중인 데이터(Data in Use)를 암호화·격리하고 원격 증명(Attestation)을 제공함으로써, 클라우드 제공자나 침해된 호스트 OS·하이퍼바이저조차 테넌트 메모리 평문을 열람할 수 없도록 보호합니다. TDE는 저장 데이터(At-Rest) 보호, E2EE는 전송 데이터(In-Transit) 보호, 마이크로세그멘테이션은 네트워크 횡적 이동 격리에 해당합니다.",
      difficulty: "HARD",
      keywords: ["기밀 컴퓨팅", "Confidential Computing", "TEE", "Data in Use"],
    },
  ],
);

const rev2027Net = buildSecuritySectionQuestions(
  {
    sectionId: "SEC_SEC_NET_02_03",
    syllabusStandard: "2027_2029",
    is2027RevisionPrep: true,
  },
  [
    {
      id: "SEC_2027_NET_001",
      category: "차세대 네트워크 보안",
      syllabusItemCode: "2-3-2-2",
      question:
        "SD-WAN 같은 광역 네트워크 기능과 SWG·CASB·FWaaS·ZTNA 같은 클라우드 보안 기능(SSE)을 단일 클라우드 네이티브 서비스로 통합 제공하는 차세대 보안 아키텍처는?",
      options: [
        "SDN (Software-Defined Networking)",
        "SASE (Secure Access Service Edge)",
        "CASB (Cloud Access Security Broker)",
        "SOAR (Security Orchestration, Automation and Response)",
      ],
      answer: "SASE (Secure Access Service Edge)",
      explanation:
        "SASE(Secure Access Service Edge)는 원격 근무와 멀티 클라우드 환경에서 트래픽을 본사로 역전송(Backhaul)하지 않고 사용자와 가까운 클라우드 엣지(PoP)에서 네트워크 기능(SD-WAN)과 보안 기능(SSE: SWG, CASB, FWaaS, ZTNA)을 통합 제공하는 아키텍처입니다. SDN은 네트워크 제어평면과 데이터평면을 분리하는 네트워크 가상화 구조이고, CASB는 SaaS 접근 가시성·DLP를 담당하는 SSE의 한 구성 요소이며, SOAR는 보안 관제 대응 플레이북 자동화 플랫폼입니다.",
      difficulty: "EASY",
      keywords: ["SASE", "SD-WAN", "SSE", "차세대 네트워크 보안"],
    },
    {
      id: "SEC_2027_NET_002",
      category: "차세대 네트워크 보안",
      syllabusItemCode: "2-3-2-2",
      question:
        "전통적 원격 접속 VPN과 ZTNA(Zero Trust Network Access)의 접근 통제 방식을 바르게 비교한 것은?",
      options: [
        "VPN은 애플리케이션 단위로 최소 권한을 부여하고, ZTNA는 인증 후 사내 네트워크 대역 전체에 터널 연결을 허용한다.",
        "VPN은 인증 후 내부 대역 전반에 접근을 허용하기 쉽고, ZTNA는 신원·단말 검증 후 인가된 앱만 허용한다.",
        "VPN은 외부 인터넷 접속자만 검증하고, ZTNA는 사내 LAN 단말에 대해서는 최초 인증 이후 재검증을 생략한다.",
        "VPN은 클라우드 브로커를 통해 앱 포트를 숨기고, ZTNA는 고정 IP 화이트리스트만으로 경계 방화벽을 대체한다.",
      ],
      answer:
        "VPN은 인증 후 내부 대역 전반에 접근을 허용하기 쉽고, ZTNA는 신원·단말 검증 후 인가된 앱만 허용한다.",
      explanation:
        "전통적 원격 접속 VPN은 경계 인증 통과 시 내부 네트워크 대역 전반에 광범위한 접근을 허용해 계정 탈취 시 횡적 이동(Lateral Movement) 위험이 큽니다. 반면 ZTNA는 '절대 신뢰하지 않고 항상 검증(Never Trust, Always Verify)' 원칙에 따라 매 요청마다 사용자 신원·단말 보안 상태(Posture)·맥락을 검증해 인가된 특정 애플리케이션에만 세분화된 최소 권한 접근을 허용하며, 인증 전에는 앱 IP·포트를 외부에 숨기는 구조를 취합니다. VPN과 ZTNA의 역할을 거꾸로 바꾼 보기나, 사내 LAN을 신뢰해 재검증을 생략한다는 설명은 제로트러스트 원칙에 어긋납니다.",
      difficulty: "EASY",
      keywords: ["ZTNA", "Zero Trust", "VPN 비교", "측면 이동 방지"],
    },
    {
      id: "SEC_2027_NET_003",
      category: "차세대 네트워크 보안",
      syllabusItemCode: "2-3-2-2",
      question:
        "엔드포인트, 네트워크, 클라우드, 이메일, 신원 계층의 원격 측정 데이터를 기본 통합·상관 분석하여 복합 위협을 조기 탐지하고 자동화된 대응을 수행하는 솔루션은?",
      options: [
        "EDR (Endpoint Detection and Response)",
        "NDR (Network Detection and Response)",
        "XDR (Extended Detection and Response)",
        "SIEM (Security Information and Event Management)",
      ],
      answer: "XDR (Extended Detection and Response)",
      explanation:
        "XDR(확장 탐지 및 대응)은 엔드포인트에 국한된 EDR이나 네트워크 트래픽에 집중하는 NDR의 범위를 넘어 단말·네트워크·클라우드·이메일·계정 등 다중 도메인의 텔레메트리 데이터를 통합 상관 분석하고 신속한 자동 대응을 제공합니다. SIEM은 이기종 보안 로그를 수집·검색·장기 보관해 경보 및 규제 감사를 지원하는 플랫폼으로, 네이티브 다중 계층 상관·즉각 대응에 초점을 둔 XDR과 구분됩니다.",
      difficulty: "EASY",
      keywords: ["XDR", "EDR", "NDR", "상관 분석", "차세대 네트워크 보안"],
    },
    {
      id: "SEC_2027_NET_004",
      category: "차세대 네트워크 보안",
      syllabusItemCode: "2-1-2-2",
      question:
        "윈도우·리눅스 파일 공유에 사용되는 SMB(Server Message Block) 프로토콜의 취약점 대응 및 안전한 운영 방안으로 가장 올바른 것은?",
      options: [
        "SMBv1을 비활성화하고 암호화·서명이 강화된 SMBv3를 사용하며 외부 경계 TCP 445를 차단한다.",
        "하위 호환을 위해 SMBv1을 유지하되 방화벽에서 NetBIOS 139번 포트만 차단하면 원격 익스플로잇을 막는다.",
        "내부망 전송 속도 저하를 막기 위해 SMBv3 암호화와 SMB 서명을 해제하고 공유 폴더 권한만 읽기 전용으로 둔다.",
        "SMB는 UDP 445번 포트를 사용하므로 방화벽의 TCP 상태 테이블과 무관하게 포트 번호만 변경해 운영한다.",
      ],
      answer:
        "SMBv1을 비활성화하고 암호화·서명이 강화된 SMBv3를 사용하며 외부 경계 TCP 445를 차단한다.",
      explanation:
        "SMB(주로 TCP 445 Direct Hosting, 구형 NetBIOS 기반 139)에서 구버전 SMBv1은 EternalBlue 같은 치명적 원격 코드 실행과 워너크라이 랜섬웨어 확산에 악용되므로 반드시 비활성화해야 합니다. 최신 SMBv3 이상을 사용하고 종단간 암호화 및 SMB 서명(Signing)을 강제해 NTLM 릴레이·도청을 방지하며, 외부 인터넷 경계 방화벽에서 TCP 139/445 포트를 차단해야 합니다.",
      difficulty: "MEDIUM",
      keywords: ["SMB", "SMBv1", "SMBv3", "TCP 445", "EternalBlue"],
    },
    {
      id: "SEC_2027_NET_005",
      category: "차세대 네트워크 보안",
      syllabusItemCode: "2-1-2-4",
      question:
        "`Wireshark`의 '캡처 필터(Capture Filter)'와 '디스플레이 필터(Display Filter)'의 동작 및 활용 차이를 바르게 설명한 것은?",
      options: [
        "캡처 필터는 수집된 전체 패킷의 화면 표시만 제한하고, 디스플레이 필터는 NIC 수집 단계에서 조건 외 패킷을 폐기한다.",
        "캡처 필터는 수집 단계에서 조건 외 패킷을 저장하지 않고, 디스플레이 필터는 수집된 패킷 중 조건에 맞는 것만 표시한다.",
        "캡처 필터와 디스플레이 필터 모두 동일한 libpcap/BPF 문법을 사용하며 실행 시점만 수집 전후로 구분된다.",
        "디스플레이 필터로 걸러진 패킷은 `.pcap` 파일 저장 시 자동 삭제되므로 원본 복원을 위해 캡처 필터만 사용해야 한다.",
      ],
      answer:
        "캡처 필터는 수집 단계에서 조건 외 패킷을 저장하지 않고, 디스플레이 필터는 수집된 패킷 중 조건에 맞는 것만 표시한다.",
      explanation:
        "Wireshark의 캡처 필터는 libpcap/BPF 문법(`host 10.0.0.1 and port 443`)을 사용해 패킷 수집·저장 단계부터 불필요한 트래픽을 걸러 파일 크기를 줄이지만 조건 밖 패킷은 유실됩니다. 디스플레이 필터는 Wireshark 전용 문법(`ip.addr == 10.0.0.1 && tls`)을 써서 캡처된 전체 `.pcap` 데이터를 보존한 채 분석 화면에 표시할 패킷만 조건 검색합니다.",
      difficulty: "MEDIUM",
      keywords: ["Wireshark", "캡처 필터", "디스플레이 필터", "BPF"],
    },
    {
      id: "SEC_2027_NET_006",
      category: "차세대 네트워크 보안",
      syllabusItemCode: "2-1-2-4",
      question:
        "`Wireshark`로 침해사고 `.pcap` 파일을 분석할 때 출발지 또는 목적지 IP가 `10.0.1.50`이면서 TCP SYN 플래그가 1이고 ACK 플래그가 0인 순수 SYN 패킷만 화면에 표시하는 디스플레이 필터는?",
      options: [
        "host 10.0.1.50 and tcp[tcpflags] == tcp-syn",
        "ip.addr == 10.0.1.50 && tcp.flags.syn == 1 && tcp.flags.ack == 1",
        "ip.addr == 10.0.1.50 && tcp.flags.syn == 1 && tcp.flags.ack == 0",
        "ip.src == 10.0.1.50 && tcp.flags == 0x12",
      ],
      answer: "ip.addr == 10.0.1.50 && tcp.flags.syn == 1 && tcp.flags.ack == 0",
      explanation:
        "Wireshark 디스플레이 필터에서는 비교 연산자 `==`와 논리 연산자 `&&`를 사용합니다. `ip.addr == 10.0.1.50`은 출발지·목적지 모두를 매칭하고 `tcp.flags.syn == 1 && tcp.flags.ack == 0`은 SYN+ACK가 아닌 순수 SYN 패킷(포트 스캔·SYN Flooding 시도 등)만 추출합니다. `host ... and tcp[tcpflags] ...`는 tcpdump/캡처 필터(BPF) 문법이며, `ack == 1`이나 `0x12`는 SYN+ACK 응답 패킷을 매칭하고 `ip.src`는 출발지 방향만 검사합니다.",
      difficulty: "MEDIUM",
      keywords: ["Wireshark", "디스플레이 필터", "tcp.flags.syn", "패킷 분석"],
    },
    {
      id: "SEC_2027_NET_007",
      category: "차세대 네트워크 보안",
      syllabusItemCode: "2-3-2-2",
      question:
        "SASE 보안 영역(SSE)의 구성 요소 중, 임직원이 외부 클라우드 기반 SaaS 애플리케이션을 이용할 때 섀도우 IT 탐지, 접근 가시성 확보, 데이터 유출 방지(DLP) 정책을 중개·집행하는 요소는?",
      options: [
        "SWG (Secure Web Gateway)",
        "CASB (Cloud Access Security Broker)",
        "FWaaS (Firewall as a Service)",
        "ZTNA (Zero Trust Network Access)",
      ],
      answer: "CASB (Cloud Access Security Broker)",
      explanation:
        "SASE의 클라우드 보안 축인 SSE(Security Service Edge)는 SWG(일반 웹 트래픽 URL 필터링·악성코드·웹 DLP), CASB(SaaS 앱 가시성·섀도우 IT 통제·API/인라인 SaaS DLP), FWaaS(클라우드 기반 L3~L7 방화벽), ZTNA(사내 비공개 앱 제로트러스트 접근 제어)로 구성됩니다.",
      difficulty: "MEDIUM",
      keywords: ["SASE", "SSE", "CASB", "섀도우 IT"],
    },
    {
      id: "SEC_2027_NET_008",
      category: "차세대 네트워크 보안",
      syllabusItemCode: "2-3-2-2",
      question:
        "제로트러스트 아키텍처(NIST SP 800-207)의 논리적 구성 요소인 정책 엔진(PE), 정책 관리자(PA), 정책 시행 지점(PEP)의 역할 분담으로 올바른 것은?",
      options: [
        "PEP가 신뢰 알고리즘으로 접근 허용 여부를 최종 계산하고, PE는 그 결정을 받아 실제 데이터 평면 연결을 차단한다.",
        "PE와 PA는 제어 평면에서 접근을 판정·명령하고, PEP는 데이터 평면에서 실제 통신 세션을 허용·종료한다.",
        "PA는 단말 보안 상태를 실시간 탐지하는 에이전트이며, PE는 로그 저장 전용 SIEM 데이터베이스로 동작한다.",
        "PEP는 최초 1회 로그인 인증만 수행하고, 세션이 수립된 뒤에는 PE의 정책 변경과 무관하게 통신을 유지한다.",
      ],
      answer:
        "PE와 PA는 제어 평면에서 접근을 판정·명령하고, PEP는 데이터 평면에서 실제 통신 세션을 허용·종료한다.",
      explanation:
        "NIST SP 800-207 제로트러스트 아키텍처에서 제어 평면(Control Plane)의 정책 결정 지점(PDP)은 정책 엔진(PE: 기업 정책과 위협·단말 상태 신호로 접근 허용/거부 결정)과 정책 관리자(PA: PE의 결정에 따라 PEP에 세션 개설·종료 명령과 인증 토큰 전달)로 구성되며, 데이터 평면(Data Plane)의 정책 시행 지점(PEP)이 실제 주체와 자원 간 트래픽을 중계·허용·차단합니다.",
      difficulty: "HARD",
      keywords: ["ZTNA", "ZTA", "NIST SP 800-207", "PE", "PEP"],
    },
    {
      id: "SEC_2027_NET_009",
      category: "차세대 네트워크 보안",
      syllabusItemCode: "2-3-2-2",
      question:
        "SASE 아키텍처를 구성하는 핵심 기술인 SWG, FWaaS, SD-WAN의 역할을 바르게 연결한 것은?",
      options: [
        "SWG: 지사·클라우드 간 회선 최적 경로 전송 / FWaaS: 웹 URL 필터링 / SD-WAN: SaaS 섀도우 IT 통제",
        "SWG: 웹 트래픽 URL·DLP 검사 / FWaaS: 클라우드 L3~L7 방화벽 / SD-WAN: 소프트웨어 정의 최적 경로 전송",
        "SWG: 비공개 내부 앱 제로트러스트 접근 / FWaaS: 단말 프로세스 격리 / SD-WAN: L2 스위치 MAC 학습",
        "SWG: 클라우드 방화벽 통합 정책 / FWaaS: 소프트웨어 정의 WAN 라우팅 / SD-WAN: 악성 웹사이트 차단",
      ],
      answer:
        "SWG: 웹 트래픽 URL·DLP 검사 / FWaaS: 클라우드 L3~L7 방화벽 / SD-WAN: 소프트웨어 정의 최적 경로 전송",
      explanation:
        "SASE는 네트워크 계층의 SD-WAN(지사·원격지·클라우드 간 회선 가상화 및 최적 경로 전송)과 클라우드 보안 계층(SSE)의 SWG(웹 트래픽 URL 필터링·TLS 검사·악성코드/DLP 차단), FWaaS(비웹 트래픽까지 포함한 클라우드 L3~L7 방화벽), CASB(SaaS 통제), ZTNA(비공개 앱 제로트러스트 접근)가 통합된 모델입니다.",
      difficulty: "EASY",
      keywords: ["SASE", "SWG", "FWaaS", "SD-WAN", "SSE"],
    },
    {
      id: "SEC_2027_NET_010",
      category: "차세대 네트워크 보안",
      syllabusItemCode: "2-3-2-2",
      question:
        "ZTNA(SDP 기반)가 인증되지 않은 외부 공격자에게 사내 애플리케이션 서버의 IP와 포트를 인터넷에 직접 노출하지 않기 위해 사용하는 구조적 특징으로 올바른 것은?",
      options: [
        "외부 경계 방화벽에 모든 앱 포트를 개방해 두고 다중인증(MFA) 성공 여부만으로 접근을 허용한다.",
        "단일 패킷 인증(SPA)이나 내부 커넥터의 아웃바운드 연결로 인증 전 포트 응답을 차단한다.",
        "원격 단말에 사내 전체 사설 IP 대역을 할당하는 풀 터널 VPN을 먼저 연결한 뒤 포트 스캔을 허용한다.",
        "사내 애플리케이션 서버의 실제 공인 IP를 공개 DNS SRV 레코드에 등록해 클라이언트 탐색을 돕는다.",
      ],
      answer:
        "단일 패킷 인증(SPA)이나 내부 커넥터의 아웃바운드 연결로 인증 전 포트 응답을 차단한다.",
      explanation:
        "SDP 기반 ZTNA는 인바운드 포트를 인터넷에 열어두지 않고 내부 앱 커넥터가 ZTNA 클라우드 브로커로 아웃바운드 터널을 먼저 맺거나, 인증 전 모든 패킷을 기본 드롭(Default Drop)한 채 암호화된 단일 패킷 인증(SPA)을 통과한 인가 단말에만 접속을 허용하는 '다크 클라우드' 구조를 취함으로써 외부 포트 스캐닝과 취약점 노출 표면을 제거합니다.",
      difficulty: "MEDIUM",
      keywords: ["ZTNA", "SDP", "SPA", "다크 클라우드", "공격 표면 제거"],
    },
    {
      id: "SEC_2027_NET_011",
      category: "차세대 네트워크 보안",
      syllabusItemCode: "2-3-2-2",
      question:
        "보안 관제 솔루션인 EDR, XDR, SIEM+SOAR의 핵심 역할 차이를 가장 정확하게 비교한 것은?",
      options: [
        "EDR은 다중 계층 통합 상관 분석, XDR은 단말 프로세스 전용 감시, SIEM+SOAR는 네트워크 패킷 인라인 차단에 강점이 있다.",
        "EDR은 방화벽 로그 장기 보관, XDR은 클라우드 구성 오류 전용 점검, SIEM+SOAR는 단말 커널 기반 악성코드 치료에 강점이 있다.",
        "EDR은 단말 탐지·대응, XDR은 다중 계층 통합 상관·대응, SIEM+SOAR는 전사 로그 보관과 워크플로 자동화에 강점이 있다.",
        "EDR은 이메일 피싱 차단, XDR은 물리 망 분리 장비 제어, SIEM+SOAR는 단일 벤더 단말 에이전트 원격 배포에 강점이 있다.",
      ],
      answer:
        "EDR은 단말 탐지·대응, XDR은 다중 계층 통합 상관·대응, SIEM+SOAR는 전사 로그 보관과 워크플로 자동화에 강점이 있다.",
      explanation:
        "EDR(Endpoint Detection and Response)은 PC·서버 등 엔드포인트 영역의 프로세스·행위 탐지 및 격리에 집중합니다. XDR(Extended Detection and Response)은 단말·네트워크·클라우드·이메일·계정 등 다중 계층의 텔레메트리를 기본 통합·상관 분석해 공격 체인 전체를 가시화하고 신속한 대응을 제공합니다. SIEM+SOAR는 이기종 전사 보안 로그의 장기 보관·컴플라이언스 감사와 광범위한 플레이북 기반 대응 자동화에 강점이 있습니다. EDR과 XDR의 역할을 뒤바꾸거나 XDR을 클라우드 형상관리(CSPM)와 혼동한 보기는 오답입니다.",
      difficulty: "MEDIUM",
      keywords: ["XDR", "EDR", "SIEM", "SOAR", "상관 분석"],
    },
    {
      id: "SEC_2027_NET_012",
      category: "차세대 네트워크 보안",
      syllabusItemCode: "2-3-2-2",
      question:
        "XDR 솔루션의 구현 방식 중 '네이티브 XDR(Native XDR)'과 '오픈 XDR(Open XDR)'의 특징을 바르게 비교한 것은?",
      options: [
        "네이티브 XDR은 멀티 벤더 도구를 API로 통합하고, 오픈 XDR은 단일 벤더 제품군으로만 구성한다.",
        "네이티브 XDR은 단일 벤더 제품군 간 긴밀한 연동에 강점이 있고, 오픈 XDR은 이기종 타사 보안 도구 통합에 유리하다.",
        "네이티브 XDR은 온프레미스 서버에만 설치 가능하고, 오픈 XDR은 오픈소스 라이선스 제품에만 적용할 수 있다.",
        "오픈 XDR은 원격 측정 데이터를 직접 수집하지 않으며, 네이티브 XDR만 자동 격리 대응 플레이북을 지원한다.",
      ],
      answer:
        "네이티브 XDR은 단일 벤더 제품군 간 긴밀한 연동에 강점이 있고, 오픈 XDR은 이기종 타사 보안 도구 통합에 유리하다.",
      explanation:
        "네이티브 XDR은 동일 보안 벤더의 EDR·방화벽·이메일·클라우드 제품군 간 데이터 스키마가 통일되어 구축과 상관 분석 최적화가 용이하지만 벤더 종속(Lock-in) 우려가 있습니다. 오픈 XDR은 표준 API와 커넥터를 통해 기존에 운영 중인 다양한 타사 보안 장비와 텔레메트리를 유연하게 통합하므로 기존 투자 보호에 유리합니다.",
      difficulty: "MEDIUM",
      keywords: ["Native XDR", "Open XDR", "멀티 벤더 연동"],
    },
    {
      id: "SEC_2027_NET_013",
      category: "차세대 네트워크 보안",
      syllabusItemCode: "2-1-2-2",
      question:
        "네트워크 파일 공유 관련 프로토콜인 NetBIOS, NetBEUI, SMB(v2/v3)의 계층 특성과 상호 관계를 바르게 설명한 것은?",
      options: [
        "NetBEUI는 TCP/IP 기반 광역 라우팅을 담당하고, NetBIOS는 파일 암호화를 제공하며, SMB는 UDP 137 포트만 사용한다.",
        "NetBIOS는 L3 라우팅 프로토콜이고, NetBEUI는 SMBv3의 종단간 암호화 모듈이며, SMB는 TCP 139 없이는 동작하지 않는다.",
        "SMB는 소규모 비라우팅 LAN 전용이고, NetBEUI는 TCP 445 기반 디렉터리 공유를 담당하며, NetBIOS는 DNS를 대체하는 인터넷 표준이다.",
        "NetBIOS는 세션·이름 해석 API이고, NetBEUI는 비라우팅 LAN 프로토콜이며, 현대 SMB는 TCP 445에서 직접 동작한다.",
      ],
      answer:
        "NetBIOS는 세션·이름 해석 API이고, NetBEUI는 비라우팅 LAN 프로토콜이며, 현대 SMB는 TCP 445에서 직접 동작한다.",
      explanation:
        "NetBIOS는 LAN 환경의 세션 관리·이름 해석 API이고, NetBEUI는 네트워크 계층(IP)이 없어 라우팅이 불가능한 소규모 LAN 전용 경량 전송 프로토콜입니다. 과거 SMB는 NetBIOS over TCP/IP(포트 137~139) 위에서 동작했지만, 현대 SMB(SMBv2/v3)는 NetBIOS 계층 없이 TCP 445번 포트(Direct Hosting) 위에서 직접 동작하며 라우팅 환경과 AES 기반 종단간 암호화·서명을 지원합니다. NetBEUI를 광역 라우팅 프로토콜로 보거나 현대 SMB가 TCP 139에 의존한다고 설명한 보기는 오답입니다.",
      difficulty: "MEDIUM",
      keywords: ["NetBIOS", "NetBEUI", "SMB", "TCP 445", "Direct Hosting"],
    },
    {
      id: "SEC_2027_NET_014",
      category: "차세대 네트워크 보안",
      syllabusItemCode: "2-1-2-2",
      question:
        "사내 Windows Active Directory 환경에서 SMB 서명(SMB Signing)이 비활성화된 상태를 악용해 피해자 클라이언트의 NTLM 인증 요청을 가로채 다른 내부 서버로 전달하여 권한을 탈취하는 공격과 핵심 예방 대책은?",
      options: [
        "EternalBlue 공격 — 취약한 SMBv1 프로토콜 비활성화 및 운영체제 원격 코드 실행 패치 적용",
        "NTLM 릴레이 공격 — 도메인 전체 SMB 서명 강제, NTLMv1 차단 및 Kerberos 인증 적용",
        "Kerberoasting 공격 — 서비스 계정(SPN) 비밀번호 복잡도 강화 및 티켓 암호화 알고리즘 상향",
        "Pass-the-Hash 공격 — LSASS 메모리 접근 보호(Credential Guard) 및 관리자 계정 분리",
      ],
      answer:
        "NTLM 릴레이 공격 — 도메인 전체 SMB 서명 강제, NTLMv1 차단 및 Kerberos 인증 적용",
      explanation:
        "SMB 서명(Require Security Signature)이 꺼져 있으면 공격자가 LLMNR/NBT-NS 포이즈닝 등으로 가로챈 피해자의 NTLM 인증 메시지를 다른 내부 SMB 서버로 실시간 중계해 관리자 권한을 획득하는 NTLM 릴레이(SMB 릴레이) 공격이 가능합니다. 도메인 컨트롤러·멤버 서버·클라이언트 전체에 SMB 서명을 강제하고 NTLMv1 비활성화 및 Kerberos·SMBv3 암호화를 적용해 예방합니다. EternalBlue는 SMBv1 원격 코드 실행 취약점, Kerberoasting은 TGS 티켓 오프라인 크래킹, Pass-the-Hash는 LSASS 등에서 탈취한 NTLM 해시 재사용 공격으로 구분됩니다.",
      difficulty: "HARD",
      keywords: ["SMB 서명", "SMB Signing", "NTLM Relay", "측면 이동"],
    },
    {
      id: "SEC_2027_NET_015",
      category: "차세대 네트워크 보안",
      syllabusItemCode: "2-1-2-2",
      question:
        "사내 업무망에서 비인가 P2P(Peer-to-Peer) 파일 공유 프로그램이 통제 없이 사용될 때의 보안 특성과 위험으로 가장 거리가 먼 것은?",
      options: [
        "전송 파일은 항상 중앙 관리 서버의 사전 백신 검사와 DLP 승인을 거친 뒤에만 수신 단말에 전달된다.",
        "정상 문서·미디어 파일로 위장한 악성코드나 랜섬웨어가 내부 업무망 단말로 유입되는 통로가 된다.",
        "업무 기밀이나 개인정보가 포함된 폴더가 공유 설정 오류로 외부 불특정 다수에게 노출될 수 있다.",
        "대용량 업·다운로드 트래픽이 상시 발생해 업무용 인터넷 회선 대역폭을 고갈시키고 저작권 분쟁을 유발한다.",
      ],
      answer:
        "전송 파일은 항상 중앙 관리 서버의 사전 백신 검사와 DLP 승인을 거친 뒤에만 수신 단말에 전달된다.",
      explanation:
        "P2P 통신은 중앙 중개 파일 서버를 거치지 않고 피어 단말 간 직접 파일을 분산 송수신하므로 중앙 백신 게이트웨이나 기존 파일 서버 기반 DLP 통제를 우회하기 쉽습니다. 이로 인해 악성코드 유입, 기밀 파일 비인가 공유 유출, 회선 대역폭 점유, 저작권 침해 위험이 크므로 NGFW 애플리케이션 제어(DPI)와 NAC 정책으로 차단해야 합니다.",
      difficulty: "EASY",
      keywords: ["P2P 보안 위협", "네트워크 공유", "DPI 차단"],
    },
    {
      id: "SEC_2027_NET_016",
      category: "차세대 네트워크 보안",
      syllabusItemCode: "2-1-2-4",
      question:
        "`Wireshark`로 침해사고 패킷 캡처(`.pcap`) 파일을 분석하면서 평문 HTTP 요청·응답의 전체 대화 흐름을 재조립하거나 전송된 악성 파일 원본을 추출하려 할 때 사용하는 기능은?",
      options: [
        "`Statistics → Protocol Hierarchy` 및 `Endpoints`",
        "`Follow TCP/HTTP Stream` 및 `File → Export Objects`",
        "`Analyze → Expert Information` 및 `Capture Options`",
        "`Statistics → Flow Graph` 및 `IO Graphs`",
      ],
      answer: "`Follow TCP/HTTP Stream` 및 `File → Export Objects`",
      explanation:
        "Wireshark의 `Follow TCP/HTTP Stream`은 여러 패킷으로 분할 전송된 요청·응답 페이로드를 하나의 연속된 대화로 재조립해 주며, `File → Export Objects`(HTTP, SMB 등)는 세션 내에서 오간 파일·실행 바이너리를 추출해 포렌식 분석에 활용하게 해줍니다. `Protocol Hierarchy`/`Endpoints`는 계층·호스트별 트래픽 통계, `Expert Information`은 재전송·오류 요약, `Flow/IO Graphs`는 시간대별 패킷 흐름 및 처리량 시각화 기능입니다.",
      difficulty: "EASY",
      keywords: ["Wireshark", "Follow TCP Stream", "Export Objects", "패킷 분석"],
    },
    {
      id: "SEC_2027_NET_017",
      category: "차세대 네트워크 보안",
      syllabusItemCode: "2-1-2-4",
      question:
        "`Wireshark` 디스플레이 필터 표현식과 그 필터링 결과가 바르게 연결된 것은?",
      options: [
        "`tcp.port == 80 || 443` — 출발지나 목적지 포트가 80 또는 443인 패킷만 추출",
        "`!(arp && dns)` — ARP 패킷과 DNS 패킷을 화면에서 모두 제외하고 표시",
        "`http.request.method == \"POST\" && http contains \"passwd\"` — POST 요청 중 `passwd` 포함 패킷 추출",
        "`ip.src == 10.0.0.5 && ip.dst == 10.0.0.5` — 호스트 `10.0.0.5`가 송신하거나 수신한 모든 정상 패킷",
      ],
      answer:
        "`http.request.method == \"POST\" && http contains \"passwd\"` — POST 요청 중 `passwd` 포함 패킷 추출",
      explanation:
        "`contains` 연산자는 프로토콜 헤더나 페이로드에 특정 문자열·바이트가 포함된 패킷을 검색할 때 쓰입니다. `tcp.port == 80 || 443`은 뒷부분 `443`이 0이 아닌 상수로 평가되어 항상 참이 되므로 `tcp.port in {80 443}` 또는 `tcp.port == 80 || tcp.port == 443`으로 작성해야 합니다. ARP와 DNS를 모두 제외하려면 `!(arp || dns)`가 맞고, 출발지·목적지가 모두 `10.0.0.5`인 패킷은 자기 자신에게 보낸 이상(Land 공격) 패킷입니다.",
      difficulty: "MEDIUM",
      keywords: ["Wireshark", "contains", "디스플레이 필터 문법"],
    },
    {
      id: "SEC_2027_NET_018",
      category: "차세대 네트워크 보안",
      syllabusItemCode: "2-1-2-4",
      question:
        "GUI가 없는 리눅스 운영 서버에서 침해사고 네트워크 증적을 수집·분석할 때 `tcpdump`와 `Wireshark`를 연계하는 가장 효율적인 실무 절차는?",
      options: [
        "운영 서버에서 `tcpdump -w capture.pcap`으로 원본 패킷을 경량 수집한 뒤 분석 PC의 `Wireshark`로 디코딩한다.",
        "운영 서버에 X-Window와 Wireshark GUI를 설치해 패킷이 유입되는 즉시 실시간 화면으로 24시간 감시한다.",
        "`tcpdump`로 캡처한 텍스트 요약 출력만 파일로 저장하고, `.pcap` 바이너리는 용량 절감을 위해 생성하지 않는다.",
        "운영 서버에서 `tcpdump`로 실시간 필터링만 수행하며, 생성된 `.pcap`은 형식 불일치로 `Wireshark`에서 열 수 없다.",
      ],
      answer:
        "운영 서버에서 `tcpdump -w capture.pcap`으로 원본 패킷을 경량 수집한 뒤 분석 PC의 `Wireshark`로 디코딩한다.",
      explanation:
        "`tcpdump`와 `Wireshark`는 동일한 `libpcap`(`.pcap`/`.pcapng`) 형식을 호환합니다. 운영 서버에 GUI 패키지를 올리면 시스템 자원 소모와 보안 공격 표면이 커지므로 CLI `tcpdump -i eth0 -w capture.pcap`으로 원본 바이너리 패킷을 경량 수집한 뒤, 별도의 분석 워크스테이션에서 Wireshark의 프로토콜 해부기·디스플레이 필터·스트림 추적·파일 추출 기능으로 정밀 분석하는 것이 표준 실무입니다.",
      difficulty: "EASY",
      keywords: ["tcpdump", "Wireshark", "pcap", "네트워크 도구"],
    },
    {
      id: "SEC_2027_NET_019",
      category: "차세대 네트워크 보안",
      syllabusItemCode: "2-1-2-4",
      question:
        "TLS 1.3(ECDHE 기반)으로 암호화된 HTTPS 캡처(`.pcap`) 파일을 테스트 환경의 `Wireshark`에서 복호화해 분석하기 위한 조건으로 올바른 것은?",
      options: [
        "웹 서버의 장기 개인키(`.key`) 파일만 Wireshark TLS 환경설정에 등록하면 모든 세션을 복호화할 수 있다.",
        "클라이언트 또는 서버에서 기록한 세션 키 로그(`SSLKEYLOGFILE`)를 Wireshark에 연동해야 복호화할 수 있다.",
        "서버의 공개키 인증서(`.crt`)와 CA 인증서 체인을 등록하면 대칭 세션키를 역산해 평문으로 복호화한다.",
        "TLS 1.3은 RSA 정적 키 교환을 기본 사용하므로 핸드셰이크 패킷의 Pre-Master Secret을 직접 읽으면 된다.",
      ],
      answer:
        "클라이언트 또는 서버에서 기록한 세션 키 로그(`SSLKEYLOGFILE`)를 Wireshark에 연동해야 복호화할 수 있다.",
      explanation:
        "과거 정적 RSA 키 교환 기반 TLS에서는 서버의 개인키 파일만으로 오프라인 패킷 복호화가 가능했으나, 현대 TLS 1.2(ECDHE)와 TLS 1.3은 완전 순방향 비밀성(PFS)을 제공하는 임시 디피-헬만 키 교환을 강제하므로 서버 장기 개인키만으로는 과거 세션 키를 복구할 수 없습니다. 따라서 테스트·분석 환경에서는 `SSLKEYLOGFILE` 환경변수 등으로 기록된 세션 비밀키 로그를 Wireshark의 TLS 설정에 지정해야 복호화됩니다.",
      difficulty: "HARD",
      keywords: ["Wireshark", "TLS 1.3 복호화", "SSLKEYLOGFILE", "PFS"],
    },
    {
      id: "SEC_2027_NET_020",
      category: "차세대 네트워크 보안",
      syllabusItemCode: "2-1-2-4",
      question:
        "`Wireshark`로 분석한 사내 LAN `.pcap` 파일에서 `arp.duplicate-address-detected` 경고가 다수 발생하고, 특정 단말 MAC 주소가 게이트웨이 IP에 대한 비요청 ARP 응답을 짧은 시간에 수백 회 전송하고 있었다. 이 징후가 가리키는 공격과 즉각 대응은?",
      options: [
        "MAC Flooding(스위치 재밍) — 스위치 Port Security로 포트당 학습 MAC 수 제한",
        "비인가 DHCP 스푸핑 — 인가 DHCP 서버 포트만 Trusted로 지정하고 Offer 응답 차단",
        "ARP 스푸핑(중간자 공격) — 해당 MAC 스위치 포트 격리 및 DAI·DHCP Snooping 적용",
        "ICMP Redirect 기반 경로 변조 — 호스트 커널의 accept_redirects 비활성화 및 Type 5 차단",
      ],
      answer:
        "ARP 스푸핑(중간자 공격) — 해당 MAC 스위치 포트 격리 및 DAI·DHCP Snooping 적용",
      explanation:
        "Wireshark에서 `arp.duplicate-address-detected` 경고와 특정 MAC의 대량 비요청 ARP 응답(Gratuitous ARP/ARP Reply)은 게이트웨이 MAC 매핑을 가로채는 ARP 스푸핑(중간자 공격)의 전형적인 징후입니다. 스위치 MAC 테이블에서 공격 단말 포트를 추적해 격리하고, 스위치의 DHCP Snooping과 DAI(Dynamic ARP Inspection)를 적용해 위조 ARP 패킷을 차단해야 합니다. MAC Flooding은 수많은 서로 다른 위조 출발지 MAC으로 CAM 테이블을 채우는 공격이고, 비인가 DHCP 스푸핑은 DHCP Offer/ACK 위조, ICMP Redirect는 L3 Type 5 경로 변조 공격으로 징후가 다릅니다.",
      difficulty: "EASY",
      keywords: ["Wireshark", "ARP 스푸핑 징후", "DAI", "패킷 분석"],
    },
    {
      id: "SEC_2027_NET_021",
      category: "차세대 네트워크 보안",
      syllabusItemCode: "2-3-2-2",
      question:
        "제로트러스트(Zero Trust) 보안 모델의 3대 핵심 운영 원칙을 가장 바르게 묶은 것은?",
      options: [
        "① 경계 내부망은 기본 신뢰, ② 경계 방화벽 단일 집중 통제, ③ 최초 1회 로그인 후 세션 유지",
        "① 절대 신뢰하지 않고 항상 검증, ② 최소 권한 기반 접근 통제, ③ 이미 침해된 상태 가정",
        "① 물리 망 분리 단독 의존, ② 정적 사설 IP 기반 접근 허용, ③ 내부 트래픽 암호화 생략",
        "① 관리자 권한 중앙 집중 부여, ② 네트워크 세분화 최소화, ③ 사후 감사 로그 위주 탐지",
      ],
      answer:
        "① 절대 신뢰하지 않고 항상 검증, ② 최소 권한 기반 접근 통제, ③ 이미 침해된 상태 가정",
      explanation:
        "제로트러스트 모델은 '사내망=안전, 외부망=위험'이라는 전통적 경계 방어(Castle-and-Moat) 모델을 폐기하고 ① 절대 신뢰하지 않고 항상 검증(Never Trust, Always Verify), ② 최소 권한 접근(Least Privilege Access), ③ 이미 침해가 발생했다고 가정(Assume Breach — 마이크로세그멘테이션·암호화·지속 모니터링 적용)을 핵심 원칙으로 삼습니다.",
      difficulty: "EASY",
      keywords: ["Zero Trust", "Never Trust Always Verify", "Assume Breach", "ZTNA"],
    },
    {
      id: "SEC_2027_NET_022",
      category: "차세대 네트워크 보안",
      syllabusItemCode: "2-3-2-2",
      question:
        "최초 접속 시 1회 검증 후 세션을 유지하던 ZTNA 1.0의 한계를 보완하기 위해 제시된 ZTNA 2.0의 핵심 강화 요소는?",
      options: [
        "클라이언트 IP·포트 기반 방화벽 규칙만으로 L3 네트워크 대역 접근을 일괄 허용한다.",
        "세션 유지 중 단말 상태·행위를 지속 검증하고 허용된 앱 내부 트래픽까지 심층 검사한다.",
        "최초 인증 시 발급된 장기 세션 토큰의 유효기간을 늘려 반복적인 재인증 부하를 제거한다.",
        "암호화 복호화 검사를 생략하고 내부 애플리케이션 서버로 패킷을 직접 고속 바이패스한다.",
      ],
      answer:
        "세션 유지 중 단말 상태·행위를 지속 검증하고 허용된 앱 내부 트래픽까지 심층 검사한다.",
      explanation:
        "ZTNA 2.0은 '한 번 접속을 허용하면 세션 종료까지 추가 검증을 하지 않는(Allow-and-Ignore)' ZTNA 1.0의 약점을 보완하여 ① 접속 중 단말 보안 상태·사용자 행위 이상 발생 시 즉시 세션을 철회하는 지속적 신뢰 검증(Continuous Trust Verification), ② 앱·하위 기능 단위 최소 권한, ③ 허용된 연결 내부 트래픽에 대한 L7 위협·DLP 심층 검사를 강조합니다.",
      difficulty: "MEDIUM",
      keywords: ["ZTNA 2.0", "지속적 신뢰 검증", "Zero Trust"],
    },
    {
      id: "SEC_2027_NET_023",
      category: "차세대 네트워크 보안",
      syllabusItemCode: "2-1-2-2",
      question:
        "리눅스 서버에서 윈도우 클라이언트와 SMB 파일 공유를 연동하는 `Samba` 서비스를 운영할 때, `/etc/samba/smb.conf`의 보안 설정으로 적절하지 않은 것은?",
      options: [
        "레거시 단말 호환을 위해 `server min protocol = NT1`을 유지하고 전송 구간 암호화를 해제한다.",
        "`server min protocol = SMB3`으로 구버전 협상을 막고 `smb encrypt = required`로 암호화를 강제한다.",
        "`hosts allow`로 사내 인가 서브넷만 허용하고 경계 방화벽에서 외부 인터넷의 TCP 445 유입을 차단한다.",
        "공유 디렉터리별 `valid users`로 최소 권한 계정을 지정하고 불필요한 익명 게스트 접근을 금지한다.",
      ],
      answer:
        "레거시 단말 호환을 위해 `server min protocol = NT1`을 유지하고 전송 구간 암호화를 해제한다.",
      explanation:
        "Samba 설정에서 `NT1`은 원격 코드 실행(EternalBlue) 등 치명적 취약점에 노출된 구형 SMBv1 프로토콜을 뜻합니다. 따라서 `server min protocol = SMB2` 또는 `SMB3`으로 최소 프로토콜 버전을 상향하고, `smb encrypt = required`(암호화 강제)와 `server signing = mandatory`(서명 강제), `hosts allow` 접근 제어, `guest ok = no` 설정을 적용해야 합니다.",
      difficulty: "MEDIUM",
      keywords: ["SMB", "Samba 보안", "SMBv3", "smb encrypt"],
    },
    {
      id: "SEC_2027_NET_024",
      category: "차세대 네트워크 보안",
      syllabusItemCode: "2-3-2-2",
      question:
        "재택근무자가 사내 ERP에 접속할 때 클라우드 엣지에서 단말 상태·신원 기반 최소 권한 접속과 SaaS 웹 DLP를 통합 통제하고, 동시에 엔드포인트·네트워크·클라우드 경보를 상관 분석해 감염 단말을 자동 격리하려 한다. 가장 적합한 솔루션 조합은?",
      options: [
        "L3 Site-to-Site IPSec VPN + 수동 로그 백업 서버",
        "SASE (ZTNA·SWG/CASB 포함) + XDR",
        "사내 유선 LAN NAC + 온프레미스 L4 방화벽",
        "웹 방화벽(WAF) + DNSSEC + DDoS 스크러빙 센터",
      ],
      answer: "SASE (ZTNA·SWG/CASB 포함) + XDR",
      explanation:
        "원격 접속자의 단말 상태·신원 기반 앱 최소 권한 접속(ZTNA)과 SaaS/웹 트래픽 DLP 통제(SWG/CASB)는 클라우드 엣지 통합 보안 아키텍처인 `SASE`가 수행하며, 엔드포인트·네트워크·클라우드 다중 영역의 텔레메트리를 상관 분석해 공격 체인을 식별하고 감염 단말을 자동 격리하는 대응은 `XDR`의 역할입니다. IPSec VPN이나 유선 NAC, WAF+DDoS 스크러빙 조합은 원격 앱 제로트러스트 통제 및 다중 도메인 상관 격리 요구를 모두 충족하지 못합니다.",
      difficulty: "EASY",
      keywords: ["SASE", "ZTNA", "XDR", "차세대 네트워크 보안 종합"],
    },
  ],
);

export const SECURITY_2027_SYS_NET_QUESTIONS: Question[] = [
  ...rev2027Sys,
  ...rev2027Net,
];
