import { create } from 'zustand';
import { LocalStorage, STORAGE_KEYS } from '../storage/localStorage';

interface UserState {
  nickname: string;
  dailyTarget: number;
  setDailyTarget: (target: number) => Promise<void>;
  loadUserSettings: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  nickname: '수험생',
  dailyTarget: 10,

  setDailyTarget: async (target: number) => {
    set({ dailyTarget: target });
    await LocalStorage.updateSettings({ dailyTarget: target });
  },

  loadUserSettings: async () => {
    const settings = await LocalStorage.getItem<any>(STORAGE_KEYS.SETTINGS);
    if (settings && settings.dailyTarget) {
      set({ dailyTarget: settings.dailyTarget });
    }
  },
}));
