/* Qpushly site — the only client script. Three small jobs:
   1. sticky-header border on scroll
   2. mobile nav toggle
   3. reveal-on-scroll + the hero notification-arrival sequence

   Everything degrades to "already visible / already arrived" with JS off: the
   markup ships with `.show` on each push and `.rv` elements are revealed by an
   IntersectionObserver that simply never runs. */
(function () {
  'use strict';

  var reduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 1. header border once scrolled ---------------------------------- */
  var header = document.querySelector('header.site');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 4);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- 2. mobile nav --------------------------------------------------- */
  var burger = document.querySelector('.menu-btn');
  var overlay = document.querySelector('.nav-overlay');
  var close = function () {
    document.body.classList.remove('nav-open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
  };
  if (burger) {
    burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  if (overlay) overlay.addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
  // Closing on navigation matters because the nav is inside the sticky header:
  // an in-page anchor would otherwise leave the panel open over the target.
  Array.prototype.forEach.call(document.querySelectorAll('.nav-links a'), function (a) {
    a.addEventListener('click', close);
  });

  /* ---- 3a. reveal on scroll ------------------------------------------- */
  var revealables = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window) || reduced) {
    Array.prototype.forEach.call(revealables, function (el) {
      el.classList.add('in');
    });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
    Array.prototype.forEach.call(revealables, function (el) {
      io.observe(el);
    });
  }

  /* ---- 3b. hero notification shade ------------------------------------
     Deliberately NOT animated card-by-card. An earlier version emptied the
     stack on load and staggered the cards back in, which looked like arriving
     pushes — but it also meant the hero's centrepiece was an empty dark panel
     for the first second of every visit, and for every crawler, screenshot and
     link-preview snapshot. The shade's own fade-and-rise (`.shade.in`) plus the
     floating chips carry enough motion; the content stays put. */
})();
