import {
  GeminiService,
  isTransientStatus,
  isTerminalAuthStatus,
  calculateBackoffDelay,
  PREFERRED_MODELS,
  TRANSIENT_STATUSES,
  DISCONTINUED_MODEL_REGEX,
  formatGeminiErrorMessage,
  cleanApiKey,
  sanitizeLogMessage,
} from "../src/api/geminiService";

let failed = 0;

function assert(cond: boolean, message: string) {
  if (!cond) {
    failed += 1;
    console.error("FAIL:", message);
  } else {
    console.log("OK  ", message);
  }
}

async function runGeminiServiceTests() {
  console.log("=== GeminiService 재시도·모델폴백·오류분류 검증 시작 ===\n");

  // 1. 모델 목록 무결성: gemini-1.5 및 gemini-2.0 계열 제외 확인
  assert(
    PREFERRED_MODELS.every((m) => !DISCONTINUED_MODEL_REGEX.test(m)),
    "PREFERRED_MODELS에 종료된 모델(1.5, 2.0 계열) 없음",
  );
  assert(
    !PREFERRED_MODELS.includes("gemini-1.5-flash") &&
      !PREFERRED_MODELS.includes("gemini-2.0-flash"),
    "gemini-1.5-flash 및 gemini-2.0-flash 명시적 제거 확인",
  );

  // 2. 일시적 오류 상태코드 분류 확인 (408, 429, 500, 502, 503, 504)
  const expectedTransient = [408, 429, 500, 502, 503, 504];
  assert(
    expectedTransient.every((s) => isTransientStatus(s)),
    "408, 429, 500, 502, 503, 504 모두 일시적 오류로 분류됨",
  );
  assert(!isTransientStatus(400), "400은 일시적 오류 아님");
  assert(!isTransientStatus(401), "401은 일시적 오류 아님");
  assert(!isTransientStatus(403), "403은 일시적 오류 아님");
  assert(!isTransientStatus(404), "404는 일시적 오류 아님");

  // 3. 터미널 인증 오류 분류 (400, 401, 403)
  assert(isTerminalAuthStatus(400), "400은 즉시 종료 대상");
  assert(isTerminalAuthStatus(401), "401은 즉시 종료 대상");
  assert(isTerminalAuthStatus(403), "403은 즉시 종료 대상");
  assert(!isTerminalAuthStatus(503), "503은 터미널 인증 오류 아님");
  assert(!isTerminalAuthStatus(404), "404는 터미널 인증 오류 아님");

  // 4. 지수 백오프 및 jitter 범위 확인
  const d1 = calculateBackoffDelay(1);
  const d2 = calculateBackoffDelay(2);
  const d3 = calculateBackoffDelay(3);
  assert(d1 >= 1000 && d1 <= 1300, `시도 1 지수 백오프 약 1초+jitter (실제: ${d1.toFixed(1)}ms)`);
  assert(d2 >= 2000 && d2 <= 2300, `시도 2 지수 백오프 약 2초+jitter (실제: ${d2.toFixed(1)}ms)`);
  assert(d3 >= 4000 && d3 <= 4300, `시도 3 지수 백오프 약 4초+jitter (실제: ${d3.toFixed(1)}ms)`);

  // 5. 503 오류 안내문 검증 (API 키 또는 권한 문제라고 표시하지 않음)
  const msg503 = formatGeminiErrorMessage({
    status: 503,
    message: "Service Unavailable",
  });
  assert(
    msg503 === "Gemini 서버가 일시적으로 혼잡합니다. 잠시 후 다시 시도해 주세요.",
    "503 오류 발생 시 서버 일시 혼잡 안내문 정확히 반환",
  );
  assert(!msg503.includes("API Key") && !msg503.includes("권한"), "503 안내문에 API 키/권한 언급 없음");

  // 6. 민감한 API 키 마스킹 검증
  const sampleKey = "AQ.TestSecretKey123456789";
  const masked = sanitizeLogMessage(`Error connecting with ${sampleKey}`, sampleKey);
  assert(!masked.includes(sampleKey), "로그 메시지에서 API 키 마스킹됨");
  assert(masked.includes("[REDACTED_API_KEY]") || masked.includes("[REDACTED_AQ_KEY]"), "마스킹 태그 치환됨");

  // === Mock 실행 시나리오 테스트 ===
  const noopSleep = async () => {};

  // 시나리오 1: 503 → 재시도 성공 (1회차 503 실패 후 2회차에 200 성공)
  {
    let callCount = 0;
    const delays: number[] = [];
    const mockFetch = async () => {
      callCount++;
      if (callCount === 1) {
        return new Response(JSON.stringify({ error: { message: "The model is overloaded" } }), {
          status: 503,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response(
        JSON.stringify({
          candidates: [{ content: { parts: [{ text: "성공 응답" }] } }],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    };

    const result = await GeminiService.executeWithRetry("AQ.dummy_key", "테스트 질문", {
      models: ["model-alpha"],
      fetchFn: mockFetch as any,
      sleepFn: async (delay) => {
        delays.push(delay);
      },
    });

    assert(result.ok, "시나리오 1: 503 후 재시도 성공 반환");
    if (result.ok) {
      assert(result.text === "성공 응답", "시나리오 1: 올바른 텍스트 반환");
      assert(result.model === "model-alpha", "시나리오 1: 동일 모델로 성공");
    }
    assert(callCount === 2, `시나리오 1: 총 2회 호출 (실제: ${callCount}회)`);
    assert(delays.length === 1, `시나리오 1: 백오프 대기 1회 수행 (대기시간: ${delays[0]?.toFixed(1)}ms)`);
  }

  // 시나리오 2: 503 반복 → 다음 모델 전환 (Model 1에서 4회(초회+3재시도) 503 실패 후 Model 2로 전환해 성공)
  {
    const calls: { model: string }[] = [];
    const mockFetch = async (url: string | URL | Request) => {
      const urlStr = String(url);
      const isModel1 = urlStr.includes("model-1");
      const currentModel = isModel1 ? "model-1" : "model-2";
      calls.push({ model: currentModel });

      if (isModel1) {
        return new Response(JSON.stringify({ error: { message: "503 Unavailable" } }), {
          status: 503,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response(
        JSON.stringify({
          candidates: [{ content: { parts: [{ text: "Model 2 성공" }] } }],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    };

    const result = await GeminiService.executeWithRetry("AQ.dummy_key", "테스트", {
      models: ["model-1", "model-2"],
      fetchFn: mockFetch as any,
      sleepFn: noopSleep,
    });

    assert(result.ok, "시나리오 2: 다음 모델(model-2)에서 성공");
    if (result.ok) {
      assert(result.model === "model-2", "시나리오 2: 최종 사용 모델은 model-2");
      assert(result.text === "Model 2 성공", "시나리오 2: model-2 응답 수신");
    }
    const model1Calls = calls.filter((c) => c.model === "model-1").length;
    const model2Calls = calls.filter((c) => c.model === "model-2").length;
    assert(model1Calls === 4, `시나리오 2: model-1에 대해 초회+3회재시도 총 4회 시도 (실제: ${model1Calls}회)`);
    assert(model2Calls === 1, `시나리오 2: model-2는 1회 시도 후 즉시 성공 (실제: ${model2Calls}회)`);
  }

  // 시나리오 3: 401 즉시 종료 (재시도하지 않고, 다음 모델로도 이동하지 않고 즉시 종료)
  {
    let callCount = 0;
    const mockFetch = async () => {
      callCount++;
      return new Response(JSON.stringify({ error: { message: "API key not valid" } }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    };

    const result = await GeminiService.executeWithRetry("AQ.invalid_key", "테스트", {
      models: ["model-1", "model-2"],
      fetchFn: mockFetch as any,
      sleepFn: noopSleep,
    });

    assert(!result.ok, "시나리오 3: 401 반환 시 실패 처리");
    if (!result.ok) {
      assert(result.error.status === 401, "시나리오 3: 오류 상태코드 401 일치");
    }
    assert(callCount === 1, `시나리오 3: 401은 재시도 없이 1회만 호출 후 즉시 종료 (실제: ${callCount}회)`);
  }

  // 시나리오 4: 404 다음 모델 전환 (404는 재시도 없이 즉시 다음 모델로 이동)
  {
    const calls: string[] = [];
    const mockFetch = async (url: string | URL | Request) => {
      const urlStr = String(url);
      if (urlStr.includes("model-not-found")) {
        calls.push("model-not-found");
        return new Response(JSON.stringify({ error: { message: "Model not found" } }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
      calls.push("model-valid");
      return new Response(
        JSON.stringify({
          candidates: [{ content: { parts: [{ text: "정상 동작" }] } }],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    };

    const result = await GeminiService.executeWithRetry("AQ.dummy_key", "테스트", {
      models: ["model-not-found", "model-valid"],
      fetchFn: mockFetch as any,
      sleepFn: noopSleep,
    });

    assert(result.ok, "시나리오 4: 404 이후 다음 모델에서 정상 성공");
    if (result.ok) {
      assert(result.model === "model-valid", "시나리오 4: model-valid로 전환되어 성공");
    }
    const notFoundCalls = calls.filter((c) => c === "model-not-found").length;
    const validCalls = calls.filter((c) => c === "model-valid").length;
    assert(notFoundCalls === 1, `시나리오 4: 404 모델은 재시도 없이 1회만 호출 (실제: ${notFoundCalls}회)`);
    assert(validCalls === 1, `시나리오 4: 유효 모델 1회 호출로 성공 (실제: ${validCalls}회)`);
  }

  // 시나리오 5: testConnection이 공통 재시도 함수를 사용하여 503 시 일시적 혼잡 안내 반환 확인
  {
    const mockFetch = async () => {
      return new Response(JSON.stringify({ error: { message: "Service Unavailable" } }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      });
    };

    const testRes = await GeminiService.testConnection("AQ.dummy_key", {
      models: ["model-only-503"],
      fetchFn: mockFetch as any,
      sleepFn: noopSleep,
    });

    assert(!testRes.success, "testConnection: 503 반복 시 실패 처리");
    assert(
      testRes.message === "Gemini 서버가 일시적으로 혼잡합니다. 잠시 후 다시 시도해 주세요.",
      "testConnection: 503 발생 시 API 키/권한 오류가 아닌 일시 혼잡 안내문 반환",
    );
  }

  if (failed > 0) {
    console.error(`\n❌ 총 ${failed}개 테스트 실패`);
    process.exit(1);
  } else {
    console.log("\n🎉 모든 GeminiService 재시도·모델폴백·오류분류 테스트 통과!");
  }
}

runGeminiServiceTests().catch((e) => {
  console.error("테스트 실행 중 예외 발생:", e);
  process.exit(1);
});
