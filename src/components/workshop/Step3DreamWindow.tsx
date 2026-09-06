import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowLeft, ArrowRight, CheckCircle2, Eye, Sun, Home, Briefcase, Heart, Smile } from 'lucide-react';
import { UserProgress } from '../../types';
import { soundEngine } from '../../utils/audio';

interface Step3DreamWindowProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onComplete: () => void;
}

export const Step3DreamWindow: React.FC<Step3DreamWindowProps> = ({
  progress,
  onUpdateProgress,
  onComplete,
}) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  const [answers, setAnswers] = useState({
    location: progress.futureVisionWorld?.location || 'یک خانه ویلایی مدرن و پرنور نزدیک طبیعت سرسبز با نسیم خنک کوهستانی',
    occupation: progress.futureVisionWorld?.occupation || 'خلق محصولات تاثیرگذار دیجیتال، آموزش انسان‌ها و مدیریت سیستم‌های خودمختار',
    companion: progress.futureVisionWorld?.companion || 'همسر وفادار و خردمند، فرزندان شاد، همراهان عمیق و مربیان الهام‌بخش',
    feeling: progress.futureVisionWorld?.feeling || 'آرامش عمیق درون، قطعیت نسبت به مسیر، افتخار به بهای پرداخته‌شده و شعف بی‌پایان',
  });

  const questions = [
    {
      key: 'location' as const,
      q: 'کجا زندگی می‌کنی؟',
      hint: 'طبیعت، شهر، معماری خانه، نور آفتاب صبحگاهی، صداهایی که می‌شنوی...',
      icon: Home,
      color: '#38bdf8',
    },
    {
      key: 'occupation' as const,
      q: 'چه کاری انجام می‌دهی؟',
      hint: 'چه کسب‌وکار یا رسالتی را رهبری می‌کنی؟ چه مسئله‌ای از جهان را حل کرده‌ای؟',
      icon: Briefcase,
      color: '#fbbf24',
    },
    {
      key: 'companion' as const,
      q: 'چه کسی کنار توست؟',
      hint: 'چه کسانی بر سر میز شام تو می‌نشینند؟ پیوندهای عاطفی و صمیمانه تو با چه افرادی است؟',
      icon: Heart,
      color: '#f43f5e',
    },
    {
      key: 'feeling' as const,
      q: 'چه احساسی در ژرفای قلبت داری؟',
      hint: 'وقتی صبح چشمانت را باز می‌کنی، چه ارتعاشی در رگ‌هایت جاری است؟ آرامش، غرور، رهایی؟',
      icon: Smile,
      color: '#34d399',
    },
  ];

  const handleTextChange = (key: keyof typeof answers, val: string) => {
    setAnswers((prev) => ({ ...prev, [key]: val }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      soundEngine.playChime(784); // G5
    } else {
      handleFinalizeDream();
    }
  };

  const handleFinalizeDream = () => {
    onUpdateProgress((prev) => ({
      ...prev,
      futureVisionWorld: answers,
      fiveYearVision: {
        ...prev.fiveYearVision,
        mind: answers.feeling,
        career: answers.occupation,
        wealth: answers.location,
        relationships: answers.companion,
      },
    }));
    soundEngine.playChime(1046.5);
    onComplete();
  };

  const activeQ = questions[currentQuestionIdx];
  const allFilled = Object.values(answers).every(
    (v) => typeof v === 'string' && v.trim().length > 3
  );

  // Dynamic visual elements unlocked in the futuristic window
  const hasNature = answers.location.length > 5;
  const hasWork = answers.occupation.length > 5;
  const hasLovedOnes = answers.companion.length > 5;
  const hasRadiance = answers.feeling.length > 5;

  return (
    <div className="space-y-6 text-right">
      {/* Title & Vision Frame */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300">
            گام سوم کارگاه: پنجره آینده (خلق رویای نامحدود ۵ ساله)
          </span>
          <span className="text-xs font-mono text-amber-400">
            پرسش {currentQuestionIdx + 1} از ۴
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          از قاب پنجره هوشمند: ۵ سال دیگر چه جهانی ساخته‌ای؟
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          ذهن ناخودآگاه فرقی بین واقعیت و تصویر بسیار شفاف قائل نیست. تمام قیدوبندها و کمبودهای امروز را پشت در بگذار و شفاف‌ترین سناریوی ممکن را ترسیم کن.
        </p>
      </div>

      {/* Futuristic Panoramic Window Visual */}
      <div className="relative w-full h-[220px] sm:h-[260px] rounded-3xl overflow-hidden bg-slate-950 border-2 border-sky-500/40 shadow-2xl p-4 flex items-center justify-center">
        {/* Dynamic Vector Sky that reacts to answers */}
        <svg viewBox="0 0 400 200" className="w-full h-full absolute inset-0">
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0c132c" />
              <stop offset="40%" stopColor="#251239" />
              <stop offset="80%" stopColor={hasRadiance ? '#b45309' : '#1e1b4b'} />
              <stop offset="100%" stopColor={hasRadiance ? '#f59e0b' : '#0f172a'} />
            </linearGradient>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Sky background */}
          <rect width="400" height="200" fill="url(#skyGrad)" />

          {/* Golden Sunrise (Feeling) */}
          {hasRadiance && (
            <circle cx="200" cy="90" r="45" fill="url(#sunGlow)" className="animate-pulse" />
          )}

          {/* Mountains & Nature Trees (Location) */}
          {hasNature && (
            <>
              {/* Distant Mountains */}
              <polygon points="40,160 110,90 190,160" fill="#431407" opacity="0.8" />
              <polygon points="140,160 230,80 320,160" fill="#2e1065" opacity="0.8" />
              {/* Lush foreground rolling hills & trees */}
              <path d="M 0 150 Q 100 130 200 145 T 400 150 L 400 200 L 0 200 Z" fill="#14532d" />
              <circle cx="80" cy="140" r="14" fill="#16a34a" />
              <circle cx="95" cy="145" r="11" fill="#15803d" />
              <circle cx="320" cy="142" r="15" fill="#16a34a" />
              <circle cx="335" cy="146" r="10" fill="#15803d" />
            </>
          )}

          {/* Modern Workspace / Tech Architecture (Occupation) */}
          {hasWork && (
            <g transform="translate(145, 110)">
              <rect x="0" y="0" width="55" height="40" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
              {/* Glass windows */}
              <rect x="5" y="6" width="12" height="12" rx="1" fill="#38bdf8" opacity="0.7" />
              <rect x="22" y="6" width="12" height="12" rx="1" fill="#38bdf8" opacity="0.7" />
              <rect x="38" y="6" width="12" height="12" rx="1" fill="#38bdf8" opacity="0.7" />
              <rect x="5" y="22" width="12" height="12" rx="1" fill="#facc15" opacity="0.8" />
              <rect x="22" y="22" width="12" height="12" rx="1" fill="#38bdf8" opacity="0.7" />
              <rect x="38" y="22" width="12" height="12" rx="1" fill="#facc15" opacity="0.8" />
            </g>
          )}

          {/* Silhouettes of Loved Ones / Companions (Companion) */}
          {hasLovedOnes && (
            <g transform="translate(230, 130)">
              {/* Person 1 */}
              <circle cx="10" cy="0" r="4" fill="#fef08a" />
              <path d="M 5 6 L 15 6 L 16 22 L 4 22 Z" fill="#fef08a" />
              {/* Person 2 (holding hands) */}
              <circle cx="26" cy="2" r="3.5" fill="#fef08a" />
              <path d="M 21 7 L 31 7 L 32 22 L 20 22 Z" fill="#fef08a" />
              {/* Little child or pet */}
              <circle cx="39" cy="10" r="2.5" fill="#fef08a" />
              <path d="M 36 13 L 42 13 L 43 22 L 35 22 Z" fill="#fef08a" />
            </g>
          )}

          {/* Futuristic Window HUD Frame Overlay */}
          <rect x="2" y="2" width="396" height="196" rx="18" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.4" />
          <line x1="20" y1="20" x2="60" y2="20" stroke="#38bdf8" strokeWidth="2" />
          <line x1="20" y1="20" x2="20" y2="60" stroke="#38bdf8" strokeWidth="2" />
          <line x1="380" y1="180" x2="340" y2="180" stroke="#38bdf8" strokeWidth="2" />
          <line x1="380" y1="180" x2="380" y2="140" stroke="#38bdf8" strokeWidth="2" />
          <text x="375" y="30" fill="#38bdf8" fontSize="8" textAnchor="end" className="font-mono">
            افق زمانی: ۵ سال آینده (2031)
          </text>
        </svg>

        {/* Floating Active Element Chips in Window */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div className="flex gap-1.5">
            {hasNature && <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-[10px]">محیط سبز و آرام</span>}
            {hasWork && <span className="px-2 py-0.5 rounded-full bg-sky-950/80 border border-sky-500/50 text-sky-300 text-[10px]">سیستم و رسالت</span>}
            {hasLovedOnes && <span className="px-2 py-0.5 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-300 text-[10px]">عزیزان و یاران</span>}
          </div>
          {hasRadiance && <span className="px-2.5 py-0.5 rounded-full bg-amber-500/30 text-amber-200 border border-amber-400 text-[10px] font-bold">خورشید آرامش</span>}
        </div>
      </div>

      {/* Interactive Step-by-Step Question Interface */}
      <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-700/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <activeQ.icon className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-black text-white">
              {activeQ.q}
            </h3>
          </div>
          <div className="flex gap-1">
            {questions.map((q, i) => (
              <button
                key={q.key}
                onClick={() => setCurrentQuestionIdx(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentQuestionIdx === i
                    ? 'bg-sky-400 scale-125'
                    : answers[q.key].length > 3
                    ? 'bg-emerald-400'
                    : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-400">
          {activeQ.hint}
        </p>

        <textarea
          rows={3}
          value={answers[activeQ.key]}
          onChange={(e) => handleTextChange(activeQ.key, e.target.value)}
          placeholder="تصویر ۵ سال آینده خود را با جزئیات حسّی بنویس..."
          className="w-full bg-slate-950 border border-slate-700 focus:border-sky-400 rounded-2xl p-3.5 text-xs sm:text-sm text-slate-100 outline-none leading-relaxed"
        />

        <div className="flex items-center justify-between pt-2">
          {currentQuestionIdx > 0 ? (
            <button
              onClick={() => setCurrentQuestionIdx((p) => p - 1)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs hover:bg-slate-700 flex items-center gap-1.5"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>پرسش قبلی</span>
            </button>
          ) : <div />}

          <button
            onClick={handleNextQuestion}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg"
          >
            <span>{currentQuestionIdx === questions.length - 1 ? 'تثبیت پنجره رویا' : 'پرسش بعدی'}</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Completion Button */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          {allFilled
            ? 'تصویر ۵ ساله پنجره آینده با موفقیت تجلی یافت.'
            : 'پاسخ‌های چهارگانه پنجره را کامل کن.'}
        </span>
        <button
          disabled={!allFilled}
          onClick={handleFinalizeDream}
          className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
            allFilled
              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>تثبیت رویا و رفتن به فیلتر کهن‌الگو</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
