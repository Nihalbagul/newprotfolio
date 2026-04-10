import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { blogPosts } from '../../constants';
import TitleHeader from '../components/TitleHeader';

// Map each category to a gradient for the card cover
const categoryGradients = {
  'Three.js':    'from-purple-600/70 to-blue-700/70',
  '3D':          'from-indigo-600/70 to-purple-700/70',
  'React':       'from-cyan-600/70 to-blue-600/70',
  'Performance': 'from-orange-600/70 to-red-700/70',
  'WebGL':       'from-green-600/70 to-teal-700/70',
  'Tutorial':    'from-pink-600/70 to-rose-700/70',
  'JavaScript':  'from-yellow-500/70 to-orange-600/70',
  'CSS':         'from-blue-500/70 to-indigo-600/70',
  default:       'from-violet-600/70 to-fuchsia-700/70',
};

const getCoverGradient = (category) =>
  categoryGradients[category] ?? categoryGradients.default;

// Abstract decorative pattern for the cover
const CoverPattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-20" aria-hidden="true">
    <defs>
      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="1" fill="white" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" />
  </svg>
);

const BlogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="blog" ref={ref} className="section-padding section-alt-bg">
      <div className="container mx-auto px-4">
        <TitleHeader
          title="Latest Articles"
          Sub="Thoughts, tutorials, and insights"
        />

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {blogPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
              className="group block rounded-2xl overflow-hidden border border-white/10 hover:border-primary-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/20"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              {/* Gradient cover */}
              <div className={`relative h-28 bg-gradient-to-br ${getCoverGradient(post.category)} overflow-hidden`}>
                <CoverPattern />
                {/* Glow orb */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute top-3 right-3 text-white/60 text-3xl font-black select-none leading-none">
                  {post.category.charAt(0)}
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 text-xs font-medium border border-primary-500/30">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="text-primary-500 group-hover:translate-x-1 transition-transform inline-block font-medium">
                    Read more →
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="https://dev.to/nihalbagul"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300"
          >
            View All Articles
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
