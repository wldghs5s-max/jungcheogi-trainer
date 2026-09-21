import React, { useEffect, useState, useCallback, useRef } from "react";
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
  Sparkles,
  HelpCircle,
  RotateCcw,
  GraduationCap,
  CheckCircle2,
  Filter,
  CopyMinus,
} from "lucide-react-native";
import { useSettingsStore } from "../store/settingsStore";
import { useUserStore } from "../store/userStore";
import { AttemptRepository } from "../repositories/attemptRepository";
import { QuestionRepository } from "../repositories/questionRepository";
import { backgroundQuestionService } from "../services/backgroundQuestionService";
import { calculateUserStats } from "../utils/statistics";
import { getDueReviewQuestionIds } from "../utils/reviewQueue";
import { triggerHaptic } from "../utils/haptics";
import { UserStats } from "../types/statistics";
import { Subject, Question } from "../types/question";
import { SUBJECTS } from "../data/questions";
import { COLORS } from "../utils/theme";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { ProgressBar } from "../components/common/ProgressBar";

interface HomeScreenProps {
  onStartQuiz: (questions: Question[], title: string) => void;
  onGoWrongNote: () => void;
  onGoStats: () => void;
  onGoTheory?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartQuiz,
  onGoWrongNote,
  onGoStats,
  onGoTheory,
}) => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? COLORS.dark : COLORS.light;
  const { dailyTarget, loadUserSettings } = useUserStore();

  const [stats, setStats] = useState<UserStats | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [totalQuestionsCount, setTotalQuestionsCount] = useState(0);
  const [duplicateCount, setDuplicateCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isGeminiGenerating, setIsGeminiGenerating] = useState(false);
  const [examYear, setExamYear] = useState<number | null>(null);
  const [examRound, setExamRound] = useState<number | null>(null);
  const [unknownQuestions, setUnknownQuestions] = useState<Question[]>([]);
  const [reviewQuestions, setReviewQuestions] = useState<Question[]>([]);
  // 안 푼 문제 필터링 상태
  const [onlyUnsolved, setOnlyUnsolved] = useState(false);
  const [attemptedQuestionIds, setAttemptedQuestionIds] = useState<Set<string>>(
    new Set(),
  );

  const examYears = QuestionRepository.getExamYears();
  const examRounds = QuestionRepository.getExamRounds(examYear ?? undefined);

  const loadData = useCallback(async () => {
    await loadUserSettings();
    await QuestionRepository.loadCachedServerQuestions();
    const all = QuestionRepository.getAll();
    setTotalQuestionsCount(all.length);
    setDuplicateCount(QuestionRepository.countCachedDuplicates());

    const attempts = await AttemptRepository.getAllAttempts();
    const calculated = calculateUserStats(attempts);
    setStats(calculated);

    const attemptedIds = await AttemptRepository.getAttemptedQuestionIds();
    setAttemptedQuestionIds(attemptedIds);

    const unknownIds = await AttemptRepository.getUnknownQuestionIds();
    setUnknownQuestions(QuestionRepository.getByIds(unknownIds));

    const dueIds = getDueReviewQuestionIds(attempts, 10);
    setReviewQuestions(QuestionRepository.getByIds(dueIds));
  }, [loadUserSettings]);

  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // 백그라운드 문제 생성 상태 구독 및 자동 화면 갱신 (메모리 릭 방지)
  useEffect(() => {
    const initialStatus = backgroundQuestionService.getStatus();
    setIsSyncing(
      initialStatus.isGenerating && initialStatus.taskType === "PROGRAMMING",
    );
    setIsGeminiGenerating(
      initialStatus.isGenerating && initialStatus.taskType === "GEMINI_MEMO",
    );

    const unsubscribe = backgroundQuestionService.subscribe((status) => {
      if (isMountedRef.current) {
        setIsSyncing(status.isGenerating && status.taskType === "PROGRAMMING");
        setIsGeminiGenerating(
          status.isGenerating && status.taskType === "GEMINI_MEMO",
        );
        if (!status.isGenerating) {
          void loadData();
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [loadData]);

  const handleSyncQuestions = () => {
    triggerHaptic.selection();
    const res = backgroundQuestionService.startProgrammingGeneration();
    if (res.started) {
      Alert.alert("백그라운드 문제 생성", res.message);
    } else {
      Alert.alert("알림", res.message);
    }
  };

  const handleGeminiMemoGenerate = async () => {
    triggerHaptic.selection();
    const res =
      await backgroundQuestionService.startGeminiMemorizationGeneration();
    if (res.started) {
      Alert.alert("백그라운드 AI 암기 생성", res.message);
    } else if (res.apiKeyRequired) {
      Alert.alert("API Key 필요", res.message);
    } else {
      Alert.alert("알림", res.message);
    }
  };

  const handleRemoveDuplicates = () => {
    triggerHaptic.selection();
    const pending = QuestionRepository.countCachedDuplicates();
    if (pending === 0) {
      Alert.alert("중복 문항 삭제", "지문이 같은 중복 문항이 없습니다.");
      return;
    }

    Alert.alert(
      "중복 문항 삭제",
      `지문이 같은 문제 ${pending}개를 보관함에서 삭제합니다. 앱에 들어 있는 기본 기출은 그대로 둡니다.`,
      [
        { text: "취소", style: "cancel" },
        {
          text: "삭제",
          style: "destructive",
          onPress: async () => {
            const removed =
              await QuestionRepository.removeDuplicateCachedQuestions();
            await loadData();
            Alert.alert(
              "중복 문항 삭제",
              removed > 0
                ? `중복 ${removed}개를 삭제했습니다.`
                : "삭제할 중복 문항이 없습니다.",
            );
          },
        },
      ],
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
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

  // 안 푼 문제만 모아서 10문제 퀵 퀴즈 시작
  const handleStartUnsolvedQuickQuiz = () => {
    triggerHaptic.selection();
    const unsolved =
      QuestionRepository.getUnsolvedQuestions(attemptedQuestionIds);
    if (unsolved.length === 0) {
      Alert.alert(
        "모든 문제 풀이 완료",
        "보유 중인 모든 문제를 최소 1번 이상 풀었습니다! 🎉\n오답노트나 과목별 전체 문제로 복습해 보세요.",
      );
      return;
    }
    const selected = QuestionRepository.shuffle(unsolved).slice(0, 10);
    onStartQuiz(selected, "안 푼 문제 10선 퀵 퀴즈");
  };

  const startOrAlert = (
    questions: Question[],
    title: string,
    emptyMessage: string,
  ) => {
    if (questions.length === 0) {
      Alert.alert("문제 없음", emptyMessage);
      return;
    }
    onStartQuiz(questions, title);
  };

  const handleStartSubjectQuiz = (subject: Subject) => {
    const filterLabel = [
      examYear ? `${examYear}년` : null,
      examRound ? `${examRound}회` : null,
    ]
      .filter(Boolean)
      .join(" ");

    // 안 푼 문제만 보기 모드일 때
    if (onlyUnsolved) {
      const unsolvedQuestions = QuestionRepository.getUnsolvedQuestions(
        attemptedQuestionIds,
        subject,
        examYear,
        examRound,
      );

      if (unsolvedQuestions.length === 0) {
        Alert.alert(
          "모든 문제 풀이 완료",
          `'${subject}' 과목의 문제를 이미 모두 풀었습니다! 🎉\n전체 문제를 다시 복습하시겠습니까?`,
          [
            { text: "취소", style: "cancel" },
            {
              text: "전체 문제 복습",
              onPress: () => {
                const allQuestions = QuestionRepository.shuffle(
                  QuestionRepository.filterByExam(
                    QuestionRepository.getBySubject(subject),
                    examYear,
                    examRound,
                  ),
                );
                startOrAlert(
                  allQuestions,
                  filterLabel
                    ? `${subject} · ${filterLabel} (전체 복습)`
                    : `${subject} (전체 복습)`,
                  "이 과목 문제가 아직 없습니다.",
                );
              },
            },
          ],
        );
        return;
      }

      startOrAlert(
        QuestionRepository.shuffle(unsolvedQuestions),
        filterLabel
          ? `${subject} · ${filterLabel} (안 푼 문제)`
          : `${subject} (안 푼 문제)`,
        "안 푼 문제가 없습니다.",
      );
      return;
    }

    // 일반 전체 문제 풀이
    const questions = QuestionRepository.shuffle(
      QuestionRepository.filterByExam(
        QuestionRepository.getBySubject(subject),
        examYear,
        examRound,
      ),
    );
    startOrAlert(
      questions,
      filterLabel ? `${subject} · ${filterLabel}` : subject,
      examYear || examRound
        ? "선택한 연도/회차에 해당하는 문제가 없습니다. 필터를 바꿔 보세요."
        : "이 과목 문제가 아직 없습니다.",
    );
  };

  const handleStartWeakCategory = (category: string) => {
    const questions = QuestionRepository.shuffle(
      QuestionRepository.getByCategory(category),
    ).slice(0, 10);
    startOrAlert(questions, `${category} 보완`, "이 단원 문제가 없습니다.");
  };

  const handleStartAllWeak = () => {
    const categories = stats?.weakCategories.map((c) => c.category) || [];
    const questions = QuestionRepository.getByCategories(categories, 10);
    startOrAlert(questions, "취약 단원 보완", "취약 단원 문제가 없습니다.");
  };

  const handleStartUnknown = () => {
    startOrAlert(
      unknownQuestions,
      "모름만 다시 풀기",
      "최근 모름으로 표시한 문제가 없습니다.",
    );
  };

  const handleStartReview = () => {
    startOrAlert(reviewQuestions, "오늘 복습", "오늘 복습할 문제가 없습니다.");
  };

  const handleSelectYear = (year: number | null) => {
    triggerHaptic.selection();
    setExamYear(year);
    setExamRound(null);
  };

  const handleSelectRound = (round: number | null) => {
    triggerHaptic.selection();
    setExamRound(round);
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

        {/* 안 푼 문제 10선 퀵 퀴즈 배너 */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleStartUnsolvedQuickQuiz}
        >
          <Card
            style={[
              styles.quickCard,
              {
                backgroundColor: isDarkMode ? "#132E27" : "#ECFDF5",
                borderColor: isDarkMode ? "#059669" : "#10B981",
              },
            ]}
          >
            <View style={styles.quickLeft}>
              <View
                style={[styles.quickIconBox, { backgroundColor: "#10B981" }]}
              >
                <CheckCircle2 size={24} color="#FFFFFF" />
              </View>
              <View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={[
                      styles.quickTitleColored,
                      { color: isDarkMode ? "#E2E8F0" : "#065F46" },
                    ]}
                  >
                    안 푼 문제 10선 퀵 퀴즈
                  </Text>
                  <View style={styles.unsolvedCountBadge}>
                    <Text style={styles.unsolvedCountBadgeText}>
                      남은{" "}
                      {Math.max(
                        0,
                        totalQuestionsCount - attemptedQuestionIds.size,
                      )}
                      문제
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.quickDescColored,
                    { color: isDarkMode ? "#94A3B8" : "#047857" },
                  ]}
                >
                  풀어보지 않은 문제만 골라 무작위 10선 공략
                </Text>
              </View>
            </View>
            <ChevronRight
              size={22}
              color={isDarkMode ? "#94A3B8" : "#059669"}
            />
          </Card>
        </TouchableOpacity>

        {/* 초보자 핵심 이론 & 고빈출 1초 두음 암기장 바로가기 배너 */}
        {onGoTheory && (
          <TouchableOpacity activeOpacity={0.85} onPress={onGoTheory}>
            <Card
              style={[
                styles.quickCard,
                {
                  backgroundColor: isDarkMode ? "#241D3B" : "#F5F3FF",
                  borderColor: isDarkMode ? "#7C3AED" : "#DDD6FE",
                },
              ]}
            >
              <View style={styles.quickLeft}>
                <View
                  style={[styles.quickIconBox, { backgroundColor: "#8B5CF6" }]}
                >
                  <GraduationCap size={24} color="#FFFFFF" />
                </View>
                <View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={[
                        styles.quickTitleColored,
                        { color: isDarkMode ? "#EDE9FE" : "#4C1D95" },
                      ]}
                    >
                      핵심 이론 & 1초 두음 암기장
                    </Text>
                    <View
                      style={[
                        styles.unsolvedCountBadge,
                        { backgroundColor: "#8B5CF6" },
                      ]}
                    >
                      <Text style={styles.unsolvedCountBadgeText}>
                        5개 과목 완비
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={[
                      styles.quickDescColored,
                      { color: isDarkMode ? "#C4B5FD" : "#6D28D9" },
                    ]}
                  >
                    초보자 맞춤 일상 비유 + 출퇴근 1초 고빈출 두음
                  </Text>
                </View>
              </View>
              <ChevronRight
                size={22}
                color={isDarkMode ? "#C4B5FD" : "#7C3AED"}
              />
            </Card>
          </TouchableOpacity>
        )}

        {reviewQuestions.length > 0 && (
          <Card style={styles.actionCueCard} onPress={handleStartReview}>
            <View style={styles.actionCueRow}>
              <View
                style={[
                  styles.actionCueIcon,
                  { backgroundColor: theme.primaryLight },
                ]}
              >
                <RotateCcw size={18} color={theme.primary} />
              </View>
              <View style={styles.actionCueInfo}>
                <Text style={[styles.actionCueTitle, { color: theme.text }]}>
                  오늘 복습 {reviewQuestions.length}문제
                </Text>
                <Text style={[styles.actionCueDesc, { color: theme.subText }]}>
                  모름은 당일, 헷갈림은 하루 뒤, 정답은 3일 뒤
                </Text>
              </View>
              <ChevronRight size={18} color={theme.mutedText} />
            </View>
          </Card>
        )}

        {unknownQuestions.length > 0 && (
          <Card style={styles.actionCueCard} onPress={handleStartUnknown}>
            <View style={styles.actionCueRow}>
              <View
                style={[
                  styles.actionCueIcon,
                  { backgroundColor: theme.accentLight },
                ]}
              >
                <HelpCircle size={18} color={theme.accent} />
              </View>
              <View style={styles.actionCueInfo}>
                <Text style={[styles.actionCueTitle, { color: theme.text }]}>
                  모름만 다시 풀기
                </Text>
                <Text style={[styles.actionCueDesc, { color: theme.subText }]}>
                  최근 모른다고 표시한 {unknownQuestions.length}문제
                </Text>
              </View>
              <ChevronRight size={18} color={theme.mutedText} />
            </View>
          </Card>
        )}

        {stats && stats.weakCategories.length > 0 && (
          <Card style={styles.weakCard}>
            <View style={styles.weakHeader}>
              <View style={styles.weakTitleRow}>
                <AlertTriangle size={18} color={theme.wrong} />
                <Text style={[styles.weakTitle, { color: theme.text }]}>
                  집중 보완이 필요한 취약 단원
                </Text>
              </View>
              <TouchableOpacity onPress={onGoStats} hitSlop={8}>
                <Text style={[styles.weakStatsLink, { color: theme.primary }]}>
                  통계
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.weakTags}>
              {stats.weakCategories.slice(0, 3).map((w) => (
                <TouchableOpacity
                  key={w.category}
                  activeOpacity={0.75}
                  onPress={() => handleStartWeakCategory(w.category)}
                  style={[
                    styles.weakTagItem,
                    { backgroundColor: theme.wrongLight },
                  ]}
                >
                  <Text style={[styles.weakTagName, { color: theme.wrong }]}>
                    {w.category} ({w.rate}%)
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Button
              title="취약 단원 모아 풀기"
              variant="outline"
              onPress={handleStartAllWeak}
              style={styles.weakStartBtn}
              textStyle={{ fontSize: 13 }}
            />
          </Card>
        )}

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
                C/Java/Python 문제 생성
              </Text>
              <Text style={[styles.syncSub, { color: theme.subText }]}>
                10종 독립 생성기로 변형 6문제 추가
              </Text>
            </View>
            <Button
              title={isSyncing ? "백그라운드 생성 중" : "문제 생성"}
              variant="outline"
              loading={false}
              disabled={false}
              onPress={handleSyncQuestions}
              style={styles.syncBtn}
              textStyle={{ fontSize: 12 }}
            />
          </View>
        </Card>

        <Card style={styles.syncCard}>
          <View style={styles.syncRow}>
            <View
              style={[
                styles.syncIconBox,
                { backgroundColor: theme.accentLight },
              ]}
            >
              <Sparkles size={20} color={theme.accent} />
            </View>
            <View style={styles.syncInfo}>
              <Text style={[styles.syncTitle, { color: theme.text }]}>
                Gemini 암기 문제 생성
              </Text>
              <Text style={[styles.syncSub, { color: theme.subText }]}>
                주제 시드 7문제×2묶음 · 보유{" "}
                <Text style={{ color: theme.primary, fontWeight: "700" }}>
                  {totalQuestionsCount}문제
                </Text>
              </Text>
            </View>
            <Button
              title={isGeminiGenerating ? "백그라운드 생성 중" : "AI 생성"}
              variant="outline"
              loading={false}
              disabled={false}
              onPress={handleGeminiMemoGenerate}
              style={styles.syncBtn}
              textStyle={{ fontSize: 12 }}
            />
          </View>
        </Card>

        <Card style={styles.syncCard}>
          <View style={styles.syncRow}>
            <View
              style={[
                styles.syncIconBox,
                { backgroundColor: theme.surfaceSecondary },
              ]}
            >
              <CopyMinus size={20} color={theme.mutedText} />
            </View>
            <View style={styles.syncInfo}>
              <Text style={[styles.syncTitle, { color: theme.text }]}>
                중복 문항 삭제
              </Text>
              <Text style={[styles.syncSub, { color: theme.subText }]}>
                {duplicateCount > 0
                  ? `지문이 같은 문제 ${duplicateCount}개`
                  : "지문이 같은 항목만 보관함에서 정리"}
              </Text>
            </View>
            <Button
              title="중복 삭제"
              variant="outline"
              onPress={handleRemoveDuplicates}
              style={styles.syncBtn}
              textStyle={{ fontSize: 12 }}
            />
          </View>
        </Card>

        {/* 과목별 문제 풀이 섹션 헤더 & 안 푼 문제만 보기 토글 버튼 */}
        <View style={styles.sectionHeaderRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              과목별 집중 학습
            </Text>
            <Text style={[styles.sectionSub, { color: theme.subText }]}>
              {onlyUnsolved
                ? "풀어보지 않은 문제만 골라 출제합니다"
                : "연도·회차를 고르면 해당 기출만 풉니다"}
            </Text>
          </View>

          {/* 안 푼 문제만 보기 토글 버튼 */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              triggerHaptic.selection();
              setOnlyUnsolved((prev) => !prev);
            }}
            style={[
              styles.onlyUnsolvedFilterBtn,
              {
                backgroundColor: onlyUnsolved
                  ? theme.accent
                  : theme.surfaceSecondary,
                borderColor: onlyUnsolved ? theme.accent : theme.border,
              },
            ]}
          >
            <Filter
              size={13}
              color={onlyUnsolved ? "#FFFFFF" : theme.mutedText}
              style={{ marginRight: 4 }}
            />
            <Text
              style={[
                styles.onlyUnsolvedFilterText,
                { color: onlyUnsolved ? "#FFFFFF" : theme.text },
              ]}
            >
              안 푼 문제만
            </Text>
          </TouchableOpacity>
        </View>

        {examYears.length > 0 && (
          <View style={styles.filterBlock}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterChips}
            >
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => handleSelectYear(null)}
                style={[
                  styles.filterChip,
                  {
                    backgroundColor:
                      examYear === null ? theme.primary : theme.surface,
                    borderColor:
                      examYear === null ? theme.primary : theme.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    { color: examYear === null ? "#FFFFFF" : theme.text },
                  ]}
                >
                  전체 연도
                </Text>
              </TouchableOpacity>
              {examYears.map((year) => {
                const selected = examYear === year;
                return (
                  <TouchableOpacity
                    key={year}
                    activeOpacity={0.75}
                    onPress={() => handleSelectYear(year)}
                    style={[
                      styles.filterChip,
                      {
                        backgroundColor: selected
                          ? theme.primary
                          : theme.surface,
                        borderColor: selected ? theme.primary : theme.border,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        { color: selected ? "#FFFFFF" : theme.text },
                      ]}
                    >
                      {year}년
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterChips}
            >
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => handleSelectRound(null)}
                style={[
                  styles.filterChip,
                  {
                    backgroundColor:
                      examRound === null ? theme.accent : theme.surface,
                    borderColor:
                      examRound === null ? theme.accent : theme.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    { color: examRound === null ? "#FFFFFF" : theme.text },
                  ]}
                >
                  전체 회차
                </Text>
              </TouchableOpacity>
              {examRounds.map((round) => {
                const selected = examRound === round;
                return (
                  <TouchableOpacity
                    key={round}
                    activeOpacity={0.75}
                    onPress={() => handleSelectRound(round)}
                    style={[
                      styles.filterChip,
                      {
                        backgroundColor: selected
                          ? theme.accent
                          : theme.surface,
                        borderColor: selected ? theme.accent : theme.border,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        { color: selected ? "#FFFFFF" : theme.text },
                      ]}
                    >
                      {round}회
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {SUBJECTS.map((subject) => {
          const count = QuestionRepository.filterByExam(
            QuestionRepository.getBySubject(subject),
            examYear,
            examRound,
          ).length;
          const unsolvedQuestions = QuestionRepository.getUnsolvedQuestions(
            attemptedQuestionIds,
            subject,
            examYear,
            examRound,
          );
          const unsolvedCount = unsolvedQuestions.length;
          const stat = stats?.subjectStats[subject];
          const rate = stat ? stat.rate : null;

          return (
            <Card
              key={subject}
              style={[
                styles.subjectCard,
                onlyUnsolved && unsolvedCount === 0 && { opacity: 0.6 },
              ]}
              onPress={() => handleStartSubjectQuiz(subject)}
            >
              <View style={styles.subjectRow}>
                <View
                  style={[
                    styles.subjectIconBox,
                    {
                      backgroundColor:
                        onlyUnsolved && unsolvedCount === 0
                          ? theme.surfaceSecondary
                          : theme.primaryLight,
                    },
                  ]}
                >
                  <BookOpen
                    size={20}
                    color={
                      onlyUnsolved && unsolvedCount === 0
                        ? theme.mutedText
                        : theme.primary
                    }
                  />
                </View>
                <View style={styles.subjectInfo}>
                  <View style={styles.subjectTitleRow}>
                    <Text style={[styles.subjectName, { color: theme.text }]}>
                      {subject}
                    </Text>
                    {onlyUnsolved ? (
                      unsolvedCount === 0 ? (
                        <View
                          style={[
                            styles.unsolvedBadge,
                            { backgroundColor: theme.primaryLight },
                          ]}
                        >
                          <Text
                            style={[
                              styles.unsolvedBadgeText,
                              { color: theme.primary },
                            ]}
                          >
                            ✓ 모두 완료
                          </Text>
                        </View>
                      ) : (
                        <View
                          style={[
                            styles.unsolvedBadge,
                            { backgroundColor: theme.accentLight },
                          ]}
                        >
                          <Text
                            style={[
                              styles.unsolvedBadgeText,
                              { color: theme.accent },
                            ]}
                          >
                            미풀이 {unsolvedCount}개
                          </Text>
                        </View>
                      )
                    ) : null}
                  </View>
                  <Text style={[styles.subjectCount, { color: theme.subText }]}>
                    {onlyUnsolved
                      ? `안 푼 ${unsolvedCount}문제 (전체 ${count}문제)`
                      : `총 ${count}문제 ${rate !== null ? `· 정답률 ${rate}%` : "· 미풀이"}`}
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
    flexShrink: 1,
  },
  weakStatsLink: {
    fontSize: 13,
    fontWeight: "700",
  },
  actionCueCard: {
    padding: 16,
    marginVertical: 6,
  },
  actionCueRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionCueIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  actionCueInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  actionCueTitle: {
    fontSize: 15,
    fontWeight: "800",
  },
  actionCueDesc: {
    fontSize: 12,
    marginTop: 2,
  },
  filterBlock: {
    marginBottom: 8,
  },
  filterChips: {
    paddingVertical: 4,
    paddingRight: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: "700",
  },
  weakStartBtn: {
    height: 36,
    marginTop: 12,
    borderRadius: 8,
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
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  onlyUnsolvedFilterBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
  },
  onlyUnsolvedFilterText: {
    fontSize: 12,
    fontWeight: "700",
  },
  quickTitleColored: {
    fontSize: 16,
    fontWeight: "800",
  },
  quickDescColored: {
    fontSize: 12,
    marginTop: 2,
  },
  unsolvedCountBadge: {
    backgroundColor: "#10B981",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  unsolvedCountBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
  subjectTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  unsolvedBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 4,
  },
  unsolvedBadgeText: {
    fontSize: 11,
    fontWeight: "700",
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
