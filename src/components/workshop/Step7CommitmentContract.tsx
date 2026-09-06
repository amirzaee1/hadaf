import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowLeft, CheckCircle2, Shield, Feather, Award } from 'lucide-react';
import { UserProgress } from '../../types';
import { soundEngine } from '../../utils/audio';

interface Step7CommitmentContractProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onComplete: () => void;
}

export const Step7CommitmentContract: React.FC<Step7CommitmentContractProps> = ({
  progress,
  onUpdateProgress,
  onComplete,
}) => {
  const [contract, setContract] = useState({
    commitment:
      progress.contractAgreement?.commitment ||
      'من متعهد می‌شوم که تا تحقق کامل رسالت خود، با شجاعت در برابر وسوسه تسلیم و راحتی زودگذر ایستادگی کنم.',
    priceToPay:
      progress.contractAgreement?.priceToPay ||
      'حذف پرسه زدن‌های بی‌هدف در فضای مجازی، سحرخیزی ساعت ۶ صبح، انضباط مالی و پذیرش سختی یادگیری مهارت‌های نو.',
    dailyPromise:
      progress.contractAgreement?.dailyPromise ||
      'روزی حداقل ۶۰ دقیقه کار متمرکز و بدون حواس‌پرتی روی مهم‌ترین سنگفرش مأموریت، بدون بهانه‌تراشی.',
    signatureName: progress.contractAgreement?.signatureName || progress.userSignatureName || 'رهرو مسیر سرنوشت',
  });

  const [isSigned, setIsSigned] = useState(Boolean(progress.contractAgreement?.signedDate || progress.covenantSealDate));

  const handleChange = (key: keyof typeof contract, val: string) => {
    setContract((prev) => ({ ...prev, [key]: val }));
  };

  const handleSign = () => {
    const todayStr = new Date().toLocaleDateString('fa-IR');
    onUpdateProgress((prev) => ({
      ...prev,
      contractAgreement: {
        ...contract,
        signedDate: todayStr,
      },
      covenantSealDate: todayStr,
      userSignatureName: contract.signatureName,
    }));
    setIsSigned(true);
    soundEngine.playChime(1046.5);
  };

  const isFormValid =
    contract.commitment.trim().length > 10 &&
    contract.priceToPay.trim().length > 10 &&
    contract.dailyPromise.trim().length > 5 &&
    contract.signatureName.trim().length > 2;

  return (
    <div className="space-y-6 text-right">
      {/* Title & Concept */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300">
            گام هفتم کارگاه: میثاق‌نامه تعهد شرافتمندانه (Commitment Contract)
          </span>
          <span className="text-xs font-mono text-amber-400">
            {isSigned ? 'امضاشده و ممهور' : 'در انتظار مهر زرین'}
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          عهدنامه‌ای با خود بر سر پرداخت شرافتمندانه بهای پیروزی
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          خواستن بدون تمایل به پرداخت بها، فقط خیال‌بافی است. این سند تا ابد بر روی میز کارگاه شخصی تو باقی می‌ماند تا در روزهای خاکستری یادآور سوگند آغازینت باشد.
        </p>
      </div>

      {/* Cinematic Parchment / Contract Certificate Visual */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1c150c] via-[#241a0e] to-[#140e06] border-2 border-amber-500/60 shadow-[0_0_35px_rgba(245,158,11,0.15)] space-y-5">
        {/* Certificate Ornaments */}
        <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400" />
            <div>
              <span className="text-[10px] font-mono tracking-widest text-amber-400/80 block">
                SACRED COVENANT OF DESTINY
              </span>
              <h3 className="text-base sm:text-lg font-black text-amber-100 font-serif">
                میثاق‌نامه رسمی پیمان با خویشتن
              </h3>
            </div>
          </div>
          <span className="text-xs font-mono text-amber-400/70">
            {progress.covenantSealDate || 'امروز'}
          </span>
        </div>

        {/* 3 Contract Clauses */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-amber-300 mb-1">
              ۱. تعهد شرافتمندانه من (My Commitment):
            </label>
            <textarea
              rows={2}
              value={contract.commitment}
              onChange={(e) => handleChange('commitment', e.target.value)}
              className="w-full bg-black/40 border border-amber-500/30 focus:border-amber-400 rounded-xl p-3 text-xs sm:text-sm text-amber-100 outline-none leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-amber-300 mb-1">
              ۲. بهایی که با آغوش باز می‌پردازم (My Price to Pay — زمان، تمرکز، لذت‌های آنی):
            </label>
            <textarea
              rows={2}
              value={contract.priceToPay}
              onChange={(e) => handleChange('priceToPay', e.target.value)}
              className="w-full bg-black/40 border border-amber-500/30 focus:border-amber-400 rounded-xl p-3 text-xs sm:text-sm text-amber-100 outline-none leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-amber-300 mb-1">
              ۳. قول غیرقابل مذاکره روزانه من (My Daily Promise):
            </label>
            <input
              type="text"
              value={contract.dailyPromise}
              onChange={(e) => handleChange('dailyPromise', e.target.value)}
              className="w-full bg-black/40 border border-amber-500/30 focus:border-amber-400 rounded-xl p-2.5 text-xs sm:text-sm text-amber-100 outline-none"
            />
          </div>
        </div>

        {/* Signature & Wax Seal Area */}
        <div className="pt-4 border-t border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-1/2">
            <label className="block text-[11px] text-amber-300/80 mb-1">
              نام و نام‌خانوادگی (امضاکننده میثاق):
            </label>
            <div className="flex items-center gap-2">
              <Feather className="w-4 h-4 text-amber-400" />
              <input
                type="text"
                value={contract.signatureName}
                onChange={(e) => handleChange('signatureName', e.target.value)}
                className="flex-1 bg-black/50 border-b border-amber-400 text-sm font-black text-amber-200 outline-none px-2 py-1 font-serif"
              />
            </div>
          </div>

          {/* Golden Wax Seal */}
          <div className="flex items-center gap-3">
            {isSigned ? (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 via-red-700 to-red-950 border-2 border-amber-400 flex flex-col items-center justify-center text-amber-200 shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                <span className="text-[10px] font-black">مهر رسمی</span>
                <span className="text-[8px] font-mono">SEALED</span>
              </div>
            ) : (
              <button
                disabled={!isFormValid}
                onClick={handleSign}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition-all ${
                  isFormValid
                    ? 'bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white shadow-red-900/50'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <span>امضا و مهر کردن میثاق‌نامه</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Completion Button */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          {isSigned
            ? 'میثاق‌نامه زرین روی میز کارگاه جاودانه شد.'
            : 'بندهای سه‌گانه را پر کن و سند را امضا کن.'}
        </span>
        <button
          disabled={!isSigned}
          onClick={onComplete}
          className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
            isSigned
              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>تثبیت میثاق و رفتن به سنگفرش عادات</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
