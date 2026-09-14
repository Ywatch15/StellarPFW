// FILE: src/hooks/__tests__/useDeviceCapability.test.jsx
import { renderHook } from '@testing-library/react';
import useDeviceCapability from '../useDeviceCapability';

describe('useDeviceCapability', () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('detects touch primary devices with (pointer: coarse)', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(pointer: coarse)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { result } = renderHook(() => useDeviceCapability());
    expect(result.current.isTouchPrimary).toBe(true);
    expect(result.current.tier).toBe('low');
  });

  it('detects desktop non-touch mouse devices', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(hover: hover)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { result } = renderHook(() => useDeviceCapability());
    expect(result.current.isTouchPrimary).toBe(false);
  });
});
