import React, { useEffect, useState, useRef } from 'react'
import { navLinks } from '../../constants'
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const transitionTimeoutRef = useRef(null);
    const isTransitioningRef = useRef(false);
    const lastClickTimeRef = useRef(0);

    // Handle menu toggle with minimal lock for fast responsiveness
    const handleMenuToggle = (open) => {
        const now = Date.now();
        const timeSinceLastClick = now - lastClickTimeRef.current;
        
        // Very minimal debounce (50ms) - just to prevent double-clicks
        if (timeSinceLastClick < 50) {
            return;
        }

        // Only prevent if we're trying to toggle to the same state while transitioning
        if (isTransitioningRef.current && mobileMenuOpen === open) {
            return;
        }

        // Update last click time
        lastClickTimeRef.current = now;

        // Set transition lock immediately (using ref for instant check)
        isTransitioningRef.current = true;
        setIsTransitioning(true);
        
        // Clear any existing timeout
        if (transitionTimeoutRef.current) {
            clearTimeout(transitionTimeoutRef.current);
        }

        // Update state immediately - allow fast toggling
        setMobileMenuOpen(open);

        // Release lock quickly (350ms - matches faster animation)
        transitionTimeoutRef.current = setTimeout(() => {
            isTransitioningRef.current = false;
            setIsTransitioning(false);
        }, 350);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (transitionTimeoutRef.current) {
                clearTimeout(transitionTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        let rafId = null;
        let ticking = false;
        const sectionsCache = navLinks.map(link => ({
            name: link.name,
            link: link.link,
            element: null
        }));

        // Cache section elements once
        const cacheSections = () => {
            sectionsCache.forEach(section => {
                if (!section.element) {
                    section.element = document.querySelector(section.link);
                }
            });
        };
        cacheSections();

        const onScroll = () => {
            if (!ticking) {
                rafId = requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    setScrolled(scrollY > 10);
                    
                    // Only update active link if scrolled significantly
                    const scrollPosition = scrollY + 150;
                    
                    for (let i = sectionsCache.length - 1; i >= 0; i--) {
                        const section = sectionsCache[i];
                        if (section.element) {
                            const { offsetTop, offsetHeight } = section.element;
                            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                                setActiveLink(prev => prev !== section.link ? section.link : prev);
                                ticking = false;
                                return;
                            }
                        }
                    }
                    
                    // Default to first section if at top
                    if (scrollY < 100) {
                        setActiveLink(prev => prev !== '#hero' ? '#hero' : prev);
                    }
                    
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll(); // Check on mount
        
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    useEffect(() => {
        // Prevent body scroll when mobile menu is open
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.height = '100%';
            // Prevent iOS bounce scroll
            document.body.style.touchAction = 'none';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
            document.body.style.touchAction = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
            document.body.style.touchAction = '';
        };
    }, [mobileMenuOpen]);

    // Ensure menu is closed on component mount
    useEffect(() => {
        setMobileMenuOpen(false);
    }, []);

    const handleLinkClick = () => {
        // Close menu when logo is clicked
        if (mobileMenuOpen) {
            handleMenuToggle(false);
        }
    };

  return (
    <>
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"} ${mobileMenuOpen ? "sidebar-open" : ""}`}>
      <div className="inner">
        <motion.a 
            href="#hero" 
            className="logo" 
            onClick={handleLinkClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <span className="logo-text">Nihal Bagul</span>
            <span className="logo-divider hidden sm:inline">|</span>
            <span className="logo-dev hidden sm:inline">Dev</span>
            <span className="logo-short sm:hidden">NB</span>
        </motion.a>

        <nav className="desktop">
            <ul>
                {navLinks.map(({link, name}) => (
                    <li key={name} className={`group ${activeLink === link ? 'active' : ''}`}>
                        <a href={link} onClick={(e) => {
                            e.preventDefault();
                            const target = document.querySelector(link);
                            if (target) {
                                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }}>
                            <span>{name}</span>
                            <span className="underline"/>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>

        <div className="navbar-right shrink-0">
            {/* Mobile Menu Button Container - keeps position consistent */}
            <div className="mobile-menu-btn-wrapper xl:hidden relative">
                {/* Hamburger Button */}
                <button 
                    className="mobile-menu-btn"
                    style={{
                        opacity: mobileMenuOpen ? 0 : 1,
                        pointerEvents: (mobileMenuOpen || isTransitioning) ? 'none' : 'auto',
                        position: 'relative',
                        zIndex: mobileMenuOpen ? 1 : 2
                    }}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleMenuToggle(!mobileMenuOpen);
                    }}
                    aria-label="Open menu"
                    disabled={isTransitioning}
                >
                    <div className="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>
                
                {/* Close Button - appears at exact hamburger position when sidebar is open */}
                <button 
                    className={`mobile-menu-close-btn ${mobileMenuOpen ? 'visible' : 'hidden'}`}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleMenuToggle(false);
                    }}
                    aria-label="Close menu"
                    disabled={isTransitioning && mobileMenuOpen}
                    style={{
                        pointerEvents: (!mobileMenuOpen) ? 'none' : 'auto'
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

        <motion.a 
            href="#contact" 
            className="contact-btn contact-btn-clean hidden lg:flex" 
            onClick={(e) => {
                e.preventDefault();
                const scrollToContact = () => {
                    const target = document.getElementById('contact') || document.querySelector('#contact');
                    if (target) {
                        const navbar = document.querySelector('.navbar');
                        const navbarHeight = navbar ? (navbar.offsetHeight || 80) : 80;
                        const rect = target.getBoundingClientRect();
                        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                        const targetTop = rect.top + scrollTop;
                        const finalPosition = targetTop - navbarHeight - 20;
                        window.scrollTo({
                            top: Math.max(0, finalPosition),
                            behavior: 'smooth'
                        });
                        window.history.pushState(null, '', '#contact');
                        setActiveLink('#contact');
                        return true;
                    }
                    return false;
                };
                
                if (!scrollToContact()) {
                    setTimeout(() => {
                        if (!scrollToContact()) {
                            window.location.hash = '#contact';
                            setTimeout(() => scrollToContact(), 200);
                        }
                    }, 100);
                }
            }}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            <span className="contact-btn-label">Contact Me</span>
            <svg
                className="contact-btn-arrow"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
        </motion.a>
        </div>
      </div>
    </header>

    {/* Mobile Sidebar */}
    <AnimatePresence>
        {mobileMenuOpen && (
            <>
                {/* Expanding Circle Background - positioned from hamburger button */}
                <motion.div
                    className="mobile-menu-expanding-circle"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 15, opacity: 0.8 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ 
                        type: 'spring',
                        damping: 25,
                        stiffness: 70,
                        mass: 0.3,
                        velocity: 0
                    }}
                    style={{
                        willChange: 'transform, opacity',
                        transform: 'translate3d(-50%, -50%, 0)',
                        backfaceVisibility: 'hidden',
                        pointerEvents: 'none'
                    }}
                />
                
                {/* SVG Blob Backgrounds - Disabled for performance */}
                {/* <svg className="mobile-menu-svg-left" viewBox="0 0 600 400" preserveAspectRatio="none">
                    <path className="mobile-menu-blob" d="M220.262,366.814c41.228-14.367,64.978-58.826,96.198-136.802
                        c43.518-108.692,53.929-137.426,67.672-149.92s154.708-58.065,177.821-65.59C576.392,9.802,591.841,5.391,596.66-2H-2v334.452
                        c16.689,8.319,35.468,14.508,56.726,18.745C98.453,359.914,179.034,381.181,220.262,366.814z"/>
                </svg>
                <svg className="mobile-menu-svg-right" viewBox="0 0 600 400" preserveAspectRatio="none">
                    <path className="mobile-menu-blob2" d="M361.076,143.985c9.307,26.708,38.108,42.094,88.622,62.319
                        c70.412,28.192,89.027,34.936,97.12,43.839c8.093,8.903,37.615,100.223,42.49,115.196c3.045,9.354,5.902,19.361,10.691,22.483V0
                        H383.337c-5.389,10.811-9.398,22.976-12.143,36.748C365.547,65.075,351.769,117.277,361.076,143.985z"/>
                </svg> */}
                
                {/* Overlay */}
                <motion.div
                    className="mobile-menu-overlay"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 0.95, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ 
                        duration: 0.3,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        opacity: { 
                            duration: 0.25,
                            ease: [0.25, 0.46, 0.45, 0.94]
                        },
                        scale: {
                            duration: 0.3,
                            ease: [0.25, 0.46, 0.45, 0.94]
                        }
                    }}
                    style={{
                        willChange: 'opacity, transform',
                        transform: 'translate3d(0, 0, 0)',
                        backfaceVisibility: 'hidden',
                        perspective: '1000px'
                    }}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleMenuToggle(false);
                    }}
                />
                
                {/* Sidebar */}
                <motion.nav
                    className="mobile-menu"
                    initial={{ x: '100%', opacity: 0, visibility: 'hidden' }}
                    animate={{ x: 0, opacity: 1, visibility: 'visible' }}
                    exit={{ x: '100%', opacity: 0, visibility: 'hidden' }}
                    transition={{ 
                        type: 'spring', 
                        damping: 25, 
                        stiffness: 400,
                        mass: 0.3,
                        delay: 0.05,
                        restDelta: 0.01,
                        restSpeed: 0.01,
                        opacity: { 
                            duration: 0.25, 
                            ease: [0.25, 0.46, 0.45, 0.94],
                            delay: 0
                        }
                    }}
                    style={{
                        willChange: 'transform, opacity',
                        transform: 'translate3d(0, 0, 0)',
                        backfaceVisibility: 'hidden',
                        perspective: '1000px'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="mobile-sidebar-header">
                        <div className="mobile-sidebar-header-content">
                            <div className="mobile-sidebar-logo">
                                <div className="mobile-sidebar-logo-icon">NB</div>
                            </div>
                            <div className="mobile-sidebar-brand">
                                <h2 className="mobile-sidebar-title">Nihal Bagul</h2>
                                <div className="mobile-sidebar-subtitle">Portfolio Navigation</div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <div className="mobile-sidebar-menu">
                        {navLinks.map(({link, name}, index) => {
                            const isActive = activeLink === link;
                            // Icon mapping for each section
                            const getIcon = (name) => {
                                const icons = {
                                    About: (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                                        </svg>
                                    ),
                                    Experience: (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                                            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                                        </svg>
                                    ),
                                    Services: (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                                            <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                                        </svg>
                                    ),
                                    Work: (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                                            <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                                        </svg>
                                    ),
                                    Testimonials: (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                        </svg>
                                    ),
                                };
                                return icons[name] || (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                                    </svg>
                                );
                            };
                            const getSubtitle = (name) => {
                                const subtitles = {
                                    'About': 'Know more about me',
                                    'Experience': 'Work history',
                                    'Services': 'What I offer',
                                    'Work': 'My projects',
                                    'Testimonials': 'Client reviews',
                                };
                                return subtitles[name] || 'Section';
                            };
                            return (
                                <motion.div
                                    key={name}
                                    className={`mobile-sidebar-item ${isActive ? 'active' : ''}`}
                                    initial={{ opacity: 0, x: '20%', scale: 0.97 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    transition={{ 
                                        delay: 0.15 + (index * 0.03),
                                        duration: 0.35,
                                        ease: [0.25, 0.46, 0.45, 0.94],
                                        opacity: { 
                                            duration: 0.25,
                                            ease: [0.25, 0.46, 0.45, 0.94]
                                        },
                                        x: {
                                            duration: 0.35,
                                            ease: [0.25, 0.46, 0.45, 0.94]
                                        },
                                        scale: { 
                                            duration: 0.3, 
                                            ease: [0.25, 0.46, 0.45, 0.94]
                                        }
                                    }}
                                    style={{
                                        willChange: 'transform, opacity',
                                        transform: 'translate3d(0, 0, 0)',
                                        backfaceVisibility: 'hidden'
                                    }}
                                >
                                    <a 
                                        href={link}
                                        className="mobile-sidebar-link"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            
                                            // Don't block if transitioning
                                            if (isTransitioning || isTransitioningRef.current) {
                                                return;
                                            }
                                            
                                            // Close menu first
                                            setMobileMenuOpen(false);
                                            
                                            // Scroll to target after menu starts closing
                                            // Use longer delay for lazy-loaded sections like Contact
                                            const scrollDelay = link === '#contact' ? 500 : 300;
                                            
                                            setTimeout(() => {
                                                const scrollToSection = (attempt = 0) => {
                                                    try {
                                                        // Extract ID from link (remove #)
                                                        const sectionId = link.replace('#', '');
                                                        
                                                        // Try multiple ways to find the element
                                                        let target = null;
                                                        
                                                        // Method 1: getElementById (fastest and most reliable)
                                                        target = document.getElementById(sectionId);
                                                        
                                                        // Method 2: Query selector with hash
                                                        if (!target) {
                                                            target = document.querySelector(link);
                                                        }
                                                        
                                                        // Method 3: Try section tag specifically
                                                        if (!target) {
                                                            target = document.querySelector(`section#${sectionId}`);
                                                        }
                                                        
                                                        // Method 4: Try any element with the ID
                                                        if (!target) {
                                                            target = document.querySelector(`[id="${sectionId}"]`);
                                                        }
                                                        
                                                        if (target && target.offsetParent !== null) {
                                                            // Element exists and is visible
                                                            // Get navbar height dynamically
                                                            const navbar = document.querySelector('.navbar');
                                                            const navbarHeight = navbar ? (navbar.offsetHeight || 80) : 80;
                                                        
                                                            // Calculate scroll position accurately
                                                            const rect = target.getBoundingClientRect();
                                                            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                                                            const targetTop = rect.top + scrollTop;
                                                        
                                                            // Scroll with offset for navbar + padding
                                                            const finalPosition = targetTop - navbarHeight - 20;
                                                        
                                                            // Perform smooth scroll
                                                            window.scrollTo({
                                                                top: Math.max(0, finalPosition),
                                                                behavior: 'smooth'
                                                            });
                                                        
                                                            // Update URL hash without triggering scroll
                                                            if (window.history && window.history.pushState) {
                                                                window.history.pushState(null, '', link);
                                                            }
                                                        
                                                            // Update active link state
                                                            setActiveLink(link);
                                                        
                                                            return true;
                                                        }
                                                        
                                                        return false;
                                                    } catch (error) {
                                                        console.error('Scroll error:', error, link, 'attempt:', attempt);
                                                        return false;
                                                    }
                                                };
                                                
                                                // Try scrolling immediately
                                                if (!scrollToSection(0)) {
                                                    // If failed, wait and retry (for lazy loaded sections)
                                                    setTimeout(() => {
                                                        if (!scrollToSection(1)) {
                                                            // Wait even more for very slow sections (like Contact)
                                                            setTimeout(() => {
                                                                if (!scrollToSection(2)) {
                                                                    // Final fallback: use hash navigation and wait
                                                                    window.location.hash = link;
                                                                    // Try multiple times after hash change
                                                                    let retryCount = 0;
                                                                    const maxRetries = 20; // 2 seconds max
                                                                    const retryInterval = setInterval(() => {
                                                                        retryCount++;
                                                                        if (scrollToSection(3) || retryCount >= maxRetries) {
                                                                            clearInterval(retryInterval);
                                                                        }
                                                                    }, 100);
                                                                }
                                                            }, 300);
                                                        }
                                                    }, 200);
                                                }
                                            }, scrollDelay);
                                        }}
                                    >
                                        <span className="mobile-sidebar-icon-svg">{getIcon(name)}</span>
                                        <div className="mobile-sidebar-content">
                                            <span className="mobile-sidebar-text">{name}</span>
                                            <span className="mobile-sidebar-subtitle-text">{getSubtitle(name)}</span>
                                        </div>
                                        {isActive && (
                                            <motion.span 
                                                className="mobile-sidebar-active-dot"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
                                            />
                                        )}
                                    </a>
                                </motion.div>
                            );
                        })}
                        
                    </div>

                    {/* User Profile Section */}
                    <motion.div
                        className="mobile-sidebar-profile"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (navLinks.length || 0) * 0.05 + 0.1 }}
                    >
                        <div className="mobile-sidebar-profile-avatar">
                            <span>NB</span>
                        </div>
                        <div className="mobile-sidebar-profile-info">
                            <div className="mobile-sidebar-profile-name">Nihal Bagul</div>
                            <div className="mobile-sidebar-profile-status">
                                <span className="mobile-sidebar-profile-icon">🔥</span>
                                <span>Available for work</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Actions */}
                    <div className="mobile-sidebar-actions">
                        <LanguageSwitcher />
                        <ThemeToggle />
                    </div>
                </motion.nav>
            </>
        )}
    </AnimatePresence>
    </>
  )
}

export default NavBar
