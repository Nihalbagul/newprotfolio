import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';


const SketchfabModel = () => {
  const iframeRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Set loaded state after a short delay to allow iframe to initialize
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="sketchfab-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effects */}
      <motion.div
        className="sketchfab-glow"
        animate={isHovered ? {
          opacity: [0.6, 0.9, 0.6],
          scale: [1, 1.05, 1],
        } : {
          opacity: 0.4,
          scale: 1,
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Border Effect */}
      <motion.div
        className="sketchfab-border"
        animate={isHovered ? {
          opacity: [0.6, 1, 0.6],
        } : {
          opacity: 0.6,
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Loading Overlay */}
      {!isLoaded && (
        <motion.div
          className="sketchfab-loading"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.div
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          <p>Loading 3D Model...</p>
        </motion.div>
      )}

      {/* Sketchfab Embed */}
      <div className="sketchfab-embed-wrapper">
        <iframe
          ref={iframeRef}
          title="The Kingdom of Cats | House"
          frameBorder="0"
          allowFullScreen
          mozAllowFullScreen="true"
          webkitAllowFullScreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking
          execution-while-out-of-viewport
          execution-while-not-rendered
          web-share
          src="https://sketchfab.com/models/b367903faffb4aedbdff61620d50a476/embed?autostart=1&camera=0&preload=1&transparent=1&ui_theme=dark&ui_controls=0&ui_infos=0&ui_watermark=0&ui_help=0&ui_settings=0&ui_fullscreen=0&ui_annotations=0"
          className="sketchfab-iframe"
        />
      </div>

      {/* Decorative Particles */}
      {isHovered && (
        <>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="sketchfab-particle"
              initial={{ 
                scale: 0,
                x: '50%',
                y: '50%',
                opacity: 0
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                x: `calc(50% + ${Math.cos((i * 30) * Math.PI / 180) * 100}px)`,
                y: `calc(50% + ${Math.sin((i * 30) * Math.PI / 180) * 100}px)`,
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
              }}
            />
          ))}
        </>
      )}

      {/* Corner Accents */}
      <div className="sketchfab-corner top-left" />
      <div className="sketchfab-corner top-right" />
      <div className="sketchfab-corner bottom-left" />
      <div className="sketchfab-corner bottom-right" />
    </div>
  );
};

export default SketchfabModel;

