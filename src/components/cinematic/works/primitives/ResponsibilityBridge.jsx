// FILE: src/components/cinematic/works/primitives/ResponsibilityBridge.jsx
// Visual bridge connecting TentDesk production realities to broader engineering responsibility.
import React from 'react';

export default function ResponsibilityBridge({ containerRef }) {
  const steps = [
    { label: 'BUILD', role: 'Architecture & implementation' },
    { label: 'DEPLOY', role: 'Production infrastructure' },
    { label: 'OBSERVE', role: 'Telemetry & real customer usage' },
    { label: 'RECOVER', role: 'Diagnostic mitigation & fixes' },
    { label: 'RESPONSIBILITY', role: 'Accountability to end users' },
  ];

  return (
    <div ref={containerRef} className="spatial-story-beat spatial-story-beat--responsibility">
      <div className="spatial-coordinate-eyebrow text-aurora">
        <span>ENGINEERING PRINCIPLE · PRODUCTION PERSPECTIVE</span>
      </div>
      <h3 className="spatial-beat-title text-stardust">
        Beyond <span className="text-aurora">&ldquo;Git Push&rdquo;</span>
      </h3>

      <div className="spatial-responsibility-loop mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
          {steps.map((s, idx) => (
            <div key={s.label} className="spatial-resp-step p-2.5 rounded border border-white/10 bg-slate-900/40 backdrop-blur-sm">
              <span className="font-mono text-[0.6rem] text-aurora block">0{idx + 1}</span>
              <span className="font-mono text-xs font-bold text-stardust block mt-0.5">{s.label}</span>
              <span className="text-[0.62rem] text-cosmos-muted block mt-1 leading-tight">{s.role}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="spatial-principle-quote mt-6 text-sm text-cosmos-muted leading-relaxed max-w-xl pl-3 border-l border-aurora/50">
        <span className="text-stardust font-semibold">&ldquo;Git push is not the end of a product.</span> It is the start of deployment, observability, recovery, and responsibility.&rdquo;
      </p>
    </div>
  );
}
