// FILE: src/components/StoryJourney.jsx
// Journey timeline for the About page, inspired by the reference image.
// Uses horizontal lanes with fixed-width cards so the story stays cinematic without overlapping.
import { motion } from 'motion/react';

const journeyLanes = [
  {
    label: 'Origins',
    accent: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.18)',
    line: 'rgba(56, 189, 248, 0.5)',
    cards: [
      {
        id: 1,
        title: 'The Quiet Beginning',
        subtitle: 'Hamirpur, Uttar Pradesh',
        icon: '🏡',
        text: 'Born in the quiet town of Hamirpur, I grew up admiring the simple life I was given. Until the age of seven, school felt like a burden — I would invent excuses just to avoid going. But somewhere along the way, that resistance turned into curiosity.',
      },
      {
        id: 2,
        title: 'Breaking the Shell',
        subtitle: 'From Introvert to Explorer',
        icon: '🦋',
        text: 'An introvert at heart, I slowly learned to step out of my shell. I started sharing thoughts with classmates and teachers, sometimes confidently, sometimes awkwardly. Mischief became part of my personality, and so did the daily scoldings that followed.',
      },
      {
        id: 3,
        title: 'Stargazer',
        subtitle: 'Dreaming of the Cosmos',
        icon: '🔭',
        text: 'I once dreamed of becoming a scientist — or perhaps an astronaut. The cosmos fascinated me. I would sit beside my grandfather, staring at the night sky, asking endless questions: How do the stars stay there?',
      },
    ],
  },
  {
    label: 'Play & Pressure',
    accent: '#a78bfa',
    glow: 'rgba(167, 139, 250, 0.18)',
    line: 'rgba(167, 139, 250, 0.55)',
    cards: [
      {
        id: 4,
        title: 'The Cricket Years',
        subtitle: 'Dusty Grounds, Open Skies',
        icon: '🏏',
        text: 'Then came a phase of quiet rebellion. I grew distant, guarded, and comfortable in my own solitude. Yet two things brought me alive: mornings and evenings — the sacred hours reserved for cricket. On dusty grounds, winning local trophies felt like conquering the world.',
      },
      {
        id: 5,
        title: 'The Humbling',
        subtitle: 'From Topper to Seeker',
        icon: '📚',
        text: 'From being a topper to becoming “just average,” from chasing the highest marks to simply hoping to pass — it was a humbling transition. I worked hard to enter my dream college but failed the entrance exams. That failure stung. Still, life had other plans.',
      },
    ],
  },
  {
    label: 'College & Continuation',
    accent: '#22c55e',
    glow: 'rgba(34, 197, 94, 0.16)',
    line: 'rgba(34, 197, 94, 0.52)',
    cards: [
      {
        id: 6,
        title: 'Engineering & Brotherhood',
        subtitle: 'College Life & Beyond',
        icon: '🎓',
        text: 'I pursued engineering in a reputed state government college. There, with limited exposure but unlimited laughter, I found a handful of good friends. Together, we collected memories, mistakes, lessons, and growth. College taught more than engineering — it taught life.',
      },
      {
        id: 7,
        title: 'Letting Go, Finding Self',
        subtitle: 'The Most Powerful Lesson',
        icon: '🌌',
        text: '“What you hold tightly today may eventually slip away. But in that letting go, you discover who you truly are.” This is the lesson that defines my journey forward.',
      },
    ],
  },
];

function TimelineCard({ card, accent, index, total, wide = false }) {
  const isTall = card.id === 3 || card.id === 5 || card.id === 7;

  return (
    <motion.article
      className={`relative w-full rounded-2xl border border-white/6 bg-[#0c1020]/80 p-4 shadow-[0_0_30px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:p-5 ${wide ? '' : 'max-w-[21rem]'}`}
      style={{ boxShadow: `0 0 0 1px ${accent}18, 0 0 32px ${accent}12` }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ background: `radial-gradient(circle at top left, ${accent}18, transparent 45%)` }} />
      <div className="relative flex items-start gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-xl"
          style={{ borderColor: `${accent}66`, background: `${accent}14`, color: accent }}
        >
          {card.icon}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-stardust/80" style={{ borderColor: `${accent}44`, background: `${accent}10` }}>
              Step {card.id}
            </span>
            {index === total - 1 ? null : <span className="h-px flex-1 bg-white/10" />}
          </div>
          <h3 className="mt-3 font-heading text-lg font-bold text-stardust sm:text-xl">
            {card.title}
          </h3>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.22em]" style={{ color: accent }}>
            {card.subtitle}
          </p>
        </div>
      </div>
      <p className={`relative mt-4 text-sm leading-relaxed text-cosmos-muted ${isTall ? '' : ''}`}>
        {card.text}
      </p>
      <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-white/5">
        <div className="h-full rounded-full" style={{ width: `${42 + card.id * 6}%`, background: `linear-gradient(90deg, ${accent}, transparent)` }} />
      </div>
    </motion.article>
  );
}

function Lane({ lane, reverse = false }) {
  const isTwoCardLane = lane.cards.length === 2;

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/6 bg-[#070b17]/75 px-4 py-6 sm:px-6 sm:py-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{ background: `radial-gradient(circle at 18% 30%, ${lane.glow}, transparent 34%), radial-gradient(circle at 82% 20%, ${lane.glow}, transparent 30%)` }}
      />
      <div className="relative mb-8 flex items-center justify-between gap-4 sm:mb-10">
        <div className="inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-stardust/90" style={{ borderColor: `${lane.accent}44`, background: `${lane.accent}12`, boxShadow: `0 0 24px ${lane.glow}` }}>
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: lane.accent, boxShadow: `0 0 12px ${lane.accent}` }} />
          {lane.label}
        </div>
        <div className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent sm:block" />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 hidden -translate-y-1/2 sm:block">
          <svg viewBox="0 0 1200 220" className="h-56 w-full overflow-visible" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id={`lane-line-${lane.label.replace(/\s+/g, '-').toLowerCase()}`} x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="18%" stopColor={lane.line} stopOpacity="0.35" />
                <stop offset="52%" stopColor={lane.accent} stopOpacity="0.9" />
                <stop offset="82%" stopColor={lane.line} stopOpacity="0.35" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <filter id={`lane-glow-${lane.label.replace(/\s+/g, '-').toLowerCase()}`} x="-20%" y="-80%" width="140%" height="260%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 12 -4" />
              </filter>
            </defs>
            <path d="M 36 120 C 160 60, 270 60, 390 118 S 610 178, 742 118 S 930 52, 1164 120" fill="none" stroke={`url(#lane-line-${lane.label.replace(/\s+/g, '-').toLowerCase()})`} strokeWidth="5" strokeLinecap="round" />
            <path d="M 36 120 C 160 60, 270 60, 390 118 S 610 178, 742 118 S 930 52, 1164 120" fill="none" stroke={lane.accent} strokeOpacity="0.24" strokeWidth="18" strokeLinecap="round" filter={`url(#lane-glow-${lane.label.replace(/\s+/g, '-').toLowerCase()})`} />
          </svg>
        </div>

        <div className={`relative pt-2 sm:pt-4 ${isTwoCardLane ? 'grid gap-5 md:grid-cols-2 md:gap-6' : 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5'}`}>
          {lane.cards.map((card, index) => (
            <div
              key={card.id}
              className={`${isTwoCardLane ? 'flex' : `${reverse ? 'sm:translate-y-4 lg:translate-y-8' : 'sm:-translate-y-4 lg:-translate-y-8'} flex justify-center`}`}
            >
              <TimelineCard card={card} accent={lane.accent} index={index} total={lane.cards.length} wide={isTwoCardLane} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function StoryJourney() {
  return (
    <section className="relative mt-14 sm:mt-16">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/6 bg-[#050816] px-4 py-8 sm:px-6 sm:py-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{ background: 'radial-gradient(circle at 20% 10%, rgba(59, 130, 246, 0.18), transparent 28%), radial-gradient(circle at 82% 14%, rgba(244, 114, 182, 0.14), transparent 26%), radial-gradient(circle at 52% 100%, rgba(34, 197, 94, 0.12), transparent 22%)' }}
        />
        <div className="relative text-center">
          <h2 className="font-heading text-3xl font-bold text-stardust sm:text-5xl">
            The <span className="text-gradient-aurora">Journey</span> So Far
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-cosmos-muted sm:text-base">
            A cleaner version of the earlier timeline cards, arranged into distinct lanes so the story keeps the same energy without overlapping into visual noise.
          </p>
        </div>

        <div className="relative mt-8 space-y-6 sm:mt-10 sm:space-y-8">
          {journeyLanes.map((lane, index) => (
            <Lane key={lane.label} lane={lane} reverse={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}