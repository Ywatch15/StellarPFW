// FILE: src/components/cinematic/works/future/FutureProjectField.jsx
// Master Future Project Loading / Coming Soon Sequence
// Architectural Container:
// - Pinned spatial stage with GSAP ScrollTrigger
// - R3F 3D Procedural Canvas with 5 distinct celestial signals
// - Ambient decoupled motion (never freezes on scroll stop)
// - Minimalist spatial telemetry HUD (no generic loaders, no marketing cards)
// - Suspended offscreen lifecycle via useVisibilityState

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useVisibilityState from '../../../../hooks/useVisibilityState';
import useDeviceCapability from '../../../../hooks/useDeviceCapability';
import FutureProjectCanvas from './FutureProjectCanvas';
import FutureProjectHUD from './FutureProjectHUD';
import '../../../../styles/future-projects.css';

gsap.registerPlugin(ScrollTrigger);

export default function FutureProjectField() {
  const containerRef = useRef(null);
  const scrollSpaceRef = useRef(null);
  const stageRef = useRef(null);
  const progressRef = useRef(0);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  const { prefersReducedMotion } = useDeviceCapability();

  // Performance Lifecycle Hook: SUSPENDED -> PREPARE -> ACTIVE -> SUSPENDED
  const { ref: visibilityRef, state: visibilityState } = useVisibilityState({
    nearMargin: '400px 0px',
    visibleMargin: '0px',
    threshold: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP ScrollTrigger Pinned Timeline
  useEffect(() => {
    if (!scrollSpaceRef.current || !stageRef.current) return;

    const isTestEnv =
      (typeof process !== 'undefined' && process.env?.NODE_ENV === 'test') ||
      (typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent));

    if (isTestEnv) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: scrollSpaceRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: stageRef.current,
        scrub: prefersReducedMotion ? false : 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          progressRef.current = p;
          setScrollProgress(p);
          if (progressRef.onFutureUpdate) {
            progressRef.onFutureUpdate(p);
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobileScreen, prefersReducedMotion]);

  return (
    <div
      ref={(node) => {
        containerRef.current = node;
        visibilityRef.current = node;
      }}
      className="future-project-field relative w-full"
      aria-label="Future Project Signals & Deep Space Reservoir"
    >
      {/* ── PINNED SCROLL SPACE ── */}
      <div
        ref={scrollSpaceRef}
        className="future-scroll-space relative w-full"
        style={{ height: isMobileScreen ? '1100vh' : '750vh' }}
      >
        <div
          ref={stageRef}
          className="future-pinned-stage relative w-full h-screen overflow-hidden bg-[#050816]"
        >
          {/* 3D Celestial Universe Canvas */}
          <FutureProjectCanvas
            progressRef={progressRef}
            visibilityState={visibilityState}
          />

          {/* Spatial Telemetry & Atmospheric HUD */}
          <FutureProjectHUD
            progress={scrollProgress}
            isMobile={isMobileScreen}
          />
        </div>
      </div>

      {/* ── FINAL WORKS CONTINUUM FOOTER ── */}
      <footer className="border-t border-white/5 py-12 text-center text-xs text-cosmos-muted bg-[#050816]">
        <p className="font-mono tracking-[0.2em] uppercase text-aurora/80">
          DEEP SPACE RESERVOIR · FUTURE SIGNALS ACTIVE
        </p>
        <p className="mt-2 text-cosmos-muted">
          TentDesk, CommandAtlas, BankSys, AlgoVista, DevGraph &amp; Future Project Continuum.
        </p>
      </footer>
    </div>
  );
}
