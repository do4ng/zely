# Routing

Prext.js automatically generates routes based on your file tree of pages.

```txt
.
├─ pages
│  ├─ user
│  │  └─ $id.ts
│  ├─ users.ts
│  └─ index.ts
├─ prext.config.ts
└─ package.json
```

will be

```json
["/", "/users", "/users/:id"]
```

## Custom Path

If you don't like routes based on filename, just export `$page`!

```ts
export const $page = {
  path: '/foo/bar',
};
```

## Route Parameters

You can access the current page parameters by `req.params`.

```ts
// pages/user/$id.ts

import { PrextRequest, PrextResponse } from 'prext';

export function get(req: PrextRequest, res: PrextResponse) {
  res.json({ id: req.params.id });
}
```

## Method

Exports functions corresponding `get`, `post`, `delete` etc (http verbs)

```ts
// get
export function get(req, res) {}
// post
export function post(req, res) {}
// etc...
```

- `req.params`: page parameters.
- ~~`req.query`: page query. <span style="color: red">(removed)</span>~~
- etc...

> reference: [http.req](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/#request-body)

- `res.json`: send json.
- `res.end`: send data.
- `res.setHeader`: set header.
- etc...

> reference: [http.res](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/#http-status-code)

## 404 page

> This Feature has been supported since `v0.1.0`.

You can set 404 page with `config.error`.

```ts
export default defineConfig({
  error(req, res) {
    // ...
  },
});
```

## Parameters in HTML

You cannot access the current page parameters. - ([#1](https://github.com/do4ng/prext/issues/1))
