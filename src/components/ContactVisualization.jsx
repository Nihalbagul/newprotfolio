import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';


const FloatingShape = ({ index, delay }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const shapeRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (shapeRef.current) {
        const rect = shapeRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = (e.clientX - centerX) / 50;
        const y = (e.clientY - centerY) / 50;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const shapes = ['circle', 'triangle', 'square', 'hexagon'];
  const shape = shapes[index % shapes.length];
  const size = 40 + (index % 5) * 20;
  const colors = [
    'rgba(139, 92, 246, 0.6)',
    'rgba(99, 102, 241, 0.6)',
    'rgba(236, 72, 153, 0.6)',
    'rgba(59, 130, 246, 0.6)',
    'rgba(34, 197, 94, 0.6)',
  ];
  const color = colors[index % colors.length];

  return (
    <motion.div
      ref={shapeRef}
      className={`floating-shape floating-shape-${shape}`}
      style={{
        width: size,
        height: size,
        background: color,
        left: `${20 + (index * 15) % 60}%`,
        top: `${20 + (index * 20) % 60}%`,
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={{
        opacity: [0.4, 0.8, 0.4],
        scale: [1, 1.2, 1],
        rotate: [0, 360],
      }}
      transition={{
        duration: 3 + (index % 3),
        delay: delay,
        repeat: Infinity,
        ease: 'easeInOut',
        rotate: {
          duration: 10 + index * 2,
          repeat: Infinity,
          ease: 'linear',
        },
        x: {
          type: 'spring',
          stiffness: 50,
          damping: 20,
        },
        y: {
          type: 'spring',
          stiffness: 50,
          damping: 20,
        },
      }}
    />
  );
};

const Particle = ({ index, total }) => {
  const angle = (index / total) * Math.PI * 2;
  const radius = 150;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <motion.div
      className="contact-particle"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.3, 1, 0.3],
        scale: [0.5, 1, 0.5],
        x: [x, x * 1.5, x],
        y: [y, y * 1.5, y],
        rotate: [0, 360],
      }}
      transition={{
        duration: 4 + (index % 3),
        delay: index * 0.1,
        repeat: Infinity,
        ease: 'easeInOut',
        rotate: {
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        },
      }}
      style={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};

const EnergyWave = ({ delay }) => {
  return (
    <motion.div
      className="energy-wave"
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 2, 2.5],
        opacity: [0.8, 0.4, 0],
      }}
      transition={{
        duration: 3,
        delay: delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  );
};

const GradientOrb = ({ index, delay }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const orbRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (orbRef.current) {
        const rect = orbRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = (e.clientX - centerX) / 100;
        const y = (e.clientY - centerY) / 100;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const positions = [
    { left: '20%', top: '30%' },
    { left: '80%', top: '20%' },
    { left: '50%', top: '70%' },
    { left: '15%', top: '80%' },
    { left: '85%', top: '75%' },
  ];
  const position = positions[index % positions.length];
  const sizes = [120, 150, 100, 130, 110];
  const size = sizes[index % sizes.length];

  return (
    <motion.div
      ref={orbRef}
      className="gradient-orb"
      style={{
        ...position,
        width: size,
        height: size,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.2, 1],
      }}
      style={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{
        duration: 4 + index,
        delay: delay,
        repeat: Infinity,
        ease: 'easeInOut',
        opacity: {
          duration: 4 + index,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        scale: {
          duration: 4 + index,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        x: {
          type: 'spring',
          stiffness: 30,
          damping: 15,
        },
        y: {
          type: 'spring',
          stiffness: 30,
          damping: 15,
        },
      }}
    />
  );
};

const ContactVisualization = () => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div ref={containerRef} className="contact-visualization">
      {/* Animated Gradient Background */}
      <motion.div
        className="contact-gradient-bg"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
        }}
      />

      {/* Gradient Orbs */}
      {[...Array(5)].map((_, i) => (
        <GradientOrb key={i} index={i} delay={i * 0.5} />
      ))}

      {/* Floating Shapes */}
      {[...Array(8)].map((_, i) => (
        <FloatingShape key={i} index={i} delay={i * 0.3} />
      ))}

      {/* Energy Waves */}
      {[...Array(3)].map((_, i) => (
        <EnergyWave key={i} delay={i * 1.5} />
      ))}

      {/* Particles */}
      {[...Array(20)].map((_, i) => (
        <Particle key={i} index={i} total={20} />
      ))}

      {/* Connection Lines */}
      <svg className="connection-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.6)" />
            <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
          </linearGradient>
        </defs>
        {[...Array(8)].map((_, i) => {
          const angle1 = (i / 8) * Math.PI * 2;
          const angle2 = ((i + 4) / 8) * Math.PI * 2;
          const x1 = 50 + Math.cos(angle1) * 30;
          const y1 = 50 + Math.sin(angle1) * 30;
          const x2 = 50 + Math.cos(angle2) * 30;
          const y2 = 50 + Math.sin(angle2) * 30;
          return (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#lineGradient)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          );
        })}
      </svg>

      {/* Scanning Line */}
      <motion.div
        className="scanning-line"
        animate={{
          y: ['0%', '100%'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};

export default ContactVisualization;

