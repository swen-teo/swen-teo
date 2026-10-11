import { useEffect, useMemo, useRef, useState } from 'react';
import { SITE } from '../../data/content.js';
import './apps.css';

const LISTS = [
  { id: 'all', name: 'All Projects', ids: null },
  { id: 'web', name: 'Web apps', ids: ['questpass', 'entirely', 'valus', 'piiguard'] },
  { id: 'data', name: 'Data & analytics', ids: ['entirely', 'valus', 'hungryhub'] },
  { id: 'hack', name: 'Hackathon builds', ids: ['piiguard'] },
];

const MOTIF = {
  questpass: <svg viewBox="0 0 230 84"><use href="#heartkey" /></svg>,
  entirely: <svg viewBox="0 0 100 100"><use href="#star" fill="#fff" stroke="#a9d3d8" strokeWidth="4" /></svg>,
  valus: <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="url(#g-iris)" stroke="#bfe0e4" /><g fill="none" stroke="#fff" strokeWidth="2"><ellipse cx="50" cy="50" rx="40" ry="14" /><ellipse cx="50" cy="50" rx="14" ry="40" /><path d="M10 50H90M50 10V90" /></g><ellipse cx="38" cy="30" rx="16" ry="8" fill="#fff" opacity=".7" /></svg>,
  hungryhub: <svg viewBox="0 0 200 134"><use href="#lotus" /></svg>,
  piiguard: <svg viewBox="0 0 80 92"><use href="#tooth" fill="url(#g-iris)" stroke="#bfc4d2" strokeWidth="3" /></svg>,
};

export function Cover({ p, small }) {
  return (
    <div className={`cover cover--${p.id} ${small ? 'cover--sm' : ''}`}>
      <div className="cover__motif">{MOTIF[p.id]}</div>
      <div className="cover__text">
        <span className="cover__title">{p.title}</span>
        <span className="cover__by">Swen Teo · {p.year}</span>
      </div>
    </div>
  );
}

export default function ITunesApp({ compact }) {
  const [list, setList] = useState('all');
  const [q, setQ] = useState('');
  const [selId, setSelId] = useState(SITE.projects[0].id);
  const flowRef = useRef(null);

  const tracks = useMemo(() => {
    const L = LISTS.find((l) => l.id === list);
    const needle = q.trim().toLowerCase();
    return SITE.projects.filter((p) => (!L.ids || L.ids.includes(p.id)) && (!needle || [p.title, p.role, p.context, p.summary, ...p.tags].join(' ').toLowerCase().includes(needle)));
  }, [list, q]);

  useEffect(() => {
    if (tracks.length && !tracks.some((t) => t.id === selId)) setSelId(tracks[0].id);
  }, [tracks, selId]);

  const idx = Math.max(0, tracks.findIndex((t) => t.id === selId));
  const sel = tracks[idx] || SITE.projects[0];
  const step = (d) => tracks.length && setSelId(tracks[(idx + d + tracks.length) % tracks.length].id);
  const primary = sel.links[0];

  return (
    <div className={`itunes ${compact ? 'itunes--compact' : ''}`}>
      <div className="it__top">
        <div className="it__transport">
          <button type="button" className="it__btn" onClick={() => step(-1)} aria-label="Previous project"><svg viewBox="0 0 24 24"><path d="M5 5h2v14H5zM19 5v14L8 12z" /></svg></button>
          <button type="button" className="it__btn it__btn--play" onClick={() => primary && window.open(primary[1], '_blank', 'noopener')} disabled={!primary} aria-label={primary ? `Open ${primary[0]} for ${sel.title}` : 'No public link'}>
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </button>
          <button type="button" className="it__btn" onClick={() => step(1)} aria-label="Next project"><svg viewBox="0 0 24 24"><path d="M17 5h2v14h-2zM5 5v14l11-7z" /></svg></button>
        </div>
        <div className="it__lcd" aria-live="polite">
          <span className="it__lcd-title">{sel.title}</span>
          <span className="it__lcd-sub">{sel.role} · {sel.context}</span>
          <span className="it__lcd-meta">Track {SITE.projects.indexOf(sel) + 1} of {SITE.projects.length} · {sel.year}</span>
        </div>
        <label className="it__search">
          <span className="sr-only">Search projects</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" />
        </label>
      </div>

      <div className="it__main">
        <nav className="it__side" aria-label="Library">
          <h3 className="side__h">Library</h3>
          <button type="button" className={list === 'all' ? 'is-sel' : ''} onClick={() => setList('all')}>
            <svg viewBox="0 0 56 64"><use href="#notes" /></svg>All Projects<small>{SITE.projects.length}</small>
          </button>
          <h3 className="side__h">Playlists</h3>
          {LISTS.slice(1).map((l) => (
            <button key={l.id} type="button" className={list === l.id ? 'is-sel' : ''} onClick={() => setList(l.id)}>
              <svg viewBox="0 0 44 64"><use href="#note" /></svg>{l.name}<small>{l.ids.length}</small>
            </button>
          ))}
        </nav>

        <div className="it__content">
          <div className="flow" ref={flowRef} tabIndex={0} aria-label="Cover Flow. Use left and right arrow keys."
            onKeyDown={(e) => { if (e.key === 'ArrowLeft') step(-1); if (e.key === 'ArrowRight') step(1); }}>
            {tracks.map((p, i) => {
              const o = i - idx;
              const t = o === 0 ? 'translateX(-50%) translateZ(60px)' : `translateX(calc(-50% + ${o * (compact ? 34 : 46) + Math.sign(o) * (compact ? 90 : 130)}px)) rotateY(${o < 0 ? 62 : -62}deg)`;
              return (
                <button key={p.id} type="button" className="flow__item" style={{ transform: t, zIndex: 50 - Math.abs(o) }} onClick={() => setSelId(p.id)} aria-label={p.title} aria-current={o === 0}>
                  <Cover p={p} />
                </button>
              );
            })}
            {!tracks.length && <p className="flow__empty">No projects match “{q}”.</p>}
            <div className="flow__title">{sel.title}<small>{sel.role}</small></div>
          </div>

          <div className="it__split">
            <div className="tracks-wrap"><table className="tracks">
              <thead><tr><th>#</th><th>Name</th><th>Role</th><th>Year</th><th className="hide-sm">Stack</th></tr></thead>
              <tbody>
                {tracks.map((p) => (
                  <tr key={p.id} className={p.id === sel.id ? 'is-sel' : ''} onClick={() => setSelId(p.id)}>
                    <td>{SITE.projects.indexOf(p) + 1}</td>
                    <td><button type="button" className="tracks__name" onClick={() => setSelId(p.id)}>{p.title}</button></td>
                    <td>{p.role}</td>
                    <td>{p.year}</td>
                    <td className="hide-sm">{p.tags.slice(0, 3).join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table></div>
            <article className="liner">
              <h3>{sel.title}</h3>
              <p className="liner__ctx">{sel.context}</p>
              <p>{sel.summary}</p>
              <ul>{sel.notes.map((n) => <li key={n}>{n}</li>)}</ul>
              <div className="liner__tags">{sel.tags.map((t) => <span key={t}>{t}</span>)}</div>
              {sel.links.length > 0 && (
                <div className="liner__links">
                  {sel.links.map(([l, u]) => <a key={u} className="aqua aqua--blush" href={u} target="_blank" rel="noopener">{l} ↗</a>)}
                </div>
              )}
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
