export interface ChapterTheme {
  accent: string;
  accentSoft: string;
  glow: string;
  surface: string;
}

const themes: ChapterTheme[] = [
  { accent: '#64748b', accentSoft: '#cbd5e1', glow: 'rgba(100,116,139,.22)', surface: 'rgba(30,41,59,.28)' },
  { accent: '#38bdf8', accentSoft: '#bae6fd', glow: 'rgba(56,189,248,.22)', surface: 'rgba(8,47,73,.25)' },
  { accent: '#818cf8', accentSoft: '#c7d2fe', glow: 'rgba(129,140,248,.23)', surface: 'rgba(49,46,129,.23)' },
  { accent: '#a78bfa', accentSoft: '#ddd6fe', glow: 'rgba(167,139,250,.24)', surface: 'rgba(76,29,149,.22)' },
  { accent: '#c084fc', accentSoft: '#e9d5ff', glow: 'rgba(192,132,252,.23)', surface: 'rgba(88,28,135,.22)' },
  { accent: '#2dd4bf', accentSoft: '#99f6e4', glow: 'rgba(45,212,191,.22)', surface: 'rgba(19,78,74,.24)' },
  { accent: '#34d399', accentSoft: '#a7f3d0', glow: 'rgba(52,211,153,.22)', surface: 'rgba(6,78,59,.23)' },
  { accent: '#84cc16', accentSoft: '#d9f99d', glow: 'rgba(132,204,22,.20)', surface: 'rgba(54,83,20,.21)' },
  { accent: '#facc15', accentSoft: '#fef08a', glow: 'rgba(250,204,21,.23)', surface: 'rgba(113,63,18,.22)' },
  { accent: '#f59e0b', accentSoft: '#fde68a', glow: 'rgba(245,158,11,.25)', surface: 'rgba(120,53,15,.24)' },
  { accent: '#fb923c', accentSoft: '#fed7aa', glow: 'rgba(251,146,60,.24)', surface: 'rgba(124,45,18,.22)' },
  { accent: '#fb7185', accentSoft: '#fecdd3', glow: 'rgba(251,113,133,.24)', surface: 'rgba(136,19,55,.20)' },
  { accent: '#fbbf24', accentSoft: '#fff7d6', glow: 'rgba(251,191,36,.34)', surface: 'rgba(146,64,14,.25)' },
];

export const getChapterTheme = (chapterId: number): ChapterTheme =>
  themes[Math.max(0, Math.min(themes.length - 1, chapterId - 1))];
