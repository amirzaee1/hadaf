import { UserProgress } from '../types';

const STORAGE_KEY = 'goal_dream_mobile_journey_v3';
const today = new Date().toISOString().slice(0, 10);

export const INITIAL_USER_PROGRESS: UserProgress = {
  userName: 'مسافر مسیر', creationDate: today, lastActiveDate: today, milestones: [],
  currentChapter: 1, completedChapters: [], startingState: '', initialFeeling: '',
  identifiedTraps: [], initialCovenantSigned: false, painStones: [], transformedFuel: false,
  borrowedFilteredGoals: { authenticGoal: '', isExtrinsicChecked: false },
  lighthouseDirections: [], horizonClarity: 0, oceanCalmLevel: 0, lifeDots: [],
  logicEmotionBalance: 50, ignoredOpportunities: [], dreamTransformationStage: 0, dreamObjectTitle: '',
  coreValues: [], foundationPillars: [], limitingBelief: '', empoweringBelief: '', glassWallShattered: false,
  fiveYearVision: { mind: '', health: '', career: '', wealth: '', relationships: '' },
  smartGoal: { specific: '', measurable: '', achievable: '', relevant: '', timeBound: '', burningWhy: '' },
  dailyRituals: { morningAction: '', twoMinuteRule: '', weeklyReviewDay: '', identityStatement: '' },
  reflections: {}, savedSentences: [], workshopCompletedSteps: [], backpackStones: [],
  futureVisionWorld: { location: '', occupation: '', companion: '', feeling: '' },
  deepWhyRoots: [], habitPathStones: [], habitStreak: 0,
  tripleReviews: {
    weekly: { progress: '', obstacles: '', adjustments: '' },
    monthly: { alignment: '', energy: '' },
    quarterly: { goalUpdate: '', newDirection: '' },
  },
};

export const loadUserProgress = (): UserProgress => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return { ...INITIAL_USER_PROGRESS };
    const parsed = JSON.parse(saved);
    return {
      ...INITIAL_USER_PROGRESS,
      ...parsed,
      completedChapters: Array.isArray(parsed.completedChapters) ? parsed.completedChapters : [],
      reflections: parsed.reflections || {},
      savedSentences: Array.isArray(parsed.savedSentences) ? parsed.savedSentences : [],
      workshopCompletedSteps: Array.isArray(parsed.workshopCompletedSteps) ? parsed.workshopCompletedSteps : [],
      fiveYearVision: { ...INITIAL_USER_PROGRESS.fiveYearVision, ...(parsed.fiveYearVision || {}) },
      smartGoal: { ...INITIAL_USER_PROGRESS.smartGoal, ...(parsed.smartGoal || {}) },
      dailyRituals: { ...INITIAL_USER_PROGRESS.dailyRituals, ...(parsed.dailyRituals || {}) },
      borrowedFilteredGoals: { ...INITIAL_USER_PROGRESS.borrowedFilteredGoals, ...(parsed.borrowedFilteredGoals || {}) },
      tripleReviews: parsed.tripleReviews || INITIAL_USER_PROGRESS.tripleReviews,
    };
  } catch {
    return { ...INITIAL_USER_PROGRESS };
  }
};

export const saveUserProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...progress, lastActiveDate: new Date().toISOString().slice(0, 10) }));
  } catch { /* local storage may be unavailable in private mode */ }
};

export const exportUserDataJSON = (progress: UserProgress): void => {
  const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `goal-dream-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
};

export const importUserDataJSON = (file: File, onSuccess: (imported: UserProgress) => void, onError: (error: string) => void): void => {
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const parsed = JSON.parse(event.target?.result as string);
      if (!parsed || typeof parsed !== 'object') throw new Error('invalid');
      const imported = { ...INITIAL_USER_PROGRESS, ...parsed } as UserProgress;
      saveUserProgress(imported);
      onSuccess(imported);
    } catch { onError('فایل انتخاب‌شده، نسخه معتبر Goal Dream نیست.'); }
  };
  reader.readAsText(file);
};
