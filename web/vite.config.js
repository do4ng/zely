import vite from 'vite';

export default vite.defineConfig({
  base: '.',
  build: {
    rollupOptions: {
      input: './index.html',
    },
  },
  publicDir: 'docs',
});
