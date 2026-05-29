// ===== COUNTDOWN TO EID-UL-ADHA 2026 =====
// Eid-ul-Adha 2026 starts Tuesday, 26th May 2026
// Using May 26, 2026 as target
(function () {
  var target = new Date('May 26, 2026 06:00:00 GMT+5:30').getTime();

  function updateCountdown() {
    var now = new Date().getTime();
    var diff = target - now;

    if (diff <= 0) {
      document.querySelectorAll('.countdown-num').forEach(function (el) {
        el.textContent = '00';
      });
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);

    var pad = function (n) { return n < 10 ? '0' + n : n; };

    var dayEl = document.getElementById('countdown-days');
    var hrEl = document.getElementById('countdown-hours');
    var minEl = document.getElementById('countdown-minutes');
    var secEl = document.getElementById('countdown-seconds');

    if (dayEl) dayEl.textContent = pad(days);
    if (hrEl) hrEl.textContent = pad(hours);
    if (minEl) minEl.textContent = pad(minutes);
    if (secEl) secEl.textContent = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();

// ===== FLOATING GOLD PARTICLES =====
(function () {
  var container = document.getElementById('heroParticles');
  if (!container) return;
  for (var i = 0; i < 30; i++) {
    var p = document.createElement('div');
    p.className = 'hero-particle';
    p.style.left = (Math.random() * 100) + '%';
    p.style.animationDelay = (Math.random() * 8) + 's';
    p.style.animationDuration = (6 + Math.random() * 6) + 's';
    p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
    container.appendChild(p);
  }
})();

// ===== NAVBAR =====
(function () {
  var navbar = document.getElementById('navbar');
  var toggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  var topBar = document.querySelector('.top-bar');

  // Scroll
  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      toggle.classList.toggle('active');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        toggle.classList.remove('active');
      });
    });
  }
})();

// ===== SCROLL REVEAL =====
(function () {
  var els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if (els.length === 0) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  els.forEach(function (el) {
    observer.observe(el);
  });
})();

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
