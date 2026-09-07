import { LocalStorage, STORAGE_KEYS } from './localStorage';

export interface SyncQueueItem {
  id: string;
  attemptId: string;
  createdAt: string;
  retryCount: number;
  status: 'PENDING' | 'FAILED';
}

export class SyncQueueService {
  static async getQueue(): Promise<SyncQueueItem[]> {
    const items = await LocalStorage.getItem<SyncQueueItem[]>(STORAGE_KEYS.OFFLINE_SYNC_QUEUE);
    return items || [];
  }

  static async enqueue(attemptId: string): Promise<void> {
    const queue = await this.getQueue();
    // 중복 방지
    if (queue.some((item) => item.attemptId === attemptId)) return;

    queue.push({
      id: `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      attemptId,
      createdAt: new Date().toISOString(),
      retryCount: 0,
      status: 'PENDING',
    });

    await LocalStorage.setItem(STORAGE_KEYS.OFFLINE_SYNC_QUEUE, queue);
  }

  static async remove(id: string): Promise<void> {
    const queue = await this.getQueue();
    const filtered = queue.filter((item) => item.id !== id);
    await LocalStorage.setItem(STORAGE_KEYS.OFFLINE_SYNC_QUEUE, filtered);
  }

  static async clear(): Promise<void> {
    await LocalStorage.removeItem(STORAGE_KEYS.OFFLINE_SYNC_QUEUE);
  }
}
