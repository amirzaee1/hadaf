/**
 * LAYER 3: USER DATA - GOAL DATA
 * Models, validators, and synthesizers for user goals, 5-year vision,
 * and SMART blueprints.
 */

import { UserProgress } from '../types';

export interface SmartGoalData {
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: string;
  burningWhy: string;
  firstAction?: string;
  isValidated: boolean;
}

export interface FiveYearVisionData {
  mind: string;
  health: string;
  career: string;
  wealth: string;
  relationships: string;
  location?: string;
  feeling?: string;
}

export function extractUserSmartGoal(progress: UserProgress): SmartGoalData {
  const specific = progress.smartBuilding?.specific || progress.smartGoal?.specific || '';
  const measurable = progress.smartBuilding?.measurable || progress.smartGoal?.measurable || '';
  const achievable = progress.smartBuilding?.achievable || progress.smartGoal?.achievable || '';
  const relevant = progress.smartBuilding?.relevant || progress.smartGoal?.relevant || '';
  const timeBound = progress.smartBuilding?.timeBound || progress.smartGoal?.timeBound || '';
  const burningWhy = progress.deepWhy || progress.smartGoal?.burningWhy || '';
  const firstAction = progress.smartBuilding?.firstAction || '';

  const isValidated = Boolean(
    specific.trim().length > 3 &&
    measurable.trim().length > 1 &&
    timeBound.trim().length > 2
  );

  return {
    specific,
    measurable,
    achievable,
    relevant,
    timeBound,
    burningWhy,
    firstAction,
    isValidated,
  };
}

export function extractUserVision(progress: UserProgress): FiveYearVisionData {
  return {
    mind: progress.fiveYearVision?.mind || 'ذهنی آرام، متمرکز و رها از اضطراب',
    health: progress.fiveYearVision?.health || 'انرژی سرشار و بدن متناسب با ورزش مستمر',
    career: progress.fiveYearVision?.career || progress.futureVisionWorld?.occupation || 'رهبری خلاق و خلق ارزش ماندگار',
    wealth: progress.fiveYearVision?.wealth || 'استقلال مالی پایدار و جریان ثروت حلال',
    relationships: progress.fiveYearVision?.relationships || progress.futureVisionWorld?.companion || 'روابط عمیق و پرمهر با یاران حقیقی',
    location: progress.futureVisionWorld?.location || 'خانه‌ای پرنور و در محاصره آرامش',
    feeling: progress.futureVisionWorld?.feeling || 'رضایت ژرف از تحقق مأموریت الهی',
  };
}
