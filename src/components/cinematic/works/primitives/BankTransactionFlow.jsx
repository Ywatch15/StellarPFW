// FILE: src/components/cinematic/works/primitives/BankTransactionFlow.jsx
// Full-Stack Banking Application & Real-Time Fund Transfer Engine.
// Visual Flow: ACCOUNT A -> ACID TRANSACTION -> DOUBLE-ENTRY LEDGER -> ACCOUNT B
import React, { forwardRef } from 'react';

const BankTransactionFlow = forwardRef(function BankTransactionFlow(
  _props,
  ref,
) {
  return (
    <div
      ref={ref}
      className="spatial-story-beat spatial-story-beat--flow"
      aria-label="BankSys Transaction Engine Flow"
    >
      <div className="spatial-coordinate-eyebrow text-[#f59e0b]">
        <span>TRANSACTION ENGINE · ACID ATOMICITY &amp; DOUBLE-ENTRY LEDGER</span>
      </div>

      {/* 4-Node Connected Atomic Flow */}
      <div className="spatial-pipeline-stream mt-3">
        {/* Node 1: Account A */}
        <div className="spatial-pipeline-node">
          <div className="spatial-pipeline-node-badge text-[#f59e0b]">01</div>
          <div className="spatial-pipeline-node-info">
            <h5 className="spatial-pipeline-node-title">ACCOUNT A</h5>
            <p className="spatial-pipeline-node-desc">Authenticated sender debit with balance lock</p>
          </div>
        </div>

        {/* Connector */}
        <div className="spatial-pipeline-arrow" aria-hidden="true">
          <span className="text-[#f59e0b]/70">→</span>
        </div>

        {/* Node 2: ACID Commit */}
        <div className="spatial-pipeline-node">
          <div className="spatial-pipeline-node-badge text-[#38bdf8]">02</div>
          <div className="spatial-pipeline-node-info">
            <h5 className="spatial-pipeline-node-title">ACID TRANSACTION</h5>
            <p className="spatial-pipeline-node-desc">MongoDB atomic session with rollback protection</p>
          </div>
        </div>

        {/* Connector */}
        <div className="spatial-pipeline-arrow" aria-hidden="true">
          <span className="text-[#38bdf8]/70">→</span>
        </div>

        {/* Node 3: Double-Entry Ledger */}
        <div className="spatial-pipeline-node">
          <div className="spatial-pipeline-node-badge text-[#10b981]">03</div>
          <div className="spatial-pipeline-node-info">
            <h5 className="spatial-pipeline-node-title">DOUBLE-ENTRY LEDGER</h5>
            <p className="spatial-pipeline-node-desc">Balanced debit &amp; credit journal entries</p>
          </div>
        </div>

        {/* Connector */}
        <div className="spatial-pipeline-arrow" aria-hidden="true">
          <span className="text-[#10b981]/70">→</span>
        </div>

        {/* Node 4: Account B */}
        <div className="spatial-pipeline-node spatial-pipeline-node--terminal">
          <div className="spatial-pipeline-node-badge text-[#10b981]">04</div>
          <div className="spatial-pipeline-node-info">
            <h5 className="spatial-pipeline-node-title">ACCOUNT B</h5>
            <p className="spatial-pipeline-node-desc">Recipient credit settlement &amp; notification</p>
          </div>
        </div>
      </div>

      {/* Security & Scale Anchors */}
      <div className="flex flex-wrap items-center gap-2 mt-4 pt-1">
        <span className="spatial-pill text-[#f59e0b] border-[#f59e0b]/30">JWT AUTH</span>
        <span className="spatial-pill text-[#f59e0b] border-[#f59e0b]/30">BCRYPT</span>
        <span className="spatial-pill text-[#f59e0b] border-[#f59e0b]/30">RATE LIMITING</span>
        <span className="spatial-pill text-cosmos-muted">MULTI-ACCOUNT SUPPORT</span>
        <span className="spatial-pill text-cosmos-muted">CSV EXPORT</span>
      </div>
    </div>
  );
});

export default BankTransactionFlow;
