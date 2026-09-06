import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Target, CheckCircle2, Calendar, Flag, Sparkles, Clock } from 'lucide-react';
import { GoalMilestone } from '../../types';
import { soundEngine } from '../../utils/audio';

interface GoalBuilderProps {
  initialGoal?: {
    specific: string;
    measurable: string;
    achievable: string;
    relevant: string;
    timeBound: string;
  };
  milestones?: GoalMilestone[];
  onSaveGoal: (goal: {
    specific: string;
    measurable: string;
    achievable: string;
    relevant: string;
    timeBound: string;
  }) => void;
  onToggleMilestone?: (milestoneId: string) => void;
  onAddMilestone?: (title: string, targetDate: string) => void;
  className?: string;
}

export const GoalBuilder: React.FC<GoalBuilderProps> = ({
  initialGoal,
  milestones = [],
  onSaveGoal,
  onToggleMilestone,
  onAddMilestone,
  className = '',
}) => {
  const [goal, setGoal] = useState(
    initialGoal || {
      specific: 'راه‌اندازی محصول آموزش استراتژی و مربی‌گری فردی',
      measurable: '۱,۰۰۰ عضو فعال و رضایت ۹۵٪',
      achievable: 'روزانه ۲ ساعت تمرکز عمیق و استفاده از شبکه‌های موجود',
      relevant: 'هم‌راستا با ارزش غایی آزادی و رشد مستمر',
      timeBound: '۲۹ اسفند ۱۴۰۴',
    }
  );

  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [newMilestoneDate, setNewMilestoneDate] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleUpdate = (field: keyof typeof goal, val: string) => {
    setGoal((prev) => ({ ...prev, [field]: val }));
    setIsSaved(false);
  };

  const handleSave = () => {
    onSaveGoal(goal);
    soundEngine.playChime(784);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneTitle.trim() || !onAddMilestone) return;
    onAddMilestone(newMilestoneTitle.trim(), newMilestoneDate.trim() || '۱ ماه آینده');
    setNewMilestoneTitle('');
    setNewMilestoneDate('');
    soundEngine.playChime(880);
  };

  return (
    <div className={`p-5 rounded-3xl bg-slate-900/90 border border-amber-500/30 space-y-5 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/40">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white">معمار هدف هوشمند (SMART Engine)</h3>
            <p className="text-[11px] text-slate-400">طراحی مهندسی سازه هدف از رویا به واقعیت</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black text-xs font-black flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isSaved ? 'ذخیره شد' : 'ثبت هدف'}</span>
        </button>
      </div>

      {/* 5 SMART Fields */}
      <div className="space-y-3">
        <div>
          <label className="text-[11px] font-bold text-amber-300 block mb-1">
            ۱. مشخص و شفاف (Specific)
          </label>
          <input
            type="text"
            value={goal.specific}
            onChange={(e) => handleUpdate('specific', e.target.value)}
            className="w-full p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
            placeholder="دقیقاً چه چیزی را می‌خواهی خلق کنی؟"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-bold text-amber-300 block mb-1">
              ۲. قابل اندازه‌گیری (Measurable)
            </label>
            <input
              type="text"
              value={goal.measurable}
              onChange={(e) => handleUpdate('measurable', e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
              placeholder="شاخص عددی یا متریک موفقیت"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-amber-300 block mb-1">
              ۳. در دسترس و باورپذیر (Achievable)
            </label>
            <input
              type="text"
              value={goal.achievable}
              onChange={(e) => handleUpdate('achievable', e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
              placeholder="منابع و زمان دردسترس تو"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-bold text-amber-300 block mb-1">
              ۴. مرتبط با رسالت (Relevant)
            </label>
            <input
              type="text"
              value={goal.relevant}
              onChange={(e) => handleUpdate('relevant', e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
              placeholder="ارزش‌های بنیادینی که به آن پاسخ می‌دهد"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-amber-300 block mb-1">
              ۵. دارای ضرب‌الاجل (Time-bound)
            </label>
            <input
              type="text"
              value={goal.timeBound}
              onChange={(e) => handleUpdate('timeBound', e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400"
              placeholder="تاریخ دقیق پایان مأموریت"
            />
          </div>
        </div>
      </div>

      {/* Milestones Section */}
      <div className="pt-2 border-t border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Flag className="w-3.5 h-3.5 text-amber-400" />
            <h4 className="text-xs font-bold text-slate-200">سنگ‌نشان‌ها و فازهای پیشرفت (Milestones)</h4>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            {milestones.filter((m) => m.isCompleted).length} از {milestones.length} انجام شده
          </span>
        </div>

        {/* Milestone List */}
        <div className="space-y-2">
          {milestones.map((m) => (
            <div
              key={m.id}
              onClick={() => onToggleMilestone && onToggleMilestone(m.id)}
              className={`p-2.5 rounded-xl flex items-center justify-between gap-3 text-xs transition-all cursor-pointer ${
                m.isCompleted
                  ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-200'
                  : 'bg-slate-950/70 border border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2
                  className={`w-4 h-4 shrink-0 ${
                    m.isCompleted ? 'text-emerald-400' : 'text-slate-600'
                  }`}
                />
                <span className={m.isCompleted ? 'line-through opacity-80' : 'font-bold'}>
                  {m.title}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono shrink-0 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {m.targetDate}
              </span>
            </div>
          ))}
        </div>

        {/* Add new milestone inline form */}
        {onAddMilestone && (
          <form onSubmit={handleAddMilestone} className="flex gap-2 pt-1">
            <input
              type="text"
              value={newMilestoneTitle}
              onChange={(e) => setNewMilestoneTitle(e.target.value)}
              placeholder="عنوان سنگ‌نشان بعدی..."
              className="flex-1 p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            <input
              type="text"
              value={newMilestoneDate}
              onChange={(e) => setNewMilestoneDate(e.target.value)}
              placeholder="زمان (مثلا: ماه آینده)"
              className="w-28 p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold transition-all shrink-0"
            >
              + افزودن
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
