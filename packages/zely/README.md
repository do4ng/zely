[![img](https://github.com/do4ng/zely/blob/3.0-next/.github/assets/icon-v3-white.svg)](https://github.com/do4ng/zely)

# Prext

Prext is a backend framework for Node.js

[**github**](https://github.com/do4ng/zely) • [**npm**](https://npmjs.com/package/zely) • [**website**](https://zely.netlify.app/)

## Features

- **🚧 File-based routing.** Prext.js creates routes automatically with filenames.
- **🚀 Server Reload.** You don't have to restart server to apply changes.
- **✅ Typescript Supported.**
- **⚡ Lightning fast.**

## Installation

- use create-prext

```sh
> npx create-zely
```

- Manual installation

```sh
> npm install --save-dev zely
```

```ts
// prext.config.ts
import { defineConfig } from 'zely';

export default defineConfig({
  port: 3000,
  routes: '/pages/',
});
```

## Example

Visit [playground](https://github.com/do4ng/zely/tree/main/playground)!

## License

MIT
