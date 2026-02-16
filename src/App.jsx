// FILE: src/App.jsx
// Root application — routing + lazy page loading + onReady callback + theme
import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Loader from './components/Loader';
import { ThemeProvider } from './components/ThemeProvider';

// Route-based code-splitting
const Home = lazy(() => import('./pages/Home'));
const Works = lazy(() => import('./pages/Works'));
const About = lazy(() => import('./pages/About'));
const Beyond = lazy(() => import('./pages/Beyond'));
const Contact = lazy(() => import('./pages/Contact'));

export default function App({ onReady }) {
  useEffect(() => {
    // Fire onReady when the shell is mounted (hides HTML loader)
    if (onReady) onReady();
  }, [onReady]);

  return (
    <ThemeProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Suspense fallback={<Loader message="Loading page…" />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="works" element={<Works />} />
              <Route path="about" element={<About />} />
              <Route path="beyond" element={<Beyond />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}
