/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

export default defineConfig({
  build: {
    minify: 'esbuild',
    manifest: true,
    sourcemap: true,
    cssMinify: 'lightningcss',
  },
  test: {
    environment: 'jsdom',
  },
  server: {
    warmup: {
      clientFiles: [
        // commonly used files to warm up the esbuild cache
        './src/Router.tsx',
        './src/index.tsx',
      ],
    },
  },
  css: {
    transformer: 'lightningcss',
  },
  plugins: [react(), TanStackRouterVite(), checker({ typescript: true }), tsconfigPaths()],

  envDir: '../../',
});
