import { useMemo, useState } from 'react';
import { SITE } from '../../data/content.js';
import { rosetteSVG } from '../../lib/motifs.js';
import './apps.css';

function Pass({ tone }) {
  const fill = { pink: '#f6d3df', mint: '#d3ecee', grey: '#e7e4e9' }[tone];
  return (
    <svg viewBox="0 0 100 130" className="pass-icon">
      <path d="M38 0h24l-4 40h-16z" fill={fill} stroke="#fff" strokeWidth="1.5" />
      <path d="M44 4v34M56 4v34" stroke="#fff" strokeDasharray="1 3" strokeLinecap="round" />
      <rect x="40" y="36" width="20" height="14" rx="4" fill="url(#g-silver)" stroke="#aea8b4" />
      <rect x="14" y="46" width="72" height="82" rx="10" fill="#fff" stroke="#e1dce4" />
      <rect x="14" y="46" width="72" height="26" rx="10" fill={fill} />
      <rect x="40" y="52" width="20" height="5" rx="2.5" fill="#fff" />
      <rect x="24" y="84" width="52" height="6" rx="3" fill="#cfcad3" />
      <rect x="24" y="96" width="40" height="5" rx="2.5" fill="#e1dde4" />
      <use href="#gem" x="62" y="108" width="14" height="14" />
    </svg>
  );
}

export default function FinderApp() {
  const [place, setPlace] = useState('awards');
  const [sel, setSel] = useState(0);
  const awards = useMemo(() => SITE.awards.map((a, i) => ({ ...a, svg: rosetteSVG({ ...a, id: `fa${i}` }) })), []);
  const items = place === 'awards' ? awards : SITE.competitions;
  const cur = items[sel] || items[0];

  return (
    <div className="finder">
      <nav className="finder__side" aria-label="Places">
        <h3 className="side__h">Places</h3>
        <button type="button" className={place === 'awards' ? 'is-sel' : ''} onClick={() => { setPlace('awards'); setSel(0); }}>
          <svg viewBox="0 0 100 100"><use href="#star" /></svg>Awards<small>{SITE.awards.length}</small>
        </button>
        <button type="button" className={place === 'comps' ? 'is-sel' : ''} onClick={() => { setPlace('comps'); setSel(0); }}>
          <svg viewBox="0 0 100 94"><use href="#heart" /></svg>Competitions<small>{SITE.competitions.length}</small>
        </button>
      </nav>
      <div className="finder__main">
        <div className="finder__path">Swen Teo ▸ {place === 'awards' ? 'Awards' : 'Competitions'}</div>
        <div className="finder__icons" role="listbox" aria-label={place === 'awards' ? 'Awards' : 'Competitions'}>
          {items.map((it, i) => (
            <button key={i} type="button" role="option" aria-selected={sel === i} className={`ficon ${sel === i ? 'is-sel' : ''}`} onClick={() => setSel(i)}>
              {place === 'awards' ? <span className="ficon__art" dangerouslySetInnerHTML={{ __html: it.svg }} /> : <span className="ficon__art"><Pass tone={it.tone} /></span>}
              <span className="ficon__name">{place === 'awards' ? it.caption.split(',')[0] : `${it.name} ${it.year}`}</span>
            </button>
          ))}
        </div>
        <aside className="finder__info" aria-live="polite">
          <h3>{place === 'awards' ? cur.caption : `${cur.name} · ${cur.year}`}</h3>
          {place === 'awards' ? (
            <p className="finder__meta">Award · {cur.lines[cur.lines.length - 1]}</p>
          ) : (
            <>
              <p>{cur.text}</p>
              {cur.link && <a className="aqua aqua--blush" href={cur.link[1]} target="_blank" rel="noopener">{cur.link[0]} ↗</a>}
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
