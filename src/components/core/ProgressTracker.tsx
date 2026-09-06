import React from 'react';
import { motion } from 'motion/react';
import { Compass, CheckCircle2, Flame, Sparkles, Award } from 'lucide-react';
import { UserProgress } from '../../types';
import { computeJourneyStats, getPathIlluminationColor } from '../../data/userJourney';

interface ProgressTrackerProps {
  progress: UserProgress;
  activeChapter: number;
  onSelectChapter?: (id: number) => void;
  className?: string;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  progress,
  activeChapter,
  onSelectChapter,
  className = '',
}) => {
  const stats = computeJourneyStats(progress, activeChapter);

  return (
    <div className={`p-4 rounded-3xl bg-slate-900/90 border border-slate-800 text-right space-y-3.5 ${className}`}>
      {/* Top Gauges */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black text-white">ردیاب مسیر و پیشرفت مأموریت</h4>
            <p className="text-[10px] text-slate-400">
              {stats.completedCount} از {stats.totalChapters} ایستگاه طی شده
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {progress.habitStreak ? (
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-orange-500/15 border border-orange-500/30 text-orange-400 text-[10px] font-mono font-bold">
              <Flame className="w-3 h-3 text-orange-400" />
              <span>{progress.habitStreak} روز استمرار</span>
            </div>
          ) : null}
          <span className="text-xs font-mono font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
            {stats.completionPercentage}٪
          </span>
        </div>
      </div>

      {/* Segmented Illumination Path Bar (Each completed chapter lights a section) */}
      <div className="grid grid-cols-13 gap-1 py-1">
        {Array.from({ length: stats.totalChapters }).map((_, i) => {
          const chId = i + 1;
          const isDone = stats.unlockedPathSections.includes(chId);
          const isCurrent = activeChapter === chId;

          return (
            <button
              key={chId}
              type="button"
              onClick={() => onSelectChapter?.(chId)}
              title={`ایستگاه ${chId}`}
              className={`h-2.5 rounded-full transition-all duration-500 relative ${
                isDone
                  ? 'bg-gradient-to-t from-amber-500 to-yellow-300 shadow-[0_0_8px_rgba(245,158,11,0.6)]'
                  : isCurrent
                  ? 'bg-amber-400/50 animate-pulse border border-amber-300'
                  : 'bg-slate-800/80 hover:bg-slate-700'
              }`}
            />
          );
        })}
      </div>

      {/* Summary Badges */}
      <div className="grid grid-cols-3 gap-2 pt-1 text-center">
        <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">ثبت بازتاب‌ها</span>
          <span className="text-xs font-mono font-bold text-amber-300">
            {stats.totalReflectionsCount} / {stats.totalChapters}
          </span>
        </div>

        <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">پیمان‌نامه</span>
          <span className={`text-xs font-bold ${stats.hasCovenantSigned ? 'text-emerald-400' : 'text-slate-500'}`}>
            {stats.hasCovenantSigned ? 'امضا شده ✓' : 'در انتظار'}
          </span>
        </div>

        <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">وضعیت کل</span>
          <span className="text-xs font-bold text-sky-400">
            {stats.isJourneyComplete ? 'فاتح قله 🌟' : 'در حال صعود'}
          </span>
        </div>
      </div>
    </div>
  );
};
