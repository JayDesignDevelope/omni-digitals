/* =========================================================
   OMNIS DIGITAL — Interactions
   ========================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- splash intro: left/centre/right glyphs converge into the real
     logomark, then the curtain lifts ----
     Plays on every page load, skipped entirely for prefers-reduced-motion,
     and simply removes itself if GSAP isn't available — the CSS 4.2s
     auto-hide in styles.css is the last-resort safety net so a JS failure
     can never permanently block the page. */
  (function () {
    var splash = document.getElementById('splash');
    if (!splash) return;

    function dismiss() {
      splash.remove();
      document.documentElement.classList.remove('splash-active');
    }

    if (reduceMotion || typeof gsap === 'undefined') { dismiss(); return; }

    document.documentElement.classList.add('splash-active');

    var skipBtn = document.getElementById('splashSkip');
    var tl = gsap.timeline({ onComplete: dismiss });

    // emblem resolves in, its three concept glyphs rise beneath, brief hold,
    // then the whole curtain lifts to reveal the page
    tl.fromTo('#splashEmblem',
        { scale: .55, opacity: 0, rotate: -30 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1.0, ease: 'elastic.out(1,0.7)' })
      .to('#splashEmblem', { scale: 1.05, duration: .32, yoyo: true, repeat: 1, ease: 'sine.inOut' }, '-=0.15')
      .fromTo('#splashConcepts .splash__concept',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: .55, ease: 'power3.out', stagger: .14 },
        '-=0.7')
      .to(splash, { autoAlpha: 0, duration: .6, ease: 'power2.inOut', delay: .6 });

    if (skipBtn) {
      skipBtn.addEventListener('click', function () {
        tl.kill();
        dismiss();
      });
    }
  })();

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
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9.5h18M8 3v4M16 3v4"/>',
    rocket:'<path d="M14.5 3.5c2.5 0 5 1.5 6 3-.5 4-3 8-8.5 11l-4-4c3-5.5 7-8 6.5-10z"/><circle cx="14.5" cy="9.5" r="1.6"/><path d="M8 15.5 5 19M9 18l-3 1.5L7 16"/>',
    repeat:'<path d="M4 7h13a3 3 0 0 1 3 3v2"/><path d="m14 3 3 4-3 4"/><path d="M20 17H7a3 3 0 0 1-3-3v-2"/><path d="m10 21-3-4 3-4"/>',
    'arrow-up-right':'<path d="M7 17 17 7M9 7h8v8"/>',
    'trend-down':'<path d="M4 7h6l2 3h8"/><path d="M15 10V6h4"/>',
    heart:'<path d="M12 20.5S3.5 15.3 3.5 9.2A4.7 4.7 0 0 1 12 6.5a4.7 4.7 0 0 1 8.5 2.7c0 6.1-8.5 11.3-8.5 11.3z"/>',
    'zap-off':'<path d="M13 2 6 13h5l-1 9 8-13h-5z" fill="currentColor" stroke="none" opacity=".35"/><path d="M4 4l16 16"/>'
  };
  document.querySelectorAll('[data-ic]').forEach(function (el) {
    var name = el.getAttribute('data-ic');
    if (ICONS[name]) {
      el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + '</svg>';
    }
  });

  /* ---- decorative accent motif in each pillar/story card's top-right ---- */
  (function () {
    var deco =
      '<svg class="ppin__deco" viewBox="0 0 190 190" aria-hidden="true">' +
        '<circle class="d-blob" cx="150" cy="40" r="70"/>' +
        '<circle class="d-ring" cx="150" cy="40" r="66"/>' +
        '<circle class="d-ring" cx="150" cy="40" r="48"/>' +
        '<circle class="d-ring" cx="150" cy="40" r="30"/>' +
        '<circle class="d-dot" cx="150" cy="40" r="5"/>' +
        '<circle class="d-dot" cx="112" cy="96" r="3"/>' +
        '<circle class="d-dot" cx="128" cy="112" r="2.4"/>' +
        '<circle class="d-dot" cx="96" cy="120" r="2.2"/>' +
      '</svg>';
    document.querySelectorAll('#pillarsStage > .ppin, #storyStage > .ppin').forEach(function (card) {
      card.insertAdjacentHTML('afterbegin', deco);
    });
  })();

  /* ---- wrap each impact-card graphic in a tinted "widget" panel so the
     stat cards read like the reference dashboard widgets ---- */
  (function () {
    document.querySelectorAll('.impact__stat .impact__spark, .impact__stat .impact__meter').forEach(function (gfx) {
      var wrap = document.createElement('div');
      wrap.className = 'impact__viz' + (gfx.classList.contains('impact__meter') ? ' impact__viz--meter' : '');
      gfx.parentNode.insertBefore(wrap, gfx);
      wrap.appendChild(gfx);
    });
  })();

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
      el.innerHTML = val.toLocaleString('en-IN') + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  /* .js-manual-count elements are counted on demand (Story chapters, tied to
     scroll-activation) instead of by this generic on-scroll-into-view observer */
  var counters = document.querySelectorAll('[data-count]:not(.js-manual-count)');
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

  /* ---- impact section: segmented pill toggle ----
     Desktop: both columns stay visible; the toggle just slides its thumb
     and gives the selected column a little pulse. Mobile: side-by-side
     comparison doesn't fit, so the toggle actually switches which single
     column is shown — and since a hidden (display:none) column's counters
     never intersect the global IntersectionObserver below, we animate them
     by hand the moment they're revealed. */
  (function () {
    var toggle = document.getElementById('impactToggle');
    if (!toggle) return;
    var btns = Array.prototype.slice.call(toggle.querySelectorAll('.impact__toggle-btn'));
    var cols = document.querySelectorAll('.impact__col');
    var mq = window.matchMedia('(max-width:760px)');

    function applyMode(mode) {
      toggle.setAttribute('data-active', mode);
      btns.forEach(function (b) {
        var active = b.getAttribute('data-mode') === mode;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });
      cols.forEach(function (col) {
        var isThis = col.getAttribute('data-panel') === mode;
        if (mq.matches) {
          // phone: show only the selected column, never dim
          col.classList.toggle('is-hidden', !isThis);
          col.classList.remove('is-dim');
          if (isThis) col.querySelectorAll('[data-count]').forEach(animateCount);
        } else {
          // desktop/tablet: both columns visible, but the unselected one
          // dims back so the chosen side is clearly highlighted
          col.classList.remove('is-hidden');
          col.classList.toggle('is-dim', !isThis);
        }
        if (isThis) {
          col.classList.remove('is-pulse');
          void col.offsetWidth; // reflow so the animation can restart
          col.classList.add('is-pulse');
        }
      });
    }

    btns.forEach(function (b) {
      b.addEventListener('click', function () { applyMode(b.getAttribute('data-mode')); });
    });
    mq.addEventListener('change', function () {
      applyMode(toggle.getAttribute('data-active') || 'without');
    });
    applyMode('without');

    /* reveal the rising sparklines / meters once the columns scroll in */
    if ('IntersectionObserver' in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('is-in'); cio.unobserve(e.target); }
        });
      }, { threshold: 0.35 });
      cols.forEach(function (c) { cio.observe(c); });
    }
  })();

  /* ---- contact form → open a pre-composed email + show success modal ---- */
  var form = document.getElementById('leadForm');
  var modal = document.getElementById('successModal');
  var modalDetails = document.getElementById('modalDetails');
  var modalCloseBtn = document.getElementById('modalCloseBtn');

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function icoSvg(name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || '') + '</svg>';
  }

  function showModal(name, service) {
    if (!modal) return;
    var titleEl = document.getElementById('modalTitle');
    if (titleEl) titleEl.textContent = 'Thank you, ' + (name.split(' ')[0] || name) + '!';
    // Fill in submitted details summary (escaped — values come from user input)
    if (modalDetails) {
      modalDetails.innerHTML =
        '<div class="modal-detail"><span class="modal-detail__ic">' + icoSvg('users') + '</span><span>' + esc(name) + '</span></div>' +
        '<div class="modal-detail"><span class="modal-detail__ic">' + icoSvg('target') + '</span><span>' + esc(service) + '</span></div>';
    }

    modal.classList.add('is-visible');
    // Auto-close after 10 seconds
    setTimeout(closeModal, 10000);
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

      var subject = 'New Enquiry — ' + nameVal + ' (' + serviceVal + ')';

      // mailto fallback — only used if the background send fails, so the
      // enquiry is never lost even when the visitor is offline.
      var lines = [
        'New Enquiry — Omnis Digital', '',
        'Name: ' + nameVal,
        'Phone: ' + phoneVal,
        'Email: ' + (emailVal || '—'),
        'Service: ' + serviceVal,
        'Message: ' + (messageVal || '—')
      ].join('\n');
      var mailUrl = 'mailto:technotots.hub@gmail.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(lines);

      function openMailFallback() {
        var opener = document.createElement('a');
        opener.href = mailUrl;
        opener.style.display = 'none';
        document.body.appendChild(opener);
        opener.click();
        opener.remove();
      }

      // Send the enquiry silently in the background to our own Node/Express
      // mailer (server/server.js) which delivers it straight to the team's
      // inbox via SMTP. CONTACT_API defaults to a same-origin path (works when
      // the site is served by that Node server); override it with an absolute
      // URL if the API runs on a different host/port.
      var CONTACT_API = window.CONTACT_API || '/api/contact';
      var submitBtn = form.querySelector('button[type="submit"]');
      var btnLabel = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = 'Sending…'; }

      fetch(CONTACT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: nameVal,
          phone: phoneVal,
          email: emailVal || '',
          service: serviceVal,
          message: messageVal || '',
          subject: subject
        })
      })
        .then(function (r) { if (!r.ok) throw new Error('bad status'); return r.json(); })
        .then(function () {
          showModal(nameVal, serviceVal);
          form.reset();
        })
        .catch(function () {
          // API unreachable (e.g. opened as a static file with no server) →
          // don't lose the lead, fall back to opening the mail client.
          openMailFallback();
          showModal(nameVal, serviceVal);
          form.reset();
        })
        .then(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = btnLabel; }
        });
    });
  }

  /* ---- cursor-tracked glare on Apple-glass surfaces ----
     A soft light patch follows the pointer across the glass (the CSS
     ::after in styles.css renders it) — the contact form, plus every
     "vivid" glass card (the Impact section's "With Omnis Digital" side). */
  (function () {
    function wireGlare(card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var gx = ((e.clientX - r.left) / r.width) * 100;
        var gy = ((e.clientY - r.top) / r.height) * 100;
        card.style.setProperty('--gx', gx.toFixed(1) + '%');
        card.style.setProperty('--gy', gy.toFixed(1) + '%');
      }, { passive: true });
    }
    document.querySelectorAll('.glass--vivid').forEach(wireGlare);
  })();

  /* ---- generic reveal-on-scroll: draws the contact proposal chart ---- */
  (function () {
    var contact = document.getElementById('contact');
    if (!contact || !('IntersectionObserver' in window)) { if (contact) contact.classList.add('is-in'); return; }
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { contact.classList.add('is-in'); rio.disconnect(); }
      });
    }, { threshold: 0.2 });
    rio.observe(contact);
  })();

  /* ---- icon badges pop in on scroll ----
     A small delightful reveal (scale + fade) distinct from the section-level
     AOS fade-up, so the little icon chips on every card feel hand-tuned. */
  (function () {
    if (reduceMotion) return;
    var icons = document.querySelectorAll('.v-ico,.chan__ic,.ad-ic,.offer__ic,.step__ic');
    if (!('IntersectionObserver' in window) || !icons.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    icons.forEach(function (el) { io.observe(el); });
  })();

  /* ---- Apple-style pinned scroll driver (reusable) ----
     A section stays fixed on screen while its tall scroll track passes
     through; scroll progress selects which card is active, so each one
     steps forward and unfolds one at a time. On reduced-motion we drop
     the pin and show a plain stacked list (via .is-static) so everything
     stays readable. Drives both the Services pillars and the Story
     chapters — same scroll math, different content. */
  function initPinnedScroll(opts) {
    var section = document.getElementById(opts.sectionId);
    var track = document.getElementById(opts.trackId);
    var stage = document.getElementById(opts.stageId);
    if (!section || !track || !stage) return;

    var cards = Array.prototype.slice.call(stage.querySelectorAll(opts.cardSelector));
    var rail = opts.railSelector ? section.querySelectorAll(opts.railSelector) : [];
    var numEl = opts.numId ? document.getElementById(opts.numId) : null;
    var barEl = opts.barId ? document.getElementById(opts.barId) : null;
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
      if (opts.onActivate) opts.onActivate(idx, cards[idx]);
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
  }

  initPinnedScroll({
    sectionId: 'services', trackId: 'pillarsScroll', stageId: 'pillarsStage',
    cardSelector: '.ppin', railSelector: '.pillars-rail__list li',
    numId: 'pillarNum', barId: 'pillarBar'
  });

  /* ---- Story chapters: GSAP micro-animations, one per chapter, played
     once the first time that chapter becomes active ---- */
  initPinnedScroll({
    sectionId: 'story', trackId: 'storyScroll', stageId: 'storyStage',
    cardSelector: '.ppin', railSelector: '.pillars-rail__list li',
    numId: 'storyNum', barId: 'storyBar',
    onActivate: function (idx, card) {
      if (!card || card.__played) return;
      card.__played = true;
      var chapter = card.getAttribute('data-chapter');

      if (chapter === 'launch') {
        var bars = card.querySelectorAll('.story-bars span');
        if (window.gsap && bars.length) {
          gsap.fromTo(bars, { height: 0 }, {
            height: function (i, el) { return el.style.getPropertyValue('--h'); },
            duration: .9, ease: 'power3.out', stagger: .08
          });
        }
      } else if (chapter === 'reach' || chapter === 'compound') {
        card.querySelectorAll('[data-count]').forEach(animateCount);
      } else if (chapter === 'respond') {
        var donut = card.querySelector('.story-donut');
        var numEl = card.querySelector('.story-donut-num');
        var target = 82;
        if (window.gsap) {
          gsap.to({ v: 0 }, {
            v: target, duration: 1.3, ease: 'power2.out',
            onUpdate: function () {
              var v = this.targets()[0].v;
              if (donut) donut.style.setProperty('--pos', v);
              if (numEl) numEl.textContent = Math.round(v);
            }
          });
        } else {
          if (donut) donut.style.setProperty('--pos', target);
          if (numEl) numEl.textContent = target;
        }
      }
    }
  });

  /* ---- Apple-style liquid glass refraction on showcase panels ----
     The .glass CSS already frosts every panel; here we upgrade the
     hero/feature surfaces with real rim refraction via liquid-glass.js.
     Chromium gets the SVG refraction; Safari/Firefox auto-fall back to
     the frosted blur the module applies. Gated to wider viewports so we
     don't pay the GPU cost of many filters on phones. */
  if (window.liquidGlass && !reduceMotion && window.innerWidth > 900) {
    var glassSelector = [
      '.intel__viz', '.viz-card--main', '.viz-chip',
      '.plan', '.contact__form', '.chan', '.step'
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
