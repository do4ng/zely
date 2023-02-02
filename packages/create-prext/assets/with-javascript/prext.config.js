const { defineConfig } = require('prext/config');

module.exports = defineConfig({
  port: 5050,
  middlewares: [require('./middlewares/message')],
  routes: './pages',
});
