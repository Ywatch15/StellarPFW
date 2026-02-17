// FILE: src/components/Starfield.jsx
// Parallax starfield background (CSS-only, mouse-reactive layers via JS)
// Falls back to a static gradient background when JS is disabled
import React, { useRef, useCallback } from 'react';

const STAR_LAYERS = [
  { count: 40, speed: 0.015, size: 1, opacity: 0.4 },
  { count: 25, speed: 0.025, size: 1.5, opacity: 0.6 },
  { count: 12, speed: 0.04, size: 2, opacity: 0.8 },
];

function generateStars(count) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));
}

export default function Starfield() {
  const layers = useRef(
    STAR_LAYERS.map((layer) => ({
      ...layer,
      stars: generateStars(layer.count),
    })),
  );

  const containerRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const svgs = containerRef.current.querySelectorAll('[data-parallax]');
    svgs.forEach((svg) => {
      const speed = parseFloat(svg.dataset.parallax);
      svg.style.transform = `translate(${x * speed * 40}px, ${y * speed * 40}px)`;
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
      onMouseMove={handleMouseMove}
      aria-hidden="true"
    >
      {/* Static gradient fallback */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-nebula/50 to-void" />

      {/* Star layers */}
      {layers.current.map((layer, li) => (
        <svg
          key={li}
          data-parallax={layer.speed}
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
