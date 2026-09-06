import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass } from 'lucide-react';
import { ChapterData } from '../types';
import { getChapterTheme } from '../utils/chapterTheme';

interface ChapterHeaderProps {
  chapter: ChapterData;
}

export const ChapterHeader: React.FC<ChapterHeaderProps> = ({ chapter }) => {
  const theme = getChapterTheme(chapter.id);
  return (
    <div className="relative z-10 w-full px-3 pb-3 pt-7 text-center">
      {/* Top: Small chapter indicator */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7 }}
        className="mb-3.5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium tracking-wide backdrop-blur-md"
        style={{ color: theme.accentSoft, borderColor: `${theme.accent}55`, background: theme.surface }}
      >
        <Compass className="w-3.5 h-3.5 animate-spin-slow" style={{ color: theme.accent }} />
        <span className="font-bold">مرحله {chapter.id}</span>
        <span className="text-amber-500/40">|</span>
        <span className="text-amber-200/90 font-light text-[11px]">{chapter.titleFa}</span>
      </motion.div>

      {/* Center: Main emotional typography */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative my-2 overflow-hidden rounded-[22px] border px-3 py-5"
        style={{ borderColor: `${theme.accent}42`, background: `radial-gradient(circle at 50% 0%, ${theme.glow}, transparent 62%)` }}
      >
        <div className="absolute inset-x-12 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }} />
        <h2 className="display-type text-[24px] font-black leading-[1.55] tracking-[-0.035em]" style={{ color: theme.accentSoft, textShadow: `0 0 32px ${theme.glow}` }}>
          «{chapter.cinematic_headline || chapter.level1Quote}»
        </h2>
      </motion.div>

      {/* Small Metaphor Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-900/60 px-3 py-1 rounded-full border border-slate-700/50 backdrop-blur-sm mt-2"
      >
        <Sparkles className="w-3 h-3 shrink-0" style={{ color: theme.accent }} />
        <span className="text-slate-400">تصویر این مرحله:</span>
        <span className="text-amber-300/90 font-medium truncate max-w-[240px]">
          {chapter.visualMetaphorName}
        </span>
      </motion.div>
    </div>
  );
};
