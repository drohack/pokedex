import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/pokedex/',  // Ensure all assets are linked relative to the '/pokedex/' base path
  build: {
    outDir: 'pokedex',  // Ensure the output is placed in the correct folder
    assetsDir: 'assets',  // Folder for images, CSS, and other assets
    rollupOptions: {
      input: 'index.html',  // Ensure the build knows your entry HTML file
    },
  },
});
