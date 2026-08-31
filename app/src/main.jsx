import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { I18nProvider } from './i18n.js';

createRoot(document.getElementById('root')).render(
  <I18nProvider>
    <App />
  </I18nProvider>
);
