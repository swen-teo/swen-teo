/* Shared SVG motifs: gradients, symbols (<use href="#id">) and generated rosettes.
   Loaded before the page content so every <use> resolves on first paint. */
(function () {
  const r = (n) => Math.round(n * 10) / 10;

  // Angel wing pointing left, root on the right. Feathers are layered ellipses.
  function wing() {
    const R = [206, 44], C = [130, -8], T = [74, 24];
    const at = (t) => [
      (1 - t) ** 2 * R[0] + 2 * (1 - t) * t * C[0] + t * t * T[0],
      (1 - t) ** 2 * R[1] + 2 * (1 - t) * t * C[1] + t * t * T[1],
    ];
    const feather = (t, len, w, ang, dy = 0) => {
      const [x, y] = at(t);
      const rad = (ang * Math.PI) / 180;
      const cx = x + (Math.cos(rad) * len) / 2;
      const cy = y + dy + (Math.sin(rad) * len) / 2;
      return `<ellipse cx="${r(cx)}" cy="${r(cy)}" rx="${r(len / 2)}" ry="${w}" transform="rotate(${r(ang)} ${r(cx)} ${r(cy)})"/>`;
    };
    let primaries = '', secondaries = '', coverts = '', shoulder = '', quills = '';
    for (let i = 0; i < 10; i++) {
      const t = 1 - i * 0.085, len = 92 - i * 5.2, ang = 172 - i * 9;
      primaries += feather(t, len, 7.5, ang, 6);
      const [x, y] = at(t), rad = (ang * Math.PI) / 180;
      quills += `M${r(x + Math.cos(rad) * 10)} ${r(y + 6 + Math.sin(rad) * 10)}L${r(x + Math.cos(rad) * len * 0.82)} ${r(y + 6 + Math.sin(rad) * len * 0.82)}`;
    }
    for (let i = 0; i < 11; i++) secondaries += feather(0.96 - i * 0.085, 46 - i * 1.6, 7, 158 - i * 8, 8);
    for (let i = 0; i <= 16; i++) {
      const [x, y] = at(i / 16);
      coverts += `<circle cx="${r(x - 3)}" cy="${r(y + 17)}" r="${r(7.2 - i * 0.12)}"/>`;
      shoulder += `<circle cx="${r(x)}" cy="${r(y + 7)}" r="${r(9.5 - i * 0.25)}"/>`;
    }
    return `<symbol id="wing" viewBox="-26 0 256 132">
      <g fill="url(#g-feather)" stroke="#c3cad8" stroke-width="1.1">
        <g>${primaries}</g><path d="${quills}" fill="none" stroke="#d3d9e4" stroke-width=".9"/><g>${secondaries}</g><g fill="#fff">${coverts}</g><g fill="#fff">${shoulder}</g>
      </g></symbol>`;
  }

  // Ribbon rosette with a lace ruffle, pleated ring, silver rim and printed label.
  function rosette({ lines = [], a = '#f7c3d7', b = '#fbdbe7', center = '#fff6fa', tail = a, tail2 = '#c9ecee', ink = '#5d6273' }) {
    const cx = 100, cy = 100;
    const pt = (rad, ang) => [cx + rad * Math.cos(ang), cy + rad * Math.sin(ang)];
    let scallop = '', holes = '', pleats = '';
    const N = 30;
    for (let k = 0; k <= N; k++) {
      const [x, y] = pt(84, (k / N) * Math.PI * 2);
      scallop += k === 0 ? `M${r(x)} ${r(y)}` : `A9.6 9.6 0 0 1 ${r(x)} ${r(y)}`;
      if (k < N) {
        const [hx, hy] = pt(80, ((k + 0.5) / N) * Math.PI * 2);
        holes += `<circle cx="${r(hx)}" cy="${r(hy)}" r="2.4"/>`;
      }
    }
    const P = 40;
    for (let k = 0; k < P; k++) {
      const a0 = (k / P) * Math.PI * 2, a1 = ((k + 1) / P) * Math.PI * 2, am = (a0 + a1) / 2;
      const [x0, y0] = pt(46, a0), [x1, y1] = pt(73, am - 0.03), [x2, y2] = pt(73, am + 0.07), [x3, y3] = pt(46, a1);
      pleats += `<path d="M${r(x0)} ${r(y0)}L${r(x1)} ${r(y1)}L${r(x2)} ${r(y2)}L${r(x3)} ${r(y3)}Z" fill="${k % 2 ? a : b}"/>`;
    }
    const sizes = [17, 12.5, 12.5];
    const startY = cy + 5 - (lines.length - 1) * 8;
    const text = lines
      .map((l, i) => `<text x="${cx}" y="${startY + i * 16}" font-size="${sizes[i] || 12}" ${i === 0 ? 'font-style="italic"' : 'letter-spacing="1.2"'}>${l}</text>`)
      .join('');
    return `<svg viewBox="0 0 200 278" role="img" aria-label="${lines.join(' ')}">
      <g transform="translate(100 112)">
        <path d="M-21 0H21V166L0 150L-21 166Z" fill="#fff" stroke="#dde2ea"/>
        <path d="M-16 0H16V150L0 137L-16 150Z" fill="${tail}" transform="rotate(16)"/>
        <path d="M-16 0H16V150L0 137L-16 150Z" fill="${tail2}" transform="rotate(-16)"/>
        <path d="M-6 0V140M6 0V140" stroke="#fff" stroke-opacity=".7" stroke-dasharray="1 4" stroke-linecap="round" stroke-width="2" transform="rotate(16)"/>
      </g>
      <path d="${scallop}Z" fill="#fff" stroke="#d9dee7" stroke-width="1.2"/>
      <g fill="#e6eaf1">${holes}</g>
      <g stroke="rgba(255,255,255,.55)" stroke-width=".6">${pleats}</g>
      <circle cx="${cx}" cy="${cy}" r="49" fill="url(#g-silver-d)"/>
      <circle cx="${cx}" cy="${cy}" r="43" fill="${center}"/>
      <ellipse cx="${cx}" cy="${cy - 24}" rx="28" ry="11" fill="#fff" opacity=".55"/>
      <g font-family="'Bodoni Moda', Didot, serif" fill="${ink}" text-anchor="middle">${text}</g>
    </svg>`;
  }
  window.rosetteSVG = rosette;

  const petal = 'M0 0C-17 -24 -15 -60 0 -86C15 -60 17 -24 0 0Z';
  const lotusPetals = [
    [-62, 0.72], [62, 0.72], [-38, 0.86], [38, 0.86], [-17, 0.97], [17, 0.97], [0, 1.04], [-82, 0.55], [82, 0.55],
  ]
    .map(([a, s]) => `<path d="${petal}" transform="translate(100 104) rotate(${a}) scale(${s})"/>`)
    .join('');

  const sprite = `<svg aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;overflow:hidden">
  <defs>
    <linearGradient id="g-silver" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/><stop offset=".38" stop-color="#e3e7ee"/><stop offset=".5" stop-color="#a7afbd"/>
      <stop offset=".62" stop-color="#f3f5f9"/><stop offset="1" stop-color="#bfc6d1"/>
    </linearGradient>
    <linearGradient id="g-silver-d" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff"/><stop offset=".3" stop-color="#cfd5df"/><stop offset=".5" stop-color="#f6f7fa"/>
      <stop offset=".72" stop-color="#a9b1bf"/><stop offset="1" stop-color="#eef1f5"/>
    </linearGradient>
    <linearGradient id="g-feather" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e9eef6"/>
    </linearGradient>
    <linearGradient id="g-pink" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffe6f0"/><stop offset=".55" stop-color="#f7b4cd"/><stop offset="1" stop-color="#ee98bb"/>
    </linearGradient>
    <linearGradient id="g-mint" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ebfbfa"/><stop offset=".55" stop-color="#a9e1e4"/><stop offset="1" stop-color="#84cdd4"/>
    </linearGradient>
    <linearGradient id="g-iris" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fde6f0"/><stop offset=".3" stop-color="#e4f0ff"/><stop offset=".55" stop-color="#dcf6f2"/>
      <stop offset=".8" stop-color="#f1e8fb"/><stop offset="1" stop-color="#fde6f0"/>
    </linearGradient>
    <linearGradient id="g-petal" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f08db4"/><stop offset=".42" stop-color="#f8c3d8"/><stop offset="1" stop-color="#fff8fb"/>
    </linearGradient>
    <radialGradient id="g-gem" cx=".35" cy=".3" r=".75">
      <stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#e9f3ff"/><stop offset="1" stop-color="#a9bad3"/>
    </radialGradient>
    <filter id="f-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3.5" result="b"/>
      <feFlood flood-color="#bff3f4"/><feComposite in2="b" operator="in" result="g"/>
      <feMerge><feMergeNode in="g"/><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>

    ${wing()}

    <symbol id="heart" viewBox="0 0 100 94">
      <path d="M50 88C20 66 4 50 4 30C4 16 15 6 28 6C38 6 46 12 50 20C54 12 62 6 72 6C85 6 96 16 96 30C96 50 80 66 50 88Z"/>
    </symbol>
    <symbol id="star" viewBox="0 0 100 100">
      <path d="M50 4L61 38L97 38L68 59L79 94L50 72L21 94L32 59L3 38L39 38Z"/>
    </symbol>
    <symbol id="sparkle" viewBox="0 0 100 100">
      <path d="M50 0C54 36 64 46 100 50C64 54 54 64 50 100C46 64 36 54 0 50C36 46 46 36 50 0Z"/>
    </symbol>
    <symbol id="puzzle" viewBox="0 0 100 100">
      <path d="M20 20H40a10 10 0 1 1 20 0H80V40a10 10 0 1 1 0 20V80H60a10 10 0 1 0 -20 0H20V60a10 10 0 1 0 0 -20Z"/>
    </symbol>
    <symbol id="note" viewBox="0 0 44 64">
      <path d="M25 4V43.5A10 7.6 -22 1 1 20.4 37.4V4Z M25 4C31 9 39 13 39 24C39 29 37 33 35 35C36 27 31 21 25 19Z"/>
    </symbol>
    <symbol id="notes" viewBox="0 0 56 64">
      <path d="M17 14L48 6V44A9 7 -22 1 1 43.6 38.4V17.5L21.4 23V51A9 7 -22 1 1 17 45Z"/>
    </symbol>
    <symbol id="clef" viewBox="0 0 64 150">
      <path d="M30 136C22 142 12 134 18 126C24 119 34 126 28 132M27 133L31 18C32 4 46 6 44 20C42 36 14 50 14 76C14 96 34 104 46 94C58 84 50 64 34 66C20 68 22 88 34 88"
        fill="none" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    </symbol>
    <symbol id="tooth" viewBox="0 0 80 92">
      <path d="M20 8C5 8 2 28 8 44C12 57 13 80 22 82C31 84 30 60 40 60C50 60 49 84 58 82C67 80 68 57 72 44C78 28 75 8 60 8C52 8 46 14 40 14C34 14 28 8 20 8Z"/>
    </symbol>
    <symbol id="bow" viewBox="0 0 100 82">
      <g fill="url(#g-pink)" stroke="#e48cb0" stroke-width="1.2" stroke-linejoin="round">
        <path d="M47 35L31 76L39 71L44 80L53 37Z"/><path d="M53 35L69 76L61 71L56 80L47 37Z"/>
        <path d="M50 32C40 8 8 2 6 22C4 41 30 45 50 34Z"/><path d="M50 32C60 8 92 2 94 22C96 41 70 45 50 34Z"/>
        <ellipse cx="50" cy="33" rx="8" ry="9.5"/>
      </g>
      <path d="M16 18C22 12 32 14 40 24M84 18C78 12 68 14 60 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".8"/>
    </symbol>
    <symbol id="heartkey" viewBox="0 0 230 84">
      <g filter="url(#f-glow)">
        <path d="M44 72C22 56 10 45 10 30C10 19 18 12 28 12C35 12 41 16 44 22C47 16 53 12 60 12C70 12 78 19 78 30C78 45 66 56 44 72Z"
          fill="none" stroke="url(#g-silver)" stroke-width="9" transform="rotate(-90 44 42)"/>
        <rect x="74" y="37" width="140" height="10" rx="5" fill="url(#g-silver)"/>
        <path d="M186 47h10v18h-10zM202 47h10v12h-10z" fill="url(#g-silver)"/>
        <circle cx="96" cy="42" r="7" fill="url(#g-silver-d)"/>
      </g>
    </symbol>
    <symbol id="gem" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="8.5" fill="url(#g-gem)" stroke="#b8c3d6" stroke-width="1"/>
      <path d="M10 3.5L12 8L16.5 10L12 12L10 16.5L8 12L3.5 10L8 8Z" fill="#fff" opacity=".85"/>
    </symbol>
    <symbol id="lotus" viewBox="0 0 200 132">
      <path d="M100 126C40 126 8 120 8 110C8 102 38 96 70 95L100 110L112 94C160 95 192 102 192 110C192 120 160 126 100 126Z" fill="url(#g-mint)" stroke="#8ccfd5"/>
      <path d="M40 112C70 116 130 117 170 111" stroke="#fff" stroke-width="2" fill="none" opacity=".7" stroke-linecap="round"/>
      <g fill="url(#g-petal)" stroke="#efa3c3" stroke-width=".9">${lotusPetals}</g>
      <ellipse cx="100" cy="96" rx="9" ry="4" fill="#f9e7a6" opacity=".9"/>
    </symbol>
    <symbol id="globe" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="50" fill="url(#g-iris)" stroke="#b7dfe4" stroke-width="1.5"/>
      <g fill="none" stroke="#fff" stroke-width="1.6" opacity=".95">
        <ellipse cx="60" cy="60" rx="50" ry="17"/><ellipse cx="60" cy="60" rx="50" ry="36"/>
        <ellipse cx="60" cy="60" rx="17" ry="50"/><ellipse cx="60" cy="60" rx="36" ry="50"/><path d="M10 60H110M60 10V110"/>
      </g>
      <ellipse cx="46" cy="32" rx="26" ry="14" fill="#fff" opacity=".75" transform="rotate(-24 46 32)"/>
    </symbol>
  </defs>
</svg>`;

  document.body.insertAdjacentHTML('afterbegin', sprite);

  // A dangling ball chain + charm strap.
  window.ballChain = (d) => `
    <path d="${d}" fill="none" stroke="#a9b1be" stroke-width="5" stroke-linecap="round" stroke-dasharray="0 7"/>
    <path d="${d}" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-dasharray="0 7" transform="translate(-.8 -.8)"/>`;
})();
