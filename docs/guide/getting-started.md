# Getting Started

## Using tool

You can create prext application easily with [create-prext](https://npmjs.com/package/create-prext).

---

1. Download Template

::: code-group

```bash [npx]
$ npx create-prext
```

```bash [yarn]
$ yarn create prext
```

:::

2. Install Dependencies

::: code-group

```bash [npm]
$ npm install
```

```bash [yarn]
$ yarn
```

:::

3. Run!

::: code-group

```bash [npm]
$ npm dev # start app
```

```bash [yarn]
$ npm dev # start app
```

:::

## Manual Installation

You can also add prext to a project that already exists.

Enter the command below:

::: code-group

```bash [npm]
$ npm install --save-dev prext
```

```bash [yarn]
$ yarn add -D prext
```

:::

Add the configuration file (`prext.config.ts`).

::: code-group

```ts [prext.config.ts]
import { defineConfig } from 'prext/config';

export default defineConfig({
  // options
});
```

:::
