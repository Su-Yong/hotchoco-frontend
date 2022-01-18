import path from 'path';
import react from '@vitejs/plugin-react';
import linaria from '@linaria/rollup';
import css from 'rollup-plugin-css-only';

import { defineConfig, loadEnv } from 'vite';

const host = 'localhost'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    server: {
      host: 'localhost',
      hmr: {
        host: process.env.HMR_HOST ?? 'localhost',
        protocol: 'wss',
        port: 443,
      }
    },
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
}
