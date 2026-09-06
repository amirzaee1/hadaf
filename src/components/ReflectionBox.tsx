import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Check, Feather, LockKeyhole, Save } from 'lucide-react';
import { ChapterData, UserProgress } from '../types';

interface ReflectionBoxProps {
  chapter: ChapterData;
  progress: UserProgress;
  onSaveReflection: (chapterId: number, text: string) => void;
  onCompleteChapter: (chapterId: number) => void;
}

export const ReflectionBox: React.FC<ReflectionBoxProps> = ({ chapter, progress, onSaveReflection, onCompleteChapter }) => {
  const saved = progress.reflections[chapter.id] || '';
  const [text, setText] = useState(saved);
  useEffect(() => setText(saved), [chapter.id, saved]);
  const isCompleted = progress.completedChapters.includes(chapter.id);
  const canComplete = text.trim().length >= 3;

  const complete = () => {
    if (!canComplete) return;
    onSaveReflection(chapter.id, text.trim());
    onCompleteChapter(chapter.id);
  };

  return (
    <div className="relative z-10 my-5 w-full px-1.5">
      <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl border border-amber-500/22 bg-slate-950/88 p-4 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[12px] font-black text-amber-300"><Feather className="h-4 w-4" /><span>پاسخ واقعی تو</span></div>
          <span className={`text-[10px] ${isCompleted ? 'text-emerald-400' : 'text-slate-500'}`}>{isCompleted ? 'این مرحله باز شده' : 'کلید مرحله بعد'}</span>
        </div>
        <p className="mb-3 text-[14px] font-bold leading-7 text-white">{chapter.reflectionPrompt || chapter.cinematic_headline}</p>
        <textarea
          rows={4}
          value={text}
          onChange={(event) => { setText(event.target.value); onSaveReflection(chapter.id, event.target.value); }}
          placeholder="ساده و صادقانه بنویس؛ حتی یک جمله کافی است..."
          className="w-full resize-none rounded-2xl border border-slate-700 bg-slate-900/80 p-3.5 text-[14px] leading-7 text-slate-100 outline-none placeholder:text-slate-600 focus:border-amber-400"
        />
        <button onClick={complete} disabled={!canComplete} className={`mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl px-4 text-sm font-black transition ${isCompleted ? 'border border-emerald-500/30 bg-emerald-500/12 text-emerald-300' : canComplete ? 'bg-gradient-to-l from-amber-400 to-orange-500 text-slate-950' : 'cursor-not-allowed bg-slate-800 text-slate-500'}`}>
          {isCompleted ? <Check className="h-4 w-4" /> : canComplete ? <Save className="h-4 w-4" /> : <LockKeyhole className="h-4 w-4" />}
          <span>{isCompleted ? 'پاسخ ذخیره شد؛ می‌توانی ویرایشش کنی' : canComplete ? 'ذخیره و تکمیل این مرحله' : 'اول پاسخ کوتاهت را بنویس'}</span>
        </button>
      </motion.section>
    </div>
  );
};

