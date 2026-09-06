import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowLeft, CheckCircle2, GripVertical, Info } from 'lucide-react';
import { UserProgress } from '../../types';
import { soundEngine } from '../../utils/audio';

interface Step2ValuesPillarsProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onComplete: () => void;
}

const AVAILABLE_VALUES = [
  { id: 'freedom', label: 'آزادی و استقلال (Freedom)' },
  { id: 'growth', label: 'رشد و تسلط شخصی (Growth)' },
  { id: 'family', label: 'خانواده و پیوند عمیق (Family)' },
  { id: 'financial_security', label: 'امنیت و استقلال مالی (Financial Security)' },
  { id: 'achievement', label: 'دستاورد و برتری (Achievement)' },
  { id: 'impact', label: 'اثرگذاری و خدمت انسانی (Impact)' },
  { id: 'adventure', label: 'ماجراجویی و تجربه بکر (Adventure)' },
  { id: 'career_satisfaction', label: 'رسالت و رضایت شغلی (Career Satisfaction)' },
  { id: 'wisdom', label: 'خرد و خودآگاهی (Wisdom)' },
  { id: 'health', label: 'سلامت و سرزندگی بدنی (Health)' },
  { id: 'peace', label: 'آرامش درون و سکون (Inner Peace)' },
  { id: 'creativity', label: 'خلاقیت و اصالت فردی (Creativity)' },
];

export const Step2ValuesPillars: React.FC<Step2ValuesPillarsProps> = ({
  progress,
  onUpdateProgress,
  onComplete,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(
    progress.coreValues && progress.coreValues.length === 3
      ? progress.coreValues
      : ['آزادی و استقلال (Freedom)', 'رشد و تسلط شخصی (Growth)', 'امنیت و استقلال مالی (Financial Security)']
  );

  const [explanations, setExplanations] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    (progress.foundationPillars || []).forEach((p) => {
      map[p.value] = p.explanation;
    });
    return map;
  });

  const handleToggleValue = (val: string) => {
    if (selectedValues.includes(val)) {
      setSelectedValues((prev) => prev.filter((v) => v !== val));
      soundEngine.playTick();
    } else {
      if (selectedValues.length < 3) {
        setSelectedValues((prev) => [...prev, val]);
        soundEngine.playChime(659.25);
      } else {
        // Swap last
        setSelectedValues((prev) => [prev[0], prev[1], val]);
        soundEngine.playTick();
      }
    }
  };

  const handleMovePriority = (index: number, direction: 'up' | 'down') => {
    const next = [...selectedValues];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= next.length) return;
    const temp = next[index];
    next[index] = next[targetIndex];
    next[targetIndex] = temp;
    setSelectedValues(next);
    soundEngine.playTick();
  };

  const handleExplanationChange = (val: string, text: string) => {
    setExplanations((prev) => ({ ...prev, [val]: text }));
  };

  const handleSavePillars = () => {
    const pillarsData = selectedValues.map((v, i) => ({
      value: v,
      priority: i + 1,
      explanation: explanations[v] || 'ستون بنیادی انتخاب‌ها و جهت‌گیری سرنوشت من',
    }));

    onUpdateProgress((prev) => ({
      ...prev,
      coreValues: selectedValues,
      foundationPillars: pillarsData,
    }));

    soundEngine.playChime(1046.5);
    onComplete();
  };

  const isComplete = selectedValues.length === 3;

  return (
    <div className="space-y-6 text-right">
      {/* Title & Concept */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300">
            گام دوم کارگاه: سه ستون ارزش‌های غایی
          </span>
          <span className="text-xs font-mono text-amber-400">
            {selectedValues.length} از ۳ ستون برگزیده شد
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          کهکشان ارزش‌ها: انتخاب سه ستون فناناپذیر
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          ارزش‌ها اهدافی برای رسیدن نیستند؛ جهت قطب‌نما هستند. زندگی تو روی این سه ستون مستحکم برپا خواهد شد و هر هدفی که با این سه در تضاد باشد، تو را دچار فرسایش درونی خواهد کرد.
        </p>
      </div>

      {/* Visual Universe of Glowing Values */}
      <div className="p-4 rounded-3xl bg-gradient-to-b from-[#060814] via-[#090e21] to-[#04060d] border border-indigo-500/30 space-y-3">
        <span className="text-xs font-bold text-indigo-300 block">
          از میان کهکشان ارزش‌ها، دقیقاً سه مورد حیاتی را برگزین:
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {AVAILABLE_VALUES.map((val) => {
            const isSelected = selectedValues.includes(val.label);
            const selectedIndex = selectedValues.indexOf(val.label);

            return (
              <button
                key={val.id}
                onClick={() => handleToggleValue(val.label)}
                className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between min-h-[64px] active:scale-95 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500/25 to-yellow-500/20 border-amber-400 text-amber-100 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                    : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-extrabold">{val.label}</span>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-amber-400 text-black text-[11px] font-black flex items-center justify-center">
                      {selectedIndex + 1}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* The 3 Architectural Pillars Foundation Preview */}
      {selectedValues.length > 0 && (
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-amber-500/40 space-y-4 shadow-2xl">
          <div className="text-center space-y-1">
            <h3 className="text-base sm:text-lg font-black text-amber-300 font-serif">
              «زندگی تو روی این سه ستون ساخته می‌شود»
            </h3>
            <p className="text-[11px] text-slate-400">
              اولویت ستون‌ها را با دکمه‌ها تنظیم کن و دلیل انتخاب هر ستون را بنویس:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {selectedValues.map((val, idx) => (
              <div
                key={val}
                className="p-3.5 rounded-2xl bg-slate-950/80 border border-amber-400/50 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[11px] font-bold">
                    ستون شماره {idx + 1}
                  </span>
                  <div className="flex gap-1">
                    {idx > 0 && (
                      <button
                        onClick={() => handleMovePriority(idx, 'up')}
                        className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 hover:text-white"
                        title="افزایش اولویت"
                      >
                        ▲
                      </button>
                    )}
                    {idx < selectedValues.length - 1 && (
                      <button
                        onClick={() => handleMovePriority(idx, 'down')}
                        className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 hover:text-white"
                        title="کاهش اولویت"
                      >
                        ▼
                      </button>
                    )}
                  </div>
                </div>

                <div className="text-sm font-extrabold text-white text-right">
                  {val}
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">
                    چرا این ارزش برای روان تو خط قرمز است؟
                  </label>
                  <input
                    type="text"
                    placeholder="دلیل انتخاب و معنای شخصی..."
                    value={explanations[val] || ''}
                    onChange={(e) => handleExplanationChange(val, e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completion Button */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          {isComplete
            ? 'سه ستون بنیادین قفل شدند. آماده خلق رویای بدون مرز.'
            : 'دقیقاً سه ارزش را از کهکشان انتخاب کن.'}
        </span>
        <button
          disabled={!isComplete}
          onClick={handleSavePillars}
          className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
            isComplete
              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>تثبیت ستون‌ها و گام به پنجره آینده</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
