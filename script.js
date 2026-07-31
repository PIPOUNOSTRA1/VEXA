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
});
