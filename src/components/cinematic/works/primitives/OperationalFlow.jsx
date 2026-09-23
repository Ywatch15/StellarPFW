// FILE: src/components/cinematic/works/primitives/OperationalFlow.jsx
// Open spatial storytelling primitive for TentDesk business operations workflow.
// Zero card boxes; floating hairline nodes and connected operational relationships.
import React from 'react';

export default function OperationalFlow({ containerRef }) {
  const steps = [
    { label: 'INVENTORY', desc: 'Active tent & hardware stock tracking', status: 'LIVE' },
    { label: 'RENTALS', desc: 'Booking schedules & customer orders', status: 'ACTIVE' },
    { label: 'EVENTS', desc: 'On-site installation & logistics', status: 'FIELD' },
    { label: 'RETURNS', desc: 'Inspection, damage logging & restock', status: 'CYCLE' },
    { label: 'INVENTORY STATE', desc: 'Live reconciled operational ledger', status: 'SYNC' },
  ];

  const supporting = ['CUSTOMERS', 'PAYMENTS', 'WAGES'];

  return (
    <div ref={containerRef} className="spatial-story-beat spatial-story-beat--operations">
      <div className="spatial-coordinate-eyebrow text-[#38bdf8]">
        <span>BUSINESS WORKFLOW · SYSTEM LOOP</span>
      </div>
      <h3 className="spatial-beat-title text-stardust">
        The Operational <span className="text-[#38bdf8]">Core</span>
      </h3>
      <p className="spatial-beat-sub">
        Beyond a simple database, the system orchestrates the complete physical rental lifecycle.
      </p>

      {/* Progressive Workflow Chain */}
      <div className="spatial-flow-chain mt-6">
        {steps.map((step, idx) => (
          <div key={step.label} className="spatial-flow-step">
            <div className="spatial-flow-node">
              <span className="spatial-node-dot" />
              <div className="spatial-node-content">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold tracking-wider text-stardust">
                    {step.label}
                  </span>
                  <span className="font-mono text-[0.6rem] text-[#38bdf8]/80 px-1.5 py-0.5 rounded border border-[#38bdf8]/30 bg-[#38bdf8]/10">
                    {step.status}
                  </span>
                </div>
                <span className="text-xs text-cosmos-muted font-sans mt-0.5 block">
                  {step.desc}
                </span>
              </div>
            </div>
            {idx < steps.length - 1 && (
              <div className="spatial-flow-connector" aria-hidden="true">
                <svg className="w-4 h-6 text-[#38bdf8]/60" viewBox="0 0 16 24" fill="none">
                  <path d="M8 0V20M8 20L4 16M8 20L12 16" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Parallel Supporting Operational Vectors */}
      <div className="spatial-supporting-row mt-5">
        <span className="text-[0.65rem] font-mono tracking-widest text-cosmos-muted block mb-2">
          PARALLEL OPERATIONAL VECTORS:
        </span>
        <div className="flex flex-wrap gap-2">
          {supporting.map((item) => (
            <span key={item} className="spatial-pill text-[#38bdf8]">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
