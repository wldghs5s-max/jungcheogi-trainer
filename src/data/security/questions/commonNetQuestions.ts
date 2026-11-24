import { Question } from "../../../types/question";
import { buildSecuritySectionQuestions } from "./builders";

/**
 * 2과목 네트워크 보안 — 공통 범위 창작 문제 (2023~2026 현행 및 공통 기준)
 */
const net0101 = buildSecuritySectionQuestions(
  {
    sectionId: "SEC_SEC_NET_01_01",
    syllabusStandard: "2023_2026",
  },
  [
    {
      id: "SEC_CMN_NET_011",
      category: "네트워크 공격 및 대응",
      question:
        "출발지 IP 주소와 목적지 IP 주소를 모두 피해 대상 호스트의 주소로 동일하게 위조한 TCP SYN 패킷을 전송하여 대상 시스템이 자신에게 응답을 반복하게 만드는 서비스 거부(DoS) 공격은?",
      options: [
        "Land 공격",
        "Teardrop 공격",
        "Smurf 공격",
        "Fraggle 공격",
      ],
      answer: "Land 공격",
      explanation:
        "Land 공격은 출발지 IP·포트와 목적지 IP·포트를 피해자 자신으로 동일하게 위조해 무한 루프나 자원 고갈을 유발하는 DoS 공격이며, 방화벽에서 출발지·목적지 IP가 동일한 패킷을 차단하여 예방합니다. Teardrop은 IP 단편화 오프셋 중첩, Smurf는 ICMP 브로드캐스트 증폭, Fraggle은 UDP 브로드캐스트 증폭 공격입니다.",
      difficulty: "EASY",
      keywords: ["Land 공격", "DoS", "IP 스푸핑"],
    },
    {
      id: "SEC_CMN_NET_012",
      category: "네트워크 공격 및 대응",
      question:
        "IP 패킷의 단편화(Fragmentation) 재조합 과정에서 오프셋(Offset) 값을 의도적으로 중첩되거나 어긋나게 조작하여 수신 측 운영체제의 패킷 재조합 오류 및 시스템 마비를 유발하는 공격은?",
      options: [
        "Teardrop 공격",
        "Ping of Death 공격",
        "SYN Flooding 공격",
        "Land 공격",
      ],
      answer: "Teardrop 공격",
      explanation:
        "Teardrop 공격은 단편화된 IP 패킷의 Fragment Offset 값을 중첩되도록 조작해 수신 측 OS가 재조합할 때 음수 길이 계산 오류나 커널 패닉을 일으키는 공격입니다. Ping of Death는 65,535바이트를 초과하는 초대형 ICMP 패킷을 단편화해 전송하는 공격이며, Land 공격은 출발지·목적지 IP/포트를 동일하게 위조합니다.",
      difficulty: "EASY",
      keywords: ["Teardrop", "IP 단편화", "Fragment Offset", "DoS"],
    },
    {
      id: "SEC_CMN_NET_013",
      category: "네트워크 공격 및 대응",
      question:
        "Smurf 공격과 Fraggle 공격의 가장 핵심적인 차이점으로 올바른 것은?",
      options: [
        "Smurf는 ICMP Echo 요청을, Fraggle은 UDP(Echo/Chargen)를 증폭한다.",
        "Smurf는 UDP Echo 요청을, Fraggle은 ICMP Echo 요청을 증폭한다.",
        "Smurf는 TCP SYN 패킷을, Fraggle은 IP 단편화 오프셋 중첩을 악용한다.",
        "Smurf는 브로드캐스트 주소를, Fraggle은 유니캐스트 단일 호스트만 사용한다.",
      ],
      answer:
        "Smurf는 ICMP Echo 요청을, Fraggle은 UDP(Echo/Chargen)를 증폭한다.",
      explanation:
        "Smurf와 Fraggle은 모두 출발지 IP를 피해자로 위조하고 네트워크 브로드캐스트 주소로 패킷을 보내 다수 호스트의 응답을 피해자에게 집중시키는 증폭(Amplification) 공격입니다. 차이는 사용 프로토콜로, Smurf는 ICMP를, Fraggle은 UDP(포트 7 Echo·19 Chargen)를 사용합니다. 두 공격 모두 라우터의 Directed Broadcast 차단(`no ip directed-broadcast`)과 불필요한 Echo/Chargen 서비스 비활성화로 예방합니다.",
      difficulty: "MEDIUM",
      keywords: ["Smurf", "Fraggle", "증폭 공격", "Directed Broadcast"],
    },
    {
      id: "SEC_CMN_NET_014",
      category: "네트워크 공격 및 대응",
      question:
        "웹 서버의 CPU·메모리·대역폭은 비교적 여유가 있는데도 신규 사용자의 웹 페이지 접속이 지연되거나 타임아웃된다. 패킷을 확인하니 공격자가 HTTP 헤더의 종료 문자열(`\\r\\n\\r\\n`)을 보내지 않고 매우 느린 속도로 헤더를 조금씩 전송하며 다수의 TCP 연결을 장시간 점유하고 있었다. 이 공격 유형과 적절한 대응책은?",
      options: [
        "Slowloris — 헤더 수신 타임아웃 단축 및 IP당 연결 제한",
        "Slow HTTP POST — 웹 캐시 CDN 무효화 정책 및 WAF 적용",
        "HTTP GET Flooding — 라우터 Directed Broadcast 차단 설정",
        "SYN Flooding — 요청 본문 최대 크기(Content-Length) 축소",
      ],
      answer:
        "Slowloris — 헤더 수신 타임아웃 단축 및 IP당 연결 제한",
      explanation:
        "Slowloris는 정상적인 TCP 연결 후 HTTP 요청 헤더의 끝(`\\r\\n\\r\\n`)을 보내지 않고 개행·더미 헤더를 천천히 전송해 웹 서버의 동시 연결 슬롯을 고갈시키는 저대역폭 애플리케이션 계층(Slow HTTP Header) DoS 공격입니다. 대응책은 요청 헤더 수신 타임아웃(`RequestReadTimeout` 등) 단축, 최소 데이터 전송률 강제, IP당 최대 동시 연결 수 제한입니다.",
      difficulty: "MEDIUM",
      keywords: ["Slowloris", "Slow HTTP Header", "애플리케이션 DoS", "대응"],
    },
    {
      id: "SEC_CMN_NET_015",
      category: "네트워크 공격 및 대응",
      question:
        "Slow HTTP POST (R.U.D.Y.) 공격과 Slow HTTP Read 공격을 바르게 구분한 설명은?",
      options: [
        "POST는 큰 본문 길이를 선언 후 느리게 보내고, Read는 작은 TCP 윈도우로 응답을 지연시킨다.",
        "POST는 HTTP 헤더 종결을 지연시키고, Read는 대량의 GET 요청을 초고속으로 반복 전송한다.",
        "POST는 작은 TCP 윈도우로 수신을 지연시키고, Read는 큰 Content-Length 본문을 느리게 보낸다.",
        "POST는 UDP 브로드캐스트를 증폭하고, Read는 IP 단편화 오프셋을 중첩해 재조합을 방해한다.",
      ],
      answer:
        "POST는 큰 본문 길이를 선언 후 느리게 보내고, Read는 작은 TCP 윈도우로 응답을 지연시킨다.",
      explanation:
        "Slow HTTP DoS 3유형은 구분 출제가 잦습니다. ① Slowloris(Header): 헤더 종료를 지연, ② Slow HTTP POST(R.U.D.Y.): 큰 Content-Length 선언 후 본문(Body)을 1바이트씩 느리게 전송, ③ Slow HTTP Read: 클라이언트가 TCP Window Size를 0 또는 극소 값으로 광고해 서버가 응답을 다 보내지 못하고 연결을 붙잡게 합니다.",
      difficulty: "HARD",
      keywords: ["Slow HTTP POST", "R.U.D.Y.", "Slow HTTP Read", "TCP Window"],
    },
    {
      id: "SEC_CMN_NET_016",
      category: "네트워크 공격 및 대응",
      question:
        "분산 서비스 거부(DDoS) 공격 중 반사 증폭 공격(DRDoS, Distributed Reflection DoS)의 동작 원리와 예방 대책으로 가장 적절한 것은?",
      options: [
        "위조 IP로 반사 서버에 UDP 요청을 보내 응답을 집중 — BCP 38 및 오픈 리졸버 차단",
        "피해자 서버에 TCP SYN 패킷만 대량 전송해 큐 고갈 — HTTP Keep-Alive 시간 단축",
        "정상 TCP 세션 완료 후 대용량 POST 본문을 지속 전송 — 스위치 Port Security 적용",
        "공격자가 직접 피해자에 대용량 ICMP 패킷을 발송 — 내부 웹 서버 파일 권한 축소",
      ],
      answer:
        "위조 IP로 반사 서버에 UDP 요청을 보내 응답을 집중 — BCP 38 및 오픈 리졸버 차단",
      explanation:
        "DRDoS는 주로 연결 수립 과정이 없는 UDP 기반 서비스(DNS ANY, NTP monlist, SSDP, Memcached 등)에 피해자 IP로 위조된 작은 요청을 보내 수십~수만 배 큰 응답을 피해자에게 반사시키는 공격입니다. 예방을 위해 ISP/라우터에서 위조 출발지 IP를 차단하는 uRPF·BCP 38 필터링(Ingress/Egress 필터링)과 반사 서버의 오픈 리커시브·monlist 비활성화가 필수입니다.",
      difficulty: "MEDIUM",
      keywords: ["DRDoS", "반사 증폭 공격", "BCP 38", "NTP monlist"],
    },
    {
      id: "SEC_CMN_NET_017",
      category: "네트워크 공격 및 대응",
      question:
        "웹 서버에 대한 HTTP GET Flooding 공격 중, 매 요청마다 `Cache-Control: no-cache` 헤더를 붙이거나 임의의 쿼리 파라미터를 변경하여 CDN·프록시 캐시를 우회하고 원본 웹 서버와 DB 부하를 극대화하는 공격 기법은?",
      options: [
        "CC 공격 (Cache-Control 우회)",
        "Slowloris (HTTP Header 지연)",
        "R.U.D.Y. (Slow HTTP POST)",
        "Slow HTTP Read (TCP Window 축소)",
      ],
      answer: "CC 공격 (Cache-Control 우회)",
      explanation:
        "CC(Cache-Control) 공격은 HTTP GET Flooding의 변형으로, `Cache-Control: no-cache`, `must-revalidate` 헤더나 무작위 URL 쿼리를 사용해 앞단의 웹 캐시 서버(CDN/Reverse Proxy)에서 응답하지 못하게 하고 모든 요청을 원본 서버로 통과시켜 과부하를 유발합니다. 대응책은 WAF·Anti-DDoS의 요청 빈도 제한(Rate Limiting), JS/쿠키 챌린지 검증입니다.",
      difficulty: "MEDIUM",
      keywords: ["CC 공격", "Cache-Control", "HTTP GET Flooding", "DDoS"],
    },
    {
      id: "SEC_CMN_NET_018",
      category: "네트워크 공격 및 대응",
      question:
        "TCP SYN Flooding 공격이 진행 중일 때 서버에서 관찰되는 대표적 징후와 이를 완화하기 위한 커널 수준의 대응 기법이 바르게 짝지어진 것은?",
      options: [
        "SYN_RECV 반개방 연결 급증 — SYN Cookie 활성화 및 큐 조정",
        "TIME_WAIT 연결 대량 누적 — TCP Window 크기를 0으로 고정",
        "ESTABLISHED 연결만 급증 — ARP 정적 바인딩 및 DAI 활성화",
        "LISTEN 포트 전체 소멸 — 라우터 Directed Broadcast 비활성화",
      ],
      answer:
        "SYN_RECV 반개방 연결 급증 — SYN Cookie 활성화 및 큐 조정",
      explanation:
        "SYN Flooding은 공격자가 SYN 패킷만 대량 전송하고 마지막 ACK를 보내지 않아 서버의 Half-Open Backlog 큐에 `SYN_RECV` 상태가 가득 차 정상 연결을 거부하게 만듭니다. 리눅스에서는 `net.ipv4.tcp_syncookies = 1`로 SYN Cookie를 활성화하면 큐가 찰 때 상태를 저장하지 않고 암호학적 시퀀스 번호로 검증해 서비스를 유지할 수 있습니다.",
      difficulty: "EASY",
      keywords: ["SYN Flooding", "SYN_RECV", "SYN Cookie", "Backlog"],
    },
    {
      id: "SEC_CMN_NET_019",
      category: "네트워크 공격 및 대응",
      question:
        "Ping of Death 공격의 원리와 현대 네트워크 장비·OS에서의 대응 방법으로 올바른 것은?",
      options: [
        "65,535B 초과 ICMP 단편 분할 전송 — 비정상 단편 차단 및 OS 패치",
        "출발지·목적지 동일 IP TCP SYN 전송 — 자기 주소 패킷 필터링 적용",
        "IP 단편화 오프셋 중첩 조작 — 상태 기반 방화벽 세션 테이블 확장",
        "브로드캐스트 ICMP Echo 전송 — 라우터 SYN Cookie 기능 활성화",
      ],
      answer:
        "65,535B 초과 ICMP 단편 분할 전송 — 비정상 단편 차단 및 OS 패치",
      explanation:
        "Ping of Death는 IPv4 패킷 최대 허용 길이(65,535바이트)를 넘는 초대형 ICMP 패킷을 여러 단편(Fragment)으로 나누어 보내 수신 측이 재조합할 때 버퍼 오버플로우·시스템 다운을 유발하는 공격입니다. 방화벽·IPS에서 비정상 크기/단편화 ICMP를 필터링하고 OS 패치를 적용해 예방합니다.",
      difficulty: "EASY",
      keywords: ["Ping of Death", "ICMP", "65535", "단편화"],
    },
    {
      id: "SEC_CMN_NET_020",
      category: "네트워크 공격 및 대응",
      question:
        "기존 중앙 집중형 봇넷(Botnet)과 비교해 P2P 기반 DDoS 봇넷이 보안 관제 및 대응 측면에서 더 까다로운 주된 이유는?",
      options: [
        "단일 C&C 서버를 차단해도 봇 간 분산 중계로 공격 명령이 유지되기 때문이다.",
        "모든 P2P 봇이 TCP 80번 단일 포트만 사용해 포트 차단으로 구분이 어렵기 때문이다.",
        "중앙 C&C 서버가 단일 IP로 고정되어 있어 트래픽 흐름이 한 곳에만 집중되기 때문이다.",
        "봇 감염 시 피해자 호스트의 MAC 주소가 매 패킷마다 자동으로 초기화되기 때문이다.",
      ],
      answer:
        "단일 C&C 서버를 차단해도 봇 간 분산 중계로 공격 명령이 유지되기 때문이다.",
      explanation:
        "IRC나 HTTP 기반 중앙 집중형 봇넷은 C&C 서버의 도메인/IP를 차단하면 봇넷 전체를 무력화할 수 있는 반면, P2P 봇넷은 각 봇이 피어(Peer)로서 명령을 분산 중계하므로 단일 장애점(SPOF)이 없어 단일 C&C 차단만으로 완전 무력화가 어렵습니다. 따라서 단말 악성코드 제거, 이상 P2P 트래픽 탐지, IoC 기반 격리가 병행되어야 합니다.",
      difficulty: "MEDIUM",
      keywords: ["DDoS", "봇넷", "P2P", "C&C 서버"],
    },
    {
      id: "SEC_CMN_NET_021",
      category: "네트워크 공격 및 대응",
      question:
        "대규모 볼류메트릭(Volumetric) DDoS 공격이 조직의 인터넷 회선 대역폭(1Gbps)을 초과하는 50Gbps 규모로 유입되고 있다. 내부 방화벽만으로 방어하기 어려운 이유와 가장 실효성 있는 대응 방안은?",
      options: [
        "상위 회선이 먼저 포화되므로 ISP·스크러빙 센터로 우회해 정화한다.",
        "방화벽 CPU 부하 때문이므로 내부 서버마다 SYN Cookie만 추가 활성화한다.",
        "L7 페이로드 분석이 누락되므로 DMZ 구간 내부 방화벽 규칙 수만 늘린다.",
        "세션 테이블 한계 때문이므로 상태 기반 검사를 끄고 패킷 필터링만 켠다.",
      ],
      answer:
        "상위 회선이 먼저 포화되므로 ISP·스크러빙 센터로 우회해 정화한다.",
      explanation:
        "회선 용량을 초과하는 대역폭 소진형(Volumetric) DDoS는 사내 방화벽이나 IPS에 패킷이 닿기 전에 외부 인입 회선 자체가 포화됩니다. 따라서 상위 ISP의 블랙홀 라우팅/트래픽 정화 서비스나 클라우드 DDoS 방어(Scrubbing Center, KISA 사이버 대피소 등)로 트래픽을 우회(BGP/DNS 리다이렉션)해 정상 패킷만 전달받는 구조가 필요합니다.",
      difficulty: "MEDIUM",
      keywords: ["Volumetric DDoS", "스크러빙 센터", "대피소", "BGP 우회"],
    },
    {
      id: "SEC_CMN_NET_022",
      category: "네트워크 공격 및 대응",
      question:
        "DDoS 공격의 한 유형인 TCP 연결 고갈(Connection Exhaustion) 계열 공격과 대역폭 소진(Volumetric) 계열 공격을 바르게 분류한 것은?",
      options: [
        "연결 고갈: SYN Flooding·Slowloris / 대역폭 소진: UDP·증폭 공격",
        "연결 고갈: Smurf·Fraggle / 대역폭 소진: Slow HTTP POST·SYN Flooding",
        "연결 고갈: DNS 증폭·UDP Flooding / 대역폭 소진: Slowloris·CC 공격",
        "연결 고갈: Ping of Death·Land / 대역폭 소진: Slow HTTP Read·SYN Flooding",
      ],
      answer:
        "연결 고갈: SYN Flooding·Slowloris / 대역폭 소진: UDP·증폭 공격",
      explanation:
        "SYN Flooding(커널 Backlog 큐 소진)과 Slowloris(웹 서버 동시 연결 슬롯 소진)는 상대적으로 적은 트래픽으로도 서버·장비의 연결 상태 자원을 고갈시키는 공격입니다. 반면 UDP Flooding과 DNS/NTP/Smurf 증폭 공격은 막대한 패킷량으로 네트워크 회선 대역폭 자체를 포화시키는 Volumetric 공격에 해당합니다.",
      difficulty: "MEDIUM",
      keywords: ["DDoS 분류", "Volumetric", "연결 고갈", "SYN Flooding"],
    },
  ],
);

const net0102 = buildSecuritySectionQuestions(
  {
    sectionId: "SEC_SEC_NET_01_02",
    syllabusStandard: "2023_2026",
  },
  [
    {
      id: "SEC_CMN_NET_023",
      category: "스니핑·스푸핑·스캐닝 및 대응",
      question:
        "스위치(Switch) 기반 LAN 환경에서 공격자가 자신의 MAC 주소를 위조해 피해자 PC에는 '내가 게이트웨이'라고, 게이트웨이에는 '내가 피해자 PC'라고 위조된 ARP Reply를 지속적으로 전송하여 양방향 트래픽을 가로채는 공격과 핵심 징후는?",
      options: [
        "ARP 스푸핑 — `arp -a`에서 게이트웨이와 타 IP가 같은 MAC 매핑",
        "MAC Flooding — 스위치 CAM 테이블 초과로 전 포트 플러딩 발생",
        "ICMP Redirect — 피해자 호스트 라우팅 테이블의 기본 경로 변경",
        "DHCP 스푸핑 — 비인가 서버의 Offer 응답으로 DNS 주소 변조",
      ],
      answer:
        "ARP 스푸핑 — `arp -a`에서 게이트웨이와 타 IP가 같은 MAC 매핑",
      explanation:
        "ARP 프로토콜은 요청을 보내지 않아도 응답(Gratuitous ARP/ARP Reply)을 받으면 캐시를 무인증 갱신하는 취약점이 있습니다. ARP 스푸핑(ARP Poisoning)이 발생하면 피해자의 ARP 캐시(`arp -a`)에서 게이트웨이 IP의 MAC 주소가 공격자 IP의 MAC 주소와 중복 표시됩니다. 대응책은 정적 ARP(`arp -s`), 스위치의 DAI(Dynamic ARP Inspection) + DHCP Snooping, 통신 암호화입니다.",
      difficulty: "EASY",
      keywords: ["ARP 스푸핑", "ARP Poisoning", "arp -a", "DAI"],
    },
    {
      id: "SEC_CMN_NET_024",
      category: "스니핑·스푸핑·스캐닝 및 대응",
      question:
        "스위치 환경에서 공격자가 대량의 서로 다른 위조 출발지 MAC 주소 프레임을 전송하여 스위치의 MAC 주소 테이블(CAM Table) 용량을 가득 채운 뒤, 스위치가 미등록 목적지 프레임을 모든 포트로 플러딩(허브처럼 동작)하게 만들어 스니핑을 수행하는 공격과 예방 기술은?",
      options: [
        "스위치 재밍(MAC Flooding) — Port Security로 최대 MAC 수 제한",
        "ARP 스푸핑(ARP Poisoning) — 스위치 DAI로 ARP 응답 검증",
        "ICMP Redirect 공격 — 커널의 accept_redirects 비활성화",
        "DHCP 기아(Starvation) 공격 — 신뢰 포트 외 DHCP Offer 차단",
      ],
      answer:
        "스위치 재밍(MAC Flooding) — Port Security로 최대 MAC 수 제한",
      explanation:
        "스위치 재밍(MAC Flooding)은 L2 스위치의 CAM(Content Addressable Memory) 테이블을 고갈시켜 Fail-Open 플러딩 상태를 유도하는 능동 스니핑 기법입니다. 스위치의 Port Security 기능으로 각 포트에 학습 가능한 최대 MAC 주소 개수를 제한하고 위반 시 포트를 차단(Shutdown/Restrict)하여 예방합니다.",
      difficulty: "MEDIUM",
      keywords: ["Switch Jamming", "MAC Flooding", "CAM 테이블", "Port Security"],
    },
    {
      id: "SEC_CMN_NET_025",
      category: "스니핑·스푸핑·스캐닝 및 대응",
      question:
        "네트워크 인터페이스 카드(NIC)를 무차별 모드(Promiscuous Mode)로 전환하여 스니핑을 수행 중인 내부 호스트를 탐지하는 방법으로 적절하지 않은 것은?",
      options: [
        "스위치의 모든 포트를 미러링해 전체 브로드캐스트 트래픽을 증폭한다.",
        "Ping/ARP 테스트: 가짜 MAC 주소로 패킷을 보내 응답 여부를 확인한다.",
        "DNS 역조회 테스트: 가짜 트래픽에 대한 역방향 DNS 질의 발생을 감시한다.",
        "유인(Decoy) 테스트: 가짜 평문 계정을 흘린 뒤 실제 접속 시도를 감시한다.",
      ],
      answer:
        "스위치의 모든 포트를 미러링해 전체 브로드캐스트 트래픽을 증폭한다.",
      explanation:
        "무차별 모드(Promiscuous Mode) 스니퍼 탐지 기법에는 ① Ping/ARP 탐지(존재하지 않는 MAC으로 보낸 프레임에 OS 커널이 반응하는지 확인), ② DNS 탐지(스니퍼의 자동 IP→도메인 역조회 트래픽 감지), ③ 유인(Decoy) 탐지, ④ 로컬 명령(`ip link` / `ifconfig`의 PROMISC 플래그 확인)이 있습니다. 스위치 전체 포트를 복제·전달하면 오히려 스니핑이 쉬워질 뿐 탐지 방법이 아닙니다.",
      difficulty: "MEDIUM",
      keywords: ["Promiscuous Mode", "스니퍼 탐지", "ARP 테스트", "Decoy"],
    },
    {
      id: "SEC_CMN_NET_026",
      category: "스니핑·스푸핑·스캐닝 및 대응",
      question:
        "공격자가 호스트 B에 ICMP Redirect(Type 5) 패킷을 위조 전송하여 '특정 목적지로 가는 더 좋은 경로는 공격자(라우터 B)를 경유하는 것'이라고 속여 트래픽을 가로채는 공격과 이에 대한 예방 조치는?",
      options: [
        "ICMP Redirect — 호스트·라우터에서 `accept_redirects = 0` 설정",
        "Smurf 공격 — 라우터에서 `no ip directed-broadcast` 적용",
        "Land 공격 — 방화벽에서 출발지·목적지 동일 IP 패킷 차단",
        "Reverse Path 공격 — 경계 라우터에 uRPF 엄격 모드 활성화",
      ],
      answer:
        "ICMP Redirect — 호스트·라우터에서 `accept_redirects = 0` 설정",
      explanation:
        "ICMP Redirect(Type 5)는 원래 라우터가 호스트에게 더 효율적인 라우팅 경로를 알려주는 제어 메시지지만, 인증이 없어 공격자가 피해자 라우팅 테이블을 변조해 중간자(MITM) 스니핑을 수행하는 데 악용됩니다. 리눅스에서는 `net.ipv4.conf.all.accept_redirects = 0`으로 설정하고 방화벽에서 불필요한 ICMP Type 5를 차단해 예방합니다.",
      difficulty: "MEDIUM",
      keywords: ["ICMP Redirect", "Type 5", "MITM", "accept_redirects"],
    },
    {
      id: "SEC_CMN_NET_027",
      category: "스니핑·스푸핑·스캐닝 및 대응",
      question:
        "TCP 포트 스캐닝 기법 중 스텔스(Stealth) 스캔에 해당하는 FIN, Null, Xmas 스캔이 RFC 793 규격에 따라 대상 포트의 열림(Open)과 닫힘(Closed)을 판별하는 원리로 올바른 것은?",
      options: [
        "닫힌 포트는 RST/ACK로 응답하고, 열린·필터링 포트는 무응답이다.",
        "열린 포트는 SYN/ACK로 응답하고, 닫힌 포트는 아무 응답이 없다.",
        "열린 포트는 RST/ACK로 응답하고, 닫힌 포트는 ICMP Echo로 응답한다.",
        "닫힌 포트는 FIN/ACK로 응답하고, 열린 포트는 RST 패킷으로 응답한다.",
      ],
      answer:
        "닫힌 포트는 RST/ACK로 응답하고, 열린·필터링 포트는 무응답이다.",
      explanation:
        "FIN(FIN=1), Null(모든 플래그=0), Xmas(FIN·PSH·URG=1) 스캔은 RFC 793 기반 유닉스/리눅스 계열에서 닫힌 포트에 비정상 플래그 패킷이 오면 `RST`로 응답하고, 열린 포트에서는 무시(무응답)하는 특성을 이용합니다. 단, 윈도우 계열은 RFC 793과 다르게 열린 포트에도 RST를 반환할 수 있으며, 방화벽이 패킷을 드롭해도 무응답이므로 `open|filtered`로 판정됩니다.",
      difficulty: "MEDIUM",
      keywords: ["FIN 스캔", "Null 스캔", "Xmas 스캔", "RFC 793", "RST"],
    },
    {
      id: "SEC_CMN_NET_028",
      category: "스니핑·스푸핑·스캐닝 및 대응",
      question:
        "TCP 포트 스캐닝 중 'ACK 스캔(`nmap -sA`)'의 주된 목적과 응답 해석 방법으로 올바른 것은?",
      options: [
        "상태 기반 방화벽 필터링 여부 파악 — RST 시 비필터링(Unfiltered)",
        "열린 서비스 배너·버전 수집 — SYN/ACK 수신 시 열림(Open) 판정",
        "세션 없이 포트 열림 확정 — 무응답 시 무조건 열린 포트(Open)로 확정",
        "ICMP Echo 기반 생존 탐지 — TTL 감소값만으로 방화벽 규칙 복원",
      ],
      answer:
        "상태 기반 방화벽 필터링 여부 파악 — RST 시 비필터링(Unfiltered)",
      explanation:
        "ACK 스캔은 기존 세션 없이 ACK 플래그만 설정된 패킷을 보냅니다. 단순 패킷 필터링 방화벽을 통과하거나 호스트에 직접 도달하면 열린/닫힌 포트 구분 없이 호스트가 `RST`를 반환(Unfiltered)하지만, 상태 기반(Stateful) 방화벽은 세션 테이블에 없는 ACK를 차단하므로 무응답 또는 ICMP Unreachable(Filtered)이 됩니다.",
      difficulty: "HARD",
      keywords: ["ACK 스캔", "Stateful 방화벽", "Filtered", "Unfiltered"],
    },
    {
      id: "SEC_CMN_NET_029",
      category: "스니핑·스푸핑·스캐닝 및 대응",
      question:
        "공격자가 자신의 실제 IP 주소를 숨기고 포트 스캔을 수행하기 위해, 트래픽이 거의 없고 예측 가능한 IP ID 증가 패턴을 가진 제3의 유휴 호스트(Zombie)를 경유하여 대상 호스트의 포트 열림 여부를 파악하는 스캔 기법은?",
      options: [
        "Idle / Zombie 스캔 (`nmap -sI`)",
        "TCP Connect 스캔 (`nmap -sT`)",
        "TCP SYN 스텔스 스캔 (`nmap -sS`)",
        "TCP ACK 방화벽 스캔 (`nmap -sA`)",
      ],
      answer: "Idle / Zombie 스캔 (`nmap -sI`)",
      explanation:
        "Idle 스캔은 공격자가 좀비 호스트의 IP ID를 조회한 뒤, 출발지 IP를 좀비로 위조해 타깃에 SYN을 보냅니다. 타깃 포트가 열려 있으면 타깃이 좀비에게 SYN/ACK를 보내고 좀비가 RST를 응답하며 좀비의 IP ID가 2 증가합니다(닫혀 있으면 1 증가). 공격자의 IP가 타깃 로그에 전혀 남지 않는 고도의 은닉 스캔입니다.",
      difficulty: "HARD",
      keywords: ["Idle 스캔", "Zombie Scan", "IP ID", "스텔스 스캔"],
    },
    {
      id: "SEC_CMN_NET_030",
      category: "스니핑·스푸핑·스캐닝 및 대응",
      question:
        "TCP 세션 하이재킹(TCP Session Hijacking) 공격에서 공격자가 인증이 완료된 정상 클라이언트와 서버 간의 TCP 세션을 가로채기 위해 알아내야 하는 핵심 값과 예방 대책으로 바르게 짝지어진 것은?",
      options: [
        "TCP 시퀀스·확인 응답 번호 — 암호화(SSH·TLS) 및 난수 ISN",
        "TCP 수신 윈도우 크기 — 동적 ARP 검사(DAI) 및 포트 차단",
        "IP 단편화 오프셋 값 — 라우터 Directed Broadcast 비활성화",
        "ICMP Echo 식별자 — 스위치 Port Security 최대 MAC 제한",
      ],
      answer:
        "TCP 시퀀스·확인 응답 번호 — 암호화(SSH·TLS) 및 난수 ISN",
      explanation:
        "TCP 세션 하이재킹은 Telnet·FTP 같은 평문 TCP 세션에 공격자가 ARP 스푸핑 등으로 끼어들어 시퀀스/확인 번호(Sequence/Acknowledge Number)를 동기화하고, 클라이언트에게 RST를 보내거나 비동기화(Desynchronization)시켜 세션을 탈취하는 공격입니다. SSH·TLS·IPSec 같은 암호화 및 무결성 인증 프로토콜 사용과 예측 불가능한 난수 ISN 적용이 근본 대책입니다.",
      difficulty: "MEDIUM",
      keywords: ["TCP 세션 하이재킹", "시퀀스 번호", "ISN", "SSH"],
    },
    {
      id: "SEC_CMN_NET_031",
      category: "스니핑·스푸핑·스캐닝 및 대응",
      question:
        "IP 스푸핑(IP Spoofing)을 악용한 신뢰 관계(예: 과거 `rlogin`/`rsh`의 `.rhosts`) 기반 원격 접속 침입이나 반사 공격을 네트워크 계층에서 예방하기 위한 라우터·방화벽 필터링 기법은?",
      options: [
        "Ingress/Egress 필터링(BCP 38)과 uRPF 역경로 검증 적용",
        "NAT 주소 변환 비활성화 및 모든 TCP 포트 443 포워딩",
        "스위치 CAM 테이블 노화(Aging) 시간 단축 및 허브 모드 전환",
        "ICMP Redirect(Type 5) 패킷 전면 허용 및 정적 ARP 해제",
      ],
      answer:
        "Ingress/Egress 필터링(BCP 38)과 uRPF 역경로 검증 적용",
      explanation:
        "Ingress 필터링(외부에서 내부 사설/자사 IP를 사칭해 들어오는 패킷 차단), Egress 필터링(내부에서 자사 대역이 아닌 위조 IP로 나가는 패킷 차단), 그리고 라우팅 테이블 역경로를 검증하는 uRPF(Unicast Reverse Path Forwarding)가 IP 스푸핑의 핵심 네트워크 방어 수단입니다.",
      difficulty: "MEDIUM",
      keywords: ["IP 스푸핑", "Ingress 필터링", "Egress 필터링", "uRPF"],
    },
    {
      id: "SEC_CMN_NET_032",
      category: "스니핑·스푸핑·스캐닝 및 대응",
      question:
        "스니핑(Sniffing) 공격에 노출된 공용 무선랜이나 공유 네트워크 환경에서도 공격자가 패킷을 가로채더라도 로그인 비밀번호와 업무 데이터 내용을 해독하지 못하도록 보호하는 가장 근본적인 대책은?",
      options: [
        "TLS/HTTPS·SSH·IPSec 등 전송 구간 암호화 적용",
        "무선 공유기 SSID 브로드캐스트 숨김(Hide SSID) 설정",
        "방화벽에서 ICMP Echo 요청 및 응답 패킷 일괄 차단",
        "스위치 포트의 MAC 주소 필터링(화이트리스트) 단독 운영",
      ],
      answer: "TLS/HTTPS·SSH·IPSec 등 전송 구간 암호화 적용",
      explanation:
        "스니핑은 패킷을 수동·능동적으로 도청하는 공격이므로 네트워크 물리 경계를 완전히 통제할 수 없는 환경에서는 전송 계층·네트워크 계층 암호화(TLS 1.3, SSH, SFTP, IPSec VPN 등)를 적용해 도청되더라도 기밀성과 무결성이 보호되도록 하는 것이 가장 근본적인 대책입니다. SSID 숨김과 MAC 필터링은 스니핑으로 쉽게 우회됩니다.",
      difficulty: "EASY",
      keywords: ["스니핑 대응", "암호화 통신", "TLS", "SSH", "VPN"],
    },
    {
      id: "SEC_CMN_NET_033",
      category: "스니핑·스푸핑·스캐닝 및 대응",
      question:
        "내부 네트워크에 비인가 DHCP 서버를 설치해 피해자 PC에 공격자 IP를 기본 게이트웨이 및 DNS 서버로 할당함으로써 모든 트래픽을 가로채는 공격(DHCP 스푸핑/Rogue DHCP)과 이를 차단하는 스위치 보안 기능은?",
      options: [
        "DHCP Snooping — 인가 포트만 Trusted로 두고 비신뢰 Offer 차단",
        "Port Mirroring — 모든 포트의 DHCP 트래픽을 관제 포트로 복제",
        "Static ARP — 게이트웨이 IP·MAC 쌍을 클라이언트 로컬에 수동 등록",
        "ICMP Redirect 차단 — 비인가 라우터의 경로 변경 메시지 수신 거부",
      ],
      answer:
        "DHCP Snooping — 인가 포트만 Trusted로 두고 비신뢰 Offer 차단",
      explanation:
        "DHCP Snooping은 스위치에서 신뢰(Trusted) 포트와 비신뢰(Untrusted) 포트를 구분해 비인가 DHCP 서버의 응답(Offer/ACK)을 차단하고, 정상 할당된 IP-MAC-포트 바인딩 테이블을 구축합니다. 이 바인딩 테이블은 DAI(ARP 스푸핑 차단)와 IP Source Guard(IP 스푸핑 차단)의 기반 데이터로도 활용됩니다.",
      difficulty: "MEDIUM",
      keywords: ["DHCP Snooping", "Rogue DHCP", "DAI", "스위치 보안"],
    },
    {
      id: "SEC_CMN_NET_034",
      category: "스니핑·스푸핑·스캐닝 및 대응",
      question:
        "원격 접속 보안 점검 결과, 사내 서버에 평문 통신 프로토콜인 Telnet(TCP 23)과 R-command(`rlogin`, `rsh`, `rexec`) 서비스가 열려 있었다. 이를 악용한 위협과 올바른 조치 방안은?",
      options: [
        "평문 스니핑 및 `.rhosts` 침입 위험 — 데몬 중지 후 SSH 전환",
        "브로드캐스트 증폭 DoS 위험 — Telnet 포트를 2323으로 변경",
        "IP 단편화 재조합 오류 — `.rhosts` 권한을 644로 넓혀 공유 허용",
        "TCP 시퀀스 예측 공격만 존재 — R-command는 내부망 예외로 유지",
      ],
      answer:
        "평문 스니핑 및 `.rhosts` 침입 위험 — 데몬 중지 후 SSH 전환",
      explanation:
        "Telnet과 `rlogin`/`rsh`/`rexec`은 자격 증명과 세션 전체가 평문으로 전송되며, 특히 `.rhosts`/`/etc/hosts.equiv`에 `+` 설정이 있으면 인증 없이 원격 접속이 허용되는 치명적 취약점이 있습니다. 해당 서비스를 비활성화하고 암호화 원격 접속(SSH v2, 공개키 인증 권장)으로 전환해야 합니다.",
      difficulty: "EASY",
      keywords: ["원격접속 공격", "Telnet", "rlogin", ".rhosts", "SSH"],
    },
    {
      id: "SEC_CMN_NET_035",
      category: "스니핑·스푸핑·스캐닝 및 대응",
      question:
        "TCP/IP 스캔 방어 및 탐지 관점에서, 공격자의 포트 스캐닝 징후가 보안 관제(IDS/방화벽 로그)에서 포착되었을 때의 대표적 패턴과 대응 조치로 가장 적절한 것은?",
      options: [
        "단시간 다수 포트·호스트 SYN/FIN 탐색 — 스캔 임계 차단 및 배너 은닉",
        "단일 호스트가 443 포트로 장시간 HTTPS 유지 — 443번 포트 전면 차단",
        "정상 3-Way Handshake 후 DNS 재귀 응답 — 모든 TCP SYN 패킷 거부",
        "사내 NTP 서버와의 1일 1회 UDP 동기화 — NTP 데몬 중지 및 포트 폐쇄",
      ],
      answer:
        "단시간 다수 포트·호스트 SYN/FIN 탐색 — 스캔 임계 차단 및 배너 은닉",
      explanation:
        "포트 스캐닝은 본격적 침투 전 정찰(Reconnaissance) 단계로, 짧은 시간 내 다수 포트 접근(수직 스캔)이나 다수 IP의 동일 포트 탐색(수평 스캔), 비정상 플래그 조합이 핵심 징후입니다. IPS/방화벽의 스캔 탐지(Port Scan Detection) 임계치 차단 적용, 불필요한 서비스 포트 폐쇄, 배너 정보 최소화로 공격자의 정보 수집을 방어해야 합니다.",
      difficulty: "EASY",
      keywords: ["포트 스캐닝 징후", "수직 스캔", "수평 스캔", "배너 숨김"],
    },
  ],
);

const net0201 = buildSecuritySectionQuestions(
  {
    sectionId: "SEC_SEC_NET_02_01",
    syllabusStandard: "2023_2026",
  },
  [
    {
      id: "SEC_CMN_NET_036",
      category: "네트워크 보안 장비 및 탐지·차단",
      question:
        "방화벽(Firewall) 유형 중 '패킷 필터링(Stateless)', '상태 기반 검사(Stateful Inspection)', '애플리케이션 게이트웨이(Proxy)' 방화벽을 성능과 보안 깊이 관점에서 바르게 비교한 것은?",
      options: [
        "필터링은 L3/L4 고속 검사, 상태 기반은 세션 추적, 프록시는 L7 심층 검사",
        "필터링은 L7 페이로드 검사, 상태 기반은 L2 MAC 검사, 프록시는 최저 지연",
        "상태 기반은 세션 상태를 저장 않고 독립 판별하며, 프록시는 L3 헤더만 검사",
        "프록시 방화벽이 L3/L4 헤더만 단순 대조하므로 처리 속도가 세 유형 중 가장 빠름",
      ],
      answer:
        "필터링은 L3/L4 고속 검사, 상태 기반은 세션 추적, 프록시는 L7 심층 검사",
      explanation:
        "방화벽 세대별 비교는 핵심 출제 영역입니다. ① 패킷 필터링(Stateless): L3/L4 IP·포트 기반, 빠름, 세션 문맥·L7 검사 불가, ② 서킷 게이트웨이: L4/L5 연결 중계, ③ 상태 기반 검사(Stateful): 상태 테이블로 응답 패킷 동적 허용 및 위조 ACK 차단, ④ 애플리케이션 게이트웨이(Proxy): L7 내용 검사·내부 IP 은닉·높은 보안성·지연/오버헤드 큼.",
      difficulty: "EASY",
      keywords: ["방화벽 유형", "패킷 필터링", "Stateful Inspection", "애플리케이션 게이트웨이"],
    },
    {
      id: "SEC_CMN_NET_037",
      category: "네트워크 보안 장비 및 탐지·차단",
      question:
        "외부 인터넷에 공개해야 하는 웹 서버·메일 서버·DNS 서버를 내부 업무망과 직접 연결하지 않고 별도의 완충 구역에 배치하여, 공개 서버가 침해되더라도 내부 업무망으로의 직접 침투를 차단하는 네트워크 구성 구조는?",
      options: [
        "DMZ (Screened Subnet 완충망)",
        "NAC 격리 VLAN (Quarantine Zone)",
        "Bastion 루프백 관리 세그먼트",
        "내부 신뢰 망 (Trusted Intranet)",
      ],
      answer: "DMZ (Screened Subnet 완충망)",
      explanation:
        "DMZ(Demilitarized Zone, 비무장지대/완충지대)는 외부망(Untrusted)과 내부 업무망(Trusted) 사이에 두어 외부 공개 서비스(Web, DNS, SMTP Relay 등)를 격리 배치하는 아키텍처입니다. 주로 Screened Subnet(외부 방화벽 + DMZ + 내부 방화벽) 구조로 구성하며, DMZ에서 내부망으로의 직접 접속은 원칙적으로 차단합니다.",
      difficulty: "EASY",
      keywords: ["DMZ", "Screened Subnet", "방화벽 아키텍처"],
    },
    {
      id: "SEC_CMN_NET_038",
      category: "네트워크 보안 장비 및 탐지·차단",
      question:
        "침입 탐지 시스템(IDS)의 탐지 오류 지표인 '오탐(False Positive)'과 '미탐(False Negative)'의 의미 및 보안 관제 관점의 위험성을 바르게 설명한 것은?",
      options: [
        "오탐은 정상을 공격 오판하고, 미탐은 공격을 놓쳐 침해 관점에서 더 치명적이다.",
        "오탐은 실제 공격을 놓치고, 미탐은 정상을 오판해 관제 경보 피로를 유발한다.",
        "미탐이 높을수록 실제 공격 차단율이 높아지므로 오탐을 0으로 줄여야 안전하다.",
        "오탐을 낮추려 탐지 기준을 완화해도 미탐률에는 서로 상충 영향이 전혀 없다.",
      ],
      answer:
        "오탐은 정상을 공격 오판하고, 미탐은 공격을 놓쳐 침해 관점에서 더 치명적이다.",
      explanation:
        "IDS/IPS 4분면 지표는 ① 정탐(TP: 공격→공격 탐지), ② 정상 통과(TN: 정상→정상), ③ 오탐(FP: 정상→공격 오판, 관제 피로도 및 IPS 오차단 유발), ④ 미탐(FN: 공격→정상 통과, 실제 침해사고 발생으로 침해 관점 가장 치명적)입니다. 오탐과 미탐은 상충(Trade-off) 관계이므로 지속적인 룰 튜닝이 필요합니다.",
      difficulty: "EASY",
      keywords: ["IDS", "오탐", "미탐", "False Positive", "False Negative"],
    },
    {
      id: "SEC_CMN_NET_039",
      category: "네트워크 보안 장비 및 탐지·차단",
      question:
        "침입 탐지 시스템(IDS)의 '오용 탐지(Misuse / Signature Detection)'와 '이상 탐지(Anomaly Detection)'를 비교한 설명으로 올바른 것은?",
      options: [
        "오용은 오탐이 적으나 제로데이에 약하고, 이상은 신종을 탐지하나 오탐이 높다.",
        "오용은 신종 제로데이 탐지에 강하고, 이상은 알려진 시그니처 일치만 탐지한다.",
        "오용과 이상 모두 시그니처 DB를 써서 학습 없이도 오탐이 항상 0에 가깝다.",
        "오용 탐지는 HIDS 전용 기법이고, 이상 탐지는 NIDS에서만 구현 가능한 기법이다.",
      ],
      answer:
        "오용은 오탐이 적으나 제로데이에 약하고, 이상은 신종을 탐지하나 오탐이 높다.",
      explanation:
        "오용(지식/시그니처) 탐지는 알려진 공격 패턴과 비교해 정확도가 높고 오탐이 적으나 패턴 DB 지속 갱신이 필요하며 미지의(Zero-day) 공격에 취약합니다. 이상(행위/통계/AI) 탐지는 정상 기준선(Baseline) 이탈을 감지해 미지의·변종 공격 탐지에 강점이 있으나 정상 행위 변화에 따른 오탐(FP)이 높은 편입니다.",
      difficulty: "EASY",
      keywords: ["IDS", "오용 탐지", "이상 탐지", "시그니처", "제로데이"],
    },
    {
      id: "SEC_CMN_NET_040",
      category: "네트워크 보안 장비 및 탐지·차단",
      question:
        "네트워크 기반 IDS(NIDS)와 호스트 기반 IDS(HIDS)의 특성을 바르게 비교한 것은?",
      options: [
        "NIDS는 구간 미러링으로 암호화 분석에 약하고, HIDS는 복호화 후 행위를 감시한다.",
        "NIDS는 개별 호스트 시스템 콜을 직접 후킹하고, HIDS는 TAP 미러링만 감시한다.",
        "NIDS는 대상 서버 CPU 부하가 매우 크고, HIDS는 대상 호스트 OS에 전혀 무관하다.",
        "NIDS는 TLS 1.3 암호화 페이로드를 키 없이도 내부 로그보다 정밀하게 복호화한다.",
      ],
      answer:
        "NIDS는 구간 미러링으로 암호화 분석에 약하고, HIDS는 복호화 후 행위를 감시한다.",
      explanation:
        "NIDS는 네트워크 세그먼트 전체를 미러링(TAP/SPAN)해 감시하며 대상 호스트 성능 부하가 없고 OS 독립적이지만, 대용량 트래픽·암호화 트래픽·로컬 침입 탐지에 한계가 있습니다. HIDS는 호스트 내부에서 OS 로그·파일 무결성·시스템 콜을 정밀 감시해 암호화 통신 복호화 후 행위까지 확인하나 호스트별 자원 소모와 관리 부담이 따릅니다.",
      difficulty: "MEDIUM",
      keywords: ["NIDS", "HIDS", "TAP", "SPAN", "암호화 트래픽"],
    },
    {
      id: "SEC_CMN_NET_041",
      category: "네트워크 보안 장비 및 탐지·차단",
      question:
        "침입 방지 시스템(IPS)을 네트워크 경로에 인라인(In-line) 배치할 때, IPS 장비 자체의 하드웨어 장애나 전원 차단 발생 시 전체 네트워크 통신이 마비되는 단일 장애점(SPOF) 위험을 줄이기 위해 지원하는 가용성 기능은?",
      options: [
        "Bypass(Fail-Open) 및 이중화(HA)",
        "Port Mirroring(SPAN 복제 구성)",
        "Promiscuous Mode(무차별 수신)",
        "Split Tunneling(VPN 분할 터널)",
      ],
      answer: "Bypass(Fail-Open) 및 이중화(HA)",
      explanation:
        "IDS는 미러링(Out-of-Band) 배치로 장비 장애 시에도 네트워크 통신이 끊기지 않지만, IPS는 실제 패킷 경로 중간에 인라인(In-line) 배치되므로 장비 장애 시 통신 단절 위험이 있습니다. 이를 대비해 물리적 링크를 직결 우회시키는 하드웨어 Bypass(Fail-Open) 기능과 Active-Standby/Active-Active 이중화(HA)를 구성합니다.",
      difficulty: "MEDIUM",
      keywords: ["IPS", "인라인 배치", "Bypass", "Fail-Open", "HA"],
    },
    {
      id: "SEC_CMN_NET_042",
      category: "네트워크 보안 장비 및 탐지·차단",
      question:
        "네트워크 보안 장비 중 NAC(Network Access Control), UTM(Unified Threat Management), WAF(Web Application Firewall), SIEM의 핵심 역할을 바르게 연결한 것은?",
      options: [
        "NAC: 단말 무결성 검증 / UTM: 통합 보안 / WAF: 웹 방어 / SIEM: 로그 상관 분석",
        "NAC: 웹 SQLi 차단 / UTM: 로그 상관 분석 / WAF: 단말 백신 점검 / SIEM: 통합 방화벽",
        "NAC: L7 웹 프록시 / UTM: L2 스위치 인증 / WAF: 통합 로그 저장 / SIEM: VPN 종단",
        "NAC: IDS 시그니처 배포 / UTM: 파일 무결성 감시 / WAF: ARP 차단 / SIEM: DNS 캐시",
      ],
      answer:
        "NAC: 단말 무결성 검증 / UTM: 통합 보안 / WAF: 웹 방어 / SIEM: 로그 상관 분석",
      explanation:
        "각 보안 솔루션의 목적 구분은 필수입니다. NAC는 단말의 사내망 진입 시 인증·보안 정책 준수(백신 최신화, OS 패치 등)를 점검해 미준수 단말을 격리 VLAN으로 보냅니다. UTM은 방화벽·IPS·VPN·AV 통합 장비, WAF는 HTTP/HTTPS 웹 공격(SQLi·XSS) 특화 차단, SIEM은 이기종 보안 로그 통합 수집·상관 분석 플랫폼입니다.",
      difficulty: "EASY",
      keywords: ["NAC", "UTM", "WAF", "SIEM", "보안 솔루션"],
    },
    {
      id: "SEC_CMN_NET_043",
      category: "네트워크 보안 장비 및 탐지·차단",
      question:
        "오픈소스 NIDS/IPS인 Snort 규칙 `alert tcp $EXTERNAL_NET any -> $HOME_NET 80 (msg:\"SQLi Attempt\"; content:\"UNION SELECT\"; nocase; sid:1000001; rev:1;)`의 각 구성 요소에 대한 해석으로 올바르지 않은 것은?",
      options: [
        "`alert`는 일치하는 패킷을 즉시 폐기(Drop)하고 경고 로그를 남기지 않는 동작이다.",
        "`$EXTERNAL_NET any -> $HOME_NET 80`은 외부망 임의 포트에서 내부망 80번 포트로 향하는 방향을 지정한다.",
        "`content:\"UNION SELECT\"; nocase;`는 페이로드에서 대소문자 구분 없이 해당 문자열을 탐지한다.",
        "`sid:1000001; rev:1;`은 사용자 정의 규칙의 고유 식별 번호와 개정 버전을 나타낸다.",
      ],
      answer:
        "`alert`는 일치하는 패킷을 즉시 폐기(Drop)하고 경고 로그를 남기지 않는 동작이다.",
      explanation:
        "Snort 규칙 액션에서 `alert`는 경고를 생성하고 패킷을 로깅하는 탐지 동작이며, 인라인 IPS 모드에서 패킷을 폐기하면서 로깅하는 액션은 `drop`(로그 없이 폐기는 `sdrop`, 차단+RST 응답은 `reject`)입니다. `sid` 1,000,000 이상은 사용자 정의 규칙 번호 영역입니다.",
      difficulty: "MEDIUM",
      keywords: ["Snort", "IDS 규칙", "alert", "drop", "nocase"],
    },
    {
      id: "SEC_CMN_NET_044",
      category: "네트워크 보안 장비 및 탐지·차단",
      question:
        "방화벽 정책(ACL) 설정 시 가장 기본적이고 중요한 보안 원칙인 '화이트리스트 기반 기본 거부(Default Deny)' 정책을 바르게 설명한 것은?",
      options: [
        "필수 허용 규칙을 상단에 두고 최하단에 전체 거부(Deny Any)를 배치한다.",
        "전체 허용(Allow Any)을 상단에 두고 사고가 발생한 IP만 하단에 추가한다.",
        "전체 거부(Deny Any)를 최상단에 두고 예외 허용 규칙을 그 아래에 배치한다.",
        "허용·거부 규칙 배치 순서와 무관하게 가장 좁은 범위 규칙을 자동 우선한다.",
      ],
      answer:
        "필수 허용 규칙을 상단에 두고 최하단에 전체 거부(Deny Any)를 배치한다.",
      explanation:
        "방화벽 규칙은 위에서 아래로 순차 평가되어 처음 일치(First Match)하는 규칙이 적용됩니다. 따라서 구체적인 필수 허용 규칙을 위쪽에 두고 맨 마지막에 묵시적/명시적 전체 거부(`Deny Any Any`)를 두는 Default Deny(화이트리스트) 원칙을 지켜야 합니다. 최상단에 `Deny Any Any`를 두면 아래 허용 규칙이 영원히 도달하지 못하는 그림자 규칙(Shadow Rule)이 됩니다.",
      difficulty: "EASY",
      keywords: ["방화벽 정책", "Default Deny", "First Match", "화이트리스트"],
    },
    {
      id: "SEC_CMN_NET_045",
      category: "네트워크 보안 장비 및 탐지·차단",
      question:
        "외부 공격자를 실제 운영 서버 대신 의도적으로 취약하게 꾸며 놓은 가짜 시스템이나 가짜 네트워크로 유인하여, 공격자의 침입 기법·도구·행동 패턴을 수집하고 실제 자산으로부터 주의를 분산시키는 능동 방어 기술은?",
      options: [
        "허니팟 / 허니넷 (유인 시스템)",
        "스크린드 서브넷 (DMZ 완충 구간)",
        "스테이트풀 방화벽 (세션 감시)",
        "샌드박스 게이트웨이 (단방향 프록시)",
      ],
      answer: "허니팟 / 허니넷 (유인 시스템)",
      explanation:
        "허니팟(단일 유인 시스템)과 허니넷(여러 허니팟으로 구성된 유인 네트워크)은 정상 사용자가 접근할 이유가 없으므로 접속 자체가 악성 행위 징후로 간주되어 오탐이 극히 낮고, 신종 공격 기법·악성코드 샘플을 수집하는 데 유용합니다. 단, 허니팟이 공격의 경유지(피봇)로 역이용되지 않도록 엄격한 아웃바운드 격리가 필요합니다.",
      difficulty: "EASY",
      keywords: ["허니팟", "허니넷", "Honeypot", "유인 시스템"],
    },
    {
      id: "SEC_CMN_NET_046",
      category: "네트워크 보안 장비 및 탐지·차단",
      question:
        "IP 스푸핑 등을 이용해 실제 출처를 숨긴 공격자의 근원지를 추적하기 위한 '역추적(IP Traceback)' 기술 중, 능동적(Active) 방식과 수동적(Passive) 방식에 대한 설명으로 올바른 것은?",
      options: [
        "수동은 PPM·iTrace·로그 해시로, 능동은 링크 테스트·유도 트래픽으로 추적한다.",
        "수동은 역공격 패킷을 발송하고, 능동은 라우터 해시 로그(SPIE)만 사후 조회한다.",
        "PPM은 패킷을 수정 않고 로그만 남기며, iTrace는 모든 공격 패킷을 즉시 폐기한다.",
        "역추적 기법은 출발지 IP 위조가 없는 정상 TCP 연결에만 적용 가능한 감사 기술이다.",
      ],
      answer:
        "수동은 PPM·iTrace·로그 해시로, 능동은 링크 테스트·유도 트래픽으로 추적한다.",
      explanation:
        "네트워크 역추적 기술 중 수동적 방식에는 라우터 경유 패킷 IP 헤더에 확률적으로 경로를 마킹하는 PPM(Probabilistic Packet Marking), 별도 추적 메시지를 보내는 ICMP Traceback(iTrace), 라우터에 패킷 다이제스트를 저장하는 Hash-based Traceback(SPIE) 등이 있으며, 능동적 방식은 공격 중 경로를 시험하는 링크 테스트(Link Testing)·로깅 유인 등을 활용합니다.",
      difficulty: "HARD",
      keywords: ["역추적", "IP Traceback", "PPM", "iTrace"],
    },
    {
      id: "SEC_CMN_NET_047",
      category: "네트워크 보안 장비 및 탐지·차단",
      question:
        "차세대 방화벽(NGFW, Next-Generation Firewall)이 전통적 상태 기반(Stateful) 방화벽과 구별되는 대표적 기능 조합으로 가장 적절한 것은?",
      options: [
        "DPI 앱 식별·사용자 ID 기반 정책·통합 IPS·TLS 복호화 검사",
        "IP 주소와 TCP/UDP 4계층 포트 번호 기반의 단순 상태 테이블 추적",
        "외부 공격자를 가짜 시스템으로 유인하는 허니넷 트래픽 격리 기능",
        "스위치 L2 포트의 MAC 주소 학습 수 제한 및 DHCP Offer 차단",
      ],
      answer:
        "DPI 앱 식별·사용자 ID 기반 정책·통합 IPS·TLS 복호화 검사",
      explanation:
        "전통적 방화벽은 포트 기반(예: 443 허용)으로만 통제해 HTTPS로 터널링된 비인가 앱·공격을 구분하기 어려웠습니다. NGFW는 심층 패킷 검사(DPI)로 포트와 무관하게 실제 애플리케이션을 식별·제어하고, AD/LDAP 연동 사용자별 정책, 통합 IPS, SSL/TLS 가시성 검사를 함께 제공합니다.",
      difficulty: "EASY",
      keywords: ["NGFW", "차세대 방화벽", "DPI", "SSL 복호화"],
    },
  ],
);

const net0202 = buildSecuritySectionQuestions(
  {
    sectionId: "SEC_SEC_NET_02_02",
    syllabusStandard: "2023_2026",
  },
  [
    {
      id: "SEC_CMN_NET_048",
      category: "네트워크 보안 프로토콜",
      question:
        "IPSec 프로토콜 구성 요소 중 AH(Authentication Header)와 ESP(Encapsulating Security Payload)가 제공하는 보안 서비스의 차이점으로 올바른 것은?",
      options: [
        "AH는 무결성·인증만 제공하고, ESP는 기밀성(암호화)과 선택적 인증을 제공한다.",
        "AH는 기밀성(암호화)만 제공하고, ESP는 무결성·발신지 인증 기능만 제공한다.",
        "AH는 IP 페이로드와 헤더를 암호화하고, ESP는 암호화 없이 인증만 수행한다.",
        "AH는 L7 응용 계층에서, ESP는 L2 데이터링크 계층에서 각각 캡슐화 동작한다.",
      ],
      answer:
        "AH는 무결성·인증만 제공하고, ESP는 기밀성(암호화)과 선택적 인증을 제공한다.",
      explanation:
        "IPSec은 네트워크 계층(L3) 보안 프로토콜입니다. AH(IP 프로토콜 번호 51)는 IP 헤더 불변 필드까지 인증·무결성 보호 및 재전송 방지를 수행하지만 암호화(기밀성)가 없고 NAT 통과(NAT-T)와 충돌합니다. ESP(IP 프로토콜 번호 50)는 페이로드(터널 모드 시 원본 IP 헤더 포함) 암호화를 제공하며 인증·무결성·재전송 방지도 함께 지원해 실무 VPN에서 가장 널리 쓰입니다.",
      difficulty: "EASY",
      keywords: ["IPSec", "AH", "ESP", "기밀성", "무결성"],
    },
    {
      id: "SEC_CMN_NET_049",
      category: "네트워크 보안 프로토콜",
      question:
        "IPSec의 전송 모드(Transport Mode)와 터널 모드(Tunnel Mode)를 적용 대상 및 보호 범위 관점에서 바르게 비교한 것은?",
      options: [
        "전송은 종단 간 페이로드만, 터널은 게이트웨이 간 원 IP 헤더까지 캡슐화한다.",
        "전송은 게이트웨이 간 원 IP 헤더를 감추고, 터널은 종단 간 페이로드만 보호한다.",
        "전송 모드는 ESP 프로토콜만 지원하며, 터널 모드는 AH 프로토콜로만 동작한다.",
        "전송·터널 모드 모두 새 외부 IP 헤더를 추가하므로 패킷 오버헤드가 동일하다.",
      ],
      answer:
        "전송은 종단 간 페이로드만, 터널은 게이트웨이 간 원 IP 헤더까지 캡슐화한다.",
      explanation:
        "전송 모드(Transport Mode)는 두 호스트 간(End-to-End) 직접 통신에서 상위 계층 페이로드만 보호해 오버헤드가 적지만 출발지/목적지 IP 주소가 노출됩니다. 터널 모드(Tunnel Mode)는 사이트 간(Site-to-Site) VPN 등에서 원본 IP 패킷 전체를 암호화·캡슐화해 새 외부 IP 헤더를 부여하므로 사설망 연결과 트래픽 분석 방어에 적합합니다.",
      difficulty: "EASY",
      keywords: ["IPSec", "전송 모드", "터널 모드", "VPN"],
    },
    {
      id: "SEC_CMN_NET_050",
      category: "네트워크 보안 프로토콜",
      question:
        "IPSec에서 통신 당사자 간에 사용할 암호 알고리즘, 인증 키, 수명 등의 보안 매개변수 집합을 무엇이라 하며, 이를 동적으로 협상·관리하는 키 교환 프로토콜은?",
      options: [
        "SA (보안 연관) — IKE 키 교환",
        "SPI (매개변수 인덱스) — AH 인증",
        "SPD (보안 정책 DB) — ESP 캡슐화",
        "SAD (보안 연관 DB) — NAT-T 통과",
      ],
      answer: "SA (보안 연관) — IKE 키 교환",
      explanation:
        "IPSec의 SA(Security Association, 보안 연관)는 단방향 논리적 연결로 SPI(Security Parameter Index), 목적지 IP, 보안 프로토콜(AH/ESP) 3요소로 유일하게 식별되며 SAD에 저장됩니다. 이 SA와 세션 키를 안전하게 자동 협상·생성하는 프로토콜이 IKE(Internet Key Exchange, UDP 500/4500)입니다.",
      difficulty: "MEDIUM",
      keywords: ["IPSec", "SA", "SPI", "IKE"],
    },
    {
      id: "SEC_CMN_NET_051",
      category: "네트워크 보안 프로토콜",
      question:
        "IPSec VPN과 SSL/TLS VPN의 운용상 특징을 바르게 비교한 것은?",
      options: [
        "IPSec은 L3 전 트래픽에 유리하고, SSL은 TCP 443으로 방화벽 통과가 쉽다.",
        "SSL은 L2 데이터링크에서 동작하고, IPSec은 TCP 443 포트로 브라우저에 접속한다.",
        "IPSec은 별도 클라이언트 없이 웹으로 동작하고, SSL은 전용 L3 터널만 지원한다.",
        "SSL은 NAT 환경 통과가 어렵고, IPSec은 모든 L3/L4 방화벽을 제약 없이 통과한다.",
      ],
      answer:
        "IPSec은 L3 전 트래픽에 유리하고, SSL은 TCP 443으로 방화벽 통과가 쉽다.",
      explanation:
        "IPSec VPN은 네트워크 계층(L3) 기반이라 본사-지사(Site-to-Site) 전 IP 프로토콜 트래픽을 투명하게 터널링하는 데 최적화되어 있으나 NAT·방화벽 환경 설정이 까다로울 수 있습니다. SSL/TLS VPN은 표준 HTTPS(TCP 443) 포트를 쓰므로 외부 출장·재택 환경에서 방화벽 통과성이 높고 세밀한 앱별 접근제어에 유리합니다.",
      difficulty: "EASY",
      keywords: ["IPSec VPN", "SSL VPN", "Site-to-Site", "TCP 443"],
    },
    {
      id: "SEC_CMN_NET_052",
      category: "네트워크 보안 프로토콜",
      question:
        "TLS 1.3(RFC 8446)이 기존 TLS 1.2와 비교하여 보안성과 성능을 동시에 개선한 대표적 변화로 올바르지 않은 것은?",
      options: [
        "RC4, 3DES, SHA-1, 정적 RSA 키 교환 등 구식·취약 암호화 방식을 유지하고 하위 호환성을 최우선으로 확장했다.",
        "완전 순방향 비밀성(PFS, Perfect Forward Secrecy)을 제공하는 임시 디피-헬만(ECDHE/DHE) 기반 키 교환을 강제했다.",
        "핸드셰이크 왕복 횟수를 기존 2-RTT에서 1-RTT(재연결 시 0-RTT 지원)로 단축했다.",
        "암호화 알고리즘을 AEAD(인증된 암호화, 예: AES-GCM, ChaCha20-Poly1305) 계열로만 제한했다.",
      ],
      answer:
        "RC4, 3DES, SHA-1, 정적 RSA 키 교환 등 구식·취약 암호화 방식을 유지하고 하위 호환성을 최우선으로 확장했다.",
      explanation:
        "TLS 1.3은 취약점이 누적된 RC4, DES/3DES, MD5, SHA-1, CBC 모드 패딩, 정적 RSA 키 교환(PFS 미지원), TLS 압축(CRIME 취약점)을 모두 과감히 제거하고, AEAD 암호 스위트와 PFS(ECDHE 등)를 강제하며 핸드셰이크를 1-RTT로 단축해 보안과 속도를 함께 높였습니다.",
      difficulty: "MEDIUM",
      keywords: ["TLS 1.3", "PFS", "1-RTT", "AEAD", "정적 RSA 제거"],
    },
    {
      id: "SEC_CMN_NET_053",
      category: "네트워크 보안 프로토콜",
      question:
        "SSL/TLS에서 '완전 순방향 비밀성(PFS, Perfect Forward Secrecy)'이 제공하는 핵심 보안 효과로 가장 정확한 것은?",
      options: [
        "장기 개인키가 유출돼도 임시 키 교환 과거 세션 트래픽은 복호화되지 않는다.",
        "장기 개인키를 1년 이상 재사용해도 모든 세션 키가 자동으로 갱신되지 않는다.",
        "정적 RSA 키 교환만으로도 과거에 저장된 TLS 패킷의 기밀성을 영구 보호한다.",
        "서버 인증서 유효기간이 만료돼도 클라이언트가 새 인증서로 자동 재발급한다.",
      ],
      answer:
        "장기 개인키가 유출돼도 임시 키 교환 과거 세션 트래픽은 복호화되지 않는다.",
      explanation:
        "정적 RSA 키 교환은 공격자가 과거 TLS 트래픽을 저장해 두었다가 나중에 서버 개인키를 탈취하면 과거 통신을 모두 복호화할 수 있습니다. 반면 ECDHE·DHE 같은 임시(Ephemeral) 키 교환을 쓰면 세션 종료 후 임시 비밀값이 파기되므로 장기 개인키가 노출되어도 과거 세션의 기밀성이 보호됩니다(PFS).",
      difficulty: "MEDIUM",
      keywords: ["PFS", "완전 순방향 비밀성", "ECDHE", "TLS"],
    },
    {
      id: "SEC_CMN_NET_054",
      category: "네트워크 보안 프로토콜",
      question:
        "무선랜(Wi-Fi) 보안 표준의 발전 과정인 WEP, WPA, WPA2, WPA3의 암호화·키 교환 방식을 바르게 짝지은 것은?",
      options: [
        "WEP: RC4(24b IV) / WPA: TKIP / WPA2: AES-CCMP / WPA3: SAE",
        "WEP: AES-CCMP / WPA: SAE / WPA2: RC4+TKIP / WPA3: WEP-128",
        "WEP: RC4+TKIP / WPA: AES-CCMP / WPA2: SAE / WPA3: RC4(24b IV)",
        "WEP: RSA-2048 / WPA: AES-CCMP / WPA2: DES / WPA3: TKIP+RC4",
      ],
      answer:
        "WEP: RC4(24b IV) / WPA: TKIP / WPA2: AES-CCMP / WPA3: SAE",
      explanation:
        "WEP(RC4, 짧은 24비트 IV 재사용 취약) → WPA(RC4에 패킷별 키 혼합 TKIP·MIC 추가) → WPA2(IEEE 802.11i, AES-CCMP 도입) → WPA3(기존 PSK 4-Way Handshake의 오프라인 사전 공격 취약점을 보완하는 SAE(Dragonfly) 키 교환, PFS, PMF 의무화, GCMP-256 지원).",
      difficulty: "EASY",
      keywords: ["WEP", "WPA", "WPA2", "WPA3", "AES-CCMP", "SAE"],
    },
    {
      id: "SEC_CMN_NET_055",
      category: "네트워크 보안 프로토콜",
      question:
        "기업용 무선랜(WPA2/WPA3-Enterprise) 환경에서 모든 직원이 동일한 사전 공유 키(PSK)를 쓰지 않고, 개별 계정·인증서 기반으로 포트 단위 접근을 통제하기 위해 사용하는 표준 프레임워크와 3대 구성 요소는?",
      options: [
        "IEEE 802.1X — Supplicant, Authenticator, RADIUS",
        "IEEE 802.11i — Supplicant, Pre-Shared Key, Beacon",
        "IEEE 802.11w — Management Frame, Station, SSID",
        "IEEE 802.3ad — Trunk, Link Aggregation, VLAN Tag",
      ],
      answer: "IEEE 802.1X — Supplicant, Authenticator, RADIUS",
      explanation:
        "IEEE 802.1X는 유·무선 포트 기반 네트워크 접근 제어 표준으로 ① Supplicant(인증 요청 단말), ② Authenticator(인증 통과 전 통신을 차단·중계하는 AP 또는 스위치), ③ Authentication Server(실제 신원 검증을 수행하는 RADIUS 서버)로 구성되며, EAP(EAP-TLS, PEAP 등) 프로토콜로 인증을 수행합니다.",
      difficulty: "EASY",
      keywords: ["IEEE 802.1X", "Supplicant", "Authenticator", "RADIUS", "EAP"],
    },
    {
      id: "SEC_CMN_NET_056",
      category: "네트워크 보안 프로토콜",
      question:
        "무선랜 공격 중 공격자가 정상 사내 AP와 동일한 SSID(네트워크 이름)를 가진 가짜 AP를 더 강한 전파 세기로 설치하고, 기존 클라이언트에게 Deauthentication 프레임을 보내 연결을 끊은 뒤 가짜 AP로 유도해 트래픽을 탈취하는 공격은?",
      options: [
        "Evil Twin / Rogue AP 공격",
        "WEP IV 재사용 크래킹 공격",
        "WPA2 KRACK 4-Way 재설치 공격",
        "블루투스 블루재킹(Bluejacking) 공격",
      ],
      answer: "Evil Twin / Rogue AP 공격",
      explanation:
        "Evil Twin 공격은 정상 AP를 사칭한 비인가 AP(Rogue AP)로 사용자를 유도해 피싱 로그인 페이지나 중간자(MITM) 도청을 수행하는 무선랜 공격입니다. 예방을 위해 WIPS(무선 침입 방지 시스템)를 통한 비인가 AP 탐지·차단, 802.1X(EAP-TLS 서버 인증서 검증), WPA3 PMF(관리 프레임 보호, 802.11w) 적용이 필요합니다.",
      difficulty: "EASY",
      keywords: ["Evil Twin", "Rogue AP", "Deauthentication", "WIPS", "PMF"],
    },
    {
      id: "SEC_CMN_NET_057",
      category: "네트워크 보안 프로토콜",
      question:
        "무선랜 보안 설정 시 'SSID 브로드캐스트 숨김(Hide SSID)'과 'MAC 주소 필터링'만으로는 충분한 보안 대책이 될 수 없는 주된 이유는?",
      options: [
        "연결 프레임 스니핑으로 숨긴 SSID와 허용 MAC이 노출되어 위조 우회된다.",
        "SSID를 숨기면 AES-CCMP 암호화가 자동 해제되어 평문 통신만 가능해진다.",
        "MAC 필터링을 활성화하면 WPA2/WPA3 인증 프레임 자체가 전송되지 않는다.",
        "Hidden SSID는 WIPS 센서에서도 비인가 AP 탐지를 원천 차단하게 만든다.",
      ],
      answer:
        "연결 프레임 스니핑으로 숨긴 SSID와 허용 MAC이 노출되어 위조 우회된다.",
      explanation:
        "SSID 숨김과 MAC 필터링은 단순 은폐(Security through Obscurity) 수준의 보조 수단일 뿐입니다. 무선 관리 프레임(Probe/Association 등)은 평문으로 전송되므로 스니핑으로 허용 MAC과 SSID가 즉시 노출되며, OS 명령으로 MAC 주소를 손쉽게 위조할 수 있습니다. 따라서 반드시 WPA2/WPA3 암호화와 802.1X 인증을 적용해야 합니다.",
      difficulty: "EASY",
      keywords: ["SSID 숨김", "MAC 필터링", "무선랜 보안 한계"],
    },
    {
      id: "SEC_CMN_NET_058",
      category: "네트워크 보안 프로토콜",
      question:
        "네트워크 장비·서버 원격 관리를 위한 SNMP(Simple Network Management Protocol) 버전 중, 커뮤니티 문자열(Community String)이 평문으로 전송되어 스니핑에 취약한 구버전과 사용자 기반 인증(HMAC)·암호화(AES)를 모두 지원하는 권장 버전이 바르게 짝지어진 것은?",
      options: [
        "취약: SNMPv1·v2c (평문) — 권장: SNMPv3 (authPriv)",
        "취약: SNMPv3 (noAuthNoPriv) — 권장: SNMPv2c (Community)",
        "취약: SNMPv1만 해당 — 권장: SNMPv2c (기본 AES 암호화)",
        "취약: SNMPv3 (authNoPriv) — 권장: SNMPv1 (HMAC 인증)",
      ],
      answer: "취약: SNMPv1·v2c (평문) — 권장: SNMPv3 (authPriv)",
      explanation:
        "SNMPv1과 v2c는 `public`/`private` 같은 커뮤니티 문자열을 평문으로 전송해 스니핑·무단 설정 변경 위험이 큽니다. 따라서 보안 수준 `authPriv`(인증+암호화)를 지원하는 SNMPv3로 전환하고, 불필요 시 SNMP 서비스를 중지하며 접근 가능 NMS IP를 ACL로 제한해야 합니다.",
      difficulty: "EASY",
      keywords: ["SNMPv3", "authPriv", "커뮤니티 문자열", "네트워크 관리 보안"],
    },
    {
      id: "SEC_CMN_NET_059",
      category: "네트워크 보안 프로토콜",
      question:
        "SSH(Secure Shell) 프로토콜에서 원격 서버에 처음 접속할 때 클라이언트가 서버의 공개키 지문(Host Key Fingerprint)을 확인하고 `~/.ssh/known_hosts`에 저장·비교하는 주된 보안 목적은?",
      options: [
        "서버 사칭을 통한 중간자 공격(MITM) 탐지·차단",
        "세션 트래픽의 대칭키 압축률 및 속도 향상",
        "클라이언트 출발지 IP 주소의 익명화·은닉 처리",
        "원격 서버의 `/etc/passwd` 계정 목록 자동 동기화",
      ],
      answer: "서버 사칭을 통한 중간자 공격(MITM) 탐지·차단",
      explanation:
        "SSH 클라이언트는 접속 대상 서버의 호스트 공개키를 `known_hosts`에 기록해 두고, 이후 재접속 시 서버가 제시한 호스트 키가 기존 기록과 달라지면 중간자 공격(MITM) 가능성을 경고하며 접속을 차단합니다.",
      difficulty: "EASY",
      keywords: ["SSH", "known_hosts", "Host Key", "MITM 방지"],
    },
    {
      id: "SEC_CMN_NET_060",
      category: "네트워크 보안 프로토콜",
      question:
        "터널링 프로토콜 중 OSI L2(데이터링크 계층)에서 동작하는 VPN 프로토콜과 L3(네트워크 계층)에서 동작하는 VPN 프로토콜이 바르게 분류된 것은?",
      options: [
        "L2: PPTP·L2F·L2TP — L3: IPSec (AH/ESP)",
        "L2: IPSec (AH/ESP) — L3: PPTP·L2F·L2TP",
        "L2: SSL/TLS VPN — L3: L2TP·SSH 터널링",
        "L2: IPSec·SSL VPN — L3: PPTP·L2F·PPP",
      ],
      answer: "L2: PPTP·L2F·L2TP — L3: IPSec (AH/ESP)",
      explanation:
        "VPN 프로토콜의 계층 구분은 기본 출제 항목입니다. L2(데이터링크) 계층은 PPTP, L2F, L2TP(자체 암호화가 약해 주로 L2TP/IPSec으로 결합 사용), L3(네트워크) 계층은 IPSec, L4/L7 계층은 SSL/TLS VPN과 SSH 터널링으로 구분합니다.",
      difficulty: "MEDIUM",
      keywords: ["VPN 계층", "PPTP", "L2TP", "IPSec", "SSL VPN"],
    },
  ],
);

export const SECURITY_COMMON_NET_QUESTIONS: Question[] = [
  ...net0101,
  ...net0102,
  ...net0201,
  ...net0202,
];
