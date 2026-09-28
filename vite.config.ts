import { defineConfig } from 'vite';

export default defineConfig({
  base: '/lab-2-client-web/',
  server: {
    port: 3000,
    open: true, // Автоматичне відкриття браузера
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});