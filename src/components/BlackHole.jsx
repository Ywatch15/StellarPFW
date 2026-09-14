// FILE: src/components/BlackHole.jsx
// Pure CSS + SVG animated black hole with accretion disk, photon ring, and particle swirl
// No WebGL — works on every device
import React, { useEffect, useRef, useState } from 'react';
import useVisibilityState from '../hooks/useVisibilityState';

const PARTICLE_COUNT = 40;

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
  const shellRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef(generateParticles(PARTICLE_COUNT));
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const { ref: containerRef, isActive } = useVisibilityState({
    nearMargin: '300px 0px',
    threshold: 0.05,
  });

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  // Particle animation loop on a 2D canvas: only runs when ACTIVE in viewport and tab is visible
  useEffect(() => {
    if (!isActive || prefersReducedMotion) {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
      return undefined;
    }

    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    let running = true;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      if (!running) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
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
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(
          cx + Math.cos(rad) * (p.radius + 8),
          cy + Math.sin(rad) * (p.radius + 3),
        );
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = 0.16 * Math.min(p.radius / 80, 1);
        ctx.lineWidth = 0.7;
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      running = false;
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
      window.removeEventListener('resize', resize);
    };
  }, [isActive, prefersReducedMotion]);

  // Interactive gravitational warp on mouse move via direct DOM transform (no 60fps React state re-renders)
  const handleMouseMove = (e) => {
    if (!interactive || !shellRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    shellRef.current.style.transform = `perspective(600px) rotateX(${y * 0.3}deg) rotateY(${x * 0.3}deg)`;
  };

  const handleMouseLeave = () => {
    if (shellRef.current) {
      shellRef.current.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
    }
  };

  return (
    <div
      ref={containerRef}
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
        ref={shellRef}
        className="black-hole-shell relative z-10 flex items-center justify-center"
        style={{
          transform: 'perspective(600px) rotateX(0deg) rotateY(0deg)',
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
            <filter id="bh-wide-glow" x="-40%" y="-120%" width="180%" height="340%">
              <feGaussianBlur stdDeviation="9" />
            </filter>
          </defs>

          {/* Outer glow halo */}
          <circle cx="200" cy="200" r="180" fill="url(#bh-photon)" opacity="0.6">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 200"
              to="360 200 200"
              dur="52s"
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
              dur="52s"
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
              dur="40s"
              repeatCount="indefinite"
            />
          </ellipse>

          {/* Evenly spread luminous rings around the dark horizon */}
          <ellipse
            className="black-hole-yellow-ring"
            cx="200"
            cy="200"
            rx="132"
            ry="42"
            fill="none"
            stroke="#facc15"
            strokeWidth="11"
            opacity="0.34"
            filter="url(#bh-wide-glow)"
          />
          <ellipse
            className="black-hole-yellow-ring"
            cx="200"
            cy="200"
            rx="132"
            ry="42"
            fill="none"
            stroke="#facc15"
            strokeWidth="2.5"
            opacity="0.98"
          />
          <ellipse
            className="black-hole-blue-ring"
            cx="200"
            cy="200"
            rx="158"
            ry="54"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="9"
            opacity="0.28"
            filter="url(#bh-wide-glow)"
          />
          <ellipse
            className="black-hole-blue-ring"
            cx="200"
            cy="200"
            rx="158"
            ry="54"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.8"
            opacity="0.95"
          />

          {/* Singularity (the black center) */}
          <circle
            cx="200"
            cy="200"
            r="55"
            fill="#000000"
            stroke="#000000"
            strokeWidth="3"
          />

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
        <div className="pointer-events-auto absolute inset-0 z-20">{children}</div>
      )}
    </div>
  );
}
