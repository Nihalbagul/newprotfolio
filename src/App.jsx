import React, { useEffect, Suspense, lazy } from 'react'
import Hero from './sections/Hero'
import SectionTransition from './components/SectionTransition'
import NavBar from './components/NavBar'
import Loader from './components/Loader'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import ThemeToggle from './components/ThemeToggle'
import AboutMe from './sections/AboutMe'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useTheme } from './hooks/useTheme'
import { trackPageView } from './utils/analytics'
import ErrorBoundary from './components/ErrorBoundary'
import SEOHead from './components/SEOHead'
import PWAInstallPrompt from './components/PWAInstallPrompt'
import KeyboardShortcuts from './components/KeyboardShortcuts'
import SkipToContent from './components/SkipToContent'

// Lazy load heavy sections
const ProjectsSection = lazy(() => import('./sections/ProjectsSection'))
const LogoSection = lazy(() => import('./components/LogoSection'))
const ExperienceSection = lazy(() => import('./sections/ExperienceSection'))
const TestimonialsEnhanced = lazy(() => import('./sections/TestimonialsEnhanced'))
const Contact = lazy(() => import('./sections/Contact'))
const Footer = lazy(() => import('./sections/Footer'))
const StatsSection = lazy(() => import('./sections/StatsSection'))
const ServicesSection = lazy(() => import('./sections/ServicesSection'))
const CertificationsSection = lazy(() => import('./sections/CertificationsSection'))
const EducationSection = lazy(() => import('./sections/EducationSection'))
const BlogSection = lazy(() => import('./sections/BlogSection'))
const CaseStudiesSection = lazy(() => import('./sections/CaseStudiesSection'))

// Shimmer skeleton — matches section proportions, no jarring spinner
const SectionLoader = () => (
  <div
    aria-hidden="true"
    style={{
      minHeight: '280px',
      padding: '4rem 1.5rem',
      backgroundColor: '#000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
    }}
  >
    {/* Title skeleton */}
    <div className="skeleton-line" style={{ width: '200px', height: '16px', borderRadius: '8px' }} />
    <div className="skeleton-line" style={{ width: '340px', height: '32px', borderRadius: '8px', marginTop: '4px' }} />
    {/* Content rows */}
    <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '900px', marginTop: '2rem' }}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="skeleton-card"
          style={{ flex: 1, height: '180px', borderRadius: '16px' }}
        />
      ))}
    </div>
  </div>
)


const App = () => {
  useSmoothScroll();
  useTheme(); // Initialize theme system

  useEffect(() => {
    // Track initial page view
    trackPageView(window.location.pathname);
  }, []);

  return (
    <ErrorBoundary>
      <SEOHead />
      <SkipToContent />
      <KeyboardShortcuts />
      <Loader/>
      <CustomCursor />
      <ScrollProgress />
      <div className="floating-theme-toggle hidden lg:block">
        <ThemeToggle />
      </div>
      <BackToTop />
      <PWAInstallPrompt />
      <NavBar/>
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <SectionTransition />
        <AboutMe />
        <Suspense fallback={<SectionLoader />}>
          <StatsSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ExperienceSection/>
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <CaseStudiesSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <CertificationsSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <EducationSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <LogoSection/>
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <TestimonialsEnhanced/>
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <BlogSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact/>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer/>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
