# Getting Started

## Using tool

You can create prext application easily with [create-prext-app](https://npmjs.com/package/create-prext-app).

---

1. Download Template

```bash
> npx create-prext-app my-app
```

2. Install Dependencies

```bash
> cd my-app
> npm i # install dependencies
```

3. Run!

```bash
> npm dev # start app
```

### with typescript

add `--with-typescript` flag.

```bash
> npx create-prext-app my-app --with-typescript
```

## Manual Installation

```bash
> npm install --save-dev prext
```

```js
// prext.config.ts
import { defineConfig } from 'prext/config';

export default defineConfig({
  // options
});
```
