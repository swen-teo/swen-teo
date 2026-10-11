/* Photo Booth engine: drawing sources, filtering frames and composing prints
   (lace / aero / polaroid frames, digicam date stamp, charm stickers). */
import { applyFilter } from './filters.js';

export const PATHS = {
  heart: 'M50 88C20 66 4 50 4 30C4 16 15 6 28 6C38 6 46 12 50 20C54 12 62 6 72 6C85 6 96 16 96 30C96 50 80 66 50 88Z',
  star: 'M50 4L61 38L97 38L68 59L79 94L50 72L21 94L32 59L3 38L39 38Z',
  sparkle: 'M50 0C54 36 64 46 100 50C64 54 54 64 50 100C46 64 36 54 0 50C36 46 46 36 50 0Z',
  note: 'M25 4V43.5A10 7.6 -22 1 1 20.4 37.4V4Z M25 4C31 9 39 13 39 24C39 29 37 33 35 35C36 27 31 21 25 19Z',
  bowL: 'M50 32C40 8 8 2 6 22C4 41 30 45 50 34Z', bowR: 'M50 32C60 8 92 2 94 22C96 41 70 45 50 34Z',
  tailL: 'M47 35L31 76L39 71L44 80L53 37Z', tailR: 'M53 35L69 76L61 71L56 80L47 37Z',
};

export function sourceSize(src) {
  if (src instanceof HTMLVideoElement) return [src.videoWidth || 640, src.videoHeight || 480];
  if (src instanceof HTMLImageElement) return [src.naturalWidth, src.naturalHeight];
  return [src.width, src.height];
}

// Cover-crop the source into w×h, optionally mirrored.
export function drawSource(ctx, src, w, h, mirror) {
  const [sw, sh] = sourceSize(src);
  const s = Math.max(w / sw, h / sh), dw = sw * s, dh = sh * s;
  ctx.save();
  if (mirror) { ctx.translate(w, 0); ctx.scale(-1, 1); }
  ctx.drawImage(src, (w - dw) / 2, (h - dh) / 2, dw, dh);
  ctx.restore();
}

export function filteredFrame(src, w, h, filter, mirror) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  drawSource(ctx, src, w, h, mirror);
  ctx.putImageData(applyFilter(ctx.getImageData(0, 0, w, h), filter), 0, 0);
  return c;
}

// A pastel still life used for effect previews before a camera or photo is chosen.
export function sampleScene() {
  const c = document.createElement('canvas');
  c.width = 320; c.height = 240;
  const x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, 0, 240);
  g.addColorStop(0, '#cbe8ec'); g.addColorStop(0.55, '#f6e1e9'); g.addColorStop(1, '#eab9cb');
  x.fillStyle = g; x.fillRect(0, 0, 320, 240);
  x.fillStyle = 'rgba(255,255,255,.9)'; x.beginPath(); x.arc(240, 64, 30, 0, Math.PI * 2); x.fill();
  x.fillStyle = '#9fd3d9'; x.beginPath(); x.ellipse(160, 218, 150, 26, 0, 0, Math.PI * 2); x.fill();
  x.save(); x.translate(108, 92); x.fillStyle = '#ee9fbd'; x.fill(new Path2D(PATHS.heart)); x.restore();
  x.save(); x.translate(40, 40); x.scale(0.4, 0.4); x.fillStyle = '#fff'; x.fill(new Path2D(PATHS.sparkle)); x.restore();
  return c;
}

/* ---------- Print composition ---------- */
export function compose(shots, { frame, date, charms }) {
  const strip = shots.length > 1;
  const pw = shots[0].width, ph = shots[0].height;
  const pad = frame === 'none' ? 0 : strip ? 34 : 46;
  const gap = strip ? 18 : 0;
  const foot = frame === 'none' ? 0 : frame === 'polaroid' ? (strip ? 150 : 190) : strip ? 140 : 120;
  const W = pw + pad * 2;
  const H = pad + shots.length * ph + (shots.length - 1) * gap + (foot || pad);
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');

  frameBack(ctx, W, H, frame);
  const radius = frame === 'aero' ? 18 : frame === 'lace' ? 6 : 0;
  shots.forEach((s, i) => {
    const x = pad, y = pad + i * (ph + gap);
    ctx.save();
    if (radius) { ctx.beginPath(); ctx.roundRect(x, y, pw, ph, radius); ctx.clip(); }
    ctx.drawImage(s, x, y);
    if (frame === 'aero') {
      const g = ctx.createLinearGradient(0, y, 0, y + ph * 0.5);
      g.addColorStop(0, 'rgba(255,255,255,.35)'); g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g; ctx.fillRect(x, y, pw, ph * 0.5);
    }
    ctx.restore();
    if (frame === 'aero') { ctx.strokeStyle = 'rgba(255,255,255,.95)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(x, y, pw, ph, radius); ctx.stroke(); }
    if (frame === 'polaroid') { ctx.strokeStyle = 'rgba(0,0,0,.06)'; ctx.lineWidth = 1; ctx.strokeRect(x + 0.5, y + 0.5, pw - 1, ph - 1); }
    if (date) dateStamp(ctx, x + pw - 18, y + ph - 18, strip ? 24 : 32);
  });
  if (foot) caption(ctx, W, H, foot, frame, strip);
  if (charms) addCharms(ctx, W, H, pad, strip);
  return c;
}

function frameBack(ctx, W, H, frame) {
  if (frame === 'none') return;
  if (frame === 'polaroid') {
    ctx.fillStyle = '#fffdfb'; ctx.fillRect(0, 0, W, H);
    // faint paper tooth
    for (let i = 0; i < W * H / 60; i++) { ctx.fillStyle = `rgba(120,100,110,${Math.random() * 0.05})`; ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1); }
    return;
  }
  if (frame === 'aero') {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#e1f2f4'); g.addColorStop(0.5, '#fafcfc'); g.addColorStop(1, '#f9e6ed');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(150,200,208,.28)'; ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 24) { ctx.beginPath(); ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, H); ctx.stroke(); }
    for (let y = 0; y < H; y += 24) { ctx.beginPath(); ctx.moveTo(0, y + 0.5); ctx.lineTo(W, y + 0.5); ctx.stroke(); }
    const s = ctx.createLinearGradient(0, 0, W, H);
    s.addColorStop(0.3, 'rgba(255,255,255,0)'); s.addColorStop(0.42, 'rgba(255,255,255,.6)'); s.addColorStop(0.5, 'rgba(255,255,255,0)');
    ctx.fillStyle = s; ctx.fillRect(0, 0, W, H);
    return;
  }
  // lace: blush card, white scalloped border with eyelets and a stitched line
  ctx.fillStyle = '#f9e5ec'; ctx.fillRect(0, 0, W, H);
  const r = 11, step = 20, inset = 14;
  ctx.fillStyle = '#fffdfd';
  ctx.fillRect(inset, inset, W - inset * 2, H - inset * 2);
  const along = (x0, y0, x1, y1, fn) => {
    const n = Math.round(Math.hypot(x1 - x0, y1 - y0) / step);
    for (let k = 0; k <= n; k++) fn(x0 + ((x1 - x0) * k) / n, y0 + ((y1 - y0) * k) / n);
  };
  const edges = (o, fn) => { along(o, o, W - o, o, fn); along(o, H - o, W - o, H - o, fn); along(o, o, o, H - o, fn); along(W - o, o, W - o, H - o, fn); };
  edges(inset, (x, y) => { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); });
  ctx.fillStyle = '#f3cfdc';
  edges(inset + 8, (x, y) => { ctx.beginPath(); ctx.arc(x, y, 2.6, 0, Math.PI * 2); ctx.fill(); });
  ctx.setLineDash([2, 6]); ctx.lineCap = 'round'; ctx.strokeStyle = '#efb9cc'; ctx.lineWidth = 2;
  ctx.strokeRect(inset + 18, inset + 18, W - (inset + 18) * 2, H - (inset + 18) * 2);
  ctx.setLineDash([]);
}

function dateStamp(ctx, x, y, size) {
  const d = new Date();
  const text = `'${String(d.getFullYear()).slice(2)} ${String(d.getMonth() + 1).padStart(2, '0')} ${String(d.getDate()).padStart(2, '0')}`;
  ctx.save();
  ctx.font = `${size}px "Silkscreen", monospace`;
  ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
  ctx.shadowColor = 'rgba(255,130,175,.9)'; ctx.shadowBlur = 8;
  ctx.fillStyle = '#ffbcd3'; ctx.fillText(text, x, y);
  ctx.shadowBlur = 0; ctx.globalAlpha = 0.6; ctx.fillStyle = '#fff3f7'; ctx.fillText(text, x, y);
  ctx.restore();
}

function caption(ctx, W, H, foot, frame, strip) {
  const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const cy = H - foot / 2;
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = frame === 'aero' ? '#4f7f87' : '#5d5762';
  ctx.font = `${strip ? 64 : 74}px "Mrs Saint Delafield", cursive`;
  ctx.fillText('Photo Booth', W / 2, cy + (strip ? 6 : 8));
  ctx.font = `${strip ? 15 : 16}px "Silkscreen", monospace`;
  ctx.fillStyle = frame === 'aero' ? '#5f9aa3' : '#b77494';
  ctx.fillText(`${date.toUpperCase()} · SWEN TEO PORTFOLIO`, W / 2, cy + (strip ? 38 : 44));
  ctx.restore();
}

function shape(ctx, path, x, y, size, rot, fill, stroke) {
  ctx.save();
  ctx.translate(x, y); ctx.rotate(rot); ctx.scale(size / 100, size / 100); ctx.translate(-50, -50);
  const p = new Path2D(path);
  ctx.fillStyle = fill; ctx.fill(p);
  if (stroke) { ctx.lineWidth = 200 / size; ctx.strokeStyle = stroke; ctx.stroke(p); }
  ctx.restore();
}
function silver(ctx, y0, y1) {
  const g = ctx.createLinearGradient(0, y0, 0, y1);
  [[0, '#fff'], [0.4, '#e8e6ec'], [0.52, '#b2adb9'], [0.64, '#f6f5f8'], [1, '#c9c5cd']].forEach(([o, c]) => g.addColorStop(o, c));
  return g;
}
function bow(ctx, x, y, size) {
  ctx.save();
  ctx.translate(x - size / 2, y - size * 0.4); ctx.scale(size / 100, size / 100);
  const g = ctx.createLinearGradient(0, 0, 0, 80);
  g.addColorStop(0, '#fff0f5'); g.addColorStop(0.55, '#f6cddb'); g.addColorStop(1, '#ebb3c7');
  ctx.fillStyle = g; ctx.strokeStyle = '#e2a3bb'; ctx.lineWidth = 1.6;
  ['tailL', 'tailR', 'bowL', 'bowR'].forEach((k) => { const p = new Path2D(PATHS[k]); ctx.fill(p); ctx.stroke(p); });
  ctx.beginPath(); ctx.ellipse(50, 33, 8, 9.5, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.restore();
}
function addCharms(ctx, W, H, pad, strip) {
  const u = Math.max(W, 600) / 600;
  ctx.save();
  ctx.shadowColor = 'rgba(120,100,130,.35)'; ctx.shadowBlur = 8 * u; ctx.shadowOffsetY = 3 * u;
  bow(ctx, W / 2, pad * 0.55 + 8 * u, 86 * u);
  shape(ctx, PATHS.heart, pad + 30 * u, pad + 34 * u, 54 * u, -0.3, '#f6d0dd', '#fff');
  shape(ctx, PATHS.star, W - pad - 34 * u, pad + 36 * u, 50 * u, 0.25, '#cfe9ec', '#fff');
  const ny = strip ? H - 170 * u : H - 150 * u;
  ctx.save();
  ctx.translate(pad + 26 * u, ny); ctx.rotate(-0.2); ctx.scale(u * 1.3, u * 1.3);
  const np = new Path2D(PATHS.note);
  ctx.fillStyle = silver(ctx, 0, 64); ctx.fill(np); ctx.lineWidth = 1; ctx.strokeStyle = '#a19ba8'; ctx.stroke(np);
  ctx.restore();
  ctx.shadowColor = 'rgba(170,230,236,.95)'; ctx.shadowBlur = 12 * u; ctx.shadowOffsetY = 0;
  shape(ctx, PATHS.sparkle, W - pad - 30 * u, ny - 60 * u, 40 * u, 0, '#ffffff');
  shape(ctx, PATHS.sparkle, W - pad - 64 * u, ny - 88 * u, 22 * u, 0, '#ffffff');
  ctx.restore();
}
