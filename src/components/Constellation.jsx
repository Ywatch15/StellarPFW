// FILE: src/components/Constellation.jsx
// SVG-based skills constellation with hover-highlight, tooltips & doc links
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';

const skills = [
  // ── Frontend (14) ──
  { name: 'HTML5',        x: 8,  y: 8,   size: 1.2, group: 'frontend' },
  { name: 'CSS3',         x: 24, y: 12,  size: 1.2, group: 'frontend' },
  { name: 'JavaScript',   x: 42, y: 8,   size: 1.5, group: 'frontend' },
  { name: 'TypeScript',   x: 62, y: 12,  size: 1.3, group: 'frontend' },
  { name: 'React',        x: 80, y: 8,   size: 1.6, group: 'frontend' },
  { name: 'Next.js',      x: 94, y: 16,  size: 1.3, group: 'frontend' },
  { name: 'Bootstrap',    x: 6,  y: 24,  size: 1.0, group: 'frontend' },
  { name: 'jQuery',       x: 20, y: 28,  size: 0.9, group: 'frontend' },
  { name: 'Tailwind',     x: 36, y: 24,  size: 1.2, group: 'frontend' },
  { name: 'MUI',          x: 50, y: 28,  size: 1.0, group: 'frontend' },
  { name: 'Vite',         x: 64, y: 24,  size: 1.1, group: 'frontend' },
  { name: 'Redux',        x: 80, y: 28,  size: 1.1, group: 'frontend' },
  { name: 'React Router', x: 26, y: 38,  size: 1.0, group: 'frontend' },
  { name: 'Context API',  x: 50, y: 38,  size: 0.9, group: 'frontend' },

  // ── Backend (7) ──
  { name: 'Node.js',      x: 14, y: 50,  size: 1.4, group: 'backend' },
  { name: 'Express',      x: 32, y: 54,  size: 1.2, group: 'backend' },
  { name: 'GraphQL',      x: 50, y: 50,  size: 1.1, group: 'backend' },
  { name: 'JWT',          x: 66, y: 54,  size: 1.0, group: 'backend' },
  { name: 'Bun',          x: 82, y: 50,  size: 1.0, group: 'backend' },
  { name: 'Nodemon',      x: 22, y: 64,  size: 0.9, group: 'backend' },
  { name: 'EJS',          x: 40, y: 64,  size: 0.9, group: 'backend' },

  // ── Languages (4) ──
  { name: 'C++',          x: 8,  y: 76,  size: 1.2, group: 'languages' },
  { name: 'C',            x: 22, y: 80,  size: 1.1, group: 'languages' },
  { name: 'Python',       x: 38, y: 76,  size: 1.3, group: 'languages' },
  { name: 'Markdown',     x: 56, y: 80,  size: 0.9, group: 'languages' },

  // ── Databases (2) ──
  { name: 'MongoDB',      x: 74, y: 76,  size: 1.3, group: 'databases' },
  { name: 'MySQL',        x: 90, y: 80,  size: 1.2, group: 'databases' },

  // ── DevOps & Cloud (6) ──
  { name: 'Vercel',       x: 6,  y: 92,  size: 1.0, group: 'devops' },
  { name: 'Render',       x: 20, y: 96,  size: 1.0, group: 'devops' },
  { name: 'AWS',          x: 36, y: 92,  size: 1.2, group: 'devops' },
  { name: 'Nginx',        x: 52, y: 96,  size: 1.0, group: 'devops' },
  { name: 'Jenkins',      x: 68, y: 92,  size: 1.0, group: 'devops' },
  { name: 'Kubernetes',   x: 86, y: 96,  size: 1.1, group: 'devops' },

  // ── Tools (10) ──
  { name: 'Git',          x: 6,  y: 108, size: 1.1, group: 'tools' },
  { name: 'GitHub',       x: 20, y: 112, size: 1.1, group: 'tools' },
  { name: 'NPM',          x: 34, y: 108, size: 1.0, group: 'tools' },
  { name: 'Postman',      x: 48, y: 112, size: 1.0, group: 'tools' },
  { name: 'PowerShell',   x: 64, y: 108, size: 0.9, group: 'tools' },
  { name: 'Prettier',     x: 80, y: 112, size: 0.9, group: 'tools' },
  { name: 'Win Terminal', x: 10, y: 122, size: 0.9, group: 'tools' },
  { name: 'Canva',        x: 28, y: 122, size: 0.9, group: 'tools' },
  { name: 'Anaconda',     x: 46, y: 122, size: 1.0, group: 'tools' },
  { name: 'OpenCV',       x: 66, y: 122, size: 1.0, group: 'tools' },
];

// Official documentation URLs for each skill
const docUrls = {
  'HTML5':        'https://developer.mozilla.org/en-US/docs/Web/HTML',
  'CSS3':         'https://developer.mozilla.org/en-US/docs/Web/CSS',
  'JavaScript':   'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  'TypeScript':   'https://www.typescriptlang.org/docs/',
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
  'GraphQL':      'https://graphql.org/learn/',
  'JWT':          'https://jwt.io/introduction',
  'Bun':          'https://bun.sh/docs',
  'Nodemon':      'https://nodemon.io/',
  'EJS':          'https://ejs.co/#docs',
  'C++':          'https://en.cppreference.com/w/',
  'C':            'https://en.cppreference.com/w/c',
  'Python':       'https://docs.python.org/3/',
  'Markdown':     'https://www.markdownguide.org/',
  'MongoDB':      'https://www.mongodb.com/docs/',
  'MySQL':        'https://dev.mysql.com/doc/',
  'Vercel':       'https://vercel.com/docs',
  'Render':       'https://docs.render.com/',
  'AWS':          'https://docs.aws.amazon.com/',
  'Nginx':        'https://nginx.org/en/docs/',
  'Jenkins':      'https://www.jenkins.io/doc/',
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
};

const connections = [
  // Frontend chain
  ['HTML5', 'CSS3'],
  ['CSS3', 'JavaScript'],
  ['JavaScript', 'TypeScript'],
  ['JavaScript', 'React'],
  ['TypeScript', 'React'],
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
  ['TypeScript', 'Node.js'],
  ['React', 'Express'],
  ['Next.js', 'Node.js'],

  // Backend chain
  ['Node.js', 'Express'],
  ['Express', 'GraphQL'],
  ['Express', 'JWT'],
  ['Node.js', 'Bun'],
  ['Node.js', 'Nodemon'],
  ['Express', 'EJS'],
  ['GraphQL', 'JWT'],

  // Languages
  ['C++', 'C'],
  ['C++', 'Python'],
  ['Python', 'Node.js'],

  // Databases ↔ Backend
  ['MongoDB', 'Express'],
  ['MongoDB', 'Node.js'],
  ['MySQL', 'Node.js'],
  ['MySQL', 'Express'],

  // DevOps
  ['Vercel', 'Next.js'],
  ['Render', 'Node.js'],
  ['AWS', 'Kubernetes'],
  ['Nginx', 'Node.js'],
  ['Jenkins', 'Git'],
  ['Kubernetes', 'Jenkins'],
  ['AWS', 'Nginx'],

  // Tools
  ['Git', 'GitHub'],
  ['NPM', 'Node.js'],
  ['Postman', 'Express'],
  ['PowerShell', 'Win Terminal'],
  ['Anaconda', 'Python'],
  ['OpenCV', 'Python'],
  ['Prettier', 'Vite'],
  ['Canva', 'CSS3'],
];

const groupColors = {
  frontend: '#6c63ff',
  backend: '#38bdf8',
  languages: '#facc15',
  databases: '#f97316',
  devops: '#22d3ee',
  tools: '#a78bfa',
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
        viewBox="0 0 100 134"
        className="h-auto w-full"
        role="img"
        aria-label="Skills constellation graph showing technology expertise and connections"
      >
        {/* Background particles */}
        {Array.from({ length: 50 }, (_, i) => (
          <circle
            key={`star-${i}`}
            cx={Math.random() * 100}
            cy={Math.random() * 134}
            r={0.15}
            fill="#e0e6ff"
            opacity={0.15 + Math.random() * 0.2}
          />
        ))}

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
              tabIndex={0}
              role="link"
              aria-label={`${skill.name} — ${skill.group}. Click to open documentation.`}
              onMouseEnter={() => handleMouseEnter(skill)}
              onMouseLeave={handleMouseLeave}
              onFocus={() => setFocused(skill.name)}
              onBlur={() => setFocused(null)}
              onClick={() => handleClick(skill.name)}
            >
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
      <div className="flex justify-center gap-6 border-t border-white/5 px-4 py-3 text-xs text-cosmos-muted">
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
      </div>
    </div>
  );
}
