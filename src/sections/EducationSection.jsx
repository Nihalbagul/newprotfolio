import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { education } from '../../constants';
import TitleHeader from '../components/TitleHeader';

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" ref={ref} className="section-padding section-alt-bg">
      <div className="container mx-auto px-4">
        <TitleHeader 
          title="Education" 
          subtitle="Academic Background" 
        />

        <div className="max-w-4xl mx-auto mt-16 space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-black-50 to-black-100 border border-white/10 hover:border-primary-500/50 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-primary-500 font-medium">{edu.institution}</p>
                  <p className="text-gray-400 text-sm">{edu.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-300 font-medium">{edu.period}</p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-500 mt-1">GPA: {edu.gpa}</p>
                  )}
                </div>
              </div>

              <p className="text-gray-300 mb-4 leading-relaxed">{edu.description}</p>

              {edu.achievements && edu.achievements.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {edu.achievements.map((achievement, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 text-xs font-medium border border-primary-500/30"
                    >
                      {achievement}
                    </span>
                  ))}
                </div>
              )}

              {/* Timeline connector */}
              {index < education.length - 1 && (
                <div className="absolute left-8 md:left-10 bottom-0 w-0.5 h-8 bg-gradient-to-b from-primary-500/50 to-transparent"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;

