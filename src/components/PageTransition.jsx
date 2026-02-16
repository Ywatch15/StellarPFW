// FILE: src/components/PageTransition.jsx
// Warp-speed page transition with AnimatePresence + motion
import React from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.96,
    filter: 'blur(6px)',
  },
  enter: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 1.03,
    filter: 'blur(4px)',
    transition: {
      duration: 0.3,
      ease: [0.55, 0, 1, 0.45],
    },
  },
};

export default function PageTransition() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{ willChange: 'opacity, transform, filter' }}
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  );
}
