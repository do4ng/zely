# Announcement v1

We are really excited to introduce prext v1.

---

> [original](https://github.com/do4ng/prext/issues/11)

It's been less than a week since prext v1 was released, but I think prext can be officially released now.
We still lack a lot, but we will make more after the official release.

## Our Goals

1. stability.
2. optimization.
3. speed.
4. weight.

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

We are aware of the problem of not being able to set the page only by file name.  
Thus, we're going to change it so that we can set more page data via `$page`.

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

---

This is all that has been added so far. More features will be added in the future.

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

## Conclusion

There are still many areas missing. If you find a bug, make a [pull request](https://github.com/do4ng/prext/pulls).
