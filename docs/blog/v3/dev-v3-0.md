# Dev v3.0 <Badge type="info" text="dev" />

We are really excited to introduce v3.

---

> [3.0-next](https://github.com/do4ng/prext/tree/3.0-next)

::: code-group

```bash [Try it!]
npm i prext@next
```

:::

The v2 update was aimed at adding and modifying features. The v3 update aims to stabilize the prext and provide more APIs.

Before we introduce you to this update, we would like to inform you about the end of support for several packages.

## Deprecated packages

- [prexty](https://npmjs.com/package/prexty)

prexty is a plugin created to use a frontend language in prext. However, not only react is supported, but stability is very low and ssr is not properly implemented.

Prexty has always been a burden as a challenge to fix. After much consideration, we have decided to end support.

- [prext-analyst](https://www.npmjs.com/package/prext-analyst)
- [@prext/plugin-kit](https://www.npmjs.com/package/@prext/plugin-kit) (merged into core package)

## Build Command Update

The current build command is not only not optimizing, but also the size of the built code is large.

to fix these problems, we are updating build command.

- Optimizing

Node modules are no longer included in the build result. (This means that the builder will not build `node_modules`)

- Plugin support

## New APIs

### Custom res.send

You can now customize res.send in middleware or plugin.

::: warning

`res.end` doesn't support `usePrewrite`. Use `res.send` instead.

:::

::: code-group

```ts [middleware]
import { usePrewrite } from 'prext';

export function TestMiddleware(req, res, next) {
  usePrewrite(res, (data) => {
    return `I love ${data}`;
  });
  next();
}
```

```ts [plugin]
import { usePrewrite } from 'prext';

export function TestPlugin() {
  return {
    name: 'test-plugin',
    server(server) {
      server.use((req, res, next) => {
        usePrewrite(res, (data) => {
          return `I love ${data}`;
        });
        next();
      });
    },
  };
}
```

:::

::: code-group

```ts [pages/index.ts] {2}
export function get(req, res) {
  res.send('cat'); // not res.end()
}
```

:::

Fetch `/` and you'll see **"I love cat"**.

---

### `$page.use`

You can apply middleware that only works on specific pages.

```ts
export const $page = {
  use(req, res, next) {
    // code here
    next();
  },
};
```

---
