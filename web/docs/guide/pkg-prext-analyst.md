# prext analyst

[github](https://github.com/do4ng/prext/tree/main/packages/prext-analyst),
[npm](https://npmjs.com/package/prext-analyst)

`prext-analyst` analyzes your project.

::: warning
This package is no longer maintained.
:::

## Installation

```bash
> yarn add -D prext prext-analyst
```

## Usage

```diff
"scripts": {
+  "analyze": "prext analyze"
}
```

```bash
> yarn run analyze
```

Output example:

```txt
1. /pages/about => /about (../node_modules/.prext/my-about.w90mpmogft.js)
2. /pages/users/$id.ts => /users/:id (../node_modules/.prext/$id.1p6ogz2ggyo.js)

Dist Directory - /node_modules/.prext
Cache File - /node_modules/.prext/cache.json
Size - 4437 byte

2 pages found.
```
