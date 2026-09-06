import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Award,
  Shield,
  Compass,
  Calendar,
  Heart,
  CheckCircle2,
  FileText,
  Flame,
  Feather,
  TowerControl as Lighthouse,
  Printer,
  RotateCcw,
} from 'lucide-react';
import { UserProgress } from '../../types';
import { soundEngine } from '../../utils/audio';

interface PersonalDashboardProps {
  progress: UserProgress;
  onOpenFinalScene: () => void;
  onSelectStep: (step: number) => void;
}

export const PersonalDashboard: React.FC<PersonalDashboardProps> = ({
  progress,
  onOpenFinalScene,
  onSelectStep,
}) => {
  const pillars = progress.foundationPillars || [
    { value: 'آزادی و استقلال (Freedom)', priority: 1, explanation: 'ستون اساسی خودمختاری' },
    { value: 'رشد و تسلط شخصی (Growth)', priority: 2, explanation: 'ارتقای مداوم توانمندی‌ها' },
    { value: 'امنیت مالی (Financial Security)', priority: 3, explanation: 'آرامش و جریان پایدار' },
  ];

  const engine = progress.goalEngineProfile || {
    archetype: progress.personalityWorld || 'green',
    strengths: ['تحلیل سیستماتیک', 'ثبات قدم در روزمرگی', 'طراحی پروتکل‌های بدون اصطکاک'],
    motivations: 'دیدن سیستمی که خودکار و دقیق کار می‌کند',
    preferredGoalStyle: 'اهداف ساختاریافته با شاخص‌های دقیق KPI',
  };

  const dream = progress.futureVisionWorld || {
    location: 'خانه مدرن نزدیک طبیعت سرسبز کوهستانی',
    occupation: 'رهبری محصولات دیجیتال و آموزش انسان‌ها',
    companion: 'همسر وفادار، خانواده صمیمی و یاران خردمند',
    feeling: 'آرامش عمیق درون و اشتیاق به آفرینش',
  };

  const smart = progress.smartBuilding || {
    specific: progress.smartGoal?.specific || 'راه‌اندازی محصول ابری با ۱۰,۰۰۰ کاربر فعال',
    measurable: progress.smartGoal?.measurable || 'درآمد ۵۰۰ میلیون تومان ماهانه و رضایت ۹۶٪',
    achievable: progress.smartGoal?.achievable || 'منابع فنی فعلی + یادگیری مارکتینگ بین‌المللی',
    relevant: progress.smartGoal?.relevant || 'هم‌راستا با آزادی و استقلال و رشد شخصی',
    timeBound: progress.smartGoal?.timeBound || '۳۱ شهریور ۱۴۰۵',
    firstAction: 'شروع اولین پیش‌نویس ۵ ویژگی کلیدی امشب',
    isCompleted: true,
  };

  const roots = progress.deepWhyRoots || [
    'تا فرزندانم الگوی زنده‌ای از شجاعت و پایمردی ببینند',
    'تا هرگز با حسرت روزهای رفته از خواب بیدار نشوم',
    'تا مأمن امن و حامی بی‌دریغ خانواده باشم',
    'چون پتانسیل‌های من حیف است خاموش بمانند',
    'برای اثبات قدرت اراده انسانی در تغییر سرنوشت',
  ];

  const habits = progress.habitPathStones || [
    { id: '1', title: '۳۰ دقیقه مطالعه تخصصی روزانه', completedDays: 14, isDoneToday: true },
    { id: '2', title: '۶۰ دقیقه کار عمیق روی مأموریت اصلی', completedDays: 9, isDoneToday: true },
  ];

  const completedCount = progress.completedChapters.length;
  const totalChapters = 13;
  const progressPercent = Math.round((completedCount / totalChapters) * 100);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 text-right select-none">
      {/* Cinematic Map Header with Atmospheric Badge & Summit Action */}
      <div className="relative p-5 rounded-3xl bg-gradient-to-b from-[#0e162e] via-[#080d1e] to-[#04060e] border border-amber-500/40 shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden">
        <div className="absolute inset-0 bg-radial from-amber-500/15 via-transparent to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-extrabold border border-amber-500/40 flex items-center gap-1.5 shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                <Compass className="w-3 h-3 text-amber-400" />
                <span>اطلس سینمایی سرنوشت • CINEMATIC MAP</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-800">
                {progress.userName || 'مسافر آگاه'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-serif mt-2">
              نقشه سینمایی قلمرو درونی و مأموریت من
            </h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              سنتز ارگانیک ۷ لایه اصلی هویت، جهت، رویا، ارزش‌ها، هدف، چرایی و عادات تسخیرناپذیر
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
              title="چاپ کارنامه مأموریت"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>چاپ اطلس</span>
            </button>

            <button
              onClick={onOpenFinalScene}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all active:scale-95"
            >
              <Lighthouse className="w-4 h-4" />
              <span>فانوس قله</span>
            </button>
          </div>
        </div>

        {/* Cinematic Path Constellation Bar across top */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
          <span className="text-slate-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>نورافشانی مسیر:</span>
            <strong className="text-amber-300 font-mono">{completedCount} از {totalChapters} ایستگاه</strong>
          </span>
          <div className="flex items-center gap-2">
            <div className="w-28 sm:w-36 h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-amber-400 font-mono font-bold">{progressPercent}٪</span>
          </div>
        </div>
      </div>

      {/* 7 CINEMATIC MAP REGIONS */}
      <div className="space-y-4">
        {/* ROW 1: MY VALUES & MY PERSONALITY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1. MY VALUES (ارزش‌های من) */}
          <div
            onClick={() => onSelectStep(2)}
            className="p-5 rounded-3xl bg-gradient-to-br from-[#0c1326] to-[#060914] border border-amber-500/35 space-y-3 cursor-pointer hover:border-amber-400 transition-all shadow-[0_4px_25px_rgba(0,0,0,0.5)] group"
          >
            <div className="flex items-center justify-between border-b border-slate-800/90 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-amber-500/20 text-amber-300 text-sm">🏛️</span>
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-white">۱. اقلیم ارزش‌های من (My Values)</h3>
                  <span className="text-[10px] text-slate-400">ستون‌های غیرقابل مذاکره هویت</span>
                </div>
              </div>
              <span className="text-[10px] text-amber-400 font-mono group-hover:underline">ویرایش ✎</span>
            </div>

            <div className="space-y-2">
              {pillars.slice(0, 3).map((p, i) => (
                <div key={i} className="p-2.5 rounded-2xl bg-slate-950/75 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-[10px] flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-xs font-bold text-amber-200">
                      {p.value}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 truncate max-w-[130px]">
                    {p.explanation}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. MY PERSONALITY (موتور شخصیت من) */}
          <div
            onClick={() => onSelectStep(4)}
            className="p-5 rounded-3xl bg-gradient-to-br from-[#0b1922] to-[#040a10] border border-emerald-500/35 space-y-3 cursor-pointer hover:border-emerald-400 transition-all shadow-[0_4px_25px_rgba(0,0,0,0.5)] group"
          >
            <div className="flex items-center justify-between border-b border-slate-800/90 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-sm">🧭</span>
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-white">۲. موتور روان و شخصیت من (My Personality)</h3>
                  <span className="text-[10px] text-slate-400">کهن‌الگو و فرکانس طبیعی وجود</span>
                </div>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono group-hover:underline">ویرایش ✎</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-2xl bg-slate-950/75 border border-slate-800">
                <span className="text-emerald-300 font-bold block text-[11px]">نقاط قوت ذاتی:</span>
                <span className="text-slate-300 block mt-0.5">{engine.strengths?.join(' • ')}</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-slate-950/75 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-amber-300 font-bold block text-[11px]">سبک ایده‌آل هدف:</span>
                  <span className="text-slate-300 text-[11px]">{engine.preferredGoalStyle}</span>
                </div>
                <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-[10px] uppercase">
                  جهان {engine.archetype}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: MY FUTURE VISION & MY GOAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 3. MY FUTURE VISION (چشم‌انداز ۵ ساله من) */}
          <div
            onClick={() => onSelectStep(3)}
            className="p-5 rounded-3xl bg-gradient-to-br from-[#10142e] to-[#060814] border border-sky-500/35 space-y-3 cursor-pointer hover:border-sky-400 transition-all shadow-[0_4px_25px_rgba(0,0,0,0.5)] group"
          >
            <div className="flex items-center justify-between border-b border-slate-800/90 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-sky-500/20 text-sky-300 text-sm">🪟</span>
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-white">۳. پنجره رویا و افق ۵ ساله (My Future Vision)</h3>
                  <span className="text-[10px] text-slate-400">تصویر واضح از آینده آرمانی</span>
                </div>
              </div>
              <span className="text-[10px] text-sky-400 font-mono group-hover:underline">ویرایش ✎</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-2xl bg-slate-950/75 border border-slate-800">
                <span className="text-sky-300 font-bold block text-[10px]">محیط و مسکن:</span>
                <span className="text-slate-200 block mt-0.5 truncate text-[11px]">{dream.location}</span>
              </div>
              <div className="p-2 rounded-2xl bg-slate-950/75 border border-slate-800">
                <span className="text-amber-300 font-bold block text-[10px]">رسالت و کار:</span>
                <span className="text-slate-200 block mt-0.5 truncate text-[11px]">{dream.occupation}</span>
              </div>
              <div className="p-2 rounded-2xl bg-slate-950/75 border border-slate-800">
                <span className="text-rose-300 font-bold block text-[10px]">همراهان راه:</span>
                <span className="text-slate-200 block mt-0.5 truncate text-[11px]">{dream.companion}</span>
              </div>
              <div className="p-2 rounded-2xl bg-slate-950/75 border border-slate-800">
                <span className="text-emerald-300 font-bold block text-[10px]">احساس غالب:</span>
                <span className="text-slate-200 block mt-0.5 truncate text-[11px]">{dream.feeling}</span>
              </div>
            </div>
          </div>

          {/* 4. MY GOAL (هدف هوشمند SMART من) */}
          <div
            onClick={() => onSelectStep(5)}
            className="p-5 rounded-3xl bg-gradient-to-br from-[#1a1309] to-[#0a0703] border border-amber-500/45 space-y-3 cursor-pointer hover:border-amber-300 transition-all shadow-[0_4px_30px_rgba(245,158,11,0.15)] group"
          >
            <div className="flex items-center justify-between border-b border-slate-800/90 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-amber-500/25 text-amber-300 text-sm">🏗️</span>
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-white">۴. مأموریت و هدف هوشمند (My Goal - SMART)</h3>
                  <span className="text-[10px] text-slate-400">نقشه مهندسی معکوس و ملموس</span>
                </div>
              </div>
              <span className="text-[10px] text-amber-400 font-mono group-hover:underline">ویرایش ✎</span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-amber-300 font-bold block text-[10px]">عنوان مأموریت مشخص:</span>
                <p className="text-xs sm:text-sm font-black text-white">{smart.specific}</p>
              </div>
              <div className="flex justify-between items-center text-slate-300 pt-1.5 border-t border-slate-800/80 text-[11px]">
                <span>سررسید: <strong className="text-amber-400">{smart.timeBound}</strong></span>
                <span>شاخص سنجش: <strong className="text-slate-200 truncate max-w-[130px]">{smart.measurable}</strong></span>
              </div>
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-200 text-[11px] border border-amber-500/20">
                <strong>نخستین اقدام اجرایی:</strong> {smart.firstAction}
              </div>
            </div>
          </div>
        </div>

        {/* ROW 3: MY WHY & MY HABITS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 5. MY WHY (چرایی سوزان من) */}
          <div
            onClick={() => onSelectStep(6)}
            className="p-5 rounded-3xl bg-gradient-to-br from-[#1c0d12] to-[#0a0407] border border-rose-500/35 space-y-3 cursor-pointer hover:border-rose-400 transition-all shadow-[0_4px_25px_rgba(0,0,0,0.5)] group"
          >
            <div className="flex items-center justify-between border-b border-slate-800/90 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-rose-500/20 text-rose-300 text-sm">🔥</span>
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-white">۵. آتشکده چرایی سوزان من (My WHY)</h3>
                  <span className="text-[10px] text-slate-400">سوخت حرکت در مواجهه با تمام سختی‌ها</span>
                </div>
              </div>
              <span className="text-[10px] text-rose-400 font-mono group-hover:underline">ویرایش ✎</span>
            </div>

            {progress.deepWhy && (
              <div className="p-2.5 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-xs italic">
                «{progress.deepWhy}»
              </div>
            )}

            <ul className="space-y-1.5 text-xs text-slate-300">
              {roots.slice(0, 3).map((r, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-rose-400">✦</span>
                  <span className="truncate">{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 6. MY HABITS (سنگفرش عادات و استمرار من) */}
          <div
            onClick={() => onSelectStep(8)}
            className="p-5 rounded-3xl bg-gradient-to-br from-[#121422] to-[#05060d] border border-amber-500/35 space-y-3 cursor-pointer hover:border-amber-400 transition-all shadow-[0_4px_25px_rgba(0,0,0,0.5)] group"
          >
            <div className="flex items-center justify-between border-b border-slate-800/90 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-amber-500/20 text-amber-300 text-sm">🪨</span>
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-white">۶. سنگفرش عادات و پایش (My Habits)</h3>
                  <span className="text-[10px] text-slate-400">قانون دو دقیقه و زنجیره استمرار</span>
                </div>
              </div>
              <span className="text-[10px] text-amber-400 font-mono group-hover:underline">ویرایش ✎</span>
            </div>

            <div className="space-y-2">
              {habits.slice(0, 2).map((h, i) => (
                <div key={i} className="flex items-center justify-between text-xs p-2.5 rounded-2xl bg-slate-950/75 border border-slate-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="text-slate-200 truncate">{h.title}</span>
                  </div>
                  <span className="text-[10px] text-amber-400 font-mono shrink-0 mr-2 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    {h.completedDays} روز
                  </span>
                </div>
              ))}
            </div>

            {progress.dailyRituals?.twoMinuteRule && (
              <p className="text-[10px] text-slate-400 pt-1">
                عادت دو دقیقه‌ای: <span className="text-amber-200">{progress.dailyRituals.twoMinuteRule}</span>
              </p>
            )}
          </div>
        </div>

        {/* ROW 4: 7. MY PROGRESS & SUMMIT MAP (پیشرفت کلی من) */}
        <div className="p-5 rounded-3xl bg-gradient-to-r from-[#0c162f] via-[#080d1e] to-[#0e1834] border border-amber-500/40 shadow-[0_10px_35px_rgba(0,0,0,0.6)] space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-amber-500/20 text-amber-300 text-sm">🌟</span>
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold text-white">۷. مسیر پیشرفت و ایستگاه‌های فتح‌شده (My Progress)</h3>
                <span className="text-[10px] text-slate-400">کارنامه صعود به قله تسخیرناپذیر</span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-amber-300">
              {progressPercent}٪ تکمیل
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">فصل‌های پشت سر گذاشته</span>
              <span className="text-sm font-bold text-amber-300 font-mono">{completedCount} / 13</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">بازتاب‌های مکتوب</span>
              <span className="text-sm font-bold text-emerald-300 font-mono">
                {Object.keys(progress.reflections || {}).length}
              </span>
            </div>
            <div className="p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">پیمان‌نامه مأموریت</span>
              <span className="text-sm font-bold text-sky-300">
                {progress.initialCovenantSigned || progress.covenantSealDate ? 'امضا شده ✓' : 'در انتظار'}
              </span>
            </div>
            <div className="p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">زنجیره استمرار</span>
              <span className="text-sm font-bold text-orange-400 font-mono">
                {progress.habitStreak || 0} روز
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
