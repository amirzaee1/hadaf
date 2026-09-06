import React from 'react';
import {
  AlarmClock, ArrowLeftRight, Backpack, BadgeDollarSign, Blend, Brain,
  CalendarCheck2, CalendarRange, Car, CheckCircle2, CircleHelp, Clock3,
  CloudRain, Crown, DoorOpen, Ear, EyeOff, FileX2, Footprints, Hand,
  Heart, History, Lamp, Layers3, LayoutGrid, LifeBuoy, ListChecks,
  ListTree, MapPin, MessageCircle, Mountain, Navigation, Palette, PenLine,
  Plus, Puzzle, ReceiptText, Repeat2, Rocket, Scale, Search, ShieldCheck,
  SprayCan, Target, Telescope, Users, UsersRound, Waves, Waypoints,
  type LucideIcon,
} from 'lucide-react';

interface FlatStoryIllustrationProps {
  chapterId: number;
  index?: number;
  className?: string;
  hero?: boolean;
}

interface SceneMeta { icon: LucideIcon; label: string; accent: string; }

const chapterScenes: SceneMeta[][] = [
  [
    { icon: FileX2, label: 'هدف نیمه‌تمام', accent: '#e87979' },
    { icon: Users, label: 'هدف قرضی', accent: '#8b7fe8' },
    { icon: Search, label: 'بررسی هدف واقعی', accent: '#db9c36' },
  ],
  [
    { icon: Ear, label: 'شنیدن برای تغییر', accent: '#dca73d' },
    { icon: AlarmClock, label: 'بیداری آگاهانه', accent: '#56a7c7' },
    { icon: MapPin, label: 'فرد و زمان و مکان مناسب', accent: '#6d9d75' },
  ],
  [
    { icon: Car, label: 'هدف رایج اما شخصی‌نشده', accent: '#df8a58' },
    { icon: Scale, label: 'سنجش تناسب هدف', accent: '#6e91c5' },
    { icon: SprayCan, label: 'پوشاندن موقت مسئله', accent: '#a77ac4' },
    { icon: CheckCircle2, label: 'نگه‌داشتن هدف اصیل', accent: '#5c9f73' },
  ],
  [
    { icon: Waves, label: 'قایق در طوفان', accent: '#4f8eae' },
    { icon: Lamp, label: 'فانوس جهت', accent: '#e4a83f' },
    { icon: EyeOff, label: 'نور پنهان‌شده پشت موج', accent: '#7777ac' },
  ],
  [
    { icon: CloudRain, label: 'رویداد ناخوشایند', accent: '#6d86a5' },
    { icon: History, label: 'نگاه دوباره به گذشته', accent: '#c28758' },
    { icon: Waypoints, label: 'اتصال نقطه‌ها', accent: '#8b76bf' },
    { icon: Footprints, label: 'برداشتن نقطه بعدی', accent: '#5c9b7a' },
  ],
  [
    { icon: LifeBuoy, label: 'طناب نجات', accent: '#e07c54' },
    { icon: CircleHelp, label: 'دیدن پاسخ پنهان', accent: '#8d78bc' },
    { icon: DoorOpen, label: 'فرصت معمولی', accent: '#4d9b83' },
    { icon: Hand, label: 'گرفتن فرصت', accent: '#d69b32' },
  ],
  [
    { icon: BadgeDollarSign, label: 'اولین نتیجه', accent: '#5f9b75' },
    { icon: Brain, label: 'عبور از تردید', accent: '#7d82bf' },
    { icon: Repeat2, label: 'تکرار ساختار موفق', accent: '#c78b3c' },
    { icon: Plus, label: 'یک تکرار بیشتر', accent: '#4c98a8' },
  ],
  [
    { icon: Telescope, label: 'دیدن پنج سال آینده', accent: '#6c83ba' },
    { icon: Layers3, label: 'سه نوع هدف', accent: '#a178bd' },
    { icon: Heart, label: 'خواستن و بها دادن', accent: '#d36e78' },
    { icon: ListChecks, label: 'جداکردن هدف از آرزو', accent: '#5d9a75' },
  ],
  [
    { icon: MessageCircle, label: 'برداشت‌های متفاوت', accent: '#6e94b0' },
    { icon: Palette, label: 'چهار موتور شخصیتی', accent: '#c98655' },
    { icon: Blend, label: 'ترکیب رنگ‌های شخصیت', accent: '#8a73bb' },
    { icon: UsersRound, label: 'تمرین متناسب با شخصیت', accent: '#5b9c7a' },
  ],
  [
    { icon: Clock3, label: 'تعارض هدف و زمان', accent: '#cc775b' },
    { icon: LayoutGrid, label: 'دیدن ارزش‌ها', accent: '#6c8eb8' },
    { icon: Crown, label: 'سه ارزش اول', accent: '#d3a13f' },
    { icon: CalendarCheck2, label: 'فعالیت هم‌راستا', accent: '#5d9d78' },
  ],
  [
    { icon: Backpack, label: 'بار ناخواسته‌ها', accent: '#b77460' },
    { icon: ArrowLeftRight, label: 'تغییر جهت جمله', accent: '#747db8' },
    { icon: DoorOpen, label: 'حرکت به سوی آزادی', accent: '#5d9e79' },
    { icon: Navigation, label: 'مدار خواسته', accent: '#d39a38' },
  ],
  [
    { icon: PenLine, label: 'نوشتن هدف', accent: '#6f8db1' },
    { icon: ListTree, label: 'سه فهرست روشن', accent: '#9a76b7' },
    { icon: ReceiptText, label: 'بهای هدف', accent: '#c77b55' },
    { icon: ShieldCheck, label: 'تعهد آگاهانه', accent: '#5c9a74' },
  ],
  [
    { icon: Mountain, label: 'رویای بزرگ', accent: '#6b87af' },
    { icon: Puzzle, label: 'یک قطعه امروز', accent: '#9975b8' },
    { icon: ListChecks, label: 'سه اقدام روزانه', accent: '#5d9b76' },
    { icon: CalendarRange, label: 'مرور هفتگی', accent: '#d29a38' },
    { icon: Rocket, label: 'شروع اجرا', accent: '#d06e62' },
  ],
];

const fallback: SceneMeta = { icon: Target, label: 'حرکت به سوی هدف', accent: '#d8a33f' };

const Person: React.FC<{ x: number; flip?: boolean; accent: string; mood?: 'calm' | 'hopeful' }> = ({ x, flip = false, accent, mood = 'calm' }) => (
  <g transform={`translate(${x} 24) scale(${flip ? -1 : 1} 1)`}>
    <ellipse cx="0" cy="105" rx="35" ry="6" fill="#cbd5e1" opacity=".55" />
    <path d="M-18 46 Q0 35 18 46 L22 91 Q0 101 -22 91Z" fill={accent} opacity=".92" />
    <path d="M-8 91 L-12 119 M9 91 L14 119" stroke="#334155" strokeWidth="10" strokeLinecap="round" />
    <circle cx="0" cy="29" r="16" fill="#f2c7a5" />
    <path d="M-15 27 Q-10 7 7 12 Q20 16 14 30 Q6 20 -15 27Z" fill="#2f2d35" />
    <circle cx="5" cy="29" r="1.4" fill="#334155" />
    <path d={mood === 'hopeful' ? 'M3 36 Q8 40 12 35' : 'M3 36 Q8 37 11 34'} fill="none" stroke="#8a5b48" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M17 52 Q35 58 42 69" fill="none" stroke={accent} strokeWidth="9" strokeLinecap="round" />
  </g>
);

export const FlatStoryIllustration: React.FC<FlatStoryIllustrationProps> = ({ chapterId, index = 0, className = '', hero = false }) => {
  const list = chapterScenes[chapterId - 1] || [];
  const scene = list[Math.max(0, index) % Math.max(1, list.length)] || fallback;
  const Icon = scene.icon;
  const showSecondPerson = index % 3 !== 2 || hero;
  const gradientId = `flat-scene-${chapterId}-${index}-${hero ? 'hero' : 'card'}`;

  return (
    <div className={`overflow-hidden rounded-2xl border border-slate-200/80 bg-[#fbfaf6] ${className}`} role="img" aria-label={scene.label}>
      <svg viewBox="0 0 360 150" className="block h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fbfaf6" />
            <stop offset="1" stopColor={scene.accent} stopOpacity=".16" />
          </linearGradient>
        </defs>
        <rect width="360" height="150" rx="18" fill={`url(#${gradientId})`} />
        <path d="M18 124 C74 105 102 128 156 116 S250 91 342 113" fill="none" stroke={scene.accent} strokeWidth="2" opacity=".22" />
        <circle cx="180" cy="68" r={hero ? 51 : 42} fill={scene.accent} opacity=".10" />
        <circle cx="180" cy="68" r={hero ? 39 : 32} fill="#ffffff" opacity=".82" />
        <Icon x={hero ? 148 : 154} y={hero ? 36 : 42} width={hero ? 64 : 52} height={hero ? 64 : 52} color={scene.accent} strokeWidth={1.45} />
        <Person x={hero ? 78 : 72} accent="#2f4a73" mood="hopeful" />
        {showSecondPerson && <Person x={hero ? 286 : 292} flip accent={scene.accent} mood="hopeful" />}
        {!showSecondPerson && (
          <g transform="translate(278 91)">
            <circle r="25" fill={scene.accent} opacity=".12" />
            <path d="M-12 1 L-2 11 L15 -12" fill="none" stroke={scene.accent} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
        <circle cx="28" cy="24" r="3" fill={scene.accent} opacity=".42" />
        <circle cx="333" cy="33" r="5" fill={scene.accent} opacity=".24" />
      </svg>
    </div>
  );
};
