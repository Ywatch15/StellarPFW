// FILE: src/components/cinematic/works/primitives/DecisionMatrix.jsx
// Visual storytelling for CommandAtlas: ADR-013 determinism, No AI by Design decision, and scale anchors.
import React from 'react';

export default function DecisionMatrix({ containerRef }) {
  return (
    <div ref={containerRef} className="spatial-story-beat spatial-story-beat--decision">
      <div className="spatial-coordinate-eyebrow text-[#a78bfa]">
        <span>ARCHITECTURE DECISION · ADR-013</span>
      </div>
      <h3 className="spatial-beat-title text-stardust">
        No AI <span className="text-[#a78bfa]">By Design</span>
      </h3>
      <p className="spatial-beat-sub">
        For infrastructure command reference, predictability and exactness were intentionally preferred over probabilistic generation.
      </p>

      {/* Comparative Decision Matrix */}
      <div className="spatial-decision-grid mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
        {/* Rejected Path */}
        <div className="p-3 rounded border border-rose-500/20 bg-rose-950/20 backdrop-blur-sm">
          <div className="flex items-center gap-1.5 text-[#f43f5e] font-mono text-xs font-semibold">
            <span>✕</span>
            <span>PROBABILISTIC AI GENERATION</span>
          </div>
          <ul className="mt-2 space-y-1 text-[0.72rem] text-cosmos-muted list-disc list-inside">
            <li>Unpredictable flag hallucination</li>
            <li>Requires active network connection</li>
            <li>Non-deterministic output variance</li>
          </ul>
        </div>

        {/* Selected Architectural Path */}
        <div className="p-3 rounded border border-purple-500/30 bg-purple-950/20 backdrop-blur-sm">
          <div className="flex items-center gap-1.5 text-[#a78bfa] font-mono text-xs font-semibold">
            <span>✓</span>
            <span>DETERMINISTIC VALIDATED DATA</span>
          </div>
          <ul className="mt-2 space-y-1 text-[0.72rem] text-cosmos-muted list-disc list-inside">
            <li>Build-time schema verified syntax</li>
            <li>Instant offline client query (Dexie)</li>
            <li>100% reproducible execution</li>
          </ul>
        </div>
      </div>

      {/* Massive Scale Typographic Anchors */}
      <div className="spatial-scale-anchors mt-8 flex items-baseline gap-8 sm:gap-12">
        <div>
          <span className="font-heading font-black text-4xl sm:text-6xl text-stardust tracking-tight block">
            366
          </span>
          <span className="font-mono text-xs text-[#a78bfa] tracking-widest uppercase font-semibold">
            Commands Indexed
          </span>
        </div>

        <div>
          <span className="font-heading font-black text-4xl sm:text-6xl text-stardust tracking-tight block">
            21
          </span>
          <span className="font-mono text-xs text-[#a78bfa] tracking-widest uppercase font-semibold">
            Canonical Topics
          </span>
        </div>
      </div>
    </div>
  );
}
