import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { caseStudies } from '../../constants';
import TitleHeader from '../components/TitleHeader';

const CaseStudiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const featuredCases = caseStudies.filter(cs => cs.featured);
  const otherCases = caseStudies.filter(cs => !cs.featured);

  return (
    <section id="case-studies" ref={ref} className="section-padding section-alt-bg">
      <div className="container mx-auto px-4">
        <TitleHeader 
          title="Case Studies" 
          subtitle="Detailed project breakdowns and success stories" 
        />

        {/* Featured Case Studies */}
        <div className="mt-16 space-y-12">
          {featuredCases.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-black-50 to-black-100 border border-white/10 hover:border-primary-500/50 transition-all duration-300"
            >
              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Left - Image */}
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Right - Content */}
                <div className="flex flex-col justify-center space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 text-xs font-medium border border-primary-500/30">
                        {caseStudy.year}
                      </span>
                      <span className="text-gray-400 text-sm">{caseStudy.client}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-primary-500 transition-colors">
                      {caseStudy.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-primary-400 mb-2">Challenge</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{caseStudy.challenge}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-primary-400 mb-2">Solution</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{caseStudy.solution}</p>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-semibold text-primary-400 mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-white/5 text-gray-300 text-xs border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <h4 className="text-sm font-semibold text-primary-400 mb-3">Results</h4>
                    <ul className="space-y-2">
                      {caseStudy.results.map((result, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="text-primary-500 mt-1">✓</span>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pt-4">
                    {caseStudy.link && (
                      <a
                        href={caseStudy.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors"
                      >
                        View Project
                      </a>
                    )}
                    {caseStudy.github && (
                      <a
                        href={caseStudy.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 text-sm font-medium hover:bg-white/10 border border-white/10 transition-colors"
                      >
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Case Studies Grid */}
        {otherCases.length > 0 && (
          <div className="mt-16">
            <h3
              className="text-2xl font-bold mb-8"
              style={{
                background: 'linear-gradient(135deg, #fff 30%, rgba(139,92,246,0.9) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              More Projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherCases.map((caseStudy, index) => (
                <motion.div
                  key={caseStudy.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: (featuredCases.length * 0.2) + (index * 0.1) }}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-black-50 to-black-100 border border-white/10 hover:border-primary-500/50 transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-2 py-1 rounded bg-primary-500/20 text-primary-400 text-xs font-medium">
                        {caseStudy.year}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary-500 transition-colors">
                      {caseStudy.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{caseStudy.challenge}</p>
                    <div className="flex gap-2">
                      {caseStudy.link && (
                        <a
                          href={caseStudy.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-500 text-sm font-medium hover:text-primary-400 transition-colors"
                        >
                          View →
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudiesSection;

