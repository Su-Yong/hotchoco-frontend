import react from '@vitejs/plugin-react';
import linaria from 'vite-plugin-linaria';

import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), linaria()],
});
