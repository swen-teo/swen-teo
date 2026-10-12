import './apps.css';

export default function ResumeApp({ onOpen }) {
  return (
    <div className="resume-app">
      <div className="resume-toolbar">
        <span className="resume-page-badge">Page 1 of 1</span>
        <span className="resume-scale">100%</span>
        <div className="resume-actions">
          <a
            className="aqua aqua--blush"
            href="https://www.linkedin.com/in/swen-teo"
            target="_blank"
            rel="noopener"
          >
            LinkedIn ↗
          </a>
          <button type="button" className="aqua aqua--mint" onClick={() => onOpen('mail')}>
            Email Swen
          </button>
        </div>
      </div>

      <div className="resume-paper">
        <header className="resume-header">
          <h1 className="resume-title">Swen Teo</h1>
          <p className="resume-subtitle">
            Information Systems Undergraduate · Singapore Management University
          </p>
          <p className="resume-contact">
            Singapore · <a href="https://github.com/swen-teo" target="_blank" rel="noopener">github.com/swen-teo</a> · <a href="https://www.linkedin.com/in/swen-teo" target="_blank" rel="noopener">linkedin.com/in/swen-teo</a>
          </p>
        </header>

        <section className="resume-sec">
          <h2 className="resume-h2">Education</h2>
          <div className="resume-item">
            <div className="resume-row">
              <b>Singapore Management University (SMU)</b>
              <span className="resume-date">Aug 2024 – Aug 2028 (expected)</span>
            </div>
            <div className="resume-role">BSc (Information Systems) · Product Development / Business Analytics</div>
          </div>
          <div className="resume-item">
            <div className="resume-row">
              <b>Temasek Junior College</b>
              <span className="resume-date">Jan 2018 – Dec 2023</span>
            </div>
            <div className="resume-role">Integrated Programme (IP) · Science Stream</div>
          </div>
        </section>

        <section className="resume-sec">
          <h2 className="resume-h2">Experience</h2>
          <div className="resume-item">
            <div className="resume-row">
              <b>Teaching Assistant — Web Application Development II (IS216)</b>
              <span className="resume-date">Aug 2026 – Present</span>
            </div>
            <div className="resume-org">Singapore Management University</div>
            <p className="resume-desc">
              Guide students through building responsive full-stack web applications, assisting with architecture, frameworks (Vue 3, Vite, Firebase), and technical problem-solving during weekly lab sessions.
            </p>
          </div>
          <div className="resume-item">
            <div className="resume-row">
              <b>Marketing Director, Executive Committee</b>
              <span className="resume-date">2025 – Present</span>
            </div>
            <div className="resume-org">SMU Blockchain Club</div>
            <p className="resume-desc">
              Lead visual identity and digital marketing campaigns across events, workshops, and speaker panels, producing social graphics, slide decks, and promotional mailers.
            </p>
          </div>
          <div className="resume-item">
            <div className="resume-row">
              <b>Teaching Assistant</b>
              <span className="resume-date">Apr 2024 – Present</span>
            </div>
            <div className="resume-org">Kumon, Tampines Central 1</div>
            <p className="resume-desc">
              Support preschool and primary-level teaching in mathematics and English reading, prepare worksheets, guide students, and manage classroom administrative duties.
            </p>
          </div>
        </section>

        <section className="resume-sec">
          <h2 className="resume-h2">Featured Projects</h2>
          <div className="resume-grid">
            <div className="resume-card">
              <b>QuestPass</b> <span className="resume-tag">Vue 3 · Vite · Firebase</span>
              <p>Full-stack single-page application gamifying live events and concerts: fans complete on-site quests to earn presale access codes and rewards.</p>
            </div>
            <div className="resume-card">
              <b>En-tire-ly Overrated?</b> <span className="resume-tag">React · Tableau · NLP</span>
              <p>Data journalism story and sentiment analytics investigating whether Michelin recognition in Singapore matches customer reviews, hygiene grades, and value.</p>
            </div>
            <div className="resume-card">
              <b>Valu$ Trade Prime</b> <span className="resume-tag">React · Supabase · Python</span>
              <p>B2B digital transformation proposal and dual-portal ordering platform moving wholesale buyers onto subscription pricing with inventory forecasting.</p>
            </div>
            <div className="resume-card">
              <b>PII Guard</b> <span className="resume-tag">Python · DistilBERT · Flask</span>
              <p>On-device privacy security tool with DistilBERT and regex detecting and redacting sensitive personal information in prompts before cloud submission.</p>
            </div>
          </div>
        </section>

        <section className="resume-sec">
          <h2 className="resume-h2">Technical Competencies</h2>
          <p className="resume-skills">
            <b>Frontend & Web:</b> JavaScript (ES6+), TypeScript, Vue 3, React, HTML5, CSS3, Tailwind CSS<br />
            <b>Backend & Data:</b> Python, Flask, PHP, SQL, Pandas, scikit-learn, Firebase, Supabase<br />
            <b>Analytics & Design:</b> Tableau, Power BI, Canva, Figma
          </p>
        </section>
      </div>
    </div>
  );
}
