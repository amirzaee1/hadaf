import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cloud, Layers, Compass, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserProgress } from '../../types';
import { soundEngine } from '../../utils/audio';

interface CloudToRealityVisualProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
}

export const CloudToRealityVisual: React.FC<CloudToRealityVisualProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [stage, setStage] = useState<number>(progress.dreamTransformationStage || 2);
  const [dreamTitle, setDreamTitle] = useState<string>(progress.dreamObjectTitle || '');

  const stages = [
    {
      id: 1,
      name: 'ابر (Cloud)',
      sub: 'آرزوی مبهم و بی‌پشتوانه',
      desc: 'بدون ساختار، در گذر باد محو می‌شود و اثری بر واقعیت نمی‌گذارد.',
      badge: 'مرحله ۱: آرزوی خام',
      icon: '☁️',
      color: 'text-sky-300',
    },
    {
      id: 2,
      name: 'طرح اولیه (Sketch)',
      sub: 'رسم خطوط روی کاغذ',
      desc: 'قصد و نیت متولد می‌شود؛ ایده شکل هندسی ابتدایی به خود می‌گیرد.',
      badge: 'مرحله ۲: تجسم کالبد',
      icon: '✏️',
      color: 'text-amber-300',
    },
    {
      id: 3,
      name: 'نقشه مهندسی (Blueprint)',
      sub: 'زمان‌بندی و شاخص‌های عددی',
      desc: 'جزئیات اجرایی، ابعاد دقیق و تاریخ‌های تقویمی مشخص می‌شوند.',
      badge: 'مرحله ۳: مهندسی معکوس',
      icon: '📐',
      color: 'text-cyan-300',
    },
    {
      id: 4,
      name: 'دستاورد ملموس (Real Object)',
      sub: 'جام زرین و نتیجه عینی',
      desc: 'با اقدام و استمرار، رویا در جهان فیزیکی به واقعیتی استوار تبدیل شد.',
      badge: 'مرحله ۴: تجلی کامل',
      icon: '🏆',
      color: 'text-yellow-400',
    },
  ];

  const handleStageSelect = (st: number) => {
    setStage(st);
    onUpdateProgress((prev) => ({
      ...prev,
      dreamTransformationStage: st,
    }));
    if (st === 4) {
      soundEngine.playChime(880);
    } else {
      soundEngine.playTick();
    }
  };

  const handleSaveTitle = () => {
    onUpdateProgress((prev) => ({
      ...prev,
      dreamObjectTitle: dreamTitle,
      dreamTransformationStage: stage,
    }));
    soundEngine.playChime(784);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center relative py-2">
      {/* Cinematic Typography Banner */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-200 font-extrabold text-xs tracking-wide text-center"
      >
        «رویا، با اقدام تبدیل به واقعیت می‌شود»
      </motion.div>

      {/* Transformation Chamber Container */}
      <div className="relative w-full max-w-[340px] rounded-2xl overflow-hidden bg-[#030612] border border-amber-500/30 p-3 shadow-2xl">
        {/* Visual Transformation Stage Viewport */}
        <div className="relative h-[180px] w-full rounded-xl overflow-hidden bg-gradient-to-b from-[#05091a] via-[#081226] to-[#02050f] flex items-center justify-center">
          {/* Ambient Lighting Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

          {/* STAGE 1: THE FLOATING CLOUD */}
          {stage === 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center p-4"
            >
              <div className="relative">
                <Cloud className="w-24 h-24 text-slate-400/60 animate-pulse" />
                <div className="absolute inset-0 bg-sky-400/20 blur-xl rounded-full" />
              </div>
              <span className="text-xs font-bold text-slate-300 mt-2">
                ابر خیالی و ناملموس
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5">
                بدون تعهد و اقدام، به زودی ناپدید می‌شود
              </span>
            </motion.div>
          )}

          {/* STAGE 2: SKETCH ON PARCHMENT */}
          {stage === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center p-4"
            >
              <svg viewBox="0 0 100 80" className="w-24 h-20">
                {/* Paper sheet */}
                <rect x="15" y="10" width="70" height="60" rx="3" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
                {/* Hand-drawn sketch lines */}
                <path d="M 25 30 Q 40 20 60 30 T 75 40" fill="none" stroke="#fef08a" strokeWidth="1.5" />
                <polygon points="50,20 65,50 35,50" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
                <line x1="25" y1="60" x2="70" y2="60" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
              </svg>
              <span className="text-xs font-bold text-amber-300 mt-2">
                طرح اولیه و ایده‌پردازی
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">
                اولین خطوط فیزیکی بر صفحه روزگار
              </span>
            </motion.div>
          )}

          {/* STAGE 3: BLUEPRINT GRID WITH SMART DECODING */}
          {stage === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center p-3 w-full"
            >
              <div className="w-full max-w-[280px] rounded-lg bg-cyan-950/70 border border-cyan-400/80 p-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] relative">
                <div className="flex justify-between text-[8px] text-cyan-400 font-mono mb-1">
                  <span>BLUEPRINT ENG.</span>
                  <span>SMART 5/5 VERIFIED</span>
                </div>
                {/* 5 SMART Elements Row */}
                <div className="grid grid-cols-5 gap-1 my-1">
                  {[
                    { l: 'S', title: 'وضوح', desc: 'Clarity' },
                    { l: 'M', title: 'اعداد', desc: 'Numbers' },
                    { l: 'A', title: 'منابع', desc: 'Resources' },
                    { l: 'R', title: 'ارزش‌ها', desc: 'Values' },
                    { l: 'T', title: 'زمان', desc: 'Timeline' },
                  ].map((elem, idx) => (
                    <motion.div
                      key={elem.l}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-cyan-900/60 border border-cyan-500/50 rounded py-1 px-0.5 text-center"
                    >
                      <span className="text-[10px] font-black text-cyan-200 block leading-none">{elem.l}</span>
                      <span className="text-[7px] text-cyan-300 block mt-0.5">{elem.title}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="flex justify-between text-[7px] text-cyan-500 font-mono mt-1">
                  <span>SCALE 1:1</span>
                  <span>READY FOR MANIFESTATION</span>
                </div>
              </div>
              <span className="text-xs font-bold text-cyan-300 mt-2">
                نقشه مهندسی معکوس (SMART Blueprint)
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">
                تبدیل ابر خیال به ۵ ستون محاسباتی و اجرایی
              </span>
            </motion.div>
          )}

          {/* STAGE 4: REAL MANIFESTED OBJECT */}
          {stage === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center p-4"
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-600 p-0.5 shadow-[0_0_35px_rgba(245,158,11,0.6)] flex items-center justify-center">
                  <div className="w-full h-full bg-slate-950/40 rounded-2xl flex items-center justify-center backdrop-blur-xs">
                    <Award className="w-12 h-12 text-yellow-300 animate-bounce" />
                  </div>
                </div>
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-5 h-5 text-yellow-200 animate-spin" />
                </div>
              </div>
              <span className="text-xs font-black text-amber-200 mt-2">
                دستاورد عینی و ملموس
              </span>
              <span className="text-[10px] text-amber-300/80 mt-0.5">
                تجسد رویا در بطن واقعیت
              </span>
            </motion.div>
          )}
        </div>

        {/* 4-Step Interactive Stepper / Scrubber */}
        <div className="grid grid-cols-4 gap-1.5 mt-3">
          {stages.map((st) => {
            const isSelected = stage === st.id;
            return (
              <button
                key={st.id}
                onClick={() => handleStageSelect(st.id)}
                className={`py-2 px-1 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span className="text-sm mb-0.5">{st.icon}</span>
                <span className="text-[9px] font-bold truncate max-w-[65px]">{st.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Explanation */}
        <div className="mt-2.5 p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-right">
          <div className="text-[11px] font-bold text-amber-300">
            {stages[stage - 1].badge}: {stages[stage - 1].name}
          </div>
          <p className="text-[10px] text-slate-300 mt-0.5 leading-relaxed">
            {stages[stage - 1].desc}
          </p>
        </div>

        {/* Tangible Dream Registration */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-right">
          <label className="block text-[10px] font-bold text-amber-300 mb-1">
            نام رویای ملموس تو (محصول نهایی که خلق می‌کنی):
          </label>
          <div className="flex gap-1.5">
            <input
              type="text"
              placeholder="مثال: انتشار کتاب تخصصی، راه‌اندازی کسب‌وکار..."
              value={dreamTitle}
              onChange={(e) => setDreamTitle(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-amber-500/40 text-xs text-amber-100 outline-none focus:border-amber-400"
            />
            <button
              onClick={handleSaveTitle}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shrink-0"
            >
              ثبت رویا
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
