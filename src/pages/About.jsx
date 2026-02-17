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
    description: 'Skills constellation, life journey, and career story of Sundram Pathak — a full-stack engineer specializing in React, Node.js, and creative web development.',
    jsonLd: personJsonLd,
  });

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16" aria-label="About me">
      {/* Subtle floating particles background */}
      <Suspense fallback={null}>
        <AboutParticles />
      </Suspense>

      <h1 className="font-heading text-3xl font-bold sm:text-4xl">
        <span className="text-gradient-aurora">Star</span> Chart
      </h1>
      <p className="mt-2 text-cosmos-muted">
        Skills mapped as constellations. Hover to see connections.
      </p>

      {/* Interactive Constellation */}
      <div className="mt-12">
        <Constellation />
      </div>

      {/* Animated 7-part life story */}
      <StoryJourney />

      {/* Bio section */}
      <div className="mt-12 rounded-2xl border border-white/5 bg-nebula/80 p-5 backdrop-blur-sm sm:mt-16 sm:p-8">
        <h2 className="font-heading text-2xl font-bold text-stardust">
          About the Pilot
        </h2>
        <div className="mt-4 space-y-4 text-cosmos-muted leading-relaxed">
          <p>
            Hello, I&apos;m Sundram Pathak — an Electronics Engineering
            undergraduate navigating the universe of full-stack development. I
            build immersive, realistic digital experiences and continuously
            explore new technologies. Along this journey, I sharpen my
            problem-solving skills across platforms like LeetCode, CodeChef,
            and GeeksforGeeks, always striving to evolve as a
            developer.
          </p>
          <p>
            My engineering background gives me a unique perspective on software.
            From circuit design to system architecture, I approach problems with
            analytical rigor and creative curiosity. I&apos;m passionate about
            fullstack development — building everything from responsive React
            frontends with Three.js-powered 3D experiences to robust Node.js and
            Express backends backed by MongoDB.
          </p>
          <p>
            Beyond the stack, I&apos;m actively diving into DevOps — learning
            Docker, CI/CD pipelines, and cloud deployment workflows to bridge
            the gap between development and operations. I believe shipping code
            is just as important as writing it, and automation is the key to
            velocity.
          </p>
          <p>
            Competitive programming is the training ground that keeps my
            algorithmic thinking sharp. Regular practice on LeetCode, CodeChef,
            and GeeksforGeeks helps me tackle complex data structure
            and algorithm challenges with confidence — skills that translate
            directly into writing efficient, scalable production code.
          </p>
          <p>
            I&apos;m drawn to emerging technologies — from AI-powered
            applications and computer vision to real-time communication
            platforms. My goal is to build meaningful, realistic applications
            that solve real problems while pushing the boundaries of what&apos;s
            possible on the web. When I&apos;m not coding, you&apos;ll find me
            exploring creative coding experiments, sketching UI concepts, or
            contributing to open source.
          </p>
        </div>
      </div>
    </section>
  );
}
