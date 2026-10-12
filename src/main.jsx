import './lib/gsapGlobal.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { applyViewportClasses } from './lib/viewport.js';

import '../css/styles.css';
import '../css/responsive.css';
import '../css/motion.css';
import '../css/solution-page.css';
import '../css/uiux.css';
import '../css/careers.css';
import '../css/workflow.css';

/* site.js replaces the header/footer slots via outerHTML, so they sit outside
   #root where React never owns them. */
function mountChromeSlots(root) {
  const header = document.createElement('div');
  header.id = 'chrome-header';
  const footer = document.createElement('div');
  footer.id = 'chrome-footer';

  root.before(header);
  root.after(footer);
}

const root = document.getElementById('root');
mountChromeSlots(root);
applyViewportClasses();

createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
