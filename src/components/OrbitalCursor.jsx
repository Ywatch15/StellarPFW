// FILE: src/components/OrbitalCursor.jsx
// Custom cursor with spring easing that follows the mouse
// Falls back to system cursor on touch devices / reduced-motion
import React, { useEffect, useState } from 'react';
import useInertialPointer from '../hooks/useInertialPointer';
import useDeviceCapability from '../hooks/useDeviceCapability';

export default function OrbitalCursor() {
  const { isMobile, prefersReducedMotion } = useDeviceCapability();
  const { x, y } = useInertialPointer({ damping: 0.12, stiffness: 0.08 });
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    // Show custom cursor only on desktop with pointer
    if (isMobile || prefersReducedMotion) return;

    const show = () => setVisible(true);
    const hide = () => setVisible(false);
    const down = () => setClicking(true);
    const up = () => setClicking(false);

    document.addEventListener('mouseenter', show);
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mousedown', down);
    document.addEventListener('mouseup', up);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mouseenter', show);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mousedown', down);
      document.removeEventListener('mouseup', up);
      document.body.style.cursor = '';
    };
  }, [isMobile, prefersReducedMotion]);

  if (isMobile || prefersReducedMotion || !visible) return null;

  // Convert normalized coords (-1 to 1) back to screen pixels
  const screenX = ((x + 1) / 2) * window.innerWidth;
  const screenY = ((y + 1) / 2) * window.innerHeight;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      {/* Outer ring */}
      <div
        className="absolute rounded-full border-2 border-comet transition-transform duration-100"
        style={{
          width: clicking ? 30 : 40,
          height: clicking ? 30 : 40,
          opacity: 0.85,
          transform: `translate(${screenX - (clicking ? 15 : 20)}px, ${screenY - (clicking ? 15 : 20)}px)`,
        }}
      />
      {/* Inner dot */}
      <div
        className="absolute rounded-full bg-comet transition-transform duration-75"
        style={{
          width: clicking ? 8 : 6,
          height: clicking ? 8 : 6,
          opacity: 1,
          transform: `translate(${screenX - (clicking ? 4 : 3)}px, ${screenY - (clicking ? 4 : 3)}px)`,
        }}
      />
    </div>
  );
}
