// FILE: src/components/cinematic/works/primitives/CommandAtlasPipelineFlow.jsx
// Deterministic compilation pipeline for CommandAtlas.
import React, { forwardRef } from 'react';

const CommandAtlasPipelineFlow = forwardRef(function CommandAtlasPipelineFlow(
  { trackRef, stepRefs, mobileStepRefs },
  ref,
) {
  return (
    <div
      ref={ref}
      className="spatial-story-beat spatial-story-beat--flow"
      aria-label="CommandAtlas Compilation Pipeline"
    >
      <div className="spatial-coordinate-eyebrow text-stardust">
        <span>PIPELINE · STATIC COMPILATION &amp; LOCAL SEARCH CACHE</span>
      </div>

      {/* Desktop Layout: Full vertical compilation flow with continuous visual continuity */}
      <div className="hidden md:block spatial-pipeline-viewport mt-4">
        <div ref={trackRef} className="spatial-pipeline-track spatial-pipeline-steps">
          {/* Step 1: Markdown Source */}
          <div
            ref={stepRefs ? (el) => (stepRefs.current[0] = el) : null}
            className="spatial-pipeline-step"
            data-step="1"
          >
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
          <div
            ref={stepRefs ? (el) => (stepRefs.current[1] = el) : null}
            className="spatial-pipeline-step"
            data-step="2"
          >
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
          <div
            ref={stepRefs ? (el) => (stepRefs.current[2] = el) : null}
            className="spatial-pipeline-step"
            data-step="3"
          >
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
          <div
            ref={stepRefs ? (el) => (stepRefs.current[3] = el) : null}
            className="spatial-pipeline-step"
            data-step="4"
          >
            <span className="spatial-step-index text-aurora">04</span>
            <div className="spatial-step-content">
              <h5 className="spatial-step-title">DEXIE INDEXEDDB (CLIENT-SIDE)</h5>
              <p className="spatial-step-desc">
                Browser-local database enabling deterministic offline command retrieval without cloud round-trips.
              </p>
            </div>
          </div>

          <div className="spatial-step-divider" aria-hidden="true">
            <span className="text-cosmos-muted/60">↓</span>
          </div>

          {/* Step 5: Local Search Index */}
          <div
            ref={stepRefs ? (el) => (stepRefs.current[4] = el) : null}
            className="spatial-pipeline-step"
            data-step="5"
          >
            <span className="spatial-step-index text-[#a78bfa]">05</span>
            <div className="spatial-step-content">
              <h5 className="spatial-step-title">LOCAL SEARCH INDEX</h5>
              <p className="spatial-step-desc">
                Deterministic local search indexing enabling instant syntax lookup with zero cloud latency.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout: Discrete Sequential Single-Step Reading Surface (Zero Overflow Clipping) */}
      <div className="block md:hidden spatial-pipeline-mobile-container mt-3">
        {/* Mobile Step 1 */}
        <div
          ref={mobileStepRefs ? (el) => (mobileStepRefs.current[0] = el) : null}
          className="spatial-pipeline-mobile-step"
          data-mobile-step="1"
        >
          <div className="spatial-pipeline-mobile-header">
            <span className="spatial-step-index text-stardust">01</span>
            <span className="spatial-step-counter text-cosmos-muted/70">STAGE 01 / 05</span>
          </div>
          <h5 className="spatial-step-title">MARKDOWN REPOSITORY</h5>
          <p className="spatial-step-desc">
            Canonical command documentation across 21 topics maintained in Git.
          </p>
        </div>

        {/* Mobile Step 2 */}
        <div
          ref={mobileStepRefs ? (el) => (mobileStepRefs.current[1] = el) : null}
          className="spatial-pipeline-mobile-step"
          data-mobile-step="2"
        >
          <div className="spatial-pipeline-mobile-header">
            <span className="spatial-step-index text-stardust">02</span>
            <span className="spatial-step-counter text-cosmos-muted/70">STAGE 02 / 05</span>
          </div>
          <h5 className="spatial-step-title">BUILD-TIME VALIDATION</h5>
          <p className="spatial-step-desc">
            CI verification validates command schemas, flag definitions, and metadata prior to release.
          </p>
        </div>

        {/* Mobile Step 3 */}
        <div
          ref={mobileStepRefs ? (el) => (mobileStepRefs.current[2] = el) : null}
          className="spatial-pipeline-mobile-step"
          data-mobile-step="3"
        >
          <div className="spatial-pipeline-mobile-header">
            <span className="spatial-step-index text-aurora">03</span>
            <span className="spatial-step-counter text-aurora/80">STAGE 03 / 05</span>
          </div>
          <h5 className="spatial-step-title">STATIC PACKS</h5>
          <p className="spatial-step-desc">
            Compiled JSON search indexes and topic manifests optimized for client delivery.
          </p>
        </div>

        {/* Mobile Step 4: Dexie IndexedDB (Client-Side) - NEVER CLIPPED */}
        <div
          ref={mobileStepRefs ? (el) => (mobileStepRefs.current[3] = el) : null}
          className="spatial-pipeline-mobile-step"
          data-mobile-step="4"
        >
          <div className="spatial-pipeline-mobile-header">
            <span className="spatial-step-index text-aurora">04</span>
            <span className="spatial-step-counter text-aurora/80">STAGE 04 / 05</span>
          </div>
          <h5 className="spatial-step-title">DEXIE INDEXEDDB (CLIENT-SIDE)</h5>
          <p className="spatial-step-desc">
            Browser-local database enabling deterministic offline command retrieval without cloud round-trips.
          </p>
        </div>

        {/* Mobile Step 5 */}
        <div
          ref={mobileStepRefs ? (el) => (mobileStepRefs.current[4] = el) : null}
          className="spatial-pipeline-mobile-step"
          data-mobile-step="5"
        >
          <div className="spatial-pipeline-mobile-header">
            <span className="spatial-step-index text-[#a78bfa]">05</span>
            <span className="spatial-step-counter text-[#a78bfa]/80">STAGE 05 / 05</span>
          </div>
          <h5 className="spatial-step-title">LOCAL SEARCH INDEX</h5>
          <p className="spatial-step-desc">
            Deterministic local search indexing enabling instant syntax lookup with zero cloud latency.
          </p>
        </div>
      </div>
    </div>
  );
});

export default CommandAtlasPipelineFlow;
