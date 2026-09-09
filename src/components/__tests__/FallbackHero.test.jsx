// FILE: src/components/__tests__/FallbackHero.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import FallbackHero from '../FallbackHero';

expect.extend(toHaveNoViolations);

describe('FallbackHero', () => {
  it('renders headline and CTA', () => {
    render(<FallbackHero />);
    expect(screen.getByText('Stellar')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('View Resume')).toBeInTheDocument();
    expect(screen.getByText('Contact Me')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<FallbackHero />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
