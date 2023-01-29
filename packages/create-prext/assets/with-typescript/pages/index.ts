import { PrextRequest, PrextResponse } from 'prext';

export function get(req: PrextRequest, res: PrextResponse) {
  res.json({ message: (req as any).message }); // middlewares/message.ts
}
