import { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTop = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const rafId = useRef(null);
  const ticking = useRef(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollY = window.pageYOffset;
      const shouldShow = scrollY > 300;
      
      setIsVisible(prev => {
        if (prev !== shouldShow) {
          return shouldShow;
        }
        return prev;
      });
      
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        rafId.current = requestAnimationFrame(toggleVisibility);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    toggleVisibility(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="back-to-top-wrapper"
        >
          <button
            onClick={scrollToTop}
            className="back-to-top-button"
            aria-label="Back to top"
          >
            <svg className="back-to-top-icon" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" fill="currentColor" />
            </svg>
            <span className="back-to-top-text">Back to Top</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

BackToTop.displayName = 'BackToTop';

export default BackToTop;

