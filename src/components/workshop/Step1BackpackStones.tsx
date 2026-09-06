import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowLeft, Plus, CheckCircle2, Flame, Feather, Trash2, ArrowRight } from 'lucide-react';
import { UserProgress } from '../../types';
import { soundEngine } from '../../utils/audio';

interface Step1BackpackStonesProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onComplete: () => void;
}

export const Step1BackpackStones: React.FC<Step1BackpackStonesProps> = ({
  progress,
  onUpdateProgress,
  onComplete,
}) => {
  const [newUnwanted, setNewUnwanted] = useState('');
  const [activeStoneIndex, setActiveStoneIndex] = useState<number | null>(null);
  const [transformedText, setTransformedText] = useState('');

  const stones = progress.backpackStones || [
    {
      id: 'stone-1',
      unwanted: 'خستگی مزمن ناشی از بی‌برنامگی و بی‌خوابی شبانه',
      transformed: 'تندرستی پرانرژی و ریتم خواب الهام‌بخش',
      isTransformed: true,
    },
    {
      id: 'stone-2',
      unwanted: 'استرس مالی و حقوق ناکافی انتهای ماه',
      transformed: 'آزادی مالی، جریان درآمدی چندگانه و آرامش حساب بانکی',
      isTransformed: true,
    },
    {
      id: 'stone-3',
      unwanted: 'تردید همیشگی و به تعویق انداختن ایده‌های بزرگ',
      transformed: '',
      isTransformed: false,
    },
  ];

  const totalWeightKg = stones.length * 7;
  const transformedCount = stones.filter((s) => s.isTransformed).length;
  const lightBeaconsCount = transformedCount;

  const handleAddStone = () => {
    if (!newUnwanted.trim()) return;
    const newStone = {
      id: `stone-${Date.now()}`,
      unwanted: newUnwanted.trim(),
      transformed: '',
      isTransformed: false,
    };
    onUpdateProgress((prev) => ({
      ...prev,
      backpackStones: [...(prev.backpackStones || stones), newStone],
    }));
    setNewUnwanted('');
    soundEngine.playShatter();
  };

  const handleTransformStone = (index: number) => {
    if (!transformedText.trim()) return;
    onUpdateProgress((prev) => {
      const current = prev.backpackStones || stones;
      const updated = current.map((s, idx) => {
        if (idx === index) {
          return {
            ...s,
            transformed: transformedText.trim(),
            isTransformed: true,
          };
        }
        return s;
      });
      return {
        ...prev,
        backpackStones: updated,
        transformedFuel: true,
      };
    });
    setTransformedText('');
    setActiveStoneIndex(null);
    soundEngine.playChime(987.77); // B5 triumphant chime
  };

  const handleDeleteStone = (index: number) => {
    onUpdateProgress((prev) => {
      const current = prev.backpackStones || stones;
      const updated = current.filter((_, idx) => idx !== index);
      return { ...prev, backpackStones: updated };
    });
    soundEngine.playTick();
  };

  const allDone = stones.length >= 3 && stones.every((s) => s.isTransformed);

  return (
    <div className="space-y-6 text-right">
      {/* Title & Dramatic Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300">
            گام اول کارگاه: لیست انزجار — کشف درد واقعی
          </span>
          <span className="text-xs font-mono text-amber-400">وزن کوله: {totalWeightKg} کیلوگرم سنگ</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          سنگینی کوله‌پشتی که دیگر حاضر نیستی به دوش بکشی
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          انسان‌ها برای فرار از رنج ۱۰ برابر بیشتر از دستیابی به لذت انگیزه دارند. آنچه روحت را فرسوده و خسته کرده به زبان بیاور تا هر سنگ سیاه را به مشعلی از نور و جهت‌گیری تبدیل کنیم.
        </p>
      </div>

      {/* Cinematic Backpack Visual with Reactive Weight */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#0a0505] via-[#12080a] to-[#060408] border border-red-500/20 p-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Backpack SVG Illustration */}
          <div className="relative w-44 h-48 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 160 180" className="w-full h-full">
              {/* Straps */}
              <path d="M 45 35 Q 25 70 35 140" stroke="#7f1d1d" strokeWidth="10" strokeLinecap="round" fill="none" />
              <path d="M 115 35 Q 135 70 125 140" stroke="#7f1d1d" strokeWidth="10" strokeLinecap="round" fill="none" />
              {/* Main Body of Backpack - bulges with weight */}
              <rect
                x="35"
                y="35"
                width="90"
                height={100 + Math.min(25, stones.length * 4)}
                rx="20"
                fill="#2b0f14"
                stroke="#991b1b"
                strokeWidth="2.5"
              />
              {/* Flap */}
              <path d="M 35 60 Q 80 80 125 60 L 125 35 Q 80 20 35 35 Z" fill="#450a0a" stroke="#b91c1c" strokeWidth="2" />
              {/* Buckles */}
              <rect x="52" y="80" width="12" height="18" rx="2" fill="#d97706" />
              <rect x="96" y="80" width="12" height="18" rx="2" fill="#d97706" />

              {/* Inside glowing light if stones transformed */}
              {lightBeaconsCount > 0 && (
                <circle
                  cx="80"
                  cy="110"
                  r={Math.min(35, lightBeaconsCount * 12)}
                  fill="#fbbf24"
                  opacity="0.35"
                  className="animate-pulse"
                />
              )}
            </svg>

            {/* Glowing floating stones count badge */}
            <div className="absolute bottom-2 inset-x-0 flex items-center justify-center">
              <span className="text-[11px] font-mono font-black px-3 py-1 rounded-full bg-black/80 border border-red-500/40 text-red-300">
                {stones.length} سنگ سیاه | {lightBeaconsCount} مشعل نور
              </span>
            </div>
          </div>

          {/* Emotional Transformation Metric */}
          <div className="flex-1 space-y-3 text-right">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">سنگ‌های دگرگون‌شده به نور:</span>
                <span className="text-amber-400 font-bold font-mono">
                  {transformedCount} از {stones.length}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-l from-amber-400 to-yellow-500"
                  initial={{ width: 0 }}
                  animate={{
                    width: stones.length > 0 ? `${(transformedCount / stones.length) * 100}%` : '0%',
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              «هر رنجی که نام‌گذاری شود، قدرتش بر تو نصف می‌شود. هر دردی که به جهت تبدیل شود، سوخت پرتاب تو به سوی قله خواهد بود.»
            </p>
          </div>
        </div>
      </div>

      {/* Add New Heavy Stone Input */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-3">
        <label className="block text-xs font-bold text-red-300">
          سنگینی دیگری که در کوله داری و دیگر نمی‌خواهی ادامه یابد:
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="مثال: کار کردن در پروژه‌هایی که هیچ اشتیاقی به آنها ندارم..."
            value={newUnwanted}
            onChange={(e) => setNewUnwanted(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddStone()}
            className="flex-1 bg-slate-950/80 border border-slate-700 focus:border-red-400 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-100 outline-none"
          />
          <button
            onClick={handleAddStone}
            className="px-4 py-2.5 rounded-xl bg-red-700 hover:bg-red-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>قرار دادن در کوله</span>
          </button>
        </div>
      </div>

      {/* List of Stones & Alchemical Transformation Stage */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-300">
          سنگ‌های موجود در کوله‌پشتی تو (کلیک کن تا به نور تبدیل شوند):
        </h4>

        <div className="space-y-2.5">
          {stones.map((stone, idx) => {
            const isEditing = activeStoneIndex === idx;

            return (
              <div
                key={stone.id}
                className={`p-4 rounded-2xl border transition-all ${
                  stone.isTransformed
                    ? 'bg-gradient-to-r from-amber-500/10 via-slate-900/90 to-slate-900/90 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
                    : 'bg-slate-900/70 border-red-500/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                        stone.isTransformed
                          ? 'bg-amber-400 text-black shadow-[0_0_10px_rgba(251,191,36,0.6)]'
                          : 'bg-red-900/80 text-red-200'
                      }`}
                    >
                      {stone.isTransformed ? '✦' : '🪨'}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white">
                      {stone.unwanted}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setActiveStoneIndex(isEditing ? null : idx);
                        setTransformedText(stone.transformed || '');
                      }}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 text-amber-300 hover:bg-slate-700 transition-all font-medium"
                    >
                      {stone.isTransformed ? 'ویرایش جهت' : 'تبدیل به نور ⚡'}
                    </button>
                    <button
                      onClick={() => handleDeleteStone(idx)}
                      className="p-1 text-slate-500 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Transformed Golden Direction Display */}
                {stone.isTransformed && !isEditing && (
                  <div className="mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-bold">مشعل زرین جهت:</span>
                    <span>{stone.transformed}</span>
                  </div>
                )}

                {/* Transformation Editor Modal/Drawer */}
                {isEditing && (
                  <div className="mt-3 pt-3 border-t border-slate-800 space-y-2">
                    <label className="block text-[11px] text-amber-300 font-bold">
                      تبدیل این سنگ به جهتی که دقیقاً مشتاق آن هستی:
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        placeholder="مثال: من آزادی مالی و آرامش درآمد پایدار می‌خواهم..."
                        value={transformedText}
                        onChange={(e) => setTransformedText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleTransformStone(idx)}
                        className="flex-1 bg-slate-950 border border-amber-500/60 rounded-xl px-3 py-2 text-xs text-slate-100 outline-none"
                        autoFocus
                      />
                      <button
                        onClick={() => handleTransformStone(idx)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold text-xs shrink-0 flex items-center justify-center gap-1 shadow-md"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-black" />
                        <span>سبک کردن کوله</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Completion Button */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          {allDone
            ? 'همه سنگ‌های کوله‌پشتی دگرگون شدند. آماده تثبیت ارکان هستی.'
            : 'حداقل ۳ سنگ را به مشعل‌های هدایت‌گر تبدیل کن.'}
        </span>
        <button
          disabled={!allDone}
          onClick={() => {
            onComplete();
            soundEngine.playChime(1046.5);
          }}
          className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
            allDone
              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>تثبیت گام اول و رفتن به سه ستون</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
