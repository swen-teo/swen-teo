import { useState } from 'react';
import Avatar from '../../lib/Avatar.jsx';
import './apps.css';

const ROWS = [
  ['School', 'Singapore Management University'],
  ['Faculty', 'School of Computing and Information Systems'],
  ['Degree', 'BSc (Information Systems)'],
  ['Track', 'Product Development / Business Analytics'],
  ['Year', 'Penultimate year · Aug 2024 – Aug 2028 (expected)'],
  ['Based in', 'Singapore'],
  ['Status', 'Open to internships'],
];

/* "About This Mac", but about Swen. */
export default function AboutApp({ onOpen }) {
  const [more, setMore] = useState(false);
  return (
    <div className="about">
      <div className="about__orb"><Avatar /></div>
      <h1 className="about__name">Swen Teo</h1>
      <p className="about__ver">Information Systems undergraduate</p>

      {!more ? (
        <>
          <dl className="about__rows">
            {ROWS.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
          </dl>
          <div className="about__btns">
            <button type="button" className="aqua aqua--blush" onClick={() => setMore(true)}>More Info…</button>
            <button type="button" className="aqua" onClick={() => onOpen('mail')}>Contact</button>
          </div>
        </>
      ) : (
        <div className="about__more">
          <p className="about__lead">Third-year Information Systems undergraduate at Singapore Management University, focusing on Product Development and Business Analytics.</p>
          <p>Most of my work involves building frontend applications in Vue and React, processing data in Python and SQL, and designing dashboards in Tableau and Power BI. I focus on creating responsive, usable tools with clean code and practical data insights.</p>
          <p>Outside of classes, I serve as a Teaching Assistant for SMU's Web Application Development II module, teach math and reading at Kumon, and handle event marketing for the SMU Blockchain Club.</p>
          <h3>Education</h3>
          <p><b>Singapore Management University</b><br />BSc (Information Systems), Product Development / Business Analytics<br /><span className="when">Aug 2024 – Aug 2028 (expected)</span></p>
          <p><b>Temasek Junior College</b><br />Integrated Programme, Science stream<br /><span className="when">Jan 2018 – Dec 2023</span></p>
          <div className="about__btns">
            <button type="button" className="aqua" onClick={() => setMore(false)}>Back</button>
            <button type="button" className="aqua aqua--mint" onClick={() => onOpen('experience')}>Experience</button>
            <button type="button" className="aqua aqua--blush" onClick={() => onOpen('projects')}>Projects</button>
          </div>
        </div>
      )}
      <p className="about__foot">© 2026 Swen Teo</p>
    </div>
  );
}
