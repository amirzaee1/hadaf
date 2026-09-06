import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Sparkles, ChevronLeft, HelpCircle } from 'lucide-react';
import { WorkshopExercise } from '../../data/exercises';
import { UserProgress } from '../../types';
import { soundEngine } from '../../utils/audio';

interface InteractiveExerciseProps {
  exercise: WorkshopExercise;
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  className?: string;
}

export const InteractiveExercise: React.FC<InteractiveExerciseProps> = ({
  exercise,
  progress,
  onUpdateProgress,
  className = '',
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [customInput, setCustomInput] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    soundEngine.playTick();
  };

  const handleSave = () => {
    if (!selectedOption && !customInput) return;
    soundEngine.playSuccess();
    setIsSaved(true);

    onUpdateProgress((prev) => ({
      ...prev,
      reflections: {
        ...prev.reflections,
        [exercise.chapterId]: selectedOption || customInput,
      },
    }));

    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className={`p-4 rounded-3xl bg-slate-900/90 border border-slate-800 text-right space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <h3 className="text-xs sm:text-sm font-black text-white">{exercise.titleFa}</h3>
        </div>
        <span className="text-[10px] text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
          تمرین کارگاهی
        </span>
      </div>

      {/* Action Prompt & Instructions */}
      <div className="space-y-1">
        <p className="text-xs font-bold text-amber-300">{exercise.actionPrompt}</p>
        <p className="text-[11px] text-slate-400 leading-relaxed">{exercise.instructionFa}</p>
      </div>

      {/* Default Options Grid */}
      {exercise.defaultOptions && exercise.defaultOptions.length > 0 && (
        <div className="space-y-2 pt-1">
          {exercise.defaultOptions.map((opt, idx) => {
            const isSelected = selectedOption === opt;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(opt)}
                className={`w-full p-2.5 rounded-xl border text-right transition-all flex items-center justify-between text-xs ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-amber-100 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                    : 'bg-slate-950/70 border-slate-800/90 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 pr-1">
                  <span className="text-amber-400 font-bold font-mono text-[11px]">{idx + 1}.</span>
                  <span className="leading-snug">{opt}</span>
                </div>
                {isSelected ? (
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mr-2" />
                ) : (
                  <span className="w-3 h-3 rounded-full border border-slate-700 shrink-0 mr-2" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Optional Custom Input */}
      <div className="pt-2">
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="یا پاسخ اختصاصی خودت را بنویس..."
          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
        />
      </div>

      {/* Footer Outcome & Save Button */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
        <span className="text-[10px] text-slate-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>دستاورد: {exercise.keyOutcome}</span>
        </span>

        <button
          type="button"
          onClick={handleSave}
          disabled={!selectedOption && !customInput}
          className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:pointer-events-none text-black font-black text-xs flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(245,158,11,0.25)]"
        >
          {isSaved ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>ثبت شد</span>
            </>
          ) : (
            <span>تثبیت در نقشه</span>
          )}
        </button>
      </div>
    </div>
  );
};
