import { PrextRequest, PrextResponse } from 'prext';

export function get(req: PrextRequest, res: PrextResponse) {
  res.setHeader('Content-Type', 'text/html');
  res.end(`
  <div class="container">
    <h2>${(req as any).message}</h2>
    <p>Prext is a <a href="https://github.com/do4ng/prext">open-source</a> project</p>
    <p>Visit <a href="/users/">user list</a> page!</p>
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
