/**
 * 사용자 답안 문자열을 비교하기 좋은 형태로 정규화합니다.
 * 원문자(①)와 전각 숫자는 ASCII로 바꾸고, 약어 오채점을 막기 위해
 * 공백·기호를 제거한 뒤 대문자로 맞춥니다.
 */
const CIRCLED_CHAR_MAP: Record<string, string> = {
  "①": "1",
  "②": "2",
  "③": "3",
  "④": "4",
  "⑤": "5",
  "⑥": "6",
  "⑦": "7",
  "⑧": "8",
  "⑨": "9",
  "⑩": "10",
  "⑴": "1",
  "⑵": "2",
  "⑶": "3",
  "⑷": "4",
  "⑸": "5",
  "１": "1",
  "２": "2",
  "３": "3",
  "４": "4",
  "５": "5",
  "６": "6",
  "７": "7",
  "８": "8",
  "９": "9",
  "０": "0",
  "㉠": "ㄱ",
  "㉡": "ㄴ",
  "㉢": "ㄷ",
  "㉣": "ㄹ",
  "㉤": "ㅁ",
};

export function normalizeAnswer(ans: string): string {
  if (!ans) return "";
  let text = ans.trim();
  text = text.replace(
    /[①-⑩⑴-⑸１-９０㉠-㉤]/g,
    (ch) => CIRCLED_CHAR_MAP[ch] || "",
  );
  // 화살표 기호(→, ⇒)를 프로그래밍 화살표 연산자(->)로 통일
  text = text.replace(/[→⇒]/g, "->");
  text = text.replace(/[▶▷＞≫]/g, "");

  // 순수 기호나 연산자(예: ->, &, *, ::, ==, !=, ++, ., <=, >= 등)인 경우 기호를 파괴하지 않고 보존
  const noSpace = text.replace(/\s+/g, "");
  if (/^[->&*+=<!?:;~^%|/[\]()#.]+$/.test(noSpace)) {
    return noSpace.toUpperCase();
  }

  // 일반 단답형 텍스트: 문장부호 및 조사 제거
  text = text
    .replace(/[()[\]{}.,·\-_/'":;?`~!@#$%^&*+=<>]/g, "")
    .replace(/\s+/g, "");
  text = text.replace(/(은|는|이|가|을|를)$/g, "");
  return text.toUpperCase();
}

/**
 * 코드 실행 결과 채점용입니다. 부호·소수점·대소문자·토큰 경계를 유지하고,
 * 앞뒤 공백·줄 끝 공백·CRLF/LF·마지막 빈 줄만 무시합니다.
 */
export function normalizeCodeOutputAnswer(ans: string): string {
  if (!ans) return "";
  const lines = ans
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/, ""));
  while (lines.length > 0 && lines[0] === "") lines.shift();
  while (lines.length > 0 && lines[lines.length - 1] === "") lines.pop();
  if (lines.length === 0) return "";
  lines[0] = lines[0].replace(/^[ \t]+/, "");
  const last = lines.length - 1;
  lines[last] = lines[last].replace(/[ \t]+$/, "");
  return lines.join("\n");
}

export function isCodeOutputQuestion(question?: {
  type?: string;
  subject?: string;
  code?: string;
} | null): boolean {
  if (!question) return false;
  if (question.type === "CODE_TRACE") return true;
  return question.subject === "프로그래밍언어활용" && !!question.code;
}

export function isShortAcronym(word: string): boolean {
  if (!word) return false;
  return /^[A-Z0-9]{1,3}$/.test(word);
}

const SYNONYM_GROUPS: string[][] = [
  ["1정규형", "제1정규형", "1NF", "제일정규형"],
  ["2정규형", "제2정규형", "2NF", "제이정규형"],
  ["3정규형", "제3정규형", "3NF", "제삼정규형"],
  ["보이스코드정규형", "BCNF", "BC정규형", "보이스코드"],
  ["4정규형", "제4정규형", "4NF", "제사정규형"],
  ["5정규형", "제5정규형", "5NF", "제오정규형"],
  ["GROUPBY", "그룹바이", "그룹별"],
  ["SELECT", "셀렉트", "셀렉"],
  ["INSERT", "인서트"],
  ["UPDATE", "업데이트", "갱신"],
  ["DELETE", "딜리트", "삭제"],
  ["HAVING", "해빙"],
  ["ORDERBY", "오더바이", "정렬"],
  ["PRIMARYKEY", "PK", "기본키", "프라이머리키"],
  ["FOREIGNKEY", "FK", "외래키"],
  ["CANDIDATEKEY", "후보키"],
  ["BUILDER", "빌더", "빌더패턴"],
  ["SINGLETON", "싱글톤", "싱글톤패턴"],
  ["OBSERVER", "옵서버", "옵저버", "옵서버패턴"],
  ["STRATEGY", "전략", "전략패턴"],
  ["ADAPTER", "어댑터", "어댑터패턴"],
  ["FACTORYMETHOD", "팩토리메서드", "팩토리메소드"],
  ["ABSTRACTFACTORY", "추상팩토리", "추상팩토리패턴"],
  ["SEQUENCE", "시퀀스", "시퀀스다이어그램", "순차다이어그램"],
  ["USECASE", "유스케이스", "유스케이스다이어그램"],
  ["DEADLOCK", "교착상태", "데드락"],
  ["ATOMICITY", "원자성"],
  ["CONSISTENCY", "일관성"],
  ["ISOLATION", "고립성", "격리성"],
  ["DURABILITY", "지속성", "영속성"],
  ["INTEGRITY", "무결성", "완전성"],
  ["INNERJOIN", "내부조인", "이너조인", "EQUIJOIN", "등가조인"],
  ["INDEX", "인덱스", "색인"],
  ["VIEW", "뷰"],
  ["TRANSACTION", "트랜잭션"],
  ["NORMALIZATION", "정규화"],
  [
    "SDN",
    "SOFTWAREDEFINEDNETWORKING",
    "소프트웨어정의네트워크",
    "소프트웨어정의네트워킹",
  ],
  ["XSS", "크로스사이트스크립팅"],
  ["CSRF", "XSRF"],
  ["SQLINJECTION", "SQL인젝션", "SQLI"],
  ["RBAC", "역할기반접근통제", "역할기반접근제어"],
  ["DAC", "임의접근통제", "임의적접근통제"],
  ["MAC", "강제접근통제", "강제적접근통제"],
  ["AES", "고급암호화표준"],
  ["RSA", "라이베스트샤미어애들먼"],
  ["->", "화살표연산자", "포인터멤버접근", "포인터멤버접근연산자"],
  ["&", "주소연산자", "앰퍼샌드"],
  ["*", "포인터연산자", "역참조연산자", "애스터리스크"],
];

function expandForms(ans: string): string[] {
  const normalized = normalizeAnswer(ans);
  if (!normalized) return [];
  for (const group of SYNONYM_GROUPS) {
    const canonGroup = group.map(normalizeAnswer);
    if (canonGroup.includes(normalized)) {
      return canonGroup;
    }
  }
  return [normalized];
}

function canonicalForm(ans: string): string {
  const forms = expandForms(ans);
  return forms.length > 0 ? forms[0] : normalizeAnswer(ans);
}

export function canonicalAnswerForm(ans: string): string {
  return canonicalForm(ans);
}

export function memoAnswerKey(answer: string | string[]): string {
  const parts = (Array.isArray(answer) ? answer : [answer])
    .map((item) => canonicalForm(String(item || "")))
    .filter((item) => item.length >= 2);
  return [...new Set(parts)].sort().join("|");
}

export function levenshtein(a: string, b: string): number {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const dp: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(0),
  );
  for (let i = 0; i < rows; i++) dp[i][0] = i;
  for (let j = 0; j < cols; j++) dp[0][j] = j;
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      );
    }
  }
  return dp[a.length][b.length];
}

export function isFuzzyMatch(left: string, right: string): boolean {
  if (!left || !right) return false;
  if (left === right) return true;
  if (isShortAcronym(left) || isShortAcronym(right)) return false;
  const digitsLeft = left.replace(/\D/g, "");
  const digitsRight = right.replace(/\D/g, "");
  if (digitsLeft !== digitsRight) return false;
  const minLen = Math.min(left.length, right.length);
  if (minLen < 4) return false;
  if (Math.abs(left.length - right.length) > 1) return false;
  return levenshtein(left, right) <= 1;
}

function isCloseMatch(user: string, correct: string): boolean {
  const userForms = expandForms(user);
  const correctForms = expandForms(correct);
  if (userForms.some((form) => correctForms.includes(form))) return true;
  const typed = normalizeAnswer(user);
  return correctForms.some((form) => isFuzzyMatch(typed, form));
}

function codeOutputMatches(
  userAnswer: string,
  correctAnswer: string | string[],
): boolean {
  const norm = (s: string) => normalizeCodeOutputAnswer(s).replace(/[→⇒]/g, "->");
  const typed = norm(userAnswer);
  if (!typed) return false;
  const answers = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
  return answers.some(
    (item) => norm(String(item || "")) === typed,
  );
}

/**
 * 답안 일치 여부를 판정합니다.
 * 이론 용어는 동의어·약어를 허용하고, 코드 출력은 값 의미를 그대로 비교합니다.
 */
export function checkAnswer(
  userAnswer: string | string[],
  correctAnswer: string | string[],
  question?: {
    type?: string;
    subject?: string;
    code?: string;
    options?: string[];
  } | null,
): boolean {
  // 코드 실행 결과 판정인 경우: 토큰 경계 및 대소문자 보존 우선 적용
  if (isCodeOutputQuestion(question)) {
    if (Array.isArray(userAnswer)) {
      if (!Array.isArray(correctAnswer)) return false;
      if (userAnswer.length !== correctAnswer.length) return false;
      return userAnswer.every(
        (value, index) =>
          normalizeCodeOutputAnswer(String(value || "")).replace(/[→⇒]/g, "->") ===
          normalizeCodeOutputAnswer(String(correctAnswer[index] || "")).replace(/[→⇒]/g, "->"),
      );
    }
    return codeOutputMatches(userAnswer, correctAnswer);
  }

  // 객관식(MULTIPLE_CHOICE) 문제 판정: 보기 문자열 정확 일치 및 번호(1~4 / ①~④) 매핑 지원, 오탈자 유사 판정 배제
  if (
    question?.type === "MULTIPLE_CHOICE" ||
    (question?.options && question.options.length > 0)
  ) {
    if (Array.isArray(userAnswer)) return false;
    const rawUser = String(userAnswer || "").trim();
    if (!rawUser) return false;

    const options = question?.options || [];
    const correctList = (
      Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer]
    ).map((c) => String(c || "").trim());

    // 화면에서 실제 보기를 선택했다면 번호·기호·대소문자를 그대로 구분한다.
    if (options.includes(rawUser) && correctList.every((answer) => options.includes(answer))) {
      return correctList.includes(rawUser);
    }

    const resolveChoiceCandidates = (val: string): string[] => {
      const candidates = new Set<string>();
      const norm = val.replace(/\s+/g, "").toUpperCase();
      if (norm) candidates.add(norm);
      const normAns = normalizeAnswer(val);
      if (normAns) candidates.add(normAns);

      // 번호("1"~"10" 또는 원문자 "①"~"⑩")가 들어온 경우 해당 인덱스의 보기 텍스트도 후보로 추가
      if (/^[1-9][0-9]*$/.test(normAns)) {
        const idx = parseInt(normAns, 10) - 1;
        if (idx >= 0 && idx < options.length) {
          const optText = options[idx];
          candidates.add(optText.replace(/\s+/g, "").toUpperCase());
          const optNorm = normalizeAnswer(optText);
          if (optNorm) candidates.add(optNorm);
        }
      }
      // 보기 텍스트와 일치하는 경우 그 보기의 번호(1-based)도 후보로 추가
      const matchIdx = options.findIndex(
        (opt) =>
          opt.replace(/\s+/g, "").toUpperCase() === norm ||
          (normalizeAnswer(opt) && normalizeAnswer(opt) === normAns),
      );
      if (matchIdx >= 0) {
        candidates.add(String(matchIdx + 1));
      }
      return Array.from(candidates);
    };

    const userCandidates = resolveChoiceCandidates(rawUser);
    return correctList.some((c) => {
      const correctCandidates = resolveChoiceCandidates(c);
      return userCandidates.some((u) => correctCandidates.includes(u));
    });
  }

  // 1. 비-코드 질문: 순수 공백제거 및 기호 매핑 기반의 즉시 일치 검사
  const arrowNorm = (s: string) => s.trim().replace(/\s+/g, "").replace(/[→⇒]/g, "->");
  if (!Array.isArray(userAnswer)) {
    const normU = arrowNorm(String(userAnswer || ""));
    if (normU) {
      const correctList = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
      if (correctList.some((c) => arrowNorm(String(c || "")).toUpperCase() === normU.toUpperCase())) {
        return true;
      }
    }
  }

  if (Array.isArray(userAnswer)) {
    if (!Array.isArray(correctAnswer)) return false;
    if (userAnswer.length !== correctAnswer.length) return false;
    const normUser = userAnswer.map(canonicalForm).sort();
    const normCorrect = correctAnswer.map(canonicalForm).sort();
    return normUser.every((v, i) => v === normCorrect[i]);
  }

  if (Array.isArray(correctAnswer)) {
    return correctAnswer.some((ans) => isCloseMatch(userAnswer, ans));
  }

  return isCloseMatch(userAnswer, correctAnswer);
}

export function formatAnswerDisplay(answer: string | string[]): string {
  if (Array.isArray(answer)) {
    return answer.join(" 또는 ");
  }
  return answer;
}

export const SECURITY_TUTOR_REQUEST_BUTTON_LABEL =
  "AI 튜터에게 추가 설명 요청";

export function isSecurityCertificationQuestion(question?: {
  certification?: string;
} | null): boolean {
  return (question?.certification ?? "JUNGCHEOGI") === "SECURITY";
}

export function shouldAutoOpenTutorOnUnknown(question?: {
  certification?: string;
} | null): boolean {
  // 정보보안기사는 '모른다' 제출 시에도 자동으로 AI 튜터를 호출하지 않고 기본 정답과 해설만 먼저 표시한다.
  return !isSecurityCertificationQuestion(question);
}

export function getTutorButtonLabel(
  question?: { certification?: string } | null,
  isUnknown = false,
): string {
  if (isSecurityCertificationQuestion(question)) {
    return SECURITY_TUTOR_REQUEST_BUTTON_LABEL;
  }
  return isUnknown
    ? "📘 이 단원(챕터) 개념부터 과외받기"
    : "✨ Gemini AI 튜터에게 이 문제 과외받기";
}

export function getPostSubmitExplanationView(
  question: {
    answer: string | string[];
    explanation: string;
    certification?: string;
  },
  isSubmitted: boolean,
  isUnknown = false,
): {
  visible: boolean;
  correctAnswerText: string;
  explanationText: string;
  requiresApiKey: boolean;
  tutorButtonLabel: string;
} {
  if (!isSubmitted) {
    return {
      visible: false,
      correctAnswerText: "",
      explanationText: "",
      requiresApiKey: false,
      tutorButtonLabel: getTutorButtonLabel(question, isUnknown),
    };
  }
  return {
    visible: true,
    correctAnswerText: formatAnswerDisplay(question.answer),
    explanationText: question.explanation,
    requiresApiKey: false,
    tutorButtonLabel: getTutorButtonLabel(question, isUnknown),
  };
}

export function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export interface SessionResultSummary {
  total: number;
  correctCount: number;
  confusedCount: number;
  unknownCount: number;
  missCount: number;
  scoreRate: number;
  feedbackMessage: string;
}

export function getSessionResultFeedbackMessage(params: {
  total: number;
  correctCount: number;
  confusedCount: number;
  unknownCount: number;
  scoreRate?: number;
}): string {
  const { total, correctCount, confusedCount, unknownCount } = params;
  if (total <= 0) {
    return "이번 세션의 풀이 기록이 없습니다.";
  }
  const scoreRate =
    params.scoreRate ?? Math.round((correctCount / total) * 100);
  const missCount = confusedCount + unknownCount;

  if (missCount === 0) {
    return `이번 세션 정답률 100% (${total}문제 모두 정답)입니다. 복습이 필요한 오답·모름 문항이 없습니다.`;
  }

  let reviewTarget = "";
  if (confusedCount > 0 && unknownCount > 0) {
    reviewTarget = `헷갈린 문항 ${confusedCount}개와 모름 문항 ${unknownCount}개(총 ${missCount}개)`;
  } else if (confusedCount > 0) {
    reviewTarget = `헷갈린 오답 문항 ${confusedCount}개`;
  } else {
    reviewTarget = `모름으로 표시한 문항 ${unknownCount}개`;
  }

  if (scoreRate >= 80) {
    return `이번 세션 정답률은 ${scoreRate}%입니다. ${reviewTarget}의 핵심 개념과 해설을 오답노트에서 다시 확인해 보세요.`;
  }
  if (scoreRate >= 60) {
    return `이번 세션 정답률은 ${scoreRate}%입니다. ${reviewTarget}를 오답노트에서 복습하고 다시 풀기로 점검해 보세요.`;
  }
  return `이번 세션 정답률은 ${scoreRate}%입니다. ${reviewTarget}의 기본 개념과 해설부터 오답노트에서 차근차근 복습해 보세요.`;
}

export function summarizeSessionAttempts(
  attempts: ReadonlyArray<{
    isCorrect: boolean;
    missType?: "WRONG" | "UNKNOWN";
    userAnswer?: string;
  }>,
): SessionResultSummary {
  const total = attempts.length;
  const correctCount = attempts.filter((a) => a.isCorrect).length;
  const unknownCount = attempts.filter(
    (a) => !a.isCorrect && (a.missType === "UNKNOWN" || a.userAnswer === "(모름)"),
  ).length;
  const confusedCount = total - correctCount - unknownCount;
  const missCount = confusedCount + unknownCount;
  const scoreRate = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const feedbackMessage = getSessionResultFeedbackMessage({
    total,
    correctCount,
    confusedCount,
    unknownCount,
    scoreRate,
  });

  return {
    total,
    correctCount,
    confusedCount,
    unknownCount,
    missCount,
    scoreRate,
    feedbackMessage,
  };
}
