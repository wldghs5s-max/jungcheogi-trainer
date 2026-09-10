import { ALL_QUESTIONS, SUBJECTS } from "../src/data/questions";
import { MEMORIZATION_BANK } from "../src/data/questions/memorizationBank";
import { generateProgrammingPracticeBundle } from "../src/api/programmingGenerator";
import { checkAnswer, shuffleArray } from "../src/utils/quiz";
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
assert(!checkAnswer("틀린답", "정답"), "채점: 오답 거부");

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

if (failed > 0) {
  console.error(`\n${failed}개 실패`);
  process.exit(1);
}
console.log("\n자체 테스트 통과");
