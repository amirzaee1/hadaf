import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';

interface CinematicRevealProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  eyebrow?: string;
  title: string;
  instruction: string;
  result: string;
  accent?: string;
  compact?: boolean;
  className?: string;
}

export const CinematicReveal: React.FC<CinematicRevealProps> = ({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  eyebrow = 'یک لحظه برای دیدن',
  title,
  instruction,
  result,
  accent = '#fbbf24',
  compact = false,
  className = '',
}) => {
  const [revealed, setRevealed] = useState(false);

  const toggle = () => {
    setRevealed((value) => !value);
    if ('vibrate' in navigator) navigator.vibrate?.(revealed ? 8 : [10, 24, 10]);
  };

  return (
    <section
      className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-[#050811] shadow-[0_22px_60px_rgba(0,0,0,.46)] ${className}`}
      style={{ '--scene-accent': accent } as React.CSSProperties}
    >
      <button
        type="button"
        onClick={toggle}
        aria-pressed={revealed}
        className="group relative block w-full overflow-hidden text-right focus-visible:outline-none"
      >
        <div className={`relative w-full overflow-hidden bg-[#f7f3ea] ${compact ? 'aspect-[16/10]' : 'aspect-[3/2]'}`}>
          <motion.img
            src={beforeSrc}
            alt={beforeAlt}
            width="960"
            height="640"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            animate={{ scale: revealed ? 1.035 : 1 }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={false}
            animate={{ clipPath: revealed ? 'circle(145% at 50% 52%)' : 'circle(0% at 50% 52%)' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src={afterSrc}
              alt={afterAlt}
              width="960"
              height="640"
              decoding="async"
              className="h-full w-full object-cover"
              initial={false}
              animate={{ scale: revealed ? 1 : 1.08 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050811]/88 via-transparent to-white/5" />
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{ background: accent }}
            animate={{ opacity: revealed ? [0, 0.28, 0] : 0, scale: revealed ? [0.3, 1.4, 2.1] : 0.3 }}
            transition={{ duration: 1.15 }}
          />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
            <div>
              <span className="text-[10px] font-black" style={{ color: accent }}>{eyebrow}</span>
              <h3 className="mt-1 max-w-[255px] text-[17px] font-black leading-7 text-white drop-shadow-lg">{title}</h3>
            </div>
            <motion.span
              animate={{ rotate: revealed ? -180 : 0, scale: revealed ? 1.05 : 1 }}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white shadow-xl backdrop-blur-md"
              style={{ boxShadow: `0 0 28px ${accent}35` }}
            >
              {revealed ? <RotateCcw className="h-4 w-4" /> : <ArrowLeft className="h-5 w-5" />}
            </motion.span>
          </div>
        </div>

        <div className="relative flex min-h-[58px] items-center gap-3 border-t border-white/8 px-4 py-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ color: accent, background: `${accent}18` }}>
            <Sparkles className="h-4 w-4" />
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={revealed ? 'result' : 'instruction'}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className={`text-[12px] leading-6 ${revealed ? 'font-bold text-white' : 'text-slate-400'}`}
            >
              {revealed ? result : instruction}
            </motion.p>
          </AnimatePresence>
        </div>
      </button>
    </section>
  );
};
