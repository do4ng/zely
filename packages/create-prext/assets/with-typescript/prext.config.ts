import { defineConfig } from 'prext';
import { Message } from './middlewares/message';

export default defineConfig({
  port: 5050,
  middlewares: [Message],
  routes: './pages',
});
