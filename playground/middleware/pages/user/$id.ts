import { PrextRequest, PrextResponse } from 'prext';

type Users = Record<number, { name: string; about: string }>;

const users: Users = {
  1: { name: 'anonymous #1', about: 'I love cat.' },
  2: { name: 'anonymous #2', about: 'Hello.' },
  3: { name: 'anonymous #3', about: 'Awesome.' },
};

export function get(req: PrextRequest, res: PrextResponse) {
  res.json(users[req.params.id]);
}
