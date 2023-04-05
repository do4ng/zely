import { Middleware } from 'prext';

const Message: Middleware = (req, res, next) => {
  (req as any).message = 'Hello World!';

  next();
};

export default Message;
