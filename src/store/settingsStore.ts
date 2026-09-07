import { create } from 'zustand';
import { LocalStorage, STORAGE_KEYS } from '../storage/localStorage';

interface SettingsState {
  isDarkMode: boolean;
  isHapticEnabled: boolean;
  toggleDarkMode: () => Promise<void>;
  toggleHaptic: () => Promise<void>;
  loadSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  isDarkMode: false,
  isHapticEnabled: true,

  toggleDarkMode: async () => {
    const next = !get().isDarkMode;
    set({ isDarkMode: next });
    const settings = (await LocalStorage.getItem<any>(STORAGE_KEYS.SETTINGS)) || {};
    settings.isDarkMode = next;
    await LocalStorage.setItem(STORAGE_KEYS.SETTINGS, settings);
  },

  toggleHaptic: async () => {
    const next = !get().isHapticEnabled;
    set({ isHapticEnabled: next });
    const settings = (await LocalStorage.getItem<any>(STORAGE_KEYS.SETTINGS)) || {};
    settings.isHapticEnabled = next;
    await LocalStorage.setItem(STORAGE_KEYS.SETTINGS, settings);
  },

  loadSettings: async () => {
    const settings = await LocalStorage.getItem<any>(STORAGE_KEYS.SETTINGS);
    if (settings) {
      set({
        isDarkMode: settings.isDarkMode ?? false,
        isHapticEnabled: settings.isHapticEnabled ?? true,
      });
    }
  },
}));
