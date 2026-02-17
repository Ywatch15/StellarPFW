// FILE: src/pages/Beyond.jsx
// "Beyond the Event Horizon" — An interactive black-hole-themed experience page
// Shows achievements, coding stats, philosophies, and fun facts orbiting a black hole
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import BlackHole from '../components/BlackHole';
import useSEO from '../hooks/useSEO';

// Data cards that orbit/float around the black hole
const dataFragments = [
  {
    id: 'mission',
    title: 'Mission Statement',
    icon: '🚀',
    content: null, // rendered custom
    color: '#6c63ff',
  },
  {
    id: 'stats',
    title: 'Code Metrics',
    icon: '📊',
    content: null, // rendered custom
    color: '#38bdf8',
  },
  {
    id: 'philosophy',
    title: 'Dev Philosophy',
    icon: '🧠',
    content: null, // rendered custom
    color: '#facc15',
  },
  {
    id: 'journey',
    title: 'The Journey',
    icon: '🌌',
    content: null, // rendered custom
    color: '#f43f5e',
  },
  {
    id: 'competitive',
    title: 'Competitive Edge',
    icon: '⚡',
    content: null, // rendered custom
    color: '#a78bfa',
  },
  {
    id: 'funfact',
    title: 'Fun Facts',
    icon: '🎲',
    content: null, // rendered custom
    color: '#22d3ee',
  },
];

const stats = [
  { label: 'Projects Built', value: '15+', icon: '◐' },
  { label: 'Technologies', value: '40+', icon: '✦' },
  { label: 'Lines of Code', value: '50k+', icon: '⟨⟩' },
  { label: 'GitHub Repos', value: '10+', icon: '⟁' },
  { label: 'DSA Problems', value: '500+', icon: '🧩' },
  { label: 'Cups of Coffee', value: '∞', icon: '☕' },
];

const platforms = [
  { name: 'LeetCode', emoji: '🧩', link: 'https://leetcode.com/u/Sundram_Pathak/' },
  { name: 'CodeChef', emoji: '👨‍🍳', link: 'https://www.codechef.com/users/pasu_1515' },
  { name: 'GeeksforGeeks', emoji: '🤓', link: 'https://www.geeksforgeeks.org/profile/pathaksupkdl' },
];

const funFacts = [
  'This portfolio has more stars than some GitHub repos. ⭐',
  'The black hole on this page uses 0 WebGL. Pure CSS + Canvas art.',
  'I debug with console.log and I\'m not ashamed. 🐛',
  'Dark mode isn\'t a preference, it\'s a lifestyle. 🌙',
  'My first program was a "Hello, World!" in C++. Now I build entire galaxies. 🌌',
  'I once spent 4 hours fixing a bug that was a missing semicolon. 🔍',
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 40 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.12,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

const pulseKeyframes = {
  boxShadow: [
    '0 0 0 0 rgba(108,99,255,0)',
    '0 0 20px 4px rgba(108,99,255,0.3)',
    '0 0 0 0 rgba(108,99,255,0)',
  ],
};

function DataCard({ fragment, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      variants={cardVariants}
      className="group relative"
    >
      <motion.article
        onClick={() => setExpanded((e) => !e)}
        animate={pulseKeyframes}
        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
        className="cursor-pointer rounded-2xl border border-white/5 bg-nebula/90 p-5 backdrop-blur-sm transition-all hover:border-comet/30 sm:p-6"
        style={{ borderTopColor: fragment.color + '44' }}
        role="button"
        aria-expanded={expanded}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setExpanded((v) => !v);
          }
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{fragment.icon}</span>
          <h3
            className="font-heading text-base font-semibold sm:text-lg"
            style={{ color: fragment.color }}
          >
            {fragment.title}
          </h3>
          <span className="ml-auto text-xs text-cosmos-muted">
            {expanded ? '▲' : '▼'}
          </span>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4">
                {/* ─── Mission Statement ─── */}
                {fragment.id === 'mission' && (
                  <div className="space-y-4">
                    <p className="text-sm leading-relaxed text-cosmos-muted">
                      To build software that matters — products that are performant, accessible,
                      and push the boundaries of what's possible on the web.
                    </p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {[
                        { icon: '🎯', title: 'User-First', desc: 'Every feature starts with empathy — understanding what users truly need.' },
                        { icon: '⚡', title: 'Performance', desc: 'Sub-second loads, optimized bundles, and buttery-smooth 60fps interactions.' },
                        { icon: '♿', title: 'Accessibility', desc: 'Semantic HTML, ARIA patterns, keyboard-navigable — the web is for everyone.' },
                      ].map((v) => (
                        <motion.div
                          key={v.title}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-lg border border-white/5 bg-void/40 p-3 text-center"
                        >
                          <span className="text-xl">{v.icon}</span>
                          <h4 className="mt-1 text-xs font-semibold text-stardust">{v.title}</h4>
                          <p className="mt-1 text-xs text-cosmos-muted">{v.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ─── Code Metrics ─── */}
                {fragment.id === 'stats' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                      {stats.map((s, i) => (
                        <motion.div
                          key={s.label}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.06 }}
                          className="flex flex-col items-center gap-1"
                        >
                          <span className="text-2xl">{s.icon}</span>
                          <span className="font-heading text-2xl font-bold text-stardust">{s.value}</span>
                          <span className="text-xs text-cosmos-muted">{s.label}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="rounded-lg border border-white/5 bg-void/30 p-3">
                      <h4 className="mb-2 text-xs font-semibold text-stardust">Favourite Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind', 'Docker', 'TypeScript', 'Vite'].map((t) => (
                          <span key={t} className="rounded-full bg-comet/10 px-3 py-1 text-xs text-stardust/80">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ─── Dev Philosophy ─── */}
                {fragment.id === 'philosophy' && (
                  <div className="space-y-4">
                    {[
                      { quote: '"First, solve the problem. Then, write the code."', takeaway: 'Every great product starts with understanding the user\'s pain point, not picking a framework.' },
                      { quote: '"Make it work, make it right, make it fast."', takeaway: 'Ship MVPs fast, then refactor for quality and optimise bottlenecks with real data.' },
                      { quote: '"Simplicity is the ultimate sophistication."', takeaway: 'The best code is the code you don\'t write. Keep abstractions minimal and intent clear.' },
                    ].map((p, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-lg border-l-2 border-white/10 bg-void/30 py-2 pl-4 pr-3"
                        style={{ borderLeftColor: fragment.color + '66' }}
                      >
                        <p className="text-sm font-medium italic text-stardust/90">{p.quote}</p>
                        <p className="mt-1 text-xs text-cosmos-muted">{p.takeaway}</p>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* ─── The Journey ─── */}
                {fragment.id === 'journey' && (
                  <div className="relative space-y-0 pl-5">
                    {/* Vertical timeline line */}
                    <div className="absolute left-[7px] top-1 bottom-1 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                    {[
                      { year: '2022', emoji: '🚀', title: 'The Spark', desc: 'Started Electronics Engineering and wrote my first lines of code in C/C++. Discovered HTML/CSS/JS and fell in love with building things for the web.' },
                      { year: '2023', emoji: '⚛️', title: 'Fullstack & DSA', desc: 'Went all-in on React, Node.js, Express & MongoDB. Simultaneously dove into competitive programming — 500+ problems across LeetCode, CodeChef & GFG.' },
                      { year: '2024', emoji: '🐳', title: 'DevOps & Scale', desc: 'Embraced Docker, CI/CD pipelines, AWS & Vercel. Learned to ship code reliably from local to production at scale.' },
                      { year: '2025', emoji: '🌌', title: 'Creative Frontiers', desc: 'Three.js, immersive portfolios, and pushing the boundaries of what browsers can do — blending engineering with art.' },
                    ].map((step, i) => (
                      <motion.div
                        key={step.year}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="relative pb-4"
                      >
                        <div className="absolute -left-5 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-nebula ring-2 ring-white/10">
                          <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: fragment.color }} />
                        </div>
                        <div>
                          <span className="text-xs font-semibold" style={{ color: fragment.color }}>{step.year}</span>
                          <span className="ml-2 text-sm">{step.emoji}</span>
                          <h4 className="text-sm font-semibold text-stardust">{step.title}</h4>
                          <p className="text-xs text-cosmos-muted">{step.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* ─── Competitive Edge ─── */}
                {fragment.id === 'competitive' && (
                  <div className="space-y-4">
                    <p className="text-sm text-cosmos-muted">
                      Active competitive programmer sharpening algorithmic skills across multiple platforms:
                    </p>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {platforms.map((p, i) => (
                        <motion.a
                          key={p.name}
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-void/30 p-4 transition-all hover:border-comet/30 hover:bg-comet/10"
                        >
                          <span className="text-3xl">{p.emoji}</span>
                          <span className="text-sm font-semibold text-stardust">{p.name}</span>
                          <span className="text-xs text-cosmos-muted">View Profile →</span>
                        </motion.a>
                      ))}
                    </div>
                    <div className="rounded-lg border border-white/5 bg-void/30 p-3">
                      <h4 className="mb-2 text-xs font-semibold text-stardust">Core Strengths</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Dynamic Programming', 'Graph Theory', 'Binary Search', 'Trees', 'Greedy', 'Sliding Window', 'Backtracking', 'Bit Manipulation'].map((t) => (
                          <span key={t} className="rounded-full bg-comet/10 px-3 py-1 text-xs text-stardust/80">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ─── Fun Facts ─── */}
                {fragment.id === 'funfact' && (
                  <ul className="space-y-2">
                    {funFacts.map((fact, i) => (
                      <motion.li
                        key={i}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-2 text-sm text-cosmos-muted"
                      >
                        <span className="mt-0.5 text-xs text-comet">✦</span>
                        {fact}
                      </motion.li>
                    ))}
                  </ul>
                )}

                {fragment.content && (
                  <p className="text-sm leading-relaxed text-cosmos-muted">
                    {fragment.content}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    </motion.div>
  );
}

export default function Beyond() {
  useSEO({
    title: 'Beyond',
    description:
      'Beyond the Event Horizon — explore achievements, philosophy, and fun facts in an interactive black hole experience.',
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16" aria-label="Beyond the Event Horizon">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
          <span className="text-gradient-aurora">Beyond</span>{' '}
          <span className="text-stardust">the Event Horizon</span>
        </h1>
        <p className="mt-3 max-w-xl text-cosmos-muted">
          Cross the point of no return. Discover what lies beyond — achievements,
          philosophies, and the relentless curiosity that drives everything I build.
        </p>
      </motion.div>

      {/* Black hole visual */}
      <div className="mt-10 sm:mt-16">
        <BlackHole interactive />
      </div>

      {/* Gravitational warning */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-6 text-center text-sm italic text-cosmos-muted/60"
      >
        ⚠ Warning: You are approaching the event horizon. Information beyond this point
        may permanently expand your perspective.
      </motion.p>

      {/* Data fragment cards */}
      <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
        {dataFragments.map((fragment, i) => (
          <DataCard key={fragment.id} fragment={fragment} index={i} />
        ))}
      </div>

      {/* Bottom singularity message */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-16 text-center sm:mt-20"
      >
        <div className="mx-auto mb-6 h-px w-32 bg-gradient-to-r from-transparent via-comet to-transparent" />
        <p className="font-heading text-lg font-semibold text-stardust sm:text-xl">
          "In the space between <span className="text-comet">0</span> and{' '}
          <span className="text-aurora">1</span>, entire universes are built."
        </p>
        <p className="mt-3 text-sm text-cosmos-muted">
          — Every line of code is a step closer to singularity.
        </p>
      </motion.div>
    </section>
  );
}
