import { useCallback, useEffect, useRef, useState } from 'react';
import { FILTERS, applyFilter } from '../../lib/filters.js';
import { compose, drawSource, filteredFrame, sampleScene } from '../../lib/booth.js';
import './apps.css';

const VIEW_W = 640, VIEW_H = 480;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function shutterSound(ctxRef) {
  try {
    const a = (ctxRef.current ||= new (window.AudioContext || window.webkitAudioContext)());
    const len = a.sampleRate * 0.06, buf = a.createBuffer(1, len, a.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3;
    const s = a.createBufferSource(), g = a.createGain();
    g.gain.value = 0.25; s.buffer = buf; s.connect(g).connect(a.destination); s.start();
  } catch { /* sound is optional */ }
}

export default function PhotoBoothApp() {
  const viewRef = useRef(null);
  const gridRef = useRef([]);
  const srcRef = useRef(null);
  const streamRef = useRef(null);
  const audioRef = useRef(null);
  const sample = useRef(null);
  const [hasSource, setHasSource] = useState(false);
  const [filter, setFilter] = useState(FILTERS[1]);
  const [effects, setEffects] = useState(false);
  const [mode, setMode] = useState('single');
  const [frame, setFrame] = useState('lace');
  const [date, setDate] = useState(true);
  const [charms, setCharms] = useState(true);
  const [mirror, setMirror] = useState(true);
  const [msg, setMsg] = useState('Your camera is only used while this window is open.');
  const [count, setCount] = useState('');
  const [flash, setFlash] = useState(0);
  const [busy, setBusy] = useState(false);
  const [prints, setPrints] = useState([]);
  const [viewing, setViewing] = useState(null);
  const printsRef = useRef(prints); printsRef.current = prints;

  const filterRef = useRef(filter); filterRef.current = filter;
  const mirrorRef = useRef(mirror); mirrorRef.current = mirror;
  const effectsRef = useRef(effects); effectsRef.current = effects;

  // live preview + effect grid
  useEffect(() => {
    if (!sample.current) sample.current = sampleScene();
    let raf, last = 0;
    const vctx = viewRef.current.getContext('2d', { willReadFrequently: true });
    const tick = (t) => {
      raf = requestAnimationFrame(tick);
      const src = srcRef.current || sample.current;
      if (src instanceof HTMLVideoElement && src.readyState < 2) return;
      const live = src instanceof HTMLVideoElement;
      if (!live && t - last < 250) return;
      const m = srcRef.current ? mirrorRef.current : false;
      if (effectsRef.current) {
        if (t - last < (live ? 90 : 400)) return;
        last = t;
        const base = document.createElement('canvas');
        base.width = 160; base.height = 120;
        const bctx = base.getContext('2d', { willReadFrequently: true });
        drawSource(bctx, src, 160, 120, m);
        const raw = bctx.getImageData(0, 0, 160, 120);
        FILTERS.forEach((f, i) => {
          const c = gridRef.current[i];
          if (!c) return;
          c.getContext('2d').putImageData(applyFilter(new ImageData(new Uint8ClampedArray(raw.data), 160, 120), f), 0, 0);
        });
        return;
      }
      last = t;
      drawSource(vctx, src, VIEW_W, VIEW_H, m);
      vctx.putImageData(applyFilter(vctx.getImageData(0, 0, VIEW_W, VIEW_H), filterRef.current), 0, 0);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // release the camera when the window closes
  useEffect(() => () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    printsRef.current.forEach((p) => URL.revokeObjectURL(p.url));
  }, []);

  const startCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) { setMsg('This browser can’t open the camera here (it needs HTTPS). You can still use a photo.'); return; }
    try {
      setMsg('Waiting for camera permission…');
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 960 } }, audio: false });
      const v = document.createElement('video');
      v.muted = true; v.playsInline = true; v.srcObject = stream;
      await v.play();
      streamRef.current = stream; srcRef.current = v;
      setMirror(true); setHasSource(true);
    } catch (e) {
      setMsg(e.name === 'NotAllowedError' ? 'Camera access was blocked. Allow it in your browser’s site settings, or use a photo instead.' : 'No camera was found. You can use a photo instead.');
    }
  };
  const usePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(img.src); srcRef.current = img; setMirror(false); setHasSource(true); setViewing(null); };
    img.src = URL.createObjectURL(file);
    e.target.value = '';
  };

  const shoot = useCallback(async () => {
    if (busy || !srcRef.current) return;
    setBusy(true); setViewing(null); setEffects(false);
    const total = mode === 'strip' ? 4 : 1;
    const [W, H] = mode === 'strip' ? [600, 450] : [960, 720];
    const shots = [];
    for (let i = 0; i < total; i++) {
      for (let n = i === 0 ? 3 : 2; n > 0; n--) { setCount(String(n)); await wait(800); }
      setCount('');
      setFlash((f) => f + 1); shutterSound(audioRef);
      shots.push(filteredFrame(srcRef.current, W, H, filterRef.current, mirrorRef.current));
      await wait(350);
    }
    await Promise.all([document.fonts.load('28px "Silkscreen"'), document.fonts.load('60px "Mrs Saint Delafield"')]).catch(() => {});
    const canvas = compose(shots, { frame, date, charms });
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const d = new Date(), p2 = (n) => String(n).padStart(2, '0');
      const print = { url, name: `photobooth-${d.getFullYear()}${p2(d.getMonth() + 1)}${p2(d.getDate())}-${p2(d.getHours())}${p2(d.getMinutes())}${p2(d.getSeconds())}.png`, strip: total > 1, filter: filterRef.current.name };
      setPrints((ps) => [print, ...ps]);
      setViewing(print);
      setBusy(false);
    }, 'image/png');
  }, [busy, mode, frame, date, charms]);

  const remove = (p) => {
    URL.revokeObjectURL(p.url);
    setPrints((ps) => ps.filter((x) => x !== p));
    setViewing(null);
  };

  return (
    <div className="booth">
      <div className="booth__stage">
        <div className="booth__screen">
          <canvas ref={viewRef} width={VIEW_W} height={VIEW_H} aria-label={`Live preview with the ${filter.name} effect`} />
          {!hasSource && (
            <div className="booth__start">
              <svg viewBox="0 0 100 94" aria-hidden="true"><use href="#heart" /></svg>
              <button type="button" className="aqua aqua--blush booth__big" onClick={startCamera}>Start camera</button>
              <label className="aqua booth__big booth__file">Use a photo instead<input type="file" accept="image/*" onChange={usePhoto} /></label>
              <p>{msg}</p>
            </div>
          )}
          {effects && (
            <div className="booth__grid" role="radiogroup" aria-label="Effects">
              {FILTERS.map((f, i) => (
                <button key={f.id} type="button" role="radio" aria-checked={filter.id === f.id} className={filter.id === f.id ? 'is-sel' : ''} onClick={() => { setFilter(f); setEffects(false); }}>
                  <canvas ref={(el) => (gridRef.current[i] = el)} width="160" height="120" />
                  <span>{f.name}</span>
                </button>
              ))}
            </div>
          )}
          {viewing && (
            <div className="booth__view">
              <img src={viewing.url} alt={`Photo Booth ${viewing.strip ? 'strip' : 'photo'} with the ${viewing.filter} effect`} />
              <div className="booth__viewbar">
                <a className="aqua aqua--blush" href={viewing.url} download={viewing.name}>Download</a>
                <button type="button" className="aqua" onClick={() => remove(viewing)}>Delete</button>
                <button type="button" className="aqua aqua--mint" onClick={() => setViewing(null)}>Back to camera</button>
              </div>
            </div>
          )}
          <div className="booth__count" aria-live="assertive">{count}</div>
          <div key={flash} className={`booth__flash ${flash ? 'go' : ''}`} />
          {!effects && !viewing && <span className="booth__hud">{filter.name}</span>}
        </div>
      </div>

      <div className="booth__controls">
        <div className="booth__seg" role="radiogroup" aria-label="Layout">
          <button type="button" role="radio" aria-checked={mode === 'single'} onClick={() => setMode('single')} title="Single photo">
            <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /></svg><span className="sr-only">Single photo</span>
          </button>
          <button type="button" role="radio" aria-checked={mode === 'strip'} onClick={() => setMode('strip')} title="Strip of four">
            <svg viewBox="0 0 24 24"><rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" /></svg><span className="sr-only">Strip of four</span>
          </button>
        </div>
        <button type="button" className="booth__shutter" onClick={shoot} disabled={!hasSource || busy} aria-label={mode === 'strip' ? 'Take four photos' : 'Take photo'}>
          <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M11 7l2-3h6l2 3h5a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3z" /><circle cx="16" cy="17" r="6" fill="#f8dfe8" /><circle cx="16" cy="17" r="3.4" /></svg>
        </button>
        <button type="button" className={`aqua booth__effects ${effects ? 'aqua--blush' : ''}`} onClick={() => { setViewing(null); setEffects(!effects); }} aria-pressed={effects}>Effects</button>
      </div>

      <div className="booth__opts">
        <label>Frame
          <select value={frame} onChange={(e) => setFrame(e.target.value)}>
            <option value="lace">Lace</option><option value="aero">Aero</option><option value="polaroid">Polaroid</option><option value="none">None</option>
          </select>
        </label>
        <label><input type="checkbox" checked={date} onChange={(e) => setDate(e.target.checked)} /> Date stamp</label>
        <label><input type="checkbox" checked={charms} onChange={(e) => setCharms(e.target.checked)} /> Charms</label>
        <label><input type="checkbox" checked={mirror} onChange={(e) => setMirror(e.target.checked)} disabled={!hasSource} /> Mirror</label>
        {hasSource && <label className="linkish booth__file2">Use a photo<input type="file" accept="image/*" onChange={usePhoto} /></label>}
      </div>

      <div className="booth__film" aria-label="Photos taken">
        {prints.length ? prints.map((p) => (
          <button key={p.url} type="button" className={viewing === p ? 'is-sel' : ''} onClick={() => { setEffects(false); setViewing(p); }} aria-label={`View ${p.strip ? 'strip' : 'photo'} (${p.filter})`}>
            <img src={p.url} alt="" />
          </button>
        )) : <span className="booth__film-empty">Photos you take appear here. Nothing is uploaded.</span>}
      </div>
    </div>
  );
}
