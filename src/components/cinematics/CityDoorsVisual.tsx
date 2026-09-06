import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, DoorOpen, Sparkles, CheckCircle2, Lock, Unlock } from 'lucide-react';
import { UserProgress } from '../../types';
import { soundEngine } from '../../utils/audio';

interface CityDoorsVisualProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
}

export const CityDoorsVisual: React.FC<CityDoorsVisualProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [awarenessLevel, setAwarenessLevel] = useState<number>(75);
  const [selectedDoorId, setSelectedDoorId] = useState<number | null>(null);

  const doors = [
    {
      id: 1,
      title: 'مهارت انقلابی و ترند جهانی',
      desc: 'یادگیری عمیق هوش مصنوعی و مدل‌های مولد',
      type: 'small_light',
      x: 35,
      y: 55,
      w: 22,
      h: 40,
      threshold: 30,
      color: '#38bdf8',
    },
    {
      id: 2,
      title: 'شبکه ارتباطی و مربیگری',
      desc: 'هم‌نشینی با افراد پیشرو و الگوهای موفق',
      type: 'portal',
      x: 80,
      y: 45,
      w: 28,
      h: 50,
      threshold: 50,
      color: '#fbbf24',
    },
    {
      id: 3,
      title: 'بازسازی سلامت و انرژی حیاتی',
      desc: 'خواب عمیق، تغذیه پاک و ورزش منظم',
      type: 'small_light',
      x: 130,
      y: 58,
      w: 20,
      h: 38,
      threshold: 65,
      color: '#34d399',
    },
    {
      id: 4,
      title: 'دروازه بزرگ: نوآوری تجاری بکر',
      desc: 'خلق ارزشی بی‌همتا در بازار بدون رقیب',
      type: 'grand_gate',
      x: 165,
      y: 38,
      w: 32,
      h: 58,
      threshold: 80,
      color: '#a855f7',
    },
  ];

  const handleDoorClick = (door: typeof doors[0]) => {
    if (awarenessLevel < door.threshold) {
      setAwarenessLevel(door.threshold);
    }
    setSelectedDoorId(door.id);
    const existing = progress.ignoredOpportunities || [];
    const isAlready = existing.includes(door.title);
    const updated = isAlready ? existing : [...existing, door.title];
    onUpdateProgress((prev) => ({
      ...prev,
      ignoredOpportunities: updated,
    }));
    soundEngine.playChime(659.25);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center relative py-2">
      {/* Cinematic Typography Banner */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 font-extrabold text-xs tracking-wide text-center"
      >
        «فرصت‌های پنهان، تنها با خودآگاهی آشکار می‌شوند»
      </motion.div>

      {/* City Street Viewport Frame */}
      <div className="relative w-full max-w-[340px] rounded-2xl overflow-hidden bg-[#02050f] border border-emerald-500/30 p-3 shadow-2xl">
        {/* The Atmospheric City Canvas */}
        <div className="relative h-[180px] w-full rounded-xl overflow-hidden bg-gradient-to-b from-[#030712] via-[#091528] to-[#040914]">
          {/* Distant City Skyline Silhouettes */}
          <svg viewBox="0 0 200 120" className="w-full h-full relative z-0">
            {/* Background buildings */}
            <rect x="10" y="20" width="30" height="80" fill="#0b1329" />
            <rect x="50" y="15" width="25" height="85" fill="#080e1e" />
            <polygon points="50,15 62,5 75,15" fill="#080e1e" />
            <rect x="90" y="30" width="35" height="70" fill="#0c1730" />
            <rect x="140" y="10" width="45" height="90" fill="#080e1e" />

            {/* Cobblestone Street */}
            <path d="M 0 95 L 200 95 L 200 120 L 0 120 Z" fill="#060b18" />
            <line x1="0" y1="95" x2="200" y2="95" stroke="#1e293b" strokeWidth="1" />

            {/* Traveler walking along the city street */}
            <g transform="translate(20, 95)">
              <circle cx="0" cy="-18" r="3" fill="#cbd5e1" />
              <line x1="0" y1="-15" x2="0" y2="-5" stroke="#94a3b8" strokeWidth="2" />
              <line x1="0" y1="-5" x2="-3" y2="0" stroke="#64748b" strokeWidth="1.5" />
              <line x1="0" y1="-5" x2="3" y2="0" stroke="#64748b" strokeWidth="1.5" />
              {/* Traveler holding lantern */}
              <line x1="0" y1="-12" x2="5" y2="-10" stroke="#94a3b8" strokeWidth="1.2" />
              <circle cx="6" cy="-9" r="2" fill="#fbbf24" className="animate-pulse" />
            </g>

            {/* City Doors Along The Buildings */}
            {doors.map((d) => {
              const isRevealed = awarenessLevel >= d.threshold;
              const isSelected = selectedDoorId === d.id;
              return (
                <g
                  key={d.id}
                  className="cursor-pointer transition-all duration-700"
                  onClick={() => handleDoorClick(d)}
                >
                  {/* Door frame */}
                  <rect
                    x={d.x}
                    y={d.y}
                    width={d.w}
                    height={d.h}
                    rx="2"
                    fill={isRevealed ? '#0f172a' : '#070b16'}
                    stroke={isRevealed ? d.color : '#1e293b'}
                    strokeWidth={isSelected ? 2 : isRevealed ? 1.2 : 0.6}
                    strokeDasharray={isRevealed ? 'none' : '2 2'}
                  />

                  {/* Door interior glow if revealed */}
                  {isRevealed && (
                    <>
                      <rect
                        x={d.x + 2}
                        y={d.y + 2}
                        width={d.w - 4}
                        height={d.h - 4}
                        fill={d.color}
                        opacity={isSelected ? 0.35 : 0.2}
                      />
                      {/* Door handle / portal rune */}
                      <circle cx={d.x + d.w - 5} cy={d.y + d.h / 2} r="1.5" fill="#fef08a" />
                      {/* Floating glowing light orb above door */}
                      <circle cx={d.x + d.w / 2} cy={d.y - 4} r="2" fill={d.color} className="animate-ping" />
                    </>
                  )}

                  {!isRevealed && (
                    <text
                      x={d.x + d.w / 2}
                      y={d.y + d.h / 2 + 3}
                      fill="#475569"
                      fontSize="6"
                      textAnchor="middle"
                    >
                      ?
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Awareness Radar Slider */}
        <div className="mt-3 px-1">
          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span>میزان هوشیاری و خودآگاهی</span>
            </span>
            <span className="text-emerald-400 font-bold">{awarenessLevel}٪ درهای آشکار</span>
          </div>
          <input
            type="range"
            min="25"
            max="100"
            value={awarenessLevel}
            onChange={(e) => {
              setAwarenessLevel(parseInt(e.target.value));
              soundEngine.playTick();
            }}
            className="w-full h-1.5 rounded-lg bg-slate-800 accent-emerald-400 cursor-pointer"
          />
        </div>

        {/* Selected Door Details */}
        {selectedDoorId && (
          <div className="mt-2.5 p-2 rounded-xl bg-slate-900/90 border border-emerald-500/40 text-right">
            {(() => {
              const d = doors.find((x) => x.id === selectedDoorId);
              if (!d) return null;
              return (
                <div>
                  <div className="text-[11px] font-bold text-emerald-300 flex items-center justify-between">
                    <span>{d.title}</span>
                    <span className="text-[9px] text-slate-400">دروازه گشوده شد</span>
                  </div>
                  <p className="text-[10px] text-slate-300 mt-0.5">{d.desc}</p>
                </div>
              );
            })()}
          </div>
        )}

        {/* Question & Chosen Ignored Opportunities List */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-right">
          <div className="text-[10px] text-emerald-300 font-bold mb-1.5 flex items-center justify-between">
            <span>چه فرصت‌هایی را تا کنون نادیده گرفته‌ام؟ (انتخاب لمسی):</span>
            <span className="text-slate-400 text-[9px]">{doors.filter((d) => awarenessLevel >= d.threshold).length} از ۴ دروازه</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {doors.map((door) => {
              const isSelected = (progress.ignoredOpportunities || []).includes(door.title);
              const isUnlocked = awarenessLevel >= door.threshold;
              return (
                <button
                  key={door.id}
                  onClick={() => handleDoorClick(door)}
                  className={`p-2 rounded-lg border text-right transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-100 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                      : isUnlocked
                      ? 'bg-slate-900/70 border-slate-700/70 text-slate-300 hover:border-emerald-500/40'
                      : 'bg-slate-950/60 border-slate-800 text-slate-500'
                  }`}
                >
                  <span className="text-[10px] truncate max-w-[110px]">{door.title}</span>
                  {isSelected ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  ) : isUnlocked ? (
                    <Unlock className="w-3 h-3 text-slate-400 shrink-0" />
                  ) : (
                    <Lock className="w-3 h-3 text-slate-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
