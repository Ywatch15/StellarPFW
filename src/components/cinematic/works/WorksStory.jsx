// FILE: src/components/cinematic/works/WorksStory.jsx
// Spatial-Continuum Works Experience: Dynamic Composition Zones, Non-Card Semantic Beats,
// Structural Navigation Safe Area, and Physical Spatial Motion.
import React, { useRef } from 'react';
import { invalidate } from '@react-three/fiber';
import WorksSpatialScene from './WorksSpatialScene';
import useCinematicTimeline from '../useCinematicTimeline';
import useVisibilityState from '../../../hooks/useVisibilityState';
import TentDeskStateFlow from './primitives/TentDeskStateFlow';
import TentDeskIncidentAudit from './primitives/TentDeskIncidentAudit';
import CommandAtlasPipelineFlow from './primitives/CommandAtlasPipelineFlow';
import CommandAtlasDecisionMatrix from './primitives/CommandAtlasDecisionMatrix';
import '../../../styles/cinematic-engine.css';
import '../../../styles/works-cinematic.css';

export default function WorksStory() {
  const containerRef = useRef(null);
  const scrollSpaceRef = useRef(null);
  const stageRef = useRef(null);
  const progressRef = useRef(0);

  // Story Elements & Dynamic Composition Zones
  const introRef = useRef(null);

  // TentDesk Dynamic Zone
  const tentdeskZoneRef = useRef(null);
  const tentdeskTitleRef = useRef(null);
  const tentdeskOverviewRef = useRef(null);
  const tentdeskFlowRef = useRef(null);
  const tentdeskIncidentRef = useRef(null);

  // Continuum Handoff Bridge
  const handoffBridgeRef = useRef(null);

  // CommandAtlas Dynamic Zone
  const commandatlasZoneRef = useRef(null);
  const commandatlasTitleRef = useRef(null);
  const commandatlasOverviewRef = useRef(null);
  const commandatlasPipelineRef = useRef(null);
  const commandatlasDecisionRef = useRef(null);

  // Section-level visibility state (SUSPENDED -> PREPARE -> ACTIVE)
  const { ref: visibilityRef, state: visibilityState, isPageVisible } = useVisibilityState({
    nearMargin: '400px 0px',
    visibleMargin: '0px',
    threshold: 0.05,
  });

  // Scoped GSAP ScrollTrigger timeline with physical spatial motion
  const { isFallback } = useCinematicTimeline(
    (self, gsap) => {
      if (
        !scrollSpaceRef.current ||
        !stageRef.current ||
        !introRef.current ||
        !tentdeskZoneRef.current ||
        !tentdeskTitleRef.current ||
        !tentdeskOverviewRef.current ||
        !tentdeskFlowRef.current ||
        !tentdeskIncidentRef.current ||
        !handoffBridgeRef.current ||
        !commandatlasZoneRef.current ||
        !commandatlasTitleRef.current ||
        !commandatlasOverviewRef.current ||
        !commandatlasPipelineRef.current ||
        !commandatlasDecisionRef.current
      ) {
        return;
      }

      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollSpaceRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: stageRef.current,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (st) => {
            progressRef.current = st.progress;
            if (progressRef.onSpatialUpdate) {
              progressRef.onSpatialUpdate(st.progress);
            }
            invalidate();
          },
        },
      });

      // ── INITIAL PHYSICAL SPATIAL STATES ──
      gsap.set(introRef.current, { x: 0, y: 0, scale: 1, opacity: 1, filter: 'blur(0px)' });

      // TentDesk initial offscreen states
      gsap.set(tentdeskTitleRef.current, {
        x: isMobile ? '50vw' : '70vw',
        scale: 0.92,
        opacity: 0,
        filter: 'blur(4px)',
      });
      gsap.set(tentdeskOverviewRef.current, {
        y: 25,
        opacity: 0,
        filter: 'blur(3px)',
      });
      gsap.set(tentdeskFlowRef.current, {
        x: 40,
        scale: 0.94,
        opacity: 0,
        filter: 'blur(4px)',
      });
      gsap.set(tentdeskIncidentRef.current, {
        x: 40,
        scale: 0.94,
        opacity: 0,
        filter: 'blur(4px)',
      });

      // Handoff bridge
      gsap.set(handoffBridgeRef.current, { scale: 0.85, opacity: 0 });

      // CommandAtlas initial offscreen states
      gsap.set(commandatlasTitleRef.current, {
        x: isMobile ? '50vw' : '70vw',
        scale: 0.92,
        opacity: 0,
        filter: 'blur(4px)',
      });
      gsap.set(commandatlasOverviewRef.current, {
        y: 25,
        opacity: 0,
        filter: 'blur(3px)',
      });
      gsap.set(commandatlasPipelineRef.current, {
        x: 40,
        scale: 0.94,
        opacity: 0,
        filter: 'blur(4px)',
      });
      gsap.set(commandatlasDecisionRef.current, {
        x: 40,
        scale: 0.94,
        opacity: 0,
        filter: 'blur(4px)',
      });

      // ── BEAT 1: INTRO (0.00 -> 0.12) ──
      // Title and thesis sweep out along a diagonal physical motion vector
      tl.to(
        introRef.current,
        {
          x: isMobile ? '-50vw' : '-75vw',
          y: '-5vh',
          scale: 0.92,
          filter: 'blur(5px)',
          opacity: 0,
          ease: 'power2.in',
          duration: 0.08,
        },
        0.04,
      );

      // ── BEAT 2A: TENTDESK ARRIVAL & IDENTITY (0.13 -> 0.26) ──
      // Title sweeps into left focal plane with spatial depth
      tl.to(
        tentdeskTitleRef.current,
        {
          x: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'power2.out',
          duration: 0.06,
        },
        0.13,
      );

      // Scope and metadata follow
      tl.to(
        tentdeskOverviewRef.current,
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'power1.out',
          duration: 0.05,
        },
        0.15,
      );

      // (0.18 -> 0.22) STILLNESS WINDOW: Identity dominant, Station in ambient life

      // Overview exits completely before Beat 2B begins
      tl.to(
        tentdeskOverviewRef.current,
        {
          x: -35,
          scale: 0.95,
          opacity: 0,
          filter: 'blur(3px)',
          ease: 'power1.in',
          duration: 0.03,
        },
        0.23,
      );

      tl.to(
        tentdeskTitleRef.current,
        {
          scale: isMobile ? 0.78 : 0.7,
          transformOrigin: 'left top',
          ease: 'power1.inOut',
          duration: 0.03,
        },
        0.23,
      );

      // ── BEAT 2B: ARCHITECTURE & REAL-TIME STATE FLOW (0.27 -> 0.41) ──
      // Diagram becomes primary with depth aperture (starts after overview is 100% gone)
      tl.to(
        tentdeskFlowRef.current,
        {
          x: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'power2.out',
          duration: 0.05,
        },
        0.27,
      );

      // (0.32 -> 0.37) STILLNESS WINDOW: Data flow diagram settled and readable

      // State flow exits completely before Beat 2C begins
      tl.to(
        tentdeskFlowRef.current,
        {
          x: -35,
          scale: 0.95,
          opacity: 0,
          filter: 'blur(3px)',
          ease: 'power1.in',
          duration: 0.03,
        },
        0.38,
      );

      // ── BEAT 2C: PRODUCTION AUDIT & INCIDENTS (0.42 -> 0.52) ──
      // Diagnostics become primary (starts after flow is 100% gone)
      tl.to(
        tentdeskIncidentRef.current,
        {
          x: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'power2.out',
          duration: 0.05,
        },
        0.42,
      );

      // (0.46 -> 0.49) STILLNESS WINDOW: Incident disclosures settled and readable

      // TentDesk exits completely as handoff approaches
      tl.to(
        [tentdeskIncidentRef.current, tentdeskTitleRef.current],
        {
          x: isMobile ? '-60vw' : '-80vw',
          scale: 0.9,
          opacity: 0,
          filter: 'blur(5px)',
          ease: 'power2.in',
          duration: 0.04,
        },
        0.49,
      );

      // ── BEAT 3: SPATIAL CONTINUUM HANDOFF (0.53 -> 0.64) ──
      // Full-viewport spatial freedom: Station recedes left/depth, Satellite enters right/depth
      tl.to(
        handoffBridgeRef.current,
        {
          scale: 1,
          opacity: 1,
          ease: 'power1.out',
          duration: 0.04,
        },
        0.53,
      );

      tl.to(
        handoffBridgeRef.current,
        {
          scale: 1.08,
          opacity: 0,
          ease: 'power1.in',
          duration: 0.04,
        },
        0.60,
      );

      // ── BEAT 4A: COMMANDATLAS IDENTITY & KNOWLEDGE CONSTELLATION (0.65 -> 0.78) ──
      // Title sweeps into left focal plane with spatial depth
      tl.to(
        commandatlasTitleRef.current,
        {
          x: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'power2.out',
          duration: 0.05,
        },
        0.65,
      );

      // Overview follows
      tl.to(
        commandatlasOverviewRef.current,
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'power1.out',
          duration: 0.04,
        },
        0.67,
      );

      // (0.71 -> 0.74) STILLNESS WINDOW: Identity dominant, 366 commands readable

      // Overview exits completely before Beat 4B begins
      tl.to(
        commandatlasOverviewRef.current,
        {
          x: -35,
          scale: 0.95,
          opacity: 0,
          filter: 'blur(3px)',
          ease: 'power1.in',
          duration: 0.03,
        },
        0.75,
      );

      tl.to(
        commandatlasTitleRef.current,
        {
          scale: isMobile ? 0.78 : 0.7,
          transformOrigin: 'left top',
          ease: 'power1.inOut',
          duration: 0.03,
        },
        0.75,
      );

      // ── BEAT 4B: DETERMINISTIC COMPILATION PIPELINE (0.79 -> 0.91) ──
      // Pipeline flow expands into primary focus (starts after overview is 100% gone)
      tl.to(
        commandatlasPipelineRef.current,
        {
          x: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'power2.out',
          duration: 0.05,
        },
        0.79,
      );

      // (0.83 -> 0.87) STILLNESS WINDOW: Compilation pipeline settled and readable

      // Pipeline exits completely before Beat 4C begins
      tl.to(
        commandatlasPipelineRef.current,
        {
          x: -35,
          scale: 0.95,
          opacity: 0,
          filter: 'blur(3px)',
          ease: 'power1.in',
          duration: 0.03,
        },
        0.88,
      );

      // ── BEAT 4C: ADR-013 ARCHITECTURE & DECISION MATRIX (0.92 -> 1.00) ──
      // Architecture decisions become primary (starts after pipeline is 100% gone)
      tl.to(
        commandatlasDecisionRef.current,
        {
          x: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'power2.out',
          duration: 0.05,
        },
        0.92,
      );

      // (0.95 -> 0.98) STILLNESS WINDOW: ADR-013 decisions settled and readable

      // Final unpin fade
      tl.to(
        [commandatlasDecisionRef.current, commandatlasTitleRef.current],
        {
          opacity: 0.25,
          ease: 'power1.in',
          duration: 0.02,
        },
        0.98,
      );
    },
    containerRef,
    [],
    { visibilityState },
  );

  return (
    <div ref={containerRef} className="cinematic-story relative w-full">
      {/* ── EXPLICIT SCROLL SPACE & PINNED STAGE ── */}
      <div
        ref={(node) => {
          scrollSpaceRef.current = node;
          visibilityRef.current = node;
        }}
        className="cinematic-scroll-space relative w-full"
        style={{ height: isFallback ? 'auto' : '680vh' }}
        aria-label="Interactive Spatial Story Continuum"
      >
        <div
          ref={stageRef}
          className={`cinematic-stage relative w-full ${isFallback ? 'h-auto overflow-visible' : 'h-screen overflow-hidden'}`}
          aria-label="Interactive Project Continuum"
        >
          {/* 3D Unified Spatial Canvas */}
          {!isFallback && (
            <div className="works-3d-backdrop">
              <WorksSpatialScene
                progressRef={progressRef}
                visibilityState={visibilityState}
              />
            </div>
          )}

          {/* Full-viewport Spatial Story DOM Overlay */}
          <div className="works-spatial-layer">
            {/* Structural Navigation Safe Barrier (ensures 0px overlap with sticky header) */}
            <div className="spatial-nav-safe-barrier" aria-hidden="true" />

            {/* Padded Narrative Viewport constrained strictly below top navbar */}
            <div className="spatial-story-viewport">
              {/* ── BEAT 1: INTRO (WHAT I BUILT) ── */}
              <div
                ref={introRef}
                className="spatial-composition-zone spatial-composition-zone--intro"
                aria-label="Works Introduction"
              >
                <div className="spatial-coordinate-eyebrow text-aurora">
                  <span>OPERATIONAL SYSTEMS · PRODUCTION SAAS &amp; DETERMINISTIC RETRIEVAL</span>
                </div>
                <h2 className="spatial-hero-title">
                  What I <span className="spatial-hero-title--cyan">Built</span>
                </h2>
                <p className="spatial-story-lead">
                  Production systems serving active commercial customers, alongside deterministic
                  offline-first references built for resilient terminal workflows.
                </p>
                <div className="spatial-telemetry-row">
                  <span className="spatial-pill">TENTDESK · PRODUCTION SAAS</span>
                  <span className="spatial-pill">COMMANDATLAS · OFFLINE-FIRST</span>
                  <span className="spatial-pill">RESILIENT ARCHITECTURES</span>
                </div>
              </div>

              {/* ── BEAT 2: TENTDESK DYNAMIC COMPOSITION ZONE ── */}
              <div
                ref={tentdeskZoneRef}
                className="spatial-composition-zone spatial-composition-zone--tentdesk"
                aria-labelledby="tentdesk-heading"
              >
                {/* Title & Coordinate Eyebrow */}
                <div ref={tentdeskTitleRef}>
                  <div className="spatial-coordinate-eyebrow text-[#38bdf8]">
                    <span>ACTIVE SYSTEM · FOUNDER &amp; CTO · LIVE CUSTOMERS</span>
                  </div>
                  <h3
                    id="tentdesk-heading"
                    className="spatial-hero-title spatial-hero-title--cyan"
                  >
                    TentDesk
                  </h3>
                </div>

                {/* Narrative Container: Sequential Semantic Beats */}
                <div className="relative w-full mt-2 min-h-[22rem]">
                  {/* Beat 2A: Overview & Operational Scope */}
                  <div ref={tentdeskOverviewRef} className="spatial-story-beat">
                    <p className="spatial-story-lead">
                      Multi-tenant operational platform engineered for tent and event-rental businesses:
                      managing active inventory, order lifecycle, returns, customer accounts, and real-time state synchronization.
                    </p>
                    <div className="spatial-telemetry-row">
                      <span className="spatial-pill">Next.js</span>
                      <span className="spatial-pill">Prisma</span>
                      <span className="spatial-pill">MongoDB</span>
                      <span className="spatial-pill">TanStack Query</span>
                      <span className="spatial-pill">PWA</span>
                      <span className="spatial-pill">SSE</span>
                    </div>
                    <p className="mt-3 text-xs font-mono text-cosmos-muted/80 tracking-wide">
                      OPERATIONAL SCOPE: INVENTORY · RENTALS · RETURNS · CUSTOMERS · PAYMENTS · EVENTS · WAGES
                    </p>
                  </div>

                  {/* Beat 2B: State Flow Diagram */}
                  <div ref={tentdeskFlowRef} className="spatial-story-beat">
                    <TentDeskStateFlow />
                  </div>

                  {/* Beat 2C: Production Audits & Incidents */}
                  <div ref={tentdeskIncidentRef} className="spatial-story-beat">
                    <TentDeskIncidentAudit />
                  </div>
                </div>
              </div>

              {/* ── BEAT 3: SPATIAL CONTINUUM HANDOFF BRIDGE ── */}
              <div
                ref={handoffBridgeRef}
                className="spatial-composition-zone spatial-composition-zone--handoff"
                aria-hidden="true"
              >
                <div className="spatial-handoff-bridge">
                  <span className="spatial-status-dot spatial-status-dot--cyan" />
                  <span className="spatial-handoff-text">
                    CONTINUUM TRANSITION · COMMERCIAL SAAS → OFFLINE DETERMINISM
                  </span>
                  <span className="spatial-status-dot spatial-status-dot--amber" />
                </div>
              </div>

              {/* ── BEAT 4: COMMANDATLAS DYNAMIC COMPOSITION ZONE ── */}
              <div
                ref={commandatlasZoneRef}
                className="spatial-composition-zone spatial-composition-zone--commandatlas"
                aria-labelledby="commandatlas-heading"
              >
                {/* Title & Coordinate Eyebrow */}
                <div ref={commandatlasTitleRef}>
                  <div className="spatial-coordinate-eyebrow text-[#a78bfa]">
                    <span>KNOWLEDGE CONSTELLATION · OFFLINE-FIRST ARCHITECTURE</span>
                  </div>
                  <h3
                    id="commandatlas-heading"
                    className="spatial-hero-title spatial-hero-title--purple"
                  >
                    CommandAtlas
                  </h3>
                </div>

                {/* Narrative Container: Sequential Semantic Beats */}
                <div className="relative w-full mt-2 min-h-[22rem]">
                  {/* Beat 4A: Overview & Scope */}
                  <div ref={commandatlasOverviewRef} className="spatial-story-beat">
                    <p className="spatial-story-lead">
                      An offline-first command reference where Markdown documentation
                      compiles into validated static packs and deterministic local search.
                      366 commands across 21 canonical topics.
                    </p>
                    <div className="spatial-telemetry-row">
                      <span className="spatial-pill">Next.js</span>
                      <span className="spatial-pill">Express</span>
                      <span className="spatial-pill">Prisma</span>
                      <span className="spatial-pill">PostgreSQL</span>
                      <span className="spatial-pill">Dexie IndexedDB</span>
                      <span className="spatial-pill">No AI by Design</span>
                    </div>
                    <p className="mt-3 text-xs font-mono text-cosmos-muted/80 tracking-wide">
                      CONTENT PIPELINE: MARKDOWN SOURCE → BUILD-TIME VALIDATION → STATIC PACKS
                    </p>
                  </div>

                  {/* Beat 4B: Deterministic Compilation Pipeline */}
                  <div ref={commandatlasPipelineRef} className="spatial-story-beat">
                    <CommandAtlasPipelineFlow />
                  </div>

                  {/* Beat 4C: ADR-013 & Decision Matrix */}
                  <div ref={commandatlasDecisionRef} className="spatial-story-beat">
                    <CommandAtlasDecisionMatrix />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* ── SCENE 4: PILOT STATUS / GATEWAY ── */}
      <footer className="border-t border-white/5 py-12 text-center text-xs text-cosmos-muted">
        <p className="font-mono tracking-[0.2em] uppercase text-aurora/80">
          WORKS PILOT · SPATIAL CONTINUUM ACTIVE
        </p>
        <p className="mt-2 text-cosmos-muted">
          TentDesk &amp; CommandAtlas spatial continuum active.
        </p>
      </footer>
    </div>
  );
}
