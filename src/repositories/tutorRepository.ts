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

  static async getThread(questionId: string): Promise<TutorThread | null> {
    const all = await this.getAll();
    return all[questionId] || null;
  }

  static async saveThread(
    questionId: string,
    messages: TutorChatMessage[],
  ): Promise<void> {
    const all = await this.getAll();
    all[questionId] = {
      questionId,
      messages,
      updatedAt: new Date().toISOString(),
    };
    await LocalStorage.setItem(STORAGE_KEYS.TUTOR_THREADS, all);
  }

  static async getQuestionIdsWithHistory(): Promise<string[]> {
    const all = await this.getAll();
    return Object.keys(all).filter((id) => (all[id]?.messages.length || 0) > 0);
  }
}
