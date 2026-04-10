import { useEffect } from 'react';

const KeyboardShortcuts = () => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl/Cmd + K for search (if you add search later)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Add search functionality here if needed
      }

      // Escape to close modals/menus
      if (e.key === 'Escape') {
        // Close any open modals or dropdowns
        const modals = document.querySelectorAll('[data-modal]');
        modals.forEach(modal => {
          if (modal.classList.contains('open')) {
            modal.classList.remove('open');
          }
        });
      }

      // Arrow keys for navigation (optional)
      // Home key to scroll to top
      if (e.key === 'Home' && e.ctrlKey) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // End key to scroll to bottom
      if (e.key === 'End' && e.ctrlKey) {
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return null;
};

export default KeyboardShortcuts;

