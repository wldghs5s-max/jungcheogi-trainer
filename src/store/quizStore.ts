import { create } from 'zustand';
import { AttemptRepository } from '../repositories/attemptRepository';
import { MissType, QuizAttempt } from '../types/attempt';
import { Question } from '../types/question';
import { checkAnswer, shuffleArray } from '../utils/quiz';

interface QuizState {
  questions: Question[];
  currentIndex: number;
  selectedAnswer: string;
  isSubmitted: boolean;
  isCorrect: boolean | null;
  missType: MissType | null;
  sessionAttempts: QuizAttempt[];
  sessionTitle: string;

  // Actions
  startQuiz: (questions: Question[], title?: string) => void;
  selectAnswer: (ans: string) => void;
  submitAnswer: () => Promise<boolean>;
  submitUnknown: () => Promise<void>;
  nextQuestion: () => boolean; // 다음 문제가 있으면 true, 퀴즈 종료면 false
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: [],
  currentIndex: 0,
  selectedAnswer: '',
  isSubmitted: false,
  isCorrect: null,
  missType: null,
  sessionAttempts: [],
  sessionTitle: '문제 풀이',

  startQuiz: (questions, title = '문제 풀이') => {
    set({
      questions: shuffleArray(questions),
      currentIndex: 0,
      selectedAnswer: '',
      isSubmitted: false,
      isCorrect: null,
      missType: null,
      sessionAttempts: [],
      sessionTitle: title,
    });
  },

  selectAnswer: (ans) => {
    if (get().isSubmitted) return;
    set({ selectedAnswer: ans });
  },

  submitAnswer: async () => {
    const { questions, currentIndex, selectedAnswer, isSubmitted, sessionAttempts } = get();
    if (isSubmitted || questions.length === 0) return false;

    const currentQuestion = questions[currentIndex];
    const isAnswerCorrect = checkAnswer(selectedAnswer, currentQuestion.answer);
    const missType: MissType | null = isAnswerCorrect ? null : 'WRONG';

    const newAttempt: QuizAttempt = {
      id: `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      questionId: currentQuestion.id,
      selectedAnswer,
      correctAnswer: currentQuestion.answer,
      isCorrect: isAnswerCorrect,
      missType: missType ?? undefined,
      answeredAt: new Date().toISOString(),
      syncStatus: 'PENDING',
    };

    // 로컬 저장소에 영구 보관 (지침 제4, 9조)
    await AttemptRepository.saveAttempt(newAttempt);

    set({
      isSubmitted: true,
      isCorrect: isAnswerCorrect,
      missType,
      sessionAttempts: [...sessionAttempts, newAttempt],
    });

    return isAnswerCorrect;
  },

  submitUnknown: async () => {
    const { questions, currentIndex, isSubmitted, sessionAttempts } = get();
    if (isSubmitted || questions.length === 0) return;

    const currentQuestion = questions[currentIndex];
    const newAttempt: QuizAttempt = {
      id: `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      questionId: currentQuestion.id,
      selectedAnswer: '(모름)',
      correctAnswer: currentQuestion.answer,
      isCorrect: false,
      missType: 'UNKNOWN',
      answeredAt: new Date().toISOString(),
      syncStatus: 'PENDING',
    };

    await AttemptRepository.saveAttempt(newAttempt);

    set({
      isSubmitted: true,
      isCorrect: false,
      missType: 'UNKNOWN',
      selectedAnswer: '(모름)',
      sessionAttempts: [...sessionAttempts, newAttempt],
    });
  },

  nextQuestion: () => {
    const { currentIndex, questions } = get();
    if (currentIndex + 1 < questions.length) {
      set({
        currentIndex: currentIndex + 1,
        selectedAnswer: '',
        isSubmitted: false,
        isCorrect: null,
        missType: null,
      });
      return true;
    }
    return false;
  },

  resetQuiz: () => {
    set({
      questions: [],
      currentIndex: 0,
      selectedAnswer: '',
      isSubmitted: false,
      isCorrect: null,
      missType: null,
      sessionAttempts: [],
    });
  },
}));
