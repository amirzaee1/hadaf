import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Compass, Sparkles } from 'lucide-react';
import { FlatStoryIllustration } from './FlatStoryIllustration';

interface PrologueHeroProps { onStartJourney: () => void; }

export const PrologueHero: React.FC<PrologueHeroProps> = ({ onStartJourney }) => (
  <section className="relative z-10 flex min-h-[78vh] flex-col items-center justify-center px-3 py-10 text-center">
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1.5 text-[11px] font-bold text-amber-300">
      <Sparkles className="h-3.5 w-3.5" />
      <span>یک سفر شخصی، نه یک هدف‌گذاری کلیشه‌ای</span>
    </motion.div>
    <motion.h1 initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} className="display-type text-[38px] font-black leading-tight text-white">
      GOAL <span className="text-amber-300">DREAM</span>
    </motion.h1>
    <p className="mt-2 text-[15px] font-bold text-slate-300">از هدف قرضی تا مسیر واقعی خودت</p>
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }} className="mt-7 w-full">
      <FlatStoryIllustration chapterId={13} index={0} hero className="h-[190px] w-full shadow-2xl" />
    </motion.div>
    <p className="mx-auto mt-6 max-w-[330px] text-[13px] leading-7 text-slate-400">
      هر مرحله را بخوان، یک پاسخ واقعی بنویس و فقط وقتی آماده‌ای قدم بعدی را باز کن.
    </p>
    <button onClick={onStartJourney} className="mt-6 flex min-h-13 w-full max-w-[320px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-amber-400 to-orange-500 px-5 py-3.5 text-sm font-black text-slate-950 shadow-[0_15px_35px_rgba(245,158,11,.26)] active:scale-[.98]">
      <Compass className="h-5 w-5" />
      <span>مرحله اول را شروع کن</span>
      <ArrowDown className="h-4 w-4" />
    </button>
  </section>
);
