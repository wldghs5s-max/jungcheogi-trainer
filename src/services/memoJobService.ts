import { QuestionRepository } from "../repositories/questionRepository";
import { LocalStorage, STORAGE_KEYS } from "../storage/localStorage";
import { MemoBatchState, MemoGenerationJob } from "../types/generationJob";

export const MAX_MEMO_BATCH_ATTEMPTS = 3;
export const MAX_MEMO_JOB_REFILLS = 2;

export class MemoJobService {
  static async getActiveJob(): Promise<MemoGenerationJob | null> {
    try {
      return await LocalStorage.getItem<MemoGenerationJob>(
        STORAGE_KEYS.MEMO_GENERATION_ACTIVE_JOB,
      );
    } catch {
      return null;
    }
  }

  static async saveActiveJob(job: MemoGenerationJob): Promise<void> {
    try {
      job.updatedAt = Date.now();
      await LocalStorage.setItem(
        STORAGE_KEYS.MEMO_GENERATION_ACTIVE_JOB,
        job,
      );
    } catch (e) {
      console.warn("[MemoJobService] saveActiveJob error:", e);
    }
  }

  static async clearActiveJob(): Promise<void> {
    try {
      await LocalStorage.removeItem(STORAGE_KEYS.MEMO_GENERATION_ACTIVE_JOB);
    } catch (e) {
      console.warn("[MemoJobService] clearActiveJob error:", e);
    }
  }

  /**
   * 진실의 원천(Single Source of Truth) 원칙에 따라 QuestionRepository 실제 데이터를 대조하여
   * 앱 비정상 종료 등으로 인한 Job 상태 불일치를 자동 보정합니다.
   */
  static async crossValidateJobWithRepository(
    job: MemoGenerationJob,
  ): Promise<MemoGenerationJob> {
    await QuestionRepository.loadCachedServerQuestions();
    const allQuestions = QuestionRepository.getAll();
    reconcileMemoJobWithQuestions(job, allQuestions);
    return job;
  }
}

export function jobTargetCount(job: MemoGenerationJob): number {
  return job.targetCount || job.totalBatches * job.batchSize;
}

export function existingSavedIdsForBatch(
  job: MemoGenerationJob,
  batch: MemoBatchState,
  allQuestions: { id: string }[],
): string[] {
  const repoIds = new Set(allQuestions.map((item) => item.id));
  const prefix = `GEMINI_MEMO_${job.jobId}_b${batch.batchIndex}_`;
  const fromPrefix = allQuestions
    .filter((item) => item.id.startsWith(prefix))
    .map((item) => item.id);
  const fromRecorded = (batch.savedQuestionIds || []).filter((id) =>
    repoIds.has(id),
  );
  return [...new Set([...fromPrefix, ...fromRecorded])];
}

export function savedCountFromJob(job: MemoGenerationJob): number {
  return job.batches.reduce(
    (sum, batch) => sum + (batch.savedQuestionIds?.length || 0),
    0,
  );
}

export function queuedCountFromJob(job: MemoGenerationJob): number {
  return (job.queuedCounts || []).reduce((sum, count) => sum + count, 0);
}

export function remainingFromJob(job: MemoGenerationJob): number {
  return Math.max(0, jobTargetCount(job) - savedCountFromJob(job));
}

export function shouldSkipMemoBatch(batch: MemoBatchState): boolean {
  if ((batch.savedQuestionIds?.length || 0) > 0 && batch.status === "COMPLETED") {
    return true;
  }
  return (batch.attemptCount || 0) >= MAX_MEMO_BATCH_ATTEMPTS;
}

export function isLeftoverMemoJob(
  job: MemoGenerationJob | null,
): job is MemoGenerationJob {
  return !!job && job.status !== "COMPLETED";
}

export function prepareMemoJobForResume(job: MemoGenerationJob): MemoGenerationJob {
  for (const batch of job.batches) {
    if ((batch.savedQuestionIds?.length || 0) > 0) continue;
    batch.attemptCount = 0;
    if (batch.status === "FAILED" || batch.status === "RUNNING") {
      batch.status = "PENDING";
      delete batch.error;
    }
  }
  if (
    remainingFromJob(job) > 0 &&
    !job.batches.some((batch) => !shouldSkipMemoBatch(batch))
  ) {
    job.refillAttempts = Math.max(0, (job.refillAttempts || 0) - 1);
  }
  return job;
}

export function leftoverProgressMessage(
  saved: number,
  target: number,
  reason?: string,
): string {
  const base =
    saved <= 0
      ? "지금은 새 문제를 만들지 못했습니다. 잠시 후 [이어서]를 눌러 주세요."
      : `지금은 ${saved}문제까지 넣어 두었습니다. [이어서]를 누르면 나머지를 계속 만듭니다.`;
  if (!reason) return base;
  return `${base}\n(${reason})`;
}

export function cancelJobUserMessage(saved: number): string {
  return saved > 0
    ? `그만뒀습니다. 이미 만든 ${saved}문제는 그대로 둡니다.`
    : "만들기를 그만뒀습니다.";
}

export function recordBatchSaveResult(
  batch: MemoBatchState,
  requestedIds: string[],
  existingIds: Set<string>,
): string[] {
  const savedIds = requestedIds.filter((id) => existingIds.has(id));
  batch.savedQuestionIds = savedIds;
  batch.attemptCount = (batch.attemptCount || 0) + 1;
  batch.completedAt = Date.now();
  if (savedIds.length > 0) {
    batch.status = "COMPLETED";
    delete batch.error;
  } else if (batch.attemptCount >= MAX_MEMO_BATCH_ATTEMPTS) {
    batch.status = "FAILED";
    batch.error = "저장되지 않음 (시도 한도)";
  } else {
    batch.status = "FAILED";
    batch.error = "저장되지 않음";
  }
  return savedIds;
}

export function reconcileMemoJobWithQuestions(
  job: MemoGenerationJob,
  allQuestions: { id: string }[],
): MemoGenerationJob {
  for (const batch of job.batches) {
    batch.savedQuestionIds = existingSavedIdsForBatch(job, batch, allQuestions);
    if (batch.savedQuestionIds.length > 0) {
      batch.status = "COMPLETED";
      continue;
    }
    if (batch.status === "COMPLETED") {
      batch.status =
        (batch.attemptCount || 0) >= MAX_MEMO_BATCH_ATTEMPTS
          ? "FAILED"
          : "PENDING";
    }
  }

  const saved = savedCountFromJob(job);
  const target = jobTargetCount(job);
  const retryable = job.batches.some((batch) => !shouldSkipMemoBatch(batch));

  if (saved >= target && queuedCountFromJob(job) === 0) {
    job.status = "COMPLETED";
  } else if (saved >= target) {
    job.status = "IN_PROGRESS";
  } else if (retryable) {
    if (job.status === "COMPLETED") job.status = "IN_PROGRESS";
  } else if (saved > 0) {
    job.status = "PARTIALLY_COMPLETED";
  } else if (job.status === "COMPLETED") {
    job.status = "FAILED";
  }

  return job;
}
