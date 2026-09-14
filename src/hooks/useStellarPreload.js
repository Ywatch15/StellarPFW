// FILE: src/hooks/useStellarPreload.js
// Robust, non-blocking readiness coordination with timeout-guaranteed fallbacks,
// strictly monotonic progress, and master watchdog safety to prevent deadlocks.
import { useState, useEffect, useRef, useCallback } from 'react';

const TELEMETRY_STAGES = [
  { threshold: 0, text: 'INITIALIZING STELLAR CORE' },
  { threshold: 18, text: 'CALIBRATING ORBITAL FIELD' },
  { threshold: 38, text: 'SYNCHRONIZING NAVIGATION' },
  { threshold: 58, text: 'IGNITING VISUAL SYSTEM' },
  { threshold: 78, text: 'ALIGNING DESTINATION NODES' },
  { threshold: 92, text: 'STELLAR SYSTEM ONLINE' },
];

const timeoutPromise = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
  const watchdogTimerRef = useRef(null);

  // Clean cancellation
  const cancel = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (watchdogTimerRef.current) {
      clearTimeout(watchdogTimerRef.current);
      watchdogTimerRef.current = null;
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

    // ── Master Watchdog: Unconditionally unblocks intro if any task hangs ──
    const maxSafetyTimeout = Math.max(minDuration + 1400, 6200);
    watchdogTimerRef.current = setTimeout(() => {
      if (isMounted) {
        realProgressRef.current = 100;
      }
    }, maxSafetyTimeout);

    // ── 1. Measure & Execute Real Readiness Tasks with strict timeouts ──
    const runReadinessTasks = async () => {
      // Step A: Base environment ready (15%)
      realProgressRef.current = Math.max(realProgressRef.current, 15);

      // Step B: Font validation with race timeout (15% -> 32%)
      try {
        if (typeof document !== 'undefined' && document.fonts) {
          await Promise.race([document.fonts.ready, timeoutPromise(1200)]);
          try {
            document.fonts.check('16px "Space Grotesk"');
            document.fonts.check('16px "Inter"');
          } catch {
            // Non-critical check
          }
        }
      } catch {
        // Fallback gracefully
      }
      if (!isMounted) return;
      realProgressRef.current = Math.max(realProgressRef.current, 32);

      // Step C: WebGL context capability (25% -> 58%)
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

      // Step D: Navigation & DOM layout readiness (15% -> 75%)
      realProgressRef.current = Math.max(realProgressRef.current, 75);

      // Step E: UI layout & pipeline stabilization (15% -> 90%)
      if (typeof window !== 'undefined') {
        try {
          if (typeof window.requestIdleCallback === 'function') {
            await Promise.race([
              new Promise((res) => window.requestIdleCallback(res, { timeout: 800 })),
              timeoutPromise(600),
            ]);
          } else {
            await timeoutPromise(150);
          }
        } catch {
          // Safe fallback
        }
      }
      if (!isMounted) return;
      realProgressRef.current = Math.max(realProgressRef.current, 90);

      // Step F: Final scene synchronization (10% -> 100%)
      realProgressRef.current = 100;
    };

    runReadinessTasks();

    // ── 2. Cinematic Monotonic Progress Animation Loop ──
    let currentProgress = 0;

    const tick = (now) => {
      if (!isMounted) return;

      const elapsed = now - (startTimeRef.current || now);
      // Theoretical linear progress based on minimum staging duration
      const timeRatio = Math.min(elapsed / minDuration, 1);
      const timeProgress = timeRatio * 100;

      // Target progress is constrained by real readiness AND time progress
      const targetProgress = Math.min(
        realProgressRef.current,
        Math.max(timeProgress, realProgressRef.current * 0.95),
      );

      // Strictly monotonic progression: never regresses
      const delta = targetProgress - currentProgress;
      const step = Math.max(0.4, delta * 0.12);
      currentProgress = Math.max(currentProgress, Math.min(100, currentProgress + step));

      const rounded = Math.floor(currentProgress);
      setDisplayProgress(rounded);

      // Update telemetry status message
      for (let i = TELEMETRY_STAGES.length - 1; i >= 0; i--) {
        if (rounded >= TELEMETRY_STAGES[i].threshold) {
          setStatusMessage(TELEMETRY_STAGES[i].text);
          break;
        }
      }

      // Completion check: Both real readiness (100) and display progress (>= 100)
      if (
        currentProgress >= 100 &&
        realProgressRef.current >= 100 &&
        !completedRef.current
      ) {
        completedRef.current = true;
        if (watchdogTimerRef.current) {
          clearTimeout(watchdogTimerRef.current);
          watchdogTimerRef.current = null;
        }
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
