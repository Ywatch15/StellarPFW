// FILE: src/components/FallbackHero.jsx
// Semantic HTML+CSS fallback when WebGL is unavailable
import React from 'react';

export default function FallbackHero() {
  return (
    <section
      className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 text-center"
      aria-label="Hero section"
    >
      {/* Gradient orb placeholder */}
      <div className="mb-8 h-40 w-40 rounded-full bg-gradient-to-br from-comet to-aurora opacity-80 blur-sm" />

      <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        <span className="text-gradient-aurora">Stellar</span>{' '}
        <span className="text-stardust">Developer</span>
      </h1>

      <p className="mt-4 max-w-lg text-lg text-cosmos-muted">
        Full-stack engineer crafting performant, accessible digital experiences.
        Explore my orbit to learn more.
      </p>

      <div className="mt-8 flex gap-4">
        <a
          href="/works"
          className="rounded-lg bg-comet px-6 py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-comet/80 focus-visible:ring-2 focus-visible:ring-aurora"
        >
          View Projects
        </a>
        <a
          href="/contact"
          className="rounded-lg border border-cosmos-muted px-6 py-3 font-heading text-sm font-semibold text-stardust transition-colors hover:border-aurora hover:text-aurora"
        >
          Get in Touch
        </a>
      </div>
    </section>
  );
}
