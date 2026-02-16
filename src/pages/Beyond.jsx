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
    content:
      'To build software that matters — products that are performant, accessible, and push the boundaries of what\'s possible on the web.',
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
    content:
      '"First, solve the problem. Then, write the code." — Every great product starts with understanding the user\'s pain point, not picking a framework.',
    color: '#facc15',
  },
  {
    id: 'journey',
    title: 'The Journey',
    icon: '🌌',
    content:
      'From soldering circuits in Electronics Engineering to crafting full-stack applications. Every bug fixed, every feature shipped — all part of the trajectory toward singularity-level skill.',
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
  { label: 'Cups of Coffee', value: '∞', icon: '☕' },
  { label: 'GitHub Repos', value: '10+', icon: '⟁' },
];

const platforms = [
  { name: 'LeetCode', emoji: '🧩' },
  { name: 'CodeChef', emoji: '👨‍🍳' },
  { name: 'Codeforces', emoji: '🏆' },
  { name: 'GeeksforGeeks', emoji: '🤓' },
];

const funFacts = [
  'Space has no sound, but my code has plenty of audio toggles. 🔊',
  'This portfolio has more stars than some GitHub repos. ⭐',
  'The black hole on this page uses 0 WebGL. Pure CSS + Canvas art.',
  'I debug with console.log and I\'m not ashamed. 🐛',
  'Dark mode isn\'t a preference, it\'s a lifestyle. 🌙',
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

function StatCard({ stat }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-2xl">{stat.icon}</span>
      <span className="font-heading text-2xl font-bold text-stardust">{stat.value}</span>
      <span className="text-xs text-cosmos-muted">{stat.label}</span>
    </div>
  );
}

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
                {fragment.id === 'stats' && (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {stats.map((s) => (
                      <StatCard key={s.label} stat={s} />
                    ))}
                  </div>
                )}

                {fragment.id === 'competitive' && (
                  <div className="space-y-3">
                    <p className="text-sm text-cosmos-muted">
                      Active competitive programmer sharpening algorithmic skills:
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {platforms.map((p) => (
                        <span
                          key={p.name}
                          className="flex items-center gap-1.5 rounded-full bg-comet/10 px-4 py-1.5 text-sm text-stardust"
                        >
                          <span>{p.emoji}</span>
                          {p.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {fragment.id === 'funfact' && (
                  <ul className="space-y-2">
                    {funFacts.map((fact, i) => (
                      <motion.li
                        key={i}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.08 }}
                        className="text-sm text-cosmos-muted"
                      >
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
