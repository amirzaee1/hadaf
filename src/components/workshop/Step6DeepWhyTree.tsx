import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowLeft, Plus, CheckCircle2, Flame, Trash2, Heart } from 'lucide-react';
import { UserProgress } from '../../types';
import { soundEngine } from '../../utils/audio';

interface Step6DeepWhyTreeProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onComplete: () => void;
}

export const Step6DeepWhyTree: React.FC<Step6DeepWhyTreeProps> = ({
  progress,
  onUpdateProgress,
  onComplete,
}) => {
  const [newReason, setNewReason] = useState('');

  const roots = progress.deepWhyRoots || [
    'تا فرزندانم الگوی زنده‌ای از شجاعت و پایمردی در برابر ناملایمات ببینند',
    'تا هرگز در واپسین سال‌های عمر با حسرت و «کاش تلاش کرده بودم» از خواب بیدار نشوم',
    'تا با استقلال مالی، بتوانم مأمن امن و حامی بی‌دریغ خانواده و اطرافیانم باشم',
    'چون توانایی‌های خدادادی من حیف است که در سکوت و روزمرگی به خاک سپرده شود',
    'تا ثابت کنم که شرایط آغازین مسیر، پایان‌بخش سرنوشت یک انسان مصمم نیست',
  ];

  const handleAddRoot = () => {
    if (!newReason.trim()) return;
    onUpdateProgress((prev) => ({
      ...prev,
      deepWhyRoots: [...(prev.deepWhyRoots || roots), newReason.trim()],
    }));
    setNewReason('');
    soundEngine.playChime(659.25);
  };

  const handleDeleteRoot = (index: number) => {
    onUpdateProgress((prev) => {
      const current = prev.deepWhyRoots || roots;
      const updated = current.filter((_, i) => i !== index);
      return { ...prev, deepWhyRoots: updated };
    });
    soundEngine.playTick();
  };

  const handleFinalize = () => {
    soundEngine.playChime(1046.5);
    onComplete();
  };

  const isTreeSolid = roots.length >= 5;

  return (
    <div className="space-y-6 text-right">
      {/* Title & Concept */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
            گام ششم کارگاه: ریشه‌های چرایی سوزان (Deep Why Tree)
          </span>
          <span className="text-xs font-mono text-amber-400">
            {roots.length} ریشه در عمق خاک
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          استحکام درخت به شاخه‌هایش نیست؛ به عمق ریشه‌هایش در تاریکی خاک است
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          کسی که «چرایی» نیرومندی دارد، با هر «چگونه‌ای» خواهد ساخت. طوفان‌های مسیر فرا می‌رسند؛ تنها درختی که ریشه‌های سوزان در عمق دارد در برابر بادهای بی‌انگیزگی استوار می‌ماند.
        </p>
      </div>

      {/* Visual Metaphor: Tree with Living Roots */}
      <div className="p-5 rounded-3xl bg-gradient-to-b from-[#030712] via-[#051119] to-[#0d0705] border border-emerald-500/30 flex flex-col items-center justify-center space-y-4 shadow-2xl">
        <div className="relative w-full h-56 sm:h-64 flex items-center justify-center">
          <svg viewBox="0 0 340 220" className="w-full h-full">
            {/* Ground Horizon Divider */}
            <line x1="20" y1="110" x2="320" y2="110" stroke="#78350f" strokeWidth="2.5" />
            <text x="310" y="105" fill="#a16207" fontSize="7" textAnchor="end">
              سطح زمین
            </text>

            {/* Tree Canopy (Goal) */}
            <circle cx="170" cy="55" r="45" fill="#15803d" opacity="0.85" />
            <circle cx="140" cy="65" r="35" fill="#16a34a" opacity="0.9" />
            <circle cx="200" cy="65" r="35" fill="#16a34a" opacity="0.9" />
            <circle cx="170" cy="35" r="32" fill="#22c55e" opacity="0.95" />

            {/* Glowing Fruit in Canopy */}
            <circle cx="155" cy="45" r="5" fill="#fbbf24" className="animate-pulse" />
            <circle cx="185" cy="52" r="4.5" fill="#fbbf24" className="animate-pulse" />
            <circle cx="170" cy="68" r="4" fill="#fbbf24" className="animate-pulse" />

            <text x="170" y="58" fill="#ffffff" fontSize="9" textAnchor="middle" className="font-bold">
              تاج هدف تو
            </text>

            {/* Tree Trunk */}
            <path
              d="M 160 110 L 163 75 L 177 75 L 180 110 Z"
              fill="#78350f"
              stroke="#451a03"
              strokeWidth="1.5"
            />

            {/* Dynamic Roots Growing Under Ground based on number of reasons */}
            {roots.map((root, i) => {
              const spread = (i - (roots.length - 1) / 2) * 35;
              const depth = 140 + (i % 3) * 25;
              const xEnd = 170 + spread;

              return (
                <g key={i}>
                  <path
                    d={`M 170 110 Q ${170 + spread * 0.4} 130 ${xEnd} ${depth}`}
                    stroke="#d97706"
                    strokeWidth={roots.length >= 5 ? '3' : '2'}
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle cx={xEnd} cy={depth} r="3.5" fill="#fbbf24" />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Status of Tree Roots */}
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
          <Heart className="w-4 h-4 text-rose-400" />
          <span>
            {roots.length >= 5
              ? 'ریشه‌ها عمیق و تسخیرناپذیر شدند؛ هیچ طوفانی توان شکستن این هدف را ندارد.'
              : `حداقل ۵ دلیل عمیق بنویس (${5 - roots.length} ریشه دیگر نیاز است).`}
          </span>
        </div>
      </div>

      {/* Add Deep Reason Input */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-3">
        <label className="block text-xs font-bold text-amber-300">
          یک چرایی عاطفی و تکان‌دهنده به ریشه‌های این درخت پیوند بزن:
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="مثال: چون می‌خواهم الگویی از غرور و خودباوری برای نسل بعد باشم..."
            value={newReason}
            onChange={(e) => setNewReason(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddRoot()}
            className="flex-1 bg-slate-950/80 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-100 outline-none"
          />
          <button
            onClick={handleAddRoot}
            className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>نفوذ ریشه در خاک</span>
          </button>
        </div>
      </div>

      {/* List of Deep Reasons */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-300">
          ریشه‌های چرایی ثبت‌شده تو:
        </h4>
        <div className="space-y-2">
          {roots.map((root, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-900/70 border border-emerald-500/30 flex items-center justify-between gap-3 text-right"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs font-black flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="text-xs sm:text-sm text-slate-200 font-medium">
                  {root}
                </span>
              </div>
              <button
                onClick={() => handleDeleteRoot(idx)}
                className="p-1 text-slate-500 hover:text-red-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Completion Button */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          {isTreeSolid ? 'درخت با ۵+ ریشه نیرومند لنگر انداخت.' : 'حداقل ۵ دلیل ثبت کن.'}
        </span>
        <button
          disabled={!isTreeSolid}
          onClick={handleFinalize}
          className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
            isTreeSolid
              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>تثبیت ریشه‌ها و رفتن به میثاق‌نامه</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
