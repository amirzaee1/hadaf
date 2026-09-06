import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { UserProgress } from '../../types';
import { soundEngine } from '../../utils/audio';

interface CrossroadsVisualProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
}

export const CrossroadsVisual: React.FC<CrossroadsVisualProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [selectedRoad, setSelectedRoad] = useState<number>(progress.selectedRoad || 4);
  const [reflectionInput, setReflectionInput] = useState<string>(
    progress.borrowedFilteredGoals?.authenticGoal || ''
  );
  const [roadProximity, setRoadProximity] = useState<number>(progress.selectedRoad === 4 ? 85 : 40);

  const roads = [
    {
      id: 1,
      title: 'تأیید و تشویق اجتماعی',
      sub: 'نگاه ستایش‌آمیز دیگران و شبکه‌های اجتماعی',
      type: 'borrowed',
      color: 'from-blue-600/30 to-slate-900',
      borderColor: 'border-blue-500/40',
      activeBorder: 'border-blue-400',
      glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]',
      icon: '👥',
    },
    {
      id: 2,
      title: 'چشم‌وهم‌چشمی و مقایسه',
      sub: 'عقب نماندن از همسالان و رقابت‌های کور',
      type: 'borrowed',
      color: 'from-slate-700/40 to-slate-900',
      borderColor: 'border-slate-600/40',
      activeBorder: 'border-slate-400',
      glow: 'shadow-[0_0_20px_rgba(148,163,184,0.3)]',
      icon: '🏁',
    },
    {
      id: 3,
      title: 'انتظارات تحمیلی اطرافیان',
      sub: 'برآورده کردن آرزوهای برآورده‌نشده دیگران',
      type: 'borrowed',
      color: 'from-stone-700/40 to-slate-900',
      borderColor: 'border-stone-600/40',
      activeBorder: 'border-stone-400',
      glow: 'shadow-[0_0_20px_rgba(168,162,158,0.3)]',
      icon: '⛓️',
    },
    {
      id: 4,
      title: 'مسیر معنادار و اصیل من',
      sub: 'خواسته‌ای پاک برخاسته از ارزش‌های راستین درون',
      type: 'authentic',
      color: 'from-amber-500/30 via-yellow-500/20 to-slate-950',
      borderColor: 'border-amber-500/50',
      activeBorder: 'border-amber-400',
      glow: 'shadow-[0_0_25px_rgba(245,158,11,0.45)]',
      icon: '✨',
    },
  ];

  const handleSelectRoad = (id: number) => {
    setSelectedRoad(id);
    setRoadProximity(id === 4 ? 90 : 50);
    onUpdateProgress((prev) => ({
      ...prev,
      selectedRoad: id,
      borrowedFilteredGoals: {
        authenticGoal: reflectionInput || prev.borrowedFilteredGoals?.authenticGoal || '',
        isExtrinsicChecked: id === 4,
      },
    }));

    if (id === 4) {
      soundEngine.playChime(880); // Victory chime
    } else {
      soundEngine.playTick();
    }
  };

  const handleSaveGoal = () => {
    onUpdateProgress((prev) => ({
      ...prev,
      selectedRoad: 4,
      borrowedFilteredGoals: {
        authenticGoal: reflectionInput,
        isExtrinsicChecked: true,
      },
    }));
    soundEngine.playChime(987.77); // B5 high affirmation
  };

  return (
    <div className="w-full flex flex-col items-center justify-center relative py-2">
      {/* Cinematic Question Banner */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-extrabold text-xs tracking-wide"
      >
        «آیا این هدف واقعاً مال توست؟»
      </motion.div>

      {/* The Crossroads Canvas Container */}
      <div className="relative w-full max-w-[340px] rounded-2xl overflow-hidden bg-[#040711] border border-amber-500/30 p-3 shadow-2xl">
        {/* Sky / Atmospheric Perspective */}
        <div className="relative h-[150px] w-full rounded-xl overflow-hidden bg-gradient-to-b from-[#070d1e] to-[#020409] flex items-center justify-center">
          {/* Horizon glow */}
          <div
            className="absolute top-1/3 w-48 h-8 rounded-full blur-xl transition-all duration-700 pointer-events-none"
            style={{
              backgroundColor: selectedRoad === 4 ? 'rgba(245, 158, 11, 0.35)' : 'rgba(59, 130, 246, 0.2)',
            }}
          />

          {/* Perspective Crossroads SVG */}
          <svg viewBox="0 0 200 130" className="w-full h-full relative z-0">
            {/* Horizon line */}
            <line x1="0" y1="40" x2="200" y2="40" stroke="#1e293b" strokeWidth="0.8" />

            {/* Road 1 (Far Left: Social Approval) */}
            <polygon
              points="100,40 100,40 0,95 25,130"
              fill="url(#road1Grad)"
              opacity={selectedRoad === 1 ? 0.9 : selectedRoad === 4 ? 0.2 : 0.4}
              className="transition-all duration-500 cursor-pointer"
              onClick={() => handleSelectRoad(1)}
            />

            {/* Road 2 (Left Center: Comparison) */}
            <polygon
              points="100,40 100,40 35,130 65,130"
              fill="url(#road2Grad)"
              opacity={selectedRoad === 2 ? 0.9 : selectedRoad === 4 ? 0.15 : 0.35}
              className="transition-all duration-500 cursor-pointer"
              onClick={() => handleSelectRoad(2)}
            />

            {/* Road 3 (Right Center: External Expectations) */}
            <polygon
              points="100,40 100,40 135,130 165,130"
              fill="url(#road3Grad)"
              opacity={selectedRoad === 3 ? 0.9 : selectedRoad === 4 ? 0.15 : 0.35}
              className="transition-all duration-500 cursor-pointer"
              onClick={() => handleSelectRoad(3)}
            />

            {/* Road 4 (Center-Right: Authentic Direction) */}
            <polygon
              points="100,40 100,40 75,130 125,130"
              fill="url(#road4Grad)"
              opacity={selectedRoad === 4 ? 1 : 0.4}
              className="transition-all duration-500 cursor-pointer"
              onClick={() => handleSelectRoad(4)}
            />

            {/* Radiant golden rays for Road 4 */}
            {selectedRoad === 4 && (
              <>
                <line x1="100" y1="40" x2="100" y2="130" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="100" cy="40" r="12" fill="#fbbf24" opacity="0.3" className="animate-ping" />
                <circle cx="100" cy="40" r="5" fill="#fef08a" />
              </>
            )}

            {/* Traveler Avatar Character (Silhouette) standing at crossroads */}
            <g
              transform={`translate(${selectedRoad === 1 ? 40 : selectedRoad === 2 ? 65 : selectedRoad === 3 ? 135 : 100}, ${
                120 - roadProximity * 0.4
              })`}
              className="transition-all duration-700"
            >
              {/* Golden aura around character if on authentic road */}
              {selectedRoad === 4 && (
                <ellipse cx="0" cy="-10" rx="10" ry="18" fill="#f59e0b" opacity="0.4" className="animate-pulse" />
              )}
              {/* Head */}
              <circle cx="0" cy="-22" r="3.5" fill={selectedRoad === 4 ? '#fef08a' : '#cbd5e1'} />
              {/* Body */}
              <line x1="0" y1="-18" x2="0" y2="-6" stroke={selectedRoad === 4 ? '#fbbf24' : '#94a3b8'} strokeWidth="2.5" strokeLinecap="round" />
              {/* Legs */}
              <line x1="0" y1="-6" x2="-3" y2="0" stroke={selectedRoad === 4 ? '#fbbf24' : '#64748b'} strokeWidth="1.8" strokeLinecap="round" />
              <line x1="0" y1="-6" x2="3" y2="0" stroke={selectedRoad === 4 ? '#fbbf24' : '#64748b'} strokeWidth="1.8" strokeLinecap="round" />
            </g>

            {/* Gradients */}
            <defs>
              <linearGradient id="road1Grad" x1="0.5" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="road2Grad" x1="0.5" y1="0" x2="0.3" y2="1">
                <stop offset="0%" stopColor="#64748b" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#090d16" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="road3Grad" x1="0.5" y1="0" x2="0.7" y2="1">
                <stop offset="0%" stopColor="#78716c" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#090d16" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="road4Grad" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
                <stop offset="30%" stopColor="#f59e0b" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#b45309" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* 4 Interactive Road Selector Cards */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          {roads.map((r) => {
            const isSelected = selectedRoad === r.id;
            return (
              <button
                key={r.id}
                onClick={() => handleSelectRoad(r.id)}
                className={`p-2.5 rounded-xl border text-right transition-all flex flex-col justify-between relative ${
                  isSelected
                    ? `${r.activeBorder} ${r.glow} bg-gradient-to-b ${r.color}`
                    : 'border-slate-800/80 bg-slate-900/60 opacity-60 hover:opacity-90'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-sm">{r.icon}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                </div>
                <div>
                  <div className={`text-[11px] font-bold ${r.type === 'authentic' ? 'text-amber-200' : 'text-slate-200'}`}>
                    {r.title}
                  </div>
                  <div className="text-[9px] text-slate-400 leading-tight mt-0.5">{r.sub}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Authentic Goal Inscription */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 text-right">
          <label className="block text-[11px] font-bold text-amber-300 mb-1">
            «هدف واقعی و اصیل من» (فراتر از تایید دیگران):
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              value={reflectionInput}
              onChange={(e) => setReflectionInput(e.target.value)}
              placeholder="هدفی که حتی در تنهایی مطلق برایش می‌جنگم..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900/90 border border-amber-500/40 text-xs text-amber-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
            />
            <button
              onClick={handleSaveGoal}
              className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shrink-0 transition-all flex items-center gap-1 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
            >
              <span>انتخاب راه</span>
            </button>
          </div>
          {progress.borrowedFilteredGoals?.authenticGoal && (
            <p className="mt-2 text-[10px] text-amber-300/90 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
              ✓ مسیر اصیل انتخاب شد: «{progress.borrowedFilteredGoals.authenticGoal}»
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
