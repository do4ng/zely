import { PrextRequest, PrextResponse } from 'prext';

type User = Record<string, string>;

const users: Record<string, User> = {
  user1: { message: 'Hello World!' },
  user2: { message: 'I love cat.' },
  user3: { message: 'I love dog.' },
};

export function get(req: PrextRequest, res: PrextResponse) {
  res.json(users[req.params.id]);
}
