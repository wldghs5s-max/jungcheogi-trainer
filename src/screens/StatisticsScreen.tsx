import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Award, CheckCircle2, TrendingUp, AlertOctagon } from 'lucide-react-native';
import { useSettingsStore } from '../store/settingsStore';
import { AttemptRepository } from '../repositories/attemptRepository';
import { calculateUserStats } from '../utils/statistics';
import { UserStats } from '../types/statistics';
import { COLORS } from '../utils/theme';
import { Header } from '../components/common/Header';
import { Card } from '../components/common/Card';
import { ProgressBar } from '../components/common/ProgressBar';

export const StatisticsScreen: React.FC = () => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const [stats, setStats] = useState<UserStats | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    const attempts = await AttemptRepository.getAllAttempts();
    const calculated = calculateUserStats(attempts);
    setStats(calculated);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const total = stats?.totalAttempts || 0;
  const correct = stats?.correctAttempts || 0;
  const rate = stats?.accuracyRate || 0;

  // 7일 중 최대 문제 수 (바 차트 높이 정규화용)
  const maxDayCount = Math.max(
    1,
    ...(stats?.last7DaysStats.map((d) => d.count) || [1])
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="학습 통계 및 분석" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} />}
      >
        {/* 핵심 3대 지표 카드 */}
        <View style={styles.kpiRow}>
          <Card style={styles.kpiCard}>
            <Text style={[styles.kpiLabel, { color: theme.subText }]}>총 풀이</Text>
            <Text style={[styles.kpiValue, { color: theme.primary }]}>{total}제</Text>
          </Card>
          <Card style={styles.kpiCard}>
            <Text style={[styles.kpiLabel, { color: theme.subText }]}>정답 수</Text>
            <Text style={[styles.kpiValue, { color: theme.correct }]}>{correct}제</Text>
          </Card>
          <Card style={styles.kpiCard}>
            <Text style={[styles.kpiLabel, { color: theme.subText }]}>평균 정답률</Text>
            <Text style={[styles.kpiValue, { color: theme.accent }]}>{rate}%</Text>
          </Card>
        </View>

        {/* 최근 7일 학습량 추이 바 차트 */}
        <Card style={styles.chartCard}>
          <View style={styles.cardHeader}>
            <TrendingUp size={18} color={theme.primary} />
            <Text style={[styles.cardTitle, { color: theme.text }]}>최근 7일 학습 추이</Text>
          </View>
          <View style={styles.chartContainer}>
            {stats?.last7DaysStats.map((item, idx) => {
              const barHeightPercent = Math.max(8, (item.count / maxDayCount) * 100);
              const isToday = idx === 6;

              return (
                <View key={item.date} style={styles.barColumn}>
                  <Text style={[styles.barCount, { color: theme.subText }]}>
                    {item.count > 0 ? item.count : ''}
                  </Text>
                  <View style={styles.barTrack}>
                    <View
                      style={[
                        styles.barFill,
                        {
                          height: `${barHeightPercent}%`,
                          backgroundColor: isToday ? theme.primary : theme.border,
                        },
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.barLabel,
                      {
                        color: isToday ? theme.primary : theme.subText,
                        fontWeight: isToday ? '700' : '400',
                      },
                    ]}
                  >
                    {item.date}
                  </Text>
                </View>
              );
            })}
          </View>
        </Card>

        {/* 과목별 정답률 분석 */}
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Award size={18} color={theme.primary} />
            <Text style={[styles.cardTitle, { color: theme.text }]}>과목별 정답률</Text>
          </View>

          {stats && Object.keys(stats.subjectStats).length > 0 ? (
            Object.values(stats.subjectStats).map((subj) => (
              <View key={subj.subject} style={styles.subjectRow}>
                <View style={styles.subjectTextRow}>
                  <Text style={[styles.subjectName, { color: theme.text }]}>{subj.subject}</Text>
                  <Text style={[styles.subjectRate, { color: theme.primary }]}>
                    {subj.rate}% ({subj.correct}/{subj.total})
                  </Text>
                </View>
                <ProgressBar
                  progress={subj.rate / 100}
                  height={8}
                  color={subj.rate >= 60 ? theme.primary : theme.wrong}
                />
              </View>
            ))
          ) : (
            <Text style={[styles.emptyNotice, { color: theme.subText }]}>
              문제를 풀면 과목별 정답률이 분석됩니다.
            </Text>
          )}
        </Card>

        {/* 취약 단원 분석 */}
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <AlertOctagon size={18} color={theme.wrong} />
            <Text style={[styles.cardTitle, { color: theme.text }]}>집중 보완 필요 단원</Text>
          </View>

          {stats && stats.weakCategories.length > 0 ? (
            stats.weakCategories.map((weak) => (
              <View key={weak.category} style={styles.weakRow}>
                <View style={styles.weakBadge}>
                  <Text style={[styles.weakText, { color: theme.wrong }]}>{weak.category}</Text>
                </View>
                <Text style={[styles.weakRate, { color: theme.subText }]}>
                  정답률 <Text style={{ color: theme.wrong, fontWeight: '700' }}>{weak.rate}%</Text> ({weak.total}문제 중 {Math.round((weak.total * weak.rate) / 100)}정답)
                </Text>
              </View>
            ))
          ) : (
            <Text style={[styles.emptyNotice, { color: theme.subText }]}>
              {total > 0
                ? '축하합니다! 현재 70% 미만의 취약 단원이 없습니다.'
                : '문제를 풀면 취약한 단원을 자동으로 찾아냅니다.'}
            </Text>
          )}
        </Card>
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
    paddingBottom: 30,
  },
  kpiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  kpiCard: {
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    paddingVertical: 14,
  },
  kpiLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  kpiValue: {
    fontSize: 18,
    fontWeight: '900',
  },
  chartCard: {
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 130,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 15,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  barCount: {
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 4,
  },
  barTrack: {
    width: 14,
    height: 80,
    justifyContent: 'flex-end',
    borderRadius: 7,
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: 7,
  },
  barLabel: {
    fontSize: 11,
    marginTop: 6,
  },
  card: {
    padding: 16,
    marginBottom: 12,
  },
  subjectRow: {
    marginVertical: 8,
  },
  subjectTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  subjectName: {
    fontSize: 14,
    fontWeight: '600',
  },
  subjectRate: {
    fontSize: 13,
    fontWeight: '700',
  },
  weakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.04)',
  },
  weakBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  weakText: {
    fontSize: 13,
    fontWeight: '700',
  },
  weakRate: {
    fontSize: 13,
  },
  emptyNotice: {
    fontSize: 13,
    paddingVertical: 10,
    textAlign: 'center',
  },
});
