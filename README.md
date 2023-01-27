<section align="center">
  <h1>🛰️ prext</h1>
  Prext is a backend framework for Node.js

[**github**](https://github.com/do4ng/prext) • [**npm**](https://npmjs.com/package/prext)

</section>

## Features

- **🚧 File-based routing.** Prext.js creates routes automatically with filenames.
- **🚀 Server Reload.** You don't have to restart server to apply changes.
- **✅ Typescript Supported.**
- **⚡ Lightning fast.**

## Installation

- use create-prext-app

```sh
> yarn create prext-app my-app --with-typescript
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

---

<section align="center">
  <h3>💡 Prext is beta version and needs help</h3>
</section>

---

## License

MIT
