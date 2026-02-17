// FILE: src/components/Navbar.jsx
// Accessible top navigation bar with mobile hamburger menu
import { useState, useCallback, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { HomeIcon, WorksIcon, AboutIcon, BeyondIcon, ContactIcon } from './NavIcons';

const links = [
  { to: '/', label: 'Home', Icon: HomeIcon },
  { to: '/works', label: 'Works', Icon: WorksIcon },
  { to: '/about', label: 'About', Icon: AboutIcon },
  { to: '/beyond', label: 'Beyond', Icon: BeyondIcon },
  { to: '/contact', label: 'Contact', Icon: ContactIcon },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const toggleMenu = useCallback(() => setMenuOpen((o) => !o), []);

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4"
        role="navigation"
        aria-label="Main navigation"
      >
        <NavLink
          to="/"
          className="font-heading text-lg font-bold text-stardust transition-colors hover:text-comet sm:text-xl"
          aria-label="Stellar Portfolio Home"
        >
          ☉ Stellar_Sundram
        </NavLink>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 rounded-full border border-white/10 bg-nebula/80 px-2 py-1 backdrop-blur-md md:flex">
          {links.map(({ to, label, Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-comet/20 text-comet'
                      : 'text-cosmos-muted hover:text-stardust'
                  }`
                }
                aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
              >
                <span aria-hidden="true"><Icon size={14} /></span>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger button */}
        <button
          onClick={toggleMenu}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-nebula/80 backdrop-blur-md md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className="sr-only">{menuOpen ? 'Close' : 'Menu'}</span>
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-stardust">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-stardust">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 top-0 z-40 bg-void/95 backdrop-blur-md md:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <ul
            className="flex min-h-screen flex-col items-center justify-center gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {links.map(({ to, label, Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-full px-8 py-4 text-xl font-medium transition-all ${
                      isActive
                        ? 'bg-comet/20 text-comet'
                        : 'text-cosmos-muted hover:text-stardust'
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  <span aria-hidden="true" className="text-2xl"><Icon size={24} /></span>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
