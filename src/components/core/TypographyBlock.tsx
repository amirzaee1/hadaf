import React from 'react';
import { motion } from 'motion/react';

interface TypographyBlockProps {
  headline?: string;
  subheadline?: string;
  lead?: string;
  paragraphs?: string[];
  keyTakeaway?: string;
  quote?: string;
  quoteAuthor?: string;
  className?: string;
  align?: 'right' | 'center';
}

export const TypographyBlock: React.FC<TypographyBlockProps> = ({
  headline,
  subheadline,
  lead,
  paragraphs = [],
  keyTakeaway,
  quote,
  quoteAuthor,
  className = '',
  align = 'right',
}) => {
  return (
    <div className={`space-y-4 ${align === 'center' ? 'text-center' : 'text-right'} ${className}`}>
      {/* Subheadline / Badge */}
      {subheadline && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-extrabold text-xs tracking-wide"
        >
          {subheadline}
        </motion.div>
      )}

      {/* Main Headline */}
      {headline && (
        <h2 className="text-xl sm:text-2xl font-black text-white font-serif leading-snug tracking-tight">
          {headline}
        </h2>
      )}

      {/* Lead Paragraph */}
      {lead && (
        <p className="text-sm text-amber-100/90 font-medium leading-relaxed bg-amber-500/5 p-3 rounded-2xl border-r-2 border-amber-400">
          {lead}
        </p>
      )}

      {/* Body Paragraphs */}
      {paragraphs.length > 0 && (
        <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
          {paragraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      )}

      {/* Key Takeaway Banner */}
      {keyTakeaway && (
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
          <span className="text-amber-400 font-black text-base shrink-0">✦</span>
          <div>
            <strong className="text-amber-300 font-bold block mb-0.5">آموزه راهبردی:</strong>
            <span className="leading-relaxed">{keyTakeaway}</span>
          </div>
        </div>
      )}

      {/* Callout Quote */}
      {quote && (
        <blockquote className="my-3 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900/80 to-transparent border-r-4 border-amber-400 text-amber-200 text-xs sm:text-sm italic font-serif">
          «{quote}»
          {quoteAuthor && (
            <cite className="block text-[11px] text-slate-400 mt-1 not-italic font-sans">
              — {quoteAuthor}
            </cite>
          )}
        </blockquote>
      )}
    </div>
  );
};
