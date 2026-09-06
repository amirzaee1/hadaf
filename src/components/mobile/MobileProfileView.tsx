import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  User,
  Shield,
  Target,
  Flame,
  Calendar,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Edit2,
  Save,
  Clock,
  Award,
} from 'lucide-react';
import { UserProgress } from '../../types';
import { exportUserDataJSON, importUserDataJSON } from '../../utils/storage';
import { soundEngine } from '../../utils/audio';

interface MobileProfileViewProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onResetProgress: () => void;
  onOpenWorkshop: () => void;
}

export const MobileProfileView: React.FC<MobileProfileViewProps> = ({
  progress,
  onUpdateProgress,
  onResetProgress,
  onOpenWorkshop,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(progress.userName || 'مسافر حقیقت');
  const [activeReviewTab, setActiveReviewTab] = useState<'weekly' | 'monthly' | 'quarterly'>('weekly');
  const [fileError, setFileError] = useState<string | null>(null);

  const handleSaveName = () => {
    setIsEditingName(false);
    onUpdateProgress((prev) => ({
      ...prev,
      userName: tempName.trim() || 'مسافر حقیقت',
    }));
    soundEngine.playChime(784);
  };

  const handleToggleHabit = (habitId: string) => {
    onUpdateProgress((prev) => {
      const existing = prev.habitPathStones || [];
      const updated = existing.map((h) => {
        if (h.id === habitId) {
          const nextDone = !h.isDoneToday;
          return {
            ...h,
            isDoneToday: nextDone,
            completedDays: nextDone ? h.completedDays + 1 : Math.max(0, h.completedDays - 1),
          };
        }
        return h;
      });

      const anyDone = updated.some((h) => h.isDoneToday);
      return {
        ...prev,
        habitPathStones: updated,
        habitStreak: anyDone ? Math.max(1, prev.habitStreak || 1) : prev.habitStreak,
      };
    });
    soundEngine.playChime(880);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    importUserDataJSON(
      file,
      (imported) => {
        onUpdateProgress(() => imported);
        soundEngine.playChime(1046.5);
        setFileError(null);
      },
      (err) => {
        setFileError(err);
      }
    );
  };

  const completedChaptersPercent = Math.round(
    (progress.completedChapters.length / 13) * 100
  );

  return (
    <div className="space-y-6 pb-20 text-right">
      {/* Profile Header Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-amber-500/30 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              👑
            </div>
            <div>
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="p-1 px-2 text-sm font-bold bg-slate-950 border border-amber-400 rounded-lg text-white"
                  />
                  <button
                    onClick={handleSaveName}
                    className="p-1.5 rounded-lg bg-amber-500 text-black text-xs font-bold"
                  >
                    <Save className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-white font-serif">
                    {progress.userName || 'مسافر حقیقت'}
                  </h3>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="text-slate-400 hover:text-amber-300 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
              <span className="text-[10px] text-slate-400 block mt-0.5">
                تاریخ آغاز سفر: {progress.creationDate || 'امروز'}
              </span>
            </div>
          </div>

          <div className="text-left font-mono">
            <span className="text-xs font-black text-amber-400">{completedChaptersPercent}٪</span>
            <span className="text-[9px] text-slate-500 block">تکمیل مأموریت</span>
          </div>
        </div>

        {/* Quick Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center">
          <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <span className="text-[10px] text-slate-400 block">فصول طی‌شده</span>
            <span className="text-xs font-mono font-black text-amber-300">
              {progress.completedChapters.length} از ۱۳
            </span>
          </div>
          <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <span className="text-[10px] text-slate-400 block">زنجیره عادات</span>
            <span className="text-xs font-mono font-black text-emerald-400">
              {progress.habitStreak || 0} روز
            </span>
          </div>
          <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <span className="text-[10px] text-slate-400 block">کارگاه عملی</span>
            <span className="text-xs font-mono font-black text-sky-400">
              {Math.min(progress.workshopCompletedSteps?.length || 0, 6)} از ۶
            </span>
          </div>
        </div>
      </div>

      {/* Core Values & Pillars */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-black text-white">ارزش‌های غایی و ستون‌های سه گانه</h4>
          </div>
          <button
            onClick={onOpenWorkshop}
            className="text-[10px] text-amber-400 font-bold hover:underline"
          >
            ویرایش در کارگاه
          </button>
        </div>

        <div className="space-y-2">
          {(progress.foundationPillars || []).slice(0, 3).map((pillar, i) => (
            <div
              key={i}
              className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                <span className="font-bold text-slate-200">{pillar.value}</span>
              </div>
              <span className="text-[10px] text-slate-400 max-w-[130px] truncate">
                {pillar.explanation}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SMART Goal & Immediate Action */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/30 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-black text-white">سازه هدف هوشمند (SMART)</h4>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
            {progress.smartGoal?.timeBound || '۱۴۰۵'}
          </span>
        </div>

        <p className="text-xs font-black text-white leading-relaxed">
          {progress.smartGoal?.specific || 'راه‌اندازی کسب‌وکار آموزشی پایدار'}
        </p>

        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
          <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">متریک اندازه‌گیری:</span>
            <span className="truncate block font-medium">
              {progress.smartGoal?.measurable || '۱,۰۰۰ عضو'}
            </span>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">چرایی سوزان:</span>
            <span className="truncate block font-medium text-amber-200">
              {progress.smartGoal?.burningWhy || 'اثبات اراده آگاهانه'}
            </span>
          </div>
        </div>
      </div>

      {/* Daily Habits Tracker (Direct Check-off on Mobile) */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-black text-white">سنگفرش عادات روزانه (پایش امروز)</h4>
          </div>
          <span className="text-[10px] text-slate-400">لمس برای ثبت</span>
        </div>

        <div className="space-y-2">
          {(progress.habitPathStones || []).map((habit) => (
            <div
              key={habit.id}
              onClick={() => handleToggleHabit(habit.id)}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                habit.isDoneToday
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                  : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2
                  className={`w-4 h-4 ${
                    habit.isDoneToday ? 'text-emerald-400' : 'text-slate-600'
                  }`}
                />
                <span className="text-xs font-bold">{habit.title}</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-amber-400 shrink-0">
                {habit.completedDays} روز
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Triple Review Cadence (Weekly, Monthly, Quarterly) */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-400" />
            <h4 className="text-xs font-black text-white">گاه‌شمار بازبینی سه‌گانه</h4>
          </div>
          <div className="flex gap-1">
            {(['weekly', 'monthly', 'quarterly'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveReviewTab(tab);
                  soundEngine.playTick();
                }}
                className={`text-[9px] px-2 py-0.5 rounded-lg transition-all ${
                  activeReviewTab === tab
                    ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/40'
                    : 'text-slate-500'
                }`}
              >
                {tab === 'weekly' ? 'هفتگی' : tab === 'monthly' ? 'ماهانه' : '۹۰ روزه'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs space-y-2">
          {activeReviewTab === 'weekly' && (
            <>
              <div>
                <span className="text-[10px] text-sky-300 block font-bold">دستاوردهای هفته:</span>
                <p className="text-slate-300 mt-0.5">
                  {progress.tripleReviews?.weekly.progress || 'برنامه‌ریزی و تعهد اولیه کامل شد.'}
                </p>
              </div>
              <div>
                <span className="text-[10px] text-amber-300 block font-bold">اصلاح مسیر:</span>
                <p className="text-slate-300 mt-0.5">
                  {progress.tripleReviews?.weekly.adjustments || 'تمرکز روی ساعات صبحگاهی.'}
                </p>
              </div>
            </>
          )}
          {activeReviewTab === 'monthly' && (
            <div>
              <span className="text-[10px] text-emerald-300 block font-bold">هم‌راستایی با ارزش‌ها:</span>
              <p className="text-slate-300 mt-0.5">
                {progress.tripleReviews?.monthly.alignment || 'در مسیر رشد و استقلال.'}
              </p>
            </div>
          )}
          {activeReviewTab === 'quarterly' && (
            <div>
              <span className="text-[10px] text-yellow-300 block font-bold">افق ۹۰ روزه:</span>
              <p className="text-slate-300 mt-0.5">
                {progress.tripleReviews?.quarterly.goalUpdate || 'به‌روزرسانی سنگ‌نشان‌های کلیدی.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Backup & Persistence Options */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <h4 className="text-xs font-black text-white">پشتیبان‌گیری و همگام‌سازی</h4>
        <p className="text-[11px] text-slate-400">
          اطلاعات پرونده شما به صورت خودکار در حافظه دستگاه ذخیره می‌شود. می‌توانید آن را به صورت فایل JSON استخراج کنید.
        </p>

        {fileError && (
          <p className="text-xs text-rose-400 bg-rose-950/40 p-2 rounded-xl border border-rose-500/30">
            {fileError}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => exportUserDataJSON(progress)}
            className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>دانلود پرونده (JSON)</span>
          </button>

          <label className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-sky-400" />
            <span>بارگذاری پرونده</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        <button
          onClick={onResetProgress}
          className="w-full py-2 px-3 rounded-xl bg-red-950/30 hover:bg-red-900/40 border border-red-500/20 text-rose-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>شروع مجدد کارگاه از ابتدا (پاک‌سازی)</span>
        </button>
      </div>
    </div>
  );
};
