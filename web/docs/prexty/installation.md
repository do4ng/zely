# Installation

---

- using create-prext-app

```bash
> npx create-prext-app my-app --react
```

- manual installation

```bash
> npm install --save-dev prexty
```

```ts
// prext.config.ts
import { defineConfig } from 'prext/config';
import { prexty } from 'prexty';
export default defineConfig({
  plugins: [
    // adapter
    prexty(),
    // ...
  ],
});
```

## Loaders

The languages ​​supported by default are:

- [react](/prexty/lang-react)
- comming soon..
