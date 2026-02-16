// FILE: vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const emptyModule = path.resolve(__dirname, 'src/lib/emptyModule.js');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Stub out hls.js — @react-three/drei optionally imports it for video textures
      // We don't use video textures so we stub it to avoid build errors
      'hls.js/dist/hls.min.js': emptyModule,
      'hls.js': emptyModule,
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom')) return 'vendor-react';
          if (id.includes('node_modules/react-router')) return 'vendor-react';
          if (id.includes('node_modules/react/')) return 'vendor-react';
          if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) return 'vendor-motion';
          if (id.includes('node_modules/three/')) return 'vendor-three';
          if (id.includes('node_modules/@react-three/')) return 'vendor-r3f';
        },
      },
    },
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 4173,
  },
});
