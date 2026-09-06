import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Shield, Award, Feather, Compass, CheckCircle2, Flame, Eye } from 'lucide-react';
import { UserProgress } from '../../types';
import { soundEngine } from '../../utils/audio';

interface WorkshopRoomVisualProps {
  progress: UserProgress;
  onSelectStep: (step: number) => void;
  completedSteps: number[];
}

export const WorkshopRoomVisual: React.FC<WorkshopRoomVisualProps> = ({
  progress,
  onSelectStep,
  completedSteps,
}) => {
  const isPillarsDone = completedSteps.includes(2);
  const isDreamDone = completedSteps.includes(3);
  const isEngineDone = completedSteps.includes(4);
  const isGoalDone = completedSteps.includes(5);
  const isWhyDone = completedSteps.includes(6);
  const isContractDone = completedSteps.includes(7);
  const isHabitDone = completedSteps.includes(8);
  const isReviewDone = completedSteps.includes(9);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#060914] via-[#090d1f] to-[#04060e] border border-amber-500/20 shadow-2xl p-4 sm:p-6 text-center">
      {/* Ambient background glow & stars */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-indigo-950/20 to-transparent pointer-events-none" />
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Room Title & Status Header */}
      <div className="relative z-10 mb-4 flex flex-col sm:flex-row items-center justify-between gap-2 pb-3 border-b border-white/[0.08]">
        <div className="text-right">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-medium border border-amber-500/30">
              اتاق معماری سرنوشت
            </span>
            <h3 className="text-base sm:text-lg font-black text-white">
              کارگاه شخصی من (Personal Workspace)
            </h3>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            هر تمرین که کامل کنی، عنصری جاودانه در این اتاق پدیدار می‌شود
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-2xl border border-slate-800">
          <span className="text-[11px] text-slate-400">تکمیل عناصر:</span>
          <span className="text-sm font-black text-amber-400 font-mono">
            {completedSteps.length} / 9
          </span>
          <div className="w-16 h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-l from-amber-400 to-yellow-600 transition-all duration-500"
              style={{ width: `${(completedSteps.length / 9) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Cinematic Room Vector Panorama (Desk, Window, Pillars, Tree, Path) */}
      <div className="relative h-[250px] sm:h-[290px] w-full rounded-2xl overflow-hidden bg-[#030611] border border-slate-800 shadow-inner my-2">
        <svg viewBox="0 0 400 240" className="w-full h-full relative z-10">
          <defs>
            <linearGradient id="deskGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2c1a0e" />
              <stop offset="100%" stopColor="#170c06" />
            </linearGradient>
            <linearGradient id="windowSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDreamDone ? '#1e1b4b' : '#0a0d1a'} />
              <stop offset="50%" stopColor={isDreamDone ? '#431407' : '#0f172a'} />
              <stop offset="100%" stopColor={isDreamDone ? '#b45309' : '#1e293b'} />
            </linearGradient>
            <radialGradient id="pillarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Futuristic Window to the 5-Year Horizon (Step 3) */}
          <g
            className="cursor-pointer group"
            onClick={() => onSelectStep(3)}
          >
            <rect x="120" y="15" width="160" height="95" rx="8" fill="url(#windowSky)" stroke={isDreamDone ? '#f59e0b' : '#334155'} strokeWidth="2" />
            {/* Window divider grid */}
            <line x1="200" y1="15" x2="200" y2="110" stroke="#1e293b" strokeWidth="1.5" />
            <line x1="120" y1="62" x2="280" y2="62" stroke="#1e293b" strokeWidth="1.5" />

            {/* Sun/Horizon in window if Step 3 done */}
            {isDreamDone ? (
              <>
                <circle cx="200" cy="62" r="16" fill="#fef08a" opacity="0.9" className="animate-pulse" />
                <path d="M 120 90 Q 160 75 200 85 T 280 90 L 280 110 L 120 110 Z" fill="#78350f" opacity="0.8" />
                <path d="M 150 95 Q 180 82 220 92 T 280 95 L 280 110 L 150 110 Z" fill="#15803d" opacity="0.9" />
              </>
            ) : (
              <text x="200" y="66" fill="#64748b" fontSize="8" textAnchor="middle" className="font-sans">
                پنجره ۵ سال آینده (مات)
              </text>
            )}
          </g>

          {/* Three Glowing Foundation Pillars (Step 2) */}
          <g
            className="cursor-pointer"
            onClick={() => onSelectStep(2)}
          >
            {/* Left Pillar */}
            <rect
              x="30"
              y="50"
              width="18"
              height="110"
              rx="3"
              fill={isPillarsDone ? '#fbbf24' : '#1e293b'}
              opacity={isPillarsDone ? 0.85 : 0.4}
            />
            {/* Center-Left Pillar */}
            <rect
              x="60"
              y="40"
              width="18"
              height="120"
              rx="3"
              fill={isPillarsDone ? '#f59e0b' : '#1e293b'}
              opacity={isPillarsDone ? 0.95 : 0.4}
            />
            {/* Right Pillar */}
            <rect
              x="90"
              y="50"
              width="18"
              height="110"
              rx="3"
              fill={isPillarsDone ? '#d97706' : '#1e293b'}
              opacity={isPillarsDone ? 0.85 : 0.4}
            />
            {/* Pillar Pediment / Foundation Beam */}
            <rect
              x="20"
              y="155"
              width="98"
              height="10"
              rx="2"
              fill={isPillarsDone ? '#78350f' : '#0f172a'}
              stroke={isPillarsDone ? '#fbbf24' : '#334155'}
              strokeWidth="1"
            />
            {isPillarsDone && (
              <circle cx="69" cy="35" r="12" fill="url(#pillarGlow)" className="animate-ping" />
            )}
          </g>

          {/* Growing Living Tree & Deep Roots (Step 6 & Habit Step 8) */}
          <g
            className="cursor-pointer"
            onClick={() => onSelectStep(6)}
          >
            {/* Tree Trunk */}
            <path
              d="M 345 155 Q 348 115 350 95 Q 340 75 330 65 M 350 95 Q 360 80 368 70"
              stroke={isWhyDone ? '#b45309' : '#334155'}
              strokeWidth={isWhyDone ? '5' : '3'}
              strokeLinecap="round"
              fill="none"
            />
            {/* Tree Foliage / Canopy */}
            {isWhyDone ? (
              <>
                <circle cx="330" cy="60" r="18" fill="#15803d" opacity="0.85" />
                <circle cx="365" cy="65" r="16" fill="#16a34a" opacity="0.85" />
                <circle cx="348" cy="45" r="22" fill="#22c55e" opacity="0.9" />
                {/* Glowing fruits of why */}
                <circle cx="340" cy="50" r="3" fill="#fef08a" />
                <circle cx="360" cy="60" r="2.5" fill="#fef08a" />
              </>
            ) : (
              <circle cx="348" cy="65" r="14" fill="#1e293b" stroke="#475569" strokeDasharray="2 2" />
            )}
            {/* Deep Roots */}
            {isWhyDone ? (
              <path
                d="M 345 155 Q 335 175 325 190 M 348 155 Q 350 180 352 198 M 350 155 Q 365 175 375 192"
                stroke="#d97706"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path d="M 345 155 L 345 170" stroke="#334155" strokeWidth="1.5" strokeDasharray="2 2" />
            )}
          </g>

          {/* Wooden Architect Desk (Foreground Base) */}
          <polygon
            points="40,165 360,165 385,225 15,225"
            fill="url(#deskGrad)"
            stroke="#451a03"
            strokeWidth="2"
          />
          {/* Desk Highlight Lip */}
          <line x1="40" y1="165" x2="360" y2="165" stroke="#78350f" strokeWidth="1.5" />

          {/* Stepping Stone Path on Floor / Desk (Step 8) */}
          <g
            className="cursor-pointer"
            onClick={() => onSelectStep(8)}
          >
            {[
              { cx: 70, cy: 195, r: 8 },
              { cx: 95, cy: 205, r: 9 },
              { cx: 125, cy: 200, r: 10 },
              { cx: 155, cy: 208, r: 10 },
              { cx: 185, cy: 202, r: 11 },
            ].map((st, i) => (
              <ellipse
                key={i}
                cx={st.cx}
                cy={st.cy}
                rx={st.r}
                ry={st.r * 0.6}
                fill={isHabitDone ? '#f59e0b' : '#334155'}
                stroke={isHabitDone ? '#fef08a' : '#475569'}
                strokeWidth="1"
                opacity={isHabitDone ? 0.9 : 0.4}
              />
            ))}
          </g>

          {/* The Architect Journal / Open Book (Desk Center) */}
          <g
            className="cursor-pointer group"
            onClick={() => onSelectStep(1)}
          >
            {/* Open Pages */}
            <polygon points="175,178 200,174 225,178 223,196 200,192 177,196" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />
            {/* Golden Ribbon Marker */}
            <line x1="200" y1="174" x2="200" y2="200" stroke="#dc2626" strokeWidth="2" />
            {/* Pen / Quill */}
            <line x1="230" y1="172" x2="245" y2="185" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* SMART Mission Map / Blueprint Card (Step 5) */}
          <g
            className="cursor-pointer"
            onClick={() => onSelectStep(5)}
          >
            <rect
              x="235"
              y="180"
              width="45"
              height="30"
              rx="2"
              fill={isGoalDone ? '#0284c7' : '#1e293b'}
              stroke={isGoalDone ? '#38bdf8' : '#475569'}
              strokeWidth="1.2"
              transform="rotate(6 257 195)"
            />
            <line x1="240" y1="188" x2="265" y2="188" stroke="#ffffff" strokeWidth="1" opacity="0.7" transform="rotate(6 257 195)" />
            <line x1="240" y1="194" x2="272" y2="194" stroke="#ffffff" strokeWidth="1" opacity="0.7" transform="rotate(6 257 195)" />
            <line x1="240" y1="200" x2="258" y2="200" stroke="#facc15" strokeWidth="1.2" transform="rotate(6 257 195)" />
          </g>

          {/* Signed Covenant / Golden Seal (Step 7) */}
          <g
            className="cursor-pointer"
            onClick={() => onSelectStep(7)}
          >
            <rect
              x="295"
              y="182"
              width="40"
              height="28"
              rx="2"
              fill={isContractDone ? '#fffbeb' : '#1e293b'}
              stroke={isContractDone ? '#d97706' : '#334155'}
              strokeWidth="1"
            />
            {/* Wax Seal */}
            <circle
              cx="315"
              cy="196"
              r="6"
              fill={isContractDone ? '#dc2626' : '#475569'}
              stroke="#991b1b"
              strokeWidth="1"
            />
          </g>

          {/* Goal Engine Crest (Step 4) */}
          <g
            className="cursor-pointer"
            onClick={() => onSelectStep(4)}
          >
            <polygon
              points="140,25 152,32 152,48 140,55 128,48 128,32"
              fill={
                progress.personalityWorld === 'red'
                  ? '#ef4444'
                  : progress.personalityWorld === 'yellow'
                  ? '#eab308'
                  : progress.personalityWorld === 'blue'
                  ? '#3b82f6'
                  : progress.personalityWorld === 'green'
                  ? '#22c55e'
                  : '#334155'
              }
              stroke="#ffffff"
              strokeWidth="1"
            />
          </g>
        </svg>
      </div>

      {/* 9 Interactive Step Buttons Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-4 text-right">
        {[
          { step: 1, title: '۱. کوله و سنگ‌ها', desc: 'لیست انزجار و تبدیل درد', icon: '🧳' },
          { step: 2, title: '۲. سه ستون ارزش', desc: 'بنیان تزلزل‌ناپذیر زندگی', icon: '🏛️' },
          { step: 3, title: '۳. پنجره ۵ ساله', desc: 'تصویر بدون مرز رویا', icon: '🪟' },
          { step: 4, title: '۴. موتور روان', desc: 'پروفایل کهن‌الگو و سوخت', icon: '🛡️' },
          { step: 5, title: '۵. هدف SMART', desc: 'عمارت و نقشه ماموریت', icon: '🏗️' },
          { step: 6, title: '۶. ریشه‌های چرایی', desc: 'ریشه‌زنی درخت در زمین', icon: '🌳' },
          { step: 7, title: '۷. میثاق تعهد', desc: 'امضای عهدنامه شخصی', icon: '📜' },
          { step: 8, title: '۸. سنگفرش عادات', desc: 'مسیر روزانه غیرمذاکره', icon: '🪨' },
          { step: 9, title: '۹. گاه‌شمار پایش', desc: 'بازبینی هفتگی/ماهانه/۹۰ روز', icon: '⏱️' },
        ].map((item) => {
          const isDone = completedSteps.includes(item.step);
          return (
            <button
              key={item.step}
              onClick={() => {
                onSelectStep(item.step);
                soundEngine.playTick();
              }}
              className={`p-2.5 rounded-2xl border transition-all flex flex-col justify-between text-right active:scale-95 ${
                isDone
                  ? 'bg-amber-500/15 border-amber-400/60 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-base">{item.icon}</span>
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-700" />
                )}
              </div>
              <span className="text-xs font-bold truncate block text-white">{item.title}</span>
              <span className="text-[10px] text-slate-400 truncate block mt-0.5">{item.desc}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
