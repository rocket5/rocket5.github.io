import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/',
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        privacy: resolve(__dirname, 'src/privacy-policy.html'),
        thankYou: resolve(__dirname, 'src/thank-you.html'),
      },
    },
    assetsInlineLimit: 0,
    copyPublicDir: true,
  },
  server: {
    open: true
  },
}); 