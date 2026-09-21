import { Platform, ToastAndroid } from "react-native";
import { QuestionRepository } from "../repositories/questionRepository";
import { QuestionSyncService } from "../api/questionSyncService";
import { generateMemorizationQuestions } from "../api/geminiQuestionGenerator";
import { GeminiService } from "../api/geminiService";
import { triggerHaptic } from "../utils/haptics";

export type BackgroundTaskType = "PROGRAMMING" | "GEMINI_MEMO";

export interface BackgroundTaskStatus {
  isGenerating: boolean;
  taskType: BackgroundTaskType | null;
}

type TaskListener = (status: BackgroundTaskStatus) => void;

class BackgroundQuestionService {
  private isGenerating = false;
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

  /**
   * 프로그래밍(C/Java/Python) 문제 6개 백그라운드 비차단 생성
   */
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

    // Detached background execution with guaranteed finally lock release
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
        // ALWAYS release lock regardless of success or error (Checkpoint 3)
        this.isGenerating = false;
        this.currentTask = null;
        this.notify();
      }
    })();

    return {
      started: true,
      message:
        "백그라운드에서 프로그래밍 변형 문제를 생성하고 있습니다.\n\n앱을 완전히 닫지 마시고 다른 학습을 자유롭게 진행해 주세요. 완료되면 문제 보관함에 자동 반영됩니다.",
    };
  }

  /**
   * Gemini AI 암기 문제를 주제 시드 묶음으로 생성한다. 3.8이 막히면 3.5-flash로 내린다.
   */
  public async startGeminiMemorizationGeneration(): Promise<{
    started: boolean;
    message: string;
    apiKeyRequired?: boolean;
  }> {
    if (this.isGenerating) {
      return {
        started: false,
        message:
          "이미 백그라운드에서 문제 생성이 진행 중입니다. 잠시 후 다시 시도해 주세요.",
      };
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

    // Detached background execution with guaranteed finally lock release
    (async () => {
      try {
        const all = QuestionRepository.getAll();
        const result = await generateMemorizationQuestions(all);

        if (!result.ok) {
          this.showToast(`AI 암기 생성 실패: ${result.message}`);
          return;
        }

        const added = await QuestionRepository.appendCachedQuestions(
          result.questions,
        );
        if (added > 0) {
          triggerHaptic.success();
          this.showToast(
            `AI 암기 문제 ${added}개가 문제 보관함에 추가되었습니다.`,
          );
        } else {
          this.showToast("새로 추가된 AI 암기 문제가 없습니다.");
        }
      } catch (err: unknown) {
        console.error(
          "[BackgroundQuestionService] Gemini memo generation error:",
          err,
        );
        const errMsg = err instanceof Error ? err.message : "네트워크 오류";
        this.showToast(`AI 암기 생성 오류: ${errMsg}`);
      } finally {
        // ALWAYS release lock regardless of success or error (Checkpoint 3)
        this.isGenerating = false;
        this.currentTask = null;
        this.notify();
      }
    })();

    return {
      started: true,
      message:
        "지정 주제로 7문제씩 최대 2묶음을 만듭니다. 3.8이 막히면 3.5-flash로 바로 넘어갑니다.\n\n앱을 완전히 닫지 마시고 다른 학습을 자유롭게 진행해 주세요.",
    };
  }
}

export const backgroundQuestionService = new BackgroundQuestionService();
