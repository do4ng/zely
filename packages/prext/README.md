# 🛰️ Prext

Prext is a backend framework for Node.js

[**github**](https://github.com/do4ng/prext) • [**npm**](https://npmjs.com/package/prext) • [**website**](https://prext.netlify.app/)

---

> v1 is here! - [announcement](https://prext.netlify.app/guide/announce-v1)

## Features

- **🚧 File-based routing.** Prext.js creates routes automatically with filenames.
- **🚀 Server Reload.** You don't have to restart server to apply changes.
- **✅ Typescript Supported.**
- **⚡ Lightning fast.**

## Installation

- use create-prext

```sh
> npx create-prext
```

- Manual installation

```sh
> npm install --save-dev prext
```

```ts
// prext.config.ts
import { defineConfig } from 'prext';

export default defineConfig({
  port: 3000,
  routes: '/pages/',
});
```

## Example

Visit [playground](https://github.com/do4ng/prext/tree/main/playground)!

## License

MIT
