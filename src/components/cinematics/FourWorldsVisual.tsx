import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mountain, Users, Radio, Building2, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserProgress } from '../../types';
import { soundEngine } from '../../utils/audio';

interface FourWorldsVisualProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
}

export const FourWorldsVisual: React.FC<FourWorldsVisualProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [activeWorld, setActiveWorld] = useState<'red' | 'yellow' | 'blue' | 'green'>(
    progress.personalityWorld || 'red'
  );

  const worlds = {
    red: {
      id: 'red' as const,
      name: 'جهان سرخ (The Red Realm)',
      title: 'چالش، فتح قله و پیروزی',
      slogan: '«من با چالش رشد می‌کنم»',
      desc: 'موتور روانی تو با اهداف جاه‌طلبانه، رقابت سالم و حل بحران‌های سخت بیدار می‌شود.',
      visualIcon: '🧗‍♂️',
      bgGradient: 'from-[#2b0808] via-[#1a0505] to-[#0a0202]',
      accentBorder: 'border-rose-500/50',
      tabColor: 'bg-rose-600',
      activeText: 'text-rose-400',
      glow: 'shadow-[0_0_30px_rgba(244,63,94,0.3)]',
      keywords: ['فتح قله', 'استقامت', 'پیشتازی'],
    },
    yellow: {
      id: 'yellow' as const,
      name: 'جهان زرد (The Yellow Realm)',
      title: 'اثرگذاری، جامعه و گرما',
      slogan: '«من با اثرگذاری معنا پیدا می‌کنم»',
      desc: 'نیروی تو از دگرگون ساختن زندگی انسان‌ها، هدایت معنوی و برقراری ارتباطات عمیق تغذیه می‌شود.',
      visualIcon: '🤝',
      bgGradient: 'from-[#2d1b03] via-[#1c1002] to-[#0a0601]',
      accentBorder: 'border-amber-500/50',
      tabColor: 'bg-amber-500',
      activeText: 'text-amber-400',
      glow: 'shadow-[0_0_30px_rgba(245,158,11,0.3)]',
      keywords: ['تاثیر انسانی', 'همدلی عمیق', 'گرما و الهام'],
    },
    blue: {
      id: 'blue' as const,
      name: 'جهان آبی (The Blue Realm)',
      title: 'انرژی، پویایی و کار تیمی',
      slogan: '«من در ارتباط رشد می‌کنم»',
      desc: 'روحیه تو در جمع‌های پرانرژی، حرکت‌های جمعی، شبکه‌سازی و گفتمان‌های پویا اوج می‌گیرد.',
      visualIcon: '⚡',
      bgGradient: 'from-[#05172d] via-[#030e1d] to-[#01050d]',
      accentBorder: 'border-cyan-500/50',
      tabColor: 'bg-cyan-500',
      activeText: 'text-cyan-400',
      glow: 'shadow-[0_0_30px_rgba(6,182,212,0.3)]',
      keywords: ['تیم هم‌افزا', 'جریان انرژی', 'پویایی جمعی'],
    },
    green: {
      id: 'green' as const,
      name: 'جهان سبز (The Green Realm)',
      title: 'معماری، سیستم‌ها و الگوها',
      slogan: '«من با فهمیدن و ساختن پیش می‌روم»',
      desc: 'آرامش و قدرت تو در مهندسی فرآیندها، الگوریتم‌ها، نظم پایدار و درک روابط علت و معلولی است.',
      visualIcon: '🏛️',
      bgGradient: 'from-[#042416] via-[#02170e] to-[#010a06]',
      accentBorder: 'border-emerald-500/50',
      tabColor: 'bg-emerald-500',
      activeText: 'text-emerald-400',
      glow: 'shadow-[0_0_30px_rgba(16,185,129,0.3)]',
      keywords: ['سیستم‌های ماندگار', 'منطق ریاضی', 'نظم استوار'],
    },
  };

  const handleSelectWorld = (w: 'red' | 'yellow' | 'blue' | 'green') => {
    setActiveWorld(w);
    onUpdateProgress((prev) => ({
      ...prev,
      personalityWorld: w,
      personalityArchetype:
        w === 'red' ? 'commander' : w === 'yellow' ? 'alchemist' : w === 'blue' ? 'explorer' : 'architect',
    }));
    soundEngine.playChime(w === 'red' ? 659 : w === 'yellow' ? 784 : w === 'blue' ? 880 : 523);
  };

  const current = worlds[activeWorld];

  return (
    <div className="w-full flex flex-col items-center justify-center relative py-2">
      {/* Dynamic Slogan Banner */}
      <motion.div
        key={activeWorld}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`mb-3 px-4 py-1.5 rounded-full border text-xs font-black tracking-wide text-center transition-all ${current.accentBorder} bg-slate-950/80 ${current.activeText}`}
      >
        {current.slogan}
      </motion.div>

      {/* 4 Worlds Frame Container */}
      <div className={`relative w-full max-w-[340px] rounded-2xl overflow-hidden bg-[#030612] border p-3 shadow-2xl transition-all duration-700 ${current.accentBorder} ${current.glow}`}>
        {/* Visual Realm Stage */}
        <div className={`relative h-[180px] w-full rounded-xl overflow-hidden bg-gradient-to-b ${current.bgGradient} flex flex-col items-center justify-center transition-all duration-700 p-3`}>
          {/* RED REALM: Mountain climbing */}
          {activeWorld === 'red' && (
            <svg viewBox="0 0 200 130" className="w-full h-full">
              {/* Mountain silhouettes */}
              <polygon points="10,130 90,30 160,130" fill="#4c0519" />
              <polygon points="70,130 140,15 200,130" fill="#881337" />
              {/* Snow/Victory Peak */}
              <polygon points="130,35 140,15 150,35 142,32" fill="#fecdd3" />
              {/* Victory Flag at Summit */}
              <line x1="140" y1="15" x2="140" y2="4" stroke="#fb7185" strokeWidth="1.5" />
              <polygon points="140,4 152,8 140,12" fill="#e11d48" />
              {/* Burning Torch Light */}
              <circle cx="140" cy="12" r="14" fill="#f43f5e" opacity="0.3" className="animate-ping" />
              {/* Climber Figure */}
              <circle cx="118" cy="48" r="2.5" fill="#fecdd3" />
              <line x1="118" y1="50" x2="122" y2="60" stroke="#fda4af" strokeWidth="1.5" />
            </svg>
          )}

          {/* YELLOW REALM: Community & Heart radiance */}
          {activeWorld === 'yellow' && (
            <svg viewBox="0 0 200 130" className="w-full h-full">
              {/* Rising morning sun */}
              <circle cx="100" cy="65" r="45" fill="#f59e0b" opacity="0.15" className="animate-pulse" />
              <circle cx="100" cy="65" r="26" fill="url(#yellowSun)" />
              {/* People Circle Around Campfire */}
              <g transform="translate(100, 70)">
                <circle cx="-35" cy="10" r="3" fill="#fef08a" />
                <line x1="-35" y1="13" x2="-35" y2="25" stroke="#fbbf24" strokeWidth="1.5" />
                <circle cx="0" cy="20" r="3" fill="#fef08a" />
                <line x1="0" y1="23" x2="0" y2="35" stroke="#fbbf24" strokeWidth="1.5" />
                <circle cx="35" cy="10" r="3" fill="#fef08a" />
                <line x1="35" y1="13" x2="35" y2="25" stroke="#fbbf24" strokeWidth="1.5" />
              </g>
              <defs>
                <linearGradient id="yellowSun" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {/* BLUE REALM: Kinetic Waves & Group Dynamism */}
          {activeWorld === 'blue' && (
            <svg viewBox="0 0 200 130" className="w-full h-full">
              {/* Energy Waves */}
              <path d="M 0 60 Q 50 20 100 60 T 200 60" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.7" />
              <path d="M 0 75 Q 50 35 100 75 T 200 75" fill="none" stroke="#3b82f6" strokeWidth="2.5" opacity="0.8" />
              {/* Synchronized nodes */}
              <circle cx="50" cy="38" r="4" fill="#38bdf8" />
              <circle cx="100" cy="60" r="6" fill="#67e8f9" className="animate-pulse" />
              <circle cx="150" cy="40" r="4" fill="#38bdf8" />
              <line x1="50" y1="38" x2="100" y2="60" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 2" />
              <line x1="100" y1="60" x2="150" y2="40" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 2" />
            </svg>
          )}

          {/* GREEN REALM: Architectural Sacred Geometry */}
          {activeWorld === 'green' && (
            <svg viewBox="0 0 200 130" className="w-full h-full">
              {/* Geometric Grid lines */}
              <line x1="100" y1="10" x2="100" y2="120" stroke="#059669" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="20" y1="65" x2="180" y2="65" stroke="#059669" strokeWidth="1" strokeDasharray="3 3" />
              {/* Isometric Cube / Crystal */}
              <polygon points="100,30 140,50 100,70 60,50" fill="#10b981" opacity="0.5" />
              <polygon points="60,50 100,70 100,110 60,90" fill="#047857" opacity="0.7" />
              <polygon points="140,50 100,70 100,110 140,90" fill="#065f46" opacity="0.9" />
              {/* Golden ratio spiral accent */}
              <circle cx="100" cy="70" r="28" fill="none" stroke="#34d399" strokeWidth="1" strokeDasharray="4 2" />
            </svg>
          )}
        </div>

        {/* 4 World Switcher Tabs */}
        <div className="grid grid-cols-4 gap-1.5 mt-3">
          {[
            { id: 'red' as const, label: 'سرخ (چالش)', color: 'text-rose-400', border: 'border-rose-500' },
            { id: 'yellow' as const, label: 'زرد (معنا)', color: 'text-amber-400', border: 'border-amber-500' },
            { id: 'blue' as const, label: 'آبی (ارتباط)', color: 'text-cyan-400', border: 'border-cyan-500' },
            { id: 'green' as const, label: 'سبز (سیستم)', color: 'text-emerald-400', border: 'border-emerald-500' },
          ].map((item) => {
            const isSelected = activeWorld === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectWorld(item.id)}
                className={`py-2 px-1 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${
                  isSelected
                    ? `bg-slate-900 ${item.border} ${item.color} font-black shadow-lg scale-102`
                    : 'bg-slate-950/60 border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
              >
                <span className="text-[10px] truncate max-w-[65px]">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Selected World Info Card */}
        <div className="mt-2.5 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-right">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-black ${current.activeText}`}>
              {current.name}
            </span>
            <div className="flex gap-1">
              {current.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-[8px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
          <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">{current.desc}</p>
        </div>
      </div>
    </div>
  );
};
