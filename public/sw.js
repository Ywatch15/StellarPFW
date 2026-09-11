// FILE: public/sw.js
// Self-healing service worker cleanup: unregisters any stale worker to prevent CSP violations
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.registration.unregister().then(() => self.clients.claim()),
  );
});
