/**
 * Google Analytics utility functions
 * Initialize with: initializeAnalytics('YOUR_GA_ID')
 */

export const initializeAnalytics = (id) => {
  if (!id || typeof window === 'undefined') return;

  gaId = id;

  // Load Google Analytics script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script1);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', id, {
    page_path: window.location.pathname,
  });
};

// Store GA ID for tracking
let gaId = null;

export const setGaId = (id) => {
  gaId = id;
};

/**
 * Track page views
 */
export const trackPageView = (path) => {
  if (typeof window !== 'undefined' && window.gtag && gaId) {
    window.gtag('config', gaId, {
      page_path: path,
    });
  }
};

/**
 * Track custom events
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

/**
 * Track button clicks
 */
export const trackButtonClick = (buttonName, location) => {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location,
  });
};

/**
 * Track form submissions
 */
export const trackFormSubmission = (formName) => {
  trackEvent('form_submission', {
    form_name: formName,
  });
};

/**
 * Track section views (scroll tracking)
 */
export const trackSectionView = (sectionName) => {
  trackEvent('section_view', {
    section_name: sectionName,
  });
};

