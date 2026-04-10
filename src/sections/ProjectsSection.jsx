import { useState, useMemo, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TitleHeader from '../components/TitleHeader';
import PremiumSearchBar from '../components/PremiumSearchBar';
import PremiumFilterButton from '../components/PremiumFilterButton';
import { trackEvent } from '../utils/analytics';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: '3D T-Shirt Customizer',
    description: 'Interactive 3D T-shirt customization platform built with React, Three.js, and TailwindCSS. Real-time preview and customization features.',
    fullDescription: 'A cutting-edge e-commerce platform that allows users to customize T-shirts in real-time using WebGL and Three.js. Features include 3D model manipulation, texture mapping, color customization, and seamless checkout integration. Built with modern React patterns and optimized for performance.',
    image: '/images/project1.png',
    tags: ['React', 'Three.js', 'TailwindCSS', '3D Visualization'],
    category: 'web',
    link: 'https://github.com/nihalbagul/3d-tshirt-customizer',
    github: 'https://github.com/nihalbagul/3d-tshirt-customizer',
    stats: { stars: '120+', performance: '98%', rating: '4.9' },
    color: 'from-purple-500 to-pink-500',
    accentColor: 'rgba(168, 85, 247, 0.3)',
  },
  {
    id: 2,
    title: 'AI Image Generator Platform',
    description: 'Full-stack AI-powered image generation platform with user authentication, credit system, and real-time processing capabilities.',
    fullDescription: 'An AI platform leveraging OpenAI and Stable Diffusion APIs for image generation. Includes user authentication, credit system, image gallery, and real-time processing queue. Built with Node.js backend and React frontend with MongoDB for data persistence.',
    image: '/images/project2.png',
    tags: ['React', 'Node.js', 'MongoDB', 'AI Integration'],
    category: 'web',
    link: 'https://github.com/nihalbagul/ai-image-generator',
    github: 'https://github.com/nihalbagul/ai-image-generator',
    stats: { stars: '200+', performance: '95%', rating: '4.8' },
    color: 'from-blue-500 to-cyan-500',
    accentColor: 'rgba(59, 130, 246, 0.3)',
  },
  {
    id: 3,
    title: 'Pokemon Card Dashboard',
    description: 'Interactive dashboard for Pokemon card collection with real-time data visualization, search, and filtering capabilities.',
    fullDescription: 'A comprehensive Pokemon card collection management system with real-time API integration, advanced search filters, card details visualization, and collection tracking. Features include price tracking, rarity indicators, and wishlist functionality.',
    image: '/images/project3.png',
    tags: ['React', 'API Integration', 'Data Visualization', 'UI/UX'],
    category: 'web',
    link: 'https://github.com/nihalbagul/pokemon-card-dashboard',
    github: 'https://github.com/nihalbagul/pokemon-card-dashboard',
    stats: { stars: '85+', performance: '99%', rating: '4.7' },
    color: 'from-yellow-500 to-orange-500',
    accentColor: 'rgba(234, 179, 8, 0.3)',
  },
  {
    id: 4,
    title: 'E-Commerce Mobile App',
    description: 'Cross-platform e-commerce mobile application built with Flutter, featuring payment integration, real-time updates, and seamless user experience.',
    fullDescription: 'A full-featured mobile e-commerce application built with Flutter for iOS and Android. Includes Stripe payment integration, push notifications, real-time inventory updates, order tracking, and social sharing features.',
    image: '/images/1.png',
    tags: ['Flutter', 'Mobile Development', 'E-Commerce', 'Payment Gateway'],
    category: 'mobile',
    link: 'https://github.com/nihalbagul/flutter-ecommerce-app',
    github: 'https://github.com/nihalbagul/flutter-ecommerce-app',
    stats: { stars: '60+', performance: '97%', rating: '4.9' },
    color: 'from-green-500 to-emerald-500',
    accentColor: 'rgba(34, 197, 94, 0.3)',
  },
  {
    id: 5,
    title: 'AR/VR Experience Platform',
    description: 'Immersive AR/VR platform built with Unity and Unreal Engine, featuring interactive 3D environments and cross-platform compatibility.',
    fullDescription: 'An immersive AR/VR platform supporting multiple VR headsets and AR devices. Features include real-time interaction, spatial audio, hand tracking, and cross-platform compatibility. Built with Unity and Unreal Engine for maximum performance.',
    image: '/images/2.png',
    tags: ['Unity', 'Unreal Engine', 'AR/VR', '3D Development'],
    category: 'ar-vr',
    link: 'https://github.com/nihalbagul/ar-vr-experience',
    github: 'https://github.com/nihalbagul/ar-vr-experience',
    stats: { stars: '45+', performance: '96%', rating: '4.8' },
    color: 'from-indigo-500 to-purple-500',
    accentColor: 'rgba(99, 102, 241, 0.3)',
  },
  {
    id: 6,
    title: 'SaaS Security Platform',
    description: 'Enterprise-grade SaaS platform for security services with integrated payment gateways, user management, and scalable architecture.',
    fullDescription: 'A comprehensive SaaS platform for enterprise security services. Features include multi-tenant architecture, role-based access control, automated security scanning, compliance reporting, and subscription management with Stripe integration.',
    image: '/images/3.png',
    tags: ['Laravel', 'PHP', 'SaaS', 'Payment Integration'],
    category: 'web',
    link: 'https://github.com/nihalbagul/saas-security-platform',
    github: 'https://github.com/nihalbagul/saas-security-platform',
    stats: { stars: '30+', performance: '99%', rating: '5.0' },
    color: 'from-red-500 to-rose-500',
    accentColor: 'rgba(239, 68, 68, 0.3)',
  },
];

const categories = ['all', 'web', 'mobile', 'ar-vr'];

// Project Detail Modal Component
const ProjectModal = ({ project, isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[400]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={modalRef}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-[401] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`relative bg-black-100/95 backdrop-blur-2xl border border-black-50 rounded-3xl overflow-hidden ${project.color} bg-gradient-to-br`}>
              <motion.button
                onClick={onClose}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center z-50 hover:bg-black/70 transition-all"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              <div className="grid md:grid-cols-2 gap-6 p-5 sm:p-8 md:p-12">
                <motion.div
                  className="relative h-56 md:h-full md:min-h-[400px] rounded-2xl overflow-hidden"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                      <span className="text-8xl">🚀</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </motion.div>

                <div className="flex flex-col justify-center space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white-50">{project.title}</h2>
                    <p className="text-blue-50/80 text-lg leading-relaxed">{project.fullDescription}</p>
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-3 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {Object.entries(project.stats).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-2 sm:p-4 text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.05, borderColor: 'rgba(255, 255, 255, 0.3)' }}
                      >
                        <div className="text-2xl font-bold text-white mb-1">{value}</div>
                        <div className="text-xs text-blue-50/60 uppercase tracking-wider">{key}</div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    className="flex flex-wrap gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {project.tags.map((tag, index) => (
                      <motion.span
                        key={tag}
                        className="px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/20 text-white-50 rounded-lg text-sm font-medium"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.05 }}
                        whileHover={{ scale: 1.1, borderColor: 'rgba(255, 255, 255, 0.4)' }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-3 pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    {project.link && (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-6 py-4 bg-white text-black rounded-xl text-center font-semibold hover:bg-white/90 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Live
                      </motion.a>
                    )}
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-6 py-4 border-2 border-white/30 text-white-50 rounded-xl text-center font-semibold hover:bg-white/10 hover:border-white/50 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        GitHub
                      </motion.a>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};


// Premium Split-Screen Alternating Layout
const SplitScreenView = ({ projects, onProjectClick }) => {
  const containerRef = useRef(null);
  const projectRefs = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Scroll animations with parallax
  useGSAP(() => {
    if (!containerRef.current) return;

    projectRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const isEven = i % 2 === 0;

      // Image parallax
      gsap.to(ref.querySelector('.split-image'), {
        y: -30,
        scrollTrigger: {
          trigger: ref,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Content fade in
      gsap.from(ref.querySelector('.split-content'), {
        opacity: 0,
        x: isEven ? -80 : 80,
        scrollTrigger: {
          trigger: ref,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        duration: 1,
        delay: i * 0.1,
        ease: 'power3.out',
      });

      // Image reveal
      gsap.from(ref.querySelector('.split-image'), {
        opacity: 0,
        scale: 1.1,
        scrollTrigger: {
          trigger: ref,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        duration: 1.2,
        delay: i * 0.1 + 0.2,
        ease: 'power3.out',
      });
    });
  }, [projects]);

  return (
    <div 
      ref={containerRef}
      className="split-screen-container"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {projects.map((project, index) => {
        const isHovered = hoveredIndex === index;
        const isEven = index % 2 === 0;
        const projectRef = (el) => {
          projectRefs.current[index] = el;
        };
        
        return (
          <div
            key={project.id}
            ref={projectRef}
            className={`split-project ${isEven ? 'split-left' : 'split-right'}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => onProjectClick(project)}
          >
            <div className="split-project-inner">
              {/* Image Section */}
              <motion.div 
                className="split-image-section"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <div className="split-image-wrapper">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="split-image"
                    />
                  ) : (
                    <div className={`split-image bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                      <motion.span 
                        className="text-9xl"
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.15, 1]
                        }}
                        transition={{ 
                          duration: 5, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                      >
                        🚀
                      </motion.span>
                    </div>
                  )}
                  <div className={`split-image-overlay ${isHovered ? 'active' : ''}`} />
                  <div className="split-image-shine" />
                </div>
              </motion.div>

              {/* Content Section */}
              <motion.div 
                className="split-content-section"
                whileHover={{ x: isEven ? -5 : 5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="split-content">
                  <div className="split-content-header">
                    <div className="split-project-number">{String(index + 1).padStart(2, '0')}</div>
                    <div className="split-project-category">{project.category}</div>
                  </div>

                  <h2 className="split-project-title">{project.title}</h2>
                  
                  <p className="split-project-description">
                    {project.fullDescription || project.description}
                  </p>

                  <div className="split-project-tags">
                    {project.tags.map((tag) => (
                      <motion.span 
                        key={tag} 
                        className="split-tag"
                        whileHover={{ scale: 1.1, y: -3 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <div className="split-project-stats">
                    {Object.entries(project.stats).map(([key, value]) => (
                      <motion.div 
                        key={key} 
                        className="split-stat"
                        whileHover={{ scale: 1.05, y: -3 }}
                      >
                        <div className="split-stat-value">{value}</div>
                        <div className="split-stat-label">{key}</div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div 
                    className="split-project-cta"
                    whileHover={{ scale: 1.02, x: isEven ? -5 : 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>View Project</span>
                    <motion.span
                      animate={isHovered ? { x: [0, 8, 0] } : { x: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Connecting Line */}
              {index < projects.length - 1 && (
                <div className="split-connector">
                  <div className="split-connector-line" />
                  <div className="split-connector-dot" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Advanced scroll-triggered animations
  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 60,
        scale: 0.9,
        filter: 'blur(15px)',
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 60%',
          scrub: 1,
        },
      }
    );
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    trackEvent('project_filter', { category });
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Perfect seamless fade */}
      <div 
        className="absolute top-0 left-0 right-0 h-20 pointer-events-none -z-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.92) 20%, rgba(0, 0, 0, 0.7) 45%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.1) 90%, transparent 100%)',
        }}
      />
      
      <div className="w-full h-full md:px-10 px-5 relative z-10">
        <div ref={titleRef}>
          <TitleHeader
            title="Featured Projects"
            Sub="Explore my latest work and creative solutions"
          />
        </div>

        {/* Enhanced Search and Filter */}
        <div className="search-filter-container mt-12 mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
          {/* Premium Search Bar */}
          <motion.div 
            className="w-full md:w-auto flex justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <PremiumSearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
            />
          </motion.div>

          {/* Premium Category Filters */}
          <motion.div 
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {categories.map((category) => (
              <PremiumFilterButton
                key={category}
                category={category}
                isActive={activeCategory === category}
                onClick={() => handleCategoryClick(category)}
              />
            ))}
          </motion.div>
        </div>

        {/* Ultra-Premium 3D Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchQuery}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProjects.length > 0 ? (
              <SplitScreenView 
                projects={filteredProjects} 
                onProjectClick={handleProjectClick}
              />
            ) : (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-white-50 text-xl">No projects found matching your criteria.</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
      />
    </section>
  );
};

export default ProjectsSection;
