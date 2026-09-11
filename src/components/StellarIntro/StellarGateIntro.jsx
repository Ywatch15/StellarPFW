// FILE: src/components/StellarIntro/StellarGateIntro.jsx
// Viewport-level cinematic entry sequence for STELLAR_SUNDRAM.
// Uses createPortal directly to document.body, locks background scroll,
// establishes an impenetrable interaction barrier, and cleanly constructs the universe.
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import useStellarPreload from '../../hooks/useStellarPreload';
import useDeviceCapability from '../../hooks/useDeviceCapability';

// Matching OrbitShell geometry exactly for visual continuity
const CENTER = 170;
const ORBIT_RADIUS = 130;

// Satellite angle markers matching OrbitShell (0, 72, 144, 216, 288)
const SATELLITE_NODES = [
  { angle: 0, color: '#6c63ff' },
  { angle: 72, color: '#38bdf8' },
  { angle: 144, color: '#facc15' },
  { angle: 216, color: '#a78bfa' },
  { angle: 288, color: '#f43f5e' },
];

function getNodePos(angleDeg, radius) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER + Math.cos(rad) * radius,
    y: CENTER + Math.sin(rad) * radius,
  };
}

export default function StellarGateIntro({ onEnterHome }) {
  const { prefersReducedMotion } = useDeviceCapability();
  const [phase, setPhase] = useState('BOOT'); // 'BOOT' | 'LOADING' | 'READY' | 'WARNING' | 'ENTERING'
  const [warningStep, setWarningStep] = useState(0); // 0: none, 1: BEWARE, 2: YOU ARE ENTERING, 3: SUNDRAM'S STELLAR VERSE
  const [isSkipped, setIsSkipped] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const timersRef = useRef([]);

  const addTimer = useCallback((fn, delay) => {
    const id = setTimeout(fn, delay);
    timersRef.current.push(id);
    return id;
  }, []);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  // Real readiness preload hook
  const handlePreloadComplete = useCallback(() => {
    setPhase((prev) => (prev === 'LOADING' ? 'READY' : prev));
  }, []);

  const {
    displayProgress,
    statusMessage,
    cancel: cancelPreload,
  } = useStellarPreload({
    enabled: phase === 'LOADING' && !isSkipped,
    minDuration: 4600, // Cinematic minimum staging (Change 03)
    onComplete: handlePreloadComplete,
  });

  // Skip Intro handler — Clean cancellation of everything (Change 08)
  const handleSkip = useCallback(() => {
    setIsSkipped(true);
    clearAllTimers();
    cancelPreload();
    try {
      sessionStorage.setItem('stellar_verse_initialized', 'true');
    } catch {
      // Storage unavailable fallback
    }
    onEnterHome({ immediate: true });
  }, [clearAllTimers, cancelPreload, onEnterHome]);

  // Viewport scroll lock: lock scroll during intro and reset to top
  useEffect(() => {
    setIsMounted(true);

    if (typeof document === 'undefined') return undefined;

    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // Ensure page starts at top
    try {
      window.scrollTo(0, 0);
    } catch {
      // Safe fallback
    }

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
    };
  }, []);

  // Initial Boot check
  useEffect(() => {
    // If reduced motion is requested, immediately skip cinematic intro (Change 19)
    if (prefersReducedMotion) {
      handleSkip();
      return undefined;
    }

    // Check session storage (Change 18)
    try {
      const alreadySeen = sessionStorage.getItem('stellar_verse_initialized');
      if (alreadySeen) {
        onEnterHome({ immediate: false, isReturning: true });
        return undefined;
      }
    } catch {
      // Safe fallback
    }

    setPhase('LOADING');
    return () => clearAllTimers();
  }, [prefersReducedMotion, handleSkip, onEnterHome, clearAllTimers]);

  // When phase becomes 'READY' -> transition into 'WARNING' (Change 09)
  useEffect(() => {
    if (phase !== 'READY' || isSkipped) return undefined;

    // Brief lock moment at 100% (Change 03 & 07)
    const tReady = addTimer(() => {
      setPhase('WARNING');
    }, 380);

    return () => clearTimeout(tReady);
  }, [phase, isSkipped, addTimer]);

  // Three-Stage Warning sequence progression (Change 09 & Change 10)
  useEffect(() => {
    if (phase !== 'WARNING' || isSkipped) return undefined;

    // Step 1: "BEWARE."
    setWarningStep(1);

    // Step 2: "YOU ARE ENTERING" after 450ms
    const tStep2 = addTimer(() => {
      setWarningStep(2);
    }, 550);

    // Step 3: "SUNDRAM'S STELLAR VERSE" after another 600ms
    const tStep3 = addTimer(() => {
      setWarningStep(3);
    }, 1150);

    // Step 4: Stellar Gate expands into Home after 2200ms total
    const tGate = addTimer(() => {
      setPhase('ENTERING');
    }, 2200);

    return () => {
      clearTimeout(tStep2);
      clearTimeout(tStep3);
      clearTimeout(tGate);
    };
  }, [phase, isSkipped, addTimer]);

  // Entering phase -> hand off to Home after gate expansion animation (Change 10, Change 22)
  useEffect(() => {
    if (phase !== 'ENTERING' || isSkipped) return undefined;

    try {
      sessionStorage.setItem('stellar_verse_initialized', 'true');
    } catch {
      // Safe fallback
    }

    const tComplete = addTimer(() => {
      onEnterHome({ immediate: false, isReturning: false });
    }, 1150); // Matches gate-expand-flythrough duration

    return () => clearTimeout(tComplete);
  }, [phase, isSkipped, addTimer, onEnterHome]);

  if (isSkipped) return null;

  // Geometry computation for radial progress ring
  const ringCircumference = 2 * Math.PI * ORBIT_RADIUS;
  const strokeDashoffset =
    ringCircumference - (displayProgress / 100) * ringCircumference;

  // Visual evolution scale factors (Change 01)
  const sunScale = Math.min(1, Math.max(0.12, displayProgress / 70));
  const sunOpacity = Math.min(1, Math.max(0.2, displayProgress / 25));
  const orbitRingOpacity =
    displayProgress >= 40 ? Math.min(0.45, (displayProgress - 40) / 40) : 0;
  const planetoidOpacity =
    displayProgress >= 70 ? Math.min(1, (displayProgress - 70) / 20) : 0;
  const nodesOpacity =
    displayProgress >= 85 ? Math.min(1, (displayProgress - 85) / 15) : 0;

  const introContent = (
    <div
      className="stellar-intro-screen fixed inset-0 top-0 left-0 z-[99999] flex h-[100dvh] w-[100dvw] flex-col items-center justify-center bg-void p-4 select-none touch-none"
      role="alert"
      aria-live="polite"
      aria-label="Initializing Sundram's Stellar Verse"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100dvh',
        zIndex: 99999,
        backgroundColor: '#050816',
        pointerEvents: 'auto',
      }}
    >
      {/* Ambient background particles (lightweight SVG/CSS, no duplicate WebGL - Change 02) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-40">
        <div className="absolute left-1/4 top-1/4 h-80 w-80 rounded-full bg-comet/15 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-aurora/15 blur-3xl" />
      </div>

      {/* Main Celestial Construct SVG (Exact 340x340 geometry as Home OrbitShell) */}
      <div
        className={`relative mx-auto w-[min(380px,88vw)] transition-transform duration-700 ${
          phase === 'ENTERING' ? 'stellar-gate-expanding' : ''
        }`}
      >
        <svg
          viewBox="0 0 340 340"
          className="h-auto w-full overflow-visible"
          role="presentation"
        >
          <defs>
            {/* Sun Radial Gradient */}
            <radialGradient id="introSunGradient" cx="40%" cy="40%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="45%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#d97706" />
            </radialGradient>

            {/* Radial Energy Ring Gradient */}
            <linearGradient id="orbitEnergyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6c63ff" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#facc15" />
            </linearGradient>

            {/* Gate Arc Gradient */}
            <linearGradient id="gateArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(56,189,248,0.1)" />
              <stop offset="50%" stopColor="rgba(56,189,248,0.8)" />
              <stop offset="100%" stopColor="rgba(167,139,250,0.1)" />
            </linearGradient>
          </defs>

          {/* ── STAGE 1: Radial Orbit Ring Progress (Change 01) ── */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={ORBIT_RADIUS}
            fill="none"
            stroke="#1e293b"
            strokeWidth="1.5"
            opacity={0.35}
          />

          {/* Progressing energy ring completing the orbit */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={ORBIT_RADIUS}
            fill="none"
            stroke="url(#orbitEnergyGrad)"
            strokeWidth={phase === 'WARNING' || phase === 'ENTERING' ? '2.5' : '1.8'}
            strokeDasharray={ringCircumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="stellar-loader-ring-glow transition-all duration-150"
            transform={`rotate(-90 ${CENTER} ${CENTER})`}
          />

          {/* Home Orbit Ring foundation fading in (Change 01) */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={ORBIT_RADIUS}
            fill="none"
            stroke="#6c63ff"
            strokeWidth="0.8"
            strokeDasharray="4 4"
            opacity={orbitRingOpacity}
          />

          {/* Scanning orbital arc */}
          {phase === 'LOADING' && (
            <circle
              cx={CENTER}
              cy={CENTER}
              r={ORBIT_RADIUS}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeDasharray="30 220"
              className="stellar-scan-arc opacity-70"
            />
          )}

          {/* ── STAGE 2: Central Evolving Stellar Core (Change 01) ── */}
          {/* Outer Sun Glow Corona */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={30 * sunScale}
            fill="#facc15"
            opacity={0.25 * sunOpacity}
            className="stellar-loader-pulse"
          />

          {/* Core Sun body evolving into Home Sun */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={22 * sunScale}
            fill="url(#introSunGradient)"
            opacity={sunOpacity}
            style={{
              filter: `drop-shadow(0 0 ${12 * sunScale}px rgba(250,204,21,0.8))`,
            }}
          />

          {/* Tiny central core beacon */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={displayProgress < 30 ? 4 : 2}
            fill="#ffffff"
            opacity={0.9}
          />

          {/* ── STAGE 3: Evolving Planetoid / Asteroid (Change 01) ── */}
          {displayProgress >= 70 && (
            <g opacity={planetoidOpacity}>
              {/* Planetoid at top of orbit */}
              <circle
                cx={CENTER}
                cy={CENTER - ORBIT_RADIUS}
                r="3"
                fill="#38bdf8"
                style={{ filter: 'drop-shadow(0 0 6px #38bdf8)' }}
              />
              {/* Moon / Asteroid trailing */}
              <circle
                cx={CENTER + 12}
                cy={CENTER - ORBIT_RADIUS + 4}
                r="1.5"
                fill="#facc15"
                opacity={0.8}
              />
            </g>
          )}

          {/* ── STAGE 4: Navigation Nodes Aligning (Change 01) ── */}
          {displayProgress >= 85 && (
            <g opacity={nodesOpacity}>
              {SATELLITE_NODES.map((node) => {
                const pos = getNodePos(node.angle, ORBIT_RADIUS);
                return (
                  <g key={node.angle}>
                    <line
                      x1={CENTER}
                      y1={CENTER}
                      x2={pos.x}
                      y2={pos.y}
                      stroke={node.color}
                      strokeWidth="0.5"
                      opacity={0.3}
                      strokeDasharray="2 3"
                    />
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="4"
                      fill="#0a0f2c"
                      stroke={node.color}
                      strokeWidth="1.2"
                    />
                  </g>
                );
              })}
            </g>
          )}

          {/* ── STAGE 5: Stellar Gate Concentric Arcs (Change 10) ── */}
          {(phase === 'WARNING' || phase === 'ENTERING') && (
            <g className="stellar-gate-construct">
              <circle
                cx={CENTER}
                cy={CENTER}
                r={ORBIT_RADIUS + 22}
                fill="none"
                stroke="url(#gateArcGrad)"
                strokeWidth="1.2"
                strokeDasharray="60 40 10 30"
                className="stellar-gate-arc-1"
              />
              <circle
                cx={CENTER}
                cy={CENTER}
                r={ORBIT_RADIUS - 30}
                fill="none"
                stroke="url(#gateArcGrad)"
                strokeWidth="0.8"
                strokeDasharray="80 30"
                className="stellar-gate-arc-2"
              />
              <circle
                cx={CENTER}
                cy={CENTER}
                r={ORBIT_RADIUS + 38}
                fill="none"
                stroke="#6c63ff"
                strokeWidth="0.5"
                opacity={0.3}
                strokeDasharray="12 18"
                className="stellar-gate-arc-3"
              />
            </g>
          )}
        </svg>
      </div>

      {/* ── Stage-Specific Text & Telemetry ── */}
      <div className="relative z-10 mt-8 min-h-[140px] text-center">
        {/* Phase: LOADING / READY */}
        {(phase === 'LOADING' || phase === 'READY') && (
          <div className="flex flex-col items-center space-y-3">
            <div className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-aurora/90">
              ☉ STELLAR_SUNDRAM
            </div>

            {/* Percentage Counter (0% -> 100%) */}
            <div className="font-mono text-3xl font-light tracking-wider text-stardust sm:text-4xl">
              {displayProgress}%
            </div>

            {/* Telemetry Status Line */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cosmos-muted">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-aurora animate-ping" />
              <span>{statusMessage}</span>
            </div>
          </div>
        )}

        {/* Phase: WARNING & STELLAR GATE (Change 09) */}
        {(phase === 'WARNING' || phase === 'ENTERING') && (
          <div className="flex flex-col items-center justify-center space-y-3">
            {/* Step 1: "BEWARE." */}
            {warningStep >= 1 && (
              <div className="stellar-warning-beware font-heading text-lg font-bold uppercase text-supernova transition-all duration-300 sm:text-xl">
                BEWARE.
              </div>
            )}

            {/* Step 2: "YOU ARE ENTERING" */}
            {warningStep >= 2 && (
              <div className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-cosmos-muted transition-all duration-300 sm:text-sm">
                YOU ARE ENTERING
              </div>
            )}

            {/* Step 3: Hero Title "SUNDRAM'S STELLAR VERSE" (Change 09) */}
            {warningStep >= 3 && (
              <div className="stellar-hero-verse font-heading text-xl font-extrabold uppercase tracking-[0.25em] transition-all duration-500 sm:text-2xl md:text-3xl">
                SUNDRAM&apos;S STELLAR VERSE
              </div>
            )}
          </div>
        )}
      </div>

      {/* Subtle "Skip intro →" in bottom right corner (Change 08, Change 18) */}
      <button
        onClick={handleSkip}
        className="absolute bottom-6 right-6 z-[100000] rounded-full border border-white/10 bg-nebula/60 px-4 py-1.5 font-mono text-xs text-cosmos-muted backdrop-blur-sm transition-colors hover:border-aurora/40 hover:text-stardust focus-visible:ring-2 focus-visible:ring-aurora"
        aria-label="Skip introduction and proceed to home"
        style={{ pointerEvents: 'auto' }}
      >
        Skip intro &rarr;
      </button>
    </div>
  );

  // Render via portal to document.body to guarantee viewport-level overlay
  if (typeof document !== 'undefined' && document.body && isMounted) {
    return createPortal(introContent, document.body);
  }

  return introContent;
}
