# $page

`$page` variable provides data of page.

Example:

```ts
export const $page = {};
```

## path

Provide custom path.

```ts
// pages/my-about.ts
export function get(req, res) {
  res.end('About Page');
}

export const $page = {
  path: '/about',
};
```

## before/after

A function that is run before/after processing request.

```ts
export const $page = {
  before(req, res) {
    console.log(`new request: ${req.params.slug}`);
  }
  after(req, res) {
    console.log("Done!");
  }
}
```
