import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Compass,
  Zap,
  Target,
  Flame,
  Star,
  Award,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { ChapterData, UserProgress } from '../types';
import { soundEngine } from '../utils/audio';

interface InteractiveStationProps {
  chapter: ChapterData;
  progress: UserProgress;
  onUpdate: (updater: (prev: UserProgress) => UserProgress) => void;
  onOpenWorkshop?: () => void;
}

export const InteractiveStation: React.FC<InteractiveStationProps> = ({
  chapter,
  progress,
  onUpdate,
  onOpenWorkshop,
}) => {
  const [localFeedback, setLocalFeedback] = useState<string | null>(null);

  const triggerChime = (msg?: string) => {
    soundEngine.playChime(659.25); // E5 note
    if (msg) {
      setLocalFeedback(msg);
      setTimeout(() => setLocalFeedback(null), 3500);
    }
  };

  return (
    <div className="relative z-10 w-full px-4 my-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7 }}
        className="cinematic-panel-gold p-4 sm:p-7 rounded-2xl relative overflow-hidden shadow-xl"
      >
        {/* Glow corner accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Level 3 Interactive Header */}
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>گام تعاملی تحول (Level 3 Interactive Moment)</span>
        </div>

        <p className="text-base sm:text-lg font-bold text-amber-100 mb-6 leading-relaxed">
          {chapter.level3Prompt}
        </p>

        {/* Dynamic Station Content by Chapter Type */}

        {/* 1. STARTING STATE */}
        {chapter.interactiveType === 'starting_state' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'confusion', label: 'سردرگمی و عدم قطعیت', desc: 'مه غلیظ و گم کردن قطب‌نما' },
                { id: 'drift', label: 'زندگی در جریان باد', desc: 'حرکت زیاد اما بدون مقصد خودآگاه' },
                { id: 'seeking', label: 'جستجوی معنا و رسالت', desc: 'می‌دانم چیزی فراتر در انتظار من است' },
                { id: 'ready', label: 'اشتیاق و آمادگی کامل', desc: 'عطش سوزان برای تحول و معماری آینده' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onUpdate((p) => ({
                      ...p,
                      startingState: item.id,
                      initialFeeling: item.label,
                    }));
                    triggerChime('نقطه آغاز تو در کهکشان ثبت شد.');
                  }}
                  className={`p-4 rounded-xl text-right transition-all border ${
                    progress.startingState === item.id
                      ? 'bg-amber-500/20 border-amber-400 text-amber-100 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                      : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:border-amber-500/40 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm sm:text-base">{item.label}</span>
                    {progress.startingState === item.id && (
                      <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                  <span className="text-xs text-slate-400 block">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 2. FAILURE TRAPS */}
        {chapter.interactiveType === 'failure_traps' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-400 mb-2">
              (می‌توانی چندین تله بازدارنده را انتخاب کنی تا بی‌اثر شوند):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'تکیه صرف بر انگیزه مقطعی و جوگیری',
                'ابهام و کلی‌گویی در تعریف هدف',
                'کمال‌گرایی افراطی (یا صفر یا صد)',
                'تلاش برای راضی کردن دیگران (اهداف عاریه‌ای)',
                'نداشتن سیستم پایش و بازخورد هفتگی',
                'تعارض با تصویر هویت ناخودآگاه',
              ].map((trap) => {
                const isSelected = progress.identifiedTraps.includes(trap);
                return (
                  <button
                    key={trap}
                    onClick={() => {
                      onUpdate((p) => ({
                        ...p,
                        identifiedTraps: isSelected
                          ? p.identifiedTraps.filter((t) => t !== trap)
                          : [...p.identifiedTraps, trap],
                      }));
                      triggerChime();
                    }}
                    className={`p-3.5 rounded-xl text-right transition-all border text-xs sm:text-sm font-medium flex items-center justify-between ${
                      isSelected
                        ? 'bg-rose-500/20 border-rose-400/80 text-rose-200'
                        : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <span>{trap}</span>
                    <span
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 mr-2 ${
                        isSelected ? 'bg-rose-400 border-rose-300' : 'border-slate-600'
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 bg-black rounded-full" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. GOLDEN PRINCIPLES SEAL */}
        {chapter.interactiveType === 'golden_principles' && (
          <div className="space-y-4 text-center">
            <p className="text-xs text-slate-300">
              با کلیک بر روی مهر زیر، پذیرش اصول سه‌گانه اصالت، استمرار اتمی و رهایی از اسارت نتیجه را ثبت کن:
            </p>
            <button
              onClick={() => {
                onUpdate((p) => ({ ...p, initialCovenantSigned: true }));
                triggerChime('پیمان زرین در جان تو تثبیت شد.');
              }}
              className={`w-full py-4 px-6 rounded-xl border font-bold text-sm sm:text-base flex items-center justify-center gap-3 transition-all ${
                progress.initialCovenantSigned
                  ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-black border-amber-300 shadow-[0_0_30px_rgba(234,179,8,0.4)]'
                  : 'bg-slate-900/90 hover:bg-amber-500/20 border-amber-500/50 text-amber-300'
              }`}
            >
              <ShieldCheck className="w-5 h-5" />
              <span>
                {progress.initialCovenantSigned
                  ? 'پیمان اصول طلایی با افتخار امضا شد'
                  : 'امضای معنوی و فعال‌سازی سه ستون زرین'}
              </span>
            </button>
          </div>
        )}

        {/* 4. BORROWED GOALS ACID TEST */}
        {chapter.interactiveType === 'borrowed_goals' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-300 mb-2">
              یکی از اهداف فعلی ذهنت را بنویس، سپس با فعال‌سازی آزمون اصالت ببین آیا همچنان ارزش جنگیدن دارد:
            </p>
            <input
              type="text"
              placeholder="مثال: راه‌اندازی استارتاپ بین‌المللی در حوزه هوش مصنوعی..."
              value={progress.borrowedFilteredGoals?.authenticGoal || ''}
              onChange={(e) => {
                const val = e.target.value;
                onUpdate((p) => ({
                  ...p,
                  borrowedFilteredGoals: {
                    authenticGoal: val,
                    isExtrinsicChecked: p.borrowedFilteredGoals?.isExtrinsicChecked ?? false,
                  },
                }));
              }}
              className="w-full bg-slate-900/80 border border-slate-700 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none"
            />
            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 cursor-pointer hover:bg-slate-900/80">
              <input
                type="checkbox"
                checked={progress.borrowedFilteredGoals?.isExtrinsicChecked || false}
                onChange={(e) => {
                  const checked = e.target.checked;
                  onUpdate((p) => ({
                    ...p,
                    borrowedFilteredGoals: {
                      authenticGoal: p.borrowedFilteredGoals?.authenticGoal || '',
                      isExtrinsicChecked: checked,
                    },
                  }));
                  if (checked) triggerChime('هدف از فیلتر اسید اصالت عبور کرد.');
                }}
                className="mt-1 accent-amber-500 w-4 h-4 shrink-0"
              />
              <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                شهادت می‌دهم: حتی اگر هیچ فردی در جهان نفهمد به این دست یافته‌ام و تحسین یا تاییدی دریافت نکنم، با اشتیاق ۵ سال برایش تلاش خواهم کرد.
              </span>
            </label>
          </div>
        )}

        {/* 5. LIGHTHOUSE HORIZON ALIGNMENT */}
        {chapter.interactiveType === 'lighthouse_align' && (
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-amber-200">
                <span>شفافیت پرتو فانوس در مه:</span>
                <span className="font-bold">{progress.horizonClarity || 50}٪</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={progress.horizonClarity || 50}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  onUpdate((p) => ({ ...p, horizonClarity: val }));
                  if (val >= 90) triggerChime('افق در بالاترین شفافیت قرار گرفت.');
                }}
                className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
            <p className="text-xs text-slate-300">
              ۳ جهت اصلی افق زندگی خود را که فانوس باید بی‌وقفه به آن‌ها بتابد وارد کن:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[0, 1, 2].map((idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`جهت ${idx + 1} (مثال: تسلط عمیق علمی)`}
                  value={progress.lighthouseDirections[idx] || ''}
                  onChange={(e) => {
                    const next = [...(progress.lighthouseDirections || ['', '', ''])];
                    next[idx] = e.target.value;
                    onUpdate((p) => ({ ...p, lighthouseDirections: next }));
                  }}
                  className="bg-slate-900/80 border border-slate-700/80 focus:border-amber-400 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-200 outline-none"
                />
              ))}
            </div>
          </div>
        )}

        {/* 6. LIFE CONSTELLATION MAPPER */}
        {chapter.interactiveType === 'life_constellation' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-300">
              سه نقطه عطف سرنوشت‌ساز زندگی‌ات را ثبت کن تا تاروپود صورت فلکی رسالت تو پیوند یابند:
            </p>
            <div className="space-y-3">
              {[0, 1, 2].map((idx) => {
                const dot = progress.lifeDots?.[idx] || { id: `dot-${idx}`, title: '', lesson: '' };
                return (
                  <div key={idx} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                      <Star className="w-3.5 h-3.5 text-amber-400" />
                      <span>نقطه عطف شماره {idx + 1}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="رویداد (مثال: تغییر رشته تحصیلی، مهاجرت، بیماری)"
                        value={dot.title}
                        onChange={(e) => {
                          const next = [...progress.lifeDots];
                          next[idx] = { ...dot, title: e.target.value };
                          onUpdate((p) => ({ ...p, lifeDots: next }));
                        }}
                        className="bg-slate-950/70 border border-slate-750 focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="درس و گنج پنهان آن"
                        value={dot.lesson}
                        onChange={(e) => {
                          const next = [...progress.lifeDots];
                          next[idx] = { ...dot, lesson: e.target.value };
                          onUpdate((p) => ({ ...p, lifeDots: next }));
                        }}
                        className="bg-slate-950/70 border border-slate-750 focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 7. BEHAVIOR & ELEPHANT-RIDER ALIGNMENT / IGNORED OPPORTUNITIES */}
        {(chapter.interactiveType === 'behavior_alignment' || chapter.interactiveType === 'ignored_opportunities') && (
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-amber-200">
                <span>تراز میان منطق سوارکار و اشتیاق فیل احساس:</span>
                <span className="font-bold">{progress.logicEmotionBalance || 50}٪</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={progress.logicEmotionBalance || 50}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  onUpdate((p) => ({ ...p, logicEmotionBalance: val }));
                  if (val > 75) triggerChime();
                }}
                className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>سردی منطق خشک</span>
                <span className="text-amber-300 font-semibold">تعادل طلایی</span>
                <span>غرق در هیجانات زودگذر</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <label className="block text-xs font-medium text-amber-300 mb-1">
                در مخفی یا فرصت طلایی نادیده‌گرفته‌شده در شلوغی شهر زندگی:
              </label>
              <input
                type="text"
                placeholder="کدام فرصت یا ایده بکر را به خاطر تردید نادیده گرفتی و اکنون وقت گشودن آن است؟"
                value={progress.ignoredOpportunity || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  onUpdate((p) => ({ ...p, ignoredOpportunity: val }));
                }}
                className="w-full bg-slate-900/80 border border-slate-700/80 focus:border-amber-400 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 outline-none"
              />
            </div>
          </div>
        )}

        {/* 8. DREAM TO REALITY TRANSFORMATION */}
        {chapter.interactiveType === 'dream_to_reality' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-300">
              رویای معلق خود را از حالت ابر به طرح، سپس نقشه مهندسی و واقعیت ملموس دگرگون کن:
            </p>
            <div className="space-y-2.5">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold text-sky-300 block mb-1">
                  ۱. ابر خیال (Cloud):
                </span>
                <input
                  type="text"
                  placeholder="رویای مبهم و الهام‌بخش تو چیست؟"
                  value={progress.dreamCloudText || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    onUpdate((p) => ({ ...p, dreamCloudText: val }));
                  }}
                  className="w-full bg-slate-950/70 border border-slate-750 focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold text-amber-300 block mb-1">
                  ۲. طرح اولیه و چارچوب کلی (Sketch):
                </span>
                <input
                  type="text"
                  placeholder="خطوط اصلی و مشخصات کلی آن را روی کاغذ بیاور..."
                  value={progress.dreamSketchText || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    onUpdate((p) => ({ ...p, dreamSketchText: val }));
                  }}
                  className="w-full bg-slate-950/70 border border-slate-750 focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold text-emerald-300 block mb-1">
                  ۳. نقشه مهندسی و ابزارها (Blueprint):
                </span>
                <input
                  type="text"
                  placeholder="چه مهارت‌ها، ابزارها و زمان‌بندی دقیق مورد نیاز است؟"
                  value={progress.dreamBlueprintText || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    onUpdate((p) => ({ ...p, dreamBlueprintText: val }));
                  }}
                  className="w-full bg-slate-950/70 border border-slate-750 focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* 9. PERSONALITY ARCHETYPE & FOUR WORLDS */}
        {(chapter.interactiveType === 'personality_archetype' || chapter.interactiveType === 'personality_worlds') && (
          <div className="space-y-4">
            <p className="text-xs text-slate-300 mb-2">
              کهن‌الگوی طبیعی روان و زیست‌بوم انرژیک تو کدام است؟ هدفت را بر پایه موتور درونی‌ات تنظیم کن:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'red', title: 'قلمرو سرخ (کوهستان چالش و صعود)', desc: 'عاشق فتح قله‌ها، حل بحران‌های جسورانه، نتیجه‌گرا و تسلیم‌ناپذیر' },
                { id: 'yellow', title: 'قلمرو زرد (اثرگذاری و پیوند انسانی)', desc: 'تشنه خدمت، الهام‌بخشی، مهرورزی و ارتقای کیفیت زندگی انسان‌ها' },
                { id: 'blue', title: 'قلمرو آبی (انرژی، ارتباط و پویایی)', desc: 'پرانرژی، عاشق کار تیمی، پروژه‌های شبکه‌ای و اشتیاق جمعی' },
                { id: 'green', title: 'قلمرو سبز (منطق، سیستم و ساختار)', desc: 'عاشق الگوها، معماری داده‌ها، برنامه‌ریزی گام‌به‌گام و دقت ریاضی' },
              ].map((arch) => (
                <button
                  key={arch.id}
                  onClick={() => {
                    onUpdate((p) => ({
                      ...p,
                      personalityArchetype: arch.id,
                      personalityWorld: arch.id as any,
                    }));
                    triggerChime(`جهان ${arch.title} در روان تو تثبیت شد.`);
                  }}
                  className={`p-3.5 rounded-xl text-right border transition-all ${
                    progress.personalityWorld === arch.id || progress.personalityArchetype === arch.id
                      ? 'bg-amber-500/25 border-amber-400 text-amber-100 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                      : 'bg-slate-900/60 border-slate-750 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <div className="font-bold text-sm mb-1">{arch.title}</div>
                  <div className="text-xs text-slate-400">{arch.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 10. VALUES DISCOVERY & FOUNDATION PILLARS (Pick 3 of 18) */}
        {(chapter.interactiveType === 'values_discovery' || chapter.interactiveType === 'values_foundation') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-amber-300">
              <span>سه ارزش غایی خود را انتخاب کن:</span>
              <span className="font-bold">({progress.coreValues.length} از ۳ انتخاب شده)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'آزادی و استقلال',
                'خرد و دانایی',
                'اصالت روحی',
                'رشد و تسلط شخصی',
                'عشق و صمیمیت',
                'آفرینندگی و هنر',
                'شجاعت و دلاوری',
                'آرامش و تعادل',
                'خدمت و تاثیرگذاری',
                'صداقت و پاکی',
                'ثروت و برکت',
                'سلامت و سرزندگی',
                'ماجراجویی',
                'معنویت و پیوند با کل',
                'وفاداری و تعهد',
                'رهبری و الهام‌بخشی',
                'سادگی عمیق',
                'عدالت و انصاف',
              ].map((val) => {
                const isSelected = progress.coreValues.includes(val);
                return (
                  <button
                    key={val}
                    onClick={() => {
                      if (isSelected) {
                        onUpdate((p) => ({
                          ...p,
                          coreValues: p.coreValues.filter((v) => v !== val),
                        }));
                      } else {
                        if (progress.coreValues.length < 3) {
                          onUpdate((p) => ({
                            ...p,
                            coreValues: [...p.coreValues, val],
                          }));
                          triggerChime();
                        }
                      }
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                      isSelected
                        ? 'bg-amber-400 text-black border-amber-300 font-bold shadow-[0_0_12px_rgba(251,191,36,0.5)]'
                        : 'bg-slate-900/70 border-slate-700/70 text-slate-300 hover:border-amber-500/40'
                    }`}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 11. LIMITING BELIEFS & SHATTERING THE GLASS ROOM */}
        {(chapter.interactiveType === 'limiting_beliefs' || chapter.interactiveType === 'glass_room_shatter') && (
          <div className="space-y-4">
            <p className="text-xs text-slate-300">
              یک باور محدودکننده که تو را در این اتاق شیشه‌ای زندانی ساخته وارد کن، سپس با نیروی آگاهی آن را درهم بشکن:
            </p>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] text-rose-300 mb-1">
                  دیوار شیشه‌ای نامرئی (باور محدودکننده فعلی):
                </label>
                <input
                  type="text"
                  placeholder="مثال: من سنم گذشته و دیگه فرصت ساختن یک کسب‌وکار بزرگ رو ندارم..."
                  value={progress.limitingBelief || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    onUpdate((p) => ({ ...p, limitingBelief: val }));
                  }}
                  className="w-full bg-slate-950/80 border border-rose-900/50 focus:border-rose-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-amber-300 mb-1">
                  جهان فراسو (باور رهایی‌بخش و قدرتمند نوین):
                </label>
                <input
                  type="text"
                  placeholder="مثال: تمام تجربیات زیسته من گنجینه‌ای نادر برای آغاز مقتدرانه‌ترین فصل زندگی من هستند..."
                  value={progress.empoweringBelief || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    onUpdate((p) => ({ ...p, empoweringBelief: val }));
                  }}
                  className="w-full bg-slate-950/80 border border-amber-500/50 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-amber-100 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* 12. 5-YEAR VISION & PERSONAL WORKSHOP MODE */}
        {(chapter.interactiveType === 'five_year_vision' || chapter.interactiveType === 'personal_workshop_mode') && (
          <div className="space-y-3">
            <p className="text-xs text-slate-300">
              تصویر روشن و الهام‌بخش خود را در ابعاد پنج‌گانه زندگی ۵ سال آینده ثبت کن:
            </p>
            {[
              { key: 'mind', label: '۱. ذهن و تسلط درونی', ph: 'چه کتاب‌هایی خوانده‌ای، چه آرامشی در روان داری؟' },
              { key: 'health', label: '۲. تندرستی و انرژی', ph: 'وزن، تناسب اندام، سطح انرژی و سرزندگی بدنی...' },
              { key: 'career', label: '۳. رسالت و حرفه', ph: 'چه جایگاهی خلق کرده‌ای و چه مسائلی را حل می‌کنی؟' },
              { key: 'wealth', label: '۴. برکت و ثروت مالی', ph: 'امنیت مالی، جریان درآمدی و دارایی‌های تثبیت‌شده...' },
              { key: 'relationships', label: '۵. روابط و اثر ماندگار', ph: 'کیفیت پیوندهای عاشقانه و میراث انسانی تو...' },
            ].map((realm) => (
              <div key={realm.key} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-xs font-semibold text-amber-300 block mb-1.5">
                  {realm.label}
                </span>
                <input
                  type="text"
                  placeholder={realm.ph}
                  value={(progress.fiveYearVision as Record<string, string>)[realm.key] || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    onUpdate((p) => ({
                      ...p,
                      fiveYearVision: {
                        ...p.fiveYearVision,
                        [realm.key]: val,
                      },
                    }));
                  }}
                  className="w-full bg-slate-950/70 border border-slate-700/70 focus:border-amber-400 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-200 outline-none"
                />
              </div>
            ))}

            {onOpenWorkshop && (
              <button
                type="button"
                onClick={onOpenWorkshop}
                className="w-full mt-3 p-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-black shrink-0" />
                <span>ورود به اتاق کارگاه عملی شخصی (۹ تمرین کامل)</span>
              </button>
            )}
          </div>
        )}

        {/* 12. PRECISION SMART GOAL ENGINE */}
        {chapter.interactiveType === 'smart_builder' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-300">
              هدف کلیدی سال پیش‌رو را بر طبق مهندسی پنج‌وجهی SMART با لیزر اراده بتراش:
            </p>
            {[
              { key: 'specific', tag: 'S', title: 'مشخص و معین (Specific)', ph: 'دقیقاً چه چیزی با چه جزئیاتی رخ می‌دهد؟' },
              { key: 'measurable', tag: 'M', title: 'قابل سنجش (Measurable)', ph: 'شاخص عددی یا خروجی ملموس اثبات موفقیت...' },
              { key: 'achievable', tag: 'A', title: 'دست‌یافتنی و هیجان‌انگیز (Achievable)', ph: 'چرا دستیابی به این در دایره امکان توست؟' },
              { key: 'relevant', tag: 'R', title: 'مرتبط با ارزش‌ها (Relevant)', ph: 'این هدف به کدام ارزش بنیادین فصل ۹ تو پیوند خورده؟' },
              { key: 'timeBound', tag: 'T', title: 'زمان‌مند و دارای ضرب‌الاجل (Time-bound)', ph: 'تاریخ دقیق تقویمی تحقق این هدف...' },
            ].map((f) => (
              <div key={f.key} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center border border-amber-400/40">
                    {f.tag}
                  </span>
                  <span className="text-xs font-semibold text-slate-200">{f.title}</span>
                </div>
                <input
                  type="text"
                  placeholder={f.ph}
                  value={(progress.smartGoal as Record<string, string>)[f.key] || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    onUpdate((p) => ({
                      ...p,
                      smartGoal: {
                        ...p.smartGoal,
                        [f.key]: val,
                      },
                    }));
                  }}
                  className="w-full bg-slate-950/70 border border-slate-700/70 focus:border-amber-400 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-200 outline-none"
                />
              </div>
            ))}

            <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/30 mt-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>چرایی سوزان (The Burning WHY):</span>
              </div>
              <input
                type="text"
                placeholder="چرا نرسیدن به این هدف برای روح تو پذیرفتنی نیست؟ چرا باید به هر قیمتی به آن برسی؟"
                value={progress.smartGoal.burningWhy || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  onUpdate((p) => ({
                    ...p,
                    smartGoal: { ...p.smartGoal, burningWhy: val },
                  }));
                }}
                className="w-full bg-slate-950/80 border border-amber-500/40 focus:border-amber-300 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-amber-100 outline-none"
              />
            </div>
          </div>
        )}

        {/* 13. DAILY RITUALS ARCHITECT & COVENANT SEAL */}
        {chapter.interactiveType === 'daily_rituals' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-300">
              سیستم روزانه خود را تعریف کن تا اهداف به شکل اتوماتیک در کالبد هویتت جاری شوند:
            </p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-amber-200 mb-1">
                  ۱. آیین صبحگاهی تمرکز (۵ دقیقه بیداری):
                </label>
                <input
                  type="text"
                  placeholder="مثال: ۵ دقیقه تنفس عمیق، خواندن ۳ ارزش بنیادین و تجسم فانوس دریایی..."
                  value={progress.dailyRituals.morningAction || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    onUpdate((p) => ({
                      ...p,
                      dailyRituals: { ...p.dailyRituals, morningAction: val },
                    }));
                  }}
                  className="w-full bg-slate-900/80 border border-slate-700/80 focus:border-amber-400 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-amber-200 mb-1">
                  ۲. قانون اقدام ۲ دقیقه‌ای (عادت اتمی روزانه):
                </label>
                <input
                  type="text"
                  placeholder="مثال: نوشتن حداقل ۱ پاراگراف یا پوشیدن کفش ورزشی بدون توقف..."
                  value={progress.dailyRituals.twoMinuteRule || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    onUpdate((p) => ({
                      ...p,
                      dailyRituals: { ...p.dailyRituals, twoMinuteRule: val },
                    }));
                  }}
                  className="w-full bg-slate-900/80 border border-slate-700/80 focus:border-amber-400 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-amber-200 mb-1">
                  ۳. گزاره هویت نوین («من کسی هستم که...»):
                </label>
                <input
                  type="text"
                  placeholder="مثال: من انسانی بااراده، وفادار به میثاق‌های خویش و خالق ارزش در جهان هستم..."
                  value={progress.dailyRituals.identityStatement || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    onUpdate((p) => ({
                      ...p,
                      dailyRituals: { ...p.dailyRituals, identityStatement: val },
                    }));
                  }}
                  className="w-full bg-slate-900/80 border border-slate-700/80 focus:border-amber-400 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 outline-none"
                />
              </div>

              <div className="pt-2">
                <label className="block text-xs font-medium text-amber-300 mb-1">
                  نام و امضای معنوی تو برای درج بر عهدنامه مقدس:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="نام کامل خود را وارد کن..."
                    value={progress.userSignatureName || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      onUpdate((p) => ({
                        ...p,
                        userSignatureName: val,
                        covenantSealDate: new Date().toLocaleDateString('fa-IR'),
                      }));
                    }}
                    className="flex-1 bg-slate-900/80 border border-amber-500/50 focus:border-amber-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-amber-100 font-bold outline-none"
                  />
                  <button
                    onClick={() => {
                      triggerChime('عهدنامه ابدی با مهر طلا جاودانه گشت.');
                    }}
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shrink-0 transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                  >
                    ثبت نهایی مهر
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Local Confirmation Alert */}
        {localFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-2.5 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs text-center font-medium"
          >
            {localFeedback}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
