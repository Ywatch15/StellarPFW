// FILE: src/hooks/useSEO.js
// Custom hook to manage page-level SEO (title, description, JSON-LD)
import { useEffect } from 'react';
import { updateMeta, injectJsonLd } from '../lib/seo';

/**
 * @param {{ title?: string, description?: string, jsonLd?: object }} options
 */
export default function useSEO({ title, description, jsonLd } = {}) {
  useEffect(() => {
    updateMeta({ title, description });

    if (jsonLd) {
      injectJsonLd(jsonLd, `jsonld-${title || 'page'}`);
    }

    // Cleanup JSON-LD on unmount
    return () => {
      if (jsonLd) {
        const el = document.getElementById(`jsonld-${title || 'page'}`);
        if (el) el.remove();
      }
    };
  }, [title, description, jsonLd]);
}
