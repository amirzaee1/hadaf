import React from 'react';
import { motion } from 'motion/react';
import { Compass, Sparkles, ChevronDown, Volume2, ArrowDown } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface PrologueHeroProps {
  onStartJourney: () => void;
}

export const PrologueHero: React.FC<PrologueHeroProps> = ({ onStartJourney }) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 pt-12 pb-10 z-10 overflow-hidden">
      {/* Subtle glowing halo in the back */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-[480px] h-64 sm:h-[480px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Eyebrow Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium tracking-wider mb-6 backdrop-blur-md"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span className="font-serif">تمرین عملی هدف‌گذاری — نسخه کامل</span>
      </motion.div>

      {/* Main Title: GOAL DREAM */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-4 font-serif"
      >
        <span className="bg-gradient-to-b from-amber-100 via-amber-200 to-amber-500/80 bg-clip-text text-transparent">
          GOAL DREAM
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.28 }}
        className="relative w-full max-w-[360px] sm:max-w-[460px] -my-2"
      >
        <div className="absolute inset-8 rounded-full bg-amber-400/20 blur-3xl" />
        <img
          src="/assets/goal-dream/hero-isometric.webp"
          alt="مسیر تصویری تبدیل رویا به هدف"
          className="relative w-full h-auto object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)]"
          width="1120"
          height="1400"
          fetchPriority="high"
        />
      </motion.div>

      {/* Persian Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35 }}
        className="text-lg sm:text-2xl text-amber-100/95 font-bold max-w-xl mx-auto leading-relaxed mb-5 px-2"
      >
        هدف‌گذاری: از رویا تا واقعیت
      </motion.p>

      {/* 7-Step Evolution Journey Trail */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-1.5 max-w-md mx-auto mb-8 text-[11px] text-slate-300"
      >
        <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/60">۱. یاد بگیر</span>
        <span className="text-amber-400">←</span>
        <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/60">۲. بنویس</span>
        <span className="text-amber-400">←</span>
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-200 border border-amber-400/50 font-bold">۳. اجرا کن</span>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.65 }}
        className="flex flex-col w-full max-w-[320px] items-stretch gap-3"
      >
        <button
          onClick={onStartJourney}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(245,158,11,0.35)] transition-all transform active:scale-95 min-h-[52px]"
        >
          <Compass className="w-5 h-5 text-black animate-spin-slow shrink-0" />
          <span>شروع ساده و قدم‌به‌قدم</span>
        </button>

        <button
          onClick={() => {
            soundEngine.toggleSound();
          }}
          className="w-full py-3 px-4 rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs flex items-center justify-center gap-2 transition-all min-h-[44px]"
        >
          <Volume2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span>پخش موسیقی فضاساز کارگاه</span>
        </button>
      </motion.div>

      {/* Scroll Down Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="mt-12 flex flex-col items-center gap-1 text-[11px] text-slate-400 pointer-events-none"
      >
        <span className="font-light tracking-wide">با اسکرول، ماجرا آغاز می‌شود</span>
        <ArrowDown className="w-3.5 h-3.5 text-amber-400 animate-bounce mt-0.5" />
      </motion.div>
    </section>
  );
};
