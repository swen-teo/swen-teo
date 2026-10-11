/* Procedural textures rendered once to canvas and exposed as CSS custom properties.
   Keeps the app asset-free while giving surfaces real grain: whitewashed wood, linen,
   cotton paper, brushed aluminium, satin and fine film grain. */

function mulberry(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Tileable value noise on a lattice of size `period`.
function makeNoise(seed, period = 256) {
  const rand = mulberry(seed);
  const g = new Float32Array(period * period).map(() => rand());
  const fade = (t) => t * t * (3 - 2 * t);
  return (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y), xf = fade(x - xi), yf = fade(y - yi);
    const x0 = ((xi % period) + period) % period, y0 = ((yi % period) + period) % period;
    const x1 = (x0 + 1) % period, y1 = (y0 + 1) % period;
    const a = g[y0 * period + x0], b = g[y0 * period + x1], c = g[y1 * period + x0], d = g[y1 * period + x1];
    return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
  };
}
const fbm = (n, x, y, oct = 4) => {
  let v = 0, amp = 0.5, f = 1;
  for (let i = 0; i < oct; i++) { v += amp * n(x * f, y * f); amp *= 0.5; f *= 2; }
  return v;
};

function paint(w, h, fn) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(w, h);
  const d = img.data;
  for (let y = 0, p = 0; y < h; y++) {
    for (let x = 0; x < w; x++, p += 4) {
      const [r, g, b, a = 255] = fn(x, y);
      d[p] = r; d[p + 1] = g; d[p + 2] = b; d[p + 3] = a;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
}
const mix = (a, b, t) => a + (b - a) * t;

// Whitewashed oak planks, running left to right, with a faint blush wash.
function wood() {
  const n = makeNoise(7, 256), m = makeNoise(19, 256);
  const W = 1024, H = 512, plank = 128;
  return paint(W, H, (x, y) => {
    const row = Math.floor(y / plank), yy = y % plank;
    const off = row * 311;
    const warp = fbm(n, (x + off) / 220, y / 40, 4) * 26;
    const ring = Math.sin((yy + warp) * 0.42 + row * 2.1);
    const fine = fbm(m, (x + off) / 6, y / 1.4, 3);
    const knot = Math.max(0, 1 - Math.hypot(((x + off * 3) % 640) - 320, (yy - 64) * 3) / 46);
    let t = 0.5 + ring * 0.22 + (fine - 0.5) * 0.5 + knot * 0.5;
    t = Math.min(1, Math.max(0, t));
    let r = mix(250, 224, t), g = mix(245, 214, t), b = mix(243, 214, t);
    const wash = fbm(n, x / 300, y / 300, 2);
    r += (wash - 0.5) * 10; b += (0.5 - wash) * 6;
    if (yy < 2 || yy > plank - 2) { r -= 34; g -= 36; b -= 32; }
    else if (yy < 4) { r += 6; g += 6; b += 6; }
    return [r, g, b];
  });
}

// Woven linen: interleaved warp and weft threads with slub irregularity.
function linen() {
  const n = makeNoise(3, 256);
  return paint(256, 256, (x, y) => {
    const warp = Math.sin(x * 1.6) * 0.5 + 0.5, weft = Math.sin(y * 1.6) * 0.5 + 0.5;
    const over = ((Math.floor(x / 2) + Math.floor(y / 2)) & 1) ? warp : weft;
    const slub = n(x / 2, y / 40) * 0.6 + n(x / 40, y / 2) * 0.6;
    const v = 0.55 + over * 0.25 + (slub - 0.6) * 0.35;
    return [mix(236, 255, v), mix(232, 252, v), mix(236, 253, v)];
  });
}

// Cotton paper with soft fibres; transparent so it can sit over any colour.
function paper() {
  const n = makeNoise(11, 256), f = makeNoise(29, 256);
  return paint(256, 256, (x, y) => {
    const v = fbm(n, x / 3, y / 3, 3);
    const fibre = Math.abs(f(x / 18, y / 2) - 0.5) < 0.012 || Math.abs(f(x / 2, y / 22) - 0.5) < 0.01 ? 1 : 0;
    const a = Math.max(0, (v - 0.45) * 90) + fibre * 22;
    return [120, 110, 120, a];
  });
}

// Brushed aluminium streaks, light grey with a cool tint.
function brushed() {
  const n = makeNoise(5, 256);
  return paint(512, 256, (x, y) => {
    const v = fbm(n, x / 90, y / 0.9, 4);
    const t = 0.5 + (v - 0.5) * 1.2;
    return [mix(214, 250, t), mix(216, 251, t), mix(222, 254, t)];
  });
}

// Fine monochrome film grain (transparent).
function grain() {
  const rand = mulberry(42);
  return paint(160, 160, () => {
    const v = rand();
    return v > 0.5 ? [255, 255, 255, (v - 0.5) * 50] : [60, 50, 60, (0.5 - v) * 50];
  });
}

// Grosgrain ribbon ribs (transparent overlay).
function grosgrain() {
  const n = makeNoise(13, 64);
  return paint(64, 64, (x, y) => {
    const rib = Math.sin(y * 1.9) * 0.5 + 0.5;
    const a = rib * 34 + n(x / 3, y) * 10;
    return [255, 255, 255, a];
  });
}

let done = false;
export function installTextures() {
  if (done) return;
  done = true;
  const root = document.documentElement.style;
  const url = (c) => `url(${c.toDataURL('image/png')})`;
  root.setProperty('--tx-wood', url(wood()));
  root.setProperty('--tx-linen', url(linen()));
  root.setProperty('--tx-paper', url(paper()));
  root.setProperty('--tx-brushed', url(brushed()));
  root.setProperty('--tx-grain', url(grain()));
  root.setProperty('--tx-grosgrain', url(grosgrain()));
}
