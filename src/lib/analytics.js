// FILE: src/lib/analytics.js
// Privacy-first analytics — Plausible self-hosted or opt-in stub
// Replaces Google Analytics with a lightweight, cookie-free approach
// Consent is stored in localStorage so the user only sees the banner once

const STORAGE_KEY = 'stellar-analytics-consent';
const PLAUSIBLE_DOMAIN = 'your-portfolio.com'; // TODO: replace with real domain
const PLAUSIBLE_SRC = 'https://plausible.io/js/script.js'; // or self-hosted URL

/** Check if user has given analytics consent */
export function hasConsent() {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEY) === 'granted';
}

/** Check if user has explicitly declined */
export function hasDeclined() {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEY) === 'declined';
}

/** Grant analytics consent and inject script */
export function grantConsent() {
  localStorage.setItem(STORAGE_KEY, 'granted');
  injectPlausible();
}

/** Decline analytics */
export function declineConsent() {
  localStorage.setItem(STORAGE_KEY, 'declined');
}

/** Inject the Plausible script (safe to call multiple times) */
function injectPlausible() {
  if (typeof document === 'undefined') return;
  if (document.querySelector('script[data-domain]')) return;

  // Skip on localhost or when domain is still the placeholder
  const host = window.location.hostname;
  if (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    PLAUSIBLE_DOMAIN === 'your-portfolio.com'
  ) {
    return;
  }

  const script = document.createElement('script');
  script.defer = true;
  script.setAttribute('data-domain', PLAUSIBLE_DOMAIN);
  script.src = PLAUSIBLE_SRC;
  // Gracefully handle ad-blocker / network errors
  script.onerror = () => {
    console.info('[analytics] Script blocked or unavailable — analytics disabled.');
  };
  document.head.appendChild(script);
}

/** Track a custom event (if consent was given) */
export function trackEvent(name, props = {}) {
  if (!hasConsent()) return;
  // Plausible custom events
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(name, { props });
  }
}

/** Auto-init: if consent was previously granted, inject on load */
export function initAnalytics() {
  if (hasConsent()) {
    injectPlausible();
  }
}
