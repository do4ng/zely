# v2.0 is coming! <Badge type="info" text="dev" />

> There will be many changes in v2.0!

It's only been a month since v1.0 was released, but I'm preparing for v2.0 right now.

## About v1.x

v1.x increased reliability without significant new features.  
For example, we replaced unstable sard.js with osik and added middleware mode for use with http libraries such as express.

In v1.x, if you've only had the same boring update, now it's time to add new features!

## So what's the plan?

Before I say a plan, everything I say is just a "plan."

### Features

1. **public directory**

Until now, you had to set up a public directory with an external library, such as serve.. But you don't have to do that anymore.

2. **frontend ✨**

We are going to strengthen the prexty even more.

3. **zero-config**

We will make it work well without the config file!

4. **snatcher 🚀**

A snatcher, like fetch, carries data between pages.

However, it does not use http, such as fetch, but receives data directly from the file that corresponds to the page.

::: code-group

```ts [pages/index.ts]
import { snatcher } from 'prext';

export async function get(req, res) {
  const snatch = snatcher(req, res);
  const { body } = await snatch('/user');

  res.send(`users: ${body}`);
}
```

```ts [pages/users.ts]
export function get(req, res) {
  res.json({ cat: '🐱' });
}
```

:::

## Conclusion

Currently, v2 is under development. Check out [2.0-dev](https://github.com/do4ng/prext/tree/2.0-dev) branch if you want to see the development status!
