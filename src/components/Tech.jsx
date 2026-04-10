import React, { useState, useEffect } from "react";

import BallCanvas from "../components/HeroModels/Ball";

import { SectionWrapper } from "../hoc";
import { technologies } from  '../../constants'

const Tech = () => {
  const [visibleTechs, setVisibleTechs] = useState([]);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const containerRef = React.useRef(null);

  // Intersection Observer to only render when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Staggered loading of tech icons to prevent context loss
  useEffect(() => {
    if (!isIntersecting) return;

    // Load technologies in batches of 6
    const batchSize = 6;
    let currentIndex = 0;

    const loadBatch = () => {
      const batch = technologies.slice(currentIndex, currentIndex + batchSize);
      setVisibleTechs((prev) => [...prev, ...batch]);
      currentIndex += batchSize;

      if (currentIndex < technologies.length) {
        // Wait 300ms before loading next batch
        setTimeout(loadBatch, 300);
      }
    };

    loadBatch();
  }, [isIntersecting]);

  return (
    <div ref={containerRef} className='flex flex-row flex-wrap justify-center gap-10'>
      {visibleTechs.map((technology, index) => (
        <div className='w-28 h-28' key={technology.name}>
          <BallCanvas 
            icon={technology.icon} 
            techName={technology.name}
            index={index}
            forceRender={index < 6} // Force render first 6
          />
        </div>
      ))}
      {!isIntersecting && (
        <div className='w-28 h-28 flex items-center justify-center text-gray-500'>
          Loading...
        </div>
      )}
    </div>
  );
};

export default SectionWrapper(Tech, "");