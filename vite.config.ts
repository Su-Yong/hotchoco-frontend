import react from '@vitejs/plugin-react';
import linaria from '@linaria/rollup';
import css from 'rollup-plugin-css-only';

import { defineConfig } from 'vite';

export default defineConfig({
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
