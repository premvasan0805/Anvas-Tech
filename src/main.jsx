import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { applyViewportClasses } from './lib/viewport.js';

import '../css/styles.css';
import '../css/responsive.css';
import '../css/motion.css';
import '../css/solution-page.css';

applyViewportClasses();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
