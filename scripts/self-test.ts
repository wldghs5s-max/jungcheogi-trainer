import { ALL_QUESTIONS, SUBJECTS } from "../src/data/questions";
import { MEMORIZATION_BANK } from "../src/data/questions/memorizationBank";
import { generateProgrammingPracticeBundle } from "../src/api/programmingGenerator";
import { checkAnswer, shuffleArray } from "../src/utils/quiz";
import { getDueReviewQuestionIds } from "../src/utils/reviewQueue";
import { getQuestionOriginLabel } from "../src/utils/questionOrigin";
import { measureKeyboardOverlap } from "../src/utils/keyboardOverlap";
import { Question } from "../src/types/question";
import {
  isConfusedAttempt,
  isUnknownAttempt,
  QuizAttempt,
} from "../src/types/attempt";
import { LocalStorage, MemoryStorageAdapter } from "../src/storage/localStorage";
import { AttemptRepository } from "../src/repositories/attemptRepository";
import { useQuizStore } from "../src/store/quizStore";

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
  assert(answers.length > 0 && answers.every((a) => String(a).trim()), `${label} answer`);
  assert(!!q.subject && !!q.category && !!q.type, `${label} meta`);
}

const ids = ALL_QUESTIONS.map((q) => q.id);
assert(new Set(ids).size === ids.length, `정적 문제 ID 중복 없음 (${ids.length})`);
assert(ALL_QUESTIONS.length >= 80, `정적 문제 80개 이상 (실제 ${ALL_QUESTIONS.length})`);
assert(MEMORIZATION_BANK.length === 56, `암기 은행 56개 (실제 ${MEMORIZATION_BANK.length})`);
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
assert(checkAnswer("싱글톤패턴", ["싱글톤", "싱글톤 패턴", "Singleton"]), "채점: 동의어");
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
assert(!checkAnswer("1 23", "12 3", codeOutput), "코드 채점: 토큰 경계 붕괴 오답");
assert(!checkAnswer("ABC", "abc", codeOutput), "코드 채점: 대소문자 무시 오답");
assert(!checkAnswer("싱글톤", "싱글톤패턴", codeOutput), "코드 채점: 용어 유사 판정 없음");
assert(checkAnswer("-5", "-5", codeOutput), "코드 채점: 부호 정답");
assert(checkAnswer("1.5", "1.5", codeOutput), "코드 채점: 소수 정답");
assert(checkAnswer("12 3", "12 3", codeOutput), "코드 채점: 토큰 정답");
assert(checkAnswer("abc", "abc", codeOutput), "코드 채점: 소문자 정답");
assert(checkAnswer("  -5\n", "-5", codeOutput), "코드 채점: 앞뒤 공백·줄바꿈 허용");
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
const fourDaysAgo = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString();
assert(
  getDueReviewQuestionIds([{ ...unknownAttempt, answeredAt: today }]).includes("q1"),
  "복습: 모름은 당일 큐에 포함",
);
assert(
  getDueReviewQuestionIds([{ ...confusedAttempt, answeredAt: yesterday }]).includes("q1"),
  "복습: 헷갈림은 하루 뒤 포함",
);
assert(
  getDueReviewQuestionIds([
    { ...confusedAttempt, isCorrect: true, missType: undefined, answeredAt: fourDaysAgo },
  ]).includes("q1"),
  "복습: 정답은 3일 뒤 포함",
);
assert(
  !getDueReviewQuestionIds([{ ...confusedAttempt, answeredAt: today }]).includes("q1"),
  "복습: 헷갈림은 당일 제외",
);
assert(
  !getDueReviewQuestionIds([
    { ...confusedAttempt, isCorrect: true, missType: undefined, answeredAt: yesterday },
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
assert(THEORY_DATA.length >= 10, `이론 데이터 10개 이상 (실제 ${THEORY_DATA.length})`);
for (const th of THEORY_DATA) {
  assert(!!th.id && !!th.title && !!th.category, `이론 메타: ${th.id}`);
  assert(!!th.analogy && th.analogy.length >= 10, `이론 비유 작성됨: ${th.title}`);
  assert(th.coreConcepts.length >= 2, `이론 핵심개념 2개 이상: ${th.title}`);
  assert(th.examPoints.length >= 1, `이론 출제포인트 1개 이상: ${th.title}`);
}
const theorySubjects = new Set(THEORY_DATA.map((t) => t.subject));
assert(theorySubjects.size === 5, "5개 전 과목 이론 요약 포함");

// 2. 고빈출 기출 두음 암기장 검증
assert(MNEMONIC_DATA.length >= 15, `고빈출 두음 데이터 15개 이상 (실제 ${MNEMONIC_DATA.length})`);
for (const mn of MNEMONIC_DATA) {
  assert(!!mn.id && !!mn.title && !!mn.acronym, `두음 메타: ${mn.id}`);
  assert(!!mn.catchphrase && mn.catchphrase.length >= 5, `두음 리듬 암기문구: ${mn.title}`);
  assert(mn.items.length >= 2, `두음 세부 항목 2개 이상: ${mn.title}`);
  assert(!!mn.trapPoint, `두음 시험 함정 주의: ${mn.title}`);
}

// 3. 안 푼 문제 필터링 검증
const allQuestions = QuestionRepository.getAll();
const mockAttempted = new Set([allQuestions[0].id, allQuestions[1].id, allQuestions[2].id]);
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
  designUnsolved.every((q) => q.subject === "소프트웨어설계" && !mockAttempted.has(q.id)),
  "과목별 안 푼 문제 필터링 정확도",
);

// 4. 이론 연계 문제 검색 및 부족분 보충 검증
// (1) limit 이상 매칭 케이스
const theoryRelated = QuestionRepository.getTheoryRelatedQuestions(
  "소프트웨어설계",
  ["GoF", "디자인패턴", "생성"],
  5,
);
assert(theoryRelated.length === 5, `이론 문제 검색 limit(5개) 도달 (실제: ${theoryRelated.length}개)`);
assert(
  theoryRelated.every((q) => q.subject === "소프트웨어설계"),
  "이론 매칭 문제는 해당 과목에 속함",
);
const theoryIds = new Set(theoryRelated.map((q) => q.id));
assert(theoryIds.size === theoryRelated.length, "이론 매칭 결과에 중복 ID 없음");

// (2) 0개 매칭 시 일반 문제로 보충 케이스
const zeroMatched = QuestionRepository.getTheoryRelatedQuestions(
  "데이터베이스구축",
  ["non_existent_keyword_db_xyz_9999"],
  5,
);
assert(zeroMatched.length === 5, `0개 매칭 시 동일 과목 문제로 5개 보충 (실제: ${zeroMatched.length}개)`);
assert(zeroMatched.every((q) => q.subject === "데이터베이스구축"), "보충 문제 과목 일치");
assert(new Set(zeroMatched.map((q) => q.id)).size === 5, "0개 매칭 보충 결과 중복 ID 없음");

// (3) 소수(1개) 매칭 시 부족분 비매칭 문제로 보충 케이스
// 1개만 매칭될 가능성이 높은 고유 키워드 검색
const fewMatched = QuestionRepository.getTheoryRelatedQuestions(
  "데이터베이스구축",
  ["이상 현상", "삽입 이상"],
  5,
);
assert(fewMatched.length === 5, `소수 매칭 시 5개까지 정확히 보충 (실제: ${fewMatched.length}개)`);
assert(fewMatched.every((q) => q.subject === "데이터베이스구축"), "소수 매칭 보충 문제 과목 일치");
assert(new Set(fewMatched.map((q) => q.id)).size === 5, "소수 매칭 보충 결과 중복 ID 없음");

assert(MEMO_TOPIC_SEEDS.length >= 100, `암기 챕터 시드 100개 이상 (실제 ${MEMO_TOPIC_SEEDS.length})`);
assert(
  new Set(MEMO_TOPIC_SEEDS.map((item) => item.id)).size === MEMO_TOPIC_SEEDS.length,
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
assert(isNearDuplicateMemo(memoSameAnswer, memoOrig), "같은 정답 바꿔 말하기는 근사 중복");
assert(!isNearDuplicateMemo(memoOther, memoOrig), "다른 정답은 중복이 아님");
assert(
  filterNewMemoQuestions([memoSameAnswer, memoOther], [memoOrig]).map((item) => item.id).join() ===
    "MEMO_PKI",
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
  code: "printf(\"%d\", -5);",
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
  assert(failedSave.ok === false && failedSave.reason === "save_failed", "저장 실패를 안내");
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

