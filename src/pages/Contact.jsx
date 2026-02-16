// FILE: src/pages/Contact.jsx
// Contact / Docking Bay page — form POSTs to /api/contact + social links
import React, { useState } from 'react';
import { motion } from 'motion/react';
import useSEO from '../hooks/useSEO';

// Inline SVG brand icons (16×16)
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);
const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
);
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
);
const DiscordIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.8733.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>
);
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
);

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sundram-pathak-3469b6256/',
    icon: <LinkedInIcon />,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Ywatch15',
    icon: <GitHubIcon />,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/sundram_pathak150',
    icon: <InstagramIcon />,
  },
  {
    label: 'Discord',
    href: 'https://discordapp.com/users/1143958531142336683',
    icon: <DiscordIcon />,
  },
  {
    label: 'X/Twitter',
    href: 'https://x.com/Sun_D_Ram',
    icon: <XIcon />,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');

  useSEO({
    title: 'Contact',
    description: 'Get in touch — send a transmission to collaborate on your next project.',
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      // Guard against non-JSON responses (e.g. Vite dev server 404 HTML)
      const contentType = res.headers.get('content-type') || '';
      let data = {};
      if (contentType.includes('application/json')) {
        data = await res.json();
      } else if (!res.ok) {
        throw new Error(
          'The contact API is not available. Please deploy to Vercel or run "npx vercel dev" locally.',
        );
      }

      if (!res.ok) {
        throw new Error(
          data.details ? data.details.join(' ') : data.error || 'Unknown error',
        );
      }

      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Transmission failed. Please try again.');
    }
  };

  return (
    <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16" aria-label="Contact">
      <h1 className="font-heading text-3xl font-bold sm:text-4xl">
        <span className="text-gradient-aurora">Docking</span> Bay
      </h1>
      <p className="mt-2 text-cosmos-muted">
        Have a mission in mind? Send a transmission.
      </p>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-10 space-y-6"
        noValidate
      >
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-stardust">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-nebula px-4 py-3 text-stardust placeholder-cosmos-muted outline-none transition-colors focus:border-comet"
            placeholder="Commander Shepard"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-stardust">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-nebula px-4 py-3 text-stardust placeholder-cosmos-muted outline-none transition-colors focus:border-comet"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-medium text-stardust">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="w-full resize-none rounded-lg border border-white/10 bg-nebula px-4 py-3 text-stardust placeholder-cosmos-muted outline-none transition-colors focus:border-comet"
            placeholder="Tell me about your mission…"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full rounded-lg bg-comet px-6 py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-comet/80 disabled:opacity-50"
        >
          {status === 'sending' ? 'Transmitting…' : 'Send Transmission'}
        </button>

        {status === 'sent' && (
          <p className="text-center text-sm text-aurora" role="status">
            ✓ Transmission received. I&apos;ll respond soon.
          </p>
        )}
        {status === 'error' && (
          <p className="text-center text-sm text-supernova" role="alert">
            ✗ {errorMsg || 'Transmission failed. Please try again.'}
          </p>
        )}
      </motion.form>

      {/* Social links */}
      <div className="mt-12 flex flex-wrap justify-center gap-3 sm:gap-4">
        {socials.map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-cosmos-muted transition-colors hover:border-aurora hover:text-aurora sm:px-5 sm:text-sm"
            aria-label={label}
          >
            <span aria-hidden="true">{icon}</span>
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}
