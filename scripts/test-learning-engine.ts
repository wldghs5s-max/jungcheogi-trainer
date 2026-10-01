import { ALL_QUESTIONS } from '../src/data/questions';
import { QuestionRepository } from '../src/repositories/questionRepository';
import { AttemptRepository } from '../src/repositories/attemptRepository';
import { checkAnswer, formatAnswerDisplay, normalizeAnswer } from '../src/utils/quiz';
import { useQuizStore } from '../src/store/quizStore';
import {
  AIVerifierService,
  buildVerificationPrompt,
  VERIFICATION_LOGS,
  VerificationResult,
} from '../src/services/aiVerifierService';
import { Question } from '../src/types/question';
import { QuizAttempt } from '../src/types/attempt';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`✅ OK: ${message}`);
}

async function runLearningEngineTests() {
  const allBank = ALL_QUESTIONS;
  console.log('\n======================================================');
  console.log(`🚀 [전수 검증] 문제은행 크기: ${allBank.length}문항 (무결성 보존)`);
  console.log('======================================================');
  assert(allBank.length >= 900, `활성 문항 수가 900문항 이상이어야 함 (실제: ${allBank.length})`);

  // ==========================================================
  // 1. Scenarios A, B, C, D 검증
  // ==========================================================
  console.log('\n--- 1. 출제 시나리오 A, B, C, D 검증 ---');

  // Scenario A: NEW 매우 많음, WEAK 적음, DUE 적음, MASTERED 많음
  // 기대: NEW 최소 3개(60%) 이상, MASTERED 불필요 섞임 없음, 연속 중복 없음
  const fakeAttemptedA = new Set(allBank.slice(300).map((q) => q.id)); // 300 NEW
  const fakeWeakA = allBank.slice(300, 310).map((q) => q.id); // 10 WEAK
  const fakeDueA = allBank.slice(310, 320).map((q) => q.id); // 10 DUE
  const fakeMasteredA = allBank.slice(350, 450).map((q) => q.id); // 100 MASTERED

  const sessionA1 = QuestionRepository.getQuickQuizQuestions(
    5,
    fakeDueA,
    [],
    allBank.slice(0, 300).map((q) => q.id),
    {
      recentQuestionIds: [],
      weakQuestionIds: fakeWeakA,
      masteredQuestionIds: fakeMasteredA,
    },
  );
  assert(sessionA1.length === 5, 'Scenario A: 5문항 반환');
  const newInA1 = sessionA1.filter((q) => !fakeAttemptedA.has(q.id));
  assert(newInA1.length >= 3, `Scenario A: NEW가 최소 3개 이상이어야 함 (실제: ${newInA1.length}개)`);
  const masteredInA1 = sessionA1.filter((q) => fakeMasteredA.includes(q.id));
  assert(masteredInA1.length === 0, `Scenario A: MASTERED 문제가 불필요하게 섞이지 않아야 함 (실제: ${masteredInA1.length}개)`);

  // Scenario B: NEW = 3개, WEAK 많음, DUE 많음
  // 기대: NEW 3개 소진 후 나머지는 WEAK/DUE에서 우선 선택
  const newIdsB = allBank.slice(0, 3).map((q) => q.id);
  const weakIdsB = allBank.slice(3, 50).map((q) => q.id);
  const dueIdsB = allBank.slice(50, 100).map((q) => q.id);
  const sessionB = QuestionRepository.getQuickQuizQuestions(
    5,
    dueIdsB,
    [],
    newIdsB, // 정확히 3개만 NEW
    {
      recentQuestionIds: [],
      weakQuestionIds: weakIdsB,
    },
  );
  assert(sessionB.length === 5, 'Scenario B: 5문항 반환');
  const newInB = sessionB.filter((q) => newIdsB.includes(q.id));
  assert(newInB.length === 3, `Scenario B: NEW 3개가 모두 사용되어야 함 (실제: ${newInB.length}개)`);
  const weakOrDueInB = sessionB.filter((q) => weakIdsB.includes(q.id) || dueIdsB.includes(q.id));
  assert(weakOrDueInB.length === 2, `Scenario B: 나머지 2개는 취약/복습 문제에서 선택되어야 함 (실제: ${weakOrDueInB.length}개)`);

  // Scenario C: NEW = 0, WEAK 많음, DUE 많음
  // 기대: WEAK/DUE가 우선되어 5문항 모두 채움 (GENERAL/MASTERED 배제)
  const sessionC = QuestionRepository.getQuickQuizQuestions(
    5,
    dueIdsB,
    [],
    [], // NEW = 0
    {
      recentQuestionIds: [],
      weakQuestionIds: weakIdsB,
    },
  );
  assert(sessionC.length === 5, 'Scenario C: 5문항 반환');
  const weakOrDueInC = sessionC.filter((q) => weakIdsB.includes(q.id) || dueIdsB.includes(q.id));
  assert(weakOrDueInC.length === 5, `Scenario C: NEW가 0개일 때 WEAK/DUE로 5문항 모두 우선 채워야 함 (실제: ${weakOrDueInC.length}개)`);

  // Scenario D: NEW 많음, WEAK 많음, 최근 10문항 존재
  // 기대: 최근 10문항은 쿨다운에 의해 일반 5문항에 즉시 반복 출현하지 않음
  const recent10 = allBank.slice(100, 110).map((q) => q.id);
  const sessionD = QuestionRepository.getQuickQuizQuestions(
    5,
    dueIdsB,
    [],
    allBank.slice(0, 100).map((q) => q.id),
    {
      recentQuestionIds: recent10,
      weakQuestionIds: weakIdsB,
    },
  );
  assert(sessionD.length === 5, 'Scenario D: 5문항 반환');
  const recentOverlapD = sessionD.filter((q) => recent10.includes(q.id));
  assert(recentOverlapD.length === 0, `Scenario D: 최근 10문항은 쿨다운에 의해 배제되어야 함 (중복 수: ${recentOverlapD.length})`);

  // "다시 풀기" 순서 보존 검증
  const store = useQuizStore.getState();
  const sampleFive = allBank.slice(20, 25);
  store.startQuiz(sampleFive, '다시 풀기', { preserveOrder: true });
  const reloaded = useQuizStore.getState().questions;
  assert(
    sampleFive.every((q, i) => reloaded[i].id === q.id),
    '다시 풀기(preserveOrder: true) 시 Q1~Q5 순서가 100% 동일하게 보존됨',
  );

  // ==========================================================
  // 2. 5,000회 대규모 Selection Simulation 및 통계 산출
  // ==========================================================
  console.log('\n--- 2. 5,000회 대규모 출제 시뮬레이션 및 통계 산출 ---');
  const SIM_ROUNDS = 5000;
  let totalNew = 0;
  let totalWeak = 0;
  let totalDue = 0;
  let totalGeneral = 0;
  let totalMastered = 0;
  let recentOverlapCount = 0;

  // 현실적인 사용자 풀 분포 (NEW 500, WEAK 50, DUE 30, GENERAL 200, MASTERED 120)
  const simNewIds = new Set(allBank.slice(0, 500).map((q) => q.id));
  const simWeakIds = new Set(allBank.slice(500, 550).map((q) => q.id));
  const simDueIds = new Set(allBank.slice(550, 580).map((q) => q.id));
  const simGeneralIds = new Set(allBank.slice(580, 780).map((q) => q.id));
  const simMasteredIds = new Set(allBank.slice(780, 900).map((q) => q.id));

  let rollingRecentQueue: string[] = [];

  for (let r = 0; r < SIM_ROUNDS; r++) {
    const recentWindow = rollingRecentQueue.slice(-10);
    const selected = QuestionRepository.getQuickQuizQuestions(
      5,
      Array.from(simDueIds),
      [],
      Array.from(simNewIds),
      {
        recentQuestionIds: recentWindow,
        weakQuestionIds: Array.from(simWeakIds),
        masteredQuestionIds: Array.from(simMasteredIds),
      },
    );

    assert(selected.length === 5, `라운드 ${r}: 5문항 선택 보장`);

    // 최근 10문항 중복 여부 체크
    for (const q of selected) {
      if (recentWindow.includes(q.id)) {
        recentOverlapCount++;
      }
      if (simNewIds.has(q.id)) totalNew++;
      else if (simWeakIds.has(q.id)) totalWeak++;
      else if (simDueIds.has(q.id)) totalDue++;
      else if (simGeneralIds.has(q.id)) totalGeneral++;
      else if (simMasteredIds.has(q.id)) totalMastered++;
    }

    // rolling queue 업데이트
    rollingRecentQueue.push(...selected.map((q) => q.id));
    if (rollingRecentQueue.length > 50) {
      rollingRecentQueue = rollingRecentQueue.slice(-20);
    }
  }

  const avgNew = (totalNew / SIM_ROUNDS).toFixed(2);
  const avgWeak = (totalWeak / SIM_ROUNDS).toFixed(2);
  const avgDue = (totalDue / SIM_ROUNDS).toFixed(2);
  const avgGeneral = (totalGeneral / SIM_ROUNDS).toFixed(2);
  const avgMastered = (totalMastered / SIM_ROUNDS).toFixed(2);
  const recentOverlapRate = ((recentOverlapCount / (SIM_ROUNDS * 5)) * 100).toFixed(4);

  console.log(`\n📊 [5,000회 시뮬레이션 통계 결과]`);
  console.log(`- NEW 평균: ${avgNew}개 / 5 (${((Number(avgNew) / 5) * 100).toFixed(1)}%)`);
  console.log(`- WEAK 평균: ${avgWeak}개 / 5 (${((Number(avgWeak) / 5) * 100).toFixed(1)}%)`);
  console.log(`- DUE 평균: ${avgDue}개 / 5 (${((Number(avgDue) / 5) * 100).toFixed(1)}%)`);
  console.log(`- GENERAL 평균: ${avgGeneral}개 / 5 (${((Number(avgGeneral) / 5) * 100).toFixed(1)}%)`);
  console.log(`- MASTERED 평균: ${avgMastered}개 / 5 (${((Number(avgMastered) / 5) * 100).toFixed(1)}%)`);
  console.log(`- 최근 10문항 중복률: ${recentOverlapRate}%\n`);

  assert(Number(avgNew) >= 3.0, `NEW 평균이 3.0(60%) 이상이어야 함 (실제: ${avgNew})`);
  assert(Number(recentOverlapRate) === 0, `최근 10문항 쿨다운 중복률이 0%여야 함 (실제: ${recentOverlapRate}%)`);
  assert(Number(avgMastered) === 0, `NEW와 WEAK가 충분할 때 MASTERED는 0이어야 함 (실제: ${avgMastered})`);

  // ==========================================================
  // 3. 채점: 기호 및 코드 정규화 전수 점검
  // ==========================================================
  console.log('\n--- 3. 채점 엔진 기호 및 코드 정규화 전수 점검 ---');
  const requiredSymbols = [
    { user: '->', target: '->', label: '화살표 연산자' },
    { user: '→', target: '->', label: '유니코드 오른쪽 화살표' },
    { user: '⇒', target: '->', label: '유니코드 이중 화살표' },
    { user: '*', target: '*', label: '포인터/곱셈 연산자' },
    { user: '&', target: '&', label: '주소/비트AND 연산자' },
    { user: '++', target: '++', label: '증가 연산자' },
    { user: '--', target: '--', label: '감소 연산자' },
    { user: '==', target: '==', label: '동등 비교 연산자' },
    { user: '!=', target: '!=', label: '부등 비교 연산자' },
    { user: '>=', target: '>=', label: '이상 비교 연산자' },
    { user: '<=', target: '<=', label: '이하 비교 연산자' },
    { user: '.', target: '.', label: '구조체 멤버 접근 연산자' },
    { user: '::', target: '::', label: '범위 지정 연산자' },
  ];

  for (const s of requiredSymbols) {
    assert(checkAnswer(s.user, s.target), `기호 일치 검증: ${s.user} vs ${s.target} (${s.label})`);
    assert(normalizeAnswer(s.user) === normalizeAnswer(s.target), `정규화 문자열 일치: ${s.user} -> ${normalizeAnswer(s.user)}`);
  }

  // 상이한 기호 오채점 방지
  assert(!checkAnswer('*', '&'), '서로 다른 기호 오답 거부: * vs &');
  assert(!checkAnswer('==', '!='), '서로 다른 기호 오답 거부: == vs !=');
  assert(!checkAnswer('>=', '<='), '서로 다른 기호 오답 거부: >= vs <=');
  assert(!checkAnswer('++', '--'), '서로 다른 기호 오답 거부: ++ vs --');

  // 회귀 방지: 2NF vs 3NF
  assert(checkAnswer('2NF', '제2정규형'), '동의어 매핑: 2NF vs 제2정규형');
  assert(!checkAnswer('제2정규형', '제3정규형'), '정규형 오답 거부: 제2정규형 vs 제3정규형');
  assert(!checkAnswer('2NF', '3NF'), '정규형 약어 오답 거부: 2NF vs 3NF');

  // 코드 출력형 엄격 판정 (토큰 경계 & 대소문자)
  const codeTraceQ = {
    type: 'CODE_TRACE' as const,
    subject: '프로그래밍언어활용' as const,
    code: 'printf("%s", str);',
  };
  assert(!checkAnswer('1 23', '12 3', codeTraceQ), '코드 토큰 경계 붕괴 오답 거부: 1 23 vs 12 3');
  assert(!checkAnswer('ABC', 'abc', codeTraceQ), '코드 대소문자 무시 오답 거부: ABC vs abc');
  assert(checkAnswer('abc', 'abc', codeTraceQ), '코드 대소문자 정확 일치: abc vs abc');

  // 실제 문제은행 내 기호 문항 전수 대조
  const realArrowQ = allBank.find((q) => q.id === 'EXP_PR_007');
  assert(!!realArrowQ, '실제 문제 EXP_PR_007 존재');
  assert(checkAnswer('->', realArrowQ!.answer, realArrowQ), '실제 문제 EXP_PR_007 채점: ->');
  assert(checkAnswer('→', realArrowQ!.answer, realArrowQ), '실제 문제 EXP_PR_007 유니코드 채점: →');
  assert(checkAnswer('포인터멤버접근', realArrowQ!.answer, realArrowQ), '실제 문제 EXP_PR_007 동의어 채점');

  const realAddrQ = allBank.find((q) => q.id === 'EXP_PR_004');
  assert(!!realAddrQ, '실제 문제 EXP_PR_004 존재');
  assert(checkAnswer('&', realAddrQ!.answer, realAddrQ), '실제 문제 EXP_PR_004 채점: &');

  const realSliceQ = allBank.find((q) => q.id === 'EXP_PR_034');
  assert(!!realSliceQ, '실제 문제 EXP_PR_034 존재');
  assert(checkAnswer('[::-1]', realSliceQ!.answer, realSliceQ), '실제 문제 EXP_PR_034 채점: [::-1]');

  // ==========================================================
  // 4. AI Tutor 독립 검증기 및 오답 격리 (AttemptRepository 연동)
  // ==========================================================
  console.log('\n--- 4. AI Tutor 독립 검증 및 오답 격리 (SUSPECT) 점검 ---');

  // 프롬프트 핵심 지침 검증
  const testQ: Question = {
    id: 'EXP_SUSPECT_01',
    subject: '소프트웨어설계',
    category: '요구사항확인',
    type: 'SHORT_ANSWER',
    question: '럼바우 분석 기법에서 상태 다이어그램을 활용하여 시간의 흐름에 따른 객체들의 동적 행위를 표현하는 모델링은?',
    answer: '동적 모델링',
    explanation: '럼바우 분석 기법은 객체 모델링, 동적 모델링, 기능 모델링으로 구성됩니다.',
    difficulty: 'EASY',
    keywords: ['럼바우', '동적모델링'],
  };

  const verifyPrompt = buildVerificationPrompt(testQ, '기능 모델링');
  assert(verifyPrompt.includes('무조건 진실로 신뢰하지 마세요'), '프롬프트: 저장 정답 맹신 금지 지침 포함');
  assert(verifyPrompt.includes('독립적 정답'), '프롬프트: 독립 정답 선도출 지침 포함');

  // Case 1: USER_WRONG (정상 오답) -> 원래 해설 유지, suspect 아님
  const resWrong = await AIVerifierService.verifyGrading(testQ, '기능 모델링', {
    mockResult: {
      verdict: 'USER_WRONG',
      independentAnswer: '동적 모델링',
      reason: '기능 모델링은 DFD를 사용하며, 상태 다이어그램을 사용하는 것은 동적 모델링입니다.',
    },
  });
  assert(resWrong.verdict === 'USER_WRONG', 'Case 1: USER_WRONG 판정');
  assert(resWrong.safeExplanation === testQ.explanation, 'Case 1: 정상 오답 시 원래 해설 유지');
  assert(resWrong.isSuspect === false, 'Case 1: isSuspect = false');

  // Case 2: QUESTION_SUSPECT (문제 오류 의심 격리)
  // 모의 풀이 이력 생성
  const dummyAttempt: QuizAttempt = {
    id: 'att-suspect-01',
    questionId: testQ.id,
    selectedAnswer: '동적 모델링',
    correctAnswer: '잘못저장된답',
    isCorrect: false,
    answeredAt: new Date().toISOString(),
  };
  await AttemptRepository.saveAttempt(dummyAttempt);

  const resSuspect = await AIVerifierService.verifyGrading(testQ, '동적 모델링', {
    mockResult: {
      verdict: 'QUESTION_SUSPECT',
      independentAnswer: '동적 모델링',
      reason: '지문과 정답 간에 모순이 있으며 저장된 정답이 잘못되었습니다.',
    },
  });
  assert(resSuspect.verdict === 'QUESTION_SUSPECT', 'Case 2: QUESTION_SUSPECT 판정');
  assert(resSuspect.isSuspect === true, 'Case 2: isSuspect = true');
  assert(resSuspect.safeExplanation.includes('[채점 재검토 안내]'), 'Case 2: 안전 재검토 안내문 전환');

  // AttemptRepository에서 SUSPECT 격리 확인
  const wrongSummaries = await AttemptRepository.getWrongQuestionSummaries();
  const suspectInWrong = wrongSummaries.find((s) => s.questionId === testQ.id);
  assert(!suspectInWrong, 'Case 2: SUSPECT로 격리된 문제는 getWrongQuestionSummaries 오답 집계에서 100% 배제됨');

  // Case 3: USER_CORRECT (로컬 채점 오류 -> 사용자 정답 인정)
  const resUserCorrect = await AIVerifierService.verifyGrading(testQ, '동적모델링', {
    mockResult: {
      verdict: 'USER_CORRECT',
      independentAnswer: '동적 모델링',
      reason: '띄어쓰기 차이일 뿐 정확한 정답입니다.',
    },
  });
  assert(resUserCorrect.verdict === 'USER_CORRECT', 'Case 3: USER_CORRECT 판정');
  assert(resUserCorrect.safeExplanation.includes('[정답 인정 재검토 안내]'), 'Case 3: 정답 인정 재검토 안내문 전환');

  // Case 4: VERIFICATION_UNCERTAIN (판단 불확실)
  const resUncertain = await AIVerifierService.verifyGrading(testQ, '모호한답', {
    mockResult: {
      verdict: 'VERIFICATION_UNCERTAIN',
      reason: '단서 부족으로 판단을 확정할 수 없습니다.',
    },
  });
  assert(resUncertain.verdict === 'VERIFICATION_UNCERTAIN', 'Case 4: VERIFICATION_UNCERTAIN 판정');

  // Case 5: API Error / Failure (네트워크 장애 fallback)
  // GeminiService.generateText가 실패했을 때 Uncertain 결과 및 안전 안내 제공
  const resApiFail = await AIVerifierService.verifyGrading(testQ, '틀린답', {
    fetchFn: (async () => {
      throw new Error('503 Service Unavailable');
    }) as any,
  });
  assert(resApiFail.verdict === 'VERIFICATION_UNCERTAIN', 'Case 5: API 실패 시 VERIFICATION_UNCERTAIN 반환');
  assert(
    resApiFail.safeExplanation.includes('AI 정밀 재검증을 완료하지 못했습니다') ||
      resApiFail.safeExplanation.includes('실시간 재검토가 일시 지연'),
    'Case 5: AI가 검증했다고 왜곡하지 않고 미완료 상태 안내',
  );

  // ==========================================================
  // 5. 실제 문제 2건 End-to-End 전체 흐름 검증
  // ==========================================================
  console.log('\n--- 5. 실제 문제 2건 End-to-End 전체 흐름 검증 ---');

  // [E2E - Case 1: 정상 문제] EXP_PR_007 (C언어 포인터 멤버 접근 연산자)
  console.log('실제 문제 1: EXP_PR_007');
  const realQ1 = allBank.find((q) => q.id === 'EXP_PR_007')!;
  // 1) 사용자 답 제출: '->'
  const isCorrectE2E1 = checkAnswer('->', realQ1.answer, realQ1);
  assert(isCorrectE2E1 === true, 'E2E-1: 로컬 채점 통과');
  // 2) AI 검증 호출
  const verifyE2E1 = await AIVerifierService.verifyGrading(realQ1, '->');
  assert(verifyE2E1.verdict === 'USER_CORRECT', 'E2E-1: AI 검증 USER_CORRECT (로컬 통과 연동)');
  assert(verifyE2E1.safeExplanation === realQ1.explanation, 'E2E-1: 정상 문제이므로 기존 공식 해설 유지');

  // [E2E - Case 2: 오답 입력 후 AI 독립 검증 및 오답 해설]
  console.log('실제 문제 2: EXP_PR_004 (C언어 주소 연산자)');
  const realQ2 = allBank.find((q) => q.id === 'EXP_PR_004')!;
  // 1) 사용자 오답 제출: '*'
  const isCorrectE2E2 = checkAnswer('*', realQ2.answer, realQ2);
  assert(isCorrectE2E2 === false, 'E2E-2: 로컬 채점 오답 판정');
  // 2) AI 독립 검증 호출 (오답 분석)
  const verifyE2E2 = await AIVerifierService.verifyGrading(realQ2, '*', {
    mockResult: {
      verdict: 'USER_WRONG',
      independentAnswer: '&',
      reason: '* 기호는 포인터 역참조 연산자이며 주소 연산자는 & 입니다.',
    },
  });
  assert(verifyE2E2.verdict === 'USER_WRONG', 'E2E-2: AI 독립 검증 USER_WRONG');
  assert(verifyE2E2.safeExplanation === realQ2.explanation, 'E2E-2: 정상 오답 해설 출력');

  console.log('\n======================================================');
  console.log('🎉 [전수 검증 성공] 5,000회 시뮬레이션 및 모든 안전 검증 100% 통과!');
  console.log('======================================================\n');
}

runLearningEngineTests().catch((err) => {
  console.error('검증 테스트 실패:', err);
  process.exit(1);
});
