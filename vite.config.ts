import path from 'path';
import react from '@vitejs/plugin-react';
import linaria from '@linaria/rollup';
import { VitePWA } from 'vite-plugin-pwa';

import { defineConfig, loadEnv } from 'vite';

export default ({ mode }) => {
  const { NODE_ENV, HMR_HOST }: Record<string, string> = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

  const hmr = HMR_HOST
    ? {
        host: HMR_HOST,
        protocol: 'wss',
        port: 443,
      }
    : undefined;

  return defineConfig({
    build: {
      target: 'es2020',
      outDir: path.resolve(__dirname, 'dist'),
    },
    server: {
      host: 'localhost',
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
    plugins: [
      react(),
      linaria({
        sourceMap: NODE_ENV !== 'production',
      }),
      VitePWA({
        useCredentials: true,
        includeAssets: ['favicon.ico', 'favicon.svg','robots.txt','apple-touch-icon.png'],
        manifest: {
          name: 'Hotchoco',
          short_name: 'Hotchoco',
          description: 'Hotchoco: Chat client by Su-Yong',
          theme_color: '#00A4FF',
        },
      }),  
    ],
  });
};
