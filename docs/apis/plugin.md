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

2. custom html loader

---

3. transform guide

```ts
export function MyPlugin(): Plugin {
  return {
    name: 'my-plugin',

    transform(id, code) {
      // id: file name
      // code: source

      return {
        // path
        // like /about, /user/hello
        file: parse(id).name,

        /*
          module.
          See - https://prext.netlify.app/guide/routing
        */
        m: {
          get(req, res) {
            res.end('Hello World!');
          },
        },
        /* 
          "build" feature requires modulePath. 
          If you don't want to support build feature, you don't have to provide this value.
        */
        modulePath: '',
        type: 'module', // html or js
      };
    },
  };
}
```

4. server guide

You can apply middlewares or custom handlers.

```ts
export function MyPlugin(): Plugin {
  return {
    name: 'my-plugin',

    server(server) {
      // middleware
      server.use((req, res, next) => {
        next();
      });
    },
  };
}
```

## Typescript

```ts
export interface Plugin {
  name: string;
  transform?: (id: string, code: string) => PluginOutput | Promise<PluginOutput>;
  server?: (server: Server) => void;
}
```
