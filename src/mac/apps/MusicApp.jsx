import { TRACK, useMusic } from '../../music/MusicProvider.jsx';
import './apps.css';

function formatTime(s) {
  if (!s || isNaN(s)) return '0:00';
  const mins = Math.floor(s / 60);
  const secs = Math.floor(s % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default function MusicApp() {
  const music = useMusic();
  const playing = music?.playing;
  const cur = music?.currentTime || 0;
  const dur = music?.duration || 0;
  const progress = dur > 0 ? (cur / dur) * 100 : 0;

  return (
    <div className="ipodapp">
      <div className="ipodapp__screen">
        <div className="ipodapp__screen-hdr">
          <span className="ipodapp__badge">Now Playing</span>
          <span className="ipodapp__loop-tag">Looping</span>
        </div>

        <div className="ipodapp__body">
          <div className={`ipodapp__disc ${playing ? 'is-spinning' : ''}`}>
            <div className="ipodapp__disc-groove" />
            <div className="ipodapp__disc-label">
              <svg viewBox="0 0 200 134"><use href="#lotus" /></svg>
            </div>
          </div>

          <div className="ipodapp__track-info">
            <h2 className="ipodapp__title">{TRACK.title}</h2>
            <p className="ipodapp__artist">{TRACK.by}</p>
            <span className="ipodapp__badge-pill">MP3 Audio · Looping</span>
          </div>
        </div>

        <div className="ipodapp__progress-wrap">
          <div className="ipodapp__time-row">
            <span>{formatTime(cur)}</span>
            <span>{dur > 0 ? formatTime(dur) : '--:--'}</span>
          </div>
          <div
            className="ipodapp__bar"
            role="slider"
            aria-valuenow={cur}
            aria-valuemax={dur}
            tabIndex={0}
            onClick={(e) => {
              if (!dur) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = (e.clientX - rect.left) / rect.width;
              music?.seek(pct * dur);
            }}
          >
            <div className="ipodapp__bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="ipodapp__controls">
        <button
          type="button"
          className="aqua aqua--blush ipodapp__ctrl-btn"
          onClick={music?.toggle}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? 'Pause' : 'Play'}
        </button>
        <button
          type="button"
          className="aqua aqua--mint ipodapp__ctrl-btn"
          onClick={music?.toggleMute}
          aria-label={music?.muted ? 'Unmute' : 'Mute'}
        >
          {music?.muted ? 'Unmute' : 'Mute'}
        </button>
        <div className="ipodapp__vol">
          <span className="ipodapp__vol-label">Volume:</span>
          <input
            type="range"
            min="0"
            max="100"
            value={music?.muted ? 0 : music?.volume ?? 50}
            onChange={(e) => music?.setVolume(+e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
