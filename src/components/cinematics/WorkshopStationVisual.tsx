import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Flame,
  Shield,
  Sun,
  Target,
  CheckCircle2,
  Activity,
  Award,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { UserProgress } from '../../types';
import { soundEngine } from '../../utils/audio';

interface WorkshopStationVisualProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
}

export const WorkshopStationVisual: React.FC<WorkshopStationVisualProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [activeTab, setActiveTab] = useState<number>(progress.workshopActiveTab || 1);

  const tools = [
    {
      id: 1,
      title: '۱. کشف رنج (Pain)',
      icon: Flame,
      color: 'text-rose-400',
      badge: 'تبدیل رنج به سوخت',
      status: progress.limitingBelief ? 'completed' : 'pending',
    },
    {
      id: 2,
      title: '۲. ارزش‌ها (Values)',
      icon: Shield,
      color: 'text-amber-400',
      badge: 'سه ستون نفوذناپذیر',
      status: progress.coreValues && progress.coreValues.length >= 3 ? 'completed' : 'pending',
    },
    {
      id: 3,
      title: '۳. خلق رویا (Dream)',
      icon: Sun,
      color: 'text-yellow-300',
      badge: 'افق ۵ ساله پنج‌بعدی',
      status: progress.fiveYearVision && Object.keys(progress.fiveYearVision).length > 0 ? 'completed' : 'pending',
    },
    {
      id: 4,
      title: '۴. هدف اسمارت (SMART)',
      icon: Target,
      color: 'text-cyan-400',
      badge: '۵ زاویه هندسی دقیق',
      status: progress.smartGoal?.specific ? 'completed' : 'pending',
    },
    {
      id: 5,
      title: '۵. تعهد و میثاق (Pact)',
      icon: Award,
      color: 'text-emerald-400',
      badge: 'مهر زرین شرافت',
      status: progress.initialCovenantSigned ? 'completed' : 'pending',
    },
    {
      id: 6,
      title: '۶. سیستم پایش (Habits)',
      icon: Activity,
      color: 'text-indigo-400',
      badge: 'آیین‌های ۲ دقیقه‌ای',
      status: progress.dailyRituals?.morningAction ? 'completed' : 'pending',
    },
  ];

  const handleSelectTab = (id: number) => {
    setActiveTab(id);
    onUpdateProgress((prev) => ({
      ...prev,
      workshopActiveTab: id,
    }));
    soundEngine.playTick();
  };

  const completedCount = tools.filter((t) => t.status === 'completed').length;

  return (
    <div className="w-full flex flex-col items-center justify-center relative py-2">
      {/* Cinematic Workshop Mode Header */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 border border-amber-500/40 text-amber-200 font-black text-xs tracking-wide text-center shadow-[0_0_20px_rgba(245,158,11,0.2)]"
      >
        🛠️ ورود به حالت کارگاه عملی سرنوشت (PERSONAL WORKSHOP MODE)
      </motion.div>

      {/* Workshop Control Desk Container */}
      <div className="relative w-full max-w-[340px] rounded-2xl overflow-hidden bg-[#030612] border border-amber-500/30 p-3 shadow-2xl">
        {/* Top Tool Progress Status */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
          <span className="text-amber-300 font-bold">میز کار مهندسی هدف</span>
          <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-700">
            {completedCount} از ۶ ماژول تکمیل شده
          </span>
        </div>

        {/* 6 Workbench Modules Grid */}
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          {tools.map((t) => {
            const Icon = t.icon;
            const isSelected = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleSelectTab(t.id)}
                className={`p-2 rounded-xl border text-right transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <Icon className={`w-3.5 h-3.5 ${t.color}`} />
                  {t.status === 'completed' && (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  )}
                </div>
                <div className="text-[10px] font-bold truncate max-w-[80px]">
                  {t.title.split(' ')[1]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Module Workbench Canvas */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-right min-h-[90px] flex flex-col justify-center">
          {activeTab === 1 && (
            <div>
              <span className="text-xs font-bold text-rose-300 block mb-1">
                ۱. کشف رنج و انزجار عمیق
              </span>
              <p className="text-[10px] text-slate-300 leading-relaxed">
                رنج تکرار روزمرگی بدون پیشرفت، سوزان‌ترین سوخت برای پرواز است.
              </p>
              <div className="mt-2 text-[10px] text-amber-300/80 bg-slate-900 p-1.5 rounded-lg border border-slate-800">
                باور بازدارنده: «{progress.limitingBelief || 'هنوز ثبت نشده'}»
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div>
              <span className="text-xs font-bold text-amber-300 block mb-1">
                ۲. ارزش‌های بنیادین تثبیت‌شده
              </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {progress.coreValues && progress.coreValues.length > 0 ? (
                  progress.coreValues.map((v, i) => (
                    <span
                      key={i}
                      className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 font-bold"
                    >
                      ستون {i + 1}: {v}
                    </span>
                  ))
                ) : (
                  <span className="text-[10px] text-slate-500">ارزش‌ها را از فصل ۹ برگزینید</span>
                )}
              </div>
            </div>
          )}

          {activeTab === 3 && (
            <div>
              <span className="text-xs font-bold text-yellow-300 block mb-1">
                ۳. چشم‌انداز ۵ ساله در پنج قلمرو
              </span>
              <p className="text-[10px] text-slate-300">
                تسلط ذهن، تندرستی، پیشتازی شغلی، برکت مالی و عشق پایدار در ۵ سال آینده.
              </p>
            </div>
          )}

          {activeTab === 4 && (
            <div>
              <span className="text-xs font-bold text-cyan-300 block mb-1">
                ۴. لیزر ۵ وجهی هدف SMART
              </span>
              <p className="text-[10px] text-slate-300">
                هدف معین: {progress.smartGoal?.specific || 'در انتظار تدوین لیزری'}
              </p>
            </div>
          )}

          {activeTab === 5 && (
            <div>
              <span className="text-xs font-bold text-emerald-300 block mb-1">
                ۵. میثاق شرافتمندانه
              </span>
              <p className="text-[10px] text-slate-300">
                {progress.initialCovenantSigned
                  ? '✓ پیمان با موفقیت امضا و در تاریخچه روحت ثبت شد.'
                  : 'پیمان معنوی هنوز امضا نشده است.'}
              </p>
            </div>
          )}

          {activeTab === 6 && (
            <div>
              <span className="text-xs font-bold text-indigo-300 block mb-1">
                ۶. سیستم ردیابی و آیین‌های اتمی روزانه
              </span>
              <p className="text-[10px] text-slate-300">
                آیین صبحگاهی: {progress.dailyRituals?.morningAction || '۵ دقیقه تمرکز و تجسم افق'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
