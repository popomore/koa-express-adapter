
var koa = require('koa')
  , request = require('supertest');
const wrap = require('../../lib/wrap');

describe('res', function(){
  describe('.type(str)', function(){
    it('should set the Content-Type based on a filename', async () =>{
      var app = new koa();

      app.use(wrap(function(req, res){
        res.type('foo.js').end('var name = "tj";');
      }));

      await request(app.callback())
      .get('/')
      .expect('Content-Type', 'application/javascript; charset=utf-8')
      .end(done)
    })

    it('should default to application/octet-stream', async () =>{
      var app = new koa();

      app.use(wrap(function(req, res){
        res.type('rawr').end('var name = "tj";');
      }));

      await request(app.callback())
      .get('/')
      .expect('Content-Type', 'application/octet-stream');
    })

    it('should set the Content-Type with type/subtype', async () =>{
      var app = new koa();

      app.use(wrap(function(req, res){
        res.type('application/vnd.amazon.ebook')
          .end('var name = "tj";');
      }));

      await request(app.callback())
      .get('/')
      .expect('Content-Type', 'application/vnd.amazon.ebook');
    })
  })
})