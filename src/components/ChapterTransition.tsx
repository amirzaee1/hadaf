import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, CheckCircle2, LockKeyhole, Sparkles } from 'lucide-react';
import { ChapterData } from '../types';
import { getChapterTheme } from '../utils/chapterTheme';

interface ChapterTransitionProps { chapter: ChapterData; isLast: boolean; isCompleted: boolean; onNext: () => void; onOpenWorkshop: () => void; }

export const ChapterTransition: React.FC<ChapterTransitionProps> = ({ chapter, isLast, isCompleted, onNext, onOpenWorkshop }) => {
  const theme = getChapterTheme(chapter.id);
  return (
    <motion.aside initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-1 mt-5 overflow-hidden rounded-3xl border text-center" style={{ borderColor: `${theme.accent}40`, background: `${theme.surface}` }}>
      <div className="relative h-28 overflow-hidden border-b border-white/8 bg-[#050811]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,255,255,.08),transparent_60%)]" />
        <motion.div
          className="absolute bottom-0 left-1/2 h-20 w-9 -translate-x-1/2 rounded-t-full border border-white/10 bg-slate-950"
          animate={{ boxShadow: isCompleted ? `0 0 50px 16px ${theme.glow}` : '0 0 0 0 transparent' }}
        >
          <motion.div
            className="absolute inset-y-2 left-1/2 w-1 -translate-x-1/2 rounded-full"
            style={{ background: theme.accent }}
            animate={{ opacity: isCompleted ? [0.45, 1, 0.45] : 0.1 }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </motion.div>
        <motion.span
          className="absolute bottom-3 right-[18%] h-3.5 w-3.5 rounded-full border-2 bg-[#050811]"
          style={{ borderColor: theme.accent }}
          animate={isCompleted ? { right: '47%', scale: [1, 1.15, 0.75], opacity: [1, 1, 0] } : undefined}
          transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
        />
        <span className="absolute inset-x-0 top-3 text-[10px] font-black" style={{ color: theme.accentSoft }}>
          {isCompleted ? 'درِ مرحلهٔ بعد باز شد' : 'پاسخ تو، کلید ادامهٔ راه است'}
        </span>
      </div>
      <div className="p-4">
      <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl border" style={{ color: isCompleted ? '#6ee7b7' : theme.accentSoft, borderColor: `${theme.accent}50` }}>{isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <LockKeyhole className="h-5 w-5" />}</span>
      <p className="mt-3 text-[13px] leading-7 text-slate-300">{isCompleted ? 'پاسخت ثبت شد. حالا انتخاب ادامه مسیر دست خودت است.' : 'مرحله بعد تا زمانی که پاسخ این بخش را ثبت نکنی پنهان می‌ماند.'}</p>
      <button disabled={!isCompleted} onClick={isLast ? onOpenWorkshop : onNext} className={`mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl text-sm font-black ${isCompleted ? 'text-slate-950' : 'cursor-not-allowed bg-slate-800 text-slate-600'}`} style={isCompleted ? { background: `linear-gradient(135deg, ${theme.accentSoft}, ${theme.accent})` } : undefined}>
        {isLast ? <Sparkles className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
        <span>{isLast ? 'ورود به کارگاه ساخت هدف' : 'قدم بعدی را باز کن'}</span>
      </button>
      </div>
    </motion.aside>
  );
};
