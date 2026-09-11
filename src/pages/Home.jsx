// FILE: src/pages/Home.jsx
// Home / Launch Pad page — hero + orbital navigation preview
import { lazy, Suspense, useEffect, useState, useCallback } from 'react';
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
import MissionModules from '../components/MissionModules';
import NebulaBackdrop from '../components/NebulaBackdrop';
import StellarGateIntro from '../components/StellarIntro/StellarGateIntro';
import StellarOrnaments from '../components/StellarOrnaments';

// Lazy-load the heavy 3D scene — only imported when WebGL is confirmed and intro completes
const HeroScene = lazy(
  () => import(/* webpackChunkName: "hero-3d" */ '../components/HeroScene'),
);

export default function Home({ onReady }) {
  const location = useLocation();
  const navTo = useNavigate();
  const [showBlackHoleMsg, setShowBlackHoleMsg] = useState(false);

  // Check if this is the first entry in this browser session (Change 18)
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return !sessionStorage.getItem('stellar_verse_initialized');
    } catch {
      return false;
    }
  });
  const [isAwakening, setIsAwakening] = useState(false);

  useSEO({
    title: 'Home',
    description:
      'Stellar Portfolio — Full-stack engineer crafting performant, accessible digital experiences with React, Node.js, and Three.js.',
    jsonLd: { ...websiteJsonLd, author: personJsonLd },
  });
  const webGL = useWebGL();

  useEffect(() => {
    if (onReady && webGL !== null) onReady();
  }, [webGL, onReady]);

  // Handle entry handoff from cinematic intro (Change 07, 10, 22)
  const handleEnterHome = useCallback(({ immediate, isReturning }) => {
    setShowIntro(false);
    if (!immediate) {
      setIsAwakening(true);
      const timer = setTimeout(() => setIsAwakening(false), isReturning ? 1000 : 1800);
      return () => clearTimeout(timer);
    }
  }, []);

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
      {/* Cinematic Entry Initialization & Warning Sequence (Change 01, 02, 07) */}
      {showIntro && <StellarGateIntro onEnterHome={handleEnterHome} />}

      {/* 3D background or fallback — Only mounted when intro hands off (Change 02) */}
      <NebulaBackdrop />
      {webGL === null ? (
        <Loader message="Detecting capabilities…" />
      ) : webGL && !showIntro ? (
        <Suspense fallback={<FallbackHero />}>
          <HeroScene />
        </Suspense>
      ) : null}

      {/* Environmental cosmic events (shooting stars, qualitative telemetry) — Change 16, 17 */}
      {!showIntro && <StellarOrnaments />}

      {/* Always render semantic content over the canvas */}
      <div className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center px-4 text-center sm:px-6">
        {!webGL && webGL !== null ? (
          <FallbackHero />
        ) : (
          <>
            {/* Staggered Title Reveal (Change 11) */}
            <motion.h1
              initial={isAwakening ? { opacity: 0, y: 22 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
              className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
            >
              <span className="text-gradient-aurora">Stellar</span>{' '}
              <span className="text-stardust">Developer</span>
            </motion.h1>

            {/* Subtitle Reveal */}
            <motion.p
              initial={isAwakening ? { opacity: 0, y: 16 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
              className="mt-3 max-w-md text-base text-cosmos-muted sm:mt-4 sm:max-w-lg sm:text-lg"
            >
              Full-stack engineer crafting performant, accessible digital experiences.
              Explore my orbit to learn more.
            </motion.p>

            {/* Orbital navigation with celestial awakening */}
            <motion.div
              initial={
                isAwakening ? { opacity: 0, scale: 0.94 } : { opacity: 1, scale: 1 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.45, ease: 'easeOut' }}
              className="w-full"
            >
              <OrbitShell />
            </motion.div>
          </>
        )}
      </div>

      {/* Personal intro section */}
      <HomeIntro />

      {/* Outcome-focused capabilities */}
      <MissionModules />

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
            <div className="mb-2 text-2xl" aria-hidden="true">
              🕳️
            </div>
            <p className="text-sm leading-relaxed text-stardust font-heading">
              &ldquo;The gravitational pull was so strong that you&rsquo;ve been respawned
              where you first started from.&rdquo;
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
