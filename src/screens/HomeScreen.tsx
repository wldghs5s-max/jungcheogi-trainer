import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Linking,
  AppState,
  AppStateStatus,
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
  ShieldCheck,
  ListChecks,
  Repeat,
} from "lucide-react-native";
import { useSettingsStore } from "../store/settingsStore";
import { useUserStore } from "../store/userStore";
import { AttemptRepository } from "../repositories/attemptRepository";
import { QuestionRepository } from "../repositories/questionRepository";
import { backgroundQuestionService, MemoProgress } from "../services/backgroundQuestionService";
import { MEMO_QUICK_TARGET } from "../api/geminiQuestionGenerator";
import { calculateUserStats } from "../utils/statistics";
import { getDueReviewQuestionIds } from "../utils/reviewQueue";
import { triggerHaptic } from "../utils/haptics";
import { UserStats } from "../types/statistics";
import {
  Subject,
  SecuritySubject,
  SecurityQuestionFilterMode,
  Question,
} from "../types/question";
import { SUBJECTS, SECURITY_SUBJECTS } from "../data/questions";
import {
  SECURITY_THEORY_DATA,
  SECURITY_MEMO_CARDS,
  getSecurityTaxonomyBasisLabel,
  SecurityChapterNode,
  SecuritySectionNode,
} from "../data/security";
import { COLORS } from "../utils/theme";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { ProgressBar } from "../components/common/ProgressBar";

interface HomeScreenProps {
  onStartQuiz: (questions: Question[], title: string) => void;
  onGoWrongNote: () => void;
  onGoStats: () => void;
  onGoTheory?: (mode?: "mnemonic" | "theory") => void;
}

const SECURITY_PAST_EXAM_RESOURCES = [
  {
    title: "전자문제집 CBT · 이전 회차",
    url: "https://www.comcbt.com/xe/webhaesul/10153536",
  },
  {
    title: "기출콕 · 최근 회차 복원",
    url: "https://gichulkok.com/jeongbo-boan-gisa",
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartQuiz,
  onGoWrongNote,
  onGoStats,
  onGoTheory,
}) => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const selectedCertification =
    useSettingsStore((state) => state.selectedCertification) ?? "JUNGCHEOGI";
  const setSelectedCertification = useSettingsStore(
    (state) => state.setSelectedCertification,
  );
  const isSecurity = selectedCertification === "SECURITY";
  const activeSubjects: Subject[] = isSecurity ? SECURITY_SUBJECTS : SUBJECTS;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;
  const { dailyTarget, loadUserSettings } = useUserStore();

  const [stats, setStats] = useState<UserStats | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [totalQuestionsCount, setTotalQuestionsCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isGeminiGenerating, setIsGeminiGenerating] = useState(false);
  const [memoProgress, setMemoProgress] = useState<MemoProgress | null>(null);
  const [examYear, setExamYear] = useState<number | null>(null);
  const [examRound, setExamRound] = useState<number | null>(null);
  const [unknownQuestions, setUnknownQuestions] = useState<Question[]>([]);
  const [reviewQuestions, setReviewQuestions] = useState<Question[]>([]);
  // 안 푼 문제 필터링 상태
  const [onlyUnsolved, setOnlyUnsolved] = useState(false);
  const [attemptedQuestionIds, setAttemptedQuestionIds] = useState<Set<string>>(
    new Set(),
  );
  // 정보보안기사 `과목 → 챕터 → 세부 섹션` 및 출처·기준 필터 상태
  const [selectedSecuritySubject, setSelectedSecuritySubject] =
    useState<SecuritySubject>("시스템 보안");
  const [expandedSecurityChapterId, setExpandedSecurityChapterId] = useState<
    string | null
  >("SEC_CH_SYS_01");
  const [securityFilterMode, setSecurityFilterMode] =
    useState<SecurityQuestionFilterMode>("ALL");

  const examYears = QuestionRepository.getExamYears(selectedCertification);
  const examRounds = QuestionRepository.getExamRounds(
    examYear ?? undefined,
    selectedCertification,
  );

  const loadData = useCallback(async () => {
    await loadUserSettings();
    await QuestionRepository.loadCachedServerQuestions();
    const all = QuestionRepository.getAll(selectedCertification);
    setTotalQuestionsCount(all.length);

    const attempts = await AttemptRepository.getAllAttempts(
      selectedCertification,
    );
    const calculated = calculateUserStats(attempts, selectedCertification);
    setStats(calculated);

    const attemptedIds = await AttemptRepository.getAttemptedQuestionIds(
      selectedCertification,
    );
    setAttemptedQuestionIds(attemptedIds);

    const unknownIds = await AttemptRepository.getUnknownQuestionIds(
      selectedCertification,
    );
    setUnknownQuestions(
      QuestionRepository.getByIds(unknownIds, selectedCertification),
    );

    const dueIds = getDueReviewQuestionIds(attempts, 10);
    setReviewQuestions(
      QuestionRepository.getByIds(dueIds, selectedCertification),
    );
  }, [loadUserSettings, selectedCertification]);

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
    setMemoProgress(initialStatus.memo);
    void backgroundQuestionService.hydrateActiveJob().then(() => {
      void backgroundQuestionService.resumePendingJob();
    });

    const unsubscribe = backgroundQuestionService.subscribe((status) => {
      if (isMountedRef.current) {
        setIsSyncing(status.isGenerating && status.taskType === "PROGRAMMING");
        setIsGeminiGenerating(
          status.isGenerating && status.taskType === "GEMINI_MEMO",
        );
        setMemoProgress(status.memo);
        if (!status.isGenerating) {
          void loadData();
        } else if (status.taskType === "GEMINI_MEMO") {
          void QuestionRepository.loadCachedServerQuestions().then(() => {
            if (isMountedRef.current) {
              setTotalQuestionsCount(QuestionRepository.getAll(selectedCertification).length);
            }
          });
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [loadData]);

  // 포그라운드 복귀(화면 켬/다른 앱에서 복귀) 시 최신 데이터 동기화 및 미완료 작업 재개
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextAppState: AppStateStatus) => {
        if (nextAppState === "active") {
          void loadData();
          void backgroundQuestionService.resumePendingJob();
        }
      },
    );

    return () => {
      subscription.remove();
    };
  }, [loadData]);

  const handleSyncQuestions = () => {
    triggerHaptic.selection();
    const res = backgroundQuestionService.startProgrammingGeneration();
    if (res.started) {
      Alert.alert("프로그래밍 문제 생성", res.message);
    } else {
      Alert.alert("알림", res.message);
    }
  };

  const handleGeminiMemoGenerate = async () => {
    triggerHaptic.selection();
    const res =
      await backgroundQuestionService.startGeminiMemorizationGeneration(
        MEMO_QUICK_TARGET,
      );
    if (res.started) {
      Alert.alert("AI 암기 문제 생성", res.message);
    } else if (res.apiKeyRequired) {
      Alert.alert("API Key 필요", res.message);
    } else {
      Alert.alert("알림", res.message);
    }
  };

  const handlePauseMemo = () => {
    const res = backgroundQuestionService.pauseMemoGeneration();
    Alert.alert(res.ok ? "일시정지" : "알림", res.message);
  };

  const handleResumeMemo = () => {
    triggerHaptic.selection();
    void backgroundQuestionService.resumePendingJob(true).then((res) => {
      if (!res.ok && res.message) {
        Alert.alert("알림", res.message);
      }
    });
  };

  const handleCancelMemo = () => {
    Alert.alert(
      "생성 중단",
      "그만두면 아직 안 만든 문제는 만들지 않습니다. 이미 넣은 문제는 그대로 둡니다.",
      [
        { text: "계속 만들기", style: "cancel" },
        {
          text: "중단",
          style: "destructive",
          onPress: () => {
            void backgroundQuestionService.cancelMemoGeneration().then((res) => {
              Alert.alert(res.ok ? "그만둠" : "알림", res.message);
              void loadData();
            });
          },
        },
      ],
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await loadData();
    } catch (err) {
      console.warn("[HomeScreen] onRefresh error:", err);
    } finally {
      setRefreshing(false);
    }
  };

  // 5분 퀵 퀴즈 시작 (5문제 조합: NEW 최우선 + 최근 오답 + 쿨다운 배제)
  const handleStartQuickQuiz = async () => {
    const attempts = await AttemptRepository.getAllAttempts(
      selectedCertification,
    );
    const dueIds = getDueReviewQuestionIds(attempts, 20);
    const attemptedIds = await AttemptRepository.getAttemptedQuestionIds(
      selectedCertification,
    );
    const unsolvedIds = QuestionRepository.getUnsolvedQuestions(
      attemptedIds,
      undefined,
      null,
      null,
      selectedCertification,
    ).map((question) => question.id);
    const weakCats = stats?.weakCategories.map((c) => c.category) || [];

    // 최근 2개 세션(10문항) 출현 문제 추출 (쿨다운 대상)
    const recentAttempts = await AttemptRepository.getRecentAttempts(
      10,
      selectedCertification,
    );
    const recentQuestionIds = Array.from(new Set(recentAttempts.map((a) => a.questionId)));

    // 취약 문제 및 마스터 문제 분류
    const wrongSummaries = await AttemptRepository.getWrongQuestionSummaries(
      selectedCertification,
    );
    const weakQuestionIds = wrongSummaries
      .filter((s) => s.lastAttemptIsWrong || s.wrongAttempts >= s.correctAttempts)
      .map((s) => s.questionId);

    const masteredQuestionIds = wrongSummaries
      .filter((s) => !s.lastAttemptIsWrong && s.correctAttempts >= 3 && s.wrongAttempts === 0)
      .map((s) => s.questionId);

    const quickQuestions = QuestionRepository.getQuickQuizQuestions(
      5,
      dueIds,
      weakCats,
      unsolvedIds,
      {
        recentQuestionIds,
        weakQuestionIds,
        masteredQuestionIds,
        certification: selectedCertification,
      },
    );
    onStartQuiz(quickQuestions, "지하철 5분 퀵 퀴즈");
  };

  // 안 푼 문제만 모아서 10문제 퀵 퀴즈 시작 (계산 1~3개, SQL 1개, 일반 6~8개 밸런스 출제 + 쿨다운 적용)
  const handleStartUnsolvedQuickQuiz = async () => {
    triggerHaptic.selection();
    const unsolved = QuestionRepository.getUnsolvedQuestions(
      attemptedQuestionIds,
      undefined,
      null,
      null,
      selectedCertification,
    );
    if (unsolved.length === 0) {
      Alert.alert(
        "모든 문제 풀이 완료",
        "보유 중인 모든 문제를 최소 1번 이상 풀었습니다! 🎉\n오답노트나 과목별 전체 문제로 복습해 보세요.",
      );
      return;
    }

    const recentAttempts = await AttemptRepository.getRecentAttempts(
      10,
      selectedCertification,
    );
    const recentQuestionIds = Array.from(new Set(recentAttempts.map((a) => a.questionId)));

    const selected = QuestionRepository.getUnsolved10QuickQuizQuestions(
      attemptedQuestionIds,
      { recentQuestionIds, certification: selectedCertification },
    );
    onStartQuiz(selected, "안 푼 문제 10선 퀵 퀴즈");
  };

  const getSecurityFilterModeLabel = (
    mode: SecurityQuestionFilterMode,
  ): string => {
    if (mode === "PAST_EXAM") return "실제 기출";
    if (mode === "REVISED_2027") return "2027 개정 대비";
    return "전체 문제";
  };

  // 정보보안기사 객관식 문제 풀이 바로 시작 (현재 필터 모드 적용)
  const handleStartSecurityMultipleChoiceQuiz = () => {
    triggerHaptic.selection();
    const filtered = QuestionRepository.getSecurityQuestionsByScope({
      filterMode: securityFilterMode,
      examYear,
      examRound,
      onlyUnsolved,
      attemptedQuestionIds,
    });
    const modeLabel = getSecurityFilterModeLabel(securityFilterMode);
    if (filtered.length === 0) {
      Alert.alert(
        "출제 가능한 문항 없음",
        `현재 선택한 조건(${modeLabel}${onlyUnsolved ? " · 안 푼 문제만" : ""})에 해당하는 문항이 없습니다. 필터를 변경해 보세요.`,
      );
      return;
    }
    onStartQuiz(
      QuestionRepository.shuffle(filtered),
      `정보보안기사 객관식 (${modeLabel}${onlyUnsolved ? " · 안 푼 문제" : ""})`,
    );
  };

  const handleSelectSecuritySubject = (subject: SecuritySubject) => {
    triggerHaptic.selection();
    setSelectedSecuritySubject(subject);
    const chapters = QuestionRepository.getSecurityChapters(subject);
    setExpandedSecurityChapterId(chapters[0]?.chapterId ?? null);
  };

  const handleToggleSecurityChapter = (chapterId: string) => {
    triggerHaptic.selection();
    setExpandedSecurityChapterId((prev) =>
      prev === chapterId ? null : chapterId,
    );
  };

  // 정보보안기사: 챕터 전체 선택 풀이
  const handleStartSecurityChapterQuiz = (chapter: SecurityChapterNode) => {
    triggerHaptic.selection();
    const modeLabel = getSecurityFilterModeLabel(securityFilterMode);
    const questions = QuestionRepository.getSecurityQuestionsByScope({
      subject: chapter.subject,
      chapterId: chapter.chapterId,
      filterMode: securityFilterMode,
      examYear,
      examRound,
      onlyUnsolved,
      attemptedQuestionIds,
    });
    startOrAlert(
      QuestionRepository.shuffle(questions),
      `${chapter.title} · 챕터 전체 (${modeLabel})`,
      `선택한 '${chapter.title}' 챕터에 '${modeLabel}'${onlyUnsolved ? " (안 푼 문제)" : ""} 조건의 문항이 없습니다.`,
    );
  };

  // 정보보안기사: 특정 세부 섹션 하나만 선택 풀이
  const handleStartSecuritySectionQuiz = (section: SecuritySectionNode) => {
    triggerHaptic.selection();
    const modeLabel = getSecurityFilterModeLabel(securityFilterMode);
    const questions = QuestionRepository.getSecurityQuestionsByScope({
      subject: section.subject,
      chapterId: section.chapterId,
      sectionId: section.sectionId,
      filterMode: securityFilterMode,
      examYear,
      examRound,
      onlyUnsolved,
      attemptedQuestionIds,
    });
    startOrAlert(
      QuestionRepository.shuffle(questions),
      `${section.title} (${modeLabel})`,
      `선택한 '${section.title}' 섹션에 '${modeLabel}'${onlyUnsolved ? " (안 푼 문제)" : ""} 조건의 문항이 없습니다.`,
    );
  };

  const handleToggleCertification = () => {
    triggerHaptic.selection();
    setExamYear(null);
    setExamRound(null);
    void setSelectedCertification(isSecurity ? "JUNGCHEOGI" : "SECURITY");
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
        selectedCertification,
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
                    QuestionRepository.getBySubject(
                      subject,
                      selectedCertification,
                    ),
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
        QuestionRepository.getBySubject(subject, selectedCertification),
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
      QuestionRepository.getByCategory(category, selectedCertification),
    ).slice(0, 10);
    startOrAlert(questions, `${category} 보완`, "이 단원 문제가 없습니다.");
  };

  const handleStartAllWeak = () => {
    const categories = stats?.weakCategories.map((c) => c.category) || [];
    const questions = QuestionRepository.getByCategories(
      categories,
      10,
      selectedCertification,
    );
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
        <View style={{ flex: 1, marginRight: 8 }}>
          <Text
            style={[
              styles.appTitle,
              { color: isSecurity ? "#059669" : theme.primary },
            ]}
          >
            {isSecurity ? "정보보안기사 필기 트레이너" : "정처기 실기 트레이너"}
          </Text>
          <Text style={[styles.appSubtitle, { color: theme.subText }]}>
            {isSecurity
              ? "이론 · 객관식 문제 · 출퇴근 1장 1개념 필수 암기"
              : "출퇴근 지하철 10분 합격 프로젝트"}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={handleToggleCertification}
            style={[
              styles.streakBadge,
              {
                backgroundColor: theme.surfaceSecondary,
                borderWidth: 1,
                borderColor: theme.border,
              },
            ]}
          >
            <Repeat size={13} color={theme.text} />
            <Text
              style={[
                styles.streakText,
                { color: theme.text, fontSize: 11.5 },
              ]}
            >
              {isSecurity ? "정처기 전환" : "보안기사 전환"}
            </Text>
          </TouchableOpacity>
          <View
            style={[styles.streakBadge, { backgroundColor: theme.accentLight }]}
          >
            <Flame size={16} color="#EF4444" fill="#EF4444" />
            <Text style={[styles.streakText, { color: theme.accent }]}>
              {streak}일
            </Text>
          </View>
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
              오늘의 학습 목표 ({isSecurity ? "정보보안기사" : "정보처리기사"})
            </Text>
            <Text
              style={[
                styles.todayCount,
                { color: isSecurity ? "#059669" : theme.primary },
              ]}
            >
              {todayCount} / {dailyTarget} 문제
            </Text>
          </View>
          <ProgressBar
            progress={targetProgress}
            height={10}
            color={isSecurity ? "#059669" : theme.primary}
          />
          <Text style={[styles.todayNotice, { color: theme.subText }]}>
            {todayCount >= dailyTarget
              ? "🎉 오늘의 목표를 모두 달성했습니다! 훌륭해요!"
              : `목표까지 ${dailyTarget - todayCount}문제 남았습니다. 힘내세요!`}
          </Text>
        </Card>

        {isSecurity ? (
          <>
            {/* 정보보안기사 3대 핵심 진입 메뉴: 이론 / 객관식 문제 / 필수 암기 */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => onGoTheory && onGoTheory("theory")}
            >
              <Card
                style={[
                  styles.quickCard,
                  {
                    backgroundColor: theme.primary,
                    borderColor: theme.primary,
                  },
                ]}
              >
                <View style={styles.quickLeft}>
                  <View style={styles.quickIconBox}>
                    <BookOpen size={24} color="#FFFFFF" />
                  </View>
                  <View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text style={styles.quickTitle}>이론</Text>
                      <View
                        style={[
                          styles.unsolvedCountBadge,
                          { backgroundColor: "rgba(255,255,255,0.25)" },
                        ]}
                      >
                        <Text style={styles.unsolvedCountBadgeText}>
                          {SECURITY_THEORY_DATA.length}개 주제
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.quickDesc}>
                      정보보안기사 5과목 핵심 이론 요약 & 출제 포인트
                    </Text>
                  </View>
                </View>
                <ChevronRight size={22} color="#FFFFFF" />
              </Card>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleStartSecurityMultipleChoiceQuiz}
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
                    style={[
                      styles.quickIconBox,
                      { backgroundColor: "#059669" },
                    ]}
                  >
                    <ListChecks size={24} color="#FFFFFF" />
                  </View>
                  <View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text
                        style={[
                          styles.quickTitleColored,
                          { color: isDarkMode ? "#E2E8F0" : "#065F46" },
                        ]}
                      >
                        객관식 문제
                      </Text>
                      <View
                        style={[
                          styles.unsolvedCountBadge,
                          { backgroundColor: "#059669" },
                        ]}
                      >
                        <Text style={styles.unsolvedCountBadgeText}>
                          미풀이{" "}
                          {Math.max(
                            0,
                            totalQuestionsCount - attemptedQuestionIds.size,
                          )}{" "}
                          / 전체 {totalQuestionsCount}문제
                        </Text>
                      </View>
                    </View>
                    <Text
                      style={[
                        styles.quickDescColored,
                        { color: isDarkMode ? "#94A3B8" : "#047857" },
                      ]}
                    >
                      4지선다 보기 선택 · 즉시 채점 · 정답 및 상세 해설 확인
                    </Text>
                  </View>
                </View>
                <ChevronRight
                  size={22}
                  color={isDarkMode ? "#94A3B8" : "#059669"}
                />
              </Card>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => onGoTheory && onGoTheory("mnemonic")}
            >
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
                    style={[
                      styles.quickIconBox,
                      { backgroundColor: "#8B5CF6" },
                    ]}
                  >
                    <ShieldCheck size={24} color="#FFFFFF" />
                  </View>
                  <View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text
                        style={[
                          styles.quickTitleColored,
                          { color: isDarkMode ? "#EDE9FE" : "#4C1D95" },
                        ]}
                      >
                        필수 암기
                      </Text>
                      <View
                        style={[
                          styles.unsolvedCountBadge,
                          { backgroundColor: "#8B5CF6" },
                        ]}
                      >
                        <Text style={styles.unsolvedCountBadgeText}>
                          1장 1개념 ({SECURITY_MEMO_CARDS.length}장)
                        </Text>
                      </View>
                    </View>
                    <Text
                      style={[
                        styles.quickDescColored,
                        { color: isDarkMode ? "#C4B5FD" : "#6D28D9" },
                      ]}
                    >
                      출퇴근 중 짧게 보는 카드 한 장에 핵심 개념 하나
                    </Text>
                  </View>
                </View>
                <ChevronRight
                  size={22}
                  color={isDarkMode ? "#C4B5FD" : "#7C3AED"}
                />
              </Card>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* 5분 퀵 퀴즈 배너 */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleStartQuickQuiz}
            >
              <Card
                style={[
                  styles.quickCard,
                  {
                    backgroundColor: theme.primary,
                    borderColor: theme.primary,
                  },
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
                    style={[
                      styles.quickIconBox,
                      { backgroundColor: "#10B981" },
                    ]}
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
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => onGoTheory("mnemonic")}
              >
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
                      style={[
                        styles.quickIconBox,
                        { backgroundColor: "#8B5CF6" },
                      ]}
                    >
                      <GraduationCap size={24} color="#FFFFFF" />
                    </View>
                    <View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
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
          </>
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

        {!isSecurity && (
          <>
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
                  title={isSyncing ? "생성 중..." : "문제 생성"}
                  variant="outline"
                  loading={isSyncing}
                  disabled={isSyncing || isGeminiGenerating}
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
                    빈 챕터 우선 · 14개는 여기서 · 대량은 설정 · 보유{" "}
                    <Text style={{ color: theme.primary, fontWeight: "700" }}>
                      {totalQuestionsCount}문제
                    </Text>
                  </Text>
                </View>
              </View>
              {memoProgress &&
              (memoProgress.running ||
                memoProgress.paused ||
                memoProgress.canResume) ? (
                <View style={styles.memoProgressBox}>
                  <Text
                    style={[styles.memoProgressLabel, { color: theme.text }]}
                  >
                    {memoProgress.savedCount}/{memoProgress.targetCount}문제
                    {memoProgress.queuedCount > 0
                      ? ` · 다음에 ${memoProgress.queuedCount}개`
                      : ""}
                    {memoProgress.paused ? " · 잠시 멈춤" : ""}
                  </Text>
                  <ProgressBar
                    progress={
                      memoProgress.targetCount > 0
                        ? memoProgress.savedCount / memoProgress.targetCount
                        : 0
                    }
                    height={6}
                    color={theme.accent}
                  />
                  <View style={styles.memoActionRow}>
                    {memoProgress.running ? (
                      <Button
                        title="일시정지"
                        variant="outline"
                        onPress={handlePauseMemo}
                        style={styles.syncBtn}
                        textStyle={{ fontSize: 12 }}
                      />
                    ) : (
                      <Button
                        title="이어서"
                        variant="outline"
                        onPress={handleResumeMemo}
                        disabled={isSyncing}
                        style={styles.syncBtn}
                        textStyle={{ fontSize: 12 }}
                      />
                    )}
                    <Button
                      title="그만두기"
                      variant="danger"
                      onPress={handleCancelMemo}
                      style={styles.syncBtn}
                      textStyle={{ fontSize: 12 }}
                    />
                  </View>
                </View>
              ) : (
                <View>
                  <View style={styles.memoActionRow}>
                    <Button
                      title={isGeminiGenerating ? "생성 중..." : "14개 만들기"}
                      variant="outline"
                      loading={isGeminiGenerating}
                      disabled={isGeminiGenerating || isSyncing}
                      onPress={() => void handleGeminiMemoGenerate()}
                      style={styles.syncBtn}
                      textStyle={{ fontSize: 12 }}
                    />
                  </View>
                  <Text
                    style={[styles.memoBulkHint, { color: theme.mutedText }]}
                  >
                    100~500개 대량 생성은 실수로 눌리지 않게 설정 탭에 두었습니다.
                  </Text>
                </View>
              )}
            </Card>
          </>
        )}

        {/* 과목별 문제 풀이 섹션 헤더 & 안 푼 문제만 보기 토글 버튼 */}
        <View style={styles.sectionHeaderRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {isSecurity
                ? "범위 선택 풀이 (과목 → 챕터 → 세부 섹션)"
                : "과목별 집중 학습"}
            </Text>
            <Text style={[styles.sectionSub, { color: theme.subText }]}>
              {isSecurity
                ? "책을 읽은 범위(챕터 전체 또는 특정 세부 섹션)와 문제 유형을 골라 풀 수 있습니다"
                : onlyUnsolved
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

        {isSecurity ? (
          <View style={styles.securityScopeContainer}>
            {/* 분류 기준 안내 배너 */}
            <View
              style={[
                styles.taxonomyBasisBox,
                {
                  backgroundColor: theme.surfaceSecondary,
                  borderColor: theme.border,
                },
              ]}
            >
              <Text style={[styles.taxonomyBasisText, { color: theme.subText }]}>
                📖 {getSecurityTaxonomyBasisLabel()}
              </Text>
            </View>

            {/* 문항 출처·출제기준 필터 탭 (전체 문제 / 실제 기출 / 2027 개정 대비) */}
            <View style={styles.securityModeTabsRow}>
              {(
                [
                  { mode: "ALL" as const, label: "전체 문제" },
                  { mode: "PAST_EXAM" as const, label: "실제 기출" },
                  { mode: "REVISED_2027" as const, label: "2027 개정 대비" },
                ]
              ).map((tab) => {
                const isActive = securityFilterMode === tab.mode;
                const modeCount = QuestionRepository.getSecurityQuestionsByScope(
                  {
                    filterMode: tab.mode,
                    onlyUnsolved,
                    attemptedQuestionIds,
                    examYear: tab.mode === "PAST_EXAM" ? examYear : null,
                    examRound: tab.mode === "PAST_EXAM" ? examRound : null,
                  },
                ).length;
                return (
                  <TouchableOpacity
                    key={tab.mode}
                    activeOpacity={0.8}
                    onPress={() => {
                      triggerHaptic.selection();
                      setSecurityFilterMode(tab.mode);
                      if (tab.mode !== "PAST_EXAM") {
                        setExamYear(null);
                        setExamRound(null);
                      }
                    }}
                    style={[
                      styles.securityModeTab,
                      {
                        backgroundColor: isActive
                          ? "#059669"
                          : theme.surface,
                        borderColor: isActive ? "#059669" : theme.border,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.securityModeTabText,
                        { color: isActive ? "#FFFFFF" : theme.text },
                      ]}
                    >
                      {tab.label} ({modeCount})
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {securityFilterMode === "PAST_EXAM" && examYears.length === 0 && (
              <View style={styles.securityPastExamResources}>
                <Text style={{ color: theme.subText }}>
                  앱에 수록된 기출은 0문항입니다. 아래 사이트에서 이전 회차와 복원 문제를 풀 수 있습니다.
                </Text>
                {SECURITY_PAST_EXAM_RESOURCES.map(({ title, url }) => (
                  <Button
                    key={url}
                    title={title}
                    variant="outline"
                    onPress={() => {
                      void Linking.openURL(url).catch(() =>
                        Alert.alert("링크 열기 실패", url),
                      );
                    }}
                  />
                ))}
              </View>
            )}

            {/* 실제 기출 연도·회차 필터 */}
            {securityFilterMode === "PAST_EXAM" &&
              examYears.length > 0 && (
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
                            examYear === null ? "#059669" : theme.surface,
                          borderColor:
                            examYear === null ? "#059669" : theme.border,
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
                                ? "#059669"
                                : theme.surface,
                              borderColor: selected ? "#059669" : theme.border,
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
                          {
                            color: examRound === null ? "#FFFFFF" : theme.text,
                          },
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
                              borderColor: selected
                                ? theme.accent
                                : theme.border,
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

            {/* 1단계: 과목 선택 */}
            <Text
              style={[styles.hierarchyStepTitle, { color: theme.subText }]}
            >
              1단계 · 과목 선택 (선택 전 풀 수 있는 문항 수 표시)
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.securitySubjectChips}
            >
              {SECURITY_SUBJECTS.map((secSubject, idx) => {
                const isSelected = selectedSecuritySubject === secSubject;
                const subjectCounts = QuestionRepository.getSecurityScopeCounts(
                  {
                    subject: secSubject,
                    examYear,
                    examRound,
                  },
                  {
                    filterMode: securityFilterMode,
                    onlyUnsolved,
                    attemptedQuestionIds,
                  },
                );
                return (
                  <TouchableOpacity
                    key={secSubject}
                    activeOpacity={0.8}
                    onPress={() => handleSelectSecuritySubject(secSubject)}
                    style={[
                      styles.securitySubjectChip,
                      {
                        backgroundColor: isSelected
                          ? "#059669"
                          : theme.surface,
                        borderColor: isSelected ? "#059669" : theme.border,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.securitySubjectChipTitle,
                        { color: isSelected ? "#FFFFFF" : theme.text },
                      ]}
                    >
                      {idx + 1}과목. {secSubject}
                    </Text>
                    <Text
                      style={[
                        styles.securitySubjectChipCount,
                        {
                          color: isSelected
                            ? "rgba(255,255,255,0.9)"
                            : theme.subText,
                        },
                      ]}
                    >
                      풀 수 있는 문항 {subjectCounts.availableCount}문제 (전체{" "}
                      {subjectCounts.totalAllCount})
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* 2단계: 챕터 선택 & 3단계: 세부 섹션 선택 */}
            <Text
              style={[
                styles.hierarchyStepTitle,
                { color: theme.subText, marginTop: 10 },
              ]}
            >
              2·3단계 · '{selectedSecuritySubject}' 챕터 전체 또는 세부 섹션 선택
            </Text>

            {QuestionRepository.getSecurityChapters(
              selectedSecuritySubject,
            ).map((chapter) => {
              const isChapterExpanded =
                expandedSecurityChapterId === chapter.chapterId;
              const chapterCounts = QuestionRepository.getSecurityScopeCounts(
                {
                  subject: chapter.subject,
                  chapterId: chapter.chapterId,
                  examYear,
                  examRound,
                },
                {
                  filterMode: securityFilterMode,
                  onlyUnsolved,
                  attemptedQuestionIds,
                },
              );
              const currentStandardCreatedCount = Math.max(
                0,
                chapterCounts.createdCount - chapterCounts.revised2027Count,
              );

              return (
                <Card
                  key={chapter.chapterId}
                  style={[
                    styles.securityChapterCard,
                    {
                      borderColor: isChapterExpanded
                        ? "#059669"
                        : theme.border,
                    },
                  ]}
                >
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      handleToggleSecurityChapter(chapter.chapterId)
                    }
                    style={styles.securityChapterHeader}
                  >
                    <View style={{ flex: 1 }}>
                      <View style={styles.securityChapterBadgeRow}>
                        <View
                          style={[
                            styles.securityCodeBadge,
                            { backgroundColor: theme.surfaceSecondary },
                          ]}
                        >
                          <Text
                            style={[
                              styles.securityCodeBadgeText,
                              { color: theme.subText },
                            ]}
                          >
                            {chapter.chapterId} · 기준 {chapter.syllabusMajorCode}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.securityCountPill,
                            { backgroundColor: "#059669" },
                          ]}
                        >
                          <Text style={styles.securityCountPillText}>
                            풀 수 있는 문항 {chapterCounts.availableCount}문제
                          </Text>
                        </View>
                      </View>
                      <Text
                        style={[
                          styles.securityChapterTitle,
                          { color: theme.text },
                        ]}
                      >
                        {chapter.title}
                      </Text>
                      <Text
                        style={[
                          styles.securityChapterDesc,
                          { color: theme.subText },
                        ]}
                      >
                        {chapter.description}
                      </Text>
                      <Text
                        style={[
                          styles.securityBreakdownText,
                          { color: theme.mutedText },
                        ]}
                      >
                        전체 {chapterCounts.totalAllCount}문제 · 실제 기출{" "}
                        {chapterCounts.pastExamCount} · 창작(2023~2026 현행){" "}
                        {currentStandardCreatedCount} · 2027 개정 대비{" "}
                        {chapterCounts.revised2027Count} · 미풀이{" "}
                        {chapterCounts.unsolvedCount}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {/* 챕터 전체 풀기 & 세부 섹션 펼치기 액션 */}
                  <View style={styles.securityChapterActionRow}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => handleStartSecurityChapterQuiz(chapter)}
                      style={[
                        styles.securityChapterSolveBtn,
                        {
                          backgroundColor:
                            chapterCounts.availableCount > 0
                              ? "#059669"
                              : theme.surfaceSecondary,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.securityChapterSolveBtnText,
                          {
                            color:
                              chapterCounts.availableCount > 0
                                ? "#FFFFFF"
                                : theme.mutedText,
                          },
                        ]}
                      >
                        챕터 전체 풀기 ({chapterCounts.availableCount}문제)
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        handleToggleSecurityChapter(chapter.chapterId)
                      }
                      style={[
                        styles.securitySectionToggleBtn,
                        {
                          backgroundColor: theme.surfaceSecondary,
                          borderColor: theme.border,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.securitySectionToggleBtnText,
                          { color: theme.text },
                        ]}
                      >
                        {isChapterExpanded
                          ? `세부 섹션 접기 (${chapter.sections.length})`
                          : `세부 섹션 선택 (${chapter.sections.length})`}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* 3단계: 세부 섹션 목록 */}
                  {isChapterExpanded && (
                    <View
                      style={[
                        styles.securitySectionsList,
                        { borderTopColor: theme.border },
                      ]}
                    >
                      {chapter.sections.map((section) => {
                        const sectionCounts =
                          QuestionRepository.getSecurityScopeCounts(
                            {
                              subject: section.subject,
                              chapterId: section.chapterId,
                              sectionId: section.sectionId,
                              examYear,
                              examRound,
                            },
                            {
                              filterMode: securityFilterMode,
                              onlyUnsolved,
                              attemptedQuestionIds,
                            },
                          );
                        const secStandardCreated = Math.max(
                          0,
                          sectionCounts.createdCount -
                            sectionCounts.revised2027Count,
                        );

                        return (
                          <View
                            key={section.sectionId}
                            style={[
                              styles.securitySectionItem,
                              {
                                backgroundColor: theme.surfaceSecondary,
                                borderColor: theme.border,
                              },
                            ]}
                          >
                            <View style={styles.securitySectionTopRow}>
                              <View
                                style={[
                                  styles.securityCodeBadge,
                                  { backgroundColor: theme.surface },
                                ]}
                              >
                                <Text
                                  style={[
                                    styles.securityCodeBadgeText,
                                    { color: theme.subText },
                                  ]}
                                >
                                  {section.sectionId} · 항목{" "}
                                  {section.syllabusItemCode}
                                </Text>
                              </View>
                              <View
                                style={[
                                  styles.securityStandardBadge,
                                  {
                                    backgroundColor:
                                      section.syllabusStandard === "2027_2029"
                                        ? "#FEF3C7"
                                        : "#E0F2FE",
                                  },
                                ]}
                              >
                                <Text
                                  style={[
                                    styles.securityStandardBadgeText,
                                    {
                                      color:
                                        section.syllabusStandard === "2027_2029"
                                          ? "#B45309"
                                          : "#0369A1",
                                    },
                                  ]}
                                >
                                  {section.syllabusStandard === "2027_2029"
                                    ? "2027~2029 개정 기준 포함"
                                    : "2023~2026 출제기준"}
                                </Text>
                              </View>
                            </View>

                            <Text
                              style={[
                                styles.securitySectionTitle,
                                { color: theme.text },
                              ]}
                            >
                              {section.title}
                            </Text>
                            <Text
                              style={[
                                styles.securitySectionDesc,
                                { color: theme.subText },
                              ]}
                            >
                              {section.description}
                            </Text>

                            <View style={styles.securitySectionFooter}>
                              <View style={{ flex: 1, marginRight: 8 }}>
                                <Text
                                  style={[
                                    styles.securitySectionCountMain,
                                    { color: "#059669" },
                                  ]}
                                >
                                  풀 수 있는 문항 {sectionCounts.availableCount}
                                  문제
                                </Text>
                                <Text
                                  style={[
                                    styles.securityBreakdownText,
                                    { color: theme.mutedText, marginTop: 2 },
                                  ]}
                                >
                                  전체 {sectionCounts.totalAllCount} · 기출{" "}
                                  {sectionCounts.pastExamCount} · 창작(현행){" "}
                                  {secStandardCreated} · 2027대비{" "}
                                  {sectionCounts.revised2027Count}
                                </Text>
                              </View>

                              <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() =>
                                  handleStartSecuritySectionQuiz(section)
                                }
                                style={[
                                  styles.securitySectionSolveBtn,
                                  {
                                    backgroundColor:
                                      sectionCounts.availableCount > 0
                                        ? "#059669"
                                        : theme.surface,
                                    borderColor:
                                      sectionCounts.availableCount > 0
                                        ? "#059669"
                                        : theme.border,
                                  },
                                ]}
                              >
                                <Text
                                  style={[
                                    styles.securitySectionSolveBtnText,
                                    {
                                      color:
                                        sectionCounts.availableCount > 0
                                          ? "#FFFFFF"
                                          : theme.mutedText,
                                    },
                                  ]}
                                >
                                  이 섹션만 풀기 ({sectionCounts.availableCount}
                                  문제)
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  )}
                </Card>
              );
            })}
          </View>
        ) : (
          <>
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
                            borderColor: selected
                              ? theme.primary
                              : theme.border,
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

            {activeSubjects.map((subject) => {
              const count = QuestionRepository.filterByExam(
                QuestionRepository.getBySubject(subject, selectedCertification),
                examYear,
                examRound,
              ).length;
              const unsolvedQuestions = QuestionRepository.getUnsolvedQuestions(
                attemptedQuestionIds,
                subject,
                examYear,
                examRound,
                selectedCertification,
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
                        <Text
                          style={[styles.subjectName, { color: theme.text }]}
                        >
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
                      <Text
                        style={[styles.subjectCount, { color: theme.subText }]}
                      >
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
          </>
        )}

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
  memoProgressBox: {
    marginTop: 12,
    gap: 8,
  },
  memoProgressLabel: {
    fontSize: 12,
    fontWeight: "700",
  },
  memoActionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 10,
  },
  memoBulkHint: {
    fontSize: 11,
    lineHeight: 16,
    marginTop: 8,
  },
  securityScopeContainer: {
    marginBottom: 8,
  },
  taxonomyBasisBox: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  taxonomyBasisText: {
    fontSize: 11.5,
    fontWeight: "600",
    lineHeight: 16,
  },
  securityModeTabsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  securityModeTab: {
    flex: 1,
    paddingVertical: 9,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  securityModeTabText: {
    fontSize: 12,
    fontWeight: "700",
  },
  securityPastExamResources: {
    gap: 8,
    marginBottom: 12,
  },
  hierarchyStepTitle: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 6,
    paddingHorizontal: 2,
  },
  securitySubjectChips: {
    paddingVertical: 4,
    paddingRight: 8,
  },
  securitySubjectChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 8,
    minWidth: 165,
  },
  securitySubjectChipTitle: {
    fontSize: 13.5,
    fontWeight: "800",
  },
  securitySubjectChipCount: {
    fontSize: 11.5,
    fontWeight: "600",
    marginTop: 3,
  },
  securityChapterCard: {
    marginVertical: 6,
    padding: 14,
    borderWidth: 1.2,
  },
  securityChapterHeader: {
    marginBottom: 10,
  },
  securityChapterBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 6,
    gap: 6,
  },
  securityCodeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  securityCodeBadgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  securityCountPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  securityCountPillText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
  securityChapterTitle: {
    fontSize: 15.5,
    fontWeight: "800",
    marginBottom: 4,
  },
  securityChapterDesc: {
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 4,
  },
  securityBreakdownText: {
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 16,
  },
  securityChapterActionRow: {
    flexDirection: "row",
    gap: 8,
  },
  securityChapterSolveBtn: {
    flex: 1.25,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  securityChapterSolveBtnText: {
    fontSize: 12.5,
    fontWeight: "800",
  },
  securitySectionToggleBtn: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  securitySectionToggleBtnText: {
    fontSize: 12,
    fontWeight: "700",
  },
  securitySectionsList: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    gap: 10,
  },
  securitySectionItem: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  securitySectionTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 6,
    gap: 6,
  },
  securityStandardBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  securityStandardBadgeText: {
    fontSize: 10.5,
    fontWeight: "800",
  },
  securitySectionTitle: {
    fontSize: 13.5,
    fontWeight: "800",
    lineHeight: 19,
    marginBottom: 4,
  },
  securitySectionDesc: {
    fontSize: 11.5,
    lineHeight: 16,
    marginBottom: 8,
  },
  securitySectionFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  securitySectionCountMain: {
    fontSize: 12,
    fontWeight: "800",
  },
  securitySectionSolveBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 9,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  securitySectionSolveBtnText: {
    fontSize: 12,
    fontWeight: "800",
  },
});
