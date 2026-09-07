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
    const settings = (await LocalStorage.getItem<any>(STORAGE_KEYS.SETTINGS)) || {};
    settings.dailyTarget = target;
    await LocalStorage.setItem(STORAGE_KEYS.SETTINGS, settings);
  },

  loadUserSettings: async () => {
    const settings = await LocalStorage.getItem<any>(STORAGE_KEYS.SETTINGS);
    if (settings && settings.dailyTarget) {
      set({ dailyTarget: settings.dailyTarget });
    }
  },
}));
