// FILE: src/components/cinematic/works/primitives/IncidentInvestigation.jsx
// Factually precise visual storytelling of production incidents:
// 1. ~25s first-paint latency audit -> "Deployed ≠ Usable"
// 2. Mobile session disappearance -> browser-managed httpOnly cookie boundary
import React from 'react';

export default function IncidentInvestigation({ containerRef }) {
  return (
    <div ref={containerRef} className="spatial-story-beat spatial-story-beat--incident">
      <div className="spatial-coordinate-eyebrow text-[#f43f5e]">
        <span>PRODUCTION REALITY · INCIDENTS &amp; DIAGNOSTICS</span>
      </div>
      <h3 className="spatial-beat-title text-stardust">
        What <span className="text-[#f43f5e]">Broke</span> in Production
      </h3>
      <p className="spatial-beat-sub">
        Shipping to real commercial customers exposes issues that local development never reveals.
      </p>

      {/* Incident 1: ~25s First Paint */}
      <div className="spatial-incident-card mt-6">
        <div className="flex items-baseline gap-3">
          <span className="font-heading font-black text-4xl sm:text-5xl text-[#f43f5e] tracking-tight">
            ~25s
          </span>
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-stardust block font-semibold">
              First-Paint Latency on Cold Mobile
            </span>
            <span className="font-mono text-[0.65rem] text-[#f43f5e]/90 tracking-widest block">
              DIAGNOSTIC INVESTIGATION
            </span>
          </div>
        </div>

        {/* Investigation Sequence */}
        <div className="spatial-diagnostic-chain mt-4">
          <div className="spatial-diag-node">
            <span className="font-mono text-[0.68rem] text-stardust font-semibold">01 · INVESTIGATION</span>
            <span className="text-xs text-cosmos-muted block mt-0.5">
              Audited initial asset loading, bundle chunking, and uncached mobile network roundtrips.
            </span>
          </div>
          <div className="spatial-diag-arrow" aria-hidden="true">↓</div>
          <div className="spatial-diag-node">
            <span className="font-mono text-[0.68rem] text-amber-400 font-semibold">02 · BOTTLENECK ISOLATION</span>
            <span className="text-xs text-cosmos-muted block mt-0.5">
              Identified hydration stalls caused by heavy runtime dependencies on critical render paths.
            </span>
          </div>
          <div className="spatial-diag-arrow" aria-hidden="true">↓</div>
          <div className="spatial-diag-node">
            <span className="font-mono text-[0.68rem] text-emerald-400 font-semibold">03 · OPTIMIZATION</span>
            <span className="text-xs text-cosmos-muted block mt-0.5">
              Restructured loading &amp; resource priorities, pruned non-critical paths, and staged hydration.
            </span>
          </div>
        </div>
        <p className="font-mono text-xs text-[#f43f5e] mt-3 tracking-wide italic">
          Maxims formed: &ldquo;Deployed ≠ Usable.&rdquo;
        </p>
      </div>

      {/* Incident 2: Mobile Authentication Boundary */}
      <div className="spatial-incident-card mt-8 pt-6 border-t border-white/10">
        <div className="font-mono text-xs uppercase tracking-wider text-stardust font-semibold">
          Mobile Session Disappearance
        </div>
        <span className="font-mono text-[0.65rem] text-[#38bdf8] tracking-widest block mt-0.5">
          SECURITY BOUNDARY DIAGNOSTIC
        </span>

        {/* Visual Sequence of the Boundary */}
        <div className="spatial-auth-sequence mt-3">
          <div className="spatial-auth-step">
            <span className="font-mono text-[0.68rem] text-cosmos-muted">APP CLOSED</span>
            <span className="spatial-auth-arr">→</span>
            <span className="font-mono text-[0.68rem] text-[#f43f5e]">SESSION DISAPPEARS</span>
            <span className="spatial-auth-arr">→</span>
            <span className="font-mono text-[0.68rem] text-cosmos-muted">CLIENT ACCESS ATTEMPT</span>
          </div>

          <div className="spatial-boundary-barrier mt-2.5 p-2 rounded border border-[#38bdf8]/30 bg-[#38bdf8]/5 flex items-center justify-between">
            <span className="font-mono text-[0.65rem] text-[#38bdf8] font-semibold">
              [httpOnly BROWSER-MANAGED BOUNDARY]
            </span>
            <span className="font-mono text-[0.62rem] text-emerald-400">
              ✓ AUTH FLOW CORRECTED
            </span>
          </div>
        </div>

        <p className="text-xs text-cosmos-muted mt-3 leading-relaxed">
          Migrated from volatile client-side access to browser-enforced httpOnly cookies with strict CSRF verification.
        </p>
        <p className="font-mono text-xs text-[#38bdf8] mt-2 tracking-wide italic">
          Lesson learned: &ldquo;Security boundaries in browsers are architectural facts.&rdquo;
        </p>
      </div>
    </div>
  );
}
