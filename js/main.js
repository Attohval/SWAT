const navToggle = document.querySelector('[data-nav-toggle]');
const mainNav = document.querySelector('.main-nav');
const navOverlay = document.querySelector('[data-nav-overlay]');
const navClose = document.querySelector('[data-nav-close]');

const openNav = () => {
  if (!mainNav) return;
  mainNav.classList.add('open');
  if (navOverlay) navOverlay.classList.add('show');
  if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
  mainNav.setAttribute('aria-hidden', 'false');
};

const closeNav = () => {
  if (!mainNav) return;
  mainNav.classList.remove('open');
  if (navOverlay) navOverlay.classList.remove('show');
  if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  mainNav.setAttribute('aria-hidden', 'true');
};

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.contains('open');
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  });
}

if (navClose) {
  navClose.addEventListener('click', closeNav);
}

if (navOverlay) {
  navOverlay.addEventListener('click', closeNav);
}

if (mainNav) {
  mainNav.addEventListener('click', (event) => {
    if (event.target.matches('a')) {
      closeNav();
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const filterBar = document.querySelector('[data-filter-bar]');
const mediaGrid = document.querySelector('[data-media-grid]');

if (filterBar && mediaGrid) {
  filterBar.addEventListener('click', (event) => {
    const btn = event.target.closest('.filter-btn');
    if (!btn) return;

    filterBar.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    mediaGrid.querySelectorAll('.media-tile').forEach((tile) => {
      const category = tile.getAttribute('data-category');
      tile.style.display = filter === 'all' || filter === category ? 'grid' : 'none';
    });
  });
}
