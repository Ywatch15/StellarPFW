// FILE: src/components/StellarOrnaments.jsx
// Rare environmental cosmic events (shooting stars), subtle stellar wind,
// and qualitative telemetry indicator for Sundram's Stellar Verse.
import React, { useState, useEffect, useRef } from 'react';
import useDeviceCapability from '../hooks/useDeviceCapability';

export default function StellarOrnaments() {
  const { prefersReducedMotion, isMobile } = useDeviceCapability();
  const [shootingStar, setShootingStar] = useState(null);
  const timerRef = useRef(null);

  // Rare shooting star scheduling (1 every 20–35s) — Change 16
  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    let isCancelled = false;

    const scheduleNextStar = () => {
      // Random interval between 20000ms and 35000ms
      const delay = Math.floor(20000 + Math.random() * 15000);
      timerRef.current = setTimeout(() => {
        if (isCancelled) return;
        // Generate start position and trajectory angle
        const top = Math.floor(5 + Math.random() * 40); // 5% to 45% of viewport
        const left = Math.floor(5 + Math.random() * 50); // 5% to 55% of viewport
        const angle = -30 - Math.random() * 20; // -30deg to -50deg
        const id = Date.now();

        setShootingStar({ id, top: `${top}%`, left: `${left}%`, angle: `${angle}deg` });

        // Remove streak after animation completes (1.4s)
        setTimeout(() => {
          if (!isCancelled) {
            setShootingStar(null);
            scheduleNextStar();
          }
        }, 1500);
      }, delay);
    };

    scheduleNextStar();

    return () => {
      isCancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Rare shooting star streak */}
      {shootingStar && (
        <div
          key={shootingStar.id}
          className="shooting-star-streak w-28 sm:w-44"
          style={{
            top: shootingStar.top,
            left: shootingStar.left,
            '--angle': shootingStar.angle,
          }}
        />
      )}

      {/* Subtle Stellar Wind (low density: 4 particles max, disabled on mobile) — Change 25 */}
      {!isMobile && !prefersReducedMotion && (
        <div className="absolute inset-0">
          {[
            {
              id: 1,
              top: '48%',
              left: '50%',
              tx: '90px',
              ty: '-90px',
              dur: '7s',
              delay: '0s',
              size: '2px',
            },
            {
              id: 2,
              top: '51%',
              left: '49%',
              tx: '-100px',
              ty: '80px',
              dur: '8.5s',
              delay: '2.5s',
              size: '1.5px',
            },
            {
              id: 3,
              top: '50%',
              left: '52%',
              tx: '110px',
              ty: '70px',
              dur: '9s',
              delay: '4s',
              size: '2.5px',
            },
            {
              id: 4,
              top: '49%',
              left: '48%',
              tx: '-80px',
              ty: '-110px',
              dur: '7.5s',
              delay: '1.2s',
              size: '1.5px',
            },
          ].map((p) => (
            <span
              key={p.id}
              className="stellar-wind-particle"
              style={{
                top: p.top,
                left: p.left,
                width: p.size,
                height: p.size,
                '--tx': p.tx,
                '--ty': p.ty,
                '--duration': p.dur,
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
