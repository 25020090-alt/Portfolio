/* ============================================
   APP LOGIC — js/app.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});

class App {
  constructor() {
    this.router = new Router();
    this.modal = null;
  }

  init() {
    this.router.onRouteChange = (route) => this.renderPage(route);
    this.initCursor();
    this.initNavbar();
    this.initModal();
  }

  /* ---- CUSTOM CURSOR ---- */
  initCursor() {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;
    let mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    const animate = () => {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
      ring.style.left = cx + 'px';
      ring.style.top = cy + 'px';
      requestAnimationFrame(animate);
    };
    animate();
    document.addEventListener('mouseover', e => {
      if (e.target.closest('a, button, .card, .project-card, .preview-card, .filter-btn')) {
        ring.classList.add('hover');
      }
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest('a, button, .card, .project-card, .preview-card, .filter-btn')) {
        ring.classList.remove('hover');
      }
    });
  }

  /* ---- NAVBAR ---- */
  initNavbar() {
    const navbar = document.querySelector('.navbar');
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
    if (toggle && links) {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('open');
      });
      links.addEventListener('click', () => {
        toggle.classList.remove('active');
        links.classList.remove('open');
      });
    }
  }

  /* ---- MODAL ---- */
  initModal() {
    this.modal = document.getElementById('projectModal');
    if (!this.modal) return;
    this.modal.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
    this.modal.addEventListener('click', e => {
      if (e.target === this.modal) this.closeModal();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.closeModal();
    });
  }

  openModal(project) {
    if (!this.modal) return;
    const title = this.modal.querySelector('.modal-title');
    const body = this.modal.querySelector('.modal-body');
    title.textContent = `Bài ${project.id}: ${project.title}`;

    const showContent = () => {
      if (project.type === 'iframe') {
        body.innerHTML = `<iframe src="${project.src}" title="${project.title}"></iframe>`;
      } else if (project.type === 'external') {
        body.innerHTML = `
          <div class="modal-info" style="text-align:center;padding-top:60px;">
            <p style="font-size:1.2rem;margin-bottom:24px;color:var(--text-secondary);">Bài tập này được lưu trữ bên ngoài.</p>
            <a href="${project.url}" target="_blank" rel="noopener" class="external-link-btn">
              📄 Link bài tập
            </a>
          </div>`;
      } else if (project.type === 'html') {
        body.innerHTML = `<div class="modal-info">${project.html}</div>`;
      }
    };

    showContent();

    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    const body = this.modal.querySelector('.modal-body');
    setTimeout(() => { body.innerHTML = ''; }, 350);
  }

  /* ---- PAGE RENDERER ---- */
  renderPage(route) {
    const app = document.getElementById('app');
    switch (route) {
      case 'home': app.innerHTML = this.renderHome(); break;
      case 'summary': app.innerHTML = this.renderSummary(); break;
      case 'projects': app.innerHTML = this.renderProjects(); break;
      default: app.innerHTML = this.renderHome();
    }
    this.initScrollReveal();
    this.initPageInteractions(route);
  }

  /* ---- SCROLL REVEAL ---- */
  initScrollReveal() {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!els.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => observer.observe(el));
  }

  /* ---- PAGE INTERACTIONS ---- */
  initPageInteractions(route) {
    if (route === 'home') this.initHomeInteractions();
    if (route === 'summary') this.initSummaryInteractions();
    if (route === 'projects') this.initProjectsInteractions();
  }

  initHomeInteractions() {
    // Preview cards click — open modal in same tab
    document.querySelectorAll('.preview-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.dataset.id);
        const project = PROJECTS.find(p => p.id === id);
        if (project) {
          this.openModal(project);
        }
      });
    });

    // Skills bar animation
    const bars = document.querySelectorAll('.skill-fill');
    const skillsObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          skillsObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(bar => skillsObs.observe(bar));
    
    // Smooth scroll for about button
    const aboutBtn = document.querySelector('a[href="#about"]');
    if (aboutBtn) {
      aboutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }
  initSummaryInteractions() {
    // Animated counters
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(el => {
      const target = parseInt(el.dataset.target);
      let current = 0;
      const step = target / 60;
      const animate = () => {
        current += step;
        if (current < target) {
          el.textContent = Math.floor(current);
          requestAnimationFrame(animate);
        } else {
          el.textContent = target;
        }
      };
      const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) { animate(); obs.unobserve(el); }
      }, { threshold: 0.5 });
      obs.observe(el);
    });
  }

  initProjectsInteractions() {
    const grid = document.querySelector('.projects-grid');
    const btns = document.querySelectorAll('.filter-btn');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.category;
        const filtered = cat === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === cat);
        grid.innerHTML = filtered.map(p => this.projectCard(p)).join('');
        this.bindProjectCards();
        // Re-trigger reveal
        grid.querySelectorAll('.reveal-scale').forEach(el => {
          el.classList.remove('visible');
          requestAnimationFrame(() => el.classList.add('visible'));
        });
      });
    });

    this.bindProjectCards();
  }

  bindProjectCards() {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.dataset.id);
        const project = PROJECTS.find(p => p.id === id);
        if (project) {
          this.openModal(project);
        }
      });
    });
  }

  /* ============================================
     PAGE TEMPLATES
     ============================================ */

  renderHome() {
    const previewProjects = PROJECTS.slice(0, 3);
    return `
    <section class="hero">
      <div class="container hero-content">
        <div class="hero-badge reveal"><span class="dot"></span> Portfolio ${COURSE.semester}</div>
        <h1 class="hero-title reveal">
          <span class="text-gradient">${COURSE.name.split(' ').slice(0, 3).join(' ')}</span><br>
          ${COURSE.name.split(' ').slice(3).join(' ')}
        </h1>
        <p class="hero-subtitle reveal">${PROFILE.bio}</p>
        <div class="hero-actions reveal">
          <a href="#projects" class="btn btn-primary">Xem bài tập →</a>
          <a href="#about" class="btn btn-outline">Về Sinh Viên</a>
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-grid">
          ${Array(9).fill('<div class="hero-grid-item"></div>').join('')}
        </div>
      </div>
    </section>

    <section class="section" id="about">
      <div class="container">
        <div class="section-label reveal">About Me</div>
        <h2 class="section-title reveal">Giới thiệu <span class="text-gradient">bản thân</span></h2>

        <div class="about-grid" style="margin-top:var(--space-2xl)">
          <div class="reveal-left">
            <div class="about-avatar">${PROFILE.avatar}</div>
            <div class="about-bio">
              <p><span class="highlight">${PROFILE.name}</span> — MSSV: ${PROFILE.studentId}</p>
              <p>Mã lớp: <span class="highlight">${PROFILE.classCode}</span></p>
              <p>📧 Email: <span class="highlight">${PROFILE.email}</span></p>

              <p>🏫 ${PROFILE.university}</p>
              <p>📚 ${PROFILE.faculty}</p>
            </div>
          </div>

          <div class="reveal-right">
            <div class="skills-section">
              <h3 style="font-family:var(--font-heading);margin-bottom:var(--space-lg);">Kỹ năng đạt được</h3>
              ${SKILLS.map(s => `
              <div class="skill-item">
                <div class="skill-header">
                  <span class="skill-name">${s.name}</span>
                  <span class="skill-percent">${s.percent}%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-fill" style="--skill-width:${s.percent}%"></div>
                </div>
              </div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-label reveal">Journey</div>
        <h2 class="section-title reveal">Hành trình <span class="text-gradient">học tập</span></h2>
        <div class="timeline" style="margin-top:var(--space-2xl)">
          ${TIMELINE.map(t => `
          <div class="timeline-item reveal">
            <div class="timeline-date">${t.date}</div>
            <div class="timeline-title">${t.title}</div>
            <div class="timeline-desc">${t.desc}</div>
          </div>`).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-label reveal">Goals</div>
        <h2 class="section-title reveal">Mục tiêu <span class="text-gradient">portfolio</span></h2>
        <div class="goals-grid">
          ${GOALS.map((g, i) => `
          <div class="card goal-card reveal-scale" style="transition-delay:${i * 100}ms">
            <div class="goal-icon">${g.icon}</div>
            <h3>${g.title}</h3>
            <p>${g.desc}</p>
          </div>`).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-label reveal">Featured</div>
        <h2 class="section-title reveal">Bài tập <span class="text-gradient">nổi bật</span></h2>
        <p class="section-desc reveal">Một số bài tập tiêu biểu trong quá trình học tập.</p>
        <div class="preview-grid" style="margin-top:var(--space-2xl)">
          ${previewProjects.map((p, i) => `
          <div class="card preview-card reveal-scale" data-id="${p.id}" style="transition-delay:${i * 100}ms">
            <div class="card-number">0${p.id}</div>
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <span class="card-arrow">→</span>
          </div>`).join('')}
        </div>
      </div>
    </section>

    ${this.renderFooter()}`;
  }

  renderSummary() {
    return `
    <section class="section">
      <div class="container">
        <div style="text-align: center; margin-bottom: var(--space-3xl);">
          <h2 class="section-title reveal" style="margin-bottom: var(--space-sm);">Tổng kết <span class="text-gradient">hành trình</span></h2>
          <p class="section-desc reveal" style="margin: 0 auto; max-width: 600px;">Nhìn lại quá trình học tập, những trải nghiệm quý giá và bài học rút ra từ các bài tập thực hành.</p>
          <div class="reveal" style="width: 60px; height: 3px; background: var(--gradient-primary); margin: var(--space-lg) auto; border-radius: 3px;"></div>
          <blockquote class="reveal" style="font-size: 1.2rem; font-style: italic; color: var(--text-secondary); max-width: 800px; margin: 0 auto;">
            "Đầu tư vào tri thức luôn mang lại lợi nhuận cao nhất."<br>
            <span style="font-size: 1rem; font-weight: 600; color: var(--primary); margin-top: 0.5rem; display: block;">— Benjamin Franklin</span>
          </blockquote>
        </div>

        <div class="stats-strip">
          <div class="stat-item reveal">
            <div class="stat-number" data-target="6">0</div>
            <div class="stat-label">Bài tập hoàn thành</div>
          </div>
          <div class="stat-item reveal">
            <div style="display:flex;justify-content:center;align-items:baseline;">
              <div class="stat-number" data-target="10">0</div>
              <div style="font-size:2.5rem;font-weight:700;color:var(--primary);line-height:1">+</div>
            </div>
            <div class="stat-label">Kỹ năng mới</div>
          </div>
          <div class="stat-item reveal">
            <div style="display:flex;justify-content:center;align-items:baseline;">
              <div class="stat-number" data-target="50">0</div>
              <div style="font-size:2.5rem;font-weight:700;color:var(--primary);line-height:1">+</div>
            </div>
            <div class="stat-label">Giờ học tập</div>
          </div>
          <div class="stat-item reveal">
            <div style="font-size:3.5rem;font-weight:700;color:var(--primary);line-height:1;margin-bottom:0.5rem;">∞</div>
            <div class="stat-label">Động lực phát triển</div>
          </div>
        </div>
      </div>
    </section>
    
    ${this.renderFooter()}`;
  }

  projectCard(p) {
    const hasLink = p.url && p.url !== '#';
    const icon = p.icon || '📁';
    return `
    <div class="card project-card reveal-scale" data-id="${p.id}" style="cursor:pointer">
      <span class="card-idx">0${p.id}</span>
      <span class="card-tag">${p.tags[0]}</span>
      <h3 style="display:flex; align-items:center; gap:10px;">
        <span style="font-size:1.4rem; background:var(--bg-glass); padding:8px; border-radius:12px; box-shadow:0 2px 10px rgba(0,0,0,0.05);">${icon}</span>
        ${p.title}
      </h3>
      <p>${p.description}</p>
      <div style="margin-top:var(--space-sm);font-size:var(--fs-xs);color:var(--text-muted);">📅 Nộp: ${p.date}</div>
      <div class="card-footer">
        <span class="card-open">${hasLink ? 'Mở bài tập ↗' : 'Chưa có link'}</span>
      </div>
    </div>`;
  }

  renderProjects() {
    return `
    <section class="section">
      <div class="container">
        <div class="section-label reveal">Projects</div>
        <h2 class="section-title reveal">Bài tập <span class="text-gradient">thực hành</span></h2>
        <p class="section-desc reveal">Tổng hợp 6 bài tập trong môn ${COURSE.name}.</p>

        <div class="filter-bar reveal" style="margin-top:var(--space-2xl)">
          ${Object.entries(CATEGORIES).map(([key, label], i) => `
            <button class="filter-btn${i === 0 ? ' active' : ''}" data-category="${key}">${label}</button>
          `).join('')}
        </div>

        <div class="projects-grid">
          ${PROJECTS.map(p => this.projectCard(p)).join('')}
        </div>
      </div>
    </section>

    ${this.renderFooter()}`;
  }

  renderFooter() {
    return `
    <footer class="footer">
      <div class="container">
        <p>© 2026 <span class="text-gradient">${PROFILE.name}</span> · ${COURSE.name}</p>
      </div>
    </footer>`;
  }
}
