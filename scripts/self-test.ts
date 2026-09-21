import { ALL_QUESTIONS, SUBJECTS } from "../src/data/questions";
import { MEMORIZATION_BANK } from "../src/data/questions/memorizationBank";
import { generateProgrammingPracticeBundle } from "../src/api/programmingGenerator";
import { checkAnswer, shuffleArray } from "../src/utils/quiz";
import { getDueReviewQuestionIds } from "../src/utils/reviewQueue";
import { measureKeyboardOverlap } from "../src/utils/keyboardOverlap";
import { Question } from "../src/types/question";
import {
  isConfusedAttempt,
  isUnknownAttempt,
  QuizAttempt,
} from "../src/types/attempt";

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
assert(!checkAnswer("틀린답", "정답"), "채점: 오답 거부");
assert(!checkAnswer("3", "2"), "채점: 짧은 답은 유사 허용 안 함");

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


if (failed > 0) {
  console.error(`\n${failed}개 실패`);
  process.exit(1);
}
console.log("\n모든 자체 테스트 통과 (이론/두음/안푼문제 포함)");

