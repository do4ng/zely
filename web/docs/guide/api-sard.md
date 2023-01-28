# Sard.js

Sard.js is a tiny Http Server Module. It was made for speed and size.

## Features

- **Very** tiny. (`10.4 kB`)
- Typescript supported
- Lightning fast

## Installation

```bash
> npm i --save-dev sard.js
```

```ts
import { server } from 'sard.js';

const app = server(/* config */);

app.get('/', (req, res) => {
  res.end('Hello World!');
});

app.listen(3000);
```
