import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { ChapterData } from '../types';

interface EducationalBodyProps {
  chapter: ChapterData;
}

export const EducationalBody: React.FC<EducationalBodyProps> = ({ chapter }) => {
  const blocks = useMemo(
    () => (chapter.original_text || '').split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean),
    [chapter.original_text],
  );
  const [expanded, setExpanded] = useState(false);
  const visibleBlocks = expanded ? blocks : blocks.slice(0, 3);
  const hasMore = blocks.length > 3;

  return (
    <div className="relative z-10 w-full px-3 sm:px-4 my-5">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-white/10 bg-white/[0.03]">
          <div className="flex items-center gap-2.5 text-amber-300 font-bold">
            <span className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center">
              <BookOpen className="w-4.5 h-4.5" />
            </span>
            <div>
              <span className="block text-sm sm:text-base">متن اصلی کارگاه</span>
              <span className="block text-xs text-slate-400 font-normal mt-0.5">آرام بخوان؛ لازم نیست همه‌چیز را یک‌جا حفظ کنی.</span>
            </div>
          </div>
          <span className="text-xs text-slate-500 shrink-0">{blocks.length} بخش</span>
        </div>

        <div className="p-4 sm:p-6 space-y-3">
          {visibleBlocks.map((block, index) => (
            <motion.p
              key={`${chapter.id}-${index}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="whitespace-pre-line rounded-2xl border border-slate-800 bg-slate-900/55 px-4 py-4 text-base sm:text-[17px] text-slate-200 leading-8 sm:leading-9"
            >
              {block}
            </motion.p>
          ))}
        </div>

        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="w-full min-h-14 px-5 py-3 border-t border-white/10 bg-amber-500/[0.06] text-amber-200 text-sm font-bold flex items-center justify-center gap-2 hover:bg-amber-500/10 transition-colors"
            aria-expanded={expanded}
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span>{expanded ? 'نمایش کمتر' : `ادامه متن کامل (${blocks.length - 3} بخش دیگر)`}</span>
          </button>
        )}
      </motion.div>
    </div>
  );
};
