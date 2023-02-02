# Types

## base

- Type: `string`
- Default: `.`

Project root directory. (only relative path)

## routes

- Type: `string`
- Default: `/pages/`

Directory where page files are located.

## middlewares

- Type: `Array<Middleware>`

Middlewares Array

```ts
function example(req, res, next) {
  req.message = 'Hello World';
  next();
}

export default {
  middlewares: [example],
};
```

## port

- Type: `number`
- Default: `5050`

Port
