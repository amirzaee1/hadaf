import React from 'react';
import { Compass, Flame } from 'lucide-react';

interface MobileTopBarProps {
  currentChapter: number;
  totalChapters: number;
  habitStreak: number;
  onReset: () => void;
  onOpenMap: () => void;
}

export const MobileTopBar: React.FC<MobileTopBarProps> = ({ currentChapter, totalChapters, habitStreak, onOpenMap }) => {
  const progressPercent = Math.round((currentChapter / totalChapters) * 100);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-500/15 bg-slate-950/90 pt-[env(safe-area-inset-top,6px)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[430px] items-center justify-between px-3 py-2.5">
        <button onClick={onOpenMap} className="flex items-center gap-2 text-right" title="باز کردن نقشه مسیر">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-500/25 bg-amber-500/10 text-amber-300"><Compass className="h-4 w-4" /></span>
          <span>
            <span className="flex items-center gap-1.5"><b className="text-[11px] text-amber-200">GOAL DREAM</b><small className="rounded-full bg-slate-800 px-1.5 text-[9px] text-slate-300">{currentChapter}/{totalChapters}</small></span>
            <span className="block text-[10px] text-slate-500">قدم بعدی، فقط وقتی آماده‌ای</span>
          </span>
        </button>
        {habitStreak > 0 && <div className="flex items-center gap-1 rounded-xl border border-amber-500/20 bg-amber-500/10 px-2 py-1 text-[10px] font-bold text-amber-300"><Flame className="h-3.5 w-3.5" /><span>{habitStreak} روز</span></div>}
      </div>
      <div className="h-[2px] w-full overflow-hidden bg-slate-900"><div className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-500" style={{ width: `${progressPercent}%` }} /></div>
    </header>
  );
};

