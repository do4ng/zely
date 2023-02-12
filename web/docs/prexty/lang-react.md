# React

> lang/**react**

## Server

- SSR

SSR(server side rendering) is supported by default.

- HMR

HMR is in development. It isn't supported yet.

## Usage

Before use, you have to install `react`.

```bash
> yarn add -D react
```

```ts
// prext.config.ts
import { defineConfig } from 'prext/config';
import { react, prexty } from 'prexty';
export default defineConfig({
  plugins: [
    // adapter
    prexty(),
    // prexty react plugin
    react(),
  ],
});
```

And create `public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>my app</title>
  </head>
  <body>
    <!--body-->
  </body>
</html>
```

Comment `<!--body-->` will be replaced.

## Routing

[default routing](/guide/routing)

You can access the current page parameters by `params`.

```tsx
// user/$id.tsx

export default function App({ params }) {
  return <>{params.id}'s page.</>;
}
```

## data fetching

If you make function named `data`, prext will render after all the data has been loaded.

```tsx
export async function data() {
  return {
    props: {
      data: await (await fetch('https://.../data.json')).json(),
    },
  };
}
export default function App({ data }) {
  return <>{JSON.stringify(data)}</>;
}
```

Another example:

```tsx
// user/$id.tsx

export async function data({ params }) {
  return {
    props: {
      message: `Hello ${params.id}`,
    },
  };
}
export default function App({ message }) {
  return <>{message}</>;
}
```
