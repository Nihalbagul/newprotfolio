import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { testimonials } from '../../constants'
import TitleHeader from '../components/TitleHeader'

const TestimonialCard = ({ testimonial, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)
  
  // 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg'])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className="creative-testimonial-card"
      initial={{ opacity: 0, y: 80, rotateY: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.15, type: 'spring', stiffness: 100 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Multi-layer Glow Effects */}
      <div className="creative-card-glow-1" />
      <div className="creative-card-glow-2" />
      <div className="creative-card-glow-3" />
      
      {/* Animated Border */}
      <div className="creative-card-border" />
      <motion.div
        className="creative-card-border-animated"
        animate={isHovered ? {
          rotate: [0, 360],
        } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Holographic Shine */}
      <motion.div
        className="creative-card-shine"
        animate={isHovered ? {
          x: ['-100%', '200%'],
        } : {}}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
      />

      {/* Card Content */}
      <div className="creative-card-content">
        {/* Stars Section - Floating */}
        <motion.div
          className="creative-stars-container"
          animate={isHovered ? {
            y: [0, -10, 0],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <motion.div
              key={i}
              className="creative-star-wrapper"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + i * 0.1, type: 'spring' }}
              whileHover={{ 
                scale: 1.3,
                rotate: [0, 180, 360],
                y: -10
              }}
            >
              <img src="/images/star.png" alt="star" className="creative-star" />
              <div className="creative-star-glow" />
            </motion.div>
          ))}
        </motion.div>

        {/* Quote Icon */}
        <motion.div
          className="creative-quote-icon"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          animate={isHovered ? {
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          } : {}}
          transition={{ 
            delay: index * 0.15 + 0.5, 
            type: 'spring',
            duration: 1, 
            repeat: Infinity, 
            repeatDelay: 2 
          }}
        >
          "
        </motion.div>

        {/* Review Text */}
        <motion.p
          className="creative-review-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.3 }}
        >
          {testimonial.review}
        </motion.p>

        {/* Profile Section - Enhanced */}
        <div className="creative-profile-section">
          <motion.div
            className="creative-avatar-container"
            whileHover={{ scale: 1.15, rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <div className="creative-avatar-glow-1" />
            <div className="creative-avatar-glow-2" />
            <div className="creative-avatar-ring" />
            <div className="creative-avatar-wrapper">
              <img src={testimonial.imgPath} alt={testimonial.name} />
            </div>
            <motion.div
              className="creative-avatar-pulse"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <div className="creative-profile-info">
            <motion.h4
              className="creative-company-name"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + 0.6 }}
              whileHover={{ 
                textShadow: '0 0 20px rgba(139, 92, 246, 0.8)'
              }}
            >
              {testimonial.name}
            </motion.h4>
            <motion.p
              className="creative-role-name"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + 0.7 }}
            >
              {testimonial.mentions}
            </motion.p>
          </div>
        </div>

        {/* Decorative Lines */}
        <div className="creative-decorative-lines">
          <div className="creative-line line-1" />
          <div className="creative-line line-2" />
          <div className="creative-line line-3" />
        </div>
      </div>

      {/* Floating Particles */}
      {isHovered && (
        <>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="creative-particle"
              initial={{ 
                scale: 0,
                x: '50%',
                y: '50%',
                opacity: 0
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                x: `calc(50% + ${Math.cos((i * 18) * Math.PI / 180) * 150}px)`,
                y: `calc(50% + ${Math.sin((i * 18) * Math.PI / 180) * 150}px)`,
              }}
              transition={{
                duration: 2.5,
                delay: i * 0.1,
                repeat: Infinity,
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  )
}

const Testimonials = () => {
  // Ensure all testimonials are available
  const allTestimonials = testimonials || []
  
  
  return (
    <section id="testimonials" className="creative-testimonials-section">
      {/* Animated Background */}
      <div className="creative-testimonials-bg">
        <div className="creative-bg-gradient-1" />
        <div className="creative-bg-gradient-2" />
        <div className="creative-bg-particles" />
        <div className="creative-bg-grid" />
      </div>

      <div className="creative-testimonials-container">
        {/* Header */}
        <motion.div
          className="creative-testimonials-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <TitleHeader
            title="Professional Experience"
            Sub="💼 Companies I've Worked With & Their Feedback"
          />
        </motion.div>

        {/* Creative Grid Layout - All 6 Cards */}
        <div className="creative-testimonials-grid">
          {allTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.name}-${index}`}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
