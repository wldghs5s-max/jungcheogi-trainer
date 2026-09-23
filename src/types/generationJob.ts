import { MemoTopicSeed } from "../data/memoTopicSeeds";

export type MemoBatchStatus = "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";

export interface MemoBatchState {
  batchIndex: number;
  seeds: MemoTopicSeed[];
  status: MemoBatchStatus;
  savedQuestionIds: string[];
  error?: string;
  completedAt?: number;
}

export type MemoJobStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "PARTIALLY_COMPLETED"
  | "FAILED";

export interface MemoGenerationJob {
  jobId: string;
  createdAt: number;
  updatedAt: number;
  totalBatches: number;
  batchSize: number;
  status: MemoJobStatus;
  batches: MemoBatchState[];
}
