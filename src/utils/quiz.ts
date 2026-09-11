/**
 * 사용자 답안 문자열을 비교하기 좋은 형태로 정규화합니다.
 */
export function normalizeAnswer(ans: string): string {
  return ans
    .trim()
    .replace(/[()[\]{}.,·\-_/'":;]/g, "")
    .replace(/\s+/g, "")
    .toUpperCase();
}

const SYNONYM_GROUPS: string[][] = [
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
  ["SINGLETON", "싱글톤", "싱글톤패턴"],
  ["OBSERVER", "옵서버", "옵저버", "옵서버패턴"],
  ["STRATEGY", "전략", "전략패턴"],
  ["ADAPTER", "어댑터", "어댑터패턴"],
  ["FACTORYMETHOD", "팩토리메서드", "팩토리메소드"],
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
  ["XSS", "크로스사이트스크립팅"],
  ["CSRF", "XSRF"],
  ["SQLINJECTION", "SQL인젝션", "SQLI"],
];

function expandForms(ans: string): string[] {
  const normalized = normalizeAnswer(ans);
  for (const group of SYNONYM_GROUPS) {
    const canonGroup = group.map(normalizeAnswer);
    if (canonGroup.includes(normalized)) {
      return canonGroup;
    }
  }
  return [normalized];
}

function canonicalForm(ans: string): string {
  return expandForms(ans)[0];
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

function isFuzzyMatch(left: string, right: string): boolean {
  if (!left || !right) return false;
  if (left === right) return true;
  const minLen = Math.min(left.length, right.length);
  if (minLen < 3) return false;
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

/**
 * 답안 일치 여부를 판정합니다. 동의어·1글자 오탈자를 허용합니다.
 */
export function checkAnswer(
  userAnswer: string | string[],
  correctAnswer: string | string[],
): boolean {
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

/**
 * 정답 문자열 표시용 변환
 */
export function formatAnswerDisplay(answer: string | string[]): string {
  if (Array.isArray(answer)) {
    return answer.join(" 또는 ");
  }
  return answer;
}

export function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
