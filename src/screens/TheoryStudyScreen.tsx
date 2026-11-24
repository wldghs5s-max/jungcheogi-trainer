import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  Sparkles,
  BookOpen,
  Search,
  X,
  Flame,
  Zap,
  ShieldCheck,
} from "lucide-react-native";
import { Subject, Question } from "../types/question";
import { SUBJECTS, SECURITY_SUBJECTS } from "../data/questions";
import { THEORY_DATA } from "../data/theory/theoryData";
import { MNEMONIC_DATA } from "../data/theory/mnemonicData";
import {
  SECURITY_THEORY_DATA,
  SECURITY_MEMO_CARDS,
} from "../data/security";
import { TheoryCard } from "../components/theory/TheoryCard";
import { MnemonicCard } from "../components/theory/MnemonicCard";
import { SecurityMemoCardView } from "../components/theory/SecurityMemoCardView";
import { useSettingsStore } from "../store/settingsStore";
import { COLORS } from "../utils/theme";
import { Card } from "../components/common/Card";
import { triggerHaptic } from "../utils/haptics";

interface TheoryStudyScreenProps {
  onStartQuiz: (questions: Question[], title: string) => void;
  initialMode?: "mnemonic" | "theory";
}

type StudyMode = "mnemonic" | "theory";

export const TheoryStudyScreen: React.FC<TheoryStudyScreenProps> = ({
  onStartQuiz,
  initialMode = "mnemonic",
}) => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const selectedCertification =
    useSettingsStore((state) => state.selectedCertification) ?? "JUNGCHEOGI";
  const isSecurity = selectedCertification === "SECURITY";
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const [mode, setMode] = useState<StudyMode>(initialMode);
  const [selectedSubject, setSelectedSubject] = useState<Subject | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    setSelectedSubject("ALL");
    setSearchQuery("");
  }, [selectedCertification]);

  const activeSubjects: Subject[] = isSecurity ? SECURITY_SUBJECTS : SUBJECTS;
  const activeTheorySource = isSecurity ? SECURITY_THEORY_DATA : THEORY_DATA;

  const handleSelectMode = (newMode: StudyMode) => {
    if (mode !== newMode) {
      triggerHaptic.selection();
      setMode(newMode);
    }
  };

  const handleSelectSubject = (subject: Subject | "ALL") => {
    triggerHaptic.selection();
    setSelectedSubject(subject);
  };

  // 정처기 두음 데이터 필터링
  const filteredMnemonics = useMemo(() => {
    return MNEMONIC_DATA.filter((item) => {
      if (selectedSubject !== "ALL" && item.subject !== selectedSubject) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const text = `${item.title} ${item.acronym} ${item.catchphrase} ${item.trapPoint} ${item.items.map((i) => `${i.letter} ${i.name}`).join(" ")}`.toLowerCase();
        return text.includes(query);
      }
      return true;
    });
  }, [selectedSubject, searchQuery]);

  // 정보보안기사 필수 암기 카드 필터링 (1장 1개념)
  const filteredSecurityMemoCards = useMemo(() => {
    return SECURITY_MEMO_CARDS.filter((card) => {
      if (selectedSubject !== "ALL" && card.subject !== selectedSubject) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const text = `${card.concept} ${card.category} ${card.oneLiner} ${card.keyPoints.join(" ")} ${card.memoryTip} ${card.tags.join(" ")}`.toLowerCase();
        return text.includes(query);
      }
      return true;
    });
  }, [selectedSubject, searchQuery]);

  // 이론 데이터 필터링 (자격증별)
  const filteredTheories = useMemo(() => {
    return activeTheorySource.filter((item) => {
      if (selectedSubject !== "ALL" && item.subject !== selectedSubject) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const text = `${item.title} ${item.category} ${item.analogy} ${item.coreConcepts.join(" ")} ${item.examPoints.join(" ")}`.toLowerCase();
        return text.includes(query);
      }
      return true;
    });
  }, [activeTheorySource, selectedSubject, searchQuery]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* 헤더 */}
      <View
        style={[
          styles.header,
          { backgroundColor: theme.surface, borderBottomColor: theme.border },
        ]}
      >
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          {isSecurity ? "정보보안기사 이론 & 필수 암기" : "이론 & 두음 암기"}
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.subText }]}>
          {isSecurity
            ? "5과목 핵심 이론 요약 & 출퇴근 1장 1개념 필수 암기 카드"
            : "초보자 핵심 개념 & 출퇴근 1초 고빈출 두음"}
        </Text>

        {/* 상단 탭 세그먼트 */}
        <View
          style={[
            styles.segmentContainer,
            { backgroundColor: theme.surfaceSecondary },
          ]}
        >
          {isSecurity ? (
            <>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleSelectMode("theory")}
                style={[
                  styles.segmentBtn,
                  mode === "theory" && {
                    backgroundColor: theme.primary,
                  },
                ]}
              >
                <BookOpen
                  size={16}
                  color={mode === "theory" ? "#FFFFFF" : theme.mutedText}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[
                    styles.segmentText,
                    {
                      color: mode === "theory" ? "#FFFFFF" : theme.mutedText,
                      fontWeight: mode === "theory" ? "800" : "600",
                    },
                  ]}
                >
                  이론 ({SECURITY_THEORY_DATA.length})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleSelectMode("mnemonic")}
                style={[
                  styles.segmentBtn,
                  mode === "mnemonic" && {
                    backgroundColor: "#059669",
                  },
                ]}
              >
                <ShieldCheck
                  size={16}
                  color={mode === "mnemonic" ? "#FFFFFF" : theme.mutedText}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[
                    styles.segmentText,
                    {
                      color: mode === "mnemonic" ? "#FFFFFF" : theme.mutedText,
                      fontWeight: mode === "mnemonic" ? "800" : "600",
                    },
                  ]}
                >
                  필수 암기 ({SECURITY_MEMO_CARDS.length})
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleSelectMode("mnemonic")}
                style={[
                  styles.segmentBtn,
                  mode === "mnemonic" && {
                    backgroundColor: theme.accent,
                  },
                ]}
              >
                <Flame
                  size={16}
                  color={mode === "mnemonic" ? "#FFFFFF" : theme.mutedText}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[
                    styles.segmentText,
                    {
                      color: mode === "mnemonic" ? "#FFFFFF" : theme.mutedText,
                      fontWeight: mode === "mnemonic" ? "800" : "600",
                    },
                  ]}
                >
                  1초 두음 암기장 ({MNEMONIC_DATA.length})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleSelectMode("theory")}
                style={[
                  styles.segmentBtn,
                  mode === "theory" && {
                    backgroundColor: theme.primary,
                  },
                ]}
              >
                <BookOpen
                  size={16}
                  color={mode === "theory" ? "#FFFFFF" : theme.mutedText}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[
                    styles.segmentText,
                    {
                      color: mode === "theory" ? "#FFFFFF" : theme.mutedText,
                      fontWeight: mode === "theory" ? "800" : "600",
                    },
                  ]}
                >
                  핵심 이론 요약 ({THEORY_DATA.length})
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {/* 검색 바 & 과목 필터 칩 */}
      <View style={[styles.filterBar, { backgroundColor: theme.surface }]}>
        <View
          style={[
            styles.searchBox,
            {
              backgroundColor: theme.surfaceSecondary,
              borderColor: theme.border,
            },
          ]}
        >
          <Search size={16} color={theme.mutedText} style={{ marginRight: 8 }} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder={
              isSecurity
                ? mode === "mnemonic"
                  ? "필수 암기 개념 검색 (예: SetUID, XSS, Bell-LaPadula)"
                  : "보안 이론 검색 (예: 특수 권한, DoS, ISMS-P)"
                : mode === "mnemonic"
                  ? "두음, 키워드 검색 (예: 추빌팩, 결합도, ACID)"
                  : "이론 검색 (예: 디자인패턴, 정규화, 포인터)"
            }
            placeholderTextColor={theme.mutedText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery("")}
              hitSlop={8}
            >
              <X size={16} color={theme.mutedText} />
            </TouchableOpacity>
          )}
        </View>

        {/* 과목 필터 칩 스크롤 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.subjectChipsScroll}
        >
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => handleSelectSubject("ALL")}
            style={[
              styles.subjectChip,
              {
                backgroundColor:
                  selectedSubject === "ALL"
                    ? mode === "mnemonic"
                      ? isSecurity
                        ? "#059669"
                        : theme.accent
                      : theme.primary
                    : theme.surfaceSecondary,
                borderColor:
                  selectedSubject === "ALL"
                    ? mode === "mnemonic"
                      ? isSecurity
                        ? "#059669"
                        : theme.accent
                      : theme.primary
                    : theme.border,
              },
            ]}
          >
            <Text
              style={[
                styles.subjectChipText,
                {
                  color: selectedSubject === "ALL" ? "#FFFFFF" : theme.text,
                },
              ]}
            >
              전체 과목
            </Text>
          </TouchableOpacity>

          {activeSubjects.map((sub) => {
            const isSelected = selectedSubject === sub;
            const activeChipColor =
              mode === "mnemonic"
                ? isSecurity
                  ? "#059669"
                  : theme.accent
                : theme.primary;
            return (
              <TouchableOpacity
                key={sub}
                activeOpacity={0.75}
                onPress={() => handleSelectSubject(sub)}
                style={[
                  styles.subjectChip,
                  {
                    backgroundColor: isSelected
                      ? activeChipColor
                      : theme.surfaceSecondary,
                    borderColor: isSelected ? activeChipColor : theme.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.subjectChipText,
                    { color: isSelected ? "#FFFFFF" : theme.text },
                  ]}
                >
                  {sub}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* 본문 콘텐츠 */}
      <ScrollView
        contentContainerStyle={styles.contentList}
        showsVerticalScrollIndicator={false}
      >
        {mode === "mnemonic" ? (
          isSecurity ? (
            <>
              {/* 정보보안기사 필수 암기 상단 안내 배너 */}
              <Card
                style={[
                  styles.tipBanner,
                  {
                    backgroundColor: isDarkMode ? "#132E27" : "#ECFDF5",
                    borderColor: isDarkMode ? "#059669" : "#A7F3D0",
                  },
                ]}
              >
                <View style={styles.tipHeader}>
                  <ShieldCheck size={18} color="#059669" />
                  <Text style={[styles.tipTitle, { color: "#059669" }]}>
                    출퇴근 1장 1개념 필수 암기 카드
                  </Text>
                </View>
                <Text
                  style={[
                    styles.tipDesc,
                    { color: isDarkMode ? "#E2E8F0" : "#065F46" },
                  ]}
                >
                  출퇴근 중 짧게 집중할 수 있도록{" "}
                  <Text style={{ fontWeight: "700" }}>카드 한 장에 개념 하나</Text>
                  씩 보여줍니다. '내용 가리고 암기 확인'을 눌러 스스로 떠올린 뒤
                  다음 개념으로 넘겨 보세요!
                </Text>
              </Card>

              <SecurityMemoCardView cards={filteredSecurityMemoCards} />
            </>
          ) : (
            <>
              {/* 정처기 두음 모드 상단 안내 배너 */}
              <Card
                style={[
                  styles.tipBanner,
                  {
                    backgroundColor: isDarkMode ? "#1E293B" : "#FEF3C7",
                    borderColor: isDarkMode ? "#334155" : "#FDE68A",
                  },
                ]}
              >
                <View style={styles.tipHeader}>
                  <Zap size={18} color="#D97706" />
                  <Text style={[styles.tipTitle, { color: "#D97706" }]}>
                    지하철 1초 되뇌이기 암기법
                  </Text>
                </View>
                <Text
                  style={[
                    styles.tipDesc,
                    { color: isDarkMode ? "#E2E8F0" : "#78350F" },
                  ]}
                >
                  각 카드의 <Text style={{ fontWeight: "700" }}>'가리고 외우기'</Text>를 누르면 두음만 남고 상세 내용이 가려집니다. 입으로 소리내어 말해본 뒤 카드를 터치해 맞춰보세요!
                </Text>
              </Card>

              {filteredMnemonics.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={[styles.emptyText, { color: theme.mutedText }]}>
                    검색 결과에 맞는 두음 암기 항목이 없습니다.
                  </Text>
                </View>
              ) : (
                filteredMnemonics.map((item) => (
                  <MnemonicCard key={item.id} item={item} />
                ))
              )}
            </>
          )
        ) : (
          <>
            {/* 핵심 이론 모드 상단 안내 배너 */}
            <Card
              style={[
                styles.tipBanner,
                {
                  backgroundColor: isDarkMode ? "#1E293B" : "#EFF6FF",
                  borderColor: isDarkMode ? "#334155" : "#BFDBFE",
                },
              ]}
            >
              <View style={styles.tipHeader}>
                <Sparkles size={18} color={theme.primary} />
                <Text style={[styles.tipTitle, { color: theme.primary }]}>
                  {isSecurity
                    ? "정보보안기사 5과목 핵심 이론 요약"
                    : "초보자 눈높이 3분 핵심 이론"}
                </Text>
              </View>
              <Text
                style={[
                  styles.tipDesc,
                  { color: isDarkMode ? "#E2E8F0" : "#1E3A8A" },
                ]}
              >
                {isSecurity
                  ? "필기 빈출 개념을 일상 비유와 시험 출제 포인트로 정리했습니다. 이론 카드를 펼친 뒤 하단의 '이 이론 관련 문제 바로 풀기'로 객관식 문제를 바로 풀어보세요!"
                  : "용어가 낯선 초보자를 위해 친숙한 일상 비유로 쉽게 풀었습니다. 이론을 읽은 뒤 하단의 '관련 문제 풀기'로 기억을 정착시키세요!"}
              </Text>
            </Card>

            {filteredTheories.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={[styles.emptyText, { color: theme.mutedText }]}>
                  검색 결과에 맞는 이론 요약 항목이 없습니다.
                </Text>
              </View>
            ) : (
              filteredTheories.map((article) => (
                <TheoryCard
                  key={article.id}
                  article={article}
                  onStartQuiz={onStartQuiz}
                />
              ))
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
    marginBottom: 10,
  },
  segmentContainer: {
    flexDirection: "row",
    padding: 3,
    borderRadius: 10,
  },
  segmentBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 9,
    borderRadius: 8,
  },
  segmentText: {
    fontSize: 13,
  },
  filterBar: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(100, 116, 139, 0.15)",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    paddingVertical: 0,
  },
  subjectChipsScroll: {
    paddingVertical: 2,
  },
  subjectChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    marginRight: 6,
  },
  subjectChipText: {
    fontSize: 12,
    fontWeight: "700",
  },
  contentList: {
    padding: 16,
    paddingBottom: 40,
  },
  tipBanner: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  tipHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: "800",
    marginLeft: 6,
  },
  tipDesc: {
    fontSize: 12,
    lineHeight: 18,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
