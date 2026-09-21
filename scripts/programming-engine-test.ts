import { GeneratorRegistry } from '../src/services/programming/registry';
import { registerDefaultGenerators } from '../src/services/programming/generators';
import { StructuralFingerprintService } from '../src/services/programming/fingerprint';
import { ProgrammingEngine } from '../src/services/programming/programmingEngine';
import { QuestionValidator } from '../src/services/programming/validation';
import { ProgrammingDiagnostics } from '../src/services/programming/diagnostics';
import { ALL_QUESTIONS } from '../src/data/questions';
import { GeminiProgrammingGenerator } from '../src/services/programming/geminiProgrammingGenerator';
import { TOPIC_METADATA, QUESTION_TYPE_METADATA } from '../src/services/programming/taxonomy';
import { ProgrammingHistoryTracker } from '../src/services/programming/historyTracker';
import { QuestionRepository, pickDuplicateCachedIds } from '../src/repositories/questionRepository';
import { LocalStorage, MemoryStorageAdapter } from '../src/storage/localStorage';
import { Question } from '../src/types/question';

let failedCount = 0;

function assert(cond: boolean, desc: string) {
  if (!cond) {
    failedCount++;
    console.error(`[FAIL] ${desc}`);
  } else {
    console.log(`[OK]   ${desc}`);
  }
}

async function runTests() {
  console.log('====================================================');
  console.log('  정보처리기사 프로그래밍 문제 생성 엔진 안정화 회귀 검증');
  console.log('====================================================\n');

  // 테스트 시작 전 인메모리 저장 어댑터 명시적 주입
  LocalStorage.setAdapter(new MemoryStorageAdapter());

  // 1. 레지스트리 및 10종 독립 생성기 등록 검증
  ProgrammingEngine.init();
  const generators = GeneratorRegistry.getAll();
  assert(generators.length === 10, `독립 생성기 10종 등록 확인 (실제: ${generators.length}종)`);

  // 2. 각 생성기가 유효한 문제 구조를 생성하는지 검증
  console.log('\n--- 1. 각 독립 생성기 유효성 검증 ---');
  for (const gen of generators) {
    const q = gen.generate({ seed: 42 });
    assert(!!q.id, `${gen.id}: ID 존재`);
    assert(!!q.question.trim(), `${gen.id}: 문제 지문 유효`);
    assert(!!q.code.trim(), `${gen.id}: 소스 코드 유효`);
    assert(!!q.answer, `${gen.id}: 정답 유효`);
    assert(!!q.explanation.trim(), `${gen.id}: 해설 유효`);
    assert(!!q.structuralFingerprint, `${gen.id}: 구조 지문 유효`);
    assert(q.validationStatus === 'validated', `${gen.id}: 자동 검증 통과 (상태: ${q.validationStatus})`);
  }

  // 3. LoopOutputGenerator 회귀 검증: 무한 루프 방지 및 ALTERNATE 부호 동기화
  console.log('\n--- 2. LoopOutputGenerator 회귀 검증 (무한 루프 방지 & 부호 일치) ---');
  const loopGen = GeneratorRegistry.get('LoopOutputGenerator')!;
  
  // WHILE / DO_WHILE 루프에서 CONTINUE가 발생할 때 증감문 건너뜀으로 인한 무한 루프가 없음을 검증
  for (let seed = 1; seed <= 30; seed++) {
    const qC = loopGen.generate({ seed, targetLanguage: 'C' });
    if (qC.code.includes('while') && qC.code.includes('continue')) {
      // while 또는 do-while 루프 본문에서 continue 실행 전 i 증가문이 포함되어 있어야 함
      assert(
        qC.code.includes('continue') && (qC.code.includes('i++; continue;') || qC.code.includes('i +=') && qC.code.includes('continue')),
        `Seed ${seed} C While+Continue 루프 변수 증감 보장`,
      );
    }

    const qJava = loopGen.generate({ seed, targetLanguage: 'JAVA' });
    if (qJava.code.includes('while') && qJava.code.includes('continue')) {
      assert(
        qJava.code.includes('i++; continue;') || (qJava.code.includes('i +=') && qJava.code.includes('continue;')),
        `Seed ${seed} Java While+Continue 루프 변수 증감 보장`,
      );
    }

    // ALTERNATE 모드인 경우 렌더링 코드에 sign 변수가 명시되어 시뮬레이션과 부호 전환 일치
    if (qC.structuralComponents.primaryOperation === 'ALTERNATE_SIGN') {
      assert(qC.code.includes('sign'), `Seed ${seed} C ALTERNATE 코드에 sign 변수 일치`);
    }
  }

  // 4. 언어 메타데이터와 실제 코드 템플릿 일치 검증
  console.log('\n--- 3. 언어와 코드 템플릿 문법 일치 검증 ---');
  const blankGen = GeneratorRegistry.get('BlankCompletionGenerator')!;
  const bugGen = GeneratorRegistry.get('BugFindingGenerator')!;

  for (let seed = 1; seed <= 20; seed++) {
    const pyBlank = blankGen.generate({ seed, targetLanguage: 'PYTHON' });
    assert(pyBlank.language === 'PYTHON', `Blank Gen Python 언어 일치 (seed ${seed})`);
    assert(!pyBlank.code.includes('#include <stdio.h>'), `Python 문제에 C 코드 미포함 (seed ${seed})`);
    assert(!pyBlank.code.includes('public class Main'), `Python 문제에 Java 코드 미포함 (seed ${seed})`);
    assert(pyBlank.code.includes('[  빈칸  ]'), `Python 빈칸 완성에 [  빈칸  ] 존재 (seed ${seed})`);

    const pyBug = bugGen.generate({ seed, targetLanguage: 'PYTHON' });
    assert(pyBug.language === 'PYTHON', `Bug Gen Python 언어 일치 (seed ${seed})`);
    assert(!pyBug.code.includes('#include <stdio.h>'), `Python 버그 문제에 C 코드 미포함 (seed ${seed})`);
    assert(!pyBug.code.includes('public class Main'), `Python 버그 문제에 Java 코드 미포함 (seed ${seed})`);

    const cBug = bugGen.generate({ seed, targetLanguage: 'C' });
    if (cBug.code.includes('i <= 5')) {
      assert(
        cBug.explanation.includes('Undefined Behavior') || cBug.explanation.includes('정의되지 않은 동작') || cBug.explanation.includes('경계 검사'),
        `C 배열 범위 초과에 Undefined Behavior 올바른 설명 포함 (seed ${seed})`,
      );
    }
  }

  // 5. 문제 유형 계약 검증: BLANK_COMPLETION은 반드시 실제 빈칸 존재
  console.log('\n--- 4. BLANK_COMPLETION 문제 유형 빈칸 무결성 검증 ---');
  const ptrGen = GeneratorRegistry.get('PointerResultGenerator')!;
  for (let seed = 1; seed <= 30; seed++) {
    const ptrBlank = ptrGen.generate({ seed, targetType: 'BLANK_COMPLETION' });
    assert(ptrBlank.programmingType === 'BLANK_COMPLETION', `Pointer Gen 타입 일치 (seed ${seed})`);
    assert(
      ptrBlank.code.includes('[ 빈칸 ]') || ptrBlank.code.includes('[  빈칸  ]'),
      `Pointer BLANK_COMPLETION 코드에 실제 빈칸 기호 존재 (seed ${seed})`,
    );
  }

  // 6. 명시적 요청 조건(targetType, targetTopic) 존중 검증
  console.log('\n--- 5. 생성기 요청 조건(targetType, targetTopic) 일치 검증 ---');
  const arrGen = GeneratorRegistry.get('ArrayTraceGenerator')!;
  const arrRet = arrGen.generate({ seed: 10, targetType: 'RETURN_VALUE' });
  assert(arrRet.programmingType === 'RETURN_VALUE', 'ArrayTraceGenerator: targetType RETURN_VALUE 존중');

  const funcGen = GeneratorRegistry.get('FunctionReturnGenerator')!;
  const funcRet = funcGen.generate({ seed: 10, targetType: 'RETURN_VALUE' });
  assert(funcRet.programmingType === 'RETURN_VALUE', 'FunctionReturnGenerator: targetType RETURN_VALUE 존중');

  const recGen = GeneratorRegistry.get('RecursiveCallGenerator')!;
  const recRet = recGen.generate({ seed: 10, targetType: 'RETURN_VALUE' });
  assert(recRet.programmingType === 'RETURN_VALUE', 'RecursiveCallGenerator: targetType RETURN_VALUE 존중');

  const structGen = GeneratorRegistry.get('StructClassGenerator')!;
  const polyQ = structGen.generate({ seed: 10, targetLanguage: 'JAVA', targetTopic: 'INHERITANCE_POLY' });
  assert(polyQ.topic === 'INHERITANCE_POLY', 'StructClassGenerator: targetTopic INHERITANCE_POLY 존중');

  // 7. 지원 불가능한 요청 및 조건 완화 정책 검증
  console.log('\n--- 6. 조건 완화 정책 및 지원 불가 요청 검증 ---');
  // C 언어 전용 POINTER_REFERENCE를 PYTHON으로 요청 시 언어를 바꾸지 않고 에러 발생
  let threwExpected = false;
  try {
    await ProgrammingEngine.generateQuestion({
      language: 'PYTHON',
      topic: 'POINTER_REFERENCE',
    });
  } catch (e: any) {
    threwExpected = true;
    assert(e.message.includes('지원하는 생성기') || e.message.includes('생성기가 없습니다'), `지원 불가 조건 요청 시 명확한 에러 발생 (메시지: ${e.message})`);
  }
  assert(threwExpected, 'Python + POINTER_REFERENCE 불가능 조합 시 에러 정상 발생');


  // 정상 조건 요청 시 언어 절대 보존
  const javaLoop = await ProgrammingEngine.generateQuestion({
    language: 'JAVA',
    topic: 'LOOP',
  });
  assert(javaLoop.programmingLanguage === 'JAVA', '요청 언어(JAVA) 불변 보존');

  // 8. GeneratorRegistry.clear() 후 재초기화 무결성 검증
  console.log('\n--- 7. GeneratorRegistry.clear() 및 재초기화 검증 ---');
  GeneratorRegistry.clear();
  assert(GeneratorRegistry.count() === 0, 'GeneratorRegistry.clear() 후 0개');
  ProgrammingEngine.init();
  assert(GeneratorRegistry.count() === 10, 'clear 후 ProgrammingEngine.init() 호출 시 10개 정상 재등록');

  // 9. 벤치마크 실행 시 사용자 생성 이력 비오염 격리 검증
  console.log('\n--- 8. 벤치마크 비오염 격리 검증 ---');
  await ProgrammingHistoryTracker.clearHistory();
  const initialFpCount = (await ProgrammingHistoryTracker.getRecentFingerprints()).length;
  assert(initialFpCount === 0, '초기 이력 비어있음');

  // 20회 벤치마크 수행
  const bmRes = await ProgrammingDiagnostics.runBenchmark(20);
  assert(bmRes.totalGenerated === 20, '벤치마크 20회 정상 실행');

  const postBmFpCount = (await ProgrammingHistoryTracker.getRecentFingerprints()).length;
  assert(postBmFpCount === 0, `벤치마크 실행 후 사용자 생성 이력 개수 불변 (오염 없음, 실제: ${postBmFpCount})`);

  // 10. GeneratorSelector 시드 기반 결정론적 선택 검증
  console.log('\n--- 9. GeneratorSelector 결정론적 시드 선택 검증 ---');
  const contextSeeded = { seed: 12345 };
  const gensAll = GeneratorRegistry.getAll();
  const chosen1 = await (await import('../src/services/programming/selector')).GeneratorSelector.selectGenerator(contextSeeded, gensAll);
  const chosen2 = await (await import('../src/services/programming/selector')).GeneratorSelector.selectGenerator(contextSeeded, gensAll);
  assert(chosen1?.id === chosen2?.id, `동일 시드(12345)에서 동일 생성기 선택 (${chosen1?.id} === ${chosen2?.id})`);

  // 11. 문제 캐시와 중복 제거 통합 & 안전 저장 검증
  console.log('\n--- 10. QuestionRepository 중복 제거 및 안전 저장 검증 ---');
  // (1) 질문 문구가 같아도 코드가 다른 프로그래밍 문제는 둘 다 정상 저장됨
  const progQ1: Question = {
    id: 'PROG_TEST_001',
    subject: '프로그래밍언어활용',
    category: 'C',
    type: 'CODE_TRACE',
    question: '다음 C 프로그램의 실행 결과를 쓰시오.',
    code: '#include <stdio.h>\nint main() { printf("1"); return 0; }',
    answer: '1',
    explanation: '출력 1',
    difficulty: 'EASY',
    keywords: ['C'],
    structuralFingerprint: 'C|LOOP|CODE_OUTPUT|FOR|ACCUMULATE_SUM|SCALAR|NONE|EASY',
    validationStatus: 'validated',
  };

  const progQ2: Question = {
    id: 'PROG_TEST_002',
    subject: '프로그래밍언어활용',
    category: 'C',
    type: 'CODE_TRACE',
    question: '다음 C 프로그램의 실행 결과를 쓰시오.', // 질문 텍스트 동일
    code: '#include <stdio.h>\nint main() { printf("2"); return 0; }', // 코드는 다름
    answer: '2',
    explanation: '출력 2',
    difficulty: 'EASY',
    keywords: ['C'],
    structuralFingerprint: 'C|LOOP|CODE_OUTPUT|WHILE|ACCUMULATE_SUM|SCALAR|NONE|EASY', // 지문 다름
    validationStatus: 'validated',
  };

  const added1 = await QuestionRepository.appendCachedQuestions([progQ1]);
  assert(added1 === 1, '첫 번째 프로그래밍 문제 저장 성공');

  const added2 = await QuestionRepository.appendCachedQuestions([progQ2]);
  assert(added2 === 1, '질문 문구가 같아도 코드가 다른 프로그래밍 문제 정상 저장 성공');

  // (2) 동일 구조 지문 또는 동일 코드 재저장 시 차단
  const progQ3Dup: Question = {
    ...progQ1,
    id: 'PROG_TEST_003_DUP',
  };
  const added3Dup = await QuestionRepository.appendCachedQuestions([progQ3Dup]);
  assert(added3Dup === 0, '동일 구조 지문/코드 프로그래밍 문제 중복 저장 차단');

  // (3) 배치 내부 중복 제거 검증
  const batchWithDup: Question[] = [
    {
      id: 'PROG_BATCH_1',
      subject: '프로그래밍언어활용',
      category: 'JAVA',
      type: 'CODE_TRACE',
      question: '다음 Java 프로그램의 실행 결과를 쓰시오.',
      code: 'class A { void f() {} }',
      answer: 'A',
      explanation: 'A',
      difficulty: 'MEDIUM',
      keywords: ['JAVA'],
      structuralFingerprint: 'JAVA|OOP|CODE_OUTPUT|NONE|NONE|SCALAR|NONE|MEDIUM',
      validationStatus: 'validated',
    },
    {
      id: 'PROG_BATCH_1', // 동일 ID 중복
      subject: '프로그래밍언어활용',
      category: 'JAVA',
      type: 'CODE_TRACE',
      question: '다음 Java 프로그램의 실행 결과를 쓰시오.',
      code: 'class A { void f() {} }',
      answer: 'A',
      explanation: 'A',
      difficulty: 'MEDIUM',
      keywords: ['JAVA'],
      structuralFingerprint: 'JAVA|OOP|CODE_OUTPUT|NONE|NONE|SCALAR|NONE|MEDIUM',
      validationStatus: 'validated',
    },
  ];
  const batchAdded = await QuestionRepository.appendCachedQuestions(batchWithDup);
  assert(batchAdded === 1, '배치 내부 중복 제거 후 1개만 저장');

  // (4) rejected 및 manualReviewRequired 저장 차단 검증
  const rejectedQ: Question = {
    id: 'REJECTED_TEST_001',
    subject: '프로그래밍언어활용',
    category: 'C',
    type: 'CODE_TRACE',
    question: '악성 코드',
    code: 'system("rm -rf");',
    answer: '0',
    explanation: '설명',
    difficulty: 'HARD',
    keywords: ['C'],
    validationStatus: 'rejected',
  };
  const addedRejected = await QuestionRepository.appendCachedQuestions([rejectedQ]);
  assert(addedRejected === 0, 'rejected 문제 저장 거절 차단');

  const manualQ: Question = {
    id: 'MANUAL_TEST_001',
    subject: '프로그래밍언어활용',
    category: 'C',
    type: 'CODE_TRACE',
    question: '수동 검토 필요 문제',
    code: 'int a = 1;',
    answer: '1',
    explanation: '정답 언급 없는 해설',
    difficulty: 'EASY',
    keywords: ['C'],
    validationStatus: 'manualReviewRequired',
  };
  const addedManual = await QuestionRepository.appendCachedQuestions([manualQ]);
  assert(addedManual === 0, '승인되지 않은 manualReviewRequired 문제 저장 거절 차단');

  console.log('\n--- 11. 캐시 중복 문항 삭제 검증 ---');
  const memoA: Question = {
    id: 'MEMO_DUP_KEEP',
    subject: '신기술/보안',
    category: '보안',
    type: 'SHORT_ANSWER',
    question: '역할 기반 접근통제의 약어를 쓰시오.',
    answer: 'RBAC',
    explanation: '원본',
    difficulty: 'EASY',
    keywords: ['RBAC'],
  };
  const memoB: Question = {
    ...memoA,
    id: 'MEMO_DUP_DROP',
    explanation: '복제',
  };
  const uniqueMemo: Question = {
    id: 'MEMO_UNIQUE',
    subject: '신기술/보안',
    category: '보안',
    type: 'SHORT_ANSWER',
    question: '공개키 기반 구조의 약어를 쓰시오.',
    answer: 'PKI',
    explanation: '유일',
    difficulty: 'EASY',
    keywords: ['PKI'],
  };

  const dupIds = pickDuplicateCachedIds([], [memoA, memoB, uniqueMemo]);
  assert(dupIds.length === 1 && dupIds[0] === 'MEMO_DUP_DROP', '같은 지문의 나중 항목만 삭제 대상으로 고름');

  await QuestionRepository.replaceCachedServerQuestions([memoA, memoB, uniqueMemo]);
  assert(QuestionRepository.countCachedDuplicates() === 1, '캐시 중복 1건 집계');
  const removed = await QuestionRepository.removeDuplicateCachedQuestions();
  assert(removed === 1, '중복 1건 삭제');
  assert(QuestionRepository.countCachedDuplicates() === 0, '삭제 후 중복 0건');
  assert(
    !!QuestionRepository.getById('MEMO_DUP_KEEP') &&
      !QuestionRepository.getById('MEMO_DUP_DROP') &&
      !!QuestionRepository.getById('MEMO_UNIQUE'),
    '원본과 유일 문항은 유지하고 복제만 삭제',
  );

  await QuestionRepository.replaceCachedServerQuestions([memoA, memoB, uniqueMemo]);
  await QuestionRepository.loadCachedServerQuestions();
  assert(QuestionRepository.countCachedDuplicates() === 0, '보관함 로드 시 중복을 알림 없이 정리');
  assert(
    !!QuestionRepository.getById('MEMO_DUP_KEEP') &&
      !QuestionRepository.getById('MEMO_DUP_DROP') &&
      !!QuestionRepository.getById('MEMO_UNIQUE'),
    '로드 정리 후에도 원본과 유일 문항은 유지',
  );

  console.log('\n====================================================');
  if (failedCount === 0) {
    console.log('  🎉 모든 프로그래밍 엔진 및 저장소 안정화 테스트 통과!');
  } else {
    console.error(`  ⚠️ ${failedCount}개 테스트 실패`);
    process.exit(1);
  }
  console.log('====================================================\n');
}

runTests().catch((e) => {
  console.error('Test execution error:', e);
  process.exit(1);
});
