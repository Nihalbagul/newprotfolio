import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { certifications } from '../../constants';
import TitleHeader from '../components/TitleHeader';

// Map each issuer to an accent color + an SVG icon symbol
const issuerMeta = {
  'Amazon Web Services': {
    color: '#FF9900',
    bg: 'rgba(255,153,0,0.12)',
    border: 'rgba(255,153,0,0.35)',
    symbol: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.064.056.128.056.184 0 .08-.048.16-.152.24l-.504.336a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.24-.112a2.47 2.47 0 0 1-.288-.376 6.18 6.18 0 0 1-.248-.472c-.624.736-1.408 1.104-2.352 1.104-.672 0-1.208-.192-1.6-.576-.392-.384-.592-.896-.592-1.536 0-.68.24-1.232.728-1.648.488-.416 1.136-.624 1.96-.624.272 0 .552.024.848.064.296.04.6.104.92.176v-.584c0-.608-.128-1.032-.376-1.28-.256-.248-.688-.368-1.304-.368-.28 0-.568.032-.864.104a6.348 6.348 0 0 0-.864.272 2.294 2.294 0 0 1-.28.104.488.488 0 0 1-.128.024c-.112 0-.168-.08-.168-.248v-.392c0-.128.016-.224.056-.28a.59.59 0 0 1 .224-.168c.28-.144.616-.264 1.008-.36A4.84 4.84 0 0 1 4.2 6.032c.928 0 1.608.208 2.04.632.424.424.64 1.064.64 1.92v2.528zm-3.256 1.216c.264 0 .536-.048.824-.144.288-.096.544-.272.76-.512.128-.152.224-.32.272-.512.048-.192.08-.424.08-.696v-.336a6.66 6.66 0 0 0-.736-.136 6.02 6.02 0 0 0-.752-.048c-.536 0-.928.104-1.192.32-.264.216-.392.52-.392.912 0 .368.096.648.296.832.192.192.472.32.84.32zm6.44.88c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.312L7.932 7.1a1.41 1.41 0 0 1-.072-.32c0-.128.064-.2.192-.2h.784c.152 0 .256.024.312.08.064.048.112.16.16.312l1.336 5.272 1.24-5.272c.04-.16.088-.264.152-.312.064-.048.176-.08.32-.08h.64c.152 0 .256.024.32.08.064.048.12.16.152.312l1.256 5.336 1.376-5.336c.048-.16.104-.264.16-.312.064-.048.16-.08.304-.08h.744c.128 0 .2.064.2.2 0 .04-.008.08-.016.128a1.137 1.137 0 0 1-.056.2l-1.544 4.64c-.048.16-.104.264-.168.312-.064.048-.168.08-.304.08h-.688c-.152 0-.256-.024-.32-.08-.064-.056-.12-.16-.152-.32l-1.24-5.168-1.232 5.16c-.04.16-.088.264-.152.32-.064.056-.176.08-.32.08h-.688zm8.184.168c-.416 0-.832-.048-1.232-.144-.4-.096-.712-.2-.92-.32-.128-.072-.216-.152-.248-.224a.56.56 0 0 1-.048-.224v-.408c0-.168.064-.248.184-.248.048 0 .096.008.144.024.048.016.12.048.2.08.272.12.568.216.888.28.328.064.648.096.976.096.52 0 .92-.088 1.2-.264a.86.86 0 0 0 .424-.772.78.78 0 0 0-.216-.568c-.144-.152-.416-.288-.808-.416l-1.16-.36c-.584-.184-1.016-.456-1.284-.816a1.937 1.937 0 0 1-.4-1.176c0-.34.072-.64.216-.896.144-.256.336-.48.576-.664.24-.192.512-.336.832-.432.32-.096.656-.144 1.008-.144.176 0 .36.008.536.032.184.024.352.056.512.096.152.032.296.072.432.12.136.048.24.096.312.144.104.064.18.136.224.216.04.072.064.168.064.288v.376c0 .168-.064.256-.184.256a.83.83 0 0 1-.304-.096 3.652 3.652 0 0 0-1.528-.312c-.472 0-.84.072-1.096.224-.256.152-.384.384-.384.704 0 .224.08.416.24.568.16.152.456.304.88.44l1.136.36c.576.184.992.44 1.248.768.256.328.376.704.376 1.12 0 .348-.072.664-.208.936-.144.272-.336.512-.584.704-.248.2-.544.344-.888.448-.36.112-.744.168-1.16.168z"/>
      </svg>
    ),
  },
  'Meta (Coursera)': {
    color: '#0081FB',
    bg: 'rgba(0,129,251,0.12)',
    border: 'rgba(0,129,251,0.35)',
    symbol: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5.5 7h-2.25v6.5h-2.5V9H10.5V7h7v2zM7 7h2.5v9H7V7z"/>
      </svg>
    ),
  },
  'FreeCodeCamp': {
    color: '#0A0A23',
    bg: 'rgba(10,10,35,0.4)',
    border: 'rgba(60,60,180,0.35)',
    symbol: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.25 17.292l-4.5-4.364 4.5-4.364.707.707-3.625 3.657 3.625 3.657-.707.707zm2.5 0l-.707-.707 3.625-3.657-3.625-3.657.707-.707 4.5 4.364-4.5 4.364z"/>
      </svg>
    ),
  },
  'Three.js Journey': {
    color: '#049EF4',
    bg: 'rgba(4,158,244,0.12)',
    border: 'rgba(4,158,244,0.35)',
    symbol: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
  },
};

const getIssuerMeta = (issuer) =>
  issuerMeta[issuer] ?? {
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.12)',
    border: 'rgba(139,92,246,0.35)',
    symbol: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  };

const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="certifications" ref={ref} className="section-padding">
      <div className="container mx-auto px-4">
        <TitleHeader
          title="Certifications"
          Sub="Credentials & Achievements"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {certifications.map((cert, index) => {
            const meta = getIssuerMeta(cert.issuer);
            return (
              <motion.a
                key={cert.id}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl block"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderColor: 'rgba(255,255,255,0.1)',
                }}
              >
                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-all duration-300 group-hover:w-1.5"
                  style={{ background: meta.color }}
                />

                <div className="p-6 pl-7">
                  {/* Icon */}
                  <div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: meta.bg,
                      border: `1px solid ${meta.border}`,
                      color: meta.color,
                    }}
                  >
                    {meta.symbol}
                  </div>

                  <h3
                    className="text-base font-bold text-white mb-1 leading-snug transition-colors duration-200 line-clamp-2"
                    style={{ '--tw-text-opacity': 1 }}
                  >
                    {cert.title}
                  </h3>

                  <p className="text-xs mb-3" style={{ color: meta.color }}>{cert.issuer}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{cert.date}</span>
                    <span
                      className="group-hover:translate-x-1 transition-transform inline-block font-medium"
                      style={{ color: meta.color }}
                    >
                      View →
                    </span>
                  </div>
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{
                    boxShadow: `inset 0 0 40px ${meta.bg}`,
                  }}
                />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
