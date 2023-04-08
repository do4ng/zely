# Typescript

Prext fully supports typescript. Most of tests (while development) were run with typescript. Thus, using typescript is recommended.

## Using [create-prext-app](https://npmjs.com/package/create-prext-app)

```bash
$ npx create-prext-app my-ts-app --with-typescript
```

## Using [create-prext](https://npmjs.com/package/create-prext)

Select Typescript Option

```bash
$ npx create-prext

? Project name: my-app
? Directory: backend
? Template: typescript
```

## Migrantion from Javascript

```diff
// pages/index.ts

+ import { PrextRequest, PrextResponse } from 'prext';

- module.exports.get = function(req, res) {
+ export function get(req: PrextRequest, res: PrextResponse) {

  res.end("I love typescript!");
}
```

rename `prext.config.js` to `prext.config.ts`

```diff
// prext.config.js => prext.config.ts
- const { defineConfig } = require("prext");
+ import { defineConfig } from "prext";

- module.exports = defineConfig({});
+ export default defineConfig({});
```
