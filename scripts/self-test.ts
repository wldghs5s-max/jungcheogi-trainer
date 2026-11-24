import { ALL_QUESTIONS, SUBJECTS } from "../src/data/questions";
import { MEMORIZATION_BANK } from "../src/data/questions/memorizationBank";
import { generateProgrammingPracticeBundle } from "../src/api/programmingGenerator";
import {
  checkAnswer,
  getPostSubmitExplanationView,
  getSessionResultFeedbackMessage,
  getTutorButtonLabel,
  SECURITY_TUTOR_REQUEST_BUTTON_LABEL,
  shouldAutoOpenTutorOnUnknown,
  shuffleArray,
  summarizeSessionAttempts,
} from "../src/utils/quiz";
import { GeminiService, buildTutorPrompt } from "../src/api/geminiService";
import { getDueReviewQuestionIds } from "../src/utils/reviewQueue";
import { getQuestionOriginLabel } from "../src/utils/questionOrigin";
import { measureKeyboardOverlap } from "../src/utils/keyboardOverlap";
import { Question } from "../src/types/question";
import {
  isConfusedAttempt,
  isUnknownAttempt,
  QuizAttempt,
} from "../src/types/attempt";
import {
  LocalStorage,
  MemoryStorageAdapter,
  STORAGE_KEYS,
} from "../src/storage/localStorage";
import { AttemptRepository } from "../src/repositories/attemptRepository";
import { BookmarkRepository } from "../src/repositories/bookmarkRepository";
import { useQuizStore } from "../src/store/quizStore";
import { useUserStore } from "../src/store/userStore";
import { useSettingsStore } from "../src/store/settingsStore";
import { calculateUserStats } from "../src/utils/statistics";
import {
  SECURITY_QUESTIONS,
  SECURITY_SUBJECTS,
  SECURITY_THEORY_DATA,
  SECURITY_MEMO_CARDS,
  SECURITY_OFFICIAL_CHAPTERS,
  SECURITY_OFFICIAL_SECTIONS,
  registerSecurityTextbook,
  clearSecurityTextbook,
  getSecurityTaxonomyBasisLabel,
  getSecurityQuestionSourceBadgeLabel,
  getSecurityQuestionStandardBadgeLabel,
  filterSecurityQuestionsByScope,
} from "../src/data/security";

const MEMO_SUBJECTS = [
  "소프트웨어설계",
  "데이터베이스구축",
  "정보시스템구축관리",
  "신기술/보안",
];

let failed = 0;

function assert(cond: boolean, message: string) {
  if (!cond) {
    failed += 1;
    console.error("FAIL:", message);
  } else {
    console.log("OK  ", message);
  }
}

function assertQuestion(q: Question, label: string) {
  assert(!!q.id, `${label} id`);
  assert(!!q.question.trim(), `${label} question`);
  assert(!!q.explanation.trim(), `${label} explanation`);
  const answers = Array.isArray(q.answer) ? q.answer : [q.answer];
  assert(
    answers.length > 0 && answers.every((a) => String(a).trim()),
    `${label} answer`,
  );
  assert(!!q.subject && !!q.category && !!q.type, `${label} meta`);
}

const ids = ALL_QUESTIONS.map((q) => q.id);
assert(
  new Set(ids).size === ids.length,
  `정적 문제 ID 중복 없음 (${ids.length})`,
);
assert(
  ALL_QUESTIONS.length >= 750,
  `정적 문제 750개 이상 (실제 ${ALL_QUESTIONS.length})`,
);
assert(
  MEMORIZATION_BANK.length >= 700,
  `암기 은행 700개 이상 (실제 ${MEMORIZATION_BANK.length})`,
);
assert(SUBJECTS.includes("정보시스템구축관리"), "정보시스템구축관리 과목 노출");
assert(MEMO_SUBJECTS.length === 4, "Gemini 암기 과목 4개");

for (const q of ALL_QUESTIONS) {
  assertQuestion(q, q.id);
}

const bySubject = Object.fromEntries(
  SUBJECTS.map((s) => [s, ALL_QUESTIONS.filter((q) => q.subject === s).length]),
);
console.log("과목별 정적 문제 수:", bySubject);
assert((bySubject["소프트웨어설계"] || 0) >= 15, "설계 과목 문제 충분");
assert((bySubject["데이터베이스구축"] || 0) >= 15, "DB 과목 문제 충분");
assert((bySubject["정보시스템구축관리"] || 0) >= 10, "구축관리 과목 문제 충분");
assert((bySubject["신기술/보안"] || 0) >= 15, "보안 과목 문제 충분");

const unknownAttempt: QuizAttempt = {
  id: "t1",
  questionId: "q1",
  selectedAnswer: "(모름)",
  correctAnswer: "정답",
  isCorrect: false,
  missType: "UNKNOWN",
  answeredAt: new Date().toISOString(),
};
const confusedAttempt: QuizAttempt = {
  ...unknownAttempt,
  id: "t2",
  selectedAnswer: "오답",
  missType: "WRONG",
};
const legacyWrong: QuizAttempt = {
  ...unknownAttempt,
  id: "t3",
  selectedAnswer: "오답",
};
delete (legacyWrong as { missType?: string }).missType;
assert(isUnknownAttempt(unknownAttempt), "모름 시도 판별");
assert(isConfusedAttempt(confusedAttempt), "헷갈림 시도 판별");
assert(isConfusedAttempt(legacyWrong), "구버전 오답은 헷갈림으로 본다");
assert(!isUnknownAttempt(confusedAttempt), "헷갈림은 모름이 아님");

assert(checkAnswer("group by", "GROUP BY"), "채점: 공백/대소문자");
assert(
  checkAnswer("싱글톤패턴", ["싱글톤", "싱글톤 패턴", "Singleton"]),
  "채점: 동의어",
);
assert(checkAnswer("그룹바이", "GROUP BY"), "채점: 한글/영문 동의어");
assert(checkAnswer("싱글톤패틴", "싱글톤패턴"), "채점: 1글자 오탈자");
assert(checkAnswer("1NF", "제1정규형"), "채점: 1NF 동의어");
assert(checkAnswer("②", "2"), "채점: 원문자");
assert(checkAnswer("원자성을", "원자성"), "채점: 조사 제거");
assert(!checkAnswer("SDN", "SAN"), "채점: 약어는 한글자 차이 불허");
assert(!checkAnswer("제2정규형", "제3정규형"), "채점: 숫자 다른 정규형 불허");
assert(!checkAnswer("틀린답", "정답"), "채점: 오답 거부");
assert(!checkAnswer("3", "2"), "채점: 짧은 답은 유사 허용 안 함");

const codeOutput = {
  type: "CODE_TRACE" as const,
  subject: "프로그래밍언어활용" as const,
  code: 'printf("%d", x);',
};
assert(!checkAnswer("5", "-5", codeOutput), "코드 채점: 부호 제거 오답");
assert(!checkAnswer("15", "1.5", codeOutput), "코드 채점: 소수점 제거 오답");
assert(
  !checkAnswer("1 23", "12 3", codeOutput),
  "코드 채점: 토큰 경계 붕괴 오답",
);
assert(!checkAnswer("ABC", "abc", codeOutput), "코드 채점: 대소문자 무시 오답");
assert(
  !checkAnswer("싱글톤", "싱글톤패턴", codeOutput),
  "코드 채점: 용어 유사 판정 없음",
);
assert(checkAnswer("-5", "-5", codeOutput), "코드 채점: 부호 정답");
assert(checkAnswer("1.5", "1.5", codeOutput), "코드 채점: 소수 정답");
assert(checkAnswer("12 3", "12 3", codeOutput), "코드 채점: 토큰 정답");
assert(checkAnswer("abc", "abc", codeOutput), "코드 채점: 소문자 정답");
assert(
  checkAnswer("  -5\n", "-5", codeOutput),
  "코드 채점: 앞뒤 공백·줄바꿈 허용",
);
assert(checkAnswer("-5\r\n", "-5", codeOutput), "코드 채점: CRLF 허용");
assert(checkAnswer("그룹바이", "GROUP BY"), "이론 채점: 동의어 유지");
assert(
  getQuestionOriginLabel({
    id: "GEMINI_MEMO_1",
    subject: "신기술/보안",
    category: "보안",
    type: "SHORT_ANSWER",
    question: "x",
    answer: "y",
    explanation: "z",
    difficulty: "EASY",
    keywords: [],
    source: "Gemini 암기 생성",
  }) === "AI 생성",
  "출처: Gemini 문항은 AI 생성",
);

const today = new Date().toISOString();
const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
const fourDaysAgo = new Date(
  Date.now() - 4 * 24 * 60 * 60 * 1000,
).toISOString();
assert(
  getDueReviewQuestionIds([{ ...unknownAttempt, answeredAt: today }]).includes(
    "q1",
  ),
  "복습: 모름은 당일 큐에 포함",
);
assert(
  getDueReviewQuestionIds([
    { ...confusedAttempt, answeredAt: yesterday },
  ]).includes("q1"),
  "복습: 헷갈림은 하루 뒤 포함",
);
assert(
  getDueReviewQuestionIds([
    {
      ...confusedAttempt,
      isCorrect: true,
      missType: undefined,
      answeredAt: fourDaysAgo,
    },
  ]).includes("q1"),
  "복습: 정답은 3일 뒤 포함",
);
assert(
  !getDueReviewQuestionIds([
    { ...confusedAttempt, answeredAt: today },
  ]).includes("q1"),
  "복습: 헷갈림은 당일 제외",
);
assert(
  !getDueReviewQuestionIds([
    {
      ...confusedAttempt,
      isCorrect: true,
      missType: undefined,
      answeredAt: yesterday,
    },
  ]).includes("q1"),
  "복습: 정답은 하루 뒤 제외",
);
assert(
  !getDueReviewQuestionIds([
    {
      ...confusedAttempt,
      isCorrect: true,
      missType: undefined,
      hintUsed: true,
      answeredAt: today,
    },
  ]).includes("q1"),
  "복습: 힌트 보고 맞힌 문항은 당일 승급하지 않고 다음날",
);

assert(
  measureKeyboardOverlap({
    reportedHeight: 700,
    keyboardScreenY: 1600,
    screenHeight: 2400,
    windowHeight: 2344,
  }) === 744,
  "키보드: 일반폰은 창 하단과 겹친 높이 사용",
);
assert(
  measureKeyboardOverlap({
    reportedHeight: 600,
    keyboardScreenY: 1800,
    screenHeight: 2400,
    windowHeight: 1100,
  }) === 0,
  "키보드: 폴드 분할에서 창 밖 키보드는 무시",
);
assert(
  measureKeyboardOverlap({
    reportedHeight: 352,
    keyboardScreenY: 500,
    screenHeight: 852,
    windowHeight: 852,
  }) === 352,
  "키보드: iPhone은 보고된 높이를 사용",
);

const shuffled = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8]);
assert(shuffled.length === 8, "셔플 길이 유지");
assert([...shuffled].sort().join() === "1,2,3,4,5,6,7,8", "셔플 원소 보존");
const firsts = new Set(
  Array.from({ length: 20 }, () => shuffleArray([1, 2, 3, 4, 5])[0]),
);
assert(firsts.size > 1, "셔플 시 첫 원소가 고정되지 않음");

const generated = generateProgrammingPracticeBundle(1);
assert(generated.length === 6, `C/Java 생성 6문제 (실제 ${generated.length})`);
const langs = generated.map((q) => q.language);
assert(langs.includes("C") && langs.includes("JAVA"), "C와 Java 모두 생성");
for (const q of generated) {
  assertQuestion(q, q.id);
  assert(q.subject === "프로그래밍언어활용", `${q.id} 과목`);
  assert(q.type === "CODE_TRACE", `${q.id} 유형`);
  assert(!!q.code, `${q.id} 코드`);
}

// -----------------------------------------------------------------
// 신규 기능 테스트: 이론, 두음 암기장, 안 푼 문제 필터링 검증
// -----------------------------------------------------------------
import { THEORY_DATA } from "../src/data/theory/theoryData";
import { MNEMONIC_DATA } from "../src/data/theory/mnemonicData";
import { QuestionRepository } from "../src/repositories/questionRepository";
import { MEMO_TOPIC_SEEDS } from "../src/data/memoTopicSeeds";
import {
  filterNewMemoQuestions,
  isNearDuplicateMemo,
} from "../src/utils/memoDedupe";

// 1. 이론 데이터 검증
assert(
  THEORY_DATA.length >= 10,
  `이론 데이터 10개 이상 (실제 ${THEORY_DATA.length})`,
);
for (const th of THEORY_DATA) {
  assert(!!th.id && !!th.title && !!th.category, `이론 메타: ${th.id}`);
  assert(
    !!th.analogy && th.analogy.length >= 10,
    `이론 비유 작성됨: ${th.title}`,
  );
  assert(th.coreConcepts.length >= 2, `이론 핵심개념 2개 이상: ${th.title}`);
  assert(th.examPoints.length >= 1, `이론 출제포인트 1개 이상: ${th.title}`);
}
const theorySubjects = new Set(THEORY_DATA.map((t) => t.subject));
assert(theorySubjects.size === 5, "5개 전 과목 이론 요약 포함");

// 2. 고빈출 기출 두음 암기장 검증
assert(
  MNEMONIC_DATA.length >= 15,
  `고빈출 두음 데이터 15개 이상 (실제 ${MNEMONIC_DATA.length})`,
);
for (const mn of MNEMONIC_DATA) {
  assert(!!mn.id && !!mn.title && !!mn.acronym, `두음 메타: ${mn.id}`);
  assert(
    !!mn.catchphrase && mn.catchphrase.length >= 5,
    `두음 리듬 암기문구: ${mn.title}`,
  );
  assert(mn.items.length >= 2, `두음 세부 항목 2개 이상: ${mn.title}`);
  assert(!!mn.trapPoint, `두음 시험 함정 주의: ${mn.title}`);
}

// 3. 안 푼 문제 필터링 검증
const allQuestions = QuestionRepository.getAll();
const mockAttempted = new Set([
  allQuestions[0].id,
  allQuestions[1].id,
  allQuestions[2].id,
]);
const unsolved = QuestionRepository.getUnsolvedQuestions(mockAttempted);
assert(
  unsolved.every((q) => !mockAttempted.has(q.id)),
  "안 푼 문제에는 이미 시도한 questionId가 포함되지 않음",
);
assert(
  unsolved.length === allQuestions.length - mockAttempted.size,
  "안 푼 문제 수는 전체 - 시도한 문제 수와 일치",
);

// 과목별 안 푼 문제 필터링
const designUnsolved = QuestionRepository.getUnsolvedQuestions(
  mockAttempted,
  "소프트웨어설계",
);
assert(
  designUnsolved.every(
    (q) => q.subject === "소프트웨어설계" && !mockAttempted.has(q.id),
  ),
  "과목별 안 푼 문제 필터링 정확도",
);

// 4. 이론 연계 문제 검색 및 부족분 보충 검증
// (1) limit 이상 매칭 케이스
const theoryRelated = QuestionRepository.getTheoryRelatedQuestions(
  "소프트웨어설계",
  ["GoF", "디자인패턴", "생성"],
  5,
);
assert(
  theoryRelated.length === 5,
  `이론 문제 검색 limit(5개) 도달 (실제: ${theoryRelated.length}개)`,
);
assert(
  theoryRelated.every((q) => q.subject === "소프트웨어설계"),
  "이론 매칭 문제는 해당 과목에 속함",
);
const theoryIds = new Set(theoryRelated.map((q) => q.id));
assert(
  theoryIds.size === theoryRelated.length,
  "이론 매칭 결과에 중복 ID 없음",
);

// (2) 0개 매칭 시 일반 문제로 보충 케이스
const zeroMatched = QuestionRepository.getTheoryRelatedQuestions(
  "데이터베이스구축",
  ["non_existent_keyword_db_xyz_9999"],
  5,
);
assert(
  zeroMatched.length === 5,
  `0개 매칭 시 동일 과목 문제로 5개 보충 (실제: ${zeroMatched.length}개)`,
);
assert(
  zeroMatched.every((q) => q.subject === "데이터베이스구축"),
  "보충 문제 과목 일치",
);
assert(
  new Set(zeroMatched.map((q) => q.id)).size === 5,
  "0개 매칭 보충 결과 중복 ID 없음",
);

// (3) 소수(1개) 매칭 시 부족분 비매칭 문제로 보충 케이스
// 1개만 매칭될 가능성이 높은 고유 키워드 검색
const fewMatched = QuestionRepository.getTheoryRelatedQuestions(
  "데이터베이스구축",
  ["이상 현상", "삽입 이상"],
  5,
);
assert(
  fewMatched.length === 5,
  `소수 매칭 시 5개까지 정확히 보충 (실제: ${fewMatched.length}개)`,
);
assert(
  fewMatched.every((q) => q.subject === "데이터베이스구축"),
  "소수 매칭 보충 문제 과목 일치",
);
assert(
  new Set(fewMatched.map((q) => q.id)).size === 5,
  "소수 매칭 보충 결과 중복 ID 없음",
);

assert(
  MEMO_TOPIC_SEEDS.length >= 100,
  `암기 챕터 시드 100개 이상 (실제 ${MEMO_TOPIC_SEEDS.length})`,
);
assert(
  new Set(MEMO_TOPIC_SEEDS.map((item) => item.id)).size ===
    MEMO_TOPIC_SEEDS.length,
  "암기 챕터 시드 id 중복 없음",
);
assert(
  new Set(MEMO_TOPIC_SEEDS.map((item) => item.chapter)).size >= 20,
  "암기 챕터가 과목보다 세분화됨",
);

const memoOrig: Question = {
  id: "MEMO_ORIG",
  subject: "신기술/보안",
  category: "접근통제",
  chapterId: "sc-rbac",
  chapter: "접근통제",
  type: "SHORT_ANSWER",
  question: "역할 기반 접근통제의 약어를 쓰시오.",
  answer: ["RBAC", "역할기반접근통제"],
  explanation: "원본",
  difficulty: "EASY",
  keywords: ["RBAC"],
};
const memoSameAnswer: Question = {
  ...memoOrig,
  id: "MEMO_SAME_ANS",
  question: "역할을 기반으로 접근을 통제하는 모델의 영문 약어를 쓰시오.",
  answer: "역할기반접근통제",
};
const memoOther: Question = {
  ...memoOrig,
  id: "MEMO_PKI",
  chapterId: "sc-pki",
  chapter: "PKI",
  question: "공개키 기반 구조의 약어를 쓰시오.",
  answer: "PKI",
  keywords: ["PKI"],
};
assert(
  isNearDuplicateMemo(memoSameAnswer, memoOrig),
  "같은 정답 바꿔 말하기는 근사 중복",
);
assert(!isNearDuplicateMemo(memoOther, memoOrig), "다른 정답은 중복이 아님");
assert(
  filterNewMemoQuestions([memoSameAnswer, memoOther], [memoOrig])
    .map((item) => item.id)
    .join() === "MEMO_PKI",
  "생성 묶음에서 근사 중복만 걸러 냄",
);

class TestAttemptStorage extends MemoryStorageAdapter {
  delayMs = 0;
  failNext = false;

  async setItem(key: string, value: string): Promise<void> {
    if (this.delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, this.delayMs));
    }
    if (this.failNext) {
      this.failNext = false;
      throw new Error("저장 실패 테스트");
    }
    await super.setItem(key, value);
  }
}

const sampleQuestion: Question = {
  id: "QUIZ_LOCK_1",
  subject: "소프트웨어설계",
  category: "테스트",
  type: "SHORT_ANSWER",
  question: "잠금 검증용 문제를 쓰시오.",
  answer: "정답",
  explanation: "설명",
  difficulty: "EASY",
  keywords: [],
};

const sampleCodeQuestion: Question = {
  ...sampleQuestion,
  id: "QUIZ_LOCK_2",
  type: "CODE_TRACE",
  subject: "프로그래밍언어활용",
  code: 'printf("%d", -5);',
  question: "실행 결과를 쓰시오.",
  answer: "-5",
};

async function runAsyncSelfTests() {
  console.log("\n=== 제출 잠금·기록 충돌 ===\n");
  const storage = new TestAttemptStorage();
  LocalStorage.setAdapter(storage);
  await AttemptRepository.clearAll();

  const a1: QuizAttempt = {
    id: "att-1",
    questionId: "q-lock",
    selectedAnswer: "1",
    correctAnswer: "1",
    isCorrect: true,
    answeredAt: new Date().toISOString(),
  };
  const a2: QuizAttempt = {
    ...a1,
    id: "att-2",
    selectedAnswer: "2",
  };
  storage.delayMs = 20;
  await Promise.all([
    AttemptRepository.saveAttempt(a1),
    AttemptRepository.saveAttempt(a2),
  ]);
  storage.delayMs = 0;
  const savedAttempts = await AttemptRepository.getAllAttempts();
  assert(
    savedAttempts.some((item) => item.id === "att-1") &&
      savedAttempts.some((item) => item.id === "att-2"),
    "동시 저장도 풀이 기록이 유실되지 않음",
  );

  const store = useQuizStore.getState();
  await AttemptRepository.clearAll();
  store.startQuiz([sampleQuestion], "잠금 테스트");
  store.selectAnswer("정답");
  storage.delayMs = 30;
  const [first, second] = await Promise.all([
    useQuizStore.getState().submitAnswer(),
    useQuizStore.getState().submitAnswer(),
  ]);
  storage.delayMs = 0;
  const stored = await AttemptRepository.getAllAttempts();
  assert(
    [first, second].filter((item) => item.ok).length === 1,
    "연속 제출은 한 번만 성공",
  );
  assert(stored.length === 1, `연속 제출 저장 1회 (실제 ${stored.length})`);
  assert(
    useQuizStore.getState().sessionAttempts.length === 1,
    "화면 세션 기록도 1개",
  );

  await AttemptRepository.clearAll();
  useQuizStore.getState().startQuiz([sampleQuestion], "모름 동시");
  useQuizStore.getState().selectAnswer("오답");
  storage.delayMs = 30;
  const [answerRes, unknownRes] = await Promise.all([
    useQuizStore.getState().submitAnswer(),
    useQuizStore.getState().submitUnknown(),
  ]);
  storage.delayMs = 0;
  const mixed = await AttemptRepository.getAllAttempts();
  assert(
    [answerRes, unknownRes].filter((item) => item.ok).length === 1,
    "정답 제출과 모름은 같은 잠금을 공유",
  );
  assert(mixed.length === 1, `정답/모름 동시 저장 1회 (실제 ${mixed.length})`);

  await AttemptRepository.clearAll();
  useQuizStore.getState().startQuiz([sampleCodeQuestion], "저장 실패");
  useQuizStore.getState().selectAnswer("-5");
  storage.failNext = true;
  const failedSave = await useQuizStore.getState().submitAnswer();
  assert(
    failedSave.ok === false && failedSave.reason === "save_failed",
    "저장 실패를 안내",
  );
  assert(
    useQuizStore.getState().isSubmitted === false &&
      useQuizStore.getState().isSubmitting === false,
    "저장 실패 후 잠금 해제",
  );
  const retry = await useQuizStore.getState().submitAnswer();
  assert(retry.ok && retry.correct, "저장 실패 후 재시도 성공");
  assert(useQuizStore.getState().isSubmitted, "재시도 후 제출 완료");

  await AttemptRepository.clearAll();
  useQuizStore.getState().startQuiz([sampleQuestion], "세션 변경");
  useQuizStore.getState().selectAnswer("정답");
  storage.delayMs = 40;
  const pending = useQuizStore.getState().submitAnswer();
  useQuizStore.getState().startQuiz([sampleCodeQuestion], "새 퀴즈");
  const stale = await pending;
  storage.delayMs = 0;
  assert(stale.ok, "이전 요청 저장 자체는 완료될 수 있음");
  assert(
    useQuizStore.getState().sessionTitle === "새 퀴즈" &&
      useQuizStore.getState().sessionAttempts.length === 0 &&
      useQuizStore.getState().isSubmitted === false,
    "저장 중 세션 변경 시 이전 완료가 새 세션을 덮어쓰지 않음",
  );

  // -----------------------------------------------------------------
  // 정보보안기사 확장 검증: 신규 실행, 앱 재실행, 기존 기록 유지, 객관식 채점, 자격증별 기록 구분
  // -----------------------------------------------------------------
  console.log("\n=== 정보보안기사 확장 및 자격증 분리 검증 ===\n");

  // 0. 정보보안기사 샘플 데이터(이론, 객관식, 필수 암기 카드) 검증
  assert(
    SECURITY_SUBJECTS.length === 5,
    `정보보안기사 5과목 정의됨 (${SECURITY_SUBJECTS.join(", ")})`,
  );
  assert(
    SECURITY_QUESTIONS.length >= 5,
    `정보보안기사 객관식 샘플 문제 존재 (실제 ${SECURITY_QUESTIONS.length}개)`,
  );
  for (const sq of SECURITY_QUESTIONS) {
    assertQuestion(sq, sq.id);
    assert(sq.certification === "SECURITY", `${sq.id} certification=SECURITY`);
    assert(sq.type === "MULTIPLE_CHOICE", `${sq.id} type=MULTIPLE_CHOICE`);
    assert(
      Array.isArray(sq.options) && sq.options.length === 4,
      `${sq.id} 4지선다 보기 4개`,
    );
    assert(
      sq.options!.includes(String(sq.answer)),
      `${sq.id} 정답이 보기 목록에 포함됨`,
    );
  }
  assert(
    SECURITY_THEORY_DATA.length >= 5,
    `정보보안기사 이론 샘플 존재 (실제 ${SECURITY_THEORY_DATA.length}개)`,
  );
  for (const st of SECURITY_THEORY_DATA) {
    assert(
      st.certification === "SECURITY" &&
        !!st.id &&
        !!st.title &&
        st.coreConcepts.length >= 2,
      `정보보안기사 이론 메타 유효: ${st.id}`,
    );
  }
  assert(
    SECURITY_MEMO_CARDS.length >= 5,
    `정보보안기사 필수 암기 카드(1장 1개념) 샘플 존재 (실제 ${SECURITY_MEMO_CARDS.length}개)`,
  );
  for (const mc of SECURITY_MEMO_CARDS) {
    assert(
      !!mc.id &&
        !!mc.concept.trim() &&
        !!mc.oneLiner.trim() &&
        mc.keyPoints.length >= 2 &&
        !!mc.memoryTip.trim(),
      `필수 암기 카드(1장 1개념) 유효: ${mc.id} (${mc.concept})`,
    );
  }

  // 1. 신규 실행: 자격증 선택값이 없는 상태에서 loadSettings() 실행 시 selectedCertification === null
  const certStorage = new MemoryStorageAdapter();
  LocalStorage.setAdapter(certStorage);
  useSettingsStore.setState({
    selectedCertification: null,
    isSettingsLoaded: false,
  });
  await useSettingsStore.getState().loadSettings();
  assert(
    useSettingsStore.getState().isSettingsLoaded === true &&
      useSettingsStore.getState().selectedCertification === null,
    "신규 실행: 자격증 선택값이 없으면 selectedCertification이 null로 로드됨 (선택 화면 표시 조건)",
  );

  // 2. 자격증 선택 및 앱 재실행: 선택한 자격증이 저장되고 재실행 시 그대로 복원됨
  await Promise.all([
    useSettingsStore.getState().setSelectedCertification("SECURITY"),
    useUserStore.getState().setDailyTarget(12),
  ]);
  const savedSettings = await LocalStorage.getItem<{dailyTarget: number; selectedCertification: string}>(STORAGE_KEYS.SETTINGS);
  assert(savedSettings?.dailyTarget === 12 && savedSettings.selectedCertification === "SECURITY",
    "일일 목표와 자격증을 동시에 변경해도 재실행용 설정에 모두 저장됨");
  assert(
    useSettingsStore.getState().selectedCertification === "SECURITY",
    "자격증 선택 즉시 상태 반영 (SECURITY)",
  );
  // 앱 재실행 시뮬레이션 (메모리 상태 초기화 후 스토리지에서 재로드)
  useSettingsStore.setState({
    selectedCertification: null,
    isSettingsLoaded: false,
  });
  await useSettingsStore.getState().loadSettings();
  assert(
    useSettingsStore.getState().isSettingsLoaded === true &&
      useSettingsStore.getState().selectedCertification === "SECURITY",
    "앱 재실행: 저장된 자격증(SECURITY)으로 바로 복원됨",
  );

  await useSettingsStore.getState().setSelectedCertification("JUNGCHEOGI");
  useSettingsStore.setState({
    selectedCertification: null,
    isSettingsLoaded: false,
  });
  await useSettingsStore.getState().loadSettings();
  assert(
    useSettingsStore.getState().selectedCertification === "JUNGCHEOGI",
    "앱 재실행: 저장된 자격증(JUNGCHEOGI)으로 바로 복원됨",
  );

  // 3. 기존 설치에서 선택 화면이 처음 표시돼도 정보처리기사 학습 기록 보존 검증
  const legacyStorage = new MemoryStorageAdapter();
  LocalStorage.setAdapter(legacyStorage);
  // 구버전 설치 상태 시뮬레이션: @settings에 selectedCertification이 없고, @quiz_attempts와 @bookmarks에 certification 필드가 없는 기존 정처기 기록이 존재
  const legacyAttempt: QuizAttempt = {
    id: "legacy-att-1",
    questionId: "PROG_001",
    selectedAnswer: "오답",
    correctAnswer: "정답",
    isCorrect: false,
    missType: "WRONG",
    answeredAt: new Date().toISOString(),
  };
  await LocalStorage.setItem(STORAGE_KEYS.QUIZ_ATTEMPTS, [legacyAttempt]);
  await LocalStorage.setItem(STORAGE_KEYS.BOOKMARKS, [
    { questionId: "DB_001", createdAt: new Date().toISOString() },
  ]);
  await LocalStorage.setItem(STORAGE_KEYS.SETTINGS, {
    isDarkMode: true,
    dailyTarget: 10,
  });

  useSettingsStore.setState({
    selectedCertification: null,
    isSettingsLoaded: false,
  });
  await useSettingsStore.getState().loadSettings();
  assert(
    useSettingsStore.getState().selectedCertification === null,
    "기존 설치 업그레이드 직후: 선택값이 없으므로 자격증 선택 화면이 표시됨",
  );

  // 선택 화면에서 정보처리기사를 선택했을 때 기존 학습 기록과 북마크가 그대로 유지되는지 확인
  await useSettingsStore.getState().setSelectedCertification("JUNGCHEOGI");
  const preservedAttempts =
    await AttemptRepository.getAllAttempts("JUNGCHEOGI");
  const preservedWrongIds = await AttemptRepository.getWrongQuestionIds(
    "all",
    "JUNGCHEOGI",
  );
  const preservedBookmarks =
    await BookmarkRepository.getBookmarkedQuestionIds("JUNGCHEOGI");
  assert(
    preservedAttempts.length === 1 &&
      preservedAttempts[0].id === "legacy-att-1",
    "기존 정보처리기사 풀이 기록이 유실 없이 보존됨",
  );
  assert(
    preservedWrongIds.includes("PROG_001"),
    "기존 정보처리기사 오답노트 기록이 그대로 유지됨",
  );
  assert(
    preservedBookmarks.includes("DB_001"),
    "기존 정보처리기사 북마크 기록이 그대로 유지됨",
  );

  // 4. 정보보안기사 객관식 문제 채점(보기 선택, 정답/오답 판정) 및 자격증별 기록 분리 검증
  const secQ1 = SECURITY_QUESTIONS[0];
  const secQ2 = SECURITY_QUESTIONS[1];
  const secQ1WrongOption = secQ1.options!.find((opt) => opt !== secQ1.answer)!;

  assert(
    checkAnswer(String(secQ1.answer), secQ1.answer, secQ1) === true,
    "정보보안기사 객관식 채점: 정답 보기 선택 시 정답 판정",
  );
  assert(
    checkAnswer(secQ1WrongOption, secQ1.answer, secQ1) === false,
    "정보보안기사 객관식 채점: 오답 보기 선택 시 오답 판정",
  );

  // 퀴즈 스토어를 통한 실제 정보보안기사 객관식 풀이 (1문제 정답, 1문제 오답)
  useQuizStore
    .getState()
    .startQuiz([secQ1, secQ2], "정보보안기사 객관식 테스트", {
      preserveOrder: true,
    });
  useQuizStore.getState().selectAnswer(String(secQ1.answer));
  const secSubmit1 = await useQuizStore.getState().submitAnswer();
  assert(
    secSubmit1.ok && secSubmit1.correct === true,
    "정보보안기사 객관식 1번 제출: 정답 처리 완료",
  );
  assert(
    useQuizStore.getState().nextQuestion() === true,
    "정보보안기사 객관식 다음 문제 이동",
  );
  const secQ2WrongOption = secQ2.options!.find((opt) => opt !== secQ2.answer)!;
  useQuizStore.getState().selectAnswer(secQ2WrongOption);
  const secSubmit2 = await useQuizStore.getState().submitAnswer();
  assert(
    secSubmit2.ok && secSubmit2.correct === false,
    "정보보안기사 객관식 2번 제출: 오답 처리 완료",
  );
  await BookmarkRepository.toggle(secQ2.id);

  // 5. 자격증별 문제 목록, 진도, 오답 기록, 북마크, 통계 구분 검증
  const jcPool = QuestionRepository.getAll("JUNGCHEOGI");
  const secPool = QuestionRepository.getAll("SECURITY");
  assert(
    jcPool.length >= 750 &&
      jcPool.every((q) => (q.certification ?? "JUNGCHEOGI") === "JUNGCHEOGI"),
    "문제 목록 구분: 정보처리기사 문제 풀에 보안기사 문제가 섞이지 않음",
  );
  assert(
    secPool.length === SECURITY_QUESTIONS.length &&
      secPool.every((q) => q.certification === "SECURITY"),
    "문제 목록 구분: 정보보안기사 문제 풀에 정처기 문제가 섞이지 않음",
  );

  const jcAttempts = await AttemptRepository.getAllAttempts("JUNGCHEOGI");
  const secAttempts = await AttemptRepository.getAllAttempts("SECURITY");
  assert(
    jcAttempts.length === 1 && jcAttempts[0].questionId === "PROG_001",
    `자격증별 풀이 기록 구분: 정보처리기사 기록 1건 유지 (실제 ${jcAttempts.length})`,
  );
  assert(
    secAttempts.length === 2 &&
      secAttempts.every((a) => a.certification === "SECURITY"),
    `자격증별 풀이 기록 구분: 정보보안기사 기록 2건 분리 (실제 ${secAttempts.length})`,
  );

  const jcWrong = await AttemptRepository.getWrongQuestionIds(
    "all",
    "JUNGCHEOGI",
  );
  const secWrong = await AttemptRepository.getWrongQuestionIds(
    "all",
    "SECURITY",
  );
  assert(
    jcWrong.length === 1 && jcWrong[0] === "PROG_001",
    "자격증별 오답노트 구분: 정보처리기사 오답노트에 보안기사 오답 미포함",
  );
  assert(
    secWrong.length === 1 && secWrong[0] === secQ2.id,
    "자격증별 오답노트 구분: 정보보안기사 오답노트에 정처기 오답 미포함",
  );

  const jcBookmarks =
    await BookmarkRepository.getBookmarkedQuestionIds("JUNGCHEOGI");
  const secBookmarks =
    await BookmarkRepository.getBookmarkedQuestionIds("SECURITY");
  assert(
    jcBookmarks.length === 1 && jcBookmarks[0] === "DB_001",
    "자격증별 북마크 구분: 정보처리기사 북마크 분리",
  );
  assert(
    secBookmarks.length === 1 && secBookmarks[0] === secQ2.id,
    "자격증별 북마크 구분: 정보보안기사 북마크 분리",
  );

  const allRawAttempts = await AttemptRepository.getAllAttempts();
  const jcStats = calculateUserStats(allRawAttempts, "JUNGCHEOGI");
  const secStats = calculateUserStats(allRawAttempts, "SECURITY");
  assert(
    jcStats.totalAttempts === 1 && jcStats.accuracyRate === 0,
    "자격증별 진도·통계 구분: 정보처리기사 통계 정확",
  );
  assert(
    secStats.totalAttempts === 2 && secStats.accuracyRate === 50,
    "자격증별 진도·통계 구분: 정보보안기사 통계 정확 (2문제 중 1정답 = 50%)",
  );

  // 6. 키 없는 상태의 정보보안기사 해설 표시, 명시적 튜터 호출, 기존 정보처리기사 풀이·튜터 흐름 유지 검증
  await GeminiService.saveApiKey("");
  assert(
    (await GeminiService.getApiKey()) === null,
    "API 키 미등록 상태 확인 (getApiKey === null)",
  );

  let tutorApiCallCount = 0;
  let capturedPrompts: string[] = [];
  const trackingFetch = async (_url: string | URL | Request, init?: RequestInit) => {
    tutorApiCallCount += 1;
    const body = init?.body ? JSON.parse(String(init.body)) : {};
    const promptText = body?.contents?.[0]?.parts?.[0]?.text || "";
    capturedPrompts.push(promptText);
    return new Response(
      JSON.stringify({
        candidates: [
          {
            content: {
              parts: [{ text: "정보보안기사 AI 튜터 추가 설명 응답" }],
            },
          },
        ],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  };

  // 6-1. API 키가 없는 상태에서 정보보안기사 답안 제출 직후 정답과 explanation 즉시 표시 & API 미호출 확인
  useQuizStore
    .getState()
    .startQuiz([secQ1, secQ2], "보안기사 해설·튜터 흐름 검증", {
      preserveOrder: true,
    });
  const beforeSubmitView = getPostSubmitExplanationView(
    secQ1,
    useQuizStore.getState().isSubmitted,
  );
  assert(
    beforeSubmitView.visible === false,
    "제출 전에는 보안기사 정답/해설 카드가 표시되지 않음",
  );

  useQuizStore.getState().selectAnswer(secQ1WrongOption);
  const secWrongSubmit = await useQuizStore.getState().submitAnswer();
  assert(
    secWrongSubmit.ok && useQuizStore.getState().isSubmitted === true,
    "API 키가 없어도 보안기사 답안 제출 즉시 완료",
  );

  const afterSubmitView = getPostSubmitExplanationView(
    secQ1,
    useQuizStore.getState().isSubmitted,
    useQuizStore.getState().missType === "UNKNOWN",
  );
  assert(
    afterSubmitView.visible === true &&
      afterSubmitView.requiresApiKey === false &&
      afterSubmitView.correctAnswerText === String(secQ1.answer) &&
      afterSubmitView.explanationText === secQ1.explanation &&
      afterSubmitView.explanationText.length > 10,
    "API 키 없는 상태에서 보안기사 답안 제출 직후 문항의 정답과 explanation이 즉시 표시됨",
  );
  assert(
    afterSubmitView.tutorButtonLabel === SECURITY_TUTOR_REQUEST_BUTTON_LABEL &&
      afterSubmitView.tutorButtonLabel === "AI 튜터에게 추가 설명 요청",
    "보안기사 해설 하단 버튼 문구는 'AI 튜터에게 추가 설명 요청'",
  );

  // 보안기사에서 '모른다'를 눌러도 튜터가 자동 호출되지 않고 기본 정답·해설만 표시되는지 확인
  useQuizStore.getState().nextQuestion();
  const secUnknownSubmit = await useQuizStore.getState().submitUnknown();
  assert(
    secUnknownSubmit.ok &&
      shouldAutoOpenTutorOnUnknown(secQ2) === false &&
      tutorApiCallCount === 0,
    "보안기사 답안 제출 및 '모른다' 제출 시 AI 튜터 API가 자동 호출되지 않음 (호출 0회)",
  );
  const afterUnknownView = getPostSubmitExplanationView(
    secQ2,
    useQuizStore.getState().isSubmitted,
    true,
  );
  assert(
    afterUnknownView.visible === true &&
      afterUnknownView.correctAnswerText === String(secQ2.answer) &&
      afterUnknownView.explanationText === secQ2.explanation,
    "보안기사 '모른다' 제출 직후에도 API 키 없이 정답과 explanation이 즉시 표시됨",
  );

  // 6-2. 사용자가 명시적으로 'AI 튜터에게 추가 설명 요청'을 눌렀을 때만 API 호출 및 문항·보기·선택 답·정답·기본 해설 맥락 전달 검증
  await GeminiService.saveApiKey("AQ.dummy_security_tutor_key");
  assert(
    tutorApiCallCount === 0,
    "사용자가 'AI 튜터에게 추가 설명 요청'을 누르기 전까지 API 호출 0회 유지",
  );

  const tutorResponse = await GeminiService.askTutorStream(
    {
      question: secQ1,
      userAnswer: secQ1WrongOption,
      userPrompt: SECURITY_TUTOR_REQUEST_BUTTON_LABEL,
      missType: "WRONG",
    },
    () => {},
    {
      fetchFn: trackingFetch as any,
      sleepFn: async () => {},
    },
  );
  assert(
    tutorApiCallCount === 1 &&
      tutorResponse === "정보보안기사 AI 튜터 추가 설명 응답",
    "사용자가 명시적으로 'AI 튜터에게 추가 설명 요청'을 눌렀을 때만 API가 1회 호출됨",
  );
  const sentPrompt = capturedPrompts[0] || "";
  assert(
    sentPrompt.includes(secQ1.question) &&
      secQ1.options!.every((opt) => sentPrompt.includes(opt)) &&
      sentPrompt.includes(`- 선택 답: ${secQ1WrongOption}`) &&
      sentPrompt.includes(`- 정답: ${secQ1.answer}`) &&
      sentPrompt.includes(`- 기본 해설: ${secQ1.explanation}`),
    "보안기사 튜터 호출 시 문항·보기·선택 답·정답·기본 해설 5가지가 모두 질문 맥락으로 전달됨",
  );

  // 6-3. 기존 정보처리기사(JUNGCHEOGI) 해설 화면과 튜터 사용 흐름 유지 검증
  const jcSampleQuestion = jcPool[0];
  useQuizStore
    .getState()
    .startQuiz([jcSampleQuestion], "정보처리기사 흐름 유지 검증", {
      preserveOrder: true,
    });
  useQuizStore.getState().selectAnswer("임의오답");
  const jcSubmitRes = await useQuizStore.getState().submitAnswer();
  assert(
    jcSubmitRes.ok && useQuizStore.getState().isSubmitted === true,
    "기존 정보처리기사 주관식 풀이 및 채점 흐름 정상 동작",
  );
  assert(
    shouldAutoOpenTutorOnUnknown(jcSampleQuestion) === true &&
      getTutorButtonLabel(jcSampleQuestion, false) ===
        "✨ Gemini AI 튜터에게 이 문제 과외받기" &&
      getTutorButtonLabel(jcSampleQuestion, true) ===
        "📘 이 단원(챕터) 개념부터 과외받기",
    "기존 정보처리기사 해설 화면의 튜터 버튼 문구 및 '모른다' 단원 과외 자동 오픈 흐름 유지",
  );
  const jcPrompt = buildTutorPrompt({
    question: jcSampleQuestion,
    userAnswer: "임의오답",
    userPrompt: "이 문제 설명해줘",
    missType: "WRONG",
  });
  assert(
    jcPrompt.includes("정보처리기사 실기 전담 1:1 스타 강사") &&
      jcPrompt.includes("[독립 정답 검증 및 채점 안전 절대 원칙 - 필수 준수]"),
    "기존 정보처리기사 AI 튜터 프롬프트 및 독립 정답 검증 규칙 유지",
  );

  // 7. 정보보안기사 `과목 → 챕터 → 세부 섹션` 선택 흐름, 출처·출제기준 분리 필터, 교재 목차 매핑 및 기록 보존 검증
  {
    const validChapterIds = new Set(
      SECURITY_OFFICIAL_CHAPTERS.map((ch) => ch.chapterId),
    );
    const validSectionIds = new Set(
      SECURITY_OFFICIAL_SECTIONS.map((sec) => sec.sectionId),
    );

    const secIdSet = new Set<string>(ALL_QUESTIONS.map((q) => q.id));
    const secStemSet = new Set<string>();
    let secDupIds = 0;
    let secDupStems = 0;
    let secUniqueCheckFails = 0;
    let secLawMissingDate = 0;
    let secPracticalLeaks = 0;

    for (const q of SECURITY_QUESTIONS) {
      if (secIdSet.has(q.id)) secDupIds++;
      secIdSet.add(q.id);

      const normStem = q.question.replace(/\s+/g, "").toLowerCase();
      if (secStemSet.has(normStem)) secDupStems++;
      secStemSet.add(normStem);

      const ans = Array.isArray(q.answer) ? q.answer[0] : q.answer;
      const opts = q.options ?? [];
      const uniqOpts = new Set(opts);
      const matched = opts.filter((opt) => checkAnswer(opt, q.answer, q));
      if (
        opts.length !== 4 ||
        uniqOpts.size !== 4 ||
        !opts.includes(ans) ||
        matched.length !== 1 ||
        matched[0] !== ans
      ) {
        secUniqueCheckFails++;
      }

      if (q.chapterId === "SEC_CH_LAW_02" || q.sectionId === "SEC_SEC_LAW_01_03") {
        if (!q.explanation.includes("기준일")) secLawMissingDate++;
      }

      if (q.syllabusStandard === "2027_2029" || q.is2027RevisionPrep) {
        const blob = `${q.question} ${opts.join(" ")} ${q.explanation}`;
        if (
          blob.includes("OWASP API Security Top 10") ||
          blob.includes("동형암호") ||
          blob.includes("경량암호")
        ) {
          secPracticalLeaks++;
        }
      }
    }

    const secCommonQuestions = SECURITY_QUESTIONS.filter(
      (q) =>
        q.sourceKind === "CREATED" &&
        q.syllabusStandard === "2023_2026" &&
        !q.is2027RevisionPrep,
    );
    const sec2027Questions = SECURITY_QUESTIONS.filter(
      (q) =>
        q.sourceKind === "CREATED" &&
        q.syllabusStandard === "2027_2029" &&
        q.is2027RevisionPrep === true,
    );
    const rawOptions = secCommonQuestions.map(q => [...q.options!]);
    useQuizStore.getState().startQuiz(secCommonQuestions);
    const session = useQuizStore.getState().questions;
    assert(new Set(session.map(q => q.options!.indexOf(String(q.answer)))).size === 4 &&
      session.every(q => q.options!.filter(opt => checkAnswer(opt, q.answer, q)).length === 1),
      "새 보안기사 퀴즈는 정답 위치가 분산되고 보기마다 정확히 채점됨");
    useQuizStore.getState().startQuiz(session, "재도전", { preserveOrder: true });
    assert(useQuizStore.getState().questions.every((q, i) => q === session[i]) &&
      secCommonQuestions.every((q, i) => q.options!.every((opt, j) => opt === rawOptions[i][j])),
      "재도전 시 보기 순서 유지 및 원본 문제은행 보존");
    assert(!checkAnswer("s", "S", {type: "MULTIPLE_CHOICE", options: ["s", "S"]}),
      "대소문자로 구별하는 보기 채점");
    const secPastQuestions = SECURITY_QUESTIONS.filter(
      (q) => q.sourceKind === "PAST_EXAM",
    );

    assert(
      SECURITY_QUESTIONS.length === secCommonQuestions.length + sec2027Questions.length + secPastQuestions.length &&
        secCommonQuestions.length >= 300 &&
        sec2027Questions.length >= 100 &&
        secPastQuestions.every(q => q.examYear && q.examRound && q.source) &&
        SECURITY_QUESTIONS.every(
          (q) =>
            !!q.chapterId &&
            validChapterIds.has(q.chapterId) &&
            !!q.chapter &&
            !!q.sectionId &&
            validSectionIds.has(q.sectionId) &&
            !!q.section &&
            !!q.explanation &&
            q.explanation.trim().length >= 30 &&
            (q.sourceKind === "CREATED" || q.sourceKind === "PAST_EXAM") &&
            (q.syllabusStandard === "2023_2026" ||
              q.syllabusStandard === "2027_2029"),
        ),
      `정보보안기사 확장 문제은행 ${SECURITY_QUESTIONS.length}문항(공통 ${secCommonQuestions.length} + 개정 대비 ${sec2027Questions.length} + 기출 ${secPastQuestions.length}) 모두 유효한 메타·해설에 연결됨`,
    );
    assert(
      secDupIds === 0 &&
        secDupStems === 0 &&
        secUniqueCheckFails === 0 &&
        secLawMissingDate === 0 &&
        secPracticalLeaks === 0,
      `보안기사 400문항 무결성 검증 통과 (ID 중복 ${secDupIds}, 문항 중복 ${secDupStems}, 4지선다 유일 정답 오류 ${secUniqueCheckFails}, 법규 기준일 누락 ${secLawMissingDate}, 실기전용 혼입 ${secPracticalLeaks})`,
    );

    // 7-1. 선택 전 문항 수 계산 및 챕터 전체 vs 특정 세부 섹션 선택 출제 검증
    const sysCh1Counts = QuestionRepository.getSecurityScopeCounts({
      subject: "시스템 보안",
      chapterId: "SEC_CH_SYS_01",
    });
    const sysSec1Counts = QuestionRepository.getSecurityScopeCounts({
      subject: "시스템 보안",
      chapterId: "SEC_CH_SYS_01",
      sectionId: "SEC_SEC_SYS_01_01",
    });
    const sysSec2Counts = QuestionRepository.getSecurityScopeCounts({
      subject: "시스템 보안",
      chapterId: "SEC_CH_SYS_01",
      sectionId: "SEC_SEC_SYS_01_02",
    });
    const sysSec3Counts = QuestionRepository.getSecurityScopeCounts({
      subject: "시스템 보안",
      chapterId: "SEC_CH_SYS_01",
      sectionId: "SEC_SEC_SYS_01_03",
    });

    const chapterBank = SECURITY_QUESTIONS.filter(q => q.chapterId === "SEC_CH_SYS_01");
    const sectionBank = (id: string) => chapterBank.filter(q => q.sectionId === id);
    assert(
      sysCh1Counts.availableCount === chapterBank.length &&
        sysSec1Counts.availableCount === sectionBank("SEC_SEC_SYS_01_01").length &&
        sysSec2Counts.availableCount === sectionBank("SEC_SEC_SYS_01_02").length &&
        sysSec3Counts.availableCount === sectionBank("SEC_SEC_SYS_01_03").length,
      "챕터·세부 섹션 표시 건수가 실제 등록 문항과 일치",
    );

    const ch1Questions = QuestionRepository.getSecurityQuestionsByScope({
      subject: "시스템 보안",
      chapterId: "SEC_CH_SYS_01",
    });
    const sec1OnlyQuestions = QuestionRepository.getSecurityQuestionsByScope({
      subject: "시스템 보안",
      chapterId: "SEC_CH_SYS_01",
      sectionId: "SEC_SEC_SYS_01_01",
    });

    assert(
      ch1Questions.length === chapterBank.length &&
        ch1Questions.every((q) => q.chapterId === "SEC_CH_SYS_01"),
      "챕터 전체 선택 시 해당 챕터(SEC_CH_SYS_01)의 문항이 모두 출제됨",
    );
    assert(
      sec1OnlyQuestions.length === sysSec1Counts.availableCount &&
        sec1OnlyQuestions.every(
          (q) => q.sectionId === "SEC_SEC_SYS_01_01",
        ) &&
        ["SEC_EXAM_SYS_001", "SEC_EXAM_SYS_002", "SEC_EXAM_SYS_003"].every(
          (id) => sec1OnlyQuestions.some((q) => q.id === id),
        ),
      "특정 세부 섹션(SEC_SEC_SYS_01_01) 선택 시 기존 3문항 포함 해당 섹션 문항만 정확히 출제됨",
    );

    // 7-2. 같은 섹션 내 전체 문제 / 실제 기출 / 2027 개정 대비 필터 및 연도·회차 vs 적용 기준 구분 검증
    const samplePastExamQuestion: Question = {
      id: "SEC_PAST_2022_R2_LAW_01",
      certification: "SECURITY",
      subject: "정보보안 관리 및 법규",
      category: "개인정보 보호법",
      chapterId: "SEC_CH_LAW_02",
      chapter: "2장. 개인정보 보호법 및 정보보안 관련 법규",
      sectionId: "SEC_SEC_LAW_02_01",
      section:
        "2-1. 개인정보 보호법 고유식별정보·민감정보 및 유출 통지·신고 (72시간 통지·신고, 2026~2027 개정)",
      sourceKind: "PAST_EXAM",
      examYear: 2022,
      examRound: 2,
      syllabusStandard: "2023_2026",
      syllabusItemCode: "5-2-1",
      type: "MULTIPLE_CHOICE",
      question: "다음 중 개인정보 보호법상 고유식별정보에 해당하지 않는 것은?",
      options: ["주민등록번호", "여권번호", "운전면허번호", "사원번호"],
      answer: "사원번호",
      explanation: "고유식별정보는 주민등록번호, 여권번호, 운전면허번호, 외국인등록번호 4종입니다.",
      difficulty: "EASY",
      keywords: ["고유식별정보"],
      source: "정보보안기사 필기 기출",
    };

    const mixedPool = [
      ...QuestionRepository.getAll("SECURITY"),
      samplePastExamQuestion,
    ];
    const lawSecAll = filterSecurityQuestionsByScope(mixedPool, {
      subject: "정보보안 관리 및 법규",
      chapterId: "SEC_CH_LAW_02",
      sectionId: "SEC_SEC_LAW_02_01",
      filterMode: "ALL",
    });
    const lawSecPastOnly = filterSecurityQuestionsByScope(mixedPool, {
      subject: "정보보안 관리 및 법규",
      chapterId: "SEC_CH_LAW_02",
      sectionId: "SEC_SEC_LAW_02_01",
      filterMode: "PAST_EXAM",
    });
    const lawSecRevised2027Only = filterSecurityQuestionsByScope(mixedPool, {
      subject: "정보보안 관리 및 법규",
      chapterId: "SEC_CH_LAW_02",
      sectionId: "SEC_SEC_LAW_02_01",
      filterMode: "REVISED_2027",
    });

    assert(
      lawSecAll.length === mixedPool.filter(q => q.sectionId === "SEC_SEC_LAW_02_01").length &&
        lawSecPastOnly.every(q => q.sourceKind === "PAST_EXAM") &&
        lawSecPastOnly.includes(samplePastExamQuestion) &&
        lawSecRevised2027Only.every(q => q.syllabusStandard === "2027_2029" || q.is2027RevisionPrep) &&
        lawSecRevised2027Only.some((q) => q.id === "SEC_2027_LAW_020"),
      "같은 섹션(SEC_SEC_LAW_02_01)에서 전체 문제, 실제 기출, 2027 개정 대비를 각각 정확히 골라 풀 수 있음",
    );

    const createdCurrentQ = SECURITY_QUESTIONS.find(
      (q) => q.id === "SEC_EXAM_LAW_006",
    )!;
    const created2027Q = SECURITY_QUESTIONS.find(
      (q) => q.id === "SEC_2027_LAW_020",
    )!;
    assert(
      getSecurityQuestionSourceBadgeLabel(samplePastExamQuestion) ===
        "실제 기출 · 2022년 2회" &&
        getSecurityQuestionSourceBadgeLabel(createdCurrentQ) === "창작 문항" &&
        createdCurrentQ.examYear === undefined &&
        createdCurrentQ.examRound === undefined &&
        getSecurityQuestionStandardBadgeLabel(createdCurrentQ) ===
          "2023~2026 출제기준" &&
        getSecurityQuestionStandardBadgeLabel(created2027Q) ===
          "2027~2029 개정 기준",
      "실제 기출의 연도·회차(실제 기출 · 2022년 2회)와 창작 문항의 적용 기준(2023~2026 vs 2027~2029)이 명확히 구분됨",
    );

    // 7-3. 추후 교재명·판본·목차 매핑 시에도 문항 ID와 학습 기록이 유지되는지 검증
    const attemptedBeforeBook =
      await AttemptRepository.getAttemptedQuestionIds("SECURITY");
    const bookmarksBeforeBook =
      await BookmarkRepository.getBookmarkedQuestionIds("SECURITY");
    assert(
      attemptedBeforeBook.has("SEC_EXAM_SYS_001"),
      "교재 매핑 전 SEC_EXAM_SYS_001 풀이 기록 존재 확인",
    );

    registerSecurityTextbook({
      bookId: "BOOK_SEC_2026_V1",
      bookTitle: "정보보안기사 필기 표준 기본서",
      edition: "2026~2027 대비판",
      chapters: [
        {
          bookChapterId: "BOOK_CH_SYS_A",
          subject: "시스템 보안",
          title: "Part 1. 유닉스/리눅스 시스템 보안 실무",
          sections: [
            {
              bookSectionId: "BOOK_SEC_SYS_A_01",
              bookChapterId: "BOOK_CH_SYS_A",
              subject: "시스템 보안",
              title: "Section 01. 파일 권한과 특수 비트 완벽 정리",
              syllabusSectionIds: ["SEC_SEC_SYS_01_01"],
            },
          ],
        },
      ],
    });

    assert(
      getSecurityTaxonomyBasisLabel().includes(
        "정보보안기사 필기 표준 기본서 (2026~2027 대비판)",
      ),
      "교재 목차 등록 시 분류 기준 라벨이 교재명·판본으로 전환됨",
    );

    const bookChapters = QuestionRepository.getSecurityChapters("시스템 보안");
    const bookSectionQuestions = QuestionRepository.getSecurityQuestionsByScope(
      {
        subject: "시스템 보안",
        chapterId: "BOOK_CH_SYS_A",
        sectionId: "BOOK_SEC_SYS_A_01",
      },
    );
    const attemptedAfterBook =
      await AttemptRepository.getAttemptedQuestionIds("SECURITY");
    const bookmarksAfterBook =
      await BookmarkRepository.getBookmarkedQuestionIds("SECURITY");

    assert(
      bookChapters.length === 1 &&
        bookChapters[0].chapterId === "BOOK_CH_SYS_A" &&
        bookSectionQuestions.length === sec1OnlyQuestions.length &&
        ["SEC_EXAM_SYS_001", "SEC_EXAM_SYS_002", "SEC_EXAM_SYS_003"].every(
          (id) => bookSectionQuestions.some((q) => q.id === id),
        ),
      "교재 목차(BOOK_SEC_SYS_A_01) 선택 시에도 기존 문항 ID(SEC_EXAM_SYS_001~003) 포함 섹션 문항이 변경 없이 그대로 연결됨",
    );
    assert(
      attemptedAfterBook.size === attemptedBeforeBook.size &&
        attemptedAfterBook.has("SEC_EXAM_SYS_001") &&
        bookmarksAfterBook.join(",") === bookmarksBeforeBook.join(","),
      "교재 매핑 추가 후에도 기존 풀이 기록과 북마크가 100% 보존됨",
    );

    clearSecurityTextbook();

    // 7-4. 정보처리기사의 과목 선택과 기록에는 영향이 없는지 확인
    for (const jcSub of SUBJECTS) {
      const jcSubQuestions = QuestionRepository.getBySubject(
        jcSub,
        "JUNGCHEOGI",
      );
      assert(
        jcSubQuestions.length > 0 &&
          jcSubQuestions.every(
            (q) => (q.certification ?? "JUNGCHEOGI") === "JUNGCHEOGI",
          ),
        `정보처리기사 '${jcSub}' 과목 선택 및 문항 목록(${jcSubQuestions.length}문항) 영향 없음 확인`,
      );
    }
    const jcAttemptsAfter =
      await AttemptRepository.getAllAttempts("JUNGCHEOGI");
    assert(
      jcAttemptsAfter.length >= 1 &&
        jcAttemptsAfter.some((a) => a.questionId === "PROG_001"),
      "정보처리기사 학습 기록이 보안기사 분류·필터 변경 후에도 그대로 유지됨",
    );

    // 8. ResultScreen 학습 피드백 문구 및 세션 집계 검증 (100%, 60% 전후, 오답·모름이 있는 짧은 세션)
    {
      const forbiddenPassPhrases = [
        "실기 합격 안정권",
        "합격 커트라인",
        "반드시 합격",
      ];

      // 8-1. 100% 세션 (보안기사 3문항 모두 정답)
      const secPerfectQuestions = SECURITY_QUESTIONS.slice(0, 3);
      useQuizStore
        .getState()
        .startQuiz(secPerfectQuestions, "보안기사 100% 세션 검증", {
          preserveOrder: true,
        });
      for (let i = 0; i < secPerfectQuestions.length; i++) {
        useQuizStore
          .getState()
          .selectAnswer(String(secPerfectQuestions[i].answer));
        await useQuizStore.getState().submitAnswer();
        if (i < secPerfectQuestions.length - 1) {
          useQuizStore.getState().nextQuestion();
        }
      }
      const perfectSummary = summarizeSessionAttempts(
        useQuizStore.getState().sessionAttempts,
      );
      assert(
        perfectSummary.total === 3 &&
          perfectSummary.correctCount === 3 &&
          perfectSummary.confusedCount === 0 &&
          perfectSummary.unknownCount === 0 &&
          perfectSummary.missCount === 0 &&
          perfectSummary.scoreRate === 100 &&
          perfectSummary.feedbackMessage.includes("이번 세션 정답률 100%") &&
          perfectSummary.feedbackMessage.includes(
            "복습이 필요한 오답·모름 문항이 없습니다",
          ) &&
          forbiddenPassPhrases.every(
            (p) => !perfectSummary.feedbackMessage.includes(p),
          ),
        "100% 세션: 합격 판정 없이 실제 정답률(100%)과 복습 불필요 안내 표시",
      );

      // 8-2. 60% 전후 세션 (5문항: 정답 3, 헷갈림 1, 모름 1 -> 60%)
      const sec60Questions = SECURITY_QUESTIONS.slice(3, 8);
      useQuizStore
        .getState()
        .startQuiz(sec60Questions, "보안기사 60% 세션 검증", {
          preserveOrder: true,
        });
      for (let i = 0; i < 3; i++) {
        useQuizStore.getState().selectAnswer(String(sec60Questions[i].answer));
        await useQuizStore.getState().submitAnswer();
        useQuizStore.getState().nextQuestion();
      }
      const wrongOpt3 = sec60Questions[3].options!.find(
        (o) => o !== String(sec60Questions[3].answer),
      )!;
      useQuizStore.getState().selectAnswer(wrongOpt3);
      await useQuizStore.getState().submitAnswer();
      useQuizStore.getState().nextQuestion();
      await useQuizStore.getState().submitUnknown();

      const sixtySummary = summarizeSessionAttempts(
        useQuizStore.getState().sessionAttempts,
      );
      assert(
        sixtySummary.total === 5 &&
          sixtySummary.correctCount === 3 &&
          sixtySummary.confusedCount === 1 &&
          sixtySummary.unknownCount === 1 &&
          sixtySummary.missCount === 2 &&
          sixtySummary.scoreRate === 60 &&
          sixtySummary.feedbackMessage.includes("이번 세션 정답률은 60%입니다.") &&
          sixtySummary.feedbackMessage.includes(
            "헷갈린 문항 1개와 모름 문항 1개(총 2개)",
          ) &&
          forbiddenPassPhrases.every(
            (p) => !sixtySummary.feedbackMessage.includes(p),
          ),
        "60% 전후 세션: 합격 커트라인 문구 없이 정답률(60%)과 복습 대상(헷갈림 1·모름 1) 안내",
      );

      // 8-3. 오답·모름이 있는 짧은 세션 (정보처리기사 3문항: 정답 1, 헷갈림 1, 모름 1 -> 33%)
      const jcShortQuestions = jcPool.slice(0, 3);
      useQuizStore
        .getState()
        .startQuiz(jcShortQuestions, "정처기 짧은 세션 검증", {
          preserveOrder: true,
        });
      const jcAns0 = Array.isArray(jcShortQuestions[0].answer)
        ? jcShortQuestions[0].answer[0]
        : jcShortQuestions[0].answer;
      useQuizStore.getState().selectAnswer(String(jcAns0));
      await useQuizStore.getState().submitAnswer();
      useQuizStore.getState().nextQuestion();
      useQuizStore.getState().selectAnswer("의도적오답_세션검증");
      await useQuizStore.getState().submitAnswer();
      useQuizStore.getState().nextQuestion();
      await useQuizStore.getState().submitUnknown();

      const shortSummary = summarizeSessionAttempts(
        useQuizStore.getState().sessionAttempts,
      );
      assert(
        shortSummary.total === 3 &&
          shortSummary.correctCount === 1 &&
          shortSummary.confusedCount === 1 &&
          shortSummary.unknownCount === 1 &&
          shortSummary.missCount === 2 &&
          shortSummary.scoreRate === 33 &&
          shortSummary.feedbackMessage.includes("이번 세션 정답률은 33%입니다.") &&
          shortSummary.feedbackMessage.includes(
            "헷갈린 문항 1개와 모름 문항 1개(총 2개)",
          ) &&
          forbiddenPassPhrases.every(
            (p) => !shortSummary.feedbackMessage.includes(p),
          ),
        "오답·모름이 있는 짧은 세션(정처기 33%): 합격 보장 문구 없이 정답률과 복습 내용 안내",
      );

      // 8-4. 80% 이상 오답만 있는 경우 & 모름만 있는 경우 문구 검증
      const msg80ConfusedOnly = getSessionResultFeedbackMessage({
        total: 5,
        correctCount: 4,
        confusedCount: 1,
        unknownCount: 0,
      });
      const msgUnknownOnly = getSessionResultFeedbackMessage({
        total: 4,
        correctCount: 2,
        confusedCount: 0,
        unknownCount: 2,
      });
      assert(
        msg80ConfusedOnly.includes("80%") &&
          msg80ConfusedOnly.includes("헷갈린 오답 문항 1개") &&
          msgUnknownOnly.includes("50%") &&
          msgUnknownOnly.includes("모름으로 표시한 문항 2개") &&
          forbiddenPassPhrases.every(
            (p) =>
              !msg80ConfusedOnly.includes(p) && !msgUnknownOnly.includes(p),
          ),
        "단독 헷갈림(80%)·단독 모름(50%) 세션 피드백 문구 정확성 확인",
      );
    }
  }

  LocalStorage.setAdapter(new MemoryStorageAdapter());
  useQuizStore.getState().resetQuiz();

  if (failed > 0) {
    console.error(`\n${failed}개 실패`);
    process.exit(1);
  }
  console.log("\n모든 자체 테스트 통과 (이론/두음/안푼문제 포함)");
}

void runAsyncSelfTests().catch((error) => {
  console.error(error);
  process.exit(1);
});
