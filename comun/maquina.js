/* La máquina: cada cosa rara tiene un código. Tecleas el código (o tocas la ranura), el objeto cae y se imprime el ticket con sus enlaces.
   cosas-raras.html#B2 abre directamente el B2, así cada reel puede enlazar a su objeto. */
window.Maquina = (function () {
  var Y = window.YISAS, O = window.OBJETOS;
  var COIL = '<svg class="coil" viewBox="0 0 60 10" preserveAspectRatio="none" aria-hidden="true"><path d="M0 5 C5 -1 10 11 15 5 S25 -1 30 5 S40 11 45 5 S55 -1 60 5"/></svg>';
  var LETRAS = ['A', 'B', 'C', 'D', 'E', 'F'], NUMS = ['1', '2', '3', '4'];

  function barcode(code) {
    var x = 0, s = '', seed = code.charCodeAt(0) * 7 + code.charCodeAt(1) * 13;
    while (x < 108) { seed = (seed * 9301 + 49297) % 233280; var w = 1 + (seed % 3); s += '<rect x="' + x + '" y="0" width="' + w + '" height="26" fill="#111"/>'; x += w + 1 + (seed % 2); }
    return '<svg viewBox="0 0 110 26" aria-hidden="true">' + s + '</svg>';
  }

  function montar(root, opts) {
    opts = opts || {};
    var esc = YUI.esc, reduce = YUI.reduce;
    var byCode = {};
    Y.cosas.forEach(function (c) { byCode[c.code] = c; });

    var slots = '';
    LETRAS.forEach(function (l) {
      NUMS.forEach(function (n) {
        var code = l + n, c = byCode[code];
        if (c) {
          slots += '<button class="slot" type="button" data-code="' + code + '" aria-label="' + code + ', ' + esc(c.nombre) + '">' +
            O.svg(c.icono) + COIL + '<span class="slot-tag"><b>' + code + '</b>' + esc(c.corto) + '</span></button>';
        } else {
          slots += '<div class="slot vacio" data-code="' + code + '"><span class="sello">pronto</span>' + COIL + '<span class="slot-tag"><b>' + code + '</b>la siguiente</span></div>';
        }
      });
    });

    var keys = LETRAS.concat(NUMS).map(function (k) { return '<button class="key" type="button" data-k="' + k + '">' + k + '</button>'; }).join('') +
      '<button class="key borrar" type="button" data-k="x" aria-label="Borrar">⌫</button>';

    root.classList.add('maq', 'maq--' + (opts.tema || 'dia'));
    root.innerHTML =
      '<div class="maq-cabecera"><h1 class="maq-rotulo"><small>*links*</small>mis cosas raras</h1>' +
      '<button class="maq-lista-btn" type="button" aria-expanded="false">ver en lista</button></div>' +
      '<div class="maq-cristal" role="group" aria-label="Ranuras de la máquina">' + slots + '</div>' +
      '<div class="maq-panel">' +
        '<div class="maq-disp" aria-live="polite"><span class="d-code">— —</span><span class="d-msg">marca el código</span></div>' +
        '<div class="maq-keys" role="group" aria-label="Teclado">' + keys + '</div>' +
        '<div class="maq-bandeja" aria-hidden="true"></div>' +
        '<div class="maq-ranura" aria-hidden="true"></div>' +
        '<div class="ticket" role="status" hidden></div>' +
      '</div>' +
      '<div class="maq-lista" hidden></div>';

    var disp = root.querySelector('.maq-disp'), dCode = disp.querySelector('.d-code'), dMsg = disp.querySelector('.d-msg');
    var ticket = root.querySelector('.ticket'), bandeja = root.querySelector('.maq-bandeja'), panel = root.querySelector('.maq-panel');
    var lista = root.querySelector('.maq-lista'), listaBtn = root.querySelector('.maq-lista-btn');
    var sel = '', busy = false;

    function show(code, msg) { dCode.textContent = code; dMsg.textContent = msg; }
    function clearKeys() { root.querySelectorAll('.key.on').forEach(function (k) { k.classList.remove('on'); }); }

    function linksDe(c) {
      var h = '';
      if (c.link) h += '<a href="' + c.link + '" target="_blank" rel="noopener">' + (c.proyecto ? 'ver proyecto' : 'link') + ' ↗</a>';
      if (c.reel) h += '<a class="sec" href="' + c.reel + '" target="_blank" rel="noopener">' + (c.reelTexto ? esc(c.reelTexto) : 'abrir ↗ <small>reel</small>') + '</a>';
      return h;
    }

    function placeTicket() {
      if (window.matchMedia('(max-width:820px)').matches) ticket.style.bottom = (panel.getBoundingClientRect().height + 22) + 'px';
      else ticket.style.bottom = '';
    }

    function imprimir(c) {
      var ahora = new Date();
      ticket.innerHTML =
        '<button class="t-cerrar" type="button" aria-label="Cerrar ticket">✕</button>' +
        '<div class="t-cab"><span>CÓDIGO ' + c.code + '</span><span>' + ahora.toLocaleDateString('es-ES') + ' · ' + ahora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) + '</span></div>' +
        '<h3>' + esc(c.nombre) + '</h3>' +
        (c.grupo ? '<p class="t-grupo">' + esc(Y.grupos[c.grupo]) + '</p>' : '') +
        '<div class="t-links">' + linksDe(c) + '</div>' +
        '<div class="t-pie"><span>gracias, gente rara ☺︎<br>' + esc(Y.dominio) + '</span>' + barcode(c.code) + '</div>';
      placeTicket();
      ticket.hidden = false;
      ticket.classList.remove('imprime', 'visto');
      void ticket.offsetWidth;
      ticket.classList.add(reduce ? 'visto' : 'imprime');
      ticket.querySelector('.t-cerrar').addEventListener('click', function () { ticket.hidden = true; });
    }

    function vend(code) {
      var c = byCode[code];
      root.querySelectorAll('.slot.elegido').forEach(function (s) { s.classList.remove('elegido'); });
      if (!c) {
        var vac = root.querySelector('.slot.vacio[data-code="' + code + '"]');
        show(code, vac ? 'vacía: aquí va la siguiente cosa rara' : 'ese código no existe');
        return;
      }
      if (busy) return;
      busy = true;
      var slot = root.querySelector('.slot[data-code="' + code + '"]');
      slot.classList.add('elegido');
      show(code, c.corto);
      slot.classList.remove('cae', 'repone');
      void slot.offsetWidth;
      slot.classList.add('cae');
      bandeja.innerHTML = O.svg(c.icono);
      bandeja.classList.remove('llega');
      setTimeout(function () { void bandeja.offsetWidth; bandeja.classList.add('llega'); }, reduce ? 0 : 520);
      setTimeout(function () { imprimir(c); }, reduce ? 0 : 640);
      setTimeout(function () { slot.classList.remove('cae'); slot.classList.add('repone'); busy = false; }, reduce ? 0 : 1500);
      try { history.replaceState(null, '', '#' + code); } catch (e) {}
    }

    root.querySelectorAll('.slot[data-code]').forEach(function (s) {
      if (!s.classList.contains('vacio')) s.addEventListener('click', function () { clearKeys(); sel = ''; vend(s.dataset.code); });
    });
    root.querySelectorAll('.key').forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.dataset.k;
        clearKeys();
        if (k === 'x') { sel = ''; show('— —', 'marca el código'); return; }
        if (LETRAS.indexOf(k) > -1) { sel = k; b.classList.add('on'); show(k + ' _', 'ahora el número'); return; }
        if (!sel) { show('? ' + k, 'primero la letra'); return; }
        var code = sel + k; sel = '';
        vend(code);
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.target.closest && e.target.closest('input,textarea')) return;
      var k = e.key.toUpperCase();
      var b = root.querySelector('.key[data-k="' + k + '"]');
      if (b && !e.metaKey && !e.ctrlKey) { b.click(); }
    });

    // Lista normal, en su orden y con el grupo de seis
    var html = '', grupoAbierto = null;
    Y.cosas.forEach(function (c) {
      if (c.grupo && grupoAbierto !== c.grupo) { html += '</ol><h3>' + esc(Y.grupos[c.grupo]) + '</h3><ol>'; grupoAbierto = c.grupo; }
      else if (!c.grupo && grupoAbierto) { html += '</ol><h3>y más cosas raras</h3><ol>'; grupoAbierto = null; }
      html += '<li><span class="c">' + c.code + '</span><span class="n">' + esc(c.nombre) + '</span><span class="ls">' +
        (c.reel ? '<a href="' + c.reel + '" target="_blank" rel="noopener">abrir ↗</a>' : '') +
        (c.link ? '<a href="' + c.link + '" target="_blank" rel="noopener">' + (c.proyecto ? 'ver proyecto' : 'link') + '</a>' : '') + '</span></li>';
    });
    lista.innerHTML = '<ol>' + html + '</ol>';
    listaBtn.addEventListener('click', function () {
      var abierta = lista.hidden;
      lista.hidden = !abierta;
      listaBtn.textContent = abierta ? 'ver la máquina' : 'ver en lista';
      listaBtn.setAttribute('aria-expanded', abierta ? 'true' : 'false');
      root.querySelector('.maq-cristal').hidden = abierta;
      panel.hidden = abierta;
      ticket.hidden = true;
    });

    window.addEventListener('resize', placeTicket);
    function desdeHash() {
      var h = (location.hash || '').replace('#', '').toUpperCase();
      if (byCode[h] && dCode.textContent !== h) setTimeout(function () { vend(h); }, 500);
    }
    window.addEventListener('hashchange', desdeHash);
    desdeHash();
  }

  return { montar: montar };
})();
