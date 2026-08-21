import React, { useState } from 'react'
import { motion } from 'framer-motion';

import { technologies, techCategories } from '../../constants'

/**
 * DEMO COMPONENT - Shows different technology showcase styles
 * This allows you to preview all options before choosing
 */

// Option 1: Glassmorphic Cards
const GlassmorphicCard = ({ technology, index }) => {
  const proficiencyColors = {
    expert: 'from-green-500/20 to-emerald-600/20',
    advanced: 'from-blue-500/20 to-indigo-600/20',
    intermediate: 'from-yellow-500/20 to-amber-600/20',
  }

  return (
    <motion.div
      className="tech-showcase-card glassmorphic"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ 
        scale: 1.05, 
        y: -8,
        rotateX: 5,
        rotateY: 5,
      }}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <div className={`glassmorphic-card-inner bg-gradient-to-br ${proficiencyColors[technology.proficiency] || 'from-purple-500/20 to-pink-600/20'}`}>
        <div className="glassmorphic-icon-wrapper">
          <img 
            src={technology.icon} 
            alt={technology.name}
            className="glassmorphic-icon"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <div className="glassmorphic-icon-fallback" style={{ display: 'none' }}>
            {technology.name.charAt(0)}
          </div>
        </div>
        <h4 className="glassmorphic-title">{technology.name}</h4>
        <span className={`glassmorphic-badge ${technology.proficiency}`}>
          {technology.proficiency?.toUpperCase() || 'PRO'}
        </span>
      </div>
    </motion.div>
  )
}

// Option 2: Hexagonal Grid
const HexagonalCard = ({ technology, index }) => {
  return (
    <motion.div
      className="tech-showcase-hexagon"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.1, zIndex: 10 }}
    >
      <div className="hexagon-inner">
        <img 
          src={technology.icon} 
          alt={technology.name}
          className="hexagon-icon"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        <div className="hexagon-icon-fallback" style={{ display: 'none' }}>
          {technology.name.charAt(0)}
        </div>
        <span className="hexagon-label">{technology.name}</span>
      </div>
    </motion.div>
  )
}

// Option 3: Floating Gradient Orbs
const GradientOrb = ({ technology, index }) => {
  const proficiencyGradients = {
    expert: 'from-green-400 via-emerald-500 to-teal-600',
    advanced: 'from-blue-400 via-indigo-500 to-purple-600',
    intermediate: 'from-yellow-400 via-amber-500 to-orange-600',
  }

  return (
    <motion.div
      className="tech-showcase-orb"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.03 }}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 3 + (index % 3),
        repeat: Infinity,
        ease: "easeInOut"
      }}
      whileHover={{ scale: 1.15, y: -15 }}
    >
      <div className={`orb-gradient bg-gradient-to-br ${proficiencyGradients[technology.proficiency] || 'from-purple-400 via-pink-500 to-rose-600'}`}>
        <div className="orb-icon-wrapper">
          <img 
            src={technology.icon} 
            alt={technology.name}
            className="orb-icon"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <div className="orb-icon-fallback" style={{ display: 'none' }}>
            {technology.name.charAt(0)}
          </div>
        </div>
      </div>
      <span className="orb-label">{technology.name}</span>
      <span className={`orb-badge ${technology.proficiency}`}>
        {technology.proficiency?.toUpperCase() || 'PRO'}
      </span>
    </motion.div>
  )
}

// Option 4: Badge Cloud
const TechBadge = ({ technology, index }) => {
  const proficiencyStyles = {
    expert: 'bg-green-500/20 border-green-500/50 text-green-300',
    advanced: 'bg-blue-500/20 border-blue-500/50 text-blue-300',
    intermediate: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300',
  }

  return (
    <motion.span
      className={`tech-badge ${proficiencyStyles[technology.proficiency] || 'bg-purple-500/20 border-purple-500/50 text-purple-300'}`}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      whileHover={{ scale: 1.1, y: -5 }}
    >
      <img 
        src={technology.icon} 
        alt=""
        className="badge-icon"
        onError={(e) => e.target.style.display = 'none'}
      />
      {technology.name}
      <span className="badge-level">{technology.proficiency?.toUpperCase()}</span>
    </motion.span>
  )
}

// Option 5: Grid Cards
const GridCard = ({ technology, index }) => {
  return (
    <motion.div
      className="tech-grid-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <div className="grid-card-icon">
        <img 
          src={technology.icon} 
          alt={technology.name}
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        <div className="grid-card-icon-fallback" style={{ display: 'none' }}>
          {technology.name.charAt(0)}
        </div>
      </div>
      <h4 className="grid-card-title">{technology.name}</h4>
      <span className={`grid-card-badge ${technology.proficiency}`}>
        {technology.proficiency?.toUpperCase() || 'PRO'}
      </span>
    </motion.div>
  )
}

// Main Demo Component
const TechShowcaseDemo = () => {
  const [selectedOption, setSelectedOption] = useState(1)
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredTechnologies = technologies.filter(tech => 
    activeCategory === 'all' || tech.category === activeCategory
  ).slice(0, 20) // Show first 20 for demo

  const options = [
    { id: 1, name: 'Glassmorphic Cards', component: GlassmorphicCard },
    { id: 2, name: 'Hexagonal Grid', component: HexagonalCard },
    { id: 3, name: 'Floating Orbs', component: GradientOrb },
    { id: 4, name: 'Badge Cloud', component: TechBadge },
    { id: 5, name: 'Grid Cards', component: GridCard },
  ]

  const SelectedComponent = options.find(opt => opt.id === selectedOption)?.component

  return (
    <div className="tech-showcase-demo" style={{ padding: '2rem', minHeight: '100vh', background: '#0a0a0f' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>
          Technology Showcase Options
        </h1>
        
        {/* Option Selector */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          flexWrap: 'wrap', 
          justifyContent: 'center',
          marginBottom: '2rem'
        }}>
          {options.map(option => (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              style={{
                padding: '0.75rem 1.5rem',
                background: selectedOption === option.id ? '#8b5cf6' : 'rgba(139, 92, 246, 0.2)',
                border: '1px solid rgba(139, 92, 246, 0.5)',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontWeight: selectedOption === option.id ? 'bold' : 'normal'
              }}
            >
              {option.id}. {option.name}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          flexWrap: 'wrap', 
          justifyContent: 'center',
          marginBottom: '2rem'
        }}>
          {techCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '0.5rem 1rem',
                background: activeCategory === cat.id ? '#22c55e' : 'rgba(34, 197, 94, 0.2)',
                border: '1px solid rgba(34, 197, 94, 0.5)',
                borderRadius: '6px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Showcase Display */}
        <div style={{
          background: 'rgba(18, 18, 28, 0.5)',
          borderRadius: '20px',
          padding: '2rem',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(139, 92, 246, 0.2)'
        }}>
          <div className={`tech-showcase-container option-${selectedOption}`}>
            {filteredTechnologies.map((tech, index) => (
              <SelectedComponent 
                key={`${tech.name}-${index}`} 
                technology={tech} 
                index={index} 
              />
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'rgba(139, 92, 246, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(139, 92, 246, 0.3)'
        }}>
          <h3 style={{ marginBottom: '0.5rem', color: '#8b5cf6' }}>
            Current Option: {options.find(opt => opt.id === selectedOption)?.name}
          </h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6' }}>
            {selectedOption === 1 && "Modern glassmorphic cards with 3D tilt effects. Premium look, excellent performance, no WebGL issues."}
            {selectedOption === 2 && "Unique hexagonal honeycomb layout. Great for organizing technologies by category."}
            {selectedOption === 3 && "Beautiful floating gradient orbs. Lightweight, smooth animations, works with unlimited items."}
            {selectedOption === 4 && "Interactive badge cloud. Lightweight, easy to scan, great for many technologies."}
            {selectedOption === 5 && "Clean grid cards layout. Professional, organized, easy to maintain."}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TechShowcaseDemo

