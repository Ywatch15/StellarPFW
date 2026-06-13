import React, { useEffect, useRef } from 'react';
import useDeviceCapability from '../hooks/useDeviceCapability';

export default function OrbitalCursor() {
  const { isMobile, prefersReducedMotion } = useDeviceCapability();
  const canvasRef = useRef(null);
  const stateRef = useRef({
    x: 0,
    y: 0,
    inside: false,
    particles: [],
  });

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    let rafId = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (event) => {
      const state = stateRef.current;
      state.x = event.clientX;
      state.y = event.clientY;
      state.inside = true;

      for (let i = 0; i < 3; i += 1) {
        state.particles.push({
          x: state.x + (Math.random() - 0.5) * 5,
          y: state.y + (Math.random() - 0.5) * 5,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          life: 1,
          r: Math.random() * 2.7 + 1.2,
          hue: 205 + Math.random() * 55,
        });
      }
    };

    const onLeave = () => {
      stateRef.current.inside = false;
    };

    const draw = () => {
      const state = stateRef.current;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = state.particles.length - 1; i >= 0; i -= 1) {
        const p = state.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.05;
        p.r *= 0.97;

        if (p.life <= 0) {
          state.particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 74%, ${p.life * 0.8})`;
        ctx.fill();
      }

      if (state.inside) {
        ctx.beginPath();
        ctx.arc(state.x, state.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(165, 185, 255, 0.96)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(state.x, state.y, 9, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(120, 150, 255, 0.18)';
        ctx.fill();
      }

      rafId = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.body.style.cursor = 'none';
    rafId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.body.style.cursor = '';
    };
  }, [isMobile, prefersReducedMotion]);

  if (isMobile || prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    />
  );
}