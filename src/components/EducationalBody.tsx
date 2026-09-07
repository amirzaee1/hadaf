import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Bookmark, BookOpen, Sparkles } from 'lucide-react';
import { ChapterData, UserProgress } from '../types';
import { InfographicCardVisual } from './InfographicCardVisual';

interface EducationalBodyProps {
  chapter: ChapterData;
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
}

const highlightTerms = [
  'هدف واقعی', 'هدف قرضی', 'نکته طلایی', 'سؤال خیلی مهم', 'پاسخ کوتاه و تلخ',
  'درد واقعی', 'ارزش‌ها', 'شخصیت', 'تعهد', 'عمل می‌کند', 'تغییر پایدار',
  'بیداری واقعی', 'مهم', 'ضروری', 'SMART', 'چرا', 'تمرین', 'نتیجه',
];

export const EducationalBody: React.FC<EducationalBodyProps> = ({ chapter, progress, onUpdateProgress }) => {
  const blocks = useMemo(
    () => (chapter.original_text || '').split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean),
    [chapter.original_text],
  );
  const savedSentences = progress.savedSentences || [];

  const exactLines = useMemo(
    () => (chapter.original_text || '').split('\n').map((line) => line.trim()).filter((line) => line.length >= 35 && line !== 'تکلیف اجرایی'),
    [chapter.original_text],
  );
  const keyLines = useMemo(() => {
    if (exactLines.length <= 3) return exactLines;
    return [exactLines[0], exactLines[Math.floor((exactLines.length - 1) / 2)], exactLines[exactLines.length - 1]];
  }, [exactLines]);

  const renderHighlightedText = (text: string) => {
    const escaped = highlightTerms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(«[^»]+»|${escaped.join('|')})`, 'g');
    return text.split(regex).map((part, index) => {
      const important = /^«[^»]+»$/.test(part) || highlightTerms.includes(part);
      return important ? (
        <strong key={index} className="font-black text-amber-200 decoration-amber-400/70 underline decoration-2 underline-offset-4">{part}</strong>
      ) : part;
    });
  };

  const isSaved = (text: string) => savedSentences.some((item) => item.chapterId === chapter.id && item.text === text);

  const toggleSentence = (text: string) => {
    onUpdateProgress((prev) => {
      const current = prev.savedSentences || [];
      const exists = current.some((item) => item.chapterId === chapter.id && item.text === text);
      return {
        ...prev,
        savedSentences: exists
          ? current.filter((item) => !(item.chapterId === chapter.id && item.text === text))
          : [...current, { chapterId: chapter.id, text }],
      };
    });
  };

  return (
    <div className="relative z-10 my-4 w-full px-1.5">
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl"
      >
        <header className="border-b border-white/10 bg-white/[0.03] px-4 py-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-amber-300">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15"><BookOpen className="h-4.5 w-4.5" /></span>
              <div>
                <span className="block text-[15px] font-black">سناریوی گفت‌وگو</span>
                <span className="mt-0.5 block text-[11px] leading-5 text-slate-400">گفت‌وگو را پیوسته بخوان و با اسکرول جلو برو.</span>
              </div>
            </div>
            <span className="shrink-0 rounded-full border border-white/10 bg-white/[.04] px-2 py-1 text-[10px] text-slate-400">{blocks.length} بخش</span>
          </div>
        </header>

        <div className="space-y-5 p-2.5">
          {blocks.map((block, blockIndex) => {
            const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);

            return (
              <motion.article
                key={`${chapter.id}-${blockIndex}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: .42 }}
                className="overflow-hidden rounded-[1.4rem] border border-white/[.08] bg-slate-950/45"
              >
                <InfographicCardVisual chapterId={chapter.id} index={blockIndex} />

                <div className="px-2.5 pb-3 pt-3">
                  <div className="mb-2.5 flex items-center gap-1.5 text-[10px] font-extrabold tracking-wide text-amber-300/80">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>بخش {blockIndex + 1} از {blocks.length}</span>
                  </div>

                  <div className="space-y-2">
                    {lines.map((trimmed, lineIndex) => {
                      if (trimmed === 'تکلیف اجرایی') {
                        return (
                          <div key={lineIndex} className="my-3 rounded-xl border border-amber-400/35 bg-amber-500/10 px-3 py-2.5 text-center text-sm font-black text-amber-200">
                            {trimmed}
                          </div>
                        );
                      }

                      const isCoach = trimmed.startsWith('مربی:');
                      const isTeammate = trimmed.startsWith('هم‌تیمی:');
                      const speaker = isCoach ? 'مربی' : isTeammate ? 'هم‌تیمی' : '';
                      const dialogue = speaker ? trimmed.slice(trimmed.indexOf(':') + 1).trim() : trimmed;
                      const saved = isSaved(trimmed);

                      return (
                        <div
                          key={lineIndex}
                          className={`relative rounded-2xl border px-3 py-3 ${isCoach ? 'border-amber-400/20 bg-amber-500/[0.07]' : isTeammate ? 'border-cyan-400/20 bg-cyan-500/[0.06]' : 'border-slate-700/70 bg-slate-950/60'}`}
                        >
                          <div className="flex items-start gap-2.5">
                            {speaker && (
                              <span className={`mt-0.5 shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-black leading-5 ${isCoach ? 'border-amber-400/20 bg-amber-400/10 text-amber-300' : 'border-cyan-400/20 bg-cyan-400/10 text-cyan-300'}`}>{speaker}</span>
                            )}
                            <p className="min-w-0 flex-1 text-[14px] font-normal leading-7 text-slate-100">{renderHighlightedText(dialogue)}</p>
                            <button onClick={() => toggleSentence(trimmed)} aria-label={saved ? 'حذف از جمله‌های من' : 'ذخیره در جمله‌های من'} className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${saved ? 'bg-amber-400 text-slate-950' : 'bg-white/[.05] text-slate-500'}`}>
                              <Bookmark className="h-3.5 w-3.5" fill={saved ? 'currentColor' : 'none'} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {keyLines.length > 0 && (
          <div className="border-t border-amber-500/20 bg-amber-500/[.05] p-4">
            <div className="mb-3 flex items-center gap-2 text-xs font-black text-amber-300"><Sparkles className="h-4 w-4" /><span>سه جمله از همین مرحله</span></div>
            <div className="space-y-2">
              {keyLines.map((line) => (
                <button key={line} onClick={() => toggleSentence(line)} className="flex w-full items-start gap-2 rounded-2xl border border-white/8 bg-slate-950/70 p-3 text-right">
                  <Bookmark className={`mt-1 h-3.5 w-3.5 shrink-0 ${isSaved(line) ? 'text-amber-300' : 'text-slate-600'}`} fill={isSaved(line) ? 'currentColor' : 'none'} />
                  <span className="text-[12px] leading-6 text-slate-200">{line}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.section>
    </div>
  );
};
