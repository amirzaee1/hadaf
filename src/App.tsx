import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, Compass } from 'lucide-react';
import { CHAPTERS } from './data/chapters';
import { UserProgress } from './types';
import { CinematicCanvas } from './components/CinematicCanvas';
import { PrologueHero } from './components/PrologueHero';
import { ChapterHeader } from './components/ChapterHeader';
import { MobileCinematicVisual } from './components/MobileCinematicVisual';
import { EducationalBody } from './components/EducationalBody';
import { ReflectionBox } from './components/ReflectionBox';
import { ChapterTransition } from './components/ChapterTransition';
import { PersonalJourneyWorkshop } from './components/workshop/PersonalJourneyWorkshop';
import { MobileTopBar } from './components/mobile/MobileTopBar';
import { MobileTabBar, MobileTab } from './components/mobile/MobileTabBar';
import { MobileProfileView } from './components/mobile/MobileProfileView';
import { JourneyMap } from './components/core/JourneyMap';
import { getEditorialImageSrc } from './components/FlatStoryIllustration';
import { CinematicReveal } from './components/CinematicReveal';
import { loadUserProgress, saveUserProgress, INITIAL_USER_PROGRESS } from './utils/storage';
import { getChapterTheme } from './utils/chapterTheme';

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

export default function App() {
  const initial = useMemo(() => loadUserProgress(), []);
  const [progress, setProgress] = useState<UserProgress>(initial);
  const [activeChapter, setActiveChapter] = useState(() => Math.min(13, Math.max(1, initial.currentChapter || 1)));
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [activeTab, setActiveTab] = useState<MobileTab>('journey');

  useEffect(() => saveUserProgress(progress), [progress]);

  const chapter = CHAPTERS[activeChapter - 1];
  const chapterCompleted = progress.completedChapters.includes(activeChapter);
  const updateProgress = (updater: (prev: UserProgress) => UserProgress) => setProgress((prev) => updater(prev));

  const openChapter = (id: number) => {
    const firstIncomplete = CHAPTERS.find((item) => !progress.completedChapters.includes(item.id))?.id || CHAPTERS.length;
    if (id > firstIncomplete && !progress.completedChapters.includes(id)) return;
    setJourneyStarted(true);
    setActiveChapter(id);
    setActiveTab('journey');
    setProgress((prev) => ({ ...prev, currentChapter: id }));
    setTimeout(scrollTop, 40);
  };

  const saveReflection = (chapterId: number, text: string) => {
    setProgress((prev) => ({ ...prev, reflections: { ...prev.reflections, [chapterId]: text } }));
  };

  const completeChapter = (chapterId: number) => {
    setProgress((prev) => ({
      ...prev,
      completedChapters: prev.completedChapters.includes(chapterId) ? prev.completedChapters : [...prev.completedChapters, chapterId],
    }));
  };

  const nextChapter = () => {
    if (!chapterCompleted || activeChapter >= CHAPTERS.length) return;
    const next = activeChapter + 1;
    setActiveChapter(next);
    setProgress((prev) => ({ ...prev, currentChapter: next }));
    setTimeout(scrollTop, 40);
  };

  const resetProgress = () => {
    if (!window.confirm('همه پاسخ‌ها و پیشرفت پاک شود؟')) return;
    const today = new Date().toISOString().slice(0, 10);
    const fresh = { ...INITIAL_USER_PROGRESS, creationDate: today, lastActiveDate: today };
    setProgress(fresh);
    saveUserProgress(fresh);
    setActiveChapter(1);
    setJourneyStarted(false);
    setActiveTab('journey');
    scrollTop();
  };

  const selectTab = (tab: MobileTab) => {
    setActiveTab(tab);
    if (tab === 'journey' && progress.completedChapters.length > 0) setJourneyStarted(true);
    scrollTop();
  };

  const theme = getChapterTheme(chapter.id);

  return (
    <div className="relative min-h-screen bg-[#03060f] text-slate-200 selection:bg-amber-500/30 selection:text-amber-100">
      <CinematicCanvas activeChapter={activeChapter} scrollProgress={0} />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[430px] flex-col border-x border-slate-800/60 bg-[#050811]/96 shadow-[0_0_50px_rgba(0,0,0,.8)]">
        <MobileTopBar currentChapter={activeChapter} totalChapters={CHAPTERS.length} habitStreak={progress.habitStreak || 0} journeyStarted={journeyStarted} onReset={resetProgress} onOpenMap={() => selectTab('map')} />

        <div className="w-full flex-1 px-2.5 pt-3">
          <AnimatePresence mode="wait">
            {activeTab === 'journey' && (
              <motion.div key={`journey-${journeyStarted}-${activeChapter}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="w-full pb-28">
                {!journeyStarted ? (
                  <div className="space-y-5">
                    <PrologueHero
                      onStartJourney={() => openChapter(1)}
                      resumeChapter={progress.currentChapter > 1 || progress.completedChapters.length > 0 ? activeChapter : undefined}
                      onResumeJourney={() => openChapter(activeChapter)}
                    />
                    <section className="mx-1 overflow-hidden rounded-[28px] border border-amber-500/25 bg-slate-950/88 shadow-xl">
                      <CinematicReveal
                        beforeSrc={getEditorialImageSrc(13, 0)}
                        afterSrc={getEditorialImageSrc(13, 2)}
                        beforeAlt="مسیر بلند هدف"
                        afterAlt="سه قدم روشن روزانه"
                        eyebrow="نقشهٔ راه تو"
                        title="کوه را نبین؛ قدم بعد را ببین"
                        instruction="تصویر را لمس کن تا مسیر به سه حرکت ساده تبدیل شود."
                        result="بخوان، پاسخ بده و فقط با انتخاب خودت مرحلهٔ بعد را باز کن."
                        accent="#fbbf24"
                        compact
                        className="rounded-none border-0 border-b border-white/10"
                      />
                      <div className="p-5 text-right">
                        <span className="text-xs font-black text-amber-400">نقشه راه تو</span>
                        <h2 className="mt-1.5 text-xl font-black leading-8 text-white">هر بار فقط یک قدم</h2>
                        <div className="mt-4 space-y-2.5">
                          {['متن همین مرحله را آرام بخوان.', 'پاسخ واقعی خودت را همان‌جا بنویس.', 'با دکمه، مرحله بعد را خودت باز کن.'].map((item, index) => (
                            <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-3 text-[13px] leading-6 text-slate-300">
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 font-black text-amber-300">{index + 1}</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  </div>
                ) : (
                  <main>
                    <section id={`chapter-${chapter.id}`} className="relative rounded-[32px] py-5" style={{ '--chapter-accent': theme.accent, '--chapter-accent-soft': theme.accentSoft, '--chapter-glow': theme.glow, '--chapter-surface': theme.surface } as React.CSSProperties}>
                      <button onClick={() => selectTab('map')} className="mb-3 flex min-h-10 items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/75 px-3 text-[11px] font-bold text-slate-400">
                        <Compass className="h-4 w-4 text-amber-400" /> نقشه ۱۳ مرحله‌ای
                      </button>
                      <ChapterHeader chapter={chapter} />
                      <MobileCinematicVisual chapter={chapter} progress={progress} onUpdateProgress={updateProgress} />
                      <EducationalBody chapter={chapter} />
                      <ReflectionBox chapter={chapter} progress={progress} onSaveReflection={saveReflection} onCompleteChapter={completeChapter} />
                      <ChapterTransition chapter={chapter} isLast={chapter.id === CHAPTERS.length} isCompleted={chapterCompleted} onNext={nextChapter} onOpenWorkshop={() => selectTab('workshop')} />
                    </section>
                  </main>
                )}
              </motion.div>
            )}

            {activeTab === 'workshop' && <motion.div key="workshop" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pb-28"><PersonalJourneyWorkshop progress={progress} onUpdateProgress={updateProgress} onBackToJourney={() => selectTab('journey')} /></motion.div>}

            {activeTab === 'map' && (
              <motion.div key="map" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pb-28 pt-2">
                <JourneyMap progress={progress} activeChapter={activeChapter} onSelectChapter={openChapter} />
                {!journeyStarted && <button onClick={() => openChapter(1)} className="mt-4 flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 font-black text-slate-950"><ArrowLeft className="h-4 w-4" /> شروع از مرحله اول</button>}
              </motion.div>
            )}

            {activeTab === 'profile' && <motion.div key="profile" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pb-28 pt-2"><MobileProfileView progress={progress} onUpdateProgress={updateProgress} onResetProgress={resetProgress} onOpenWorkshop={() => selectTab('workshop')} /></motion.div>}
          </AnimatePresence>
        </div>

        <MobileTabBar activeTab={activeTab} onSelectTab={selectTab} completedChaptersCount={progress.completedChapters.length} totalChaptersCount={CHAPTERS.length} habitStreak={progress.habitStreak || 0} />
      </div>
    </div>
  );
}
