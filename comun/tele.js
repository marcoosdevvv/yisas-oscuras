/* La tele: zapping por sus proyectos, con nieve entre canal y canal. */
window.Tele = (function () {
  var Y = window.YISAS;
  var LUCES = ['#E8201C', '#4aa3ff', '#f4f4f0', '#66BC80', '#ffb347', '#7b6cff', '#ff5a5a', '#c77dff'];

  function titulo(p) {
    return p.corto.map(function (l) {
      var safe = YUI.esc(l);
      var r = YUI.esc(p.rojo);
      return safe.replace(r, '<span class="rojo">' + r + '</span>');
    }).join('<br>');
  }

  function montar(root, opts) {
    opts = opts || {};
    var reduce = YUI.reduce, P = Y.proyectos, cur = 0, raf = 0, until = 0;
    root.classList.add('tele', 'tele--' + (opts.tema || 'salon'));

    var canales = P.map(function (p, i) {
      return '<div class="canal" style="--fondo:' + p.fondo + '"' + (i ? ' hidden' : '') + ' aria-label="Canal ' + (i + 1) + ': ' + YUI.esc(p.titulo) + '">' +
        '<span class="c-num" aria-hidden="true">' + (i + 1) + '</span>' +
        '<span class="c-meta">canal ' + (i + 1) + ' · ' + p.donde + '</span>' +
        '<p class="c-titulo">' + titulo(p) + '</p></div>';
    }).join('');

    var botones = P.map(function (p, i) {
      return '<button class="rk" type="button" data-ch="' + i + '" aria-pressed="' + (i ? 'false' : 'true') + '" aria-label="Canal ' + (i + 1) + '">' + (i + 1) + '</button>';
    }).join('');

    root.innerHTML =
      '<div class="tele-luz" aria-hidden="true"></div>' +
      '<div class="tele-cuerpo">' +
        '<div class="tele-pantalla">' + canales + '<canvas class="tele-nieve" aria-hidden="true"></canvas><span class="tele-osd" aria-live="polite"></span></div>' +
        '<div class="tele-lado" aria-hidden="true"><span class="tele-marca">villegas ☺︎</span><span class="tele-dial"></span><span class="tele-rejilla"></span><span class="tele-led"></span></div>' +
      '</div>' +
      '<div class="tele-mando" role="group" aria-label="Mando">' +
        '<button class="rk ch" type="button" data-step="-1" aria-label="Canal anterior"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M10.5 3 5 8l5.5 5" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg><span>ch</span></button>' + botones + '<button class="rk ch" type="button" data-step="1" aria-label="Canal siguiente"><span>ch</span><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M5.5 3 11 8l-5.5 5" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
      '</div>' +
      '<div class="tele-ahora"><p class="ahora-t"></p><a class="btn ahora-a" target="_blank" rel="noopener"></a></div>' +
      '<section class="guia" aria-labelledby="guia-h"><h2 id="guia-h">programación</h2><ol>' +
        P.map(function (p, i) {
          return '<li' + (i ? '' : ' class="on"') + '><span class="g-n">' + (i + 1) + '</span><span><button type="button" data-ch="' + i + '">' + YUI.esc(p.titulo) + '</button><span class="g-d">' + p.donde + '</span></span>' +
            '<a href="' + p.href + '" target="_blank" rel="noopener">abrir ↗</a></li>';
        }).join('') +
      '</ol></section>';

    var chs = [].slice.call(root.querySelectorAll('.canal'));
    var cv = root.querySelector('.tele-nieve'), ctx = cv.getContext('2d'), osd = root.querySelector('.tele-osd');
    var luz = root.querySelector('.tele-luz'), dial = root.querySelector('.tele-dial');
    var aT = root.querySelector('.ahora-t'), aA = root.querySelector('.ahora-a');
    cv.width = 96; cv.height = 120;

    function nieve() {
      var img = ctx.createImageData(cv.width, cv.height), d = img.data;
      for (var i = 0; i < d.length; i += 4) { var v = Math.random() * 255 | 0; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255; }
      ctx.putImageData(img, 0, 0);
    }
    function loop() {
      if (performance.now() < until) { nieve(); raf = requestAnimationFrame(loop); }
      else { cv.style.opacity = 0; raf = 0; luz.classList.remove('parpadeo'); }
    }
    function ahora() {
      var p = P[cur];
      aT.innerHTML = YUI.esc(p.titulo) + '<span>canal ' + (cur + 1) + ' · ' + p.donde + '</span>';
      aA.href = p.href;
      aA.textContent = 'ver en ' + p.donde + ' ↗';
      root.style.setProperty('--luz', LUCES[cur % LUCES.length]);
      if (opts.onCanal) opts.onCanal(cur, LUCES[cur % LUCES.length]);
    }
    function go(n) {
      n = (n + P.length) % P.length;
      if (n === cur) return;
      chs[cur].hidden = true; cur = n; chs[cur].hidden = false;
      osd.textContent = 'CH ' + YUI.pad(n + 1);
      osd.classList.remove('show'); void osd.offsetWidth; osd.classList.add('show');
      dial.style.transform = 'rotate(' + (n * 45) + 'deg)';
      root.querySelectorAll('.tele-mando [data-ch]').forEach(function (b) { b.setAttribute('aria-pressed', +b.dataset.ch === n ? 'true' : 'false'); });
      root.querySelectorAll('.guia li').forEach(function (li, i) { li.classList.toggle('on', i === n); });
      if (!reduce) { cv.style.opacity = 1; luz.classList.add('parpadeo'); until = performance.now() + 280; if (!raf) raf = requestAnimationFrame(loop); }
      ahora();
    }

    root.querySelectorAll('[data-ch]').forEach(function (b) {
      b.addEventListener('click', function () {
        go(+b.dataset.ch);
        if (b.closest('.guia')) root.querySelector('.tele-pantalla').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      });
    });
    root.querySelectorAll('[data-step]').forEach(function (b) { b.addEventListener('click', function () { go(cur + (+b.dataset.step)); }); });
    document.addEventListener('keydown', function (e) {
      if (e.target.closest && e.target.closest('input,textarea,.menu')) return;
      if (e.key === 'ArrowRight') { go(cur + 1); }
      else if (e.key === 'ArrowLeft') { go(cur - 1); }
      else if (/^[1-8]$/.test(e.key)) { go(+e.key - 1); }
    });
    // deslizar sobre la pantalla en el móvil
    var x0 = null, pant = root.querySelector('.tele-pantalla');
    pant.addEventListener('pointerdown', function (e) { x0 = e.clientX; });
    pant.addEventListener('pointerup', function (e) { if (x0 === null) return; var dx = e.clientX - x0; if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1)); x0 = null; });

    ahora();
  }

  return { montar: montar };
})();
