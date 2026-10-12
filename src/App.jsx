import { useCallback, useEffect, useRef, useState } from 'react';
import Desk from './desk/Desk.jsx';
import Mac from './mac/Mac.jsx';
import { APP_IDS } from './mac/apps/registry.js';
import { MusicProvider } from './music/MusicProvider.jsx';

const ZOOM_MS = 950;
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// #/            desk
// #/mac         desktop
// #/mac/<app>   desktop with an app open
function parseHash() {
  const [, scene, app] = location.hash.replace(/^#/, '').split('/');
  if (scene !== 'mac') return { scene: 'desk', app: null };
  return { scene: 'mac', app: APP_IDS.includes(app) ? app : null };
}

const STAGES = {
  land: { w: 1600, h: 1000 },
  port: { w: 900, h: 1560 },
};

function getMacScreenZoom() {
  const vpW = window.innerWidth;
  const vpH = window.innerHeight;
  const layout = vpW / vpH < 0.85 ? 'port' : 'land';
  const S = STAGES[layout];
  const scale = Math.min(vpW / S.w, vpH / S.h);
  const stageLeft = (vpW - S.w * scale) / 2;
  const stageTop = (vpH - S.h * scale) / 2;

  let macX, macY, macW;
  if (layout === 'land') {
    macX = 540; macY = 236; macW = 520;
  } else {
    macX = 210; macY = 380; macW = 480;
  }
  const u = macW / 100;
  const x = macX + 5.5 * u;
  const y = macY + 4.6 * u;
  const w = macW - 11 * u;
  const h = (77.4 - 10.8) * u;

  const screenX = stageLeft + x * scale;
  const screenY = stageTop + y * scale;
  const screenW = w * scale;
  const screenH = h * scale;
  const cx = screenX + screenW / 2;
  const cy = screenY + screenH / 2;
  const s = Math.max(vpW / screenW, vpH / screenH) * 1.04;
  return {
    origin: `${cx}px ${cy}px`,
    inTransform: `translate(${vpW / 2 - cx}px, ${vpH / 2 - cy}px) scale(${s})`,
    outTransform: 'translate(0px, 0px) scale(1)',
  };
}

function TransitionVeil() {
  return (
    <div className="transition-veil" aria-label="Closing laptop lid" role="status">
      <div className="lid-close-scene">
        <div className="mbk">
          <div className="mbk__shadow" />
          <div className="mbk__base">
            <div className="mbk__keys" />
            <div className="mbk__pad" />
          </div>
          <div className="mbk__lip">
            <span className="mbk__lip-notch" />
            <span className="mbk__sleep-led" />
          </div>
          <div className="mbk__hinge" />
          <div className="mbk__lid-pivot">
            <div className="mbk__lid">
              <span className="mbk__isight" />
              <div className="mbk__screen">
                <div className="mbk__wallpaper">
                  <span className="mbk__mini-clock">Swen’s MacBook</span>
                </div>
                <div className="mbk__glare" />
              </div>
            </div>
          </div>
          <div className="mbk__closed-lid">
            <svg className="mbk__closed-lotus" viewBox="0 0 200 134">
              <use href="#lotus" />
            </svg>
          </div>
        </div>
        <div className="status-pill">
          <span className="status-dot" />
          <span>Closing lid…</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const initial = useRef(parseHash());
  const [scene, setScene] = useState(initial.current.scene); // desk | in | mac | out
  const [launch, setLaunch] = useState(initial.current.app);
  const [closing, setClosing] = useState(false);
  const [zoom, setZoom] = useState(() => {
    if (initial.current.scene === 'mac') {
      const z = getMacScreenZoom();
      return { origin: z.origin, transform: z.inTransform };
    }
    return null;
  });
  const screenRef = useRef(null);

  const openMac = useCallback((app = null) => {
    setLaunch(app);
    history.replaceState(null, '', app ? `#/mac/${app}` : '#/mac');
    if (reduced()) { setScene('mac'); return; }
    const z = getMacScreenZoom();
    setZoom({ origin: z.origin, transform: z.inTransform });
    setScene('in');
    setTimeout(() => setScene('mac'), ZOOM_MS);
  }, []);

  const closeLid = useCallback(() => {
    history.replaceState(null, '', '#/');
    if (reduced()) {
      setScene('desk');
      setZoom(null);
      return;
    }
    setClosing(true);
    setTimeout(() => {
      setScene('desk');
      setZoom(null);
    }, 880);
    setTimeout(() => {
      setClosing(false);
    }, 1450);
  }, []);

  useEffect(() => {
    const onHash = () => {
      const h = parseHash();
      if (h.scene === 'mac' && scene === 'desk') openMac(h.app);
      if (h.scene === 'desk' && scene === 'mac') closeLid();
    };
    addEventListener('hashchange', onHash);
    return () => removeEventListener('hashchange', onHash);
  }, [scene, openMac, closeLid]);

  const macVisible = scene === 'mac' || scene === 'in' || scene === 'out';

  return (
    <MusicProvider>
      <div
        className={`zoomer ${scene === 'in' || scene === 'out' ? 'zoomer--anim' : ''} ${scene === 'mac' ? 'zoomer--dormant' : ''}`}
        style={zoom ? { transformOrigin: zoom.origin, transform: zoom.transform } : undefined}
        aria-hidden={scene !== 'desk'}
      >
        <Desk screenRef={screenRef} onOpen={openMac} busy={scene !== 'desk' || closing} />
      </div>
      {macVisible && (
        <div className={`mac-layer mac-layer--${scene}`}>
          <Mac initialApp={launch} onCloseLid={closeLid} />
        </div>
      )}
      {closing && <TransitionVeil />}
    </MusicProvider>
  );
}
