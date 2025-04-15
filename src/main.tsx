import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Router } from '@/routing/router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
);
