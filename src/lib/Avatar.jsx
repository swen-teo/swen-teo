import portrait from '../assets/swen.webp';

/* Swen's illustrated portrait, cropped to head and shoulders. */
export const PORTRAIT = portrait;

export default function Avatar({ className = '', label = 'Swen Teo' }) {
  return <span className={`avatar ${className}`} role="img" aria-label={label} style={{ backgroundImage: `url(${portrait})` }} />;
}
