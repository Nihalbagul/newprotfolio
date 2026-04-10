import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initializeAnalytics } from './utils/analytics'
import { logPerformanceMetrics } from './utils/performance'
import { LanguageProvider } from './i18n'

// Initialize Google Analytics (add your GA ID to .env)
if (import.meta.env.VITE_GA_ID) {
  initializeAnalytics(import.meta.env.VITE_GA_ID);
}

// Log performance metrics in development
if (import.meta.env.DEV && typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(logPerformanceMetrics, 1000);
  });
}

// Register Service Worker for PWA
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .catch((registrationError) => {
        console.warn('SW registration failed:', registrationError);
      });
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
