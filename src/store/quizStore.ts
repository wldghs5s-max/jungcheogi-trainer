import { create } from 'zustand';
import { AttemptRepository } from '../repositories/attemptRepository';
import { MissType, QuizAttempt } from '../types/attempt';
import { Question } from '../types/question';
import { checkAnswer, shuffleArray } from '../utils/quiz';

export type QuizSubmitResult =
  | { ok: true; correct: boolean }
  | { ok: false; reason: 'busy' | 'empty' | 'save_failed'; message?: string };

interface QuizState {
  questions: Question[];
  currentIndex: number;
  selectedAnswer: string;
  isSubmitted: boolean;
  isSubmitting: boolean;
  isCorrect: boolean | null;
  missType: MissType | null;
  hintUsed: boolean;
  sessionAttempts: QuizAttempt[];
  sessionTitle: string;
  sessionEpoch: number;

  // Actions
  startQuiz: (questions: Question[], title?: string, options?: { preserveOrder?: boolean }) => void;
  selectAnswer: (ans: string) => void;
  revealHint: () => void;
  submitAnswer: () => Promise<QuizSubmitResult>;
  submitUnknown: () => Promise<QuizSubmitResult>;
  nextQuestion: () => boolean; // 다음 문제가 있으면 true, 퀴즈 종료면 false
  resetQuiz: () => void;
}

function beginSubmit(get: () => QuizState, set: (partial: Partial<QuizState>) => void) {
  const { isSubmitted, isSubmitting, questions } = get();
  if (isSubmitted || isSubmitting || questions.length === 0) {
    return null;
  }
  set({ isSubmitting: true });
  return get().sessionEpoch;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: [],
  currentIndex: 0,
  selectedAnswer: '',
  isSubmitted: false,
  isSubmitting: false,
  isCorrect: null,
  missType: null,
  hintUsed: false,
  sessionAttempts: [],
  sessionTitle: '문제 풀이',
  sessionEpoch: 0,

  startQuiz: (questions, title = '문제 풀이', options) => {
    set({
      questions: options?.preserveOrder ? [...questions] : shuffleArray(questions),
      currentIndex: 0,
      selectedAnswer: '',
      isSubmitted: false,
      isSubmitting: false,
      isCorrect: null,
      missType: null,
      hintUsed: false,
      sessionAttempts: [],
      sessionTitle: title,
      sessionEpoch: get().sessionEpoch + 1,
    });
  },

  selectAnswer: (ans) => {
    if (get().isSubmitted || get().isSubmitting) return;
    set({ selectedAnswer: ans });
  },

  revealHint: () => {
    if (get().isSubmitted) return;
    set({ hintUsed: true });
  },

  submitAnswer: async () => {
    const epoch = beginSubmit(get, set);
    if (epoch == null) return { ok: false, reason: 'busy' as const };

    const {
      questions,
      currentIndex,
      selectedAnswer,
      sessionAttempts,
      hintUsed,
    } = get();
    if (!String(selectedAnswer || '').trim()) {
      set({ isSubmitting: false });
      return { ok: false, reason: 'empty' as const };
    }

    const currentQuestion = questions[currentIndex];
    const isAnswerCorrect = checkAnswer(
      selectedAnswer,
      currentQuestion.answer,
      currentQuestion,
    );
    const missType: MissType | null = isAnswerCorrect ? null : 'WRONG';

    const newAttempt: QuizAttempt = {
      id: `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      questionId: currentQuestion.id,
      selectedAnswer,
      correctAnswer: currentQuestion.answer,
      isCorrect: isAnswerCorrect,
      missType: missType ?? undefined,
      hintUsed: hintUsed || undefined,
      answeredAt: new Date().toISOString(),
      syncStatus: 'PENDING',
    };

    try {
      await AttemptRepository.saveAttempt(newAttempt);
    } catch (error) {
      if (get().sessionEpoch === epoch) {
        set({ isSubmitting: false });
      }
      return {
        ok: false,
        reason: 'save_failed' as const,
        message:
          error instanceof Error
            ? error.message
            : '풀이 기록을 저장하지 못했습니다. 다시 시도해 주세요.',
      };
    }

    if (get().sessionEpoch !== epoch) {
      return { ok: true, correct: isAnswerCorrect };
    }

    set({
      isSubmitted: true,
      isSubmitting: false,
      isCorrect: isAnswerCorrect,
      missType,
      sessionAttempts: [...sessionAttempts, newAttempt],
    });

    return { ok: true, correct: isAnswerCorrect };
  },

  submitUnknown: async () => {
    const epoch = beginSubmit(get, set);
    if (epoch == null) return { ok: false, reason: 'busy' as const };

    const { questions, currentIndex, sessionAttempts } = get();
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

    try {
      await AttemptRepository.saveAttempt(newAttempt);
    } catch (error) {
      if (get().sessionEpoch === epoch) {
        set({ isSubmitting: false });
      }
      return {
        ok: false,
        reason: 'save_failed' as const,
        message:
          error instanceof Error
            ? error.message
            : '풀이 기록을 저장하지 못했습니다. 다시 시도해 주세요.',
      };
    }

    if (get().sessionEpoch !== epoch) {
      return { ok: true, correct: false };
    }

    set({
      isSubmitted: true,
      isSubmitting: false,
      isCorrect: false,
      missType: 'UNKNOWN',
      selectedAnswer: '(모름)',
      sessionAttempts: [...sessionAttempts, newAttempt],
    });
    return { ok: true, correct: false };
  },

  nextQuestion: () => {
    const { currentIndex, questions } = get();
    if (currentIndex + 1 < questions.length) {
      set({
        currentIndex: currentIndex + 1,
        selectedAnswer: '',
        isSubmitted: false,
        isSubmitting: false,
        isCorrect: null,
        missType: null,
        hintUsed: false,
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
      isSubmitting: false,
      isCorrect: null,
      missType: null,
      hintUsed: false,
      sessionAttempts: [],
      sessionEpoch: get().sessionEpoch + 1,
    });
  },
}));
