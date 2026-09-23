// FILE: src/components/cinematic/works/primitives/CommandAtlasPipeline.jsx
// Visual storytelling for CommandAtlas: Why offline-first problem + static documentation pipeline.
import React from 'react';

export default function CommandAtlasPipeline({ containerRef }) {
  const pipeline = [
    { step: '01', title: 'MARKDOWN SOURCE', desc: 'Raw verified documentation files' },
    { step: '02', title: 'BUILD-TIME VALIDATION', desc: 'Syntax, flag, and schema verification' },
    { step: '03', title: 'STATIC PACKS', desc: 'Precompiled JSON documentation payloads' },
    { step: '04', title: 'DEXIE INDEXEDDB', desc: 'Client-side persistent structured store' },
    { step: '05', title: 'LOCAL SEARCH INDEX', desc: 'In-memory deterministic syntax query' },
  ];

  return (
    <div ref={containerRef} className="spatial-story-beat spatial-story-beat--pipeline">
      <div className="spatial-coordinate-eyebrow text-[#a78bfa]">
        <span>OFFLINE-FIRST ARCHITECTURE · CONTENT PIPELINE</span>
      </div>
      <h3 className="spatial-beat-title text-stardust">
        Why <span className="text-[#a78bfa]">Offline-First?</span>
      </h3>
      <p className="spatial-beat-sub">
        Essential engineering knowledge should not disappear when the network does.
      </p>

      {/* Environmental Stressors */}
      <div className="spatial-stressor-strip mt-4 flex flex-wrap gap-2">
        <span className="spatial-pill text-[#a78bfa]">DISCONNECTED TERMINALS</span>
        <span className="spatial-pill text-[#a78bfa]">REMOTE SERVER DROPS</span>
        <span className="spatial-pill text-[#a78bfa]">AIR-GAPPED NETWORKS</span>
      </div>

      {/* Sequential Compilation Pipeline */}
      <div className="spatial-pipeline-flow mt-6">
        <span className="text-[0.65rem] font-mono tracking-widest text-cosmos-muted block mb-3">
          DOCUMENTATION COMPILATION PIPELINE:
        </span>
        <div className="space-y-2">
          {pipeline.map((p, idx) => (
            <div key={p.step} className="spatial-pipeline-node flex items-center gap-3">
              <span className="font-mono text-xs text-[#a78bfa] font-bold w-6">{p.step}</span>
              <div className="flex-1 p-2 rounded border border-white/10 bg-slate-900/50 backdrop-blur-sm flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-stardust">{p.title}</span>
                <span className="text-[0.65rem] text-cosmos-muted hidden sm:inline">{p.desc}</span>
              </div>
              {idx < pipeline.length - 1 && (
                <span className="text-cosmos-muted/60 text-xs hidden sm:inline">↓</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
