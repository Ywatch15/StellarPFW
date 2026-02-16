// FILE: src/hooks/useInertialPointer.js
// Tracks mouse position with spring-like inertia for smooth pointer effects
// Used by parallax layers and the orbital cursor
import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * @param {{ damping?: number, stiffness?: number }} options
 * @returns {{ x: number, y: number, targetX: number, targetY: number }}
 */
export default function useInertialPointer({ damping = 0.08, stiffness = 0.06 } = {}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  const handleMove = useCallback((e) => {
    // Normalize to -1..1
    target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMove, { passive: true });

    const animate = () => {
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;

      velocity.current.x += dx * stiffness;
      velocity.current.y += dy * stiffness;
      velocity.current.x *= 1 - damping;
      velocity.current.y *= 1 - damping;

      current.current.x += velocity.current.x;
      current.current.y += velocity.current.y;

      setPos({ x: current.current.x, y: current.current.y });
      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(raf.current);
    };
  }, [handleMove, damping, stiffness]);

  return {
    x: pos.x,
    y: pos.y,
    targetX: target.current.x,
    targetY: target.current.y,
  };
}
