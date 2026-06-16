/* =========================================================
   MUSTHAFA PORTFOLIO — PORTFOLIO MODULE
   Grid · Filters · Modal · Before/After · Related Projects
   ========================================================= */

const Portfolio = (() => {
  let data = {};
  let activeCategory = 'All';
  let activeYear = 'All';
  let activeStyle = 'All';
  let currentProjectId = null;

  const CATEGORY_ICONS = {
    'All': '✦', 'Logo Design': '◈', 'Branding': '◉', 'Poster Design': '▣',
    'Social Media Designs': '⊞', 'Illustration': '✦', 'Packaging Design': '⬡',
    'Video Editing': '▶', 'Motion Graphics': '◎'
  };

  /* ── INIT ──────────────────────────────────────────────── */
  function init(portfolioData) {
    data = portfolioData;
    renderCategoryTabs();
    renderFilterBars();
    renderGrid(data.projects);
    initModal();
    trackVisit();
  }

  /* ── CATEGORY TABS ─────────────────────────────────────── */
  function renderCategoryTabs() {
    const container = document.getElementById('portfolio-tabs');
    if (!container) return;

    const projects = data.projects || [];
    const categories = ['All', ...new Set(projects.map(p => p.category))];

    container.innerHTML = categories.map(cat => {
      const count = cat === 'All' ? projects.length : projects.filter(p => p.category === cat).length;
      return `
        <button class="tab-btn ${cat === 'All' ? 'active' : ''}" data-cat="${cat}">
          <span>${CATEGORY_ICONS[cat] || '◆'}</span>
          ${cat}
          <span class="tab-count">${count}</span>
        </button>
      `;
    }).join('');

    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.tab-btn');
      if (!btn) return;
      activeCategory = btn.dataset.cat;
      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterAndRender();
    });
  }

  /* ── FILTER BARS ───────────────────────────────────────── */
  function renderFilterBars() {
    const yearSel  = document.getElementById('filter-year');
    const styleSel = document.getElementById('filter-style');
    if (!yearSel || !styleSel) return;

    const projects = data.projects || [];
    const years  = ['All', ...new Set(projects.map(p => p.year))].sort((a, b) => b - a);
    const styles = ['All', ...new Set(projects.map(p => p.style).filter(Boolean))];

    yearSel.innerHTML  = years.map(y => `<option value="${y}">${y}</option>`).join('');
    styleSel.innerHTML = styles.map(s => `<option value="${s}">${s}</option>`).join('');

    yearSel.addEventListener('change',  (e) => { activeYear  = e.target.value; filterAndRender(); });
    styleSel.addEventListener('change', (e) => { activeStyle = e.target.value; filterAndRender(); });
  }

  /* ── FILTER ────────────────────────────────────────────── */
  function filterAndRender() {
    let projects = data.projects || [];

    if (activeCategory !== 'All') {
      projects = projects.filter(p => p.category === activeCategory);
    }
    if (activeYear !== 'All') {
      projects = projects.filter(p => p.year === activeYear);
    }
    if (activeStyle !== 'All') {
      projects = projects.filter(p => p.style === activeStyle);
    }

    renderGrid(projects);
    // Re-init tilt after render
    setTimeout(() => Animations.init && Animations.init(), 100);
  }

  /* ── RENDER GRID ───────────────────────────────────────── */
  function renderGrid(projects) {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;

    if (!projects.length) {
      grid.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:80px 0; color:var(--text-muted);">
          <div style="font-size:48px; margin-bottom:16px;">✦</div>
          <div style="font-family:var(--font-display); font-size:20px; font-weight:700;">No projects found</div>
          <div style="font-size:14px; margin-top:8px;">Try a different filter combination</div>
        </div>
      `;
      return;
    }

    grid.innerHTML = projects.map((p, i) => `
      <div class="project-card reveal stagger-${(i % 4) + 1}"
           data-id="${p.id}"
           data-cursor="project"
           ${i === 0 ? 'style="grid-column:span 2"' : ''}>
        <div class="project-card-img">
          <img src="${p.heroImage}" alt="${p.title}" loading="lazy"
               onerror="this.src='https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800'">
          <div class="project-card-overlay">
            <div class="project-card-overlay-title">${p.title}</div>
            <div class="project-card-overlay-tags">
              ${(p.tags || []).slice(0, 2).map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
          </div>
        </div>
        <div class="project-card-body">
          <div class="project-card-category">${p.category}</div>
          <div class="project-card-title">${p.title}</div>
          <div class="project-card-desc">${p.description}</div>
        </div>
        <div class="project-card-footer">
          <span class="project-card-year">${p.year} · ${p.client || ''}</span>
          <div class="project-card-arrow">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      </div>
    `).join('');

    // Bind click
    grid.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => openModal(card.dataset.id));
    });

    // Trigger reveal for new cards
    requestAnimationFrame(() => {
      grid.querySelectorAll('.reveal').forEach(el => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); });
        }, { threshold: 0.1 });
        observer.observe(el);
      });
    });
  }

  /* ── MODAL ─────────────────────────────────────────────── */
  function initModal() {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close');
    if (!modal) return;

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.querySelector('.modal-backdrop')?.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  function openModal(id) {
    const project = (data.projects || []).find(p => p.id === id);
    if (!project) return;
    currentProjectId = id;

    // Track view
    trackProjectView(id);

    // Populate modal
    populateModal(project);

    const modal = document.getElementById('project-modal');
    if (!modal) return;
    modal.classList.add('open');
    document.body.classList.add('modal-open');
    window.location.hash = id;

    // Activate process steps with delay
    setTimeout(() => {
      modal.querySelectorAll('.process-step').forEach((step, i) => {
        setTimeout(() => step.classList.add('active'), i * 200);
      });
    }, 300);
  }

  function closeModal() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
    history.replaceState(null, '', window.location.pathname);
    currentProjectId = null;
  }

  function populateModal(p) {
    // Hero
    const heroImg  = document.getElementById('modal-hero-img');
    const heroCat  = document.getElementById('modal-hero-cat');
    const heroTitle = document.getElementById('modal-hero-title');
    const heroYear = document.getElementById('modal-hero-year');
    const heroClient = document.getElementById('modal-hero-client');
    const heroStyle  = document.getElementById('modal-hero-style');

    if (heroImg)    heroImg.src = p.heroImage;
    if (heroImg)    heroImg.alt = p.title;
    if (heroCat)    heroCat.textContent = p.category;
    if (heroTitle)  heroTitle.textContent = p.title;
    if (heroYear)   heroYear.innerHTML = `<strong>Year:</strong> ${p.year}`;
    if (heroClient) heroClient.innerHTML = `<strong>Client:</strong> ${p.client || 'Personal'}`;
    if (heroStyle)  heroStyle.innerHTML = `<strong>Style:</strong> ${p.style || '—'}`;

    // Before/After
    const baAfterImg  = document.getElementById('ba-after-img');
    const baBeforeImg = document.getElementById('ba-before-img');
    if (baBeforeImg) baBeforeImg.src = p.beforeImage || p.heroImage;
    if (baAfterImg)  baAfterImg.src  = p.afterImage  || p.heroImage;
    initBeforeAfterSlider();

    // Story
    const story = p.story || {};
    setInner('modal-story-concept',   story.concept   || '');
    setInner('modal-story-challenge', story.challenge || '');
    setInner('modal-story-solution',  story.solution  || '');

    // Process
    const processWrap = document.getElementById('modal-process');
    if (processWrap && p.process) {
      processWrap.innerHTML = p.process.map((step, i) => `
        <div class="process-step" style="transition-delay:${i * 0.1}s">
          <div class="process-step-dot">${i + 1}</div>
          <div>
            <div class="process-step-title">${step.step}</div>
            <div class="process-step-desc">${step.desc}</div>
          </div>
        </div>
      `).join('');
    }

    // Colors
    const colorsWrap = document.getElementById('modal-colors');
    if (colorsWrap && p.colors) {
      colorsWrap.innerHTML = p.colors.map(c => `
        <div class="color-swatch">
          <div class="color-swatch-circle" style="background:${c}"></div>
          <span class="color-swatch-hex">${c}</span>
        </div>
      `).join('');
    }

    // Typography
    const typoWrap = document.getElementById('modal-typography');
    if (typoWrap && p.typography) {
      typoWrap.innerHTML = p.typography.map(t => `
        <div class="type-specimen">
          <div class="type-specimen-font" style="font-family:'${t.font}',sans-serif">${t.font}</div>
          <div class="type-specimen-name">${t.font}</div>
          <div class="type-specimen-style">${t.style}</div>
        </div>
      `).join('');
    }

    // Mockups
    const mockupsWrap = document.getElementById('modal-mockups');
    if (mockupsWrap && p.mockups) {
      mockupsWrap.innerHTML = p.mockups.map(m => `
        <img src="${m}" alt="Mockup" loading="lazy"
             onerror="this.src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800'">
      `).join('');
    }

    // Testimonial
    const test = p.testimonial;
    if (test) {
      setInner('modal-test-text',   `"${test.text}"`);
      setInner('modal-test-name',   test.author);
      setInner('modal-test-role',   test.role);
      setInner('modal-test-avatar', test.author ? test.author[0] : '?');
      const stars = document.getElementById('modal-test-stars');
      if (stars) stars.innerHTML = Array(test.rating || 5).fill('<span>★</span>').join('');
    }

    // Tags
    const tagsWrap = document.getElementById('modal-tags');
    if (tagsWrap) {
      tagsWrap.innerHTML = (p.tags || []).map(t => `<span class="tag">${t}</span>`).join('');
    }

    // Related
    renderRelated(p.id, p.category);
  }

  function setInner(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  /* ── BEFORE/AFTER SLIDER ────────────────────────────────── */
  function initBeforeAfterSlider() {
    const slider  = document.querySelector('.before-after-slider');
    const afterEl = slider?.querySelector('.ba-after');
    const handle  = slider?.querySelector('.ba-handle');
    if (!slider || !afterEl || !handle) return;

    let isDragging = false;

    function setPosition(x) {
      const rect = slider.getBoundingClientRect();
      let pct = ((x - rect.left) / rect.width) * 100;
      pct = Math.max(2, Math.min(98, pct));
      afterEl.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      handle.style.left = pct + '%';
    }

    slider.addEventListener('mousedown',  (e) => { isDragging = true; setPosition(e.clientX); });
    slider.addEventListener('touchstart', (e) => { isDragging = true; setPosition(e.touches[0].clientX); });
    document.addEventListener('mousemove', (e) => { if (isDragging) setPosition(e.clientX); });
    document.addEventListener('touchmove', (e) => { if (isDragging) setPosition(e.touches[0].clientX); });
    document.addEventListener('mouseup',   () => isDragging = false);
    document.addEventListener('touchend',  () => isDragging = false);

    setPosition(slider.getBoundingClientRect().left + slider.offsetWidth / 2);
  }

  /* ── RELATED PROJECTS ──────────────────────────────────── */
  function renderRelated(currentId, category) {
    const wrap = document.getElementById('modal-related');
    if (!wrap) return;

    const related = (data.projects || [])
      .filter(p => p.id !== currentId && p.category === category)
      .slice(0, 3);

    if (!related.length) {
      wrap.style.display = 'none';
      return;
    }

    wrap.style.display = '';
    const grid = document.getElementById('related-grid');
    if (!grid) return;

    grid.innerHTML = related.map(p => `
      <div class="project-card" data-id="${p.id}" style="cursor:pointer">
        <div class="project-card-img">
          <img src="${p.heroImage}" alt="${p.title}" loading="lazy">
        </div>
        <div class="project-card-body">
          <div class="project-card-category">${p.category}</div>
          <div class="project-card-title">${p.title}</div>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => openModal(card.dataset.id));
    });
  }

  /* ── VISIT TRACKING ────────────────────────────────────── */
  function trackVisit() {
    const visits = parseInt(localStorage.getItem('portfolio_visits') || '0') + 1;
    localStorage.setItem('portfolio_visits', visits);
  }

  function trackProjectView(id) {
    const key = 'portfolio_views_' + id;
    const views = parseInt(localStorage.getItem(key) || '0') + 1;
    localStorage.setItem(key, views);
  }

  /* ── DEEP LINK HANDLER ─────────────────────────────────── */
  function handleDeepLink() {
    const hash = window.location.hash.slice(1);
    if (hash && data.projects?.find(p => p.id === hash)) {
      setTimeout(() => openModal(hash), 800);
    }
  }

  return { init, openModal, closeModal, handleDeepLink };
})();
