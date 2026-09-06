import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Hammer, Sparkles, RotateCcw, Unlock, Sun } from 'lucide-react';
import { UserProgress } from '../../types';
import { soundEngine } from '../../utils/audio';

interface GlassRoomVisualProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
}

export const GlassRoomVisual: React.FC<GlassRoomVisualProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [crackCount, setCrackCount] = useState<number>(progress.glassWallShattered ? 4 : 0);
  const isShattered = crackCount >= 3;

  const handleTapGlass = () => {
    if (isShattered) return;
    const nextCount = crackCount + 1;
    setCrackCount(nextCount);

    if (nextCount >= 3) {
      soundEngine.playChime(1046.5); // High explosion chime
      onUpdateProgress((prev) => ({
        ...prev,
        glassWallShattered: true,
      }));
    } else {
      soundEngine.playTick();
    }
  };

  const handleResetGlass = () => {
    setCrackCount(0);
    onUpdateProgress((prev) => ({
      ...prev,
      glassWallShattered: false,
    }));
    soundEngine.playTick();
  };

  return (
    <div className="w-full flex flex-col items-center justify-center relative py-2">
      {/* Cinematic Typography Banner */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-200 font-extrabold text-xs tracking-wide text-center"
      >
        «گاهی بزرگترین مانع، همان چیزی است که باور کرده‌ای»
      </motion.div>

      {/* Glass Room Viewport Container */}
      <div className="relative w-full max-w-[340px] rounded-2xl overflow-hidden bg-[#030612] border border-rose-500/30 p-3 shadow-2xl">
        {/* The Scene Stage */}
        <div
          onClick={handleTapGlass}
          className="relative h-[180px] w-full rounded-xl overflow-hidden bg-gradient-to-b from-[#06081e] via-[#0b132e] to-[#040614] flex items-center justify-center cursor-pointer select-none"
        >
          {/* Panoramic Boundless Horizon Behind the Glass */}
          <div className="absolute inset-0 flex flex-col items-center justify-between p-4">
            {/* Golden Rising Sun & Starfield */}
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-amber-300">
                <Sun className="w-6 h-6 animate-spin-slow" />
                <span className="text-[9px] font-bold">جهان نامحدود امکانات</span>
              </div>
              <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
            </div>

            {/* Mountains in Distance */}
            <svg viewBox="0 0 200 60" className="w-full h-12">
              <polygon points="0,60 50,15 110,60" fill="#1e1b4b" opacity="0.6" />
              <polygon points="70,60 140,5 200,60" fill="#312e81" opacity="0.8" />
              <polygon points="130,15 140,5 150,15" fill="#fef08a" />
            </svg>
          </div>

          {/* Traveler Figure */}
          <div className="absolute z-10 flex flex-col items-center">
            {/* Person */}
            <div className="w-7 h-7 rounded-full bg-amber-200 shadow-[0_0_15px_rgba(254,240,138,0.5)] flex items-center justify-center text-xs font-bold text-black">
              🧍
            </div>
            {isShattered && (
              <span className="text-[8px] font-bold text-amber-300 mt-1 bg-slate-900/80 px-2 py-0.5 rounded-full border border-amber-500/40">
                پرواز در آسمان رهایی
              </span>
            )}
          </div>

          {/* Glass Wall Overlay with Cracks */}
          <AnimatePresence>
            {!isShattered && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.15 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-2 rounded-lg border-2 border-cyan-300/40 bg-cyan-400/10 backdrop-blur-[3px] flex items-center justify-center z-20"
              >
                {/* Etched Limiting Beliefs on Glass */}
                <div className="absolute top-2 text-[8px] text-cyan-200/60 font-mono">
                  دیوار نامرئی باورهای کاذب
                </div>
                <div className="absolute bottom-2 text-[8px] text-rose-300/70 font-mono">
                  «نمی‌شود، دیر شده، در توان من نیست...»
                </div>

                {/* Cracks SVG based on crackCount */}
                <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 pointer-events-none">
                  {crackCount >= 1 && (
                    <path
                      d="M 50 50 L 30 20 M 50 50 L 75 30 M 50 50 L 40 80"
                      stroke="#fef08a"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  )}
                  {crackCount >= 2 && (
                    <path
                      d="M 30 20 L 15 10 M 75 30 L 90 25 M 40 80 L 25 95 M 50 50 L 85 70"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  )}
                </svg>

                {/* Click / Tap Prompt */}
                <div className="bg-slate-950/80 px-3 py-1.5 rounded-full border border-cyan-400/60 text-[10px] text-cyan-200 flex items-center gap-1.5 shadow-lg">
                  <Hammer className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                  <span>برای شکستن ضربه بزن ({crackCount}/3)</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Shattered Shards Particles Burst */}
          {isShattered && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
              <span className="text-xl animate-ping">✨</span>
            </div>
          )}
        </div>

        {/* Action Controls & Reset */}
        <div className="mt-3 flex items-center justify-between">
          <div className="text-right">
            <span className="text-[11px] font-bold text-amber-300 block">
              {isShattered ? '✓ دیوار توهم فرو ریخت!' : 'دیوار شیشه‌ای ذهن را لمس کن'}
            </span>
            <span className="text-[9px] text-slate-400">
              {isShattered
                ? 'اکنون بدون هیچ مانعی به سوی افق حرکت کن'
                : 'با هر ضربه اراده، ترک‌های عمیق‌تری بر باور کهنه می‌افتد'}
            </span>
          </div>
          {isShattered ? (
            <button
              onClick={handleResetGlass}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>تکرار شکستن</span>
            </button>
          ) : (
            <button
              onClick={handleTapGlass}
              className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1 shadow-[0_0_15px_rgba(225,29,72,0.4)]"
            >
              <Hammer className="w-3.5 h-3.5" />
              <span>ضربه ({crackCount}/3)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
