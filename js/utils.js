/* =========================================================
   MUSTHAFA PORTFOLIO — UTILS MODULE
   Counters · Carousel · Scroll · Toast · Quote · Sounds
   ========================================================= */

const Utils = (() => {

  /* ── SMOOTH SCROLL ─────────────────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ── ANIMATED COUNTER ──────────────────────────────────── */
  function animateCounter(el, target, duration = 2000, suffix = '') {
    const start = performance.now();
    const initial = 0;

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(initial + (target - initial) * eased);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          const target = parseInt(entry.target.dataset.count);
          const suffix = entry.target.dataset.suffix || '';
          animateCounter(entry.target, target, 2200, suffix);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  /* ── TESTIMONIALS CAROUSEL ─────────────────────────────── */
  function initTestimonialsCarousel() {
    const track = document.querySelector('.testimonials-track');
    const dots  = document.querySelectorAll('.testimonial-dot');
    const prev  = document.getElementById('test-prev');
    const next  = document.getElementById('test-next');

    if (!track) return;

    let current = 0;
    let total   = track.children.length;
    let autoTimer;

    function goTo(idx) {
      current = (idx + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function startAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(() => goTo(current + 1), 5000);
    }

    if (prev) prev.addEventListener('click', () => { goTo(current - 1); startAuto(); });
    if (next) next.addEventListener('click', () => { goTo(current + 1); startAuto(); });
    dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); startAuto(); }));

    goTo(0);
    startAuto();
  }

  /* ── QUOTE GENERATOR ───────────────────────────────────── */
  function initQuoteGenerator() {
    const el = document.getElementById('quote-text');
    const btn = document.getElementById('quote-refresh');

    if (!el) return;

    const data = window._portfolioData || window.PORTFOLIO_DEFAULT_DATA;
    const quotes = data?.quotes || ['Design is intelligence made visible.'];
    let idx = 0;
    let typing = false;

    function typeWriter(text, target, speed = 35) {
      if (typing) return;
      typing = true;
      target.innerHTML = '';
      let i = 0;

      const cursor = document.createElement('span');
      cursor.className = 'cursor-blink';
      target.appendChild(cursor);

      function type() {
        if (i < text.length) {
          cursor.before(text[i]);
          i++;
          setTimeout(type, speed + Math.random() * 20);
        } else {
          setTimeout(() => {
            cursor.remove();
            typing = false;
          }, 1000);
        }
      }
      type();
    }

    function showQuote() {
      const q = quotes[idx % quotes.length];
      idx++;
      typeWriter(q, el);
    }

    if (btn) {
      btn.addEventListener('click', () => {
        if (!typing) showQuote();
      });
    }

    showQuote();
    setInterval(() => { if (!typing) showQuote(); }, 8000);
  }

  /* ── BACK TO TOP ───────────────────────────────────────── */
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── NAVBAR SCROLL STATE ───────────────────────────────── */
  function initNavbar() {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // Mobile hamburger
    const ham = document.getElementById('nav-hamburger');
    const mob = document.getElementById('nav-mobile');
    if (ham && mob) {
      ham.addEventListener('click', () => {
        ham.classList.toggle('active');
        mob.classList.toggle('open');
        document.body.classList.toggle('menu-open');
      });

      mob.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          ham.classList.remove('active');
          mob.classList.remove('open');
          document.body.classList.remove('menu-open');
        });
      });
    }
  }

  /* ── TOAST NOTIFICATION ────────────────────────────────── */
  function toast(msg, type = 'success') {
    const el = document.createElement('div');
    el.className = 'toast toast-' + type;
    el.innerHTML = `<span>${type === 'success' ? '✓' : '!'}</span> ${msg}`;
    el.style.cssText = `
      position:fixed; bottom:80px; right:24px; z-index:99999;
      background:${type === 'success' ? 'var(--glass-gold)' : 'rgba(248,113,113,0.15)'};
      border:1px solid ${type === 'success' ? 'var(--gold-border)' : 'rgba(248,113,113,0.3)'};
      color:${type === 'success' ? 'var(--gold)' : '#f87171'};
      padding:14px 20px; border-radius:10px; font-size:14px;
      font-family:var(--font-body); font-weight:600;
      backdrop-filter:blur(12px); display:flex; gap:10px; align-items:center;
      animation:fadeInUp 0.4s; max-width:320px; box-shadow:var(--shadow-md);
    `;
    document.body.appendChild(el);
    setTimeout(() => {
      el.style.animation = 'fadeInDown 0.4s reverse';
      setTimeout(() => el.remove(), 400);
    }, 3000);
  }

  /* ── FORMAT NUMBER ─────────────────────────────────────── */
  function formatNum(n) {
    if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
    return n.toString();
  }

  /* ── PUBLIC ────────────────────────────────────────────── */
  function init() {
    initSmoothScroll();
    initCounters();
    initTestimonialsCarousel();
    initQuoteGenerator();
    initBackToTop();
    initNavbar();
  }

  return { init, toast, animateCounter, formatNum };
})();
