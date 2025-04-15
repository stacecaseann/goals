import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src/',

  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        goals: resolve(__dirname, 'src/goals.html'),
        setupgoals: resolve(__dirname, 'src/setup-goals.html'),
        challenge: resolve(__dirname, 'src/challenge.html'),
        group: resolve(__dirname, 'src/group.html'),
        thanks: resolve(__dirname, 'src/thankyou.html'),
      },
    },
  },
});
