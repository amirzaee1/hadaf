import React from 'react';
import {
  Anchor,
  Brain,
  CalendarCheck,
  Compass,
  Eye,
  Flame,
  Footprints,
  Gem,
  KeyRound,
  Lightbulb,
  ListChecks,
  Mountain,
  Route,
  ShieldCheck,
  Sparkles,
  Sprout,
  Target,
  Telescope,
  TreePine,
  type LucideIcon,
} from 'lucide-react';

interface InfographicCardVisualProps {
  chapterId: number;
  index: number;
}

const scenes: Array<{ icon: LucideIcon; accent: string; label: string }> = [
  { icon: Compass, accent: '#38bdf8', label: 'قطب‌نما' },
  { icon: KeyRound, accent: '#fbbf24', label: 'کلید مسیر' },
  { icon: Eye, accent: '#a78bfa', label: 'دیدن آگاهانه' },
  { icon: Target, accent: '#fb7185', label: 'هدف' },
  { icon: Mountain, accent: '#34d399', label: 'قله' },
  { icon: Brain, accent: '#60a5fa', label: 'ذهن' },
  { icon: Gem, accent: '#f59e0b', label: 'ارزش' },
  { icon: Telescope, accent: '#c084fc', label: 'چشم‌انداز' },
  { icon: ShieldCheck, accent: '#2dd4bf', label: 'تعهد' },
  { icon: TreePine, accent: '#4ade80', label: 'ریشه‌های چرایی' },
  { icon: ListChecks, accent: '#fbbf24', label: 'برنامه اجرایی' },
  { icon: Footprints, accent: '#38bdf8', label: 'قدم‌های کوچک' },
  { icon: CalendarCheck, accent: '#fb7185', label: 'مرور مسیر' },
  { icon: Flame, accent: '#f97316', label: 'انگیزه درونی' },
  { icon: Lightbulb, accent: '#fde047', label: 'بینش' },
  { icon: Route, accent: '#22d3ee', label: 'مسیر' },
  { icon: Sprout, accent: '#86efac', label: 'رشد' },
  { icon: Anchor, accent: '#818cf8', label: 'ثبات' },
];

export const InfographicCardVisual: React.FC<InfographicCardVisualProps> = ({ chapterId, index }) => {
  const scene = scenes[(chapterId * 3 + index) % scenes.length];
  const Icon = scene.icon;

  return (
    <div
      className="relative h-20 w-full overflow-hidden rounded-xl border border-white/10 bg-slate-950"
      role="img"
      aria-label={scene.label}
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(circle at 72% 42%, ${scene.accent}35 0, transparent 36%), linear-gradient(135deg, #111827 0%, #070b16 62%, ${scene.accent}18 100%)`,
        }}
      />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 180" aria-hidden="true">
        <defs>
          <linearGradient id={`path-${chapterId}-${index}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={scene.accent} stopOpacity="0" />
            <stop offset="0.55" stopColor={scene.accent} stopOpacity="0.75" />
            <stop offset="1" stopColor="#fbbf24" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path d="M-20 146 C105 70 170 165 285 100 S455 58 625 104" fill="none" stroke={`url(#path-${chapterId}-${index})`} strokeWidth="3" strokeDasharray="7 9" />
        <circle cx="86" cy="122" r="6" fill={scene.accent} opacity="0.55" />
        <circle cx="286" cy="99" r="8" fill={scene.accent} opacity="0.8" />
        <circle cx="505" cy="72" r="11" fill="#fbbf24" opacity="0.95" />
        <path d="M470 150 L520 68 L568 150 Z" fill={scene.accent} opacity="0.08" />
        <path d="M0 160 Q140 115 265 157 T600 144 V180 H0 Z" fill="#ffffff" opacity="0.025" />
      </svg>

      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl border bg-slate-950/75 shadow-2xl backdrop-blur"
          style={{ borderColor: `${scene.accent}75`, boxShadow: `0 0 35px ${scene.accent}28` }}
        >
          <Icon className="h-6 w-6" style={{ color: scene.accent }} strokeWidth={1.7} />
        </div>
      </div>

      <div className="absolute left-3 top-3 flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
        <Sparkles className="h-3.5 w-3.5 text-amber-300" />
        <span>{scene.label}</span>
      </div>
      <span className="absolute bottom-2 left-3 font-mono text-[9px] text-slate-600">
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>
  );
};
