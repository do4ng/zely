import { Middleware } from 'prext';

export const Message: Middleware = (req, res, next) => {
  (req as any).message = 'Hello World!';

  next();
};
