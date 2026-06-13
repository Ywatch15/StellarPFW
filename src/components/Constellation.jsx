// FILE: src/components/Constellation.jsx
// SVG-based skills constellation with hover-highlight, tooltips & doc links
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';

const skills = [
  // ── Frontend ──
  { name: 'HTML5', x: 8, y: 8, size: 1.2, group: 'frontend' },
  { name: 'CSS3', x: 24, y: 12, size: 1.2, group: 'frontend' },
  { name: 'JavaScript', x: 42, y: 8, size: 1.5, group: 'frontend' },
  { name: 'React', x: 80, y: 8, size: 1.6, group: 'frontend' },
  { name: 'Next.js', x: 94, y: 16, size: 1.3, group: 'frontend' },
  { name: 'Bootstrap', x: 6, y: 24, size: 1.0, group: 'frontend' },
  { name: 'jQuery', x: 20, y: 28, size: 0.9, group: 'frontend' },
  { name: 'Tailwind', x: 36, y: 24, size: 1.2, group: 'frontend' },
  { name: 'MUI', x: 50, y: 28, size: 1.0, group: 'frontend' },
  { name: 'Vite', x: 64, y: 24, size: 1.1, group: 'frontend' },
  { name: 'Redux', x: 80, y: 28, size: 1.1, group: 'frontend' },
  { name: 'React Router', x: 26, y: 38, size: 1.0, group: 'frontend' },
  { name: 'Context API', x: 50, y: 38, size: 0.9, group: 'frontend' },

  // ── Backend ──
  { name: 'Node.js', x: 14, y: 50, size: 1.4, group: 'backend' },
  { name: 'Express', x: 32, y: 54, size: 1.2, group: 'backend' },
  { name: 'JWT', x: 66, y: 54, size: 1.0, group: 'backend' },
  { name: 'Supabase', x: 78, y: 48, size: 1.1, group: 'backend' },
  { name: 'Appwrite', x: 92, y: 56, size: 1.1, group: 'backend' },
  { name: 'Nodemon', x: 22, y: 64, size: 0.9, group: 'backend' },
  { name: 'EJS', x: 40, y: 64, size: 0.9, group: 'backend' },

  // ── Data Science / Python ──
  { name: 'Python', x: 12, y: 76, size: 1.4, group: 'datascience' },
  { name: 'NumPy', x: 28, y: 72, size: 1.0, group: 'datascience' },
  { name: 'Pandas', x: 46, y: 76, size: 1.1, group: 'datascience' },
  { name: 'Matplotlib', x: 64, y: 72, size: 1.0, group: 'datascience' },
  { name: 'Seaborn', x: 82, y: 76, size: 1.0, group: 'datascience' },

  // ── Core Languages ──
  { name: 'C++', x: 8, y: 90, size: 1.2, group: 'languages' },
  { name: 'C', x: 22, y: 94, size: 1.1, group: 'languages' },
  { name: 'Markdown', x: 56, y: 94, size: 0.9, group: 'languages' },

  // ── Databases ──
  { name: 'MongoDB', x: 74, y: 102, size: 1.3, group: 'databases' },
  { name: 'MySQL', x: 90, y: 106, size: 1.2, group: 'databases' },

  // ── DevOps & Cloud ──
  { name: 'Vercel', x: 6, y: 112, size: 1.0, group: 'devops' },
  { name: 'Render', x: 20, y: 116, size: 1.0, group: 'devops' },
  { name: 'AWS', x: 36, y: 112, size: 1.2, group: 'devops' },
  { name: 'Kubernetes', x: 86, y: 116, size: 1.1, group: 'devops' },

  // ── Tooling ──
  { name: 'Git', x: 6, y: 122, size: 1.1, group: 'tools' },
  { name: 'GitHub', x: 20, y: 126, size: 1.1, group: 'tools' },
  { name: 'NPM', x: 34, y: 122, size: 1.0, group: 'tools' },
  { name: 'Postman', x: 48, y: 126, size: 1.0, group: 'tools' },
  { name: 'PowerShell', x: 64, y: 122, size: 0.9, group: 'tools' },
  { name: 'Prettier', x: 80, y: 126, size: 0.9, group: 'tools' },
  { name: 'Win Terminal', x: 10, y: 134, size: 0.9, group: 'tools' },
  { name: 'Canva', x: 28, y: 134, size: 0.9, group: 'tools' },
  { name: 'Anaconda', x: 46, y: 134, size: 1.0, group: 'tools' },
  { name: 'OpenCV', x: 66, y: 134, size: 1.0, group: 'tools' },

  // ── IDEs / AI Tools ──
  { name: 'VS Code', x: 8, y: 144, size: 1.2, group: 'ide' },
  { name: 'Google Antigravity', x: 26, y: 148, size: 1.0, group: 'ide' },
  { name: 'Windsurf', x: 44, y: 144, size: 1.1, group: 'ide' },
  { name: 'Cursor', x: 60, y: 148, size: 1.1, group: 'ide' },
  { name: 'Claude Code', x: 76, y: 144, size: 1.0, group: 'ide' },
  { name: 'Codex', x: 90, y: 148, size: 1.0, group: 'ide' },
  { name: 'Lovable', x: 18, y: 156, size: 1.0, group: 'ide' },
  { name: 'Bolt.new', x: 44, y: 156, size: 1.0, group: 'ide' },
  { name: 'Orchid', x: 70, y: 156, size: 1.0, group: 'ide' },
];

// Official documentation URLs for each skill
const docUrls = {
  'HTML5':        'https://developer.mozilla.org/en-US/docs/Web/HTML',
  'CSS3':         'https://developer.mozilla.org/en-US/docs/Web/CSS',
  'JavaScript':   'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  'React':        'https://react.dev/',
  'Next.js':      'https://nextjs.org/docs',
  'Bootstrap':    'https://getbootstrap.com/docs/',
  'jQuery':       'https://api.jquery.com/',
  'Tailwind':     'https://tailwindcss.com/docs',
  'MUI':          'https://mui.com/getting-started/',
  'Vite':         'https://vite.dev/guide/',
  'Redux':        'https://redux.js.org/introduction/getting-started',
  'React Router': 'https://reactrouter.com/en/main',
  'Context API':  'https://react.dev/reference/react/createContext',
  'Node.js':      'https://nodejs.org/en/docs/',
  'Express':      'https://expressjs.com/en/starter/installing.html',
  'JWT':          'https://jwt.io/introduction',
  'Supabase':     'https://supabase.com/docs',
  'Appwrite':     'https://appwrite.io/docs',
  'Nodemon':      'https://nodemon.io/',
  'EJS':          'https://ejs.co/#docs',
  'C++':          'https://en.cppreference.com/w/',
  'C':            'https://en.cppreference.com/w/c',
  'Python':       'https://docs.python.org/3/',
  'NumPy':        'https://numpy.org/doc/',
  'Pandas':       'https://pandas.pydata.org/docs/',
  'Matplotlib':   'https://matplotlib.org/stable/users/index.html',
  'Seaborn':      'https://seaborn.pydata.org/',
  'Markdown':     'https://www.markdownguide.org/',
  'MongoDB':      'https://www.mongodb.com/docs/',
  'MySQL':        'https://dev.mysql.com/doc/',
  'Vercel':       'https://vercel.com/docs',
  'Render':       'https://docs.render.com/',
  'AWS':          'https://docs.aws.amazon.com/',
  'Kubernetes':   'https://kubernetes.io/docs/home/',
  'Git':          'https://git-scm.com/doc',
  'GitHub':       'https://docs.github.com/',
  'NPM':          'https://docs.npmjs.com/',
  'Postman':      'https://learning.postman.com/docs/',
  'PowerShell':   'https://learn.microsoft.com/en-us/powershell/',
  'Prettier':     'https://prettier.io/docs/en/',
  'Win Terminal': 'https://learn.microsoft.com/en-us/windows/terminal/',
  'Canva':        'https://www.canva.com/designschool/',
  'Anaconda':     'https://docs.anaconda.com/',
  'OpenCV':       'https://docs.opencv.org/',
  'VS Code':      'https://code.visualstudio.com/docs',
  'Google Antigravity': 'https://www.google.com/search?q=Google+Antigravity',
  'Windsurf':     'https://windsurf.com/',
  'Cursor':       'https://docs.cursor.com/',
  'Claude Code':  'https://docs.anthropic.com/en/docs/claude-code',
  'Codex':        'https://platform.openai.com/docs',
  'Lovable':      'https://lovable.dev/',
  'Bolt.new':     'https://bolt.new/',
  'Orchid':       'https://www.google.com/search?q=Orchid+IDE',
};

const connections = [
  // Frontend chain
  ['HTML5', 'CSS3'],
  ['CSS3', 'JavaScript'],
  ['JavaScript', 'React'],
  ['React', 'Next.js'],
  ['CSS3', 'Bootstrap'],
  ['CSS3', 'Tailwind'],
  ['JavaScript', 'jQuery'],
  ['Tailwind', 'MUI'],
  ['React', 'Vite'],
  ['React', 'Redux'],
  ['React', 'React Router'],
  ['React', 'Context API'],
  ['Next.js', 'Vite'],
  ['Redux', 'React Router'],
  ['Tailwind', 'Vite'],
  ['Bootstrap', 'jQuery'],

  // Frontend ↔ Backend
  ['JavaScript', 'Node.js'],
  ['React', 'Express'],
  ['Next.js', 'Node.js'],

  // Backend chain
  ['Node.js', 'Express'],
  ['Express', 'JWT'],
  ['Express', 'Supabase'],
  ['Express', 'Appwrite'],
  ['Supabase', 'Appwrite'],
  ['Node.js', 'Nodemon'],
  ['Express', 'EJS'],

  // Data science
  ['Python', 'NumPy'],
  ['NumPy', 'Pandas'],
  ['Pandas', 'Matplotlib'],
  ['Matplotlib', 'Seaborn'],
  ['Python', 'Node.js'],

  // Languages
  ['C++', 'C'],
  ['C++', 'Python'],

  // Databases ↔ Backend
  ['MongoDB', 'Express'],
  ['MongoDB', 'Node.js'],
  ['MySQL', 'Node.js'],
  ['MySQL', 'Express'],

  // DevOps
  ['Vercel', 'Next.js'],
  ['Render', 'Node.js'],
  ['AWS', 'Kubernetes'],

  // Tools
  ['Git', 'GitHub'],
  ['NPM', 'Node.js'],
  ['Postman', 'Express'],
  ['PowerShell', 'Win Terminal'],
  ['Anaconda', 'Python'],
  ['OpenCV', 'Python'],
  ['Prettier', 'Vite'],
  ['Canva', 'CSS3'],

  // IDEs / AI tools
  ['VS Code', 'Cursor'],
  ['Cursor', 'Windsurf'],
  ['Windsurf', 'Claude Code'],
  ['Claude Code', 'Codex'],
  ['Codex', 'Lovable'],
  ['Lovable', 'Bolt.new'],
  ['Bolt.new', 'Orchid'],
  ['VS Code', 'Google Antigravity'],
];

const groupColors = {
  frontend: '#6c63ff',
  backend: '#38bdf8',
  datascience: '#22c55e',
  languages: '#facc15',
  databases: '#f97316',
  devops: '#22d3ee',
  tools: '#a78bfa',
  ide: '#e06090',
};

function getSkill(name) {
  return skills.find((s) => s.name === name);
}

function getConnectedSkills(name) {
  const connected = new Set();
  connections.forEach(([a, b]) => {
    if (a === name) connected.add(b);
    if (b === name) connected.add(a);
  });
  return connected;
}

export default function Constellation() {
  const [hovered, setHovered] = useState(null);
  const [focused, setFocused] = useState(null);
  const [tooltip, setTooltip] = useState(null); // { name, x, y }
  const hoverTimerRef = useRef(null);

  const active = hovered || focused;
  const connectedSet = useMemo(
    () => (active ? getConnectedSkills(active) : new Set()),
    [active],
  );

  // Hover tooltip with 0.75s delay
  const handleMouseEnter = useCallback((skill) => {
    setHovered(skill.name);
    hoverTimerRef.current = setTimeout(() => {
      setTooltip({ name: skill.name, x: skill.x, y: skill.y });
    }, 750);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(null);
    setTooltip(null);
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }, []);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  // Open official docs on click
  const handleClick = useCallback((skillName) => {
    const url = docUrls[skillName];
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  const getNodeOpacity = useCallback(
    (name) => {
      if (!active) return 0.85;
      if (name === active || connectedSet.has(name)) return 1;
      return 0.15;
    },
    [active, connectedSet],
  );

  const getEdgeOpacity = useCallback(
    (a, b) => {
      if (!active) return 0.2;
      if (a === active || b === active) return 0.7;
      return 0.05;
    },
    [active],
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-white/5 bg-nebula">
      <svg
        viewBox="0 0 100 160"
        className="h-auto w-full"
        role="img"
        aria-label="Skills constellation graph showing technology expertise and connections"
      >
        <defs>
          {/* Glow filter for active nodes */}
          <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Shooting star gradient */}
          <linearGradient id="shooting-star" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e0e6ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#e0e6ff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#6c63ff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Background particles — twinkle */}
        {Array.from({ length: 50 }, (_, i) => (
          <circle
            key={`star-${i}`}
            cx={Math.random() * 100}
            cy={Math.random() * 134}
            r={0.15}
            fill="#e0e6ff"
            opacity={0.15 + Math.random() * 0.2}
          >
            <animate
              attributeName="opacity"
              values={`${0.1 + Math.random() * 0.15};${0.3 + Math.random() * 0.2};${0.1 + Math.random() * 0.15}`}
              dur={`${2 + Math.random() * 3}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Shooting star animations */}
        <line x1="-5" y1="15" x2="0" y2="14" stroke="url(#shooting-star)" strokeWidth="0.2" opacity="0">
          <animate attributeName="x1" values="-5;105" dur="4s" repeatCount="indefinite" begin="0s" />
          <animate attributeName="y1" values="15;10" dur="4s" repeatCount="indefinite" begin="0s" />
          <animate attributeName="x2" values="0;110" dur="4s" repeatCount="indefinite" begin="0s" />
          <animate attributeName="y2" values="14;9" dur="4s" repeatCount="indefinite" begin="0s" />
          <animate attributeName="opacity" values="0;0;0.6;0.6;0" dur="4s" repeatCount="indefinite" begin="0s" />
        </line>
        <line x1="110" y1="70" x2="105" y2="71" stroke="url(#shooting-star)" strokeWidth="0.15" opacity="0">
          <animate attributeName="x1" values="110;-10" dur="5s" repeatCount="indefinite" begin="2.5s" />
          <animate attributeName="y1" values="70;75" dur="5s" repeatCount="indefinite" begin="2.5s" />
          <animate attributeName="x2" values="105;-15" dur="5s" repeatCount="indefinite" begin="2.5s" />
          <animate attributeName="y2" values="71;76" dur="5s" repeatCount="indefinite" begin="2.5s" />
          <animate attributeName="opacity" values="0;0;0.5;0.5;0" dur="5s" repeatCount="indefinite" begin="2.5s" />
        </line>

        {/* Connections */}
        {connections.map(([a, b]) => {
          const sa = getSkill(a);
          const sb = getSkill(b);
          if (!sa || !sb) return null;
          return (
            <line
              key={`${a}-${b}`}
              x1={sa.x}
              y1={sa.y}
              x2={sb.x}
              y2={sb.y}
              stroke={
                active && (a === active || b === active)
                  ? groupColors[getSkill(active).group]
                  : '#6c63ff'
              }
              strokeWidth={active && (a === active || b === active) ? 0.25 : 0.12}
              opacity={getEdgeOpacity(a, b)}
              style={{ transition: 'opacity 0.3s, stroke-width 0.3s' }}
            />
          );
        })}

        {/* Nodes */}
        {skills.map((skill) => (
          <g
            key={skill.name}
            style={{ transition: 'opacity 0.3s' }}
            opacity={getNodeOpacity(skill.name)}
          >
            {/* Glow ring on hover */}
            {active === skill.name && (
              <circle
                cx={skill.x}
                cy={skill.y}
                r={skill.size + 1}
                fill="none"
                stroke={groupColors[skill.group]}
                strokeWidth="0.2"
                opacity={0.5}
              />
            )}

            <circle
              cx={skill.x}
              cy={skill.y}
              r={skill.size}
              fill={groupColors[skill.group]}
              className="cursor-pointer"
              filter={active === skill.name ? 'url(#node-glow)' : undefined}
              tabIndex={0}
              role="link"
              aria-label={`${skill.name} — ${skill.group}. Click to open documentation.`}
              onMouseEnter={() => handleMouseEnter(skill)}
              onMouseLeave={handleMouseLeave}
              onFocus={() => setFocused(skill.name)}
              onBlur={() => setFocused(null)}
              onClick={() => handleClick(skill.name)}
            >
              {/* Subtle idle breathing */}
              {!active && (
                <animate
                  attributeName="r"
                  values={`${skill.size};${skill.size + 0.25};${skill.size}`}
                  dur={`${3 + (skills.indexOf(skill) % 4)}s`}
                  repeatCount="indefinite"
                />
              )}
              <title>{`${skill.name} (${skill.group}) — click for docs`}</title>
            </circle>

            <text
              x={skill.x}
              y={skill.y + skill.size + 2.8}
              textAnchor="middle"
              fill="#e0e6ff"
              fontSize="1.9"
              fontFamily="Inter, sans-serif"
              fontWeight={active === skill.name ? '600' : '400'}
              style={{ pointerEvents: 'none' }}
            >
              {skill.name}
            </text>
          </g>
        ))}

        {/* Hover tooltip */}
        {tooltip && (
          <g style={{ pointerEvents: 'none' }}>
            <rect
              x={tooltip.x - 16}
              y={tooltip.y - 9}
              width={32}
              height={6}
              rx={1.2}
              fill="#1e1b4b"
              stroke={groupColors[getSkill(tooltip.name)?.group] || '#6c63ff'}
              strokeWidth="0.3"
              opacity={0.95}
            />
            <text
              x={tooltip.x}
              y={tooltip.y - 5.2}
              textAnchor="middle"
              fill="#e0e6ff"
              fontSize="1.7"
              fontFamily="Inter, sans-serif"
              fontWeight="500"
            >
              {`Click to explore ${tooltip.name} docs ↗`}
            </text>
          </g>
        )}
      </svg>

      {/* Legend */}
      <div className="relative overflow-hidden border-t border-white/5 px-4 py-3">
        {/* Gradient fades for mobile scroll */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-6 bg-gradient-to-r from-nebula to-transparent md:hidden" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-6 bg-gradient-to-l from-nebula to-transparent md:hidden" />
        <div className="flex justify-center gap-6 text-xs text-cosmos-muted md:flex-wrap">
          <div className="flex animate-legend-scroll gap-6 whitespace-nowrap md:animate-none md:flex-wrap md:justify-center">
            {Object.entries(groupColors).map(([group, color]) => (
              <span key={group} className="flex items-center gap-1.5 capitalize">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                />
                {group}
              </span>
            ))}
            {/* Duplicate set for seamless mobile loop */}
            {Object.entries(groupColors).map(([group, color]) => (
              <span key={`dup-${group}`} className="flex items-center gap-1.5 capitalize md:hidden">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                />
                {group}
              </span>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes legend-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-legend-scroll {
            animation: legend-scroll 12s linear infinite;
          }
          @media (min-width: 768px) {
            .animate-legend-scroll {
              animation: none;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
