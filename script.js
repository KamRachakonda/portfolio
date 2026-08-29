// ============================================
// Custom Cursor
// ============================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
let mouseX = -100;
let mouseY = -100;
let ringX = -100;
let ringY = -100;
let isHovering = false;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
});

function animateCursor() {
  const speed = isHovering ? 0.08 : 0.15;
  ringX += (mouseX - ringX) * speed;
  ringY += (mouseY - ringY) * speed;
  cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect on interactive elements
const hoverTargets = document.querySelectorAll('a, button, .skill-card, .project-card, .social-link');
hoverTargets.forEach(target => {
  target.addEventListener('mouseenter', () => {
    isHovering = true;
    cursorRing.classList.add('hover');
  });
  target.addEventListener('mouseleave', () => {
    isHovering = false;
    cursorRing.classList.remove('hover');
  });
});

// ============================================
// Loading Screen
// ============================================
const loader = document.getElementById('loader');

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    document.querySelector('.nav').classList.add('visible');
    initAnimations();
    createParticles();
  }, 1800);
});

// ============================================
// Navigation
// ============================================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');
let lastScrollY = 0;

// Scroll behavior for nav
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (scrollY > 100) {
    if (scrollY > lastScrollY && scrollY > 200) {
      nav.classList.remove('visible');
    } else {
      nav.classList.add('visible');
    }
  } else {
    nav.classList.add('visible');
  }

  lastScrollY = scrollY;
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================
// Scroll Animations
// ============================================
function initAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}

// ============================================
// Active Nav Link on Scroll
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollY = window.scrollY + 200;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ============================================
// Floating Particles
// ============================================
function createParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 4 + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 10;
    const opacity = Math.random() * 0.4 + 0.1;

    const colors = ['#ff2d78', '#a855f7', '#3b82f6', '#06d6a0'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      left: ${x}%;
      top: ${y}%;
      opacity: ${opacity};
      pointer-events: none;
      animation: float ${duration}s ease-in-out ${delay}s infinite;
      box-shadow: 0 0 ${size * 2}px ${color};
    `;

    hero.appendChild(particle);
  }

  // Add floating animation
  if (!document.querySelector('#particle-styles')) {
    const style = document.createElement('style');
    style.id = 'particle-styles';
    style.textContent = `
      @keyframes float {
        0%, 100% {
          transform: translate(0, 0) scale(1);
          opacity: var(--opacity, 0.3);
        }
        25% {
          transform: translate(20px, -30px) scale(1.1);
          opacity: calc(var(--opacity, 0.3) * 1.5);
        }
        50% {
          transform: translate(-15px, -50px) scale(0.9);
          opacity: var(--opacity, 0.3);
        }
        75% {
          transform: translate(25px, -20px) scale(1.05);
          opacity: calc(var(--opacity, 0.3) * 1.2);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// ============================================
// Magnetic Button Effect
// ============================================
const magneticButtons = document.querySelectorAll('.btn');

magneticButtons.forEach(button => {
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.02)`;
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translate(0, 0) scale(1)';
  });
});

// ============================================
// Parallax Effect
// ============================================
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroGradient = document.querySelector('.hero-gradient');
  const heroGrid = document.querySelector('.hero-grid');

  if (heroGradient && scrolled < window.innerHeight) {
    heroGradient.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.3}px))`;
  }

  if (heroGrid && scrolled < window.innerHeight) {
    heroGrid.style.transform = `translateY(${scrolled * 0.15}px)`;
  }
});

// ============================================
// Tilt Effect on Cards
// ============================================
const tiltCards = document.querySelectorAll('.skill-card, .project-card');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    card.style.transform = `
      perspective(1000px)
      rotateX(${y * -8}deg)
      rotateY(${x * 8}deg)
      translateY(-8px)
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ============================================
// Smooth Reveal for Timeline Items
// ============================================
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateX(0)';
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

timelineItems.forEach((item, index) => {
  item.style.opacity = '0';
  item.style.transform = 'translateX(-30px)';
  item.style.transition = `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`;
  timelineObserver.observe(item);
});

// ============================================
// Text Reveal Animation
// ============================================
function revealText() {
  const titles = document.querySelectorAll('.section-title, .hero-title');

  titles.forEach(title => {
    const text = title.textContent;
    title.innerHTML = '';

    [...text].forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      span.style.transition = `opacity 0.5s ease ${i * 0.03}s, transform 0.5s ease ${i * 0.03}s`;
      title.appendChild(span);
    });
  });

  // Trigger animation
  setTimeout(() => {
    document.querySelectorAll('.section-title span, .hero-title span').forEach(span => {
      span.style.opacity = '1';
      span.style.transform = 'translateY(0)';
    });
  }, 2000);
}

// Uncomment to enable text reveal:
// revealText();

// ============================================
// Glow Effect Following Cursor
// ============================================
const glowEffect = document.createElement('div');
glowEffect.style.cssText = `
  position: fixed;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 45, 120, 0.08) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
`;
document.body.appendChild(glowEffect);

document.addEventListener('mousemove', (e) => {
  glowEffect.style.left = e.clientX + 'px';
  glowEffect.style.top = e.clientY + 'px';
});

// ============================================
// Counter Animation for Stats (if needed)
// ============================================
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start) + '+';
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + '+';
    }
  }

  updateCounter();
}
