import React from 'react';
import { motion } from 'motion/react';

interface TypographyProps {
  headline?: string;
  lead?: string;
  body?: string | React.ReactNode;
  highlightWords?: string[];
  animationStyle?: 'fade' | 'reveal' | 'slide' | 'focus';
  align?: 'right' | 'center' | 'left';
  className?: string;
  badge?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  headline,
  lead,
  body,
  highlightWords = [],
  animationStyle = 'focus',
  align = 'right',
  className = '',
  badge,
}) => {
  // Helper to highlight words with golden glow in Persian text
  const renderHighlightedText = (text: string) => {
    if (!highlightWords.length) return text;

    const regex = new RegExp(`(${highlightWords.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => {
      const isMatch = highlightWords.some(w => w.toLowerCase() === part.toLowerCase());
      if (isMatch) {
        return (
          <span
            key={index}
            className="text-amber-300 font-black px-1 rounded bg-amber-500/10 border-b border-amber-400/40 inline-block"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const getInitialAnimation = () => {
    switch (animationStyle) {
      case 'slide':
        return { opacity: 0, x: 20 };
      case 'reveal':
        return { opacity: 0, clipPath: 'inset(0 0 100% 0)' };
      case 'focus':
        return { opacity: 0, filter: 'blur(6px)', y: 12 };
      case 'fade':
      default:
        return { opacity: 0, y: 15 };
    }
  };

  const getTargetAnimation = () => {
    switch (animationStyle) {
      case 'slide':
        return { opacity: 1, x: 0 };
      case 'reveal':
        return { opacity: 1, clipPath: 'inset(0 0 0% 0)' };
      case 'focus':
        return { opacity: 1, filter: 'blur(0px)', y: 0 };
      case 'fade':
      default:
        return { opacity: 1, y: 0 };
    }
  };

  const alignClass =
    align === 'center' ? 'text-center items-center' : align === 'left' ? 'text-left items-start' : 'text-right items-start';

  return (
    <motion.div
      initial={getInitialAnimation()}
      whileInView={getTargetAnimation()}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`flex flex-col ${alignClass} space-y-2.5 ${className}`}
    >
      {badge && (
        <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
          {badge}
        </span>
      )}

      {headline && (
        <h2 className="text-xl sm:text-2xl font-black text-white leading-snug font-serif tracking-tight">
          {typeof headline === 'string' ? renderHighlightedText(headline) : headline}
        </h2>
      )}

      {lead && (
        <p className="text-sm font-semibold text-amber-200/90 leading-relaxed max-w-xl">
          {typeof lead === 'string' ? renderHighlightedText(lead) : lead}
        </p>
      )}

      {body && (
        <div className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
          {typeof body === 'string' ? renderHighlightedText(body) : body}
        </div>
      )}
    </motion.div>
  );
};
