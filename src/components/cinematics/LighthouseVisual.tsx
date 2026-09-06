import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Waves, Sun, Sparkles } from 'lucide-react';
import { UserProgress } from '../../types';
import { soundEngine } from '../../utils/audio';

interface LighthouseVisualProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
}

export const LighthouseVisual: React.FC<LighthouseVisualProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [clarity, setClarity] = useState<number>(progress.horizonClarity || 60);

  const handleClarityChange = (val: number) => {
    setClarity(val);
    onUpdateProgress((prev) => ({
      ...prev,
      horizonClarity: val,
      oceanCalmLevel: val,
    }));
    soundEngine.playTick();
    if (val >= 90) {
      soundEngine.playChime(784); // G5 light reveal chime
    }
  };

  // Progression math
  const stormOpacity = Math.max(0.05, 1 - clarity / 90);
  const lighthouseBrightness = 0.3 + (clarity / 100) * 0.7;
  const boatAdvance = (clarity / 100) * 80; // pixels forward
  const beamAngle = 20 + (clarity / 100) * 45;

  return (
    <div className="w-full flex flex-col items-center justify-center relative py-2">
      {/* Cinematic Typography Banner */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 font-extrabold text-xs tracking-wide text-center"
      >
        «وقتی مقصد روشن باشد، مسیر پیدا می‌شود»
      </motion.div>

      {/* The Ocean Canvas */}
      <div className="relative w-full max-w-[340px] rounded-2xl overflow-hidden bg-[#020617] border border-cyan-500/30 p-3 shadow-2xl">
        {/* Ocean Viewport */}
        <div className="relative h-[180px] w-full rounded-xl overflow-hidden bg-gradient-to-b from-[#030712] via-[#081b33] to-[#040d1a]">
          {/* Distant Lighthouse Island & Tower */}
          <div className="absolute top-8 left-8 flex flex-col items-center z-10">
            {/* Pulsing beacon glow */}
            <div
              className="w-12 h-12 rounded-full absolute -top-4 -left-4 blur-xl transition-all duration-500 pointer-events-none"
              style={{
                backgroundColor: `rgba(254, 240, 138, ${lighthouseBrightness * 0.9})`,
                transform: `scale(${0.8 + (clarity / 100) * 1.2})`,
              }}
            />

            {/* Tower SVG */}
            <svg viewBox="0 0 40 60" className="w-8 h-12 relative z-10">
              <polygon points="12,50 28,50 24,18 16,18" fill="#e2e8f0" />
              <rect x="14" y="12" width="12" height="6" fill="#d97706" />
              <circle cx="20" cy="15" r="4" fill="#fef08a" />
              <polygon points="10,55 30,55 28,50 12,50" fill="#475569" />
              {/* Rocky cliff base */}
              <path d="M 5 60 Q 20 48 35 60 Z" fill="#1e293b" />
            </svg>

            {/* Light beam sweeping over ocean */}
            <svg
              viewBox="0 0 260 160"
              className="absolute -top-6 -left-3 w-[240px] h-[150px] pointer-events-none z-0"
              style={{
                opacity: lighthouseBrightness,
                transform: `rotate(${-(100 - clarity) * 0.15}deg)`,
                transformOrigin: '20px 20px',
              }}
            >
              <polygon points="20,20 260,0 260,120" fill="url(#oceanBeam)" />
              <defs>
                <linearGradient id="oceanBeam" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Golden Reflection Path on the Water */}
          <div
            className="absolute bottom-0 left-12 w-48 h-20 transition-all duration-700 pointer-events-none"
            style={{
              opacity: (clarity / 100) * 0.8,
              background: 'radial-gradient(ellipse at 50% 100%, rgba(245, 158, 11, 0.5) 0%, rgba(245, 158, 11, 0.15) 50%, transparent 80%)',
            }}
          />

          {/* Dynamic Ocean Waves SVG */}
          <svg viewBox="0 0 300 90" className="absolute bottom-0 left-0 w-full h-[80px] z-10">
            {/* Deep waves layer */}
            <path
              d={
                clarity > 70
                  ? 'M 0 45 Q 75 40 150 45 T 300 45 L 300 90 L 0 90 Z'
                  : 'M 0 50 Q 50 25 100 50 T 200 50 T 300 50 L 300 90 L 0 90 Z'
              }
              fill="#0a192f"
              className="transition-all duration-700"
            />
            {/* Mid waves layer */}
            <path
              d={
                clarity > 70
                  ? 'M 0 55 Q 80 50 160 55 T 300 55 L 300 90 L 0 90 Z'
                  : 'M 0 60 Q 40 35 90 60 T 180 60 T 280 60 L 300 90 L 0 90 Z'
              }
              fill="#0f2b48"
              opacity="0.8"
              className="transition-all duration-700"
            />
            {/* Crest wave */}
            <path
              d={
                clarity > 70
                  ? 'M 0 65 Q 90 62 180 65 T 300 65 L 300 90 L 0 90 Z'
                  : 'M 0 70 Q 60 48 120 70 T 240 70 L 300 90 L 0 90 Z'
              }
              fill={clarity > 60 ? '#1e3a8a' : '#172554'}
              opacity="0.9"
              className="transition-all duration-700"
            />
          </svg>

          {/* Traveler's Boat (Rocks gently on waves, moves forward toward lighthouse) */}
          <div
            className="absolute bottom-6 z-20 transition-all duration-700"
            style={{
              right: `${20 + boatAdvance}px`,
              transform: `rotate(${Math.sin(clarity * 0.1) * (1 - clarity / 100) * 8}deg)`,
            }}
          >
            <svg viewBox="0 0 50 40" className="w-9 h-7">
              {/* Boat hull */}
              <path d="M 5 28 L 45 28 L 36 38 L 14 38 Z" fill="#d97706" stroke="#b45309" strokeWidth="1" />
              {/* Mast */}
              <line x1="25" y1="10" x2="25" y2="28" stroke="#f8fafc" strokeWidth="1.5" />
              {/* Sail */}
              <polygon points="25,12 38,24 25,24" fill="#fef08a" opacity="0.9" />
              {/* Lantern on boat */}
              <circle cx="10" cy="25" r="2.5" fill="#38bdf8" className="animate-pulse" />
            </svg>
          </div>

          {/* Thick Rolling Fog Overlay (Dissolves as clarity increases) */}
          <div
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px] transition-opacity duration-700 pointer-events-none z-30 flex items-center justify-center"
            style={{ opacity: stormOpacity }}
          >
            <span className="text-[10px] text-slate-300/80 bg-slate-950/80 px-2.5 py-1 rounded-full border border-slate-700/60">
              مه سنگین شناختی و ابهام امواج...
            </span>
          </div>
        </div>

        {/* Ocean Clarity / Navigation Slider */}
        <div className="mt-3 px-1">
          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
            <span className="flex items-center gap-1">
              <Waves className="w-3 h-3 text-cyan-400" />
              <span>پیشروی کشتی به سوی فانوس</span>
            </span>
            <span className="text-amber-400 font-bold">{clarity}٪ شفافیت افق</span>
          </div>
          <input
            type="range"
            min="15"
            max="100"
            value={clarity}
            onChange={(e) => handleClarityChange(parseInt(e.target.value))}
            className="w-full h-1.5 rounded-lg bg-slate-800 accent-amber-400 cursor-pointer"
          />
        </div>

        {/* Directions / Buoys on Horizon */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-right">
          <div className="text-[10px] text-cyan-300 font-bold mb-1 flex items-center justify-between">
            <span>سه پرتو قطعی افق من:</span>
            <span className="text-slate-400 font-normal">
              {clarity > 80 ? '✓ امواج مهار شد' : 'اهرم را تا انتها بکشید'}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-center">
            {['تسلط حرفه‌ای', 'استقلال مالی', 'تعالی روان'].map((dir, idx) => (
              <div
                key={idx}
                className="py-1.5 px-1 rounded-lg bg-slate-900/80 border border-slate-700/60 text-[10px] text-amber-200 truncate"
              >
                {progress.lighthouseDirections?.[idx] || dir}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
