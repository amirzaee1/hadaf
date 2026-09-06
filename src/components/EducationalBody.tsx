import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Bookmark, BookOpen, Check, Sparkles } from 'lucide-react';
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
  const [activeBlock, setActiveBlock] = useState(0);
  const [furthestBlock, setFurthestBlock] = useState(0);
  const [visibleLines, setVisibleLines] = useState(2);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setActiveBlock(0);
    setFurthestBlock(0);
    setVisibleLines(2);
    setFinished(false);
  }, [chapter.id]);

  const lines = useMemo(
    () => (blocks[activeBlock] || '').split('\n').map((line) => line.trim()).filter(Boolean),
    [blocks, activeBlock],
  );
  const blockComplete = visibleLines >= lines.length;
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

  const moveToBlock = (index: number) => {
    if (index > furthestBlock) return;
    setActiveBlock(index);
    setVisibleLines(2);
    setFinished(index === blocks.length - 1 && finished);
  };

  const continueReading = () => {
    if (!blockComplete) {
      setVisibleLines((count) => Math.min(lines.length, count + 2));
      return;
    }
    if (activeBlock < blocks.length - 1) {
      const next = activeBlock + 1;
      setActiveBlock(next);
      setFurthestBlock((value) => Math.max(value, next));
      setVisibleLines(2);
      return;
    }
    setFinished(true);
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
                <span className="mt-0.5 block text-[11px] leading-5 text-slate-400">بخوان، نقش‌ها را عوض کن و با هم‌تیمی‌ات تمرین کن.</span>
              </div>
            </div>
            <span className="shrink-0 text-[10px] text-slate-500">{activeBlock + 1}/{blocks.length}</span>
          </div>

          <div className="mt-3 flex items-center justify-center gap-1.5" aria-label="بخش‌های گفتگو">
            {blocks.map((_, index) => (
              <button
                key={index}
                onClick={() => moveToBlock(index)}
                disabled={index > furthestBlock}
                aria-label={`بخش ${index + 1}`}
                className={`h-1.5 rounded-full transition-all ${index === activeBlock ? 'w-9 bg-amber-300' : index <= furthestBlock ? 'w-4 bg-slate-500' : 'w-3 bg-slate-800'}`}
              />
            ))}
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.article
            key={`${chapter.id}-${activeBlock}`}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            className="p-2.5"
          >
            <motion.div animate={{ filter: blockComplete ? 'saturate(1.05)' : 'saturate(.82)', scale: blockComplete ? 1 : .99 }} transition={{ duration: .6 }}>
              <InfographicCardVisual chapterId={chapter.id} index={activeBlock} />
            </motion.div>

            <div className="px-1.5 pb-1.5 pt-3">
              <div className="mb-2 flex items-center gap-1.5 text-[10px] font-extrabold tracking-wide text-amber-300/80">
                <Sparkles className="h-3.5 w-3.5" />
                <span>بخش {activeBlock + 1} از {blocks.length}</span>
              </div>

              <div className="space-y-2">
                <AnimatePresence initial={false}>
                  {lines.slice(0, visibleLines).map((trimmed, lineIndex) => {
                    if (trimmed === 'تکلیف اجرایی') {
                      return (
                        <motion.div key={lineIndex} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="my-3 rounded-xl border border-amber-400/35 bg-amber-500/10 px-3 py-2.5 text-center text-sm font-black text-amber-200">
                          {trimmed}
                        </motion.div>
                      );
                    }

                    const isCoach = trimmed.startsWith('مربی:');
                    const isTeammate = trimmed.startsWith('هم‌تیمی:');
                    const speaker = isCoach ? 'مربی' : isTeammate ? 'هم‌تیمی' : '';
                    const dialogue = speaker ? trimmed.slice(trimmed.indexOf(':') + 1).trim() : trimmed;
                    const saved = isSaved(trimmed);

                    return (
                      <motion.div
                        key={lineIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .38 }}
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
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              <div className="mt-3 flex gap-2">
                {activeBlock > 0 && (
                  <button onClick={() => moveToBlock(activeBlock - 1)} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 text-slate-300" aria-label="بخش قبل"><ArrowRight className="h-4 w-4" /></button>
                )}
                <button onClick={continueReading} className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-amber-300 to-orange-500 px-4 text-sm font-black text-slate-950">
                  {finished ? <Check className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                  <span>{!blockComplete ? 'ادامهٔ گفتگو' : activeBlock < blocks.length - 1 ? 'بخش بعدی' : finished ? 'گفتگو کامل شد' : 'پایان گفتگو'}</span>
                </button>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>

        <AnimatePresence>
          {finished && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="border-t border-amber-500/20 bg-amber-500/[.05] p-4">
              <div className="mb-3 flex items-center gap-2 text-xs font-black text-amber-300"><Sparkles className="h-4 w-4" /><span>سه جمله از همین مرحله</span></div>
              <div className="space-y-2">
                {keyLines.map((line) => (
                  <button key={line} onClick={() => toggleSentence(line)} className="flex w-full items-start gap-2 rounded-2xl border border-white/8 bg-slate-950/70 p-3 text-right">
                    <Bookmark className={`mt-1 h-3.5 w-3.5 shrink-0 ${isSaved(line) ? 'text-amber-300' : 'text-slate-600'}`} fill={isSaved(line) ? 'currentColor' : 'none'} />
                    <span className="text-[12px] leading-6 text-slate-200">{line}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </div>
  );
};
