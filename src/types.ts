export interface ChapterData {
  id: number;
  chapter_id?: number;
  slug: string;
  romanNumeral: string;
  titleFa: string;
  titleEn: string;
  // Layer 1 Content Database Aliases & Structured Schema
  title?: string;
  original_title?: string;
  original_text?: string;
  cinematic_headline?: string;
  visual_scene?: string;
  scroll_animation?: string;
  originalText?: {
    lead: string;
    sections: {
      heading?: string;
      paragraphs: string[];
      keyTakeaway?: string;
    }[];
    fullTextSummary?: string;
  };
  cinematicHeadline?: string;
  visualScene?: {
    metaphorName: string;
    metaphorDesc: string;
    componentKey: string;
  };
  animation?: {
    scrollBehavior: string;
    lightingTransition: string;
  };
  interaction?: string | {
    exerciseTitle: string;
    exerciseType: string;
    reflectionQuestion: string;
  };
  level1Quote: string;
  level1Subquote?: string;
  visualMetaphorName: string;
  visualMetaphorDesc: string;
  level2Text: {
    lead: string;
    sections: {
      heading?: string;
      paragraphs: string[];
      keyTakeaway?: string;
    }[];
  };
  level3Prompt: string;
  interactiveType:
    | 'starting_state'
    | 'failure_traps'
    | 'golden_principles'
    | 'borrowed_goals'
    | 'lighthouse_align'
    | 'life_constellation'
    | 'behavior_alignment'
    | 'personality_archetype'
    | 'values_discovery'
    | 'limiting_beliefs'
    | 'five_year_vision'
    | 'smart_builder'
    | 'daily_rituals'
    | 'crossroads_choice'
    | 'ignored_opportunities'
    | 'dream_to_reality'
    | 'personality_worlds'
    | 'values_foundation'
    | 'glass_room_shatter'
    | 'personal_workshop_mode'
    | 'three_lists_builder'
    | 'antagonism_list';
  reflectionPrompt: string;
}

export interface GoalMilestone {
  id: string;
  title: string;
  targetDate: string;
  isCompleted: boolean;
}

export interface UserProgress {
  // User Profile
  userName: string;
  creationDate: string;
  lastActiveDate: string;
  milestones: GoalMilestone[];

  currentChapter: number;
  completedChapters: number[];
  
  // Chapter 1
  startingState?: string;
  initialFeeling?: string;
  
  // Chapter 2
  identifiedTraps: string[];
  pastLesson?: string;
  deepWhy?: string; // The core deep why (چرا این هدف برای تو مهم است؟)
  
  // Chapter 3
  goldenPillarPriority?: string;
  initialCovenantSigned: boolean;
  painStones?: string[]; // The stones of pain transformed into direction markers
  transformedFuel?: boolean;
  
  // Chapter 4 (Crossroads)
  borrowedFilteredGoals: {
    authenticGoal: string;
    isExtrinsicChecked: boolean;
  };
  selectedRoad?: number; // 1: Social, 2: Comparison, 3: Expectations, 4: Authentic
  
  // Chapter 5 (Lighthouse Ocean)
  lighthouseDirections: string[];
  horizonClarity: number; // 0-100
  oceanCalmLevel?: number; // 0-100
  
  // Chapter 6 (Life Points Constellation)
  lifeDots: { id: string; title: string; lesson: string; category?: 'experience' | 'failure' | 'learning' | 'meeting' | 'decision'; year?: string }[];
  
  // Chapter 7 (Opportunities & Awareness)
  logicEmotionBalance: number; // 0 - 100
  unconsciousTrigger?: string;
  ignoredOpportunities?: string[];
  
  // Chapter 8 (Understanding Goals: Cloud to Reality)
  personalityArchetype?: string;
  flowActivity?: string;
  dreamTransformationStage?: number; // 1: Cloud, 2: Sketch, 3: Blueprint, 4: Real object
  dreamObjectTitle?: string;
  
  // Chapter 9 (Personality Worlds: Red, Yellow, Blue, Green)
  coreValues: string[];
  valuePillarsReflection?: string;
  personalityWorld?: 'red' | 'yellow' | 'blue' | 'green';
  
  // Chapter 10 (Values Foundation)
  foundationPillars?: {
    value: string;
    priority: number;
    explanation: string;
  }[];
  
  // Chapter 11 (Mental Limitations: Glass Room)
  limitingBelief?: string;
  empoweringBelief?: string;
  glassWallShattered?: boolean;
  
  // Chapter 12 (Personal Workshop Mode)
  workshopActiveTab?: number;
  fiveYearVision: {
    mind: string;
    health: string;
    career: string;
    wealth: string;
    relationships: string;
  };
  smartGoal: {
    specific: string;
    measurable: string;
    achievable: string;
    relevant: string;
    timeBound: string;
    burningWhy: string;
  };
  
  // Chapter 13
  dailyRituals: {
    morningAction: string;
    twoMinuteRule: string;
    weeklyReviewDay: string;
    identityStatement: string;
  };
  covenantSealDate?: string;
  userSignatureName?: string;

  // Reflections for all chapters
  reflections: Record<number, string>;

  // PART 4: INTERACTIVE PERSONAL JOURNEY WORKSHOP
  workshopCompletedSteps?: number[];
  backpackStones?: {
    id: string;
    unwanted: string;
    transformed: string;
    isTransformed: boolean;
  }[];
  futureVisionWorld?: {
    location: string;
    occupation: string;
    companion: string;
    feeling: string;
  };
  goalEngineProfile?: {
    archetype: 'red' | 'yellow' | 'blue' | 'green';
    strengths: string[];
    motivations: string;
    preferredGoalStyle: string;
  };
  smartBuilding?: {
    specific: string;
    measurable: string;
    achievable: string;
    relevant: string;
    timeBound: string;
    firstAction: string;
    isCompleted: boolean;
  };
  deepWhyRoots?: string[];
  contractAgreement?: {
    commitment: string;
    priceToPay: string;
    dailyPromise: string;
    signedDate?: string;
    signatureName?: string;
  };
  habitPathStones?: {
    id: string;
    title: string;
    completedDays: number;
    isDoneToday: boolean;
  }[];
  habitStreak?: number;
  tripleReviews?: {
    weekly: { progress: string; obstacles: string; adjustments: string };
    monthly: { alignment: string; energy: string };
    quarterly: { goalUpdate: string; newDirection: string };
  };
}
