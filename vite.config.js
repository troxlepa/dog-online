import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom']
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@mui/material', '@mui/styles']
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    open: true,
    sourcemap: true,
  },
});


