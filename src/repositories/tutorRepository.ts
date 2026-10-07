import { LocalStorage, STORAGE_KEYS } from "../storage/localStorage";

export interface TutorChatMessage {
  id: string;
  role: "user" | "tutor";
  text: string;
}

export interface TutorThread {
  questionId: string;
  messages: TutorChatMessage[];
  updatedAt: string;
}

export class TutorRepository {
  static async getAll(): Promise<Record<string, TutorThread>> {
    const stored = await LocalStorage.getItem<Record<string, TutorThread>>(
      STORAGE_KEYS.TUTOR_THREADS,
    );
    return stored || {};
  }

  static async getThread(
    questionId: string,
    attemptId?: string,
  ): Promise<TutorThread | null> {
    const all = await this.getAll();
    if (attemptId) {
      return all[`${questionId}::${attemptId}`] || null;
    }
    return all[questionId] || null;
  }

  static async saveThread(
    questionId: string,
    messages: TutorChatMessage[],
    attemptId?: string,
  ): Promise<void> {
    const all = await this.getAll();
    const updatedAt = new Date().toISOString();

    if (attemptId) {
      all[`${questionId}::${attemptId}`] = {
        questionId,
        messages,
        updatedAt,
      };
    }

    // Always update questionId root key with the latest explanation for backward compatibility (e.g. WrongNoteScreen)
    all[questionId] = {
      questionId,
      messages,
      updatedAt,
    };
    await LocalStorage.setItem(STORAGE_KEYS.TUTOR_THREADS, all);
  }

  static async getQuestionIdsWithHistory(): Promise<string[]> {
    const all = await this.getAll();
    return Object.keys(all).filter(
      (id) => !id.includes("::") && (all[id]?.messages.length || 0) > 0,
    );
  }
}
