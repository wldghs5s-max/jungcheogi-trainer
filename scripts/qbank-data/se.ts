import { Question } from "../../src/types/question";

export const SE_QUESTIONS: Question[] = [
  {
    id: "MEMO_SE_015",
    subject: "소프트웨어설계",
    category: "디자인 패턴",
    subCategory: "행위 패턴",
    type: "SHORT_ANSWER",
    question:
      "데이터 구조와 처리를 분리하여, 기존 클래스 구조를 변경하지 않고도 각 요소에 새로운 연산(기능)을 유연하게 추가할 수 있도록 방문자 객체를 정의하는 GoF 행위 패턴의 명칭을 쓰시오.",
    answer: [
      "방문자",
      "방문자 패턴",
      "비지터",
      "비지터 패턴",
      "Visitor",
      "Visitor Pattern",
    ],
    explanation:
      "비지터(Visitor) 패턴은 요소 객체의 accept 메서드를 통해 방문자 객체가 방문하여 연산을 수행하며, 요소 클래스에 영향을 주지 않고 새로운 처리를 추가합니다.",
    difficulty: "HARD",
    keywords: ["디자인패턴", "비지터", "방문자", "Visitor"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_016",
    subject: "소프트웨어설계",
    category: "디자인 패턴",
    subCategory: "생성 패턴",
    type: "SHORT_ANSWER",
    question:
      "복잡한 객체의 생성 과정과 표현 방법을 분리하여, 동일한 생성 절차에서 서로 다른 표현 결과를 만들 수 있게 하는 GoF 생성 패턴의 명칭을 쓰시오.",
    answer: ["빌더", "빌더 패턴", "Builder", "Builder Pattern"],
    explanation:
      "빌더(Builder) 패턴은 여러 단계의 조립 과정을 거쳐 복잡한 객체를 만들 때 유용하며 생성자 인자가 많을 때 가독성을 높여줍니다.",
    difficulty: "MEDIUM",
    keywords: ["빌더", "디자인패턴", "생성패턴", "복합객체"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_017",
    subject: "소프트웨어설계",
    category: "디자인 패턴",
    subCategory: "생성 패턴",
    type: "SHORT_ANSWER",
    question:
      "구체적인 클래스에 의존하지 않고, 서로 연관되거나 의존적인 여러 객체의 군(Family)을 생성하기 위한 인터페이스를 제공하는 GoF 생성 패턴의 명칭을 쓰시오.",
    answer: [
      "추상 팩토리",
      "추상 팩토리 패턴",
      "Abstract Factory",
      "추상팩토리",
    ],
    explanation:
      "추상 팩토리는 관련된 객체 묶음을 생성하는 팩토리 인터페이스를 제공하여 팩토리 메서드보다 상위 개념의 캡슐화를 지원합니다.",
    difficulty: "HARD",
    keywords: ["추상팩토리", "디자인패턴", "생성패턴", "객체군"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_018",
    subject: "소프트웨어설계",
    category: "디자인 패턴",
    subCategory: "생성 패턴",
    type: "SHORT_ANSWER",
    question:
      "새로운 객체를 생성할 때 원본 객체를 복제(Clone)하여 생성하는 GoF 생성 패턴의 명칭을 쓰시오.",
    answer: ["프로토타입", "프로토타입 패턴", "Prototype", "Prototype Pattern"],
    explanation:
      "프로토타입 패턴은 객체 생성 비용이 크거나 초기화 과정이 복잡할 때 기존 인스턴스를 복제하여 성능을 개선합니다.",
    difficulty: "MEDIUM",
    keywords: ["프로토타입", "디자인패턴", "생성패턴", "복제"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_019",
    subject: "소프트웨어설계",
    category: "디자인 패턴",
    subCategory: "구조 패턴",
    type: "SHORT_ANSWER",
    question:
      "개별 객체와 복합 객체를 동일하게 다룰 수 있도록 트리 구조의 객체 구성을 제공하는 GoF 구조 패턴의 명칭을 쓰시오.",
    answer: ["컴포지트", "컴포지트 패턴", "Composite", "Composite Pattern"],
    explanation:
      "컴포지트 패턴은 파일과 폴더의 관계처럼 단일 객체와 복합 객체를 동일한 인터페이스로 클라이언트가 처리할 수 있게 합니다.",
    difficulty: "MEDIUM",
    keywords: ["컴포지트", "디자인패턴", "구조패턴", "트리구조"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_020",
    subject: "소프트웨어설계",
    category: "디자인 패턴",
    subCategory: "구조 패턴",
    type: "SHORT_ANSWER",
    question:
      "객체에 동적으로 새로운 책임(기능)을 추가할 수 있게 하며, 서브클래스를 만드는 대안으로 기능을 유연하게 확장하는 GoF 구조 패턴의 명칭을 쓰시오.",
    answer: ["데코레이터", "데코레이터 패턴", "Decorator", "Decorator Pattern"],
    explanation:
      "데코레이터 패턴은 객체를 장식자 객체로 감싸 실행 시점에 기능을 덧붙이며 상속 대신 합성을 활용합니다.",
    difficulty: "MEDIUM",
    keywords: ["데코레이터", "디자인패턴", "구조패턴", "동적기능추가"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_021",
    subject: "소프트웨어설계",
    category: "디자인 패턴",
    subCategory: "구조 패턴",
    type: "SHORT_ANSWER",
    question:
      "복잡한 서브시스템의 인터페이스들을 모아 단순화된 고수준의 단일 통합 인터페이스를 제공하는 GoF 구조 패턴의 명칭을 쓰시오.",
    answer: ["퍼사드", "퍼사드 패턴", "Facade", "파사드", "Facade Pattern"],
    explanation:
      "퍼사드 패턴은 서브시스템들의 복잡한 호출 과정을 하나의 통합 창구로 감추어 클라이언트의 결합도를 낮춥니다.",
    difficulty: "EASY",
    keywords: ["퍼사드", "디자인패턴", "구조패턴", "통합인터페이스"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_022",
    subject: "소프트웨어설계",
    category: "디자인 패턴",
    subCategory: "구조 패턴",
    type: "SHORT_ANSWER",
    question:
      "다른 객체에 대한 대리자나 자리표시자 역할을 하여, 실제 객체에 대한 접근을 제어하거나 지연 로딩을 수행하는 GoF 구조 패턴의 명칭을 쓰시오.",
    answer: ["프록시", "프록시 패턴", "Proxy", "Proxy Pattern"],
    explanation:
      "프록시 패턴은 가상 프록시, 보호 프록시, 원격 프록시 등이 있으며 객체 접근 전후의 제어 및 비용 절감에 활용됩니다.",
    difficulty: "EASY",
    keywords: ["프록시", "디자인패턴", "구조패턴", "대리자"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_023",
    subject: "소프트웨어설계",
    category: "디자인 패턴",
    subCategory: "구조 패턴",
    type: "SHORT_ANSWER",
    question:
      "구현부에서 추상층을 분리하여 두 계층이 독립적으로 확장할 수 있도록 다리(Bridge) 역할을 수행하는 GoF 구조 패턴의 명칭을 쓰시오.",
    answer: ["브리지", "브리지 패턴", "Bridge", "Bridge Pattern"],
    explanation:
      "브리지 패턴은 기능의 계층과 구현의 계층을 연결하여 상속 계층의 폭발적 증가를 방지합니다.",
    difficulty: "HARD",
    keywords: ["브리지", "디자인패턴", "구조패턴", "추상구현분리"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_024",
    subject: "소프트웨어설계",
    category: "디자인 패턴",
    subCategory: "구조 패턴",
    type: "SHORT_ANSWER",
    question:
      "인스턴스를 가능한 한 공유하여 대량의 작은 객체 생성 시 메모리 사용량을 절감하는 GoF 구조 패턴의 명칭을 쓰시오.",
    answer: [
      "플라이웨이트",
      "플라이웨이트 패턴",
      "Flyweight",
      "Flyweight Pattern",
    ],
    explanation:
      "플라이웨이트 패턴은 공유 가능한 내부 상태(Intrinsic)와 공유 불가능한 외부 상태(Extrinsic)를 구분하여 메모리를 절약합니다.",
    difficulty: "HARD",
    keywords: ["플라이웨이트", "디자인패턴", "구조패턴", "메모리공유"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_025",
    subject: "소프트웨어설계",
    category: "디자인 패턴",
    subCategory: "행위 패턴",
    type: "SHORT_ANSWER",
    question:
      "어떤 객체의 상태가 변하면 그 객체에 의존하는 모든 객체에 자동으로 알림이 가고 내용이 갱신되는 일대다 의존 관계의 GoF 행위 패턴을 쓰시오.",
    answer: ["옵서버", "옵저버", "옵서버 패턴", "옵저버 패턴", "Observer"],
    explanation:
      "옵서버 패턴은 발행-구독(Publish-Subscribe) 모델로 통보 주체와 관찰자 객체 간의 결합도를 낮춥니다.",
    difficulty: "EASY",
    keywords: ["옵서버", "디자인패턴", "행위패턴", "발행구독"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_026",
    subject: "소프트웨어설계",
    category: "디자인 패턴",
    subCategory: "행위 패턴",
    type: "SHORT_ANSWER",
    question:
      "상위 클래스에서 알고리즘의 뼈대(구조)를 정의하고, 구체적인 세부 단계는 서브클래스에서 오버라이드하도록 하는 GoF 행위 패턴의 명칭을 쓰시오.",
    answer: [
      "템플릿 메서드",
      "템플릿 메소드",
      "Template Method",
      "템플릿 메서드 패턴",
    ],
    explanation:
      "템플릿 메서드 패턴은 전체적인 처리 흐름은 고정하고 특정 단계의 구현만 하위 클래스로 위임하여 코드 중복을 방지합니다.",
    difficulty: "MEDIUM",
    keywords: ["템플릿메서드", "디자인패턴", "행위패턴", "알고리즘뼈대"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_027",
    subject: "소프트웨어설계",
    category: "디자인 패턴",
    subCategory: "행위 패턴",
    type: "SHORT_ANSWER",
    question:
      "객체의 내부 상태가 바뀜에 따라 객체의 행동을 변경할 수 있도록 객체 상태를 클래스로 캡슐화하는 GoF 행위 패턴의 명칭을 쓰시오.",
    answer: ["상태", "상태 패턴", "State", "State Pattern"],
    explanation:
      "상태(State) 패턴은 거대한 조건문(if-else, switch) 대신 상태를 별도 객체화하여 상태 전이를 명확하게 다룹니다.",
    difficulty: "MEDIUM",
    keywords: ["상태패턴", "디자인패턴", "행위패턴", "상태전이"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_028",
    subject: "소프트웨어설계",
    category: "디자인 패턴",
    subCategory: "행위 패턴",
    type: "SHORT_ANSWER",
    question:
      "객체들의 상호작용을 캡슐화하여 객체 간의 직접적인 참조를 줄이고, 복잡한 통신을 조율하는 중재자 객체를 두는 GoF 행위 패턴의 명칭을 쓰시오.",
    answer: [
      "중재자",
      "중재자 패턴",
      "미디에이터",
      "Mediator",
      "Mediator Pattern",
    ],
    explanation:
      "중재자(Mediator) 패턴은 객체 간의 M:N 관계를 1:N 관계로 전환하여 상호 결합도를 현저히 낮춥니다.",
    difficulty: "HARD",
    keywords: ["중재자", "미디에이터", "디자인패턴", "상호작용"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_029",
    subject: "소프트웨어설계",
    category: "디자인 패턴",
    subCategory: "행위 패턴",
    type: "SHORT_ANSWER",
    question:
      "내부 표현 방식을 노출하지 않고 집합 객체의 원소들을 순차적으로 접근할 수 있는 방법을 제공하는 GoF 행위 패턴의 명칭을 쓰시오.",
    answer: [
      "반복자",
      "이터레이터",
      "반복자 패턴",
      "Iterator",
      "Iterator Pattern",
    ],
    explanation:
      "반복자(Iterator) 패턴은 리스트, 트리 등 컬렉션의 세부 구조를 숨긴 채 일관된 순회 인터페이스를 제공합니다.",
    difficulty: "EASY",
    keywords: ["반복자", "이터레이터", "디자인패턴", "순회"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_030",
    subject: "소프트웨어설계",
    category: "디자인 패턴",
    subCategory: "행위 패턴",
    type: "SHORT_ANSWER",
    question:
      "캡슐화를 위반하지 않으면서 객체의 내부 상태를 캡처하고 외부에 저장했다가 나중에 해당 상태로 복원할 수 있게 하는 GoF 행위 패턴의 명칭을 쓰시오.",
    answer: ["메멘토", "메멘토 패턴", "Memento", "Memento Pattern"],
    explanation:
      "메멘토 패턴은 실행 취소(Undo)나 스냅샷 복원에 주로 사용되며 Originator, Memento, Caretaker로 구성됩니다.",
    difficulty: "HARD",
    keywords: ["메멘토", "디자인패턴", "행위패턴", "상태복원", "Undo"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_031",
    subject: "소프트웨어설계",
    category: "디자인 패턴",
    subCategory: "행위 패턴",
    type: "SHORT_ANSWER",
    question:
      "요청을 객체의 형태로 캡슐화하여 매개변수화하고, 작업 요청의 취소(Undo) 및 대기열(Queue) 등록을 가능하게 하는 GoF 행위 패턴의 명칭을 쓰시오.",
    answer: [
      "커맨드",
      "커맨드 패턴",
      "Command",
      "Command Pattern",
      "명령 패턴",
    ],
    explanation:
      "커맨드 패턴은 요청자(Invoker)와 수신자(Receiver)를 분리하여 요청을 큐에 넣거나 로깅할 수 있게 합니다.",
    difficulty: "MEDIUM",
    keywords: ["커맨드", "명령패턴", "디자인패턴", "요청캡슐화"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_032",
    subject: "소프트웨어설계",
    category: "아키텍처",
    subCategory: "파이프필터",
    type: "SHORT_ANSWER",
    question:
      "데이터 스트림을 처리하는 필터(Filter) 컴포넌트들과 데이터 전송 통로인 파이프(Pipe)로 구성되어 유닉스 셸 파이프라인처럼 작동하는 아키텍처 패턴의 명칭을 쓰시오.",
    answer: [
      "파이프 필터",
      "파이프 필터 패턴",
      "Pipe and Filter",
      "Pipe-Filter",
    ],
    explanation:
      "파이프-필터 패턴은 각 필터가 독립적으로 변환 작업을 수행하며 재사용성과 확장성이 우수합니다.",
    difficulty: "EASY",
    keywords: ["파이프필터", "아키텍처패턴", "데이터스트림"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_033",
    subject: "소프트웨어설계",
    category: "아키텍처",
    subCategory: "계층화",
    type: "SHORT_ANSWER",
    question:
      "시스템을 하위 계층부터 상위 계층까지 서로 인접한 계층 간에만 상호작용하도록 조직화하는 대표적인 아키텍처 패턴의 명칭을 쓰시오.",
    answer: [
      "계층화 패턴",
      "레이어드 아키텍처",
      "Layered Pattern",
      "계층 패턴",
    ],
    explanation:
      "레이어드 아키텍처는 프레젠테이션, 비즈니스, 데이터 계층 등으로 분리하여 계층 간 결합도를 낮추고 모듈화를 돕습니다.",
    difficulty: "EASY",
    keywords: ["계층화", "레이어드", "아키텍처패턴", "관심사분리"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_034",
    subject: "소프트웨어설계",
    category: "아키텍처",
    subCategory: "MSA",
    type: "SHORT_ANSWER",
    question:
      "단일 대규모 애플리케이션을 독립적으로 배포 및 실행 가능한 작고 독립된 서비스 단위들로 분할하여 구성하는 아키텍처 스타일의 영문 약어를 쓰시오.",
    answer: ["MSA", "Microservices Architecture", "마이크로서비스 아키텍처"],
    explanation:
      "MSA는 모놀리식(Monolithic)의 한계를 극복하고 서비스별 독립 배포, 기술 스택 다양성, 장애 격리를 실현합니다.",
    difficulty: "EASY",
    keywords: ["MSA", "마이크로서비스", "아키텍처"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_035",
    subject: "소프트웨어설계",
    category: "UML",
    subCategory: "상태 다이어그램",
    type: "SHORT_ANSWER",
    question:
      "객체가 가질 수 있는 모든 상태와 외부 이벤트에 의한 상태 전이(State Transition)를 모델링하는 동적 UML 다이어그램의 명칭을 쓰시오.",
    answer: ["상태 다이어그램", "State Diagram", "상태 머신 다이어그램"],
    explanation:
      "상태 다이어그램은 럼바우 객체지향 분석에서 동적 모델링(Statechart)으로 활용되며 이벤트에 따른 객체의 생명주기를 표현합니다.",
    difficulty: "EASY",
    keywords: ["UML", "상태다이어그램", "상태전이", "동적모델링"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_036",
    subject: "소프트웨어설계",
    category: "UML",
    subCategory: "활동 다이어그램",
    type: "SHORT_ANSWER",
    question:
      "시스템이 실행하는 작업의 처리 흐름과 조건에 따른 분기, 병행 처리를 순서도(Flowchart) 형태로 나타내는 동적 UML 다이어그램의 명칭을 쓰시오.",
    answer: ["활동 다이어그램", "액티비티 다이어그램", "Activity Diagram"],
    explanation:
      "활동 다이어그램은 비즈니스 프로세스 흐름이나 복잡한 연산 과정을 모델링할 때 스윔레인(Swimlane)과 포크/조인 노드로 표현합니다.",
    difficulty: "EASY",
    keywords: ["UML", "활동다이어그램", "액티비티", "흐름도"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_037",
    subject: "소프트웨어설계",
    category: "UML",
    subCategory: "배치 다이어그램",
    type: "SHORT_ANSWER",
    question:
      "물리적 노드(컴퓨터, 서버, 통신 링크 등)와 노드에 배치되는 실행 산출물(Artifact)의 물리적 위치 관계를 표현하는 UML 다이어그램의 명칭을 쓰시오.",
    answer: [
      "배치 다이어그램",
      "디플로이먼트 다이어그램",
      "Deployment Diagram",
    ],
    explanation:
      "배치 다이어그램은 HW 아키텍처와 SW 컴포넌트가 실제 서버 환경에 설치·배치되는 형태를 모델링하는 구조 다이어그램입니다.",
    difficulty: "MEDIUM",
    keywords: ["UML", "배치다이어그램", "물리노드", "아티팩트"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_038",
    subject: "소프트웨어설계",
    category: "UML",
    subCategory: "컴포넌트 다이어그램",
    type: "SHORT_ANSWER",
    question:
      "소프트웨어를 구성하는 컴포넌트와 그들 사이의 의존 관계 및 인터페이스 연결 구조를 표현하는 정적 UML 다이어그램의 명칭을 쓰시오.",
    answer: ["컴포넌트 다이어그램", "Component Diagram"],
    explanation:
      "컴포넌트 다이어그램은 소스 코드나 라이브러리, 모듈 단위의 물리적 부품과 제공/요구 인터페이스를 정적으로 보여줍니다.",
    difficulty: "MEDIUM",
    keywords: ["UML", "컴포넌트다이어그램", "인터페이스"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_039",
    subject: "소프트웨어설계",
    category: "UML",
    subCategory: "관계",
    type: "SHORT_ANSWER",
    question:
      "전체(Whole) 객체와 부분(Part) 객체 사이의 포함 관계 중, 전체 객체가 소멸되어도 부분 객체는 독립적으로 살아남는 약한 결합 관계의 명칭을 쓰시오.",
    answer: ["집약 관계", "집약", "Aggregation"],
    explanation:
      "집약 관계는 빈 다이아몬드(◇)로 표현하며 독립적 생명주기를 갖습니다. 반면 전체 소멸 시 부분도 함께 소멸하는 강한 결합은 합성(Composition, 채워진 다이아몬드 ◆)입니다.",
    difficulty: "MEDIUM",
    keywords: ["UML", "집약", "합성", "Aggregation"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_040",
    subject: "소프트웨어설계",
    category: "UML",
    subCategory: "관계",
    type: "SHORT_ANSWER",
    question:
      "전체(Whole) 객체와 부분(Part) 객체 사이의 강한 소유 관계로, 전체 객체가 소멸되면 부분 객체도 함께 소멸하여 생명주기를 공유하는 UML 관계의 명칭을 쓰시오.",
    answer: ["합성 관계", "합성", "복합 관계", "Composition"],
    explanation:
      "합성(Composition) 관계는 채워진 다이아몬드(◆)로 표기하며, 부분 객체는 전체 객체 없이는 존재할 수 없습니다.",
    difficulty: "MEDIUM",
    keywords: ["UML", "합성", "Composition", "생명주기공유"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_041",
    subject: "소프트웨어설계",
    category: "객체지향 원칙",
    subCategory: "SOLID",
    type: "SHORT_ANSWER",
    question:
      "단 하나의 책임만 가져야 하며, 클래스를 변경해야 하는 이유는 오직 하나뿐이어야 한다는 SOLID 설계 원칙의 명칭 또는 영문 약어를 쓰시오.",
    answer: ["단일 책임 원칙", "SRP", "Single Responsibility Principle"],
    explanation:
      "단일 책임 원칙(SRP)은 클래스가 하나의 기능에만 집중하게 하여 응집도를 높이고 변경의 파급효과를 최소화합니다.",
    difficulty: "EASY",
    keywords: ["SOLID", "SRP", "단일책임원칙"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_042",
    subject: "소프트웨어설계",
    category: "객체지향 원칙",
    subCategory: "SOLID",
    type: "SHORT_ANSWER",
    question:
      "소프트웨어 개체는 확장에 대해서는 열려 있어야 하지만, 수정에 대해서는 닫혀 있어야 한다는 SOLID 설계 원칙의 명칭 또는 영문 약어를 쓰시오.",
    answer: ["개방 폐쇄 원칙", "OCP", "Open Closed Principle"],
    explanation:
      "개방 폐쇄 원칙(OCP)은 인터페이스나 다형성을 활용하여 기존 코드를 수정하지 않고 새로운 기능을 추가할 수 있도록 설계하는 원칙입니다.",
    difficulty: "EASY",
    keywords: ["SOLID", "OCP", "개방폐쇄원칙"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_043",
    subject: "소프트웨어설계",
    category: "객체지향 원칙",
    subCategory: "SOLID",
    type: "SHORT_ANSWER",
    question:
      "서브타입은 언제나 자신의 기반타입(슈퍼타입)으로 교체할 수 있어야 한다는 SOLID 설계 원칙의 명칭 또는 영문 약어를 쓰시오.",
    answer: ["리스코프 치환 원칙", "LSP", "Liskov Substitution Principle"],
    explanation:
      "리스코프 치환 원칙(LSP)은 자식 클래스가 부모 클래스의 계약과 행위를 위반하지 않고 올바르게 상속해야 함을 규정합니다.",
    difficulty: "MEDIUM",
    keywords: ["SOLID", "LSP", "리스코프치환원칙"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_044",
    subject: "소프트웨어설계",
    category: "객체지향 원칙",
    subCategory: "SOLID",
    type: "SHORT_ANSWER",
    question:
      "클라이언트가 자신이 사용하지 않는 메서드에 의존하지 않도록, 거대한 인터페이스보다 작고 구체적인 인터페이스 여러 개로 분리해야 한다는 SOLID 원칙을 쓰시오.",
    answer: ["인터페이스 분리 원칙", "ISP", "Interface Segregation Principle"],
    explanation:
      "인터페이스 분리 원칙(ISP)은 클라이언트 맞춤형 특화 인터페이스를 제공하여 불필요한 결합과 재컴파일을 방지합니다.",
    difficulty: "MEDIUM",
    keywords: ["SOLID", "ISP", "인터페이스분리원칙"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_045",
    subject: "소프트웨어설계",
    category: "객체지향 원칙",
    subCategory: "SOLID",
    type: "SHORT_ANSWER",
    question:
      "고수준 모듈은 저수준 모듈의 구현에 의존해서는 안 되며, 둘 다 추상화에 의존해야 한다는 SOLID 설계 원칙의 명칭 또는 영문 약어를 쓰시오.",
    answer: ["의존 역전 원칙", "DIP", "Dependency Inversion Principle"],
    explanation:
      "의존 역전 원칙(DIP)은 구체 클래스 대신 인터페이스나 추상 클래스를 바라보게 하여 시스템 유연성과 테스트 용이성을 극대화합니다.",
    difficulty: "MEDIUM",
    keywords: ["SOLID", "DIP", "의존역전원칙"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_046",
    subject: "소프트웨어설계",
    category: "모듈화",
    subCategory: "결합도",
    type: "SHORT_ANSWER",
    question:
      "모듈 간의 인터페이스로 오직 단순 파라미터 데이터 값만 전달되어, 결합도 중에서 가장 낮고 바람직한 결합도의 명칭을 쓰시오.",
    answer: ["자료 결합도", "데이터 결합도", "Data Coupling"],
    explanation:
      "자료(데이터) 결합도는 가장 이상적인 형태입니다. 결합도 순서: 내용 > 공통 > 외부 > 제어 > 스탬프 > 자료 (내공외제스자).",
    difficulty: "EASY",
    keywords: ["결합도", "자료결합도", "데이터결합도"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_047",
    subject: "소프트웨어설계",
    category: "모듈화",
    subCategory: "결합도",
    type: "SHORT_ANSWER",
    question:
      "한 모듈이 다른 모듈의 내부 자료나 코드를 직접 참조하거나 수정할 때 발생하며, 결합도 중 가장 강하고 위험한 결합도의 명칭을 쓰시오.",
    answer: ["내용 결합도", "Content Coupling"],
    explanation:
      "내용 결합도는 모듈 독립성을 완전히 해치므로 반드시 피해야 합니다. 한 모듈의 수정이 다른 모듈의 오류를 직접 유발합니다.",
    difficulty: "EASY",
    keywords: ["결합도", "내용결합도", "ContentCoupling"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_048",
    subject: "소프트웨어설계",
    category: "모듈화",
    subCategory: "결합도",
    type: "SHORT_ANSWER",
    question:
      "여러 모듈이 동일한 전역 변수나 공통 데이터 영역을 직접 참조하고 갱신할 때 발생하는 결합도의 명칭을 쓰시오.",
    answer: ["공통 결합도", "Common Coupling"],
    explanation:
      "공통 결합도는 전역 변수의 변경이 이를 참조하는 모든 모듈에 파급되므로 시스템 유지보수를 어렵게 만듭니다.",
    difficulty: "MEDIUM",
    keywords: ["결합도", "공통결합도", "전역변수"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_049",
    subject: "소프트웨어설계",
    category: "모듈화",
    subCategory: "결합도",
    type: "SHORT_ANSWER",
    question:
      "모듈 간에 배열이나 레코드, 구조체 같은 자료구조 전체를 인자로 넘길 때 필요하지 않은 필드까지 전달되어 형성되는 결합도의 명칭을 쓰시오.",
    answer: ["스탬프 결합도", "Stamp Coupling"],
    explanation:
      "스탬프 결합도는 레코드의 포맷이나 일부 필드가 변경될 때 무관한 모듈까지 영향을 받을 수 있습니다.",
    difficulty: "MEDIUM",
    keywords: ["결합도", "스탬프결합도", "자료구조전달"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_050",
    subject: "소프트웨어설계",
    category: "모듈화",
    subCategory: "응집도",
    type: "SHORT_ANSWER",
    question:
      "모듈 내부의 모든 요소가 단 하나의 단일 목적(기능)만을 수행하기 위해 긴밀하게 구성된 가장 높고 이상적인 응집도의 명칭을 쓰시오.",
    answer: ["기능적 응집도", "Functional Cohesion"],
    explanation:
      "기능적 응집도는 최고 수준의 응집도입니다. 응집도 순서: 우연적 < 논리적 < 시간적 < 절차적 < 통신적 < 순차적 < 기능적 (우논시절통순기).",
    difficulty: "EASY",
    keywords: ["응집도", "기능적응집도", "단일기능"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_051",
    subject: "소프트웨어설계",
    category: "모듈화",
    subCategory: "응집도",
    type: "SHORT_ANSWER",
    question:
      "한 요소의 출력 결과가 다음 요소의 입력 데이터로 순차적으로 사용되는 요소들이 모여 있는 응집도의 명칭을 쓰시오.",
    answer: ["순차적 응집도", "Sequential Cohesion"],
    explanation:
      "순차적 응집도는 파이프라인처럼 이전 단계의 출력이 다음 단계의 입력이 되는 높은 수준의 응집도입니다.",
    difficulty: "MEDIUM",
    keywords: ["응집도", "순차적응집도", "출력입력연결"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_052",
    subject: "소프트웨어설계",
    category: "모듈화",
    subCategory: "응집도",
    type: "SHORT_ANSWER",
    question:
      "동일한 입력 데이터를 사용하여 서로 다른 기능을 수행하거나, 동일한 출력 데이터를 산출하는 요소들이 모인 응집도의 명칭을 쓰시오.",
    answer: [
      "통신적 응집도",
      "교환적 응집도",
      "Communication Cohesion",
      "Communicational Cohesion",
    ],
    explanation:
      "통신적(교환적) 응집도는 같은 자료구조나 파일을 입력받아 여러 작업을 수행하는 경우에 해당합니다.",
    difficulty: "MEDIUM",
    keywords: ["응집도", "통신적응집도", "교환적응집도"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_053",
    subject: "소프트웨어설계",
    category: "모듈화",
    subCategory: "응집도",
    type: "SHORT_ANSWER",
    question:
      "모듈 내부의 구성 요소들이 서로 아무런 관련성 없이 무작위로 한 모듈에 묶여 있는 가장 낮고 나쁜 응집도의 명칭을 쓰시오.",
    answer: ["우연적 응집도", "Coincidental Cohesion"],
    explanation:
      "우연적 응집도는 유지보수가 극히 어렵고 독립성이 전무하여 반드시 리팩토링해야 합니다.",
    difficulty: "EASY",
    keywords: ["응집도", "우연적응집도", "최저응집도"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_054",
    subject: "소프트웨어설계",
    category: "인터페이스",
    subCategory: "EAI",
    type: "SHORT_ANSWER",
    question:
      "기업 내 서로 다른 이기종 애플리케이션들을 중앙의 허브를 통해 연결하여 시스템 간 결합도를 낮추는 EAI 구축 방식의 명칭을 쓰시오.",
    answer: ["허브 앤 스포크", "Hub and Spoke", "허브앤스포크", "Hub & Spoke"],
    explanation:
      "허브 앤 스포크는 중앙 허브 장애 시 전체 장애(SPOF)가 발생할 수 있으나 유지보수와 확장이 용이합니다.",
    difficulty: "EASY",
    keywords: ["EAI", "허브앤스포크", "중앙허브"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_055",
    subject: "소프트웨어설계",
    category: "인터페이스",
    subCategory: "ESB",
    type: "SHORT_ANSWER",
    question:
      "웹 서비스 중심의 표준화된 버스를 기반으로 서비스들을 느슨하게 결합(Loose Coupling)하여 연계하는 미들웨어 아키텍처의 영문 약어를 쓰시오.",
    answer: ["ESB", "Enterprise Service Bus"],
    explanation:
      "ESB는 SOA(서비스 지향 아키텍처)의 핵심 미들웨어로, 메시지 라우팅, 프로토콜 변환, 이벤트 처리를 지원합니다.",
    difficulty: "MEDIUM",
    keywords: ["ESB", "미들웨어", "SOA"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_056",
    subject: "소프트웨어설계",
    category: "요구사항",
    subCategory: "분석기법",
    type: "SHORT_ANSWER",
    question:
      "시스템이 '무엇을(What)' 해야 하는지와 성능, 보안, 제약조건 등 '어떻게(How)' 동작해야 하는지를 기술할 때 전자에 해당하는 요구사항 유형의 명칭을 쓰시오.",
    answer: ["기능적 요구사항", "기능 요구사항", "Functional Requirements"],
    explanation:
      "기능적 요구사항은 시스템이 제공할 기능, 입출력을 다루며 비기능적 요구사항은 성능, 보안, 가용성, 신뢰성 등의 품질 특성을 다룹니다.",
    difficulty: "EASY",
    keywords: ["요구공학", "기능적요구사항", "비기능적요구사항"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_057",
    subject: "소프트웨어설계",
    category: "UI 설계",
    subCategory: "4대원칙",
    type: "SHORT_ANSWER",
    question:
      "사용자가 원하는 작업을 시스템이 정확하고 완전하게 수행할 수 있어야 한다는 UI 설계 4대 기본 원칙 중 하나의 명칭을 쓰시오.",
    answer: ["유효성", "Effectiveness"],
    explanation:
      "UI 4대 원칙은 직관성(누구나 쉽게 이해), 유효성(목표를 달성), 학습성(쉽게 배움), 유연성(요구를 수용)입니다. (직유학유)",
    difficulty: "MEDIUM",
    keywords: ["UI", "유효성", "4대원칙"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_058",
    subject: "소프트웨어설계",
    category: "UI 설계",
    subCategory: "4대원칙",
    type: "SHORT_ANSWER",
    question:
      "사용자가 UI를 별도의 설명 없이도 직관적으로 쉽게 이해하고 사용할 수 있어야 한다는 UI 설계 원칙의 명칭을 쓰시오.",
    answer: ["직관성", "Intuitiveness"],
    explanation:
      "직관성은 사용자가 사전 지식 없이도 조작법을 자연스럽게 알 수 있게 하는 인터페이스 원칙입니다.",
    difficulty: "EASY",
    keywords: ["UI", "직관성", "4대원칙"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_059",
    subject: "소프트웨어설계",
    category: "소프트웨어 아키텍처",
    subCategory: "4+1 뷰",
    type: "SHORT_ANSWER",
    question:
      "소프트웨어 아키텍처 4+1 뷰 모델에서 시스템의 정적 구조와 패키지, 클래스 관계를 표현하는 설계자 관점의 뷰 명칭을 쓰시오.",
    answer: ["논리 뷰", "Logical View", "논리적 뷰"],
    explanation:
      "아키텍처 4+1 뷰는 유스케이스 뷰를 중심으로 논리 뷰(설계자), 프로세스 뷰(통합자), 구현 뷰(개발자), 배포 뷰(시스템 엔지니어)로 구성됩니다.",
    difficulty: "HARD",
    keywords: ["4+1뷰", "논리뷰", "아키텍처뷰"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_060",
    subject: "소프트웨어설계",
    category: "럼바우 모델링",
    subCategory: "객체지향 분석",
    type: "SHORT_ANSWER",
    question:
      "럼바우(Rumbaugh) 객체지향 분석 3대 모델링 중 시스템의 데이터 흐름도(DFD)를 이용하여 처리 과정을 표현하는 모델링의 명칭을 쓰시오.",
    answer: ["기능 모델링", "기능적 모델링", "Functional Modeling"],
    explanation:
      "럼바우 분석 기법: 객체 모델링(ER 다이어그램/클래스 다이어그램) → 동적 모델링(상태 다이어그램) → 기능 모델링(DFD). (객동기)",
    difficulty: "MEDIUM",
    keywords: ["럼바우", "기능모델링", "DFD", "객동기"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_061",
    subject: "소프트웨어설계",
    category: "럼바우 모델링",
    subCategory: "객체지향 분석",
    type: "SHORT_ANSWER",
    question:
      "럼바우(Rumbaugh) 분석 기법에서 시스템의 정적 구조를 객체 다이어그램으로 가장 먼저 표현하는 핵심 모델링의 명칭을 쓰시오.",
    answer: ["객체 모델링", "객체적 모델링", "Object Modeling"],
    explanation:
      "럼바우 3단계 모델링 중 객체 모델링이 가장 중요하고 선행되는 단계입니다.",
    difficulty: "EASY",
    keywords: ["럼바우", "객체모델링", "정적구조"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_062",
    subject: "소프트웨어설계",
    category: "애자일",
    subCategory: "XP",
    type: "SHORT_ANSWER",
    question:
      "XP(eXtreme Programming)의 5대 핵심 가치 중 개발 과정에서의 의사소통, 피드백, 단순성, 존중과 함께 포함되는 나머지 하나의 가치 명칭을 쓰시오.",
    answer: ["용기", "Courage"],
    explanation:
      "XP 5대 가치는 '용단피의존' (용기, 단순성, 피드백, 의사소통, 존중)입니다. 리팩토링이나 빠른 요구 변경 수용에 용기가 필요합니다.",
    difficulty: "MEDIUM",
    keywords: ["XP", "5대가치", "용기", "Courage"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_063",
    subject: "소프트웨어설계",
    category: "애자일",
    subCategory: "스크럼",
    type: "SHORT_ANSWER",
    question:
      "스크럼에서 1~4주의 짧은 반복 개발 주기를 지칭하는 용어의 명칭을 쓰시오.",
    answer: ["스프린트", "Sprint"],
    explanation:
      "스프린트는 정해진 기간 동안 잠재적으로 출시 가능한 제품 증분을 만들어내는 이터레이션(반복 주기)입니다.",
    difficulty: "EASY",
    keywords: ["스크럼", "스프린트", "Sprint", "반복주기"],
    source: "정보처리기사 실기 표준",
  },
  {
    id: "MEMO_SE_064",
    subject: "소프트웨어설계",
    category: "인터페이스",
    subCategory: "REST",
    type: "SHORT_ANSWER",
    question:
      "HTTP URI를 통해 자원(Resource)을 명시하고 HTTP 메서드(GET, POST, PUT, DELETE)로 행위를 적용하는 웹 아키텍처 스타일의 명칭을 쓰시오.",
    answer: ["REST", "RESTful", "Representational State Transfer"],
    explanation:
      "REST는 자원, 행위, 표현의 3요소로 구성되며 무상태성(Stateless)과 캐시 가능성 등의 특징을 가집니다.",
    difficulty: "EASY",
    keywords: ["REST", "RESTful", "웹아키텍처"],
    source: "정보처리기사 실기 표준",
  },
];
