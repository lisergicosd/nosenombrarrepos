// carga y anims hero
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    // trigger revela animación
    document.querySelectorAll('#hero .reveal, #hero .reveal-scale').forEach(el => {
      el.classList.add('visible');
    });
  }, 1800);
});

// reveal on scroll
const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => observer.observe(el));

// barra de progreso
const progressBar = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  progressBar.style.transform = `scaleX(${scrolled})`;
});

// backdrop nav
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (!nav) return;
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// imagen parallax hero
const heroImg = document.getElementById('parallaxHero');
window.addEventListener('scroll', () => {
  if (!heroImg) return;
  const y = window.scrollY * 0.3;
  heroImg.style.transform = `translateY(${y}px)`;
});

// por si se abre en pc¿
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');

if (window.matchMedia('(pointer:fine)').matches) {
  dot.style.opacity = '1'; ring.style.opacity = '1';

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // scale ring en hover
  document.querySelectorAll('a, .mem-card, .polaroid-card, .closing-img-slot').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '48px';
      ring.style.height = '48px';
      ring.style.borderColor = 'var(--charcoal)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '28px';
      ring.style.height = '28px';
      ring.style.borderColor = 'var(--dusty-rose)';
    });
  });
}

// flote polaroids
document.querySelectorAll('.polaroid-card').forEach((card, i) => {
  const delay = i * 0.4;
  const amp = 6 + i * 2;
  let t = delay;
  function float() {
    t += 0.008;
    const y = Math.sin(t) * amp;
    const r = (i % 2 === 0 ? -2.5 : 2) + Math.sin(t * 0.7) * 1;
    card.style.transform = `rotate(${r}deg) translateY(${y}px)`;
    requestAnimationFrame(float);
  }
  float();
});
