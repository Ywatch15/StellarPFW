// FILE: src/components/SolarSystem.jsx
// Interactive solar system — Sun in center, 8 project planets + Pluto (GitHub)
// Plasma tentacle animation on planet click, black hole animation on sun click
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/solar-system.css';
import SatelliteCard from './SatelliteCard';

/* ─────────────────────── PROJECT DATA ─────────────────────── */

const PLANETS = [
  {
    id: 'mercury', name: 'Mercury', project: 'Portfolio',
    url: 'https://portfolio-frontend-iprx.onrender.com/',
    type: 'deployed', orbit: 80, size: 14, speed: 12,
    gradient: 'radial-gradient(circle at 35% 30%, #d4d4d4, #8a8a8a 60%, #5a5a5a)',
    color: '#b0b0b0',
    description: 'A space-themed portfolio that turns a developer profile into an explorable digital universe.',
    tags: ['React', 'Three.js', 'Motion', 'Accessibility'],
  },
  {
    id: 'venus', name: 'Venus', project: 'ScatchProject',
    url: 'https://scatchproject.onrender.com/',
    type: 'deployed', orbit: 118, size: 18, speed: 17,
    gradient: 'radial-gradient(circle at 35% 30%, #ffe0a0, #e8a735 60%, #b07020)',
    color: '#e8a735',
    description: 'A full-stack commerce platform with product listings, authentication, carts, and inventory management.',
    tags: ['Node.js', 'Express', 'EJS', 'MongoDB'],
  },
  {
    id: 'earth', name: 'Earth', project: 'Resume Analyzer',
    url: 'https://01resumeanalyzer06.netlify.app/',
    type: 'deployed', orbit: 158, size: 19, speed: 22,
    gradient: 'radial-gradient(circle at 35% 30%, #90d0ff, #4da6ff 50%, #2980b9 80%, #1a5276)',
    color: '#4da6ff',
    description: 'A practical resume intelligence tool that helps candidates understand and improve their applications.',
    tags: ['React', 'Node.js', 'AI', 'Deployment'],
  },
  {
    id: 'mars', name: 'Mars', project: 'Bank Transaction System',
    url: 'https://bank-transaction-sys.onrender.com/dashboard',
    type: 'deployed', orbit: 198, size: 15, speed: 28,
    gradient: 'radial-gradient(circle at 35% 30%, #e8735a, #c1440e 60%, #8b2500)',
    color: '#c1440e',
    description: 'A transaction dashboard focused on clear financial flows, account activity, and responsive data presentation.',
    tags: ['React', 'Node.js', 'REST API', 'Dashboard'],
  },
  {
    id: 'jupiter', name: 'Jupiter', project: 'ColdCraft AI',
    url: 'https://coldcraft-frontend.onrender.com',
    type: 'deployed', orbit: 248, size: 30, speed: 36,
    gradient: 'radial-gradient(circle at 35% 30%, #f0d8a0, #c88b3a 40%, #a06020 70%, #805030)',
    color: '#c88b3a',
    description: 'An AI-powered experience that explores conversational interfaces and useful generative workflows.',
    tags: ['React', 'AI', 'Node.js', 'UX'],
  },
  {
    id: 'saturn', name: 'Saturn', project: 'Face Detector',
    url: 'https://github.com/Ywatch15/Face-Detector',
    type: 'github', orbit: 300, size: 26, speed: 44,
    gradient: 'radial-gradient(circle at 35% 30%, #fff5d0, #e8d282 50%, #c8a050)',
    color: '#e8d282',
    description: 'A computer-vision experiment that detects faces in images and video streams in real time.',
    tags: ['Python', 'OpenCV', 'Computer Vision'],
  },
  {
    id: 'uranus', name: 'Uranus', project: 'DevGraph',
    url: 'https://dev-graph-eight.vercel.app/',
    type: 'deployed', orbit: 348, size: 22, speed: 52,
    gradient: 'radial-gradient(circle at 35% 30%, #b0f0f0, #73d9e8 50%, #4ab8c8)',
    color: '#73d9e8',
    description: 'A developer graph for visualizing technical relationships and making engineering knowledge easier to navigate.',
    tags: ['React', 'Data Visualization', 'Vercel'],
  },
  {
    id: 'neptune', name: 'Neptune', project: 'AlgoVista - The Algo Explorer',
    url: 'https://algovista-three.vercel.app',
    type: 'deployed', orbit: 392, size: 21, speed: 60,
    gradient: 'radial-gradient(circle at 35% 30%, #8090e0, #3f54ba 50%, #2a3880)',
    color: '#3f54ba',
    description: 'An interactive algorithm explorer designed to make data structures and problem-solving patterns visual.',
    tags: ['React', 'Algorithms', 'Visualization', 'Education'],
  },
];

const PLUTO = {
  id: 'pluto', name: 'Pluto ★', project: 'GitHub Profile',
  url: 'https://github.com/Ywatch15',
  type: 'star', orbit: 440, size: 9, speed: 72,
  gradient: 'radial-gradient(circle at 35% 30%, #f0e8d0, #d4c5a9 60%, #a89880)',
  color: '#d4c5a9',
  description: 'The command center for my open-source work, experiments, repositories, and ongoing developer activity.',
  tags: ['GitHub', 'Open Source', 'Repositories'],
  missionBrief: 'Explore my GitHub profile to inspect source code, follow project evolution, and see the experiments behind this portfolio.',
};

const SUN_SIZE = 70;

/* ─────────────────────── HELPERS ─────────────────────── */

/** Generate random background stars */
function makeStars(n) {
  return Array.from({ length: n }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    s: 0.5 + Math.random() * 1.5,
    o: 0.15 + Math.random() * 0.35,
    d: Math.random() * 6,
  }));
}

/* ═══════════════════════ COMPONENT ═══════════════════════ */

export default function SolarSystem() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const [scale, setScale] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [hovered, setHovered] = useState(null);

  const allPlanets = useMemo(() => [...PLANETS, PLUTO], []);
  const stars = useMemo(() => makeStars(60), []);

  /* ── Responsive scale ── */
  useEffect(() => {
    const calc = () => {
      const s = Math.min(window.innerWidth, window.innerHeight) / 1000;
      setScale(Math.max(0.35, Math.min(s, 1.2)));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  /* ── Canvas sizing (DPI-aware) ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const r = canvas.parentElement?.getBoundingClientRect();
      if (!r) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      canvas.style.width = r.width + 'px';
      canvas.style.height = r.height + 'px';
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  /* ── Cleanup animation frames ── */
  useEffect(() => () => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
  }, []);

  /* ═══════════ BLACK HOLE ANIMATION ═══════════ */
  function runBlackHole() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const maxR = Math.hypot(canvas.width, canvas.height) / 2;

    setIsCollapsing(true);
    const startTime = performance.now();

    function frame(now) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / 4000, 1);
      const time = elapsed / 1000;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* -- Black hole core -- */
      const coreR = (30 + t * 70) * dpr;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      grad.addColorStop(0, 'rgba(0,0,0,1)');
      grad.addColorStop(0.5, 'rgba(10,0,30,0.95)');
      grad.addColorStop(1, 'rgba(20,0,50,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      /* -- Accretion disk -- */
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 2.5);
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.ellipse(0, 0, coreR * 1.8 + i * 10 * dpr, coreR * 0.35 + i * 4 * dpr, 0, 0, Math.PI * 2);
        const alpha = Math.max(0.04, 0.25 - i * 0.04 + Math.sin(time * 3) * 0.08);
        ctx.strokeStyle = `rgba(${140 + i * 30},${40 + i * 20},${200 - i * 50},${alpha.toFixed(3)})`;
        ctx.lineWidth = (3 - i) * dpr;
        ctx.stroke();
      }
      ctx.restore();

      /* -- Gravitational lensing rings -- */
      for (let i = 0; i < 5; i++) {
        const r = coreR + (i + 1) * 18 * dpr + Math.sin(time * 2 + i) * 5 * dpr;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(100,50,200,${(0.12 - i * 0.02).toFixed(3)})`;
        ctx.lineWidth = dpr;
        ctx.stroke();
      }

      /* -- Particle streams being sucked in -- */
      for (let i = 0; i < 40; i++) {
        const angle = (i / 40) * Math.PI * 2 + time * 0.8;
        const d = maxR * (1 - t * 0.8) * (0.25 + Math.random() * 0.75);
        const ppx = cx + Math.cos(angle) * d;
        const ppy = cy + Math.sin(angle) * d;
        const streakLen = Math.min(t * 40, 30) * dpr;
        const toCenter = Math.atan2(cy - ppy, cx - ppx);

        ctx.beginPath();
        ctx.moveTo(ppx, ppy);
        ctx.lineTo(ppx + Math.cos(toCenter) * streakLen, ppy + Math.sin(toCenter) * streakLen);
        ctx.strokeStyle = `rgba(200,180,255,${(0.15 + Math.random() * 0.35).toFixed(2)})`;
        ctx.lineWidth = (1 + Math.random() * 2) * dpr;
        ctx.stroke();
      }

      /* -- Growing darkness overlay -- */
      if (t > 0.45) {
        const darkness = Math.min((t - 0.45) / 0.55, 1);
        ctx.fillStyle = `rgba(5,8,22,${darkness.toFixed(3)})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      if (t < 1) {
        animRef.current = requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setIsCollapsing(false);
        navigate('/', { state: { fromBlackHole: true } });
      }
    }

    animRef.current = requestAnimationFrame(frame);
  }

  /* ═══════════ EVENT HANDLERS ═══════════ */

  function handlePlanetClick(planet) {
    if (isCollapsing) return;
    setSelectedProject(planet);
  }

  function handleSunClick() {
    if (isCollapsing) return;
    runBlackHole();
  }

  /* ═══════════ RENDER ═══════════ */

  const sunS = SUN_SIZE * scale;
  const total = allPlanets.length;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: 'calc(100vh - 5rem)',
        overflow: 'hidden',
        background: 'transparent',
      }}
    >
      {/* ── Page title ── */}
      <div
        style={{
          position: 'absolute', top: 10, left: 0, right: 0,
          textAlign: 'center', zIndex: 5, padding: '0 1rem',
        }}
      >
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">
          <span className="text-gradient-aurora">Planetary</span>{' '}
          <span className="text-stardust">System</span>
        </h1>
        <p className="mt-1 text-xs text-cosmos-muted sm:text-sm">
          Click a planet to explore &middot; Click the Sun… if you dare
        </p>
      </div>

      {/* ── Background stars (collapse toward centre during black-hole) ── */}
      <div
        style={{
          position: 'absolute', inset: 0,
          transition: isCollapsing
            ? 'transform 3s ease-in, opacity 2.5s ease-in'
            : 'none',
          transformOrigin: '50% 50%',
          ...(isCollapsing
            ? { transform: 'scale(0) rotate(180deg)', opacity: 0 }
            : {}),
        }}
      >
        {stars.map((s, i) => (
          <div
            key={i}
            className="solar-bg-star"
            style={{
              position: 'absolute',
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.s,
              height: s.s,
              borderRadius: '50%',
              background: '#fff',
              opacity: s.o,
              animation: `twinkle ${3 + s.d}s ease-in-out ${s.d}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* ── SUN ── */}
      <div
        onClick={handleSunClick}
        role="button"
        tabIndex={0}
        aria-label="This Website — click for black-hole effect"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSunClick(); } }}
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: sunS, height: sunS,
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          zIndex: 10,
          transition: isCollapsing
            ? 'transform 2.5s ease-in, opacity 2s ease-in'
            : 'none',
          ...(isCollapsing
            ? { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 }
            : {}),
        }}
      >
        {/* Aura glow */}
        <div
          className="solar-sun-aura"
          style={{
            position: 'absolute',
            inset: -22 * scale,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,167,38,0.3) 0%, rgba(255,111,0,0.1) 50%, transparent 70%)',
            animation: 'sunPulse 3s ease-in-out infinite',
          }}
        />
        {/* Core with surface texture */}
        <div
          className="solar-sun-core"
          style={{
            width: '100%', height: '100%',
            borderRadius: '50%',
            background: [
              'radial-gradient(circle at 65% 45%, rgba(0,0,0,0.1) 0%, transparent 5%)',
              'radial-gradient(circle at 25% 65%, rgba(0,0,0,0.08) 0%, transparent 4%)',
              'radial-gradient(circle at 50% 20%, rgba(255,255,200,0.3) 0%, transparent 8%)',
              'radial-gradient(circle at 30% 30%, #fff5b8, #ffa726 40%, #ff6f00 70%, #e65100 100%)',
            ].join(', '),
            animation: 'sunSpin 25s linear infinite',
            boxShadow: [
              `0 0 ${20 * scale}px rgba(255,167,38,0.8)`,
              `0 0 ${50 * scale}px rgba(255,167,38,0.4)`,
              `0 0 ${100 * scale}px rgba(255,111,0,0.3)`,
              `0 0 ${180 * scale}px rgba(230,81,0,0.15)`,
            ].join(', '),
          }}
        />
        {/* Label */}
        <div
          style={{
            position: 'absolute', bottom: -22, left: '50%',
            transform: 'translateX(-50%)', whiteSpace: 'nowrap',
            fontSize: Math.max(9, 10 * scale),
            color: 'rgba(255,200,100,0.8)',
            textAlign: 'center', pointerEvents: 'none',
            textShadow: '0 0 6px rgba(0,0,0,0.8)',
          }}
        >
          ☀ This Site
        </div>
      </div>

      {/* ── ORBITS & PLANETS ── */}
      {allPlanets.map((planet, idx) => {
        const od = planet.orbit * 2 * scale;
        const ps = Math.max(planet.size * scale, 8);
        const delay = -planet.speed * (idx / total);
        const collapseDur = 1.5 + (idx / total) * 2;

        return (
          <div
            key={planet.id}
            className="solar-orbit-ring"
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: od, height: od,
              marginTop: -od / 2, marginLeft: -od / 2,
              borderRadius: '50%',
              border: planet.id === 'pluto'
                ? '1px dashed rgba(255,255,255,0.04)'
                : '1px solid rgba(255,255,255,0.06)',
              pointerEvents: 'none',
              animation: `orbitSpin ${planet.speed}s linear infinite`,
              animationDelay: `${delay}s`,
              animationPlayState: 'running',
              willChange: 'transform',
              transition: isCollapsing
                ? `width ${collapseDur}s ease-in, height ${collapseDur}s ease-in, margin-top ${collapseDur}s ease-in, margin-left ${collapseDur}s ease-in, opacity ${collapseDur - 0.3}s ease-in`
                : 'none',
              ...(isCollapsing
                ? { width: 0, height: 0, marginTop: 0, marginLeft: 0, opacity: 0 }
                : {}),
            }}
          >
            {/* Planet anchor (sits at top-edge of orbit ring) */}
            <div
              data-planet={planet.id}
              onClick={(e) => { e.stopPropagation(); handlePlanetClick(planet); }}
              onMouseEnter={() => setHovered(planet.id)}
              onMouseLeave={() => setHovered(null)}
              role="button"
              tabIndex={0}
              aria-label={`${planet.project} — click to visit`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePlanetClick(planet);
                }
              }}
              style={{
                position: 'absolute',
                top: 0, left: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
                pointerEvents: 'all',
                cursor: 'pointer',
              }}
            >
              {/* Counter-rotate to keep planet upright */}
              <div
                className="solar-counter-rotate"
                style={{
                  animation: `orbitSpin ${planet.speed}s linear infinite reverse`,
                  animationDelay: `${delay}s`,
                  animationPlayState: 'running',
                }}
              >
                {/* Planet sphere */}
                <div
                  style={{
                    position: 'relative',
                    width: ps, height: ps,
                    borderRadius: '50%',
                    background: [
                      `conic-gradient(from 200deg, ${planet.color}14, transparent 28%, ${planet.color}20 56%, transparent 78%, ${planet.color}14)`,
                      planet.gradient,
                    ].join(', '),
                    boxShadow: `0 0 ${ps * 0.6}px ${planet.color}50, inset -${Math.max(2, ps * 0.12)}px -${Math.max(2, ps * 0.12)}px ${Math.max(4, ps * 0.3)}px rgba(0,0,0,0.35), inset ${Math.max(1.5, ps * 0.08)}px ${Math.max(1.5, ps * 0.08)}px ${Math.max(4, ps * 0.25)}px rgba(255,255,255,0.15)`,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    ...(hovered === planet.id
                      ? {
                          transform: 'scale(1.4)',
                          boxShadow: `0 0 ${ps * 1.1}px ${planet.color}88, 0 0 ${ps * 2}px ${planet.color}44, inset -${Math.max(2, ps * 0.12)}px -${Math.max(2, ps * 0.12)}px ${Math.max(5, ps * 0.35)}px rgba(0,0,0,0.4), inset ${Math.max(1.5, ps * 0.08)}px ${Math.max(1.5, ps * 0.08)}px ${Math.max(5, ps * 0.3)}px rgba(255,255,255,0.2)`,
                        }
                      : {}),
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: '12% 18% auto 18%',
                      height: '22%',
                      borderRadius: '999px',
                      background: 'linear-gradient(to right, rgba(255,255,255,0.38), rgba(255,255,255,0))',
                      transform: 'rotate(-12deg)',
                      pointerEvents: 'none',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      right: '10%',
                      bottom: '14%',
                      width: '24%',
                      height: '24%',
                      borderRadius: '50%',
                      background: 'rgba(0,0,0,0.18)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Saturn's ring */}
                  {planet.id === 'saturn' && (
                    <div
                      style={{
                        position: 'absolute', top: '50%', left: '50%',
                        width: ps * 1.8, height: ps * 0.5,
                        marginTop: -ps * 0.25, marginLeft: -ps * 0.9,
                        borderRadius: '50%',
                        border: `1.5px solid ${planet.color}66`,
                        transform: 'rotateX(70deg)',
                        pointerEvents: 'none',
                      }}
                    />
                  )}

                  {/* Pluto star sparkle */}
                  {planet.id === 'pluto' && (
                    <>
                      <div
                        style={{
                          position: 'absolute', top: '50%',
                          left: -3, right: -3, height: 1.5,
                          background: 'rgba(255,255,255,0.5)',
                          transform: 'translateY(-50%)',
                          borderRadius: 1, pointerEvents: 'none',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute', left: '50%',
                          top: -3, bottom: -3, width: 1.5,
                          background: 'rgba(255,255,255,0.5)',
                          transform: 'translateX(-50%)',
                          borderRadius: 1, pointerEvents: 'none',
                        }}
                      />
                    </>
                  )}
                </div>

                {/* Label below planet */}
                <div
                  style={{
                    position: 'absolute', top: '100%', left: '50%',
                    transform: 'translateX(-50%)',
                    whiteSpace: 'nowrap', textAlign: 'center',
                    marginTop: 5, pointerEvents: 'none',
                    opacity: hovered === planet.id ? 1 : 0.55,
                    transition: 'opacity 0.3s',
                    textShadow: '0 0 6px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.6)',
                  }}
                >
                  <div style={{ fontSize: Math.max(8, 9 * scale), fontWeight: 600, color: '#e0e6ff' }}>
                    {planet.name}
                  </div>
                  <div style={{ fontSize: Math.max(7, 8 * scale), color: '#94a3b8' }}>
                    {planet.project}
                  </div>
                  {planet.type === 'deployed' && (
                    <div style={{ fontSize: Math.max(7, 8 * scale), color: '#4ade80', marginTop: 1 }}>● Live</div>
                  )}
                  {planet.type === 'github' && planet.id !== 'pluto' && (
                    <div style={{ fontSize: Math.max(7, 8 * scale), color: '#a78bfa', marginTop: 1 }}>◆ Repo</div>
                  )}
                  {planet.id === 'pluto' && (
                    <div style={{ fontSize: Math.max(7, 8 * scale), color: '#facc15', marginTop: 1 }}>★ Profile</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* ── Legend ── */}
      <div
        style={{
          position: 'absolute', bottom: 10, left: 0, right: 0,
          textAlign: 'center', zIndex: 5,
        }}
      >
        <span className="text-xs text-cosmos-muted" style={{ letterSpacing: 1 }}>
          <span style={{ color: '#4ade80' }}>●</span> Deployed&nbsp;&nbsp;
          <span style={{ color: '#a78bfa' }}>◆</span> GitHub Repo&nbsp;&nbsp;
          <span style={{ color: '#facc15' }}>★</span> Profile
        </span>
      </div>

      {/* ── Persistent mission links ── */}
      <nav
        aria-label="Project mission links"
        className="absolute bottom-12 left-1/2 z-10 flex w-[min(94vw,54rem)] -translate-x-1/2 flex-wrap justify-center gap-2 px-2 sm:gap-3"
      >
        {allPlanets.map((planet) => (
          <a
            key={planet.id}
            href={planet.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border px-3 py-1.5 text-[0.68rem] font-medium transition-all hover:-translate-y-0.5 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-aurora sm:px-4 sm:text-xs"
            style={{
              borderColor: `${planet.color}80`,
              color: planet.color,
              boxShadow: `0 0 14px ${planet.color}18`,
            }}
          >
            {planet.project}
          </a>
        ))}
      </nav>

      {/* ── Canvas overlay (plasma tentacles + black-hole vortex) ── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0,
          pointerEvents: isCollapsing ? 'all' : 'none',
          zIndex: 20,
        }}
      />

      <SatelliteCard
        project={selectedProject ? {
          ...selectedProject,
          title: selectedProject.project,
          demo: selectedProject.type === 'deployed' ? selectedProject.url : null,
          github: selectedProject.type === 'github' ? selectedProject.url : null,
        } : null}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
