# Sard.js

Sard.js is a tiny Http Server Module. It was made for speed and size.

## Features

- **Very** tiny. (`10.5 kB (in v0.1.1)`)
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

## Error Handling

```ts
app.get('/', (req, res) => {
  res.end('Hello World!');
});

app.use((req, res, next) => {
  res.statusCode = 404;
  res.end('page not found');
});
```

## APIs

Table

- [server](#server)
- [pathToRegexp](#pathtoregexp)

### server

- Types: `server(options: Sard): Server`

```js
const { server } = require('sard.js');

const app = server();
```

### server.use

- Types: `use(...fn: HandlerType[]): this`

add middlewares.

```js
app.use((req, res, next) => {
  next();
});
```

or you can add middlewares in a different way:

- [source](https://github.com/do4ng/prext/blob/ba9b7f23fcb7bf30f3acb6d6d27d171aede18058/packages/sard/src/index.ts#L44)

```js
app.addHandler('all', '*', (req, res, next) => {
  next();
});
```

### server.[METHOD]

```ts
app.all((req, res) => {});
app.get((req, res) => {});
app.post((req, res) => {});
app.delete((req, res) => {});
```

### server.listen

- Type: `listen(port: number, ...args: any[]): this`

### pathToRegexp

```ts
require('sard.js').pathToRegexp('/about', true);
// { params: [], pattern: /^\/about(?=$|\/)/i }
require('sard.js').pathToRegexp('/user/:id', true);
// { params: [ 'id' ], pattern: /^\/user\/([^/]+?)(?=$|\/)/i }
```

## Types

[source](https://github.com/do4ng/prext/blob/main/packages/sard/types/index.d.ts)
