/* Dibujos de sus cosas raras, todos en una caja de 48×48 y con los colores reales de cada objeto. */
window.OBJETOS = (function () {
  var d = {
    bic: '<g transform="rotate(-14 24 24)"><rect x="20" y="5" width="8" height="33" rx="1.5" fill="#e6edf1"/><rect x="22.6" y="9" width="2.8" height="27" rx="1" fill="#fff6b8"/><rect x="19.4" y="3" width="9.2" height="8" rx="2" fill="#2152d9"/><path d="M20 38h8l-4 7z" fill="#c9d3d9"/><path d="M23 43.2h2l-1 2.8z" fill="#2152d9"/></g>',
    calendario: '<rect x="6" y="8" width="36" height="32" rx="3" fill="#d8b98b"/><g fill="#b8925f"><circle cx="13" cy="16" r="2.4"/><circle cx="20" cy="16" r="2.4"/><circle cx="27" cy="16" r="2.4"/><circle cx="34" cy="16" r="2.4"/><circle cx="13" cy="24" r="2.4"/><circle cx="20" cy="24" r="2.4"/><circle cx="34" cy="24" r="2.4"/><circle cx="13" cy="32" r="2.4"/><circle cx="20" cy="32" r="2.4"/><circle cx="27" cy="32" r="2.4"/><circle cx="34" cy="32" r="2.4"/></g><circle cx="27" cy="24" r="3.6" fill="none" stroke="#E8201C" stroke-width="2.4"/>',
    libro: '<rect x="10" y="5" width="28" height="38" rx="2" fill="#20375c"/><rect x="10" y="5" width="4" height="38" fill="#162640"/><path d="M17 29h18l-3 5H20z" fill="#f2efe6"/><path d="M26 13v15M26 14l7 12h-7M25 16l-6 10h6" stroke="#f2efe6" stroke-width="1.6" fill="none" stroke-linejoin="round"/>',
    estanteria: '<path d="M9 42 L9 30 L21 24 L21 13 L33 7" stroke="#b8834e" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 30 L39 30 M21 18 L39 18" stroke="#8c6238" stroke-width="3" stroke-linecap="round"/><rect x="27" y="23" width="6" height="7" fill="#E8201C"/><rect x="31" y="11" width="5" height="7" fill="#F0E424"/>',
    carcasa: '<path d="M16 3c4 4 12 4 16 0" stroke="#F0E424" stroke-width="2.2" fill="none"/><rect x="12" y="7" width="24" height="38" rx="5" fill="#a8dcee" opacity=".85"/><rect x="16" y="11" width="16" height="29" rx="3" fill="#1c1c1c"/><rect x="18" y="13" width="12" height="20" rx="1.5" fill="#3d6c8a"/>',
    imanes: '<rect x="13" y="38" width="22" height="6" rx="2" fill="#2c2c2c"/><path d="M20 38v-5h8v5" fill="#2c2c2c"/><circle cx="24" cy="17" r="9" fill="#F0E424"/><circle cx="21" cy="14" r="3" fill="#fff7a8"/><path d="M24 27v3" stroke="#bdb6a0" stroke-width="1.5" stroke-dasharray="1.5 2"/>',
    smileylibro: '<rect x="9" y="5" width="30" height="38" rx="2" fill="#ff4fa3"/><circle cx="26" cy="27" r="9" fill="#F0E424"/><circle cx="23" cy="25" r="1.3" fill="#111"/><circle cx="29" cy="25" r="1.3" fill="#111"/><path d="M21.5 29c2.5 3 6.5 3 9 0" stroke="#111" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M13 10h14M13 14h10" stroke="#111" stroke-width="2"/>',
    nube: '<path d="M14 36a8 8 0 0 1-1-16 11 11 0 0 1 21-3 8 8 0 0 1 2 19z" fill="#fbfbf6"/><circle cx="20" cy="26" r="1.5" fill="#222"/><circle cx="28" cy="26" r="1.5" fill="#222"/><path d="M19 30c3 2.6 7 2.6 10 0" stroke="#222" stroke-width="1.5" fill="none" stroke-linecap="round"/>',
    billete: '<rect x="4" y="13" width="40" height="22" rx="2" fill="#86b77b"/><rect x="7" y="16" width="34" height="16" rx="1" fill="#a6cf98"/><ellipse cx="24" cy="24" rx="6" ry="6.5" fill="#6d9d63"/><path d="M10 20h6M32 28h6" stroke="#6d9d63" stroke-width="2.4"/>',
    storm: '<rect x="14" y="40" width="20" height="5" rx="1" fill="#8a5a33"/><path d="M18 40V14a6 6 0 0 1 12 0v26z" fill="#cfe9f3"/><path d="M21 37l2-5 2 3 2-6 1 8z" fill="#ffffff"/><path d="M22 26l1.5-3 1.5 3" stroke="#fff" stroke-width="1.4" fill="none"/><rect x="21.5" y="6" width="5" height="3" rx="1" fill="#b9d6e1"/>',
    gato: '<path d="M10 14l5 8h18l5-8v16a14 14 0 0 1-28 0z" fill="#121212" stroke="#3a3a3a" stroke-width="1"/><path d="M15.5 27l6 2.5M32.5 27l-6 2.5" stroke="#F0E424" stroke-width="3" stroke-linecap="round"/><path d="M21 37c2-1.5 4-1.5 6 0" stroke="#666" stroke-width="1.6" fill="none"/>',
    globo: '<path d="M10 22a14 14 0 0 0 28 0" stroke="#bfbfbf" stroke-width="2.4" fill="none"/><circle cx="24" cy="20" r="11" fill="#2f7be0"/><path d="M16 16c3-2 6 1 8-1s5 2 7 0M18 25c3 1 4-2 7 0" stroke="#86d27a" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="21" y="36" width="6" height="4" fill="#bfbfbf"/><rect x="15" y="40" width="18" height="4" rx="2" fill="#9a9a9a"/>',
    reloj: '<rect x="18" y="3" width="12" height="42" rx="2" fill="#2e2e2e"/><rect x="11" y="13" width="26" height="22" rx="4" fill="#9ba5a9"/><rect x="14" y="17" width="20" height="12" rx="1" fill="#c9d3c3"/><path d="M17 23h3M22 23h3M27 23h4" stroke="#2e3a2a" stroke-width="2.4"/><rect x="14" y="31" width="20" height="2" fill="#E8201C"/>',
    suenos: '<rect x="7" y="10" width="34" height="28" rx="6" fill="#e8e2d4"/><circle cx="24" cy="24" r="9" fill="#1a1530"/><circle cx="21" cy="21" r="1.4" fill="#F0E424"/><circle cx="27" cy="26" r="1" fill="#fff"/><circle cx="25" cy="20" r=".8" fill="#fff"/><path d="M17 27c3-4 9-6 14-3" stroke="#7b6cff" stroke-width="1.6" fill="none"/><rect x="34" y="14" width="3" height="3" rx="1" fill="#E8201C"/>',
    lampara: '<path d="M14 8h20l5 15H9z" fill="#f4eee0"/><path d="M17 8l-3 15M21 8l-1.5 15M27 8l1.5 15M31 8l3 15" stroke="#dcd2bb" stroke-width="1.2"/><path d="M24 23v17" stroke="#3a3a3a" stroke-width="2"/><rect x="16" y="40" width="16" height="4" rx="2" fill="#3a3a3a"/>',
    camara: '<rect x="5" y="13" width="38" height="25" rx="4" fill="#ececea"/><rect x="5" y="13" width="38" height="7" rx="3" fill="#d6d6d2"/><circle cx="24" cy="27" r="8" fill="#232323"/><circle cx="24" cy="27" r="4" fill="#3e5a78"/><rect x="34" y="16" width="6" height="3" rx="1" fill="#E8201C"/>',
    cuadro: '<rect x="6" y="6" width="36" height="36" rx="2" fill="#2a2a2a"/><rect x="10" y="10" width="28" height="28" fill="#c8f26a"/><path d="M10 30c6-8 10-2 14-8s8-4 14 2v14H10z" fill="#8fd04a"/><circle cx="30" cy="17" r="3.5" fill="#efffb8"/>',
    blackbox: '<rect x="8" y="8" width="32" height="32" rx="9" fill="#0d0d0d"/><rect x="19" y="19" width="10" height="10" fill="#f5f5f5"/><circle cx="14" cy="14" r="1.6" fill="#F0E424"/>',
    espejo: '<circle cx="24" cy="24" r="17" fill="#c9cfd2"/><circle cx="24" cy="24" r="14" fill="#e3e8ea"/><path d="M32 16a11 11 0 1 0 3 6" stroke="#9aa5aa" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M21 19v5M26 19v5M20 28c2.4 2.4 6 2.4 8.4 0" stroke="#9aa5aa" stroke-width="2" fill="none" stroke-linecap="round"/>',
    brick: '<rect x="10" y="9" width="28" height="30" rx="6" fill="#8e8e8e"/><rect x="10" y="9" width="28" height="6" rx="3" fill="#a3a3a3"/><circle cx="24" cy="26" r="4" fill="#d4d4d4"/>',
    pendant: '<path d="M14 4c0 12 4 16 10 18M34 4c0 12-4 16-10 18" stroke="#9a9a9a" stroke-width="1.4" fill="none"/><circle cx="24" cy="30" r="11" fill="#1d1d1d"/><circle cx="24" cy="30" r="7.5" fill="#333"/><circle cx="24" cy="30" r="2" fill="#B0E43C"/>',
    proyector: '<rect x="9" y="12" width="30" height="28" rx="7" fill="#e9e9e6"/><circle cx="24" cy="23" r="7" fill="#1e1e1e"/><circle cx="24" cy="23" r="3.4" fill="#4b6c8f"/><rect x="15" y="34" width="18" height="2.4" rx="1.2" fill="#c7c7c2"/>'
  };
  // Pegatina: silueta blanca troquelada debajo, dibujo con trazo de rotulador encima y un temblor de mano alzada.
  var defs = false;
  function ponDefs() {
    if (defs || !document.body) return;
    defs = true;
    var d = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    d.setAttribute('width', '0'); d.setAttribute('height', '0'); d.setAttribute('aria-hidden', 'true');
    d.style.position = 'absolute';
    d.innerHTML = '<defs><filter id="mano" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="2" seed="7" result="r"/><feDisplacementMap in="SourceGraphic" in2="r" scale="1.8" xChannelSelector="R" yChannelSelector="G"/></filter></defs>';
    document.body.appendChild(d);
  }
  var n = 0;
  return {
    svg: function (name, cls) {
      ponDefs();
      var rot = [-7, 5, -3, 8, -5, 3, -9, 6][n++ % 8];
      var dib = d[name] || '';
      return '<svg class="' + (cls || 'objeto') + ' pegatina" viewBox="-6 -6 60 60" style="--rot:' + rot + 'deg" aria-hidden="true">' +
        '<g class="peg-base">' + dib + '</g><g class="peg-tinta" filter="url(#mano)">' + dib + '</g>' +
        '<path class="peg-brillo" d="M4 10 Q8 4 16 2" /></svg>';
    }
  };
})();
