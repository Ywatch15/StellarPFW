// FILE: src/components/cinematic/works/primitives/DevGraphSearchFlow.jsx
// Spatial Primitive: DevGraph Hybrid Search Architecture
// Spatial Sequence: NOTE QUERY -> 3-LAYER RETRIEVAL ENGINE -> UNIFIED SEARCH RESULT
import React from 'react';

export default function DevGraphSearchFlow({ compact = false }) {
  return (
    <div
      className={`devgraph-search-flow ${compact ? 'devgraph-search-flow--compact' : ''}`}
      aria-label="DevGraph Hybrid Search Architecture"
    >
      {/* ── STAGE 1: INPUT QUERY ── */}
      <div className="devgraph-search-node devgraph-search-node--input">
        <div className="devgraph-search-node-header">
          <span className="devgraph-search-badge text-aurora">NOTE QUERY</span>
          <span className="devgraph-search-meta">INPUT CAPTURE</span>
        </div>
        <div className="devgraph-search-input-box">
          <span className="devgraph-search-icon">⌕</span>
          <span className="devgraph-search-query-text">"auth token expired refresh"</span>
        </div>
      </div>

      {/* Spatial connector */}
      <div className="devgraph-search-connector" aria-hidden="true">
        <div className="devgraph-connector-line" />
        <span className="devgraph-connector-arrow">↓</span>
      </div>

      {/* ── STAGE 2: 3-LAYER PARALLEL ENGINE ── */}
      <div className="devgraph-search-layers">
        <div className="devgraph-layers-header">
          <span className="text-[10px] font-mono tracking-widest uppercase text-cosmos-muted">
            3-LAYER RETRIEVAL ENGINE · MULTIPLE SEARCH LAYERS → UNIFIED RETRIEVAL
          </span>
        </div>

        <div className="devgraph-layers-grid">
          {/* Layer 1: FlexSearch */}
          <div className="devgraph-layer-card devgraph-layer-card--flex">
            <div className="devgraph-layer-pill text-[#38bdf8] border-[#38bdf8]/30">01 · IN-MEMORY</div>
            <h6 className="devgraph-layer-title">FLEXSEARCH</h6>
            <p className="devgraph-layer-desc">Fast client-side lexical index &amp; token score</p>
          </div>

          {/* Layer 2: PostgreSQL tsvector */}
          <div className="devgraph-layer-card devgraph-layer-card--pg">
            <div className="devgraph-layer-pill text-[#a78bfa] border-[#a78bfa]/30">02 · SERVER FTS</div>
            <h6 className="devgraph-layer-title">PG TSVECTOR</h6>
            <p className="devgraph-layer-desc">Stemmed full-text search with GIN index</p>
          </div>

          {/* Layer 3: Substring Fallback */}
          <div className="devgraph-layer-card devgraph-layer-card--fallback">
            <div className="devgraph-layer-pill text-[#10b981] border-[#10b981]/30">03 · FALLBACK</div>
            <h6 className="devgraph-layer-title">SUBSTRING</h6>
            <p className="devgraph-layer-desc">Exact partial &amp; regex pattern matching</p>
          </div>
        </div>
      </div>

      {/* Spatial connector */}
      <div className="devgraph-search-connector" aria-hidden="true">
        <div className="devgraph-connector-line" />
        <span className="devgraph-connector-arrow">↓</span>
      </div>

      {/* ── STAGE 3: UNIFIED RETRIEVAL OUTPUT ── */}
      <div className="devgraph-search-node devgraph-search-node--result">
        <div className="devgraph-search-node-header">
          <span className="devgraph-search-badge text-[#10b981]">SEARCH RESULT</span>
          <span className="devgraph-search-meta text-[#10b981]">DEDUPLICATED &amp; RANKED</span>
        </div>
        <div className="devgraph-result-preview">
          <div className="flex items-center gap-2">
            <span className="devgraph-result-dot" />
            <span className="font-mono text-xs font-semibold text-white">OAuth2 Token Refresh Strategy</span>
          </div>
          <span className="devgraph-result-tag">ARCHITECTURE #auth</span>
        </div>
      </div>
    </div>
  );
}
