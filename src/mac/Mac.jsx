import { useCallback, useEffect, useRef, useState } from 'react';
import Window from './Window.jsx';
import { APPS, appById } from './apps/registry.js';
import {
  IconAbout, IconCalendar, IconMusic, IconPrefs, IconAwards, IconBooth,
  IconMail, IconDesk, IconFolder, IconIPod, IconHardDrive, IconDocument,
  IconTextDoc, IconImageDoc, IconTrash
} from './icons.jsx';
import AboutApp from './apps/AboutApp.jsx';
import CalendarApp from './apps/CalendarApp.jsx';
import ITunesApp from './apps/ITunesApp.jsx';
import PrefsApp from './apps/PrefsApp.jsx';
import FinderApp from './apps/FinderApp.jsx';
import PhotoBoothApp from './apps/PhotoBoothApp.jsx';
import MailApp from './apps/MailApp.jsx';
import MusicApp from './apps/MusicApp.jsx';
import ResumeApp from './apps/ResumeApp.jsx';
import TextEditApp from './apps/TextEditApp.jsx';
import PhotoApp from './apps/PhotoApp.jsx';
import TrashApp from './apps/TrashApp.jsx';
import { ClockWidget, WeatherWidget, NowPlayingWidget, TodoStickyWidget } from './Widgets.jsx';
import { useMusic } from '../music/MusicProvider.jsx';
import '../styles/wallpaper.css';
import './mac.css';

const ICONS = {
  about: IconAbout, experience: IconCalendar, projects: IconMusic,
  skills: IconPrefs, awards: IconAwards, photobooth: IconBooth,
  music: IconIPod, mail: IconMail, resume: IconDocument,
  readme: IconTextDoc, photo: IconImageDoc, trash: IconTrash
};
const VIEWS = {
  about: AboutApp, experience: CalendarApp, projects: ITunesApp,
  skills: PrefsApp, awards: FinderApp, photobooth: PhotoBoothApp,
  music: MusicApp, mail: MailApp, resume: ResumeApp,
  readme: TextEditApp, photo: PhotoApp, trash: TrashApp
};
const VARIANT = { projects: 'metal', photobooth: 'metal', awards: 'finder', trash: 'plain', resume: 'plain', readme: 'plain' };
const MENU_H = 24;

function useViewport() {
  const [vp, setVp] = useState({ w: innerWidth, h: innerHeight });
  useEffect(() => {
    const on = () => setVp({ w: innerWidth, h: innerHeight });
    addEventListener('resize', on);
    return () => removeEventListener('resize', on);
  }, []);
  return vp;
}

/* ---------- Menu bar ---------- */
function MenuBar({ activeName, windows, onOpen, onFocus, onMinimizeActive, onCloseLid }) {
  const music = useMusic();
  const [menu, setMenu] = useState(null);
  const [now, setNow] = useState(new Date());
  const ref = useRef(null);
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 15000); return () => clearInterval(t); }, []);
  useEffect(() => {
    if (!menu) return;
    const off = (e) => !ref.current?.contains(e.target) && setMenu(null);
    addEventListener('pointerdown', off);
    return () => removeEventListener('pointerdown', off);
  }, [menu]);
  const pick = (fn) => () => { setMenu(null); fn(); };
  const open = windows.filter((w) => w.open);
  const item = (id, label, children) => (
    <div className={`mb__menu ${menu === id ? 'is-open' : ''}`}>
      <button type="button" className={`mb__item ${id === 'logo' ? 'mb__logo' : ''}`} aria-haspopup="menu" aria-expanded={menu === id}
        onClick={() => setMenu(menu === id ? null : id)} onPointerEnter={() => menu && setMenu(id)}>
        {label}
      </button>
      {menu === id && <div className="mb__drop" role="menu">{children}</div>}
    </div>
  );
  return (
    <nav className="menubar" ref={ref} aria-label="Menu bar">
      {item('logo', <svg viewBox="0 0 200 134" aria-label="Portfolio menu"><use href="#lotus" /></svg>, <>
        <button role="menuitem" onClick={pick(() => onOpen('about'))}>About This Swen</button>
        <hr />
        <button role="menuitem" onClick={pick(() => onOpen('mail'))}>Contact…</button>
        <a role="menuitem" href="https://www.linkedin.com/in/swen-teo" target="_blank" rel="noopener" onClick={() => setMenu(null)}>LinkedIn ↗</a>
        <a role="menuitem" href="https://github.com/swen-teo" target="_blank" rel="noopener" onClick={() => setMenu(null)}>GitHub ↗</a>
        <hr />
        <button role="menuitem" onClick={pick(onCloseLid)}>Close Lid (back to desk)</button>
      </>)}
      <span className="mb__app">{activeName}</span>
      {item('go', 'Go', APPS.map((a) => (
        <button key={a.id} role="menuitem" onClick={pick(() => onOpen(a.id))}><span>{a.menu}</span><small>{a.name}</small></button>
      )))}
      {item('window', 'Window', <>
        <button role="menuitem" onClick={pick(onMinimizeActive)} disabled={!open.length}>Minimise</button>
        <hr />
        {open.length ? open.map((w) => <button key={w.id} role="menuitem" onClick={pick(() => onFocus(w.id))}>{appById(w.id).menu}</button>) : <span className="mb__empty">No open windows</span>}
      </>)}
      <span className="mb__spacer" />
      {music?.ready && (
        <button type="button" className="mb__item mb__sound" onClick={music.toggleMute} data-music-control aria-label={music.muted ? 'Unmute music' : 'Mute music'} aria-pressed={!music.muted}>
          {music.muted
            ? <svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z" /><path d="M16 9l5 6M21 9l-5 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            : <svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z" /><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>}
        </button>
      )}
      <span className="mb__status">{now.toLocaleDateString([], { weekday: 'short' })} {now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
      <span className="mb__status mb__user">Swen Teo</span>
    </nav>
  );
}

/* ---------- Dock with magnification ---------- */
function Dock({ windows, onOpen, onCloseLid, iconRefs }) {
  const ref = useRef(null);
  const [mx, setMx] = useState(null);
  const [bounce, setBounce] = useState(null);
  const items = [...APPS.filter((a) => !a.hideFromDock).map((a) => ({ ...a, Icon: ICONS[a.id] })), { id: 'sep' }, { id: 'desk', menu: 'Close Lid', name: 'Back to desk', Icon: IconDesk }];
  const scaleFor = (el) => {
    if (mx == null || !el) return 1;
    const b = el.getBoundingClientRect();
    const d = Math.abs(mx - (b.left + b.width / 2));
    return 1 + 0.55 * Math.max(0, 1 - d / 140);
  };
  return (
    <nav className="dock" ref={ref} aria-label="Dock" onPointerMove={(e) => e.pointerType === 'mouse' && setMx(e.clientX)} onPointerLeave={() => setMx(null)}>
      <div className="dock__shelf" />
      {items.map((it) => {
        if (it.id === 'sep') return <span key="sep" className="dock__sep" />;
        const w = windows.find((x) => x.id === it.id);
        const running = w?.open;
        return (
          <button
            key={it.id}
            type="button"
            ref={(el) => (iconRefs.current[it.id] = el)}
            className={`dock__item ${bounce === it.id ? 'is-bouncing' : ''}`}
            style={{ '--s': scaleFor(iconRefs.current[it.id]) }}
            onClick={() => {
              if (it.id === 'desk') return onCloseLid();
              if (!running) { setBounce(it.id); setTimeout(() => setBounce(null), 700); }
              onOpen(it.id);
            }}
            aria-label={`${it.menu}${it.id !== 'desk' ? ` (${it.name})` : ''}${running ? ', open' : ''}`}
          >
            <span className="dock__icon"><it.Icon /></span>
            <span className="dock__label">{it.menu}</span>
            {running && <span className="dock__dot" />}
          </button>
        );
      })}
    </nav>
  );
}

/* ---------- Desktop ---------- */
export default function Mac({ initialApp, onCloseLid }) {
  const vp = useViewport();
  const compact = vp.w < 760;
  const iconRefs = useRef({});
  const zTop = useRef(10);
  const [windows, setWindows] = useState(() => APPS.map((a) => ({ id: a.id, open: false, minimized: false, z: 1, x: 0, y: 0, w: a.w, h: a.h })));
  const [activeId, setActiveId] = useState(null);

  const place = useCallback((id, i) => {
    const a = appById(id);
    const dockH = 92;
    const w = Math.min(a.w, vp.w - 40), h = Math.min(a.h, vp.h - MENU_H - dockH - 24);
    const x = Math.max(12, Math.round((vp.w - w) / 2 + (i % 5) * 28 - 56));
    const y = Math.max(MENU_H + 12, Math.round(MENU_H + (vp.h - MENU_H - dockH - h) / 2 + (i % 5) * 24 - 36));
    return { x, y, w, h };
  }, [vp.w, vp.h]);

  const fromDock = (id) => {
    const el = iconRefs.current[id];
    if (!el) return { fromX: 0, fromY: 400 };
    const b = el.getBoundingClientRect();
    return { fromX: b.left + b.width / 2, fromY: b.top };
  };

  const focus = useCallback((id) => {
    zTop.current += 1;
    const z = zTop.current;
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, z, minimized: false } : w)));
    setActiveId(id);
  }, []);

  const open = useCallback((id) => {
    zTop.current += 1;
    const z = zTop.current;
    setWindows((ws) => {
      const openCount = ws.filter((w) => w.open).length;
      return ws.map((w) => {
        if (w.id !== id) return w;
        if (w.open) return { ...w, z, minimized: false };
        return { ...w, ...place(id, openCount), ...fromDock(id), open: true, minimized: false, opening: true, z };
      });
    });
    setActiveId(id);
    setTimeout(() => setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, opening: false } : w))), 420);
  }, [place]);

  const close = (id) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, open: false } : w)));
    setActiveId((cur) => (cur === id ? null : cur));
  };
  const minimize = (id) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, ...fromDock(id), minimized: true } : w)));
    setActiveId((cur) => (cur === id ? null : cur));
  };
  const zoom = (id) => {
    setWindows((ws) => ws.map((w) => {
      if (w.id !== id) return w;
      if (w.prev) return { ...w, ...w.prev, prev: null };
      return { ...w, prev: { x: w.x, y: w.y, w: w.w, h: w.h }, x: 8, y: MENU_H + 8, w: vp.w - 16, h: vp.h - MENU_H - 100 };
    }));
  };
  const moveTo = (id, x, y) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, x: Math.min(Math.max(x, 60 - w.w), vp.w - 60), y: Math.min(Math.max(y, MENU_H), vp.h - 60) } : w)));
  };

  useEffect(() => {
    const t = setTimeout(() => open(initialApp || 'about'), initialApp ? 250 : 500);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // keep the URL in sync with the front window so it can be shared
  useEffect(() => {
    history.replaceState(null, '', activeId ? `#/mac/${activeId}` : '#/mac');
  }, [activeId]);

  const active = activeId ? appById(activeId) : null;

  return (
    <div className="mac">
      <div className="wallpaper" />
      <MenuBar
        activeName={active ? active.name : 'Finder'}
        windows={windows}
        onOpen={open}
        onFocus={focus}
        onMinimizeActive={() => activeId && minimize(activeId)}
        onCloseLid={onCloseLid}
      />

      <div className="desktop-icons">
        <button type="button" className="dicon" onClick={() => open('awards')}>
          <IconHardDrive /><span>Macintosh HD</span>
        </button>
        <button type="button" className="dicon" onClick={() => open('projects')}>
          <IconFolder badge="notes" /><span>Projects</span>
        </button>
        <button type="button" className="dicon" onClick={() => open('awards')}>
          <IconFolder badge="star" /><span>Awards</span>
        </button>
        <button type="button" className="dicon" onClick={() => open('photobooth')}>
          <IconFolder badge="heart" /><span>Photo Booth</span>
        </button>
        <button type="button" className="dicon" onClick={() => open('resume')}>
          <IconDocument badge="PDF" /><span>Resume.pdf</span>
        </button>
        <button type="button" className="dicon" onClick={() => open('readme')}>
          <IconTextDoc /><span>README.txt</span>
        </button>
      </div>

      <div className="desktop-trash">
        <button type="button" className="dicon" onClick={() => open('trash')}>
          <IconTrash /><span>Trash</span>
        </button>
      </div>

      {!compact && (
        <div className="dashboard-widgets" aria-label="Dashboard Widgets">
          <TodoStickyWidget />
          <div className="widget-row">
            <ClockWidget />
            <WeatherWidget />
          </div>
          <NowPlayingWidget />
        </div>
      )}

      {windows.filter((w) => w.open).map((w) => {
        const a = appById(w.id);
        const View = VIEWS[w.id];
        return (
          <Window
            key={w.id}
            win={w}
            title={a.title}
            variant={VARIANT[w.id]}
            compact={compact}
            active={activeId === w.id}
            onFocus={() => activeId !== w.id && focus(w.id)}
            onClose={() => close(w.id)}
            onMinimize={() => minimize(w.id)}
            onZoom={() => zoom(w.id)}
            onMove={(x, y) => moveTo(w.id, x, y)}
          >
            <View onOpen={open} compact={compact} />
          </Window>
        );
      })}

      <Dock windows={windows} onOpen={open} onCloseLid={onCloseLid} iconRefs={iconRefs} />
    </div>
  );
}
