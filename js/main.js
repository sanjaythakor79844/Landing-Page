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
window.scrollToForm = scrollToForm;


/* ─────────────────────────────────────────
   3. FAQ ACCORDION
───────────────────────────────────────── */
function toggleFaq(btn) {
  var item   = btn.closest('.faq-item');
  var isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(function (i) {
    i.classList.remove('open');
  });
  if (!isOpen) {
    item.classList.add('open');
  }
}
window.toggleFaq = toggleFaq;


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


/* ─────────────────────────────────────────
   10. LIVE CONTROLS PANEL
───────────────────────────────────────── */

/* Panel open/close */
function toggleLiveControls() {
  var panel   = document.getElementById('lcPanel');
  var trigger = document.getElementById('lcTrigger');
  var isOpen  = panel.classList.contains('open');
  panel.classList.toggle('open');
  trigger.classList.toggle('shifted', !isOpen);
}
window.toggleLiveControls = toggleLiveControls;

/* Accent colour change */
var accentMap = {
  maroon:  { accent: '#8b1a2e', accent2: '#a52238', glow: 'rgba(139,26,46,0.18)', light: 'rgba(139,26,46,0.08)' },
  rosegold:{ accent: '#b8935a', accent2: '#c9a46b', glow: 'rgba(184,147,90,0.22)', light: 'rgba(184,147,90,0.1)' },
  blush:   { accent: '#c4748a', accent2: '#d4859a', glow: 'rgba(196,116,138,0.22)', light: 'rgba(196,116,138,0.1)' }
};

function setAccent(name, btn) {
  var c = accentMap[name];
  if (!c) return;
  var r = document.documentElement.style;
  r.setProperty('--accent',       c.accent);
  r.setProperty('--accent2',      c.accent2);
  r.setProperty('--accent-glow',  c.glow);
  r.setProperty('--accent-light', c.light);
  document.querySelectorAll('.lc-chips .lc-chip').forEach(function(b) {
    if (b.closest('.lc-section') === btn.closest('.lc-section'))
      b.classList.remove('active');
  });
  btn.classList.add('active');
}
window.setAccent = setAccent;

/* Background theme */
var themeMap = {
  ivory: { bg: '#f7f2ea', bg2: '#ede7d9', bg3: '#f0ebe2', text: '#1c0f0a', textMuted: 'rgba(28,15,10,0.58)', textDim: 'rgba(28,15,10,0.36)' },
  dark:  { bg: '#1a1008', bg2: '#221508', bg3: '#1e1208', text: '#f0e8d8', textMuted: 'rgba(240,232,216,0.6)', textDim: 'rgba(240,232,216,0.35)' }
};

function setTheme(name, btn) {
  var t = themeMap[name];
  if (!t) return;
  var r = document.documentElement.style;
  r.setProperty('--bg',         t.bg);
  r.setProperty('--bg2',        t.bg2);
  r.setProperty('--bg3',        t.bg3);
  r.setProperty('--text',       t.text);
  r.setProperty('--text-muted', t.textMuted);
  r.setProperty('--text-dim',   t.textDim);
  document.querySelectorAll('.lc-chips .lc-chip').forEach(function(b) {
    if (b.closest('.lc-section') === btn.closest('.lc-section'))
      b.classList.remove('active');
  });
  btn.classList.add('active');
}
window.setTheme = setTheme;

/* Hero headline swap */
var headlines = [
  { main: 'Your <em>most radiant</em><br>day begins here' },
  { main: 'The bridal look you\'ve<br><em>always imagined</em>' },
  { main: '10 years. 5000+ brides.<br><em>One unforgettable look.</em>' }
];

function setHeadline(idx, btn) {
  var h1 = document.querySelector('.hero-headline');
  if (h1) h1.innerHTML = headlines[idx].main;
  document.querySelectorAll('.lc-headline').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');
}
window.setHeadline = setHeadline;


/* ─────────────────────────────────────────
   11. LOOK DETAIL MODAL
───────────────────────────────────────── */
var lookData = {
  bridal: {
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:48px;height:48px;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>', name: 'Bridal Look', tag: 'Signature Full-Day Bridal',
    desc: 'Step into forever — radiant, confident, and completely you. Flawless skin, soft yet defined eyes, and a radiant finish that not only looks stunning in person but also photographs beautifully.',
    details: [
      ['Skin Finish', 'Flawless, radiant, long-wearing'],
      ['Eye Look', 'Soft & defined or bold & dramatic'],
      ['Longevity', '10–14 hours'],
      ['Trial', 'Included — 4–6 weeks before wedding'],
      ['Hair Styling', 'Complementary bridal hairstyle']
    ]
  },
  engagement: {
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:48px;height:48px;"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>', name: 'Engagement / Ring Ceremony', tag: 'Graceful & Composed',
    desc: 'Graceful, elegant, and perfectly composed for your first official moment. Polished and clearly bridal — without the full drama of the wedding day.',
    details: [
      ['Skin Finish', 'Semi-matte to satin'],
      ['Eye Look', 'Soft & defined'],
      ['Lip', 'Rose, mauve, berry or warm nude'],
      ['Occasion', 'Intimate gathering'],
      ['Hair', 'Graceful, portrait-ready']
    ]
  },
  reception: {
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:48px;height:48px;"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>', name: 'Reception Look', tag: 'Grand Finale Glamour',
    desc: 'Glamour, elegance, and a glow that fills the room. Luminous, dramatic, and worthy of every professional lens in the room.',
    details: [
      ['Skin Finish', 'Luminous, glowing'],
      ['Eye Look', 'Sophisticated & dramatic'],
      ['Lip', 'Bold red, deep berry or rich nude'],
      ['Lashes', 'Fuller, dramatic'],
      ['Contour', 'Enhanced cheekbone definition']
    ]
  },
  sangeet: {
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:48px;height:48px;"><path d="M9 18V5l12-2v13"/><path d="M6 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/><path d="M18 13a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>', name: 'Sangeet & Mehendi Look', tag: 'Dance, Shine & Celebrate',
    desc: 'Dance, shine, and own every moment of the night. Bold, expressive, and performance-grade — built to last through hours of movement and celebration.',
    details: [
      ['Skin Finish', 'Matte to satin, sweat-resistant'],
      ['Eye Look', 'Bold & expressive'],
      ['Lip', 'Coral, warm red or hot pink'],
      ['Wear', '6–8 hours active wear'],
      ['Hair', 'Dance-ready, secure style']
    ]
  }
};

function showLookDetail(key) {
  var d = lookData[key];
  if (!d) return;
  document.getElementById('modalIcon').innerHTML = d.icon;
  document.getElementById('modalName').textContent = d.name;
  document.getElementById('modalTag').textContent  = d.tag;
  document.getElementById('modalDesc').textContent = d.desc;
  var det = d.details.map(function(r) {
    return '<div><span>' + r[0] + '</span>' + r[1] + '</div>';
  }).join('');
  document.getElementById('modalDetails').innerHTML = det;
  document.getElementById('lookModalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
window.showLookDetail = showLookDetail;

function closeLookModal() {
  document.getElementById('lookModalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
window.closeLookModal = closeLookModal;


/* ─────────────────────────────────────────
   12. PACKAGE DETAIL PAGES
───────────────────────────────────────── */
var pkgData = {
  bridal: {
    emoji: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:48px;height:48px;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>', category: 'WEDDING DAY', title: 'Bridal',
    tagline: 'Step into forever — radiant, confident, and completely you.',
    glance: [
      { k: 'SKIN FINISH', v: 'Flawless, radiant, long-wearing — tailored to your skin type' },
      { k: 'EYE LOOK', v: 'Soft and defined or bold and dramatic — built around your style' },
      { k: 'LIP COLOUR', v: 'Classic reds, warm nudes, to deep berries — colour-matched to your outfit' },
      { k: 'HAIR STYLING', v: 'Romantic buns, braids, waves, or traditional updos' },
      { k: 'LONGEVITY', v: '10–14 hours of continuous wear' },
      { k: 'TRIAL SESSION', v: 'Included — 4 to 6 weeks before the wedding day' }
    ],
    lookQuote: 'Your wedding day is the most precious milestone of your life, and every detail of your bridal look matters.',
    lookBody: 'Using high-quality products and advanced techniques, we ensure that your makeup stays fresh from the ceremony to the last dance. We craft a look that balances classic elements with contemporary flair, making you feel confident and radiant. Every bride who trusts us is unique, and so is every look we create.',
    faqs: [
      { q: 'Do you cater to destination weddings?', a: 'Yes, we are available for destination weddings. We can discuss travel and accommodation arrangements during booking to ensure everything goes smoothly.' },
      { q: 'How do I book bridal makeup services?', a: 'You can book by contacting us through our website, phone, or social media. Once we confirm your date, we schedule a consultation to discuss your preferences.' },
      { q: 'Do you provide makeup for the Sangeet or Mehndi too?', a: 'Absolutely! We offer makeup services for all wedding events. Each ceremony has its own vibe and we create looks that fit the celebration.' },
      { q: 'Do you travel to the wedding venue?', a: 'Yes, we offer on-site services and will travel to your wedding venue. Travel costs may apply depending on location, which we discuss during booking.' }
    ]
  },
  engagement: {
    emoji: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:48px;height:48px;"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>', category: 'PRE-WEDDING', title: 'Engagement',
    tagline: 'Graceful, elegant, and perfectly composed for your first official moment.',
    glance: [
      { k: 'SKIN FINISH', v: 'Semi-matte to satin — polished for indoor event lighting' },
      { k: 'EYE LOOK', v: 'Soft and defined — warm neutrals with precise liner' },
      { k: 'LIP COLOUR', v: 'Rose, mauve, berry, or warm nude in a satin finish' },
      { k: 'BLUSH', v: 'Soft peach or dusty rose, blended high on the cheekbone' },
      { k: 'HAIR STYLING', v: 'Graceful and complementary for portrait photography' },
      { k: 'OCCASION', v: 'Daytime to early evening, intimate setting' }
    ],
    lookQuote: 'The Ring Ceremony is the beautiful beginning — the first formal milestone in your wedding journey.',
    lookBody: 'We focus on achieving a look that feels effortlessly elegant — a makeup look that complements your special moment without overpowering it. This is a close-gathering look, which means every detail reads beautifully in person and in the intimate photography that defines Ring Ceremony memories.',
    faqs: [
      { q: 'Is the Ring Ceremony look very different from the wedding look?', a: 'Yes — the Ring Ceremony look is more understated and composed, designed for an intimate setting rather than the grandeur of the main wedding. It is clearly beautiful and bridal, but it does not steal from the impact of your wedding day look.' },
      { q: 'Can I book only the Ring Ceremony makeup without a full package?', a: 'Yes, we offer individual event bookings as well as full wedding packages. Please contact us to discuss what works best for your wedding calendar.' },
      { q: 'How far in advance should I book?', a: 'We recommend booking at least 3 to 6 months in advance, particularly for peak season dates between November and February. Early booking gives time to schedule a trial session.' },
      { q: 'What if I have sensitive skin or allergies?', a: 'Please let us know at the time of enquiry. Kajol uses high-quality, hypoallergenic products and we can arrange a patch test before the event.' }
    ]
  },
  reception: {
    emoji: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:48px;height:48px;"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>', category: 'EVENING CELEBRATION', title: 'Reception',
    tagline: 'Glamour, elegance, and a glow that fills the room.',
    glance: [
      { k: 'SKIN FINISH', v: 'Luminous evening radiance with strategic highlight' },
      { k: 'EYE LOOK', v: 'Sophisticated — smokey bronze, copper, or rich burgundy' },
      { k: 'LIP COLOUR', v: 'Bold red, deep berry, rich nude, or ombré rose' },
      { k: 'LASHES', v: 'Fuller, dramatic application for evening photography' },
      { k: 'CONTOUR', v: 'Enhanced cheekbone definition for evening finish' },
      { k: 'HAIR STYLING', v: 'Elegant and structured — suited to your jewellery' }
    ],
    lookQuote: 'The Reception is the grand finale — the evening where you get to dazzle.',
    lookBody: 'We believe every bride should look dazzled at her reception. The look is calibrated for evening ambience, venue lighting, and the kind of photography that happens when everyone is in full celebratory mode. We work with you to balance your reception outfit with eye and lip choices that amplify your most beautiful features.',
    faqs: [
      { q: 'Can I have a completely different look for the reception?', a: 'Yes — this is something Kajol specialises in. If you are changing your outfit, she can create an entirely different look for the new ensemble, rehearsed during your trial sessions.' },
      { q: 'How long does the reception makeup take?', a: 'A touch-up and transformation takes approximately 45 minutes to 1 hour. For a fresh application, expect 1.5 to 2 hours. We plan the timing to fit your reception schedule.' },
      { q: 'What if I want a more Western or contemporary look?', a: 'Absolutely — whether you are wearing a gown, contemporary saree, or fusion silhouette, Kajol adapts the aesthetic completely to your outfit and personal style.' },
      { q: 'Is the reception look included in the bridal package?', a: 'Our packages can be customised to include multiple ceremony looks. Please contact us to discuss a package that covers your full event calendar.' }
    ]
  },
  sangeet: {
    emoji: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:48px;height:48px;"><path d="M9 18V5l12-2v13"/><path d="M6 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/><path d="M18 13a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>', category: 'PRE-WEDDING EVENTS', title: 'Sangeet & Mehndi',
    tagline: 'Dance, shine, and own every moment of the night.',
    glance: [
      { k: 'SANGEET FINISH', v: 'Matte to satin — sweat-resistant for a full evening of dancing' },
      { k: 'SANGEET EYE', v: 'Bold — bronze, champagne gold, deep teal, or smokey' },
      { k: 'SANGEET LIP', v: 'Coral, tangerine, warm red, or hot pink' },
      { k: 'MEHNDI FINISH', v: 'Dewy and radiant — photographically beautiful in daylight' },
      { k: 'MEHNDI EYE', v: 'Terracotta, copper, rust, bronze in a soft blend' },
      { k: 'LONGEVITY', v: 'Performance-grade — 6 to 8 hours of active wear' }
    ],
    lookQuote: 'The Sangeet is the most vibrant, most energetic event of your entire wedding calendar.',
    lookBody: 'We love creating Sangeet and Mehndi looks because they give us the freedom to be a little more daring. This is where we can bring out a bolder eye, a brighter lip, and a palette that matches your outfit\'s festive energy. At the same time, we never lose sight of practicality — your makeup must hold up through hours of movement, heat, and emotion.',
    faqs: [
      { q: 'Will the makeup hold through dancing and perspiration?', a: 'Yes — Kajol uses professional performance-grade products with a layered setting technique specifically designed for movement and perspiration.' },
      { q: 'Can I request a smokey eye for the Sangeet?', a: 'Absolutely! A bridal smokey eye is one of our most-requested looks. Kajol crafts it beautifully — from a delicate romantic version to a bold edgy statement.' },
      { q: 'Can the Mehndi look work with a very colourful outfit?', a: 'Absolutely. Kajol excels at balancing vibrant palettes with makeup that complements rather than competes. We make this choice together during your trial.' },
      { q: 'Do you offer makeup for bridesmaids and family at the Sangeet?', a: 'Yes, we offer makeup services for bridesmaids, family members, and other wedding party members. Please enquire at booking so we can plan the timing and team.' }
    ]
  },
  haldi: {
    emoji: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:48px;height:48px;"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M5 5l1.5 1.5"/><path d="M17.5 17.5L19 19"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M5 19l1.5-1.5"/><path d="M17.5 6.5L19 5"/></svg>', category: 'PRE-WEDDING RITUAL', title: 'Haldi',
    tagline: 'Pure, golden, and glowing — the beauty of new beginnings.',
    glance: [
      { k: 'SKIN FINISH', v: 'Glowing, natural, light coverage that lets skin breathe' },
      { k: 'EYE LOOK', v: 'Soft and warm — golden tones, kajal, and mascara' },
      { k: 'LIP COLOUR', v: 'Peachy nudes, warm roses, or sheer gloss' },
      { k: 'SETTING', v: 'Gentle, water-resistant — protects through the ceremony' },
      { k: 'PRODUCTS', v: 'Skin-friendly, hypoallergenic for all skin types' },
      { k: 'OCCASION', v: 'Daytime — outdoor or home garden ceremony' }
    ],
    lookQuote: 'Haldi ceremonies hold a special place in Kajol\'s heart. There is something so pure and joyful about this pre-wedding ritual.',
    lookBody: 'The Haldi look is deliberately light, warm-toned, and natural. We use products that are gentle on the skin and designed to hold up through this joyful, messy, beautiful ceremony. Being part of a bride\'s journey during such intimate moments is where we truly connect.',
    faqs: [
      { q: 'Can I request a patch test before the Haldi makeup?', a: 'Yes, absolutely. If you have sensitive skin or allergies, please inform us at booking. We can arrange a patch test to ensure your skin stays comfortable and reaction-free.' },
      { q: 'Will the turmeric from the ceremony affect my makeup?', a: 'We use a gentle but effective setting technique to protect the base makeup from turmeric contact. Your overall look remains intact and photographable throughout the ceremony.' },
      { q: 'How long before the Haldi should I arrive for makeup?', a: 'We recommend beginning makeup around 1.5 to 2 hours before the ceremony starts, allowing time for photography and final adjustments.' },
      { q: 'Is the Haldi look very different from the Mehndi look?', a: 'Yes — the Haldi look is the most natural and minimal of all ceremony looks. The Mehndi look has a little more colour and definition. We design all looks as a cohesive sequence.' }
    ]
  }
};

function openPkgDetail(key) {
  var d = pkgData[key];
  if (!d) return;

  document.getElementById('pkgdEmoji').innerHTML       = d.emoji;
  document.getElementById('pkgdCategory').textContent  = d.category;
  document.getElementById('pkgdTitle').textContent     = d.title;
  document.getElementById('pkgdTagline').textContent   = d.tagline;
  document.getElementById('pkgdLookQuote').textContent = d.lookQuote;
  document.getElementById('pkgdLookBody').textContent  = d.lookBody;

  var glanceHtml = d.glance.map(function(g) {
    return '<div class="pkgd-glance-item"><div class="pkgd-glance-key">' + g.k + '</div><div class="pkgd-glance-val">' + g.v + '</div></div>';
  }).join('');
  document.getElementById('pkgdGlance').innerHTML = glanceHtml;

  var faqHtml = d.faqs.map(function(f) {
    return '<div class="pkgd-faq-item"><button class="pkgd-faq-q" onclick="window.togglePkgFaq(this)">' + f.q + '<span>⌄</span></button><div class="pkgd-faq-a">' + f.a + '</div></div>';
  }).join('');
  document.getElementById('pkgdFaqList').innerHTML = faqHtml;

  var overlay = document.getElementById('pkgdOverlay');
  overlay.classList.add('open');
  overlay.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}
window.openPkgDetail = openPkgDetail;

function closePkgDetail() {
  var overlay = document.getElementById('pkgdOverlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}
window.closePkgDetail = closePkgDetail;

function togglePkgFaq(btn) {
  var item   = btn.closest('.pkgd-faq-item');
  var isOpen = item.classList.contains('open');
  document.querySelectorAll('.pkgd-faq-item').forEach(function(i) { i.classList.remove('open'); });
  if (!isOpen) item.classList.add('open');
}
window.togglePkgFaq = togglePkgFaq;

/*  BS EXPAND (Thoughtfully Curated LEARN MORE) -- */
window.toggleBsExpand = function(id, btn) {
  var el = document.getElementById(id);
  if (!el) return;
  var isOpen = el.classList.contains('open');
  // Close all others
  document.querySelectorAll('.bs-expand-content').forEach(function(e) { e.classList.remove('open'); });
  document.querySelectorAll('.bs-learn').forEach(function(b) { b.classList.remove('expanded'); b.textContent = 'LEARN MORE '; });
  if (!isOpen) {
    el.classList.add('open');
    btn.classList.add('expanded');
    btn.textContent = 'SHOW LESS ';
  }
};
