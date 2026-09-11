// FILE: src/hooks/useDeviceCapability.js
// Detects device capability for conditional 3D quality
import { useState, useEffect } from 'react';

/**
 * @typedef {'high' | 'medium' | 'low'} Tier
 * @returns {{ tier: Tier, isMobile: boolean, prefersReducedMotion: boolean }}
 */
export default function useDeviceCapability() {
  const [capability, setCapability] = useState({
    tier: 'medium',
    isMobile: false,
    prefersReducedMotion: false,
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

    let tier = 'medium';
    if (cores >= 8 && !isMobile) tier = 'high';
    else if (cores < 4 || isMobile) tier = 'low';

    setCapability({ tier, isMobile, prefersReducedMotion });
  }, []);

  return capability;
}
