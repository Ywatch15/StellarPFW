// FILE: src/pages/Works.jsx
// Projects / Planetary System page with SatelliteCard modal — real projects
import React, { useState } from 'react';
import { motion } from 'motion/react';
import useSEO from '../hooks/useSEO';
import SatelliteCard from '../components/SatelliteCard';
import projects from '../data/projects.json';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function Works() {
  const [selectedProject, setSelectedProject] = useState(null);

  useSEO({
    title: 'Works',
    description: 'Explore space-themed project showcases — real-time apps, dashboards, e-commerce, and developer tools.',
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16" aria-label="Projects">
      <h1 className="font-heading text-3xl font-bold sm:text-4xl">
        <span className="text-gradient-aurora">Planetary</span> System
      </h1>
      <p className="mt-2 text-cosmos-muted">
        Each project is a world of its own. Click to explore.
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.article
            key={project.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={cardVariants}
            className="group cursor-pointer rounded-2xl border border-white/5 bg-nebula p-6 transition-colors hover:border-comet/30"
            tabIndex={0}
            role="button"
            aria-label={`View project: ${project.title}`}
            onClick={() => setSelectedProject(project)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedProject(project);
              }
            }}
          >
            {/* Planet placeholder sphere */}
            <div
              className="mx-auto mb-6 h-24 w-24 rounded-full opacity-80 transition-transform group-hover:scale-110"
              style={{
                background: `radial-gradient(circle at 35% 35%, ${project.color}88, ${project.color}22)`,
              }}
              aria-hidden="true"
            />
            <h2 className="font-heading text-lg font-semibold text-stardust">
              {project.title}
            </h2>
            <p className="mt-2 text-sm text-cosmos-muted">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-comet/10 px-3 py-1 text-xs text-comet"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>

      {/* Project detail modal */}
      <SatelliteCard
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
