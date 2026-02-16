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
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let tier = 'medium';
    if (cores >= 8 && !isMobile) tier = 'high';
    else if (cores < 4 || isMobile) tier = 'low';

    setCapability({ tier, isMobile, prefersReducedMotion });
  }, []);

  return capability;
}
