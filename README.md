# 📱 정보처리기사 실기 트레이너 (PassMaster)

> **출퇴근 지하철 10분, 한 손으로 완성하는 정보처리기사 실기 합격 플랫폼**  
> React Native · TypeScript · Expo SDK 57 · Zustand · Offline-First Hybrid Architecture  
> **현재 버전**: `v1.3.1` (Version Code: 9)

<br />

## 📖 프로젝트 개요 (Overview)

**정보처리기사 실기 트레이너**는 지하철 출퇴근 시간 등 이동 중에도 수험생이 자투리 시간을 활용하여 합격선에 도달할 수 있도록 기획·개발된 **모바일 퍼스트(Mobile-First) 자격증 학습 애플리케이션**입니다.

터널이나 통신 음영 지역에서도 네트워크 끊김 없이 100% 동작하는 **오프라인 퍼스트(Offline-First) 아키텍처**를 기반으로 하며, **10종 독립 프로그래밍 문제 생성 엔진**, **전 과목 이론 및 고빈출 두음 암기 비법**, **Google Gemini 1:1 맞춤형 AI 수험 튜터(지수 백오프 & 모델 자동 폴백)**를 탑재하여 완성도 높은 학습 경험을 제공합니다.

---

## ✨ 핵심 기능 (Key Features)

### 1. 실기 시험 특화 퀴즈 & 스마트 주관식 채점 엔진

- **다양한 실기 문제 유형 지원**: 단답형 키워드, C/Java/Python 코드 실행 결과 추적, SQL 쿼리 빈칸 채우기, 4지선다형 완벽 대응
- **동의어 및 유연 채점 엔진**:
  - 공백 정규화, 대소문자 무시, 복수 동의어 판정
  - 주관식 용어 시험 특성을 고려한 **1글자 오탈자 허용(Levenshtein Distance)** 및 외래어 표기 편차 유연 처리
- **모바일 최적화 코드 뷰어**: 스마트폰 화면에서도 가로 스크롤과 모노스페이스 행 번호를 지원하는 다크 테마 코드 블록
- **경쾌한 햅틱 피드백**: 정답/오답/선택 시 손끝으로 전해지는 실감 나는 진동 피드백(`expo-haptics`)

### 2. 10종 도메인 프로그래밍 자동 생성 엔진 (v1.3.0)

서버 없이도 기기 자체에서 무제한으로 고품질 기출 변형 프로그래밍 문제를 생산하는 **자체 알고리즘 생성 엔진**을 탑재했습니다.

- **10종 전문 생성기 라인업**:
  1. `LoopOutputGenerator`: for / while / do-while 루프 반복 출력 (while+continue 무한루프 방지 및 교차 스텝)
  2. `ArrayTraceGenerator`: 1차원/2차원 배열 포인터 인덱싱 및 누적 합 연산
  3. `FunctionReturnGenerator`: 함수 호출, 매개변수 전달(값/참조에 의한 호출), 반환값 추적
  4. `RecursiveCallGenerator`: 피보나치, 팩토리얼, 거듭제곱 등 재귀 호출 스택 메모리 추적
  5. `StructClassGenerator`: C 구조체 멤버 접근 및 Java 클래스 객체지향/상속/메서드 오버라이딩
  6. `PointerResultGenerator`: C 언어 다중 포인터, 역참조(`*`), 주소 연산자(`&`) 결과 추적
  7. `NestedLoopGenerator`: 2중 중첩 반복문, 2차원 행렬 순회, 역삼각 패턴 및 break/continue 분기
  8. `StringOperationGenerator`: 문자열 인덱싱, 슬라이싱, 포맷팅, 결합 연산
  9. `BlankCompletionGenerator`: C/Java/Python 핵심 구문 및 키워드 빈칸 채우기
  10. `BugFindingGenerator`: 코드 결함/논리 오류 추적 및 디버깅
- **엔진 무결성 & 안전 장치**:
  - **결정론적 난수 생성기 (`seedRandom`)**: 동일 시드에서 100% 동일한 문제 재현 보장
  - **구조 핑거프린트 (`fingerprint.ts`)**: 지문 문구가 달라도 코드 알고리즘 구조가 같으면 중복 출제를 차단하는 유사도 검증
  - **반복 출제 방지 이력 추적기 (`historyTracker.ts`)**: 사용자가 최근 푼 패턴을 기억하여 다양성 극대화
  - **4단계 보안 및 정답 검증기 (`QuestionValidator`)**: `system()`, `eval()`, 소켓 등 악성 코드 패턴 원천 차단
  - **자가 진단 및 복구 엔진 (`diagnostics.ts`)**: 생성된 문제의 이상 여부를 실시간 검사하고 자동 복구/폴백
- **개발자/관리자 벤치마크 모달 (`ProgrammingAdminModal`)**:
  - 10종 생성기 동작 상태 모니터링, 구조 지문 중복률 측정, 다양성 벤치마크 20회 연속 스트레스 테스트 및 Gemini 생성 후보 실시간 검토 기능

### 3. 전 과목 이론 연계 학습 & 고빈출 두음 암기 비법 탭 (v1.3.0)

문제 풀이와 기본서 이론이 분리되지 않도록 **[이론 학습] 전용 탭**을 신설했습니다.

- **전 과목 핵심 이론 카드 (`TheoryCard`)**:
  - 5개 전 과목(소프트웨어설계, 소프트웨어개발, 데이터베이스구축, 프로그래밍언어활용, 정보시스템구축관리) 망라
  - 비전공자도 단번에 이해할 수 있는 **실생활 비유 설명**
  - 시험에 직결되는 **핵심 개념 불릿 포인트** 및 **출제 포인트 요약**
  - **이론 연계 문제 즉시 풀기**: 이론을 읽고 [관련 기출 풀기] 버튼을 누르면 해당 이론과 매칭된 문제 5개를 즉시 추출하여 실전 훈련
- **고빈출 두음 암기 비법 카드 (`MnemonicCard`)**:
  - 실제 수험생들이 가장 많이 헷갈려하는 **20종 이상의 필수 암기 두음** 수록
  - GoF 디자인 패턴(생성 5종/구조 7종), 모듈 결합도/응집도 강약 순서, DB 정규화(1NF~5NF), 트랜잭션 ACID 특성, DB 이상 현상, 회복/병행제어 기법, OSI 7계층, 보안 3대 요소(CIA), 대칭키/비대칭키 암호화 등
  - **리듬 암기 문구**와 시험장에서 파놓는 **함정 주의 포인트** 제공

### 4. Google Gemini 1:1 맞춤형 AI 수험 튜터 (v1.3.1)

- **문제 컨텍스트 기반 심층 과외**: 문제 지문, 소스코드, 정답, 수험생의 오답 및 속한 단원 위치를 종합 분석하여 1:1 개인 과외 제공
- **수험생 맞춤 퀵 프롬프트 3종**:
  - 💡 _비전공자 눈높이의 쉬운 개념과 비유 설명_
  - 🔍 _수험생이 작성한 오답의 함정과 착각한 이론 분석_
  - 🧠 _시험장에서 1초 만에 맞출 수 있는 핵심 두문자 암기 공식_
- **「모른다」 선택 시 교재 단원 펼침 모드**: 오답 분석을 생략하고 교재 챕터를 펼치듯 연관 개념·공식·기출 맥락을 체계적으로 강의
- **튜터 대화 스레드 저장 (`@tutor_threads`)**: 문제별 과외 대화 내역이 로컬에 영구 보관되어 이전 대화 이어보기 가능
- **지수 백오프 & 모델 자동 폴백 엔진 (v1.3.1)**:
  - **일시적 오류(`408`, `429`, `500`, `502`, `503`, `504`) 자동 재시도**: 동일 모델에 대해 약 1초 → 2초 → 4초 지수 백오프와 0~300ms Jitter를 적용하여 최대 3회 재시도
  - **모델 자동 폴백**: 동일 모델 3회 재시도 실패 시 다음 가용 모델로 자동 전환
  - **터미널 인증 에러(`400`, `401`, `403`) 즉시 안내**: 무의미한 재시도 없이 명확한 키 검증 안내 제공
  - **미지원 모델(`404`) 즉시 건너뛰기**: 대기 시간 없이 다음 후보 모델로 즉시 전환
  - **구글 최신 `AQ.` 키 규격 완벽 대응**: 최신 AI Studio 키 규격인 `x-goog-api-key` 헤더 전송 및 따옴표/공백 자동 정제(`cleanApiKey`)
  - **종료 모델 정리**: 구글에서 서비스 종료된 `gemini-1.5`, `gemini-2.0`을 완전 제거하고 `gemini-2.5-flash`, `gemini-2.5-pro` 등 안정 모델 중심 정비

### 5. 학습 데이터 분석 및 반복 회독 시스템

- **에빙하우스 망각 곡선 복습 큐 (`reviewQueue`)**: 수험생의 정답/오답 주기와 망각 곡선에 기반하여 오늘 복습해야 할 문제를 자동 선별
- **안 푼 문제 집중 풀기 (`getUnattemptedQuestions`)**: 전체 문제 은행 중 아직 한 번도 풀지 않은 신규 문제만 골라 빠르게 회독
- **오답노트 & 북마크 다시 풀기**: 전체 오답, 최근 오답, 최다 오답, 헷갈린 문제 필터링 및 **[이 목록 다시 풀기]** 지원
- **동적 학습 통계 & 취약 단원 분석**:
  - `QuizAttempt` 원천 데이터를 기반으로 과목별/단원별 정답률 및 7일간 학습 추이 바 차트 제공
  - 정답률 70% 미만의 취약 단원을 자동으로 탐지하여 보완 학습 유도
- **학습 스트릭(Streak) 잔디 심기**: 매일 연속 출석 체크 및 일일 목표 달성률 게이지

### 6. 지하철 맞춤형 오프라인-퍼스트 & 갤럭시 UI/UX 최적화

- **100% 로컬 독립 실행**: 번들 정적 문제 + AsyncStorage 캐시를 결합하여 데이터 통신이 불가능한 지하철 터널에서도 0초 로딩
- **스마트 하이브리드 캐시**: 네트워크 연결 시 Supabase 클라우드로부터 신규 기출 패키지를 백그라운드에서 자동 병합
- **오프라인 싱크 큐 (`@offline_sync_queue`)**: 통신 두절 상태에서 푼 학습 이력을 큐에 적재했다가 온라인 복귀 시 서버로 일괄 전송
- **갤럭시 플래그십 & 키보드 최적화**:
  - 안드로이드 시스템 3버튼 소프트키(`|||`, `O`, `<`)에 대응하는 하단 안전 마진(Safe Area) 확보
  - AI 튜터 질의 시 가상 키보드가 올라와도 입력창이 가려지거나 뒤 화면이 투과되지 않는 정밀 레이아웃 설계

---

## 🏗 시스템 아키텍처 (Architecture)

```
[UI / Presentation Layer]
    ├── HomeScreen (스트릭, 목표 달성률, 5분 퀵 퀴즈, 신규 문제 동기화, Gemini 암기 생성)
    ├── TheoryStudyScreen (전 과목 핵심 이론 카드, 20+ 고빈출 두음 암기 비법, 연계 기출 풀기)
    ├── QuizScreen (단답/코드/SQL 렌더링, Levenshtein 유연 채점, Gemini 1:1 과외 튜터 모달)
    ├── WrongNoteScreen (오답 유형 필터링, 망각 곡선 복습 큐, 안 푼 문제 모아 풀기)
    ├── StatisticsScreen (7일 학습 추이 바 차트, 과목별 취약 단원 탐지)
    └── SettingsScreen (다크모드/햅틱 설정, Gemini API Key 안전 등록/검증, 프로그래밍 엔진 벤치마크)
          │
          ▼
[State Management Layer]
    ├── Zustand (useQuizStore, useUserStore, useSettingsStore, 세션 상태 동기화)
          │
          ▼
[Service & Engine Layer] (비즈니스 로직 격리)
    ├── ProgrammingEngine (10종 도메인 생성기, 시드 난수, 구조 핑거프린트, 이력 추적, 자가 복구)
    ├── GeminiService (지수 백오프+Jitter 재시도, 가용 모델 자동 폴백, AQ./AIza 이중 호환)
    ├── QuestionValidator (정답 일치성, 최소 코드 행수, 악성 패턴 블랙리스트 필터링)
    └── QuestionSyncService (Supabase 클라우드 동기화, 오프라인 싱크 큐 관리)
          │
          ▼
[Repository Layer]
    ├── QuestionRepository (정적 문제 + 캐시 문제 + 안 푼 문제 필터 + 이론 연계 문제 검색)
    ├── AttemptRepository (QuizAttempt 학습 이력 저장, 정답률/취약단원 통계 계산)
    └── BookmarkRepository (문제 북마크 토글 및 영구 보관)
          │
          ▼
[Data & Storage Layer]
    ├── Static Bundle: src/data/questions/ (정적 기출 80제 + 암기 은행 56제)
    ├── Theory Data: src/data/theory/ (5개 전 과목 핵심 이론 + 20종 고빈출 두음 데이터)
    ├── Local Storage: AsyncStorage (Attempts, Bookmarks, Cached Questions, Sync Queue, Tutor Threads)
    └── Cloud Backend: Supabase (PostgreSQL / Auth / Realtime Cloud Sync)
```

---

## 🛠 기술 스택 (Tech Stack)

| 분류 | 기술 스택 |
| :--- | :--- |
| **Framework** | React Native (Expo SDK 57), TypeScript 6.0 |
| **State Management** | Zustand 5.0 |
| **Storage (Offline-First)** | `@react-native-async-storage/async-storage` (JSON Fallback 내구성 보강) |
| **Cloud Backend** | Supabase (`@supabase/supabase-js 2.115.0`) |
| **LLM & AI** | Google Gemini Generative Language API (Exponential Backoff + Model Fallback) |
| **UI Components** | React Native Core, `lucide-react-native`, `react-native-svg` |
| **Native APIs** | `expo-haptics`, `expo-status-bar`, `expo-linear-gradient` |
| **Testing & CI** | `tsx` (자체 유닛 테스트, 프로그래밍 엔진 회귀 테스트, Gemini 재시도 검증) |
| **Build & Deploy** | EAS Build (Expo Application Services - Android Standalone APK) |

---

## 🧪 테스트 및 품질 보증 (Testing & Quality Assurance)

코드 수정 시 즉각적인 회귀 검증이 가능하도록 3종의 전용 자동화 테스트 스위트와 타입 검사를 구축했습니다.

```bash
# 1. TypeScript 정적 타입 검사 (에러 0건 보장)
npm run typecheck

# 2. 핵심 데이터 무결성 및 복습 큐/이론 연계 자체 테스트
npm test

# 3. 10종 프로그래밍 문제 생성 엔진 10대 시나리오 전수 검증
npm run test:programming

# 4. Gemini 503 재시도, 지수 백오프, 모델 폴백, 401 즉시 종료 검증
npm run test:gemini
```

### 테스트 통과 세부 항목
- **정적 문제 및 암기 은행 무결성**: 문제 ID 중복 없음, 필수 메타데이터(과목, 유형, 지문, 정답, 해설) 100% 검증
- **이론 연계 검색**: 0개 매칭 시 보충, limit 도달 매칭, 소수 매칭 시 보충 동작 검증
- **프로그래밍 엔진 10대 검증**:
  - while/continue 무한루프 차단 및 alternate 분기 검증
  - 언어별(C, Java, Python) 문법 및 타입 일치성
  - 빈칸 완성형(`BLANK_COMPLETION`) 빈칸 기호(`[  빈칸  ]`) 존재 무결성
  - 동일 지문/동일 코드 구조 핑거프린트 중복 차단
  - 벤치마크 실행 후 사용자 출제 이력 비오염 격리 검증
- **Gemini 엔진 검증**:
  - 503 발생 시 1초/2초/4초 지수 백오프 재시도 후 성공 확인
  - 503 지속 시 다음 모델(model-2)로 자동 전환 확인
  - 401 수신 시 재시도 없이 1회 호출 후 즉시 종료 확인
  - 404 수신 시 재시도 없이 즉시 다음 모델 전환 확인
  - 콘솔 로그 및 오류문 내 API Key 마스킹([REDACTED]) 검증

---

## 📱 주요 화면 안내 (App Screens)

1. **홈 화면 (Home)**: 오늘의 학습 목표, 연속 출석 잔디, [5분 퀵 퀴즈], 오프라인/온라인 동기화 상태 배너, Gemini 온라인 암기 문제 생성 버튼
2. **이론 학습 탭 (Theory)**:
   - 전 과목 핵심 이론 카드 (실생활 비유, 핵심 개념, 출제 포인트 요약, 연계 기출 풀기 버튼)
   - 20종 고빈출 두음 암기 비법 카드 (GoF, 결합도, 응집도, 정규화 등 리듬 암기 및 함정 주의)
3. **문제 풀이 화면 (Quiz)**:
   - C/Java/Python 모노스페이스 다크 코드 뷰어
   - 실시간 주관식/객관식 정답 판정 (동의어 및 1글자 오탈자 유연 채점)
   - 문제 풀이 후 즉시 상세 해설 및 **[✨ Gemini AI 튜터에게 이 문제 과외받기]** 모달 제공
4. **오답노트 & 복습 (Wrong Note)**:
   - 전체 오답 / 최근 오답 / 최다 오답 / 헷갈린 문제 / 북마크 필터
   - 에빙하우스 망각 곡선 기반 **[오늘의 복습 큐]** 및 **[안 푼 문제 모아 풀기]** 지원
5. **학습 통계 (Statistics)**:
   - 7일간 일별 풀이량 바 차트
   - 5개 과목별 정답률 게이지 및 정답률 70% 미만 취약 단원 레이더 분석
6. **설정 화면 (Settings)**:
   - 다크 모드 토글, 햅틱 피드백 설정, 일일 목표 문제 수 조정
   - 구글 AI Studio Gemini API Key 안전 등록/검증 및 키 안내 링크
   - **프로그래밍 문제 생성 엔진 관리자 모달** (10종 생성기 동작 상태, 구조 중복률, 다양성 벤치마크 테스트)

---

## 🚀 개발 환경 및 빌드 (Getting Started)

### 1. 패키지 설치

```bash
npm install
```

### 2. 개발 서버 실행 (터널 모드 지원)

```bash
# 글로벌 터널 모드 (외부망 및 스마트폰 실기기 테스트)
npm start
# 또는 npm run tunnel
```

### 3. 안드로이드 단독 APK 빌드 (EAS Cloud Build)

프로젝트 루트의 `eas.json`에 `preview` 프로필(APK 빌드)이 사전 구성되어 있습니다.

```powershell
# EAS 환경 변수를 지정하고 단독 APK 빌드 실행
cmd.exe /c npx --package eas-cli eas build -p android --profile preview --non-interactive
```

---

## 💡 주요 문제 해결 경험 (Troubleshooting)

1. **지하철 음영 지역 통신 단절과 데이터 보존**
   - 네트워크 연결에 의존하지 않도록 130개 이상의 기출/암기 문제를 번들에 내장하고, 서버에서 추가로 내려받은 문제는 로컬 캐시(`@cached_server_questions`)에 누적 보관하는 **스마트 하이브리드 아키텍처**를 적용했습니다.
   - 오프라인 상태에서 푼 풀이 이력은 `@offline_sync_queue`에 안전하게 적재되어 온라인 복귀 시 유실 없이 서버로 일괄 전송됩니다.
2. **구글 Gemini 503(일시적 과부하) 및 404 모델 지원 중단 대응**
   - LLM 서버 과부하(503) 시 즉시 실패하던 문제를 해결하기 위해 `408, 429, 500, 502, 503, 504`를 일시적 오류로 정의하고, **1초 → 2초 → 4초 지수 백오프(Exponential Backoff) + Jitter** 재시도를 구현했습니다.
   - 3회 재시도가 모두 실패하면 다음 가용 모델로 자동 전환되며, 구글에서 서비스 종료된 모델(1.5, 2.0 계열)을 목록에서 사전 배제하여 안정적인 튜터링을 제공합니다.
3. **최신 Google AI Studio `AQ.` 키 인증 호환성**
   - 구글의 2026년 최신 인증키 규격(`AQ.`)은 URL 쿼리스트링(`?key=`) 전달 시 401 오류를 반환하므로, 표준 `x-goog-api-key` HTTP 헤더로 전송 방식을 통일하고, 복사 시 섞여 들어갈 수 있는 따옴표와 보이지 않는 공백을 자동 정제하는 `cleanApiKey`를 구현했습니다.
4. **프로그래밍 문제 자동 생성 시 구조적 중복 및 무한루프 방지**
   - 단순 변수명 변경만으로는 기출 변형의 질을 높일 수 없으므로, AST 수준의 알고리즘 패턴을 지문화하는 **구조 핑거프린트(`fingerprint.ts`)**를 도입하여 지문이 달라도 알고리즘이 겹치면 즉시 다른 생성기로 재할당하도록 설계했습니다.
   - `while` 및 `do-while` 반복문에서 `continue`가 증감식을 건너뛰어 무한 루프에 빠지는 문제를 차단하는 전용 안전 가드를 구축했습니다.
5. **안드로이드 3버튼 내비게이션 바 및 가상 키보드 겹침 해결**
   - 갤럭시 기기의 3버튼 소프트키(`|||`, `O`, `<`) 사용 환경에서 하단 액션 버튼이 가려지지 않도록 플랫폼별 하단 안전 마진(Safe Area)을 확보했습니다.
   - AI 튜터 대화 시 소프트 키보드가 올라올 때 모달 창이 위로 밀려 뒤 화면이 비치던 문제를 해결하기 위해 `softwareKeyboardLayoutMode: "resize"` 및 정밀 키보드 리스너 높이 보정을 적용했습니다.

---

## 📄 라이선스 (License)

MIT License.
