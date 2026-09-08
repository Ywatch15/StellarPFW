import React, { useEffect, useRef } from 'react';
import useDeviceCapability from '../hooks/useDeviceCapability';

export default function OrbitalCursor() {
  const { isMobile, prefersReducedMotion } = useDeviceCapability();
  const canvasRef = useRef(null);
  const stateRef = useRef({
    x: 0,
    y: 0,
    inside: false,
    mode: 'orbit',
    cursorMode: 'normal',
    trail: Array.from({ length: 6 }, () => ({ x: 0, y: 0 })),
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
      state.mode = event.target.closest?.('a,button,[role="button"],summary') ? 'target' : 'orbit';
      if (state.cursorMode === 'normal' && state.trail[0].x === 0 && state.trail[0].y === 0) {
        state.trail.forEach((point) => {
          point.x = state.x;
          point.y = state.y;
        });
      }
    };

    const onLeave = () => {
      stateRef.current.inside = false;
    };

    const onCursorMode = (event) => {
      const state = stateRef.current;
      state.cursorMode = event.detail?.mode || 'normal';
      state.inside = state.cursorMode !== 'disabled' && state.inside;
      if (state.cursorMode !== 'normal') {
        state.trail.forEach((point) => {
          point.x = state.x;
          point.y = state.y;
        });
      }
    };

    const draw = () => {
      const state = stateRef.current;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (state.cursorMode === 'normal' && state.inside) {
        state.trail.forEach((point, index) => {
          const targetX = index === 0 ? state.x : state.trail[index - 1].x;
          const targetY = index === 0 ? state.y : state.trail[index - 1].y;
          const easing = index === 0 ? 0.42 : 0.24;
          point.x += (targetX - point.x) * easing;
          point.y += (targetY - point.y) * easing;

          ctx.beginPath();
          ctx.arc(point.x, point.y, Math.max(1.3, 3.8 - index * 0.45), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${index < 2 ? '165,185,255' : '56,189,248'}, ${(0.5 - index * 0.065).toFixed(3)})`;
          ctx.fill();
        });
      }

      if (state.inside && state.cursorMode !== 'disabled') {
        if (state.mode === 'target') {
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.9)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(state.x, state.y, 11, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(state.x - 16, state.y);
          ctx.lineTo(state.x - 7, state.y);
          ctx.moveTo(state.x + 7, state.y);
          ctx.lineTo(state.x + 16, state.y);
          ctx.moveTo(state.x, state.y - 16);
          ctx.lineTo(state.x, state.y - 7);
          ctx.moveTo(state.x, state.y + 7);
          ctx.lineTo(state.x, state.y + 16);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(state.x, state.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(165, 185, 255, 0.96)';
          ctx.fill();
          ctx.beginPath();
          ctx.arc(state.x, state.y, 9, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(120, 150, 255, 0.18)';
          ctx.fill();
        }
      }

      rafId = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('stellar-cursor-mode', onCursorMode);
    document.body.style.cursor = 'none';
    rafId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('stellar-cursor-mode', onCursorMode);
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
