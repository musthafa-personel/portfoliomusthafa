/* =========================================================
   MUSTHAFA PORTFOLIO — PARTICLES MODULE
   Canvas-based gold particle system for hero background
   ========================================================= */

const Particles = (() => {
  let canvas, ctx, particles = [], animId;
  let W, H;
  const COUNT = window.innerWidth < 768 ? 40 : 80;

  const GOLD_COLORS = [
    'rgba(212,175,55,',
    'rgba(240,208,96,',
    'rgba(160,128,32,',
    'rgba(245,225,120,',
  ];

  class Particle {
    constructor() { this.reset(true); }

    reset(init = false) {
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : H + 10;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = -(Math.random() * 0.6 + 0.2);
      this.life = 0;
      this.maxLife = Math.random() * 300 + 200;
      this.color = GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)];
      this.angle = Math.random() * Math.PI * 2;
      this.angleSpeed = (Math.random() - 0.5) * 0.01;
      this.twinkle = Math.random() > 0.5;
      this.twinkleSpeed = Math.random() * 0.05 + 0.02;
      this.twinklePhase = Math.random() * Math.PI * 2;
    }

    update() {
      this.life++;
      this.x += this.speedX + Math.sin(this.angle) * 0.3;
      this.y += this.speedY;
      this.angle += this.angleSpeed;

      // Life-based alpha
      const progress = this.life / this.maxLife;
      if (progress < 0.1) {
        this.alpha = progress / 0.1;
      } else if (progress > 0.7) {
        this.alpha = 1 - (progress - 0.7) / 0.3;
      } else {
        this.alpha = 1;
      }

      if (this.twinkle) {
        this.twinklePhase += this.twinkleSpeed;
        this.alpha *= 0.6 + Math.sin(this.twinklePhase) * 0.4;
      }

      if (this.life >= this.maxLife || this.y < -20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha * 0.7;

      // Glow
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.size * 3
      );
      gradient.addColorStop(0, this.color + '0.9)');
      gradient.addColorStop(0.5, this.color + '0.3)');
      gradient.addColorStop(1, this.color + '0)');

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + '1)';
      ctx.fill();

      ctx.restore();
    }
  }

  // Mesh/connection lines
  function drawConnections() {
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.06;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(212,175,55,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(loop);
  }

  function init() {
    canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    resize();

    for (let i = 0; i < COUNT; i++) {
      particles.push(new Particle());
    }

    window.addEventListener('resize', resize);
    loop();
  }

  function destroy() {
    if (animId) cancelAnimationFrame(animId);
  }

  return { init, destroy };
})();
