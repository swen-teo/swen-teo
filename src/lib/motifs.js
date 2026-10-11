/* Generated SVG motifs. Everything is drawn in code: no traced or copied artwork.
   spriteSVG() returns shared gradients/filters/symbols; the other helpers return
   standalone SVG strings for richer one-off objects (rosettes, doilies). */

const r = (n) => Math.round(n * 10) / 10;
const TAU = Math.PI * 2;
const polar = (cx, cy, rad, a) => [cx + rad * Math.cos(a), cy + rad * Math.sin(a)];

/* ---------- Angel wing: three feather tiers + quills + soft shoulder ---------- */
function wing() {
  const R = [206, 44], C = [130, -8], T = [74, 24];
  const at = (t) => [
    (1 - t) ** 2 * R[0] + 2 * (1 - t) * t * C[0] + t * t * T[0],
    (1 - t) ** 2 * R[1] + 2 * (1 - t) * t * C[1] + t * t * T[1],
  ];
  const feather = (t, len, w, ang, dy) => {
    const [x, y] = at(t), rad = (ang * Math.PI) / 180;
    const bx = x, by = y + dy, tx = x + Math.cos(rad) * len, ty = y + dy + Math.sin(rad) * len;
    const nx = -Math.sin(rad) * w, ny = Math.cos(rad) * w;
    // tapered feather with a rounded tip and a slight curl
    return `<path d="M${r(bx)} ${r(by)}Q${r(bx + (tx - bx) * 0.5 + nx * 1.2)} ${r(by + (ty - by) * 0.5 + ny * 1.2)} ${r(tx + nx * 0.25)} ${r(ty + ny * 0.25)}Q${r(tx + Math.cos(rad) * w * 0.6)} ${r(ty + Math.sin(rad) * w * 0.6)} ${r(tx - nx * 0.35)} ${r(ty - ny * 0.35)}Q${r(bx + (tx - bx) * 0.5 - nx)} ${r(by + (ty - by) * 0.5 - ny)} ${r(bx)} ${r(by)}Z"/>`;
  };
  let p = '', s = '', q = '', cov = '', sh = '', barbs = '';
  for (let i = 0; i < 11; i++) {
    const t = 1 - i * 0.078, len = 96 - i * 5, ang = 174 - i * 8.6;
    p += feather(t, len, 9, ang, 6);
    const [x, y] = at(t), rad = (ang * Math.PI) / 180;
    q += `M${r(x + Math.cos(rad) * 8)} ${r(y + 6 + Math.sin(rad) * 8)}L${r(x + Math.cos(rad) * len * 0.86)} ${r(y + 6 + Math.sin(rad) * len * 0.86)}`;
    for (let k = 0.3; k < 0.85; k += 0.11) {
      const bx = x + Math.cos(rad) * len * k, by = y + 6 + Math.sin(rad) * len * k;
      barbs += `M${r(bx)} ${r(by)}l${r(Math.cos(rad + 0.5) * 6)} ${r(Math.sin(rad + 0.5) * 6)}`;
    }
  }
  for (let i = 0; i < 12; i++) s += feather(0.97 - i * 0.078, 50 - i * 1.4, 8, 160 - i * 7.4, 9);
  for (let i = 0; i <= 18; i++) {
    const [x, y] = at(i / 18);
    cov += `<ellipse cx="${r(x - 3)}" cy="${r(y + 19)}" rx="${r(7.5 - i * 0.12)}" ry="${r(6.4 - i * 0.1)}"/>`;
    sh += `<circle cx="${r(x)}" cy="${r(y + 8)}" r="${r(9.6 - i * 0.24)}"/>`;
  }
  return `<symbol id="wing" viewBox="-30 0 262 136">
    <g stroke="#cfc9d4" stroke-width="1" stroke-linejoin="round">
      <g fill="url(#g-feather)">${p}</g>
      <path d="${q}" fill="none" stroke="#ddd8e1" stroke-width=".9"/>
      <path d="${barbs}" fill="none" stroke="#e6e2e9" stroke-width=".6"/>
      <g fill="url(#g-feather)">${s}</g>
      <g fill="#fff">${cov}</g><g fill="#fff">${sh}</g>
    </g></symbol>`;
}

/* ---------- Lotus with veined petals and a water ripple pad ---------- */
function lotus() {
  const petal = 'M0 0C-18 -24 -16 -60 0 -88C16 -60 18 -24 0 0Z';
  const vein = 'M0 -4C-2 -30 -2 -56 0 -80M0 -10C-6 -30 -7 -48 -4 -66M0 -10C6 -30 7 -48 4 -66';
  const set = [[-64, 0.7], [64, 0.7], [-40, 0.84], [40, 0.84], [-19, 0.96], [19, 0.96], [0, 1.04], [-84, 0.52], [84, 0.52]];
  const petals = set.map(([a, sc]) => `<g transform="translate(100 104) rotate(${a}) scale(${sc})"><path d="${petal}"/><path d="${vein}" fill="none" stroke="#f3b4cb" stroke-width=".8" opacity=".75"/></g>`).join('');
  return `<symbol id="lotus" viewBox="0 0 200 134">
    <path d="M100 128C40 128 8 121 8 111C8 103 38 97 70 96L100 111L112 95C160 96 192 103 192 111C192 121 160 128 100 128Z" fill="url(#g-mint)" stroke="#a9d3d8"/>
    <path d="M100 111L70 96M100 111L60 120M100 111L140 121M100 111L170 104M100 111L112 95" stroke="#c9e8ea" stroke-width="1.2" fill="none"/>
    <path d="M40 114C70 118 130 119 170 113" stroke="#fff" stroke-width="2" fill="none" opacity=".7" stroke-linecap="round"/>
    <g fill="url(#g-petal)" stroke="#eeb2c8" stroke-width=".9">${petals}</g>
    <ellipse cx="100" cy="97" rx="10" ry="4.5" fill="#f6e9c2"/>
    <g fill="#e9cf8e">${Array.from({ length: 9 }, (_, i) => `<circle cx="${92 + i * 2}" cy="${96 + (i % 2)}" r=".9"/>`).join('')}</g>
  </symbol>`;
}

export function spriteSVG() {
  return `<svg aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;overflow:hidden">
  <defs>
    <linearGradient id="g-silver" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/><stop offset=".36" stop-color="#e8e6ec"/><stop offset=".5" stop-color="#b5b0bb"/>
      <stop offset=".6" stop-color="#f6f5f8"/><stop offset="1" stop-color="#cbc7cf"/>
    </linearGradient>
    <linearGradient id="g-silver-d" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff"/><stop offset=".28" stop-color="#d9d5dd"/><stop offset=".48" stop-color="#f8f7fa"/>
      <stop offset=".7" stop-color="#b3aebb"/><stop offset="1" stop-color="#f1eff3"/>
    </linearGradient>
    <linearGradient id="g-feather" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#eeebf1"/>
    </linearGradient>
    <linearGradient id="g-pink" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff0f5"/><stop offset=".55" stop-color="#f6cddb"/><stop offset="1" stop-color="#ebb3c7"/>
    </linearGradient>
    <linearGradient id="g-mint" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f1fafa"/><stop offset=".55" stop-color="#c8e6e9"/><stop offset="1" stop-color="#a6d3d8"/>
    </linearGradient>
    <linearGradient id="g-iris" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fdeef3"/><stop offset=".3" stop-color="#e9f1fb"/><stop offset=".55" stop-color="#e2f4f2"/>
      <stop offset=".8" stop-color="#f2ecf8"/><stop offset="1" stop-color="#fdeef3"/>
    </linearGradient>
    <linearGradient id="g-petal" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#eda9c1"/><stop offset=".45" stop-color="#f7d2df"/><stop offset="1" stop-color="#fffafc"/>
    </linearGradient>
    <radialGradient id="g-gem" cx=".35" cy=".3" r=".75">
      <stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#eef3fa"/><stop offset="1" stop-color="#b9c1d1"/>
    </radialGradient>
    <filter id="f-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3" result="b"/>
      <feFlood flood-color="#d4f1f2"/><feComposite in2="b" operator="in" result="g"/>
      <feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="f-satin" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency=".02 .9" numOctaves="2" seed="4" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .35 -.05" result="s"/>
      <feComposite in="s" in2="SourceGraphic" operator="in" result="sheen"/>
      <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="sheen"/></feMerge>
    </filter>
    <filter id="f-brushed" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency=".004 .8" numOctaves="3" seed="9" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .5 -.12" result="s"/>
      <feComposite in="s" in2="SourceGraphic" operator="in" result="b"/>
      <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="b"/></feMerge>
    </filter>

    ${wing()}
    ${lotus()}

    <symbol id="heart" viewBox="0 0 100 94"><path d="M50 88C20 66 4 50 4 30C4 16 15 6 28 6C38 6 46 12 50 20C54 12 62 6 72 6C85 6 96 16 96 30C96 50 80 66 50 88Z"/></symbol>
    <symbol id="star" viewBox="0 0 100 100"><path d="M50 4L61 38L97 38L68 59L79 94L50 72L21 94L32 59L3 38L39 38Z"/></symbol>
    <symbol id="sparkle" viewBox="0 0 100 100"><path d="M50 0C54 36 64 46 100 50C64 54 54 64 50 100C46 64 36 54 0 50C36 46 46 36 50 0Z"/></symbol>
    <symbol id="note" viewBox="0 0 44 64"><path d="M25 4V43.5A10 7.6 -22 1 1 20.4 37.4V4Z M25 4C31 9 39 13 39 24C39 29 37 33 35 35C36 27 31 21 25 19Z"/></symbol>
    <symbol id="notes" viewBox="0 0 56 64"><path d="M17 14L48 6V44A9 7 -22 1 1 43.6 38.4V17.5L21.4 23V51A9 7 -22 1 1 17 45Z"/></symbol>
    <symbol id="clef" viewBox="0 0 64 150"><path d="M30 136C22 142 12 134 18 126C24 119 34 126 28 132M27 133L31 18C32 4 46 6 44 20C42 36 14 50 14 76C14 96 34 104 46 94C58 84 50 64 34 66C20 68 22 88 34 88" fill="none" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></symbol>
    <symbol id="tooth" viewBox="0 0 80 92"><path d="M20 8C5 8 2 28 8 44C12 57 13 80 22 82C31 84 30 60 40 60C50 60 49 84 58 82C67 80 68 57 72 44C78 28 75 8 60 8C52 8 46 14 40 14C34 14 28 8 20 8Z"/></symbol>
    <symbol id="puzzle" viewBox="0 0 100 100"><path d="M20 20H40a10 10 0 1 1 20 0H80V40a10 10 0 1 1 0 20V80H60a10 10 0 1 0 -20 0H20V60a10 10 0 1 0 0 -20Z"/></symbol>
    <symbol id="bow" viewBox="0 0 100 82">
      <g fill="url(#g-pink)" stroke="#e2a3bb" stroke-width="1.2" stroke-linejoin="round">
        <path d="M47 35L31 76L39 71L44 80L53 37Z"/><path d="M53 35L69 76L61 71L56 80L47 37Z"/>
        <path d="M50 32C40 8 8 2 6 22C4 41 30 45 50 34Z"/><path d="M50 32C60 8 92 2 94 22C96 41 70 45 50 34Z"/>
        <ellipse cx="50" cy="33" rx="8" ry="9.5"/>
      </g>
      <path d="M16 18C22 12 32 14 40 24M84 18C78 12 68 14 60 24M14 30C24 34 34 34 44 31M86 30C76 34 66 34 56 31" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".8"/>
      <path d="M38 60L42 50M62 60L58 50" stroke="#e8b2c6" stroke-width="1"/>
    </symbol>
    <symbol id="heartkey" viewBox="0 0 230 84">
      <g filter="url(#f-glow)">
        <path d="M44 72C22 56 10 45 10 30C10 19 18 12 28 12C35 12 41 16 44 22C47 16 53 12 60 12C70 12 78 19 78 30C78 45 66 56 44 72Z" fill="none" stroke="url(#g-silver)" stroke-width="9" transform="rotate(-90 44 42)"/>
        <rect x="74" y="37" width="140" height="10" rx="5" fill="url(#g-silver)"/>
        <path d="M186 47h10v18h-10zM202 47h10v12h-10z" fill="url(#g-silver)"/>
        <circle cx="96" cy="42" r="7" fill="url(#g-silver-d)"/>
      </g>
    </symbol>
    <symbol id="gem" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="8.5" fill="url(#g-gem)" stroke="#c4c9d6"/>
      <path d="M10 1.5L13 7L18.5 10L13 13L10 18.5L7 13L1.5 10L7 7Z" fill="#fff" opacity=".55"/>
      <path d="M10 4.5L11.5 8.5L15.5 10L11.5 11.5L10 15.5L8.5 11.5L4.5 10L8.5 8.5Z" fill="#fff" opacity=".9"/>
    </symbol>
  </defs>
</svg>`;
}

/* ---------- Ribbon rosette: double lace ruffle, shaded pleats, satin tails ---------- */
export function rosetteSVG({ lines = [], a = '#f6d3df', b = '#fbe6ed', center = '#fffafc', tail = a, tail2 = '#d3ecee', ink = '#5d5762', id = 'r' }) {
  const cx = 100, cy = 100;
  const scallop = (R, N, bump) => {
    let d = '';
    for (let k = 0; k <= N; k++) {
      const [x, y] = polar(cx, cy, R, (k / N) * TAU);
      d += k === 0 ? `M${r(x)} ${r(y)}` : `A${bump} ${bump} 0 0 1 ${r(x)} ${r(y)}`;
    }
    return d + 'Z';
  };
  let holes = '', threads = '', pleats = '', picots = '';
  for (let k = 0; k < 36; k++) {
    const a0 = ((k + 0.5) / 36) * TAU;
    const [hx, hy] = polar(cx, cy, 84, a0);
    holes += `<circle cx="${r(hx)}" cy="${r(hy)}" r="2.1"/>`;
    const [p1x, p1y] = polar(cx, cy, 77, a0 - 0.06), [p2x, p2y] = polar(cx, cy, 77, a0 + 0.06), [p3x, p3y] = polar(cx, cy, 72, a0);
    holes += `<path d="M${r(p1x)} ${r(p1y)}L${r(p2x)} ${r(p2y)}L${r(p3x)} ${r(p3y)}Z"/>`;
    const [t1x, t1y] = polar(cx, cy, 70, (k / 36) * TAU), [t2x, t2y] = polar(cx, cy, 90, (k / 36) * TAU);
    threads += `M${r(t1x)} ${r(t1y)}L${r(t2x)} ${r(t2y)}`;
  }
  for (let k = 0; k < 72; k++) {
    const [px, py] = polar(cx, cy, 93.5, (k / 72) * TAU);
    picots += `<circle cx="${r(px)}" cy="${r(py)}" r="1.6"/>`;
  }
  const P = 44;
  for (let k = 0; k < P; k++) {
    const a0 = (k / P) * TAU, a1 = ((k + 1) / P) * TAU, am = (a0 + a1) / 2;
    const [x0, y0] = polar(cx, cy, 46, a0), [x1, y1] = polar(cx, cy, 70, am - 0.035), [x2, y2] = polar(cx, cy, 70, am + 0.075), [x3, y3] = polar(cx, cy, 46, a1);
    const light = 0.5 + 0.5 * Math.cos(am + 2.3); // light from top left
    pleats += `<path d="M${r(x0)} ${r(y0)}L${r(x1)} ${r(y1)}L${r(x2)} ${r(y2)}L${r(x3)} ${r(y3)}Z" fill="${k % 2 ? a : b}"/>`;
    pleats += `<path d="M${r(x0)} ${r(y0)}L${r(x1)} ${r(y1)}L${r(x2)} ${r(y2)}L${r(x3)} ${r(y3)}Z" fill="${light > 0.5 ? '#fff' : '#9b7f90'}" opacity="${r(Math.abs(light - 0.5) * 0.5 * 10) / 10}"/>`;
  }
  const sizes = [17, 11.5, 11.5];
  const startY = cy + 5 - (lines.length - 1) * 8;
  const text = lines.map((l, i) => `<text x="${cx}" y="${startY + i * 15.5}" font-size="${sizes[i] || 11}" ${i === 0 ? 'font-style="italic" font-weight="600"' : 'letter-spacing="1.6" font-weight="600"'}>${l}</text>`).join('');
  const tailPath = 'M-17 0H17V152L0 138L-17 152Z';
  return `<svg viewBox="0 0 200 282" role="img" aria-label="${lines.join(' ')}">
    <defs>
      <linearGradient id="${id}-t1" x1="0" x2="1"><stop offset="0" stop-color="${tail}"/><stop offset=".45" stop-color="#fff" stop-opacity=".9"/><stop offset=".55" stop-color="${tail}"/><stop offset="1" stop-color="${tail}" stop-opacity=".85"/></linearGradient>
      <linearGradient id="${id}-t2" x1="0" x2="1"><stop offset="0" stop-color="${tail2}"/><stop offset=".4" stop-color="#fff" stop-opacity=".85"/><stop offset=".5" stop-color="${tail2}"/><stop offset="1" stop-color="${tail2}"/></linearGradient>
      <radialGradient id="${id}-c" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="${center}"/></radialGradient>
    </defs>
    <g transform="translate(100 112)">
      <path d="M-22 0H22V170L0 152L-22 170Z" fill="#fff" stroke="#e2dde5"/>
      <path d="M-22 6H22M-22 160L0 146L22 160" stroke="#e8e3ea" fill="none" stroke-dasharray="2 3"/>
      <path d="${tailPath}" fill="url(#${id}-t1)" transform="rotate(16)" filter="url(#f-satin)"/>
      <path d="${tailPath}" fill="url(#${id}-t2)" transform="rotate(-16)" filter="url(#f-satin)"/>
      <path d="M-11 0V138M11 0V138" stroke="#fff" stroke-opacity=".7" stroke-dasharray="1.2 3.5" stroke-linecap="round" stroke-width="1.6" transform="rotate(16)"/>
    </g>
    <g fill="#fff" stroke="#e2dde6" stroke-width=".8">
      <g>${picots}</g>
      <path d="${scallop(91, 36, 8.6)}"/>
    </g>
    <path d="${threads}" stroke="#ece8ee" stroke-width=".7"/>
    <g fill="#ece8ef">${holes}</g>
    <path d="${scallop(74, 28, 9.2)}" fill="#fff" stroke="#e5e0e8" stroke-width=".8"/>
    <g stroke="rgba(255,255,255,.6)" stroke-width=".5">${pleats}</g>
    <circle cx="${cx}" cy="${cy}" r="48.5" fill="url(#g-silver-d)"/>
    <circle cx="${cx}" cy="${cy}" r="48.5" fill="none" stroke="#a9a3ae" stroke-width=".6"/>
    <circle cx="${cx}" cy="${cy}" r="42.5" fill="url(#${id}-c)" stroke="#d7d2db" stroke-width=".6"/>
    <circle cx="${cx}" cy="${cy}" r="38" fill="none" stroke="${ink}" stroke-opacity=".18" stroke-dasharray="1 2.4"/>
    <g font-family="'Cormorant Garamond', Georgia, serif" fill="${ink}" text-anchor="middle">${text}</g>
    <ellipse cx="${cx - 8}" cy="${cy - 26}" rx="26" ry="10" fill="#fff" opacity=".6" transform="rotate(-12 ${cx} ${cy})"/>
  </svg>`;
}

/* ---------- Crocheted lace doily with picots, eyelets, fans and a net ring ---------- */
export function doilySVG(size = 520) {
  const c = size / 2, R = c - 4;
  let d = '', mask = '', thread = '';
  // outer edge: 48 fans each with 3 picots
  const N = 48;
  for (let k = 0; k <= N; k++) {
    const [x, y] = polar(c, c, R * 0.93, (k / N) * TAU);
    d += k === 0 ? `M${r(x)} ${r(y)}` : `A${r(R * 0.07)} ${r(R * 0.07)} 0 0 1 ${r(x)} ${r(y)}`;
  }
  d += 'Z';
  let picots = '';
  for (let k = 0; k < N * 3; k++) {
    const a = ((k + 0.5) / (N * 3)) * TAU;
    const [x, y] = polar(c, c, R * 0.985, a);
    picots += `<circle cx="${r(x)}" cy="${r(y)}" r="${r(R * 0.012)}"/>`;
  }
  // fan holes
  for (let k = 0; k < N; k++) {
    const a = ((k + 0.5) / N) * TAU;
    for (const [rr, sz, da] of [[0.9, 0.018, 0], [0.86, 0.014, -0.035], [0.86, 0.014, 0.035]]) {
      const [x, y] = polar(c, c, R * rr, a + da);
      mask += `<circle cx="${r(x)}" cy="${r(y)}" r="${r(R * sz)}"/>`;
    }
    const [l1x, l1y] = polar(c, c, R * 0.8, a), [l2x, l2y] = polar(c, c, R * 0.93, a - 0.06), [l3x, l3y] = polar(c, c, R * 0.93, a + 0.06);
    thread += `M${r(l1x)} ${r(l1y)}L${r(l2x)} ${r(l2y)}M${r(l1x)} ${r(l1y)}L${r(l3x)} ${r(l3y)}`;
  }
  // net ring: diamond mesh between 0.62 and 0.8
  const M = 64;
  for (let ring = 0; ring < 3; ring++) {
    const r0 = 0.62 + ring * 0.06, r1 = r0 + 0.06;
    for (let k = 0; k < M; k++) {
      const a0 = ((k + (ring % 2) * 0.5) / M) * TAU, a1 = ((k + 0.5 + (ring % 2) * 0.5) / M) * TAU, a2 = ((k + 1 + (ring % 2) * 0.5) / M) * TAU;
      const [x0, y0] = polar(c, c, R * r0, a0), [x1, y1] = polar(c, c, R * r1, a1), [x2, y2] = polar(c, c, R * r0, a2), [xm, ym] = polar(c, c, R * (r0 + 0.03), a1);
      mask += `<path d="M${r(x0)} ${r(y0)}L${r(xm)} ${r(ym)}L${r(x2)} ${r(y2)}Z" transform="scale(1)"/>`;
      mask += `<path d="M${r(xm)} ${r(ym)}L${r(x1)} ${r(y1)}L${r((x0 + x2) / 2)} ${r((y0 + y2) / 2)}Z" opacity="0"/>`;
      thread += `M${r(x0)} ${r(y0)}L${r(x1)} ${r(y1)}L${r(x2)} ${r(y2)}`;
    }
  }
  // petal ring: 24 petals with slit
  const P = 24;
  for (let k = 0; k < P; k++) {
    const a = (k / P) * TAU;
    const [x0, y0] = polar(c, c, R * 0.36, a), [x1, y1] = polar(c, c, R * 0.58, a);
    const [cx1, cy1] = polar(c, c, R * 0.47, a - 0.13), [cx2, cy2] = polar(c, c, R * 0.47, a + 0.13);
    mask += `<path d="M${r(x0)} ${r(y0)}Q${r(cx1)} ${r(cy1)} ${r(x1)} ${r(y1)}Q${r(cx2)} ${r(cy2)} ${r(x0)} ${r(y0)}Z" transform="translate(0 0)"/>`;
    const [e1x, e1y] = polar(c, c, R * 0.6, a + Math.PI / P);
    mask += `<circle cx="${r(e1x)}" cy="${r(e1y)}" r="${r(R * 0.016)}"/>`;
  }
  // eyelet ring and center flower
  for (let k = 0; k < 16; k++) {
    const [x, y] = polar(c, c, R * 0.3, (k / 16) * TAU);
    mask += `<circle cx="${r(x)}" cy="${r(y)}" r="${r(R * 0.022)}"/>`;
  }
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * TAU;
    const [x1, y1] = polar(c, c, R * 0.2, a), [ca, cb] = polar(c, c, R * 0.12, a - 0.4), [cc, cd] = polar(c, c, R * 0.12, a + 0.4);
    mask += `<path d="M${c} ${c}Q${r(ca)} ${r(cb)} ${r(x1)} ${r(y1)}Q${r(cc)} ${r(cd)} ${c} ${c}Z"/>`;
  }
  mask += `<circle cx="${c}" cy="${c}" r="${r(R * 0.035)}"/>`;
  const rings = [0.24, 0.33, 0.35, 0.6, 0.62, 0.8, 0.82].map((k) => `<circle cx="${c}" cy="${c}" r="${r(R * k)}"/>`).join('');
  return `<svg viewBox="0 0 ${size} ${size}" aria-hidden="true">
    <defs><mask id="doily-m"><rect width="${size}" height="${size}" fill="#fff"/><g fill="#000">${mask}</g></mask></defs>
    <g mask="url(#doily-m)">
      <g fill="#fffdfd">${picots}<path d="${d}"/></g>
    </g>
    <g fill="none" stroke="#e7e1e7" stroke-width="${r(size / 520)}"><path d="${thread}"/>${rings}</g>
  </svg>`;
}
