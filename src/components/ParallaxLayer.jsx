// FILE: src/components/ParallaxLayer.jsx
// Pointer-reactive parallax layer wrapper
// Uses the inertial pointer hook for smooth movement
import React from 'react';
import useInertialPointer from '../hooks/useInertialPointer';

/**
 * @param {{ children: React.ReactNode, intensity?: number, className?: string }} props
 */
export default function ParallaxLayer({ children, intensity = 20, className = '' }) {
  const { x, y } = useInertialPointer();

  return (
    <div
      className={`will-change-transform ${className}`}
      style={{
        transform: `translate(${x * intensity}px, ${y * intensity}px)`,
        transition: 'transform 0.1s ease-out',
      }}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
