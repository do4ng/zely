const sard = require('./dist');

const app = sard.server({});

app.post('/a', (req, res) => {
  console.log(req.body);

  res.end('Hi');
});

app.listen(3000);
