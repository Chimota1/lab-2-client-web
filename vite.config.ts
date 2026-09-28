import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: true, // Автоматичне відкриття браузера
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});