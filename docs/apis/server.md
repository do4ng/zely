# Server Api

Prext is running on osik which was made for speed and weight.

If you want information of [osik](https://www.npmjs.com/package/osik), visit [here](/apis/osik).

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

server.listen(3000, () => {});
```
