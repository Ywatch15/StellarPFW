// FILE: src/components/cinematic/__tests__/useCinematicTimeline.test.jsx
import React, { useRef } from 'react';
import { render, screen } from '@testing-library/react';
import useCinematicTimeline from '../useCinematicTimeline';

function TestComponent({ enabled = true }) {
  const containerRef = useRef(null);
  const { isFallback, isReady } = useCinematicTimeline(
    (self, gsap) => {
      gsap.to('.target', { opacity: 1 });
    },
    containerRef,
    [],
    { enabled },
  );

  return (
    <div ref={containerRef} data-testid="container">
      <div className="target">Target</div>
      <span data-testid="status">{isReady ? (isFallback ? 'fallback' : 'ready') : 'loading'}</span>
    </div>
  );
}

describe('useCinematicTimeline', () => {
  it('initializes cleanly in test environment', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('status')).toBeInTheDocument();
  });

  it('handles fallback when disabled', () => {
    render(<TestComponent enabled={false} />);
    expect(screen.getByTestId('status')).toHaveTextContent('fallback');
  });
});
