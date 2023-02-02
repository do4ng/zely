import { defineConfig } from 'prext/config';
import { Message } from './middlewares/message';

export default defineConfig({
  routes: './pages',
  middlewares: [Message],
});
