// FILE: src/components/cinematic/works/primitives/CommandAtlasPipelineFlow.jsx
// Deterministic compilation pipeline for CommandAtlas.
import React from 'react';

export default function CommandAtlasPipelineFlow() {
  return (
    <div className="spatial-story-beat spatial-story-beat--flow" aria-label="CommandAtlas Compilation Pipeline">
      <div className="spatial-coordinate-eyebrow text-stardust">
        <span>PIPELINE · STATIC COMPILATION &amp; LOCAL SEARCH CACHE</span>
      </div>

      <div className="spatial-pipeline-steps mt-4">
        {/* Step 1: Markdown Source */}
        <div className="spatial-pipeline-step">
          <span className="spatial-step-index text-stardust">01</span>
          <div className="spatial-step-content">
            <h5 className="spatial-step-title">MARKDOWN REPOSITORY</h5>
            <p className="spatial-step-desc">
              Canonical command documentation across 21 topics maintained in Git.
            </p>
          </div>
        </div>

        <div className="spatial-step-divider" aria-hidden="true">
          <span className="text-cosmos-muted/60">↓</span>
        </div>

        {/* Step 2: Build-Time Validation */}
        <div className="spatial-pipeline-step">
          <span className="spatial-step-index text-stardust">02</span>
          <div className="spatial-step-content">
            <h5 className="spatial-step-title">BUILD-TIME VALIDATION</h5>
            <p className="spatial-step-desc">
              CI verification validates command schemas, flag definitions, and metadata prior to release.
            </p>
          </div>
        </div>

        <div className="spatial-step-divider" aria-hidden="true">
          <span className="text-cosmos-muted/60">↓</span>
        </div>

        {/* Step 3: Static Packs */}
        <div className="spatial-pipeline-step">
          <span className="spatial-step-index text-aurora">03</span>
          <div className="spatial-step-content">
            <h5 className="spatial-step-title">STATIC PACKS</h5>
            <p className="spatial-step-desc">
              Compiled JSON search indexes and topic manifests optimized for client delivery.
            </p>
          </div>
        </div>

        <div className="spatial-step-divider" aria-hidden="true">
          <span className="text-cosmos-muted/60">↓</span>
        </div>

        {/* Step 4: Dexie IndexedDB */}
        <div className="spatial-pipeline-step">
          <span className="spatial-step-index text-aurora">04</span>
          <div className="spatial-step-content">
            <h5 className="spatial-step-title">DEXIE INDEXEDDB (CLIENT-SIDE)</h5>
            <p className="spatial-step-desc">
              Browser-local database enabling deterministic offline command retrieval without cloud round-trips.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
