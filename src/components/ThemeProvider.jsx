// FILE: src/components/ThemeProvider.jsx
// Theme toggle: Nebula (default) / Dark / Minimal
// Persists choice to localStorage, respects system preference
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const THEMES = {
  nebula: {
    label: 'Nebula',
    class: 'theme-nebula',
    bg: '#050816',
    accent: '#6c63ff',
    text: '#e0e6ff',
  },
  dark: {
    label: 'Dark',
    class: 'theme-dark',
    bg: '#000000',
    accent: '#a78bfa',
    text: '#f8fafc',
  },
  minimal: {
    label: 'Minimal',
    class: 'theme-minimal',
    bg: '#f8fafc',
    accent: '#1e293b',
    text: '#0f172a',
  },
};

const ThemeContext = createContext({
  theme: 'nebula',
  themes: THEMES,
  setTheme: () => {},
  cycleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'nebula';
    return localStorage.getItem('stellar-theme') || 'nebula';
  });

  const setTheme = useCallback((t) => {
    setThemeState(t);
    localStorage.setItem('stellar-theme', t);
  }, []);

  const cycleTheme = useCallback(() => {
    const keys = Object.keys(THEMES);
    const idx = keys.indexOf(theme);
    const next = keys[(idx + 1) % keys.length];
    setTheme(next);
  }, [theme, setTheme]);

  // Apply theme CSS custom properties
  useEffect(() => {
    const t = THEMES[theme];
    if (!t) return;

    const root = document.documentElement;
    root.style.setProperty('--color-void', t.bg);
    root.style.setProperty('--color-comet', t.accent);
    root.style.setProperty('--color-stardust', t.text);

    // Toggle class for Tailwind dark mode
    if (theme === 'minimal') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }

    // Update theme-color meta
    const meta =
      document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = t.bg;

    // Update body background (for flash prevention)
    document.body.style.backgroundColor = t.bg;
    document.body.style.color = t.text;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, themes: THEMES, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/** Theme toggle button */
export function ThemeToggle() {
  const { theme, themes, cycleTheme } = useTheme();
  const current = themes[theme];

  return (
    <button
      onClick={cycleTheme}
      className="fixed bottom-4 right-14 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-nebula text-sm transition-colors hover:border-aurora sm:right-16 sm:h-10 sm:w-10"
      aria-label={`Switch theme. Current: ${current.label}`}
      title={`Theme: ${current.label}`}
    >
      <span
        className="h-4 w-4 rounded-full"
        style={{ backgroundColor: current.accent }}
        aria-hidden="true"
      />
    </button>
  );
}
