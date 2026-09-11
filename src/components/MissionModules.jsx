// Capability section that turns the technology list into outcome-focused services.
const modules = [
  {
    number: '01',
    title: 'Full-stack systems',
    description:
      'Responsive products with thoughtful frontends, dependable APIs, and data flows that are easy to evolve.',
    stack: 'React · Node.js · MongoDB · PostgreSQL',
    accent: '#6c63ff',
  },
  {
    number: '02',
    title: 'Immersive interfaces',
    description:
      'High-impact web experiences that use motion and 3D with purpose, without sacrificing clarity or speed.',
    stack: 'Three.js · WebGL · Motion · Accessibility',
    accent: '#38bdf8',
  },
  {
    number: '03',
    title: 'Delivery & infrastructure',
    description:
      'Repeatable paths from commit to deployment, with practical automation and a focus on resilient releases.',
    stack: 'Docker · GitHub Actions · Vercel · CI/CD',
    accent: '#a78bfa',
  },
  {
    number: '04',
    title: 'Problem solving',
    description:
      'Algorithmic thinking applied to real product constraints: performance, maintainability, and useful outcomes.',
    stack: 'DSA · Python · Redis · WebSockets',
    accent: '#facc15',
  },
];

export default function MissionModules() {
  return (
    <section
      className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24"
      aria-labelledby="mission-modules-title"
    >
      <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-aurora/80">
            Mission modules
          </p>
          <h2
            id="mission-modules-title"
            className="mt-2 font-heading text-3xl font-bold tracking-tight text-stardust sm:text-4xl"
          >
            What I build
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-cosmos-muted sm:text-right">
          Capabilities mapped to the kind of outcomes a project actually needs—not just a
          list of tools.
        </p>
      </div>

      <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-nebula/35 backdrop-blur-sm">
        {modules.map((module) => (
          <details key={module.number} className="group p-5 sm:p-6">
            <summary className="flex cursor-pointer list-none items-center gap-4 [&::-webkit-details-marker]:hidden">
              <span
                className="font-heading text-sm font-bold"
                style={{ color: module.accent }}
              >
                {module.number}
              </span>
              <span className="flex-1 font-heading text-base font-semibold text-stardust sm:text-lg">
                {module.title}
              </span>
              <span
                aria-hidden="true"
                className="text-xl text-cosmos-muted transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="ml-9 mt-4 grid gap-3 border-l border-white/10 pl-4 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-8">
              <p className="max-w-2xl text-sm leading-relaxed text-cosmos-muted sm:text-base">
                {module.description}
              </p>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-stardust/60 sm:text-right">
                {module.stack}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
