import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Clock3, FileText, Sparkles } from 'lucide-react';
import { UserProgress } from '../../types';
import { PDF_WORKSHOP_EXERCISES, WORKSHOP_INTRO } from '../../data/pdfWorkshopExercises';
import { soundEngine } from '../../utils/audio';

interface PersonalJourneyWorkshopProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onBackToJourney: () => void;
}

export const PersonalJourneyWorkshop: React.FC<PersonalJourneyWorkshopProps> = ({ progress, onUpdateProgress, onBackToJourney }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const completedSteps = progress.workshopCompletedSteps || [];
  const exercise = currentStep > 0 ? PDF_WORKSHOP_EXERCISES[currentStep - 1] : null;

  const setAnswer = (stepId: number, fieldIndex: number, value: string) => {
    onUpdateProgress((previous) => ({ ...previous, reflections: { ...previous.reflections, [100 + stepId * 10 + fieldIndex]: value } }));
  };

  const completeStep = (stepId: number) => {
    onUpdateProgress((previous) => ({
      ...previous,
      workshopCompletedSteps: previous.workshopCompletedSteps?.includes(stepId)
        ? previous.workshopCompletedSteps
        : [...(previous.workshopCompletedSteps || []), stepId],
    }));
    soundEngine.playChime(659.25);
    setCurrentStep(stepId < PDF_WORKSHOP_EXERCISES.length ? stepId + 1 : 0);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
        <button onClick={onBackToJourney} className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs flex items-center gap-1.5">
          <ArrowRight className="w-3.5 h-3.5" /><span>بازگشت به کتاب مسیر</span>
        </button>
        <span className="text-sm font-black text-amber-300">تمرین عملی هدف‌گذاری — نسخه کامل</span>
      </div>

      {currentStep === 0 && (
        <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <div className="relative rounded-3xl overflow-hidden border border-amber-500/25 bg-gradient-to-b from-emerald-950/30 to-slate-950">
            <img src="/assets/goal-dream/workshop-isometric.webp" alt="میز تصویری شش گام تمرین هدف‌گذاری" className="w-full h-auto object-contain" width="1536" height="1024" loading="lazy" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950 to-transparent" />
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-amber-500/25 bg-gradient-to-b from-amber-500/10 via-slate-950 to-slate-950 p-5 sm:p-8">
            <Sparkles className="w-7 h-7 text-amber-400 mb-3" />
            <p className="whitespace-pre-line text-sm sm:text-base leading-8 text-slate-200">{WORKSHOP_INTRO}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PDF_WORKSHOP_EXERCISES.map((item) => (
              <button key={item.id} onClick={() => setCurrentStep(item.id)} className="text-right p-4 rounded-2xl border border-slate-800 bg-slate-950/85 hover:border-amber-500/50 transition-all">
                <div className="flex items-start justify-between gap-3">
                  <div><span className="text-sm text-amber-400">گام {item.id} از ۶</span><h2 className="text-base sm:text-lg font-black text-white mt-1">{item.title}</h2><p className="text-sm text-slate-300 leading-7 mt-2">{item.cinematicHeadline}</p></div>
                  {completedSteps.includes(item.id) ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <FileText className="w-5 h-5 text-slate-600 shrink-0" />}
                </div>
              </button>
            ))}
          </div>
        </motion.section>
      )}

      <AnimatePresence mode="wait">
        {exercise && (
          <motion.section key={exercise.id} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} className="rounded-3xl bg-slate-950/90 border border-slate-800 shadow-2xl overflow-hidden">
            <div className="relative p-5 sm:p-8 bg-gradient-to-b from-amber-500/10 to-transparent border-b border-slate-800">
              <button onClick={() => setCurrentStep(0)} className="text-sm text-slate-300 flex items-center gap-1.5 mb-5"><ArrowRight className="w-3.5 h-3.5" /> نمای کلی تمرین</button>
              <span className="text-sm text-amber-400">گام {exercise.id} از ۶</span>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden mt-3" aria-label={`پیشرفت: گام ${exercise.id} از ۶`}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${(exercise.id / 6) * 100}%` }} className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-yellow-300" />
              </div>
              <h1 className="text-xl sm:text-3xl font-black text-amber-100 mt-2">{exercise.title}</h1>
              <p className="text-base sm:text-xl font-bold text-white mt-4 leading-8">{exercise.cinematicHeadline}</p>
              <div className="mt-4 text-sm text-slate-400 flex items-start gap-2 leading-7"><Clock3 className="w-4 h-4 text-amber-400 mt-1 shrink-0" /><span>{exercise.visualScene}</span></div>
            </div>
            <div className="p-5 sm:p-8 space-y-7">
              <p className="whitespace-pre-line text-sm sm:text-base text-slate-200 leading-8">{exercise.originalText}</p>
              <div className="space-y-4 border-t border-slate-800 pt-6">
                {exercise.fields.map((field, index) => (
                  <label key={field} className="block space-y-2"><span className="block text-sm sm:text-base font-bold text-amber-200">{field}</span><textarea value={progress.reflections?.[100 + exercise.id * 10 + index] || ''} onChange={(event) => setAnswer(exercise.id, index, event.target.value)} rows={3} className="w-full resize-y rounded-xl border border-slate-700 bg-slate-900/80 p-3 text-base leading-8 text-slate-100 outline-none focus:border-amber-400" /></label>
                ))}
              </div>
              <button onClick={() => completeStep(exercise.id)} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-black text-sm flex items-center justify-center gap-2"><CheckCircle2 className="w-4 h-4" /><span>{exercise.id < 6 ? `ثبت گام ${exercise.id} و رفتن به گام بعد` : 'ثبت گام ششم'}</span></button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};
