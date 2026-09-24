// FILE: src/components/cinematic/works/primitives/TentDeskIncidentAudit.jsx
// Production audit and incident disclosures for TentDesk: Deployed ≠ Usable.
import React from 'react';

export default function TentDeskIncidentAudit() {
  return (
    <div className="spatial-story-beat spatial-story-beat--audit" aria-label="TentDesk Production Audit">
      <div className="spatial-coordinate-eyebrow text-supernova">
        <span>PRODUCTION LESSON · FIELD TELEMETRY</span>
      </div>

      <div className="spatial-audit-cluster mt-3">
        <div className="spatial-incident-node spatial-incident-node--amber">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="spatial-status-dot spatial-status-dot--amber" aria-hidden="true" />
            <h4 className="spatial-incident-label text-supernova">
              DEPLOYED ≠ USABLE · INITIAL ~25S FIRST-PAINT LATENCY
            </h4>
          </div>
          <p className="spatial-incident-body">
            Identified severe cold-start hydration pressure on field mobile connections. Restructured
            client hydration boundaries, eliminated heavy runtime dependencies, and prioritized critical-path
            inventory views to accelerate initial render.
          </p>
        </div>
      </div>
    </div>
  );
}
