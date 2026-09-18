export interface FormattedTutorSegment {
  text: string;
  isBold: boolean;
}

export interface FormattedTutorLine {
  bulletPrefix?: string;
  segments: FormattedTutorSegment[];
}

/**
 * 마크다운 텍스트에서 불필요한 별표(*, **) 기호를 정리하고,
 * 볼드체(**텍스트**)와 불릿 기호(* -> •)를 모바일 환경에 맞게 깔끔하게 파싱합니다.
 */
export function parseTutorMarkdownLine(line: string): FormattedTutorLine {
  // 1. 라인 선두의 마크다운 불릿 '* ' 또는 '- '를 깔끔한 '• ' 기호로 변환
  let bulletPrefix: string | undefined;
  let text = line;
  const bulletMatch = text.match(/^(\s*)[*•-]\s+/);
  if (bulletMatch) {
    bulletPrefix = (bulletMatch[1] || "") + "• ";
    text = text.slice(bulletMatch[0].length);
  }

  // 2. 수평선(*** 또는 ---) 형태 정리
  if (/^\s*[*-_]{3,}\s*$/.test(text)) {
    return {
      segments: [{ text: "──────────────────────────", isBold: false }],
    };
  }

  // 3. 혹시 남아있는 '***'를 '**'로 통일
  text = text.replace(/\*\*\*/g, "**");

  // 4. 짝이 맞지 않는 마지막 ** (스트리밍 도중 불완전 청크) 정리
  const asteriskCount = (text.match(/\*\*/g) || []).length;
  if (asteriskCount % 2 !== 0) {
    text = text.replace(/\*\*([^*]*)$/, "$1");
  }

  // 5. **텍스트** 기준으로 분할
  const rawParts = text.split(/(\*\*[^*]+?\*\*)/g);
  const segments: FormattedTutorSegment[] = [];

  for (const part of rawParts) {
    if (!part) continue;
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      const boldText = part.slice(2, -2).trim();
      if (boldText) {
        segments.push({
          text: boldText,
          isBold: true,
        });
      }
    } else {
      // 단어 단위로 감싸진 불필요한 단일 * (예: *단어*) 정리
      const clean = part.replace(/\*([^*\s]+)\*/g, "$1");
      if (clean) {
        segments.push({
          text: clean,
          isBold: false,
        });
      }
    }
  }

  // 만약 모든 파싱 결과 세그먼트가 비어있다면 원래 텍스트 유지
  if (segments.length === 0 && text) {
    segments.push({ text, isBold: false });
  }

  return { bulletPrefix, segments };
}
