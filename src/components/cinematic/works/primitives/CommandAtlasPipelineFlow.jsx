// FILE: src/components/cinematic/works/primitives/CommandAtlasPipelineFlow.jsx
// Deterministic compilation pipeline for CommandAtlas:
// MARKDOWN -> VALIDATION -> STATIC PACKS -> INDEXEDDB
import React, { forwardRef } from 'react';

const CommandAtlasPipelineFlow = forwardRef(function CommandAtlasPipelineFlow(
  { trackRef },
  ref,
) {
  return (
    <div
      ref={ref}
      className="spatial-story-beat spatial-story-beat--flow"
      aria-label="CommandAtlas Compilation Pipeline"
    >
      <div className="spatial-coordinate-eyebrow text-stardust">
        <span>ARCHITECTURAL PIPELINE · DETERMINISTIC STATIC COMPILATION</span>
      </div>

      {/* Elegant 4-Node Connected Pipeline Flow */}
      <div ref={trackRef} className="spatial-pipeline-stream mt-3">
        {/* Step 1: Markdown Source */}
        <div className="spatial-pipeline-node">
          <div className="spatial-pipeline-node-badge">01</div>
          <div className="spatial-pipeline-node-info">
            <h5 className="spatial-pipeline-node-title">MARKDOWN</h5>
            <p className="spatial-pipeline-node-desc">Canonical command source across 21 topics</p>
          </div>
        </div>

        {/* Connector */}
        <div className="spatial-pipeline-arrow" aria-hidden="true">
          <span className="text-stardust/70">→</span>
        </div>

        {/* Step 2: Build-Time Validation */}
        <div className="spatial-pipeline-node">
          <div className="spatial-pipeline-node-badge">02</div>
          <div className="spatial-pipeline-node-info">
            <h5 className="spatial-pipeline-node-title">VALIDATION</h5>
            <p className="spatial-pipeline-node-desc">CI schema &amp; flag verification at build</p>
          </div>
        </div>

        {/* Connector */}
        <div className="spatial-pipeline-arrow" aria-hidden="true">
          <span className="text-stardust/70">→</span>
        </div>

        {/* Step 3: Static Packs */}
        <div className="spatial-pipeline-node">
          <div className="spatial-pipeline-node-badge text-aurora">03</div>
          <div className="spatial-pipeline-node-info">
            <h5 className="spatial-pipeline-node-title">STATIC PACKS</h5>
            <p className="spatial-pipeline-node-desc">Optimized JSON search chunks &amp; manifests</p>
          </div>
        </div>

        {/* Connector */}
        <div className="spatial-pipeline-arrow" aria-hidden="true">
          <span className="text-aurora/70">→</span>
        </div>

        {/* Step 4: Dexie IndexedDB */}
        <div className="spatial-pipeline-node spatial-pipeline-node--terminal">
          <div className="spatial-pipeline-node-badge text-[#a78bfa]">04</div>
          <div className="spatial-pipeline-node-info">
            <h5 className="spatial-pipeline-node-title">INDEXEDDB</h5>
            <p className="spatial-pipeline-node-desc">Client Dexie cache for instant offline search</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CommandAtlasPipelineFlow;
