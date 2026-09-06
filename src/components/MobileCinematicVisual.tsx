import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, Sparkles } from 'lucide-react';
import { ChapterData, UserProgress } from '../types';
import { FlatStoryIllustration } from './FlatStoryIllustration';
import { getChapterTheme } from '../utils/chapterTheme';

interface MobileCinematicVisualProps {
  chapter: ChapterData;
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
}

export const MobileCinematicVisual: React.FC<MobileCinematicVisualProps> = ({ chapter }) => {
  const [revealed, setRevealed] = useState(false);
  const theme = getChapterTheme(chapter.id);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      className="mx-1 overflow-hidden rounded-3xl border bg-slate-950/82 p-3 shadow-xl"
      style={{ borderColor: `${theme.accent}40` }}
    >
      <FlatStoryIllustration chapterId={chapter.id} index={0} hero className="aspect-[3/2] w-full" />
      <button
        type="button"
        onClick={() => setRevealed((value) => !value)}
        className="mt-3 flex min-h-11 w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-right"
        aria-expanded={revealed}
      >
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl" style={{ color: theme.accent, background: `${theme.accent}16` }}>
            <Eye className="h-4 w-4" />
          </span>
          <span>
            <span className="block text-[11px] font-black" style={{ color: theme.accentSoft }}>نشانهٔ این مرحله</span>
            <span className="block text-[10px] text-slate-500">برای دیدن پیام تصویر لمس کن</span>
          </span>
        </div>
        <Sparkles className="h-4 w-4 shrink-0" style={{ color: theme.accent }} />
      </button>
      {revealed && (
        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="px-3 pb-1 pt-3 text-[13px] leading-7 text-slate-200">
          {chapter.visualMetaphorDesc || chapter.level2Text?.lead}
        </motion.p>
      )}
    </motion.section>
  );
};
