// This file was automatically generated by prext.

const zely = require('zely');

async function main() {
  // config
  const config = {
    ...(await zely.getConfig()),
  };

  // server
  const server = await zely.Zely(config);

  // port
  const port = config.port || 3000;

  // generate cache files

  await zely.getPages(config);

  server.listen(port, () => {
    console.log('preview server is running.'.gray);

    // show url
    zely.showListen(port);
  });
}

// main

main();
