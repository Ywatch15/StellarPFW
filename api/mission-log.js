// FILE: api/mission-log.js
// Vercel serverless function stub — mission-log endpoint
// Accepts POST with { name, email, message }; stores in DB or falls back to console
// Replace the DB adapter below with MongoDB / Supabase / Planetscale when ready.

/**
 * @typedef {Object} MissionEntry
 * @property {string} name
 * @property {string} email
 * @property {string} message
 * @property {string} [timestamp]
 */

// ---- DB adapter stub (swap this out) ----
async function saveToDB(entry) {
  // Example: await db.collection('missions').insertOne(entry);
  console.log('[mission-log] Saved entry:', JSON.stringify(entry));
  return { id: Date.now().toString(36), ...entry };
}

// ---- Rate-limit map (in-memory, per-instance) ----
const ipBucket = new Map();
const RATE_LIMIT = 10; // requests per minute per IP

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
    errors.push('name must be at least 2 characters');
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('valid email is required');
  }
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.push('message must be at least 10 characters');
  }
  return errors;
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
    return res.status(429).json({ error: 'Too many requests. Try again later.' });
  }

  try {
    const { name, email, message } = req.body || {};
    const errors = validate({ name, email, message });
    if (errors.length) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    const entry = await saveToDB({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
    });

    return res.status(201).json({ ok: true, entry });
  } catch (err) {
    console.error('[mission-log] Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
