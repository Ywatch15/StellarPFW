# Deploy Instructions — Stellar Portfolio

## Prerequisites
- Node.js 18+ and npm 9+
- A Vercel account (free tier works)
- (Optional) Custom domain

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Run tests
npm test

# Lint
npm run lint

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Deploy to Vercel

### Option A — Vercel CLI
```bash
npm i -g vercel
vercel login
vercel          # follow prompts → auto-detects Vite
vercel --prod   # deploy to production
```

### Option B — Git Integration
1. Push repo to GitHub.
2. Go to https://vercel.com/new and import the repository.
3. Vercel auto-detects Vite — no config changes needed.
4. `vercel.json` handles caching headers and SPA rewrites.
5. The `api/` directory is auto-detected as Vercel Serverless Functions.

---

## Environment Variables (optional)

| Variable | Purpose | Default |
|---|---|---|
| `VITE_PLAUSIBLE_DOMAIN` | Analytics domain | `your-portfolio.com` |
| `MONGODB_URI` | Mission-log DB connection | — |

Set these in the Vercel dashboard → Project Settings → Environment Variables.

---

## Custom Domain
1. Vercel dashboard → Project → Settings → Domains.
2. Add your domain and update DNS (CNAME to `cname.vercel-dns.com`).
3. SSL is auto-provisioned.

---

## CI/CD
GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push:
- Lint → Test → Build → Bundle analysis → Lighthouse audit
- Artifacts: coverage report, `bundle-stats.html`

---

## Post-Deploy Checklist
- [ ] Update `PLAUSIBLE_DOMAIN` in `src/lib/analytics.js`
- [ ] Update `robots.txt` and `sitemap.xml` with real domain
- [ ] Replace placeholder GLTF model with custom 3D asset
- [ ] Replace project screenshots in `public/` with real images
- [ ] Test on mobile, tablet, and desktop
- [ ] Run `npx lighthouse https://your-domain.com --view`
- [ ] Verify Core Web Vitals in Chrome DevTools
