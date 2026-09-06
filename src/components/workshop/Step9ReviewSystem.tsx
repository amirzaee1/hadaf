import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowLeft, Calendar, Compass, RefreshCw, CheckCircle2, Shield } from 'lucide-react';
import { UserProgress } from '../../types';
import { soundEngine } from '../../utils/audio';

interface Step9ReviewSystemProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onComplete: () => void;
}

export const Step9ReviewSystem: React.FC<Step9ReviewSystemProps> = ({
  progress,
  onUpdateProgress,
  onComplete,
}) => {
  const [activeCadence, setActiveCadence] = useState<'weekly' | 'monthly' | 'quarterly'>('weekly');

  const [reviewData, setReviewData] = useState({
    weekly: {
      progress: progress.tripleReviews?.weekly.progress || 'تکمیل ۹۰٪ مأموریت‌های هفتگی و تسلط بر زمان‌بندی روزانه',
      obstacles: progress.tripleReviews?.weekly.obstacles || 'افت انرژی در بعدازظهرهای سه‌شنبه به دلیل جلسات پراکنده',
      adjustments: progress.tripleReviews?.weekly.adjustments || 'انتقال جلسات به صبح چهارشنبه و حفظ پنجره عمیق روزانه',
    },
    monthly: {
      alignment: progress.tripleReviews?.monthly.alignment || 'آزادی و رشد کاملاً حفظ شد، اما نیاز به تفویض کارهای اجرایی کوچک دارم',
      energy: progress.tripleReviews?.monthly.energy || 'سطح انرژی ۸.۵ از ۱۰؛ هم‌خوانی بسیار عالی با کهن‌الگو',
    },
    quarterly: {
      goalUpdate: progress.tripleReviews?.quarterly.goalUpdate || 'اهداف فصلی محقق شد؛ زمان افزایش ۲۰ درصدی متریک‌های سنجش است',
      newDirection: progress.tripleReviews?.quarterly.newDirection || 'توسعه بازارهای جدید بین‌المللی و جذب دومین پارتنر کلیدی',
    },
  });

  const handleTextChange = (cadence: 'weekly' | 'monthly' | 'quarterly', field: string, value: string) => {
    setReviewData((prev) => ({
      ...prev,
      [cadence]: {
        ...prev[cadence],
        [field]: value,
      },
    }));
  };

  const handleSaveReviews = () => {
    onUpdateProgress((prev) => ({
      ...prev,
      tripleReviews: reviewData,
    }));
    soundEngine.playChime(1046.5);
    onComplete();
  };

  return (
    <div className="space-y-6 text-right">
      {/* Title & Concept */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
            گام نهم کارگاه: سیستم بازبینی سه‌گانه (Review System)
          </span>
          <span className="text-xs font-mono text-amber-400">
            سیکل‌های ۳ گانه پایش مسیر
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          گاه‌شمار تنظیم مداوم قطب‌نما: سیستم پایش هفتگی، ماهانه و ۹۰ روزه
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          هیچ هدفی در یک خط مستقیم محقق نمی‌شود. موشک‌های فضاپیما ۹۵٪ از مسیر را خارج از مدار دقیق هستند، اما سیستم بازبینی مداوم آنها را به مقصد می‌رساند.
        </p>
      </div>

      {/* 3 Review Tabs */}
      <div className="flex items-center justify-between gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800">
        {[
          { id: 'weekly', title: 'بازبینی هفتگی', subtitle: 'پیشرفت، موانع، تعدیل', icon: Calendar },
          { id: 'monthly', title: 'بازبینی ماهانه', subtitle: 'هم‌راستایی با ارزش‌ها', icon: Compass },
          { id: 'quarterly', title: 'بازبینی ۹۰ روزه', subtitle: 'به‌روزرسانی SMART', icon: RefreshCw },
        ].map((tab) => {
          const isSelected = activeCadence === tab.id;
          const IconComp = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveCadence(tab.id as any);
                soundEngine.playTick();
              }}
              className={`flex-1 py-3 px-2 rounded-xl text-right transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-lg font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <IconComp className="w-4 h-4" />
                <span className="text-[10px] font-mono">{tab.id.toUpperCase()}</span>
              </div>
              <span className="text-xs font-black block">{tab.title}</span>
              <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-black/80' : 'text-slate-500'}`}>
                {tab.subtitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Cadence Review Form */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-700/80 space-y-4">
        {activeCadence === 'weekly' && (
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-2">
              <h3 className="text-sm font-black text-amber-300">
                پروتکل هفتگی (جمعه‌ها یا یکشنبه‌ها - ۱۵ دقیقه):
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                سنگفرش هفته گذشته را بررسی کن، موانع را بیرون بکش و مسیر هفته نو را هموار ساز.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">
                ۱. دستاوردهای کلیدی و پیشرفت‌های این هفته من:
              </label>
              <textarea
                rows={2}
                value={reviewData.weekly.progress}
                onChange={(e) => handleTextChange('weekly', 'progress', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-100 outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-red-300 mb-1">
                ۲. چه موانع یا اصطکاک‌هایی مانع اجرای ۱۰۰٪ شدند؟
              </label>
              <textarea
                rows={2}
                value={reviewData.weekly.obstacles}
                onChange={(e) => handleTextChange('weekly', 'obstacles', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-100 outline-none focus:border-red-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-300 mb-1">
                ۳. تعدیل ضروری و تعهد اصلاحی برای هفته پیش رو:
              </label>
              <textarea
                rows={2}
                value={reviewData.weekly.adjustments}
                onChange={(e) => handleTextChange('weekly', 'adjustments', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-100 outline-none focus:border-emerald-400"
              />
            </div>
          </div>
        )}

        {activeCadence === 'monthly' && (
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-2">
              <h3 className="text-sm font-black text-amber-300">
                پروتکل ماهانه (پایان هر ماه - ۳۰ دقیقه):
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                سنجش سلامت قطب‌نما و ارزیابی سطح انرژی روانی در هم‌راستایی با سه ستون ارزش.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">
                ۱. آیا تصمیمات ماه گذشته با سه ستون ارزش‌های بنیادین من هم‌راستا بود؟
              </label>
              <textarea
                rows={3}
                value={reviewData.monthly.alignment}
                onChange={(e) => handleTextChange('monthly', 'alignment', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-100 outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-sky-300 mb-1">
                ۲. سطح انرژی، انگیزه و هماهنگی با کهن‌الگوی روانی:
              </label>
              <textarea
                rows={2}
                value={reviewData.monthly.energy}
                onChange={(e) => handleTextChange('monthly', 'energy', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-100 outline-none focus:border-sky-400"
              />
            </div>
          </div>
        )}

        {activeCadence === 'quarterly' && (
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-2">
              <h3 className="text-sm font-black text-amber-300">
                پروتکل فصلی ۹۰ روزه (پایان فصل - ۶۰ دقیقه):
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                به‌روزرسانی رسمی اهداف SMART، ارتقای مقیاس‌ها و ورود به فصل جدید.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">
                ۱. چه بخش‌هایی از مأموریت SMART تکمیل شده و نیاز به ارتقای اهداف دارد؟
              </label>
              <textarea
                rows={3}
                value={reviewData.quarterly.goalUpdate}
                onChange={(e) => handleTextChange('quarterly', 'goalUpdate', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-100 outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-300 mb-1">
                ۲. افق‌های نوین و جهت‌گیری استراتژیک برای ۹۰ روز آینده:
              </label>
              <textarea
                rows={2}
                value={reviewData.quarterly.newDirection}
                onChange={(e) => handleTextChange('quarterly', 'newDirection', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-100 outline-none focus:border-emerald-400"
              />
            </div>
          </div>
        )}
      </div>

      {/* Completion Button */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          گاه‌شمار سه‌گانه تثبیت شد. کارگاه شخصی تو اکنون کامل است.
        </span>
        <button
          onClick={handleSaveReviews}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95 transition-all"
        >
          <span>تکمیل ۹ تمرین و مشاهده داشبورد نقشه مسیر</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
