import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/EssenceAndAura-React/', // Adjust to match your repository name
  plugins: [react()],
});
