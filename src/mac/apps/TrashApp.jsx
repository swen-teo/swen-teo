import { useState } from 'react';
import { IconTrash } from '../icons.jsx';
import './apps.css';

export default function TrashApp() {
  const [cleaned, setCleaned] = useState(false);

  return (
    <div className="trash-app">
      <div className="trash-center">
        <div className="trash-art">
          <IconTrash />
        </div>
        <h3 className="trash-title">{cleaned ? 'Sparkling Clean!' : 'The Trash is Empty'}</h3>
        <p className="trash-sub">
          {cleaned
            ? 'All dust has been swept away into the digital void.'
            : 'No files or portfolio treasures have been thrown away.'}
        </p>
        <button
          type="button"
          className="aqua aqua--mint"
          onClick={() => setCleaned((c) => !c)}
        >
          {cleaned ? 'Reset' : 'Empty Trash'}
        </button>
      </div>
    </div>
  );
}
