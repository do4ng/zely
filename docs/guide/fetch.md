# Data Fetching

You can fetch data from other pages using `snatcher()`.

## `snatcher()`

'snatch' does not fetch data through http, but directly accesses the file and fetch data.

```ts
import { snatcher } from 'prext';

export async function get(req, res) {
  const snatch = snatcher(req, res);
  const { body } = await snatch(/*PATH*/, /*METHOD*/);
}
```

## Example

::: code-group

```ts [pages/index.ts]
import { snatcher } from 'prext';

export async function get(req, res) {
  const snatch = snatcher(req, res);
  const { body } = await snatch('/user');

  res.send(`users: ${body}`);
}
```

```ts [pages/users.ts]
export function get(req, res) {
  res.json({ cat: '🐱' });
}
```

:::
