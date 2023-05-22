# Prexty v1.2

Prexty came back!

## Changes

1. Now it also works on prext@1.2 and later versions!

We changed the prext core http library in v1.2. Thus, prexy didn't work because of that, but now it works!

2. `create-prext` supports prexty!

```bash
npx create-prext@latest

? Project name: react-app
? Directory: ./project
? Template: react

```

3. Accessing request, response

```tsx
import React from 'react';

export function data({ req, res }) {
  return {
    props: {
      url: req.url,
    },
  };
}

export default function app({ url }) {
  return (
    <>
      <span>Request: {url}</span>
    </>
  );
}
```
