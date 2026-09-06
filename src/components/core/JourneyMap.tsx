import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Compass, Lock, MapPin } from 'lucide-react';
import { CHAPTERS } from '../../data/chapters';
import { UserProgress } from '../../types';

interface JourneyMapProps { progress: UserProgress; activeChapter: number; onSelectChapter: (id: number) => void; className?: string; }

export const JourneyMap: React.FC<JourneyMapProps> = ({ progress, activeChapter, onSelectChapter, className = '' }) => {
  let firstLocked = 1;
  while (firstLocked <= CHAPTERS.length && progress.completedChapters.includes(firstLocked)) firstLocked += 1;
  const unlockedThrough = Math.min(CHAPTERS.length, firstLocked);
  const percent = Math.round((progress.completedChapters.length / CHAPTERS.length) * 100);

  return (
    <section className={`space-y-4 rounded-3xl border border-slate-800 bg-slate-950/86 p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/12 text-amber-300"><Compass className="h-4 w-4" /></span><div><h2 className="text-sm font-black text-white">مسیر سیزده‌مرحله‌ای من</h2><p className="text-[10px] text-slate-500">فقط مرحله آماده، قابل ورود است</p></div></div>
        <b className="text-xs text-amber-300">{percent}٪</b>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-800"><motion.div animate={{ width: `${percent}%` }} className="h-full bg-gradient-to-r from-amber-500 to-yellow-300" /></div>
      <div className="space-y-2">
        {CHAPTERS.map((chapter) => {
          const complete = progress.completedChapters.includes(chapter.id);
          const locked = chapter.id > unlockedThrough;
          const active = activeChapter === chapter.id;
          return (
            <button key={chapter.id} disabled={locked} onClick={() => onSelectChapter(chapter.id)} className={`flex w-full items-center justify-between rounded-2xl border p-3 text-right ${active ? 'border-amber-400/45 bg-amber-500/10' : complete ? 'border-emerald-500/20 bg-emerald-500/[.05]' : locked ? 'cursor-not-allowed border-slate-800 bg-slate-900/45 opacity-55' : 'border-slate-700 bg-slate-900/70'}`}>
              <div className="flex items-center gap-3"><span className={`flex h-8 w-8 items-center justify-center rounded-xl ${complete ? 'bg-emerald-500/15 text-emerald-300' : locked ? 'bg-slate-800 text-slate-500' : 'bg-amber-500/15 text-amber-300'}`}>{complete ? <CheckCircle2 className="h-4 w-4" /> : locked ? <Lock className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}</span><span><b className="block text-[12px] text-white">{chapter.id}. {chapter.titleFa}</b><small className="text-[10px] text-slate-500">{complete ? 'تکمیل شده' : locked ? 'هنوز قفل است' : 'آماده ادامه'}</small></span></div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
