// FILE: src/components/cinematic/works/primitives/CommandAtlasDecisionMatrix.jsx
// ADR-013 Architecture decisions and local determinism principles.
import React, { forwardRef } from 'react';

const CommandAtlasDecisionMatrix = forwardRef(function CommandAtlasDecisionMatrix(
  { decisionRefs },
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

      <div className="spatial-decision-cluster mt-4 space-y-4">
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
    </div>
  );
});

export default CommandAtlasDecisionMatrix;
