const Koa = require('koa');
const http = require('http');
const app = new Koa();
const Router = require('@koa/router');
const fs = require('fs')
const path = require('path')

const router = new Router();

router.get('/index.html', (ctx, next) => {
  const pp = path.resolve(__dirname, './static/index.html')
  const htmlContent = fs.readFileSync(pp, { encoding: 'utf-8' })
  ctx.set('Content-Type', 'text/html; charset=utf-8')
  ctx.response.body = htmlContent
  next()
});

router.get('/a.css', (ctx, next) => {
  console.log('request a.css')
  const pp = path.resolve(__dirname, './static/a.css')
  const content = fs.readFileSync(pp, { encoding: 'utf-8' })
  ctx.response.body = content
  next()
});

router.get('/service-worker.js', (ctx, next) => {
  const pp = path.resolve(__dirname, './static/service-worker.js')
  const content = fs.readFileSync(pp, { encoding: 'utf-8' })
  ctx.set('Content-Type', 'application/javascript; charset=utf-8')
  ctx.response.body = content
  next()
});

router.get('/bg_video.mp4', (ctx, next) => {
  console.log('request video~')
  // https://github.com/koajs/koa/issues/1089
  const pp = path.resolve(__dirname, './static/bg_video.mp4')
  ctx.set('Content-Type', 'video/mp4')
  ctx.body = fs.createReadStream(pp)
  next()
})

app.use(router.routes())
app.use(router.allowedMethods())

http.createServer(app.callback()).listen(3000);
console.log('http://localhost:3000')
