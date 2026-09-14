// FILE: src/hooks/useDeviceCapability.js
// Detects device capability for conditional 3D quality
import { useState, useEffect } from 'react';

/**
 * @typedef {'high' | 'medium' | 'low'} Tier
 * @returns {{ tier: Tier, isMobile: boolean, prefersReducedMotion: boolean }}
 */
export default function useDeviceCapability() {
  const [capability, setCapability] = useState(() => {
    if (typeof window === 'undefined') {
      return {
        tier: 'medium',
        isMobile: false,
        prefersReducedMotion: false,
        isTouchPrimary: false,
      };
    }
    const hasTouch = navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
    const supportsHover =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(hover: hover)').matches
        : true;
    const isMobile =
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (hasTouch && !supportsHover);
    const prefersReducedMotion =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;
    const isTouchPrimary =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(pointer: coarse)').matches
        : hasTouch && !supportsHover;

    const cores = navigator.hardwareConcurrency || 2;
    let tier = 'medium';
    if (cores >= 8 && !isMobile && !isTouchPrimary) tier = 'high';
    else if (cores < 4 || isMobile || isTouchPrimary) tier = 'low';

    return { tier, isMobile, prefersReducedMotion, isTouchPrimary };
  });

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 2;
    const hasTouch = navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
    const supportsHover =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(hover: hover)').matches
        : true;
    const isMobile =
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (hasTouch && !supportsHover);
    const prefersReducedMotion =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;
    const isTouchPrimary =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(pointer: coarse)').matches
        : hasTouch && !supportsHover;

    let tier = 'medium';
    if (cores >= 8 && !isMobile && !isTouchPrimary) tier = 'high';
    else if (cores < 4 || isMobile || isTouchPrimary) tier = 'low';

    setCapability({ tier, isMobile, prefersReducedMotion, isTouchPrimary });
  }, []);

  return capability;
}
