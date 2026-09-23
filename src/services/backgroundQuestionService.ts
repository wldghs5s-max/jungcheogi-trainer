import { Platform, ToastAndroid } from "react-native";
import { QuestionRepository } from "../repositories/questionRepository";
import { QuestionSyncService } from "../api/questionSyncService";
import {
  generateOneBatch,
  normalizeStem,
  MEMO_BATCH_SIZE,
  MEMO_BATCH_COUNT,
} from "../api/geminiQuestionGenerator";
import { GeminiService } from "../api/geminiService";
import { pickTopicSeeds } from "../data/memoTopicSeeds";
import { triggerHaptic } from "../utils/haptics";
import {
  MemoGenerationJob,
  MemoBatchState,
} from "../types/generationJob";
import { MemoJobService } from "./memoJobService";

export type BackgroundTaskType = "PROGRAMMING" | "GEMINI_MEMO";

export interface BackgroundTaskStatus {
  isGenerating: boolean;
  taskType: BackgroundTaskType | null;
}

type TaskListener = (status: BackgroundTaskStatus) => void;

class BackgroundQuestionService {
  private isGenerating = false;
  private isResuming = false;
  private currentTask: BackgroundTaskType | null = null;
  private listeners = new Set<TaskListener>();

  public getStatus(): BackgroundTaskStatus {
    return {
      isGenerating: this.isGenerating,
      taskType: this.currentTask,
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
    return await MemoJobService.getActiveJob();
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
  // Gemini AI 암기 문제 생성 (영속 작업 + 배치별 즉시 커밋)
  // ==========================================

  public async startGeminiMemorizationGeneration(): Promise<{
    started: boolean;
    message: string;
    apiKeyRequired?: boolean;
  }> {
    // 1. 메모리 락 검사
    if (this.isGenerating || this.isResuming) {
      return {
        started: false,
        message:
          "이미 문제 생성이 진행 중입니다. 잠시 후 다시 시도해 주세요.",
      };
    }

    // 2. 영속 Job 검사 (진행 중인 미완료 작업이 있다면 이어받기 안내)
    const existingJob = await this.getActiveJob();
    if (existingJob && existingJob.status === "IN_PROGRESS") {
      const validated = await this.crossValidateJobWithRepository(existingJob);
      const hasPending = validated.batches.some((b) => b.status !== "COMPLETED");
      if (hasPending) {
        void this.resumePendingJob();
        return {
          started: true,
          message:
            "이전에 중단된 미완료 생성을 이어서 재개합니다. 완료 시 보관함에 자동 저장됩니다.",
        };
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

    this.isGenerating = true;
    this.currentTask = "GEMINI_MEMO";
    this.notify();

    const jobId = `MEMO_JOB_${Date.now()}`;
    const all = QuestionRepository.getAll();
    const allSeeds = pickTopicSeeds(
      MEMO_BATCH_SIZE * MEMO_BATCH_COUNT,
      all,
    );

    const batches: MemoBatchState[] = Array.from(
      { length: MEMO_BATCH_COUNT },
      (_, index) => ({
        batchIndex: index,
        seeds: allSeeds.slice(
          index * MEMO_BATCH_SIZE,
          (index + 1) * MEMO_BATCH_SIZE,
        ),
        status: "PENDING" as const,
        savedQuestionIds: [],
      }),
    ).filter((b) => b.seeds.length > 0);

    const job: MemoGenerationJob = {
      jobId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      totalBatches: batches.length,
      batchSize: MEMO_BATCH_SIZE,
      status: "IN_PROGRESS",
      batches,
    };

    await this.saveActiveJob(job);

    // 백그라운드 순차 배치 실행 (배치 완료 즉시 영구 저장)
    (async () => {
      let totalAddedCount = 0;
      try {
        const existingStems = new Set(
          QuestionRepository.getAll().map((item) => normalizeStem(item.question)),
        );

        for (let i = 0; i < job.batches.length; i++) {
          const batch = job.batches[i];
          if (batch.status === "COMPLETED") continue;

          batch.status = "RUNNING";
          await this.saveActiveJob(job);

          const result = await generateOneBatch(
            QuestionRepository.getAll(),
            existingStems,
            batch.seeds,
            `${job.jobId}_b${batch.batchIndex}`,
          );

          if (result.questions && result.questions.length > 0) {
            // 배치 완료 즉시 스토리지에 원자적(Atomic) 영구 저장
            const added = await QuestionRepository.appendCachedQuestions(
              result.questions,
            );
            batch.status = "COMPLETED";
            batch.savedQuestionIds = result.questions.map((q) => q.id);
            batch.completedAt = Date.now();
            totalAddedCount += added;

            triggerHaptic.selection();
            this.showToast(
              `AI 암기 ${batch.batchIndex + 1}차(${result.questions.length}개) 저장 완료`,
            );
          } else {
            batch.status = "FAILED";
            batch.error = result.error || "문항 생성 실패";
          }

          await this.saveActiveJob(job);
        }

        const completedCount = job.batches.filter(
          (b) => b.status === "COMPLETED",
        ).length;
        if (completedCount === job.batches.length) {
          job.status = "COMPLETED";
          await this.clearActiveJob();
        } else if (completedCount > 0) {
          job.status = "PARTIALLY_COMPLETED";
          await this.saveActiveJob(job);
        } else {
          job.status = "FAILED";
          await this.saveActiveJob(job);
        }

        if (totalAddedCount > 0) {
          triggerHaptic.success();
          this.showToast(
            `총 ${totalAddedCount}개의 AI 암기 문제가 보관함에 반영되었습니다.`,
          );
        } else {
          this.showToast("유효한 문제를 생성하지 못했습니다. 잠시 후 다시 시도해 주세요.");
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
        this.isGenerating = false;
        this.currentTask = null;
        this.notify();
      }
    })();

    return {
      started: true,
      message:
        `주제 시드로 7문제씩 2묶음(총 14문제)을 순차 생성합니다.\n\n각 묶음 완료 즉시 보관함에 안전하게 저장되며, 화면 전환 시에도 이미 완료된 묶음은 안전하게 보존됩니다.`,
    };
  }

  /**
   * 포그라운드 복귀나 앱 재실행 시 중단된 미완료 배치를 안전하게 이어받습니다.
   * 이미 저장된 배치는 100% 건너뛰고 미완료 배치만 순차 처리합니다.
   */
  public async resumePendingJob(): Promise<void> {
    if (this.isGenerating || this.isResuming) return;

    const activeJob = await this.getActiveJob();
    if (!activeJob || activeJob.status === "COMPLETED") return;

    this.isResuming = true;
    this.isGenerating = true;
    this.currentTask = "GEMINI_MEMO";
    this.notify();

    try {
      const job = await this.crossValidateJobWithRepository(activeJob);
      const pendingBatches = job.batches.filter((b) => b.status !== "COMPLETED");

      if (pendingBatches.length === 0) {
        job.status = "COMPLETED";
        await this.clearActiveJob();
        return;
      }

      const existingStems = new Set(
        QuestionRepository.getAll().map((item) => normalizeStem(item.question)),
      );

      let resumedAdded = 0;
      for (const batch of pendingBatches) {
        batch.status = "RUNNING";
        await this.saveActiveJob(job);

        const result = await generateOneBatch(
          QuestionRepository.getAll(),
          existingStems,
          batch.seeds,
          `${job.jobId}_b${batch.batchIndex}`,
        );

        if (result.questions && result.questions.length > 0) {
          const added = await QuestionRepository.appendCachedQuestions(
            result.questions,
          );
          batch.status = "COMPLETED";
          batch.savedQuestionIds = result.questions.map((q) => q.id);
          batch.completedAt = Date.now();
          resumedAdded += added;

          this.showToast(
            `AI 암기 잔여 ${batch.batchIndex + 1}차(${result.questions.length}개) 저장 완료`,
          );
        } else {
          batch.status = "FAILED";
          batch.error = result.error || "재개 실패";
        }
        await this.saveActiveJob(job);
      }

      const allCompleted = job.batches.every((b) => b.status === "COMPLETED");
      if (allCompleted) {
        job.status = "COMPLETED";
        await this.clearActiveJob();
      }

      if (resumedAdded > 0) {
        triggerHaptic.success();
        this.showToast(
          `미완료 문제 ${resumedAdded}개가 보관함에 추가 반영되었습니다.`,
        );
      }
    } catch (err: unknown) {
      console.warn("[BackgroundQuestionService] resumePendingJob error:", err);
    } finally {
      this.isResuming = false;
      this.isGenerating = false;
      this.currentTask = null;
      this.notify();
    }
  }
}

export const backgroundQuestionService = new BackgroundQuestionService();
