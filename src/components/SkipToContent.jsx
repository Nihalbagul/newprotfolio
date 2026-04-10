const SkipToContent = () => {
  const handleSkip = (e) => {
    e.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <a
      href="#main-content"
      onClick={handleSkip}
      className="skip-to-content"
      onFocus={(e) => e.target.style.opacity = '1'}
      onBlur={(e) => e.target.style.opacity = '0'}
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;

