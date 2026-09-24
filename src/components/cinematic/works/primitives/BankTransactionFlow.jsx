// FILE: src/components/cinematic/works/primitives/BankTransactionFlow.jsx
// Full-Stack Banking Application & Real-Time Fund Transfer Engine.
// Open Spatial Diagrammatic Flow: Account A -> REST API -> ACID Transaction -> Double-Entry Ledger -> Account B
import React, { forwardRef } from 'react';

const BankTransactionFlow = forwardRef(function BankTransactionFlow(
  { trackRef, flowStepRefs },
  ref,
) {
  return (
    <div
      ref={ref}
      className="spatial-story-beat spatial-story-beat--flow"
      aria-label="Bank Transaction Engine Architecture"
    >
      <div className="spatial-coordinate-eyebrow text-[#f59e0b]">
        <span>TRANSACTION ENGINE · ACID GUARANTEES &amp; DOUBLE-ENTRY LEDGER</span>
      </div>

      {/* Desktop Layout: Horizontal/Vertical Diagrammatic Continuum Flow */}
      <div className="hidden md:block spatial-flow-diagram mt-4">
        {/* Node 1: Account A */}
        <div className="spatial-flow-node">
          <div className="spatial-node-header">
            <span className="spatial-status-dot spatial-status-dot--amber" />
            <span className="spatial-node-badge text-[#f59e0b]">ORIGIN</span>
            <span className="spatial-node-title">Account A (Sender)</span>
          </div>
          <p className="spatial-node-desc">
            Authenticated account debit request with client-side balance validation and multi-account balance lock.
          </p>
        </div>

        {/* Connector */}
        <div className="spatial-flow-connector" aria-hidden="true">
          <div className="spatial-flow-line">
            <div className="spatial-flow-pulse spatial-flow-pulse--amber" />
          </div>
          <span className="spatial-connector-label">SECURE REST API (EXPRESS + JWT AUTH)</span>
        </div>

        {/* Node 2: ACID Pipeline */}
        <div className="spatial-flow-node spatial-flow-node--server">
          <div className="spatial-node-header">
            <span className="spatial-status-dot spatial-status-dot--amber" />
            <span className="spatial-node-badge text-[#38bdf8]">CORE ENGINE</span>
            <span className="spatial-node-title">MongoDB ACID Transaction</span>
          </div>
          <p className="spatial-node-desc">
            Atomic two-phase session commit ensuring zero balance drift and strict rollback on any step failure.
          </p>
        </div>

        {/* Connector */}
        <div className="spatial-flow-connector" aria-hidden="true">
          <div className="spatial-flow-line">
            <div className="spatial-flow-pulse spatial-flow-pulse--amber" />
          </div>
          <span className="spatial-connector-label">IMMUTABLE AUDIT LOGGING</span>
        </div>

        {/* Node 3: Double-Entry Ledger & Account B */}
        <div className="spatial-flow-node">
          <div className="spatial-node-header">
            <span className="spatial-status-dot spatial-status-dot--amber" />
            <span className="spatial-node-badge text-[#10b981]">SETTLEMENT</span>
            <span className="spatial-node-title">Double-Entry Ledger → Account B</span>
          </div>
          <p className="spatial-node-desc">
            Simultaneous debit/credit entries recorded with transaction ID, cryptographic checksum, and recipient notification.
          </p>
        </div>
      </div>

      {/* Mobile Layout: Open Sequential Flow (Zero Cards, Zero Overflow Clipping) */}
      <div className="block md:hidden spatial-banksys-mobile-container mt-3">
        <div className="spatial-banksys-mobile-step">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-xs font-bold text-[#f59e0b] tracking-wider">01 · ORIGIN</span>
            <span className="font-mono text-[0.6rem] text-cosmos-muted/80">ACCOUNT A</span>
          </div>
          <h5 className="font-sans text-sm font-semibold text-white tracking-wide">
            Sender Account Debit Request
          </h5>
          <p className="font-sans text-xs text-cosmos-muted/90 mt-1 leading-relaxed">
            Authenticated fund transfer initiated via rate-limited Express REST API with JWT verification.
          </p>
        </div>

        <div className="text-center py-1 text-cosmos-muted/50 text-xs" aria-hidden="true">
          ↓ <span className="font-mono text-[0.55rem] tracking-widest text-[#f59e0b]/80 uppercase">ACID Session</span>
        </div>

        <div className="spatial-banksys-mobile-step spatial-banksys-mobile-step--core">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-xs font-bold text-[#38bdf8] tracking-wider">02 · EXECUTION</span>
            <span className="font-mono text-[0.6rem] text-[#38bdf8]">MONGODB TRANSACTION</span>
          </div>
          <h5 className="font-sans text-sm font-semibold text-white tracking-wide">
            Atomic Multi-Document Commit
          </h5>
          <p className="font-sans text-xs text-cosmos-muted/90 mt-1 leading-relaxed">
            Strict transactional session guarantees all-or-nothing execution under concurrent user load.
          </p>
        </div>

        <div className="text-center py-1 text-cosmos-muted/50 text-xs" aria-hidden="true">
          ↓ <span className="font-mono text-[0.55rem] tracking-widest text-[#10b981]/80 uppercase">Settlement</span>
        </div>

        <div className="spatial-banksys-mobile-step">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-xs font-bold text-[#10b981] tracking-wider">03 · LEDGER</span>
            <span className="font-mono text-[0.6rem] text-[#10b981]">ACCOUNT B (RECIPIENT)</span>
          </div>
          <h5 className="font-sans text-sm font-semibold text-white tracking-wide">
            Double-Entry Credit Settlement
          </h5>
          <p className="font-sans text-xs text-cosmos-muted/90 mt-1 leading-relaxed">
            Immutable balanced journal entries recorded with instant Nodemailer transfer confirmation.
          </p>
        </div>
      </div>
    </div>
  );
});

export default BankTransactionFlow;
