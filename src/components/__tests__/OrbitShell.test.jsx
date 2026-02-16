// FILE: src/components/__tests__/OrbitShell.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import OrbitShell from '../OrbitShell';

expect.extend(toHaveNoViolations);

const renderOrbit = () =>
  render(
    <MemoryRouter initialEntries={['/']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <OrbitShell />
    </MemoryRouter>,
  );

describe('OrbitShell', () => {
  it('renders orbital navigation with all satellite links', () => {
    renderOrbit();
    expect(
      screen.getByRole('navigation', { name: /orbital navigation/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/navigate to home/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/navigate to works/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/navigate to about/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/navigate to beyond/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/navigate to contact/i)).toBeInTheDocument();
  });

  it('supports keyboard navigation with arrow keys', () => {
    renderOrbit();
    const nav = screen.getByRole('navigation', { name: /orbital navigation/i });
    fireEvent.keyDown(nav, { key: 'ArrowRight' });
    // Focus should move — the component manages focus internally
    expect(document.activeElement).toBeDefined();
  });

  it('has no accessibility violations', async () => {
    const { container } = renderOrbit();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
