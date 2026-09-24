// FILE: src/pages/Works.jsx
// Works page:
// 1. WorksPlanetaryHero (Original, unmodified, fully interactive solar system)
// 2. Section Transition / Breathing room
// 3. CinematicWorksStories (Scroll-driven storytelling below the planetary hero)
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import SolarSystem from '../components/SolarSystem';
import WorksStory from '../components/cinematic/works/WorksStory';

// Master toggle: set to false or use ?legacy=true to view purely the original planetary system
const ENABLE_CINEMATIC_WORKS = true;

export default function Works() {
  const [searchParams] = useSearchParams();
  const isLegacy = searchParams.get('legacy') === 'true' || !ENABLE_CINEMATIC_WORKS;

  useSEO({
    title: 'Works · Planetary System & Engineering Stories',
    description:
      'Explore an interactive solar system of projects — deployed apps orbiting the sun, repos as planets, followed by deep-dive engineering stories of production systems.',
  });

  return (
    <div className="relative w-full">
      {/* ── SECTION A: EXISTING PLANETARY HERO (Original, unmodified, fully interactive) ── */}
      <section aria-label="Projects Planetary System" className="works-planetary-hero relative w-full">
        <SolarSystem />
      </section>

      {/* ── Visual separator giving the planetary system room to breathe ── */}
      {!isLegacy && (
        <>
          <div
            className="relative flex flex-col items-center justify-center py-8 md:py-20"
            aria-hidden="true"
          >
            <div className="h-8 md:h-16 w-[1px] bg-gradient-to-b from-transparent via-aurora/40 to-transparent" />
            <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-cosmos-muted/80">
              SYSTEM ORBIT CONVERGENCE · DEEP ARCHITECTURES
            </p>
            <span className="mt-2 font-mono text-xs text-aurora/70">↓</span>
          </div>

          {/* ── SECTION B: CINEMATIC PROJECT STORY & SECTION C: CONTENT ARCHIVE ── */}
          <section aria-label="Cinematic Project Stories" className="works-cinematic relative w-full">
            <WorksStory />
          </section>
        </>
      )}
    </div>
  );
}

