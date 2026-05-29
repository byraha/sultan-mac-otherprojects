// ===== HIGH Q SERVICES - Main JavaScript =====
// GSAP + ScrollTrigger + Lenis are loaded from CDN in HTML

// ---- I18N LANGUAGE SYSTEM ----
var currentLang = localStorage.getItem('hq-lang') || 'en';

function applyTranslations(lang) {
  currentLang = lang;
  localStorage.setItem('hq-lang', lang);
  document.documentElement.lang = lang === 'kn' ? 'kn' : 'en';

  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    var text = i18n[lang] && i18n[lang][key];
    if (!text) return;
    if (el.getAttribute('data-i18n-html') === 'true') {
      el.innerHTML = text;
    } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = text;
    } else {
      el.textContent = text;
    }
  });

  document.querySelectorAll('[data-i18n-opt]').forEach(function (el) {
    var key = el.getAttribute('data-i18n-opt');
    var text = i18n[lang] && i18n[lang][key];
    if (text) el.textContent = text;
  });

  document.querySelectorAll('[data-i18n-tags]').forEach(function (container) {
    var key = container.getAttribute('data-i18n-tags');
    var text = i18n[lang] && i18n[lang][key];
    if (!text) return;
    var tags = text.split(',');
    var spans = container.querySelectorAll('span');
    spans.forEach(function (span, i) {
      if (tags[i]) span.textContent = tags[i].trim();
    });
  });

  var switcher = document.getElementById('langSwitcher');
  if (switcher) {
    var active = switcher.querySelector('.lang-active');
    var enEl = switcher.querySelector('.lang-en');
    var knEl = switcher.querySelector('.lang-kn');
    if (active) active.textContent = lang === 'kn' ? 'ಕನ್ನಡ' : 'EN';
    if (enEl) enEl.classList.toggle('active', lang === 'en');
    if (knEl) knEl.classList.toggle('active', lang === 'kn');
  }
}

document.addEventListener('DOMContentLoaded', function () {

  // Apply translations on page load
  applyTranslations(currentLang);

  // ---- LENIS SMOOTH SCROLL ----
  const lenis = new Lenis({
    duration: 1.2,
    easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    orientation: 'vertical',
    smoothWheel: true
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);

  // ---- NAVBAR ----
  var navbar = document.getElementById('navbar');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  window.addEventListener('scroll', function () {
    if (navbar) {
      if (window.scrollY > 50) { navbar.classList.add('scrolled'); }
      else { navbar.classList.remove('scrolled'); }
    }
  });

  // ---- SCROLL REVEAL ANIMATIONS ----
  var revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
  document.querySelectorAll(revealSelectors).forEach(function (el) {
    var delay = parseFloat(el.getAttribute('data-delay')) || 0;
    var isLeft = el.classList.contains('reveal-left');
    var isRight = el.classList.contains('reveal-right');
    var isScale = el.classList.contains('reveal-scale');

    gsap.fromTo(el,
      {
        opacity: 0,
        y: isLeft || isRight ? 40 : 40,
        x: isLeft ? -40 : isRight ? 40 : 0,
        scale: isScale ? 0.9 : 1
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration: 0.9,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  });

  // ---- COUNTER ANIMATION ----
  document.querySelectorAll('.counter').forEach(function (counter) {
    var target = parseInt(counter.getAttribute('data-target')) || 0;
    var startObj = { value: 0 };
    gsap.to(startObj, {
      value: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger: counter, start: 'top 85%' },
      onUpdate: function () { counter.textContent = Math.floor(startObj.value); }
    });
  });

  // ---- WHATSAPP TOOLTIP AUTO-HIDE ----
  var tooltips = document.querySelectorAll('.whatsapp-float .tooltip');
  tooltips.forEach(function (tip) {
    setTimeout(function () {
      tip.style.transition = 'opacity 0.5s ease';
      tip.style.opacity = '0';
      setTimeout(function () { tip.style.display = 'none'; }, 500);
    }, 5000);
  });

  // ---- SERVICE CARD TILT EFFECT ----
  document.querySelectorAll('.service-card, .service-detail-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var cx = rect.width / 2;
      var cy = rect.height / 2;
      var rx = (y - cy) / 20;
      var ry = (cx - x) / 20;
      card.style.transform = 'perspective(1000px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-4px)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // ---- GSAP HERO ENTRANCE ----
  var heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTl
    .from('.hero-content .hero-badge', { y: 30, opacity: 0, duration: 0.6 })
    .from('.hero-content .hero-title', { y: 40, opacity: 0, duration: 0.8 }, '-=0.3')
    .from('.hero-content .hero-description', { y: 30, opacity: 0, duration: 0.6 }, '-=0.3')
    .from('.hero-content .hero-actions', { y: 30, opacity: 0, duration: 0.6 }, '-=0.2')
    .from('.hero-content .hero-stats-row', { y: 30, opacity: 0, duration: 0.6 }, '-=0.2');

  // ---- FORM SUBMIT FEEDBACK ----
  function handleFormSubmit(formId) {
    var form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener('submit', function () {
      var btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
      }
    });
  }
  handleFormSubmit('contactForm');
  handleFormSubmit('cateringForm');

  // ---- LANGUAGE SWITCHER ----
  var langSwitcher = document.getElementById('langSwitcher');
  if (langSwitcher) {
    var enBtn = langSwitcher.querySelector('.lang-en');
    var knBtn = langSwitcher.querySelector('.lang-kn');
    if (enBtn) enBtn.addEventListener('click', function (e) { e.preventDefault(); applyTranslations('en'); });
    if (knBtn) knBtn.addEventListener('click', function (e) { e.preventDefault(); applyTranslations('kn'); });
  }

  console.log('%c High Q Services ', 'background: #A16207; color: #fff; font-size: 1rem; font-weight: bold; padding: 6px 10px; border-radius: 4px;');
  console.log('%c Enhancing Life Beyond Limits ', 'color: #A16207; font-size: 0.85rem;');
});
