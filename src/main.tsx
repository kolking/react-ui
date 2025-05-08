import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

if (import.meta.env.VITE_DIST) {
  import('../dist/styles/style.css');
}

import './global.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
