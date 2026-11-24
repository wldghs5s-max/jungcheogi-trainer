import { create } from 'zustand';
import { LocalStorage, STORAGE_KEYS } from '../storage/localStorage';
import { CertificationType } from '../types/question';

interface SettingsState {
  isDarkMode: boolean;
  isHapticEnabled: boolean;
  selectedCertification: CertificationType | null;
  isSettingsLoaded: boolean;
  toggleDarkMode: () => Promise<void>;
  toggleHaptic: () => Promise<void>;
  setSelectedCertification: (cert: CertificationType | null) => Promise<void>;
  loadSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  isDarkMode: false,
  isHapticEnabled: true,
  selectedCertification: null,
  isSettingsLoaded: false,

  toggleDarkMode: async () => {
    const next = !get().isDarkMode;
    set({ isDarkMode: next });
    await LocalStorage.updateSettings({ isDarkMode: next });
  },

  toggleHaptic: async () => {
    const next = !get().isHapticEnabled;
    set({ isHapticEnabled: next });
    await LocalStorage.updateSettings({ isHapticEnabled: next });
  },

  setSelectedCertification: async (cert: CertificationType | null) => {
    set({ selectedCertification: cert, isSettingsLoaded: true });
    await LocalStorage.updateSettings({ selectedCertification: cert ?? undefined });
  },

  loadSettings: async () => {
    const settings = await LocalStorage.getItem<any>(STORAGE_KEYS.SETTINGS);
    const savedCert = settings?.selectedCertification;
    const validCert: CertificationType | null =
      savedCert === 'JUNGCHEOGI' || savedCert === 'SECURITY'
        ? savedCert
        : null;
    set({
      isDarkMode: settings?.isDarkMode ?? false,
      isHapticEnabled: settings?.isHapticEnabled ?? true,
      selectedCertification: validCert,
      isSettingsLoaded: true,
    });
  },
}));
