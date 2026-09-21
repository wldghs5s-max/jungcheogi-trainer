/**
 * 키보드가 현재 앱 창과 겹치는 높이만 계산합니다.
 * screen 전체가 아니라 window 하단을 기준으로 해서
 * 폴드 분할/플렉스 모드에서 반대쪽 화면의 키보드를 창 패딩으로 쓰지 않습니다.
 */
export function measureKeyboardOverlap(params: {
  reportedHeight: number;
  keyboardScreenY: number;
  screenHeight: number;
  windowHeight: number;
}): number {
  const leftover = Math.max(0, params.screenHeight - params.windowHeight);
  const windowBottomOnScreen = params.screenHeight - leftover;

  if (params.keyboardScreenY >= windowBottomOnScreen - 1) {
    return 0;
  }

  const overlap = windowBottomOnScreen - params.keyboardScreenY;
  const raw = Math.max(params.reportedHeight, overlap, 0);
  return Math.min(raw, params.windowHeight * 0.7);
}
