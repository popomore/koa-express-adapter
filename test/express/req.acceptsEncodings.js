
var koa = require('koa')
  , request = require('supertest');
const wrap = require('../../lib/wrap');

describe('req', function(){
  describe('.acceptsEncodingss', function(){
    it('should be true if encoding accepted', async () =>{
      var app = new koa();

      app.use(wrap(function(req, res){
        req.acceptsEncodings('gzip').should.be.ok()
        req.acceptsEncodings('deflate').should.be.ok()
        res.end();
      }));

      await request(app.callback())
      .get('/')
      .set('Accept-Encoding', ' gzip, deflate')
      .expect(200);
    })

    it('should be false if encoding not accepted', async () =>{
      var app = new koa();

      app.use(wrap(function(req, res){
        req.acceptsEncodings('bogus').should.not.be.ok()
        res.end();
      }));

      await request(app.callback())
      .get('/')
      .set('Accept-Encoding', ' gzip, deflate')
      .expect(200);
    })
  })
})
