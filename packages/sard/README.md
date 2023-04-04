# Sard.js

> no longer update. use [osik](https://github.com/do4ng/osik) instead

Very Tiny Http Server Module

## Installation

```bash
$ npm i --save-dev sard.js
```

## Example

```ts
const sard = require('sard.js');
const app = sard.server({ logging: true });

app.use((req, res, next) => {
  // middleware
  req.name = 'world';
  next();
});

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.end(`<p>Hello ${req.name}</p>`);
});

app.get('/users/:name', (req, res) => {
  res.end(`Hello, ${req.params.name}!`);
});

app.listen(3000, () => {
  // callback
});
```

## License

MIT
