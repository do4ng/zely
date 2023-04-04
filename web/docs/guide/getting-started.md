# Getting Started

## Using tool

You can create prext application easily with [create-prext](https://npmjs.com/package/create-prext).

---

1. Download Template

```bash
> npx create-prext
```

2. Install Dependencies

```bash
> npm i # install dependencies
```

3. Run!

```bash
> npm dev # start app
```

## Manual Installation

You can also add prext to a project that already exists.

Enter the command below:

```bash
> npm install --save-dev prext
```

Add the configuration file (`prext.config.ts`).

```js
// prext.config.ts
import { defineConfig } from 'prext/config';

export default defineConfig({
  // options
});
```
