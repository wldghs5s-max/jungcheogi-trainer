# 정처기 실기 트레이너

정보처리기사 실기 대비용 모바일 앱입니다. 오프라인에서도 퀴즈·이론·오답노트를 쓸 수 있고, 설정에 Gemini API Key를 넣으면 AI 튜터와 암기 문제 생성을 쓸 수 있습니다.

- 버전: `1.3.7` (Android `versionCode` 15)
- 스택: Expo SDK 57, React Native, TypeScript, Zustand

## 기능

- 단답·객관식·C/Java/Python 코드 추적·SQL 퀴즈, 동의어 기준 주관식 채점
- 로컬 프로그래밍 문제 생성기 10종, Gemini 암기 문제 생성(주제 시드, 7문제×2묶음)
- 이론·두음 카드, 오답노트, 복습 큐, 통계
- Gemini 1:1 튜터(스트리밍). 생성은 `gemini-3.8-flash` → 혼잡 시 `gemini-3.5-flash`

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
```

## Android APK

`main` 푸시 시 GitHub Actions가 릴리스 APK를 만듭니다. 최신 파일은 [Releases](https://github.com/wldghs5s-max/jungcheogi-trainer/releases)의 `v1.3.7`에서 받으면 됩니다. 예전에 EAS로 설치한 앱과 서명이 다를 수 있어, 덮어씌우기 전에 기존 앱을 지운 뒤 설치하세요.

## 라이선스

MIT
