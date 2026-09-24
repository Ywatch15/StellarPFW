// FILE: src/components/cinematic/works/primitives/CommandAtlasDecisionMatrix.jsx
// ADR-013: No AI by Design & Local Scale Anchor.
import React, { forwardRef } from 'react';

const CommandAtlasDecisionMatrix = forwardRef(function CommandAtlasDecisionMatrix(
  _props,
  ref,
) {
  return (
    <div
      ref={ref}
      className="spatial-story-beat spatial-story-beat--decisions"
      aria-label="CommandAtlas Architectural Decision"
    >
      <div className="spatial-coordinate-eyebrow text-stardust">
        <span>ARCHITECTURAL DECISION · ADR-013</span>
      </div>

      <div className="spatial-decision-cluster mt-3 space-y-3">
        {/* Core Decision: No AI by Design */}
        <div className="spatial-incident-node spatial-incident-node--cyan">
          <div className="flex items-center gap-2 mb-1">
            <span className="spatial-status-dot spatial-status-dot--cyan" aria-hidden="true" />
            <h4 className="spatial-incident-label text-aurora">
              ADR-013 · NO AI BY DESIGN
            </h4>
          </div>
          <p className="spatial-incident-body">
            For infrastructure command reference, deterministic validated data was preferred
            over runtime probabilistic generation. System administration syntax demands
            verifiable documentation rather than hallucinated parameters.
          </p>
        </div>

        {/* Scale Anchor */}
        <div className="flex items-center gap-3 pt-1">
          <div className="px-3 py-1.5 rounded bg-white/[0.04] border border-white/10 font-mono text-xs text-stardust">
            <span className="font-bold text-white text-sm">366</span> COMMANDS
          </div>
          <div className="px-3 py-1.5 rounded bg-white/[0.04] border border-white/10 font-mono text-xs text-stardust">
            <span className="font-bold text-white text-sm">21</span> TOPICS
          </div>
          <div className="px-3 py-1.5 rounded bg-white/[0.04] border border-white/10 font-mono text-xs text-aurora">
            ZERO RUNTIME DEPENDENCIES
          </div>
        </div>
      </div>
    </div>
  );
});

export default CommandAtlasDecisionMatrix;
