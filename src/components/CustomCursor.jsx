import { useEffect, useState, useRef, memo } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = memo(() => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafId = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  
  // Use spring for smooth cursor movement
  const x = useSpring(0, { stiffness: 500, damping: 28 });
  const y = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
      
      // Use requestAnimationFrame for smooth updates
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          x.set(mousePos.current.x);
          y.set(mousePos.current.y);
          rafId.current = null;
        });
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('.cta-button') ||
        target.closest('.contact-btn');
      
      setIsHovering(isInteractive);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [x, y]);

  // Hide cursor on mobile devices
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      if (window.matchMedia) {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        setIsVisible(!isMobile);
      }
    };
    
    checkMobile();
    
    // Listen for resize events
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', checkMobile);
      return () => mediaQuery.removeEventListener('change', checkMobile);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="custom-cursor"
        style={{
          x: x,
          y: y,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          scale: {
            type: 'spring',
            damping: 20,
            stiffness: 300,
          }
        }}
      />
      {/* Outer ring */}
      <motion.div
        className={`custom-cursor-ring ${isHovering ? 'hover' : ''}`}
        style={{
          x: x,
          y: y,
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
        }}
        transition={{
          scale: {
            type: 'spring',
            damping: 15,
            stiffness: 200,
          }
        }}
      />
    </>
  );
});

CustomCursor.displayName = 'CustomCursor';

export default CustomCursor;

