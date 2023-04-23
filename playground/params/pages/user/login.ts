import { PrextRequest, PrextResponse } from 'prext';

export function get(req: PrextRequest, res: PrextResponse) {
  res.json({ text: 'Hello' });
}
