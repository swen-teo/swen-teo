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

export default function App() {
  const initial = useRef(parseHash());
  const [scene, setScene] = useState(initial.current.scene); // desk | in | mac | out
  const [launch, setLaunch] = useState(initial.current.app);
  const [zoom, setZoom] = useState(null);
  const screenRef = useRef(null);

  const zoomFor = () => {
    const el = screenRef.current;
    if (!el) return null;
    const b = el.getBoundingClientRect();
    const s = Math.max(innerWidth / b.width, innerHeight / b.height) * 1.04;
    const cx = b.left + b.width / 2, cy = b.top + b.height / 2;
    return { origin: `${cx}px ${cy}px`, transform: `translate(${innerWidth / 2 - cx}px, ${innerHeight / 2 - cy}px) scale(${s})` };
  };

  const openMac = useCallback((app = null) => {
    setLaunch(app);
    history.replaceState(null, '', app ? `#/mac/${app}` : '#/mac');
    if (reduced()) { setScene('mac'); return; }
    setZoom(zoomFor());
    setScene('in');
    setTimeout(() => setScene('mac'), ZOOM_MS);
  }, []);

  const closeLid = useCallback(() => {
    history.replaceState(null, '', '#/');
    if (reduced()) { setScene('desk'); setZoom(null); return; }
    setScene('out');
    // desk mounts zoomed in, then eases back out
    requestAnimationFrame(() => {
      setZoom(zoomFor());
      requestAnimationFrame(() => requestAnimationFrame(() => setZoom(null)));
    });
    setTimeout(() => setScene('desk'), ZOOM_MS);
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

  const deskVisible = scene !== 'mac';
  const macVisible = scene === 'mac' || scene === 'in' || scene === 'out';

  return (
    <MusicProvider>
      {deskVisible && (
        <div
          className={`zoomer ${scene === 'in' || scene === 'out' ? 'zoomer--anim' : ''}`}
          style={zoom ? { transformOrigin: zoom.origin, transform: zoom.transform } : undefined}
          aria-hidden={scene !== 'desk'}
        >
          <Desk screenRef={screenRef} onOpen={openMac} busy={scene !== 'desk'} />
        </div>
      )}
      {macVisible && (
        <div className={`mac-layer mac-layer--${scene}`}>
          <Mac initialApp={launch} onCloseLid={closeLid} />
        </div>
      )}
    </MusicProvider>
  );
}
