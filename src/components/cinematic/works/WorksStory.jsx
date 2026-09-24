// FILE: src/components/cinematic/works/WorksStory.jsx
// Spatial-Continuum Works Experience: Dynamic Composition Zones, Non-Card Semantic Beats,
// Structural Navigation Safe Area, and Physical Spatial Motion.
// Architecture: Untouched Desktop Composition + Dedicated Mobile Sequential Story Mode.
import React, { useRef, useState, useEffect } from 'react';
import { invalidate } from '@react-three/fiber';
import WorksSpatialScene from './WorksSpatialScene';
import useCinematicTimeline from '../useCinematicTimeline';
import useVisibilityState from '../../../hooks/useVisibilityState';
import TentDeskStateFlow from './primitives/TentDeskStateFlow';
import TentDeskIncidentAudit from './primitives/TentDeskIncidentAudit';
import CommandAtlasPipelineFlow from './primitives/CommandAtlasPipelineFlow';
import CommandAtlasDecisionMatrix from './primitives/CommandAtlasDecisionMatrix';
import BankTransactionFlow from './primitives/BankTransactionFlow';
import '../../../styles/cinematic-engine.css';
import '../../../styles/works-cinematic.css';

export default function WorksStory() {
  const containerRef = useRef(null);
  const scrollSpaceRef = useRef(null);
  const stageRef = useRef(null);
  const progressRef = useRef(0);

  // Story Elements & Dynamic Composition Zones
  const introRef = useRef(null);

  // TentDesk Dynamic Zone (Desktop)
  const tentdeskZoneRef = useRef(null);
  const tentdeskTitleRef = useRef(null);
  const tentdeskOverviewRef = useRef(null);
  const tentdeskFlowRef = useRef(null);
  const tentdeskIncidentRef = useRef(null);

  // TentDesk Mobile Sequential Sub-States
  const mobileTdIdentityRef = useRef(null);
  const mobileTdTier1Ref = useRef(null);
  const mobileTdTier2Ref = useRef(null);
  const mobileTdTier3Ref = useRef(null);
  const mobileTdLessonRef = useRef(null);

  // Continuum Handoff Bridge
  const handoffBridgeRef = useRef(null);

  // CommandAtlas Dynamic Zone (Desktop)
  const commandatlasZoneRef = useRef(null);
  const commandatlasTitleRef = useRef(null);
  const commandatlasOverviewRef = useRef(null);
  const commandatlasPipelineRef = useRef(null);
  const commandatlasDecisionRef = useRef(null);
  const pipelineTrackRef = useRef(null);

  // CommandAtlas Mobile Sequential Sub-States
  const mobileCaIdentityRef = useRef(null);
  const mobileCaPipe1Ref = useRef(null);
  const mobileCaPipe2Ref = useRef(null);
  const mobileCaPipe3Ref = useRef(null);
  const mobileCaPipe4Ref = useRef(null);
  const mobileCaDecisionRef = useRef(null);

  // Black Hole Singularity Transition Bridge
  const blackholeBridgeRef = useRef(null);

  // BankSys Dynamic Zone (Desktop)
  const banksysZoneRef = useRef(null);
  const banksysTitleRef = useRef(null);
  const banksysOverviewRef = useRef(null);
  const banksysFlowRef = useRef(null);

  // BankSys Mobile Sequential Sub-States
  const mobileBsIdentityRef = useRef(null);
  const mobileBsTxRef = useRef(null);
  const mobileBsLedgerRef = useRef(null);
  const mobileBsSecurityRef = useRef(null);

  // Responsive device breakpoint state
  const [isMobileScreen, setIsMobileScreen] = useState(() => {
    return typeof window !== 'undefined' && window.innerWidth <= 768;
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobileScreen((prev) => (prev !== mobile ? mobile : prev));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Section-level visibility state (SUSPENDED -> PREPARE -> ACTIVE)
  const { ref: visibilityRef, state: visibilityState } = useVisibilityState({
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
        !handoffBridgeRef.current ||
        !commandatlasZoneRef.current ||
        !commandatlasTitleRef.current ||
        !blackholeBridgeRef.current ||
        !banksysZoneRef.current ||
        !banksysTitleRef.current
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

      const enterX = isMobile ? '35vw' : '65vw';
      const exitX = isMobile ? '-35vw' : '-70vw';

      // Shared titles initial
      gsap.set(tentdeskTitleRef.current, { x: enterX, scale: 0.92, opacity: 0, filter: 'blur(4px)' });
      gsap.set(commandatlasTitleRef.current, { x: enterX, scale: 0.92, opacity: 0, filter: 'blur(4px)' });
      gsap.set(banksysTitleRef.current, { x: enterX, scale: 0.92, opacity: 0, filter: 'blur(4px)' });

      // Shared bridges initial
      gsap.set(handoffBridgeRef.current, { scale: 0.85, opacity: 0 });
      gsap.set(blackholeBridgeRef.current, { scale: 0.85, opacity: 0 });

      if (isMobile) {
        // ══════════════════════════════════════════════════════════════════
        // DEDICATED MOBILE STORY MODE (EXPLICIT SEQUENTIAL SUB-STATES)
        // ══════════════════════════════════════════════════════════════════
        const mobileElements = [
          mobileTdIdentityRef.current,
          mobileTdTier1Ref.current,
          mobileTdTier2Ref.current,
          mobileTdTier3Ref.current,
          mobileTdLessonRef.current,
          mobileCaIdentityRef.current,
          mobileCaPipe1Ref.current,
          mobileCaPipe2Ref.current,
          mobileCaPipe3Ref.current,
          mobileCaPipe4Ref.current,
          mobileCaDecisionRef.current,
          mobileBsIdentityRef.current,
          mobileBsTxRef.current,
          mobileBsLedgerRef.current,
          mobileBsSecurityRef.current,
        ];
        mobileElements.forEach((el) => {
          if (el) gsap.set(el, { y: 15, opacity: 0 });
        });

        // ── MOBILE BEAT 1: INTRO (0.00 -> 0.06) ──
        tl.to(
          introRef.current,
          {
            x: exitX,
            scale: 0.92,
            filter: 'blur(5px)',
            opacity: 0,
            ease: 'power2.in',
            duration: 0.04,
          },
          0.025,
        );

        // ── MOBILE BEAT 2: TENTDESK (0.07 -> 0.35) ──
        // Title arrives
        tl.to(
          tentdeskTitleRef.current,
          {
            x: 0,
            scale: 0.85,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power2.out',
            duration: 0.025,
          },
          0.07,
        );

        // Sub-state 1: Identity & Overview (0.07 -> 0.12)
        if (mobileTdIdentityRef.current) {
          tl.to(mobileTdIdentityRef.current, { y: 0, opacity: 1, duration: 0.015, ease: 'power1.out' }, 0.075);
          tl.to(mobileTdIdentityRef.current, { y: -12, opacity: 0, duration: 0.01, ease: 'power1.in' }, 0.115);
        }

        // Sub-state 2: Tier 01 Field Terminal (0.12 -> 0.17)
        if (mobileTdTier1Ref.current) {
          tl.to(mobileTdTier1Ref.current, { y: 0, opacity: 1, duration: 0.015, ease: 'power1.out' }, 0.12);
          tl.to(mobileTdTier1Ref.current, { y: -12, opacity: 0, duration: 0.01, ease: 'power1.in' }, 0.165);
        }

        // Sub-state 3: Tier 02 State Engine (0.17 -> 0.22)
        if (mobileTdTier2Ref.current) {
          tl.to(mobileTdTier2Ref.current, { y: 0, opacity: 1, duration: 0.015, ease: 'power1.out' }, 0.17);
          tl.to(mobileTdTier2Ref.current, { y: -12, opacity: 0, duration: 0.01, ease: 'power1.in' }, 0.215);
        }

        // Sub-state 4: Tier 03 Warehouse Console (0.225 -> 0.28)
        if (mobileTdTier3Ref.current) {
          tl.to(mobileTdTier3Ref.current, { y: 0, opacity: 1, duration: 0.015, ease: 'power1.out' }, 0.225);
          tl.to(mobileTdTier3Ref.current, { y: -12, opacity: 0, duration: 0.01, ease: 'power1.in' }, 0.275);
        }

        // Sub-state 5: Production Lesson — Deployed != Usable (0.285 -> 0.35)
        if (mobileTdLessonRef.current) {
          tl.to(mobileTdLessonRef.current, { y: 0, opacity: 1, duration: 0.015, ease: 'power1.out' }, 0.285);
          tl.to(mobileTdLessonRef.current, { y: -12, opacity: 0, duration: 0.01, ease: 'power1.in' }, 0.34);
        }

        // TentDesk Title & Zone Exits
        tl.to(
          tentdeskTitleRef.current,
          {
            x: exitX,
            opacity: 0,
            filter: 'blur(4px)',
            ease: 'power2.in',
            duration: 0.015,
          },
          0.345,
        );

        // ── MOBILE BEAT 3: HANDOFF BRIDGE (0.35 -> 0.42) ──
        tl.to(handoffBridgeRef.current, { scale: 1, opacity: 1, duration: 0.025, ease: 'power1.out' }, 0.355);
        tl.to(handoffBridgeRef.current, { scale: 1.05, opacity: 0, duration: 0.02, ease: 'power1.in' }, 0.40);

        // ── MOBILE BEAT 4: COMMANDATLAS (0.42 -> 0.71) ──
        // Title arrives
        tl.to(
          commandatlasTitleRef.current,
          {
            x: 0,
            scale: 0.85,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power2.out',
            duration: 0.025,
          },
          0.425,
        );

        // Sub-state 1: Identity & Scope (0.43 -> 0.48)
        if (mobileCaIdentityRef.current) {
          tl.to(mobileCaIdentityRef.current, { y: 0, opacity: 1, duration: 0.015, ease: 'power1.out' }, 0.43);
          tl.to(mobileCaIdentityRef.current, { y: -12, opacity: 0, duration: 0.01, ease: 'power1.in' }, 0.475);
        }

        // Sub-state 2: Pipeline 01 Markdown Repository (0.48 -> 0.525)
        if (mobileCaPipe1Ref.current) {
          tl.to(mobileCaPipe1Ref.current, { y: 0, opacity: 1, duration: 0.015, ease: 'power1.out' }, 0.48);
          tl.to(mobileCaPipe1Ref.current, { y: -12, opacity: 0, duration: 0.01, ease: 'power1.in' }, 0.52);
        }

        // Sub-state 3: Pipeline 02 Build-Time Validation (0.525 -> 0.57)
        if (mobileCaPipe2Ref.current) {
          tl.to(mobileCaPipe2Ref.current, { y: 0, opacity: 1, duration: 0.015, ease: 'power1.out' }, 0.525);
          tl.to(mobileCaPipe2Ref.current, { y: -12, opacity: 0, duration: 0.01, ease: 'power1.in' }, 0.565);
        }

        // Sub-state 4: Pipeline 03 Static Packs (0.57 -> 0.615)
        if (mobileCaPipe3Ref.current) {
          tl.to(mobileCaPipe3Ref.current, { y: 0, opacity: 1, duration: 0.015, ease: 'power1.out' }, 0.57);
          tl.to(mobileCaPipe3Ref.current, { y: -12, opacity: 0, duration: 0.01, ease: 'power1.in' }, 0.61);
        }

        // Sub-state 5: Pipeline 04 Dexie IndexedDB (0.615 -> 0.66)
        if (mobileCaPipe4Ref.current) {
          tl.to(mobileCaPipe4Ref.current, { y: 0, opacity: 1, duration: 0.015, ease: 'power1.out' }, 0.615);
          tl.to(mobileCaPipe4Ref.current, { y: -12, opacity: 0, duration: 0.01, ease: 'power1.in' }, 0.655);
        }

        // Sub-state 6: ADR-013 No AI by Design & Scale (0.66 -> 0.71)
        if (mobileCaDecisionRef.current) {
          tl.to(mobileCaDecisionRef.current, { y: 0, opacity: 1, duration: 0.015, ease: 'power1.out' }, 0.66);
          tl.to(mobileCaDecisionRef.current, { y: -12, opacity: 0, duration: 0.01, ease: 'power1.in' }, 0.705);
        }

        // CommandAtlas Title & Zone Exits
        tl.to(
          commandatlasTitleRef.current,
          {
            x: exitX,
            opacity: 0,
            filter: 'blur(4px)',
            ease: 'power2.in',
            duration: 0.015,
          },
          0.71,
        );

        // ── MOBILE BEAT 5: SINGULARITY BRIDGE (0.72 -> 0.78) ──
        tl.to(blackholeBridgeRef.current, { scale: 1, opacity: 1, duration: 0.025, ease: 'power1.out' }, 0.72);
        tl.to(blackholeBridgeRef.current, { scale: 1.05, opacity: 0, duration: 0.02, ease: 'power1.in' }, 0.77);

        // ── MOBILE BEAT 6: BANKSYS (0.78 -> 1.00) ──
        // Title arrives
        tl.to(
          banksysTitleRef.current,
          {
            x: 0,
            scale: 0.85,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power2.out',
            duration: 0.025,
          },
          0.785,
        );

        // Sub-state 1: Identity & Overview (0.79 -> 0.84)
        if (mobileBsIdentityRef.current) {
          tl.to(mobileBsIdentityRef.current, { y: 0, opacity: 1, duration: 0.015, ease: 'power1.out' }, 0.79);
          tl.to(mobileBsIdentityRef.current, { y: -12, opacity: 0, duration: 0.01, ease: 'power1.in' }, 0.835);
        }

        // Sub-state 2: Transaction Engine — Account A -> ACID (0.84 -> 0.89)
        if (mobileBsTxRef.current) {
          tl.to(mobileBsTxRef.current, { y: 0, opacity: 1, duration: 0.015, ease: 'power1.out' }, 0.84);
          tl.to(mobileBsTxRef.current, { y: -12, opacity: 0, duration: 0.01, ease: 'power1.in' }, 0.885);
        }

        // Sub-state 3: Settlement — Double-Entry Ledger -> Account B (0.89 -> 0.94)
        if (mobileBsLedgerRef.current) {
          tl.to(mobileBsLedgerRef.current, { y: 0, opacity: 1, duration: 0.015, ease: 'power1.out' }, 0.89);
          tl.to(mobileBsLedgerRef.current, { y: -12, opacity: 0, duration: 0.01, ease: 'power1.in' }, 0.935);
        }

        // Sub-state 4: Security Architecture & Export (0.94 -> 0.995)
        if (mobileBsSecurityRef.current) {
          tl.to(mobileBsSecurityRef.current, { y: 0, opacity: 1, duration: 0.015, ease: 'power1.out' }, 0.94);
        }

        // Final subtle settle
        tl.to([banksysTitleRef.current, mobileBsSecurityRef.current], { opacity: 0.35, duration: 0.005 }, 0.995);

      } else {
        // ══════════════════════════════════════════════════════════════════
        // DESKTOP CHOREOGRAPHY (100% UNCHANGED AS VERIFIED)
        // ══════════════════════════════════════════════════════════════════
        // Desktop initial offscreen states
        if (tentdeskOverviewRef.current) gsap.set(tentdeskOverviewRef.current, { y: 20, opacity: 0, filter: 'blur(3px)' });
        if (tentdeskFlowRef.current) gsap.set(tentdeskFlowRef.current, { x: 30, scale: 0.95, opacity: 0, filter: 'blur(3px)' });
        if (tentdeskIncidentRef.current) gsap.set(tentdeskIncidentRef.current, { x: 30, scale: 0.95, opacity: 0, filter: 'blur(3px)' });
        if (commandatlasOverviewRef.current) gsap.set(commandatlasOverviewRef.current, { y: 20, opacity: 0, filter: 'blur(3px)' });
        if (commandatlasPipelineRef.current) gsap.set(commandatlasPipelineRef.current, { x: 30, scale: 0.95, opacity: 0, filter: 'blur(3px)' });
        if (commandatlasDecisionRef.current) gsap.set(commandatlasDecisionRef.current, { x: 30, scale: 0.95, opacity: 0, filter: 'blur(3px)' });
        if (banksysOverviewRef.current) gsap.set(banksysOverviewRef.current, { y: 20, opacity: 0, filter: 'blur(3px)' });
        if (banksysFlowRef.current) gsap.set(banksysFlowRef.current, { x: 30, scale: 0.95, opacity: 0, filter: 'blur(3px)' });

        // ── BEAT 1: INTRO (0.00 -> 0.08) ──
        tl.to(
          introRef.current,
          {
            x: '-70vw',
            y: '-4vh',
            scale: 0.92,
            filter: 'blur(5px)',
            opacity: 0,
            ease: 'power2.in',
            duration: 0.05,
          },
          0.03,
        );

        // ── BEAT 2A: TENTDESK ARRIVAL & IDENTITY (0.08 -> 0.18) ──
        tl.to(
          tentdeskTitleRef.current,
          {
            x: 0,
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power2.out',
            duration: 0.04,
          },
          0.08,
        );

        tl.to(
          tentdeskOverviewRef.current,
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power1.out',
            duration: 0.04,
          },
          0.09,
        );

        // (0.12 -> 0.16) STILLNESS WINDOW: Identity & Scope dominant
        tl.to(
          tentdeskOverviewRef.current,
          {
            x: -25,
            scale: 0.95,
            opacity: 0,
            filter: 'blur(3px)',
            ease: 'power1.in',
            duration: 0.02,
          },
          0.165,
        );

        tl.to(
          tentdeskTitleRef.current,
          {
            scale: 0.72,
            transformOrigin: 'left top',
            ease: 'power1.inOut',
            duration: 0.02,
          },
          0.165,
        );

        // ── BEAT 2B: REAL-TIME OPERATIONAL STATE FLOW (0.18 -> 0.27) ──
        tl.to(
          tentdeskFlowRef.current,
          {
            x: 0,
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power2.out',
            duration: 0.035,
          },
          0.18,
        );

        // (0.21 -> 0.25) STILLNESS WINDOW: State flow diagram settled and readable
        tl.to(
          tentdeskFlowRef.current,
          {
            x: -25,
            scale: 0.95,
            opacity: 0,
            filter: 'blur(3px)',
            ease: 'power1.in',
            duration: 0.02,
          },
          0.255,
        );

        // ── BEAT 2C: PRODUCTION LESSON — DEPLOYED != USABLE (0.27 -> 0.36) ──
        tl.to(
          tentdeskIncidentRef.current,
          {
            x: 0,
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power2.out',
            duration: 0.035,
          },
          0.27,
        );

        // (0.30 -> 0.335) STILLNESS WINDOW: Production lesson readable
        tl.to(
          [tentdeskIncidentRef.current, tentdeskTitleRef.current],
          {
            x: '-70vw',
            scale: 0.9,
            opacity: 0,
            filter: 'blur(5px)',
            ease: 'power2.in',
            duration: 0.025,
          },
          0.34,
        );

        // ── BEAT 3: SPATIAL CONTINUUM HANDOFF BRIDGE (0.36 -> 0.44) ──
        tl.to(
          handoffBridgeRef.current,
          {
            scale: 1,
            opacity: 1,
            ease: 'power1.out',
            duration: 0.03,
          },
          0.36,
        );

        tl.to(
          handoffBridgeRef.current,
          {
            scale: 1.08,
            opacity: 0,
            ease: 'power1.in',
            duration: 0.03,
          },
          0.41,
        );

        // ── BEAT 4A: COMMANDATLAS ARRIVAL & IDENTITY (0.44 -> 0.54) ──
        tl.to(
          commandatlasTitleRef.current,
          {
            x: 0,
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power2.out',
            duration: 0.035,
          },
          0.44,
        );

        tl.to(
          commandatlasOverviewRef.current,
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power1.out',
            duration: 0.03,
          },
          0.455,
        );

        // (0.48 -> 0.52) STILLNESS WINDOW: Identity & Scope dominant
        tl.to(
          commandatlasOverviewRef.current,
          {
            x: -25,
            scale: 0.95,
            opacity: 0,
            filter: 'blur(3px)',
            ease: 'power1.in',
            duration: 0.02,
          },
          0.52,
        );

        tl.to(
          commandatlasTitleRef.current,
          {
            scale: 0.72,
            transformOrigin: 'left top',
            ease: 'power1.inOut',
            duration: 0.02,
          },
          0.52,
        );

        // ── BEAT 4B: COMPILATION PIPELINE (0.53 -> 0.63) ──
        tl.to(
          commandatlasPipelineRef.current,
          {
            x: 0,
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power2.out',
            duration: 0.03,
          },
          0.53,
        );

        // (0.56 -> 0.61) STILLNESS WINDOW: 4-Node Pipeline readable
        tl.to(
          commandatlasPipelineRef.current,
          {
            x: -25,
            scale: 0.95,
            opacity: 0,
            filter: 'blur(3px)',
            ease: 'power1.in',
            duration: 0.02,
          },
          0.615,
        );

        // ── BEAT 4C: ADR-013 — NO AI BY DESIGN & SCALE ANCHOR (0.625 -> 0.72) ──
        tl.to(
          commandatlasDecisionRef.current,
          {
            x: 0,
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power2.out',
            duration: 0.03,
          },
          0.625,
        );

        // (0.655 -> 0.70) STILLNESS WINDOW: Decision & Scale readable
        tl.to(
          [commandatlasDecisionRef.current, commandatlasTitleRef.current],
          {
            x: '-70vw',
            scale: 0.9,
            opacity: 0,
            filter: 'blur(5px)',
            ease: 'power2.in',
            duration: 0.02,
          },
          0.71,
        );

        // ── BEAT 5: BLACK HOLE SINGULARITY TRANSITION BRIDGE (0.73 -> 0.82) ──
        tl.to(
          blackholeBridgeRef.current,
          {
            scale: 1,
            opacity: 1,
            ease: 'power1.out',
            duration: 0.03,
          },
          0.73,
        );

        tl.to(
          blackholeBridgeRef.current,
          {
            scale: 1.08,
            opacity: 0,
            ease: 'power1.in',
            duration: 0.03,
          },
          0.79,
        );

        // ── BEAT 6A: BANKSYS ARRIVAL & IDENTITY (0.82 -> 0.91) ──
        tl.to(
          banksysTitleRef.current,
          {
            x: 0,
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power2.out',
            duration: 0.035,
          },
          0.82,
        );

        tl.to(
          banksysOverviewRef.current,
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power1.out',
            duration: 0.03,
          },
          0.835,
        );

        // (0.865 -> 0.895) STILLNESS WINDOW: Identity & Scope dominant
        tl.to(
          banksysOverviewRef.current,
          {
            x: -25,
            scale: 0.95,
            opacity: 0,
            filter: 'blur(3px)',
            ease: 'power1.in',
            duration: 0.02,
          },
          0.90,
        );

        tl.to(
          banksysTitleRef.current,
          {
            scale: 0.72,
            transformOrigin: 'left top',
            ease: 'power1.inOut',
            duration: 0.02,
          },
          0.90,
        );

        // ── BEAT 6B: BANKSYS ATOMIC FLOW (0.91 -> 1.00) ──
        tl.to(
          banksysFlowRef.current,
          {
            x: 0,
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power2.out',
            duration: 0.025,
          },
          0.91,
        );

        // (0.94 -> 0.985) STILLNESS WINDOW: Transaction diagram settled and readable
        tl.to(
          [banksysFlowRef.current, banksysTitleRef.current],
          {
            opacity: 0.25,
            ease: 'power1.in',
            duration: 0.005,
          },
          0.995,
        );
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
        style={{ height: isFallback ? 'auto' : (isMobileScreen ? '1600vh' : '1050vh') }}
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
              </div>

              {/* ── BEAT 2: TENTDESK DYNAMIC COMPOSITION ZONE ── */}
              <div
                ref={tentdeskZoneRef}
                className="spatial-composition-zone spatial-composition-zone--tentdesk"
                aria-labelledby="tentdesk-heading"
              >
                {/* Title & Coordinate Eyebrow (Shared) */}
                <div ref={tentdeskTitleRef}>
                  <div className="spatial-coordinate-eyebrow text-aurora">
                    <span>TENTDESK · PRODUCTION SAAS</span>
                  </div>
                  <h3
                    id="tentdesk-heading"
                    className="spatial-hero-title spatial-hero-title--cyan"
                  >
                    TENTDESK
                  </h3>
                </div>

                {/* ── DESKTOP NARRATIVE (Multi-Tier Spatial Layout) ── */}
                <div className="hidden md:block spatial-narrative-container relative w-full mt-2 min-h-[22rem]">
                  {/* Beat 2A: Overview & Operational Scope */}
                  <div ref={tentdeskOverviewRef} className="spatial-story-beat">
                    <p className="spatial-story-lead">
                      Operational software for tent and event-rental businesses. Replaces fragmented
                      rental operations with one unified operational system.
                    </p>
                    <p className="mt-2 text-xs font-mono text-cosmos-muted/90 tracking-wide uppercase">
                      INVENTORY · RENTALS · EVENTS · RETURNS · CUSTOMERS · PAYMENTS
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

                  {/* Beat 2B: State Flow Diagram */}
                  <div ref={tentdeskFlowRef} className="spatial-story-beat">
                    <TentDeskStateFlow />
                  </div>

                  {/* Beat 2C: Production Audits & Incidents */}
                  <div ref={tentdeskIncidentRef} className="spatial-story-beat">
                    <TentDeskIncidentAudit />
                  </div>
                </div>

                {/* ── MOBILE NARRATIVE (Sequential Single Active Sub-States) ── */}
                <div className="block md:hidden spatial-narrative-container relative w-full mt-2 min-h-[180px]">
                  {/* Sub-State 1: Identity & Overview */}
                  <div ref={mobileTdIdentityRef} className="spatial-mobile-substate">
                    <div className="spatial-mobile-header">
                      <span className="spatial-mobile-badge text-aurora">OVERVIEW · SCOPE</span>
                      <span className="spatial-status-dot spatial-status-dot--cyan" />
                    </div>
                    <h5 className="spatial-mobile-title">OPERATIONAL RENTAL PLATFORM</h5>
                    <p className="spatial-mobile-desc">
                      Replaces fragmented spreadsheets with unified inventory, rentals, and customer dispatch.
                    </p>
                    <div className="spatial-mobile-tag text-aurora">
                      INVENTORY · RENTALS · RETURNS · PAYMENTS
                    </div>
                  </div>

                  {/* Sub-State 2: Tier 01 Field Terminal */}
                  <div ref={mobileTdTier1Ref} className="spatial-mobile-substate spatial-mobile-substate--cyan">
                    <div className="spatial-mobile-header">
                      <span className="spatial-mobile-badge text-aurora">TIER 01 / 03 · FIELD TERMINAL</span>
                      <span className="font-mono text-xs font-bold text-aurora">01</span>
                    </div>
                    <h5 className="spatial-mobile-title">PWA CLIENT MUTATIONS</h5>
                    <p className="spatial-mobile-desc">
                      Field terminal PWA dispatching optimistic rental mutations via TanStack Query without blocking the UI.
                    </p>
                    <div className="spatial-mobile-tag">
                      OPTIMISTIC MUTATIONS · HTTPS/REST
                    </div>
                  </div>

                  {/* Sub-State 3: Tier 02 State Engine */}
                  <div ref={mobileTdTier2Ref} className="spatial-mobile-substate spatial-mobile-substate--purple">
                    <div className="spatial-mobile-header">
                      <span className="spatial-mobile-badge text-stardust">TIER 02 / 03 · STATE ENGINE</span>
                      <span className="font-mono text-xs font-bold text-stardust">02</span>
                    </div>
                    <h5 className="spatial-mobile-title">NEXT.JS &amp; PRISMA ENGINE</h5>
                    <p className="spatial-mobile-desc">
                      Server state engine enforcing tenant isolation, inventory locks, and atomic operations in MongoDB.
                    </p>
                    <div className="spatial-mobile-tag">
                      TENANT ISOLATION · PRISMA TRANSACTIONS
                    </div>
                  </div>

                  {/* Sub-State 4: Tier 03 Warehouse Console */}
                  <div ref={mobileTdTier3Ref} className="spatial-mobile-substate spatial-mobile-substate--cyan">
                    <div className="spatial-mobile-header">
                      <span className="spatial-mobile-badge text-aurora">TIER 03 / 03 · WAREHOUSE CONSOLE</span>
                      <span className="font-mono text-xs font-bold text-aurora">03</span>
                    </div>
                    <h5 className="spatial-mobile-title">REAL-TIME SSE EVENT STREAM</h5>
                    <p className="spatial-mobile-desc">
                      Server-Sent Events broadcasting synchronized inventory and return updates with zero WebSocket overhead.
                    </p>
                    <div className="spatial-mobile-tag">
                      SERVER-SENT EVENTS · ZERO WEBSOCKET OVERHEAD
                    </div>
                  </div>

                  {/* Sub-State 5: Production Lesson — Deployed != Usable */}
                  <div ref={mobileTdLessonRef} className="spatial-mobile-substate spatial-mobile-substate--amber">
                    <div className="spatial-mobile-header">
                      <span className="spatial-mobile-badge text-supernova">PRODUCTION LESSON</span>
                      <span className="spatial-status-dot spatial-status-dot--amber" />
                    </div>
                    <h5 className="spatial-mobile-title text-supernova">DEPLOYED ≠ USABLE</h5>
                    <p className="spatial-mobile-desc">
                      Initial ~25s first-paint latency on field mobile connections identified severe cold-start hydration pressure.
                    </p>
                    <div className="spatial-mobile-tag text-supernova">
                      RESTRUCTURED HYDRATION · INSTANT FIELD USABILITY
                    </div>
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
                {/* Title & Coordinate Eyebrow (Shared) */}
                <div ref={commandatlasTitleRef}>
                  <div className="spatial-coordinate-eyebrow text-[#a78bfa]">
                    <span>OFFLINE-FIRST ARCHITECTURE · RESILIENT REFERENCE</span>
                  </div>
                  <h3
                    id="commandatlas-heading"
                    className="spatial-hero-title spatial-hero-title--purple"
                  >
                    COMMANDATLAS
                  </h3>
                </div>

                {/* ── DESKTOP NARRATIVE (Full Pipeline & Decision Cluster) ── */}
                <div className="hidden md:block spatial-narrative-container relative w-full mt-2 min-h-[22rem]">
                  {/* Beat 4A: Overview & Scope */}
                  <div ref={commandatlasOverviewRef} className="spatial-story-beat">
                    <p className="spatial-story-lead">
                      Offline-first command reference built around validated local data.
                      Essential engineering reference should remain available when the network does not.
                    </p>
                    <p className="mt-2 text-xs font-mono text-stardust/90 tracking-wide uppercase">
                      366 commands across 21 canonical topics
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

                  {/* Beat 4B: Deterministic Compilation Pipeline */}
                  <div ref={commandatlasPipelineRef} className="spatial-story-beat">
                    <CommandAtlasPipelineFlow trackRef={pipelineTrackRef} />
                  </div>

                  {/* Beat 4C: ADR-013 & Decision Matrix */}
                  <div ref={commandatlasDecisionRef} className="spatial-story-beat">
                    <CommandAtlasDecisionMatrix />
                  </div>
                </div>

                {/* ── MOBILE NARRATIVE (Sequential Single Active Sub-States) ── */}
                <div className="block md:hidden spatial-narrative-container relative w-full mt-2 min-h-[180px]">
                  {/* Sub-State 1: Identity & Scope */}
                  <div ref={mobileCaIdentityRef} className="spatial-mobile-substate">
                    <div className="spatial-mobile-header">
                      <span className="spatial-mobile-badge text-[#a78bfa]">OVERVIEW · DETERMINISTIC</span>
                      <span className="spatial-status-dot spatial-status-dot--cyan" />
                    </div>
                    <h5 className="spatial-mobile-title">OFFLINE-FIRST COMMAND REFERENCE</h5>
                    <p className="spatial-mobile-desc">
                      Essential engineering reference built around validated local data, remaining accessible when the network does not.
                    </p>
                    <div className="spatial-mobile-tag text-stardust">
                      366 COMMANDS · 21 CANONICAL TOPICS
                    </div>
                  </div>

                  {/* Sub-State 2: Pipeline 01 Markdown Repository */}
                  <div ref={mobileCaPipe1Ref} className="spatial-mobile-substate spatial-mobile-substate--purple">
                    <div className="spatial-mobile-header">
                      <span className="spatial-mobile-badge text-stardust">STAGE 01 / 04 · SOURCE</span>
                      <span className="font-mono text-xs font-bold text-stardust">01</span>
                    </div>
                    <h5 className="spatial-mobile-title">MARKDOWN REPOSITORY</h5>
                    <p className="spatial-mobile-desc">
                      Canonical documentation across 21 infrastructure topics maintained in Git with strict frontmatter schemas.
                    </p>
                    <div className="spatial-mobile-tag">
                      GIT SOURCE · 21 CANONICAL TOPICS
                    </div>
                  </div>

                  {/* Sub-State 3: Pipeline 02 Validation */}
                  <div ref={mobileCaPipe2Ref} className="spatial-mobile-substate spatial-mobile-substate--purple">
                    <div className="spatial-mobile-header">
                      <span className="spatial-mobile-badge text-stardust">STAGE 02 / 04 · VALIDATION</span>
                      <span className="font-mono text-xs font-bold text-stardust">02</span>
                    </div>
                    <h5 className="spatial-mobile-title">BUILD-TIME VALIDATION</h5>
                    <p className="spatial-mobile-desc">
                      Automated CI verification checks command schemas, argument flags, and topic links prior to release.
                    </p>
                    <div className="spatial-mobile-tag">
                      CI SCHEMA &amp; ARGUMENT VERIFICATION
                    </div>
                  </div>

                  {/* Sub-State 4: Pipeline 03 Static Packs */}
                  <div ref={mobileCaPipe3Ref} className="spatial-mobile-substate spatial-mobile-substate--cyan">
                    <div className="spatial-mobile-header">
                      <span className="spatial-mobile-badge text-aurora">STAGE 03 / 04 · PACKS</span>
                      <span className="font-mono text-xs font-bold text-aurora">03</span>
                    </div>
                    <h5 className="spatial-mobile-title">STATIC COMPACT PACKS</h5>
                    <p className="spatial-mobile-desc">
                      Pre-compiled JSON search chunks and manifests optimized for instant client download.
                    </p>
                    <div className="spatial-mobile-tag">
                      OPTIMIZED JSON MANIFESTS
                    </div>
                  </div>

                  {/* Sub-State 5: Pipeline 04 IndexedDB */}
                  <div ref={mobileCaPipe4Ref} className="spatial-mobile-substate spatial-mobile-substate--purple">
                    <div className="spatial-mobile-header">
                      <span className="spatial-mobile-badge text-[#a78bfa]">STAGE 04 / 04 · LOCAL CACHE</span>
                      <span className="font-mono text-xs font-bold text-[#a78bfa]">04</span>
                    </div>
                    <h5 className="spatial-mobile-title">DEXIE INDEXEDDB (CLIENT-SIDE)</h5>
                    <p className="spatial-mobile-desc">
                      Browser-local database enabling sub-millisecond offline search queries with zero cloud latency.
                    </p>
                    <div className="spatial-mobile-tag">
                      CLIENT-SIDE DEXIE INDEXEDDB CACHE
                    </div>
                  </div>

                  {/* Sub-State 6: ADR-013 Decision Matrix */}
                  <div ref={mobileCaDecisionRef} className="spatial-mobile-substate spatial-mobile-substate--cyan">
                    <div className="spatial-mobile-header">
                      <span className="spatial-mobile-badge text-aurora">ADR-013 · DECISION</span>
                      <span className="spatial-status-dot spatial-status-dot--cyan" />
                    </div>
                    <h5 className="spatial-mobile-title text-aurora">NO AI BY DESIGN</h5>
                    <p className="spatial-mobile-desc">
                      For infrastructure command reference, deterministic validated data was preferred over runtime probabilistic generation.
                    </p>
                    <div className="spatial-mobile-tag text-stardust">
                      366 COMMANDS · 21 TOPICS · NO HALLUCINATIONS
                    </div>
                  </div>
                </div>
              </div>

              {/* ── BEAT 5: BLACK HOLE SINGULARITY TRANSITION BRIDGE ── */}
              <div
                ref={blackholeBridgeRef}
                className="spatial-composition-zone spatial-composition-zone--singularity"
                aria-hidden="true"
              >
                <div className="spatial-handoff-bridge">
                  <span className="spatial-status-dot spatial-status-dot--amber" />
                  <span className="spatial-handoff-text">
                    GRAVITATIONAL TRANSITION · SINGULARITY CORRIDOR → FINANCIAL DETERMINISM
                  </span>
                  <span className="spatial-status-dot spatial-status-dot--amber" />
                </div>
              </div>

              {/* ── BEAT 6: BANK TRANSACTION SYSTEM DYNAMIC COMPOSITION ZONE ── */}
              <div
                ref={banksysZoneRef}
                className="spatial-composition-zone spatial-composition-zone--banksys"
                aria-labelledby="banksys-heading"
              >
                {/* Title & Coordinate Eyebrow (Shared) */}
                <div ref={banksysTitleRef}>
                  <div className="spatial-coordinate-eyebrow text-[#f59e0b]">
                    <span>FINANCIAL SYSTEMS · TRANSACTION ENGINE</span>
                  </div>
                  <h3
                    id="banksys-heading"
                    className="spatial-hero-title spatial-hero-title--amber"
                  >
                    BankSys
                  </h3>
                </div>

                {/* ── DESKTOP NARRATIVE (Full Diagrammatic Flow) ── */}
                <div className="hidden md:block spatial-narrative-container relative w-full mt-2 min-h-[22rem]">
                  {/* Beat 6A: Overview & Technical Architecture */}
                  <div ref={banksysOverviewRef} className="spatial-story-beat">
                    <p className="spatial-story-lead">
                      Full-stack banking application for multi-account management and secure fund transfers.
                      Move money between accounts while preserving transactional integrity.
                    </p>
                    <p className="mt-2 text-xs font-mono text-[#f59e0b]/90 tracking-wide uppercase">
                      Atomic double-entry bookkeeping · strict ACID guarantees · automated verification dispatch
                    </p>
                    <div className="spatial-telemetry-row">
                      <span className="spatial-pill">React.js</span>
                      <span className="spatial-pill">Node.js</span>
                      <span className="spatial-pill">Express</span>
                      <span className="spatial-pill">MongoDB</span>
                      <span className="spatial-pill">Tailwind</span>
                      <span className="spatial-pill">Nodemailer</span>
                      <span className="spatial-pill">Render</span>
                    </div>
                  </div>

                  {/* Beat 6B: Spatial Atomic Flow */}
                  <div ref={banksysFlowRef} className="spatial-story-beat">
                    <BankTransactionFlow />
                  </div>
                </div>

                {/* ── MOBILE NARRATIVE (Sequential Single Active Sub-States) ── */}
                <div className="block md:hidden spatial-narrative-container relative w-full mt-2 min-h-[180px]">
                  {/* Sub-State 1: Identity & Overview */}
                  <div ref={mobileBsIdentityRef} className="spatial-mobile-substate">
                    <div className="spatial-mobile-header">
                      <span className="spatial-mobile-badge text-[#f59e0b]">OVERVIEW · INTEGRITY</span>
                      <span className="spatial-status-dot spatial-status-dot--amber" />
                    </div>
                    <h5 className="spatial-mobile-title">SECURE BANKING APPLICATION</h5>
                    <p className="spatial-mobile-desc">
                      Full-stack banking platform for multi-account management and real-time fund transfers with zero balance drift.
                    </p>
                    <div className="spatial-mobile-tag text-[#f59e0b]">
                      BALANCED DOUBLE-ENTRY LEDGER · ACID SESSIONS
                    </div>
                  </div>

                  {/* Sub-State 2: Transaction Origin & Commit */}
                  <div ref={mobileBsTxRef} className="spatial-mobile-substate spatial-mobile-substate--amber">
                    <div className="spatial-mobile-header">
                      <span className="spatial-mobile-badge text-[#f59e0b]">STAGE 01 / 02 · EXECUTION</span>
                      <span className="font-mono text-xs font-bold text-[#f59e0b]">01</span>
                    </div>
                    <h5 className="spatial-mobile-title">ACCOUNT A → ACID TRANSACTION</h5>
                    <p className="spatial-mobile-desc">
                      Authenticated sender debit with balance lock, executed in an atomic MongoDB two-phase commit session.
                    </p>
                    <div className="spatial-mobile-tag">
                      AUTHENTICATED DEBIT · MONGODB ACID SESSION
                    </div>
                  </div>

                  {/* Sub-State 3: Ledger & Settlement */}
                  <div ref={mobileBsLedgerRef} className="spatial-mobile-substate spatial-mobile-substate--emerald">
                    <div className="spatial-mobile-header">
                      <span className="spatial-mobile-badge text-[#10b981]">STAGE 02 / 02 · SETTLEMENT</span>
                      <span className="font-mono text-xs font-bold text-[#10b981]">02</span>
                    </div>
                    <h5 className="spatial-mobile-title">DOUBLE-ENTRY LEDGER → ACCOUNT B</h5>
                    <p className="spatial-mobile-desc">
                      Simultaneous debit and credit journal entries recorded with immutable audit ID and instant recipient credit.
                    </p>
                    <div className="spatial-mobile-tag">
                      BALANCED JOURNAL ENTRIES · RECIPIENT SETTLEMENT
                    </div>
                  </div>

                  {/* Sub-State 4: Security & Export */}
                  <div ref={mobileBsSecurityRef} className="spatial-mobile-substate spatial-mobile-substate--amber">
                    <div className="spatial-mobile-header">
                      <span className="spatial-mobile-badge text-[#f59e0b]">SECURITY · CAPABILITY</span>
                      <span className="spatial-status-dot spatial-status-dot--amber" />
                    </div>
                    <h5 className="spatial-mobile-title">AUTHENTICATION &amp; EXPORT</h5>
                    <p className="spatial-mobile-desc">
                      Protected by JWT bearer tokens, bcrypt password hashing, and rate limiting with automated CSV export.
                    </p>
                    <div className="spatial-mobile-tag text-cosmos-muted">
                      JWT AUTH · BCRYPT · RATE LIMITS · CSV EXPORT
                    </div>
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
          TentDesk, CommandAtlas, &amp; BankSys spatial continuum active.
        </p>
      </footer>
    </div>
  );
}
