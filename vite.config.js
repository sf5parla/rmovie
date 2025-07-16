import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries into separate chunks
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          animations: ['framer-motion'],
          icons: ['lucide-react'],
        },
      },
    },
    // Enable source maps for debugging in development
    sourcemap: false,
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true,
  },
  // Enable CSS preprocessing and optimization
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/variables.scss";`
      }
    }
  },
  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['lucide-react']
  },
  // Enable gzip compression
  server: {
    compress: true,
  },
})