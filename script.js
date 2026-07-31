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

  // ==========================================================================
  // VEXA CINEMATIC SCROLLEYTELLING ENGINE (9 SCENES & EXPLODED 3D VIEW)
  // ==========================================================================
  const scrollySec = document.querySelector('.vexa-scrolly-section');
  const scrollyCube = document.getElementById('store-3d-master');
  const hudBadge = document.getElementById('scrolly-current-step');
  const hudFill = document.getElementById('scrolly-hud-fill');

  const layerWf = id => document.getElementById(id);
  const layerWireframe = layerWf('layer-wf');
  const layerUi = layerWf('layer-ui');
  const layerAssets = layerWf('layer-assets');
  const layerMkt = layerWf('layer-marketing');
  const layerPixels = layerWf('layer-pixels');
  const layerCod = layerWf('layer-cod');
  const layerAnalytics = layerWf('layer-analytics');

  const scenes = [
    { title: "SCENE 01 / 09 — THE IDEA", fill: "11%" },
    { title: "SCENE 02 / 09 — WIREFRAME", fill: "22%" },
    { title: "SCENE 03 / 09 — LUXURY DESIGN", fill: "33%" },
    { title: "SCENE 04 / 09 — 3D EXPLODED STORE", fill: "44%" },
    { title: "SCENE 05 / 09 — MARKETING COPY", fill: "55%" },
    { title: "SCENE 06 / 09 — PIXEL NODES", fill: "66%" },
    { title: "SCENE 07 / 09 — 58 WILAYAS COD", fill: "77%" },
    { title: "SCENE 08 / 09 — REAL RESULTS", fill: "88%" },
    { title: "SCENE 09 / 09 — LAUNCH & CONVERSION", fill: "100%" }
  ];

  function updateSceneTexts(activeIdx) {
    document.querySelectorAll('.scrolly-scene-text').forEach((txt, idx) => {
      if (idx === activeIdx) {
        txt.classList.add('active');
      } else {
        txt.classList.remove('active');
      }
    });

    if (hudBadge && scenes[activeIdx]) {
      hudBadge.textContent = scenes[activeIdx].title;
    }
    if (hudFill && scenes[activeIdx]) {
      hudFill.style.width = scenes[activeIdx].fill;
    }
  }

  if (scrollySec && scrollyCube) {
    const handleScrolly = () => {
      const rect = scrollySec.getBoundingClientRect();
      const totalScrollable = scrollySec.offsetHeight - window.innerHeight;
      let progress = -rect.top / totalScrollable;
      progress = Math.max(0, Math.min(1, progress));

      // Calculate current scene index (0 to 8)
      const sceneIndex = Math.min(8, Math.floor(progress * 8.99));
      updateSceneTexts(sceneIndex);

      const isMobile = window.innerWidth <= 768;
      const baseScale = isMobile ? 0.68 : 0.95;

      // Scene 01 to 03: Morphing & Rotation
      if (progress < 0.22) {
        scrollyCube.style.transform = `rotateX(${15 - progress * 40}deg) rotateY(${progress * 60}deg) scale(${baseScale * (0.85 + progress * 0.3)})`;
        if (layerWireframe) layerWireframe.style.opacity = 1;
        if (layerUi) layerUi.style.opacity = progress * 4;
        if (layerAssets) layerAssets.style.opacity = 0;
      } else if (progress >= 0.22 && progress < 0.44) {
        // Scene 03 & 04: EXPLODED VIEW LAYERS!
        const explodedProgress = (progress - 0.22) / 0.22;
        const zShift = isMobile ? 0.5 : 1;
        scrollyCube.style.transform = `rotateX(${25 + explodedProgress * 20}deg) rotateY(${-15 - explodedProgress * 30}deg) scale(${baseScale})`;
        
        // Explode Layers in 3D Space!
        if (layerWireframe) layerWireframe.style.transform = `translateZ(${-180 * explodedProgress * zShift}px) translateY(${40 * explodedProgress}px)`;
        if (layerUi) layerUi.style.transform = `translateZ(${-60 * explodedProgress * zShift}px)`;
        if (layerAssets) { layerAssets.style.opacity = 1; layerAssets.style.transform = `translateZ(${80 * explodedProgress * zShift}px)`; }
        if (layerMkt) { layerMkt.style.opacity = explodedProgress; layerMkt.style.transform = `translateZ(${140 * explodedProgress * zShift}px)`; }
      } else if (progress >= 0.44 && progress < 0.66) {
        // Scene 05 & 06: Pixels & Nodes Active
        const pixelProgress = (progress - 0.44) / 0.22;
        const zShift = isMobile ? 0.5 : 1;
        scrollyCube.style.transform = `rotateX(15deg) rotateY(${pixelProgress * 40}deg) scale(${baseScale})`;
        if (layerPixels) { layerPixels.style.opacity = 1; layerPixels.style.transform = `translateZ(${180 * pixelProgress * zShift}px)`; }
      } else if (progress >= 0.66 && progress < 0.88) {
        // Scene 07 & 08: COD & Analytics Charts
        const analyticsProgress = (progress - 0.66) / 0.22;
        const zShift = isMobile ? 0.5 : 1;
        scrollyCube.style.transform = `rotateX(${-10 + analyticsProgress * 20}deg) rotateY(0deg) scale(${baseScale * 1.05})`;
        if (layerCod) { layerCod.style.opacity = 1; layerCod.style.transform = `translateZ(${120 * analyticsProgress * zShift}px)`; }
        if (layerAnalytics) { layerAnalytics.style.opacity = analyticsProgress; layerAnalytics.style.transform = `translateZ(${200 * analyticsProgress * zShift}px)`; }
      } else {
        // Scene 09: Re-assembly back into master complete store!
        scrollyCube.style.transform = `rotateX(0deg) rotateY(0deg) scale(${baseScale * 1.1})`;
        
        [layerWireframe, layerUi, layerAssets, layerMkt, layerPixels, layerCod, layerAnalytics].forEach(l => {
          if (l) {
            l.style.transform = `translateZ(0px) translateY(0px)`;
            l.style.opacity = 1;
          }
        });
      }
    };

    window.addEventListener('scroll', handleScrolly, { passive: true });
    window.addEventListener('touchmove', handleScrolly, { passive: true });
    window.addEventListener('resize', handleScrolly, { passive: true });
    handleScrolly();
  }
});
