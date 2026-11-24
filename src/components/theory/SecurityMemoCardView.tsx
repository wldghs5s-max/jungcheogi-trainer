import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  CheckCircle2,
  Lightbulb,
  Layers,
} from "lucide-react-native";
import { SecurityMemoCard } from "../../types/theory";
import { useSettingsStore } from "../../store/settingsStore";
import { COLORS } from "../../utils/theme";
import { Card } from "../common/Card";
import { triggerHaptic } from "../../utils/haptics";

interface SecurityMemoCardViewProps {
  cards: SecurityMemoCard[];
}

/**
 * 정보보안기사 출퇴근 필수 암기 컴포넌트
 * - 출퇴근 중 짧게 볼 수 있도록 '카드 한 장에 개념 하나'를 보여주는 단일 카드 덱 형태를 제공합니다.
 */
export const SecurityMemoCardView: React.FC<SecurityMemoCardViewProps> = ({
  cards,
}) => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [showAllList, setShowAllList] = useState(false);

  // 필터나 검색으로 카드 목록이 바뀌면 첫 번째 카드로 이동
  useEffect(() => {
    setCurrentIndex(0);
    setIsHidden(false);
  }, [cards]);

  if (cards.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { color: theme.mutedText }]}>
          조건에 맞는 필수 암기 카드가 없습니다.
        </Text>
      </View>
    );
  }

  const safeIndex = Math.min(currentIndex, cards.length - 1);
  const activeCard = cards[safeIndex];

  const handlePrev = () => {
    if (safeIndex > 0) {
      triggerHaptic.selection();
      setCurrentIndex(safeIndex - 1);
      setIsHidden(false);
    }
  };

  const handleNext = () => {
    if (safeIndex < cards.length - 1) {
      triggerHaptic.selection();
      setCurrentIndex(safeIndex + 1);
      setIsHidden(false);
    }
  };

  const renderSingleConceptCard = (
    card: SecurityMemoCard,
    indexLabel: string,
  ) => (
    <Card key={card.id} style={styles.conceptCard}>
      {/* 상단 메타: 과목 · 단원 · 중요도 · 카드 번호 */}
      <View style={styles.topRow}>
        <View style={styles.badgeWrap}>
          <View
            style={[
              styles.subjectBadge,
              { backgroundColor: isDarkMode ? "#132E27" : "#D1FAE5" },
            ]}
          >
            <Text style={[styles.subjectBadgeText, { color: "#059669" }]}>
              {card.subject}
            </Text>
          </View>
          <View
            style={[
              styles.categoryBadge,
              { backgroundColor: theme.surfaceSecondary },
            ]}
          >
            <Text style={[styles.categoryBadgeText, { color: theme.subText }]}>
              {card.category}
            </Text>
          </View>
          <View style={styles.starRow}>
            {Array.from({ length: card.importance }).map((_, i) => (
              <Text key={i} style={styles.starIcon}>
                ⭐
              </Text>
            ))}
          </View>
        </View>
        <Text style={[styles.counterBadge, { color: theme.mutedText }]}>
          {indexLabel}
        </Text>
      </View>

      {/* 카드 한 장의 단일 핵심 개념 타이틀 */}
      <View style={styles.conceptHeaderBox}>
        <Text style={[styles.conceptLabel, { color: "#059669" }]}>
          핵심 암기 개념
        </Text>
        <Text style={[styles.conceptTitle, { color: theme.text }]}>
          {card.concept}
        </Text>
      </View>

      {/* 가리고 외우기 토글 바 */}
      <View style={styles.maskActionRow}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => {
            triggerHaptic.selection();
            setIsHidden((prev) => !prev);
          }}
          style={[
            styles.maskBtn,
            {
              backgroundColor: isHidden
                ? theme.accent
                : theme.surfaceSecondary,
            },
          ]}
        >
          {isHidden ? (
            <EyeOff size={14} color="#FFFFFF" />
          ) : (
            <Eye size={14} color={theme.text} />
          )}
          <Text
            style={[
              styles.maskBtnText,
              { color: isHidden ? "#FFFFFF" : theme.text },
            ]}
          >
            {isHidden ? "내용 가림 ON (터치해 정답 보기)" : "내용 가리고 암기 확인"}
          </Text>
        </TouchableOpacity>
      </View>

      {isHidden ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            triggerHaptic.impact();
            setIsHidden(false);
          }}
          style={[
            styles.hiddenCoverBox,
            {
              backgroundColor: theme.surfaceSecondary,
              borderColor: theme.border,
            },
          ]}
        >
          <Text style={[styles.hiddenCoverTitle, { color: theme.text }]}>
            💭 '{card.concept}'의 핵심을 떠올려 보세요
          </Text>
          <Text style={[styles.hiddenCoverSub, { color: theme.subText }]}>
            이 영역을 터치하면 한 줄 정의와 필수 암기 포인트가 표시됩니다.
          </Text>
        </TouchableOpacity>
      ) : (
        <>
          {/* 한 줄 핵심 정의 */}
          <View
            style={[
              styles.oneLinerBox,
              {
                backgroundColor: isDarkMode ? "#1E293B" : "#ECFDF5",
                borderColor: "#059669",
              },
            ]}
          >
            <Text
              style={[
                styles.oneLinerText,
                { color: isDarkMode ? "#E2E8F0" : "#065F46" },
              ]}
            >
              {card.oneLiner}
            </Text>
          </View>

          {/* 필수 암기 포인트 */}
          <View style={styles.pointsSection}>
            {card.keyPoints.map((pt, idx) => (
              <View key={idx} style={styles.pointRow}>
                <CheckCircle2
                  size={15}
                  color="#059669"
                  style={styles.pointIcon}
                />
                <Text style={[styles.pointText, { color: theme.text }]}>
                  {pt}
                </Text>
              </View>
            ))}
          </View>

          {/* 1초 암기 팁 */}
          <View
            style={[
              styles.tipBox,
              {
                backgroundColor: isDarkMode ? "#2D2415" : "#FEFCE8",
                borderColor: isDarkMode ? "#78350F" : "#FDE68A",
              },
            ]}
          >
            <Lightbulb size={15} color="#D97706" style={{ marginTop: 1 }} />
            <Text
              style={[
                styles.tipText,
                { color: isDarkMode ? "#FDE68A" : "#854D0E" },
              ]}
            >
              {card.memoryTip}
            </Text>
          </View>
        </>
      )}

      {/* 하단 키워드 태그 */}
      {!isHidden && card.tags.length > 0 && (
        <View style={styles.tagRow}>
          {card.tags.map((tag, i) => (
            <View
              key={i}
              style={[
                styles.tagChip,
                { backgroundColor: theme.surfaceSecondary },
              ]}
            >
              <Text style={[styles.tagChipText, { color: theme.subText }]}>
                #{tag}
              </Text>
            </View>
          ))}
        </View>
      )}
    </Card>
  );

  return (
    <View>
      {/* 상단 보기 방식 전환 & 카드 인디케이터 */}
      <View style={styles.deckControlRow}>
        <Text style={[styles.deckInfoText, { color: theme.subText }]}>
          카드 1장 = 핵심 개념 1개 ({safeIndex + 1} / {cards.length})
        </Text>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => {
            triggerHaptic.selection();
            setShowAllList((prev) => !prev);
          }}
          style={[
            styles.viewModeBtn,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
          ]}
        >
          <Layers size={13} color={theme.primary} />
          <Text style={[styles.viewModeBtnText, { color: theme.primary }]}>
            {showAllList ? "한 장씩 집중 보기" : "전체 카드 펼쳐보기"}
          </Text>
        </TouchableOpacity>
      </View>

      {!showAllList ? (
        <>
          {/* 단일 개념 카드 (1장 1개념) */}
          {renderSingleConceptCard(
            activeCard,
            `${safeIndex + 1} / ${cards.length}`,
          )}

          {/* 이전 / 다음 개념 카드 넘기기 컨트롤 */}
          <View style={styles.navRow}>
            <TouchableOpacity
              activeOpacity={0.75}
              disabled={safeIndex === 0}
              onPress={handlePrev}
              style={[
                styles.navBtn,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                  opacity: safeIndex === 0 ? 0.45 : 1,
                },
              ]}
            >
              <ChevronLeft size={18} color={theme.text} />
              <Text style={[styles.navBtnText, { color: theme.text }]}>
                이전 개념
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.75}
              disabled={safeIndex === cards.length - 1}
              onPress={handleNext}
              style={[
                styles.navBtn,
                {
                  backgroundColor: "#059669",
                  borderColor: "#059669",
                  opacity: safeIndex === cards.length - 1 ? 0.45 : 1,
                },
              ]}
            >
              <Text style={[styles.navBtnText, { color: "#FFFFFF" }]}>
                다음 개념
              </Text>
              <ChevronRight size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* 하단 빠른 카드 선택 필 */}
          <View style={styles.quickSelectWrap}>
            {cards.map((c, idx) => {
              const active = idx === safeIndex;
              return (
                <TouchableOpacity
                  key={c.id}
                  activeOpacity={0.75}
                  onPress={() => {
                    triggerHaptic.selection();
                    setCurrentIndex(idx);
                    setIsHidden(false);
                  }}
                  style={[
                    styles.quickDotChip,
                    {
                      backgroundColor: active
                        ? "#059669"
                        : theme.surfaceSecondary,
                      borderColor: active ? "#059669" : theme.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.quickDotText,
                      { color: active ? "#FFFFFF" : theme.subText },
                    ]}
                    numberOfLines={1}
                  >
                    {idx + 1}. {c.concept.split(" ")[0]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      ) : (
        cards.map((card, idx) =>
          renderSingleConceptCard(card, `${idx + 1} / ${cards.length}`),
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  deckControlRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  deckInfoText: {
    fontSize: 12.5,
    fontWeight: "700",
  },
  viewModeBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
  },
  viewModeBtnText: {
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 5,
  },
  conceptCard: {
    padding: 18,
    marginVertical: 6,
    borderRadius: 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  badgeWrap: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    flex: 1,
    gap: 6,
  },
  subjectBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  subjectBadgeText: {
    fontSize: 11,
    fontWeight: "800",
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  starRow: {
    flexDirection: "row",
  },
  starIcon: {
    fontSize: 12,
  },
  counterBadge: {
    fontSize: 12,
    fontWeight: "800",
    marginLeft: 8,
  },
  conceptHeaderBox: {
    marginBottom: 12,
  },
  conceptLabel: {
    fontSize: 11.5,
    fontWeight: "800",
    marginBottom: 3,
  },
  conceptTitle: {
    fontSize: 19,
    fontWeight: "900",
    lineHeight: 26,
    letterSpacing: -0.3,
  },
  maskActionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 12,
  },
  maskBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  maskBtnText: {
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 5,
  },
  hiddenCoverBox: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  hiddenCoverTitle: {
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 6,
    textAlign: "center",
  },
  hiddenCoverSub: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
  oneLinerBox: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    marginBottom: 14,
  },
  oneLinerText: {
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 21,
  },
  pointsSection: {
    marginBottom: 12,
  },
  pointRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  pointIcon: {
    marginTop: 2,
    marginRight: 8,
  },
  pointText: {
    flex: 1,
    fontSize: 13.5,
    lineHeight: 20,
  },
  tipBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 12.5,
    fontWeight: "700",
    lineHeight: 18,
    marginLeft: 8,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 2,
  },
  tagChip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagChipText: {
    fontSize: 11,
    fontWeight: "700",
  },
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 8,
  },
  navBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 46,
    borderRadius: 12,
    borderWidth: 1.5,
    gap: 4,
  },
  navBtnText: {
    fontSize: 14,
    fontWeight: "800",
  },
  quickSelectWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 14,
  },
  quickDotChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    maxWidth: "48%",
  },
  quickDotText: {
    fontSize: 11.5,
    fontWeight: "700",
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
