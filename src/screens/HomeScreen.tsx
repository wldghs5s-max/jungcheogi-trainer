import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";
import {
  Flame,
  Zap,
  ChevronRight,
  AlertTriangle,
  BookOpen,
  Layers,
  CloudDownload,
} from "lucide-react-native";
import { useSettingsStore } from "../store/settingsStore";
import { useUserStore } from "../store/userStore";
import { useQuizStore } from "../store/quizStore";
import { AttemptRepository } from "../repositories/attemptRepository";
import { QuestionRepository } from "../repositories/questionRepository";
import { QuestionSyncService } from "../api/questionSyncService";
import { calculateUserStats } from "../utils/statistics";
import { triggerHaptic } from "../utils/haptics";
import { UserStats } from "../types/statistics";
import { Subject, Question } from "../types/question";
import { SUBJECTS } from "../data/questions";
import { COLORS } from "../utils/theme";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { ProgressBar } from "../components/common/ProgressBar";
import { Badge } from "../components/common/Badge";

interface HomeScreenProps {
  onStartQuiz: (questions: Question[], title: string) => void;
  onGoWrongNote: () => void;
  onGoStats: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartQuiz,
  onGoWrongNote,
  onGoStats,
}) => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? COLORS.dark : COLORS.light;
  const { dailyTarget, loadUserSettings } = useUserStore();

  const [stats, setStats] = useState<UserStats | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [totalQuestionsCount, setTotalQuestionsCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  const loadData = useCallback(async () => {
    await loadUserSettings();
    await QuestionRepository.loadCachedServerQuestions();
    const all = QuestionRepository.getAll();
    setTotalQuestionsCount(all.length);

    const attempts = await AttemptRepository.getAllAttempts();
    const calculated = calculateUserStats(attempts);
    setStats(calculated);
  }, [loadUserSettings]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSyncQuestions = async () => {
    setIsSyncing(true);
    triggerHaptic.selection();
    const result = await QuestionSyncService.syncQuestions();
    await QuestionSyncService.syncPendingAttempts(); // 오프라인 큐도 전송
    await loadData();
    setIsSyncing(false);

    if (result.addedCount > 0) {
      triggerHaptic.success();
      Alert.alert(
        "동기화 완료",
        `🎉 새로운 기출 ${result.addedCount}문제를 서버에서 성공적으로 내려받았습니다! (총 ${QuestionRepository.getAll().length}문제 보유)`,
      );
    } else {
      triggerHaptic.selection();
      Alert.alert(
        "동기화 완료",
        `이미 최신 문제 상태입니다. (총 ${QuestionRepository.getAll().length}문제 보유)`,
      );
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await QuestionSyncService.syncQuestions();
    await loadData();
    setRefreshing(false);
  };

  // 5분 퀵 퀴즈 시작 (5문제 조합)
  const handleStartQuickQuiz = async () => {
    const wrongIds = await AttemptRepository.getWrongQuestionIds("recent");
    const weakCats = stats?.weakCategories.map((c) => c.category) || [];
    const quickQuestions = QuestionRepository.getQuickQuizQuestions(
      5,
      wrongIds,
      weakCats,
    );
    onStartQuiz(quickQuestions, "지하철 5분 퀵 퀴즈");
  };

  // 과목별 학습 시작
  const handleStartSubjectQuiz = (subject: Subject) => {
    const questions = QuestionRepository.getBySubject(subject);
    onStartQuiz(questions, subject);
  };

  const todayCount = stats?.todaySolvedCount || 0;
  const targetProgress = dailyTarget > 0 ? todayCount / dailyTarget : 0;
  const streak = stats?.streakDays || 0;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* 상단 브랜드 헤더 */}
      <View
        style={[
          styles.header,
          { backgroundColor: theme.surface, borderBottomColor: theme.border },
        ]}
      >
        <View>
          <Text style={[styles.appTitle, { color: theme.primary }]}>
            정처기 실기 트레이너
          </Text>
          <Text style={[styles.appSubtitle, { color: theme.subText }]}>
            출퇴근 지하철 10분 합격 프로젝트
          </Text>
        </View>
        <View
          style={[styles.streakBadge, { backgroundColor: theme.accentLight }]}
        >
          <Flame size={18} color="#EF4444" fill="#EF4444" />
          <Text style={[styles.streakText, { color: theme.accent }]}>
            {streak}일 연속
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
          />
        }
      >
        {/* 오늘의 학습 목표 카드 */}
        <Card style={styles.todayCard}>
          <View style={styles.todayHeader}>
            <Text style={[styles.todayTitle, { color: theme.text }]}>
              오늘의 학습 목표
            </Text>
            <Text style={[styles.todayCount, { color: theme.primary }]}>
              {todayCount} / {dailyTarget} 문제
            </Text>
          </View>
          <ProgressBar
            progress={targetProgress}
            height={10}
            color={theme.primary}
          />
          <Text style={[styles.todayNotice, { color: theme.subText }]}>
            {todayCount >= dailyTarget
              ? "🎉 오늘의 목표를 모두 달성했습니다! 훌륭해요!"
              : `목표까지 ${dailyTarget - todayCount}문제 남았습니다. 힘내세요!`}
          </Text>
        </Card>

        {/* 5분 퀵 퀴즈 배너 */}
        <TouchableOpacity activeOpacity={0.85} onPress={handleStartQuickQuiz}>
          <Card
            style={[
              styles.quickCard,
              { backgroundColor: theme.primary, borderColor: theme.primary },
            ]}
          >
            <View style={styles.quickLeft}>
              <View style={styles.quickIconBox}>
                <Zap size={24} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.quickTitle}>지하철 5분 퀵 퀴즈</Text>
                <Text style={styles.quickDesc}>
                  최근 오답 + 취약 단원 엄선 5문제
                </Text>
              </View>
            </View>
            <ChevronRight size={22} color="#FFFFFF" />
          </Card>
        </TouchableOpacity>

        {/* 취약 단원 분석 배너 (취약 단원이 있는 경우) */}
        {stats && stats.weakCategories.length > 0 && (
          <Card style={styles.weakCard} onPress={onGoStats}>
            <View style={styles.weakHeader}>
              <View style={styles.weakTitleRow}>
                <AlertTriangle size={18} color={theme.wrong} />
                <Text style={[styles.weakTitle, { color: theme.text }]}>
                  집중 보완이 필요한 취약 단원
                </Text>
              </View>
              <ChevronRight size={18} color={theme.mutedText} />
            </View>
            <View style={styles.weakTags}>
              {stats.weakCategories.slice(0, 3).map((w, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.weakTagItem,
                    { backgroundColor: theme.wrongLight },
                  ]}
                >
                  <Text style={[styles.weakTagName, { color: theme.wrong }]}>
                    {w.category} ({w.rate}%)
                  </Text>
                </View>
              ))}
            </View>
          </Card>
        )}

        {/* 클라우드 신규 문제 동기화 배너 */}
        <Card style={styles.syncCard}>
          <View style={styles.syncRow}>
            <View
              style={[
                styles.syncIconBox,
                { backgroundColor: theme.primaryLight },
              ]}
            >
              <CloudDownload size={20} color={theme.primary} />
            </View>
            <View style={styles.syncInfo}>
              <Text style={[styles.syncTitle, { color: theme.text }]}>
                클라우드 최신 문제 동기화
              </Text>
              <Text style={[styles.syncSub, { color: theme.subText }]}>
                현재 보유:{" "}
                <Text style={{ color: theme.primary, fontWeight: "700" }}>
                  {totalQuestionsCount}문제
                </Text>{" "}
                (오프라인 보관 중)
              </Text>
            </View>
            <Button
              title={isSyncing ? "동기화 중..." : "신규 확인"}
              variant="outline"
              loading={isSyncing}
              onPress={handleSyncQuestions}
              style={styles.syncBtn}
              textStyle={{ fontSize: 12 }}
            />
          </View>
        </Card>

        {/* 과목별 문제 풀이 섹션 */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            과목별 집중 학습
          </Text>
          <Text style={[styles.sectionSub, { color: theme.subText }]}>
            단원별 완벽 대비
          </Text>
        </View>

        {SUBJECTS.map((subject) => {
          const count = QuestionRepository.getBySubject(subject).length;
          const stat = stats?.subjectStats[subject];
          const rate = stat ? stat.rate : null;

          return (
            <Card
              key={subject}
              style={styles.subjectCard}
              onPress={() => handleStartSubjectQuiz(subject)}
            >
              <View style={styles.subjectRow}>
                <View
                  style={[
                    styles.subjectIconBox,
                    { backgroundColor: theme.primaryLight },
                  ]}
                >
                  <BookOpen size={20} color={theme.primary} />
                </View>
                <View style={styles.subjectInfo}>
                  <Text style={[styles.subjectName, { color: theme.text }]}>
                    {subject}
                  </Text>
                  <Text style={[styles.subjectCount, { color: theme.subText }]}>
                    총 {count}문제{" "}
                    {rate !== null ? `· 정답률 ${rate}%` : "· 미풀이"}
                  </Text>
                </View>
                <ChevronRight size={20} color={theme.mutedText} />
              </View>
            </Card>
          );
        })}

        {/* 하단 퀵 액션 카드 (오답노트 바로가기) */}
        <Card style={styles.wrongNoteActionCard} onPress={onGoWrongNote}>
          <View style={styles.wrongNoteActionRow}>
            <View
              style={[
                styles.wrongIconBox,
                { backgroundColor: theme.surfaceSecondary },
              ]}
            >
              <Layers size={20} color={theme.primary} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.wrongActionTitle, { color: theme.text }]}>
                오답노트 & 북마크
              </Text>
              <Text style={[styles.wrongActionDesc, { color: theme.subText }]}>
                틀렸던 문제와 북마크한 문제를 모아서 회독하세요
              </Text>
            </View>
            <ChevronRight size={20} color={theme.mutedText} />
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  appSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  streakText: {
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 4,
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  todayCard: {
    padding: 18,
    marginBottom: 12,
  },
  todayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  todayTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  todayCount: {
    fontSize: 15,
    fontWeight: "800",
  },
  todayNotice: {
    fontSize: 12,
    marginTop: 10,
  },
  quickCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginVertical: 6,
  },
  quickLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  quickIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  quickTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  quickDesc: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.85)",
    marginTop: 2,
  },
  weakCard: {
    padding: 16,
    marginVertical: 6,
  },
  weakHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  weakTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  weakTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 6,
  },
  weakTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  weakTagItem: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
    marginTop: 4,
  },
  weakTagName: {
    fontSize: 12,
    fontWeight: "600",
  },
  sectionHeader: {
    marginTop: 18,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
  },
  sectionSub: {
    fontSize: 12,
    marginTop: 2,
  },
  subjectCard: {
    marginVertical: 4,
    padding: 16,
  },
  subjectRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  subjectIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 15,
    fontWeight: "700",
  },
  subjectCount: {
    fontSize: 12,
    marginTop: 3,
  },
  wrongNoteActionCard: {
    marginTop: 14,
    padding: 16,
  },
  wrongNoteActionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  wrongIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  wrongActionTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  wrongActionDesc: {
    fontSize: 12,
    marginTop: 2,
  },
  syncCard: {
    padding: 14,
    marginVertical: 6,
  },
  syncRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  syncIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  syncInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  syncTitle: {
    fontSize: 14,
    fontWeight: "700",
  },
  syncSub: {
    fontSize: 12,
    marginTop: 2,
  },
  syncBtn: {
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});
