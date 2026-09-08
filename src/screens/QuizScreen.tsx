import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
} from "react-native";
import {
  Bookmark as BookmarkIcon,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react-native";
import { useQuizStore } from "../store/quizStore";
import { useSettingsStore } from "../store/settingsStore";
import { BookmarkRepository } from "../repositories/bookmarkRepository";
import { CodeViewer } from "../components/code/CodeViewer";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { AITutorModal } from "../components/quiz/AITutorModal";
import { ProgressBar } from "../components/common/ProgressBar";
import { triggerHaptic } from "../utils/haptics";
import { formatAnswerDisplay } from "../utils/quiz";
import { COLORS } from "../utils/theme";

interface QuizScreenProps {
  onFinish: () => void;
  onExit?: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ onFinish, onExit }) => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const {
    questions,
    currentIndex,
    selectedAnswer,
    isSubmitted,
    isCorrect,
    sessionTitle,
    selectAnswer,
    submitAnswer,
    nextQuestion,
  } = useQuizStore();

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isTutorOpen, setIsTutorOpen] = useState(false);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (currentQuestion) {
      BookmarkRepository.isBookmarked(currentQuestion.id).then(setIsBookmarked);
    }
  }, [currentQuestion]);

  if (!currentQuestion) {
    return null;
  }

  const handleToggleBookmark = async () => {
    triggerHaptic.selection();
    const state = await BookmarkRepository.toggle(currentQuestion.id);
    setIsBookmarked(state);
  };

  const handleExitPress = () => {
    Alert.alert(
      "퀴즈 나가기",
      "진행 중인 퀴즈를 중단하고 홈으로 돌아가시겠습니까?",
      [
        { text: "계속 풀기", style: "cancel" },
        {
          text: "홈으로 나가기",
          style: "destructive",
          onPress: () => (onExit || onFinish)(),
        },
      ],
    );
  };

  const handleSubmit = async () => {
    if (!selectedAnswer.trim()) return;
    const correct = await submitAnswer();
    if (correct) {
      triggerHaptic.success();
    } else {
      triggerHaptic.error();
    }
  };

  const handleNext = () => {
    triggerHaptic.selection();
    const hasNext = nextQuestion();
    if (!hasNext) {
      onFinish();
    }
  };

  const progress = (currentIndex + 1) / questions.length;

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* 상단 네비 바 & 프로그레스 */}
        <View
          style={[
            styles.header,
            { backgroundColor: theme.surface, borderBottomColor: theme.border },
          ]}
        >
          <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={handleExitPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={[styles.exitText, { color: theme.subText }]}>
                나가기
              </Text>
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.text }]}>
              {sessionTitle} ({currentIndex + 1}/{questions.length})
            </Text>
            <View style={styles.headerRightActions}>
              <TouchableOpacity
                onPress={() => {
                  triggerHaptic.selection();
                  setIsTutorOpen(true);
                }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={{ marginRight: 12 }}
              >
                <Sparkles size={22} color={theme.accent} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleToggleBookmark}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <BookmarkIcon
                  size={22}
                  color={isBookmarked ? theme.primary : theme.mutedText}
                  fill={isBookmarked ? theme.primary : "transparent"}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ProgressBar progress={progress} height={4} />
        </View>

        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 과목 & 유형 태그 */}
          <View style={styles.tagRow}>
            <Badge label={currentQuestion.subject} variant="primary" />
            <View style={{ width: 6 }} />
            <Badge label={currentQuestion.category} variant="default" />
            <View style={{ width: 6 }} />
            <Badge
              label={
                currentQuestion.difficulty === "HARD"
                  ? "난이도: 어려움"
                  : currentQuestion.difficulty === "MEDIUM"
                    ? "난이도: 보통"
                    : "난이도: 쉬움"
              }
              variant={
                currentQuestion.difficulty === "HARD"
                  ? "danger"
                  : currentQuestion.difficulty === "MEDIUM"
                    ? "accent"
                    : "success"
              }
            />
            <View style={{ width: 6 }} />
            <Badge
              label={
                currentQuestion.type === "SHORT_ANSWER"
                  ? "단답형"
                  : currentQuestion.type === "CODE_TRACE"
                    ? "코드 추적"
                    : currentQuestion.type === "SQL"
                      ? "SQL 실기"
                      : "객관식"
              }
              variant="default"
            />
          </View>

          {/* 문제 지문 */}
          <Text style={[styles.questionText, { color: theme.text }]}>
            {currentQuestion.question}
          </Text>

          {/* 소스 코드 스니펫 */}
          {currentQuestion.code && (
            <CodeViewer
              code={currentQuestion.code}
              language={currentQuestion.language}
            />
          )}

          {/* 문제 풀이 인터페이스 */}
          {currentQuestion.options && currentQuestion.options.length > 0 ? (
            /* 객관식 보기 영역 */
            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = selectedAnswer === opt;
                return (
                  <TouchableOpacity
                    key={idx}
                    activeOpacity={0.7}
                    disabled={isSubmitted}
                    onPress={() => {
                      triggerHaptic.selection();
                      selectAnswer(opt);
                    }}
                    style={[
                      styles.optionCard,
                      {
                        backgroundColor: isSelected
                          ? theme.primaryLight
                          : theme.surface,
                        borderColor: isSelected ? theme.primary : theme.border,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.optionRadio,
                        {
                          borderColor: isSelected
                            ? theme.primary
                            : theme.mutedText,
                          backgroundColor: isSelected
                            ? theme.primary
                            : "transparent",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.optionRadioNumber,
                          { color: isSelected ? "#FFFFFF" : theme.subText },
                        ]}
                      >
                        {idx + 1}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.optionText,
                        {
                          color: isSelected ? theme.primary : theme.text,
                          fontWeight: isSelected ? "700" : "400",
                        },
                      ]}
                    >
                      {opt}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            /* 단답형 / 주관식 직접 입력 영역 */
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: theme.surface,
                    borderColor: isSubmitted
                      ? isCorrect
                        ? theme.correct
                        : theme.wrong
                      : theme.border,
                    color: theme.text,
                  },
                ]}
                placeholder="답안을 입력하세요 (영문/한글)"
                placeholderTextColor={theme.mutedText}
                value={selectedAnswer}
                onChangeText={selectAnswer}
                editable={!isSubmitted}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          )}

          {/* 해설 & 판정 결과 카드 */}
          {isSubmitted && (
            <View
              style={[
                styles.resultCard,
                {
                  backgroundColor: isCorrect
                    ? theme.correctLight
                    : theme.wrongLight,
                  borderColor: isCorrect ? theme.correct : theme.wrong,
                },
              ]}
            >
              <View style={styles.resultHeader}>
                {isCorrect ? (
                  <>
                    <CheckCircle2 size={24} color={theme.correct} />
                    <Text
                      style={[styles.resultTitle, { color: theme.correct }]}
                    >
                      정답입니다! 🎉
                    </Text>
                  </>
                ) : (
                  <>
                    <XCircle size={24} color={theme.wrong} />
                    <Text style={[styles.resultTitle, { color: theme.wrong }]}>
                      오답입니다
                    </Text>
                  </>
                )}
              </View>

              <View style={styles.answerRow}>
                <Text style={[styles.answerLabel, { color: theme.subText }]}>
                  정답 :
                </Text>
                <Text style={[styles.answerValue, { color: theme.text }]}>
                  {formatAnswerDisplay(currentQuestion.answer)}
                </Text>
              </View>

              {!isCorrect && (
                <View style={styles.answerRow}>
                  <Text style={[styles.answerLabel, { color: theme.subText }]}>
                    내 답 :
                  </Text>
                  <Text style={[styles.myAnswerValue, { color: theme.wrong }]}>
                    {selectedAnswer || "(미입력)"}
                  </Text>
                </View>
              )}

              <View style={styles.divider} />

              <Text style={[styles.explanationTitle, { color: theme.text }]}>
                💡 해설
              </Text>
              <Text style={[styles.explanationText, { color: theme.text }]}>
                {currentQuestion.explanation}
              </Text>

              {currentQuestion.keywords &&
                currentQuestion.keywords.length > 0 && (
                  <View style={styles.keywordContainer}>
                    {currentQuestion.keywords.map((kw, i) => (
                      <Text
                        key={i}
                        style={[styles.keywordText, { color: theme.subText }]}
                      >
                        #{kw}{" "}
                      </Text>
                    ))}
                  </View>
                )}

              {/* Gemini AI 튜터 질문 버튼 */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  triggerHaptic.selection();
                  setIsTutorOpen(true);
                }}
                style={[
                  styles.aiTutorButton,
                  {
                    backgroundColor: theme.accentLight,
                    borderColor: theme.accent,
                  },
                ]}
              >
                <Sparkles size={18} color={theme.accent} />
                <Text
                  style={[styles.aiTutorButtonText, { color: theme.accent }]}
                >
                  ✨ Gemini AI 튜터에게 이 문제 과외받기
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        {/* 하단 고정 액션 버튼 */}
        <View
          style={[
            styles.bottomBar,
            { backgroundColor: theme.surface, borderTopColor: theme.border },
          ]}
        >
          {!isSubmitted ? (
            <Button
              title="정답 확인하기"
              disabled={!selectedAnswer.trim()}
              onPress={handleSubmit}
            />
          ) : (
            <Button
              title={
                currentIndex + 1 < questions.length ? "다음 문제" : "결과 보기"
              }
              variant={isCorrect ? "success" : "primary"}
              onPress={handleNext}
              icon={<ArrowRight size={18} color="#FFFFFF" />}
            />
          )}
        </View>

        {/* Gemini AI 튜터 모달 */}
        {currentQuestion && (
          <AITutorModal
            visible={isTutorOpen}
            question={currentQuestion}
            userAnswer={selectedAnswer}
            onClose={() => setIsTutorOpen(false)}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    borderBottomWidth: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  exitText: {
    fontSize: 14,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 40,
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  questionText: {
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 25,
    marginBottom: 10,
  },
  optionsContainer: {
    marginTop: 14,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    marginBottom: 10,
  },
  optionRadio: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  optionRadioNumber: {
    fontSize: 13,
    fontWeight: "700",
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
  },
  inputContainer: {
    marginTop: 16,
  },
  textInput: {
    height: 54,
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "500",
  },
  resultCard: {
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 16,
    marginTop: 20,
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginLeft: 8,
  },
  answerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  answerLabel: {
    fontSize: 14,
    fontWeight: "600",
    width: 50,
  },
  answerValue: {
    fontSize: 15,
    fontWeight: "700",
    flex: 1,
  },
  myAnswerValue: {
    fontSize: 15,
    fontWeight: "700",
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    marginVertical: 12,
  },
  explanationTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
  },
  explanationText: {
    fontSize: 14,
    lineHeight: 22,
  },
  keywordContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  keywordText: {
    fontSize: 12,
    fontWeight: "600",
  },
  headerRightActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  aiTutorButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    marginTop: 14,
  },
  aiTutorButtonText: {
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 8,
  },
  bottomBar: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === "android" ? 56 : 28,
    borderTopWidth: 1,
  },
});
