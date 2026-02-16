// FILE: src/components/Layout.jsx
// Root layout wrapper with navbar, starfield, audio, cursor, theme, and main content area
import React from 'react';
import Navbar from './Navbar';
import Starfield from './Starfield';
import { AudioProvider, AudioToggle } from './AudioEngine';
import OrbitalCursor from './OrbitalCursor';
import { ThemeToggle } from './ThemeProvider';
import AnalyticsBanner from './AnalyticsBanner';
import PageTransition from './PageTransition';

export default function Layout() {
  return (
    <AudioProvider>
      <div className="relative min-h-screen overflow-x-hidden">
        <Starfield />
        <Navbar />
        <main className="pt-20">
          <PageTransition />
        </main>
        <footer className="border-t border-white/5 px-4 py-6 text-center text-xs text-cosmos-muted sm:px-6 sm:py-8 sm:text-sm">
          <p>© {new Date().getFullYear()} Stellar Portfolio. Crafted by Sundram.</p>
        </footer>
        <AudioToggle />
        <ThemeToggle />
        <OrbitalCursor />
        <AnalyticsBanner />
      </div>
    </AudioProvider>
  );
}
