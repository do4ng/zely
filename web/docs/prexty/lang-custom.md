# Custom Loader

In this page, we will make HTML loader.

> This page is a guide. If you want documentation, visit [here](#).

## Step 0. conception

- `pages/index.myhtml`

```html
<!--server-->
<script>
  // this code will be run in server.
  const fs = require('fs');
  const { join } = require('path');

  const file = fs.readFileSync(join(process.cwd(), './message.txt'));

  return {
    props: { file },
  };
</script>
<!--client-->
<template> message: {file} </template>
```

- `message.txt`

```txt
Hello World
```

Will be in client.

```
message: Hello World
```

## Step 1. create loader

```ts
// languages/html.ts
import { Plugin } from 'prext';
import { writeFileSync } from 'fs';
import { join, parse, relative } from 'path';

// match script/template tag
const regex_script = /<script>(.*?)<\/script>/s;
const regex_template = /<template>(.*?)<\/template>/s;

export function HTML(): Plugin {
  return {
    name: 'html-loader',

    transform(id, code) {
      // just ".html" file is automatically compiled by prext.

      if (id.endsWith('.myhtml')) {
        const script = code.match(regex_script)[0].slice(8, -9);
        const template = code.match(regex_template)[0].slice(10, -11);

        // write module

        writeFileSync(
          'my-html.js',
          `
            function props() {${script}}
            module.exports.get = function(req,res) {
              res.setHeader('Content-Type', 'text/html');
              res.end(\`${
                // transform {file} to props().props["file"]

                template.replace(
                  /{(.+?)}/g,
                  (match) => `\${props().props["${match.trim().slice(1, -1)}"]}`
                )
              }\`)
            }
            `
        );

        return {
          // path
          file: parse(id).name,
          // load js file
          m: require(relative(__dirname, join(process.cwd(), 'my-html.js'))),
          modulePath: '',
          type: 'module',
        };
      }
    },
  };
}
```

## Step 2. test

```ts
// prext.config.ts
import { defineConfig } from 'prext';
import { HTML } from './languages/html';

export default defineConfig({
  plugins: [HTML()],
});
```

And run it.

```bash
> yarn dev # prext dev
```
