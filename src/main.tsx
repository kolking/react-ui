import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

//import '@lib/styles/style.css';
import './global.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
