import { PrextRequest, PrextResponse } from 'prext';

export function get(req: PrextRequest, res: PrextResponse) {
  res.json({ title: 'Prext App' });
}
