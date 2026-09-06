import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Flame,
  Compass,
  Eye,
  Sliders,
  CheckCircle2,
  ArrowDown,
  Shield,
  Zap,
  RotateCcw,
  Feather
} from 'lucide-react';
import { ChapterData, UserProgress } from '../types';
import { soundEngine } from '../utils/audio';
import { getChapterTheme } from '../utils/chapterTheme';

import { BrokenCompassVisual } from './cinematics/BrokenCompassVisual';
import { CrossroadsVisual } from './cinematics/CrossroadsVisual';
import { LighthouseVisual } from './cinematics/LighthouseVisual';
import { ConstellationVisual } from './cinematics/ConstellationVisual';
import { CityDoorsVisual } from './cinematics/CityDoorsVisual';
import { CloudToRealityVisual } from './cinematics/CloudToRealityVisual';
import { FourWorldsVisual } from './cinematics/FourWorldsVisual';
import { ValuesFoundationVisual } from './cinematics/ValuesFoundationVisual';
import { GlassRoomVisual } from './cinematics/GlassRoomVisual';
import { WorkshopStationVisual } from './cinematics/WorkshopStationVisual';
import { EternalFlameVisual } from './cinematics/EternalFlameVisual';

interface MobileCinematicVisualProps {
  chapter: ChapterData;
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
}

export const MobileCinematicVisual: React.FC<MobileCinematicVisualProps> = ({
  chapter,
  progress,
  onUpdateProgress,
}) => {
  const theme = getChapterTheme(chapter.id);
  // CHAPTER 1 LOCAL STATES
  const [ch1LightIntensity, setCh1LightIntensity] = useState<number>(0.3);

  // CHAPTER 2 LOCAL STATES: Mirror clarity & deep why
  const [mirrorClarity, setMirrorClarity] = useState<number>(progress.deepWhy ? 95 : 35);
  const [localDeepWhy, setLocalDeepWhy] = useState<string>(progress.deepWhy || '');

  // CHAPTER 3 LOCAL STATES: Pain stones
  const defaultStones = [
    'درجا زدن و تکرار روزمرگی بی‌حاصل',
    'حسرت هدر رفتن استعدادها و زمان',
    'وابستگی مالی و محدودیت انتخاب‌ها',
    'فشار قضاوت و مقایسه با دیگران',
  ];
  const [painStones, setPainStones] = useState<string[]>(
    progress.painStones && progress.painStones.length > 0
      ? progress.painStones
      : defaultStones
  );
  const [isTransmuted, setIsTransmuted] = useState<boolean>(
    progress.transformedFuel || false
  );

  // Sync with prop updates
  useEffect(() => {
    if (progress.deepWhy && progress.deepWhy !== localDeepWhy) {
      setLocalDeepWhy(progress.deepWhy);
      setMirrorClarity(95);
    }
  }, [progress.deepWhy]);

  const handleSaveDeepWhy = (text: string) => {
    setLocalDeepWhy(text);
    onUpdateProgress((prev) => ({
      ...prev,
      deepWhy: text,
      smartGoal: {
        ...prev.smartGoal,
        burningWhy: text || prev.smartGoal.burningWhy,
      },
    }));
    soundEngine.playChime(784); // G5 note
  };

  const handleTransmuteStones = () => {
    const nextState = !isTransmuted;
    setIsTransmuted(nextState);
    onUpdateProgress((prev) => ({
      ...prev,
      transformedFuel: nextState,
      painStones: painStones,
    }));
    if (nextState) {
      soundEngine.playChime(880); // A5 high note of victory
    } else {
      soundEngine.playTick();
    }
  };

  return (
    <div className="relative my-4 w-full select-none">
      {/* Visual Frame Container */}
      <div
        className="relative flex min-h-[310px] w-full flex-col items-center justify-center overflow-hidden rounded-[24px] border p-4 text-center shadow-[0_14px_40px_rgba(0,0,0,0.58)]"
        style={{ borderColor: `${theme.accent}45`, background: `linear-gradient(180deg, ${theme.surface}, #091124 45%, #050811)` }}
      >
        
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 12%, ${theme.glow}, transparent 48%)` }} />

        {/* ---------------------------------------------------- */}
        {/* CHAPTER 1 VISUAL: شروع سفر - تاریکی تا راه نورانی     */}
        {/* ---------------------------------------------------- */}
        {chapter.id === 1 && (
          <div className="w-full flex flex-col items-center justify-center relative py-4">
            {/* The Path Canvas / SVG */}
            <div className="relative w-full max-w-[320px] h-[220px] flex items-center justify-center overflow-hidden rounded-2xl bg-[#03060f]/90 border border-slate-800">
              {/* Darkness overlay with dynamic light reveal */}
              <div
                className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 30%, rgba(245, 158, 11, ${ch1LightIntensity * 0.7}) 0%, rgba(245, 158, 11, ${ch1LightIntensity * 0.2}) 35%, rgba(3, 6, 15, 0.98) 75%)`,
                }}
              />

              {/* Glowing horizon & stars */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 h-12 bg-amber-400/20 rounded-full blur-2xl" />

              {/* Perspective Road SVG */}
              <svg
                viewBox="0 0 200 160"
                className="w-full h-full relative z-10 transition-all duration-700"
                style={{
                  filter: `drop-shadow(0 0 ${ch1LightIntensity * 18}px rgba(245, 158, 11, 0.6))`,
                }}
              >
                {/* Distant Sun / Singularity of light */}
                <circle
                  cx="100"
                  cy="40"
                  r={3 + ch1LightIntensity * 6}
                  fill="#fef08a"
                  className="animate-pulse"
                />

                {/* Horizon Line */}
                <line
                  x1="10"
                  y1="45"
                  x2="190"
                  y2="45"
                  stroke="#334155"
                  strokeWidth="0.5"
                  strokeDasharray="2 2"
                />

                {/* Road Margins */}
                <polygon
                  points="96,43 104,43 170,160 30,160"
                  fill="url(#roadGrad)"
                  opacity={0.3 + ch1LightIntensity * 0.7}
                />

                {/* Golden Center Dash line */}
                <line
                  x1="100"
                  y1="45"
                  x2="100"
                  y2="160"
                  stroke="#fbbf24"
                  strokeWidth={1 + ch1LightIntensity * 1.5}
                  strokeDasharray="6 4"
                  opacity={0.4 + ch1LightIntensity * 0.6}
                />

                {/* Silhouetted Traveler Standing at the Beginning */}
                <g
                  transform="translate(100, 115) scale(0.65)"
                  opacity={0.2 + ch1LightIntensity * 0.8}
                >
                  {/* Traveler Head */}
                  <circle cx="0" cy="-28" r="5" fill="#fef08a" />
                  {/* Body / Cloak */}
                  <path
                    d="M -6,-22 C -8,-10 -12,8 -14,14 L 14,14 C 12,8 8,-10 6,-22 Z"
                    fill="#1e293b"
                    stroke="#fbbf24"
                    strokeWidth="0.75"
                  />
                  {/* Walking Staff of Wisdom */}
                  <line
                    x1="11"
                    y1="-32"
                    x2="11"
                    y2="14"
                    stroke="#f59e0b"
                    strokeWidth="1.2"
                  />
                  {/* Light aura around traveler */}
                  <circle
                    cx="0"
                    cy="-14"
                    r="22"
                    fill="none"
                    stroke="rgba(245,158,11,0.25)"
                    strokeWidth="0.8"
                    strokeDasharray="3 3"
                  />
                </g>

                <defs>
                  <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d97706" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Floating Motes of Light */}
              <div className="absolute bottom-2 left-6 w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
              <div className="absolute top-14 right-8 w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
            </div>

            {/* Interactive Light Expander Slider for mobile touch */}
            <div className="w-full max-w-[280px] mt-4 flex flex-col items-center gap-2">
              <div className="flex justify-between w-full text-[11px] text-amber-200/80 font-medium">
                <span>تاریکی غفلت</span>
                <span className="text-amber-400 font-bold">
                  {ch1LightIntensity > 0.7
                    ? 'جاده روشن آشکار شد'
                    : 'جرقه در حال گسترش...'}
                </span>
                <span>روشنایی مسیر</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={ch1LightIntensity}
                onChange={(e) => {
                  setCh1LightIntensity(parseFloat(e.target.value));
                  soundEngine.playTick();
                }}
                className="w-full h-2 rounded-lg bg-slate-800 accent-amber-400 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400 font-light mt-1">
                برای گسترش نور در تاریکی، انگشتت را به سمت راست بکش
              </p>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* CHAPTER 2 VISUAL: چرا اهداف شکست می‌خورند؟ قطب‌نمای شکسته */}
        {/* ---------------------------------------------------- */}
        {chapter.id === 2 && (
          <div className="w-full flex flex-col items-center justify-center relative py-1">
            <BrokenCompassVisual
              progress={progress}
              onUpdateProgress={onUpdateProgress}
            />

            {/* Collapsible / Expandable Mirror of Truth for Deep Why */}
            <div className="w-full max-w-[340px] mt-3">
              <div className="rounded-2xl overflow-hidden border border-amber-500/30 bg-[#070b17] p-3">
                <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-800 text-xs">
                  <span className="text-slate-400">خود کنونی</span>
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    آینه حقیقت و چرایی عمیق
                  </span>
                  <span className="text-amber-300">خود آینده (۵ سال بعد)</span>
                </div>

                {/* Mirror Polish Slider */}
                <div className="mt-2.5 px-1">
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>صیقل دادن آینه و رفع غبار</span>
                    <span className="text-amber-400 font-mono">{mirrorClarity}٪ شفافیت</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={mirrorClarity}
                    onChange={(e) => {
                      setMirrorClarity(parseInt(e.target.value));
                      soundEngine.playTick();
                    }}
                    className="w-full h-1.5 rounded-lg bg-slate-800 accent-amber-400 cursor-pointer"
                  />
                </div>

                {/* Sacred Question & Deep Why Inscription Box */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-right">
                  <label className="block text-xs font-bold text-amber-300 mb-1.5">
                    «چرا این هدف برای تو مهم است؟»
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={localDeepWhy}
                      onChange={(e) => setLocalDeepWhy(e.target.value)}
                      placeholder="چرایی سوزان درونت را اینجا حک کن..."
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-900/90 border border-amber-500/40 text-xs text-amber-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    <button
                      onClick={() => handleSaveDeepWhy(localDeepWhy)}
                      className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shrink-0 transition-all flex items-center gap-1 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                    >
                      <Feather className="w-3.5 h-3.5" />
                      <span>ثبت چرایی</span>
                    </button>
                  </div>
                  {progress.deepWhy && (
                    <p className="mt-2 text-[11px] text-amber-300/90 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                      ✓ چرایی ثبت شده در نقشه سفر: «{progress.deepWhy}»
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* CHAPTER 3: خطر اهداف قرضی - چهارراه کیهانی اهداف اصیل */}
        {/* ---------------------------------------------------- */}
        {chapter.id === 3 && (
          <CrossroadsVisual
            progress={progress}
            onUpdateProgress={onUpdateProgress}
          />
        )}

        {/* ---------------------------------------------------- */}
        {/* CHAPTER 4: فانوس دریایی؛ تصویرسازی هدف و آرامش دریا   */}
        {/* ---------------------------------------------------- */}
        {chapter.id === 4 && (
          <LighthouseVisual
            progress={progress}
            onUpdateProgress={onUpdateProgress}
          />
        )}

        {/* ---------------------------------------------------- */}
        {/* CHAPTER 5: قانون خیر پنهان و اتصال نقطه‌ها            */}
        {/* ---------------------------------------------------- */}
        {chapter.id === 5 && (
          <ConstellationVisual
            progress={progress}
            onUpdateProgress={onUpdateProgress}
          />
        )}

        {/* ---------------------------------------------------- */}
        {/* CHAPTER 6: داستان طناب نجات و فرصت‌های معمولی         */}
        {/* ---------------------------------------------------- */}
        {chapter.id === 6 && (
          <CityDoorsVisual
            progress={progress}
            onUpdateProgress={onUpdateProgress}
          />
        )}

        {/* ---------------------------------------------------- */}
        {/* CHAPTER 7: سه نکته از علم NLP - فعال‌سازی ۰.۲۵٪ به ۱۰۰٪*/}
        {/* ---------------------------------------------------- */}
        {chapter.id === 7 && (
          <div className="w-full flex flex-col items-center justify-center relative py-2">
            <div className="relative w-full max-w-[330px] rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#070b17] p-3 text-right">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                <span className="text-cyan-400 font-bold">مدار عصبی باور و اقدام (NLP)</span>
                <span className="text-slate-400">آستانه ۰.۲۵٪ تا ۱۰۰٪</span>
              </div>
              <div className="my-3 space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-200 flex items-center justify-between">
                  <span>۱. اگر ۰.۲۵٪ شدنی است:</span>
                  <span className="font-bold text-amber-300">۱۰۰٪ ممکن است</span>
                </div>
                <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-200 flex items-center justify-between">
                  <span>۲. اگر یک نفر توانسته:</span>
                  <span className="font-bold text-amber-300">دیگران هم می‌توانند</span>
                </div>
                <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-200 flex items-center justify-between">
                  <span>۳. کوتاه‌ترین راه موفقیت:</span>
                  <span className="font-bold text-amber-300">داشتن الگوی درست</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                موفقیت ساختار دارد، تصادفی نیست. وقتی چرخه یک‌بار اتفاق افتاد، کار بعدی فقط تکرار است.
              </p>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* CHAPTER 8: هدف یعنی چه؟ (۹۷٪ آرزو vs ۳٪ مکتوب)        */}
        {/* ---------------------------------------------------- */}
        {chapter.id === 8 && (
          <CloudToRealityVisual
            progress={progress}
            onUpdateProgress={onUpdateProgress}
          />
        )}

        {/* ---------------------------------------------------- */}
        {/* CHAPTER 9: شخصیت تو، موتور هدف تو (۴ رنگ روان)        */}
        {/* ---------------------------------------------------- */}
        {chapter.id === 9 && (
          <FourWorldsVisual
            progress={progress}
            onUpdateProgress={onUpdateProgress}
          />
        )}

        {/* ---------------------------------------------------- */}
        {/* CHAPTER 10: ارزش‌های بنیادین زندگی (تضاد درونی=توقف) */}
        {/* ---------------------------------------------------- */}
        {chapter.id === 10 && (
          <ValuesFoundationVisual
            progress={progress}
            onUpdateProgress={onUpdateProgress}
          />
        )}

        {/* ---------------------------------------------------- */}
        {/* CHAPTER 11: قانون مدارها و لیست انزجار                */}
        {/* ---------------------------------------------------- */}
        {chapter.id === 11 && (
          <div className="w-full flex flex-col items-center justify-center relative py-2">
            <div className="relative w-full max-w-[330px] rounded-2xl overflow-hidden border border-amber-500/30 bg-[#070b17] p-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                <span className="text-slate-400 font-medium">قانون مدارها و کوله انزجار</span>
                <span className="text-amber-400 font-bold">
                  {isTransmuted ? 'مدار خواسته‌ها فعال شد' : 'مدار ناخواسته‌ها'}
                </span>
              </div>

              {/* Stones Visual Container */}
              <div className="grid grid-cols-2 gap-2 my-3">
                {painStones.map((stone, idx) => (
                  <motion.div
                    key={idx}
                    layout
                    className={`p-2.5 rounded-xl border text-[11px] text-right transition-all duration-500 relative flex items-start gap-1.5 ${
                      isTransmuted
                        ? 'bg-amber-500/15 border-amber-400/60 text-amber-100 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                        : 'bg-slate-900/90 border-slate-700/80 text-slate-300'
                    }`}
                  >
                    {isTransmuted ? (
                      <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5 animate-pulse" />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-sm bg-slate-600 shrink-0 mt-1" />
                    )}
                    <span className="leading-snug">
                      {isTransmuted ? `نشانگر مدار خواسته: ${stone}` : stone}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Transmutation Action Button */}
              <button
                onClick={handleTransmuteStones}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all transform active:scale-95 ${
                  isTransmuted
                    ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                    : 'bg-gradient-to-r from-red-600/80 to-amber-600/80 hover:from-red-500 hover:to-amber-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>
                  {isTransmuted
                    ? 'جابه‌جایی به مدار خواسته‌ها ثبت شد'
                    : 'تبدیل لیست انزجار به سوخت صعود در مدار خواسته‌ها'}
                </span>
              </button>

              <p className="text-[10px] text-slate-400 text-center mt-2 leading-relaxed">
                {isTransmuted
                  ? 'تمرکز -> جهت -> نتیجه. با هدایت توجه به خواسته‌ها، رشد فعال شد.'
                  : 'با لمس دکمه بالا، انزجارها را به اهداف مثبت و مشخص تبدیل کن.'}
              </p>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* CHAPTER 12: نوشتن هدف و سه لیست ضروری ناپلئون هیل     */}
        {/* ---------------------------------------------------- */}
        {chapter.id === 12 && (
          <WorkshopStationVisual
            progress={progress}
            onUpdateProgress={onUpdateProgress}
          />
        )}

        {/* ---------------------------------------------------- */}
        {/* CHAPTER 13: قانون تکامل، سقف شیشه‌ای و سه اصل پایانی   */}
        {/* ---------------------------------------------------- */}
        {chapter.id === 13 && (
          <div className="w-full space-y-3">
            <GlassRoomVisual
              progress={progress}
              onUpdateProgress={onUpdateProgress}
            />
            <EternalFlameVisual
              progress={progress}
              onUpdateProgress={onUpdateProgress}
            />
          </div>
        )}

      </div>
    </div>
  );
};
