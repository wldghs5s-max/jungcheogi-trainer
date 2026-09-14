import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ChevronDown, ChevronUp, Lightbulb, CheckCircle2, Target, Play } from "lucide-react-native";
import { TheoryArticle } from "../../types/theory";
import { Question } from "../../types/question";
import { QuestionRepository } from "../../repositories/questionRepository";
import { useSettingsStore } from "../../store/settingsStore";
import { COLORS } from "../../utils/theme";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { triggerHaptic } from "../../utils/haptics";

interface TheoryCardProps {
  article: TheoryArticle;
  onStartQuiz: (questions: Question[], title: string) => void;
}

export const TheoryCard: React.FC<TheoryCardProps> = ({ article, onStartQuiz }) => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    triggerHaptic.selection();
    setExpanded((prev) => !prev);
  };

  const handleLaunchQuiz = () => {
    triggerHaptic.impact();
    const relatedQuestions = QuestionRepository.getTheoryRelatedQuestions(
      article.subject,
      article.relatedKeywords,
      10
    );
    onStartQuiz(relatedQuestions, `${article.title} 개념 확인`);
  };

  return (
    <Card style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={toggleExpand}
        style={styles.headerRow}
      >
        <View style={styles.headerInfo}>
          <View style={styles.badgeRow}>
            <View
              style={[
                styles.categoryBadge,
                { backgroundColor: theme.primaryLight },
              ]}
            >
              <Text style={[styles.categoryText, { color: theme.primary }]}>
                {article.category}
              </Text>
            </View>
            <View style={styles.starRow}>
              {Array.from({ length: article.importance }).map((_, i) => (
                <Text key={i} style={styles.starIcon}>
                  ⭐
                </Text>
              ))}
            </View>
          </View>
          <Text style={[styles.title, { color: theme.text }]}>
            {article.title}
          </Text>
        </View>
        <View style={styles.chevronBox}>
          {expanded ? (
            <ChevronUp size={20} color={theme.mutedText} />
          ) : (
            <ChevronDown size={20} color={theme.mutedText} />
          )}
        </View>
      </TouchableOpacity>

      {/* 접혀있을 때도 보이는 쉬운 일상 비유 (초보자 진입장벽 낮추기) */}
      <View
        style={[
          styles.analogyBox,
          {
            backgroundColor: isDarkMode ? "#1E293B" : "#F0FDF4",
            borderColor: isDarkMode ? "#334155" : "#BBF7D0",
          },
        ]}
      >
        <View style={styles.analogyHeader}>
          <Lightbulb size={16} color="#16A34A" />
          <Text style={[styles.analogyTag, { color: "#16A34A" }]}>
            쉬운 일상 비유로 이해하기
          </Text>
        </View>
        <Text
          style={[
            styles.analogyText,
            { color: isDarkMode ? "#E2E8F0" : "#166534" },
          ]}
        >
          {article.analogy}
        </Text>
      </View>

      {/* 확장 시 보이는 상세 개념 및 시험 포인트 */}
      {expanded && (
        <View style={styles.detailSection}>
          {/* 핵심 개념 불릿 */}
          <Text style={[styles.sectionHeading, { color: theme.text }]}>
            📌 핵심 개념 3분 정리
          </Text>
          {article.coreConcepts.map((concept, idx) => (
            <View key={idx} style={styles.bulletRow}>
              <CheckCircle2
                size={15}
                color={theme.primary}
                style={styles.bulletIcon}
              />
              <Text
                style={[
                  styles.bulletText,
                  { color: isDarkMode ? "#E2E8F0" : theme.text },
                ]}
              >
                {concept}
              </Text>
            </View>
          ))}

          {/* 시험 출제 포인트 & 함정 */}
          <View
            style={[
              styles.examPointsBox,
              {
                backgroundColor: isDarkMode ? "#2D2415" : "#FEFCE8",
                borderColor: isDarkMode ? "#78350F" : "#FEF08A",
              },
            ]}
          >
            <View style={styles.examPointsHeader}>
              <Target size={16} color="#D97706" />
              <Text style={[styles.examPointsTag, { color: "#D97706" }]}>
                시험장 적중 & 함정 주의!
              </Text>
            </View>
            {article.examPoints.map((point, idx) => (
              <Text
                key={idx}
                style={[
                  styles.examPointItem,
                  { color: isDarkMode ? "#FDE68A" : "#854D0E" },
                ]}
              >
                · {point}
              </Text>
            ))}
          </View>

          {/* 관련 문제 즉시 풀기 버튼 */}
          <Button
            title="이 이론 관련 문제 바로 풀기"
            variant="primary"
            onPress={handleLaunchQuiz}
            icon={<Play size={16} color="#FFFFFF" fill="#FFFFFF" />}
            style={styles.quizBtn}
          />
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  headerInfo: {
    flex: 1,
    paddingRight: 8,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "700",
  },
  starRow: {
    flexDirection: "row",
  },
  starIcon: {
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 22,
  },
  chevronBox: {
    paddingTop: 4,
  },
  analogyBox: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
  },
  analogyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  analogyTag: {
    fontSize: 12,
    fontWeight: "800",
    marginLeft: 6,
  },
  analogyText: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "500",
  },
  detailSection: {
    marginTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(100, 116, 139, 0.2)",
    paddingTop: 14,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 10,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bulletIcon: {
    marginTop: 2,
    marginRight: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
  examPointsBox: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 12,
    marginBottom: 14,
  },
  examPointsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  examPointsTag: {
    fontSize: 12,
    fontWeight: "800",
    marginLeft: 6,
  },
  examPointItem: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  quizBtn: {
    height: 44,
    borderRadius: 10,
  },
});
