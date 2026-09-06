import React from 'react';

interface CinematicCanvasProps { activeChapter: number; scrollProgress: number; }

export const CinematicCanvas: React.FC<CinematicCanvasProps> = ({ activeChapter }) => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#03060f]">
    <div
      className="absolute inset-0 opacity-70"
      style={{
        backgroundImage: 'radial-gradient(circle at 18% 28%, rgba(251,191,36,.55) 0 1px, transparent 1.8px), radial-gradient(circle at 82% 64%, rgba(148,163,184,.32) 0 1px, transparent 1.8px)',
        backgroundSize: '110px 110px, 145px 145px',
      }}
    />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(34,50,84,.22),transparent_58%)]" />
    {activeChapter === 4 && (
      <svg viewBox="0 0 640 420" className="absolute bottom-0 hidden h-[64vh] w-[760px] -translate-x-1/2 opacity-70 md:block" style={{ left: 'calc(50% - 350px)' }} aria-hidden="true">
        <defs>
          <linearGradient id="lighthouse-beam-right" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fde68a" stopOpacity=".52" />
            <stop offset="1" stopColor="#fde68a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M330 105 L612 28 L612 182 Z" fill="url(#lighthouse-beam-right)" />
        <path d="M285 362 L305 118 L335 118 L355 362 Z" fill="#e7e5e4" opacity=".72" />
        <path d="M292 282 L348 282 M297 222 L343 222 M302 162 L338 162" stroke="#c2413a" strokeWidth="18" opacity=".75" />
        <rect x="297" y="82" width="46" height="38" rx="8" fill="#f8fafc" stroke="#d19b3c" strokeWidth="5" />
        <path d="M291 82 L320 56 L349 82 Z" fill="#c2413a" />
        <circle cx="320" cy="101" r="9" fill="#fde68a" />
        <path d="M208 362 Q320 318 432 362 Z" fill="#172033" />
      </svg>
    )}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(3,6,15,.88)_92%)]" />
  </div>
);
