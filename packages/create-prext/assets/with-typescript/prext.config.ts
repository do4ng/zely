import { defineConfig } from 'prext/config';
import { Message } from './middlewares/message';

export default defineConfig({
  port: 5050,
  middlewares: [Message],
  routes: './pages',
});
