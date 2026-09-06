import { UserProgress } from '../types';

const STORAGE_KEY = 'goal_dream_mobile_journey_v2';

export const INITIAL_USER_PROGRESS: UserProgress = {
  userName: 'مسافر حقیقت',
  creationDate: new Date().toISOString().split('T')[0],
  lastActiveDate: new Date().toISOString().split('T')[0],
  milestones: [
    { id: 'm1', title: 'خاتمه لیست انزجار و کشف درد اولیه', targetDate: 'هفته اول', isCompleted: true },
    { id: 'm2', title: 'برافراشتن سه ستون ارزش‌های شخصی', targetDate: 'هفته دوم', isCompleted: false },
    { id: 'm3', title: 'تثبیت عادت روزانه ۳۰ دقیقه تمرکز عمیق', targetDate: 'هفته چهارم', isCompleted: false },
    { id: 'm4', title: 'تحقق اولین شاخص کلیدی هدف SMART', targetDate: 'ماه سوم', isCompleted: false },
  ],
  currentChapter: 1,
  completedChapters: [1],
  startingState: 'seeking_clarity',
  initialFeeling: 'آماده برای رویارویی با حقیقت درون و ساختن مسیری واقعی',
  identifiedTraps: [],
  initialCovenantSigned: false,
  painStones: [
    'سردرگمی و عدم تمرکز در انتخاب اولویت‌ها',
    'به تعویق انداختن تصمیم‌های سرنوشت‌ساز',
    'مقایسه بیهوده با موفقیت‌های ظاهری دیگران'
  ],
  transformedFuel: false,
  borrowedFilteredGoals: {
    authenticGoal: '',
    isExtrinsicChecked: false,
  },
  lighthouseDirections: ['رشد و تسلط شخصی', 'آزادی و استقلال پایدار', 'خلق ارزش برای انسان‌ها'],
  horizonClarity: 75,
  oceanCalmLevel: 60,
  lifeDots: [
    { id: '1', title: 'تصمیم به شروع کارآفرینی', lesson: 'شجاعت در دل ابهام شکوفا می‌شود', year: '۱۳۹۸' },
    { id: '2', title: 'شکست پروژه اول', lesson: 'بزرگترین معلم انسان، بازخورد واقعیت است', year: '۱۴۰۰' },
    { id: '3', title: 'کشف نقطه قوت اصلی در تدریس و تحلیل', lesson: 'جریان واقعی انرژی در رسالت اصیل است', year: '۱۴۰۲' },
  ],
  logicEmotionBalance: 50,
  ignoredOpportunities: [],
  dreamTransformationStage: 2,
  dreamObjectTitle: 'اکوسیستم آموزشی خودکفا',
  personalityWorld: 'green',
  coreValues: ['آزادی و استقلال', 'صداقت و اصالت', 'رشد مستمر', 'خدمت به انسان‌ها'],
  foundationPillars: [
    { value: 'آزادی و خودمختاری (Freedom)', priority: 1, explanation: 'ستون اساسی زندگی بدون وابستگی تحمیلی' },
    { value: 'رشد و تسلط درونی (Mastery)', priority: 2, explanation: 'یادگیری بی‌پایان و تعالی قابلیت‌های فردی' },
    { value: 'امنیت و استقلال مالی (Security)', priority: 3, explanation: 'پایه‌ای محکم برای بخشش و آسودگی خیال' },
  ],
  limitingBelief: 'شاید سن من برای تحول ریشه‌ای بالا رفته باشد...',
  empoweringBelief: 'هر نفس، یک شانس مجدد است؛ سن، توشه تجربه من برای پروازی دقیق‌تر است.',
  glassWallShattered: false,
  fiveYearVision: {
    mind: 'آرامش، تمرکز عمیق، غلبه بر حواس‌پرتی‌های عصر دیجیتال',
    health: 'بدنی ورزیده، خواب باکیفیت و انرژی پایدار در طول روز',
    career: 'خلق سازمان پیشرو در آموزش و مشاوره استراتژیک',
    wealth: 'درآمد غیرفعال پایدار و جریان‌های مالی متنوع',
    relationships: 'پیوند عمیق با خانواده، دوستان خردمند و همراهان وفادار',
  },
  smartGoal: {
    specific: 'راه‌اندازی پلتفرم تخصصی آموزش مهارت‌های فردی با ۱۰,۰۰۰ کاربر وفادار',
    measurable: 'کسب امتیاز رضایت بالای ۹۵٪ و درآمد ماهانه پایدار',
    achievable: 'استفاده از شبکه ارتباطی موجود، تولید محتوای روزانه و تسلط بر محصول',
    relevant: 'هم‌راستا با ارزش‌های اصیل من: آزادی، آموزش و تعالی جامعه',
    timeBound: '۳۱ شهریور ۱۴۰۵',
    burningWhy: 'تا هرگز در واپسین لحظات زندگی، حسرت استعدادهای دست‌نخورده را بر سینه نداشته باشم.',
  },
  dailyRituals: {
    morningAction: '۱۰ دقیقه سکوت، بازبینی قطب‌نما و نوشیدن آب خنک',
    twoMinuteRule: 'پاسخ فوری به ایده‌های خلاقانه و نگارش بی‌درنگ آنها',
    weeklyReviewDay: 'عصر جمعه‌ها: جلسه صادقانه با خویشتن',
    identityStatement: 'من معماری متعهد هستم که رویاهایش را با سنگ‌های تلاش روزانه بنا می‌کند.',
  },
  reflections: {
    1: 'فهمیدم که شروع واقعی نه از امید کاذب، بلکه از پذیرش شفاف وضعیت اکنون آغاز می‌شود.',
    2: 'تله‌های مسیر گذشته من عمدتاً انگیزه مقطعی و اهداف عاریه‌ای از دیگران بود.',
  },
  workshopCompletedSteps: [1, 2, 4],
  backpackStones: [
    { id: 's1', unwanted: 'اضطراب از قضاوت و حرف مردم', transformed: 'تمرکز صددرصدی بر رسالت درونی بدون نیاز به تایید بیرونی', isTransformed: true },
    { id: 's2', unwanted: 'اهمال‌کاری در پروژه‌های سخت', transformed: 'خرد کردن وظایف به قدم‌های ۲ دقیقه‌ای لذت‌بخش', isTransformed: true },
    { id: 's3', unwanted: 'سردرگمی در اولویت‌های روزانه', transformed: 'پیمان وفاداری به یک مأموریت اصلی تا رسیدن به خط پایان', isTransformed: false },
  ],
  futureVisionWorld: {
    location: 'خانه‌ای نورگیر در کرانه کوهستان و دسترسی به فضای سبز آرام',
    occupation: 'هدایت اندیشکده آموزشی و تدریس برای نسل جستجوگر',
    companion: 'همسری همدل، فرزندانی شاداب و یاران متفکر',
    feeling: 'آرامش عمیق، اعتماد به نفس سرشار و اشتیاق وافر برای خلق',
  },
  goalEngineProfile: {
    archetype: 'green',
    strengths: ['تفکر ساختاریافته', 'پایبندی به فرآیندها', 'دقت و پایداری در بلندمدت'],
    motivations: 'دیدن کارکرد هماهنگ یک سیستم بدون اصطکاک',
    preferredGoalStyle: 'اهداف شفاف با شاخص‌های عددی و چک‌لیست‌های پیش‌رونده',
  },
  smartBuilding: {
    specific: 'تاسیس استودیوی تولید محتوای آموزشی و انتشار اولین دوره جامع',
    measurable: 'ثبت‌نام ۱,۰۰۰ شرکت‌کننده هدفمند و ارزیابی رضایت ۹۴٪',
    achievable: 'برنامه‌ریزی روزانه ۳ ساعت ضبط و تدوین در ۶ ماه آینده',
    relevant: 'دقیقاً مطابق با ارزش بنیادی آموزش و استقلال',
    timeBound: '۲۹ اسفند ۱۴۰۴',
    firstAction: 'نگارش سرفصل‌های ۳ ویدیوی اول در دفترچه کارگاه امروز',
    isCompleted: true,
  },
  deepWhyRoots: [
    'تا پتانسیل‌های بی‌نظیری که پروردگار در وجودم به ودیعه گذاشته هدر نرود',
    'چون فرزندانم نیازمند دیدن الگویی زنده از پایداری و شجاعت هستند',
    'تا حسرت روزهای تلف‌شده هرگز سد راه لبخند و رضایت قلبی‌ام نشود',
    'برای اثبات این حقیقت که تقدیر به دست اراده آگاهانه دگرگون می‌شود',
    'برای ساختن پناهگاهی امن و مستقل از نظر معنوی و مادی برای عزیزانم',
  ],
  contractAgreement: {
    commitment: 'من سوگند یاد می‌کنم که تسلیم وسوسه راحتی مقطعی نشوم و تا پایان این مأموریت استوار بمانم.',
    priceToPay: 'گذشتن از خواب‌های طولانی، تفریحات بی‌ثمر و مقاومت در برابر منفی‌بافی‌های محیط',
    dailyPromise: 'حداقل ۴۵ دقیقه تمرکز خالص بدون تلفن همراه برای پیشبرد سنگفرش هدف اصلی',
    signedDate: new Date().toLocaleDateString('fa-IR'),
    signatureName: 'مسافر پایدار',
  },
  habitPathStones: [
    { id: 'h1', title: '۳۰ دقیقه کار متمرکز روی هدف اصلی (Deep Work)', completedDays: 14, isDoneToday: true },
    { id: 'h2', title: 'مطالعه ۱۵ صفحه از کتب مرجع استراتژی و روانشناسی', completedDays: 9, isDoneToday: true },
    { id: 'h3', title: 'بازبینی شبانه قطب‌نما و شکرگزاری از سه پیروزی روز', completedDays: 21, isDoneToday: false },
  ],
  habitStreak: 14,
  tripleReviews: {
    weekly: {
      progress: 'سه گام اول ضبط ویدیو انجام شد و جدول زمانی تثبیت شد.',
      obstacles: 'کمبود وقت در بعدازظهرها به دلیل جلسات پراکنده',
      adjustments: 'انتقال ساعات ضبط به صبح زود ساعت ۶:۰۰ الی ۸:۰۰',
    },
    monthly: {
      alignment: 'کاملاً با ارزش استقلال هم‌راستاست و احساس سبکی فوق‌العاده‌ای دارم.',
      energy: 'انرژی رو به افزایش با حفظ ریتم خواب منظم',
    },
    quarterly: {
      goalUpdate: 'اضافه کردن فاز انتشار بین‌المللی به نقشه راه SMART',
      newDirection: 'توسعه جامعه اختصاصی دانش‌آموختگان متعهد',
    },
  },
};

export const loadUserProgress = (): UserProgress => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return INITIAL_USER_PROGRESS;
    const parsed = JSON.parse(saved);
    // Merge with defaults in case of missing keys
    return {
      ...INITIAL_USER_PROGRESS,
      ...parsed,
      milestones: parsed.milestones || INITIAL_USER_PROGRESS.milestones,
      habitPathStones: parsed.habitPathStones || INITIAL_USER_PROGRESS.habitPathStones,
      deepWhyRoots: parsed.deepWhyRoots || INITIAL_USER_PROGRESS.deepWhyRoots,
    };
  } catch (err) {
    console.error('Failed to load user progress:', err);
    return INITIAL_USER_PROGRESS;
  }
};

export const saveUserProgress = (progress: UserProgress): void => {
  try {
    const toSave = {
      ...progress,
      lastActiveDate: new Date().toISOString().split('T')[0],
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (err) {
    console.error('Failed to save user progress:', err);
  }
};

export const exportUserDataJSON = (progress: UserProgress): void => {
  const jsonString = JSON.stringify(progress, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `goal-dream-mission-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const importUserDataJSON = (
  file: File,
  onSuccess: (imported: UserProgress) => void,
  onError: (err: string) => void
): void => {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const content = e.target?.result as string;
      const parsed = JSON.parse(content);
      if (!parsed || typeof parsed !== 'object') {
        throw new Error('فایل نامعتبر است.');
      }
      saveUserProgress(parsed);
      onSuccess(parsed);
    } catch (err) {
      onError('فایل JSON معتبر برای کارگاه هدف‌گذاری نیست.');
    }
  };
  reader.readAsText(file);
};
