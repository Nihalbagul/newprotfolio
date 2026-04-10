import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to track scroll progress with optimized performance
 * Returns a value between 0 and 1 representing scroll progress
 */
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafId = useRef(null);
  const ticking = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = 
        document.documentElement.scrollHeight - 
        document.documentElement.clientHeight;
      
      if (winHeightPx === 0) {
        setScrollProgress(0);
        ticking.current = false;
        return;
      }
      
      const scrolled = Math.min(Math.max(scrollPx / winHeightPx, 0), 1);
      setScrollProgress(scrolled);
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        rafId.current = requestAnimationFrame(() => {
          updateScrollProgress();
        });
        ticking.current = true;
      }
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollProgress(); // Initial call

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return scrollProgress;
};

