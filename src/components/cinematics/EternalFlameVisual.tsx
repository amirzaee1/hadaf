import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Flame, Award, CheckCircle2, Sparkles, Sun, ShieldCheck } from 'lucide-react';
import { UserProgress } from '../../types';
import { soundEngine } from '../../utils/audio';

interface EternalFlameVisualProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
}

export const EternalFlameVisual: React.FC<EternalFlameVisualProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [signedName, setSignedName] = useState<string>(progress.userSignatureName || '');
  const isSealed = Boolean(progress.userSignatureName && progress.covenantSealDate);

  const handleSealCovenant = () => {
    if (!signedName.trim()) return;
    const nowFa = new Date().toLocaleDateString('fa-IR');
    onUpdateProgress((prev) => ({
      ...prev,
      userSignatureName: signedName.trim(),
      covenantSealDate: nowFa,
      initialCovenantSigned: true,
    }));
    soundEngine.playChime(1046.5); // Majestic triumph sound
  };

  return (
    <div className="w-full flex flex-col items-center justify-center relative py-2">
      {/* Sacred Seal Typography Banner */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/25 via-yellow-500/15 to-amber-500/25 border border-amber-400/50 text-amber-200 font-black text-xs tracking-wide text-center shadow-[0_0_25px_rgba(245,158,11,0.3)]"
      >
        «میثاق ابدی: شعله‌ای که هرگز خاموش نخواهد شد»
      </motion.div>

      {/* Altar Container Frame */}
      <div className="relative w-full max-w-[340px] rounded-2xl overflow-hidden bg-[#030612] border border-amber-500/40 p-3 shadow-2xl">
        {/* Summit Altar Viewport */}
        <div className="relative h-[190px] w-full rounded-xl overflow-hidden bg-gradient-to-b from-[#0a0502] via-[#1a0e05] to-[#050302] flex flex-col items-center justify-center">
          {/* Ambient Rising Embers Particles */}
          <div className="absolute inset-0 bg-radial from-amber-500/20 via-transparent to-transparent pointer-events-none" />

          {/* The Sacred Altar Pedestal & Eternal Flame */}
          <div className="relative z-10 flex flex-col items-center">
            {/* The Eternal Flame */}
            <div className="relative mb-1">
              <motion.div
                animate={{ scale: [1, 1.12, 1], y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="w-16 h-16 rounded-full bg-amber-500/30 blur-md absolute -inset-1"
              />
              <Flame className="w-14 h-14 text-amber-400 fill-amber-300 drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]" />
            </div>

            {/* Altar Stone Bowl */}
            <div className="w-24 h-4 rounded-b-xl bg-gradient-to-r from-stone-800 via-amber-900 to-stone-800 border-t border-amber-500 shadow-lg" />
            <div className="w-16 h-6 bg-stone-900 border-x border-stone-700" />
            <div className="w-32 h-3 bg-stone-950 rounded-md border border-stone-800" />
          </div>

          {/* Royal Seal Watermark */}
          {isSealed && (
            <motion.div
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-3 left-3 bg-amber-500/20 border-2 border-amber-400 p-2 rounded-full shadow-[0_0_25px_rgba(245,158,11,0.5)] rotate-12 flex flex-col items-center justify-center pointer-events-none"
            >
              <Award className="w-6 h-6 text-amber-300" />
              <span className="text-[7px] font-black text-amber-200">مهر جاودان</span>
            </motion.div>
          )}

          {/* Daily 4-Gate Ritual Compass at Bottom */}
          <div className="absolute bottom-1 w-full px-3 flex justify-between text-[8px] text-amber-200/70">
            <span>🌅 سحرگاه: تجسم</span>
            <span>☀️ نیمروز: اقدام اتمی</span>
            <span>🌇 غروب: پالایش</span>
            <span>🌙 شبانگاه: شکرگزاری</span>
          </div>
        </div>

        {/* Sacred Covenant Inscription */}
        <div className="mt-3 text-right">
          <div className="text-[11px] font-bold text-amber-300 mb-1 flex items-center justify-between">
            <span>عهدنامه رسمی و امضای معنوی:</span>
            {isSealed && (
              <span className="text-emerald-400 text-[9px] flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3 h-3" />
                تثبیت‌شده در {progress.covenantSealDate}
              </span>
            )}
          </div>
          <div className="flex gap-1.5">
            <input
              type="text"
              placeholder="نام و نام خانوادگی تو برای مهر..."
              value={signedName}
              onChange={(e) => setSignedName(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-amber-500/40 text-xs text-amber-100 font-bold outline-none focus:border-amber-400"
            />
            <button
              onClick={handleSealCovenant}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-black text-xs shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.4)] flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isSealed ? 'تجدید میثاق' : 'مهر نهایی عهد'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
