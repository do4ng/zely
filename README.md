<section align="center">
  <h1>🛰️ prext</h1>
  
[![FOSSA Status](fossa-link)](fossa-img)
[![download-badge](download-link)](download-img)
[![version](download-link)](version-badge)

Prext is a backend framework for Node.js

[**github**](https://github.com/do4ng/prext) • [**npm**](https://npmjs.com/package/prext) • [**website**](https://prext.netlify.app/)

</section>

---

- **🚧 File-based routing.** Prext.js creates routes automatically with filenames.
- **🚀 Server Reload.** You don't have to restart server to apply changes.
- **✅ Typescript Supported.**
- **⚡ Lightning fast.**

## Getting Started

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

---

<section align="center">
  <h3>💡 Prext is a recently created package and needs help</h3>
</section>

---

## License

MIT

[download-link]: https://www.npmjs.com/search?q=prext
[fossa-link]: https://app.fossa.com/projects/git%2Bgithub.com%2Fdo4ng%2Fprext?ref=badge_small
[download-img]: https://img.shields.io/npm/dt/prext.svg
[fossa-img]: https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdo4ng%2Fprext.svg?type=small
[version-badge]: https://img.shields.io/npm/v/prext
