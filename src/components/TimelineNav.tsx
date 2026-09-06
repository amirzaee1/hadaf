import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  VolumeX,
  Scroll,
  Compass,
  CheckCircle,
  Menu,
  X,
  FileText,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { CHAPTERS } from '../data/chapters';
import { UserProgress } from '../types';
import { soundEngine } from '../utils/audio';

interface TimelineNavProps {
  activeChapter: number;
  progress: UserProgress;
  onSelectChapter: (id: number) => void;
  onOpenDossier: () => void;
  onResetProgress: () => void;
  viewMode?: 'journey' | 'workshop';
  onToggleViewMode?: () => void;
}

export const TimelineNav: React.FC<TimelineNavProps> = ({
  activeChapter,
  progress,
  onSelectChapter,
  onOpenDossier,
  onResetProgress,
  viewMode = 'journey',
  onToggleViewMode,
}) => {
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleSound = () => {
    const playing = soundEngine.toggleSound();
    setIsPlayingSound(playing);
  };

  const completedCount = progress.completedChapters.length;
  const progressPercent = Math.round((completedCount / CHAPTERS.length) * 100);

  return (
    <>
      {/* Top Floating Cinematic HUD Bar */}
      <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-8 py-3 bg-[#050811]/85 backdrop-blur-xl border-b border-white/[0.07] transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand & Chapter Info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-serif font-black shadow-[0_0_15px_rgba(245,158,11,0.25)]">
              G
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wider text-sm sm:text-base text-white font-serif">
                  GOAL DREAM
                </span>
                <span className="hidden sm:inline text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-medium border border-amber-500/20">
                  کارگاه سینمایی
                </span>
              </div>
              <div className="text-[11px] text-slate-400 truncate max-w-[160px] sm:max-w-xs">
                فصل {activeChapter}: {CHAPTERS[activeChapter - 1]?.titleFa}
              </div>
            </div>
          </div>

          {/* Quick 13 Chapter Dot Rail (Desktop) */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60">
            {CHAPTERS.map((ch) => {
              const isCurrent = activeChapter === ch.id;
              const isDone = progress.completedChapters.includes(ch.id);
              return (
                <button
                  key={ch.id}
                  onClick={() => onSelectChapter(ch.id)}
                  title={`فصل ${ch.romanNumeral}: ${ch.titleFa}`}
                  className={`relative group transition-all p-1`}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      isCurrent
                        ? 'bg-amber-400 ring-4 ring-amber-400/30 scale-125'
                        : isDone
                        ? 'bg-emerald-400/90'
                        : 'bg-slate-700 hover:bg-slate-500'
                    }`}
                  />
                  {/* Tooltip */}
                  <div className="absolute top-7 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-slate-950 border border-slate-700 rounded-md text-[10px] text-slate-200 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg z-50">
                    فصل {ch.romanNumeral}: {ch.titleFa}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Ambient Soundscape Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-all ${
                isPlayingSound
                  ? 'bg-amber-500/20 border-amber-400/60 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                  : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
              title="موسیقی فضاساز اتمسفریک کارگاه"
            >
              {isPlayingSound ? (
                <>
                  <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span className="hidden sm:inline font-mono">طنین زنده</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="hidden sm:inline">اتمسفر صوتی</span>
                </>
              )}
            </button>

            {/* Workshop Direct Toggle Button */}
            {onToggleViewMode && (
              <button
                onClick={onToggleViewMode}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shrink-0 ${
                  viewMode === 'workshop'
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                    : 'bg-slate-900/80 border border-amber-500/40 text-amber-300 hover:border-amber-400 hover:bg-amber-500/10'
                }`}
                title="ورود به کارگاه عملی مسیر من"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">کارگاه عملی من</span>
                <span className="sm:hidden">کارگاه</span>
                <span className="w-4 h-4 rounded-full bg-black/20 text-current text-[10px] font-mono flex items-center justify-center">
                  {progress.workshopCompletedSteps?.length || 0}
                </span>
              </button>
            )}

            {/* Dossier Master Button */}
            <button
              onClick={onOpenDossier}
              className="px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all shrink-0"
            >
              <FileText className="w-4 h-4" />
              <span>کتابچه چشم‌انداز من</span>
              <span className="w-5 h-5 rounded-full bg-black/20 text-black text-[11px] font-mono flex items-center justify-center mr-0.5">
                {completedCount}
              </span>
            </button>

            {/* Menu Drawer Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white"
              title="فهرست کامل فصول"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Dynamic Global Progress Line */}
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-slate-800">
          <div
            className="h-full bg-gradient-to-l from-amber-400 via-yellow-400 to-amber-600 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Chapters Drawer / Modal */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-[#090e1c] z-50 border-l border-slate-800 shadow-2xl p-6 overflow-y-auto flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-amber-400" />
                  <h3 className="font-bold text-white text-base">فهرست فصول کارگاه</h3>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mb-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-300">میزان پیشرفت کلی:</span>
                <span className="font-mono text-amber-300 font-bold">
                  {completedCount} از ۱۳ فصل ({progressPercent}٪)
                </span>
              </div>

              {/* Workshop Quick Access Banner in Drawer */}
              {onToggleViewMode && (
                <button
                  onClick={() => {
                    onToggleViewMode();
                    setMenuOpen(false);
                  }}
                  className="w-full mb-3 p-3 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-transparent border border-amber-500/40 text-right flex items-center justify-between group hover:border-amber-400 transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🧳</span>
                    <div>
                      <span className="text-xs font-black text-amber-200 block">
                        اتاق کارگاه عملی من
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        ۶ گام تمرین عملی هدف‌گذاری
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-amber-400 font-bold group-hover:translate-x-[-2px] transition-transform">
                    ورود ←
                  </span>
                </button>
              )}

              <div className="space-y-1.5">
                {CHAPTERS.map((ch) => {
                  const isCur = activeChapter === ch.id;
                  const isDone = progress.completedChapters.includes(ch.id);

                  return (
                    <button
                      key={ch.id}
                      onClick={() => {
                        onSelectChapter(ch.id);
                        setMenuOpen(false);
                      }}
                      className={`w-full p-3 rounded-xl text-right transition-all flex items-center justify-between border ${
                        isCur
                          ? 'bg-amber-500/20 border-amber-400/80 text-amber-200'
                          : 'bg-slate-900/40 border-slate-800/60 text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md bg-slate-800 text-amber-400 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                          {ch.romanNumeral}
                        </span>
                        <div className="text-xs sm:text-sm font-medium">
                          {ch.titleFa}
                        </div>
                      </div>
                      {isDone && (
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mr-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 mt-6 flex items-center justify-between">
              <button
                onClick={() => {
                  if (window.confirm('آیا مایل به بازنشانی تمام پاسخ‌ها و شروع دوباره سفر هستید؟')) {
                    onResetProgress();
                    setMenuOpen(false);
                  }
                }}
                className="text-xs text-rose-400/80 hover:text-rose-300 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>شروع دوباره سفر از ابتدا</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
