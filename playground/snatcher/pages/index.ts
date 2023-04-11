import { snatcher, PrextRequest, PrextResponse } from 'prext';

export async function get(req: PrextRequest, res: PrextResponse) {
  const snatch = snatcher(req, res);

  const { body } = await snatch('/users');

  res.send(`users: ${body}`);
}
