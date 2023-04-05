import { PrextRequest, PrextResponse } from 'prext';

export function get(req: PrextRequest, res: PrextResponse) {
  // edit "/middlewares/message.ts".
  res.json({ message: (req as any).message });
}
