import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    tanstackRouter({ autoCodeSplitting: true }),
    viteReact(),
    viteSingleFile(),
    {
      name: 'rename',
      enforce: 'post',
      generateBundle(_, bundle) {
        bundle['index.html'].fileName = bundle['index.html'].fileName.replace('index', 'singstar');
      },
    },
  ],
  resolve: { alias: { '@': resolve(__dirname, './src') } },
  build: { target: 'baseline-widely-available' },
});
