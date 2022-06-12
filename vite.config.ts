import path from 'path';

import { defineConfig, loadEnv } from 'vite';

import linaria from '@linaria/rollup';
import solid from 'vite-plugin-solid';

export default ({ mode }) => {
  const { NODE_ENV, HMR_HOST }: Record<string, string> = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

  const hmr = HMR_HOST
    ? {
        host: HMR_HOST,
        protocol: 'wss',
        clientPort: 443,
      }
    : undefined;

  return defineConfig({
    mode: NODE_ENV,
    build: {
      target: 'es2020',
      outDir: path.resolve(__dirname, 'dist'),
    },
    server: {
      host: 'localhost',
      port: 3001,
      strictPort: true,
      hmr,
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
    clearScreen: false,
    plugins: [
      linaria({
        include: './src/**/*.{ts,tsx}',
        babelOptions: {
          presets: [
            '@babel/preset-typescript',
          ],
          plugins: [
            ['babel-plugin-module-resolver', {
              alias: {
                '@': './src',
              },
            }],
          ],
        },
      }),
      solid(),
    ],
  });
};