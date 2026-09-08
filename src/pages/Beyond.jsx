// FILE: src/pages/Beyond.jsx
// Beyond is an interactive engineering observatory, not a second project grid.
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import BlackHole from '../components/BlackHole';
import useSEO from '../hooks/useSEO';
import '../styles/beyond-observatory.css';

const chapters = [
  { id: 'beyond-now', label: 'Current orbit', short: 'NOW', color: '#38bdf8' },
  { id: 'engineering-laws', label: 'Engineering laws', short: 'LAWS', color: '#facc15' },
  { id: 'incident-field', label: 'Incident field', short: 'INCIDENTS', color: '#f43f5e' },
  { id: 'active-systems', label: 'Active systems', short: 'SYSTEMS', color: '#a78bfa' },
  { id: 'field-notes', label: 'Field notes', short: 'NOTES', color: '#22d3ee' },
  { id: 'forward-vector', label: 'Forward vector', short: 'NEXT', color: '#22c55e' },
];

const laws = [
  {
    id: 'law-01', label: 'LAW 01', title: 'Complexity must earn its place', color: '#facc15',
    text: 'I prefer starting with the smallest architecture that solves the actual problem. Complexity should appear because the system needs it, not because the technology makes it possible.',
  },
  {
    id: 'law-02', label: 'LAW 02', title: 'Observability beats cleverness', color: '#38bdf8',
    text: 'When something breaks in production, I want enough context to understand what happened, where it happened, and what the user was trying to do.',
  },
  {
    id: 'law-03', label: 'LAW 03', title: 'Test before refactoring', color: '#a78bfa',
    text: 'Refactoring without a safety net can make an uncertain system harder to reason about. I establish behaviour first, then change structure.',
  },
  {
    id: 'law-04', label: 'LAW 04', title: 'Production is the real environment', color: '#22c55e',
    text: 'Browser behaviour, deployment constraints, caching, authentication boundaries, timeouts, and real user behaviour are part of the engineering problem.',
  },
];

const incidents = [
  {
    id: 'lcp', label: '~25s LCP', title: 'The 25-second first paint', color: '#f43f5e',
    summary: 'The app was live, but the first usable experience took too long.',
    stages: [
      ['DETECTED', 'Users were waiting too long for the first usable experience.'],
      ['INVESTIGATED', 'Loading strategy, caching, and resource priorities became the search area.'],
      ['ROOT CAUSE', 'The initial work made the product technically available but practically slow.'],
      ['FIXED', 'Caching and loading optimizations were shipped and validated before merging.'],
      ['LESSON', '“Deployed” is not the same as “usable.”'],
    ],
  },
  {
    id: 'mobile-auth', label: 'MOBILE AUTH', title: 'The session that disappeared', color: '#facc15',
    summary: 'Mobile users were unexpectedly logged out after closing the app.',
    stages: [
      ['DETECTED', 'Session persistence failed after a mobile app was closed.'],
      ['INVESTIGATED', 'The client was trying to read a browser-managed httpOnly cookie.'],
      ['ROOT CAUSE', 'A security boundary was treated as if it were ordinary client state.'],
      ['FIXED', 'Authentication handling was corrected so the browser managed the cookie properly.'],
      ['LESSON', 'Security boundaries in browsers are architectural facts.'],
    ],
  },
  {
    id: 'react-loop', label: 'REACT LOOP', title: 'The recursive render orbit', color: '#a78bfa',
    summary: 'useSyncExternalStore triggered a cached-snapshot and maximum-depth failure.',
    stages: [
      ['DETECTED', 'The render loop accelerated into “maximum update depth.”'],
      ['INVESTIGATED', 'The snapshot contract was inspected instead of patching symptoms.'],
      ['ROOT CAUSE', 'getSnapshot was not stable for the subscription boundary.'],
      ['FIXED', 'The store read path was made stable and the loop collapsed.'],
      ['LESSON', 'A small contract violation can become a system-wide orbit.'],
    ],
  },
  {
    id: 'sse', label: 'SSE 401', title: 'The reconnection spiral', color: '#f43f5e',
    summary: 'Unauthenticated pages repeatedly attempted to reconnect to the sync stream.',
    stages: [
      ['DETECTED', 'The client received 401 responses and immediately reconnected.'],
      ['INVESTIGATED', 'Authentication state and the /api/sync/stream boundary were separated.'],
      ['ROOT CAUSE', 'The stream was treated as available before the user was authenticated.'],
      ['FIXED', 'Connection gating and graceful reconnect behaviour were added.'],
      ['LESSON', 'A reconnect strategy needs to understand why a connection ended.'],
    ],
  },
  {
    id: 'vercel', label: 'VERCEL TIMEOUT', title: 'The serverless boundary', color: '#facc15',
    summary: 'Long-lived SSE connections had to survive a platform that is not indefinitely persistent.',
    stages: [
      ['DETECTED', 'A stream could outlive the serverless execution window.'],
      ['INVESTIGATED', 'The connection lifecycle was compared with Vercel function limits.'],
      ['ROOT CAUSE', 'Serverless does not mean permanently persistent.'],
      ['FIXED', 'The stream gained graceful reconnection before the platform timeout.'],
      ['LESSON', 'Infrastructure constraints belong in application architecture.'],
    ],
  },
  {
    id: 'pdf-font', label: 'PDF FONT', title: 'The font that existed locally', color: '#22c55e',
    summary: 'PDFKit’s standard Helvetica resolution failed inside a Vercel serverless deployment.',
    stages: [
      ['DETECTED', 'A production PDF path failed even though local generation worked.'],
      ['INVESTIGATED', 'The runtime’s font resolution and file tracing were inspected.'],
      ['ROOT CAUSE', 'The deployment environment did not contain the assumed standard font path.'],
      ['FIXED', 'Font embedding and file tracing made PDF generation explicit.'],
      ['LESSON', 'If production needs an asset, package the asset.'],
    ],
  },
];

const notes = [
  { id: 'offline', label: 'WHY RENTAL SOFTWARE NEEDS OFFLINE-FIRST UX', text: 'A field-facing product cannot assume a perfect connection when inventory and returns still have to happen.' },
  { id: 'serverless', label: 'WHAT SERVERLESS CHANGED ABOUT SSE', text: 'Authentication, reconnects, and platform timeouts become part of the architecture instead of an afterthought.' },
  { id: 'migration', label: 'WHY I MIGRATED MONGOOSE → PRISMA', text: 'CommandAtlas turned a migration into a deliberate architecture decision, documented as ADR-013, rather than a hidden rewrite.' },
  { id: 'lcp-note', label: 'WHAT A 25-SECOND LCP TAUGHT ME', text: 'A deployed feature is not finished until the first meaningful interaction respects the person waiting for it.' },
];

function scrollToChapter(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function useActiveChapter() {
  const [active, setActive] = useState(chapters[0].id);

  useEffect(() => {
    const targets = chapters.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-28% 0px -58% 0px', threshold: 0 });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return active;
}

function ChapterLabel({ eyebrow, title, description, color = '#38bdf8' }) {
  return (
    <div className="observatory-heading">
      <p className="observatory-eyebrow" style={{ color }}>{eyebrow}</p>
      <h2 className="font-heading text-2xl font-bold text-stardust sm:text-4xl">{title}</h2>
      <p className="observatory-heading__description">{description}</p>
    </div>
  );
}

function ObservatoryNav({ active }) {
  return (
    <nav className="observatory-nav" aria-label="Beyond chapters">
      <span className="observatory-nav__line" aria-hidden="true" />
      {chapters.map((chapter) => (
        <button
          key={chapter.id}
          type="button"
          className={`observatory-nav__item ${active === chapter.id ? 'is-active' : ''}`}
          style={{ '--chapter-color': chapter.color }}
          onClick={() => scrollToChapter(chapter.id)}
          aria-label={`Go to ${chapter.label}`}
          aria-current={active === chapter.id ? 'location' : undefined}
        >
          <span className="observatory-nav__dot" aria-hidden="true" />
          <span>{chapter.short}</span>
        </button>
      ))}
    </nav>
  );
}

function ObservatoryMap({ active }) {
  const nodes = [
    { id: 'beyond-now', label: 'NOW', color: '#38bdf8', className: 'orbit-node--top' },
    { id: 'engineering-laws', label: 'LAWS', color: '#facc15', className: 'orbit-node--right' },
    { id: 'incident-field', label: 'BATTLE LOG', color: '#f43f5e', className: 'orbit-node--bottom-right' },
    { id: 'active-systems', label: 'TENTDESK', color: '#a78bfa', className: 'orbit-node--bottom-left' },
    { id: 'field-notes', label: 'NOTES', color: '#22d3ee', className: 'orbit-node--left' },
    { id: 'forward-vector', label: 'FORWARD', color: '#22c55e', className: 'orbit-node--top-left' },
  ];

  return (
    <section className="observatory-map" aria-labelledby="builder-orbit-title">
      <div className="observatory-map__stars" aria-hidden="true" />
      <div className="observatory-map__header">
        <p className="observatory-eyebrow text-aurora">Spatial index · active route</p>
        <h2 id="builder-orbit-title" className="mt-2 font-heading text-xl font-semibold text-stardust sm:text-2xl">The builder&apos;s orbit</h2>
        <p className="mt-2 max-w-xl text-sm text-cosmos-muted">A map of the forces around the work. Select a node, or let the camera follow the signal as you scroll.</p>
      </div>
      <div className="observatory-map__stage">
        <div className="observatory-orbit observatory-orbit--outer" aria-hidden="true" />
        <div className="observatory-orbit observatory-orbit--inner" aria-hidden="true" />
        <div className="observatory-core">
          <span className="observatory-core__halo" aria-hidden="true" />
          <strong>SUNDRAM</strong>
          <span>ENGINEER · BUILDER</span>
          <span>FOUNDER / CTO</span>
        </div>
        {nodes.map((node) => (
          <button key={node.id} type="button" className={`orbit-node ${node.className} ${active === node.id ? 'is-active' : ''}`} style={{ '--node-color': node.color }} onClick={() => scrollToChapter(node.id)}>
            <span className="orbit-node__signal" aria-hidden="true" />
            <span className="orbit-node__label">{node.label}</span>
          </button>
        ))}
      </div>
      <p className="observatory-map__hint"><span className="observatory-pulse-dot" aria-hidden="true" /> Scroll to move the camera · select a node to lock the signal</p>
    </section>
  );
}

function CurrentOrbit() {
  return (
    <section id="beyond-now" data-observatory-chapter className="observatory-chapter observatory-chapter--now" aria-labelledby="current-orbit-title">
      <ChapterLabel eyebrow="Scene 02 · live transmission" title="Current orbit" description="TentDesk is the active system: deployed, used by customers, and being improved from the inside of production." />
      <div className="observatory-transmission observatory-transmission--live">
        <div className="transmission-beam" aria-hidden="true" />
        <div className="transmission-status"><span className="observatory-pulse-dot" /> LIVE TRANSMISSION</div>
        <div className="transmission-main">
          <div>
            <p className="transmission-date">SEPTEMBER 2026 · SIGNAL LOCKED</p>
            <h3 id="current-orbit-title" className="mt-3 font-heading text-2xl font-bold text-stardust sm:text-4xl">TentDesk</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-cosmos-muted">A multi-tenant rental and inventory management PWA for tent and event-rental businesses. I&apos;m building and operating it as founder and CTO, with early customers already using the system.</p>
          </div>
          <div className="transmission-readout" aria-label="TentDesk status">
            <span><i className="readout-dot readout-dot--green" /> IN PRODUCTION</span>
            <span><i className="readout-dot readout-dot--green" /> LIVE CUSTOMERS</span>
            <span><i className="readout-dot readout-dot--blue" /> ACTIVELY SHIPPING</span>
          </div>
        </div>
        <div className="telemetry-strip" aria-label="Current vector">
          <span className="telemetry-strip__label">CURRENT VECTOR</span>
          <span>Mobile UX</span><span>Offline / install flows</span><span>Inventory reliability</span><span>Production refinement</span>
        </div>
      </div>
      <div className="product-loop" aria-label="TentDesk product loop">
        <div className="product-loop__track" aria-hidden="true" />
        {['USER', 'PRODUCT', 'PRODUCTION', 'FEEDBACK', 'FIX', 'SHIP'].map((step, index) => (
          <div className="product-loop__node" key={step} style={{ '--loop-index': index }}><span>{step}</span></div>
        ))}
        <p className="product-loop__caption">The loop is the product: build → ship → observe → fix → ship again.</p>
      </div>
    </section>
  );
}

function EngineeringLaws() {
  const [selected, setSelected] = useState(laws[0].id);
  const law = laws.find((item) => item.id === selected) || laws[0];
  return (
    <section id="engineering-laws" data-observatory-chapter className="observatory-chapter observatory-chapter--laws" aria-labelledby="laws-title">
      <ChapterLabel eyebrow="Scene 03 · gravitational laws" title="Engineering laws" description="Specific opinions formed by shipping systems, not motivational quotes collected from the internet." color="#facc15" />
      <div className="law-orbit">
        <div className="law-orbit__ring" aria-hidden="true" />
        <div className="law-orbit__core"><span>DECISION</span><strong>GRAVITY</strong></div>
        {laws.map((item, index) => (
          <button key={item.id} type="button" className={`law-node law-node--${index + 1} ${selected === item.id ? 'is-active' : ''}`} style={{ '--law-color': item.color }} onClick={() => setSelected(item.id)} aria-pressed={selected === item.id}>
            <span>{item.label}</span><strong>{item.title}</strong>
          </button>
        ))}
      </div>
      <motion.div key={law.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="law-readout" style={{ '--law-color': law.color }}>
        <p className="observatory-eyebrow" style={{ color: law.color }}>{law.label} · frequency locked</p>
        <h3 className="mt-2 font-heading text-xl font-semibold text-stardust sm:text-2xl">{law.title}</h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cosmos-muted">{law.text}</p>
      </motion.div>
    </section>
  );
}

function IncidentField() {
  const [selected, setSelected] = useState(incidents[0].id);
  const incident = incidents.find((item) => item.id === selected) || incidents[0];
  return (
    <section id="incident-field" data-observatory-chapter className="observatory-chapter observatory-chapter--incidents" aria-labelledby="incident-field-title">
      <ChapterLabel eyebrow="Scene 04 · recovered telemetry" title="Incident field" description="Real production pressure, represented as anomalies around the active system. Select one to open its flight recorder." color="#f43f5e" />
      <div className="incident-map">
        <div className="incident-map__constellation" aria-hidden="true"><span /><span /><span /><span /></div>
        {incidents.map((item, index) => (
          <button key={item.id} type="button" className={`incident-beacon incident-beacon--${index + 1} ${selected === item.id ? 'is-active' : ''}`} style={{ '--incident-color': item.color }} onClick={() => setSelected(item.id)} aria-pressed={selected === item.id}>
            <span className="incident-beacon__flare" aria-hidden="true" /><span>{item.label}</span>
          </button>
        ))}
        <div className="incident-map__legend"><span className="legend-dot legend-dot--resolved" /> resolved signal <span className="legend-dot legend-dot--warning" /> production anomaly</div>
      </div>
      <motion.article key={incident.id} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} className="incident-readout" style={{ '--incident-color': incident.color }}>
        <div className="incident-readout__topline"><span className="observatory-eyebrow" style={{ color: incident.color }}>INCIDENT · STATUS: RESOLVED</span><span className="incident-readout__id">{incident.label}</span></div>
        <h3 id="incident-field-title" className="mt-3 font-heading text-xl font-semibold text-stardust sm:text-3xl">{incident.title}</h3>
        <p className="mt-2 text-sm text-cosmos-muted">{incident.summary}</p>
        <div className="incident-stages">
          {incident.stages.map(([stage, text], index) => (
            <div className="incident-stage" key={stage} style={{ '--stage-index': index }}><span className="incident-stage__marker">{String(index + 1).padStart(2, '0')}</span><div><p className="font-mono text-[0.62rem] tracking-[0.2em]" style={{ color: incident.color }}>{stage}</p><p className="mt-1 text-sm leading-relaxed text-cosmos-muted">{text}</p></div></div>
          ))}
        </div>
      </motion.article>
    </section>
  );
}

function ActiveSystems() {
  return (
    <section id="active-systems" data-observatory-chapter className="observatory-chapter observatory-chapter--systems" aria-labelledby="systems-title">
      <ChapterLabel eyebrow="Scene 05 · system architecture" title="Two different bets" description="TentDesk and CommandAtlas share an engineering instinct, but they solve very different human problems." color="#a78bfa" />
      <div className="system-trajectory">
        <div className="system-trajectory__line" aria-hidden="true"><span /></div>
        <article className="system-dock system-dock--primary">
          <p className="observatory-eyebrow text-aurora">ACTIVE SYSTEM · 01</p>
          <h3 id="systems-title" className="mt-2 font-heading text-2xl font-bold text-stardust">TentDesk</h3>
          <p className="mt-2 text-sm leading-relaxed text-cosmos-muted">Operational software for rental businesses: inventory, rentals, returns, customers, payments, events, expenses, wages, PDFs, and real-time synchronization.</p>
          <div className="system-stack"><span>Next.js</span><span>Prisma</span><span>MongoDB</span><span>TanStack Query</span><span>PWA</span><span>SSE</span></div>
          <p className="system-dock__status"><i className="readout-dot readout-dot--green" /> DEPLOYED · ACTIVELY OPERATED</p>
        </article>
        <article className="system-dock system-dock--secondary">
          <p className="observatory-eyebrow" style={{ color: '#a78bfa' }}>KNOWLEDGE CONSTELLATION · 02</p>
          <h3 className="mt-2 font-heading text-2xl font-bold text-stardust">CommandAtlas</h3>
          <p className="mt-2 text-sm leading-relaxed text-cosmos-muted">An offline-first command reference where Markdown becomes validated static packs and a local search index. 366 commands across 21 canonical topics.</p>
          <div className="system-stack"><span>Next.js</span><span>Express</span><span>Prisma</span><span>PostgreSQL</span><span>Dexie</span><span>No AI by design</span></div>
          <p className="system-dock__status"><i className="readout-dot readout-dot--blue" /> BUILDING · RESPONSIVE PASS</p>
        </article>
      </div>
      <p className="system-principle"><span>CONNECTIVE TISSUE</span> I am learning DevOps because “git push” is not the end of a product. It is the start of deployment, observability, recovery, and responsibility.</p>
    </section>
  );
}

function FieldNotes() {
  const [selected, setSelected] = useState(notes[0].id);
  const note = notes.find((item) => item.id === selected) || notes[0];
  return (
    <section id="field-notes" data-observatory-chapter className="observatory-chapter observatory-chapter--notes" aria-labelledby="field-notes-title">
      <ChapterLabel eyebrow="Scene 06 · intercepted transmissions" title="Field notes" description="Short records from the engineering process. The goal is not to sound certain; it is to leave a useful trail." color="#22d3ee" />
      <div className="field-notes">
        <div className="field-notes__signals" role="list" aria-label="Available field notes">
          {notes.map((item, index) => (
            <button key={item.id} type="button" role="listitem" className={`note-signal ${selected === item.id ? 'is-active' : ''}`} onClick={() => setSelected(item.id)} aria-pressed={selected === item.id}>
              <span className="note-signal__index">0{index + 1}</span><span>{item.label}</span><span className="note-signal__arrow">↗</span>
            </button>
          ))}
        </div>
        <motion.article key={note.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="note-reading" aria-labelledby="field-notes-title">
          <p className="observatory-eyebrow text-aurora">TRANSMISSION DECODED · {note.id.toUpperCase()}</p>
          <h3 id="field-notes-title" className="mt-3 font-heading text-xl font-semibold text-stardust sm:text-2xl">{note.label}</h3>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-cosmos-muted">{note.text}</p>
          <span className="note-reading__cursor" aria-hidden="true">_</span>
        </motion.article>
      </div>
    </section>
  );
}

function ForwardVector() {
  return (
    <section id="forward-vector" data-observatory-chapter className="observatory-chapter observatory-chapter--forward" aria-labelledby="forward-vector-title">
      <div className="forward-vector__trajectory" aria-hidden="true"><span /><span /><span /></div>
      <ChapterLabel eyebrow="Scene 07 · unresolved region" title="Forward vector" description="The trajectory continues beyond the visible map. These are directions I am exploring, not expertise I am claiming." color="#22c55e" />
      <div className="forward-vector__labels" aria-label="Areas being explored"><span>AI / ML</span><span>DEVOPS</span><span>DISTRIBUTED SYSTEMS</span><span>PRODUCT</span><span>???</span></div>
      <p id="forward-vector-title" className="forward-vector__closing">Still building.<br />Still breaking things.<br /><em>Still learning why they broke.</em></p>
    </section>
  );
}

export default function Beyond() {
  const activeChapter = useActiveChapter();

  useSEO({
    title: 'Beyond',
    description: 'Beyond the Event Horizon — an interactive engineering observatory of Sundram Pathak\'s systems, decisions, incidents, and direction.',
  });

  return (
    <section className="beyond-observatory" aria-label="Beyond the Event Horizon engineering observatory">
      <div className="beyond-observatory__ambient" aria-hidden="true"><span /><span /><span /></div>
      <ObservatoryNav active={activeChapter} />

      <header className="beyond-hero">
        <p className="observatory-eyebrow text-aurora">SOFTWARE ENGINEER · BUILDER · FOUNDER / CTO</p>
        <h1 className="mt-4 font-heading text-4xl font-bold sm:text-6xl md:text-7xl"><span className="text-gradient-aurora">Beyond</span> <span className="text-stardust">the Event Horizon</span></h1>
        <p className="beyond-hero__subtitle">The work behind the work.</p>
        <p className="beyond-hero__description">Projects show what I build. Beyond shows how I think, what breaks, what I learn, and where I am heading next.</p>
      </header>

      {/* The black-hole visual and its animations are intentionally kept intact. */}
      <div className="beyond-hero__black-hole"><BlackHole interactive /></div>
      <p className="beyond-hero__warning">⚠ Warning: You are approaching the event horizon. Information beyond this point may permanently expand your perspective.</p>

      {/* Existing transmission preserved as a live signal, not removed. */}
      <div className="observatory-transmission observatory-transmission--ai">
        <div className="transmission-status"><span className="observatory-pulse-dot" /> CURRENT TRANSMISSION</div>
        <div className="transmission-main">
          <div><h2 className="font-heading text-xl font-bold text-stardust sm:text-2xl">Building useful intelligence</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-cosmos-muted">Exploring how AI can make interfaces more helpful without making them feel less human—one focused experiment at a time.</p></div>
          <div className="transmission-readout"><span>SIGNAL STRENGTH</span><div className="transmission-bars" aria-label="Signal strength 80 percent">{[0, 1, 2, 3, 4].map((bar) => <i key={bar} className={bar < 4 ? 'is-on' : ''} style={{ animationDelay: `${bar * 0.08}s` }} />)}</div><small>80% focused</small></div>
        </div>
      </div>

      <ObservatoryMap active={activeChapter} />
      <main className="beyond-observatory__chapters">
        <CurrentOrbit />
        <EngineeringLaws />
        <IncidentField />
        <ActiveSystems />
        <FieldNotes />
        <ForwardVector />
      </main>
    </section>
  );
}
