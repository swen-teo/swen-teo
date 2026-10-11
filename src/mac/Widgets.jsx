import { useEffect, useState } from 'react';
import { TRACK, useMusic } from '../music/MusicProvider.jsx';
import './widgets.css';

/* ---------- 1. Analog Clock Widget (Pastel Edition) ---------- */
export function ClockWidget() {
  const [now, setNow] = useState(new Date());
  const [isSGT, setIsSGT] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Singapore is UTC+8
  const date = isSGT
    ? new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Singapore' }))
    : now;

  const sec = date.getSeconds();
  const min = date.getMinutes() + sec / 60;
  const hr = (date.getHours() % 12) + min / 60;

  const secDeg = sec * 6;
  const minDeg = min * 6;
  const hrDeg = hr * 30;

  return (
    <div
      className="widget-clock"
      onClick={() => setIsSGT((s) => !s)}
      title="Click to toggle Singapore (SGT) and Local time"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setIsSGT((s) => !s)}
    >
      <div className="wclock__bezel">
        <svg viewBox="0 0 140 140" className="wclock__dial" aria-label="Analog Clock">
          <defs>
            {/* Soft creamy white to delicate mint-pearl radial face */}
            <radialGradient id="wc-face" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#faf9fc" />
              <stop offset="100%" stopColor="#edf5f6" />
            </radialGradient>
            {/* Polished silver-grey bezel rim */}
            <linearGradient id="wc-rim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#ece9f0" />
              <stop offset="70%" stopColor="#c5bfcd" />
              <stop offset="100%" stopColor="#dad5e0" />
            </linearGradient>
            {/* Convex glass dome reflection */}
            <linearGradient id="wc-glass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
              <stop offset="55%" stopColor="#ffffff" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Outer Bezel Rim */}
          <circle cx="70" cy="70" r="68" fill="url(#wc-rim)" stroke="#b8b2bf" strokeWidth="1.5" />
          {/* Dial Face */}
          <circle cx="70" cy="70" r="61" fill="url(#wc-face)" stroke="#ded9e4" strokeWidth="1.5" />

          {/* Hour Ticks */}
          {Array.from({ length: 12 }, (_, i) => {
            const major = i % 3 === 0;
            return (
              <line
                key={i}
                x1="70"
                y1={major ? "14" : "16"}
                x2="70"
                y2={major ? "22" : "19"}
                stroke={major ? "#4b4650" : "#a8a2ad"}
                strokeWidth={major ? "2.2" : "1.2"}
                strokeLinecap="round"
                transform={`rotate(${i * 30} 70 70)`}
              />
            );
          })}

          {/* Hour Numerals */}
          <text x="70" y="30" textAnchor="middle" fill="#4b4650" fontSize="11" fontWeight="700" fontFamily="var(--f-ui)">12</text>
          <text x="113" y="74" textAnchor="middle" fill="#4b4650" fontSize="11" fontWeight="700" fontFamily="var(--f-ui)">3</text>
          <text x="70" y="117" textAnchor="middle" fill="#4b4650" fontSize="11" fontWeight="700" fontFamily="var(--f-ui)">6</text>
          <text x="27" y="74" textAnchor="middle" fill="#4b4650" fontSize="11" fontWeight="700" fontFamily="var(--f-ui)">9</text>

          {/* City Subtitle (Mint Ink) */}
          <text x="70" y="93" textAnchor="middle" fill="#437a83" fontSize="7.5" fontWeight="700" letterSpacing="1.2" fontFamily="var(--f-ui)">
            {isSGT ? 'SINGAPORE' : 'LOCAL'}
          </text>

          {/* Hour Hand (Dark Ink) */}
          <g transform={`rotate(${hrDeg} 70 70)`}>
            <polygon points="68,74 72,74 71,36 69,36" fill="#4b4650" filter="drop-shadow(0 1.5px 2px rgba(80,60,80,0.3))" />
          </g>

          {/* Minute Hand (Dark Ink) */}
          <g transform={`rotate(${minDeg} 70 70)`}>
            <polygon points="68.5,76 71.5,76 70.8,24 69.2,24" fill="#58525f" filter="drop-shadow(0 2px 2px rgba(80,60,80,0.3))" />
          </g>

          {/* Second Hand (Pastel Blush Pink) */}
          <g transform={`rotate(${secDeg} 70 70)`}>
            <line x1="70" y1="84" x2="70" y2="19" stroke="#e88fae" strokeWidth="1.3" strokeLinecap="round" />
            <circle cx="70" cy="80" r="2.5" fill="#e88fae" />
          </g>

          {/* Center Hub */}
          <circle cx="70" cy="70" r="3.5" fill="#ffffff" stroke="#c0b9c7" strokeWidth="1" />
          <circle cx="70" cy="70" r="1.5" fill="#e88fae" />

          {/* Convex Glass Dome Glare */}
          <path d="M16 56 C26 24 114 24 124 56 C100 46 40 46 16 56 Z" fill="url(#wc-glass)" />
        </svg>
      </div>
    </div>
  );
}

/* ---------- 2. Weather Widget (Pastel Mint & White Capsule) ---------- */
export function WeatherWidget() {
  const [faren, setFaren] = useState(false);

  return (
    <div
      className="widget-weather"
      onClick={() => setFaren((f) => !f)}
      title="Click to toggle °C / °F"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setFaren((f) => !f)}
    >
      <div className="wweather__glass" />
      <div className="wweather__header">
        <span className="wweather__city">Singapore</span>
        <span className="wweather__badge">Sunny</span>
      </div>

      <div className="wweather__body">
        <div className="wweather__art">
          {/* Sun & Cloud Vector (Pastel Gold & White) */}
          <svg viewBox="0 0 64 64" className="wweather__icon">
            <defs>
              <radialGradient id="ww-sun" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff9e6" />
                <stop offset="60%" stopColor="#fcd077" />
                <stop offset="100%" stopColor="#f5aa67" />
              </radialGradient>
              <linearGradient id="ww-cld" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#edf5f7" />
              </linearGradient>
            </defs>
            {/* Sun */}
            <circle cx="38" cy="24" r="13" fill="url(#ww-sun)" filter="drop-shadow(0 0 6px rgba(252, 208, 119, 0.6))" />
            {/* Fluffy White Cloud */}
            <path
              d="M16 46 A 11 11 0 0 1 26 28 A 13 13 0 0 1 48 32 A 9 9 0 0 1 54 46 Z"
              fill="url(#ww-cld)"
              stroke="#cbe0e4"
              strokeWidth="0.8"
              filter="drop-shadow(0 3px 5px rgba(80, 110, 120, 0.2))"
            />
          </svg>
        </div>

        <div className="wweather__temp">
          <span className="wweather__val">{faren ? '88°' : '31°'}</span>
          <span className="wweather__unit">{faren ? 'F' : 'C'}</span>
        </div>
      </div>

      <div className="wweather__footer">
        <span>H: {faren ? '90°' : '32°'}</span>
        <span>L: {faren ? '79°' : '26°'}</span>
        <span className="wweather__tag">Tropical Breeze</span>
      </div>
    </div>
  );
}

/* ---------- 3. Mini Now Playing Controller Widget ---------- */
export function NowPlayingWidget() {
  const music = useMusic();
  const playing = music?.playing;

  return (
    <div className="widget-music" aria-label="Now Playing Widget">
      <div className="wmusic__disc-wrap">
        <div className={`wmusic__disc ${playing ? 'is-spinning' : ''}`}>
          <div className="wmusic__groove" />
          <div className="wmusic__center">
            <use href="#lotus" />
          </div>
        </div>
      </div>

      <div className="wmusic__info">
        <div className="wmusic__title">{TRACK.title}</div>
        <div className="wmusic__sub">{TRACK.by}</div>
        <div className="wmusic__bars" aria-hidden="true">
          <span className={`bar ${playing ? 'anim' : ''}`} style={{ '--d': '0.1s' }} />
          <span className={`bar ${playing ? 'anim' : ''}`} style={{ '--d': '0.3s' }} />
          <span className={`bar ${playing ? 'anim' : ''}`} style={{ '--d': '0.2s' }} />
          <span className={`bar ${playing ? 'anim' : ''}`} style={{ '--d': '0.4s' }} />
        </div>
      </div>

      <div className="wmusic__btns">
        <button
          type="button"
          className="wmusic__btn"
          onClick={music?.togglePlay}
          aria-label={playing ? 'Pause music' : 'Play music'}
        >
          {playing ? (
            <svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" fill="currentColor" rx="1" /><rect x="14" y="4" width="4" height="16" fill="currentColor" rx="1" /></svg>
          ) : (
            <svg viewBox="0 0 24 24"><polygon points="6,4 20,12 6,20" fill="currentColor" /></svg>
          )}
        </button>
        <button
          type="button"
          className="wmusic__btn"
          onClick={music?.toggleMute}
          aria-label={music?.muted ? 'Unmute' : 'Mute'}
        >
          {music?.muted ? (
            <svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" /><path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          ) : (
            <svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" /><path d="M16 9a4 4 0 0 1 0 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" /></svg>
          )}
        </button>
      </div>
    </div>
  );
}

/* ---------- 4. Interactive Mintish-Blue Sticky Note (To-Do List) ---------- */
export function TodoStickyWidget() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Explore Mac portfolio', done: true },
    { id: 2, text: 'Check out iTunes projects', done: true },
    { id: 3, text: 'Snap photo in Photo Booth', done: false },
  ]);

  const toggle = (id) => {
    setTodos((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <aside className="stickies stickies--todo" aria-label="To Do List">
      <p>Today's To-Do</p>
      <ul className="todo-list">
        {todos.map((t) => (
          <li key={t.id} onClick={() => toggle(t.id)} role="checkbox" aria-checked={t.done} tabIndex={0} onKeyDown={(e) => e.key === ' ' && toggle(t.id)}>
            <span className={`todo-check ${t.done ? 'is-done' : ''}`}>{t.done ? '✓' : ''}</span>
            <span className={`todo-text ${t.done ? 'is-done' : ''}`}>{t.text}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

