import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { aboutMe } from '../../constants';
import TitleHeader from '../components/TitleHeader';

const AboutMe = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [imageHovered, setImageHovered] = useState(false);

  return (
    <section id="about" ref={ref} className="section-padding premium-about-section">
      <div className="container mx-auto px-4">
        <TitleHeader title={aboutMe.title} Sub={aboutMe.subtitle} />

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center mt-12 md:mt-20">
          {/* Left Side - Premium Image */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="relative premium-about-image-wrapper"
            onMouseEnter={() => setImageHovered(true)}
            onMouseLeave={() => setImageHovered(false)}
          >
            {/* Glow effect */}
            <div className="premium-about-image-glow" />
            
            {/* Border animation */}
            <div className="premium-about-image-border" />
            
            {/* Main image container */}
            <div className="premium-about-image-container">
              {aboutMe.image ? (
                <motion.img 
                  src={aboutMe.image} 
                  alt="Nihal Bagul" 
                  className="premium-about-image"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              ) : (
                <div className="text-6xl font-bold text-white">NB</div>
              )}
              
              {/* Overlay gradient */}
              <div className="premium-about-image-overlay" />
              
              {/* Shine effect */}
              <div className={`premium-about-image-shine ${imageHovered ? 'active' : ''}`} />
            </div>
            
            {/* Decorative corner accents */}
            <div className="premium-about-corner top-left" />
            <div className="premium-about-corner top-right" />
            <div className="premium-about-corner bottom-left" />
            <div className="premium-about-corner bottom-right" />
          </motion.div>

          {/* Right Side - Premium Content */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-8"
          >
            {/* Description with gradient text */}
            <motion.div 
              className="premium-about-description"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {aboutMe.description.split('\n\n').map((paragraph, index) => (
                <p key={index} style={{ marginBottom: index < aboutMe.description.split('\n\n').length - 1 ? '1.25rem' : '0' }}>
                  {paragraph}
                </p>
              ))}
            </motion.div>

            {/* Premium highlight cards */}
            <div className="space-y-4 mt-10">
              {aboutMe.highlights.map((highlight, index) => {
                const parts = highlight.split(' ');
                const emoji = parts[0];
                const text = parts.slice(1).join(' ');
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                    className="premium-about-highlight-card"
                    whileHover={{ x: 8, scale: 1.02 }}
                  >
                    {/* Card background layers */}
                    <div className="premium-about-highlight-bg" />
                    <div className="premium-about-highlight-glow" />
                    <div className="premium-about-highlight-border" />
                    
                    {/* Content */}
                    <div className="premium-about-highlight-content">
                      <motion.span 
                        className="premium-about-highlight-emoji"
                        whileHover={{ rotate: [0, -15, 15, -15, 0], scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                      >
                        {emoji}
                      </motion.span>
                      <p className="premium-about-highlight-text">{text}</p>
                    </div>
                    
                    {/* Hover shine */}
                    <div className="premium-about-highlight-shine" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

