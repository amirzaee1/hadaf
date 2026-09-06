import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowLeft, ArrowRight, CheckCircle2, Shield, Calendar, Target, Ruler, Hammer, Link } from 'lucide-react';
import { UserProgress } from '../../types';
import { soundEngine } from '../../utils/audio';

interface Step5SmartBuilderProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onComplete: () => void;
}

export const Step5SmartBuilder: React.FC<Step5SmartBuilderProps> = ({
  progress,
  onUpdateProgress,
  onComplete,
}) => {
  const [smartStage, setSmartStage] = useState<'S' | 'M' | 'A' | 'R' | 'T' | 'RESULT'>('S');

  const [formData, setFormData] = useState({
    specific: progress.smartBuilding?.specific || progress.smartGoal?.specific || 'راه‌اندازی محصول نرم‌افزاری ابری با ۱۰,۰۰۰ کاربر فعال ماهانه و ثبت رسمی شرکت',
    measurable: progress.smartBuilding?.measurable || progress.smartGoal?.measurable || 'درآمد ناخالص ۵۰۰ میلیون تومان در ماه و امتیاز رضایت مشتریان بالای ۴.۸ از ۵',
    achievable: progress.smartBuilding?.achievable || progress.smartGoal?.achievable || 'منابع فعلی: تخصص فنی و پس‌انداز ۶ ماهه. مهارت مورد نیاز: مارکتینگ و جذب سرمایه',
    relevant: progress.smartBuilding?.relevant || progress.smartGoal?.relevant || 'این هدف مستقیماً ستون اول (آزادی و استقلال) و ستون دوم (رشد شخصی) را محقق می‌کند',
    timeBound: progress.smartBuilding?.timeBound || progress.smartGoal?.timeBound || '۳۱ شهریور ۱۴۰۵ (دقیقاً ۱۲ ماه دیگر) با نقاط عطف ۳ ماهه برای لانچ نسخه بتا',
    firstAction: progress.smartBuilding?.firstAction || 'نوشتن فهرست ۵ ویژگی کلیدی نسخه اولیه تا قبل از ساعت ۲۱ امشب',
  });

  const handleChange = (key: keyof typeof formData, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const stages: ('S' | 'M' | 'A' | 'R' | 'T')[] = ['S', 'M', 'A', 'R', 'T'];

  const handleNext = () => {
    soundEngine.playChime(750);
    const currentIdx = stages.indexOf(smartStage as any);
    if (currentIdx < stages.length - 1) {
      setSmartStage(stages[currentIdx + 1]);
    } else {
      setSmartStage('RESULT');
    }
  };

  const handleFinalize = () => {
    onUpdateProgress((prev) => ({
      ...prev,
      smartBuilding: {
        ...formData,
        isCompleted: true,
      },
      smartGoal: {
        ...prev.smartGoal,
        specific: formData.specific,
        measurable: formData.measurable,
        achievable: formData.achievable,
        relevant: formData.relevant,
        timeBound: formData.timeBound,
      },
    }));
    soundEngine.playChime(1046.5);
    onComplete();
  };

  // Building construction progress percentage
  const buildingHeightPercent =
    smartStage === 'S'
      ? 20
      : smartStage === 'M'
      ? 40
      : smartStage === 'A'
      ? 60
      : smartStage === 'R'
      ? 80
      : 100;

  return (
    <div className="space-y-6 text-right">
      {/* Title & Stage Indicator */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300">
            گام پنجم کارگاه: معماری هدف هوشمند (SMART Goal Builder)
          </span>
          <span className="text-xs font-mono text-amber-400">
            مرحله {smartStage} از SMART
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          تبدیل رویا به عمارت بتنی و نقشه مأموریت اجرایی
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          یک رویا بدون مشخصات مهندسی تنها یک توهم خوشایند است. با گذشتن از ۵ فیلتر SMART، این رویا را آجر به آجر مانند یک برج مستحکم بنا می‌کنیم.
        </p>
      </div>

      {/* Visual Metaphor: The Building Under Construction */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-[#060a17] via-[#091129] to-[#04060e] border border-sky-500/30 space-y-4">
        {/* Visual Building Frame */}
        <div className="relative h-44 sm:h-48 w-full rounded-2xl overflow-hidden bg-[#030612] border border-slate-800 flex items-center justify-center p-3">
          <svg viewBox="0 0 360 160" className="w-full h-full">
            {/* Grid blueprint background */}
            <defs>
              <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="360" height="160" fill="url(#gridPattern)" />

            {/* Construction Crane */}
            <line x1="280" y1="150" x2="280" y2="25" stroke="#f59e0b" strokeWidth="3" />
            <line x1="280" y1="30" x2="160" y2="30" stroke="#f59e0b" strokeWidth="2.5" />
            <line x1="280" y1="30" x2="320" y2="40" stroke="#f59e0b" strokeWidth="2" />
            <line x1="180" y1="30" x2="180" y2="55" stroke="#facc15" strokeWidth="1" strokeDasharray="2 2" />
            <rect x="175" y="55" width="10" height="8" fill="#fbbf24" />

            {/* Ground Foundation */}
            <rect x="60" y="145" width="200" height="12" rx="2" fill="#334155" />

            {/* The Constructed Skyscraper Layers */}
            {/* S Layer: Base Foundation */}
            <rect
              x="80"
              y="120"
              width="160"
              height="25"
              rx="2"
              fill={smartStage === 'S' ? '#38bdf8' : '#0284c7'}
              stroke="#e0f2fe"
              strokeWidth="1"
              opacity="0.9"
            />
            <text x="160" y="136" fill="#ffffff" fontSize="9" textAnchor="middle" className="font-bold">
              S: شفافیت مطلق (Specific)
            </text>

            {/* M Layer: Metrics Windows */}
            {(smartStage !== 'S' || buildingHeightPercent >= 40) && (
              <g>
                <rect x="90" y="95" width="140" height="25" rx="2" fill="#0369a1" stroke="#38bdf8" strokeWidth="1" />
                <circle cx="110" cy="107" r="4" fill="#fef08a" />
                <circle cx="160" cy="107" r="4" fill="#fef08a" />
                <circle cx="210" cy="107" r="4" fill="#fef08a" />
                <text x="160" y="110" fill="#ffffff" fontSize="8" textAnchor="middle" className="font-bold">
                  M: سنجش عددی (Measurable)
                </text>
              </g>
            )}

            {/* A Layer: Arch & Bridge */}
            {(buildingHeightPercent >= 60) && (
              <g>
                <rect x="100" y="70" width="120" height="25" rx="2" fill="#075985" stroke="#38bdf8" strokeWidth="1" />
                <text x="160" y="85" fill="#ffffff" fontSize="8" textAnchor="middle" className="font-bold">
                  A: دست‌یافتنی و مهارت (Achievable)
                </text>
              </g>
            )}

            {/* R Layer: Golden Beam to Core Values */}
            {(buildingHeightPercent >= 80) && (
              <g>
                <rect x="110" y="45" width="100" height="25" rx="2" fill="#d97706" stroke="#fbbf24" strokeWidth="1.5" />
                <text x="160" y="60" fill="#ffffff" fontSize="8" textAnchor="middle" className="font-bold">
                  R: پیوند با ستون‌های ارزش (Relevant)
                </text>
              </g>
            )}

            {/* T Layer: Pinnacle Clock & Spire */}
            {(buildingHeightPercent === 100) && (
              <g>
                <polygon points="160,10 135,45 185,45" fill="#f59e0b" stroke="#fef08a" strokeWidth="1.5" />
                <circle cx="160" cy="32" r="5" fill="#ffffff" />
                <line x1="160" y1="32" x2="160" y2="29" stroke="#000000" strokeWidth="1" />
                <line x1="160" y1="32" x2="162" y2="32" stroke="#000000" strokeWidth="1" />
                <text x="160" y="8" fill="#fef08a" fontSize="7" textAnchor="middle" className="font-black">
                  T: مهلت زمانی قاطع
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* 5 SMART Tab Headers */}
        <div className="flex items-center justify-between gap-1 p-1 bg-slate-950/80 rounded-2xl border border-slate-800">
          {[
            { id: 'S', title: '۱. شفاف', icon: Target },
            { id: 'M', title: '۲. سنجش‌پذیر', icon: Ruler },
            { id: 'A', title: '۳. دست‌یافتنی', icon: Hammer },
            { id: 'R', title: '۴. هم‌راستا', icon: Link },
            { id: 'T', title: '۵. زمان‌دار', icon: Calendar },
            { id: 'RESULT', title: '✦ کارت نهایی', icon: Sparkles },
          ].map((tab) => {
            const isCurrent = smartStage === tab.id;
            const IconComp = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setSmartStage(tab.id as any)}
                className={`flex-1 py-2 px-1 rounded-xl text-center transition-all text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1 ${
                  isCurrent
                    ? 'bg-sky-500 text-black shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{tab.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Content Per SMART Stage */}
      <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-700/80 space-y-4">
        {smartStage === 'S' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sky-300">
              <Target className="w-5 h-5" />
              <h3 className="text-base font-black text-white">
                S — شفافیت و وضوح کریستالی (Specific)
              </h3>
            </div>
            <p className="text-xs text-slate-300">
              تصویر محو را واضح کن. دقیقاً و بدون هیچ ابهامی چه می‌خواهی؟ از واژه‌های مبهم مانند «موفقیت»، «پول بیشتر» یا «حال بهتر» پرهیز کن.
            </p>
            <textarea
              rows={3}
              value={formData.specific}
              onChange={(e) => handleChange('specific', e.target.value)}
              placeholder="دقیقاً چه چیزی خلق، دریافت یا محقق خواهد شد؟"
              className="w-full bg-slate-950 border border-slate-700 focus:border-sky-400 rounded-xl p-3 text-xs sm:text-sm text-slate-100 outline-none"
            />
          </div>
        )}

        {smartStage === 'M' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-300">
              <Ruler className="w-5 h-5" />
              <h3 className="text-base font-black text-white">
                M — قابل اندازه‌گیری عددی (Measurable)
              </h3>
            </div>
            <p className="text-xs text-slate-300">
              چه عددی تابلوی کیلومترشمار پیروزی توست؟ مقدار، تعداد، درصد، فرکانس یا پایش پیشرفت را دقیق ثبت کن.
            </p>
            <textarea
              rows={3}
              value={formData.measurable}
              onChange={(e) => handleChange('measurable', e.target.value)}
              placeholder="شاخص‌های عددی و متریک‌های پیشرفت دقیق..."
              className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl p-3 text-xs sm:text-sm text-slate-100 outline-none"
            />
          </div>
        )}

        {smartStage === 'A' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-300">
              <Hammer className="w-5 h-5" />
              <h3 className="text-base font-black text-white">
                A — دست‌یافتنی با پل مهارت و منابع (Achievable)
              </h3>
            </div>
            <p className="text-xs text-slate-300">
              چگونه پلی از وضعیت فعلی به آن مقصد می‌زنی؟ منابع کنونی‌ات چیست، چه مهارت‌هایی باید بیاموزی و چه گام‌هایی را کنترل می‌کنی؟
            </p>
            <textarea
              rows={3}
              value={formData.achievable}
              onChange={(e) => handleChange('achievable', e.target.value)}
              placeholder="منابع فعلی + مهارت‌های لازم برای یادگیری..."
              className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-400 rounded-xl p-3 text-xs sm:text-sm text-slate-100 outline-none"
            />
          </div>
        )}

        {smartStage === 'R' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-300">
              <Link className="w-5 h-5" />
              <h3 className="text-base font-black text-white">
                R — هم‌راستا با ارزش‌ها و ارکان سه گانه (Relevant)
              </h3>
            </div>
            <p className="text-xs text-slate-300">
              چرا این هدف با عمق هویت و ارزش‌های بنیادین تو هماهنگ است؟ چگونه به سه ستون زرینی که برگزیده‌ای خدمت می‌کند؟
            </p>
            <textarea
              rows={3}
              value={formData.relevant}
              onChange={(e) => handleChange('relevant', e.target.value)}
              placeholder="ارتباط ناگسستنی این هدف با سه ستون ارزش‌های من..."
              className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl p-3 text-xs sm:text-sm text-slate-100 outline-none"
            />
          </div>
        )}

        {smartStage === 'T' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-rose-300">
              <Calendar className="w-5 h-5" />
              <h3 className="text-base font-black text-white">
                T — زمان‌بندی قاطع و اولین اقدام ملموس (Time-Bound)
              </h3>
            </div>
            <p className="text-xs text-slate-300">
              تاریخ پایان مأموریت کی است؟ و اولین اقدام بسیار کوچک (طی ۲۴ ساعت آینده) چیست؟
            </p>
            <div className="space-y-2">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  مهلت زمانی قطعی و مایلستون‌ها:
                </label>
                <input
                  type="text"
                  value={formData.timeBound}
                  onChange={(e) => handleChange('timeBound', e.target.value)}
                  placeholder="مثال: ۳۰ آذر ۱۴۰۵..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs sm:text-sm text-slate-100 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-amber-300 font-bold mb-1">
                  اولین اقدام غیرقابل مذاکره (قانون ۲ دقیقه):
                </label>
                <input
                  type="text"
                  value={formData.firstAction}
                  onChange={(e) => handleChange('firstAction', e.target.value)}
                  placeholder="مثال: ارسال پیام به مربی، ثبت‌نام در سامانه..."
                  className="w-full bg-slate-950 border border-amber-500/60 rounded-xl p-2.5 text-xs sm:text-sm text-amber-100 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {smartStage === 'RESULT' && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-950/60 via-slate-950 to-slate-950 border-2 border-sky-400 space-y-3">
            <div className="flex items-center justify-between border-b border-sky-500/30 pb-2">
              <span className="text-xs font-mono text-sky-300">کارت نهایی مأموریت هوشمند (Mission Card)</span>
              <span className="text-xs font-bold text-amber-400">تثبیت‌شده در معماری کارگاه</span>
            </div>

            <div className="space-y-2 text-right">
              <div>
                <span className="text-[10px] text-slate-400 block">عنوان هدف شفاف (S):</span>
                <p className="text-sm font-black text-white">{formData.specific}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-[10px] text-amber-300 font-bold block">متریک عددی (M):</span>
                  <p className="text-xs text-slate-200 mt-0.5">{formData.measurable}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-[10px] text-emerald-300 font-bold block">مهلت زمانی (T):</span>
                  <p className="text-xs text-slate-200 mt-0.5">{formData.timeBound}</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <span className="text-[10px] text-amber-300 font-bold block">اولین قدم فوری (First Domino):</span>
                <p className="text-xs text-amber-100 font-bold mt-0.5">{formData.firstAction}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          {smartStage !== 'S' && smartStage !== 'RESULT' ? (
            <button
              onClick={() => {
                const currentIdx = stages.indexOf(smartStage as any);
                setSmartStage(stages[currentIdx - 1]);
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs hover:bg-slate-700 flex items-center gap-1.5"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>مرحله قبل</span>
            </button>
          ) : <div />}

          {smartStage !== 'RESULT' ? (
            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg"
            >
              <span>مرحله بعد</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinalize}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold text-xs flex items-center gap-2 shadow-lg"
            >
              <span>تثبیت نهایی در کارگاه</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
