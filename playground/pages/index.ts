import { PrextRequest, PrextResponse } from 'prext';

export function get(req: PrextRequest, res: PrextResponse) {
  res.setHeader('Content-Type', 'text/html');
  res.end(`
  <div class="container">
    <h2>${(req as any).message}</h2>
    Visit <a href="/users/">users</a>
  </div>

  <style>
    .container {
      margin-top: 20%;
      text-align: center;
    }
    a {
      color: blue;
    }
  </style>
  `);
}
