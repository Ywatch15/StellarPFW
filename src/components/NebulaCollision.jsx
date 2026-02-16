// FILE: src/components/NebulaCollision.jsx
// Full-screen star-collision → nebula-formation animation (3.5s)
// Pure CSS + Canvas — no WebGL dependency
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Particle class for the collision effect
class Particle {
  constructor(cx, cy, color, speed, angle, life) {
    this.x = cx;
    this.y = cy;
    this.color = color;
    this.speed = speed;
    this.angle = angle;
    this.life = life;
    this.maxLife = life;
    this.size = Math.random() * 3 + 1;
    this.decay = 0.98;
  }
  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.speed *= this.decay;
    this.life -= 1;
  }
  draw(ctx) {
    const alpha = Math.max(0, this.life / this.maxLife);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * (0.5 + alpha * 0.5), 0, Math.PI * 2);
    ctx.fill();
  }
}

const COLORS = ['#6c63ff', '#38bdf8', '#facc15', '#f43f5e', '#a78bfa', '#e0e6ff', '#ffffff'];

export default function NebulaCollision({ onComplete }) {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState('collision'); // collision | nebula | done

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const cx = W / 2;
    const cy = H / 2;
    let particles = [];
    let stars = [];
    let frame = 0;
    let animId;
    const TOTAL_FRAMES = 210; // ~3.5s at 60fps

    // Two stars approaching
    const star1 = { x: cx - W * 0.3, y: cy, targetX: cx - 10, size: 20, color: '#38bdf8' };
    const star2 = { x: cx + W * 0.3, y: cy, targetX: cx + 10, size: 20, color: '#facc15' };

    // Background stars
    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    const collisionFrame = 60; // Frame when collision happens
    const nebulaStart = 90;

    function spawnExplosion() {
      for (let i = 0; i < 200; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 1;
        const life = Math.random() * 80 + 40;
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        particles.push(new Particle(cx, cy, color, speed, angle, life));
      }
    }

    function drawStar(ctx, x, y, size, color, glow) {
      // Glow
      const grad = ctx.createRadialGradient(x, y, 0, x, y, size * glow);
      grad.addColorStop(0, color);
      grad.addColorStop(0.4, color + '88');
      grad.addColorStop(1, 'transparent');
      ctx.globalAlpha = 1;
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, size * glow, 0, Math.PI * 2);
      ctx.fill();
      // Core
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(x, y, size * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawNebula(ctx, progress) {
      // Multi-layered nebula clouds
      const layers = [
        { color: '108, 99, 255', size: 180, offset: 0 },
        { color: '56, 189, 248', size: 220, offset: 30 },
        { color: '250, 204, 21', size: 160, offset: -20 },
        { color: '167, 139, 250', size: 200, offset: 15 },
        { color: '244, 63, 94', size: 140, offset: -35 },
      ];
      layers.forEach((l) => {
        const s = l.size * progress;
        const grad = ctx.createRadialGradient(
          cx + l.offset * progress,
          cy + l.offset * 0.5 * progress,
          0,
          cx + l.offset * progress,
          cy + l.offset * 0.5 * progress,
          s,
        );
        grad.addColorStop(0, `rgba(${l.color}, ${0.3 * progress})`);
        grad.addColorStop(0.5, `rgba(${l.color}, ${0.15 * progress})`);
        grad.addColorStop(1, 'transparent');
        ctx.globalAlpha = 1;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx + l.offset * progress, cy + l.offset * 0.5 * progress, s, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function animate() {
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#050816';
      ctx.fillRect(0, 0, W, H);

      // Background stars
      stars.forEach((s) => {
        ctx.globalAlpha = s.alpha * (0.7 + 0.3 * Math.sin(frame * 0.05 + s.x));
        ctx.fillStyle = '#e0e6ff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (frame < collisionFrame) {
        // Approach phase
        const t = frame / collisionFrame;
        const ease = t * t * (3 - 2 * t); // smoothstep
        star1.x = (cx - W * 0.3) + (star1.targetX - (cx - W * 0.3)) * ease;
        star2.x = (cx + W * 0.3) + (star2.targetX - (cx + W * 0.3)) * ease;
        const glowPulse = 2 + t * 2;
        drawStar(ctx, star1.x, star1.y, star1.size, star1.color, glowPulse);
        drawStar(ctx, star2.x, star2.y, star2.size, star2.color, glowPulse);

        // Gravitational sparks as they approach
        if (frame > 30 && frame % 3 === 0) {
          for (let i = 0; i < 3; i++) {
            const fromStar = i % 2 === 0 ? star1 : star2;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 2 + 0.5;
            const life = 25;
            particles.push(new Particle(fromStar.x, fromStar.y, fromStar.color, speed, angle, life));
          }
        }
      } else if (frame === collisionFrame) {
        // Collision flash
        spawnExplosion();
        setPhase('nebula');
      }

      if (frame > collisionFrame && frame < collisionFrame + 15) {
        // White flash
        const flashAlpha = 1 - (frame - collisionFrame) / 15;
        ctx.globalAlpha = flashAlpha * 0.8;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);
      }

      // Nebula formation
      if (frame >= nebulaStart) {
        const nebulaProgress = Math.min(1, (frame - nebulaStart) / (TOTAL_FRAMES - nebulaStart));
        drawNebula(ctx, nebulaProgress);
      }

      // Update and draw particles
      particles = particles.filter((p) => p.life > 0);
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });
      ctx.globalAlpha = 1;

      frame++;
      if (frame < TOTAL_FRAMES) {
        animId = requestAnimationFrame(animate);
      } else {
        setPhase('done');
      }
    }

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // When done, trigger callback after showing acknowledgment
  useEffect(() => {
    if (phase === 'done') {
      const t = setTimeout(() => onComplete?.(), 2000);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ width: '100%', height: '100%' }}
      />
      <AnimatePresence>
        {phase === 'done' && (
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="mb-4 text-5xl">✦</div>
            <h2 className="font-heading text-3xl font-bold text-stardust sm:text-4xl">
              Transmission <span className="text-gradient-aurora">Received</span>
            </h2>
            <p className="mt-3 text-cosmos-muted">
              Your message has been sent across the cosmos.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
