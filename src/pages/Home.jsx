// FILE: src/pages/Home.jsx
// Home / Launch Pad page — hero + orbital navigation preview
import React, { lazy, Suspense, useEffect } from 'react';
import useWebGL from '../hooks/useWebGL';
import useSEO from '../hooks/useSEO';
import { websiteJsonLd, personJsonLd } from '../lib/seo';
import FallbackHero from '../components/FallbackHero';
import Loader from '../components/Loader';
import OrbitShell from '../components/OrbitShell';
import HomeIntro from '../components/HomeIntro';

// Lazy-load the heavy 3D scene
const HeroScene = lazy(() => import('../components/HeroScene'));

export default function Home({ onReady }) {
  useSEO({
    title: 'Home',
    description: 'Stellar Portfolio — Full-stack engineer crafting performant, accessible digital experiences with React, Node.js, and Three.js.',
    jsonLd: { ...websiteJsonLd, author: personJsonLd },
  });
  const webGL = useWebGL();

  useEffect(() => {
    if (onReady && webGL !== null) onReady();
  }, [webGL, onReady]);

  return (
    <section className="relative min-h-[90vh] overflow-x-hidden">
      {/* 3D background or fallback */}
      {webGL === null ? (
        <Loader message="Detecting capabilities…" />
      ) : webGL ? (
        <Suspense fallback={<Loader message="Launching 3D scene…" />}>
          <HeroScene />
        </Suspense>
      ) : null}

      {/* Always render semantic content over the canvas */}
      <div className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center px-4 text-center sm:px-6">
        {!webGL && webGL !== null ? (
          <FallbackHero />
        ) : (
          <>
            <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="text-gradient-aurora">Stellar</span>{' '}
              <span className="text-stardust">Developer</span>
            </h1>
            <p className="mt-3 max-w-md text-base text-cosmos-muted sm:mt-4 sm:max-w-lg sm:text-lg">
              Full-stack engineer crafting performant, accessible digital
              experiences. Explore my orbit to learn more.
            </p>

            {/* Orbital navigation */}
            <OrbitShell />

            <div className="mt-4 flex gap-4 md:hidden">
              <a
                href="/works"
                className="rounded-lg bg-comet px-6 py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-comet/80 focus-visible:ring-2 focus-visible:ring-aurora"
              >
                View Projects
              </a>
              <a
                href="/contact"
                className="rounded-lg border border-cosmos-muted px-6 py-3 font-heading text-sm font-semibold text-stardust transition-colors hover:border-aurora hover:text-aurora"
              >
                Get in Touch
              </a>
            </div>
          </>
        )}
      </div>

      {/* Personal intro section */}
      <HomeIntro />
    </section>
  );
}
