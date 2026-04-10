import { useEffect } from 'react';

/**
 * Custom hook to enable smooth scrolling behavior for anchor links
 * and improve navigation UX
 */
export const useSmoothScroll = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Handle all anchor link clicks
    const handleAnchorClick = (e) => {
      const href = e.target?.getAttribute('href') || e.target?.closest('a')?.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          const offset = 100; // Offset from top
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth'
          });
        }
      }
    };

    // Add click listeners to all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);
};

