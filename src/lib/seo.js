// FILE: src/lib/seo.js
// SEO utility: JSON-LD structured data, meta tags, and Open Graph helpers

/**
 * Person JSON-LD structured data
 * Include this in the Home/About page <script type="application/ld+json">
 */
export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://stellar-pfw.vercel.app/#person',
  name: 'Sundram Pathak',
  url: 'https://stellar-pfw.vercel.app',
  jobTitle: 'Full-Stack Software Engineer',
  description:
    'Full-stack engineer crafting performant, accessible digital experiences with React, Node.js, and Three.js.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'pathaksundram1812@gmail.com',
  },
  sameAs: [
    'https://github.com/Sundram1812',
    'https://www.linkedin.com/in/sundram-pathak-a34961257/',
    'https://leetcode.com/u/Sundram_Pathak/',
  ],
  knowsAbout: [
    'React',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Express',
    'Three.js',
    'WebGL',
    'MongoDB',
    'MySQL',
    'PostgreSQL',
    'AWS',
    'Docker',
    'GraphQL',
    'Competitive Programming',
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
    url: project.url || `https://stellar-pfw.vercel.app/works#${project.id}`,
    creator: {
      '@type': 'Person',
      '@id': 'https://stellar-pfw.vercel.app/#person',
      name: 'Sundram Pathak',
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
  '@id': 'https://stellar-pfw.vercel.app/#website',
  name: 'Stellar Portfolio',
  url: 'https://stellar-pfw.vercel.app',
  description: 'Full-stack developer portfolio showcasing projects, skills, and experience with interactive 3D visualizations.',
  author: {
    '@type': 'Person',
    '@id': 'https://stellar-pfw.vercel.app/#person',
    name: 'Sundram Pathak',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://stellar-pfw.vercel.app/works?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

/**
 * Organization JSON-LD for the portfolio
 */
export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://stellar-pfw.vercel.app/#organization',
  name: 'Stellar Portfolio',
  description: 'Full-stack development portfolio',
  url: 'https://stellar-pfw.vercel.app',
  founder: {
    '@type': 'Person',
    '@id': 'https://stellar-pfw.vercel.app/#person',
    name: 'Sundram Pathak',
  },
};

/**
 * Breadcrumb JSON-LD for navigation
 */
export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `https://stellar-pfw.vercel.app${item.url}`,
    })),
  };
}

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
