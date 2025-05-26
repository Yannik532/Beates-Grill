// Theme Toggle Funktionalität
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const burgerToggle = document.getElementById('burgerToggle');
  const mainNav = document.getElementById('mainNav');

  // Theme aus dem localStorage laden oder Standard (light) verwenden
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);

  // Theme Toggle Event Listener
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // Mobile Navigation Toggle
  if (burgerToggle && mainNav) {
    burgerToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      const isOpen = mainNav.classList.contains('open');
      burgerToggle.setAttribute('aria-expanded', isOpen);
      burgerToggle.textContent = isOpen ? '✕' : '☰';
    });

    // Schließe Navigation beim Klick auf einen Link
    document.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        burgerToggle.setAttribute('aria-expanded', 'false');
        burgerToggle.textContent = '☰';
      });
    });

    // Schließe Navigation beim Klick außerhalb
    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !burgerToggle.contains(e.target)) {
        mainNav.classList.remove('open');
        burgerToggle.setAttribute('aria-expanded', 'false');
        burgerToggle.textContent = '☰';
      }
    });
  }

  // Smooth Scroll für Anker-Links
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

  // Kontaktformular Handling
  const contactForm = document.querySelector('.kontakt-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Einfache Validierung
      const name = this.querySelector('#name').value.trim();
      const email = this.querySelector('#email').value.trim();
      const message = this.querySelector('#message').value.trim();
      
      if (name && email && message) {
        alert('Vielen Dank für Ihre Nachricht! Wir melden uns bald bei Ihnen.');
        this.reset();
      } else {
        alert('Bitte füllen Sie alle Felder aus.');
      }
    });
  }

  // Lazy Loading für Bilder
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // Scroll-to-Top Button
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.innerHTML = '↑';
  scrollTopBtn.className = 'scroll-top-btn';
  scrollTopBtn.setAttribute('aria-label', 'Nach oben scrollen');
  document.body.appendChild(scrollTopBtn);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}); 