import React, { useState } from 'react';
import { CheckCircle2, Download, Edit3, FileText, RotateCcw, Save, Sparkles, Upload } from 'lucide-react';
import { UserProgress } from '../../types';
import { PDF_WORKSHOP_EXERCISES } from '../../data/pdfWorkshopExercises';
import { exportUserDataJSON, importUserDataJSON } from '../../utils/storage';
import { FlatStoryIllustration } from '../FlatStoryIllustration';

interface Props {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onResetProgress: () => void;
  onOpenWorkshop: () => void;
}

const keyFor = (step: number, field: number) => 100 + step * 10 + field;

export const MobileProfileView: React.FC<Props> = ({ progress, onUpdateProgress, onResetProgress, onOpenWorkshop }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(progress.userName || 'مسافر مسیر');
  const [error, setError] = useState('');
  const completed = progress.workshopCompletedSteps || [];
  const journeyPercent = Math.round((progress.completedChapters.length / 13) * 100);

  const saveName = () => {
    onUpdateProgress((prev) => ({ ...prev, userName: name.trim() || 'مسافر مسیر' }));
    setEditing(false);
  };

  const sections = PDF_WORKSHOP_EXERCISES.map((exercise) => ({
    ...exercise,
    answers: exercise.fields.map((label, index) => ({ label, value: progress.reflections[keyFor(exercise.id, index)] || '' })).filter((item) => item.value.trim()),
  })).filter((section) => section.answers.length > 0);

  return (
    <div className="space-y-4 pb-6 text-right">
      <section className="overflow-hidden rounded-[30px] border border-amber-500/25 bg-slate-950/90">
        <FlatStoryIllustration chapterId={13} index={4} hero className="h-[150px] rounded-none border-0 border-b border-slate-200" />
        <div className="p-4">
          <div className="flex items-center justify-between gap-3">
            {editing ? (
              <div className="flex flex-1 gap-2"><input value={name} onChange={(event) => setName(event.target.value)} className="min-w-0 flex-1 rounded-xl border border-amber-500/40 bg-slate-900 px-3 py-2 text-sm font-bold text-white outline-none" /><button onClick={saveName} className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-slate-950"><Save className="h-4 w-4" /></button></div>
            ) : (
              <div><span className="text-[10px] text-slate-500">نقشه شخصی</span><div className="flex items-center gap-2"><h1 className="text-xl font-black text-white">{progress.userName || 'مسافر مسیر'}</h1><button onClick={() => setEditing(true)} className="text-slate-500"><Edit3 className="h-4 w-4" /></button></div></div>
            )}
            <span className="rounded-2xl bg-amber-500/12 px-3 py-2 text-xs font-black text-amber-300">{journeyPercent}٪ مسیر</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-center"><div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3"><strong className="block text-lg text-white">{progress.completedChapters.length}/۱۳</strong><span className="text-[10px] text-slate-500">مرحله آموزشی</span></div><div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3"><strong className="block text-lg text-white">{completed.length}/۶</strong><span className="text-[10px] text-slate-500">گام کارگاه</span></div></div>
        </div>
      </section>

      {sections.length === 0 ? (
        <section className="rounded-[28px] border border-dashed border-slate-700 bg-slate-950/75 p-6 text-center"><FileText className="mx-auto h-8 w-8 text-slate-600" /><h2 className="mt-3 text-base font-black text-white">این صفحه با پاسخ‌های تو ساخته می‌شود</h2><p className="mt-2 text-xs leading-6 text-slate-400">هنوز نمونه‌ی ساختگی نشان نمی‌دهیم؛ هر چیزی که اینجا می‌بینی واقعاً نوشته‌ی خودت خواهد بود.</p><button onClick={onOpenWorkshop} className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 text-sm font-black text-slate-950"><Sparkles className="h-4 w-4" /> شروع کارگاه</button></section>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1"><h2 className="text-sm font-black text-white">نقشه‌ای که از پاسخ‌هایت ساخته شد</h2><button onClick={onOpenWorkshop} className="text-[11px] font-bold text-amber-400">ادامه / ویرایش</button></div>
          {sections.map((section) => (
            <section key={section.id} className="rounded-[24px] border border-slate-800 bg-slate-950/88 p-4">
              <div className="flex items-start justify-between gap-3"><div><span className="text-[10px] font-black text-amber-400">گام {section.id}</span><h3 className="mt-1 text-sm font-black leading-6 text-white">{section.title.replace(/گام .* — /, '')}</h3></div>{completed.includes(section.id) && <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />}</div>
              <div className="mt-3 space-y-2">{section.answers.map((item) => <div key={item.label} className="rounded-2xl bg-slate-900/75 p-3"><span className="block text-[10px] leading-5 text-slate-500">{item.label}</span><p className="mt-1 whitespace-pre-line text-[13px] leading-7 text-slate-200">{item.value}</p></div>)}</div>
            </section>
          ))}
        </div>
      )}

      <section className="rounded-[24px] border border-slate-800 bg-slate-950/80 p-4"><h2 className="text-xs font-black text-white">نگهداری از نوشته‌ها</h2><div className="mt-3 grid grid-cols-2 gap-2"><button onClick={() => exportUserDataJSON(progress)} className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 text-[11px] font-bold text-slate-300"><Download className="h-4 w-4" /> دریافت نسخه</button><label className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 text-[11px] font-bold text-slate-300"><Upload className="h-4 w-4" /> بازیابی<input type="file" accept="application/json" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) importUserDataJSON(file, (value) => { onUpdateProgress(() => value); setError(''); }, setError); }} /></label></div>{error && <p className="mt-2 text-[11px] text-rose-400">{error}</p>}<button onClick={onResetProgress} className="mt-3 flex min-h-10 w-full items-center justify-center gap-2 rounded-xl text-[11px] font-bold text-rose-300"><RotateCcw className="h-4 w-4" /> پاک کردن همه و شروع دوباره</button></section>
    </div>
  );
};
