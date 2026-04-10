import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { services } from '../../constants';
import TitleHeader from '../components/TitleHeader';
import { useIsMobile } from '../hooks/useMediaQuery';

// Stagger variants — children animate in sequence with no repeated delay math
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 110,
      damping: 16,
      delay: i * 0.12,
      staggerChildren: 0.07,
      delayChildren: i * 0.12 + 0.18,
    },
  }),
};

const childVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const featureVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

const ServiceCard = ({ service, index, isInView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      whileHover={{ y: isMobile ? -4 : -8, scale: isMobile ? 1.01 : 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="service-card group"
      style={{ '--glow-color': service.glowColor }}
    >
      <div className="service-card-bg" />
      <div className="service-card-gradient" />
      <div className="service-card-glow" />
      <div className="service-card-border" />
      <div className="service-card-glass" />
      <div className={`service-card-shimmer ${isHovered ? 'active' : ''}`} />

      <div className="service-card-content">
        <motion.div
          className="service-icon-wrapper"
          variants={childVariants}
          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.15 }}
          transition={{ duration: 0.5 }}
        >
          <div className="service-icon-glow" />
          <div className="service-icon-bg">
            <span className="service-icon">{service.icon}</span>
          </div>
        </motion.div>

        <motion.h3 className="service-title" variants={childVariants}>
          {service.title}
        </motion.h3>

        <motion.p className="service-description" variants={childVariants}>
          {service.description}
        </motion.p>

        <motion.ul className="service-features" variants={childVariants}>
          {service.features.map((feature, idx) => (
            <motion.li
              key={idx}
              className="service-feature-item"
              variants={featureVariants}
              whileHover={{ x: isMobile ? 0 : 5 }}
            >
              <span className="service-feature-dot" />
              <span className="service-feature-text">{feature}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <div className="service-corner-accent top-left" />
      <div className="service-corner-accent top-right" />
      <div className="service-corner-accent bottom-left" />
      <div className="service-corner-accent bottom-right" />
    </motion.div>
  );
};

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" ref={ref} className="services-section section-alt-bg">
      <div className="services-container">
        <TitleHeader title="Services" Sub="What I can do for you" />

        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
