import { PrextRequest, PrextResponse } from 'prext';

export async function get(req: PrextRequest, res: PrextResponse) {
  const { body } = await req.snatch('/users');

  res.send(`users: ${body}`);
}
