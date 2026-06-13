// FILE: src/components/HomeHighlights.jsx
// Animated highlight cards + stats for the Home page
import { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'motion/react';

/* ---------- Animated counter ---------- */
function AnimatedCounter({ target, suffix = '', duration = 1800, start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let rafId = 0;
    const begin = performance.now();

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const progress = Math.min((now - begin) / duration, 1);
      const eased = easeOut(progress);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [start, target, duration]);

  return <span>{count}{suffix}</span>;
}

/* ---------- Data ---------- */
const stats = [
  { label: 'Skills Mapped', value: 52, suffix: '', color: '#38bdf8' },
  { label: 'DSA Problems', value: 700, suffix: '+', color: '#facc15' },
  { label: 'GitHub Repos', value: 20, suffix: '+', color: '#22c55e' },
];

const highlights = [
  {
    icon: '⚛️',
    title: 'Fullstack Development',
    desc: 'React, Node.js, Express, MongoDB — end-to-end application engineering.',
    color: '#6c63ff',
  },
  {
    icon: '🧊',
    title: '3D & Creative Web',
    desc: 'Three.js, WebGL, and immersive interactions that push the browser to its limits.',
    color: '#38bdf8',
  },
  {
    icon: '🐳',
    title: 'DevOps & CI/CD',
    desc: 'Docker, GitHub Actions, Vercel — automated pipelines from code to cloud.',
    color: '#a78bfa',
  },
  {
    icon: '🧠',
    title: 'Competitive Coding',
    desc: 'LeetCode, CodeChef, GeeksforGeeks — algorithmic thinking for scalable solutions.',
    color: '#facc15',
  },
];

const techStack = [
  'React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL',
  'Three.js', 'Tailwind CSS', 'Docker', 'GitHub Actions',
  'Python', 'Redis', 'WebSocket', 'Vite', 'Vercel',
];

/* ---------- Tech ticker ---------- */
function TechTicker() {
  const doubled = useMemo(() => [...techStack, ...techStack], []);
  return (
    <div className="relative mt-10 overflow-hidden py-4">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-void to-transparent" />
      <div className="animate-ticker flex gap-6 whitespace-nowrap">
        {doubled.map((tech, i) => (
          <span
            key={i}
            className="inline-block rounded-full border border-white/10 bg-nebula/60 px-4 py-1.5 text-xs font-medium text-stardust/80 backdrop-blur-sm"
          >
            {tech}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 30s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

/* ---------- Main component ---------- */
export default function HomeHighlights() {
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative z-10 mx-auto max-w-5xl px-4 pb-16 sm:px-6">
      {/* Stats row */}
      <motion.div
        ref={statsRef}
        className="grid grid-cols-2 gap-4 sm:grid-cols-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/5 bg-nebula/50 p-4 text-center backdrop-blur-sm"
          >
            <div className="font-heading text-2xl font-bold sm:text-3xl" style={{ color: stat.color }}>
              <AnimatedCounter target={stat.value} suffix={stat.suffix} start={statsVisible} />
            </div>
            <div className="mt-1 text-xs text-cosmos-muted">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Tech ticker */}
      <TechTicker />

      {/* Highlight cards */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {highlights.map((h, i) => (
          <motion.div
            key={h.title}
            className="group relative overflow-hidden rounded-xl border border-white/5 bg-nebula/40 p-5 backdrop-blur-sm transition-colors hover:border-white/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            {/* Accent glow on hover */}
            <div
              className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-30"
              style={{ background: h.color }}
            />
            <div className="mb-2 text-2xl">{h.icon}</div>
            <h3 className="font-heading text-base font-bold text-stardust">{h.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-cosmos-muted">{h.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
