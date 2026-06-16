/* =========================================================
   MUSTHAFA PORTFOLIO — ADMIN MODULE
   Auth · CRUD Projects · Content Management · Analytics
   ========================================================= */

const Admin = (() => {

  const ADMIN_PASSWORD = 'musthafa2026';
  const STORAGE_KEY    = 'portfolio_data';
  let data = {};
  let editingId = null;

  /* ── AUTH ──────────────────────────────────────────────── */
  function checkAuth() {
    const isAuth = sessionStorage.getItem('admin_auth') === 'true';
    const gate   = document.getElementById('admin-login-gate');

    if (isAuth) {
      if (gate) gate.style.display = 'none';
      initDashboard();
    } else {
      if (gate) gate.style.display = 'flex';
      initLoginForm();
    }
  }

  function initLoginForm() {
    const form  = document.getElementById('login-form');
    const input = document.getElementById('login-password');
    const error = document.getElementById('login-error');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (input.value === ADMIN_PASSWORD) {
        sessionStorage.setItem('admin_auth', 'true');
        const gate = document.getElementById('admin-login-gate');
        if (gate) {
          gate.style.animation = 'fadeIn 0.4s reverse';
          setTimeout(() => { gate.style.display = 'none'; }, 400);
        }
        initDashboard();
      } else {
        if (error) error.classList.add('show');
        input.value = '';
        input.focus();
        setTimeout(() => error?.classList.remove('show'), 3000);
      }
    });
  }

  /* ── LOAD DATA ─────────────────────────────────────────── */
  function loadData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { data = JSON.parse(saved); }
      catch (e) { data = JSON.parse(JSON.stringify(window.PORTFOLIO_DEFAULT_DATA || {})); }
    } else {
      data = JSON.parse(JSON.stringify(window.PORTFOLIO_DEFAULT_DATA || {}));
    }
    return data;
  }

  function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  /* ── DASHBOARD INIT ────────────────────────────────────── */
  function initDashboard() {
    loadData();
    initNavigation();
    renderOverview();
    renderProjectsTable();
    renderCategoriesPanel();
    renderContentPanel();
    renderAnalytics();
    showPanel('overview');
  }

  /* ── NAVIGATION ────────────────────────────────────────── */
  function initNavigation() {
    document.querySelectorAll('.admin-nav-item[data-panel]').forEach(btn => {
      btn.addEventListener('click', () => {
        showPanel(btn.dataset.panel);
        document.querySelectorAll('.admin-nav-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const titleEl = document.getElementById('admin-page-title');
        if (titleEl) titleEl.textContent = btn.querySelector('.nav-text')?.textContent || 'Dashboard';
      });
    });

    // Logout
    const logoutBtn = document.getElementById('admin-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('admin_auth');
        location.reload();
      });
    }
  }

  function showPanel(id) {
    document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById('panel-' + id);
    if (panel) panel.classList.add('active');
  }

  /* ── OVERVIEW ──────────────────────────────────────────── */
  function renderOverview() {
    const projects  = data.projects?.length || 0;
    const categories = new Set((data.projects || []).map(p => p.category)).size;
    const visits  = parseInt(localStorage.getItem('portfolio_visits') || '0');
    const totalViews = (data.projects || []).reduce((sum, p) => {
      return sum + parseInt(localStorage.getItem('portfolio_views_' + p.id) || '0');
    }, 0);

    setVal('stat-total-projects',    projects);
    setVal('stat-total-categories',  categories);
    setVal('stat-total-visits',      visits);
    setVal('stat-total-views',       totalViews);

    // Recent uploads
    const recentWrap = document.getElementById('recent-uploads');
    if (recentWrap) {
      const recent = (data.projects || []).slice(-3).reverse();
      recentWrap.innerHTML = recent.map(p => `
        <tr>
          <td><img class="table-thumb" src="${p.heroImage}" alt="${p.title}" onerror="this.src='https://via.placeholder.com/48x36/111/d4af37'"></td>
          <td><strong style="color:var(--text-primary)">${p.title}</strong></td>
          <td>${p.category}</td>
          <td>${p.year}</td>
          <td><span class="status-badge published">Published</span></td>
          <td>
            <div class="table-actions">
              <button class="table-btn edit" onclick="Admin.editProject('${p.id}')">Edit</button>
              <button class="table-btn delete" onclick="Admin.deleteProject('${p.id}')">Delete</button>
            </div>
          </td>
        </tr>
      `).join('');
    }
  }

  /* ── PROJECTS TABLE ────────────────────────────────────── */
  function renderProjectsTable() {
    const tbody = document.getElementById('projects-tbody');
    if (!tbody) return;

    const projects = data.projects || [];
    tbody.innerHTML = projects.map(p => `
      <tr>
        <td><img class="table-thumb" src="${p.heroImage}" alt="${p.title}" onerror="this.src='https://via.placeholder.com/48x36/111/d4af37'"></td>
        <td><strong style="color:var(--text-primary)">${p.title}</strong></td>
        <td>${p.category}</td>
        <td>${p.year}</td>
        <td>${p.client || '—'}</td>
        <td><span class="status-badge published">Published</span></td>
        <td>
          <div class="table-actions">
            <button class="table-btn edit" onclick="Admin.editProject('${p.id}')">Edit</button>
            <button class="table-btn delete" onclick="Admin.deleteProject('${p.id}')">Delete</button>
          </div>
        </td>
      </tr>
    `).join('');

    // Add project button
    const addBtn = document.getElementById('btn-add-project');
    if (addBtn) addBtn.addEventListener('click', () => openProjectForm(null));
  }

  /* ── CATEGORIES PANEL ──────────────────────────────────── */
  function renderCategoriesPanel() {
    const wrap = document.getElementById('categories-list');
    if (!wrap) return;

    const cats = [...new Set((data.projects || []).map(p => p.category))];
    wrap.innerHTML = cats.map(cat => {
      const count = (data.projects || []).filter(p => p.category === cat).length;
      return `
        <div style="display:flex; align-items:center; justify-content:space-between;
                    padding:14px 20px; background:rgba(255,255,255,0.03);
                    border:1px solid rgba(255,255,255,0.05); border-radius:8px; margin-bottom:8px;">
          <div>
            <div style="font-weight:600; color:var(--text-primary)">${cat}</div>
            <div style="font-size:12px; color:var(--text-muted)">${count} project${count !== 1 ? 's' : ''}</div>
          </div>
          <div style="display:flex; gap:8px;">
            <span style="font-size:11px; color:var(--gold); font-weight:600; letter-spacing:0.1em">◆</span>
          </div>
        </div>
      `;
    }).join('');
  }

  /* ── CONTENT PANEL ─────────────────────────────────────── */
  function renderContentPanel() {
    const about = data.about || {};

    setInputVal('content-name',         about.name || '');
    setInputVal('content-title',        about.title || '');
    setInputVal('content-bio',          about.bio || '');
    setInputVal('content-availability', about.availability || '');
    setInputVal('content-whatsapp',     about.socials?.whatsapp || '');
    setInputVal('content-instagram',    about.socials?.instagram || '');
    setInputVal('content-behance',      about.socials?.behance || '');
    setInputVal('content-linkedin',     about.socials?.linkedin || '');

    // Stats
    const stats = data.stats || {};
    setInputVal('content-stat-projects',  stats.projects || '');
    setInputVal('content-stat-clients',   stats.clients || '');
    setInputVal('content-stat-brands',    stats.brands || '');
    setInputVal('content-stat-exp',       stats.experience || '');
    setInputVal('content-stat-designs',   stats.designs || '');

    const saveBtn = document.getElementById('btn-save-content');
    if (saveBtn) {
      saveBtn.onclick = saveContent;
    }
  }

  function saveContent() {
    data.about = data.about || {};
    data.about.name         = getInputVal('content-name');
    data.about.title        = getInputVal('content-title');
    data.about.bio          = getInputVal('content-bio');
    data.about.availability = getInputVal('content-availability');
    data.about.socials = data.about.socials || {};
    data.about.socials.whatsapp  = getInputVal('content-whatsapp');
    data.about.socials.instagram = getInputVal('content-instagram');
    data.about.socials.behance   = getInputVal('content-behance');
    data.about.socials.linkedin  = getInputVal('content-linkedin');

    data.stats = data.stats || {};
    data.stats.projects   = parseInt(getInputVal('content-stat-projects')) || 0;
    data.stats.clients    = parseInt(getInputVal('content-stat-clients'))  || 0;
    data.stats.brands     = parseInt(getInputVal('content-stat-brands'))   || 0;
    data.stats.experience = parseInt(getInputVal('content-stat-exp'))      || 0;
    data.stats.designs    = parseInt(getInputVal('content-stat-designs'))  || 0;

    saveData();
    showToast('Content saved successfully!');
  }

  /* ── ANALYTICS ─────────────────────────────────────────── */
  function renderAnalytics() {
    const wrap = document.getElementById('analytics-chart');
    if (!wrap) return;

    const projects = data.projects || [];
    const viewData = projects.map(p => ({
      title: p.title,
      views: parseInt(localStorage.getItem('portfolio_views_' + p.id) || '0'),
      category: p.category,
    })).sort((a, b) => b.views - a.views);

    const maxViews = Math.max(...viewData.map(v => v.views), 1);

    wrap.innerHTML = viewData.slice(0, 8).map(v => `
      <div class="bar-item">
        <span class="bar-label" title="${v.title}">${v.title}</span>
        <div class="bar-track">
          <div class="bar-fill" style="width:${(v.views / maxViews) * 100}%"></div>
        </div>
        <span class="bar-value">${v.views}</span>
      </div>
    `).join('');

    // Category breakdown
    const catWrap = document.getElementById('category-chart');
    if (!catWrap) return;
    const catCount = {};
    projects.forEach(p => { catCount[p.category] = (catCount[p.category] || 0) + 1; });
    const maxCat = Math.max(...Object.values(catCount), 1);
    catWrap.innerHTML = Object.entries(catCount).map(([cat, count]) => `
      <div class="bar-item">
        <span class="bar-label">${cat}</span>
        <div class="bar-track">
          <div class="bar-fill" style="width:${(count / maxCat) * 100}%"></div>
        </div>
        <span class="bar-value">${count}</span>
      </div>
    `).join('');
  }

  /* ── PROJECT FORM ──────────────────────────────────────── */
  function openProjectForm(id) {
    const modal = document.getElementById('project-form-modal');
    if (!modal) return;

    editingId = id;
    const project = id ? (data.projects || []).find(p => p.id === id) : null;
    const isEdit  = !!project;

    document.getElementById('form-modal-title').textContent = isEdit ? 'Edit Project' : 'Add New Project';

    // Fill form
    setInputVal('form-proj-id',       project?.id || 'project-' + Date.now());
    setInputVal('form-proj-title',    project?.title || '');
    setInputVal('form-proj-category', project?.category || '');
    setInputVal('form-proj-year',     project?.year || new Date().getFullYear());
    setInputVal('form-proj-client',   project?.client || '');
    setInputVal('form-proj-style',    project?.style || '');
    setInputVal('form-proj-desc',     project?.description || '');
    setInputVal('form-proj-hero',     project?.heroImage || '');
    setInputVal('form-proj-before',   project?.beforeImage || '');
    setInputVal('form-proj-after',    project?.afterImage || '');
    setInputVal('form-proj-tags',     (project?.tags || []).join(', '));
    setInputVal('form-proj-colors',   (project?.colors || []).join(', '));
    setInputVal('form-proj-mockup1',  project?.mockups?.[0] || '');
    setInputVal('form-proj-mockup2',  project?.mockups?.[1] || '');
    setInputVal('form-proj-story-concept',   project?.story?.concept || '');
    setInputVal('form-proj-story-challenge', project?.story?.challenge || '');
    setInputVal('form-proj-story-solution',  project?.story?.solution || '');
    setInputVal('form-proj-test-text',   project?.testimonial?.text || '');
    setInputVal('form-proj-test-author', project?.testimonial?.author || '');
    setInputVal('form-proj-test-role',   project?.testimonial?.role || '');
    setInputVal('form-proj-test-rating', project?.testimonial?.rating || 5);

    modal.style.display = 'flex';
    modal.classList.add('open');
  }

  function closeProjectForm() {
    const modal = document.getElementById('project-form-modal');
    if (modal) { modal.style.display = 'none'; modal.classList.remove('open'); }
    editingId = null;
  }

  function saveProject() {
    const project = {
      id:          getInputVal('form-proj-id') || 'project-' + Date.now(),
      title:       getInputVal('form-proj-title'),
      category:    getInputVal('form-proj-category'),
      year:        getInputVal('form-proj-year'),
      client:      getInputVal('form-proj-client'),
      style:       getInputVal('form-proj-style'),
      description: getInputVal('form-proj-desc'),
      heroImage:   getInputVal('form-proj-hero'),
      beforeImage: getInputVal('form-proj-before'),
      afterImage:  getInputVal('form-proj-after'),
      tags:        getInputVal('form-proj-tags').split(',').map(t => t.trim()).filter(Boolean),
      colors:      getInputVal('form-proj-colors').split(',').map(c => c.trim()).filter(Boolean),
      mockups:     [getInputVal('form-proj-mockup1'), getInputVal('form-proj-mockup2')].filter(Boolean),
      story: {
        concept:   getInputVal('form-proj-story-concept'),
        challenge: getInputVal('form-proj-story-challenge'),
        solution:  getInputVal('form-proj-story-solution'),
      },
      testimonial: {
        text:   getInputVal('form-proj-test-text'),
        author: getInputVal('form-proj-test-author'),
        role:   getInputVal('form-proj-test-role'),
        rating: parseInt(getInputVal('form-proj-test-rating')) || 5,
      },
    };

    if (!project.title) { showToast('Project title is required!', 'error'); return; }

    data.projects = data.projects || [];

    if (editingId) {
      const idx = data.projects.findIndex(p => p.id === editingId);
      if (idx >= 0) data.projects[idx] = project;
    } else {
      data.projects.unshift(project);
    }

    saveData();
    closeProjectForm();
    renderProjectsTable();
    renderOverview();
    renderCategoriesPanel();
    renderAnalytics();
    showToast(editingId ? 'Project updated!' : 'Project added!');
  }

  function deleteProject(id) {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    data.projects = (data.projects || []).filter(p => p.id !== id);
    saveData();
    renderProjectsTable();
    renderOverview();
    renderAnalytics();
    showToast('Project deleted.');
  }

  function editProject(id) {
    showPanel('projects');
    document.querySelectorAll('.admin-nav-item').forEach(b => {
      b.classList.toggle('active', b.dataset.panel === 'projects');
    });
    openProjectForm(id);
  }

  /* ── HELPERS ───────────────────────────────────────────── */
  function setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function setInputVal(id, val) {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.tagName === 'TEXTAREA') el.value = val;
    else el.value = val;
  }

  function getInputVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function showToast(msg, type = 'success') {
    const el = document.createElement('div');
    el.style.cssText = `
      position:fixed; bottom:24px; right:24px; z-index:99999;
      background:${type === 'success' ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)'};
      border:1px solid ${type === 'success' ? 'rgba(74,222,128,0.3)' : 'rgba(248,113,113,0.3)'};
      color:${type === 'success' ? '#4ade80' : '#f87171'};
      padding:14px 20px; border-radius:10px; font-size:14px;
      font-family:var(--font-body); font-weight:600;
      backdrop-filter:blur(12px); display:flex; gap:10px; align-items:center;
      animation:fadeInUp 0.4s; box-shadow:0 8px 32px rgba(0,0,0,0.5);
    `;
    el.innerHTML = `<span>${type === 'success' ? '✓' : '✕'}</span> ${msg}`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }

  /* ── PUBLIC API ────────────────────────────────────────── */
  return {
    init: checkAuth,
    editProject,
    deleteProject,
    saveProject,
    openProjectForm,
    closeProjectForm,
  };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', Admin.init);
} else {
  Admin.init();
}
