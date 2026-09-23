import { QuestionRepository } from "../repositories/questionRepository";
import { LocalStorage, STORAGE_KEYS } from "../storage/localStorage";
import { MemoGenerationJob } from "../types/generationJob";
import { MEMO_MIN_ACCEPTABLE_BATCH_QUESTIONS } from "../api/geminiQuestionGenerator";

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

    let allCompleted = true;
    for (const batch of job.batches) {
      const prefix = `GEMINI_MEMO_${job.jobId}_b${batch.batchIndex}_`;
      const existingInRepo = allQuestions.filter((q) => q.id.startsWith(prefix));

      if (existingInRepo.length >= MEMO_MIN_ACCEPTABLE_BATCH_QUESTIONS) {
        batch.status = "COMPLETED";
        batch.savedQuestionIds = existingInRepo.map((q) => q.id);
      } else if (batch.status !== "COMPLETED") {
        allCompleted = false;
      }
    }

    if (allCompleted) {
      job.status = "COMPLETED";
    }

    return job;
  }
}
