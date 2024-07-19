import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import dotenv from 'dotenv';
import axios from "axios";

dotenv.config({
  // Load environment variables from .env.production file
  path: `.env.production`,
});

export default defineConfig({
  server: {
    open: true, // Open the browser automatically
    proxy: {
      "/api": {
        target: "http://emmy-app-demo-dev.us-east-1.elasticbeanstalk.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  build: {
    // Output directory for production build
    outDir: 'dist',

    // Set correct base path for deployment
    base: '/',

    // Minify CSS and JS for production
    minify: 'terser',

    // Generate sourcemaps for debugging production build
    sourcemap: false,

    // Inline dynamic imports to reduce HTTP requests
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },

  // Define environment variables accessible in your application
  define: {
    'process.env': {
      VITE_API_BASE_URL: JSON.stringify(process.env.VITE_API_BASE_URL),
    },
  },
});