import { PrextRequest, PrextResponse } from 'prext';

export function get(req: PrextRequest, res: PrextResponse) {
  throw new Error('ERROR!');
  // res.json({ message: (req as any).message });
}
