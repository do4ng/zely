# Announcement v1

> [original](https://github.com/do4ng/prext/issues/11)

It's been less than a week since prext v1 was released, but I think prext can be officially released now.
We still lack a lot, but we will make more after the official release.

## Features

- req, res

I tried this out with [@prext/plugin-kit](https://github.com/do4ng/prext/tree/main/packages/plugin-kit).We will apply this plugin to prext by default.

> You can try these features in advance: [@prext/plugin-kit](https://github.com/do4ng/prext/tree/main/packages/plugin-kit).

```js
export function get(req, res) {
  res.status(200).send(`Hello, ${req.query.name}`);
}
```

---

- more options `$page`

```js
export const $page = {
  before(req, res) {
    console.log(`new request: ${req.params.slug}`);
  }
  after(req, res) {
    console.log("Done!");
  }
}
```

> [reference](/guide/guide-page)

---

- typescript supported `$page`

```ts
import { Page } from 'prext';

export const $page: Page = {};
```

thank you😊😋😚

## Migration from v0.x

### Javascript Api

1. `Prext()`

`Prext()` function has been changed to asynchronous.

```diff
import { Prext } from "prext";

- const app = Prext();
+ const app = await Prext();
```
