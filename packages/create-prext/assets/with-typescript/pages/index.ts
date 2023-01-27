import { PrextRequest, PrextResponse } from 'prext';

export function get(req: PrextRequest, res: PrextResponse) {
  res.json({ message: (res as any).message }); // middlewares/message.ts
}
