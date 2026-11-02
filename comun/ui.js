/* Menú a pantalla completa, "volver arriba" y utilidades que usan todas las páginas. */
(function () {
  var Y = window.YISAS;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.YUI = {
    reduce: reduce,
    whenVisible: function (el, start, stop) {
      if (!('IntersectionObserver' in window)) { start(); return; }
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { e.isIntersecting ? start() : stop && stop(); });
      }, { threshold: 0.02 }).observe(el);
    },
    esc: function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); },
    pad: function (n) { return (n < 10 ? '0' : '') + n; }
  };

  function current() {
    var f = location.pathname.split('/').pop() || 'index.html';
    return f;
  }

  // Menú
  var btn = document.querySelector('[data-menu]');
  if (btn && Y) {
    var menu = document.createElement('div');
    menu.className = 'menu';
    menu.id = 'menu';
    menu.setAttribute('role', 'dialog');
    menu.setAttribute('aria-modal', 'true');
    menu.setAttribute('aria-label', 'Menú');
    var items = [{ texto: 'inicio', href: 'index.html' }].concat(Y.secciones);
    menu.innerHTML = '<button class="cerrar" type="button">cerrar ✕</button><ol>' +
      items.map(function (s, i) {
        var here = s.href === current() ? ' aria-current="page"' : '';
        var out = s.fuera ? ' target="_blank" rel="noopener"' : '';
        return '<li style="--i:' + i + '"><a href="' + s.href + '"' + here + out + '>' + YUI.esc(s.texto) + (s.fuera ? ' ↗' : '') + '</a></li>';
      }).join('') + '</ol>';
    document.body.appendChild(menu);
    btn.setAttribute('aria-controls', 'menu');
    btn.setAttribute('aria-expanded', 'false');
    var close = menu.querySelector('.cerrar');
    function open() { menu.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); setTimeout(function () { close.focus(); }, 50); }
    function shut() { menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
    btn.addEventListener('click', function (e) { e.preventDefault(); open(); });
    close.addEventListener('click', shut);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('open')) shut(); });
  }

  // Volver arriba, como en su web
  if (document.body.hasAttribute('data-up')) {
    var up = document.createElement('button');
    up.className = 'up';
    up.type = 'button';
    up.textContent = '↑ volver arriba';
    document.body.appendChild(up);
    up.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });
    var shown = false;
    window.addEventListener('scroll', function () {
      var s = window.scrollY > 700;
      if (s !== shown) { shown = s; up.classList.toggle('show', s); }
    }, { passive: true });
  }
})();
