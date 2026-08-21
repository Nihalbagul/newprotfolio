import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
// AnimatePresence kept for category filter transition (mode="wait" below)
import { logoIconsList, technologies, techCategories } from '../../constants'
import TitleHeader from './TitleHeader'
import { useIsMobile } from '../hooks/useMediaQuery'

const LogoIcon = ({ icon, index }) => {
  return (
    <motion.div
      className="premium-logo-item"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.5) }}
      whileHover={{ scale: 1.15, y: -5 }}
    >
      <div className="premium-logo-wrapper">
        <div className="premium-logo-glow" />
        <div className="premium-logo-border" />
        <img
          src={icon.imgPath}
          alt={icon.name || 'Technology logo'}
          loading="lazy"
          className="premium-logo-img"
        />
        <div className="premium-logo-shine" />
      </div>
    </motion.div>
  )
}

const proficiencyGradients = {
  expert: 'from-green-400 via-emerald-500 to-teal-600',
  advanced: 'from-blue-400 via-indigo-500 to-purple-600',
  intermediate: 'from-yellow-400 via-amber-500 to-orange-600',
}

const proficiencyLabels = {
  expert: 'Expert',
  advanced: 'Advanced',
  intermediate: 'Intermediate',
}

const TechBall = ({ technology, index }) => {
  const isMobile = useIsMobile()

  return (
    <motion.div
      className="ultra-premium-tech-card"
      initial={{ opacity: 0, scale: 0.85, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.03, 0.45),
        type: 'spring',
        stiffness: 110,
      }}
      whileHover={isMobile ? {} : { scale: 1.08, y: -10 }}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      {/* Holographic background */}
      <div className={`ultra-card-bg bg-gradient-to-br ${proficiencyGradients[technology.proficiency] || 'from-purple-400 via-pink-500 to-rose-600'}`} />
      <div className="ultra-card-border" />
      {/* CSS shine — replaces 6 looping particle motion.divs */}
      <div className="ultra-card-shine" />
      <div className="ultra-card-glow" />

      <div className="ultra-card-content">
        <div className="ultra-card-icon-wrapper">
          <div className="ultra-card-icon-bg" />
          <img
            src={technology.icon}
            alt={technology.name}
            loading="lazy"
            className="ultra-card-icon"
            onError={(e) => {
              e.target.style.display = 'none'
              if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex'
            }}
          />
          <div className="ultra-card-icon-fallback" style={{ display: 'none' }}>
            {technology.name.charAt(0)}
          </div>
          <div className="ultra-card-icon-glow" />
        </div>

        <h3 className="ultra-card-title">{technology.name}</h3>

        {technology.proficiency && (
          <span className={`ultra-card-badge ${technology.proficiency}`}>
            {proficiencyLabels[technology.proficiency]}
          </span>
        )}
      </div>
    </motion.div>
  )
}

const LogoSection = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  
  const filteredTechnologies = useMemo(() => {
    if (activeCategory === 'all') return technologies
    return technologies.filter(tech => tech.category === activeCategory)
  }, [activeCategory])
  
  const categoryStats = useMemo(() => {
    const stats = {}
    techCategories.forEach(cat => {
      if (cat.id === 'all') {
        stats[cat.id] = technologies.length
      } else {
        stats[cat.id] = technologies.filter(t => t.category === cat.id).length
      }
    })
    return stats
  }, [])

  return (
    <section id="technologies" className="premium-tech-section">
      {/* Background effects */}
      <div className="premium-tech-bg-gradient" />
      <div className="premium-tech-particles" />
      
      <div className="premium-tech-container">
        {/* Main Title — TitleHeader has its own entrance animation, no wrapper needed */}
        <div className="premium-tech-header">
          <TitleHeader
            title="Technologies & Tools"
            Sub="Technologies I work with daily"
          />
        </div>

        {/* Company Logos Marquee */}
        <motion.div
          className="premium-tech-subsection"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="premium-tech-subtitle title-header-text" style={{ fontSize: '1.25rem' }}>Trusted Partners &amp; Platforms</h3>
          <div className="premium-marquee-container">
            <div className="premium-marquee-gradient-left" />
            <div className="premium-marquee-gradient-right" />
            
            <div className="premium-marquee">
              <motion.div 
                className="premium-marquee-track"
                animate={{ x: [0, -50 + '%'] }}
                transition={{ 
                  duration: 40, 
                  repeat: Infinity, 
                  ease: 'linear' 
                }}
              >
                {logoIconsList.map((icon, index) => (
                  <LogoIcon key={`${icon.imgPath}-${index}`} icon={icon} index={index} />
                ))}
              </motion.div>
              <motion.div 
                className="premium-marquee-track"
                animate={{ x: [0, -50 + '%'] }}
                transition={{ 
                  duration: 40, 
                  repeat: Infinity, 
                  ease: 'linear' 
                }}
              >
                {logoIconsList.map((icon, index) => (
                  <LogoIcon key={`${icon.imgPath}-duplicate-${index}`} icon={icon} index={index} />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* 3D Technology Showcase with Categories */}
        <motion.div
          className="premium-tech-3d-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="premium-tech-3d-header">
            <h3 className="premium-tech-subtitle title-header-text" style={{ fontSize: '1.25rem' }}>My Key Skills &amp; Technologies</h3>
            
            {/* Category Filters */}
            <motion.div 
              className="premium-tech-filters"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {techCategories.map((category) => (
                <motion.button
                  key={category.id}
                  className={`premium-tech-category-btn ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="premium-tech-category-icon">{category.icon}</span>
                  <span className="premium-tech-category-name">{category.name}</span>
                  {categoryStats[category.id] > 0 && (
                    <span className="premium-tech-category-count">{categoryStats[category.id]}</span>
                  )}
                </motion.button>
              ))}
            </motion.div>
            
            {/* Category Stats */}
            <motion.div 
              className="premium-tech-stats"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <span className="premium-tech-count">
                {filteredTechnologies.length} {activeCategory === 'all' ? 'Technologies' : 'Technologies'}
              </span>
            </motion.div>
          </div>
          
            {/* Ultra Premium Technology Cards - Dual Row Marquee (Opposite Directions) */}
          <div className="ultra-tech-dual-marquee-container">
            <div className="ultra-tech-marquee-gradient-left" />
            <div className="ultra-tech-marquee-gradient-right" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className="ultra-tech-dual-marquee"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {(() => {
                  // Single row: All technologies in ascending order - Moving Right to Left
                  const rowTechs = [...filteredTechnologies];
                  
                  return (
                      <div className="ultra-tech-marquee-row">
                        <motion.div 
                          className="ultra-tech-marquee-track"
                          animate={{ x: [0, -50 + '%'] }}
                          transition={{ 
                          duration: rowTechs.length * 3, 
                            repeat: Infinity, 
                            ease: 'linear',
                            repeatType: 'loop'
                          }}
                        >
                        {rowTechs.map((technology, index) => (
                          <TechBall key={`${technology.name}-${index}`} technology={technology} index={index} />
                          ))}
                        </motion.div>
                        
                        {/* Duplicate for seamless infinite loop */}
                        <motion.div 
                          className="ultra-tech-marquee-track"
                          animate={{ x: [0, -50 + '%'] }}
                          transition={{ 
                          duration: rowTechs.length * 3, 
                            repeat: Infinity, 
                            ease: 'linear',
                            repeatType: 'loop'
                          }}
                        >
                        {rowTechs.map((technology, index) => (
                          <TechBall key={`${technology.name}-dup-${index}`} technology={technology} index={index} />
                          ))}
                        </motion.div>
                      </div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default LogoSection
