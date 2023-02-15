# Plugin

---

1. **Example** Simple Plugin

```ts
// plugins/simple.ts
import { Plugin } from 'prext';

export function SimplePlugin(): Plugin {
  return {
    name: 'simple-plugin',
  };
}
```

```ts
// prext.config.ts
import { defineConfig } from 'prext/config';
import { SimplePlugin } from './plugins/simple';

export default defineConfig({
  plugins: [SimplePlugin()],
});
```

---

2. custom html loader

Follow [Custom Loader Guide](/prexty/lang-custom).

## Typescript

```ts
export interface Plugin {
  name: string;
  transform?: (id: string, code: string) => PluginOutput | Promise<PluginOutput>;
  server?: (server: Server) => void;
}
```
