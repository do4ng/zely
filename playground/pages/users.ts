import { PrextRequest, PrextResponse } from 'prext';

export function get(req: PrextRequest, res: PrextResponse) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).end(`
  <div class="users">
    <h1>User List - ${(req as any).message}</h1>
    <a href="/users/user1">User 1</a>
    <a href="/users/user2">User 2</a>
    <a href="/users/user3">User 3</a>
  </div>

  <style>
    .users {
      text-align: center;
    }
  </style>
  `);
}
