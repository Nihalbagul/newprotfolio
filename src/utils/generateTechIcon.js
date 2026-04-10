// Generate a text-based icon for technologies without image files
export const generateTechIcon = (techName) => {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 256, 256);
  gradient.addColorStop(0, '#8b5cf6');
  gradient.addColorStop(1, '#3b82f6');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);

  // Add a subtle pattern
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  for (let i = 0; i < 20; i++) {
    ctx.fillRect(
      Math.random() * 256,
      Math.random() * 256,
      2,
      2
    );
  }

  // Text styling
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Get initials or first few letters
  const getInitials = (name) => {
    // Remove special characters and split
    const words = name.replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    } else if (words[0].length >= 2) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return words[0][0].toUpperCase();
  };

  const initials = getInitials(techName);
  ctx.fillText(initials, 128, 128);

  // Return as data URL
  return canvas.toDataURL('image/png');
};

