// FILE: src/components/cinematic/works/primitives/TentDeskIncidentAudit.jsx
// Production audit and incident disclosures for TentDesk.
import React from 'react';

export default function TentDeskIncidentAudit() {
  return (
    <div className="spatial-story-beat spatial-story-beat--audit" aria-label="TentDesk Production Audits">
      <div className="spatial-coordinate-eyebrow text-supernova">
        <span>PRODUCTION AUDIT · VERIFIED ENGINEERING INVESTIGATIONS</span>
      </div>

      <div className="spatial-audit-cluster mt-4 space-y-4">
        {/* Incident 1: First Paint */}
        <div className="spatial-incident-node spatial-incident-node--amber">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="spatial-status-dot spatial-status-dot--amber" aria-hidden="true" />
            <h4 className="spatial-incident-label text-supernova">
              AUDIT 01 · INITIAL ~25S FIRST-PAINT LATENCY INVESTIGATION
            </h4>
          </div>
          <p className="spatial-incident-body">
            Identified severe cold-start hydration pressure on field mobile connections. Restructured
            client hydration boundaries, eliminated heavy runtime dependencies, and prioritized critical-path
            inventory views to accelerate initial render.
          </p>
        </div>

        {/* Incident 2: Mobile Auth */}
        <div className="spatial-incident-node spatial-incident-node--cyan">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="spatial-status-dot spatial-status-dot--cyan" aria-hidden="true" />
            <h4 className="spatial-incident-label text-aurora">
              AUDIT 02 · MOBILE AUTH RESILIENCE &amp; SESSION CONTINUITY
            </h4>
          </div>
          <p className="spatial-incident-body">
            Eliminated mid-shift session loss on mobile disconnects by migrating from volatile client-side
            storage to browser-managed <code className="text-aurora">httpOnly</code> secure cookie boundaries with strict CSRF protection.
          </p>
        </div>
      </div>
    </div>
  );
}
