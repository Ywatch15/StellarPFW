// FILE: src/lib/seo.js
// SEO utility: JSON-LD structured data, meta tags, and Open Graph helpers

/**
 * Person JSON-LD structured data
 * Include this in the Home/About page <script type="application/ld+json">
 */
export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://sundram-stellar.vercel.app/#person',
  name: 'Sundram Pathak',
  url: 'https://sundram-stellar.vercel.app',
  jobTitle: 'Full-Stack Software Engineer',
  description:
    'Full-stack engineer crafting performant, accessible digital experiences with React, Node.js, and Three.js.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'pathaksundram1812@gmail.com',
  },
  sameAs: [
    'https://github.com/Ywatch15',
    'https://www.linkedin.com/in/sundram-pathak-3469b6256/',
    'https://www.instagram.com/sundram_pathak150',
    'https://x.com/Sun_D_Ram',
  ],
  knowsAbout: [
    'React',
    'JavaScript',
    'Node.js',
    'Express',
    'Supabase',
    'Appwrite',
    'Three.js',
    'WebGL',
    'MongoDB',
    'MySQL',
    'PostgreSQL',
    'AWS',
    'Docker',
    'Python',
    'NumPy',
    'Pandas',
    'Matplotlib',
    'Seaborn',
    'VS Code',
    'Cursor',
    'Windsurf',
    'Claude Code',
    'Codex',
    'Lovable',
    'Bolt.new',
    'Orchid',
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
    url: project.url || `https://sundram-stellar.vercel.app/works#${project.id}`,
    creator: {
      '@type': 'Person',
      '@id': 'https://sundram-stellar.vercel.app/#person',
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
  '@id': 'https://sundram-stellar.vercel.app/#website',
  name: 'Stellar Portfolio',
  url: 'https://sundram-stellar.vercel.app',
  description:
    'Full-stack developer portfolio showcasing projects, skills, and experience with interactive 3D visualizations.',
  author: {
    '@type': 'Person',
    '@id': 'https://sundram-stellar.vercel.app/#person',
    name: 'Sundram Pathak',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://sundram-stellar.vercel.app/works?q={search_term_string}',
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
  '@id': 'https://sundram-stellar.vercel.app/#organization',
  name: 'Stellar Portfolio',
  description: 'Full-stack development portfolio',
  url: 'https://sundram-stellar.vercel.app',
  founder: {
    '@type': 'Person',
    '@id': 'https://sundram-stellar.vercel.app/#person',
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
      item: `https://sundram-stellar.vercel.app${item.url}`,
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

  const pageTitle = title ? `${title} — Stellar Portfolio` : document.title;
  const pageUrl = window.location.href;

  const setMeta = (selector, attributes, content) => {
    let meta = document.head.querySelector(selector);
    if (!meta) {
      meta = document.createElement('meta');
      Object.entries(attributes).forEach(([key, value]) => meta.setAttribute(key, value));
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  if (title) {
    document.title = pageTitle;
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

  setMeta('meta[property="og:title"]', { property: 'og:title' }, pageTitle);
  setMeta('meta[property="og:url"]', { property: 'og:url' }, pageUrl);
  setMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, pageTitle);

  if (description) {
    setMeta(
      'meta[property="og:description"]',
      { property: 'og:description' },
      description,
    );
    setMeta(
      'meta[name="twitter:description"]',
      { name: 'twitter:description' },
      description,
    );
  }

  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = pageUrl;
}
