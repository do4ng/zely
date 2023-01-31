# Types

```ts
import { SardRequest, SardResponse } from 'sard.js';

export type Middleware = (req: SardRequest, res: SardResponse, next: () => void) => void;

export interface Config {
  port?: number;

  routes?: string;

  middlewares?: Middleware[];

  base?: string;
}
```

- `port` - Server port.

- `routes` - Directory of pages. (default: `/pages/`)

- `middlewares` - Middlewares.

- `base` - base directory. (default: `.`)
