import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Platform,
  StatusBar as RNStatusBar,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSettingsStore } from "./src/store/settingsStore";
import { useUserStore } from "./src/store/userStore";
import { useQuizStore } from "./src/store/quizStore";
import { Question } from "./src/types/question";
import { QuestionRepository } from "./src/repositories/questionRepository";
import { COLORS } from "./src/utils/theme";

// 컴포넌트 및 화면 임포트
import { BottomTabBar, TabType } from "./src/components/common/BottomTabBar";
import { HomeScreen } from "./src/screens/HomeScreen";
import { QuizScreen } from "./src/screens/QuizScreen";
import { ResultScreen } from "./src/screens/ResultScreen";
import { WrongNoteScreen } from "./src/screens/WrongNoteScreen";
import { StatisticsScreen } from "./src/screens/StatisticsScreen";
import { SettingsScreen } from "./src/screens/SettingsScreen";

type AppMode = "TABS" | "QUIZ" | "RESULT";

export default function App() {
  const { isDarkMode, loadSettings } = useSettingsStore();
  const { loadUserSettings } = useUserStore();
  const { startQuiz, resetQuiz, questions, sessionTitle } = useQuizStore();

  const [mode, setMode] = useState<AppMode>("TABS");
  const [currentTab, setCurrentTab] = useState<TabType>("home");

  useEffect(() => {
    loadSettings();
    loadUserSettings();
    QuestionRepository.loadCachedServerQuestions();
  }, [loadSettings, loadUserSettings]);

  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  // 퀴즈 시작 핸들러
  const handleStartQuiz = (targetQuestions: Question[], title: string) => {
    startQuiz(targetQuestions, title);
    setMode("QUIZ");
  };

  // 퀴즈 종료 (결과 화면 진입)
  const handleFinishQuiz = () => {
    setMode("RESULT");
  };

  // 퀴즈 중도 나가기
  const handleExitQuiz = () => {
    resetQuiz();
    setMode("TABS");
  };

  // 결과 화면 -> 홈
  const handleGoHomeFromResult = () => {
    resetQuiz();
    setCurrentTab("home");
    setMode("TABS");
  };

  // 결과 화면 -> 오답노트
  const handleGoWrongNoteFromResult = () => {
    resetQuiz();
    setCurrentTab("wrong_note");
    setMode("TABS");
  };

  // 결과 화면 -> 재도전
  const handleRetryQuiz = () => {
    startQuiz(questions, sessionTitle);
    setMode("QUIZ");
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.surface }]}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        {mode === "QUIZ" && (
          <QuizScreen onFinish={handleFinishQuiz} onExit={handleExitQuiz} />
        )}

        {mode === "RESULT" && (
          <ResultScreen
            onGoHome={handleGoHomeFromResult}
            onGoWrongNote={handleGoWrongNoteFromResult}
            onRetry={handleRetryQuiz}
          />
        )}

        {mode === "TABS" && (
          <View style={styles.tabContent}>
            {currentTab === "home" && (
              <HomeScreen
                onStartQuiz={handleStartQuiz}
                onGoWrongNote={() => setCurrentTab("wrong_note")}
                onGoStats={() => setCurrentTab("statistics")}
              />
            )}
            {currentTab === "wrong_note" && (
              <WrongNoteScreen onStartQuiz={handleStartQuiz} />
            )}
            {currentTab === "statistics" && <StatisticsScreen />}
            {currentTab === "settings" && <SettingsScreen />}

            {/* 하단 공통 탭 바 */}
            <BottomTabBar currentTab={currentTab} onTabChange={setCurrentTab} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
  },
});
