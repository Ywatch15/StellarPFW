// FILE: api/contact.js
// Vercel serverless function — sends contact form emails via Nodemailer
// Environment variables: EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_TO

import nodemailer from 'nodemailer';

// ---- Rate-limit (in-memory, per-instance) ----
const ipBucket = new Map();
const RATE_LIMIT = 5; // max requests per minute per IP

function isRateLimited(ip) {
  const now = Date.now();
  const bucket = ipBucket.get(ip) || [];
  const recent = bucket.filter((t) => now - t < 60_000);
  if (recent.length >= RATE_LIMIT) return true;
  recent.push(now);
  ipBucket.set(ip, recent);
  return false;
}

// ---- Validation ----
function validate({ name, email, message }) {
  const errors = [];
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters.');
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('A valid email address is required.');
  }
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters.');
  }
  return errors;
}

// ---- Transporter (lazy-created, reused across warm invocations) ----
let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: Number(process.env.EMAIL_PORT) === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  return transporter;
}

// ---- Handler ----
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limit
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const { name, email, message } = req.body || {};
  const errors = validate({ name, email, message });
  if (errors.length) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  try {
    const transport = getTransporter();
    const recipient = process.env.EMAIL_TO || 'pathaksundram82@gmail.com';

    await transport.sendMail({
      from: `"Stellar Portfolio" <${process.env.EMAIL_USER}>`,
      replyTo: email.trim(),
      to: recipient,
      subject: `🌌 New transmission from ${name.trim()}`,
      text: [
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        '',
        'Message:',
        message.trim(),
        '',
        `— Sent from Stellar Portfolio at ${new Date().toISOString()}`,
      ].join('\n'),
      html: `
        <div style="font-family:Inter,sans-serif;max-width:520px;margin:0 auto;background:#0a0f2c;color:#e0e6ff;padding:32px;border-radius:12px;">
          <h2 style="color:#6c63ff;margin-top:0;">🌌 New Transmission</h2>
          <p><strong>Name:</strong> ${name.trim()}</p>
          <p><strong>Email:</strong> <a href="mailto:${email.trim()}" style="color:#38bdf8;">${email.trim()}</a></p>
          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:16px 0;" />
          <p style="white-space:pre-wrap;">${message.trim()}</p>
          <p style="font-size:12px;color:#64748b;margin-top:24px;">Sent from Stellar Portfolio &middot; ${new Date().toISOString()}</p>
        </div>
      `,
    });

    return res.status(200).json({ ok: true, message: 'Transmission received successfully.' });
  } catch (err) {
    console.error('[contact] Email send failed:', err);
    return res.status(500).json({
      error: 'Failed to send email. Please try again later.',
    });
  }
}
