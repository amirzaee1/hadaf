/**
 * GOAL DREAM - Cinematic Interactive Goal-Setting Workshop
 * Based on complete 13-stage educational journey with 3 typography levels,
 * visual metaphors, interactive moments, reflective journaling, and progress synthesis.
 */

import React, { useState, useEffect, useRef } from 'react';
import { CHAPTERS } from './data/chapters';
import { UserProgress } from './types';
import { CinematicCanvas } from './components/CinematicCanvas';
import { TimelineNav } from './components/TimelineNav';
import { PrologueHero } from './components/PrologueHero';
import { ChapterHeader } from './components/ChapterHeader';
import { MobileCinematicVisual } from './components/MobileCinematicVisual';
import { EducationalBody } from './components/EducationalBody';
import { ReflectionBox } from './components/ReflectionBox';
import { ChapterTransition } from './components/ChapterTransition';
import { DossierModal } from './components/DossierModal';
import { PersonalJourneyWorkshop } from './components/workshop/PersonalJourneyWorkshop';
import { MobileTopBar } from './components/mobile/MobileTopBar';
import { MobileTabBar, MobileTab } from './components/mobile/MobileTabBar';
import { MobileProfileView } from './components/mobile/MobileProfileView';
import { JourneyMap } from './components/core/JourneyMap';
import { loadUserProgress, saveUserProgress, INITIAL_USER_PROGRESS } from './utils/storage';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Sparkles, ArrowUp } from 'lucide-react';
import { soundEngine } from './utils/audio';
import { getChapterTheme } from './utils/chapterTheme';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => loadUserProgress());
  const [activeChapter, setActiveChapter] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<MobileTab>('journey');
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);
  const chapterRefs = useRef<Record<number, HTMLElement | null>>({});

  // Auto-save progress to local storage
  useEffect(() => {
    saveUserProgress(progress);
  }, [progress]);

  // Scroll detection to update activeChapter smoothly in journey view
  useEffect(() => {
    if (activeTab !== 'journey') return;

    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.35;
      for (let i = CHAPTERS.length; i >= 1; i--) {
        const el = chapterRefs.current[i];
        if (el && el.offsetTop <= scrollY) {
          setActiveChapter(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab]);

  const scrollToChapter = (id: number) => {
    setActiveChapter(id);
    setActiveTab('journey');
    setTimeout(() => {
      const el = chapterRefs.current[id];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const handleUpdateProgress = (updater: (prev: UserProgress) => UserProgress) => {
    setProgress((prev) => updater(prev));
  };

  const handleSaveReflection = (chapterId: number, text: string) => {
    setProgress((prev) => ({
      ...prev,
      reflections: {
        ...prev.reflections,
        [chapterId]: text,
      },
    }));
  };

  const handleCompleteChapter = (chapterId: number) => {
    setProgress((prev) => {
      const completed = prev.completedChapters.includes(chapterId)
        ? prev.completedChapters
        : [...prev.completedChapters, chapterId];
      return {
        ...prev,
        completedChapters: completed,
      };
    });
  };

  const handleResetProgress = () => {
    if (window.confirm('آیا مطمئن هستید که می‌خواهید پیشرفت خود را ریست کنید؟')) {
      setProgress(INITIAL_USER_PROGRESS);
      saveUserProgress(INITIAL_USER_PROGRESS);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#03060f] text-[#e2e8f0] relative selection:bg-amber-500/30 selection:text-amber-200">
      {/* Dynamic Cinematic Canvas Background */}
      <CinematicCanvas activeChapter={activeChapter} scrollProgress={0} />

      {/* Main Mobile Frame Container (Optimized for 390px - 430px mobile screens) */}
      <div className="w-full max-w-[430px] mx-auto min-h-screen bg-[#050811]/95 relative border-x border-slate-800/60 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col">
        {/* Native Mobile Top Bar */}
        <MobileTopBar
          currentChapter={activeChapter}
          totalChapters={CHAPTERS.length}
          habitStreak={progress.habitStreak || 0}
          onReset={handleResetProgress}
          onOpenMap={() => setActiveTab('map')}
        />

        {/* View Switcher based on Active Mobile Tab */}
        <div className="w-full flex-1 px-2.5 pt-3">
          <AnimatePresence mode="wait">
            {activeTab === 'journey' && (
              <motion.div
                key="tab-journey"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full space-y-10 pb-24"
              >
                {/* Hero Prologue Scene */}
                <PrologueHero onStartJourney={() => scrollToChapter(1)} />

                <section className="mx-2 -mt-6 overflow-hidden rounded-3xl border border-amber-500/20 bg-slate-950/85 shadow-2xl">
                  <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_.75fr] items-center">
                    <img
                      src="./assets/goal-dream/journey-isometric.webp"
                      alt="نقشه تصویری مسیر هدف‌گذاری"
                      className="w-full h-auto object-contain bg-gradient-to-b from-emerald-950/20 to-transparent"
                      width="1536"
                      height="1024"
                      loading="lazy"
                    />
                    <div className="p-5 text-right">
                      <span className="text-xs font-bold text-amber-400">نقشه راه تو</span>
                      <h2 className="mt-2 text-xl font-black leading-8 text-white">فقط یک قدم را در هر لحظه انجام بده</h2>
                      <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                        <p><strong className="text-amber-200">۱.</strong> متن هر مرحله را آرام بخوان.</p>
                        <p><strong className="text-amber-200">۲.</strong> پاسخ خودت را همان‌جا بنویس.</p>
                        <p><strong className="text-amber-200">۳.</strong> در پایان، تمرین شش‌گانه را کامل کن.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 13 CHAPTERS IN STRICT EDUCATIONAL ORDER */}
                <main className="space-y-12">
                  {CHAPTERS.map((chapter) => {
                    const theme = getChapterTheme(chapter.id);
                    return (
                      <section
                        key={chapter.id}
                        ref={(el) => (chapterRefs.current[chapter.id] = el)}
                        id={`chapter-${chapter.id}`}
                        className="chapter-journey relative min-h-[70vh] flex flex-col justify-center scroll-mt-20 py-7 rounded-[34px]"
                        style={{
                          '--chapter-accent': theme.accent,
                          '--chapter-accent-soft': theme.accentSoft,
                          '--chapter-glow': theme.glow,
                          '--chapter-surface': theme.surface,
                        } as React.CSSProperties}
                      >
                        {/* Dividing Beam */}
                        <div className="w-32 mx-auto h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mb-4" />

                        {/* 1. Chapter Header */}
                        <ChapterHeader chapter={chapter} />

                        {/* 2. Middle Cinematic Visual Metaphor */}
                        <div className="w-full my-2">
                          <MobileCinematicVisual
                            chapter={chapter}
                            progress={progress}
                            onUpdateProgress={handleUpdateProgress}
                          />
                        </div>

                        {/* 3. Educational Explanation */}
                        <EducationalBody chapter={chapter} />

                        {/* 4. Personal Reflection */}
                        <ReflectionBox
                          chapter={chapter}
                          progress={progress}
                          onSaveReflection={handleSaveReflection}
                          onCompleteChapter={handleCompleteChapter}
                        />

                        <ChapterTransition chapter={chapter} isLast={chapter.id === CHAPTERS.length} />
                      </section>
                    );
                  })}
                </main>

                {/* Epilogue Celebration & Summit Unveiling */}
                <section className="w-full text-center py-10">
                  <div className="cinematic-panel-gold p-6 rounded-3xl relative overflow-hidden space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 mx-auto shadow-[0_0_25px_rgba(245,158,11,0.3)]">
                      <Award className="w-7 h-7 text-amber-400" />
                    </div>

                    <h2 className="text-xl font-black text-white font-serif">
                      این تمرین را همین امروز شروع کنید.
                    </h2>

                    <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                      اگر پس از انجام تمرین نیاز به بازبینی یا تنظیم دقیق‌تر داشتید، می‌توانید نوشته‌های خود را بررسی کنید و مسیر را اصلاح کنید. با آرزوی موفقیت پایدار و رشد مستمر.
                    </p>

                    <div className="flex flex-col gap-2.5 pt-2">
                      <button
                        onClick={() => {
                          soundEngine.playChime(1046.5);
                          setActiveTab('workshop');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-black text-xs flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all active:scale-95"
                      >
                        <Sparkles className="w-4 h-4 text-black shrink-0" />
                        <span>ورود به تمرین عملی هدف‌گذاری (۶ گام)</span>
                      </button>

                      <button
                        onClick={() => {
                          soundEngine.playChime(880);
                          setActiveTab('profile');
                        }}
                        className="w-full py-3 px-4 rounded-2xl bg-slate-900 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                      >
                        <Award className="w-4 h-4 text-amber-400" />
                        <span>مشاهده و تکمیل پرونده من</span>
                      </button>

                      <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="w-full py-2 px-4 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 text-xs flex items-center justify-center gap-2"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                        <span>بازگشت به نقطه آغاز</span>
                      </button>
                    </div>
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'workshop' && (
              <motion.div
                key="tab-workshop"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full pb-28 pt-2"
              >
                <PersonalJourneyWorkshop
                  progress={progress}
                  onUpdateProgress={handleUpdateProgress}
                  onBackToJourney={() => {
                    setActiveTab('journey');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </motion.div>
            )}

            {activeTab === 'map' && (
              <motion.div
                key="tab-map"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full pb-28 pt-3"
              >
                <JourneyMap
                  progress={progress}
                  activeChapter={activeChapter}
                  onSelectChapter={(id) => scrollToChapter(id)}
                />
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div
                key="tab-profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full pb-28 pt-3"
              >
                <MobileProfileView
                  progress={progress}
                  onUpdateProgress={handleUpdateProgress}
                  onResetProgress={handleResetProgress}
                  onOpenWorkshop={() => setActiveTab('workshop')}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Native Mobile Bottom Navigation Bar */}
        <MobileTabBar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          completedChaptersCount={progress.completedChapters.length}
          totalChaptersCount={CHAPTERS.length}
          habitStreak={progress.habitStreak || 0}
        />
      </div>

      {/* Dossier Modal (Accessible anytime) */}
      <DossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        progress={progress}
      />
    </div>
  );
}
