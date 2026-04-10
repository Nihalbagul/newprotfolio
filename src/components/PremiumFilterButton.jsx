import React, { useState } from 'react';

const PremiumFilterButton = ({ category, isActive, onClick }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div className="premium-filter-wrapper">
      <button
        type="button"
        className={`premium-filter-button ${isActive ? 'active' : ''} ${isFocused ? 'focused' : ''}`}
        onClick={onClick}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePosition({ x: 50, y: 50 })}
      >
        {/* Animated gradient border */}
        <div className="premium-filter-border-gradient" />
        
        {/* Multi-layer radial reflections for 3D depth */}
        <div className="premium-filter-reflection-primary" />
        <div className="premium-filter-reflection-secondary" />
        
        {/* Glass morphism layers */}
        <div className="premium-filter-glass-layer-1" />
        <div className="premium-filter-glass-layer-2" />
        
        {/* Shimmer effect */}
        <div 
          className="premium-filter-shimmer"
          style={{
            '--mouse-x': `${mousePosition.x}%`,
            '--mouse-y': `${mousePosition.y}%`,
          }}
        />
        
        {/* Edge glow with animation */}
        <div className="premium-filter-edge-glow" />
        <div className="premium-filter-edge-glow-secondary" />
        
        {/* Inner glow for depth */}
        <div className="premium-filter-inner-glow" />
        
        {/* Button text with enhanced styling */}
        <span className="premium-filter-text">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
        
        {/* Active state indicator */}
        {isActive && <div className="premium-filter-active-indicator" />}
      </button>
    </div>
  );
};

export default PremiumFilterButton;

