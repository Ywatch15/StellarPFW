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

  it('renders story cards for TentDesk, CommandAtlas, and Bank Transaction System with verified technical details', () => {
    render(
      <MemoryRouter>
        <Works />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 3, name: /TentDesk/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /CommandAtlas/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Bank Transaction System/i })).toBeInTheDocument();
    expect(screen.getByText(/366 commands across 21 canonical topics/i)).toBeInTheDocument();
    expect(screen.getByText(/atomic double-entry bookkeeping/i)).toBeInTheDocument();
    expect(screen.getByText(/GRAVITATIONAL TRANSITION · SINGULARITY CORRIDOR → FINANCIAL DETERMINISM/i)).toBeInTheDocument();
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
});
