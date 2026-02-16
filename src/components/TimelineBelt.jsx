// FILE: src/components/TimelineBelt.jsx
// Horizontal scroll timeline with scroll-linked animations
// Keyboard controls: Arrow keys scrub, Enter activates entry
// CSS scroll-snap fallback for non-JS environments
import React, { useRef, useCallback, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const timelineData = [
  {
    year: '2019',
    title: 'First Launch',
    desc: 'Wrote my first program. Discovered the joy of making machines do things.',
    color: '#6c63ff',
    icon: '🚀',
  },
  {
    year: '2020',
    title: 'Web Orbit',
    desc: 'Built my first React app and deployed it. The web became my playground.',
    color: '#38bdf8',
    icon: '🌐',
  },
  {
    year: '2021',
    title: 'Full-Stack Ascent',
    desc: 'Shipped a MERN stack SaaS with 1,000+ users. Learned to love server logs.',
    color: '#facc15',
    icon: '⚡',
  },
  {
    year: '2022',
    title: 'Open Source Galaxy',
    desc: 'Contributed to open-source projects. Code reviews and community building.',
    color: '#a78bfa',
    icon: '✨',
  },
  {
    year: '2023',
    title: 'Creative Nebula',
    desc: 'Explored WebGL, shaders, and creative coding. 3D on the web clicked.',
    color: '#f43f5e',
    icon: '🎨',
  },
  {
    year: '2024',
    title: 'Architecture Star',
    desc: 'Led front-end architecture for a fintech startup. Design systems at scale.',
    color: '#22d3ee',
    icon: '🏗️',
  },
  {
    year: '2025',
    title: 'Deep Space',
    desc: 'Building at the intersection of performance, accessibility, and delight.',
    color: '#34d399',
    icon: '🌌',
  },
];

export default function TimelineBelt() {
  const scrollRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const scrollToIndex = useCallback((idx) => {
    if (!scrollRef.current) return;
    const cards = scrollRef.current.children;
    if (cards[idx]) {
      cards[idx].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
      setActiveIdx(idx);
    }
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = Math.min(activeIdx + 1, timelineData.length - 1);
        scrollToIndex(next);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = Math.max(activeIdx - 1, 0);
        scrollToIndex(prev);
      }
    },
    [activeIdx, scrollToIndex],
  );

  return (
    <section
      className="relative py-8"
      aria-label="Career timeline"
      role="region"
    >
      {/* Track line */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-comet/30 to-transparent" />

      {/* Scrollable belt */}
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="list"
        aria-label="Timeline entries — use arrow keys to navigate"
      >
        {timelineData.map((entry, i) => (
          <motion.div
            key={entry.year}
            className="flex w-64 flex-shrink-0 snap-center flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            role="listitem"
          >
            {/* Asteroid dot */}
            <div
              className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 text-xl"
              style={{
                borderColor: entry.color,
                backgroundColor: entry.color + '15',
              }}
              aria-hidden="true"
            >
              {entry.icon}
              {/* Pulse ring */}
              {activeIdx === i && (
                <span
                  className="absolute inset-0 animate-ping rounded-full opacity-20"
                  style={{ backgroundColor: entry.color }}
                />
              )}
            </div>

            {/* Content card */}
            <div
              className="w-full cursor-pointer rounded-xl border border-white/5 bg-nebula p-4 text-center transition-colors hover:border-comet/30"
              onClick={() => setActiveIdx(i)}
              tabIndex={0}
              aria-label={`${entry.year}: ${entry.title}`}
            >
              <span
                className="font-mono text-sm font-bold"
                style={{ color: entry.color }}
              >
                {entry.year}
              </span>
              <h3 className="mt-1 font-heading text-base font-semibold text-stardust">
                {entry.title}
              </h3>
              <p className="mt-1 text-xs text-cosmos-muted">{entry.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Timeline navigation">
        {timelineData.map((entry, i) => (
          <button
            key={entry.year}
            className={`h-2 rounded-full transition-all ${
              activeIdx === i ? 'w-6 bg-comet' : 'w-2 bg-cosmos-muted/30'
            }`}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to ${entry.year}`}
            aria-selected={activeIdx === i}
            role="tab"
          />
        ))}
      </div>
    </section>
  );
}
