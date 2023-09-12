import Koa = require('koa');
import cors = require('@koa/cors');

const app = new Koa();
const PORT = 7070;

app.use(cors());

app.use(async ctx => {
  ctx.response.body = 'Hello World!';
  console.log(ctx.response.body === ctx.body);
  console.log(ctx.header);
  console.log(ctx.url);
});

app.listen(PORT);
