import { GeminiService, GENERATOR_MODELS } from "../src/api/geminiService";
import {
  MEMO_BATCH_COUNT,
  MEMO_BATCH_SIZE,
  MEMO_CONCURRENCY,
  MEMO_RETRY_DELAY_MS,
  buildPrompt,
  collectQuestionsFromText,
  generateMemorizationQuestions,
  normalizeStem,
} from "../src/api/geminiQuestionGenerator";
import { MEMO_TOPIC_SEEDS, pickTopicSeeds } from "../src/data/memoTopicSeeds";
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
