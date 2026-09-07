import { Question } from '../../types/question';

export const networkQuestions: Question[] = [
  {
    id: 'NET_001',
    examYear: 2023,
    examRound: 1,
    subject: '신기술/보안',
    category: '네트워크',
    subCategory: 'OSI 7계층',
    type: 'SHORT_ANSWER',
    question: 'OSI 7계층 모델에서 각 계층이 처리하는 프로토콜 데이터 단위(PDU)가 올바르게 연결되도록 빈칸을 채우시오.\n- 2계층(데이터링크 계층): 프레임(Frame)\n- 3계층(네트워크 계층): (    1    )\n- 4계층(전송 계층): (    2    )',
    answer: ['패킷, 세그먼트', '패킷,세그먼트', 'Packet, Segment', 'packet, segment'],
    explanation: 'OSI 7계층의 PDU는 1계층: 비트(Bit), 2계층: 프레임(Frame), 3계층: 패킷(Packet), 4계층: 세그먼트(Segment), 5~7계층: 메시지/데이터(Message/Data)입니다.',
    difficulty: 'EASY',
    keywords: ['OSI 7계층', 'PDU', '패킷', '세그먼트'],
    source: '기출 변형'
  },
  {
    id: 'NET_002',
    examYear: 2022,
    examRound: 2,
    subject: '신기술/보안',
    category: '네트워크',
    subCategory: 'TCP/IP',
    type: 'SHORT_ANSWER',
    question: 'TCP 연결 수립 과정인 3-Way Handshake에서 클라이언트가 서버에게 연결을 요청할 때 보내는 플래그 (1)과, 서버가 이를 수락하고 응답할 때 보내는 플래그 (2)를 순서대로 쓰시오.\n1단계: Client -> Server: (  1  )\n2단계: Server -> Client: (  2  )\n3단계: Client -> Server: ACK',
    answer: ['SYN, SYN+ACK', 'SYN, SYN-ACK', 'SYN,SYN+ACK', 'SYN,SYN-ACK', 'SYN, SYN/ACK'],
    explanation: 'TCP 연결 설정 3-way handshake는 SYN -> SYN+ACK -> ACK 순으로 진행되며, 연결 해제 4-way handshake는 FIN -> ACK -> FIN -> ACK 순으로 진행됩니다.',
    difficulty: 'EASY',
    keywords: ['TCP', '3-way Handshake', 'SYN', 'ACK'],
    source: '기출 변형'
  },
  {
    id: 'NET_003',
    examYear: 2023,
    examRound: 3,
    subject: '신기술/보안',
    category: '네트워크',
    subCategory: '서브넷팅',
    type: 'SHORT_ANSWER',
    question: 'IPv4 주소 192.168.1.0/26 서브넷에서 네트워크 주소와 브로드캐스트 주소를 제외하고 실제로 호스트(컴퓨터)에 할당 가능한 최대 IP 주소 개수를 쓰시오.',
    answer: ['62', '62개'],
    explanation: '/26은 호스트 비트가 32 - 26 = 6비트입니다. 2^6 = 64개의 IP가 존재하며, 네트워크 주소(첫 번째)와 브로드캐스트 주소(마지막) 2개를 제외하면 실제 할당 가능한 호스트 수는 64 - 2 = 62개입니다.',
    difficulty: 'MEDIUM',
    keywords: ['IPv4', '서브넷', 'CIDR', '호스트할당'],
    source: '기출 변형'
  },
  {
    id: 'NET_004',
    examYear: 2024,
    examRound: 1,
    subject: '신기술/보안',
    category: '네트워크',
    subCategory: '라우팅',
    type: 'SHORT_ANSWER',
    question: '최단 경로 탐색을 위해 다익스트라(Dijkstra) 알고리즘을 사용하며, 네트워크의 링크 상태 정보를 모든 라우터에 플러딩(Flooding)하여 경로를 계산하는 대표적인 내부 라우팅 프로토콜(IGP)의 영문 약어를 쓰시오.',
    answer: ['OSPF', 'ospf'],
    explanation: 'RIP는 거리 벡터(Distance Vector) 알고리즘과 홉 수(최대 15)를 사용하며, OSPF(Open Shortest Path First)는 링크 상태(Link State) 알고리즘과 다익스트라 최단 경로 알고리즘을 사용하는 대표적인 IGP입니다.',
    difficulty: 'MEDIUM',
    keywords: ['라우팅', 'OSPF', '다익스트라', '링크상태'],
    source: '기출 변형'
  }
];
