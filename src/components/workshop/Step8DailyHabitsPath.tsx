import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowLeft, Plus, CheckCircle2, Flame, Trash2, Check, Calendar } from 'lucide-react';
import { UserProgress } from '../../types';
import { soundEngine } from '../../utils/audio';

interface Step8DailyHabitsPathProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onComplete: () => void;
}

export const Step8DailyHabitsPath: React.FC<Step8DailyHabitsPathProps> = ({
  progress,
  onUpdateProgress,
  onComplete,
}) => {
  const [newHabit, setNewHabit] = useState('');

  const habits = progress.habitPathStones || [
    { id: 'h-1', title: '۳۰ دقیقه مطالعه تخصصی قبل از شروع روز کاری', completedDays: 14, isDoneToday: true },
    { id: 'h-2', title: '۶۰ دقیقه تمرکز عمیق (Deep Work) بدون گوشی روی پروژه اصلی', completedDays: 9, isDoneToday: true },
    { id: 'h-3', title: 'ثبت درآمد و هزینه‌های روزانه در جدول پایش مالی', completedDays: 21, isDoneToday: false },
    { id: 'h-4', title: 'ورزش سبک و تنفس هوشیارانه صبحگاهی', completedDays: 7, isDoneToday: false },
  ];

  const streak = progress.habitStreak || 12;

  const handleToggleToday = (index: number) => {
    onUpdateProgress((prev) => {
      const current = prev.habitPathStones || habits;
      const updated = current.map((h, i) => {
        if (i === index) {
          const nextState = !h.isDoneToday;
          return {
            ...h,
            isDoneToday: nextState,
            completedDays: nextState ? h.completedDays + 1 : Math.max(0, h.completedDays - 1),
          };
        }
        return h;
      });
      return {
        ...prev,
        habitPathStones: updated,
      };
    });
    soundEngine.playChime(880);
  };

  const handleAddHabit = () => {
    if (!newHabit.trim()) return;
    const item = {
      id: `h-${Date.now()}`,
      title: newHabit.trim(),
      completedDays: 1,
      isDoneToday: true,
    };
    onUpdateProgress((prev) => ({
      ...prev,
      habitPathStones: [...(prev.habitPathStones || habits), item],
    }));
    setNewHabit('');
    soundEngine.playChime(987.77);
  };

  const handleDeleteHabit = (index: number) => {
    onUpdateProgress((prev) => {
      const current = prev.habitPathStones || habits;
      const updated = current.filter((_, i) => i !== index);
      return { ...prev, habitPathStones: updated };
    });
    soundEngine.playTick();
  };

  const totalStones = habits.reduce((acc, h) => acc + h.completedDays, 0);

  return (
    <div className="space-y-6 text-right">
      {/* Title & Concept */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300">
            گام هشتم کارگاه: سیستم سنگفرش عادات روزانه (Daily Habits Path)
          </span>
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span className="font-mono">{streak} روز پیوستگی پیاپی</span>
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          مسیر سنگفرش: هر اقدام روزانه، یک سنگ در زیر پاهای توست
        </h2>
        <div className="text-center p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
          <p className="text-sm sm:text-base font-black text-amber-300 font-serif">
            «شروع کوچک، اما غیرقابل مذاکره»
          </p>
        </div>
      </div>

      {/* Visual Stepping Stone Path */}
      <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-[#060a14] via-[#091124] to-[#04060e] border border-amber-500/30 space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-300 border-b border-slate-800 pb-2">
          <span>مجموع سنگ‌های کار گذاشته‌شده در جاده:</span>
          <span className="font-mono text-amber-400 font-extrabold text-sm">
            {totalStones} سنگفرش زرین
          </span>
        </div>

        {/* Path of stones visual representation */}
        <div className="relative py-4 flex items-center justify-center overflow-x-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            {[...Array(Math.min(14, Math.max(8, habits.length * 2)))].map((_, i) => {
              const isPaved = i < 8;
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-9 h-7 sm:w-11 sm:h-8 rounded-full border flex items-center justify-center text-[10px] font-mono transition-all ${
                      isPaved
                        ? 'bg-gradient-to-b from-amber-400 to-yellow-600 border-amber-200 text-black font-black shadow-[0_0_12px_rgba(245,158,11,0.4)] scale-105'
                        : 'bg-slate-900 border-slate-800 text-slate-600'
                    }`}
                  >
                    {isPaved ? '✦' : '•'}
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono">
                    گام {i + 1}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add New Daily Habit */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-3">
        <label className="block text-xs font-bold text-amber-300">
          سنگفرش جدیدی تعریف کن (کوچک، شفاف، روزانه):
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="مثال: ۱۰ صفحه کتابخوانی هر روز بلافاصله بعد از صبحانه..."
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddHabit()}
            className="flex-1 bg-slate-950/80 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-100 outline-none"
          />
          <button
            onClick={handleAddHabit}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>افزودن به سنگفرش</span>
          </button>
        </div>
      </div>

      {/* Daily Habits Checklist with Streak Counters */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold text-slate-300">
          عادات روزانه تو (روی تیک کلیک کن تا سنگ امروز چیده شود):
        </h4>

        <div className="space-y-2">
          {habits.map((habit, idx) => (
            <div
              key={habit.id}
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                habit.isDoneToday
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggleToday(idx)}
                  className={`w-7 h-7 rounded-xl border flex items-center justify-center transition-all ${
                    habit.isDoneToday
                      ? 'bg-amber-400 border-amber-300 text-black shadow-[0_0_10px_rgba(251,191,36,0.5)]'
                      : 'bg-slate-950 border-slate-700 text-transparent hover:border-slate-500'
                  }`}
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </button>
                <div>
                  <span className={`text-xs sm:text-sm font-bold block ${habit.isDoneToday ? 'line-through text-slate-400' : 'text-white'}`}>
                    {habit.title}
                  </span>
                  <span className="text-[10px] text-amber-400 font-mono mt-0.5 block">
                    {habit.completedDays} روز پیوسته ثبت شد
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleDeleteHabit(idx)}
                className="p-1 text-slate-500 hover:text-red-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Completion Button */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          سنگفرش روزانه فعال شد. آماده ورود به سیستم بازبینی سه‌گانه.
        </span>
        <button
          onClick={onComplete}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95 transition-all"
        >
          <span>تثبیت عادات و رفتن به سیستم پایش</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
