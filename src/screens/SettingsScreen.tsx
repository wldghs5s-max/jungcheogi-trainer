import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { Moon, Vibrate, Target, Trash2, Smartphone, ShieldCheck, Cloud } from 'lucide-react-native';
import { useSettingsStore } from '../store/settingsStore';
import { useUserStore } from '../store/userStore';
import { AttemptRepository } from '../repositories/attemptRepository';
import { triggerHaptic } from '../utils/haptics';
import { COLORS } from '../utils/theme';
import { Header } from '../components/common/Header';
import { Card } from '../components/common/Card';

export const SettingsScreen: React.FC = () => {
  const { isDarkMode, isHapticEnabled, toggleDarkMode, toggleHaptic } = useSettingsStore();
  const { dailyTarget, setDailyTarget } = useUserStore();
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

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

  const handleResetData = () => {
    triggerHaptic.impact();
    Alert.alert(
      '학습 기록 초기화',
      '모든 문제 풀이 이력과 통계가 삭제됩니다. 계속하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '초기화',
          style: 'destructive',
          onPress: async () => {
            await AttemptRepository.clearAll();
            Alert.alert('완료', '학습 이력이 초기화되었습니다.');
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="설정" />

      <View style={styles.content}>
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
            <Text style={[styles.infoValue, { color: theme.correct }]}>스마트 동기화 연결됨</Text>
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
            <Text style={[styles.infoValue, { color: theme.text }]}>1.0.0 (온라인 자동 동기화 에디션)</Text>
          </View>
        </Card>

        {/* 데이터 초기화 */}
        <TouchableOpacity style={styles.dangerButton} onPress={handleResetData}>
          <Trash2 size={16} color={theme.wrong} />
          <Text style={[styles.dangerText, { color: theme.wrong }]}>학습 기록 전체 초기화</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
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
    marginBottom: 14,
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
