// FILE: src/lib/seo.js
// SEO utility: JSON-LD structured data, meta tags, and Open Graph helpers

/**
 * Person JSON-LD structured data
 * Include this in the Home/About page <script type="application/ld+json">
 */
export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Stellar Developer',
  url: 'https://stellar-portfolio.vercel.app',
  jobTitle: 'Full-Stack Software Engineer',
  description:
    'Full-stack engineer crafting performant, accessible digital experiences with React, Node.js, and Three.js.',
  sameAs: [
    'https://github.com/stellar-dev',
    'https://linkedin.com/in/stellar-dev',
    'https://x.com/stellar_dev',
  ],
  knowsAbout: [
    'React',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Three.js',
    'WebGL',
    'MongoDB',
    'PostgreSQL',
    'AWS',
    'Docker',
  ],
};

/**
 * Generate CreativeWork JSON-LD for a project
 * @param {{ title: string, description: string, url?: string, tags?: string[] }} project
 */
export function projectJsonLd(project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: project.url || `https://stellar-portfolio.vercel.app/works#${project.id}`,
    creator: {
      '@type': 'Person',
      name: 'Stellar Developer',
    },
    keywords: project.tags?.join(', '),
  };
}

/**
 * Generates WebSite JSON-LD for the main page
 */
export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Stellar Portfolio',
  url: 'https://stellar-portfolio.vercel.app',
  description: 'Space-themed developer portfolio showcasing projects, skills, and experience.',
  author: {
    '@type': 'Person',
    name: 'Stellar Developer',
  },
};

/**
 * Injects JSON-LD script tag into document head
 * Call this in useEffect to add structured data
 * @param {object} data - JSON-LD object
 * @param {string} id - Unique ID for the script tag
 */
export function injectJsonLd(data, id = 'json-ld') {
  if (typeof document === 'undefined') return;

  // Remove existing tag if present
  const existing = document.getElementById(id);
  if (existing) existing.remove();

  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

/**
 * Updates document title and meta description
 * @param {{ title?: string, description?: string }} meta
 */
export function updateMeta({ title, description }) {
  if (typeof document === 'undefined') return;

  if (title) {
    document.title = `${title} — Stellar Portfolio`;
  }

  if (description) {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }
}
