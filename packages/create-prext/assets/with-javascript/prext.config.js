const { defineConfig } = require('prext');

module.exports = defineConfig({
  port: 5050,
  middlewares: [require('./middlewares/message')],
  routes: './pages',
});
