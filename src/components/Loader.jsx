// FILE: src/components/Loader.jsx
// Suspense fallback loader shown while lazy components load
import React from 'react';

export default function Loader({ message = 'Loading…' }) {
  return (
    <div
      className="flex min-h-[50vh] flex-col items-center justify-center gap-4"
      role="status"
      aria-live="polite"
    >
      <svg
        className="h-12 w-12 animate-spin-slow"
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <circle
          cx="32"
          cy="32"
          r="14"
          fill="none"
          strokeWidth="3"
          stroke="#6c63ff"
        />
        <circle
          cx="32"
          cy="32"
          r="28"
          fill="none"
          strokeWidth="3"
          stroke="#38bdf8"
          strokeDasharray="80 40"
        />
      </svg>
      <span className="text-sm text-cosmos-muted">{message}</span>
    </div>
  );
}
