import { useEffect, useState } from 'react';

export default function OrbitProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
        frame = 0;
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="orbit-progress pointer-events-none fixed right-3 top-1/2 z-40 -translate-y-1/2"
      aria-label={`Page progress: ${Math.round(progress * 100)} percent`}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full sm:h-11 sm:w-11"
        style={{
          background: `conic-gradient(#38bdf8 ${progress * 360}deg, rgba(255,255,255,.1) 0deg)`,
        }}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-void font-mono text-[0.55rem] text-aurora">
          {Math.round(progress * 100)}
        </div>
      </div>
    </div>
  );
}
