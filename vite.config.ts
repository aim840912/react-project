// vite.config.ts (最終解決方案)

import { defineConfig, configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    compression({ algorithm: 'gzip' }),
    compression({ algorithm: 'brotliCompress', ext: '.br' }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    open: true,
    proxy: {}
  },

  test: {
    globals: true,
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        url: 'http://localhost/',
      },
    },
    setupFiles: './src/test/setup.ts',

    // 使用 alias 來模擬所有的靜態資源導入
    alias: [
      {
        find: /^.*\.(css|less|scss|sass|jpg|jpeg|png|gif|webp|svg)$/,
        replacement: path.resolve(__dirname, 'src/test/fileMock.ts'),
      },
    ],

    coverage: {
      reporter: ['text', 'html', 'json'],
      exclude: [...configDefaults.exclude, 'src/mocks/**', 'src/test/**'],
    },
  }
});