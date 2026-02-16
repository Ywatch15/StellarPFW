// FILE: src/hooks/useWebGL.js
// Detects whether the browser supports WebGL rendering
import { useState, useEffect } from 'react';

/**
 * @returns {boolean | null} true if WebGL supported, false if not, null while detecting
 */
export default function useWebGL() {
  const [supported, setSupported] = useState(null);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl');
      setSupported(!!gl);
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}
