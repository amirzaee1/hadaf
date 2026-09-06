import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Feather, Check, Sparkles, Save } from 'lucide-react';
import { ChapterData, UserProgress } from '../types';
import { soundEngine } from '../utils/audio';

interface ReflectionBoxProps {
  chapter: ChapterData;
  progress: UserProgress;
  onSaveReflection: (chapterId: number, text: string) => void;
  onCompleteChapter: (chapterId: number) => void;
}

export const ReflectionBox: React.FC<ReflectionBoxProps> = ({
  chapter,
  progress,
  onSaveReflection,
  onCompleteChapter,
}) => {
  const currentReflection = progress.reflections[chapter.id] || '';
  const [text, setText] = useState(currentReflection);
  const [savedTime, setSavedTime] = useState<string | null>(null);

  const isCompleted = progress.completedChapters.includes(chapter.id);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);
    onSaveReflection(chapter.id, val);
    setSavedTime('ذخیره‌شده به‌صورت خودکار');
  };

  const handleManualComplete = () => {
    onSaveReflection(chapter.id, text);
    onCompleteChapter(chapter.id);
    soundEngine.playChime(783.99); // G5 harmonic note
    setSavedTime('تأمل و دستاورد این فصل با موفقیت ثبت شد.');
  };

  return (
    <div className="relative z-10 w-full px-4 my-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7 }}
        className="cinematic-panel p-4 sm:p-6 rounded-2xl relative border-t-2 border-t-amber-500/50"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Feather className="w-4 h-4 text-amber-400" />
            <span>یادداشت من</span>
          </div>
          {savedTime && (
            <span className="text-[11px] text-emerald-400/90 flex items-center gap-1 font-mono">
              <Check className="w-3 h-3" />
              {savedTime}
            </span>
          )}
        </div>

        <p className="text-sm sm:text-base font-semibold text-slate-200 mb-4 leading-relaxed">
          {chapter.cinematic_headline || chapter.level1Quote}
        </p>

        <div className="relative">
          <textarea
            rows={4}
            value={text}
            onChange={handleTextChange}
            placeholder="پاسخ یا برداشت خودت را ساده و کوتاه بنویس..."
            className="w-full bg-slate-950/70 border border-slate-700/80 focus:border-amber-400/80 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all leading-relaxed resize-none focus:ring-1 focus:ring-amber-400/30"
          />
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <span className="text-xs text-slate-400 font-mono">
            {text.trim() ? `${text.trim().split(/\s+/).length} کلمه نوشته‌ای` : 'حتی یک جمله کوتاه کافی است.'}
          </span>

          <button
            onClick={handleManualComplete}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              isCompleted
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.3)]'
            }`}
          >
            {isCompleted ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>ذخیره شد؛ می‌توانی ویرایشش کنی</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-black" />
                <span>ذخیره و تکمیل این مرحله</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
