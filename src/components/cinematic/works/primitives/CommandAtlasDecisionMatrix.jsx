// FILE: src/components/cinematic/works/primitives/CommandAtlasDecisionMatrix.jsx
// ADR-013 Architecture decisions and local determinism principles.
import React, { forwardRef } from 'react';

const CommandAtlasDecisionMatrix = forwardRef(function CommandAtlasDecisionMatrix(
  { decisionRefs, mobileDecisionRefs },
  ref,
) {
  return (
    <div
      ref={ref}
      className="spatial-story-beat spatial-story-beat--decisions"
      aria-label="CommandAtlas ADR-013 Decisions"
    >
      <div className="spatial-coordinate-eyebrow text-stardust">
        <span>ARCHITECTURE · ADR-013 LOCAL DETERMINISM</span>
      </div>

      {/* Desktop Layout: Multi-decision cluster with spatial depth */}
      <div className="hidden md:block spatial-decision-cluster mt-4 space-y-4">
        {/* Decision 1: Why Offline-First */}
        <div
          ref={decisionRefs ? (el) => (decisionRefs.current[0] = el) : null}
          className="spatial-incident-node spatial-incident-node--purple"
          data-decision="1"
        >
          <h4 className="spatial-incident-label text-stardust">
            DECISION 01 · OFFLINE-FIRST RETRIEVAL
          </h4>
          <p className="spatial-incident-body">
            Terminal operators frequently work across air-gapped workstations, unstable remote tunnels,
            or constrained field environments. Local client caching ensures documentation remains accessible
            regardless of network health.
          </p>
        </div>

        {/* Decision 2: No AI by Design */}
        <div
          ref={decisionRefs ? (el) => (decisionRefs.current[1] = el) : null}
          className="spatial-incident-node spatial-incident-node--cyan"
          data-decision="2"
        >
          <h4 className="spatial-incident-label text-aurora">
            DECISION 02 · NO AI BY DESIGN
          </h4>
          <p className="spatial-incident-body">
            Deliberate architectural decision against probabilistic LLM inference when querying infrastructure
            commands. System administration syntax demands deterministic, verifiable documentation rather than
            hallucinated parameters.
          </p>
        </div>

        {/* Decision 3: Local Dexie Cache */}
        <div
          ref={decisionRefs ? (el) => (decisionRefs.current[2] = el) : null}
          className="spatial-incident-node spatial-incident-node--purple"
          data-decision="3"
        >
          <h4 className="spatial-incident-label text-stardust">
            DECISION 03 · CLIENT-SIDE LOCAL RETRIEVAL
          </h4>
          <p className="spatial-incident-body">
            Precompiled static indexes are loaded into browser-managed Dexie IndexedDB storage, enabling local
            keyword and topic lookups with zero runtime cloud dependencies.
          </p>
        </div>
      </div>

      {/* Mobile Layout: Discrete Sequential Single-Decision Reading Surface (Zero Overlap) */}
      <div className="block md:hidden spatial-decision-mobile-container mt-3">
        {/* Mobile Decision 1 */}
        <div
          ref={mobileDecisionRefs ? (el) => (mobileDecisionRefs.current[0] = el) : null}
          className="spatial-decision-mobile-node spatial-incident-node--purple"
          data-mobile-decision="1"
        >
          <div className="spatial-decision-mobile-header">
            <h4 className="spatial-incident-label text-stardust">
              DECISION 01 · OFFLINE-FIRST RETRIEVAL
            </h4>
            <span className="spatial-decision-counter text-cosmos-muted/70">ADR-013 · 1 / 3</span>
          </div>
          <p className="spatial-incident-body">
            Terminal operators frequently work across air-gapped workstations, unstable remote tunnels,
            or constrained field environments. Local client caching ensures documentation remains accessible
            regardless of network health.
          </p>
        </div>

        {/* Mobile Decision 2 */}
        <div
          ref={mobileDecisionRefs ? (el) => (mobileDecisionRefs.current[1] = el) : null}
          className="spatial-decision-mobile-node spatial-incident-node--cyan"
          data-mobile-decision="2"
        >
          <div className="spatial-decision-mobile-header">
            <h4 className="spatial-incident-label text-aurora">
              DECISION 02 · NO AI BY DESIGN
            </h4>
            <span className="spatial-decision-counter text-aurora/80">ADR-013 · 2 / 3</span>
          </div>
          <p className="spatial-incident-body">
            Deliberate architectural decision against probabilistic LLM inference when querying infrastructure
            commands. System administration syntax demands deterministic, verifiable documentation rather than
            hallucinated parameters.
          </p>
        </div>

        {/* Mobile Decision 3 */}
        <div
          ref={mobileDecisionRefs ? (el) => (mobileDecisionRefs.current[2] = el) : null}
          className="spatial-decision-mobile-node spatial-incident-node--purple"
          data-mobile-decision="3"
        >
          <div className="spatial-decision-mobile-header">
            <h4 className="spatial-incident-label text-stardust">
              DECISION 03 · CLIENT-SIDE LOCAL RETRIEVAL
            </h4>
            <span className="spatial-decision-counter text-cosmos-muted/70">ADR-013 · 3 / 3</span>
          </div>
          <p className="spatial-incident-body">
            Precompiled static indexes are loaded into browser-managed Dexie IndexedDB storage, enabling local
            keyword and topic lookups with zero runtime cloud dependencies.
          </p>
        </div>
      </div>
    </div>
  );
});

export default CommandAtlasDecisionMatrix;
