import { PrextRequest, PrextResponse } from 'prext';

export async function get(req: PrextRequest, res: PrextResponse) {
  // console.log('response');

  res.json({ 1: 'cat', 2: 'dog' });
}
