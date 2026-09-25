// FILE: src/components/cinematic/works/primitives/AlgoVistaVisualizer.jsx
// Lightweight cinematic algorithm visualization primitive:
// Supports three sequential visual states: SORTING, GRAPH, and SEARCH.
// Pure CSS animations & SVG vectors for zero runtime bundle weight.

import React from 'react';

export default function AlgoVistaVisualizer({ mode = 'sorting', compact = false }) {
  if (mode === 'sorting') {
    return (
      <div className={`algovista-viz algovista-viz--sorting ${compact ? 'algovista-viz--compact' : ''}`}>
        <div className="algovista-viz-header">
          <span className="algovista-viz-badge text-aurora">SORTING · STATE 01</span>
          <span className="algovista-viz-status">UNSORTED → COMPARISON → ORDERED</span>
        </div>
        <div className="algovista-sorting-stage">
          <div className="algovista-bar algovista-bar--1" style={{ '--height': '35%', '--order-height': '20%' }}>
            <span className="algovista-bar-val">20</span>
          </div>
          <div className="algovista-bar algovista-bar--2 algovista-bar--active" style={{ '--height': '85%', '--order-height': '35%' }}>
            <span className="algovista-bar-val">35</span>
          </div>
          <div className="algovista-bar algovista-bar--3 algovista-bar--active" style={{ '--height': '45%', '--order-height': '50%' }}>
            <span className="algovista-bar-val">50</span>
          </div>
          <div className="algovista-bar algovista-bar--4" style={{ '--height': '95%', '--order-height': '68%' }}>
            <span className="algovista-bar-val">68</span>
          </div>
          <div className="algovista-bar algovista-bar--5" style={{ '--height': '60%', '--order-height': '85%' }}>
            <span className="algovista-bar-val">85</span>
          </div>
          <div className="algovista-bar algovista-bar--6" style={{ '--height': '20%', '--order-height': '95%' }}>
            <span className="algovista-bar-val">95</span>
          </div>
        </div>
        <div className="algovista-viz-footer">
          <span className="algovista-viz-legend">
            <span className="algovista-legend-dot algovista-legend-dot--cyan" />
            COMPARE &amp; SWAP
          </span>
          <span className="algovista-viz-legend">
            <span className="algovista-legend-dot algovista-legend-dot--amber" />
            PARTITION PIVOT
          </span>
        </div>
      </div>
    );
  }

  if (mode === 'graph') {
    return (
      <div className={`algovista-viz algovista-viz--graph ${compact ? 'algovista-viz--compact' : ''}`}>
        <div className="algovista-viz-header">
          <span className="algovista-viz-badge text-stardust">GRAPH · STATE 02</span>
          <span className="algovista-viz-status">NODES → EDGES → EXPLORATION</span>
        </div>
        <div className="algovista-graph-stage">
          <svg className="algovista-graph-svg" viewBox="0 0 280 100" fill="none">
            {/* Edges */}
            <line x1="35" y1="50" x2="95" y2="25" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
            <line x1="35" y1="50" x2="95" y2="75" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
            <line x1="95" y1="25" x2="175" y2="35" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
            <line x1="95" y1="75" x2="175" y2="65" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
            <line x1="95" y1="25" x2="95" y2="75" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
            <line x1="175" y1="35" x2="245" y2="50" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
            <line x1="175" y1="65" x2="245" y2="50" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />

            {/* Traversal Pulse along Edge (BFS / DFS path) */}
            <line
              x1="35"
              y1="50"
              x2="95"
              y2="25"
              stroke="#a78bfa"
              strokeWidth="2.5"
              strokeDasharray="10 40"
              className="algovista-pulse-line"
            />
            <line
              x1="95"
              y1="25"
              x2="175"
              y2="35"
              stroke="#a78bfa"
              strokeWidth="2.5"
              strokeDasharray="10 40"
              className="algovista-pulse-line-delay"
            />
            <line
              x1="175"
              y1="35"
              x2="245"
              y2="50"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeDasharray="10 40"
              className="algovista-pulse-line-final"
            />

            {/* Nodes */}
            <g className="algovista-node algovista-node--origin" transform="translate(35, 50)">
              <circle r="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <text textAnchor="middle" dy="4" fill="#38bdf8" fontSize="10" fontFamily="Space Grotesk">A</text>
            </g>
            <g className="algovista-node algovista-node--visited" transform="translate(95, 25)">
              <circle r="13" fill="#0f172a" stroke="#a78bfa" strokeWidth="2" />
              <text textAnchor="middle" dy="4" fill="#a78bfa" fontSize="10" fontFamily="Space Grotesk">B</text>
            </g>
            <g className="algovista-node" transform="translate(95, 75)">
              <circle r="12" fill="#0f172a" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
              <text textAnchor="middle" dy="4" fill="#cbd5e1" fontSize="10" fontFamily="Space Grotesk">C</text>
            </g>
            <g className="algovista-node algovista-node--visited" transform="translate(175, 35)">
              <circle r="13" fill="#0f172a" stroke="#a78bfa" strokeWidth="2" />
              <text textAnchor="middle" dy="4" fill="#a78bfa" fontSize="10" fontFamily="Space Grotesk">D</text>
            </g>
            <g className="algovista-node" transform="translate(175, 65)">
              <circle r="12" fill="#0f172a" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
              <text textAnchor="middle" dy="4" fill="#cbd5e1" fontSize="10" fontFamily="Space Grotesk">E</text>
            </g>
            <g className="algovista-node algovista-node--target" transform="translate(245, 50)">
              <circle r="15" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
              <text textAnchor="middle" dy="4" fill="#38bdf8" fontSize="10" fontFamily="Space Grotesk" fontWeight="bold">F</text>
            </g>
          </svg>
        </div>
        <div className="algovista-viz-footer">
          <span className="algovista-viz-legend">
            <span className="algovista-legend-dot algovista-legend-dot--purple" />
            TRAVERSAL FRONTIER
          </span>
          <span className="algovista-viz-legend">
            <span className="algovista-legend-dot algovista-legend-dot--cyan" />
            TARGET DESTINATION
          </span>
        </div>
      </div>
    );
  }

  // mode === 'search'
  return (
    <div className={`algovista-viz algovista-viz--search ${compact ? 'algovista-viz--compact' : ''}`}>
      <div className="algovista-viz-header">
        <span className="algovista-viz-badge text-emerald-400">SEARCH · STATE 03</span>
        <span className="algovista-viz-status">QUERY → INSPECT → MATCH → RESOLVED</span>
      </div>
      <div className="algovista-search-stage">
        <div className="algovista-search-query">
          <span className="algovista-query-label">TARGET:</span>
          <span className="algovista-query-val text-emerald-400">42</span>
        </div>
        <div className="algovista-search-array">
          <div className="algovista-cell algovista-cell--scanned">
            <span className="algovista-cell-idx">0</span>
            <span className="algovista-cell-val">12</span>
          </div>
          <div className="algovista-cell algovista-cell--scanned">
            <span className="algovista-cell-idx">1</span>
            <span className="algovista-cell-val">24</span>
          </div>
          <div className="algovista-cell algovista-cell--scanned">
            <span className="algovista-cell-idx">2</span>
            <span className="algovista-cell-val">36</span>
          </div>
          <div className="algovista-cell algovista-cell--match">
            <span className="algovista-cell-idx text-emerald-400">3</span>
            <span className="algovista-cell-val text-emerald-300 font-bold">42</span>
            <span className="algovista-match-indicator">MATCH</span>
          </div>
          <div className="algovista-cell">
            <span className="algovista-cell-idx">4</span>
            <span className="algovista-cell-val">58</span>
          </div>
          <div className="algovista-cell">
            <span className="algovista-cell-idx">5</span>
            <span className="algovista-cell-val">71</span>
          </div>
        </div>
      </div>
      <div className="algovista-viz-footer">
        <span className="algovista-viz-legend">
          <span className="algovista-legend-dot algovista-legend-dot--emerald" />
          MATCH CONFIRMED · O(log N)
        </span>
        <span className="algovista-viz-legend text-cosmos-muted">
          ZERO RUNTIME SERVER LATENCY
        </span>
      </div>
    </div>
  );
}
