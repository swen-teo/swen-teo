import { useState } from 'react';
import './apps.css';

const TO = 'swenteo3993@gmail.com';

/* Compose window. "Send" hands the message to the visitor's own mail app. */
export default function MailApp() {
  const [subject, setSubject] = useState('Internship opportunity');
  const [body, setBody] = useState('');
  const href = `mailto:${TO}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;
  return (
    <div className="mail">
      <div className="mail__toolbar">
        <a className="mail__tool mail__tool--send" href={href}>
          <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M3 15L29 4L22 28L15 19Z" fill="#f2cad8" stroke="#c98aa2" strokeWidth="1.4" strokeLinejoin="round" /><path d="M15 19L29 4" stroke="#c98aa2" strokeWidth="1.4" /></svg>
          Send
        </a>
        <a className="mail__tool" href="https://www.linkedin.com/in/swen-teo" target="_blank" rel="noopener">LinkedIn ↗</a>
        <a className="mail__tool" href="https://github.com/swen-teo" target="_blank" rel="noopener">GitHub ↗</a>
        <a className="mail__tool" href="https://devpost.com/swen-teo" target="_blank" rel="noopener">Devpost ↗</a>
      </div>
      <div className="mail__fields">
        <div className="mail__row"><span>To:</span><a className="mail__pill" href={`mailto:${TO}`}>Swen Teo &lt;{TO}&gt;</a></div>
        <label className="mail__row"><span>Subject:</span><input value={subject} onChange={(e) => setSubject(e.target.value)} /></label>
      </div>
      <label className="sr-only" htmlFor="mail-body">Message</label>
      <textarea id="mail-body" className="mail__body" value={body} onChange={(e) => setBody(e.target.value)}
        placeholder="Write your message here. Send opens it in your email app, ready to go." />
      <p className="mail__note">I’m looking for internships in product development, front-end engineering and business analytics. Email is the fastest way to reach me.</p>
    </div>
  );
}
