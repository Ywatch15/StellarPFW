// FILE: src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Local self-hosted fonts (eliminates Google Fonts CSP violation and 503 errors)
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import './styles/index.css';

// Unregister any stale or conflicting service workers from previous deployments
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then((registrations) => {
      for (const registration of registrations) {
        registration.unregister().catch(() => {});
      }
    })
    .catch(() => {});
}

// Hide the HTML loader once React mounts
const hideLoader = () => {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 400);
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App onReady={hideLoader} />
  </React.StrictMode>,
);
