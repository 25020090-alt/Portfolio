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
    this.particleSystem = null;
  }

  init() {
    // Initialize tech effects first
    this.initTechEffects();
    
    // Initialize theme
    this.initTheme();
    
    this.router.onRouteChange = (route) => this.renderPage(route);
    this.initCursor();
    this.initNavbar();
    this.initModal();
  }

  /* ---- THEME TOGGLE ---- */
  initTheme() {
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (systemDark ? 'dark' : 'light');
    
    this.setTheme(theme);
    
    // Bind toggle button
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggleTheme());
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update particle opacity for light mode
    const particleCanvas = document.querySelector('canvas');
    if (particleCanvas) {
      particleCanvas.style.opacity = theme === 'light' ? '0.3' : '0.6';
    }
    
    // Update circuit pattern opacity for light mode
    if (theme === 'light') {
      document.body.style.setProperty('--circuit-opacity', '0.02');
    } else {
      document.body.style.setProperty('--circuit-opacity', '0.05');
    }
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /* ---- TECH EFFECTS ---- */
  initTechEffects() {
    if (typeof initTechEffects === 'function') {
      this.particleSystem = window.initTechEffects();
    }
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

    // Apply tech-enhanced class to cards for visual effects
    document.querySelectorAll('.card').forEach(card => {
      card.classList.add('tech-enhanced');
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
      card.classList.add('tech-enhanced');
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

          <div class="reveal-right" style="grid-column: 1 / -1; margin-top: var(--space-2xl);">
            <div class="introduction-section" style="background: var(--bg-glass); padding: var(--space-xl); border-radius: var(--radius-lg); border: 1px solid rgba(255,255,255,0.1);">
              <h3 style="font-family:var(--font-heading); margin-bottom: var(--space-lg); color: var(--primary);">🌟 Lời giới thiệu</h3>
              <div class="introduction-content" style="line-height: 1.8; color: var(--text-secondary); font-size: var(--fs-base);">
                ${PROFILE.introduction ? PROFILE.introduction.split('\n\n').map(para => `<p style="margin-bottom: var(--space-md);">${para}</p>`).join('') : ''}
              </div>
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
    <!-- Summary Cards Section - Top -->
    <section class="section">
      <div class="container">
        <div style="text-align: center; margin-bottom: var(--space-2xl);">
          <h2 class="section-title reveal" style="margin-bottom: var(--space-sm);">Tổng kết <span class="text-gradient">hành trình</span></h2>
          <p class="section-desc reveal" style="margin: 0 auto; max-width: 600px;">Nhìn lại quá trình học tập, những trải nghiệm quý giá và bài học rút ra từ các bài tập thực hành.</p>
          <div class="reveal" style="width: 60px; height: 3px; background: var(--gradient-primary); margin: var(--space-lg) auto; border-radius: 3px;"></div>
        </div>
        
        <div class="summary-cards-grid">
          <!-- Card 1: Trải Nghiệm Cá Nhân -->
          <div class="summary-card reveal-scale" style="transition-delay: 100ms">
            <div class="summary-card-icon">🌟</div>
            <h3 class="summary-card-title">Trải Nghiệm Cá Nhân</h3>
            <div class="summary-card-content">
              <div class="summary-item">
                <strong>Khám phá thế giới số:</strong>
                <p>Từ người dùng bình thường trở thành người hiểu về cách thức hoạt động của công nghệ số - từ Internet, dữ liệu đến các hệ thống thông minh.</p>
              </div>
              <div class="summary-item">
                <strong>Lần đầu tiếp xúc AI:</strong>
                <p>Cảm giác vừa tò mò vừa choáng ngợp khi nhận ra AI không còn là khoa học viễn tưởng mà đang hiện diện trong mọi khía cạnh cuộc sống.</p>
              </div>
              <div class="summary-item">
                <strong>Tư duy "số hóa":</strong>
                <p>Hiểu được quá trình chuyển đổi từ thế giới thực sang thế giới số - từ thông tin, quy trình đến tương tác con người.</p>
              </div>
            </div>
          </div>

          <!-- Card 2: Kiến Thức Cốt Lõi -->
          <div class="summary-card reveal-scale" style="transition-delay: 200ms">
            <div class="summary-card-icon">🧠</div>
            <h3 class="summary-card-title">Kiến Thức Cốt Lõi</h3>
            <div class="summary-card-content">
              <div class="summary-item">
                <strong>Hiểu về Dữ liệu số:</strong>
                <p>Cách thông tin được số hóa, lưu trữ, truyền tải và xử lý trong môi trường số. Big Data không còn là khái niệm xa lạ.</p>
              </div>
              <div class="summary-item">
                <strong>Nguyên lý AI & Machine Learning:</strong>
                <p>Hiểu được cách máy tính "học" từ dữ liệu, từ các thuật toán đơn giản đến neural networks phức tạp.</p>
              </div>
              <div class="summary-item">
                <strong>Lập trình căn bản (30%):</strong>
                <p>Nắm vững tư duy thuật toán, cấu trúc điều khiển và kỹ năng debug - nền tảng để hiện thực hóa ý tưởng số.</p>
              </div>
            </div>
          </div>

          <!-- Card 3: Điều Tâm Đắc -->
          <div class="summary-card reveal-scale" style="transition-delay: 300ms">
            <div class="summary-card-icon">💡</div>
            <h3 class="summary-card-title">Điều Tâm Đắc</h3>
            <div class="summary-card-content">
              <div class="summary-item">
                <strong>"Công nghệ là công cụ, con người là trung tâm":</strong>
                <p>Nhận ra rằng công nghệ số và AI chỉ thực sự có giá trị khi giải quyết vấn đề thực tế và phục vụ con người.</p>
              </div>
              <div class="summary-item">
                <strong>Tư duy hệ thống:</strong>
                <p>Không còn nhìn công nghệ như những mảnh rời rạc, mà thấy được bức tranh tổng thể về hệ sinh thái số kết nối.</p>
              </div>
              <div class="summary-item">
                <strong>Đạo đức số:</strong>
                <p>Hiểu được trách nhiệm khi làm việc với dữ liệu và AI - từ bảo mật, riêng tư đến thiên kiến thuật toán.</p>
              </div>
            </div>
          </div>

          <!-- Card 4: Thách Thức -->
          <div class="summary-card reveal-scale" style="transition-delay: 400ms">
            <div class="summary-card-icon">🧗</div>
            <h3 class="summary-card-title">Thách Thức</h3>
            <div class="summary-card-content">
              <div class="summary-item">
                <strong>Tốc độ thay đổi chóng mặt:</strong>
                <p>Công nghệ số và AI phát triển nhanh đến mức vừa học xong đã thấy có xu hướng mới xuất hiện.</p>
              </div>
              <div class="summary-item">
                <strong>Kiến thức liên ngành:</strong>
                <p>Không chỉ cần hiểu công nghệ, mà còn phải am hiểu về kinh tế số, xã hội số, đạo đức AI và tác động con người.</p>
              </div>
              <div class="summary-item">
                <strong>Từ lý thuyết đến thực tế:</strong>
                <p>Khó khăn trong việc áp dụng các khái niệm trừu tượng về AI và chuyển đổi số vào các tình huống thực tế.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats & Quote Section - Bottom -->
    <section class="section">
      <div class="container">
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
        
        <blockquote class="reveal" style="font-size: 1.2rem; font-style: italic; color: var(--text-secondary); max-width: 800px; margin: var(--space-3xl) auto 0;">
          "Đầu tư vào tri thức luôn mang lại lợi nhuận cao nhất."<br>
          <span style="font-size: 1rem; font-weight: 600; color: var(--primary); margin-top: 0.5rem; display: block;">— Benjamin Franklin</span>
        </blockquote>
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
