import React from 'react';
import { motion } from 'motion/react';
import { Compass, BookOpen, Sparkles, User, Map } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

export type MobileTab = 'journey' | 'workshop' | 'map' | 'profile';

interface MobileTabBarProps {
  activeTab: MobileTab;
  onSelectTab: (tab: MobileTab) => void;
  completedChaptersCount: number;
  totalChaptersCount: number;
  habitStreak?: number;
}

export const MobileTabBar: React.FC<MobileTabBarProps> = ({
  activeTab,
  onSelectTab,
  completedChaptersCount,
  totalChaptersCount,
  habitStreak = 0,
}) => {
  const tabs = [
    {
      id: 'journey' as MobileTab,
      label: 'آموزش',
      icon: BookOpen,
      badge: `${completedChaptersCount}/${totalChaptersCount}`,
    },
    {
      id: 'workshop' as MobileTab,
      label: 'تمرین',
      icon: Sparkles,
      badge: '۶ گام',
    },
    {
      id: 'map' as MobileTab,
      label: 'مسیر من',
      icon: Map,
    },
    {
      id: 'profile' as MobileTab,
      label: 'نتیجه‌ها',
      icon: User,
      badge: habitStreak > 0 ? `${habitStreak} روز` : undefined,
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none pb-[env(safe-area-inset-bottom,8px)]"
    >
      <div className="w-full max-w-[430px] px-3 pb-2 pointer-events-auto">
        <div className="flex items-center justify-around py-2 px-1 rounded-2xl bg-slate-950/90 border border-amber-500/25 backdrop-blur-2xl shadow-[0_-5px_25px_rgba(0,0,0,0.7)]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundEngine.playTick();
                  onSelectTab(tab.id);
                }}
                className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 min-w-[68px] min-h-[44px] ${
                  isActive
                    ? 'text-amber-300 font-black'
                    : 'text-slate-400 hover:text-slate-200 font-medium'
                }`}
              >
                {/* Active Indicator Glow */}
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveGlow"
                    className="absolute inset-0 bg-amber-500/15 rounded-xl border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}

                <div className="relative">
                  <Icon className={`w-4 h-4 mb-1 transition-transform ${isActive ? 'scale-110 text-amber-400' : ''}`} />
                  {tab.badge && (
                    <span
                      className={`absolute -top-1.5 -right-2.5 text-[8px] font-mono font-bold px-1 rounded-full ${
                        isActive
                          ? 'bg-amber-400 text-black'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </div>

                <span className="text-[10px] tracking-tight relative z-10 leading-none">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
