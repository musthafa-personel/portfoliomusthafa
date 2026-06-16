/* =========================================================
   MUSTHAFA PORTFOLIO — CURSOR MODULE
   Custom cursor · Magnetic effects · Mouse glow
   ========================================================= */

const Cursor = (() => {
  let dot, ring, label;
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let isHovering = false;
  let rafId = null;

  function init() {
    dot   = document.getElementById('cursor-dot');
    ring  = document.getElementById('cursor-ring');
    label = document.getElementById('cursor-label');

    if (!dot || !ring) return;
    if (window.matchMedia('(max-width: 768px)').matches) return;

    bindEvents();
    animate();
  }

  function bindEvents() {
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });

    // Hover targets
    const hoverTargets = 'a, button, .btn, .tab-btn, .project-card, .service-card, .nav-link, [data-cursor]';
    document.addEventListener('mouseover', (e) => {
      const el = e.target.closest(hoverTargets);
      if (!el) return;

      const cursorType = el.dataset.cursor || (el.classList.contains('project-card') ? 'project' : 'hover');

      document.body.classList.remove('cursor-hover', 'cursor-project');
      document.body.classList.add('cursor-' + cursorType);

      if (cursorType === 'project') {
        label.textContent = 'View';
      }

      isHovering = true;
    });

    document.addEventListener('mouseout', (e) => {
      const el = e.target.closest(hoverTargets);
      if (!el) return;
      document.body.classList.remove('cursor-hover', 'cursor-project');
      label.style.opacity = '0';
      isHovering = false;
    });

    // Magnetic effect on buttons
    document.querySelectorAll('.magnetic').forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  function onMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Dot follows instantly
    if (dot) {
      dot.style.left = mouseX + 'px';
      dot.style.top  = mouseY + 'px';
    }

    // Label follows cursor
    if (label) {
      label.style.left = (mouseX + 20) + 'px';
      label.style.top  = (mouseY - 10) + 'px';
    }

    // Hero mouse glow
    const heroGlow = document.querySelector('.hero-glow');
    if (heroGlow) {
      const hero = document.getElementById('hero');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
          heroGlow.style.left = e.clientX + 'px';
          heroGlow.style.top  = e.clientY + 'px';
        }
      }
    }
  }

  function animate() {
    // Ring lags behind with lerp
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    if (ring) {
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
    }

    rafId = requestAnimationFrame(animate);
  }

  return { init };
})();
