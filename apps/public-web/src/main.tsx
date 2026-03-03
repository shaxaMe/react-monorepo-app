import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@repo/ui/styles';

import { App } from './app/App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
