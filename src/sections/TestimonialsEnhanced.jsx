import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { testimonials } from '../../constants'
import TitleHeader from '../components/TitleHeader'

const TestimonialCard = ({ testimonial, index, isActive }) => {
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
      animate={{ 
        opacity: isActive ? 1 : 0.6, 
        y: 0, 
        rotateY: 0,
        scale: isActive ? 1 : 0.95
      }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
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
        {/* Stars — animate in only when card is active to avoid background loops */}
        <motion.div
          className="creative-stars-container"
          animate={isActive && isHovered ? { y: [0, -6, 0] } : { y: 0 }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <motion.div
              key={i}
              className="creative-star-wrapper"
              initial={isActive ? { opacity: 0, scale: 0, rotate: -180 } : false}
              animate={isActive ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.25, rotate: 180, transition: { duration: 0.25 } }}
            >
              <div className="creative-star">⭐</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quote Icon */}
        <div className="creative-quote-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" fill="currentColor"/>
          </svg>
        </div>

        {/* Testimonial Text */}
        <p className="creative-testimonial-text">{testimonial.review || testimonial.quote || testimonial.testimonial}</p>

        {/* Profile Section */}
        <div className="creative-profile-section">
          <div className="creative-profile-image-wrapper">
            <div className="creative-profile-image">
              {testimonial.imgPath ? (
                <img src={testimonial.imgPath} alt={testimonial.name} />
              ) : (
                <div className="creative-profile-initial">
                  {testimonial.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="creative-profile-glow" />
          </div>
          <div className="creative-profile-info">
            <h4 className="creative-profile-name">{testimonial.name}</h4>
            <p className="creative-profile-role">{testimonial.mentions || testimonial.position || testimonial.role}</p>
            {testimonial.company && (
              <p className="creative-profile-company">{testimonial.company}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const TestimonialsEnhanced = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef(null)

  // Auto-play carousel
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 5000) // Change every 5 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying])

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  }

  return (
    <section id="testimonials" className="section-padding section-alt-bg">
      <div className="container mx-auto px-4">
        <TitleHeader 
          title="Testimonials" 
          subtitle="What clients and colleagues say about my work" 
        />

        <div className="mt-16 relative">
          {/* Carousel Container — min-h so tall cards don't clip */}
          <div className="relative min-h-[520px] md:min-h-[460px] flex items-center justify-center overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 }
                }}
                className="absolute w-full max-w-4xl px-4"
              >
                <TestimonialCard 
                  testimonial={testimonials[currentIndex]} 
                  index={currentIndex}
                  isActive={true}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 md:left-8 z-10 p-3 rounded-full bg-black-50/80 backdrop-blur-sm border border-white/10 hover:border-primary-500/50 hover:bg-black-100 transition-all duration-300 group"
              aria-label="Previous testimonial"
            >
              <svg 
                className="w-6 h-6 text-white group-hover:text-primary-500 transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 z-10 p-3 rounded-full bg-black-50/80 backdrop-blur-sm border border-white/10 hover:border-primary-500/50 hover:bg-black-100 transition-all duration-300 group"
              aria-label="Next testimonial"
            >
              <svg 
                className="w-6 h-6 text-white group-hover:text-primary-500 transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-primary-500'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Testimonial Counter — aria-live announces slide changes to screen readers */}
          <div
            className="text-center mt-6 text-gray-400 text-sm"
            aria-live="polite"
            aria-atomic="true"
          >
            {currentIndex + 1} / {testimonials.length}
          </div>

          {/* Auto-play Toggle */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="px-4 py-2 rounded-full bg-white/5 text-gray-400 text-sm hover:bg-white/10 border border-white/10 transition-all duration-300"
            >
              {isAutoPlaying ? '⏸ Pause' : '▶ Resume'} Auto-play
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsEnhanced

