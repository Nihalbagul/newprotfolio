import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'animation-vendor': ['framer-motion', 'gsap', '@gsap/react'],
        },
      },
    },
  },
  server: {
    port: 3000,
    host: true, // Allow access from network (0.0.0.0)
    strictPort: false, // Try next available port if 3000 is taken
    // Warm critical paths so dependency crawl + optimize finish before the browser requests deps
    warmup: {
      clientFiles: [
        './src/main.jsx',
        './src/App.jsx',
        './src/components/HeroModels/Heroexperience.jsx',
      ],
    },
    proxy: {
      '/api': {
        target: 'https://cielbackendmasterdevelopmentfinal.vercel.app',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path,
      },
    },
  },
  resolve: {
    dedupe: ['react', 'react-dom', 'react-reconciler'],
  },
  optimizeDeps: {
    // Wait for full static import crawl before optimizing — reduces mid-load metadata
    // changes that trigger ERR_OUTDATED_OPTIMIZED_DEP (504 Outdated Optimize Dep).
    holdUntilCrawlEnd: true,
    include: [
      'react',
      'react-dom',
      'three',
      '@react-three/fiber',
      '@react-three/postprocessing',
      // UMD-only; @react-three/drei Stats imports default — must be pre-bundled for ESM interop
      'stats.js',
      // zustand/traditional default-imports CJS shim; pre-bundle so default export exists in dev
      'zustand',
      'zustand/traditional',
      'use-sync-external-store/shim/with-selector.js',
      'framer-motion',
      'gsap',
      '@gsap/react',
    ],
    needsInterop: [
      'stats.js',
      'use-sync-external-store/shim/with-selector.js',
    ],
    // @react-three/drei is large and often re-optimized; pre-bundle ?v= hashes can race
    // with the browser after HMR/config changes. Serve it transformed instead (stable dev).
    exclude: ['@react-three/drei'],
    esbuildOptions: {
      target: 'esnext',
    },
  },
})