import { PrextRequest, PrextResponse, usePrewrite } from 'prext';

export function get(req: PrextRequest, res: PrextResponse) {
  res.send('cat');
}

export const $page = {
  use(req, res, next) {
    usePrewrite(res, (chunk) => `I love ${chunk}`);
    next();
  },
};
