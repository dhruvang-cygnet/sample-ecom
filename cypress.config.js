import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'bsixz7',
  e2e: {
    baseUrl: 'http://localhost:5174',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx}',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 20000,
    requestTimeout: 10000,
    retries: { runMode: 2, openMode: 0 },
    video: false,
    screenshotOnRunFailure: true,
    experimentalMemoryManagement: true,
    blockHosts: ['picsum.photos'],
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: {
        server: { port: 5175, strictPort: false },
      },
    },
    specPattern: 'cypress/component/**/*.cy.{js,jsx}',
    supportFile: 'cypress/support/component.js',
    indexHtmlFile: 'cypress/support/component-index.html',
    viewportWidth: 800,
    viewportHeight: 600,
  },
});
