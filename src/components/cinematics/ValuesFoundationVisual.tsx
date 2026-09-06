import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, CheckCircle2, Building2 } from 'lucide-react';
import { UserProgress } from '../../types';
import { soundEngine } from '../../utils/audio';

interface ValuesFoundationVisualProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
}

export const ValuesFoundationVisual: React.FC<ValuesFoundationVisualProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(
    progress.coreValues && progress.coreValues.length > 0
      ? progress.coreValues.slice(0, 3)
      : ['رشد و تسلط فردی', 'استقلال و امنیت مالی', 'آزادی و اصالت']
  );

  const availableValues = [
    { name: 'خانواده و پیوند عشق', icon: '❤️' },
    { name: 'استقلال و امنیت مالی', icon: '🪙' },
    { name: 'رشد و تسلط فردی', icon: '🧠' },
    { name: 'آزادی و اصالت', icon: '🦅' },
    { name: 'دستاورد و برتری', icon: '🏆' },
    { name: 'اثرگذاری بر جهان', icon: '🌍' },
    { name: 'سلامتی و سرزندگی', icon: '🌱' },
    { name: 'آرامش و تعادل روحی', icon: '🕊️' },
  ];

  const handleToggleValue = (valName: string) => {
    let updated: string[];
    if (selectedValues.includes(valName)) {
      updated = selectedValues.filter((v) => v !== valName);
    } else {
      if (selectedValues.length >= 3) {
        // Replace the oldest
        updated = [...selectedValues.slice(1), valName];
      } else {
        updated = [...selectedValues, valName];
      }
    }
    setSelectedValues(updated);
    onUpdateProgress((prev) => ({
      ...prev,
      coreValues: updated,
      foundationPillars: updated,
    }));

    if (updated.length === 3) {
      soundEngine.playChime(880); // Triple pillar lock chime
    } else {
      soundEngine.playTick();
    }
  };

  const isComplete = selectedValues.length === 3;

  return (
    <div className="w-full flex flex-col items-center justify-center relative py-2">
      {/* Cinematic Typography Banner */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-200 font-extrabold text-xs tracking-wide text-center"
      >
        «ارزش‌های تو، ستون‌های مسیر تو هستند»
      </motion.div>

      {/* Building Foundation Frame Container */}
      <div className="relative w-full max-w-[340px] rounded-2xl overflow-hidden bg-[#030612] border border-amber-500/30 p-3 shadow-2xl">
        {/* The Architectural Foundation Stage */}
        <div className="relative h-[185px] w-full rounded-xl overflow-hidden bg-gradient-to-b from-[#060a1f] via-[#040816] to-[#02040b] flex flex-col items-center justify-between p-2">
          {/* Temple Pediment / Ceiling Structure supported by pillars */}
          <div className="w-full flex flex-col items-center relative z-10 pt-1">
            <div
              className={`w-4/5 h-3.5 rounded-t-lg transition-all duration-700 flex items-center justify-center border ${
                isComplete
                  ? 'bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 border-yellow-300 shadow-[0_0_20px_rgba(245,158,11,0.5)]'
                  : 'bg-slate-800 border-slate-700 opacity-60'
              }`}
            >
              <span className="text-[8px] font-black text-black uppercase tracking-widest">
                عمارت اهداف استوار (The Citadel)
              </span>
            </div>
            <div
              className={`w-[90%] h-2 transition-all duration-700 ${
                isComplete ? 'bg-amber-500/80' : 'bg-slate-800/80'
              }`}
            />
          </div>

          {/* 3 Pillars in Action */}
          <div className="w-full flex items-end justify-around px-2 relative z-10 h-[105px]">
            {[0, 1, 2].map((idx) => {
              const val = selectedValues[idx];
              return (
                <div key={idx} className="flex flex-col items-center h-full justify-end w-[28%]">
                  {val ? (
                    <motion.div
                      initial={{ scaleY: 0, opacity: 0 }}
                      animate={{ scaleY: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-full rounded-t-md bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 border-x border-t border-amber-200 p-1 flex flex-col items-center justify-between shadow-[0_0_15px_rgba(245,158,11,0.3)] h-full"
                    >
                      <div className="w-full h-1 bg-amber-200 rounded-xs mb-1" />
                      <div className="text-center my-auto">
                        <Shield className="w-4 h-4 text-black mx-auto mb-0.5" />
                        <span className="text-[9px] font-black text-black leading-tight block truncate">
                          {val.split(' ')[0]}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-amber-800/60 rounded-xs" />
                    </motion.div>
                  ) : (
                    <div className="w-full h-full rounded-t-md border-2 border-dashed border-slate-700 bg-slate-900/30 flex flex-col items-center justify-center text-slate-600">
                      <span className="text-xs">+</span>
                      <span className="text-[7px]">ستون {idx + 1}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bedrock Foundation Base (Stone Base) */}
          <div className="w-full relative z-10">
            <div
              className={`w-full h-4 rounded-b-md transition-all duration-700 flex items-center justify-center border-t ${
                isComplete
                  ? 'bg-stone-900 border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                  : 'bg-stone-950 border-stone-800'
              }`}
            >
              <span className="text-[8px] text-amber-200/90 font-bold">
                {isComplete ? 'شالوده شکست‌ناپذیر و مستحکم شد' : 'سه ستون را در پی ساختمان مستقر کنید'}
              </span>
            </div>
          </div>
        </div>

        {/* Floating Values Selection Grid */}
        <div className="mt-3 text-right">
          <div className="flex items-center justify-between text-[11px] font-bold text-amber-300 mb-1.5">
            <span>سه ارزش بنیادین خود را انتخاب کن:</span>
            <span className="text-slate-400 text-[10px]">
              ({selectedValues.length} از ۳ ستون برگزیده)
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {availableValues.map((item) => {
              const isSelected = selectedValues.includes(item.name);
              return (
                <button
                  key={item.name}
                  onClick={() => handleToggleValue(item.name)}
                  className={`p-2 rounded-lg border text-right transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500/25 border-amber-400 text-amber-100 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] truncate max-w-[110px]">{item.name}</span>
                  <span className="text-xs">{item.icon}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
