# Build

You can export your backend application!

Although you didn't install dependencies or removed pages by mistake, you can start server with this feature.

This feature creates a ready-to-run javascript file like an executable (such as `exe`).

## Before Build

You have to update configure file (`prext.config.js` or `prext.config.ts`).
::: code-group

```ts [prext.config.ts]
import { defineConfig } from 'prext'; // [!code --]
import { defineConfig } from 'prext/config'; // [!code ++]
```

:::

This step helps reduce the size of the output.

## Usage

Run:

```bash
$ prext export
```

will create `dist/index.js`. And check if it works well.

```bash
$ node dist/index.js
```

Then, remove `node_modules` and `pages`!

```bash
$ rimraf node_modules
$ rimraf pages
```

Check again if it works.

```bash
$ node dist/index.js
```

## CLI

```txt
$ prext export -h
```

## Warning

~~This feature doesn't support html and middlewares.~~
::: info
Middlewares and html have been supported since `^0.0.10`! 🎉🎉
:::
