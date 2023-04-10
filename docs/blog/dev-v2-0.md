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

We are going to strengthen the prexy even more.

3. **zero-config**

We will make it work well without the config file!

4. **for deploy 🚀**

If the build function is the concept of exporting prext servers, then the deploy function is the concept of exporting middleware.

```bash
$ prext deploy -output=dist/deploy.js
```

```js
const http = require('http');
const { handler } = require('./dist/deploy');

http.createServer(handler).listen(3000);
```

## Conclusion

Currently, v2 is under development. Check out [2.0-dev](https://github.com/do4ng/prext/tree/2.0-dev) branch if you want to see the development status!
