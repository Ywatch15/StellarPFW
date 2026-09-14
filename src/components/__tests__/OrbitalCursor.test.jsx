// FILE: src/components/__tests__/OrbitalCursor.test.jsx
import React from 'react';
import { render } from '@testing-library/react';
import OrbitalCursor from '../OrbitalCursor';
import * as useDeviceCapabilityModule from '../../hooks/useDeviceCapability';

describe('OrbitalCursor', () => {
  it('does not render canvas or attach cursor listeners on touch-primary devices', () => {
    jest.spyOn(useDeviceCapabilityModule, 'default').mockReturnValue({
      tier: 'low',
      isMobile: false,
      prefersReducedMotion: false,
      isTouchPrimary: true,
    });

    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const { container } = render(<OrbitalCursor />);

    expect(container.firstChild).toBeNull();
    expect(addEventListenerSpy).not.toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(document.body.style.cursor).not.toBe('none');

    addEventListenerSpy.mockRestore();
    jest.restoreAllMocks();
  });

  it('renders canvas on desktop non-touch devices', () => {
    jest.spyOn(useDeviceCapabilityModule, 'default').mockReturnValue({
      tier: 'high',
      isMobile: false,
      prefersReducedMotion: false,
      isTouchPrimary: false,
    });

    const { container } = render(<OrbitalCursor />);
    expect(container.querySelector('canvas')).toBeInTheDocument();

    jest.restoreAllMocks();
  });
});
