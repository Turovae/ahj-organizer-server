import Koa = require('koa');
import Router = require('@koa/router');
import cors = require('@koa/cors');

import postsService = require('./postService');

import { koaBody } from 'koa-body';

const PORT = 7070;

const app = new Koa();
const router = new Router();

app.use(cors({
  origin: '*'
}));

app.use(koaBody());

router.get('/posts', (ctx, next) => {
  ctx.response.body = postsService.getPosts();
  // next();
});

router.post('/posts', (ctx, next) => {
  console.log(ctx.request.body);
  const msg = ctx.request.body;
  postsService.addPost(msg);

  ctx.response.body = {
    status: { ok: true },
    content: postsService.getPosts()
  };
});

app.use(router.routes());

app.use(async ctx => {
  ctx.response.body = 'Hello World!';

  console.log(ctx.response.body === ctx.body);
  console.log(ctx.header);
  console.log(ctx.url);
});

app.listen(PORT);
