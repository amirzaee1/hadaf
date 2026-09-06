import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, AlertTriangle, Flame, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserProgress } from '../../types';
import { soundEngine } from '../../utils/audio';

interface BrokenCompassVisualProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
}

interface FailedPath {
  id: string;
  name: string;
  title: string;
  symbol: string;
  description: string;
  solution: string;
  color: string;
  angle: number;
}

export const BrokenCompassVisual: React.FC<BrokenCompassVisualProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [selectedPath, setSelectedPath] = useState<string>('trap-1');

  const failedPaths: FailedPath[] = [
    {
      id: 'trap-1',
      name: 'توهم انگیزه موقت',
      title: 'دام اول: انگیزه هیجانی بدون ریشه',
      symbol: '⚡',
      description: 'ترشح موقت دوپامین هنگام تصویرسازی رویا؛ به محض شروع سختی، مغز برای ذخیره انرژی ترمز می‌کند.',
      solution: 'درمان: ایجاد پیوند عاطفی ناگسستنی و چرایی سوزان فراتر از حس و حال روزمره.',
      color: '#f43f5e',
      angle: -45,
    },
    {
      id: 'trap-2',
      name: 'فقدان چرایی عمیق',
      title: 'دام دوم: خواستن بدون دلیل حیاتی',
      symbol: '🕳️',
      description: 'اگر دلیل کافی برای جنگیدن نداشته باشی، اولین خستگی یا بهانه‌ای ساده تو را متوقف می‌کند.',
      solution: 'درمان: ثبت کتبی زیان‌های ویرانگر نرسیدن به هدف طی ۵ سال آینده.',
      color: '#f59e0b',
      angle: 45,
    },
    {
      id: 'trap-3',
      name: 'ابهام و کلی‌گویی',
      title: 'دام سوم: فرامین گنگ به ناخودآگاه',
      symbol: '🌫️',
      description: 'اهدافی مثل «می‌خواهم موفق شوم» یا «کتاب بخوانم» ارتش روان را در تاریکی سرگردان می‌کند.',
      solution: 'درمان: تعیین مختصات مهندسی، مقیاس عددی و زمان‌بندی دقیق.',
      color: '#06b6d4',
      angle: 135,
    },
    {
      id: 'trap-4',
      name: 'تضاد با هویت ناخودآگاه',
      title: 'دام چهارم: خرابکاری درونی (Self-Sabotage)',
      symbol: '🪞',
      description: 'اگر در ناخودآگاه خود را فردی بی‌نظم بدانی، مغز تلاش می‌کند به آن هویت کهنه وفادار بماند.',
      solution: 'درمان: تثبیت عادات هویت‌محور («من معمار آینده خویشم»).',
      color: '#a855f7',
      angle: -135,
    },
  ];

  const activeTrap = failedPaths.find((p) => p.id === selectedPath) || failedPaths[0];

  const handleSelectPath = (pathId: string) => {
    setSelectedPath(pathId);
    soundEngine.playTick();

    // Toggle or register in user traps
    const targetPath = failedPaths.find((p) => p.id === pathId);
    if (targetPath) {
      onUpdateProgress((prev) => {
        const existing = prev.identifiedTraps || [];
        const isAlready = existing.includes(targetPath.name);
        return {
          ...prev,
          identifiedTraps: isAlready ? existing : [...existing, targetPath.name],
        };
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center relative py-2 select-none">
      {/* Cinematic Banner */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 font-extrabold text-xs tracking-wide text-center"
      >
        «چرا اهداف شکست می‌خورند؟ قطب‌نمای شکسته و راه‌های مسدود»
      </motion.div>

      {/* Main Compass & Path Frame */}
      <div className="relative w-full max-w-[340px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#090d1c] via-[#050814] to-[#02040a] border border-rose-500/30 p-4 shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
        {/* Background Radial Glow */}
        <div className="absolute inset-0 bg-radial from-rose-500/10 via-transparent to-transparent pointer-events-none" />

        {/* Top Diagnostic Status */}
        <div className="flex items-center justify-between px-1 pb-2 border-b border-slate-800 text-[11px]">
          <span className="text-slate-400">تحلیل عیوب مسیر</span>
          <span className="text-rose-400 font-bold flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            ۴ تله فروپاشی اهداف
          </span>
          <span className="text-amber-300/80 font-mono text-[10px]">
            {progress.identifiedTraps?.length || 0}/4 مهارشده
          </span>
        </div>

        {/* Visual Stage: The Broken Compass SVG with 4 Diverging Failed Paths */}
        <div className="relative h-[200px] w-full mt-3 rounded-2xl overflow-hidden bg-black/60 border border-slate-800/80 flex items-center justify-center">
          {/* Compass Face SVG */}
          <svg viewBox="0 0 200 200" className="w-full h-full p-2">
            {/* Outer Brass Housing */}
            <circle
              cx="100"
              cy="100"
              r="85"
              fill="#080c18"
              stroke="#334155"
              strokeWidth="3"
            />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#d97706"
              strokeWidth="0.75"
              strokeDasharray="2 3"
            />

            {/* Dial Tick Marks */}
            {Array.from({ length: 12 }).map((_, i) => {
              const deg = i * 30;
              const rad = (deg * Math.PI) / 180;
              const x1 = 100 + 72 * Math.cos(rad);
              const y1 = 100 + 72 * Math.sin(rad);
              const x2 = 100 + 78 * Math.cos(rad);
              const y2 = 100 + 78 * Math.sin(rad);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={i % 3 === 0 ? '#fbbf24' : '#475569'}
                  strokeWidth={i % 3 === 0 ? '1.5' : '0.8'}
                />
              );
            })}

            {/* 4 Diverging Failed Paths (Dead Ends into Mist) */}
            {/* Path 1: Top-Left */}
            <path
              d="M 100 100 L 40 40"
              stroke={selectedPath === 'trap-1' ? '#f43f5e' : '#334155'}
              strokeWidth={selectedPath === 'trap-1' ? '2.5' : '1'}
              strokeDasharray={selectedPath === 'trap-1' ? 'none' : '4 3'}
              className="transition-all duration-300"
            />
            <circle cx="36" cy="36" r="6" fill="#f43f5e" opacity={selectedPath === 'trap-1' ? 1 : 0.4} />

            {/* Path 2: Top-Right */}
            <path
              d="M 100 100 L 160 40"
              stroke={selectedPath === 'trap-2' ? '#f59e0b' : '#334155'}
              strokeWidth={selectedPath === 'trap-2' ? '2.5' : '1'}
              strokeDasharray={selectedPath === 'trap-2' ? 'none' : '4 3'}
              className="transition-all duration-300"
            />
            <circle cx="164" cy="36" r="6" fill="#f59e0b" opacity={selectedPath === 'trap-2' ? 1 : 0.4} />

            {/* Path 3: Bottom-Right */}
            <path
              d="M 100 100 L 160 160"
              stroke={selectedPath === 'trap-3' ? '#06b6d4' : '#334155'}
              strokeWidth={selectedPath === 'trap-3' ? '2.5' : '1'}
              strokeDasharray={selectedPath === 'trap-3' ? 'none' : '4 3'}
              className="transition-all duration-300"
            />
            <circle cx="164" cy="164" r="6" fill="#06b6d4" opacity={selectedPath === 'trap-3' ? 1 : 0.4} />

            {/* Path 4: Bottom-Left */}
            <path
              d="M 100 100 L 40 160"
              stroke={selectedPath === 'trap-4' ? '#a855f7' : '#334155'}
              strokeWidth={selectedPath === 'trap-4' ? '2.5' : '1'}
              strokeDasharray={selectedPath === 'trap-4' ? 'none' : '4 3'}
              className="transition-all duration-300"
            />
            <circle cx="36" cy="164" r="6" fill="#a855f7" opacity={selectedPath === 'trap-4' ? 1 : 0.4} />

            {/* Broken Glass Fractures across the Compass */}
            <path
              d="M 60 70 L 100 100 L 140 120 M 100 100 L 110 50 M 90 140 L 100 100 L 70 120"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M 100 100 L 125 90 L 145 75"
              stroke="rgba(244,63,94,0.6)"
              strokeWidth="1"
              fill="none"
            />

            {/* Disoriented Needle Pointing at Active Trap Angle */}
            <g
              transform={`translate(100, 100) rotate(${activeTrap.angle})`}
              className="transition-transform duration-700 ease-out"
            >
              {/* North Needle (Red/Danger) */}
              <polygon points="0,-60 5,-10 0,0 -5,-10" fill="#f43f5e" />
              {/* South Needle (Silver/Dark) */}
              <polygon points="0,50 4,8 0,0 -4,8" fill="#64748b" opacity="0.7" />
              {/* Center Pin / Pivot */}
              <circle cx="0" cy="0" r="5" fill="#fbbf24" stroke="#78350f" strokeWidth="1.5" />
            </g>
          </svg>

          {/* Glowing Center Fracture Indicator */}
          <div className="absolute top-2 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-950/80 border border-rose-500/40 text-[9px] text-rose-300">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
            <span>عقربه در شکستگی</span>
          </div>
        </div>

        {/* 4 Interactive Path Selector Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          {failedPaths.map((p) => {
            const isSelected = selectedPath === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPath(p.id)}
                className={`py-2 px-2.5 rounded-xl border text-right transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-rose-500/20 border-rose-400 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.25)]'
                    : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{p.symbol}</span>
                  <span className="text-[11px] font-bold truncate max-w-[100px]">{p.name}</span>
                </div>
                {isSelected ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Diagnostic Breakdown Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTrap.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-3 p-3 rounded-2xl bg-slate-950/90 border border-slate-800 text-right space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-rose-300 flex items-center gap-1.5">
                <span>{activeTrap.symbol}</span>
                <span>{activeTrap.title}</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">CODE: {activeTrap.id.toUpperCase()}</span>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
              {activeTrap.description}
            </p>

            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-amber-300 font-medium">
              {activeTrap.solution}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* User Action prompt: Tap to neutralize */}
        <div className="mt-3 pt-2 text-center">
          <p className="text-[10px] text-slate-400">
            برای خنثی‌سازی هر دام و پیوند به چرایی عمیق، روی ۴ مسیر بالا کلیک کن
          </p>
        </div>
      </div>
    </div>
  );
};
