import { defineConfig } from 'prext/config';
import { react, prexty } from 'prexty';

export default defineConfig({
  plugins: [prexty(), react()],
});
