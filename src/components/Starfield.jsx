// FILE: src/components/Starfield.jsx
// Parallax starfield background (CSS-only, mouse-reactive layers via JS)
// Falls back to a static gradient background when JS is disabled
import React, { useEffect, useRef } from 'react';
import useDeviceCapability from '../hooks/useDeviceCapability';

const STAR_LAYERS = [
  { count: 40, speed: 0.2, size: 1, opacity: 0.4 },
  { count: 25, speed: 0.6, size: 1.5, opacity: 0.6 },
  { count: 12, speed: 1.2, size: 2, opacity: 0.8 },
];

function generateStars(count) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));
}

export default function Starfield() {
  const { isMobile, prefersReducedMotion, isTouchPrimary } = useDeviceCapability();
  const layers = useRef(
    STAR_LAYERS.map((layer) => ({
      ...layer,
      stars: generateStars(layer.count),
    })),
  );

  const containerRef = useRef(null);
  const layerRefs = useRef([]);
  const frameRef = useRef(0);
  const pointerRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (isMobile || prefersReducedMotion || isTouchPrimary) return undefined;

    const update = () => {
      frameRef.current = 0;
      const { x, y } = pointerRef.current;
      layerRefs.current.forEach((layer, index) => {
        if (!layer) return;
        const depth = STAR_LAYERS[index].speed;
        const amount = depth * 10;
        layer.style.transform = `translate3d(${((x - 0.5) * amount).toFixed(2)}px, ${((y - 0.5) * amount).toFixed(2)}px, 0)`;
      });
    };

    const handlePointerMove = (event) => {
      pointerRef.current.x = event.clientX / window.innerWidth;
      pointerRef.current.y = event.clientY / window.innerHeight;
      if (!frameRef.current) frameRef.current = window.requestAnimationFrame(update);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    };
  }, [isMobile, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
      aria-hidden="true"
    >
      {/* Static gradient fallback */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-nebula/50 to-void" />

      {/* Star layers */}
      {layers.current.map((layer, li) => (
        <svg
          key={li}
          ref={(node) => {
            layerRefs.current[li] = node;
          }}
          className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {layer.stars.map((star, si) => (
            <circle
              key={si}
              cx={star.x}
              cy={star.y}
              r={layer.size * 0.06}
              fill="#e0e6ff"
              opacity={layer.opacity}
            />
          ))}
        </svg>
      ))}
    </div>
  );
}
