// Themed fallback for unknown routes and stale shared project links.
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';

export default function NotFound() {
  useSEO({
    title: 'Signal Lost',
    description: 'The requested Stellar Portfolio route could not be found.',
  });

  return (
    <section
      className="mx-auto flex min-h-[65vh] max-w-2xl items-center justify-center px-4 py-16 text-center sm:px-6"
      aria-labelledby="signal-lost-title"
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-nebula/70 px-6 py-10 shadow-[0_0_60px_rgba(108,99,255,0.12)] backdrop-blur-sm sm:px-12 sm:py-14">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-aurora/20"
          aria-hidden="true"
        />
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-aurora/80">
          Transmission interrupted // 404
        </p>
        <h1
          id="signal-lost-title"
          className="mt-4 font-heading text-4xl font-bold sm:text-6xl"
        >
          <span className="text-gradient-aurora">Signal</span> lost
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cosmos-muted sm:text-base">
          This coordinate does not exist in the current star chart. Return to the launch
          pad or browse the mission archive.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="rounded-lg bg-comet px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-comet/80 focus-visible:ring-2 focus-visible:ring-aurora"
          >
            Return to launch pad
          </Link>
          <Link
            to="/works"
            className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold text-stardust transition-colors hover:border-aurora hover:text-aurora focus-visible:ring-2 focus-visible:ring-aurora"
          >
            Browse missions
          </Link>
        </div>
      </div>
    </section>
  );
}
