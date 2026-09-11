// FILE: src/components/OrbitShell.jsx
// Orbital navigation — central sun node with clickable satellite nav items
import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SATELLITES = [
  { path: '/', label: 'Home', icon: '⌂', angle: 0, color: '#6c63ff' },
  { path: '/works', label: 'Works', icon: '⚒', angle: 72, color: '#38bdf8' },
  { path: '/about', label: 'About', icon: '☺', angle: 144, color: '#facc15' },
  { path: '/beyond', label: 'Beyond', icon: '∞', angle: 216, color: '#a78bfa' },
  { path: '/contact', label: 'Contact', icon: '✉', angle: 288, color: '#f43f5e' },
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
  const [activePulse, setActivePulse] = useState(false);
  const containerRef = useRef(null);

  // Opportunistic prefetch on hover/focus
  const prefetchTarget = useCallback((path) => {
    if (path === '/works') import('../pages/Works').catch(() => {});
    else if (path === '/about') import('../pages/About').catch(() => {});
    else if (path === '/beyond') import('../pages/Beyond').catch(() => {});
    else if (path === '/contact') import('../pages/Contact').catch(() => {});
  }, []);

  const handleNav = useCallback(
    (path) => {
      setActivePulse(true);
      prefetchTarget(path);
      setTimeout(() => {
        navigate(path);
      }, 120);
    },
    [navigate, prefetchTarget],
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
      const btn = containerRef.current.querySelector(`[data-orbit-idx="${focusedIdx}"]`);
      if (btn) {
        btn.focus();
        prefetchTarget(SATELLITES[focusedIdx].path);
      }
    }
  }, [focusedIdx, prefetchTarget]);

  const activeFocusIdx = hoveredIdx !== null ? hoveredIdx : focusedIdx;
  const isInteracting = activeFocusIdx >= 0;

  return (
    <nav
      ref={containerRef}
      className="relative mx-auto mt-4 w-[min(380px,88vw)] sm:mt-6"
      role="navigation"
      aria-label="Orbital navigation"
      onKeyDown={handleKeyDown}
    >
      <svg
        viewBox="0 0 340 340"
        className="h-auto w-full overflow-visible"
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
          opacity={isInteracting ? 0.45 : 0.3}
          className="orbit-shell__ring transition-opacity duration-300"
        />

        {/* Orbit track subtle guide circles */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={ORBIT_RADIUS - 16}
          fill="none"
          stroke="#38bdf8"
          strokeWidth="0.3"
          strokeDasharray="2 6"
          opacity={0.15}
        />

        {/* Orbiting asteroid / comet */}
        <circle
          className="orbit-shell__comet"
          cx={CENTER}
          cy={CENTER - ORBIT_RADIUS}
          r="2.5"
        />

        {/* Central sun corona & breathing glow (Change 13) */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={isInteracting ? 32 : 28}
          fill="#facc15"
          opacity={isInteracting ? 0.28 : 0.16}
          className="solar-corona transition-all duration-300"
        />

        {/* Central sun body */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={activePulse ? 25 : isInteracting ? 24 : 22}
          fill="url(#sunGradient)"
          className="cursor-pointer transition-all duration-300"
          style={{
            filter: isInteracting
              ? 'drop-shadow(0 0 16px rgba(250,204,21,0.95)) drop-shadow(0 0 30px rgba(245,158,11,0.5))'
              : 'drop-shadow(0 0 8px rgba(250,204,21,0.7))',
          }}
          onClick={() => handleNav('/')}
        />
        <ellipse
          className="orbit-shell__flare"
          cx={CENTER}
          cy={CENTER}
          rx={isInteracting ? '62' : '52'}
          ry={isInteracting ? '10' : '8'}
        />
        <text
          x={CENTER}
          y={CENTER + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#050816"
          fontSize="18"
          fontWeight="bold"
          className="pointer-events-none select-none"
        >
          ☉
        </text>

        {/* Gradient definitions */}
        <defs>
          <radialGradient id="sunGradient" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#f59e0b" />
          </radialGradient>
        </defs>

        {/* Satellite nodes (Change 14) */}
        {SATELLITES.map((sat, i) => {
          const { x, y } = getPosition(sat.angle, ORBIT_RADIUS);
          const isActive = location.pathname === sat.path;
          const isHovered = hoveredIdx === i;
          const isFocused = focusedIdx === i;
          const isCurrentTarget = isHovered || isFocused;
          const isDimmed = isInteracting && !isCurrentTarget;

          return (
            <g
              key={sat.path}
              className={`transition-opacity duration-300 ${isDimmed ? 'opacity-40' : 'opacity-100'}`}
            >
              {/* Connection line from sun to satellite */}
              {(isCurrentTarget || isActive) && (
                <line
                  x1={CENTER}
                  y1={CENTER}
                  x2={x}
                  y2={y}
                  stroke={sat.color}
                  strokeWidth={isCurrentTarget ? '1.2' : '0.8'}
                  opacity={isCurrentTarget ? 0.85 : 0.4}
                  className="transition-all duration-300"
                  style={{
                    filter: isCurrentTarget
                      ? `drop-shadow(0 0 4px ${sat.color})`
                      : undefined,
                  }}
                />
              )}

              {/* Satellite circle */}
              <circle
                cx={x}
                cy={y}
                r={isCurrentTarget ? 27 : isActive ? 26 : 24}
                fill={isActive ? sat.color + '33' : '#0a0f2c'}
                stroke={sat.color}
                strokeWidth={isCurrentTarget ? 2.8 : isActive ? 2.5 : 1.5}
                className="cursor-pointer transition-all duration-200"
                style={{
                  filter: isCurrentTarget
                    ? `drop-shadow(0 0 10px ${sat.color}) drop-shadow(0 0 20px ${sat.color}80)`
                    : isActive
                      ? `drop-shadow(0 0 6px ${sat.color}66)`
                      : undefined,
                }}
              />

              {/* Icon */}
              <text
                x={x}
                y={y - 3}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={sat.color}
                fontSize={isCurrentTarget ? '19' : '18'}
                className="pointer-events-none select-none transition-all"
              >
                {sat.icon}
              </text>

              {/* Label */}
              <text
                x={x}
                y={y + 13}
                textAnchor="middle"
                fill={isCurrentTarget ? '#ffffff' : '#e0e6ff'}
                fontSize="10"
                fontFamily="Inter, sans-serif"
                fontWeight={isActive || isCurrentTarget ? '700' : '500'}
                className="pointer-events-none select-none transition-all"
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
                onMouseEnter={() => {
                  setHoveredIdx(i);
                  prefetchTarget(sat.path);
                }}
                onMouseLeave={() => setHoveredIdx(null)}
                onFocus={() => {
                  setFocusedIdx(i);
                  prefetchTarget(sat.path);
                }}
                onBlur={() => setFocusedIdx(-1)}
              />
            </g>
          );
        })}
      </svg>
    </nav>
  );
}
