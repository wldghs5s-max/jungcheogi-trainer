import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import {
  Sparkles,
  X,
  Send,
} from "lucide-react-native";
import { useSettingsStore } from "../../store/settingsStore";
import { GeminiService } from "../../api/geminiService";
import { Question } from "../../types/question";
import { triggerHaptic } from "../../utils/haptics";
import { COLORS } from "../../utils/theme";

interface AITutorModalProps {
  visible: boolean;
  question: Question;
  userAnswer?: string | string[];
  onClose: () => void;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  visible,
  question,
  userAnswer,
  onClose,
}) => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const [promptInput, setPromptInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    if (visible) {
      setResponse(null);
      setPromptInput("");
      setLoading(false);
    }
  }, [visible, question.id]);

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      },
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleAsk = async (promptText: string) => {
    if (!promptText.trim() || loading) return;
    triggerHaptic.selection();
    setLoading(true);
    setResponse(null);

    const result = await GeminiService.askTutor({
      question,
      userAnswer,
      userPrompt: promptText,
    });

    setResponse(result);
    setLoading(false);
    triggerHaptic.success();
  };

  const quickQuestions = [
    {
      id: "easy",
      label: "💡 비전공자도 알기 쉽게 설명해줘",
      prompt:
        "이 문제에서 묻고 있는 핵심 개념과 원리를 비전공자도 한 번에 이해할 수 있도록 쉬운 비유와 함께 설명해 주세요.",
    },
    {
      id: "trap",
      label: "🔍 내 오답의 함정과 이유 분석",
      prompt:
        "제가 작성한 오답과 실제 정답을 비교하여, 제가 어떤 개념을 착각했는지와 출제자가 판 함정이 무엇인지 날카롭게 짚어주세요.",
    },
    {
      id: "memorize",
      label: "🧠 실기 시험 1초 암기 공식",
      prompt:
        "이 문제와 관련된 이론이 이번 정처기 실기 시험에 다시 출제되었을 때 절대 헷갈리지 않고 1초 만에 맞출 수 있는 핵심 키워드와 암기 공식(두문자 등)을 알려주세요.",
    },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View
        style={[
          styles.overlay,
          { paddingBottom: Platform.OS === "android" ? keyboardHeight : 0 },
        ]}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => {
            if (keyboardHeight > 0) {
              Keyboard.dismiss();
            } else {
              onClose();
            }
          }}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={[
            styles.sheetContainer,
            { maxHeight: keyboardHeight > 0 ? "96%" : "85%" },
          ]}
        >
          <View style={[styles.modalSheet, { backgroundColor: theme.surface }]}>
            {/* 모달 헤더 */}
            <View style={[styles.header, { borderBottomColor: theme.border }]}>
              <View style={styles.headerLeft}>
                <View
                  style={[
                    styles.aiIconBadge,
                    { backgroundColor: theme.accentLight },
                  ]}
                >
                  <Sparkles size={18} color={theme.accent} />
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={[styles.headerTitle, { color: theme.text }]}>
                    Gemini 1:1 AI 튜터
                  </Text>
                  <Text style={[styles.headerSub, { color: theme.subText }]}>
                    현재 문제 집중 맞춤 해설
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={onClose}
                style={styles.closeBtn}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <X size={22} color={theme.subText} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* 원터치 퀵 질문 칩 */}
              <Text style={[styles.sectionHeading, { color: theme.subText }]}>
                원터치 퀵 질문 선택
              </Text>
              <View style={styles.chipsContainer}>
                {quickQuestions.map((q) => (
                  <TouchableOpacity
                    key={q.id}
                    activeOpacity={0.7}
                    disabled={loading}
                    onPress={() => handleAsk(q.prompt)}
                    style={[
                      styles.chip,
                      {
                        backgroundColor: theme.surfaceSecondary,
                        borderColor: theme.border,
                      },
                    ]}
                  >
                    <Text style={[styles.chipText, { color: theme.text }]}>
                      {q.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* AI 답변 영역 */}
              <View style={styles.responseSection}>
                <Text style={[styles.sectionHeading, { color: theme.subText }]}>
                  튜터의 답변
                </Text>

                {loading ? (
                  <View
                    style={[
                      styles.loadingBox,
                      { backgroundColor: theme.surfaceSecondary },
                    ]}
                  >
                    <ActivityIndicator size="small" color={theme.accent} />
                    <Text
                      style={[styles.loadingText, { color: theme.subText }]}
                    >
                      Gemini AI 튜터가 문제와 코드를 분석하고 있습니다...
                    </Text>
                  </View>
                ) : response ? (
                  <View
                    style={[
                      styles.answerBox,
                      {
                        backgroundColor: theme.surfaceSecondary,
                        borderColor: theme.accentLight,
                      },
                    ]}
                  >
                    <Text style={[styles.answerText, { color: theme.text }]}>
                      {response}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={[
                      styles.placeholderBox,
                      { backgroundColor: theme.surfaceSecondary },
                    ]}
                  >
                    <Text
                      style={[
                        styles.placeholderText,
                        { color: theme.mutedText },
                      ]}
                    >
                      위의 퀵 질문을 터치하거나 아래에 궁금한 점을 직접 질문해
                      보세요!
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>

            {/* 하단 입력창 */}
            <View
              style={[
                styles.inputBar,
                {
                  backgroundColor: theme.surface,
                  borderTopColor: theme.border,
                  paddingBottom:
                    Platform.OS === "android"
                      ? keyboardHeight > 0
                        ? 10
                        : 36
                      : 10,
                },
              ]}
            >
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: theme.surfaceSecondary,
                    color: theme.text,
                    borderColor: theme.border,
                  },
                ]}
                placeholder="궁금한 내용을 직접 질문해 보세요..."
                placeholderTextColor={theme.mutedText}
                value={promptInput}
                onChangeText={setPromptInput}
                editable={!loading}
              />
              <TouchableOpacity
                onPress={() => {
                  handleAsk(promptInput);
                  setPromptInput("");
                }}
                disabled={loading || !promptInput.trim()}
                style={[
                  styles.sendBtn,
                  {
                    backgroundColor: promptInput.trim()
                      ? theme.accent
                      : theme.border,
                  },
                ]}
              >
                <Send size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  sheetContainer: {
    width: "100%",
    minHeight: "55%",
  },
  modalSheet: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  aiIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "800",
  },
  headerSub: {
    fontSize: 12,
    marginTop: 1,
  },
  closeBtn: {
    padding: 4,
  },
  content: {
    padding: 18,
    paddingBottom: 20,
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
  },
  chipsContainer: {
    marginBottom: 16,
  },
  chip: {
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 4,
  },
  chipText: {
    fontSize: 13.5,
    fontWeight: "600",
  },
  responseSection: {
    marginTop: 4,
  },
  loadingBox: {
    padding: 24,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 13,
    marginTop: 10,
  },
  answerBox: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1.5,
  },
  answerText: {
    fontSize: 14,
    lineHeight: 23,
  },
  placeholderBox: {
    padding: 24,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    borderTopWidth: 1,
  },
  textInput: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontSize: 14,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
});
