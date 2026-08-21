import { useScrollProgress } from '../hooks/useScrollProgress';
import { motion, useSpring } from 'framer-motion';
import { memo } from 'react';

const ScrollProgress = memo(() => {
  const raw = useScrollProgress();
  // Spring smoothing — no redundant animate prop fighting the style binding
  const scaleX = useSpring(raw, { stiffness: 300, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX, transformOrigin: 'left' }}
    />
  );
});

ScrollProgress.displayName = 'ScrollProgress';

export default ScrollProgress;
