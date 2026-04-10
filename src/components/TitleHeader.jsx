import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const TitleHeader = ({ title, Sub, subtitle }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  // Accept both `Sub` (legacy) and `subtitle` (new) prop names
  const badge = Sub ?? subtitle;

  return (
    <div ref={ref} className="flex flex-col items-center gap-4 text-center">
      {badge && (
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: -12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p>{badge}</p>
        </motion.div>
      )}

      <motion.h2
        className="title-header-text"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: badge ? 0.1 : 0, ease: 'easeOut' }}
      >
        {title}
      </motion.h2>

      {/* Animated underline accent */}
      <motion.div
        className="title-header-accent"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: badge ? 0.25 : 0.15, ease: 'easeOut' }}
      />
    </div>
  );
};

export default TitleHeader;
