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

  if (!window.ResizeObserver) {
    window.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }

  if (!window.IntersectionObserver) {
    window.IntersectionObserver = class {
      constructor(cb) {
        this.cb = cb;
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
}

