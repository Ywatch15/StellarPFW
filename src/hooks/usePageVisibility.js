// FILE: src/hooks/usePageVisibility.js
// Centralized browser tab visibility tracking via Page Visibility API
import { useState, useEffect } from 'react';

/**
 * Returns true if the document/tab is currently visible to the user,
 * false if the tab is hidden or minimized.
 * @returns {boolean} isPageVisible
 */
export default function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof document === 'undefined') return true;
    return document.visibilityState !== 'hidden';
  });

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;

    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState !== 'hidden');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isVisible;
}
