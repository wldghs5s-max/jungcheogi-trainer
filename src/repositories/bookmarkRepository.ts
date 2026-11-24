import { LocalStorage, STORAGE_KEYS } from '../storage/localStorage';
import { Bookmark } from '../types/bookmark';
import { CertificationType } from '../types/question';
import { resolveAttemptCertification } from './attemptRepository';

export class BookmarkRepository {
  /**
   * 북마크 목록을 가져옵니다. certification이 지정되면 해당 자격증 북마크만 반환합니다.
   */
  static async getAll(certification?: CertificationType): Promise<Bookmark[]> {
    const bookmarks =
      (await LocalStorage.getItem<Bookmark[]>(STORAGE_KEYS.BOOKMARKS)) || [];
    if (!certification) {
      return bookmarks;
    }
    return bookmarks.filter(
      (b) => resolveAttemptCertification(b) === certification,
    );
  }

  /**
   * 특정 문제가 북마크되어 있는지 확인합니다.
   */
  static async isBookmarked(questionId: string): Promise<boolean> {
    const bookmarks = await this.getAll();
    return bookmarks.some((b) => b.questionId === questionId);
  }

  /**
   * 북마크를 토글하고, 토글 후 상태(true=추가됨, false=삭제됨)를 반환합니다.
   */
  static async toggle(questionId: string): Promise<boolean> {
    const bookmarks = await this.getAll();
    const index = bookmarks.findIndex((b) => b.questionId === questionId);

    if (index >= 0) {
      // 제거
      bookmarks.splice(index, 1);
      await LocalStorage.setItem(STORAGE_KEYS.BOOKMARKS, bookmarks);
      return false;
    } else {
      // 추가
      bookmarks.unshift({
        questionId,
        certification: resolveAttemptCertification({ questionId }),
        createdAt: new Date().toISOString(),
      });
      await LocalStorage.setItem(STORAGE_KEYS.BOOKMARKS, bookmarks);
      return true;
    }
  }

  /**
   * 북마크된 문제 ID 목록만 반환합니다.
   */
  static async getBookmarkedQuestionIds(
    certification?: CertificationType,
  ): Promise<string[]> {
    const bookmarks = await this.getAll(certification);
    return bookmarks.map((b) => b.questionId);
  }

  static async clearByCertification(
    certification: CertificationType,
  ): Promise<void> {
    const all = await this.getAll();
    const remaining = all.filter(
      (b) => resolveAttemptCertification(b) !== certification,
    );
    await LocalStorage.setItem(STORAGE_KEYS.BOOKMARKS, remaining);
  }

  static async clearAll(): Promise<void> {
    await LocalStorage.removeItem(STORAGE_KEYS.BOOKMARKS);
  }
}
