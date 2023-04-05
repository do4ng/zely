
            function props() {
  const fs = require('fs');
  const { join } = require('path');

  const file = fs.readFileSync(join(process.cwd(), './message.txt'));

  return {
    props: { file },
  };
}
            module.exports.get = function(req,res) {
              res.setHeader('Content-Type', 'text/html');
              res.end(` message: ${props().props["file"]} `)
            }
            