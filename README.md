# 🌌 Stellar Portfolio

A production-ready, space-themed React portfolio with extraordinary UX: orbital navigation, constellation skills graph, asteroid-timeline, mini-planet project cards, progressive enhancement, and excellent performance.

![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-18%2B-green)
![Build](https://img.shields.io/badge/build-Vite%206-purple)

---

## ✨ Features

| Feature | Description |
|---|---|
| **Orbital Navigation** | SVG-based orbit shell with keyboard nav (arrow keys, space/enter) |
| **Constellation Skills** | Interactive node graph with hover-highlight and connected paths |
| **Asteroid Timeline** | Horizontal-scroll belt with navigation dots and keyboard support |
| **Satellite Cards** | Animated project modals with focus trap and a11y |
| **3D Hero Scene** | Three.js planet with orbiting particles, adaptive to device capability |
| **Progressive Enhancement** | WebGL detection → 3D or graceful CSS fallback |
| **Theme System** | Nebula / Dark / Minimal — persisted, with `prefers-color-scheme` |
| **Audio Engine** | Web Audio API hover/click/transition tones, opt-in toggle |
| **Orbital Cursor** | Spring-eased custom cursor, respects reduced-motion |
| **Privacy Analytics** | Plausible-based, GDPR consent banner, cookie-free |
| **SEO** | JSON-LD structured data, Open Graph, meta tags, sitemap |

---

## 🏗️ Architecture

```
PFW/
├── api/                    # Vercel serverless functions
│   └── mission-log.js      # Contact form handler
├── public/                 # Static assets, robots.txt, sitemap.xml
├── src/
│   ├── components/         # React components
│   │   ├── HeroScene.jsx       # 3D scene (lazy-loaded)
│   │   ├── FallbackHero.jsx    # CSS-only fallback
│   │   ├── OrbitShell.jsx      # Orbital navigation
│   │   ├── SatelliteCard.jsx   # Project card modal
│   │   ├── Constellation.jsx   # Skills graph
│   │   ├── TimelineBelt.jsx    # Timeline component
│   │   ├── Starfield.jsx       # Parallax star background
│   │   ├── PlanetModel.jsx     # 3D planet
│   │   ├── ParallaxLayer.jsx   # Scroll parallax wrapper
│   │   ├── OrbitalCursor.jsx   # Custom cursor
│   │   ├── ThemeProvider.jsx   # Theme context + toggle
│   │   ├── AnalyticsBanner.jsx # Consent banner
│   │   ├── Layout.jsx          # Root layout
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── Loader.jsx          # Loading spinner
│   │   └── __tests__/          # Component tests
│   ├── hooks/
│   │   ├── useWebGL.js         # WebGL feature detection
│   │   ├── useDeviceCapability.js # Device tier (high/med/low)
│   │   ├── useInertialPointer.js  # Spring-physics pointer
│   │   └── useSEO.js           # SEO meta injection
│   ├── lib/
│   │   ├── analytics.js        # Plausible analytics
│   │   ├── assetLoader.js      # GLTF/KTX2 loader
│   │   ├── seo.js              # JSON-LD + meta helpers
│   │   └── emptyModule.js      # hls.js stub
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Works.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── styles/
│   │   └── index.css           # Tailwind + custom tokens
│   ├── App.jsx                 # Root router
│   └── main.jsx                # Entry point
├── .github/workflows/ci.yml   # CI pipeline
├── vercel.json                 # Deploy config + caching
├── vite.config.js              # Build config
├── tailwind.config.js          # Color tokens, typography
└── design-brief.md             # Design system doc
```

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/your-username/stellar-portfolio.git
cd stellar-portfolio

# Install
npm install

# Dev server (http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

---

## 🎨 Theming

Three built-in themes with CSS custom properties:

| Theme | Background | Accent | Style |
|---|---|---|---|
| **Nebula** (default) | `#050816` | `#6c63ff` | Deep space purple |
| **Dark** | `#000000` | `#a78bfa` | Pure black OLED |
| **Minimal** | `#f8fafc` | `#1e293b` | Light, clean |

Toggle via the ● button (bottom-right). Persisted in `localStorage`.

---

## 🧊 3D Assets — Replacing the Placeholder

The hero uses a procedural sphere by default. To add your own GLTF model:

1. Export your model as `.glb` (compressed with Draco/Meshopt).
2. Place it in `public/models/your-model.glb`.
3. Edit `src/components/PlanetModel.jsx`:
   ```jsx
   const { scene } = useGLTF('/models/your-model.glb');
   ```
4. Optionally add KTX2 textures and update `assetLoader.js`.

**Size budget:** Keep GLTF under 500KB for fast loading.

---

## ⚡ Performance

| Metric | Target | How |
|---|---|---|
| Initial JS (gzip) | < 200 KB | Route code-splitting, manual chunks |
| Three.js chunk | Lazy-loaded | Only downloads when 3D hero mounts |
| LCP | < 2.5s | Preloaded fonts, CSS fallback hero |
| FID | < 100ms | Deferred hydration, no blocking scripts |
| CLS | < 0.1 | Fixed layout, reserved space for 3D |
| Lighthouse | 90+ all | CI enforced via Lighthouse CI |

### Bundle Strategy

```
vendor-react  → react, react-dom, react-router-dom
vendor-motion → motion (framer-motion successor)
vendor-three  → three
vendor-r3f    → @react-three/fiber, @react-three/drei
```

All chunks except `vendor-react` are lazy-loaded.

---

## ♿ Accessibility

- **Keyboard navigation** on OrbitShell, Constellation, TimelineBelt, SatelliteCard
- **Focus management** and visible focus rings (`aurora` outline)
- **`prefers-reduced-motion`** disables all CSS animations and 3D particle effects
- **`<noscript>`** semantic HTML fallback for crawlers and JS-off users
- **ARIA roles** on modals, navigation, and interactive widgets
- **Color contrast** WCAG AA+ on all theme variants
- **jest-axe** automated a11y testing in unit tests

---

## 🧪 Testing

```bash
# Run all tests
npm test

# With coverage
npm test -- --coverage

# Single file
npm test -- --testPathPattern=OrbitShell
```

Tests use **Jest 29**, **React Testing Library**, and **jest-axe** for automated accessibility audits.

---

## 📦 Bundle Analysis

```bash
# Interactive treemap
npm run analyze
```

Generates a visual bundle report using `vite-bundle-visualizer`.

---

## 🌍 Deployment

See [deploy-instructions.md](deploy-instructions.md) for complete guide.

**Quick deploy:**
```bash
npx vercel --prod
```

The `vercel.json` includes:
- Immutable caching for hashed assets (1 year)
- Security headers (X-Content-Type-Options, X-Frame-Options)
- SPA fallback rewrites
- Auto-detected serverless functions in `api/`

---

## 📊 Analytics

Privacy-first approach using Plausible (cookie-free, GDPR-compliant):
- Opt-in consent banner appears on first visit
- No cookies, no fingerprinting
- Custom events for navigation and interactions
- Self-hostable

---

## 🗺️ Roadmap

- [ ] MongoDB integration for mission-log
- [ ] Blog section with MDX
- [ ] i18n (internationalization)
- [ ] Dark mode auto-detection enhancement
- [ ] PWA offline support
- [ ] WebGPU renderer path (future Three.js versions)

---

## 📄 License

MIT — feel free to fork and customize for your own portfolio!

---

## 🙏 Credits

- [Three.js](https://threejs.org/) — 3D rendering
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) — React ↔ Three.js bridge
- [Motion](https://motion.dev/) — Animation library (framer-motion successor)
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [Plausible](https://plausible.io/) — Privacy-friendly analytics
- [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) — Heading font
