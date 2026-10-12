import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import './music.css';

/* Looping background track using HTML5 Audio for the personal MP3 playlist.
   Loops seamlessly without any third-party embeds or external dependencies.
   Browsers require user interaction before unmuting, so audio starts muted
   and unmutes upon the first click or keypress. */

export const TRACK = {
  title: 'Swen’s Playlist',
  by: 'Audio Track',
  url: '/playlist.mp3',
};

const Ctx = createContext(null);
export const useMusic = () => useContext(Ctx);

export function MusicProvider({ children }) {
  const audioRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [volume, setVolumeState] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [open, setOpen] = useState(() => innerWidth >= 760);
  const wantPlay = useRef(true);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(TRACK.url);
    audio.loop = true;
    audio.volume = volume / 100;
    audio.muted = true;
    audioRef.current = audio;

    const onCanPlay = () => setReady(true);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMeta = () => setDuration(audio.duration || 0);

    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMeta);

    // Attempt to start muted autoplay
    audio.play().then(() => {
      setPlaying(true);
    }).catch(() => {
      // Browser blocked autoplay; will play on first interaction
    });

    return () => {
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMeta);
      audio.pause();
      audioRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Unlock audio & unmute on first visitor interaction
  useEffect(() => {
    const unlock = (e) => {
      if (e.target.closest?.('[data-music-control]')) return;
      const a = audioRef.current;
      if (!a) return;
      a.muted = false;
      setMuted(false);
      if (wantPlay.current) {
        a.play().catch(() => {});
      }
      remove();
    };

    const remove = () => {
      removeEventListener('pointerdown', unlock, true);
      removeEventListener('keydown', unlock, true);
    };

    addEventListener('pointerdown', unlock, true);
    addEventListener('keydown', unlock, true);
    return remove;
  }, []);

  const play = useCallback(() => {
    wantPlay.current = true;
    const a = audioRef.current;
    if (!a) return;
    a.muted = false;
    setMuted(false);
    a.play().catch(() => {});
  }, []);

  const pause = useCallback(() => {
    wantPlay.current = false;
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => (playing ? pause() : play()), [playing, play, pause]);

  const toggleMute = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (muted) {
      a.muted = false;
      setMuted(false);
      if (!playing && wantPlay.current) a.play().catch(() => {});
    } else {
      a.muted = true;
      setMuted(true);
    }
  }, [muted, playing]);

  const setVolume = useCallback((v) => {
    setVolumeState(v);
    const a = audioRef.current;
    if (!a) return;
    a.volume = v / 100;
    if (v > 0 && muted) {
      a.muted = false;
      setMuted(false);
    }
  }, [muted]);

  const seek = useCallback((time) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = time;
  }, []);

  const show = useCallback((v) => {
    setOpen(v);
  }, []);

  const value = {
    ready,
    playing,
    muted,
    volume,
    currentTime,
    duration,
    open,
    play,
    pause,
    toggle,
    toggleMute,
    setVolume,
    seek,
    show,
  };

  return (
    <Ctx.Provider value={value}>
      {children}
      <NowPlaying />
    </Ctx.Provider>
  );
}

/* ---------- The visible mini player ---------- */
function NowPlaying() {
  const m = useContext(Ctx);
  const [pos, setPos] = useState(null);
  const drag = useRef(null);

  const onDown = (e) => {
    if (e.target.closest('button, input, a')) return;
    const r = e.currentTarget.parentElement.getBoundingClientRect();
    drag.current = { dx: e.clientX - r.left, dy: e.clientY - r.top };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onMove = (e) => {
    if (!drag.current) return;
    setPos({
      x: Math.min(Math.max(0, e.clientX - drag.current.dx), innerWidth - 240),
      y: Math.min(Math.max(24, e.clientY - drag.current.dy), innerHeight - 60),
    });
  };

  const onUp = () => (drag.current = null);
  const style = pos ? { left: pos.x, top: pos.y, right: 'auto', bottom: 'auto' } : undefined;

  return (
    <aside
      className={`np ${m?.open ? '' : 'np--closed'} ${m?.playing ? 'is-playing' : ''}`}
      style={style}
      aria-label="Now playing"
      data-music-control
    >
      <div
        className="np__grip"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <span className="np__eq" aria-hidden="true">
          <i /><i /><i /><i />
        </span>
        <span className="np__label">
          {!m?.open
            ? 'Music (tap ♪ to play)'
            : m?.playing
            ? m.muted
              ? 'Muted'
              : 'Now playing'
            : 'Paused'}
        </span>
        <button
          type="button"
          className="np__fold"
          onClick={() => m?.show(!m.open)}
          aria-expanded={m?.open}
          aria-label={m?.open ? 'Hide player' : 'Show music player'}
        >
          {m?.open ? '–' : '♪'}
        </button>
      </div>

      <div className="np__body" hidden={!m?.open}>
        <div className="np__screen np__screen--art">
          <div className={`np__vinyl ${m?.playing ? 'is-spinning' : ''}`}>
            <div className="np__vinyl-groove" />
            <div className="np__vinyl-label">
              <svg viewBox="0 0 200 134"><use href="#lotus" /></svg>
            </div>
          </div>
        </div>

        <div className="np__meta">
          <span className="np__title">{TRACK.title}</span>
          <span className="np__by">{TRACK.by}</span>
        </div>

        <div className="np__ctrls">
          <button
            type="button"
            className="np__btn np__btn--main"
            onClick={m?.toggle}
            aria-label={m?.playing ? 'Pause' : 'Play'}
          >
            {m?.playing ? (
              <svg viewBox="0 0 24 24"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>
            ) : (
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            )}
          </button>
          <button
            type="button"
            className="np__btn"
            onClick={m?.toggleMute}
            aria-label={m?.muted ? 'Unmute' : 'Mute'}
            aria-pressed={m?.muted}
          >
            {m?.muted ? (
              <svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4zM16 9l5 6M21 9l-5 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            ) : (
              <svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z" /><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            )}
          </button>
          <label className="np__vol">
            <span className="sr-only">Volume</span>
            <input
              type="range"
              min="0"
              max="100"
              value={m?.muted ? 0 : m?.volume ?? 50}
              onChange={(e) => m?.setVolume(+e.target.value)}
            />
          </label>
        </div>
      </div>
    </aside>
  );
}
