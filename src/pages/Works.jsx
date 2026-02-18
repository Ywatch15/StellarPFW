// FILE: src/pages/Works.jsx
// Solar System page — interactive sun + orbiting project planets
import React from 'react';
import useSEO from '../hooks/useSEO';
import SolarSystem from '../components/SolarSystem';

export default function Works() {
  useSEO({
    title: 'Works',
    description:
      'Explore an interactive solar system of projects — deployed apps orbiting the sun, repos as planets, and a star leading to GitHub.',
  });

  return (
    <section aria-label="Projects">
      <SolarSystem />
    </section>
  );
}
