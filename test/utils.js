'use strict';

const assert = require('assert');
const koa = require('koa');
const Router = require('@eggjs/router');

exports.shouldNotHaveHeader =
function shouldNotHaveHeader(header) {
  return function(res) {
    assert.ok(!(header.toLowerCase() in res.headers), 'should not have header ' + header);
  };
};

exports.createApp =
function createApp() {
  const app = new koa();
  const router = new Router();
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      console.log(err.stack);
      ctx.status = 500;
      ctx.body = err.stack;
    }
  });
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.router = router;
  return app;
};
