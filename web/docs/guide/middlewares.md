# Middlewares

## Usage

```ts
// middlewares/message.ts
import { Middleware } from 'prext';

export const Message: Middleware = (req, res, next) => {
  (req as any).message = 'Hello World!';
  next();
};
```

```ts
// pages/index.ts
import { PrextRequest, PrextResponse } from 'prext';

export function get(req: PrextRequest, res: PrextResponse) {
  res.end((req as any).message);
}
```

## Regists

```ts
// prext.config.ts

import { Message } from './middlewares/message';

export default defineConfig({
  middlewares: [Message],
  // ...
});
```
