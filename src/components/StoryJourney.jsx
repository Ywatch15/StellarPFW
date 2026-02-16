// FILE: src/components/StoryJourney.jsx
// Animated 7-part life story — pictorial + 2D/CSS animations
// Each chapter is a visual card with icon, illustration, and scroll-triggered animation
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const chapters = [
  {
    id: 1,
    title: 'The Quiet Beginning',
    subtitle: 'Hamirpur, Uttar Pradesh',
    icon: '🏡',
    color: '#facc15',
    illustration: 'village',
    text: 'Born in the quiet town of Hamirpur, I grew up admiring the simple life I was given. Until the age of seven, school felt like a burden — I would invent excuses just to avoid going. But somewhere along the way, that resistance turned into curiosity.',
  },
  {
    id: 2,
    title: 'Breaking the Shell',
    subtitle: 'From Introvert to Explorer',
    icon: '🦋',
    color: '#a78bfa',
    illustration: 'butterfly',
    text: 'An introvert at heart, I slowly learned to step out of my shell. I started sharing thoughts with classmates and teachers, sometimes confidently, sometimes awkwardly. Mischief became part of my personality, and so did the daily scoldings that followed.',
  },
  {
    id: 3,
    title: 'Stargazer',
    subtitle: 'Dreaming of the Cosmos',
    icon: '🔭',
    color: '#38bdf8',
    illustration: 'telescope',
    text: 'I once dreamed of becoming a scientist — or perhaps an astronaut. The cosmos fascinated me. I would sit beside my grandfather, staring at the night sky, asking endless questions: How do the stars stay there? The universe felt close, almost reachable.',
  },
  {
    id: 4,
    title: 'The Cricket Years',
    subtitle: 'Dusty Grounds, Open Skies',
    icon: '🏏',
    color: '#22c55e',
    illustration: 'cricket',
    text: 'Then came a phase of quiet rebellion. I grew distant, guarded, and comfortable in my own solitude. Yet two things brought me alive: mornings and evenings — the sacred hours reserved for cricket. On dusty grounds, winning local trophies felt like conquering the world.',
  },
  {
    id: 5,
    title: 'The Humbling',
    subtitle: 'From Topper to Seeker',
    icon: '📚',
    color: '#f43f5e',
    illustration: 'books',
    text: 'From being a topper to becoming "just average," from chasing the highest marks to simply hoping to pass — it was a humbling transition. I worked hard to enter my dream college but failed the entrance exams. That failure stung. Still, life had other plans.',
  },
  {
    id: 6,
    title: 'Engineering & Brotherhood',
    subtitle: 'College Life & Beyond',
    icon: '🎓',
    color: '#6c63ff',
    illustration: 'college',
    text: 'I pursued engineering in a reputed state government college. There, with limited exposure but unlimited laughter, I found a handful of good friends. Together, we collected memories, mistakes, lessons, and growth. College taught more than engineering — it taught life.',
  },
  {
    id: 7,
    title: 'Letting Go, Finding Self',
    subtitle: 'The Most Powerful Lesson',
    icon: '🌌',
    color: '#e0e6ff',
    illustration: 'cosmos',
    text: '"What you hold tightly today may eventually slip away. But in that letting go, you discover who you truly are." — This is the lesson that defines my journey forward.',
  },
];

// Animated illustration for each chapter (pure CSS/SVG)
function ChapterIllustration({ type, color }) {
  const baseClass = 'relative h-32 w-32 sm:h-40 sm:w-40';

  switch (type) {
    case 'village':
      return (
        <div className={baseClass}>
          <svg viewBox="0 0 120 120" className="h-full w-full">
            {/* Ground */}
            <rect x="0" y="85" width="120" height="35" fill="#1a472a" rx="4" opacity="0.6" />
            {/* House */}
            <rect x="35" y="55" width="50" height="35" fill={color} opacity="0.3" rx="2" />
            <polygon points="30,55 60,25 90,55" fill={color} opacity="0.5" />
            {/* Door — rounded top arch */}
            <path d="M52,90 L52,78 A8,8 0 0 1 68,78 L68,90 Z" fill={color} opacity="0.7" />
            {/* Stars */}
            <circle cx="20" cy="20" r="1.5" fill="#e0e6ff" opacity="0.8">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="100" cy="15" r="1" fill="#e0e6ff" opacity="0.6">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="75" cy="10" r="1.2" fill="#facc15" opacity="0.7">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2.3s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      );
    case 'butterfly':
      return (
        <div className={baseClass}>
          <svg viewBox="0 0 120 120" className="h-full w-full">
            <g transform="translate(60,60)">
              {/* Left wing */}
              <ellipse cx="-18" cy="-8" rx="22" ry="16" fill={color} opacity="0.4">
                <animateTransform attributeName="transform" type="rotate" values="-10;10;-10" dur="1.2s" repeatCount="indefinite" />
              </ellipse>
              {/* Right wing */}
              <ellipse cx="18" cy="-8" rx="22" ry="16" fill={color} opacity="0.4">
                <animateTransform attributeName="transform" type="rotate" values="10;-10;10" dur="1.2s" repeatCount="indefinite" />
              </ellipse>
              {/* Body */}
              <ellipse cx="0" cy="0" rx="3" ry="14" fill={color} opacity="0.8" />
              {/* Antennae */}
              <line x1="-3" y1="-14" x2="-10" y2="-24" stroke={color} strokeWidth="1" opacity="0.6" />
              <line x1="3" y1="-14" x2="10" y2="-24" stroke={color} strokeWidth="1" opacity="0.6" />
              <circle cx="-10" cy="-24" r="2" fill={color} opacity="0.6" />
              <circle cx="10" cy="-24" r="2" fill={color} opacity="0.6" />
            </g>
          </svg>
        </div>
      );
    case 'telescope':
      return (
        <div className={baseClass}>
          <svg viewBox="0 0 120 120" className="h-full w-full">
            {/* Night sky full of stars — twinkling at different rates */}
            {[
              { x: 12, y: 10, r: 2,   d: '2.2s' },
              { x: 42, y: 8,  r: 1.5, d: '3.1s' },
              { x: 72, y: 14, r: 1.8, d: '2.7s' },
              { x: 98, y: 6,  r: 1.2, d: '1.9s' },
              { x: 25, y: 32, r: 1,   d: '2.5s' },
              { x: 58, y: 28, r: 2.2, d: '3.4s' },
              { x: 88, y: 38, r: 1.4, d: '2.0s' },
              { x: 15, y: 55, r: 1.6, d: '2.8s' },
              { x: 48, y: 50, r: 1,   d: '3.0s' },
              { x: 80, y: 60, r: 1.8, d: '1.7s' },
              { x: 105, y: 48, r: 1.2, d: '2.3s' },
              { x: 35, y: 72, r: 2,   d: '3.5s' },
              { x: 65, y: 78, r: 1.3, d: '2.1s' },
              { x: 95, y: 80, r: 1.5, d: '2.6s' },
              { x: 18, y: 90, r: 1,   d: '1.8s' },
              { x: 52, y: 95, r: 1.7, d: '3.2s' },
              { x: 8,  y: 42, r: 1.3, d: '2.4s' },
              { x: 110, y: 22, r: 1,  d: '2.9s' },
            ].map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={i % 3 === 0 ? color : '#e0e6ff'}>
                <animate attributeName="opacity" values="0.2;0.9;0.2" dur={s.d} repeatCount="indefinite" />
              </circle>
            ))}
            {/* Bright central star with subtle glow */}
            <circle cx="60" cy="45" r="3" fill={color} opacity="0.9">
              <animate attributeName="r" values="2.5;3.5;2.5" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="60" cy="45" r="10" fill={color} opacity="0.08">
              <animate attributeName="r" values="8;14;8" dur="4s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      );
    case 'cricket':
      return (
        <div className={baseClass}>
          <svg viewBox="0 0 120 120" className="h-full w-full">
            {/* Dusty ground */}
            <rect x="0" y="90" width="120" height="30" fill="#8B6914" opacity="0.25" rx="4" />
            <rect x="0" y="90" width="120" height="4" fill="#8B6914" opacity="0.15" rx="2" />

            {/* Cricket bat — leaning at an angle */}
            <g transform="rotate(-25, 45, 80)">
              {/* Handle — wrapped grip */}
              <rect x="42" y="30" width="6" height="22" fill="#6B4226" rx="2" />
              <rect x="43" y="32" width="4" height="2" fill="#8B6914" opacity="0.6" />
              <rect x="43" y="36" width="4" height="2" fill="#8B6914" opacity="0.6" />
              <rect x="43" y="40" width="4" height="2" fill="#8B6914" opacity="0.6" />
              <rect x="43" y="44" width="4" height="2" fill="#8B6914" opacity="0.6" />
              {/* Blade — willow-coloured flat face */}
              <rect x="39" y="52" width="12" height="34" fill="#D4A54A" rx="1" />
              <rect x="40" y="52" width="10" height="34" fill="#E8C36A" rx="1" />
              {/* Centre spine */}
              <line x1="45" y1="52" x2="45" y2="86" stroke="#C49A3C" strokeWidth="1" opacity="0.5" />
              {/* Toe */}
              <rect x="39" y="84" width="12" height="3" fill="#C49A3C" rx="1" />
            </g>

            {/* Cricket ball — red leather with seam */}
            <circle cx="78" cy="75" r="7" fill="#CC2936" />
            <circle cx="78" cy="75" r="7" fill="none" stroke="#A01B25" strokeWidth="0.6" />
            {/* Seam line */}
            <path d="M71.5,73 Q74,70 78,70 Q82,70 84.5,73" fill="none" stroke="#FFD6D6" strokeWidth="0.8" />
            <path d="M71.5,77 Q74,80 78,80 Q82,80 84.5,77" fill="none" stroke="#FFD6D6" strokeWidth="0.8" />
            {/* Shine highlight */}
            <circle cx="76" cy="73" r="1.5" fill="white" opacity="0.2" />

            {/* Stumps — three vertical + two bails */}
            <line x1="95" y1="55" x2="95" y2="90" stroke="#e0e6ff" strokeWidth="2" opacity="0.6" />
            <line x1="100" y1="55" x2="100" y2="90" stroke="#e0e6ff" strokeWidth="2" opacity="0.6" />
            <line x1="105" y1="55" x2="105" y2="90" stroke="#e0e6ff" strokeWidth="2" opacity="0.6" />
            {/* Bails */}
            <line x1="94" y1="55" x2="101" y2="55" stroke="#facc15" strokeWidth="1.5" opacity="0.7" />
            <line x1="99" y1="55" x2="106" y2="55" stroke="#facc15" strokeWidth="1.5" opacity="0.7" />
          </svg>
        </div>
      );
    case 'books':
      return (
        <div className={baseClass}>
          <svg viewBox="0 0 120 120" className="h-full w-full">
            {/* Stack of books */}
            <rect x="25" y="70" width="70" height="12" fill={color} opacity="0.6" rx="2" />
            <rect x="28" y="58" width="65" height="12" fill="#38bdf8" opacity="0.5" rx="2" />
            <rect x="30" y="46" width="60" height="12" fill="#facc15" opacity="0.4" rx="2" />
            <rect x="32" y="34" width="56" height="12" fill="#a78bfa" opacity="0.5" rx="2" />
            {/* Open book on top */}
            <path d="M40,30 Q60,20 60,30 Q60,20 80,30 L80,15 Q60,5 60,15 Q60,5 40,15 Z" fill="#e0e6ff" opacity="0.3" />
            {/* Falling paper */}
            <rect x="85" y="40" width="15" height="20" fill="#e0e6ff" opacity="0.3" rx="1" transform="rotate(15, 92, 50)">
              <animate attributeName="y" values="40;50;40" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" repeatCount="indefinite" />
            </rect>
          </svg>
        </div>
      );
    case 'college':
      return (
        <div className={baseClass}>
          <svg viewBox="0 0 120 120" className="h-full w-full">
            {/* Building */}
            <rect x="25" y="40" width="70" height="55" fill={color} opacity="0.2" rx="2" />
            {/* Pillars */}
            <rect x="32" y="45" width="6" height="50" fill={color} opacity="0.4" />
            <rect x="50" y="45" width="6" height="50" fill={color} opacity="0.4" />
            <rect x="67" y="45" width="6" height="50" fill={color} opacity="0.4" />
            <rect x="82" y="45" width="6" height="50" fill={color} opacity="0.4" />
            {/* Roof triangle */}
            <polygon points="20,40 60,15 100,40" fill={color} opacity="0.35" />
            {/* Cap */}
            <rect x="48" y="20" width="24" height="3" fill={color} opacity="0.6" />
            {/* Tassel */}
            <line x1="72" y1="21" x2="78" y2="28" stroke={color} strokeWidth="1.5" opacity="0.6" />
            <circle cx="78" cy="29" r="2" fill={color} opacity="0.6" />
            {/* Friends silhouettes */}
            {[38, 50, 62, 74].map((x, i) => (
              <g key={i}>
                <circle cx={x} cy="85" r="4" fill="#e0e6ff" opacity="0.3" />
                <line x1={x} y1="89" x2={x} y2="100" stroke="#e0e6ff" strokeWidth="1.5" opacity="0.3" />
              </g>
            ))}
          </svg>
        </div>
      );
    case 'cosmos':
      return (
        <div className={baseClass}>
          <svg viewBox="0 0 120 120" className="h-full w-full">
            <defs>
              <radialGradient id="cosmosGlow">
                <stop offset="0%" stopColor={color} stopOpacity="0.4" />
                <stop offset="60%" stopColor="#6c63ff" stopOpacity="0.15" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <circle cx="60" cy="60" r="50" fill="url(#cosmosGlow)">
              <animate attributeName="r" values="45;55;45" dur="4s" repeatCount="indefinite" />
            </circle>
            {/* Orbiting particles */}
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <circle key={i} cx="60" cy="60" r="2" fill={['#6c63ff','#38bdf8','#facc15','#f43f5e','#a78bfa','#e0e6ff'][i]} opacity="0.7">
                <animateTransform attributeName="transform" type="rotate" from={`${deg} 60 60`} to={`${deg + 360} 60 60`} dur={`${6 + i}s`} repeatCount="indefinite" />
                <animateMotion dur={`${6 + i}s`} repeatCount="indefinite">
                  <mpath xlinkHref={`#orbit${i}`} />
                </animateMotion>
              </circle>
            ))}
            {[30, 32, 34, 36, 38, 40].map((r, i) => (
              <circle key={`o${i}`} id={`orbit${i}`} cx="60" cy="60" r={r} fill="none" stroke="#e0e6ff" strokeWidth="0.3" opacity="0.15" />
            ))}
            {/* Central figure silhouette */}
            <circle cx="60" cy="55" r="6" fill="#e0e6ff" opacity="0.25" />
            <line x1="60" y1="61" x2="60" y2="78" stroke="#e0e6ff" strokeWidth="2" opacity="0.2" />
          </svg>
        </div>
      );
    default:
      return null;
  }
}

function ChapterCard({ chapter, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-center justify-center">
      {/* Timeline connector */}
      {index > 0 && (
        <div
          className="absolute left-1/2 -top-8 h-8 w-px -translate-x-1/2"
          style={{
            background: `linear-gradient(to bottom, transparent, ${chapter.color}44)`,
          }}
        />
      )}

      <motion.div
        initial={{ opacity: 0, x: isEven ? -60 : 60, y: 20 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`relative flex w-full max-w-3xl flex-col items-center gap-6 rounded-2xl border border-white/5 bg-nebula/60 p-6 backdrop-blur-sm sm:p-8 ${
          isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
        }`}
        style={{ borderColor: `${chapter.color}15` }}
      >
        {/* Chapter number badge */}
        <motion.div
          className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
          style={{ background: chapter.color + '22', color: chapter.color, border: `1px solid ${chapter.color}44` }}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3, type: 'spring' }}
        >
          {chapter.id}
        </motion.div>

        {/* Illustration */}
        <motion.div
          className="flex-shrink-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ChapterIllustration type={chapter.illustration} color={chapter.color} />
        </motion.div>

        {/* Text */}
        <div className="flex-1 text-center sm:text-left">
          <div className="mb-1 text-2xl">{chapter.icon}</div>
          <h3 className="font-heading text-xl font-bold text-stardust sm:text-2xl">
            {chapter.title}
          </h3>
          <p className="mt-1 text-xs font-medium uppercase tracking-wider" style={{ color: chapter.color }}>
            {chapter.subtitle}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-cosmos-muted sm:text-base">
            {chapter.text}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function StoryJourney() {
  return (
    <div className="relative mt-12 space-y-12 sm:mt-16 sm:space-y-16">
      {/* Section header */}
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold text-stardust sm:text-3xl">
          The <span className="text-gradient-aurora">Journey</span> So Far
        </h2>
        <p className="mt-2 text-sm text-cosmos-muted">
          Seven chapters. One story. Scroll to explore.
        </p>
      </div>

      {/* Timeline line */}
      <div className="absolute left-1/2 top-24 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-comet/30 via-aurora/20 to-transparent" />

      {/* Chapter cards */}
      {chapters.map((chapter, i) => (
        <ChapterCard key={chapter.id} chapter={chapter} index={i} />
      ))}

      {/* Closing flourish */}
      <motion.div
        className="pt-4 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="mx-auto mb-4 h-px w-24 bg-gradient-to-r from-transparent via-comet to-transparent" />
        <p className="text-sm italic text-cosmos-muted">
          The story continues with every line of code...
        </p>
      </motion.div>
    </div>
  );
}
