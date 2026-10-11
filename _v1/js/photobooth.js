/* Photobooth: live filtered preview, countdown capture, single or 4-photo strip,
   lace / aero / polaroid frames, date stamp and charms. Everything stays in the browser. */
(function () {
  const { list: FILTERS, apply } = window.BoothFilters;
  const $ = (id) => document.getElementById(id);
  const PATHS = {
    heart: 'M50 88C20 66 4 50 4 30C4 16 15 6 28 6C38 6 46 12 50 20C54 12 62 6 72 6C85 6 96 16 96 30C96 50 80 66 50 88Z',
    star: 'M50 4L61 38L97 38L68 59L79 94L50 72L21 94L32 59L3 38L39 38Z',
    sparkle: 'M50 0C54 36 64 46 100 50C64 54 54 64 50 100C46 64 36 54 0 50C36 46 46 36 50 0Z',
    note: 'M25 4V43.5A10 7.6 -22 1 1 20.4 37.4V4Z M25 4C31 9 39 13 39 24C39 29 37 33 35 35C36 27 31 21 25 19Z',
    bowL: 'M50 32C40 8 8 2 6 22C4 41 30 45 50 34Z', bowR: 'M50 32C60 8 92 2 94 22C96 41 70 45 50 34Z',
    tailL: 'M47 35L31 76L39 71L44 80L53 37Z', tailR: 'M53 35L69 76L61 71L56 80L47 37Z',
  };
  const view = $('booth-view'), vctx = view.getContext('2d', { willReadFrequently: true });
  const startPanel = $('booth-start'), msg = $('booth-msg');
  const shootBtn = $('booth-shoot'), mirrorBtn = $('booth-mirror');
  const countEl = $('booth-count'), flashEl = $('booth-flash');
  const tray = $('booth-tray'), resultImg = $('booth-result'), dl = $('booth-download');
  const led = document.querySelector('.camera__led');

  const state = { source: null, video: null, stream: null, mirror: true, filter: FILTERS[1], busy: false, visible: false };
  const opt = () => ({
    layout: document.querySelector('input[name=layout]:checked').value,
    frame: document.querySelector('input[name=frame]:checked').value,
    date: $('opt-date').checked,
    charms: $('opt-charms').checked,
  });

  /* ---------- Drawing a source frame (cover-crop, optional mirror) ---------- */
  function sourceSize() {
    const s = state.source;
    if (!s) return [640, 480];
    return s instanceof HTMLVideoElement ? [s.videoWidth || 640, s.videoHeight || 480] : [s.naturalWidth, s.naturalHeight];
  }
  function drawSource(ctx, w, h, src = state.source) {
    const [sw, sh] = src === sample ? [sample.width, sample.height] : sourceSize();
    const scale = Math.max(w / sw, h / sh);
    const dw = sw * scale, dh = sh * scale;
    ctx.save();
    if (state.mirror && src !== sample) { ctx.translate(w, 0); ctx.scale(-1, 1); }
    ctx.drawImage(src, (w - dw) / 2, (h - dh) / 2, dw, dh);
    ctx.restore();
  }
  function filteredFrame(w, h, filter = state.filter, src) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    drawSource(ctx, w, h, src);
    ctx.putImageData(apply(ctx.getImageData(0, 0, w, h), filter), 0, 0);
    return c;
  }

  /* ---------- Sample scene used for thumbnails before the camera starts ---------- */
  const sample = document.createElement('canvas');
  sample.width = 160; sample.height = 120;
  (function paintSample() {
    const c = sample.getContext('2d');
    const g = c.createLinearGradient(0, 0, 0, 120);
    g.addColorStop(0, '#bfe6ec'); g.addColorStop(0.55, '#f6dbe6'); g.addColorStop(1, '#e9a8c2');
    c.fillStyle = g; c.fillRect(0, 0, 160, 120);
    c.fillStyle = '#fff'; c.beginPath(); c.arc(118, 34, 16, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#8fd0d6'; c.beginPath(); c.ellipse(80, 108, 70, 14, 0, 0, Math.PI * 2); c.fill();
    c.save(); c.translate(52, 50); c.scale(0.5, 0.5); c.fillStyle = '#f08db4'; c.fill(new Path2D(PATHS.heart)); c.restore();
  })();

  /* ---------- Filter picker with live thumbnails ---------- */
  const filtersEl = $('booth-filters');
  const thumbs = FILTERS.map((f) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'radio');
    b.setAttribute('aria-checked', f === state.filter);
    b.innerHTML = `<canvas width="96" height="72"></canvas>${f.name}`;
    b.addEventListener('click', () => selectFilter(f));
    filtersEl.appendChild(b);
    return { f, b, ctx: b.querySelector('canvas').getContext('2d') };
  });
  function selectFilter(f) {
    state.filter = f;
    thumbs.forEach((t) => t.b.setAttribute('aria-checked', t.f === f));
    $('hud-filter').textContent = f.name;
    if (!state.source) renderIdle();
  }
  filtersEl.addEventListener('keydown', (e) => {
    const i = FILTERS.indexOf(state.filter);
    const step = { ArrowRight: 1, ArrowDown: 4, ArrowLeft: -1, ArrowUp: -4 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = FILTERS[(i + step + FILTERS.length) % FILTERS.length];
    selectFilter(next);
    thumbs[FILTERS.indexOf(next)].b.focus();
  });
  function renderThumbs() {
    const base = document.createElement('canvas');
    base.width = 96; base.height = 72;
    const bctx = base.getContext('2d', { willReadFrequently: true });
    drawSource(bctx, 96, 72, state.source || sample);
    const raw = bctx.getImageData(0, 0, 96, 72);
    thumbs.forEach((t) => {
      const copy = new ImageData(new Uint8ClampedArray(raw.data), 96, 72);
      t.ctx.putImageData(apply(copy, t.f), 0, 0);
    });
  }
  function renderIdle() {
    renderThumbs();
  }
  renderIdle();

  /* ---------- Live preview loop ---------- */
  let lastThumb = 0;
  function loop(t) {
    requestAnimationFrame(loop);
    if (!state.source || !state.visible) return;
    if (state.source instanceof HTMLVideoElement && state.source.readyState < 2) return;
    drawSource(vctx, view.width, view.height);
    vctx.putImageData(apply(vctx.getImageData(0, 0, view.width, view.height), state.filter), 0, 0);
    if (t - lastThumb > 500) { renderThumbs(); lastThumb = t; }
  }
  requestAnimationFrame(loop);
  new IntersectionObserver(([e]) => (state.visible = e.isIntersecting)).observe(view);

  /* ---------- Sources ---------- */
  function ready() {
    startPanel.hidden = true;
    shootBtn.disabled = false;
    led.classList.add('on');
    if (state.source instanceof HTMLImageElement) renderStill();
  }
  function renderStill() {
    drawSource(vctx, view.width, view.height);
    vctx.putImageData(apply(vctx.getImageData(0, 0, view.width, view.height), state.filter), 0, 0);
    renderThumbs();
  }

  $('booth-cam').addEventListener('click', async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      msg.textContent = 'This browser can’t open the camera here (it needs HTTPS). You can still use a photo.';
      return;
    }
    try {
      msg.textContent = 'Waiting for camera permission…';
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 960 } },
        audio: false,
      });
      const video = document.createElement('video');
      video.muted = true; video.playsInline = true; video.srcObject = stream;
      await video.play();
      state.stream = stream; state.video = video; state.source = video; state.mirror = true;
      mirrorBtn.setAttribute('aria-pressed', 'true');
      ready();
    } catch (err) {
      msg.textContent = err.name === 'NotAllowedError'
        ? 'Camera access was blocked. Allow it in your browser’s site settings, or use a photo instead.'
        : 'No camera was found. You can use a photo instead.';
    }
  });

  $('booth-file').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      state.source = img; state.mirror = false;
      mirrorBtn.setAttribute('aria-pressed', 'false');
      ready();
    };
    img.src = URL.createObjectURL(file);
  });

  mirrorBtn.addEventListener('click', () => {
    state.mirror = !state.mirror;
    mirrorBtn.setAttribute('aria-pressed', state.mirror);
    if (state.source instanceof HTMLImageElement) renderStill();
  });
  document.querySelectorAll('input[name=layout]').forEach((r) =>
    r.addEventListener('change', () => ($('hud-mode').textContent = opt().layout === 'strip' ? '4 shots' : '1 shot'))
  );
  filtersEl.addEventListener('click', () => state.source instanceof HTMLImageElement && renderStill());
  addEventListener('pagehide', () => state.stream?.getTracks().forEach((t) => t.stop()));

  /* ---------- Capture ---------- */
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  let audio;
  function click() {
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      const len = audio.sampleRate * 0.06, buf = audio.createBuffer(1, len, audio.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3;
      const src = audio.createBufferSource(), gain = audio.createGain();
      gain.gain.value = 0.25; src.buffer = buf; src.connect(gain).connect(audio.destination); src.start();
    } catch (_) { /* sound is optional */ }
  }
  async function countdown(n) {
    for (let i = n; i > 0; i--) { countEl.textContent = i; await wait(800); }
    countEl.textContent = '';
  }
  function flash() {
    flashEl.classList.remove('go'); void flashEl.offsetWidth; flashEl.classList.add('go');
    click();
  }

  shootBtn.addEventListener('click', async () => {
    if (state.busy || !state.source) return;
    state.busy = true; shootBtn.disabled = true;
    const o = opt();
    const shots = [];
    const total = o.layout === 'strip' ? 4 : 1;
    const [W, H] = o.layout === 'strip' ? [600, 450] : [960, 720];
    for (let i = 0; i < total; i++) {
      await countdown(i === 0 ? 3 : 2);
      flash();
      shots.push(filteredFrame(W, H));
      await wait(350);
    }
    await document.fonts.load('28px "DotGothic16"').catch(() => {});
    await document.fonts.load('60px "Pinyon Script"').catch(() => {});
    const print = compose(shots, o);
    print.toBlob((blob) => {
      if (dl.dataset.url) URL.revokeObjectURL(dl.dataset.url);
      const url = URL.createObjectURL(blob);
      dl.dataset.url = url; dl.href = url;
      const d = new Date(), pad = (n) => String(n).padStart(2, '0');
      dl.download = `photobooth-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}.png`;
      resultImg.src = url;
      resultImg.alt = `Photobooth ${total > 1 ? 'strip of four photos' : 'photo'} with the ${state.filter.name} filter and ${o.frame} frame`;
      tray.hidden = false;
      resultImg.style.animation = 'none'; void resultImg.offsetWidth; resultImg.style.animation = '';
      tray.scrollIntoView({ behavior: 'smooth', block: 'center' });
      state.busy = false; shootBtn.disabled = false;
    }, 'image/png');
  });
  $('booth-again').addEventListener('click', () => {
    tray.hidden = true;
    document.getElementById('photobooth').scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------- Print composition ---------- */
  function compose(shots, o) {
    const strip = shots.length > 1;
    const pw = shots[0].width, ph = shots[0].height;
    const pad = o.frame === 'none' ? 0 : strip ? 34 : 46;
    const gap = strip ? 18 : 0;
    const foot = o.frame === 'none' ? 0 : o.frame === 'polaroid' ? (strip ? 150 : 190) : strip ? 140 : 120;
    const W = pw + pad * 2;
    const H = pad + shots.length * ph + (shots.length - 1) * gap + (foot || pad);
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const ctx = c.getContext('2d');

    drawFrameBack(ctx, W, H, o.frame);
    const radius = o.frame === 'aero' ? 18 : o.frame === 'lace' ? 6 : 0;
    shots.forEach((s, i) => {
      const x = pad, y = pad + i * (ph + gap);
      ctx.save();
      if (radius) { ctx.beginPath(); ctx.roundRect(x, y, pw, ph, radius); ctx.clip(); }
      ctx.drawImage(s, x, y);
      if (o.frame === 'aero') {
        const g = ctx.createLinearGradient(0, y, 0, y + ph * 0.5);
        g.addColorStop(0, 'rgba(255,255,255,.35)'); g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g; ctx.fillRect(x, y, pw, ph * 0.5);
      }
      ctx.restore();
      if (o.frame === 'aero') {
        ctx.strokeStyle = 'rgba(255,255,255,.95)'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.roundRect(x, y, pw, ph, radius); ctx.stroke();
      }
      if (o.date) dateStamp(ctx, x + pw - 18, y + ph - 18, strip ? 24 : 32);
    });
    if (foot) caption(ctx, W, H, foot, o.frame, strip);
    if (o.charms) charms(ctx, W, H, pad, strip);
    return c;
  }

  function drawFrameBack(ctx, W, H, frame) {
    if (frame === 'none') return;
    if (frame === 'polaroid') {
      ctx.fillStyle = '#fffdfd'; ctx.fillRect(0, 0, W, H);
      return;
    }
    if (frame === 'aero') {
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, '#d9f2f5'); g.addColorStop(0.5, '#f7fbfc'); g.addColorStop(1, '#fbe1ec');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(130,195,205,.28)'; ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 24) { ctx.beginPath(); ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 24) { ctx.beginPath(); ctx.moveTo(0, y + 0.5); ctx.lineTo(W, y + 0.5); ctx.stroke(); }
      const s = ctx.createLinearGradient(0, 0, W, H);
      s.addColorStop(0.3, 'rgba(255,255,255,0)'); s.addColorStop(0.42, 'rgba(255,255,255,.6)'); s.addColorStop(0.5, 'rgba(255,255,255,0)');
      ctx.fillStyle = s; ctx.fillRect(0, 0, W, H);
      return;
    }
    // lace: pale pink card with a white scalloped, eyeleted lace border
    ctx.fillStyle = '#fbe4ed'; ctx.fillRect(0, 0, W, H);
    const r = 11, step = 20, inset = 14;
    ctx.fillStyle = '#fff';
    ctx.fillRect(inset, inset, W - inset * 2, H - inset * 2);
    const edge = (x0, y0, x1, y1) => {
      const len = Math.hypot(x1 - x0, y1 - y0), n = Math.round(len / step);
      for (let k = 0; k <= n; k++) {
        const x = x0 + ((x1 - x0) * k) / n, y = y0 + ((y1 - y0) * k) / n;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }
    };
    edge(inset, inset, W - inset, inset); edge(inset, H - inset, W - inset, H - inset);
    edge(inset, inset, inset, H - inset); edge(W - inset, inset, W - inset, H - inset);
    ctx.fillStyle = '#f7cddd';
    const holes = (x0, y0, x1, y1) => {
      const len = Math.hypot(x1 - x0, y1 - y0), n = Math.round(len / step);
      for (let k = 0; k <= n; k++) {
        const x = x0 + ((x1 - x0) * k) / n, y = y0 + ((y1 - y0) * k) / n;
        ctx.beginPath(); ctx.arc(x, y, 2.6, 0, Math.PI * 2); ctx.fill();
      }
    };
    const hi = inset + 8;
    holes(hi, hi, W - hi, hi); holes(hi, H - hi, W - hi, H - hi); holes(hi, hi, hi, H - hi); holes(W - hi, hi, W - hi, H - hi);
    ctx.setLineDash([2, 6]); ctx.lineCap = 'round'; ctx.strokeStyle = '#f3abc7'; ctx.lineWidth = 2;
    ctx.strokeRect(inset + 18, inset + 18, W - (inset + 18) * 2, H - (inset + 18) * 2);
    ctx.setLineDash([]);
  }

  function dateStamp(ctx, x, y, size) {
    const d = new Date();
    const text = `'${String(d.getFullYear()).slice(2)} ${String(d.getMonth() + 1).padStart(2, '0')} ${String(d.getDate()).padStart(2, '0')}`;
    ctx.save();
    ctx.font = `${size}px "DotGothic16", monospace`;
    ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
    ctx.shadowColor = 'rgba(255,120,170,.9)'; ctx.shadowBlur = 8;
    ctx.fillStyle = '#ffb3cf';
    ctx.fillText(text, x, y);
    ctx.shadowBlur = 0; ctx.fillStyle = '#fff1f6';
    ctx.globalAlpha = 0.65; ctx.fillText(text, x, y);
    ctx.restore();
  }

  function caption(ctx, W, H, foot, frame, strip) {
    const d = new Date();
    const date = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const cy = H - foot / 2;
    ctx.save();
    ctx.textAlign = 'center';
    ctx.fillStyle = frame === 'aero' ? '#4d7f88' : '#5d6273';
    ctx.font = `${strip ? 52 : 60}px "Pinyon Script", cursive`;
    ctx.fillText('Photobooth', W / 2, cy + (strip ? 2 : 4));
    ctx.font = `${strip ? 17 : 18}px "DotGothic16", monospace`;
    ctx.fillStyle = frame === 'aero' ? '#5f9aa3' : '#c0628f';
    ctx.fillText(`${date.toUpperCase()} · SWEN TEO PORTFOLIO`, W / 2, cy + (strip ? 34 : 40));
    ctx.restore();
  }

  function shape(ctx, path, x, y, size, rot, fill, stroke, base = 100) {
    ctx.save();
    ctx.translate(x, y); ctx.rotate(rot); ctx.scale(size / base, size / base); ctx.translate(-base / 2, -base / 2);
    const p = new Path2D(path);
    ctx.fillStyle = fill; ctx.fill(p);
    if (stroke) { ctx.lineWidth = (2 * base) / size; ctx.strokeStyle = stroke; ctx.stroke(p); }
    ctx.restore();
  }
  function silver(ctx, y0, y1) {
    const g = ctx.createLinearGradient(0, y0, 0, y1);
    g.addColorStop(0, '#ffffff'); g.addColorStop(0.4, '#e3e7ee'); g.addColorStop(0.52, '#a7afbd'); g.addColorStop(0.64, '#f3f5f9'); g.addColorStop(1, '#bfc6d1');
    return g;
  }
  function bow(ctx, x, y, size) {
    ctx.save();
    ctx.translate(x - size / 2, y - size * 0.4); ctx.scale(size / 100, size / 100);
    const g = ctx.createLinearGradient(0, 0, 0, 80);
    g.addColorStop(0, '#ffe6f0'); g.addColorStop(0.55, '#f7b4cd'); g.addColorStop(1, '#ee98bb');
    ctx.fillStyle = g; ctx.strokeStyle = '#e48cb0'; ctx.lineWidth = 1.6;
    ['tailL', 'tailR', 'bowL', 'bowR'].forEach((k) => { const p = new Path2D(PATHS[k]); ctx.fill(p); ctx.stroke(p); });
    ctx.beginPath(); ctx.ellipse(50, 33, 8, 9.5, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.restore();
  }
  function charms(ctx, W, H, pad, strip) {
    const u = Math.max(W, 600) / 600;
    ctx.save();
    ctx.shadowColor = 'rgba(120,110,150,.35)'; ctx.shadowBlur = 8 * u; ctx.shadowOffsetY = 3 * u;
    bow(ctx, W / 2, pad * 0.55 + 8 * u, 86 * u);
    shape(ctx, PATHS.heart, pad + 30 * u, pad + 34 * u, 54 * u, -0.3, '#f7bfd4', '#fff');
    shape(ctx, PATHS.star, W - pad - 34 * u, pad + 36 * u, 50 * u, 0.25, '#bfe7ea', '#fff');
    const ny = (strip ? H - 150 * u : H - 140 * u);
    ctx.save();
    ctx.translate(pad + 26 * u, ny); ctx.rotate(-0.2); ctx.scale(u * 1.3, u * 1.3);
    const np = new Path2D(PATHS.note);
    ctx.fillStyle = silver(ctx, 0, 64); ctx.fill(np); ctx.lineWidth = 1; ctx.strokeStyle = '#9aa3b2'; ctx.stroke(np);
    ctx.restore();
    ctx.shadowColor = 'rgba(150,230,236,.95)'; ctx.shadowBlur = 12 * u; ctx.shadowOffsetY = 0;
    shape(ctx, PATHS.sparkle, W - pad - 30 * u, ny - 50 * u, 40 * u, 0, '#ffffff');
    shape(ctx, PATHS.sparkle, W - pad - 64 * u, ny - 78 * u, 22 * u, 0, '#ffffff');
    ctx.restore();
  }
})();
