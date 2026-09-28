import { Platform, ToastAndroid } from "react-native";
import { QuestionRepository } from "../repositories/questionRepository";
import { QuestionSyncService } from "../api/questionSyncService";
import {
  generateOneBatch,
  normalizeStem,
  MEMO_BATCH_SIZE,
  MEMO_QUICK_TARGET,
  MEMO_BULK_TARGET,
  MEMO_BULK_MAX,
  clampBulkCount,
  memoBatchCountForTarget,
} from "../api/geminiQuestionGenerator";
import {
  GeminiService,
  BULK_GENERATOR_MODELS,
  GENERATOR_MODELS,
} from "../api/geminiService";
import { pickTopicSeeds } from "../data/memoTopicSeeds";
import { triggerHaptic } from "../utils/haptics";
import {
  MemoGenerationJob,
  MemoBatchState,
} from "../types/generationJob";
import {
  MemoJobService,
  jobTargetCount,
  savedCountFromJob,
  queuedCountFromJob,
  remainingFromJob,
  recordBatchSaveResult,
  shouldSkipMemoBatch,
  MAX_MEMO_BATCH_ATTEMPTS,
  MAX_MEMO_JOB_REFILLS,
} from "./memoJobService";
import {
  startMemoForegroundService,
  stopMemoForegroundService,
  updateMemoForegroundNotification,
} from "./memoForegroundService";

export type BackgroundTaskType = "PROGRAMMING" | "GEMINI_MEMO";

export interface MemoProgress {
  running: boolean;
  paused: boolean;
  canResume: boolean;
  targetCount: number;
  savedCount: number;
  queuedCount: number;
  remainingCount: number;
  completedBatches: number;
  totalBatches: number;
}

export interface BackgroundTaskStatus {
  isGenerating: boolean;
  taskType: BackgroundTaskType | null;
  memo: MemoProgress | null;
}

export function memoProgressFromJob(
  job: MemoGenerationJob | null,
  running = false,
): MemoProgress | null {
  if (!job) return null;
  const completedBatches = job.batches.filter(
    (batch) => batch.status === "COMPLETED",
  ).length;
  const paused = job.status === "PAUSED";
  const canResume =
    !running &&
    (paused ||
      job.status === "PARTIALLY_COMPLETED" ||
      job.status === "FAILED" ||
      job.status === "IN_PROGRESS");
  return {
    running,
    paused,
    canResume,
    targetCount: jobTargetCount(job),
    savedCount: savedCountFromJob(job),
    queuedCount: queuedCountFromJob(job),
    remainingCount: remainingFromJob(job),
    completedBatches,
    totalBatches: job.totalBatches,
  };
}

type TaskListener = (status: BackgroundTaskStatus) => void;

class BackgroundQuestionService {
  private isGenerating = false;
  private isResuming = false;
  private currentTask: BackgroundTaskType | null = null;
  private listeners = new Set<TaskListener>();
  private currentMemoJob: MemoGenerationJob | null = null;
  private pauseRequested = false;
  private cancelRequested = false;

  public getStatus(): BackgroundTaskStatus {
    return {
      isGenerating: this.isGenerating,
      taskType: this.currentTask,
      memo: memoProgressFromJob(
        this.currentMemoJob,
        this.isGenerating && this.currentTask === "GEMINI_MEMO",
      ),
    };
  }

  public subscribe(listener: TaskListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const status = this.getStatus();
    this.listeners.forEach((listener) => {
      try {
        listener(status);
      } catch (e) {
        console.warn(
          "[BackgroundQuestionService] Listener execution error:",
          e,
        );
      }
    });
    void updateMemoForegroundNotification(status.memo);
  }

  private showToast(message: string) {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  }

  // ==========================================
  // 영속 작업 상태 관리 위임 (MemoJobService)
  // ==========================================

  public async getActiveJob(): Promise<MemoGenerationJob | null> {
    if (this.currentMemoJob) return this.currentMemoJob;
    return await MemoJobService.getActiveJob();
  }

  public async hydrateActiveJob(): Promise<MemoProgress | null> {
    const job = await MemoJobService.getActiveJob();
    if (!job) {
      this.currentMemoJob = null;
      this.notify();
      return null;
    }
    const validated = await this.crossValidateJobWithRepository(job);
    if (validated.status === "COMPLETED") {
      await this.clearActiveJob();
      this.currentMemoJob = null;
      this.notify();
      return null;
    }
    this.currentMemoJob = validated;
    this.notify();
    return memoProgressFromJob(
      validated,
      this.isGenerating && this.currentTask === "GEMINI_MEMO",
    );
  }

  public async saveActiveJob(job: MemoGenerationJob): Promise<void> {
    await MemoJobService.saveActiveJob(job);
  }

  public async clearActiveJob(): Promise<void> {
    await MemoJobService.clearActiveJob();
  }

  public async crossValidateJobWithRepository(
    job: MemoGenerationJob,
  ): Promise<MemoGenerationJob> {
    return await MemoJobService.crossValidateJobWithRepository(job);
  }

  // ==========================================
  // 프로그래밍 문제 백그라운드 생성
  // ==========================================

  public startProgrammingGeneration(): { started: boolean; message: string } {
    if (this.isGenerating) {
      return {
        started: false,
        message:
          "이미 백그라운드에서 문제 생성이 진행 중입니다. 잠시 후 다시 시도해 주세요.",
      };
    }

    this.isGenerating = true;
    this.currentTask = "PROGRAMMING";
    this.notify();

    (async () => {
      try {
        const result = await QuestionSyncService.syncQuestions();
        await QuestionSyncService.syncPendingAttempts();

        if (result.addedCount > 0) {
          triggerHaptic.success();
          this.showToast(
            `프로그래밍 문제 ${result.addedCount}개가 문제 보관함에 추가되었습니다.`,
          );
        } else {
          this.showToast("새 프로그래밍 문제를 추가하지 못했습니다.");
        }
      } catch (err: unknown) {
        console.error(
          "[BackgroundQuestionService] Programming generation error:",
          err,
        );
        this.showToast("프로그래밍 문제 생성 중 오류가 발생했습니다.");
      } finally {
        this.isGenerating = false;
        this.currentTask = null;
        this.notify();
      }
    })();

    return {
      started: true,
      message:
        "백그라운드에서 프로그래밍 변형 문제를 생성하고 있습니다.\n\n완료되면 문제 보관함에 자동 반영됩니다.",
    };
  }

  // ==========================================
  // Gemini AI 암기 문제 생성 (빈 챕터 우선, 영속 작업 + 배치별 즉시 커밋)
  // ==========================================
  public pauseMemoGeneration(): { ok: boolean; message: string } {
    if (!this.isGenerating || this.currentTask !== "GEMINI_MEMO") {
      return { ok: false, message: "진행 중인 암기 생성이 없습니다." };
    }
    this.pauseRequested = true;
    this.showToast("이번 묶음까지 저장한 뒤 멈춥니다.");
    return { ok: true, message: "이번 묶음까지 저장한 뒤 멈춥니다." };
  }

  public async cancelMemoGeneration(): Promise<{
    ok: boolean;
    message: string;
  }> {
    const job = this.currentMemoJob || (await this.getActiveJob());
    if (this.isGenerating && this.currentTask === "GEMINI_MEMO") {
      this.cancelRequested = true;
      this.pauseRequested = false;
      this.showToast("이번 묶음까지 넣은 뒤 중단합니다.");
      return { ok: true, message: "이번 묶음까지 넣은 뒤 중단합니다." };
    }
    if (job && (job.status === "PAUSED" || job.status === "IN_PROGRESS")) {
      const saved = savedCountFromJob(job);
      await this.clearActiveJob();
      this.currentMemoJob = null;
      this.notify();
      return {
        ok: true,
        message:
          saved > 0
            ? `중단했습니다. 이미 저장된 ${saved}문제는 보관함에 남습니다.`
            : "생성을 중단했습니다.",
      };
    }
    return { ok: false, message: "중단할 암기 생성이 없습니다." };
  }

  public async startOrEnqueueBulkGeneration(targetCount: number): Promise<{
    started: boolean;
    queued?: boolean;
    message: string;
    apiKeyRequired?: boolean;
  }> {
    const count = clampBulkCount(targetCount);
    const active =
      this.currentMemoJob ||
      (this.isGenerating || this.isResuming
        ? this.currentMemoJob
        : await MemoJobService.getActiveJob());

    if (active) {
      const job = await this.crossValidateJobWithRepository(active);
      this.currentMemoJob = job;
      const leftover =
        remainingFromJob(job) > 0 || queuedCountFromJob(job) > 0;
      if (
        leftover &&
        job.status !== "COMPLETED" &&
        (this.isGenerating ||
          this.isResuming ||
          job.status === "PAUSED" ||
          job.status === "IN_PROGRESS" ||
          job.status === "PARTIALLY_COMPLETED" ||
          job.status === "FAILED")
      ) {
        return this.enqueueOnJob(job, count);
      }
    }

    return this.startGeminiMemorizationGeneration(count);
  }

  private async enqueueOnJob(
    job: MemoGenerationJob,
    count: number,
  ): Promise<{
    started: boolean;
    queued?: boolean;
    message: string;
    apiKeyRequired?: boolean;
  }> {
    const remaining = remainingFromJob(job);
    const queued = queuedCountFromJob(job);
    if (remaining + queued + count > MEMO_BULK_MAX) {
      this.notify();
      return {
        started: false,
        message: `대기열 포함 최대 ${MEMO_BULK_MAX}개입니다. 지금은 남은 ${remaining}문제와 대기 ${queued}문제가 있습니다.`,
      };
    }
    job.queuedCounts = [...(job.queuedCounts || []), count];
    job.updatedAt = Date.now();
    this.currentMemoJob = job;
    await this.saveActiveJob(job);
    this.notify();
    return {
      started: true,
      queued: true,
      message: `${count}문제를 대기열에 넣었습니다. 지금 작업이 끝나면 이어서 만듭니다. (대기 ${queuedCountFromJob(job)}문제)`,
    };
  }

  public async startGeminiMemorizationGeneration(
    targetCount = MEMO_QUICK_TARGET,
  ): Promise<{
    started: boolean;
    queued?: boolean;
    message: string;
    apiKeyRequired?: boolean;
  }> {
    if (this.isGenerating || this.isResuming) {
      return {
        started: false,
        message:
          "이미 문제 생성이 진행 중입니다. 잠시 후 다시 시도해 주세요.",
      };
    }

    const existingJob = await MemoJobService.getActiveJob();
    if (existingJob) {
      const validated =
        await this.crossValidateJobWithRepository(existingJob);
      this.currentMemoJob = validated;

      if (validated.status === "PAUSED") {
        this.notify();
        return {
          started: false,
          message:
            "멈춘 생성이 있습니다. 이어서 만들거나 중단한 뒤 새로 시작해 주세요.",
        };
      }

      if (validated.status === "IN_PROGRESS") {
        const hasPending = validated.batches.some(
          (batch) => batch.status !== "COMPLETED",
        );
        if (hasPending && savedCountFromJob(validated) < jobTargetCount(validated)) {
          void this.resumePendingJob(true);
          return {
            started: true,
            message:
              "이전에 중단된 미완료 생성을 이어서 재개합니다. 완료 시 보관함에 자동 저장됩니다.",
          };
        }
      }
    }

    const apiKey = await GeminiService.getApiKey();
    if (!apiKey) {
      return {
        started: false,
        apiKeyRequired: true,
        message:
          "설정 탭에서 Gemini API Key를 등록하면 온라인으로 암기 문제를 생성할 수 있습니다.",
      };
    }

    const job = this.buildMemoJob(targetCount);
    this.pauseRequested = false;
    this.cancelRequested = false;
    this.currentMemoJob = job;
    this.isGenerating = true;
    this.currentTask = "GEMINI_MEMO";
    await this.saveActiveJob(job);
    this.notify();

    const launched = await this.launchMemoJob(job, false);

    const batchLabel =
      launched && targetCount >= MEMO_BULK_TARGET
        ? `알림이 켜진 채로 최대 ${targetCount}문제를 만듭니다. 홈 버튼을 누르거나 화면을 꺼도 계속 저장됩니다.`
        : targetCount >= MEMO_BULK_TARGET
          ? `최대 ${targetCount}문제를 만듭니다. 알림 권한이 없어 홈으로 나가면 멈출 수 있습니다.`
          : `빈 챕터를 먼저 골라 7문제씩 ${job.totalBatches}묶음(최대 ${targetCount}문제)을 만듭니다. 같은 정답·비슷한 지문은 넣지 않습니다.`;

    return { started: true, message: batchLabel };
  }

  private buildMemoJob(
    targetCount: number,
    queuedCounts: number[] = [],
  ): MemoGenerationJob {
    const totalBatches = memoBatchCountForTarget(targetCount);
    const all = QuestionRepository.getAll();
    const allSeeds = pickTopicSeeds(totalBatches * MEMO_BATCH_SIZE, all);
    const batches: MemoBatchState[] = Array.from(
      { length: totalBatches },
      (_, index) => ({
        batchIndex: index,
        seeds: allSeeds.slice(
          index * MEMO_BATCH_SIZE,
          (index + 1) * MEMO_BATCH_SIZE,
        ),
        status: "PENDING" as const,
        savedQuestionIds: [],
      }),
    ).filter((batch) => batch.seeds.length > 0);

    return {
      jobId: `MEMO_JOB_${Date.now()}_${targetCount}_${queuedCounts.length}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      totalBatches: batches.length,
      batchSize: MEMO_BATCH_SIZE,
      targetCount,
      queuedCounts,
      status: "IN_PROGRESS",
      batches,
    };
  }

  /**
   * 포그라운드 복귀나 앱 재실행 시 중단된 미완료 배치를 안전하게 이어받습니다.
   * 사용자가 멈춘(PAUSED) 작업은 강제 재개가 아니면 그대로 둡니다.
   */
  public async resumePendingJob(force = false): Promise<void> {
    if (this.isGenerating || this.isResuming) return;

    const activeJob = this.currentMemoJob || (await this.getActiveJob());
    if (!activeJob || activeJob.status === "COMPLETED") return;
    if (activeJob.status === "PAUSED" && !force) return;

    this.pauseRequested = false;
    this.cancelRequested = false;
    this.isResuming = true;
    this.isGenerating = true;
    this.currentTask = "GEMINI_MEMO";
    this.currentMemoJob = activeJob;
    this.notify();

    try {
      const job = await this.crossValidateJobWithRepository(activeJob);
      this.currentMemoJob = job;
      await this.launchMemoJob(job, true);
    } catch (err: unknown) {
      console.warn("[BackgroundQuestionService] resumePendingJob error:", err);
    } finally {
      this.isResuming = false;
      if (this.currentMemoJob?.status !== "IN_PROGRESS") {
        this.isGenerating = false;
        this.currentTask = null;
      }
      this.notify();
    }
  }

  private async launchMemoJob(
    job: MemoGenerationJob,
    waitIfInline: boolean,
  ): Promise<boolean> {
    const launched = await startMemoForegroundService(
      () => this.runMemoJob(job),
      memoProgressFromJob(job, true),
    );
    if (!launched) {
      if (waitIfInline) {
        await this.runMemoJob(job);
      } else {
        void this.runMemoJob(job);
      }
    }
    return launched;
  }

  private async runMemoJob(initialJob: MemoGenerationJob): Promise<void> {
    try {
      let job: MemoGenerationJob | null = initialJob;
      while (job) {
        const outcome = await this.executeMemoBatches(job);
        if (outcome !== "completed") break;

        const queue = [
          ...(this.currentMemoJob?.queuedCounts || job.queuedCounts || []),
        ];
        if (queue.length === 0 || this.cancelRequested || this.pauseRequested) {
          await this.clearActiveJob();
          this.currentMemoJob = null;
          break;
        }

        const nextTarget = queue.shift()!;
        const nextJob = this.buildMemoJob(nextTarget, queue);
        this.currentMemoJob = nextJob;
        await this.saveActiveJob(nextJob);
        this.notify();
        this.showToast(`대기열에서 ${nextTarget}문제를 이어서 만듭니다.`);
        job = nextJob;
      }
    } catch (err: unknown) {
      console.error(
        "[BackgroundQuestionService] Gemini memo generation error:",
        err,
      );
      const errMsg =
        err instanceof Error && /network|abort/i.test(err.message)
          ? "네트워크 연결이 일시 중단되었습니다. 화면을 켠 상태에서 다시 시도해 주세요."
          : "문제 생성 중 오류가 발생했습니다.";
      this.showToast(errMsg);
    } finally {
      this.pauseRequested = false;
      this.cancelRequested = false;
      this.isGenerating = false;
      this.currentTask = null;
      this.notify();
      void stopMemoForegroundService();
    }
  }

  private async executeMemoBatches(
    job: MemoGenerationJob,
  ): Promise<"completed" | "stopped"> {
    const existingStems = new Set(
      QuestionRepository.getAll().map((item) => normalizeStem(item.question)),
    );
    const target = jobTargetCount(job);

    for (let round = 0; round < MAX_MEMO_BATCH_ATTEMPTS; round++) {
      let processed = false;
      for (const batch of job.batches) {
        if (this.cancelRequested) break;
        if (this.pauseRequested) break;
        if (savedCountFromJob(job) >= target) break;
        if (shouldSkipMemoBatch(batch)) continue;

        processed = true;
        batch.status = "RUNNING";
        job.status = "IN_PROGRESS";
        await this.saveActiveJob(job);
        this.notify();

        const remaining = Math.max(0, target - savedCountFromJob(job));
        const bulk = target >= MEMO_BULK_TARGET;
        const result = await generateOneBatch(
          QuestionRepository.getAll(),
          existingStems,
          batch.seeds,
          `${job.jobId}_b${batch.batchIndex}`,
          {
            models: bulk ? BULK_GENERATOR_MODELS : GENERATOR_MODELS,
            maxRetries: bulk ? 3 : 1,
          },
        );

        if (this.cancelRequested && (!result.questions || result.questions.length === 0)) {
          batch.status = "FAILED";
          batch.error = "사용자 중단";
          batch.attemptCount = (batch.attemptCount || 0) + 1;
          await this.saveActiveJob(job);
          break;
        }

        if (result.questions && result.questions.length > 0) {
          const questions = result.questions.slice(
            0,
            remaining || result.questions.length,
          );
          await QuestionRepository.appendCachedQuestions(questions);
          const savedIds = recordBatchSaveResult(
            batch,
            questions.map((item) => item.id),
            new Set(QuestionRepository.existingIds(questions.map((item) => item.id))),
          );
          for (const question of questions) {
            if (savedIds.includes(question.id)) {
              existingStems.add(normalizeStem(question.question));
            }
          }

          triggerHaptic.selection();
          this.showToast(
            `AI 암기 ${savedCountFromJob(job)}/${target} 저장`,
          );
        } else {
          recordBatchSaveResult(batch, [], new Set());
          batch.error = result.error || batch.error || "문항 생성 실패";
        }

        await this.saveActiveJob(job);
        this.notify();
      }

      if (this.cancelRequested || this.pauseRequested) break;
      if (savedCountFromJob(job) >= target) break;
      if (!processed) {
        if (this.appendRefillBatches(job)) {
          continue;
        }
        break;
      }
    }

    const saved = savedCountFromJob(job);
    const shortage = Math.max(0, target - saved);

    if (this.cancelRequested) {
      await this.clearActiveJob();
      this.currentMemoJob = null;
      this.showToast(
        saved > 0
          ? `중단했습니다. ${saved}문제는 보관함에 남습니다.`
          : "생성을 중단했습니다.",
      );
      return "stopped";
    }

    if (this.pauseRequested && saved < target) {
      job.status = "PAUSED";
      await this.saveActiveJob(job);
      this.currentMemoJob = job;
      this.showToast(`${saved}/${target}에서 멈췄습니다. 이어서 만들 수 있습니다.`);
      return "stopped";
    }

    if (saved >= target) {
      job.status = "COMPLETED";
      this.currentMemoJob = job;
      triggerHaptic.success();
      this.showToast(`총 ${saved}개의 AI 암기 문제가 보관함에 반영되었습니다.`);
      return "completed";
    }

    job.status = saved > 0 ? "PARTIALLY_COMPLETED" : "FAILED";
    await this.saveActiveJob(job);
    this.currentMemoJob = job;
    this.showToast(
      saved > 0
        ? `${saved}/${target}개 저장됨. ${shortage}개 부족합니다. 이어서 다시 시도할 수 있습니다.`
        : "유효한 문제를 만들지 못했습니다. 잠시 후 다시 시도해 주세요.",
    );
    return "stopped";
  }

  private appendRefillBatches(job: MemoGenerationJob): boolean {
    if ((job.refillAttempts || 0) >= MAX_MEMO_JOB_REFILLS) return false;
    const remaining = remainingFromJob(job);
    if (remaining <= 0) return false;
    const extraCount = Math.min(
      memoBatchCountForTarget(remaining),
      Math.max(1, job.totalBatches),
    );
    const extraSeeds = pickTopicSeeds(
      extraCount * MEMO_BATCH_SIZE,
      QuestionRepository.getAll(),
    );
    if (extraSeeds.length === 0) return false;
    job.refillAttempts = (job.refillAttempts || 0) + 1;
    const startIndex = job.batches.length;
    const extraBatches = Array.from({ length: extraCount }, (_, offset) => ({
      batchIndex: startIndex + offset,
      seeds: extraSeeds.slice(
        offset * MEMO_BATCH_SIZE,
        (offset + 1) * MEMO_BATCH_SIZE,
      ),
      status: "PENDING" as const,
      savedQuestionIds: [],
      attemptCount: 0,
    })).filter((batch) => batch.seeds.length > 0);
    if (extraBatches.length === 0) return false;
    job.batches.push(...extraBatches);
    job.totalBatches = job.batches.length;
    job.status = "IN_PROGRESS";
    return true;
  }
}

export const backgroundQuestionService = new BackgroundQuestionService();
