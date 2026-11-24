# 정처기·보안기사 트레이너

정보처리기사 실기와 정보보안기사 필기를 함께 대비하는 모바일 학습 앱입니다. 오프라인에서도 퀴즈·이론·암기 카드·오답노트를 사용할 수 있고, 설정에 Gemini API Key를 입력하면 AI 튜터와 암기 문제 생성을 이용할 수 있습니다.

- 버전: `1.9.0` (Android `versionCode` 27, `applicationId`: `com.jungcheogi.studytrainer`)
- 스택: Expo SDK 57, React Native, TypeScript, Zustand

## 기능

- **자격증 선택·전환 및 데이터 분리**: 최초 실행 시 `정보처리기사`와 `정보보안기사` 중 선택하며, 자격증별 학습 기록·오답노트·북마크·통계를 독립 관리
- **정보처리기사 실기**: 단답·객관식·C/Java/Python 코드 추적·SQL 실무(1,002문항), 로컬 프로그래밍 생성기 10종, Gemini 암기 문제 생성, 1초 두음 암기장
- **정보보안기사 필기**: 5과목·26개 세부 섹션(`과목 → 챕터 → 세부 섹션`) 선택 풀이, `전체 문제` / `실제 기출` / `2027 개정 대비` 필터, 창작 문제은행 400문항·이론 20주제·필수 암기 40장
- **즉시 채점 및 선택형 Gemini AI 튜터**: 보안기사는 답안 제출 직후 API 키 없이도 기본 정답·해설을 바로 확인하고 필요 시 AI 튜터에게 추가 설명을 요청

## 실행

```bash
npm install
npm start
```

로컬 네트워크만 쓰려면 `npm run local`입니다.

## 테스트

```bash
npm run typecheck
npm test
npm run test:programming
npm run test:gemini
npm run test:learning
```

## Android APK 및 별도 설치 안내

- `v1.9.0` 통합 앱은 새 Android 패키지 ID(`com.jungcheogi.studytrainer`, 런처 이름 `정처기·보안기사 트레이너`)를 사용합니다.
- 기존 `v1.8.0` 정처기 앱(`com.jungcheogi.trainer`, `CN=Android Debug` 서명)과 **별도 앱으로 나란히 설치**되며, 기존 앱의 학습 기록은 자동 이관되지 않고 **새 통합 앱에서 학습 기록이 새로 시작**됩니다(기존 앱을 삭제할 필요는 없습니다).
- **GitHub Actions 배포 흐름**:
  - `main` 브랜치 푸시: 타입 검사 및 테스트 스위트(`verify`)만 실행
  - 수동 실행(`workflow_dispatch`): 테스트 설치용 서명 APK를 GitHub Actions Artifacts로 업로드
  - 버전 태그(`v*`) 푸시: 영속 릴리스 키스토어 서명·`apksigner` 검증 후 [Releases](https://github.com/wldghs5s-max/jungcheogi-trainer/releases) 게시(레거시 ID `com.jungcheogi.trainer` 및 디버그 인증서는 공개 Release 차단)

## 라이선스

MIT
