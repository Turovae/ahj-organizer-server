import Koa = require('koa');
import Router = require('@koa/router');
import cors = require('@koa/cors');
import path = require('path');
import fs = require('fs');

import postsService = require('./postService');

import { koaBody } from 'koa-body';

const PORT = 7070;

const app = new Koa();
const router = new Router();

app.use(cors({
  origin: '*'
}));

app.use(koaBody({
  multipart: true,
  urlencoded: true
}));

router.get('/posts', async (ctx, next) => {
  ctx.response.body = postsService.getPosts();
  // next();
});

router.post('/posts/add', (ctx, next) => {
  console.log(ctx.request.body);
  const msg = ctx.request.body;
  postsService.addPost(msg);

  ctx.response.body = {
    status: { ok: true },
    content: postsService.getPosts()
  };
});

router.post('/posts/upload', async (ctx, next) => {
  // console.log('upload!');
  // console.log(ctx.request.body);
  // console.log(ctx.request.files);
  const publicDir = path.join(__dirname, '/public');
  console.log(`isExistPublicDir: ${fs.existsSync(publicDir)}`);

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  try {
    const { file } = ctx.request.files as unknown as { file: any };
    console.log(file);
    console.log(file.filepath);

    fs.copyFileSync(file.filepath, `${publicDir}/${file.newFilename}`);
  } catch (e) {
    console.log(e);
  }
});

app.use(router.routes());

app.use(async ctx => {
  ctx.response.body = 'Hello World!';

  console.log(ctx.response.body === ctx.body);
  console.log(ctx.header);
  console.log(ctx.url);
});

app.listen(PORT);
