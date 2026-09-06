import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Check, Feather, Sparkles, Clock } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface InteractiveJournalProps {
  prompt: string;
  initialValue?: string;
  placeholder?: string;
  onSave: (value: string) => void;
  chapterNumber?: number;
  className?: string;
  minChars?: number;
}

export const InteractiveJournal: React.FC<InteractiveJournalProps> = ({
  prompt,
  initialValue = '',
  placeholder = 'صادقانه و بدون سانسور در اینجا بنویس...',
  onSave,
  chapterNumber,
  className = '',
  minChars = 10,
}) => {
  const [content, setContent] = useState(initialValue);
  const [isSaved, setIsSaved] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  useEffect(() => {
    setContent(initialValue);
  }, [initialValue]);

  const handleSave = () => {
    if (!content.trim()) return;
    onSave(content);
    soundEngine.playChime(660);
    setIsSaved(true);
    setLastSavedTime(new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }));
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-amber-500/25 space-y-3.5 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <Feather className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-black text-amber-200">
            {chapterNumber ? `دفترچه تاملات فصل ${chapterNumber}` : 'دفترچه تاملات درونی'}
          </h4>
        </div>

        {lastSavedTime && (
          <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
            <Clock className="w-3 h-3" />
            ذخیره: {lastSavedTime}
          </span>
        )}
      </div>

      {/* Prompt Question */}
      <p className="text-xs font-bold text-slate-200 leading-relaxed text-right">
        {prompt}
      </p>

      {/* Writing Area */}
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (isSaved) setIsSaved(false);
          }}
          placeholder={placeholder}
          rows={3}
          className="w-full p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 resize-none transition-all leading-relaxed"
        />
        <span className="absolute left-2.5 bottom-2.5 text-[10px] text-slate-500 font-mono">
          {content.length} نویسه
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <div className="text-[10px] text-slate-400">
          {content.length < minChars ? (
            <span className="text-amber-400/80">برای ژرف‌نگری حداقل {minChars} نویسه بنویسید</span>
          ) : (
            <span className="text-emerald-400 flex items-center gap-1">
              <Check className="w-3 h-3" /> آماده ثبت در پرونده
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={content.length < 3}
          className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all active:scale-95 ${
            isSaved
              ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]'
              : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.25)]'
          }`}
        >
          {isSaved ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>ثبت شد</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>ثبت در کتابچه چشم‌انداز</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
