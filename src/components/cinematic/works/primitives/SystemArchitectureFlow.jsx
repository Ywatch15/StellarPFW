// FILE: src/components/cinematic/works/primitives/SystemArchitectureFlow.jsx
// Truthful software architecture visualizer separating client cache, server routes, database ORM, and SSE streaming.
// Zero card boxes; floating spatial architecture diagram with directional hairline paths.
import React from 'react';

export default function SystemArchitectureFlow({ containerRef }) {
  return (
    <div ref={containerRef} className="spatial-story-beat spatial-story-beat--architecture">
      <div className="spatial-coordinate-eyebrow text-[#38bdf8]">
        <span>SYSTEM ARCHITECTURE · DATA &amp; EVENT PATHWAYS</span>
      </div>
      <h3 className="spatial-beat-title text-stardust">
        Separation of <span className="text-[#38bdf8]">Responsibilities</span>
      </h3>
      <p className="spatial-beat-sub">
        Client cache, server orchestration, and unidirectional real-time event streaming.
      </p>

      <div className="spatial-arch-grid mt-6">
        {/* Tier 1: Client / PWA Boundary */}
        <div className="spatial-arch-tier">
          <div className="spatial-tier-badge text-[#38bdf8]">01 · CLIENT TIER (PWA)</div>
          <div className="spatial-arch-nodes-row mt-2">
            <div className="spatial-arch-node">
              <span className="font-mono text-xs font-semibold text-stardust">PWA / React UI</span>
              <span className="text-[0.65rem] text-cosmos-muted block">Installable mobile surface</span>
            </div>
            <div className="spatial-arch-connector-h" aria-hidden="true">→</div>
            <div className="spatial-arch-node">
              <span className="font-mono text-xs font-semibold text-[#38bdf8]">TanStack Query</span>
              <span className="text-[0.65rem] text-cosmos-muted block">Optimistic updates &amp; cache</span>
            </div>
          </div>
        </div>

        {/* Tier 2: API & Mutation Path */}
        <div className="spatial-arch-flow-arrow" aria-hidden="true">
          <span className="text-[0.65rem] font-mono text-cosmos-muted">HTTP API MUTATIONS ↓</span>
        </div>

        {/* Tier 3: Server & Database Layer */}
        <div className="spatial-arch-tier">
          <div className="spatial-tier-badge text-aurora">02 · SERVER &amp; DATA TIER</div>
          <div className="spatial-arch-nodes-row mt-2">
            <div className="spatial-arch-node">
              <span className="font-mono text-xs font-semibold text-stardust">Next.js Server</span>
              <span className="text-[0.65rem] text-cosmos-muted block">Route handlers &amp; auth</span>
            </div>
            <div className="spatial-arch-connector-h" aria-hidden="true">→</div>
            <div className="spatial-arch-node">
              <span className="font-mono text-xs font-semibold text-aurora">Prisma ORM</span>
              <span className="text-[0.65rem] text-cosmos-muted block">Type-safe queries</span>
            </div>
            <div className="spatial-arch-connector-h" aria-hidden="true">→</div>
            <div className="spatial-arch-node">
              <span className="font-mono text-xs font-semibold text-stardust">MongoDB</span>
              <span className="text-[0.65rem] text-cosmos-muted block">Document persistence</span>
            </div>
          </div>
        </div>

        {/* Tier 4: Truthful Server-to-Client SSE Stream */}
        <div className="spatial-arch-stream-tier mt-4 pt-3 border-t border-white/10">
          <div className="spatial-tier-badge text-[#f43f5e]">03 · REAL-TIME STATE RECONCILIATION</div>
          <p className="text-xs text-cosmos-muted mt-1">
            Server-Sent Events (SSE) stream server state mutations down to listening clients unidirectionally:
          </p>
          <div className="spatial-sse-flow mt-2.5">
            <span className="spatial-sse-box">Client A (Mutation)</span>
            <span className="spatial-sse-arrow">→</span>
            <span className="spatial-sse-box spatial-sse-box--core">Server State</span>
            <span className="spatial-sse-arrow spatial-sse-arrow--stream">
              <span className="text-[0.6rem] block font-mono text-[#38bdf8]">SSE STREAM</span>
              →
            </span>
            <span className="spatial-sse-box">Client B (Live UI Update)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
