// FILE: src/components/HomeIntro.jsx
// Personal intro section rendered below the HeroScene / OrbitShell on Home page
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

/* Typewriter subtitle */
const roles = [
  'Fullstack Developer',
  'Creative Coder',
  'DevOps Enthusiast',
  'Problem Solver',
];

function Typewriter() {
  const [text, setText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const current = roles[roleIdx];
    const speed = deleting ? 40 : 80;

    const id = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1500);
        } else {
          setCharIdx(charIdx + 1);
        }
      } else {
        setText(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setCharIdx(0);
          setRoleIdx((roleIdx + 1) % roles.length);
        } else {
          setCharIdx(charIdx - 1);
        }
      }
    }, speed);
    return () => clearTimeout(id);
  }, [inView, charIdx, deleting, roleIdx]);

  return (
    <span ref={ref} className="text-aurora/80">
      {text}
      <span className="animate-pulse text-aurora">|</span>
    </span>
  );
}

export default function HomeIntro() {
  const navigate = useNavigate();

  return (
    <section
      className="relative z-10 mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-20"
      aria-label="Personal introduction"
    >
      {/* Decorative glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-comet/10 blur-3xl"
        aria-hidden="true"
      />

      <motion.h2
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
      >
        <span className="text-gradient-aurora">Sundram Pathak</span>
      </motion.h2>

      <motion.p
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mt-3 text-lg font-medium sm:text-xl"
      >
        <Typewriter />
        <span className="text-cosmos-muted"> &bull; Electronics Engineering Undergraduate</span>
      </motion.p>

      <motion.div
        custom={2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mt-8 space-y-4 text-base leading-relaxed text-cosmos-muted sm:text-lg"
      >
        <p>
          Hello, I&apos;m Sundram Pathak — an Electronics Engineering
          undergraduate navigating the universe of full-stack development. I
          build immersive, realistic digital experiences and continuously explore
          new technologies. Along this journey, I sharpen my problem-solving
          skills across platforms like LeetCode, CodeChef, and
          GeeksforGeeks, always striving to evolve as a developer.
        </p>
        <p>
          From crafting responsive fullstack applications with React, Node.js,
          and MongoDB to exploring DevOps workflows with Docker and CI/CD
          pipelines, I thrive on turning complex ideas into polished, performant
          products. Competitive programming fuels my algorithmic thinking, while
          building immersive user experiences — like this very portfolio — keeps
          my creative instincts sharp.
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        custom={3}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mt-10 flex flex-wrap justify-center gap-4"
      >
        <a
          href="/springworks.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-comet px-7 py-3 font-heading text-sm font-semibold text-white transition-all hover:bg-comet/80 focus-visible:ring-2 focus-visible:ring-aurora"
        >
          <span className="absolute inset-0 -z-10 bg-gradient-to-r from-comet to-aurora opacity-0 transition-opacity group-hover:opacity-20" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a2 2 0 002 2h14a2 2 0 002-2v-3"
            />
          </svg>
          View Resume
        </a>
        <button
          onClick={() => navigate('/contact')}
          className="inline-flex items-center gap-2 rounded-lg border border-cosmos-muted px-7 py-3 font-heading text-sm font-semibold text-stardust transition-all hover:border-aurora hover:text-aurora focus-visible:ring-2 focus-visible:ring-aurora"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Contact Me
        </button>
      </motion.div>
    </section>
  );
}
