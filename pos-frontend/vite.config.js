// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Ensure this is also imported if you're using React

export default defineConfig({
  plugins: [react()],
  
  esbuild: {
    include: /\.jsx?$/, // Target .js and .jsx files
    loader: 'jsx',      // Use the JSX loader
  },
  
});