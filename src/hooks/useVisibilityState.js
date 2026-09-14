// FILE: src/hooks/useVisibilityState.js
// Section-level animation lifecycle hook: SUSPENDED -> PREPARE -> ACTIVE -> SUSPENDED
// Pauses expensive loops when far outside viewport or when browser tab is hidden.
import { useState, useEffect, useRef } from 'react';
import usePageVisibility from './usePageVisibility';

/**
 * @typedef {'SUSPENDED' | 'PREPARE' | 'ACTIVE'} VisibilityState
 *
 * @param {Object} [options]
 * @param {string} [options.nearMargin='300px 0px'] - Activation zone margin to prepare resources
 * @param {string} [options.visibleMargin='0px'] - Viewport boundary margin for active rendering
 * @param {number} [options.threshold=0.05] - Intersection threshold for active state
 * @param {boolean} [options.alwaysActive=false] - If true, stays active while page is visible (e.g. Home hero)
 * @returns {{
 *   ref: React.RefObject<any>,
 *   state: VisibilityState,
 *   isActive: boolean,
 *   isVisible: boolean,
 *   isNearViewport: boolean
 * }}
 */
export default function useVisibilityState(options = {}) {
  const {
    nearMargin = '300px 0px',
    visibleMargin = '0px',
    threshold = 0.05,
    alwaysActive = false,
  } = options;

  const ref = useRef(null);
  const isPageVisible = usePageVisibility();

  const [inNearZone, setInNearZone] = useState(alwaysActive);
  const [inViewport, setInViewport] = useState(alwaysActive);

  useEffect(() => {
    if (alwaysActive) {
      setInNearZone(true);
      setInViewport(true);
      return undefined;
    }

    if (typeof IntersectionObserver === 'undefined') {
      // Fallback for environments without IntersectionObserver (e.g. ancient browsers)
      setInNearZone(true);
      setInViewport(true);
      return undefined;
    }

    const node = ref.current;
    if (!node) {
      return undefined;
    }

    // 1. Near observer for PREPARE zone (~300px margin)
    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        setInNearZone(entry.isIntersecting);
      },
      { rootMargin: nearMargin, threshold: 0 },
    );

    // 2. Visible observer for ACTIVE zone (actual viewport)
    const visibleObserver = new IntersectionObserver(
      ([entry]) => {
        setInViewport(entry.isIntersecting);
      },
      { rootMargin: visibleMargin, threshold },
    );

    nearObserver.observe(node);
    visibleObserver.observe(node);

    return () => {
      nearObserver.disconnect();
      visibleObserver.disconnect();
    };
  }, [alwaysActive, nearMargin, visibleMargin, threshold]);

  // Derive composite lifecycle state
  let state = 'SUSPENDED';
  if (isPageVisible) {
    if (inViewport) {
      state = 'ACTIVE';
    } else if (inNearZone) {
      state = 'PREPARE';
    }
  }

  const isActive = state === 'ACTIVE';
  const isVisible = inViewport && isPageVisible;
  const isNearViewport = (inNearZone || inViewport) && isPageVisible;

  return {
    ref,
    state,
    isActive,
    isVisible,
    isNearViewport,
  };
}
