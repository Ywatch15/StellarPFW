// FILE: src/pages/About.jsx
// About / Star Chart page — uses enhanced Constellation + StoryJourney
import { lazy, Suspense } from 'react';
import Constellation from '../components/Constellation';
import StoryJourney from '../components/StoryJourney';
import useSEO from '../hooks/useSEO';
import { personJsonLd } from '../lib/seo';

const AboutParticles = lazy(() => import('../components/AboutParticles'));

export default function About() {
  useSEO({
    title: 'About',
    description:
      'Skills constellation, life journey, and founder story of Sundram Pathak — founder and CTO of TentDesk, building full-stack products for real users.',
    jsonLd: personJsonLd,
  });

  return (
    <section
      className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16"
      aria-label="About me"
    >
      {/* Subtle floating particles background */}
      <Suspense fallback={null}>
        <AboutParticles />
      </Suspense>

      <h1 className="font-heading text-3xl font-bold sm:text-4xl">
        <span className="text-gradient-aurora">Star</span> Chart
      </h1>
      <p className="mt-2 text-cosmos-muted">
        Skills mapped as constellations. Trace the systems, ideas, and experiments behind
        the work.
      </p>

      <div
        className="mt-8 grid gap-3 sm:grid-cols-3"
        aria-label="Developer profile readout"
      >
        {[
          ['Current vector', 'Founder + CTO · TentDesk', '#38bdf8'],
          ['Origin point', 'Electronics engineering', '#a78bfa'],
          ['Operating mode', 'Shipping with customers', '#facc15'],
        ].map(([label, value, color]) => (
          <div
            key={label}
            className="rounded-xl border border-white/8 bg-nebula/55 px-4 py-3 backdrop-blur-sm"
          >
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-cosmos-muted">
              {label}
            </p>
            <p className="mt-1 text-sm font-medium" style={{ color }}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Interactive Constellation */}
      <div className="mt-12">
        <Constellation />
      </div>

      {/* Animated 7-part life story */}
      <StoryJourney />

      {/* Pilot dossier */}
      <section
        className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-3"
        aria-labelledby="pilot-dossier-title"
      >
        <div className="md:col-span-3">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-aurora/80">
            Pilot dossier
          </p>
          <h2
            id="pilot-dossier-title"
            className="mt-2 font-heading text-2xl font-bold text-stardust sm:text-3xl"
          >
            How I approach the work
          </h2>
        </div>
        {[
          {
            code: 'PRINCIPLE_01',
            title: 'Make complexity feel calm',
            text: 'Good engineering should reduce cognitive load. I care about clear flows, useful defaults, and interfaces that explain themselves.',
            color: '#38bdf8',
          },
          {
            code: 'PRINCIPLE_02',
            title: 'Ship, then sharpen',
            text: 'I prefer a working slice over an abstract perfect plan, then use feedback, tests, and iteration to make the system stronger.',
            color: '#a78bfa',
          },
          {
            code: 'PRINCIPLE_03',
            title: 'Leave a useful trail',
            text: 'Readable code, documented decisions, and repeatable deployment workflows make the next mission easier for everyone.',
            color: '#facc15',
          },
        ].map((item) => (
          <article
            key={item.code}
            className="group relative overflow-hidden rounded-2xl border border-white/8 bg-nebula/65 p-5 backdrop-blur-sm transition-colors hover:border-white/15"
          >
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
              style={{ background: item.color }}
              aria-hidden="true"
            />
            <p
              className="relative font-mono text-[0.62rem] tracking-[0.18em]"
              style={{ color: item.color }}
            >
              {item.code}
            </p>
            <h3 className="relative mt-4 font-heading text-lg font-semibold text-stardust">
              {item.title}
            </h3>
            <p className="relative mt-2 text-sm leading-relaxed text-cosmos-muted">
              {item.text}
            </p>
          </article>
        ))}
      </section>

      {/* Bio section */}
      <div className="mt-12 rounded-2xl border border-white/5 bg-nebula/80 p-5 backdrop-blur-sm sm:mt-16 sm:p-8">
        <h2 className="font-heading text-2xl font-bold text-stardust">About the Pilot</h2>
        <div className="mt-4 space-y-4 text-cosmos-muted leading-relaxed">
          <p>
            Hello, I&apos;m Sundram Pathak — an Electronics Engineering graduate, founder,
            and CTO building TentDesk for real tent and event-rental businesses. It is
            live in production with early customers, so my work now sits at the
            intersection of product decisions, full-stack engineering, and the
            responsibility of keeping a useful system running.
          </p>
          <p>
            My engineering background gives me a unique perspective on software. From
            circuit design to system architecture, I approach problems with analytical
            rigor and creative curiosity. I&apos;m passionate about fullstack development
            — building everything from responsive React frontends with Three.js-powered 3D
            experiences to robust Node.js and Express backends backed by MongoDB.
          </p>
          <p>
            Beyond TentDesk, I&apos;m building CommandAtlas — a deterministic,
            offline-first command reference with a validated content pipeline. I&apos;m
            actively diving into DevOps because a git push is not the end of a product:
            deployment, observability, recovery, and reliable user-facing behaviour are
            part of the engineering too.
          </p>
          <p>
            Competitive programming is the training ground that keeps my algorithmic
            thinking sharp. Regular practice on LeetCode, CodeChef, and GeeksforGeeks
            helps me tackle complex data structure and algorithm challenges with
            confidence — skills that translate directly into writing efficient, scalable
            production code.
          </p>
          <p>
            I&apos;m drawn to emerging technologies — from AI-powered applications and
            computer vision to real-time communication platforms. My goal is to build
            meaningful, realistic applications that solve real problems while pushing the
            boundaries of what&apos;s possible on the web. When I&apos;m not coding,
            you&apos;ll find me exploring creative coding experiments, sketching UI
            concepts, or contributing to open source.
          </p>
        </div>
      </div>
    </section>
  );
}
