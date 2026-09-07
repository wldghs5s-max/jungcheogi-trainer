import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { useSettingsStore } from '../../store/settingsStore';
import { COLORS } from '../../utils/theme';
import { CodeLanguage } from '../../types/question';

interface CodeViewerProps {
  code: string;
  language?: CodeLanguage;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ code, language }) => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const lines = code.trim().split('\n');

  return (
    <View style={[styles.container, { backgroundColor: theme.codeBackground }]}>
      {language && (
        <View style={styles.headerBar}>
          <Text style={styles.languageText}>{language}</Text>
        </View>
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.codeContainer}>
          {lines.map((line, index) => (
            <View key={index} style={styles.lineRow}>
              <Text style={styles.lineNumber}>{index + 1}</Text>
              <Text style={[styles.codeText, { color: theme.codeText }]}>{line}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginVertical: 12,
    overflow: 'hidden',
  },
  headerBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  languageText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
  },
  codeContainer: {
    padding: 12,
  },
  lineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1.5,
  },
  lineNumber: {
    width: 28,
    fontSize: 13,
    color: '#64748B',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    textAlign: 'right',
    marginRight: 12,
    userSelect: 'none',
  },
  codeText: {
    fontSize: 13.5,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    lineHeight: 20,
  },
});
