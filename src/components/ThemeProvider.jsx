// FILE: src/components/ThemeProvider.jsx
// The portfolio is intentionally dark-only; this wrapper keeps the cosmic
// palette stable without exposing a second theme or a mode switch.
import React, { useEffect } from 'react';

export function ThemeProvider({ children }) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('dark');
    root.classList.remove('light', 'theme-dark');
    root.style.setProperty('--color-void', '#050816');
    root.style.setProperty('--color-nebula', '#0a0f2c');
    root.style.setProperty('--color-stardust', '#e0e6ff');
    root.style.setProperty('--color-comet', '#6c63ff');
    root.style.setProperty('--color-aurora', '#38bdf8');
    root.style.setProperty('--color-solar', '#facc15');
    root.style.setProperty('--color-supernova', '#f43f5e');
    root.style.setProperty('--color-cosmos-muted', '#64748b');
    document.body.style.backgroundColor = '#050816';
    document.body.style.color = '#e0e6ff';

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = '#050816';
  }, []);

  return children;
}
