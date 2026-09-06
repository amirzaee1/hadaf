/**
 * LAYER 3: USER DATA - USER JOURNEY ENGINE
 * Handles user progress calculation, chapter completions, path lighting,
 * and journey synthesis.
 */

import { UserProgress, ChapterData } from '../types';
import { CHAPTERS } from './chapters';

export interface JourneyStats {
  completedCount: number;
  totalChapters: number;
  completionPercentage: number;
  unlockedPathSections: number[];
  activeChapterId: number;
  isJourneyComplete: boolean;
  totalReflectionsCount: number;
  hasCovenantSigned: boolean;
}

export function computeJourneyStats(progress: UserProgress, activeChapter: number): JourneyStats {
  const totalChapters = CHAPTERS.length;
  const completedCount = progress.completedChapters.length;
  const completionPercentage = Math.round((completedCount / totalChapters) * 100);
  const totalReflectionsCount = Object.keys(progress.reflections || {}).filter(
    (k) => Boolean(progress.reflections[Number(k)]?.trim())
  ).length;

  return {
    completedCount,
    totalChapters,
    completionPercentage,
    unlockedPathSections: progress.completedChapters,
    activeChapterId: activeChapter,
    isJourneyComplete: completedCount === totalChapters,
    totalReflectionsCount,
    hasCovenantSigned: Boolean(progress.initialCovenantSigned || progress.covenantSealDate || progress.contractAgreement?.signedDate),
  };
}

export function isChapterUnlocked(chapterId: number, progress: UserProgress): boolean {
  if (chapterId === 1) return true;
  // Free movement or gated by prior completion
  return progress.completedChapters.includes(chapterId - 1) || progress.completedChapters.includes(chapterId);
}

export function getPathIlluminationColor(chapterId: number, progress: UserProgress): string {
  if (progress.completedChapters.includes(chapterId)) {
    return 'from-amber-400 via-yellow-300 to-amber-500'; // Fully illuminated golden path
  }
  if (progress.currentChapter === chapterId) {
    return 'from-amber-500/60 via-amber-400/40 to-slate-800'; // Active glowing pulse
  }
  return 'from-slate-800 via-slate-900 to-slate-950'; // Misty unlit path
}
