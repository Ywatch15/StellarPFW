// FILE: src/components/__tests__/Navbar.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import Navbar from '../Navbar';

expect.extend(toHaveNoViolations);

describe('Navbar', () => {
  const renderNav = () =>
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Navbar />
      </MemoryRouter>,
    );

  it('renders all navigation links', () => {
    renderNav();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Works')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Beyond')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('has navigation role and aria-label', () => {
    renderNav();
    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(nav).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = renderNav();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
