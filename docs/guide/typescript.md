# Typescript

Prext fully supports typescript. Most of tests (while development) were run with typescript. Thus, using typescript is recommended.

## Using [create-prext-app](https://npmjs.com/package/create-prext-app)

```bash
$ npx create-prext-app my-ts-app --with-typescript
```

## Using [create-prext](https://npmjs.com/package/create-prext)

Select Typescript Option

```bash
$ npx create-prext

? Project name: my-app
? Directory: backend
? Template: typescript
```

## Migrantion from Javascript

::: code-group

```ts [page/index.ts]

import { PrextRequest, PrextResponse } from 'prext';

module.exports.get = function(req, res) {  // [!code --];
export function get(req: PrextRequest, res: PrextResponse) { // [!code ++];

  res.end("I love typescript!");
}
```

:::

rename `prext.config.js` to `prext.config.ts`

::: code-group

```ts [prext.config.ts]
// prext.config.js => prext.config.ts
const { defineConfig } = require('prext'); // [!code --];
module.exports = defineConfig({}); // [!code --];

import { defineConfig } from 'prext'; // [!code ++];
export default defineConfig({}); // [!code ++];
```

:::
