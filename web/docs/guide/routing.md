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
export function get() {}
// post
export function post() {}
// etc...
```

## Parameters in HTML

You cannot access the current page parameters. - ([#1](https://github.com/do4ng/prext/issues/1))
