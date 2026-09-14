import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Eye, EyeOff, Sparkles, AlertCircle } from "lucide-react-native";
import { MnemonicItem } from "../../types/theory";
import { useSettingsStore } from "../../store/settingsStore";
import { COLORS } from "../../utils/theme";
import { Card } from "../common/Card";
import { triggerHaptic } from "../../utils/haptics";

interface MnemonicCardProps {
  item: MnemonicItem;
}

export const MnemonicCard: React.FC<MnemonicCardProps> = ({ item }) => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  // 가림판(되뇌이기 모드) 상태: true이면 세부 설명이 가려짐
  const [isMasked, setIsMasked] = useState(false);
  // 개별 아이템 확인 상태
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());

  const handleToggleMask = () => {
    triggerHaptic.selection();
    setIsMasked((prev) => {
      const next = !prev;
      if (next) {
        // 가림판 켤 때는 개별 확인 초기화
        setRevealedIndices(new Set());
      }
      return next;
    });
  };

  const handleRevealIndex = (idx: number) => {
    triggerHaptic.impact();
    setRevealedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  return (
    <Card style={styles.card}>
      {/* 상단 메타 정보 (과목, 빈도, 가림판 버튼) */}
      <View style={styles.topRow}>
        <View style={styles.badgeGroup}>
          <View
            style={[
              styles.subjectBadge,
              { backgroundColor: theme.primaryLight },
            ]}
          >
            <Text style={[styles.subjectBadgeText, { color: theme.primary }]}>
              {item.subject}
            </Text>
          </View>
          <View style={styles.starRow}>
            {Array.from({ length: item.importance }).map((_, i) => (
              <Text key={i} style={styles.starIcon}>
                ⭐
              </Text>
            ))}
          </View>
        </View>

        {/* 되뇌이기 가림판 토글 버튼 */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleToggleMask}
          style={[
            styles.maskToggleBtn,
            {
              backgroundColor: isMasked
                ? theme.accent
                : theme.surfaceSecondary,
            },
          ]}
        >
          {isMasked ? (
            <EyeOff size={14} color="#FFFFFF" />
          ) : (
            <Eye size={14} color={theme.text} />
          )}
          <Text
            style={[
              styles.maskToggleText,
              { color: isMasked ? "#FFFFFF" : theme.text },
            ]}
          >
            {isMasked ? "가림판 ON (되뇌이기)" : "가리고 외우기"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 두음 제목 */}
      <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>

      {/* 출제 빈도 코멘트 */}
      <Text style={[styles.frequency, { color: theme.accent }]}>
        🔥 {item.frequency}
      </Text>

      {/* 대형 두음 배너 (출퇴근 이동 시 눈에 확 띄는 리듬 두음) */}
      <View
        style={[
          styles.acronymBanner,
          {
            backgroundColor: isDarkMode ? "#1E293B" : "#EFF6FF",
            borderColor: theme.primary,
          },
        ]}
      >
        <Text style={[styles.acronymText, { color: theme.primary }]}>
          {item.acronym}
        </Text>
        <View style={styles.catchphraseRow}>
          <Sparkles size={14} color={theme.accent} />
          <Text
            style={[
              styles.catchphraseText,
              { color: isDarkMode ? "#E2E8F0" : "#1E3A8A" },
            ]}
          >
            "{item.catchphrase}"
          </Text>
        </View>
      </View>

      {/* 세부 항목 리스트 (가림판 적용 가능) */}
      <View style={styles.itemsContainer}>
        {item.items.map((sub, idx) => {
          const isItemRevealed = revealedIndices.has(idx);
          const shouldHide = isMasked && !isItemRevealed;

          return (
            <TouchableOpacity
              key={idx}
              activeOpacity={isMasked ? 0.7 : 1}
              onPress={() => isMasked && handleRevealIndex(idx)}
              style={[
                styles.subItemRow,
                { borderBottomColor: theme.border },
                idx === item.items.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              {/* 두음 글자 배지 */}
              <View
                style={[
                  styles.letterBadge,
                  { backgroundColor: theme.primary },
                ]}
              >
                <Text style={styles.letterText}>{sub.letter}</Text>
              </View>

              {/* 내용 영역 */}
              <View style={styles.subItemContent}>
                {shouldHide ? (
                  <View style={styles.hiddenNoticeBox}>
                    <Text style={[styles.hiddenNoticeText, { color: theme.mutedText }]}>
                      ❓ 머릿속으로 떠올린 뒤 터치하여 정답 확인
                    </Text>
                  </View>
                ) : (
                  <>
                    <Text
                      style={[
                        styles.subItemName,
                        { color: theme.text },
                      ]}
                    >
                      {sub.name}
                    </Text>
                    <Text
                      style={[
                        styles.subItemDesc,
                        { color: theme.subText },
                      ]}
                    >
                      {sub.desc}
                    </Text>
                  </>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 시험 함정 방지 팁 박스 */}
      <View
        style={[
          styles.trapBox,
          {
            backgroundColor: isDarkMode ? "#2D1A1A" : "#FEF2F2",
            borderColor: theme.wrong,
          },
        ]}
      >
        <AlertCircle size={15} color={theme.wrong} style={{ marginTop: 1 }} />
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text style={[styles.trapTitle, { color: theme.wrong }]}>
            시험장 함정 주의!
          </Text>
          <Text
            style={[
              styles.trapText,
              { color: isDarkMode ? "#FCA5A5" : "#991B1B" },
            ]}
          >
            {item.trapPoint}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  badgeGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  subjectBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 8,
  },
  subjectBadgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  starRow: {
    flexDirection: "row",
  },
  starIcon: {
    fontSize: 12,
  },
  maskToggleBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  maskToggleText: {
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: "800",
    marginTop: 2,
    lineHeight: 23,
  },
  frequency: {
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4,
    marginBottom: 10,
  },
  acronymBanner: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: "center",
    marginBottom: 14,
  },
  acronymText: {
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 2,
  },
  catchphraseRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  catchphraseText: {
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 6,
    textAlign: "center",
  },
  itemsContainer: {
    marginVertical: 4,
  },
  subItemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 9,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  letterBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginTop: 1,
  },
  letterText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },
  subItemContent: {
    flex: 1,
  },
  subItemName: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 19,
  },
  subItemDesc: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 17,
  },
  hiddenNoticeBox: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: "rgba(100, 116, 139, 0.12)",
  },
  hiddenNoticeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  trapBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 12,
  },
  trapTitle: {
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 2,
  },
  trapText: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "500",
  },
});
