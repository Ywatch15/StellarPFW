// FILE: src/components/AudioEngine.jsx
// Subtle UI audio cues — muted by default, opt-in via toggle
// Uses Web Audio API oscillators (no audio files needed); falls back silently
import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

const AudioCtx = createContext({
  enabled: false,
  toggle: () => {},
  playHover: () => {},
  playClick: () => {},
  playTransition: () => {},
});

export function useAudio() {
  return useContext(AudioCtx);
}

/**
 * Play a single oscillator tone — entirely synthetic, no files needed
 */
function playTone(ctx, frequency, duration = 0.12, volume = 0.08, type = 'sine') {
  if (!ctx || ctx.state === 'closed') return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Silently fail on browsers that block audio
  }
}

/** Play a short ascending chime (enable confirmation) */
function playEnableChime(ctx) {
  if (!ctx) return;
  playTone(ctx, 523, 0.12, 0.1, 'sine');       // C5
  setTimeout(() => playTone(ctx, 659, 0.12, 0.08, 'sine'), 100);  // E5
  setTimeout(() => playTone(ctx, 784, 0.18, 0.06, 'sine'), 200);  // G5
}

/** Play a short descending tone (disable confirmation) */
function playDisableChime(ctx) {
  if (!ctx) return;
  playTone(ctx, 784, 0.1, 0.06, 'sine');       // G5
  setTimeout(() => playTone(ctx, 523, 0.15, 0.04, 'sine'), 80);   // C5
}

export function AudioProvider({ children }) {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef(null);

  // Lazy-init Web Audio context (must happen during a user gesture)
  const ensureCtx = useCallback(() => {
    if (!ctxRef.current && typeof window !== 'undefined') {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) {
        ctxRef.current = new AC();
      }
    }
    const ctx = ctxRef.current;
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }
    return ctx;
  }, []);

  const toggle = useCallback(() => {
    const ctx = ensureCtx();
    setEnabled((prev) => {
      const next = !prev;
      // Immediate audible feedback so user knows it works
      if (ctx) {
        if (next) playEnableChime(ctx);
        else playDisableChime(ctx);
      }
      return next;
    });
  }, [ensureCtx]);

  const playHover = useCallback(() => {
    if (!enabled) return;
    playTone(ensureCtx(), 880, 0.06, 0.04, 'sine');
  }, [enabled, ensureCtx]);

  const playClick = useCallback(() => {
    if (!enabled) return;
    playTone(ensureCtx(), 660, 0.1, 0.07, 'triangle');
  }, [enabled, ensureCtx]);

  const playTransition = useCallback(() => {
    if (!enabled) return;
    const ctx = ensureCtx();
    playTone(ctx, 440, 0.15, 0.05, 'sine');
    setTimeout(() => playTone(ctx, 660, 0.15, 0.04, 'sine'), 80);
  }, [enabled, ensureCtx]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (ctxRef.current && ctxRef.current.state !== 'closed') {
        ctxRef.current.close();
      }
    };
  }, []);

  return (
    <AudioCtx.Provider value={{ enabled, toggle, playHover, playClick, playTransition }}>
      {children}
    </AudioCtx.Provider>
  );
}

/** Audio toggle button */
export function AudioToggle() {
  const { enabled, toggle } = useAudio();

  return (
    <button
      onClick={toggle}
      className="fixed bottom-4 right-4 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-nebula text-sm text-cosmos-muted transition-colors hover:border-aurora hover:text-aurora sm:h-10 sm:w-10"
      aria-label={enabled ? 'Disable sound effects' : 'Enable sound effects'}
      title={enabled ? 'Sound on' : 'Sound off'}
    >
      {enabled ? '🔊' : '🔇'}
    </button>
  );
}
