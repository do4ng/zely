# Introduction

Prext can be extended using plugins.

## Adding Plugins

Add the desired plugins to a configuration file such as `prext.config.ts`.

```ts
// prext.config.ts
import { defineConfig } from 'prext';
import { myPlugin } from './my-plugin';

export default defineConfig({
  plugins: [myPlugin()],
});
```

> See [Config Reference](/guide/api-config)

## Creating own plugin

> See [Plugin Guide](/plugins/guide)

## Official Plugins

> See [Official Plugins](/plugins/official-plugins)
