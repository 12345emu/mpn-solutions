// Configuration for API endpoints
export const API_CONFIG = {
  basePath: '/php/api/',
};

// Get API base URL
export function getApiBase() {
  const isDev = import.meta.env.DEV;
  const isViteDev = isDev && window.location.port && ['5173', '5174', '3000'].includes(window.location.port);
  
  if (isViteDev) {
    // In Vite dev server, use proxy
    return '/php/api/';
  }
  
  // In production, use configured base path
  return API_CONFIG.basePath;
}


