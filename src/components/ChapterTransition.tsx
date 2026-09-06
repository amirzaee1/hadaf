import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, CheckCircle2, Sparkles } from 'lucide-react';
import { ChapterData } from '../types';
import { getChapterTheme } from '../utils/chapterTheme';

interface ChapterTransitionProps {
  chapter: ChapterData;
  isLast: boolean;
}

export const ChapterTransition: React.FC<ChapterTransitionProps> = ({ chapter, isLast }) => {
  const theme = getChapterTheme(chapter.id);
  const nextId = chapter.id + 1;

  return (
    <motion.aside
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      className="relative mx-3 mt-6 overflow-hidden rounded-[28px] border p-5 text-center shadow-2xl"
      style={{
        borderColor: `${theme.accent}55`,
        background: `radial-gradient(circle at 50% 0%, ${theme.glow}, transparent 52%), linear-gradient(180deg, ${theme.surface}, rgba(3,6,15,.92))`,
      }}
    >
      <Sparkles className="absolute left-5 top-5 h-4 w-4 opacity-50" style={{ color: theme.accent }} />
      <div
        className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border"
        style={{ color: theme.accentSoft, borderColor: `${theme.accent}66`, background: theme.surface }}
      >
        <CheckCircle2 className="h-5 w-5" />
      </div>
      <p className="mx-auto max-w-sm text-[15px] font-extrabold leading-8 text-slate-100">
        «{chapter.cinematic_headline || chapter.level1Quote}»
      </p>
      {!isLast && (
        <a
          href={`#chapter-${nextId}`}
          className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl px-5 text-sm font-black text-slate-950 transition-transform active:scale-[.98]"
          style={{ background: `linear-gradient(135deg, ${theme.accentSoft}, ${theme.accent})`, boxShadow: `0 12px 35px ${theme.glow}` }}
        >
          <span>قدم بعدی را بردار</span>
          <ArrowDown className="h-4 w-4" />
        </a>
      )}
    </motion.aside>
  );
};
