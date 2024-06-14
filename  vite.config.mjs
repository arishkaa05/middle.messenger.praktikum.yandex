import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';


export default defineConfig({
  root: resolve(__dirname, './src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    assetsDir: 'static',
  },
  server: {
    middlewareMode: 'ssr',
    port: 3000,
  }, 
  plugins: [handlebars()],
}); 