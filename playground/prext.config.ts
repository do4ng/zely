import { defineConfig } from 'prext';
import { Message } from './middlewares/message';

export default defineConfig({
  routes: './pages',
  middlewares: [Message],
});
