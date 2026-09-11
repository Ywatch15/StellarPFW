// FILE: src/setupTests.js
import '@testing-library/jest-dom';

// Standard jsdom matchMedia mock
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
  }),
});

// Standard jsdom scrollTo mock
if (typeof window !== 'undefined') {
  window.scrollTo = () => {};
}
