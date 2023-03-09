# Server

Prext use own library called sard.js. It was because of speed and weight.

If you want information of [sard.js](https://www.npmjs.com/package/sard.js), visit [here](/guide/api-sard).

## Prext()

It creates a core server.

```ts
import { Prext } from 'prext';

const server = await Prext({
  /* config */
});

// middleware

server.use((req, res, next) => {
  next();
});

server.get('/', (req, res) => {
  res.end('Hello World!');
});

server.listen(3000, () => {});
```

> See API - [documentation](/guide/pkg-sard#server)

## handles()

### Routes

```ts
import { handles } from 'prext/server';
import { server } from 'sard.js';

const app = server();

const routes = [
  {
    file: '/',
    m: {
      get(req, res) {
        res.end('Hello World');
      },
    },
    modulePath: '',
    type: 'module',
  },
];

app.all('*', (req, res) => {
  handles(req, res, routes);
});

app.listen(3000);
```

```ts
import { SardRequest, SardResponse } from 'sard.js';

export function handles(
  req: SardRequest,
  res: SardResponse,
  routes: {
    file: string;
    m: any;
    modulePath: string;
    type: string;
  }[]
);
```
