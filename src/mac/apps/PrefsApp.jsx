import { useState } from 'react';
import { SITE } from '../../data/content.js';
import './apps.css';

const ABBR = {
  JavaScript: 'JS', TypeScript: 'TS', Python: 'Py', PHP: 'php', HTML: '</>', CSS: '{ }', Vue: 'V', React: '⚛', Axios: 'ax', Bootstrap: 'B',
  'Tailwind CSS': 'tw', Firebase: 'fb', SQL: 'SQL', Pandas: 'pd', Matplotlib: 'plt', Seaborn: 'sns', 'scikit-learn': 'sk', 'Jupyter Notebook': 'nb',
  Tableau: 'Tb', 'Power BI': 'BI', 'Graphic design': 'Aa', Canva: 'Cv', Excel: 'xl', 'Microsoft Office': 'Of', Java: 'Jv', Flask: 'Fl',
};
// Skill names as they appear in project tags, where they differ.
const ALIAS = { Vue: ['Vue 3'], 'scikit-learn': ['scikit-learn'], Python: ['Python'], Tableau: ['Tableau'] };

const usedIn = (skill) => {
  const names = [skill, ...(ALIAS[skill] || [])];
  return SITE.projects.filter((p) => p.tags.some((t) => names.includes(t))).map((p) => p.title);
};

/* System Preferences "Show All" grid; selecting a skill shows where it was used. */
export default function PrefsApp({ onOpen }) {
  const [sel, setSel] = useState(null);
  const used = sel ? usedIn(sel.skill) : [];
  return (
    <div className="prefs">
      <div className="prefs__bar">
        <button type="button" className="aqua" onClick={() => setSel(null)} disabled={!sel}>Show All</button>
        <span className="prefs__hint">{sel ? sel.group : `${SITE.skills.reduce((n, g) => n + g.items.length, 0)} skills in ${SITE.skills.length} groups`}</span>
      </div>
      <div className="prefs__body">
        {SITE.skills.map((g, gi) => (
          <section key={g.name} className={`prefs__row ${gi % 2 ? 'prefs__row--alt' : ''}`}>
            <h3>{g.name}</h3>
            <div className="prefs__grid">
              {g.items.map((s) => (
                <button key={s} type="button" className={`pane pane--${g.tone} ${sel?.skill === s ? 'is-sel' : ''}`} onClick={() => setSel({ skill: s, group: g.name })} aria-pressed={sel?.skill === s}>
                  <span className="pane__icon">{ABBR[s] || s.slice(0, 2)}</span>
                  <span className="pane__name">{s}</span>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
      <footer className="prefs__info" aria-live="polite">
        {sel ? (
          <>
            <b>{sel.skill}</b>
            {used.length ? <> · used in {used.join(', ')} <button type="button" className="linkish" onClick={() => onOpen('projects')}>Open projects</button></> : sel.group === 'Currently learning' ? ' · currently learning' : ' · from coursework and roles'}
          </>
        ) : 'Select a skill to see which projects used it.'}
      </footer>
    </div>
  );
}
