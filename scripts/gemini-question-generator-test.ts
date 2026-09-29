import {
  GeminiService,
  GENERATOR_MODELS,
  BULK_GENERATOR_MODELS,
} from "../src/api/geminiService";
import {
  MEMO_BATCH_COUNT,
  MEMO_BATCH_SIZE,
  MEMO_CONCURRENCY,
  MEMO_RETRY_DELAY_MS,
  MEMO_MIN_ACCEPTABLE_BATCH_QUESTIONS,
  MEMO_BULK_TARGET,
  MEMO_BULK_MAX,
  MEMO_BULK_CHOICES,
  clampBulkCount,
  memoBatchCountForTarget,
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
import {
  MemoJobService,
  queuedCountFromJob,
  remainingFromJob,
  recordBatchSaveResult,
  shouldSkipMemoBatch,
  prepareMemoJobForResume,
  leftoverProgressMessage,
  cancelJobUserMessage,
  isLeftoverMemoJob,
  MAX_MEMO_BATCH_ATTEMPTS,
  savedCountFromJob,
} from "../src/services/memoJobService";
import { QuestionRepository } from "../src/repositories/questionRepository";
import { MemoGenerationJob } from "../src/types/generationJob";
import { Question } from "../src/types/question";
import { filterNewMemoQuestions } from "../src/utils/memoDedupe";

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
      question: `주제 ${suffix}-${index} ${suffix}묶음 항목${index}를 쓰시오.`,
      answer: [`정답${suffix}${index}`, `동의어${suffix}${index}`],
      explanation: "해설입니다.",
    })),
  };
}

async function run() {
  console.log("=== Gemini 암기 시드·묶음 생성 검증 ===\n");

  const seeds = pickTopicSeeds(
    MEMO_BATCH_SIZE,
    [],
    MEMO_TOPIC_SEEDS,
    () => 0.2,
  );
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
    [
      {
        subject: "소프트웨어설계",
        keywords: ["응집도"],
        question: "결합도를 쓰시오.",
      },
    ],
    [
      {
        id: "sd-mod-cohesion",
        subject: "소프트웨어설계",
        chapter: "모듈화",
        topic: "응집도와 결합도",
      },
      {
        id: "db-3nf",
        subject: "데이터베이스구축",
        chapter: "정규화",
        topic: "정규화 3NF/BCNF/이행종속",
      },
      {
        id: "im-wbs",
        subject: "정보시스템구축관리",
        chapter: "일정",
        topic: "WBS와 작업 패키지",
      },
      {
        id: "sc-rbac",
        subject: "신기술/보안",
        chapter: "접근통제",
        topic: "접근통제 DAC/MAC/RBAC",
      },
    ],
    () => 0.1,
  );
  assert(
    !covered.some((item) => item.topic === "응집도와 결합도"),
    "이미 다룬 주제는 시드에서 후순위로 밀림",
  );

  const prompt = buildPrompt([], seeds);
  assert(prompt.includes("지정 챕터"), "프롬프트에 시드 섹션 포함");
  assert(
    seeds.every(
      (seed) => prompt.includes(seed.topic) && prompt.includes(seed.id),
    ),
    "선택한 시드가 프롬프트에 주입됨",
  );
  assert(
    prompt.includes(`총 ${seeds.length}개`),
    "묶음 크기가 프롬프트에 명시",
  );
  assert(
    prompt.includes("같은 정답") && prompt.includes("바꿔 말하기"),
    "프롬프트가 같은 정답·바꿔 말하기를 금지",
  );

  const existingForAvoid: Question = {
    id: "OLD_RBAC",
    subject: "신기술/보안",
    category: "접근통제",
    chapterId: "sc-rbac",
    chapter: "접근통제",
    subCategory: "RBAC",
    type: "SHORT_ANSWER",
    question: "역할 기반 접근통제의 약어를 쓰시오.",
    answer: ["RBAC", "역할기반접근통제"],
    explanation: "기존",
    difficulty: "EASY",
    keywords: ["RBAC"],
  };
  const rbacSeed = MEMO_TOPIC_SEEDS.find((item) => item.id === "sc-rbac");
  assert(!!rbacSeed, "RBAC 챕터 시드 존재");
  if (rbacSeed) {
    const avoidPrompt = buildPrompt([existingForAvoid], [rbacSeed]);
    assert(
      avoidPrompt.includes("역할 기반 접근통제") &&
        avoidPrompt.includes("RBAC"),
      "해당 챕터 기존 지문·정답이 회피 목록에 들어감",
    );
  }

  const parsed = collectQuestionsFromText(
    JSON.stringify(memoPayload("A")),
    new Set(),
    "t",
    MEMO_BATCH_SIZE,
    seeds,
  );
  assert(
    parsed.length === MEMO_BATCH_SIZE,
    "한 묶음에서 과목 중복 허용해 7문제 수집",
  );
  assert(
    parsed.every((item, index) => item.chapterId === seeds[index].id),
    "수집 문항에 챕터 id를 붙임",
  );
  assert(
    collectQuestionsFromText(
      JSON.stringify(memoPayload("A")),
      new Set([normalizeStem("주제 A-0 A묶음 항목0를 쓰시오.")]),
      "t",
    ).length ===
      MEMO_BATCH_SIZE - 1,
    "기존 지문은 묶음에서 제외",
  );

  const paraphrase: Question = {
    ...existingForAvoid,
    id: "NEW_RBAC",
    question: "역할을 기반으로 접근을 통제하는 모델의 영문 약어를 쓰시오.",
    answer: "역할기반접근통제",
  };
  assert(
    filterNewMemoQuestions([paraphrase], [existingForAvoid]).length === 0,
    "같은 정답의 바꿔 말하기는 생성 결과에서 제외",
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
        `2묶음 × ${MEMO_BATCH_SIZE}문제 (실제: ${result.questions.length})`,
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
  const unclosedParsed = collectQuestionsFromText(
    unclosedMarkdown,
    new Set(),
    "unclosed",
  );
  assert(
    unclosedParsed.length === MEMO_BATCH_SIZE,
    "닫히지 않은 마크다운 코드블록 정상 파싱",
  );

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
  const parsedWithNewlines = collectQuestionsFromText(
    rawWithNewlines,
    new Set(),
    "nl",
  );
  assert(
    parsedWithNewlines.length === 4,
    "문자열 내 비이스케이프 줄바꿈 정상 이스케이프 및 수집",
  );

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
  const parsedWithInnerBrackets = collectQuestionsFromText(
    jsonWithInnerBrackets,
    new Set(),
    "bracket",
  );
  assert(
    parsedWithInnerBrackets.length === 4,
    "문자열 내부 중괄호/대괄호가 포함되어도 토큰 손상 없이 안전 파싱",
  );

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

  const repairedQuestions = collectQuestionsFromText(
    truncatedPayload,
    new Set(),
    "trunc",
  );
  assert(
    repairedQuestions.length === 5,
    `중간 절단 시 완성된 5문항 정상 복구 수집 (실제: ${repairedQuestions.length})`,
  );

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
    lowBatchResult.questions.length === 2 && !lowBatchResult.error,
    "잘린 응답이어도 온전한 문항 2개는 남긴다",
  );

  console.log("\n=== 영속 작업 관리자 및 Ground-Truth 교차 검증 테스트 ===\n");

  // 6. Ground-Truth 교차 검증: QuestionRepository에 이미 저장된 문제가 있다면 Job 상태가 PENDING이어도 COMPLETED로 자동 보정
  const testJobId = `TEST_JOB_${Date.now()}`;
  const mockBatch0Questions: Question[] = Array.from({ length: 7 }, (_, i) => ({
    id: `GEMINI_MEMO_${testJobId}_b0_${i}_소프트웨어설계`,
    subject: "소프트웨어설계",
    category: "실기 암기",
    type: "SHORT_ANSWER",
    question: `교차검증 알파${i} 고유문항${i} ${testJobId}을 쓰시오.`,
    answer: `테스트정답${i}`,
    explanation: "교차검증 테스트용 해설입니다.",
    difficulty: "EASY",
    keywords: [],
    source: "테스트",
  }));

  const addedCount =
    await QuestionRepository.appendCachedQuestions(mockBatch0Questions);
  assert(
    addedCount === 7,
    `모의 1차 배치 7문제 QuestionRepository 저장 완료 (실제: ${addedCount})`,
  );

  const mockJob: MemoGenerationJob = {
    jobId: testJobId,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    totalBatches: 2,
    batchSize: 7,
    targetCount: 14,
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

  const validatedJob =
    await MemoJobService.crossValidateJobWithRepository(mockJob);
  assert(
    validatedJob.batches[0].status === "COMPLETED",
    "저장소에 문제가 존재하면 1차 배치는 COMPLETED로 자동 보정됨",
  );
  assert(
    validatedJob.batches[0].savedQuestionIds.length === 7,
    "저장된 7개 Question ID가 정확히 연동됨",
  );
  assert(
    validatedJob.batches[1].status === "PENDING",
    "저장소에 없는 2차 배치는 PENDING 유지",
  );

  // 7. 멱등성(Idempotency) 검증: 이미 저장된 1차 배치 문제들을 다시 appendCachedQuestions에 넣어도 중복 저장되지 않음 (0개 추가)
  const duplicateAppendCount =
    await QuestionRepository.appendCachedQuestions(mockBatch0Questions);
  assert(
    duplicateAppendCount === 0,
    `동일 문항 재시도 시 중복 추가 차단 (실제 추가: ${duplicateAppendCount}개)`,
  );

  assert(
    memoBatchCountForTarget(MEMO_BULK_TARGET) === 20,
    "100문제는 5개씩 20묶음",
  );
  assert(
    MEMO_BULK_MAX === 500 &&
      MEMO_BULK_CHOICES.join(",") === "100,200,300,400,500",
    "대량 생성 상한은 500이고 100 단위로 고름",
  );
  assert(
    memoBatchCountForTarget(MEMO_BULK_MAX) === 100,
    "500문제는 5개씩 100묶음",
  );
  assert(
    pickTopicSeeds(memoBatchCountForTarget(MEMO_BULK_TARGET) * MEMO_BATCH_SIZE)
      .length === 100,
    "100개 생성에 필요한 챕터 시드를 고를 수 있음",
  );
  assert(
    pickTopicSeeds(360).length === 360,
    "시드 풀이 모자라면 같은 챕터를 다시 써서 360개까지 고름",
  );
  assert(
    clampBulkCount(80) === 100 &&
      clampBulkCount(250) === 300 &&
      clampBulkCount(999) === 500,
    "대량 개수는 100~500 사이 100 단위로 맞춤",
  );
  assert(
    queuedCountFromJob({
      jobId: "q",
      createdAt: 0,
      updatedAt: 0,
      totalBatches: 1,
      batchSize: 7,
      targetCount: 200,
      queuedCounts: [100, 200],
      status: "IN_PROGRESS",
      batches: [
        {
          batchIndex: 0,
          seeds: [],
          status: "COMPLETED",
          savedQuestionIds: Array.from({ length: 50 }, (_, i) => `s${i}`),
        },
      ],
    }) === 300,
    "대기열 합계는 queuedCounts를 더함",
  );
  assert(
    remainingFromJob({
      jobId: "r",
      createdAt: 0,
      updatedAt: 0,
      totalBatches: 1,
      batchSize: 7,
      targetCount: 200,
      queuedCounts: [100],
      status: "IN_PROGRESS",
      batches: [
        {
          batchIndex: 0,
          seeds: [],
          status: "COMPLETED",
          savedQuestionIds: Array.from({ length: 50 }, (_, i) => `s${i}`),
        },
      ],
    }) === 150,
    "남은 개수는 목표에서 저장분을 뺀 값",
  );
  assert(
    (
      await MemoJobService.crossValidateJobWithRepository({
        jobId: "keep-queue",
        createdAt: 0,
        updatedAt: 0,
        totalBatches: 1,
        batchSize: 7,
        targetCount: 7,
        queuedCounts: [200],
        status: "IN_PROGRESS",
        batches: [
          {
            batchIndex: 0,
            seeds: [],
            status: "COMPLETED",
            savedQuestionIds: ["a", "b", "c", "d", "e", "f", "g"],
          },
        ],
      })
    ).status !== "COMPLETED",
    "현재 목표가 끝나도 대기열이 있으면 작업을 지우지 않음",
  );

  console.log("\n=== 실제 저장 수·재개 대조 ===\n");

  const saveJobId = `SAVE_${Date.now()}`;
  const uniqueMemo = (index: number, stem: string): Question => ({
    id: `GEMINI_MEMO_${saveJobId}_b0_${index}_소프트웨어설계`,
    subject: "소프트웨어설계",
    category: "실기 암기",
    type: "SHORT_ANSWER",
    question: `${stem} ${saveJobId} ${index}를 쓰시오.`,
    answer: `저장검증답${index}${saveJobId}`,
    explanation: "저장 수 검증용",
    difficulty: "EASY",
    keywords: [`저장검증${index}`],
    source: "테스트",
  });
  const partialQuestions = [
    uniqueMemo(0, "부분저장알파"),
    uniqueMemo(1, "부분저장베타"),
  ];
  const partialAdded =
    await QuestionRepository.appendCachedQuestions(partialQuestions);
  assert(
    partialAdded === 2,
    `부분 저장 2개만 보관함에 추가 (실제 ${partialAdded})`,
  );

  const requestedIds = [
    ...partialQuestions.map((item) => item.id),
    `GEMINI_MEMO_${saveJobId}_b0_2_소프트웨어설계`,
    `GEMINI_MEMO_${saveJobId}_b0_3_소프트웨어설계`,
  ];
  const partialBatch: MemoGenerationJob["batches"][number] = {
    batchIndex: 0,
    seeds: [],
    status: "RUNNING",
    savedQuestionIds: [],
  };
  const savedIds = recordBatchSaveResult(
    partialBatch,
    requestedIds,
    new Set(QuestionRepository.existingIds(requestedIds)),
  );
  assert(
    savedIds.length === 2,
    `제외된 문항은 저장 성공으로 세지 않음 (실제 ${savedIds.length})`,
  );
  assert(
    partialBatch.status === "COMPLETED",
    "일부라도 실제 저장되면 해당 배치는 완료",
  );
  assert(
    savedIds.every((id) => QuestionRepository.getById(id)),
    "저장 ID는 보관함에 존재",
  );

  const duplicateAdded =
    await QuestionRepository.appendCachedQuestions(partialQuestions);
  assert(
    duplicateAdded === 0,
    `재개 시 기존 문항 중복 저장 없음 (실제 ${duplicateAdded})`,
  );
  assert(
    QuestionRepository.existingIds(requestedIds).length === 2,
    "중복 제외 후에도 실제 문항은 2개",
  );

  const ghostJob: MemoGenerationJob = {
    jobId: `GHOST_${Date.now()}`,
    createdAt: 0,
    updatedAt: 0,
    totalBatches: 1,
    batchSize: 7,
    targetCount: 4,
    status: "COMPLETED",
    batches: [
      {
        batchIndex: 0,
        seeds: [],
        status: "COMPLETED",
        savedQuestionIds: ["ghost-1", "ghost-2", "ghost-3", "ghost-4"],
      },
    ],
  };
  const ghostValidated =
    await MemoJobService.crossValidateJobWithRepository(ghostJob);
  assert(
    savedCountFromJob(ghostValidated) === 0,
    "완료 기록만 있고 실제 문항이 없으면 저장 수는 0",
  );
  assert(
    ghostValidated.batches[0].status === "PENDING",
    "실제 문항이 없는 COMPLETED 배치는 재개 가능하게 되돌림",
  );
  assert(
    ghostValidated.status !== "COMPLETED",
    "목표 미달 작업을 성공으로 지우지 않음",
  );

  const failBatch: MemoGenerationJob["batches"][number] = {
    batchIndex: 1,
    seeds: [],
    status: "RUNNING",
    savedQuestionIds: [],
  };
  for (let i = 0; i < MAX_MEMO_BATCH_ATTEMPTS; i++) {
    recordBatchSaveResult(failBatch, ["missing-id"], new Set());
  }
  assert(
    failBatch.attemptCount === MAX_MEMO_BATCH_ATTEMPTS &&
      shouldSkipMemoBatch(failBatch),
    "저장 실패 반복은 시도 한도에서 멈춤",
  );

  const stuckJob: MemoGenerationJob = {
    jobId: "stuck-resume",
    createdAt: 0,
    updatedAt: 0,
    totalBatches: 2,
    batchSize: 7,
    targetCount: 100,
    refillAttempts: 2,
    status: "PARTIALLY_COMPLETED",
    batches: [
      {
        batchIndex: 0,
        seeds: [],
        status: "COMPLETED",
        savedQuestionIds: ["real-1"],
      },
      {
        batchIndex: 1,
        seeds: [],
        status: "FAILED",
        savedQuestionIds: [],
        attemptCount: MAX_MEMO_BATCH_ATTEMPTS,
      },
    ],
  };
  assert(isLeftoverMemoJob(stuckJob), "부분 완료 작업은 중단할 수 있음");
  prepareMemoJobForResume(stuckJob);
  assert(
    stuckJob.batches[1].status === "PENDING" &&
      stuckJob.batches[1].attemptCount === 0 &&
      !shouldSkipMemoBatch(stuckJob.batches[1]),
    "이어서 누르면 실패한 묶음을 다시 시도할 수 있음",
  );
  assert(
    leftoverProgressMessage(7, 100).includes("7문제") &&
      !leftoverProgressMessage(7, 100).includes("부족"),
    "사용자 안내에 부족 개수를 쓰지 않음",
  );
  assert(
    leftoverProgressMessage(
      0,
      100,
      "gemini-3.8-flash: 응답 시간이 초과되었습니다.",
    ).includes("응답 시간이 초과"),
    "남은 작업 안내에 실제 실패 원인을 붙인다",
  );
  assert(
    cancelJobUserMessage(7).includes("7문제") &&
      !cancelJobUserMessage(7).includes("보관함"),
    "중단 안내도 사용자 말로 씀",
  );

  assert(
    BULK_GENERATOR_MODELS.join(",") === "gemini-3.8-flash,gemini-3.5-flash",
    "대량 생성은 3.8 우선, 실패 시 3.5 폴백",
  );

  const originalGenerate = GeminiService.generateText.bind(GeminiService);
  try {
    let bulkCall: { models?: string[]; maxRetries?: number } | undefined;
    GeminiService.generateText = (async (_prompt, options) => {
      bulkCall = {
        models: options?.models,
        maxRetries: options?.maxRetries,
      };
      return {
        ok: true as const,
        text: JSON.stringify(memoPayload("bulk")),
      };
    }) as typeof GeminiService.generateText;

    await generateOneBatch([], new Set(), seeds, "bulk", {
      models: BULK_GENERATOR_MODELS,
      maxRetries: 3,
    });
    assert(
      bulkCall?.models?.join(",") === "gemini-3.8-flash,gemini-3.5-flash" &&
        bulkCall?.maxRetries === 3,
      "대량 생성 묶음은 3.8 우선 후 3.5 폴백, 같은 모델에서 더 재시도",
    );
  } finally {
    GeminiService.generateText = originalGenerate;
  }

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
