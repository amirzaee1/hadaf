import React from 'react';
import { motion } from 'motion/react';
import { ChapterData, UserProgress } from '../types';
import { CinematicReveal } from './CinematicReveal';
import { getEditorialImageSrc } from './FlatStoryIllustration';
import { getChapterTheme } from '../utils/chapterTheme';

interface MobileCinematicVisualProps {
  chapter: ChapterData;
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
}

interface SceneCopy {
  title: string;
  instruction: string;
  result: string;
  beforeIndex: number;
  afterIndex: number;
}

const scenes: SceneCopy[] = [
  { title: 'نور را تا انتهای مسیر ببر', instruction: 'تصویر را لمس کن تا راه از دل تاریکی پیدا شود.', result: 'مسیر وقتی روشن می‌شود که اولین قدم را خودت انتخاب کنی.', beforeIndex: 0, afterIndex: 1 },
  { title: 'صدای واقعی را از میان هیاهو پیدا کن', instruction: 'یک لمس؛ صدای بیرون محو می‌شود و حقیقت باقی می‌ماند.', result: 'شنیدنِ صادقانه، آغاز هر تغییر واقعی است.', beforeIndex: 0, afterIndex: 1 },
  { title: 'هدفی را نگه دار که اندازهٔ زندگی توست', instruction: 'هدف ناسازگار را کنار بزن و انتخاب اصیل را آشکار کن.', result: 'هدف درست تو را کامل می‌کند؛ تو را پشت نقاب پنهان نمی‌کند.', beforeIndex: 0, afterIndex: 3 },
  { title: 'فانوس را روشن کن', instruction: 'با یک لمس، جهت را از میان موج‌ها پیدا کن.', result: 'موج‌ها می‌مانند؛ اما مقصد روشن، قایق را گم نمی‌کند.', beforeIndex: 0, afterIndex: 1 },
  { title: 'نقطه‌های پراکنده را به هم وصل کن', instruction: 'گذشته را لمس کن تا الگوی پنهانش دیده شود.', result: 'شکست‌ها نقطه‌های بی‌معنا نیستند؛ بخشی از نقشه‌اند.', beforeIndex: 0, afterIndex: 2 },
  { title: 'طنابی را که همیشه آنجا بود بگیر', instruction: 'فرصت معمولی را لمس کن تا چهرهٔ واقعی‌اش آشکار شود.', result: 'گاهی پاسخ، پرزرق‌وبرق نمی‌آید؛ فقط باید آن را ببینی.', beforeIndex: 2, afterIndex: 3 },
  { title: 'یک موفقیت کوچک را تکثیر کن', instruction: 'اولین نتیجه را لمس کن و ساختار پشت آن را ببین.', result: 'چیزی که یک‌بار ساخته شده، می‌تواند آگاهانه تکرار شود.', beforeIndex: 0, afterIndex: 2 },
  { title: 'از مسیر پیش‌فرض بیرون بیا', instruction: 'تصویر را لمس کن و رؤیا را به یک انتخاب آگاهانه تبدیل کن.', result: 'هدف یعنی بدانی چه می‌خواهی، چرا و امروز برایش چه می‌کنی.', beforeIndex: 0, afterIndex: 3 },
  { title: 'موتور حرکت خودت را پیدا کن', instruction: 'برداشت‌های دیگران را کنار بزن و مسیر متناسب خودت را ببین.', result: 'یک هدف واحد، برای هر انسان با نیروی متفاوتی زنده می‌شود.', beforeIndex: 0, afterIndex: 3 },
  { title: 'هدف را روی ارزش‌ها بنا کن', instruction: 'پایه‌ها را لمس کن تا مسیر از درون محکم شود.', result: 'هدفی که روی ارزش‌های واقعی باشد، به مقاومت درونی نمی‌خورد.', beforeIndex: 0, afterIndex: 3 },
  { title: 'جمله را از ناخواسته به خواسته برگردان', instruction: 'بار قدیمی را لمس کن و جهت انرژی را تغییر بده.', result: 'ذهن با مقصد حرکت می‌کند؛ نه فقط با چیزی که از آن فرار می‌کنی.', beforeIndex: 0, afterIndex: 2 },
  { title: 'رؤیا را از مه بیرون بیاور', instruction: 'تصویر را لمس کن تا خواسته به هدف دقیق تبدیل شود.', result: 'وضوح، زمان و بها؛ سه چیزی که رؤیا را قابل ساختن می‌کنند.', beforeIndex: 0, afterIndex: 3 },
  { title: 'اولین قطعه را همین امروز بگذار', instruction: 'کوه دور را لمس کن تا قدم کوچک امروز ظاهر شود.', result: 'هدف بزرگ با حرکت بزرگ شروع نمی‌شود؛ با تکرار کوچک شروع می‌شود.', beforeIndex: 0, afterIndex: 4 },
];

export const MobileCinematicVisual: React.FC<MobileCinematicVisualProps> = ({ chapter }) => {
  const theme = getChapterTheme(chapter.id);
  const scene = scenes[chapter.id - 1] || scenes[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-45px' }}
      className="relative mx-1 my-5"
    >
      <div className="mb-2.5 flex items-center gap-2 px-1">
        <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}70)` }} />
        <span className="text-[10px] font-black tracking-wide" style={{ color: theme.accentSoft }}>صحنهٔ تعاملی این مرحله</span>
      </div>
      <CinematicReveal
        key={chapter.id}
        beforeSrc={getEditorialImageSrc(chapter.id, scene.beforeIndex)}
        afterSrc={getEditorialImageSrc(chapter.id, scene.afterIndex)}
        beforeAlt={`${chapter.titleFa}؛ پیش از تغییر`}
        afterAlt={`${chapter.titleFa}؛ پس از انتخاب`}
        eyebrow={`مرحله ${chapter.id} از ۱۳`}
        title={scene.title}
        instruction={scene.instruction}
        result={scene.result}
        accent={theme.accent}
      />
    </motion.div>
  );
};
