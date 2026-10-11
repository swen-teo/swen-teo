/* Dock and desktop icons, drawn as glossy 128-unit SVGs. */
import { useMemo } from 'react';
import { rosetteSVG } from '../lib/motifs.js';

const Shine = ({ d = 'M18 22C40 8 88 8 110 22C100 40 28 40 18 22Z' }) => <path d={d} fill="#fff" opacity=".55" />;

export function IconAbout() {
  return (
    <svg viewBox="0 0 128 128">
      <defs>
        <linearGradient id="ia-card" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" /><stop offset=".5" stopColor="#f4ecf4" /><stop offset="1" stopColor="#e7f2f5" /></linearGradient>
      </defs>
      <rect x="20" y="10" width="88" height="112" rx="14" fill="url(#ia-card)" stroke="#dcd3de" strokeWidth="2" />
      <rect x="50" y="16" width="28" height="6" rx="3" fill="#ece4ec" />
      <circle cx="64" cy="54" r="22" fill="#e9f5f6" stroke="#fff" strokeWidth="4" />
      <circle cx="64" cy="54" r="24.5" fill="none" stroke="#bfe0e4" strokeWidth="1.5" />
      <use href="#lotus" x="46" y="40" width="36" height="26" />
      <rect x="36" y="86" width="56" height="7" rx="3.5" fill="#d9a8bb" />
      <rect x="44" y="99" width="40" height="5" rx="2.5" fill="#cfcad3" />
      <path d="M24 16C50 6 90 8 104 22L104 50C80 30 46 26 24 40Z" fill="#fff" opacity=".45" />
    </svg>
  );
}

export function IconCalendar() {
  const d = new Date();
  const mon = d.toLocaleString('en', { month: 'short' }).toUpperCase();
  return (
    <svg viewBox="0 0 128 128">
      <defs>
        <linearGradient id="ic-head" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f8dbe5" /><stop offset=".5" stopColor="#eeb9cb" /><stop offset=".52" stopColor="#e6a6bd" /><stop offset="1" stopColor="#efc0d0" /></linearGradient>
        <linearGradient id="ic-page" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#efedf1" /></linearGradient>
      </defs>
      <rect x="14" y="22" width="100" height="96" rx="10" fill="#d9d5dc" transform="translate(2 3)" opacity=".5" />
      <rect x="14" y="20" width="100" height="96" rx="10" fill="url(#ic-page)" stroke="#d6d1d9" strokeWidth="1.5" />
      <path d="M14 30a10 10 0 0 1 10-10h80a10 10 0 0 1 10 10v16H14Z" fill="url(#ic-head)" />
      <text x="64" y="40" textAnchor="middle" fontFamily="Figtree, sans-serif" fontWeight="700" fontSize="15" fill="#fff" letterSpacing="2">{mon}</text>
      <text x="64" y="100" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontWeight="600" fontSize="54" fill="#5d5762">{d.getDate()}</text>
      {[34, 54, 74, 94].map((x) => <rect key={x} x={x - 3} y="12" width="6" height="16" rx="3" fill="url(#g-silver)" stroke="#b7b1bc" strokeWidth=".8" />)}
      <path d="M100 116L114 102V108A8 8 0 0 1 106 116Z" fill="#e3dfe6" />
    </svg>
  );
}

export function IconMusic() {
  return (
    <svg viewBox="0 0 128 128">
      <defs>
        <radialGradient id="im-groove" cx=".5" cy=".5" r=".5"><stop offset=".25" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#fff" stopOpacity=".4" /></radialGradient>
        <linearGradient id="im-rim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fbe1ea" /><stop offset=".25" stopColor="#fff" /><stop offset=".5" stopColor="#d4eef0" /><stop offset=".75" stopColor="#f1eaf8" /><stop offset="1" stopColor="#f7d3df" /></linearGradient>
      </defs>
      <circle cx="64" cy="64" r="56" fill="url(#im-rim)" stroke="#d7d2db" strokeWidth="1.5" />
      {[50, 44, 38, 32].map((r) => <circle key={r} cx="64" cy="64" r={r} fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth=".8" />)}
      <circle cx="64" cy="64" r="56" fill="url(#im-groove)" />
      <path d="M64 8A56 56 0 0 1 120 64L64 64Z" fill="#fff" opacity=".25" />
      <circle cx="64" cy="64" r="24" fill="#fff" stroke="#e0dbe3" />
      <circle cx="64" cy="64" r="7" fill="#efedf1" stroke="#d3ced7" />
      <use href="#notes" x="44" y="40" width="40" height="46" fill="#e8adc2" />
      <use href="#notes" x="44" y="40" width="40" height="46" fill="none" stroke="#fff" strokeWidth="1.2" />
    </svg>
  );
}

export function IconPrefs() {
  const teeth = Array.from({ length: 12 }, (_, i) => <rect key={i} x="58" y="10" width="12" height="18" rx="3" transform={`rotate(${i * 30} 64 64)`} />);
  return (
    <svg viewBox="0 0 128 128">
      <defs>
        <linearGradient id="ip-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" /><stop offset=".4" stopColor="#d8d4dc" /><stop offset=".55" stopColor="#f5f4f7" /><stop offset="1" stopColor="#a9a3af" /></linearGradient>
      </defs>
      <g fill="url(#ip-g)" stroke="#9c96a3" strokeWidth="1">{teeth}<circle cx="64" cy="64" r="42" /></g>
      <circle cx="64" cy="64" r="30" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="2" />
      <circle cx="64" cy="64" r="20" fill="#f6d5e0" stroke="#d99fb5" strokeWidth="2" />
      <circle cx="64" cy="64" r="10" fill="#d4eef0" stroke="#9fcdd3" strokeWidth="2" />
      <Shine d="M30 40C44 22 84 22 98 40C84 48 44 48 30 40Z" />
    </svg>
  );
}

export function IconAwards() {
  const svg = useMemo(() => rosetteSVG({ lines: [], id: 'iaw' }), []);
  return <span className="icon-html" dangerouslySetInnerHTML={{ __html: svg }} />;
}

export function IconBooth() {
  const folds = Array.from({ length: 8 }, (_, i) => <path key={i} d={`M${30 + i * 8.6} 34V102`} stroke={i % 2 ? '#e7a9bf' : '#fff'} strokeOpacity={i % 2 ? 0.7 : 0.6} strokeWidth="3" />);
  return (
    <svg viewBox="0 0 128 128">
      <defs>
        <linearGradient id="ib-frame" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#c9c4cd" /><stop offset=".5" stopColor="#fff" /><stop offset="1" stopColor="#bdb7c2" /></linearGradient>
        <linearGradient id="ib-cur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f9dbe5" /><stop offset="1" stopColor="#efb7ca" /></linearGradient>
      </defs>
      <rect x="18" y="14" width="92" height="104" rx="12" fill="url(#ib-frame)" stroke="#a9a3ae" />
      <rect x="26" y="30" width="76" height="78" rx="4" fill="#2f3440" />
      <path d="M26 30H102V40C90 46 38 46 26 40Z" fill="url(#ib-cur)" />
      <path d="M26 34Q34 70 30 108H26Z M102 34Q94 70 98 108H102Z" fill="url(#ib-cur)" />
      <g>{folds.slice(0, 2)}</g>
      <circle cx="64" cy="76" r="18" fill="#1e2129" stroke="#d9d5dc" strokeWidth="4" />
      <circle cx="64" cy="76" r="9" fill="#9dd2d8" opacity=".6" />
      <circle cx="58" cy="70" r="4" fill="#fff" opacity=".8" />
      <rect x="40" y="18" width="48" height="8" rx="4" fill="#f4cddb" stroke="#dca3b8" />
      <Shine d="M22 18C50 10 80 10 106 18L106 30C80 24 48 24 22 30Z" />
    </svg>
  );
}

export function IconMail() {
  return (
    <svg viewBox="0 0 128 128">
      <defs>
        <linearGradient id="il-env" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#f1ece9" /></linearGradient>
      </defs>
      <rect x="10" y="30" width="108" height="74" rx="6" fill="url(#il-env)" stroke="#d7cfcd" strokeWidth="1.5" />
      <path d="M10 104L52 66M118 104L76 66" stroke="#e2dad8" strokeWidth="2" fill="none" />
      <path d="M12 32L64 76L116 32" fill="#faf6f3" stroke="#d7cfcd" strokeWidth="1.5" />
      <path d="M10 30h108v6l-4 0M10 36" stroke="none" />
      {Array.from({ length: 13 }, (_, i) => <rect key={i} x={12 + i * 8.2} y="96" width="4.5" height="6" fill={i % 2 ? '#a9d6db' : '#f2c2d3'} transform="skewX(-30)" />)}
      <rect x="88" y="38" width="22" height="26" rx="1" fill="#fff" stroke="#e5c3d0" strokeDasharray="2 1.5" />
      <rect x="91" y="41" width="16" height="20" fill="#d6edef" />
      <use href="#lotus" x="91" y="47" width="16" height="11" />
      <circle cx="64" cy="76" r="12" fill="#ecb2c6" stroke="#d998b0" strokeWidth="2" />
      <use href="#heart" x="57" y="70" width="14" height="13" fill="#fbe1ea" />
    </svg>
  );
}

export function IconDesk() {
  return (
    <svg viewBox="0 0 128 128">
      <defs>
        <linearGradient id="id-lid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#e9e7ec" /></linearGradient>
      </defs>
      <rect x="18" y="22" width="92" height="64" rx="6" fill="url(#id-lid)" stroke="#cfcbd3" strokeWidth="1.5" />
      <rect x="25" y="28" width="78" height="50" rx="2" fill="#f8e6ec" />
      <path d="M25 28h78v50H25Z" fill="url(#g-iris)" opacity=".8" />
      <path d="M10 92H118L112 102H16Z" fill="#fbfbfc" stroke="#cfcbd3" strokeWidth="1.5" />
      <rect x="52" y="94" width="24" height="4" rx="2" fill="#e2dfe5" />
      <Shine d="M25 28H70L40 78H25Z" />
    </svg>
  );
}

export function IconFolder({ badge = 'heart' }) {
  return (
    <svg viewBox="0 0 128 128">
      <defs>
        <linearGradient id={`if-${badge}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fbe6ee" /><stop offset=".5" stopColor="#f5cfdc" /><stop offset="1" stopColor="#eebdce" /></linearGradient>
      </defs>
      <path d="M10 30a6 6 0 0 1 6-6h30l8 8h58a6 6 0 0 1 6 6v6H10Z" fill="#e8b2c5" />
      <rect x="10" y="38" width="108" height="72" rx="6" fill={`url(#if-${badge})`} stroke="#dfa8bc" />
      <path d="M12 42H116" stroke="#fff" strokeWidth="2" opacity=".8" />
      <use href={`#${badge}`} x="50" y="60" width="28" height="28" fill="#fff" opacity=".85" />
    </svg>
  );
}

export function IconIPod() {
  return (
    <svg viewBox="0 0 128 128">
      <defs>
        <linearGradient id="ii-body" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset=".6" stopColor="#f2eff4" /><stop offset="1" stopColor="#e2dee6" /></linearGradient>
        <linearGradient id="ii-scr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e7f4f6" /><stop offset="1" stopColor="#f8e3eb" /></linearGradient>
      </defs>
      <rect x="30" y="8" width="68" height="112" rx="12" fill="url(#ii-body)" stroke="#cfcad4" strokeWidth="1.5" />
      <rect x="37" y="16" width="54" height="42" rx="3" fill="url(#ii-scr)" stroke="#b9b4be" />
      <use href="#notes" x="54" y="24" width="20" height="24" fill="#e6a9bf" />
      <circle cx="64" cy="88" r="22" fill="#f6f4f8" stroke="#d3ced8" strokeWidth="1.5" />
      <circle cx="64" cy="88" r="8" fill="url(#ii-body)" stroke="#d3ced8" />
      <g fill="#a9a3ae" fontFamily="Figtree, sans-serif" fontSize="6.5" fontWeight="700" textAnchor="middle"><text x="64" y="72">MENU</text></g>
      <path d="M50 88l4-3v6zM78 88l-4-3v6zM61 104h2v4h-2zM65 104h2v4h-2z" fill="#a9a3ae" />
      <path d="M34 12C50 6 80 6 94 12L94 40C76 30 52 30 34 44Z" fill="#fff" opacity=".45" />
    </svg>
  );
}

export function IconHardDrive() {
  return (
    <svg viewBox="0 0 128 128">
      <defs>
        <linearGradient id="ihd-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".4" stopColor="#eae6ed" />
          <stop offset=".8" stopColor="#d5d0db" />
          <stop offset="1" stopColor="#b6b0bd" />
        </linearGradient>
        <linearGradient id="ihd-bevel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d8d3dc" />
          <stop offset="1" stopColor="#96909e" />
        </linearGradient>
      </defs>
      <rect x="18" y="32" width="92" height="72" rx="10" fill="#9f99a6" opacity=".35" transform="translate(0 4)" />
      <rect x="18" y="30" width="92" height="72" rx="10" fill="url(#ihd-body)" stroke="url(#ihd-bevel)" strokeWidth="2" />
      <rect x="24" y="36" width="80" height="42" rx="6" fill="#f4f1f7" stroke="#cdc8d3" strokeWidth="1" />
      <line x1="32" y1="48" x2="96" y2="48" stroke="#d5d0db" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="56" x2="96" y2="56" stroke="#d5d0db" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="64" x2="96" y2="64" stroke="#d5d0db" strokeWidth="2" strokeLinecap="round" />
      <rect x="22" y="82" width="84" height="14" rx="4" fill="#3a3742" stroke="#25232b" strokeWidth="1" />
      <rect x="28" y="87" width="54" height="4" rx="2" fill="#18161d" />
      <circle cx="94" cy="89" r="3.5" fill="#5fe0d4" />
      <circle cx="94" cy="89" r="1.5" fill="#ffffff" />
      <Shine d="M22 34C44 26 84 26 106 34L106 48C84 40 44 40 22 48Z" />
    </svg>
  );
}

export function IconDocument({ badge = 'PDF' }) {
  return (
    <svg viewBox="0 0 128 128">
      <defs>
        <linearGradient id={`idoc-p-${badge}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".6" stopColor="#faf7fb" />
          <stop offset="1" stopColor="#ede9f2" />
        </linearGradient>
      </defs>
      <path d="M26 16 H80 L102 38 V114 A 8 8 0 0 1 94 122 H26 A 8 8 0 0 1 18 114 V24 A 8 8 0 0 1 26 16 Z" fill="#9c95a3" opacity=".25" transform="translate(1 3)" />
      <path d="M26 16 H80 L102 38 V114 A 8 8 0 0 1 94 122 H26 A 8 8 0 0 1 18 114 V24 A 8 8 0 0 1 26 16 Z" fill={`url(#idoc-p-${badge})`} stroke="#cdc7d4" strokeWidth="1.5" />
      <path d="M80 16 V38 H102 Z" fill="#e4dfeb" stroke="#c0b9c8" strokeWidth="1.2" />
      <path d="M80 16 L102 38" stroke="#cdc7d4" strokeWidth="1.5" />
      <rect x="30" y="52" width="68" height="5" rx="2.5" fill="#d8d3df" />
      <rect x="30" y="63" width="58" height="4" rx="2" fill="#e5e1eb" />
      <rect x="30" y="73" width="64" height="4" rx="2" fill="#e5e1eb" />
      <rect x="30" y="83" width="48" height="4" rx="2" fill="#e5e1eb" />
      <rect x="28" y="94" width="40" height="18" rx="4" fill={badge === 'PDF' ? '#f28ba6' : '#68c4cc'} />
      <text x="48" y="107" textAnchor="middle" fontFamily="Silkscreen, monospace" fontSize="9" fontWeight="700" fill="#ffffff" letterSpacing="1">{badge}</text>
      <Shine d="M22 22C44 14 74 14 80 22L80 44C60 36 36 36 22 44Z" />
    </svg>
  );
}

export function IconTextDoc() {
  return (
    <svg viewBox="0 0 128 128">
      <defs>
        <linearGradient id="itxt-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffdf6" />
          <stop offset="1" stopColor="#f5edd8" />
        </linearGradient>
      </defs>
      <rect x="22" y="16" width="84" height="100" rx="6" fill="#a49da8" opacity=".25" transform="translate(1 3)" />
      <rect x="22" y="16" width="84" height="100" rx="6" fill="url(#itxt-body)" stroke="#dcd3c0" strokeWidth="1.5" />
      {[34, 46, 58, 70, 82, 94].map((y) => (
        <line key={y} x1="32" y1={y} x2="96" y2={y} stroke="#e4d9c4" strokeWidth="1.5" />
      ))}
      <line x1="42" y1="22" x2="42" y2="110" stroke="#f2b5c8" strokeWidth="1.5" opacity=".7" />
      <rect x="48" y="38" width="42" height="3.5" rx="1.5" fill="#999182" />
      <rect x="48" y="50" width="36" height="3" rx="1.5" fill="#a8a193" />
      <rect x="48" y="62" width="44" height="3" rx="1.5" fill="#a8a193" />
      <rect x="48" y="74" width="30" height="3" rx="1.5" fill="#a8a193" />
      <g transform="translate(74, 52) rotate(42)">
        <rect x="0" y="0" width="10" height="48" rx="3" fill="#e0dde3" stroke="#9e98a6" strokeWidth="1" />
        <polygon points="0,48 10,48 5,60" fill="#d97d98" stroke="#9e98a6" strokeWidth="1" />
        <circle cx="5" cy="52" r="1" fill="#fff" />
      </g>
    </svg>
  );
}

export function IconImageDoc() {
  return (
    <svg viewBox="0 0 128 128">
      <defs>
        <linearGradient id="img-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e3f5f7" />
          <stop offset="1" stopColor="#fad7e4" />
        </linearGradient>
      </defs>
      <rect x="18" y="18" width="92" height="96" rx="8" fill="#9c95a3" opacity=".25" transform="translate(1 3)" />
      <rect x="18" y="18" width="92" height="96" rx="8" fill="#ffffff" stroke="#d5d0db" strokeWidth="1.5" />
      <rect x="26" y="26" width="76" height="64" rx="4" fill="url(#img-sky)" stroke="#ded9e3" strokeWidth="1" />
      <use href="#lotus" x="38" y="36" width="52" height="36" fill="#e88fae" />
      <circle cx="84" cy="38" r="6" fill="#ffdeaa" />
      <rect x="32" y="98" width="42" height="4" rx="2" fill="#cfcad5" />
    </svg>
  );
}

export function IconTrash() {
  return (
    <svg viewBox="0 0 128 128">
      <defs>
        <linearGradient id="itr-mesh" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".85" />
          <stop offset="1" stopColor="#dfdbe3" stopOpacity=".95" />
        </linearGradient>
      </defs>
      <ellipse cx="64" cy="30" rx="36" ry="10" fill="#eae6ee" stroke="#b6b0be" strokeWidth="2" />
      <path d="M28 30 L38 108 A 12 6 0 0 0 90 108 L100 30" fill="url(#itr-mesh)" stroke="#b6b0be" strokeWidth="2" />
      {[46, 62, 78, 94].map((y) => (
        <path key={y} d={`M${30 + (y - 30) * 0.12} ${y} Q64 ${y + 8} ${98 - (y - 30) * 0.12} ${y}`} fill="none" stroke="#cdc7d4" strokeWidth="1.5" />
      ))}
      {[44, 54, 64, 74, 84].map((x) => (
        <line key={x} x1={x} y1="36" x2={64 + (x - 64) * 0.7} y2="108" stroke="#cdc7d4" strokeWidth="1.5" />
      ))}
      <ellipse cx="64" cy="40" rx="18" ry="8" fill="#fdf2f6" stroke="#f0c2d3" strokeWidth="1.2" />
      <use href="#lotus" x="54" y="32" width="20" height="14" fill="#e6a4bb" />
    </svg>
  );
}
