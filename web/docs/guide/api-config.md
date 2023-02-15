# Config

## DefineConfig

Create `prext.config.js` or `prext.config.ts` to define config.

1. Default

```ts
export default {};
```

2. Using `config.defineConfig` ( recommended )

```ts
import { defineConfig } from 'prext/config';

export default defineConfig({
  /* config */
});
```

3. Using `main.defineConfig` ( not recommended )

```ts
import { defineConfig } from 'prext';

export default defineConfig({
  /* config */
});
```

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
