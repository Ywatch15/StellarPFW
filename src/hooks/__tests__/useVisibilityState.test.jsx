// FILE: src/hooks/__tests__/useVisibilityState.test.jsx
import React from 'react';
import { render, renderHook, act } from '@testing-library/react';
import usePageVisibility from '../usePageVisibility';
import useVisibilityState from '../useVisibilityState';

describe('usePageVisibility', () => {
  const originalVisibilityState = Object.getOwnPropertyDescriptor(
    Document.prototype,
    'visibilityState',
  );

  afterEach(() => {
    if (originalVisibilityState) {
      Object.defineProperty(Document.prototype, 'visibilityState', originalVisibilityState);
    }
  });

  it('reports true when document is visible', () => {
    Object.defineProperty(Document.prototype, 'visibilityState', {
      configurable: true,
      get: () => 'visible',
    });
    const { result } = renderHook(() => usePageVisibility());
    expect(result.current).toBe(true);
  });

  it('updates when document visibility changes to hidden and back to visible', () => {
    let currentVisibility = 'visible';
    Object.defineProperty(Document.prototype, 'visibilityState', {
      configurable: true,
      get: () => currentVisibility,
    });

    const { result } = renderHook(() => usePageVisibility());
    expect(result.current).toBe(true);

    // Tab hidden
    act(() => {
      currentVisibility = 'hidden';
      document.dispatchEvent(new Event('visibilitychange'));
    });
    expect(result.current).toBe(false);

    // Tab visible again
    act(() => {
      currentVisibility = 'visible';
      document.dispatchEvent(new Event('visibilitychange'));
    });
    expect(result.current).toBe(true);
  });
});

describe('useVisibilityState', () => {
  let observers = [];

  class MockIntersectionObserver {
    constructor(callback, options) {
      this.callback = callback;
      this.options = options;
      this.elements = [];
      observers.push(this);
    }
    observe(element) {
      this.elements.push(element);
    }
    unobserve(element) {
      this.elements = this.elements.filter((el) => el !== element);
    }
    disconnect() {
      this.elements = [];
      observers = observers.filter((obs) => obs !== this);
    }
    trigger(isIntersecting) {
      this.callback([{ isIntersecting, target: this.elements[0] }]);
    }
  }

  beforeEach(() => {
    observers = [];
    window.IntersectionObserver = MockIntersectionObserver;
    Object.defineProperty(Document.prototype, 'visibilityState', {
      configurable: true,
      get: () => 'visible',
    });
  });

  afterEach(() => {
    delete window.IntersectionObserver;
  });

  it('progresses from SUSPENDED -> PREPARE -> ACTIVE -> SUSPENDED', () => {
    let hookResult;
    function TestComponent() {
      hookResult = useVisibilityState();
      return <div ref={hookResult.ref} />;
    }

    render(<TestComponent />);

    expect(hookResult.state).toBe('SUSPENDED');
    expect(hookResult.isActive).toBe(false);

    // Near observer triggers (PREPARE zone)
    const nearObserver = observers.find((obs) => obs.options?.rootMargin === '300px 0px');
    const visibleObserver = observers.find((obs) => obs.options?.rootMargin === '0px');

    act(() => {
      nearObserver?.trigger(true);
    });
    expect(hookResult.state).toBe('PREPARE');
    expect(hookResult.isActive).toBe(false);

    // Viewport observer triggers (ACTIVE zone)
    act(() => {
      visibleObserver?.trigger(true);
    });
    expect(hookResult.state).toBe('ACTIVE');
    expect(hookResult.isActive).toBe(true);

    // Leaves viewport back into near zone
    act(() => {
      visibleObserver?.trigger(false);
    });
    expect(hookResult.state).toBe('PREPARE');
    expect(hookResult.isActive).toBe(false);

    // Leaves near zone completely
    act(() => {
      nearObserver?.trigger(false);
    });
    expect(hookResult.state).toBe('SUSPENDED');
    expect(hookResult.isActive).toBe(false);
  });

  it('suspends active section immediately when browser tab becomes hidden', () => {
    let currentVisibility = 'visible';
    Object.defineProperty(Document.prototype, 'visibilityState', {
      configurable: true,
      get: () => currentVisibility,
    });

    let hookResult;
    function TestComponent() {
      hookResult = useVisibilityState();
      return <div ref={hookResult.ref} />;
    }

    render(<TestComponent />);
    const visibleObserver = observers.find((obs) => obs.options?.rootMargin === '0px');

    act(() => {
      visibleObserver?.trigger(true);
    });
    expect(hookResult.state).toBe('ACTIVE');
    expect(hookResult.isActive).toBe(true);

    // Hide tab
    act(() => {
      currentVisibility = 'hidden';
      document.dispatchEvent(new Event('visibilitychange'));
    });
    expect(hookResult.state).toBe('SUSPENDED');
    expect(hookResult.isActive).toBe(false);

    // Restore tab
    act(() => {
      currentVisibility = 'visible';
      document.dispatchEvent(new Event('visibilitychange'));
    });
    expect(hookResult.state).toBe('ACTIVE');
    expect(hookResult.isActive).toBe(true);
  });

  it('alwaysActive respects tab visibility (visible -> active, hidden tab -> suspended)', () => {
    let currentVisibility = 'visible';
    Object.defineProperty(Document.prototype, 'visibilityState', {
      configurable: true,
      get: () => currentVisibility,
    });

    const { result } = renderHook(() => useVisibilityState({ alwaysActive: true }));
    expect(result.current.state).toBe('ACTIVE');
    expect(result.current.isActive).toBe(true);

    // Hide tab
    act(() => {
      currentVisibility = 'hidden';
      document.dispatchEvent(new Event('visibilitychange'));
    });
    expect(result.current.state).toBe('SUSPENDED');
    expect(result.current.isActive).toBe(false);

    // Show tab
    act(() => {
      currentVisibility = 'visible';
      document.dispatchEvent(new Event('visibilitychange'));
    });
    expect(result.current.state).toBe('ACTIVE');
    expect(result.current.isActive).toBe(true);
  });
});
