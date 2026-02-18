// FILE: src/pages/Home.jsx
// Home / Launch Pad page — hero + orbital navigation preview
import { lazy, Suspense, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import useWebGL from '../hooks/useWebGL';
import useSEO from '../hooks/useSEO';
import { websiteJsonLd, personJsonLd } from '../lib/seo';
import FallbackHero from '../components/FallbackHero';
import Loader from '../components/Loader';
import OrbitShell from '../components/OrbitShell';
import HomeIntro from '../components/HomeIntro';
import HomeHighlights from '../components/HomeHighlights';

// Lazy-load the heavy 3D scene — only imported when WebGL is confirmed
const HeroScene = lazy(() => import(/* webpackChunkName: "hero-3d" */ '../components/HeroScene'));

export default function Home({ onReady }) {
  const location = useLocation();
  const navTo = useNavigate();
  const [showBlackHoleMsg, setShowBlackHoleMsg] = useState(false);

  useSEO({
    title: 'Home',
    description: 'Stellar Portfolio — Full-stack engineer crafting performant, accessible digital experiences with React, Node.js, and Three.js.',
    jsonLd: { ...websiteJsonLd, author: personJsonLd },
  });
  const webGL = useWebGL();

  useEffect(() => {
    if (onReady && webGL !== null) onReady();
  }, [webGL, onReady]);

  /* ── Black-hole redirect popup ── */
  useEffect(() => {
    if (location.state?.fromBlackHole) {
      setShowBlackHoleMsg(true);
      navTo('/', { replace: true, state: {} });
      const timer = setTimeout(() => setShowBlackHoleMsg(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [location.state, navTo]);

  return (
    <section className="relative min-h-[90vh] overflow-x-hidden">
      {/* 3D background or fallback */}
      {webGL === null ? (
        <Loader message="Detecting capabilities…" />
      ) : webGL ? (
        <Suspense fallback={<FallbackHero />}>
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

      {/* Stats, tech ticker, and highlight cards */}
      <HomeHighlights />

      {/* ── Black-hole redirect popup ── */}
      <AnimatePresence>
        {showBlackHoleMsg && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-28 left-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 rounded-2xl border border-purple-500/20 bg-void/95 px-6 py-5 text-center shadow-xl shadow-purple-900/20 backdrop-blur-md"
          >
            <div className="mb-2 text-2xl" aria-hidden="true">🕳️</div>
            <p className="text-sm leading-relaxed text-stardust font-heading">
              &ldquo;The gravitational pull was so strong that you&rsquo;ve been
              respawned where you first started from.&rdquo;
            </p>
            <button
              onClick={() => setShowBlackHoleMsg(false)}
              className="mt-4 rounded-lg bg-comet/20 px-4 py-2 text-xs text-comet transition-colors hover:bg-comet/30"
            >
              Acknowledge
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
