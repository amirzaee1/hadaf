import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Map, Sparkles, User } from 'lucide-react';

export type MobileTab = 'journey' | 'workshop' | 'map' | 'profile';
interface MobileTabBarProps { activeTab: MobileTab; onSelectTab: (tab: MobileTab) => void; completedChaptersCount: number; totalChaptersCount: number; habitStreak?: number; }

export const MobileTabBar: React.FC<MobileTabBarProps> = ({ activeTab, onSelectTab, completedChaptersCount, totalChaptersCount }) => {
  const tabs = [
    { id: 'journey' as MobileTab, label: 'آموزش', icon: BookOpen, badge: `${completedChaptersCount}/${totalChaptersCount}` },
    { id: 'workshop' as MobileTab, label: 'تمرین', icon: Sparkles, badge: '۶ گام' },
    { id: 'map' as MobileTab, label: 'مسیر من', icon: Map },
    { id: 'profile' as MobileTab, label: 'نتیجه‌ها', icon: User },
  ];
  return (
    <nav aria-label="پیمایش اصلی" className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center pb-[env(safe-area-inset-bottom,8px)]">
      <div className="pointer-events-auto w-full max-w-[430px] px-2 pb-1.5">
        <div className="flex items-center justify-around rounded-2xl border border-amber-500/20 bg-slate-950/94 px-1 py-1.5 shadow-[0_-5px_25px_rgba(0,0,0,.7)] backdrop-blur-2xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => onSelectTab(tab.id)} className={`relative flex min-h-[40px] min-w-[64px] flex-col items-center justify-center rounded-xl px-2.5 py-1 ${active ? 'font-black text-amber-300' : 'font-medium text-slate-500'}`}>
                {active && <motion.div layoutId="mobileActive" className="absolute inset-0 rounded-xl border border-amber-500/30 bg-amber-500/10" />}
                <span className="relative"><Icon className="mb-1 h-4 w-4" />{tab.badge && <small className={`absolute -right-3 -top-2 rounded-full px-1 text-[8px] ${active ? 'bg-amber-300 text-black' : 'bg-slate-800 text-slate-300'}`}>{tab.badge}</small>}</span>
                <span className="relative text-[10px] leading-none">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

