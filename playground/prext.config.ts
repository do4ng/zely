import { writeFileSync } from 'fs';
import { defineConfig } from 'prext/config';
import { Message } from './middlewares/message';
import { join, parse, relative } from 'path';

const regex_script = /<script>(.*?)<\/script>/s;
const regex_template = /<template>(.*?)<\/template>/s;

export default defineConfig({
  routes: './pages',
  middlewares: [Message],
  plugins: [
    {
      name: 'hello',
      transform(id, code) {
        if (id.endsWith('.myhtml')) {
          const script = code.match(regex_script)[0].slice(8, -9);
          const template = code.match(regex_template)[0].slice(10, -11);

          writeFileSync(
            'my-html.js',
            `
            function props() {${script}}
            module.exports.get = function(req,res) {
              res.setHeader('Content-Type', 'text/html');
              res.end(\`${template.replace(
                /{(.+?)}/g,
                (match) => `\${props().props["${match.trim().slice(1, -1)}"]}`
              )}\`)
            }
            `
          );

          return {
            file: parse(id).name,
            m: require(relative(__dirname, join(process.cwd(), 'my-html.js'))),
            modulePath: '',
            type: 'module',
          };
        }
      },
    },
  ],
});
