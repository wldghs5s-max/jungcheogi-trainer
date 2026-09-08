import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import { Moon, Vibrate, Target, Trash2, Smartphone, ShieldCheck, Cloud, Sparkles, Key, Check } from 'lucide-react-native';
import { useSettingsStore } from '../store/settingsStore';
import { useUserStore } from '../store/userStore';
import { AttemptRepository } from '../repositories/attemptRepository';
import { BookmarkRepository } from '../repositories/bookmarkRepository';
import { SyncQueueService } from '../storage/syncQueue';
import { GeminiService } from '../api/geminiService';
import { triggerHaptic } from '../utils/haptics';
import { COLORS } from '../utils/theme';
import { Header } from '../components/common/Header';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const SettingsScreen: React.FC = () => {
  const { isDarkMode, isHapticEnabled, toggleDarkMode, toggleHaptic } = useSettingsStore();
  const { dailyTarget, setDailyTarget } = useUserStore();
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const [apiKeyInput, setApiKeyInput] = useState('');
  const [hasSavedKey, setHasSavedKey] = useState(false);
  const [testingKey, setTestingKey] = useState(false);

  useEffect(() => {
    GeminiService.getApiKey().then((key) => {
      if (key) {
        setApiKeyInput(key);
        setHasSavedKey(true);
      }
    });
  }, []);

  const handleToggleDark = () => {
    triggerHaptic.selection();
    toggleDarkMode();
  };

  const handleToggleHaptic = () => {
    triggerHaptic.selection();
    toggleHaptic();
  };

  const handleSetTarget = (target: number) => {
    triggerHaptic.selection();
    setDailyTarget(target);
  };

  const handleSaveApiKey = async () => {
    triggerHaptic.selection();
    const cleanKey = apiKeyInput.trim();
    if (!cleanKey) {
      await GeminiService.saveApiKey('');
      setHasSavedKey(false);
      Alert.alert('알림', 'Gemini API Key가 삭제되었습니다.');
      return;
    }

    setTestingKey(true);
    const testResult = await GeminiService.testConnection(cleanKey);
    setTestingKey(false);

    if (testResult.success) {
      await GeminiService.saveApiKey(cleanKey);
      setHasSavedKey(true);
      triggerHaptic.success();
      Alert.alert(
        '연결 성공 & 등록 완료! 🎉',
        `Gemini API와 정상적으로 연동되었습니다! (${testResult.model})\n\n이제 문제 풀이 중 [Gemini 1:1 AI 튜터] 버튼을 눌러 실시간 맞춤 과외를 받으실 수 있습니다.`
      );
    } else {
      Alert.alert(
        'API Key 검증 실패 ⚠️',
        `구글 서버에서 키를 인증하지 못했습니다.\n\n오류 내용:\n${testResult.message}\n\n그래도 저장하시겠습니까?`,
        [
          { text: '다시 확인', style: 'cancel' },
          {
            text: '강제 저장',
            onPress: async () => {
              await GeminiService.saveApiKey(cleanKey);
              setHasSavedKey(true);
              Alert.alert('저장 완료', 'API Key가 저장되었습니다.');
            },
          },
        ]
      );
    }
  };

  const handleResetData = () => {
    triggerHaptic.impact();
    Alert.alert(
      '학습 기록 초기화',
      '모든 문제 풀이 이력, 북마크, 대기 중인 동기화 큐가 삭제됩니다. 계속하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '초기화',
          style: 'destructive',
          onPress: async () => {
            await AttemptRepository.clearAll();
            await BookmarkRepository.clearAll();
            await SyncQueueService.clear();
            Alert.alert('완료', '학습 이력이 초기화되었습니다.');
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="설정" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Gemini AI 튜터 설정 카드 */}
        <Card style={styles.card}>
          <View style={styles.targetHeader}>
            <Sparkles size={20} color={theme.accent} />
            <Text style={[styles.sectionTitle, { color: theme.text, marginLeft: 8 }]}>
              Gemini AI 튜터 설정
            </Text>
          </View>
          <Text style={[styles.targetSub, { color: theme.subText }]}>
            구글 AI Studio에서 발급한 키를 등록하세요. AIza... 레거시 키와 AQ. 로 시작하는 최신 인증키 모두 지원합니다.
          </Text>

          <View style={styles.apiKeyRow}>
            <View style={[styles.keyInputBox, { backgroundColor: theme.surfaceSecondary, borderColor: theme.border }]}>
              <Key size={16} color={theme.mutedText} style={{ marginRight: 8 }} />
              <TextInput
                style={[styles.keyInput, { color: theme.text }]}
                placeholder="AIza... 또는 AQ... (API Key)"
                placeholderTextColor={theme.mutedText}
                value={apiKeyInput}
                onChangeText={setApiKeyInput}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <Button
              title={testingKey ? '확인 중...' : hasSavedKey ? '검증/저장' : '등록'}
              variant="primary"
              disabled={testingKey}
              onPress={handleSaveApiKey}
              style={styles.keySaveBtn}
              textStyle={{ fontSize: 13 }}
            />
          </View>

          {hasSavedKey && (
            <View style={styles.keyStatusRow}>
              <Check size={14} color={theme.correct} />
              <Text style={[styles.keyStatusText, { color: theme.correct }]}>
                API Key가 정상 등록되어 1:1 튜터가 활성화되었습니다.
              </Text>
            </View>
          )}
        </Card>

        {/* 화면 및 사용자 설정 */}
        <Card style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>앱 환경 설정</Text>

          {/* 다크 모드 */}
          <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
            <View style={styles.settingLeft}>
              <Moon size={20} color={theme.primary} />
              <Text style={[styles.settingLabel, { color: theme.text }]}>다크 모드</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={handleToggleDark}
              trackColor={{ false: '#D1D5DB', true: theme.primary }}
            />
          </View>

          {/* 햅틱 진동 */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Vibrate size={20} color={theme.primary} />
              <Text style={[styles.settingLabel, { color: theme.text }]}>햅틱 진동 피드백</Text>
            </View>
            <Switch
              value={isHapticEnabled}
              onValueChange={handleToggleHaptic}
              trackColor={{ false: '#D1D5DB', true: theme.primary }}
            />
          </View>
        </Card>

        {/* 일일 목표 설정 */}
        <Card style={styles.card}>
          <View style={styles.targetHeader}>
            <Target size={20} color={theme.primary} />
            <Text style={[styles.sectionTitle, { color: theme.text, marginLeft: 8 }]}>
              일일 학습 목표
            </Text>
          </View>
          <Text style={[styles.targetSub, { color: theme.subText }]}>
            매일 지하철에서 풀 목표 문제 수를 선택하세요.
          </Text>

          <View style={styles.targetButtons}>
            {[5, 10, 20].map((t) => {
              const isSelected = dailyTarget === t;
              return (
                <TouchableOpacity
                  key={t}
                  onPress={() => handleSetTarget(t)}
                  style={[
                    styles.targetBtn,
                    {
                      backgroundColor: isSelected ? theme.primary : theme.surfaceSecondary,
                      borderColor: isSelected ? theme.primary : theme.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.targetBtnText,
                      { color: isSelected ? '#FFFFFF' : theme.text },
                    ]}
                  >
                    하루 {t}제
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Card>

        {/* 클라우드 동기화 정보 */}
        <Card style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>클라우드 문제 동기화</Text>
          <View style={[styles.infoRow, { borderBottomColor: theme.border }]}>
            <View style={styles.infoLeft}>
              <Cloud size={18} color={theme.primary} />
              <Text style={[styles.infoLabel, { color: theme.subText }]}>서버 상태</Text>
            </View>
            <Text style={[styles.infoValue, { color: theme.subText }]}>로컬 오프라인 모드</Text>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <ShieldCheck size={18} color={theme.subText} />
              <Text style={[styles.infoLabel, { color: theme.subText }]}>오프라인 보안 캐시</Text>
            </View>
            <Text style={[styles.infoValue, { color: theme.text }]}>지하철 100% 자동 저장</Text>
          </View>
        </Card>

        {/* 기기 및 앱 정보 */}
        <Card style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>앱 정보</Text>
          <View style={[styles.infoRow, { borderBottomColor: theme.border }]}>
            <View style={styles.infoLeft}>
              <Smartphone size={18} color={theme.subText} />
              <Text style={[styles.infoLabel, { color: theme.subText }]}>지원 기기</Text>
            </View>
            <Text style={[styles.infoValue, { color: theme.text }]}>갤럭시 S26 울트라 맞춤</Text>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <ShieldCheck size={18} color={theme.subText} />
              <Text style={[styles.infoLabel, { color: theme.subText }]}>앱 버전</Text>
            </View>
            <Text style={[styles.infoValue, { color: theme.text }]}>1.2.0 (Gemini AI 튜터 탑재)</Text>
          </View>
        </Card>

        {/* 데이터 초기화 */}
        <TouchableOpacity style={styles.dangerButton} onPress={handleResetData}>
          <Trash2 size={16} color={theme.wrong} />
          <Text style={[styles.dangerText, { color: theme.wrong }]}>학습 기록 전체 초기화</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    padding: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },
  apiKeyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  keyInputBox: {
    flex: 1,
    height: 44,
    borderWidth: 1.5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginRight: 8,
  },
  keyInput: {
    flex: 1,
    fontSize: 13,
  },
  keySaveBtn: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  keyStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  keyStatusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 15,
    marginLeft: 10,
    fontWeight: '500',
  },
  targetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  targetSub: {
    fontSize: 13,
    marginTop: 2,
    marginBottom: 12,
  },
  targetButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  targetBtn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  targetBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    marginLeft: 8,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginTop: 10,
  },
  dangerText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
});
