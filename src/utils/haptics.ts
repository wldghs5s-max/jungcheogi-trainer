import * as Haptics from 'expo-haptics';
import { useSettingsStore } from '../store/settingsStore';

export const triggerHaptic = {
  selection: async () => {
    if (!useSettingsStore.getState().isHapticEnabled) return;
    try {
      await Haptics.selectionAsync();
    } catch (_) {}
  },
  success: async () => {
    if (!useSettingsStore.getState().isHapticEnabled) return;
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (_) {}
  },
  error: async () => {
    if (!useSettingsStore.getState().isHapticEnabled) return;
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } catch (_) {}
  },
  impact: async () => {
    if (!useSettingsStore.getState().isHapticEnabled) return;
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (_) {}
  },
};
