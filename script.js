/* =========================================================
   OMNIS DIGITAL — Interactions
   ========================================================= */
(function () {
  'use strict';

  /* ---- inline SVG icons (relevant per service) ---- */
  var ICONS = {
    monitor:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    chart:'<path d="M5 21V11M12 21V4M19 21v-8"/><path d="M3 21h18"/>',
    chat:'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12z"/>',
    video:'<rect x="3" y="6" width="12" height="12" rx="2"/><path d="m15 10 6-3v10l-6-3"/>',
    megaphone:'<path d="m3 11 14-6v14L3 13z"/><path d="M17 8a3 3 0 0 1 0 6"/><path d="M7 13v4a2 2 0 0 0 3.5 1.3"/>',
    target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
    clipboard:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9zM8 12h8M8 16h5"/>',
    sparkle:'<path d="M12 3l2 5.5L19.5 10 14 12l-2 5.5L10 12 4.5 10 10 8.5z"/>',
    phone:'<path d="M5 4h4l2 5-2.5 1.8a12 12 0 0 0 4.7 4.7L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    message:'<path d="M4 5h16v11H9l-4 3z"/><path d="M8 9.5h8M8 12.5h5"/>',
    whatsapp:'<path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.6-1.2A9 9 0 1 0 12 3z"/><path d="M8.8 8.3c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.5l.7 1.6c0 .2.1.4 0 .6l-.5.7c-.1.2-.2.3 0 .6a6 6 0 0 0 2.7 2.4c.3.1.4 0 .6-.1l.7-.8c.2-.2.3-.2.5-.1l1.6.8c.2.1.4.2.4.4 0 .8-.4 1.6-1.6 1.7a6.5 6.5 0 0 1-6.6-6.6c0-.6.2-1.2.5-1.5z"/>',
    mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    image:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="m21 16-5-5L5 21"/>',
    workflow:'<rect x="3" y="3" width="6" height="6" rx="1.5"/><rect x="15" y="15" width="6" height="6" rx="1.5"/><path d="M9 6h5a4 4 0 0 1 4 4v5"/>',
    database:'<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
    broadcast:'<circle cx="12" cy="12" r="2"/><path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M6 6a9 9 0 0 0 0 12M18 6a9 9 0 0 1 0 12"/>',
    billboard:'<rect x="3" y="4" width="18" height="10" rx="1.5"/><path d="M8 14v6M16 14v6"/>',
    balloon:'<path d="M12 3a5 5 0 0 1 5 5c0 3.3-2.7 6.2-5 7-2.3-.8-5-3.7-5-7a5 5 0 0 1 5-5z"/><path d="M12 15v3M10.5 21h3"/>',
    truck:'<path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>',
    kiosk:'<path d="M5 8h14v12H5zM4 4h16l-1.2 4H5.2z"/><path d="M9.5 20v-5h5v5"/>',
    smile:'<circle cx="12" cy="12" r="9"/><path d="M8.5 14a4 4 0 0 0 7 0"/><path d="M9 9.5h.01M15 9.5h.01"/>',
    newspaper:'<path d="M4 5h13v15H5a1 1 0 0 1-1-1z"/><path d="M17 8h3v11a1 1 0 0 1-1 1M7 9h7M7 12h7M7 15h5"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/>',
    layout:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/>',
    tag:'<path d="M3 12V4h8l9 9-8 8z"/><circle cx="7.5" cy="7.5" r="1.3"/>',
    compass:'<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5.5-5 2 2-5.5z"/>',
    shield:'<path d="M12 3l7 3v5c0 5-3.2 8.2-7 10-3.8-1.8-7-5-7-10V6z"/><path d="m9 12 2 2 4-4"/>',
    share:'<circle cx="6" cy="12" r="2.4"/><circle cx="17" cy="6" r="2.4"/><circle cx="17" cy="18" r="2.4"/><path d="m8.1 10.9 6.7-3.6M8.1 13.1l6.7 3.6"/>',
    palette:'<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.6-.9 1-1.8-.6-1 .1-2.2 1.3-2.2H16a5 5 0 0 0 5-5c0-4.4-4-8-9-8z"/><circle cx="7.5" cy="11" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16" cy="10.5" r="1"/>',
    camera:'<path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.2"/>',
    file:'<path d="M6 3h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v4h4M8 13h8M8 17h5"/>',
    users:'<circle cx="9" cy="8" r="3"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><path d="M16 5.3a3 3 0 0 1 0 5.4M21 20a5.5 5.5 0 0 0-3.8-5.2"/>',
    search:'<circle cx="11" cy="11" r="6"/><path d="m20 20-3.6-3.6"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9.5h18M8 3v4M16 3v4"/>'
  };
  document.querySelectorAll('[data-ic]').forEach(function (el) {
    var name = el.getAttribute('data-ic');
    if (ICONS[name]) {
      el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + '</svg>';
    }
  });

  /* ---- AOS scroll animations ---- */
  if (window.AOS) {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });
  }

  /* ---- current year ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- GSAP: handwriting reveal for cursive "With" ---- */
  (function initCursiveReveal() {
    if (typeof gsap === 'undefined') return;
    var el = document.getElementById('cursiveWith');
    if (!el) return;
    var tl = gsap.timeline({ delay: 1.2 });
    // reveal text like a pen writing left → right
    tl.to(el, {
      clipPath: 'inset(0 0% 0 0)',
      duration: 0.9,
      ease: 'power3.out'
    })
    // slight bounce settle
    .fromTo(el, { rotation: -6 }, {
      rotation: -2,
      duration: 0.5,
      ease: 'elastic.out(1, 0.6)'
    }, '-=0.3')
    // underline stroke sweeps in
    .to(el.querySelector('::after') || el, {
      onStart: function() {
        el.style.setProperty('--ul', '1');
      }
    }, '-=0.2');
    // CSS can't be targeted by GSAP for ::after — use a class toggle
    tl.add(function() {
      el.classList.add('is-written');
    }, '-=0.3');
  })();

  /* ---- navbar: glass state + progress bar + hide-on-down / show-on-up ---- */
  var nav = document.getElementById('nav');
  var progress = document.getElementById('scrollProgress');
  var lastY = window.scrollY || 0;
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (nav) {
      nav.classList.toggle('scrolled', y > 30);
      // don't hide while the mobile menu is open (links is assigned below)
      var menuOpen = typeof links !== 'undefined' && links && links.classList.contains('open');
      if (!menuOpen) {
        if (y > lastY && y > 140) nav.classList.add('nav--hidden');   // scrolling down
        else if (y < lastY) nav.classList.remove('nav--hidden');      // scrolling up
      }
    }
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
    lastY = y <= 0 ? 0 : y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- mobile menu ---- */
  var burger = document.getElementById('navBurger');
  var links = document.getElementById('navLinks');
  var navClose = document.getElementById('navClose');
  function closeMenu() {
    if (links) links.classList.remove('open');
    if (burger) burger.classList.remove('open');
  }
  if (burger && links) {
    burger.addEventListener('click', function () {
      links.classList.toggle('open');
      burger.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }
  if (navClose) navClose.addEventListener('click', closeMenu);
  // close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---- services accordion ---- */
  var accordion = document.getElementById('servicesAccordion');
  if (accordion) {
    accordion.querySelectorAll('.svc').forEach(function (svc) {
      var head = svc.querySelector('.svc__head');
      var body = svc.querySelector('.svc__body');
      head.addEventListener('click', function () {
        var isOpen = svc.classList.contains('open');
        // close others (comment out next block to allow multiple open)
        accordion.querySelectorAll('.svc.open').forEach(function (other) {
          if (other !== svc) {
            other.classList.remove('open');
            other.querySelector('.svc__head').setAttribute('aria-expanded', 'false');
            other.querySelector('.svc__body').style.maxHeight = null;
          }
        });
        svc.classList.toggle('open', !isOpen);
        head.setAttribute('aria-expanded', String(!isOpen));
        body.style.maxHeight = !isOpen ? body.scrollHeight + 'px' : null;
      });
    });
    // open the first one by default
    var first = accordion.querySelector('.svc');
    if (first) {
      first.classList.add('open');
      first.querySelector('.svc__head').setAttribute('aria-expanded', 'true');
      var fb = first.querySelector('.svc__body');
      // wait a tick so scrollHeight is correct
      requestAnimationFrame(function () { fb.style.maxHeight = fb.scrollHeight + 'px'; });
    }
    // keep open heights correct on resize
    window.addEventListener('resize', function () {
      accordion.querySelectorAll('.svc.open .svc__body').forEach(function (b) {
        b.style.maxHeight = b.scrollHeight + 'px';
      });
    });
  }

  /* ---- animated stat counters ---- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1400, start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.round(target * eased);
      el.innerHTML = val + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { io.observe(c); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---- contact form → send to WhatsApp silently + show success modal ---- */
  var form = document.getElementById('leadForm');
  var modal = document.getElementById('successModal');
  var modalDetails = document.getElementById('modalDetails');
  var modalCloseBtn = document.getElementById('modalCloseBtn');

  function showModal(name, service, waUrl) {
    if (!modal) return;
    // Fill in submitted details summary
    if (modalDetails) {
      modalDetails.innerHTML =
        '<div class="modal-detail"><span>👤</span><span>' + name + '</span></div>' +
        '<div class="modal-detail"><span>🎯</span><span>' + service + '</span></div>';
    }
    // Set the WhatsApp link on the "Send via WhatsApp" button (fallback)
    var waBtn = document.getElementById('modalWaBtn');
    if (waBtn) waBtn.href = waUrl;

    modal.classList.add('is-visible');
    // Auto-close after 8 seconds
    setTimeout(closeModal, 8000);
  }

  function closeModal() {
    if (modal) modal.classList.remove('is-visible');
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameVal = (form.querySelector('#name').value || '').trim();
      var phoneVal = (form.querySelector('#phone').value || '').trim();
      var emailVal = (form.querySelector('#email').value || '').trim();
      var serviceVal = (form.querySelector('#service').value || '').trim();
      var messageVal = (form.querySelector('#message').value || '').trim();

      if (!nameVal || !phoneVal) {
        (!nameVal ? form.querySelector('#name') : form.querySelector('#phone')).focus();
        return;
      }

      // Build the WhatsApp message
      var waMsg = '📩 *New Enquiry — Omnis Digital*\n\n'
        + '👤 *Name:* ' + nameVal + '\n'
        + '📞 *Phone:* ' + phoneVal + '\n'
        + '📧 *Email:* ' + (emailVal || '—') + '\n'
        + '🎯 *Service:* ' + serviceVal + '\n'
        + '💬 *Message:* ' + (messageVal || '—');

      var waUrl = 'https://wa.me/918520064109?text=' + encodeURIComponent(waMsg);

      // Show the beautiful success modal (with WhatsApp link inside)
      showModal(nameVal, serviceVal, waUrl);

      // Reset form
      form.reset();
    });
  }

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- cursor-tracked glare on the Apple-glass contact form (demo touch) ---- */
  (function () {
    var card = document.querySelector('.contact__form--apple');
    if (!card) return;
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      var gx = ((e.clientX - r.left) / r.width) * 100;
      var gy = ((e.clientY - r.top) / r.height) * 100;
      card.style.setProperty('--gx', gx.toFixed(1) + '%');
      card.style.setProperty('--gy', gy.toFixed(1) + '%');
    }, { passive: true });
  })();

  /* ---- Apple-style pinned pillars ----
     The section stays fixed on screen while its tall scroll track passes
     through; scroll progress selects which pillar card is active, so each
     one steps forward and unfolds its details one at a time. On narrow
     screens / reduced-motion we drop the pin and show a plain stacked
     list (via .is-static) so everything stays readable. */
  (function () {
    var section = document.getElementById('services');
    var track = document.getElementById('pillarsScroll');
    var stage = document.getElementById('pillarsStage');
    if (!section || !track || !stage) return;

    var cards = Array.prototype.slice.call(stage.querySelectorAll('.ppin'));
    var rail = section.querySelectorAll('.pillars-rail__list li');
    var numEl = document.getElementById('pillarNum');
    var barEl = document.getElementById('pillarBar');
    var count = cards.length;
    var active = -1;

    function pad(n) { return ('0' + n).slice(-2); }

    function render() {
      if (section.classList.contains('is-static')) return;
      var rect = track.getBoundingClientRect();
      var total = track.offsetHeight - window.innerHeight;
      var scrolled = Math.min(Math.max(-rect.top, 0), total);
      var progress = total > 0 ? scrolled / total : 0;
      var idx = Math.min(count - 1, Math.max(0, Math.floor(progress * count)));

      if (barEl) barEl.style.transform = 'scaleX(' + progress.toFixed(4) + ')';
      if (idx === active) return;
      active = idx;
      cards.forEach(function (c, i) {
        c.classList.toggle('is-active', i === idx);
        c.classList.toggle('is-past', i < idx);
      });
      rail.forEach(function (li, i) { li.classList.toggle('is-active', i === idx); });
      if (numEl) numEl.textContent = pad(idx + 1);
    }

    function decideMode() {
      // pin on every screen size (phone, tablet, desktop) — only bail for
      // users who prefer reduced motion, who get the plain stacked list
      var pinned = !reduceMotion;
      section.classList.toggle('is-static', !pinned);
      if (pinned) { active = -1; render(); }
    }

    window.addEventListener('scroll', render, { passive: true });
    window.addEventListener('resize', decideMode);
    decideMode();
  })();

  /* ---- Apple-style liquid glass refraction on showcase panels ----
     The .glass CSS already frosts every panel; here we upgrade the
     hero/feature surfaces with real rim refraction via liquid-glass.js.
     Chromium gets the SVG refraction; Safari/Firefox auto-fall back to
     the frosted blur the module applies. Gated to wider viewports so we
     don't pay the GPU cost of many filters on phones. */
  if (window.liquidGlass && !reduceMotion && window.innerWidth > 900) {
    var glassSelector = [
      '.value__card', '.intel__viz', '.viz-card--main', '.viz-chip',
      '.plan', '.contact__form', '.chan', '.step',
      '.ad-tile:not(.ad-tile--wide)'
    ].join(',');

    var initGlass = function () {
      document.querySelectorAll(glassSelector).forEach(function (el) {
        if (el.__lg) return;                 // idempotent
        el.classList.add('lg-on');
        el.__lg = liquidGlass(el, {
          scale: -68,     // gentle magnifying bulge — keeps interiors legible
          chroma: 4,      // faint prism fringe at the rim
          border: 0.09,   // wide neutral core so text stays crisp
          blur: 2,
          saturate: 1.6
        });
      });
    };

    if (document.readyState === 'complete') initGlass();
    else window.addEventListener('load', initGlass);
  }
})();
