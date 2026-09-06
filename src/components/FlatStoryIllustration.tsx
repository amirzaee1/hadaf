import React from 'react';

interface FlatStoryIllustrationProps {
  chapterId: number;
  index?: number;
  className?: string;
  hero?: boolean;
  special?: 'prologue';
}

const counts = [3, 3, 4, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5];
const labels = [
  ['هدف‌های نیمه‌تمام', 'جدا شدن از هدف قرضی', 'سنجش هدف واقعی'],
  ['شنیدن برای تغییر', 'بیداری و صداقت با خود', 'سه شرط ورود به مسیر'],
  ['هدف نامتناسب', 'سنجش تناسب هدف', 'پوشاندن موقت مسئله', 'نگه‌داشتن هدف اصیل'],
  ['قایق و فانوس در طوفان', 'انتخاب جهت', 'حفظ مسیر پشت موج‌ها'],
  ['یافتن درس شکست', 'مرور گذشته', 'اتصال نقطه‌های زندگی', 'برداشتن قدم بعدی'],
  ['گرفتن طناب فرصت', 'دیدن پاسخ پنهان', 'فرصت معمولی', 'پذیرفتن فرصت'],
  ['اولین نتیجه واقعی', 'عبور از تردید', 'تکرار ساختار موفق', 'یک تکرار بیشتر'],
  ['دیدن آینده', 'تفکیک انواع هدف', 'خواستن و پذیرفتن بها', 'تبدیل رؤیا به هدف'],
  ['برداشت‌های متفاوت', 'چهار موتور شخصیتی', 'ترکیب شخصیت', 'مسیر متناسب هر شخصیت'],
  ['تعارض هدف و ارزش', 'کشف ارزش‌های واقعی', 'سه ارزش بنیادین', 'برنامه هم‌راستا'],
  ['سبک کردن بار ناخواسته‌ها', 'تغییر جهت جمله', 'حرکت به سوی آزادی', 'خروج از مدار تکرار'],
  ['نوشتن هدف دقیق', 'ساخت سه فهرست', 'پذیرفتن بهای هدف', 'تعهد آگاهانه'],
  ['شروع کوچک برای هدف بزرگ', 'قطعه امروز', 'سه اقدام روزانه', 'مرور هفتگی', 'شروع فوری'],
];

export const getEditorialImageSrc = (chapterId: number, index = 0, special?: 'prologue') => {
  const safeChapter = Math.min(13, Math.max(1, chapterId));
  const count = counts[safeChapter - 1];
  const safeIndex = ((index % count) + count) % count;
  const key = special || `c${String(safeChapter).padStart(2, '0')}-${String(safeIndex + 1).padStart(2, '0')}`;
  return `./assets/goal-dream/editorial/${key}.webp`;
};

export const FlatStoryIllustration: React.FC<FlatStoryIllustrationProps> = ({ chapterId, index = 0, className = '', hero = false, special }) => {
  const safeChapter = Math.min(13, Math.max(1, chapterId));
  const count = counts[safeChapter - 1];
  const safeIndex = ((index % count) + count) % count;
  const label = special === 'prologue' ? 'انتخاب مسیر شخصی به‌جای هدف‌های قرضی' : labels[safeChapter - 1][safeIndex];

  return (
    <figure className={`overflow-hidden rounded-2xl border border-slate-200/80 bg-[#faf9f5] ${className}`}>
      <img
        src={getEditorialImageSrc(safeChapter, safeIndex, special)}
        alt={label}
        width="960"
        height="640"
        loading={hero ? 'eager' : 'lazy'}
        decoding="async"
        className="block h-full w-full object-cover"
      />
    </figure>
  );
};
