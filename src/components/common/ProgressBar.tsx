import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSettingsStore } from '../../store/settingsStore';
import { COLORS } from '../../utils/theme';

interface ProgressBarProps {
  progress: number; // 0 ~ 1
  height?: number;
  color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  color,
}) => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const clamped = Math.max(0, Math.min(1, progress));

  return (
    <View style={[styles.track, { height, backgroundColor: theme.surfaceSecondary, borderRadius: height / 2 }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${clamped * 100}%`,
            height,
            backgroundColor: color || theme.primary,
            borderRadius: height / 2,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
