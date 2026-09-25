// FILE: src/pages/__tests__/WorksCinematic.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Works from '../Works';

describe('Works Page — Planetary Hero + Cinematic Stories', () => {
  it('renders the original Planetary System hero intact at the top', () => {
    render(
      <MemoryRouter>
        <Works />
      </MemoryRouter>,
    );

    // Planetary System hero remains the primary h1
    expect(screen.getByRole('heading', { level: 1, name: /Planetary System/i })).toBeInTheDocument();
    expect(screen.getByText(/Click a planet to explore/i)).toBeInTheDocument();
  });

  it('renders the cinematic stories section below with What I Built heading', () => {
    render(
      <MemoryRouter>
        <Works />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 2, name: /What I Built/i })).toBeInTheDocument();
    expect(screen.getByText(/TENTDESK · PRODUCTION SAAS/i)).toBeInTheDocument();
  });

  it('renders story cards for TentDesk, CommandAtlas, BankSys, AlgoVista, and DevGraph with verified technical details', () => {
    render(
      <MemoryRouter>
        <Works />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 3, name: /TentDesk/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /CommandAtlas/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /^BankSys$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /^AlgoVista$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /^DevGraph$/i })).toBeInTheDocument();
    expect(screen.getByText(/366 commands across 21 canonical topics/i)).toBeInTheDocument();
    expect(screen.getByText(/atomic double-entry bookkeeping/i)).toBeInTheDocument();
    expect(screen.getByText(/GRAVITATIONAL TRANSITION · SINGULARITY CORRIDOR → FINANCIAL DETERMINISM/i)).toBeInTheDocument();
    expect(screen.getByText(/DEEP SPACE CORRIDOR · AUTONOMOUS EXPLORATION → ALGORITHM SIMULATION/i)).toBeInTheDocument();
    expect(screen.getByText(/CONSTELLATION FORMATION · ALGORITHM EXPLORATION → KNOWLEDGE MEMORY/i)).toBeInTheDocument();
    expect(screen.getAllByText(/200\+ ALGORITHMS/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/4 CLIENT ROUTES · ZERO BACKEND/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Developer knowledge management for capturing, searching, and connecting technical notes\./i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Turn scattered debugging knowledge into a connected technical memory\./i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/7 NOTE CATEGORIES/i).length).toBeGreaterThan(0);
  });

  it('does not render redundant CommandAtlas deep dive section at the bottom', () => {
    render(
      <MemoryRouter>
        <Works />
      </MemoryRouter>,
    );

    expect(screen.queryByText(/Why Offline-First Command Retrieval\?/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Deterministic Scope/i)).not.toBeInTheDocument();
  });

  it('renders all dedicated mobile sequential sub-states for TentDesk, CommandAtlas, BankSys, AlgoVista, and DevGraph', () => {
    render(
      <MemoryRouter>
        <Works />
      </MemoryRouter>,
    );

    // TentDesk mobile sequential sub-states
    expect(screen.getByText(/OPERATIONAL RENTAL PLATFORM/i)).toBeInTheDocument();
    expect(screen.getByText(/PWA CLIENT MUTATIONS/i)).toBeInTheDocument();
    expect(screen.getByText(/NEXT\.JS & PRISMA ENGINE/i)).toBeInTheDocument();
    expect(screen.getByText(/REAL-TIME SSE EVENT STREAM/i)).toBeInTheDocument();
    expect(screen.getAllByText(/DEPLOYED ≠ USABLE/i).length).toBeGreaterThan(0);

    // CommandAtlas mobile sequential sub-states
    expect(screen.getAllByText(/OFFLINE-FIRST COMMAND REFERENCE/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/STATIC COMPACT PACKS/i)).toBeInTheDocument();
    expect(screen.getByText(/DEXIE INDEXEDDB \(CLIENT-SIDE\)/i)).toBeInTheDocument();
    expect(screen.getAllByText(/NO AI BY DESIGN/i).length).toBeGreaterThan(0);

    // BankSys mobile sequential sub-states
    expect(screen.getAllByText(/SECURE BANKING APPLICATION/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/ACCOUNT A → ACID TRANSACTION/i)).toBeInTheDocument();
    expect(screen.getByText(/DOUBLE-ENTRY LEDGER → ACCOUNT B/i)).toBeInTheDocument();
    expect(screen.getByText(/AUTHENTICATION & EXPORT/i)).toBeInTheDocument();

    // AlgoVista mobile sequential sub-states
    expect(screen.getAllByText(/ALGORITHM LEARNING PLATFORM/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/CONTROLLABLE PROCESSES/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/SORTING DYNAMICS/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/GRAPH EXPLORATION/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/QUERY RESOLUTION/i).length).toBeGreaterThan(0);

    // DevGraph mobile sequential sub-states
    expect(screen.getAllByText(/DEVELOPER KNOWLEDGE GRAPH/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/CONNECTED TECHNICAL MEMORY/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/HYBRID SEARCH ARCHITECTURE/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/7 CATEGORIES · USER-SCOPED/i).length).toBeGreaterThan(0);
  });
});
