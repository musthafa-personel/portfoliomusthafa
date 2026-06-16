/* =========================================================
   MUSTHAFA PORTFOLIO — APP CONTROLLER
   Main init · Data merging · Section rendering · Contact
   ========================================================= */

const App = (() => {

  let data = {};

  /* ── DATA ──────────────────────────────────────────────── */
  function loadData() {
    const saved = localStorage.getItem('portfolio_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge: saved data takes precedence, but fill missing keys from defaults
        data = deepMerge(window.PORTFOLIO_DEFAULT_DATA || {}, parsed);
      } catch (e) {
        data = window.PORTFOLIO_DEFAULT_DATA || {};
      }
    } else {
      data = window.PORTFOLIO_DEFAULT_DATA || {};
    }
    window._portfolioData = data;
    return data;
  }

  function deepMerge(defaults, overrides) {
    const result = { ...defaults };
    for (const key in overrides) {
      if (Array.isArray(overrides[key]) && overrides[key].length > 0) {
        result[key] = overrides[key];
      } else if (typeof overrides[key] === 'object' && overrides[key] !== null && !Array.isArray(overrides[key])) {
        result[key] = deepMerge(defaults[key] || {}, overrides[key]);
      } else if (overrides[key] !== undefined && overrides[key] !== null && overrides[key] !== '') {
        result[key] = overrides[key];
      }
    }
    return result;
  }

  /* ── RENDER STATIC SECTIONS ────────────────────────────── */
  function renderAbout() {
    const about = data.about || {};

    // Nav logo
    setAllText('.nav-logo-name', about.name || 'Musthafa');
    setAllText('.footer-logo-name', about.name || 'Musthafa');
    setAllText('.footer-bio-text', about.bio || '');
    setAllText('.hero-title-text', about.title || 'Senior Graphic Designer');

    // Socials
    const socialMap = {
      'social-behance':   about.socials?.behance,
      'social-dribbble':  about.socials?.dribbble,
      'social-instagram': about.socials?.instagram,
      'social-linkedin':  about.socials?.linkedin,
      'social-whatsapp':  about.socials?.whatsapp,
      'contact-whatsapp': about.socials?.whatsapp,
    };
    for (const [id, href] of Object.entries(socialMap)) {
      const el = document.getElementById(id);
      if (el && href) el.href = href;
    }

    // Availability
    const avEl = document.querySelector('.availability-text');
    if (avEl) avEl.textContent = about.availability || 'Available for projects';
  }

  function renderStats() {
    const stats = data.stats || {};
    const mappings = [
      ['stat-projects',  stats.projects, '+'],
      ['stat-clients',   stats.clients,  '+'],
      ['stat-brands',    stats.brands,   ''],
      ['stat-experience',stats.experience, '+'],
      ['stat-designs',   stats.designs,  '+'],
    ];
    mappings.forEach(([id, val, suf]) => {
      const el = document.getElementById(id);
      if (el && val) {
        el.dataset.count  = val;
        el.dataset.suffix = suf;
        el.textContent    = '0' + suf;
      }
    });
  }

  function renderServices() {
    const wrap = document.getElementById('services-grid');
    if (!wrap) return;

    const ICONS = {
      logo: '◈', identity: '◉', poster: '▣', social: '⊞',
      motion: '◎', video: '▶', packaging: '⬡', marketing: '📄'
    };

    const services = data.services || [];
    wrap.innerHTML = services.map((s, i) => `
      <div class="service-card reveal stagger-${(i % 4) + 1}" data-id="${s.id}">
        <div class="service-icon">${ICONS[s.icon] || '◆'}</div>
        <div class="service-title">${s.title}</div>
        <div class="service-desc">${s.desc}</div>
        <span class="service-link">
          Enquire
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1.5 10.5L10.5 1.5M10.5 1.5H4.5M10.5 1.5V7.5" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </span>
      </div>
    `).join('');
  }

  function renderJourney() {
    const wrap = document.getElementById('journey-items');
    if (!wrap) return;

    const journey = data.journey || [];
    const TYPE_ICONS = {
      'Learning': '📚', 'Major Projects': '🏗️', 'Achievements': '🏆',
      'Milestones': '🎯', 'Awards': '🥇'
    };

    wrap.innerHTML = journey.map((item, i) => {
      const isEven = i % 2 === 0;
      return `
        <div class="timeline-item reveal">
          ${isEven ? `
            <div class="timeline-content reveal-left">
              <div class="timeline-year">${item.year}</div>
              <div class="timeline-type-badge">${TYPE_ICONS[item.type] || '◆'} ${item.type}</div>
              <div class="timeline-title">${item.title}</div>
              <div class="timeline-desc">${item.desc}</div>
            </div>
            <div class="timeline-center"><div class="timeline-dot"></div></div>
            <div class="timeline-empty"></div>
          ` : `
            <div class="timeline-empty"></div>
            <div class="timeline-center"><div class="timeline-dot"></div></div>
            <div class="timeline-content reveal-right">
              <div class="timeline-year">${item.year}</div>
              <div class="timeline-type-badge">${TYPE_ICONS[item.type] || '◆'} ${item.type}</div>
              <div class="timeline-title">${item.title}</div>
              <div class="timeline-desc">${item.desc}</div>
            </div>
          `}
        </div>
      `;
    }).join('');
  }

  function renderSkills() {
    const wrap = document.getElementById('skills-grid');
    if (!wrap) return;

    const skills = data.skills || [];
    const circumference = 314;

    wrap.innerHTML = skills.map((s, i) => {
      const offset = circumference - (s.level / 100) * circumference;
      return `
        <div class="skill-item reveal stagger-${i + 1}">
          <div class="skill-chart">
            <svg viewBox="0 0 120 120">
              <defs>
                <linearGradient id="goldGradient${i}" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#a08020"/>
                  <stop offset="100%" style="stop-color:#f5e17a"/>
                </linearGradient>
              </defs>
              <circle class="skill-chart-bg" cx="60" cy="60" r="50"/>
              <circle class="skill-chart-fill"
                cx="60" cy="60" r="50"
                stroke="url(#goldGradient${i})"
                style="stroke-dashoffset:${circumference}"
                data-level="${s.level}"
                data-offset="${offset}"/>
            </svg>
            <div class="skill-chart-center">
              <span class="skill-percent" data-count="${s.level}" data-suffix="%">0%</span>
            </div>
          </div>
          <span class="skill-name">${s.name}</span>
        </div>
      `;
    }).join('');
  }

  function renderAwards() {
    const wrap = document.getElementById('awards-grid');
    if (!wrap) return;

    const awards = data.awards || [];
    wrap.innerHTML = awards.map((a, i) => `
      <div class="award-card reveal stagger-${i + 1}">
        <div class="award-icon">🏆</div>
        <div class="award-title">${a.title}</div>
        <div class="award-org">${a.organization}</div>
        <div class="award-meta">${a.year} · ${a.project}</div>
      </div>
    `).join('');
  }

  function renderTestimonials() {
    const track = document.querySelector('.testimonials-track');
    if (!track) return;

    const testimonials = (data.projects || [])
      .filter(p => p.testimonial)
      .map(p => p.testimonial);

    if (!testimonials.length) return;

    track.innerHTML = testimonials.map(t => `
      <div class="testimonial-card">
        <div class="testimonial-card-inner">
          <p class="testimonial-text">${t.text}</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar">${t.author[0]}</div>
            <div>
              <div class="testimonial-name">${t.author}</div>
              <div class="testimonial-role">${t.role}</div>
              <div class="testimonial-stars">
                ${Array(t.rating || 5).fill('<span>★</span>').join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Re-render dots
    const dotsWrap = document.querySelector('.testimonials-dots');
    if (dotsWrap) {
      dotsWrap.innerHTML = testimonials.map((_, i) =>
        `<div class="testimonial-dot ${i === 0 ? 'active' : ''}" data-idx="${i}"></div>`
      ).join('');
    }
  }

  function renderMoodboard() {
    const wrap = document.getElementById('moodboard-grid');
    if (!wrap) return;

    // Curated moodboard images
    const images = [
      { url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600', label: 'Typography' },
      { url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600', label: 'Logo Design' },
      { url: 'https://images.unsplash.com/photo-1609921205586-7e8a57516512?q=80&w=600', label: 'Branding' },
      { url: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=600', label: 'Packaging' },
      { url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600', label: 'Motion' },
      { url: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=600', label: 'Poster' },
      { url: 'https://images.unsplash.com/photo-1563986768711-b3bde3dc821e?q=80&w=600', label: 'Social Media' },
      { url: 'https://images.unsplash.com/photo-1586717799252-bd134ad00e26?q=80&w=600', label: 'Illustration' },
      { url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=600', label: 'Color Study' },
      { url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600', label: 'Video Edit' },
      { url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600', label: 'Brand ID' },
      { url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=600', label: 'Print' },
    ];

    wrap.innerHTML = images.map(img => `
      <div class="moodboard-item reveal">
        <img src="${img.url}" alt="${img.label}" loading="lazy">
        <div class="moodboard-overlay">
          <span class="tag">${img.label}</span>
        </div>
      </div>
    `).join('');
  }

  function renderFeaturedSpotlight() {
    const projects = data.projects || [];
    if (!projects.length) return;

    const featured = projects[0];
    const imgEl    = document.getElementById('spotlight-img');
    const titleEl  = document.getElementById('spotlight-title');
    const descEl   = document.getElementById('spotlight-desc');
    const tagsEl   = document.getElementById('spotlight-tags');
    const linkEl   = document.getElementById('spotlight-link');

    if (imgEl)    imgEl.src         = featured.heroImage;
    if (titleEl)  titleEl.textContent = featured.title;
    if (descEl)   descEl.textContent  = featured.description;
    if (tagsEl)   tagsEl.innerHTML    = (featured.tags || []).map(t => `<span class="tag">${t}</span>`).join('');
    if (linkEl)   linkEl.addEventListener('click', () => Portfolio.openModal(featured.id));
  }

  /* ── CONTACT FORM ──────────────────────────────────────── */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(() => {
        Utils.toast('Message sent! Musthafa will get back to you soon.', 'success');
        form.reset();
        btn.textContent = 'Send Message';
        btn.disabled = false;
      }, 1500);
    });
  }

  /* ── DESIGN PROCESS SECTION ────────────────────────────── */
  function renderDesignProcess() {
    const steps = [
      { num: '01', icon: '🔍', name: 'Research',     text: 'Deep competitor analysis, audience research, and discovery to lay a solid creative foundation.' },
      { num: '02', icon: '💡', name: 'Concept',      text: 'Ideation sessions, mood boards, and concept mapping to find the strongest creative direction.' },
      { num: '03', icon: '✏️', name: 'Sketching',    text: 'Rough hand-drawn thumbnails and wireframes that explore layout, form, and composition.' },
      { num: '04', icon: '🎨', name: 'Design',       text: 'Bringing the concept to life with precision typography, color harmony, and visual hierarchy.' },
      { num: '05', icon: '🔬', name: 'Refinement',   text: 'Iterative feedback cycles, pixel-perfect polish, and print/screen optimization.' },
      { num: '06', icon: '📦', name: 'Delivery',     text: 'Organized, production-ready files with full guidelines for print, web, and motion use.' },
    ];

    const wrap = document.getElementById('process-cards');
    if (!wrap) return;

    wrap.innerHTML = steps.map((s, i) => `
      <div class="process-card reveal stagger-${(i % 3) + 1}">
        <div class="process-num">${s.num}</div>
        <div class="process-icon">${s.icon}</div>
        <div class="process-name">${s.name}</div>
        <div class="process-text">${s.text}</div>
      </div>
    `).join('');
  }

  /* ── HELPERS ───────────────────────────────────────────── */
  function setAllText(selector, text) {
    document.querySelectorAll(selector).forEach(el => {
      if (el.tagName === 'INPUT') el.value = text;
      else el.textContent = text;
    });
  }

  /* ── BOOT SEQUENCE ─────────────────────────────────────── */
  function boot() {
    // 1. Show loader
    Animations.runLoader(() => {
      // 2. After loader: kick everything off
      document.body.style.overflow = '';
    });

    // 3. Load data
    loadData();

    // 4. Render all sections
    renderAbout();
    renderStats();
    renderServices();
    renderJourney();
    renderSkills();
    renderAwards();
    renderTestimonials();
    renderMoodboard();
    renderFeaturedSpotlight();
    renderDesignProcess();

    // 5. Init portfolio
    Portfolio.init(data);

    // 6. Init animations
    setTimeout(() => {
      Animations.init();
    }, 300);

    // 7. Init utils
    Utils.init();

    // 8. Init cursor
    Cursor.init();

    // 9. Init particles
    Particles.init();

    // 10. Contact form
    initContactForm();

    // 11. Handle deep link
    Portfolio.handleDeepLink();
  }

  return { boot, data: () => data };
})();

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.boot());
} else {
  App.boot();
}
