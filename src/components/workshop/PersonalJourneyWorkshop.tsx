import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronDown, Circle, Compass, LockKeyhole, RotateCcw } from 'lucide-react';
import { UserProgress } from '../../types';
import { PDF_WORKSHOP_EXERCISES } from '../../data/pdfWorkshopExercises';
import { FlatStoryIllustration } from '../FlatStoryIllustration';

interface Props {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onBackToJourney: () => void;
}

const chapterForStep = [11, 10, 8, 12, 13, 5];
const prompts: Record<number, string[]> = {
  1: ['بدون سانسور بنویس', 'از حس واقعی شروع کن'],
  2: ['فقط سه ارزش', 'برای هرکدام شاهد واقعی'],
  3: ['اگر هیچ مانعی نبود…', 'جزئیات حسی را ببین'],
  4: ['شفاف و قابل سنجش', 'یک تاریخ واقعی'],
  5: ['بهای واقعی', 'آن‌قدر کوچک که انجام شود'],
  6: ['کوتاه و منظم', 'مسیر را اصلاح کن'],
};

const answerKey = (step: number, field: number) => 100 + step * 10 + field;

export const PersonalJourneyWorkshop: React.FC<Props> = ({ progress, onUpdateProgress, onBackToJourney }) => {
  const [step, setStep] = useState(0);
  const [field, setField] = useState(0);
  const completed = progress.workshopCompletedSteps || [];
  const exercise = step ? PDF_WORKSHOP_EXERCISES[step - 1] : null;
  const answer = exercise ? progress.reflections[answerKey(exercise.id, field)] || '' : '';

  const totalFields = useMemo(() => PDF_WORKSHOP_EXERCISES.reduce((sum, item) => sum + item.fields.length, 0), []);
  const answeredFields = useMemo(() => PDF_WORKSHOP_EXERCISES.reduce((sum, item) => sum + item.fields.filter((_, index) => (progress.reflections[answerKey(item.id, index)] || '').trim()).length, 0), [progress.reflections]);

  const firstOpenStep = PDF_WORKSHOP_EXERCISES.find((item) => !completed.includes(item.id))?.id || 6;
  const canOpen = (id: number) => completed.includes(id) || id <= firstOpenStep;

  const openStep = (id: number) => {
    if (!canOpen(id)) return;
    setStep(id);
    const firstEmpty = PDF_WORKSHOP_EXERCISES[id - 1].fields.findIndex((_, index) => !(progress.reflections[answerKey(id, index)] || '').trim());
    setField(firstEmpty < 0 ? 0 : firstEmpty);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setAnswer = (value: string) => {
    if (!exercise) return;
    onUpdateProgress((prev) => ({ ...prev, reflections: { ...prev.reflections, [answerKey(exercise.id, field)]: value } }));
  };

  const advance = () => {
    if (!exercise || !answer.trim()) return;
    if (field < exercise.fields.length - 1) {
      setField((value) => value + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    onUpdateProgress((prev) => ({
      ...prev,
      workshopCompletedSteps: prev.workshopCompletedSteps?.includes(exercise.id) ? prev.workshopCompletedSteps : [...(prev.workshopCompletedSteps || []), exercise.id],
    }));
    if (exercise.id < 6) {
      setStep(exercise.id + 1);
      setField(0);
    } else {
      setStep(0);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!exercise) {
    return (
      <div className="space-y-4 pb-6 text-right">
        <div className="flex items-center justify-between gap-3">
          <button onClick={onBackToJourney} className="flex min-h-10 items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 px-3 text-[11px] text-slate-300"><ArrowRight className="h-4 w-4" /> مسیر آموزشی</button>
          <span className="text-xs font-black text-amber-300">کارگاه ساخت هدف من</span>
        </div>

        <section className="overflow-hidden rounded-[30px] border border-amber-500/25 bg-slate-950/90">
          <FlatStoryIllustration chapterId={13} index={0} hero className="aspect-[3/2] rounded-none border-0 border-b border-slate-200" />
          <div className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-400">از ناخواسته تا اقدام روزانه</span>
              <span className="rounded-full bg-slate-900 px-2.5 py-1 text-[10px] text-slate-400">{answeredFields} از {totalFields} پاسخ</span>
            </div>
            <h1 className="mt-2 text-2xl font-black leading-9 text-white">هدف را کشف نکن؛ آن را بساز</h1>
            <p className="mt-2 text-[13px] leading-7 text-slate-300">شش ایستگاه کوتاه و پیوسته بر پایه‌ی متن اصلی: درد، ارزش، رؤیا، هدف روشن، تعهد و بازبینی.</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-gradient-to-l from-amber-300 to-orange-500 transition-all" style={{ width: `${Math.round((answeredFields / totalFields) * 100)}%` }} /></div>
          </div>
        </section>

        <div className="relative space-y-2.5 before:absolute before:bottom-6 before:right-[25px] before:top-6 before:w-px before:bg-slate-800">
          {PDF_WORKSHOP_EXERCISES.map((item) => {
            const done = completed.includes(item.id);
            const unlocked = canOpen(item.id);
            return (
              <button key={item.id} onClick={() => openStep(item.id)} disabled={!unlocked} className={`relative flex w-full items-center gap-3 rounded-2xl border p-3.5 text-right transition ${done ? 'border-emerald-500/25 bg-emerald-950/15' : unlocked ? 'border-amber-500/25 bg-slate-950/90' : 'cursor-not-allowed border-slate-800 bg-slate-950/60 opacity-55'}`}>
                <span className={`z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border ${done ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300' : unlocked ? 'border-amber-500/40 bg-amber-500/15 text-amber-300' : 'border-slate-700 bg-slate-900 text-slate-600'}`}>{done ? <Check className="h-5 w-5" /> : unlocked ? item.id : <LockKeyhole className="h-4 w-4" />}</span>
                <span className="min-w-0 flex-1"><span className="block text-[10px] font-black text-amber-400/80">ایستگاه {item.id}</span><span className="mt-0.5 block text-sm font-black leading-6 text-white">{item.title.replace(/گام .* — /, '')}</span></span>
                {unlocked && <ArrowLeft className="h-4 w-4 shrink-0 text-slate-500" />}
              </button>
            );
          })}
        </div>

        {completed.length === 6 && <div className="rounded-3xl border border-emerald-500/30 bg-emerald-950/20 p-5 text-center"><CheckCircle2 className="mx-auto h-8 w-8 text-emerald-300" /><h2 className="mt-2 text-lg font-black text-white">نقشه‌ی هدف تو ساخته شد</h2><p className="mt-1 text-xs leading-6 text-slate-300">پاسخ‌هایت در «نتیجه‌ها» کنار هم قرار گرفته‌اند و هر زمان قابل ویرایش‌اند.</p></div>}
      </div>
    );
  }

  const currentNumber = field + 1;
  const fieldProgress = ((currentNumber) / exercise.fields.length) * 100;

  return (
    <AnimatePresence mode="wait">
      <motion.div key={`${step}-${field}`} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} className="space-y-4 pb-6 text-right">
        <div className="flex items-center justify-between gap-3">
          <button onClick={() => { setStep(0); setField(0); }} className="flex min-h-10 items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 px-3 text-[11px] text-slate-300"><ArrowRight className="h-4 w-4" /> شش ایستگاه</button>
          <span className="text-[11px] font-black text-amber-300">گام {step} از ۶</span>
        </div>

        <section className="overflow-hidden rounded-[28px] border border-slate-800 bg-slate-950/92 shadow-xl">
          <FlatStoryIllustration chapterId={chapterForStep[step - 1]} index={field} hero className="aspect-[3/2] rounded-none border-0 border-b border-slate-200" />
          <div className="p-4">
            <div className="flex items-center justify-between text-[10px]"><span className="font-black text-amber-400">پرسش {currentNumber} از {exercise.fields.length}</span><span className="text-slate-500">{Math.round(fieldProgress)}٪ این گام</span></div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800"><motion.div initial={{ width: 0 }} animate={{ width: `${fieldProgress}%` }} className="h-full rounded-full bg-amber-400" /></div>
            <h1 className="mt-4 text-xl font-black leading-8 text-white">{exercise.title}</h1>
            <p className="mt-1.5 text-xs leading-6 text-slate-400">{exercise.cinematicHeadline}</p>
          </div>
        </section>

        <section className="rounded-[28px] border border-amber-500/25 bg-gradient-to-b from-amber-500/8 to-slate-950 p-4">
          <div className="mb-3 flex flex-wrap gap-2">{prompts[step].map((tip) => <span key={tip} className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold text-amber-200">{tip}</span>)}</div>
          <label htmlFor="workshop-answer" className="block text-[15px] font-black leading-7 text-white">{exercise.fields[field]}</label>
          <textarea id="workshop-answer" autoFocus value={answer} onChange={(event) => setAnswer(event.target.value)} rows={7} placeholder="پاسخ خودت را اینجا بنویس…" className="mt-3 w-full resize-none rounded-2xl border border-slate-700 bg-slate-900/85 p-4 text-[15px] leading-8 text-white outline-none placeholder:text-slate-600 focus:border-amber-400" />
          <div className="mt-3 flex gap-2">
            {field > 0 && <button onClick={() => setField((value) => value - 1)} className="flex min-h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 text-slate-300" aria-label="پرسش قبل"><ArrowRight className="h-4 w-4" /></button>}
            <button onClick={advance} disabled={!answer.trim()} className={`flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl text-sm font-black ${answer.trim() ? 'bg-gradient-to-l from-amber-300 to-orange-500 text-slate-950' : 'cursor-not-allowed bg-slate-800 text-slate-600'}`}>{field === exercise.fields.length - 1 ? <CheckCircle2 className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}<span>{field === exercise.fields.length - 1 ? `تکمیل گام ${step}` : 'ثبت و پرسش بعدی'}</span></button>
          </div>
        </section>

        <details className="group rounded-2xl border border-slate-800 bg-slate-950/80 p-3.5">
          <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-bold text-slate-400"><span className="flex items-center gap-2"><Compass className="h-4 w-4 text-amber-400" /> راهنمای کامل این گام</span><ChevronDown className="h-4 w-4 transition group-open:rotate-180" /></summary>
          <p className="mt-4 whitespace-pre-line border-t border-slate-800 pt-4 text-[13px] leading-7 text-slate-300">{exercise.originalText}</p>
        </details>
      </motion.div>
    </AnimatePresence>
  );
};
