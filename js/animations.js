/* =========================================================
   MUSTHAFA PORTFOLIO — ANIMATIONS MODULE
   IntersectionObserver · Scroll Reveals · Parallax · Hero
   ========================================================= */

const Animations = (() => {

  /* ── SCROLL REVEAL ─────────────────────────────────────── */
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur'
    ).forEach(el => observer.observe(el));
  }

  /* ── PARALLAX ON SCROLL ────────────────────────────────── */
  function initParallax() {
    const slowEls   = document.querySelectorAll('.parallax-slow');
    const mediumEls = document.querySelectorAll('.parallax-medium');
    const fastEls   = document.querySelectorAll('.parallax-fast');

    if (!slowEls.length && !mediumEls.length && !fastEls.length) return;

    let ticking = false;

    function applyParallax() {
      const scrollY = window.scrollY;
      slowEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + scrollY - window.innerHeight / 2) * 0.08;
        el.style.transform = `translateY(${offset}px)`;
      });
      mediumEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + scrollY - window.innerHeight / 2) * 0.15;
        el.style.transform = `translateY(${offset}px)`;
      });
      fastEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + scrollY - window.innerHeight / 2) * 0.25;
        el.style.transform = `translateY(${offset}px)`;
      });
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(applyParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── HERO NAME ANIMATION ───────────────────────────────── */
  function initHeroName() {
    const nameEl = document.getElementById('hero-name');
    if (!nameEl) return;

    const text = nameEl.dataset.text || 'MUSTHAFA';
    nameEl.innerHTML = '';

    const inner = document.createElement('span');
    inner.className = 'hero-name-inner';

    [...text].forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'hero-letter' + (i < 3 ? ' filled' : '');
      span.textContent = ch;
      span.style.animationDelay = (0.9 + i * 0.08) + 's';
      inner.appendChild(span);
    });

    nameEl.appendChild(inner);

    // After all letters animate, set them all filled
    setTimeout(() => {
      nameEl.querySelectorAll('.hero-letter').forEach(l => l.classList.add('filled'));
    }, 900 + text.length * 80 + 600);
  }

  /* ── SKILL CIRCLES ─────────────────────────────────────── */
  function initSkillCircles() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const circle = entry.target.querySelector('.skill-chart-fill');
          if (circle) {
            const level = parseInt(circle.dataset.level || 80);
            const circumference = 314; // 2π * r where r=50
            const offset = circumference - (level / 100) * circumference;
            circle.style.strokeDashoffset = offset;
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-item').forEach(el => observer.observe(el));
  }

  /* ── PROCESS TIMELINE ACTIVATION ──────────────────────── */
  function initProcessTimeline() {
    const steps = document.querySelectorAll('.process-step');
    if (!steps.length) return;

    let currentStep = -1;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate steps in sequence
          steps.forEach((step, i) => {
            setTimeout(() => step.classList.add('active'), i * 200);
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    const timeline = document.querySelector('.process-timeline');
    if (timeline) observer.observe(timeline);
  }

  /* ── JOURNEY TIMELINE ACTIVATION ──────────────────────── */
  function initJourneyTimeline() {
    const items = document.querySelectorAll('.timeline-item');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.4 });

    items.forEach(item => observer.observe(item));
  }

  /* ── STAGGER CHILDREN ──────────────────────────────────── */
  function initStaggerChildren() {
    const containers = document.querySelectorAll('[data-stagger]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          [...entry.target.children].forEach((child, i) => {
            child.style.transitionDelay = (i * 0.1) + 's';
            child.classList.add('revealed');
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    containers.forEach(c => observer.observe(c));
  }

  /* ── HEADER SECTION LINE ANIMATION ────────────────────── */
  function initSectionHeaders() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.section-header').forEach(h => observer.observe(h));
  }

  /* ── MOODBOARD HOVER 3D ────────────────────────────────── */
  function initCardTilt() {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        const tiltX = dy * -8;
        const tiltY = dx * 8;
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ── LOADING SCREEN ────────────────────────────────────── */
  function runLoader(onComplete) {
    const loader     = document.getElementById('loader');
    const bar        = document.querySelector('.loader-bar');
    const percent    = document.querySelector('.loader-percent');
    const logoFill   = document.querySelector('.loader-logo-fill');

    if (!loader) { onComplete && onComplete(); return; }

    let progress = 0;
    const duration = 2200;
    const start = performance.now();

    // Reveal logo text fill
    setTimeout(() => {
      if (logoFill) logoFill.classList.add('revealed');
    }, 300);

    function update(now) {
      const elapsed = now - start;
      progress = Math.min((elapsed / duration) * 100, 100);

      const eased = Math.round(progress === 100 ? 100 :
        100 * (1 - Math.pow(2, -10 * (progress / 100))));

      if (bar) bar.style.width = eased + '%';
      if (percent) percent.textContent = eased + '%';

      if (progress < 100) {
        requestAnimationFrame(update);
      } else {
        setTimeout(() => {
          loader.classList.add('hidden');
          document.body.style.overflow = '';
          onComplete && onComplete();
        }, 400);
      }
    }

    document.body.style.overflow = 'hidden';
    requestAnimationFrame(update);
  }

  /* ── PUBLIC ────────────────────────────────────────────── */
  function init() {
    initScrollReveal();
    initParallax();
    initHeroName();
    initSkillCircles();
    initProcessTimeline();
    initJourneyTimeline();
    initStaggerChildren();
    initSectionHeaders();

    // Card tilt after a short delay so cards are rendered
    setTimeout(initCardTilt, 500);
  }

  return { init, runLoader };
})();
