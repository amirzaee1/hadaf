import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Printer,
  Copy,
  Check,
  Download,
  Award,
  Sparkles,
  Flame,
  Target,
  Shield,
  Compass,
  Star,
  BookOpen,
} from 'lucide-react';
import { UserProgress } from '../types';
import { CHAPTERS } from '../data/chapters';

interface DossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
}

export const DossierModal: React.FC<DossierModalProps> = ({
  isOpen,
  onClose,
  progress,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const getDossierSummaryText = () => {
    return `
========================================
کتابچه جامع چشم‌انداز، هدف و رسالت شخصی
GOAL DREAM MASTER DOSSIER
========================================

نام متعهد: ${progress.userSignatureName || 'رهروی مسیر خودآگاهی'}
تاریخ مهر میثاق: ${progress.covenantSealDate || new Date().toLocaleDateString('fa-IR')}

۱. ارزش‌های بنیادین سه‌گانه:
${progress.coreValues.length ? progress.coreValues.map((v, i) => `  ${i + 1}. ${v}`).join('\n') : '  هنوز ثبت نشده است'}

۲. کهن‌الگوی روانی:
  ${progress.personalityArchetype || 'مشخص نشده'}

۳. باور توانمندساز نوین:
  ${progress.empoweringBelief || 'هنوز ثبت نشده است'}

۴. چشم‌انداز ۵ ساله پنج‌بعدی:
  - ذهن و تسلط درونی: ${progress.fiveYearVision.mind || '-'}
  - تندرستی و انرژی حیاتی: ${progress.fiveYearVision.health || '-'}
  - رسالت و حرفه: ${progress.fiveYearVision.career || '-'}
  - برکت و استقلال مالی: ${progress.fiveYearVision.wealth || '-'}
  - روابط و اثر ماندگار: ${progress.fiveYearVision.relationships || '-'}

۵. هدف هوشمند (SMART Goal):
  - هدف مشخص (S): ${progress.smartGoal.specific || '-'}
  - معیار سنجش (M): ${progress.smartGoal.measurable || '-'}
  - دست‌یافتنی بودن (A): ${progress.smartGoal.achievable || '-'}
  - اتصال به ارزش‌ها (R): ${progress.smartGoal.relevant || '-'}
  - زمان‌بندی دقیق (T): ${progress.smartGoal.timeBound || '-'}

۶. چرایی سوزان (The Burning WHY):
  ${progress.smartGoal.burningWhy || '-'}

۷. سیستم و آیین‌های روزانه:
  - آیین صبحگاهی: ${progress.dailyRituals.morningAction || '-'}
  - عادت ۲ دقیقه‌ای اتمی: ${progress.dailyRituals.twoMinuteRule || '-'}
  - گزاره هویت نوین: ${progress.dailyRituals.identityStatement || '-'}
========================================
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getDossierSummaryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(progress, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `GOAL_DREAM_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl bg-[#080d1e] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-auto print:border-none print:shadow-none print:bg-white print:text-black"
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/40 border-b border-amber-500/20 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-amber-100">
                کتابچه نهایی هدف و چشم‌انداز زندگی (Goal Dream Dossier)
              </h2>
              <p className="text-xs text-slate-400">
                خروجی منسجم و مهندسی‌شده کارگاه تحول فردی
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs flex items-center gap-1.5"
              title="کپی متن خلاصه"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'کپی شد' : 'کپی'}</span>
            </button>
            <button
              onClick={handleDownloadJSON}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs flex items-center gap-1.5"
              title="دانلود فایل داده"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">دانلود فایل</span>
            </button>
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-md"
              title="چاپ یا ذخیره به صورت PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">چاپ / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dossier Body Content */}
        <div className="p-6 sm:p-10 space-y-8 max-h-[80vh] overflow-y-auto print:max-h-none print:overflow-visible text-right">
          {/* Certificate Badge Banner */}
          <div className="text-center pb-6 border-b border-amber-500/20">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-serif uppercase tracking-widest mb-3">
              Official Life Architecture Blueprint
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-amber-200 gold-glow-text mb-2 print:text-black">
              طومار عهدنامه و معماری آینده
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 print:text-gray-600">
              متعهد: <strong className="text-amber-300 print:text-black">{progress.userSignatureName || 'رهروی بیدار'}</strong> | تاریخ تثبیت: {progress.covenantSealDate || new Date().toLocaleDateString('fa-IR')}
            </p>
          </div>

          {/* Grid of Key Outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Core Values */}
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 print:border-gray-300 print:bg-gray-50">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase mb-3">
                <Shield className="w-4 h-4" />
                <span>ارزش‌های بنیادین و خطوط قرمز روح:</span>
              </div>
              {progress.coreValues.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {progress.coreValues.map((v, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-200 border border-amber-400/40 text-xs font-semibold print:text-black print:border-gray-400"
                    >
                      {i + 1}. {v}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">در فصل ۹ مشخص خواهد شد.</p>
              )}
            </div>

            {/* 2. Transformed Belief */}
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 print:border-gray-300 print:bg-gray-50">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase mb-3">
                <Sparkles className="w-4 h-4" />
                <span>باور زرین و توانمندساز نوین:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium print:text-black">
                {progress.empoweringBelief || 'در فصل ۱۰ بازمهندسی خواهد شد.'}
              </p>
            </div>
          </div>

          {/* 3. The 5-Year Multi-Dimensional Vision */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 print:border-gray-300 print:bg-gray-50">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase mb-3">
              <Compass className="w-4 h-4" />
              <span>چشم‌انداز ۵ ساله در قلمروهای پنج‌گانه زندگی:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 print:bg-white print:border-gray-200">
                <strong className="text-amber-300 block mb-1 print:text-black">۱. ذهن و تسلط:</strong>
                <p className="text-slate-300 print:text-gray-700">{progress.fiveYearVision.mind || 'تعریف نشده'}</p>
              </div>
              <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 print:bg-white print:border-gray-200">
                <strong className="text-amber-300 block mb-1 print:text-black">۲. تندرستی و تن:</strong>
                <p className="text-slate-300 print:text-gray-700">{progress.fiveYearVision.health || 'تعریف نشده'}</p>
              </div>
              <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 print:bg-white print:border-gray-200">
                <strong className="text-amber-300 block mb-1 print:text-black">۳. رسالت و حرفه:</strong>
                <p className="text-slate-300 print:text-gray-700">{progress.fiveYearVision.career || 'تعریف نشده'}</p>
              </div>
              <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 print:bg-white print:border-gray-200">
                <strong className="text-amber-300 block mb-1 print:text-black">۴. برکت مالی:</strong>
                <p className="text-slate-300 print:text-gray-700">{progress.fiveYearVision.wealth || 'تعریف نشده'}</p>
              </div>
              <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 print:bg-white print:border-gray-200 sm:col-span-2 lg:col-span-2">
                <strong className="text-amber-300 block mb-1 print:text-black">۵. روابط و اثر ماندگار:</strong>
                <p className="text-slate-300 print:text-gray-700">{progress.fiveYearVision.relationships || 'تعریف نشده'}</p>
              </div>
            </div>
          </div>

          {/* 4. The Engineered SMART Goal */}
          <div className="p-6 rounded-xl bg-gradient-to-b from-amber-500/10 to-slate-900 border border-amber-500/30 print:border-gray-300 print:bg-white">
            <div className="flex items-center gap-2 text-amber-300 text-sm font-bold uppercase mb-4">
              <Target className="w-5 h-5 text-amber-400" />
              <span>هدف هوشمند امسال (SMART Goal Framework):</span>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                <span className="font-bold text-amber-400 shrink-0 print:text-black">• هدف مشخص (Specific):</span>
                <span className="text-slate-200 print:text-black">{progress.smartGoal.specific || 'ثبت نشده'}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                <span className="font-bold text-amber-400 shrink-0 print:text-black">• سنجه ارزیابی (Measurable):</span>
                <span className="text-slate-200 print:text-black">{progress.smartGoal.measurable || 'ثبت نشده'}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                <span className="font-bold text-amber-400 shrink-0 print:text-black">• امکان‌پذیری و چالش (Achievable):</span>
                <span className="text-slate-200 print:text-black">{progress.smartGoal.achievable || 'ثبت نشده'}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                <span className="font-bold text-amber-400 shrink-0 print:text-black">• هم‌آوایی با ارزش‌ها (Relevant):</span>
                <span className="text-slate-200 print:text-black">{progress.smartGoal.relevant || 'ثبت نشده'}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                <span className="font-bold text-amber-400 shrink-0 print:text-black">• موعد قطعی تقویمی (Time-bound):</span>
                <span className="text-slate-200 print:text-black">{progress.smartGoal.timeBound || 'ثبت نشده'}</span>
              </div>
            </div>

            {/* Burning WHY */}
            <div className="mt-5 p-4 rounded-lg bg-amber-500/15 border border-amber-400/40 print:bg-gray-100 print:border-gray-400">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 print:text-black mb-1">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>چرایی سوزان (The Burning WHY):</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-amber-100 print:text-black leading-relaxed">
                {progress.smartGoal.burningWhy || 'در فصل ۱۲ ثبت خواهد شد.'}
              </p>
            </div>
          </div>

          {/* 5. The Daily Action System */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 print:border-gray-300 print:bg-gray-50">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase mb-3">
              <Star className="w-4 h-4" />
              <span>سیستم استمرار و عادات اتمی روزانه:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 print:bg-white print:border-gray-200">
                <strong className="text-amber-300 block mb-1 print:text-black">آیین صبحگاهی ۵ دقیقه:</strong>
                <p className="text-slate-300 print:text-gray-700">{progress.dailyRituals.morningAction || 'تعریف نشده'}</p>
              </div>
              <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 print:bg-white print:border-gray-200">
                <strong className="text-amber-300 block mb-1 print:text-black">قانون ۲ دقیقه روزانه:</strong>
                <p className="text-slate-300 print:text-gray-700">{progress.dailyRituals.twoMinuteRule || 'تعریف نشده'}</p>
              </div>
              <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 print:bg-white print:border-gray-200">
                <strong className="text-amber-300 block mb-1 print:text-black">بیانیه هویت نوین:</strong>
                <p className="text-slate-300 print:text-gray-700">{progress.dailyRituals.identityStatement || 'تعریف نشده'}</p>
              </div>
            </div>
          </div>

          {/* Footer Signature */}
          <div className="pt-6 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 print:text-gray-500 font-serif">
            <span>GOAL DREAM Interactive Cinematic Masterclass</span>
            <div className="text-center sm:text-left">
              <span>امضای معنوی: </span>
              <span className="font-bold text-amber-300 print:text-black text-sm">
                {progress.userSignatureName || 'امضا شده با مهر اراده'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
