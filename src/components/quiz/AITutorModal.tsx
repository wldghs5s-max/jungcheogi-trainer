import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Platform,
  Keyboard,
  KeyboardEvent,
  useWindowDimensions,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Sparkles, X, Send, ChevronUp } from "lucide-react-native";
import { getKeyboardOverlapHeight } from "../../utils/keyboardLayout";
import { useSettingsStore } from "../../store/settingsStore";
import {
  GeminiService,
  TutorChatMessageItem,
} from "../../api/geminiService";
import {
  TutorChatMessage,
  TutorRepository,
} from "../../repositories/tutorRepository";
import { Question } from "../../types/question";
import { triggerHaptic } from "../../utils/haptics";
import { COLORS } from "../../utils/theme";
import { parseTutorMarkdownLine } from "../../utils/textFormatter";

interface AITutorModalProps {
  visible: boolean;
  question: Question;
  userAnswer?: string | string[];
  missType?: "WRONG" | "UNKNOWN" | null;
  autoAskChapter?: boolean;
  onClose: () => void;
}

const CHAPTER_LESSON_PROMPT = `이 문제를 「모른다」고 표시했습니다. 오답 분석은 하지 말고, 교재에서 이 내용이 나오는 단원(챕터)을 펼쳐 보여 주듯이 핵심 개념과 바로 옆 연관 내용까지 설명해 주세요.`;

/**
 * 마크다운 텍스트에서 불필요한 별표(*, **) 기호를 정리하고,
 * 볼드체(**텍스트**)와 불릿 기호(* -> •)를 모바일 환경에 맞게 깔끔하게 렌더링합니다.
 */
export function renderFormattedTutorText(
  rawText: string,
  baseStyle: any,
  boldStyle: any,
) {
  if (!rawText) return null;

  const lines = rawText.split("\n");

  return lines.map((line, lineIdx) => {
    const { bulletPrefix, segments } = parseTutorMarkdownLine(line);

    return (
      <Text key={`line-${lineIdx}`} style={baseStyle}>
        {bulletPrefix ? bulletPrefix : null}
        {segments.map((seg, segIdx) => (
          <Text
            key={`seg-${segIdx}`}
            style={seg.isBold ? boldStyle : baseStyle}
          >
            {seg.text}
          </Text>
        ))}
        {lineIdx < lines.length - 1 ? "\n" : ""}
      </Text>
    );
  });
}

export const AITutorModal: React.FC<AITutorModalProps> = (props) => {
  return (
    <Modal
      visible={props.visible}
      animationType="slide"
      transparent
      statusBarTranslucent
      onRequestClose={props.onClose}
    >
      <SafeAreaProvider>
        <AITutorModalBody {...props} />
      </SafeAreaProvider>
    </Modal>
  );
};

const AITutorModalBody: React.FC<AITutorModalProps> = ({
  visible,
  question,
  userAnswer,
  missType,
  autoAskChapter = false,
  onClose,
}) => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const { height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const didAutoAskRef = useRef(false);
  const latestTutorOffsetRef = useRef(0);
  const pendingAnswerScrollIdRef = useRef<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const activeQuestionIdRef = useRef<string>(question.id);
  activeQuestionIdRef.current = question.id;
  const isUnknown = missType === "UNKNOWN";

  const [promptInput, setPromptInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<TutorChatMessage[]>([]);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [hasTutorAnswer, setHasTutorAnswer] = useState(false);
  const [historyReady, setHistoryReady] = useState(false);

  useEffect(() => {
    // 이전 문제 또는 이전 모달의 진행 중인 요청 즉시 네트워크 취소
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    didAutoAskRef.current = false;
    latestTutorOffsetRef.current = 0;
    pendingAnswerScrollIdRef.current = null;
    setPromptInput("");
    setLoading(false);
    setHistoryReady(false);

    if (!visible) {
      setKeyboardHeight(0);
      setMessages([]);
      setHasTutorAnswer(false);
      return;
    }

    let cancelled = false;
    (async () => {
      const thread = await TutorRepository.getThread(question.id);
      if (cancelled) return;
      if (thread && thread.messages.length > 0) {
        setMessages(thread.messages);
        setHasTutorAnswer(thread.messages.some((msg) => msg.role === "tutor"));
        didAutoAskRef.current = true;
      } else {
        setMessages([]);
        setHasTutorAnswer(false);
      }
      setHistoryReady(true);
    })();

    return () => {
      cancelled = true;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, [visible, question.id]);

  const scrollToLatest = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });
  };

  const scrollToAnswerStart = (animated = true) => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        y: Math.max(0, latestTutorOffsetRef.current - 8),
        animated,
      });
    });
  };

  useEffect(() => {
    const handleShow = (e: KeyboardEvent) => {
      setKeyboardHeight(getKeyboardOverlapHeight(e, windowHeight));
    };
    const handleHide = () => {
      setKeyboardHeight(0);
    };

    const showSubs = [
      Keyboard.addListener("keyboardDidShow", handleShow),
      ...(Platform.OS === "ios"
        ? [Keyboard.addListener("keyboardWillShow", handleShow)]
        : []),
    ];
    const hideSubs = [
      Keyboard.addListener("keyboardDidHide", handleHide),
      ...(Platform.OS === "ios"
        ? [Keyboard.addListener("keyboardWillHide", handleHide)]
        : []),
    ];

    return () => {
      showSubs.forEach((sub) => sub.remove());
      hideSubs.forEach((sub) => sub.remove());
    };
  }, [windowHeight]);

  const topSafeMargin = insets.top + 12;
  const sheetBottomPad =
    keyboardHeight > 0 ? keyboardHeight : Math.max(insets.bottom, 12);

  const maxAllowedHeight = windowHeight - topSafeMargin;
  const currentSheetHeight =
    keyboardHeight > 0
      ? maxAllowedHeight
      : Math.min(windowHeight * 0.85, maxAllowedHeight);

  const handleAsk = async (promptText: string, displayText?: string) => {
    if (!promptText.trim()) return;
    triggerHaptic.selection();

    // 이전 진행 중이던 요청이 있으면 즉시 중단 (Race condition 차단)
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    const targetQuestionId = question.id;

    const userText = (displayText ?? promptText).trim();
    const userMessage: TutorChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: userText,
    };

    // 이전 대화 히스토리 (현재 질문 이전까지의 히스토리)
    const chatHistory: TutorChatMessageItem[] = messages
      .filter((m) => m.text.trim().length > 0)
      .map((m) => ({
        role: m.role === "user" ? "user" : "model",
        text: m.text,
      }));

    const tutorId = `tutor-${Date.now()}`;
    const tutorPlaceholder: TutorChatMessage = {
      id: tutorId,
      role: "tutor",
      text: "",
    };

    pendingAnswerScrollIdRef.current = tutorId;
    setMessages((prev) => [...prev, userMessage, tutorPlaceholder]);
    setLoading(true);
    scrollToLatest();

    try {
      const result = await GeminiService.askTutorStream(
        {
          question,
          userAnswer: isUnknown ? undefined : userAnswer,
          userPrompt: promptText,
          missType: missType ?? undefined,
          history: chatHistory,
        },
        (accumulatedText) => {
          if (
            controller.signal.aborted ||
            activeQuestionIdRef.current !== targetQuestionId
          ) {
            return;
          }
          setMessages((prev) => {
            if (activeQuestionIdRef.current !== targetQuestionId) return prev;
            return prev.map((msg) =>
              msg.id === tutorId ? { ...msg, text: accumulatedText } : msg,
            );
          });
          scrollToLatest();
        },
        {
          signal: controller.signal,
        },
      );

      // 모달이 닫혔거나, 요청이 취소되었거나, 다른 문제로 이동했으면 상태 갱신 무시
      if (
        controller.signal.aborted ||
        activeQuestionIdRef.current !== targetQuestionId
      ) {
        return;
      }

      if (!result || !result.trim()) {
        // 결과가 비어있는 경우 플레이스홀더 정리
        setMessages((prev) => prev.filter((msg) => msg.id !== tutorId));
        return;
      }

      setMessages((prev) => {
        if (activeQuestionIdRef.current !== targetQuestionId) return prev;
        const next = prev.map((msg) =>
          msg.id === tutorId ? { ...msg, text: result } : msg,
        );
        void TutorRepository.saveThread(targetQuestionId, next);
        return next;
      });
      setHasTutorAnswer(true);
      triggerHaptic.success();
    } catch (err: unknown) {
      if (
        controller.signal.aborted ||
        (err instanceof Error && err.name === "AbortError")
      ) {
        return;
      }
      if (activeQuestionIdRef.current !== targetQuestionId) {
        return;
      }
      console.warn("[AITutorModal] askTutorStream error:", err);
      // 에러 발생 시 텍스트가 없는 플레이스홀더 정리
      setMessages((prev) =>
        prev.filter(
          (msg) => msg.id !== tutorId || msg.text.trim().length > 0,
        ),
      );
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
        if (activeQuestionIdRef.current === targetQuestionId) {
          setLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    if (
      !visible ||
      !historyReady ||
      !autoAskChapter ||
      !isUnknown ||
      didAutoAskRef.current
    ) {
      return;
    }
    didAutoAskRef.current = true;
    const timer = setTimeout(() => {
      void handleAsk(
        CHAPTER_LESSON_PROMPT,
        "📘 이 단원(챕터) 개념부터 설명해줘",
      );
    }, 120);
    return () => clearTimeout(timer);
  }, [visible, question.id, autoAskChapter, isUnknown, historyReady]);

  const quickQuestions = isUnknown
    ? [
        {
          id: "chapter",
          label: "📘 이 단원(챕터) 개념부터 설명해줘",
          prompt: CHAPTER_LESSON_PROMPT,
        },
        {
          id: "related",
          label: "🔗 이 문제와 연관된 주변 개념",
          prompt:
            "이 문제가 속한 단원에서 바로 앞뒤에 나오는 연관 개념, 비슷한 용어, 자주 같이 출제되는 포인트를 정리해 주세요. 오답 분석은 하지 마세요.",
        },
        {
          id: "memorize",
          label: "🧠 실기 시험 1초 암기 공식",
          prompt:
            "이 단원 전체를 시험장에서 1초 만에 떠올릴 수 있는 핵심 키워드와 암기 공식(두문자 등)을 알려주세요.",
        },
      ]
    : [
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
      <View style={styles.overlay}>
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

        <View
          style={[
            styles.sheetContainer,
            {
              height: currentSheetHeight,
              maxHeight: maxAllowedHeight,
            },
          ]}
        >
          <View
            style={[
              styles.modalSheet,
              {
                backgroundColor: theme.surface,
                paddingBottom: sheetBottomPad,
              },
            ]}
          >
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
                    {isUnknown
                      ? "모름 · 단원(챕터) 확장 해설"
                      : "현재 문제 집중 맞춤 해설"}
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
              ref={scrollRef}
              style={{ flex: 1 }}
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="interactive"
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
                    onPress={() => handleAsk(q.prompt, q.label)}
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

              <Text style={[styles.sectionHeading, { color: theme.subText }]}>
                튜터의 답변
              </Text>

              {messages.length === 0 && !loading ? (
                <View
                  style={[
                    styles.placeholderBox,
                    { backgroundColor: theme.surfaceSecondary },
                  ]}
                >
                  <Text
                    style={[styles.placeholderText, { color: theme.mutedText }]}
                  >
                    {isUnknown
                      ? "단원 전체 개념을 불러오는 중이거나, 퀵 질문으로 주변 개념을 더 물어볼 수 있어요."
                      : "위의 퀵 질문을 터치하거나 아래에 궁금한 점을 직접 질문해 보세요!"}
                  </Text>
                </View>
              ) : (
                messages.map((msg) =>
                  msg.role === "user" ? (
                    <View key={msg.id} style={styles.userBubbleWrap}>
                      <View
                        style={[
                          styles.userBubble,
                          { backgroundColor: theme.accent },
                        ]}
                      >
                        <Text style={styles.userBubbleText}>{msg.text}</Text>
                      </View>
                    </View>
                  ) : msg.text.trim().length > 0 ? (
                    <View
                      key={msg.id}
                      style={[
                        styles.answerBox,
                        {
                          backgroundColor: theme.surfaceSecondary,
                          borderColor: theme.accentLight,
                        },
                      ]}
                      onLayout={(event) => {
                        latestTutorOffsetRef.current =
                          event.nativeEvent.layout.y;
                        if (pendingAnswerScrollIdRef.current === msg.id) {
                          pendingAnswerScrollIdRef.current = null;
                          scrollToAnswerStart();
                        }
                      }}
                    >
                      {renderFormattedTutorText(
                        msg.text,
                        [styles.answerText, { color: theme.text }],
                        [styles.answerText, { color: theme.text, fontWeight: "700" }],
                      )}
                    </View>
                  ) : null,
                )
              )}

              {loading && (
                <View
                  style={[
                    styles.loadingBox,
                    { backgroundColor: theme.surfaceSecondary },
                  ]}
                >
                  <ActivityIndicator size="small" color={theme.accent} />
                  <Text style={[styles.loadingText, { color: theme.subText }]}>
                    {messages.some((m) => m.role === "tutor" && m.text.length > 0)
                      ? "Gemini AI 튜터가 답변을 작성하고 있습니다..."
                      : "Gemini AI 튜터가 문제와 코드를 분석하고 있습니다..."}
                  </Text>
                </View>
              )}
            </ScrollView>

            {hasTutorAnswer && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  triggerHaptic.selection();
                  scrollToAnswerStart();
                }}
                style={[
                  styles.jumpToAnswerBtn,
                  {
                    backgroundColor: theme.accentLight,
                    borderColor: theme.accent,
                  },
                ]}
              >
                <ChevronUp size={16} color={theme.accent} />
                <Text
                  style={[styles.jumpToAnswerText, { color: theme.accent }]}
                >
                  답변 시작부터 보기
                </Text>
              </TouchableOpacity>
            )}

            {/* 하단 입력창 */}
            <View
              style={[
                styles.inputBar,
                {
                  backgroundColor: theme.surface,
                  borderTopColor: theme.border,
                  paddingBottom: 10,
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
                returnKeyType="send"
                onSubmitEditing={() => {
                  if (!promptInput.trim() || loading) return;
                  handleAsk(promptInput);
                  setPromptInput("");
                }}
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
        </View>
      </View>
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
  userBubbleWrap: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  userBubble: {
    maxWidth: "88%",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderBottomRightRadius: 4,
  },
  userBubbleText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#FFFFFF",
    fontWeight: "600",
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
    marginBottom: 10,
  },
  jumpToAnswerBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: 8,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  jumpToAnswerText: {
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 4,
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
