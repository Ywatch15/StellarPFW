// FILE: src/components/AboutParticles.jsx
// Subtle floating particles background for the About page — pure CSS animated dots
import { useMemo } from 'react';

export default function AboutParticles() {
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 30; i++) {
      arr.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 2.5,
        duration: 12 + Math.random() * 20,
        delay: Math.random() * -20,
        opacity: 0.1 + Math.random() * 0.2,
      });
    }
    return arr;
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-comet/30"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `aboutFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes aboutFloat {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.1; }
          25% { transform: translateY(-30px) translateX(10px); opacity: 0.25; }
          50% { transform: translateY(-15px) translateX(-8px); opacity: 0.15; }
          75% { transform: translateY(-40px) translateX(5px); opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}
