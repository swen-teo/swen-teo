import Avatar from '../../lib/Avatar.jsx';
import './apps.css';

export default function PhotoApp({ onOpen }) {
  return (
    <div className="photo-app">
      <div className="photo-frame">
        <div className="photo-canvas">
          <Avatar className="photo-avatar" />
        </div>
        <p className="photo-caption">Swen Teo · Singapore</p>
      </div>
      <div className="photo-actions">
        <button type="button" className="aqua aqua--blush" onClick={() => onOpen('photobooth')}>
          Take your own in Photo Booth
        </button>
      </div>
    </div>
  );
}
