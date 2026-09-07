import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSettingsStore } from '../../store/settingsStore';
import { COLORS } from '../../utils/theme';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'danger' | 'accent' | 'default';
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'default' }) => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getColors = () => {
    switch (variant) {
      case 'primary':
        return { bg: theme.primaryLight, text: theme.primary };
      case 'success':
        return { bg: theme.correctLight, text: theme.correct };
      case 'danger':
        return { bg: theme.wrongLight, text: theme.wrong };
      case 'accent':
        return { bg: theme.accentLight, text: theme.accent };
      default:
        return { bg: theme.surfaceSecondary, text: theme.subText };
    }
  };

  const { bg, text } = getColors();

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color: text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});
