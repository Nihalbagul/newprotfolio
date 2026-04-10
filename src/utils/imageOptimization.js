/**
 * Image optimization utilities
 * Provides lazy loading and responsive image handling
 */

export const lazyLoadImage = (img) => {
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading supported
    img.loading = 'lazy';
  } else {
    // Fallback: Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    imageObserver.observe(img);
  }
};

export const getOptimizedImageSrc = (src, options = {}) => {
  const { width, quality = 80, format = 'webp' } = options;
  
  // If using an image CDN, you can add optimization parameters here
  // Example: return `${src}?w=${width}&q=${quality}&fm=${format}`;
  
  return src;
};

export const preloadImage = (src) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
};

