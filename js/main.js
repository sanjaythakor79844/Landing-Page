/* ═══════════════════════════════════════════
   KAJOL R PASWAN — main.js
   Path: js/main.js
═══════════════════════════════════════════ */

/* ─────────────────────────────────────────
   1. NAV — scroll pe shadow add hoga
───────────────────────────────────────── */
window.addEventListener('scroll', function () {
  var nav = document.getElementById('mainNav');
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }
});


/* ─────────────────────────────────────────
   2. SCROLL TO FORM — buttons ke liye
───────────────────────────────────────── */
function scrollToForm() {
  var form = document.getElementById('hero-form');
  if (form) {
    form.scrollIntoView({ behavior: 'smooth' });
  }
}


/* ─────────────────────────────────────────
   3. FAQ ACCORDION
───────────────────────────────────────── */
function toggleFaq(btn) {
  var item   = btn.closest('.faq-item');
  var isOpen = item.classList.contains('open');

  // Pehle sab band karo
  document.querySelectorAll('.faq-item').forEach(function (i) {
    i.classList.remove('open');
  });

  // Agar pehle band tha toh ab kholo
  if (!isOpen) {
    item.classList.add('open');
  }
}


/* ─────────────────────────────────────────
   4. BEFORE / AFTER SLIDER
   (drag ya touch se handle move hoga)
───────────────────────────────────────── */
document.querySelectorAll('.ba-card').forEach(function (card) {
  var drag = false;
  var bef  = card.querySelector('.ba-before');
  var hdl  = card.querySelector('.ba-handle');

  function setPos(x) {
    var rect = card.getBoundingClientRect();
    var pct  = ((x - rect.left) / rect.width) * 100;
    pct = Math.max(2, Math.min(98, pct));
    bef.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
    hdl.style.left     = pct + '%';
  }

  card.addEventListener('mousedown',  function (e) { drag = true; setPos(e.clientX); });
  card.addEventListener('touchstart', function (e) { drag = true; setPos(e.touches[0].clientX); }, { passive: true });

  window.addEventListener('mousemove',  function (e) { if (drag) setPos(e.clientX); });
  window.addEventListener('touchmove',  function (e) { if (drag) setPos(e.touches[0].clientX); }, { passive: true });
  window.addEventListener('mouseup',    function ()  { drag = false; });
  window.addEventListener('touchend',   function ()  { drag = false; });
});


/* ─────────────────────────────────────────
   5. PORTFOLIO — image load hone par
      placeholder hide ho jayega
───────────────────────────────────────── */
[1, 2, 3, 4].forEach(function (n) {
  var img = document.getElementById('pimg' + n);
  var ph  = document.getElementById('pph'  + n);

  if (!img || !ph) return;

  // Image already loaded (cache se)
  if (img.complete && img.naturalWidth > 0) {
    ph.style.display = 'none';
    return;
  }

  // Load hone par hide karo
  img.addEventListener('load', function () {
    ph.style.display = 'none';
  });

  // Error par image hide karo, placeholder dikhao
  img.addEventListener('error', function () {
    img.style.display = 'none';
  });
});

/* Hero image placeholder bhi handle karo */
(function () {
  var heroImg         = document.getElementById('heroImg');
  var heroPlaceholder = document.getElementById('heroPlaceholder');

  if (!heroImg || !heroPlaceholder) return;

  if (heroImg.complete && heroImg.naturalWidth > 0) {
    heroPlaceholder.style.display = 'none';
    return;
  }

  heroImg.addEventListener('load', function () {
    heroPlaceholder.style.display = 'none';
  });

  heroImg.addEventListener('error', function () {
    heroImg.style.display = 'none';
  });
})();


/* ─────────────────────────────────────────
   6. TESTIMONIAL AUTO-SLIDER
   - Har 3.8 sec mein slide badlega
   - Click / touch par pause hoga
───────────────────────────────────────── */
(function () {
  var slider      = document.getElementById('testiSlider');
  var dots        = document.querySelectorAll('.slider-dot');
  var pauseNotice = document.getElementById('pauseNotice');
  var testiWrap   = document.getElementById('testiWrap');

  if (!slider) return;

  var current    = 0;
  var total      = 3;
  var isPaused   = false;
  var autoTimer  = null;

  /* Slide change function — goToSlide(n) HTML se bhi call ho sakta hai */
  window.goToSlide = function (n) {
    current = (n + total) % total;
    slider.style.transform = 'translateX(-' + (current * 100) + '%)';
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === current);
    });
  };

  function nextSlide() {
    if (!isPaused) window.goToSlide(current + 1);
  }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(nextSlide, 3800);
  }

  /* Click par pause / resume toggle */
  if (testiWrap) {
    testiWrap.addEventListener('click', function () {
      isPaused = !isPaused;
      if (pauseNotice) pauseNotice.classList.toggle('show', isPaused);
    });

    /* Touch par pause — 4 sec baad auto resume */
    testiWrap.addEventListener('touchstart', function () {
      isPaused = true;
      if (pauseNotice) pauseNotice.classList.add('show');
      clearTimeout(window._testiResumeTimer);
      window._testiResumeTimer = setTimeout(function() {
        isPaused = false;
        if (pauseNotice) pauseNotice.classList.remove('show');
      }, 4000);
    }, { passive: true });
  }

  /* Init */
  window.goToSlide(0);
  startAuto();
})();


/* ─────────────────────────────────────────
   7. SCROLL REVEAL
   — .reveal elements viewport mein
     aate hi .in class milti hai
───────────────────────────────────────── */
(function () {
  var elements = document.querySelectorAll('.reveal');

  if (!elements.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        // Ek baar animate hone ke baad unobserve karo (performance)
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();




/* ─────────────────────────────────────────
   8. SMOOTH ANCHOR LINKS
───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


/* ─────────────────────────────────────────
   9. VIDEO CAROUSEL — Click on video to unmute only that one
───────────────────────────────────────── */
(function () {
  // Sound button hide karo — ab individual video click se kaam hoga
  var soundBtn = document.getElementById('vidSoundBtn');
  if (soundBtn) soundBtn.style.display = 'none';

  function initVideoClicks() {
    document.querySelectorAll('.vid-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var clickedVideo = item.querySelector('video');

        // Sab videos mute karo aur indicator hatao
        document.querySelectorAll('.vid-item').forEach(function (i) {
          var v = i.querySelector('video');
          v.muted = true;
          var ind = i.querySelector('.vid-sound-ind');
          if (ind) ind.remove();
        });

        // Agar ye pehle se unmuted tha toh mute kar do (toggle)
        if (!clickedVideo.muted) {
          clickedVideo.muted = true;
          return;
        }

        // Is video ko unmute karo
        clickedVideo.muted = false;
        clickedVideo.play().catch(function () {
          clickedVideo.muted = true;
        });

        // Sound indicator add karo
        var ind = document.createElement('div');
        ind.className = 'vid-sound-ind';
        ind.textContent = '🔊';
        item.appendChild(ind);
      });
    });
  }

  // DOM ready hone ke baad run karo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideoClicks);
  } else {
    initVideoClicks();
  }
})();

// Legacy function — ab use nahi hoti
function toggleCarouselSound() {}
