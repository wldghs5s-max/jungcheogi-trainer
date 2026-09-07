# 📱 정보처리기사 실기 트레이너 (PassMaster)

> **출퇴근 지하철 10분, 한 손으로 완성하는 정보처리기사 실기 합격 플랫폼**  
> React Native · TypeScript · Expo · Zustand · Offline-First Hybrid Architecture

<br />

## 📖 프로젝트 개요 (Overview)

**정보처리기사 실기 트레이너**는 지하철 출퇴근 시간 등 이동 중에도 수험생이 효과적으로 학습할 수 있도록 기획·개발된 **모바일 퍼스트(Mobile-First) 자격증 학습 애플리케이션**입니다.

터널이나 음영 지역에서도 네트워크 끊김 없이 100% 동작하는 **오프라인 퍼스트(Offline-First) 아키텍처**와, 서버 연결 시 새로운 기출문제를 스마트하게 내려받는 **하이브리드 동기화 시스템**을 갖추고 있습니다.

---

## ✨ 핵심 기능 (Key Features)

### 1. 실기 시험 특화 퀴즈 엔진
- **유형별 맞춤 학습**: 단답형 키워드, C/Java/Python 코드 실행 결과 추적, SQL 쿼리 빈칸 채우기, 4지선다형 지원
- **엄밀한 채점 로직**: 공백 정규화, 대소문자 무시, 복수 동의어 정답 판정 (`checkAnswer` 비즈니스 로직 분리)
- **모바일 코드 뷰어**: 스마트폰 화면에서도 가로 스크롤과 모노스페이스 행 번호를 지원하는 다크 테마 코드 뷰어
- **경쾌한 햅틱 피드백**: 정답 및 오답에 따른 즉각적인 진동 피드백(`expo-haptics`)

### 2. 지하철 맞춤형 오프라인 & 스마트 하이브리드 캐시
- **100% 로컬 독립 실행**: 앱 번들 정적 문제 은행과 AsyncStorage 캐시를 통해 인터넷이 끊긴 지하철에서도 0초 로딩
- **클라우드 신규 문제 동기화**: 앱 재설치 없이도 클라우드 서버(Supabase)로부터 최신 기출문제 패키지를 자동 다운로드
- **스마트 알고리즘 문제 생성기**: 최신 기출 변형 문제를 즉석에서 번들 단위로 동적 생성하여 무제한 학습 제공
- **오프라인 싱크 큐 (`@offline_sync_queue`)**: 오프라인 상태에서 푼 풀이 기록을 큐에 저장했다가 네트워크 복구 시 서버로 일괄 전송

### 3. 학습 데이터 분석 및 반복 회독 시스템
- **오답노트 & 북마크**: 전체 오답, 최근 오답, 최다 오답, 북마크 필터링 및 **[이 목록 다시 풀기]** 지원
- **동적 통계 분석**: `QuizAttempt` 원천 데이터를 기반으로 과목별/단원별 정답률 및 7일간 학습 추이 바 차트 제공
- **취약 단원 자동 탐지**: 정답률 70% 미만의 취약 단원을 자동으로 분석하여 보완 학습 유도
- **학습 스트릭(Streak)**: 매일 연속 출석 잔디 심기 및 일일 목표 달성률 게이지

### 4. Google Gemini 기반 1:1 맞춤형 AI 수험 튜터
- **문제 컨텍스트 기반 맞춤 과외**: 문제 지문, 코드, 수험생의 오답 및 실제 정답을 Gemini LLM에 전달하여 고품질 1:1 해설 제공
- **원터치 퀵 질문 3종 세트**:
  - 💡 *비전공자 눈높이의 쉬운 개념과 비유 설명*
  - 🔍 *수험생이 작성한 오답의 함정과 착각한 이론 분석*
  - 🧠 *시험장에서 1초 만에 맞출 수 있는 핵심 두문자 암기 공식*
- **자유 질의응답 채팅**: 평소 책으로 독학하듯 추가적인 궁금증을 실시간으로 자유 대화
- **안전한 로컬 키 관리**: 사용자의 Gemini API Key를 스마트폰 로컬 스토리지에 안전하게 보관

### 5. 갤럭시 플래그십 최적화 UI/UX
- 한 손 조작 최적화 (52dp 이상의 큼직한 터치 영역)
- 안드로이드 시스템 3버튼(소프트키) 및 제스처 바에 완벽 대응하는 하단 안전 마진 설계
- 배터리 절약과 눈의 피로를 덜어주는 네이티브 다크 모드 완벽 지원

---

## 🏗 시스템 아키텍처 (Architecture)

```
[UI / Presentation Layer]
    ├── HomeScreen (스트릭, 일일 목표, 5분 퀵 퀴즈, 신규 문제 동기화)
    ├── QuizScreen (단답/코드추적/SQL 렌더링, 햅틱 반응, 즉시 해설)
    ├── WrongNoteScreen (오답 필터링 & 묶음 다시 풀기)
    ├── StatisticsScreen (7일 학습 추이, 취약 단원 분석)
    └── SettingsScreen (다크모드, 햅틱 토글, 클라우드 연동 상태)
          │
          ▼
[State Management Layer]
    ├── Zustand (UI 세션, 현재 퀴즈 진행 상태, 테마 설정 관리)
          │
          ▼
[Repository & Service Layer] (관심사 철저 분리)
    ├── QuestionRepository (정적 문제 + 서버 캐시 문제 스마트 병합)
    ├── AttemptRepository (QuizAttempt 원천 이력 저장 및 통계 계산)
    ├── BookmarkRepository (문제 북마크 토글)
    └── QuestionSyncService (클라우드 동기화 & 동적 문제 생성 엔진)
          │
          ▼
[Data & Storage Layer]
    ├── Static Bundle: src/data/questions/ (검증된 정적 기출 문제)
    ├── AsyncStorage: @quiz_attempts, @bookmarks, @cached_server_questions
    └── Cloud Backend: Supabase (PostgreSQL / Auth / Realtime)
```

---

## 🛠 기술 스택 (Tech Stack)

| 분류 | 기술 |
| :--- | :--- |
| **Framework** | React Native (Expo SDK 57), TypeScript |
| **State Management** | Zustand |
| **Local Storage** | AsyncStorage (Offline-first architecture) |
| **Cloud Backend** | Supabase (`@supabase/supabase-js`) |
| **UI Components** | React Native Native Components, Lucide React Native, React Native SVG |
| **Device Native APIs** | Expo Haptics, Expo Status Bar, Expo Linear Gradient |
| **Build & Deploy** | EAS Build (Android Standalone APK) |

---

## 📱 실제 화면 구성 (Screenshots)

* **홈 대시보드**: 오늘의 목표, 연속 학습 스트릭, [5분 퀵 퀴즈], 클라우드 동기화 배너
* **문제 풀이 화면**: C/Java/Python 모노스페이스 코드 뷰어, 실시간 정답 판정, 상세 해설 카드
* **오답노트 & 북마크**: 틀린 문제만 모아서 원터치로 다시 풀기 세션 진입
* **학습 통계**: 최근 7일 학습량 바 차트 및 단원별 취약점 레이더 분석

---

## 🚀 시작하기 (Getting Started)

### 1. 패키지 설치
```bash
npm install
```

### 2. 개발 서버 실행 (글로벌 터널 모드)
```bash
npm start
# 또는 npx expo start --tunnel
```

### 3. 안드로이드 단독 APK 빌드
```bash
$env:EAS_NO_VCS="1"; npx eas-cli build --platform android --profile preview
```

---

## 💡 문제 해결 경험 (Troubleshooting)

1. **지하철 음영 지역에서의 네트워크 단절 문제**
   - 네트워크 연결에 의존하지 않도록 문제를 번들에 내장하고, 서버에서 추가로 내려받은 문제는 로컬 캐시(`@cached_server_questions`)에 누적 보관하는 **스마트 하이브리드 아키텍처**를 설계하여 100% 오프라인 동작을 달성했습니다.
2. **안드로이드 3버튼 내비게이션 바 겹침 현상**
   - 갤럭시 기기의 3버튼 소프트키(`|||`, `O`, `<`) 사용 환경에서 하단 액션 버튼이 가려지는 문제를 발견하고, `Platform.OS === 'android'` 분기 처리를 통해 하단 안전 여백을 40dp로 확장하여 터치 간섭을 완벽히 해결했습니다.
3. **외부 5G망에서의 실시간 개발 및 테스트 환경 구축**
   - 로컬 공유기 IP 기반 개발 서버의 한계를 극복하기 위해 `@expo/ngrok` 기반 터널링 아키텍처를 도입하여 외부망 및 지하철에서도 실기기 테스트를 원활하게 진행했습니다.

---

## 📄 라이선스 (License)
MIT License.
