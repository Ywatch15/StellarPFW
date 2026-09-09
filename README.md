# 🌌 Stellar Portfolio - https://sundram-stellar.vercel.app/

> A space-themed, production-grade React portfolio featuring an interactive solar system, constellation skills graph, asteroid timeline, 3D hero scene, and cinematic page transitions — all with progressive enhancement, keyboard accessibility, and performance-first engineering.

![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-18%2B-green)
![Build](https://img.shields.io/badge/build-Vite%206-purple)
![React](https://img.shields.io/badge/react-18.3-61DAFB)
![Three.js](https://img.shields.io/badge/three.js-r170-black)

**Live:** [stellarpfw.vercel.app](https://stellarpfw.vercel.app) &nbsp;|&nbsp; **Author:** Sundram &nbsp;|&nbsp; **GitHub:** [Ywatch15](https://github.com/Ywatch15)

---

## Table of Contents

- [Features](#-features)
  - [Core Interactive Features](#core-interactive-features)
  - [User Management](#user-management)
  - [User Experience](#user-experience)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Running the App](#-running-the-app)
- [API Documentation](#-api-documentation)
- [Key Features Implemented](#-key-features-implemented)
- [Development Notes](#-development-notes)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

---

## ✨ Features

### Core Interactive Features

| Feature | Description |
|---|---|
| **Solar System (Works)** | A Sun at the center with 8 orbiting planets + Pluto — each planet represents a deployed project or GitHub repo. The Sun rotates on its axis; planets revolve in elliptical CSS orbits with counter-rotation to stay upright. |
| **Plasma Tentacles** | Clicking any planet triggers a 4-second canvas animation — two bézier-curved plasma tentacles extend from the Sun to the selected planet with multi-pass glow rendering and floating particles. After 4 seconds, the target URL opens in a new tab. |
| **Black Hole Collapse** | Clicking the Sun converts it into a black hole — an accretion disk, gravitational lensing rings, particle streams, and a darkness overlay play over 4 seconds. All planets and stars collapse inward. The user is then redirected to the Home page with a themed popup. |
| **Constellation Skills Graph** | SVG-based interactive node map with 40+ skills categorized by frontend, backend, databases, and DevOps — hover to highlight connected paths and view tooltips. |
| **3D Hero Scene** | Three.js planet with orbiting particles in the Home hero section, powered by React Three Fiber. Lazy-loaded only when WebGL is confirmed. |
| **Orbital Navigation** | SVG orbit shell on the Home page with keyboard-accessible planet links (arrow keys, Space, Enter) for navigating between site sections. |
| **Satellite Cards** | Animated project detail modals with spring transitions, focus trapping, and accessible ARIA roles. |
| **Story Journey** | 7-part autobiographical journey on the About page with pictorial cards, icons, and scroll-triggered animations. |
| **Beyond the Event Horizon** | Interactive page with a CSS/SVG black hole, orbiting data-fragment cards showing achievements, coding stats, dev philosophy, and fun facts. |
| **Nebula Collision** | Full-screen star-collision-to-nebula-formation animation (~3.5 s) using Canvas particles — plays on successful contact form submission. |

### User Management

| Feature | Description |
|---|---|
| **Contact Form** | Client-side validated form that POSTs to a Vercel serverless function. Fields: name, email, message with real-time validation feedback. |
| **Email Delivery** | Server-side Nodemailer integration sends contact submissions as formatted emails. |
| **Rate Limiting** | In-memory IP-based throttling — 5 requests/minute on the contact endpoint, 10 requests/minute on the mission-log endpoint. |
| **Mission Log API** | Stub endpoint ready for MongoDB/Supabase/Planetscale integration to persist contact submissions. |
| **Privacy Analytics** | Cookie-free Plausible analytics with opt-in GDPR consent banner. No fingerprinting, fully self-hostable. |

### User Experience

| Feature | Description |
|---|---|
| **Theme System** | Three themes — Nebula (deep space), Dark (OLED black), Minimal (light) — toggled via a floating button, persisted in `localStorage`, respects `prefers-color-scheme`. |
| **Progressive Enhancement** | WebGL detection at startup: renders full 3D hero if supported, graceful CSS-only fallback otherwise. Device capability tier (high/medium/low) adjusts rendering quality. |
| **Orbital Cursor** | Spring-eased custom cursor with inertial physics that follows the mouse; automatically disabled on touch devices and when `prefers-reduced-motion` is active. |
| **Page Transitions** | Warp-speed fade + slide animations between routes using Framer Motion `AnimatePresence`. |
| **Parallax Starfield** | Three-layer star background with mouse-reactive parallax movement; static gradient fallback for JS-off. |
| **SEO** | JSON-LD structured data (WebSite + Person), Open Graph tags, Twitter cards, meta descriptions, and auto-generated `sitemap.xml`. |
| **Keyboard Accessibility** | Full keyboard navigation on all interactive widgets — OrbitShell, Constellation, Timeline, SatelliteCard, SolarSystem. Visible focus rings and ARIA roles throughout. |
| **Reduced Motion** | All CSS animations, canvas effects, and 3D particle systems respect `prefers-reduced-motion: reduce`. |
| **Responsive Design** | Fully responsive from 320px to 2560px+ with Tailwind breakpoints. Solar system scales dynamically based on viewport dimensions. |

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | React 18.3 | UI library with lazy loading + Suspense |
| **Routing** | React Router 6 | Client-side SPA routing with code splitting |
| **3D Rendering** | Three.js r170 | WebGL hero scene |
| **3D Bridge** | React Three Fiber + Drei | Declarative Three.js in React |
| **Animation** | Motion (Framer Motion) 12 | Spring physics, layout animations, page transitions |
| **Styling** | Tailwind CSS 3.4 | Utility-first CSS with custom design tokens |
| **Build** | Vite 6 | HMR, ESBuild minification, manual chunk splitting |
| **Backend** | Vercel Serverless Functions | Contact form email handler + mission log |
| **Email** | Nodemailer | SMTP email delivery |
| **Testing** | Jest 29 + React Testing Library + jest-axe | Unit tests + automated accessibility audits |
| **Linting** | ESLint + Prettier | Code quality + formatting |
| **Git Hooks** | Husky + lint-staged | Pre-commit linting and formatting |
| **Analytics** | Plausible | Cookie-free, GDPR-compliant analytics |
| **Deployment** | Vercel | Edge CDN, serverless functions, immutable caching |

---

## 📁 Project Structure

```
PFW/
├── api/                          # Vercel serverless functions
│   ├── contact.js                    # Contact form → email via Nodemailer (rate-limited)
│   └── mission-log.js                # Mission log stub (DB adapter placeholder)
├── public/                       # Static assets served as-is
│   ├── robots.txt                    # Crawler directives
│   └── sitemap.xml                   # Auto-generated sitemap
├── scripts/
│   └── generate-sitemap.js           # Sitemap generation script
├── src/
│   ├── components/
│   │   ├── SolarSystem.jsx           # ☀ Interactive solar system (Works page)
│   │   ├── HeroScene.jsx            # 3D Three.js hero (lazy-loaded)
│   │   ├── FallbackHero.jsx         # CSS-only hero fallback (no WebGL)
│   │   ├── OrbitShell.jsx           # SVG orbital navigation widget
│   │   ├── SatelliteCard.jsx        # Project detail modal
│   │   ├── Constellation.jsx        # Skills constellation graph (SVG)
│   │   ├── TimelineBelt.jsx         # Horizontal-scroll career timeline
│   │   ├── StoryJourney.jsx         # 7-chapter life story cards
│   │   ├── BlackHole.jsx            # CSS/SVG black hole (Beyond page)
│   │   ├── NebulaCollision.jsx      # Canvas star-collision animation
│   │   ├── Starfield.jsx            # 3-layer parallax star background
│   │   ├── PlanetModel.jsx          # 3D planet (R3F)
│   │   ├── ParallaxLayer.jsx        # Scroll parallax wrapper
│   │   ├── OrbitalCursor.jsx        # Spring-physics custom cursor
│   │   ├── AboutParticles.jsx       # About page background particles
│   │   ├── HomeIntro.jsx            # Personal intro + typewriter subtitle
│   │   ├── HomeHighlights.jsx       # Stats counters + highlight cards
│   │   ├── ThemeProvider.jsx        # Theme context, toggle, persistence
│   │   ├── AnalyticsBanner.jsx      # GDPR consent banner
│   │   ├── Layout.jsx               # Root layout (navbar, starfield, footer)
│   │   ├── Navbar.jsx               # Top nav + mobile hamburger
│   │   ├── NavIcons.jsx             # Navigation icon components
│   │   ├── PageTransition.jsx       # Route transition wrapper
│   │   ├── Loader.jsx               # Loading spinner
│   │   └── __tests__/               # Component test suites
│   │       ├── FallbackHero.test.jsx
│   │       ├── Navbar.test.jsx
│   │       ├── OrbitShell.test.jsx
│   │       └── SatelliteCard.test.jsx
│   ├── data/
│   │   └── projects.json             # Project metadata (titles, tags, links)
│   ├── hooks/
│   │   ├── useWebGL.js               # WebGL feature detection
│   │   ├── useDeviceCapability.js    # Device tier detection (high/med/low)
│   │   ├── useInertialPointer.js     # Spring-physics mouse tracking
│   │   └── useSEO.js                 # Dynamic meta tag injection
│   ├── lib/
│   │   ├── analytics.js              # Plausible analytics wrapper
│   │   ├── assetLoader.js            # GLTF/KTX2 asset loader
│   │   ├── seo.js                    # JSON-LD structured data helpers
│   │   └── emptyModule.js            # hls.js build stub
│   ├── pages/
│   │   ├── Home.jsx                  # Hero + orbital nav + intro + highlights
│   │   ├── Works.jsx                 # Solar system project showcase
│   │   ├── About.jsx                 # Constellation + story journey
│   │   ├── Beyond.jsx               # Black hole + achievements
│   │   └── Contact.jsx              # Contact form + social links
│   ├── styles/
│   │   ├── index.css                 # Tailwind base + custom tokens + themes
│   │   └── solar-system.css          # Solar system keyframe animations
│   ├── __mocks__/
│   │   └── fileMock.js               # Jest static file mock
│   ├── App.jsx                       # Root router + lazy code splitting
│   ├── main.jsx                      # Entry point + HTML loader cleanup
│   └── setupTests.js                 # Jest DOM + axe setup
├── coverage/                     # Test coverage reports
├── babel.config.cjs              # Babel config (Jest compatibility)
├── jest.config.cjs               # Jest configuration
├── tailwind.config.js            # Tailwind tokens, fonts, keyframes
├── postcss.config.js             # PostCSS + Autoprefixer
├── vite.config.js                # Vite build + chunking + dev server
├── vercel.json                   # Deploy config, caching, security headers
├── design-brief.md               # Design system documentation
└── deploy-instructions.md        # Deployment guide
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9 (or yarn/pnpm)
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/Ywatch15/StellarPFW.git
cd StellarPFW

# Install dependencies
npm install
```

### Environment Variables (optional, for contact form)

Create a `.env` file in the project root:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_TO=your-email@gmail.com
```

> The contact form works in development without these — it just won't send emails.

---

## ▶ Running the App

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server at `http://localhost:3000` with HMR |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build at `http://localhost:4173` |
| `npm run lint` | ESLint check (zero warnings enforced) |
| `npm run format` | Prettier format all source files |
| `npm test` | Run Jest test suite |
| `npm run test:watch` | Jest in watch mode |
| `npm run test:coverage` | Generate coverage report → `coverage/` |
| `npm run analyze` | Bundle size treemap visualization |
| `npm run lighthouse` | Run Lighthouse audit (requires preview server) |

### Development Workflow

```bash
# Start dev server
npm run dev

# In another terminal — run tests in watch mode
npm run test:watch
```

Husky pre-commit hooks automatically run ESLint + Prettier on staged files via lint-staged.

---

## 📡 API Documentation

### `POST /api/contact`

Sends a contact form email via Nodemailer.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to discuss a project."
}
```

**Validation:**

- `name` — required, 2–100 characters
- `email` — required, valid email format
- `message` — required, 10–5000 characters

**Rate Limit:** 5 requests per minute per IP

**Responses:**

| Status | Body | Description |
|---|---|---|
| `200` | `{ "ok": true }` | Email sent successfully |
| `400` | `{ "error": "..." }` | Validation failure |
| `405` | `{ "error": "Method not allowed" }` | Non-POST request |
| `429` | `{ "error": "Too many requests" }` | Rate limit exceeded |
| `500` | `{ "error": "..." }` | Server/SMTP error |

---

### `POST /api/mission-log`

Stub endpoint for persisting contact submissions to a database.

**Request Body:** Same as `/api/contact`

**Rate Limit:** 10 requests per minute per IP

**Status:** Placeholder — returns `201` with a generated ID. Ready for MongoDB/Supabase/Planetscale adapter.

---

## 🔑 Key Features Implemented

### Solar System — Interactive Project Showcase

The centerpiece of the Works page:

- **Sun** — Represents this portfolio website. Multi-layer radial gradients simulate surface sunspots. Corona aura pulses with CSS keyframes. Rotates on its axis (25s period). Clicking triggers the black hole event.
- **8 Planets** — Each maps to a real project:
  - **Mercury** → [Portfolio](https://portfolio-frontend-iprx.onrender.com/) (deployed)
  - **Venus** → [ScatchProject](https://scatchproject.onrender.com/) (deployed)
  - **Earth** → [Resume Analyzer](https://01resumeanalyzer06.netlify.app/) (deployed)
  - **Mars** → [Live Interview Platform](https://github.com/Ywatch15/Live-Interview-Platform) (repo)
  - **Jupiter** → [AI Chatbot](https://github.com/Ywatch15/AI-Chatbot) (repo)
  - **Saturn** → [Face Detector](https://github.com/Ywatch15/Face-Detector) (repo) — with ring!
  - **Uranus** → [Note Taking App](https://github.com/Ywatch15/Note-taking-app) (repo)
  - **Neptune** → [TeleCom Simulator](https://github.com/Ywatch15/TeleCom-Network-Simulator-and-Visualizer) (repo)
- **Pluto ★** — The farthest orbiter, styled as a star. Links to [GitHub Profile](https://github.com/Ywatch15).
- **Plasma Tentacle Animation** — Two bézier-curved plasma arms with 4-layer glow and 18 floating particles. Other planets continue orbiting unaffected. 4-second duration → opens link.
- **Black Hole Animation** — Canvas-rendered accretion disk, lensing rings, 40 particle streams, and darkness overlay. All DOM elements (planets, stars, orbits) collapse inward with staggered CSS transitions. 4 seconds → redirects to Home with popup message.

### Progressive Enhancement Pipeline

```
Page Load → useWebGL() → detect hardwareConcurrency / mobile UA
  ├── HIGH  → Full 3D hero + particles + orbital cursor
  ├── MEDIUM → 3D hero, reduced particles
  └── LOW  → CSS FallbackHero, no cursor effects
```

### Theme System

Three themes control CSS custom properties (`--color-void`, `--color-comet`, etc.) applied to `:root`. The toggle cycles Nebula → Dark → Minimal, persisted to `localStorage`, and broadcasts changes to all components via React Context.

### Security Headers (Vercel)

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — disables camera, microphone, geolocation, etc.
- `Strict-Transport-Security` with 1-year max-age

### Caching Strategy

| Asset Type | Cache Duration |
|---|---|
| Hashed JS/CSS (`/assets/*`) | 1 year, immutable |
| Fonts (`.woff2`) | 1 year, immutable |
| 3D Models (`.glb`) | 1 week |
| Textures (`.ktx2`, `.webp`) | 1 week |
| `sitemap.xml`, `robots.txt` | 1 day |

---

## 📝 Development Notes

### Bundle Strategy

Vite is configured with manual chunk splitting to optimize loading:

```
vendor-react   → react, react-dom, react-router-dom     (~54 KB gzip)
vendor-motion  → motion (framer-motion successor)        (~41 KB gzip)
vendor-three   → three                                   (~177 KB gzip)
vendor-r3f     → @react-three/fiber, @react-three/drei   (~49 KB gzip)
```

- `vendor-three` and `vendor-r3f` are **lazy-loaded** — only downloaded when the 3D hero scene mounts.
- The Solar System page uses **zero Three.js** — pure CSS animations + Canvas 2D for effects (~5 KB gzip).
- `hls.js` is stubbed to an empty module to prevent unnecessary bundling.

### Performance Targets

| Metric | Target |
|---|---|
| Initial JS (gzip) | < 200 KB |
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| Lighthouse | 90+ all categories |

### Accessibility Checklist

- [x] All interactive widgets keyboard-navigable
- [x] Visible focus rings (aurora-colored outline)
- [x] `prefers-reduced-motion` disables all animations globally
- [x] `<noscript>` semantic HTML fallback
- [x] ARIA roles on modals, navigation, buttons
- [x] WCAG AA+ color contrast on all themes
- [x] Automated axe audits in test suite

### Testing

Tests use **Jest 29** with **jsdom**, **React Testing Library** for component rendering, and **jest-axe** for automated accessibility validation.

```bash
# Run all tests
npm test

# With coverage report
npm run test:coverage

# Single component
npm test -- --testPathPattern=OrbitShell
```

### 3D Assets — Replacing the Placeholder

The hero uses a procedural sphere by default. To add a custom GLTF model:

1. Export as `.glb` (Draco/Meshopt compressed, < 500 KB).
2. Place in `public/models/your-model.glb`.
3. Update `src/components/PlanetModel.jsx`:
   ```jsx
   const { scene } = useGLTF('/models/your-model.glb');
   ```
4. Optionally add KTX2 textures and update `assetLoader.js`.

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** — follow existing code style (ESLint + Prettier enforce this)
4. **Write/update tests** for any new functionality
5. **Commit** with a clear message:
   ```bash
   git commit -m "feat: add your feature description"
   ```
6. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request** against `main`

### Guidelines

- Keep PRs focused — one feature or fix per PR
- Maintain Lighthouse 90+ scores
- Add `jest-axe` assertions for new interactive components
- Test on mobile viewports (320px+)
- Respect `prefers-reduced-motion` in any new animations

---

## 📄 License

This project is licensed under the **MIT License** — feel free to fork, modify, and use it for your own portfolio.

---

## 🙏 Acknowledgements

- [Three.js](https://threejs.org/) — 3D WebGL rendering engine
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) — Declarative React ↔ Three.js bridge
- [Drei](https://github.com/pmndrs/drei) — Useful R3F helpers and abstractions
- [Motion](https://motion.dev/) — Animation library (Framer Motion successor)
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Vite](https://vitejs.dev/) — Next-generation build tool
- [Vercel](https://vercel.com/) — Edge deployment platform
- [Plausible Analytics](https://plausible.io/) — Privacy-friendly analytics
- [Nodemailer](https://nodemailer.com/) — Node.js email sending
- [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) — Heading typeface
- [Inter](https://rsms.me/inter/) — Body typeface
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) — Monospace typeface

---

<p align="center">
  <strong>Crafted with ❤️ by Sundram</strong><br/>
  <em>"Every pixel is a star in the making."</em>
</p>
