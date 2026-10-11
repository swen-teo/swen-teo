import { useMemo, useState } from 'react';
import { SITE } from '../../data/content.js';
import './apps.css';

const CALS = [
  { id: 'work', name: 'Work', color: 'mint' },
  { id: 'lead', name: 'Leadership', color: 'blush' },
  { id: 'vol', name: 'Volunteering', color: 'dove' },
];

function MiniMonth() {
  const today = new Date();
  const first = new Date(today.getFullYear(), today.getMonth(), 1);
  const days = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const lead = (first.getDay() + 6) % 7; // Monday first
  const cells = [...Array(lead).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  return (
    <div className="mini">
      <div className="mini__head">{today.toLocaleString('en', { month: 'long', year: 'numeric' })}</div>
      <div className="mini__grid">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={i} className="mini__dow">{d}</span>)}
        {cells.map((d, i) => <span key={i} className={d === today.getDate() ? 'is-today' : ''}>{d || ''}</span>)}
      </div>
    </div>
  );
}

/* iCal-style list of roles, filtered by "calendar". */
export default function CalendarApp() {
  const [on, setOn] = useState({ work: true, lead: true, vol: true });
  const [sel, setSel] = useState(0);
  const items = useMemo(() => SITE.experience.map((e, i) => ({ ...e, i })).filter((e) => on[e.type]), [on]);
  const current = SITE.experience[sel];
  return (
    <div className="cal">
      <aside className="cal__side">
        <h3 className="side__h">Calendars</h3>
        {CALS.map((c) => (
          <label key={c.id} className={`cal__check cal__check--${c.color}`}>
            <input type="checkbox" checked={on[c.id]} onChange={() => setOn({ ...on, [c.id]: !on[c.id] })} />
            <span className="cal__box" />{c.name}
            <small>{SITE.experience.filter((e) => e.type === c.id).length}</small>
          </label>
        ))}
        <MiniMonth />
      </aside>
      <div className="cal__list" role="listbox" aria-label="Roles">
        {items.map((e) => (
          <button key={e.i} type="button" role="option" aria-selected={sel === e.i} className={`event event--${CALS.find((c) => c.id === e.type).color} ${sel === e.i ? 'is-sel' : ''}`} onClick={() => setSel(e.i)}>
            <span className="event__when">{e.when}</span>
            <span className="event__role">{e.role}</span>
            <span className="event__org">{e.org}</span>
          </button>
        ))}
        {!items.length && <p className="cal__empty">Tick a calendar to show its roles.</p>}
      </div>
      <article className="cal__detail" aria-live="polite">
        {current && (
          <>
            <span className={`chip chip--${CALS.find((c) => c.id === current.type).color}`}>{CALS.find((c) => c.id === current.type).name}</span>
            <h2>{current.role}</h2>
            <p className="cal__org">{current.org}</p>
            <p className="cal__when">{current.when}</p>
            <p className="cal__text">{current.text}</p>
          </>
        )}
      </article>
    </div>
  );
}
