import { useEffect, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // ─── Cache mobile flag outside the loop — avoids a layout read every frame ──
    let isMobile = window.innerWidth < 768;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-cache after resize
      isMobile = window.innerWidth < 768;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    const createParticles = () => {
      particles = [];
      const count = isMobile ? 20 : 80;
      const speed = isMobile ? 0.15 : 0.3;

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,           // slightly smaller — no gradient needed
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          opacity: Math.random() * 0.5 + 0.25,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    };

    createParticles();

    // Throttle to 30fps on mobile, 60fps on desktop
    let lastFrameTime = 0;
    const frameInterval = isMobile ? 1000 / 30 : 1000 / 60;

    // Pre-build a fixed background gradient once — reused every frame
    let bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

    const buildBgGradient = () => {
      bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      if (theme === 'light') {
        bgGradient.addColorStop(0, 'rgba(249,250,251,0.8)');
        bgGradient.addColorStop(0.5, 'rgba(243,244,246,0.6)');
        bgGradient.addColorStop(1, 'rgba(229,231,235,0.8)');
      } else {
        bgGradient.addColorStop(0, 'rgba(17,24,39,0.9)');
        bgGradient.addColorStop(0.5, 'rgba(0,0,0,0.95)');
        bgGradient.addColorStop(1, 'rgba(30,41,59,0.9)');
      }
    };

    buildBgGradient();

    // Pre-computed particle colour strings — avoids string concatenation per frame
    const particleColor  = theme === 'light' ? '99,102,241' : '139,92,246';
    const connectionColor = theme === 'light' ? '99,102,241' : '139,92,246';

    const animate = (currentTime) => {
      if (currentTime - lastFrameTime < frameInterval) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background — reuse cached gradient, no new allocation
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.05;

        // Edge wrap
        if (p.x < 0) p.x = canvas.width;
        else if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        else if (p.y > canvas.height) p.y = 0;

        const pulseR   = p.radius + Math.sin(p.pulse) * 0.4;
        const pulseOp  = p.opacity + Math.sin(p.pulse) * 0.15;

        // ─── Plain filled circle instead of per-particle radial gradient ──────
        // Saves ~80 RadialGradient allocations per frame (~4,800/s at 60fps)
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulseR * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor},${(pulseOp * 0.35).toFixed(2)})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, pulseR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor},${pulseOp.toFixed(2)})`;
        ctx.fill();

        // ─── Particle connections (desktop only — isMobile already cached) ────
        if (!isMobile) {
          for (let j = i + 1; j < particles.length; j++) {
            const o = particles[j];
            const dx = p.x - o.x;
            const dy = p.y - o.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 180) {
              const alpha = ((1 - dist / 180) * 0.25).toFixed(2);
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(o.x, o.y);
              ctx.strokeStyle = `rgba(${connectionColor},${alpha})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full -z-10"
      style={{
        background: theme === 'light'
          ? 'linear-gradient(135deg,#f9fafb 0%,#f3f4f6 50%,#e5e7eb 100%)'
          : 'linear-gradient(135deg,#111827 0%,#000000 50%,#1e293b 100%)',
      }}
    />
  );
};

export default AnimatedBackground;
