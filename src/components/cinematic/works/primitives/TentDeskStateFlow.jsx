// FILE: src/components/cinematic/works/primitives/TentDeskStateFlow.jsx
// Conceptual multi-tenant state and real-time SSE stream architecture.
import React from 'react';

export default function TentDeskStateFlow() {
  return (
    <div className="spatial-story-beat spatial-story-beat--flow" aria-label="TentDesk State Flow Architecture">
      <div className="spatial-coordinate-eyebrow text-aurora">
        <span>TECHNICAL ARCHITECTURE · REAL-TIME OPERATIONAL STATE</span>
      </div>

      <div className="spatial-flow-diagram mt-3">
        {/* Tier 1: Field Client */}
        <div className="spatial-flow-node">
          <div className="spatial-node-header">
            <span className="spatial-node-badge text-aurora">TIER 01</span>
            <span className="spatial-node-title">FIELD TERMINAL</span>
          </div>
          <p className="spatial-node-desc">
            PWA client dispatching optimistic rental mutations via TanStack Query.
          </p>
        </div>

        {/* Connector 1 */}
        <div className="spatial-flow-connector" aria-hidden="true">
          <div className="spatial-flow-line">
            <div className="spatial-flow-pulse spatial-flow-pulse--cyan" />
          </div>
          <span className="spatial-connector-label">MUTATION (HTTPS)</span>
        </div>

        {/* Tier 2: Server & State Engine */}
        <div className="spatial-flow-node spatial-flow-node--server">
          <div className="spatial-node-header">
            <span className="spatial-node-badge text-stardust">TIER 02</span>
            <span className="spatial-node-title">STATE ENGINE</span>
          </div>
          <p className="spatial-node-desc">
            Next.js API &amp; Prisma transactions enforcing tenant isolation in MongoDB.
          </p>
        </div>

        {/* Connector 2 */}
        <div className="spatial-flow-connector" aria-hidden="true">
          <div className="spatial-flow-line">
            <div className="spatial-flow-pulse spatial-flow-pulse--purple" />
          </div>
          <span className="spatial-connector-label">SSE EVENT STREAM</span>
        </div>

        {/* Tier 3: Warehouse Console */}
        <div className="spatial-flow-node">
          <div className="spatial-node-header">
            <span className="spatial-node-badge text-aurora">TIER 03</span>
            <span className="spatial-node-title">WAREHOUSE CONSOLE</span>
          </div>
          <p className="spatial-node-desc">
            Real-time synchronized inventory updates received without WebSocket overhead.
          </p>
        </div>
      </div>
    </div>
  );
}
