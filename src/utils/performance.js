/**
 * Performance monitoring utilities
 */

/**
 * Measure page load performance
 */
export const measurePageLoad = () => {
  if (typeof window === 'undefined' || !window.performance) return null;

  const navigation = performance.getEntriesByType('navigation')[0];
  
  return {
    dns: navigation.domainLookupEnd - navigation.domainLookupStart,
    tcp: navigation.connectEnd - navigation.connectStart,
    request: navigation.responseStart - navigation.requestStart,
    response: navigation.responseEnd - navigation.responseStart,
    dom: navigation.domContentLoadedEventEnd - navigation.responseEnd,
    load: navigation.loadEventEnd - navigation.fetchStart,
    total: navigation.loadEventEnd - navigation.fetchStart,
  };
};

/**
 * Measure resource load times
 */
export const measureResources = () => {
  if (typeof window === 'undefined' || !window.performance) return [];

  const resources = performance.getEntriesByType('resource');
  
  return resources.map((resource) => ({
    name: resource.name,
    type: resource.initiatorType,
    duration: resource.duration,
    size: resource.transferSize,
  }));
};

/**
 * Log performance metrics to console (for development)
 */
export const logPerformanceMetrics = () => {
  if (import.meta.env.DEV) {
    const pageLoad = measurePageLoad();
    const resources = measureResources();
    
    console.group('🚀 Performance Metrics');
    console.table(pageLoad);
    console.log('Resources:', resources);
    console.groupEnd();
  }
};

/**
 * Monitor Core Web Vitals
 * Note: This function requires 'web-vitals' package to be installed
 * To use: npm install web-vitals, then uncomment the implementation below
 * Currently disabled to avoid build errors when package is not installed
 */
export const monitorWebVitals = (onPerfEntry) => {
  // Function stub - install web-vitals package to enable
  // Uncomment the code below after installing: npm install web-vitals
  /*
  if (!onPerfEntry || typeof onPerfEntry !== 'function') return;
  
  import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }).catch(() => {
    if (import.meta.env.DEV) {
      console.warn('web-vitals not available');
    }
  });
  */
  
  // No-op for now
  if (import.meta.env.DEV && onPerfEntry) {
    console.log('monitorWebVitals: Install web-vitals package to enable Core Web Vitals monitoring');
  }
};

/**
 * Check if page is loading slowly
 */
export const isSlowConnection = () => {
  if (typeof navigator === 'undefined' || !navigator.connection) return false;
  
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  return connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
};

