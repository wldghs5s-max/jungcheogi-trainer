export interface QuizAttempt {
  id: string;
  questionId: string;
  selectedAnswer: string | string[];
  correctAnswer: string | string[];
  isCorrect: boolean;
  answeredAt: string; // ISO String
  syncStatus?: 'PENDING' | 'SYNCED' | 'FAILED';
}
