/**
 * LAYER 3: USER DATA - HABIT DATA & REVIEWS
 * Models and helpers for tracking daily micro-habits, streaks,
 * and triple reviews (Weekly, Monthly, Quarterly).
 */

import { UserProgress } from '../types';

export interface HabitItem {
  id: string;
  title: string;
  completedDays: number;
  isDoneToday: boolean;
  twoMinuteAction: string;
}

export interface TripleReviewsData {
  weekly: { progress: string; obstacles: string; adjustments: string };
  monthly: { alignment: string; energy: string };
  quarterly: { goalUpdate: string; newDirection: string };
}

export const DEFAULT_HABITS: HabitItem[] = [
  {
    id: 'habit-1',
    title: '۳۰ دقیقه کار عمیق صبحگاهی بر روی مأموریت اصلی',
    completedDays: 14,
    isDoneToday: true,
    twoMinuteAction: 'باز کردن دفترچه و نوشتن ۳ اولویت اصلی روز',
  },
  {
    id: 'habit-2',
    title: '۲۰ دقیقه مطالعه تخصصی یا ارتقای مهارت کلیدی',
    completedDays: 10,
    isDoneToday: false,
    twoMinuteAction: 'خواندن تنها ۱ صفحه از کتاب برگزیده',
  },
  {
    id: 'habit-3',
    title: 'ارزیابی شبانه و مرور زاویه حرکت به سوی فانوس',
    completedDays: 21,
    isDoneToday: true,
    twoMinuteAction: 'ثبت یک جمله شکرگزاری و یک دستاورد روز',
  },
];

export function getActiveHabits(progress: UserProgress): HabitItem[] {
  if (progress.habitPathStones && progress.habitPathStones.length > 0) {
    return progress.habitPathStones.map((h) => ({
      id: h.id,
      title: h.title,
      completedDays: h.completedDays,
      isDoneToday: h.isDoneToday,
      twoMinuteAction: progress.dailyRituals?.twoMinuteRule || 'شروع فوری با کمترین اصطکاک',
    }));
  }
  return DEFAULT_HABITS;
}

export function computeHabitStreak(habits: HabitItem[]): number {
  if (!habits.length) return 0;
  return Math.max(...habits.map((h) => h.completedDays));
}
