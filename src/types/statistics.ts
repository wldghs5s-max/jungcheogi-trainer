export interface SubjectStat {
  subject: string;
  total: number;
  correct: number;
  rate: number;
}

export interface CategoryStat {
  category: string;
  total: number;
  correct: number;
  rate: number;
}

export interface DayStat {
  date: string; // YYYY-MM-DD
  count: number;
  correct: number;
}

export interface UserStats {
  totalAttempts: number;
  correctAttempts: number;
  accuracyRate: number;
  streakDays: number;
  todaySolvedCount: number;
  subjectStats: Record<string, SubjectStat>;
  categoryStats: Record<string, CategoryStat>;
  weakCategories: CategoryStat[];
  last7DaysStats: DayStat[];
}
