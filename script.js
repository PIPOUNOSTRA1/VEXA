// Global JavaScript functionality for VEXA Studio

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Glass Drawer Overlay Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const drawerOverlay = document.querySelector('.mobile-drawer-overlay');
  const drawerCloseBtn = document.querySelector('.drawer-close-btn');

  if (mobileMenuBtn && drawerOverlay) {
    mobileMenuBtn.addEventListener('click', () => {
      drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (drawerCloseBtn && drawerOverlay) {
    drawerCloseBtn.addEventListener('click', () => {
      drawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close drawer on clicking nav item
  document.querySelectorAll('.drawer-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      if (drawerOverlay) {
        drawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Smart Auto-Hide Navbar on scroll down, show on scroll up
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      // If scrolled down past 100px and scrolling downwards -> hide header
      if (currentScrollY > 100 && currentScrollY > lastScrollY + 5) {
        navbar.classList.add('nav-hidden');
      } else if (currentScrollY < lastScrollY - 5 || currentScrollY <= 50) {
        // If scrolling upwards or near top -> show header
        navbar.classList.remove('nav-hidden');
      }

      if (currentScrollY > 50) {
        navbar.style.background = 'rgba(2, 2, 3, 0.92)';
        navbar.style.backdropFilter = 'blur(20px)';
      } else {
        navbar.style.background = 'rgba(2, 2, 3, 0.75)';
        navbar.style.backdropFilter = 'blur(16px)';
      }
      
      lastScrollY = currentScrollY;
    }, { passive: true });
  }

  // In-Site Interactive Project Live Modal System
  function createProjectModal() {
    if (document.getElementById('in-site-project-modal')) return;

    const modalHTML = `
      <div id="in-site-project-modal" class="project-modal-backdrop" dir="rtl">
        <div class="project-modal-topbar">
          <div class="project-modal-title-box">
            <span style="font-size:1.2rem;">⚡</span>
            <div style="display:flex; flex-direction:column;">
              <span id="modal-project-title" style="color:#FFF; font-weight:800; font-size:1.05rem;">معاينة حية للمتجر</span>
              <span style="color:#10B981; font-size:0.78rem; font-weight:700;">🟢 العرض الحي المباشر داخل VEXA Studio</span>
            </div>
          </div>

          <div class="project-modal-device-controls">
            <button class="device-btn active" id="modal-btn-desktop">🖥️ شاشة حاسوب</button>
            <button class="device-btn" id="modal-btn-mobile">📱 جوال هاتف</button>
          </div>

          <div class="project-modal-actions">
            <a id="modal-external-link" href="#" target="_blank" class="btn" style="padding:0.45rem 1rem; font-size:0.82rem; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.18); color:#FFF; border-radius:50px; text-decoration:none;">
              فتح في نافذة جديدة ↗
            </a>
            <button class="project-modal-close-btn" id="modal-close-btn" aria-label="إغلاق النافذة">✕</button>
          </div>
        </div>

        <div class="project-modal-iframe-wrap">
          <iframe id="modal-iframe-frame" class="project-modal-iframe-frame view-desktop" src="" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('in-site-project-modal');
    const iframe = document.getElementById('modal-iframe-frame');
    const closeBtn = document.getElementById('modal-close-btn');
    const btnDesktop = document.getElementById('modal-btn-desktop');
    const btnMobile = document.getElementById('modal-btn-mobile');

    closeBtn.addEventListener('click', closeProjectModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProjectModal();
    });

    btnDesktop.addEventListener('click', () => {
      btnDesktop.classList.add('active');
      btnMobile.classList.remove('active');
      iframe.className = 'project-modal-iframe-frame view-desktop';
    });

    btnMobile.addEventListener('click', () => {
      btnMobile.classList.add('active');
      btnDesktop.classList.remove('active');
      iframe.className = 'project-modal-iframe-frame view-mobile';
    });
  }

  function openProjectModal(url, title) {
    createProjectModal();
    const modal = document.getElementById('in-site-project-modal');
    const iframe = document.getElementById('modal-iframe-frame');
    const titleEl = document.getElementById('modal-project-title');
    const externalLink = document.getElementById('modal-external-link');

    iframe.src = url;
    titleEl.textContent = title || 'معاينة حية للمشروع';
    externalLink.href = url;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    const modal = document.getElementById('in-site-project-modal');
    const iframe = document.getElementById('modal-iframe-frame');
    if (modal) {
      modal.classList.remove('active');
      iframe.src = '';
      document.body.style.overflow = '';
    }
  }

  // Bind elements with data-live-modal="true" to open in-site iframe modal
  document.querySelectorAll('[data-live-modal="true"]').forEach(card => {
    card.addEventListener('click', function(e) {
      const liveUrl = this.getAttribute('data-live-url') || this.getAttribute('href');
      if (liveUrl && !liveUrl.startsWith('#')) {
        e.preventDefault();
        const projectTitle = this.querySelector('.project-title')?.textContent || 'مشروع VEXA Studio الحي';
        openProjectModal(liveUrl, projectTitle);
      }
    });
  });
});
