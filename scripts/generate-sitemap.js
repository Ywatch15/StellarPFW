// FILE: scripts/generate-sitemap.js
// Node script to regenerate sitemap.xml from route definitions
// Run: node scripts/generate-sitemap.js

const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.SITE_URL || 'https://stellar-pfw.vercel.app';
const today = new Date().toISOString().split('T')[0];

const routes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/works', changefreq: 'weekly', priority: '0.9' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/beyond', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', changefreq: 'yearly', priority: '0.6' },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${BASE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const outPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf-8');
console.log(`✓ Sitemap generated at ${outPath}`);
