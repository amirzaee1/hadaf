import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass } from 'lucide-react';
import { ChapterData } from '../types';

interface ChapterHeaderProps {
  chapter: ChapterData;
}

export const ChapterHeader: React.FC<ChapterHeaderProps> = ({ chapter }) => {
  return (
    <div className="relative z-10 text-center w-full px-4 pt-10 pb-4">
      {/* Top: Small chapter indicator */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7 }}
        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium tracking-wide mb-4 backdrop-blur-md"
      >
        <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
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
        className="my-3 py-4 px-3 sm:px-6 rounded-2xl bg-gradient-to-b from-amber-500/[0.08] to-transparent border border-amber-500/20 relative"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-100 leading-snug sm:leading-relaxed gold-glow-text font-serif">
          «{chapter.cinematic_headline || chapter.level1Quote}»
        </h2>
      </motion.div>

      {/* Small Metaphor Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-900/60 px-3 py-0.5 rounded-full border border-slate-700/50 backdrop-blur-sm mt-1"
      >
        <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
        <span className="text-slate-400">تصویر این مرحله:</span>
        <span className="text-amber-300/90 font-medium truncate max-w-[240px]">
          {chapter.visualMetaphorName}
        </span>
      </motion.div>
    </div>
  );
};
