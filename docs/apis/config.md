# Config

## DefineConfig

Create `prext.config.js` or `prext.config.ts` to define config.

1. Default

::: code-group

```ts [prext.config.ts]
export default {};
```

```js [prext.config.js]
module.exports = {};
```

:::

2. Using `defineConfig()`

::: code-group

```ts [prext.config.ts]
import { defineConfig } from 'prext/config';

export default defineConfig({
  /* config */
});
```

```js [prext.config.js]
const { defineConfig } = require('prext/config');

module.exports = defineConfig({
  /* config */
});
```

:::

## Types

### base

- Type: `string`
- Default: `.`

Project root directory. (only relative path)

### routes

- Type: `string`
- Default: `/pages/`

Directory where page files are located.

### middlewares

- Type: `Array<Middleware>`

Middlewares Array

```ts
function example(req, res, next) {
  req.message = 'Hello World';
  next();
}

export default {
  middlewares: [example],
};
```

### port

- Type: `number`
- Default: `5050`

Port

### handler

- Type: `HandlerType`

Custom Server Handler

```ts
Prext({
  handler: (req, res, routes) => {
    // ...
  },
});
```

### esbuild

- Type: `esbuild.BuildOptions`

Esbuild build option.

### plugins

- Type: `Plugin[]`

Reference: `/guide/api-plugin`

### watch

- Type: `chokidar.WatchOptions`
