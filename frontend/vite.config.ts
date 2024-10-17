import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // This ensures the build output is in a folder named 'build'
  },
  // Add this line to ensure SPA routing works on Render or other hosts:
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // Enable fallback for react-router-dom (for SPA routing)
  esbuild: {
    jsxInject: `import React from 'react'`,
  }
})
