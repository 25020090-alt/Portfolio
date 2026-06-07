/* ============================================
   SPA ROUTER — js/router.js
   Hash-based routing
   
   ✏️ Thêm trang mới chỉ cần 3 bước:
   1. Thêm route vào ROUTES bên dưới
   2. Tạo hàm renderXxxPage() trong app.js
   3. Thêm nav-link trong index.html
   ============================================ */

const ROUTES = {
  '':         'home',
  'home':     'home',
  'contact':  'contact'
  // ✏️ Thêm route mới: 'ten-trang': 'ten-trang'
};

class Router {
  constructor() {
    this.currentRoute = '';
    this.onRouteChange = null;
    this._init();
  }

  _init() {
    window.addEventListener('hashchange', () => this._handleRoute());
    window.addEventListener('load', () => this._handleRoute());
  }

  _handleRoute() {
    const hash = window.location.hash.replace('#', '').replace('/', '');
    const route = ROUTES[hash] || 'home';

    if (route === this.currentRoute) return;

    const app = document.getElementById('app');

    // Page exit animation
    app.classList.add('page-exit');

    setTimeout(() => {
      this.currentRoute = route;
      this._updateNavLinks(route);

      if (this.onRouteChange) {
        this.onRouteChange(route);
      }

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'instant' });

      // Page enter animation
      requestAnimationFrame(() => {
        app.classList.remove('page-exit');
      });
    }, 300);
  }

  _updateNavLinks(route) {
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href').replace('#', '').replace('/', '') || 'home';
      link.classList.toggle('active', href === route);
    });
  }

  navigate(route) {
    window.location.hash = route;
  }
}
