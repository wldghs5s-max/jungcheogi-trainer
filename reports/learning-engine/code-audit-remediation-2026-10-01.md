# 외부 독립 코드 감사 검증 및 런타임 하드닝 최종 보고서

- **작성 일자**: 2026-10-01
- **감사 기준**: Google AI Studio 외부 독립 코드 감사 결과 항목 대조 및 실증
- **검증 환경**: Node.js / React Native (Expo v57) / TypeScript 6.0
- **데이터 무결성**: 총 900문항 (데이터 수정 0건, 원본 100% 보존)

---

## 1. 개요 및 최종 원칙

본 작업은 외부 감사 보고서의 권고 사항을 맹목적으로 수용하여 코드를 무분별하게 대규모 개편하는 것을 지양하고, **실제 현재 코드베이스에서 재현 가능하거나 입증된 결함만을 선별하여 최소한의 안전한 가드로 보강**하는 모바일 앱 최종 안정화 단계입니다.

### [AI Tutor 및 독립 검증 핵심 원칙]
```text
저장 정답은 진실의 근거가 아니다.
기존 해설도 진실의 근거가 아니다.
AI도 완벽하지 않다.
```

```text
문제 지문 + 코드 / 조건
        ↓
AI Blind 독립 풀이 (저장 정답 및 기존 해설 완전 차단)
        ↓
independentAnswer 도출
        ↓
로컬 앱(checkAnswer & Normalization)이 storedAnswer와 대조
        ↓
[일치] → 정상 오답 해설 (또는 USER_CORRECT)
[불일치] → QUESTION_SUSPECT (기존 해설 차단, 오답/약점 누적 격리)
[불확실] → VERIFICATION_UNCERTAIN (안전 안내문 처리)
```

---

## 2. 실제 수정된 핵심 항목

### 2.1 H-01 (P0): AI 검증 앵커링 위험 해결 (Blind Independent Solving)
- **실제 문제였는가?**: **예 (입증됨)**. 기존 `buildVerificationPrompt`에 `storedAns`와 `question.explanation`이 프롬프트 본문에 그대로 포함되어 있어, "맹신하지 말라"는 지침에도 불구하고 LLM이 저장된 답안에 인지적으로 종속(앵커링)되어 잘못된 정답을 사후 정당화할 위험이 상존했습니다.
- **재현 여부**: 프롬프트 문자열 감사 시 `저장된 정답: ...`, `기존 해설(참고용): ...` 필드가 명확히 확인됨.
- **수정 조치**:
  1. `buildVerificationPrompt`에서 `storedAns`와 `explanation`을 완전히 삭제. 오직 `과목/단원`, `문제 유형`, `문제 지문`, `코드 블록`, `수험생 답안`만 전달.
  2. AI의 역할은 오직 문제와 코드를 직접 풀어서 `independentAnswer`, `confidence`, `reason`, `isAmbiguous`만 JSON으로 반환하도록 제한.
  3. `AIVerifierService.verifyGrading`에서 AI가 도출한 `independentAnswer`를 **로컬 앱의 정밀 채점기(`checkAnswer`)를 통해 `storedAnswer`와 대조**:
     - `isIndependentMatch === true`: AI가 독립적으로 푼 답이 저장 정답과 일치하므로 신뢰 확립 → `USER_WRONG` (또는 `USER_CORRECT`).
     - `isIndependentMatch === false`: AI가 독립적으로 푼 답이 저장 정답과 충돌 → `QUESTION_SUSPECT` 마킹 및 `AttemptRepository.markAttemptSuspect`로 오답 통계 격리.
     - `confidence === 'LOW'`: AI 스스로 확신 부족 → `VERIFICATION_UNCERTAIN`.

### 2.2 H-02 (P0): AITutor Ghost Response 및 Streaming 동시성 방어
- **실제 문제였는가?**: **예 (입증됨)**. 사용자가 질문 A를 던진 뒤 스트리밍 중이거나 로딩 중인 상태에서 빠르게 질문 B를 터치하면, `abortControllerRef.current.abort()`는 호출되지만 React state `messages` 배열 안에 미완료/빈 채 남아있던 질문 A의 `tutorPlaceholder`가 정리되지 않고 질문 B 아래에 유령 말풍선(Ghost Bubble)으로 잔존할 수 있었습니다.
- **재현 여부**: `messages` 상태 갱신 로직에서 미완료 `tutorPlaceholder` 제거 누락 확인.
- **수정 조치**:
  1. `pendingTutorIdRef` 및 `pendingUserIdRef` 도입으로 현재 비동기 진행 중인 튜터/유저 요청 ID 추적.
  2. 새로운 `handleAsk` 호출 시, 이전 미완료 요청이 존재하면 네트워크 `abort()`와 동시에 `messages` 상태에서 해당 미완료 placeholder 및 빈 튜터 버블을 선별 제거. (이미 정상 완료된 이전 대화는 100% 보존)
  3. 스트리밍 `onChunk`, 완료 콜백, `catch` 에러 블록에 `pendingTutorIdRef.current !== tutorId` 가드를 배치하여 stale chunk나 abort 에러가 현재 메시지를 덮어쓰지 못하도록 차단.

### 2.3 C-01 (P1): ProgrammingEngine 언어 제약 조건 안전 가드
- **실제 문제였는가?**: **부분적 잠재 위험 입증**. 개별 generator의 `generate()` 메서드가 `context.targetLanguage`를 지원 여부 확인 없이 `context.targetLanguage || this.pickOne(...)` 형태로 무조건 수용하고 있었습니다. 만약 미지원 언어가 context로 유입될 경우 런타임 오류나 템플릿 미스매치가 발생할 수 있었습니다.
- **수정 조치**:
  1. `BaseGenerator`에 `protected resolveLanguage(context, rng)` 표준 헬퍼 메서드 신설: `context.targetLanguage`가 요청되었더라도 `this.supportedLanguages.includes(...)`를 엄격히 검증하고, 미지원 언어일 경우 지원 언어 풀 내에서 안전하게 재선택.
  2. 9대 전 세부 generator(`ArrayTrace`, `BlankCompletion`, `BugFinding`, `FunctionReturn`, `LoopOutput`, `NestedLoop`, `RecursiveCall`, `StringOperation`, `StructClass`)를 `this.resolveLanguage()`로 전면 교체.
  3. `ProgrammingEngine.generateBundleSync` 및 `generateQuestion`의 폴백 generator 선택 시 `targetLanguage` 지원 여부 검증 가드 추가.

### 2.4 M-02 (P1): 백그라운드 생성 개수와 실제 저장 개수 불일치 보정
- **실제 문제였는가?**: **예 (입증됨)**. `backgroundQuestionService.ts`에서 AI 생성 결과 중 일부가 `appendCachedQuestions`의 중복 검사(유사 지문/구조 지문)로 인해 저장되지 못했을 때, 기존 코드가 `recordBatchSaveResult`에 신규 생성 시도 ID 전체를 전달하여 실제 저장된 개수와 Job State의 `savedCount` 간에 불일치가 발생할 위험이 있었습니다.
- **수정 조치**:
  1. `appendCachedQuestions` 호출 직전 저장소의 `prevIds` 스냅샷을 캡처.
  2. 저장 실행 후 `newlyAddedIds = questions.filter(q => !prevIds.has(q.id) && currentAll.has(q.id))`로 실제 새로 저장소에 들어간 문제 ID만 엄밀히 추출.
  3. `recordBatchSaveResult`에 `newlyAddedIds`만 전달하여, 10개 생성 중 3개가 중복으로 거부되면 정확히 7개만 저장 카운트에 가산되고 남은 개수(remaining)가 3으로 계산되어 리필 배치가 정상 구동되도록 보정.

---

## 3. 수정하지 않은 항목 (사유 명시)

| 항목 ID | 항목명 | 판정 | 사유 및 기술 부채 기록 |
| :--- | :--- | :--- | :--- |
| **M-01** | AttemptRepository AsyncStorage JSON vs SQLite | **수정 보류 (기술 부채)** | 현재 앱의 예상 풀이 기록(1,000~2,000건) 수준에서 JSON 크기는 약 50~100KB 내외이며, I/O 소요 시간은 수 밀리초에 불과함. 시험 직전 스토리지 엔진을 SQLite로 대규모 마이그레이션하는 것은 회귀 버그 위험이 극히 높으므로 v2.0 로드맵으로 이관. |
| **L-01** | Streaming Scroll 레이아웃 | **수정 보류** | `requestAnimationFrame`과 `latestTutorOffsetRef`를 통한 스크롤 제어가 모바일에서 60fps로 매끄럽게 동작함을 확인. 불필요한 레이아웃 재계산 수정 배제. |
| **L-02** | NightModeOverlay 원터치 해제 | **UX 유지** | 사용자가 어두운 환경에서 자투리 공부 중 화면 아무 곳이나 가볍게 터치하여 즉시 오버레이를 해제할 수 있도록 의도된 핵심 UX이므로 임의 변경(롱프레스/슬라이드)하지 않고 유지. |
| **P-01** | Foreground Service 및 Android 백그라운드 | **유지** | 현재 `react-native-background-actions` 설정 및 권한 manifest가 Expo SDK 57 및 Android 빌드 요건을 온전히 충족하고 있음. |

---

## 4. 테스트 및 검증 결과

실제 package.json에 정의된 5대 전체 테스트 스위트를 전수 수행하여 100% 합격을 확인했습니다:

1. **`npm run typecheck` (`tsc --noEmit`)**:
   - 결과: **PASS (오류 0건)**
2. **`npm run test` (`scripts/self-test.ts`)**:
   - 결과: **PASS (이론 5과목, 두음 20개, 잠금/동시성 전수 통과)**
3. **`npm run test:learning` (`scripts/test-learning-engine.ts`)**:
   - 5,000회 출제 시뮬레이션: NEW 60.0%, WEAK 40.0%, 쿨다운 중복률 0.0000%
   - 13대 연산자 기호(`->`, `*`, `&`, `++`, `--`, `==`, `!=`, `>=`, `<=`, `.`, `::`) 채점: **100% PASS**
   - 회귀 방지(`2NF` vs `3NF`, 코드 공백 토큰 경계, 대소문자): **100% PASS**
   - H-01 Blind 프롬프트 및 로컬 비교 검증: **PASS**
   - C-01 언어 가드 및 미지원 언어 안전 폴백: **PASS**
   - M-02 중복 제외 후 실제 저장 카운트 동기화: **PASS**
4. **`npm run test:programming` (`scripts/programming-engine-test.ts`)**:
   - 결과: **PASS (10대 생성기, 다국어 템플릿 무결성 100% 통과)**
5. **`npm run test:gemini` (`scripts/gemini-service-test.ts` & `scripts/gemini-question-generator-test.ts`)**:
   - 결과: **PASS (재시도 지수 백오프, 모델 폴백, 3.8/3.5 사고과정 필터링, SSE 토큰 스트리밍 전수 통과)**

---

## 5. 문제은행 데이터 무결성

- **작업 전 활성 문항 수**: 900문항
- **작업 후 활성 문항 수**: 900문항
- **문제 지문 / 정답 / 해설 임의 변경**: **0건 (100% 원본 보존)**
- **신규 생성 문항**: **0건 (문제 생성 금지 원칙 준수)**
- **민감 정보(API Key, Token) 누출**: **0건**
