import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
  QUIZ_ATTEMPTS: "@quiz_attempts",
  BOOKMARKS: "@bookmarks",
  SETTINGS: "@settings",
  DAILY_LEARNING: "@daily_learning",
  CACHED_SERVER_QUESTIONS: "@cached_server_questions",
  OFFLINE_SYNC_QUEUE: "@offline_sync_queue",
  TUTOR_THREADS: "@tutor_threads",
  PROGRAMMING_RECENT_FINGERPRINTS: "@programming_recent_fingerprints",
  PROGRAMMING_RECENT_TOPICS: "@programming_recent_topics",
} as const;

export interface IStorageAdapter {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  clear?(): Promise<void>;
}

export class MemoryStorageAdapter implements IStorageAdapter {
  private store = new Map<string, string>();

  async getItem(key: string): Promise<string | null> {
    return this.store.get(key) ?? null;
  }

  async setItem(key: string, value: string): Promise<void> {
    this.store.set(key, value);
  }

  async removeItem(key: string): Promise<void> {
    this.store.delete(key);
  }

  async clear(): Promise<void> {
    this.store.clear();
  }
}

export class AsyncStorageAdapter implements IStorageAdapter {
  async getItem(key: string): Promise<string | null> {
    return await AsyncStorage.getItem(key);
  }

  async setItem(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
  }

  async removeItem(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }
}

function isNodeEnv(): boolean {
  return (
    typeof process !== "undefined" &&
    process.versions != null &&
    process.versions.node != null &&
    typeof window === "undefined"
  );
}

export class LocalStorage {
  private static adapter: IStorageAdapter = isNodeEnv()
    ? new MemoryStorageAdapter()
    : new AsyncStorageAdapter();

  /**
   * 저장소 어댑터를 교체합니다 (테스트용 인메모리 주입 등).
   */
  static setAdapter(adapter: IStorageAdapter): void {
    this.adapter = adapter;
  }

  /**
   * 현재 설정된 어댑터를 가져옵니다.
   */
  static getAdapter(): IStorageAdapter {
    return this.adapter;
  }

  static async getItem<T>(key: string): Promise<T | null> {
    const raw = await this.adapter.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      // JSON 파싱 실패 시 원본 문자열 그대로 반환 (하위 호환 및 일반 문자열 키 보존)
      return raw as unknown as T;
    }
  }

  static async setItem<T>(key: string, value: T): Promise<void> {
    const serialized = JSON.stringify(value);
    await this.adapter.setItem(key, serialized);
  }

  static async removeItem(key: string): Promise<void> {
    await this.adapter.removeItem(key);
  }
}

