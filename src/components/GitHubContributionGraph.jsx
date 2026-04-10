import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { githubUsername } from '../../constants';
import TitleHeader from './TitleHeader';

const GitHubContributionGraph = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [stats, setStats] = useState({
    publicRepos: 0,
    followers: 0,
    following: 0,
    loading: true
  });

  useEffect(() => {
    // Fetch profile stats from public GitHub API.
    const fetchStats = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}`);
        if (response.ok) {
          const data = await response.json();
          setStats({
            publicRepos: data.public_repos ?? 0,
            followers: data.followers ?? 0,
            following: data.following ?? 0,
            loading: false
          });
        } else {
          setStats((prev) => ({ ...prev, loading: false }));
        }
      } catch (error) {
        console.warn('GitHub API error:', error);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    if (isInView && githubUsername) {
      fetchStats();
    }
  }, [isInView]);

  return (
    <section id="github-stats" ref={ref} className="section-padding bg-black-50">
      <div className="container mx-auto px-4">
        <TitleHeader 
          title="GitHub Activity" 
          subtitle="My coding contributions and activity" 
        />

        <div className="mt-16">
          {/* GitHub Contribution Graph Embed */}
          <div className="relative rounded-2xl bg-gradient-to-br from-black-100 to-black-50 border border-white/10 p-8 overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 w-full md:w-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                    {stats.loading ? '...' : stats.publicRepos.toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm mt-2">Public Repos</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                    {stats.loading ? '...' : stats.followers.toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm mt-2">Followers</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                    {stats.loading ? '...' : stats.following.toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm mt-2">Following</div>
                </motion.div>
              </div>

              {/* GitHub Graph Embed */}
              <div className="w-full md:w-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="relative"
                >
                  <img
                    src={`https://github-readme-activity-graph.vercel.app/graph?username=${githubUsername}&theme=react-dark&bg_color=0d1117&hide_border=true&area=true`}
                    alt="GitHub Contribution Graph"
                    className="w-full rounded-lg"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.target.style.display = 'none';
                    }}
                  />
                </motion.div>
              </div>
            </div>

            {/* GitHub Profile Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 text-center"
            >
              <a
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View My GitHub Profile
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubContributionGraph;

