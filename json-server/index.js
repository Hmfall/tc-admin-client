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

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});
