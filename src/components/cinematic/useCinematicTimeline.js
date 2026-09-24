// FILE: src/components/cinematic/useCinematicTimeline.js
// Custom React hook for scoped GSAP ScrollTrigger timelines.
// Ensures strict scoped cleanup (never global kill) and integrates with useVisibilityState.
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useDeviceCapability from '../../hooks/useDeviceCapability';

// Register plugin once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook to build and lifecycle-manage a scoped GSAP ScrollTrigger timeline.
 *
 * @param {Function} buildTimeline - Callback receiving (context, gsap, ScrollTrigger) to construct tweens/timelines
 * @param {React.RefObject} scopeRef - Container ref scoping all selector queries and trigger elements
 * @param {Array} [deps=[]] - Dependency array for timeline rebuilds
 * @param {Object} [options={}] - Additional lifecycle options
 * @param {'SUSPENDED' | 'PREPARE' | 'ACTIVE'} [options.visibilityState='ACTIVE'] - Section lifecycle state
 * @param {boolean} [options.enabled=true] - Master toggle for cinematic animation
 * @returns {{ isFallback: boolean, isReady: boolean, contextRef: React.MutableRefObject }}
 */
export default function useCinematicTimeline(
  buildTimeline,
  scopeRef,
  deps = [],
  options = {},
) {
  const { visibilityState = 'ACTIVE', enabled = true } = options;
  const { prefersReducedMotion } = useDeviceCapability();

  const [isFallback, setIsFallback] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const contextRef = useRef(null);

  // 1. Build and manage scoped GSAP timeline
  useEffect(() => {
    // If running in SSR or reduced motion, fallback immediately
    if (typeof window === 'undefined' || prefersReducedMotion || !enabled) {
      setIsFallback(true);
      setIsReady(true);
      return undefined;
    }

    const scope = scopeRef?.current;
    if (!scope) {
      return undefined;
    }

    let ctx = null;
    try {
      // Scoped GSAP context: any ScrollTrigger or tween created inside is tracked by ctx
      ctx = gsap.context((self) => {
        if (typeof buildTimeline === 'function') {
          buildTimeline(self, gsap, ScrollTrigger);
        }
      }, scope);

      contextRef.current = ctx;
      setIsFallback(false);
      setIsReady(true);
    } catch (err) {
      console.warn('[CinematicTimeline] Initialization fallback triggered:', err);
      setIsFallback(true);
      setIsReady(true);
    }

    // 2. Debounced structural resize listener (controlled refresh)
    let resizeTimer = null;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (contextRef.current) {
          ScrollTrigger.refresh();
        }
      }, 250);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Ensure ScrollTrigger measures positions accurately after DOM settles
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    // 3. Scoped cleanup: revert ONLY this context's animations
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
      clearTimeout(refreshTimer);

      if (ctx) {
        ctx.revert(); // Reverts DOM inline styles and kills only this context's triggers
        contextRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion, enabled, ...deps]);

  return { isFallback, isReady, contextRef };
}
