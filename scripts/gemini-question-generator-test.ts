import { GeminiService, GENERATOR_MODELS } from "../src/api/geminiService";
import {
  MEMO_BATCH_COUNT,
  MEMO_BATCH_SIZE,
  MEMO_CONCURRENCY,
  MEMO_RETRY_DELAY_MS,
  MEMO_MIN_ACCEPTABLE_BATCH_QUESTIONS,
  buildPrompt,
  collectQuestionsFromText,
  generateOneBatch,
  generateMemorizationQuestions,
  normalizeStem,
  extractJsonCandidate,
  sanitizeJsonStringLiterals,
  parseJsonPayload,
} from "../src/api/geminiQuestionGenerator";
import { MEMO_TOPIC_SEEDS, pickTopicSeeds } from "../src/data/memoTopicSeeds";
import { MemoJobService } from "../src/services/memoJobService";
import { QuestionRepository } from "../src/repositories/questionRepository";
import { MemoGenerationJob } from "../src/types/generationJob";
import { Question } from "../src/types/question";

let failed = 0;

function assert(cond: boolean, message: string) {
  if (!cond) {
    failed += 1;
    console.error("FAIL:", message);
  } else {
    console.log("OK  ", message);
  }
}

function memoPayload(suffix: string, count = MEMO_BATCH_SIZE) {
  const subjects = [
    "소프트웨어설계",
    "데이터베이스구축",
    "정보시스템구축관리",
    "신기술/보안",
    "소프트웨어설계",
    "데이터베이스구축",
    "신기술/보안",
  ] as const;
  return {
    questions: Array.from({ length: count }, (_, index) => ({
      subject: subjects[index % subjects.length],
      question: `주제 ${suffix} ${index}를 쓰시오.`,
      answer: ["정답", "동의어"],
      explanation: "해설입니다.",
    })),
  };
}

async function run() {
  console.log("=== Gemini 암기 시드·묶음 생성 검증 ===\n");

  const seeds = pickTopicSeeds(MEMO_BATCH_SIZE, [], MEMO_TOPIC_SEEDS, () => 0.2);
  assert(seeds.length === MEMO_BATCH_SIZE, `시드 ${MEMO_BATCH_SIZE}개 추출`);
  assert(
    new Set(seeds.map((item) => item.subject)).size >= 4,
    "시드가 4과목을 포함",
  );
  assert(
    new Set(seeds.map((item) => item.topic)).size === seeds.length,
    "시드 주제 중복 없음",
  );

  const covered = pickTopicSeeds(
    3,
    [{ subject: "소프트웨어설계", keywords: ["응집도"], question: "결합도를 쓰시오." }],
    [
      { subject: "소프트웨어설계", topic: "응집도와 결합도" },
      { subject: "데이터베이스구축", topic: "정규화 3NF/BCNF/이행종속" },
      { subject: "정보시스템구축관리", topic: "WBS와 작업 패키지" },
      { subject: "신기술/보안", topic: "접근통제 DAC/MAC/RBAC" },
    ],
    () => 0.1,
  );
  assert(
    !covered.some((item) => item.topic === "응집도와 결합도"),
    "이미 다룬 주제는 시드에서 후순위로 밀림",
  );

  const prompt = buildPrompt([], seeds);
  assert(prompt.includes("지정 주제"), "프롬프트에 시드 섹션 포함");
  assert(
    seeds.every((seed) => prompt.includes(seed.topic)),
    "선택한 시드가 프롬프트에 주입됨",
  );
  assert(prompt.includes(`총 ${seeds.length}개`), "묶음 크기가 프롬프트에 명시");

  const parsed = collectQuestionsFromText(
    JSON.stringify(memoPayload("A")),
    new Set(),
    "t",
  );
  assert(parsed.length === MEMO_BATCH_SIZE, "한 묶음에서 과목 중복 허용해 7문제 수집");
  assert(
    collectQuestionsFromText(
      JSON.stringify(memoPayload("A")),
      new Set([normalizeStem("주제 A 0를 쓰시오.")]),
      "t",
    ).length === MEMO_BATCH_SIZE - 1,
    "기존 지문은 묶음에서 제외",
  );

  const original = GeminiService.generateText.bind(GeminiService);

  try {
    const calls: Array<{
      models?: string[];
      maxRetries?: number;
      retryDelayMs?: number;
    }> = [];
    let started = 0;
    let release!: () => void;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });

    GeminiService.generateText = (async (_prompt, options) => {
      started += 1;
      const callId = started;
      calls.push({
        models: options?.models,
        maxRetries: options?.maxRetries,
        retryDelayMs: options?.retryDelayMs,
      });
      await gate;
      return {
        ok: true as const,
        text: JSON.stringify(memoPayload(String(callId))),
      };
    }) as typeof GeminiService.generateText;

    const pending = generateMemorizationQuestions([]);
    await new Promise((resolve) => setTimeout(resolve, 20));
    assert(
      started === MEMO_CONCURRENCY,
      `동시 요청은 ${MEMO_CONCURRENCY}개 (실제: ${started})`,
    );
    release();
    const result = await pending;

    assert(result.ok, "묶음 생성 성공");
    if (result.ok) {
      assert(
        result.questions.length === MEMO_BATCH_SIZE * MEMO_BATCH_COUNT,
        `2묶음 × 7문제 (실제: ${result.questions.length})`,
      );
    }
    assert(calls.length === MEMO_BATCH_COUNT, "묶음 수만큼 API 호출");
    assert(
      calls.every(
        (call) =>
          call.models?.[0] === "gemini-3.8-flash" &&
          call.models?.[1] === "gemini-3.5-flash" &&
          call.models?.every((model) => !model.includes("lite")),
      ),
      "호출은 3.8 → 3.5-flash, lite 없음",
    );
    assert(
      calls.every(
        (call) =>
          call.maxRetries === 1 && call.retryDelayMs === MEMO_RETRY_DELAY_MS,
      ),
      "3.8은 0.3초 1회만 재시도",
    );
    assert(
      GENERATOR_MODELS.join(",") === "gemini-3.8-flash,gemini-3.5-flash",
      "생성 모델 목록은 3.8과 3.5-flash만",
    );

    let firstFailed = false;
    GeminiService.generateText = (async () => {
      if (!firstFailed) {
        firstFailed = true;
        return { ok: false as const, message: "서버 혼잡" };
      }
      return { ok: true as const, text: JSON.stringify(memoPayload("B")) };
    }) as typeof GeminiService.generateText;

    const partial = await generateMemorizationQuestions([]);
    assert(partial.ok, "한 묶음이 실패해도 다른 묶음은 사용");
    if (partial.ok) {
      assert(
        partial.questions.length === MEMO_BATCH_SIZE,
        `성공한 묶음 7문제만 남김 (실제: ${partial.questions.length})`,
      );
    }
  } finally {
    GeminiService.generateText = original;
  }

  console.log("\n=== 3단계 강건한 JSON 파서 및 스키마 검증 테스트 ===\n");

  // 1. 닫히지 않은 마크다운 코드블록 복구 테스트
  const unclosedMarkdown = "```json\n" + JSON.stringify(memoPayload("M"));
  const unclosedParsed = collectQuestionsFromText(unclosedMarkdown, new Set(), "unclosed");
  assert(unclosedParsed.length === MEMO_BATCH_SIZE, "닫히지 않은 마크다운 코드블록 정상 파싱");

  // 2. 문자열 내부의 실제 줄바꿈(개행) 제어문자 정규화 테스트
  const rawWithNewlines = `{
    "questions": [
      {
        "subject": "소프트웨어설계",
        "question": "다음 요구사항을 만족하는\n패턴을 쓰시오.",
        "answer": ["싱글톤"],
        "explanation": "해설 첫 줄입니다.\n해설 둘째 줄입니다."
      },
      {
        "subject": "데이터베이스구축",
        "question": "제2정규형의 정의를 쓰시오.",
        "answer": ["완전함수종속"],
        "explanation": "부분함수종속을 제거한\n정규형입니다."
      },
      {
        "subject": "정보시스템구축관리",
        "question": "WBS의 단위를 쓰시오.",
        "answer": ["작업패키지"],
        "explanation": "WBS 최소 단위 해설입니다."
      },
      {
        "subject": "신기술/보안",
        "question": "접근통제 모델을 쓰시오.",
        "answer": ["RBAC"],
        "explanation": "역할 기반 접근통제 해설입니다."
      }
    ]
  }`;
  const parsedWithNewlines = collectQuestionsFromText(rawWithNewlines, new Set(), "nl");
  assert(parsedWithNewlines.length === 4, "문자열 내 비이스케이프 줄바꿈 정상 이스케이프 및 수집");

  // 3. 문자열 내부에 코드/괄호({, }, [, ])가 포함된 경우 토큰 인식 안전성 테스트
  const jsonWithInnerBrackets = `{
    "questions": [
      {
        "subject": "소프트웨어설계",
        "question": "다음 JSON 구조 { 'key': [1, 2] } 를 파싱하는 객체를 쓰시오.",
        "answer": ["JSONParser"],
        "explanation": "괄호 { 'test': true } 가 포함된 해설입니다."
      },
      {
        "subject": "데이터베이스구축",
        "question": "SELECT * FROM T WHERE id IN (1, 2) 쿼리를 쓰시오.",
        "answer": ["IN쿼리"],
        "explanation": "배열 [1, 2, 3] 연산자 해설입니다."
      },
      {
        "subject": "정보시스템구축관리",
        "question": "CPM 네트워크 다이어그램을 쓰시오.",
        "answer": ["CPM"],
        "explanation": "임계경로 {Critical Path} 해설입니다."
      },
      {
        "subject": "신기술/보안",
        "question": "SQL 인젝션 방어 기법을 쓰시오.",
        "answer": ["Prepared Statement"],
        "explanation": "바인딩 {placeholder} 기법 해설입니다."
      }
    ]
  }`;
  const parsedWithInnerBrackets = collectQuestionsFromText(jsonWithInnerBrackets, new Set(), "bracket");
  assert(parsedWithInnerBrackets.length === 4, "문자열 내부 중괄호/대괄호가 포함되어도 토큰 손상 없이 안전 파싱");

  // 4. 잘린 JSON 배열(Truncated JSON)의 구조 복구 테스트 (5문항 완료 후 6문항 도중 절단)
  const truncatedPayload = `{
    "questions": [
      {
        "subject": "소프트웨어설계",
        "question": "디자인 패턴 중 싱글톤 패턴을 쓰시오.",
        "answer": ["싱글톤", "Singleton"],
        "explanation": "단 하나의 인스턴스만 생성하여 사용하는 패턴입니다."
      },
      {
        "subject": "데이터베이스구축",
        "question": "제2정규형의 정의를 쓰시오.",
        "answer": ["완전함수종속"],
        "explanation": "부분함수종속을 제거한 정규형입니다."
      },
      {
        "subject": "정보시스템구축관리",
        "question": "작업 분할 구조도를 쓰시오.",
        "answer": ["WBS"],
        "explanation": "프로젝트 목표를 달성하기 위한 작업 분류 체계입니다."
      },
      {
        "subject": "신기술/보안",
        "question": "역할 기반 접근통제를 쓰시오.",
        "answer": ["RBAC"],
        "explanation": "사용자의 역할에 따라 권한을 부여하는 방식입니다."
      },
      {
        "subject": "소프트웨어설계",
        "question": "객체지향 원칙 중 SOLID를 쓰시오.",
        "answer": ["SOLID"],
        "explanation": "5가지 객체지향 설계 원칙을 의미합니다."
      },
      {
        "subject": "데이터베이스구축",
        "question": "이행적 함수 종속을 제`; // 6번째 문항 중간 절단

  const repairedQuestions = collectQuestionsFromText(truncatedPayload, new Set(), "trunc");
  assert(repairedQuestions.length === 5, `중간 절단 시 완성된 5문항 정상 복구 수집 (실제: ${repairedQuestions.length})`);

  // 5. 엄격한 품질 임계값 검증: 유효 문항 수가 최소 기준(4개) 미만이면 실패 처리
  const severelyTruncated = `{
    "questions": [
      {
        "subject": "소프트웨어설계",
        "question": "1번 문제 지문입니다.",
        "answer": ["정답1"],
        "explanation": "1번 문제 해설입니다."
      },
      {
        "subject": "데이터베이스구축",
        "question": "2번 문제 지문입니다.",
        "answer": ["정답2"],
        "explanation": "2번 문제 해설입니다."
      }
    ]
  }`;
  GeminiService.generateText = (async () => ({
    ok: true as const,
    text: severelyTruncated,
  })) as typeof GeminiService.generateText;

  const lowBatchResult = await generateOneBatch([], new Set(), seeds, "low");
  assert(
    lowBatchResult.questions.length === 0 && !!lowBatchResult.error,
    "최소 기준(4개) 미달 시 손상 배치로 판단하여 거부 및 재시도 유도",
  );

  console.log("\n=== 영속 작업 관리자 및 Ground-Truth 교차 검증 테스트 ===\n");

  // 6. Ground-Truth 교차 검증: QuestionRepository에 이미 저장된 문제가 있다면 Job 상태가 PENDING이어도 COMPLETED로 자동 보정
  const testJobId = `TEST_JOB_${Date.now()}`;
  const mockBatch0Questions: Question[] = Array.from({ length: 7 }, (_, i) => ({
    id: `GEMINI_MEMO_${testJobId}_b0_${i}_소프트웨어설계`,
    subject: "소프트웨어설계",
    category: "실기 암기",
    type: "SHORT_ANSWER",
    question: `교차검증 테스트 문제 ${testJobId} ${i}번을 쓰시오.`,
    answer: "테스트정답",
    explanation: "교차검증 테스트용 해설입니다.",
    difficulty: "EASY",
    keywords: [],
    source: "테스트",
  }));

  const addedCount = await QuestionRepository.appendCachedQuestions(mockBatch0Questions);
  assert(addedCount === 7, `모의 1차 배치 7문제 QuestionRepository 저장 완료 (실제: ${addedCount})`);

  const mockJob: MemoGenerationJob = {
    jobId: testJobId,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    totalBatches: 2,
    batchSize: 7,
    status: "IN_PROGRESS",
    batches: [
      {
        batchIndex: 0,
        seeds: [],
        status: "PENDING", // Job 상태는 아직 PENDING이지만 실제 저장소에는 이미 저장되어 있는 타이밍 불일치 시뮬레이션
        savedQuestionIds: [],
      },
      {
        batchIndex: 1,
        seeds: [],
        status: "PENDING",
        savedQuestionIds: [],
      },
    ],
  };

  const validatedJob = await MemoJobService.crossValidateJobWithRepository(mockJob);
  assert(validatedJob.batches[0].status === "COMPLETED", "저장소에 문제가 존재하면 1차 배치는 COMPLETED로 자동 보정됨");
  assert(validatedJob.batches[0].savedQuestionIds.length === 7, "저장된 7개 Question ID가 정확히 연동됨");
  assert(validatedJob.batches[1].status === "PENDING", "저장소에 없는 2차 배치는 PENDING 유지");

  // 7. 멱등성(Idempotency) 검증: 이미 저장된 1차 배치 문제들을 다시 appendCachedQuestions에 넣어도 중복 저장되지 않음 (0개 추가)
  const duplicateAppendCount = await QuestionRepository.appendCachedQuestions(mockBatch0Questions);
  assert(duplicateAppendCount === 0, `동일 문항 재시도 시 중복 추가 차단 (실제 추가: ${duplicateAppendCount}개)`);

  if (failed > 0) {
    console.error(`\n⚠️ ${failed}개 실패`);
    process.exit(1);
  }
  console.log("\n🎉 Gemini 암기 시드·묶음 생성 테스트 통과!");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
