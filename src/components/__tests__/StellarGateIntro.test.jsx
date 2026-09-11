import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import StellarGateIntro from '../StellarIntro/StellarGateIntro';

expect.extend(toHaveNoViolations);

describe('StellarGateIntro', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('renders initialization screen and telemetry brand', () => {
    const onEnterHome = jest.fn();
    const { unmount } = render(<StellarGateIntro onEnterHome={onEnterHome} />);

    expect(
      screen.getByRole('alert', { name: /initializing sundram's stellar verse/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/STELLAR_SUNDRAM/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /skip introduction/i }),
    ).toBeInTheDocument();
    unmount();
  });

  it('cleanly cancels and enters Home when Skip Intro is clicked', async () => {
    const onEnterHome = jest.fn();
    const { unmount } = render(<StellarGateIntro onEnterHome={onEnterHome} />);

    const skipButton = screen.getByRole('button', { name: /skip introduction/i });
    await act(async () => {
      fireEvent.click(skipButton);
    });

    expect(onEnterHome).toHaveBeenCalledWith({ immediate: true });
    expect(sessionStorage.getItem('stellar_verse_initialized')).toBe('true');
    unmount();
  });

  it('immediately hands off if session has already initialized the verse', () => {
    sessionStorage.setItem('stellar_verse_initialized', 'true');
    const onEnterHome = jest.fn();
    const { unmount } = render(<StellarGateIntro onEnterHome={onEnterHome} />);

    expect(onEnterHome).toHaveBeenCalledWith({ immediate: false, isReturning: true });
    unmount();
  });

  it('has no accessibility violations', async () => {
    const onEnterHome = jest.fn();
    const { unmount } = render(<StellarGateIntro onEnterHome={onEnterHome} />);
    const results = await axe(document.body);
    expect(results).toHaveNoViolations();
    unmount();
  });
});
