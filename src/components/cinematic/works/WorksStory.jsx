// FILE: src/components/cinematic/works/WorksStory.jsx
// Spatial-Continuum Works Pilot: Section Entry -> TentDesk Deep Story -> Spatial Handoff -> CommandAtlas Deep Story
// Translates real engineering information into animated storytelling beats without project cards or dashboard clutter.
import React, { useRef } from 'react';
import { invalidate } from '@react-three/fiber';
import WorksSpatialScene from './WorksSpatialScene';
import useCinematicTimeline from '../useCinematicTimeline';
import useVisibilityState from '../../../hooks/useVisibilityState';

// Visual Storytelling Primitives
import OperationalFlow from './primitives/OperationalFlow';
import SystemArchitectureFlow from './primitives/SystemArchitectureFlow';
import IncidentInvestigation from './primitives/IncidentInvestigation';
import ResponsibilityBridge from './primitives/ResponsibilityBridge';
import CommandAtlasPipeline from './primitives/CommandAtlasPipeline';
import DecisionMatrix from './primitives/DecisionMatrix';

import '../../../styles/cinematic-engine.css';
import '../../../styles/works-cinematic.css';

export default function WorksStory() {
  const containerRef = useRef(null);
  const scrollSpaceRef = useRef(null);
  const stageRef = useRef(null);
  const progressRef = useRef(0);

  // Story Elements
  const introRef = useRef(null);

  // TentDesk Story Beats
  const tentdeskGroupRef = useRef(null);
  const tentdeskIdentityRef = useRef(null);
  const tentdeskOperationsRef = useRef(null);
  const tentdeskArchitectureRef = useRef(null);
  const tentdeskIncidentRef = useRef(null);
  const tentdeskResponsibilityRef = useRef(null);

  // CommandAtlas Story Beats
  const commandatlasGroupRef = useRef(null);
  const commandatlasIdentityRef = useRef(null);
  const commandatlasPipelineRef = useRef(null);
  const commandatlasDecisionRef = useRef(null);

  // Section-level visibility state (SUSPENDED -> PREPARE -> ACTIVE)
  const { ref: visibilityRef, state: visibilityState, isPageVisible } = useVisibilityState({
    nearMargin: '400px 0px',
    visibleMargin: '0px',
    threshold: 0.05,
  });

  // Scoped GSAP ScrollTrigger timeline
  const { isFallback } = useCinematicTimeline(
    (self, gsap) => {
      if (
        !scrollSpaceRef.current ||
        !stageRef.current ||
        !introRef.current ||
        !tentdeskGroupRef.current ||
        !tentdeskIdentityRef.current ||
        !commandatlasGroupRef.current ||
        !commandatlasIdentityRef.current
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

      // ── INITIAL OFFSCREEN & HIDDEN STATES ──
      gsap.set(introRef.current, { x: '0vw', opacity: 1 });

      gsap.set(tentdeskIdentityRef.current, {
        x: isMobile ? '60vw' : '85vw',
        opacity: 0,
      });
      if (tentdeskOperationsRef.current) {
        gsap.set(tentdeskOperationsRef.current, { opacity: 0, y: 30 });
      }
      if (tentdeskArchitectureRef.current) {
        gsap.set(tentdeskArchitectureRef.current, { opacity: 0, y: 30 });
      }
      if (tentdeskIncidentRef.current) {
        gsap.set(tentdeskIncidentRef.current, { opacity: 0, y: 30 });
      }
      if (tentdeskResponsibilityRef.current) {
        gsap.set(tentdeskResponsibilityRef.current, { opacity: 0, y: 30 });
      }

      gsap.set(commandatlasIdentityRef.current, {
        x: isMobile ? '60vw' : '85vw',
        opacity: 0,
      });
      if (commandatlasPipelineRef.current) {
        gsap.set(commandatlasPipelineRef.current, { opacity: 0, y: 30 });
      }
      if (commandatlasDecisionRef.current) {
        gsap.set(commandatlasDecisionRef.current, { opacity: 0, y: 30 });
      }

      // ── BEAT 1: INTRO (0.00 -> 0.08) ──
      tl.to(
        introRef.current,
        {
          x: isMobile ? '-60vw' : '-90vw',
          opacity: 0,
          ease: 'power1.in',
          duration: 0.07,
        },
        0.02,
      );

      // ── BEAT 2: TENTDESK IDENTITY (0.08 -> 0.16) ──
      tl.to(
        tentdeskIdentityRef.current,
        {
          x: '0vw',
          opacity: 1,
          ease: 'power2.out',
          duration: 0.07,
        },
        0.08,
      );
      // (0.11 -> 0.16) Stillness window for identity

      // ── BEAT 3: THE OPERATIONAL WORLD (0.17 -> 0.27) ──
      tl.to(
        tentdeskIdentityRef.current,
        {
          y: -15,
          opacity: 0.85,
          duration: 0.04,
        },
        0.16,
      );
      if (tentdeskOperationsRef.current) {
        tl.to(
          tentdeskOperationsRef.current,
          {
            opacity: 1,
            y: 0,
            ease: 'power1.out',
            duration: 0.06,
          },
          0.17,
        );
        // (0.20 -> 0.25) Stillness window for operations workflow
        tl.to(
          tentdeskOperationsRef.current,
          {
            opacity: 0,
            y: -25,
            duration: 0.04,
          },
          0.26,
        );
      }

      // ── BEAT 4: SYSTEM ARCHITECTURE & SSE (0.28 -> 0.39) ──
      if (tentdeskArchitectureRef.current) {
        tl.to(
          tentdeskArchitectureRef.current,
          {
            opacity: 1,
            y: 0,
            ease: 'power1.out',
            duration: 0.06,
          },
          0.28,
        );
        // (0.31 -> 0.37) Stillness window for system architecture
        tl.to(
          tentdeskArchitectureRef.current,
          {
            opacity: 0,
            y: -25,
            duration: 0.04,
          },
          0.38,
        );
      }

      // ── BEAT 5: PRODUCTION INCIDENTS (~25s & Mobile Auth) (0.40 -> 0.52) ──
      if (tentdeskIncidentRef.current) {
        tl.to(
          tentdeskIncidentRef.current,
          {
            opacity: 1,
            y: 0,
            ease: 'power1.out',
            duration: 0.06,
          },
          0.40,
        );
        // (0.43 -> 0.50) Stillness window for diagnostic reading
        tl.to(
          tentdeskIncidentRef.current,
          {
            opacity: 0,
            y: -25,
            duration: 0.04,
          },
          0.51,
        );
      }

      // ── BEAT 6: PRODUCTION RESPONSIBILITY BRIDGE (0.53 -> 0.62) ──
      if (tentdeskResponsibilityRef.current) {
        tl.to(
          tentdeskResponsibilityRef.current,
          {
            opacity: 1,
            y: 0,
            ease: 'power1.out',
            duration: 0.05,
          },
          0.53,
        );
        // (0.55 -> 0.59) Stillness window for principle
      }

      // ── BEAT 7: SPATIAL CONTINUUM HANDOFF (0.60 -> 0.70) ──
      // TentDesk group sweeps out to the deep left
      tl.to(
        tentdeskGroupRef.current,
        {
          x: isMobile ? '-70vw' : '-100vw',
          opacity: 0,
          ease: 'power1.inOut',
          duration: 0.10,
        },
        0.60,
      );

      // AT THE SAME TIME: CommandAtlas Identity sweeps in from the right
      tl.to(
        commandatlasIdentityRef.current,
        {
          x: '0vw',
          opacity: 1,
          ease: 'power2.out',
          duration: 0.08,
        },
        0.64,
      );

      // ── BEAT 8: WHY OFFLINE-FIRST & CONTENT PIPELINE (0.70 -> 0.81) ──
      if (commandatlasPipelineRef.current) {
        tl.to(
          commandatlasPipelineRef.current,
          {
            opacity: 1,
            y: 0,
            ease: 'power1.out',
            duration: 0.06,
          },
          0.70,
        );
        // (0.73 -> 0.79) Stillness window for pipeline diagram
        tl.to(
          commandatlasPipelineRef.current,
          {
            opacity: 0,
            y: -25,
            duration: 0.04,
          },
          0.80,
        );
      }

      // ── BEAT 9: ADR-013, NO AI BY DESIGN & SCALE ANCHORS (0.81 -> 0.95) ──
      if (commandatlasDecisionRef.current) {
        tl.to(
          commandatlasDecisionRef.current,
          {
            opacity: 1,
            y: 0,
            ease: 'power1.out',
            duration: 0.06,
          },
          0.81,
        );
        // (0.85 -> 0.94) Dominant stillness window: 366 commands & ADR-013 decision
      }
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
        style={{ height: isFallback ? 'auto' : '720vh' }}
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

          {/* Full-viewport Spatial Story Overlay (Zero Card Boxes) */}
          <div className="works-spatial-layer">
            {/* ── BEAT 1: INTRO (WHAT I BUILT) ── */}
            <div
              ref={introRef}
              className="spatial-intro-stage"
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

            {/* ── TENTDESK STORY CONTINUUM ── */}
            <div
              ref={tentdeskGroupRef}
              className="spatial-project-group spatial-project-group--tentdesk"
              aria-labelledby="tentdesk-heading"
            >
              {/* Beat 2: Identity */}
              <div ref={tentdeskIdentityRef} className="mb-4">
                <div className="spatial-coordinate-eyebrow text-[#38bdf8]">
                  <span>ACTIVE SYSTEM · FOUNDER &amp; CTO · LIVE CUSTOMERS</span>
                </div>
                <h3
                  id="tentdesk-heading"
                  className="spatial-hero-title spatial-hero-title--cyan"
                >
                  TentDesk
                </h3>
                <p className="spatial-story-lead">
                  Operational software built from the ground up for tent &amp; event-rental businesses:
                  managing active inventory, orders, customer accounts, and real-time state synchronization.
                </p>
                <div className="spatial-telemetry-row">
                  <span className="spatial-pill">Next.js</span>
                  <span className="spatial-pill">Prisma</span>
                  <span className="spatial-pill">MongoDB</span>
                  <span className="spatial-pill">TanStack Query</span>
                  <span className="spatial-pill">PWA</span>
                  <span className="spatial-pill">SSE</span>
                </div>
              </div>

              {/* Beat 3: The Operational World */}
              <OperationalFlow containerRef={tentdeskOperationsRef} />

              {/* Beat 4: System Architecture & SSE */}
              <SystemArchitectureFlow containerRef={tentdeskArchitectureRef} />

              {/* Beat 5: Production Incidents */}
              <IncidentInvestigation containerRef={tentdeskIncidentRef} />

              {/* Beat 6: Production Responsibility Bridge */}
              <ResponsibilityBridge containerRef={tentdeskResponsibilityRef} />
            </div>

            {/* ── COMMANDATLAS STORY CONTINUUM ── */}
            <div
              ref={commandatlasGroupRef}
              className="spatial-project-group spatial-project-group--commandatlas"
              aria-labelledby="commandatlas-heading"
            >
              {/* Beat 7: Identity */}
              <div ref={commandatlasIdentityRef} className="mb-4">
                <div className="spatial-coordinate-eyebrow text-[#a78bfa]">
                  <span>KNOWLEDGE CONSTELLATION · OFFLINE-FIRST ARCHITECTURE</span>
                </div>
                <h3
                  id="commandatlas-heading"
                  className="spatial-hero-title spatial-hero-title--purple"
                >
                  CommandAtlas
                </h3>
                <p className="spatial-story-lead">
                  A deterministic offline-first command reference where Markdown documentation compiles into validated static
                  packs and a local search index. 366 commands across 21 canonical topics.
                </p>
                <div className="spatial-telemetry-row">
                  <span className="spatial-pill">Next.js</span>
                  <span className="spatial-pill">Express</span>
                  <span className="spatial-pill">Prisma</span>
                  <span className="spatial-pill">PostgreSQL</span>
                  <span className="spatial-pill">Dexie IndexedDB</span>
                  <span className="spatial-pill">No AI by Design</span>
                </div>
              </div>

              {/* Beat 8: The Content Compilation Pipeline */}
              <CommandAtlasPipeline containerRef={commandatlasPipelineRef} />

              {/* Beat 9: ADR-013, No AI by Design & Scale */}
              <DecisionMatrix containerRef={commandatlasDecisionRef} />
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION C: COMMANDATLAS DEEP DIVE / ARCHIVE (NORMAL DOCUMENT FLOW) ── */}
      <section className="works-deepdive-grid" aria-label="CommandAtlas Architecture Notes">
        <aside className="works-sticky-panel">
          <div className="rounded-2xl border border-white/8 bg-nebula/60 p-6 backdrop-blur-md">
            <p className="font-mono text-[0.68rem] tracking-[0.2em] text-[#a78bfa]">
              INDEX STRUCTURE
            </p>
            <h3 className="mt-2 font-heading text-xl font-bold text-stardust">
              Deterministic Scope
            </h3>
            <div className="mt-4 space-y-3 font-mono text-xs text-cosmos-muted">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Commands</span>
                <span className="text-stardust font-semibold">366</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Canonical Topics</span>
                <span className="text-stardust font-semibold">21</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Storage Layer</span>
                <span className="text-stardust font-semibold">IndexedDB (Dexie)</span>
              </div>
              <div className="flex justify-between">
                <span>Sync Protocol</span>
                <span className="text-stardust font-semibold">Static Packs</span>
              </div>
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <article className="rounded-2xl border border-white/8 bg-nebula/40 p-6 backdrop-blur-sm sm:p-8">
            <h3 className="font-heading text-2xl font-semibold text-stardust">
              Why Offline-First Command Retrieval?
            </h3>
            <p className="mt-3 text-cosmos-muted leading-relaxed">
              When operating remote server terminals, managing network dropouts, or configuring local infrastructure,
              web documentation frequently becomes inaccessible. CommandAtlas ensures essential engineering syntax
              remains available locally through browser storage without external network dependencies.
            </p>
            <p className="mt-3 text-cosmos-muted leading-relaxed">
              Markdown packs undergo build-time validation and linting, ensuring command flags, examples, and options
              match verified upstream documentation without runtime unpredictability.
            </p>
          </article>
        </div>
      </section>

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
