import React from 'react';
import { motion } from 'motion/react';
import { Check, Lock, MapPin } from 'lucide-react';
import { CHAPTERS } from '../../data/chapters';
import { UserProgress } from '../../types';
import { getEditorialImageSrc } from '../FlatStoryIllustration';

interface JourneyMapProps {
  progress: UserProgress;
  activeChapter: number;
  onSelectChapter: (id: number) => void;
  className?: string;
}

export const JourneyMap: React.FC<JourneyMapProps> = ({ progress, activeChapter, onSelectChapter, className = '' }) => {
  let firstLocked = 1;
  while (firstLocked <= CHAPTERS.length && progress.completedChapters.includes(firstLocked)) firstLocked += 1;
  const unlockedThrough = Math.min(CHAPTERS.length, firstLocked);

  return (
    <section className={`overflow-hidden rounded-[30px] border border-amber-500/20 bg-[#050811] ${className}`}>
      <div className="relative aspect-[16/9] overflow-hidden">
        <img src={getEditorialImageSrc(13, 0)} alt="مسیر سیزده مرحله‌ای به سوی هدف" width="960" height="640" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-right">
          <span className="text-[10px] font-black text-amber-300">نقشهٔ سفر</span>
          <h2 className="mt-1 text-2xl font-black text-white">سیزده ایستگاه؛ یک مسیر واقعی</h2>
          <p className="mt-1 text-xs text-slate-300">فقط قدمی که به آن رسیده‌ای روشن است.</p>
        </div>
      </div>

      <div className="relative px-4 pb-6 pt-4">
        <div className="absolute bottom-9 left-1/2 top-7 w-px -translate-x-1/2 bg-gradient-to-b from-amber-300 via-slate-600 to-slate-900" />
        <div className="space-y-1">
          {CHAPTERS.map((chapter, index) => {
            const complete = progress.completedChapters.includes(chapter.id);
            const locked = chapter.id > unlockedThrough;
            const active = activeChapter === chapter.id;
            const unanswered = complete && !(progress.reflections[chapter.id] || '').trim();
            const placeRight = index % 2 === 0;

            return (
              <button
                key={chapter.id}
                disabled={locked}
                onClick={() => onSelectChapter(chapter.id)}
                className="relative grid min-h-[70px] w-full grid-cols-[1fr_48px_1fr] items-center text-right disabled:cursor-not-allowed"
                aria-label={`مرحله ${chapter.id}: ${chapter.titleFa}`}
              >
                <div className={`${placeRight ? 'col-start-3 pr-2 text-right' : 'col-start-1 pl-2 text-left'} row-start-1`}>
                  <span className={`block text-[10px] font-black ${locked ? 'text-slate-700' : active ? 'text-amber-300' : complete ? 'text-emerald-300' : 'text-slate-500'}`}>
                    مرحله {chapter.id}
                  </span>
                  <span className={`mt-0.5 block text-[11px] font-bold leading-5 ${locked ? 'text-slate-700' : 'text-slate-200'}`}>
                    {chapter.titleFa}
                  </span>
                  {unanswered && <span className="mt-0.5 block text-[9px] text-amber-500/70">دیده شد · بدون پاسخ</span>}
                </div>

                <motion.span
                  className={`relative z-10 col-start-2 row-start-1 mx-auto flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 ${complete ? 'border-emerald-300 bg-emerald-950 text-emerald-200' : active ? 'border-amber-200 bg-amber-400 text-slate-950 shadow-[0_0_30px_rgba(251,191,36,.46)]' : locked ? 'border-slate-800 bg-[#070b14] text-slate-700' : 'border-amber-500/55 bg-[#15130c] text-amber-300'}`}
                  animate={active ? { scale: [1, 1.08, 1] } : undefined}
                  transition={{ duration: 2.1, repeat: Infinity }}
                >
                  {locked ? <Lock className="h-3.5 w-3.5" /> : (
                    <>
                      <img src={getEditorialImageSrc(chapter.id, 0)} alt="" width="44" height="44" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                      <span className={`absolute inset-0 ${active ? 'bg-amber-400/20' : 'bg-slate-950/25'}`} />
                      {complete ? <Check className="relative h-4 w-4 rounded-full bg-emerald-950/85 p-0.5 text-emerald-200" /> : <MapPin className="relative h-4 w-4 rounded-full bg-slate-950/75 p-0.5 text-amber-200" />}
                    </>
                  )}
                </motion.span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
