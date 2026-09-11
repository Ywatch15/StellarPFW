// FILE: src/hooks/useStellarPreload.js
// Orchestrates weighted real readiness: fonts, critical styles, WebGL detection,
// opportunistic route prefetching, and smooth cinematic lerp progression.
import { useState, useEffect, useRef, useCallback } from 'react';

const TELEMETRY_STAGES = [
  { threshold: 0, text: 'INITIALIZING STELLAR CORE' },
  { threshold: 18, text: 'CALIBRATING ORBITAL FIELD' },
  { threshold: 38, text: 'SYNCHRONIZING NAVIGATION' },
  { threshold: 58, text: 'IGNITING VISUAL SYSTEM' },
  { threshold: 78, text: 'ALIGNING DESTINATION NODES' },
  { threshold: 92, text: 'STELLAR SYSTEM ONLINE' },
];

export default function useStellarPreload({
  enabled = true,
  minDuration = 4800,
  onComplete,
} = {}) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState(TELEMETRY_STAGES[0].text);
  const [isReady, setIsReady] = useState(false);

  const realProgressRef = useRef(0);
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(null);
  const completedRef = useRef(false);

  // Clean cancellation
  const cancel = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      setDisplayProgress(100);
      setIsReady(true);
      return undefined;
    }

    let isMounted = true;
    completedRef.current = false;
    startTimeRef.current = performance.now();

    // ── 1. Measure & Execute Real Readiness Tasks ──
    const runReadinessTasks = async () => {
      // Step A: Base environment ready (15%)
      realProgressRef.current = Math.max(realProgressRef.current, 15);

      // Step B: Font validation (15% -> 30%)
      try {
        if (document.fonts) {
          await document.fonts.ready;
          // Verify actual font faces to prevent FOUT
          document.fonts.check('16px "Space Grotesk"');
          document.fonts.check('16px "Inter"');
        }
      } catch {
        // Fallback gracefully
      }
      if (!isMounted) return;
      realProgressRef.current = Math.max(realProgressRef.current, 32);

      // Step C: WebGL context capability (25% -> 57%)
      try {
        if (typeof navigator !== 'undefined' && !navigator.userAgent.includes('jsdom')) {
          const testCanvas = document.createElement('canvas');
          if (typeof testCanvas.getContext === 'function') {
            const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
            if (gl) {
              const ext = gl.getExtension('WEBGL_lose_context');
              if (ext) ext.loseContext();
            }
          }
        }
      } catch {
        // Safe fallback
      }
      if (!isMounted) return;
      realProgressRef.current = Math.max(realProgressRef.current, 58);

      // Step D: Navigation & DOM layout readiness (15% -> 73%)
      realProgressRef.current = Math.max(realProgressRef.current, 75);

      // Step E: Opportunistic route prefetch in background (15% -> 88%)
      // High priority: Works. Low priority: About, Beyond, Contact
      const prefetchRoutes = async () => {
        try {
          // Preload Works module
          const worksPromise = import('../pages/Works').catch(() => null);
          // Non-blocking opportunistic prefetch of other routes via idle callback
          if (typeof window.requestIdleCallback === 'function') {
            window.requestIdleCallback(
              () => {
                import('../pages/About').catch(() => null);
                import('../pages/Beyond').catch(() => null);
                import('../pages/Contact').catch(() => null);
              },
              { timeout: 2000 },
            );
          } else {
            setTimeout(() => {
              import('../pages/About').catch(() => null);
              import('../pages/Beyond').catch(() => null);
              import('../pages/Contact').catch(() => null);
            }, 100);
          }
          await worksPromise;
        } catch {
          // Non-critical: failure must never block Home
        }
      };

      await prefetchRoutes();
      if (!isMounted) return;
      realProgressRef.current = Math.max(realProgressRef.current, 90);

      // Step F: Final scene synchronization (10% -> 100%)
      realProgressRef.current = 100;
    };

    runReadinessTasks();

    // ── 2. Cinematic Smooth Lerp Animation Loop ──
    let currentProgress = 0;

    const tick = (now) => {
      if (!isMounted) return;

      const elapsed = now - (startTimeRef.current || now);
      // Theoretical linear progress based on minimum staging duration
      const timeRatio = Math.min(elapsed / minDuration, 1);
      // Pacing ease curve
      const timeProgress = timeRatio * 100;

      // Actual display target is constrained by real readiness AND time progress
      // Ensures the progress never outpaces reality nor halts artificially
      const targetProgress = Math.min(
        realProgressRef.current,
        Math.max(timeProgress, realProgressRef.current * 0.95),
      );

      // Smooth lerp toward target
      const delta = targetProgress - currentProgress;
      const step = Math.max(0.4, delta * 0.12);
      currentProgress = Math.min(100, currentProgress + step);

      const rounded = Math.floor(currentProgress);
      setDisplayProgress(rounded);

      // Update telemetry status message
      for (let i = TELEMETRY_STAGES.length - 1; i >= 0; i--) {
        if (rounded >= TELEMETRY_STAGES[i].threshold) {
          setStatusMessage(TELEMETRY_STAGES[i].text);
          break;
        }
      }

      // Completion check: Both real readiness (100) and display lerp (>= 100)
      if (
        currentProgress >= 100 &&
        realProgressRef.current >= 100 &&
        !completedRef.current
      ) {
        completedRef.current = true;
        setDisplayProgress(100);
        setIsReady(true);
        if (onComplete) onComplete();
        return;
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      isMounted = false;
      cancel();
    };
  }, [enabled, minDuration, onComplete, cancel]);

  return {
    displayProgress,
    statusMessage,
    isReady,
    cancel,
  };
}
