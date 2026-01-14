import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/php': {
        target: 'http://localhost',
        changeOrigin: true,
        rewrite: (path) => {
          // Rewrite /php to /New%20folder/npm-firm/php for XAMPP
          return '/New%20folder/npm-firm' + path;
        }
      }
    }
  },
  // For React Router - handle all routes
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
})
