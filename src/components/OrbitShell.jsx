// FILE: src/components/OrbitShell.jsx
// Orbital navigation — central sun node with clickable satellite nav items
// Progressive enhancement: falls back to Navbar on non-WebGL / reduced-motion
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SATELLITES = [
  { path: '/', label: 'Home', icon: '☉', angle: 0, color: '#6c63ff' },
  { path: '/works', label: 'Works', icon: '◐', angle: 72, color: '#38bdf8' },
  { path: '/about', label: 'About', icon: '✦', angle: 144, color: '#facc15' },
  { path: '/beyond', label: 'Beyond', icon: '◌', angle: 216, color: '#a78bfa' },
  { path: '/contact', label: 'Contact', icon: '◈', angle: 288, color: '#f43f5e' },
];

const ORBIT_RADIUS = 130;
const CENTER = 170;

function getPosition(angleDeg, radius) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER + Math.cos(rad) * radius,
    y: CENTER + Math.sin(rad) * radius,
  };
}

export default function OrbitShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [focusedIdx, setFocusedIdx] = useState(-1);
  const containerRef = useRef(null);

  const handleNav = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate],
  );

  // Keyboard navigation for the orbit
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIdx((prev) => (prev + 1) % SATELLITES.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIdx((prev) => (prev - 1 + SATELLITES.length) % SATELLITES.length);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (focusedIdx >= 0) handleNav(SATELLITES[focusedIdx].path);
      }
    },
    [focusedIdx, handleNav],
  );

  // Focus management
  useEffect(() => {
    if (focusedIdx >= 0 && containerRef.current) {
      const btn = containerRef.current.querySelector(
        `[data-orbit-idx="${focusedIdx}"]`,
      );
      if (btn) btn.focus();
    }
  }, [focusedIdx]);

  return (
    <nav
      ref={containerRef}
      className="relative mx-auto hidden w-[380px] md:block"
      role="navigation"
      aria-label="Orbital navigation"
      onKeyDown={handleKeyDown}
    >
      <svg
        viewBox="0 0 340 340"
        className="h-auto w-full"
        role="presentation"
      >
        {/* Orbit ring */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={ORBIT_RADIUS}
          fill="none"
          stroke="#6c63ff"
          strokeWidth="0.5"
          strokeDasharray="4 4"
          opacity={0.3}
        />

        {/* Central sun */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={22}
          fill="url(#sunGradient)"
          className="cursor-pointer"
        />
        <text
          x={CENTER}
          y={CENTER + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#050816"
          fontSize="18"
          fontWeight="bold"
        >
          ☉
        </text>

        {/* Gradient definition */}
        <defs>
          <radialGradient id="sunGradient" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#f59e0b" />
          </radialGradient>
        </defs>

        {/* Satellite nodes */}
        {SATELLITES.map((sat, i) => {
          const { x, y } = getPosition(sat.angle, ORBIT_RADIUS);
          const isActive = location.pathname === sat.path;
          const isHovered = hoveredIdx === i;

          return (
            <g key={sat.path}>
              {/* Connection line from sun to satellite */}
              {(isHovered || isActive) && (
                <line
                  x1={CENTER}
                  y1={CENTER}
                  x2={x}
                  y2={y}
                  stroke={sat.color}
                  strokeWidth="0.8"
                  opacity={0.4}
                />
              )}

              {/* Satellite circle */}
              <circle
                cx={x}
                cy={y}
                r={isActive ? 28 : 24}
                fill={isActive ? sat.color + '33' : '#0a0f2c'}
                stroke={sat.color}
                strokeWidth={isActive ? 2.5 : 1.5}
                className="cursor-pointer transition-all"
                style={{ filter: isHovered ? `drop-shadow(0 0 6px ${sat.color})` : undefined }}
              />

              {/* Icon */}
              <text
                x={x}
                y={y - 3}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={sat.color}
                fontSize="18"
              >
                {sat.icon}
              </text>

              {/* Label */}
              <text
                x={x}
                y={y + 13}
                textAnchor="middle"
                fill="#e0e6ff"
                fontSize="10"
                fontFamily="Inter, sans-serif"
                fontWeight={isActive ? '700' : '500'}
              >
                {sat.label}
              </text>

              {/* Invisible clickable area (bigger hit target) */}
              <circle
                data-orbit-idx={i}
                cx={x}
                cy={y}
                r={30}
                fill="transparent"
                className="cursor-pointer outline-none"
                tabIndex={0}
                role="link"
                aria-label={`Navigate to ${sat.label}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => handleNav(sat.path)}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                onFocus={() => setFocusedIdx(i)}
              />
            </g>
          );
        })}
      </svg>
    </nav>
  );
}
