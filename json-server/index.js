const { readFileSync } = require('node:fs');
const path = require('path');
const jsonServer = require('json-server');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 200);
  });
  next();
});

server.post('/auth', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json();
    }

    const db = JSON.parse(readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));

    const { users = [] } = db;

    const userFromBd = users.find((user) => user.email === email && user.password === password);

    if (userFromBd) {
      return res.json({
        jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3Mzk2NDkzOTQsImV4cCI6MTc3MTE4NTM5NCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSJ9.ykZWlL5TdKEd5T6X6_JiKc4ET0uLeDcYeuzuHV8b-l4',
      });
    }

    return res.status(403).json({ message: 'User not found' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running');
});
