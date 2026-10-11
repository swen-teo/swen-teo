import { useRef } from 'react';

/* An Aqua window: pinstriped title bar, pastel traffic lights, drag to move.
   `variant` switches the chrome (metal for iTunes / Photo Booth, plain otherwise). */
export default function Window({ win, title, variant = 'plain', compact, onFocus, onClose, onMinimize, onZoom, onMove, children, toolbar, active }) {
  const drag = useRef(null);

  const down = (e) => {
    if (compact || e.button !== 0 || e.target.closest('button, input, a, select, textarea')) return;
    onFocus();
    drag.current = { sx: e.clientX, sy: e.clientY, x: win.x, y: win.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const move = (e) => {
    const d = drag.current;
    if (!d) return;
    onMove(d.x + e.clientX - d.sx, d.y + e.clientY - d.sy);
  };
  const up = () => (drag.current = null);

  const style = compact
    ? { zIndex: win.z }
    : { zIndex: win.z, left: win.x, top: win.y, width: win.w, height: win.h, transformOrigin: `${win.fromX - win.x}px ${win.fromY - win.y}px` };

  return (
    <section
      className={`win win--${variant} ${active ? 'is-active' : ''} ${win.minimized ? 'is-min' : ''} ${win.opening ? 'is-opening' : ''} ${compact ? 'win--compact' : ''}`}
      style={style}
      role="dialog"
      aria-label={title}
      onPointerDown={onFocus}
      onKeyDown={(e) => e.key === 'Escape' && !e.target.closest('input, textarea') && onClose()}
    >
      <header className="win__bar" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onDoubleClick={() => !compact && onZoom()}>
        <div className="lights">
          <button type="button" className="light light--close" onClick={onClose} aria-label={`Close ${title}`}><i /></button>
          <button type="button" className="light light--min" onClick={onMinimize} aria-label={`Minimise ${title}`}><i /></button>
          <button type="button" className="light light--zoom" onClick={onZoom} aria-label={`Zoom ${title}`} disabled={compact}><i /></button>
        </div>
        <h2 className="win__title">{title}</h2>
        {toolbar && <div className="win__toolbar">{toolbar}</div>}
      </header>
      <div className="win__body">{children}</div>
    </section>
  );
}
