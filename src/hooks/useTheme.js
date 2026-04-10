import { useState, useEffect } from 'react';

/**
 * Custom hook for theme management (dark/light mode)
 * Persists theme preference in localStorage
 */
export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Check if we're in browser environment
    if (typeof window === 'undefined') return 'dark';
    
    try {
      // Check localStorage first, then system preference
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
        return savedTheme;
      }
    } catch (e) {
      // localStorage might be disabled
      console.warn('localStorage not available:', e);
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const root = document.documentElement;
    
    // Remove both classes first to avoid conflicts
    root.classList.remove('dark', 'light');
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.add('light');
    }
    
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.warn('Failed to save theme to localStorage:', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return { theme, toggleTheme, setTheme };
};

