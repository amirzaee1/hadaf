import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowLeft, Shield, Flame, Users, Cpu, Compass, CheckCircle2 } from 'lucide-react';
import { UserProgress } from '../../types';
import { soundEngine } from '../../utils/audio';

interface Step4PersonalityFilterProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onComplete: () => void;
}

const ENVIRONMENTS = [
  {
    id: 'red' as const,
    title: 'قلمرو سرخ (کوهستان چالش و دستاورد)',
    color: '#ef4444',
    bg: 'from-red-950/40 via-slate-900/90 to-slate-950',
    border: 'border-red-500/50',
    badge: 'قهرمان / فرمانده',
    icon: Flame,
    essence: 'عاشق فتح قله‌های ناممکن، حل بحران‌های جسورانه، نتیجه‌گرا، پرانرژی و رقابت‌جو',
    strengths: ['تصمیم‌گیری مقتدرانه در بحران', 'تاب‌آوری بالا در برابر فشار', 'اشتیاق به مقیاس‌های بزرگ و استقلال'],
    motivations: 'شکستن رکوردهای گذشته، غلبه بر محدودیت‌ها، برتری تکنیکال و اثر ماندگار',
    preferredGoalStyle: 'اهداف چالشی، مأموریت‌های جسورانه با سنجش‌های عددی بزرگ، پروژه‌های دارای آغاز و پایان حماسی',
  },
  {
    id: 'yellow' as const,
    title: 'قلمرو زرد (دشت اثرگذاری و خدمت انسانی)',
    color: '#eab308',
    bg: 'from-amber-950/40 via-slate-900/90 to-slate-950',
    border: 'border-amber-500/50',
    badge: 'کیمیاگر / مربی',
    icon: Sparkles,
    essence: 'تشنه الهام‌بخشی، ارتقای انسان‌ها، پرورش استعدادها و خلق میراثی پرمعنا برای نسل‌ها',
    strengths: ['هوش هیجانی و همدلی ژرف', 'توانایی انگیزه‌بخشی به جان‌های خسته', 'دیدن زیبایی و پتانسیل در دل تاریکی'],
    motivations: 'دیدن درخشش چشمان انسانی که نجات یافته، گسترش آگاهی و معنا، زیستن اصیل',
    preferredGoalStyle: 'اهداف انسان‌محور، خلق بنیادها یا آثار فرهنگی، خدمات ملموس که رنجی را از دوش جامعه برمی‌دارد',
  },
  {
    id: 'blue' as const,
    title: 'قلمرو آبی (اقیانوس پیوند و هم‌افزایی)',
    color: '#3b82f6',
    bg: 'from-blue-950/40 via-slate-900/90 to-slate-950',
    border: 'border-blue-500/50',
    badge: 'دیپلمات / ارتباط‌ساز',
    icon: Users,
    essence: 'پرانرژی در کار گروهی، شیفته شبکه‌سازی، خلق هم‌افزایی، ماجراجویی مشترک و نشاط جمعی',
    strengths: ['ارتباطات آهنربایی و اعتمادسازی سریع', 'تسهیل کار تیمی و رفع اصطکاک‌ها', 'تفکر چندرشته‌ای و خلاق'],
    motivations: 'پیروزی مشترک با یاران وفادار، بودن در جمع‌های نخبگانی، پروژه‌های شبکه‌ای بین‌المللی',
    preferredGoalStyle: 'اهداف مبتنی بر پارتنرشیپ، توسعه انجمن‌ها و شبکه‌های انسانی، ایجاد اکوسیستم‌های مشارکتی',
  },
  {
    id: 'green' as const,
    title: 'قلمرو سبز (آزمایشگاه سیستم، ساختار و منطق)',
    color: '#22c55e',
    bg: 'from-emerald-950/40 via-slate-900/90 to-slate-950',
    border: 'border-emerald-500/50',
    badge: 'معمار / استراتژیست',
    icon: Cpu,
    essence: 'عاشق الگوها، معماری سیستم‌ها، دقت ریاضی، فرآیندهای بهینه و حذف اتلاف وقت',
    strengths: ['تحلیل سیستماتیک و ریشه‌یابی خطاها', 'نظم آهنین و ثبات قدم در کارهای روزمره', 'طراحی پروتکل‌های بدون اصطکاک'],
    motivations: 'دیدن ماشینی که خودکار و بی‌نقص کار می‌کند، تسلط بر دانش‌های پیچیده، استقلال ناشی از سیستم',
    preferredGoalStyle: 'اهداف ساختاریافته گام‌به‌گام با شاخص‌های دقیق KPI، چک‌لیست‌های پیشرفت و اتوماسیون مداوم',
  },
];

export const Step4PersonalityFilter: React.FC<Step4PersonalityFilterProps> = ({
  progress,
  onUpdateProgress,
  onComplete,
}) => {
  const [selectedWorld, setSelectedWorld] = useState<'red' | 'yellow' | 'blue' | 'green'>(
    progress.personalityWorld || 'green'
  );

  const activeEnv = ENVIRONMENTS.find((e) => e.id === selectedWorld) || ENVIRONMENTS[3];

  const handleSelectEnvironment = (id: 'red' | 'yellow' | 'blue' | 'green') => {
    setSelectedWorld(id);
    soundEngine.playChime(id === 'red' ? 587.33 : id === 'yellow' ? 659.25 : id === 'blue' ? 783.99 : 880);
  };

  const handleSaveProfile = () => {
    onUpdateProgress((prev) => ({
      ...prev,
      personalityWorld: selectedWorld,
      goalEngineProfile: {
        archetype: selectedWorld,
        strengths: activeEnv.strengths,
        motivations: activeEnv.motivations,
        preferredGoalStyle: activeEnv.preferredGoalStyle,
      },
    }));
    soundEngine.playChime(1046.5);
    onComplete();
  };

  return (
    <div className="space-y-6 text-right">
      {/* Title & Concept */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
            گام چهارم کارگاه: فیلتر کهن‌الگو و روان (Goal Engine Profile)
          </span>
          <span className="text-xs font-mono text-amber-400">
            قلمرو فعال: {activeEnv.badge}
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          هم‌راستاسازی رویا با ذات روانی: کشف موتور محرک
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          اگر یک ماهی را مجبور کنی از درخت بالا برود، تمام عمر با حس بی‌عرضگی زندگی خواهد کرد. سبک هدف‌گذاری تو باید دقیقاً بر پایه زیست‌بوم انرژیک ذاتی روانت بنا شود.
        </p>
      </div>

      {/* The 4 Environments Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {ENVIRONMENTS.map((env) => {
          const isSelected = selectedWorld === env.id;
          const IconComp = env.icon;

          return (
            <button
              key={env.id}
              onClick={() => handleSelectEnvironment(env.id)}
              className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between min-h-[96px] active:scale-95 ${
                isSelected
                  ? `bg-gradient-to-b ${env.bg} ${env.border} shadow-[0_0_20px_rgba(255,255,255,0.1)] scale-105`
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <IconComp className="w-5 h-5" style={{ color: env.color }} />
                {isSelected && <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: env.color }} />}
              </div>
              <div>
                <span className="text-xs font-bold block text-white mt-2">{env.title.split('(')[0]}</span>
                <span className="text-[10px] text-slate-300 block">{env.badge}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Output Dossier: My Goal Engine Profile */}
      <div className={`p-6 rounded-3xl bg-gradient-to-b ${activeEnv.bg} border-2 ${activeEnv.border} shadow-2xl space-y-4`}>
        <div className="flex items-center justify-between border-b border-white/[0.1] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/20 flex items-center justify-center">
              <activeEnv.icon className="w-5 h-5" style={{ color: activeEnv.color }} />
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-300">شناسنامه موتور محرک</span>
              <h3 className="text-base sm:text-lg font-black text-white font-serif">
                پروفایل من: {activeEnv.badge}
              </h3>
            </div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-black/50 text-white font-bold border border-white/20">
            {activeEnv.title.split('(')[1].replace(')', '')}
          </span>
        </div>

        <p className="text-xs text-slate-200 leading-relaxed font-medium">
          {activeEnv.essence}
        </p>

        {/* 3 Core Blocks */}
        <div className="space-y-3 pt-2">
          <div className="p-3 bg-black/30 rounded-xl border border-white/10 text-right">
            <span className="text-[11px] font-bold text-amber-300 block mb-1">
              ✦ نقاط قوت ذاتی در مسیر هدف:
            </span>
            <ul className="text-xs text-slate-200 space-y-1">
              {activeEnv.strengths.map((str, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="text-amber-400">•</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 bg-black/30 rounded-xl border border-white/10 text-right">
            <span className="text-[11px] font-bold text-sky-300 block mb-1">
              ⚡ سوخت انگیزشی پایدار:
            </span>
            <p className="text-xs text-slate-200 leading-relaxed">
              {activeEnv.motivations}
            </p>
          </div>

          <div className="p-3 bg-black/30 rounded-xl border border-white/10 text-right">
            <span className="text-[11px] font-bold text-emerald-300 block mb-1">
              🎯 سبک هدف‌گذاری بهینه:
            </span>
            <p className="text-xs text-slate-200 leading-relaxed">
              {activeEnv.preferredGoalStyle}
            </p>
          </div>
        </div>
      </div>

      {/* Completion Button */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          موتور محرک روان برگزیده شد. آماده ورود به معماری SMART.
        </span>
        <button
          onClick={handleSaveProfile}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95 transition-all"
        >
          <span>تثبیت پروفایل و رفتن به عمارت SMART</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
