import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Home,
  BookX,
} from "lucide-react-native";
import { useQuizStore } from "../store/quizStore";
import { useSettingsStore } from "../store/settingsStore";
import { QuestionRepository } from "../repositories/questionRepository";
import { COLORS } from "../utils/theme";
import { Header } from "../components/common/Header";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";

interface ResultScreenProps {
  onGoHome: () => void;
  onGoWrongNote: () => void;
  onRetry: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  onGoHome,
  onGoWrongNote,
  onRetry,
}) => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const { sessionAttempts, questions, sessionTitle } = useQuizStore();

  const total = sessionAttempts.length;
  const correctCount = sessionAttempts.filter((a) => a.isCorrect).length;
  const wrongCount = total - correctCount;
  const scoreRate = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  const getScoreMessage = () => {
    if (scoreRate === 100) return "완벽합니다! 실기 합격 안정권입니다! 🎉";
    if (scoreRate >= 80) return "훌륭한 성적입니다! 조금만 더 다듬어봐요 👍";
    if (scoreRate >= 60)
      return "합격 커트라인(60점)을 넘겼습니다! 오답을 꼭 점검하세요 📈";
    return "실망하지 마세요! 오답노트에서 반복 회독하면 반드시 합격합니다 💪";
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title={`${sessionTitle} 결과`} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* 성적 요약 카드 */}
        <Card style={styles.scoreCard}>
          <Text style={[styles.scoreTitle, { color: theme.subText }]}>
            학습 결과
          </Text>
          <View style={styles.scoreNumberRow}>
            <Text style={[styles.scoreBigNumber, { color: theme.primary }]}>
              {scoreRate}
            </Text>
            <Text style={[styles.scoreUnit, { color: theme.primary }]}>%</Text>
          </View>
          <Text style={[styles.scoreSubtitle, { color: theme.text }]}>
            {total}문제 중{" "}
            <Text style={{ color: theme.correct, fontWeight: "800" }}>
              {correctCount}개 정답
            </Text>{" "}
            (오답 {wrongCount}개)
          </Text>
          <View
            style={[
              styles.messageBox,
              { backgroundColor: theme.surfaceSecondary },
            ]}
          >
            <Text style={[styles.messageText, { color: theme.subText }]}>
              {getScoreMessage()}
            </Text>
          </View>
        </Card>

        {/* 문제별 상세 결과 목록 */}
        <Text style={[styles.listHeading, { color: theme.text }]}>
          문제별 풀이 현황
        </Text>
        {sessionAttempts.map((attempt, index) => {
          const question = QuestionRepository.getById(attempt.questionId);
          if (!question) return null;

          return (
            <Card key={attempt.id} style={styles.attemptItem}>
              <View style={styles.attemptRow}>
                {attempt.isCorrect ? (
                  <CheckCircle2
                    size={20}
                    color={theme.correct}
                    style={styles.icon}
                  />
                ) : (
                  <XCircle size={20} color={theme.wrong} style={styles.icon} />
                )}
                <View style={styles.attemptInfo}>
                  <Text
                    style={[styles.attemptQuestionTitle, { color: theme.text }]}
                    numberOfLines={1}
                  >
                    Q{index + 1}. {question.question}
                  </Text>
                  <Text style={[styles.attemptSub, { color: theme.subText }]}>
                    {question.subject} · {question.category}
                  </Text>
                </View>
              </View>
            </Card>
          );
        })}
      </ScrollView>

      {/* 하단 액션 버튼 */}
      <View
        style={[
          styles.footer,
          { backgroundColor: theme.surface, borderTopColor: theme.border },
        ]}
      >
        <View style={styles.footerRow}>
          {wrongCount > 0 && (
            <Button
              title="오답노트 가기"
              variant="outline"
              onPress={onGoWrongNote}
              style={{ flex: 1, marginRight: 8 }}
              icon={<BookX size={18} color={theme.primary} />}
            />
          )}
          <Button
            title="홈으로 가기"
            variant="primary"
            onPress={onGoHome}
            style={{ flex: 1 }}
            icon={<Home size={18} color="#FFFFFF" />}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  scoreCard: {
    alignItems: "center",
    paddingVertical: 24,
    marginBottom: 20,
  },
  scoreTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  scoreNumberRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginVertical: 6,
  },
  scoreBigNumber: {
    fontSize: 52,
    fontWeight: "900",
  },
  scoreUnit: {
    fontSize: 24,
    fontWeight: "800",
    marginLeft: 4,
  },
  scoreSubtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },
  messageBox: {
    marginTop: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  messageText: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  listHeading: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  attemptItem: {
    marginVertical: 4,
    padding: 14,
  },
  attemptRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
  attemptInfo: {
    flex: 1,
  },
  attemptQuestionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 3,
  },
  attemptSub: {
    fontSize: 12,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === "android" ? 40 : 24,
    borderTopWidth: 1,
  },
  footerRow: {
    flexDirection: "row",
  },
});
