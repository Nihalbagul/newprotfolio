import React, { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion';
import { expCards } from '../../constants'
import TitleHeader from '../components/TitleHeader'
import { useIsMobile } from '../hooks/useMediaQuery'

// Extract tech stack from responsibilities
const extractTechStack = (responsibilities) => {
  const techKeywords = {
    'React': 'React',
    'Node.js': 'Node.js',
    'PHP': 'PHP',
    'Laravel': 'Laravel',
    'Three.js': 'Three.js',
    'Unity': 'Unity',
    'Unreal Engine': 'Unreal Engine',
    'MERN': 'MERN',
    'Next.js': 'Next.js',
    'TypeScript': 'TypeScript',
    'GraphQL': 'GraphQL',
    'Flutter': 'Flutter',
    'MySQL': 'MySQL',
    'PostgreSQL': 'PostgreSQL',
    'MongoDB': 'MongoDB',
    'CodeIgniter': 'CodeIgniter',
    'Tailwind CSS': 'Tailwind CSS',
    'ARKit': 'ARKit',
    'ARCore': 'ARCore',
  }
  
  const found = []
  const text = responsibilities.join(' ').toLowerCase()
  
  Object.keys(techKeywords).forEach(tech => {
    if (text.includes(tech.toLowerCase())) {
      found.push(techKeywords[tech])
    }
  })
  
  return [...new Set(found)]
}

const ExperienceCard = ({ card, index, total }) => {
  const [isHovered, setIsHovered] = useState(false)
  const isMobile = useIsMobile()
  const techStack = extractTechStack(card.responsibilities)
  const isEven = index % 2 === 0
  const cardRef = React.useRef(null)

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], isMobile ? [30, 0, 0, -30] : [60, 0, 0, -60])

  return (
    <motion.div
      ref={cardRef}
      className={`new-timeline-item ${isEven ? 'new-left' : 'new-right'}`}
      style={{ opacity, y }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Timeline Node */}
      <div className="new-timeline-node-wrapper">
        <motion.div
          className="new-timeline-node"
          animate={isHovered ? { scale: 1.3, rotate: 360 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="new-node-inner" />
          <div className="new-node-number">{index + 1}</div>
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        className="new-timeline-card"
        whileHover={{ scale: !isMobile ? 1.02 : 1, x: !isMobile ? (isEven ? 15 : -15) : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Card Glow */}
        <motion.div
          className="new-card-glow"
          animate={isHovered ? { opacity: 0.8 } : { opacity: 0.3 }}
        />

        {/* Card Border */}
        <div className="new-card-border" />

        {/* Card Content */}
        <div className="new-card-content">
          {/* Top Section - Logo, Title, Date */}
          <div className="new-card-top">
            <div className="new-card-logo">
              <img 
                src={card.logoPath} 
                alt="Company" 
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) {
                    e.target.nextSibling.style.display = 'flex';
                  }
                }}
              />
              <div className="new-card-logo-fallback" style={{ display: 'none' }}>
                {card.title.charAt(0)}
              </div>
            </div>
            <div className="new-card-header-text">
              <h3 className="new-card-title">{card.title}</h3>
              <div className="new-card-date">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7, flexShrink: 0 }}>
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>{card.date}</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="new-card-image">
            <img
              src={card.imgPath}
              alt={card.title}
              loading="lazy"
              onError={(e) => {
                const img = e.currentTarget;

                // First fallback: swap to a guaranteed existing asset.
                if (!img.dataset.fallbackApplied) {
                  img.dataset.fallbackApplied = "true";
                  img.src = "/images/ideas.svg";
                  return;
                }

                // Final fallback: hide image and show text placeholder.
                img.style.display = "none";
                const fallback = img.parentElement?.querySelector(".new-card-image-fallback");
                if (fallback) fallback.style.display = "flex";
              }}
            />
            <div className="new-card-image-fallback" style={{ display: "none" }}>
              <span>{card.title}</span>
            </div>
            <div className="new-image-overlay" />
          </div>

          {/* Tech Stack */}
          {techStack.length > 0 && (
            <div className="new-tech-section">
              <div className="new-section-title">Technologies</div>
              <div className="new-tech-tags">
                {techStack.slice(0, 6).map((tech, idx) => (
                  <motion.span
                    key={idx}
                    className="new-tech-tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    {tech}
                  </motion.span>
                ))}
                {techStack.length > 6 && (
                  <span className="new-tech-tag new-tech-more">
                    +{techStack.length - 6}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Responsibilities */}
          <div className="new-responsibilities">
            <div className="new-section-title">Key Responsibilities</div>
            <ul className="new-resp-list">
              {card.responsibilities.map((resp, idx) => (
                <motion.li
                  key={idx}
                  className="new-resp-item"
                  initial={{ opacity: 0, x: isMobile ? 0 : (isEven ? -20 : 20) }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ x: isMobile ? 0 : (isEven ? 5 : -5) }}
                >
                  <span className="new-resp-dot" />
                  <span>{resp}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Connector */}
      {index < total - 1 && (
        <div className="new-connector" />
      )}
    </motion.div>
  )
}

const ExperienceSection = () => {
  const containerRef = React.useRef(null)

  return (
    <section
      id="experience"
      className="new-timeline-section"
      ref={containerRef}
    >
      {/* Background */}
      <div className="new-timeline-bg">
        <div className="new-bg-gradient" />
      </div>

      <div className="new-timeline-container">
        {/* Header */}
        <motion.div
          className="new-timeline-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <TitleHeader
            title="Work Experience"
            Sub="💼 Professional Journey"
          />
        </motion.div>

        {/* Timeline */}
        <div className="new-timeline-wrapper">
          {/* Central Line */}
          <div className="new-timeline-line" />

          {/* Cards */}
          <div className="new-timeline-items">
            {expCards.map((card, index) => (
              <ExperienceCard
                key={`${card.title}-${index}`}
                card={card}
                index={index}
                total={expCards.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
