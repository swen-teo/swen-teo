import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { installTextures } from './lib/textures.js';
import { spriteSVG } from './lib/motifs.js';
import './styles/base.css';

installTextures();
document.body.insertAdjacentHTML('afterbegin', spriteSVG());

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
