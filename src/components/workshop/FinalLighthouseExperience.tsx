import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Home, RotateCcw, Share2, Award, Heart } from 'lucide-react';
import { UserProgress } from '../../types';
import { soundEngine } from '../../utils/audio';

interface FinalLighthouseExperienceProps {
  progress: UserProgress;
  onBackToWorkshop: () => void;
  onBackToJourney: () => void;
}

export const FinalLighthouseExperience: React.FC<FinalLighthouseExperienceProps> = ({
  progress,
  onBackToWorkshop,
  onBackToJourney,
}) => {
  return (
    <div className="relative w-full min-h-[85vh] rounded-3xl overflow-hidden bg-[#04060e] border-2 border-amber-500/40 p-6 sm:p-10 flex flex-col justify-between items-center text-center shadow-2xl">
      {/* Ambient background particles & radiant beam */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/20 via-indigo-950/40 to-transparent pointer-events-none" />

      {/* Top Bar / Milestone Badge */}
      <div className="relative z-10 w-full flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <button
          onClick={onBackToWorkshop}
          className="px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white text-xs flex items-center gap-1.5 transition-all"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          <span>بازگشت به اتاق کارگاه</span>
        </button>

        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-mono font-bold text-amber-300">
            اوج مسیر سرنوشت (THE SUMMIT)
          </span>
        </div>

        <button
          onClick={onBackToJourney}
          className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center gap-1.5 hover:bg-amber-500/30 transition-all"
        >
          <Home className="w-3.5 h-3.5" />
          <span>کتاب فصول ۱۳ گانه</span>
        </button>
      </div>

      {/* Cinematic Lighthouse Panorama SVG */}
      <div className="relative w-full max-w-2xl h-[280px] sm:h-[340px] my-6 flex items-center justify-center">
        <svg viewBox="0 0 500 320" className="w-full h-full">
          <defs>
            <linearGradient id="nightOcean" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#090d1f" />
              <stop offset="60%" stopColor="#0b1329" />
              <stop offset="100%" stopColor="#030612" />
            </linearGradient>
            <radialGradient id="lightBeam" cx="350" cy="90" r="280" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.85" />
              <stop offset="30%" stopColor="#f59e0b" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="cliffGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#090d16" />
            </linearGradient>
          </defs>

          {/* Background Night Ocean & Sky */}
          <rect width="500" height="320" fill="url(#nightOcean)" rx="20" />

          {/* Stars */}
          {[
            { cx: 50, cy: 40 },
            { cx: 120, cy: 70 },
            { cx: 200, cy: 30 },
            { cx: 280, cy: 60 },
            { cx: 450, cy: 35 },
            { cx: 480, cy: 90 },
          ].map((st, i) => (
            <circle key={i} cx={st.cx} cy={st.cy} r={1.2} fill="#fef08a" opacity="0.8" />
          ))}

          {/* The High Cliff / Mountain Summit */}
          <polygon
            points="0,320 0,260 140,240 280,210 350,180 430,220 500,240 500,320"
            fill="url(#cliffGrad)"
          />

          {/* The Illuminated Golden Path Behind the Character */}
          <path
            d="M 20 280 Q 140 260 220 235 T 325 188"
            stroke="#f59e0b"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
          {/* Stepping Stones on Path */}
          {[
            { cx: 40, cy: 277 },
            { cx: 80, cy: 270 },
            { cx: 120, cy: 262 },
            { cx: 160, cy: 251 },
            { cx: 200, cy: 240 },
            { cx: 240, cy: 226 },
            { cx: 280, cy: 207 },
            { cx: 310, cy: 193 },
          ].map((pt, i) => (
            <circle
              key={i}
              cx={pt.cx}
              cy={pt.cy}
              r="4.5"
              fill="#fef08a"
              stroke="#b45309"
              strokeWidth="1.5"
            />
          ))}

          {/* Lighthouse Structure on Peak (x: 350, y: 180) */}
          {/* Tower Base & Body */}
          <polygon points="340,180 344,100 356,100 360,180" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
          {/* Red Stripes on Tower */}
          <polygon points="341.5,155 342.5,135 357.5,135 358.5,155" fill="#dc2626" />
          <polygon points="343.5,115 344,105 356,105 356.5,115" fill="#dc2626" />
          {/* Lantern Room */}
          <rect x="342" y="85" width="16" height="15" fill="#0f172a" stroke="#fbbf24" strokeWidth="1.5" />
          <rect x="344" y="87" width="12" height="11" fill="#fef08a" opacity="0.95" />
          {/* Dome Roof */}
          <path d="M 340 85 Q 350 72 360 85 Z" fill="#991b1b" />

          {/* Sweeping Radiant Light Beam */}
          <polygon
            points="350,92 0,40 0,160"
            fill="url(#lightBeam)"
            opacity="0.75"
          />

          {/* The Hero Character standing on the peak beside the lighthouse */}
          <g transform="translate(325, 175)">
            {/* Cloak/Backpack glowing */}
            <circle cx="0" cy="-14" r="3.5" fill="#fef08a" />
            <path d="M -3 -10 L 3 -10 L 5 2 L -5 2 Z" fill="#f59e0b" />
            {/* Looking toward the vast horizon */}
            <line x1="3" y1="-8" x2="7" y2="-4" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" />
            {/* Staff / Walking Stick */}
            <line x1="8" y1="-14" x2="8" y2="4" stroke="#fbbf24" strokeWidth="1.5" />
          </g>
        </svg>
      </div>

      {/* Closing Epilogue Typography */}
      <div className="relative z-10 space-y-4 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <span className="text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold border border-amber-500/40">
            پایان دوره سرآغاز زیستن است
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-serif leading-tight">
            «تو فقط یک هدف نساختی.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
              تو مسیر زندگی خودت را طراحی کردی.»
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
            از تاریکی سنگ‌های انزجار، تا سه ستون فناناپذیر ارزش‌ها، عمارت SMART و سنگفرش‌های پیوسته عادات روزمره... اکنون مأموریت زندگی در دستان توست.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onBackToWorkshop}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-black text-xs sm:text-sm shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all hover:scale-105 active:scale-95"
          >
            بازگشت به اتاق کارگاه و بررسی جزئیات
          </button>
          <button
            onClick={onBackToJourney}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 text-xs sm:text-sm transition-all"
          >
            مرور مجدد فصول آموزشی
          </button>
        </div>
      </div>
    </div>
  );
};
