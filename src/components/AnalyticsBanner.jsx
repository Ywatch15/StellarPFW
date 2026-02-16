// FILE: src/components/AnalyticsBanner.jsx
// GDPR-friendly opt-in consent banner for analytics
import React, { useState, useEffect } from 'react';
import { hasConsent, hasDeclined, grantConsent, declineConsent, initAnalytics } from '../lib/analytics';

export default function AnalyticsBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Initialize if already consented
    initAnalytics();

    // Only show banner if user hasn't decided yet
    if (!hasConsent() && !hasDeclined()) {
      const timer = setTimeout(() => setVisible(true), 3000); // delay 3s to not interrupt
      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  const handleAccept = () => {
    grantConsent();
    setVisible(false);
  };

  const handleDecline = () => {
    declineConsent();
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Analytics consent"
      className="fixed bottom-4 left-4 z-50 max-w-sm rounded-lg border border-white/10 bg-nebula/95 p-4 shadow-2xl backdrop-blur-md"
    >
      <p className="mb-3 text-sm text-stardust">
        I use privacy-friendly analytics (no cookies, no tracking) to improve this site.
        Your data never leaves the server.
      </p>
      <div className="flex gap-2">
        <button
          onClick={handleAccept}
          className="rounded-md bg-comet px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-comet/80"
        >
          Allow analytics
        </button>
        <button
          onClick={handleDecline}
          className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-cosmos-muted transition-colors hover:text-stardust"
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
