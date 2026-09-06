import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Flame, Sparkles, Compass, RotateCcw } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface MobileTopBarProps {
  currentChapter: number;
  totalChapters: number;
  habitStreak: number;
  onReset: () => void;
  onOpenMap: () => void;
}

export const MobileTopBar: React.FC<MobileTopBarProps> = ({
  currentChapter,
  totalChapters,
  habitStreak,
  onReset,
  onOpenMap,
}) => {
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  const toggleAudio = () => {
    const nextMute = !isAudioMuted;
    setIsAudioMuted(nextMute);
    if (!nextMute) {
      soundEngine.init();
      soundEngine.playChime(660);
    }
  };

  const progressPercent = Math.round((currentChapter / totalChapters) * 100);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-amber-500/20 pt-[env(safe-area-inset-top,6px)]">
      <div className="w-full max-w-[430px] mx-auto px-3 py-2.5 flex items-center justify-between">
        {/* Left: App Identity & Current Position */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenMap}
            className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 hover:scale-105 active:scale-95 transition-all shadow-[0_0_12px_rgba(245,158,11,0.2)]"
            title="نقشه کهکشان مسیر"
          >
            <Compass className="w-4 h-4" />
          </button>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-black text-amber-300 font-serif">GOAL DREAM</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 font-mono">
                {currentChapter}/{totalChapters}
              </span>
            </div>
            <p className="text-[10px] text-slate-400">قدم‌به‌قدم تا هدف روشن</p>
          </div>
        </div>

        {/* Right: Streak & Controls */}
        <div className="flex items-center gap-2">
          {/* Habit Streak Badge */}
          {habitStreak > 0 && (
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-mono font-bold"
              title={`${habitStreak} روز پیوستگی عادات`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>{habitStreak}</span>
            </div>
          )}

          {/* Audio Toggle */}
          <button
            onClick={toggleAudio}
            className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all ${
              isAudioMuted
                ? 'bg-slate-900 border-slate-800 text-slate-500'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.15)]'
            }`}
            title={isAudioMuted ? 'فعال‌سازی صدا' : 'قطع صدا'}
          >
            {isAudioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Micro Progress Bar at the bottom of header */}
      <div className="w-full bg-slate-900 h-[2px] overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </header>
  );
};
