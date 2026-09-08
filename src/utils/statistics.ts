import { QuestionRepository } from '../repositories/questionRepository';
import { QuizAttempt } from '../types/attempt';
import { CategoryStat, DayStat, SubjectStat, UserStats } from '../types/statistics';

export function calculateUserStats(attempts: QuizAttempt[]): UserStats {
  if (!attempts || attempts.length === 0) {
    return {
      totalAttempts: 0,
      correctAttempts: 0,
      accuracyRate: 0,
      streakDays: 0,
      todaySolvedCount: 0,
      subjectStats: {},
      categoryStats: {},
      weakCategories: [],
      last7DaysStats: generateEmptyLast7Days(),
    };
  }

  const totalAttempts = attempts.length;
  const correctAttempts = attempts.filter((a) => a.isCorrect).length;
  const accuracyRate = Math.round((correctAttempts / totalAttempts) * 100);

  // 날짜별 통계 및 스트릭 계산
  const todayStr = getLocalDateString(new Date());
  let todaySolvedCount = 0;
  const dateMap = new Map<string, { count: number; correct: number }>();

  for (const a of attempts) {
    const d = getLocalDateString(new Date(a.answeredAt));
    if (d === todayStr) {
      todaySolvedCount++;
    }
    const current = dateMap.get(d) || { count: 0, correct: 0 };
    current.count++;
    if (a.isCorrect) current.correct++;
    dateMap.set(d, current);
  }

  // 스트릭 계산 (오늘 또는 어제부터 연속으로 푼 날수)
  const streakDays = calculateStreak(dateMap, todayStr);

  // 최근 7일 데이터
  const last7DaysStats: DayStat[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = getLocalDateString(d);
    const stat = dateMap.get(dateStr) || { count: 0, correct: 0 };
    last7DaysStats.push({
      date: dateStr.slice(5), // MM-DD
      count: stat.count,
      correct: stat.correct,
    });
  }

  // 과목별 & 단원별 통계
  const subjectStats: Record<string, SubjectStat> = {};
  const categoryStats: Record<string, CategoryStat> = {};

  for (const a of attempts) {
    const question = QuestionRepository.getById(a.questionId);
    if (!question) continue;

    // 과목 통계
    const subj = question.subject;
    if (!subjectStats[subj]) {
      subjectStats[subj] = { subject: subj, total: 0, correct: 0, rate: 0 };
    }
    subjectStats[subj].total++;
    if (a.isCorrect) subjectStats[subj].correct++;

    // 단원 통계
    const cat = question.category;
    if (!categoryStats[cat]) {
      categoryStats[cat] = { category: cat, total: 0, correct: 0, rate: 0 };
    }
    categoryStats[cat].total++;
    if (a.isCorrect) categoryStats[cat].correct++;
  }

  // 정답률 계산
  Object.values(subjectStats).forEach((s) => {
    s.rate = Math.round((s.correct / s.total) * 100);
  });
  Object.values(categoryStats).forEach((c) => {
    c.rate = Math.round((c.correct / c.total) * 100);
  });

  // 취약 단원 (최소 2문제 이상 풀었고, 정답률이 70% 미만인 단원 오름차순 정렬)
  const weakCategories = Object.values(categoryStats)
    .filter((c) => c.total >= 2 && c.rate < 70)
    .sort((a, b) => a.rate - b.rate);

  return {
    totalAttempts,
    correctAttempts,
    accuracyRate,
    streakDays,
    todaySolvedCount,
    subjectStats,
    categoryStats,
    weakCategories,
    last7DaysStats,
  };
}

function getLocalDateString(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function calculateStreak(dateMap: Map<string, { count: number; correct: number }>, todayStr: string): number {
  let streak = 0;
  const current = new Date();

  // 오늘 문제를 안 풀었더라도 어제까지 풀었으면 스트릭이 유지될 수 있음
  if (!dateMap.has(todayStr)) {
    current.setDate(current.getDate() - 1);
  }

  while (true) {
    const checkStr = getLocalDateString(current);
    if (dateMap.has(checkStr) && (dateMap.get(checkStr)?.count || 0) > 0) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

function generateEmptyLast7Days(): DayStat[] {
  const result: DayStat[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = getLocalDateString(d);
    result.push({
      date: dateStr.slice(5),
      count: 0,
      correct: 0,
    });
  }
  return result;
}
