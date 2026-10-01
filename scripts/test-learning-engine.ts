import { ALL_QUESTIONS } from '../src/data/questions';
import { QuestionRepository } from '../src/repositories/questionRepository';
import { checkAnswer, formatAnswerDisplay } from '../src/utils/quiz';
import { useQuizStore } from '../src/store/quizStore';
import {
  AIVerifierService,
  buildVerificationPrompt,
  VERIFICATION_LOGS,
  VerificationResult,
} from '../src/services/aiVerifierService';
import { Question } from '../src/types/question';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`✅ OK: ${message}`);
}

async function runLearningEngineTests() {
  console.log('\n========================================');
  console.log('🧪 1. 5문항 출제 우선순위 및 쿨다운 시뮬레이션');
  console.log('========================================');

  const allBank = ALL_QUESTIONS;
  console.log(`총 활성 문항 수: ${allBank.length}문항`);
  assert(allBank.length >= 900, `활성 문항 수가 900문항 이상이어야 함 (실제: ${allBank.length})`);

  // 시나리오 A: NEW가 많은 상태 (사용자가 아무것도 안 푼 상태)
  const session1 = QuestionRepository.getQuickQuizQuestions(
    5,
    [],
    [],
    allBank.map((q) => q.id), // 모두 unsolved
    {
      recentQuestionIds: [],
      weakQuestionIds: [],
    },
  );

  assert(session1.length === 5, '5문항이 정확히 반환되어야 함');
  const session1Ids = session1.map((q) => q.id);
  const uniqueCount1 = new Set(session1Ids).size;
  assert(uniqueCount1 === 5, '세션 1의 5문항은 모두 중복 없는 고유 ID여야 함');

  // 시나리오 B: 쿨다운 검증 (직전 세션 출제 문항 배제)
  const session2 = QuestionRepository.getQuickQuizQuestions(
    5,
    [],
    [],
    allBank.filter((q) => !session1Ids.includes(q.id)).map((q) => q.id),
    {
      recentQuestionIds: session1Ids,
      weakQuestionIds: [],
    },
  );

  assert(session2.length === 5, '세션 2도 5문항이 정확히 반환되어야 함');
  const session2Ids = session2.map((q) => q.id);
  const overlap = session2Ids.filter((id) => session1Ids.includes(id));
  assert(
    overlap.length === 0,
    `직전 세션 문제(${session1Ids.join(', ')})는 쿨다운에 의해 세션 2에 출제되지 않아야 함 (중복 출제: ${overlap.join(', ')})`,
  );

  // 시나리오 C: NEW가 0개이고 취약 문제(WEAK)가 있을 때 우선 배정
  const fakeWeakIds = allBank.slice(0, 10).map((q) => q.id);
  const session3 = QuestionRepository.getQuickQuizQuestions(
    5,
    [],
    [],
    [], // unsolved = 0
    {
      recentQuestionIds: [],
      weakQuestionIds: fakeWeakIds,
    },
  );
  assert(session3.length === 5, 'NEW가 없어도 5문항이 채워져야 함');
  const weakIncluded = session3.filter((q) => fakeWeakIds.includes(q.id));
  assert(weakIncluded.length >= 1, `WEAK 문제가 우선 배정되어야 함 (배정 수: ${weakIncluded.length})`);

  // 시나리오 D: "다시 풀기(preserveOrder: true)" 순서 보존 검증
  const store = useQuizStore.getState();
  const sampleQuestions = allBank.slice(0, 5);
  store.startQuiz(sampleQuestions, '다시 풀기', { preserveOrder: true });
  const storeQuestions = useQuizStore.getState().questions;

  assert(
    storeQuestions.length === 5,
    '스토어에 5문항이 로드되어야 함',
  );
  const isOrderPreserved = sampleQuestions.every((q, idx) => storeQuestions[idx].id === q.id);
  assert(isOrderPreserved, '"다시 풀기" 시 Q1~Q5의 순서가 100% 동일하게 보존되어야 함');

  console.log('\n========================================');
  console.log('🧪 2. 채점 엔진 기호 보존 및 회귀 방지 검증');
  console.log('========================================');

  // 화살표 연산자 (->, →)
  assert(checkAnswer('->', '->'), '기호 일치: -> vs ->');
  assert(checkAnswer('->', '->', null), '기호 일치: null question');
  assert(checkAnswer('->', '->', { type: 'SHORT_ANSWER', subject: '프로그래밍언어활용' }), '기호 일치: 단답형 프로그래밍');
  assert(checkAnswer('→', '->'), '유니코드 화살표: → vs ->');
  assert(checkAnswer('->', '→'), '역방향 유니코드 화살표: -> vs →');
  assert(checkAnswer('->', '화살표연산자'), '동의어 매핑: -> vs 화살표연산자');
  assert(checkAnswer('->', '포인터멤버접근'), '동의어 매핑: -> vs 포인터멤버접근');
  assert(checkAnswer('->', '포인터멤버접근연산자'), '동의어 매핑: -> vs 포인터멤버접근연산자');

  // C/SQL 연산자 및 기호
  assert(checkAnswer('&', '&'), '기호 일치: & vs &');
  assert(checkAnswer('&', '주소연산자'), '동의어 매핑: & vs 주소연산자');
  assert(checkAnswer('*', '*'), '기호 일치: * vs *');
  assert(checkAnswer('*', '포인터연산자'), '동의어 매핑: * vs 포인터연산자');

  // 정규형 회귀 방지 (제2정규형 vs 제3정규형)
  assert(checkAnswer('2NF', '제2정규형'), '정규형 동의어: 2NF vs 제2정규형');
  assert(checkAnswer('제2정규형', '2NF'), '정규형 동의어: 제2정규형 vs 2NF');
  assert(!checkAnswer('제2정규형', '제3정규형'), '다른 정규형 오답 거부: 제2정규형 vs 제3정규형');
  assert(!checkAnswer('3NF', '제2정규형'), '다른 정규형 오답 거부: 3NF vs 제2정규형');

  // 코드 출력형 토큰 경계 및 대소문자 보호
  const codeQ = {
    type: 'CODE_TRACE' as const,
    subject: '프로그래밍언어활용' as const,
    code: 'printf("%s", s);',
  };
  assert(!checkAnswer('1 23', '12 3', codeQ), '코드 토큰 경계 붕괴 오답 방지: 1 23 vs 12 3');
  assert(!checkAnswer('ABC', 'abc', codeQ), '코드 대소문자 무시 오답 방지: ABC vs abc');
  assert(checkAnswer('abc', 'abc', codeQ), '코드 대소문자 정확 일치: abc vs abc');
  assert(checkAnswer('->', '->', codeQ), '코드 출력형 내 기호 일치: -> vs ->');

  console.log('\n========================================');
  console.log('🧪 3. AI 독립 검증기 (AIVerifierService) 단위 검증');
  console.log('========================================');

  const testQuestion: Question = {
    id: 'test-q-101',
    subject: '소프트웨어개발' as any,
    category: '데이터입출력구현',
    type: 'SHORT_ANSWER',
    question: 'C언어에서 구조체 포인터 변수의 멤버에 접근할 때 사용하는 연산자 기호를 쓰시오.',
    answer: '->',
    explanation: '구조체 포인터 멤버에 접근할 때는 화살표 연산자(->)를 사용합니다.',
    difficulty: 'EASY',
    keywords: ['구조체', '포인터', '화살표연산자'],
  };

  // 1) buildVerificationPrompt 프롬프트 품질 검증
  const prompt = buildVerificationPrompt(testQuestion, '->');
  assert(prompt.includes('독립 정답'), '검증 프롬프트는 AI에게 독립 정답 도출을 요구해야 함');
  assert(prompt.includes('무조건 진실로 신뢰하지 마세요'), '검증 프롬프트는 기존 정답 맹신 금지 지침을 포함해야 함');

  // 2) Case 1: 로컬 채점기 일치 시 즉시 USER_CORRECT (API 호출 생략)
  const quickCorrect = await AIVerifierService.verifyGrading(testQuestion, '->');
  assert(quickCorrect.verdict === 'USER_CORRECT', '로컬 채점 일치 시 즉시 USER_CORRECT');
  assert(quickCorrect.isSuspect === false, '정상 일치 시 suspect 아님');

  // 3) Case 2: USER_WRONG (정상적인 사용자 오답)
  const wrongRes = await AIVerifierService.verifyGrading(testQuestion, '.', {
    mockResult: {
      verdict: 'USER_WRONG',
      independentAnswer: '->',
      reason: '마침표(.)는 일반 구조체 변수의 멤버 접근 연산자이며, 포인터 멤버 접근은 -> 입니다.',
    },
  });
  assert(wrongRes.verdict === 'USER_WRONG', '오답 판정 정상 작동');
  assert(wrongRes.safeExplanation === testQuestion.explanation, '정상 오답 시 원래 해설 유지');
  assert(wrongRes.isSuspect === false, '정상 오답 시 suspect 아님');

  // 4) Case 3: QUESTION_SUSPECT (문제/정답 오류 의심 감지 및 안전 격리)
  const suspectRes = await AIVerifierService.verifyGrading(testQuestion, '->', {
    mockResult: {
      verdict: 'QUESTION_SUSPECT',
      independentAnswer: '->',
      reason: '저장된 정답과 지문 코드 간의 불일치가 감지되었습니다.',
    },
  });
  assert(suspectRes.verdict === 'QUESTION_SUSPECT', '오류 의심 판정 정상 감지');
  assert(suspectRes.isSuspect === true, '의심 플래그 활성화');
  assert(suspectRes.safeExplanation.includes('[채점 재검토 안내]'), '오류 의심 시 안전 재검토 안내문으로 전환');
  assert(
    !suspectRes.safeExplanation.includes('잘못된 지식 습득 방지') ||
      suspectRes.safeExplanation.includes('기존 해설 표시가 일시 제한'),
    '왜곡된 기존 해설 노출 차단',
  );

  // 5) Case 4: USER_CORRECT (사용자의 타당한 동의어/표현 인정)
  const userCorrectRes = await AIVerifierService.verifyGrading(testQuestion, '화살표 연산자', {
    mockResult: {
      verdict: 'USER_CORRECT',
      independentAnswer: '-> (화살표 연산자)',
      reason: '수험생이 작성한 한글 명칭도 타당한 정답으로 인정될 수 있습니다.',
    },
  });
  assert(userCorrectRes.verdict === 'USER_CORRECT', '사용자 정답 인정 판정');
  assert(userCorrectRes.safeExplanation.includes('[정답 인정 재검토 안내]'), '정답 인정 재검토 안내 노출');

  // 6) Case 5: AMBIGUOUS (복수 정답 가능성)
  const ambiguousRes = await AIVerifierService.verifyGrading(testQuestion, '대안답', {
    mockResult: {
      verdict: 'AMBIGUOUS',
      independentAnswer: '대안답',
      reason: '지문 해석에 따라 복수 정답 성립 가능',
    },
  });
  assert(ambiguousRes.verdict === 'AMBIGUOUS', '복수 정답 판정');
  assert(ambiguousRes.safeExplanation.includes('[복수 정답 가능성 안내]'), '복수 정답 안내 노출');

  // 7) VERIFICATION_LOGS 보관 확인
  assert(VERIFICATION_LOGS.length >= 2, '이상 감지 건(QUESTION_SUSPECT, USER_CORRECT, AMBIGUOUS)이 로그에 보관되어야 함');

  console.log('\n========================================');
  console.log('🎉 모든 학습 엔진 및 채점 안전성 시뮬레이션 통과!');
  console.log('========================================\n');
}

runLearningEngineTests().catch((err) => {
  console.error('테스트 실행 중 치명적 에러:', err);
  process.exit(1);
});
