import { useEffect, useMemo, useState } from 'react';
import { rosetteSVG, doilySVG } from '../lib/motifs.js';
import { SITE } from '../data/content.js';
import Avatar from '../lib/Avatar.jsx';
import { useMusic } from '../music/MusicProvider.jsx';
import '../styles/wallpaper.css';
import './desk.css';

/* Stage coordinates for each object, per layout. [x, y, width] in stage px. */
const STAGES = {
  land: { w: 1600, h: 1000, table: 610 },
  port: { w: 900, h: 1560, table: 800 },
};
const POS = {
  land: {
    garland: [60, 0, 1480], mac: [540, 236, 520], doily: [560, 556, 480],
    rosettes: [140, 215, 230], lanyard: [1300, 112, 170], lotus: [1405, 500, 170], camera: [1132, 522, 250],
    planner: [118, 642, 300], cds: [452, 650, 200], stickers: [640, 800, 300], phone: [1080, 712, 110],
    earbuds: [352, 818, 170], ipod: [290, 770, 62], note: [860, 846, 190], bandageA: [1250, 905, 110], bandageB: [70, 870, 110], charms: [1405, 730, 175],
  },
  port: {
    garland: [20, 0, 860], mac: [210, 380, 480], doily: [230, 712, 440],
    rosettes: [40, 120, 200], lanyard: [690, 110, 160], lotus: [60, 760, 150], camera: [610, 740, 240],
    planner: [60, 980, 300], cds: [400, 940, 210], stickers: [300, 1260, 300], phone: [680, 1110, 120],
    earbuds: [640, 1300, 170], ipod: [560, 1330, 62], note: [80, 1310, 200], bandageA: [430, 1200, 110], bandageB: [750, 1440, 100], charms: [560, 1440, 120],
  },
};

function useStage() {
  const [vp, setVp] = useState({ w: innerWidth, h: innerHeight });
  useEffect(() => {
    const on = () => setVp({ w: innerWidth, h: innerHeight });
    addEventListener('resize', on);
    return () => removeEventListener('resize', on);
  }, []);
  const layout = vp.w / vp.h < 0.85 ? 'port' : 'land';
  const S = STAGES[layout];
  const scale = Math.min(vp.w / S.w, vp.h / S.h);
  return { layout, S, scale, vp };
}

// order in which things settle onto the desk on first load
const ORDER = ['garland', 'rosettes', 'lanyard', 'mac', 'doily', 'planner', 'cds', 'ipod', 'earbuds', 'camera', 'lotus', 'phone', 'stickers', 'note', 'bandageA', 'bandageB', 'charms'];
const idx = (id) => Math.max(0, ORDER.indexOf(id));

function Obj({ id, pos, label, app, onOpen, flat, children, disabled, className = '' }) {
  const [x, y, w] = pos[id];
  return (
    <button
      type="button"
      className={`obj obj--${id} ${flat ? 'is-flat' : ''} ${className}`}
      style={{ left: x, top: y, width: w, fontSize: w / 100, '--i': idx(id) }}
      onClick={() => onOpen(app)}
      aria-label={`${label} (opens on the MacBook)`}
      disabled={disabled}
    >
      {flat ? <span className="obj__art flat">{children}</span> : children}
      <span className="obj__tag" aria-hidden="true">{label}</span>
    </button>
  );
}

function Decor({ id, pos, className = '', children }) {
  const [x, y, w] = pos[id];
  return <div className={`decor decor--${id} ${className}`} style={{ left: x, top: y, width: w, fontSize: w / 100, '--i': idx(id) }} aria-hidden="true">{children}</div>;
}

/* ---------- MacBook (white polycarbonate, 2006) with the login screen ---------- */
function MacBook({ screenRef, onOpen, pos, disabled }) {
  const [x, y, w] = pos.mac;
  const [time, setTime] = useState(() => new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 20000); return () => clearInterval(t); }, []);
  return (
    <button type="button" className="macbook" style={{ left: x, top: y, width: w, fontSize: w / 100, '--i': idx('mac') }} onClick={() => onOpen(null)} disabled={disabled} aria-label="Log in to Swen’s MacBook to open the portfolio">
      <div className="macbook__lid">
        <span className="macbook__isight" />
        <div className="macbook__screen" ref={screenRef}>
          <div className="wallpaper wallpaper--login" />
          <div className="login">
            <div className="login__clock">{time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</div>
            <div className="login__panel">
              <Avatar className="login__avatar" />
              <div className="login__name">Swen Teo</div>
              <div className="login__btn">Click to log in</div>
            </div>
          </div>
          <div className="macbook__glare" /><span className="macbook__shimmer" />
        </div>
      </div>
      <div className="macbook__hinge" />
      <div className="macbook__base">
        <div className="macbook__keys" />
        <div className="macbook__pad" />
      </div>
      <div className="macbook__lip"><span /></div>
      <span className="obj__tag" aria-hidden="true">Open portfolio</span>
    </button>
  );
}

const Photo = ({ v }) => <span className={`ph ph--${v}`} />;

// A four-point glint that flashes now and then on shiny surfaces.
const Glint = ({ x, y, d }) => <span className="glint" style={{ left: x, top: y, animationDelay: d }} aria-hidden="true" />;

// Window light falling across the wall and desk, with drifting dust.
function Sunbeam() {
  const motes = useMemo(() => Array.from({ length: 22 }, (_, i) => ({
    left: `${8 + Math.random() * 46}%`, top: `${Math.random() * 80}%`, s: 2 + Math.random() * 3.5,
    d: 16 + Math.random() * 18, delay: -Math.random() * 30, x: (Math.random() - 0.3) * 120,
  })), []);
  return (
    <div className="sunbeam" aria-hidden="true">
      <span className="sunbeam__ray" /><span className="sunbeam__ray sunbeam__ray--2" />
      {motes.map((m, i) => <i key={i} style={{ left: m.left, top: m.top, width: m.s, height: m.s, animationDuration: `${m.d}s`, animationDelay: `${m.delay}s`, '--dx': `${m.x}px` }} />)}
    </div>
  );
}

// Objects drop onto the desk once, on first visit.
let entered = false;

export default function Desk({ screenRef, onOpen, busy }) {
  const { layout, S, scale, vp } = useStage();
  const playing = useMusic()?.playing;
  const [entering] = useState(() => !entered);
  useEffect(() => { entered = true; }, []);
  const pos = POS[layout];
  const rosettes = useMemo(
    () => [
      rosetteSVG({ ...SITE.awards[0], id: 'dr1' }),
      rosetteSVG({ ...SITE.awards[1], id: 'dr2' }),
    ],
    []
  );
  const doily = useMemo(() => doilySVG(520), []);
  const left = (vp.w - S.w * scale) / 2, top = (vp.h - S.h * scale) / 2;

  const common = { pos, onOpen, disabled: busy };

  return (
    <div className={`desk ${entering ? 'is-entering' : ''}`}>
      <div className="stage" style={{ width: S.w, height: S.h, transform: `translate(${left}px, ${top}px) scale(${scale})`, '--inv': 1 / scale }}>
        {/* room */}
        <div className="wall" style={{ height: 3000 + S.table }} />
        <div className="wall__light" style={{ height: 3000 + S.table + 300 }} />
        <div className="table" style={{ top: S.table }}><div className="table__edge" style={{ top: S.h - S.table - 40 }} /></div>
        <Sunbeam />

        {/* wall */}
        <Decor id="garland" {...{ pos }}>
          <svg className="garland" viewBox="0 0 1480 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fbe7ee" /><stop offset=".45" stopColor="#fff" /><stop offset=".6" stopColor="#f2cad8" /><stop offset="1" stopColor="#e8b6c8" /></linearGradient>
            </defs>
            <path d="M0 36C300 150 520 150 740 70S1180 150 1480 36" fill="none" stroke="#c7a3b3" strokeOpacity=".35" strokeWidth="14" transform="translate(4 8)" style={{ filter: 'blur(4px)' }} />
            <path d="M0 36C300 150 520 150 740 70S1180 150 1480 36" fill="none" stroke="url(#gar)" strokeWidth="13" filter="url(#f-satin)" />
            <path d="M0 36C300 150 520 150 740 70S1180 150 1480 36" fill="none" stroke="#fff" strokeOpacity=".8" strokeWidth="1.2" strokeDasharray="2 5" transform="translate(0 -3)" />
          </svg>
          <button type="button" className="hang hang--strip" style={{ left: layout === 'land' ? '10%' : '15%', top: 92 }} onClick={() => onOpen('photobooth')} disabled={busy} aria-label="Photo booth strips (opens Photo Booth)">
            <span className="pin" /><span className="strip"><Photo v="a" /><Photo v="b" /><Photo v="c" /><Photo v="d" /></span>
            <span className="obj__tag">Photo Booth</span>
          </button>
          <div className="hang hang--polaroid" style={{ left: layout === 'land' ? '31%' : '33%', top: 112 }} aria-hidden="true">
            <span className="pin" /><span className="polaroid"><Avatar className="ph ph--portrait" /><i>Swen</i></span>
          </div>
          <div className="hang hang--card" style={{ left: layout === 'land' ? '66%' : '64%', top: 104 }} aria-hidden="true">
            <span className="pin" /><span className="aerocard"><svg viewBox="0 0 100 100" className="aerocard__globe"><circle cx="50" cy="50" r="40" fill="url(#g-iris)" stroke="#bfe0e4" /><g fill="none" stroke="#fff" strokeWidth="1.6"><ellipse cx="50" cy="50" rx="40" ry="14" /><ellipse cx="50" cy="50" rx="14" ry="40" /><path d="M10 50H90M50 10V90" /></g></svg></span>
          </div>
          <button type="button" className="hang hang--strip hang--strip2" style={{ left: '82%', top: 66 }} onClick={() => onOpen('photobooth')} disabled={busy} aria-label="Photo booth strip (opens Photo Booth)">
            <span className="pin" /><span className="strip"><Photo v="c" /><Photo v="a" /><Photo v="d" /><Photo v="b" /></span>
            <span className="obj__tag">Photo Booth</span>
          </button>
        </Decor>

        <Obj id="rosettes" label="Awards" app="awards" {...common}>
          <span className="rosette rosette--a" dangerouslySetInnerHTML={{ __html: rosettes[0] }} />
          <span className="rosette rosette--b" dangerouslySetInnerHTML={{ __html: rosettes[1] }} />
          <span className="pearl pearl--a" /><span className="pearl pearl--b" />
        </Obj>

        <Obj id="lanyard" label="About me" app="about" {...common}>
          <span className="hook" />
          <span className="lanyard__swing">
          <span className="lanyard__strap" />
          <span className="lanyard__clip" />
          <span className="idcard">
            <Glint x="18%" y="12%" d="1.2s" />
            <span className="idcard__slot" />
            <span className="idcard__head">SMU · Student</span>
            <span className="idcard__photo"><Avatar /></span>
            <span className="idcard__name">Swen Teo</span>
            <span className="idcard__sub">Information Systems</span>
            <span className="idcard__bar" />
          </span>
          </span>
        </Obj>

        {/* table: flat things lie in perspective */}
        <Decor id="doily" {...{ pos }} className="flat">
          <span className="doily" dangerouslySetInnerHTML={{ __html: doily }} />
        </Decor>

        <Obj id="planner" label="Experience" app="experience" flat {...common}>
          <span className="planner">
            <span className="planner__lace" />
            <span className="planner__plate">Experience</span>
            <span className="planner__years">2019 – 2026</span>
            <span className="planner__band" />
            <span className="planner__ribbon" />
            <span className="bandage bandage--onplanner"><span /></span>
          </span>
        </Obj>

        <Obj id="cds" label="Projects" app="projects" flat {...common}>
          <span className="cdstack">
            <span className="jewel jewel--3" /><span className="jewel jewel--2" />
            <span className="jewel jewel--1"><Glint x="82%" y="14%" d="3.1s" /><span className="jewel__insert"><b>Selected</b><i>projects</i><small>5 tracks</small></span></span>
            <span className="disc"><span className="disc__label">QUESTPASS · EN-TIRE-LY OVERRATED? · VALU$ · HUNGRYHUB · PII GUARD ·</span></span>
          </span>
        </Obj>

        <Obj id="stickers" label="Skills" app="skills" flat {...common}>
          <span className="stickers">
            <span className="stickers__title">Skills &amp; tools</span>
            {['JavaScript', 'Python', 'Vue', 'React', 'SQL', 'Tableau', 'Power BI', 'Pandas', 'PHP'].map((s, i) => (
              <span key={s} className={`dome dome--${i % 3}`}>{s}</span>
            ))}
            <span className="dome dome--star"><svg viewBox="0 0 100 100"><use href="#star" /></svg></span>
            <span className="dome dome--heart"><svg viewBox="0 0 100 94"><use href="#heart" /></svg></span>
          </span>
        </Obj>

        <Obj id="phone" label="Contact" app="mail" flat {...common}>
          <span className="flip">
            <span className="flip__hinge" />
            <span className="flip__screen"><b>{'✉'}</b> 1 new</span>
            <Glint x="70%" y="12%" d="2.4s" />
            <span className="flip__lens" />
            <span className="flip__chain" />
            <span className="flip__charm"><svg viewBox="0 0 44 64"><use href="#note" /></svg></span>
          </span>
        </Obj>

        <Obj id="camera" label="Photo Booth" app="photobooth" {...common}>
          <span className="camera">
            <span className="camera__top"><span className="camera__shutter" /><span className="camera__power" /></span>
            <span className="camera__body">
              <span className="camera__flash" />
              <span className="camera__af" />
              <span className="camera__lens"><span className="camera__glass" /><Glint x="30%" y="26%" d="0s" /></span>
              <span className="camera__brand">DIGITAL CAMERA</span>
              <span className="camera__spec">4× ZOOM</span>
            </span>
            <span className="camera__strap">
              <svg viewBox="0 0 60 150"><path d="M8 0C4 40 30 60 26 96" fill="none" stroke="#f2cad8" strokeWidth="7" strokeLinecap="round" /><path d="M8 0C4 40 30 60 26 96" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="1.5" strokeDasharray="2 4" /><use href="#heart" x="12" y="94" width="30" height="28" fill="url(#g-pink)" stroke="#e2a3bb" strokeWidth="3" /><use href="#gem" x="30" y="124" width="14" height="14" /></svg>
            </span>
          </span>
        </Obj>

        <Decor id="lotus" {...{ pos }}>
          <span className="bowl"><span className="bowl__water" /><svg className="bowl__lotus" viewBox="0 0 200 134"><use href="#lotus" /></svg><span className="bowl__glass" /></span>
        </Decor>

        <Obj id="ipod" label="Playlist" app="music" className={playing ? 'is-playing' : ''} {...common}>
          <span className="ipod">
            <span className="ipod__screen">
              <span className="ipod__bar">{playing ? 'Now Playing' : 'Music'}</span>
              <span className="ipod__eq"><i /><i /><i /><i /><i /></span>
            </span>
            <span className="ipod__wheel"><span>MENU</span><b /></span>
          </span>
          <span className="ipod__notes" aria-hidden="true">
            <svg viewBox="0 0 44 64"><use href="#note" /></svg>
            <svg viewBox="0 0 56 64"><use href="#notes" /></svg>
            <svg viewBox="0 0 44 64"><use href="#note" /></svg>
          </span>
        </Obj>

        <Decor id="earbuds" {...{ pos }} className="flat">
          <svg className="earbuds" viewBox="0 0 170 120">
            <path d="M30 30C40 80 90 60 100 96S40 116 2 108M70 26C66 60 96 70 100 96" fill="none" stroke="#f5f4f6" strokeWidth="3.4" strokeLinecap="round" />
            <path d="M30 30C40 80 90 60 100 96S40 116 2 108M70 26C66 60 96 70 100 96" fill="none" stroke="#cfcbd3" strokeWidth=".8" strokeLinecap="round" transform="translate(.8 1)" />
            <g fill="#fff" stroke="#d6d2da"><ellipse cx="28" cy="22" rx="11" ry="13" /><ellipse cx="70" cy="18" rx="11" ry="13" /></g>
            <g fill="#e9e6ec"><ellipse cx="28" cy="20" rx="6" ry="7" /><ellipse cx="70" cy="16" rx="6" ry="7" /></g>
          </svg>
        </Decor>

        <Decor id="note" {...{ pos }} className="flat">
          <span className="sticky">Click the MacBook to log in, or pick up anything on the desk.</span>
        </Decor>
        <Decor id="bandageA" {...{ pos }} className="flat"><span className="bandage bandage--blush"><span /><Glint x="50%" y="40%" d="4s" /></span></Decor>
        <Decor id="bandageB" {...{ pos }} className="flat"><span className="bandage bandage--mint"><span /></span></Decor>
        <Decor id="charms" {...{ pos }} className="flat">
          <svg className="loosecharms" viewBox="0 0 120 120">
            <use href="#heartkey" x="0" y="50" width="110" height="40" transform="rotate(-24 55 70)" />
            <use href="#clef" x="74" y="0" width="26" height="60" stroke="url(#g-silver)" />
            <use href="#tooth" x="8" y="6" width="34" height="40" fill="url(#g-iris)" stroke="#c3c8d6" strokeWidth="3" />
          </svg>
          <Glint x="30%" y="55%" d="1.8s" />
        </Decor>

        <MacBook screenRef={screenRef} onOpen={onOpen} pos={pos} disabled={busy} />
      </div>
    </div>
  );
}
