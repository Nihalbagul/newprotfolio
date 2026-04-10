import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { counterItems } from '../../constants';
import TitleHeader from '../components/TitleHeader';

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const AnimatedCounter = ({ value, suffix, label, isInView, delay = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1800;
    let rafId;

    const start = performance.now() + delay;

    const tick = (now) => {
      const elapsed = Math.max(0, now - start);
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(easeOutCubic(progress) * value));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setCount(value);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className="text-center p-6 rounded-2xl bg-gradient-to-br from-black-50 to-black-100 border border-white/10 hover:border-primary-500/50 transition-all duration-300 group"
    >
      <div
        className="text-5xl md:text-6xl font-bold mb-2"
        style={{
          background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #ec4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {count}{suffix}
      </div>
      <div className="text-gray-400 text-sm md:text-base font-medium">{label}</div>
    </motion.div>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="stats" ref={ref} className="section-padding section-alt-bg">
      <div className="container mx-auto px-4">
        <TitleHeader
          title="Achievements & Stats"
          Sub="Numbers that speak for themselves"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16">
          {counterItems.map((item, index) => (
            <AnimatedCounter
              key={index}
              value={item.value}
              suffix={item.suffix}
              label={item.label}
              isInView={isInView}
              delay={index * 120}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
