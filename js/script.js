/* =================================================================
   DRA. CLAUDETE S. GOMES – SCRIPT
   ================================================================= */
(function () {
  'use strict';

  var WHATSAPP = '5511960867049';

  /* 1. HEADER AO ROLAR ---------------------------------------- */
  var header = document.getElementById('header');
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 2. MENU MOBILE -------------------------------------------- */
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');
  var mq = window.matchMedia('(max-width: 960px)');

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', open);
    document.body.style.overflow = open && mq.matches ? 'hidden' : '';
    if ('inert' in nav) nav.inert = mq.matches && !open;
  }

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });
  (mq.addEventListener ? mq.addEventListener.bind(mq, 'change') : mq.addListener.bind(mq))(function () {
    setMenu(false);
  });
  setMenu(false);

  /* 3. ANIMAÇÃO DE ENTRADA ------------------------------------ */
  var animated = document.querySelectorAll('[data-animate]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    animated.forEach(function (el) { io.observe(el); });
  } else {
    animated.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* 4. FORMULÁRIO → WHATSAPP ---------------------------------- */
  var form = document.getElementById('contactForm');
  if (form) {
    var nameEl = document.getElementById('name');
    var areaEl = document.getElementById('area');
    var msgEl = document.getElementById('message');
    var nameErr = document.getElementById('nameError');
    var msgErr = document.getElementById('messageError');
    var feedback = document.getElementById('formFeedback');

    function setError(input, errEl, text) {
      input.classList.toggle('is-invalid', !!text);
      errEl.textContent = text || '';
    }

    nameEl.addEventListener('input', function () { setError(nameEl, nameErr, ''); });
    msgEl.addEventListener('input', function () { setError(msgEl, msgErr, ''); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = nameEl.value.trim();
      var msg = msgEl.value.trim();
      var ok = true;

      if (name.length < 3) { setError(nameEl, nameErr, 'Informe seu nome.'); ok = false; }
      if (msg.length < 10) { setError(msgEl, msgErr, 'Escreva uma mensagem com pelo menos 10 caracteres.'); ok = false; }
      if (!ok) { feedback.textContent = ''; return; }

      var text =
        'Olá, Dra. Claudete! Meu nome é ' + name + '.\n' +
        'Área de interesse: ' + areaEl.value + '.\n\n' + msg;

      window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
      feedback.textContent = 'Abrindo o WhatsApp…';
      form.reset();
    });
  }

  /* 5. ANO NO RODAPÉ ------------------------------------------ */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
