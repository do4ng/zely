# Preny

> This package is very experimental.
> Don't use it for production before `v1`

Very Tiny Http Server Module (3kb).

```ts
const preny = require('preny');
const app = preny.server({ logging: true });

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
  console.log('Server Running on http://localhost:3000\n');
});
```

## License

MIT
