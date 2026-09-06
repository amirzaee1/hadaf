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
          <div key={lineIndex} className="my-3 rounded-xl border border-amber-400/35 bg-amber-500/10 px-3 py-2.5 text-center text-sm font-black text-amber-200">
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
          className={`rounded-xl border px-3 py-2.5 ${
            isCoach
              ? 'border-amber-400/20 bg-amber-500/[0.07]'
              : isTeammate
                ? 'border-cyan-400/20 bg-cyan-500/[0.06]'
                : 'border-slate-700/70 bg-slate-950/60'
          }`}
        >
          <div className="flex items-start gap-2.5">
            {speaker && (
              <span className={`mt-0.5 shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-black leading-5 ${
                isCoach
                  ? 'border-amber-400/20 bg-amber-400/10 text-amber-300'
                  : 'border-cyan-400/20 bg-cyan-400/10 text-cyan-300'
              }`}>
                {speaker}
              </span>
            )}
            <p className="min-w-0 text-[14px] font-normal leading-7 text-slate-100">
              {renderHighlightedText(dialogue)}
            </p>
          </div>
        </div>
      );
    });

  return (
    <div className="relative z-10 my-4 w-full px-1.5">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3.5">
          <div className="flex items-center gap-2.5 text-amber-300 font-bold">
            <span className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center">
              <BookOpen className="w-4.5 h-4.5" />
            </span>
            <div>
              <span className="block text-[15px] font-black tracking-tight">سناریوی گفت‌وگو</span>
              <span className="mt-0.5 block text-[11px] font-normal leading-5 text-slate-400">بخوان، نقش‌ها را عوض کن و با هم‌تیمی‌ات تمرین کن.</span>
            </div>
          </div>
          <span className="text-xs text-slate-500 shrink-0">{blocks.length} بخش</span>
        </div>

        <div className="space-y-3 p-2.5">
          {blocks.map((block, index) => (
            <motion.article
              key={`${chapter.id}-${index}`}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45 }}
              className="group rounded-2xl border border-slate-800/90 bg-slate-900/55 p-2 shadow-[0_10px_28px_rgba(0,0,0,0.2)] transition-colors hover:border-amber-500/30"
            >
              {index === 0 && <InfographicCardVisual chapterId={chapter.id} index={index} />}
              <div className={`px-1.5 pb-1.5 ${index === 0 ? 'pt-3' : 'pt-1.5'}`}>
                <div className="mb-2 flex items-center gap-1.5 text-[10px] font-extrabold tracking-wide text-amber-300/80">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>بخش {index + 1} از {blocks.length}</span>
                </div>
                <div className="space-y-2">{renderDialogueBlock(block)}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
