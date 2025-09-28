// Get the correct base path for different environments
export const getBasePath = (): string => {
  // For local development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return '/';
  }
  
  // For GitHub Pages
  if (window.location.hostname.includes('github.io')) {
    return '/sdbemergency/';
  }
  
  // Default fallback
  return '/';
};
