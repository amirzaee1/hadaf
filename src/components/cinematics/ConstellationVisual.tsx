import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Plus, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserProgress } from '../../types';
import { soundEngine } from '../../utils/audio';

interface ConstellationVisualProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
}

export const ConstellationVisual: React.FC<ConstellationVisualProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [connectLevel, setConnectLevel] = useState<number>(80);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newLesson, setNewLesson] = useState<string>('');
  const [selectedDotIndex, setSelectedDotIndex] = useState<number | null>(null);

  // Default seed points if none exist
  const baseDots = [
    { id: '1', title: 'تجربه شکست شغلی', lesson: 'کشف اهمیت سیستم‌سازی و مدیریت نقدینگی', x: 30, y: 70, type: 'شکست' },
    { id: '2', title: 'ملاقات با مربی الهام‌بخش', lesson: 'دیدن افق‌های جهانی و رهایی از تفکر محلی', x: 75, y: 35, type: 'ملاقات' },
    { id: '3', title: 'یادگیری مهارت نو', lesson: 'تسلط بر خلق ارزش و کدنویسی/طراحی', x: 125, y: 65, type: 'یادگیری' },
    { id: '4', title: 'تصمیم به استقلال', lesson: 'پذیرش مسئولیت صددرصدی سرنوشت خویش', x: 170, y: 30, type: 'تصمیم' },
  ];

  const defaultPositions = [
    { x: 30, y: 70 },
    { x: 75, y: 35 },
    { x: 125, y: 65 },
    { x: 170, y: 30 },
    { x: 95, y: 85 },
    { x: 150, y: 85 },
  ];

  // Filter filled user dots, otherwise show rich base constellation
  const filledLifeDots = (progress.lifeDots || []).filter((d) => d.title && d.title.trim().length > 0);
  const dotsToDisplay = filledLifeDots.length >= 3 ? filledLifeDots : baseDots;

  const currentDots = dotsToDisplay.map((d, i) => {
    const pos = defaultPositions[i % defaultPositions.length];
    const fallback = baseDots[i % baseDots.length];
    return {
      id: d.id || `dot-${i}`,
      title: d.title?.trim() ? d.title : fallback.title,
      lesson: d.lesson?.trim() ? d.lesson : fallback.lesson,
      x: pos.x,
      y: pos.y,
      type: (d as any).category || fallback.type,
    };
  });

  const handleAddPersonalDot = () => {
    if (!newTitle.trim()) return;
    const newDot = {
      id: `dot-${Date.now()}`,
      title: newTitle.trim(),
      lesson: newLesson.trim() || 'ارتقای آگاهی و تاب‌آوری',
      category: 'decision' as const,
    };
    onUpdateProgress((prev) => ({
      ...prev,
      lifeDots: [...(prev.lifeDots || []), newDot],
    }));
    setNewTitle('');
    setLessonEmpty();
    setConnectLevel(100);
    soundEngine.playChime(1046.5); // C6 highest chime
  };

  const setLessonEmpty = () => setNewLesson('');

  return (
    <div className="w-full flex flex-col items-center justify-center relative py-2">
      {/* Cinematic Typography Banner */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-200 font-extrabold text-xs tracking-wide text-center"
      >
        «همه نقطه‌ها، بالاخره به هم وصل می‌شوند»
      </motion.div>

      {/* Constellation Canvas Frame */}
      <div className="relative w-full max-w-[340px] rounded-2xl overflow-hidden bg-[#030714] border border-indigo-500/30 p-3 shadow-2xl">
        {/* Cosmic Sky */}
        <div className="relative h-[180px] w-full rounded-xl overflow-hidden bg-gradient-to-b from-[#06081e] via-[#040614] to-[#02030a]">
          {/* Nebula dust */}
          <div className="absolute inset-0 bg-radial from-indigo-500/15 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-4 right-8 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* SVG Constellation with Connecting Lines */}
          <svg viewBox="0 0 200 110" className="w-full h-full relative z-10">
            {/* Background micro stars */}
            <circle cx="15" cy="20" r="0.8" fill="#94a3b8" opacity="0.5" />
            <circle cx="95" cy="15" r="1" fill="#fef08a" opacity="0.6" />
            <circle cx="185" cy="85" r="0.9" fill="#94a3b8" opacity="0.4" />
            <circle cx="45" cy="95" r="0.8" fill="#cbd5e1" opacity="0.4" />

            {/* Connecting Golden Lines dynamically between dots */}
            {currentDots.length >= 2 &&
              currentDots.slice(0, -1).map((dot, idx) => {
                const nextDot = currentDots[idx + 1];
                if (!dot || !nextDot) return null;
                const threshold = 20 + (idx / Math.max(1, currentDots.length - 1)) * 50;
                if (connectLevel < threshold) return null;

                return (
                  <line
                    key={`line-${dot.id}-${nextDot.id}-${idx}`}
                    x1={dot.x}
                    y1={dot.y}
                    x2={nextDot.x}
                    y2={nextDot.y}
                    stroke={idx === currentDots.length - 2 ? '#38bdf8' : '#f59e0b'}
                    strokeWidth="1.5"
                    strokeDasharray={connectLevel < 80 ? '4 2' : 'none'}
                    opacity={Math.min(1, connectLevel / 80)}
                    className="transition-all duration-700"
                  />
                );
              })}

            {/* Grand Constellation Loop (Pattern of meaning) */}
            {connectLevel > 85 && currentDots.length >= 3 && (
              <polygon
                points={currentDots.map((d) => `${d.x},${d.y}`).join(' ')}
                fill="rgba(245, 158, 11, 0.08)"
                stroke="rgba(251, 191, 36, 0.3)"
                strokeWidth="0.8"
                strokeDasharray="2 2"
              />
            )}

            {/* Glowing Stars / Dots */}
            {currentDots.map((dot, idx) => {
              const isSelected = selectedDotIndex === idx;
              return (
                <g
                  key={dot.id}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedDotIndex(idx);
                    soundEngine.playTick();
                  }}
                >
                  {/* Outer pulse aura */}
                  <circle
                    cx={dot.x}
                    cy={dot.y}
                    r={isSelected ? 10 : 6}
                    fill={idx === 3 ? '#38bdf8' : '#f59e0b'}
                    opacity={isSelected ? 0.4 : 0.2}
                    className="animate-pulse"
                  />
                  {/* Core star */}
                  <circle
                    cx={dot.x}
                    cy={dot.y}
                    r={isSelected ? 4.5 : 3.5}
                    fill={idx === 3 ? '#e0f2fe' : '#fef08a'}
                  />
                  {/* Category text */}
                  <text
                    x={dot.x}
                    y={dot.y + 11}
                    fill="#cbd5e1"
                    fontSize="6"
                    textAnchor="middle"
                    className="select-none font-medium"
                  >
                    {dot.type}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Constellation Connection Slider */}
        <div className="mt-3 px-1">
          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
            <span>اتصال تارهای معنایی گذشته</span>
            <span className="text-amber-400 font-bold">{connectLevel}٪ نقشه آشکار</span>
          </div>
          <input
            type="range"
            min="20"
            max="100"
            value={connectLevel}
            onChange={(e) => {
              setConnectLevel(parseInt(e.target.value));
              soundEngine.playTick();
            }}
            className="w-full h-1.5 rounded-lg bg-slate-800 accent-indigo-400 cursor-pointer"
          />
        </div>

        {/* Selected Star Details Card */}
        {selectedDotIndex !== null && currentDots[selectedDotIndex] && (
          <div className="mt-2.5 p-2.5 rounded-xl bg-slate-900/90 border border-amber-500/30 text-right">
            <div className="flex items-center justify-between text-[11px] font-bold text-amber-300">
              <span>{currentDots[selectedDotIndex].title}</span>
              <span className="text-[9px] text-slate-400">ستاره شماره {selectedDotIndex + 1}</span>
            </div>
            <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">
              گنج نهفته: {currentDots[selectedDotIndex].lesson}
            </p>
          </div>
        )}

        {/* Add Personal Dot Section */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-right">
          <div className="text-[10px] text-indigo-300 font-bold mb-1.5 flex items-center justify-between">
            <span>ثبت نقطه عطف جدید در کهکشان زندگی:</span>
            <span className="text-amber-400 text-[9px]">صورت فلکی اختصاصی</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <input
              type="text"
              placeholder="عنوان رویداد یا بحران سرنوشت‌ساز..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950/80 border border-slate-700 text-xs text-slate-200 outline-none focus:border-indigo-400"
            />
            <div className="flex gap-1.5">
              <input
                type="text"
                placeholder="درس و بینشی که از آن رویداد گرفتی..."
                value={newLesson}
                onChange={(e) => setNewLesson(e.target.value)}
                className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-950/80 border border-slate-700 text-xs text-slate-200 outline-none focus:border-indigo-400"
              />
              <button
                onClick={handleAddPersonalDot}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>اتصال</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
