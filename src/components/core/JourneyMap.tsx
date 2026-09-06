import React from 'react';
import { motion } from 'motion/react';
import { CHAPTERS } from '../../data/chapters';
import { UserProgress } from '../../types';
import { CheckCircle2, Lock, Sparkles, Compass, MapPin } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface JourneyMapProps {
  progress: UserProgress;
  activeChapter: number;
  onSelectChapter: (id: number) => void;
  className?: string;
}

export const JourneyMap: React.FC<JourneyMapProps> = ({
  progress,
  activeChapter,
  onSelectChapter,
  className = '',
}) => {
  const total = CHAPTERS.length;
  const completed = progress.completedChapters.length;
  const percent = Math.round((completed / total) * 100);

  return (
    <div className={`p-4 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 ${className}`}>
      {/* Header with completion gauge */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/40">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white">نقشه کهکشان مسیر (Journey Map)</h3>
            <p className="text-[11px] text-slate-400">سیزده ایستگاه کیهانی تحول از ابهام تا فانوس قله</p>
          </div>
        </div>

        <div className="text-left font-mono">
          <span className="text-xs font-black text-amber-300">{percent}٪</span>
          <span className="text-[10px] text-slate-500 block">طی شده</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-amber-500 to-yellow-400"
        />
      </div>

      {/* Vertical Mobile Timeline Map (390px-optimized) */}
      <div className="relative pr-6 space-y-4 before:absolute before:right-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-amber-500/80 before:via-slate-700 before:to-slate-800">
        {CHAPTERS.map((ch, idx) => {
          const isCompleted = progress.completedChapters.includes(ch.id);
          const isActive = activeChapter === ch.id;

          return (
            <div
              key={ch.id}
              onClick={() => {
                soundEngine.playTick();
                onSelectChapter(ch.id);
              }}
              className={`relative flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                isActive
                  ? 'bg-amber-500/15 border border-amber-400/50 shadow-[0_0_20px_rgba(245,158,11,0.15)] scale-[1.02]'
                  : isCompleted
                  ? 'bg-slate-950/60 border border-emerald-500/30 hover:border-emerald-400'
                  : 'bg-slate-950/40 border border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Timeline Marker Dot on the line */}
              <div
                className={`absolute -right-6 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all ${
                  isActive
                    ? 'bg-amber-400 border-amber-200 text-black shadow-[0_0_12px_rgba(245,158,11,0.8)] scale-110'
                    : isCompleted
                    ? 'bg-emerald-500 border-emerald-300 text-black'
                    : 'bg-slate-900 border-slate-700 text-slate-500'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3 h-3" />
                ) : (
                  <span className="text-[9px] font-mono font-black">{ch.id}</span>
                )}
              </div>

              {/* Station Info */}
              <div className="space-y-0.5 pr-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-amber-400 font-bold">
                    فصل {ch.romanNumeral}
                  </span>
                  {isActive && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-400 text-black font-black">
                      موقعیت اکنون
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-black text-white">{ch.titleFa}</h4>
                <p className="text-[10px] text-slate-400 truncate max-w-[210px]">
                  {ch.visualMetaphorName}
                </p>
              </div>

              {/* Status Badge */}
              <div className="shrink-0 text-left">
                {isCompleted ? (
                  <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30">
                    تکمیل شد
                  </span>
                ) : isActive ? (
                  <span className="text-[10px] text-amber-300 font-bold px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40">
                    در حال مرور
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                    گام {ch.id}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
