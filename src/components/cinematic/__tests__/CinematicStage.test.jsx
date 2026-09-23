// FILE: src/components/cinematic/__tests__/CinematicStage.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import CinematicStage from '../CinematicStage';

describe('CinematicStage', () => {
  it('renders with accessible landmark and attributes', () => {
    render(
      <CinematicStage id="test-stage" aria-label="Test Stage">
        <div>Stage Content</div>
      </CinematicStage>,
    );

    const section = screen.getByRole('region', { name: 'Test Stage' });
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'test-stage');
    expect(section).toHaveClass('cinematic-stage');
  });

  it('supports render-prop pattern passing visibility parameters', () => {
    render(
      <CinematicStage id="render-prop-stage" aria-label="Render Prop Stage">
        {({ visibilityState }) => (
          <div data-testid="status">State: {visibilityState}</div>
        )}
      </CinematicStage>,
    );

    expect(screen.getByTestId('status')).toBeInTheDocument();
  });
});
