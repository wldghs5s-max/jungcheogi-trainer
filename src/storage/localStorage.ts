import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
  QUIZ_ATTEMPTS: "@quiz_attempts",
  BOOKMARKS: "@bookmarks",
  SETTINGS: "@settings",
  DAILY_LEARNING: "@daily_learning",
  CACHED_SERVER_QUESTIONS: "@cached_server_questions",
  OFFLINE_SYNC_QUEUE: "@offline_sync_queue",
  TUTOR_THREADS: "@tutor_threads",
} as const;

export class LocalStorage {
  static async getItem<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error(`Error reading ${key} from AsyncStorage:`, e);
      return null;
    }
  }

  static async setItem<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error writing ${key} to AsyncStorage:`, e);
    }
  }

  static async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error(`Error removing ${key} from AsyncStorage:`, e);
    }
  }
}
