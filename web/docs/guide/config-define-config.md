# Define Config

Create `prext.config.js` or `prext.config.ts` to define config.

## DefineConfig

1. Default

```ts
export default {};
```

2. Using `config.defineConfig` ( recommended )

```ts
import { defineConfig } from 'prext/config';

export default defineConfig({
  /* config */
});
```

3. Using `main.defineConfig` ( not recommended )

```ts
import { defineConfig } from 'prext';

export default defineConfig({
  /* config */
});
```

[config types](/guide/config-types)
