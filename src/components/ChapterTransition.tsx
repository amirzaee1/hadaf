import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, CheckCircle2, LockKeyhole, Sparkles } from 'lucide-react';
import { ChapterData } from '../types';
import { getChapterTheme } from '../utils/chapterTheme';

interface ChapterTransitionProps { chapter: ChapterData; isLast: boolean; isCompleted: boolean; onNext: () => void; onOpenWorkshop: () => void; }

export const ChapterTransition: React.FC<ChapterTransitionProps> = ({ chapter, isLast, isCompleted, onNext, onOpenWorkshop }) => {
  const theme = getChapterTheme(chapter.id);
  return (
    <motion.aside initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-1 mt-5 rounded-3xl border p-4 text-center" style={{ borderColor: `${theme.accent}40`, background: `${theme.surface}` }}>
      <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl border" style={{ color: isCompleted ? '#6ee7b7' : theme.accentSoft, borderColor: `${theme.accent}50` }}>{isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <LockKeyhole className="h-5 w-5" />}</span>
      <p className="mt-3 text-[13px] leading-7 text-slate-300">{isCompleted ? 'پاسخت ثبت شد. حالا انتخاب ادامه مسیر دست خودت است.' : 'مرحله بعد تا زمانی که پاسخ این بخش را ثبت نکنی پنهان می‌ماند.'}</p>
      <button disabled={!isCompleted} onClick={isLast ? onOpenWorkshop : onNext} className={`mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl text-sm font-black ${isCompleted ? 'text-slate-950' : 'cursor-not-allowed bg-slate-800 text-slate-600'}`} style={isCompleted ? { background: `linear-gradient(135deg, ${theme.accentSoft}, ${theme.accent})` } : undefined}>
        {isLast ? <Sparkles className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
        <span>{isLast ? 'ورود به کارگاه ساخت هدف' : 'قدم بعدی را باز کن'}</span>
      </button>
    </motion.aside>
  );
};

