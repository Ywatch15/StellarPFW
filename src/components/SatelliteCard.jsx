// FILE: src/components/SatelliteCard.jsx
// Modal card that expands from a project card — Framer Motion transitions
// Lazy-loads detail content + optional demo iframe
import React, { useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } },
};

/**
 * @param {{ project: object | null, onClose: () => void }} props
 */
export default function SatelliteCard({ project, onClose }) {
  const dialogRef = useRef(null);

  // Focus trap
  useEffect(() => {
    if (project && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [project]);

  // Close on Escape
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          onKeyDown={handleKeyDown}
          role="presentation"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-void/80 backdrop-blur-sm" />

          {/* Card */}
          <motion.article
            ref={dialogRef}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-nebula p-5 sm:p-8"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={`Project details: ${project.title}`}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-cosmos-muted transition-colors hover:bg-white/10 hover:text-stardust"
              aria-label="Close project details"
            >
              ✕
            </button>

            {/* Planet header */}
            <div
              className="mx-auto mb-4 h-20 w-20 rounded-full sm:mb-6 sm:h-32 sm:w-32"
              style={{
                background: `radial-gradient(circle at 35% 35%, ${project.color}88, ${project.color}22)`,
              }}
              aria-hidden="true"
            />

            <h2 className="font-heading text-2xl font-bold text-stardust">
              {project.title}
            </h2>
            <p className="mt-3 text-cosmos-muted">{project.description}</p>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-comet/10 px-3 py-1 text-xs text-comet"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Detail content placeholder */}
            <div className="mt-6 rounded-lg border border-white/5 bg-void/50 p-4 text-sm text-cosmos-muted">
              <p>
                <strong className="text-stardust">Mission Brief:</strong> This
                project showcases full-stack development with real-time features,
                responsive design, and performance optimization.
              </p>
              <p className="mt-2">
                <strong className="text-stardust">Stack:</strong>{' '}
                {project.tags?.join(', ')}
              </p>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-lg bg-comet px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-comet/80"
                  aria-label={`View live demo of ${project.title}`}
                >
                  Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-lg border border-white/10 px-4 py-2.5 text-center text-sm font-semibold text-stardust transition-colors hover:border-aurora hover:text-aurora ${project.demo ? 'flex-1' : 'w-full'}`}
                  aria-label={`View source code of ${project.title}`}
                >
                  View Code
                </a>
              )}
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
