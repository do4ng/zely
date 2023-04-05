const osik = require('osik');
const prext = require('prext');

async function main() {
  const app = osik.osik();

  const middlewares = await prext.generateMiddleware(await prext.getConfig());
  console.log(middlewares);
  app.use(...middlewares);

  app.use((req, res, next) => {
    console.log('page not found');
  });

  app.listen(3000, () => prext.showListen(3000));
}

main();
