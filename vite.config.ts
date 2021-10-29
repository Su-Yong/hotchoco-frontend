import path from 'path';
import react from '@vitejs/plugin-react';
import linaria from '@linaria/rollup';
import css from 'rollup-plugin-css-only';

import { defineConfig } from 'vite';

export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  plugins: [
    react(),
    linaria({
      sourceMap: process.env.NODE_ENV !== 'production',
    }),
    css({
      output: 'styles.css',
    }),
  ],
});
