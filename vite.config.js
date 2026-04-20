import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Explicit SPA fallback — serves index.html for all non-asset routes.
// Needed because Vite 8 does not always apply the built-in spa fallback
// when the dev server is accessed directly (e.g. from Cypress E2E tests).
const spaFallback = {
  name: 'spa-fallback',
  configureServer(server) {
    return () => {
      server.middlewares.use((req, res, next) => {
        const url = req.url ?? '/';
        if (
          url.startsWith('/__') ||   // Cypress/Vite internals
          url.startsWith('/@') ||    // Vite virtual modules
          url.includes('?') ||       // Query strings (HMR, etc.)
          /\.[a-zA-Z0-9]+$/.test(url) // Static assets (js, css, png…)
        ) {
          return next();
        }
        req.url = '/index.html';
        next();
      });
    };
  },
};

export default defineConfig({
  appType: 'spa',
  plugins: [react(), spaFallback],
  server: {
    port: 5174,
    strictPort: true,
  },
  optimizeDeps: {
    include: ['cypress/react'],
  },
})
