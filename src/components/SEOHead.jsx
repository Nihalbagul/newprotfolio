import { useEffect } from 'react';
import { linkedinProfile } from "../../constants";

const SEOHead = () => {
  useEffect(() => {
    // Add structured data (JSON-LD) for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Nihal Bagul",
      "jobTitle": "Full Stack Developer & 3D Visualization Expert",
      "url": "https://nihalbagul.dev",
      "sameAs": [
        linkedinProfile,
        "https://github.com/nihalbagul",
        "https://www.x.com/nihalbagul/"
      ],
      "knowsAbout": [
        "React",
        "Node.js",
        "Three.js",
        "WebGL",
        "AR/VR Development",
        "Full Stack Development",
        "3D Visualization"
      ],
      "description": "Full Stack Developer & 3D Visualization Expert specializing in React, Node.js, Three.js, and AR/VR development."
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return null;
};

export default SEOHead;

