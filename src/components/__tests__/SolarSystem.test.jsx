// FILE: src/components/__tests__/SolarSystem.test.jsx
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import SolarSystem from '../SolarSystem';

expect.extend(toHaveNoViolations);

jest.mock('motion/react', () => {
  const ReactMock = require('react');
  const MotionDiv = ReactMock.forwardRef(function MotionDiv({ children, ...domProps }, ref) {
    return ReactMock.createElement('div', { ...domProps, ref }, children);
  });
  MotionDiv.displayName = 'MotionDiv';
  const MotionArticle = ReactMock.forwardRef(function MotionArticle(
    { children, ...domProps },
    ref,
  ) {
    return ReactMock.createElement('article', { ...domProps, ref }, children);
  });
  MotionArticle.displayName = 'MotionArticle';
  return {
    motion: { div: MotionDiv, article: MotionArticle },
    AnimatePresence: ({ children }) => children,
  };
});

describe('SolarSystem Component — Unified Planetary Coordinate System', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('renders with unified solar-planetary-system and solar-system-center container', () => {
    const { container } = render(
      <MemoryRouter>
        <SolarSystem />
      </MemoryRouter>,
    );

    const planetarySystem = container.querySelector('.solar-planetary-system');
    expect(planetarySystem).toBeInTheDocument();

    const systemCenter = planetarySystem.querySelector('.solar-system-center');
    expect(systemCenter).toBeInTheDocument();

    // Verify both Sun and Orbit rings share the same systemCenter parent
    const sun = systemCenter.querySelector('.solar-sun');
    expect(sun).toBeInTheDocument();
    expect(sun).toHaveTextContent(/This Site/);

    const orbitalField = systemCenter.querySelector('.solar-orbital-field');
    expect(orbitalField).toBeInTheDocument();

    const orbitRings = orbitalField.querySelectorAll('.solar-orbit-ring');
    expect(orbitRings.length).toBe(9); // 8 planets + Pluto

    // Verify central waves and asteroid belt are also inside systemCenter
    const energyWave = systemCenter.querySelector('.solar-energy-wave');
    expect(energyWave).toBeInTheDocument();

    const asteroidBelt = systemCenter.querySelector('.solar-asteroid-belt');
    expect(asteroidBelt).toBeInTheDocument();
  });

  it('toggles scan mode on button click', () => {
    render(
      <MemoryRouter>
        <SolarSystem />
      </MemoryRouter>,
    );

    const scanButton = screen.getByRole('button', { name: /activate scan mode/i });
    expect(scanButton).toBeInTheDocument();
    expect(scanButton).toHaveAttribute('aria-pressed', 'false');

    act(() => {
      fireEvent.click(scanButton);
    });

    expect(scanButton).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText(/objects detected/i)).toBeInTheDocument();
  });

  it('opens project card when a planet is clicked', () => {
    const { container } = render(
      <MemoryRouter>
        <SolarSystem />
      </MemoryRouter>,
    );

    const mercuryPlanet = container.querySelector('[data-planet="mercury"]');
    expect(mercuryPlanet).toBeInTheDocument();

    act(() => {
      fireEvent.keyDown(mercuryPlanet, { key: 'Enter' });
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    const card = screen.getByRole('dialog', { name: /Project details: Portfolio/i });
    expect(card).toBeInTheDocument();
  });

  it('renders only clean planet names in planet labels without project titles or badges', () => {
    const { container } = render(
      <MemoryRouter>
        <SolarSystem />
      </MemoryRouter>,
    );

    const planetLabels = container.querySelectorAll('.solar-planet-label');
    expect(planetLabels.length).toBe(9); // 8 planets + Pluto

    const expectedPlanetNames = [
      'Mercury',
      'Venus',
      'Earth',
      'Mars',
      'Jupiter',
      'Saturn',
      'Uranus',
      'Neptune',
      'Pluto',
    ];

    planetLabels.forEach((label, idx) => {
      expect(label.textContent.trim()).toBe(expectedPlanetNames[idx]);
      expect(label.textContent).not.toContain('● Live');
      expect(label.textContent).not.toContain('◆ Repo');
      expect(label.textContent).not.toContain('★ Profile');
      expect(label.textContent).not.toContain('Portfolio');
      expect(label.textContent).not.toContain('ScatchProject');
    });
  });

  it('has no critical accessibility violations', async () => {
    jest.useRealTimers();
    const { container } = render(
      <MemoryRouter>
        <SolarSystem />
      </MemoryRouter>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});