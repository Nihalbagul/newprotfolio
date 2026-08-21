import React, { useState } from 'react'
import { motion } from 'framer-motion';

import { abilities } from '../../constants'

const FeatureCard = ({ imgPath, title, desc, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <motion.div
      key={title}
      className="premium-feature-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': `${mousePosition.x}%`,
        '--mouse-y': `${mousePosition.y}%`,
      }}
    >
      {/* Card background layers */}
      <div className="premium-feature-card-bg" />
      <div className="premium-feature-card-glow" />
      <div className="premium-feature-card-border" />
      
      {/* Glass morphism overlay */}
      <div className="premium-feature-glass" />
      
      {/* Interactive shimmer */}
      <div 
        className={`premium-feature-shimmer ${isHovered ? 'active' : ''}`}
      />
      
      {/* Content */}
      <div className="premium-feature-content">
        {/* Icon with enhanced styling */}
        <motion.div 
          className="premium-feature-icon-wrapper"
          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="premium-feature-icon-glow" />
          <div className="premium-feature-icon-border" />
          <div className="premium-feature-icon-bg">
            <img src={imgPath} alt={title} className="premium-feature-icon" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h3 
          className="premium-feature-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 + 0.3 }}
        >
          {title}
        </motion.h3>

        {/* Description */}
        <motion.p 
          className="premium-feature-desc"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 + 0.4 }}
        >
          {desc}
        </motion.p>
      </div>

      {/* Decorative elements */}
      <div className="premium-feature-corner-accent top-left" />
      <div className="premium-feature-corner-accent top-right" />
      <div className="premium-feature-corner-accent bottom-left" />
      <div className="premium-feature-corner-accent bottom-right" />
    </motion.div>
  )
}

const FeatureCards = () => {
  return (
    <section className="premium-features-section">
      <div className="premium-features-container">
        <div className="premium-features-grid">
          {abilities.map(({ imgPath, title, desc }, index) => (
            <FeatureCard
              key={title}
              imgPath={imgPath}
              title={title}
              desc={desc}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureCards
