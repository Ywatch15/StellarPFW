// FILE: src/components/BlackHole.jsx
// Pure CSS + SVG animated black hole with accretion disk, photon ring, and particle swirl
// No WebGL — works on every device
import React, { useEffect, useRef, useState } from 'react';

const PARTICLE_COUNT = 60;

function generateParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: Math.random() * 360,
    radius: 120 + Math.random() * 180,
    size: 1 + Math.random() * 2.5,
    speed: 0.15 + Math.random() * 0.4,
    opacity: 0.3 + Math.random() * 0.5,
    color: ['#6c63ff', '#38bdf8', '#facc15', '#f43f5e', '#a78bfa', '#22d3ee'][
      Math.floor(Math.random() * 6)
    ],
  }));
}

export default function BlackHole({ children, interactive = true }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef(generateParticles(PARTICLE_COUNT));
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Particle animation loop on a 2D canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let running = true;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * Math.min(window.devicePixelRatio, 2);
      canvas.height = rect.height * Math.min(window.devicePixelRatio, 2);
      ctx.scale(
        Math.min(window.devicePixelRatio, 2),
        Math.min(window.devicePixelRatio, 2),
      );
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      if (!running) return;
      const w = canvas.width / Math.min(window.devicePixelRatio, 2);
      const h = canvas.height / Math.min(window.devicePixelRatio, 2);
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      particlesRef.current.forEach((p) => {
        // Spiral inward slowly
        p.angle += p.speed;
        p.radius -= 0.015 * p.speed;

        // Reset particle when it reaches the singularity
        if (p.radius < 20) {
          p.radius = 120 + Math.random() * 180;
          p.angle = Math.random() * 360;
        }

        const rad = (p.angle * Math.PI) / 180;
        // Elliptical orbit for 3D illusion
        const x = cx + Math.cos(rad) * p.radius * 1.1;
        const y = cy + Math.sin(rad) * p.radius * 0.45;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * Math.min(p.radius / 80, 1);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Interactive gravitational warp on mouse move
  const handleMouseMove = (e) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => setMouseOffset({ x: 0, y: 0 });

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ minHeight: 500 }}
    >
      {/* Particle canvas behind everything */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      {/* SVG black hole core */}
      <div
        className="relative z-10 flex items-center justify-center"
        style={{
          transform: `perspective(600px) rotateX(${mouseOffset.y * 0.3}deg) rotateY(${mouseOffset.x * 0.3}deg)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <svg
          viewBox="0 0 400 400"
          className="h-[300px] w-[300px] sm:h-[400px] sm:w-[400px]"
          aria-label="Animated black hole"
        >
          <defs>
            {/* Accretion disk gradient */}
            <radialGradient id="bh-accretion" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0" />
              <stop offset="30%" stopColor="#f43f5e" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#facc15" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#6c63ff" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#6c63ff" stopOpacity="0" />
            </radialGradient>

            {/* Photon ring glow */}
            <radialGradient id="bh-photon" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="transparent" />
              <stop offset="80%" stopColor="#38bdf8" stopOpacity="0.3" />
              <stop offset="90%" stopColor="#6c63ff" stopOpacity="0.15" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            {/* Singularity center */}
            <radialGradient id="bh-singularity" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000" />
              <stop offset="70%" stopColor="#050816" />
              <stop offset="100%" stopColor="#050816" stopOpacity="0" />
            </radialGradient>

            {/* Spin filter for the accretion disk */}
            <filter id="bh-blur">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* Outer glow halo */}
          <circle cx="200" cy="200" r="180" fill="url(#bh-photon)" opacity="0.6">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 200"
              to="360 200 200"
              dur="30s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Accretion disk — elliptical to look 3D */}
          <ellipse
            cx="200"
            cy="200"
            rx="160"
            ry="50"
            fill="none"
            stroke="url(#bh-accretion)"
            strokeWidth="28"
            filter="url(#bh-blur)"
            opacity="0.9"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 200"
              to="360 200 200"
              dur="12s"
              repeatCount="indefinite"
            />
          </ellipse>

          {/* Inner hot ring */}
          <ellipse
            cx="200"
            cy="200"
            rx="90"
            ry="28"
            fill="none"
            stroke="#facc15"
            strokeWidth="2"
            opacity="0.5"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 200"
              to="-360 200 200"
              dur="8s"
              repeatCount="indefinite"
            />
          </ellipse>

          {/* Singularity (the black center) */}
          <circle cx="200" cy="200" r="55" fill="url(#bh-singularity)" />

          {/* Event horizon ring */}
          <circle
            cx="200"
            cy="200"
            r="58"
            fill="none"
            stroke="#6c63ff"
            strokeWidth="1.5"
            opacity="0.4"
          >
            <animate
              attributeName="r"
              values="56;60;56"
              dur="4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.4;0.7;0.4"
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Gravitational lensing arcs */}
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <path
              key={angle}
              d="M200,200 Q230,140 260,200"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.5"
              opacity="0.2"
              transform={`rotate(${angle} 200 200)`}
            >
              <animate
                attributeName="opacity"
                values="0.1;0.3;0.1"
                dur={`${3 + (angle % 3)}s`}
                repeatCount="indefinite"
              />
            </path>
          ))}
        </svg>
      </div>

      {/* Content overlay (children render around the black hole) */}
      {children && (
        <div className="pointer-events-auto absolute inset-0 z-20">
          {children}
        </div>
      )}
    </div>
  );
}
