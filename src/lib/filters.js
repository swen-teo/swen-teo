/* The original 2010 Instagram filter set, re-tuned to a pastel pink / mint palette.
 Each filter is per-channel tone curves + saturation + tint + radial glow + vignette,
 applied pixel by pixel to canvas ImageData. */
export const FILTERS = [
  { id: 'normal', name: 'Normal' },
  {
    id: 'xpro2', name: 'X-Pro II', contrast: 1.15, sat: 1.12,
    r: [[0, 22], [90, 80], [190, 215], [255, 255]], g: [[0, 26], [128, 128], [255, 248]], b: [[0, 72], [128, 136], [255, 226]],
    tint: { c: [248, 190, 215], mode: 'soft', a: 0.28 }, vig: { a: 0.55, inner: 0.42, c: [196, 176, 214] },
  },
  {
    id: 'lofi', name: 'Lo-fi', contrast: 1.28, sat: 1.32,
    all: [[0, 12], [64, 52], [192, 214], [255, 255]],
    tint: { c: [250, 200, 220], mode: 'soft', a: 0.18 }, vig: { a: 0.5, inner: 0.38, c: [150, 138, 170] },
  },
  {
    id: 'earlybird', name: 'Earlybird', fade: 26, sat: 0.72,
    r: [[0, 40], [128, 150], [255, 250]], g: [[0, 30], [128, 128], [255, 236]], b: [[0, 42], [128, 116], [255, 218]],
    tint: { c: [255, 222, 228], mode: 'multiply', a: 0.3 }, vig: { a: 0.45, inner: 0.48, c: [232, 192, 204] },
  },
  {
    id: 'sutro', name: 'Sutro', sat: 0.6, contrast: 1.1,
    r: [[0, 20], [128, 130], [255, 236]], g: [[0, 10], [128, 115], [255, 226]], b: [[0, 32], [128, 136], [255, 242]],
    tint: { c: [206, 186, 232], mode: 'soft', a: 0.32 }, vig: { a: 0.62, inner: 0.32, c: [124, 108, 146] },
  },
  {
    id: 'toaster', name: 'Toaster', contrast: 1.1,
    r: [[0, 40], [128, 150], [255, 255]], g: [[0, 22], [128, 122], [255, 236]], b: [[0, 30], [128, 118], [255, 228]],
    glow: { c: [255, 206, 218], a: 0.45 }, vig: { a: 0.58, inner: 0.3, c: [206, 126, 156] },
  },
  {
    id: 'brannan', name: 'Brannan', sat: 0.55, contrast: 1.34,
    r: [[0, 30], [128, 134], [255, 240]], g: [[0, 30], [128, 130], [255, 246]], b: [[0, 36], [128, 126], [255, 236]],
    tint: { c: [206, 236, 236], mode: 'soft', a: 0.32 }, vig: { a: 0.3, inner: 0.5, c: [140, 150, 162] },
  },
  { id: 'inkwell', name: 'Inkwell', mono: true, contrast: 1.15, fade: 18, tint: { c: [236, 240, 250], mode: 'multiply', a: 0.25 } },
  {
    id: 'walden', name: 'Walden', fade: 36, sat: 0.85, bright: 10,
    g: [[0, 10], [128, 136], [255, 255]], b: [[0, 70], [128, 146], [255, 240]],
    tint: { c: [196, 240, 240], mode: 'screen', a: 0.2 }, vig: { a: 0.25, inner: 0.55, c: [210, 230, 236] },
  },
  {
    id: 'hefe', name: 'Hefe', contrast: 1.24, sat: 1.28,
    tint: { c: [255, 200, 216], mode: 'soft', a: 0.22 }, vig: { a: 0.5, inner: 0.4, c: [124, 92, 112] },
  },
  {
    id: 'apollo', name: 'Apollo', fade: 32, sat: 0.8,
    r: [[0, 36], [128, 124], [255, 240]], g: [[0, 50], [128, 142], [255, 250]], b: [[0, 56], [128, 140], [255, 246]],
    tint: { c: [196, 238, 236], mode: 'screen', a: 0.16 }, vig: { a: 0.2, inner: 0.55, c: [180, 210, 214] },
  },
  {
    id: 'poprocket', name: 'Poprocket', sat: 1.1, contrast: 1.05, fade: 14,
    glow: { c: [255, 172, 206], a: 0.5 }, vig: { a: 0.42, inner: 0.45, c: [90, 66, 90] },
  },
  {
    id: 'nashville', name: 'Nashville', contrast: 1.1, sat: 1.1,
    r: [[0, 40], [128, 150], [255, 255]], g: [[0, 34], [128, 134], [255, 240]], b: [[0, 82], [128, 142], [255, 216]],
    tint: { c: [255, 214, 226], mode: 'multiply', a: 0.28 },
  },
  {
    id: 'gotham', name: 'Gotham', mono: true, contrast: 1.45,
    tint: { c: [204, 224, 246], mode: 'multiply', a: 0.38 }, vig: { a: 0.35, inner: 0.45, c: [62, 72, 92] },
  },
  {
    id: '1977', name: '1977', fade: 30, sat: 0.85,
    r: [[0, 60], [128, 166], [255, 255]], g: [[0, 30], [128, 126], [255, 236]], b: [[0, 50], [128, 132], [255, 236]],
    tint: { c: [250, 190, 206], mode: 'screen', a: 0.2 },
  },
  {
    id: 'kelvin', name: 'Lord Kelvin', sat: 1.22,
    r: [[0, 40], [128, 188], [255, 255]], g: [[0, 26], [128, 140], [255, 240]], b: [[0, 30], [128, 122], [255, 218]],
    glow: { c: [255, 190, 210], a: 0.25 }, vig: { a: 0.35, inner: 0.4, c: [180, 110, 130] },
  },
];

function curve(points) {
  const lut = new Float32Array(256);
  if (!points) { for (let i = 0; i < 256; i++) lut[i] = i; return lut; }
  for (let i = 0; i < 256; i++) {
    let k = 0;
    while (k < points.length - 2 && i > points[k + 1][0]) k++;
    const [x0, y0] = points[k], [x1, y1] = points[k + 1];
    const t = Math.min(1, Math.max(0, (i - x0) / (x1 - x0)));
    const s = t * t * (3 - 2 * t); // smooth between control points
    lut[i] = y0 + (y1 - y0) * (0.5 * t + 0.5 * s);
  }
  return lut;
}

// Compile a definition into three 0-255 lookup tables plus per-pixel params.
function compile(f) {
  if (f._c) return f._c;
  const master = curve(f.all);
  const contrast = f.contrast || 1, bright = f.bright || 0, fade = f.fade || 0;
  const tables = ['r', 'g', 'b'].map((ch) => {
    const c = curve(f[ch]);
    const out = new Uint8ClampedArray(256);
    for (let i = 0; i < 256; i++) {
      let v = c[Math.round(master[i])];
      v = (v - 128) * contrast + 128 + bright;
      v = fade + v * (1 - fade / 255);
      out[i] = v;
    }
    return out;
  });
  f._c = { R: tables[0], G: tables[1], B: tables[2] };
  return f._c;
}

const maps = new Map();
function radialMaps(w, h, f) {
  const key = `${w}x${h}|${f.id}`;
  if (maps.has(key)) return maps.get(key);
  const n = w * h, vig = f.vig ? new Float32Array(n) : null, glow = f.glow ? new Float32Array(n) : null;
  const cx = w / 2, cy = h / 2;
  for (let y = 0, i = 0; y < h; y++) {
    for (let x = 0; x < w; x++, i++) {
      const dx = (x - cx) / cx, dy = (y - cy) / cy;
      const d = Math.sqrt(dx * dx + dy * dy) / Math.SQRT2;
      if (vig) {
        const t = Math.min(1, Math.max(0, (d - f.vig.inner) / (1 - f.vig.inner)));
        vig[i] = t * t * (3 - 2 * t) * f.vig.a;
      }
      if (glow) glow[i] = Math.max(0, 1 - d * 1.5) ** 2 * f.glow.a;
    }
  }
  const m = { vig, glow };
  maps.set(key, m);
  if (maps.size > 40) maps.delete(maps.keys().next().value);
  return m;
}

export function applyFilter(imageData, f) {
  if (!f || f.id === 'normal') return imageData;
  const { data, width: w, height: h } = imageData;
  const { R, G, B } = compile(f);
  const { vig, glow } = radialMaps(w, h, f);
  const sat = f.sat ?? 1, mono = !!f.mono;
  const tint = f.tint, ta = tint ? tint.a : 0;
  const tc = tint ? tint.c.map((v) => v / 255) : null;
  const mode = tint ? tint.mode : '';
  const gc = f.glow ? f.glow.c : null, vc = f.vig ? f.vig.c : null;

  for (let p = 0, i = 0; p < data.length; p += 4, i++) {
    let r = R[data[p]], g = G[data[p + 1]], b = B[data[p + 2]];
    const l = 0.299 * r + 0.587 * g + 0.114 * b;
    if (mono) { r = g = b = l; }
    else if (sat !== 1) { r = l + (r - l) * sat; g = l + (g - l) * sat; b = l + (b - l) * sat; }

    if (tint) {
      let a = r / 255, bb = g / 255, c = b / 255, x, y, z;
      if (mode === 'screen') { x = 1 - (1 - a) * (1 - tc[0]); y = 1 - (1 - bb) * (1 - tc[1]); z = 1 - (1 - c) * (1 - tc[2]); }
      else if (mode === 'multiply') { x = a * tc[0]; y = bb * tc[1]; z = c * tc[2]; }
      else { x = (1 - 2 * tc[0]) * a * a + 2 * tc[0] * a; y = (1 - 2 * tc[1]) * bb * bb + 2 * tc[1] * bb; z = (1 - 2 * tc[2]) * c * c + 2 * tc[2] * c; }
      r += (x * 255 - r) * ta; g += (y * 255 - g) * ta; b += (z * 255 - b) * ta;
    }
    if (glow) {
      const k = glow[i];
      r += (255 - r) * (gc[0] / 255) * k; g += (255 - g) * (gc[1] / 255) * k; b += (255 - b) * (gc[2] / 255) * k;
    }
    if (vig) {
      const k = vig[i];
      r += (vc[0] - r) * k; g += (vc[1] - g) * k; b += (vc[2] - b) * k;
    }
    data[p] = r; data[p + 1] = g; data[p + 2] = b;
  }
  return imageData;
}

