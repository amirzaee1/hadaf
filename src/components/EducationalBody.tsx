import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Sparkles } from 'lucide-react';
import { ChapterData } from '../types';
import { InfographicCardVisual } from './InfographicCardVisual';

interface EducationalBodyProps {
  chapter: ChapterData;
}

export const EducationalBody: React.FC<EducationalBodyProps> = ({ chapter }) => {
  const blocks = useMemo(
    () => (chapter.original_text || '').split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean),
    [chapter.original_text],
  );
  const highlightTerms = useMemo(() => [
    'هدف واقعی', 'هدف قرضی', 'نکته طلایی', 'سؤال خیلی مهم', 'پاسخ کوتاه و تلخ',
    'درد واقعی', 'ارزش‌ها', 'شخصیت', 'تعهد', 'عمل می‌کند', 'تغییر پایدار',
    'بیداری واقعی', 'مهم', 'ضروری', 'SMART', 'چرا', 'تمرین', 'نتیجه',
  ], []);

  const renderHighlightedText = (text: string) => {
    const escaped = highlightTerms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(«[^»]+»|${escaped.join('|')})`, 'g');

    return text.split(regex).map((part, partIndex) => {
      const important = /^«[^»]+»$/.test(part) || highlightTerms.includes(part);
      return important ? (
        <strong key={partIndex} className="font-black text-amber-200 decoration-amber-400/70 underline decoration-2 underline-offset-4">
          {part}
        </strong>
      ) : part;
    });
  };

  const renderDialogueBlock = (block: string) =>
    block.split('\n').map((line, lineIndex) => {
      const trimmed = line.trim();

      if (trimmed === 'تکلیف اجرایی') {
        return (
          <div key={lineIndex} className="my-4 rounded-2xl border border-amber-400/35 bg-amber-500/10 px-4 py-3 text-center text-base font-black text-amber-200">
            تکلیف اجرایی
          </div>
        );
      }

      const isCoach = trimmed.startsWith('مربی:');
      const isTeammate = trimmed.startsWith('هم‌تیمی:');
      const speaker = isCoach ? 'مربی' : isTeammate ? 'هم‌تیمی' : '';
      const dialogue = speaker ? trimmed.slice(trimmed.indexOf(':') + 1).trim() : trimmed;

      return (
        <div
          key={lineIndex}
          className={`rounded-2xl border px-3.5 py-3 ${
            isCoach
              ? 'border-amber-400/20 bg-amber-500/[0.07]'
              : isTeammate
                ? 'border-cyan-400/20 bg-cyan-500/[0.06]'
                : 'border-slate-700/70 bg-slate-950/60'
          }`}
        >
          {speaker && (
            <span className={`mb-1.5 block text-[11px] font-black ${isCoach ? 'text-amber-300' : 'text-cyan-300'}`}>
              {speaker}
            </span>
          )}
          <p className="text-[15px] font-normal leading-8 text-slate-100 sm:text-[17px] sm:leading-9">
            {renderHighlightedText(dialogue)}
          </p>
        </div>
      );
    });

  return (
    <div className="relative z-10 w-full px-3 sm:px-4 my-5">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between gap-3 px-5 sm:px-7 py-5 border-b border-white/10 bg-white/[0.03]">
          <div className="flex items-center gap-2.5 text-amber-300 font-bold">
            <span className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center">
              <BookOpen className="w-4.5 h-4.5" />
            </span>
            <div>
              <span className="block text-base sm:text-lg font-black tracking-tight">سناریوی گفت‌وگو</span>
              <span className="block text-xs sm:text-sm text-slate-400 font-normal mt-1 leading-6">بخوان، نقش‌ها را عوض کن و با هم‌تیمی‌ات تمرین کن.</span>
            </div>
          </div>
          <span className="text-xs text-slate-500 shrink-0">{blocks.length} بخش</span>
        </div>

        <div className="p-4 sm:p-7 space-y-5 sm:space-y-7">
          {blocks.map((block, index) => (
            <motion.article
              key={`${chapter.id}-${index}`}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45 }}
              className="group rounded-[26px] border border-slate-800/90 bg-slate-900/55 p-3 sm:p-4 shadow-[0_14px_40px_rgba(0,0,0,0.22)] transition-colors hover:border-amber-500/30"
            >
              <InfographicCardVisual chapterId={chapter.id} index={index} />
              <div className="px-2 pb-2 pt-5 sm:px-3 sm:pb-3 sm:pt-6">
                <div className="mb-3 flex items-center gap-2 text-[10px] font-extrabold tracking-wide text-amber-300/80">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>بخش {index + 1} از {blocks.length}</span>
                </div>
                <div className="space-y-2.5">{renderDialogueBlock(block)}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
