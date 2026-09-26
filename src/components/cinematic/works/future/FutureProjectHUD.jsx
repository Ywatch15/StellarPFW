// FILE: src/components/cinematic/works/future/FutureProjectHUD.jsx
// Spatial Telemetry & Atmospheric HUD Overlay for Future Project Loading Sequence
// Strict Rules:
// - Zero cards, zero SaaS boxes
// - No generic percentage spinners or progress bars
// - Atmospheric, tiny monospace technical telemetry
// - Mobile: sparse single-signal hierarchy with ample negative space

import React from 'react';
import { FUTURE_PROJECT_SIGNALS } from './futureProjectsData';

export default function FutureProjectHUD({ progress, isMobile }) {
  // Determine current active telemetry narrative based on scroll progress
  let activePhase = 'EXPANSION';
  let activeSignal = null;

  if (progress < 0.15) {
    activePhase = 'EXPANSION';
  } else if (progress < 0.35) {
    activePhase = 'SIGNAL_01';
    activeSignal = FUTURE_PROJECT_SIGNALS[0];
  } else if (progress < 0.52) {
    activePhase = 'SIGNAL_02';
    activeSignal = FUTURE_PROJECT_SIGNALS[1];
  } else if (progress < 0.68) {
    activePhase = 'SIGNAL_03';
    activeSignal = FUTURE_PROJECT_SIGNALS[2];
  } else if (progress < 0.82) {
    activePhase = 'SIGNAL_04';
    activeSignal = FUTURE_PROJECT_SIGNALS[3];
  } else {
    activePhase = 'RESERVOIR';
    activeSignal = FUTURE_PROJECT_SIGNALS[4];
  }

  return (
    <div className="future-hud-overlay pointer-events-none absolute inset-0 z-20 flex flex-col justify-between pt-20 pb-6 px-6 md:p-12">
      {/* ── TOP SECTION: Sector Header & Coordinates ── */}
      <div className="flex flex-col items-start gap-1">
        <div className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-[0.6rem] md:text-[0.68rem] tracking-[0.24em] uppercase text-cyan-400/90">
            SYSTEM DISCOVERY BUS · DEEP SCAN ACTIVE
          </span>
        </div>
        <p className="font-mono text-[0.55rem] md:text-[0.6rem] tracking-[0.16em] uppercase text-cosmos-muted/60">
          SECTOR 0x7E → UNMAPPED CELESTIAL VECTORS
        </p>
      </div>

      {/* ── MIDDLE / SPATIAL FOCUS: Active Signal Telemetry (Single Element At A Time) ── */}
      <div className="my-auto flex flex-col items-center md:items-start text-center md:text-left transition-all duration-500 max-w-lg">
        {activePhase === 'EXPANSION' && (
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-indigo-400">
              KNOWLEDGE NETWORK STABILIZED
            </span>
            <h4 className="text-xl md:text-2xl font-light tracking-wide text-white">
              Sector Expansion in Progress
            </h4>
            <p className="font-mono text-[0.65rem] md:text-xs text-cosmos-muted tracking-wider">
              Deep space scanners operational. Preparing future destinations.
            </p>
          </div>
        )}

        {activeSignal && activePhase !== 'EXPANSION' && activePhase !== 'RESERVOIR' && (
          <div className="flex flex-col gap-1.5 md:gap-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: activeSignal.beaconColor }}
              />
              <span
                className="font-mono text-xs md:text-sm tracking-[0.22em] uppercase font-semibold"
                style={{ color: activeSignal.beaconColor }}
              >
                {activeSignal.callsign}
              </span>
            </div>
            <h4 className="text-lg md:text-2xl font-light tracking-wider text-white uppercase">
              {activeSignal.label}
            </h4>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
              <span className="font-mono text-[0.65rem] md:text-xs tracking-[0.25em] text-white/80 bg-white/5 border border-white/10 px-2.5 py-1 rounded">
                STATUS: {activeSignal.statusText}
              </span>
            </div>
          </div>
        )}

        {activePhase === 'RESERVOIR' && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs md:text-sm tracking-[0.22em] uppercase text-emerald-400 font-semibold">
                SECTOR RESERVOIR STABILIZED
              </span>
            </div>
            <h4 className="text-xl md:text-2xl font-light tracking-wide text-white">
              Multiple Future Worlds In Standby
            </h4>
            <p className="font-mono text-[0.65rem] md:text-xs text-cosmos-muted tracking-wider">
              5 unidentified project signals actively synchronizing across deep space.
            </p>
          </div>
        )}
      </div>

      {/* ── BOTTOM SECTION: Discrete Subtle Spatial Indicators ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/5">
        <div className="flex items-center gap-3">
          {FUTURE_PROJECT_SIGNALS.map((sig, idx) => {
            const isDiscovered = progress >= sig.timing.detect;
            return (
              <div
                key={sig.id}
                className="flex items-center gap-1.5"
                title={`${sig.label} - ${isDiscovered ? sig.statusText : 'UNDETECTED'}`}
              >
                <span
                  className="h-1 w-4 md:w-6 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: isDiscovered ? sig.beaconColor : 'rgba(255, 255, 255, 0.1)',
                    boxShadow: isDiscovered ? `0 0 8px ${sig.beaconColor}` : 'none',
                  }}
                />
              </div>
            );
          })}
        </div>

        <div className="font-mono text-[0.6rem] md:text-[0.65rem] tracking-[0.2em] uppercase text-cosmos-muted/80">
          CONTINUUM EXPANDING · STANDBY
        </div>
      </div>
    </div>
  );
}
