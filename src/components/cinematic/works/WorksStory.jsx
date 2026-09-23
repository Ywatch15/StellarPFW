// FILE: src/components/cinematic/works/WorksStory.jsx
// Spatial-Continuum Works Pilot: Section Entry -> TentDesk -> Spatial Coexistence -> CommandAtlas
// Viewport-scale physical typography, spatial depth, verified narrative facts, and zero project-card UI.
import React, { useRef } from 'react';
import { invalidate } from '@react-three/fiber';
import WorksSpatialScene from './WorksSpatialScene';
import useCinematicTimeline from '../useCinematicTimeline';
import useVisibilityState from '../../../hooks/useVisibilityState';
import '../../../styles/cinematic-engine.css';
import '../../../styles/works-cinematic.css';

export default function WorksStory() {
  const containerRef = useRef(null);
  const scrollSpaceRef = useRef(null);
  const stageRef = useRef(null);
  const progressRef = useRef(0);

  // Story Elements
  const introRef = useRef(null);

  const tentdeskGroupRef = useRef(null);
  const tentdeskTitleRef = useRef(null);
  const tentdeskMetaRef = useRef(null);
  const tentdeskIncidentRef = useRef(null);

  const commandatlasGroupRef = useRef(null);
  const commandatlasTitleRef = useRef(null);
  const commandatlasMetaRef = useRef(null);
  const commandatlasArchRef = useRef(null);

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
        !tentdeskTitleRef.current ||
        !commandatlasGroupRef.current ||
        !commandatlasTitleRef.current
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

      // ── INITIAL OFFSCREEN STATES ──
      gsap.set(introRef.current, { x: '0vw', opacity: 1 });

      gsap.set(tentdeskTitleRef.current, {
        x: isMobile ? '60vw' : '85vw',
        opacity: 0,
      });
      gsap.set(tentdeskMetaRef.current, { opacity: 0, y: 15 });
      gsap.set(tentdeskIncidentRef.current, { opacity: 0, y: 20 });

      gsap.set(commandatlasTitleRef.current, {
        x: isMobile ? '60vw' : '85vw',
        opacity: 0,
      });
      gsap.set(commandatlasMetaRef.current, { opacity: 0, y: 15 });
      gsap.set(commandatlasArchRef.current, { opacity: 0, y: 20 });

      // ── BEAT 1: INTRO (0.00 -> 0.14) ──
      // Title sweeps out to the left
      tl.to(
        introRef.current,
        {
          x: isMobile ? '-60vw' : '-90vw',
          opacity: 0,
          ease: 'power1.in',
          duration: 0.12,
        },
        0.04,
      );

      // ── BEAT 2: TENTDESK ARRIVAL & IDENTITY (0.14 -> 0.35) ──
      // Title sweeps into view from the right
      tl.to(
        tentdeskTitleRef.current,
        {
          x: '0vw',
          opacity: 1,
          ease: 'power2.out',
          duration: 0.14,
        },
        0.14,
      );

      // Role & domain metadata follows with delayed secondary parallax
      tl.to(
        tentdeskMetaRef.current,
        {
          opacity: 1,
          y: 0,
          ease: 'power1.out',
          duration: 0.1,
        },
        0.20,
      );

      // (0.28 -> 0.35) STILLNESS MOMENT: TentDesk dominant, viewer absorbs scale

      // ── BEAT 3: TENTDESK INCIDENT DISCLOSURE (0.35 -> 0.50) ──
      tl.to(
        tentdeskIncidentRef.current,
        {
          opacity: 1,
          y: 0,
          ease: 'power1.out',
          duration: 0.1,
        },
        0.35,
      );

      // (0.44 -> 0.50) STILLNESS MOMENT: Incident text readable and stable

      // ── BEAT 4: SPATIAL TRANSITION & COEXISTENCE (0.50 -> 0.74) ──
      // TentDesk recedes and sweeps out to the left
      tl.to(
        tentdeskGroupRef.current,
        {
          x: isMobile ? '-70vw' : '-100vw',
          opacity: 0,
          ease: 'power1.inOut',
          duration: 0.18,
        },
        0.50,
      );

      // AT THE SAME TIME: CommandAtlas sweeps in from the right
      tl.to(
        commandatlasTitleRef.current,
        {
          x: '0vw',
          opacity: 1,
          ease: 'power2.out',
          duration: 0.18,
        },
        0.52,
      );

      // Metadata follows
      tl.to(
        commandatlasMetaRef.current,
        {
          opacity: 1,
          y: 0,
          ease: 'power1.out',
          duration: 0.12,
        },
        0.58,
      );

      // (0.55 -> 0.68) COEXISTENCE WINDOW: Both projects visible in motion

      // ── BEAT 5: COMMANDATLAS DOMINANCE & ARCHITECTURE (0.74 -> 0.95) ──
      tl.to(
        commandatlasArchRef.current,
        {
          opacity: 1,
          y: 0,
          ease: 'power1.out',
          duration: 0.1,
        },
        0.74,
      );

      // (0.82 -> 0.95) STILLNESS MOMENT: CommandAtlas dominant and readable
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
        style={{ height: isFallback ? 'auto' : '480vh' }}
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

          {/* Full-viewport Spatial Typography Layers (Zero Card Boxes) */}
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

            {/* ── BEAT 2 & 3: TENTDESK SPATIAL COMPOSITION ── */}
            <div
              ref={tentdeskGroupRef}
              className="spatial-project-group spatial-project-group--tentdesk"
              aria-labelledby="tentdesk-heading"
            >
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

              <div ref={tentdeskMetaRef} className="max-w-xl">
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
                <p className="mt-2 text-xs font-mono text-cosmos-muted/80 tracking-wide">
                  OPERATIONAL SCOPE: INVENTORY · RENTALS · RETURNS · CUSTOMERS · PAYMENTS · EVENTS · WAGES
                </p>
              </div>

              {/* Deconstructed Incident Disclosures (Hairline Brackets) */}
              <div
                ref={tentdeskIncidentRef}
                className="spatial-incident-node spatial-incident-node--cyan"
              >
                <p className="spatial-incident-label text-[#f43f5e]">
                  PRODUCTION AUDIT · INITIAL ~25S FIRST-PAINT INVESTIGATION
                </p>
                <p className="spatial-incident-body">
                  Resolved severe initial render latency on cold-start mobile connections by restructuring
                  client hydration boundaries, pruning heavy runtime dependencies, and prioritizing critical-path inventory views.
                </p>
                <p className="spatial-incident-body mt-2">
                  <strong className="text-stardust">Auth Resilience:</strong> Eliminated intermittent mobile session loss by migrating from
                  volatile client-side token storage to browser-managed httpOnly cookie boundaries with strict CSRF protection.
                </p>
              </div>
            </div>

            {/* ── BEAT 4 & 5: COMMANDATLAS SPATIAL COMPOSITION ── */}
            <div
              ref={commandatlasGroupRef}
              className="spatial-project-group spatial-project-group--commandatlas"
              aria-labelledby="commandatlas-heading"
            >
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

              <div ref={commandatlasMetaRef} className="max-w-xl">
                <p className="spatial-story-lead">
                  An offline-first command reference where Markdown documentation compiles into validated static packs
                  and a deterministic local search index. 366 commands across 21 canonical topics.
                </p>
                <div className="spatial-telemetry-row">
                  <span className="spatial-pill">Next.js</span>
                  <span className="spatial-pill">Express</span>
                  <span className="spatial-pill">Prisma</span>
                  <span className="spatial-pill">PostgreSQL</span>
                  <span className="spatial-pill">Dexie IndexedDB</span>
                  <span className="spatial-pill">No AI by Design</span>
                </div>
                <p className="mt-2 text-xs font-mono text-cosmos-muted/80 tracking-wide">
                  CONTENT PIPELINE: MARKDOWN SOURCE → BUILD-TIME VALIDATION → STATIC PACKS
                </p>
              </div>

              {/* Architecture Notes & Design Decision */}
              <div
                ref={commandatlasArchRef}
                className="spatial-incident-node spatial-incident-node--purple"
              >
                <p className="spatial-incident-label text-[#a78bfa]">
                  ARCHITECTURE · ADR-013 LOCAL DETERMINISM
                </p>
                <p className="spatial-incident-body">
                  Client-side Dexie IndexedDB cache enables offline search availability during unstable or disconnected
                  server network states without cloud round-trips.
                </p>
                <p className="spatial-incident-body mt-2">
                  <strong className="text-stardust">No AI by Design:</strong> Deliberate choice against probabilistic LLM inference
                  when executing critical infrastructure commands. Documentation is validated at build time for strict, reproducible syntax matching.
                </p>
              </div>
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
